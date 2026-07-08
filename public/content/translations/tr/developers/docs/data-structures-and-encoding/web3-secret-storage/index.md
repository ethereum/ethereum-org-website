---
title: "Web3 gizli depolama tanımı"
description: "Web3 gizli depolaması için resmi tanım"
lang: tr
sidebarDepth: 2
---

Uygulamanızın Ethereum üzerinde çalışmasını sağlamak için, Web3.js kütüphanesi tarafından sağlanan Web3 nesnesini kullanabilirsiniz. Arka planda, RPC çağrıları aracılığıyla yerel bir düğüm ile iletişim kurar. [web3](https://github.com/ethereum/web3.js/), bir RPC katmanı sunan herhangi bir Ethereum düğümü ile çalışır.

`web3`, `eth` nesnesini içerir - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** sonuç
 *               [ 'web3', 3 ]   Web3 (v3) anahtar dosyası
 *  [ 'ethersale', undefined ]   Ethersale anahtar dosyası
 *                        null     geçersiz anahtar dosyası
 */
```

Bu belge, Web3 Gizli Depolama Tanımının **3. sürümünü** belgelendirmektedir.

## Tanım {#definition}

Dosyanın asıl kodlanması ve kodunun çözülmesi, kripto algoritmasının artık AES-128-CBC'ye sabitlenmemiş olması (artık asgari gereksinim AES-128-CTR'dir) dışında, sürüm 1'den bu yana büyük ölçüde değişmeden kalmıştır. Anlamların/algoritmaların çoğu, türetilmiş anahtarın soldan ikinci 16 baytının tam `ciphertext` ile birleştirilmesinin SHA3 (Keccak-256) hash'i olarak verilen `mac` haricinde sürüm 1'e benzerdir.

Gizli anahtar dosyaları doğrudan `~/.web3/keystore` (Unix benzeri sistemler için) ve `~/AppData/Web3/keystore` (Windows için) dizinlerinde depolanır. Herhangi bir şekilde adlandırılabilirler, ancak iyi bir kural `<uuid>.json` şeklindedir; burada `<uuid>`, gizli anahtara verilen 128 bitlik UUID'dir (gizli anahtarın adresi için gizliliği koruyan bir vekil).

Tüm bu dosyaların ilişkili bir parolası vardır. Belirli bir `.json` dosyasının gizli anahtarını türetmek için, önce dosyanın şifreleme anahtarını türetin; bu, dosyanın parolasını alıp `kdf` anahtarı tarafından açıklandığı gibi bir anahtar türetme fonksiyonundan geçirilmesiyle yapılır. KDF fonksiyonuna yönelik KDF'ye bağlı statik ve dinamik parametreler `kdfparams` anahtarında açıklanmıştır.

PBKDF2, asgari düzeyde uyumlu tüm uygulamalar tarafından desteklenmelidir ve şu şekilde belirtilir:

- `kdf`: `pbkdf2`

PBKDF2 için kdfparams şunları içerir:

- `prf`: `hmac-sha256` olmalıdır (gelecekte genişletilebilir);
- `c`: yineleme sayısı;
- `salt`: PBKDF'ye geçirilen salt (tuz);
- `dklen`: türetilen anahtarın uzunluğu. >= 32 olmalıdır.

Dosyanın anahtarı türetildikten sonra, MAC türetilmesi yoluyla doğrulanmalıdır. MAC, türetilen anahtarın soldan ikinci 16 baytının `ciphertext` anahtarının içeriğiyle birleştirilmesiyle oluşturulan bayt dizisinin SHA3 (Keccak-256) hash'i olarak hesaplanmalıdır, yani:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(burada `++` birleştirme operatörüdür)

Bu değer `mac` anahtarının içeriğiyle karşılaştırılmalıdır; eğer farklılarsa, alternatif bir parola istenmelidir (veya işlem iptal edilmelidir).

Dosyanın anahtarı doğrulandıktan sonra, şifreli metin (dosyadaki `ciphertext` anahtarı), `cipher` anahtarı tarafından belirtilen ve `cipherparams` anahtarı aracılığıyla parametrelendirilen simetrik şifreleme algoritması kullanılarak çözülebilir. Türetilen anahtar boyutu ile algoritmanın anahtar boyutu uyuşmuyorsa, türetilen anahtarın sıfır dolgulu, en sağdaki baytları algoritmanın anahtarı olarak kullanılmalıdır.

Asgari düzeyde uyumlu tüm uygulamalar, şu şekilde belirtilen AES-128-CTR algoritmasını desteklemelidir:

- `cipher: aes-128-ctr`

Bu şifre, cipherparams anahtarına anahtar olarak verilen aşağıdaki parametreleri alır:

- `iv`: Şifre için 128 bitlik başlatma vektörü.

Şifre için anahtar, türetilen anahtarın en soldaki 16 baytıdır, yani `DK[0..15]`

Bir gizli anahtarın oluşturulması/şifrelenmesi temel olarak bu talimatların tersi olmalıdır. `uuid`, `salt` ve `iv` değerlerinin gerçekten rastgele olduğundan emin olun.

Sürümün "kesin" bir tanımlayıcısı olarak işlev görmesi gereken `version` alanına ek olarak, uygulamalar formattaki daha küçük, bozucu olmayan değişiklikleri izlemek için `minorversion` alanını da kullanabilir.

## Test Vektörleri {#test-vectors}

Ayrıntılar:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#pbkdf2-sha-256}

`AES-128-CTR` ve `PBKDF2-SHA-256` kullanan test vektörü:

`~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json` dosya içerikleri:

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

**Ara Değerler**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

AES-128-CTR ve Scrypt kullanan test vektörü:

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

**Ara Değerler**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## Sürüm 1'den Değişiklikler {#alterations-from-v2}

Bu sürüm, [burada](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst) yayınlanan sürüm 1 ile ilgili çeşitli tutarsızlıkları düzeltir. Kısaca bunlar şunlardır:

- Büyük/küçük harf kullanımı haksız ve tutarsızdır (scrypt küçük harf, Kdf karışık harf, MAC büyük harf).
- Adres gereksizdir ve gizliliği tehlikeye atar.
- `Salt` özünde anahtar türetme fonksiyonunun bir parametresidir ve genel olarak kripto ile değil, onunla ilişkilendirilmeyi hak eder.
- _SaltLen_ gereksizdir (sadece Salt'tan türetin).
- Anahtar türetme fonksiyonu verilmiştir, ancak kripto algoritması kesin olarak belirtilmiştir.
- `Version` özünde sayısaldır ancak bir dizedir (bir dize ile yapılandırılmış sürümleme mümkün olabilir, ancak nadiren değişen bir yapılandırma dosyası formatı için kapsam dışı kabul edilebilir).
- `KDF` ve `cipher` kavramsal olarak kardeş kavramlardır ancak farklı şekilde düzenlenmişlerdir.
- `MAC`, boşluktan bağımsız bir veri parçası aracılığıyla hesaplanır(!)

Daha önce bağlantısı verilen sayfadaki örneğe işlevsel olarak eşdeğer olan aşağıdaki dosyayı vermek için formatta değişiklikler yapılmıştır:

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

## Sürüm 2'den Değişiklikler {#alterations-from-v2-2}

Sürüm 2, bir dizi hata içeren erken bir C++ uygulamasıydı. Tüm temel unsurlar ondan değişmeden kalmıştır.