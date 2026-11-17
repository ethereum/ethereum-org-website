---
title: Come sviluppare e testare una dapp su una testnet locale multi-client
description: "Questa guida ti illustrerà prima come istanziare e configurare una testnet locale multi-client di Ethereum prima di utilizzare la testnet per distribuire e testare una dapp."
author: "Tedi Mitiku"
tags:
  [
    "client",
    "nodi",
    "smart contract",
    "componibilità",
    "livello di consenso",
    "livello di esecuzione",
    "test",
  ]
skill: intermediate
breadcrumb: Testnet multi-client
lang: it
published: 2023-04-11
---

## Introduzione {#introduction}

Questa guida ti illustra il processo di istanziazione di una testnet locale configurabile di Ethereum, la distribuzione di uno smart contract su di essa e l'utilizzo della testnet per eseguire test sulla tua applicazione decentralizzata (dapp). Questa guida è pensata per gli sviluppatori di dapp che desiderano sviluppare e testare le loro dapp localmente su diverse configurazioni di rete prima di distribuirle su una testnet live o sulla Mainnet.

In questa guida, imparerai a:

- Istanziare una testnet locale di Ethereum con il [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) utilizzando [Kurtosis](https://www.kurtosis.com/),
- Connettere il tuo ambiente di sviluppo di dapp Hardhat alla testnet locale per compilare, distribuire e testare una dapp, e
- Configurare la testnet locale, inclusi parametri come il numero di nodi e gli abbinamenti specifici di client EL/CL, per abilitare i flussi di lavoro di sviluppo e test su varie configurazioni di rete.

### Cos'è Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) è un sistema di build componibile progettato per configurare ambienti di test multi-container. Consente specificamente agli sviluppatori di creare ambienti riproducibili che richiedono una logica di configurazione dinamica, come le testnet della blockchain.

In questa guida, il `ethereum-package` di Kurtosis, mantenuto da [ethPandaOps](https://ethpandaops.io/), avvia una testnet locale di Ethereum. Supporta tutti i principali client del livello di esecuzione (EL), come [`geth`](https://geth.ethereum.org/), e client del livello di consenso (CL), come [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) e [`lodestar`](https://lodestar.chainsafe.io/). Questo pacchetto funge da alternativa configurabile e componibile alle reti in framework come Hardhat Network e Anvil. Kurtosis offre agli sviluppatori un maggiore controllo e flessibilità sulle testnet che utilizzano, il che è uno dei motivi principali per cui i team dei client di Ethereum lo usano per testare gli aggiornamenti della rete.

## Configurazione di Kurtosis {#setting-up-kurtosis}

Prima di procedere, assicurati di aver:

- [Installato e avviato il motore Docker](https://docs.kurtosis.com/install/#i-install--start-docker) sulla tua macchina locale
- [Installato la CLI di Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (o aggiornata all'ultima versione, se hai già installato la CLI)
- Installato [Node.js](https://nodejs.org/en) (per il tuo ambiente dapp)

## Istanziare una testnet locale di Ethereum {#instantiate-testnet}

Per avviare una testnet locale di Ethereum, esegui:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Nota: questo comando nomina la tua rete "local-eth-testnet" utilizzando il flag `--enclave`.

Kurtosis stamperà i passaggi che sta eseguendo internamente mentre lavora per interpretare, convalidare e quindi eseguire le istruzioni. Alla fine, stampa un riepilogo dell'enclave che ha creato. Il riepilogo include un elenco di **artefatti di file** (files artifacts) e un elenco di **servizi utente** (user services). Con la configurazione predefinita, i servizi utente includono un singolo nodo:

- `el-1-geth-lighthouse`, il client di esecuzione `geth`
- `cl-1-lighthouse-geth`, il nodo beacon `lighthouse`
- `vc-1-geth-lighthouse`, il client validatore `lighthouse`

Ogni servizio è elencato con le porte che espone e la porta locale a cui ciascuna è mappata. Ad esempio, la porta `rpc` del servizio `el-1-geth-lighthouse` è l'endpoint JSON-RPC che utilizzeranno i tuoi strumenti per dapp. I servizi esatti e i numeri di porta saranno diversi sulla tua macchina.

Puoi visualizzare nuovamente questo riepilogo in qualsiasi momento eseguendo:

```sh
kurtosis enclave inspect local-eth-testnet
```

Congratulazioni! Hai utilizzato Kurtosis per istanziare una testnet locale di Ethereum, con un client CL (`lighthouse`) e un client EL (`geth`), su Docker.

### Riepilogo {#review-instantiate-testnet}

In questa sezione, hai eseguito un comando che ha indicato a Kurtosis di utilizzare il [`ethereum-package` ospitato in remoto su GitHub](https://github.com/ethpandaops/ethereum-package) per avviare una testnet locale di Ethereum all'interno di un'[Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) di Kurtosis. All'interno della tua enclave, troverai sia gli "artefatti di file" che i "servizi utente".

Gli [Artefatti di file](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) nella tua enclave includono tutti i dati generati e utilizzati per avviare i client EL e CL, come i file di genesi e le chiavi del validatore. I dati di genesi sono stati creati utilizzando l'[ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

I servizi utente mostrano tutti i servizi containerizzati operativi nella tua enclave. Noterai che è stato creato un singolo nodo, che presenta sia un client EL che un client CL.

## Connettere l'ambiente di sviluppo della dapp alla testnet locale di Ethereum {#connect-your-dapp}

### Configurare l'ambiente di sviluppo della dapp {#set-up-dapp-env}

Ora che hai una testnet locale in esecuzione, puoi connettere il tuo ambiente di sviluppo della dapp per utilizzare la tua testnet locale. In questa guida verrà utilizzato il framework Hardhat per distribuire una dapp di blackjack sulla tua testnet locale.

Per configurare il tuo ambiente di sviluppo della dapp, clona il repository che contiene la nostra dapp di esempio e installa le sue dipendenze, esegui:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

Il flag `--legacy-peer-deps` è necessario perché alcuni dei plugin Hardhat del progetto di esempio dichiarano versioni di dipendenze peer in conflitto.

La cartella [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) utilizzata qui contiene la configurazione tipica per uno sviluppatore di dapp che utilizza il framework [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) contiene alcuni semplici smart contract per una dapp di Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) contiene uno script per distribuire un contratto di token sulla tua rete locale di Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) contiene un semplice test .js per il tuo contratto di token per confermare che ogni giocatore nella nostra dapp di Blackjack abbia 1000 token coniati per lui
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) configura la tua installazione di Hardhat

### Configurare Hardhat per utilizzare la testnet locale {#configure-hardhat}

Con il tuo ambiente di sviluppo della dapp configurato, ora connetterai Hardhat per utilizzare la testnet locale di Ethereum generata utilizzando Kurtosis. Per prima cosa, trova l'indirizzo locale dell'endpoint JSON-RPC del client di esecuzione:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

L'output è un URL come `http://127.0.0.1:32769`. La tua porta sarà diversa. Sostituisci `<PORT>` nella struttura `localnet` nel tuo file di configurazione `hardhat.config.ts` con questa porta.

Esempio in `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: SOSTITUIRE <PORT> CON LA PORTA DI UN URI DEL NODO PRODOTTO DAL PACCHETTO KURTOSIS DELLA RETE ETH
  // Queste sono chiavi private associate ad account di test prefinanziati creati dall'eth-network-package
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

Queste chiavi private sono chiavi di test note pubblicamente. Non usarle mai sulla Mainnet o su qualsiasi rete pubblica.

Una volta salvato il file, il tuo ambiente di sviluppo della dapp Hardhat è ora connesso alla tua testnet locale di Ethereum! Puoi verificare che la tua testnet funzioni eseguendo:

```sh
npx hardhat balances --network localnet
```

L'output elenca l'indirizzo e il saldo di ciascuno degli account sopra indicati. Ad esempio, la prima riga dovrebbe apparire così:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

Questo conferma che Hardhat sta utilizzando la tua testnet locale e rileva gli account prefinanziati creati dal `ethereum-package`.

### Distribuire e testare la tua dapp localmente {#deploy-and-test-dapp}

Con l'ambiente di sviluppo della dapp completamente connesso alla testnet locale di Ethereum, ora puoi eseguire flussi di lavoro di sviluppo e test sulla tua dapp utilizzando la testnet locale.

Per compilare e distribuire lo smart contract `ChipToken.sol` per la prototipazione e lo sviluppo locale, esegui:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

L'output dovrebbe apparire simile a:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Ora prova a eseguire il test `ChipToken.js` sulla tua dapp locale per confermare che ogni giocatore nella nostra dapp di Blackjack abbia 1000 token coniati per lui. Il test di esempio utilizza ancora la funzione `deployed()` di ethers v5, che ethers v6 ha sostituito con `waitForDeployment()`, quindi aggiornala prima:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Quindi esegui il test:

```sh
npx hardhat test --network localnet
```

L'output dovrebbe apparire simile a questo:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Riepilogo {#review-dapp-workflows}

A questo punto, hai configurato un ambiente di sviluppo per dapp, lo hai connesso a una rete locale di Ethereum creata da Kurtosis e hai compilato, distribuito ed eseguito un semplice test sulla tua dapp.

Ora esploriamo come puoi configurare la rete sottostante per testare le nostre dapp in diverse configurazioni di rete.

## Configurare la testnet locale di Ethereum {#configure-testnet}

### Modificare le configurazioni dei client e il numero di nodi {#configure-client-config-and-num-nodes}

La tua testnet locale di Ethereum può essere configurata per utilizzare diverse coppie di client EL e CL, nonché un numero variabile di nodi, a seconda dello scenario e della configurazione di rete specifica che desideri sviluppare o testare. Ciò significa che, una volta configurata, puoi avviare una testnet locale personalizzata e utilizzarla per eseguire gli stessi flussi di lavoro (distribuzione, test, ecc.) in varie configurazioni di rete per assicurarti che tutto funzioni come previsto. Per saperne di più sugli altri parametri che puoi modificare, consulta [la documentazione di configurazione del `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

Fai una prova! Puoi passare varie opzioni di configurazione al `ethereum-package` tramite un file YAML. Questo file dei parametri di rete fornisce le configurazioni specifiche che Kurtosis utilizzerà per configurare la rete locale di Ethereum.

Crea un file chiamato `network_params.yaml` che avvia tre nodi con diverse coppie EL/CL:

- Nodo 1 con `geth`/`lighthouse`
- Nodo 2 con `geth`/`lodestar`
- Nodo 3 con `geth`/`teku`

Questa configurazione crea una rete eterogenea di implementazioni di nodi Ethereum per testare la tua dapp. Il tuo file di configurazione dovrebbe apparire così:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

Ogni voce in `participants` è mappata a un nodo nella rete, quindi 3 voci `participants` indicheranno a Kurtosis di avviare 3 nodi nella tua rete. Ogni voce ti consente di specificare la coppia EL e CL utilizzata per quel nodo specifico. Tutti i parametri che non specifichi mantengono i loro valori predefiniti.

La struttura `network_params` configura le impostazioni di rete che vengono utilizzate per creare i file di genesi per ogni nodo, nonché altre impostazioni come i secondi per slot della rete.

Salva il tuo file dei parametri e poi usalo per eseguire il tuo pacchetto Kurtosis eseguendo:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Nota: il comando `kurtosis clean -a` viene utilizzato qui per indicare a Kurtosis di distruggere la vecchia testnet e i suoi contenuti prima di avviarne una nuova.

Ancora una volta, Kurtosis lavorerà per un po' e stamperà i singoli passaggi in corso. Alla fine, stampa il riepilogo dell'enclave. Questa volta, i servizi utente includono tre nodi, ad esempio `el-1-geth-lighthouse`, `el-2-geth-lodestar` e `el-3-geth-teku` per i client di esecuzione, insieme ai client di consenso e validatori corrispondenti.

Congratulazioni! Hai configurato con successo la tua testnet locale per avere 3 nodi invece di 1. Per eseguire gli stessi flussi di lavoro che hai fatto prima sulla tua dapp (distribuzione e test), esegui le stesse operazioni che abbiamo fatto prima sostituendo la `<PORT>` nella struttura `localnet` nel tuo file di configurazione `hardhat.config.ts` con la porta `rpc` di qualsiasi servizio `el-<num>-...` nella tua nuova testnet locale a 3 nodi.

## Conclusione {#conclusion}

E questo è tutto! Per riassumere questa breve guida, hai:

- Creato una testnet locale di Ethereum su Docker utilizzando Kurtosis
- Connesso il tuo ambiente di sviluppo locale per dapp alla rete locale di Ethereum
- Distribuito una dapp ed eseguito un semplice test su di essa sulla rete locale di Ethereum
- Configurato la rete Ethereum sottostante per avere 3 nodi

Ci piacerebbe sapere da te cosa è andato bene, cosa potrebbe essere migliorato o rispondere a qualsiasi tua domanda. Non esitare a contattarci tramite [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)!

### Altri esempi e guide {#other-examples-guides}

Ti invitiamo a dare un'occhiata alla nostra [guida rapida](https://docs.kurtosis.com/quickstart) e agli altri nostri esempi nel nostro [repository awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis).

Il `ethereum-package` può anche avviare servizi aggiuntivi insieme alla tua rete, come uno spammer di transazioni (per simulare transazioni), un block explorer e istanze connesse di Grafana e Prometheus. Per abilitarli, elencali sotto `additional_services` nel tuo file dei parametri, come descritto nella [documentazione del pacchetto](https://github.com/ethpandaops/ethereum-package#configuration).
