import { Outlet } from "react-router-dom"
import { NavBar } from "../components/navigation/NavBar"
import { SideBar } from "../components/SideBar"

export const DashboardLayout = () => {
  return (
    <div className="h-auto flex max-h-screen overflow-hidden">
      <SideBar />
      <main className="w-full bg-background overflow-hidden">
        <NavBar />
        <div className="h-full overflow-y-scroll ">
          <Outlet />
        </div>
      </main>
    </div>
  )
}