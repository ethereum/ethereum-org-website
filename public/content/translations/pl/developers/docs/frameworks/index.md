---
title: Frameworki do tworzenia dapp
description: Poznaj zalety frameworków i porównaj dostępne opcje.
lang: pl
---

## Wprowadzenie do frameworków {#introduction-to-frameworks}

Budowa pełnoprawnej zdecentralizowanej aplikacji (dapp) wymaga
różnych elementów technologii. Frameworki oprogramowania zawierają wiele potrzebnych
funkcji lub zapewniają łatwe systemy wtyczek, aby wybrać pożądane
narzędzia.

Frameworki oferują domyślnie wiele funkcji,
takich jak:

- Funkcje do uruchomienia lokalnej instancji blockchaina.
- Narzędzia do kompilacji i testowania inteligentnych kontraktów.
- Dodatki do tworzenia klienta, pozwalające na budowę aplikacji dla użytkownika
  w ramach tego samego projektu/repozytorium.
- Konfiguracja do łączenia się z sieciami Ethereum i wdrażania
  kontraktów, niezależnie od tego, czy jest to lokalnie uruchomiona instancja, czy jedna z
  publicznych sieci Ethereum.
- Dystrybucja zdecentralizowanych aplikacji - integracje z opcjami przechowywania
  danych, takimi jak IPFS.

## Wymagania wstępne {#prerequisites}

Przed zagłębieniem się we frameworki, zalecamy najpierw przeczytać nasze wprowadzenie do [dapp](/developers/docs/dapps/) oraz [stosu Ethereum](/developers/docs/ethereum-stack/).

## Dostępne frameworki {#available-frameworks}

**Foundry** - **_Foundry to niezwykle szybki, przenośny i modułowy zestaw narzędzi do tworzenia aplikacji na Ethereum_**

- [Zainstaluj Foundry](https://book.getfoundry.sh/)
- [Książka o Foundry](https://book.getfoundry.sh/)
- [Czat społeczności Foundry na Telegramie](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_Środowisko programistyczne Ethereum dla profesjonalistów._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Narzędzie do tworzenia inteligentnych kontraktów dla programistów Pythona, analityków danych i specjalistów ds. bezpieczeństwa._**

- [Dokumentacja](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_Platforma do tworzenia aplikacji blockchain na maszynie wirtualnej Javy (JVM)._**

- [Strona główna](https://www.web3labs.com/web3j-sdk)
- [Dokumentacja](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_Asynchroniczna, wysokowydajna biblioteka Kotlin/Java/Android dla blockchainów opartych na EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Przykłady](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_Twórz aplikacje oparte na Ethereum za pomocą jednego polecenia. Zawiera szeroką ofertę frameworków UI i szablonów zdecentralizowanych finansów (DeFi) do wyboru._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [Szablony](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-ETH -** **_Ethers.js + Hardhat + komponenty i hooki React dla Web3: wszystko, czego potrzebujesz, aby zacząć budować zdecentralizowane aplikacje oparte na inteligentnych kontraktach._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Platforma programistyczna Web3, która umożliwia programistom blockchain budowanie, testowanie, debugowanie, monitorowanie i obsługę inteligentnych kontraktów oraz poprawę UX dapp._**

- [Strona internetowa](https://tenderly.co/)
- [Dokumentacja](https://docs.tenderly.co/)

**The Graph -** **_The Graph do wydajnego odpytywania danych z blockchaina._**

- [Strona internetowa](https://thegraph.com/)
- [Samouczek](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_Platforma programistyczna Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_Platforma programistyczna Ethereum._**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_Buduj aplikacje Web3, które mogą wchodzić w interakcje z Twoimi inteligentnymi kontraktami, korzystając z naszych potężnych SDK i CLI._**

- [Dokumentacja](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Platforma programistyczna Web3 (Ethereum i inne)._**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_Platforma programistyczna Web3 klasy korporacyjnej, która pozwala na budowanie aplikacji NFT na wszystkich głównych łańcuchach EVM (i innych)._**

- [Strona internetowa](https://www.crossmint.com)
- [Dokumentacja](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_Środowisko programistyczne i framework testowy oparte na języku Python._**

- [Dokumentacja](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie nie jest obecnie utrzymywane**

**OpenZeppelin SDK -** **_Ostateczny zestaw narzędzi dla inteligentnych kontraktów: pakiet narzędzi pomagających w tworzeniu, kompilacji, aktualizacji, wdrażaniu i interakcji z inteligentnymi kontraktami._**

- [OpenZeppelin Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [Forum społeczności](https://forum.openzeppelin.com/c/support/17)
- **Rozwój OpenZeppelin SDK został zakończony**

**Catapulta -** **_Wielołańcuchowe narzędzie do wdrażania inteligentnych kontraktów, automatyzuje weryfikacje w eksploratorach bloków, śledzi wdrożone inteligentne kontrakty i udostępnia raporty z wdrożeń, działa na zasadzie plug-n-play dla projektów Foundry i Hardhat._**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush (wspierane przez Covalent) -** **_GoldRush oferuje najbardziej wszechstronny pakiet API danych blockchain dla programistów, analityków i przedsiębiorstw. Niezależnie od tego, czy budujesz pulpit nawigacyjny DeFi, portfel, bota handlowego, agenta AI czy platformę zgodności, interfejsy API danych zapewniają szybki, dokładny i przyjazny dla programistów dostęp do niezbędnych danych onchain, których potrzebujesz_**

- [Strona internetowa](https://goldrush.dev/)
- [Dokumentacja](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_Kompleksowy framework w języku Python do testowania kontraktów, fuzzingu, wdrażania, skanowania podatności i nawigacji po kodzie._**

- [Strona główna](https://getwake.io/)
- [Dokumentacja](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [Rozszerzenie VS Code](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_Modułowy i agnostyczny framework open source, który ułatwia programistom zdecentralizowanych aplikacji wbudowywanie zdecentralizowanych tożsamości i weryfikowalnych poświadczeń w ich aplikacje._**

- [Strona główna](https://veramo.io/)
- [Dokumentacja](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [Pakiet NPM](https://www.npmjs.com/package/@veramo/core)

## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Konfiguracja lokalnego środowiska programistycznego](/developers/local-environment/)

## Samouczki: Frameworki programistyczne na Ethereum {#tutorials}

- [Inteligentny kontrakt Hello World dla początkujących – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Zbuduj i wdróż inteligentny kontrakt hello world za pomocą Hardhat, a następnie połącz go z frontendem._