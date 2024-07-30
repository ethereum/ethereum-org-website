---
title: Staking łączony
description: Przegląd tego, jak rozpocząć korzystanie ze stakowania ETH w puli
lang: pl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Nosorożec Leslie pływający w basenie.
sidebarDepth: 2
summaryPoints:
  - Stakuj i zdobywaj nagrody z dowolną ilością ETH, łącząc siły z innymi
  - Pomiń trudną część i powierz operacje walidatora osobie trzeciej
  - Przechowuj tokeny stakingu we własnym portfelu
---

## Czym jest stakowanie w puli? {#what-are-staking-pools}

Stakowanie w puli to podejście oparte na współpracy, które pozwala wielu osobom posiadającym mniejsze ilości ETH uzyskać 32 ETH wymagane do aktywacji zestawu kluczy walidatora. Funkcja poolingu (w puli) nie jest natywnie obsługiwana w ramach protokołu, więc rozwiązania zostały stworzone osobno, aby zaspokoić tę potrzebę.

Niektóre pule działają w oparciu o inteligentne kontrakty, w których środki można zdeponować do kontraktu, który bez zaufania zarządza i śledzi udziały użytkownika oraz wydaje token reprezentujący tę wartość. Inne pule mogą nie obejmować inteligentnych kontraktów i zamiast tego są pośredniczone poza łańcuchem.

## Dlaczego stakować w puli? {#why-stake-with-a-pool}

Oprócz korzyści, które opisaliśmy w naszym [wprowadzeniu do stakingu](/staking/), stakowanie w puli wiąże się z szeregiem wyraźnych korzyści.

<CardGrid>
  <Card title="Niska bariera wejścia" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Stakuj już dzisiaj" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Tokeny stakingu" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## Co wziąć pod uwagę {#what-to-consider}

Stakowanie w puli lub delegowane nie jest natywnie obsługiwane przez protokół Ethereum, ale biorąc pod uwagę zapotrzebowanie użytkowników na stakowanie mniej niż 32 ETH, powstała rosnąca liczba rozwiązań, które zaspokajają to zapotrzebowanie.

Każda pula i narzędzia lub inteligentne kontrakty, z których korzystają, zostały opracowane przez różne zespoły, a każdy z nich wiąże się z korzyściami i ryzykiem. Pule umożliwiają użytkownikom wymianę ETH na token reprezentujący zestakowane ETH. Token ten jest przydatny, ponieważ pozwala użytkownikom na zamianę dowolnej ilości ETH na równoważną ilość tokena przynoszącego zyski, który generuje zwrot z nagród za stakowanie zastosowanych do bazowego stakowanego ETH (i odwrotnie) na zdecentralizowanych giełdach, mimo że rzeczywiste ETH pozostaje stakowane w warstwie konsensusu. Oznacza to, że zamiany tam i z powrotem z przynoszącego zyski zestakowanego ETH i „surowego ETH” są szybkie, łatwe i dostępne nie tylko w wielokrotnościach 32 ETH.

Jednak te zestakowane tokeny ETH mają tendencję do tworzenia zachowań kartelowych, w których duża ilość stakowanego ETH trafia pod kontrolę kilku scentralizowanych organizacji, zamiast rozprzestrzeniać się na wiele niezależnych osób. Stwarza to warunki do cenzury lub ekstrakcji wartości. Złotym standardem dla stakingu powinny być zawsze osoby uruchamiające walidatory na własnym sprzęcie, jeśli tylko jest to możliwe.

