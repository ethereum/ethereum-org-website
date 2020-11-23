import React, { useState, useContext } from "react"
import styled from "styled-components"
import Modal from "./Modal"
import ButtonLink from "./ButtonLink"
import Link from "./Link"
import { ThemeContext } from "styled-components"
import Emoji from "./Emoji"

const Eth1 = styled.div`
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.isDarkTheme
        ? props.theme.colors.success300
        : props.theme.colors.black50};
  background: ${(props) =>
    props.isDarkTheme
      ? props.theme.colors.background
      : props.theme.colors.success300};
  color: ${(props) => props.theme.colors.text};
  text-transform: uppercase;
  width: 100%;
  display: flex;
  border-radius: 2px;
  padding: 1rem;
  align-items: center;
  z-index: ${(props) => (props.isAboveOverlay ? `1001` : `1`)};
  &:hover {
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
    transition: transform 0.1s;
    transform: skew(-2deg);
  }
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const MobileInstruction = styled.div`
  display: none;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    display: initial;
  }
`

const Phase2 = styled.div`
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.isDarkTheme
        ? props.theme.colors.tagPink
        : props.theme.colors.black50};
  background: ${(props) =>
    props.isDarkTheme ? props.theme.colors.background : "#e1fefa"};
  border-radius: 2px;
  padding: 1rem;
  text-transform: uppercase;
  width: 25%;
  z-index: ${(props) => (props.isAboveOverlay ? `1001` : `1`)};
  color: ${(props) => props.theme.colors.text};
  &:hover {
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
    transition: transform 0.1s;
    transform: skew(-2deg);
  }
`

const Phase1 = styled.div`
  border: 1px solid
    ${(props) =>
      props.isDarkTheme
        ? props.theme.colors.tagPink
        : props.theme.colors.black50};
  background: ${(props) =>
    props.isDarkTheme ? props.theme.colors.background : "#e1fefa"};
  border-radius: 2px;
  text-transform: uppercase;
  padding: 1rem;
  width: 25%;
  z-index: ${(props) => (props.isAboveOverlay ? `1001` : `1`)};
  color: ${(props) => props.theme.colors.text};
`

const Phase0 = styled.div`
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.isDarkTheme
        ? props.theme.colors.tagPink
        : props.theme.colors.black50};
  background: ${(props) =>
    props.isDarkTheme ? props.theme.colors.background : "#e1fefa"};
  border-radius: 2px;
  text-transform: uppercase;
  padding: 1rem;
  width: 25%;
  margin-right: 1rem;
  z-index: ${(props) => (props.isAboveOverlay ? `1001` : `1`)};
  color: ${(props) => props.theme.colors.text};
  &:hover {
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
    transition: transform 0.1s;
    transform: skew(-2deg);
  }
`

const Box = styled.div`
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.isDarkTheme
        ? props.theme.colors.primary
        : props.theme.colors.black50};
  background: ${(props) =>
    props.isDarkTheme
      ? props.theme.colors.background
      : props.theme.colors.warning};
  border-radius: 2px;
  text-transform: uppercase;
  padding: 1rem;
  margin: 0.5rem;
  z-index: 2;
  &:hover {
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
    transition: transform 0.1s;
    transform: skew(-2deg);
  }
`

const ShardBox = styled.div`
  border: 1px solid
    ${(props) =>
      props.isDarkTheme
        ? props.theme.colors.primary
        : props.theme.colors.black50};
  background: ${(props) =>
    props.isDarkTheme
      ? props.theme.colors.background
      : props.theme.colors.warning};
  border-radius: 2px;
  padding: 1rem;
  margin: 0.5rem;
  z-index: 2;
`

const MainnetBox = styled.div`
  border: 1px solid
    ${(props) =>
      props.isDarkTheme
        ? props.theme.colors.success300
        : props.theme.colors.black50};
  background: ${(props) =>
    props.isDarkTheme
      ? props.theme.colors.background
      : props.theme.colors.success300};
  border-radius: 2px;
  padding: 1rem;
  margin: 0.5rem;
  color: ${(props) => props.theme.colors.text};
`

const InfographicContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  padding-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 1000px;
  }
`

const Phase01 = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 1rem;
  width: 100%;
  margin-right: 1rem;
`

const PrePhase2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  margin-right: 1rem;
`

const Diagram = styled.div`
  width: 100%;
`

// Modal options
const MAINNET = "mainnet"
const BEACON_CHAIN = "beacon chain"
const SHARDS = "shards"
const DOCKING = "docking"

