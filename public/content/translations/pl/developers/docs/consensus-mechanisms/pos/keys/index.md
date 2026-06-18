---
title: Klucze w Ethereum opartym na dowodzie stawki (PoS)
description: Wyjaśnienie kluczy używanych w mechanizmie konsensusu dowodu stawki (PoS) w Ethereum
lang: pl
---

Ethereum zabezpiecza aktywa użytkowników za pomocą kryptografii klucza publicznego i prywatnego. Klucz publiczny służy jako podstawa dla adresu Ethereum — to znaczy, że jest widoczny dla ogółu i używany jako unikalny identyfikator. Klucz prywatny (lub „tajny”) powinien być zawsze dostępny tylko dla właściciela konta. Klucz prywatny jest używany do „podpisywania” transakcji i danych, dzięki czemu kryptografia może udowodnić, że posiadacz zatwierdza określone działanie konkretnego klucza prywatnego.

Klucze Ethereum są generowane przy użyciu [kryptografii krzywych eliptycznych](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Jednakże, gdy Ethereum przeszło z [dowodu pracy (PoW)](/developers/docs/consensus-mechanisms/pow) na [dowód stawki (PoS)](/developers/docs/consensus-mechanisms/pos), do Ethereum dodano nowy typ klucza. Oryginalne klucze nadal działają dokładnie tak samo jak wcześniej — nie wprowadzono żadnych zmian w kluczach opartych na krzywych eliptycznych zabezpieczających konta. Użytkownicy potrzebowali jednak nowego typu klucza do uczestnictwa w dowodzie stawki poprzez stakowanie ETH i uruchamianie walidatorów. Potrzeba ta wynikała z wyzwań związanych ze skalowalnością, związanych z wieloma wiadomościami przesyłanymi między dużą liczbą walidatorów, co wymagało metody kryptograficznej, którą można by łatwo agregować w celu zmniejszenia ilości komunikacji wymaganej do osiągnięcia konsensusu przez sieć.

Ten nowy typ klucza wykorzystuje [schemat podpisu **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS umożliwia bardzo wydajną agregację podpisów, ale pozwala również na inżynierię wsteczną zagregowanych indywidualnych kluczy walidatorów i jest idealny do zarządzania działaniami między walidatorami.

## Dwa typy kluczy walidatora {#two-types-of-keys}

Przed przejściem na dowód stawki użytkownicy Ethereum mieli tylko jeden klucz prywatny oparty na krzywych eliptycznych, aby uzyskać dostęp do swoich środków. Wraz z wprowadzeniem dowodu stawki użytkownicy, którzy chcieli być samodzielnymi stakerami (solo stakers), potrzebowali również **klucza walidatora** i **klucza wypłaty**.

### Klucz walidatora {#validator-key}

Klucz podpisujący walidatora składa się z dwóch elementów:

- **Prywatny** klucz walidatora
- **Publiczny** klucz walidatora

Celem klucza prywatnego walidatora jest podpisywanie operacji onchain, takich jak propozycje bloków i poświadczenia. Z tego powodu klucze te muszą być przechowywane w gorącym portfelu.

Ta elastyczność ma tę zaletę, że pozwala na bardzo szybkie przenoszenie kluczy podpisujących walidatora z jednego urządzenia na drugie, jednak jeśli zostaną zgubione lub skradzione, złodziej może **działać złośliwie** na kilka sposobów:

- Doprowadzić do cięcia walidatora poprzez:
  - Bycie proponującym i podpisanie dwóch różnych bloków łańcucha śledzącego (beacon blocks) dla tego samego slotu
  - Bycie poświadczającym i podpisanie poświadczenia, które „otacza” inne
  - Bycie poświadczającym i podpisanie dwóch różnych poświadczeń mających ten sam cel
- Wymusić dobrowolne wyjście, co zatrzymuje stakowanie przez walidatora i przyznaje dostęp do jego salda ETH właścicielowi klucza wypłaty

**Klucz publiczny walidatora** jest dołączany do danych transakcji, gdy użytkownik wpłaca ETH do kontraktu depozytu stakingowego. Jest to znane jako _dane depozytu_ i pozwala Ethereum zidentyfikować walidatora.

### Dane uwierzytelniające wypłaty {#withdrawal-credentials}

Każdy walidator ma właściwość znaną jako _dane uwierzytelniające wypłaty_. Pierwszy bajt tego 32-bajtowego pola identyfikuje typ konta: `0x00` reprezentuje oryginalne dane uwierzytelniające BLS (sprzed Shapella, bez możliwości wypłaty), `0x01` reprezentuje starsze dane uwierzytelniające, które wskazują na adres wykonawczy, a `0x02` reprezentuje nowoczesny typ danych uwierzytelniających z kapitalizacją (compounding).

Walidatory z kluczami BLS `0x00` muszą zaktualizować te dane uwierzytelniające, aby wskazywały na adres wykonawczy w celu aktywacji wypłat nadwyżki salda lub pełnej wypłaty ze stakowania. Można to zrobić, podając adres wykonawczy w danych depozytu podczas początkowego generowania klucza _LUB_ używając klucza wypłaty w późniejszym czasie do podpisania i rozgłoszenia wiadomości `BLSToExecutionChange`.

[Więcej o danych uwierzytelniających wypłaty walidatora](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Klucz wypłaty {#withdrawal-key}

Klucz wypłaty będzie wymagany do aktualizacji danych uwierzytelniających wypłaty, aby wskazywały na adres wykonawczy, jeśli nie został ustawiony podczas początkowego depozytu. Umożliwi to rozpoczęcie przetwarzania wypłat nadwyżki salda, a także pozwoli użytkownikom na pełną wypłatę ich stakowanych ETH.

Podobnie jak klucze walidatora, klucze wypłaty również składają się z dwóch komponentów:

- **Prywatny** klucz wypłaty
- **Publiczny** klucz wypłaty

Utrata tego klucza przed aktualizacją danych uwierzytelniających wypłaty do typu `0x01` oznacza utratę dostępu do salda walidatora. Walidator nadal może podpisywać poświadczenia i bloki, ponieważ te działania wymagają klucza prywatnego walidatora, jednak w przypadku utraty kluczy wypłaty nie ma ku temu prawie żadnej zachęty.

Oddzielenie kluczy walidatora od kluczy konta Ethereum umożliwia jednemu użytkownikowi uruchomienie wielu walidatorów.

![validator key schematic](validator-key-schematic.png)

**Uwaga**: Wyjście z obowiązków stakowania i wypłata salda walidatora wymaga obecnie podpisania [wiadomości o dobrowolnym wyjściu (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) za pomocą klucza walidatora. Jednakże [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) to propozycja, która w przyszłości pozwoli użytkownikowi na wyzwolenie wyjścia walidatora i wypłatę jego salda poprzez podpisywanie wiadomości o wyjściu za pomocą klucza wypłaty. Zmniejszy to założenia dotyczące zaufania, umożliwiając stakerom, którzy delegują ETH do [dostawców usług stakowania (staking-as-a-service)](/staking/saas/#what-is-staking-as-a-service), zachowanie kontroli nad swoimi środkami.

## Wyprowadzanie kluczy z frazy odzyskiwania {#deriving-keys-from-seed}

Gdyby każde stakowane 32 ETH wymagało nowego zestawu 2 całkowicie niezależnych kluczy, zarządzanie kluczami szybko stałoby się nieporęczne, zwłaszcza dla użytkowników uruchamiających wiele walidatorów. Zamiast tego wiele kluczy walidatora można wyprowadzić z jednego wspólnego sekretu, a przechowywanie tego jednego sekretu umożliwia dostęp do wielu kluczy walidatora.

[Mnemoniki](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) i ścieżki to istotne funkcje, z którymi użytkownicy często się spotykają, gdy [uzyskują dostęp](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) do swoich portfeli. Mnemonik to sekwencja słów, która działa jako początkowe ziarno (seed) dla klucza prywatnego. W połączeniu z dodatkowymi danymi mnemonik generuje hash znany jako „klucz główny” (master key). Można to traktować jako korzeń drzewa. Gałęzie z tego korzenia można następnie wyprowadzić za pomocą hierarchicznej ścieżki, dzięki czemu węzły potomne mogą istnieć jako kombinacje hasha ich węzła nadrzędnego i ich indeksu w drzewie. Przeczytaj o standardach [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) i [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) dotyczących generowania kluczy opartych na mnemonikach.

Ścieżki te mają następującą strukturę, która będzie znajoma dla użytkowników, którzy mieli do czynienia z portfelami sprzętowymi:

```
m/44'/60'/0'/0`
```

Ukośniki w tej ścieżce oddzielają komponenty klucza prywatnego w następujący sposób:

```
master_key / purpose / coin_type / account / change / address_index
```

Ta logika umożliwia użytkownikom dołączenie jak największej liczby walidatorów do pojedynczej **frazy mnemonicznej**, ponieważ korzeń drzewa może być wspólny, a zróżnicowanie może następować na gałęziach. Użytkownik może **wyprowadzić dowolną liczbę kluczy** z frazy mnemonicznej.

```
[m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Każda gałąź jest oddzielona znakiem `/`, więc `m/2` oznacza rozpoczęcie od klucza głównego i podążanie gałęzią 2. Na poniższym schemacie pojedyncza fraza mnemoniczna jest używana do przechowywania trzech kluczy wypłaty, z których każdy ma dwa powiązane walidatory.

![validator key logic](multiple-keys.png)

## Dalsza lektura {#further-reading}

- [Wpis na blogu Fundacji Ethereum autorstwa Carla Beekhuizena](https://blog.ethereum.org/2020/05/21/keys)
- [EIP-2333: Generowanie kluczy BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Wyjścia wyzwalane przez warstwę wykonawczą](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Zarządzanie kluczami na dużą skalę](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)