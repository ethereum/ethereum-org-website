---
title: Introducere în Ethereum
description: Introducere a unui programator de aplicații dapp la conceptele de bază ale Ethereum.
lang: ro
sidebar: true
---

## Ce este un blockchain? {#what-is-a-blockchain}

Un blockchain este cel mai bine descris ca o bază de date publică, actualizată și partajată pe mai multe computere dintr-o rețea.

„Bloc” se referă la faptul că datele și starea sunt stocate în loturi sau „blocuri” secvențiale. Dacă trimiți ETH altcuiva, datele tranzacției trebuie adăugate la un bloc pentru ca acesta să aibă succes.

„Lanț” se referă la faptul că fiecare bloc se referă criptografic la părintele său. Datele unui bloc nu pot fi modificate fără a schimba toate blocurile ulterioare, care ar necesita consensul întregii rețele.

Fiecare nou bloc și lanțul ca un ansamblu, trebuie să fie agreate de fiecare nod din rețea. Aceasta pentru că toată lumea are aceleași date. Pentru ca acest lucru să funcționeze, blockchain-urile au nevoie de un mecanism de consens.

Ethereum utilizează în prezent dovada muncii ca mecanism de consens. Aceasta înseamnă că oricine dorește să adauge noi blocuri în lanț trebuie să rezolve un puzzle dificil la care ai nevoie de multă putere de calcul pentru a lucra. Rezolvarea puzzle-ului „dovedește” că ai cheltuit resursele de calcul. Acest lucru este cunoscut sub numele de [minerit](/developers/docs/consensus-mechanisms/pow/mining/). Mineritul poate fi încercare și eroare, dar adăugarea cu succes a unui bloc este recompensată în Eth. Pe de altă parte, trimiterea blocurilor frauduloase nu este o opțiune atractivă, având în vedere resursele pe care le-ai cheltuit pentru producerea blocului.

Blocurile noi sunt transmise către nodurile din rețea, controlate și verificate, actualizând starea pentru toată lumea.

Deci, pentru a rezuma, atunci când trimiți ETH cuiva, tranzacția trebuie să fie minată și inclusă într-un bloc nou. Starea actualizată este apoi partajată cu întreaga rețea. Mai multe detalii despre aceasta mai jos.

Urmărește cum Austin te conduce prin blockchain-uri:

<YouTube id="zcX7OJ-L8XQ" />

## Ce este Ethereum? {#what-is-ethereum}

În universul Ethereum, există un computer unic, canonic (numit Mașina Virtuală Ethereum sau EVM) a cărui stare este de acord cu toată lumea din rețeaua Ethereum. Toți cei care participă la rețeaua Ethereum (fiecare nod Ethereum) păstrează o copie a stării acestui computer. În plus, orice participant poate difuza o cerere pentru ca acest computer să efectueze calcule arbitrare. Ori de câte ori o astfel de cerere este difuzată, alți participanți din rețea verifică, validează și efectuează („execută”) calculul. Acest lucru provoacă o schimbare de stare în EVM, care este angajată și propagată în întreaga rețea.

Cererile de calcul se numesc cereri de tranzacție; evidența tuturor tranzacțiilor, precum și a stării actuale a EVM este stocată în blockchain, care la rândul său este stocat și agreat de toate nodurile.

Mecanismele criptografice asigură faptul că, odată ce tranzacțiile sunt verificate ca fiind valide și adăugate la blockchain, acestea nu pot fi modificate ulterior; aceleași mecanisme asigură, de asemenea, că toate tranzacțiile sunt semnate și executate cu „permisiuni” corespunzătoare (nimeni nu ar trebui să poată trimite active digitale din contul lui Alice, cu excepția ei însăși).

## Ce este eterul? {#what-is-ether}

Scopul eterului, criptomoneda, este de a permite existența unei piețe a calculului. O astfel de piață oferă un stimulent economic participanților pentru a verifica/executa cereri de tranzacții și pentru a furniza resurse de calcul rețelei.

Orice participant care transmite o cerere de tranzacție trebuie să ofere, de asemenea, o cantitate de eter rețelei, ca o recompensă care trebuie acordată oricui face în cele din urmă munca de verificare a tranzacției, executarea acesteia, angajarea acesteia în blockchain și difuzarea acesteia în rețea.

Cantitatea de eter plătită este în funcție de durată a calculului. Acest lucru împiedică, de asemenea, participanții rău intenționați să blocheze în mod intenționat rețeaua, solicitând executarea unor bucle infinite sau scripturi cu resurse intense, deoarece acești actori vor fi taxați continuu.

## Ce sunt aplicațiile dapp? {#what-are-dapps}

În practică, participanții nu scriu un cod nou de fiecare dată când doresc să solicite un calcul pe EVM. Mai degrabă, programatorii de aplicații încarcă programe (fragmente de cod reutilizabile) în stocarea EVM, iar apoi utilizatorii fac cereri pentru executarea acestor fragmente de cod cu parametri diferiți. Programele încărcate și executate de rețea le numim contracte inteligente.

