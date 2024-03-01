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
source: Ethereum su ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm è un'immagine Linux personalizzata che può trasformare un Raspberry Pi in un nodo di Ethereum.**

Per usare Ethereum on Arm per trasformare un Raspberry Pi in un nodo di Ethereum, si consiglia il seguente hardware:

- Raspberry 4 (modello B 8 GB), scheda Odroid M1 o Rock 5B (8 GB/16 GB RAM)
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

L'immagine Ethereum su Arm include l'esecuzione precostruita e client di consenso come servizi. Un nodo Ethereum richiede che entrambi i client siano sincronizzati ed in esecuzione. È necessario solo scaricare e copiare l'immagine e quindi avviare i servizi. L'immagine è precaricata con i seguenti client di esecuzione:

- Geth
- Nethermind
- Besu

e i seguenti clienti di consenso:

- Lighthouse
- Nimbus
- Prysm
- Teku

È necessario scegliere uno di ciascun gruppo da eseguire - tutti i client di esecuzione sono compatibili con tutti i client di consenso. Se non si seleziona esplicitamente un client, il nodo tornerà ai suoi valori predefiniti - Geth e Lighthouse - e li eseguirà automaticamente quando la scheda è accesa. È necessario aprire la porta 30303 sul router in modo che Geth possa trovare e connettersi ai pari.

## Download immagine {#downloading-the-image}

L'immagine Raspberry Pi 4 Ethereum è un'immagine "plug and play" che installa e imposta automaticamente sia i client di esecuzione che di consenso, configurarli per farli comunicare tra loro e connettersi alla rete Ethereum. Tutto ciò che l'utente deve fare è avviarne i processi usando un semplice comando.

Scarica l'immagine di Raspberry Pi da [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/ES56R_SuvaVFkiMO1Tgnf6kB7lEbBfla5c2c18E3WQRJzA?download=1) e verifica l'hash SHA256:

```sh
# From directory containing the downloaded image
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash should output: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Nota che le immagini per le schede Rock 5B e Odroid M1 sono disponibili alla [pagina di download](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) di Ethereum-su-Arm.

## Flashing della MicroSD {#flashing-the-microsd}

La scheda MicroSD che sarà usata per il Raspberry Pi dovrebbe innanzitutto essere inserita in un computer desktop o portatile, così da eseguirne la copia. Poi, i seguenti comandi del terminale eseguiranno la copia dell'immagine scaricata sulla scheda SD:

```shell
# verifica il nome della scheda MicroSD
sudo fdisk -I

>> sdxxx
```

È davvero importante inserire il nome corretto, perché il prossimo comando include `dd`, che cancella completamente i contenuti esistenti della scheda prima di caricarvi l'immagine. Per continuare, naviga fino alla cartella contenente l'immagine compressa:

```shell
# unzip and flash image
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Dopo aver eseguito la copia, la scheda può essere inserita nel Raspberry Pi.

## Avviare il nodo {#start-the-node}

Con la scheda SD inserita nel Raspberry Pi, connetti il cavo Ethernet e la SSD, poi accendilo. Il sistema operativo si avvierà e avvierà automaticamente l'esecuzione delle attività preconfigurate che trasformeranno il Raspberry Pi in un nodo Ethereum, compresa l'installazione e la creazione del software client. Ciò richiederà probabilmente da 10 a 15 minuti.

Una volta che tutto è installato e configurato, accedi al dispositivo tramite una connessione ssh o usando il terminale direttamente se alla scheda sono collegati uno schermo e una tastiera. Usa l'account `ethereum` per accedere, in quanto ha i permessi necessari per avviare il nodo.

```shell
User: ethereum
Password: ethereum
```

Il client di esecuzione predefinito, Geth, verrà avviato automaticamente. È possibile confermarlo controllando i registri utilizzando il seguente comando terminale:

```sh
sudo journalctl -u geth -f
```

Il client di consenso deve essere avviato esplicitamente. Per fare questo, prima aprire la porta 9000 sul router in modo che Lighthouse possa trovare e connettersi ai pari. Quindi abilitare e avviare il servizio lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Controllare il client utilizzando i registri:

