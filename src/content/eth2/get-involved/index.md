---
title: Get involved in Eth2
description: How to participate in Eth2
lang: en
sidebar: true
---

# Get involved in Eth2

People from across the Ethereum community contribute to Eth2, and there are ways for you to get involved too. At this stage, most of the ways to help out are quite technical because the work is focussed on testing. But there'll be more less-technical opportunities to get involved with Eth2 as we get further along [the roadmap](/en/eth2/roadmap/).

## Go bug hunting 🐛 {#go-bug-hunting}

To find and report bugs in Eth2 you'll need to run the test clients and see if you can find anything that doesn't work properly.

A bug might be a severe defect that could crash Eth2 or just something that doesn't quite work as you think it should. This is a vital part of making sure the [beacon chain](/en/eth2/the-beacon-chain) works as designed. You can get rewards for bringing bugs to the community's attention – for more details check out [the bounty program](https://notes.ethereum.org/@djrtwo/phase0-bounty)

**If you can, it's even more helpful to set up and run multiple Eth2 clients.**

### Eth2 clients

| Client                                                                           | Setup instructions                                                                              |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [Cortex _(.NET)_](https://nethermind.io/)                                        | <Button to="https://nethermind.io/client">Get started</Button>                                  |
| [Lighthouse _(Rust)_](https://sigmaprime.io/#sec03)                              | <Button to="https://lighthouse-book.sigmaprime.io/become-a-validator.html">Get started</Button> |
| [Lodestar _(JavaScript)_](https://github.com/chainsafe/lodestar#getting-started) | <Button to="https://chainsafe.github.io/lodestar/installation/">Get started</Button>            |
| [Nimbus _(Nim)_](https://nimbus.team/)                                           | <Button to="https://nimbus.team/docs/building.html">Get started</Button>                        |
| [Prysm _(Go)_](https://prysmaticlabs.com/)                                       | <Button to="https://docs.prylabs.network/docs/getting-started">Get started</Button>             |
| [Teku _(Java)_](https://pegasys.tech/teku-ethereum-2-for-enterprise/)            | <Button to="https://docs.teku.pegasys.tech/en/latest/">Get started</Button>                     |
| [Trinity _(Python)_](https://trinity.ethereum.org/)                              | <Button to="https://trinity.ethereum.org/#install">Get started</Button>                         |

## Attacknets 🤺

Security is everything. If you're a white-hat hacker you can help out by trying to crash purpose-made attacknets. They are small, four-node versions of the Lighthouse and Prysm clients. Bringing down one of these attacknets could shine a light on potential vulnerabilities in the real thing.

There are ETH and DAI rewards for successful attacks that help us improve the security of Eth2.

[Read the rules and reporting process](https://github.com/ethereum/public-attacknets)

## Stake test ETH using the launchpad 🚀

<img src="https://medalla.launchpad.ethereum.org/static/media/eth2-leslie-rhino.243747b9.png" width="50%" />

As a holder of ETH, you can now participate in the test version of Eth2 by staking test ETH. This will make you a test Eth2 validator. A validator processes transactions and creates new blocks in Eth2 – potentially earning rewards in the process.

This test staking is happening on the the [Medalla multi-client testnet](https://github.com/goerli/medalla/blob/master/medalla/README.md) using GöETH, a type of test ETH running on the Görli testnet. The staking launchpad will walk you through the process in detail.

If you don't have any GöETH, you can get some from the Görli faucet. This is an application that allows you to request test ETH.

<Button to="https://medalla.launchpad.ethereum.org/">Go to the Medalla launchpad</Button> {" "}{" "}<Button isSecondary to="https://faucet.goerli.mudit.blog/">Request GöETH</Button>
