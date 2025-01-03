---
title: So verwandeln Sie Ihren Raspberry Pi 4 durch Überschreiben der MicroSD-Karte in einen Node
description: Verbinden Sie Ihren Raspberry Pi 4 mit einem Ethernetkabel, schließen Sie ihn anschließend an die SSD-Festplatte an und starten Sie das Gerät. Nun können Sie es als Ethereum-Node nutzen und eine Ausführungsebene oder Konsensebene (Beacon Chain/Validator) ausführen.
author: "EthereumOnArm"
tags:
  - "Clients"
  - "Ausführungsebene"
  - "Konsensebene"
  - "Nodes"
lang: de
skill: advanced
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL;DR**: Verbinden Sie Ihren Raspberry Pi 4 mit einem Ethernetkabel, schließen Sie ihn anschließend an die SSD-Festplatte an und starten Sie das Gerät. Nun können Sie es als Ethereum-Node nutzen und eine Ausführungsebene oder Konsensebene (Beacon Chain/Validator) ausführen.

[Mehr erfahren über Ethereum-Upgrades](/roadmap/)

Zunächst ein paar Hintergrundinformationen: Wie Sie bereits wissen, gibt es einige Speicherprobleme [[1]](/developers/tutorials/run-node-raspberry-pi/#references) bei dem Raspberry Pi 4-Image, da die Betriebssoftware Raspbian OS bisher nur mit der 32-Bit-Version erhältlich ist [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (das gilt jedenfalls für die Benutzeroberfläche). Obwohl wir das offizielle Betriebssystem bevorzugen würden, sind wir zu dem Entschluss gekommen, dass wir auf ein natives 64-Bit-Betriebssystem umsteigen müssen, um diese Probleme zu lösen.

Außerdem unterstützen Konsens-Clients keine 32-Bit-Binärdateien, so dass die Verwendung von Raspbian den Raspberry Pi 4 vom Betrieb eines Node auf Konsensebene (und der Möglichkeit des Staking) ausschließen würde.

Nach mehreren Tests veröffentlichen wir nun zwei verschiedene Images auf Basis von Ubuntu 20.04 64-Bit [[3]](/developers/tutorials/run-node-raspberry-pi/#references): Ausführungsebenen- und Konsensebenen-Editionen.

Im Grunde genommen handelt es sich bei beiden um das gleiche Image, das die gleichen Funktionen wie die Raspbian-basierten Images enthält. Sie sind jedoch standardmäßig für die Ausführung von Software der Ausführungsebene oder der Konsensebene eingerichtet.

**Images übernehmen alle notwendigen Schritte**, von der Einrichtung der Umgebung und der Formatierung der SSD-Platte über die Installation und Ausführung der Ethereum-Software bis hin zum Start der Blockchain-Synchronisation.

## Hauptfunktionen {#main-features}

- Basierend auf Ubuntu 20.04 64-Bit
- Automatische Partitionierung und Formatierung von USB-Festplatten
- Fügt Swap-Speicher hinzu (ZRAM-Kernel-Modul und eine Swap-Datei), basierend auf der Arbeit von Armbian [[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- Ändert den Hostnamen anhand des MAC-Hashes in etwas wie "ethnode-e2a3e6fe"
- Führt Software als systemd-Dienst aus und beginnt mit der Synchronisierung der Blockchain
- Enthält ein APT-Repository für die Installation und Aktualisierung von Ethereum-Software
- Enthält ein auf Grafana/Prometheus basierendes Überwachungs-Dashboard

## Enthaltene Software {#software-included}

Beide Images enthalten die gleichen Pakete. Der einzige Unterschied besteht darin, dass die Ausführungsversion standardmäßig Geth und die Konsensversion standardmäßig die Prysm-Beacon Chain ausführt.

### Ausführungs-Clients {#execution-clients}

- Geth [[8]](/developers/tutorials/run-node-raspberry-pi/#references): 1.9.13 (offizielle Binärdatei)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references): 2.7.2 (quer kompiliert)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references): 1.8.28 (quer kompiliert)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references): 1.4.4 (kompiliert)

### Konsens-Clients {#consensus-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references): 1.0.0-alpha6 (offizielle Binärdatei)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references): 0.1.1 (kompiliert)

### Ethereum-Framework {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.7 (offizielle Binärdatei)
- Raiden Network [[15]](/developers/tutorials/run-node-raspberry-pi/#references): 0.200.0~rc1 (offizielle Binärdatei)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.0 (offizielle Binärdatei)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references): 0.52.3 (kompiliert)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references): 2.3.3 (offizielle Binärdatei)

## Installationsanleitung und Anwendung {#installation-guide-and-usage}

### Empfohlene Hardware und Einrichtung {#recommended-hardware-and-setup}

- Raspberry 4 (Model B) – 4 GB
- MicroSD-Karte (mindestens 16 GB Klasse 10)
- SSD-USB-3.0-Festplatte (siehe Speicherabschnitt)
- Stromversorgung
- Ethernet-Kabel
- 30303-Portweiterleitung (Ausführungseben) und 13000-Portweiterleitung (Konsensebene) [[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- Ein Gehäuse mit Kühlkörper und Lüfter (optional, aber dringend empfohlen)
- USB-Tastatur, Monitor und HDMI-Kabel (micro-HDMI) (optional)

## Speicher {#storage}

Sie benötigen eine SSD, um die Ethereum-Clients auszuführen (ohne SSD-Laufwerk gibt es absolut keine Chance, die Ethereum-Blockchain zu synchronisieren). Es gibt zwei Optionen:

- Verwenden Sie eine tragbare USB-SSD-Festplatte wie die Samsung T5 Portable SSD.
- Verwenden Sie ein externes USB 3.0-Festplattengehäuse mit einer SSD-Festplatte. In unserem Fall haben wir ein Inateck 2.5 Hard Drive Enclosure FE2011 verwendet. Achten Sie darauf, ein Gehäuse mit einem UAS-kompatiblen Chip zu kaufen, insbesondere einen der folgenden: JMicron (JMS567 oder JMS578) oder ASMedia (ASM1153E).

In beiden Fällen sollten Sie vermeiden, minderwertige SSD-Festplatten zu kaufen, da sie eine Schlüsselkomponente Ihrer Nodes sind und die Leistung (und die Synchronisierungszeiten) drastisch beeinträchtigen können.

Beachten Sie, dass die Festplatte an einen USB 3.0-Anschluss (blau) angeschlossen sein muss.

## Images herunterladen und Installieren {#image-download-and-installation}

### 1. Laden Sie die Images der Ausführungs- und Konsensebene herunter {#1-download-execution-or-consensus-images}

<ButtonLink href="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">
  Image der Ausführungsebene herunterladen
</ButtonLink>

sha256 7fa9370d13857dd6abcc8fde637c7a9a7e3a66b307d5c28b0c0d29a09c73c55c

<ButtonLink href="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">
  Image der Konsensebene herunterladen
</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Das Image flashen {#2-flash-the-image}

Stecken Sie die microSD-Karte in Ihren Desktop/Laptop und laden Sie die Datei herunter (z. B. die Ausführungsebene):

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

Hinweis: Wenn Sie mit der Befehlszeile nicht vertraut sind oder unter Windows arbeiten, können Sie [Etcher](https://etcher.io) verwenden.

Öffnen Sie ein Terminal und überprüfen Sie den Namen Ihres MicroSD-Geräts:

```bash
sudo fdisk -l
```

Sie sollten ein Gerät namens "mmcblk0" oder "sdd" sehen. Entpacken und flashen des Images:

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. Setzen Sie die MicroSD-Karte in den Raspberry Pi 4 ein. Schließen ein Ethernet-Kabel und die USB-SSD-Festplatte an (stellen Sie sicher, dass Sie einen blauen Anschluss verwenden). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Das Gerät einschalten {#4-power-on-the-device}

Das Ubuntu-Betriebssystem wird in weniger als einer Minute hochgefahren, aber Sie müssen **etwa 10 Minuten warten**, damit das Skript die notwendigen Aufgaben durchführen kann, um das Gerät in einen Ethereum-Node zu verwandeln und den Raspberry neu zu starten.

Je nach Image, wird das wie folgt ausgeführt:

- Ausführungs-Client: Geth als Standard-Client für die Synchronisierung der Blockchain
- Konsens-Client: Prysm als Standard-Client für die Synchronisierung der Beacon Chain (Goerli-Testnet)

### 5. Anmelden {#5-log-in}

Sie können sich über SSH oder über die Konsole anmelden (wenn Sie einen Monitor und eine Tastatur angeschlossen haben).

```bash
User: ethereum
Password: ethereum
```

Bei der ersten Anmeldung werden Sie aufgefordert, das Passwort zu ändern, so dass Sie sich zweimal anmelden müssen.

### 6. Öffnen Sie den Port 30303 für Geth und 13000, wenn Sie eine Prysm-Beacon Chain verwenden. Wenn Sie nicht wissen, wie das geht, geben Sie in einer Suchmaschine "Portweiterleitung" gefolgt von Ihrem Routermodell ein. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Konsolenausgabe abrufen {#7-get-console-output}

Sie können sehen, was im Hintergrund passiert, indem Sie Folgendes eingeben:

```bash
sudo tail -f /var/log/syslog
```

**Herzlichen Glückwunsch. Sie betreiben nun einen vollständigen Ethereum-Node auf Ihrem Raspberry Pi 4.**

## Synchronisierung mit der Blockchain {#syncing-the-blockchain}

Jetzt müssen Sie warten, bis die Blockchain synchronisiert ist. Im Falle der Ausführungsebene wird dieser Vorgang einige Tage dauern, da er von verschiedenen Faktoren abhängig ist. Sie können mit bis zu 5-7 Tagen rechnen.

Wenn Sie die Konsensebene des Goerli-Testnets verwenden, können Sie mit einer Synchronisationszeit von 1-2 Tagen für die Beacon Chain rechnen. Denken Sie daran, dass Sie den Validator später einrichten müssen, um den Staking-Prozess zu starten. [So führen Sie den Konsensebenen-Validator aus](/developers/tutorials/run-node-raspberry-pi/#validator).

## Dashboards überwachen {#monitoring-dashboards}

Für diese erste Version haben wir 3 Überwachungs-Dashboards auf Grundlage von Prometheus [[5]](/developers/tutorials/run-node-raspberry-pi/#references)/Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) eingebaut, um den Node und die Daten der Clients (Geth und Besu) zu überwachen. Sie können über Ihren Webbrowser darauf zugreifen:

```bash
URL: http://your_raspberrypi_IP:3000
User: admin
Password: ethereum
```

## Clients wechseln {#switching-clients}

Alle Clients laufen als Systemdienst. Das ist wichtig, denn wenn ein Problem auftritt, wird das System den Prozess automatisch neu starten.

Die Beacon Chain von Geth und Prysm läuft standardmäßig (je nachdem, wie Sie synchronisieren, Ausführungsebene oder Konsensebene). Wenn Sie also zu einem anderen Client wechseln möchten (z. B. von Geth zu Nethermind), müssen Sie zuerst Geth anhalten und deaktivieren und dann den anderen Client aktivieren und starten:

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Befehle zum Aktivieren und Starten jedes Ausführungs-Clients:

```bash
sudo systemctl enable besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

Konsens-Clients:

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable lighthouse
```

## Parameter ändern {#changing-parameters}

Die Konfigurationsdateien der Clients befinden sich in dem Verzeichnis /etc/ethereum/. Sie können diese Dateien bearbeiten und den Systemdienst neu starten, damit die Änderungen wirksam werden. Die einzige Ausnahme ist Nethermind, das zusätzlich eine Mainnet-Konfigurationsdatei hat, die sich hier befindet:

```bash
/etc/nethermind/configs/mainnet.cfg
```

Die Daten der Blockchain-Clients werden wie folgt auf dem Ethereum-Home-Konto gespeichert (beachten Sie den Punkt vor dem Verzeichnisnamen):

### Ausführungsebene {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Konsensebene {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind und Hyperledger Besu {#nethermind-and-hyperledger-besu}

Diese beiden großartigen Ausführungs-Clients sind eine sehr gute Alternative zu Geth und Parity geworden. Je größer die Vielfalt im Netz, desto besser. Also probieren Sie sie aus und leisten Sie damit einen Beitrag zur Gesundheit des Netzwerks.

Beide Clients müssen noch weiter getestet werden. Experimentieren Sie also gerne damit und geben Sie uns Feedback dazu.

## So führen Sie den Konsensvalidator aus (Staking) {#validator}

Sobald die Görli-Testnet-Beacon-Chain synchronisiert ist, können Sie einen Validator in demselben Gerät ausführen. Sie müssen [diese Teilnahmeschritte](https://prylabs.net/participate) befolgen.

Beim ersten Mal ist es erforderlich, manuell ein Konto zu erstellen. Führen Sie dazu das Binärprogramm "validator" aus und legen Sie ein Passwort fest. Sobald Sie diesen Schritt abgeschlossen haben, können Sie das Passwort zu `/etc/ethereum/prysm-validator.conf` hinzufügen und den Validator als Systemdienst starten.

## Feedback erwünscht {#feedback-appreciated}

Wir haben viel Arbeit investiert, um den Raspberry Pi 4 als vollwertigen Ethereum-Node einzurichten, da wir wissen, dass die große Nutzerbasis dieses Geräts einen sehr positiven Einfluss auf das Netzwerk haben kann.

Beachten Sie, dass dies das erste Image auf Basis von Ubuntu 20.04 ist und es daher noch einige Fehler enthalten kann. Wenn Sie das feststellen, eröffnen Sie ein Thema auf [GitHub](https://github.com/diglos/ethereumonarm) oder kontaktieren Sie uns auf [Twitter](https://twitter.com/EthereumOnARM).

## Referenzen {#references}

1. [geth stürzt wiederholt mit SIGSEGV ab](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. https://github.com/openethereum/openethereum \* **Beachten Sie, dass OpenEthereum [veraltet](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) ist und nicht mehr gepflegt wird.** Verwenden Sie es mit Vorsicht und wechseln Sie lieber zu einer anderen Client-Implementierung.
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
