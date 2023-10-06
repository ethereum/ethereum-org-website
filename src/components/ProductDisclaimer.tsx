import InfoBanner from "@/components/InfoBanner"
// TODO: Re-enable once intl implemented
// import Translation from "@/components/Translation"

const ProductDisclaimer = () => (
  <InfoBanner emoji="⚠️" isWarning>
    {/* TODO: Re-enable once intl implemented */}
    {/* <Translation id="product-disclaimer" /> */}
    Products and services are listed as a convenience for the Ethereum
    community. Inclusion of a product or service{" "}
    <strong>does not represent an endorsement</strong> from the ethereum.org
    website team, or the Ethereum Foundation.
  </InfoBanner>
)

export default ProductDisclaimer
