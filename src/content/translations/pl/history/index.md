---
title: Historia i forki Ethereum
description: Historia blockchainu Ethereum, w tym najważniejsze kamienie milowe, wydania i forki.
lang: pl
sidebarDepth: 1
isOutdated: true
---

# Historia Ethereum {#the-history-of-ethereum}

Oś czasu wszystkich najważniejszych kamieni milowych, forków i aktualizacji blockchainu Ethereum.

<ExpandableCard title="Czym są forki?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Forki powstają, gdy w sieci trzeba wprowadzić istotne aktualizacje techniczne lub zmiany – zazwyczaj wynikają one z p ropozycji ulepszeń Ethereum [Ethereum Improvement Proposals (EIP)](/eips/) i zmieniają „zasady” protokołu.

Gdy potrzebne są aktualizacje w tradycyjnym, centralnie sterowanym oprogramowaniu, firma po prostu opublikuje nową wersję dla użytkownika końcowego. Blockchainy działają inaczej, ponieważ nie ma centralnego właściciela. [Klienci Ethereum](/developers/docs/nodes-and-clients/) muszą zaktualizować swoje oprogramowanie, aby wdrożyć reguły nowego forka. Dodatkowo twórcy bloków (górnicy w świecie proof-of-work, walidatorzy w świecie proof-of-stake) i węzły muszą tworzyć bloki i przeprowadzać walidację zgodnie z nowymi zasadami. [Więcej o mechanizmach konsensusu](/developers/docs/consensus-mechanisms/)

Te zmiany reguł mogą spowodować tymczasowy podział w sieci. Nowe bloki można wytwarzać według nowych lub starych zasad. Forki są zwykle uzgadniane z wyprzedzeniem, tak aby klienci przyjęli zmiany jednomyślnie, a fork z aktualizacjami stał się głównym łańcuchem. Jednak w rzadkich przypadkach nieporozumienia dotyczące forków mogą spowodować trwały rozłam w sieci — przykładem jest powstanie Ethereum Classic z [DAO fork](#dao-fork).

</ExpandableCard>

<Divider />

## 2021 {#2021}

### (_W toku_) Altair {#altair}

Uaktualnienie Altair jest pierwszym planowanym uaktualnieniem [łańcucha śledzącego](/upgrades/beacon-chain). Jego wdrożenie ma nastąpić w 2021 r. Wprowadzi ono wsparcie dla „komitetów synchronizacji”, które mogą umożliwiać korzystanie z lekkich klientów, a także podniesie kary za brak aktywności i cięcia do ich pełnych wartości.

- [Przeczytaj specyfikację uaktualnienia Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

---

### London {#london}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Aug-05-2021 12:33:42 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numer bloko: <a href="https://etherscan.io/block/12965000">12 965 000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $2621 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#london-summary}

Uaktualnienie London wprowadziło [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), która zreformowała rynek opłat transakcyjnych oraz wprowadziła zmiany do sposobu obsługi zwrotów kosztów gazu oraz do harmonogramu [Epoki Lodowcowej](/glossary/#ice-age) (Ice Age).

- [Jesteś deweloperem aplikacji zdecentralizowanych? Pamiętaj o uaktualnieniu bibliotek i narzędzi.](https://github.com/ethereum/eth1.0-specs/blob/master/network-upgrades/ecosystem-readiness.md)
- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Przeczytaj objaśnienie Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP London" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) – _wprowadza ulepszenia rynku opłat transakcyjnych_
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) – _zwraca `BASEFEE` z bloku_
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) - _ogranicza zwroty kosztów gazu przy operacjach EVM_
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) - _zapobiega wdrażaniu kontraktów zaczynających się od `0xEF`_
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) – _opóźnia Epokę Lodowcową do grudnia 2021_

</ExpandableCard>

---

### Berlin {#berlin}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Apr-15-2021 10:07:03 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numer bloku: <a href="https://etherscan.io/block/12244000">12,244,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $2454 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210415093618/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#berlin-summary}

Uaktualnienie Berlin optymalizuje koszt gazu przy pewnych działaniach EVM oraz zwiększa wsparcie wielu rodzajów transakcji.

- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Przeczytaj objaśnienie Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP Berlin" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – _obniża koszt gazu ModExp_
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) – _ułatwia wsparcie wielu typów transakcji_
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – _koszt gazu wzrasta dla kodów operacyjnych dostępu do stanu_
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) – _dodaje opcjonalne listy dostępu_

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Geneza łańcucha śledzącego {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-01-2020 12:00:35 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku łańcucha śledzącego: <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $586,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#beacon-chain-genesis-summary}

[Łańcuch śledzący ](/upgrades/beacon-chain/) potrzebował 16384 depozytów z 32 zestakowanymi ETH, aby zapewnić bezpieczną wysyłkę. Stało się to 27 listopada, co oznacza, że łańcuch śledzący (​​Beacon Chain) rozpoczął produkcję bloków 1 grudnia 2020 roku. To ważny pierwszy krok w realizacji [wizji Eth2](/upgrades/vision/).

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  Łańcuch śledzący
</DocLink>

---

### Wdrożony kontrakt depozytu na staking {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-14-2020 09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/11052984">11052984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $379.04 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#deposit-contract-summary}

Do ekosystemu Ethereum został wprowadzony kontrakt depozytu na staking Choć był to kontrakt [sieci głównej](/glossary/#staking), miał bezpośredni wpływ na harmonogram wprowadzania [łańcucha odłamkowego](/upgrades/beacon-chain/), ważnego [ulepszenia Eth2](/upgrades/).

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jan-02-2020 08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/9200000">9200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $127,18 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#muir-glacier-summary}

Fork Muir Glacier wprowadził opóźnienie [bomby trudności](/glossary/#difficulty-bomb). Zwiększona trudność bloków konsensusu[proof-of-work](/developers/docs/consensus-mechanisms/pow/) grozi pogorszeniem przydatności Ethereum na skutek wydłużenia czasu oczekiwania na wysłanie transakcji i korzystanie z aplikacji zdecentralizowanych.

- [Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Przeczytaj objaśnienie Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP Muir Glacier" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) - _opóźnia bombę trudności o kolejne 4 000 000 bloków, lub ~611 dni._

</ExpandableCard>

<Divider />

## Rok 2019 {#2019}

### Istanbul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-08-2019 12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/9069000">9069000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $151,06 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#istanbul-summary}

Fork Istanbul:

- Zoptymalizował koszt <a href="/glossary/#gas">gazu</a> w niektórych działaniach [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Poprawa odporności na ataki typu „denial-of-service”.
- Poprawił działanie rozwiązań [skalowania warstwy 2](/developers/docs/scaling/#rollups) opartych na SNARKs i STARKs.
- Umożliwił współpracę Ethereum i Zcash.
- Umożliwił wprowadzenie bardziej kreatywnych funkcji kontraktu.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP Istanbul" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _umożliwia Ethereum korzystanie z waluty chroniącej prywatność takiej jak Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _tańsza kryptografia w celu obniżenia kosztów [gas](/glossary/#gas)._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _chroni Ethereum przed atakami metodą powtórzenia dzięki dodaniu [opcode] `CHAINID` (/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _optymalizacja cen gazu dla kodów operacyjnych na podstawie zużycia._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _ograniczenie kosztów CallData w celu zwiększenia ilość danych w blokach – korzystne dla [skalowania warstwy 2](/developers/docs/scaling/#rollups)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _inne zmiany dotyczące cen gazu dla kodów operacyjnych._

</ExpandableCard>

---

### Constantinople {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Feb-28-2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/7280000">7280000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $136,29 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#constantinople-summary}

Fork Constantinople:

- Zapewnił, że blockchain nie został zamrożony przed [wdrożeniem proof-of-stake](#beacon-chain-genesis).
- Zoptymalizował koszt <a href="/glossary/#gas">gazu</a> w niektórych działaniach [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Dodał możliwość interakcji z adresami, które nie zostały jeszcze utworzone.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP Constantinople" contentPreview="Official improvements included in this fork.">

- [EIP-145] (https://eips.ethereum.org/EIPS/eip-145) – _optymalizuje koszt niektórych działań w łańcuchu._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _pozwala na interakcję z adresami, które nie zostały jeszcze utworzone._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _optymalizuje koszt niektórych działań w łańcuchu._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _upewnia się, że blockchain nie zawiesza się przed sprawdzeniem proof-of-stake._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-16-2017 05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/4370000">4370000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $334,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#byzantium-summary}

Fork Byzantium:

- Zmniejszenie nagród za [wydobywanie](/developers/docs/consensus-mechanisms/pow/mining/) bloków z 5 do 3 ETH.
- Opóźnienie o rok [bomby trudności](/glossary/#difficulty-bomb).
- Dodano możliwość wykonywania niezmieniających stanów wywołań innych kontraktów.
- Dodano niektóre metody kryptografii, aby umożliwić [skalowanie warstwy 2](/developers/docs/scaling/#rollups).

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP Byzantium" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _dodaje kod operacyjny `REVERT._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _do pokwitowań transakcji dodano pole statusu, aby wskazać powodzenie lub niepowodzenie._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _dodaje krzywą eliptyczną i mnożenie skalarne, aby zezwolić na [ZK-Snarks](/developers/docs/scaling/zk-rollups/)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _dodaje krzywą eliptyczną i mnożenie skalarne, aby zezwolić na [ZK-Snarks](/developers/docs/scaling/zk-rollups/)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _umożliwia weryfikację podpisu RSA._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _dodaje obsługę wartości zwracanych o różnych długościach._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _dodaje kod operacyjny `STATICCALL` umożliwiający wykonywanie niezmieniających stanu wywołań innych kontraktów._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _zmienia wzór dostosowywania trudności._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _opóźnia [bombę trudności](/glossary/#difficulty-bomb) o 1 rok i zmniejsza nagrody za blok z 5 do 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Nov-22-2016 04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/2675000">2675000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $9,84 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#spurious-dragon-summary}

Fork Spurious Dragon był drugą odpowiedzią na ataki typu DoS (odmowa usługi) na sieć (wrzesień/październik 2016 r.). Obejmował:

- dostrajanie cen kodu operacyjnego, aby zapobiec przyszłym atakom w sieci.
- umożliwienie „debloat” stanu blockchain.
- dodanie ochrony przed atakami metodą powtórzenia.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP Spurious Dragon" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _zapobiega ponownemu przesyłaniu transakcji z jednego łańcucha Ethereum do innego łańcucha, na przykład transakcji w sieci testowej do głównego łańcucha Ethereum._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _dostosowuje ceny kodu operacyjnego `EXP` — utrudnia spowolnienie sieci poprzez kosztowne obliczeniowo operacje na kontraktach._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _umożliwia usuwanie pustych kont dodanych za pośrednictwem ataku DOS._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _zmienia maksymalny dozwolony rozmiar kodu kontraktu w blockchainie na 24576 bajty._

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-18-2016 01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/2463000">2463000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#tangerine-whistle-summary}

Fork Tangerine Whistle był pierwszą odpowiedzią na ataki typu „odmowa usługi” (DoS) na sieć (wrzesień/październik 2016 r.). Uwzględniał:

- rozwiązywanie pilnych problemów dotyczących kondycji sieci związanych z niedoszacowanymi kodami operacyjnymi.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP Tangerine Whistle" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _zwiększa koszty gazu w kodach operacyjnych, które można wykorzystać w atakach spamowych._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _redukuje rozmiar stanu, usuwając dużą liczbę pustych kont, które zostały wprowadzone w stan bardzo niskim kosztem z powodu błędów we wcześniejszych wersjach protokołu Ethereum._

</ExpandableCard>

---

### Fork DAO {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-20-2016 01:20:40 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/1920000">1920000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $12,54 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#dao-fork-summary}

Fork DAO był odpowiedzią na [atak DAO 2016](https://www.coindesk.com/understanding-dao-hack-journalists), który doprowadził do złamania niezabezpieczonego kontraktu [DAO](/glossary/#dao) i kradzieży ponad 3,6 mln ETH. Fork przeniósł fundusze z błędnego kontraktu do [nowego kontraktu](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) z jedną funkcją: wypłać. Każdy, kto stracił środki, mógł wypłacić 1 ETH za każde 100 tokenów DAO w swoim portfelu.

Ten kierunek działania został przegłosowany przez społeczność Ethereum. Każdy posiadacz ETH mógł głosować za pośrednictwem transakcji na [platformie do głosowania](http://v1.carbonvote.com/). Decyzja o forku została poparta ponad 85% głosów.

Niektórzy górnicy odmówili forku, ponieważ incydent DAO nie był defektem protokołu. Następnie utworzyli [Ethereum Classic](https://ethereumclassic.org/).

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Mar-14-2016 06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/1150000">1150000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#homestead-summary}

Przyszłościowy fork Homestead. Obejmował kilka zmian protokołu i zmianę sieci, która dała Ethereum możliwość wykonywania dalszych aktualizacji sieci.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP Homestead" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _dokonuje zmian w procesie tworzenia kontraktu._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _dodaje nowy kod operacji: `DELEGATECALL`_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _wprowadza wymagania zgodności w przód z devp2p_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Sep-07-2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/200000">200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: $1,24 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#frontier-thawing-summary}

Fork frontier thawing podniósł wynoszący 5000 limit [gazu](/glossary/#gas) na [blok](/glossary/#block) i określił domyślną cenę gazu na 51 [gwei](/glossary/#gwei). Pozwoliło to na transakcje – transakcje wymagają 21 tys. gazu.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-30-2015 03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Nr bloku: <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Cena ETH: nd.<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Podsumowanie {#frontier-summary}

Frontier był działającą, ale surową implementacją projektu Ethereum. Wprowadzono go po udanej fazie testów olimpijskich. Był przeznaczony dla użytkowników technicznych, w szczególności programistów. [Bloki](/glossary/#block) miały limit [gazu](/glossary/#gas) wynoszący 5000. Ten okres „thawing” umożliwił górnikom rozpoczęcie działalności, a wczesnym użytkownikom instalowanie klientów bez konieczności „pośpiechu”.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Sprzedaż Etheru {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 22 lipca - 02 września 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org na waybackmachine</a>

Ether był oficjalnie sprzedawany przez 42 dni. Można było go kupić za BTC.

[Przeczytaj ogłoszenie Fundacji Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Wydanie dokumentacji Yellowpaper {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 1 kwietnia 2014 r.<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

Dokumentacja Yellow Paper autorstwa dr Gavina Wood, jest techniczną definicją protokołu Ethereum.

[Wyświetl Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Wydanie dokumentacji Whitepaper {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 27 listopada 2013 r.<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org on waybackmachine</a>

Artykuł wprowadzający, opublikowany w 2013 roku przez Vitalika Buterina, założyciela Ethereum, przed uruchomieniem projektu w 2015 roku.

<DocLink to="/whitepaper/">
  Dokumentacja
</DocLink>
