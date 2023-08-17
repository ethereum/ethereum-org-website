---
title: Scalarea
description: Introducere despre diferitele opțiuni de scalare care sunt dezvoltate actualmente de comunitatea Ethereum.
lang: ro
sidebarDepth: 3
---

## Prezentare generală a scalării {#scaling-overview}

Întrucât numărul de persoane care utilizează Ethereum a crescut, blockchain-ul a atins anumite limite de capacitate. Acest lucru a dus la creșterea costului de utilizare a rețelei, creând necesitarea unor „soluții de scalare” Există mai multe soluții în curs de cercetare, testare şi implementare, care adoptă abordări diferite pentru a atinge obiective similare.

Obiectivul principal al scalabilității este creșterea vitezei tranzacțiilor (finalitate mai rapidă) și a fluxului de tranzacții (tranzacții mai multe pe secundă), fără sacrificarea descentralizării sau a securității (aflați mai multe în [viziunea Ethereum](/roadmap/vision/)). On the layer 1 Ethereum blockchain, high demand leads to slower transactions and nonviable [gas prices](/developers/docs/gas/). Creșterea capacității rețelei din punctul de vedere al vitezei și al fluxului este fundamentală pentru o adoptare semnificativă și în masă a lui Ethereum.

Deși viteza și fluxul sunt importante, este esențial ca soluțiile de scalare care permit atingerea acestor obiective să rămână descentralizate și securizate. Menținerea unei bariere scăzute la intrare pentru operatorii de noduri este esențială pentru a împiedica evoluția către o putere de calcul centralizată și nesecurizată.

Din punct de vedere conceptual, în primul rând separăm în două categorii scalarea, ca fiind scalare on-chain sau scalare off-chain.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegeți bine toate subiectele fundamentale. Implementarea soluțiilor de scalare este avansată, deoarece tehnologia este mai puțin testată în luptă și se află în continuare în faza de cercetare şi dezvoltare.

## Scalarea on-chain {#on-chain-scaling}

