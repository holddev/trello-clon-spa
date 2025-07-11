import { useEffect, useOptimistic, useTransition } from "react";
import type { Board, newBoard } from "../../types/types";
import { CardBoard } from "./CardBoard";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { useBoard } from "../../hooks/useBoard";
import { CardBoardCreate } from "./BoardCreate";
import { useAuth, useUser } from "@clerk/clerk-react";
import { createBoard, deleteBoard, editBoard, updateBoardOrder } from "../../api/boards";
import { toast } from "../../utils/toast";
import { Button } from "../UI/Button";
import { Badge } from "../UI/Badge";
import { ClockFadingIcon, FolderOpenIcon, LoaderPinwheelIcon } from "lucide-react";
import { Icons } from "../Icons";
import { useHasChanges } from "../../hooks/useHasChanges";
import { SkeletonCardBoard } from "../skeletons/SkeletonCardBoard";


type OptimisticAction =
  | { type: 'create'; payload: newBoard }
  | { type: 'update'; payload: Board }
  | { type: 'delete'; payload: { id: number } };

interface Props {
  boards: Board[]
  creating: boolean
  setCreating: (state: boolean) => void
  view: string
}

export const BoardList = ({ boards, creating, setCreating, view }: Props) => {

  const { isLoadingBoards, addBoard, updateBoard, removeBoard, reorderBoard } = useBoard();
  const { user } = useUser()
  const { getToken } = useAuth()
  const [updatingOrder, startTransition] = useTransition()

  const [parent, boardsData, setBoardsData] = useDragAndDrop<HTMLUListElement, Board>(
    boards,
    {
      plugins: [animations()]
    }
  );
  const [optimisticBoards, addOptimisticBoards] = useOptimistic(
    boardsData,
    (state, action: OptimisticAction) => {
      switch (action.type) {
        case "create": {
          const tempBoard: Board = {
            ...action.payload,
            id: Math.random(),
            cols: 0,
            is_favorite: false,
            created_at: (new Date()).toString()
          };

          if (state.some(board => board.title === tempBoard.title)) {
            return state;
          }
          return [...state, tempBoard];
        }
        case "update":
          return state.map(board => board.id === action.payload.id ? action.payload : board);
        case "delete":
          return state.map(board => board.id === action.payload.id ? { ...board, isOptimistic: true } : board);
      }
    }
  );

  useEffect(() => {
    setBoardsData(boards);
  }, [boards, setBoardsData])

  const hasChanges = useHasChanges(boards, boardsData)


  const handleCreateBoard = ({ title }: { title: string }) => {
    if (!user?.id) return

    const newBoard: newBoard = {
      title,
      user_id: user.id,
      order: optimisticBoards.length,
      isOptimistic: true
    };

    setCreating(false);
    addOptimisticBoards({ type: 'create', payload: newBoard });
    startTransition(async () => {
      const token = await getToken()
      const createdBoard = await createBoard({ token, body: newBoard })
      await new Promise(resolve => setTimeout(resolve, 500))

      if (createdBoard) {
        addBoard({
          ...createdBoard,
          isOptimistic: false,
        });
        toast.ok("Tablero creado...")
      } else {
        toast.error("Algo salío mal...")
      }
    })
  }

  const handleToggleStar = (id: number) => {

    const selectedItem = boardsData.find(board => board.id === id);

    if (!selectedItem) return;

    const fakeItem: Board = {
      ...selectedItem,
      is_favorite: !selectedItem.is_favorite,
      isOptimistic: true
    }

    const editItem: Partial<Board> = {
      is_favorite: !selectedItem.is_favorite,
    };

    addOptimisticBoards({ type: 'update', payload: fakeItem });

    startTransition(async () => {
      const token = await getToken()
      const updatedBoard = await editBoard({ token, id: selectedItem.id, body: editItem })

      if (updatedBoard) {
        updateBoard({
          ...updatedBoard,
          isOptimistic: false,
        })
        toast.ok("Tablero actualizado...")
      } else {
        toast.error("No se pudo actualizar...")
      }

    })
  }

  const handleUpdateBoard = (id: number, title: string) => {
    const selectedItem = boardsData.find(board => board.id === id);

    if (!selectedItem) return;

    const fakeItem: Board = {
      ...selectedItem,
      title,
      isOptimistic: true
    }

    const updateItem: Partial<Board> = {
      title,
    };


    addOptimisticBoards({ type: 'update', payload: fakeItem });

    startTransition(async () => {
      const token = await getToken()
      const updatedBoard = await editBoard({ token, id: selectedItem.id, body: updateItem })

      if (updatedBoard) {
        updateBoard({
          ...updatedBoard,
          isOptimistic: false,
        })
        toast.ok("Tablero actualizado...")
      } else {
        toast.error("No se pudo actualizar...")
      }
    })
  }

  const handleDeleteBoard = (id: number) => {
    const selectedItem = boardsData.find(board => board.id === id);

    if (!selectedItem) return;

    addOptimisticBoards({ type: 'delete', payload: { id } });

    startTransition(async () => {
      const token = await getToken()
      const deletedBoard = await deleteBoard({ token, id: selectedItem.id })

      if (deletedBoard) {
        removeBoard({ id })
        toast.ok("Tablero eliminado...")
      } else {
        toast.error("No se pudo eliminar...")
      }

    })
  }

  const handleReorderBoard = () => {

    const updatedBoards = boardsData.map((board, index) => {
      const original = boards.find(b => b.id === board.id);
      if (!original) return null;

      return original.order !== index ? { id: board.id, order: index } : null;
    }).filter((b) => b !== null);

    startTransition(async () => {
      const token = await getToken()
      const reorder = await updateBoardOrder({ token, body: updatedBoards })
      if (reorder) {
        reorderBoard(updatedBoards)
        toast.ok("Orden actualizado...")
      } else {
        toast.error("Algo salío mal...")
      }
    })

  }

  const randomLength = Math.floor(Math.random() * 3) + 3



  return (
    <>
      <div className="flex items-center justify-between h-8">
        <h4 className="flex items-center gap-2">Lista de tableros
          {view === "recent" && (<Badge className="flex items-center gap-1 text-white/90 bg-sky-600/90"><ClockFadingIcon className="size-4" />Recientes</Badge>)}
          {view === "starred" && (<Badge className="flex items-center gap-1 text-white/90 bg-yellow-600/90"><Icons icon="starFilled" className="size-4" />Favoritos</Badge>)}
        </h4>
        {hasChanges && !isLoadingBoards && (
          <Button onClick={handleReorderBoard} className="flex gap-2 items-center">
            {updatingOrder
              ? (<><LoaderPinwheelIcon className="animate-spin size-5" /> Guardando</>)
              : (<><Icons icon="reorder" className="size-5" />Guardar orden</>)}
          </Button>
        )}
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" ref={parent} >
        {
          isLoadingBoards ? (
            <>
              {Array.from({ length: randomLength }).map((_, idx) => (
                <SkeletonCardBoard key={idx} />
              ))}
            </>
          )
            : optimisticBoards.length > 0 ? (
              <>
                {
                  optimisticBoards.map((board) => (
                    <li
                      key={board.id}
                      className={`h-full cursor-grab `}
                      draggable
                    >
                      <CardBoard
                        board={board}
                        onRemoveBoard={handleDeleteBoard}
                        onUpdateBoard={handleUpdateBoard}
                        onToggleStar={handleToggleStar}
                      />
                    </li>
                  ))
                }
              </>
            ) : (
              <span className="flex items-center gap-2">
                <FolderOpenIcon className="size-5 text-primary" />
                {view === "recent" && (<>Todavía no has creado ningún tablero <span className="text-primary">recientemente.</span></>)}
                {view === "starred" && (<>Aún no tienes tableros <span className="text-primary">favoritos.</span></>)}
                {view === "all" && (<>No tienes <span className="text-primary">tableros</span> en este momento</>)}
              </span>
            )
        }

        {
          creating && (
            <li className="h-full w-full">
              <CardBoardCreate
                onCreate={(title) => { handleCreateBoard({ title }) }}
                onCancel={() => setCreating(false)}
              />
            </li>
          )
        }
      </ul>
    </>
  )
}