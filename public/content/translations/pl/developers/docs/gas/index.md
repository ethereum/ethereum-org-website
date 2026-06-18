---
title: Gaz i opłaty
metaTitle: "Gaz i opłaty w Ethereum: przegląd techniczny"
description: Dowiedz się o opłatach za gaz w Ethereum, jak są obliczane i jaka jest ich rola w bezpieczeństwie sieci oraz przetwarzaniu transakcji.
lang: pl
---

Gaz jest niezbędny dla sieci [Ethereum](/). Jest to paliwo, które pozwala jej działać, podobnie jak samochód potrzebuje benzyny do jazdy.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznać się z [transakcjami](/developers/docs/transactions/) oraz [EVM](/developers/docs/evm/).

## Czym jest gaz? {#what-is-gas}

Gaz odnosi się do jednostki, która mierzy ilość wysiłku obliczeniowego wymaganego do wykonania określonych operacji w sieci Ethereum.

Ponieważ każda transakcja w Ethereum wymaga zasobów obliczeniowych do wykonania, za te zasoby trzeba zapłacić, aby upewnić się, że Ethereum nie jest podatne na spam i nie może utknąć w nieskończonych pętlach obliczeniowych. Płatność za obliczenia dokonywana jest w formie opłaty za gaz.

Opłata za gaz to **ilość gazu zużyta do wykonania jakiejś operacji, pomnożona przez koszt jednostki gazu**. Opłata jest uiszczana niezależnie od tego, czy transakcja zakończy się sukcesem, czy nie.

![A diagram showing where gas is needed in EVM operations](./gas.png)
_Diagram zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Opłaty za gaz muszą być uiszczane w natywnej walucie Ethereum, etherze (ETH). Ceny gazu są zazwyczaj podawane w gwei, które jest nominałem ETH. Każde gwei jest równe jednej miliardowej ETH (0,000000001 ETH lub 10<sup>-9</sup> ETH).

Na przykład, zamiast mówić, że Twój gaz kosztuje 0,000000001 ethera, możesz powiedzieć, że Twój gaz kosztuje 1 gwei.

