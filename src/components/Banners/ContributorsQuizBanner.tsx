import { FlexProps } from "@chakra-ui/react"

import { ButtonLink } from "../Buttons"
import CalloutBanner from "../CalloutBanner"

import PplLearning from "@/public/ppl-learning.png"

function ContributorsQuizBanner(props: FlexProps) {
  return (
    <CalloutBanner
      image={PplLearning}
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
