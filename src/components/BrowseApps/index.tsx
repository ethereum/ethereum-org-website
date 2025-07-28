import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import AaveLogo from "@/public/images/dapps/aave.png"
import FarcasterLogo from "@/public/images/dapps/farcaster.png"
import UniswapLogo from "@/public/images/dapps/uni.png"
import EthereumLogo from "@/public/images/layer-2/ethereum.png"

const apps = [
  {
    name: "Aave",
    description: "Lend your tokens to earn interest and withdraw any time.",
    logo: AaveLogo,
    website: "https://aave.com",
  },
  {
    name: "Farcaster",
    description: "The social and community platform of crypto.",
    logo: FarcasterLogo,
    website: "https://farcaster.xyz",
  },
  {
    name: "Uniswap",
    description: "Swap your tokens for different ones globally.",
    logo: UniswapLogo,
    website: "https://uniswap.org",
  },
]

const BrowseApps = () => {
  return (
    <div className="mt-16 flex flex-col items-center justify-center rounded-3xl bg-radial-b p-8 md:p-20">
      <div className="flex max-w-2xl flex-col items-center justify-center gap-2 text-center">
        <h2>Browse apps</h2>
        <p className="text-gray-500">
          We&apos;ve listed some of the most popular apps out there so you can
          try one out. You&apos;ll need ETH and a wallet to get the most out of
          them.
        </p>
      </div>
      <ButtonLink href="/apps" className="mt-14">
        Take a look
      </ButtonLink>
      <div className="mt-14">
        <div className="flex flex-col gap-6">
          {apps.map((app, idx) => {
            return (
              <div
                key={idx}
                className={`flex flex-1 flex-col items-start gap-4 p-4 md:flex-row md:items-center ${
                  idx < apps.length - 1 ? "border-b border-background" : ""
                }`}
              >
                <div className="flex flex-1 flex-col items-start gap-4 md:flex-row md:items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-background shadow-drop">
                    <Image
                      src={app.logo}
                      alt={app.name}
                      style={{
                        width: "46px",
                        height: "46px",
                      }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-xl font-bold">{app.name}</p>
                    <p className="text-body-medium">{app.description}</p>
                  </div>
                </div>
                <div className="flex w-full md:w-auto">
                  <ButtonLink
                    href={app.website}
                    variant="outline"
                    className="w-full"
                  >
                    Go
                  </ButtonLink>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-step-1 px-4 py-2 text-sm font-bold">
          <Image
            src={EthereumLogo}
            alt="Ethereum"
            style={{
              width: "24px",
              height: "24px",
            }}
          />
          <p>Powered by Ethereum</p>
        </div>
      </div>
    </div>
  )
}

export default BrowseApps
