---
title: Lanțurile Plasma
description: O introducere despre lanțurile plasma ca soluție de scalare utilizată actualmente de comunitatea Ethereum.
lang: ro
incomplete: true
sidebarDepth: 3
---

A plasma chain is a separate blockchain that is anchored to the main Ethereum chain, and uses fraud proofs (like [optimistic rollups](/developers/docs/scaling/optimistic-rollups/)) to arbitrate disputes. Aceste lanțuri sunt denumite uneori lanțuri „copil”, deoarece sunt în esență o copie mai mică a Mainnet-ului Ethereum. Arborii Merkle permit crearea unei stive nelimitate de astfel de lanțuri, care pot lucra la descongestionarea lățimii de bandă de pe lanțurile părinte (inclusiv Mainnet). Acestea își obțin securitatea prin [dovezile de fraudă](/glossary/#fraud-proof), iar fiecare lanț copil are propriul său mecanism de validare a blocurilor.

## Condiții prealabile {#prerequisites}

Ar trebui să înţelegeţi bine toate subiectele fundamentale și să aveţi un nivel înalt de înţelegere a [scalării în Ethereum](/developers/docs/scaling/). Implementarea soluțiilor de scalare, cum ar fi Plasma, este un subiect avansat, deoarece tehnologia este mai puțin testată în luptă și se află în continuare în faza de cercetare şi dezvoltare.

## Avantaje şi dezavantaje {#pros-and-cons}

| Avantaje                                                                                                                                                             | Dezavantaje                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Randament ridicat, cost redus pe tranzacție.                                                                                                                         | Nu acceptă calculul general. Numai transferurile de bază, swap-urile și alte câteva tipuri de tranzacții sunt acceptate prin logica predicată.                                                      |
| Bun pentru tranzacțiile între utilizatori arbitrari (fără cheltuieli indirecte pentru fiecare pereche de utilizatori dacă ambele sunt stabilite pe lanțul de plasmă) | Trebuie să urmăriţi periodic rețeaua (cerința de „liveness”) sau să delegaţi această responsabilitate altcuiva pentru a vă asigura securitatea fondurilor.                                          |
|                                                                                                                                                                      | Se bazează pe unul sau mai mulți operatori pentru a stoca date și a le furniza la cerere.                                                                                                           |
|                                                                                                                                                                      | Retragerile au întârzieri de câteva zile pentru a permite provocările. Pentru activele fungibile, acest lucru poate fi atenuat de furnizorii de lichidități, dar există un cost de capital asociat. |

### Utilizarea Plasma {#use-plasma}

Numeroase proiecte oferă implementări ale Plasma pe care le puteți integra în aplicațiile dvs. dapp:

- [OMG Network](https://omg.network/)
- [Polygon](https://polygon.technology/) (anterior Matic Network)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Referințe suplimentare {#further-reading}

- [EthHub pe Plasma](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/plasma/)
- [Învățați Plasma](https://www.learnplasma.org/en/)

_Cunoașteți o resursă a comunității care v-a ajutat? Editați această pagină și adăugați-o!_
