---
title: Come Configurare Tellor come tuo Oracolo
description: Una guida per iniziare a integrare l'oracolo di Tellor nel tuo protocollo
author: "Tellor"
lang: it
tags:
  - "Solidity"
  - "Smart Contract"
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

Tellor è un oracolo in diretta e open source pronto all'implementazione. Questa guida per principianti serve a mostrare la facilità con cui puoi metterti al lavoro con Tellor, fornendo il tuo progetto con un oracolo completamente decentralizzato e resistente alla censura.

## Panoramica {#overview}

Tellor è un sistema di oracolo in cui le parti possono richiedere il valore di un punto di dati esterno alla catena (es. BTC/USD) e i segnalatori competono ad aggiungere tale valore a una banca dati sulla catena, accessibile da tutti i contratti intelligenti di Ethereum. Gli input a questa banca dati sono protetti da una rete di reporter di staking. Tellor utilizza dei meccanismi d'incentivazione cripto-economica, ricompensando gli invii di dati onesti dai segnalatori e punendo gli utenti malevoli tramite l'emissione del token di Tellor, Tributes (TRB) e un meccanismo di disputa.

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

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //This Contract now has access to all functions in UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

Per un elenco completo degli indirizzi dei contratti, fai riferimento a [questa guida](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Per semplicità d'uso, la repository UsingTellort è dotata di una versione del contratto [Tellor Playground](https://github.com/tellor-io/TellorPlayground), per una più facile integrazione. Visualizza [questa pagina](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) per un elenco delle funzioni utili.

Per un'implementazione più robusta dell'oracolo di Tellor, consulta [qui](https://github.com/tellor-io/usingtellor/blob/master/README.md) l'elenco completo delle funzioni disponibili.
