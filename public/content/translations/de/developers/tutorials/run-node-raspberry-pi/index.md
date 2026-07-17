---
title: "Einen Ethereum-Knoten auf einem Raspberry Pi 4 ausführen"
description: "Flashe deinen Raspberry Pi 4, schließe ein Ethernet-Kabel an, verbinde die SSD-Festplatte und schalte das Gerät ein, um den Raspberry Pi 4 in einen vollständigen Ethereum-Knoten + Validator zu verwandeln"
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

Um Ethereum on Arm zu verwenden, um einen Raspberry Pi in einen Ethereum-Knoten zu verwandeln, wird folgende Hardware empfohlen:

- Raspberry 4 (Modell B 8GB), Odroid M1 oder Rock 5B (8GB/16GB RAM) Board
- MicroSD-Karte (mindestens 16 GB Class 10)
- Mindestens 2 TB SSD USB 3.0-Festplatte oder eine SSD mit einem USB-zu-SATA-Gehäuse.
- Netzteil
- Ethernet-Kabel
- Portweiterleitung (siehe Clients für weitere Informationen)
- Ein Gehäuse mit Kühlkörper und Lüfter
- USB-Tastatur, Monitor und HDMI-Kabel (Micro-HDMI) (Optional)

## Warum Ethereum auf ARM ausführen? {#why-run-ethereum-on-arm}

ARM-Boards sind sehr erschwingliche, flexible und kleine Computer. Sie sind eine gute Wahl für den Betrieb von Ethereum-Knoten, da sie günstig in der Anschaffung sind und so konfiguriert werden können, dass sich all ihre Ressourcen nur auf den Knoten konzentrieren. Das macht sie effizient, sie verbrauchen wenig Strom und sind physisch klein, sodass sie unauffällig in jedes Zuhause passen. Es ist auch sehr einfach, Knoten in Betrieb zu nehmen, da die MicroSD-Karte des Raspberry Pi einfach mit einem vorgefertigten Image geflasht werden kann, ohne dass Software heruntergeladen oder kompiliert werden muss.

## Wie funktioniert das? {#how-does-it-work}

Die Speicherkarte des Raspberry Pi wird mit einem vorgefertigten Image geflasht. Dieses Image enthält alles, was für den Betrieb eines Ethereum-Knotens benötigt wird. Mit einer geflashten Karte muss der Benutzer den Raspberry Pi nur noch einschalten. Alle Prozesse, die zum Ausführen des Knotens erforderlich sind, werden automatisch gestartet. Dies funktioniert, weil die Speicherkarte ein Linux-basiertes Betriebssystem (OS) enthält, auf dem automatisch Prozesse auf Systemebene ausgeführt werden, die das Gerät in einen Ethereum-Knoten verwandeln.

Ethereum kann nicht mit dem beliebten Raspberry Pi Linux-Betriebssystem „Raspbian“ ausgeführt werden, da Raspbian immer noch eine 32-Bit-Architektur verwendet, was bei Ethereum-Benutzern zu Speicherproblemen führt und Konsens-Clients keine 32-Bit-Binärdateien unterstützen. Um dies zu überwinden, ist das Team von Ethereum on Arm auf ein natives 64-Bit-Betriebssystem namens „Armbian“ umgestiegen.

**Images kümmern sich um alle notwendigen Schritte**, von der Einrichtung der Umgebung und der Formatierung der SSD-Festplatte über die Installation und Ausführung der Ethereum-Software bis hin zum Starten der Blockchain-Synchronisierung.

## Hinweis zu Ausführungs- und Konsens-Clients {#note-on-execution-and-consensus-clients}

Das Image von Ethereum on Arm enthält vorgefertigte Ausführungs- und Konsens-Clients als Dienste. Ein Ethereum-Knoten erfordert, dass beide Clients synchronisiert sind und ausgeführt werden. Du musst lediglich das Image herunterladen und flashen und dann die Dienste starten. Das Image ist mit den folgenden Ausführungsclients vorinstalliert:

- Geth
- Nethermind
- Besu

und den folgenden Konsens-Clients:

- Lighthouse
- Nimbus
- Prysm
- Teku

