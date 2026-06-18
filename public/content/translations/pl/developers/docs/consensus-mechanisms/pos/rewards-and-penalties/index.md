---
title: Nagrody i kary w proof-of-stake
description: Dowiedz się o zachętach wewnątrz protokołu w Ethereum opartym na proof-of-stake.
lang: pl
---

[Ethereum](/) jest zabezpieczone za pomocą swojej natywnej kryptowaluty, etheru (ETH). Operatorzy węzłów, którzy chcą uczestniczyć w walidacji bloków i identyfikacji czoła łańcucha, deponują ether w [kontrakcie depozytowym](/staking/deposit-contract/) na Ethereum. Następnie otrzymują wynagrodzenie w etherze za uruchomienie oprogramowania walidatora, które sprawdza ważność nowych bloków otrzymanych przez sieć peer-to-peer i stosuje algorytm wyboru rozwidlenia w celu zidentyfikowania czoła łańcucha.

Istnieją dwie główne role walidatora: 1) sprawdzanie nowych bloków i „poświadczanie” ich, jeśli są ważne, 2) proponowanie nowych bloków, gdy zostanie wybrany losowo z całej puli walidatorów. Jeśli walidator nie wykona żadnego z tych zadań, gdy zostanie o to poproszony, traci wypłatę w etherze. Walidatorzy mają również czasami za zadanie agregację podpisów i uczestnictwo w komitetach synchronizacyjnych.

Istnieją również pewne działania, które są bardzo trudne do wykonania przypadkowo i oznaczają złośliwą intencję, takie jak proponowanie wielu bloków dla tego samego slotu lub poświadczanie wielu bloków dla tego samego slotu. Są to zachowania podlegające „cięciu” (slashable), które skutkują spaleniem pewnej ilości etheru walidatora (do 1 ETH), zanim walidator zostanie usunięty z sieci, co trwa 36 dni. Ether ściętego walidatora powoli wycieka przez okres wyjścia, ale w 18. dniu otrzymuje on „karę korelacyjną”, która jest tym większa, im więcej walidatorów zostanie ściętych w tym samym czasie. Struktura zachęt mechanizmu konsensusu płaci zatem za uczciwość i karze złych aktorów.

Wszystkie nagrody i kary są stosowane raz na epokę.

Czytaj dalej, aby poznać więcej szczegółów...

## Nagrody i kary {#rewards}

### Nagrody {#rewards-2}

Walidatorzy otrzymują nagrody, gdy oddają głosy zgodne z większością innych walidatorów, gdy proponują bloki i gdy uczestniczą w komitetach synchronizacyjnych. Wartość nagród w każdej epoce jest obliczana na podstawie `base_reward`. Jest to jednostka bazowa, od której obliczane są inne nagrody. `base_reward` reprezentuje średnią nagrodę otrzymywaną przez walidatora w optymalnych warunkach na epokę. Oblicza się to na podstawie salda efektywnego walidatora i całkowitej liczby aktywnych walidatorów w następujący sposób:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

gdzie `base_reward_factor` wynosi 64, `base_rewards_per_epoch` wynosi 4, a `sum(active balance)` to całkowity stakowany ether wszystkich aktywnych walidatorów.

