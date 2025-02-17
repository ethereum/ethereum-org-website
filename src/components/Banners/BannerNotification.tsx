import { cn } from "@/lib/utils/cn"

export type BannerNotificationProps = React.HTMLAttributes<HTMLDivElement> & {
  shouldShow?: boolean
}

const BannerNotification = ({
  children,
  shouldShow,
  className,
  ...props
}: BannerNotificationProps) => {
  if (!shouldShow) return <></>
  return (
    <aside
      className={cn(
        "flex items-center justify-center gap-2 bg-primary-action px-8 py-4 text-white [&_a]:text-white [&_a]:hover:text-white/80",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

export default BannerNotification
