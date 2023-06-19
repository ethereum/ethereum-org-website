import React from "react"
import Translation from "../Translation"
import ButtonLink from "../ButtonLink"

interface IProps {
  campaign: string
}

const StakingRewardsButton: React.FC<IProps> = ({ campaign }) => (
  <ButtonLink
    to={`https://indexcoop.com/blog/introducing-the-diversified-staked-eth-index?utm_source=referral&utm_medium=EF&utm_campaign=${campaign}`}
    marginTop={4}
    width={{ base: "100%", sm: "auto" }}
  >
    <Translation id="get-started" />
  </ButtonLink>
)

export default StakingRewardsButton
