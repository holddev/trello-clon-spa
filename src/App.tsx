/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import { Home } from "./pages/Home"
import { Board } from "./pages/Board"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { BoardDetail } from "./pages/BoardDetail"
import { ClerkProvider } from "@clerk/clerk-react"
import ProtectedRoute from "./components/ProtectedRoute"
import { esES } from "@clerk/localizations"
import { ToastProvider } from "./contexts/ToastProvider"

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      localization={esES as any}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <ToastProvider>
                <DashboardLayout />
              </ToastProvider>
            </ProtectedRoute>
          }>
            <Route index element={<Board />} />
            <Route path=":id/:slug" element={<BoardDetail />} />
          </Route>
        </Routes>
      </Router>
    </ClerkProvider >
  )
}

export default App
