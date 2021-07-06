---
title: Lanțuri de fragmente
description: Informații despre lanțurile de fragmente - partiții ale rețelei care oferă Ethereum o capacitate mai mare de tranzacții și facilitează rularea.
lang: ro
template: eth2
sidebar: true
image: ../../../../../assets/eth2/newrings.png
summaryPoints:
  [
    "Fragmentarea este un upgrade pe mai multe faze pentru a îmbunătăți scalabilitatea și capacitatea Ethereum.",
    "Lanțurile de fragmente distribuie sarcina rețelei pe 64 de lanțuri noi.",
    "Acestea facilitează rularea unui nod, menținând cerințele hardware scăzute.",
    "Foile de parcurs tehnice includ lucrări pe lanțurile de fragmente în „Faza 1” și potențial în „Faza 2”.",
  ]
---

<UpgradeStatus date="~2021">
    Lanțurile de fragmente ar trebui să fie livrate în 2021, în funcție de cât de repede progresează munca după lansarea <a href="/en/eth2/beacon-chain/">lanțului Beacon</a>. Aceste fragmente vor oferi Ethereum mai multă capacitate de stocare și acces la date, dar nu vor fi utilizate pentru executarea de cod. Detaliile despre aceasta sunt încă în curs de analiză.
</UpgradeStatus>

## Ce este fragmentarea? {#what-is-sharding}

Fragmentarea este procesul de împărțire a unei baze de date pe orizontală pentru a răspândi sarcina - este un concept comun în informatică. În contextul Ethereum, fragmentarea va reduce congestionarea rețelei și va crește numărul de tranzacții pe secundă prin crearea de noi lanțuri, cunoscute sub numele de „fragmente”.

Acest lucru este important din alte motive decât scalabilitatea.

## Caracteristicile fragmentării {#features-of-sharding}

### Toată lumea poate rula un nod {#everyone-can-run-a-node}

Fragmentarea este o modalitate bună de a crește scalabilitatea dacă dorești să păstrezi lucrurile descentralizate, deoarece alternativa este să o faci prin mărirea dimensiunii bazei de date existente. Acest lucru ar face Ethereum mai puțin accesibil pentru validatorii de rețea, deoarece ar avea nevoie de calculatoare puternice și scumpe. Cu lanțurile de fragmente, validatorii trebuie să stocheze/ruleze doar datele pentru fragmentele pe care le validează, nu întreaga rețea (cum se întâmplă astăzi). Acest lucru accelerează lucrurile și reduce drastic cerințele hardware.

### Mai multă participare la rețea {#more-network-participation}

Fragmentarea îți va permite în cele din urmă să rulezi Ethereum pe un laptop sau telefon personal. Deci, mai mulți oameni ar trebui să poată participa sau să ruleze [clienți](/developers/docs/nodes-and-clients/) într-un Ethereum fragmentat. Acest lucru va crește securitatea, deoarece cu cât rețeaua este mai descentralizată, cu atât suprafața de atac este mai mică.

Cu cerințe hardware mai mici, fragmentarea va facilita rularea [clienților](/developers/docs/nodes-and-clients/) pe cont propriu, fără a se baza pe niciun serviciu intermediar. Și dacă poți, ia în considerare rularea mai multor clienți. Acest lucru poate ajuta sănătatea rețelei prin reducerea în continuare a punctelor de eșec. [Rulează un client Eth2](/eth2/get-involved/)

<br />

<InfoBanner isWarning={true}>
  La început, va trebui să rulezi un client pe rețeaua principală în același timp cu clientul tău Eth2. <a href="https://launchpad.ethereum.org" target="_blank">Launchpad-ul</a> te va ghida prin cerințele de hardware și procese. Alternativ, poți utiliza un <a href="/en/developers/docs/apis/backend/#available-libraries">API back-end</a>.
</InfoBanner>

## Lanțuri de fragmente versiunea 1: disponibilitatea datelor {#data-availability}

Când vor fi livrate primele lanțuri de fragmente, acestea vor furniza doar date suplimentare rețelei. Nu vor gestiona tranzacții sau contracte inteligente. Dar vor oferi totuși îmbunătățiri incredibile tranzacțiilor pe secundă când se vor combina cu rollup-uri (grupare și trimitere de tranzacții ca și cum ar fi una singură).

