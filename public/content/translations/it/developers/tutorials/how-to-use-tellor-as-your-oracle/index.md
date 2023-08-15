---
title: Come Configurare Tellor come tuo Oracolo
description: Una guida per iniziare a integrare l'oracolo di Tellor nel tuo protocollo
author: "Tellor"
lang: it
tags:
  - "Solidity"
  - "smart contract"
  - "feed di prezzo"
  - "oracoli"
skill: beginner
published: 2021-06-29
source: Documentazione di Tellor
sourceUrl: https://docs.tellor.io/tellor/
---

Quiz: il tuo protocollo è appena terminato, ma ti serve un oracolo per avere accesso ai dati esterni alla catena... Cosa fai?

## (Soft) Prerequisiti {#soft-prerequisites}

Questo post intende rendere l'accesso al feed dell'oracolo il più semplice e diretto possibile. Detto ciò, per concentrarci sull'aspetto dell'oracolo, presumiamo da parte tua le seguenti abilità di programmazione.

Premesse:

- se capage di muoverti nella console
- hai installato npm
- sai come usare npm per gestire le dipendenze

Tellor è un oracolo in diretta e open source pronto all'implementazione. Questa guida per principianti vuole mostrare la facilità con cui puoi metterti al lavoro con Tellor, mettendo nel tuo progetto un oracolo totalmente decentralizzato e resistente alla censura.

## Panoramica {#overview}

Tellor è un sistema di oracolo in cui le parti possono richiedere il valore di un punto di dati esterno alla catena (es. BTC/USD) e i reporter competono per aggiungere questo valore a una banca dati esterna alla catena, accessibile da tutti gli smart contract di Ethereum. Gli input a questa banca dati sono protetti da una rete di reporter di staking. Tellor usa meccanismi d'incentivazione di criptoeconomia, premiando gli invii di dati onesti dai reporter e punendo gli attori malevoli tramite l'emissione di token di Tellor, Tributes (TRB) e un meccanismo per le dispute.

In questo tutorial, esamineremo:

- Configurazione del toolkit iniziale di cui ha bisogno per metterti al lavoro.
- Guida a un semplice esempio.
- Elenco degli indirizzi testnet delle reti su cui puoi testare Tellor in questo momento.

## Usare Tellor {#usingtellor}

La prima cosa che dovrai fare è installare gli strumenti di base necessari per usare Tellor come oracolo. Usa [questo pacchetto](https://github.com/tellor-io/usingtellor) per installare i Contratti Utente di Tellor:

`npm install usingtellor`

Una volta installato, i tuoi contratti potranno ereditare le funzioni dal contratto 'UsingTellor'.

Ottimo! Ora che hai preparato gli strumenti, guardiamo un semplice esercizio in cui recuperiamo il prezzo Bitcoin:

### Esempio BTC/USD {#btcusd-example}

Eredita il contratto UsingTellor, passando l'indirizzo di Tellor come argomento del costruttore:

Ecco un esempio:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract BtcPriceContract is UsingTellor {

  //This Contract now has access to all functions in UsingTellor

  bytes btcPrice;
  bytes32 btcQueryId = 0x0000000000000000000000000000000000000000000000000000000000000002;

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {
    bool _didGet;
    uint256 _timestamp;

    (_didGet, btcPrice, _timestamp) = getCurrentValue(btcQueryId);
  }
}
```

**Vuoi provare un diverso feed di dati? Dai un'occhiata all'elenco di feed di dati supportati qui: [Feed di dati correnti](https://docs.tellor.io/tellor/integration/data-feed-ids)**

## Indirizzi: {#addresses}

Rete principale: [`0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0`](https://etherscan.io/address/0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0#code)

#### Vuoi fare qualche test prima? Vedi nell'elenco seguente i nostri indirizzi di rete di prova attivi: {#looking-to-do-some-testing-first-see-the-list-below-for-our-active-testnet-addresses}

Rinkeby: [`0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0`](https://rinkeby.etherscan.io/address/0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0#code)

Kovan: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://kovan.etherscan.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

Ropsten: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://ropsten.etherscan.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

Goerli: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://goerli.etherscan.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

Rete di prova di BSC: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://testnet.bscscan.com/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7#code)

Rete di prova di Polygon Mumbai: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://mumbai.polygonscan.com/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7/contracts#code)

Rete di prova Arbitrum: [`0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7`](https://rinkeby-explorer.arbitrum.io/address/0x3477EB82263dabb59AC0CAcE47a61292f28A2eA7)

#### Per un'implementazione più robusta dell'oracolo di Tellor, dai un'occhiata all'elenco completo di funzioni disponibili [qui](https://github.com/tellor-io/usingtellor/blob/master/README.md) {#for-a-more-robust-implementation-of-the-tellor-oracle-check-out-the-full-list-of-available-functions-here}
