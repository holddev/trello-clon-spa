import { ClockFadingIcon, Grid3X3Icon, LayoutListIcon, Loader2Icon, PanelLeftIcon, PlusIcon } from "lucide-react"
import { startTransition, useOptimistic, useState } from "react"
import { cn, generateSlug } from "../utils/utils"
import { Icons } from "./Icons"
import { useBoard } from "../hooks/useBoard"
import { Input } from "./UI/Input"
import type { Board, newBoard } from "../types/types"
import { Link, useLocation } from "react-router-dom"
import { SignedIn, useAuth, UserButton, useUser } from "@clerk/clerk-react"
import { createBoard } from "../api/boards"
import { toast } from "../utils/toast"


export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { boards, addBoard } = useBoard()
  const { user } = useUser()
  const { getToken } = useAuth()
  const [boardOptimistic, addBoardOptimistic] = useOptimistic(
    boards,
    (state, newBoard: newBoard) => {
      const tempBoard: Board = {
        ...newBoard,
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
  )
  const location = useLocation()

  const menuItems = [
    {
      name: "Tableros",
      path: "/dashboard",
      icon: <LayoutListIcon className="size-4" />,
    },
    {
      name: "Recientes",
      path: "/dashboard?view=recent",
      icon: <ClockFadingIcon className="size-4" />,
    },
    {
      name: "Favoritos",
      path: "/dashboard?view=starred",
      icon: <Icons icon="star" className="size-4" />,
    },
  ];

  const handleOnToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleCreateBoard = (title: string) => {
    if (!title.trim()) return
    if (!user?.id) return

    const newBoard: newBoard = {
      title,
      user_id: user.id,
      order: boardOptimistic.length,
      isOptimistic: true
    }
    startTransition(async () => {
      addBoardOptimistic(newBoard)
      const token = await getToken()
      const createdBoard = await createBoard({ token, body: newBoard })

      if (createdBoard) {
        addBoard({
          ...createdBoard,
          isOptimistic: false
        })
        toast.ok("Tablero creado...")
      } else {
        toast.error("No se pudo crear el tablero...")
      }
    })
  }

  return (
    <aside className="h-full fixed z-50 md:relative min-h-screen">
      <button
        className="bg-white/90 text-primary rounded-full p-2 w-fit absolute top-1 right-0 translate-x-[110%] cursor-pointer z-50"
        onClick={handleOnToggle}
      >
        <PanelLeftIcon className="size-4" />
      </button>
      <div className={cn(isOpen ? "flex w-64" : "w-0",
        "h-full min-h-screen transition-all ease-in-out duration-500 overflow-hidden max-h-screen bg-gray-100",)}
      >
        <div className={cn("min-h-full w-full flex flex-col justify-between mt-4 px-2 transition origin-left", !isOpen && "scale-x-0")}>
          {/* sidebar header */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <span className="bg-gradient-to-br  rounded-md text-shadow-2xs text-shadow-white/50 from-primary to-violet-600 p-2 font-bold text-xl text-white/90">TC</span>
              <div className="flex flex-col items-start w-full rounded-md">
                <h5 className="font-semibold text-primary">Mis Proyectos</h5>
                <p className="text-sm text-foreground/80">Espacio de trabajo</p>
              </div>
            </div>
            <hr className="w-full h-[1px] border-none bg-gradient-to-r from-violet-600/50 via-violet-600/30 to-transparent" />
          </div>
          {/* Items menu */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <h5 className="text-sm font-semibold text-primary">Personal</h5>
              <ul className="text-foreground/80">
                {
                  menuItems.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        to={item.path}
                        className={cn(
                          "flex items-center gap-2 rounded-full hover:bg-primary/10 hover:text-primary transition px-2 py-1",
                          location.pathname + location.search === item.path && "bg-primary text-white/90 hover:bg-primary hover:text-white/90"
                        )}
                      >
                        {item.icon} {item.name}
                      </Link>
                    )
                  })
                }
              </ul>
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="text-sm font-semibold text-primary">Mis Tableros</h5>
              <ul className="text-foreground/80 relative max-h-[230px] overflow-y-auto pb-2" >
                {boardOptimistic.map((board) => (
                  <li key={board.id}>
                    {
                      board.isOptimistic ? (
                        <div
                          className="flex items-center gap-2 rounded-sm hover:bg-background transition px-2 py-1"
                        >
                          <Loader2Icon className="min-w-4 size-4 animate-spin" />
                          <span className="line-clamp-1">{board.title}</span>
                        </div>
                      ) : (
                        <Link
                          to={`/dashboard/${board.id}/${generateSlug(board.title)}`}
                          className={cn(
                            "flex items-center gap-2 rounded-full hover:bg-primary/10 hover:text-primary transition px-2 py-1",
                            location.pathname === `/dashboard/${board.id}/${generateSlug(board.title)}` && "bg-primary text-white/90 hover:bg-primary hover:text-white/90"
                          )}
                        >
                          <Grid3X3Icon className="min-w-4 size-4" />
                          <span className="line-clamp-1">{board.title}</span>
                        </Link>
                      )
                    }
                  </li>
                ))}
                <li className="flex items-center gap-2 py-1 px-2">
                  <PlusIcon className="size-4" />
                  <Input
                    placeholder="Agregar Tablero"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCreateBoard(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                </li>
              </ul>
            </div>
            <hr className="w-full h-[1px] border-none bg-gradient-to-r from-violet-600/50 via-violet-600/30 to-transparent" />
          </div>
          {/* User profile */}
          <div className="mb-10 md:mb-5 w-full h-full flex justify-end items-end">
            <SignedIn >
              <UserButton showName />
            </SignedIn>
          </div>
        </div>
      </div>
    </aside>
  )
}