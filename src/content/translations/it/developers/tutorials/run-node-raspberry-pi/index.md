---
title: Come trasformare un Raspberry Pi 4 in un nodo eseguendo il flashing della scheda MicroSD
description: Esegui il flashing del Raspberry Pi 4, collega un cavo Ethernet, collega il disco SSD e accendi il dispositivo per trasformare Raspberry Pi 4 in un nodo completo Ethereum che esegue il livello di esecuzione o il livello di consenso (beacon chain/validatore)
author: "EthereumOnArm"
tags:
  - "client"
  - "livello di esecuzione"
  - "livello di consenso"
  - "nodi"
lang: it
skill: intermediate
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL;DR**: Esegui il flashing del Raspberry Pi 4, collega un cavo Ethernet, collega il disco SSD e accendi il dispositivo per trasformare Raspberry Pi 4 in un nodo completo Ethereum che esegue il livello di esecuzione o il livello di consenso (Beacon Chain / validatore)

[Maggiori informazioni sugli aggiornamenti di Ethereum](/upgrades/)

Prima di tutto, un po' di contesto. Come saprai, abbiamo qualche problema di memoria [[1]](/developers/tutorials/run-node-raspberry-pi/#references) con l'immagine di Raspberry Pi 4, perché Raspbian OS è ancora a 32 bit [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (almeno lo userland). Anche se preferiamo attenerci al sistema operativo ufficiale, siamo arrivati alla conclusione che, per risolvere questi problemi, dobbiamo migrare a un sistema operativo nativo a 64 bit.

Inoltre, i [client di consenso](/upgrades/get-involved/#clients) non supportano i file binari a 32 bit, quindi usare Raspbian impedirebbe a Raspberry Pi 4 di eseguire un nodo del livello di consenso (e di fare staking).

Quindi, dopo diversi test, stiamo ora rilasciando 2 immagini diverse basate su Ubuntu 20.04 a 64 bit [[3]](/developers/tutorials/run-node-raspberry-pi/#references): le versioni livello di esecuzione e livello di consenso.

Fondamentalmente, si tratta della stessa immagine ed entrambe hanno le stesse caratteristiche delle immagini basate su Raspbian. Ma sono configurate di default per eseguire il software del livello di esecuzione o del livello di consenso.

**Le immagini comprendono tutti i passaggi necessari**, dalla configurazione dell'ambiente, alla formattazione del disco SSD, dall'installazione ed esecuzione del software Ethereum fino all'avvio della sincronizzazione della blockchain.

## Caratteristiche principali {#main-features}

- Basato su Ubuntu 20.04 a 64 bit
- Partizionamento e formattazione del disco USB automatici
- Aggiunta di memoria di scambio (modulo kernel ZRAM + un file di scambio) basata sul lavoro di Armbian [[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- Cambiamento del nome dell'host in qualcosa del tipo "ethnode-e2a3e6fe" in base all'hash MAC
- Esecuzione del software come servizio systemd e avvio della sincronizzazione della blockchain
- Include un repository APT per l'installazione e l'aggiornamento del software Ethereum
- Include una dashboard di monitoraggio basata su Grafana/Prometheus

## Software incluso {#software-included}

Entrambe le immagini includono gli stessi pacchetti, la sola differenza è che la versione di esecuzione esegue Geth di default mentre la versione di consenso esegue di default la beacon chain di Prysm.

### Client di esecuzione {#execution-clients}

- Geth [[8]](/developers/tutorials/run-node-raspberry-pi/#references): 1.9.13 (binario ufficiale)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references): 2.7.2 (compilazione incrociata)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references): 1.8.28 (compilazione incrociata)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references): 1.4.4 (compilata)

### Client di consenso {#consensus-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references): 1.0.0-alpha6 (binario ufficiale)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references): 0.1.1 (compilata)

### Framework Ethereum {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.7 (binario ufficiale)
- Raiden Network [[15]](/developers/tutorials/run-node-raspberry-pi/#references): 0.200.0~rc1 (binario ufficiale)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.0 (binario ufficiale)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references): 0.52.3 (compilato)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references): 2.3.3 (binario ufficiale)

## Guida all'installazione e utilizzo {#installation-guide-and-usage}

### Hardware consigliato e configurazione {#recommended-hardware-and-setup}

- Raspberry 4 (modello B) - 4 GB
- Scheda MicroSD (almeno 16 GB Classe 10)
- Unità SSD USB 3.0 (vedi la sezione Storage)
- Alimentatore
- Cavo Ethernet
- Port forwarding 30303 (livello di esecuzione) e 13000 (livello di consenso) [[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- Un caso con dissipatore di calore e ventola (opzionale ma fortemente raccomandato)
- Tastiera USB, monitor e cavo HDMI (micro-HDMI) (opzionale)

## Storage {#storage}

Necessiterai di un'unità SSD per eseguire i client di Ethereum (senza un'unità SSD non c'è assolutamente alcuna possibilità di sincronizzare la blockchain di Ethereum). Ci sono 2 possibilità:

- Usa un'unità SSD USB portatile come l'SSD Samsung T5 Portable.
- Usa un box esterno per HDD USB 3.0 con un'unità SSD. Nel nostro caso abbiamo usato un box esterno per HDD da 2.5" FE2011. Controlla che il box esterno che acquisti abbia un chip conforme a UAS, in particolare uno di questi: JMicron (JMS567 o JMS578) o ASMedia (ASM1153E).

In entrambi i casi, evita le unità SSD di bassa qualità, poiché sono componenti chiave del nodo e possono influenzare drasticamente le prestazioni (e i tempi di sincronizzazione).

Ricorda che devi collegare l'unità a una porta USB 3.0 (blu)

## Download immagine e installazione {#image-download-and-installation}

### 1. Scarica le immagini dei livelli di esecuzione e consenso {#1-download-execution-or-consensus-images}

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">
  Scarica l'immagine del livello di esecuzione
</ButtonLink>

sha256 7fa9370d13857dd6abcc8fde637c7a9a7e3a66b307d5c28b0c0d29a09c73c55c

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">
  Scarica l'immagine del livello di consenso
</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Esegui il flashing dell'immagine {#2-flash-the-image}

Inserisci la microSD nel PC / portatile e scarica il file (ad esempio il livello di esecuzione):

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

Nota: se non hai famigliarità con la riga di comando o usi Windows, puoi usare [Ethcer](https://etcher.io)

Apri un terminale e controlla il nome del dispositivo MicroSD eseguendo:

```bash
sudo fdisk -l
```

Dovresti vedere un dispositivo con nome mmcblk0 o sdd. Decomprimi ed esegui il flashing dell'immagine:

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. Inserisci la MicroSD nel Raspberry Pi 4. Connetti un cavo Ethernet e collega l'unità SSD USB (controlla che si tratti di una porta blu). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Accendi il dispositivo {#4-power-on-the-device}

Il sistema operativo Ubuntu si avvierà in meno di un minuto ma **dovrai aspettare circa 10 minuti** per consentire allo script di eseguire le attività necessarie per trasformare il dispositivo in un nodo Ethereum e riavviare Raspberry.

In base all'immagine, eseguirai:

- Client di esecuzione: Geth come client predefinito per sincronizzare la blockchain
- Client di consenso: Prysm come client predefinito per sincronizzare la beacon chain (rete di prova Prater)

### 5. Accedi {#5-log-in}

Puoi accedere via SSH o usando la console (se hai un monitor e una tastiera collegati)

```bash
User: ethereum
Password: ethereum
```

Ti sarà chiesto di cambiare la password al primo accesso, quindi dovrai accedere due volte.

### 6. Apri la porta 30303 per Get e 13000 se stai eseguendo la beacon chain Prysm. Se non sai come farlo, cerca su google "port forwarding" seguito dal tuo modello di router. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Ottieni l'output della console {#7-get-console-output}

Puoi vedere cosa succede in background digitando:

```bash
sudo tail -f /var/log/syslog
```

**Congratulazioni. Ora stai eseguendo un nodo completo di Ethereum sul tuo Raspberry Pi 4.**

## Sincronizzazione della blockchain {#syncing-the-blockchain}

Ora devi attendere che la blockchain venga sincronizzata. Con il livello di esecuzione, servirà qualche giorno in base a diversi fattori, in genere circa 5-7 giorni.

Se esegui la rete di prova Prater livello di consenso, il tempo di sincronizzazione della beacon chain sarà di circa 1-2 giorni. Ricorda che dopo dovrai configurare il validatore per iniziare il processo di staking. [Come eseguire il validatore del livello di consenso](/developers/tutorials/run-node-raspberry-pi/#validator)

## Monitoraggio delle dashboard {#monitoring-dashboards}

Per questa prima versione, abbiamo incluso 3 dashboard di monitoraggio basate su Prometheus[[5]](/developers/tutorials/run-node-raspberry-pi/#references)/Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) per monitorare il nodo e i dati dei client (Geth e Besu). Puoi accedere tramite il tuo browser web:

```bash
URL: http://your_raspberrypi_IP:3000
User: admin
Password: ethereum
```

## Passaggio tra client {#switching-clients}

Tutti i client sono eseguiti come servizio systemd. È importante perché, in caso di problemi, il sistema rigenererà automaticamente il processo.

La beacon chain di Geth e Prysm viene eseguita di default (in base a cosa sincronizzi, livello di esecuzione o livello di consenso) quindi, se vuoi passare ad altri client (da Geth a Nethermind, per esempio), devi prima interrompere e disabilitare Geth e abilitare e avviare l'altro client:

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Comandi per abilitare e avviare ogni client di esecuzione:

```bash
sudo systemctl enable besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

Client di consenso:

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable lighthouse
```

## Cambiamento dei parametri {#changing-parameters}

I file di configurazione dei client si trovano nella directory /etc/ethereum/. Puoi modificare questi file e riavviare il servizio systemd per rendere effettive le modifiche. L'unica eccezione è Nethermind che, inoltre, ha un file di configurazione della rete principale situato qui:

```bash
/etc/nethermind/configs/mainnet.cfg
```

I dati dei client della blockchain sono memorizzati nell'account principale di Ethereum, come segue (si noti il punto prima del nome della directory):

### Livello di esecuzione {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Livello di consenso {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind e Hyperledger Besu {#nethermind-and-hyperledger-besu}

Questi 2 grandi client di esecuzione sono attualmente un'ottima alternativa a Geth e Parity. La diversità della rete contribuisce alla sua salute, quindi anche tu puoi contribuire.

Entrambi necessitano di ulteriori test, quindi puoi sperimentare quanto desideri e comunicare il tuo feedback.

## Come eseguire il validatore di consenso (staking) {#validator}

Una volta sincronizzata la beacon chain della rete di prova Prater, puoi eseguire un validatore sullo stesso dispositivo. Dovrai seguire [questi passaggi per partecipare](https://prylabs.net/participate).

La prima volta, devi creare manualmente un account eseguendo il binario "validatore" e configurare una password. Una volta completato questo passaggio, puoi aggiungere la password a `/etc/ethereum/prysm-validator.conf` e avviare il validatore come servizio systemd.

## Ogni feedback è benvenuto {#feedback-appreciated}

Dedichiamo tempo e fatica al tentativo di configurare Raspberry Pi 4 come nodo completo di Ethereum, poiché sappiamo che la vasta base utenti di questo dispositivo potrebbe avere un impatto molto positivo sulla rete.

Tieni presente che questa è la prima immagine basata su Ubuntu 20.04, quindi potrebbero esserci dei bug. In tal caso, apri una segnalazione su [GitHub](https://github.com/diglos/ethereumonarm) o contattaci su [Twitter](https://twitter.com/EthereumOnARM).

## Riferimenti {#references}

1. [geth repeatedly crashes with SIGSEGV](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. https://github.com/openethereum/openethereum \* **Da notare che OpenEthereum [è ormai superato](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e non viene più mantenuto.** Usalo con cautela e preferibilmente passa ad un altro client.
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
