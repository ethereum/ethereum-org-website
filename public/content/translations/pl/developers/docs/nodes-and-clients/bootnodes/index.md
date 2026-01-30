---
title: Wprowadzenie do węzłów rozruchowych Ethereum
description: Podstawowe informacje, których potrzebujesz, aby zrozumieć węzły rozruchowe
lang: pl
---

Kiedy nowy węzeł dołącza do sieci Ethereum, to potrzebuje on połączyć się z węzłami, które już są w sieci, aby móc odkryć nowych rówieśników. Te punkty wejścia do sieci Ethereum są nazywane węzłami rozruchowymi. Klienty zazwyczaj mają zakodowaną w siebie listę węzłów rozruchowych. Te węzły rozruchowe są zazwyczaj uruchamiane przez zespół DevOps Fundacji Ethereum lub zespoły samych klientów. Należy zapamiętać, że węzły rozruchowe nie tym samym co węzły statyczne. Węzły statyczne są w kółko wywoływane, podczas gdy węzły rozruchowe są wywoływane, tylko gdy nie ma wystarczającej ilości rówieśników, do których można się podłączyć lub gdy węzeł potrzebuje utworzyć trochę nowych połączeń.

## Połącz z węzłem rozruchowym {#connect-to-a-bootnode}

Większość klientów ma wbudowaną listę węzłów rozruchowych, ale możesz również uruchomić własny węzeł rozruchowy lub użyć takiego, który nie znajduje się na zakodowanej na stałe liście klienta. W takim przypadku możesz określić je podczas uruchamiania swojego klienta w następujący sposób (ten przykład jest dla Geth, sprawdź dokumentację swojego klienta po więcej informacji):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Uruchom węzeł rozruchowy {#run-a-bootnode}

Węzły rozruchowe to pełne węzły, które nie znajdują się za NAT ([translacja adresów sieciowych](https://www.geeksforgeeks.org/network-address-translation-nat/)). Każdy pełny węzeł może zachowywać się jak węzeł rozruchowy, dopóki jest publicznie dostępny.

Po uruchomieniu węzła powinien on zarejestrować Twój [enode](/developers/docs/networking-layer/network-addresses/#enode), który jest publicznym identyfikatorem pozwalającym innym na połączenie się z Twoim węzłem.

Ten enode jest zazwyczaj generowany po każdym restarcie, a więc upewnij się, aby znaleźć w dokumentacji swojego klienta to, w jaki sposób stworzyć stały enode dla Twojego węzła rozruchowego.

Aby być dobrym węzłem rozruchowym, dobrym pomysłem jest zwiększenie maksymalnej liczby rówieśników, którzy mogą się z nim połączyć. Uruchamianie węzła rozruchowego z wieloma rówieśnikami znacznie zwiększy wymagania przepustowości.

## Dostępne węzły rozruchowe {#available-bootnodes}

Lista wbudowanych węzłów rozruchowych w go-ethereum znajduje się [tutaj](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Te węzły rozruchowe są utrzymywane przez Fundację Ethereum oraz zespół go-ethereum.

Dostępne są również inne listy węzłów rozruchowych utrzymywanych przez wolontariuszy. Upewnij się, aby zawsze uwzględnić przynajmniej jeden oficjalny węzeł rozruchowy, inaczej może Cię dotknąć atak zaćmienia (atak, w którym złośliwy podmiot odizolowuje określonego użytkownika lub węzeł od reszty sieci peer-to-peer).
