---
title: "Nasazení chytrých kontraktů"
description: "Naučte se, jak nasadit chytré kontrakty do sítí Ethereum, včetně předpokladů, nástrojů a kroků nasazení."
lang: cs
---

Abyste zpřístupnili svůj chytrý kontrakt uživatelům sítě Ethereum, musíte jej nasadit.

K nasazení chytrého kontraktu stačí odeslat transakci na Ethereu obsahující zkompilovaný kód chytrého kontraktu bez uvedení jakéhokoli příjemce.

## Předpoklady {#prerequisites}

Před nasazením chytrých kontraktů byste měli rozumět [sítím Ethereum](/developers/docs/networks/), [transakcím](/developers/docs/transactions/) a [anatomii chytrých kontraktů](/developers/docs/smart-contracts/anatomy/).

Nasazení kontraktu také stojí ether (ETH), protože se ukládají na blockchainu, takže byste měli být obeznámeni s [gasem a poplatky](/developers/docs/gas/) na Ethereu.

Nakonec budete muset svůj kontrakt před nasazením zkompilovat, takže se ujistěte, že jste si přečetli o [kompilaci chytrých kontraktů](/developers/docs/smart-contracts/compiling/).

## Jak nasadit chytrý kontrakt {#how-to-deploy-a-smart-contract}

### Co budete potřebovat {#what-youll-need}

- Bajtkód vašeho kontraktu – ten se generuje prostřednictvím [kompilace](/developers/docs/smart-contracts/compiling/)
- ETH na gas – svůj limit plynu nastavíte jako u jiných transakcí, takže mějte na paměti, že nasazení kontraktu vyžaduje mnohem více gasu než jednoduchý převod ETH
- skript nebo plugin pro nasazení
- přístup k [uzlu sítě Ethereum](/developers/docs/nodes-and-clients/), ať už spuštěním vlastního, připojením k veřejnému uzlu, nebo prostřednictvím klíče API pomocí [služby uzlů](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Kroky k nasazení chytrého kontraktu {#steps-to-deploy}

Konkrétní kroky budou záviset na daném vývojovém rámci. Můžete se například podívat na [dokumentaci Hardhat k nasazení vašich kontraktů](https://hardhat.org/docs/tutorial/deploying) nebo na [dokumentaci Foundry k nasazení a ověření chytrého kontraktu](https://book.getfoundry.sh/forge/deploying). Po nasazení bude mít váš kontrakt adresu na Ethereu jako jiné [účty](/developers/docs/accounts/) a může být ověřen pomocí [nástrojů pro ověření zdrojového kódu](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Související nástroje {#related-tools}

**Remix - _Remix IDE umožňuje vývoj, nasazení a správu chytrých kontraktů pro blockchainy podobné Ethereu_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Vývojová platforma Web3, která poskytuje ladění, pozorovatelnost a stavební bloky infrastruktury pro vývoj, testování, monitorování a provoz chytrých kontraktů_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentace](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Vývojové prostředí pro kompilaci, nasazení, testování a ladění vašeho softwaru pro Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentace k nasazení vašich kontraktů](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Snadné nasazení jakéhokoli kontraktu do jakéhokoli řetězce kompatibilního s EVM pomocí jediného příkazu_**

- [Dokumentace](https://portal.thirdweb.com/deploy/)

**Crossmint - _Podniková vývojová platforma Web3 pro nasazení chytrých kontraktů, umožnění plateb kreditními kartami a napříč řetězci a využití API k vytváření, distribuci, prodeji, ukládání a úpravám NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentace](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Související návody {#related-tutorials}

- [Nasazení vašeho prvního chytrého kontraktu](/developers/tutorials/deploying-your-first-smart-contract/) _– Úvod do nasazení vašeho prvního chytrého kontraktu v testovací síti Ethereum._
- [Hello World | návod na chytrý kontrakt](/developers/tutorials/hello-world-smart-contract/) _– Srozumitelný návod na vytvoření a nasazení základního chytrého kontraktu na Ethereu._
- [Interakce s jinými kontrakty ze Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Jak nasadit chytrý kontrakt z existujícího kontraktu a interagovat s ním._
- [Jak zmenšit velikost vašeho kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Jak zmenšit velikost vašeho kontraktu, abyste se vešli do limitu a ušetřili na gasu_

## Další čtení {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Nasazení vašich kontraktů pomocí Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Vývojové rámce](/developers/docs/frameworks/)
- [Spuštění uzlu sítě Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Uzly jako služba](/developers/docs/nodes-and-clients/nodes-as-a-service)