---
title: Adresy sieciowe
description: Wprowadzenie do adresów sieciowych.
lang: pl
sidebarDepth: 2
---

Węzły Ethereum muszą identyfikować się za pomocą pewnych podstawowych informacji, aby połączyć się z innymi węzłami. Aby zapewnić, że każdy potencjalny rówieśnik może zinterpretować te informacje, są one przekazywane w jednym z trzech standardów formatów, które każdy węzeł Ethereum może zrozumieć: multiaddr, enode lub Ethereum Node Records (ENR). ENR są obecnym standardem dla adresów sieciowych Ethereum.

## Wymagania wstępne {#prerequisites}

Zrozumienie tej strony wymaga pewnej wiedzy na temat [warstwy sieciowej](/developers/docs/networking-layer/) Ethereum.

## Multiaddr {#multiaddr}

Oryginalnym formatem adresu węzła Ethereum był „multiaddr” (skrót od „multi-addresses”). Multiaddr to uniwersalny format zaprojektowany dla sieci peer-to-peer. Adresy są reprezentowane jako pary klucz-wartość z kluczami oraz wartościami oddzielonymi ukośnikiem. Na przykład multiaddr dla węzła z adresem IPv4 192.168.22.27 nasłuchującego na porcie TCP 33000 wygląda następująco:

`/ip4/192.168.22.27/tcp/33000`

W przypadku węzła Ethereum multiaddr zawiera identyfikator węzła (hash jego klucza publicznego):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode to sposób identyfikacji węzła Ethereum przy użyciu formatu adresu URL. Szesnastkowy identyfikator węzła jest zakodowany w części adresu URL przeznaczonej na nazwę użytkownika, oddzielony od hosta za pomocą znaku @. Nazwa hosta może zostać podana tylko jako adres IP; nazwy DNS nie są dozwolone. Port w sekcji nazwy hosta jest portem nasłuchującym TCP. Jeśli porty TCP i UDP (odkrywania) różnią się, port UDP jest określany jako parametr zapytania "discport".

W poniższym przykładzie adres URL węzła opisuje węzeł o adresie IP 10.3.58.6, porcie TCP 30303 i porcie odkrywania UDP 30301.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Rekordy węzłów Ethereum (ENR) {#enr}

Ethereum Node Records (ENR) to ustandaryzowany format dla adresów sieci w Ethereum. Zastępuje on mulltiaddr i enode. Jest on wyjątkowo przydatny, ponieważ umożliwia na większą wymianę informacji pomiędzy węzłami. ENR zawiera podpis, numer sekwencyjny i pola określające schemat tożsamości wykorzystywany do tworzenia i walidacji podpisów. ENR może również zostać wypełniony dowolnymi danymi zorganizowanymi w pary klucz-wartość. Te pary klucz-wartość zawierają adres IP węzła oraz informacje o podprotokołach, z których węzeł może korzystać. Klienci konsensusu używają [specyficznej struktury ENR](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) do identyfikowania węzłów rozruchowych, a także zawierają pole `eth2` zawierające informacje na temat bieżącego forka Ethereum oraz podsieci plotkującej do poświadczeń (łączy to węzeł z określonym zestawem peerów, których poświadczenia są razem agregowane).

## Dalsza lektura {#further-reading}

- [EIP-778: Rekordy węzłów Ethereum (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
