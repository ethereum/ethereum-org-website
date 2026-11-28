---
title: "Einen Ethereum-Knoten auf einem Raspberry Pi 5 ausführen"
description: "Flashen Sie Ihren Raspberry Pi 5, schließen Sie ein Ethernet-Kabel an, verbinden Sie die NVMe-Festplatte und schalten Sie das Gerät ein, um den Raspberry Pi 5 in einen vollständigen Ethereum-Knoten + Validator zu verwandeln"
author: "EthereumOnArm"
tags: ["Clients", "Ausführungsschicht", "Konsensschicht", "Knoten"]
lang: de
skill: intermediate
breadcrumb: Raspberry Pi-Knoten
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm ist ein benutzerdefiniertes Linux-Image, das einen Raspberry Pi in einen Ethereum-Knoten verwandeln kann.**

Um Ethereum on Arm zu verwenden, um einen Raspberry Pi in einen Ethereum-Knoten zu verwandeln, wird die folgende Hardware empfohlen:

- Raspberry Pi 5 mit 16 GB RAM
- Ein NVMe-HAT für den Raspberry Pi 5, um eine NVMe-Festplatte anzuschließen
- NVMe-SSD (M.2 2280), mindestens 4 TB. Vermeiden Sie Festplatten mit einem Phison-Controller, da diese bekannte Kompatibilitätsprobleme haben.
- MicroSD-Karte (mindestens 16 GB Class 10)
- Netzteil
- Ethernet-Kabel
- Portweiterleitung (siehe Clients für weitere Informationen)
- Ein Gehäuse mit Kühlkörper
- USB-Tastatur, Monitor und HDMI-Kabel (Micro-HDMI) (Optional)

Ethereum on Arm unterstützt auch andere ARM-Boards wie den NanoPC T6, Rock 5B und Orange Pi 5 Plus. Diese Boards bieten native NVMe-Unterstützung, weshalb das Team von Ethereum on Arm sie gegenüber dem Raspberry Pi 5 empfiehlt, wenn Sie neue Hardware kaufen. Weitere Details finden Sie in der [Liste der empfohlenen Hardware](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html). Der Rest dieses Tutorials ist für alle unterstützten Boards gleich, mit Ausnahme der Image-Datei, die Sie herunterladen.

## Warum Ethereum auf ARM ausführen? {#why-run-ethereum-on-arm}

ARM-Boards sind sehr erschwingliche, flexible und kleine Computer. Sie sind eine gute Wahl für den Betrieb von Ethereum-Knoten, da sie günstig in der Anschaffung sind und so konfiguriert werden können, dass sich all ihre Ressourcen nur auf den Knoten konzentrieren. Das macht sie effizient, sie verbrauchen wenig Strom und sind physisch klein, sodass sie unauffällig in jedes Zuhause passen. Es ist auch sehr einfach, Knoten in Betrieb zu nehmen, da die MicroSD-Karte des Raspberry Pi einfach mit einem vorgefertigten Image geflasht werden kann, ohne dass Software heruntergeladen oder kompiliert werden muss.

## Wie funktioniert es? {#how-does-it-work}

Die Speicherkarte des Raspberry Pi wird mit einem vorgefertigten Image geflasht. Dieses Image enthält alles, was zum Ausführen eines Ethereum-Knotens erforderlich ist. Mit einer geflashten Karte muss der Benutzer den Raspberry Pi nur noch einschalten. Alle Prozesse, die zum Ausführen des Knotens erforderlich sind, werden automatisch gestartet. Dies funktioniert, weil die Speicherkarte ein Linux-basiertes Betriebssystem (OS) enthält, auf dem automatisch Prozesse auf Systemebene ausgeführt werden, die das Gerät in einen Ethereum-Knoten verwandeln.

Ethereum on Arm-Images basieren auf einer 64-Bit-Linux-Distribution, die für die Ausführung eines Ethereum-Knotens optimiert ist, und enthalten vorgefertigte Ethereum-Clients.

**Die Images übernehmen alle notwendigen Schritte**, von der Einrichtung der Umgebung und der Formatierung der NVMe-Festplatte bis hin zur Installation der Ethereum-Software.

## Hinweis zu Ausführungs- und Konsens-Clients {#note-on-execution-and-consensus-clients}

Das Ethereum on Arm-Image enthält vorgefertigte Ausführungs- und Konsens-Clients als Dienste. Ein Ethereum-Knoten erfordert, dass beide Clients synchronisiert sind und ausgeführt werden. Sie müssen lediglich das Image herunterladen und flashen und dann die Dienste starten. Das Image ist mit mehreren Ausführungsclients (wie Geth, Nethermind, Besu, Erigon und Reth) und Konsens-Clients (wie Lighthouse, Prysm, Teku, Nimbus und Lodestar) vorinstalliert. Die aktuelle Liste finden Sie in der [Dokumentation zu Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html).

