// Libraries
import React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

// Assets
import privacyGlyph from "../assets/run-a-node/privacy-glyph.svg"

// Data
import cexSupport from "../data/layer-2/cex-layer-2-support.json"
import layer2Data from "../data/layer-2/layer-2.json"
import validiumData from "../data/validium.json"

// Components
import ExpandableCard from "../components/ExpandableCard"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import ProductCard from "../components/ProductCard"
import { CardGrid, Content, Page } from "../components/SharedStyledComponents"

// Utils
import { translateMessageId } from "../utils/translations"

// Styles
const GappedPage = styled(Page)`
  gap: 4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    gap: 3rem;
  }
  * {
    scroll-margin-top: 5.5rem;
  }
`

const HeroContainer = styled.div`
  background: ${({ theme }) => theme.colors.runNodeGradient};
  width: 100%;
`

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

const Flex50 = styled.div`
  flex: 50%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const TwoColumnContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const InfoGrid = styled(CardGrid)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 1rem 2rem;
  & > div {
    height: fit-content;
    &:hover {
      transition: 0.1s;
      transform: scale(1.01);
      img {
        transition: 0.1s;
        transform: scale(1.1);
      }
    }
  }
`

const StyledCardGrid = styled(CardGrid)`
  margin-bottom: 4rem;
  margin-top: 4rem;
`

