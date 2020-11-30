import React, { useState, useContext } from "react"
import styled from "styled-components"
import Modal from "./Modal"
import ButtonLink from "./ButtonLink"
import Link from "./Link"
import Emoji from "./Emoji"
import Translation from "../components/Translation"

const Eth1 = styled.div`
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.mainnetBorder};
  background: ${(props) => props.theme.colors.mainnet};
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
  border: 1px solid ${(props) => props.theme.colors.beaconchainBorder};
  background: ${(props) => props.theme.colors.beaconchain};
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
  border: 1px solid ${(props) => props.theme.colors.beaconchainBorder};
  background: ${(props) => props.theme.colors.beaconchain};
  border-radius: 2px;
  text-transform: uppercase;
  padding: 1rem;
  width: 25%;
  z-index: ${(props) => (props.isAboveOverlay ? `1001` : `1`)};
  color: ${(props) => props.theme.colors.text};
`

const Phase0 = styled.div`
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.beaconchainBorder};
  background: ${(props) => props.theme.colors.beaconchain};
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
  border: 1px solid ${(props) => props.theme.colors.shardBorder};
  background: ${(props) => props.theme.colors.shard};
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
  border: 1px solid ${(props) => props.theme.colors.shardBorder};
  background: ${(props) => props.theme.colors.shard};
  border-radius: 2px;
  padding: 1rem;
  margin: 0.5rem;
  z-index: 2;
`

const MainnetBox = styled.div`
  border: 1px solid ${(props) => props.theme.colors.mainnetBorder};
  background: ${(props) => props.theme.colors.mainnet};
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
  padding-bottom: 4rem;
`

const Intro = styled.div`
  max-width: 640px;
  margin-top: 4rem;
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
        <h2>
          <Translation id="page-eth2-mainnet" />
        </h2>
        <p>
          <Translation id="page-eth2diagram-p" />
        </p>
        <p>
          <Translation id="page-eth2diagram-p-1" />
        </p>
      </>
    )
  }
  if (upgrade === BEACON_CHAIN) {
    return (
      <>
        <h2>
          <Translation id="page-eth2-beacon-chain-title" />
        </h2>
        <p>
          <Translation id="page-eth2diagram-p-2" />
        </p>
        <p>
          <Translation id="page-eth2diagram-p-3" />
        </p>
        <ButtonLink to="/eth2/beacon-chain/">
          <Translation id="page-eth2-beacon-chain-btn" />
        </ButtonLink>
      </>
    )
  }
  if (upgrade === SHARDS) {
    return (
      <>
        <h2>
          <Translation id="page-eth2-shard-title" />
        </h2>
        <p>
          <Translation id="page-eth2diagram-p-4" />
        </p>
        <p>
          <Translation id="page-eth2diagram-p-5" />{" "}
          <Link to="/developers/docs/consensus-mechanisms/pow/">
            <Translation id="page-eth2diagram-link-1" />
          </Link>
          .
        </p>
        <ButtonLink to="/eth2/shard-chains/">
          <Translation id="page-eth2diagram-link-2" />
        </ButtonLink>
      </>
    )
  }
  if (upgrade === DOCKING) {
    return (
      <>
        <h2>
          <Translation id="page-eth2-docking" />
        </h2>
        <p>
          <Translation id="page-eth2diagram-p-6" />{" "}
          <Link to="/developers/docs/consensus-mechanisms/pos/">
            <Translation id="page-eth2-proof-of-stake" />
          </Link>{" "}
          <Translation id="page-eth2diagram-p-7" />
        </p>
        <p>
          <Translation id="page-eth2diagram-p-8" />{" "}
          <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
            <Translation id="page-eth2diagram-miners-upper" />
          </Link>{" "}
          <Translation id="page-eth2diagram-p-9" />{" "}
          <Link to="/glossary/#validator">
            <Translation id="page-eth2diagram-validators" />
          </Link>
          .
        </p>
        <ButtonLink to="/eth2/docking/">
          <Translation id="page-eth2-docking-btn" />
        </ButtonLink>
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
  return (
    <Diagram>
      <Modal isOpen={!!modalState} setIsOpen={handleClick}>
        <ModalContent upgrade={modalState} />
      </Modal>
      <Intro>
        <H2>
          <Translation id="page-eth2diagram-h2" />
        </H2>
        <p>
          <Translation id="page-eth2diagram-p10" />
        </p>
      </Intro>
      <MobileInstruction>
        <p>
          <Translation id="page-eth2diagram-scroll" />
        </p>
        <Emoji ml={"1rem"} size="4" mb={"1rem"} text=":point_right:" />
      </MobileInstruction>
      <InfographicContainer>
        <Container>
          <PrePhase2>
            <Phase01>
              <Phase0
                isAboveOverlay={modalState === BEACON_CHAIN}
                onClick={() => handleClick(BEACON_CHAIN)}
              >
                <Translation id="page-eth2-beacon-chain-title" />
              </Phase0>
              <Phase1 isAboveOverlay={modalState === SHARDS}>
                <Translation id="page-eth2-beacon-chain-title" />
                <Box onClick={() => handleClick(SHARDS)}>
                  <Translation id="page-eth2diagram-shard" />
                </Box>
                <Box onClick={() => handleClick(SHARDS)}>
                  <Translation id="page-eth2diagram-shard-1" />
                </Box>
              </Phase1>
            </Phase01>
            <Eth1
              isAboveOverlay={modalState === MAINNET}
              onClick={() => handleClick(MAINNET)}
            >
              <Translation id="page-eth2diagram-Mainnet" />
            </Eth1>
          </PrePhase2>
          <Phase2
            isAboveOverlay={modalState === DOCKING}
            onClick={() => handleClick(DOCKING)}
          >
            <Translation id="page-eth2diagram-shard" />
            <ShardBox>
              <Translation id="page-eth2diagram-shard" />
            </ShardBox>
            <ShardBox>
              <Translation id="page-eth2diagram-shard-2" />
            </ShardBox>
            <ShardBox>
              <Translation id="page-eth2diagram-shard-3" />
            </ShardBox>
            <MainnetBox>
              <Translation id="page-eth2diagram-Mainnet" />
            </MainnetBox>
          </Phase2>
        </Container>
      </InfographicContainer>
    </Diagram>
  )
}

export default Eth2Diagram
