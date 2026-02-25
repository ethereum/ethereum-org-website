---
title: Come sviluppare e testare una dApp su una rete di test locale multi-client
description: "Questa guida ti illustrerà innanzitutto come creare un'istanza e configurare una rete di test di Ethereum locale multi-client prima di usare la rete di test per distribuire e testare una dApp."
author: "Tedi Mitiku"
tags:
  [
    "client",
    "nodi",
    "smart contract",
    "componibilità",
    "livello di consenso",
    "livello di esecuzione",
    "test"
  ]
skill: intermediate
lang: it
published: 2023-04-11
---

## Introduzione {#introduction}

Questa guida ti illustra il processo di creazione di un'istanza di una rete di test di Ethereum locale configurabile, la distribuzione di uno smart contract su di essa e l'utilizzo della rete di test per eseguire test sulla tua dApp. Questa guida è pensata per gli sviluppatori di dApp che vogliono sviluppare e testare le loro dApp localmente con diverse configurazioni di rete prima di distribuirle su una rete di test live o sulla rete principale.

In questa guida:

- Creare un'istanza di una rete di test di Ethereum locale con [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) usando [Kurtosis](https://www.kurtosis.com/),
- Connettere il tuo ambiente di sviluppo dApp Hardhat alla rete di test locale per compilare, distribuire e testare una dApp, e
- Configurare la rete di test locale, inclusi parametri come il numero di nodi e specifici abbinamenti di client EL/CL, per abilitare flussi di lavoro di sviluppo e test con varie configurazioni di rete.

### Cos'è Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) è un sistema di compilazione componibile progettato per la configurazione di ambienti di test multi-container. In particolare, permette agli sviluppatori di creare ambienti riproducibili che richiedono una logica di configurazione dinamica, come le reti di test blockchain.