La un nivel foarte de bază, te poți gândi la un contract inteligent ca un fel de automat: un script care, atunci când este apelat cu anumiți parametri, efectuează unele acțiuni sau calcule dacă sunt îndeplinite anumite condiții. De exemplu, un contract inteligent simplu de vânzător ar putea crea și atribui proprietatea asupra unui activ digital dacă apelantul trimite eter la un anumit destinatar.

Orice programator poate crea un contract inteligent și îl poate face public în rețea, folosind blockchain-ul ca un nivel propriu de date, contra unei taxe plătită rețelei. Orice utilizator poate apela apoi contractul inteligent pentru a-i executa codul, din nou contra unei taxe plătite rețelei.

Astfel, prin contractele inteligente, programatorii pot construi și implementa aplicații și servicii arbitrare complexe orientate către utilizatori: piețe, instrumente financiare, jocuri etc.

## Terminologie {#terminology}

### Blockchain {#blockchain}

Secvența tuturor blocurilor care au fost încredințate rețelei Ethereum în istoria rețelei. Este numit așa deoarece fiecare bloc conține o referință la blocul anterior, care ne ajută să menținem o ordonare asupra tuturor blocurilor (și astfel, asupra istoricului precis).

### ETH {#eth}

Criptomoneda nativă a Ethereum. Utilizatorii plătesc eter altor utilizatori pentru ca cererile lor de executare a codului să fie îndeplinite.

### EVM {#evm}

Mașina Virtuală Ethereum este computerul virtual global a cărei stare este stocată și aprobată de fiecare participant la rețeaua Ethereum. Orice participant poate solicita executarea codului arbitrar pe EVM; executarea codului modifică starea EVM.

[Mai multe despre EVM](/developers/docs/evm/)

### Noduri {#nodes}

Mașinile din viața reală care stochează starea EVM. Nodurile comunică între ele pentru a propaga informații despre starea EVM și schimbările de stare noi. Orice utilizator poate solicita, de asemenea, executarea codului transmițând o cerere de executare a codului dintr-un nod. Rețeaua Ethereum în sine este agregatul tuturor nodurilor Ethereum și a comunicațiilor acestora.

[Mai multe despre noduri](/developers/docs/nodes-and-clients/)

### Conturi {#accounts}

Unde este stocat eterul. Utilizatorii pot inițializa conturi, pot depune eter în conturi și pot transfera eter din conturile lor către alți utilizatori. Conturile și soldurile conturilor sunt stocate într-un tablou mare în EVM; acestea fac parte din starea generală a EVM.

[Mai multe despre conturi](/developers/docs/accounts/)

### Tranzacții {#transactions}

O „cerere de tranzacție” este termenul formal pentru o cerere de executare a codului pe EVM, iar o „tranzacție” este o cerere de tranzacție îndeplinită și modificarea asociată în starea EVM. Orice utilizator poate transmite o cerere de tranzacție către rețea dintr-un nod. Pentru ca cererea de tranzacție să afecteze efectiv starea EVM convenită, aceasta trebuie validată, executată și „angajată în rețea” de un alt nod. Executarea oricărui cod determină o schimbare de stare în EVM; conform angajamentului, această schimbare de stare este difuzată la toate nodurile din rețea. Câteva exemple de tranzacții:

- Trimite X eter din contul meu în contul lui Alice.
- Publică niște cod de contract inteligent în memoria EVM.
- Execută codul contractului inteligent la adresa X din EVM, cu argumentele Y.

[Mai multe despre tranzacții](/developers/docs/transactions/)

### Blocuri {#blocks}

Volumul tranzacțiilor este foarte mare, astfel încât tranzacțiile sunt „angajate” în loturi sau blocuri. Blocurile conțin în general zeci până la sute de tranzacții.

[Mai multe despre blocuri](/developers/docs/blocks/)

### Contracte inteligente {#smart-contracts}

Un fragment reutilizabil de cod (un program) pe care un programator îl publică în memoria EVM. Oricine poate solicita executarea codului de contract inteligent făcând o cerere de tranzacție. Deoarece programatorii pot scrie aplicații executabile arbitrare în EVM (jocuri, piețe, instrumente financiare etc.) prin publicarea de contracte inteligente, acestea sunt adesea numite și [dapps sau Aplicații descentralizate](/developers/docs/dapps/).

[Mai multe despre contractele inteligente](/developers/docs/smart-contracts/)

## Referințe suplimentare {#further-reading}

- [Ethereum Whitepaper](/whitepaper/)

## Tutoriale corelate {#related-tutorials}

- [Un ghid al programatorului la Ethereum, partea 1 ](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– O explorare foarte prietenoasă a Ethereum folosind Python și web3.py_
