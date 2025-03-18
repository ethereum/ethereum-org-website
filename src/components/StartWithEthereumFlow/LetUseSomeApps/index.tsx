import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"
import { LinkBox } from "@/components/ui/link-box"
import { Tag } from "@/components/ui/tag"

import { trackCustomEvent } from "@/lib/utils/matomo"

import AaveImage from "@/public/images/dapps/aave.png"
import OpenSeaImage from "@/public/images/dapps/opensea.png"
import UniswapImage from "@/public/images/dapps/uni.png"
import WarpcastImage from "@/public/images/dapps/warpcast.png"

const LetUseSomeApps = ({
  stepIndex,
  totalSteps,
}: {
  stepIndex: number
  totalSteps: number
}) => {
  const dappsList = [
    {
      name: "Warpcast",
      description: "The social and community platform of crypto.",
      tag: (
        <Tag
          status="tag"
          size="small"
          className="bg-[#FFE3D3] font-bold text-black"
        >
          SOCIALS
        </Tag>
      ),
      url: "https://warpcast.com/",
      image: WarpcastImage,
    },
    {
      name: "Aave",
      description: "Lend your tokens to earn interest and withdraw any time.",
      tag: (
        <Tag
          status="tag"
          size="small"
          className="bg-[#E1FEFA] font-bold text-black"
        >
          FINANCE
        </Tag>
      ),
      url: "https://aave.com/",
      image: AaveImage,
    },
    {
      name: "Uniswap",
      description: "Swap your tokens for different ones globally.",
      tag: (
        <Tag
          status="tag"
          size="small"
          className="bg-[#E1FEFA] font-bold text-black"
        >
          FINANCE
        </Tag>
      ),
      url: "https://app.uniswap.org/",
      image: UniswapImage,
    },
    {
      name: "OpenSea",
      description: "Buy, sell, discover, and trade limited-edition goods.",
      tag: (
        <Tag
          status="tag"
          size="small"
          className="bg-[#D1D1FF] font-bold text-black"
        >
          COLLECTIBLES
        </Tag>
      ),
      url: "https://opensea.io/",
      image: OpenSeaImage,
    },
  ]

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-24">
      <div className="flex flex-1 flex-col gap-14">
        <div className="flex flex-col gap-5">
          <div>
            <Tag status="tag">
              {stepIndex} / {totalSteps}
            </Tag>
          </div>
          <h2 className="text-3xl font-bold">Let Use Some Apps</h2>
          <p>
            Its time to go onchain and benefit from the wide ecosystem of
            projects available you.
          </p>
          <div className="hidden lg:flex">
            <Link href="/dapps" className="font-bold no-underline">
              Explore more
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <div>
          {dappsList.map((dapp) => (
            <LinkBox
              key={dapp.name}
              className="group flex cursor-pointer flex-col items-center justify-between gap-4 rounded-xl border-b border-background p-4 last:border-b-0 hover:bg-background-highlight sm:flex-row"
              onClick={() => {
                window.open(dapp.url, "_blank")
                trackCustomEvent({
                  eventCategory: "start page",
                  eventAction: "dapps",
                  eventName: dapp.name,
                })
              }}
            >
              <div className="flex flex-row items-center gap-4">
                <Image
                  className="rounded-xl"
                  src={dapp.image}
                  alt={dapp.name}
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-xl font-bold">{dapp.name}</p>
                    {dapp.tag}
                  </div>
                  <p className="text-sm text-body-medium">{dapp.description}</p>
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <ButtonLink
                  href={dapp.url}
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:!text-primary-hover group-hover:shadow-[4px_4px_theme('colors.primary.low-contrast')] sm:w-auto"
                >
                  Go
                </ButtonLink>
              </div>
            </LinkBox>
          ))}
        </div>
        <div className="mb-4 flex justify-center lg:hidden">
          <Link
            href="/dapps"
            className="font-bold no-underline"
            onClick={() => {
              trackCustomEvent({
                eventCategory: "start page",
                eventAction: "dapps",
                eventName: "Explore more",
              })
            }}
          >
            Explore more
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LetUseSomeApps
