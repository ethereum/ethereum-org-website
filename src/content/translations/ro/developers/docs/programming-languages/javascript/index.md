---
title: Ethereum pentru programatori JavaScript
description: Învață să programezi pentru Ethereum folosind proiecte și instrumente JavaScript.
lang: ro
sidebar: true
---

JavaScript este printre cele mai populare limbaje din ecosistemul Ethereum. De fapt, există o [echipă](https://github.com/ethereumjs) dedicată pentru a aduce cât mai mult de Ethereum la JavaScript posibil.

Există oportunități de a scrie JavaScript (sau ceva aproape) la [toate nivelurile de stivă](/developers/docs/ethereum-stack/).

## Interacționează cu Ethereum {#interact-with-ethereum}

### Biblioteci API JavaScript {#javascript-api-libraries}

Dacă dorești să scrii JavaScript pentru a interoga blockchain-ul, a trimite tranzacții și multe altele, cel mai convenabil mod de a face acest lucru este utilizând o [bibliotecă API JavaScript](/developers/docs/apis/javascript/). Aceste API-uri permit programatorilor să interacționeze cu ușurință cu [nodurile din rețeaua Ethereum](/developers/docs/nodes-and-clients/).

Poți utiliza aceste biblioteci pentru a interacționa cu contracte inteligente pe Ethereum, încât să poți construi o aplicație dapp când utilizezi doar JavaScript pentru a interacționa cu contractele pre-existente.

**Consultă**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/)_ – include implementarea portofelului Ethereum și utilități în JavaScript și TypeScript_

### Contracte inteligente {#smart-contracts}

Dacă ești un programator JavaScript care dorește să scrie propriul său contract inteligent, poate dorești să te familiarizezi cu [Solidity](https://solidity.readthedocs.io). Acesta este cel mai popular limbaj de contracte inteligente și este puternic inspirat de JavaScript.

Mai multe despre [contractele inteligente](/developers/docs/smart-contracts/).

## Înțelege protocolul {#understand-the-protocol}

### Mașină virtuală Ethereum {#the-ethereum-virtual-machine}

Există o implementare JavaScript a [mașinii virtuale Ethereum](/developers/docs/evm/). Acesta acceptă cele mai recente reguli furculiță. Regulile furculiță se referă la modificările aduse EVM ca urmare a upgrade-urilor planificate.

Este împărțit în mai multe pachete JavaScript pe care le poți verifica pentru a le înțelege mai bine:

- Conturi
- Blocuri
- Blockchain-ul în sine
- Tranzacții
- Și altele...

Acest lucru te va ajuta să înțelegi lucruri de genul „care este structura de date a unui cont?”.

Dacă preferi să citești codul, acest JavaScript ar putea fi o alternativă excelentă de a parcurge documentele noastre.

**Verifică monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Noduri și clienți {#nodes-and-clients}

Este un client Ethereumjs în dezvoltare. Acesta îți va permite să explorezi modul în care clienții Ethereum funcționează într-un limbaj pe care o înțelegi.

**Verifică acest client**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-client)

## Alte proiecte {#other-projects}

De asemenea, în țara Ethereum se întâmplă o mulțime de alte lucruri, inclusiv:

- biblioteci de utilitare portofel.
- instrumente pentru a genera, importa și exporta chei Ethereum.
- o implementare a `arborelui-merkle-patricia` – o structură de date prezentată în Ethereum yellow paper.

Cercetează orice te interesează mai mult în [depozitul EthereumJS](https://github.com/ethereumjs)

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_
