import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  delayDuration: number;
}

const TooltipContext = React.createContext<TooltipContextValue>({
  open: false,
  setOpen: () => {},
  delayDuration: 200,
});

function TooltipProvider({ children, delayDuration = 200 }: TooltipProviderProps) {
  return (
    <TooltipProviderContext.Provider value={{ delayDuration }}>
      {children}
    </TooltipProviderContext.Provider>
  );
}

const TooltipProviderContext = React.createContext<{ delayDuration: number }>({
  delayDuration: 200,
});

function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const { delayDuration } = React.useContext(TooltipProviderContext);

  return (
    <TooltipContext.Provider value={{ open, setOpen, delayDuration }}>
      <div className="relative inline-flex">{children}</div>
    </TooltipContext.Provider>
  );
}

function TooltipTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { setOpen, delayDuration } = React.useContext(TooltipContext);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  return (
    <button
      className={className}
      onMouseEnter={() => {
        timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
      }}
      onMouseLeave={() => {
        clearTimeout(timeoutRef.current);
        setOpen(false);
      }}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...props}
    >
      {children}
    </button>
  );
}

function TooltipContent({
  children,
  className,
  side = "right",
  ...props
}: React.ComponentProps<"div"> & { side?: "top" | "right" | "bottom" | "left" }) {
  const { open } = React.useContext(TooltipContext);

  if (!open) return null;

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  return (
    <div
      role="tooltip"
      className={cn(
        "absolute z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
        sideClasses[side],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
