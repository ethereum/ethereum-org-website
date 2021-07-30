---
title: Razdrobljene verige
description: Preberite več o razdrobljenih verigah – delitve omrežja, ki Ethereumu zagotavljajo boljšo zmogljivost obdelovanja transakcij in lažje izvajanje.
lang: sl
template: eth2
sidebar: true
image: ../../../../../assets/eth2/newrings.png
summaryPoints:
  [
    "Razdrobljene verige so nadgradnja v več fazah za izboljševanje Ethereumove razširljivosti in zmogljivosti.",
    "Razdrobljene verige razdelijo obremenitev omrežja med 64 novih verig.",
    "Omogočajo enostavno izvajanje vozlišča, saj so zahteve glede strojne opreme nizke.",
    'Tehnični načrti vključujejo delo na razdrobljenih verigah v "fazi 1" in morda v "fazi 2".',
  ]
---

<UpgradeStatus date="~2021">
    Razdrobljene verige bi lahko bile uvedene enkrat v letu 2021, odvisno od hitrosti napredka po zagonu <a href="/en/eth2/beacon-chain/">oddajniške verige</a>. Ti drobci bodo Ethereumu zagotovili boljšo zmogljivost za obdelavo in dostop do podatkov, vendar se ne bodo uporabljali za izvajanje kode. Podrobnosti tega bodo še določene.
</UpgradeStatus>

## Kaj je razdrobitev? {#what-is-sharding}

Razdrobitev je postopek vodoravne razdelitve zbirke podatkov za razporeditev obremenitve – gre za splošen pojem na področju računalniške znanosti. V kontekstu Ethereuma bo razdrobitev zmanjšala prenatrpanost omrežja in povečala število transakcij na sekundo z ustvarjanjem novih verig, imenovanih »drobci«.

To je pomembno tudi iz drugih razlogov poleg razširljivosti.

## Lastnosti razdrobitve {#features-of-sharding}

### Vozlišče lahko izvaja vsakdo {#everyone-can-run-a-node}

Razdrobitev je dober način zagotavljanja razširljivosti, če je cilj ohraniti decentralizacijo omrežja, saj je druga možnost širitev s povečanjem velikosti obstoječe zbirke podatkov. Zaradi tega bi Ethereum postal manj dostopen za validatorje omrežja, saj bi potrebovali zmogljive in drage računalnike. Pri razdrobljenih verigah morajo validatorji shraniti/izvajati samo podatke o drobcu, ki ga potrjujejo, ne pa o celotnem omrežju (kot to deluje danes). To pospeši stvari in drastično zmanjšuje zahteve glede strojne opreme.

### Več sodelovanja v omrežju {#more-network-participation}

Razdrobitev vam bo sčasoma omogočala, da boste lahko Ethereum izvajali v osebnem prenosnem računalniku ali telefonu. Zato naj bi na razdrobljenem Ethereumu več ljudi imelo možnost sodelovanja ali izvajanja [odjemalcev](/developers/docs/nodes-and-clients/). S tem se bo izboljšala varnost, saj je pri bolj decentraliziranih omrežjih možnost za napad manjša.

Z manjšimi zahtevami glede strojne opreme bo razdrobitev omogočala lastno izvajanje [odjemalcev](/developers/docs/nodes-and-clients/) brez vsakršnega zanašanja na posredniške storitve. Če lahko, razmislite o tem, da bi izvajali več odjemalcev. To lahko pomaga zdravju omrežja z dodatnim zmanjšanjem točk, ki bi lahko odpovedale. [Izvajajte odjemalca Eth2](/eth2/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Na začetku boste morali odjemalca za glavno omrežje izvajati skupaj z odjemalcem Eth2. <a href="https://launchpad.ethereum.org" target="_blank">Na zagonski platformi</a> boste našli opis zahtev glede strojne opreme in postopka. Namesto tega lahko uporabljate <a href="/en/developers/docs/apis/backend/#available-libraries">zaledni API</a>.
</InfoBanner>

## 1. različica razdrobljenih verig: razpoložljivost podatkov {#data-availability}

Pri prvi uvedbi razdrobljenih verig v omrežju bodo zagotavljale samo nekaj dodatnih podatkov. Ne bodo obdelovale transakcij ali pametnih pogodb. Vendar bodo v kombinaciji s skupnimi vrednostmi še vedno zagotavljale neverjetne izboljšave števila transakcij na sekundo.

Skupne vrednosti so tehnologija na »2. plasti«, ki že obstaja. Decentraliziranim aplikacijam omogočajo, da zunaj verige blokov združijo ali ustvarijo »skupno vrednost« transakcij v posamezno transakcijo, ustvarijo kriptografski dokaz in ga pošljejo verigi. To zmanjša velikost podatkov, potrebnih za transakcijo. Če to povežemo z dodatno razpoložljivostjo podatkov, ki jih zagotavljajo razdrobljene verige, dobimo 100.000 transakcij na sekundo.

[Več o skupnih vrednostih](/developers/docs/layer-2-scaling/)

## 2. različica razdrobljenih verig: izvajanje kode {#code-execution}

Že od začetka načrtujemo, da bi razdrobljenim verigam dodali funkcionalnost in jih narediti bolj podobne današnjemu [glavnemu omrežju Ethereum](/glossary/#mainnet). To bi jim omogočalo shranjevanje in izvajanje pametnih pogodb ter obdelovanje računov. Toda, ali je ta nadgradnja še vedno potrebna glede na povečanje števila transakcij, ki ga zagotavlja 1. različica razdrobljenih verig? Skupnost o tem še vedno razpravlja, videti pa je, da je na voljo več možnosti.

### Ali drobci potrebujejo možnost izvajanja kode? {#do-shards-need-code-execution}

Vitalik Buterin je v pogovoru za poddajo Bankless predstavil 3 morebitne možnosti, o katerih je vredno razpravljati. <iframe width="100%" height="315" src="https://www.youtube.com/embed/-R0j5AMUSzA?start=5841" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

#### 1. Izvajanje stanj ni potrebno {#state-execution-not-needed}

To bi pomenilo, da drobcem ne zagotovimo možnosti obdelave pametnih pogodb in bodo še naprej delovale kot skladišča podatkov.

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

Oddajniška veriga vsebuje vso logiko za zagotavljanje varnosti in sinhronizacije drobcev. Oddajniška veriga bo usklajevala zastavljavce v omrežju in jim dodeljevala drobce, na katerih morajo delati. Prav tako bo lajšala komunikacijo med drobci s prejemanjem in shranjevanjem podatkov o transakcijah v drobcu, ki bodo dostopni drugim drobcem. To bo drobcem zagotovilo posnetek stanja Ethereuma, tako da bo vse vedno posodobljeno.<ButtonLink to="/eth2/beacon-chain/">Oddajniška veriga</ButtonLink>

### Drobci in spojitev {#shards-and-docking}

Glavno omrežje Ethereum bo tudi po uvedbi drobcev obstajalo v enaki obliki kot danes. Vendar bo moralo glavno omrežje na neki točki postati drobec, da bo lahko prešlo na zastavljanje. Ali bo glavno omrežje obstajalo kot edini »pameten« drobec, ki lahko obdeluje izvajanje kode, bomo še videli – kakorkoli že, odločitev bo sprejeta ob 2. fazi razdrobitve.<ButtonLink to="/eth2/docking/">Spojitev</ButtonLink>

<Divider />

### Preberite več {#read-more}

<Eth2ShardChainsList />
