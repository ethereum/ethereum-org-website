import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { graphql, PageProps } from "gatsby"
import { useIntl } from "react-intl"
import { shuffle } from "lodash"
import { translateMessageId, TranslationKey } from "../../utils/translations"
import { getImage } from "../../utils/image"
import PageMetadata from "../../components/PageMetadata"
import Translation from "../../components/Translation"
import ButtonLink from "../../components/ButtonLink"
import ProductCard from "../../components/ProductCard"
import InfoBanner from "../../components/InfoBanner"
import CalloutBanner from "../../components/CalloutBanner"
import {
  Content,
  CardGrid,
  Page,
} from "../../components/SharedStyledComponents"
import FeedbackCard from "../../components/FeedbackCard"
import { Context } from "../../types"
import { IGatsbyImageData } from "gatsby-plugin-image"

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 896px;
  padding: 0 2rem;
`
const H1 = styled.h1`
  margin: 2rem 0 0;
  margin-top: 0;
  color: ${(props) => props.theme.colors.text};
  font-style: normal;
  font-family: ${(props) => props.theme.fonts.monospace};
  text-transform: uppercase;
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.4;
  text-align: center;
`

const Subtitle = styled.h2`
  font-size: 1.25rem;
  line-height: 1.4;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text300};
  max-width: 55ch;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
`

const SubtitleTwo = styled(Subtitle)`
  margin-top: 0rem;
`

const StackContainer = styled(Content)`
  border: 1px solid ${(props) => props.theme.colors.border};
  justify-content: flex-start;
  border-radius: 4px;
  padding: 3rem 2rem;
  margin: 2rem;
  width: 96%;
  background: ${(props) => props.theme.colors.ednBackground};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
    margin-left: 0rem;
    margin-right: 0rem;
    border-radius: 0px;
  }
`

const StyledCardGrid = styled(CardGrid)`
  margin-bottom: 2rem;
