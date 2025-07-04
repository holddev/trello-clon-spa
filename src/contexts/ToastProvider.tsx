import { useEffect, useState } from "react";
import { toast } from "../utils/toast";
import { LoaderPinwheelIcon, PartyPopper, SirenIcon } from "lucide-react";


interface ToastState {
  id: number;
  type: "ok" | "error" | "loading";
  message: string;
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  useEffect(() => {
    toast._register((type, { message, duration = 3000 }) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    });
  }, []);

  const icons = {
    ok: <PartyPopper className="text-green-600 size-5" />,
    error: <SirenIcon className="text-red-600 size-5" />,
    loading: <LoaderPinwheelIcon className="text-yellow-600 size-5 animate-spin" />
  }

  return (
    <>
      {children}
      <div className="fixed right-6 bottom-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm
              rounded-sm shadow-md animate-fade-in-up transition-all duration-300 text-black/80
              bg-gradient-to-br from-primary/20 via-gray-100 to-white
            ${toast.type === "ok" ? "border-l-4 border-green-600"
                : toast.type === "error" ? "border-l-4 border-red-600 "
                  : "border-l-4 border-yellow-600 "}`}
          >
            {icons[toast.type]}
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
};
