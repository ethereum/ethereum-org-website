---
title: Maszyna Wirtualna Ethereum (EVM)
description: Wprowadzenie do maszyny wirtualnej Ethereum i jej powiązania ze stanem, transakcjami i inteligentnymi kontraktami.
lang: pl
---

Maszyna Wirtualna Ethereum (EVM) jest fizyczną instancją, która nie może być opisana w taki sam sposób, jak moglibyśmy wskazać na chmurę lub fale oceanu, ale _istnieje_ jako pojedynczy byt utrzymywany przez miliony połączonych komputerów, na których działa klient Ethereum.

Protokół Ethereum istnieje wyłącznie w celu utrzymania niezakłóconej ciągłości i niezmienności operacji tej specjalnej maszyny stanów; jest to środowisko, w którym działają wszystkie konta oraz inteligentne kontrakty Ethereum. Każdy blok łańcucha Ethereum posiada jeden i tylko jeden stan „kanoniczny”, a EVM jest tym co definiuje zasady obliczeń nowego poprawnego stanu dla kolejnych bloków.

## Wymagania wstępne {#prerequisites}

Do zrozumienia EVM konieczna jest znajomość podstawowej terminologii informatycznej, takiej jak [bajty](https://wikipedia.org/wiki/Byte), [pamięć](https://wikipedia.org/wiki/Computer_memory) i [stos](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>). Równie pomocne może się okazać zaznajomienie się z takimi pojęciami, jak kryptografia, blockchain [funkcja haszująca](https://pl.wikipedia.org/wiki/Funkcja_skr%C3%B3tu), [Proof-of-Work](https://www.gpwinfostrefa.pl/czym-jest-proof-of-work/), [drzewo Merkle](https://pl.wikipedia.org/wiki/Drzewo_hash).

## Od księgi głównej do maszyny stanowej {#from-ledger-to-state-machine}

Analogia „księgi głównej” jest często używana w celu opisania blockchainów np. takich jak Bitcoin, które umożliwiają zdecentralizowanym walutom używanie fundamentalnych narzędzi kryptograficznych. Kryptowaluta zachowuje się, jak „normalna“ waluta poprzez zasady jakimi jest zarządzana, co ktoś może, a czego nie może robić, aby zmodyfikować księgę główną. Dla przykładu, adres Bitcoina nie może wydać więcej Bitcoinów, niż wcześniej otrzymał. Zasady te są podstawą wszystkich transakcji na Bitcoinie i wielu innych blockchainach.

Choć Ethereum ma swoją własną kryptowalutę (Ether), która działa niemal dokładnie według tych samych intuicyjnych zasad, pozwala również stosować znacznie bardziej rozbudowaną funkcję: [inteligentne kontrakty](/developers/docs/smart-contracts/). Dla tej skomplikowanej funkcji wymagana jest bardziej wyszukana analogia. W odróżnieniu od rozproszonej księgi główne, Ethereum jest rozproszoną [maszyną stanową](https://pl.wikipedia.org/wiki/Automat_sko%C5%84czony). Stany Ethereum są wielkimi strukturami danych, które przechowują nie tylko wszystkie konta i ich salda, ale też _stan maszyny_, który może zmieniać się od bloku do bloku zgodnie z predefiniowanymi zasadami, i który może wykonywać dowolny kod maszynowy. Konkretne zasady zmiany stanu od bloku do bloku są zdefiniowane przez EVM.

![Schemat przedstawiający strukturę EVM](./evm.png) _Schemat zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Funkcja przejścia stanów Ethereum {#the-ethereum-state-transition-function}

EVM zachowuje się jak funkcja matematyczna: biorąc pod uwagę dane wejściowe, wytwarza deterministyczne dane wyjściowe. Dlatego bardziej pomocne jest bardziej formalne opisanie Ethereum jako posiadającego **funkcję zmiany stanu**:

```
Y(S, T)= S'
```

Uwzględniając stary ważny stan `(S)` oraz nowy zestaw ważnych transakcji `(T)`, funkcja zmiany stanu Ethereum `Y(S, T)` tworzy nowy prawidłowy stan wyjściowy `S'`

### Stan {#state}

W odniesieniu do Ethereum, stan jest olbrzymią strukturą danych nazywaną zmodyfikowanym [drzewem Merkle Patricia](https://eth.wiki/en/fundamentals/patricia-tree), która zachowuje wszystkie [konta](/developers/docs/accounts/) połączone haszami i zredukowane do pojedynczego haszu źródłowego przechowywanego na blockchainie.

### Transakcje {#transactions}

Transakcje są to pojedyncze kryptograficznie podpisane instrukcję pochodzące z kont użytkowników. Możemy wyróżnić dwa typy transakcji: te, których wynikiem są wywołania komunikatów, oraz te, których wynikiem jest utworzenie kontraktu.

Rezultatem stworzenia nowego kontraktu jest stworzenie nowego konta kontaktu zawierającego skompilowany kod bitowy [inteligentnego kontraktu](/developers/docs/smart-contracts/anatomy/). Ilekroć inne konto wysyła wywołania komunikatów do tego kontraktu, wykonuje on kod bitowy.

## Instrukcje EVM {#evm-instructions}

EVM działa jako [maszyna stosu](https://pl.wikipedia.org/wiki/Automat_sko%C5%84czony), która posiada 1024 elementy. Każdy element jest 256-bitowym słowem, które zostało wybrane dla zmaksymalizowania kompatybilności z algorytmem SHA-3-256.

![A diagram showing the make up of the stack](./evm-stack.png)
_Diagram adapted from [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Removed as we should probably show memory and account storage too if showing stack-->

Podczas wykonywania EVM przechowuje _pamięć_ przejściową (w postaci tablicy bajtów z adresami słów), która jednak nie jest trwała między transakcjami.

Kontrakty jednak zawierają drzewo _pamięciowe_ Merkle Patricia (jako adresowalną tablicę słów), powiązane w wiadomości z odpowiednim kontem i częścią stanu globalnego.

Skompilowany kod bitowy inteligentnego kontraktu wykonywany jest jako szereg [kodów operacyjnych](https://www.ethervm.io/) EVM, które przeprowadzają standardowe operacje na stosie, takie jak `XOR`, `AND`, `ADD`, `SUB` itp. EVM implementuje również szereg operacji stosu specyficznych dla blockchaina, takich jak `ADDRESS`, `BALANDCE`, `SHA3`, `BLOCKHASH` itp.

![Schemat pokazujący, gdzie potrzebny jest gaz dla operacji EVM](../gas/gas.png) _Schemat zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementacja EVM {#evm-implementations}

Wszystkie implementacje EVM muszą być zgodne ze specyfikacją opisaną w Yellowpaper Ethereum.

W ponad pięcioletniej historii Ethereum, EVM przeszło kilka gruntownych weryfikacji, w ciągu tego czasu znajdziemy również kilka implementacji EVM w różnych językach programowania.

Wszyscy [klienci Ethereum](/developers/docs/nodes-and-clients/#execution-clients) posiadają implementacje EVM. Dodatkowo jest tu kilka samodzielnych implementacji, włącznie z:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Dalsza lektura {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf).
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Maszyna Wirtualna Ethereum (EVM) – kody operacyjne](https://www.ethervm.io/)

## Tematy powiązane {#related-topics}

- [Gaz](/developers/docs/gas/)
