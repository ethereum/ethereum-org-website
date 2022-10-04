---
title: Lanțuri de fragmente
description: Informații despre lanțurile de fragmente - partiții ale rețelei care oferă Ethereum o capacitate mai mare de tranzacții și facilitează rularea.
lang: ro
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Fragmentarea este o actualizare în mai multe faze pentru a îmbunătăți scalabilitea și capacitatea Ethereum.
summaryPoint2: Lanțurile de fragmente distribuie sarcina rețelei pe 64 de lanțuri noi.
summaryPoint3: Acestea facilitează rularea unui nod, menținând cerințele hardware scăzute.
summaryPoint4: Actualizarea este planificată să aibă loc după unirea Rețelei principale cu Rețeaua Beacon.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Lanțurile de fragmente ar trebui să fie livrate în 2023, în funcție de cât de repede progresează munca după <a href="/upgrades/merge/">unire</a>. Aceste fragmente vor oferi Ethereum mai multă capacitate de stocare și acces la date, dar nu vor fi utilizate pentru executarea de cod. Detaliile despre aceasta sunt încă în curs de analiză.
</UpgradeStatus>

## Ce este fragmentarea? {#what-is-sharding}

Fragmentarea este procesul de împărțire a unei baze de date pe orizontală pentru a răspândi sarcina - este un concept comun în informatică. În contextul Ethereum, fragmentarea va reduce congestionarea rețelei și va crește numărul de tranzacții pe secundă prin crearea de noi lanțuri, cunoscute sub numele de „fragmente”.

Acest lucru este important din alte motive decât scalabilitatea.

## Caracteristicile fragmentării {#features-of-sharding}

### Toată lumea poate rula un nod {#everyone-can-run-a-node}

Fragmentarea este o modalitate bună de a crește scalabilitatea dacă dorești să păstrezi lucrurile descentralizate, deoarece alternativa este să o faci prin mărirea dimensiunii bazei de date existente. Acest lucru ar face Ethereum mai puțin accesibil pentru validatorii de rețea, deoarece ar avea nevoie de calculatoare puternice și scumpe. Cu lanțurile de fragmente, validatorii trebuie să stocheze/ruleze doar datele pentru fragmentele pe care le validează, nu întreaga rețea (cum se întâmplă astăzi). Acest lucru accelerează lucrurile și reduce drastic cerințele hardware.

### Mai multă participare la rețea {#more-network-participation}

Fragmentarea îți va permite în cele din urmă să rulezi Ethereum pe un laptop sau telefon personal. Deci, mai mulți oameni ar trebui să poată participa sau să ruleze [clienți](/developers/docs/nodes-and-clients/) într-un Ethereum fragmentat. Acest lucru va crește securitatea, deoarece cu cât rețeaua este mai descentralizată, cu atât suprafața de atac este mai mică.

