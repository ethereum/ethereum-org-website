---
title: Nagrody i kary w mechanizmie proof-of-stake
description: "Dowiedz się o motywatorach wewnątrzprotokołowych w Ethereum opartym na mechanizmie proof-of-stake."
lang: pl
---

Ethereum jest zabezpieczone za pomocą swojej natywnej kryptowaluty, etheru (ETH). Operatorzy węzłów, którzy chcą uczestniczyć w walidacji bloków i identyfikacji głowy łańcucha, wpłacają ether do [kontraktu depozytowego](/staking/deposit-contract/) w Ethereum. Otrzymują oni następnie wynagrodzenie w etherze za uruchamianie oprogramowania walidatora, które sprawdza ważność nowych bloków otrzymywanych przez sieć peer-to-peer i stosuje algorytm wyboru forka w celu zidentyfikowania głowy łańcucha.

Walidator ma dwie podstawowe role: 1) sprawdzanie nowych bloków i „atestowanie” ich, jeśli są prawidłowe, 2) proponowanie nowych bloków po losowym wybraniu z całej puli walidatorów. Jeśli walidator nie wykona żadnego z tych zadań na żądanie, traci wypłatę w etherze. Walidatorzy są również czasami odpowiedzialni za agregację podpisów i uczestnictwo w komitetach synchronizacyjnych.

Istnieją również pewne działania, które bardzo trudno jest wykonać przypadkowo i które wskazują na złośliwe zamiary, takie jak proponowanie wielu bloków dla tego samego slotu lub atestowanie wielu bloków dla tego samego slotu. Są to zachowania podlegające „slashingowi”, które skutkują spaleniem pewnej ilości etheru walidatora (do 1 ETH), zanim walidator zostanie usunięty z sieci, co trwa 36 dni. Ether walidatora poddanego slashingowi powoli wyczerpuje się w okresie wyjścia, ale 18. dnia otrzymuje on „karę korelacyjną”, która jest tym większa, im więcej walidatorów zostanie poddanych slashingowi w tym samym czasie. Struktura motywacyjna mechanizmu konsensusu wynagradza zatem uczciwość i karze złych aktorów.

Wszystkie nagrody i kary są stosowane raz na epokę.

Czytaj dalej, aby poznać więcej szczegółów...

## Nagrody i kary {#rewards}

### Nagrody {#rewards}

Walidatorzy otrzymują nagrody, gdy oddają głosy zgodne z większością innych walidatorów, gdy proponują bloki i gdy uczestniczą w komitetach synchronizacyjnych. Wartość nagród w każdej epoce jest obliczana na podstawie `base_reward`. Jest to podstawowa jednostka, na podstawie której obliczane są inne nagrody. `base_reward` reprezentuje średnią nagrodę otrzymywaną przez walidatora w optymalnych warunkach w każdej epoce. Jest ona obliczana na podstawie efektywnego salda walidatora i całkowitej liczby aktywnych walidatorów w następujący sposób:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

gdzie `base_reward_factor` to 64, `base_rewards_per_epoch` to 4, a `sum(active balance)` to całkowita ilość stakowanego etheru u wszystkich aktywnych walidatorów.

