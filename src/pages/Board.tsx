
import { PlusIcon } from "lucide-react"
import { useMemo, useState } from "react";
import { useBoard } from "../hooks/useBoard";
import { BoardList } from "../components/board/BoardList";
import { useSearchParams } from "react-router-dom";
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
      return [...boards].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
    if (view === "starred") {
      return boards.filter((board) => board.is_favorite)
    }

    return boards
  }, [boards, view])


  return (
    <>
      <NavBar />
      <section className="relative h-auto flex flex-col gap-4 mb-12 mt-5 py-5 px-2">
        <div className="flex gap-2 mb-2">
          <div className="size-16 md:size-20 animate-pulse bg-primary/10 border-2 border-primary border-t-transparent border-b-transparent rounded-full p-2 grid text-2xl sm:text-3xl md:text-4xl place-content-center">👋</div>
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-primary via-violet-500 to-violet-500 text-transparent bg-clip-text">Bienvenido</h1>
            <p className="text-base md:text-xl text-foreground pl-[2px]">
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

        <BoardList
          view={view}
          boards={displayBoards}
          creating={creating}
          setCreating={setCreating}
        />
      </section>
    </>
  )
}