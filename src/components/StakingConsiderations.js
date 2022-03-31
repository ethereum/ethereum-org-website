import React from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

const Container = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const List = styled.div`
  ol,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    padding: 0.25rem 0.5rem;
  }
`
const Content = styled.div`
  flex: 1;
`

const StakingConsiderations = ({ page }) => {
  const intl = useIntl()
  const data = {
    solo: [
      {
        title: "Open source",
        description:
          "Essential code is 100% open source and available to the public to fork and use",
        valid: "Open source",
        caution: "",
        warning: "Closed source",
        svg: <></>,
      },
      {
        title: "Audited",
        description:
          "Essential code has undergone formal auditing with results published and available publicly",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
      {
        title: "Bug bounty",
        description:
          "A public bug bounty has been performed on any essential code to rewards users for safely reporting and/or fixing vulnerabilities",
        valid: "Currently active",
        caution: "Completed",
        warning: "None",
        svg: <></>,
      },
      {
        title: "Battle tested",
        description:
          "Software has been available and used by the public for the indicated period of time",
        valid: "Live > 1 year",
        caution: "Live > 6 months",
        warning: "Newly released",
        svg: <></>,
      },
      {
        title: "Trustless",
        description:
          "Validator keys are not entrusted to any other human at any time in the validator lifecycle.<br/>Any smart contracts involved are free of back doors, without reliance on privileged permissions for execution.",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
      {
        title: "Permissionless",
        description:
          "User does not require any special permission to operate a validator using the software or service",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
      {
        title: "Multi-client",
        description:
          "Software enables users to pick from and switch between at least two or more CL clients",
        valid: "Easy client switching",
        caution: "",
        warning: "Limited to majority client",
        svg: <></>,
      },
      {
        title: "Self custody",
        description:
          "User maintains custody of any validator credentials, including signing and withdrawal keys",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
      {
        title: "Economical",
        description:
          "Users can operate a validator by staking less than 32 ETH, utilizing pooled funds from others",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
    ],
    saas: [
      {
        title: "Open source",
        description:
          "Essential code is 100% open source and available to the public to fork and use",
        valid: "Open source",
        caution: "",
        warning: "Closed source",
        svg: <></>,
      },
      {
        title: "Audited",
        description:
          "Essential code has undergone formal auditing with results published and available publicly",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
      {
        title: "Bug bounty",
        description:
          "A public bug bounty has been performed on any essential code to rewards users for safely reporting and/or fixing vulnerabilities",
        valid: "Currently active",
        caution: "Completed",
        warning: "None",
        svg: <></>,
      },
      {
        title: "Battle tested",
        description:
          "Service has been available and used by the public for the indicated period of time",
        valid: "Live > 1 year",
        caution: "Live > 6 months",
        warning: "Newly released",
        svg: <></>,
      },
      {
        title: "Permissionless",
        description:
          "User does not require any special permission, account sign up or KYC to participate with the service",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
      {
        title: "Diverse clients",
        description:
          "Service should not run more than 50% of their aggregate validators with a majority validator client",
        valid: "Less than 50%",
        caution: "Currently unknown",
        warning: "More than 50%",
        svg: <></>,
      },
      {
        title: "Self custody",
        description:
          "User maintains custody of any validator credentials, including signing and withdrawal keys",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
    ],
    pools: [
      {
        title: "Open source",
        description:
          "Essential code is 100% open source and available to the public to fork and use",
        valid: "Open source",
        caution: "",
        warning: "Closed source",
        svg: <></>,
      },
      {
        title: "Audited",
        description:
          "Essential code has undergone formal auditing with results published and available publicly",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
      {
        title: "Bug bounty",
        description:
          "A public bug bounty has been performed on any essential code to rewards users for safely reporting and/or fixing vulnerabilities",
        valid: "Currently active",
        caution: "Completed",
        warning: "None",
        svg: <></>,
      },
      {
        title: "Battle tested",
        description:
          "Service has been available and used by the public for the indicated period of time",
        valid: "Live > 1 year",
        caution: "Live > 6 months",
        warning: "Newly released",
        svg: <></>,
      },
      {
        title: "Trustless",
        description:
          "Service does not require trusting any humans to custody your keys or distribute rewards",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
      {
        title: "Permissionless nodes",
        description:
          "Service allows anyone to join as a node operator for the pool, without permission",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
      {
        title: "Diverse clients",
        description:
          "Service should not run more than 50% of their aggregate validators with a supermajority validator client",
        valid: "Less than 50%",
        caution: "Currently unknown",
        warning: "More than 50%",
        svg: <></>,
      },
      {
        title: "Liquidity token",
        description:
          "Offers tradable liquidity token representing your staked ETH, held in your own wallet",
        valid: "",
        caution: "",
        warning: "",
        svg: <></>,
      },
    ],
  }

  const pageData = data[page]

  const handleSelection = (e) => {
    console.log(e.target.value)
  }

  return (
    <Container>
      <List>
        {!!pageData && (
          <ol>
            {pageData.map(({ title }, idx) => (
              <li key={idx} onClick={handleSelection}>
                {title}
              </li>
            ))}
          </ol>
        )}
      </List>
      <Content></Content>
    </Container>
  )
}

export default StakingConsiderations
