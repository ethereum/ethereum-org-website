---
title: Betreibe einen Ethereum-Node auf einem Raspberry Pi 4
description: "Flashe deinen Raspberry Pi 4, stecke ein Ethernet-Kabel ein, schließe die SSD-Festplatte an und schalte das Gerät ein, um den Raspberry Pi 4 in einen vollwertigen Ethereum-Node + Validator zu verwandeln"
author: "EthereumOnArm"
tags:
  [
    "Clients",
    "Ausführungsebene",
    "Konsensebene",
    "Nodes"
  ]
lang: de
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm ist ein benutzerdefiniertes Linux-Image, das einen Raspberry Pi in einen Ethereum-Node verwandeln kann.**

Um Ethereum on Arm zu verwenden, um einen Raspberry Pi in einen Ethereum-Node zu verwandeln, wird die folgende Hardware empfohlen:

- Raspberry 4 (Modell B 8 GB), Odroid M1 oder Rock 5B (8 GB/16 GB RAM) Platine
- MicroSD-Karte (mindestens 16 GB, Klasse 10)
- Mindestens 2 TB große SSD als USB-3.0-Laufwerk oder eine SSD in einem USB-zu-SATA-Gehäuse.
- Stromversorgung
- Ethernet-Kabel
- Portweiterleitung (siehe Clients für weitere Informationen)
- Ein Gehäuse mit Kühlkörper und Lüfter
- USB-Tastatur, Monitor und HDMI-Kabel (Micro-HDMI) (optional)

## Warum Ethereum auf ARM betreiben? {#why-run-ethereum-on-arm}

ARM-Platinen sind sehr preisgünstige, flexible, kleine Computer. Sie sind eine gute Wahl für den Betrieb von Ethereum-Nodes, weil sie günstig zu erwerben sind, so konfiguriert werden können, dass alle ihre Ressourcen nur auf den Node ausgerichtet sind, was sie effizient macht, sie wenig Strom verbrauchen und physisch klein sind, sodass sie unauffällig in jedes Zuhause passen. Es ist auch sehr einfach, Nodes zu starten, da die MicroSD-Karte des Raspberry Pi einfach mit einem vorgefertigten Image geflasht werden kann, ohne dass Software heruntergeladen oder erstellt werden muss.

## Wie funktioniert das? {#how-does-it-work}

Die Speicherkarte des Raspberry Pi wird mit einem vorgefertigten Image geflasht. Dieses Image enthält alles, was zum Betreiben eines Ethereum-Nodes benötigt wird. Mit einer geflashten Karte musst du nur noch den Raspberry Pi einschalten. Alle Prozesse, die für den Betrieb des Nodes erforderlich sind, werden automatisch gestartet. Das funktioniert, weil die Speicherkarte ein Linux-basiertes Betriebssystem (OS) enthält, auf dem automatisch Prozesse auf Systemebene ausgeführt werden, die das Gerät in einen Ethereum-Node verwandeln.

Ethereum kann nicht mit dem beliebten Raspberry Pi Linux-Betriebssystem „Raspbian“ betrieben werden, da Raspbian immer noch eine 32-Bit-Architektur verwendet, was dazu führt, dass Ethereum-Benutzer auf Speicherprobleme stoßen und Konsens-Clients keine 32-Bit-Binärdateien unterstützen. Um dies zu überwinden, ist das Ethereum-on-Arm-Team auf ein natives 64-Bit-Betriebssystem namens „Armbian“ umgestiegen.

**Images übernehmen alle notwendigen Schritte, von der Einrichtung der Umgebung und der Formatierung der SSD-Platte über die Installation und Ausführung der Ethereum-Software bis hin zum Start der Blockchain-Synchronisation.**

## Hinweis zu Ausführungs- und Konsens-Clients {#note-on-execution-and-consensus-clients}

Das Ethereum on Arm-Image enthält vorgefertigte Ausführungs- und Konsens-Clients als Dienste. Ein Ethereum-Node erfordert, dass beide Clients synchronisiert sind und laufen. Du musst nur das Image herunterladen, es flashen und dann die Dienste starten. Das Image ist mit den folgenden Ausführungs-Clients vorinstalliert:

- Geth
- Nethermind
- Besu

und die folgenden Konsens-Clients:

- Lighthouse
- Nimbus
- Prysm
- Teku