Sie sollten jeweils einen zur Ausführung auswählen – alle Ausführungsclients sind mit allen Konsens-Clients kompatibel. Dieses Tutorial verwendet Geth und Lighthouse.

## Herunterladen des Images {#downloading-the-image}

Das Ethereum on Arm-Image ist ein „Plug-and-Play“-Image, das sowohl den Ausführungs- als auch den Konsens-Client automatisch installiert und einrichtet und sie so konfiguriert, dass sie miteinander kommunizieren und sich mit dem Ethereum-Netzwerk verbinden. Der Benutzer muss lediglich deren Prozesse mit einem einfachen Befehl starten.

Laden Sie das neueste Image für Ihr Board von der [Download-Seite von Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads) herunter. Auf der Download-Seite ist auch die SHA256-Prüfsumme jedes Images aufgeführt. Überprüfen Sie die heruntergeladene Datei damit:

```sh
# Aus dem Verzeichnis, das das heruntergeladene Image enthält
sha256sum ethonarm_rpi5_<version>.img.zip
# Vergleiche die Ausgabe mit der Prüfsumme auf der Download-Seite
```

## Flashen der MicroSD {#flashing-the-microsd}

Die MicroSD-Karte, die für den Raspberry Pi verwendet wird, sollte zuerst in einen Desktop-PC oder Laptop eingelegt werden, damit sie geflasht werden kann. Anschließend flashen die folgenden Terminalbefehle das heruntergeladene Image auf die SD-Karte:

```shell
# Überprüfe den Namen der MicroSD-Karte
sudo fdisk -l

>> sdxxx
```

Es ist sehr wichtig, den Namen richtig anzugeben, da der nächste Befehl `dd` enthält, was den vorhandenen Inhalt der Karte vollständig löscht, bevor das Image darauf übertragen wird. Um fortzufahren, navigieren Sie in das Verzeichnis, das das gezippte Image enthält:

