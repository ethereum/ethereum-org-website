---
title: Eseguire un nodo Ethereum su un Raspberry Pi 5
description: Flasha il tuo Raspberry Pi 5, collega un cavo ethernet, connetti il disco NVMe e accendi il dispositivo per trasformare il Raspberry Pi 5 in un nodo Ethereum completo + validatore
author: "EthereumOnArm"
tags: ["client", "livello di esecuzione", "livello di consenso", "nodi"]
lang: it
skill: intermediate
breadcrumb: Nodo Rasp Pi
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm è un'immagine Linux personalizzata che può trasformare un Raspberry Pi in un nodo Ethereum.**

Per utilizzare Ethereum on Arm per trasformare un Raspberry Pi in un nodo Ethereum, si consiglia il seguente hardware:

- Raspberry Pi 5 con 16 GB di RAM
- Un NVMe HAT per il Raspberry Pi 5, per collegare un disco NVMe
- SSD NVMe (M.2 2280), minimo 4 TB. Evita i dischi con un controller Phison, che presentano problemi di compatibilità noti.
- Scheda MicroSD (minimo 16 GB Classe 10)
- Alimentatore
- Cavo Ethernet
- Port forwarding (vedi i client per ulteriori informazioni)
- Un case con dissipatore di calore
- Tastiera USB, monitor e cavo HDMI (micro-HDMI) (Opzionale)

Ethereum on Arm supporta anche altre schede ARM, come NanoPC T6, Rock 5B e Orange Pi 5 Plus. Queste schede hanno il supporto NVMe nativo, quindi il team di Ethereum on Arm le consiglia rispetto al Raspberry Pi 5 se stai acquistando nuovo hardware. Consulta l'[elenco dell'hardware consigliato](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html) per i dettagli. Il resto di questo tutorial è lo stesso per tutte le schede supportate, ad eccezione del file immagine che scarichi.

## Perché eseguire Ethereum su ARM? {#why-run-ethereum-on-arm}

Le schede ARM sono computer piccoli, flessibili e molto convenienti. Sono ottime scelte per eseguire nodi Ethereum perché possono essere acquistate a basso costo, configurate in modo che tutte le loro risorse si concentrino solo sul nodo, rendendole efficienti, consumano basse quantità di energia e sono fisicamente piccole, quindi possono adattarsi in modo discreto in qualsiasi casa. È anche molto facile avviare i nodi perché la MicroSD del Raspberry Pi può essere semplicemente flashata con un'immagine precompilata, senza dover scaricare o compilare alcun software.

## Come funziona? {#how-does-it-work}

La scheda di memoria del Raspberry Pi viene flashata con un'immagine precompilata. Questa immagine contiene tutto il necessario per eseguire un nodo Ethereum. Con una scheda flashata, tutto ciò che l'utente deve fare è accendere il Raspberry Pi. Tutti i processi necessari per eseguire il nodo vengono avviati automaticamente. Questo funziona perché la scheda di memoria contiene un sistema operativo (OS) basato su Linux su cui vengono eseguiti automaticamente processi a livello di sistema che trasformano l'unità in un nodo Ethereum.

Le immagini di Ethereum on Arm sono basate su una distribuzione Linux a 64 bit ottimizzata per l'esecuzione di un nodo Ethereum e includono client Ethereum precompilati.

**Le immagini si occupano di tutti i passaggi necessari**, dalla configurazione dell'ambiente e dalla formattazione del disco NVMe all'installazione del software Ethereum.

## Nota sui client di esecuzione e di consenso {#note-on-execution-and-consensus-clients}

L'immagine di Ethereum on Arm include client di esecuzione e client di consenso precompilati come servizi. Un nodo Ethereum richiede che entrambi i client siano sincronizzati e in esecuzione. Ti è richiesto solo di scaricare e flashare l'immagine e poi avviare i servizi. L'immagine è precaricata con diversi client di esecuzione (come Geth, Nethermind, Besu, Erigon e Reth) e client di consenso (come Lighthouse, Prysm, Teku, Nimbus e Lodestar). Consulta la [documentazione di Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html) per l'elenco attuale.

