---
title: Come configurare Tellor come tuo oracolo
description: Una guida per iniziare a integrare l'oracolo Tellor nel tuo protocollo
author: "Tellor"
lang: it
tags: ["Solidity", "contratti intelligenti", "oracoli"]
skill: beginner
breadcrumb: Oracolo Tellor
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Quiz a sorpresa: Il tuo protocollo è quasi finito, ma ha bisogno di un oracolo per accedere ai dati fuori catena... Cosa fai?

## Prerequisiti (flessibili) {#soft-prerequisites}

Questo post mira a rendere l'accesso a un feed dell'oracolo il più semplice e diretto possibile. Detto questo, diamo per scontato quanto segue sul tuo livello di abilità di programmazione per concentrarci sull'aspetto dell'oracolo.

Presupposti:

- sai navigare in un terminale
- hai installato npm
- sai come usare npm per gestire le dipendenze

Tellor è un oracolo live e open-source pronto per l'implementazione. Questa guida per principianti è qui per mostrare la facilità con cui si può iniziare a usare Tellor, fornendo al tuo progetto un oracolo completamente decentralizzato e resistente alla censura.

## Panoramica {#overview}

Tellor è un sistema di oracolo in cui le parti possono richiedere il valore di un punto dati fuori catena (es. BTC/USD) e i reporter competono per aggiungere questo valore a una banca dati on-chain, accessibile da tutti i contratti intelligenti di Ethereum. Gli input a questa banca dati sono protetti da una rete di reporter in stake. Tellor utilizza meccanismi di incentivi criptoeconomici, premiando l'invio di dati onesti da parte dei reporter e punendo i malintenzionati attraverso l'emissione del token di Tellor, Tributes (TRB), e un meccanismo di disputa.

In questo tutorial esamineremo:

- La configurazione del toolkit iniziale necessario per iniziare.
- Un semplice esempio passo dopo passo.
- L'elenco degli indirizzi della rete di test delle reti su cui attualmente puoi testare Tellor.

## UsingTellor {#usingtellor}

La prima cosa che vorrai fare è installare gli strumenti di base necessari per usare Tellor come tuo oracolo. Usa [questo pacchetto](https://github.com/tellor-io/usingtellor) per installare i Contratti Utente di Tellor (Tellor User Contracts):

`npm install usingtellor`

Una volta installato, questo permetterà ai tuoi contratti di ereditare le funzioni dal contratto 'UsingTellor'.

Ottimo! Ora che hai gli strumenti pronti, facciamo un semplice esercizio in cui recuperiamo il prezzo del bitcoin:

### Esempio BTC/USD {#btcusd-example}

Eredita il contratto UsingTellor, passando l'indirizzo di Tellor come argomento del costruttore:

Ecco un esempio:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 // Questo contratto ora ha accesso a tutte le funzioni in UsingTellor

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

Per un elenco completo degli indirizzi del contratto fai riferimento a [questa pagina](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Per facilità d'uso, la repository UsingTellor include una versione del contratto [Tellor Playground](https://github.com/tellor-io/TellorPlayground) per un'integrazione più semplice. Vedi [qui](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) per un elenco di funzioni utili.

Per un'implementazione più robusta dell'oracolo Tellor, dai un'occhiata all'elenco completo delle funzioni disponibili [qui](https://github.com/tellor-io/usingtellor/blob/master/README.md).