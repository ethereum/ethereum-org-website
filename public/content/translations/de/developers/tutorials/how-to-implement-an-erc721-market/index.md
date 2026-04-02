---
title: Wie man einen ERC-721-Markt implementiert
description: Wie man tokenisierte Artikel auf einem dezentralisierten Kleinanzeigenportal zum Verkauf anbietet
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

Vor Gumtree, Ebay und Craigslist bestanden Kleinanzeigenbretter meist aus Kork oder Papier. Es gab Kleinanzeigenbretter in Schulfluren, Zeitungen, an Straßenlaternen und in Schaufenstern.

All das änderte sich mit dem Internet. Die Anzahl der Menschen, die ein bestimmtes Kleinanzeigenbrett sehen konnten, vervielfachte sich um viele Größenordnungen. Damit wurden die Märkte, die sie repräsentieren, viel effizienter und skalierten auf globale Größe. Ebay ist ein riesiges Unternehmen, das seine Ursprünge auf diese physischen Kleinanzeigenbretter zurückführt.

Mit der Blockchain werden sich diese Märkte noch einmal verändern. Lassen Sie mich Ihnen zeigen, wie.

## Monetarisierung {#monetization}

Das Geschäftsmodell eines öffentlichen Blockchain-Kleinanzeigenportals muss sich von dem von Ebay und Co. unterscheiden.

Zunächst gibt es [den Aspekt der Dezentralisierung](/developers/docs/web2-vs-web3/). Bestehende Plattformen müssen ihre eigenen Server warten. Eine dezentralisierte Plattform wird von ihren Nutzern gepflegt, sodass die Kosten für den Betrieb der Kernplattform für den Plattformbesitzer auf null sinken.

Dann gibt es das Front-End, die Website oder Schnittstelle, die Zugang zur Plattform bietet. Hier gibt es viele Optionen. Die Plattformbesitzer können den Zugang beschränken und jeden zwingen, ihre Schnittstelle zu nutzen, wofür sie eine Gebühr erheben. Die Plattformbesitzer können sich auch entscheiden, den Zugang zu öffnen (Macht dem Volk!) und jedem erlauben, Schnittstellen zur Plattform zu bauen. Oder die Besitzer könnten sich für einen Ansatz in der Mitte dieser Extreme entscheiden.

_Führungskräfte mit mehr Vision als ich werden wissen, wie man das monetarisiert. Alles, was ich sehe, ist, dass dies anders ist als der Status quo und wahrscheinlich profitabel._

Darüber hinaus gibt es den Aspekt der Automatisierung und der Zahlungen. Einige Dinge können sehr [effektiv tokenisiert](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) und auf einem Kleinanzeigenportal gehandelt werden. Tokenisierte Vermögenswerte lassen sich leicht auf einer Blockchain übertragen. Hochkomplexe Zahlungsmethoden können problemlos auf einer Blockchain implementiert werden.

Ich wittere hier einfach eine Geschäftsmöglichkeit. Ein Kleinanzeigenportal ohne laufende Kosten kann leicht implementiert werden, wobei komplexe Zahlungswege in jede Transaktion integriert sind. Ich bin sicher, jemand wird eine Idee haben, wofür man das nutzen kann.

Ich bin einfach froh, es zu bauen. Werfen wir einen Blick auf den Code.

## Implementierung {#implementation}

