---
title: Jak wdrożyć rynek ERC-721
description: Jak umieścić tokenizowane przedmioty w celu sprzedaży w zdecentralizowanym serwisie ogłoszeniowym
author: "Alberto Cuesta Cañada"
tags:
  - "inteligentne kontrakty"
  - "erc-721"
  - "solidity"
  - "tokeny"
skill: intermediate
lang: pl
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

W tym artykule pokażę Ci jak kodować Craigslist dla blockchainu Ethereum.

Przed Gumtree, Ebay i Craigslist tablice ogłoszeniowe były w większości wykonane z korka lub papieru. W korytarzach szkolnych, gazetach, ulicach i sklepach istniały klasyczne tablice.

Wszystko to zmieniło się wraz z Internetem. Liczba osób, które widzą konkretną tablicę klasyfikacyjną została pomnożona przez wiele rzędów wielkości. Dzięki temu rynki te stały się o wiele bardziej wydajne i skalowane na skalę światową. Ebay jest ogromnym biznesem, który wywodzi się z tych fizycznych tablic ogłoszeń.

Blockchain ponownie zmieni te rynki — pozwolę sobie pokazać, w jaki sposób.

## Monetyzacja {#monetization}

Model biznesowy serwisu ogłoszeniowego w publicznym blockchainie będzie musiał różnić się od modelu Ebay i spółki.

Po pierwsze, jest [kąt decentralizacji](/developers/docs/web2-vs-web3/). Istniejące platformy muszą utrzymywać własne serwery. Zdecentralizowana platforma jest utrzymywana przez użytkowników, a zatem koszt obsługi głównej platformy spadnie do zera dla właściciela platformy.

Następnie frontend — strona internetowa lub interfejs dający dostęp do platformy. Tutaj jest wiele możliwości. Właściciele platformy mogą ograniczyć dostęp i zmusić wszystkich do korzystania ze swojego interfejsu, pobierając opłaty. Właściciele platform mogą również zdecydować o otwarciu dostępu (Power to the People!) i pozwolić każdemu budować interfejsy na platformie. Lub właściciele mogliby wybrać jakiekolwiek pośrednie podejście.

_Liderzy biznesu, którzy mają więcej wizji niż ja, będą wiedzieć, jak na tym zarabiać. Widzę jedynie, że różni się to od status quo i prawdopodobnie jest opłacalne._

Ponadto istnieje kąt automatyzacji i płatności. Niektóre rzeczy mogą być bardzo [skutecznie tokenizowane](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) i sprzedawane w serwisach. Tokenizowane aktywa są łatwo przenoszone w blockchainie. Bardzo skomplikowane metody płatności mogą być łatwo wdrożone w blockchainie.

Po prostu wyczuwam tutaj okazję biznesową. W łatwy sposób można wdrożyć serwis ogłoszeniowy bez kosztów bieżących, ze złożonymi ścieżkami płatności uwzględnionymi w każdej transakcji. Jestem pewien, że ktoś wymyśli, do czego to wykorzystać.

Po prostu cieszę się, że to buduję. Rzućmy okiem na kod.

## Implementacja {#implementation}

