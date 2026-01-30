---
title: Klucze w proof-of-stake Ethereum
description: Wytłumaczenie kluczy używanych w mechanizmie konsensusu Ethereum proof-of-stake
lang: pl
---

Ethereum zabezpiecza aktywa użytkownika za pomocą kryptografii klucza publicznego i prywatnego. Klucz publiczny jest używany jako podstawa adresu Ethereum — to znaczy, że jest widoczny dla wszystkich i używany jako unikalny identyfikator. Klucz prywatny (lub „tajny”) powinien być zawsze dostępny tylko dla właściciela konta. Klucz prywatny jest używany do „podpisywania” transakcji i danych, dzięki czemu kryptografia może udowodnić, że posiadacz zatwierdza jakieś działanie określonego klucza prywatnego.

Klucze Ethereum są generowane przy użyciu [kryptografii krzywych eliptycznych](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Jednak gdy Ethereum przeszło z [dowodu pracy](/developers/docs/consensus-mechanisms/pow) na [dowód stawki](/developers/docs/consensus-mechanisms/pos), do Ethereum dodano nowy typ klucza. Oryginalne klucze nadal działają dokładnie tak samo jak wcześniej — nie wprowadzono żadnych zmian w kluczach zabezpieczających konta opartych na krzywej eliptycznej. Użytkownicy potrzebowali jednak nowego typu klucza do udziału w proof-of-stake poprzez stakowanie ETH i uruchamianie walidatorów. Potrzeba ta wynikała z wyzwań skalowalności związanych z wieloma wiadomościami przechodzącymi między dużą liczbą walidatorów, które wymagały metody kryptograficznej, którą można łatwo zagregować, aby zmniejszyć ilość komunikacji wymaganej do osiągnięcia konsensusu w sieci.

Ten nowy typ klucza wykorzystuje [schemat podpisu cyfrowego **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS umożliwia bardzo wydajną agregację podpisów, ale także pozwala na inżynierię wsteczną zagregowanych indywidualnych kluczy walidatorów i jest idealny do zarządzania działaniami między walidatorami.

## Dwa typy kluczy walidatora {#two-types-of-keys}

Przed przejściem na proof-of-stake, użytkownicy Ethereum mieli tylko jeden klucz prywatny oparty na krzywej eliptycznej, aby uzyskać dostęp do swoich środków. Wraz z wprowadzeniem dowodu stawki, użytkownicy, którzy chcieli być stakerami solo, potrzebowali również **klucza walidatora** i **klucza do wypłat**.

### Klucz walidatora {#validator-key}

Klucz podpisujący walidatora składa się z dwóch elementów:

- **Prywatny** klucz walidatora
- **Publiczny** klucz walidatora

Celem prywatnego klucza walidatora jest podpisywanie operacji w łańcuchu (on-chain), takich jak propozycje bloków i atesty. Z tego powodu klucze te muszą być przechowywane w gorącym portfelu.

Ta elastyczność ma tę zaletę, że umożliwia bardzo szybkie przenoszenie kluczy podpisujących walidatora z jednego urządzenia na drugie, jednak w przypadku ich zgubienia lub kradzieży złodziej może **działać na szkodę** na kilka sposobów:

- Odciąć walidatora, poprzez:
  - Bycie proponentem i podpisanie dwóch różnych bloków śledzących dla tego samego slotu
  - Bycie poświadczającym i podpisanie poświadczenia, które „otacza” inne poświadczenie
  - Bycie poświadczającym i podpisanie dwóch różnych poświadczeń mających ten sam cel
- Wymusić dobrowolne wyjście, które zatrzymuje walidatora od stakowania i przyznaje dostęp do jego salda ETH właścicielowi wycofanego klucza

**Publiczny klucz walidatora** jest zawarty w danych transakcji, gdy użytkownik wpłaca ETH do kontraktu depozytowego stakowania. Są to tzw. _dane depozytowe_ i pozwalają one Ethereum zidentyfikować walidatora.

### Dane uwierzytelniające do wypłaty {#withdrawal-credentials}

Każdy walidator ma właściwość znaną jako _dane uwierzytelniające do wypłaty_. Pierwszy bajt tego 32-bajtowego pola identyfikuje typ konta: `0x00` reprezentuje oryginalne dane uwierzytelniające BLS (przed Shapellą, niewypłacalne), `0x01` reprezentuje starsze dane uwierzytelniające wskazujące na adres wykonawczy, a `0x02` reprezentuje nowoczesny typ danych uwierzytelniających z reinwestowaniem.

Walidatorzy z kluczami BLS `0x00` muszą zaktualizować te dane uwierzytelniające, aby wskazywały na adres wykonawczy w celu aktywacji wypłat nadwyżki salda lub pełnej wypłaty ze stakowania. Można to zrobić, podając adres wykonawczy w danych depozytu podczas początkowego generowania klucza, _LUB_ używając klucza do wypłat w późniejszym czasie do podpisania i rozgłoszenia komunikatu `BLSToExecutionChange`.

[Więcej na temat danych uwierzytelniających do wypłaty walidatora](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Klucz do wypłat {#withdrawal-key}

Klucz wypłaty będzie wymagany do zaktualizowania poświadczeń wypłaty, aby wskazywały na adres wykonawczy, jeśli nie został ustawiony podczas początkowego depozytu. Umożliwi to rozpoczęcie przetwarzania płatności nadwyżek salda, a także pozwoli użytkownikom w pełni wypłacić zestakowane ETH.

Podobnie jak klucze walidatora, klucze wypłaty również składają się z dwóch elementów:

- **Prywatny** klucz do wypłat
- **Publiczny** klucz do wypłat

Utrata tego klucza przed aktualizacją danych uwierzytelniających do wypłaty do typu `0x01` oznacza utratę dostępu do salda walidatora. Walidator może nadal podpisywać poświadczenia i bloki, ponieważ działania te wymagają prywatnego klucza walidatora, jednak nie ma żadnej zachęty, jeśli klucze wypłaty zostaną utracone.

Oddzielenie kluczy walidatora od kluczy konta Ethereum umożliwia uruchamianie wielu walidatorów przez jednego użytkownika.

![schemat klucza walidatora](validator-key-schematic.png)

**Uwaga**: Wyjście z obowiązków stakowania i wypłacenie salda walidatora wymaga obecnie podpisania [dobrowolnego komunikatu o wyjściu (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) kluczem walidatora. Jednakże, [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) to propozycja, która w przyszłości pozwoli użytkownikowi na uruchomienie wyjścia walidatora i wypłatę jego salda poprzez podpisanie komunikatów o wyjściu kluczem do wypłat. Zmniejszy to założenia dotyczące zaufania, umożliwiając stakerom, którzy delegują ETH do [dostawców stakowania jako usługi](/staking/saas/#what-is-staking-as-a-service), zachowanie kontroli nad swoimi środkami.

## Wyprowadzanie kluczy z frazy seed {#deriving-keys-from-seed}

Gdyby każde zestakowane 32 ETH wymagało nowego zestawu 2 całkowicie niezależnych kluczy, zarządzanie kluczami szybko stałoby się nieporęczne, szczególnie dla użytkowników uruchamiających wielu walidatorów. Zamiast tego wiele kluczy walidatora można uzyskać z jednego wspólnego tajnego klucza, a przechowywanie tego pojedynczego tajnego klucza umożliwia dostęp do wielu kluczy walidatora.

[Mnemoniki](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) i ścieżki to ważne funkcje, z którymi użytkownicy często się spotykają, gdy [uzyskują dostęp](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) do swoich portfeli. Mnemonik jest sekwencją słów, które działają jako początkowe ziarno dla klucza prywatnego. W połączeniu z dodatkowymi danymi, mnemonik generuje hash znany jako „klucz główny”. Można to porównać do korzenia drzewa. Odgałęzienia od tego korzenia można następnie wyprowadzić za pomocą ścieżki hierarchicznej, dzięki czemu węzły podrzędne mogą istnieć jako kombinacje hashu węzła nadrzędnego i jego indeksu w drzewie. Przeczytaj o standardach [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) i [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) do generowania kluczy na podstawie mnemoników.

Ścieżki te mają następującą strukturę, która będzie znana użytkownikom, którzy mieli do czynienia z portfelami sprzętowymi:

```
m/44'/60'/0'/0`
```

Ukośniki w tej ścieżce oddzielają komponenty klucza prywatnego w następujący sposób:

```
master_key / purpose / coin_type / account / change / address_index
```

Ta logika pozwala użytkownikom na dołączenie jak największej liczby walidatorów do jednej **frazy mnemonicznej**, ponieważ korzeń drzewa może być wspólny, a zróżnicowanie może następować na gałęziach. Użytkownik może **wyprowadzić dowolną liczbę kluczy** z frazy mnemonicznej.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Każda gałąź jest oddzielona znakiem `/`, więc `m/2` oznacza rozpoczęcie od klucza głównego i podążanie za gałęzią 2. Na poniższym schemacie pojedyncza fraza mnemoniczna jest używana do przechowywania trzech kluczy wypłat, każdy z dwoma powiązanymi walidatorami.

![logika klucza walidatora](multiple-keys.png)

## Dalsza lektura {#further-reading}

- [Wpis na blogu Ethereum Foundation autorstwa Carla Beekhuizena](https://blog.ethereum.org/2020/05/21/keys/)
- [EIP-2333 generowanie kluczy BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Wyjścia wyzwalane przez warstwę wykonawczą](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Zarządzanie kluczami na dużą skalę](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