Du solltest einen von jedem zum Ausführen auswählen - alle Ausführungs-Clients sind mit allen Konsens-Clients kompatibel. Wenn du nicht explizit einen Client auswählst, greift der Node auf seine Standardeinstellungen - Geth und Lighthouse - zurück und führt sie automatisch aus, wenn die Platine eingeschaltet wird. Du musst Port 30303 auf deinem Router öffnen, damit Geth Peers finden und sich mit ihnen verbinden kann.

## Herunterladen des Images {#downloading-the-image}

Das Raspberry Pi 4 Ethereum-Image ist ein „Plug-and-Play“-Image, das automatisch sowohl die Ausführungs- als auch die Konsens-Clients installiert und einrichtet, sie so konfiguriert, dass sie miteinander kommunizieren und sich mit dem Ethereum-Netzwerk verbinden. Alles, was du tun musst, ist, deine Prozesse mit einem einfachen Befehl zu starten.

Lade das Raspberry Pi-Image von [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) herunter und überprüfe den SHA256-Hash:

```sh
# Aus dem Verzeichnis, das das heruntergeladene Image enthält
shasum -a 256 ethonarm_22.04.00.img.zip
# Der Hash sollte Folgendes ausgeben: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Beachte, dass Images für Rock 5B- und Odroid M1-Platinen auf der Ethereum-on-Arm-[Download-Seite](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) verfügbar sind.

## Flashen der MicroSD {#flashing-the-microsd}

Die MicroSD-Karte, die für den Raspberry Pi verwendet werden soll, sollte zuerst in einen Desktop oder Laptop eingelegt werden, damit sie geflasht werden kann. Mit den folgenden Terminalbefehlen wird das heruntergeladene Image auf die SD-Karte geflasht:

```shell
# Namen der MicroSD-Karte überprüfen
sudo fdisk -l

>> sdxxx
```

Es ist sehr wichtig, den richtigen Namen zu verwenden, da der nächste Befehl `dd` enthält, der den gesamten Inhalt der Karte löscht, bevor das Image darauf geschrieben wird. Um fortzufahren, navigiere zu dem Verzeichnis, das das gezippte Image enthält:

```shell
# Image entpacken und flashen
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Die Karte ist nun geflasht und kann in den Raspberry Pi eingelegt werden.

## Den Node starten {#start-the-node}

Stecke die SD-Karte in den Raspberry Pi, schließe das Ethernet-Kabel und die SSD an und schalte das Gerät ein. Das Betriebssystem wird hochfahren und automatisch damit beginnen, die vorkonfigurierten Aufgaben auszuführen, die den Raspberry Pi in einen Ethereum-Node verwandeln, einschließlich der Installation und Erstellung der Client-Software. Dies wird wahrscheinlich 10-15 Minuten dauern.

Sobald alles installiert und konfiguriert ist, melde dich über eine SSH-Verbindung am Gerät an oder verwende das Terminal direkt, wenn ein Monitor und eine Tastatur an die Platine angeschlossen sind. Verwende das `ethereum`-Konto zum Anmelden, da dieses die erforderlichen Berechtigungen zum Starten des Nodes hat.

```shell
Benutzer: ethereum
Passwort: ethereum
```

Der Standard-Ausführungs-Client, Geth, startet automatisch. Du kannst dies bestätigen, indem du die Protokolle mit dem folgenden Terminal-Befehl überprüfst:

```sh
sudo journalctl -u geth -f
```

Der Konsens-Client muss explizit gestartet werden. Öffne dazu zuerst Port 9000 auf deinem Router, damit Lighthouse Peers finden und eine Verbindung zu ihnen herstellen kann. Aktivieren und starten Sie dann den Lighthouse-Dienst:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Überprüfe den Client anhand der Protokolle:

```sh
sudo journalctl -u lighthouse-beacon
```

Beachte, dass der Konsens-Client in wenigen Minuten synchronisiert wird, da er die Checkpoint-Synchronisierung verwendet. Der Ausführungs-Client wird länger brauchen – möglicherweise mehrere Stunden – und er startet erst, wenn der Konsens-Client bereits synchronisiert ist (das liegt daran, dass der Ausführungs-Client ein Ziel für die Synchronisierung benötigt, das der synchronisierte Konsens-Client bereitstellt).

