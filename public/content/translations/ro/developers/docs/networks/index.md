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

#### Sepolia {#sepolia}

**Sepolia este rețeaua de testare implicită recomandată pentru dezvoltarea aplicațiilor**. Rețeaua Sepolia utilizează un set închis de validatori. Este relativ nouă, ceea ce înseamnă că atât starea sa cât și istoricul său sunt foarte mici. Acest lucru înseamnă că rețeaua se sincronizează rapid și că rularea unui nod necesită mai puțin spațiu de stocare. Acest lucru este util pentru utilizatorii care doresc să pornească rapid un nod și să comunice direct cu rețeaua.

- Set închis de validatori, gestionat de echipele de clienți și teste
- Rețea de testare nouă, mai puține aplicații distribuite decât în alte rețele de testare
- Sincronizare rapidă și necesită spațiu minim pe disc pentru rularea unui nod

##### Resurse

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Robinete

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)
- [Coinbase Wallet Faucet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)
- [Chainstack Sepolia Faucet](https://faucet.chainstack.com/sepolia-faucet)
- [Ethereum Ecosystem Faucets](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Hoodi {#hoodi}

_Notă: [Rețeaua de testare Goerli este învechită](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) și a fost înlocuită de Hoodi. Luați în considerare migrarea aplicațiilor dvs. către Sepolia._

Hoodi este o rețea de testare pentru testarea validării și stakingului. Rețeaua Hoodi este deschisă pentru utilizatorii care doresc să ruleze un validator al rețelei de testare. Stakerii care doresc să testeze actualizările protocolului înainte de a fi implementate pe rețeaua principală ar trebui să folosească Hoodi.

- Set deschis de validatori, stakerii pot testa actualizările rețelei
- Stare mare, utilă pentru testarea interacțiunilor complexe cu contractele inteligente
- Timp mai lung de sincronizare și necesită mai mult spațiu de stocare pentru rularea unui nod

##### Resurse

- [Website](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)

##### Faucet-uri

- [Hoodi Faucet](https://hoodi.ethpandaops.io/)

Pentru a lansa un Validator pe rețeaua de testare Hoodi, folosiți [Hoodi launchpad](https://hoodi.launchpad.ethereum.org/en/).

### Rețele de testare Layer 2 {#layer-2-testnets}

[Layer 2 (L2)](/layer-2/) este un termen colectiv pentru a descrie un set specific de soluții de scalare Ethereum. Un Layer 2 este un blockchain separat care extinde Ethereum și moștenește garanțiile de securitate ale Ethereum. Rețelele de testare Layer 2 sunt de obicei strâns cuplate cu rețelele de testare publice Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

O rețea de testare pentru [Arbitrum](https://arbitrum.io/).

##### Faucet-uri

- [Faucet Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Faucet Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

O rețea de testare pentru [Optimism](https://www.optimism.io/).

##### Faucet-uri

- [Faucet Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Faucet Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)

#### Starknet Sepolia {#starknet-sepolia}

O rețea de testare pentru [Starknet](https://www.starknet.io).

##### Faucet-uri

- [Faucet Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)

## Rețele private {#private-networks}

O rețea Ethereum este o rețea privată dacă nodurile sale nu sunt conectate la o rețea publică (de exemplu, Mainnet sau tesnet). În acest context, "privat" înseamnă doar rezervat sau izolat, mai degrabă decât protejat sau sigur.

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

- [Propunere: ciclu de viață previzibil al testnet-urilor Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [Evoluția testnet-urilor Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
