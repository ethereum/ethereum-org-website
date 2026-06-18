---
title: "Gizli Adresleri Kullanmak"
description: "Gizli adresler, kullanıcıların varlıkları anonim olarak transfer etmelerini sağlar. Bu makaleyi okuduktan sonra şunları yapabileceksiniz: Gizli adreslerin ne olduğunu ve nasıl çalıştığını açıklamak, gizli adresleri anonimliği koruyacak şekilde nasıl kullanacağınızı anlamak ve gizli adresleri kullanan web tabanlı bir uygulama yazmak."
author: Ori Pomerantz
tags: ["Gizli adres", "gizlilik", "kriptografi", "rust", "wasm"]
skill: intermediate
breadcrumb: Gizli adresler
published: 2025-11-30
lang: tr
sidebarDepth: 3
---

Siz Bill'siniz. Girmeyeceğimiz nedenlerden dolayı, "Dünya Kraliçesi Alice" kampanyasına bağış yapmak ve Alice'in bağış yaptığınızı bilmesini istiyorsunuz, böylece kazanırsa sizi ödüllendirebilir. Ne yazık ki, zaferi garanti değil. Rakip bir kampanya var: "Güneş Sistemi İmparatoriçesi Carol". Eğer Carol kazanırsa ve Alice'e bağış yaptığınızı öğrenirse, başınız belaya girer. Bu yüzden hesabınızdan Alice'in hesabına öylece 200 ETH transfer edemezsiniz.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) bu sorunun çözümüne sahip. Bu ERC, anonim transfer için [gizli adreslerin](https://nerolation.github.io/stealth-utils) nasıl kullanılacağını açıklar.

**Uyarı**: Gizli adreslerin arkasındaki kriptografi, bildiğimiz kadarıyla sağlamdır. Ancak, potansiyel yan kanal saldırıları (side-channel attacks) vardır. [Aşağıda](#go-wrong), bu riski azaltmak için neler yapabileceğinizi göreceksiniz.

## Gizli adresler nasıl çalışır {#how}

Bu makale gizli adresleri iki şekilde açıklamaya çalışacaktır. İlki [bunların nasıl kullanılacağıdır](#how-use). Bu kısım, makalenin geri kalanını anlamak için yeterlidir. Ardından, [arkasındaki matematiğin bir açıklaması](#how-math) yer almaktadır. Kriptografi ile ilgileniyorsanız, bu kısmı da okuyun. 

### Basit versiyon (gizli adresler nasıl kullanılır) {#how-use}

Alice iki özel anahtar oluşturur ve bunlara karşılık gelen açık anahtarları (tek bir çift uzunluklu meta-adres halinde birleştirilebilir) yayınlar. Bill de bir özel anahtar oluşturur ve buna karşılık gelen açık anahtarı yayınlar.

Bir tarafın açık anahtarını ve diğerinin özel anahtarını kullanarak, yalnızca Alice ve Bill tarafından bilinen paylaşılan bir sır (shared secret) türetebilirsiniz (yalnızca açık anahtarlardan türetilemez). Bu paylaşılan sırrı kullanarak Bill, gizli adresi elde eder ve ona varlık gönderebilir.

Alice de adresi paylaşılan sırdan alır, ancak yayınladığı açık anahtarların özel anahtarlarını bildiği için, o adresten para çekmesini sağlayan özel anahtarı da elde edebilir.

### Matematik (gizli adresler neden böyle çalışır) {#how-math}

Standart gizli adresler, aynı güvenlik seviyesini korurken daha az anahtar bitiyle daha iyi performans elde etmek için [eliptik eğri kriptografisi (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) kullanır. Ancak çoğunlukla bunu görmezden gelebilir ve normal aritmetik kullanıyormuşuz gibi davranabiliriz.

Herkesin bildiği bir sayı vardır, *G*. *G* ile çarpabilirsiniz. Ancak ECC'nin doğası gereği, *G*'ye bölmek pratik olarak imkansızdır. Ethereum'da açık anahtar kriptografisinin genel çalışma şekli şöyledir: İşlemleri imzalamak için bir özel anahtar, *P<sub>priv</sub>*, kullanabilirsiniz ve bu işlemler daha sonra bir açık anahtar, *P<sub>pub</sub> = GP<sub>priv</sub>*, tarafından doğrulanır. 

Alice iki özel anahtar oluşturur, *K<sub>priv</sub>* ve *V<sub>priv</sub>*. *K<sub>priv</sub>*, gizli adresten para harcamak için, *V<sub>priv</sub>* ise Alice'e ait adresleri görüntülemek için kullanılacaktır. Alice daha sonra açık anahtarları yayınlar: *K<sub>pub</sub> = GK<sub>priv</sub>* ve *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill üçüncü bir özel anahtar, *R<sub>priv</sub>*, oluşturur ve *R<sub>pub</sub> = GR<sub>priv</sub>* değerini merkezi bir kayıt defterinde yayınlar (Bill bunu Alice'e de gönderebilirdi, ancak Carol'ın dinlediğini varsayıyoruz).

Bill, Alice'in de bilmesini beklediği (aşağıda açıklanmıştır) *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* değerini hesaplar. Bu değere paylaşılan sır olan *S* denir. Bu, Bill'e bir açık anahtar verir, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. Bu açık anahtardan bir adres hesaplayabilir ve ona istediği kaynakları gönderebilir. Gelecekte, Alice kazanırsa, Bill kaynakların kendisinden geldiğini kanıtlamak için ona *R<sub>priv</sub>* değerini söyleyebilir.

Alice *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* değerini hesaplar. Bu ona aynı paylaşılan sırrı, *S*'yi verir. Özel anahtarı, *K<sub>priv</sub>*'i bildiği için *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* değerini hesaplayabilir. Bu anahtar, *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)* sonucunda ortaya çıkan adresteki varlıklara erişmesini sağlar.

Alice'in Dave'in Dünya Hakimiyeti Kampanya Hizmetleri'ne taşeronluk yapmasına izin vermek için ayrı bir görüntüleme anahtarımız var. Alice, Dave'in açık adresleri bilmesine ve daha fazla para olduğunda onu bilgilendirmesine izin vermeye isteklidir, ancak kampanya parasını harcamasını istemez.

Görüntüleme ve harcama ayrı anahtarlar kullandığından, Alice Dave'e *V<sub>priv</sub>* verebilir. Ardından Dave *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* hesaplayabilir ve bu şekilde açık anahtarları (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*) elde edebilir. Ancak *K<sub>priv</sub>* olmadan Dave özel anahtarı alamaz.

Özetlemek gerekirse, farklı katılımcılar tarafından bilinen değerler şunlardır.

| Alice | Yayınlanan | Bill | Dave |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| *K<sub>pub</sub> = GK<sub>priv</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| *V<sub>pub</sub> = GV<sub>priv</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | *R<sub>pub</sub> = GR<sub>priv</sub>* | *R<sub>pub</sub>* |
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | *S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* |
| *Adres=f(P<sub>pub</sub>)* | - | *Adres=f(P<sub>pub</sub>)* | *Adres=f(P<sub>pub</sub>)* | *Adres=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## Gizli adresler ters gittiğinde {#go-wrong}

*Blokzincir üzerinde sır yoktur*. Gizli adresler size gizlilik sağlayabilse de, bu gizlilik trafik analizine karşı hassastır. Basit bir örnek vermek gerekirse, Bill'in bir adresi fonladığını ve hemen ardından bir *R<sub>pub</sub>* değeri yayınlamak için bir işlem gönderdiğini hayal edin. Alice'in *V<sub>priv</sub>* değeri olmadan, bunun gizli bir adres olduğundan emin olamayız, ancak büyük ihtimalle öyledir. Ardından, o adresteki tüm ETH'yi Alice'in kampanya fonu adresine transfer eden başka bir işlem görürüz. Bunu kanıtlayamayabiliriz, ancak Bill'in Alice'in kampanyasına bağış yapmış olması muhtemeldir. Carol kesinlikle böyle düşünecektir.

Bill'in *R<sub>pub</sub>* yayınını gizli adresi fonlamaktan ayırması kolaydır (bunları farklı zamanlarda, farklı adreslerden yapabilir). Ancak bu yetersizdir. Carol'ın aradığı model, Bill'in bir adresi fonlaması ve ardından Alice'in kampanya fonunun bu adresten para çekmesidir. 

Bir çözüm, Alice'in kampanyasının parayı doğrudan çekmemesi, bunun yerine üçüncü bir tarafa ödeme yapmak için kullanmasıdır. Alice'in kampanyası Dave'in Dünya Hakimiyeti Kampanya Hizmetleri'ne 10 ETH gönderirse, Carol yalnızca Bill'in Dave'in müşterilerinden birine bağış yaptığını bilir. Dave'in yeterince müşterisi varsa, Carol Bill'in kendisiyle rekabet eden Alice'e mi yoksa Carol'ın umursamadığı Adam, Albert veya Abigail'e mi bağış yaptığını bilemez. Alice, ödemeyle birlikte hash'lenmiş bir değer ekleyebilir ve ardından bunun kendi bağışı olduğunu kanıtlamak için Dave'e ön görüntüyü (preimage) sağlayabilir. Alternatif olarak, yukarıda belirtildiği gibi, Alice Dave'e *V<sub>priv</sub>* değerini verirse, ödemenin kimden geldiğini zaten bilir.

Bu çözümle ilgili temel sorun, bu gizlilik Bill'e fayda sağladığında Alice'in gizliliği önemsemesini gerektirmesidir. Alice itibarını korumak isteyebilir, böylece Bill'in arkadaşı Bob da ona bağış yapacaktır. Ancak Bill'i ifşa etmeyi umursamaması da mümkündür, çünkü o zaman Carol kazanırsa ne olacağından korkacaktır. Bill sonuçta Alice'e daha da fazla destek sağlayabilir.

### Birden fazla gizli katman kullanmak {#multi-layer}

Bill'in gizliliğini korumak için Alice'e güvenmek yerine, Bill bunu kendisi yapabilir. Kurgusal kişiler olan Bob ve Bella için birden fazla meta-adres oluşturabilir. Bill daha sonra Bob'a ETH gönderir ve "Bob" (aslında Bill'dir) bunu Bella'ya gönderir. "Bella" (yine Bill) bunu Alice'e gönderir.

Carol hala trafik analizi yapabilir ve Bill'den Bob'a, Bella'ya ve Alice'e giden boru hattını görebilir. Ancak, "Bob" ve "Bella" ETH'yi başka amaçlar için de kullanıyorsa, Alice gizli adresten bilinen kampanya adresine hemen para çekse bile, Bill'in Alice'e herhangi bir şey transfer ettiği anlaşılmayacaktır.

## Gizli adres uygulaması yazmak {#write-app}

Bu makale, [GitHub'da bulunan](https://github.com/qbzzt/251022-stealth-addresses.git) bir gizli adres uygulamasını açıklamaktadır. 

### Araçlar {#tools}

Kullanabileceğimiz [bir TypeScript gizli adres kütüphanesi](https://github.com/ScopeLift/stealth-address-sdk) var. Ancak, kriptografik işlemler CPU yoğun olabilir. Bunları [Rust](https://rust-lang.org/) gibi derlenmiş bir dilde uygulamayı ve kodu tarayıcıda çalıştırmak için [WASM](https://webassembly.org/) kullanmayı tercih ediyorum.

[Vite](https://vite.dev/) ve [React](https://react.dev/) kullanacağız. Bunlar endüstri standardı araçlardır; onlara aşina değilseniz, [bu öğreticiyi](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) kullanabilirsiniz. Vite'ı kullanmak için Node'a ihtiyacımız var.

### Gizli adresleri iş başında görün {#in-action}

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

5. [Uygulamaya](http://localhost:5173/) göz atın. Bu uygulama sayfasının iki çerçevesi vardır: biri Alice'in kullanıcı arayüzü, diğeri ise Bill'inki için. İki çerçeve iletişim kurmaz; sadece kolaylık sağlamak için aynı sayfadadırlar.

6. Alice olarak, **Generate a Stealth Meta-Address** (Gizli Meta-Adres Oluştur) seçeneğine tıklayın. Bu, yeni gizli adresi ve karşılık gelen özel anahtarları görüntüleyecektir. Gizli meta-adresi panoya kopyalayın.

7. Bill olarak, yeni gizli meta-adresi yapıştırın ve **Generate an address** (Bir adres oluştur) seçeneğine tıklayın. Bu size Alice için fonlanacak adresi verir. 

8. Adresi ve Bill'in açık anahtarını kopyalayın ve Alice'in kullanıcı arayüzündeki "Private key for address generated by Bill" (Bill tarafından oluşturulan adres için özel anahtar) alanına yapıştırın. Bu alanlar doldurulduğunda, o adresteki varlıklara erişmek için özel anahtarı göreceksiniz.

9. Özel anahtarın adrese karşılık geldiğinden emin olmak için [çevrimiçi bir hesap makinesi](https://iancoleman.net/ethereum-private-key-to-address/) kullanabilirsiniz.

### Program nasıl çalışır {#how-the-program-works}

#### WASM bileşeni {#wasm}

WASM'a derlenen kaynak kodu [Rust](https://rust-lang.org/) ile yazılmıştır. Bunu [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs) içinde görebilirsiniz. Bu kod, öncelikle JavaScript kodu ile [`eth-stealth-addresses` kütüphanesi](https://github.com/kassandraoftroy/eth-stealth-addresses) arasında bir arayüzdür.

**`Cargo.toml`**

Rust'taki [`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html), JavaScript'teki [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) dosyasına benzer. Paket bilgilerini, bağımlılık bildirimlerini vb. içerir.

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

[`getrandom`](https://docs.rs/getrandom/latest/getrandom/) paketinin rastgele değerler üretmesi gerekir. Bu, tamamen algoritmik yollarla yapılamaz; bir entropi kaynağı olarak fiziksel bir sürece erişim gerektirir. Bu tanım, bu entropiyi içinde çalıştığımız tarayıcıya sorarak alacağımızı belirtir.

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

Bu, asıl Rust kodudur.

```rust
use wasm_bindgen::prelude::*;
```

Rust'tan bir WASM paketi oluşturmak için tanımlar. Bunlar [burada](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html) belgelenmiştir.

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

[`eth-stealth-addresses` kütüphanesinden](https://github.com/kassandraoftroy/eth-stealth-addresses) ihtiyaç duyduğumuz işlevler.

```rust
use hex::{decode,encode};
```

Rust, değerler için tipik olarak bayt [dizileri (arrays)](https://doc.rust-lang.org/std/primitive.array.html) (`[u8; <size>]`) kullanır. Ancak JavaScript'te tipik olarak onaltılık (hexadecimal) dizeler kullanırız. [`hex` kütüphanesi](https://docs.rs/hex/latest/hex/) bizim için bir gösterimden diğerine çeviri yapar.

```rust
#[wasm_bindgen]
```

Bu işlevi JavaScript'ten çağırabilmek için WASM bağlamaları (bindings) oluşturun.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Birden fazla alana sahip bir nesneyi döndürmenin en kolay yolu bir JSON dizesi döndürmektir. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) üç alan döndürür:

- Meta-adres (*K<sub>pub</sub>* ve *V<sub>pub</sub>*)
- Görüntüleme özel anahtarı (*V<sub>priv</sub>*)
- Harcama özel anahtarı (*K<sub>priv</sub>*)

[Demet (tuple)](https://doc.rust-lang.org/std/primitive.tuple.html) sözdizimi bu değerleri tekrar ayırmamızı sağlar.

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

Bu işlev, (JavaScript tarafından sağlanan) onaltılık bir dizeyi bir bayt dizisine dönüştürür. JavaScript kodu tarafından sağlanan değerleri ayrıştırmak için kullanırız. Bu işlev, Rust'ın dizileri ve vektörleri nasıl işlediğinden dolayı karmaşıktır.

`<const N: usize>` ifadesine [jenerik (generic)](https://doc.rust-lang.org/book/ch10-01-syntax.html) denir. `N`, döndürülen dizinin uzunluğunu kontrol eden bir parametredir. İşlev aslında `str_to_array::<n>` olarak adlandırılır, burada `n` dizi uzunluğudur.

Dönüş değeri `Option<[u8; N]>` şeklindedir, bu da döndürülen dizinin [isteğe bağlı (optional)](https://doc.rust-lang.org/std/option/) olduğu anlamına gelir. Bu, başarısız olabilecek işlevler için Rust'ta tipik bir modeldir.

Örneğin, `str_to_array::10("bad060a7")` çağırırsak, işlevin on değerlik bir dizi döndürmesi gerekir, ancak girdi yalnızca dört bayttır. İşlevin başarısız olması gerekir ve bunu `None` döndürerek yapar. `str_to_array::4("bad060a7")` için dönüş değeri `Some<[0xba, 0xd0, 0x60, 0xa7]>` olacaktır.

```rust
    // decode, Result<Vec<u8>, _> döndürür
    let vec = decode(s).ok()?;
```

[`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) işlevi bir `Result<Vec<u8>, FromHexError>` döndürür. [`Result`](https://doc.rust-lang.org/std/result/) türü, başarılı bir sonuç (`Ok(value)`) veya bir hata (`Err(error)`) içerebilir.

`.ok()` yöntemi, `Result` değerini bir `Option` değerine dönüştürür; bunun değeri başarılıysa `Ok()` değeri, değilse `None` olur. Son olarak, [soru işareti operatörü](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) mevcut işlevleri iptal eder ve `Option` boşsa bir `None` döndürür. Aksi takdirde, değeri açar (unwrap) ve onu döndürür (bu durumda, `vec` değişkenine bir değer atamak için).

Bu, hataları ele almak için garip bir şekilde karmaşık bir yöntem gibi görünüyor, ancak `Result` ve `Option` tüm hataların öyle ya da böyle ele alınmasını sağlar.

```rust
    if vec.len() != N { return None; }
```

Bayt sayısı yanlışsa, bu bir başarısızlıktır ve `None` döndürürüz.

```rust
    // try_into, vec'i tüketir ve [u8; N] oluşturmaya çalışır
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust'ın iki dizi türü vardır. [Diziler (Arrays)](https://doc.rust-lang.org/std/primitive.array.html) sabit bir boyuta sahiptir. [Vektörler (Vectors)](https://doc.rust-lang.org/std/vec/index.html) büyüyebilir ve küçülebilir. `hex::decode` bir vektör döndürür, ancak `eth_stealth_addresses` kütüphanesi diziler almak ister. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) bir değeri başka bir türe dönüştürür, örneğin bir vektörü bir diziye.

```rust
    Some(array)
}
```

Rust, bir işlevin sonunda bir değer döndürürken [`return`](https://doc.rust-lang.org/std/keyword.return.html) anahtar kelimesini kullanmanızı gerektirmez.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Bu işlev, hem *V<sub>pub</sub>* hem de *K<sub>pub</sub>* içeren bir açık meta-adres alır. Gizli adresi, yayınlanacak açık anahtarı (*R<sub>pub</sub>*) ve yayınlanan adreslerden hangilerinin Alice'e ait olabileceğinin belirlenmesini hızlandıran bir baytlık bir tarama değeri döndürür.

Tarama değeri, paylaşılan sırrın (*S = GR<sub>priv</sub>V<sub>priv</sub>*) bir parçasıdır. Bu değer Alice tarafından kullanılabilir ve bunu kontrol etmek, *f(K<sub>pub</sub>+G\*hash(S))* değerinin yayınlanan adrese eşit olup olmadığını kontrol etmekten çok daha hızlıdır.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Kütüphanenin [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) işlevini kullanıyoruz.

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

Bu işlev, adresten para çekmek için özel anahtarı (*R<sub>priv</sub>*) hesaplamak üzere kütüphanenin [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) işlevini kullanır. Bu hesaplama şu değerleri gerektirir:

- Adres (*Adres=f(P<sub>pub</sub>)*)
- Bill tarafından oluşturulan açık anahtar (*R<sub>pub</sub>*)
- Görüntüleme özel anahtarı (*V<sub>priv</sub>*)
- Harcama özel anahtarı (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html), işlevin WASM kodu başlatıldığında yürütüleceğini belirtir.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Bu kod, panik çıktısının JavaScript konsoluna gönderilmesini belirtir. Bunu iş başında görmek için uygulamayı kullanın ve Bill'e geçersiz bir meta-adres verin (sadece bir onaltılık basamağı değiştirin). JavaScript konsolunda şu hatayı göreceksiniz:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Ardından bir yığın izlemesi (stack trace) gelir. Sonra Bill'e geçerli meta-adresi verin ve Alice'e geçersiz bir adres veya geçersiz bir açık anahtar verin. Şu hatayı göreceksiniz:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Yine, ardından bir yığın izlemesi gelir.

#### Kullanıcı arayüzü {#ui}

Kullanıcı arayüzü [React](https://react.dev/) kullanılarak yazılmıştır ve [Vite](https://vite.dev/) tarafından sunulmaktadır. [Bu öğreticiyi](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) kullanarak onlar hakkında bilgi edinebilirsiniz. Burada [Wagmi](https://wagmi.sh/)'ye gerek yoktur çünkü doğrudan bir blokzincir veya cüzdan ile etkileşime girmiyoruz.

Kullanıcı arayüzünün tek belirgin olmayan kısmı WASM bağlantısıdır. İşte nasıl çalıştığı.

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

Bu dosya uygulamanın ana bileşenidir. İki bileşeni içeren bir kapsayıcıdır: `Alice` ve `Bill`, bu kullanıcılar için kullanıcı arayüzleri. WASM için ilgili kısım başlatma kodudur.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

[`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/) kullandığımızda, burada kullandığımız iki dosya oluşturur: asıl kodu içeren bir wasm dosyası (burada, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) ve onu kullanmak için tanımları içeren bir JavaScript dosyası (burada, `src/rust_wasm/pkg/rust_wasm.js`). Bu JavaScript dosyasının varsayılan dışa aktarımı (default export), WASM'ı başlatmak için çalışması gereken koddur.

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
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[`useEffect` kancası (hook)](https://react.dev/reference/react/useEffect), durum değişkenleri değiştiğinde yürütülen bir işlev belirlemenizi sağlar. Burada, durum değişkenleri listesi boştur (`[]`), bu nedenle bu işlev sayfa yüklendiğinde yalnızca bir kez yürütülür.

Etki (effect) işlevinin hemen dönmesi gerekir. WASM `init` gibi asenkron kodları kullanmak için (`.wasm` dosyasını yüklemesi gerektiğinden zaman alır), dahili bir [`async`](https://en.wikipedia.org/wiki/Async/await) işlevi tanımlarız ve onu bir `await` olmadan çalıştırırız.

**`Bill.jsx`**

Bu, Bill için kullanıcı arayüzüdür. Alice tarafından sağlanan gizli meta-adrese dayalı bir adres oluşturmak gibi tek bir eylemi vardır.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Varsayılan dışa aktarıma ek olarak, `wasm-pack` tarafından oluşturulan JavaScript kodu, WASM kodundaki her işlev için bir işlev dışa aktarır.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

WASM işlevlerini çağırmak için, sadece `wasm-pack` tarafından oluşturulan JavaScript dosyasının dışa aktardığı işlevi çağırırız.

**`Alice.jsx`**

`Alice.jsx` içindeki kod benzerdir, ancak Alice'in iki eylemi vardır:

- Bir meta-adres oluşturmak
- Bill tarafından yayınlanan bir adres için özel anahtarı almak

## Sonuç {#conclusion}

Gizli adresler her derde deva değildir; [doğru kullanılmaları](#go-wrong) gerekir. Ancak doğru kullanıldıklarında, halka açık bir blokzincir üzerinde gizlilik sağlayabilirler.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).