Rollup-urile sunt o tehnologie de „nivel 2” care există astăzi. Acestea permit aplicațiilor descentralizate (dapps) să grupeze („roll up”) tranzacții într-o singură tranzacție în afara lanțului, să genereze o dovadă criptografică și apoi să o trimită lanțului. Acest lucru reduce datele necesare executării unei tranzacții. Combină acest lucru cu disponibilitatea tuturor datelor suplimentare oferită de fragmente și obții 100.000 de tranzacții pe secundă.

[Mai multe despre rollup-uri](/developers/docs/scaling/layer-2-rollups/#rollups-and-sidechains)

## Lanțuri de fragmente versiunea 2: executarea codului {#code-execution}

Planul a fost întotdeauna de a adăuga funcționalități suplimentare fragmentelor, pentru a le face mai asemănătoare cu [rețeaua principală Ethereum](/glossary/#mainnet) folosită astăzi. Aceasta le-ar permite să stocheze și să execute contracte inteligente și să gestioneze conturi. Dar, având în vedere creșterea numărului de tranzacții pe secundă creată de fragmentele din versiunea 1, mai trebuie să se întâmple acest lucru? Acest lucru este încă în dezbatere în comunitate și se pare că există câteva opțiuni.

### Fragmentele trebuie să execute cod? {#do-shards-need-code-execution}

Vitalik Buterin, când a vorbit pe podcast-ul Bankless, a prezentat 3 opțiuni potențiale care merită discutate. <iframe width="100%" height="315" src="https://www.youtube.com/embed/-R0j5AMUSzA?start=5841" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

#### 1. Executarea stării nu este necesară {#state-execution-not-needed}

Acest lucru ar însemna că nu oferim fragmentelor capacitatea de a gestiona contractele inteligente și le lăsăm doar ca depozite de date.

#### 2. Au numai câteva fragmente executabile {#some-execution-shards}

Probabil am putea ajunge la un compromis în care nu avem nevoie ca toate fragmentele (chiar acum sunt planificate 64) să fie inteligente. Am putea adăuga această funcționalitate doar la câteva și lăsa restul. Acest lucru ar putea accelera livrarea.

#### 3. Să așteptăm până când vom putea produce dovezi SNARK Zero Knowledge (ZK) (nu revelează sursa) {#wait-for-zk-snarks}

În cele din urmă, am putea să revedem această dezbatere atunci când dovezile ZK SNARK vor deveni mai stabile. Aceasta este o tehnologie care ar putea contribui la aducerea de tranzacții cu adevărat private în rețea. Probabil că vor avea nevoie de fragmente inteligente, dar sunt încă în cercetare și dezvoltare.

#### Alte surse {#other-sources}

Iată mai multe gânduri despre aceste abordări:

- [Etapa Unu și Gata: Et2 ca motor de disponibilitate a datelor](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Acesta este încă un punct activ de discuție. Vom actualiza aceste pagini după ce vom afla mai multe informații.

## Relația dintre upgrade-uri {#relationship-between-upgrades}

Actualizările Eth2 sunt oarecum interdependente. Să recapitulăm legătura dintre lanțurile de fragmente și celelalte upgrade-uri.

### Fragmentele și lanțul Beacon {#shards-and-beacon-chain}

Lanțul Beacon conține toată logica pentru păstrarea fragmentelor în siguranță și sincronizate. Lanțul Beacon va coordona stakerii din rețea, atribuindu-le fragmente la care trebuie să lucreze. Și va facilita, de asemenea, comunicarea între fragmente prin primirea și stocarea datelor de tranzacție a fragmentelor la care pot avea acces alte fragmente. Aceasta va oferi fragmentelor un instantaneu al stării Ethereum pentru a menține totul la zi.<ButtonLink to="/eth2/beacon-chain/">Lanțul Beacon</ButtonLink>

### Fragmentele și andocarea {#shards-and-docking}

Rețeaua principală Ethereum va exista așa cum există astăzi chiar și după introducerea fragmentelor. Cu toate acestea, la un moment dat, rețeaua principală va trebui să devină un fragment, astfel încât să poată face tranziția la mizare. Rămâne de văzut dacă rețeaua principală va exista ca singurul fragment „inteligent” care poate gestiona executarea de cod - dar în orice caz, în faza 2 a fragmentării, va trebui să se ia o decizie cu privire la aceasta.<ButtonLink to="/eth2/merge/">Andocarea</ButtonLink>

<Divider />

### Informații suplimentare {#read-more}

<Eth2ShardChainsList />
