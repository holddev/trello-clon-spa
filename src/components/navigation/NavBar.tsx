import { Link, useLocation } from "react-router-dom"
import { cn } from "../../utils/utils"

export const NavBar = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    console.log("comparando: ", location.pathname, path, location.pathname === path)
    return location.pathname + location.search === path
  }

  const itemsLink = [
    {
      path: "/dashboard",
      label: "Espacio de trabajo",
    },
    {
      path: "/dashboard?view=recent",
      label: "Recientes",
    },
    {
      path: "/dashboard?view=starred",
      label: "Destacado",
    },
  ]

  return (
    <header className="flex gap-4 items-end bg-primary pt-2 text-white/90">
      <h2 className="pl-12 font-bold text-2xl">Trello Clon</h2>
      <nav>
        <ul className="flex">
          {
            itemsLink.map((item, index) => (
              <li className="flex" key={index}>
                <Link
                  to={item.path}
                  className={cn(
                    "px-3 pt-2 pb-1 rounded-t-2xl transition relative",
                    isActive(item.path) ? "bg-background shadow-[inset_0_2px_3px_rgba(0,0,0,1)] text-primary" : "hover:bg-background/20"
                  )}
                >
                  {item.label}
                  <div className={cn(
                    "absolute w-full h-1 bg-background scale-x-95 z-10 bottom-0 left-0 scale-y-0 transition pointer-events-none",
                    isActive(item.path) && "scale-y-100"
                  )} />
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}