Du solltest jeweils einen zur Ausführung auswählen – alle Ausführungsclients sind mit allen Konsens-Clients kompatibel. Wenn du nicht explizit einen Client auswählst, greift der Knoten auf seine Standardeinstellungen zurück – Geth und Lighthouse – und führt diese automatisch aus, wenn das Board eingeschaltet wird. Du musst Port 30303 an deinem Router öffnen, damit Geth Peers finden und sich mit ihnen verbinden kann.

## Herunterladen des Images {#downloading-the-image}

Das Raspberry Pi 4 Ethereum-Image ist ein „Plug-and-Play“-Image, das automatisch sowohl den Ausführungs- als auch den Konsens-Client installiert und einrichtet und sie so konfiguriert, dass sie miteinander kommunizieren und sich mit dem Ethereum-Netzwerk verbinden. Der Benutzer muss lediglich deren Prozesse mit einem einfachen Befehl starten.

Lade das Raspberry Pi-Image von [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) herunter und überprüfe den SHA256-Hash:

```sh
# Aus dem Verzeichnis, das das heruntergeladene Image enthält
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash sollte ausgeben: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Beachte, dass Images für Rock 5B- und Odroid M1-Boards auf der [Download-Seite](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) von Ethereum-on-Arm verfügbar sind.

## Flashen der MicroSD {#flashing-the-microsd}

Die MicroSD-Karte, die für den Raspberry Pi verwendet wird, sollte zuerst in einen Desktop-PC oder Laptop eingelegt werden, damit sie geflasht werden kann. Anschließend flashen die folgenden Terminalbefehle das heruntergeladene Image auf die SD-Karte:

```shell
# Namen der MicroSD-Karte überprüfen
sudo fdisk -l

>> sdxxx
```

Es ist sehr wichtig, den Namen richtig anzugeben, da der nächste Befehl `dd` enthält, was den vorhandenen Inhalt der Karte vollständig löscht, bevor das Image darauf übertragen wird. Um fortzufahren, navigiere zu dem Verzeichnis, das das gezippte Image enthält:

```shell
# Image entpacken und flashen
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Die Karte ist nun geflasht und kann in den Raspberry Pi eingesetzt werden.

## Den Knoten starten {#start-the-node}

Wenn die SD-Karte in den Raspberry Pi eingesetzt ist, schließe das Ethernet-Kabel und die SSD an und schalte dann den Strom ein. Das Betriebssystem fährt hoch und beginnt automatisch mit der Ausführung der vorkonfigurierten Aufgaben, die den Raspberry Pi in einen Ethereum-Knoten verwandeln, einschließlich der Installation und Kompilierung der Client-Software. Dies wird wahrscheinlich 10-15 Minuten dauern.

Sobald alles installiert und konfiguriert ist, melde dich über eine SSH-Verbindung oder direkt über das Terminal am Gerät an, falls ein Monitor und eine Tastatur an das Board angeschlossen sind. Verwende das Konto `ethereum` zur Anmeldung, da dieses über die erforderlichen Berechtigungen zum Starten des Knotens verfügt.

```shell
User: ethereum
Password: ethereum
```

Der Standard-Ausführungsclient, Geth, wird automatisch gestartet. Du kannst dies bestätigen, indem du die Logs mit dem folgenden Terminalbefehl überprüfst:

```sh
sudo journalctl -u geth -f
```

Der Konsens-Client muss explizit gestartet werden. Öffne dazu zunächst Port 9000 an deinem Router, damit Lighthouse Peers finden und sich mit ihnen verbinden kann. Aktiviere und starte dann den Lighthouse-Dienst:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Überprüfe den Client anhand der Logs:

```sh
sudo journalctl -u lighthouse-beacon
```

Beachte, dass der Konsens-Client in wenigen Minuten synchronisiert ist, da er Checkpoint-Synchronisierung verwendet. Der Ausführungsclient benötigt länger – möglicherweise mehrere Stunden – und startet erst, wenn der Konsens-Client die Synchronisierung bereits abgeschlossen hat (dies liegt daran, dass der Ausführungsclient ein Ziel für die Synchronisierung benötigt, welches der synchronisierte Konsens-Client bereitstellt).