Słowo „gwei” to skrót od „giga-wei”, co oznacza „miliard wei”. Jedno gwei jest równe jednemu miliardowi wei. Samo wei (nazwane na cześć [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), twórcy [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) jest najmniejszą jednostką ETH.

## Jak obliczane są opłaty za gaz? {#how-are-gas-fees-calculated}

Możesz ustalić ilość gazu, jaką jesteś skłonny zapłacić podczas wysyłania transakcji. Oferując określoną ilość gazu, licytujesz włączenie swojej transakcji do następnego bloku. Jeśli zaoferujesz zbyt mało, walidatory będą mniej skłonne wybrać Twoją transakcję do włączenia, co oznacza, że Twoja transakcja może zostać wykonana z opóźnieniem lub wcale. Jeśli zaoferujesz zbyt dużo, możesz zmarnować trochę ETH. Jak więc określić, ile zapłacić?

Całkowity gaz, który płacisz, dzieli się na dwa składniki: `base fee` (opłata podstawowa) oraz `priority fee` (opłata priorytetowa).

`base fee` jest ustalana przez protokół — musisz zapłacić co najmniej tę kwotę, aby Twoja transakcja została uznana za ważną. `priority fee` to opłata priorytetowa, którą dodajesz do opłaty podstawowej, aby Twoja transakcja była atrakcyjna dla walidatorów, tak aby wybrali ją do włączenia w następnym bloku.

Transakcja, która opłaca tylko `base fee`, jest technicznie ważna, ale mało prawdopodobne, że zostanie włączona, ponieważ nie oferuje walidatorom żadnej zachęty do wybrania jej zamiast innej transakcji. „Właściwa” opłata `priority` jest określana przez wykorzystanie sieci w momencie wysyłania transakcji — jeśli popyt jest duży, być może będziesz musiał ustawić opłatę `priority` wyżej, ale gdy popyt jest mniejszy, możesz zapłacić mniej.

Na przykład, powiedzmy, że Jordan musi zapłacić Taylorowi 1 ETH. Transfer ETH wymaga 21 000 jednostek gazu, a opłata podstawowa wynosi 10 gwei. Jordan dołącza opłatę priorytetową w wysokości 2 gwei.

Całkowita opłata byłaby teraz równa:

`units of gas used * (base fee + priority fee)`

gdzie `base fee` to wartość ustalona przez protokół, a `priority fee` to wartość ustalona przez użytkownika jako opłata priorytetowa dla walidatora.

np. `21,000 * (10 + 2) = 252,000 gwei` (0,000252 ETH).

Kiedy Jordan wyśle pieniądze, z konta Jordana zostanie pobrane 1,000252 ETH. Na konto Taylora wpłynie 1,0000 ETH. Walidator otrzymuje opłatę priorytetową w wysokości 0,000042 ETH. `base fee` w wysokości 0,00021 ETH zostaje spalona.

### Opłata podstawowa {#base-fee}

Każdy blok ma opłatę podstawową, która działa jako cena minimalna. Aby kwalifikować się do włączenia do bloku, oferowana cena za gaz musi być co najmniej równa opłacie podstawowej. Opłata podstawowa jest obliczana niezależnie od bieżącego bloku i jest zamiast tego określana przez bloki przed nim, co sprawia, że opłaty transakcyjne są bardziej przewidywalne dla użytkowników. Kiedy blok zostaje utworzony, ta **opłata podstawowa jest „spalana”**, co usuwa ją z obiegu.

Opłata podstawowa jest obliczana za pomocą wzoru, który porównuje rozmiar poprzedniego bloku (ilość gazu zużytego na wszystkie transakcje) z rozmiarem docelowym (połowa limitu gazu). Opłata podstawowa wzrośnie lub spadnie o maksymalnie 12,5% na blok, jeśli docelowy rozmiar bloku jest odpowiednio powyżej lub poniżej celu. Ten wykładniczy wzrost sprawia, że utrzymywanie wysokiego rozmiaru bloku w nieskończoność jest ekonomicznie nieopłacalne.

| Numer bloku | Dołączony gaz | Wzrost opłaty | Obecna opłata podstawowa |
| ------------ | -----------: | -----------: | ---------------: |
| 1            |          18M |           0% |         100 gwei |
| 2            |          36M |           0% |         100 gwei |
| 3            |          36M |        12,5% |       112,5 gwei |
| 4            |          36M |        12,5% |       126,6 gwei |
| 5            |          36M |        12,5% |       142,4 gwei |
| 6            |          36M |        12,5% |       160,2 gwei |
| 7            |          36M |        12,5% |       180,2 gwei |
| 8            |          36M |        12,5% |       202,7 gwei |

W powyższej tabeli przedstawiono przykład z wykorzystaniem 36 milionów jako limitu gazu. Zgodnie z tym przykładem, aby utworzyć transakcję w bloku numer 9, portfel poinformuje użytkownika z całą pewnością, że **maksymalna opłata podstawowa**, która zostanie dodana do następnego bloku, wynosi `current base fee * 112.5%` lub `202.7 gwei * 112.5% = 228.1 gwei`.

Należy również zauważyć, że jest mało prawdopodobne, abyśmy zaobserwowali przedłużające się skoki pełnych bloków ze względu na szybkość, z jaką opłata podstawowa rośnie przed pełnym blokiem.

| Numer bloku | Dołączony gaz | Wzrost opłaty | Obecna opłata podstawowa |
| ------------ | -----------: | -----------: | ---------------: |
| 30           |          36M |        12,5% |      2705,6 gwei |
| ...          |          ... |        12,5% |              ... |
| 50           |          36M |        12,5% |     28531,3 gwei |
| ...          |          ... |        12,5% |              ... |
| 100          |          36M |        12,5% |  10302608,6 gwei |

### Opłata priorytetowa {#priority-fee}

Opłata priorytetowa zachęca walidatory do maksymalizacji liczby transakcji w bloku, ograniczonej jedynie przez limit gazu bloku. Bez opłat priorytetowych racjonalny walidator mógłby włączyć mniej — lub nawet zero — transakcji bez żadnej bezpośredniej kary w warstwie wykonawczej lub warstwie konsensusu, ponieważ nagrody za staking są niezależne od tego, ile transakcji znajduje się w bloku. Dodatkowo, opłaty priorytetowe pozwalają użytkownikom przelicytować innych w celu uzyskania priorytetu w tym samym bloku, skutecznie sygnalizując pilność. 

### Opłata maksymalna {#maxfee}

Aby wykonać transakcję w sieci, użytkownicy mogą określić maksymalny limit, jaki są skłonni zapłacić za wykonanie swojej transakcji. Ten opcjonalny parametr jest znany jako `maxFeePerGas`. Aby transakcja została wykonana, opłata maksymalna musi przekraczać sumę opłaty podstawowej i opłaty priorytetowej. Nadawcy transakcji zwracana jest różnica między opłatą maksymalną a sumą opłaty podstawowej i opłaty priorytetowej.

### Rozmiar bloku {#block-size}

Każdy blok ma docelowy rozmiar równy połowie obecnego limitu gazu, ale rozmiar bloków będzie rósł lub malał zgodnie z zapotrzebowaniem sieci, aż do osiągnięcia limitu bloku (2x docelowy rozmiar bloku). Protokół osiąga równowagę średniego rozmiaru bloku na poziomie docelowym poprzez proces _tâtonnement_ (metoda prób i błędów). Oznacza to, że jeśli rozmiar bloku jest większy niż docelowy rozmiar bloku, protokół zwiększy opłatę podstawową dla następnego bloku. Podobnie, protokół zmniejszy opłatę podstawową, jeśli rozmiar bloku będzie mniejszy niż docelowy rozmiar bloku.

Kwota, o którą korygowana jest opłata podstawowa, jest proporcjonalna do tego, jak daleko obecny rozmiar bloku odbiega od celu. Jest to obliczenie liniowe od -12,5% dla pustego bloku, 0% przy rozmiarze docelowym, aż do +12,5% dla bloku osiągającego limit gazu. Limit gazu może z czasem ulegać wahaniom w oparciu o sygnalizację walidatorów, a także poprzez aktualizacje sieci. Możesz [zobaczyć zmiany limitu gazu w czasie tutaj](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Więcej o blokach](/developers/docs/blocks/)

### Obliczanie opłat za gaz w praktyce {#calculating-fees-in-practice}

Możesz wyraźnie określić, ile jesteś skłonny zapłacić za wykonanie swojej transakcji. Jednak większość dostawców portfeli automatycznie ustawi zalecaną opłatę transakcyjną (opłata podstawowa + zalecana opłata priorytetowa), aby zmniejszyć stopień skomplikowania dla swoich użytkowników.

## Dlaczego istnieją opłaty za gaz? {#why-do-gas-fees-exist}

Krótko mówiąc, opłaty za gaz pomagają utrzymać bezpieczeństwo sieci Ethereum. Wymagając opłaty za każde obliczenie wykonane w sieci, zapobiegamy spamowaniu sieci przez złych aktorów. Aby uniknąć przypadkowych lub wrogich nieskończonych pętli lub innych strat obliczeniowych w kodzie, każda transakcja musi mieć ustawiony limit liczby kroków obliczeniowych wykonania kodu, z których może skorzystać. Podstawową jednostką obliczeniową jest „gaz”.

Chociaż transakcja zawiera limit, każdy gaz niewykorzystany w transakcji jest zwracany użytkownikowi (np. zwracane jest `max fee - (base fee + tip)`).

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Diagram zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Czym jest limit gazu? {#what-is-gas-limit}

Limit gazu odnosi się do maksymalnej ilości gazu, jaką jesteś skłonny zużyć na transakcję. Bardziej skomplikowane transakcje obejmujące [inteligentne kontrakty](/developers/docs/smart-contracts/) wymagają więcej pracy obliczeniowej, więc wymagają wyższego limitu gazu niż prosta płatność. Standardowy transfer ETH wymaga limitu gazu w wysokości 21 000 jednostek gazu.

Na przykład, jeśli ustawisz limit gazu na 50 000 dla prostego transferu ETH, EVM zużyje 21 000, a Ty odzyskasz pozostałe 29 000. Jeśli jednak określisz zbyt mało gazu, na przykład limit gazu wynoszący 20 000 dla prostego transferu ETH, transakcja nie powiedzie się w fazie walidacji. Zostanie odrzucona przed włączeniem do bloku i żaden gaz nie zostanie zużyty. Z drugiej strony, jeśli w trakcie wykonywania transakcji zabraknie gazu (np. inteligentny kontrakt zużyje cały gaz w połowie), EVM wycofa wszelkie zmiany, ale cały dostarczony gaz i tak zostanie zużyty na wykonaną pracę.

## Dlaczego opłaty za gaz mogą być tak wysokie? {#why-can-gas-fees-get-so-high}

Wysokie opłaty za gaz wynikają z popularności Ethereum. Jeśli popyt jest zbyt duży, użytkownicy muszą oferować wyższe kwoty opłaty priorytetowej, aby spróbować przelicytować transakcje innych użytkowników. Wyższa opłata priorytetowa może zwiększyć prawdopodobieństwo, że Twoja transakcja trafi do następnego bloku. Ponadto bardziej złożone aplikacje inteligentnych kontraktów mogą wykonywać wiele operacji w celu obsługi swoich funkcji, co sprawia, że zużywają dużo gazu.

## Inicjatywy mające na celu obniżenie kosztów gazu {#initiatives-to-reduce-gas-costs}

[Aktualizacje skalowalności](/roadmap/) Ethereum powinny ostatecznie rozwiązać niektóre problemy z opłatami za gaz, co z kolei umożliwi platformie przetwarzanie tysięcy transakcji na sekundę i globalne skalowanie.

Skalowanie warstwy 2 (L2) to główna inicjatywa mająca na celu znaczne obniżenie kosztów gazu, poprawę doświadczeń użytkowników i skalowalności.

[Więcej o skalowaniu warstwy 2 (L2)](/developers/docs/scaling/#layer-2-scaling)

## Monitorowanie opłat za gaz {#monitoring-gas-fees}

Jeśli chcesz monitorować ceny gazu, aby móc wysyłać swoje ETH taniej, możesz skorzystać z wielu różnych narzędzi, takich jak:

- [Etherscan](https://etherscan.io/gastracker) _Estymator ceny gazu transakcji_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Estymator ceny gazu transakcji typu open source_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Monitoruj i śledź ceny gazu w Ethereum oraz L2, aby obniżyć opłaty transakcyjne i zaoszczędzić pieniądze_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Rozszerzenie do przeglądarki Chrome szacujące gaz, obsługujące zarówno starsze transakcje typu 0, jak i transakcje typu 2 EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Obliczaj opłaty za gaz w lokalnej walucie dla różnych typów transakcji w Sieci głównej, Arbitrum i Polygon._

## Powiązane narzędzia {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API do szacowania gazu zasilane przez globalną platformę danych mempool firmy Blocknative_
- [Gas Network](https://gas.network) Wyrocznie gazu onchain. Obsługa ponad 35 sieci. 

## Dalsza lektura {#further-reading}

- [Wyjaśnienie gazu w Ethereum](https://defiprime.com/gas)
- [Zmniejszanie zużycia gazu przez Twoje inteligentne kontrakty](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Strategie optymalizacji gazu dla deweloperów](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Dokumentacja EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Zasoby Tima Beiko dotyczące EIP-1559](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Oddzielanie mechanizmów od memów](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)