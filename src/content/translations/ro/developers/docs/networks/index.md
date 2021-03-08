---
title: Rețele
description: O prezentare generală a rețelelor Ethereum și de unde să obții eter pentru rețelele de testare (ETH) pentru testarea aplicației.
lang: ro
sidebar: true
---

Întrucât Ethereum este un protocol, aceasta înseamnă că pot exista mai multe „rețele” independente care se conformează acestui protocol care nu interacționează între ele.

Rețelele sunt diferite medii Ethereum pe care le poți accesa pentru dezvoltare, testare sau producție. Contul tău Ethereum va funcționa în diferite rețele, dar soldul contului și istoricul tranzacțiilor nu vor fi preluate din rețeaua principală Ethereum. În scopuri de testare, este util să știi ce rețele sunt disponibile și cum să obții ETH pentru testare, astfel încât să te poți juca cu el.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegi elementele de bază ale Ethereum înainte de a citi despre diferite alte rețele, deoarece rețelele de testare îți vor oferi o versiune ieftină și sigură a Ethereum cu care să te joci. Încearcă [introducerea noastră la Ethereum](/en/developers/docs/intro-to-ethereum/).

## Rețele publice {#public-networks}

Rețelele publice sunt accesibile oricui din lume cu o conexiune la internet. Oricine poate citi sau crea tranzacții pe un blockchain public și poate valida tranzacțiile executate. Acordul privind tranzacțiile și starea rețelei este decis de un consens al colegilor.

### Rețeaua principală {#mainnet}

Rețeaua principală este principalul blockchain public de producție Ethereum, unde tranzacțiile cu valoare reală au loc pe registrul distribuit.

Atunci când oamenii și schimburile discută despre prețurile ETH, aceștia vorbesc despre rețeaua principală ETH.

### Rețele de testare {#testnets}

În plus față de rețeaua principală, există rețele de testare publice. Acestea sunt rețele utilizate de programatorii de protocol sau de programatorii de contracte inteligente pentru a testa atât actualizările de protocol, cât și potențialele contracte inteligente într-un mediu de producție, înainte de implementarea pe rețeaua principală. Gândește-te la acest lucru ca o analogie la serverele de producție față de servere intermediare.

În general, este important să testezi orice cod de contract pe care îl scrii pe o rețea de testare înaintea implementării pe rețeaua principală. În cazul în care construiești o aplicație dapp care se integrează cu contractele inteligente existente, cele mai multe proiecte au copii distribuite în rețelele de testare cu care poți interacționa.

Majoritatea rețelelor de testare utilizează un mecanism de consens de verificare a autorității. Acest lucru înseamnă că un număr mic de noduri sunt alese pentru a valida tranzacțiile și a crea blocuri noi – mizând identitatea lor în acest proces. Este greu să stimulezi mineritul pe o rețea de testare bazată pe dovada muncii, care o poate lăsa vulnerabilă.

#### Görli {#goerli}

O rețea de testare bazată pe dovada autorității care funcționează pe clienți scriși în diferite limbaje.

#### Kovan {#kovan}

O rețea de testare bazată pe dovada autorității pentru cei care rulează clienții OpenEthereum.

#### Rinkeby {#rinkeby}

O rețea de testare bazată pe dovada autorității pentru cei care rulează clientul Geth.

#### Ropsten {#ropsten}

O rețea de testare bazată pe dovada muncii. Aceasta înseamnă că este reprezentarea cea mai apropiată de Ethereum.

### Faucet-uri cu ETH de testare {#testnet-faucets}

ETH-ul pe rețelele de testate nu are o valoare reală; de aceea, nu există piețe pentru ETH-ul de testare. Din moment ce ai nevoie de ETH pentru a interacționa de fapt cu Ethereum, cei mai mulți oameni obțin ETH de la un faucet. Cele mai multe faucet-uri sunt aplicații web în care poți să introduci o adresă la care soliciți să fie trimis ETH.

- [Faucet-ul Görli](https://faucet.goerli.mudit.blog/)
- [Faucet-ul Kovan](https://faucet.kovan.network/)
- [Faucet-ul Rinkeby](https://faucet.rinkeby.io/)
- [Faucet-ul Ropsten](https://faucet.ropsten.be/)

## Rețele private {#private-networks}

O rețea Ethereum este o rețea privată dacă nodurile sale nu sunt conectate la o rețea publică (de exemplu, rețea principală sau de testare). În acest context, „privat” înseamnă doar rezervat sau izolat, mai degrabă decât protejat sau sigur.

### Rețele de dezvoltare {#development-networks}

Pentru a dezvolta o aplicație Ethereum, va trebui să o rulezi într-o rețea privată pentru a vedea cum funcționează înainte de a o implementa. Similar cu modul în care îți creezi un server local pe computerul pentru dezvoltarea web, poți crea o instanță locală blockchain pentru a-ți testa aplicația dapp. Aceasta permite o iterație mult mai rapidă decât pe o rețea de testare publică.

Există proiecte și instrumente dedicate pentru a ajuta la acest lucru. Obține mai multe informații despre [rețelele de dezvoltare](/developers/docs/development-networks/).

### Rețele de consorțiu {#consortium-networks}

Procesul de consens este controlat de un set predefinit de noduri care sunt de încredere. De exemplu, o rețea privată de instituții academice cunoscute, care guvernează fiecare un singur nod și blocurile sunt validate de un număr limitat de semnatari din rețea.

Dacă o rețea publică Ethereum este ca internetul public, te poți gândi la o rețea de consorțiu ca la un intranet privat.

<!-- TODO

## Interacting with testnets

### Your own local network {#your-own-local-network}

`geth -—networkid="12345" console`

### Testnets {#testnets-1}

Wallets like MetaMask or MyEtherWallet will allow you to switch networks so you can test your apps using your test ETH.

-->

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_
