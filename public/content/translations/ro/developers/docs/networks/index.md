---
title: Rețele
description: O prezentare generală a rețelelor Ethereum și de unde să obţineţi ether (ETH) de testnet pentru a vă testa aplicaţia.
lang: ro
---

Întrucât Ethereum este un protocol, aceasta înseamnă că pot exista mai multe „rețele” independente care se conformează acestui protocol şi care nu interacționează între ele.

Rețelele sunt diferite medii Ethereum pe care le puteţi accesa pentru dezvoltare, testare sau producție. Contul dvs. Ethereum funcționează în diferite rețele, dar soldul contului și istoricul tranzacțiilor dvs. nu vor fi preluate din rețeaua principală Ethereum. În scopul testării, este util să știţi ce rețele sunt disponibile și cum să obțineţi ETH de testnet, astfel încât să faceţi încercări.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegeți elementele de bază din Ethereum înainte de a citi pe diferite rețele, deoarece rețelele de testare vă vor oferi o versiune ieftină şi securizată a lui Ethereum pe care să o încercaţi. Vedeţi [introducerea noastră despre Ethereum](/developers/docs/intro-to-ethereum/).

## Rețele publice {#public-networks}

Rețelele publice sunt accesibile oricui are o conexiune internet din lume. Oricine poate citi sau crea tranzacții pe un blockchain public și poate valida tranzacțiile care se execută. Acordul privind tranzacțiile și starea rețelei este decis printr-un un consens al colegilor (peers).

### Mainnet (reţeaua principală) {#mainnet}

Mainnet-ul este principalul blockchain public de producție Ethereum, unde tranzacțiile cu valoare reală au loc pe registrul distribuit.

Atunci când oamenii și schimburile discută prețurile ETH-ului, aceștia vorbesc despre Mainnet-ul de ETH.

### Rețele de testare {#testnets}

În plus față de Mainnet, există testnet-uri publice. Acestea sunt rețele utilizate de dezvoltatorii de protocol sau de dezvoltatorii de contracte inteligente pentru a testa atât actualizările de protocol, cât și potențialele contracte inteligente într-un mediu similar celui de producție, înainte de implementarea pe Mainnet. Consideraţi acest lucru ca analogie cu serverele de producție față de servere intermediare.

În general, este important de testat orice cod de contract pe care îl scrieţi pe un testnet înaintea implementării acestuia pe Mainnet. În cazul în care construiţi o aplicație dapp care se integrează cu contractele inteligente existente, la cele mai multe proiecte sunt distribuite copii în testnet-uri, cu care puteţi interacționa.

Majoritatea testnet-urilor utilizează un mecanism de consens pentru dovada-autorității. Acest lucru înseamnă că este ales un număr mic de noduri pentru a valida tranzacțiile și a crea blocuri noi – în acest proces mizându-li-se identitatea. Este greu de stimulat minarea pe un testnet bazat pe dovada-muncii, care îl poate face vulnerabil.

ETH-ul pe testnet-uri nu are o valoare reală; de aceea, nu există piețe pentru ETH-ul testnet. Din moment ce aveţi nevoie de ETH pentru a interacționa într-adevăr cu Ethereum, cei mai mulți obțin ETH de la un faucet. Cele mai multe faucet-uri sunt aplicații web în care puteţi introduce o adresă la care să solicitaţi să se trimită ETH.

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

A testnet for [Arbitrum](https://arbitrum.io/).

##### Arbitrum Rinkeby faucets

- [FaucETH](https://fauceth.komputing.org)(Multi-Chain faucet without the need for social account)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

#### Görli {#goerli}

Un testnet bazat pe dovada-autorității care funcționează la nivelul tuturor clienţilor.

##### Görli faucets

- [Faucet-ul Görli](https://faucet.goerli.mudit.blog/)
- [Chainlink faucet](https://faucets.chain.link/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)

#### Kintsugi {#kintsugi}

A merge testnet for Ethereum.

##### Kintsugi faucets

- [FaucETH](https://fauceth.komputing.org)(Multi-Chain faucet without the need for social account)
- [Kintsugi faucet](https://faucet.kintsugi.themerge.dev/)

#### Kovan {#kovan}

Un testnet bazat pe dovada-autorității pentru cei care rulează clienții OpenEthereum.

##### Kovan faucets

- [FaucETH](https://fauceth.komputing.org)(Multi-Chain faucet without the need for social account)
- [Faucet-ul Kovan](https://faucet.kovan.network/)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

#### Optimistic Kovan {#optimistic-kovan}

A testnet for [Optimism](https://www.optimism.io/).

##### Optimistic Kovan faucets

- [FaucETH](https://fauceth.komputing.org)(Multi-Chain faucet without the need for social account)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

#### Rinkeby {#rinkeby}

Un testnet bazat pe dovada-autorității pentru cei care rulează clienții OpenEthereum.

##### Rinkeby faucets

- [FaucETH](https://fauceth.komputing.org)(Multi-Chain faucet without the need for social account)
- [Alchemy faucet](https://RinkebyFaucet.com)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)
- [Faucet-ul Rinkeby](https://faucet.rinkeby.io/)

#### Ropsten {#ropsten}

Un testnet bazat pe dovada-muncii. Aceasta înseamnă că este reprezentarea cea mai apropiată de Ethereum.

##### Ropsten faucets

- [FaucETH](https://fauceth.komputing.org)(Multi-Chain faucet without the need for social account)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

## Rețele private {#private-networks}

O rețea Ethereum este o rețea privată dacă nodurile sale nu sunt conectate la o rețea publică (de exemplu, Mainnet sau tesnet). În acest context, „privat” înseamnă doar rezervat sau izolat, mai degrabă decât protejat sau sigur.

### Rețele de dezvoltare {#development-networks}

Pentru a dezvolta o aplicație Ethereum, va trebui să o rulaţi într-o rețea privată pentru a vedea cum funcționează înainte de a o implementa. La fel cum vă creaţi un server local pe computer pentru dezvoltarea pe web, puteţi crea o instanță locală blockchain pentru a vă testa aplicația dapp. Aceasta permite o iterație mult mai rapidă decât pe un testnet public.

Există proiecte și instrumente dedicate pentru a ajuta la acest lucru. Aflaţi mai multe despre [rețelele de dezvoltare](/developers/docs/development-networks/).

### Rețele de consorțiu {#consortium-networks}

Procesul de consens este controlat de un set predefinit de noduri care sunt de încredere. De exemplu, o rețea privată de instituții academice cunoscute, care guvernează fiecare câte un singur nod, iar blocurile sunt validate de un număr limitat de semnatari din rețea.

Dacă o rețea publică Ethereum este ca internetul public, puteţi considera că o rețea de consorțiu este un intranet privat.

## Instrumente corelate {#related-tools}

- [Chainlist](https://chainlist.org/) _lista de rețele EVM pentru conectarea portofelelor și a furnizorilor la Chain-ID-ul și la ID-ul de rețea corespunzător._
- [EVM-based Chains](https://github.com/ethereum-lists/chains) _Depozitarul GitHub de metadate ale lanțului care activează Chainlist_

## Referințe suplimentare {#further-reading}

_Cunoaşteţi o resursă comunitară care v-a ajutat? Editaţi această pagină și adăugaţi-o!_
