---
title: "Jak zidentyfikować fałszywe tokeny"
description: "Zrozumienie fałszywych tokenów, jak sprawiają wrażenie prawdziwych i jak ich unikać."
lang: pl
---

# Jak rozpoznać oszukańcze tokeny {#identify-scam-tokens}

Jednym z najczęstszych zastosowań Ethereum jest tworzenie przez grupę wymienialnych tokenów, w pewnym sensie własnej waluty. Tokeny te zazwyczaj są zgodne ze standardem [ERC-20](/developers/docs/standards/tokens/erc-20/). Jednak wszędzie tam, gdzie istnieją uzasadnione przypadki użycia, które przynoszą wartość, są też przestępcy, którzy próbują ukraść tę wartość dla siebie.

Istnieją dwa sposoby, którymi będą próbowali Cię oszukać:

- **Sprzedaż oszukańczego tokena**, który może wyglądać jak legalny token, który chcesz kupić, ale jest emitowany przez oszustów i nic nie jest wart.
- **Naciąganie na podpisywanie szkodliwych transakcji**, zazwyczaj poprzez przekierowanie do ich własnego interfejsu użytkownika. Mogą próbować nakłonić cię do przekazania ich kontraktom uprawnień do Twoich tokenów ERC-20, ujawniając poufne informacje, które dadzą im dostęp do twoich aktywów itp. Te interfejsy użytkownika mogą być niemal idealnymi klonami uczciwych stron, ale z ukrytymi sztuczkami.

