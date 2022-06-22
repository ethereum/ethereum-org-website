---
title: How to turn your Raspberry Pi 4 into a node just by flashing the MicroSD card
description: Flash your Raspberry Pi 4, plug in an ethernet cable, connect the SSD disk and power up the device to turn the Raspberry Pi 4 into a full Ethereum node + validator
author: "EthereumOnArm"
tags: ["clients", "execution layer", "consensus layer", "nodes"]
lang: en
sidebar: true
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html
preMergeBanner: true
---

**Ethereum on Arm is a custom Linux image that can turn a Raspberry Pi into an Ethereum node.**

To use Ethereum on Arm to turn a Raspberry Pi into an Ethereum node, the following hardware is recommended:

- Raspberry 4 (model B 8GB)
- MicroSD Card (16 GB Class 10 minimum)
- 2 TB SSD minimum USB 3.0 disk or an SSD with a USB to SATA case.
- Power supply
- Ethernet cable
- Port forwarding (see clients for further info)
- A case with heatsink and fan
- USB keyboard, Monitor and HDMI cable (micro-HDMI) (Optional)

## Why run Ethereum on ARM? {#why-run-ethereum-on-arm}

ARM boards are very affordable, flexible, small computers. They are good choices for running Ethereum nodes because they can be bought cheaply, configured so that all their resources focus just on the node, making them efficient, they consume low amounts of power and have are physically small so they can fit unobtrusively in any home. It is also very easy to spin up nodes because the Raspberry Pi's MicroSD can simply be flashed with a prebuilt image, with no downloading or building software required.

## How does it work? {#how-does-it-work}

The Raspberry Pi's memory card is flashed with a prebuilt image. This image contains everything needed to run an Ethereum node. With a flashed card, all the user needs to do is power-on the Raspberry Pi. All the processes required to run the node are automatically started. This works because the memory card contains a Linux-based operating system (OS) on top of which system-level processes are automatically run that turn the unit into an Ethereum node.

Ethereum cannot be run using the popular Raspberry Pi Linux OS "Raspbian" because Raspbian still uses a 32-bit architecture which leads Ethereum users to run into memory issues and consensus clients do not support 32-bit binaries. To overcome this, the Ethereum on Arm team migrated to a native 64-bit OS called "Armbian".

**Images take care of all the necessary steps**, from setting up the environment and formatting the SSD disk to installing and running the Ethereum software as well as starting the blockchain synchronization.

## Note on execution and consensus clients {#note-on-execution-and-consensus-clients}

The Ethereum on Arm documentation explains how to set up _either_ an execution client OR a consensus client, except for two Ethereum testnets (Kiln and Ropsten). This optionality is only possible in advance of Ethereum's upcoming transition from proof-of-work (PoW) to proof-of-stake (PoS) known as [The Merge](/upgrades/merge).

<InfoBanner>
After The Merge, it will not be possible to run execution and consensus clients separately—they must be run as a pair. Therefore, in this tutorial we will run a pair of execution and consensus clients together on an Ethereum testnet (Kiln).
</InfoBanner>

## The Kiln Raspberry Pi 4 Image {#the-kiln-raspberry-pi-4-image}

Kiln is a public testnet specifically designed for testing The Merge. Ethereum on Arm developed an image allowing users to rapidly spin up a pair of Ethereum clients on this merge testnet. The Kiln merge has already happened, but the network is still live, so it can be used for this tutorial. Ether on Kiln has no real-world value.

The Kiln Raspberry Pi 4 image is a "plug and play" image that automatically installs and sets up both the execution and consensus clients, configuring them to talk to each other and connect to the Kiln network. All the user needs to do is start their processes using a simple command. The image contains four execution clients (Geth, Nethermind, Besu and Erigon) and four consensus clients (Lighthouse, Prysm, Nimbus, Teku) that the user can choose from.

Download the Raspberry Pi image from [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/ES56R_SuvaVFkiMO1Tgnf6kB7lEbBfla5c2c18E3WQRJzA?download=1) and verify the SHA256 hash:

```sh
# From directory containing the downloaded image
shasum -a 256 ethonarm_kiln_22.03.01.img.zip
# Hash should output: 485cf36128ca60a41b5de82b5fee3ee46b7c479d0fc5dfa5b9341764414c4c57
```

