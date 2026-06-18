---
title: Maszyna wirtualna Ethereum (EVM)
description: Wprowadzenie do maszyny wirtualnej Ethereum i jej związku ze stanem, transakcjami oraz inteligentnymi kontraktami.
lang: pl
---

Maszyna wirtualna Ethereum (EVM) to zdecentralizowane środowisko wirtualne, które wykonuje kod w sposób spójny i bezpieczny we wszystkich węzłach sieci [Ethereum](/). Węzły uruchamiają EVM w celu wykonywania inteligentnych kontraktów, używając „[gazu](/developers/docs/gas/)” do pomiaru wysiłku obliczeniowego wymaganego do [operacji](/developers/docs/evm/opcodes/), co zapewnia wydajną alokację zasobów i bezpieczeństwo sieci.

## Wymagania wstępne {#prerequisites}

Do zrozumienia EVM niezbędna jest podstawowa znajomość powszechnej terminologii informatycznej, takiej jak [bajty](https://wikipedia.org/wiki/Byte), [pamięć](https://wikipedia.org/wiki/Computer_memory) i [stos](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>). Pomocne będzie również zaznajomienie się z pojęciami z zakresu kryptografii i technologii blockchain, takimi jak [funkcje hashujące](https://wikipedia.org/wiki/Cryptographic_hash_function) oraz [drzewo Merklego](https://wikipedia.org/wiki/Merkle_tree).

## Od księgi rachunkowej do maszyny stanów {#from-ledger-to-state-machine}

Analogia „rozproszonej księgi rachunkowej” jest często używana do opisu blockchainów takich jak Bitcoin, które umożliwiają istnienie zdecentralizowanej waluty przy użyciu podstawowych narzędzi kryptografii. Księga ta utrzymuje rejestr aktywności, który musi przestrzegać zestawu reguł określających, co można, a czego nie można zrobić, aby ją zmodyfikować. Na przykład adres Bitcoin nie może wydać więcej Bitcoinów, niż wcześniej otrzymał. Te zasady stanowią podstawę wszystkich transakcji w sieci Bitcoin i wielu innych blockchainach.

Chociaż Ethereum ma własną natywną kryptowalutę (ether), która podlega niemal dokładnie tym samym intuicyjnym zasadom, umożliwia również znacznie potężniejszą funkcję: [inteligentne kontrakty](/developers/docs/smart-contracts/). Dla tej bardziej złożonej funkcji wymagana jest bardziej wyrafinowana analogia. Zamiast rozproszonej księgi rachunkowej, Ethereum jest rozproszoną [maszyną stanów](https://wikipedia.org/wiki/Finite-state_machine). Stan Ethereum to duża struktura danych, która przechowuje nie tylko wszystkie konta i salda, ale także _stan maszyny_, który może zmieniać się z bloku na blok zgodnie z wcześniej zdefiniowanym zestawem reguł i który może wykonywać dowolny kod maszynowy. Konkretne zasady zmiany stanu z bloku na blok są definiowane przez EVM.

![A diagram showing the make up of the EVM](./evm.png)
_Schemat na podstawie [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Funkcja przejścia stanu Ethereum {#the-ethereum-state-transition-function}

EVM zachowuje się jak funkcja matematyczna: biorąc dane wejściowe, generuje deterministyczne dane wyjściowe. Dlatego bardzo pomocne jest bardziej formalne opisanie Ethereum jako posiadającego **funkcję przejścia stanu**:

```
Y(S, T)= S'
```

Biorąc stary, prawidłowy stan `(S)` i nowy zestaw prawidłowych transakcji `(T)`, funkcja przejścia stanu Ethereum `Y(S, T)` generuje nowy, prawidłowy stan wyjściowy `S'`

### Stan {#state}

W kontekście Ethereum stan to ogromna struktura danych zwana [zmodyfikowanym drzewem Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), która przechowuje wszystkie [konta](/developers/docs/accounts/) połączone za pomocą hashów i sprowadzalne do pojedynczego hasha głównego przechowywanego w blockchainie.

### Transakcje {#transactions}

Transakcje to podpisane kryptograficznie instrukcje pochodzące z kont. Istnieją dwa rodzaje transakcji: te, które skutkują wywołaniem wiadomości, oraz te, które skutkują utworzeniem kontraktu.

Utworzenie kontraktu skutkuje powstaniem nowego konta kontraktu zawierającego skompilowany kod bajtowy [inteligentnego kontraktu](/developers/docs/smart-contracts/anatomy/). Za każdym razem, gdy inne konto wykonuje wywołanie wiadomości do tego kontraktu, wykonuje on swój kod bajtowy.

## Instrukcje EVM {#evm-instructions}

EVM działa jako [maszyna stosowa](https://wikipedia.org/wiki/Stack_machine) o głębokości 1024 elementów. Każdy element to 256-bitowe słowo, co zostało wybrane ze względu na łatwość użycia z 256-bitową kryptografią (taką jak hashe Keccak-256 lub podpisy secp256k1).

Podczas wykonywania EVM utrzymuje ulotną _pamięć_ (jako tablicę bajtów adresowaną słowami), która nie jest zachowywana pomiędzy transakcjami.

### Pamięć ulotna {#transient-storage}

Pamięć ulotna to magazyn klucz-wartość dla pojedynczej transakcji, do którego dostęp uzyskuje się za pomocą kodów operacji `TSTORE` i `TLOAD`. Utrzymuje się ona we wszystkich wewnętrznych wywołaniach podczas tej samej transakcji, ale jest czyszczona na jej końcu. W przeciwieństwie do pamięci, pamięć ulotna jest modelowana jako część stanu EVM, a nie ramki wykonawczej, jednak nie jest zatwierdzana do stanu globalnego. Pamięć ulotna umożliwia oszczędne pod względem gazu współdzielenie tymczasowego stanu pomiędzy wewnętrznymi wywołaniami podczas transakcji.

### Pamięć (Storage) {#storage}

Kontrakty zawierają _drzewo trie pamięci_ Merkle Patricia (jako adresowalną słowami tablicę słów), powiązane z danym kontem i będące częścią stanu globalnego. Ta trwała pamięć różni się od pamięci ulotnej, która jest dostępna tylko przez czas trwania pojedynczej transakcji i nie stanowi części trwałego drzewa trie pamięci konta.

### Kody operacji {#opcodes}

Skompilowany kod bajtowy inteligentnego kontraktu jest wykonywany jako szereg [kodów operacji](/developers/docs/evm/opcodes) EVM, które wykonują standardowe operacje na stosie, takie jak `XOR`, `AND`, `ADD`, `SUB` itp. EVM implementuje również szereg operacji na stosie specyficznych dla blockchaina, takich jak `ADDRESS`, `BALANCE`, `BLOCKHASH` itp. Zestaw kodów operacji obejmuje również `TSTORE` i `TLOAD`, które zapewniają dostęp do pamięci ulotnej.

![A diagram showing where gas is needed for EVM operations](../gas/gas.png)
_Schematy na podstawie [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementacje EVM {#evm-implementations}

Wszystkie implementacje EVM muszą być zgodne ze specyfikacją opisaną w żółtej księdze Ethereum.

W ciągu dziesięcioletniej historii Ethereum, EVM przeszła kilka rewizji i istnieje kilka jej implementacji w różnych językach programowania.

[Klienty warstwy wykonawczej Ethereum](/developers/docs/nodes-and-clients/#execution-clients) zawierają implementację EVM. Ponadto istnieje wiele samodzielnych implementacji, w tym:

- [Py-EVM](https://github.com/ethereum/py-evm) – _Python_
- [evmone](https://github.com/ethereum/evmone) – _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) – _JavaScript_
- [revm](https://github.com/bluealloy/revm) – _Rust_

## Dalsza lektura {#further-reading}

- [Żółta księga Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper (KEVM): Semantyka EVM w K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Kody operacji maszyny wirtualnej Ethereum](https://www.ethervm.io/)
- [Interaktywne zestawienie kodów operacji maszyny wirtualnej Ethereum](https://www.evm.codes/)
- [Krótkie wprowadzenie w dokumentacji Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum – Maszyna wirtualna Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Powiązane tematy {#related-topics}

- [Gaz](/developers/docs/gas/)

## Samouczki: Maszyna wirtualna Ethereum (EVM) / Kody operacji w Ethereum {#tutorials}

- [Zrozumienie specyfikacji EVM z żółtej księgi](/developers/tutorials/yellow-paper-evm/) _– Przewodnik po formalnej specyfikacji EVM z żółtej księgi Ethereum._
- [Inżynieria wsteczna kontraktu](/developers/tutorials/reverse-engineering-a-contract/) _– Jak przeprowadzić inżynierię wsteczną skompilowanego inteligentnego kontraktu przy użyciu kodów operacji EVM._