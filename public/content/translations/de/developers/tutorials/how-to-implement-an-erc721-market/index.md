---
title: Wie man einen ERC-721 Markt implementiert
description: Wie man tokenisierte Assets auf einer dezentralen Pinnwand zum Verkauf anbietet
author: "Alberto Cuesta Cañada"
tags: [ "Smart Contracts", "erc-721", "Solidity", "Token" ]
skill: intermediate
lang: de
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

In diesem Artikel werde ich dir zeigen, wie du Craigslist für die Ethereum Blockchain programmieren kannst.

Vor Ebay, Craigslist und Gumtree waren Kleinanzeigen vor allem aus Kork oder Papier gemacht. Es gab Kleinanzeigen in Schulkorridoren, Zeitungen, an Straßenbeleuchtungen und Schaufenstern.

All das änderte sich mit dem Internet. Die Anzahl der Personen, die eine bestimmte Kleinanzeige sehen konnten, multiplizierte sich um ein Vielfaches. Damit wurden die Märkte, die sie repräsentieren, viel effizienter und skalierter auf globale Größe. Ebay ist ein massives Geschäft, dessen Ursprünge auf diese physikalischen Kleinanzeiger zurückgehen.

Angesichts der Blockchain werden sich diese Märkte erneut ändern, lass mich dir zeigen, wie.

## Monetisierung {#monetization}

Das Geschäftsmodell einer öffentlichen Blockchain-Kleinanzeige muss sich von dem von Ebay und Unternehmen unterscheiden.

Zuerst gibt es [den Dezentralisierungsaspekt](/developers/docs/web2-vs-web3/). Bestehende Plattformen müssen ihre eigenen Server unterhalten. Eine dezentrale Plattform wird von ihren Benutzern verwaltet, so dass die Kosten für den Betrieb der Kernplattform für die Plattform-Besitzer auf Null sinken.

Dann gibt es das Front-End, die Website oder Schnittstelle, den Zugriff auf die Plattform. Hier gibt es viele Möglichkeiten. Die Besitzer der Plattform können den Zugang einschränken und jeden zwingen, ihr Interface zu verwenden und eine Gebühr zu verlangen. Die Plattformeigentümer können sich auch dazu entscheiden, den Zugang zu öffnen (Alle Macht dem Volk!) und jeden Schnittstellen zur Plattform bauen zu lassen. Oder die Eigentümer könnten sich bei jedem Ansatz für die Mitte dieser Extreme entscheiden.

_Geschäftsführer mit mehr Vision als ich, wissen, wie man dies monetarisieren kann. Ich sehe lediglich, dass dies anders ist als der Status quo und wahrscheinlich gewinnbringend._

Darüber hinaus gibt es den Automatisierungs- und Zahlungsverkehrsblickwinkel. Manche Dinge können sehr [effektiv tokenisiert](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) und auf einer Kleinanzeigen-Plattform gehandelt werden. Tokenisierte Assets werden einfach in einer Blockchain übertragen. Hochkomplexe Zahlungsmethoden lassen sich in einer Blockchain einfach umsetzen.

Ich rieche hier nur eine Geschäftsgelegenheit. Eine Kleinanzeige ohne laufende Kosten lässt sich problemlos umsetzen, wobei bei jeder Transaktion komplexe Zahlungswege enthalten sind. Ich bin mir sicher, dass jemand eine gute Idee haben wird, wofür er dies nutzen sollte.

Ich bin nur glücklich, es zu entwickeln. Werfen wir einen Blick auf den Code.

## Implementierung {#implementation}

