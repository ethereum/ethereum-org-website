---
title: Gaz i opłaty
metaTitle: "Opłaty i gaz w Ethereum: przegląd techniczny"
description: Dowiedz się więcej o opłatach gazowych Ethereum, jak są obliczane oraz o ich roli w bezpieczeństwie sieci i przetwarzaniu transakcji.
lang: pl
---

Gaz ma kluczowe znaczenie dla sieci Ethereum. To jest paliwo, które pozwala mu działać w taki sam sposób, jak samochód potrzebuje benzyny.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o [transakcjach](/developers/docs/transactions/) i [EVM](/developers/docs/evm/).

## Czym jest gaz? {#what-is-gas}

Gaz odnosi się do jednostki, która mierzy ilość wysiłku obliczeniowego wymaganego do wykonania określonych operacji w sieci Ethereum.

Skoro każda transakcja Ethereum wymaga zasobów obliczeniowych do wykonania, te zasoby należy opłacić, aby mieć pewność, że Ethereum nie jest podatne na spam i nie może utknąć w nieskończonych pętlach obliczeniowych. Płatność za obliczenia odbywa się w formie opłaty za gaz.

Opłata za gaz to **ilość gazu zużytego do wykonania operacji, pomnożona przez koszt jednostki gazu**. Opłata jest pobierana niezależnie od tego, czy transakcja się powiedzie, czy nie.

![Diagram pokazujący, gdzie potrzebny jest gaz w operacjach EVM](./gas.png)
_Diagram zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Opłaty za gaz należy uiszczać w natywnej walucie Ethereum, jaką jest ether (ETH). Ceny gazu są zwykle podawane w gwei, który jest jednostką ETH. Każdy gwei jest równy jednej miliardowej ETH (0,000000001 ETH lub 10<sup>-9</sup> ETH).

Na przykład zamiast mówić, że Twój gaz kosztuje 0,000000001 ethera, możesz powiedzieć, że Twój gaz kosztuje 1 gwei.

