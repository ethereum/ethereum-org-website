---
title: Date și analize
description: Cum să obţineţi statistici și date on-chain pentru a fi utilizate în aplicațiile dvs. dapp
lang: ro
---

## Introducere {#Introduction}

Pe măsură ce utilizarea rețelei continuă să crească, va exista o cantitate tot mai mare de informații valoroase în datele on-chain. Volumul de date crescând rapid, calculul și agregarea acestor informații despre care să raportaţi sau cu care să operaţi o aplicație dApp pot deveni un proces foarte lent și costisitor.

Mobilizarea furnizorilor de date existenți poate accelera dezvoltarea, poate produce rezultate mai precise și poate reduce eforturile de întreținere în curs. Acest lucru va permite ca echipa să se axeze pe funcționalitatea de bază pe care încearcă să o ofere proiectul său.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegeţi conceptul de bază al [Exploratorilor de Blocuri](/developers/docs/data-and-analytics/block-explorers/) pentru a vă da mai bine seama cum să-i utilizaţi în contextul analizei datelor. În plus, familiarizaţi-vă cu conceptul unui [index](/glossary/#index) pentru a înțelege beneficiile pe care le aduce conceptului sistemului.

În ceea ce priveşte bazele arhitecturale, înţelegerea noţiunilor de [API](https://www.wikipedia.org/wiki/API) și [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), chiar și teoretic.

## The Graph {#the-graph}

[Graph Network](https://thegraph.com/) este un protocol de indexare descentralizată pentru organizarea datelor blockchain-ului. În loc să construiască și să gestioneze date off-chain și magazine de date centralizate pentru agregarea datelor on-chain, cu The Graph dezvoltatorii pot construi aplicații fără servere, care rulează în întregime pe infrastructura publică.

Folosind [GraphQL](https://graphql.org/), dezvoltatorii pot interoga oricare dintre API-urile deschise, cunoscute sub numele de sub-grafice, pentru a obține informațiile de care au nevoie pentru a-și opera aplicația dApp. Prin interogarea acestor sub-grafice indexate, rapoartele și aplicațiile dApp nu numai că obțin beneficii de performanță și scalabilitate, ci și o precizie intrinsecă oferită de consensul rețelei. Pe măsură sunt aduse noi perfecţionări reţelei și/sau sunt adăugate sub-grafice, proiectele dvs. pot itera rapid pentru a profita de aceste îmbunătățiri.

## Exploratori de blocuri {#block-explorers}

Mulți [Exploratori de blocuri](/developers/docs/data-and-analytics/block-explorers/) oferă gateway-uri de tip [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) care vor oferi dezvoltatorilor vizibilitatea datelor în timp real pe blocuri, tranzacțiilor, miner-ilor, conturilor și altor activități on-chain.

Dezvoltatorii pot apoi procesa și transforma aceste date pentru a le oferi utilizatorilor informaţii detaliate și interacțiuni unice cu [blockchain-ul](/glossary/#blockchain).

## Referințe suplimentare {#further-reading}

- [Prezentare generală Graph Network](https://thegraph.com/docs/en/about/network/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Exemple de cod API pe EtherScan](https://etherscan.io/apis#contracts)
