---
title: Lista de verificare a securității contractelor inteligente
description: Un flux de lucru sugerat pentru scrierea unor contracte inteligente securizate
author: "Trailofbits"
tags:
  - "contracte inteligente"
  - "securitate"
  - "solidity"
skill: intermediate
lang: ro
published: 2020-09-07
source: Construirea de contracte securizate
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Lista de verificare pentru dezvoltarea contractelor inteligente {#smart-contract-development-checklist}

Iată un proces în linii mari pe care vă recomandăm să îl urmați pentru scrierea contractelor inteligente.

Verificați dacă există problemele de securitate cunoscute:

- Revizuiți-vă contractele cu [Slither](https://github.com/crytic/slither). Are încorporate peste 40 de detectoare pentru vulnerabilitățile obișnuite. Executați acest program la fiecare verificare cu cod nou și asigurați-vă că primește un raport curat (sau utilizați modul triaj pentru a pune în surdină anumite probleme).
- Revizuiți-vă contractele cu [Crytic](https://crytic.io/). Acesta verifică existența a 50 de probleme pe care Slither nu le verifică. Crytic vă poate ține și echipa la curent, evidențiind cu ușurință problemele de securitate în solicitările de tip „Pull Requests” pe GitHub.

Gândiți-vă să includeți funcționalități speciale contractul dvs:

- Pot fi actualizate contractele dvs.? Revizuiți-vă codul posibilității de actualizare contra deficiențelor cu [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) sau [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Am documentat 17 moduri în care actualizările pot merge prost.
- Este în intenția contractelor dvs. să se conformeze cu ERC-urile? Verificați-le cu [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Acest instrument identifică instantaneu abaterile de la șase specificații comune.
- Puteți să integrați tokenuri de la terți? Revizuiți [lista noastră de verificare pentru integrarea cu tokenurile](/developers/tutorials/token-integration-checklist/) înainte de a vă baza pe contracte externe.

Inspectați vizual funcționalitățile de securitate de importață majoră ale codului dvs:

- Examinați pe imprimanta Slither [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph). Evitați problemele de umbrire involuntară și de linearizare C3.
- Examinați pe imprimanta Slither [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary). Aceasta indică vizibilitatea funcțiilor și controalele de acces.
- Examinați pe imprimanta Slither [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization). Aceasta informează despre controalele de acces la variabilele de stare.

Documentați proprietățile de securitate de importanță majoră și utilizați generatoarele automate de teste pentru a le evalua:

- Învățați să [documentați proprietățile de securitate ale codului dvs.](/developers/tutorials/guide-to-smart-contract-security-tools/). La început este greu, dar este cea mai importantă activitate pentru a obține un rezultat bun. Este și o condiție prealabilă pentru utilizarea oricărei tehnici avansate din acest tutorial.
- Definiți proprietățile de securitate în Solidity pentru utilizarea cu [Echidna](https://github.com/crytic/echidna) și [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Axați-vă pe mașina de stare, controalele de acces, operațiile aritmetice, interacțiunile externe și conformitatea cu standardele.
- Definiți proprietățile de securitate cu [API-ul Python al Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Axați-vă pe moștenire, dependențe de variabile, controalele de acces și alte aspecte structurale.
- Executați testele proprietăților dvs. la fiecare comitere cu [Crytic](https://crytic.io). Crytic poate consuma și evalua testele proprietăților de securitate, ca toți cei din echipa dvs. să poată vedea ușor că acestea au reușit pe GitHub. Testele eșuate pot să blocheze comiterile.

În sfârșit, fiți vigilent cu privire la problemele pe care instrumentele automate nu le pot găsi cu ușurință:

- Lipsa de confidențialitate: oricine poate să vă vadă tranzacțiile cât timp acestea se află în coada de așteptare a grupului
- Tranzacții cu executare devansată (front running)
- Operațiuni criptografice
- Interacțiuni riscante cu componente externe DeFi

## Solicitați ajutor {#ask-for-help}

[Biroul Ethereum este deschis](https://calendly.com/dan-trailofbits/ethereum-office-hours) în fiecare marți după-amiază. Aceste sesiuni individuale de 1 oră reprezintă ocazia să ne puneți orice întrebări despre securitate și depanare cu instrumentele noastre, precum și să primiți feedback de la experți cu privire la abordarea dvs. actuală. Vă vom ajuta să parcurgeți acest ghid.

Veniți cu noi pe site-ul Slack: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Vă stăm tot timpul la dispoziție pe canalele #crytic și #ethereum dacă aveți întrebări.
