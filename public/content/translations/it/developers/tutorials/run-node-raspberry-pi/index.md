---
title: Esegui un nodo di Ethereum su Raspberry Pi 4
description: Flasha il tuo Raspberry Pi 4, collega un cavo ethernet, connetti il disco SSD e accendi il dispositivo per trasformare il Raspberry Pi 4 in un nodo completo di Ethereum + validatore
author: "EthereumOnArm"
tags: ["client", "livello di esecuzione", "livello di consenso", "nodi"]
lang: it
skill: intermediate
breadcrumb: Nodo Rasp Pi
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm è un'immagine Linux personalizzata che può trasformare un Raspberry Pi in un nodo di Ethereum.**

Per utilizzare Ethereum on Arm per trasformare un Raspberry Pi in un nodo di Ethereum, si consiglia il seguente hardware:

- Scheda Raspberry 4 (modello B 8GB), Odroid M1 o Rock 5B (8GB/16GB RAM)
- Scheda MicroSD (minimo 16 GB Classe 10)
- Disco SSD USB 3.0 da minimo 2 TB o un SSD con un case da USB a SATA.
- Alimentatore
- Cavo Ethernet
- Inoltro delle porte (vedi i client per ulteriori informazioni)
- Un case con dissipatore e ventola
- Tastiera USB, monitor e cavo HDMI (micro-HDMI) (Opzionale)

## Perché eseguire Ethereum su ARM? {#why-run-ethereum-on-arm}

Le schede ARM sono computer molto convenienti, flessibili e di piccole dimensioni. Sono ottime scelte per eseguire i nodi di Ethereum perché possono essere acquistate a basso costo, configurate in modo che tutte le loro risorse si concentrino solo sul nodo, rendendole efficienti, consumano basse quantità di energia e sono fisicamente piccole, in modo da potersi adattare in modo discreto in qualsiasi casa. È anche molto facile avviare i nodi perché la MicroSD del Raspberry Pi può essere semplicemente flashata con un'immagine precompilata, senza dover scaricare o compilare alcun software.

## Come funziona? {#how-does-it-work}

La scheda di memoria del Raspberry Pi viene flashata con un'immagine precompilata. Questa immagine contiene tutto il necessario per eseguire un nodo di Ethereum. Con una scheda flashata, tutto ciò che l'utente deve fare è accendere il Raspberry Pi. Tutti i processi necessari per eseguire il nodo vengono avviati automaticamente. Questo funziona perché la scheda di memoria contiene un sistema operativo (OS) basato su Linux su cui vengono eseguiti automaticamente processi a livello di sistema che trasformano l'unità in un nodo di Ethereum.

Ethereum non può essere eseguito utilizzando il popolare sistema operativo Linux per Raspberry Pi "Raspbian" perché Raspbian utilizza ancora un'architettura a 32 bit che porta gli utenti di Ethereum a riscontrare problemi di memoria e i client di consenso non supportano i binari a 32 bit. Per superare questo problema, il team di Ethereum on Arm è migrato a un sistema operativo nativo a 64 bit chiamato "Armbian".

**Le immagini si occupano di tutti i passaggi necessari**, dalla configurazione dell'ambiente e la formattazione del disco SSD all'installazione e all'esecuzione del software di Ethereum, nonché all'avvio della sincronizzazione della blockchain.

## Nota sui client di esecuzione e di consenso {#note-on-execution-and-consensus-clients}

L'immagine di Ethereum on Arm include client di esecuzione e client di consenso precompilati come servizi. Un nodo di Ethereum richiede che entrambi i client siano sincronizzati e in esecuzione. Ti è richiesto solo di scaricare e flashare l'immagine e poi avviare i servizi. L'immagine è precaricata con i seguenti client di esecuzione:

- Geth
- Nethermind
- Besu

e i seguenti client di consenso:

- Lighthouse
- Nimbus
- Prysm
- Teku

Dovresti sceglierne uno per ciascun tipo da eseguire: tutti i client di esecuzione sono compatibili con tutti i client di consenso. Se non selezioni esplicitamente un client, il nodo ripiegherà sui suoi predefiniti - Geth e Lighthouse - e li eseguirà automaticamente all'accensione della scheda. Devi aprire la porta 30303 sul tuo router in modo che Geth possa trovare e connettersi ai peer.

## Scaricare l'immagine {#downloading-the-image}

L'immagine di Ethereum per Raspberry Pi 4 è un'immagine "plug and play" che installa e configura automaticamente sia il client di esecuzione che il client di consenso, configurandoli per comunicare tra loro e connettersi alla rete di Ethereum. Tutto ciò che l'utente deve fare è avviare i loro processi utilizzando un semplice comando.

Scarica l'immagine per Raspberry Pi da [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) e verifica l'hash SHA256:

```sh
# Dalla directory contenente l'immagine scaricata
shasum -a 256 ethonarm_22.04.00.img.zip
# L'hash dovrebbe dare come output: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Nota che le immagini per le schede Rock 5B e Odroid M1 sono disponibili alla [pagina dei download](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) di Ethereum-on-Arm.

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
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

La scheda è ora flashata, quindi può essere inserita nel Raspberry Pi.

## Avviare il nodo {#start-the-node}

Con la scheda SD inserita nel Raspberry Pi, collega il cavo ethernet e l'SSD, quindi accendi l'alimentazione. Il sistema operativo si avvierà e inizierà automaticamente a eseguire le attività preconfigurate che trasformano il Raspberry Pi in un nodo di Ethereum, inclusa l'installazione e la compilazione del software del client. Questo richiederà probabilmente 10-15 minuti.

Una volta che tutto è installato e configurato, accedi al dispositivo tramite una connessione ssh o utilizzando direttamente il terminale se un monitor e una tastiera sono collegati alla scheda. Usa l'account `ethereum` per accedere, poiché questo ha i permessi necessari per avviare il nodo.

```shell
User: ethereum
Password: ethereum
```

Il client di esecuzione predefinito, Geth, si avvierà automaticamente. Puoi confermarlo controllando i log utilizzando il seguente comando da terminale:

```sh
sudo journalctl -u geth -f
```

Il client di consenso deve essere avviato esplicitamente. Per farlo, apri prima la porta 9000 sul tuo router in modo che Lighthouse possa trovare e connettersi ai peer. Quindi abilita e avvia il servizio lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Controlla il client utilizzando i log:

```sh
sudo journalctl -u lighthouse-beacon
```

Nota che il client di consenso si sincronizzerà in pochi minuti perché utilizza la sincronizzazione dei checkpoint. Il client di esecuzione impiegherà più tempo - potenzialmente diverse ore, e non si avvierà finché il client di consenso non avrà già terminato la sincronizzazione (questo perché il client di esecuzione ha bisogno di un bersaglio a cui sincronizzarsi, che il client di consenso sincronizzato fornisce).

Con i servizi Geth e Lighthouse in esecuzione e sincronizzati, il tuo Raspberry Pi è ora un nodo di Ethereum! È molto comune interagire con la rete di Ethereum utilizzando la console Javascript di Geth, che può essere collegata al client Geth sulla porta 8545. È anche possibile inviare comandi formattati come oggetti JSON utilizzando uno strumento di richiesta come Curl. Vedi di più nella [documentazione di Geth](https://geth.ethereum.org/).

Geth è preconfigurato per segnalare le metriche a una dashboard di Grafana che può essere visualizzata nel browser. Gli utenti più avanzati potrebbero voler utilizzare questa funzione per monitorare lo stato di salute del loro nodo navigando su `ipaddress:3000`, passando `user: admin` e `passwd: ethereum`.

## Validatori {#validators}

Un validatore può anche essere aggiunto opzionalmente al client di consenso. Il software del validatore consente al tuo nodo di partecipare attivamente al consenso e fornisce alla rete sicurezza criptoeconomica. Vieni ricompensato per questo lavoro in ETH. Per eseguire un validatore, devi prima avere 32 ETH, che devono essere depositati nel contratto di deposito. Il deposito può essere effettuato seguendo la guida passo-passo sul [Launchpad](https://launchpad.ethereum.org/). Fallo su un computer desktop/laptop, ma non generare le chiavi — questo può essere fatto direttamente sul Raspberry Pi.

Apri un terminale sul Raspberry Pi ed esegui il seguente comando per generare le chiavi di deposito:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Oppure scarica la [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) per eseguirla su una macchina isolata dalla rete (airgapped), ed esegui il comando `deposit new-mnemnonic`)

Tieni al sicuro la frase mnemonica! Il comando precedente ha generato due file nel keystore del nodo: le chiavi del validatore e un file dei dati di deposito. I dati di deposito devono essere caricati nel launchpad, quindi devono essere copiati dal Raspberry Pi al computer desktop/laptop. Questo può essere fatto utilizzando una connessione ssh o qualsiasi altro metodo di copia/incolla.

Una volta che il file dei dati di deposito è disponibile sul computer che esegue il launchpad, può essere trascinato e rilasciato sul `+` nella schermata del launchpad. Segui le istruzioni sullo schermo per inviare una transazione al contratto di deposito.

Tornando al Raspberry Pi, può essere avviato un validatore. Questo richiede l'importazione delle chiavi del validatore, l'impostazione dell'indirizzo per raccogliere le ricompense e quindi l'avvio del processo del validatore preconfigurato. L'esempio seguente è per Lighthouse—le istruzioni per altri client di consenso sono disponibili nei [documenti di Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# importa le chiavi del validatore
lighthouse account validator import --directory=/home/ethereum/validator_keys

# imposta l'indirizzo della ricompensa
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# avvia il validatore
sudo systemctl start lighthouse-validator
```

Congratulazioni, ora hai un nodo completo di Ethereum e un validatore in esecuzione su un Raspberry Pi!

## Maggiori dettagli {#more-details}

Questa pagina ha fornito una panoramica su come configurare un nodo Geth-Lighthouse e un validatore utilizzando Raspberry Pi. Istruzioni più dettagliate sono disponibili sul [sito web di Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Feedback apprezzato {#feedback-appreciated}

Sappiamo che il Raspberry Pi ha un'enorme base di utenti che potrebbe avere un impatto molto positivo sulla salute della rete di Ethereum.
Approfondisci i dettagli in questo tutorial, prova a eseguire sulle reti di test, dai un'occhiata al GitHub di Ethereum on Arm, fornisci feedback, apri issue e pull request e aiuta a far progredire la tecnologia e la documentazione!

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org