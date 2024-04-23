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

<iframe src="https://embed.ted.com/talks/lang/en/scott_fitsimones_could_a_dao_build_the_next_great_city" ></p>

<h2 id="how-daos-work" spaces-before="0">
  Jak działa DAO?
</h2>

<p spaces-before="0">
  The backbone of a DAO is its <a href="/glossary/#smart-contract">smart contract</a>, which defines the rules of the organization and holds the group's treasury. Gdy kontrakt zostanie wdrożony na Ethereum, nikt nie może zmienić zasad bez wcześniejszego głosowania. Jeśli ktoś spróbuje zrobić coś niezgodnego z zasadami i logiką kodu, to się nie uda. Dlatego, że skarbiec jest zdefiniowany przez inteligentny kontrakt, nikt nie może też wydać pieniędzy bez zgody grupy. Oznacza to, że DAO nie potrzebują organu centralnego. Zamiast tego to grupa podejmuje wspólne decyzje, a wydatki są automatycznie autoryzowane w momencie przejścia głosowania.
</p>

<p spaces-before="0">
  Jest to możliwe, ponieważ inteligentne kontrakty są zabezpieczone przed ingerencją osób niepowołanych po ich wdrożeniu na Ethereum. Nie możesz po prostu edytować kodu (zasad DAO) niepostrzeżenie, ponieważ wszystko jest publiczne.
</p>

<h2 id="ethereum-and-daos" spaces-before="0">
  Ethereum i DAO
</h2>

<p spaces-before="0">
  Ethereum jest idealną podstawą dla DAO z wielu powodów:
</p>

<ul>
  <li>
    Ethereum’s own consensus is decentralized and established enough for organizations to trust the network.
  </li>
  <li>
    Inteligentny kod kontraktu nie może być modyfikowany, kiedy już został wdrożony, nawet przez jego właścicieli. Pozwala to DAO na stosowanie zasad, z którymi został zaprogramowany.
  </li>
  <li>
    Inteligentne kontrakty mogą wysyłać/odbierać środki. Bez tego byłby ci potrzebny zaufany pośrednik do zarządzania funduszami grupy (DAO).
  </li>
  <li>
    Społeczność Ethereum okazała się bardziej oparta na współpracy niż na konkurencyjności, co pozwoliło na szybkie pojawienie się najlepszych praktyk i systemów wsparcia.
  </li>
</ul>

<h2 id="dao-governance" spaces-before="0">
  Zarządzanie DAO
</h2>

<p spaces-before="0">
  Istnieje wiele czynników związanych z zarządzaniem DAO, takich jak sposób głosowania i składania wniosków.
</p>

<h3 id="governance-delegation" spaces-before="0">
  Oddelegowywanie
</h3>

<p spaces-before="0">
  Oddelegowywanie w DAO jest wersją demokracji przedstawicielskiej. Posiadacze tokenów delegują głosy użytkownikom, którzy się nominują i zobowiązują do kierowania protokołem i pozostawania na bieżąco z informacjami.
</p>

<h4 id="governance-example" spaces-before="0">
  Znany przykład
</h4>

<p spaces-before="0">
  <a href="https://claim.ens.domains/delegate-ranking">ENS</a> – ENS holders can delegate their votes to engaged community members to represent them.
</p>

<h3 id="governance-example" spaces-before="0">
  Automatyczne zarządzanie transakcjami
</h3>

<p spaces-before="0">
  W wielu DAO transakcje będą automatycznie wykonywane, jeśli kworum członków zagłosuje za potwierdzeniem.
</p>

<h4 id="governance-example" spaces-before="0">
  Znany przykład
</h4>

<p spaces-before="0">
  <a href="https://nouns.wtf">Nouns</a> – In Nouns DAO, a transaction is automatically executed if a quorum of votes is met and a majority votes affirmative, as long as it is not vetoed by the founders.
</p>

<h3 id="governance-example" spaces-before="0">
  Wielostronne zarządzanie
</h3>

<p spaces-before="0">
  While DAOs may have thousands of voting members, funds can live in a <a href="/glossary/#wallet">wallet</a> shared by 5-20 active community members who are trusted and usually doxxed (public identities known to the community). After a vote, the <a href="/glossary/#multisig">multisig</a> signers execute the will of the community.
</p>

