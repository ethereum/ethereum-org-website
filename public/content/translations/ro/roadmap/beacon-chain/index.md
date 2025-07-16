---
title: Lanțul Beacon
description: Aflați despre Lanțul Beacon - actualizarea care a introdus în Ethereum dovada-mizei.
lang: ro
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoint1: Lanțul Beacon a introdus dovada mizei în ecosistemul Ethereum.
summaryPoint2: Acesta a fost fuzionat cu lanțul dovadă a muncii Ethereum original în septembrie 2022.
summaryPoint3: Lanțul Beacon a introdus logica consensului și protocolul de bârfă al blocului care protejează Ethereum în acest moment.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Lanțul Beacon a fost lansat pe 1 decembrie 2020 și a formalizat dovada mizei ca mecanism de consens al Ethereum prin modernizarea Fuziunii în 15 septembrie 2022.
</UpgradeStatus>

## Ce este lanțul Beacon? {#what-is-the-beacon-chain}

Lanțul Beacon a fost numele blockchain-ului dovada mizei original, lansat în 2020. A fost creat pentru a ne asigura că logica de consens cu dovada mizei este sănătoasă și durabilă înainte de a o activa în Rețeaua principală Ethernet. Prin urmare, a funcționat împreună cu dovada muncii Ethereum originală. Dezactivarea și activarea dovezii muncii în Ethereum a necesitat o instrucțiune prin care Lanțul Beacon să accepte tranzacții din lanțul Ethereum original, să le regrupeze în blocuri și să le organizeze într-un blockchain folosind un mecanism de consens bazat pe dovada mizei. În același moment, clienții originali Ethereum au oprit minarea, propagarea blocului și logica consensului, transferând toate acestea în Lanțul Beacon. Acest eveniment a fost cunoscut sub numele de [Fuziunea](/roadmap/merge/). Odată ce Fuziunea a avut loc, nu au mai existat două blockchain-uri, ci doar un singur lanț dovada mizei Ethereum.

## Care a fost rolul Lanțului Beacon? {#what-does-the-beacon-chain-do}

Lanțul Beacon a fost numele dat unui registru al conturilor care a condus și coordonat rețeaua de [stakeri](/staking/) Ethereum înainte ca stakerii să înceapă validarea tranzacțiilor Ethereum reale. Nu a procesat tranzacții și nu a gestionat interacțiunile contractului inteligent.

A introdus motorul pentru consens (sau „stratul de consens”) care a luat locul minării prin dovada muncii în Ethereum și a adus îmbunătățiri majore.

Lanțul Beacon a fost o componentă fundamentală pentru [securitatea, respectul pentru mediu și scalabilitatea Ethereum de care ne bucurăm acum](/roadmap/vision/).

## Impactul Lanțului Beacon {#beacon-chain-features}

### Introducere despre mizare {#introducing-staking}

Lanțul Beacon a introdus [dovada mizei](/developers/docs/consensus-mechanisms/pos/) în Ethereum. Aceasta asigură securitatea Ethereum și generează mai mult ETH pentru validatori în cadrul procesului. În practică, mizarea implică mizarea ETH pentru activarea software-ului validatorului. În calitate de staker, rulați software-ul care creează și validează noile blocuri din lanț.

Mizarea joacă același rol avut înainte de [minare](/developers/docs/consensus-mechanisms/pow/mining/), dar diferă în multe moduri. Minarea necesita cheltuieli inițiale mari, sub forma unor echipamente hardware puternice și a unui consum mare de energie, ceea ce duce la economii de scalare și promovarea centralizării. De asemenea, minarea nu implica cerințe pentru blocarea activelor drept garanție, limitând capacitatea protocolului de a pedepsi actorii răi după un atac.

Tranziția la dovada mizei a făcut ca Ethereum să fie mult mai sigur și mai descentralizat în comparație cu dovada muncii. Cu cât numărul de oameni din rețea este mai mare, cu atât mai descentralizată și mai sigură în caz de atacuri devine aceasta.

<InfoBanner emoji=":money_bag:">
  Dacă dorești să devii un validator și să contribui la securitatea Ethereum, <a href="/staking/">află mai multe despre mizare</a>.
</InfoBanner>

### Configurarea pentru fragmentare {#setting-up-for-sharding}

De la momentul în care Lanțul Beacon a fuzionat cu Rețeaua principală Ethereum, comunitatea Ethereum a început să caute să scaleze rețeaua.

Dovada mizei are avantajul de a deține un registru cu toți producătorii aprobați în orice moment, fiecare având în joc ETH. Acest registru creează condițiile pentru capacitatea de a diviza și de a cuceri, dar separă în mod fiabil responsabilitățile specifice rețelei.

Această responsabilitate contrastează cu dovada muncii, unde minerii nu au nicio obligație față de rețea și ar putea opri minarea și ar putea dezactiva permanent software-ul nodului într-o clipă, fără repercusiuni. De asemenea, nu există niciun registru al promotorilor de blocuri cunoscuți și nicio modalitate fiabilă de a împărți responsabilitățile din rețea în siguranță.

[Aflați mai multe despre fragmentare](/roadmap/danksharding/)

## Relațiile dintre actualizări {#relationship-between-upgrades}

Toate actualizările Ethereum se află într-o anumită corelație. Deci, să recapitulăm cum afectează Lanțul Beacon celelalte actualizări.

### Lanțul Beacon și Fuziunea {#merge-and-beacon-chain}

La început, Lanțul Beacon a existat separat de Rețeaua principală Ethereum, dar au fuzionat în 2022.

<ButtonLink href="/roadmap/merge/">
  Fuziunea
</ButtonLink>

### Fragmentele și Lanțul Beacon {#shards-and-beacon-chain}

Fragmentarea poate intra în ecosistemul Ethereum în siguranță doar cu un mecanism de consens în vigoare, dovada mizei. Lanțul Beacon a introdus mizarea, care a „fuzionat” cu Rețeaua principală, deschizând calea pentru fragmentare, pentru o scalare și mai mare a Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Lanțurile de fragmente
</ButtonLink>

## Referințe suplimentare

- [Mai multe despre viitoarele modernizări ale Ethereum](/roadmap/vision)
- [Mai multe despre dovada mizei](/developers/docs/consensus-mechanisms/pos)
