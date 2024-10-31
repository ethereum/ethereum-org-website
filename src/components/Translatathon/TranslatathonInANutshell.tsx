import { TwImage } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"
import Link from "@/components/ui/Link"

import dogeImage from "@/public/images/doge-computer.png"
import futureImage from "@/public/images/future_transparent.png"
import settlementImage from "@/public/images/translatathon/settlement.png"

export const TranslatathonInANutshell = () => {
  return (
    <Flex className="flex-col bg-gradient-to-r from-[#7f7fd5]/20 via-[#86a8e7]/20 to-[#91eae4]/20 px-8 py-16">
      <Flex className="m-auto">
        <h2 className="mb-8 text-3xl">Translatathon essentials</h2>
      </Flex>

      <Flex className="w-full flex-col items-center gap-8 p-8 md:flex-row">
        <Flex className="w-full flex-col gap-2 self-center">
          <h3 className="text-2xl">Earn points</h3>
          <p>
            Translate ethereum.org and ecosystem content to earn points and
            compete with other participants. 1 translated word = 1 point
          </p>
        </Flex>
        <Flex className="w-full justify-center">
          <TwImage
            src={settlementImage}
            alt=""
            width={327}
            className="w-[327px]"
            style={{ objectFit: "contain" }}
          />
        </Flex>
      </Flex>

      <Flex className="w-full flex-col-reverse items-start gap-8 p-8 md:flex-row">
        <Flex className="w-full justify-center">
          <TwImage
            src={futureImage}
            alt=""
            width={327}
            className="w-[327px]"
            style={{ objectFit: "contain" }}
          />
        </Flex>
        <Flex className="w-full flex-col gap-2 self-center">
          <h3 className="text-2xl">Human translations only</h3>
          <p>
            Using machine translation is forbidden! All translations will be
            reviewed and evaluated, and participants using machine translation
            will be automatically disqualified and not be eligible to claim
            prizes (see{" "}
            <Link href="/contributing/translation-program/translatathon/terms-and-conditions/">
              terms and conditions
            </Link>
            )
          </p>
        </Flex>
      </Flex>

      <Flex className="w-full flex-col items-start gap-8 p-8 md:flex-row">
        <Flex className="w-full flex-col gap-2 self-center">
          <h3 className="text-2xl">Focus on untranslated lines only</h3>
          <p>
            Translate strings that do not have any suggested translations yet.
            Do not translate strings that have already been translated and
            approved
          </p>
        </Flex>
        <Flex className="w-full justify-center">
          <TwImage
            src={dogeImage}
            alt=""
            width={327}
            className="w-[327px]"
            style={{ objectFit: "contain" }}
          />
        </Flex>
      </Flex>

      <Flex className="w-full justify-center">
        <ButtonLink href="/contributing/translation-program/translatathon/details">
          Details and rules
        </ButtonLink>
      </Flex>
    </Flex>
  )
}
