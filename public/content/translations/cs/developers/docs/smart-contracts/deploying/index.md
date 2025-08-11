---
title: Nasazování chytrých smluv
description:
lang: cs
---

Aby byl váš chytrý kontrakt dostupný uživatelům Etherea, musíte jej nasadit.

Abyste nasadili chytrý kontrakt, stačí odeslat Ethereum transakci obsahující zkompilovaný kód chytrého kontraktu bez uvedení příjemce.

## Předpoklady {#prerequisites}

Než nasadíte chytrý kontrakt, měli byste vědět o [Ethereum sítích](/developers/docs/networks/), [transakcích](/developers/docs/transactions/) a [anatomii chytrých kontraktů](/developers/docs/smart-contracts/anatomy/).

Nasazení smlouvy také stojí ethery (ETH), protože jsou uloženy na blockchainu, takže byste měli vědět o [palivech a poplatcích](/developers/docs/gas/) na Ethereu.

Nakonec budete muset kontrakt před nasazením zkompilovat, takže se ujistěte, že jste si přečetli o [kompilování chytrých kontraktů](/developers/docs/smart-contracts/compiling/).

## Jak nasadit chytrý kontrakt {#how-to-deploy-a-smart-contract}

### Co budete potřebovat {#what-youll-need}

- Bytecode vašeho kontraktu – generuje se při [kompilování](/developers/docs/smart-contracts/compiling/)
- ETH na palivo – nastavíte si svůj palivový limit jako další transakce, takže počítejte s tím, že nasazení kontraktu potřebuje mnohem více paliva než prostý převod ETH
- Script nasazení nebo plugin
- Přístup k [uzlu Etherea](/developers/docs/nodes-and-clients/), a to buď provozováním vlastního, připojením k veřejnému uzlu, nebo prostřednictvím API klíče pomocí [služby uzlů](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Kroky k nasazení chytrého kontraktu {#steps-to-deploy}

Konkrétní kroky závisí na daném vývojovém frameworku. Můžete se například podívat do [Hardhat dokumentace o nasazování kontraktů](https://hardhat.org/guides/deploying.html) nebo do [Foundry dokumentace o nasazování a ověřování chytrého kontraktu](https://book.getfoundry.sh/forge/deploying). Po nasazení bude mít váš kontrakt adresu Etherea jako ostatní [účty](/developers/docs/accounts/) a lze jej ověřit pomocí [nástrojů pro ověření zdrojového kódu](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Související nástroje {#related-tools}

**Remix – _remix IDE umožňuje vyvíjet, nasazovat a spravovat chytré kontrakty pro blockchainy typu Etherea_**

- [Remix](https://remix.ethereum.org)

**Tenderly – _platforma na vývoj Web3, která poskytuje ladění, pozorovatelnost a infrastrukturní stavební bloky pro vývoj, testování, monitorování a provozování chytrých kontraktů_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentace](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat – _vývojové prostředí pro kompilaci, nasazení, testování a ladění Ethereum softwaru_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentace na nasazování vašich kontraktů](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb – _lehce nasaďte libovolný kontrakt do libovolného blockchainu kompatibilního s EVM pomocí jediného příkazu_**

- [Dokumentace](https://portal.thirdweb.com/deploy/)

**Crossmint – _vývojová platforma na úrovni webu3 pro nasazení chytrých kontraktů, umožnění plateb kreditními kartami a plateb napříč blockchainy a používání API k vytváření, distribuci, prodeji, ukládání a úpravám NFT_**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentace](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Související návody {#related-tutorials}

- [Nasazení vašeho prvního chytrého kontraktu](/developers/tutorials/deploying-your-first-smart-contract/) _– úvod do nasazení prvního chytrého kontraktu v testovací síti Etherea._
- [Ahoj Světe | tutoriál na chytrý kontrakt](/developers/tutorials/hello-world-smart-contract/) _– jednoduchý návod na vytvoření a nasazení základního chytrého kontraktu na Ethereu._
- [Interagujte s dalšími kontrakty ze Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– jak nasadit chytrý kontrakt z existujícího kontraktu a interagovat s ním._
- [Jak snížit velikost kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– jak snížit velikost kontraktu, abyste nepřekročili limit a ušetřili za palivo_

## Další informace {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) – _OpenZeppelin_
- [Nasazení vašich kontraktů pomocí Hardhat](https://hardhat.org/guides/deploying.html) – _Nomic Labs_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ji!_

## Související témata {#related-topics}

- [Vývojářské rámce](/developers/docs/frameworks/)
- [Run an Ethereum node](/developers/docs/nodes-and-clients/run-a-node/)
- [Uzly jako služba](/developers/docs/nodes-and-clients/nodes-as-a-service)