Această metodă de scalare necesită modificări ale protocolului Ethereum (nivelul 1 [Mainnet](/glossary/#mainnet)). Actualmente această metodă de scalare se axează în principal pe fragmentare.

### Fragmentarea {#sharding}

Fragmentarea este procesul de divizare orizontală a unei baze de date pentru a distribui sarcina. În contextul Ethereum, fragmentarea va reduce congestionarea rețelei și va crește numărul de tranzacții pe secundă prin crearea de noi lanțuri, cunoscute sub numele de „fragmente.” Acest lucru va ușura de asemenea sarcina fiecărui validator, care nu va mai fi nevoit să proceseze integral toate tranzacțiile din întreaga rețea.

Aflați mai multe despre [fragmentare](/roadmap/danksharding/).

## Scalarea off-chain {#off-chain-scaling}

Soluțiile off-chain sunt implementate separat de nivelul 1 al Mainnet-ului - acestea nu necesită modificări ale protocolului Ethereum existent. Some solutions, known as "layer 2" solutions, derive their security directly from layer 1 Ethereum consensus, such as [optimistic rollups](/developers/docs/scaling/optimistic-rollups/), [zero-knowledge rollups](/developers/docs/scaling/zk-rollups/) or [state channels](/developers/docs/scaling/state-channels/). Alte soluții implică crearea de noi lanțuri sub diverse forme, care își obțin securitatea separat de Mainnet, cum ar fi [lanțurile paralele](#sidechains) sau lanţurile [„plasma”](#plasma). Aceste soluții intră în comunicare cu Mainnet-ul, dar își obţin securitatea în mod diferit, pentru a atinge o varietate de obiective.

### Scalare la nivelul 2 {#layer-2-scaling}

Această categorie de soluții off-chain își obţine securitatea din Mainnet-ul Ethereum.

Nivelul 2 este un termen colectiv pentru soluțiile destinate să ajute la scalarea aplicației dvs. prin gestionarea tranzacțiilor în afara Mainnet-ului Ethereum (nivelul 1), profitând în același timp de modelul robust de securitate descentralizat al Mainnet-ului. Viteza de tranzacție suferă atunci când rețeaua este ocupată, ceea ce poate scădea satisfacţia utilizatorului la anumite tipuri de aplicații dapp. Și pe măsură ce rețeaua devine mai aglomerată, prețurile gazului cresc, odată ce expeditorii de tranzacții își propun să se supraliciteze reciproc. Aceasta poate face ca utilizarea Ethereum să fie foarte costisitoare.

Cele mai multe soluții de nivelul 2 sunt centrate pe un server sau cluster de servere, fiecare dintre acestea putând fi denumit ca nod, validator, operator, ordonator, producător de blocuri sau cu un termen similar. În funcție de implementare, aceste noduri de nivelul 2 pot fi administrate de persoanele, întreprinderile sau entitățile care le folosesc, de un operator terț sau de un grup mare de persoane (similar cu Mainnet-ul). În general, tranzacțiile sunt trimise la aceste noduri de nivelul 2 în loc să fie trimise direct la nivelul 1 (Mainnet). În cazul anumitor soluții, instanța din nivelul 2 le împarte apoi în grupuri înainte de a le ancora în nivelul 1, după care acestea sunt securizate de nivelul 1 și nu pot fi modificate. Detaliile despre modul în care se face acest lucru variază semnificativ între diferite tehnologii şi implementări de nivelul 2.

O anumită instanță de nivelul 2 poate fi deschisă și partajată de mai multe aplicații sau poate fi implementată de un anumit proiect și destinată doar susţinerii aplicaţiei acestuia.

#### De ce este necesar nivelul 2? {#why-is-layer-2-needed}

- Increased transactions per second greatly improves user experience, and reduces network congestion on Mainnet Ethereum.
- Transactions are rolled up into a single transaction to Mainnet Ethereum, reducing gas fees for users making Ethereum more inclusive and accessible for people everywhere.
- Orice actualizări ale scalabilității nu ar trebui să fie făcute în detrimentul descentralizării sau al securității – nivelul 2 se construiește deasupra lui Ethereum.
- There are application specific layer 2 networks that bring their own set of efficiencies when working with assets at scale.

#### Rollup-uri {#rollups}

Rollup-urile execută tranzacțiile în afara nivelului 1 și apoi datele sunt postate în nivelul 1, unde se ajunge la un consens. Întrucât datele de tranzacție sunt incluse în blocurile din nivelul 1, aceasta permite ca rollup-urile să fie securizate prin securitatea nativă a lui Ethereum.

Există două tipuri de pachete cu modele de securitate diferite:

- **Rollup-urile Optimistic**: presupun că tranzacțiile sunt valide în mod implicit și execută doar calculul, prin intermediul unei [**dovezi de fraudă (fraud proof)**](/glossary/#fraud-proof), în cazul unei provocări. [More on Optimistic rollups](/developers/docs/scaling/optimistic-rollups/).
- **Rollup-urile Zero-knowledge**: rulează calculul off-chain și prezintă o [**dovadă a validității**](/glossary/#validity-proof) lanțului. [More on zero-knowledge rollups](/developers/docs/scaling/zk-rollups/).

#### Canale de stare {#channels}

Canalele de stare utilizează contracte multisig pentru a permite participanților să tranzacționeze rapid și liber în afara lanțului, iar apoi să stabilească finalitatea cu Mainnet-ul. Acest lucru minimizează congestia rețelei, taxele și întârzierile. Cele două tipuri de canale sunt actualmente canalele de stare și canalele de plată.

Aflați mai multe despre [canalele de stare](/developers/docs/scaling/state-channels/).

### Lanțuri paralele {#sidechains}

Un lanț paralel (sidechain) este un blockchain independent compatibil cu EVM care rulează în paralel cu Mainnet-ul. Acestea sunt compatibile cu Ethereum prin intermediul unor punți bidirecționale și rulează după propriile reguli alese de consens și parametrii blocului.

Aflați mai multe despre [Lanțurile paralele](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

A plasma chain is a separate blockchain that is anchored to the main Ethereum chain, and uses fraud proofs (like [optimistic rollups](/developers/docs/scaling/optimistic-rollups/)) to arbitrate disputes.

Aflați mai multe despre [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

A Validium chain uses validity proofs like zero-knowledge rollups but data is not stored on the main layer 1 Ethereum chain. This can lead to 10k transactions per second per Validium chain and multiple chains can be run in parallel.

Learn more about [Validium](/developers/docs/scaling/validium/).

## De ce sunt necesare atât de multe soluții de scalare? {#why-do-we-need-these}

- Soluțiile multiple pot ajuta la reducerea congestiei generale pe orice parte a rețelei și de asemenea previn punctele unice de eșec.
- Întregul este mai mare decât suma părților sale. Pot exista soluții diferite care să funcţioneze armonios, permițând creşterea exponențială a vitezei și a fluxului tranzacțiilor viitoare.
- Nu toate soluțiile necesită utilizarea directă a algoritmului de consens Ethereum, iar alternativele pot oferi beneficii care altfel ar fi dificil de obținut.
- Nici una dintre aceste soluții de scalare nu este suficientă pentru ca viziunea [Ethereum](/roadmap/vision/) să devină realitate.

## Învățați mai ușor prin vizualizare? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Rețineți că explicația din videoclip folosește termenul "Nivelul 2" pentru a se referi la toate soluțiile de scalare în off-chain, în timp ce noi diferențiem "Nivelul 2" ca fiind o soluție off-chain care își derivă securitatea prin consensul Rețelei principale de nivel 1._

<YouTube id="7pWxCklcNsU" />

## Referințe suplimentare {#further-reading}

- [O foaie de parcurs Ethereum centrată pe rollup-uri](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analize actualizate privind soluțiile de scalare de nivel 2 pentru Ethereum](https://www.l2beat.com/)
- [Evaluarea soluțiilor de scalare a nivelului 2 pentru Ethereum: Un framework de comparație](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Un ghid incomplet pentru rollup-uri](https://vitalik.ca/general/2021/01/05/rollup.html)
- [ZK-rollup-urile acţionate de Ethereum: campionii lumii](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollup-urile Optimistic în comparaţie cu ZK Rollup-urile](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Zero-Knowledge Blockchain Scalability](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [De ce rollup-urile + fragmentele de date sunt singura soluție sustenabilă pentru o scalabilitate ridicată](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)

_Cunoașteți o resursă a comunității care v-a ajutat? Editaţi această pagină și adăugaţi-o!_