Jakiś czas temu uruchomiliśmy [repozytorium open source](https://github.com/HQ20/contracts?ref=hackernoon.com) z implementacjami zastosowań biznesowych i innymi ciekawymi rzeczami. Rzuć okiem.

Kod tego [serwisu ogłoszeniowego Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) jest dostępny, możesz go używać do woli. Pamiętaj tylko, że kod nie został poddany audytowi i musisz zrobić własną analizę due dililgence, zanim włożysz w niego pieniądze.

Podstawy tablicy nie są skomplikowane. Wszystkie reklamy na tablicy będą tylko strukturą z kilkoma polami:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

Tak więc jest ktoś zamieszczający reklamę. Przedmiot na sprzedaż. Cenę za przedmiot. Status transakcji, która może być otwarta, wykonana lub anulowana.

Wszystkie te transakcje będą przechowywane w mapach. Ponieważ wszystko w Solidity wydaje się być mapowaniem. Również dlatego, że jest to wygodne.

```solidity
mapping(uint256 => Trade) public trades;
```

Korzystanie z mapowania oznacza, że przed opublikowaniem tej wiadomości musimy przedstawić identyfikator dla każdej reklamy. i będziemy musieli poznać identyfikator reklamy, zanim będziemy mogli na niej działać. Istnieje wiele sposobów radzenia sobie z tym problemem, zarówno w ramach inteligentnego kontraktu, jak i w fazie początkowej. Zapytaj, jeśli potrzebujesz wskazówek.

Następnie pojawia się pytanie, z czym mamy do czynienia i jaka waluta jest wykorzystywana do zapłaty za transakcję.

Jeśli chodzi o przedmioty, zamierzamy tylko poprosić o implementację interfejsu [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), który naprawdę jest sposobem na reprezentowanie realnych pozycji świata w blockchain, chociaż [najlepiej współpracuje z cyfrowymi aktywami](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Zamierzamy określić nasz własny kontrakt ERC721 w konstruktorze, co oznacza, że wszelkie aktywa w naszym serwisie muszą być uprzednio tokenizowane.

W przypadku płatności zamierzamy zrobić coś podobnego. Większość projektów blockchain definiuje własną kryptowalutę [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Inni wolą korzystać z głównego nurtu takiego jak DAI. W tym serwisie ogłoszeniowym musisz tylko zdecydować podczas budowy, jaka będzie Twoja waluta. Łatwo.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Dochodzimy do tego. Mamy ogłoszenia, przedmioty do handlu i walutę do płatności. Ogłoszenie oznacza umieszczenie przedmiotu w escrow, aby pokazać, że się go ma i że nie informowało się o nim dwa razy, być może w innym serwisie.

Poniższy kod dokładnie to robi. Umieszcza przedmiot w escrow, tworzy ogłoszenie, wykonuje pewne czynności porządkowe.

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

Przyjąć ofertę oznacza wybrać ogłoszenie (ofertę), zapłacić cenę, otrzymać przedmiot. Poniższy kod pobiera transakcję. Sprawdza, czy jest dostępna. Płaci za przedmiot. Pobiera przedmiot. Aktualizuje ogłoszenie.

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

Mamy też możliwość wycofania się sprzedawców z transakcji zanim kupujący je zaakceptuje. W niektórych modelach ogłoszenia byłyby aktywne przez pewien okres czasu, zanim wygasną. Twój wybór, w zależności od projektu Twojego rynku.

Kod jest bardzo podobny do kodu użytego do realizacji transakcji, tylko, że nie ma wymiany walut i przedmiot wraca na tablicę ogłoszeniową.

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

To już wszystko. Dotrwałeś do końca implementacji. To zaskakujące, jak kompaktowe są niektóre pojęcia biznesowe wyrażane w kodzie i jest to jeden z tych przypadków. Sprawdź pełną umowę [w naszym repozytorium](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Podsumowanie {#conclusion}

Serwisy ogłoszeniowe to powszechna konfiguracja rynku, która intensywnie rosła wraz z Internetem, stając się niezwykle popularnym modelem biznesowym z kilkoma monopolistycznymi zwycięzcami.

Serwisy ogłoszeniowe stały się również łatwym narzędziem do replikacji w środowisku blockchain, z bardzo specyficznymi funkcjami, które umożliwią rzucenie wyzwania istniejącym gigantom.

W tym artykule podjąłem próbę połączenia realiów biznesowych serwisów ogłoszeniowych z implementacją technologii. Ta wiedza powinna pomóc w stworzeniu wizji i planu implementacji, jeśli masz odpowiednie umiejętności.

Jak zawsze, jeśli chcesz zbudować coś fajnego i chciałbyś otrzymać jakąś radę, proszę [napisz do mnie](https://albertocuesta.es/)! Zawsze chętnie służę pomocą.
