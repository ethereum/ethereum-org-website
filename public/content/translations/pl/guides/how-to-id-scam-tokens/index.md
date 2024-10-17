---
title: Jak zidentyfikować fałszywe tokeny
description: Zrozumienie fałszywych tokenów, jak sprawiają wrażenie prawdziwych i jak ich unikać.
lang: pl
---

# Jak zidentyfikować fałszywe tokeny {#identify-scam-tokens}

Jednym z najczęstszych zastosowań Ethereum jest tworzenie przez grupę wymienialnych tokenów, w pewnym sensie własnej waluty. Te tokeny zwykle używają standardu [ERC-20](/developers/docs/standards/tokens/erc-20/). Jednak wszędzie tam, gdzie istnieją uzasadnione przypadki użycia, które przynoszą wartość, są też przestępcy, którzy próbują ukraść tę wartość dla siebie.

Istnieją dwa sposoby, którymi będą próbowali Cię oszukać:

- **Sprzedając Ci fałszywe tokeny**, które mogą wyglądać jak prawdziwe tokeny, które chcesz kupić, ale są wydawane przez oszustów i nic niewarte.
- **Namawiając cię do podpisania niekorzystnych transakcji**, zazwyczaj poprzez przekierowanie użytkownika do ich własnego interfejsu. Mogą próbować nakłonić cię do przekazania ich kontraktom uprawnień do Twoich tokenów ERC-20, ujawniając poufne informacje, które dadzą im dostęp do twoich aktywów itp. Te interfejsy użytkownika mogą być niemal idealnymi klonami uczciwych stron, ale z ukrytymi sztuczkami.

