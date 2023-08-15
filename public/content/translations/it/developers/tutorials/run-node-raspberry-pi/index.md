---
title: Come trasformare un Raspberry Pi 4 in un nodo eseguendo il flashing della scheda MicroSD
description: Esegui il flashing del Raspberry Pi 4, collega un cavo Ethernet, collega il disco SSD e accendi il dispositivo per trasformare Raspberry Pi 4 in un nodo completo di Ethereum + validatore
author: "EthereumOnArm"
tags:
  - "client"
  - "livello di esecuzione"
  - "livello di consenso"
  - "nodi"
lang: it
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html
postMergeBannerTranslation: page-upgrades-post-merge-banner-tutorial-ood
---

**Ethereum on Arm è un'immagine Linux personalizzata che può trasformare un Raspberry Pi in un nodo di Ethereum.**

Per usare Ethereum on Arm per trasformare un Raspberry Pi in un nodo di Ethereum, si consiglia il seguente hardware:

- Raspberry 4 (modello B 8GB)
- Scheda MicroSD (almeno 16 GB Classe 10)
- SSD da minimo 2 TB, disco USB 3.0 o una SSD con un case USB a SATA.
- Alimentatore
- Cavo Ethernet
- Port forwarding (vedi i client per maggiori informazioni)
- Un case con dissipatore di calore e ventola
- Tastiera USB, monitor e cavo HDMI (micro-HDMI) (opzionale)

## Perché eseguire Ethereum on ARM? {#why-run-ethereum-on-arm}

Le schede ARM sono computer molto convenienti, flessibili e di dimensioni ridotte. Sono una buona scelta per eseguire i nodi di Ethereum perché sono economiche, possono essere configurate in modo che tutte le risorse si concentrino solo sul nodo, il che le rende efficienti, consumano quantità minime di energia e sono fisicamente piccole così da occupare poco spazio in qualsiasi casa. Inoltre è molto facile avviare i nodi perché il flashing della MicroSD del Raspberry Pi può essere eseguito in modo semplice con un'immagine pre-costruita, senza necessità di scaricare o creare software.

## Come funziona? {#how-does-it-work}

Il flashing della scheda di memoria del Raspberry Pi è eseguito con un'immagine pre-costruita che contiene tutto il necessario per eseguire un nodo di Ethereum. Con una scheda su cui è stato eseguito il flashing, tutto ciò che l'utente deve fare è accendere il Raspberry Pi. Tutti i processi necessari per eseguire il nodo sono avviati automaticamente. Questo funziona perché la scheda di memoria contiene un sistema operativo (OS) basato su Linux su cui i processi a livello di sistema sono eseguiti automaticamente, trasformando l'unità in un nodo di Ethereum.

Ethereum non è eseguibile usando il popolare OS Linux per Raspberry Pi "Raspbian" poiché questo usa ancora un'architettura a 32 bit che causa agli utenti di Ethereum problemi di memoria, e i client di consenso non supportano i binari a 32 bit. Per superare ciò, il team di Ethereum on Arm è migrato a un OS a 64 bit nativo chiamato "Armbian".

**Le immagini comprendono tutti i passaggi necessari**, dalla configurazione dell'ambiente, alla formattazione del disco SSD, dall'installazione ed esecuzione del software Ethereum fino all'avvio della sincronizzazione della blockchain.

## Nota sui client di esecuzione e di consenso {#note-on-execution-and-consensus-clients}

La documentazione di Ethereum on Arm spiega come configurare un client di esecuzione _O_ un client di consenso, ad eccezione di due reti di prova di Ethereum (Kiln e Ropsten). Questa scelta è possibile solo prima dell'imminente transizione di Ethereum dal Proof of Work (PoW) al Proof of Stake (PoS), nota come [La Fusione](/roadmap/merge).

<InfoBanner>
Dopo La Fusione non sarà possibile eseguire separatamente i client di esecuzione e di consenso, che dovranno essere eseguiti in coppia. Pertanto, in questo tutorial eseguiremo insieme una coppia client di esecuzione- client di consenso su una rete di prova di Ethereum (Kiln).
</InfoBanner>

## L'Immagine di Raspberry Pi 4 di Kiln {#the-kiln-raspberry-pi-4-image}

Kiln è una rete di prova pubblica progettata specificamente per testare La Fusione. Ethereum on Arm ha sviluppato un'immagine che consente agli utenti di avviare rapidamente una coppia di client di Ethereum su questa rete di prova della fusione. La fusione di Kiln si è già verificata, ma la rete è ancora attiva, quindi è utilizzabile per questo tutorial. Ether on Kiln non ha alcun valore nel mondo reale.

L'immagine di Raspberry Pi 4 di Kiln è un'immagine "plug and play" che installa e configura automaticamente sia il client di esecuzione che quello di consenso, configurandoli per comunicare tra loro e connettersi alla rete Kiln. Tutto ciò che l'utente deve fare è avviarne i processi usando un semplice comando. L'immagine contiene quattro client di esecuzione (Geth, Nethermind, Besu ed Erigon) e quattro client di consenso (Lighthouse, Prysm, Nimbus, Teku) tra cui l'utente può scegliere.

Scarica l'immagine di Raspberry Pi da [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/ES56R_SuvaVFkiMO1Tgnf6kB7lEbBfla5c2c18E3WQRJzA?download=1) e verifica l'hash SHA256:

```sh
# Dalla cartella contenente l'immagine scaricata
shasum -a 256 ethonarm_kiln_22.03.01.img.zip
# L'hash dovrebbe produrre: 485cf36128ca60a41b5de82b5fee3ee46b7c479d0fc5dfa5b9341764414c4c57
```

