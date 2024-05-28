import { FlexProps } from "@chakra-ui/react"

import { ButtonLink } from "../Buttons"
import CalloutBanner from "../CalloutBanner"

import PeopleLearning from "@/public/people-learning.png"

// TODO: refactor to use CalloutBanner component
function ContributorsQuizBanner(props: FlexProps) {
  return (
    <CalloutBanner
      image={PeopleLearning}
      alt=""
      title="Unsure where to start?"
      description="Take a quick quiz and find out how you can contribute on ethereum.org."
      {...props}
    >
      <ButtonLink href="https://ethdotorg.typeform.com/contributor">
        Take a quiz
      </ButtonLink>
    </CalloutBanner>
  )
}

export default ContributorsQuizBanner
