import { useEffect, useRef, useState } from "react"

interface Props {
  trigger: React.ReactNode
  children: React.ReactNode
}

export const Dropdown = ({ trigger, children }: Props) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])



  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button className="cursor-pointer" onClick={() => setOpen(prev => !prev)}>
        {trigger}
      </button>
      {open && (
        <div className="absolute right-0 shadow-lg max-w-40 overflow-hidden rounded-md z-50">
          {children}
        </div>
      )}
    </div>
  )
}