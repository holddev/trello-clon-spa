import { Outlet } from "react-router-dom"
import { SideBar } from "../components/SideBar"
import { BoardProvider } from "../contexts/BoardProvider"

export const DashboardLayout = () => {
  return (
    <div className="h-auto flex">
      <BoardProvider>
        <SideBar />
        <main className="w-full bg-background max-h-screen overflow-hidden">
          <div className="h-full overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </BoardProvider>
    </div>
  )
}