import { FlexProps } from "@chakra-ui/react"

import { ButtonLink } from "../Buttons"
import CalloutBanner from "../CalloutBanner"

import PeopleLearning from "@/public/people-learning.png"

function ContributorsQuizBanner(props: FlexProps) {
  return (
    <CalloutBanner
      image={PeopleLearning}
      alt="People learning about Ethereum"
      title="Unsure where to start?"
      description="Take a quick quiz and find out how you can contribute on ethereum.org."
      justifyImage={{ base: "center", md: "end" }}
      {...props}
    >
      <ButtonLink href="https://ethdotorg.typeform.com/contributor">
        Take a quiz
      </ButtonLink>
    </CalloutBanner>
  )
}

export default ContributorsQuizBanner
