import { useRef } from "react";

interface Props {
  onChange: (color: string) => void
  color?: string
}

export const ColorPickerButton = ({ color, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative grid place-content-center">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
        style={{ backgroundColor: color }}
        title="Seleccionar color"
      >
        <span className="sr-only">Seleccionar color</span>
      </button>
      <input
        type="color"
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
        className="absolute w-0 h-0 opacity-0 overflow-hidden pointer-events-none"
      />
    </div>
  );
};