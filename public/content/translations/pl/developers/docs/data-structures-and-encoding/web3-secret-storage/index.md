---
title: "Definicja przechowywania sekretów Web3"
description: "Formalna definicja przechowywania sekretów Web3"
lang: pl
sidebarDepth: 2
---

Aby Twoja aplikacja działała na Ethereum, możesz użyć obiektu web3 dostarczanego przez bibliotekę Web3.js. Wewnętrznie komunikuje się on z lokalnym węzłem poprzez wywołania RPC. [web3](https://github.com/ethereum/web3.js/) współpracuje z dowolnym węzłem Ethereum, który udostępnia warstwę RPC.

`web3` zawiera obiekt `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** wynik
 *               [ 'web3', 3 ]   plik klucza Web3 (v3)
 *  [ 'ethersale', undefined ]   plik klucza Ethersale
 *                        null     nieprawidłowy plik klucza
 */
```

Ten dokument opisuje **wersję 3** definicji przechowywania sekretów Web3 (Web3 Secret Storage Definition).

## Definicja {#definition}

Samo kodowanie i dekodowanie pliku pozostaje w dużej mierze niezmienione w stosunku do wersji 1, z tą różnicą, że algorytm krypto nie jest już na stałe przypisany do AES-128-CBC (obecnie minimalnym wymaganiem jest AES-128-CTR). Większość znaczeń/algorytmów jest podobna do wersji 1, z wyjątkiem `mac`, który jest podawany jako SHA3 (Keccak-256) z konkatenacji drugich od lewej 16 bajtów wyprowadzonego klucza wraz z pełnym `ciphertext`.

Pliki kluczy tajnych są przechowywane bezpośrednio w `~/.web3/keystore` (dla systemów uniksopodobnych) oraz `~/AppData/Web3/keystore` (dla Windows). Mogą nosić dowolną nazwę, ale dobrą konwencją jest `<uuid>.json`, gdzie `<uuid>` to 128-bitowy UUID nadany kluczowi tajnemu (chroniący prywatność zamiennik dla adresu klucza tajnego).

Wszystkie takie pliki mają powiązane hasło. Aby wyprowadzić klucz tajny danego pliku `.json`, należy najpierw wyprowadzić klucz szyfrowania pliku; robi się to poprzez pobranie hasła pliku i przepuszczenie go przez funkcję wyprowadzania klucza (KDF), jak opisano w kluczu `kdf`. Zależne od KDF statyczne i dynamiczne parametry dla funkcji KDF są opisane w kluczu `kdfparams`.

PBKDF2 musi być obsługiwane przez wszystkie minimalnie zgodne implementacje, co oznacza się poprzez:

- `kdf`: `pbkdf2`

Dla PBKDF2, parametry kdfparams obejmują:

- `prf`: Musi wynosić `hmac-sha256` (może zostać rozszerzone w przyszłości);
- `c`: liczba iteracji;
- `salt`: sól przekazywana do PBKDF;
- `dklen`: długość wyprowadzonego klucza. Musi być >= 32.

Po wyprowadzeniu klucza pliku, powinien on zostać zweryfikowany poprzez wyprowadzenie MAC. MAC powinien być obliczony jako hash SHA3 (Keccak-256) z tablicy bajtów utworzonej jako konkatenacja drugich od lewej 16 bajtów wyprowadzonego klucza z zawartością klucza `ciphertext`, tj.:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(gdzie `++` jest operatorem konkatenacji)

Wartość ta powinna zostać porównana z zawartością klucza `mac`; jeśli się różnią, należy poprosić o alternatywne hasło (lub anulować operację).

Po zweryfikowaniu klucza pliku, szyfrogram (klucz `ciphertext` w pliku) może zostać odszyfrowany przy użyciu symetrycznego algorytmu szyfrowania określonego przez klucz `cipher` i sparametryzowanego przez klucz `cipherparams`. Jeśli rozmiar wyprowadzonego klucza i rozmiar klucza algorytmu są niezgodne, jako klucz do algorytmu należy użyć skrajnie prawych bajtów wyprowadzonego klucza, uzupełnionych zerami.

Wszystkie minimalnie zgodne implementacje muszą obsługiwać algorytm AES-128-CTR, oznaczany poprzez:

- `cipher: aes-128-ctr`

Ten szyfr przyjmuje następujące parametry, podane jako klucze do klucza cipherparams:

- `iv`: 128-bitowy wektor inicjalizacyjny dla szyfru.

Kluczem dla szyfru jest skrajnie lewe 16 bajtów wyprowadzonego klucza, tj. `DK[0..15]`

Tworzenie/szyfrowanie klucza tajnego powinno być w zasadzie odwrotnością tych instrukcji. Upewnij się, że `uuid`, `salt` i `iv` są rzeczywiście losowe.

Oprócz pola `version`, które powinno działać jako „twardy” identyfikator wersji, implementacje mogą również używać `minorversion` do śledzenia mniejszych, niepowodujących błędów zmian w formacie.

## Wektory testowe {#test-vectors}

Szczegóły:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#pbkdf2-sha-256}

Wektor testowy używający `AES-128-CTR` i `PBKDF2-SHA-256`:

Zawartość pliku `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "6087dab2f9fdbbfaddc31a909735c1e6"
    },
    "ciphertext": "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    "kdf": "pbkdf2",
    "kdfparams": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    },
    "mac": "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Wartości pośrednie**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Wektor testowy używający AES-128-CTR i Scrypt:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "740770fce12ce862af21264dab25f1da"
    },
    "ciphertext": "dd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "25710c2ccd7c610b24d068af83b959b7a0e5f40641f0c82daeb1345766191034"
    },
    "mac": "337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Wartości pośrednie**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## Zmiany w stosunku do wersji 1 {#alterations-from-v2}

Ta wersja naprawia kilka niespójności z wersją 1 opublikowaną [tutaj](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). W skrócie są to:

- Użycie wielkich liter jest nieuzasadnione i niespójne (scrypt małymi literami, Kdf mieszanymi, MAC wielkimi).
- Adres jest niepotrzebny i narusza prywatność.
- `Salt` jest z natury parametrem funkcji wyprowadzania klucza i powinien być z nią powiązany, a nie z krypto w ogóle.
- _SaltLen_ jest niepotrzebne (wystarczy wyprowadzić je z Salt).
- Funkcja wyprowadzania klucza jest podana, a mimo to algorytm krypto jest ściśle określony.
- `Version` jest z natury wartością liczbową, a mimo to jest ciągiem znaków (ustrukturyzowane wersjonowanie byłoby możliwe przy użyciu ciągu znaków, ale można je uznać za wykraczające poza zakres rzadko zmieniającego się formatu pliku konfiguracyjnego).
- `KDF` i `cipher` są pojęciowo koncepcjami pokrewnymi, a mimo to są zorganizowane inaczej.
- `MAC` jest obliczany na podstawie danych ignorujących białe znaki(!)

Wprowadzono zmiany w formacie, aby uzyskać następujący plik, funkcjonalnie równoważny przykładowi podanemu na wcześniej podlinkowanej stronie:

```json
{
  "crypto": {
    "cipher": "aes-128-cbc",
    "ciphertext": "07533e172414bfa50e99dba4a0ce603f654ebfa1ff46277c3e0c577fdc87f6bb4e4fe16c5a94ce6ce14cfa069821ef9b",
    "cipherparams": {
      "iv": "16d67ba0ce5a339ff2f07951253e6ba8"
    },
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "06870e5e6a24e183a5c807bd1c43afd86d573f7db303ff4853d135cd0fd3fe91"
    },
    "mac": "8ccded24da2e99a11d48cda146f9cc8213eb423e2ea0d8427f41c3be414424dd",
    "version": 1
  },
  "id": "0498f19a-59db-4d54-ac95-33901b4f1870",
  "version": 2
}
```

## Zmiany w stosunku do wersji 2 {#alterations-from-v2-2}

Wersja 2 była wczesną implementacją w C++ z wieloma błędami. Wszystkie istotne elementy pozostają w stosunku do niej niezmienione.