Note that for users that do not own a Raspberry Pi but do have an AWS account, there are ARM instances available that can run the same image. Instructions and the AWS image are available to download from Ethereum on Arm (https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html).

## Flashing the MicroSD {#flashing-the-microsd}

The MicroSD card that will be used for the Raspberry Pi should first be inserted into a desktop or laptop so it can be flashed. Then, the following terminal commands will flash the downloaded image onto the SD card:

```shell
# check the MicroSD card name
sudo fdisk -I

>> sdxxx
```

It is really important to get the name correct because the next command includes `dd` which completely erases the existing content of the card before pushing the image onto it. To continue, navigate to the directory containing the zipped image:

```shell
# unzip and flash image
unzip ethonarm_kiln_22.03.01.img.zip
sudo dd bs=1M if=ethonarm_kiln_22.03.01.img of=/dev/mmcblk0 conv=fdatasync status=progress
```

The card is now flashed, so it can be inserted into the Raspberry Pi.

## Start the node {#start-the-node}

With the SD card inserted into the Raspberry Pi, connect the ethernet cable and SSD then switch the power on. The OS will boot up and automatically start performing the preconfigured tasks that turn the Raspberry Pi into an Ethereum node, including installing and building the client software. This will probably take 10-15 minutes.

Once everything is installed and configured, log in to the device via an ssh connection or using the terminal directly if a monitor and keyboard is attached to the board. Use the `ethereum` account to log in, as this has permissions required to start the node.

```shell
User: ethereum
Password: ethereum
```

The user can then choose the execution-consensus client combination they wish to run, and start their systemctl processes as follows (example runs Geth and Lighthouse):

```shell
sudo systemctl start geth-lh
sudo systemctl start lh-geth-beacon
```

The logs can be checked using

```shell
# logs for Geth
sudo journalctl -u geth-lh -f
#logs for lighthouse
sudo journalctl -u lh-geth-beacon -f
```

The specific service names for every combination of clients are available at the [Ethereum on Arm docs](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html#id2). They can be used to update the commands provided here for any combination.

## Validators {#validators}

In order to run a validator you must first have access to 32 testnet ETH, which must be deposited into the Kiln deposit contract. This can be done by following the step-by-step guide on the [Kiln Launchpad](https://kiln.launchpad.ethereum.org/en/). Do this on a desktop/laptop, but do not generate keys—this can be done directly on the Raspberry Pi.

Open a terminal on the Raspberry Pi and run the following command to generate the deposit keys:

```
cd && deposit new-mnemonic --num_validators 1 --chain kiln
```

Keep the mnemonic phrase safe! The command above generated two files in the node's keystore: the validator keys and a deposit data file. The deposit data needs to be uploaded into the launchpad, so it must be copied from the Raspberry Pi to the desktop/laptop. This can be done using an ssh connection or any other copy/paste method.

Once the deposit data file is available on the computer running the launchpad, it can be dragged and dropped onto the `+` on the launchpad screen. Follow the instructions on the screen to send a transaction to the deposit contract.

Back on the Raspberry Pi, a validator can be started. This requires importing the validator keys, setting the address to collect rewards, then starting the preconfigured validator process. The example below is for Lighthouse—instructions for other consensus clients are available on the [Ethereum on Arm docs](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html#lighthouse):

```shell
# import the validator keys
lighthouse-kl account validator import --directory=/home/ethereum/validator_keys --datadir=/home/ethereum/.lh-geth/kiln/testnet-lh

# set the reward address
sudo sed -i '<ETH_ADDRESS>' /etc/ethereum/kiln/lh-geth-validator.conf

# start the validator
sudo systemctl start lh-geth-validator
```

Congratulations, you now have a full Ethereum node and validator running on a Raspberry Pi!

## Feedback appreciated {#feedback-appreciated}

We know the Raspberry Pi has a massive user base that could have a very positive impact on the health of the Ethereum network.
Please dig into the details in this tutorial, try running on other testnets or even Ethereum Mainnet, check out the Ethereum on Arm Github, give feedback, raise issues and pull requests and help advance the technology and documentation!

## References {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
