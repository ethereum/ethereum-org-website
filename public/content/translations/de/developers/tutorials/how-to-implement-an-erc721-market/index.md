---
title: Wie man einen ERC-721-Markt implementiert
description: Wie man tokenisierte Artikel auf einem dezentralen Anzeigenportal zum Verkauf anbietet
author: "Alberto Cuesta Cañada"
tags: ["Smart Contracts", "erc-721", "Solidity", "Tokens"]
skill: intermediate
breadcrumb: ERC-721-Markt
lang: de
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

In diesem Artikel werde ich Ihnen zeigen, wie man Craigslist für die Ethereum-Blockchain programmiert.

Vor Gumtree, Ebay und Craigslist bestanden Anzeigetafeln meist aus Kork oder Papier. Es gab Kleinanzeigen in Schulfluren, Zeitungen, an Straßenlaternen und in Schaufenstern.

All das änderte sich mit dem Internet. Die Anzahl der Menschen, die eine bestimmte Anzeigetafel sehen konnten, vervielfachte sich um viele Größenordnungen. Dadurch wurden die Märkte, die sie repräsentieren, viel effizienter und skalierten auf globale Größe. Ebay ist ein riesiges Unternehmen, dessen Ursprünge auf diese physischen Anzeigetafeln zurückgehen.

Mit der Blockchain werden sich diese Märkte erneut verändern. Lassen Sie mich Ihnen zeigen, wie.

## Monetarisierung {#monetization}

Das Geschäftsmodell eines öffentlichen Blockchain-Anzeigenportals muss sich von dem von Ebay und Co. unterscheiden.

Zunächst gibt es [den Aspekt der Dezentralisierung](/developers/docs/web2-vs-web3/). Bestehende Plattformen müssen ihre eigenen Server warten. Eine dezentrale Plattform wird von ihren Nutzern gepflegt, sodass die Betriebskosten der Kernplattform für den Plattformbetreiber auf null sinken.

Dann gibt es das Frontend, die Website oder Schnittstelle, die den Zugang zur Plattform ermöglicht. Hier gibt es viele Optionen. Die Plattformbetreiber können den Zugang beschränken und jeden zwingen, ihre Schnittstelle gegen eine Gebühr zu nutzen. Die Plattformbetreiber können sich auch entscheiden, den Zugang zu öffnen (Macht dem Volk!) und jedem erlauben, Schnittstellen zur Plattform zu bauen. Oder die Betreiber könnten sich für einen Ansatz in der Mitte dieser Extreme entscheiden.

_Führungskräfte mit mehr Vision als ich werden wissen, wie man das monetarisiert. Ich sehe nur, dass es sich vom Status quo unterscheidet und wahrscheinlich profitabel ist._

Darüber hinaus gibt es den Aspekt der Automatisierung und der Zahlungen. Einige Dinge können sehr [effektiv tokenisiert](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) und auf einem Anzeigenportal gehandelt werden. Tokenisierte Vermögenswerte lassen sich auf einer Blockchain leicht übertragen. Hochkomplexe Zahlungsmethoden können in einer Blockchain einfach implementiert werden.

Ich wittere hier einfach eine Geschäftsmöglichkeit. Ein Anzeigenportal ohne laufende Kosten kann leicht implementiert werden, wobei komplexe Zahlungswege in jede Transaktion integriert sind. Ich bin sicher, jemand wird eine Idee haben, wofür man das nutzen kann.

Ich bin einfach froh, es zu bauen. Werfen wir einen Blick auf den Code.

## Implementierung {#implementation}

