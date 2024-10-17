---
title: Virtuální stroj Etherea (EVM)
description: Úvod do virtuálního stroje Etherea a jeho vztah ke stavu, transakcím a chytrým kontraktům.
lang: cs
---

Virtuální stroj Etherea (EVM) je decentralizované virtuální prostředí, které konzistentně a bezpečně vykonává kód na všech uzlech Etherea. Uzly spouštějí EVM, aby vykonávaly chytré kontrakty, přičemž používají "[jednotky](/gas/)" k měření výpočetního úsilí potřebného pro tyto [operace](/developers/docs/evm/opcodes/), což zajišťuje efektivní alokaci zdrojů a bezpečnost sítě.

## Předpoklady {#prerequisites}

Pro pochopení EVM je nutné mít základní povědomí o běžné terminologii v informatice, jako jsou [bajty](https://wikipedia.org/wiki/Byte), [paměť](https://wikipedia.org/wiki/Computer_memory) a [zásobník](https://wikipedia.org/wiki/Stack_(abstract_data_type)). Také se hodí mít znalosti z oblasti kryptografie a blockchainu, např. o [hashovacích funkcích](https://wikipedia.org/wiki/Cryptographic_hash_function) a [Merkle tree](https://wikipedia.org/wiki/Merkle_tree).

## Od účetní knihy ke stavovému stroji {#from-ledger-to-state-machine}

Přirovnání k „distribuované účetní knize“ se často používá k popisu blockchainů, jako je Bitcoin, které mají decentralizovanou měnu s využitím základních nástrojů kryptografie. Účetní kniha udržuje záznam aktivit za současného dodržování souboru pravidel, která určují, co může a nemůže uživatel dělat při úpravě této knihy. Např. bitcoinová adresa nemůže utratit více Bitcoinů, než kolik jich předtím obdržela. Tato pravidla jsou základem všech transakcí na Bitcoinu a mnoha dalších blockchainech.

Ethereum má svou vlastní nativní kryptoměnu (Ether), která se řídí téměř stejnými intuitivními pravidly, ale také umožňuje mnohem silnější funkci: [chytré kontrakty](/developers/docs/smart-contracts/). Pro tuto složitější funkci potřebujeme sofistikovanější přirovnání. Namísto distribuované účetní knihy je Ethereum distribuovaný [stavový stroj](https://wikipedia.org/wiki/Finite-state_machine). Stav Etherea je velká datová struktura, která obsahuje nejen všechny účty a zůstatky, ale také _stav stroje_, který se může měnit od bloku k bloku podle předem definovaného souboru pravidel a který může vykonávat libovolný strojový kód. Specifická pravidla pro změnu stavu od bloku k bloku jsou definována v EVM.

![Diagram znázorňující složení EVM](./evm.png) _Schéma převzato z [ilustrace Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Funkce změny stavu na Ethereu {#the-ethereum-state-transition-function}

EVM se chová jako matematická funkce: Na základě vstupu produkuje deterministický výstup. Je tedy užitečné formálněji popsat Ethereum jako systém s **funkcí změny stavu**:

```
Y(S, T)= S'
```

Na základě starého platného stavu `(S)` a nové sady platných transakcí `(T)` funkce změny stavu Etherea `Y(S, T)` vytvoří nový platný výstupní stav `S'`.

### Stav {#state}

V kontextu Etherea je stav obrovská datová struktura nazývaná [modifikovaný Merkle Patricia Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), která udržuje všechny [účty](/developers/docs/accounts/) propojené pomocí hashů a redukovatelné na jediný kořenový hash uložený na blockchainu.

### Transakce {#transactions}

Transakce jsou kryptograficky podepsané instrukce poslané z účtů. Existují dva typy transakcí: Ty, jejich výsledkem je volání zpráv (message calls), a ty, které vedou k vytvoření kontraktu.

Vytvoření kontraktu vede k vytvoření nového kontraktového účtu, který obsahuje zkompilovaný bytecode [chytrého kontraktu](/developers/docs/smart-contracts/anatomy/). Kdykoli jiný účet vyšle zprávu na tento kontrakt, vykoná se jeho bytecode.

## Instrukce EVM {#evm-instructions}

EVM funguje jako [zásobníkový stroj](https://wikipedia.org/wiki/Stack_machine) s hloubkou 1 024 položek. Každá položka je 256bitové slovo, které bylo zvoleno pro snadné použití s 256bitovou kryptografií (např. hashe Keccak-256 nebo podpisy secp256k1).

Během vykonávání EVM udržuje přechodnou _paměť_ (jako bajtové pole adresované slovy), která nepřetrvává mezi transakcemi.

Kontrakty však obsahují trie _úložiště_ Merkle Patricia (jako pole adresovatelné slovy), které je spojeno s příslušným účtem a je součástí globálního stavu.

Zkompilovaný bytecode chytrého kontraktu se vykonává jako řada [opkódů](/developers/docs/evm/opcodes) EVM, které provádějí standardní zásobníkové operace jako `XOR`, `AND`, `ADD`, `SUB` atd. EVM také implementuje několik blockchainově specifických zásobníkových operací, jako je `ADDRESS`, `BALANCE`, `BLOCKHASH` atd.

![Diagram znázorňující, kde jsou potřeba jednotky pro EVM operace](../gas/gas.png) _Diagram převzat z [ilustrovaného Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementace EVM {#evm-implementations}

Všechny implementace EVM musí dodržovat specifikaci popsanou v Ethereum Yellowpaperu.

Během devítileté historie Etherea prošlo EVM několika revizemi a existuje několik implementací EVM v různých programovacích jazycích.

[Exekuční klienty Etherea](/developers/docs/nodes-and-clients/#execution-clients) obsahují implementaci EVM. Navíc existuje několik samostatných implementací, včetně:

- [Py-EVM](https://github.com/ethereum/py-evm) – _Python_
- [evmone](https://github.com/ethereum/evmone) – _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) – _JavaScript_
- [revm](https://github.com/bluealloy/revm) – _Rust_

## Další informace {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper alias KEVM: Sémantika EVM v K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Opkódy Virtuálního stroje Etherea](https://www.ethervm.io/)
- [Interaktivní reference pro opkódy Virtuálního stroje Etherea](https://www.evm.codes/)
- [Krátký úvod v dokumentaci Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Kniha Mastering Ethereum – Virtuální stroj Etherea](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)

## Související témata {#related-topics}

- [Palivo](/developers/docs/gas/)
