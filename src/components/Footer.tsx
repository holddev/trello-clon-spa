import { Icons } from "./Icons"

export const Footer = () => {
  return (
    <footer className="absolute bottom-1">
      <p className="flex items-center gap-2 max-w-5xl text-sm  sm:text-base">
        Desarrollado por
        <a
          href="https://github.com/holddev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:underline"
        >
          <Icons icon="GitHub" className="size-4" />
          Holddev
        </a>
      </p>
    </footer>
  )
}