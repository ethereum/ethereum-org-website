---
title: Gaz i opłaty
description:
lang: pl
---

Gaz ma kluczowe znaczenie dla sieci Ethereum. To jest paliwo, które pozwala mu działać w taki sam sposób, jak samochód potrzebuje benzyny.

## Warunki wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytanie informacji na temat [transakcji](/developers/docs/transactions/) i [EVM](/developers/docs/evm/).

## Co to jest gaz? {#what-is-gas}

Gaz odnosi się do jednostki, która mierzy ilość wysiłku obliczeniowego wymaganego do wykonania określonych operacji w sieci Ethereum.

Skoro każda transakcja Ethereum wymaga zasobów obliczeniowych do wykonania, te zasoby należy opłacić, aby mieć pewność, że Ethereum nie jest podatne na spam i nie może utknąć w nieskończonych pętlach obliczeniowych. Płatność za obliczenia odbywa się w formie opłaty za gaz.

Opłata za gaz to ** ilość zużytego gazu potrzebnego do wykonania jakiejś operacji, pomnożona przez koszt jednostkowy gazu**. Opłata jest pobierana niezależnie od tego, czy transakcja się powiedzie, czy nie.

![Schemat pokazujący, gdzie potrzebny jest nam gaz dla operacji EVM](./gas.png) _Schemat zaadaptowany z [zilustrowane EVM Ethereum](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Opłaty za gaz należy uiszczać w natywnej walucie Ethereum, jaką jest ether (ETH). Ceny gazu są zwykle podawane w gwei, który jest jednostką ETH. Każdy gwei jest równy jednej miliardowej ETH (0,000000001 ETH lub 10<sup>-9</sup> ETH).

Na przykład zamiast mówić, że Twój gaz kosztuje 0,000000001 ethera, możesz powiedzieć, że Twój gaz kosztuje 1 gwei.

Słowo „gwei” jest skrótem od „giga-wei”, które oznacza „miliard wei”. Jeden gwei jest równy jednemu miliardowi wei. Samo wei (nazwane na cześć [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), twórcy tzw. [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) jest najmniejszą jednostką ETH.

## Jak naliczane są opłaty za gaz? {#how-are-gas-fees-calculated}

Możesz ustawić ilość gazu, którą chcesz zapłacić podczas przesyłania transakcji. Oferując pewną ilość gazu, tak naprawdę licytujesz swoją transakcję, aby była ona uwzględniona w następnym bloku. Jeśli zaoferujesz zbyt mało, to mniej prawdopodobne jest, że walidatory uwzględnią Twoją transakcję, co oznacza, że może ona zostać wykonana z opóźnieniem albo wcale. Jeśli zaoferujesz zbyt dużo, możesz zmarnować trochę ETH. A więc skąd wiedzieć, ile trzeba zapłacić?

Całkowity gaz, który musisz zapłacić, dzieli się na dwie części: `opłatę podstawową` oraz `opłatę priorytetową ` (napiwek).

Ta pierwsza, czyli `opłata podstawowa`, jest ustalana przez protokół — jest to minimalna kwota, jaką musisz zapłacić, aby Twoja transakcja została uznana za ważną. Natomiast `opłata priorytetowa` to napiwek, który dodajesz do podstawowej opłaty, aby uczynić transakcję atrakcyjniejszą dla walidatorów, tak aby uwzględnili ją w następnym bloku.

Transakcja, która płaci tylko `opłatę podstawową` jest technicznie ważną, ale mało prawdopodobne jest to, że zostanie uwzględniona, ponieważ nie zachęca w ogóle walidatorów do wybrania jej pośród innych transakcji. „Prawidłowa” opłata `priorytetowa` jest określana na podstawie wykorzystania sieci w czasie, w którym próbujesz wysłać swoją transakcję — jeśli zapotrzebowanie jest duże, to najprawdopodobniej będzie wymagane zwiększenie opłaty `priorytetowej`, ale gdy zapotrzebowanie jest mniejsze, możesz zapłacić mniej.

Załóżmy na przykład, że Jordan chce zapłacić Taylor 1 ETH. Transfer ETH wymaga 21 000 jednostek gazu, a opłata bazowa wynosi 10 gwei. Jordan dodaje napiwek w wysokości 2 gwei.

Całkowita opłata wynosiłaby teraz:

`jednostki zużytego gazu * (opłata podstawowa + opłata priorytetowa)`

gdzie `opłata podstawowa` jest wartością ustalaną przez protokół, a `opłata priorytetowa` jest wartością ustalaną przez użytkownika jako napiwek dla walidatora.

Czyli `21 000 * (10 + 2) = 252 000 gwei` (0,000252 ETH).

Kiedy Jordan wyśle pieniądze, to z jego kontra zostanie pobrana kwota w wysokości 1,000252 ETH. Taylor otrzyma 1,0000 ETH. Walidator otrzyma napiwek w wysokości 0,000042 ETH. `Opłata podstawowa` w wysokości 0,00021 ETH zostanie spalona.

### Opłata podstawowa {#base-fee}

Każdy blok ma opłatę podstawową, która działa jako cena rezerwowa. Aby się zakwalifikować na uwzględnienie w bloku, oferowana kwota za gaz musi być co najmniej równa opłacie podstawowej. Opłata podstawowa jest obliczana niezależnie od obecnego bloku, a zamiast tego determinują ją bloki poprzedzające — co sprawia, że opłaty transakcyjne są bardziej przewidywalne dla użytkowników. Kiedy blok zostaje stworzony, ta **opłata podstawowa zostaje „spalona”**, co usuwa ją z obiegu.

Opłata podstawowa obliczana jest na podstawie wzoru, który porównuje wielkość poprzedniego bloku (ilość gazu wykorzystanego na wszystkie transakcje) z docelowym rozmiarem. Opłata ta wzrośnie maksymalnie o 12,5% na blok, jeśli docelowy rozmiar bloku zostanie przekroczony. Ten rosnący wzrost sprawia, że utrzymanie dużego rozmiaru bloku w nieskończoność jest ekonomicznie nieopłacalne.

| Numer bloku | Ilość gazu | Wzrost opłaty | Obecna opłata podstawowa |
| ----------- | ----------:| -------------:| ------------------------:|
| 1           |     15 mln |            0% |                 100 gwei |
| 2           |     30 mln |            0% |                 100 gwei |
| 3           |     30 mln |         12,5% |               112,5 gwei |
| 4           |     30 mln |         12,5% |               126,6 gwei |
| 5           |     30 mln |         12,5% |               142,4 gwei |
| 6           |     30 mln |         12,5% |               160,2 gwei |
| 7           |     30 mln |         12,5% |               180,2 gwei |
| 8           |     30 mln |         12,5% |               202,7 gwei |

Zgodnie z powyższą tabelą, aby stworzyć transakcję w bloku o numerze 9, portfel poinformuje użytkownika z pewnością, że **maksymalna opłata bazowa**, którą należy zapłacić, aby zostać dodanym do następnego bloku, wynosi `obecny base fee * 112,5%` lub `202,7 gwei * 112,5% = 228,1 gwei`.

Ważne jest również, aby pamiętać, że mało prawdopodobne jest to, abyśmy ujrzeli wydłużone wzrosty pełnych bloków ze względu na szybkość, z jaką podstawowa opłata wzrasta przed pełnym blokiem.

| Numer bloku | Ilość gazu | Wzrost opłaty | Obecna opłata podstawowa |
| ----------- | ----------:| -------------:| ------------------------:|
| 30          |     30 mln |         12,5% |              2705,6 gwei |
| ...         |        ... |         12,5% |                      ... |
| 50          |     30 mln |         12,5% |             28531,3 gwei |
| ...         |        ... |         12,5% |                      ... |
| 100         |     30 mln |         12,5% |          10302608,6 gwei |

### Opłata priorytetowa (napiwki) {#priority-fee}

Opłata priorytetowa (napiwek) zachęca walidatorów do uwzględnienia transakcji w bloku. Bez napiwków walidatorom opłacałoby się wydobywać puste bloki, ponieważ otrzymywaliby taką samą nagrodę za blok. Małe napiwki stanowią dla walidatorów minimalną zachętę do uwzględnienia transakcji. Aby transakcje były wykonywane przed innymi transakcjami w tym samym bloku, można dodać większy napiwek, aby spróbować przelicytować konkurencyjne transakcje.

### Maksymalna opłata {#maxfee}

Aby wykonać transakcję w sieci, użytkownicy mogą określić maksymalny limit, jaki chcą zapłacić za wykonanie swojej transakcji. Ten opcjonalny parametr jest zwany `maxFeePerGas`. Żeby transakcja została wykonana, maksymalna opłata musi przewyższać sumę opłaty podstawowej i napiwku. Nadawca transakcji otrzymuje zwrot różnicy między maksymalną opłatą a sumą opłaty podstawowej i napiwku.

### Rozmiar bloku {#block-size}

Każdy blok ma docelowy rozmiar 15 milionów gazu, ale rozmiar bloków będzie zwiększać się lub zmniejszać zgodnie z zapotrzebowaniem sieci, aż do limitu bloku wynoszącego 30 milionów gazu (dwukrotność docelowego rozmiaru bloku). Protokół osiąga zrównoważony rozmiar bloku wynoszący średnio 15 milionów poprzez proces nazywany _tâtonnement_. Oznacza to, że jeśli rozmiar bloku jest większy niż docelowy rozmiar bloku, protokół zwiększy opłatę podstawową dla kolejnego bloku. Podobnie również protokół zmniejszy opłatę podstawową, jeśli rozmiar bloku jest mniejszy niż docelowy rozmiar bloku. Kwotą, o jaką opłata podstawowa zostaje dostosowana, jest proporcjonalna do tego, jak daleko aktualny rozmiar bloku znajduje się od tego docelowego. [Więcej na temat bloków](/developers/docs/blocks/).

### Obliczanie opłat za gaz w praktyce {#calculating-fees-in-practice}

Możesz jasno określić, ile jesteś w stanie zapłacić za wykonanie transakcji. Jednak większość dostawców portfeli automatycznie ustawi zalecaną opłatę transakcyjną (opłata podstawowa + zalecana opłata priorytetowa), aby ułatwić użytkowanie.

## Dlaczego istnieją opłaty za gaz? {#why-do-gas-fees-exist}

Krótko mówiąc, opłaty za gaz pomagają utrzymać bezpieczeństwo sieci Ethereum. Wymagając opłaty za każde obliczenie wykonane w sieci, zapobiegamy jej spamowaniu przez złośliwe podmioty. Aby uniknąć przypadkowym lub wrogim nieskończonym pętlom lub innym stratom obliczeniowym w kodzie, każda transakcja musi ustawić limit kroków obliczeniowych wykonania kodu, których może użyć. Podstawową jednostką obliczeniową jest „gaz”.

Pomimo tego, że transakcja zawiera limit, gaz niewykorzystany w transakcji zostaje zwrócony użytkownikowi (zwrócona zostaje `opłata maksymalna - (opłata podstawowa + napiwek))`.

![Schemat pokazujący, w jaki sposób zwracany jest niewykorzystany gaz](../transactions/gas-tx.png) _Schemat zaadaptowany z [zilustrowane EVM Ethereum](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Czym jest limit gazu? {#what-is-gas-limit}

Limit gazu odnosi się do maksymalnej ilości gazu, jaką jesteś w stanie zużyć na transakcję. Bardziej skomplikowane transakcje wykorzystujące [inteligentne kontrakty](/developers/docs/smart-contracts/) wymagają więcej pracy obliczeniowej, a więc wymagają większego limitu gazu, niż zwykła płatność. Zwykły transfer ETH wymaga limitu gazu w wysokości 21 000 jednostek gazu.

Na przykład jeśli ustawisz limit gazu na 50 000 dla zwykłego transferu ETH, EVM zużyje 21 000, a pozostałe 29 000 otrzymasz z powrotem. Jeśli jednak ustawisz zbyt mało gazu, na przykład 20 000 dla zwykłego transferu ETH, to EVM zużyje te 20 000 jednostek gazu próbując zrealizować transakcję, ale nie zostanie ona zakończona. EVM następnie przywróci wszelkie zmiany, ale ponieważ walidator wykonał już pracę wartą 20 000 jednostek gazu, to zostaje on zużyty.

## Dlaczego opłaty za gaz są tak wysokie? {#why-can-gas-fees-get-so-high}

Opłaty za gaz są wysokie ze względu na popularność Ethereum. Jeśli zapotrzebowanie jest zbyt duże, to użytkownicy muszą oferować większe napiwki, aby przelicytować transakcje innych użytkowników. Większy napiwek może zwiększyć prawdopodobieństwo, że Twoja transakcja trafi do następnego bloku. Ponadto bardziej złożone aplikacje inteligentnych kontraktów mogą wykonywać wiele operacji do obsługi swoich funkcji, przez co zużywają dużo gazu.

## Inicjatywy mające na celu zmniejszenie kosztów gazu {#initiatives-to-reduce-gas-costs}

[Ulepszenia skalowalności](/roadmap/) Ethereum powinny ostatecznie rozwiązać niektóre problemy związane z opłatami za gaz, co z kolei umożliwi platformie przetwarzanie tysięcy transakcji na sekundę oraz skalowanie na skalę światową.

Skalowanie warstwy 2 jest główną inicjatywą mająca na celu poprawę kosztów gazu, doświadczenia użytkownika oraz skalowalności. [Więcej na temat skalowania warstwy 2](/developers/docs/scaling/#layer-2-scaling).

## Monitorowanie opłat za gaz {#monitoring-gas-fees}

Jeśli chcesz monitorować ceny gazu, aby taniej wysłać swoje ETH, możesz skorzystać z wielu różnych narzędzi, takich jak:

- [Etherscan](https://etherscan.io/gastracker) _Estymator cen gazu za transakcję_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Rozszerzenie przeglądarki Chrome do szacowania cen gazu wspierające zarówno starsze transakcje typu 0, jak i transakcje EIP-1559 typu 2._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Oblicz opłaty za gaz w swojej walucie dla różnych typów transakcji w sieci głównej, Arbitrum oraz na Polygon._

## Powiązane narzędzia {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API do szacowania cen gazu zasilany przez światową platformę danych puli pamięci (mempool) firmy Blocknative_

## Dalsza lektura {#further-reading}

- [Objaśnienia dotyczące gazu Ethereum](https://defiprime.com/gas)
- [Zmniejszanie zużycia gazu przez Twój inteligentny kontrakt](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Proof-of-stake kontra proof-of-work](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)
- [Strategie optymalizacji gazu dla deweloperów](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Dokumenty EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)
- [Zasoby EIP-1559 Tima Beiko](https://hackmd.io/@timbeiko/1559-resources)
