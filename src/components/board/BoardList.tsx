import { startTransition, useEffect, useOptimistic } from "react";
import type { TaskBoard } from "../../types/types";
import { CardBoard } from "./CardBoard";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { useBoard } from "../../hooks/useBoard";
import { CardBoardCreate } from "./BoardCreate";


type OptimisticAction =
  | { type: 'create'; payload: TaskBoard }
  | { type: 'update'; payload: TaskBoard }
  | { type: 'delete'; payload: { id: number } };

interface Props {
  boards: TaskBoard[]
  creating: boolean
  setCreating: (state: boolean) => void
}

export const BoardList = ({ boards, creating, setCreating }: Props) => {

  const { addBoard, updateBoard, removeBoard, reorderBoard } = useBoard();

  const [parent, boardsData, setBoardsData] = useDragAndDrop<HTMLUListElement, TaskBoard>(
    boards,
    {
      plugins: [animations()],
      onDragend: () => {
        reorderBoard(boardsData);
      }
    }
  );

  const [optimisticBoards, addOptimisticBoards] = useOptimistic(
    boardsData,
    (state, action: OptimisticAction) => {
      switch (action.type) {
        case "create":
          if (state.some(board => board.id === action.payload.id)) {
            return state;
          }
          return [...state, action.payload];
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


  const handleCreateBoard = ({ title }: { title: string }) => {

    const newBoard: TaskBoard = {
      id: Date.now(),
      title,
      isStarred: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      columns: [
        { id: 1, title: "Por hacer", tasks: [] },
        { id: 2, title: "En progreso", tasks: [] },
        { id: 3, title: "Hecho", tasks: [] },
      ],
      isOptimistic: true
    };

    setCreating(false);
    addOptimisticBoards({ type: 'create', payload: newBoard });
    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));

      addBoard({
        ...newBoard,
        isOptimistic: false,
      });
    })
  }

  const handleToggleStar = (id: number) => {

    const selectedItem = boardsData.find(board => board.id === id);

    if (!selectedItem) return;

    const updatedItem = {
      ...selectedItem,
      isStarred: !selectedItem.isStarred,
      isOptimistic: true,
    };

    addOptimisticBoards({ type: 'update', payload: updatedItem });

    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));

      updateBoard({
        ...updatedItem,
        isOptimistic: false,
      })
    })
  }

  const handleUpdateBoard = (id: number, title: string) => {
    const selectedItem = boardsData.find(board => board.id === id);

    if (!selectedItem) return;

    const updatedItem = {
      ...selectedItem,
      title,
      updatedAt: new Date(),
      isOptimistic: true,
    };
    addOptimisticBoards({ type: 'update', payload: updatedItem });

    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));

      updateBoard({
        ...updatedItem,
        isOptimistic: false,
      })
    })
  }

  const handleDeleteBoard = (id: number) => {
    const selectedItem = boardsData.find(board => board.id === id);

    if (!selectedItem) return;

    addOptimisticBoards({ type: 'delete', payload: { id } });

    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));

      removeBoard({ id })
    })
  }



  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" ref={parent} >
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
      {creating && (
        <li className="h-full w-full">
          <CardBoardCreate
            onCreate={(title) => { handleCreateBoard({ title }) }}
            onCancel={() => setCreating(false)}
          />
        </li>
      )
      }
    </ul>
  )
}