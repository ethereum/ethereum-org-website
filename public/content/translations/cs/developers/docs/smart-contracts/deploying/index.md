---
title: Nasazování chytrých kontraktů
description: Naučte se, jak nasazovat chytré kontrakty do sítí Etherea, včetně předpokladů, nástrojů a kroků nasazení.
lang: cs
---

Aby byl váš chytrý kontrakt dostupný uživatelům Etherea, musíte jej nasadit.

Abyste nasadili chytrý kontrakt, stačí odeslat Ethereum transakci obsahující zkompilovaný kód chytrého kontraktu bez uvedení příjemce.

## Předpoklady {#prerequisites}

Před nasazením chytrých kontraktů byste měli rozumět [sítím Etherea](/developers/docs/networks/), [transakcím](/developers/docs/transactions/) a [anatomii chytrých kontraktů](/developers/docs/smart-contracts/anatomy/).

Nasazení kontraktu také stojí ethery (ETH), protože jsou uloženy na blockchainu, takže byste měli být obeznámeni s [plynem a poplatky](/developers/docs/gas/) na Ethereu.

Nakonec budete muset svůj kontrakt před nasazením zkompilovat, takže se ujistěte, že jste si přečetli o [kompilaci chytrých kontraktů](/developers/docs/smart-contracts/compiling/).

## Jak nasadit chytrý kontrakt {#how-to-deploy-a-smart-contract}

### Co budete potřebovat {#what-youll-need}

- Bajtkód vašeho kontraktu – ten je generován [kompilací](/developers/docs/smart-contracts/compiling/)
- ETH na palivo – nastavíte si svůj palivový limit jako další transakce, takže počítejte s tím, že nasazení kontraktu potřebuje mnohem více paliva než prostý převod ETH
- Script nasazení nebo plugin
- Přístup k [uzlu Ethereum](/developers/docs/nodes-and-clients/), buď spuštěním vlastního uzlu, připojením k veřejnému uzlu, nebo pomocí klíče API s využitím [služby poskytující uzly](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Kroky k nasazení chytrého kontraktu {#steps-to-deploy}

Konkrétní kroky závisí na daném vývojovém frameworku. Můžete se například podívat do [dokumentace Hardhat o nasazování kontraktů](https://hardhat.org/docs/tutorial/deploying) nebo do [dokumentace Foundry o nasazování a ověřování chytrého kontraktu](https://book.getfoundry.sh/forge/deploying). Po nasazení bude mít váš kontrakt ethereovou adresu jako jiné [účty](/developers/docs/accounts/) a lze jej ověřit pomocí [nástrojů pro ověření zdrojového kódu](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Související nástroje {#related-tools}

**Remix – _Remix IDE umožňuje vyvíjet, nasazovat a spravovat chytré kontrakty pro blockchainy typu Etherea_**

- [Remix](https://remix.ethereum.org)

**Tenderly – _Web3 vývojová platforma, která poskytuje ladění, pozorovatelnost a infrastrukturní stavební bloky pro vývoj, testování, monitorování a provozování chytrých kontraktů_**

- [tenderly.co](https://tenderly.co/)
- [Docs](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat – _Vývojové prostředí pro kompilaci, nasazení, testování a ladění vašeho softwaru pro Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentace o nasazování vašich kontraktů](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb – _Snadné nasazení jakéhokoli kontraktu na jakýkoli řetězec kompatibilní s EVM pomocí jediného příkazu_**

- [Dokumentace](https://portal.thirdweb.com/deploy/)

**Crossmint – _Web3 vývojová platforma podnikové úrovně pro nasazování chytrých kontraktů, umožnění plateb kreditní kartou a plateb mezi řetězci a používání API k vytváření, distribuci, prodeji, ukládání a úpravě NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentace](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Související návody {#related-tutorials}

- [Nasazení vašeho prvního chytrého kontraktu](/developers/tutorials/deploying-your-first-smart-contract/) _– Úvod do nasazení vašeho prvního chytrého kontraktu v testovací síti Etherea._
- [Ahoj světe | tutoriál na chytrý kontrakt](/developers/tutorials/hello-world-smart-contract/) _– Jednoduchý návod na vytvoření a nasazení základního chytrého kontraktu na Ethereu._
- [Interakce s dalšími kontrakty ze Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Jak nasadit chytrý kontrakt z existujícího kontraktu a interagovat s ním._
- [Jak zmenšit velikost vašeho kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Jak zmenšit velikost vašeho kontraktu, abyste se vešli do limitu a ušetřili za plyn_

## Další čtení {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) – _OpenZeppelin_
- [Nasazování vašich kontraktů s Hardhat](https://hardhat.org/docs/tutorial/deploying) – _Nomic Labs_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Vývojářské frameworky](/developers/docs/frameworks/)
- [Spuštění uzlu Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Uzel jako služba](/developers/docs/nodes-and-clients/nodes-as-a-service)
