---
title: "Jak zaimplementować rynek ERC-721"
description: "Jak wystawić stokenizowane przedmioty na sprzedaż na zdecentralizowanej tablicy ogłoszeń"
author: "Alberto Cuesta Cañada"
tags: ["inteligentne kontrakty", "erc-721", "Solidity", "tokeny"]
skill: intermediate
breadcrumb: Rynek ERC-721
lang: pl
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

W tym artykule pokażę Ci, jak zaprogramować odpowiednik Craigslist dla blockchaina Ethereum.

Przed powstaniem Gumtree, Ebay i Craigslist, tablice ogłoszeń były w większości zrobione z korka lub papieru. Tablice ogłoszeniowe znajdowały się na szkolnych korytarzach, w gazetach, na latarniach ulicznych i w witrynach sklepowowych.

Wszystko to zmieniło się wraz z nadejściem internetu. Liczba osób, które mogły zobaczyć konkretną tablicę ogłoszeń, wzrosła o wiele rzędów wielkości. Dzięki temu rynki, które one reprezentują, stały się znacznie bardziej wydajne i urosły do globalnych rozmiarów. Ebay to ogromny biznes, który wywodzi się z tych fizycznych tablic ogłoszeniowych.

Dzięki technologii blockchain rynki te znów ulegną zmianie, pozwól, że pokażę Ci jak.

## Monetyzacja {#monetization}

Model biznesowy publicznej tablicy ogłoszeń opartej na blockchainie będzie musiał różnić się od tego, który stosuje Ebay i podobne firmy.

Po pierwsze, istnieje [kwestia decentralizacji](/developers/docs/web2-vs-web3/). Istniejące platformy muszą utrzymywać własne serwery. Zdecentralizowana platforma jest utrzymywana przez jej użytkowników, więc koszt prowadzenia głównej platformy spada do zera dla jej właściciela.

Następnie mamy front-end, czyli stronę internetową lub interfejs dający dostęp do platformy. Tutaj istnieje wiele opcji. Właściciele platformy mogą ograniczyć dostęp i zmusić wszystkich do korzystania z ich interfejsu, pobierając za to opłatę. Mogą również zdecydować się na otwarty dostęp (Władza w ręce ludu!) i pozwolić każdemu na tworzenie interfejsów do platformy. Właściciele mogą też zdecydować się na dowolne podejście pomiędzy tymi skrajnościami.

_Liderzy biznesu z większą wizją niż moja będą wiedzieli, jak to zmonetyzować. Ja widzę tylko, że różni się to od status quo i prawdopodobnie jest opłacalne._

Ponadto dochodzi kwestia automatyzacji i płatności. Niektóre rzeczy mogą być bardzo [skutecznie stokenizowane](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) i stanowić przedmiot handlu na tablicy ogłoszeń. Stokenizowane aktywa są łatwo przesyłane w blockchainie. Wysoce złożone metody płatności mogą być z łatwością zaimplementowane w blockchainie.

Wyczuwam tu po prostu okazję biznesową. Tablica ogłoszeń bez kosztów operacyjnych może być łatwo zaimplementowana, ze złożonymi ścieżkami płatności zawartymi w każdej transakcji. Jestem pewien, że ktoś wpadnie na pomysł, do czego to wykorzystać.

Ja po prostu cieszę się z jej budowania. Spójrzmy na kod.

## Implementacja {#implementation}

