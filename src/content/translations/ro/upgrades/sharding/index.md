---
title: Fragmentarea
description: Află mai multe despre fragmentare - divizarea și distribuirea încărcării datelor necesare pentru a oferi Ethereum o capacitate de tranzacționare mai mare și pentru a facilita rularea.
lang: ro
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Fragmentarea este o actualizare în mai multe etape pentru îmbunătățirea scalabilității și capacității Ethereum.
summaryPoint2: Fragmentarea oferă o distribuție sigură a nevoilor de stocare a datelor, permițând rollup-uri mai economice și nodurile mai ușor de folosit.
summaryPoint3: Permit soluțiilor de nivelul 2 să ofere comisioane de tranzacții mici și să profite de securitatea Ethereum.
summaryPoint4: Această modernizare a devenit mai importantă de când Ethereum a trecut la dovada mizei.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Fragmentarea ar putea fi lansată în 2023. Fragmentele vor oferi Ethereum o capacitate mai mare de stocare și accesare a datelor, dar nu vor fi folosite pentru executarea codului.
</UpgradeStatus>

## Ce este fragmentarea? {#what-is-sharding}

Fragmentarea este procesul de divizare a unei baze de date pe orizontală pentru a distribui sarcina - este un concept uzual în informatică. Într-un context Ethereum, fragmentarea va funcționa sinergetic cu [rollup-uri de nivelul 2](/layer-2/) prin divizarea dificultății de gestionare a unei cantități mari de date, necesare pentru rollup-uri în întreaga rețea. Aceasta va continua să reducă congestia din rețea și să crească tranzacțiile pe secundă.

Acest lucru este important din alte motive decât scalabilitatea.

## Funcționalitățile fragmentării {#features-of-sharding}

### Oricine poate rula un nod {#everyone-can-run-a-node}

Fragmentarea este o modalitate bună de a asigura scalabilitatea dacă doriți să mențineți descentralizarea; altfel ați putea menține scalabilitatea numai mărind dimensiunea bazei de date existente. În acest din urmă caz, Ethereum ar deveni mai puțin accesibil pentru validatorii de rețea, deoarece ar necesita calculatoare puternice și scumpe. Odată cu fragmentarea, validatorii nu vor mai trebui să stocheze toate aceste date, în schimb, vor putea să folosească tehnicile destinate datelor pentru a confirma că au fost puse la dispoziție de către rețea, integral. Acest lucru reduce considerabil costul stocării datelor pe stratul 1 prin reducerea cerințelor de hardware.

### O mai mare participare la rețea {#more-network-participation}

Fragmentarea îți va permite în cele din urmă să rulezi Ethereum pe laptop sau telefonul personal. Deci într-un Ethereum fragmentat mai multe persoane ar putea participa sau rula programul [clienți](/developers/docs/nodes-and-clients/). Astfel va crește securitatea, deoarece cu cât rețeaua este mai descentralizată, cu atât suprafața de atac este mai mică.

Având mai puține cerințe de hardware, fragmentarea îți va permite să rulezi ușor programul [clienți](/developers/docs/nodes-and-clients/) în mod independent, fără să te bazezi pe vreun serviciu intermediar. Și, dacă poți, încearcă să rulezi mai mulți clienți. Acest lucru contribuie la menținerea bunei funcționări a rețelei, continuând să reducă punctele vulnerabile.

<br />

<InfoBanner isWarning>
  Va trebui să rulezi un client de execuție în același timp cu consensul clientului. <a href="https://launchpad.ethereum.org" target="_blank">Launchpad-ul</a> va prezenta cerințele de hardware și procesele.
</InfoBanner>

## Lanțurile de fragmente în versiunea 1: disponibilitatea datelor {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>Notă:</strong> planurile pentru fragmentare au evoluat pe măsură ce au fost dezvoltate căi mai eficiente pentru scalare. „Danksharding” este o nouă abordare a fragmentării, care nu folosește conceptul de lanțuri de fragmente, folosind în schimb „bloburi” de fragmente pentru divizarea datelor, împreună cu „eșantionarea datelor disponibile” pentru a confirma că toate datele au fost puse la dispoziție. Această schimbare a planului rezolvă aceeași problemă originală.<br/><br/>
  <strong>Detaliile de mai jos pot fi depășite în ultimele planuri de dezvoltare.</strong> În timpul actualizărilor, consultă <a href="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum">Informații esențiale despre Ethereum</a> pentru o prezentare utilă despre foaia de parcurs Ethereum.
