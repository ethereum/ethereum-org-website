---
title: Wie Sie Tellor als Ihr Orakel einrichten
description: "Eine Anleitung für den Einstieg in die Integration des Tellor-Orakels in Ihr Protokoll"
author: "Tellor"
lang: de
tags: ["solidity", "smart contracts", "oracles"]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Quizfrage: Ihr Protokoll ist fast fertig, aber es braucht ein Orakel, um Zugang zu Offchain-Daten zu erhalten... Was tun Sie?

## (Optionale) Voraussetzungen {#soft-prerequisites}

Dieser Beitrag soll den Zugriff auf einen Orakel-Feed so einfach und unkompliziert wie möglich gestalten. Davon abgesehen gehen wir von den folgenden Programmierkenntnissen aus, um uns auf den Orakel-Aspekt zu konzentrieren.

Annahmen:

- Sie können in einem Terminal navigieren
- Sie haben npm installiert
- Sie wissen, wie man npm zur Verwaltung von Abhängigkeiten verwendet

Tellor ist ein live und quelloffenes Orakel, das zur Implementierung bereit ist. Diese Anleitung für Anfänger soll zeigen, wie einfach man mit Tellor loslegen kann, um Ihr Projekt mit einem vollständig dezentralen und zensurresistenten Orakel auszustatten.

## Überblick {#overview}

Tellor ist ein Orakelsystem, bei dem Parteien den Wert eines Offchain-Datenpunkts (z. B. BTC/USD) anfordern können und Reporter darum konkurrieren, diesen Wert einer Onchain-Datenbank hinzuzufügen, auf die alle Smart Contracts von Ethereum zugreifen können. Die Eingaben in diese Datenbank werden durch ein Netzwerk von gestakten Reportern gesichert. Tellor nutzt krypto-ökonomische Anreizmechanismen, die ehrliche Dateneinreichungen von Reportern belohnen und schlechte Akteure durch die Emission des Tellor-Tokens, Tributes (TRB), und einen Streitbeilegungsmechanismus bestrafen.

In diesem Tutorial werden wir Folgendes behandeln:

- Einrichten des anfänglichen Toolkits, das Sie für den Start benötigen.
- Durchgehen eines einfachen Beispiels.
- Auflisten der Testnet-Adressen von Netzwerken, auf denen Sie Tellor derzeit testen können.

## UsingTellor {#usingtellor}

Als Erstes sollten Sie die grundlegenden Tools installieren, die für die Verwendung von Tellor als Ihr Orakel erforderlich sind. Verwenden Sie [dieses Paket](https://github.com/tellor-io/usingtellor), um die Tellor User Contracts zu installieren:

`npm install usingtellor`

Nach der Installation können Ihre Verträge die Funktionen aus dem Vertrag „UsingTellor“ erben.

Großartig! Jetzt, wo Sie die Tools bereit haben, lassen Sie uns eine einfache Übung durchgehen, bei der wir den Bitcoin-Preis abrufen:

### BTC/USD-Beispiel {#btcusd-example}

Erben Sie den UsingTellor-Vertrag und übergeben Sie die Tellor-Adresse als Konstruktorargument:

Hier ein Beispiel:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Dieser Vertrag hat jetzt Zugriff auf alle Funktionen in UsingTellor

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

Eine vollständige Liste der Vertragsadressen finden Sie [hier](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Zur Vereinfachung der Nutzung wird das UsingTellor-Repo mit einer Version des [Tellor Playground](https://github.com/tellor-io/TellorPlayground)-Vertrags für eine einfachere Integration geliefert. Eine Liste hilfreicher Funktionen finden Sie [hier](https://github.com/tellor-io/sampleUsingTellor#tellor-playground).

Für eine robustere Implementierung des Tellor-Orakels sehen Sie sich die vollständige Liste der verfügbaren Funktionen [hier](https://github.com/tellor-io/usingtellor/blob/master/README.md) an.
