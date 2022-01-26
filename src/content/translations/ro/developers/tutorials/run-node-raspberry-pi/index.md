---
title: Cum să transformi Raspberry Pi 4 într-un nod doar prin intermitentul cardului MicroSD
description: Flash Raspberry PI 4, conectează un cablu ethernet, conectează discul SSD și pornește dispozitivul pentru a transforma Raspberry PI 4 într-un nod Ethereum 1.0 plin sau un nod Ethereum 2.0 (lanț Beacon/validator)
author: "EthereumOnArm"
tags: ["clienți", "eth2", "noduri"]
lang: ro
sidebar: true
skill: intermediar
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL;DR**: Flash Raspberry PI 4, conectează un cablu ethernet, conectează discul SSD și pornește dispozitivul pentru a transforma Raspberry PI 4 într-un nod Ethereum 1.0 sau un nod Ethereum 2.0 (lanț Beacon / validator)

[Află mai multe despre Ethereum 2.0 (Eth2)](/upgrades/)

Mai întâi câteva noțiuni de bază. După cum știi, am întâmpinat unele probleme de memorie [[1]](/developers/tutorials/run-node-raspberry-pi/#references) cu imaginea Raspberry PI 4 ca sistem de operare, Raspbian este încă pe 32 de biți [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (cel puțin cu aplicația „userland”). Chiar dacă preferăm să rămânem cu sistemul de operare oficial am ajuns la concluzia că, pentru a rezolva aceste probleme, trebuie să migrăm la un sistem de operare nativ de 64 de biți

În plus, [Clienții Eth 2.0](/upgrades/get-involved/#clients) nu suportă aplicațiile 32 de biți binare, astfel încât utilizarea Raspbian ar exclude Raspberry Pi 4 de la rularea unui nod Eth 2.0 (și posibilitatea de a miza).

Deci, după mai multe teste, acum eliberăm 2 imagini diferite bazate pe Ubuntu 20.04 pe 64 biți [[3]](/developers/tutorials/run-node-raspberry-pi/#references): edițiile Eth 1.0 și Eth 2.0.

Practic, ambele sunt aceeași imagine și includ aceleași caracteristici ale imaginilor bazate pe Raspbian. Dar acestea sunt configurate pentru a rula software-ul Eth 1.0 sau Eth 2.0 în mod implicit.

**Imaginile au grijă de toți pașii necesari**, de la configurarea mediului și formatarea discului SSD la instalarea și rularea software-ului Ethereum, precum și pornirea sincronizării blockchain-ului.

## Caracteristici principale {#main-features}

- Bazat pe Ubuntu 20.04 pe 64 biți
- Partiționează și formatează automat discul USB
- Adaugă memorie swap (modulul de kernel ZRAM + un fișier swap) bazat pe proiectul Armbian [[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- Schimbă numele gazdei cu ceva de genul „ethnode-e2a3e6fe” bazat pe hash MAC
- Rulează software-ul ca serviciu de sistem și începe să sincronizeze Blockchain
- Include un depozit APT pentru instalarea și actualizarea software-ului Ethereum
- Include un tablou de bord de monitorizare bazat pe Grafana / Prometheus

## Software inclus {#software-included}

Ambele imagini includ aceleași pachete, singura diferență dintre ele este că Eth 1.0 rulează Geth în mod implicit, iar Eth 2.0 rulează lanțul Beacon Prysm în mod implicit.

### Clienții Ethereum 1.0 {#execution-clients}

- Geth [[8]](/developers/tutorials/run-node-rasp berry-pi/#references): 1.9.13 (oficial compilat binar)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references): 2.7.2 (compilat încrucișat)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references): 1.8.28 (compilat încrucișat)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references): 1.4.4 (compilat)

### Clienții Ethereum 2.0 {#consensus-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references): 1.0.0-alpha6 (oficial compilat binar)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references): 0.1.1 (compilat)

### Cadrul Ethereum {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.7 (oficial compilat binar)
- Raiden Network [[15]](/developers/tutorials/run-node-raspberry-pi/#references): 0.200.0~rc1 (oficial compilat binar)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.0 (oficial compilat binar)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references): 0.52.3 (compilat)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references): 2.3.3 (oficial compilat binar)

## Ghid de instalare și utilizare {#installation-guide-and-usage}

### Hardware și configurare recomandate {#recommended-hardware-and-setup}

- Raspberry 4 (model B) - 4 GB
- Card MicroSD (de minimum 16 GB clasa 10)
- Disc SSD USB 3.0 (vezi secțiunea de stocare)
- Alimentare electrică
- Cablu Ethernet
- 30303 Port forwarding (Eth 1.0) și 13000 port forwarding (Eth 2.0) [[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- O cutie cu disipator termic și ventilator (opțional, dar foarte recomandat)
- Tastatură USB, monitor și cablu HDMI (micro-HDMI) (opțional)

## Stocare {#storage}

Vei avea nevoie de SSD pentru a rula clienții Ethereum (fără o unitate SSD nu ai nicio șansă de a sincroniza blockchain-ul Ethereum). Există 2 opțiuni:

- Utilizarea unui disc SSD portabil USB, cum ar fi SSD portabil Samsung T5.
- Utilizarea unei carcase externe USB 3.0 cu un disc SSD. În cazul nostru, am folosit o carcasă pentru discul dur Inateck 2.5 FE2011. Asigură-te să cumperi o carcasă cu un cip compatibil UAS, în special unul dintre acestea: JMicron (JMS567 sau JMS578) sau ASMedia (ASM1153E).

În ambele cazuri, evită discurile SSD de calitate scăzută, deoarece discul este o componentă cheie a nodului tău și poate afecta drastic performanța (și timpul de sincronizare).

Reține că trebuie să conectezi discul la un port USB 3.0 (albastru)

## Descărcarea și instalarea imaginii {#image-download-and-installation}

### 1. Descarcă imaginea Eth 1.0 sau Eth 2.0 {#1-download-execution-or-consensus-images}

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">Descarcă imaginea Eth 1.0</ButtonLink>

sha256 7fa9370d13857dd6abc8fde637c7a9a7a66b307d5c28b0d29a09c73c55c<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">Descarcă imaginea Eth2</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Flashează imaginea {#2-flash-the-image}

Introdu microSD în desktop/laptop și descarcă fișierul (Eth 1.0, de exemplu):

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

Notă: Dacă nu te simți confortabil cu linia de comandă sau dacă rulezi Windows, poți utiliza [Etcher](https://etcher.io)

Deschide un terminal și verifică numele dispozitivului MicroSD care rulează:

```bash
sudo fdisk -l
```

Ar trebui să vezi un dispozitiv numit mmcblk0 sau sdd. Dezarhivează și flashează imaginea:

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. Introdu MicroSD în Raspberry Pi 4. Conectează un cablu Ethernet și atașează discul SSD USB (asigură-te că utilizezi portul albastru). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Pornește dispozitivul {#4-power-on-the-device}

Sistemul de operare Ubuntu va porni în mai puțin de un minut, dar **va trebui să aștepți aproximativ 10 minute** pentru a permite scriptului să efectueze sarcinile necesare pentru a transforma dispozitivul într-un nod Ethereum și a reporni Raspberry.

În funcție de imaginea folosită, vei rula:

- Eth 1.0: Geth ca client implicit care sincronizează blockchain-ul
- Eth2: Prysm ca client implicit care sincronizează lanțul Beacon (Topaz testnet)

### 5. Autentificare {#5-log-in}

Te poți conecta prin SSH sau folosind consola (dacă ai un monitor și tastatură atașate)

```bash
Utilizator: ethereum
Parolă: ethereum
```

La prima conectare vei fi solicitat să schimbi parola, deci va trebui să te conectezi de două ori.

### 6. Deschide portul 30303 pentru Geth și 13000 dacă rulezi lanțul Beacon Prysm. Dacă nu știi cum să faci acest lucru, caută pe google „redirecționare port” urmat de modelul ruterului. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Obține ieșirea consolă {#7-get-console-output}

Poți vedea ce se întâmplă în fundal tastând:

```bash
sudo tail -f /var/log/syslog
```

**Felicitări. Rulezi acum un nod Ethereum complet pe Raspberry Pi 4.**

## Sincronizarea blockchain-ului {#syncing-the-blockchain}

Acum trebuie să aștepți sincronizarea blockchain-ului. În cazul Eth 1.0 acest lucru va dura câteva zile, în funcție de mai mulți factori, dar te poți aștepta de la 5 la 7 zile aproximativ.

Dacă rulezi rețeaua de testare Ethnet Topaz te poți aștepta la o perioadă de 1 - 2 zile de sincronizare a lanțului Beacon. Amintește-ți că va trebui să configurezi validatorul mai târziu pentru a începe procesul de mizare. [Cum se execută validatorul Eth 2.0](/developers/tutorials/run-node-raspberry-pi/#validator)

## Monitorizare tablouri de bord {#monitoring-dashboards}

Pentru această primă versiune, am inclus 3 tablouri de bord de monitorizare bazate pe Prometheus [[5]](/developers/tutorials/run-node-raspberry-pi/#references) / Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) pentru a monitoriza nodul și datele clientului (Geth și Besu). Poate fi accesat prin browserul web:

```bash
URL: http://your_raspberrypi_IP: 3000
Utilizator: admin
Parolă: ethereum
```

## Schimbarea clienților {#switching-clients}

Toți clienții se execută ca un serviciu systemd. Acest lucru este important deoarece, dacă apare o problemă, sistemul va relua automat procesul.

Lanțul Beacon Geth și Prysm rulează implicit (în funcție de ceea ce sincronizezi, Eth 1.0 sau Eth2), deci, dacă dorești să treci la alți clienți (de la Geth la Nethermind, de exemplu), trebuie să oprești și să dezactivezi mai întâi Geth și să activezi și să pornești celălalt client:

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Comenzi pentru activarea și pornirea fiecărui client Eth 1.0:

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

## Modificarea parametrilor {#changing-parameters}

Fișierele de configurare ale clientului se află în directorul /etc/ethereum/. Poți edita aceste fișiere și reporni serviciul systemd pentru ca modificările să aibă efect. Singura excepție este Nethermind care, în plus, are un fișier de configurare rețea principală localizat aici:

```bash
/etc/nethermind/configs/mainnet.cfg
```

Datele clientului Blockchain sunt stocate în contul de domiciliu Ethereum după cum urmează (reține punctul dinaintea numelui directorului):

### Eth 1.0 {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Eth2 {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind și Hyperledger Besu {#nethermind-and-hyperledger-besu}

Acești 2 clienți excelenți Eth 1.0 au devenit o alternativă excelentă la Geth și Parity. Cu cât există mai multă diversitate în rețea, cu atât mai bine, așa că le poți încerca și contribui la sănătatea rețelei.

Ambele au nevoie de teste suplimentare, așa că nu ezita să te joci cu ele și să trimiți feedbackul tău.

## Cum rulezi validatorul Eth 2.0 (mizarea) {#validator}

Odată ce lanțul Beacon Topaz este sincronizat, poți rula un validator pe același dispozitiv. Va trebui să urmezi [acești pași de participare](https://prylabs.net/participate).

Pentru prima dată, trebuie să creezi manual un cont executând „validatorul” binar și să configurezi o parolă. După ce ai finalizat acest pas, poți adăuga parola în fișierul `/etc/ehereum/prysm-validator.conf` și poți porni validatorul ca serviciu systemd.

## Apreciem feedbackul tău {#feedback-appreciated}

Am muncit mult încercând să instalăm Raspberry Pi 4 ca un nod complet Ethereum, deoarece știm că imensa bază de utilizare a acestui dispozitiv ar putea avea un impact foarte pozitiv în rețea.

Te rugăm să iei în considerare faptul că aceasta este prima imagine bazată pe Ubuntu 20.04, astfel încât ar putea exista unele erori. Dacă găsești erori, deschide un tichet pe [GitHub](https://github.com/diglos/ethereumonarm) sau contactează-ne pe [Twitter](https://twitter.com/EthereumOnARM).

## Referințe {#references}

1. [geth se blochează în mod repetat cu SIGSEGV](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
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
