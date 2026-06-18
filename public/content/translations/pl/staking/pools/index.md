---
title: Staking grupowy
description: "Dowiedz się więcej o pulach stakingowych"
lang: pl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: "Nosorożec Leslie pływający w basenie."
sidebarDepth: 2
summaryPoints:
  - Stakuj i zdobywaj nagrody z dowolną ilością ETH, łącząc siły z innymi
  - Pomiń trudną część i powierz obsługę walidatora stronie trzeciej
  - Przechowuj tokeny stakingowe we własnym portfelu
---

## Czym są pule stakingowe? {#what-are-staking-pools}

Pule stakingowe to oparte na współpracy podejście, które pozwala wielu osobom z mniejszymi ilościami ETH na zebranie 32 ETH wymaganych do aktywacji zestawu kluczy walidatora. Funkcjonalność grupowania nie jest natywnie obsługiwana w protokole, dlatego rozwiązania te zostały zbudowane oddzielnie, aby zaspokoić tę potrzebę.

Niektóre pule działają przy użyciu inteligentnych kontraktów, w których środki mogą zostać zdeponowane w kontrakcie, który w sposób niewymagający zaufania zarządza i śledzi Twoją stawkę oraz wydaje Ci token reprezentujący tę wartość. Inne pule mogą nie wykorzystywać inteligentnych kontraktów i zamiast tego są pośredniczone w sposób pozałańcuchowy.

## Dlaczego warto stakować w puli? {#why-stake-with-a-pool}

Oprócz korzyści, które opisaliśmy w naszym [wprowadzeniu do stakingu](/staking/), staking w puli wiąże się z wieloma wyraźnymi korzyściami.

<Grid>
  <Card title="Niska bariera wejścia" emoji="🐟" description="Nie jesteś wielorybem? Żaden problem. Większość pul stakingowych pozwala na stakowanie praktycznie dowolnej ilości ETH poprzez łączenie sił z innymi stakującymi, w przeciwieństwie do stakowania solo, które wymaga 32 ETH." />
  <Card title="Stakuj już dziś" emoji=":stopwatch:" description="Staking w puli jest tak prosty jak wymiana tokenów. Nie musisz martwić się o konfigurację sprzętu i utrzymanie węzła. Pule pozwalają na zdeponowanie ETH, co umożliwia operatorom węzłów uruchamianie walidatorów. Nagrody są następnie rozdzielane między współtwórców po odliczeniu opłaty za operacje węzła." />
  <Card title="Tokeny stakingowe" emoji=":droplet:" description="Wiele pul stakingowych zapewnia token, który reprezentuje roszczenie do Twojego stakowanego ETH i generowanych przez nie nagród. Pozwala to na wykorzystanie stakowanego ETH, np. jako zabezpieczenia w aplikacjach DeFi." />
</Grid>

<StakingComparison page="pools" />

## Co należy wziąć pod uwagę {#what-to-consider}

Staking grupowy lub delegowany nie jest natywnie obsługiwany przez protokół [Ethereum](/), ale biorąc pod uwagę zapotrzebowanie użytkowników na stakowanie mniej niż 32 ETH, zbudowano rosnącą liczbę rozwiązań, aby zaspokoić ten popyt.

Każda pula oraz narzędzia lub inteligentne kontrakty, z których korzystają, zostały zbudowane przez różne zespoły, a każda z nich wiąże się z korzyściami i ryzykiem. Pule umożliwiają użytkownikom wymianę ich ETH na token reprezentujący stakowane ETH. Token ten jest użyteczny, ponieważ pozwala użytkownikom na wymianę dowolnej ilości ETH na równoważną ilość tokena przynoszącego dochód, który generuje zwrot z nagród za staking zastosowanych do bazowego stakowanego ETH (i odwrotnie) na zdecentralizowanych giełdach, mimo że rzeczywiste ETH pozostaje stakowane w warstwie konsensusu. Oznacza to, że wymiana w obie strony między produktem stakowanego ETH przynoszącym dochód a „surowym ETH” jest szybka, łatwa i dostępna nie tylko w wielokrotnościach 32 ETH.

Jednakże te tokeny stakowanego ETH mają tendencję do tworzenia zachowań przypominających kartele, w których duża ilość stakowanego ETH ostatecznie znajduje się pod kontrolą kilku scentralizowanych organizacji, zamiast być rozproszona wśród wielu niezależnych osób. Stwarza to warunki do cenzury lub ekstrakcji wartości. Złotym standardem dla stakingu zawsze powinny być osoby uruchamiające walidatory na własnym sprzęcie, gdy tylko jest to możliwe.