[Więcej o ryzyku związanym ze stakowaniem tokenów](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Wskaźniki atrybutów są używane poniżej, aby zasygnalizować godne uwagi mocne lub słabe strony, jakie może mieć wymieniona usługa stakowania w puli. Użyj tej sekcji jako odniesienia do sposobu definiowania tych atrybutów podczas wybierania puli, do której chcesz dołączyć.

<StakingConsiderations page="pools" />

## Odkryj usługi stakowania w puli {#explore-staking-pools}

Dostępnych jest wiele opcji ułatwiających konfigurację. Skorzystaj z powyższych wskaźników, które oprowadzą cię z poniższymi narzędziami.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Należy pamiętać, że ważne jest, aby wybrać usługę, która poważnie traktuje [różnorodność klientów](/developers/docs/nodes-and-clients/client-diversity/), ponieważ zwiększa to bezpieczeństwo sieci i ogranicza ryzyko. Usługi, które mają dowody na ograniczanie korzystania z większości klientów, są oznaczone jako <em style={{ textTransform: "uppercase" }}>„różnorodność klientów wykonawczych”</em> i <em style={{ textTransform: "uppercase" }}>„różnorodność klientów konsensusu”.</em>

Masz sugestię dotyczącą narzędzia do stakingu, które pominęliśmy? Zapoznaj się z naszymi [zasadami umieszczania produktów na liście](/contributing/adding-staking-products/), aby sprawdzić, czy są one odpowiednie i przesłać je do recenzji.

## Często zadawane pytania {#faq}

<ExpandableCard title="Jak mogę zdobyć nagrody?">
Zazwyczaj tokeny stakingu ERC-20 są wydawane stakerom i reprezentują wartość zestakowanego przez nich ETH plus nagrody. Należy pamiętać, że różne pule będą dystrybuować nagrody ze stakowania do swoich użytkowników za pomocą nieco innych metod, ale jest to częste.
</ExpandableCard>

<ExpandableCard title="Kiedy mogę wypłacić swoją stawkę?">
Już teraz! Aktualizacja sieci Shanghai/Capella miała miejsce w kwietniu 2023 r. i wprowadziła wypłaty ze stakingu. Konta walidatorów, które wspierają stakowanie w puli mają teraz możliwość wyjścia i wypłaty ETH na wyznaczony adres wypłaty. Daje to możliwość zdobycia swojej części swojej stawki za bazowe ETH. Sprawdź u swojego dostawcy, aby sprawdzić, w jaki sposób obsługuje tę funkcję.

Alternatywnie, pule wykorzystujące token stakingowy ERC-20 pozwalają użytkownikom handlować tym tokenem na otwartym rynku, umożliwiając sprzedaż pozycji stakingowej, skutecznie „wypłacając” bez faktycznego usuwania ETH z kontraktu stakingowego.

<ButtonLink href="/staking/withdrawals/">Więcej o wypłatach ze stakingu</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Czy różni się to od stakowania z moją giełdą?">
Jest wiele podobieństw między tymi opcjami stakowania w puli a scentralizowanymi giełdami, takimi jak możliwość stakowania niewielkich ilości ETH i łączenia ich w celu aktywacji walidatorów.

W przeciwieństwie do scentralizowanych giełd wiele innych opcji stakowania w puli wykorzystuje inteligentne kontrakty i/lub tokeny stakingu, które zazwyczaj są tokenami ERC-20, które można przechowywać we własnym portfelu i kupować lub sprzedawać tak jak każdy inny token. Zapewnia to warstwę niezależności i bezpieczeństwa, dając ci kontrolę nad tokenami, ale nadal nie daje ci bezpośredniej kontroli nad klientem walidatora poświadczającym w twoim imieniu w tle.

Niektóre opcje puli są bardziej zdecentralizowane niż inne, jeśli chodzi o węzły, które je obsługują. Aby promować zdrowie i decentralizację sieci, stakerzy są zawsze zachęcani do wyboru usługi w puli, która umożliwia zdecentralizowany zestaw operatorów węzłów bez zezwoleń.
</ExpandableCard>

## Dodatkowo przeczytaj {#further-reading}

- [Katalog stakingu Ethereum](https://www.staking.directory/) — _Eridian i Spacesider_
- [Staking z Rocket Pool - Przegląd stakingu](https://docs.rocketpool.net/guides/staking/overview.html) — _Dokumenty RocketPool_
- [Staking Ethereum z Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) — _dokumenty pomocy Lido_
