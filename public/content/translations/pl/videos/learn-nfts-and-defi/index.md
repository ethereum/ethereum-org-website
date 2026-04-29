---
title: "Czym są NFT i jak można je wykorzystać w zdecentralizowanych finansach?"
description: "Zrozum mechanikę niewymiennych tokenów (NFT) na Ethereum i dowiedz się, jak są one wykorzystywane w aplikacjach zdecentralizowanych finansów (DeFi)."
lang: pl
youtubeId: "Xdkkux6OxfM"
uploadDate: 2020-09-29
duration: "0:11:13"
educationLevel: beginner
topic:
  - "nfts"
  - "defi"
  - "erc-721"
  - "erc-1155"
  - "pożyczanie"
format: explainer
author: Finematics
breadcrumb: "NFT i DeFi"
---

Materiał wyjaśniający od **Finematics** omawiający mechanikę niewymiennych tokenów (NFT) na Ethereum i ich powiązania ze zdecentralizowanymi finansami (DeFi), w tym standardy tokenów, przypadki użycia oraz pożyczanie pod zabezpieczenie w postaci NFT.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=Xdkkux6OxfM) opublikowanego przez Finematics. Został on lekko zredagowany w celu poprawy czytelności.*

#### Zamienne a niewymienne (0:00) {#fungible-vs-non-fungible-000}

Zacznijmy od słowa „zamienny” (ang. fungible). Zamienność oznacza, że poszczególne jednostki aktywa są wymienne i nieodróżnialne od siebie. Dobrym przykładem zamiennego aktywa jest waluta. Banknot pięciodolarowy ma zawsze taką samą wartość jak każdy inny banknot pięciodolarowy. Tak naprawdę nie obchodzi cię, który konkretnie banknot otrzymasz, ponieważ wszystkie są warte tyle samo.

Jeśli jednak chodzi o aktywa niewymienne, każda jednostka jest unikalna i nie może zostać bezpośrednio zastąpiona inną. Dobrym przykładem jest bilet lotniczy. Mimo że bilety lotnicze mogą wyglądać podobnie, każdy z nich zawiera inne nazwisko pasażera, miejsce docelowe, czas odlotu i numer miejsca. Próba wymiany jednego biletu lotniczego na inny mogłaby doprowadzić do poważnych problemów.

Innym przykładem są karty kolekcjonerskie. Mimo że mogą wyglądać podobnie, każda karta ma inne atrybuty. Czynniki takie jak rok produkcji lub stan zachowania karty mogą robić różnicę. Skrajnym przykładem czegoś niewymiennego jest dzieło sztuki — na przykład obraz zazwyczaj powstaje tylko w jednym oryginalnym egzemplarzu.

#### Właściwości NFT (2:13) {#properties-of-nfts-213}

Skoro wiemy już, co oznacza „niewymienny”, przyjrzyjmy się najczęstszym właściwościom NFT.

- **Unikalność** — każdy NFT ma inne właściwości, które zazwyczaj są przechowywane w metadanych tokena
- **Możliwa do udowodnienia rzadkość** — zazwyczaj istnieje ograniczona liczba NFT, a skrajnym przykładem jest istnienie tylko jednej kopii; liczbę tokenów można zweryfikować na blockchainie
- **Niepodzielność** — większości NFT nie można podzielić na mniejsze nominały, więc nie możesz kupić ani przetransferować ułamka swojego NFT

Podobnie jak standardowe tokeny, NFT również gwarantują własność aktywa, są łatwe do przetransferowania i odporne na oszustwa.

#### Standardy tokenów: ERC-20, ERC-721 i ERC-1155 (3:17) {#token-standards-erc-20-erc-721-and-erc-1155-317}

Chociaż NFT mogą być zaimplementowane na dowolnym blockchainie obsługującym programowanie inteligentnych kontraktów, najbardziej godnymi uwagi standardami są ERC-721 i ERC-1155 na Ethereum. Zanim zagłębimy się w standardy NFT, zróbmy krótkie podsumowanie ERC-20, ponieważ będzie to przydatne do porównania.

**ERC-20** to dobrze znany standard tworzenia tokenów na blockchainie Ethereum. Przykłady obejmują stablecoiny takie jak USDT czy DAI, oraz tokeny zdecentralizowanych finansów (DeFi) takie jak LEND, YFI, SNX i UNI. ERC-20 pozwala na tworzenie tokenów zamiennych — wszystkie tokeny utworzone w tym standardzie są całkowicie nieodróżnialne. Nie ma znaczenia, czy otrzymasz USDT od znajomego, czy z giełdy; wartość każdego tokena jest taka sama.

**ERC-721** to standard tworzenia niewymiennych tokenów. Pozwala na tworzenie kontraktów, które produkują odróżnialne tokeny o różnych właściwościach. Powszechnym przykładem jest słynne CryptoKitties — gra, która pozwala na kolekcjonowanie i rozmnażanie wirtualnych kotków.

**ERC-1155** to kolejny krok w tworzeniu niewymiennych tokenów. Ten standard pozwala na tworzenie kontraktów, które obsługują zarówno tokeny zamienne, jak i niewymienne. Został stworzony przez Enjin, projekt skupiający się na grach opartych na blockchainie. W wielu grach, takich jak World of Warcraft, gracz może posiadać zarówno przedmioty niewymienne — miecze, tarcze, zbroje — jak i przedmioty zamienne, takie jak złoto czy strzały. ERC-1155 pozwala deweloperom zdefiniować zarówno tokeny zamienne, jak i niewymienne oraz zdecydować, ile z nich powinno istnieć.

