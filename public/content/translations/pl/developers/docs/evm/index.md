---
title: Maszyna wirtualna Ethereum (EVM)
description: "Wprowadzenie do maszyny wirtualnej Ethereum i jej powiązania ze stanem, transakcjami i inteligentnymi kontraktami."
lang: pl
---

Maszyna wirtualna Ethereum (EVM) to zdecentralizowane, wirtualne środowisko, które wykonuje kod spójnie i bezpiecznie we wszystkich węzłach Ethereum. Węzły uruchamiają EVM w celu wykonywania inteligentnych kontraktów, używając "[gazu](/developers/docs/gas/)" do pomiaru wysiłku obliczeniowego wymaganego do [operacji](/developers/docs/evm/opcodes/), zapewniając wydajną alokację zasobów i bezpieczeństwo sieci.

## Wymagania wstępne {#prerequisites}

Do zrozumienia EVM konieczna jest podstawowa znajomość popularnej terminologii informatycznej, takiej jak [bajty](https://wikipedia.org/wiki/Byte), [pamięć](https://wikipedia.org/wiki/Computer_memory) i [stos](https://wikipedia.org/wiki/Stack_\(abstract_data_type\)). Pomocna będzie również znajomość pojęć z zakresu kryptografii/blockchaina, takich jak [funkcje haszujące](https://wikipedia.org/wiki/Cryptographic_hash_function) i [drzewo Merkle'a](https://wikipedia.org/wiki/Merkle_tree).

## Od rejestru do maszyny stanu {#from-ledger-to-state-machine}

Analogia „rozproszonej księgi głównej” jest często używana w celu opisania blockchainów np. takich jak Bitcoin, które umożliwiają zdecentralizowanym walutom używanie fundamentalnych narzędzi kryptograficznych. Księga główna prowadzi rejestr aktywności, który musi być zgodny z zestawem reguł określających, co ktoś może, a czego nie może zrobić, aby zmodyfikować księgę. Na przykład adres Bitcoina nie może wydać więcej Bitcoinów, niż wcześniej otrzymał. Zasady te są podstawą wszystkich transakcji na Bitcoinie i wielu innych blockchainach.

Mimo że Ethereum ma swoją własną natywną kryptowalutę (ether), która działa według niemal tych samych intuicyjnych zasad, umożliwia również o wiele potężniejszą funkcję: [inteligentne kontrakty](/developers/docs/smart-contracts/). Dla tej skomplikowanej funkcji wymagana jest bardziej wyszukana analogia. Zamiast rozproszonego rejestru, Ethereum jest rozproszoną [maszyną stanu](https://wikipedia.org/wiki/Finite-state_machine). Stan Ethereum to duża struktura danych, która przechowuje nie tylko wszystkie konta i salda, ale także _stan maszyny_, który może zmieniać się z bloku na blok zgodnie z predefiniowanym zestawem zasad i który może wykonywać dowolny kod maszynowy. Konkretne zasady zmiany stanu od bloku do bloku są zdefiniowane przez EVM.

![Diagram przedstawiający budowę EVM](./evm.png)
_Diagram zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Funkcja przejścia stanu Ethereum {#the-ethereum-state-transition-function}

EVM zachowuje się jak funkcja matematyczna: biorąc pod uwagę dane wejściowe, wytwarza deterministyczne dane wyjściowe. Dlatego bardzo pomocne jest bardziej formalne opisanie Ethereum jako posiadającego **funkcję przejścia stanu**:

```
Y(S, T)= S'
```

Biorąc pod uwagę stary ważny stan `(S)` i nowy zestaw ważnych transakcji `(T)`, funkcja przejścia stanu Ethereum `Y(S, T)` tworzy nowy, ważny stan wyjściowy `S'`

### Stan {#state}

W kontekście Ethereum stan jest ogromną strukturą danych zwaną [zmodyfikowanym drzewem Merkle Patricia Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), która przechowuje wszystkie [konta](/developers/docs/accounts/) połączone haszami i redukowalne do pojedynczego haszu głównego przechowywanego na blockchainie.

### Transakcje {#transactions}

Transakcje to podpisane kryptograficznie instrukcje od kont. Możemy wyróżnić dwa typy transakcji: te, których wynikiem są wywołania komunikatów, oraz te, których wynikiem jest utworzenie kontraktu.

Utworzenie kontraktu skutkuje utworzeniem nowego konta kontraktu zawierającego skompilowany kod bajtowy [inteligentnego kontraktu](/developers/docs/smart-contracts/anatomy/). Ilekroć inne konto wysyła wywołania komunikatów do tego kontraktu, wykonuje on kod bitowy.

## Instrukcje EVM {#evm-instructions}

EVM działa jako [maszyna stosowa](https://wikipedia.org/wiki/Stack_machine) o głębokości 1024 elementów. Każdy element to 256-bitowe słowo, które zostało wybrane ze względu na łatwość użycia z 256-bitową kryptografią (taką jak hasze Keccak-256 lub podpisy secp256k1).

Podczas wykonywania EVM utrzymuje przejściową _pamięć_ (jako tablicę bajtów adresowaną słowami), która nie jest zachowywana między transakcjami.

### Przechowywanie przejściowe

Przechowywanie przejściowe to magazyn typu klucz-wartość per transakcja, do którego dostęp uzyskuje się za pomocą kodów operacyjnych `TSTORE` i `TLOAD`. Jest ono zachowywane we wszystkich wywołaniach wewnętrznych w ramach tej samej transakcji, ale jest czyszczone na koniec transakcji. W przeciwieństwie do pamięci, przechowywanie przejściowe jest modelowane jako część stanu EVM, a nie ramki wykonania, jednak nie jest zapisywane w stanie globalnym. Przechowywanie przejściowe umożliwia wydajne pod względem zużycia gazu tymczasowe współdzielenie stanu między wewnętrznymi wywołaniami w trakcie transakcji.

### Przechowywanie

Kontrakty zawierają drzewo _storage_ trie Merkle Patricia (jako tablicę słów adresowaną słowami), powiązane z danym kontem i będące częścią stanu globalnego. To trwałe przechowywanie różni się od przechowywania przejściowego, które jest dostępne tylko na czas trwania pojedynczej transakcji i nie stanowi części trwałego drzewa przechowywania konta.

### Kody operacyjne

Skompilowany kod bajtowy inteligentnego kontraktu jest wykonywany jako szereg [kodów operacyjnych](/developers/docs/evm/opcodes) EVM, które wykonują standardowe operacje na stosie, takie jak `XOR`, `AND`, `ADD`, `SUB` itp. EVM implementuje również szereg operacji na stosie specyficznych dla blockchaina, takich jak `ADDRESS`, `BALANCE`, `BLOCKHASH` itp. Zestaw kodów operacyjnych zawiera również `TSTORE` i `TLOAD`, które zapewniają dostęp do przechowywania przejściowego.

![Diagram pokazujący, gdzie potrzebny jest gaz do operacji EVM](../gas/gas.png)
_Diagramy zaadaptowane z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementacje EVM {#evm-implementations}

Wszystkie implementacje EVM muszą być zgodne ze specyfikacją opisaną w Ethereum Yellowpaper.

W ciągu dziesięcioletniej historii Ethereum EVM przeszła kilka zmian i istnieje kilka implementacji EVM w różnych językach programowania.

[Klienci wykonawczy Ethereum](/developers/docs/nodes-and-clients/#execution-clients) zawierają implementację EVM. Ponadto istnieje wiele niezależnych implementacji, w tym:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Dalsza lektura {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper aka KEVM: Semantyka EVM w K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Kody operacyjne Wirtualnej Maszyny Ethereum](https://www.ethervm.io/)
- [Interaktywny informator o kodach operacyjnych Wirtualnej Maszyny Ethereum](https://www.evm.codes/)
- [Krótkie wprowadzenie w dokumentacji Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum - Wirtualna Maszyna Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Powiązane tematy {#related-topics}

- [Gaz](/developers/docs/gas/)
