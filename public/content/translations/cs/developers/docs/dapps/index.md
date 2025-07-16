---
title: Úvod do dappek
description:
lang: cs
---

Decentralizovaná aplikace (dappka) je aplikace naprogramovaná na decentralizované síti, která kombinuje [chytrý kontrakt](/developers/docs/smart-contracts/) a frontendové uživatelské rozhraní. V Ethereu jsou chytré kontrakty přístupné a transparentní jako otevřené API, takže vaše dappka může obsahovat i chytrý kontrakt, který napsal někdo jiný.

## Předpoklady {#prerequisites}

Než se začnete učit o dappkách, měli byste se seznámit se[ základy blockchainu](/developers/docs/intro-to-ethereum/) a přečíst si něco o síti Ethereu a o její decentralizaci.

## Definice dappky {#definition-of-a-dapp}

Dappka má svůj backendový kód spuštěný v decentralizované peer-to-peer síti. To je v kontrastu s aplikací, jejíž backendový kód běží na centralizovaných serverech.

Dappka může mít frontendový kód a uživatelská rozhraní napsaná v libovolném programovacím jazyce (stejně jako aplikace), který může volat její backend. Kromě toho může být její frontend umístěn na decentralizovaném úložišti, jako je [IPFS](https://ipfs.io/).

- **Decentralizované** – dappky fungují na Ethereu, otevřené veřejné decentralizované platformě, nad kterou nemá kontrolu žádná jednotlivá osoba ani skupina.
- **Deterministické** – dappky vykonávají stejnou funkci bez ohledu na prostředí, ve kterém jsou spuštěny.
- **Turingovsky úplné** – dappky mohou provádět jakoukoliv akci, pokud mají k dispozici potřebné prostředky.
- **Izolované** – dappky jsou spouštěny ve virtuálním prostředí známém jako Virtuální stroj Etherea, takže pokud chytrý kontrakt obsahuje nějakou chybu, neovlivní to běžné fungování blockchainové sítě.

### O chytrých kontraktech {#on-smart-contracts}

Abychom mohli vysvětlit fungování dappek, musíme nejdříve vysvětlit chytré kontrakty – backend dappek, což není úplně přesné, ale lepší popis neexistuje. Podrobný přehled naleznete v sekci o [chytrých kontraktech](/developers/docs/smart-contracts/).

Chytrý kontrakt je kód, který žije v blockchainu Etherea a běží přesně tak, jak je naprogramován. Jakmile jsou chytré kontrakty spuštěny na síti, nemůžete je měnit. Dappky mohou být decentralizované, protože jsou řízeny logikou zapsanou do kontraktu, nikoli jednotlivcem nebo společností. To také znamená, že musíte své kontrakty navrhovat velmi pečlivě a důkladně je testovat.

## Výhody vývoje dappek {#benefits-of-dapp-development}

- **Žádné výpadky** – Jakmile je chytrý kontrakt umístěn na blockchain a spuštěn, síť jako celek bude vždy schopna vyhovět uživatelům, kteří chtějí s kontraktem komunikovat. Zlomyslní aktéři proto nemohou provádět útoky typu DoS zaměřené na jednotlivé dappky.
- **Soukromí** – K nasazení dappky nebo interakci s ní není třeba zveřejnit svoji skutečnou identitu.
- **Odolnost vůči cenzuře** – Žádný subjekt v síti nemůže uživatelům blokovat zadávání transakcí, nasazování dappek nebo čtení dat z blockchainu.
- **Úplná integrita dat** – Data uložená na blockchainu jsou díky kryptografickým primitivům neměnná a nezpochybnitelná. Zlomyslní aktéři nemohou falšovat transakce ani jiná data, která již byla zveřejněna.
- **Výpočty / ověřitelné chování bez nutnosti důvěry** – Chytré kontrakty lze analyzovat a je zaručeno, že se budou provádět předvídatelně, aniž by bylo nutné důvěřovat nějaké centrální autoritě. To v tradičních modelech neplatí. Např. když používáme systémy internetového bankovnictví, musíme věřit, že finanční instituce nezneužijí naše finanční údaje, nezmanipulují záznamy nebo se do nich nenabourají hackeři.

## Nevýhody vývoje dappek {#drawbacks-of-dapp-development}

- **Údržba** – Údržba dappek je náročnější, protože kód a data publikovaná na blockchainu se hůře upravují. Pro vývojáře je těžké aktualizovat dappky (nebo podkladová data, která dappky ukládají), jakmile jsou nasazeny, když jsou ve staré verzi identifikovány chyby nebo bezpečnostní rizika.
- **Výkonnostní režie** – Výkonnostní režie je obrovská a škálování je opravdu obtížné. Aby bylo dosaženo úrovně bezpečnosti, integrity, transparentnosti a spolehlivosti, o kterou Ethereum usiluje, musí každý uzel spouštět a ukládat každou transakci. Kromě toho, nějaký čas zabere i konsenzus důkazu podílem.
- **Přetížení sítě** – Pokud jedna dappka využívá příliš mnoho výpočetních zdrojů, celá síť se zahltí. V současné době je síť schopna zpracovat pouze asi 10–15 transakcí za sekundu. Pokud jsou transakce odesílány rychleji, může fond nepotvrzených transakcí rychle narůstat.
- **Uživatelská zkušenost** – Může být obtížnější navrhnout uživatelsky přívětivé prostředí, protože průměrný koncový uživatel by mohl považovat za příliš složité nastavit nástrojový stack nezbytný pro skutečně bezpečnou interakci s blockchainem.
- **Centralizace** – Uživatelsky a vývojářsky přívětivá řešení spuštěná na základní vrstvě Etherea mohou nakonec vypadat jako centralizované služby. Např. takové služby mohou ukládat klíče nebo jiné citlivé informace na serverové straně, poskytovat frontend pomocí centralizovaného serveru nebo provozovat důležitou obchodní logiku na centralizovaném serveru před zápisem na blockchain. Centralizace eliminuje mnoho (ne-li všechny) výhod blockchainu oproti tradičnímu modelu.

## Učíte se spíše vizuálně? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Nástroje pro vytváření dappek {#dapp-tools}

**Scaffold-ETH_ – Experimentujte se Solidity pomocí frontendu, který se přizpůsobuje vašemu chytrému kontraktu._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Příkladová dappka](https://punkwallet.io/)

**Vytvořte ethereovskou appku _– Vytvořte aplikace s podporou Etherea pomocí jednoho příkazu._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp_ – FOSS nástroj pro generování frontendů dappek z [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _– FOSS nástroj pro vývojáře Etherea k testování uzlů a sestavování a ladění RPC volání z prohlížeče._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb_ – SDK v každém jazyce, chytré kontrakty, nástroje a infrastruktura pro vývoj web3._**

- [Domovská stránka](https://thirdweb.com/)
- [Dokumentace](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _– Web3 vývojová platforma podnikové úrovně pro nasazování chytrých kontraktů, umožnění plateb kreditní kartou a plateb mezi řetězci a používání API k vytváření, distribuci, prodeji, ukládání a úpravě NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentace](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Další informace {#further-reading}

- [Prozkoumat dappky](/dapps)
- [The Architecture of a Web 3.0 application](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_
- [A 2021 guide to decentralized applications](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) – _LimeChain_
- [What Are Decentralized Apps?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) – _Gemini_
- [Popular dapps](https://www.alchemy.com/dapps) – _Alchemy_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ji!_

## Související témata {#related-topics}

- [Úvod do stacku Etherea](/developers/docs/ethereum-stack/)
- [Vývojářské rámce](/developers/docs/frameworks/)
