---
title: Virtuální stroj Etherea (EVM)
description: Úvod do virtuálního stroje Etherea a jeho vztahu ke stavu, transakcím a chytrým kontraktům.
lang: cs
---

Virtuální stroj Etherea (Ethereum Virtual Machine – EVM) je decentralizované virtuální prostředí, které konzistentně a bezpečně spouští kód na všech uzlech sítě [Ethereum](/). Uzly spouštějí EVM za účelem provádění chytrých kontraktů, přičemž k měření výpočetního úsilí potřebného pro [operace](/developers/docs/evm/opcodes/) používají „[gas](/developers/docs/gas/)“, což zajišťuje efektivní alokaci zdrojů a bezpečnost sítě.

## Předpoklady {#prerequisites}

K pochopení EVM je nezbytná základní znalost běžné terminologie z oblasti informatiky, jako jsou [bajty](https://wikipedia.org/wiki/Byte), [paměť](https://wikipedia.org/wiki/Computer_memory) a [zásobník](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>). Užitečná je také orientace v konceptech kryptografie a blockchainu, jako jsou [hashovací funkce](https://wikipedia.org/wiki/Cryptographic_hash_function) a [Merkleův strom](https://wikipedia.org/wiki/Merkle_tree).

## Od účetní knihy ke stavovému automatu {#from-ledger-to-state-machine}

K popisu blockchainů, jako je Bitcoin, které umožňují fungování decentralizované měny pomocí základních nástrojů kryptografie, se často používá analogie „distribuované účetní knihy“. Tato účetní kniha udržuje záznamy o aktivitách, které musí dodržovat soubor pravidel určujících, co lze a nelze udělat pro její úpravu. Například bitcoinová adresa nemůže utratit více bitcoinů, než kolik dříve přijala. Tato pravidla jsou základem všech transakcí na Bitcoinu a mnoha dalších blockchainech.

Zatímco Ethereum má svou vlastní nativní kryptoměnu (ether), která se řídí téměř přesně stejnými intuitivními pravidly, umožňuje také mnohem mocnější funkci: [chytré kontrakty](/developers/docs/smart-contracts/). Pro tuto složitější funkci je zapotřebí sofistikovanější analogie. Místo distribuované účetní knihy je Ethereum distribuovaný [stavový automat](https://wikipedia.org/wiki/Finite-state_machine). Stav Etherea je rozsáhlá datová struktura, která neuchovává pouze všechny účty a zůstatky, ale také _stav stroje_, který se může měnit blok od bloku podle předem definovaného souboru pravidel a který dokáže spouštět libovolný strojový kód. Konkrétní pravidla pro změnu stavu mezi bloky definuje EVM.

![A diagram showing the make up of the EVM](./evm.png)
_Diagram upraven podle [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Funkce přechodu stavu Etherea {#the-ethereum-state-transition-function}

EVM se chová jako matematická funkce: na základě vstupu vyprodukuje deterministický výstup. Proto je docela užitečné formálněji popsat Ethereum tak, že má **funkci přechodu stavu**:

```
Y(S, T)= S'
```

Vezmeme-li starý platný stav `(S)` a novou sadu platných transakcí `(T)`, funkce přechodu stavu Etherea `Y(S, T)` vyprodukuje nový platný výstupní stav `S'`

### Stav {#state}

V kontextu Etherea je stav obrovská datová struktura zvaná [modifikovaná Merkle-Patricia trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), která udržuje všechny [účty](/developers/docs/accounts/) propojené pomocí hashů a redukovatelné na jediný kořenový hash uložený na blockchainu.

### Transakce {#transactions}

Transakce jsou kryptograficky podepsané instrukce z účtů. Existují dva typy transakcí: ty, které vedou k volání zprávy, a ty, které vedou k vytvoření kontraktu.

Vytvoření kontraktu vede k vytvoření nového kontraktového účtu obsahujícího zkompilovaný bajtkód [chytrého kontraktu](/developers/docs/smart-contracts/anatomy/). Kdykoli jiný účet provede volání zprávy na tento kontrakt, spustí se jeho bajtkód.

## Instrukce EVM {#evm-instructions}

EVM se spouští jako [zásobníkový stroj](https://wikipedia.org/wiki/Stack_machine) s hloubkou 1024 položek. Každá položka je 256bitové slovo, což bylo zvoleno pro snadné použití s 256bitovou kryptografií (jako jsou hashe Keccak-256 nebo podpisy secp256k1).

Během provádění udržuje EVM dočasnou _paměť_ (jako pole bajtů adresované po slovech), která mezi transakcemi nepřetrvává.

### Dočasné úložiště {#transient-storage}

Dočasné úložiště (transient storage) je úložiště klíč-hodnota pro každou transakci, ke kterému se přistupuje prostřednictvím operačních kódů `TSTORE` a `TLOAD`. Přetrvává napříč všemi interními voláními během stejné transakce, ale na konci transakce se vymaže. Na rozdíl od paměti je dočasné úložiště modelováno jako součást stavu EVM, nikoli jako exekuční rámec, přesto se nezapisuje do globálního stavu. Dočasné úložiště umožňuje dočasné sdílení stavu napříč interními voláními během transakce, které je efektivní z hlediska spotřeby gasu.

### Úložiště {#storage}

Kontrakty obsahují Merkle-Patricia _strom úložiště_ (jako pole slov adresovatelné po slovech), který je spojen s daným účtem a je součástí globálního stavu. Toto trvalé úložiště se liší od dočasného úložiště, které je k dispozici pouze po dobu trvání jedné transakce a netvoří součást trvalého stromu úložiště účtu.

### Operační kódy {#opcodes}

Zkompilovaný bajtkód chytrého kontraktu se provádí jako řada [operačních kódů](/developers/docs/evm/opcodes) EVM, které provádějí standardní operace se zásobníkem, jako jsou `XOR`, `AND`, `ADD`, `SUB` atd. EVM také implementuje řadu operací se zásobníkem specifických pro blockchain, jako jsou `ADDRESS`, `BALANCE`, `BLOCKHASH` atd. Sada operačních kódů zahrnuje také `TSTORE` a `TLOAD`, které poskytují přístup k dočasnému úložišti.

![A diagram showing where gas is needed for EVM operations](../gas/gas.png)
_Diagramy upraveny podle [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementace EVM {#evm-implementations}

Všechny implementace EVM musí dodržovat specifikaci popsanou v dokumentu Ethereum Yellow Paper.

Během desetileté historie Etherea prošlo EVM několika revizemi a existuje několik implementací EVM v různých programovacích jazycích.

[Exekuční klienti Etherea](/developers/docs/nodes-and-clients/#execution-clients) obsahují implementaci EVM. Kromě toho existuje několik samostatných implementací, včetně:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Další čtení {#further-reading}

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper neboli KEVM: Sémantika EVM v K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Operační kódy Ethereum Virtual Machine](https://www.ethervm.io/)
- [Interaktivní reference operačních kódů Ethereum Virtual Machine](https://www.evm.codes/)
- [Krátký úvod v dokumentaci Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum - The Ethereum Virtual Machine](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Související témata {#related-topics}

- [Gas](/developers/docs/gas/)

## Návody: Ethereum Virtual Machine (EVM) / Operační kódy na Ethereu {#tutorials}

- [Porozumění specifikacím EVM v Yellow Paperu](/developers/tutorials/yellow-paper-evm/) _– Průvodce formální specifikací EVM z dokumentu Ethereum Yellow Paper._
- [Reverzní inženýrství kontraktu](/developers/tutorials/reverse-engineering-a-contract/) _– Jak provést reverzní inženýrství zkompilovaného chytrého kontraktu pomocí operačních kódů EVM._