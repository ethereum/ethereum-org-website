---
title: "Technický úvod do dapps"
description:
lang: cs
---

Decentralizovaná aplikace (dapp) je aplikace vytvořená na decentralizované síti, která kombinuje [chytrý kontrakt](/developers/docs/smart-contracts/) a frontendové uživatelské rozhraní. V Ethereu jsou chytré kontrakty přístupné a transparentní jako otevřené API, takže vaše dappka může obsahovat i chytrý kontrakt, který napsal někdo jiný.

## Předpoklady {#prerequisites}

Než se začnete učit o dapps, měli byste se seznámit se [základy blockchainu](/developers/docs/intro-to-ethereum/) a přečíst si o síti Ethereum a její decentralizaci.

## Definice dapp {#definition-of-a-dapp}

Dappka má svůj backendový kód spuštěný v decentralizované peer-to-peer síti. To je v kontrastu s aplikací, jejíž backendový kód běží na centralizovaných serverech.

Dappka může mít frontendový kód a uživatelská rozhraní napsaná v libovolném programovacím jazyce (stejně jako aplikace), který může volat její backend. Kromě toho může být její frontend hostován na decentralizovaném úložišti, jako je [IPFS](https://ipfs.io/).

- **Decentralizované** – dapps fungují na Ethereu, otevřené veřejné decentralizované platformě, nad kterou nemá kontrolu žádná osoba ani skupina.
- **Deterministické** – dapps vykonávají stejnou funkci bez ohledu na prostředí, ve kterém jsou spuštěny.
- **Turingovsky úplné** – dapps mohou provádět jakoukoli akci, pokud mají k dispozici potřebné prostředky.
- **Izolované** – dapps jsou spouštěny ve virtuálním prostředí známém jako Ethereum Virtual Machine (EVM), takže pokud má chytrý kontrakt chybu, neovlivní to běžné fungování blockchainové sítě.

### O chytrých kontraktech {#on-smart-contracts}

Abychom mohli vysvětlit fungování dappek, musíme nejdříve vysvětlit chytré kontrakty – backend dappek, což není úplně přesné, ale lepší popis neexistuje. Podrobný přehled naleznete v naší sekci o [chytrých kontraktech](/developers/docs/smart-contracts/).

Chytrý kontrakt je kód, který žije v blockchainu Etherea a běží přesně tak, jak je naprogramován. Jakmile jsou chytré kontrakty spuštěny na síti, nemůžete je měnit. Dappky mohou být decentralizované, protože jsou řízeny logikou zapsanou do kontraktu, nikoli jednotlivcem nebo společností. To také znamená, že musíte své kontrakty navrhovat velmi pečlivě a důkladně je testovat.

## Výhody vývoje dapps {#benefits-of-dapp-development}

- **Žádné výpadky** – Jakmile je chytrý kontrakt nasazen na blockchain, síť jako celek bude vždy schopna obsloužit klienty, kteří chtějí s kontraktem interagovat. Zlomyslní aktéři proto nemohou provádět útoky typu DoS zaměřené na jednotlivé dappky.
- **Soukromí** – K nasazení dapp nebo interakci s ní nemusíte poskytovat svou skutečnou identitu.
- **Odolnost vůči cenzuře** – Žádný subjekt v síti nemůže uživatelům blokovat odesílání transakcí, nasazování dapps nebo čtení dat z blockchainu.
- **Úplná integrita dat** – Data uložená na blockchainu jsou díky kryptografickým primitivům neměnná a nezpochybnitelná. Zlomyslní aktéři nemohou falšovat transakce ani jiná data, která již byla zveřejněna.
- **Výpočty bez nutnosti důvěry / ověřitelné chování** – Chytré kontrakty lze analyzovat a je zaručeno, že se budou provádět předvídatelným způsobem, aniž by bylo nutné důvěřovat centrální autoritě. To v tradičních modelech neplatí. Např. když používáme systémy internetového bankovnictví, musíme věřit, že finanční instituce nezneužijí naše finanční údaje, nezmanipulují záznamy nebo se do nich nenabourají hackeři.

## Nevýhody vývoje dapps {#drawbacks-of-dapp-development}

- **Údržba** – Udržovat dapps může být těžší, protože kód a data publikovaná na blockchainu se hůře upravují. Pro vývojáře je těžké aktualizovat dappky (nebo podkladová data, která dappky ukládají), jakmile jsou nasazeny, když jsou ve staré verzi identifikovány chyby nebo bezpečnostní rizika.
- **Výkonnostní režie** – Existuje obrovská výkonnostní režie a škálování je opravdu obtížné. Aby bylo dosaženo úrovně bezpečnosti, integrity, transparentnosti a spolehlivosti, o kterou Ethereum usiluje, musí každý uzel spouštět a ukládat každou transakci. Kromě toho, nějaký čas zabere i konsenzus důkazu podílem.
- **Přetížení sítě** – Když jedna dapp využívá příliš mnoho výpočetních zdrojů, celá síť se zahltí. V současné době je síť schopna zpracovat pouze asi 10–15 transakcí za sekundu. Pokud jsou transakce odesílány rychleji, může fond nepotvrzených transakcí rychle narůstat.
- **Uživatelská zkušenost** – Může být obtížnější navrhnout uživatelsky přívětivé prostředí, protože průměrný koncový uživatel může považovat za příliš složité nastavit sadu nástrojů nezbytnou pro skutečně bezpečnou interakci s blockchainem.
- **Centralizace** – Uživatelsky a vývojářsky přívětivá řešení postavená na základní vrstvě Etherea mohou nakonec stejně vypadat jako centralizované služby. Např. takové služby mohou ukládat klíče nebo jiné citlivé informace na serverové straně, poskytovat frontend pomocí centralizovaného serveru nebo provozovat důležitou obchodní logiku na centralizovaném serveru před zápisem na blockchain. Centralizace eliminuje mnoho (ne-li všechny) výhod blockchainu oproti tradičnímu modelu.

## Učíte se spíše vizuálně? Vizuální výuka {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Nástroje pro vytváření dapps {#dapp-tools}

**Scaffold-ETH _– Rychle experimentujte se Solidity pomocí frontendu, který se přizpůsobí vašemu chytrému kontraktu._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Příklad dapp](https://punkwallet.io/)

**Create Eth App _– Vytvořte aplikace s podporou Etherea jedním příkazem._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _– FOSS nástroj pro generování frontendů pro dapps z [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _– FOSS nástroj pro vývojáře Etherea k testování uzlů a sestavování a ladění RPC volání z prohlížeče._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _– SDK v každém jazyce, chytré kontrakty, nástroje a infrastruktura pro vývoj web3._**

- [Domovská stránka](https://thirdweb.com/)
- [Dokumentace](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _– Web3 vývojová platforma podnikové úrovně pro nasazování chytrých kontraktů, umožnění plateb kreditní kartou a plateb mezi řetězci a používání API k vytváření, distribuci, prodeji, ukládání a úpravě NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentace](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Další čtení {#further-reading}

- [Prozkoumejte dapps](/apps)
- [Architektura aplikace Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_
- [Průvodce decentralizovanými aplikacemi pro rok 2021](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Co jsou decentralizované aplikace?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Populární dapps](https://www.alchemy.com/dapps) - _Alchemy_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Úvod do stacku Etherea](/developers/docs/ethereum-stack/)
- [Vývojářské frameworky](/developers/docs/frameworks/)