```sh
sudo journalctl -u lighthouse-beacon
```

Si noti che il client di consenso si sincronizzerà in pochi minuti perché utilizza la sincronizzazione dei checkpoint. Il client di esecuzione richiederà più tempo, potenzialmente diverse ore, e si avvierà quando il client di consenso avrà già terminato la sincronizzazione (questo perché il client di esecuzione ha bisogno di un obiettivo per la sincronizzazione fornito dal client di consenso).

Con i servizi Geth e Lighthouse in esecuzione e sincronizzati, il tuo Raspberry Pi è ora un nodo Ethereum! È più comune interagire con la rete Ethereum utilizzando la console Javascript di Geth, che può essere collegata al client Geth sulla porta 8545. È anche possibile inviare comandi formattati come oggetti JSON utilizzando uno strumento di richiesta come Curl. Maggiori informazioni nella [documentazione di Geth](https://geth.ethereum.org).

Geth è preconfigurato per segnalare le metriche a un pannello Grafana che può essere visualizzato nel browser. Gli utenti più avanzati potrebbero voler utilizzare questa funzione per monitorare lo stato di salute del loro nodo accedendo a `ipaddress:3000` con nome `utente: admin` e `passwd: ethereum`.

## Validatori {#validators}

Un validatore può anche essere aggiunto facoltativamente al client di consenso. Il software validatore consente al nodo di partecipare attivamente al consenso e fornisce alla rete sicurezza criptoeconomica. Per questo lavoro in ETH si viene ricompensati. Per poter eseguire un validatore, devi prima avere accesso a 32 ETH, che devono essere depositati nel contratto di deposito. **Questo è un impegno a lungo termine - non è ancora possibile ritirare questi ETH!**. Questo deposito può essere eseguito seguendo la guida passo-passo sul [Launchpad](https://launchpad.ethereum.org/). Fallo su un computer desktop/portatile, ma non generare chiavi - questo puoi farlo direttamente sul Raspberry Pi.

Apri un terminale sul Raspberry Pi ed esegui il seguente comando per generare le chiavi di deposito:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

Mantieni al sicuro la frase mnemonica! Il suddetto comando ha generato due file nel keystore del nodo: le chiavi del validatore e un file dei dati di deposito. I dati di deposito devono essere caricati nel launchpad, quindi devono esser copiati dal Raspberry Pi nel PC/portatile. Questo si può fare usando una connessione ssh o qualsiasi altro metodo copia/incolla.

Una volta che il file dei dati di deposito è disponibile sul computer che esegue il launchpad, può essere selezionato e trascinato sul `+` nella schermata del launchpad. Segui le istruzioni sullo schermo per inviare una transazione al contratto di deposito.

Tornando al Raspberry Pi, può essere avviato un validatore. Ciò richiede l'importazione delle chiavi del validatore, l'impostazione dell'indirizzo per incassare le ricompense e successivamente l'avvio del processo pre-configurato del validatore. Gli esempi seguenti sono per Lighthouse, le istruzioni per gli altri client di consenso sono disponibili nella [documentazione di Ethereum su Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# importa le chiavi del validatore
lighthouse-kl account validator import --lighthouse account validator import --directory=/home/ethereum/validator_keys

# imposta l'indirizzo di ricompensa
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# avvia il validatore
sudo systemctl start lighthouse-validator
```

Congratulazioni, hai ora un nodo di Ethereum completo e un validatore in esecuzione su un Raspberry Pi!

## Maggiori dettagli {#more-details}

Questa pagina ha fornito una panoramica di come configurare un nodo Geth-Lighthouse e validatore utilizzando Raspberry Pi. Istruzioni più dettagliate sono disponibili sul sito web [Ethereum-su-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Ogni feedback è benvenuto {#feedback-appreciated}

Sappiamo che Raspberry Pi ha un'enorme base di utenti che potrebbe avere un impatto molto positivo sulla salute della rete di Ethereum. Sei pregato di approfondire i dettagli in questo tutorial, provare a eseguirlo su altre reti di prova, dare un'occhiata al GitHub di Ethereum su Arm, fornire feedback, creare ticket e richieste di pull e aiutare a far progredire la tecnologia e la documentazione!

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
