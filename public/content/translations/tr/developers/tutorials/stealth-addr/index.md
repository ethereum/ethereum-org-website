---
title: "Gizli Adresleri Kullanma"
description: "Gizli adresler, kullanıcıların varlıkları anonim olarak aktarmasına olanak tanır. Bu makaleyi okuduktan sonra şunları yapabileceksiniz: Gizli adreslerin ne olduğunu ve nasıl çalıştığını açıklayabilecek, anonimliği koruyacak şekilde gizli adreslerin nasıl kullanılacağını anlayabilecek ve gizli adresleri kullanan web tabanlı bir uygulama yazabileceksiniz."
author: Ori Pomerantz
tags:
  [
    "Gizli adres",
    "gizlilik",
    "kriptografi",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: tr
sidebarDepth: 3
---

Siz Bill'siniz. Ayrıntısına girmeyeceğimiz nedenlerden ötürü, "Alice Dünya Kraliçesi Olsun" kampanyasına bağış yapmak ve kazanırsa sizi ödüllendirmesi için Alice'in bağış yaptığınızı bilmesini istiyorsunuz. Ne yazık ki zaferi garanti değil. Rakip bir kampanya var: "Carol Güneş Sistemi İmparatoriçesi Olsun". Eğer Carol kazanırsa ve Alice'e bağış yaptığınızı öğrenirse başınız belaya girer. Bu yüzden hesabınızdan Alice'in hesabına öylece 200 ETH transfer edemezsiniz.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) bunun için bir çözüm sunar. Bu ERC, anonim transfer için [gizli adreslerin](https://nerolation.github.io/stealth-utils) nasıl kullanılacağını açıklar.

**Uyarı**: Bildiğimiz kadarıyla gizli adreslerin arkasındaki kriptografi sağlamdır. Ancak, potansiyel yan kanal saldırıları mevcuttur. [Aşağıda](#go-wrong), bu riski azaltmak için neler yapabileceğinizi göreceksiniz.

## Gizli adresler nasıl çalışır {#how}

Bu makale, gizli adresleri iki şekilde açıklamaya çalışacaktır. İlki, [onların nasıl kullanılacağıdır](#how-use). Bu bölüm, makalenin geri kalanını anlamak için yeterlidir. Ardından, [arkasındaki matematiğin bir açıklaması](#how-math) bulunmaktadır. Kriptografi ile ilgileniyorsanız bu bölümü de okuyun.

### Basit versiyon (gizli adresler nasıl kullanılır) {#how-use}

Alice iki özel anahtar oluşturur ve bunlara karşılık gelen açık anahtarları yayımlar (bunlar tek bir çift uzunluklu meta adreste birleştirilebilir). Bill de bir özel anahtar oluşturur ve buna karşılık gelen açık anahtarı yayımlar.

Bir tarafın açık anahtarını ve diğerinin özel anahtarını kullanarak, yalnızca Alice ve Bill tarafından bilinen ortak bir sır türetebilirsiniz (yalnızca açık anahtarlardan türetilemez). Bu ortak sırrı kullanarak Bill gizli adresi elde eder ve ona varlık gönderebilir.

Alice de adresi ortak sırdan alır, ancak yayımladığı açık anahtarların özel anahtarlarını bildiği için, o adresten para çekmesine izin veren özel anahtarı da alabilir.

### Matematik (gizli adresler neden böyle çalışır) {#how-math}

Standart gizli adresler, daha az anahtar bitiyle daha iyi performans elde etmek ve aynı zamanda aynı güvenlik seviyesini korumak için [eliptik eğri kriptografisi (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) kullanır. Ancak çoğunlukla bunu göz ardı edebilir ve normal aritmetik kullanıyormuş gibi davranabiliriz.

Herkesin bildiği bir sayı vardır, _G_. _G_ ile çarpabilirsiniz. Ancak ECC'nin doğası gereği _G_'ye bölmek pratik olarak imkansızdır. Ethereum'da açık anahtar kriptografisinin genel çalışma şekli, daha sonra _P<sub>pub</sub> = GP<sub>priv</sub>_ açık anahtarıyla doğrulanan işlemleri imzalamak için _P<sub>priv</sub>_ özel anahtarını kullanabilmenizdir.

Alice, _K<sub>priv</sub>_ ve _V<sub>priv</sub>_ olmak üzere iki özel anahtar oluşturur. _K<sub>priv</sub>_ gizli adresten para harcamak için ve _V<sub>priv</sub>_ Alice'e ait adresleri görüntülemek için kullanılacaktır. Alice daha sonra açık anahtarları yayımlar: _K<sub>pub</sub> = GK<sub>priv</sub>_ ve _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill, üçüncü bir özel anahtar olan _R<sub>priv</sub>_'i oluşturur ve _R<sub>pub</sub> = GR<sub>priv</sub>_'i merkezi bir kayıt defterine yayımlar (Bill bunu Alice'e de gönderebilirdi, ancak Carol'ın dinlediğini varsayıyoruz).

Bill, Alice'in de bilmesini beklediği _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ değerini hesaplar (aşağıda açıklanmıştır). Bu değere ortak sır olan _S_ denir. Bu, Bill'e bir açık anahtar verir: _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_. Bu açık anahtardan bir adres hesaplayabilir ve istediği kaynakları bu adrese gönderebilir. Gelecekte Alice kazanırsa, Bill kaynakların kendisinden geldiğini kanıtlamak için ona _R<sub>priv</sub>_'i söyleyebilir.

Alice _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ değerini hesaplar. Bu ona aynı ortak sırrı, yani _S_'i verir. Özel anahtar olan _K<sub>priv</sub>_'i bildiği için, _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_ değerini hesaplayabilir. Bu anahtar, _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_ sonucundan kaynaklanan adresteki varlıklara erişmesini sağlar.

Alice'in Dave'in Dünya Hakimiyeti Kampanya Hizmetleri'ne taşeronluk yapmasına izin vermek için ayrı bir görüntüleme anahtarımız var. Alice, Dave'in açık adresleri bilmesine ve daha fazla para olduğunda onu bilgilendirmesine izin vermek istiyor, ancak onun kampanya parasını harcamasını istemiyor.

Görüntüleme ve harcama ayrı anahtarlar kullandığından, Alice Dave'e _V<sub>priv</sub>_'i verebilir. Daha sonra Dave, _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ hesaplayabilir ve bu şekilde açık anahtarları (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_) alabilir. Ancak _K<sub>priv</sub>_ olmadan Dave özel anahtarı alamaz.

Özetlemek gerekirse, bunlar farklı katılımcılar tarafından bilinen değerlerdir.

| Alice                                                                     | Yayımlandı        | Bill                                                                      | Dave                                                                        |                                               |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                               |
| _K<sub>priv</sub>_                                                        | —                 | —                                                                         | —                                                                           |                                               |
| _V<sub>priv</sub>_                                                        | —                 | —                                                                         | _V<sub>priv</sub>_                                                          |                                               |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                               |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                               |
| —                                                                         | —                 | _R<sub>priv</sub>_                                                        | —                                                                           |                                               |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                               |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | —                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                               |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | —                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                               |
| _Adres=f(P<sub>pub</sub>)_                             | —                 | _Adres=f(P<sub>pub</sub>)_                             | _Adres=f(P<sub>pub</sub>)_                               | _Adres=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | —                 | —                                                                         | —                                                                           |                                               |

## Gizli adresler ters gittiğinde {#go-wrong}

_Blokzincirde sır yoktur_. Gizli adresler size gizlilik sağlayabilirken, bu gizlilik trafik analizine karşı savunmasızdır. Basit bir örnek vermek gerekirse, Bill'in bir adresi fonladığını ve hemen bir _R<sub>pub</sub>_ değeri yayımlamak için bir işlem gönderdiğini hayal edin. Alice'in _V<sub>priv</sub>_'i olmadan bunun bir gizli adres olduğundan emin olamayız, ancak bahis bu yönde olur. Sonra, o adresten tüm ETH'yi Alice'in kampanya fonu adresine aktaran başka bir işlem görüyoruz. Bunu kanıtlayamayabiliriz, ancak Bill'in Alice'in kampanyasına bağış yapmış olması muhtemeldir. Carol kesinlikle böyle düşünürdü.

_R<sub>pub</sub>_'un yayımlanmasını gizli adresin fonlanmasından ayırmak Bill için kolaydır (bunları farklı zamanlarda, farklı adreslerden yapın). Ancak, bu yetersizdir. Carol'un aradığı model, Bill'in bir adresi fonlaması ve ardından Alice'in kampanya fonunun bu adresten çekim yapmasıdır.

Çözümlerden biri, Alice'in kampanyasının parayı doğrudan çekmemesi, bunun yerine üçüncü bir tarafa ödeme yapmak için kullanmasıdır. Alice'in kampanyası Dave'in Dünya Hakimiyeti Kampanya Hizmetleri'ne 10 ETH gönderirse Carol, Bill'in Dave'in müşterilerinden birine bağış yaptığını bilir. Eğer Dave'in yeterince müşterisi varsa Carol, Bill'in kendisiyle rekabet eden Alice'e mi yoksa Carol'un umursamadığı Adam'a, Albert'a veya Abigail'e mi bağış yaptığını bilemez. Alice ödemeye bir karma değeri ekleyebilir ve ardından bunun kendi bağışı olduğunu kanıtlamak için Dave'e ön görüntüyü sağlayabilir. Alternatif olarak, yukarıda belirtildiği gibi, Alice Dave'e _V<sub>priv</sub>_'ini verirse, ödemenin kimden geldiğini zaten bilir.

Bu çözümdeki ana sorun, gizliliğin Bill'in yararına olduğu durumlarda Alice'in bu gizliliğe önem vermesini gerektirmesidir. Alice, Bill'in arkadaşı Bob'un da kendisine bağış yapması için itibarını korumak isteyebilir. Ancak Bill'i ifşa etmekten çekinmemesi de mümkündür, çünkü o zaman Carol'un kazanması durumunda ne olacağından korkacaktır. Bill, Alice'e daha da fazla destek sağlayabilir.

### Birden çok gizli katman kullanma {#multi-layer}

Bill'in gizliliğini korumak için Alice'e güvenmek yerine, Bill bunu kendisi yapabilir. Kurgusal kişiler olan Bob ve Bella için birden fazla meta adres oluşturabilir. Bill daha sonra Bob'a ETH gönderir ve "Bob" (aslında Bill'dir) bunu Bella'ya gönderir. "Bella" (yine Bill'dir) bunu Alice'e gönderir.

Carol yine de trafik analizi yapabilir ve Bill'den Bob'a, Bob'dan Bella'ya, Bella'dan Alice'e giden hattı görebilir. Ancak, "Bob" ve "Bella" ETH'yi başka amaçlar için de kullanırsa, Alice gizli adresten bilinen kampanya adresine hemen para çekse bile, Bill'in Alice'e herhangi bir şey aktardığı görülmeyecektir.

## Gizli adres uygulaması yazma {#write-app}

Bu makale, [GitHub'da bulunan](https://github.com/qbzzt/251022-stealth-addresses.git) bir gizli adres uygulamasını açıklamaktadır.

### Araçlar {#tools}

Kullanabileceğimiz [bir typescript gizli adres kütüphanesi](https://github.com/ScopeLift/stealth-address-sdk) var. Ancak, kriptografik işlemler CPU'yu yoğun bir şekilde kullanabilir. Bunları [Rust](https://rust-lang.org/) gibi derlenmiş bir dilde uygulamayı ve kodu tarayıcıda çalıştırmak için [WASM](https://webassembly.org/) kullanmayı tercih ediyorum.

[Vite](https://vite.dev/) ve [React](https://react.dev/) kullanacağız. Bunlar endüstri standardı araçlardır; onlara aşina değilseniz [bu öğreticiyi](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) kullanabilirsiniz. Vite'ı kullanmak için Node'a ihtiyacımız var.

### Gizli adresleri çalışırken görün {#in-action}

1. Gerekli araçları yükleyin: [Rust](https://rust-lang.org/tools/install/) ve [Node](https://nodejs.org/en/download).

2. GitHub deposunu klonlayın.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Ön koşulları yükleyin ve Rust kodunu derleyin.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Web sunucusunu başlatın.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. [Uygulamaya](http://localhost:5173/) göz atın. Bu uygulama sayfasında iki çerçeve bulunur: biri Alice'in kullanıcı arayüzü, diğeri ise Bill'in kullanıcı arayüzü içindir. İki çerçeve iletişim kurmaz; yalnızca kolaylık sağlamak için aynı sayfadadırlar.

6. Alice olarak, **Gizli Bir Meta Adres Oluştur**'a tıklayın. Bu, yeni gizli adresi ve karşılık gelen özel anahtarları gösterecektir. Gizli meta adresi panoya kopyalayın.

7. Bill olarak, yeni gizli meta adresi yapıştırın ve **Bir adres oluştur**'a tıklayın. Bu size Alice için fonlanacak adresi verir.

8. Adresi ve Bill'in açık anahtarını kopyalayın ve bunları Alice'in kullanıcı arayüzündeki "Bill tarafından oluşturulan adres için özel anahtar" alanına yapıştırın. Bu alanlar doldurulduktan sonra, o adresteki varlıklara erişmek için özel anahtarı göreceksiniz.

9. Özel anahtarın adrese karşılık geldiğinden emin olmak için [çevrimiçi bir hesap makinesi](https://iancoleman.net/ethereum-private-key-to-address/) kullanabilirsiniz.

### Program nasıl çalışır {#how-the-program-works}

#### WASM bileşeni {#wasm}

WASM'ye derlenen kaynak kodu [Rust](https://rust-lang.org/) dilinde yazılmıştır. Bunu [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) içinde görebilirsiniz. Bu kod öncelikli olarak JavaScript kodu ile [`eth-stealth-addresses` kütüphanesi](https://github.com/kassandraoftroy/eth-stealth-addresses) arasında bir arayüzdür.

**`Cargo.toml`**

Rust'taki [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html), JavaScript'teki [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) ile benzerdir. Paket bilgilerini, bağımlılık bildirimlerini vb. içerir.

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) paketi rastgele değerler üretmek için gereklidir. Bu, tamamen algoritmik yollarla yapılamaz; bir entropi kaynağı olarak fiziksel bir sürece erişim gerektirir. Bu tanım, bu entropiyi içinde çalıştığımız tarayıcıya sorarak alacağımızı belirtir.

```toml
console_error_panic_hook = "0.1.7"
```

[Bu kütüphane](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/), WASM kodu paniklediğinde ve devam edemediğinde bize daha anlamlı hata mesajları verir.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

WASM kodu üretmek için gereken çıktı türü.

**`lib.rs`**

Bu, gerçek Rust kodudur.

```rust
use wasm_bindgen::prelude::*;
```

Rust'tan bir WASM paketi oluşturmak için kullanılan tanımlar. [Burada](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html) belgelenmiştir.

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

[`eth-stealth-addresses` kütüphanesinden](https://github.com/kassandraoftroy/eth-stealth-addresses) ihtiyaç duyduğumuz fonksiyonlar.

```rust
use hex::{decode,encode};
```

Rust, değerler için genellikle bayt [dizileri](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <boyut>]`) kullanır. Ancak JavaScript'te genellikle onaltılık dizeler kullanırız. [`hex` kütüphanesi](https://docs.rs/hex/latest/hex/) bizim için bir gösterimden diğerine çeviri yapar.

```rust
#[wasm_bindgen]
```

Bu işlevi JavaScript'ten çağırabilmek için WASM bağlamaları oluşturun.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Birden çok alanı olan bir nesneyi döndürmenin en kolay yolu bir JSON dizesi döndürmektir.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) üç alan döndürür:

- Meta adres (_K<sub>pub</sub>_ ve _V<sub>pub</sub>_)
- Görüntüleme özel anahtarı (_V<sub>priv</sub>_)
- Harcama özel anahtarı (_K<sub>priv</sub>_)

[Demet](https://doc.rust-lang.org/std/primitive.tuple.html) sözdizimi, bu değerleri tekrar ayırmamızı sağlar.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

JSON kodlu dizeyi oluşturmak için [`format!`](https://doc.rust-lang.org/std/fmt/index.html) makrosunu kullanın. Dizileri onaltılık dizelere dönüştürmek için [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) kullanın.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Bu fonksiyon, bir onaltılık dizeyi (JavaScript tarafından sağlanan) bir bayt dizisine dönüştürür. Bunu, JavaScript kodu tarafından sağlanan değerleri ayrıştırmak için kullanırız. Bu işlev, Rust'ın dizileri ve vektörleri nasıl işlediği nedeniyle karmaşıktır.

`<const N: usize>` ifadesine [jenerik](https://doc.rust-lang.org/book/ch10-01-syntax.html) denir. `N`, döndürülen dizinin uzunluğunu kontrol eden bir parametredir. Fonksiyon aslında `str_to_array::<n>` olarak adlandırılır, burada `n` dizi uzunluğudur.

Dönüş değeri `Option<[u8; N]>`'dir, bu da döndürülen dizinin [isteğe bağlı](https://doc.rust-lang.org/std/option/) olduğu anlamına gelir. Bu, Rust'ta başarısız olabilecek fonksiyonlar için tipik bir kalıptır.

Örneğin, `str_to_array::10("bad060a7")` çağırırsak, fonksiyonun on değerli bir dizi döndürmesi gerekir, ancak girdi yalnızca dört bayttır. Fonksiyonun başarısız olması gerekir ve bunu `None` döndürerek yapar. `str_to_array::4("bad060a7")` için dönüş değeri `Some<[0xba, 0xd0, 0x60, 0xa7]>` olacaktır.

```rust
    // decode, Result<Vec<u8>, _> döndürür
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) fonksiyonu bir `Result<Vec<u8>, FromHexError>` döndürür. [`Result`](https://doc.rust-lang.org/std/result/) türü, başarılı bir sonuç (`Ok(değer)`) veya bir hata (`Err(hata)`) içerebilir.

`.ok()` yöntemi, `Result`'ı bir `Option`'a dönüştürür; değeri başarılıysa `Ok()` değeri, değilse `None`'dur. Son olarak, [soru işareti operatörü](https://doc.rust-lang.org/std/option/#the-question-mark-operator-), `Option` boşsa mevcut fonksiyonları durdurur ve bir `None` döndürür. Aksi takdirde, değeri açar ve onu döndürür (bu durumda, `vec`'e bir değer atamak için).

Bu, hataları işlemek için garip bir şekilde karmaşık bir yöntem gibi görünüyor, ancak `Result` ve `Option`, tüm hataların bir şekilde ele alınmasını sağlar.

```rust
    if vec.len() != N { return None; }
```

Bayt sayısı yanlışsa, bu bir başarısızlıktır ve `None` döndürürüz.

```rust
    // try_into, vec'i tüketir ve [u8; N] oluşturmaya çalışır
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust'ta iki dizi türü vardır. [Diziler](https://doc.rust-lang.org/std/primitive.array.html) sabit bir boyuta sahiptir. [Vektörler](https://doc.rust-lang.org/std/vec/index.html) büyüyebilir ve küçülebilir. `hex::decode` bir vektör döndürür, ancak `eth_stealth_addresses` kütüphanesi dizileri almak ister. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods), bir değeri başka bir türe, örneğin bir vektörü bir diziye dönüştürür.

```rust
    Some(array)
}
```

Rust, bir fonksiyonun sonunda bir değer döndürürken [`return`](https://doc.rust-lang.org/std/keyword.return.html) anahtar kelimesini kullanmanızı gerektirmez.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Bu fonksiyon, hem _V<sub>pub</sub>_ hem de _K<sub>pub</sub>_'ı içeren açık bir meta adres alır. Gizli adresi, yayımlanacak açık anahtarı (_R<sub>pub</sub>_) ve yayımlanan adreslerden hangilerinin Alice'e ait olabileceğinin tanımlanmasını hızlandıran tek baytlık bir tarama değerini döndürür.

Tarama değeri, ortak sırrın bir parçasıdır (_S = GR<sub>priv</sub>V<sub>priv</sub>_). Bu değer Alice için mevcuttur ve onu kontrol etmek, _f(K<sub>pub</sub>+G\*hash(S))_'nin yayımlanan adrese eşit olup olmadığını kontrol etmekten çok daha hızlıdır.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Kütüphanenin [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) fonksiyonunu kullanıyoruz.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

JSON kodlu çıktı dizesini hazırlayın.

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

Bu fonksiyon, adresten (_R<sub>priv</sub>_) çekim yapmak için özel anahtarı hesaplamak üzere kütüphanenin [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) fonksiyonunu kullanır. Bu hesaplama şu değerleri gerektirir:

- Adres (_Adres=f(P<sub>pub</sub>)_)
- Bill tarafından oluşturulan açık anahtar (_R<sub>pub</sub>_)
- Görünüm özel anahtarı (_V<sub>priv</sub>_)
- Harcama özel anahtarı (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html), fonksiyonun WASM kodu başlatıldığında yürütüldüğünü belirtir.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Bu kod, panik çıktısının JavaScript konsoluna gönderileceğini belirtir. Çalışırken görmek için, uygulamayı kullanın ve Bill'e geçersiz bir meta-adres verin (sadece bir onaltılık basamağı değiştirin). JavaScript konsolunda şu hatayı göreceksiniz:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Ardından bir yığın izlemesi gelir. Ardından Bill'e geçerli meta adresi verin ve Alice'e ya geçersiz bir adres ya da geçersiz bir açık anahtar verin. Şu hatayı göreceksiniz:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Yine, ardından bir yığın izlemesi gelir.

#### Kullanıcı arayüzü {#ui}

Kullanıcı arayüzü [React](https://react.dev/) kullanılarak yazılmıştır ve [Vite](https://vite.dev/) tarafından sunulmaktadır. Onlar hakkında [bu öğreticiyi](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) kullanarak bilgi edinebilirsiniz. Burada [WAGMI](https://wagmi.sh/)'ye gerek yoktur çünkü doğrudan bir blokzincir veya cüzdan ile etkileşimde bulunmuyoruz.

Kullanıcı arayüzünün tek bariz olmayan kısmı WASM bağlantısıdır. İşte nasıl çalıştığı.

**`vite.config.js`**

Bu dosya [Vite yapılandırmasını](https://vite.dev/config/) içerir.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

İki Vite eklentisine ihtiyacımız var: [react](https://www.npmjs.com/package/@vitejs/plugin-react) ve [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Bu dosya uygulamanın ana bileşenidir. İki bileşen içeren bir kapsayıcıdır: `Alice` ve `Bill`, bu kullanıcılar için kullanıcı arayüzleridir. WASM için ilgili kısım başlatma kodudur.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

[`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) kullandığımızda, burada kullandığımız iki dosya oluşturur: gerçek kodu içeren bir wasm dosyası (burada, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) ve onu kullanmak için tanımları içeren bir JavaScript dosyası (burada, `src/rust-wasm/pkg/rust_wasm.js`). Bu JavaScript dosyasının varsayılan dışa aktarımı, WASM'ı başlatmak için çalışması gereken koddur.

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Wasm yüklenirken hata:', err)
        alert("Wasm hatası: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[`useEffect` kancası](https://react.dev/reference/react/useEffect), durum değişkenleri değiştiğinde yürütülen bir işlevi belirtmenize olanak tanır. Burada, durum değişkenleri listesi boştur (`[]`), bu nedenle bu işlev sayfa yüklendiğinde yalnızca bir kez yürütülür.

Etki fonksiyonu hemen geri dönmelidir. WASM `init` gibi eşzamansız kodu kullanmak için (`.wasm` dosyasını yüklemesi gerektiği ve dolayısıyla zaman aldığı için) dahili bir [`async`](https://en.wikipedia.org/wiki/Async/await) fonksiyonu tanımlar ve onu bir `await` olmadan çalıştırırız.

**`Bill.jsx`**

Bu, Bill için kullanıcı arayüzüdür. Alice tarafından sağlanan gizli meta adrese dayalı olarak bir adres oluşturma eylemi olmak üzere tek bir eylemi vardır.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Varsayılan dışa aktarmaya ek olarak, `wasm-pack` tarafından oluşturulan JavaScript kodu, WASM kodundaki her bir işlev için bir işlevi dışa aktarır.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

WASM işlevlerini çağırmak için, `wasm-pack` tarafından oluşturulan JavaScript dosyası tarafından dışa aktarılan işlevi çağırmamız yeterlidir.

**`Alice.jsx`**

`Alice.jsx`'teki kod benzerdir, ancak Alice'in iki eylemi vardır:

- Bir meta adres oluşturun
- Bill tarafından yayımlanan bir adres için özel anahtarı alın

## Sonuç {#conclusion}

Gizli adresler her derde deva değildir; [doğru kullanılmaları](#go-wrong) gerekir. Ancak doğru kullanıldığında, halka açık bir blokzincirde gizliliği sağlayabilirler.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).