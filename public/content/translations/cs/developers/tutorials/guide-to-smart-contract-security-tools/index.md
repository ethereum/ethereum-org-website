---
title: Průvodce bezpečnostními nástroji pro chytré kontrakty
description: Přehled tří různých technik testování a analýzy programů
author: "Trailofbits"
lang: cs
tags: ["solidity", "chytré kontrakty", "bezpečnost"]
skill: intermediate
breadcrumb: Bezpečnostní nástroje
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Budeme používat tři odlišné techniky testování a analýzy programů:

- **Statická analýza pomocí nástroje [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Všechny cesty programu jsou aproximovány a analyzovány současně prostřednictvím různých reprezentací programu (např. graf toku řízení).
- **Fuzzing pomocí nástroje [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Kód je spouštěn s pseudonáhodným generováním transakcí. Fuzzer se pokusí najít sekvenci transakcí, která poruší danou vlastnost.
- **Symbolické provádění pomocí nástroje [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Technika formální verifikace, která překládá každou cestu provádění do matematického vzorce, nad kterým lze následně kontrolovat omezení.

Každá technika má své výhody a úskalí a bude užitečná ve [specifických případech](#determining-security-properties):

| Technika | Nástroj | Použití | Rychlost | Přehlédnuté chyby | Falešné poplachy |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Statická analýza | Slither | CLI a skripty | sekundy | středně | málo |
| Fuzzing | Echidna | Vlastnosti Solidity | minuty | málo | žádné |
| Symbolické provádění | Manticore | Vlastnosti Solidity a skripty | hodiny | žádné\* | žádné |

\* pokud jsou všechny cesty prozkoumány bez vypršení časového limitu

**Slither** analyzuje kontrakty během několika sekund, avšak statická analýza může vést k falešným poplachům a bude méně vhodná pro složité kontroly (např. aritmetické kontroly). Spusťte Slither přes API pro snadný přístup k vestavěným detektorům nebo přes API pro uživatelsky definované kontroly.

**Echidna** musí běžet několik minut a bude produkovat pouze skutečně pozitivní nálezy. Echidna kontroluje uživatelem poskytnuté bezpečnostní vlastnosti napsané v Solidity. Může přehlédnout chyby, protože je založena na náhodném průzkumu.

**Manticore** provádí „nejtěžší“ analýzu. Stejně jako Echidna, i Manticore ověřuje uživatelem poskytnuté vlastnosti. Bude potřebovat více času na běh, ale dokáže prokázat platnost vlastnosti a nebude hlásit falešné poplachy.

## Doporučený pracovní postup {#suggested-workflow}

Začněte s vestavěnými detektory nástroje Slither, abyste se ujistili, že se v kódu nenacházejí žádné jednoduché chyby a že nebudou zaneseny ani později. Použijte Slither ke kontrole vlastností souvisejících s dědičností, závislostmi proměnných a strukturálními problémy. Jak kódová základna roste, použijte nástroj Echidna k testování složitějších vlastností stavového automatu. Vraťte se k nástroji Slither a vytvořte vlastní kontroly pro ochrany, které nejsou v Solidity dostupné, jako je například ochrana proti přepsání funkce. Nakonec použijte Manticore k provedení cílené verifikace kritických bezpečnostních vlastností, např. aritmetických operací.

- Použijte CLI nástroje Slither k zachycení běžných problémů
- Použijte nástroj Echidna k testování bezpečnostních vlastností vašeho kontraktu na vysoké úrovni
- Použijte Slither k psaní vlastních statických kontrol
- Použijte Manticore, jakmile budete chtít hloubkové ujištění o kritických bezpečnostních vlastnostech

**Poznámka k jednotkovým testům (unit tests)**. Jednotkové testy jsou nezbytné pro tvorbu vysoce kvalitního softwaru. Tyto techniky však nejsou nejvhodnější pro hledání bezpečnostních chyb. Obvykle se používají k testování pozitivního chování kódu (tj. kód funguje podle očekávání v normálním kontextu), zatímco bezpečnostní chyby se obvykle nacházejí v okrajových případech, které vývojáři nezvažovali. V naší studii desítek bezpečnostních auditů chytrých kontraktů [nemělo pokrytí jednotkovými testy žádný vliv na počet nebo závažnost bezpečnostních chyb](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/), které jsme našli v kódu našich klientů.

## Určování bezpečnostních vlastností {#determining-security-properties}

Abyste mohli efektivně testovat a ověřovat svůj kód, musíte identifikovat oblasti, které vyžadují pozornost. Vzhledem k tomu, že vaše zdroje vynaložené na bezpečnost jsou omezené, je pro optimalizaci vašeho úsilí důležité vymezit slabé nebo vysoce hodnotné části vaší kódové základny. S tím může pomoci modelování hrozeb. Zvažte prostudování:

- [Rychlé hodnocení rizik (Rapid Risk Assessments)](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (náš preferovaný přístup, když je málo času)
- [Průvodce modelováním hrozeb systémů zaměřených na data](https://csrc.nist.gov/pubs/sp/800/154/ipd) (známé také jako NIST 800-154)
- [Shostackovo modelování hrozeb](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Použití asercí (Assertions)](https://blog.regehr.org/archives/1091)

### Komponenty {#components}

Znalost toho, co chcete kontrolovat, vám také pomůže vybrat správný nástroj.

Mezi široké oblasti, které jsou pro chytré kontrakty často relevantní, patří:

- **Stavový automat.** Většinu kontraktů lze reprezentovat jako stavový automat. Zvažte kontrolu toho, že (1) nelze dosáhnout žádného neplatného stavu, (2) pokud je stav platný, lze ho dosáhnout, a (3) žádný stav neuvězní kontrakt.

  - Echidna a Manticore jsou preferované nástroje pro testování specifikací stavových automatů.

- **Řízení přístupu.** Pokud má váš systém privilegované uživatele (např. vlastníka, kontrolory, ...) musíte zajistit, že (1) každý uživatel může provádět pouze autorizované akce a (2) žádný uživatel nemůže blokovat akce privilegovanějšího uživatele.

  - Slither, Echidna a Manticore mohou kontrolovat správné řízení přístupu. Slither může například zkontrolovat, že modifikátor onlyOwner chybí pouze u funkcí na whitelistu. Echidna a Manticore jsou užitečné pro složitější řízení přístupu, jako je oprávnění udělené pouze v případě, že kontrakt dosáhne daného stavu.

- **Aritmetické operace.** Kontrola správnosti aritmetických operací je kritická. Použití `SafeMath` všude je dobrým krokem k zabránění přetečení/podtečení, nicméně stále musíte zvážit další aritmetické chyby, včetně problémů se zaokrouhlováním a chyb, které uvězní kontrakt.

  - Manticore je zde nejlepší volbou. Nástroj Echidna lze použít, pokud je aritmetika mimo rozsah SMT řešitele.

- **Správnost dědičnosti.** Kontrakty v Solidity silně spoléhají na vícenásobnou dědičnost. Snadno může dojít k chybám, jako je stínící funkce, které chybí volání `super`, a nesprávně interpretované pořadí c3 linearizace.

  - Slither je nástroj, který zajistí detekci těchto problémů.

- **Externí interakce.** Kontrakty spolu interagují a některým externím kontraktům by se nemělo důvěřovat. Pokud například váš kontrakt spoléhá na externí orákula, zůstane bezpečný, pokud bude polovina dostupných orákul kompromitována?

  - Manticore a Echidna jsou nejlepší volbou pro testování externích interakcí s vašimi kontrakty. Manticore má vestavěný mechanismus pro nahrazení (stubbing) externích kontraktů.

- **Shoda se standardy.** Standardy Etherea (např. ERC-20) mají historii chyb ve svém návrhu. Buďte si vědomi omezení standardu, na kterém stavíte.
  - Slither, Echidna a Manticore vám pomohou odhalit odchylky od daného standardu.

### Tahák pro výběr nástrojů {#tool-selection-cheatsheet}

| Komponenta | Nástroje | Příklady |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stavový automat | Echidna, Manticore |
| Řízení přístupu | Slither, Echidna, Manticore | [Slither cvičení 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Echidna cvičení 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Aritmetické operace | Manticore, Echidna | [Echidna cvičení 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Manticore cvičení 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Správnost dědičnosti | Slither | [Slither cvičení 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Externí interakce | Manticore, Echidna |
| Shoda se standardy | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

V závislosti na vašich cílech bude nutné zkontrolovat i další oblasti, ale tyto hrubě vymezené oblasti zaměření jsou dobrým začátkem pro jakýkoli systém chytrých kontraktů.

Naše veřejné audity obsahují příklady ověřených nebo testovaných vlastností. Zvažte přečtení sekcí `Automated Testing and Verification` v následujících zprávách, abyste se seznámili s reálnými bezpečnostními vlastnostmi:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)