Aby zilustrować, czym są oszukańcze tokeny i jak je zidentyfikować, przyjrzymy się jednemu z nich: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Ten token próbuje wyglądać jak legalny token [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Co to jest ARB?"
contentPreview=''>

Arbitrum to organizacja, która rozwija i zarządza [optymistycznymi pakietami zbiorczymi](/developers/docs/scaling/optimistic-rollups/). Początkowo, Arbitrum było zorganizowane jako firma nastawiona na zysk, ale następnie podjęła kroki w celu decentralizacji. W ramach tego procesu wprowadzili [token zarządzania](/dao/#token-based-membership), którym można handlować.
</ExpandableCard>

<ExpandableCard
title="Dlaczego oszukańczy token nazywa się wARB?"
contentPreview=''>

W Ethereum istnieje konwencja, że gdy zasób nie jest zgodny z ERC-20, tworzymy jego „opakowaną” wersję o nazwie zaczynającej się od „w”. Więc, dla przykładu, mamy wBTC dla bitcoina i <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH dla etheru</a>.

Nie ma sensu tworzyć opakowanej wersji tokena ERC-20, który jest już na Ethereum, ale oszuści polegają raczej na pozorach wiarygodności niż na podstawowej rzeczywistości.
</ExpandableCard>

## Jak działają fałszywe tokeny? {#how-do-scam-tokens-work}

Głównym celem Ethereum jest decentralizacja. Oznacza to, że nie ma centralnego zarządu, który mógłby skonfiskować Twoje aktywa lub ostrzec Cię przed wdrożeniem inteligentnego kontraktu. Jednak oznacza to również, że oszuści mogą wdrażać dowolne inteligentne kontrakty, jakie tylko chcą.

<ExpandableCard
title="Czym są inteligentne kontrakty?"
contentPreview=''>

[Inteligentne kontrakty](/developers/docs/smart-contracts/) to programy działające na blockchainie Ethereum. Dla przykładu każdy token ERC-20 jest implementowany jako inteligentny kontrakt.
</ExpandableCard>

W szczególności Arbitrum wdrożył kontrakt, który używa symbolu `ARB`. Nie powstrzymuje jednak innych ludzi od również wdrażania kontraktu, który używa dokładnie tego samego symbolu lub podobnego. Ktokolwiek pisze kontrakt, decyduje również o tym, co będzie on robił.

## Stwarzanie pozorów legalności {#appearing-legitimate}

Istnieje kilka sztuczek, które stosują twórcy fałszywych tokenów, aby sprawiać wrażenie prawdziwych.

- **Prawdziwa nazwa i symbol**. Tak jak to zostało wspomniane wcześniej, kontrakty ERC-20 mogą mieć te same symbole i nazwy jak inne kontrakty ERC-20. Nie możesz liczyć na bezpieczeństwo w tym obszarze.

- **Prawdziwi właściciele**. Fałszywe tokeny często airdropują znaczne kwoty na adresy, od których można oczekiwać, że są prawdziwymi posiadaczami prawdziwego tokena.

  Dla przykładu spójrzmy ponownie na `wARB`. [Około 16% tokenów](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) jest w posiadaniu adresu, którego publiczny tag to [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). To _nie_ jest fałszywy adres, to jest prawdziwy adres, który [wdrożył prawdziwy kontrakt ARB w sieci głównej Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Ponieważ saldo ERC-20 adresu jest częścią pamięci kontraktu ERC-20, może być określone w kontrakcie jako, co tylko chce twórca kontraktu. Możliwe jest również, że umowa zabrania transferów, więc prawdziwi użytkownicy nie będą mogli pozbyć się tych fałszywych tokenów.

- **Prawdziwe transfery**. _Prawowici właściciele nie płaciliby za transfer oszukańczego tokena innym, więc jeśli są transfery, to musi on być legalny, prawda?_ **Błąd**. Zdarzenia `Transfer` są tworzone przez kontrakt ERC-20. Oszust może z łatwością napisać kontrakt w taki sposób, aby wywołać takie działania.

## Oszukańcze strony internetowe {#websites}

Oszuści mogą również tworzyć bardzo przekonujące strony, czasami nawet dokładne repliki ich autentycznych stron z identycznym interfejsem, ale z subtelnymi podstępami. Przykładami mogą być zewnętrzne linki, które wydają się prawdziwe, a w rzeczywistości wysyłają użytkownika do zewnętrznej fałszywej strony, lub nieprawidłowe instrukcje, które prowadzą użytkownika do ujawnienia kluczy lub wysłania środków na adres oszusta.

Najlepszą praktyką do omijania tego jest dokładne sprawdzanie adresu URL stron, które odwiedzasz oraz zapisywanie adresów znanych autentycznych stron w zakładkach. Następnie możesz uzyskać dostęp do prawdziwej strony za pomocą zakładek bez przypadkowego popełniania błędów ortograficznych lub polegania na zewnętrznych linkach.

## Jak można się zabezpieczyć? {#protect-yourself}

1. **Sprawdź adres kontraktu**. Prawdziwe tokeny pochodzą od zaufanych organizacji, a adresy kontraktów można sprawdzić na stronie danej organizacji. Na przykład, [dla `ARB` możesz zobaczyć legalne adresy tutaj](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Prawdziwe tokeny mają płynność**. Inną opcją jest spojrzenie na wielkość puli płynności na [Uniswap](https://uniswap.org/), jednym z najpopularniejszych protokołów wymiany tokenów. Protokół ten działa przy użyciu pula płynności, do których inwestorzy wpłacają swoje tokeny w nadziei zwrotu z opłat transakcyjnych.

Fałszywe tokeny mają najczęściej małe pule płynności, jeśli jakieś w ogóle mają, ponieważ oszuści nie chcą ryzykować utratą prawdziwych aktywów. Na przykład, pula Uniswap `ARB`/`ETH` zawiera około miliona dolarów ([zobacz tutaj aktualną wartość](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)), a kupno lub sprzedaż niewielkiej kwoty nie zmieni ceny:

![Kupowanie legalnego tokena](./uniswap-real.png)

Ale kiedy próbujesz kupić oszukańczy token `wARB`, nawet niewielki zakup zmieniłby cenę o ponad 90%:

![Kupowanie oszukańczego tokena](./uniswap-scam.png)

To kolejny dowód na to, że `wARB` prawdopodobnie nie jest legalnym tokenem.

3. **Sprawdź w Etherscan**. Wiele fałszywych tokenów zostało już zidentyfikowanych i zgłoszonych przez społeczność. Takie tokeny są [oznaczone w Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Chociaż Etherscan nie jest autorytatywnym źródłem prawdy (naturą zdecentralizowanych sieci jest to, że nie może istnieć autorytatywne źródło wiarygodności), to tokeny, które są identyfikowane przez Etherscan jako fałszywe, prawdopodobnie są fałszywe.

   ![Oszukańczy token w Etherscan](./etherscan-scam.png)

## Wnioski {#conclusion}

Tak długo, jak na świecie istnieje wartość, będą istnieć oszuści, którzy będą próbowali ją ukraść dla siebie, a w zdecentralizowanym świecie nie ma nikogo, kto mógłby Cię chronić, z wyjątkiem ciebie samego. Miejmy nadzieję, że zapamiętasz te punkty, które pomogą Ci odróżnić prawdziwe tokeny od tych fałszywych:

- Fałszywe tokeny podszywają się pod prawdziwe tokeny, mogą używać tej samej nazwy, symbolu itp.
- Oszukańcze tokeny _nie mogą_ używać tego samego adresu kontraktu.
- Najlepszym źródłem adresu prawdziwego tokena jest organizacja, której ten token jest.
- Jeśli to zawiedzie, możesz użyć popularnych, zaufanych aplikacji, takich jak [Uniswap](https://app.uniswap.org/#/swap) i [Blockscout](https://eth.blockscout.com/).
