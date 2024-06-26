import React from "react"
import { IoCodeOutline } from "react-icons/io5"

import { TranslationKey } from "@/lib/types"

import Translation from "@/components/Translation"
import Image from "next/image"
import Link from "next/link"

export interface ITitleCardItem {
  title: string
  description: string
  caption?: string
  link?: string
  image?: string
  alt?: string
  id?: number
}

export type TitleCardListProps = {
  content: Array<ITitleCardItem>
  className?: string
  clickHandler: (idx: number) => void
  headerKey: TranslationKey
  isCode: boolean
}

const TitleCardList = ({
  content,
  className,
  clickHandler,
  headerKey,
  isCode,
}: TitleCardListProps) => {
  return (
    <div
      className={`w-full rounded-sm bg-background-base shadow-tableBox ${className}`}
    >
      <div className="flex items-center justify-between p-4 bg-ednBackground font-semibold border-b border-text">
        <IoCodeOutline />
        <Translation id={headerKey} />
        {isCode && (
          <div>
            <div className="flex">
              <div className="w-3 h-3 bg-fail300 mr-2 rounded-full" />
              <div className="w-3 h-3 bg-gridYellow mr-2 rounded-full" />
              <div className="w-3 h-3 bg-success300 mr-2 rounded-full" />
            </div>
          </div>
        )}
      </div>
      {content.map((listItem, idx) => {
        const { title, description, caption, link, image, alt, id } = listItem
        const isLink = !!link

        return isLink ? (
          <div
            key={id || idx}
            className="flex justify-between p-4 mb-1 w-full shadow-[0px_1px_1px_var(--eth-colors-tableItemBoxShadow)] text-current"
            style={{
              textDecoration: "none",
            }}
          >
            {image && (
              <Image
                src={image}
                alt={alt || ""}
                className="mt-1 mr-4 min-w-[20px]"
              />
            )}
            <div className="flex flex-1 flex-col mr-8">
              <Link href={link} className="text-inherit no-underline">
                {title}
              </Link>
              <div className="text-sm mb-0 bg-slate-200">{description}</div>
            </div>
            {caption && (
              <div className="flex flex-1 items-center flex-wrap mr-4">
                <div className="text-sm mb-0 bg-slate-200">{caption}</div>
              </div>
            )}
          </div>
        ) : (
          <div
            key={idx}
            className="flex justify-between p-4 mb-1 w-full shadow-[0px_1px_1px_var(--eth-colors-tableItemBoxShadow)] text-current cursor-pointer"
            onClick={() => clickHandler(idx)}
          >
            {image && (
              <Image
                src={image}
                alt={alt || ""}
                className="mt-1 mr-4 min-w-[20px]"
              />
            )}
            <div className="flex flex-1 flex-col mr-8">
              <div>{title}</div>
              <div className="text-sm mb-0 bg-slate-200">{description}</div>
            </div>
            {caption && (
              <div className="flex flex-1 items-center flex-wrap mr-4">
                <div className="text-sm mb-0 bg-slate-200">{caption}</div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TitleCardList