Vor einiger Zeit haben wir ein [Open-Source-Repository](https://github.com/HQ20/contracts?ref=hackernoon.com) mit Beispielimplementierungen für Geschäftsfälle und anderen Leckerbissen gestartet, schauen Sie doch mal rein.

Der Code für dieses [Ethereum-Kleinanzeigenportal](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) ist dort zu finden, bitte nutzen und missbrauchen Sie ihn. Seien Sie sich nur bewusst, dass der Code nicht geprüft wurde und Sie Ihre eigene Sorgfaltsprüfung durchführen müssen, bevor Sie Geld hineinfließen lassen.

Die Grundlagen des Portals sind nicht komplex. Alle Anzeigen auf dem Portal werden nur ein Struct mit ein paar Feldern sein:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Offen, Ausgeführt, Abgebrochen
}
```

Es gibt also jemanden, der die Anzeige aufgibt. Einen Artikel zum Verkauf. Einen Preis für den Artikel. Den Status des Handels, der offen, ausgeführt oder storniert sein kann.

All diese Handel werden in einem Mapping gespeichert. Weil in Solidity scheinbar alles ein Mapping ist. Und auch, weil es praktisch ist.

```solidity
mapping(uint256 => Trade) public trades;
```

Die Verwendung eines Mappings bedeutet lediglich, dass wir uns für jede Anzeige eine ID ausdenken müssen, bevor wir sie aufgeben, und wir müssen die ID einer Anzeige kennen, bevor wir damit arbeiten können. Es gibt mehrere Möglichkeiten, damit umzugehen, entweder im Smart Contract oder im Front-End. Bitte fragen Sie, wenn Sie ein paar Hinweise benötigen.

Als Nächstes stellt sich die Frage, was das für Artikel sind, mit denen wir handeln, und was diese Währung ist, die zur Bezahlung der Transaktion verwendet wird.

Für die Artikel verlangen wir lediglich, dass sie die [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com)-Schnittstelle implementieren, was eigentlich nur eine Möglichkeit ist, reale Gegenstände auf einer Blockchain darzustellen, obwohl es [am besten mit digitalen Vermögenswerten funktioniert](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Wir werden unseren eigenen ERC721-Vertrag im Konstruktor spezifizieren, was bedeutet, dass alle Vermögenswerte auf unserem Kleinanzeigenportal im Vorfeld tokenisiert worden sein müssen.

Für die Zahlungen werden wir etwas Ähnliches tun. Die meisten Blockchain-Projekte definieren ihre eigene [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com)-Kryptowährung. Einige andere ziehen es vor, eine etablierte wie DAI zu verwenden. Bei diesem Kleinanzeigenportal müssen Sie sich bei der Erstellung nur entscheiden, was Ihre Währung sein soll. Ganz einfach.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Wir kommen der Sache näher. Wir haben Anzeigen, Handelsartikel und eine Währung für Zahlungen. Eine Anzeige aufzugeben bedeutet, einen Artikel in ein Treuhandkonto zu geben, um zu zeigen, dass man ihn besitzt und dass man ihn nicht zweimal, möglicherweise auf einem anderen Portal, aufgegeben hat.

Der folgende Code macht genau das. Er legt den Artikel in das Treuhandkonto, erstellt die Anzeige und erledigt einige Verwaltungsaufgaben.

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

Den Handel zu akzeptieren bedeutet, eine Anzeige (Handel) auszuwählen, den Preis zu zahlen und den Artikel zu erhalten. Der folgende Code ruft einen Handel ab. Überprüft, ob er verfügbar ist. Bezahlt den Artikel. Ruft den Artikel ab. Aktualisiert die Anzeige.

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

Schließlich haben wir eine Option für Verkäufer, von einem Handel zurückzutreten, bevor ein Käufer ihn akzeptiert. In einigen Modellen wären Anzeigen stattdessen für einen bestimmten Zeitraum live, bevor sie ablaufen. Das ist Ihre Entscheidung, abhängig vom Design Ihres Marktes.

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

Das war's. Sie haben es bis zum Ende der Implementierung geschafft. Es ist ziemlich überraschend, wie kompakt einige Geschäftskonzepte sind, wenn sie in Code ausgedrückt werden, und dies ist einer dieser Fälle. Sehen Sie sich den vollständigen Vertrag [in unserem Repo](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol) an.

## Fazit {#conclusion}

Kleinanzeigenportale sind eine gängige Marktkonfiguration, die mit dem Internet massiv skaliert ist und zu einem enorm beliebten Geschäftsmodell mit einigen wenigen monopolistischen Gewinnern wurde.

Kleinanzeigenportale sind zufällig auch ein einfaches Werkzeug, das sich in einer Blockchain-Umgebung replizieren lässt, mit sehr spezifischen Funktionen, die eine Herausforderung für die bestehenden Giganten möglich machen.

In diesem Artikel habe ich den Versuch unternommen, eine Brücke zwischen der geschäftlichen Realität eines Kleinanzeigenportals und der technologischen Implementierung zu schlagen. Dieses Wissen sollte Ihnen helfen, eine Vision und eine Roadmap für die Implementierung zu erstellen, wenn Sie über die entsprechenden Fähigkeiten verfügen.

Wie immer, wenn Sie etwas Unterhaltsames bauen möchten und sich über einen Rat freuen würden, [schreiben Sie mir bitte](https://albertocuesta.es/)! Ich helfe immer gerne.