---
title: Speicherdefinition von Web3-Geheimnis
description: Formale Definition für die geheime Speicherung von Web3
lang: de
sidebarDepth: 2
---

Damit Ihre App auf Ethereum funktioniert, können Sie das von der Bibliothek web3.js bereitgestellte Web3 Objekt verwenden. Unter der Haube kommuniziert es über RPC Aufrufe mit einem lokalen Knoten. [web3](https://github.com/ethereum/web3.js/) funktioniert mit jedem Ethereum-Node, der eine RPC-Schicht bereitstellt.

`web3` enthält das `eth`-Objekt – web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** result
 *               [ 'web3', 3 ]   web3 (v3) Schlüsseldatei
 *  [ 'ethersale', undefined ]   Ethersale-Schlüsseldatei
 *                        null     ungültige Schlüsseldatei
 */
```

Dieses Dokument beschreibt **Version 3** der Web3 Secret Storage Definition.

## Definition {#definition}

Die eigentliche Kodierung und Dekodierung der Datei bleibt im Vergleich zu Version 1 weitgehend unverändert, außer dass der Kryptoalgorithmus nicht mehr auf AES-128-CBC festgelegt ist (AES-128-CTR ist jetzt die Mindestanforderung). Die meisten Bedeutungen/der Algorithmus sind ähnlich wie in Version 1, mit Ausnahme von `mac`, das als SHA3 (Keccak-256) der Verkettung der zweiten 16 Bytes von links des abgeleiteten Schlüssels zusammen mit dem vollständigen `ciphertext` angegeben wird.

Geheime Schlüsseldateien werden direkt in `~/.web3/keystore` (für Unix-ähnliche Systeme) und `~/AppData/Web3/keystore` (für Windows) gespeichert. Sie können beliebig benannt werden, aber eine gute Konvention ist `<uuid>.json`, wobei `<uuid>` die 128-Bit-UUID ist, die dem geheimen Schlüssel zugewiesen wird (ein datenschutzwahrender Proxy für die Adresse des geheimen Schlüssels).

Diese Dateien sind passwortgeschützt. Um den geheimen Schlüssel einer `.json`-Datei abzuleiten, wird zuerst der Verschlüsselungsschlüssel der Datei abgeleitet; dies geschieht, indem das Passwort der Datei durch eine Schlüsselableitungsfunktion geleitet wird, wie sie vom `kdf`-Schlüssel beschrieben wird. KDF-abhängige statische und dynamische Parameter für die KDF-Funktion werden im `kdfparams`-Schlüssel beschrieben.

Für alle minimal konformen Implementierungen ist die Unterstützung von PBKDF2 obligatorisch, mit folgender Kennzeichnung:

- `kdf`: `pbkdf2`

Für PBKDF2 setzen sich die <code>kdfparams</code> wie folgt zusammen:

- `prf`: Muss `hmac-sha256` sein (kann in Zukunft erweitert werden);
- `c`: Anzahl der Iterationen;
- `salt`: Salt, das an PBKDF übergeben wird;
- `dklen`: Länge für den abgeleiteten Schlüssel. Muss >= 32 sein.

Nachdem der Schlüssel der Datei abgeleitet wurde, muss er durch die Ableitung des MAC verifiziert werden. Der MAC sollte als SHA3 (Keccak-256)-Hash des Byte-Arrays berechnet werden, das durch die Verkettung der Bytes 16-31 des abgeleiteten Schlüssels mit dem Inhalt des `ciphertext`-Schlüssels gebildet wird, d. h.:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(wobei `++` der Verkettungsoperator ist)

Dieser Wert sollte mit dem Inhalt des `mac`-Schlüssels verglichen werden; wenn sie sich unterscheiden, sollte ein alternatives Passwort angefordert (oder der Vorgang abgebrochen) werden.

Nachdem der Schlüssel der Datei verifiziert wurde, kann der Chiffretext (der `ciphertext`-Schlüssel in der Datei) mit dem symmetrischen Verschlüsselungsalgorithmus entschlüsselt werden, der durch den `cipher`-Schlüssel spezifiziert und durch den `cipherparams`-Schlüssel parametrisiert wird. Bei einer Nichtübereinstimmung der Schlüsselgrößen (abgeleiteter Schlüssel vs. Algorithmus-Schlüssel) werden die letzten Bytes des mit Nullen aufgefüllten, abgeleiteten Schlüssels als Schlüssel für den Algorithmus genutzt.

ede Implementierung, die die Mindestanforderungen erfüllt, muss den AES-128-CTR-Algorithmus unterstützen, welcher folgendermaßen gekennzeichnet ist:

- `cipher: aes-128-ctr`

Dieser Verschlüsselungsalgorithmus verwendet die folgenden Parameter, welche als Schlüssel innerhalb des cipherparams-Objekts übergeben werden:

- `iv`: 128-Bit-Initialisierungsvektor für die Chiffre.

Als Schlüssel für die Chiffre werden die 16 Bytes ganz links des abgeleiteten Schlüssels verwendet, d. h. `DK[0..15]`.

Für die Erstellung und Verschlüsselung eines geheimen Schlüssels gelten diese Anweisungen im Grunde in umgekehrter Reihenfolge. Stellen Sie sicher, dass `uuid`, `salt` und `iv` tatsächlich zufällig sind.

Zusätzlich zum `version`-Feld, das als „harter“ Identifikator für die Version dienen sollte, können Implementierungen auch `minorversion` verwenden, um kleinere, abwärtskompatible Änderungen am Format zu verfolgen.

## Testvektoren {#test-vectors}

Details:

- `Adresse`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Passwort`: `testpassword`
- `Geheimnis`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Testvektor mit `AES-128-CTR` und `PBKDF2-SHA-256`:

Dateiinhalt von `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

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

**Zwischenergebnisse**:

`Abgeleiteter Schlüssel`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC-Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Chiffrierschlüssel`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Testvektor für <code>AES-128-CTR</code> und <code>Scrypt</code>:

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

**Zwischenergebnisse**:

`Abgeleiteter Schlüssel`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC-Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Chiffrierschlüssel`: `7446f59ecc301d2d79bc3302650d8a5c`

## Änderungen gegenüber Version 1 {#alterations-from-v2}

Diese Version behebt mehrere Inkonsistenzen mit der [hier](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst) veröffentlichten Version 1. In Kürze:

- Die uneinheitliche und willkürliche Groß- und Kleinschreibung ist problematisch (mal Kleinschreibung wie bei <code>scrypt</code>, mal gemischte Schreibweise wie bei <code>Kdf</code> oder Großbuchstaben wie bei <code>MAC</code>).
- Das Feld <code>Address</code> ist nicht erforderlich und gefährdet die Privatsphäre.
- `Salt` ist ein wesentlicher Parameter der Schlüsselableitungsfunktion und sollte ihr zugeordnet werden, nicht der Kryptographie im Allgemeinen.
- _SaltLen_ ist unnötig (es kann einfach von Salt abgeleitet werden).
- Die Schlüsselableitungsfunktion ist frei wählbar, der Krypto-Algorithmus aber fest einprogrammiert.
- `Version` ist eigentlich numerisch, wird aber als String gespeichert (eine strukturierte Versionierung per String wäre zwar denkbar, sprengt aber den Rahmen für ein Konfigurationsdateiformat, das sich selten ändert).
- `KDF` und `cipher` sind konzeptionell verwandte Konzepte, werden aber unterschiedlich organisiert.
- Der `MAC` wird aus einem Datenstück berechnet, das von Leerräumen (Whitespace) unabhängig ist(!)

Durch Änderungen am Format ergibt sich die folgende Datei. Ihre Funktionalität entspricht dem Beispiel auf der zuvor verlinkten Seite:

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

## Änderungen gegenüber Version 2 {#alterations-from-v2}

Version 2 war eine frühe, fehlerbehaftete Implementierung in C++. An den Grundlagen ändert sich nichts.
