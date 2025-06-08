import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import { Home } from "./pages/Home"
import { Board } from "./pages/Board"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { BoardDetail } from "./pages/BoardDetail"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Board />} />
          <Route path=":id" element={<BoardDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
