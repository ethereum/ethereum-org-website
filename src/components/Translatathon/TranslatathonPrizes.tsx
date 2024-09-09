import Emoji from "@/components/Emoji"
import Link from "@/components/Link"

const TranslatathonPrizes = () => {
  return (
    <div className="flex w-full flex-col gap-8 rounded-lg">
      <div className="m-0 py-4 sm:m-auto">
        <div className="flex flex-row gap-4">
          <div className="flex h-32 w-32 items-center justify-center rounded-lg p-1 shadow-md">
            <div className="h-16 w-16 items-center justify-center">
              <Emoji text="🥇" className="text-[64px]" />
            </div>
          </div>
          <div className="flex max-w-48 flex-col items-center justify-center text-center">
            <p className="text-2xl font-bold">1st place</p>
            <p className="text-4xl font-bold">$5000</p>
            <Link href="https://devcon.org">+ Devcon SEA ticket</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="justify-left flex flex-1 items-center gap-4 py-4 sm:justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-lg p-1 shadow-md">
            <div className="h-11 w-11">
              <Emoji
                text="🥈"
                className="content-center items-center text-[44px]"
              />
            </div>
          </div>
          <div className="flex max-w-48 flex-col items-center justify-center text-center">
            <p className="text-lg font-bold">2nd place</p>
            <p className="text-3xl font-bold">$3000</p>
            <Link href="https://devcon.org">+ Devcon SEA ticket</Link>
          </div>
        </div>
        <div className="justify-left flex flex-1 items-center gap-4 sm:justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-lg p-1 shadow-md">
            <div className="h-11 w-11">
              <Emoji text="🥉" className="text-[44px]" />
            </div>
          </div>
          <div className="flex max-w-48 flex-col items-center justify-center text-center">
            <p className="text-lg font-bold">3rd place</p>
            <p className="text-3xl font-bold">$1500</p>
            <Link href="https://devcon.org">+ Devcon SEA ticket</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="justify-left flex flex-1 items-center gap-4 sm:justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg p-1 shadow-md">
            <div className="h-9 w-9">
              <Emoji text="🌟" className="text-[36px]" />
            </div>
          </div>
          <div className="flex max-w-48 flex-col items-center justify-center text-center">
            <p className="text-md font-bold">4th & 5th</p>
            <p className="text-2xl font-bold">$500</p>
            <Link href="https://devcon.org">
              + 50% Devcon SEA ticket discount
            </Link>
          </div>
        </div>
        <div className="justify-left flex flex-1 items-center gap-4 sm:justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg p-1 shadow-md">
            <div className="h-9 w-9">
              <Emoji text=":scroll:" className="text-[36px]" />
            </div>
          </div>
          <div className="flex max-w-48 flex-col items-center justify-center text-center">
            <p className="text-md font-bold">6th to 10th</p>
            <p className="text-2xl font-bold">$200</p>
            <Link href="https://devcon.org">
              + 50% Devcon SEA ticket discount
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-center">
        <div className="flex flex-col">
          <p className="text-body-base text-lg">
            Top translator in each language: $100{" "}
          </p>
          <p className="text-body-base text-lg">+ Participation prizes</p>
        </div>
        <div className="flex flex-col text-sm text-body-medium">
          <Link href="/contributing/translation-program/translatathon/terms-and-conditions/">
            See full Terms & Conditions here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TranslatathonPrizes
