"use client"

import dynamic from "next/dynamic"
import { useLocale } from "next-intl"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Wallet } from "@/lib/types"

import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import StartWithEthereumFlow from "@/components/StartWithEthereumFlow"
import ShareModal from "@/components/StartWithEthereumFlow/ShareModal"

import HeroImage from "@/public/images/heroes/developers-hub-hero.jpg"
import ManDogeImage from "@/public/images/start-with-ethereum/man-doge-playing.png"

// Dynamically import Wagmi/RainbowKit components
const WalletProviders = dynamic(() => import("@/components/WalletProviders"), {
  ssr: false,
})

const queryClient = new QueryClient()

const StartWithCryptoPage = ({
  newToCryptoWallets,
}: {
  newToCryptoWallets: Wallet[]
}) => {
  const locale = useLocale()

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProviders locale={locale}>
        <MainArticle className="flex w-full flex-col items-center overflow-x-hidden">
          <div className="mb-16 h-[240px] w-full md:h-[380px] lg:h-[398px]">
            <Image
              src={HeroImage}
              alt={"Start with crypto"}
              sizes="(max-width: 1504px) 100vw, 1504px"
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="mb-36 flex flex-col gap-12 overflow-x-hidden px-8">
            <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-4 text-center">
              <h1>Get started with Ethereum</h1>
              <p>
                Ethereum is so much more than just trading tokens on an
                exchange. Step into the new world yourself and learn all the
                basics in just few steps.
              </p>
            </div>

            <div id="start-with-ethereum-flow" className="flex flex-col gap-12">
              <StartWithEthereumFlow newToCryptoWallets={newToCryptoWallets} />
            </div>

            <div className="flex w-full flex-col gap-12 rounded-2xl border border-accent-c/10 bg-gradient-to-t from-accent-c/10 from-20% to-accent-c/5 to-60% px-12 py-16 md:flex-row dark:from-accent-c/20 dark:to-accent-c/10">
              <div className="flex flex-1 flex-col gap-8">
                <h2 className="">
                  Do you know anyone who needs help to onboard?
                </h2>
                <p>
                  Billions can’t open bank accounts or freely use their money.
                  Ethereum’s financial system is always open and unbiased.
                </p>
                <div className="flex w-full md:w-auto">
                  <ShareModal />
                </div>
              </div>
              <div className="flex max-w-[450px] flex-col items-center justify-center">
                <Image src={ManDogeImage} alt="Man Doge" />
              </div>
            </div>
          </div>
        </MainArticle>
      </WalletProviders>
    </QueryClientProvider>
  )
}

export default StartWithCryptoPage