const Layer2Page = ({ data }) => {
  const intl = useIntl()
  const heroContent = {
    title: "Layer 2",
    header: "Layer 2",
    subtitle: "Smart solutions to scale Ethereum",
    image: getImage(data.ethBlocks),
    alt: "test",
    buttons: [
      {
        content: "Use Layer 2",
        pathId: "use-layer-2",
      },
      {
        content: "Wait, what's Ethereum?",
        pathId: "/",
        isSecondary: "isSecondary",
      },
    ],
  }

  const layer2Cards = [
    {
      image: privacyGlyph,
      title: "Inclusivity",
      preview: "Lower fees and better user experience",
      body: [
        "By combining multiple transactions into a single transaction on layer 1, transaction fees are massively reduced, making Ethereum more accessible for all.",
      ],
      alt: "test",
    },
    {
      image: privacyGlyph,
      title: "Expand Use Cases",
      preview: "Increase the scope of projects",
      body: [
        "With higher transactions per second, cheaper fees, and new technology, the scope of projects is able to expand into new use cases we have yet to see come online. Opportunities for gaming, exchanges, and applications yet to be created will be able to come online with better user experience.",
      ],
      alt: "test",
    },
    {
      image: privacyGlyph,
      title: "Security",
      preview: "Layer 2 is cashing a cheque, layer 1 is going to court",
      body: [
        "We need need scaling solutions that inherit Ethereums security. Layer 2 networks settle their transactions on the Ethereum mainnet, allowing users who use them to benefit from the security of the Ethereum network.",
        "Layer 2s take advantage of the consensus mechanism of its parent Layer 1, in this case Ethereum, instead of providing their own consensus mechanism.",
      ],
      alt: "test",
    },
  ]

  const layer2DataCombined = [...layer2Data.optimistic, ...layer2Data.zk]

  return (
    <GappedPage>
      <PageMetadata
        title={"Layer 2"}
        description={"Introduction page to layer 2"}
      />

      <HeroContainer>
        <Hero content={heroContent} isReverse />
      </HeroContainer>

      <Content>
        <h2>What is Layer 1?</h2>
        <p>
          Before diving into "layer 2", it helps to understand what we consider
          "layer 1".
        </p>
        <p>
          Layer 1 blockchains, such as Ethereum and Bitcoin, are the underlying
          foundation that layer 2 projects build on top of. Examples of layer 2
          projects built on top of these networks include zero-knowledge rollups
          and optimistic rollups on Ethereum and the Lighting Network on top of
          Bitcoin.
        </p>
        <p>
          Ethereum as the layer 1 includes the blockchain itself and the history
          of transaction data, a network of miners (soon to be validators after{" "}
          <Link to="/upgrades/merge/">The Merge</Link>) proposing blocks, a
          network of node operators to secure and validate the network, and the
          consensus mechanism for the network. Ethereum also functions as a data
          availability layer for Layer 2s, and if there are any disputes on
          previous transactions data is provided from Ethereum for these
          disputes.
        </p>
        <p>
          While Ethereum has been a breakthrough technology in smart contract
          blockchains, it faces the same trilemma between scaling,
          decentralization, and security as any other blockchain. Ethereum has
          done a great job addressing decentralization, and security, with plans
          to address scalability with sharding in the future. While there are
          roadmap plans to improve the scalability of Ethereum, there is still a
          need for further scaling to round out the trilemma for Ethereum. This
          is where Layer 2 technology is being developed to step in and bring
          further scaling to Ethereum. As time has progressed, Ethereum as a
          layer 1 is a settlement layer for layer 2s, and not the layer for end
          users.
        </p>
      </Content>

      <Content>
        <h2>Why do we need layer 2?</h2>
        <p>
          The three desirable properties of a blockchain are that it is
          decentralized, secure, and scalable. The scalability trilemma states
          that a simple blockchain architecture can only achieve two out of
          three. Want a secure and scalable blockchain? You need to sacrifice
          decentralization.
        </p>
        <p>
          Ethereum has reached the networks capacity with{" "}
          <Link to="https://etherscan.io/chart/tx">
            1+ million transactions per day
          </Link>
          , with high demand for each of these transactions. Due to the success
          of Ethereum and the demand to use it, gas prices have risen
          substantially, increasing the{" "}
          <Link to="/developers/docs/scaling/">need for scaling solutions</Link>
          . The main goal of scalability is to increase transaction speed
          (faster finality), and transaction throughput (high transactions per
          second), without sacrificing decentralization or security (more on the
          Ethereum vision).
        </p>
        <p>
          The Ethereum community has taken a strong stance that it would not
          throw out decentralization or security in order to scale. Until
          sharding, Ethereum Mainnet (layer 1) will only be able to process
          roughly 15 transactions per second. When demand to use Ethereum is
          high this causes network congestion, increasing transaction fees, and
          pricing out those who cannot afford it from using Ethereum until the
          fees reduce. That is where layer 2 comes in.
        </p>
      </Content>

      <Content>
        <InfoGrid>
          {layer2Cards.map(({ image, title, preview, body, alt }, idx) => (
            <ExpandableCard
              contentPreview={preview}
              title={title}
              svg={image}
              alt={alt}
              key={idx}
            >
              {body.map((item, idx) => (
                <p key={idx}>{item}</p>
              ))}
            </ExpandableCard>
          ))}
        </InfoGrid>
      </Content>

      <Content>
        <h2>Layer 2</h2>
        <p>
          Layer 2 refers to building other Ethereum compatible networks on top
          of layer 1, and requires no changes to the layer 1 protocol. This lets
          layer 1 handle security, data availability, and decentralization,
          whilst everything on the layer above (layer 2) can handle scaling.
          Layer 2s takes the transactional burden away from the Layer 1, and
          posts finalized proofs back to the Layer 1 to finalize the state. By
          taking this load away from Layer 1, the base layer will become less
          congested, and everything becomes more scalable.
        </p>
        <h3>Rollups</h3>
        <p>
          Rollups are currently the preferred layer 2 solution for scaling
          Ethereum. By using rollups, users can{" "}
          <Link to="https://l2fees.info/">reduce gas fees by up to 100x</Link>{" "}
          when comparison to a layer 1 transaction.
        </p>
        <p>
          Rollups bundle (or ’roll-up’) hundreds of transactions into a single
          transaction on layer 1. This allows the transaction fees to be shared
          across everyone in the rollup. These bundled transactions are posted
          to the Layer 1 as validity, fraud, or fault proofs. Rollup
          transactions get executed outside of layer 1 but the transaction data
          gets posted to layer 1. By posting transaction data onto layer 1,
          rollups are able to inherit the security of Ethereum.
        </p>
        <TwoColumnContent>
          <Flex50>
            <h4>Optimistic Rollups</h4>
            <p>
              Optimistic rollups use fault proofs where transactions are assumed
              to be valid, but can be challenged if an invalid transaction is
              suspected. If an invalid tranaction is suspected, a fault proof is
              ran to see if this has taken place.{" "}
              <Link to="/developers/docs/scaling/optimistic-rollups/">
                More on optimistic rollups
              </Link>
            </p>
          </Flex50>
          <Flex50>
            <h4>Zero Knowledge Rollups</h4>
            <p>
              Zero Knowledge rollups use validity proofs where transactions
              calculations are computed off-chain, and then this data is then
              supplied to mainnet ethereum with a proof of their validity.{" "}
              <Link to="/developers/docs/scaling/zk-rollups/">
                More on zk-rollups
              </Link>
            </p>
          </Flex50>
        </TwoColumnContent>
        <InfoBanner isWarning={true}>
          <h2>DYOR! Risks of layer 2</h2>
          <p>
            Because layer 2 chains inherit security from Ethereum, in an ideal
            world, they are as safe as L1 Ethereum. However, many of the
            projects are still young and somewhat experimental. After years of
            R&D, many of the L2 technologies that will scale Ethereum went live
            in 2021. This is not to say these L2s are not secure, only that no
            layer 2 is as battle tested as Ethereum Mainnet. Always do your own
            research and decide if you're comfortable with any risks involved.
          </p>
          <p>
            For more information on the technology, risks and trust assumptions
            of layer 2s, we recommend checking out L2BEAT, which provides a
            comprehensive risk assessment framework of each project.
          </p>
          <p>
            <Link to="https://l2beat.com">L2BEAT</Link>
          </p>
        </InfoBanner>
      </Content>

      <Content>
        <h2>A note on alt L1s, sidechains, and validiums</h2>
        <p>
          Many alternative layer 1s have higher throughput and lower transaction
          fees than Ethereum. These alt L1s have had to sacrifice on security or
          decentralization in order to achieve higher transactions per second
          and lower fees. The Ethereum ecosystem is firmly aligned that layer 2
          scaling is the only way to solve the scalability trilemma and remain
          decentralized and secure.
        </p>
        <p>
          Sidechains and validiums are blockchains that allow assets from one
          blockchain to be bridged over and used on another blockchain.
          Sidechains and validiums run in parallel with the main chian, and
          interact with the main chain through bridges, but they do not derive
          their security or data availability from the main chain. They scale
          similarly to layer 2s, but have different trust assumptions. They
          offer lower transaction fees, and higher transaction throughput. More
          on <Link to="/developers/docs/scaling/sidechains/">sidechains</Link>{" "}
          and <Link to="/developers/docs/scaling/validium/">validiums</Link>.
        </p>
      </Content>

      <Content>
        <h2>Generalized layer 2s</h2>
        <p>
          Generalized layer 2s behave just like Ethereum—but cheaper. Anything
          that you can do on Ethereum layer 1, you can also do on layer 2. Many
          dapps have already begun to migrate to these networks, or are skipping
          deploying to mainnet altogether.
        </p>
        <StyledCardGrid>
          {layer2DataCombined
            .filter((l2) => !l2.purpose.indexOf("universal"))
            .map((l2, idx) => {
              return (
                <ProductCard
                  key={idx}
                  background="black"
                  description={l2.description}
                  url={l2.website}
                  note={translateMessageId(l2.noteKey, intl)}
                  name={l2.name}
                />
              )
            })}
        </StyledCardGrid>

        <h2>Application specific layer 2s</h2>
        <p>
          Application specific layer 2s are projects that specialize in
          optimizing for a specific application space, bringing improved
          performance.
        </p>
        <StyledCardGrid>
          {layer2DataCombined
            .filter((l2) => l2.purpose.indexOf("universal"))
            .map((l2, idx) => {
              return (
                <ProductCard
                  key={idx}
                  background="black"
                  description={l2.description}
                  url={l2.website}
                  note={translateMessageId(l2.noteKey, intl)}
                  name={l2.name}
                >
                  {l2.purpose.map((purpose) => (
                    <Pill>{purpose}</Pill>
                  ))}
                </ProductCard>
              )
            })}
        </StyledCardGrid>
      </Content>

      <Content>
        <InfoBanner>
          <h2>How to get onto a layer 2</h2>
          <TwoColumnContent>
            <Flex50>
              <h4>Funds in your wallet?</h4>
              <p>
                If you've already got your ETH in your wallet, you'll need to
                use a bridge to move it from Ethereum mainnet to a layer 2.{" "}
                <Link to="/bridges/">More on bridges</Link>.
              </p>
            </Flex50>
            <Flex50>
              <h4>Funds on an exchange?</h4>
              <p>
                Some centralized exchanges now to offer direct withdrawals to
                layer 2s.
              </p>
              {/* TODO: create cex/bridging component */}
            </Flex50>
          </TwoColumnContent>
        </InfoBanner>
      </Content>

      <Content>
        <h2>Tools and tips to be effective on layer 2</h2>
        <TwoColumnContent>
          <Flex50>
            <ExpandableCard title="L2BEAT">
              <p>
                <Link to="https://l2beat.com">L2BEAT</Link> is a great resource
                for looking at technical risk assessments of layer 2 projects.
                We recommend checking out their resources when researching
                specific layer 2 projects.
              </p>
            </ExpandableCard>
            <ExpandableCard title="Chainlist">
              <p>
                <Link to="https://chainlist.org">Chainlist</Link> is a great
                resource for importing network RPC's into your favorite wallet.
                You will be able to find the various RPC's for layer 2 projects
                here to get you connected to their network.
              </p>
            </ExpandableCard>
            <ExpandableCard title="Dapp portals">
              <p>
                Some layer 2 projects provide a application portal for users to
                see what projects are apart of their ecosystem. Check out some
                here!
              </p>
              <ul>
                <li>
                  <Link to="https://portal.arbitrum.one/">
                    Arbitrum One Portal
                  </Link>
                </li>
                <li>
                  <Link to="https://www.optimism.io/apps/all">
                    Optimism ecosystem
                  </Link>
                </li>
              </ul>
            </ExpandableCard>
            <ExpandableCard title="Block explorers">
              <ul>
                <li>
                  <Link to="https://explorer.arbitrum.io/">Arbitrum</Link>
                </li>
                <li>
                  <Link to="https://optimistic.etherscan.io/">Optimism</Link>
                </li>
                <li>
                  <Link to="https://zkscan.io/">zkSync</Link>
                </li>
                <li>
                  <Link to="https://andromeda-explorer.metis.io/">Metis</Link>
                </li>
                <li>
                  <Link to="https://blockexplorer.boba.network/">
                    Boba Network
                  </Link>
                </li>
                <li>
                  <Link to="https://explorer.loopring.io/">Loopring</Link>
                </li>
                <li>
                  <Link to="https://voyager.online/">StarkNet</Link>
                </li>
                <li>
                  <Link to="https://explorer.hermez.io/">Hermez</Link>
                </li>
              </ul>
            </ExpandableCard>
          </Flex50>
          <Flex50>
            <ExpandableCard title="L2 Fees">
              <p>
                <Link to="https://l2fees.info">L2 Fees</Link> lets you see the
                current cost (denominated in USD) for doing transactions on
                different layer 2 networks.
              </p>
            </ExpandableCard>
            <ExpandableCard title="Wallet Managers">
              <p>
                To help you get a holistic view of your assets across networks,
                we recommend using a wallet manager to track your assets as you
                enter layer 2.
              </p>
              <ul>
                <li>
                  <Link to="https://zapper.fi/">Zapper</Link>
                </li>
                <li>
                  <Link to="https://zerion.io/">Zerion</Link>
                </li>
                <li>
                  <Link to="https://debank.com/">DeBank</Link>
                </li>
              </ul>
            </ExpandableCard>
            <ExpandableCard title="Token lists">
              <p>
                Finding token lists can be hard. Many of your favorite dapps and
                wallets will already import a token list, but incase you need to
                import a token contract address here are some to get you
                started!
              </p>
              <ul>
                <li>
                  <Link to="https://tokenlists.org/token-list?url=https://static.optimism.io/optimism.tokenlist.json">
                    tokenlists.org
                  </Link>{" "}
                  list for Optimism
                </li>
                <li>
                  <Link to="https://arbucks.io/tokens/">arbucks.io</Link> list
                  for Arbitrum
                </li>
              </ul>
            </ExpandableCard>
          </Flex50>
        </TwoColumnContent>
      </Content>

      <Content>
        <h2>FAQ</h2>
        <ExpandableCard title="Why is there no 'official' Ethereum L2?">
          <p>
            Just as there is no “official” Ethereum client, there is no
            “offical” Ethereum layer 2. Multiple teams will implement their
            version of a layer 2, and the ecosystem as a whole will benefit from
            diversity in these clients as a decentralizing point. Much like we
            have multiple Ethereum clients developed by multiple teams in order
            to have diversity in the network, this too will be how layer 2s
            develop in the future.
          </p>
        </ExpandableCard>
        <ExpandableCard title="What is the difference between optimistic and zero knowledge rollups?">
          <p>
            Main difference being, validity proofs run the computations and post
            a proof, where as fraud proofs only run the computations when fraud
            is suspected and needs to be checked. At the moment, most zk-rollups
            are application specific, in contrast with optimistic rollups which
            have largely been generalizable.
          </p>
        </ExpandableCard>
        <ExpandableCard title="Is scaling at layer 1 possible?">
          <p>
            Yes. Currently in the Ethereum roadmap there are plans for shard
            chains. While these are in the roadmap, further scaling through
            Layer 2 networks is still necessary.{" "}
            <Link to="/upgrades/shard-chains/">More info on sharding</Link>.
          </p>
        </ExpandableCard>
        <ExpandableCard title="What are the risks with layer 2?">
          <p>
            Sequencers may go down, leading you to have to wait to access funds.
            While there may be a waiting period, you do still have access to
            your funds unlike alt-l1's or sidechains.
          </p>
          <p>
            Bridges are in their early stages of development, and it is likely
            that the optimal bridge design has not been discovered yet. There
            have been{" "}
            <Link to="https://rekt.news/wormhole-rekt/">
              recent hacks of bridges
            </Link>
            . <Link to="/bridges/">More information on bridges</Link>.
          </p>
        </ExpandableCard>
      </Content>

      <Content>
        <h2>Further reading</h2>
        <ul>
          <li>
            <Link to="https://eips.ethereum.org/EIPS/eip-4488">
              EIP-4488 proposed to reduce transaction call data gas cost
            </Link>
          </li>
          <li>
            <Link to="/upgrades/shard-chains/">
              Scaling layer 1 with shard chains
            </Link>
          </li>
          <li>
            <Link to="https://barnabe.substack.com/p/understanding-rollup-economics-from?s=r">
              Understanding rollup economics from first principals
            </Link>{" "}
            <i>- Barnabé Monnot</i>
          </li>
        </ul>
      </Content>
    </GappedPage>
  )
}

export default Layer2Page

export const query = graphql`
  query {
    ethBlocks: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