Wenn die Geth- und Lighthouse-Dienste ausgeführt werden und synchronisiert sind, ist dein Raspberry Pi nun ein Ethereum-Knoten! Am häufigsten interagiert man mit dem Ethereum-Netzwerk über die JavaScript-Konsole von Geth, die an den Geth-Client auf Port 8545 angehängt werden kann. Es ist auch möglich, als JSON-Objekte formatierte Befehle mit einem Request-Tool wie Curl zu übermitteln. Weitere Informationen findest du in der [Geth-Dokumentation](https://geth.ethereum.org/).

Geth ist so vorkonfiguriert, dass es Metriken an ein Grafana-Dashboard meldet, das im Browser angezeigt werden kann. Fortgeschrittenere Benutzer möchten diese Funktion möglicherweise nutzen, um den Zustand ihres Knotens zu überwachen, indem sie zu `ipaddress:3000` navigieren und `user: admin` sowie `passwd: ethereum` übergeben.

## Validatoren {#validators}

Optional kann dem Konsens-Client auch ein Validator hinzugefügt werden. Die Validator-Software ermöglicht es deinem Knoten, aktiv am Konsens teilzunehmen, und bietet dem Netzwerk kryptoökonomische Sicherheit. Für diese Arbeit wirst du in ETH belohnt. Um einen Validator auszuführen, musst du zunächst über 32 ETH verfügen, die in den Einzahlungsvertrag eingezahlt werden müssen. Die Einzahlung kann vorgenommen werden, indem du der Schritt-für-Schritt-Anleitung auf dem [Launchpad](https://launchpad.ethereum.org/) folgst. Führe dies auf einem Desktop-PC/Laptop durch, aber generiere keine Schlüssel – dies kann direkt auf dem Raspberry Pi erfolgen.

Öffne ein Terminal auf dem Raspberry Pi und führe den folgenden Befehl aus, um die Einzahlungsschlüssel zu generieren:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Oder lade die [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) herunter, um sie auf einem isolierten Rechner auszuführen, und führe den Befehl `deposit new-mnemnonic` aus)

Bewahre die mnemonische Phrase sicher auf! Der obige Befehl hat zwei Dateien im Schlüsselspeicher des Knotens generiert: die Validator-Schlüssel und eine Einzahlungsdatendatei. Die Einzahlungsdaten müssen in das Launchpad hochgeladen werden, daher müssen sie vom Raspberry Pi auf den Desktop-PC/Laptop kopiert werden. Dies kann über eine SSH-Verbindung oder eine andere Kopieren/Einfügen-Methode erfolgen.

Sobald die Einzahlungsdatendatei auf dem Computer verfügbar ist, auf dem das Launchpad ausgeführt wird, kann sie per Drag-and-Drop auf `+` auf dem Launchpad-Bildschirm gezogen werden. Folge den Anweisungen auf dem Bildschirm, um eine Transaktion an den Einzahlungsvertrag zu senden.

Zurück auf dem Raspberry Pi kann ein Validator gestartet werden. Dies erfordert den Import der Validator-Schlüssel, das Festlegen der Adresse zum Sammeln von Belohnungen und das anschließende Starten des vorkonfigurierten Validator-Prozesses. Das folgende Beispiel gilt für Lighthouse – Anweisungen für andere Konsens-Clients sind in den [Ethereum on Arm-Dokumenten](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) verfügbar:

```shell
# Validator-Schlüssel importieren
lighthouse account validator import --directory=/home/ethereum/validator_keys

# Belohnungsadresse festlegen
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# Validator starten
sudo systemctl start lighthouse-validator
```

Herzlichen Glückwunsch, du hast nun einen vollständigen Ethereum-Knoten und Validator auf einem Raspberry Pi laufen!

## Weitere Details {#more-details}

Diese Seite gab einen Überblick darüber, wie man einen Geth-Lighthouse-Knoten und Validator mit einem Raspberry Pi einrichtet. Detailliertere Anweisungen sind auf der [Ethereum-on-Arm-Website](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) verfügbar.

## Feedback erwünscht {#feedback-appreciated}

Wir wissen, dass der Raspberry Pi eine riesige Benutzerbasis hat, die sich sehr positiv auf die Gesundheit des Ethereum-Netzwerks auswirken könnte.
Bitte vertiefe dich in die Details dieses Tutorials, versuche es auf Testnetzen auszuführen, sieh dir das Ethereum on Arm GitHub an, gib Feedback, erstelle Issues und Pull Requests und hilf dabei, die Technologie und Dokumentation voranzutreiben!

## Referenzen {#references}

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org