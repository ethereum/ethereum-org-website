---
title: "Virtuální stroj Etherea (EVM)"
description: "Úvod do virtuálního stroje Etherea a jeho vztah ke stavu, transakcím a chytrým kontraktům."
lang: cs
---

Virtuální stroj Etherea (EVM) je decentralizované virtuální prostředí, které konzistentně a bezpečně vykonává kód na všech uzlech Etherea. Uzly spouštějí EVM k provádění chytrých kontraktů a používají "[palivo](/developers/docs/gas/)" k měření výpočetní náročnosti [operací](/developers/docs/evm/opcodes/), čímž zajišťují efektivní alokaci zdrojů a bezpečnost sítě.

## Předpoklady {#prerequisites}

Pro pochopení EVM je nutné mít základní znalosti běžné terminologie v informatice, jako jsou [bajty](https://wikipedia.org/wiki/Byte), [paměť](https://wikipedia.org/wiki/Computer_memory) a [zásobník](https://wikipedia.org/wiki/Stack_\(abstract_data_type\)). Také by bylo užitečné se seznámit s kryptografickými/blockchainovými koncepty, jako jsou [hašovací funkce](https://wikipedia.org/wiki/Cryptographic_hash_function) a [Merkleho strom](https://wikipedia.org/wiki/Merkle_tree).

## Od účetní knihy ke stavovému stroji {#from-ledger-to-state-machine}

Přirovnání k „distribuované účetní knize“ se často používá k popisu blockchainů, jako je Bitcoin, které mají decentralizovanou měnu s využitím základních nástrojů kryptografie. Účetní kniha udržuje záznam aktivit za současného dodržování souboru pravidel, která určují, co může a nemůže uživatel dělat při úpravě této knihy. Např. bitcoinová adresa nemůže utratit více Bitcoinů, než kolik jich předtím obdržela. Tato pravidla jsou základem všech transakcí na Bitcoinu a mnoha dalších blockchainech.

Ethereum sice má svou vlastní nativní kryptoměnu (ether), která se řídí téměř úplně stejnými intuitivními pravidly, ale zároveň umožňuje mnohem výkonnější funkci: [chytré kontrakty](/developers/docs/smart-contracts/). Pro tuto složitější funkci potřebujeme sofistikovanější přirovnání. Místo distribuované účetní knihy je Ethereum distribuovaný [stavový stroj](https://wikipedia.org/wiki/Finite-state_machine). Stav Etherea je velká datová struktura, která obsahuje nejen všechny účty a zůstatky, ale také _stav stroje_, který se může měnit z bloku na blok podle předem definované sady pravidel a který může vykonávat libovolný strojový kód. Specifická pravidla pro změnu stavu od bloku k bloku jsou definována v EVM.

![Diagram znázorňující složení EVM](./evm.png)
_Diagram převzatý z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Funkce přechodu stavu Etherea {#the-ethereum-state-transition-function}

EVM se chová jako matematická funkce: Na základě vstupu produkuje deterministický výstup. Je proto velmi užitečné formálněji popsat Ethereum tak, že má **funkci přechodu stavu**:

```
Y(S, T)= S'
```

Je-li dán starý platný stav `(S)` a nová sada platných transakcí `(T)`, funkce přechodu stavu Etherea `Y(S, T)` vytvoří nový platný výstupní stav `S'`

### Stav {#state}

V kontextu Etherea je stav obrovská datová struktura zvaná [modifikovaný Merkle Patricia Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), která uchovává všechny [účty](/developers/docs/accounts/) propojené haši a redukovatelné na jeden kořenový haš uložený na blockchainu.

### Transakce {#transactions}

Transakce jsou kryptograficky podepsané instrukce poslané z účtů. Existují dva typy transakcí: Ty, jejich výsledkem je volání zpráv (message calls), a ty, které vedou k vytvoření kontraktu.

Vytvoření kontraktu vede k vytvoření nového účtu kontraktu, který obsahuje zkompilovaný bytecode [chytrého kontraktu](/developers/docs/smart-contracts/anatomy/). Kdykoli jiný účet vyšle zprávu na tento kontrakt, vykoná se jeho bytecode.

## Instrukce EVM {#evm-instructions}

EVM se spouští jako [zásobníkový stroj](https://wikipedia.org/wiki/Stack_machine) s hloubkou 1024 položek. Každá položka je 256bitové slovo, které bylo zvoleno pro snadné použití s 256bitovou kryptografií (např. hashe Keccak-256 nebo podpisy secp256k1).

Během provádění udržuje EVM přechodnou _paměť_ (jako bajtové pole adresované slovem), která se mezi transakcemi neuchovává.

### Přechodné úložiště

Přechodné úložiště je úložiště klíč–hodnota pro jednotlivé transakce, ke kterému se přistupuje pomocí opkódů `TSTORE` a `TLOAD`. Zůstává zachováno napříč všemi interními voláními během jedné transakce, ale na konci transakce se vymaže. Na rozdíl od paměti je přechodné úložiště modelováno jako součást stavu EVM, nikoli jako součást exekučního rámce, ale není zapsáno do globálního stavu. Přechodné úložiště umožňuje úsporné dočasné sdílení stavu mezi interními voláními během transakce.

### Úložiště

Kontrakty obsahují Merkle Patricia _úložiště_ trie (jako pole slov adresovatelné slovy), které je spojeno s příslušným účtem a je součástí globálního stavu. Toto trvalé úložiště se liší od přechodného úložiště, které je k dispozici pouze po dobu trvání jedné transakce a netvoří součást trvalého úložiště trie účtu.

### Opkódy

Zkompilovaný bytecode chytrého kontraktu se provádí jako řada [opkódů](/developers/docs/evm/opcodes) EVM, které provádějí standardní zásobníkové operace jako `XOR`, `AND`, `ADD`, `SUB` atd. EVM také implementuje řadu blockchainově specifických operací se zásobníkem, jako jsou `ADDRESS`, `BALANCE`, `BLOCKHASH` atd. Sada opkódů zahrnuje také `TSTORE` a `TLOAD`, které poskytují přístup k přechodnému úložišti.

![Diagram ukazující, kde je pro operace EVM potřeba palivo](../gas/gas.png)
_Diagramy převzaty z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementace EVM {#evm-implementations}

Všechny implementace EVM musí dodržovat specifikaci popsanou v Ethereum Yellowpaperu.

Během desetileté historie Etherea prošel EVM několika revizemi a existuje několik implementací EVM v různých programovacích jazycích.

[Exekuční klienti Etherea](/developers/docs/nodes-and-clients/#execution-clients) zahrnují implementaci EVM. Navíc existuje několik samostatných implementací, včetně:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Další čtení {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper alias KEVM: Sémantika EVM v K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Opkódy Ethereum Virtual Machine](https://www.ethervm.io/)
- [Interaktivní reference pro opkódy Ethereum Virtual Machine](https://www.evm.codes/)
- [Krátký úvod v dokumentaci Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum - The Ethereum Virtual Machine](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Související témata {#related-topics}

- [Palivo](/developers/docs/gas/)
