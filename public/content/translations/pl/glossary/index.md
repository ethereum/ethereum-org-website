---
title: Słownik Ethereum
description: Niekompletny słownik terminów technicznych i nietechnicznych związanych z Ethereum
lang: pl
sidebarDepth: 2
---

# Słownik {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### atak 51% {#51-attack}

Rodzaj ataku na zdecentralizowaną [sieć](#network), w której grupa przejmuje kontrolę nad większością [węzłów](#node). To pozwoliłoby oszukać łańcuch bloków poprzez odwrócenie [transakcji](#transaction) i dwukrotne wydawanie [eteru](#ether) i innych tokenów.

## A {#section-a}

### konto {#account}

Obiekt zawierający [adres](#address), saldo, [nonce](#nonce) oraz opcjonalną pamięć i kod. Konto może być [kontem kontraktowym](#contract-account) lub [kontem należącym do podmiotu zewnętrznego (EOA)](#eoa).

<DocLink href="/developers/docs/accounts">
  Konta Ethereum
</DocLink>

### adres {#address}

Najczęściej jest to [EOA](#eoa) lub [umowa](#contract-account), która może odbierać (adres docelowy) lub wysyłać (adres źródłowy) [transakcje](#transaction) w łańcuchu bloków. Dokładniej rzecz ujmując, jest to 160 skrajnych prawych bitów [Keccak hash](#keccak-256) z [ECDSA](#ecdsa) [klucza publicznego](#public-key).

### Interfejs binarny aplikacji (ABI) {#abi}

Standardowy sposób pracy z [kontraktami](#contract-account) w ekosystemie Ethereum, zarówno spoza blockchainu, jak i w działaniach między kontraktami.

<DocLink href="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI - binarny interfejs aplikacji
</DocLink>

### assert {#assert}

W [Solidity](#solidity) instrukcja `assert(false)` kompiluje się do `0xfe`, nieprawidłowego kodu operacji, który zużywa całe pozostałe [paliwo](#gas) i cofa wszystkie zmiany. Gdy instrukcja `assert()` nie powiedzie się, dzieje się coś bardzo złego i nieoczekiwanego i musisz naprawić swój kod. Instrukcji `assert()` należy użyć, aby uniknąć warunków, które nigdy nie powinny wystąpić.

<DocLink href="/developers/docs/smart-contracts/security/">
  Ochrona
</DocLink>

### poświadczenie {#attestation}

Walidator głosuje na [łańcuch śledzący](#beacon-chain) lub [blok](#block) [odłamków](#shard). Walidatorzy muszą poświadczyć bloki, sygnalizując, że zgadzają się ze stanem zaproponowanym przez blok.

<Divider />

## B {#section-b}

### Łańcuch śledzący {#beacon-chain}

Ulepszenie Eth2, które stanie się koordynatorem sieci Ethereum. Wprowadza [proof of stake](#proof-of-stake) i [walidatorów](#validator) do Ethereum. Zostanie on ostatecznie połączony z [siecią główną](#mainnet).

<DocLink href="/roadmap/beacon-chain/">
  Łańcuch śledzący
</DocLink>

### big-endian {#big-endian}

Reprezentacja liczby pozycyjnej, w której najbardziej znacząca cyfra jest pierwszą cyfrą w pamięci. Przeciwieństwo little-endian, gdzie pierwsza jest najmniej znacząca cyfra.

### blok {#block}

Zbiór wymaganych informacji (nagłówek bloku) o zawartych [transakcjach](#transaction) oraz zestaw innych nagłówków bloków znanych jako [ommers](#ommer). Bloki są dodawane do sieci Ethereum przez [górników](#miner).

<DocLink href="/developers/docs/blocks/">
  Bloki
</DocLink>

### blockchain {#blockchain}

W Ethereum, sekwencja [bloków](#block) zwalidowana przez system [proof-of-work,](#pow) każdy jest powiązany ze swoim poprzednikiem w całej drodze do [bloku genezy](#genesis-block). Nie ma limitu rozmiaru bloku; zamiast tego wykorzystuje się zmienne [wartości graniczne paliwa](#gas-limit).

<DocLink href="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Czym jest blockchain?
</DocLink>

### kod bajtowy {#bytecode}

Zestaw abstrakcyjnych instrukcji przeznaczony do skutecznego wykonywania przez program interpreter lub maszyny wirtualne. W przeciwieństwie do kodu źródłowego czytelnego dla człowieka, kod bajtowy jest wyrażony w formacie numerycznym.

### Fork Byzantium {#byzantium-fork}

Pierwszy z dwóch [hard forków](#hard-fork) na etapie rozwoju [Metropolis](#metropolis). Obejmował on EIP-649: opóźnienie [bomby trudności](#difficulty-bomb) w Metropolis i zmniejszenie nagród za blok, gdzie [Epoka Lodowcowa](#ice-age) została opóźniona o 1 rok, a nagroda za blok została zmniejszona z 5 do 3 ETH.

<Divider />

## C {#section-c}

### kompilowanie {#compiling}

Konwertowanie kodu napisanego w wysokopoziomowym języku programowania (np. [Solidity](#solidity)) na język niższego poziomu (np. [kod bajtowy](#bytecode) EVM).

<DocLink href="/developers/docs/smart-contracts/compiling/">
  Kompilowanie inteligentnych kontraktów
</DocLink>

### komitet {#committee}

Grupa co najmniej 128 [walidatorów](#validator) przypisana losowo do bloków śledzących i odłamkowych przez [łańcuch śledzący](#beacon-chain).

### konsensus {#consensus}

Gdy wiele węzłów (zazwyczaj większość węzłów w sieci) ma te same bloki w swoim lokalnie sprawdzonym najlepszym blockchainie. Nie należy mylić z [zasadami konsensusu](#consensus-rules).

### zasady konsensusu {#consensus-rules}

Zasady walidacji bloków, których przestrzegają pełne węzły, aby pozostać w konsensusie z innymi węzłami. Nie należy mylić z [konsensusem](#consensus).

### fork Constantinople {#constantinople-fork}

Druga część etapu [Metropolis](#metropolis), pierwotnie zaplanowana na połowę 2018 roku. Oprócz innych zmian spodziewane jest przejście na hybrydowy algorytm konsensusu [proof-of-work](#pow)/[proof-of-stake](#pos).

### konto kontraktowe {#contract-account}

Konto zawierające kod wykonujący każdorazowo, gdy otrzyma [transakcję](#transaction) z innego [konta](#account) ([EOA](#eoa) lub [kontrakt](#contract-account)).

### transakcja tworząca kontrakt {#contract-creation-transaction}

Specjalna [transakcja](#transaction) z [zerowym adresem](#zero-address) odbiorcy używana do rejestracji [kontraktu](#contract-account) i zapisania go w blockchainie Ethereum.

### połączenie krzyżowe {#crosslink}

Połączenie krzyżowe zawiera podsumowanie stanu odłamka. W ten sposób łańcuchy [odłamkowe](#shard) komunikują się ze sobą za pośrednictwem [łańcucha śledzącego](#beacon-chain) w podzielonym [systemie proof of stake](#proof-of-stake).

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-stake
</DocLink>

<Divider />

## D {#section-d}

### Zdecentralizowana Organizacja Autonomiczna (DAO) {#dao}

Przedsiębiorstwo lub inna organizacja działająca bez zarządzania hierarchicznego. DAO może również oznaczać kontrakt The DAO uruchomiony 30 kwietnia 2016 r. i złamany w czerwcu tego roku. Ostatecznie doprowadziło to do [hard forku](#hard-fork) (o nazwie DAO) w bloku 1 192 000, co spowodowało anulowanie złamanego kontraktu DAO i podział Ethereum i Ethereum Classic na dwa konkurencyjne systemy.

<DocLink href="/dao/">
  Zdecentralizowane Organizacje Autonomiczne (DAO)
</DocLink>

### Dapp {#dapp}

Zdecentralizowana aplikacja. W minimalnej postaci obejmuje [inteligentny kontrakt](#smart-contract) i internetowy interfejs użytkownika. Na bardziej ogólnym poziomie jest to aplikacja internetowa oparta na otwartych, zdecentralizowanych usługach infrastrukturalnych w modelu peer-to-peer. Ponadto wiele aplikacji dapp obejmuje zdecentralizowaną pamięć i/lub komunikatów oraz platformę rozwoju aplikacji.

<DocLink href="/developers/docs/dapps/">
  Wprowadzenie do zdecentralizowanych aplikacji
</DocLink>

### giełda zdecentralizowana (DEX) {#dex}

Typ [dapp](#dapp), który pozwala wymieniać tokeny z uczestnikami w sieci. Potrzebujesz [etheru](#ether), aby z niej skorzystać (aby zapłacić [opłaty za transakcje](#transaction-fee)), ale nie podlegają one ograniczeniom geograficznym, takim jak scentralizowane giełdy — każdy może uczestniczyć.

<DocLink href="/get-eth/#dex">
  Giełdy scentralizowane
</DocLink>

### deed {#deed}

Zobacz [niewymienny token (NFT)](#nft)

### DeFi {#defi}

Skrót „zdecentralizowanych finansów”, szeroka kategoria [aplikacji zdecentralizowanych](#dapp) mająca na celu świadczenie usług finansowych zabezpieczonych przez blockchain, bez żadnych pośredników, tak aby każdy z dostępem do Internetu mógł uczestniczyć.

<DocLink href="/defi/">
  Zdecentralizowane finanse (DeFi)
</DocLink>

### trudność {#difficulty}

Ogólnosieciowe ustawienie, które steruje tym, ile obliczeń jest wymagane do wyprodukowania [proof-of-work](#pow).

### bomba trudności {#difficulty-bomb}

Planowany wykładniczy wzrost [trudności](#difficulty) [proof-of-work](#pow) mający na celu motywowanie do przejścia na [proof-stake](#pos), zmniejszający zmiany związane z [forkiem](#hard-fork)

### podpis cyfrowy {#digital-signatures}

Krótki ciąg danych, który użytkownik tworzy dla dokumentu przy użyciu [klucza prywatnego](#private-key), tak że każdy, kto posiada odpowiedni [klucz publiczny](#public-key), podpis i dokument może sprawdzić, czy (1) dokument został „podpisany” przez właściciela tego konkretnego klucza prywatnego; oraz (2) dokument nie uległ zmianie po jego podpisaniu.

<Divider />

## E {#section-e}

### algorytm ECDSA (Elliptic Curve Digital Signature Algorithm) {#ecdsa}

Algorytm kryptograficzny używany przez Ethereum w celu zapewnienia, że fundusze mogą być wydawane tylko przez ich właścicieli. Jest to preferowana metoda tworzenia kluczy publicznych i prywatnych. Odpowiednia do generowania [adresu](#address) konta i weryfikacji [transakcji](#transaction).

### epoka {#epoch}

Okres 32 [slotów](#slot) (6,4 minuty) w systemie skoordynowanym [łańcuchem śledzącym](#beacon-chain). [Komitety](#committee) [walidatorów](#validator) są losowane co epokę ze względów bezpieczeństwa. W każdej epoce jest szansa na [finalizację](#finality) łańcucha.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-stake
</DocLink>

### Wniosek dotyczący usprawnienia Ethereum (EIP) {#eip}

Dokument projektowy dostarczający informacji społeczności Ethereum, opisujący proponowaną nową funkcję lub jej procesy lub środowisko (patrz [ERBN](#erc)).

<DocLink href="/eips/">
  Wprowadzenie do EIP
</DocLink>

### Usługa nazw Ethereum (ENS) {#ens}

Rejestr ENS jest pojedynczym centralnym [kontraktem](#smart-contract), który dostarcza mapowanie od nazw domen do właścicieli i resolverów, jak opisano w [EIP](#eip) 137.

[Przeczytaj więcej na ens.domains](https://ens.domains)

### entropia {#entropy}

W kontekście kryptografii brak przewidywalności lub poziom losowości. Podczas generowania tajnych informacji, takich jak [klucze prywatne](#private-key), algorytmy zazwyczaj opierają się na źródle wysokiej entropii, aby zapewnić nieprzewidywalność wyników.

### konto zewnętrzne (EOA) {#eoa}

[Konto](#account) utworzone przez lub dla ludzkich użytkowników sieci Ethereum.

### Prośba o komentarze Ethereum (ERC) {#erc}

Etykieta nadana niektórym [EIP](#eip), które próbują zdefiniować określony standard użycia Ethereum.

<DocLink href="/eips/">
  Wprowadzenie do EIP
</DocLink>

### Ethash {#ethash}

Algorytm [proof-of-work](#pow) dla Ethereum 1.0.

[Przeczytaj więcej na eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

Natywna kryptowaluta używana przez ekosystem Ethereum, który pokrywa koszty [gazu](#gas) podczas realizacji transakcji. Zapisywany również jako ETH lub symbol Ξ, grecka wielka litera Xi.

<DocLink href="/eth/">
  Waluta na naszą cyfrową przyszłość
</DocLink>

### wydarzenia {#events}

Pozwala na korzystanie z urządzeń [EVM](#evm) do rejestrowania danych. [Aplikacje zdecentralizowane](#dapp) mogą nasłuchiwać wydarzeń i używać ich do uruchamiania wywołań zwrotnych JavaScript w interfejsie użytkownika.

<DocLink href="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Wydarzenia i dzienniki
</DocLink>

### Maszyna Wirtualna Ethereum (EVM) {#evm}

Wirtualna maszyna bazująca na stosie, która wykonuje [kod bajtowy](#bytecode). W Ethereum model wykonania określa, w jaki sposób stan systemu jest zmieniany na podstawie serii instrukcji kodu bajtowego i małej krotki danych środowiskowych. Jest to określone przez formalny model wirtualnej maszyny stanu.

<DocLink href="/developers/docs/evm/">
  Maszyna Wirtualna Ethereum
</DocLink>

### język asemblera EVM {#evm-assembly-language}

Czytelna dla człowieka forma [kodu bajtowego](#bytecode) EVM.

<Divider />

## F {#section-f}

### funkcja zastępcza {#fallback-function}

Domyślna funkcja wywołana w przypadku braku danych lub zadeklarowanej nazwy funkcji.

### faucet {#faucet}

Usługa wykonana za pośrednictwem [inteligentnego kontraktu](#smart-contract), która wypłaca środki w postaci bezpłatnego eteru testowego, który może być użyty w sieci testowej.

<DocLink href="/developers/docs/networks/#testnet-faucets">
  Krany sieci testowej
</DocLink>

### nieodwołalność {#finality}

Nieodwołalność jest gwarancją, że zestaw transakcji przed upływem danego czasu nie zmieni się i nie będzie mógł zostać wycofany.

<DocLink href="/developers/docs/consensus-mechanisms/pow/#finality">
  Nieodwołalność proof-of-work
</DocLink> <DocLink href="/developers/docs/consensus-mechanisms/pos/#finality">
  Nieodwołalność proof-of-stake
</DocLink>

### finney {#finney}

Nominał [etheru](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### fork {#fork}

Zmiana protokołu, powodująca utworzenie alternatywnego łańcucha lub czasowe rozbieżności w dwóch potencjalnych ścieżkach blokowych podczas wydobycia.

### dowód oszustwa {#fraud-proof}

Model bezpieczeństwa dla niektórych rozwiązań [warstwy 2](#layer-2), gdzie w celu zwiększenia szybkości transakcje są [wrzucane](#rollups) do partii i przesyłane do Ethereum w jednej transakcji. Zakłada się, że są one ważne, ale można je zakwestionować, jeżeli podejrzewa się nadużycia finansowe. Dowód oszustwa przeprowadzi następnie transakcję, aby sprawdzić, czy doszło do oszustwa. Ta metoda zwiększa liczbę możliwych transakcji przy jednoczesnym zachowaniu bezpieczeństwa. Niektóre [wartości zbiorcze](#rollups) używają [dowodów ważności](#validity-proof).

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Optymistyczne pakiety zbiorcze
</DocLink>

### granica {#frontier}

Pierwotny etap testowania Ethereum, trwający od lipca 2015 r. do marca 2016 r.

<Divider />

## G {#section-g}

### paliwo {#gas}

Paliwo wirtualne używane w Ethereum do realizacji inteligentnych kontraktów. [EVM](#evm) wykorzystuje mechanizm księgowy do pomiaru zużycia gazu i ograniczenia zużycia zasobów obliczeniowych (patrz [Kompletność w sensie Turinga](#turing-complete)).

<DocLink href="/developers/docs/gas/">
  Gaz i opłaty
</DocLink>

### limit gazu {#gas-limit}

Maksymalna ilość [gazu](#gas), którą może wykorzystać [transakcja](#transaction) lub [blok](#block).

### blok genezy {#genesis-block}

Pierwszy blok w [blockchainie](#blockchain), używany do inicjowania określonej sieci i jej kryptowaluty.

### geth {#geth}

Go Ethereum. Jedno z najważniejszych wdrożeń protokołu Ethereum, napisanego w Go.

[Przeczytaj więcej na geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Skrót od gigawei, nominał [etheru](#ether), powszechnie używany do ceny [gazu](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### hard fork {#hard-fork}

Trwała rozbieżność w [blockchainie](#blockchain); znana również jako twarda zmiana. Występuje często, gdy niezaktualizowane węzły nie mogą sprawdzić poprawności bloków utworzonych przez zmodernizowane węzły, które postępują zgodnie z nowszymi [regułami konsensusu](#consensus-rules). Nie mylić z forkiem, soft forkiem, forkiem programowym lub forkiem Git.

### hash {#hash}

Odcisk palca o stałej długości, wytwarzany przez funkcję haszową. (Zobacz [keccak-256](#keccak-256))

### Portfel HD {#hd-wallet}

[Portfel](#wallet) wykorzystujący hierarchiczny deterministyczny protokół (HD) tworzenia i transferu.

[Przeczytaj więcej na github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### ziarno portfela HD {#hd-wallet-seed}

Wartość używana do wygenerowania głównego [klucza prywatnego](#private-key) i kodu łańcucha głównego dla [portfela HD](#wallet). Ziarno (seed) portfela może być reprezentowane za pomocą mnemonicznych słów, ułatwiając ludziom kopiowanie, tworzenie kopii zapasowych i przywracanie kluczy prywatnych.

### homestead {#homestead}

Drugi etap rozwoju Ethereum rozpoczął się w marcu 2016 r. w bloku 1 150 000.

<Divider />

## I {#section-i}

### indeks {#index}

Struktura sieciowa mająca na celu optymalizację wyszukiwania informacji w całym [blockchainie](#blockchain) poprzez zapewnienie efektywnej ścieżki do źródła ich przechowywania.

### Protokół ICAP (Inter-exchange Client Address Protocol) {#icap}

Kodowanie adresu Ethereum, które jest częściowo kompatybilne z kodowaniem międzynarodowego numeru rachunku bankowego (IBAN) i oferuje wszechstronne, opatrzone sumą kontrolną i interoperacyjne kodowanie adresów Ethereum. Adresy ICAP używają nowego pseudo-krajowego kodu IBAN XE oznaczającego „eXtended Ethereum” używanego w walutach niepodlegających jurysdykcji (np. XBT, XRP, XCP).

### Epoka lodowcowa {#ice-age}

[Hard fork](#hard-fork) Ethereum wprowadzony w bloku nr 200 000, aby zastosować wykładniczy wzrost poziomu [trudności](#difficulty) (inaczej [bombę trudności](#difficulty-bomb)). Ma motywować do przejścia na system [proof-of-stake](#pos).

### środowisko IDE {#ide}

Interfejs użytkownika, który zazwyczaj łączy edytor kodu, kompilator, środowisko uruchomieniowe i debuger.

<DocLink href="/developers/docs/ides/">
  Środowisko IDE
</DocLink>

### problem niemodyfikowalności wdrożonego kodu {#immutable-deployed-code-problem}

Po wdrożeniu kod [kontraktu](#smart-contract) (lub [biblioteki](#library)) staje się niezmienny. Standardowe techniki rozwoju oprogramowania są oparte na możliwości poprawiania ewentualnych błędów i dodawania nowych funkcji, dlatego niemodyfikowalność stanowi wyzwanie dla twórców inteligentnych kontraktów.

<DocLink href="/developers/docs/smart-contracts/deploying/">
  Wdrażanie inteligentnych kontraktów
</DocLink>

### transakcja wewnętrzna {#internal-transaction}

[Transakcja](#transaction) wysłana z konta [kontraktu](#contract-account) na inne konto kontraktu lub [EOA](#eoa) (patrz [komunikat](#message)).

<Divider />

## K {#section-k}

### funkcja wyprowadzania klucza (KDF) {#kdf}

Znana również jako „algorytm rozszerzania hasła”, jest używana w pliku [kestore](#keystore-file) do ochrony zaszyfrowanego hasła przed przed atakami siłowymi, atakami słownikowymi i atakami z użyciem tablic tęczowych, wielokrotnie haszując hasło.

<DocLink href="/developers/docs/smart-contracts/security/">
  Ochrona
</DocLink>

### keccak-256 {#keccak-256}

Kryptograficzna funkcja [skrótu](#hash) (hash) używana w Ethereum. Keccak-256 został znormalizowany jako [SHA](#sha)-3.

### plik keystore {#keystore-file}

Plik w formacie JSON zawierający jeden (losowo wygenerowany) [klucz prywatny](#private-key), zaszyfrowany hasłem dla dodatkowego bezpieczeństwa.

<Divider />

## L {#section-l}

### warstwa 2 {#layer-2}

Obszar rozwoju skupiony na ulepszeniach w zakresie warstwowania w uzupełnieniu protokołu Ethereum. Te ulepszenia są związane z szybkościami [transakcji](#transaction), niższymi [opłatami transakcyjnymi](#transaction-fee) i prywatnością transakcji.

<DocLink href="/developers/docs/scaling/#rollups">
  Warstwa 2
</DocLink>

### LevelDB {#level-db}

Przechowywany na dysku magazyn open source typu klucz-wartość, zaimplementowany jako lekka [biblioteka](#library) o jednej funkcji. Narzędzie działające na wielu platformach.

### biblioteka {#library}

[Kontrakt ](#smart-contract) specjalnego rodzaju, który nie ma funkcji do odbioru płatności, funkcji rezerwowej ani pamięci na dane. W związku z tym nie może odbierać ani przechowywać etherów, ani przechowywać danych. Biblioteka to zainstalowany kod, który może być wywoływany w trybie odczytu przez inne kontrakty na potrzeby obliczeń.

<DocLink href="/developers/docs/smart-contracts/libraries/">
  Biblioteki kontraktów inteligentnych
</DocLink>

### lekki klient {#lightweight-client}

Klient Ethereum, który nie przechowuje lokalnej kopii [blockchainu](#blockchain) ani nie weryfikuje bloków ani [transakcji](#transaction). Oferuje funkcje [portfela](#wallet) oraz może tworzyć i rozsyłać transakcje.

<Divider />

## M {#section-m}

### Sieć główna {#mainnet}

Główna sieć publiczna [blockchainu](#blockchain) Ethereum. Realny ETH, rzeczywista wartość i realne konsekwencje. Znana również jako warstwa 1 podczas omawiania rozwiązań skalowania [warstwy 2](#layer-2). (Zobacz również [sieć testowa](#testnet))

### drzewo Merkle Patricia {#merkle-patricia-tree}

Struktura danych używana w Ethereum do efektywnego przechowywania par klucz-wartość.

### komunikat {#message}

[Transakcja wewnętrzna](#internal-transaction), która nigdy nie jest serializowana i wysyłana tylko w [EVM](#evm).

### wywołanie komunikatu {#message-call}

Proces przekazywania [komunikatu](#message) z jednego konta do innego. Jeśli docelowe konto jest powiązane z kodem maszyny [EVM](#evm), EVM, ta maszyna zostanie uruchomiona na podstawie stanu konta i przekazanego komunikatu.

### Metropolis {#metropolis}

Trzeci etap rozwoju Ethereum rozpoczęty w październiku 2017 r.

### górnik {#miner}

[Węzeł](#node) w sieci, który za pomocą wielokrotnego obliczania skrótów znajduje prawidłowe [dowody pracy](#pow) (proof of work) dla nowych bloków (patrz [ethash](#ethash)).

<DocLink href="/developers/docs/consensus-mechanisms/pow/mining/">
  Wydobycie
</DocLink>

<Divider />

## N {#section-n}

### sieć {#network}

Oznacza tu sieć Ethereum — sieć P2P, w której transakcje i bloki są przekazywane do wszystkich węzłów sieci Ethereum (użytkowników sieci).

<DocLink href="/developers/docs/networks/">
  Sieci
</DocLink>

### token niezamienny (NFT) {#nft}

Nazywany także deed. Jest to standardowy token wprowadzony na podstawie propozycji ERC721. Tokeny NFT można śledzić i handlować nimi, ale każdy token jest unikatowy i odmienny; nie są zamienne jak ETH i [tokeny ERC-20](#token-standard). Tokeny NFT mogą reprezentować prawo własności zasobów cyfrowych lub fizycznych.

<DocLink href="/nft/">
  Tokeny niewymienne (NFT)
</DocLink> <DocLink href="/developers/docs/standards/tokens/erc-721/">
  ERC-721 – standard tokenów niewymiennych
</DocLink>

### node {#node}

Klient działający w sieci.

<DocLink href="/developers/docs/nodes-and-clients/">
  Węzły i klienci
</DocLink>

<DocLink href="/developers/docs/nodes-and-clients/">
  Węzły i klienci
</DocLink>

### nonce {#nonce}

W kryptografii wartość, która może być użyta tylko raz. W Ethereum używane są dwa typy wartości nonce — wartość nonce konta jest licznikiem transakcji w każdym koncie i służy do zapobiegania atakom przez odtwarzanie instrukcji. Wartość nonce w [proof-of-work](#pow) jest wartością losową w bloku użytą do uzyskania [proof-of-work](#pow).

<Divider />

## O {#section-o}

### blok ommer (uncle) {#ommer}

Kiedy [górnik](#miner) znajdzie poprawny [blok](#block), może się okazać, że inny górnik opublikował konkurencyjny blok, który został dodany do końcówki blockchainu. Ten ważny, ale nieaktualny blok może zostać uwzględniony przez nowsze bloki jako _ommer_ co pozwala uzyskać część nagrody za blok. Termin „ommer” jest preferowanym pojęciem neutralnym pod względem płci dla rodzeństwa bloku macierzystego, ale czasami używa się także nazwy „wujek”.

### Optymistyczne pakiety zbiorcze {#optimistic-rollup}

[Pakiet zbiorczy](#rollups) transakcji, które używają [dowodów oszustwa](#fraud-proof), aby zaoferować większą przepustowość transakcji [warstwy 2](#layer-2) przy użyciu zabezpieczeń dostarczanych przez [sieć główną](#mainnet) (warstwa 1). W przeciwieństwie do [plazmy](#plasma), podobnego rozwiązania warstwy 2, optymistyczne pakiety zbiorcze mogą obsługiwać bardziej złożone typy transakcji – wszystko co jest możliwe w [EVM](#evm). W porównaniu z [pakietami zbiorczymi o wiedzy zerowej](#zk-rollups) doświadczają opóźnień, ponieważ transakcję można zakwestionować za pomocą dowodu oszustwa.

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Optymistyczne pakiety zbiorcze
</DocLink>

<Divider />

## P {#section-p}

### parity {#parity}

Jest to jedna z najważniejszych implementacji oprogramowania klienckiego Ethereum.

### Plasma {#plasma}

Rozwiązanie skalowania off-chain wykorzystujące [dowody oszustwa](#fraud-proof), na przykład [optymistyczne pakiety zbiorcze](#optimistic-rollups). Plazma jest ograniczona do prostych transakcji, takich jak podstawowe transfery i zamiany tokenów.

<DocLink href="/developers/docs/scaling/plasma">
  Plazma
</DocLink>

### klucz prywatny (tajny klucz) {#private-key}

Jest to tajna liczba, która umożliwia użytkownikom w sieci Ethereum dowodzenie własności konta lub kontraktów w wyniku tworzenia podpisu cyfrowego (patrz [klucz publiczny](#public-key), [adres](#address), [ECDSA](#ecdsa)).

### proof-of-stake (PoS) {#pos}

Jest to metoda, za pomocą której protokół blockchainu kryptowaluty umożliwia uzyskanie [konsensusu](#consensus) w środowisku rozproszonym. PoS wymaga przedstawienia dowodu własności określonej kwoty kryptowaluty (jest to „stawka”, jaką użytkownik ma w sieci), aby dana osoba mogła uczestniczyć w weryfikacji transakcji.

<DocLink href="/developers/docs/consensus-mechanisms/pos/">
  Proof-of-stake
</DocLink>

### Proof-of-work (PoW) {#pow}

Są do dane (dowód), których uzyskanie wymaga intensywnych obliczeń. W Ethereum [górnicy](#miner) muszą znaleźć liczbowe rozwiązanie algorytmu [Ethash](#ethash) zgodnie z poziomem [trudności](#difficulty) obowiązującym na poziomie sieci.

<DocLink href="/developers/docs/consensus-mechanisms/pow/">
  Proof-of-work
</DocLink>

### klucz publiczny {#public-key}

Wygenerowana na podstawie [klucza prywatnego](#private-key) za pomocą funkcji jednostronnej liczba, która może być publicznie udostępniana i używana przez każdego do sprawdzania poprawności podpisu cyfrowego dodanego za pomocą powiązanego klucza prywatnego.

<Divider />

## R {#section-r}

### potwierdzenie {#receipt}

Dane zwracane przez klienta Ethereum, reprezentujące wynik konkretnej [transakcji](#transaction). Potwierdzenie obejmuje [skrót](#hash) transakcji, numer jej [bloku](#block) ilość zużytego [gazu](#gas), a w przypadku wdrożenia [inteligentnego kontraktu](#smart-contract) [adres](#address) kontraktu.

### atak z wykorzystaniem wielobieżności {#re-entrancy-attack}

Atak składający się z kontraktu atakującego wywołującego kontrakt ofiary w taki sposób, że podczas wykonania ofiara ponownie wywołuje kontrakt atakującego rekursywnie. Może to skutkować na przykład kradzieżą środków poprzez pominięcie tych części kontraktu ofiary, które aktualizują saldo lub liczą kwoty odstąpienia.

<DocLink href="/developers/docs/smart-contracts/security/#re-entrancy">
  Wielobieżność
</DocLink>

### nagroda {#reward}

Liczba etherów przyznawana w każdym nowym bloku jako nagroda przez sieć [górnikowi](#miner), który znalazł rozwiązanie [proof-of-work](#pow).

### Recursive Length Prefix (RLP) {#rlp}

Standard kodowania zaprojektowany przez deweloperów Ethereum do kodowania i serializowania obiektów (struktur danych) o dowolnej złożoności i długości.

### pakiet zbiorczy {#rollups}

Typ rozwiązania skalowania [warstwy 2](#layer-2) który zawiera wiele transakcji i przesyła je do [głównego łańcucha Ethereum](#mainnet) w pojedynczej transakcji. Pozwala to na zmniejszenie kosztów [gazu](#gas) i zwiększenie przepustowości [transakcji](#transaction). Istnieją pakiety zbiorcze optymistyczne i o wiedzy zerowej, wykorzystujące różne metody zabezpieczania, aby zaoferować wymienione korzyści skalowalności.

<DocLink href="/developers/docs/scaling/#rollups">
  Pakiety zbiorcze
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

Czwarty i ostatni etap rozwoju Ethereum, znany pod nazwą Ethereum 2.0.

<DocLink href="/roadmap/">
  Ethereum 2.0 (Eth2)
</DocLink>

### SHA (Secure Hash Algorithm) {#sha}

Rodzina kryptograficznych funkcji skrótu opublikowanych przez Narodowy Instytut Norm i Technologii (NIST).

### odłamek / łańcuch odłamkowy {#shard}

Łańcuch [proof-of-stake](#proof-of-stake) koordynowany przez [łańcuch śledzący](#beacon-chain) i zabezpieczony przez [walidatorów](#validator). Do sieci zostaną dodane 64 w ramach aktualizacji łańcucha odłamkowego Eth2. Łańcuchy odłamkowe będą oferować Ethereum zwiększoną przepustowość transakcji dzięki dostarczeniu dodatkowych danych do rozwiązań [warstwy 2](#layer-2) takich jak [optymistyczne pakiety zbiorcze](#optimistic-rollups) i [pakiety zbiorcze ZK](#zk-rollups).

<DocLink href="/roadmap/danksharding">
  Łańcuchy szczątkowe
</DocLink>

### łańcuch boczny {#sidechain}

Rozwiązanie skalujące wykorzystujące oddzielny łańcuch z innymi, często szybszymi, [regułami konsensusu](#consensus-rules). Aby podłączyć łańcuchy boczne do [sieci głównej](#mainnet), potrzebny jest mostek. [Pakiety zbiorcze](#rollups) również używają łańcuchów bocznych, ale współpracują z [siecią główną](#mainnet).

<DocLink href="/developers/docs/scaling/sidechains/">
  Łańcuchy boczne
</DocLink>

### singleton {#singleton}

Pojęcie z obszaru programowania komputerów oznaczające obiekt klasy, która umożliwia istnienie w danym momencie tylko jednej instancji.

### gniazdo {#slot}

Okres (12 sekund) w którym [walidator](#validator) w systemie [proof-of-stake](#proof-of-stake) może zaproponować nowy [łańcuch śledzący](#beacon-chain) i blok łańcucha [odłamków](#shard). Slot może być pusty. 32 sloty tworzą [epokę](#epoch).

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-stake
</DocLink>

### inteligentny kontrakt {#smart-contract}

Program działający w infrastrukturze obliczeniowej Ethereum.

<DocLink href="/developers/docs/smart-contracts/">
  Wprowadzenie do inteligentnych kontraktów
</DocLink>

### Solidity {#solidity}

Proceduralny (imperatywny) język programowania o składni podobnej do JavaScript, C++ lub Java. Najpopularniejszy i najczęściej używany język do tworzenia [inteligentnych kontraktów](#smart-contract) w Ethereum. Jego twórcą jest dr Gavin Wood.

<DocLink href="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### wewnątrzwierszowy język asemblerowy dla Solidity {#solidity-inline-assembly}

Jest to język asemblerowy dla maszyny [EVM](#evm) używany w programach w języku [Solidity](#solidity). Dzięki obsłudze wewnątrzwierszowego języka asemblerowego w Solidity programowanie niektórych działań stało się łatwiejsze.

### Spurious Dragon {#spurious-dragon}

[Hard fork](#hard-fork) blockchainu Ethereum wprowadzony w bloku 2 675 00, aby uwzględnić różne ataki typu DoS i dodać mechanizmy czyszczenia stanu (patrz [Tangerine Whistle](#tangerine-whistle)). Jest to także mechanizm ochrony przed atakami przez odtwarzanie (patrz [nonce](#nonce)).

### stablecoin {#stablecoin}

Token [ERC-20](#token-standard) o wartości powiązanej z wartością innego zasobu. Istnieją sablecoiny zabezpieczone walutami fiducjarnymi, takimi jak dolary, metale szlachetne, złoto, i innymi kryptowalutami, takimi jak bitcoin.

<DocLink href="/eth/#tokens">
  ETH nie jest jedyną kryptowalutą na Ethereum
</DocLink>

### układanie w stos {#staking}

Deponowanie ilości [etheru](#ether) (Twoja stawka) aby stać się walidatorem i zabezpieczyć [sieć](#network). Walidator sprawdza [transakcje](#transaction) i proponuje [bloki](#block) w modelu konsensusu [proof-of-stake](#pos). Staking stanowi dla Ciebie ekonomiczną zachętę do działania w najlepszym interesie sieci. Otrzymasz nagrody za wykonywanie obowiązków [walidatora](#validator), ale stracisz różne ilości ETH, jeśli tego nie zrobisz.

<DocLink href="/staking/">
  Zestakuj swój ETH, aby zostać walidatorem Ethereum
</DocLink>

### kanały uzyskiwania informacyji {#state-channels}

Rozwiązanie [warstwy 2](#layer-2), polegające na ustanowieniu między uczestnikami kanału, w którym mogą swobodnie i tanio przeprowadzać transakcje. Tylko [transakcja](#transaction) ustanawiająca i zamykająca kanał jest wysyłana do [sieci głównej](#mainnet). Pozwala to na bardzo wysoką przepustowość transakcji, ale opiera się na wcześniejszej znajomości liczby uczestników i blokowaniu funduszy.

<DocLink href="/developers/docs/scaling/state-channels/#state-channels">
  Kanały uzyskiwania informacji
</DocLink>

### szabo {#szabo}

Nazwa [etheru](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

[Hard fork](#hard-fork) blockchainu Ethereum wprowadzony w bloku nr 2 463 00, aby zmodyfikować obliczanie zużycia [gazu](#gas) w wybranych zadaniach z wieloma operacjami wejścia – wyjścia, a także by chronić stan przed atakami DoS, w których wykorzystywano niskie zużycie gazu we wspomnianych operacjach.

### testnet {#testnet}

Skrót od nazwy „sieć testowa”, służy do symulowania zachowania głównej sieci Ethereum (patrz [sieć główna](#mainnet)).

<DocLink href="/developers/docs/networks/#ethereum-testnets">
  Sieci testowe
</DocLink>

### standard tokenów {#token-standard}

Wprowadzony we wniosku ERC-20 zapewnia znormalizowaną strukturę [kontraktów inteligentnych](#smart-contract) dla zamiennych tokenów. Tokeny z tego samego kontraktu mogą być śledzone, sprzedawane i wymieniane, w przeciwieństwie do [NFT](#nft).

<DocLink href="/developers/docs/standards/tokens/erc-20/">
  Standard tokena ERC-20
</DocLink>

### transakcja {#transaction}

Dane przeznaczone do blockchainu Ethereum, podpisane przez [konto](#account) źródłowe skierowane pod określony [adres](#address). Transakcja zawiera metadane, np. [limit gazu](#gas-limit) dla tej transakcji.

<DocLink href="/developers/docs/transactions/">
  Transakcje
</DocLink>

### opłata transakcyjna {#transaction-fee}

Opłata, którą musisz wnieść za każdym razem, gdy korzystasz z sieci Ethereum. Może to być wysyłanie środków z Twojego [portfela](#wallet) lub interakcje z [aplikacją zdecentralizowaną](#dapp), np. zamiana tokenów lub zakup elementu kolekcjonerskiego. Można to interpretować jako opłatę za usługę. Opłata ta zmienia się w zależności od stopnia zajętości sieci. Dzieje się tak, ponieważ [górnicy](#miner), osoby odpowiedzialne za przetwarzanie transakcji, prawdopodobnie będą priorytetowo traktować transakcje z wyższymi opłatami – w związku z tym zatory powodują wzrost cen.

Na poziomie technicznym opłata za transakcję odnosi się do ilości [gazu](#gas) wymaganej przez Twoją transakcję.

Obniżenie opłat transakcyjnych jest obecnie przedmiotem dużego zainteresowania. Zobacz [Warstwa 2](#layer-2)

### kompletność w sensie Turinga {#turing-complete}

Nazwa ta pochodzi od brytyjskiego matematyka i informatyka Alana Turinga. System reguł manipulowania danymi (np. zbiór instrukcji komputera, język programowania lub automat komórkowy) jest „kompletny w sensie Turinga”, jeśli można go wykorzystać do zasymulowania działania dowolnej maszyny Turinga.

<Divider />

## V {#section-v}

### walidator {#validator}

[Węzeł](#node) w systemie [proof-of-stake](#proof-of-stake) odpowiedzialny za przechowywanie danych, przetwarzanie transakcji i dodawanie nowych bloków do blockchainu. Aby aktywować oprogramowanie walidatora, musisz mieć możliwość [stakingu](#staking) 32 ETH.

<DocLink href="/developers/docs/consensus-mechanisms/pos">
  Proof-of-stake
</DocLink> <DocLink href="/staking/">
  Stakowanie w Ethereum
</DocLink>

### Dowód ważności {#validity-proof}

Model bezpieczeństwa dla niektórych rozwiązań [warstwy 2](#layer-2), gdzie w celu zwiększenia szybkości transakcje są [wrzucane](/#rollups) do partii i przesyłane do Ethereum w jednej transakcji. Obliczanie transakcji odbywa się poza łańcuchem, a następnie jest dostarczane do głównego łańcucha wraz z dowodem ich ważności. Ta metoda zwiększa liczbę możliwych transakcji przy jednoczesnym zachowaniu bezpieczeństwa. Niektóre [pakiety zbiorcze](#rollups) używają [dowodu oszustwa](#fraud-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Pakiety zbiorcze o wiedzy zerowej
</DocLink>

### Validium {#validium}

Rozwiązanie, które używa [dowodów ważności](#validity-proof) w celu poprawy przepustowości transakcji. W przeciwieństwie do [pakietów zbiorczych z zerową wiedzą](#zk-rollup), dane Validium nie są przechowywane w warstwie 1 [sieci głównej](#mainnet).

<DocLink href="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Wysokopoziomowy jęsyk programowania wysokiego poziomu o składni zbliżonej do Pythona. Ma być językiem zbliżonym do języków czysto funkcyjnych. Utworzony przez Vitalika Buterina.

<DocLink href="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### portfel {#wallets}

Oprogramowanie przechowujące [klucze prywatne](#private-key). Pozwala uzyskać dostęp do [kont](#account) Ethereum, kontrolować je i komunikować się z [inteligentnymi kontraktami](#smart-contract). Klucze nie muszą być przechowywane w portfelu i mogą być pobierane z magazynu offline (tj. karty pamięci lub kartki papieru) w celu poprawy bezpieczeństwa. Pomimo nazwy portfele nigdy nie przechowują pieniędzy ani tokenów.

<DocLink href="/wallets/">
  Portfele Ethereum
</DocLink>

### Web3 {#web3}

Trzecia wersja Internetu. Po raz pierwszy zaproponował ją dr Gavin Wood. Sieć Web3 reprezentuje nową wizję opartą na aplikacjach sieciowych. Ma pozwolić przejść od zarządzanych aplikacji z jednym właścicielem do aplikacji rozwijanych za pomocą decentralizowanych protokołów (patrz [Dapp](#dapp)).

<DocLink href="/developers/docs/web2-vs-web3/">
  Web2 vs Web3
</DocLink>

### wei {#wei}

Najmniejsza jednostka waluty [ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### adres zerowy {#zero-address}

To specjalny adres w Ethereum, obejmujący same zera. Jest on podawany jako adres docelowy w [transakcjach tworzących kontrakty](#contract-creation-transaction).

### pakiet zbiorczy o wiedzy zerowej {#zk-rollup}

[Pakiet zbiorczy](#rollups)transakcji korzystający z [ dowodów ważności](#validity-proof) w celu zwiększenia przepustowości transakcji [warstwy 2](#layer-2) przy zastosowaniu zabezpieczeń zapewnianych przez [sieć główną](#mainnet) (warstwa 1). Pakiety zbiorcze o wiedzy zerowej nie mogą obsługiwać złożonych transakcji (co mogą robić [optymistyczne pakiety zbiorcze](#optimistic-rollups)), ale nie dotyczą ich problemy z opóźnieniami, ponieważ przedłożone transakcje są ewidentnie ważne.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Pakiety zbiorcze o wiedzy zerowej
</DocLink>

<Divider />

## Źródła {#sources}

_Częściowo na podstawie książki [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) autorstwa [Andreasa M. Antonopoulosa i Gavina Dreoda](https://ethereumbook.info) w ramach licencji CC-BY-SA_

<Divider />

## Współtwórz tę stronę {#contribute-to-this-page}

Zapomnieliśmy o czymś? Widzisz jakieś błędy? Pomóż nam wprowadzać ulepszenia, współtworząc ten słownik na GitHub!

[Dowiedz się więcej o tym, jak włączyć się do tworzenia strony](/contributing/adding-glossary-terms)
