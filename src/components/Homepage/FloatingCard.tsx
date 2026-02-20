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
        "flex flex-col justify-center rounded-2xl px-5 py-4 md:rounded-3xl md:px-6 md:shadow-lg",
        variant === "primary"
          ? "bg-gradient-to-b from-[#5c1eb4] to-[#7b3fd8] text-white"
          : "border bg-background",
        className
      )}
    >
      {children}
    </div>
  )
}

export default FloatingCard
