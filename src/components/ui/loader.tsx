import * as React from "react"

import { cn } from "@/lib/utils/cn"

// svg embedded directly to ensure child components (ie. `line`) remain reachable by css selectors for animations
const Loader = React.forwardRef<
  SVGSVGElement,
  React.HTMLAttributes<SVGElement>
>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke-linejoin="round"
    stroke-linecap="round"
    stroke="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 1L5.5 12M12 1L18.5 12M12 1V15.85M5.5 12L12 15.85M5.5 12L12 9.25L18.5 12M12 15.85L18.5 12M12 18.05L5.5 14.2L12 23M12 18.05L18.5 14.2L12 23M12 18.05V23" />
    <line x1="18.3536" y1="22.6464" x2="17.3536" y2="21.6464" />
    <line x1="18.6464" y1="1.64645" x2="16.6464" y2="3.64645" />
    <line x1="21.8419" y1="7.52566" x2="18.8419" y2="8.52566" />
    <line x1="22.2773" y1="19.584" x2="19.2774" y2="17.584" />
    <line x1="5.64645" y1="2.35355" x2="6.64645" y2="3.35355" />
    <line x1="5.35355" y1="23.3536" x2="7.35355" y2="21.3536" />
    <line x1="2.15811" y1="17.4743" x2="5.15811" y2="16.4743" />
    <line x1="1.72265" y1="5.41603" x2="4.72265" y2="7.41603" />
  </svg>
))
Loader.displayName = "Loader"

const LoadingDot = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "children">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-label="dot"
    className={cn(
      "size-[1em] animate-fade-in-pause-out rounded bg-disabled opacity-0",
      className
    )}
    {...props}
  />
))
LoadingDot.displayName = "LoadingDot"

const LoadingDots = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, "children">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex gap-[1em]", className)} {...props}>
    <LoadingDot />
    <LoadingDot style={{ animationDelay: "1s" }} />
    <LoadingDot style={{ animationDelay: "2s" }} />
  </div>
))
LoadingDots.displayName = "LoadingDots"

export { Loader, LoadingDot, LoadingDots }
