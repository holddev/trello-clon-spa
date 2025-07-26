import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { Button } from "./UI/Button"
import { LogInIcon } from "lucide-react"
import { ToggleTheme } from "./ToggleTheme"

export const Header = () => {
  return (
    <header className="fixed left-0 w-full  backdrop-blur-2xl shadow-sm">
      <div className="max-w-5xl flex justify-between py-2 mx-auto px-2">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-primary">Trello Clon</h2>
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="font-semibold flex items-center gap-1">
                <LogInIcon className="size-4" />Acceder
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
          <ToggleTheme />
        </div>
      </div>
    </header>
  )
}