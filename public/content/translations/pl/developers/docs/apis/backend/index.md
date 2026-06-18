---
title: Biblioteki API backendu
description: Wprowadzenie do API klientów Ethereum, które pozwalają na interakcję z blockchainem z poziomu Twojej aplikacji.
lang: pl
---

Aby aplikacja mogła wchodzić w interakcję z blockchainem [Ethereum](/) (tj. odczytywać dane z blockchaina i/lub wysyłać transakcje do sieci), musi połączyć się z węzłem Ethereum.

W tym celu każdy klient Ethereum implementuje specyfikację [JSON-RPC](/developers/docs/apis/json-rpc/), dzięki czemu istnieje jednolity zestaw [metod](/developers/docs/apis/json-rpc/#json-rpc-methods), na których mogą polegać aplikacje.

Jeśli chcesz użyć konkretnego języka programowania do połączenia z węzłem Ethereum, w ekosystemie istnieje wiele wygodnych bibliotek, które znacznie to ułatwiają. Dzięki tym bibliotekom programiści mogą pisać intuicyjne, jednolinijkowe metody do inicjowania żądań JSON-RPC (wewnętrznie), które wchodzą w interakcję z Ethereum.

## Wymagania wstępne {#prerequisites}

Pomocne może być zrozumienie [stosu Ethereum](/developers/docs/ethereum-stack/) oraz [klientów Ethereum](/developers/docs/nodes-and-clients/).

## Dlaczego warto używać biblioteki? {#why-use-a-library}

Te biblioteki abstrahują od dużej części złożoności bezpośredniej interakcji z węzłem Ethereum. Zapewniają również funkcje narzędziowe (np. konwersję ETH na gwei), dzięki czemu jako programista możesz spędzać mniej czasu na radzeniu sobie z zawiłościami klientów Ethereum, a więcej na skupieniu się na unikalnej funkcjonalności swojej aplikacji.

## Dostępne biblioteki {#available-libraries}

### Infrastruktura i usługi węzłów {#infrastructure-and-node-services}

**Alchemy -** **_Platforma programistyczna Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Dokumentacja](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_Węzeł jako usługa (Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [Dokumentacja](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast od Bware Labs -** **_Zdecentralizowane API dla sieci głównej Ethereum i sieci testowych._**

- [blastapi.io](https://blastapi.io/)
- [Dokumentacja](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Zapewnia bardziej wydajne i szybkie usługi RPC_**

- [blockpi.io](https://blockpi.io/)
- [Dokumentacja](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Eksplorator bloków i API transakcji**
- [Dokumentacja](https://docs.etherscan.io/)

**Blockscout - Eksplorator bloków o otwartym kodzie źródłowym**
- [Dokumentacja](https://docs.blockscout.com/)

**GetBlock -** **_Blockchain jako usługa dla rozwoju Web3_**

- [GetBlock.io](https://getblock.io/)
- [Dokumentacja](https://docs.getblock.io/)

**Infura -** **_API Ethereum jako usługa._**

- [infura.io](https://infura.io)
- [Dokumentacja](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Opłacalny dostawca EVM JSON-RPC_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Dokumentacja](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Pełne węzły i eksploratory bloków._**

- [NOWNodes.io](https://nownodes.io/)
- [Dokumentacja](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Infrastruktura blockchain jako usługa._**

- [quicknode.com](https://quicknode.com)
- [Dokumentacja](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API Ethereum i Ethereum Classic jako usługa oparta na oprogramowaniu open source._**

- [rivet.cloud](https://rivet.cloud)
- [Dokumentacja](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Zorientowane na szybkość węzły Ethereum jako API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Dokumentacja](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Narzędzia programistyczne {#development-tools}

**ethers-kt -** **_Asynchroniczna, wysokowydajna biblioteka Kotlin/Java/Android dla blockchainów opartych na EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Przykłady](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Biblioteka integracyjna .NET o otwartym kodzie źródłowym dla blockchaina._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Dokumentacja](https://docs.nethereum.com/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Narzędzia Python -** **_Różnorodne biblioteki do interakcji z Ethereum za pomocą języka Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [GitHub Web3.py](https://github.com/ethereum/web3.py)
- [Czat Web3.py](https://gitter.im/ethereum/web3.py)

**Tatum -** **_Kompleksowa platforma programistyczna blockchain._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Dokumentacja](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_Biblioteka integracyjna Java/Android/Kotlin/Scala dla Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Dokumentacja](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Usługi blockchain {#blockchain-services}

**BlockCypher -** **_Webowe API Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Dokumentacja](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Kompleksowa infrastruktura danych Web3 dla Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Dokumentacja](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Elastyczne i dedykowane węzły Ethereum jako usługa._**

- [chainstack.com](https://chainstack.com)
- [Dokumentacja](https://docs.chainstack.com/)
- [Dokumentacja API Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API infrastruktury blockchain._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Dokumentacja](https://docs.cdp.coinbase.com/)

**DataHub od Figment -** **_Usługi API Web3 z siecią główną Ethereum i sieciami testowymi._**

- [DataHub](https://www.figment.io/)
- [Dokumentacja](https://docs.figment.io/)

**Moralis -** **_Dostawca API EVM klasy korporacyjnej._**

- [moralis.io](https://moralis.io)
- [Dokumentacja](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_API danych Ethereum i wybijania (mint)._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Dokumentacja](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Ogólna platforma API blockchain dla wielu krypto._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Dokumentacja](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Zapewnia prosty i niezawodny dostęp API do blockchaina Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Dokumentacja](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_Wzbogacone API danych blockchain w czasie rzeczywistym dla dziesiątek sieci._**

- [codex.io](https://www.codex.io/)
- [Dokumentacja](https://docs.codex.io)
- [Eksplorator](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_Wzbogacone API blockchain dla ponad 200 sieci._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Dokumentacja](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Węzły i klienci](/developers/docs/nodes-and-clients/)
- [Frameworki programistyczne](/developers/docs/frameworks/)

## Powiązane samouczki {#related-tutorials}

- [Skonfiguruj Web3.js, aby korzystać z blockchaina Ethereum w JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instrukcje dotyczące konfiguracji Web3.js w Twoim projekcie._
- [Wywoływanie inteligentnego kontraktu z JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Na przykładzie tokena DAI zobacz, jak wywoływać funkcje kontraktów za pomocą JavaScript._