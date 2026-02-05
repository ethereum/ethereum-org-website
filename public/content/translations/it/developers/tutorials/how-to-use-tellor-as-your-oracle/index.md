---
title: Come configurare Tellor come proprio oracolo
description: Una guida per iniziare a integrare l'oracolo di Tellor nel tuo protocollo
author: "Tellor"
lang: it
tags: [ "Solidity", "smart contract", "oracoli" ]
skill: beginner
published: 2021-06-29
source: Documentazione di Tellor
sourceUrl: https://docs.tellor.io/tellor/
---

Quiz: il tuo protocollo è quasi finito, ma ha bisogno di un oracolo per accedere a dati fuori dalla catena... Cosa fai?

## (Prerequisiti consigliati) {#soft-prerequisites}

Questo post intende rendere l'accesso al feed dell'oracolo il più semplice e diretto possibile. Detto ciò, per concentrarci sull'aspetto dell'oracolo, presumiamo da parte tua le seguenti abilità di programmazione.

Presupposti:

- sai muoverti in un terminale
- hai installato npm
- sai come usare npm per gestire le dipendenze

Tellor è un oracolo open-source attivo e pronto per l'implementazione. Questa guida per principianti serve a mostrare la facilità con cui è possibile iniziare a usare Tellor, fornendo al tuo progetto un oracolo completamente decentralizzato e resistente alla censura.

## Panoramica {#overview}

Tellor è un sistema di oracolo in cui le parti possono richiedere il valore di un dato fuori dalla catena (ad es., BTC/USD) e i reporter competono per aggiungere questo valore a una banca dati sulla catena, accessibile da tutti gli smart contract di Ethereum. Gli input di questa banca dati sono protetti da una rete di reporter con staking. Tellor utilizza meccanismi di incentivazione cripto-economica, premiando l'invio di dati onesti da parte dei reporter e punendo gli attori malintenzionati tramite l'emissione del token di Tellor, Tributes (TRB), e un meccanismo di disputa.

In questa guida vedremo:

- Configurazione del toolkit iniziale di cui avrai bisogno per iniziare.
- Analisi di un semplice esempio.
- Elenco degli indirizzi delle reti di test su cui puoi attualmente provare Tellor.

## UsingTellor {#usingtellor}

La prima cosa che dovrai fare è installare gli strumenti di base necessari per usare Tellor come tuo oracolo. Usa [questo pacchetto](https://github.com/tellor-io/usingtellor) per installare i Tellor User Contracts:

`npm install usingtellor`

Una volta installato, i tuoi contratti potranno ereditare le funzioni dal contratto 'UsingTellor'.

Ottimo! Ora che hai gli strumenti pronti, esaminiamo un semplice esercizio in cui recuperiamo il prezzo di bitcoin:

### Esempio BTC/USD {#btcusd-example}

Eredita il contratto UsingTellor, passando l'indirizzo di Tellor come argomento del costruttore:

Ecco un esempio:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Questo Contratto ora ha accesso a tutte le funzioni in UsingTellor

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

Per un elenco completo degli indirizzi dei contratti, consulta [qui](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Per facilità d'uso, il repo UsingTellor include una versione del contratto [Tellor Playground](https://github.com/tellor-io/TellorPlayground) per un'integrazione più semplice. Consulta [qui](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) per un elenco di funzioni utili.

Per un'implementazione più robusta dell'oracolo Tellor, consulta l'elenco completo delle funzioni disponibili [qui](https://github.com/tellor-io/usingtellor/blob/master/README.md).
