---
title: "Průvodce nástroji pro zabezpečení chytrých kontraktů"
description: "Přehled tří různých technik testování a analýzy programů"
author: "Trailofbits"
lang: cs
tags: [ "solidity", "smart kontrakt účty", "bezpečnost" ]
skill: intermediate
published: 2020-09-07
source: "Tvorba bezpečných kontraktů"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Budeme používat tři různé techniky testování a analýzy programů:

- **Statická analýza pomocí nástroje [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Všechny cesty programu jsou aproximovány a analyzovány současně prostřednictvím různých prezentací programu (např. graf řízení toku).
- **Fuzzing s nástrojem [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Kód se provádí s pseudonáhodným generováním transakcí. Fuzzer se pokusí najít sekvenci transakcí, která poruší danou vlastnost.
- **Symbolické spuštění s nástrojem [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Formální ověřovací technika, která převádí každou cestu spuštění na matematický vzorec, na němž lze kontrolovat omezení.

Každá technika má své výhody a nevýhody a bude užitečná ve [specifických případech](#determining-security-properties):

| Technika            | Nástroj   | Použití                       | Rychlost | Zmeškané chyby | Falešné poplachy |
| ------------------- | --------- | ----------------------------- | -------- | -------------- | ---------------- |
| Statická analýza    | Slither   | CLI a skripty                 | sekund   | střední        | nízká            |
| Fuzzing             | Echidna   | Vlastnosti Solidity           | minut    | nízká          | žádná            |
| Symbolické spuštění | Manticore | Vlastnosti a skripty Solidity | hodin    | žádná\*        | žádná            |

\* pokud jsou všechny cesty prozkoumány bez vypršení časového limitu

**Slither** analyzuje kontrakty během několika sekund, nicméně statická analýza může vést k falešným poplachům a bude méně vhodná pro složité kontroly (např. aritmetické kontroly). Spusťte Slither prostřednictvím rozhraní API pro jednoduchý přístup k vestavěným detektorům nebo prostřednictvím rozhraní API pro uživatelem definované kontroly.

**Echidna** potřebuje běžet několik minut a bude produkovat pouze skutečné pozitivní nálezy. Echidna kontroluje uživatelem zadané bezpečnostní vlastnosti napsané v jazyce Solidity. Může přehlédnout chyby, protože je založena na náhodném prozkoumávání.

**Manticore** provádí analýzu s "největší váhou". Stejně jako Echidna, Manticore ověřuje vlastnosti zadané uživatelem. Bude potřebovat více času na spuštění, ale může prokázat platnost vlastnosti a nebude hlásit falešné poplachy.

## Doporučený pracovní postup {#suggested-workflow}

Začněte s vestavěnými detektory nástroje Slither, abyste se ujistili, že v současné době neexistují žádné jednoduché chyby, ani nebudou zavedeny později. Použijte Slither ke kontrole vlastností souvisejících s dědičností, závislostmi proměnných a strukturálními problémy. Jak se kódová základna rozrůstá, použijte nástroj Echidna k testování složitějších vlastností stavového automatu. Vraťte se k nástroji Slither a vyviňte si vlastní kontroly ochrany, které nejsou v Solidity dostupné, například ochranu proti přepsání funkce. Nakonec použijte Manticore k provedení cíleného ověření kritických bezpečnostních vlastností, např. aritmetických operací.

- Použijte CLI nástroje Slither k zachycení běžných problémů
- Použijte Echidna k testování bezpečnostních vlastností vašeho kontraktu na vysoké úrovni
- Použijte Slither k psaní vlastních statických kontrol
- Použijte Manticore, jakmile budete chtít hloubkové ujištění o kritických bezpečnostních vlastnostech

**Poznámka k jednotkovým testům**. Jednotkové testy jsou nezbytné pro vytváření vysoce kvalitního softwaru. Tyto techniky však nejsou nejvhodnější k nalezení bezpečnostních chyb. Obvykle se používají k testování pozitivního chování kódu (tj. kód funguje podle očekávání v normálním kontextu), zatímco bezpečnostní chyby se obvykle vyskytují v okrajových případech, které vývojáři nezohlednili. V naší studii desítek bezpečnostních auditů chytrých kontraktů nemělo [pokrytí jednotkovými testy žádný vliv na počet ani závažnost bezpečnostních chyb](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/), které jsme našli v kódu našich klientů.

## Určení bezpečnostních vlastností {#determining-security-properties}

Chcete-li efektivně testovat a ověřovat svůj kód, musíte identifikovat oblasti, které vyžadují pozornost. Vzhledem k tomu, že vaše zdroje vynaložené na bezpečnost jsou omezené, je důležité určit slabé nebo vysoce hodnotné části vaší kódové základny, abyste optimalizovali své úsilí. Pomoci může modelování hrozeb. Zvažte prostudování:

- [Rychlé posouzení rizik](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (náš preferovaný přístup, když je málo času)
- [Průvodce modelováním hrozeb datově orientovaných systémů](https://csrc.nist.gov/pubs/sp/800/154/ipd) (aka NIST 800-154)
- [Modelování hrozeb podle Shostacka](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Použití tvrzení](https://blog.regehr.org/archives/1091)

### Komponenty {#components}

Vědět, co chcete kontrolovat, vám také pomůže vybrat správný nástroj.

Mezi široké oblasti, které jsou často relevantní pro chytré kontrakty, patří:

- **Stavový automat.** Většinu kontraktů lze reprezentovat jako stavový automat. Zvažte kontrolu, že (1) nelze dosáhnout žádného neplatného stavu, (2) pokud je stav platný, lze ho dosáhnout a (3) žádný stav kontrakt nezablokuje.

  - Echidna a Manticore jsou nástroje, které je třeba upřednostnit pro testování specifikací stavových automatů.

- **Řízení přístupu.** Pokud má váš systém privilegované uživatele (např. vlastníka, správce, ...) musíte zajistit, že (1) každý uživatel může provádět pouze povolené akce a (2) žádný uživatel nemůže blokovat akce privilegovanějšího uživatele.

  - Slither, Echidna a Manticore mohou kontrolovat správné řízení přístupu. Například Slither může zkontrolovat, že pouze funkce na bílé listině postrádají modifikátor onlyOwner. Echidna a Manticore jsou užitečné pro složitější řízení přístupu, jako je oprávnění udělené pouze v případě, že kontrakt dosáhne daného stavu.

- **Aritmetické operace.** Kontrola správnosti aritmetických operací je kritická. Používání `SafeMath` všude je dobrým krokem k zabránění přetečení/podtečení, nicméně stále musíte zvážit další aritmetické chyby, včetně problémů se zaokrouhlováním a chyb, které kontrakt zablokují.

  - Manticore je zde nejlepší volbou. Echidna může být použita, pokud je aritmetika mimo rozsah SMT solveru.

- **Správnost dědičnosti.** Kontrakty v jazyce Solidity se silně spoléhají na vícenásobnou dědičnost. Snadno se mohou vyskytnout chyby, jako je stínící funkce, které chybí volání `super`, a nesprávně interpretované pořadí c3 linearizace.

  - Slither je nástroj, který zajistí odhalení těchto problémů.

- **Externí interakce.** Kontrakty vzájemně interagují a některým externím kontraktům by se nemělo důvěřovat. Například, pokud váš kontrakt spoléhá na externí orákula, zůstane bezpečný, pokud bude polovina dostupných orákul kompromitována?

  - Manticore a Echidna jsou nejlepší volbou pro testování externích interakcí s vašimi kontrakty. Manticore má vestavěný mechanismus pro stubování externích kontraktů.

- **Shoda se standardy.** Standardy Etherea (např. ERC20) mají v historii svého návrhu chyby. Buďte si vědomi omezení standardu, na kterém stavíte.
  - Slither, Echidna a Manticore vám pomohou odhalit odchylky od daného standardu.

### Tahák pro výběr nástrojů {#tool-selection-cheatsheet}

| Komponenta           | Nástroje                    | Příklady                                                                                                                                                                                                                                                                                      |
| -------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stavový automat      | Echidna, Manticore          |                                                                                                                                                                                                                                                                                               |
| Řízení přístupu      | Slither, Echidna, Manticore | [Cvičení 2 nástroje Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Cvičení 2 nástroje Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Aritmetické operace  | Manticore, Echidna          | [Cvičení 1 nástroje Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Cvičení 1–3 nástroje Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)        |
| Správnost dědičnosti | Slither                     | [Cvičení 1 nástroje Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                                 |
| Externí interakce    | Manticore, Echidna          |                                                                                                                                                                                                                                                                                               |
| Shoda se standardy   | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                                       |

V závislosti na vašich cílech bude třeba zkontrolovat i další oblasti, ale tyto hrubozrnné oblasti zaměření jsou dobrým začátkem pro jakýkoli systém chytrých kontraktů.

Naše veřejné audity obsahují příklady ověřených nebo testovaných vlastností. Zvažte přečtení sekcí `Automated Testing and Verification` v následujících zprávách, abyste si prohlédli reálné bezpečnostní vlastnosti:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
