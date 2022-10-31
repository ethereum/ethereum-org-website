---
title: Introducere despre Ethereum
description: Introducere din partea unui dezvoltator de aplicații dapp despre conceptele de bază ale lui Ethereum.
lang: ro
---

## Ce este un blockchain? {#what-is-a-blockchain}

Un blockchain este o bază de date publică, actualizată și partajată pe mai multe computere dintr-o rețea.

„Blocul” se referă la faptul că datele și starea sunt stocate în grupuri sau „blocuri” secvențiale. Dacă trimiteți ETH altcuiva, datele tranzacției trebuie adăugate la un bloc pentru ca aceasta să se producă.

„Lanțul” se referă la faptul că fiecare bloc este legat prin referinţă criptografică de părintele său. Altfel spus, blocurile se leagă în lanț. Datele dintr-un bloc nu pot fi modificate fără a schimba toate blocurile ulterioare, ceea ce ar necesita consensul întregii rețele.

Fiecare computer din rețea trebuie să fie de acord cu fiecare bloc nou și cu lanțul ca întreg. Aceste computere sunt cunoscute sub denumirea de „noduri”. Nodurile garantează că toți cei care interacționează cu blockchain-ul au aceleași date. Pentru a realiza acest acord distribuit, blockchain-urile au nevoie de un mecanism de consens.

Ethereum utilizează în prezent ca mecanism de consens [dovada-muncii (proof-of-work](/developers/docs/consensus-mechanisms/pow/)). Aceasta înseamnă că oricine dorește să adauge noi blocuri în lanț trebuie să rezolve un puzzle dificil, care necesită multă putere de calcul. Rezolvarea puzzle-ului „dovedește” că aţi cheltuit resurse de calcul pentru efectuarea muncii. Acest lucru este cunoscut sub numele de [minare](/developers/docs/consensus-mechanisms/pow/mining/). Minarea este de obicei un proces de încercare și eroare prin forță brută, dar prin adăugarea cu succes a unui bloc se primeşte o recompensă în ETH.

Noile blocuri sunt transmise către nodurile din rețea, sunt controlate și verificate, actualizând astfel starea blockchain-ului pentru toată lumea.

Deci, pentru a rezuma, atunci când trimiteţi ETH cuiva, tranzacția trebuie să fie minată și inclusă într-un bloc nou. Starea actualizată este apoi partajată cu întreaga rețea.

Urmăriţi cum Austin vă conduce prin blockchain-uri:

<YouTube id="zcX7OJ-L8XQ" />

