---
title: Adresy sieciowe
description: "Wprowadzenie do adresów sieciowych."
lang: pl
sidebarDepth: 2
---

Węzły [Ethereum](/) muszą identyfikować się za pomocą podstawowych informacji, aby łączyć się z węzłami równorzędnymi. Aby upewnić się, że każdy potencjalny węzeł równorzędny może zinterpretować te informacje, są one przekazywane w jednym z trzech ustandaryzowanych formatów, które każdy węzeł Ethereum może zrozumieć: multiaddr, enode lub Ethereum Node Records (ENR). ENR to obecny standard dla adresów sieciowych Ethereum.

## Wymagania wstępne {#prerequisites}

Do zrozumienia tej strony wymagane jest pewne zrozumienie [warstwy sieciowej](/developers/docs/networking-layer/) Ethereum.

## Multiaddr {#multiaddr}

Pierwotnym formatem adresu węzła Ethereum był „multiaddr” (skrót od „multi-addresses”). Multiaddr to uniwersalny format zaprojektowany dla sieci peer-to-peer. Adresy są reprezentowane jako pary klucz-wartość, gdzie klucze i wartości są oddzielone ukośnikiem. Na przykład multiaddr dla węzła z adresem IPv4 `192.168.22.27` nasłuchującego na porcie TCP `33000` wygląda następująco:

`/ip4/192.168.22.27/tcp/33000`

W przypadku węzła Ethereum, multiaddr zawiera identyfikator węzła (node-ID, czyli hash jego klucza publicznego):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode to sposób identyfikacji węzła Ethereum przy użyciu formatu adresu URL. Szesnastkowy identyfikator węzła (node-ID) jest zakodowany w części URL odpowiadającej nazwie użytkownika, oddzielonej od hosta znakiem @. Nazwa hosta może być podana tylko jako adres IP; nazwy DNS nie są dozwolone. Port w sekcji nazwy hosta to port nasłuchiwania TCP. Jeśli porty TCP i UDP (odkrywanie) różnią się, port UDP jest określany jako parametr zapytania „discport”.

W poniższym przykładzie adres URL węzła opisuje węzeł z adresem IP `10.3.58.6`, portem TCP `30303` i portem odkrywania UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Node Records (ENR) {#enr}

Ethereum Node Records (ENR) to ustandaryzowany format adresów sieciowych w Ethereum. Zastępują one multiaddr i enode. Są one szczególnie przydatne, ponieważ pozwalają na większą wymianę informacji między węzłami. ENR zawiera podpis, numer sekwencyjny oraz pola szczegółowo opisujące schemat tożsamości używany do generowania i walidacji podpisów. ENR może być również wypełniony dowolnymi danymi zorganizowanymi jako pary klucz-wartość. Te pary klucz-wartość zawierają adres IP węzła oraz informacje o podprotokołach, z których węzeł może korzystać. Klienci konsensusu używają [określonej struktury ENR](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) do identyfikacji węzłów rozruchowych (boot nodes), a także zawierają pole `eth2` z informacjami o obecnym rozwidleniu Ethereum i podsieci plotkowania poświadczeń (attestation gossip subnet) (łączy to węzeł z określoną grupą węzłów równorzędnych, których poświadczenia są ze sobą agregowane).

## Dalsza lektura {#further-reading}

- [EIP-778: Ethereum Node Records (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [libp2p: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)