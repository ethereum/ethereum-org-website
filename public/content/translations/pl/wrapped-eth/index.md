---
title: Opakowany ether (WETH)
metaTitle: Czym jest opakowany ether (WETH)
description: Wprowadzenie do opakowanego etheru (WETH) — kompatybilnego z ERC-20 opakowania dla etheru (ETH).
lang: pl
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Podłącz swój portfel, aby opakować lub rozpakować ETH w dowolnym łańcuchu na [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

Ether (ETH) jest główną walutą Ethereum. Jest używany do kilku celów, takich jak staking, jako waluta oraz do uiszczania opłat za gaz za obliczenia. **WETH jest w rzeczywistości ulepszoną formą ETH z pewnymi dodatkowymi funkcjami wymaganymi przez wiele aplikacji i [tokenów ERC-20](/glossary/#erc-20)**, które są innymi rodzajami zasobów cyfrowych w Ethereum. Aby współpracować z tymi tokenami, ETH musi przestrzegać tych samych zasad co one, znanych jako standard ERC-20.

Aby wypełnić tę lukę, stworzono opakowany ether (WETH). **Opakowany ETH to inteligentny kontrakt, który pozwala zdeponować dowolną ilość ETH w kontrakcie i otrzymać taką samą ilość wyemitowanego WETH**, który jest zgodny ze standardem tokenów ERC-20. WETH jest reprezentacją ETH, która pozwala na interakcję z nim jako tokenem ERC-20, a nie jako natywnym aktywem ETH. Nadal będziesz potrzebować natywnego ETH, aby płacić opłaty za gaz, więc upewnij się, że zachowasz trochę podczas deponowania. 

Możesz rozpakować WETH do ETH za pomocą inteligentnego kontraktu WETH. Możesz wymienić dowolną ilość WETH za pomocą inteligentnego kontraktu WETH, a otrzymasz taką samą ilość w ETH. Zdeponowane WETH jest następnie spalane i wycofywane z podaży WETH w obiegu.

**Około ~3% podaży ETH w obiegu jest zablokowane w kontrakcie tokena WETH**, co czyni go jednym z najczęściej używanych [inteligentnych kontraktów](/glossary/#smart-contract). WETH jest szczególnie ważny dla użytkowników wchodzących w interakcje z aplikacjami w zdecentralizowanych finansach (DeFi).

## Dlaczego musimy opakowywać ETH jako ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) definiuje standardowy interfejs dla zbywalnych tokenów, dzięki czemu każdy może tworzyć tokeny, które płynnie współpracują z aplikacjami i tokenami korzystającymi z tego standardu w ekosystemie Ethereum. Ponieważ **ETH powstało przed standardem ERC-20**, ETH nie jest zgodne z tą specyfikacją. Oznacza to, że **nie można łatwo** wymieniać ETH na inne tokeny ERC-20 ani **używać ETH w aplikacjach korzystających ze standardu ERC-20**. Opakowanie ETH daje możliwość wykonania następujących czynności:

- **Wymiana ETH na tokeny ERC-20**: Nie można bezpośrednio wymienić ETH na inne tokeny ERC-20. WETH jest reprezentacją etheru, która jest zgodna ze standardem tokenów zamiennych ERC-20 i może być wymieniana na inne tokeny ERC-20. 

- **Używanie ETH w zdecentralizowanych aplikacjach (dapp)**: Ponieważ ETH nie jest kompatybilne z ERC-20, programiści musieliby tworzyć osobne interfejsy (jeden dla ETH i drugi dla tokenów ERC-20) w dappach. Opakowanie ETH usuwa tę przeszkodę i umożliwia programistom obsługę ETH i innych tokenów w ramach tej samej aplikacji dapp. Wiele aplikacji zdecentralizowanych finansów korzysta z tego standardu i tworzy rynki wymiany tych tokenów.

## Opakowany ether (WETH) a ether (ETH): Jaka jest różnica? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Opakowany ether (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Podaż     | [Podaż ETH](/eth/supply/) jest zarządzana przez protokół [Ethereum](/). [Emisja](/roadmap/merge/issuance) ETH jest obsługiwana przez walidatorów Ethereum podczas przetwarzania transakcji i tworzenia bloków.                           | WETH to token ERC-20, którego podażą zarządza inteligentny kontrakt. Nowe jednostki WETH są emitowane przez kontrakt po otrzymaniu depozytów ETH od użytkowników, a jednostki WETH są spalane, gdy użytkownik chce wymienić WETH na ETH.                                                                                                                                        |
| Własność  | Własność jest zarządzana przez protokół Ethereum poprzez saldo Twojego konta.  | Własność WETH jest zarządzana przez inteligentny kontrakt tokena WETH, zabezpieczony przez protokół Ethereum.                                                                                                                                         |
| Gaz        | Ether (ETH) jest akceptowaną jednostką płatności za obliczenia w sieci Ethereum. Opłaty za gaz są wyrażane w gwei (jednostka etheru).                                                                                    | Płacenie za gaz tokenami WETH nie jest natywnie obsługiwane.                                                                                                                                                                                              |

## Często zadawane pytania {#faq}
 
<ExpandableCard title="Czy płacisz za opakowanie/rozpakowanie ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Płacisz opłaty za gaz, aby opakować lub rozpakować ETH za pomocą kontraktu WETH.

</ExpandableCard>

<ExpandableCard title="Czy WETH jest bezpieczny?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH jest ogólnie uważany za bezpieczny, ponieważ opiera się na prostym, sprawdzonym w boju inteligentnym kontrakcie. Kontrakt WETH przeszedł również weryfikację formalną, co jest najwyższym standardem bezpieczeństwa dla inteligentnych kontraktów w Ethereum.

</ExpandableCard>

<ExpandableCard title="Dlaczego widzę różne tokeny WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Oprócz [kanonicznej implementacji WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) opisanej na tej stronie, w praktyce istnieją również inne warianty. Mogą to być niestandardowe tokeny stworzone przez twórców aplikacji lub wersje wyemitowane na innych łańcuchach, które mogą zachowywać się inaczej lub mieć inne właściwości bezpieczeństwa. **Zawsze dokładnie sprawdzaj informacje o tokenie, aby wiedzieć, z którą implementacją WETH wchodzisz w interakcję.**

</ExpandableCard>

<ExpandableCard title="Jakie są kontrakty WETH w innych sieciach?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [sieć główna Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Czym jest WETH?](https://weth.tkn.eth.limo/)
- [Informacje o tokenie WETH w Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Weryfikacja formalna WETH](https://zellic.io/blog/formal-verification-weth)