Słowo „gwei” jest skrótem od „giga-wei”, które oznacza „miliard wei”. Jeden gwei jest równy jednemu miliardowi wei. Sam Wei (nazwany na cześć [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), twórcy [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) jest najmniejszą jednostką ETH.

## Jak naliczane są opłaty za gaz? {#how-are-gas-fees-calculated}

Możesz ustawić ilość gazu, którą chcesz zapłacić podczas przesyłania transakcji. Oferując pewną ilość gazu, tak naprawdę licytujesz swoją transakcję, aby była ona uwzględniona w następnym bloku. Jeśli zaoferujesz zbyt mało, to mniej prawdopodobne jest, że walidatory uwzględnią Twoją transakcję, co oznacza, że może ona zostać wykonana z opóźnieniem albo wcale. Jeśli zaoferujesz zbyt dużo, możesz zmarnować trochę ETH. A więc skąd wiedzieć, ile trzeba zapłacić?

Całkowity gaz, który płacisz, dzieli się na dwa składniki: `podstawową opłatę` i `opłatę priorytetową` (napiwek).

`Podstawowa opłata` jest ustalana przez protokół — musisz zapłacić co najmniej tę kwotę, aby Twoja transakcja została uznana za ważną. `Opłata priorytetowa` to napiwek, który dodajesz do podstawowej opłaty, aby Twoja transakcja stała się atrakcyjna dla walidatorów, dzięki czemu wybiorą ją do włączenia w następnym bloku.

Transakcja, która opłaca tylko `podstawową opłatę`, jest technicznie ważna, ale jest mało prawdopodobne, że zostanie uwzględniona, ponieważ nie oferuje walidatorom żadnej zachęty do wybrania jej ponad jakąkolwiek inną transakcję. „Prawidłowa” `opłata priorytetowa` jest określana przez wykorzystanie sieci w momencie wysyłania transakcji — jeśli jest duże zapotrzebowanie, być może będziesz musiał ustawić `opłatę priorytetową` wyżej, ale gdy zapotrzebowanie jest mniejsze, możesz zapłacić mniej.

Załóżmy na przykład, że Jordan chce zapłacić Taylor 1 ETH. Transfer ETH wymaga 21 000 jednostek gazu, a opłata bazowa wynosi 10 gwei. Jordan dodaje napiwek w wysokości 2 gwei.

Całkowita opłata wynosiłaby teraz:

`jednostki zużytego gazu * (opłata podstawowa + opłata priorytetowa)`

gdzie `podstawowa opłata` to wartość ustalana przez protokół, a `opłata priorytetowa` to wartość ustalana przez użytkownika jako napiwek dla walidatora.

np. `21 000 * (10 + 2) = 252 000 gwei` (0,000252 ETH).

Kiedy Jordan wyśle pieniądze, to z jego kontra zostanie pobrana kwota w wysokości 1,000252 ETH. Taylor otrzyma 1,0000 ETH. Walidator otrzyma napiwek w wysokości 0,000042 ETH. `Podstawowa opłata` w wysokości 0,00021 ETH jest spalana.

### Podstawowa opłata {#base-fee}

Każdy blok ma opłatę podstawową, która działa jako cena rezerwowa. Aby się zakwalifikować na uwzględnienie w bloku, oferowana kwota za gaz musi być co najmniej równa opłacie podstawowej. Podstawowa opłata jest obliczana niezależnie od bieżącego bloku i jest zamiast tego określana przez bloki go poprzedzające, co sprawia, że opłaty transakcyjne są bardziej przewidywalne dla użytkowników. Gdy blok jest tworzony, ta **podstawowa opłata jest „spalana”**, co usuwa ją z obiegu.

Podstawowa opłata jest obliczana za pomocą wzoru, który porównuje rozmiar poprzedniego bloku (ilość gazu zużytego na wszystkie transakcje) z rozmiarem docelowym (połowa limitu gazu). Podstawowa opłata wzrośnie lub spadnie o maksymalnie 12,5% na blok, jeśli docelowy rozmiar bloku będzie odpowiednio powyżej lub poniżej celu. Ten rosnący wzrost sprawia, że utrzymanie dużego rozmiaru bloku w nieskończoność jest ekonomicznie nieopłacalne.

| Numer bloku | Ilość gazu | Wzrost opłaty | Obecna opłata podstawowa |
| ----------- | ---------: | ------------: | -----------------------: |
| 1           |     18 mln |            0% |                 100 gwei |
| 2           |     36 mln |            0% |                 100 gwei |
| 3           |     36 mln |         12,5% |               112,5 gwei |
| 4           |     36 mln |         12,5% |               126,6 gwei |
| 5           |     36 mln |         12,5% |               142,4 gwei |
| 6           |     36 mln |         12,5% |               160,2 gwei |
| 7           |     36 mln |         12,5% |               180,2 gwei |
| 8           |     36 mln |         12,5% |               202,7 gwei |

W powyższej tabeli przedstawiono przykład z użyciem 36 milionów jako limitu gazu. Zgodnie z tym przykładem, aby utworzyć transakcję w bloku numer 9, portfel poinformuje użytkownika z całą pewnością, że **maksymalna podstawowa opłata**, która zostanie dodana do następnego bloku, wynosi `bieżąca podstawowa opłata * 112,5%` lub `202,7 gwei * 112,5% = 228,1 gwei`.

Ważne jest również, aby pamiętać, że mało prawdopodobne jest to, abyśmy ujrzeli wydłużone wzrosty pełnych bloków ze względu na szybkość, z jaką podstawowa opłata wzrasta przed pełnym blokiem.

| Numer bloku                                         |                                          Ilość gazu | Wzrost opłaty |                            Obecna opłata podstawowa |
| --------------------------------------------------- | --------------------------------------------------: | ------------: | --------------------------------------------------: |
| 30                                                  |                                              36 mln |         12,5% |                                         2705,6 gwei |
| ... | ... |         12,5% | ... |
| 50                                                  |                                              36 mln |         12,5% |                                        28531,3 gwei |
| ... | ... |         12,5% | ... |
| 100                                                 |                                              36 mln |         12,5% |                                     10302608,6 gwei |

### Opłata priorytetowa (napiwki) {#priority-fee}

Opłata priorytetowa (napiwek) motywuje walidatorów do maksymalizacji liczby transakcji w bloku, ograniczona jedynie limitem gazu bloku. Bez napiwków racjonalny walidator mógłby włączyć mniej transakcji — lub nawet zero — bez żadnej bezpośredniej kary na warstwie wykonawczej lub warstwie konsensusu, ponieważ nagrody za staking są niezależne od liczby transakcji w bloku. Dodatkowo, napiwki pozwalają użytkownikom przebijać oferty innych w celu uzyskania pierwszeństwa w tym samym bloku, skutecznie sygnalizując pilność.

### Maksymalna opłata {#maxfee}

Aby wykonać transakcję w sieci, użytkownicy mogą określić maksymalny limit, jaki chcą zapłacić za wykonanie swojej transakcji. Ten opcjonalny parametr jest znany jako `maxFeePerGas`. Żeby transakcja została wykonana, maksymalna opłata musi przewyższać sumę opłaty podstawowej i napiwku. Nadawca transakcji otrzymuje zwrot różnicy między maksymalną opłatą a sumą opłaty podstawowej i napiwku.

### Rozmiar bloku {#block-size}

Każdy blok ma docelowy rozmiar równy połowie bieżącego limitu gazu, ale rozmiar bloków będzie się zwiększał lub zmniejszał w zależności od zapotrzebowania sieci, aż do osiągnięcia limitu bloku (2x docelowy rozmiar bloku). Protokół osiąga średni rozmiar bloku w równowadze na poziomie docelowym poprzez proces _tâtonnement_. Oznacza to, że jeśli rozmiar bloku jest większy niż docelowy rozmiar bloku, protokół zwiększy opłatę podstawową dla kolejnego bloku. Podobnie również protokół zmniejszy opłatę podstawową, jeśli rozmiar bloku jest mniejszy niż docelowy rozmiar bloku.

Kwotą, o jaką opłata podstawowa zostaje dostosowana, jest proporcjonalna do tego, jak daleko aktualny rozmiar bloku znajduje się od tego docelowego. Jest to liniowe obliczenie od -12,5% dla pustego bloku, 0% przy rozmiarze docelowym, do +12,5% dla bloku osiągającego limit gazu. Limit gazu może z czasem ulegać wahaniom w zależności od sygnałów walidatorów, a także poprzez aktualizacje sieci. Możesz [zobaczyć zmiany w limicie gazu w czasie tutaj](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Więcej o blokach](/developers/docs/blocks/)

### Obliczanie opłat za gaz w praktyce {#calculating-fees-in-practice}

Możesz jasno określić, ile jesteś w stanie zapłacić za wykonanie transakcji. Jednak większość dostawców portfeli automatycznie ustawi zalecaną opłatę transakcyjną (opłata podstawowa + zalecana opłata priorytetowa), aby ułatwić użytkowanie.

## Dlaczego istnieją opłaty za gaz? {#why-do-gas-fees-exist}

Krótko mówiąc, opłaty za gaz pomagają utrzymać bezpieczeństwo sieci Ethereum. Wymagając opłaty za każde obliczenie wykonane w sieci, zapobiegamy jej spamowaniu przez złośliwe podmioty. Aby uniknąć przypadkowym lub wrogim nieskończonym pętlom lub innym stratom obliczeniowym w kodzie, każda transakcja musi ustawić limit kroków obliczeniowych wykonania kodu, których może użyć. Podstawową jednostką obliczeniową jest „gaz”.

Chociaż transakcja zawiera limit, każdy niewykorzystany gaz w transakcji jest zwracany użytkownikowi (np. zwracane jest `maksymalna opłata - (podstawowa opłata + napiwek)`).

![Diagram pokazujący, jak zwracany jest niewykorzystany gaz](../transactions/gas-tx.png)
_Diagram zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Czym jest limit gazu? {#what-is-gas-limit}

Limit gazu odnosi się do maksymalnej ilości gazu, jaką jesteś w stanie zużyć na transakcję. Bardziej skomplikowane transakcje z udziałem [inteligentnych kontraktów](/developers/docs/smart-contracts/) wymagają więcej pracy obliczeniowej, więc wymagają wyższego limitu gazu niż prosta płatność. Zwykły transfer ETH wymaga limitu gazu w wysokości 21 000 jednostek gazu.

Na przykład jeśli ustawisz limit gazu na 50 000 dla zwykłego transferu ETH, EVM zużyje 21 000, a pozostałe 29 000 otrzymasz z powrotem. Jeśli jednak wyznaczysz zbyt małą ilość gazu, na przykład limit 20000 dla prostego transferu ETH, transakcja nie powiedzie się w fazie walidowania. Zostanie odrzucona przed dodaniem do bloku, w wyniku czego gaz nie zostanie zużyty. Z drugiej strony, jeśli transakcja wyczerpie limit gazu w trakcie działania (np. inteligentny kontrakt zużyje cały gaz w połowie drogi), EVM anuluje wszystkie zmiany, ale cały wyznaczony gaz zostanie zużyty w zamian za wykonaną pracę.

## Dlaczego opłaty za gaz są tak wysokie? {#why-can-gas-fees-get-so-high}

Opłaty za gaz są wysokie ze względu na popularność Ethereum. Jeśli zapotrzebowanie jest zbyt duże, to użytkownicy muszą oferować większe napiwki, aby przelicytować transakcje innych użytkowników. Większy napiwek może zwiększyć prawdopodobieństwo, że Twoja transakcja trafi do następnego bloku. Ponadto bardziej złożone aplikacje inteligentnych kontraktów mogą wykonywać wiele operacji do obsługi swoich funkcji, przez co zużywają dużo gazu.

## Inicjatywy mające na celu zmniejszenie kosztów gazu {#initiatives-to-reduce-gas-costs}

[Aktualizacje skalowalności](/roadmap/) Ethereum powinny ostatecznie rozwiązać niektóre z problemów związanych z opłatami za gaz, co z kolei umożliwi platformie przetwarzanie tysięcy transakcji na sekundę i skalowanie na całym świecie.

Skalowanie warstwy 2 jest główną inicjatywą mająca na celu poprawę kosztów gazu, doświadczenia użytkownika oraz skalowalności.

[Więcej o skalowaniu warstwy 2](/developers/docs/scaling/#layer-2-scaling)

## Monitorowanie opłat za gaz {#monitoring-gas-fees}

Jeśli chcesz monitorować ceny gazu, aby taniej wysłać swoje ETH, możesz skorzystać z wielu różnych narzędzi, takich jak:

- [Etherscan](https://etherscan.io/gastracker) _Narzędzie do szacowania ceny gazu transakcyjnego_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Narzędzie open source do szacowania ceny gazu transakcyjnego_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Monitoruj i śledź ceny gazu Ethereum i L2, aby zmniejszyć opłaty transakcyjne i oszczędzać pieniądze_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Rozszerzenie do Chrome szacujące opłaty za gaz, obsługujące zarówno transakcje starszego typu (Typ 0), jak i transakcje EIP-1559 (Typ 2)._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Obliczaj opłaty za gaz w swojej lokalnej walucie dla różnych typów transakcji w sieciach Mainnet, Arbitrum i Polygon._

## Powiązane narzędzia {#related-tools}

- [Platforma gazowa Blocknative](https://www.blocknative.com/gas) _API do szacowania opłat za gaz, zasilane przez globalną platformę danych mempool firmy Blocknative_
- [Gas Network](https://gas.network) Wyrocznie gazu on-chain. Wsparcie dla ponad 35 łańcuchów.

## Dalsza lektura {#further-reading}

- [Wyjaśnienie gazu w Ethereum](https://defiprime.com/gas)
- [Zmniejszanie zużycia gazu przez Twoje inteligentne kontrakty](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Strategie optymalizacji gazu dla deweloperów](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Dokumentacja EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Zasoby EIP-1559 Tima Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: oddzielanie mechanizmów od memów](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
