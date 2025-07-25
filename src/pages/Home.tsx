import { ArrowRightIcon } from "lucide-react"
import { Button } from "../components/UI/Button"
import { Icons } from "../components/Icons"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-2">
      <Header />
      <main className="flex items-center flex-col md:flex-row gap-5 min-h-screen pt-32 md:pt-0">
        <div className="flex flex-col gap-4 sm:gap-5">
          <h1 className="dark:text-white/90 font-bold text-2xl sm:text-4xl md:text-5xl md:pb-2">Organiza tu trabajo y tu día a día con <span className="text-primary whitespace-nowrap">Trello Clon</span></h1>
          <p className="text-pretty text-sm sm:text-base md:text-xl">
            Una herramienta visual que te ayuda a organizar múltiples tareas y avanzar en tus proyectos, sin complicaciones.
          </p>
          <SignedIn>
            <Button
              className="w-fit"
            >
              <Link to="/dashboard" className="flex items-center gap-1 font-semibold">
                Ver mis tableros <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
            >
              <Button
                className="w-fit flex items-center gap-1 font-semibold"
              >
                Comenzar Ahora <ArrowRightIcon className="size-4 md:size-5" />
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

        <div>
          <Icons icon="personWorking" className="h-auto min-w-[200px] w-[40vw] max-w-[300px]" />
        </div>
      </main>
      <Footer />
    </div>
  )
}