Oznacza to, że nagroda bazowa jest proporcjonalna do salda efektywnego walidatora i odwrotnie proporcjonalna do liczby walidatorów w sieci. Im więcej walidatorów, tym większa ogólna emisja (ponieważ `sqrt(N)`), ale mniejsza `base_reward` na walidatora (ponieważ `1/sqrt(N)`). Czynniki te wpływają na APR dla węzła stakującego. Przeczytaj uzasadnienie tego w [notatkach Vitalika](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

Całkowita nagroda jest następnie obliczana jako suma pięciu składników, z których każdy ma wagę określającą, ile dany składnik dodaje do całkowitej nagrody. Składniki te to:

```
1. source vote: walidator oddał w terminie głos na prawidłowy punkt kontrolny źródła
2. target vote: walidator oddał w terminie głos na prawidłowy punkt kontrolny celu
3. head vote: walidator oddał w terminie głos na prawidłowy blok czołowy
4. sync committee reward: walidator uczestniczył w komitecie synchronizacyjnym
5. proposer reward: walidator zaproponował blok w prawidłowym slocie
```

Wagi dla każdego składnika są następujące:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Suma tych wag wynosi 64. Nagroda jest obliczana jako suma odpowiednich wag podzielona przez 64. Walidator, który oddał w terminie głosy na źródło, cel i czoło, zaproponował blok i uczestniczył w komitecie synchronizacyjnym, mógłby otrzymać `64/64 * base_reward == base_reward`. Jednak walidator zazwyczaj nie jest proponującym blok, więc jego maksymalna nagroda wynosi `64-8 /64 * base_reward == 7/8 * base_reward`. Walidatorzy, którzy nie są ani proponującymi blok, ani nie należą do komitetu synchronizacyjnego, mogą otrzymać `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Dodatkowa nagroda jest dodawana w celu zachęcenia do szybkich poświadczeń. Jest to `inclusion_delay_reward`. Ma ona wartość równą `base_reward` pomnożonej przez `1/delay`, gdzie `delay` to liczba slotów oddzielających propozycję bloku od poświadczenia. Na przykład, jeśli poświadczenie zostanie przesłane w ciągu jednego slotu od propozycji bloku, poświadczający otrzymuje `base_reward * 1/1 == base_reward`. Jeśli poświadczenie dotrze w następnym slocie, poświadczający otrzymuje `base_reward * 1/2` i tak dalej.

Proponujący blok otrzymują `8 / 64 * base_reward` za **każde ważne poświadczenie** zawarte w bloku, więc rzeczywista wartość nagrody skaluje się wraz z liczbą poświadczających walidatorów. Proponujący blok mogą również zwiększyć swoją nagrodę, dołączając do proponowanego bloku dowody niewłaściwego zachowania innych walidatorów. Te nagrody to „marchewki”, które zachęcają walidatorów do uczciwości. Proponujący blok, który uwzględni cięcie, zostanie nagrodzony `slashed_validators_effective_balance / 512`.

### Kary {#penalties}

Do tej pory rozważaliśmy idealnie zachowujących się walidatorów, ale co z walidatorami, którzy nie oddają w terminie głosów na czoło, źródło i cel lub robią to powoli?

Kary za brak głosów na cel i źródło są równe nagrodom, które poświadczający otrzymałby, gdyby je przesłał. Oznacza to, że zamiast dodania nagrody do ich salda, równowartość jest z niego odejmowana. Nie ma kary za brak głosu na czoło (tj. głosy na czoło są tylko nagradzane, nigdy karane). Nie ma kary związanej z `inclusion_delay` – nagroda po prostu nie zostanie dodana do salda walidatora. Nie ma również kary za niezaproponowanie bloku.

Przeczytaj więcej o nagrodach i karach w [specyfikacjach konsensusu](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Nagrody i kary zostały dostosowane w aktualizacji Bellatrix – zobacz, jak Danny Ryan i Vitalik dyskutują o tym w tym [wideo Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Cięcie {#slashing}

Cięcie to poważniejsze działanie, które skutkuje przymusowym usunięciem walidatora z sieci i związaną z tym utratą jego stakowanego etheru. Istnieją trzy sposoby, w jakie walidator może zostać ścięty, z których wszystkie sprowadzają się do nieuczciwej propozycji lub poświadczenia bloków:

- Poprzez zaproponowanie i podpisanie dwóch różnych bloków dla tego samego slotu
- Poprzez poświadczenie bloku, który „otacza” inny (skutecznie zmieniając historię)
- Poprzez „podwójne głosowanie”, poświadczając dwóch kandydatów na ten sam blok

Jeśli te działania zostaną wykryte, walidator zostaje ścięty. Oznacza to, że 0,0078125 jest natychmiast spalane dla walidatora z 32 ETH (skalowane liniowo z aktywnym saldem), a następnie rozpoczyna się 36-dniowy okres usuwania. Podczas tego okresu usuwania stawka walidatora stopniowo wycieka. W połowie tego okresu (18. dzień) nakładana jest dodatkowa kara, której wielkość skaluje się z całkowitym stakowanym etherem wszystkich ściętych walidatorów w ciągu 36 dni przed zdarzeniem cięcia. Oznacza to, że gdy więcej walidatorów zostaje ściętych, wielkość cięcia rośnie. Maksymalne cięcie to pełne saldo efektywne wszystkich ściętych walidatorów (tj. jeśli wielu walidatorów zostanie ściętych, mogą oni stracić całą swoją stawkę). Z drugiej strony, pojedyncze, odizolowane zdarzenie cięcia spala tylko niewielką część stawki walidatora. Ta kara w połowie okresu, która skaluje się z liczbą ściętych walidatorów, nazywana jest „karą korelacyjną”.

## Wyciek za nieaktywność {#inactivity-leak}

Jeśli warstwa konsensusu nie osiągnie ostateczności przez ponad cztery epoki, aktywowany jest protokół awaryjny zwany „wyciekiem za nieaktywność”. Ostatecznym celem wycieku za nieaktywność jest stworzenie warunków wymaganych do odzyskania ostateczności przez łańcuch. Jak wyjaśniono powyżej, ostateczność wymaga, aby większość kwalifikowana 2/3 całkowitego stakowanego etheru zgodziła się co do punktów kontrolnych źródła i celu. Jeśli walidatorzy reprezentujący ponad 1/3 wszystkich walidatorów przejdą w tryb offline lub nie prześlą prawidłowych poświadczeń, większość kwalifikowana 2/3 nie będzie w stanie sfinalizować punktów kontrolnych. Wyciek za nieaktywność pozwala stawce należącej do nieaktywnych walidatorów stopniowo wyciekać, aż będą oni kontrolować mniej niż 1/3 całkowitej stawki, co pozwoli pozostałym aktywnym walidatorom sfinalizować łańcuch. Niezależnie od tego, jak duża jest pula nieaktywnych walidatorów, pozostali aktywni walidatorzy ostatecznie będą kontrolować >2/3 stawki. Utrata stawki jest silną zachętą dla nieaktywnych walidatorów do jak najszybszej ponownej aktywacji! Scenariusz wycieku za nieaktywność wystąpił w sieci testowej Medalla, gdy < 66% aktywnych walidatorów było w stanie osiągnąć konsensus co do obecnego czoła blockchaina. Wyciek za nieaktywność został aktywowany i ostateczność została ostatecznie odzyskana!

Projekt nagród, kar i cięć mechanizmu konsensusu zachęca poszczególnych walidatorów do prawidłowego zachowania. Jednak z tych wyborów projektowych wyłania się system, który silnie zachęca do równego podziału walidatorów między wielu klientów i powinien silnie zniechęcać do dominacji jednego klienta.

## Dalsza lektura {#further-reading}

- [Aktualizacja Ethereum: Warstwa zachęt](https://eth2book.info/altair/part2/incentives)
- [Zachęty w hybrydowym protokole Casper w Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Specyfikacja z adnotacjami Vitalika](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Wskazówki dotyczące zapobiegania cięciom w Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analiza kar za cięcie w ramach EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Źródła_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_