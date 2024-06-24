---
title: Mașina virtuală Ethereum (EVM)
description: Prezentarea mașinii virtuale Ethereum și a modului în care aceasta se referă la stare, tranzacții și contracte inteligente.
lang: ro
---

Reprezentarea fizică a unei EVM nu poate fi descrisă în același mod ca şi un nor sau un val pe ocean, dar „EVM” _există_ ca o entitate unică întreținută de mii de computere conectate între ele care rulează un client Ethereum.

Protocolul Ethereum în sine există exclusiv în scopul menținerii funcționării continue, neîntrerupte și imuabile a acestei mașini speciale de stare; este mediul în care se află toate conturile Ethereum și contractele inteligente. În orice bloc din lanț, Ethereum are o stare „canonică” şi numai una, iar EVM este definește regulile pentru calculul unei noi stări valide de la un bloc la altul.

## Condiții prealabile {#prerequisites}

Pentru a înţelege EVM, este necesară familiarizarea de bază cu termenii obişnuiţi în informatică, cum ar fi [octeți](https://wikipedia.org/wiki/Byte), [memorie](https://wikipedia.org/wiki/Computer_memory), și o [stivă](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>). Ar fi de asemenea util să vă simţiţi la largul dvs. în privinţa conceptelor de criptografie/blockchain, cum ar fi [funcțiile hash](https://wikipedia.org/wiki/Cryptographic_hash_function), [dovada-muncii](https://wikipedia.org/wiki/Proof_of_work) și [arborele Merkle](https://wikipedia.org/wiki/Merkle_tree).

## De la registru la mașina de stare {#from-ledger-to-state-machine}

Analogia cu un „registru distribuit” este adesea folosită pentru a descrie un blockchain precum Bitcoin, care activează o monedă descentralizată folosind instrumente fundamentale de criptografie. O criptomonedă se comportă ca o monedă „normală” din cauza regulilor care guvernează modul cum se modifică registrul (ceea ce se poate și ceea ce nu se pentru a-l modifica). De exemplu, o adresă Bitcoin nu poate cheltui mai mult Bitcoin decât a primit anterior. Aceste reguli stau la baza tuturor tranzacțiilor pe Bitcoin și pe multe alte blockchain-uri.

Ethereum are propria criptomonedă nativă (Ether), care urmează aproape exact aceleași reguli intuitive, şi acesta permite şi o funcție mult mai puternică: [contractele inteligente](/developers/docs/smart-contracts/). Pentru această funcţionalitate mai complexă, este necesară o analogie mai sofisticată. În loc de registru distribuit, Ethereum este o [mașină de stare](https://wikipedia.org/wiki/Finite-state_machine) distribuită. Starea Ethereum este o structură mare de date care deține nu numai toate conturile și soldurile, ci și o _mașină de stare_ care se poate schimba de la un bloc la altul în conformitate cu o serie de reguli definite în prealabil și care poate executa aleatoriu codul mașinii. Regulile specifice de schimbare a stării de la un bloc la altul sunt definite de EVM.

![O diagramă care prezintă alcătuirea EVM](./evm.png) _Diagramă adaptată după [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Funcția de tranziție a stării lui Ethereum {#the-ethereum-state-transition-function}

EVM se comportă ca o funcție matematică: dacă primeşte date de intrare, aceasta produce date de ieşire deterministe. Prin urmare, este destul de util de descris Ethereum în mod mai formal ca având o **funcţie de tranziție de stare**:

```
Y(S, T)= S'
```

Pentru o stare validă veche `(S)` și o serie nouă de tranzacții valide `(T)`, funcția de tranziție a stării lui Ethereum `Y(S, T)` produce o nouă stare de ieșire validă `S'`

### Stare {#state}

În contextul lui Ethereum, starea este o structură de date enormă numită [Trie Merkle Patricia modificat](https://eth.wiki/en/fundamentals/patricia-tree), care ține toate [conturile](/developers/docs/accounts/) legate prin hash-uri și reductibile la un singur hash rădăcină stocat pe blockchain.

### Tranzacții {#transactions}

Tranzacțiile sunt instrucțiuni semnate criptografic din conturi. Există două tipuri de tranzacții: cele care produc apeluri prin mesaje și cele care creează contracte.

Crearea contractului are ca rezultat crearea unui nou cont de contract care conține un [contract inteligent](/developers/docs/smart-contracts/anatomy/) compilat bytecode. Ori de câte ori un alt cont face un apel prin mesaj la acest contract, îi execută bytecode-ul.

## Instrucțiuni pentru EVM {#evm-instructions}

EVM execută ca o [mașină stivă](https://wikipedia.org/wiki/Stack_machine) cu o adâncime de 1024 elemente. Fiecare element este un cuvânt pe 256 de octeți, care a fost ales pentru ușurința de utilizare cu criptografia pe 256 de octeți (cum ar fi hash-urile Keccak-256 sau semnăturile secp256k1).

În timpul execuţiei, EVM menține o _memorie_ tranzitorie (ca o matrice de octeți cu adresare pe cuvinte), care nu persistă între tranzacții.

Cu toate acestea, contractele conțin un _spaţiu de stocare_ Merkle Patricia trie (ca o matrice de cuvinte cu adresare pe cuvinte), asociat cu contul în cauză și o parte a stării globale.

Bytecode-ul compilat al contractului inteligent se execută ca un număr de [opcoduri](/developers/docs/evm/opcodes) EVM care efectuează operațiuni de stivă standard, cum ar fi `XOR`, `AND`, `ADD`, `SUB` etc. EVM implementează şi o serie de operațiuni de stivă specifice blockchain-ului, cum ar fi `ADDRESS`, `BALANCE`, `BLOCKHASH` etc.

![O diagramă care arată unde este necesar gaz pentru operațiunile EVM](../gas/gas.png) _Diagrame adaptate din [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementări ale EVM {#evm-implementations}

Toate implementările EVM trebuie să respecte specificațiile descrise în Cartea galbenă a lui Ethereum.

De-a lungul istoriei de 5 ani a lui Ethereum, EVM a suferit mai multe revizuiri și există mai multe implementări ale EVM în diferite limbaje de programare.

Toți [clienții Ethereum](/developers/docs/nodes-and-clients/#execution-clients) includ o implementare a EVM. În plus, există mai multe implementări independente, inclusiv:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Referințe suplimentare {#further-reading}

- [Cartea galbenă Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper aka KEVM: Semantica EVM în K](https://jellopaper.org/)
- [Cartea bej](https://github.com/chronaeon/beigepaper)
- [Opcode-urile Mașinii Virtuale Ethereum](https://www.ethervm.io/)
- [O scurtă introducere despre documentația Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)

## Subiecte corelate {#related-topics}

- [Gaz](/developers/docs/gas/)