Cu cerințe hardware mai mici, fragmentarea va facilita rularea [clienților](/developers/docs/nodes-and-clients/) pe cont propriu, fără a se baza pe niciun serviciu intermediar. Și dacă poți, ia în considerare rularea mai multor clienți. Acest lucru poate ajuta sănătatea rețelei prin reducerea în continuare a punctelor de eșec. [Rulează un client Eth2](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  La început, va trebui să rulezi un client pe rețeaua principală în același timp cu clientul tău Eth2. <a href="https://launchpad.ethereum.org" target="_blank">Launchpad-ul</a> te va ghida prin cerințele de hardware și procese. Alternativ, poți utiliza un <a href="/developers/docs/apis/backend/#available-libraries">API back-end</a>.
</InfoBanner>

## Lanțuri de fragmente versiunea 1: disponibilitatea datelor {#data-availability}

Când vor fi livrate primele lanțuri de fragmente, acestea vor furniza doar date suplimentare rețelei. Nu vor gestiona tranzacții sau contracte inteligente. Dar vor oferi totuși îmbunătățiri incredibile tranzacțiilor pe secundă când se vor combina cu rollup-uri (grupare și trimitere de tranzacții ca și cum ar fi una singură).

Rollup-urile sunt o tehnologie de „nivel 2” care există astăzi. Acestea permit aplicațiilor descentralizate (dapps) să grupeze („roll up”) tranzacții într-o singură tranzacție în afara lanțului, să genereze o dovadă criptografică și apoi să o trimită lanțului. Acest lucru reduce datele necesare executării unei tranzacții. Combină acest lucru cu disponibilitatea tuturor datelor suplimentare oferită de fragmente și obții 100.000 de tranzacții pe secundă.

<InfoBanner isWarning={false}>
  Având în vedere progresul recent în cercetarea și dezvoltarea soluțiilor de scalare de nivelul 2, acest lucru a determinat prioritizarea unirii înaintea actualizării cu lanțurile de fragmente. Acestea vor fi punctul central după tranziția rețelei principală în Dovada Mizei (proof-of-stake).

[Mai multe despre rollup-uri](/developers/docs/scaling/#rollups)
</InfoBanner>

## Lanțuri de fragmente versiunea 2: executarea codului {#code-execution}

Planul a fost întotdeauna de a adăuga funcționalități suplimentare fragmentelor, pentru a le face mai asemănătoare cu [Rețeaua principală Ethereum](/glossary/#mainnet) folosită în prezent. Acestea le-ar permite să stocheze și să execute contracte inteligente și să gestioneze conturi. Dar, având în vedere creșterea numărului de tranzacții pe secundă creată de fragmentele din versiunea 1, mai trebuie să se întâmple acest lucru? Acest aspect este încă în dezbatere în comunitate și se pare că există câteva opțiuni.

### Fragmentele trebuie să execute cod? {#do-shards-need-code-execution}

Vitalik Buterin, când a vorbit pe podcast-ul Bankless, a prezentat 3 opțiuni potențiale care merită discutate.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Executarea stării nu este necesară {#state-execution-not-needed}

Acest lucru ar însemna că nu oferim fragmentelor capacitatea de a gestiona contractele inteligente și le lăsăm doar ca depozite de date.

#### 2. Au numai câteva fragmente executabile {#some-execution-shards}

Probabil am putea ajunge la un compromis în care nu avem nevoie ca toate fragmentele (chiar acum sunt planificate 64) să fie inteligente. Am putea adăuga această funcționalitate doar la câteva și lăsa restul așa cum sunt. Acest lucru ar putea accelera livrarea.

#### 3. Să așteptăm până când vom putea produce dovezi SNARK Zero Knowledge (ZK) (nu revelează sursa) {#wait-for-zk-snarks}

În cele din urmă, am putea să revedem această dezbatere atunci când dovezile ZK SNARK vor deveni mai stabile. Aceasta este o tehnologie care ar putea contribui la aducerea de tranzacții cu adevărat private în rețea. Probabil că vor avea nevoie de fragmente inteligente, dar sunt încă în cercetare și dezvoltare.

#### Alte surse {#other-sources}

Iată mai multe idei despre aceste abordări:

- [Etapa Unu și Gata: Et2 ca motor de disponibilitate a datelor](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Acesta este încă un punct activ de discuție. Vom actualiza aceste pagini după ce vom afla mai multe informații.

## Relația dintre upgrade-uri {#relationship-between-upgrades}

Toate actualizările Eth2 sunt oarecum interdependente. Să recapitulăm legătura dintre lanțurile de fragmente și celelalte actualizări.

### Fragmentele și lanțul Beacon {#shards-and-beacon-chain}

Rețeaua Beacon conține toată logica pentru păstrarea fragmentelor în siguranță și sincronizate. Rețeaua Beason va coordona stakerii din rețea, atribuindu-le fragmente la care trebuie să lucreze. Și va facilita, de asemenea, comunicarea între fragmente prin primirea și stocarea datelor de tranzacție a fragmentelor la care pot avea acces alte fragmente. Acest lucru va oferi fragmentelor un instantaneu al stării Ethereum pentru a menține totul la zi.

<ButtonLink to="/upgrades/beacon-chain/">Lanțul Beacon</ButtonLink>

### Fragmentele și unirea {#shards-and-docking}

Până la adugarea fragmentelor suplimentare, rețeaua principală Ethereum va fi deja securizată de rețeaua Beacon prin Dovada Mizei (proof-of-stake). Acest lucru permite unei rețelei principale fertile să construiască lanțuri de fragmente, fiind alimentate de soluțiile din nivelul 2 care supraalimentează scalabilitatea.

Rămâne de văzut dacă Rețeaua principală va exista ca singurul fragment „inteligent” care poate gestiona executarea de cod – în orice caz, decizia de a extinde fragmentele poate fi reexaminată după necesități.

<ButtonLink to="/upgrades/merge/">Unirea</ButtonLink>

<Divider />

### Informații suplimentare {#read-more}

<ShardChainsList />
