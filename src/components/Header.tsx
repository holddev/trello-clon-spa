import { Button } from "./UI/Button"

export const Header = () => {
  return (
    <header className="fixed left-0 w-full  backdrop-blur-2xl shadow-sm">
      <div className="max-w-5xl flex justify-between py-2 mx-auto">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-blue-600">Trello Clon</h2>
        <Button className="font-semibold">Ingresar</Button>
      </div>
    </header>
  )
}