Vor einiger Zeit haben wir ein [Open-Source-Repository](https://github.com/HQ20/contracts?ref=hackernoon.com) mit Implementierungsbeispielen für Geschäftsszenarien und anderen Goodies gestartet, schau es dir bitte an.

Der Code für dieses [Ethereum Classifieds Board](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) ist dort zu finden, bitte benutze ihn und tobe dich damit aus. Sei dir bewusst, dass der Code noch nicht geprüft wurde und du deine Sorgfaltspflicht erledigen musst, bevor du Geld in den Code steckst.

Die Grundlagen des Boards sind nicht komplex. Alle Anzeigen im Board werden nur ein Struct mit ein paar Feldern sein:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

Es gibt jemanden, der die Anzeige veröffentlicht. Ein Artikel zum Verkauf. Ein Preis für diesen Artikel. Der Status des Handels, der geöffnet, ausgeführt oder aufgehoben werden kann.

Alle diese Geschäfte werden in einer Kartierung aufbewahrt. Weil alles in Solidity ein Mapping zu sein scheint. Auch weil es bequem ist.

```solidity
mapping(uint256 => Trade) public trades;
```

Die Verwendung eines Mappings bedeutet lediglich, dass wir eine ID für jedes Inserat erstellen müssen, bevor wir es veröffentlichen und wir werden die ID einer Anzeige wissen müssen, bevor wir daran arbeiten können. Es gibt mehrere Möglichkeiten, dies entweder im Smart-Contract oder im Front-end zu lösen. Bitte frage dich, ob du Pointer benötigst.

Als nächstes stellt sich die Frage, mit welcher Währung wir uns befassen und mit welcher Währung wir die Transaktion finanzieren.

Für die Gegenstände fordern wir lediglich, dass sie die [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com)-Schnittstelle implementieren, was eigentlich nur eine Methode ist, um reale Gegenstände in einer Blockchain darzustellen, obwohl sie am besten [mit digitalen Vermögenswerten funktioniert](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Wir werden unseren eigenen ERC721 Vertrag im Konstrukteur spezifizieren, was bedeutet, dass alle Vermögenswerte in unserem Kleinanzeigen-Board vorher tokenisiert werden müssen.

Für die Zahlungen werden wir etwas Ähnliches machen. Die meisten Blockchain-Projekte definieren ihre eigene [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) Kryptowährung. Einige andere ziehen es vor, eine Mainstream-Währung wie den DAI zu verwenden. In diesem Kleinanzeigen-Board musst du im Konstruktor über die Währung entscheiden. Einfach.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Wir haben es fast geschafft. Wir haben Werbung, Artikel für den Handel und eine Währung für Zahlungen. Eine Anzeige zu machen bedeutet, einen Gegenstand in das Treuhandkontol zu legen und zu zeigen, dass du ihn nicht zweimal gepostet hast, möglicherweise in einem anderen Board.

Der folgende Code tut genau das. Legt den Gegenstand in escrow, erstellt die Werbung, macht ein wenig den Haushalt.

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

Den Handel zu akzeptieren bedeutet, wähle eine Anzeige (Handel), zahle den Preis, erhalte den Artikel. Der untenstehende Code ruft einen Handel auf. Überprüft, ob er verfügbar ist. Bezahlt den Artikel. Erhält den Artikel. Aktualisiert die Anzeige.

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

Schließlich haben wir die Möglichkeit für Verkäufer, von einem Handel zurückzutreten, bevor ein Käufer ihn annimmt. In einigen Modellen würden Anzeigen statt dessen eine Zeitspanne lang live sein, bevor sie ablaufen. Deine Wahl, abhängig vom Design Ihres Marktes.

Der Code ist sehr ähnlich wie bei der Handelsausführung nur dass keine Währung wechselt wird und der Artikel zurück zum Verkäufer geht.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Der Handel kann nur vom Ersteller storniert werden."
  );
  require(trade.status == "Open", "Der Handel ist nicht offen.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

Das wars. Du hast es bis zum Ende der Umsetzung geschafft. Es ist ziemlich überraschend, wie kompakt einige Geschäftskonzepte sind, wenn sie im Code ausgedrückt werden, und das ist einer dieser Fälle. Sieh dir den vollständigen Vertrag [in unserem Repo](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol) an.

## Fazit {#conclusion}

Kleinanzeigen sind eine gemeinsame Marktkonfiguration, die massiv mit dem Internet skaliert wurde und zu einem sehr beliebten Geschäftsmodell mit ein paar monopolistischen Gewinnern geworden ist.

Kleinanzeigen sind auch ein einfaches Werkzeug zum Nachahmen in einer Blockchain-Umgebung mit sehr spezifischen Merkmalen, die eine Herausforderung für die bestehenden Marktführer ermöglichen.

In diesem Artikel habe ich den Versuch unternommen, die Geschäftswirklichkeit eines Kleinanzeigen-Business mit der technologischen Umsetzung zu verbinden. Dieses Wissen sollte dir helfen, eine Vision und einen Fahrplan für die Umsetzung zu erstellen, wenn du über die richtigen Fähigkeiten verfügst.

Wie immer gilt: Wenn du etwas Lustiges bauen willst und einen Ratschlag gebrauchen könntest, [schreib mir einfach eine Nachricht](https://albertocuesta.es/)! Ich helfe immer gerne.
