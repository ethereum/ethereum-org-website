---
title: Pokyny pro bezpečnost chytrých kontraktů
description: Kontrolní seznam bezpečnostních pokynů, které je třeba zvážit při tvorbě vaší dapp
author: "Trailofbits"
tags: ["Solidity", "chytré kontrakty", "bezpečnost"]
skill: intermediate
breadcrumb: Bezpečnostní pokyny
lang: cs
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Dodržujte tato obecná doporučení pro tvorbu bezpečnějších chytrých kontraktů.

## Pokyny pro návrh {#design-guidelines}

Návrh kontraktu by měl být prodiskutován předem, ještě před napsáním jediného řádku kódu.

### Dokumentace a specifikace {#documentation-and-specifications}

Dokumentace může být psána na různých úrovních a měla by být aktualizována během implementace kontraktů:

- **Popis systému v běžném jazyce**, který popisuje, co kontrakty dělají, a jakékoli předpoklady o kódové základně.
- **Schémata a architektonické diagramy**, včetně interakcí kontraktů a stavového automatu systému. S generováním těchto schémat mohou pomoci [tiskárny Slither](https://github.com/crytic/slither/wiki/Printer-documentation).
- **Důkladná dokumentace kódu**, pro Solidity lze použít [formát NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html).

### Výpočty onchain vs offchain {#onchain-vs-offchain-computation}

- **Udržujte co nejvíce kódu offchain.** Udržujte onchain vrstvu malou. Předzpracujte data pomocí kódu offchain takovým způsobem, aby bylo ověření onchain jednoduché. Potřebujete seřazený seznam? Seřaďte seznam offchain a onchain pouze zkontrolujte jeho pořadí.

### Aktualizovatelnost {#upgradeability}

Různá řešení aktualizovatelnosti jsme probírali v [našem článku na blogu](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Před napsáním jakéhokoli kódu se vědomě rozhodněte, zda budete podporovat aktualizovatelnost, či nikoli. Toto rozhodnutí ovlivní, jak budete strukturovat svůj kód. Obecně doporučujeme:

- **Upřednostnit [migraci kontraktů](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) před aktualizovatelností.** Migrační systémy mají mnoho stejných výhod jako ty aktualizovatelné, ale bez jejich nevýhod.
- **Použít vzor oddělení dat (data separation) místo vzoru delegatecallproxy.** Pokud má váš projekt jasné oddělení abstrakce, aktualizovatelnost pomocí oddělení dat bude vyžadovat pouze několik úprav. Vzor delegatecallproxy vyžaduje odborné znalosti EVM a je velmi náchylný k chybám.
- **Zdokumentovat postup migrace/aktualizace před nasazením.** Pokud musíte reagovat ve stresu bez jakýchkoli pokynů, uděláte chyby. Napište si postup, kterým se budete řídit, předem. Měl by obsahovat:
  - Volání, která inicializují nové kontrakty
  - Kde jsou uloženy klíče a jak k nim získat přístup
  - Jak zkontrolovat nasazení! Vyviňte a otestujte skript po nasazení (post-deployment script).

## Pokyny pro implementaci {#implementation-guidelines}

**Usilujte o jednoduchost.** Vždy použijte to nejjednodušší řešení, které vyhovuje vašemu účelu. Kterýkoli člen vašeho týmu by měl být schopen vašemu řešení porozumět.

### Skládání funkcí {#function-composition}

Architektura vaší kódové základny by měla usnadňovat revizi kódu. Vyhněte se architektonickým rozhodnutím, která snižují schopnost uvažovat o jeho správnosti.

- **Rozdělte logiku svého systému**, ať už prostřednictvím více kontraktů, nebo seskupením podobných funkcí (například autentizace, aritmetika, ...).
- **Pište malé funkce s jasným účelem.** To usnadní revizi a umožní testování jednotlivých komponent.

### Dědičnost {#inheritance}

- **Udržujte dědičnost zvládnutelnou.** Dědičnost by se měla používat k rozdělení logiky, váš projekt by se však měl snažit minimalizovat hloubku a šířku stromu dědičnosti.
- **Použijte [tiskárnu dědičnosti (inheritance printer)](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) nástroje Slither ke kontrole hierarchie kontraktů.** Tiskárna dědičnosti vám pomůže zkontrolovat velikost hierarchie.

### Události {#events}

- **Logujte všechny klíčové operace.** Události pomohou s laděním kontraktu během vývoje a s jeho monitorováním po nasazení.

### Vyhněte se známým úskalím {#avoid-known-pitfalls}

- **Buďte si vědomi nejčastějších bezpečnostních problémů.** Existuje mnoho online zdrojů, kde se můžete dozvědět o běžných problémech, jako jsou [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) nebo [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Věnujte pozornost sekcím s varováními v [dokumentaci Solidity](https://docs.soliditylang.org/en/latest/).** Sekce s varováními vás budou informovat o ne zcela zřejmém chování jazyka.

### Závislosti {#dependencies}

- **Používejte dobře otestované knihovny.** Importování kódu z dobře otestovaných knihoven sníží pravděpodobnost, že napíšete chybový kód. Pokud chcete napsat kontrakt ERC-20, použijte [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Používejte správce závislostí; vyhněte se kopírování a vkládání kódu.** Pokud spoléháte na externí zdroj, musíte jej udržovat aktuální s původním zdrojem.

### Testování a ověřování {#testing-and-verification}

- **Pište důkladné jednotkové testy (unit testy).** Rozsáhlá sada testů je pro tvorbu vysoce kvalitního softwaru klíčová.
- **Pište vlastní kontroly a vlastnosti pro [Slither](https://github.com/crytic/slither), [Echidnu](https://github.com/crytic/echidna) a [Manticore](https://github.com/trailofbits/manticore).** Automatizované nástroje pomohou zajistit bezpečnost vašeho kontraktu. Projděte si zbytek tohoto průvodce, abyste se naučili, jak psát efektivní kontroly a vlastnosti.
- **Používejte [crytic.io](https://crytic.io/).** Crytic se integruje s GitHubem, poskytuje přístup k soukromým detektorům nástroje Slither a spouští vlastní kontroly vlastností z Echidny.

### Solidity {#solidity}

- **Upřednostňujte Solidity 0.5 před 0.4 a 0.6.** Podle našeho názoru je Solidity 0.5 bezpečnější a má lepší vestavěné postupy než 0.4. Solidity 0.6 se ukázalo jako příliš nestabilní pro produkci a potřebuje čas na dozrání.
- **Ke kompilaci používejte stabilní verzi; ke kontrole varování používejte nejnovější verzi.** Zkontrolujte, zda váš kód nemá s nejnovější verzí kompilátoru žádné hlášené problémy. Solidity má však rychlý cyklus vydávání a historii chyb v kompilátoru, proto nedoporučujeme nejnovější verzi pro nasazení (viz [doporučení verze solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) od nástroje Slither).
- **Nepoužívejte inline assembly.** Assembly vyžaduje odborné znalosti EVM. Nepište kód pro EVM, pokud jste _neovládli_ yellow paper.

## Pokyny pro nasazení {#deployment-guidelines}

Jakmile je kontrakt vyvinut a nasazen:

- **Monitorujte své kontrakty.** Sledujte logy a buďte připraveni reagovat v případě kompromitování kontraktu nebo peněženky.
- **Přidejte své kontaktní údaje do [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Tento seznam pomáhá třetím stranám kontaktovat vás v případě objevení bezpečnostní chyby.
- **Zabezpečte peněženky privilegovaných uživatelů.** Pokud ukládáte klíče v hardwarových peněženkách, řiďte se našimi [osvědčenými postupy](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/).
- **Mějte plán reakce na incidenty.** Počítejte s tím, že vaše chytré kontrakty mohou být kompromitovány. I když jsou vaše kontrakty bez chyb, útočník může získat kontrolu nad klíči vlastníka kontraktu.