Oznacza to, że podstawowa nagroda jest proporcjonalna do efektywnego salda walidatora i odwrotnie proporcjonalna do liczby walidatorów w sieci. Im więcej walidatorów, tym większa ogólna emisja (jako `sqrt(N)`), ale mniejsza `base_reward` na walidatora (jako `1/sqrt(N)`). Czynniki te wpływają na APR węzła stakingowego. Przeczytaj uzasadnienie w [notatkach Vitalika](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

Całkowita nagroda jest następnie obliczana jako suma pięciu składników, z których każdy ma wagę określającą, ile każdy składnik dodaje do całkowitej nagrody. Składniki to:

```
1. głosowanie za źródłem: walidator oddał terminowy głos za prawidłowym źródłowym punktem kontrolnym
2. głosowanie za celem: walidator oddał terminowy głos za prawidłowym docelowym punktem kontrolnym
3. głosowanie za głową: walidator oddał terminowy głos za prawidłowym blokiem głowy
4. nagroda komitetu synchronizacyjnego: walidator uczestniczył w komitecie synchronizacyjnym
5. nagroda proponenta: walidator zaproponował blok w prawidłowym slocie
```

Wagi dla każdego składnika są następujące:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Suma tych wag wynosi 64. Nagroda jest obliczana jako suma odpowiednich wag podzielona przez 64. Walidator, który terminowo oddał głosy na źródło, cel i głowę, zaproponował blok i uczestniczył w komitecie synchronizacyjnym, może otrzymać `64/64 * base_reward == base_reward`. Jednak walidator zwykle nie jest proponentem bloku, więc jego maksymalna nagroda wynosi `64-8 /64 * base_reward == 7/8 * base_reward`. Walidatorzy, którzy nie są ani proponentami bloków, ani nie należą do komitetu synchronizacyjnego, mogą otrzymać `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Dodatkowa nagroda jest dodawana w celu motywowania do szybkich atestacji. Jest to `inclusion_delay_reward`. Ma ona wartość równą `base_reward` pomnożonej przez `1/delay`, gdzie `delay` to liczba slotów oddzielających propozycję bloku od atestacji. Na przykład, jeśli atestacja zostanie przesłana w ciągu jednego slotu od propozycji bloku, atestujący otrzymuje `base_reward * 1/1 == base_reward`. Jeśli atestacja dotrze w następnym slocie, atestujący otrzyma `base_reward * 1/2` i tak dalej.

Proponenci bloków otrzymują `8 / 64 * base_reward` za **każdą ważną atestację** zawartą w bloku, więc rzeczywista wartość nagrody skaluje się wraz z liczbą atestujących walidatorów. Proponenci bloków mogą również zwiększyć swoją nagrodę, włączając do proponowanego bloku dowody niewłaściwego zachowania innych walidatorów. Te nagrody to „marchewki”, które zachęcają walidatorów do uczciwości. Proponent bloku, który uwzględni slashing, zostanie nagrodzony `slashed_validators_effective_balance / 512`.

### Kary {#penalties}

Do tej pory rozważaliśmy idealnie zachowujących się walidatorów, ale co z walidatorami, którzy nie oddają terminowych głosów na głowę, źródło i cel lub robią to powoli?

Kary za pominięcie głosów na cel i źródło są równe nagrodom, które atestujący otrzymałby, gdyby je przesłał. Oznacza to, że zamiast dodania nagrody do ich salda, z ich salda jest usuwana równoważna wartość. Nie ma kary za pominięcie głosu na głowę (tj. głosy na głowę są tylko nagradzane, nigdy karane). Nie ma kary związanej z `inclusion_delay` – nagroda po prostu nie zostanie dodana do salda walidatora. Nie ma również kary za nieproponowanie bloku.

Przeczytaj więcej o nagrodach i karach w [specyfikacjach konsensusu](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Nagrody i kary zostały dostosowane w aktualizacji Bellatrix – zobacz, jak Danny Ryan i Vitalik omawiają to w filmie [Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Slashing {#slashing}

Slashing jest poważniejszym działaniem, które skutkuje przymusowym usunięciem walidatora z sieci i związaną z tym utratą jego stakowanego etheru. Istnieją trzy sposoby, w jakie walidator może zostać poddany slashingowi, a wszystkie sprowadzają się do nieuczciwego proponowania lub atestowania bloków:

- Proponując i podpisując dwa różne bloki dla tego samego slotu
- Atestując blok, który „otacza” inny (skutecznie zmieniając historię)
- Poprzez „podwójne głosowanie”, atestując dwóch kandydatów na ten sam blok

Jeśli te działania zostaną wykryte, walidator podlega slashingowi. Oznacza to, że 0,0078125 jest natychmiast spalane dla walidatora z 32 ETH (skalowane liniowo z aktywnym saldem), a następnie rozpoczyna się 36-dniowy okres usuwania. W tym okresie usuwania stawka walidatora stopniowo maleje. W połowie okresu (18. dnia) nakładana jest dodatkowa kara, której wielkość skaluje się wraz z całkowitą stawką etheru wszystkich walidatorów poddanych slashingowi w ciągu 36 dni poprzedzających zdarzenie slashingu. Oznacza to, że im więcej walidatorów jest poddawanych slashingowi, tym większa jest jego skala. Maksymalny slashing to pełne efektywne saldo wszystkich walidatorów poddanych slashingowi (tzn. jeśli wielu walidatorów jest poddawanych slashingowi, mogą stracić całą swoją stawkę). Z drugiej strony, pojedyncze, odizolowane zdarzenie slashingu spala tylko niewielką część stawki walidatora. Ta kara w połowie okresu, która skaluje się wraz z liczbą walidatorów poddanych slashingowi, nazywana jest „karą korelacyjną”.

## Wyciek z powodu nieaktywności {#inactivity-leak}

Jeśli warstwa konsensusu nie sfinalizowała się przez ponad cztery epoki, aktywowany jest protokół awaryjny zwany „wyciekiem z powodu nieaktywności”. Ostatecznym celem wycieku z powodu nieaktywności jest stworzenie warunków niezbędnych do odzyskania finalności łańcucha. Jak wyjaśniono powyżej, finalność wymaga zgody 2/3 większości całkowitej stakowanej puli etheru na źródłowe i docelowe punkty kontrolne. Jeśli walidatorzy reprezentujący ponad 1/3 wszystkich walidatorów przejdą w tryb offline lub nie prześlą poprawnych atestacji, superwiększość 2/3 nie będzie w stanie sfinalizować punktów kontrolnych. Wyciek z powodu nieaktywności pozwala na stopniowe zmniejszanie stawki należącej do nieaktywnych walidatorów, aż będą kontrolować mniej niż 1/3 całkowitej stawki, co pozwoli pozostałym aktywnym walidatorom na sfinalizowanie łańcucha. Niezależnie od tego, jak duża jest pula nieaktywnych walidatorów, pozostali aktywni walidatorzy w końcu będą kontrolować >2/3 stawki. Utrata stawki jest silnym bodźcem dla nieaktywnych walidatorów do jak najszybszej reaktywacji! Scenariusz wycieku z powodu nieaktywności miał miejsce w sieci testowej Medalla, gdy <66% aktywnych walidatorów nie było w stanie osiągnąć konsensusu co do aktualnej głowy blockchainu. Wyciek z powodu nieaktywności został aktywowany i ostatecznie odzyskano finalność!

Projekt nagród, kar i slashingu w mechanizmie konsensusu zachęca poszczególnych walidatorów do prawidłowego zachowania. Jednak z tych wyborów projektowych wyłania się system, który silnie motywuje do równej dystrybucji walidatorów między wieloma klientami i powinien silnie zniechęcać do dominacji jednego klienta.

## Dalsza lektura {#further-reading}

- [Aktualizacja Ethereum: Warstwa motywacyjna](https://eth2book.info/altair/part2/incentives)
- [Zachęty w hybrydowym protokole Casper Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Specyfikacja z adnotacjami Vitalika](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Wskazówki dotyczące zapobiegania slashingowi w Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analiza kar za slashing w ramach EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Źródła_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
