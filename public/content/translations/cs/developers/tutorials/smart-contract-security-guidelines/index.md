---
title: "Pokyny pro zabezpečení smart kontraktů"
description: "Kontrolní seznam bezpečnostních pokynů, které je třeba zvážit při vytváření vaší dapp."
author: "Trailofbits"
tags: [ "solidity", "chytré kontrakty", "bezpečnost" ]
skill: intermediate
lang: cs
published: 2020-09-06
source: "Tvorba bezpečných kontraktů"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Řiďte se těmito doporučeními na vysoké úrovni, abyste mohli vytvářet bezpečnější chytré kontrakty.

## Pokyny pro návrh {#design-guidelines}

Návrh kontraktu by měl být prodiskutován předem, ještě před napsáním jakéhokoli řádku kódu.

### Dokumentace a specifikace {#documentation-and-specifications}

Dokumentaci lze psát na různých úrovních a měla by být aktualizována při implementaci kontraktů:

- **Jednoduchý srozumitelný popis systému**, který popisuje, co kontrakty dělají a jaké jsou předpoklady týkající se kódové základny.
- **Schémata a architektonické diagramy**, včetně interakcí kontraktů a stavového automatu systému. [Slither printers](https://github.com/crytic/slither/wiki/Printer-documentation) mohou pomoci s generováním těchto schémat.
- **Důkladná dokumentace kódu**, pro Solidity lze použít [formát Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html).

### Výpočty on-chain vs. off-chain {#onchain-vs-offchain-computation}

- **Ponechte co nejvíce kódu off-chain.** Udržujte on-chain vrstvu malou. Předzpracujte data pomocí kódu off-chain tak, aby ověření on-chain bylo jednoduché. Potřebujete seřazený seznam? Seřaďte seznam off-chain, poté pouze zkontrolujte jeho pořadí on-chain.

### Vylepšitelnost {#upgradeability}

O různých řešeních vylepšitelnosti jsme diskutovali v [našem příspěvku na blogu](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Před napsáním jakéhokoli kódu učiňte vědomé rozhodnutí, zda vylepšitelnost podporovat, či nikoliv. Toto rozhodnutí ovlivní, jak budete strukturovat svůj kód. Obecně doporučujeme:

- **Upřednostňujte [migraci kontraktů](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) před vylepšitelností.** Migrační systémy mají mnoho stejných výhod jako ty vylepšitelné, ale nemají jejich nevýhody.
- **Používejte vzor oddělení dat namísto vzoru delegatecallproxy.** Pokud má váš projekt jasné oddělení abstrakce, vylepšitelnost pomocí oddělení dat bude vyžadovat jen několik úprav. Delegatecallproxy vyžaduje odborné znalosti EVM a je vysoce náchylný k chybám.
- **Zdokumentujte postup migrace/vylepšení před nasazením.** Pokud budete muset reagovat pod stresem bez jakýchkoli pokynů, uděláte chyby. Napište si postup s předstihem. Měl by zahrnovat:
  - Volání, která iniciují nové kontrakty
  - Kde jsou uloženy klíče a jak k nim přistupovat
  - Jak zkontrolovat nasazení! Vytvořte a otestujte skript, který se spustí po nasazení.

## Pokyny pro implementaci {#implementation-guidelines}

**Usilujte o jednoduchost.** Vždy používejte nejjednodušší řešení, které vyhovuje vašemu účelu. Každý člen vašeho týmu by měl být schopen porozumět vašemu řešení.

### Skládání funkcí {#function-composition}

Architektura vaší kódové základny by měla usnadňovat revizi kódu. Vyhněte se architektonickým rozhodnutím, která snižují schopnost posoudit jeho správnost.

- **Rozdělte logiku vašeho systému**, buď do více kontraktů, nebo seskupením podobných funkcí (například ověřování, aritmetika, ...).
- **Pište malé funkce s jasným účelem.** To usnadní revizi a umožní testování jednotlivých komponent.

### Dědičnost {#inheritance}

- **Udržujte dědičnost zvládnutelnou.** Dědičnost by se měla používat k rozdělení logiky, nicméně váš projekt by se měl snažit minimalizovat hloubku a šířku stromu dědičnosti.
- **Použijte [inheritance printer](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) od Slitheru ke kontrole hierarchie kontraktů.** Tento nástroj vám pomůže zkontrolovat velikost hierarchie.

### Události {#events}

- **Zaznamenávejte všechny klíčové operace.** Události pomohou při ladění kontraktu během vývoje a při jeho monitorování po nasazení.

### Vyhněte se známým nástrahám {#avoid-known-pitfalls}

- **Mějte na paměti nejběžnější bezpečnostní problémy.** Existuje mnoho online zdrojů, kde se můžete o běžných problémech dozvědět, jako například [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) nebo [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Věnujte pozornost sekcím s varováními v [dokumentaci Solidity](https://docs.soliditylang.org/en/latest/).** Sekce s varováními vás informují o ne zcela zjevném chování jazyka.

### Závislosti {#dependencies}

- **Používejte dobře otestované knihovny.** Importování kódu z dobře otestovaných knihoven sníží pravděpodobnost, že napíšete kód s chybami. Pokud chcete napsat kontrakt ERC20, použijte [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Používejte správce závislostí; vyhněte se kopírování kódu.** Pokud se spoléháte na externí zdroj, musíte jej udržovat aktuální s původním zdrojem.

### Testování a ověřování {#testing-and-verification}

- **Napište důkladné jednotkové testy.** Rozsáhlá sada testů je klíčová pro vytvoření vysoce kvalitního softwaru.
- **Napište vlastní kontroly a vlastnosti pro [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) a [Manticore](https://github.com/trailofbits/manticore).** Automatizované nástroje pomohou zajistit bezpečnost vašeho kontraktu. Projděte si zbytek této příručky, abyste se naučili, jak psát efektivní kontroly a vlastnosti.
- **Používejte [crytic.io](https://crytic.io/).** Crytic se integruje s GitHubem, poskytuje přístup k soukromým detektorům Slither a spouští vlastní kontroly vlastností z Echidny.

### Solidity {#solidity}

- **Upřednostňujte Solidity 0.5 před verzemi 0.4 a 0.6.** Podle našeho názoru je Solidity 0.5 bezpečnější a má lepší vestavěné postupy než verze 0.4. Solidity 0.6 se ukázalo jako příliš nestabilní pro produkční nasazení a potřebuje čas na dozrání.
- **Pro kompilaci používejte stabilní vydání; pro kontrolu varování používejte nejnovější vydání.** Zkontrolujte, zda váš kód nemá žádné hlášené problémy s nejnovější verzí kompilátoru. Solidity má však rychlý cyklus vydávání a v minulosti se v něm objevily chyby kompilátoru, takže nejnovější verzi pro nasazení nedoporučujeme (viz [doporučení verze solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) od Slitheru).
- **Nepoužívejte inline assembly.** Assembly vyžaduje odborné znalosti EVM. Nepište kód EVM, pokud jste _neovládli_ žlutou knihu.

## Pokyny pro nasazení {#deployment-guidelines}

Jakmile je kontrakt vyvinut a nasazen:

- **Monitorujte své kontrakty.** Sledujte logy a buďte připraveni reagovat v případě kompromitace kontraktu nebo peněženky.
- **Přidejte své kontaktní údaje do [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Tento seznam pomáhá třetím stranám vás kontaktovat, pokud je objevena bezpečnostní chyba.
- **Zabezpečte peněženky privilegovaných uživatelů.** Pokud ukládáte klíče v hardwarových peněženkách, řiďte se našimi [osvědčenými postupy](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/).
- **Mějte plán reakce na incidenty.** Počítejte s tím, že vaše chytré kontrakty mohou být kompromitovány. I když jsou vaše kontrakty bez chyb, útočník může převzít kontrolu nad klíči vlastníka kontraktu.