Aby pokazać, czym są fałszywe tokeny i jak je zidentyfikować, popatrzmy na przykład jednego z nich: [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Ten token próbuje wyglądać jak prawdziwy token [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Co to jest ARB?"
contentPreview=''>

Arbitrum to organizacja, która tworzy i zarządza <a href="/developers/docs/scaling/optimistic-rollups/">optymistycznymi pakietami zbiorczymi</a>. Początkowo, Arbitrum było zorganizowane jako firma nastawiona na zysk, ale następnie podjęła kroki w celu decentralizacji. W ramach tego procesu wydali oni wymienialny <a href="/dao/#token-based-membership">token zarządzania</a>.

</ExpandableCard>

<ExpandableCard
title="Dlaczego fałszywy token jest nazwany wARB?"
contentPreview=''>

W Ethereum istnieje konwencja, że gdy zasób nie jest zgodny z ERC-20, tworzymy jego „opakowaną” wersję o nazwie zaczynającej się od „w”. Więc, dla przykładu, mamy wBTC dla bitcoina i <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH dla etheru</a>.

Nie ma sensu tworzyć opakowanej wersji tokena ERC-20, który jest już na Ethereum, ale oszuści polegają raczej na pozorach wiarygodności niż na podstawowej rzeczywistości.

</ExpandableCard>

## Jak działają fałszywe tokeny? {#how-do-scam-tokens-work}

Głównym celem Ethereum jest decentralizacja. Oznacza to, że nie ma centralnego zarządu, który mógłby skonfiskować Twoje aktywa lub ostrzec Cię przed wdrożeniem inteligentnego kontraktu. Jednak oznacza to również, że oszuści mogą wdrażać dowolne inteligentne kontrakty, jakie tylko chcą.

<ExpandableCard
title="Czym są inteligentne kontrakty?"
contentPreview=''>

<a href="/developers/docs/smart-contracts/">Inteligentne kontrakty</a> to programy, które działają na blockchainie Ethereum. Dla przykładu każdy token ERC-20 jest implementowany jako inteligentny kontrakt.

</ExpandableCard>

Szczególnie, Arbitrum wdrożyło kontrakt, który używa symbolu `ARB`. Nie powstrzymuje jednak innych ludzi od również wdrażania kontraktu, który używa dokładnie tego samego symbolu lub podobnego. Ktokolwiek pisze kontrakt, decyduje również o tym, co będzie on robił.

## Wyglądające na prawdziwe {#appearing-legitimate}

Istnieje kilka sztuczek, które stosują twórcy fałszywych tokenów, aby sprawiać wrażenie prawdziwych.

- **Prawdziwa nazwa i symbol**. Tak jak to zostało wspomniane wcześniej, kontrakty ERC-20 mogą mieć te same symbole i nazwy jak inne kontrakty ERC-20. Nie możesz liczyć na bezpieczeństwo w tym obszarze.

- **Prawdziwi właściciele**. Fałszywe tokeny często airdropują znaczne kwoty na adresy, od których można oczekiwać, że są prawdziwymi posiadaczami prawdziwego tokena.

  Dla przykładu popatrzmy znowu na `wARB`. [Około 16% wszystkich tokenów](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) jest posiadanych przez adres, którego publiczny tag to [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f). To _nie_ jest fałszywy adres, jest to naprawdę adres, który [wdrożył prawdziwy kontrakt ARB w sieci głównej Ethereum](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Ponieważ saldo ERC-20 adresu jest częścią pamięci kontraktu ERC-20, może być określone w kontrakcie jako, co tylko chce twórca kontraktu. Możliwe jest również, że umowa zabrania transferów, więc prawdziwi użytkownicy nie będą mogli pozbyć się tych fałszywych tokenów.

- **Prawdziwe transfery**. _Prawdziwi właściciele nie zapłaciliby za transfer fałszywego tokena do innych, więc jeśli są transfery, to muszą być prawdziwe, prawda?_ **Źle**. Zdarzenia `Transfer` są generowane przez kontrakt ERC-20. Oszust może z łatwością napisać kontrakt w taki sposób, aby wywołać takie działania.

## Fałszywe strony {#websites}

Oszuści mogą również tworzyć bardzo przekonujące strony, czasami nawet dokładne repliki ich autentycznych stron z identycznym interfejsem, ale z subtelnymi podstępami. Przykładami mogą być zewnętrzne linki, które wydają się prawdziwe, a w rzeczywistości wysyłają użytkownika do zewnętrznej fałszywej strony, lub nieprawidłowe instrukcje, które prowadzą użytkownika do ujawnienia kluczy lub wysłania środków na adres oszusta.

Najlepszą praktyką do omijania tego jest dokładne sprawdzanie adresu URL stron, które odwiedzasz oraz zapisywanie adresów znanych autentycznych stron w zakładkach. Następnie możesz uzyskać dostęp do prawdziwej strony za pomocą zakładek bez przypadkowego popełniania błędów ortograficznych lub polegania na zewnętrznych linkach.

## Jak można się zabezpieczyć? {#protect-yourself}

1. **Sprawdź adres kontraktu**. Prawdziwe tokeny pochodzą od zaufanych organizacji, a adresy kontraktów można sprawdzić na stronie danej organizacji. Na przykład, [dla `ARB` można zobaczyć prawdziwe adresy tutaj](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Prawdziwe tokeny mają płynność**. Inną opcją jest sprawdzenie na wielkość puli płynności na [Uniswap](https://uniswap.org/), jednym z najpopularniejszych protokołów wymiany tokenów. Protokół ten działa przy użyciu pula płynności, do których inwestorzy wpłacają swoje tokeny w nadziei zwrotu z opłat transakcyjnych.

Fałszywe tokeny mają najczęściej małe pule płynności, jeśli jakieś w ogóle mają, ponieważ oszuści nie chcą ryzykować utratą prawdziwych aktywów. Na przykład, pula `ARB`/`ETH` na Uniswap wynosi około miliona dolarów ([po aktualną wartość zajrzyj tutaj](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)), a kupowanie lub sprzedawanie małych ilości nie zmieni ceny:

![Kupowanie prawdziwego tokena](./uniswap-real.png)

Jednak, kiedy spróbujesz kupić fałszywy token `wARB`, nawet niewielki zakup zmieniłby cenę o ponad 90%:

![Kupowanie fałszywego tokena](./uniswap-scam.png)

To kolejna część dowodu, która pokazuje nam, że `wARB` najprawdopodobniej nie jest prawdziwym tokenem.

3. **Sprawdź w Etherscan**. Wiele fałszywych tokenów zostało już zidentyfikowanych i zgłoszonych przez społeczność. Takie tokeny zostają [oznaczone na stronie Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Chociaż Etherscan nie jest autorytatywnym źródłem prawdy (naturą zdecentralizowanych sieci jest to, że nie może istnieć autorytatywne źródło wiarygodności), to tokeny, które są identyfikowane przez Etherscan jako fałszywe, prawdopodobnie są fałszywe.

   ![Fałszywe tokeny na Etherscan](./etherscan-scam.png)

## Podsumowanie {#conclusion}

Tak długo, jak na świecie istnieje wartość, będą istnieć oszuści, którzy będą próbowali ją ukraść dla siebie, a w zdecentralizowanym świecie nie ma nikogo, kto mógłby Cię chronić, z wyjątkiem ciebie samego. Miejmy nadzieję, że zapamiętasz te punkty, które pomogą Ci odróżnić prawdziwe tokeny od tych fałszywych:

- Fałszywe tokeny podszywają się pod prawdziwe tokeny, mogą używać tej samej nazwy, symbolu itp.
- Fałszywe tokeny _nie mogą_ korzystać z tego samego adresu kontraktu.
- Najlepszym źródłem adresu prawdziwego tokena jest organizacja, której ten token jest.
- W przeciwnym razie można skorzystać z popularnych i zaufanych aplikacji, takich jak [Uniswap](https://app.uniswap.org/#/swap) i [Etherscan](https://etherscan.io/).
