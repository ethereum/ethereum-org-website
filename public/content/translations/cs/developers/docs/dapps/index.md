---
title: Technický úvod do dapp
description:
lang: cs
---

Decentralizovaná aplikace (dapp) je aplikace postavená na decentralizované síti, která kombinuje [chytrý kontrakt](/developers/docs/smart-contracts/) a uživatelské rozhraní (frontend). Na [Ethereu](/) jsou chytré kontrakty přístupné a transparentní – podobně jako otevřená API – takže vaše dapp může dokonce obsahovat chytrý kontrakt, který napsal někdo jiný.

## Předpoklady {#prerequisites}

Než se začnete učit o dapp, měli byste znát [základy blockchainu](/developers/docs/intro-to-ethereum/) a přečíst si o síti Ethereum a o tom, jak je decentralizovaná.

## Definice dapp {#definition-of-a-dapp}

Dapp má svůj backendový kód spuštěný na decentralizované peer-to-peer síti. V porovnání s tím má běžná aplikace backendový kód spuštěný na centralizovaných serverech.

Dapp může mít frontendový kód a uživatelská rozhraní napsaná v jakémkoli jazyce (stejně jako běžná aplikace), aby mohla volat svůj backend. Její frontend navíc může být hostován na decentralizovaném úložišti, jako je [IPFS](https://ipfs.io/).

- **Decentralizované** – dapp fungují na Ethereu, otevřené veřejné decentralizované platformě, kterou neovládá žádný jednotlivec ani skupina.
- **Deterministické** – dapp vykonávají stejnou funkci bez ohledu na prostředí, ve kterém jsou spuštěny.
- **Turingovsky úplné** – dapp mohou provést jakoukoli akci, pokud mají k dispozici požadované zdroje.
- **Izolované** – dapp jsou spouštěny ve virtuálním prostředí známém jako Ethereum Virtual Machine (EVM), takže pokud má chytrý kontrakt chybu, nenaruší to normální fungování blockchainové sítě.

### O chytrých kontraktech {#on-smart-contracts}

Abychom mohli představit dapp, musíme si představit chytré kontrakty – backend dapp, pro nedostatek lepšího termínu. Pro podrobný přehled přejděte do naší sekce o [chytrých kontraktech](/developers/docs/smart-contracts/).

Chytrý kontrakt je kód, který žije na blockchainu Etherea a běží přesně tak, jak byl naprogramován. Jakmile jsou chytré kontrakty nasazeny do sítě, nemůžete je změnit. Dapp mohou být decentralizované, protože jsou řízeny logikou zapsanou v kontraktu, nikoli jednotlivcem nebo společností. To také znamená, že musíte své kontrakty navrhovat velmi pečlivě a důkladně je testovat.

## Výhody vývoje dapp {#benefits-of-dapp-development}

- **Nulové výpadky** – Jakmile je chytrý kontrakt nasazen na blockchain, síť jako celek bude vždy schopna obsloužit klienty, kteří chtějí s kontraktem interagovat. Zlomyslní aktéři proto nemohou spouštět útoky odepření služby (DoS) zaměřené na jednotlivé dapp.
- **Soukromí** – K nasazení nebo interakci s dapp nemusíte poskytovat svou skutečnou identitu.
- **Odolnost vůči cenzuře** – Žádná jediná entita v síti nemůže uživatelům zablokovat odesílání transakcí, nasazování dapp nebo čtení dat z blockchainu.
- **Úplná integrita dat** – Data uložená na blockchainu jsou neměnná a nezpochybnitelná díky kryptografickým primitivům. Zlomyslní aktéři nemohou padělat transakce ani jiná data, která již byla zveřejněna.
- **Výpočty nevyžadující důvěru / ověřitelné chování** – Chytré kontrakty lze analyzovat a je zaručeno, že se budou provádět předvídatelným způsobem, aniž by bylo nutné důvěřovat centrální autoritě. To v tradičních modelech neplatí; například když používáme systémy online bankovnictví, musíme věřit, že finanční instituce nezneužijí naše finanční údaje, nebudou manipulovat se záznamy nebo nebudou hacknuty.

## Nevýhody vývoje dapp {#drawbacks-of-dapp-development}

- **Údržba** – Dapp může být obtížnější udržovat, protože kód a data publikovaná na blockchainu je těžší upravit. Pro vývojáře je obtížné provádět aktualizace svých dapp (nebo podkladových dat uložených v dapp) po jejich nasazení, a to i v případě, že jsou ve staré verzi zjištěny chyby nebo bezpečnostní rizika.
- **Výkonnostní režie** – Existuje obrovská výkonnostní režie a škálování je opravdu těžké. K dosažení úrovně bezpečnosti, integrity, transparentnosti a spolehlivosti, o kterou Ethereum usiluje, každý uzel spouští a ukládá každou transakci. Navíc konsensus důkaz podílem (PoS) také zabere nějaký čas.
- **Přetížení sítě** – Když jedna dapp využívá příliš mnoho výpočetních zdrojů, celá síť se zpomalí. V současné době dokáže síť zpracovat pouze asi 10–15 transakcí za sekundu; pokud jsou transakce odesílány rychleji, fond nepotvrzených transakcí se může rychle nafouknout.
- **Uživatelská zkušenost** – Může být těžší navrhnout uživatelsky přívětivé prostředí, protože pro průměrného koncového uživatele může být příliš obtížné nastavit sadu nástrojů nezbytnou pro skutečně bezpečnou interakci s blockchainem.
- **Centralizace** – Uživatelsky a vývojářsky přívětivá řešení postavená na základní vrstvě Etherea mohou nakonec stejně vypadat jako centralizované služby. Takové služby mohou například ukládat klíče nebo jiné citlivé informace na straně serveru, poskytovat frontend pomocí centralizovaného serveru nebo spouštět důležitou obchodní logiku na centralizovaném serveru před zápisem na blockchain. Centralizace eliminuje mnoho (ne-li všechny) výhod blockchainu oproti tradičnímu modelu.

## Učíte se raději vizuálně? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## Nástroje pro tvorbu dapp {#dapp-tools}

**Scaffold-ETH _– Rychle experimentujte se Solidity pomocí frontendu, který se přizpůsobí vašemu chytrému kontraktu._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Ukázková dapp](https://punkwallet.io/)

**Create Eth App _– Vytvářejte aplikace poháněné Ethereem pomocí jednoho příkazu._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _– FOSS nástroj pro generování frontendů dapp z [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _– FOSS nástroj pro vývojáře na Ethereu k testování jejich uzlu a sestavování a ladění RPC volání z prohlížeče._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _– SDK v každém jazyce, chytré kontrakty, nástroje a infrastruktura pro vývoj ve Web3._**

- [Domovská stránka](https://thirdweb.com/)
- [Dokumentace](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _– Podniková platforma pro vývoj ve Web3 k nasazování chytrých kontraktů, umožnění plateb kreditními kartami a cross-chain plateb a používání API k vytváření, distribuci, prodeji, ukládání a úpravám NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentace](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Další čtení {#further-reading}

- [Prozkoumejte dapp](/apps)
- [Architektura aplikace Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_
- [Průvodce decentralizovanými aplikacemi pro rok 2021](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) – _LimeChain_
- [Co jsou decentralizované aplikace?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) – _Gemini_
- [Populární dapp](https://www.alchemy.com/dapps) – _Alchemy_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Úvod do technologického zásobníku Etherea](/developers/docs/ethereum-stack/)
- [Vývojové frameworky](/developers/docs/frameworks/)

## Návody: Tvorba aplikací a frontendů na Ethereu {#tutorials}

- [Průvodce kontrakty Uniswap-v2](/developers/tutorials/uniswap-v2-annotated-code/) _– Komentovaný průvodce hlavními kontrakty Uniswap v2 vysvětlující, jak funguje automatizovaný tvůrce trhu (AMM)._
- [Tvorba uživatelského rozhraní pro váš kontrakt](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Jak vytvořit moderní frontend pomocí React + Wagmi, který se připojí k vašemu chytrému kontraktu._
- [Chytrý kontrakt Hello World pro začátečníky – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Komplexní návod: napište, nasaďte a vytvořte frontend pro jednoduchý chytrý kontrakt._
- [Serverové komponenty a agenti pro aplikace Web3](/developers/tutorials/server-components/) _– Jak psát serverové komponenty v TypeScriptu, které naslouchají událostem na blockchainu a reagují transakcemi._
- [IPFS pro decentralizovaná uživatelská rozhraní](/developers/tutorials/ipfs-decentralized-ui/) _– Jak hostovat frontend vaší dapp na IPFS pro odolnost vůči cenzuře._