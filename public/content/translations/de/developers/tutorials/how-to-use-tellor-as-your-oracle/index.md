---
title: Wie man Tellor als sein Orakel einrichtet
description: "Ein Leitfaden für den Einstieg in die Integration des Tellor-Orakels in Ihr Protokoll"
author: "Tellor"
lang: de
tags: ["Solidity", "Smart Contracts", "Orakel"]
skill: beginner
breadcrumb: Tellor-Orakel
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Kurzes Quiz: Ihr Protokoll ist fast fertig, aber es benötigt ein Orakel, um auf Off-Chain-Daten zuzugreifen... Was tun Sie?

## (Weiche) Voraussetzungen {#soft-prerequisites}

Dieser Beitrag zielt darauf ab, den Zugriff auf einen Orakel-Feed so einfach und unkompliziert wie möglich zu gestalten. Dennoch gehen wir von den folgenden Programmierkenntnissen aus, um uns auf den Orakel-Aspekt konzentrieren zu können.

Annahmen:

- Sie können in einem Terminal navigieren
- Sie haben npm installiert
- Sie wissen, wie man npm zur Verwaltung von Abhängigkeiten verwendet

Tellor ist ein aktives und quelloffenes Orakel, das zur Implementierung bereitsteht. Dieser Anfängerleitfaden soll zeigen, wie einfach es ist, Tellor in Betrieb zu nehmen und Ihr Projekt mit einem vollständig dezentralisierten und zensurresistenten Orakel auszustatten.

## Übersicht {#overview}

Tellor ist ein Orakel-System, bei dem Parteien den Wert eines Off-Chain-Datenpunkts (z. B. BTC/USD) anfragen können und Reporter darum konkurrieren, diesen Wert einer Datenbank auf der Blockchain hinzuzufügen, die für alle Ethereum-Smart-Contracts zugänglich ist. Die Eingaben in diese Datenbank werden durch ein Netzwerk von Reportern gesichert, die einen Einsatz hinterlegt haben. Tellor nutzt kryptoökonomische Anreizmechanismen, die ehrliche Datenübermittlungen von Reportern belohnen und böswillige Akteure durch die Emission von Tellors Token, Tributes (TRB), sowie einen Streitbeilegungsmechanismus bestrafen.

In diesem Tutorial behandeln wir Folgendes:

- Einrichtung des anfänglichen Toolkits, das Sie für den Start benötigen.
- Durchgehen eines einfachen Beispiels.
- Auflistung von Testnet-Adressen von Netzwerken, auf denen Sie Tellor derzeit testen können.

## UsingTellor {#usingtellor}

Als Erstes sollten Sie die grundlegenden Tools installieren, die für die Nutzung von Tellor als Ihr Orakel erforderlich sind. Verwenden Sie [dieses Paket](https://github.com/tellor-io/usingtellor), um die Tellor User Contracts zu installieren:

`npm install usingtellor`

Sobald dies installiert ist, können Ihre Verträge die Funktionen aus dem Vertrag „UsingTellor“ erben.

Großartig! Da Sie nun die Tools bereit haben, lassen Sie uns eine einfache Übung durchgehen, bei der wir den Bitcoin-Preis abrufen:

### BTC/USD-Beispiel {#btcusd-example}

Erben Sie den UsingTellor-Vertrag und übergeben Sie die Tellor-Adresse als Konstruktorargument:

Hier ist ein Beispiel:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 // Dieser Contract hat nun Zugriff auf alle Funktionen in UsingTellor

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

Zur einfacheren Nutzung enthält das UsingTellor-Repo eine Version des [Tellor Playground](https://github.com/tellor-io/TellorPlayground)-Vertrags für eine leichtere Integration. Eine Liste hilfreicher Funktionen finden Sie [hier](https://github.com/tellor-io/sampleUsingTellor#tellor-playground).

Für eine robustere Implementierung des Tellor-Orakels sehen Sie sich die vollständige Liste der verfügbaren Funktionen [hier](https://github.com/tellor-io/usingtellor/blob/master/README.md) an.