Dovresti sceglierne uno per ciascun tipo da eseguire: tutti i client di esecuzione sono compatibili con tutti i client di consenso. Questo tutorial utilizza Geth e Lighthouse.

## Scaricare l'immagine {#downloading-the-image}

L'immagine di Ethereum on Arm è un'immagine "plug and play" che installa e configura automaticamente sia il client di esecuzione che il client di consenso, configurandoli per comunicare tra loro e connettersi alla rete Ethereum. Tutto ciò che l'utente deve fare è avviare i loro processi utilizzando un semplice comando.

Scarica l'ultima immagine per la tua scheda dalla [pagina di download di Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads). La pagina di download elenca anche il checksum SHA256 di ciascuna immagine. Verifica il file scaricato confrontandolo con esso:

```sh
# Dalla directory contenente l'immagine scaricata
sha256sum ethonarm_rpi5_<version>.img.zip
# Confronta l'output con il checksum sulla pagina di download
```

## Flashare la MicroSD {#flashing-the-microsd}

La scheda MicroSD che verrà utilizzata per il Raspberry Pi dovrebbe prima essere inserita in un computer desktop o laptop in modo che possa essere flashata. Quindi, i seguenti comandi da terminale flasheranno l'immagine scaricata sulla scheda SD:

```shell
# controlla il nome della scheda MicroSD
sudo fdisk -l

>> sdxxx
```

È davvero importante inserire il nome corretto perché il comando successivo include `dd` che cancella completamente il contenuto esistente della scheda prima di inserirvi l'immagine. Per continuare, naviga nella directory contenente l'immagine zippata:

```shell
# decomprimi e flasha l'immagine
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

La scheda è ora flashata, quindi può essere inserita nel Raspberry Pi.

## Avviare il nodo {#start-the-node}

Con la scheda SD inserita nel Raspberry Pi, collega il cavo ethernet e il disco NVMe, quindi accendi l'alimentazione. Il sistema operativo si avvierà e inizierà automaticamente a eseguire le attività preconfigurate che trasformano il Raspberry Pi in un nodo Ethereum, inclusa la formattazione del disco NVMe e l'installazione del software client. Questo richiederà probabilmente 10-15 minuti e la scheda si riavvierà automaticamente al termine. Non interrompere l'alimentazione durante questo periodo.

Una volta che tutto è installato e configurato, accedi al dispositivo tramite una connessione ssh o utilizzando direttamente il terminale se un monitor e una tastiera sono collegati alla scheda. Usa l'account `ethereum` per accedere, poiché questo ha i permessi necessari per avviare il nodo.

```shell
User: ethereum
Password: ethereum
```

Ti verrà chiesto di cambiare la password predefinita al tuo primo accesso. Fallo, perché chiunque possa raggiungere il tuo nodo potrebbe altrimenti accedere con la password predefinita. Il firewall di sistema è disabilitato per impostazione predefinita, quindi se il tuo nodo ha un indirizzo IP pubblico, consulta la [guida alla sicurezza di Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html) per abilitarlo.

Avvia prima il client di consenso. Apri la porta 9000 (TCP e UDP) sul tuo router in modo che Lighthouse possa trovare e connettersi ai peer. Quindi abilita e avvia il servizio lighthouse, in modo che si riavvii anche dopo un riavvio:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Controlla il client utilizzando i log:

```sh
sudo journalctl -u lighthouse-beacon -f
```

Successivamente, avvia il client di esecuzione. Apri la porta 30303 (TCP e UDP) sul tuo router in modo che Geth possa trovare e connettersi ai peer. Quindi abilita e avvia il servizio geth:

```sh
sudo systemctl enable --now geth
```

Puoi confermare che è in esecuzione controllando i log:

```sh
sudo journalctl -u geth -f
```

Nota che il client di consenso si sincronizzerà in pochi minuti perché utilizza la sincronizzazione tramite checkpoint. Il client di esecuzione impiegherà più tempo, potenzialmente diverse ore. Entrambi i client vengono eseguiti contemporaneamente: il client di consenso dice al client di esecuzione quale blocco è la testa della catena e il client di esecuzione scarica e verifica i blocchi fino ad esso.

Con i servizi Geth e Lighthouse in esecuzione e sincronizzati, il tuo Raspberry Pi è ora un nodo Ethereum! È più comune interagire con la rete Ethereum utilizzando la console JavaScript di Geth, che può essere collegata al client Geth sulla porta 8545. È anche possibile inviare comandi formattati come oggetti JSON utilizzando uno strumento di richiesta come Curl. Scopri di più nella [documentazione di Geth](https://geth.ethereum.org/).

L'immagine include anche una dashboard Grafana che gli utenti più avanzati possono utilizzare per monitorare lo stato di salute del proprio nodo, navigando su `ipaddress:3000` in un browser.

## Validatori {#validators}

Un validatore può anche essere aggiunto opzionalmente al client di consenso. Il software del validatore consente al tuo nodo di partecipare attivamente al consenso e fornisce alla rete sicurezza criptoeconomica. Vieni ricompensato per questo lavoro in ETH. Per eseguire un validatore, devi prima avere 32 ETH, che devono essere depositati nel contratto di deposito. Il deposito può essere effettuato seguendo la guida passo passo sul [Launchpad](https://launchpad.ethereum.org/). Fallo su un computer desktop/laptop, ma non generare le chiavi: questo può essere fatto direttamente sul Raspberry Pi.

Lo strumento [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) genera le chiavi del validatore. Le immagini attuali lo includono; se stai eseguendo un'immagine precedente, installalo prima. Quindi genera le chiavi di deposito, sostituendo `<YOUR_ETH_ADDRESS>` con l'indirizzo che dovrebbe ricevere i tuoi prelievi:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Oppure scarica [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) per eseguirlo su una macchina airgapped ed esegui lì il comando `deposit new-mnemonic`)

Conserva la frase mnemonica al sicuro! Il comando precedente ha generato due file nella directory `validator_keys`: le chiavi del validatore e un file di dati di deposito. I dati di deposito devono essere caricati nel launchpad, quindi devono essere copiati dal Raspberry Pi al computer desktop/laptop. Questo può essere fatto utilizzando una connessione ssh o qualsiasi altro metodo di copia/incolla.

Una volta che il file dei dati di deposito è disponibile sul computer che esegue il launchpad, può essere trascinato e rilasciato su `+` nella schermata del launchpad. Segui le istruzioni sullo schermo per inviare una transazione al contratto di deposito.

Tornando al Raspberry Pi, è possibile avviare un validatore. Ciò richiede l'importazione delle chiavi del validatore, l'impostazione dell'indirizzo per raccogliere le ricompense e quindi l'avvio del processo del validatore preconfigurato. L'esempio seguente è per Lighthouse: le istruzioni per altri client di consenso sono disponibili nei [documenti di Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html):

```shell
# importa le chiavi del validatore
lighthouse account validator import --directory=/home/ethereum/validator_keys

# imposta l'indirizzo per le ricompense (sostituisci <YOUR_ETH_ADDRESS> con il tuo indirizzo)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# avvia il validatore
sudo systemctl enable --now lighthouse-validator
```

Congratulazioni, ora hai un nodo Ethereum completo e un validatore in esecuzione su un Raspberry Pi!

## Maggiori dettagli {#more-details}

Questa pagina ha fornito una panoramica su come configurare un nodo Geth-Lighthouse e un validatore utilizzando Raspberry Pi. Istruzioni più dettagliate sono disponibili sul [sito web di Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Feedback apprezzato {#feedback-appreciated}

Sappiamo che il Raspberry Pi ha un'enorme base di utenti che potrebbe avere un impatto molto positivo sulla salute della rete Ethereum.
Approfondisci i dettagli in questo tutorial, prova a eseguire su testnet, dai un'occhiata a [Ethereum on Arm GitHub](https://github.com/EOA-Blockchain-Labs/ethereumonarm), fornisci feedback, apri issue e pull request e aiuta a far progredire la tecnologia e la documentazione!

## Riferimenti {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
