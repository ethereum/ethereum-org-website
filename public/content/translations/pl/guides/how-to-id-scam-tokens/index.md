---
title: Jak rozpoznać fałszywe tokeny
description: Zrozumienie fałszywych tokenów, jak udają one legalne i jak ich unikać.
lang: pl
---

Jednym z najczęstszych zastosowań Ethereum jest tworzenie przez grupę zbywalnego tokena, w pewnym sensie własnej waluty. Tokeny te zazwyczaj są zgodne ze standardem [ERC-20](/developers/docs/standards/tokens/erc-20/). Jednak wszędzie tam, gdzie istnieją legalne przypadki użycia przynoszące wartość, pojawiają się również przestępcy, którzy próbują ukraść tę wartość dla siebie.

Istnieją dwa główne sposoby, na jakie mogą próbować Cię oszukać:

- **Sprzedaż fałszywego tokena**, który może wyglądać jak legalny token, który chcesz kupić, ale został wyemitowany przez oszustów i jest bezwartościowy.
- **Nakłonienie Cię do podpisywania złośliwych transakcji**, zazwyczaj poprzez przekierowanie do ich własnego interfejsu użytkownika. Mogą próbować nakłonić Cię do przyznania ich kontraktom limitu wydatków na Twoich tokenach ERC-20, ujawnienia poufnych informacji dających im dostęp do Twoich aktywów itp. Te interfejsy użytkownika mogą być niemal idealnymi klonami uczciwych stron, ale z ukrytymi sztuczkami.