Vor einiger Zeit haben wir ein [Open-Source-Repository](https://github.com/HQ20/contracts?ref=hackernoon.com) mit Beispielimplementierungen für Geschäftsfälle und anderen Extras gestartet, schauen Sie es sich gerne an.

Der Code für dieses [Ethereum-Anzeigenportal](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) ist dort zu finden, bitte nutzen und testen Sie ihn ausgiebig. Seien Sie sich nur bewusst, dass der Code nicht geprüft (audited) wurde und Sie Ihre eigene Sorgfaltsprüfung durchführen müssen, bevor Sie Geld hineinfließen lassen.

Die Grundlagen des Portals sind nicht komplex. Alle Anzeigen im Portal sind lediglich ein Struct mit ein paar Feldern:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Offen, Ausgeführt, Abgebrochen
}
```

Es gibt also jemanden, der die Anzeige aufgibt. Einen Artikel, der zum Verkauf steht. Einen Preis für den Artikel. Den Status des Handels, der offen, ausgeführt oder abgebrochen sein kann.

All diese Handelstransaktionen werden in einem Mapping gespeichert. Weil in Solidity scheinbar alles ein Mapping ist. Und auch, weil es praktisch ist.

```solidity
mapping(uint256 => Trade) public trades;
```

Die Verwendung eines Mappings bedeutet lediglich, dass wir uns vor dem Aufgeben einer Anzeige eine ID dafür ausdenken müssen, und wir müssen die ID einer Anzeige kennen, bevor wir damit arbeiten können. Es gibt mehrere Möglichkeiten, dies entweder im Smart Contract oder im Frontend zu handhaben. Fragen Sie gerne nach, wenn Sie Hinweise benötigen.

Als Nächstes stellt sich die Frage, was diese Artikel sind, mit denen wir handeln, und was diese Währung ist, die zur Bezahlung der Transaktion verwendet wird.

Für die Artikel verlangen wir lediglich, dass sie die [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com)-Schnittstelle implementieren, was eigentlich nur eine Möglichkeit ist, reale Gegenstände auf einer Blockchain darzustellen, obwohl es [am besten mit digitalen Vermögenswerten funktioniert](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Wir werden unseren eigenen ERC-721-Vertrag im Konstruktor spezifizieren, was bedeutet, dass alle Vermögenswerte in unserem Anzeigenportal im Vorfeld tokenisiert worden sein müssen.

Für die Zahlungen werden wir etwas Ähnliches tun. Die meisten Blockchain-Projekte definieren ihre eigene [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com)-Kryptowährung. Einige andere bevorzugen die Verwendung einer etablierten Währung wie DAI. Bei diesem Anzeigenportal müssen Sie sich nur bei der Erstellung entscheiden, was Ihre Währung sein soll. Ganz einfach.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Wir kommen der Sache näher. Wir haben Anzeigen, Handelsartikel und eine Währung für Zahlungen. Eine Anzeige aufzugeben bedeutet, einen Artikel in ein Treuhandkonto (Escrow) zu legen, um sowohl zu zeigen, dass Sie ihn besitzen, als auch, dass Sie ihn nicht zweimal gepostet haben, möglicherweise in einem anderen Portal.

Der folgende Code macht genau das. Er legt den Artikel in ein Treuhandkonto, erstellt die Anzeige und erledigt einige Verwaltungsaufgaben.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

Den Handel zu akzeptieren bedeutet, eine Anzeige (einen Handel) auszuwählen, den Preis zu zahlen und den Artikel zu erhalten. Der folgende Code ruft einen Handel ab. Er prüft, ob er verfügbar ist. Bezahlt den Artikel. Ruft den Artikel ab. Aktualisiert die Anzeige.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Schließlich haben wir eine Option für Verkäufer, von einem Handel zurückzutreten, bevor ein Käufer ihn akzeptiert. In einigen Modellen wären Anzeigen stattdessen für eine bestimmte Zeit live, bevor sie ablaufen. Das ist Ihre Entscheidung, abhängig vom Design Ihres Marktes.

Der Code ist dem sehr ähnlich, der zur Ausführung eines Handels verwendet wird, nur dass keine Währung den Besitzer wechselt und der Artikel an den Ersteller der Anzeige zurückgeht.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

Das war's. Sie haben das Ende der Implementierung erreicht. Es ist ziemlich überraschend, wie kompakt einige Geschäftskonzepte sind, wenn sie in Code ausgedrückt werden, und dies ist einer dieser Fälle. Sehen Sie sich den vollständigen Vertrag [in unserem Repo](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol) an.

## Fazit {#conclusion}

Anzeigenportale sind eine gängige Marktkonfiguration, die mit dem Internet massiv skaliert ist und zu einem enorm beliebten Geschäftsmodell mit einigen wenigen monopolistischen Gewinnern wurde.

Anzeigenportale sind zufällig auch ein einfaches Werkzeug, das sich in einer Blockchain-Umgebung replizieren lässt, mit sehr spezifischen Funktionen, die eine Herausforderung für die bestehenden Giganten möglich machen.

In diesem Artikel habe ich versucht, eine Brücke zwischen der geschäftlichen Realität eines Anzeigenportal-Unternehmens und der technologischen Implementierung zu schlagen. Dieses Wissen sollte Ihnen helfen, eine Vision und einen Fahrplan für die Implementierung zu erstellen, wenn Sie über die entsprechenden Fähigkeiten verfügen.

Wie immer gilt: Wenn Sie etwas Spannendes bauen möchten und sich über einen Rat freuen würden, [schreiben Sie mir gerne eine Nachricht](https://albertocuesta.es/)! Ich helfe immer gerne.