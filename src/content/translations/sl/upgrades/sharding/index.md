---
title: Razdrobitev
description: Več informacij o razdrobitvi – delitvi in distribuciji podatkovnega prometa, ki Ethereumu zagotavljata večjo zmogljivost obdelovanja transakcij in lažje izvajanje.
lang: sl
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Razdrobitev je večfazna nadgradnja za izboljšanje Ethereumove razširljivosti in kapacitete.
summaryPoint2: Razdrobitev omogoča varno porazdelitev zahtev za shranjevanje podatkov, kar omogoča še cenejše zagotavljanje skupnih vrednosti in preprostejše upravljanje vozlišč.
summaryPoint3: Omogoča, da rešitve na 2. plasti ponujajo nizke transakcijske provizije, hkrati pa izrabljajo Ethereumovo zaščito.
summaryPoint4: Ta nadgradnja je dobila višjo prioriteto, odkar je Ethereum začel uporabljati mehanizem dokaza o deležu.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Razdrobitev bi lahko prišla v uporabo leta 2023. Drobci bodo Ethereumu zagotovili večjo zmogljivost za obdelavo in dostop do podatkov, vendar se ne bodo uporabljali za izvajanje kode.
</UpgradeStatus>

## Kaj je razdrobitev? {#what-is-sharding}

Razdrobitev je postopek vodoravne razdelitve zbirke podatkov za razporeditev obremenitve – gre za običajen pojem na področju računalniške znanosti. V Ethereumovem omrežju bo razdrobitev skupaj z [združevanjem transakcij na 2. plasti](/layer-2/) porazdelila breme obravnave velikih količin podatkov, ki jih združevanje transakcij potrebuje v celotnem omrežju. To bo še dodatno zmanjšalo zasedenost omrežja in povečalo število mogočih transakcij na sekundo.

To ni pomembno samo za razširljivost, ampak tudi iz drugih razlogov.

## Lastnosti razdrobitve {#features-of-sharding}

### Vozlišče lahko upravlja kdorkoli {#everyone-can-run-a-node}

Razdrobitev je dober način zagotavljanja razširljivosti, če je cilj ohraniti decentralizacijo omrežja, saj je druga možnost širitev s povečanjem velikosti obstoječe zbirke podatkov. Zaradi tega bi Ethereum postal manj dostopen za validatorje omrežja, saj bi potrebovali zmogljive in drage računalnike. Po razdrobitvi validatorjem ne bo treba shranjevati vseh podatkov. Namesto tega bodo lahko uporabljali načine za obdelavo podatkov, s katerimi bodo potrdili, da so podatki na voljo omrežju kot celoti. S tem se bodo močno znižali stroški shranjevanja podatkov na 1. plasti, saj bodo zahteve po strojni opremi manj stroge.

### Več sodelovanja v omrežju {#more-network-participation}

Razdrobitev vam bo sčasoma omogočala, da boste lahko Ethereumovo vozlišče upravljali v osebnem prenosnem računalniku ali telefonu. Tako naj bi na razdrobljenem Ethereumu več ljudi lahko sodelovalo ali upravljalo [odjemalce](/developers/docs/nodes-and-clients/). S tem se bo izboljšala varnost, saj je pri bolj decentraliziranih omrežjih možnost za napad manjša.

Z manjšimi zahtevami glede strojne opreme bo razdrobitev omogočala lastno izvajanje [odjemalcev](/developers/docs/nodes-and-clients/) brez vsakršnega zanašanja na posredniške storitve. Če lahko, razmislite o tem, da bi upravljali več odjemalcev. To lahko pomaga zdravju omrežja z dodatnim zmanjšanjem števila točk odpovedi.

<br />

<InfoBanner isWarning>
  Odjemalec za izvajanje bo moral delovati ob enakem času kot odjemalec za soglasje. <a href="https://launchpad.ethereum.org" target="_blank">Na zagonski platformi</a> boste našli opis zahtev glede strojne opreme in postopka.
</InfoBanner>

## 1. različica razdrobljenih verig: razpoložljivost podatkov {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>Opomba:</strong> Načrti za razdrobitev se spreminjajo, saj so bili razviti učinkovitejši načini širjenja omrežja. "Dankova razdrobitev" je nov pristop k razdrobitvi, ki ne uporablja koncepta razdrobljenih "verig", pač pa za drobljenje podatkov uporablja razdrobljene "skupke", ob tem pa z "vzorčenjem razpoložljivosti podatkov" potrjuje, da so na voljo vsi podatki. S to spremembo načrtov odpravljamo enako izvorno težavo.<br/><br/>
  <strong>Z najnovejšimi načrti razvoja vse podrobnosti morda ne veljajo več.</strong> Dokler zadeve posodabljamo, si v poročilu <a href="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum">Štoparski vodnik po Ethereumu</a> oglejte odlično analizo Ethereumove časovnice.
