---
title: Implementarea contractelor inteligente
description:
lang: ro
---

Contractul inteligent trebuie implementat pentru ca acesta să fie disponibil utilizatorilor unei rețele Ethereum.

Pentru a implementa un contract inteligent, trebuie doar să trimiteţi o tranzacție Ethereum care conține codul contractului inteligent compilat fără a specifica vreun destinatar.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegeţi [rețelele Ethereum](/developers/docs/networks/), [tranzacțiile](/developers/docs/transactions/) și [anatomia contractelor inteligente](/developers/docs/smart-contracts/anatomy/) înainte de a implementa contracte inteligente.

Implementarea unui contract costă de asemenea ether (ETH), deci ar trebui să vă familiarizaţi cu [gazul și taxele](/developers/docs/gas/) pe Ethereum.

În cele din urmă, va trebui să compilaţi contractul înainte de a-l implementa, deci aveţi grijă să citiţi despre [compilarea contractelor inteligente](/developers/docs/smart-contracts/compiling/).

## Cum se implementează un contract inteligent {#how-to-deploy-a-smart-contract}

### De ce veţi avea nevoie {#what-youll-need}

- bytecode-ul contractului dvs. – acesta este generat prin [compilare](/developers/docs/smart-contracts/compiling/)
- ETH pentru gaz – veţi stabili limita de gaz ca la alte tranzacții, deci ţineţi minte că implementarea contractului are nevoie de mult mai mult gaz decât un simplu transfer de ETH
- un script de implementare sau un plugin
- accesul la un [nod Ethereum](/developers/docs/nodes-and-clients/), fie rulând propriul dvs. nod, fie conectându-vă la un nod public, fie printr-o cheie API folosind un [serviciu de noduri](/developers/docs/nodes-and-clients/nodes-as-a-service/) precum Infura sau Alchemy

### Etapele de implementare a un contract inteligent {#steps-to-deploy}

Etapele specificie implicate vor depinde de instrumentele pe care le folosiţi. De exemplu, consultaţi [documentația Hardhat pentru implementarea contractelor dvs.](https://hardhat.org/guides/deploying.html). Acestea sunt două dintre cele mai populare instrumente pentru implementarea contractelor inteligente, care implică redactarea unui script pentru a gestiona etapele de implementare.

Odată implementat, contractul dvs. va avea o adresă Ethereum ca și alte [conturi](/developers/docs/accounts/).

## Instrumente corelate {#related-tools}

**Remix - _Remix IDE permite dezvoltarea, implementarea și administrarea contractelor inteligente pentru blockchain-urile precum Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Simulate, debug and monitor anything on EVM-compatible chains, with real-time data_**

- [tenderly.co](https://tenderly.co/)
- [Documente](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Un mediu de dezvoltare pentru a compila, implementa, testa și elimina bug-urile din software-ul Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentație despre implementarea contractelor dvs.](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

## Tutoriale corelate {#related-tutorials}

- [Implementarea primului dvs. contract inteligent](/developers/tutorials/deploying-your-first-smart-contract/) _– O introducere despre implementarea primului dvs. contract inteligent într-o rețea de testare Ethereum._
- [Interacționaţi cu alte contracte din Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cum să implementaţi un contract inteligent dintr-un contract existent și să interacționaţi cu acesta._
- [Cum să reduceţi dimensiunea contractului](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Cum să reduceţi dimensiunea contractului pentru a-l menține sub limita maximă și a economisi gaz_

## Referințe suplimentare {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Implementarea contractelor cu Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Cunoașteți o resursă a comunității care v-a ajutat? Editaţi această pagină și adăugaţi-o!_

## Subiecte corelate {#related-topics}

- [Framework-uri de dezvoltare](/developers/docs/frameworks/)
- [Rulaţi un nod Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
