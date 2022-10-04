---
title: Razdrobljene verige
description: Preberite več o razdrobljenih verigah – delitve omrežja, ki Ethereumu zagotavljajo boljšo zmogljivost obdelovanja transakcij in lažje izvajanje.
lang: sl
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Drobljenje je večstopenjska nadgradnja z namenom izboljšanja Ethereumove nadgradljivosti in kapacitet.
summaryPoint2: Razdrobljene verige razdelijo obremenitev omrežja na 64 novih verig.
summaryPoint3: Z ohranjanjem nizkih zahtev po strojni opremi lajšajo zagon vozlišč.
summaryPoint4: Ta nadgradnja je načrtovana kot naslednji korak po spojitvi glavnega omrežja z oddajniško verigo.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Razdrobljene verige bi morale biti uvedene enkrat v letu 2023, odvisno od hitrosti napredka po <a href="/upgrades/merge/">spojitvi</a>. Ti drobci bodo Ethereumu zagotovili boljšo zmogljivost za obdelavo in dostop do podatkov, vendar se ne bodo uporabljali za izvajanje kode. Podrobnosti tega bodo še določene.
</UpgradeStatus>

## Kaj je razdrobitev? {#what-is-sharding}

Razdrobitev je postopek vodoravne razdelitve zbirke podatkov za razporeditev obremenitve – gre za splošen pojem na področju računalniške znanosti. V kontekstu Ethereuma bo razdrobitev zmanjšala prenatrpanost omrežja in povečala število transakcij na sekundo z ustvarjanjem novih verig, imenovanih »drobci«.

To je pomembno tudi iz drugih razlogov poleg razširljivosti.

## Lastnosti razdrobitve {#features-of-sharding}

### Vozlišče lahko izvaja vsakdo {#everyone-can-run-a-node}

Razdrobitev je dober način zagotavljanja razširljivosti, če je cilj ohraniti decentralizacijo omrežja, saj je druga možnost širitev s povečanjem velikosti obstoječe zbirke podatkov. Zaradi tega bi Ethereum postal manj dostopen za validatorje omrežja, saj bi potrebovali zmogljive in drage računalnike. Pri razdrobljenih verigah morajo validatorji shraniti/izvajati samo podatke o drobcu, ki ga potrjujejo, ne pa o celotnem omrežju (kot to deluje danes). To pospeši stvari in drastično zmanjšuje zahteve glede strojne opreme.

### Več sodelovanja v omrežju {#more-network-participation}

Razdrobitev vam bo sčasoma omogočala, da boste lahko Ethereum izvajali v osebnem prenosnem računalniku ali telefonu. Zato naj bi na razdrobljenem Ethereumu več ljudi imelo možnost sodelovanja ali izvajanja [odjemalcev](/developers/docs/nodes-and-clients/). S tem se bo izboljšala varnost, saj je pri bolj decentraliziranih omrežjih možnost za napad manjša.

