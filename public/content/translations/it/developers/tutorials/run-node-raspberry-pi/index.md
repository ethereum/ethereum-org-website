---
title: Esegui un nodo Ethereum su Raspberry Pi 4
description: Esegui il flashing del Raspberry Pi 4, collega un cavo Ethernet, collega il disco SSD e accendi il dispositivo per trasformare Raspberry Pi 4 in un nodo completo di Ethereum + validatore
author: "EthereumOnArm"
tags:
  [
    "client",
    "livello di esecuzione",
    "livello di consenso",
    "nodi"
  ]
lang: it
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm è un'immagine Linux personalizzata che può trasformare un Raspberry Pi in un nodo Ethereum.**

Per usare Ethereum on Arm per trasformare un Raspberry Pi in un nodo Ethereum, si consiglia il seguente hardware:

- Scheda Raspberry 4 (modello B 8GB), Odroid M1 o Rock 5B (8GB/16GB RAM)
- Scheda MicroSD (minimo 16 GB Classe 10)
- SSD da minimo 2 TB, disco USB 3.0 o una SSD con un case da USB a SATA.
- Alimentatore
- Cavo ethernet
- Inoltro della porta (vedi client per maggiori informazioni)
- Un case con dissipatore di calore e ventola
- Tastiera USB, monitor e cavo HDMI (micro-HDMI) (facoltativo)

## Perché eseguire Ethereum su ARM? {#why-run-ethereum-on-arm}

Le schede ARM sono computer molto convenienti, flessibili e di dimensioni ridotte. Sono un'ottima scelta per l'esecuzione di nodi Ethereum perché sono economiche, possono essere configurate in modo che tutte le loro risorse si concentrino solo sul nodo, rendendole efficienti, consumano poca energia e sono fisicamente piccole, quindi possono essere collocate con discrezione in qualsiasi casa. È anche molto facile avviare i nodi, perché è possibile eseguire semplicemente il flash della MicroSD del Raspberry Pi con un'immagine precompilata, senza bisogno di scaricare o creare alcun software.

## Come funziona? {#how-does-it-work}

Sulla scheda di memoria del Raspberry Pi viene eseguito il flash di un'immagine precompilata. Questa immagine contiene tutto il necessario per eseguire un nodo Ethereum. Con una scheda su cui è stato eseguito il flash, tutto ciò che l'utente deve fare è accendere il Raspberry Pi. Tutti i processi necessari per l'esecuzione del nodo vengono avviati automaticamente. Questo funziona perché la scheda di memoria contiene un sistema operativo basato su Linux (OS) su cui vengono eseguiti automaticamente i processi a livello di sistema che trasformano l'unità in un nodo Ethereum.

Ethereum non può essere eseguito utilizzando il popolare sistema operativo Linux per Raspberry Pi "Raspbian" perché Raspbian utilizza ancora un'architettura a 32 bit, che causa problemi di memoria agli utenti di Ethereum, e i client di consenso non supportano i file binari a 32 bit. Per ovviare a questo problema, il team di Ethereum on Arm è passato a un sistema operativo nativo a 64 bit chiamato "Armbian".

**Le immagini si occupano di tutti i passaggi necessari**, dalla configurazione dell'ambiente e dalla formattazione del disco SSD, all'installazione e all'esecuzione del software di Ethereum, fino all'avvio della sincronizzazione della blockchain.

## Nota sui client di esecuzione e di consenso {#note-on-execution-and-consensus-clients}

L'immagine di Ethereum on Arm include client di esecuzione e di consenso precompilati come servizi. Un nodo Ethereum richiede che entrambi i client siano sincronizzati e in esecuzione. Devi solo scaricare l'immagine, eseguirne il flash e quindi avviare i servizi. L'immagine è precaricata con i seguenti client di esecuzione:

- Geth
- Nethermind
- Besu

e i seguenti client di consenso:

- Lighthouse
- Nimbus
- Prysm
- Teku

Dovresti sceglierne uno per ciascun tipo da eseguire: tutti i client di esecuzione sono compatibili con tutti i client di consenso. Se non selezioni esplicitamente un client, il nodo tornerà ai suoi valori predefiniti, Geth e Lighthouse, e li eseguirà automaticamente all'accensione della scheda. Devi aprire la porta 30303 sul tuo router in modo che Geth possa trovare i peer e connettersi a essi.

## Download dell'immagine {#downloading-the-image}

L'immagine Ethereum per Raspberry Pi 4 è un'immagine "plug and play" che installa e configura automaticamente sia il client di esecuzione sia quello di consenso, impostandoli in modo che comunichino tra loro e si connettano alla rete di Ethereum. Tutto ciò che l'utente deve fare è avviare i processi utilizzando un semplice comando.

Scarica l'immagine per Raspberry Pi da [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) e verifica l'hash SHA256:

```sh
# Dalla directory contenente l'immagine scaricata
shasum -a 256 ethonarm_22.04.00.img.zip
# L'output dell'hash dovrebbe essere: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Si noti che le immagini per le schede Rock 5B e Odroid M1 sono disponibili nella [pagina dei download](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) di Ethereum-on-Arm.

## Flash della MicroSD {#flashing-the-microsd}

La scheda MicroSD che userai per il Raspberry Pi deve essere prima inserita in un computer desktop o portatile per poterne eseguire il flash. Successivamente, i seguenti comandi da terminale eseguiranno il flash dell'immagine scaricata sulla scheda SD:

```shell
# controlla il nome della scheda MicroSD
sudo fdisk -l

