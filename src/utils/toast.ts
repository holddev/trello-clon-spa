type ToastType = "ok" | "error" | "loading";

interface ToastOptions {
  message: string;
  duration?: number;
}

let showToast: ((type: ToastType, opts: ToastOptions) => void) | null = null;

export const toast = {
  ok: (message: string, duration = 3000) => {
    showToast?.("ok", { message, duration });
  },
  error: (message: string, duration = 3000) => {
    showToast?.("error", { message, duration });
  },
  loading: (message: string, duration = 3000) => {
    showToast?.("loading", { message, duration });
  },
  // para que el provider pueda registrar su función
  _register(fn: typeof showToast) {
    showToast = fn;
  }
};