Z manjšimi zahtevami glede strojne opreme bo razdrobitev omogočala lastno izvajanje [odjemalcev](/developers/docs/nodes-and-clients/) brez vsakršnega zanašanja na posredniške storitve. Če lahko, razmislite o tem, da bi izvajali več odjemalcev. To lahko pomaga zdravju omrežja z dodatnim zmanjšanjem točk, ki bi lahko odpovedale. [Izvajajte odjemalca Eth2](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Na začetku boste morali odjemalca za glavno omrežje izvajati skupaj z odjemalcem Eth2. <a href="https://launchpad.ethereum.org" target="_blank">Na zagonski platformi</a> boste našli opis zahtev glede strojne opreme in postopka. Namesto tega lahko uporabljate <a href="/developers/docs/apis/backend/#available-libraries">zaledni API</a>.
</InfoBanner>

## 1. različica razdrobljenih verig: razpoložljivost podatkov {#data-availability}

Pri prvi uvedbi razdrobljenih verig v omrežju bodo zagotavljale samo nekaj dodatnih podatkov. Ne bodo obdelovale transakcij ali pametnih pogodb. Vendar bodo v kombinaciji s skupnimi vrednostmi še vedno zagotavljale neverjetne izboljšave števila transakcij na sekundo.

Skupne vrednosti so tehnologija na »2. plasti«, ki že obstaja. Decentraliziranim aplikacijam omogočajo, da zunaj verige blokov združijo ali ustvarijo »skupno vrednost« transakcij v posamezno transakcijo, ustvarijo kriptografski dokaz in ga pošljejo verigi. To zmanjša velikost podatkov, potrebnih za transakcijo. Če to povežemo z dodatno razpoložljivostjo podatkov, ki jih zagotavljajo razdrobljene verige, dobimo 100.000 transakcij na sekundo.

<InfoBanner isWarning={false}>
  Nedavni napredek v raziskavah in razvoju s področja rešitev za nadgradljivosti na podlagi 2. plasti je privedel do prioritizacije spojitve pred razdrobljenimi verigami. Te bodo prišle v ospredje po prehodu glavnega omrežja na dokaz o deležu.

[Več o zvitkih](/developers/docs/scaling/#rollups)
</InfoBanner>

## 2. različica razdrobljenih verig: izvajanje kode {#code-execution}

Že od začetka je v načrtu, da se razdrobljenim verigam doda funkcionalnosti, ki bi jih naredile bolj podobne [Glavnemu omrežju Ethereum](/glossary/#mainnet), kot ga poznamo danes. To bi jim omogočalo shranjevanje in izvajanje pametnih pogodb ter obdelovanje računov. Toda, ali je ta nadgradnja še vedno potrebna glede na povečanje števila transakcij, ki ga zagotavlja 1. različica razdrobljenih verig? Skupnost o tem še vedno razpravlja, videti pa je, da je na voljo več možnosti.

### Ali drobci potrebujejo možnost izvajanja kode? {#do-shards-need-code-execution}

Vitalik Buterin je v pogovoru za podkast Bankless predstavil 3 morebitne možnosti, o katerih je vredno razpravljati.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Izvajanje stanj ni potrebno {#state-execution-not-needed}

To bi pomenilo, da drobcem ne zagotovimo možnosti obdelave pametnih pogodb, in bodo še naprej delovale kot skladišča podatkov.

#### 2. Nekateri drobci imajo zmožnost izvajanja {#some-execution-shards}

Morda obstaja kompromis, pri katerem ne potrebujemo vseh pametnih drobcev (trenutno je načrtovanih 64). To funkcionalnost bi lahko dodali samo nekaterim, druge pa pustili, kot so. To bi lahko pospešilo dostavo.

#### 3. Počakamo na sposobnost izvajanja neinteraktivnih dokazov brez razkritja znanja (ZK snarks) {#wait-for-zk-snarks}

Nazadnje bi morali to razpravo nadaljevati, ko bodo neinteraktivni dokazi brez razkritja znanja utrjeni. Ta tehnologija bi lahko v omrežje vnesla resnično zasebne transakcije. Verjetno bo zahtevala pametnejše drobce, vendar je zaenkrat še na stopnji raziskave in razvoja.

#### Drugi viri {#other-sources}

Še nekaj mnenj v podobni smeri:

- [Faza ena in konec: Eth2 kot mehanizem za razpoložljivost podatkov](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

To je še vedno tema aktivne razprave. Ko bomo imeli več informacij, bomo posodobili te strani.

## Razmerje med nadgradnjami {#relationship-between-upgrades}

Nadgradnje Eth2 so vse delno medsebojno povezane. Ponovimo torej, kako razdrobljene verige vplivajo na druge nadgradnje.

### Drobci in oddajniška veriga {#shards-and-beacon-chain}

Oddajniška veriga vsebuje vso logiko za zagotavljanje varnosti in sinhronizacije razdrobljenih verig. Usklajevala bo zastavljalce v omrežju in jim dodeljevala drobce, na katerih naj delajo. Prav tako bo lajšala komunikacijo med drobci s prejemanjem in shranjevanjem podatkov o transakcijah v drobcu, ki bodo dostopni drugim drobcem. To jim bo zagotovilo posnetek stanja Ethereuma, tako da bo vse vedno posodobljeno.

<ButtonLink to="/upgrades/beacon-chain/">Oddajniška veriga</ButtonLink>

### Drobci in spojitev {#shards-and-docking}

Ko bodo drobci dodani, bo glavno omrežje Ethereum že zavarovano s strani oddajniške verige, ki uporablja dokaz o deležu. To omogoča plodno glavno omrežje na katerem se lahko gradijo razdrobljene verige, ki jih poganjajo reštive na podlagi tehnologije 2. plasti za povečanje nadgradljivosti.

Bomo še videli, ali bo glavno omrežje obstajalo kot edini "pametni" drobec, ki lahko obvladuje izvajanje programske kode – v vsakem primeru pa se lahko k odločitvi o razširitvi drobcev vrnemo, če bo to potrebno.

<ButtonLink to="/upgrades/merge/">Spojitev</ButtonLink>

<Divider />

### Preberite več {#read-more}

<ShardChainsList />
