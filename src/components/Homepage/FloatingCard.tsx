import { cn } from "@/lib/utils/cn"

type FloatingCardProps = {
  variant?: "default" | "primary"
  className?: string
  children: React.ReactNode
}

const FloatingCard = ({
  variant = "default",
  className,
  children,
}: FloatingCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center rounded-base px-5 py-4 md:rounded-3xl md:px-6 md:shadow-lg",
        variant === "primary"
          ? "bg-linear-to-b from-purple-700 to-purple-500 text-white"
          : "border bg-background",
        className
      )}
    >
      {children}
    </div>
  )
}

export default FloatingCard