#### Przypadki użycia NFT (5:28) {#nft-use-cases-528}

Oprócz CryptoKitties istnieje kilka innych popularnych gier wykorzystujących NFT, takich jak Gods Unchained i Decentraland. Decentraland jest interesującym przykładem, ponieważ gracze mogą kupować parcele cyfrowej ziemi, które mogą być później odsprzedane lub nawet wykorzystane jako przestrzeń reklamowa w grze.

Inne przykłady obejmują rynki sztuki cyfrowej, takie jak Rarible i SuperRare, a nawet agregatory rynków, takie jak OpenSea. Kolejnym przykładem czegoś rzadkiego, co może być reprezentowane jako NFT, są nazwy domen — na przykład Ethereum Name Service z rozszerzeniem .eth i Unstoppable Domains z rozszerzeniem .crypto.

Niektóre NFT mogą być niezwykle kosztowne. Najdroższy CryptoKitty, Dragon, został sprzedany za 600 ETH pod koniec 2017 roku — co w tamtym czasie było warte około stu siedemdziesięciu tysięcy dolarów. Rzadkie nazwy domen, takie jak exchange.eth, mogą być warte ponad pięćset tysięcy dolarów.

#### NFT jako zabezpieczenie w DeFi (6:48) {#nfts-as-collateral-in-defi-648}

Jeśli chodzi o DeFi, NFT mogą uwolnić jeszcze większy potencjał dla zdecentralizowanych finansów. Obecnie zdecydowana większość protokołów pożyczkowych DeFi wymaga zabezpieczenia. Jednym z najciekawszych pomysłów jest wykorzystanie NFT jako zabezpieczenia. Oznacza to, że mógłbyś dostarczyć NFT reprezentujący dzieło sztuki, cyfrową ziemię, a nawet stokenizowane nieruchomości jako zabezpieczenie i pożyczyć pod nie pieniądze.

Brzmi to obiecująco, ale jest pewien problem. Na standardowych platformach pożyczkowych DeFi, takich jak Compound czy Aave, wartość dostarczonego zabezpieczenia można łatwo zmierzyć poprzez integrację wyroczni cenowych (ang. price oracles). Agregują one ceny z wielu płynnych źródeł, takich jak scentralizowane i zdecentralizowane giełdy. Jeśli chodzi o NFT, rynki dla poszczególnych tokenów są bardzo często niepłynne, co sprawia, że proces odkrywania cen jest trudny.

Aby lepiej zrozumieć ten problem, wyobraź sobie, że ktoś kupuje rzadkiego CryptoKitty za 10 ETH. Ten NFT jest później używany jako zabezpieczenie, a pożyczkobiorca pobiera 1700 DAI — zakładając, że 10 ETH jest warte 3500 dolarów, a ten konkretny NFT ma wskaźnik wartości pożyczki do wartości zabezpieczenia (LTV) na poziomie 50%. Jeśli po tym czasie nikt inny nie będzie chciał kupić tego konkretnego CryptoKitty, rynek dla tego NFT staje się niepłynny lub wręcz przestaje istnieć. Jedynym założeniem jest to, że NFT jest nadal wart tyle samo, za ile został ostatnio sprzedany — co nie jest bezpiecznym założeniem, ponieważ wartość NFT może się dość drastycznie zmieniać.

Właśnie dlatego niektóre projekty oferujące pożyczki zabezpieczone NFT wykorzystują nieco inny model: pożyczki peer-to-peer. W tym modelu rynkowym pożyczkobiorcy mogą oferować swoje NFT jako zabezpieczenie, a pożyczkodawcy mogą wybrać, które NFT są skłonni zaakceptować przed zainicjowaniem pożyczki. NFT użyte jako zabezpieczenie jest przechowywane w kontrakcie depozytowym (escrow), a jeśli pożyczkobiorca nie wywiąże się ze zobowiązania, nie spłacając pożyczonej kwoty wraz z odsetkami na czas, NFT jest transferowane do pożyczkodawcy. Ta przestrzeń jest nowa, ale jedną z firm, która wykorzystuje ten model, jest NFTfi.

#### NFT jako produkty finansowe (9:32) {#nfts-as-financial-products-932}

Oprócz wykorzystania jako zabezpieczenie, NFT mogą również reprezentować bardziej złożone produkty finansowe, takie jak ubezpieczenia, obligacje czy opcje. Yinsure od Yearn Finance jest dobrym przykładem wykorzystania NFT w przestrzeni ubezpieczeniowej. W Yinsure każdy kontrakt ubezpieczeniowy jest reprezentowany jako NFT, którym można również handlować na rynku wtórnym, takim jak Rarible.

Ostatnio zaczęliśmy również dostrzegać natywne dla DeFi koncepcje, takie jak kopanie płynności, wykorzystywane przez projekty NFT. Rarible na przykład zaczęło nagradzać swoich użytkowników tokenami zarządzania RARI za tworzenie, kupowanie i sprzedawanie NFT na ich platformie.

#### Rosnący rynek NFT (10:30) {#the-growing-nft-market-1030}

Z ponad 100 milionami dolarów w obrocie NFT i 6 milionami dolarów tylko w ostatnim miesiącu, przestrzeń NFT jest jedną z najszybciej rosnących nisz w krypto. Ma ogromny potencjał, począwszy od cyfrowych kotków, a skończywszy na złożonych produktach finansowych.