Aby zilustrować, czym są fałszywe tokeny i jak je rozpoznać, przyjrzymy się przykładowi jednego z nich: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Ten token próbuje wyglądać jak legalny token [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Czym jest ARB?"
contentPreview=''>

Arbitrum to organizacja, która rozwija i zarządza [optymistycznymi rollupami](/developers/docs/scaling/optimistic-rollups/). Początkowo Arbitrum było zorganizowane jako firma nastawiona na zysk, ale następnie podjęło kroki w celu decentralizacji. W ramach tego procesu wyemitowano zbywalny [token zarządzania](/dao/#token-based-membership).

</ExpandableCard>

<ExpandableCard
title="Dlaczego fałszywy token nazywa się wARB?"
contentPreview=''>

W Ethereum istnieje konwencja, że gdy aktywo nie jest zgodne ze standardem ERC-20, tworzymy jego „opakowaną” wersję z nazwą zaczynającą się od „w”. Tak więc, na przykład, mamy wBTC dla bitcoina i <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH dla etheru</a>.

Nie ma sensu tworzyć opakowanej wersji tokena ERC-20, który jest już na Ethereum, ale oszuści polegają na pozorach legalności, a nie na rzeczywistości.

</ExpandableCard>

## Jak działają fałszywe tokeny? {#how-do-scam-tokens-work}

Cały sens Ethereum polega na decentralizacji. Oznacza to, że nie ma centralnego organu, który mógłby skonfiskować Twoje aktywa lub uniemożliwić Ci wdrożenie inteligentnego kontraktu. Oznacza to jednak również, że oszuści mogą wdrożyć dowolny inteligentny kontrakt, jaki tylko zechcą.

<ExpandableCard
title="Czym są inteligentne kontrakty?"
contentPreview=''>

[Inteligentne kontrakty](/developers/docs/smart-contracts/) to programy działające na blockchainie Ethereum. Każdy token ERC-20, na przykład, jest zaimplementowany jako inteligentny kontrakt.

</ExpandableCard>

Konkretnie, Arbitrum wdrożyło kontrakt, który używa symbolu `ARB`. Nie powstrzymuje to jednak innych osób przed wdrożeniem kontraktu, który używa dokładnie tego samego lub podobnego symbolu. Ten, kto pisze kontrakt, decyduje o tym, co ten kontrakt będzie robił.

## Stwarzanie pozorów legalności {#appearing-legitimate}

Twórcy fałszywych tokenów stosują kilka sztuczek, aby wydawać się legalnymi.

- **Legalna nazwa i symbol**. Jak wspomniano wcześniej, kontrakty ERC-20 mogą mieć ten sam symbol i nazwę, co inne kontrakty ERC-20. Nie możesz polegać na tych polach w kwestii bezpieczeństwa.

- **Prawowici właściciele**. Fałszywe tokeny często przeprowadzają airdrop znacznych sald na adresy, co do których można oczekiwać, że są prawowitymi posiadaczami prawdziwego tokena.

  Na przykład, spójrzmy ponownie na `wARB`. [Około 16% tokenów](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) znajduje się na adresie, którego publiczny tag to [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). To _nie_ jest fałszywy adres, to naprawdę jest adres, który [wdrożył prawdziwy kontrakt ARB w sieci głównej Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Ponieważ saldo ERC-20 danego adresu jest częścią pamięci kontraktu ERC-20, może ono zostać określone przez kontrakt na dowolną wartość, jakiej zażyczy sobie jego twórca. Możliwe jest również, aby kontrakt zabraniał transferów, przez co prawowici użytkownicy nie będą w stanie pozbyć się tych fałszywych tokenów.

- **Legalne transfery**. _Prawowici właściciele nie płaciliby za transfer fałszywego tokena do innych, więc jeśli są transfery, to musi być on legalny, prawda?_ **Błąd**. Zdarzenia `Transfer` są generowane przez kontrakt ERC-20. Oszust może łatwo napisać kontrakt w taki sposób, aby generował te akcje.

## Oszukańcze strony internetowe {#websites}

Oszuści mogą również tworzyć bardzo przekonujące strony internetowe, czasami nawet dokładne klony autentycznych witryn z identycznymi interfejsami użytkownika, ale z subtelnymi sztuczkami. Przykładami mogą być zewnętrzne linki, które wydają się legalne, a w rzeczywistości odsyłają użytkownika do zewnętrznej strony oszustów, lub nieprawidłowe instrukcje, które prowadzą użytkownika do ujawnienia swoich kluczy lub wysłania środków na adres atakującego.

Najlepszą praktyką, aby tego uniknąć, jest uważne sprawdzanie adresów URL odwiedzanych stron i zapisywanie adresów znanych, autentycznych witryn w zakładkach. W ten sposób możesz uzyskać dostęp do prawdziwej strony za pośrednictwem zakładek, bez przypadkowego popełniania błędów w pisowni lub polegania na zewnętrznych linkach.

## Jak możesz się chronić? {#protect-yourself}

1. **Sprawdź adres kontraktu**. Legalne tokeny pochodzą od legalnych organizacji, a adresy kontraktów można znaleźć na stronie internetowej danej organizacji. Na przykład, [dla `ARB` możesz zobaczyć legalne adresy tutaj](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Prawdziwe tokeny mają płynność**. Inną opcją jest sprawdzenie wielkości puli płynności na [Uniswap](https://uniswap.org/), jednym z najpopularniejszych protokołów wymiany tokenów. Ten protokół działa w oparciu o pule płynności, do których inwestorzy deponują swoje tokeny w nadziei na zwrot z opłat transakcyjnych.

Fałszywe tokeny zazwyczaj mają znikome pule płynności, jeśli w ogóle je posiadają, ponieważ oszuści nie chcą ryzykować prawdziwych aktywów. Na przykład pula Uniswap `ARB`/`ETH` przechowuje około miliona dolarów ([zobacz tutaj aktualną wartość](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)), a kupno lub sprzedaż niewielkiej ilości nie zmieni ceny:

![Buying a legitimate token](./uniswap-real.png)

Ale kiedy spróbujesz kupić fałszywy token `wARB`, nawet najmniejszy zakup zmieniłby cenę o ponad 90%:

![Buying a scam token](./uniswap-scam.png)

To kolejny dowód, który pokazuje nam, że `wARB` najprawdopodobniej nie jest legalnym tokenem.

3. **Sprawdź w Etherscan**. Wiele fałszywych tokenów zostało już zidentyfikowanych i zgłoszonych przez społeczność. Takie tokeny są [oznaczone w Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Chociaż Etherscan nie jest autorytatywnym źródłem prawdy (naturą zdecentralizowanych sieci jest to, że nie może istnieć autorytatywne źródło legalności), tokeny zidentyfikowane przez Etherscan jako oszustwa najprawdopodobniej nimi są.

   ![Scam token in Etherscan](./etherscan-scam.png)

## Podsumowanie {#conclusion}

Dopóki na świecie istnieje wartość, będą istnieli oszuści, którzy spróbują ją ukraść dla siebie, a w zdecentralizowanym świecie nie ma nikogo, kto by Cię chronił, poza Tobą samym. Mamy nadzieję, że zapamiętasz te punkty, które pomogą Ci odróżnić legalne tokeny od oszustw:

- Fałszywe tokeny podszywają się pod legalne tokeny, mogą używać tej samej nazwy, symbolu itp.
- Fałszywe tokeny _nie mogą_ używać tego samego adresu kontraktu.
- Najlepszym źródłem adresu legalnego tokena jest organizacja, do której ten token należy.
- W przeciwnym razie możesz skorzystać z popularnych, zaufanych aplikacji, takich jak [Uniswap](https://app.uniswap.org/#/swap) i [Blockscout](https://eth.blockscout.com/).
