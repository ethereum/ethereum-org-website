---
title: Ethereum pentru programatorii JavaScript
description: Învăţaţi să programaţi pe Ethereum folosind proiecte și instrumente Java.
lang: ro
---

JavaScript este printre cele mai populare limbaje din ecosistemul Ethereum. De fapt, există o [echipă](https://github.com/ethereumjs) dedicată pentru a aduce cât mai mult posibil din Ethereum pe JavaScript.

Există oportunități de a scrie JavaScript (sau ceva apropiat) la [toate nivelurile de stivă](/developers/docs/ethereum-stack/).

## Interacționați cu Ethereum {#interact-with-ethereum}

### Biblioteci API JavaScript {#javascript-api-libraries}

Dacă doriţi să scrieţi JavaScript pentru a interoga blockchain-ul, a trimite tranzacții și multe altele, cel mai convenabil mod de a face acest lucru este utilizând o [bibliotecă API JavaScript](/developers/docs/apis/javascript/). Aceste API-uri permit dezvoltatorilor să interacționeze cu ușurință cu [nodurile din rețeaua Ethereum](/developers/docs/nodes-and-clients/).

Puteţi utiliza aceste biblioteci pentru a interacționa cu contractele inteligente pe Ethereum, deci este posibil să constuiţi o aplicaţie dapp când utilizaţi JavaScript doar pentru a interacționa cu contractele preexistente.

**Consultaţi**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/)_ – include implementarea portofelului Ethereum și utilitățile din JavaScript și TypeScript_

### Contracte inteligente {#smart-contracts}

Dacăsunteţi un programator JavaScript care dorește să scrie propriul său contract inteligent, poate vreţi să vă familiarzaţi cu [Solidity](https://solidity.readthedocs.io). This is the most popular smart contract language and it's syntactically similar to JavaScript, which may make it easier to learn.

Mai multe despre [contractele inteligente](/developers/docs/smart-contracts/).

## Înţelegerea protocolului {#understand-the-protocol}

### Mașina virtuală Ethereum {#the-ethereum-virtual-machine}

There is a JavaScript implementation of [Ethereum's virtual machine](/developers/docs/evm/). Aceasta acceptă cele mai recente reguli de forking. Regulile de forking se referă la modificările aduse la EVM ca urmare a actualizărilor planificate.

Este împărțit în mai multe pachete JavaScript pe care le puteţi verifica pentru a le înțelege mai bine:

- Conturi
- Blocuri
- Blockchain-ul în sine
- Tranzacții
- Și altele...

Acest lucru vă va ajuta să înțelegeți lucruri precum „care este structura datelor unui cont?”.

Dacă preferați să citiți codul, acest JavaScript ar putea fi o alternativă grozavă ca să citiţi documentele noastre.

**Citiţi despre monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Noduri și clienți {#nodes-and-clients}

Este un client Ethereumjs în dezvoltare. Vă va permite să exploraţi modul în care funcţionează clienții Ethereum într-un limbaj pe care îl înşelegeţi.

**Verificaţi acest client**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-client)

## Alte proiecte {#other-projects}

De asemenea, pe teritoriul lui Ethereum se întâmplă o mulțime de alte lucruri, inclusiv:

- biblioteci de utilitare pentru portofele.
- instrumente pentru a genera, importa și exporta chei Ethereum.
- o implementare a `arborelui-merkle-patricia` – o structură de date prezentată în cartea galbenp a lui Ethereum.

Cercetaţi orice vă interesează mai mult în [depozitarul EthereumJS](https://github.com/ethereumjs)

## Referințe suplimentare {#further-reading}

_Cunoaşteţi o resursă comunitară care v-a ajutat? Editaţi această pagină și adăugaţi-o!_
