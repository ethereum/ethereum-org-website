---
title: Definicja tajnego magazynu Web3
description: "Formalna definicja przechowywania sekretów web3"
lang: pl
sidebarDepth: 2
---

Aby Twoja aplikacja działała na Ethereum, możesz użyć obiektu web3 dostarczonego przez bibliotekę web3.js. Pod maską komunikuje się z lokalnym węzłem za pomocą wywołań RPC. [web3](https://github.com/ethereum/web3.js/) działa z każdym węzłem Ethereum, który udostępnia warstwę RPC.

`web3` zawiera obiekt `eth` – web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** wynik
 *               [ 'web3', 3 ]   plik kluczy web3 (v3)
 *  [ 'ethersale', undefined ]   plik kluczy Ethersale
 *                        null     nieprawidłowy plik kluczy
 */
```

Ten dokument opisuje **wersję 3** definicji przechowywania sekretów Web3.

## Definicja {#definition}

Rzeczywiste kodowanie i dekodowanie pliku pozostaje w dużej mierze niezmienione w stosunku do wersji 1, z wyjątkiem tego, że algorytm kryptograficzny nie jest już na stałe ustawiony na AES-128-CBC (minimalnym wymaganiem jest teraz AES-128-CTR). Większość znaczeń/algorytmów jest podobna do wersji 1, z wyjątkiem `mac`, który jest podany jako SHA3 (keccak-256) konkatenacji drugich od lewej 16 bajtów klucza pochodnego wraz z pełnym `ciphertext`.

Pliki kluczy tajnych są przechowywane bezpośrednio w `~/.web3/keystore` (dla systemów typu Unix) i `~/AppData/Web3/keystore` (dla Windows). Mogą mieć dowolną nazwę, ale dobrą konwencją jest `<uuid>.json`, gdzie `<uuid>` to 128-bitowy identyfikator UUID przypisany do klucza tajnego (zastępstwo dla adresu klucza tajnego, które chroni prywatność).

Wszystkie takie pliki mają powiązane hasło. Aby uzyskać klucz tajny danego pliku `.json`, najpierw należy uzyskać klucz szyfrowania pliku; odbywa się to poprzez pobranie hasła pliku i przekazanie go przez funkcję wyprowadzania klucza opisaną przez klucz `kdf`. Statyczne i dynamiczne parametry zależne od KDF dla funkcji KDF są opisane w kluczu `kdfparams`.

PBKDF2 musi być obsługiwany przez wszystkie minimalnie zgodne implementacje, oznaczane jako:

- `kdf`: `pbkdf2`

Dla PBKDF2, kdfparams obejmują:

- `prf`: musi być `hmac-sha256` (może zostać rozszerzony w przyszłości);
- `c`: liczba iteracji;
- `salt`: salt przekazywane do PBKDF;
- `dklen`: długość klucza pochodnego. Musi być >= 32.

Po uzyskaniu klucza pliku należy go zweryfikować poprzez wyprowadzenie MAC. MAC powinien być obliczany jako hasz SHA3 (keccak-256) tablicy bajtów utworzonej jako konkatenacja drugich od lewej 16 bajtów klucza pochodnego z zawartością klucza `ciphertext`, tzn.:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(gdzie `++` jest operatorem konkatenacji)

Wartość ta powinna być porównana z zawartością klucza `mac`; jeśli są różne, należy poprosić o alternatywne hasło (lub anulować operację).

Po zweryfikowaniu klucza pliku, szyfrogram (klucz `ciphertext` w pliku) może zostać odszyfrowany przy użyciu symetrycznego algorytmu szyfrowania określonego przez klucz `cipher` i sparametryzowanego przez klucz `cipherparams`. Jeśli rozmiar klucza pochodnego i rozmiar klucza algorytmu nie pasują do siebie, jako klucz do algorytmu należy użyć uzupełnionych zerami, skrajnych prawych bajtów klucza pochodnego.

Wszystkie minimalnie zgodne implementacje muszą obsługiwać algorytm AES-128-CTR, oznaczony poprzez:

- `cipher: aes-128-ctr`

Ten szyfr przyjmuje następujące parametry, podane jako klucze do klucza cipherparams:

- `iv`: 128-bitowy wektor inicjalizujący dla szyfru.

Kluczem do szyfru jest skrajne lewe 16 bajtów klucza pochodnego, tzn. `DK[0..15]`

Tworzenie/szyfrowanie klucza tajnego powinno być zasadniczo odwrotnością tych instrukcji. Upewnij się, że `uuid`, `salt` i `iv` są rzeczywiście losowe.

Oprócz pola `version`, które powinno działać jako „twardy” identyfikator wersji, implementacje mogą również używać `minorversion` do śledzenia mniejszych, niezakłócających zmian w formacie.

## Wektory testowe {#test-vectors}

Szczegóły:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Wektor testowy wykorzystujący `AES-128-CTR` i `PBKDF2-SHA-256`:

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

`Klucz pochodny`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`Treść MAC`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Klucz szyfru`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Wektor testowy wykorzystując AES-128-CTR i Scrypt:

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

`Klucz pochodny`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`Treść MAC`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Klucz szyfru`: `7446f59ecc301d2d79bc3302650d8a5c`

## Zmiany w stosunku do wersji 1 {#alterations-from-v2}

Ta wersja naprawia kilka niespójności z wersją 1 opublikowaną [tutaj](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). W skrócie są to:

- Wielkość liter jest nieuzasadniona i niespójna (scrypt pisany małymi literami, Kdf pisany z wielkiej i małej litery, MAC pisany wielkimi literami).
- Adres jest niepotrzebny i narusza prywatność.
- `Salt` jest z natury parametrem funkcji wyprowadzania klucza i zasługuje na to, by być z nią kojarzonym, a nie z kryptografią w ogóle.
- _SaltLen_ niepotrzebne (wystarczy wyprowadzić je z Salt).
- Funkcja wyprowadzania klucza jest podana, ale algorytm kryptograficzny jest sztywno określony.
- `Version` jest z natury numeryczna, a jednak jest ciągiem znaków (wersjonowanie strukturalne byłoby możliwe z ciągiem znaków, ale można uznać, że wykracza poza zakres rzadko zmieniającego się formatu pliku konfiguracyjnego).
- `KDF` i `cipher` są pojęciowo rodzeństwem, ale są inaczej zorganizowane.
- `MAC` jest obliczany na podstawie fragmentu danych, który ignoruje białe znaki (!)

Wprowadzono zmiany w formacie, aby uzyskać następujący plik, funkcjonalnie równoważny z przykładem podanym na poprzednio podlinkowanej stronie:

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

## Zmiany w stosunku do wersji 2 {#alterations-from-v2}

Wersja 2 była wczesną implementacją w C++ z wieloma błędami. Wszystkie podstawowe elementy pozostają w niej niezmienione.
