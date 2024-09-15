import * as React from "react"

import InlineLink from "@/components/ui/Link"

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Table"

/*
 * Note on the Chakra Table components:
 *
 * Only the `TableCell`, `Th`, `Tr`, `TableBody`, and `TableHeader` components are used because those are the
 * only table elements we are defining styles with and sending to the MDX provider
 *
 * The use of `align` is a mock for the `align` prop from the MDX parsing going to
 * the former prop in the given Chakra component.
 */

export const MdxDemoData = () => (
  <>
    <TableHeader>
      <TableRow>
        <TableHead>Column head</TableHead>
        <TableHead>Column head</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Twitter can censor any account or tweet</TableCell>
        <TableCell>
          Web3 tweets would be uncensorable because control is decentralized
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Payment service may decide to not allow payments for certain types of
          work
        </TableCell>
        <TableCell>
          Web3 payment apps require no personal data and can&apos;t prevent
          payments
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Servers for gig-economy apps could go down and affect worker income
        </TableCell>
        <TableCell>
          Web3 servers can&apos;t go down &ndash; they use Ethereum, a
          decentralized network of 1000s of computers as their backend
        </TableCell>
      </TableRow>
    </TableBody>
  </>
)

export const MdxEnergyConsumpData = () => (
  <>
    <TableHeader>
      <TableRow>
        <TableHead></TableHead>
        <TableHead align="end">Annualized energy consumption (TWh)</TableHead>
        <TableHead align="end">Comparison to PoS Ethereum</TableHead>
        <TableHead>Source</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Global data centers</TableCell>
        <TableCell align="end">200</TableCell>
        <TableCell align="end">77,000x</TableCell>
        <TableCell>
          <InlineLink
            href="https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches"
            dir="ltr"
          >
            source
          </InlineLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Gold mining</TableCell>
        <TableCell align="end">131</TableCell>
        <TableCell align="end">50,000x</TableCell>
        <TableCell>
          <InlineLink href="https://ccaf.io/cbnsi/cbeci/comparisons" dir="ltr">
            source
          </InlineLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bitcoin</TableCell>
        <TableCell align="end">131</TableCell>
        <TableCell align="end">50,000x</TableCell>
        <TableCell>
          <InlineLink href="https://ccaf.io/cbnsi/cbeci/comparisons" dir="ltr">
            source
          </InlineLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>PoW Ethereum</TableCell>
        <TableCell align="end">78</TableCell>
        <TableCell align="end">30,000x</TableCell>
        <TableCell>
          <InlineLink
            href="https://digiconomist.net/ethereum-energy-consumption"
            dir="ltr"
          >
            source
          </InlineLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Youtube (direct only)</TableCell>
        <TableCell align="end">12</TableCell>
        <TableCell align="end">4600x</TableCell>
        <TableCell>
          <InlineLink
            href="https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf"
            dir="ltr"
          >
            source
          </InlineLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Gaming in USA</TableCell>
        <TableCell align="end">34</TableCell>
        <TableCell align="end">13,000x</TableCell>
        <TableCell>
          <InlineLink
            href="https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential"
            dir="ltr"
          >
            source
          </InlineLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Netflix</TableCell>
        <TableCell align="end">0.451</TableCell>
        <TableCell align="end">173x</TableCell>
        <TableCell>
          <InlineLink
            href="https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf"
            dir="ltr"
          >
            source
          </InlineLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>PayPal</TableCell>
        <TableCell align="end">0.26</TableCell>
        <TableCell align="end">100x</TableCell>
        <TableCell>
          <InlineLink
            href="https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261"
            dir="ltr"
          >
            source
          </InlineLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>AirBnB</TableCell>
        <TableCell align="end">0.02</TableCell>
        <TableCell align="end">8x</TableCell>
        <TableCell>
          <InlineLink
            href="https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf"
            dir="ltr"
          >
            source
          </InlineLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>PoS Ethereum</TableCell>
        <TableCell align="end">0.0026</TableCell>
        <TableCell align="end">1x</TableCell>
        <TableCell>
          <InlineLink
            href="https://carbon-ratings.com/eth-report-2022"
            dir="ltr"
          >
            source
          </InlineLink>
        </TableCell>
      </TableRow>
    </TableBody>
  </>
)

export const MdxTypesOfBridgesData = () => (
  <>
    <TableHeader>
      <TableRow>
        <TableHead>Trusted Bridges</TableHead>
        <TableHead>Trustless Bridges</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>
          Trusted bridges depend upon a central entity or system for their
          operations.
        </TableCell>
        <TableCell>
          Trustless bridges operate using smart contracts and algorithms.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          They have trust assumptions with respect to the custody of funds and
          the security of the bridge. Users mostly rely on the bridge
          operator&apos;s reputation.
        </TableCell>
        <TableCell>
          They are trustless, i.e., the security of the bridge is the same as
          that of the underlying blockchain.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Users need to give up control of their crypto assets.
        </TableCell>
        <TableCell>
          Through smart contracts, trustless bridges enable users to remain in
          control of their funds.
        </TableCell>
      </TableRow>
    </TableBody>
  </>
)