const ModalContent = ({ upgrade }) => {
  if (upgrade === MAINNET) {
    return (
      <>
        <h2>Ethereum mainnet</h2>
        <p>
          Ethereum mainnet will continue to exist in its current form for a
          while. This means the Beacon Chain and shard upgrades won't disrupt
          the network.
        </p>
        <p>
          Mainnet will eventually merge with the new system introduced by the
          Eth2 upgrades.
        </p>
      </>
    )
  }
  if (upgrade === BEACON_CHAIN) {
    return (
      <>
        <h2>The Beacon Chain</h2>
        <p>
          The Beacon Chain will launch as soon as there is enough ETH in{" "}
          <Link to="https://launchpad.ethereum.org/">the deposit contract</Link>
          .
        </p>
        <p>
          The Beacon Chain will become the conductor of Ethereum, coordinating
          validators and setting the pace for block creation.
        </p>
        <p>At first, it will exist separately from mainnet.</p>
        <ButtonLink to="/eth2/beacon-chain/">
          More on the Beacon Chain
        </ButtonLink>
      </>
    )
  }
  if (upgrade === SHARDS) {
    return (
      <>
        <h2>Shard chains</h2>
        <p>
          Shards will provide lots of extra data to help increase the amount of
          transactions mainnet can handle. They'll be coordinated by the Beacon
          Chain.
        </p>
        <p>
          But all transactions will still rely on Mainnet, which will continue
          to exist as we know it today – secured by{" "}
          <Link to="/developers/docs/consensus-mechanisms/pow/">
            proof-of-work and miners
          </Link>
          .
        </p>
        <ButtonLink to="/eth2/shard-chains/">More on shard chains</ButtonLink>
      </>
    )
  }
  if (upgrade === DOCKING) {
    return (
      <>
        <h2>The docking</h2>
        <p>
          Mainnet will merge with the{" "}
          <Link to="/developers/docs/consensus-mechanisms/pos/">
            proof-of-stake
          </Link>{" "}
          system, coordinated by the Beacon Chain.
        </p>
        <p>
          This will turn mainnet into a shard within the new system.{" "}
          <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
            Miners
          </Link>{" "}
          will no longer be needed as all of Ethereum will be secured by{" "}
          <Link to="/glossary/#validator">validators</Link>.
        </p>
        <ButtonLink to="/eth2/docking/">More on the docking</ButtonLink>
      </>
    )
  }
  return null
}

// TODO update z-indices so only the selected section of diagram is above the modal overlay
const Eth2Diagram = () => {
  const [modalState, setModalState] = useState(false)

  // Update modal state to upgrade props, else close modal
  const handleClick = (upgrade) => {
    const newState = upgrade || false
    setModalState(newState)
  }

  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark
  return (
    <Diagram>
      <Modal isOpen={!!modalState} setIsOpen={handleClick}>
        <ModalContent upgrade={modalState} />
      </Modal>
      <H2>Relation of upgrades</H2>
      <MobileInstruction>
        <p>Scroll to explore the upgrades</p>
        <Emoji ml={"1rem"} size="4" mt={"1rem"} text=":point_right:" />
      </MobileInstruction>
      <InfographicContainer>
        <Container>
          <PrePhase2>
            <Phase01>
              <Phase0
                isDarkTheme={isDarkTheme}
                isAboveOverlay={modalState === BEACON_CHAIN}
                onClick={() => handleClick(BEACON_CHAIN)}
              >
                The Beacon Chain
              </Phase0>
              <Phase1
                isDarkTheme={isDarkTheme}
                isAboveOverlay={modalState === SHARDS}
              >
                The Beacon Chain
                <Box
                  onClick={() => handleClick(SHARDS)}
                  isDarkTheme={isDarkTheme}
                >
                  Shard (1)
                </Box>
                <Box
                  onClick={() => handleClick(SHARDS)}
                  isDarkTheme={isDarkTheme}
                >
                  Shard (...)
                </Box>
              </Phase1>
            </Phase01>
            <Eth1
              isDarkTheme={isDarkTheme}
              isAboveOverlay={modalState === MAINNET}
              onClick={() => handleClick(MAINNET)}
            >
              Mainnet
            </Eth1>
          </PrePhase2>
          <Phase2
            isDarkTheme={isDarkTheme}
            isAboveOverlay={modalState === DOCKING}
            onClick={() => handleClick(DOCKING)}
          >
            The Beacon Chain
            <ShardBox isDarkTheme={isDarkTheme}>Shard (1)</ShardBox>
            <ShardBox isDarkTheme={isDarkTheme}>Shard (2)</ShardBox>
            <ShardBox isDarkTheme={isDarkTheme}>Shard (...)</ShardBox>
            <MainnetBox isDarkTheme={isDarkTheme}>Mainnet</MainnetBox>
          </Phase2>
        </Container>
      </InfographicContainer>
    </Diagram>
  )
}

export default Eth2Diagram
