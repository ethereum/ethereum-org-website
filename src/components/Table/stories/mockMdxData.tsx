import * as React from "react"
import { Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import InlineLink from "@/components/Link"

/*
 * Note on the Chakra Table components:
 *
 * Only the `Td`, `Th`, `Tr`, `Tbody`, and `Thead` components are used because those are the
 * only table elements we are defining styles with and sending to the MDX provider
 *
 * The use of `textAlign` is a mock for the `align` prop from the MDX parsing going to
 * the former prop in the given Chakra component.
 */

export const MdxDemoData = () => (
  <>
    <Thead>
      <Tr>
        <Th>Column head</Th>
        <Th>Column head</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Twitter can censor any account or tweet</Td>
        <Td>
          Web3 tweets would be uncensorable because control is decentralized
        </Td>
      </Tr>
      <Tr>
        <Td>
          Payment service may decide to not allow payments for certain types of
          work
        </Td>
        <Td>
          Web3 payment apps require no personal data and can&apos;t prevent
          payments
        </Td>
      </Tr>
      <Tr>
        <Td>
          Servers for gig-economy apps could go down and affect worker income
        </Td>
        <Td>
          Web3 servers can&apos;t go down &ndash; they use Ethereum, a
          decentralized network of 1000s of computers as their backend
        </Td>
      </Tr>
    </Tbody>
  </>
)

export const MdxEnergyConsumpData = () => (
  <>
    <Thead>
      <Tr>
        <Th></Th>
        <Th textAlign="end">Annualized energy consumption (TWh)</Th>
        <Th textAlign="end">Comparison to PoS Ethereum</Th>
        <Th>Source</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Global data centers</Td>
        <Td textAlign="end">200</Td>
        <Td textAlign="end">77,000x</Td>
        <Td>
          <InlineLink
            href="https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches"
            dir="ltr"
          >
            source
          </InlineLink>
        </Td>
      </Tr>
      <Tr>
        <Td>Gold mining</Td>
        <Td textAlign="end">131</Td>
        <Td textAlign="end">50,000x</Td>
        <Td>
          <InlineLink href="https://ccaf.io/cbnsi/cbeci/comparisons" dir="ltr">
            source
          </InlineLink>
        </Td>
      </Tr>
      <Tr>
        <Td>Bitcoin</Td>
        <Td textAlign="end">131</Td>
        <Td textAlign="end">50,000x</Td>
        <Td>
          <InlineLink href="https://ccaf.io/cbnsi/cbeci/comparisons" dir="ltr">
            source
          </InlineLink>
        </Td>
      </Tr>
      <Tr>
        <Td>PoW Ethereum</Td>
        <Td textAlign="end">78</Td>
        <Td textAlign="end">30,000x</Td>
        <Td>
          <InlineLink
            href="https://digiconomist.net/ethereum-energy-consumption"
            dir="ltr"
          >
            source
          </InlineLink>
        </Td>
      </Tr>
      <Tr>
        <Td>Youtube (direct only)</Td>
        <Td textAlign="end">12</Td>
        <Td textAlign="end">4600x</Td>
        <Td>
          <InlineLink
            href="https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf"
            dir="ltr"
          >
            source
          </InlineLink>
        </Td>
      </Tr>
      <Tr>
        <Td>Gaming in USA</Td>
        <Td textAlign="end">34</Td>
        <Td textAlign="end">13,000x</Td>
        <Td>
          <InlineLink
            href="https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential"
            dir="ltr"
          >
            source
          </InlineLink>
        </Td>
      </Tr>
      <Tr>
        <Td>Netflix</Td>
        <Td textAlign="end">0.451</Td>
        <Td textAlign="end">173x</Td>
        <Td>
          <InlineLink
            href="https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf"
            dir="ltr"
          >
            source
          </InlineLink>
        </Td>
      </Tr>
      <Tr>
        <Td>PayPal</Td>
        <Td textAlign="end">0.26</Td>
        <Td textAlign="end">100x</Td>
        <Td>
          <InlineLink
            href="https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261"
            dir="ltr"
          >
            source
          </InlineLink>
        </Td>
      </Tr>
      <Tr>
        <Td>AirBnB</Td>
        <Td textAlign="end">0.02</Td>
        <Td textAlign="end">8x</Td>
        <Td>
          <InlineLink
            href="https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf"
            dir="ltr"
          >
            source
          </InlineLink>
        </Td>
      </Tr>
      <Tr>
        <Td>PoS Ethereum</Td>
        <Td textAlign="end">0.0026</Td>
        <Td textAlign="end">1x</Td>
        <Td>
          <InlineLink
            href="https://carbon-ratings.com/eth-report-2022"
            dir="ltr"
          >
            source
          </InlineLink>
        </Td>
      </Tr>
    </Tbody>
  </>
)

export const MdxTypesOfBridgesData = () => (
  <>
    <Thead>
      <Tr>
        <Th>Trusted Bridges</Th>
        <Th>Trustless Bridges</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>
          Trusted bridges depend upon a central entity or system for their
          operations.
        </Td>
        <Td>Trustless bridges operate using smart contracts and algorithms.</Td>
      </Tr>
      <Tr>
        <Td>
          They have trust assumptions with respect to the custody of funds and
          the security of the bridge. Users mostly rely on the bridge
          operator&apos;s reputation.
        </Td>
        <Td>
          They are trustless, i.e., the security of the bridge is the same as
          that of the underlying blockchain.
        </Td>
      </Tr>
      <Tr>
        <Td>Users need to give up control of their crypto assets.</Td>
        <Td>
          Through smart contracts, trustless bridges enable users to remain in
          control of their funds.
        </Td>
      </Tr>
    </Tbody>
  </>
)
