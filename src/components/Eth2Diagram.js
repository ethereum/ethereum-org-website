import React, { useState } from "react"
import styled from "styled-components"
import Modal from "./Modal"
import ButtonLink from "./ButtonLink"
import Link from "./Link"

const Eth1 = styled.div`
  border: 1px solid ${(props) => props.theme.colors.black50};
  background: ${(props) => props.theme.colors.success200};
  width: 100%;
  display: flex;
  border-radius: 2px;
  padding: 1rem;
  align-items: center;
`

const Phase2 = styled.div`
  border: 1px solid ${(props) => props.theme.colors.black50};
  background: #e1fefa;
  border-radius: 2px;
  padding: 1rem;
  width: 25%;
`

const Phase1 = styled.div`
  border: 1px solid ${(props) => props.theme.colors.black50};
  background: #e1fefa;
  border-radius: 2px;
  padding: 1rem;
  width: 25%;
`

const Phase0 = styled.div`
  border: 1px solid ${(props) => props.theme.colors.black50};
  background: #e1fefa;
  border-radius: 2px;
  padding: 1rem;
  width: 25%;
  margin-right: 1rem;
`

const Box = styled.div`
  border: 1px solid ${(props) => props.theme.colors.black50};
  background: ${(props) => props.theme.colors.warning};
  border-radius: 2px;
  padding: 1rem;
  margin: 0.5rem;
  z-index: 2;
`

const MainnetBox = styled.div`
  border: 1px solid ${(props) => props.theme.colors.black50};
  background: ${(props) => props.theme.colors.success200};
  border-radius: 2px;
  padding: 1rem;
  margin: 0.5rem;
`

const InfographicContainer = styled.div`
  padding-bottom: 3rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: scroll;
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors.black50};
  border-radius: 2px;
`

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  overflow-x: scroll;
  width: 100%;
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

const Eth2Diagram = () => {
  const [isMainnetModalOpen, setMainnetModalOpen] = useState(false)
  const [isShardModalOpen, setShardModalOpen] = useState(false)
  const [isBCModalOpen, setBCModalOpen] = useState(false)
  const [isDockedModalOpen, setDockedModalOpen] = useState(false)
  const [isDockedMainnetModalOpen, setDockedMainnetModalOpen] = useState(false)
  return (
    <div>
      <Modal isOpen={isMainnetModalOpen} setIsOpen={setMainnetModalOpen}>
        test
      </Modal>
      <Modal isOpen={isShardModalOpen} setIsOpen={setShardModalOpen}>
        <h2>Shard Chains</h2>
        <p>
          The shard chain upgrade will introduce shard chains into Ethereum.
          They'll be coordinated by the Beacon Chain.
        </p>
        <p>
          The shards will provide lots of extra data to help increase the amount
          of transactions mainnet can handle.
        </p>
        <p>
          Mainnet will still exist as we know it today – secured by{" "}
          <Link to="/developers/docs/consensus-mechanisms/pow/">
            proof-of-work and miners
          </Link>
          .
        </p>
        <ButtonLink to="/eth2/shard-chains/">More on shard chains</ButtonLink>
      </Modal>
      <Modal isOpen={isBCModalOpen} setIsOpen={setBCModalOpen}>
        <h2>The Beacon Chain</h2>
        <p>
          The Beacon Chain will launch as soon as there is enough ETH in the
          deposit contract.
        </p>
        <p>At first, it will exist separately from mainnet.</p>
        <ButtonLink to="/eth2/beacon-chain/">
          More on the Beacon Chain
        </ButtonLink>
      </Modal>
      <Modal isOpen={isDockedModalOpen} setIsOpen={setDockedModalOpen}>
        test dockedd
      </Modal>
      <Modal
        isOpen={isDockedMainnetModalOpen}
        setIsOpen={setDockedMainnetModalOpen}
      >
        test docked mn
      </Modal>
      <h2>Relation of upgrades</h2>
      <InfographicContainer>
        <h3>Ethereum</h3>
        <Container>
          <PrePhase2>
            <Phase01>
              <Phase0 onClick={() => setBCModalOpen(true)}>
                The Beacon Chain
              </Phase0>
              <Phase1 onClick={() => setShardModalOpen(true)}>
                The Beacon Chain
                <Box>Shard (1)</Box>
                <Box>Shard (...)</Box>
              </Phase1>
            </Phase01>
            <Eth1 onClick={() => setMainnetModalOpen(true)}>Mainnet</Eth1>
          </PrePhase2>
          <Phase2 onClick={() => setDockedModalOpen(true)}>
            The Beacon Chain
            <Box>Shard (1)</Box>
            <Box>Shard (2)</Box>
            <Box>Shard (...)</Box>
            <MainnetBox onClick={() => setDockedMainnetModalOpen(true)}>
              Mainnet
            </MainnetBox>
          </Phase2>
        </Container>
      </InfographicContainer>
    </div>
  )
}

export default Eth2Diagram
