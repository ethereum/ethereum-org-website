import { ButtonLink } from "@/components/Buttons"

import Emoji from "../Emoji"

const localCommunitiesData = [
  {
    emojiString: "🇷🇴",
    lumaLink: "https://lu.ma/b7m1nyid",
    location: "Bucharest, Romania",
    eventName: "Ethereum Translatathon Bucharest 🌐🐬",
  },
  {
    emojiString: "🇪🇹",
    lumaLink: "https://lu.ma/zi092c8v",
    location: "Addis Ababa, Ethiopia",
    eventName: "Eth Translatathon",
  },
  {
    emojiString: "🇷🇸",
    lumaLink: "https://lu.ma/ehd86ohx",
    location: "Belgrade, Serbia",
    eventName: "Ethereum Translatathon — ETH Belgrade",
  },
  {
    emojiString: "🇹🇼",
    lumaLink: "https://lu.ma/2i9fi2zi",
    location: "Taipei, Taiwan",
    eventName: "2024 ethereum.org Translatathon Hub - Taiwan",
  },
  {
    emojiString: "🇿🇲",
    lumaLink: "https://lu.ma/4xyfdlz7",
    location: "Lusaka, Zambia",
    eventName: "Ethereum Translatathon - Hosted by ETHZambezi",
  },
  {
    emojiString: "🇳🇬",
    lumaLink: "https://lu.ma/w00aw06a",
    location: "Kaduna, Nigeria",
    eventName: "Ethereum Hausa Translatathon",
  },
  {
    emojiString: "🇳🇬",
    lumaLink: "https://lu.ma/1vj9u4rj",
    location: "Lagos, Nigeria",
    eventName: "Ethereum Yorùbá Translatathon",
  },
  {
    emojiString: "🇧🇷",
    lumaLink: "https://lu.ma/lkiakqtu",
    location: "Rio de Janeiro, Brazil",
    eventName: "Ethereum Translathon 📜🔍 hosted by EthSamba & BambaLabs",
  },
  {
    emojiString: "🇲🇾",
    lumaLink: "https://www.meetup.com/ethmalaysia/events/302654952/",
    location: "Kuala Lumpur, Malaysia",
    eventName: "Lepak and Join Translatathon",
  },
  {
    emojiString: "🇮🇳",
    lumaLink: "https://lu.ma/9eajbv89",
    location: "Kerala, India",
    eventName: "Ethereum.org - TRANSLATATHON INDIA - Jñāna",
  },
  {
    emojiString: "🇬🇭",
    lumaLink: "https://lu.ma/qvzlo7nc",
    location: "Accra, Ghana",
    eventName: "Ghana Ethereum Translatathon 2024",
  },
]

export const LocalCommunitiesList = () => {
  return (
    <div className="flex flex-col gap-4">
      {localCommunitiesData.map((community, index) => (
        <div
          key={index}
          className="flex flex-col-reverse justify-between gap-8 bg-background-highlight p-6 md:flex-row"
        >
          <div className="flex flex-col gap-6">
            <div className="flex w-fit items-center rounded-full bg-white px-5 py-1 dark:bg-black">
              <p className="font-bold">{community.location} </p>
            </div>
            <div>
              <p className="text-lg font-bold">{community.eventName}</p>
            </div>
            <div>
              <ButtonLink
                href={community.lumaLink}
                variant="outline"
                color="body.base"
              >
                Register here
              </ButtonLink>
            </div>
          </div>
          <div className="min-w-[90px]">
            <Emoji className="text-[90px]" text={community.emojiString} />
          </div>
        </div>
      ))}
    </div>
  )
}