In questa guida, il pacchetto eth-network-package di Kurtosis avvia una rete di test di Ethereum locale con supporto per il client del livello di esecuzione (EL) [`geth`](https://geth.ethereum.org/), nonché per i client del livello di consenso (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) e [`lodestar`](https://lodestar.chainsafe.io/). Questo pacchetto serve come alternativa configurabile e componibile alle reti in framework come Hardhat Network, Ganache e Anvil. Kurtosis offre agli sviluppatori un maggiore controllo e flessibilità sulle reti di test che usano, che è una delle ragioni principali per cui la [Ethereum Foundation ha usato Kurtosis per testare la Fusione](https://www.kurtosis.com/blog/testing-the-ethereum-merge) e continua a usarlo per testare gli aggiornamenti della rete.

## Configurazione di Kurtosis {#setting-up-kurtosis}

Prima di procedere, assicurati di avere:

- [Installato e avviato il motore Docker](https://docs.kurtosis.com/install/#i-install--start-docker) sulla tua macchina locale
- [Installato la CLI di Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (o aggiornata all'ultima versione, se hai già installato la CLI)
- Installato [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) e [npx](https://www.npmjs.com/package/npx) (per il tuo ambiente dApp)

## Creare un'istanza di una rete di test di Ethereum locale {#instantiate-testnet}

Per avviare una rete di test di Ethereum locale, esegui:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Nota: questo comando denomina la tua rete: "local-eth-testnet” usando il flag `--enclave`.

Kurtosis stamperà i passaggi che sta eseguendo "sotto il cofano" mentre lavora per interpretare, convalidare e quindi eseguire le istruzioni. Alla fine, dovresti vedere un output che assomiglia al seguente:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

Congratulazioni! Hai usato Kurtosis per creare un'istanza di una rete di test di Ethereum locale, con un client CL (`lighthouse`) e un client EL (`geth`), tramite Docker.

### Revisione {#review-instantiate-testnet}

In questa sezione, hai eseguito un comando che ha indirizzato Kurtosis a usare il [`eth-network-package` ospitato in remoto su GitHub](https://github.com/kurtosis-tech/eth-network-package) per avviare una rete di test di Ethereum locale all'interno di una [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) di Kurtosis. All'interno della tua enclave, troverai sia "file artifact" che "user service".

I [File Artifacts](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) nella tua enclave includono tutti i dati generati e utilizzati per l'avvio dei client EL e CL. I dati sono stati creati utilizzando il servizio `prelaunch-data-generator` creato da questa [immagine Docker](https://github.com/ethpandaops/ethereum-genesis-generator)

Gli "user service" mostrano tutti i servizi containerizzati in esecuzione nella tua enclave. Noterai che è stato creato un singolo nodo, con un client EL e un client CL.

## Connetti il tuo ambiente di sviluppo dApp alla rete di test di Ethereum locale {#connect-your-dapp}

### Impostazione dell'ambiente di sviluppo della dApp {#set-up-dapp-env}

Ora che hai una rete di test locale in esecuzione, puoi connettere il tuo ambiente di sviluppo dApp per usare la tua rete di test locale. Il framework Hardhat sarà usato in questa guida per distribuire una dApp di blackjack sulla tua rete di test locale.

Per impostare il tuo ambiente di sviluppo dApp, clona il repository che contiene la nostra dApp di esempio e installa le sue dipendenze, esegui:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

La cartella [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) usata qui contiene la configurazione tipica per uno sviluppatore di dApp che usa il framework [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) contiene alcuni semplici smart contract per una dApp di Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) contiene uno script per distribuire un contratto di token sulla tua rete di Ethereum locale
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) contiene un semplice test .js per il tuo contratto di token per confermare che ogni giocatore nella nostra dApp di Blackjack abbia 1000 chip coniate per sé
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) configura la tua installazione di Hardhat

### Configurare Hardhat per usare la rete di test locale {#configure-hardhat}

Una volta impostato il tuo ambiente di sviluppo dApp, connetterai Hardhat per usare la rete di test di Ethereum locale generata con Kurtosis. Per fare ciò, sostituisci `<$YOUR_PORT>` nella struct `localnet` del tuo file di configurazione `hardhat.config.ts` con la porta dell'URI RPC restituita da qualsiasi servizio `el-client-<num>`. In questo caso di esempio, la porta sarebbe `64248`. La tua porta sarà diversa.

Esempio in `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: SOSTITUISCI $YOUR_PORT CON LA PORTA DI UN URI DEL NODO PRODOTTO DAL PACCHETTO DI RETE ETH KURTOSIS

// Queste sono chiavi private associate a conti di prova prefinanziati creati dal pacchetto eth-network-package
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

Una volta salvato il file, il tuo ambiente di sviluppo dApp Hardhat è ora connesso alla tua rete di test di Ethereum locale! Puoi verificare che la tua rete di test funzioni eseguendo:

```python
npx hardhat balances --network localnet
```

L'output dovrebbe essere simile a questo:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Questo conferma che Hardhat sta usando la tua rete di test locale e rileva i conti pre-finanziati creati dal `eth-network-package`.

### Distribuire e testare la tua dApp localmente {#deploy-and-test-dapp}

Con l'ambiente di sviluppo dApp completamente connesso alla rete di test di Ethereum locale, puoi ora eseguire flussi di lavoro di sviluppo e test sulla tua dApp usando la rete di test locale.

Per compilare e distribuire lo smart contract `ChipToken.sol` per la prototipazione e lo sviluppo locali, esegui:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

L'output dovrebbe essere simile a:

```python
ChipToken distribuito a: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Ora prova a eseguire il test `simple.js` sulla tua dApp locale per confermare che ogni giocatore nella nostra dApp di Blackjack abbia 1000 chip coniate per sé:

L'output dovrebbe essere simile a questo:

```python
npx hardhat test --network localnet
```

L'output dovrebbe essere simile a questo:

```python
ChipToken
    mint
      ✔ dovrebbe coniare 1000 chip per GIOCATORE UNO

  1 superato (654ms)
```

### Revisione {#review-dapp-workflows}

A questo punto, hai impostato un ambiente di sviluppo dApp, l'hai connesso a una rete Ethereum locale creata da Kurtosis, e hai compilato, distribuito ed eseguito un semplice test sulla tua dApp.

Ora esploriamo come puoi configurare la rete sottostante per testare le nostre dApp con diverse configurazioni di rete.

## Configurazione della rete di test di Ethereum locale {#configure-testnet}

### Modifica delle configurazioni del client e del numero di nodi {#configure-client-config-and-num-nodes}

La tua rete di test di Ethereum locale può essere configurata per usare diverse coppie di client EL e CL, così come un numero variabile di nodi, a seconda dello scenario e della configurazione di rete specifica che vuoi sviluppare o testare. Ciò significa che, una volta impostata, puoi avviare una rete di test locale personalizzata e usarla per eseguire gli stessi flussi di lavoro (distribuzione, test, ecc.) con varie configurazioni di rete per assicurarti che tutto funzioni come previsto. Per saperne di più sugli altri parametri che puoi modificare, visita questo link.

Fai una prova! Puoi passare varie opzioni di configurazione al `eth-network-package` tramite un file JSON. Questo file JSON di parametri di rete fornisce le configurazioni specifiche che Kurtosis userà per impostare la rete Ethereum locale.

Prendi il file di configurazione predefinito e modificalo per avviare tre nodi con diverse coppie EL/CL:

- Nodo 1 con `geth`/`lighthouse`
- Nodo 2 con `geth`/`lodestar`
- Nodo 3 con `geth`/`teku`

Questa configurazione crea una rete eterogenea di implementazioni di nodi di Ethereum per testare la tua dApp. Il tuo file di configurazione dovrebbe ora essere simile a:

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

Ogni struct `participants` corrisponde a un nodo nella rete, quindi 3 struct `participants` diranno a Kurtosis di avviare 3 nodi nella tua rete. Ogni struct `participants` ti permetterà di specificare la coppia EL e CL usata per quel nodo specifico.

La struct `network_params` configura le impostazioni di rete usate per creare i file di genesi per ogni nodo, così come altre impostazioni come i secondi per slot della rete.

Salva il tuo file di parametri modificato in qualsiasi directory tu voglia (nell'esempio seguente, è salvato sul desktop) e poi usalo per eseguire il tuo pacchetto Kurtosis eseguendo:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Nota: il comando `kurtosis clean -a` è usato qui per istruire Kurtosis a distruggere la vecchia rete di test e i suoi contenuti prima di avviarne una nuova.

Di nuovo, Kurtosis lavorerà per un po' e stamperà i singoli passaggi che si stanno verificando. Alla fine, l'output dovrebbe essere simile a:

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

Congratulazioni! Hai configurato con successo la tua rete di test locale per avere 3 nodi invece di 1. Per eseguire gli stessi flussi di lavoro di prima sulla tua dApp (distribuzione e test), esegui le stesse operazioni che abbiamo fatto prima sostituendo `<$YOUR_PORT>` nella struct `localnet` del tuo file di configurazione `hardhat.config.ts` con la porta dell'URI RPC restituita da qualsiasi servizio `el-client-<num>` nella tua nuova rete di test locale a 3 nodi.

## Conclusione {#conclusion}

E questo è tutto! Per ricapitolare questa breve guida, hai:

- Creato una rete di test di Ethereum locale su Docker usando Kurtosis
- Connesso il tuo ambiente di sviluppo dApp locale alla rete Ethereum locale
- Distribuito una dApp ed eseguito un semplice test su di essa sulla rete Ethereum locale
- Configurato la rete Ethereum sottostante per avere 3 nodi

Ci piacerebbe sapere cosa è andato bene per te, cosa potrebbe essere migliorato, o rispondere a qualsiasi tua domanda. Non esitare a contattarci tramite [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) o [inviaci un'email](mailto:feedback@kurtosistech.com)!

### Altri esempi e guide {#other-examples-guides}

Ti invitiamo a consultare la nostra [guida rapida](https://docs.kurtosis.com/quickstart) (dove creerai un database Postgres e un'API) e i nostri altri esempi nel nostro [repository awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) dove troverai alcuni ottimi esempi, inclusi pacchetti per:

- Avviare la stessa rete di test di Ethereum locale, ma con servizi aggiuntivi connessi come uno spammer di transazioni (per simulare le transazioni), un monitor di biforcazioni e un'istanza connessa di Grafana e Prometheus
- Eseguire un test di sotto-rete sulla stessa rete Ethereum locale
