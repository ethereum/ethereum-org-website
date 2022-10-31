---
title: Propuneri de îmbunătățire Ethereum (EIP)
description: Informațiile de bază de care ai nevoie pentru a înțelege propunerile de îmbunătățire Ethereum (EIP).
lang: ro
---

# Introducere în propunerile de îmbunătățire Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals-eips}

## Ce sunt EIP-urile? {#what-are-eips}

[Propunerile de îmbunătățire Ethereum (EIP)](https://eips.ethereum.org/) sunt standarde care specifică noi caracteristici potențiale sau procese pentru Ethereum. EIP-urile conțin specificații tehnice pentru modificările propuse și acționează ca „sursă a adevărului” pentru comunitate. Actualizările de rețea și standardele de aplicare pentru Ethereum sunt discutate și dezvoltate prin procesul EIP.

Oricine din comunitatea Ethereum are capacitatea de a crea un EIP. Liniile directoare pentru scrierea EIP-urilor sunt incluse în [EIP 1](https://eips.ethereum.org/EIPS/eip-1). EIP-urile ar trebui să furnizeze o specificație tehnică foarte concisă a caracteristicii raționamentul său. Autorul EIP-ului este responsabil pentru crearea consensului în cadrul comunității și documentarea opiniilor contrare. Având în vedere nivelul tehnic ridicat necesar pentru trimiterea unui EIP bine format, istoric, majoritatea autorilor de EIP-uri au fost programatori de aplicații sau de protocol.

## De ce contează EIP-urile? {#why-do-eips-matter}

EIP-urile joacă un rol central în modul în care se produc schimbările și sunt documentate pe Ethereum. Acestea sunt modalitatea prin care oamenii pot propune, dezbate și adopta schimbări. Există [diferite tipuri de EIP-uri](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), inclusiv EIP-uri de bază pentru modificări de protocol de nivel scăzut care afectează consensul și necesită o actualizare a rețelei, precum și ERC-uri pentru standardele de aplicație. De exemplu, standardele pentru crearea de tokenuri, cum ar fi [ERC20](https://eips.ethereum.org/EIPS/eip-20) sau [ERC721](https://eips.ethereum.org/EIPS/eip-721) permit aplicațiilor care interacționează cu aceste tokenuri să trateze tokenurile folosind aceleași reguli, ceea ce face mai ușoară crearea de aplicații inter-operabile.

Fiecare actualizare de rețea constă dintr-un set de EIP-uri care trebuie implementate de fiecare [client Ethereum](/learn/#clients-and-nodes) din rețea. Acest lucru implică faptul că, pentru a rămâne în consens cu alți clienți de pe rețeaua principală Ethereum, programatorii de clienți trebuie să se asigure că au implementat toate EIP-urile necesare.

Împreună cu furnizarea unei specificații tehnice pentru schimbări, EIP-urile sunt unitatea în jurul căreia are loc guvernarea în Ethereum: oricine este liber să propună una, iar apoi diferiți actori din comunitate, vor dezbate pentru a determina dacă ar trebui să fie adoptat ca standard sau inclus într-un upgrade de rețea. Deoarece EIP-urile care nu sunt de bază (non-core) nu trebuie să fie adoptate de toate aplicațiile (de exemplu, poți crea un token non-[ERC20](https://eips.ethereum.org/EIPS/eip-20)), dar EIP-urile de bază trebuie adoptate pe scară largă (deoarece toate nodurile trebuie să actualizeze pentru a rămâne parte din aceeași rețea), EIP-urile de bază necesită un consens mai larg în cadrul comunității decât EIP-urile non-core.

## Istoric EIP-uri {#history-of-eips}

[Depozitul GitHub pentru Propunerile de Îmbunătățire Ethereum (EIPs)](https://github.com/ethereum/EIPs) a fost creat în octombrie 2015. Procesul EIP se bazează pe procesul de [Propuneri de Îmbunătățire Bitcoin (BIP)](https://github.com/bitcoin/bips), care în sine se bazează pe procesul de [Propuneri de Îmbunătățire Python (PEP)](https://www.python.org/dev/peps/).

Editorii EIP sunt însărcinați cu revizuirea EIP-urilor pentru a stabili caracterul tehnic, ortografia corectă/gramatica și stilul de cod. Martin Becze, Vitalik Buterin, Gavin Wood și câțiva alții au fost editorii de EIP-uri inițiali din 2015 până la sfârșitul anului 2016. Actualii editori de EIP-uri sunt:

- Alex Beregszaszi (EWASM/Fundația Ethereum)
- Greg Colvin (Comunitate)
- Casey Detrio (EWASM/Fundația Ethereum)
- Hudson James (Fundația Ethereum)
- Nick Johnson (ENS)
- Nick Savers (Comunitate)

## Află mai multe {#learn-more}

Dacă ești interesat să citești mai multe despre EIP-uri, consultă [site-ul EIP-urilor](https://eips.ethereum.org/) unde poți găsi informații suplimentare, inclusiv:

- [Diferitele tipuri de EIP-uri](https://eips.ethereum.org/)
- [O listă cu fiecare EIP care a fost creat](https://eips.ethereum.org/all)
- [Stările EIP-urilor și ce înseamnă acestea](https://eips.ethereum.org/)

## Participă {#participate}

Dacă ești interesat să urmărești sau să-ți împărtășești opinia despre EIP-uri, consultă [forumul Ethereum Magicians](https://ethereum-magicians.org/), unde EIP-urile sunt discutate cu comunitatea.

Vezi de asemenea:

- [Cum se creează un EIP](https://eips.ethereum.org/EIPS/eip-1)

## Referințe {#references}

<cite class="citation">

Conținutul paginii furnizat parțial din [Guvernarea Dezvoltării Protocolului Ethereum și Coordonarea Actualizării Rețelei] (https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) de Hudson Jameson

</cite>
