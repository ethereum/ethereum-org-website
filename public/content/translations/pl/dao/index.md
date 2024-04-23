---
title: Zdecentralizowane autonomiczne organizacje (DAO)
description: Przegląd DAO na Ethereum
lang: pl
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /use-cases/dao-2.png
alt: Reprezentacja DAO głosującego nad wnioskiem.
summaryPoint1: Społeczności należące do członków bez scentralizowanego przywództwa.
summaryPoint2: Bezpieczny sposób współpracy z nieznajomymi w internecie.
summaryPoint3: Bezpieczne miejsce, w którym można przeznaczyć środki na określoną sprawę.
---

## Czym są DAO? {#what-are-daos}

A DAO is a collectively-owned organization working towards a shared mission.

DAO pozwalają nam pracować z podobnie myślącymi ludźmi na całym świecie bez ufania życzliwemu liderowi, który zarządza funduszami lub operacjami. Nie ma dyrektora generalnego, który mógłby wydawać fundusze według kaprysu, ani dyrektora finansowego, który mógłby manipulować księgami. Zamiast tego zasady oparte na łańcuchu bloków wpisane w kod określają sposób działania organizacji i sposób wydawania funduszy.

Mają wbudowane skarbce, do których nikt nie ma prawa dostępu bez zgody grupy. Decisions are governed by proposals and voting to ensure everyone in the organization has a voice, and everything happens transparently [on-chain](/glossary/#on-chain).

## Dlaczego potrzebujemy DAO? {#why-dao}

Założenie organizacji z kimś, kto obejmuje fundusze i pieniądze, wymaga dużego zaufania do ludzi, z którymi pracujesz. Jednak trudno jest zaufać komuś, z kim miało się kontakt tylko przez Internet. Z DAO nie musisz ufać nikomu innemu w grupie, tylko kodowi DAO, który jest w 100% przejrzysty i weryfikowalny przez każdego.

To otwiera tak wiele nowych możliwości globalnej współpracy i koordynacji.

### Porównanie {#dao-comparison}

| DAO                                                                                                                  | Tradycyjna organizacja                                                                                           |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Zwykle równa i w pełni zdemokratyzowana.                                                                             | Zwykle hierarchiczna.                                                                                            |
| Wymagane głosowanie zespołu, by wprowadzić zmianę.                                                                   | W zależności od struktury można jedynie zażądać zmian od stronnictwa lub zaproponować głosowanie.                |
| Głosy zostały podliczone, a wynik wdrożony automatycznie, bez zaufanego pośrednika.                                  | Jeśli głosowanie jest ważne, głosy są podliczane wewnętrznie, a wyniki głosowania muszą być obsługiwane ręcznie. |
| Oferowane usługi są obsługiwane automatycznie w sposób zdecentralizowany (np. dystrybucja funduszy filantropijnych). | Wymaga obsługi przez człowieka lub centralnie sterowanej automatyki, podatnej na manipulację.                    |
| Wszystkie działania są przejrzyste i w pełni publiczne.                                                              | Aktywność jest zazwyczaj niepubliczna.                                                                           |

### Przykłady DAO {#dao-examples}

W celu rozwiania niepewności poniżej podano kilka przykładów użycia DAO:

- **A charity** – you could accept donations from anyone in the world and vote on which causes to fund.
- **Collective ownership** – you could purchase physical or digital assets and members can vote on how to use them.
- **Ventures and grants** – you could create a venture fund that pools investment capital and votes on ventures to back. Zwrócone pieniądze mogłyby następnie zostać rozdzielone między członków DAO.

## Jak działa DAO? {#how-daos-work}

The backbone of a DAO is its [smart contract](/glossary/#smart-contract), which defines the rules of the organization and holds the group's treasury. Gdy kontrakt zostanie wdrożony na Ethereum, nikt nie może zmienić zasad bez wcześniejszego głosowania. Jeśli ktoś spróbuje zrobić coś niezgodnego z zasadami i logiką kodu, to się nie uda. Dlatego, że skarbiec jest zdefiniowany przez inteligentny kontrakt, nikt nie może też wydać pieniędzy bez zgody grupy. Oznacza to, że DAO nie potrzebują organu centralnego. Zamiast tego to grupa podejmuje wspólne decyzje, a wydatki są automatycznie autoryzowane w momencie przejścia głosowania.

Jest to możliwe, ponieważ inteligentne kontrakty są zabezpieczone przed ingerencją osób niepowołanych po ich wdrożeniu na Ethereum. Nie możesz po prostu edytować kodu (zasad DAO) niepostrzeżenie, ponieważ wszystko jest publiczne.

## Ethereum i DAO {#ethereum-and-daos}

Ethereum jest idealną podstawą dla DAO z wielu powodów:

- Ethereum’s own consensus is decentralized and established enough for organizations to trust the network.
- Inteligentny kod kontraktu nie może być modyfikowany, kiedy już został wdrożony, nawet przez jego właścicieli. Pozwala to DAO na stosowanie zasad, z którymi został zaprogramowany.
- Inteligentne kontrakty mogą wysyłać/odbierać środki. Bez tego byłby ci potrzebny zaufany pośrednik do zarządzania funduszami grupy (DAO).
- Społeczność Ethereum okazała się bardziej oparta na współpracy niż na konkurencyjności, co pozwoliło na szybkie pojawienie się najlepszych praktyk i systemów wsparcia.

## Zarządzanie DAO {#dao-governance}

Istnieje wiele czynników związanych z zarządzaniem DAO, takich jak sposób głosowania i składania wniosków.

### Oddelegowywanie {#governance-delegation}

Oddelegowywanie w DAO jest wersją demokracji przedstawicielskiej. Posiadacze tokenów delegują głosy użytkownikom, którzy się nominują i zobowiązują do kierowania protokołem i pozostawania na bieżąco z informacjami.

#### Znany przykład {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – ENS holders can delegate their votes to engaged community members to represent them.

### Automatyczne zarządzanie transakcjami {#governance-example}

W wielu DAO transakcje będą automatycznie wykonywane, jeśli kworum członków zagłosuje za potwierdzeniem.

#### Znany przykład {#governance-example}

[Nouns](https://nouns.wtf) – In Nouns DAO, a transaction is automatically executed if a quorum of votes is met and a majority votes affirmative, as long as it is not vetoed by the founders.

### Wielostronne zarządzanie {#governance-example}

While DAOs may have thousands of voting members, funds can live in a [wallet](/glossary/#wallet) shared by 5-20 active community members who are trusted and usually doxxed (public identities known to the community). After a vote, the [multisig](/glossary/#multisig) signers execute the will of the community.

## Prawa DAO {#dao-laws}

W 1977 r. w Wyoming powstały pierwsze spółki z ograniczoną odpowiedzialnością (LLC), które chronią przedsiębiorców i ograniczają ich odpowiedzialność. Ostatnio wprowadziły one ustawę DAO, która ustanawia status prawny DAO. Obecnie w Wyoming, Vermont i na Wyspach Dziewiczych obowiązuje w pewnej formie prawo DAO.

### Znany przykład {#law-example}

[CityDAO](https://citydao.io) – CityDAO użył prawa DAO Wyoming, aby kupić 40 hektarów ziemi w pobliżu Parku Narodowego Yellowstone.

## Członkostwo DAO {#dao-membership}

Istnieją różne modele członkostwa w DAO. Członkostwo może decydować o tym, w jaki sposób działa głosowanie i inne kluczowe części DAO.

### Członkostwo oparte na tokenach {#token-based-membership}

Usually fully [permissionless](/glossary/#permissionless), depending on the token used. Mostly these governance tokens can be traded permissionlessly on a [decentralized exchange](/glossary/#dex). Inne muszą być zdobywane poprzez zapewnienie płynności lub innego proof of work. Tak czy inaczej, posiadanie tokena zapewnia dostęp do głosowania.

_Zwykle używane do zarządzania szerokimi zdecentralizowanymi protokołami i/lub tokenami._

#### Znany przykład {#token-example}

[MakerDAO](https://makerdao.com) – token MakerDAO-a jest powszechnie dostępny na zdecentralizowanych giełdach i każdy może kupić siłę głosu w przyszłości protokołu Makera.

### Członkostwo oparte na akcjach {#share-based-membership}

DAO oparte na akcjach są bardziej dozwolone, ale nadal dość otwarte. Każdy przyszły członek może złożyć wniosek o przystąpienie do DAO, oferując zwykle hołd pewnej wartości w postaci tokenów lub pracy. Akcje reprezentują bezpośrednie prawo głosu i własność. Członkowie mogą w każdej chwili zrezygnować, zabierając ze sobą swój proporcjonalny udział w majątku.

_Zwykle używane w przypadku bardziej zbliżonych organizacji, takich jak organizacje charytatywne, spółdzielnie pracy i kluby inwestycyjne. Może również zarządzać protokołami i tokenami._

#### Znany przykład {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO is focused on funding Ethereum projects. Wymagają one wniosku o członkostwo, tak aby grupa mogła ocenić, czy ma Pan/Pani kapitał i wiedzę specjalistyczną niezbędną do dokonania świadomych ocen dotyczących potencjalnych grantów. Nie można kupić dostępu do DAO na otwartym rynku.

### Członkostwo oparte na reputacji {#reputation-based-membership}

Reputacja stanowi dowód udziału i przyznania uprawnień głosu w DAO. W przeciwieństwie do tokena lub członkostwa opartego na współdzieleniu, DAO oparte na reputacji nie przenoszą własności na współtwórców. Reputacja nie może być kupowana, przekazywana lub delegowana; członkowie DAO muszą zdobywać reputację poprzez uczestnictwo. Głosowanie w łańcuchu jest bezpodstawne, a przyszli członkowie mogą swobodnie zgłaszać propozycje przystąpienia do DAO i prosić o uzyskanie reputacji i żetonów jako nagrody w zamian za ich wkład.

_Typically used for decentralized development and governance of protocols and [dapps](/glossary/#dapp), but also well suited to a diverse set of organizations like charities, worker collectives, investment clubs, etc._

#### Znany przykład {#reputation-example}

[DXdao](https://DXdao.eth.link) – DXdao jest niezależną globalną zbiorowością społeczną, od 2019 r. tworzącą zdecentralizowane protokoły i aplikacje i zarządzającą nimi. It leverages reputation-based governance and [holographic consensus](/glossary/#holographic-consensus) to coordinate and manage funds, meaning no one can buy their way into influencing its future.

## Dołącz / rozpocznij DAO {#join-start-a-dao}

### Dołącz do DAO {#join-a-dao}

- [Ethereum Społeczność DAOs](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Lista DAOHaus z DAOs](https://app.daohaus.club/explore)
- [Lista DAOs Tally.xyz](https://www.tally.xyz)

### Rozpocznij DAO {#start-a-dao}

- [Przywołaj DAO z DAOHaus](https://app.daohaus.club/summon)
- [Uruchom gubernatora DAO z Tally](https://www.tally.xyz/add-a-dao)
- [Utwórz DAO napędzane Aragonem](https://aragon.org/product)
- [Rozpocznij kolonię](https://colony.io/)
- [Utwórz DAO z holograficznym konsensusem DAO-stack](https://alchemy.daostack.io/daos/create)

## Przeczytaj także {#further-reading}

### Artykuły DAO {#dao-articles}

- [Co to jest DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [House of DAOs](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Co to jest DAO i co to jest?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Jak założyć społeczność cyfrową w oparciu o DAO?](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Co to jest DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Co to jest konsensus holograficzny?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) – [DAOstack](https://daostack.io/)
- [DAO nie są przedsiębiorstwami, w których decentralizacja w organizacjach autonomicznych ma znaczenie dla Vitalik.](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO, DAC, DA i więcej: Niekompletny przewodnik po terminologii](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) – [Ethereum Blog](https://blog.ethereum.org)

### Materiały wideo {#videos}

- [Czym jest DAO w kryptowalutach?](https://youtu.be/KHm0uUPqmVE)
- [Czy DAO może zbudować miasto?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)
