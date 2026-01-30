---
title: Zrozumieć podaż i emisję ETH
description: Przewodnik po podaży i emisji ETH dla początkujących, obejmujący kluczowe pojęcia takie jak EIP-y, PoS i EIP-1559.
lang: pl
---

# Podaż i emisja ETH {#eth-supply-and-issuance}

## Wymagania wstępne {#prerequisites}

Ten artykuł napisano z myślą o początkujących, którzy nie mają wcześniejszej wiedzy na ten temat. Jednakże, aby w pełni zrozumieć ten temat, warto mieć podstawową wiedzę na temat takich pojęć, jak [Propozycje ulepszeń w Ethereum (EIPs)](/eips/#introduction-to-ethereum-improvement-proposals), [dowód pracy (PoW)](/developers/docs/consensus-mechanisms/pow/), [dowód stawki (PoS)](/developers/docs/consensus-mechanisms/pos/) oraz [aktualizacja London](/ethereum-forks/#london).

## Ile jest obecnie tokenów ETH? {#current-eth-supply}

Całkowita podaż ETH jest dynamiczna i zmienia się z powodu dwóch głównych czynników:

1. **Emisja Proof-of-Stake (PoS)**: Nowy ETH jest tworzony jako nagroda dla walidatorów, którzy zabezpieczają sieć
2. **Spalanie EIP-1559**: Część opłat transakcyjnych jest trwale usuwana z obiegu

Aktualną podaż i zmiany możesz śledzić w czasie rzeczywistym na platformach takich jak [Ultrasound Money](https://ultrasound.money).

Podaż i emisja Ethereum są kluczowymi wskaźnikami dla zrozumienia stanu i przyszłości sieci. Ale co tak naprawdę oznacza emisja ETH? Przyjrzyjmy się temu.

## Dlaczego podaż i emisja ETH mają znaczenie {#why-eth-supply-matters}

W tradycyjnym systemie finansowym banki centralne kontrolują podaż pieniądza, często dodrukowując więcej, by stymulować gospodarkę. Z kolei Ethereum opiera się na transparentnym i przewidywalnym systemie opartym na kodzie. Wiedza o tym, ile ETH jest w obiegu i jak szybko emitowane są nowe ETH, pomaga:

- **Budować zaufanie**: Społeczność Ethereum może weryfikować dane o podaży i emisji bezpośrednio z poziomu blockchaina.
- **Zrozumieć wartość**: Relacja pomiędzy emisją a tempem spalania ETH wpływa na inflację lub deflację ETH, co przekłada się na jego wartość w czasie.
- **Monitorować stan sieci**: Zmiany w emisji i tempie spalania odzwierciedlają aktywność i bezpieczeństwo sieci.

## Czym jest emisja ETH? {#eth-issuance}

Emisja ETH odnosi się do procesu tworzenia nowego ETH jako nagrody dla walidatorów, którzy zabezpieczają sieć Ethereum. Różni się ona od całkowitej podaży, która jest całkowitą liczbą ETH w obiegu.

### Mówiąc najprościej:

- **Emisja** dodaje nowe ETH do sieci.
- **Spalanie** (wprowadzone przez EIP-1559) usuwa ETH z sieci poprzez zniszczenie części opłat transakcyjnych.

Te dwie siły decydują o tym, czy podaż Ethereum rośnie (inflacja) czy spada (deflacja) w czasie.

## Podaż i emisja ETH obecnie {#eth-supply-today}

System Ethereum Proof-of-Stake (PoS) znacząco zmniejszył emisję ETH w porównaniu do wcześniejszego modelu Proof-of-Work (PoW). Walidatorzy—którzy blokują ETH, aby zabezpieczyć sieć—zdobywają ETH jako nagrodę. Możesz sprawdzić obecną stopę emisji na [Ultrasound Money](https://ultrasound.money).

Jednakże ta liczba jest dynamiczna. Dzięki EIP-1559, kiedy aktywność sieci jest wysoka, tempo spalania ETH może przewyższyć emisję, tworząc efekt deflacyjny. Na przykład, w okresach wzmożonego zapotrzebowania, takich jak wprowadzenie NFT lub aktywność DeFi, więcej ETH może być spalonych niż emitowanych.

### Narzędzia do monitorowania podaży i emisji ETH:

- [Ultrasound Money](https://ultrasound.money) - Śledzenie w czasie rzeczywistym podaży, emisji i tempa spalania ETH
- [Etherscan](https://etherscan.io) - Eksplorator bloków z metrykami podaży

## Czynniki Wpływające Na Przyszłą Podaż i Emisję ETH {#future-eth-supply}

Przyszła podaż Ethereum nie jest stała—zależy ona od kilku czynników:

1. **Udział w stakingu**:
   - Im więcej walidatorów dołączy do sieci, tym więcej nagród w formie ETH zostanie rozdysponowanych.
   - Mniejsza liczba walidatorów może zmniejszyć emisję.
   - Dowiedz się więcej o [stakingu] (/staking/).

2. **Aktywność sieci**:
   - Wysokie wolumeny transakcji prowadzą do spalania większej liczby ETH, potencjalnie równoważąc lub przewyższając emisję.
   - Przeczytaj o [opłatach za gaz] (/developers/docs/gas/) i o tym, jak wpływają na spalanie.

3. **Aktualizacje protokołu**:
   - Przyszłe zmiany w kodzie Ethereum mogą dostosować nagrody za staking lub mechanizmy spalania, co wpłynie na kształtowanie dynamiki podaży.
   - Bądź na bieżąco z [planem działania Ethereum] (/roadmap/).

## Podsumowanie: Podaż, Emisja ETH i Co Dalej {#recap}

Oto krótkie podsumowanie, co musisz wiedzieć o podaży i emisji ETH:

- **Podaż ETH**: Dynamiczna i ciągle zmieniająca się, możesz ją monitorować w czasie rzeczywistym dzięki narzędziom takim jak [Ultrasound Money](https://ultrasound.money)
- **Emisja oparta o PoS**: Znacząco zredukowana w porównaniu do PoW, z nagrodami dla walidatorów. Możesz sprawdzić obecne stopy na [Ultrasound Money] (https://ultrasound.money)
- **Rola EIP-1559**: Spalanie ETH może powodować deflację sieci podczas okresów wzmożonej aktywności
- **Przyszłe trendy**: Udział w stakingu, zapotrzebowanie sieci i aktualizacje protokołu będą kształtować podaż ETH

Zrozumienie procesu emisji ETH pomaga poznać wartość Ethereum i jego potencjału jako deflacyjnego, zdecentralizowanego aktywu. Po więcej szczegółowych informacji o tym, jak The Merge wpłynął na podaż ETH, sprawdź naszą [szczegółową analizę](/roadmap/merge/issuance/). Ciekawy, jaka będzie przyszłość ETH? Dowiedz się więcej dzięki narzędziom takim jak [Ultrasound Money](https://ultrasound.money) lub odkrywaj nasze [przewodniki po stakingu](/staking/).