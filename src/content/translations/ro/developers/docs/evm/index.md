---
title: Mașina virtuală Ethereum (EVM)
description: Prezentarea mașinii virtuale Ethereum și a modului în care aceasta se referă la stare, tranzacții și contracte inteligente.
lang: ro
sidebar: true
---

O reprezentare fizică a unei EVM nu poate fi descrisă în același mod în care s-ar putea reprezenta un nor sau un val pe ocean, dar „EVM” _există_ ca o singură entitate întreținută de mii de computere conectate care rulează un client Ethereum.

Protocolul Ethereum în sine există exclusiv în scopul menținerii funcționării continue, neîntrerupte și imuabile a acestei mașini speciale de stare; este mediul în care există toate conturile Ethereum și contractele inteligente. În orice bloc din lanț, Ethereum are o și numai o stare „canonică”, iar EVM este cea care definește regulile pentru calculul unei noi stări valide de la bloc la bloc.

## Condiții prealabile {#prerequisites}

Unele familiarități de bază cu terminologia comună în informatică, cum ar fi [octeți](https://en.wikipedia.org/wiki/Byte), [memorie](https://en.wikipedia.org/wiki/Computer_memory), și o [stivă](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>) sunt necesare pentru a înțelege EVM. De asemenea, ar fi util să te simți confortabil cu conceptele de criptografie/blockchain, cum ar fi [funcțiile hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function), [Dovada muncii (PoW)](https://en.wikipedia.org/wiki/Proof_of_work) și [Arborele Merkle](https://en.wikipedia.org/wiki/Proof_of_work).

## De la Registru la Mașina de stare {#from-ledger-to-state-machine}

Analogia unui „registru distribuit” este adesea folosită pentru a descrie un blockchain precum Bitcoin, care permite o monedă descentralizată folosind instrumente fundamentale de criptografie. O criptomonedă se comportă ca o monedă „normală” din cauza regulilor care guvernează ceea ce se poate și nu se poate face pentru a modifica registrul. De exemplu, o adresă Bitcoin nu poate cheltui mai mult Bitcoin decât a primit anterior. Aceste reguli stau la baza tuturor tranzacțiilor pe Bitcoin și pe multe alte blockchain-uri.

În timp ce Ethereum are propria criptomonedă nativă (Ether) care urmează aproape exact aceleași reguli intuitive, permite, de asemenea, o funcție mult mai puternică: [contracte inteligente](/developers/docs/smart-contracts/). Pentru această caracteristică mai complexă, este necesară o analogie mai sofisticată. În loc de un registru distribuit, Ethereum este o [mașină de stare](https://en.wikipedia.org/wiki/Finite-state_machine) distribuită. Starea Ethereum este o structură mare de date care deține nu numai toate conturile și soldurile, ci și o _mașină de stare_, care se poate schimba din bloc în bloc în conformitate cu un set predefinit de reguli și care poate executa aleatoriu codul mașinii. Regulile specifice de schimbare a stării de la bloc la bloc sunt definite de EVM.

![O diagramă care prezintă alcătuirea EVM](../../../../../developers/docs/evm/evm.png) _Diagramă adaptată după [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Funcția de tranziție a stării Ethereum {#the-ethereum-state-transition-function}

EVM se comportă ca o funcție matematică: având o intrare, aceasta produce o ieșire deterministă. Prin urmare, este destul de util să descrii mai formal Ethereum ca având o funcție de **tranziție de stare**:

```
Y(S, T)= S'
```

Având în vedere o stare veche `(S)` și un nou set de tranzacții valide `(T)`, funcția de tranziție a stării Ethereum `Y(S, T)` produce o nouă stare de ieșire validă `S'`

### Stare {#state}

În contextul Ethereum, starea este o structură de date enormă numită [Trie Merkle Patricia modificat](https://eth.wiki/en/fundamentals/patricia-tree), care ține toate [conturile](/developers/docs/accounts/) legate prin hash-uri și reductibile la un singur hash rădăcină stocat pe blockchain.

### Tranzacții {#transactions}

Tranzacțiile sunt instrucțiuni semnate criptografic din conturi. Există două tipuri de tranzacții: cele care au ca rezultat apeluri de mesaje și cele care au ca rezultat crearea de contracte.

Crearea contractului are ca rezultat crearea unui nou cont de contract care conține un [contract inteligent](/developers/docs/smart-contracts/anatomy/) compilat bytecode. Ori de câte ori un alt cont face un apel de mesaj la acest contract, el îi execută bytecode-ul.

## Instrucțiuni EVM {#evm-instructions}

EVM execută ca o [mașină stivă](https://en.wikipedia.org/wiki/Stack_machine) cu o adâncime de 1024 elemente. Fiecare element este un cuvânt de 256 de biți, care a fost ales pentru compatibilitate maximă cu schema de hash SHA-3-256.

În timpul executării, EVM menține o _memorie_ tranzitorie (ca o matrice de octeți cu adresare pe cuvinte), care nu persistă între tranzacții.

Contractele, cu toate acestea, conțin un _spațiu de stocare_ Merkle Patricia trie (ca o matrice de cuvinte cu adresare pe cuvinte), asociat cu contul în cauză și o parte a stării globale.

Bytecode-ul compilat al contractului inteligent se execută ca un număr de [opcoduri](https://www.ethervm.io/) EVM, care efectuează operațiuni de stivă standard cum ar fi `XOR`, `AND`, `ADD`, `SUB` etc. EVM implementează, de asemenea, o serie de operațiuni de stivă specifice blockchain, cum ar fi `ADDRESS`, `BALANCE`, `SHA3`, `BLOCKHASH` etc.

![O diagramă care arată unde este necesar gaz pentru operațiunile EVM](../../../../../developers/docs/gas/gas.png) _Diagrame adaptate din[ Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

<!-- TODO add full list from  https://eth.wiki/concepts/evm/implementations -->

## Implementări EVM {#evm-implementations}

Toate implementările EVM trebuie să respecte specificațiile descrise în Ethereum Yellowpaper.

De-a lungul istoriei de 5 ani a Ethereum, EVM a suferit mai multe revizuiri și există mai multe implementări ale EVM în diferite limbaje de programare.

Toți [clienții Ethereum](/developers/docs/nodes-and-clients/#clients) includ o implementare EVM. În plus, există mai multe implementări independente, inclusiv:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [eEVM](https://github.com/microsoft/eevm) - _C++_
- [Hyperledger Burrow](https://github.com/hyperledger/burrow) - _Go_

## Referințe suplimentare {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf).
- [Beigepaper](https://github.com/chronaeon/beigepaper)
- [Opcode-urile Mașinii Virtuale Ethereum](https://www.ethervm.io/)

## Subiecte corelate {#related-topics}

- [Gaz](/developers/docs/gas/)
