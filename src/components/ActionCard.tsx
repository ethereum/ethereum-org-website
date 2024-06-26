import Image, { StaticImageData } from "next/image"
import type { ReactNode } from "react"

import Link from "next/link"

export type ActionCardProps = {
  children?: ReactNode
  to: string
  alt?: string
  image: StaticImageData
  imageWidth?: number
  title: ReactNode
  description?: ReactNode
  className?: string
  isRight?: boolean
  isBottom?: boolean
}

const ActionCard = ({
  to,
  alt,
  image,
  imageWidth = 220,
  title,
  description,
  children,
  className,
  isRight,
  isBottom = true,
  ...props
}: ActionCardProps) => {
  return (
    <div
      className={`flex-1 m-4 ${className}`}
      style={{
        boxShadow:
          "0px 14px 66px rgba(0, 0, 0, 0.07), 0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05)",
        color: "var(--color-text)",
      }}
      {...props}
    >
      <div
        className={`flex h-[260px] bg-cardGradient justify-${
          isRight ? "flex-end" : "center"
        } items-${isBottom ? "flex-end" : "center"} action-card-image-wrapper`}
        style={{ boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.1)" }}
      >
        <Image
          src={image}
          width={imageWidth}
          className="h-full"
          alt={alt || ""}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-6 action-card-content">
        <h3 className="text-2xl font-semibold mt-2 mb-4 leading-[1.4]">
          <Link
            href={to}
            className="no-underline text-current"
            style={{
              color: "var(--color-text)",
              textDecoration: "none",
            }}
          >
            {title}
          </Link>
        </h3>
        <p className={`mb-0 bg-slate-200`}>{description}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  )
}

export default ActionCard
