---
title: Propuneri de îmbunătățire pentru Ethereum (EIP-uri)
description: Informațiile esențiale de care ai nevoie pentru a înțelege EIP-urile
lang: ro
---

# Introducere despre Propunerile de îmbunătățire pentru Ethereum (EIP-uri) {#introduction-to-ethereum-improvement-proposals}

## Ce sunt EIP-urile? {#what-are-eips}

[Propunerile de îmbunătățire pentru Ethereum (EIP)](https://eips.ethereum.org/) sunt standarde care specifică noi funcționalități sau procese potențiale pentru Ethereum. EIP-urile conțin specificații tehnice pentru modificările propuse și acționează ca „sursă a adevărului” pentru comunitate. Actualizările de rețea și standardele de aplicare pentru Ethereum sunt discutate și dezvoltate prin procesul EIP-urilor.

Oricine din comunitatea Ethereum are capacitatea de a crea un EIP. Îndrumările pentru redactarea EIP-urilor sunt cuprinse în [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Un EIP ar trebui, în primul rând, să ofere o specificație tehnică succintă cu o motivație redusă. Autorul EIP este responsabil de obținerea unui consens în cadrul comunității și de documentarea celorlalte opinii. Având în vedere bariera tehnică ridicată pentru trimiterea unui EIP bine structurat, în mod istoric, majoritatea autorilor de EIP-uri au fost dezvoltatori de aplicații sau de protocoale.

## De ce contează EIP-urile? {#why-do-eips-matter}

EIP-urile joacă un rol central pentru modul în care schimbările se produc și sunt documentate pe Ethereum. Acestea sunt modalitatea prin care oamenii pot propune, dezbate și adopta schimbări. Există [diferite tipuri de EIP-uri](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), inclusiv EIP-uri de bază pentru modificări ale protocolului de nivel scăzut, care afectează consensul și necesită o actualizare a rețelei, precum [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), și ERC-uri privind standardele de aplicare, precum [EIP-20](https://eips.ethereum.org/EIPS/eip-20) și [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Fiecare actualizare de rețea constă dintr-un set de EIP-uri care trebuie implementate de fiecare [client Ethereum](/learn/#clients-and-nodes) din rețea. Acest lucru înseamnă că, pentru a rămâne în consens cu alți clienți de pe Mainnet-ul Ethereum, dezvoltatorii de clienți trebuie să se asigure că au implementat toate EIP-urile necesare.

Împreună cu furnizarea unei specificații tehnice pentru schimbări, EIP-urile sunt unitatea pe care se bazează guvernarea în Ethereum: oricine este liber să propună un EIP, iar apoi diferiți actori din comunitate vor dezbate pentru a decide dacă ar trebui să fie adoptat ca standard sau inclus într-o actualizare a reţelei. Deoarece EIP-urile care nu sunt esențiale nu trebuie să fie adoptate de toate aplicațiile (de exemplu, este posibil să se creeze un token fungibil care nu implementează EIP-20), dar EIP-urile esențiale trebuie adoptate pe scară largă (deoarece toate nodurile trebuie să se actualizeze pentru a face parte în continuare din aceeași rețea), EIP-urile esențiale necesită un consens mai larg în cadrul comunității decât EIP-urile care nu sunt esențiale.

## Istoricul EIP-urilor {#history-of-eips}

[Depozitarul GitHub pentru Propunerile de îmbunătățire pentru Ethereum (EIPuri)](https://github.com/ethereum/EIPs) a fost creat în octombrie 2015. Procesul EIP-urilor se bazează pe procesul de [Propuneri de îmbunătățire Bitcoin (BIP-uri)](https://github.com/bitcoin/bips), care în sine se bazează pe procesul de [Propuneri de ămbunătățire Python (PEP-uri)](https://www.python.org/dev/peps/).

Editorii EIP-urilor sunt însărcinați cu revizuirea EIP-urilor pentru a le stabili temeinicia din puncte de vedere tehnic, al aspectelor de formatare și al corectării ortografiei, gramaticii și stilului de cod. Martin Becze, Vitalik Buterin, Gavin Wood și alţi câțiva au fost editorii iniţiali de EIP-uri din 2015 până la sfârșitul anului 2016.

Actualii editori ai EIP-urilor sunt

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Editorii emeriți sunt

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Dacă doriți să deveniți un editor de EIP, consultați [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Editorii de EIP-uri decid când o propunere este pregătită să devină un EIP și îi ajută pe autorii de EIP-uri să avanseze propunerile. [Ethereum Cat Herders](https://ethereumcatherders.com/) ajută la organizarea întâlnirilor dintre editorii de EIP-uri și comunitate (consultați [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Procesul complet de standardizare, însoțit de un grafic, este descris în [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Aflați mai multe {#learn-more}

Dacă doriți să citiți mai multe despre EIP-uri, consultați [site-ul EIP](https://eips.ethereum.org/) și [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Aici sunt câteva linkuri utile:

- [O listă cu toate EIP-urile](https://eips.ethereum.org/all)
- [O descriere a tuturor tipurilor de EIP-uri](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [O descriere a tuturor stărilor EIP-urilor](https://eips.ethereum.org/EIPS/eip-1#eip-process)

## Participă {#participate}

Oricine poate crea un EIP. Înainte de a trimite o propunere, trebuie să citești [EIP-1](https://eips.ethereum.org/EIPS/eip-1), care prezintă procesul EIP și modul de redactare a unui EIP și trebuie să soliciți feedback pe [Ethereum Magicians](https://ethereum-magicians.org/), unde propunerile sunt discutate prima dată în comunitate înainte de a depune un proiect.

## Referințe {#references}

<cite class="citation">

Conținutul paginii furnizat parțial din [Guvernarea Dezvoltării Protocolului Ethereum și Coordonarea Actualizării Rețelei] (https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) de Hudson Jameson

</cite>
