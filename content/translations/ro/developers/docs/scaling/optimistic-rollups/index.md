---
title: Rollup-uri Optimistic
description: Introduction to optimistic rollups
lang: ro
---

## Cerințe prealabile {#prerequisites}

Ar trebui să înţelegeţi bine toate subiectele fundamentale și să aveţi un nivel înalt de înţelegere a [scalării în Ethereum](/developers/docs/scaling/). Implementarea soluțiilor de scalare, cum ar fi rollup-urile, este un subiect avansat, deoarece tehnologia este mai puțin testată în luptă și se află în continuare în faza de cercetare şi dezvoltare.

## Rollup-uri Optimistic {#optimistic-rollups}

Rollup-urile Optimistic stau în paralel cu lanțul Ethereum principal pe nivelul 2. Ele pot ameliora scalabilitatea, deoarece nu fac niciun calcul în mod implicit. În schimb, după o tranzacție, acestea propun noua stare către Mainnet sau „legalizează” tranzacția.

Cu rollup-urile Optimistic, tranzacțiile sunt scrise în lanțul Ethereum principal ca şi `calldata`, optimizându-le și mai mult prin reducerea costului gazului.

Deoarece calculul este partea lentă și costisitoare a utilizării lui Ethereum, rollup-urile Optimistic pot oferi ameliorarea de până la 10-100 de ori a scalabilității, în funcție de tranzacție. Acest număr va crește și mai mult odată cu introducerea [lanţurilor de fragmente](/roadmap/danksharding), deoarece vor fi disponibile mai multe date dacă o tranzacție este contestată.

### Contestarea tranzacțiilor {#disputing-transactions}

Rollup-urile Optimistic nu calculează tranzacția, deci trebuie să existe un mecanism care să garanteze că tranzacțiile sunt legitime, și nu frauduloase. Aici intervin dovezile de fraudă. Dacă cineva observă o tranzacție frauduloasă, rollup-ul va executa o dovadă de fraudă și va rula calculul tranzacției, utilizând datele de stare disponibile. Aceasta înseamnă că s-ar putea să aveți durate de așteptare mai lungi pentru confirmarea tranzacției decât un rollup-ZK, deoarece tranzacția ar putea fi contestată.

![Diagramă care arată ce se întâmplă atunci când are loc o tranzacție frauduloasă într-un rollup Optimistic pe Ethereum](./optimistic-rollups.png)

Gazul de care aveţi nevoie pentru a calcula dovada fraudelor este chiar rambursat. Ben Jones, de la Optimism, descrie sistemul de obligaţii existent:

_„toți cei care ar fi în măsură să efectueze o acţiune pe care dvs. ar trebui să o dovediţi frauduloasă ca să vă asiguraţi fondurile vă solicită să postaţi o obligaţie. Practic, luaţi niște ETH și îl blocaţi și spuneţi: „Hei, promit să spun adevărul”... Dacă nu spun adevărul și se dovedește că am comis o fraudă, voi fi penalizat din acești bani. Nu numai că voi fi penalizat din acești bani, dar o parte din ei vor plăti gazul celor care l-au cheltuit făcând dovada fraudei mele_"

Prin urmare, puteți vedea stimulentele: participanții sunt penalizați pentru fraudă și sunt rambursați pentru dovedirea fraudei.

### Avantaje și dezavantaje {#optimistic-pros-and-cons}

| Avantaje                                                                                                                     | Dezavantaje                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Orice puteţi face pe nivelul 1 Ethereum puteţi face cu rollup-urile Optimistic, deoarece este compatibil cu EVM și Solidity. | Duratele lungi de așteptare pentru tranzacțiile on-chain, datorită potențialelor provocări legate de fraudă. |
| Toate datele tranzacțiilor sunt stocate pe nivelul 1 al lanțului, ceea ce înseamnă că este securizat și descentralizat.      | Un operator poate influența ordonarea tranzacțiilor.                                                         |

### O explicație vizuală a rollup-urilor optimistic {#optimistic-video}

Urmăriți cum explică Finematics rollup-urile optimistic:

<YouTube id="7pWxCklcNsU" start="263" />

**Optimistic rollups reading**

- [Ghidul esențial pentru Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Cum funcționează cu adevărat Rollup-ul Optimistic?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