<h2 id="dao-laws" spaces-before="0">
  Prawa DAO
</h2>

<p spaces-before="0">
  W 1977 r. w Wyoming powstały pierwsze spółki z ograniczoną odpowiedzialnością (LLC), które chronią przedsiębiorców i ograniczają ich odpowiedzialność. Ostatnio wprowadziły one ustawę DAO, która ustanawia status prawny DAO. Obecnie w Wyoming, Vermont i na Wyspach Dziewiczych obowiązuje w pewnej formie prawo DAO.
</p>

<h3 id="law-example" spaces-before="0">
  Znany przykład
</h3>

<p spaces-before="0">
  <a href="https://citydao.io">CityDAO</a> – CityDAO użył prawa DAO Wyoming, aby kupić 40 hektarów ziemi w pobliżu Parku Narodowego Yellowstone.
</p>

<h2 id="dao-membership" spaces-before="0">
  Członkostwo DAO
</h2>

<p spaces-before="0">
  Istnieją różne modele członkostwa w DAO. Członkostwo może decydować o tym, w jaki sposób działa głosowanie i inne kluczowe części DAO.
</p>

<h3 id="token-based-membership" spaces-before="0">
  Członkostwo oparte na tokenach
</h3>

<p spaces-before="0">
  Usually fully <a href="/glossary/#permissionless">permissionless</a>, depending on the token used. Mostly these governance tokens can be traded permissionlessly on a <a href="/glossary/#dex">decentralized exchange</a>. Inne muszą być zdobywane poprzez zapewnienie płynności lub innego proof of work. Tak czy inaczej, posiadanie tokena zapewnia dostęp do głosowania.
</p>

<p spaces-before="0">
  <em x-id="4">Zwykle używane do zarządzania szerokimi zdecentralizowanymi protokołami i/lub tokenami.</em>
</p>

<h4 id="token-example" spaces-before="0">
  Znany przykład
</h4>

<p spaces-before="0">
  <a href="https://makerdao.com">MakerDAO</a> – token MakerDAO-a jest powszechnie dostępny na zdecentralizowanych giełdach i każdy może kupić siłę głosu w przyszłości protokołu Makera.
</p>

<h3 id="share-based-membership" spaces-before="0">
  Członkostwo oparte na akcjach
</h3>

<p spaces-before="0">
  DAO oparte na akcjach są bardziej dozwolone, ale nadal dość otwarte. Każdy przyszły członek może złożyć wniosek o przystąpienie do DAO, oferując zwykle hołd pewnej wartości w postaci tokenów lub pracy. Akcje reprezentują bezpośrednie prawo głosu i własność. Członkowie mogą w każdej chwili zrezygnować, zabierając ze sobą swój proporcjonalny udział w majątku.
</p>

<p spaces-before="0">
  <em x-id="4">Zwykle używane w przypadku bardziej zbliżonych organizacji, takich jak organizacje charytatywne, spółdzielnie pracy i kluby inwestycyjne. Może również zarządzać protokołami i tokenami.</em>
</p>

<h4 id="share-example" spaces-before="0">
  Znany przykład
</h4>

<p spaces-before="0">
  <a href="http://molochdao.com/">MolochDAO</a> – MolochDAO is focused on funding Ethereum projects. Wymagają one wniosku o członkostwo, tak aby grupa mogła ocenić, czy ma Pan/Pani kapitał i wiedzę specjalistyczną niezbędną do dokonania świadomych ocen dotyczących potencjalnych grantów. Nie można kupić dostępu do DAO na otwartym rynku.
</p>

<h3 id="reputation-based-membership" spaces-before="0">
  Członkostwo oparte na reputacji
</h3>

<p spaces-before="0">
  Reputacja stanowi dowód udziału i przyznania uprawnień głosu w DAO. W przeciwieństwie do tokena lub członkostwa opartego na współdzieleniu, DAO oparte na reputacji nie przenoszą własności na współtwórców. Reputacja nie może być kupowana, przekazywana lub delegowana; członkowie DAO muszą zdobywać reputację poprzez uczestnictwo. Głosowanie w łańcuchu jest bezpodstawne, a przyszli członkowie mogą swobodnie zgłaszać propozycje przystąpienia do DAO i prosić o uzyskanie reputacji i żetonów jako nagrody w zamian za ich wkład.