Jakiś czas temu uruchomiliśmy [repozytorium open source](https://github.com/HQ20/contracts?ref=hackernoon.com) z przykładowymi implementacjami przypadków biznesowych i innymi dodatkami, zachęcam do zapoznania się z nim.

Kod tej [tablicy ogłoszeń Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) znajduje się tam, proszę, używaj go do woli. Pamiętaj tylko, że kod nie był audytowany i musisz przeprowadzić własną analizę due diligence, zanim zainwestujesz w to jakiekolwiek pieniądze.

Podstawy działania tablicy nie są skomplikowane. Wszystkie ogłoszenia na tablicy będą po prostu strukturą (struct) z kilkoma polami:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Otwarte, Wykonane, Anulowane
}
```

Mamy więc kogoś, kto publikuje ogłoszenie. Przedmiot na sprzedaż. Cenę przedmiotu. Status transakcji, który może być otwarty (open), zrealizowany (executed) lub anulowany (cancelled).

Wszystkie te transakcje będą przechowywane w mapowaniu (mapping). Ponieważ wszystko w Solidity wydaje się być mapowaniem. A także dlatego, że jest to wygodne.

```solidity
mapping(uint256 => Trade) public trades;
```

Użycie mapowania oznacza po prostu, że musimy wymyślić identyfikator (id) dla każdego ogłoszenia przed jego opublikowaniem, i będziemy musieli znać id ogłoszenia, zanim będziemy mogli na nim operować. Istnieje wiele sposobów radzenia sobie z tym, zarówno w inteligentnym kontrakcie, jak i we front-endzie. Daj znać, jeśli potrzebujesz wskazówek.

Następnie pojawia się pytanie, czym są te przedmioty, z którymi mamy do czynienia, i jaka jest ta waluta używana do opłacenia transakcji.

W przypadku przedmiotów będziemy po prostu wymagać, aby implementowały interfejs [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), który w rzeczywistości jest tylko sposobem reprezentowania przedmiotów ze świata rzeczywistego w blockchainie, chociaż [najlepiej sprawdza się w przypadku aktywów cyfrowych](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). W konstruktorze określimy nasz własny kontrakt ERC-721, co oznacza, że wszelkie aktywa na naszej tablicy ogłoszeń muszą zostać wcześniej stokenizowane.

W przypadku płatności zrobimy coś podobnego. Większość projektów blockchain definiuje własną kryptowalutę [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Inne wolą używać walut głównego nurtu, takich jak DAI. W przypadku tej tablicy ogłoszeń wystarczy zdecydować podczas tworzenia (w konstruktorze), jaka będzie Twoja waluta. Proste.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Zbliżamy się do celu. Mamy ogłoszenia, przedmioty na wymianę i walutę do płatności. Stworzenie ogłoszenia oznacza umieszczenie przedmiotu w depozycie (escrow), aby pokazać zarówno, że go posiadasz, jak i że nie opublikowałeś go dwukrotnie, na przykład na innej tablicy.

Poniższy kod robi dokładnie to. Umieszcza przedmiot w depozycie, tworzy ogłoszenie i wykonuje pewne prace porządkowe.

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

Zaakceptowanie transakcji oznacza wybranie ogłoszenia (transakcji), zapłacenie ceny i otrzymanie przedmiotu. Poniższy kod pobiera transakcję. Sprawdza, czy jest dostępna. Płaci za przedmiot. Odbiera przedmiot. Aktualizuje ogłoszenie.

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

Na koniec mamy opcję dla sprzedawców, aby wycofać się z transakcji, zanim kupujący ją zaakceptuje. W niektórych modelach ogłoszenia byłyby aktywne przez pewien czas, zanim wygasną. Wybór należy do Ciebie, w zależności od projektu Twojego rynku.

Kod jest bardzo podobny do tego używanego do realizacji transakcji, z tą różnicą, że żadna waluta nie zmienia właściciela, a przedmiot wraca do osoby publikującej ogłoszenie.

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

To wszystko. Dotarłeś do końca implementacji. To dość zaskakujące, jak zwięzłe są niektóre koncepcje biznesowe, gdy wyrazi się je w kodzie, a to jest jeden z takich przypadków. Sprawdź kompletny kontrakt [w naszym repozytorium](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Wnioski {#conclusion}

Tablice ogłoszeń to powszechna konfiguracja rynku, która masowo się przeskalowała wraz z internetem, stając się niezwykle popularnym modelem biznesowym z kilkoma monopolistycznymi zwycięzcami.

Tablice ogłoszeń są również łatwym narzędziem do zreplikowania w środowisku blockchain, z bardzo specyficznymi funkcjami, które umożliwią rzucenie wyzwania istniejącym gigantom.

W tym artykule podjąłem próbę połączenia rzeczywistości biznesowej tablicy ogłoszeń z implementacją technologiczną. Ta wiedza powinna pomóc Ci stworzyć wizję i plan wdrożenia, jeśli posiadasz odpowiednie umiejętności.

Jak zawsze, jeśli zamierzasz zbudować coś fajnego i przydałaby Ci się porada, [daj mi znać](https://albertocuesta.es/)! Zawsze chętnie pomogę.