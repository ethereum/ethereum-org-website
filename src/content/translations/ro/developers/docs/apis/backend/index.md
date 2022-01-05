---
title: Biblioteci API Back-end
description: O introducere în API-urile client Ethereum care îți permit să interacționezi cu blockchain-ul din aplicația ta.
lang: ro
sidebar: true
---

Pentru ca o aplicație software să interacționeze cu blockchain-ul Ethereum (adică să citească date blockchain și/sau să trimită tranzacții către rețea), trebuie să se conecteze la un nod Ethereum.

În acest scop, fiecare client Ethereum implementează specificația JSON-RPC, deci există un set uniform de puncte finale pe care se pot baza aplicațiile.

Dacă vrei să utilizezi un anumit limbaj de programare pentru a te conecta la un nod Ethereum, poți rula propria ta soluție, dar în ecosistem, există mai multe biblioteci practice, care fac acest lucru mult mai ușor. Cu aceste biblioteci, programatorii pot scrie metode intuitive, așa zise „câte o linie pe rând”, pentru a inițializa cererile JSON RPC (în culise) care interacționează cu Ethereum.

## Condiții prealabile {#prerequisites}

Ar putea fi util să înțelegi [Stiva Ethereum](/developers/docs/ethereum-stack/) și [Clienții Ethereum](/developers/docs/nodes-and-clients/).

## De ce să folosești o bibliotecă? {#why-use-a-library}

Aceste biblioteci elimină o mare parte din complexitatea interacțiunii directe cu un nod Ethereum. Ele oferă, de asemenea, funcții utilitare (cum ar fi conversia din ETH în Gwei), astfel încât ca programator, să petreci mai mult timp cu funcționalitatea unică a aplicației tale decât cu complexitatea clienților Ethereum.

## Biblioteci disponibile {#available-libraries}

**Alchemy -** **_Platforma de dezvoltare Ethereum._**

- [alchemyapi.io](https://alchemyapi.io)
- [Documentație](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.gg/kwqVnrA)

**BlockCypher -** **_API-uri web Ethereum_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentație](https://www.blockcypher.com/dev/ethereum/)

**Infura -** **_API-ul Ethereum ca serviciu._**

- [infura.io](https://infura.io)
- [Documentație](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Gateway Cloudflare pentru Ethereum.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_Acces API JSON-RPC la rețeaua principală și de testări Ethereum_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentație](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Rulează propriul tău serviciu API Ethereum, acceptând atât ETH, cât și ETC._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_Noduri Ethereum partajate și dedicate ca serviciu._**

- [chainstack.com](https://chainstack.com)
- [Documentație](https://docs.chainstack.com)

**QuikNode -** **_Platformă de dezvoltare Ethereum._**

- [quiknode.io](https://quiknode.io)

**Python Tooling -** **_O varietate de biblioteci pentru interacțiuni Ethereum prin Python._**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**web3j -** **_O bibliotecă de integrări Java/ Android/ Kotlin/ Scala pentru Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Documente](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_API-urile Ethereum și Ethereum Clasic ca serviciu, alimentat de software open source._**

- [rivet.cloud](https://rivet.cloud)
- [Documentație](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_O bibliotecă de integrare open source .NET pentru blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentație](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_

## Subiecte corelate {#related-topics}

- [Noduri și clienți](/developers/docs/nodes-and-clients/)
- [Cadrele de dezvoltare](/developers/docs/frameworks/)

## Tutoriale corelate {#related-tutorials}

- [Configurează Web3js pentru a utiliza blockchain-ul Ethereum în JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instrucțiuni pentru configurarea web3.js în proiectul tău._
- [Apelarea unui contract inteligent din JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Folosind tokenul DAI, vezi cum să apelezi funcțiile contractelor, folosind JavaScript._
