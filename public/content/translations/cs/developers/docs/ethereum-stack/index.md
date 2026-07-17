---
title: "Úvod do stacku Etherea"
description: "Průvodce různými vrstvami stacku Etherea a tím, jak do sebe zapadají."
lang: cs
---

Jako u každého softwarového stacku se kompletní „stack Etherea“ bude lišit projekt od projektu v závislosti na vašich cílech.

Existují však základní komponenty Etherea, které pomáhají poskytnout mentální model toho, jak softwarové aplikace interagují s blockchainem Etherea. Porozumění vrstvám stacku vám pomůže pochopit různé způsoby, jakými lze Ethereum integrovat do softwarových projektů.

## Úroveň 1: Ethereum Virtual Machine {#ethereum-virtual-machine}

[Ethereum Virtual Machine (EVM)](/developers/docs/evm/) je běhové prostředí pro chytré kontrakty na Ethereu. Všechny chytré kontrakty a změny stavu na blockchainu Etherea jsou prováděny pomocí [transakcí](/developers/docs/transactions/). EVM zpracovává veškeré transakce v síti Ethereum.

Stejně jako u jakéhokoli jiného virtuálního stroje vytváří EVM úroveň abstrakce mezi spouštěným kódem a spouštějícím strojem (uzlem Etherea). V současné době běží EVM na tisících uzlech distribuovaných po celém světě.

Interně používá EVM k provádění specifických úloh sadu instrukcí zvaných operační kódy (opcodes). Těchto (140 unikátních) operačních kódů umožňuje, aby byl EVM [Turingovsky úplný](https://en.wikipedia.org/wiki/Turing_completeness), což znamená, že EVM dokáže spočítat téměř cokoli, pokud má k dispozici dostatek zdrojů.

Jako vývojář decentralizované aplikace (dapp) nepotřebujete o EVM vědět mnohem víc, než že existuje a že spolehlivě pohání všechny aplikace na Ethereu bez výpadků.

## Úroveň 2: Chytré kontrakty {#smart-contracts}

[Chytré kontrakty](/developers/docs/smart-contracts/) jsou spustitelné programy, které běží na blockchainu Etherea.

Chytré kontrakty se píší pomocí specifických [programovacích jazyků](/developers/docs/smart-contracts/languages/), které se kompilují do bajtkódu EVM (nízkoúrovňové strojové instrukce zvané operační kódy).

Chytré kontrakty neslouží pouze jako open source knihovny, jsou to v podstatě otevřené služby API, které neustále běží a nelze je odstavit. Chytré kontrakty poskytují veřejné funkce, se kterými mohou uživatelé a aplikace ([dapps](/developers/docs/dapps/)) interagovat bez nutnosti povolení. Jakákoli aplikace se může integrovat s nasazenými chytrými kontrakty a skládat tak funkcionalitu, jako je přidávání [datových kanálů](/developers/docs/oracles/) nebo podpora swapů tokenů. Navíc kdokoli může na Ethereum nasadit nové chytré kontrakty, aby přidal vlastní funkcionalitu splňující potřeby jeho aplikace.

Jako vývojář dapp budete muset psát chytré kontrakty pouze tehdy, pokud chcete na blockchain Etherea přidat vlastní funkcionalitu. Možná zjistíte, že většinu nebo všechny potřeby vašeho projektu můžete splnit pouhou integrací s existujícími chytrými kontrakty, například pokud chcete podporovat platby ve stablecoinech nebo umožnit decentralizovanou směnu tokenů.

## Úroveň 3: Uzly Etherea {#ethereum-nodes}

Aby mohla aplikace interagovat s blockchainem Etherea, musí se připojit k [uzlu Etherea](/developers/docs/nodes-and-clients/). Připojení k uzlu vám umožňuje číst data z blockchainu a/nebo odesílat transakce do sítě.

Uzly Etherea jsou počítače se spuštěným softwarem – klientem Etherea. Klient je implementace Etherea, která ověřuje všechny transakce v každém bloku, čímž udržuje síť bezpečnou a data přesná. **Uzly Etherea tvoří blockchain Etherea**. Společně ukládají stav blockchainu Etherea a dosahují konsensu o transakcích, které mění stav blockchainu.

Připojením vaší aplikace k uzlu Etherea (prostřednictvím [JSON-RPC API](/developers/docs/apis/json-rpc/)) je vaše aplikace schopna číst data z blockchainu (například zůstatky na uživatelských účtech) a také vysílat nové transakce do sítě (například převod ETH mezi uživatelskými účty nebo spouštění funkcí chytrých kontraktů).

## Úroveň 4: Klientská API Etherea {#ethereum-client-apis}

Mnoho užitečných knihoven (vytvořených a spravovaných open source komunitou Etherea) umožňuje vašim aplikacím připojit se a komunikovat s blockchainem Etherea.

Pokud je vaše uživatelská aplikace webovou aplikací, můžete se rozhodnout `npm install` [JavaScript API](/developers/docs/apis/javascript/) přímo ve vašem frontendu. Nebo se možná rozhodnete implementovat tuto funkcionalitu na straně serveru pomocí API pro [Python](/developers/docs/programming-languages/python/) nebo [Javu](/developers/docs/programming-languages/java/).

Ačkoli tato API nejsou nezbytnou součástí stacku, abstrahují velkou část složitosti přímé interakce s uzlem Etherea. Poskytují také užitečné funkce (např. převod ETH na Gwei), takže jako vývojář můžete strávit méně času řešením složitostí klientů Etherea a více času se soustředit na funkcionalitu specifickou pro vaši aplikaci.

## Úroveň 5: Koncové uživatelské aplikace {#end-user-applications}

Na nejvyšší úrovni stacku jsou aplikace určené pro uživatele. Jedná se o standardní aplikace, které dnes běžně používáte a tvoříte: především webové a mobilní aplikace.

Způsob, jakým vyvíjíte tato uživatelská rozhraní, zůstává v podstatě nezměněn. Uživatelé často ani nebudou muset vědět, že aplikace, kterou používají, je postavena na blockchainu.

## Jste připraveni vybrat si svůj stack? {#ready-to-choose-your-stack}

Podívejte se na našeho průvodce, jak [nastavit lokální vývojové prostředí](/developers/local-environment/) pro vaši aplikaci na Ethereu.

## Další čtení {#further-reading}

- [Architektura aplikace Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) – _Preethi Kasireddy_

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_