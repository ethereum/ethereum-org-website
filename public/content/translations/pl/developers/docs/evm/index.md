---
title: Maszyna wirtualna Ethereum (EVM)
description: Wprowadzenie do maszyny wirtualnej Ethereum i jej powiązania ze stanem, transakcjami i inteligentnymi kontraktami.
lang: pl
---

Maszyna wirtualna Ethereum (EVM) to zdecentralizowane, wirtualne środowisko, które wykonuje kod spójnie i bezpiecznie we wszystkich węzłach Ethereum. Węzły uruchamiają EVM w celu wykonania inteligentnych kontraktów, wykorzystując „[gaz](/gas/)” do pomiaru wysiłku obliczeniowego wymaganego do [operacji](/developers/docs/evm/opcodes/) i zapewniając efektywną alokację zasobów i bezpieczeństwo sieci.

## Wymagania wstępne {#prerequisites}

Do zrozumienia EVM konieczna jest znajomość podstawowej terminologii informatycznej, takiej jak [bajty](https://wikipedia.org/wiki/Byte), [pamięć](https://wikipedia.org/wiki/Computer_memory) i [stos](https://wikipedia.org/wiki/Stack_(abstract_data_type)). Przydatna będzie również znajomość pojęć związanych z kryptografią/blockchainem, takich jak [funkcja haszująca](https://wikipedia.org/wiki/Cryptographic_hash_function) i [drzewo Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Od księgi głównej do maszyny stanowej {#from-ledger-to-state-machine}

Analogia „rozproszonej księgi głównej” jest często używana w celu opisania blockchainów np. takich jak Bitcoin, które umożliwiają zdecentralizowanym walutom używanie fundamentalnych narzędzi kryptograficznych. Księga główna prowadzi rejestr aktywności, który musi być zgodny z zestawem reguł określających, co ktoś może, a czego nie może zrobić, aby zmodyfikować księgę. Na przykład adres Bitcoina nie może wydać więcej Bitcoinów, niż wcześniej otrzymał. Zasady te są podstawą wszystkich transakcji na Bitcoinie i wielu innych blockchainach.

Choć Ethereum ma swoją własną kryptowalutę (Ether), która działa niemal dokładnie według tych samych intuicyjnych zasad, pozwala również stosować znacznie bardziej rozbudowaną funkcję: [inteligentne kontrakty](/developers/docs/smart-contracts/). Dla tej skomplikowanej funkcji wymagana jest bardziej wyszukana analogia. W odróżnieniu od rozproszonej księgi głównej, Ethereum jest rozproszoną [maszyną stanową](https://wikipedia.org/wiki/Finite-state_machine). Stany Ethereum są wielkimi strukturami danych, które przechowują nie tylko wszystkie konta i ich salda, ale też _stan maszyny_, który może zmieniać się od bloku do bloku zgodnie z predefiniowanymi zasadami, i który może wykonywać dowolny kod maszynowy. Konkretne zasady zmiany stanu od bloku do bloku są zdefiniowane przez EVM.

![Schemat przedstawiający strukturę EVM](./evm.png) _Schemat zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Funkcja przejścia stanów Ethereum {#the-ethereum-state-transition-function}

EVM zachowuje się jak funkcja matematyczna: biorąc pod uwagę dane wejściowe, wytwarza deterministyczne dane wyjściowe. Dlatego bardziej pomocne jest bardziej formalne opisanie Ethereum jako posiadającego **funkcję zmiany stanu**:

```
Y(S, T)= S'
```

Uwzględniając stary ważny stan `(S)` oraz nowy zestaw ważnych transakcji `(T)`, funkcja zmiany stanu Ethereum `Y(S, T)` tworzy nowy prawidłowy stan wyjściowy `S'`

### Stan {#state}

W odniesieniu do Ethereum stan jest olbrzymią strukturą danych nazywaną [zmodyfikowanym drzewem trie Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), która zachowuje wszystkie [konta](/developers/docs/accounts/) połączone haszami i redukowalne do pojedynczego haszu korzenia przechowywanego na blockchainie.

### Transakcje {#transactions}

Transakcje są to pojedyncze kryptograficznie podpisane instrukcję pochodzące z kont użytkowników. Możemy wyróżnić dwa typy transakcji: te, których wynikiem są wywołania komunikatów, oraz te, których wynikiem jest utworzenie kontraktu.

Rezultatem stworzenia nowego kontraktu jest stworzenie nowego konta kontaktu zawierającego skompilowany kod bitowy [inteligentnego kontraktu](/developers/docs/smart-contracts/anatomy/). Ilekroć inne konto wysyła wywołania komunikatów do tego kontraktu, wykonuje on kod bitowy.

## Instrukcje EVM {#evm-instructions}

EVM działa jako [maszyna stosu](https://wikipedia.org/wiki/Stack_machine) o pojemności 1024 elementów. Każdy element to 256-bitowe słowo, które zostało wybrane ze względu na łatwość użycia z 256-bitową kryptografią (taką jak hasze Keccak-256 lub podpisy secp256k1).

Podczas realizacji EVM przechowuje _pamięć_ przejściową (w postaci tablicy bajtów z adresami słów), która jednak nie jest trwała między transakcjami.

Kontrakty jednak zawierają drzewo _pamięciowe_ Merkle Patricia (jako adresowalną tablicę słów), powiązane w wiadomości z odpowiednim kontem i częścią stanu globalnego.

Skompilowany kod bitowy inteligentnego kontraktu wykonywany jest jako szereg [kodów operacyjnych](/developers/docs/evm/opcodes) EVM, które przeprowadzają standardowe operacje na stosie, takie jak `XOR`, `AND`, `ADD`, `SUB` itp. EVM implementuje również szereg operacji stosu specyficznych dla blockchaina, takich jak `ADDRESS`, `BALANCE`, `BLOCKHASH` itp.

![Schemat pokazujący, gdzie potrzebny jest gaz dla operacji EVM](../gas/gas.png) _Schemat zaadaptowany z [zilustrowane Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementacja EVM {#evm-implementations}

Wszystkie implementacje EVM muszą być zgodne ze specyfikacją opisaną w Ethereum Yellowpaper.

W ponad dziewięcioletniej historii Ethereum EVM przeszła kilka zmian; w ciągu tego czasu miało miejsce również kilka implementacji EVM w różnych językach programowania.

[Klienty wykonawcze Ethereum](/developers/docs/nodes-and-clients/#execution-clients) zawierają implementację EVM. Ponadto istnieje wiele niezależnych implementacji, w tym:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Dalsza lektura {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper, zwany też KEVM: Semantyka EVM w K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Maszyna wirtualna Ethereum — kody operacyjne](https://www.ethervm.io/)
- [Interaktywne odniesienie do kodów operacyjnych maszyny wirtualnej Ethereum](https://www.evm.codes/)
- [Krótkie wprowadzenie w dokumentacji Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Z Ethereum za pan brat — Maszyna wirtualna Ethereum](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)

## Tematy powiązane {#related-topics}

- [Gaz](/developers/docs/gas/)