</InfoBanner>

Pri prvi uvedbi bodo razdrobljene verige v omrežju zagotavljale samo nekaj dodatnih podatkov. Ne bodo obdelovale transakcij ali pametnih pogodb. Vendar bodo v kombinaciji z združevanjem transakcij še vedno zagotavljale neverjetne izboljšave števila transakcij na sekundo.

Združevanje transakcij je tehnologija na »2. plasti«, ki že obstaja. Decentraliziranim aplikacijam omogoča, da zunaj verige blokov združijo ali ustvarijo »skupno vrednost« transakcij v posamezno transakcijo, ustvarijo kriptografski dokaz in ga pošljejo verigi. To zmanjša velikost podatkov, potrebnih za transakcijo. Če to povežemo z dodatno razpoložljivostjo podatkov, ki jih zagotavljajo razdrobljene verige, dobimo 100.000 transakcij na sekundo.

## 2. različica razdrobljenih verig: izvajanje kode {#code-execution}

Že od začetka je v načrtu, da se razdrobljenim verigam doda funkcionalnosti, ki bi jih naredile bolj podobne [glavnemu Ethereumovemu omrežju](/glossary/#mainnet), kot ga poznamo danes. Tako bi lahko vsaka od njih shranjevala in izvajala kodo ter obravnavala transakcije, saj bi vsak drobec vseboval edinstven nabor pametnih pogodb in stanj na računih. Komunikacija med drobci bi omogočala izvajanje transakcij med različnimi drobci.

Ali je ta nadgradnja še vedno potrebna glede na povečanje števila transakcij, ki ga zagotavlja 1. različica drobcev? Skupnost o tem še vedno razpravlja, videti pa je, da je na voljo več možnosti.

### Ali drobci potrebujejo možnost izvajanja kode? {#do-shards-need-code-execution}

Vitalik Buterin je v pogovoru za podkast Bankless predstavil 3 morebitne možnosti, o katerih je vredno razpravljati.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Izvajanje stanj ni potrebno {#state-execution-not-needed}

To bi pomenilo, da drobcem ne zagotovimo možnosti obdelave pametnih pogodb in bodo še naprej delovali kot skladišča podatkov.

#### 2. Nekateri drobci imajo zmožnost izvajanja {#some-execution-shards}

Morda obstaja kompromis, pri katerem ni treba, da so vsi drobci pametnejši. To funkcionalnost bi lahko dodali samo nekaterim, druge pa pustili, kot so. To bi lahko pospešilo uvedbo.

#### 3. Počakamo na sposobnost izvajanja neinteraktivnih dokazov brez razkritja znanja (dokazi ZK SNARK) {#wait-for-zk-snarks}

Nazadnje bi morali to razpravo nadaljevati, ko bodo neinteraktivni dokazi brez razkritja znanja utrjeni. Ta tehnologija bi lahko v omrežje vnesla resnično zasebne transakcije. Verjetno bo zahtevala pametnejše drobce, vendar je zaenkrat še na stopnji raziskave in razvoja.

#### Drugi viri {#other-sources}

Še nekaj mnenj v podobni smeri:

- [Faza ena in konec: Eth2 kot mehanizem za razpoložljivost podatkov](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

To je še vedno tema aktivne razprave. Ko bomo imeli več informacij, bomo posodobili te strani.

## Razmerje med nadgradnjami {#relationship-between-upgrades}

Vse nadgradnje Ethereuma so med seboj delno povezane. Ponovimo torej, kako razdrobljene verige vplivajo na druge nadgradnje.

### Drobci in Ethereumova veriga blokov {#shards-and-blockchain}

Logika za zaščito in sinhroniziranje drobcev je v celoti vdelana v Ethereumove odjemalce, iz katerih je zgrajena veriga blokov. Zastavljavci v omrežju bodo dodeljeni drobcem, na katerih bodo delali. Drobci bodo imeli dostop do posnetkov drugih vzorcev. Tako si bodo lahko sestavili pregled Ethereumovega stanja in zagotavljali, da so vsi podatki posodobljeni.

### Preberite več {#read-more}

<ShardChainsList />
