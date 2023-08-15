---
title: Canalele de stare
description: Introducere despre canalele de stare și canalele de plată ca soluție de scalare utilizată actualmente de comunitatea Ethereum.
lang: ro
incomplete: true
sidebarDepth: 3
---

Canalele de stare permit participanților să tranzacționeze off-chain `de` un număr de ori, în timp ce trimit doar două tranzacții on-chain către rețeaua Ethereum. Aceasta permite efectuarea unui număr extrem de mare de tranzacții.

## Condiții prealabile {#prerequisites}

Ar trebui să înţelegeţi bine toate subiectele fundamentale și să aveţi un nivel înalt de înţelegere a [scalării în Ethereum](/developers/docs/scaling/). Implementarea soluțiilor de scalare, cum ar fi canalele, este un subiect avansat, deoarece tehnologia este mai puțin testată în luptă și se află în continuare în faza de cercetare şi dezvoltare.

## Canale {#channels}

Participanții trebuie să blocheze o parte din starea Ethereum, ca un depozit ETH, într-un contract multisig. Un contract multisig este un tip de contract care necesită semnarea (și prin urmare, acordul) mai multor chei private pentru a fi executat.

Blocarea stării în acest mod este prima tranzacție și deschide canalul. Participanții pot tranzacționa rapid și liber off-chain. Când interacțiunea este finalizată, este trimisă o tranzacție finală on-chain, care deblochează starea.

**Util pentru**:

- o mulțime de actualizări de stare
- atunci când numărul de participanți este cunoscut în avans
- atunci când participanții sunt întotdeauna disponibili

Există două tipuri de canale în acest moment: canale de stare și canale de plată.

## Canalele de stare {#state-channels}

Canalele de stare sunt poate cel mai bine explicate printr-un exemplu, cum ar fi un joc de tic tac toe:

1. Creează un contract inteligent multisig „Judecător” pe lanțul principal Ethereum care înțelege regulile tic-tac-toe și îi poate identifica pe Alice și pe Bob ca fiind cei doi jucători din jocul nostru. Acest contract deține un premiu de 1 ETH.

2. Apoi Alice și Bob încep să joace, deschizând canalul de stare. Fiecare mișcare creează o tranzacție off-chain care conține un „nonce”, ceea ce înseamnă că putem întotdeauna spune ulterior în ce ordine au avut loc mutările.

3. Când există un câștigător, acesta închide canalul trimiţând starea finală (de exemplu, o listă de tranzacții) la contractul Judecător, plătind doar o singură taxă de tranzacție. Judecătorul se asigură că această „stare finală” este semnată de ambele părți și așteaptă un timp pentru a se asigura că nimeni nu poate contesta în mod legitim rezultatul, iar apoi plătește premiul de 1 ETH lui Alice.

## Canalele de plată {#payment-channels}

Canale de stare simplificate care se ocupă doar de plăți (de exemplu, transferurile de ETH). Acestea permit transferuri off-chain între doi participanți, atâta timp cât suma netă a transferurilor lor nu depășește tokenurile depuse.

## Avantaje și dezavantaje {#channels-pros-and-cons}

| Avantaje                                                                             | Dezavantaje                                                                                                                                                |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Retragere/plată instantanee pe Mainnet (dacă ambele părți ale unui canal cooperează) | Durata și costul configurării și stabilirii unui canal - nu sunt atât de utile pentru tranzacțiile ocazionale unice între utilizatori arbitrari.           |
| Este posibil un flux extrem de ridicat                                               | Trebuie să urmăriţi periodic rețeaua (cerința de „liveness”) sau să delegaţi această responsabilitate altcuiva pentru a vă asigura securitatea fondurilor. |
| Cel mai mic cost pe tranzacție - utile pentru microplăți în streaming                | Trebuie să blocaţi fonduri în canalele de plată deschise                                                                                                   |
|                                                                                      | Nu acceptă participarea deschisă                                                                                                                           |

## Utilizarea canalelor de stare {#use-state-channels}

Numeroase proiecte oferă implementări ale canalelor de stare pe care le puteți integra în aplicațiile dvs. dapp:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Referințe suplimentare {#further-reading}

**Canale de stare**

- [Înţelegerea soluţiilor de scalare de nivelul 2 în Ethereum: canalele de stare, Plasma şi Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 februarie 2018_
- [Canalele de stare - o explicaţie](https://www.jeffcoleman.ca/state-channels/) _5 noiembrie 2015 - Jeff Coleman_
- [Cunoştinţe de bază despre canalele de stare](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Canale de plată**

_Cunoașteți o resursă a comunității care v-a ajutat? Editaţi această pagină și adăugaţi-o!_
