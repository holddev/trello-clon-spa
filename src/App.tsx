import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import { Home } from "./pages/Home"
import { Board } from "./pages/Board"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { BoardDetail } from "./pages/BoardDetail"
import { ClerkProvider } from "@clerk/clerk-react"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Board />} />
            <Route path=":id" element={<BoardDetail />} />
          </Route>
        </Routes>
      </Router>
    </ClerkProvider>
  )
}

export default App
