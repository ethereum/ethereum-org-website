---
title: Czym jest DAO?
metaTitle: Czym jest DAO? | Zdecentralizowana Organizacja Autonomiczna
description: "Przegląd DAO na Ethereum"
lang: pl
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: "Reprezentacja DAO głosującego nad propozycją."
summaryPoints:
  - "Społeczności należące do członków, bez scentralizowanego przywództwa."
  - "Bezpieczny sposób na współpracę z nieznajomymi z internetu."
  - "Bezpieczne miejsce do przekazywania funduszy na określony cel."
---

## Czym są DAO? {#what-are-daos}

DAO to organizacja będąca wspólną własnością, pracująca nad wspólną misją.

DAO pozwalają nam współpracować z podobnie myślącymi ludźmi z całego świata bez konieczności ufania życzliwemu liderowi w kwestii zarządzania funduszami lub operacjami. Nie ma dyrektora generalnego (CEO), który może wydawać fundusze dla kaprysu, ani dyrektora finansowego (CFO), który może manipulować księgami. Zamiast tego oparte na blockchainie zasady wbudowane w kod określają, jak działa organizacja i jak wydawane są fundusze.

Mają wbudowane skarbce, do których nikt nie ma dostępu bez zgody grupy. Decyzje są podejmowane poprzez propozycje i głosowania, aby zapewnić, że każdy w organizacji ma głos, a wszystko odbywa się w sposób przejrzysty [onchain](/glossary/#onchain).

## Dlaczego potrzebujemy DAO? {#why-dao}

Założenie z kimś organizacji, która wiąże się z finansowaniem i pieniędzmi, wymaga dużego zaufania do ludzi, z którymi współpracujesz. Trudno jednak zaufać komuś, z kim miało się kontakt tylko w internecie. Dzięki DAO nie musisz ufać nikomu innemu w grupie, a jedynie kodowi DAO, który jest w 100% przejrzysty i możliwy do zweryfikowania przez każdego.

Otwiera to wiele nowych możliwości globalnej współpracy i koordynacji.

### Porównanie {#dao-comparison}

| DAO                                                                                                                     | Tradycyjna organizacja                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Zazwyczaj płaska i w pełni zdemokratyzowana.                                                                                   | Zazwyczaj hierarchiczna.                                                                            |
| Wdrożenie jakichkolwiek zmian wymaga głosowania członków.                                                           | W zależności od struktury, zmiany mogą być narzucone przez jedną stronę lub może zostać zaproponowane głosowanie.     |
| Głosy są zliczane, a wynik wdrażany automatycznie bez zaufanego pośrednika.                                      | Jeśli głosowanie jest dozwolone, głosy są zliczane wewnętrznie, a wynik głosowania musi zostać wdrożony ręcznie. |
| Oferowane usługi są obsługiwane automatycznie w sposób zdecentralizowany (na przykład dystrybucja funduszy filantropijnych). | Wymaga obsługi przez człowieka lub centralnie sterowanej automatyzacji, podatnej na manipulacje.              |
| Cała aktywność jest przejrzysta i w pełni publiczna.                                                                           | Aktywność jest zazwyczaj prywatna i ma ograniczony dostęp dla opinii publicznej.                                        |

### Przykłady DAO {#dao-examples}

Aby ułatwić zrozumienie tego tematu, oto kilka przykładów wykorzystania DAO:

- **Organizacja charytatywna** – możesz przyjmować darowizny od każdego na świecie i głosować nad tym, jakie cele sfinansować.
- **Wspólna własność** – możesz kupować fizyczne lub cyfrowe aktywa, a członkowie mogą głosować nad sposobem ich wykorzystania.
- **Przedsięwzięcia i granty** – możesz stworzyć fundusz podwyższonego ryzyka (venture fund), który gromadzi kapitał inwestycyjny i głosuje nad przedsięwzięciami, które warto wesprzeć. Zwrócone pieniądze mogą być później redystrybuowane wśród członków DAO.

<VideoWatch slug="dao-build-next-great-city" />

## Jak działają DAO? {#how-daos-work}

Szkieletem DAO jest jego [inteligentny kontrakt](/glossary/#smart-contract), który określa zasady działania organizacji i przechowuje skarbiec grupy. Gdy kontrakt zostanie uruchomiony w sieci [Ethereum](/), nikt nie może zmienić zasad inaczej niż poprzez głosowanie. Jeśli ktoś spróbuje zrobić coś, co nie jest objęte zasadami i logiką w kodzie, operacja się nie powiedzie. A ponieważ skarbiec jest również zdefiniowany przez inteligentny kontrakt, oznacza to, że nikt nie może wydać pieniędzy bez zgody grupy. Oznacza to, że DAO nie potrzebują centralnego organu zarządzającego. Zamiast tego grupa podejmuje decyzje wspólnie, a płatności są automatycznie autoryzowane po pomyślnym zakończeniu głosowania.

Jest to możliwe, ponieważ inteligentne kontrakty są odporne na manipulacje po ich uruchomieniu na Ethereum. Nie można po prostu edytować kodu (zasad DAO) bez zauważenia tego przez innych, ponieważ wszystko jest publiczne.

## Ethereum i DAO {#ethereum-and-daos}

Ethereum jest idealnym fundamentem dla DAO z kilku powodów:

- Własny konsensus Ethereum jest zdecentralizowany i na tyle ugruntowany, że organizacje mogą zaufać sieci.
- Kod inteligentnego kontraktu nie może zostać zmodyfikowany po uruchomieniu, nawet przez jego właścicieli. Pozwala to DAO działać zgodnie z zasadami, z którymi zostało zaprogramowane.
- Inteligentne kontrakty mogą wysyłać/odbierać fundusze. Bez tego potrzebny byłby zaufany pośrednik do zarządzania funduszami grupy.
- Społeczność Ethereum udowodniła, że jest bardziej nastawiona na współpracę niż na rywalizację, co pozwala na szybkie powstawanie najlepszych praktyk i systemów wsparcia.

## Zarządzanie DAO {#dao-governance}

Istnieje wiele kwestii, które należy wziąć pod uwagę podczas zarządzania DAO, takich jak sposób działania głosowania i propozycji.

### Delegowanie {#governance-delegation}

Delegowanie jest jak wersja demokracji przedstawicielskiej w DAO. Posiadacze tokenów delegują głosy na użytkowników, którzy sami się nominują i zobowiązują się do opieki nad protokołem oraz bycia na bieżąco.

#### Znany przykład {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – posiadacze ENS mogą delegować swoje głosy na zaangażowanych członków społeczności, aby ich reprezentowali.

### Automatyczne zarządzanie transakcjami {#governance-example-2}

W wielu DAO transakcje zostaną wykonane automatycznie, jeśli kworum członków zagłosuje za.

#### Znany przykład {#governance-example-3}

[Nouns](https://nouns.wtf) – w Nouns DAO transakcja jest automatycznie wykonywana, jeśli osiągnięto kworum głosów, a większość głosuje za, o ile nie zostanie zawetowana przez założycieli.

### Zarządzanie multisig {#governance-example-4}

Chociaż DAO mogą mieć tysiące głosujących członków, fundusze mogą znajdować się w [portfelu](/glossary/#wallet) współdzielonym przez 5-20 aktywnych członków społeczności, którzy są zaufani i zazwyczaj doxxed (ich publiczne tożsamości są znane społeczności). Po głosowaniu sygnatariusze [multisig](/glossary/#multisig) wykonują wolę społeczności.

## Przepisy prawne dotyczące DAO {#dao-laws}

W 1977 roku stan Wyoming wynalazł spółkę z ograniczoną odpowiedzialnością (LLC), która chroni przedsiębiorców i ogranicza ich odpowiedzialność. Niedawno stali się pionierami prawa dotyczącego DAO, które ustanawia status prawny dla DAO. Obecnie Wyoming, Vermont i Wyspy Dziewicze posiadają przepisy dotyczące DAO w jakiejś formie.

### Znany przykład {#law-example}

[CityDAO](https://citizen.citydao.io/) – CityDAO wykorzystało prawo DAO stanu Wyoming do zakupu 40 akrów ziemi w pobliżu Parku Narodowego Yellowstone.

## Członkostwo w DAO {#dao-membership}

Istnieją różne modele członkostwa w DAO. Członkostwo może określać, jak działa głosowanie i inne kluczowe elementy DAO.

### Członkostwo oparte na tokenach {#token-based-membership}

Zazwyczaj w pełni [niewymagające pozwoleń](/glossary/#permissionless), w zależności od użytego tokena. Większością tych tokenów zarządzania można handlować bez pozwoleń na [zdecentralizowanej giełdzie](/glossary/#dex). Inne trzeba zdobyć poprzez zapewnienie płynności lub inny „dowód pracy (PoW)”. Tak czy inaczej, samo posiadanie tokena daje dostęp do głosowania.

_Zazwyczaj używane do zarządzania szerokimi zdecentralizowanymi protokołami i/lub samymi tokenami._

#### Znany przykład {#token-example}

[MakerDAO](https://makerdao.com) – token MKR należący do MakerDAO jest powszechnie dostępny na zdecentralizowanych giełdach i każdy może go kupić, aby zyskać prawo głosu w sprawie przyszłości protokołu Maker.

### Członkostwo oparte na udziałach {#share-based-membership}

DAO oparte na udziałach są bardziej wymagające zezwolenia, ale wciąż dość otwarte. Każdy potencjalny członek może złożyć propozycję dołączenia do DAO, zazwyczaj oferując wkład o określonej wartości w postaci tokenów lub pracy. Udziały reprezentują bezpośrednią siłę głosu i własność. Członkowie mogą w każdej chwili wyjść z proporcjonalną częścią skarbca.

_Zazwyczaj używane w przypadku bardziej zżytych, skoncentrowanych na ludziach organizacji, takich jak organizacje charytatywne, kolektywy pracownicze i kluby inwestycyjne. Mogą również zarządzać protokołami i tokenami._

### Członkostwo oparte na reputacji {#reputation-based-membership}

Reputacja stanowi dowód uczestnictwa i przyznaje prawo głosu w DAO. W przeciwieństwie do członkostwa opartego na tokenach lub udziałach, DAO oparte na reputacji nie przenoszą własności na współtwórców. Reputacji nie można kupić, przetransferować ani delegować; członkowie DAO muszą zdobyć reputację poprzez uczestnictwo. Głosowanie onchain jest niewymagające pozwoleń, a potencjalni członkowie mogą swobodnie składać propozycje dołączenia do DAO i prosić o otrzymanie reputacji oraz tokenów jako nagrody w zamian za swój wkład.

_Zazwyczaj używane do zdecentralizowanego rozwoju i zarządzania protokołami oraz [zdecentralizowanymi aplikacjami (dapp)](/glossary/#dapp), ale również dobrze sprawdzają się w różnorodnych organizacjach, takich jak organizacje charytatywne, kolektywy pracownicze, kluby inwestycyjne itp._

#### Znany przykład {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdao było globalnym, suwerennym kolektywem budującym i zarządzającym zdecentralizowanymi protokołami i aplikacjami od 2019 roku. Wykorzystywało zarządzanie oparte na reputacji i [konsensus holograficzny](/glossary/#holographic-consensus) do koordynowania i zarządzania funduszami, co oznaczało, że nikt nie mógł kupić sobie wpływu na jego przyszłość lub zarządzanie.

## Dołącz / załóż DAO {#join-start-a-dao}

### Dołącz do DAO {#join-a-dao}

- [DAO społeczności Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Lista DAO od DAOHaus](https://app.daohaus.club/explore)
- [Lista DAO od Tally.xyz](https://www.tally.xyz/explore)
- [Lista DAO od DeGov.AI](https://apps.degov.ai/)

### Załóż DAO {#start-a-dao}

- [Przywołaj DAO z DAOHaus](https://app.daohaus.club/summon)
- [Załóż Governor DAO z Tally](https://www.tally.xyz/get-started)
- [Stwórz DAO oparte na Aragon](https://aragon.org/product)
- [Załóż kolonię](https://colony.io/)
- [Stwórz DAO z konsensusem holograficznym DAOstack](https://alchemy.daostack.io/daos/create)
- [Uruchom DAO za pomocą DeGov Launcher](https://docs.degov.ai/integration/deploy)

## Dalsza lektura {#further-reading}

### Artykuły o DAO {#dao-articles}

- [Czym jest DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [Dom DAO](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Czym jest DAO i do czego służy?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Jak założyć cyfrową społeczność opartą na DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Czym jest DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Czym jest konsensus holograficzny?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [DAO to nie korporacje: gdzie decentralizacja w autonomicznych organizacjach ma znaczenie (autor: Vitalik)](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO, DAC, DA i inne: niekompletny przewodnik po terminologii](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Blog Ethereum](https://blog.ethereum.org)

### Filmy {#videos}

- [Czym jest DAO w krypto?](https://youtu.be/KHm0uUPqmVE)
- [Czy DAO może zbudować miasto?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />