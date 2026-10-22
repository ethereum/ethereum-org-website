---
title: Run an Ethereum node on a Raspberry Pi 5
description: Flash your Raspberry Pi 5, plug in an ethernet cable, connect the NVMe disk and power up the device to turn the Raspberry Pi 5 into a full Ethereum node + validator
author: "EthereumOnArm"
tags: ["clients", "execution layer", "consensus layer", "nodes"]
lang: en
skill: intermediate
breadcrumb: Rasp Pi Node
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm is a custom Linux image that can turn a Raspberry Pi into an Ethereum node.**

To use Ethereum on Arm to turn a Raspberry Pi into an Ethereum node, the following hardware is recommended:

- Raspberry Pi 5 with 16 GB of RAM
- An NVMe HAT for the Raspberry Pi 5, to connect an NVMe disk
- NVMe SSD (M.2 2280), 2 TB minimum, 4 TB recommended. Avoid disks with a Phison controller, which have known compatibility issues.
- MicroSD Card (16 GB Class 10 minimum)
- Power supply
- Ethernet cable
- Port forwarding (see clients for further info)
- A case with heatsink
- USB keyboard, Monitor and HDMI cable (micro-HDMI) (Optional)

Ethereum on Arm also supports other ARM boards, such as the NanoPC T6, Rock 5B, and Orange Pi 5 Plus. These boards have native NVMe support, so the Ethereum on Arm team recommends them over the Raspberry Pi 5 if you are buying new hardware. See the [recommended hardware list](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html) for details. The rest of this tutorial is the same for all supported boards, except for the image file you download.

## Why run Ethereum on ARM? {#why-run-ethereum-on-arm}

ARM boards are very affordable, flexible, small computers. They are good choices for running Ethereum nodes because they can be bought cheaply, configured so that all their resources focus just on the node, making them efficient, they consume low amounts of power and are physically small so they can fit unobtrusively in any home. It is also very easy to spin up nodes because the Raspberry Pi's MicroSD can simply be flashed with a prebuilt image, with no downloading or building software required.

## How does it work? {#how-does-it-work}

The Raspberry Pi's memory card is flashed with a prebuilt image. This image contains everything needed to run an Ethereum node. With a flashed card, all the user needs to do is power-on the Raspberry Pi. All the processes required to run the node are automatically started. This works because the memory card contains a Linux-based operating system (OS) on top of which system-level processes are automatically run that turn the unit into an Ethereum node.

Ethereum on Arm images are based on a 64-bit Linux distribution that is optimized for running an Ethereum node, and they include prebuilt Ethereum clients.

**Images take care of all the necessary steps**, from setting up the environment and formatting the NVMe disk to installing the Ethereum software.

## Note on execution and consensus clients {#note-on-execution-and-consensus-clients}

The Ethereum on Arm image includes prebuilt execution and consensus clients as services. An Ethereum node requires both clients to be synced and running. You are only required to download and flash the image and then start the services. The image is preloaded with several execution clients (such as Geth, Nethermind, Besu, Erigon, and Reth) and consensus clients (such as Lighthouse, Prysm, Teku, Nimbus, and Lodestar). See the [Ethereum on Arm documentation](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html) for the current list.

You should choose one of each to run - all execution clients are compatible with all consensus clients. This tutorial uses Geth and Lighthouse.

## Downloading the Image {#downloading-the-image}

The Ethereum on Arm image is a "plug and play" image that automatically installs and sets up both the execution and consensus clients, configuring them to talk to each other and connect to the Ethereum network. All the user needs to do is start their processes using a simple command.

Download the latest image for your board from the [Ethereum on Arm download page](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads). The download page also lists the SHA256 checksum of each image. Verify the downloaded file against it:

```sh
# From directory containing the downloaded image
sha256sum ethonarm_rpi5_<version>.img.zip
# Compare the output with the checksum on the download page
```

## Flashing the MicroSD {#flashing-the-microsd}

The MicroSD card that will be used for the Raspberry Pi should first be inserted into a desktop or laptop so it can be flashed. Then, the following terminal commands will flash the downloaded image onto the SD card:

```shell
# check the MicroSD card name
sudo fdisk -l

>> sdxxx
```

It is really important to get the name correct because the next command includes `dd` which completely erases the existing content of the card before pushing the image onto it. To continue, navigate to the directory containing the zipped image:

```shell
# unzip and flash image
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

The card is now flashed, so it can be inserted into the Raspberry Pi.

## Start the node {#start-the-node}

With the SD card inserted into the Raspberry Pi, connect the ethernet cable and the NVMe disk then switch the power on. The OS will boot up and automatically start performing the preconfigured tasks that turn the Raspberry Pi into an Ethereum node, including formatting the NVMe disk and installing the client software. This will probably take 10-15 minutes, and the board reboots automatically when it is finished. Do not interrupt the power supply during this time.

Once everything is installed and configured, log in to the device via an ssh connection or using the terminal directly if a monitor and keyboard is attached to the board. Use the `ethereum` account to log in, as this has permissions required to start the node.

```shell
User: ethereum
Password: ethereum
```

You will be asked to change the default password on your first login. Do it, because anybody who can reach your node could otherwise log in with the default password. The system firewall is disabled by default, so if your node has a public IP address, see the [Ethereum on Arm security guide](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html) to enable it.

Start the consensus client first. Open port 9000 (TCP and UDP) on your router so that Lighthouse can find and connect to peers. Then enable and start the lighthouse service, so it also restarts after a reboot:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Check the client using the logs:

```sh
sudo journalctl -u lighthouse-beacon -f
```

Next, start the execution client. Open port 30303 (TCP and UDP) on your router so Geth can find and connect to peers. Then enable and start the geth service:

```sh
sudo systemctl enable --now geth
```

You can confirm it is running by checking the logs:

```sh
sudo journalctl -u geth -f
```

Note that the consensus client will sync in a few minutes because it uses checkpoint sync. The execution client will take longer - potentially several hours. Both clients run at the same time: the consensus client tells the execution client which block is the head of the chain, and the execution client downloads and verifies the blocks up to it.

With the Geth and Lighthouse services running and synced, your Raspberry Pi is now an Ethereum node! It is most common to interact with the Ethereum network using Geth's Javascript console, which can be attached to the Geth client on port 8545. It is also possible to submit commands formatted as JSON objects using a request tool such as Curl. See more in the [Geth documentation](https://geth.ethereum.org/).

The image also includes a Grafana dashboard that more advanced users can use to monitor the health of their node, by navigating to `ipaddress:3000` in a browser.

## Validators {#validators}

A validator can also be optionally added to the consensus client. The validator software allows your node to participate actively in consensus and provides the network with cryptoeconomic security. You get rewarded for this work in ETH. To run a validator, you must first have 32 ETH, which must be deposited into the deposit contract. The deposit can be made by following the step-by-step guide on the [Launchpad](https://launchpad.ethereum.org/). Do this on a desktop/laptop, but do not generate keys — this can be done directly on the Raspberry Pi.

The [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) tool generates validator keys. Current images include it; if you are running an older image, install it first. Then generate the deposit keys, replacing `<YOUR_ETH_ADDRESS>` with the address that should receive your withdrawals:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Or download the [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) to run on an airgapped machine, and run the `deposit new-mnemonic` command there)

Keep the mnemonic phrase safe! The command above generated two files in the `validator_keys` directory: the validator keys and a deposit data file. The deposit data needs to be uploaded into the launchpad, so it must be copied from the Raspberry Pi to the desktop/laptop. This can be done using an ssh connection or any other copy/paste method.

Once the deposit data file is available on the computer running the launchpad, it can be dragged and dropped onto the `+` on the launchpad screen. Follow the instructions on the screen to send a transaction to the deposit contract.

Back on the Raspberry Pi, a validator can be started. This requires importing the validator keys, setting the address to collect rewards, and then starting the preconfigured validator process. The example below is for Lighthouse—instructions for other consensus clients are available on the [Ethereum on Arm docs](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html):

```shell
# import the validator keys
lighthouse account validator import --directory=/home/ethereum/validator_keys

# set the reward address (replace <YOUR_ETH_ADDRESS> with your address)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# start the validator
sudo systemctl enable --now lighthouse-validator
```

Congratulations, you now have a full Ethereum node and validator running on a Raspberry Pi!

## More details {#more-details}

This page gave an overview of how to set up a Geth-Lighthouse node and validator using Raspberry Pi. More detailed instructions are available on the [Ethereum-on-Arm website](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Feedback appreciated {#feedback-appreciated}

We know the Raspberry Pi has a massive user base that could have a very positive impact on the health of the Ethereum network.
Please dig into the details in this tutorial, try running on testnets, check out the [Ethereum on Arm GitHub](https://github.com/EOA-Blockchain-Labs/ethereumonarm), give feedback, raise issues and pull requests and help advance the technology and documentation!

## References {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