`

interface ILearningTool {
  name: string
  description: TranslationKey
  url: string
  image?: IGatsbyImageData
  alt: TranslationKey
  background: string
  subjects: Array<string>
}

const LearningToolsPage = ({
  data,
}: PageProps<Queries.DevelopersLearningToolsPageQuery, Context>) => {
  const intl = useIntl()
  const [randomizedSandboxes, setRandomizedSandboxes] = useState<
    Array<ILearningTool>
  >([])

  useEffect(() => {
    const sandboxes: Array<ILearningTool> = [
      {
        name: "Remix",
        description: "page-learning-tools-remix-description",
        url: "https://remix.ethereum.org",
        image: getImage(data.remix),
        alt: "page-learning-tools-remix-logo-alt",
        background: "#5098d6",
        subjects: ["Solidity", "Vyper"],
      },
      {
        name: "Eth.build",
        description: "page-learning-tools-eth-dot-build-description",
        url: "https://eth.build/",
        image: getImage(data.ethdotbuild),
        alt: "page-learning-tools-eth-dot-build-logo-alt",
        background: "#000000",
        subjects: ["web3"],
      },
      {
        name: "Replit",
        description: "page-learning-tools-replit-description",
        url: "https://replit.com/@replit/Solidity-starter-beta",
        image: getImage(data.replit),
        alt: "page-learning-tools-replit-logo-alt",
        background: "#0f1524",
        subjects: ["Solidity", "web3"],
      },
    ]
    const randomizedSandboxes = shuffle(sandboxes)
    setRandomizedSandboxes(randomizedSandboxes)
  }, [data])

  const games: Array<ILearningTool> = [
    {
      name: "CryptoZombies",
      description: "page-learning-tools-cryptozombies-description",
      url: "https://cryptozombies.io/",
      image: getImage(data.cryptoZombie),
      alt: "page-learning-tools-cryptozombies-logo-alt",
      background: "#2b2f48",
      subjects: ["Solidity"],
    },
    {
      name: "Ethernauts",
      description: "page-learning-tools-ethernauts-description",
      url: "https://ethernaut.openzeppelin.com/",
      image: getImage(data.oz),
      alt: "page-learning-tools-ethernauts-logo-alt",
      background: "#4f62dc",
      subjects: ["Solidity"],
    },
    {
      name: "Capture The Ether",
      description: "page-learning-tools-capture-the-ether-description",
      url: "https://capturetheether.com/",
      image: getImage(data.captureTheEther),
      alt: "page-learning-tools-capture-the-ether-logo-alt",
      background: "#1b9aaa",
      subjects: ["Solidity"],
    },
  ]

  const bootcamps: Array<ILearningTool> = [
    {
      name: "ChainShot",
      description: "page-learning-tools-chainshot-description",
      url: "https://www.chainshot.com",
      image: getImage(data.chainshot),
      alt: "page-learning-tools-chainshot-logo-alt",
      background: "#111f29",
      subjects: ["Solidity", "Vyper", "web3"],
    },
    {
      name: "ConsenSys Academy",
      description: "page-learning-tools-consensys-academy-description",
      url: "https://consensys.net/academy/bootcamp/",
      image: getImage(data.consensys),
      alt: "page-learning-tools-consensys-academy-logo-alt",
      background: "#f6f7f9",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "BloomTech",
      description: "page-learning-tools-bloomtech-description",
      url: "https://www.bloomtech.com/courses/web3",
      image: getImage(data.bloomtech),
      alt: "page-learning-tools-bloomtech-logo-alt",
      background: "#ffffff",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "_buildspace",
      description: "page-learning-tools-buildspace-description",
      url: "https://buildspace.so",
      image: getImage(data.buildspace),
      alt: "page-learning-tools-buildspace-logo-alt",
      background: "#f6f7f9",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Questbook",
      description: "page-learning-tools-questbook-description",
      url: "https://learn.questbook.xyz/",
      image: getImage(data.questbook),
      alt: "page-learning-tools-questbook-logo-alt",
      background: "#141236",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "NFT School",
      description: "page-learning-tools-nftschool-description",
      url: "https://nftschool.dev/",
      image: getImage(data.nftschool),
      alt: "page-learning-tools-nftschool-logo-alt",
      background: "#111f29",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Pointer",
      description: "page-learning-tools-pointer-description",
      url: "https://pointer.gg/",
      image: getImage(data.pointer),
      alt: "page-learning-tools-pointer-logo-alt",
      background: "#171717",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Platzi",
      description: "page-learning-tools-platzi-description",
      url: "https://platzi.com/escuela/escuela-blockchain/",
      image: getImage(data.platzi),
      alt: "page-learning-tools-platzi-logo-alt",
      background: "#121f3d",
      subjects: ["Solidity", "web3"],
    },
    {
      name: "Speed Run Ethereum",
      description: "page-learning-tools-speed-run-ethereum-description",
      url: "https://speedrunethereum.com/",
      image: getImage(data.speedRunEthereum),
      alt: "page-learning-tools-speed-run-ethereum-logo-alt",
      background: "#ffffff",
      subjects: ["Solidity", "web3"],
    },
  ]

  return (
    <StyledPage>
      <PageMetadata
        title={translateMessageId("page-learning-tools-meta-title", intl)}
        description={translateMessageId("page-learning-tools-meta-desc", intl)}
      />
      <Header>
        <H1>
          <Translation id="page-learning-tools-coding" />
        </H1>
        <Subtitle>
          <Translation id="page-learning-tools-coding-subtitle" />
        </Subtitle>
      </Header>
      <StackContainer>
        <SubtitleTwo>
          <Translation id="page-learning-tools-sandbox" />
        </SubtitleTwo>
        <p>
          <Translation id="page-learning-tools-sandbox-desc" />
        </p>
        <StyledCardGrid>
          {randomizedSandboxes.map((sandbox, idx) => (
            <ProductCard
              key={idx}
              background={sandbox.background}
              url={sandbox.url}
              alt={translateMessageId(sandbox.alt, intl)}
              image={sandbox.image!}
              name={sandbox.name}
              subjects={sandbox.subjects}
            >
              <Translation id={sandbox.description} />
            </ProductCard>
          ))}
        </StyledCardGrid>
        <InfoBanner emoji=":point_up:" shouldCenter={true}>
          <Translation id="page-learning-tools-remix-description-2" />
        </InfoBanner>
      </StackContainer>
      <StackContainer>
        <SubtitleTwo>
          <Translation id="page-learning-tools-game-tutorials" />
        </SubtitleTwo>
        <p>
          <Translation id="page-learning-tools-game-tutorials-desc" />
        </p>
        <StyledCardGrid>
          {games.map((game, idx) => (
            <ProductCard
              key={idx}
              background={game.background}
              url={game.url}
              alt={translateMessageId(game.alt, intl)}
              image={game.image!}
              name={game.name}
              subjects={game.subjects}
            >
              <Translation id={game.description} />
            </ProductCard>
          ))}
        </StyledCardGrid>
      </StackContainer>
      <StackContainer>
        <SubtitleTwo>
          <Translation id="page-learning-tools-bootcamps" />
        </SubtitleTwo>
        <p>
          <Translation id="page-learning-tools-bootcamps-desc" />
        </p>
        <StyledCardGrid>
          {bootcamps.map((bootcamp, idx) => (
            <ProductCard
              key={idx}
              url={bootcamp.url}
              background={bootcamp.background}
              alt={translateMessageId(bootcamp.alt, intl)}
              image={bootcamp.image!}
              name={bootcamp.name}
              subjects={bootcamp.subjects}
            >
              <Translation id={bootcamp.description} />
            </ProductCard>
          ))}
        </StyledCardGrid>
      </StackContainer>
      <Content>
        <CalloutBanner
          image={getImage(data.learn)!}
          alt={translateMessageId("page-index-tout-enterprise-image-alt", intl)}
          titleKey={"page-learning-tools-documentation"}
          descriptionKey={"page-learning-tools-documentation-desc"}
        >
          <div>
            <ButtonLink to="/developers/docs/">
              <Translation id="page-learning-tools-browse-docs" />
            </ButtonLink>
          </div>
        </CalloutBanner>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </StyledPage>
  )
}

export default LearningToolsPage

export const learningToolImage = graphql`
  fragment learningToolImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 100
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query DevelopersLearningToolsPage {
    captureTheEther: file(
      relativePath: { eq: "dev-tools/capturetheether.png" }
    ) {
      ...learningToolImage
    }
    chainshot: file(relativePath: { eq: "dev-tools/chainshot.png" }) {
      ...learningToolImage
    }
    consensys: file(relativePath: { eq: "dev-tools/consensys.png" }) {
      ...learningToolImage
    }
    bloomtech: file(relativePath: { eq: "dev-tools/bloomtech.png" }) {
      ...learningToolImage
    }
    buildspace: file(relativePath: { eq: "dev-tools/buildspace.png" }) {
      ...learningToolImage
    }
    cryptoZombie: file(relativePath: { eq: "dev-tools/crypto-zombie.png" }) {
      ...learningToolImage
    }
    oz: file(relativePath: { eq: "dev-tools/oz.png" }) {
      ...learningToolImage
    }
    questbook: file(relativePath: { eq: "dev-tools/questbook.png" }) {
      ...learningToolImage
    }
    remix: file(relativePath: { eq: "dev-tools/remix.png" }) {
      ...learningToolImage
    }
    replit: file(relativePath: { eq: "dev-tools/replit.png" }) {
      ...learningToolImage
    }
    speedRunEthereum: file(
      relativePath: { eq: "dev-tools/speed-run-ethereum.png" }
    ) {
      ...learningToolImage
    }
    ethdotbuild: file(relativePath: { eq: "dev-tools/eth-dot-build.png" }) {
      ...learningToolImage
    }
    nftschool: file(relativePath: { eq: "dev-tools/nftschool.png" }) {
      ...learningToolImage
    }
    pointer: file(relativePath: { eq: "dev-tools/pointer.png" }) {
      ...learningToolImage
    }
    platzi: file(relativePath: { eq: "dev-tools/platzi.png" }) {
      ...learningToolImage
    }

    learn: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
