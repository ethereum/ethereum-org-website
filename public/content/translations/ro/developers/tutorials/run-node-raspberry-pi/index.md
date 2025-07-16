---
title: Cum să transformaţi Raspberry Pi 4 într-un nod doar prin flasharea cardului MicroSD
description: Flashați-vă Raspberry Pi 4, conectați un cablu ethernet, conectați discul SSD și porniți dispozitivul pentru a transforma Raspberry Pi 4 într-un nod Ethereum complet, care rulează nivelul de execuție sau nivelul de consens (Lanț Beacon / validator)
author: "EthereumOnArm"
tags:
  - "clienți"
  - "nivel de execuție"
  - "nivel de consens"
  - "noduri"
lang: ro
skill: intermediate
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL;DR**: Flashați-vă Raspberry Pi 4, conectați un cablu ethernet, conectați discul SSD și porniți dispozitivul pentru a transforma Raspberry Pi 4 într-un nod Ethereum complet, care rulează nivelul de execuție sau nivelul de consens (Lanț Beacon / validator)

[Aflaţi mai multe despre actualizările Ethereum](/roadmap/)

Mai întâi câteva elemente de context. După cum știţi, am întâmpinat unele probleme de memorie [[1]](/developers/tutorials/run-node-raspberry-pi/#references) cu imaginea Raspberry PI 4, întrucât sistemul de operare al acestuia este încă pe 32 de biți [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (cel puțin cu aplicația „userland”). Chiar dacă preferăm să rămânem cu sistemul de operare oficial, am ajuns la concluzia că, pentru a rezolva aceste probleme, trebuie să migrăm la un sistem de operare nativ de 64 de biți

Pe de altă parte, clienții de consens nu suportă binarele de 32 de biţi, de aceea utilizarea Raspbian ar exclude Raspberry Pi 4 de la executarea unui nod al nivelului de consens (și astfel, de la posibilitatea de mizare).

Așa că, după mai multe teste, lansăm acum 2 imagini diferite bazate pe Ubuntu 20.04 64bit [[3]](/developers/tutorials/run-node-raspberry-pi/#references): ediții pentru nivelul de execuție și pentru nivelul de consens.

Practic, ambele sunt aceeași imagine și includ aceleași funcţionalităţi ale imaginilor bazate pe Raspbian. Însă acestea sunt configurate implicit pentru a executa software la nivelului de execuție sau cel de consens.

**Imaginile au grijă de toți pașii necesari**, de la configurarea mediului și formatarea discului SSD la instalarea și rularea software-ului Ethereum, precum și pornirea sincronizării blockchain-ului.

## Funcţionalităţi principale {#main-features}

- Bazat pe Ubuntu 20.04 pe 64 biți
- Partiționează și formatează automat discul USB
- Adaugă memorie swap (modulul de kernel ZRAM + un fișier swap) pe baza proiectului Armbian [[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- Schimbă numele gazdei cu ceva de genul „ethnode-e2a3e6fe” pe baza hash MAC
- Rulează software-ul ca serviciu al sistemului și începe să sincronizeze Blockchain-ul
- Include un depozitar APT pentru instalarea și actualizarea software-ului Ethereum
- Include un tablou de bord pentru monitorizare bazat pe Grafana / Prometheus

## Software inclus {#software-included}

Ambele imagini cuprind aceleași pachete, singura diferenţă dintre ele fiind că versiunea de execuție rulează în mod implicit „Geth”, iar versiunea de consens rulează implicit „lanțul Beacon Prysm”.

### Clienți de execuție {#execution-clients}

- Geth [[8]](/developers/tutorials/run-node-raspberry-pi/#references): 1.9.13 (binar oficial)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references): 2.7.2 (compilat încrucișat)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references): 1.8.28 (compilat încrucișat)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references): 1.4.4 (compilat)

### Clienți de consens {#consensus-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references): 1.0.0-alpha6 (oficial compilat binar)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references): 0.1.1 (compilat)

### Framework Ethereum {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.7 (oficial compilat binar)
- Raiden Network [[15]](/developers/tutorials/run-node-raspberry-pi/#references): 0.200.0~rc1 (oficial compilat binar)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.0 (oficial compilat binar)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references): 0.52.3 (compilat)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references): 2.3.3 (oficial compilat binar)

## Ghid de instalare și utilizare {#installation-guide-and-usage}

### Hardware și configurare recomandate {#recommended-hardware-and-setup}

- Raspberry 4 (model B) - 4 GB
- Card MicroSD (minimum 16 GB clasa 10)
- Disc SSD USB 3.0 (consultaţi secțiunea de stocare)
- Alimentare electrică
- Cablu Ethernet
- Portul de redirecționare 30303 (nivel de execuție) și portul de redirecționare 13000 (nivel de consens) [[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- O cutie cu disipator termic și ventilator (opțional, dar foarte recomandat)
- Tastatură USB, monitor și cablu HDMI (micro-HDMI) (opțional)

## Stocare {#storage}

Veți avea nevoie de un SSD pentru a rula clienții Ethereum (fără hard disk SSD nu aveți absolut nicio șansă de a sincroniza blockchain-ul Ethereum). Există 2 opțiuni:

- Utilizarea unui disc SSD portabil USB, cum ar fi SSD portabil Samsung T5.
- Utilizarea unei carcase externe USB 3.0 cu un disc SSD. În cazul nostru, am folosit o carcasă pentru hard disk Inateck 2.5 FE2011. Aveţi grijă să cumpăraţi o carcasă cu un cip compatibil UAS, în special unul dintre acestea: JMicron (JMS567 sau JMS578) sau ASMedia (ASM1153E).

În ambele cazuri, evitaţi discurile SSD de calitate scăzută, deoarece discul este o componentă cheie a nodului dvs. și poate afecta drastic performanțele (și timpul de sincronizare).

Rețineţi că trebuie să conectezi discul la un port USB 3.0 (albastru)

## Descărcarea și instalarea imaginii {#image-download-and-installation}

### 1. Descărcați imaginile nivelurilor de execuție și de consens {#1-download-execution-or-consensus-images}

<ButtonLink href="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">
  Descărcați imaginea nivelului de execuție
</ButtonLink>

sha256 7fa9370d13857dd6abc8fde637c7a9a7a66b307d5c28b0d29a09c73c55c

<ButtonLink href="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">
  Descărcați imaginea stratului de consens
</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Flashaţi imaginea {#2-flash-the-image}

Introduceți microSD-ul în desktopul sau laptopul dvs. și descărcați fișierul (de exemplu, nivelul de execuție):

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

Observaţie: Dacă nu sunteţi sigur privind linia de comandă sau dacă rulaţi Windows, puteți utiliza [Etcher](https://etcher.io)

Deschideţi un terminal și verificaţi numele dispozitivului dvs. MicroSD care rulează:

```bash
sudo fdisk -l
```

Ar trebui să vedeţi un dispozitiv numit mmcblk0 sau sdd. Dezarhivaţi și flashaţi imaginea:

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. Introduceţi MicroSD -ul în Raspberry Pi 4. Conectaţi un cablu Ethernet și atașaţi discul SSD USB (aveţi grijă să utilizaţi portul albastru). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Porniţi dispozitivul {#4-power-on-the-device}

Sistemul de operare Ubuntu va porni în mai puțin de un minut, dar **va trebui să așteptați aproximativ 10 minute** pentru a permite scriptului să îndeplinească sarcinile necesare pentru a transforma dispozitivul într-un nod Ethereum și a reporni Raspberry.

În funcție de imaginea folosită, veţi rula:

- Clientul de execuție: Geth ca şi client implicit de sincronizare a blockchain-ului
- Clientul de consens: Prysm ca şi client implicit de sincronizare a lanțului Beacon (testnetul Goerli)

### 5. Logare {#5-log-in}

Vă puteţi conecta prin SSH sau folosind consola (dacă aveţi monitor și tastatură atașate)

```bash
User: ethereum
Password: ethereum
```

Când vă logaţi pentru prima dată, vi se va solicita să schimbaţi parola, deci va trebui să vă conectaţi de două ori.

### 6. Deschide ţiportul 30303 pentru Geth și 13000 dacă rulaţi lanțul Beacon Prysm. Dacă nu știţi cum să faceţi acest lucru, căutaţi pe google „redirecționare port”, urmat de modelul routerului. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Obțineţi ieșirea consolei {#7-get-console-output}

Puteţi vedea ce se întâmplă în fundal tastând:

```bash
sudo tail -f /var/log/syslog
```

**Felicitări. Acum rulaţi un nod Ethereum complet pe Raspberry Pi 4.**

## Sincronizarea blockchain-ului {#syncing-the-blockchain}

Acum trebuie să așteptaţi sincronizarea blockchain-ului. În cazul nivelului de execuție, aceasta va dura câteva zile, în funcție de diferiți factori, dar puteţi anticipa până la circa 5-7 zile.

Dacă rulați nivelul de consens testnet Goerli, puteţi anticipa o durată de 1-2 zile de sincronizare a lanțului Beacon. Amintiţi-vă că mai târziu va trebui să configuraţi validatorul pentru a începe procesul de mizare. [Cum se rulează validatorul nivelului de consens](/developers/tutorials/run-node-raspberry-pi/#validator)

## Monitorizarea tablourilor de bord {#monitoring-dashboards}

Pentru această primă versiune, am inclus 3 tablouri de bord de monitorizare bazate pe Prometheus [[5]](/developers/tutorials/run-node-raspberry-pi/#references) / Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) pentru a monitoriza nodul și datele clientului (Geth și Besu). Le puteţi accesa prin browserul web:

```bash
URL: http://your_raspberrypi_IP:3000
User: admin
Password: ethereum
```

## Schimbarea clienților {#switching-clients}

Toți clienții rulează ca serviciu systemd. Acest lucru este important deoarece, dacă apare o problemă, sistemul va relua automat procesul.

Geth și lanțul Beacon Prysm rulează în mod implicit (în funcție de ce se sincronizează, nivelul de execuție sau nivelul de consens), de aceea, dacă vreți să comutați la alți clienți (cum ar fi de exemplu, de la Geth la Nethermind), mai întâi trebuie să opriți și să dezactivați Geth, iar apoi să activați și să porniți celălalt client:

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Comenzile pentru activarea și pornirea fiecărui client de execuție:

```bash
sudo systemctl enable besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

Clienți de consens:

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable lighthouse
```

## Modificarea parametrilor {#changing-parameters}

Fișierele de configurare a clienţilor se află în directorul /etc/ethereum/. Puteţi edita aceste fișiere și reporni serviciul systemd pentru ca modificările să se aplice. Singura excepție este Nethermind, care, în plus, are un fișier de configurare Mainnet situat aici:

```bash
/etc/nethermind/configs/mainnet.cfg
```

Datele clientului Blockchain sunt stocate în contul de domiciliu Ethereum după cum urmează (rețineţi punctul dinaintea numelui directorului):

### Nivel de execuție {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Nivel de consens {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind și Hyperledger Besu {#nethermind-and-hyperledger-besu}

Acești 2 excelenți clienți de execuție au devenit o alternativă foarte bună pentru Geth și Parity. Cu cât există mai multă diversitate în rețea, cu atât mai bine, așa că le puteți încerca și contribui la sănătatea rețelei.

Ambele au nevoie să mai fie testate, așa că nu ezitaţi să vă jucaţi cu ele și să vă trimiteţi feedback-ul.

## Cum se execută validatorul de consens (mizarea) {#validator}

Odată ce lanțul Beacon testnet Goerli este sincronizat, puteți să rulați un validator pe același dispozitiv. Va trebui să urmaţi [acești pași de participare](https://prylabs.net/participate).

Prima dată trebuie să creaţi manual un cont rulând „validatorul” binar și să setaţi o parolă. După ce aţi finalizat acest pas, puteți adăuga parola în fișierul `/etc/ehereum/prysm-validator.conf` și poți porni validatorul ca serviciu systemd.

## Apreciem feedbackul dvs. {#feedback-appreciated}

Am muncit mult încercând să instalăm Raspberry Pi 4 ca nod complet Ethereum, deoarece știm că imensa bază de utilizatori ai acestui dispozitiv ar putea avea un impact foarte benefic pentru rețea.

Vă rugăm să luaţi în considerare faptul că aceasta este prima imagine bazată pe Ubuntu 20.04, astfel încât ar putea exista unele bug-uri. În acest caz, deschideți o problemă pe [GitHub](https://github.com/diglos/ethereumonarm) sau contactați-ne pe [Twitter](https://twitter.com/EthereumOnARM).

## Referințe {#references}

1. [geth se blochează în mod repetat cu SIGSEGV](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. https://github.com/openethereum/openethereum \* **Rețineți că OpenEthereum [a fost abandonat](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) și nu mai este întreținut.** Folosiți-l cu prudență și este de preferat să comutați la implementarea unui alt client.
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