Dacă doriți să vedeți cum blockchain-ul hash-ează datele și apoi blocul anterior face referire la toate blocurile anterioare, consultați [acest demo](https://andersbrownworth.com/blockchain/blockchain) de Anders Brownworth și urmăriți videoclipul care-l însoțește mai jos.

Urmăriți-l pe Anders explicând despre hash-urile din blockchain-uri:

<YouTube id="_160oMzblY8" />

## Ce este Ethereum? {#what-is-ethereum}

În universul Ethereum există un computer unic, canonic (numit Mașina Virtuală Ethereum sau EVM), asupra a cărui stare toată lumea din rețeaua Ethereum este de acord. Toți cei care participă la rețeaua Ethereum (fiecare nod Ethereum) păstrează o copie a stării acestui computer. În plus, orice participant poate difuza o cerere pentru ca acest computer să efectueze calcule arbitrare. Ori de câte ori este transmisă o astfel de cerere, ceilalți participanți din rețea verifică, validează și efectuează („execută”) calculul. Această execuție determină o schimbare de stare în EVM, care este săvârşită și propagată în întreaga rețea.

Cererile de calcul se numesc cereri de tranzacție; înregistrarea tuturor tranzacțiilor și a stării actuale a EVM se stochează în blockchain, care, la rândul său, este stocat și aprobat de toate nodurile.

Mecanismele criptografice garantează că, odată ce tranzacțiile sunt verificate ca fiind valide și adăugate la blockchain, acestea nu mai pot fi modificate ulterior. Aceleași mecanisme garantează şi că toate tranzacțiile sunt semnate și executate cu „permisiunile” corespunzătoare (nimeni nu ar trebui să poată trimite active digitale din contul lui Alice, cu excepția lui Alice însăși).

## Ce este ether-ul? {#what-is-ether}

**Ether-ul (ETH)** este criptomoneda nativă a lui Ethereum. Scopul ether-ului este de a permite crearea unei piețe pentru calcule. O astfel de piață furnizează un stimulent economic pentru participanții care verifică și execută cererile de tranzacție și furnizează resurse de calcul pentru rețea.

Oricare participant care difuzează o cerere de tranzacție trebuie să ofere şi o anumită cantitate de ether rețelei ca recompensă. Recompensa va fi acordată oricui va efectua în final munca de verificare a tranzacției, de executare a acesteia, de înscriere în blockchain și de difuzare a acesteia în rețea.

Suma de ether plătită corespunde cu timpul necesar pentru efectuarea calculului. De asemenea, aceste recompense împiedică participanții rău intenționați să blocheze în mod intenționat rețeaua prin solicitarea executării unor calcule infinite sau a altor scripturi care consumă multe resurse, deoarece acești participanți trebuie să plătească pentru timpul de calcul.

## Ce sunt contractele inteligente? {#what-are-smart-contracts}

În practică, participanții nu scriu un cod nou ori de câte ori doresc să solicite un calcul pe EVM. Rather, application developers upload programs (reusable snippets of code) into EVM state, and users make requests to execute these code snippets with varying parameters. Numim programele încărcate și executate de rețea contracte inteligente.

La nivel elementar, puteţi considera că un contract inteligent este un fel de distribuitor automat: un script care, atunci când este apelat cu anumiți parametri, efectuează anumite acțiuni sau calcule dacă sunt îndeplinite anumite condiții. De exemplu, un contract inteligent simplu de vânzător ar putea crea și atribui proprietatea asupra unui activ digital dacă apelantul trimite ether la un anumit destinatar.

Orice dezvoltator poate crea un contract inteligent și îl poate face public în rețea, folosind blockchain-ul ca nivel de date, în schimbul unei taxe plătite rețelei. Orice utilizator poate apoi să apeleze contractul inteligent pentru a-i executa codul, tot în schimbul unei taxe plătite rețelei.

Astfel, cu ajutorul contractelor inteligente, dezvoltatorii pot construi și implementa în mod arbitrar aplicații și servicii complexe orientate către utilizator, cum ar fi: piețe, instrumente financiare, jocuri etc.

## Terminologie {#terminology}

### Blockchain {#blockchain}

Succesiunea tuturor blocurilor care au fost alocate rețelei Ethereum în istoricul rețelei. Este numit așa deoarece fiecare bloc conține o referință la blocul anterior, care ne ajută să menținem o ordonare a tuturor blocurilor (și astfel, o ordine istorică precisă).

### ETH {#eth}

Criptomoneda nativă a Ethereum. Utilizatorii plătesc ether altor utilizatori pentru a li se îndeplini cererile de executare a codului.

[Aflați mai multe despre ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Mașina virtuală Ethereum este un computer virtual mondial a cărui stare este stocată și asupra căreia fiecare participant la rețeaua Ethereum își dă acordul. Orice participant poate solicita executarea codului arbitrar pe EVM; executarea codului modifică starea EVM.

[Mai multe despre EVM](/developers/docs/evm/)

### Noduri {#nodes}

Mașinile din viața reală care stochează starea EVM. Nodurile comunică între ele pentru a propaga informații despre starea EVM și noile schimbări de stare. Orice utilizator poate de asemenea să solicite executarea de cod prin difuzarea unei cereri de executare de cod de la un nod. Rețeaua Ethereum în sine este agregatul tuturor nodurilor Ethereum și a comunicațiilor acestora.

[Mai multe despre noduri](/developers/docs/nodes-and-clients/)

### Conturi {#accounts}

Unde este stocat etherul. Utilizatorii pot inițializa conturi, pot depune etehr în conturi și pot transfera ether din conturile lor către alți utilizatori. Conturile și soldurile conturilor sunt stocate într-un tabel mare în EVM; acestea fac parte din starea generală a EVM.

[Mai multe despre conturi](/developers/docs/accounts/)

### Tranzacții {#transactions}

O „cerere de tranzacție” este termenul formal pentru o cerere de execuție de cod pe EVM, iar o „tranzacție” este o cerere de tranzacție îndeplinită și modificarea conexă a stării EVM. Orice utilizator poate transmite o cerere de tranzacție către rețea dintr-un nod. Pentru ca cererea de tranzacție să afecteze starea convenită a EVM, aceasta trebuie validată, executată și „confirmată în rețea” de către un alt nod. Executarea oricărui cod determină o schimbare de stare în EVM; în momentul angajării, această schimbare de stare este transmisă către toate nodurile din rețea. Câteva exemple de tranzacții:

- Trimiterea de X ether din contul meu în contul lui Alice.
- Publish some smart contract code into EVM state.
- Executaţi codul contractului inteligent la adresa X din EVM, cu argumentele Y.

[Mai multe despre tranzacții](/developers/docs/transactions/)

### Blocuri {#blocks}

Volumul tranzacțiilor este foarte mare, de aceea tranzacțiile sunt „confirmate” în loturi sau blocuri. Blocurile conțin în general zeci până la sute de tranzacții.

[Mai multe despre blocuri](/developers/docs/blocks/)

### Contracte inteligente {#smart-contracts}

A reusable snippet of code (a program) which a developer publishes into EVM state. Oricine poate solicita executarea codului de contract inteligent făcând o cerere de tranzacție. Deoarece programatorii pot scrie aplicații executabile arbitrare în EVM (jocuri, piețe, instrumente financiare etc.) prin publicarea de contracte inteligente, acestea sunt adesea numite și [dapp-uri sau Aplicații descentralizate](/developers/docs/dapps/).

[Mai multe despre contractele inteligente](/developers/docs/smart-contracts/)

## Referințe suplimentare {#further-reading}

- [Cartea albă Ethereum](/whitepaper/)
- [Cum funcționează Ethereum de fapt?](https://www.preethikasireddy.com/post/how-does-ethereum-work-anyway) - _Preethi Kasireddy_

_Cunoașteți o resursă a comunității care v-a ajutat? Editaţi această pagină și adăugaţi--o!_

## Tutoriale corelate {#related-tutorials}

- [Un ghid al dezvoltatorului pentru Ethereum, partea 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– O explorare a lui Ethereum foarte uşor de utilizat de către începători, folosind Python și web3.py_