>> sdxxx
```

È davvero importante inserire il nome corretto, perché il comando successivo include `dd`, che cancella completamente il contenuto esistente della scheda prima di copiarvi l'immagine. Per continuare, naviga fino alla directory contenente l'immagine zippata:

```shell
# decomprimi ed esegui il flash dell'immagine
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Ora che sulla scheda è stato eseguito il flash, puoi inserirla nel Raspberry Pi.

## Avviare il nodo {#start-the-node}

Con la scheda SD inserita nel Raspberry Pi, connetti il cavo Ethernet e la SSD, poi accendilo. Il sistema operativo si avvierà e avvierà automaticamente l'esecuzione delle attività preconfigurate che trasformeranno il Raspberry Pi in un nodo Ethereum, compresa l'installazione e la creazione del software client. Ciò richiederà probabilmente da 10 a 15 minuti.

Una volta installato e configurato tutto, accedi al dispositivo tramite una connessione ssh o usando il terminale direttamente se alla scheda sono collegati un monitor e una tastiera. Usa l'account `ethereum` per accedere, in quanto ha i permessi necessari per avviare il nodo.

```shell
Utente: ethereum
Password: ethereum
```

Il client di esecuzione predefinito, Geth, si avvierà automaticamente. Puoi confermarlo controllando i log tramite il seguente comando da terminale:

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

Si noti che il client di consenso si sincronizzerà in pochi minuti perché utilizza la sincronizzazione da checkpoint. Il client di esecuzione richiederà più tempo, potenzialmente diverse ore, e non si avvierà finché il client di consenso non avrà terminato la sincronizzazione (questo perché il client di esecuzione ha bisogno di un obiettivo a cui sincronizzarsi, che viene fornito dal client di consenso sincronizzato).

Con i servizi Geth e Lighthouse in esecuzione e sincronizzati, il tuo Raspberry Pi è ora un nodo Ethereum! Il modo più comune per interagire con la rete di Ethereum è usare la console Javascript di Geth, che può essere collegata al client di Geth sulla porta 8545. È anche possibile inviare comandi formattati come oggetti JSON utilizzando uno strumento di richiesta come Curl. Ulteriori informazioni nella [documentazione di Geth](https://geth.ethereum.org/).

Geth è preconfigurato per inviare le metriche a una dashboard di Grafana, che può essere visualizzata nel browser. Gli utenti più avanzati potrebbero voler utilizzare questa funzione per monitorare lo stato di salute del proprio nodo accedendo a `ipaddress:3000`, e inserendo `user: admin` e `passwd: ethereum`.

## Validatori {#validators}

È anche possibile aggiungere facoltativamente un validatore al client di consenso. Il software del validatore permette al tuo nodo di partecipare attivamente al consenso e fornisce sicurezza crittoeconomica alla rete. Per questo lavoro, sarai ricompensato in ETH. Per eseguire un validatore, devi prima possedere 32 ETH, che devono essere depositati nel contratto di deposito. Il deposito può essere effettuato seguendo la guida dettagliata sul [Launchpad](https://launchpad.ethereum.org/). Esegui questa operazione su un computer desktop/portatile, ma non generare le chiavi: puoi farlo direttamente sul Raspberry Pi.

Apri un terminale sul Raspberry Pi ed esegui il seguente comando per generare le chiavi di deposito:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(In alternativa, scarica [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) per eseguirlo su una macchina air-gapped ed esegui il comando `deposit new-mnemnonic`)

Conserva la frase mnemonica in un posto sicuro! Il comando precedente ha generato due file nel keystore del nodo: le chiavi del validatore e un file di dati di deposito. I dati di deposito devono essere caricati nel launchpad, quindi devono essere copiati dal Raspberry Pi al desktop/laptop. Puoi farlo usando una connessione ssh o qualsiasi altro metodo di copia e incolla.

Una volta che il file dei dati di deposito è disponibile sul computer che esegue il Launchpad, può essere trascinato e rilasciato sul `+` nella schermata del Launchpad. Segui le istruzioni sullo schermo per inviare una transazione al contratto di deposito.

Tornando al Raspberry Pi, può essere avviato un validatore. Ciò richiede l'importazione delle chiavi del validatore, l'impostazione dell'indirizzo per riscuotere le ricompense e quindi l'avvio della procedura preconfigurata del validatore. L'esempio seguente è per Lighthouse; le istruzioni per altri client di consenso sono disponibili nella [documentazione di Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# importa le chiavi del validatore
lighthouse account validator import --directory=/home/ethereum/validator_keys

# imposta l'indirizzo della ricompensa
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# avvia il validatore
sudo systemctl start lighthouse-validator
```

Congratulazioni, ora hai un nodo Ethereum completo e un validatore in esecuzione su un Raspberry Pi!

## Ulteriori dettagli {#more-details}

Questa pagina ha fornito una panoramica su come configurare un nodo e un validatore Geth-Lighthouse utilizzando un Raspberry Pi. Istruzioni più dettagliate sono disponibili sul [sito web di Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Il feedback è gradito {#feedback-appreciated}

Sappiamo che il Raspberry Pi ha un'enorme base di utenti che potrebbe avere un impatto molto positivo sulla salute della rete di Ethereum.
Approfondisci i dettagli di questa guida, prova a eseguire su reti di prova, consulta il GitHub di Ethereum on Arm, fornisci feedback, segnala problemi e invia pull request per contribuire al progresso della tecnologia e della documentazione!

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
