---
title: Wprowadzenie do węzłów rozruchowych Ethereum
description: Podstawowe informacje potrzebne do zrozumienia węzłów rozruchowych
lang: pl
---

Kiedy nowy węzeł dołącza do sieci Ethereum, musi połączyć się z węzłami, które już są w sieci, aby następnie odkryć nowych peerów. Te punkty wejścia do sieci Ethereum nazywane są węzłami rozruchowymi. Klienci zazwyczaj mają wbudowaną na stałe listę węzłów rozruchowych. Te węzły rozruchowe są zazwyczaj utrzymywane przez zespół devops Fundacji Ethereum lub same zespoły tworzące klientów. Należy pamiętać, że węzły rozruchowe to nie to samo co węzły statyczne. Z węzłami statycznymi łączymy się wielokrotnie, podczas gdy węzły rozruchowe są wywoływane tylko wtedy, gdy nie ma wystarczającej liczby peerów do połączenia i węzeł musi zainicjować nowe połączenia.

## Łączenie z węzłem rozruchowym {#connect-to-a-bootnode}

Większość klientów ma wbudowaną listę węzłów rozruchowych, ale możesz również chcieć uruchomić własny węzeł rozruchowy lub użyć takiego, który nie jest częścią wbudowanej listy klienta. W takim przypadku możesz je określić podczas uruchamiania klienta w następujący sposób (przykład dotyczy Geth, sprawdź dokumentację swojego klienta):

```
geth --bootnodes "enode://<ID węzła>@<adres IP>:<port>"
```

## Uruchamianie węzła rozruchowego {#run-a-bootnode}

Węzły rozruchowe to pełne węzły, które nie znajdują się za NAT-em ([Translacja adresów sieciowych](https://www.geeksforgeeks.org/network-address-translation-nat/)). Każdy pełny węzeł może pełnić rolę węzła rozruchowego, o ile jest publicznie dostępny.

Kiedy uruchamiasz węzeł, powinien on zapisać w logach twój [enode](/developers/docs/networking-layer/network-addresses/#enode), który jest publicznym identyfikatorem, jakiego inni mogą użyć do połączenia się z twoim węzłem.

Enode jest zazwyczaj generowany na nowo przy każdym restarcie, więc upewnij się, że sprawdziłeś w dokumentacji swojego klienta, jak wygenerować stały enode dla twojego węzła rozruchowego.

Aby być dobrym węzłem rozruchowym, warto zwiększyć maksymalną liczbę peerów, którzy mogą się z nim połączyć. Uruchomienie węzła rozruchowego z wieloma peerami znacznie zwiększy zapotrzebowanie na przepustowość łącza.

## Dostępne węzły rozruchowe {#available-bootnodes}

Listę wbudowanych węzłów rozruchowych w go-ethereum można znaleźć [tutaj](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Te węzły rozruchowe są utrzymywane przez Fundację Ethereum oraz zespół go-ethereum.

Dostępne są również inne listy węzłów rozruchowych utrzymywane przez wolontariuszy. Upewnij się, że zawsze uwzględniasz co najmniej jeden oficjalny węzeł rozruchowy, w przeciwnym razie możesz paść ofiarą ataku typu eclipse (eclipse attack).