Nota che per gli utenti che non possiedono un Raspberry Pi ma hanno un conto AWS, esistono istanze di ARM disponibili che possono eseguire la stessa immagine. Le istruzioni e l'immagine AWS possono essere scaricate da Ethereum on Arm (https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html).

## Flashing della MicroSD {#flashing-the-microsd}

La scheda MicroSD che sarà usata per il Raspberry Pi dovrebbe innanzitutto essere inserita in un computer desktop o portatile, così da eseguirne il flashing. Poi, i seguenti comandi del terminale eseguiranno il flashing dell'immagine scaricata sulla scheda SD:

```shell
# verifica il nome della scheda MicroSD
sudo fdisk -I

>> sdxxx
```

È davvero importante inserire il nome corretto, perché il prossimo comando include `dd`, che cancella completamente i contenuti esistenti della scheda prima di caricarvi l'immagine. Per continuare, naviga fino alla cartella contenente l'immagine compressa:

```shell
# decompressione e flash dell'immagine
unzip ethonarm_kiln_22.03.01.img.zip
sudo dd bs=1M if=ethonarm_kiln_22.03.01.img of=/dev/mmcblk0 conv=fdatasync status=progress
```

Dopo aver eseguito il flashing, la scheda può essere inserita nel Raspberry Pi.

## Avviare il nodo {#start-the-node}

Con la scheda SD inserita nel Raspberry Pi, connetti il cavo Ethernet e la SSD, poi accendilo. L'OS si avvierà e inizierà automaticamente a eseguire le attività pre-configurate che trasformano il Raspberry Pi in un nodo di Ethereum, anche installando e creando il software del client. Ciò richiederà probabilmente da 10 a 15 minuti.

Una volta che tutto è installato e configurato, accedi al dispositivo tramite una connessione ssh o usando il terminale direttamente se alla scheda sono collegati uno schermo e una tastiera. Usa il conto di `ethereum` per accedere, poiché ha le autorizzazioni necessarie per avviare il nodo.

```shell
User: ethereum
Password: ethereum
```

L'utente può poi scegliere la combinazione di client di esecuzione e di consenso che desidera eseguire e avviarne i processi systemctl come segue (l'esempio esegue Geth e Lighthouse):

```shell
sudo systemctl start geth-lh
sudo systemctl start lh-geth-beacon
```

I registri possono essere controllati usando

```shell
# log per Geth
sudo journalctl -u geth-lh -f
# log per Lighthouse
sudo journalctl -u lh-geth-beacon -f
```

I nomi specifici del servizio per ogni combinazione di client sono disponibili nella [documentazione di Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html#id2). Possono essere usati per aggiornare i comandi forniti qui per qualsiasi combinazione.

## Validatori {#validators}

Per poter eseguire un validatore, devi prima avere accesso a 32 ETH della rete di prova, che devono essere depositati nel contratto di deposito di Kiln. Questo può esser fatto seguendo la guida passo-passo sul [Launchpad di Kiln](https://kiln.launchpad.ethereum.org/en/). Fallo su un computer desktop/portatile, ma non generare chiavi: puoi farlo direttamente sul Raspberry Pi.

Apri un terminale sul Raspberry Pi ed esegui il seguente comando per generare le chiavi di deposito:

```
cd && deposit new-mnemonic --num_validators 1 --chain kiln
```

Mantieni al sicuro la frase mnemonica! Il suddetto comando ha generato due file nel keystore del nodo: le chiavi del validatore e un file dei dati di deposito. I dati di deposito devono essere caricati nel launchpad, quindi devono esser copiati dal Raspberry Pi nel PC/portatile. Questo si può fare usando una connessione ssh o qualsiasi altro metodo copia/incolla.

Una volta che il file dei dati di deposito è disponibile sul computer che esegue il launchpad, può essere selezionato e trascinato sul `+` sulla schermata del launchpad. Segui le istruzioni sullo schermo per inviare una transazione al contratto di deposito.

Tornando al Raspberry Pi, può essere avviato un validatore. Ciò richiede l'importazione delle chiavi del validatore, l'impostazione dell'indirizzo per incassare le ricompense e successivamente l'avvio del processo pre-configurato del validatore. Gli esempi seguenti sono per Lighthouse, le istruzioni per gli altri client di consenso sono disponibili nella [documentazione di Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html#lighthouse):

```shell
# importa le chiavi del validatore
lighthouse-kl account validator import --directory=/home/ethereum/validator_keys --datadir=/home/ethereum/.lh-geth/kiln/testnet-lh

# imposta l'indirizzo di ricompensa
sudo sed -i '<ETH_ADDRESS>' /etc/ethereum/kiln/lh-geth-validator.conf

# avvia il validatore
sudo systemctl start lh-geth-validator
```

Congratulazioni, hai ora un nodo di Ethereum completo e un validatore in esecuzione su un Raspberry Pi!

## Ogni feedback è benvenuto {#feedback-appreciated}

Sappiamo che Raspberry Pi ha un'enorme base di utenti che potrebbe avere un impatto molto positivo sulla salute della rete di Ethereum. Sei pregato di approfondire i dettagli in questo tutorial, provare a eseguirlo su altre reti di prova o persino sulla Rete principale di Ethereum, dare un'occhiata al GitHub di Ethereum on Arm, dare feedback, creare ticket e richieste di pull e aiutare a far progredire la tecnologia e la documentazione!

## Riferimenti {#references}

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
