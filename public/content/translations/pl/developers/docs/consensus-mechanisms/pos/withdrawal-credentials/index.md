---
title: "Poświadczenia wypłaty"
description: "Wyjaśnienie typów poświadczeń wypłat walidatora (0x00, 0x01, 0x02) i ich implikacji dla stakerów Ethereum."
lang: pl
---

Każdy walidator ma **poświadczenie wypłaty**, które określa, jak i gdzie można wypłacić stakowane ETH i nagrody. Typ poświadczenia jest wskazany przez pierwszy bajt: `0x00`, `0x01` lub `0x02`. Zrozumienie tych typów jest ważne dla walidatorów zarządzających swoją stawką.

## 0x00: Poświadczenia sprzed aktualizacji Shapella {#0x00-credentials}

Typ `0x00` to oryginalny format poświadczeń wypłaty sprzed aktualizacji Shapella (kwiecień 2023). Walidatorzy z tym typem poświadczeń nie mają ustawionego adresu wypłaty w warstwie wykonawczej, co oznacza, że ich środki pozostają zablokowane w warstwie konsensusu. Jeśli nadal masz poświadczenia `0x00`, musisz je zaktualizować do `0x01` lub `0x02`, zanim będziesz mógł otrzymywać jakiekolwiek wypłaty.

## 0x01: Starsze poświadczenia wypłat {#0x01-credentials}

Typ `0x01` został wprowadzony wraz z aktualizacją Shapella i stał się standardem dla walidatorów, którzy chcieli ustawić adres wypłaty w warstwie wykonawczej. Z poświadczeniami `0x01`:

- Każde saldo powyżej 32 ETH jest **automatycznie przesyłane** na Twój adres wypłaty
- Pełne wyjścia przechodzą przez standardową kolejkę wyjść
- Nagrody powyżej 32 ETH nie mogą być reinwestowane — są okresowo wypłacane

**Dlaczego niektórzy walidatorzy nadal używają 0x01:** Jest to prostsze i dobrze znane rozwiązanie. Wielu walidatorów dokonało depozytu po aktualizacji Shapella i już posiada ten typ, który działa dobrze dla tych, którzy chcą automatycznych wypłat nadwyżki salda.

**Dlaczego nie jest to zalecane:** Z typem `0x01` tracisz możliwość reinwestowania nagród powyżej 32 ETH. Każda nadwyżka jest automatycznie wypłacana, co ogranicza potencjał zarobkowy walidatora i wymaga oddzielnego zarządzania wypłaconymi środkami.

## 0x02: Reinwestujące poświadczenia wypłat {#0x02-credentials}

Typ `0x02` został wprowadzony wraz z aktualizacją Pectra i jest obecnie **zalecanym wyborem** dla walidatorów. Walidatorzy z poświadczeniami `0x02` są czasami nazywani "walidatorami reinwestującymi".

Z poświadczeniami `0x02`:

- Nagrody powyżej 32 ETH są **reinwestowane** w przyrostach co 1 ETH aż do maksymalnego efektywnego salda 2048 ETH
- Częściowe wypłaty muszą być zlecane ręcznie (automatyczne wypłaty mają miejsce tylko powyżej progu 2048 ETH)
- Walidatorzy mogą konsolidować wielu walidatorów 32 ETH w jednego walidatora o wyższym saldzie
- Pełne wyjścia są nadal obsługiwane przez standardową kolejkę wyjść

Zarówno częściowe wypłaty, jak i konsolidacje mogą być wykonane za pośrednictwem [Launchpad Validator Actions](https://launchpad.ethereum.org/en/validator-actions).

**Dlaczego walidatorzy powinni preferować typ 0x02:** Oferuje on lepszą efektywność kapitałową dzięki reinwestowaniu, większą kontrolę nad terminami wypłat i wspiera konsolidację walidatorów. Dla samodzielnych stakerów, którzy z czasem gromadzą nagrody, oznacza to, że ich efektywne saldo – a tym samym ich nagrody – mogą wzrosnąć powyżej 32 ETH bez ręcznej interwencji.

**Ważne:** Po konwersji z `0x01` na `0x02` nie można cofnąć tej zmiany.

Szczegółowy przewodnik dotyczący konwersji na poświadczenia typu 2 oraz funkcji MaxEB można znaleźć na [stronie wyjaśniającej MaxEB](/roadmap/pectra/maxeb/).

## Co powinienem wybrać? {#what-should-i-pick}

- **Nowi walidatorzy:** Wybierzcie `0x02`. To nowoczesny standard z lepszym reinwestowaniem i elastycznością.
- **Obecni walidatorzy 0x01:** Rozważcie konwersję do `0x02`, jeśli chcecie, aby nagrody były reinwestowane powyżej 32 ETH lub planujecie konsolidację walidatorów.
- **Obecni walidatorzy 0x00:** Zaktualizujcie natychmiast – nie możecie dokonywać wypłat bez aktualizacji poświadczeń. Najpierw musicie dokonać konwersji na `0x01`, a następnie możecie dokonać konwersji na `0x02`.

## Narzędzia do zarządzania poświadczeniami wypłat {#withdrawal-credential-tools}

Kilka narzędzi obsługuje wybór lub konwersję między typami poświadczeń:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** – oficjalne narzędzie do depozytów i zarządzania walidatorami, w tym konwersji poświadczeń i konsolidacji
- **[Pectra Staking Manager](https://pectrastaking.com)** – interfejs internetowy z obsługą wallet-connect do konwersji i konsolidacji
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** – narzędzie wiersza poleceń do konwersji wsadowych
- **[Ethereal](https://github.com/wealdtech/ethereal)** – narzędzie CLI do operacji na Ethereum, w tym zarządzania walidatorami

Pełną listę narzędzi do konsolidacji i szczegółowe instrukcje dotyczące konwersji można znaleźć w [Narzędzia do konsolidacji MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Dalsza lektura {#further-reading}

- [Klucze w proof-of-stake Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) – dowiedz się o kluczach walidatora i ich związku z poświadczeniami wypłat
- [MaxEB](/roadmap/pectra/maxeb/) – szczegółowy przewodnik po aktualizacji Pectra i funkcji maksymalnego efektywnego salda
