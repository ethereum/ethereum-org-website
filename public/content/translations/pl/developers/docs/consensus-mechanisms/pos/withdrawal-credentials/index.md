---
title: "Dane uwierzytelniające wypłaty"
description: "Wyjaśnienie typów danych uwierzytelniających wypłaty walidatora (0x00, 0x01, 0x02) i ich konsekwencji dla stakujących w Ethereum."
lang: pl
---

Każdy walidator posiada **dane uwierzytelniające wypłaty**, które określają, w jaki sposób i gdzie można wypłacić stakowane ETH oraz nagrody. Typ danych uwierzytelniających jest wskazywany przez pierwszy bajt: `0x00`, `0x01` lub `0x02`. Zrozumienie tych typów jest ważne dla walidatorów zarządzających swoją stawką.

## 0x00: Dane uwierzytelniające sprzed aktualizacji Shapella {#0x00-credentials}

Typ `0x00` to oryginalny format danych uwierzytelniających wypłaty sprzed aktualizacji Shapella (kwiecień 2023 r.). Walidatory z tym typem danych uwierzytelniających nie mają ustawionego adresu wypłaty w warstwie wykonawczej, co oznacza, że ich środki pozostają zablokowane w warstwie konsensusu. Jeśli nadal posiadasz dane uwierzytelniające `0x00`, musisz je zaktualizować do `0x01` lub `0x02`, zanim będziesz mógł otrzymywać jakiekolwiek wypłaty.

## 0x01: Starsze dane uwierzytelniające wypłaty {#0x01-credentials}

Typ `0x01` został wprowadzony wraz z aktualizacją Shapella i stał się standardem dla walidatorów, którzy chcieli ustawić adres wypłaty w warstwie wykonawczej. Z danymi uwierzytelniającymi `0x01`:

- Każde saldo powyżej 32 ETH jest **automatycznie przelewane** na Twój adres wypłaty
- Pełne wyjścia przechodzą przez standardową kolejkę wyjść
- Nagrody powyżej 32 ETH nie mogą być kapitalizowane (compound) — są one okresowo wypłacane

**Dlaczego niektórzy walidatorzy nadal używają 0x01:** Jest to prostsze i dobrze znane. Wielu walidatorów złożyło depozyt po aktualizacji Shapella i już posiada ten typ, który sprawdza się dobrze u tych, którzy chcą automatycznych wypłat nadwyżki salda.

**Dlaczego nie jest to zalecane:** Z `0x01` tracisz możliwość kapitalizacji nagród powyżej 32 ETH. Każda nadwyżka jest automatycznie przelewana, co ogranicza potencjał zarobkowy Twojego walidatora i wymaga oddzielnego zarządzania wypłaconymi środkami.

## 0x02: Kapitalizujące dane uwierzytelniające wypłaty {#0x02-credentials}

Typ `0x02` został wprowadzony wraz z aktualizacją Pectra i jest obecnie **zalecanym wyborem** dla walidatorów. Walidatory z danymi uwierzytelniającymi `0x02` są czasami nazywane „walidatorami kapitalizującymi”.

Z danymi uwierzytelniającymi `0x02`:

- Nagrody powyżej 32 ETH **kapitalizują się** w przyrostach co 1 ETH aż do maksymalnego salda efektywnego wynoszącego 2048 ETH
- Częściowe wypłaty muszą być zlecane ręcznie (automatyczne przelewy występują tylko powyżej progu 2048 ETH)
- Walidatorzy mogą skonsolidować wiele walidatorów z 32 ETH w jednego walidatora o wyższym saldzie
- Pełne wyjścia są nadal obsługiwane przez standardową kolejkę wyjść

Zarówno częściowe wypłaty, jak i konsolidacje można przeprowadzić za pośrednictwem [Launchpad Validator Actions](https://launchpad.ethereum.org/en/validator-actions).

**Dlaczego walidatorzy powinni preferować 0x02:** Oferuje lepszą efektywność kapitałową dzięki kapitalizacji, większą kontrolę nad tym, kiedy następują wypłaty, oraz obsługuje konsolidację walidatorów. Dla osób stakujących samodzielnie (solo stakers), które z czasem gromadzą nagrody, oznacza to, że ich saldo efektywne — a tym samym ich nagrody — mogą rosnąć powyżej 32 ETH bez ręcznej interwencji.

**Ważne:** Po konwersji z `0x01` na `0x02` nie można jej wycofać.

Aby uzyskać szczegółowy przewodnik na temat konwersji na dane uwierzytelniające typu 2 i funkcji MaxEB, zobacz [stronę z wyjaśnieniem MaxEB](/roadmap/pectra/maxeb/).

## Co powinienem wybrać? {#what-should-i-pick}

- **Nowi walidatorzy:** Wybierz `0x02`. To nowoczesny standard z lepszą kapitalizacją i elastycznością.
- **Istniejący walidatorzy 0x01:** Rozważ konwersję na `0x02`, jeśli chcesz, aby nagrody kapitalizowały się powyżej 32 ETH lub planujesz skonsolidować walidatory.
- **Istniejący walidatorzy 0x00:** Zaktualizuj natychmiast — nie możesz dokonać wypłaty bez aktualizacji swoich danych uwierzytelniających. Musisz najpierw przekonwertować je na `0x01`, a następnie możesz przekonwertować na `0x02`.

## Narzędzia do zarządzania danymi uwierzytelniającymi wypłaty {#withdrawal-credential-tools}

Kilka narzędzi obsługuje wybór lub konwersję między typami danych uwierzytelniających:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** – oficjalne narzędzie do depozytów i zarządzania walidatorami, w tym konwersji danych uwierzytelniających i konsolidacji
- **[Pectra Staking Manager](https://pectrastaking.com)** – interfejs sieciowy z obsługą łączenia portfela do konwersji i konsolidacji
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** – narzędzie wiersza poleceń do konwersji wsadowych
- **[Ethereal](https://github.com/wealdtech/ethereal)** – narzędzie CLI do operacji w Ethereum, w tym zarządzania walidatorami

Pełną listę narzędzi do konsolidacji i szczegółowe instrukcje konwersji znajdziesz w sekcji [Narzędzia do konsolidacji MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Dalsza lektura {#further-reading}

- [Klucze w dowodzie stawki (PoS) Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) – dowiedz się więcej o kluczach walidatora i ich związku z danymi uwierzytelniającymi wypłaty
- [MaxEB](/roadmap/pectra/maxeb/) – szczegółowy przewodnik po aktualizacji Pectra i funkcji maksymalnego salda efektywnego