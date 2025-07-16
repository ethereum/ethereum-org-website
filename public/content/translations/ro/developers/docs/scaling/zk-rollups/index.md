---
title: Zero-Knowledge Rollups
description: Introduction to zero-knowledge rollups
lang: ro
---

## Cerințe prealabile {#prerequisites}

Ar trebui să înţelegeţi bine toate subiectele fundamentale și să aveţi un nivel înalt de înţelegere a [scalării în Ethereum](/developers/docs/scaling/). Implementarea soluțiilor de scalare, cum ar fi rollup-urile, este un subiect avansat, deoarece tehnologia este mai puțin testată în luptă și se află în continuare în faza de cercetare şi dezvoltare.

## Rollup-uri Zero-knowledge {#zk-rollups}

**Zero-knowledge rollups (ZK-rollups)** bundle (or "roll-up") hundreds of transfers off-chain and generate a cryptographic proof. These proofs can come in the form of SNARKs (succinct non-interactive argument of knowledge) or STARKs (scalable transparent argument of knowledge). SNARKs and STARKs are known as validity proofs and get posted to layer 1.

Contractul inteligent de tip ZK-rollup păstrează starea tuturor transferurilor pe nivelul 2, iar această stare poate fi actualizată numai cu o dovadă de valabilitate. Aceasta înseamnă că ZK-rollup-urile au nevoie doar de dovada de validitate în loc de toate datele de tranzacție. Cu un ZK-rollup, validarea unui bloc este mai rapidă și mai ieftină, întrucât sunt incluse mai puține date.

Cu un ZK-rollup, nu există întârzieri atunci când se transferă fonduri de la nivelul 2 la nivelul 1, deoarece o dovadă de valabilitate acceptată de contractul ZK-rollup a verificat deja fondurile.

Fiind pe nivelul 2, ZK-rollup-urile pot fi optimizate pentru reducerea și mai mare a dimensiunii tranzacției. De exemplu, un cont este reprezentat mai degrabă de un index decât de o adresă, care reduce o tranzacție de la 32 de octeți la doar 4 octeți. Tranzacțiile sunt, de asemenea, scrise în Ethereum ca `calldata`, ceea ce reduce gazul.

### Avantaje și dezavantaje {#zk-pros-and-cons}

| Avantaje                                                                                                                      | Dezavantaje                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Timp de finalitate mai rapid, deoarece starea este verificată instantaneu odată ce dovezile sunt trimise în lanțul principal. | Unele nu sunt compatibile cu EVM.                                                                                                   |
| Nu sunt vulnerabile la atacurile economice la care pot fi vulnerabile [Rollup-urile Optimistic](#optimistic-pros-and-cons).   | Dovezile de validitate necesită un mare număr de calcule – nu merită să fie folosite pentru aplicații cu activitate redusă pe lanț. |
| Securizat și descentralizat, deoarece datele necesare pentru recuperarea stării sunt stocate pe lanțul de nivel 1.            | Un operator poate influența ordonarea tranzacțiilor                                                                                 |

### O explicație vizuală a ZK-rollup-urilor {#zk-video}

Urmăriți Finematics explicând ZK-rollup-urile:

<YouTube id="7pWxCklcNsU" start="406" />

**ZK-rollups reading**

- [Ce sunt rollup-urile Zero-Knowledge?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
