---
title: Czym jest Wrapped Ether (WETH)
description: "Wprowadzenie do Wrapped Ether (WETH) — kompatybilny z ERC-20 owijacz (wrapper) dla etheru (ETH)."
lang: pl
---

# Wrapped Ether (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Połącz swój portfel, aby opakować lub odpakować ETH na dowolnym łańcuchu na [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

Ether (ETH) jest główną walutą Ethereum. Służy do różnych celów, takich jak staking, jako waluta oraz do uiszczania opłat za gaz do obliczenia. **WETH jest w zasadzie ulepszoną wersją ETH z paroma dodatkowymi funkcjami wymaganymi przez wiele aplikacji oraz [tokenów ERC-20](/glossary/#erc-20)**, które są innymi rodzajami cyfrowych zasobów na Ethereum. Aby móc działać z tymi tokenami, ETH musi postępować według tych samych zasad co one, znanych jako standard ERC-20.

Aby wypełnić tę lukę, stworzono Wrapped ETH (WETH). **Wrapped ETH to inteligentny kontrakt, który pozwala na wpłacenie dowolnej kwoty ETH do kontraktu i otrzymanie tej samej kwoty w wybitym WETH**, które jest zgodne ze standardem tokenów ERC-20. WETH jest reprezentacją ETH, która pozwala na wchodzenie nim w interakcję jak tokenem ERC-20, a nie jak natywnym aktywem ETH. Nadal potrzebne będzie natywne ETH do uiszczania opłat za gaz, więc pamiętaj, aby zostawić sobie pewną kwotę podczas wpłacania.

Możesz odwinąć WETH do ETH używając inteligentnego kontraktu WETH. Możesz wymienić dowolną kwotę WETH za pomocą inteligentnego kontraktu WETH, a otrzymasz taką samą kwotę w ETH. Wpłacone WETH zostaje następnie spalone i usuwane z obiegu WETH.

**Około 3% ETH w obiegu jest zablokowane w kontrakcie tokena WETH**, co czyni go jednym z najczęściej używanych [inteligentnych kontraktów](/glossary/#smart-contract). WETH jest szczególnie ważne dla użytkowników wchodzących w interakcje z aplikacjami w zdecentralizowanych finansach (DeFi).

## Dlaczego musimy owijać ETH do ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definiuje standardowy interfejs dla wymienialnych tokenów, dzięki czemu każdy może tworzyć tokeny, które płynnie działają z aplikacjami i tokenami, które korzystają z tego standardu w ekosystemie Ethereum. ETH nie jest zgodne z tą specyfikacją, ponieważ **ETH poprzedza standard ERC-20**. Oznacza to, że **nie można w łatwy sposób** wymienić ETH na inny token ERC-20 lub **używać go w aplikacjach korzystających ze standardu ERC-20**. Owijanie ETH daje następujące możliwości:

- **Wymiana ETH na tokeny ERC-20**: nie można bezpośrednio wymienić ETH na inne tokeny ERC-20. WETH jest reprezentacją etheru, który jest zgodny ze standardem tokenów wymiennych ERC-20 i może być wymieniany z innymi tokenami ERC-20.

- **Używanie ETH w zdecentralizowanych aplikacjach**: ponieważ ETH nie jest kompatybilne z ERC-20, programiści musieliby tworzyć osobne interfejsy (jeden dla ETH i kolejny dla tokenów ERC-20) w zdecentralizowanych aplikacjach. Owijanie ETH usuwa tę przeszkodę i umożliwia programistom obsługę ETH i innych tokenów w tej samej zdecentralizowanej aplikacji. Wiele aplikacji zdecentralizowanych finansów wykorzystuje ten standard i tworzy rynki służące do wymiany tych tokenów.

## Wrapped ether (WETH) kontra ether (ETH) — jaka jest różnica? {#weth-vs-eth-differences}

|          | **Ether (ETH)**                                                                                                                                                                                       | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Podaż    | Podaż ETH jest zarządzana przez protokół Ethereum. [Emisja](/roadmap/merge/issuance) ETH jest obsługiwana przez walidatory Ethereum podczas przetwarzania transakcji i tworzenia bloków. | WETH to token ERC-20, którego podaż jest zarządzana przez inteligentny kontrakt. Nowe jednostki WETH zostają wyemitowane przez kontrakt po otrzymaniu wpłaty ETH przez użytkowników. Jednostki WETH zostają spalone, kiedy użytkownik zażyczy sobie wymiany WETH na ETH. |
| Własność | Własność jest zarządzana przez protokół Ethereum za pośrednictwem salda Twojego konta.                                                                                                                   | Własność WETH jest zarządzana przez inteligentny kontrakt tokena WETH, zabezpieczonego przez protokół Ethereum.                                                                                                                                                                                          |
| Gaz      | Ether (ETH) jest akceptowalną jednostką płatności za obliczenia w sieci Ethereum. Opłaty za gaz są wyrażane w gwei (jednostce etheru).             | Płacenie za gaz przy użyciu WETH nie jest natywnie wspieranie.                                                                                                                                                                                                                                           |

## Często zadawane pytania {#faq}

<ExpandableCard title="Czy płaci się za owijanie/rozwijanie ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Płacisz opłaty za gaz za owinięcie lub rozwinięcie ETH przy użyciu kontraktu WETH.
</ExpandableCard>

<ExpandableCard title="Czy WETH jest bezpieczne?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH generalnie uważa się za bezpieczne, ponieważ jest oparte na prostym i przetestowanym inteligentnym kontrakcie. Kontrakt WETH został również formalnie zweryfikowany, co jest największym standardem bezpieczeństwa dla inteligentnych kontraktów na Ethereum.
</ExpandableCard>

<ExpandableCard title="Dlaczego widzę różne tokeny WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Oprócz [kanonicznej implementacji WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) opisanej na tej stronie istnieją również jej inne warianty. Mogą to być własne tokeny stworzone przez twórców aplikacji lub wersje wyemitowane na innych blockchainach i mogą one się inaczej zachowywać lub mieć różne zabezpieczenia. **Zawsze sprawdzaj dokładnie informacje o tokenie, aby wiedzieć, z jaką implementacją WETH masz do czynienia.**
</ExpandableCard>

<ExpandableCard title="Jakie są kontrakty WETH na innych sieciach?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Sieć główna Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)
</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Czym do licha jest WETH?](https://weth.tkn.eth.limo/)
- [Informacje o tokenie WETH na Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Formalna weryfikacja WETH](https://zellic.io/blog/formal-verification-weth)