</InfoBanner>

Când se vor lansa primele lanțuri de fragmente, acestea doar vor furniza date suplimentare către rețea. Nu se vor ocupa de tranzacții sau contracte inteligente. Vor ameliora totuși în mod incredibil tranzacțiile pe secundă în combinație cu rollup-urile (grupare și trimitere de tranzacții ca și cum ar fi una singură).

Rollup-urile sunt o tehnologie de „nivelul 2” existentă astăzi. Acestea permit dapp-urilor să grupeze sau să „roll up” tranzacțiile într-o tranzacție unică în afara lanțului, să genereze o dovadă criptografică și apoi să o trimită lanțului. Se reduce astfel numărul datelor necesare executării unei tranzacții. În combinație cu toate datele pe care le pun la dispoziție fragmentele, se obțin 100.000 de tranzacții pe secundă.

## Lanțurile de fragmente în versiunea 2: executarea de cod {#code-execution}

S-a avut în vedere întotdeauna să se suplimenteze funcționalitățile fragmentelor, ca să fie cât mai asemănătoare cu [Mainnet-ul Ethereum](/glossary/#mainnet) ce se folosește astăzi. Aceasta le-ar permite să stocheze și să execute codul și să gestioneze tranzacțiile, pentru că fiecare fragment ar conține setul propriu unic de contracte inteligente și de solduri de cont. Comunicarea transversală ar permite tranzacțiile între fragmente.

Având în vedere impulsionarea numărului de tranzacții pe secundă oferită de versiunea 1 a fragmentelor, mai este oare necesar? Acest lucru este încă în dezbatere în comunitate și se pare că există câteva opțiuni.

### Este nevoie ca fragmentele să execute cod? {#do-shards-need-code-execution}

Vitalik Buterin, invitat la podcast-ul Bankless, a prezentat 3 opțiuni potențiale care merită discutate.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Executarea stării să nu fie necesară {#state-execution-not-needed}

Aceasta ar însemna să nu oferim fragmentelor capacitatea de a se ocupa de contractele inteligente, ci să le menținem ca depozite de date.

#### 2. Doar unele fragmente să fie executabile {#some-execution-shards}

Probabil am putea ajunge la un compromis în care să nu avem nevoie ca toate fragmentele să fie inteligente. Am putea adăuga această funcționalitate doar câtorva și lăsa restul. Acest lucru ar putea accelera realizările.

#### 3. Să așteptăm până când vom putea produce dovezi snark Zero Knowledge (ZK) (nu revelează sursa) {#wait-for-zk-snarks}

În cele din urmă, am putea să reluăm această dezbatere atunci când dovezile snark ZK vor deveni mai stabile. Aceasta este o tehnologie care ar putea aduce tranzacții cu adevărat private în rețea. Probabil că vor avea nevoie de fragmente mai inteligente, dar sunt încă în faza de cercetare și dezvoltare.

#### Alte surse {#other-sources}

Iată mai multe păreri despre aceste abordări:

- [Etapa Unu și Gata: Eth2 ca motor de disponibilitate a datelor](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Acesta este încă un punct activ de discuție. Vom actualiza aceste pagini după ce vom afla mai multe informații.

## Relațiile dintre actualizări {#relationship-between-upgrades}

Toate actualizările Ethereum se află într-o anumită corelație. Să recapitulăm legătura dintre lanțurile de fragmente și celelalte actualizări.

### Fragmentele și blockchain-ul Ethereum {#shards-and-blockchain}

Logica pentru menținerea fragmentelor în siguranță și sincronizate este ca toate să fie integrate în clienții Ethereum care construiesc blockchain-ul. Stakerii din rețea vor fi atribuiți fragmentelor pe care se lucrează. Fragmentele vor avea acces la instantanee ale altor fragmente, astfel încât să poată crea o imagine a stării Ethereum pentru a păstra totul actualizat.

### Află mai multe {#read-more}

<ShardChainsList />
