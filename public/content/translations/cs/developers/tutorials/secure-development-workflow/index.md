---
title: "Kontrolní seznam bezpečnosti chytrých kontraktů"
description: "Doporučený pracovní postup pro psaní bezpečných chytrých kontraktů"
author: "Trailofbits"
tags: ["chytré kontrakty", "bezpečnost", "Solidity"]
skill: intermediate
breadcrumb: "Kontrolní seznam bezpečnosti"
lang: cs
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Kontrolní seznam pro vývoj chytrých kontraktů {#smart-contract-development-checklist}

Zde je obecný postup, který doporučujeme dodržovat při psaní chytrých kontraktů.

Zkontrolujte známé bezpečnostní problémy:

- Zkontrolujte své kontrakty pomocí nástroje [Slither](https://github.com/crytic/slither). Má více než 100 vestavěných detektorů pro běžné zranitelnosti. Spouštějte jej při každém odevzdání (check-in) nového kódu a ujistěte se, že získáte čistý report (nebo použijte režim třídění k potlačení určitých problémů).
- Spouštějte Slither v CI, například pomocí [slither-action](https://github.com/crytic/slither-action) na GitHubu, aby se bezpečnostní problémy objevily v pull requestech.

Zvažte speciální funkce vašeho kontraktu:

- Jsou vaše kontrakty aktualizovatelné? Zkontrolujte svůj kód pro aktualizace na chyby pomocí [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks). Zdokumentovali jsme 17 způsobů, jak se mohou aktualizace pokazit.
- Mají vaše kontrakty splňovat standardy ERC? Zkontrolujte je pomocí [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Tento nástroj okamžitě identifikuje odchylky od šesti běžných specifikací.
- Integrujete tokeny třetích stran? Než se spolehnete na externí kontrakty, projděte si náš [kontrolní seznam pro integraci tokenů](/developers/tutorials/token-integration-checklist/).

Vizuálně zkontrolujte kritické bezpečnostní prvky vašeho kódu:

- Prohlédněte si výstup tiskárny [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) nástroje Slither. Vyhněte se neúmyslnému stínování a problémům s C3 linearizací.
- Prohlédněte si výstup tiskárny [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) nástroje Slither. Reportuje viditelnost funkcí a řízení přístupu.
- Prohlédněte si výstup tiskárny [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) nástroje Slither. Reportuje řízení přístupu ke stavovým proměnným.

Zdokumentujte kritické bezpečnostní vlastnosti a k jejich vyhodnocení použijte automatické generátory testů:

- Naučte se [dokumentovat bezpečnostní vlastnosti vašeho kódu](/developers/tutorials/guide-to-smart-contract-security-tools/). Zpočátku je to těžké, ale je to ta nejdůležitější činnost pro dosažení dobrého výsledku. Je to také předpoklad pro použití jakýchkoli pokročilých technik v tomto tutoriálu.
- Definujte bezpečnostní vlastnosti v Solidity pro použití s fuzzery, jako jsou [Echidna](https://github.com/crytic/echidna) a [Medusa](https://github.com/crytic/medusa), a s nástroji pro symbolické spouštění, jako je [hevm](https://hevm.dev/). Zaměřte se na svůj stavový automat, řízení přístupu, aritmetické operace, externí interakce a shodu se standardy.
- Definujte bezpečnostní vlastnosti pomocí [rozhraní pro programování aplikací (API) nástroje Slither pro Python](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Zaměřte se na dědičnost, závislosti proměnných, řízení přístupu a další strukturální problémy.
- Spouštějte své testy vlastností při každém commitu v CI (například GitHub Actions), aby každý ve vašem týmu snadno viděl, že procházejí. Selhávající testy mohou zablokovat slučování.

Nakonec pamatujte na problémy, které automatizované nástroje nemohou snadno odhalit:

- Nedostatek soukromí: všichni ostatní mohou vidět vaše transakce, zatímco čekají ve frontě v poolu
- Předbíhání transakcí (front running)
- Kryptografické operace
- Rizikové interakce s externími komponentami decentralizovaných financí (DeFi)

## Požádejte o pomoc {#ask-for-help}

[Konzultační hodiny Etherea](https://meetings.hubspot.com/trailofbits/office-hours) probíhají každé úterní odpoledne. Tyto hodinové individuální schůzky jsou příležitostí zeptat se nás na jakékoli otázky ohledně bezpečnosti, řešit problémy pomocí našich nástrojů a získat zpětnou vazbu od odborníků na váš současný přístup. Pomůžeme vám projít tímto průvodcem.

Připojte se na náš Slack: [Empire Hacking](https://slack.empirehacking.nyc/). Pokud máte nějaké dotazy, jsme vždy k dispozici v kanálech #crytic a #ethereum.