```shell
# Entpacke und flashe das Image
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Die Karte ist nun geflasht und kann in den Raspberry Pi eingesetzt werden.

## Den Knoten starten {#start-the-node}

Wenn die SD-Karte in den Raspberry Pi eingesetzt ist, schließen Sie das Ethernet-Kabel und die NVMe-Festplatte an und schalten Sie den Strom ein. Das Betriebssystem fährt hoch und beginnt automatisch mit der Ausführung der vorkonfigurierten Aufgaben, die den Raspberry Pi in einen Ethereum-Knoten verwandeln, einschließlich der Formatierung der NVMe-Festplatte und der Installation der Client-Software. Dies dauert wahrscheinlich 10-15 Minuten, und das Board startet automatisch neu, wenn es fertig ist. Unterbrechen Sie in dieser Zeit nicht die Stromversorgung.

Sobald alles installiert und konfiguriert ist, melden Sie sich über eine SSH-Verbindung oder direkt über das Terminal am Gerät an, falls ein Monitor und eine Tastatur an das Board angeschlossen sind. Verwenden Sie das Konto `ethereum` zur Anmeldung, da dieses über die erforderlichen Berechtigungen zum Starten des Knotens verfügt.

```shell
User: ethereum
Password: ethereum
```

Sie werden bei Ihrer ersten Anmeldung aufgefordert, das Standardpasswort zu ändern. Tun Sie dies, da sich sonst jeder, der Ihren Knoten erreichen kann, mit dem Standardpasswort anmelden könnte. Die System-Firewall ist standardmäßig deaktiviert. Wenn Ihr Knoten also eine öffentliche IP-Adresse hat, lesen Sie den [Sicherheitsleitfaden von Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html), um sie zu aktivieren.

Starten Sie zuerst den Konsens-Client. Öffnen Sie Port 9000 (TCP und UDP) an Ihrem Router, damit Lighthouse Peers finden und sich mit ihnen verbinden kann. Aktivieren und starten Sie dann den Lighthouse-Dienst, damit er auch nach einem Neustart wieder startet:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Überprüfen Sie den Client anhand der Logs:

```sh
sudo journalctl -u lighthouse-beacon -f
```

Starten Sie als Nächstes den Ausführungsclient. Öffnen Sie Port 30303 (TCP und UDP) an Ihrem Router, damit Geth Peers finden und sich mit ihnen verbinden kann. Aktivieren und starten Sie dann den Geth-Dienst:

```sh
sudo systemctl enable --now geth
```

Sie können bestätigen, dass er ausgeführt wird, indem Sie die Logs überprüfen:

```sh
sudo journalctl -u geth -f
```

Beachten Sie, dass der Konsens-Client in wenigen Minuten synchronisiert ist, da er Checkpoint-Synchronisierung verwendet. Der Ausführungsclient benötigt länger – möglicherweise mehrere Stunden. Beide Clients laufen gleichzeitig: Der Konsens-Client teilt dem Ausführungsclient mit, welcher Block die Spitze der Chain ist, und der Ausführungsclient lädt die Blöcke bis dorthin herunter und verifiziert sie.

Wenn die Geth- und Lighthouse-Dienste ausgeführt werden und synchronisiert sind, ist Ihr Raspberry Pi nun ein Ethereum-Knoten! Am häufigsten interagiert man mit dem Ethereum-Netzwerk über die JavaScript-Konsole von Geth, die an den Geth-Client auf Port 8545 angehängt werden kann. Es ist auch möglich, als JSON-Objekte formatierte Befehle mit einem Request-Tool wie Curl zu senden. Weitere Informationen finden Sie in der [Geth-Dokumentation](https://geth.ethereum.org/).

Das Image enthält auch ein Grafana-Dashboard, das fortgeschrittenere Benutzer verwenden können, um den Zustand ihres Knotens zu überwachen, indem sie in einem Browser zu `ipaddress:3000` navigieren.

## Validatoren {#validators}

Ein Validator kann optional auch zum Konsens-Client hinzugefügt werden. Die Validator-Software ermöglicht es Ihrem Knoten, aktiv am Konsens teilzunehmen, und bietet dem Netzwerk kryptökonomische Sicherheit. Für diese Arbeit werden Sie in ETH belohnt. Um einen Validator auszuführen, müssen Sie zunächst über 32 ETH verfügen, die in den Einzahlungsvertrag eingezahlt werden müssen. Die Einzahlung kann vorgenommen werden, indem Sie der Schritt-für-Schritt-Anleitung auf dem [Launchpad](https://launchpad.ethereum.org/) folgen. Tun Sie dies auf einem Desktop-PC/Laptop, aber generieren Sie keine Schlüssel – dies kann direkt auf dem Raspberry Pi erfolgen.

Das Tool [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) generiert Validator-Schlüssel. Aktuelle Images enthalten es; wenn Sie ein älteres Image ausführen, installieren Sie es zuerst. Generieren Sie dann die Einzahlungsschlüssel und ersetzen Sie `<YOUR_ETH_ADDRESS>` durch die Adresse, die Ihre Abhebungen erhalten soll:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Oder laden Sie das [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) herunter, um es auf einem Air-Gapped-Rechner auszuführen, und führen Sie dort den Befehl `deposit new-mnemonic` aus)

Bewahren Sie die mnemonische Phrase sicher auf! Der obige Befehl hat zwei Dateien im Verzeichnis `validator_keys` generiert: die Validator-Schlüssel und eine Einzahlungsdatendatei. Die Einzahlungsdaten müssen in das Launchpad hochgeladen werden, daher müssen sie vom Raspberry Pi auf den Desktop-PC/Laptop kopiert werden. Dies kann über eine SSH-Verbindung oder eine andere Kopieren/Einfügen-Methode erfolgen.

Sobald die Einzahlungsdatendatei auf dem Computer verfügbar ist, auf dem das Launchpad ausgeführt wird, kann sie per Drag-and-Drop auf `+` auf dem Launchpad-Bildschirm gezogen werden. Befolgen Sie die Anweisungen auf dem Bildschirm, um eine Transaktion an den Einzahlungsvertrag zu senden.

Zurück auf dem Raspberry Pi kann ein Validator gestartet werden. Dies erfordert den Import der Validator-Schlüssel, das Festlegen der Adresse zum Sammeln von Belohnungen und das anschließende Starten des vorkonfigurierten Validator-Prozesses. Das folgende Beispiel gilt für Lighthouse – Anweisungen für andere Konsens-Clients finden Sie in den [Ethereum on Arm-Dokumenten](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html):

```shell
# Importiere die Validator-Schlüssel
lighthouse account validator import --directory=/home/ethereum/validator_keys

# Setze die Belohnungs-Adresse (ersetze <YOUR_ETH_ADDRESS> durch deine Adresse)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# Starte den Validator
sudo systemctl enable --now lighthouse-validator
```

Herzlichen Glückwunsch, Sie haben nun einen vollständigen Ethereum-Knoten und Validator, der auf einem Raspberry Pi läuft!

## Weitere Details {#more-details}

Diese Seite gab einen Überblick darüber, wie man einen Geth-Lighthouse-Knoten und Validator mit einem Raspberry Pi einrichtet. Detailliertere Anweisungen sind auf der [Ethereum-on-Arm-Website](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) verfügbar.

## Feedback erwünscht {#feedback-appreciated}

Wir wissen, dass der Raspberry Pi eine riesige Benutzerbasis hat, die sich sehr positiv auf die Gesundheit des Ethereum-Netzwerks auswirken könnte.
Bitte vertiefen Sie sich in die Details dieses Tutorials, versuchen Sie, es auf Testnets auszuführen, sehen Sie sich das [Ethereum on Arm GitHub](https://github.com/EOA-Blockchain-Labs/ethereumonarm) an, geben Sie Feedback, erstellen Sie Issues und Pull Requests und helfen Sie dabei, die Technologie und Dokumentation voranzutreiben!

## Referenzen {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
