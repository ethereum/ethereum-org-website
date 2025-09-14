"use client"

import { useState } from "react"

import { Story } from "@/lib/types"

import Twitter from "@/components/icons/twitter.svg"
import { Image } from "@/components/Image"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

const stories: Story[] = [
  {
    name: "imrulo.eth",
    storyEnglish:
      "I'm Cuban. I live in Serbia.From Cuba, opening a bank account was almost impossible. Paying online… even more difficult.\n\nWhen I arrived in Serbia, I thought everything would be easier. But in 2021, something happened to me that I'll never forget. A client asked me for a website. He paid me via PayPal. And PayPal… blocked my money. Just when I needed it most.\n\nThat same day, I started looking for solutions. And I found Ethereum.\n\nThat's when everything changed. Thanks to Ethereum, I was able to receive direct payments. Without banks. Without blocks. Without asking permission.\n\nSince then, I fell in love with Ethereum.Because it's not just money. It's freedom. It's being able to work and get paid, no matter where you come from.\n\nEvery time I have something on another network, I try to move it to Ethereum.Because I believe in its potential. In its ability to give opportunities to people like me. People who come from countries where the system closes its doors to you.\n\nFor me, Ethereum isn't just technology. It's a tool for living a better life.",
    storyOriginal:
      "Soy cubano. Vivo en Serbia. Desde Cuba, abrir una cuenta bancaria era casi imposible. Pagar online… aún más difícil.\n\nCuando llegué a Serbia, pensé que todo sería más fácil. Pero en 2021 me pasó algo que no olvido. Un cliente me pidió una página web. Me pagó por PayPal. Y PayPal… me bloqueó el dinero. Justo cuando más lo necesitaba.\n\nEse mismo día me puse a buscar soluciones. Y encontré Ethereum.\n\nAhí cambió todo. Gracias a Ethereum pude recibir pagos directo. Sin bancos. Sin bloqueos. Sin pedir permiso.\n\nDesde entonces, me enamoré de Ethereum. Porque no es solo dinero. Es libertad. Es poder trabajar y cobrar, sin importar de dónde vengas.\n\nCada vez que tengo algo en otra red, trato de moverlo a Ethereum. Porque creo en su potencial. En su capacidad de darle oportunidades a gente como yo. Gente que viene de países donde el sistema te cierra las puertas.\n\nEthereum, para mí, no es solo tecnología. Es una herramienta para vivir mejor.",
    twitter: null,
    country: "Serbia",
    date: "2025-04-26",
  },
  {
    name: "Casio",
    storyEnglish:
      "How DeFi has made an impact on my life: Spent 8 years working regular jobs, perfect credit, no debt and all banks denied my loan apps after months of back n forth. In less than 30 minutes I took a loan agains't my ETH which allowed me to buy the land and start construction.",
    storyOriginal: null,
    twitter: "https://twitter.com/0xCasio",
    country: null,
    date: "2025-03-24",
  },
  {
    name: "Thiago",
    storyEnglish:
      "In emerging regions, instability, distrust, and social inequality are commonplace. Ethereum offers not only a technological alternative, but a philosophical one. It allows us to build systems where transparency is default, trust is programmable, and access is open.",
    storyOriginal: null,
    twitter: null,
    country: "Brazil",
    date: "2025-04-15",
  },
]
const WhatAreAppsStories = () => {
  const [expandedStories, setExpandedStories] = useState<
    Record<number, boolean>
  >({})

  const handleExpand = (index: number) => {
    setExpandedStories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="my-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {stories.map((story, index) => (
        <div
          key={story.name}
          className="flex flex-col gap-4 rounded-2xl border bg-background p-6"
        >
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-2">
              <div>
                {story.twitter && (
                  <Image
                    src={`https://unavatar.io/twitter/${story.twitter.split("/").pop()}`}
                    alt={story.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                {!story.twitter && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-c">
                    <p className="text-lg font-bold text-white">
                      {story.name?.slice(0, 1).toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-md font-bold">{story.name}</p>
                <p className="text-sm text-body-medium">
                  {story.twitter
                    ? `@${story.twitter.split("/").pop()}`
                    : story.country}
                </p>
              </div>
            </div>
            <div>
              {story.twitter && (
                <ButtonLink
                  href={story.twitter}
                  variant="ghost"
                  className="justify-start px-0 text-body"
                  hideArrow
                >
                  <Twitter />
                </ButtonLink>
              )}
            </div>
          </div>
          <div>
            <p
              className={cn(
                "mb-1 line-clamp-6",
                expandedStories[index] && "line-clamp-none"
              )}
            >
              {story.storyEnglish}
            </p>
            <Button
              onClick={() => handleExpand(index)}
              variant="ghost"
              className="h-auto min-h-0 p-0 text-start text-sm"
            >
              {expandedStories[index] ? "Read less" : "Read more"}
            </Button>
          </div>
          <p className="text-sm text-body-medium">
            {new Date(story.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      ))}
    </div>
  )
}

export default WhatAreAppsStories
