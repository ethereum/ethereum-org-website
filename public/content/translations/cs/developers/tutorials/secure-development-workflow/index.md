---
title: "Kontrolní seznam zabezpečení chytrých kontraktů"
description: "Doporučený pracovní postup pro psaní bezpečných chytrých kontraktů"
author: "Trailofbits"
tags: [ "chytré kontrakty", "bezpečnost", "solidity" ]
skill: intermediate
lang: cs
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Kontrolní seznam pro vývoj chytrých kontraktů {#smart-contract-development-checklist}

Zde je obecný postup, který doporučujeme dodržovat při psaní vašich chytrých kontraktů.

Zkontrolujte, zda se nevyskytují známé bezpečnostní problémy:

- Zkontrolujte své kontrakty pomocí nástroje [Slither](https://github.com/crytic/slither). Obsahuje více než 40 vestavěných detektorů pro běžné zranitelnosti. Spouštějte jej při každém odevzdání nového kódu a zajistěte, aby měl čistý výstup (nebo použijte režim triage k potlačení určitých problémů).
- Zkontrolujte své kontrakty pomocí nástroje [Crytic](https://crytic.io/). Kontroluje 50 problémů, které Slither nekontroluje. Crytic může také pomoci vašemu týmu udržet si vzájemný přehled, protože snadno odhaluje bezpečnostní problémy v pull requestech na GitHubu.

Zvažte speciální vlastnosti svého kontraktu:

- Jsou vaše kontrakty aktualizovatelné? Zkontrolujte kód pro aktualizovatelnost na přítomnost chyb pomocí [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) nebo [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Zdokumentovali jsme 17 způsobů, jak se mohou aktualizace pokazit.
- Jsou vaše kontrakty v souladu se standardy ERC? Zkontrolujte je pomocí [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Tento nástroj okamžitě identifikuje odchylky od šesti běžných specifikací.
- Integrujete se s tokeny třetích stran? Než se spolehnete na externí kontrakty, projděte si náš [kontrolní seznam pro integraci tokenů](/developers/tutorials/token-integration-checklist/).

Vizuálně zkontrolujte kritické bezpečnostní prvky vašeho kódu:

- Zkontrolujte tiskový výstup [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) nástroje Slither. Vyhněte se nechtěnému zastínění (shadowing) a problémům s C3 linearizací.
- Zkontrolujte tiskový výstup [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) nástroje Slither. Reportuje viditelnost funkcí a řízení přístupu.
- Zkontrolujte tiskový výstup [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) nástroje Slither. Reportuje řízení přístupu ke stavovým proměnným.

Zdokumentujte kritické bezpečnostní vlastnosti a použijte automatizované generátory testů k jejich vyhodnocení:

- Naučte se, jak [dokumentovat bezpečnostní vlastnosti svého kódu](/developers/tutorials/guide-to-smart-contract-security-tools/). Zpočátku to není snadné, ale je to nejdůležitější činnost pro dosažení dobrého výsledku. Je to také předpokladem pro použití jakýchkoli pokročilých technik v tomto návodu.
- Definujte bezpečnostní vlastnosti v jazyce Solidity pro použití s nástroji [Echidna](https://github.com/crytic/echidna) a [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Zaměřte se na váš stavový automat, řízení přístupu, aritmetické operace, externí interakce a soulad se standardy.
- Definujte bezpečnostní vlastnosti pomocí [Python API nástroje Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Zaměřte se na dědičnost, závislosti proměnných, řízení přístupu a další strukturální problémy.
- Spouštějte své testy vlastností při každém commitu pomocí nástroje [Crytic](https://crytic.io). Crytic dokáže zpracovat a vyhodnotit testy bezpečnostních vlastností, takže všichni ve vašem týmu mohou na GitHubu snadno vidět, že procházejí. Neúspěšné testy mohou zablokovat commity.

Nakonec si dejte pozor na problémy, které automatizované nástroje nedokážou snadno najít:

- Nedostatek soukromí: všichni ostatní mohou vidět vaše transakce, zatímco jsou zařazeny v poolu
- Front-running transakce
- Kryptografické operace
- Rizikové interakce s externími komponenty DeFi

## Požádejte o pomoc {#ask-for-help}

[Konzultační hodiny k Ethereu](https://calendly.com/dan-trailofbits/office-hours) se konají každé úterý odpoledne. Tato hodinová, individuální sezení jsou příležitostí zeptat se nás na jakékoli otázky, které máte ohledně bezpečnosti, řešit problémy s používáním našich nástrojů a získat zpětnou vazbu od odborníků na váš současný přístup. Pomůžeme vám projít tímto průvodcem.

Připojte se na náš Slack: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Jsme vždy k dispozici na kanálech #crytic a #ethereum, pokud máte jakékoli dotazy.