</p>

<p spaces-before="0">
  <em x-id="4">Typically used for decentralized development and governance of protocols and <a href="/glossary/#dapp">dapps</a>, but also well suited to a diverse set of organizations like charities, worker collectives, investment clubs, etc.</em>
</p>

<h4 id="reputation-example" spaces-before="0">
  Znany przykład
</h4>

<p spaces-before="0">
  <a href="https://DXdao.eth.link">DXdao</a> – DXdao jest niezależną globalną zbiorowością społeczną, od 2019 r. tworzącą zdecentralizowane protokoły i aplikacje i zarządzającą nimi. It leverages reputation-based governance and <a href="/glossary/#holographic-consensus">holographic consensus</a> to coordinate and manage funds, meaning no one can buy their way into influencing its future.
</p>

<h2 id="join-start-a-dao" spaces-before="0">
  Dołącz / rozpocznij DAO
</h2>

<h3 id="join-a-dao" spaces-before="0">
  Dołącz do DAO
</h3>

<ul>
  <li>
    <a href="/community/get-involved/#decentralized-autonomous-organizations-daos">Ethereum Społeczność DAOs</a>
  </li>
  <li>
    <a href="https://app.daohaus.club/explore">Lista DAOHaus z DAOs</a>
  </li>
  <li>
    <a href="https://www.tally.xyz">Tally.xyz lista DAOs</a>
  </li>
</ul>

<h3 id="start-a-dao" spaces-before="0">
  Rozpocznij DAO
</h3>

<ul>
  <li>
    <a href="https://app.daohaus.club/summon">Przywołaj DAO z DAOHaus</a>
  </li>
  <li>
    <a href="https://www.tally.xyz/add-a-dao">Uruchom gubernatora DAO z Tally</a>
  </li>
  <li>
    <a href="https://aragon.org/product">Utwórz DAO napędzane Aragonem</a>
  </li>
  <li>
    <a href="https://colony.io/">Rozpocznij kolonię</a>
  </li>
  <li>
    <a href="https://alchemy.daostack.io/daos/create">Utwórz DAO z holograficznym konsensusem DAO-stack</a>
  </li>
</ul>

<h2 id="further-reading" spaces-before="0">
  Przeczytaj także
</h2>

<h3 id="dao-articles" spaces-before="0">
  Artykuły DAO
</h3>

<ul>
  <li>
    <a href="https://aragon.org/dao">Co to jest DAO?</a> - <a href="https://aragon.org/">Aragon</a>
  </li>
  <li>
    <a href="https://wiki.metagame.wtf/docs/great-houses/house-of-daos">House of DAOs</a> – <a href="https://wiki.metagame.wtf/">Metagame</a>
  </li>
  <li>
    <a href="https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for">Co to jest DAO i co to jest?</a> – <a href="https://daohaus.club/">DAOhaus</a>
  </li>
  <li>
    <a href="https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a">Jak założyć społeczność cyfrową w oparciu o DAO?</a> – <a href="https://daohaus.club/">DAOhaus</a>
  </li>
  <li>
    <a href="https://coinmarketcap.com/alexandria/article/what-is-a-dao">Co to jest DAO?</a> – <a href="https://coinmarketcap.com">Coinmarketcap</a>
  </li>
  <li>
    <a href="https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c">Co to jest konsensus holograficzny?</a> - <a href="https://daostack.io/">DAOstack</a>
  </li>
  <li>
    <a href="https://vitalik.eth.limo/general/2022/09/20/daos.html">DAO nie są przedsiębiorstwami, w których decentralizacja w organizacjach autonomicznych ma znaczenie dla Vitalik.</a>
  </li>
  <li>
    <a href="https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide">DAO, DAC, DA i więcej: Niekompletny przewodnik po terminologii</a> - <a href="https://blog.ethereum.org">Ethereum Blog</a>
  </li>
</ul>

<h3 id="videos" spaces-before="0">
  Materiały wideo
</h3>

<ul>
  <li>
    <a href="https://youtu.be/KHm0uUPqmVE">Czym jest DAO w kryptowalutach?</a>
  </li>
  <li>
    <a href="https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city">Czy DAO może zbudować miasto?</a> – <a href="https://www.ted.com/">TED</a>
  </li>
</ul>
