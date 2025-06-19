
import { ClockFadingIcon, PlusIcon } from "lucide-react"
import { useMemo, useState } from "react";
import { useBoard } from "../hooks/useBoard";
import { BoardList } from "../components/board/BoardList";
import { useSearchParams } from "react-router-dom";
import { Badge } from "../components/UI/Badge";
import { Icons } from "../components/Icons";
import { NavBar } from "../components/navigation/NavBar";
import { useUser } from "@clerk/clerk-react";

export const Board = () => {
  const { boards } = useBoard()
  const [creating, setCreating] = useState(false)
  const [params] = useSearchParams()
  const { user } = useUser()
  const view = params.get("view") ?? "all"

  const displayBoards = useMemo(() => {
    if (view === "recent") {
      return [...boards].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }
    if (view === "starred") {
      return boards.filter((board) => board.isStarred)
    }

    return boards
  }, [boards, view])


  return (
    <>
      <NavBar />
      <section className="relative h-auto flex flex-col gap-4 mb-12 mt-5 py-5 px-2">
        <div className="flex gap-2 mb-2">
          <div className="size-20 animate-pulse bg-primary/10 border-2 border-primary border-t-transparent border-b-transparent rounded-full p-2 grid text-4xl place-content-center">👋</div>
          <div className="flex flex-col">
            <h1 className="text-5xl font-semibold bg-gradient-to-r from-primary via-violet-500 to-violet-500 text-transparent bg-clip-text">Bienvenido</h1>
            <p className="text-xl text-foreground pl-[2px]">
              {user?.fullName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setCreating(true)}
          className="relative flex w-full sm:w-[300px] rounded-md shadow-sm px-2 py-4 
            cursor-pointer hover:shadow-md transition overflow-hidden group"
          style={{
            zIndex: 0,
          }}
        >
          {/* Fondo giratorio */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[500%] animate-spin-slow"
            style={{
              background: "conic-gradient(from 0deg, transparent, transparent, #3b82f6)",
              zIndex: -1,
            }}
          />
          {/* Fondo Blanco */}
          <div
            className="absolute bg-white inset-[2px] rounded-md"
            style={{ zIndex: 1 }}
          />

          {/* Contenido del botón */}
          <div className="w-full h-full z-10 flex flex-col gap-2 items-center">

            <PlusIcon className="size-12 text-primary" />
            <span className="group-hover:text-primary transition">Crear un nuevo Tablero</span>
          </div>


        </button>

        <h4 className="flex items-center gap-2">Lista de tableros
          {view === "recent" && (<Badge className="flex items-center gap-1 text-white/90 bg-sky-600/90"><ClockFadingIcon className="size-4" />Recientes</Badge>)}
          {view === "starred" && (<Badge className="flex items-center gap-1 text-white/90 bg-yellow-600/90"><Icons icon="starFilled" className="size-4" />Favoritos</Badge>)}
        </h4>
        <BoardList
          boards={displayBoards}
          creating={creating}
          setCreating={setCreating}
        />
      </section>
    </>
  )
}