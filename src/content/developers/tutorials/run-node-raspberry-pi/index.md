---
title: How to turn your Raspberry Pi 4 into a node just by flashing the MicroSD card
description: Flash your Raspberry Pi 4, plug in an ethernet cable, connect the SSD disk and power up the device to turn the Raspberry Pi 4 into a full Ethereum 1.0 node or an Ethereum 2.0 node (beacon chain / validator)
author: "EthereumOnArm"
tags: ["clients", "eth2", "nodes"]
lang: en
sidebar: true
skill: intermediate
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL;DR**: Flash your Raspberry Pi 4, plug in an ethernet cable, connect the SSD disk and power up the device to turn the Raspberry Pi 4 into a full Ethereum 1.0 node or an Ethereum 2.0 node (beacon chain / validator)

[Learn about Ethereum 2.0 (Eth2)](/eth2/)

Some background first. As you know, we’ve been running into some memory issues [[1]](/developers/tutorials/run-node-raspberry-pi/#references) with the Raspberry Pi 4 image as Raspbian OS is still on 32bits [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (at least the userland). While we prefer to stick with the official OS we came to the conclusion that, in order to solve these issues, we need to migrate to a native 64 bits OS

Besides, [Eth 2.0 clients](/eth2/get-involved/#eth2-clients) don’t support 32 bits binaries so using Raspbian would exclude the Raspberry Pi 4 from running an Eth 2.0 node (and the possibility of staking).

So, after several tests we are now releasing 2 different images based on Ubuntu 20.04 64bit [[3]](/developers/tutorials/run-node-raspberry-pi/#references): Eth 1.0 and Eth 2.0 editions.

Basically, both are the same image and include the same features of the Raspbian based images. But they are setup for running Eth 1.0 or Eth 2.0 software by default.

**Images take care of all the necessary steps**, from setting up the environment and formatting the SSD disk to installing and running the Ethereum software as well as starting the blockchain synchronization.

## Main features {#main-features}

- Based on Ubuntu 20.04 64bit
- Automatic USB disk partitioning and formatting
- Adds swap memory (ZRAM kernel module + a swap file) based on Armbian work [[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- Changes the hostname to something like “ethnode-e2a3e6fe” based on MAC hash
- Runs software as a systemd service and starts syncing the Blockchain
- Includes an APT repository for installing and upgrading Ethereum software
- Includes a monitoring dashboard based on Grafana / Prometheus

## Software included {#software-included}

Both images include the same packages, the only difference between them is that Eth 1.0 runs Geth by default and Eth 2.0 runs Prysm beacon chain by default.

### Ethereum 1.0 clients {#ethereum-10-clients}

- Geth [[8]](/developers/tutorials/run-node-raspberry-pi/#references): 1.9.13 (official binary)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references): 2.7.2 (cross compiled)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references): 1.8.28 (cross compiled)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references): 1.4.4 (compiled)

### Ethereum 2.0 clients {#ethereum-20-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references): 1.0.0-alpha6 (official binary)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references): 0.1.1 (compiled)

### Ethereum framework {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.7 (official binary)
- Raiden Network [[15]](/developers/tutorials/run-node-raspberry-pi/#references): 0.200.0~rc1 (official binary)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.0 (official binary)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references): 0.52.3 (compiled)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references): 2.3.3 (official binary)

## Installation guide and usage {#installation-guide-and-usage}

### Recommended hardware and setup {#recommended-hardware-and-setup}

- Raspberry 4 (model B) - 4GB
- MicroSD Card (16 GB Class 10 minimun)
- SSD USB 3.0 disk (see storage section)
- Power supply
- Ethernet cable
- 30303 Port forwarding (Eth 1.0) and 13000 port forwarding (Eth 2.0) [[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- A case with heatsink and fan (optional but strongly recommended)
- USB keyboard, Monitor and HDMI cable (micro-HDMI) (optional)

## Storage {#storage}

You will need and SSD to run the Ethereum clients (without an SSD drive there’s absolutely no chance of syncing the Ethereum blockchain). There are 2 options:

- Use a USB portable SSD disk such as the Samsung T5 Portable SSD.
- Use a USB 3.0 External Hard Drive Case with a SSD Disk. In our case we used a Inateck 2.5 Hard Drive Enclosure FE2011. Make sure to buy a case with an UAS compliant chip, particularly, one of these: JMicron (JMS567 or JMS578) or ASMedia (ASM1153E).

In both cases, avoid getting low quality SSD disks as it is a key component of your node and it can drastically affect the performance (and sync times).

Keep in mind that you need to plug the disk to an USB 3.0 port (blue)

## Image download and installation {#image-download-and-installation}

### 1. Download Eth 1.0 or Eth 2.0 images {#1-download-eth-10-or-eth-20-images}

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">Download Eth 1.0 image</ButtonLink>

sha256 7fa9370d13857dd6abcc8fde637c7a9a7e3a66b307d5c28b0c0d29a09c73c55c

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">Download Eth2 image</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Flash the image {#2-flash-the-image}

Insert the microSD in your Desktop / Laptop and download the file (Eth 1.0, for instance):

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

Note: If you are not comfortable with command line or if you are running Windows, you can use [Etcher](https://etcher.io)

Open a terminal and check your MicroSD device name running:

```bash
sudo fdisk -l
```

You should see a device named mmcblk0 or sdd. Unzip and flash the image:

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. Insert the MicroSD into the Raspberry Pi 4. Connect an Ethernet cable and attach the USB SSD disk (make sure you are using a blue port). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Power on the device {#4-power-on-the-device}

The Ubuntu OS will boot up in less than one minute but **you will need to wait approximately 10 minutes** in order to allow the script to perform the necessary tasks to turn the device into an Ethereum node and reboot the Raspberry.

Depending on the image, you will be running:

- Eth 1.0: Geth as the default client syncing the blockchain
- Eth2: Prysm as default client syncing the beacon chain (Topaz testnet)

### 5. Log in {#5-log-in}

You can log in through SSH or using the console (if you have a monitor and keyboard attached)

```bash
User: ethereum
Password: ethereum
```

You will be prompted to change the password on first login, so you will need to login twice.

### 6. Open 30303 port for Geth and 13000 if you are running Prysm beacon chain. If you don’t know how to do this, google “port forwarding” followed by your router model. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Get console output {#7-get-console-output}

You can see what’s happening in the background by typing:

```bash
sudo tail -f /var/log/syslog
```

**Congratulations. You are now running a full Ethereum node on your Raspberry Pi 4.**

## Syncing the Blockchain {#syncing-the-blockchain}

Now you need to wait for the blockchain to be synced. In the case of Eth 1.0 This will take a few days depending on several factors but you can expect up to about 5-7 days.

If you are running the Eth2 Topaz tesnet you can expect 1-2 days of Beacon chain synchronization time. Remember that you will need to setup the validator later in order to start the staking process. [How to run the Eth 2.0 validator](/developers/tutorials/run-node-raspberry-pi/#validator)

## Monitoring dashboards {#monitoring-dashboards}

For this first release, we included 3 monitoring dashboards based on Prometheus [[5]](/developers/tutorials/run-node-raspberry-pi/#references) / Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) in order to monitor the node and clients’ data (Geth and Besu). You can access through your web browser:

```bash
URL: http://your_raspberrypi_IP:3000
User: admin
Password: ethereum
```

## Switching clients {#switching-clients}

All clients run as a systemd service. This is important because if a problem arises the system will respawn the process automatically.

Geth and Prysm beacon chain run by default (depending on what you are synchronizing, Eth 1.0 or Eth2) so, if you want to switch to other clients (from Geth to Nethermind, for instance), you need to stop and disable Geth first, and enable and start the other client:

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Commands to enable and start each Eth 1.0 client:

```bash
sudo systemctl enable besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

Eth2:

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable lighthouse
```

## Changing parameters {#changing-parameters}

Clients’ config files are located in the /etc/ethereum/ directory. You can edit these files and restart the systemd service in order for the changes to take effect. The only exception is Nethermind which, additionally, has a Mainnet config file located here:

```bash
/etc/nethermind/configs/mainnet.cfg
```

Blockchain clients’ data is stored on the Ethereum home account as follows (note the dot before the directory name):

### Eth 1.0 {#eth-10}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Eth2 {#eth2}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind and Hyperledger Besu {#nethermind-and-hyperledger-besu}

These 2 great Eth 1.0 clients have become a great alternative to Geth and Parity. The more diversity in the network, the better, so you may give them a try and contribute to the network health.

Both need further testing so feel free to play with them and report back your feedback.

## How to run the Eth 2.0 validator (staking) {#validator}

Once the Topaz testnet beacon chain is synchronized you can run a validator in the same device. You will need to follow [these participation steps](https://prylabs.net/participate).

The first time, you need to create manually an account by running the “validator” binary and setup a password. Once you have completed this step you can add the password to `/etc/ethereum/prysm-validator.conf` and start the validator as a systemd service.

## Feedback appreciated {#feedback-appreciated}

We put a lot of work trying to setup the Raspberry Pi 4 as a full Ethereum node as we know the massive user base of this device may have a very positive impact in the network.

Please, take into account that this is the first image based on Ubuntu 20.04 so there may be some bugs. If so, open an issue on [Github](https://github.com/diglos/pi-gen) or reach us on [Twitter](https://twitter.com/EthereumOnARM).

## References {#references}

1. [geth repeatedly crashes with SIGSEGV](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/pi-gen](https://github.com/diglos/pi-gen)
3. https://ubuntu.com/download/raspberry-pi
4. https://en.wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. https://github.com/openethereum/openethereum
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
