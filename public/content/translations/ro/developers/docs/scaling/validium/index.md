---
title: Validium
description: O introducere despre Validium ca soluție de scalare utilizată actualmente de comunitatea Ethereum.
lang: ro
incomplete: true
sidebarDepth: 3
---

Folosește dovezi de validitate, cum ar fi [rZK-rollup-urile](/developers/docs/scaling/zk-rollups/), dar datele nu sunt stocate pe nivelul 1 al lanțului principal al lui Ethereum. Aceasta poate duce la efectuarea a 10.000 de tranzacții pe secundă pe fiecare lanţ validium și se pot rula în paralel mai multe lanţuri.

## Condiții prealabile {#prerequisites}

Ar trebui să înţelegeţi bine toate subiectele fundamentale și să aveţi un nivel înalt de înţelegere a [scalării în Ethereum](/developers/docs/scaling/). Implementarea soluțiilor de scalare, cum ar fi Validium, este un subiect avansat, deoarece tehnologia este mai puțin testată în luptă și se află în continuare în faza de cercetare şi dezvoltare.

## Avantaje și dezavantaje {#pros-and-cons}

| Avantaje                                                                                                                              | Dezavantaje                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nu sunt întârzieri la retragere (fără latență tx în-lanț/între-lanțuri); în consecință, o mai mare eficiență a capitalului.           | Compatibilitate limitată pentru calcule generale/contracte inteligente; necesită limbaje specializate.                                                                      |
| Nu este vulnerabil la anumite atacuri economice cu care se confruntă sistemele bazate pe dovada-fraudei în aplicații de mare valoare. | Este necesară putere de calcul ridicată pentru a genera probe ZK; nu este eficient din punct de vedere al costurilor pentru aplicațiile cu flux redus.                      |
|                                                                                                                                       | Finalitate subiectivă mai lentă (durează 10-30 min să genereze o dovadă ZK) (dar finalitatea completă este mai rapidă, deoarece nu există întârziere din cauza disputelor). |
|                                                                                                                                       | Generarea unei dovezi necesită ca datele off-chain să fie disponibile în permanență.                                                                                        |

### Utilizarea Validium {#use-validium}

Numeroase proiecte oferă implementări ale Validium pe care le puteți integra în aplicațiile dvs. dapp:

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)

## Referințe suplimentare {#further-reading}

- [Validium şi doi câte doi pe nivelul 2 — Numărul 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_Cunoașteți o resursă a comunității care v-a ajutat? Editaţi această pagină și adăugaţi-o!_