[Więcej o ryzyku związanym z tokenami stakingowymi](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Poniżej użyto wskaźników atrybutów, aby zasygnalizować godne uwagi mocne lub słabe strony, jakie może mieć wymieniona pula stakingowa. Użyj tej sekcji jako odniesienia do tego, jak definiujemy te atrybuty podczas wyboru puli, do której chcesz dołączyć.

<StakingConsiderations page="pools" />

## Przeglądaj pule stakingowe {#explore-staking-pools}

Dostępnych jest wiele opcji, które pomogą Ci w konfiguracji. Użyj powyższych wskaźników, aby ułatwić sobie nawigację po poniższych narzędziach.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Należy pamiętać o znaczeniu wyboru usługi, która poważnie traktuje [różnorodność klientów](/developers/docs/nodes-and-clients/client-diversity/), ponieważ poprawia to bezpieczeństwo sieci i ogranicza Twoje ryzyko. Usługi, które posiadają dowody na ograniczanie korzystania z klientów stanowiących większość, są oznaczone jako <em style={{ textTransform: "uppercase" }}>„różnorodność klientów warstwy wykonawczej”</em> oraz <em style={{ textTransform: "uppercase" }}>„różnorodność klientów konsensusu”.</em>

Masz propozycję narzędzia do stakingu, które pominęliśmy? Zapoznaj się z naszą [polityką dodawania produktów](/contributing/adding-staking-products/), aby sprawdzić, czy będzie ono odpowiednie, i prześlij je do weryfikacji.

## Często zadawane pytania {#faq}

<ExpandableCard title="Jak mogę zdobywać nagrody?">
Zazwyczaj tokeny stakingowe ERC-20 są wydawane stakującym i reprezentują wartość ich stakowanego ETH powiększoną o nagrody. Pamiętaj, że różne pule będą dystrybuować nagrody za staking swoim użytkownikom za pomocą nieco innych metod, ale jest to wspólny motyw.
</ExpandableCard>

<ExpandableCard title="Kiedy mogę wypłacić swoją stawkę?">
Już teraz! Aktualizacja sieci Szanghaj/Capella miała miejsce w kwietniu 2023 roku i wprowadziła wypłaty ze stakingu. Konta walidatorów, które wspierają pule stakingowe, mają teraz możliwość wyjścia i wypłaty ETH na wyznaczony adres wypłaty. Umożliwia to wymianę Twojej części stawki na bazowe ETH. Skontaktuj się ze swoim dostawcą, aby dowiedzieć się, w jaki sposób obsługuje on tę funkcjonalność.

Alternatywnie, pule wykorzystujące token stakingowy ERC-20 pozwalają użytkownikom na handel tym tokenem na otwartym rynku, co umożliwia sprzedaż pozycji stakingowej, skutecznie „wypłacając” środki bez faktycznego usuwania ETH z kontraktu stakingowego.

<ButtonLink href="/staking/withdrawals/">Więcej o wypłatach ze stakingu</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Czy to różni się od stakingu na mojej giełdzie?">
Istnieje wiele podobieństw między tymi opcjami stakingu grupowego a scentralizowanymi giełdami, takimi jak możliwość stakowania małych ilości ETH i łączenia ich w celu aktywacji walidatorów.

W przeciwieństwie do scentralizowanych giełd, wiele innych opcji stakingu grupowego wykorzystuje inteligentne kontrakty i/lub tokeny stakingowe, które zazwyczaj są tokenami ERC-20, które można przechowywać we własnym portfelu oraz kupować lub sprzedawać jak każdy inny token. Oferuje to warstwę suwerenności i bezpieczeństwa, dając Ci kontrolę nad Twoimi tokenami, ale nadal nie daje Ci bezpośredniej kontroli nad klientem walidatora poświadczającym w Twoim imieniu w tle.

Niektóre opcje grupowania są bardziej zdecentralizowane niż inne, jeśli chodzi o węzły, które je wspierają. Aby promować zdrowie i decentralizację sieci, stakujący są zawsze zachęcani do wyboru usługi grupowania, która umożliwia niewymagający pozwoleń, zdecentralizowany zestaw operatorów węzłów.
</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Katalog stakingu Ethereum](https://www.staking.directory/) – _Eridian i Spacesider_
- [Staking z Rocket Pool – Przegląd stakingu](https://docs.rocketpool.net/guides/staking/overview.html) – _Dokumentacja Rocket Pool_
- [Staking Ethereum z Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) – _Dokumentacja pomocy Lido_