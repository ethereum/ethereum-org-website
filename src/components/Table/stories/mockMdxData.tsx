import * as React from "react"

export const MdxDemoData = () => (
  <>
    <thead>
      <tr>
        <th>Column head</th>
        <th>Column head</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Twitter can censor any account or tweet</td>
        <td>
          Web3 tweets would be uncensorable because control is decentralized
        </td>
      </tr>
      <tr>
        <td>
          Payment service may decide to not allow payments for certain types of
          work
        </td>
        <td>
          Web3 payment apps require no personal data and can't prevent payments
        </td>
      </tr>
      <tr>
        <td>
          Servers for gig-economy apps could go down and affect worker income
        </td>
        <td>
          Web3 servers can't go down – they use Ethereum, a decentralized
          network of 1000s of computers as their backend
        </td>
      </tr>
    </tbody>
  </>
)

export const MdxEnergyConsumpData = () => (
  <>
    <thead>
      <tr>
        <th></th>
        <th>Annualized energy consumption (TWh)</th>
        <th>Comparison to PoS Ethereum</th>
        <th>Source</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="left">Global data centers</td>
        <td>200</td>
        <td>77,000x</td>
        <td>
          <a
            target="_blank"
            rel="noopener"
            href="https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches"
            dir="ltr"
          >
            source
            <span aria-hidden="true">↗</span>
          </a>
        </td>
      </tr>
      <tr>
        <td align="left">Gold mining</td>
        <td>131</td>
        <td>50,000x</td>
        <td>
          <a
            target="_blank"
            rel="noopener"
            href="https://ccaf.io/cbnsi/cbeci/comparisons"
            dir="ltr"
          >
            source
            <span aria-hidden="true">↗</span>
          </a>
        </td>
      </tr>
      <tr>
        <td align="left">Bitcoin</td>
        <td>131</td>
        <td>50,000x</td>
        <td>
          <a
            target="_blank"
            rel="noopener"
            href="https://ccaf.io/cbnsi/cbeci/comparisons"
            dir="ltr"
          >
            source
            <span aria-hidden="true">↗</span>
          </a>
        </td>
      </tr>
      <tr>
        <td align="left">PoW Ethereum</td>
        <td>78</td>
        <td>30,000x</td>
        <td>
          <a
            target="_blank"
            rel="noopener"
            href="https://digiconomist.net/ethereum-energy-consumption"
            dir="ltr"
          >
            source
            <span aria-hidden="true">↗</span>
          </a>
        </td>
      </tr>
      <tr>
        <td align="left">Youtube (direct only)</td>
        <td>12</td>
        <td>4600x</td>
        <td>
          <a
            target="_blank"
            rel="noopener"
            href="https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf"
            dir="ltr"
          >
            source
            <span aria-hidden="true">↗</span>
          </a>
        </td>
      </tr>
      <tr>
        <td align="left">Gaming in USA</td>
        <td>34</td>
        <td>13,000x</td>
        <td>
          <a
            target="_blank"
            rel="noopener"
            href="https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential"
            dir="ltr"
          >
            source
            <span aria-hidden="true">↗</span>
          </a>
        </td>
      </tr>
      <tr>
        <td align="left">Netflix</td>
        <td>0.451</td>
        <td>173x</td>
        <td>
          <a
            target="_blank"
            rel="noopener"
            href="https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf"
            dir="ltr"
          >
            source
            <span aria-hidden="true">↗</span>
          </a>
        </td>
      </tr>
      <tr>
        <td align="left">PayPal</td>
        <td>0.26</td>
        <td>100x</td>
        <td>
          <a
            target="_blank"
            rel="noopener"
            href="https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261"
            dir="ltr"
          >
            source
            <span aria-hidden="true">↗</span>
          </a>
        </td>
      </tr>
      <tr>
        <td align="left">AirBnB</td>
        <td>0.02</td>
        <td>8x</td>
        <td>
          <a
            target="_blank"
            rel="noopener"
            href="https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf"
            dir="ltr"
          >
            source
            <span aria-hidden="true">↗</span>
          </a>
        </td>
      </tr>
      <tr>
        <td align="left">PoS Ethereum</td>
        <td>0.0026</td>
        <td>1x</td>
        <td>
          <a
            target="_blank"
            rel="noopener"
            href="https://carbon-ratings.com/eth-report-2022"
            dir="ltr"
          >
            source
            <span aria-hidden="true">↗</span>
          </a>
        </td>
      </tr>
    </tbody>
  </>
)

export const MdxTypesOfBridgesData = () => (
  <>
    <thead>
      <tr>
        <th>Trusted Bridges</th>
        <th>Trustless Bridges</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Trusted bridges depend upon a central entity or system for their
          operations.
        </td>
        <td>Trustless bridges operate using smart contracts and algorithms.</td>
      </tr>
      <tr>
        <td>
          They have trust assumptions with respect to the custody of funds and
          the security of the bridge. Users mostly rely on the bridge operator's
          reputation.
        </td>
        <td>
          They are trustless, i.e., the security of the bridge is the same as
          that of the underlying blockchain.
        </td>
      </tr>
      <tr>
        <td>Users need to give up control of their crypto assets.</td>
        <td>
          Through smart contracts, trustless bridges enable users to remain in
          control of their funds.
        </td>
      </tr>
    </tbody>
  </>
)