Wenn die Dienste Geth und Lighthouse laufen und synchronisiert sind, ist dein Raspberry Pi jetzt ein Ethereum-Node! Am häufigsten wird mit dem Ethereum-Netzwerk über die Javascript-Konsole von Geth interagiert, die an den Geth-Client an Port 8545 angehängt werden kann. Es ist auch möglich, Befehle, die als JSON-Objekte formatiert sind, mit einem Anfrage-Tool wie Curl zu übermitteln. Mehr dazu findest du in der [Geth-Dokumentation](https://geth.ethereum.org/).

Geth ist so vorkonfiguriert, dass es Metriken an ein Grafana-Dashboard meldet, das im Browser angezeigt werden kann. Als fortgeschrittener Benutzer möchtest du diese Funktion möglicherweise nutzen, um den Zustand deines Nodes zu überwachen, indem du zu `ipaddress:3000` navigierst und `user: admin` sowie `passwd: ethereum` eingibst.

## Validatoren {#validators}

Optional kann auch ein Validator zum Konsens-Client hinzugefügt werden. Die Validator-Software ermöglicht es deinem Node, aktiv am Konsens teilzunehmen und versorgt das Netzwerk mit kryptoökonomischer Sicherheit. Für diese Arbeit wirst du in ETH belohnt. Um einen Validator zu betreiben, musst du zunächst 32 ETH besitzen, die in den Einzahlungsvertrag eingezahlt werden müssen. Die Einzahlung kann erfolgen, indem du der Schritt-für-Schritt-Anleitung auf dem [Launchpad](https://launchpad.ethereum.org/) folgst. Führe dies auf einem Desktop/Laptop durch, aber generiere keine Schlüssel – dies kann direkt auf dem Raspberry Pi erledigt werden.

Öffne ein Terminal auf dem Raspberry Pi und führe den folgenden Befehl aus, um die Einzahlungsschlüssel zu generieren:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Oder lade das [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) herunter, um es auf einer Air-Gapped-Maschine auszuführen, und führe den Befehl `deposit new-mnemnonic` aus)

Bewahre die mnemonische Phrase sicher auf! Der obige Befehl hat zwei Dateien im Keystore des Nodes generiert: die Validator-Schlüssel und eine Einzahlungsdatendatei. Die Einzahlungsdaten müssen auf das Launchpad hochgeladen werden, daher müssen sie vom Raspberry Pi auf den Desktop/Laptop kopiert werden. Dies kann über eine SSH-Verbindung oder eine andere Kopieren-und-Einfügen-Methode erfolgen.

Sobald die Einzahlungsdatendatei auf dem Computer verfügbar ist, auf dem das Launchpad läuft, kann sie auf das `+` auf dem Launchpad-Bildschirm gezogen und abgelegt werden. Folge den Anweisungen auf dem Bildschirm, um eine Transaktion an den Einzahlungsvertrag zu senden.

Zurück auf dem Raspberry Pi kann ein Validator gestartet werden. Dies erfordert den Import der Validator-Schlüssel, das Festlegen der Adresse zum Sammeln von Belohnungen und dann das Starten des vorkonfigurierten Validator-Prozesses. Das folgende Beispiel gilt für Lighthouse – Anleitungen für andere Konsens-Clients sind in den [Ethereum-on-Arm-Dokumenten](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) verfügbar:

```shell
# Validator-Schlüssel importieren
lighthouse account validator import --directory=/home/ethereum/validator_keys

# Belohnungsadresse festlegen
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# Validator starten
sudo systemctl start lighthouse-validator
```

Herzlichen Glückwunsch, du hast jetzt einen vollständigen Ethereum-Node und Validator, der auf einem Raspberry Pi läuft!

## Weitere Details {#more-details}

Diese Seite gab einen Überblick darüber, wie man einen Geth-Lighthouse-Node und -Validator mit einem Raspberry Pi einrichtet. Detailliertere Anweisungen sind auf der [Ethereum-on-Arm-Webseite](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html) verfügbar.

## Feedback erwünscht {#feedback-appreciated}

Wir wissen, dass der Raspberry Pi eine riesige Nutzerbasis hat, die einen sehr positiven Einfluss auf die Gesundheit des Ethereum-Netzwerks haben könnte.
Bitte vertiefe dich in die Details dieses Tutorials, probiere es auf Testnets aus, sieh dir das Ethereum on Arm GitHub an, gib Feedback, melde Probleme und erstelle Pull-Requests und hilf mit, die Technologie und Dokumentation voranzubringen!

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
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
