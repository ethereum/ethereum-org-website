---
title: Ethereum hesapları
description: "Ethereum hesaplarının bir açıklaması: Hesapların veri yapıları ve anahtar çifti kriptografisi ile ilişkileri."
lang: tr
---

Bir Ethereum hesabı, Ethereum üzerinde işlem gönderebilen bir ether (ETH) bakiyesi barındıran bir varlıktır. Hesaplar kullanıcılar tarafından kontrol edilebilir veya akıllı sözleşme olarak dağıtılabilirler.

## Ön koşullar {#prerequisites}

Hesaplar, yeni başlayanlara uygun bir konudur. Ancak bu sayfayı iyi anlamanız için size ilk olarak [Ethereum'a giriş](/developers/docs/intro-to-ethereum/) yazımızı okumanızı öneriyoruz.

## Hesap türleri {#types-of-account}

Ethereum'da iki tür hesap bulunur:

- Harici olarak sahiplenilmiş – özel anahtarları olan kişiler tarafından kontrol edilir
- Sözleşme – kod tarafından kontrol edilen, ağa dağıtılmış bir akıllı sözleşme. [Akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkında daha fazla bilgi

İki hesap türü de şunları yapabilir:

- ETH ve token alma, tutma ve gönderme
- Dağıtılmış akıllı sözleşmelerle etkileşime girme

### Önemli farkları {#key-differences}

**Harici olarak sahiplenilmiş**

- Hesap oluşturmak tamamen ücretsizdir
- İşlem başlatabilir
- Harici olarak sahiplenilmiş hesaplar arası işlemler sadece ETH/token transferleri olabilir

**Sözleşme**

- Ağ depolaması kullandığınız için sözleşme oluşturmanın bir ücreti vardır
- Yalnızca bir işlemin alınmasına yanıt olarak işlem gönderebilir
- Harici bir hesaptan bir sözleşme hesabına yapılan işlemler, token'ları aktarmak ve hatta yeni bir sözleşme oluşturmak gibi birçok farklı eylemi gerçekleştirebilen kodları tetikleyebilir

## Bir hesabın incelemesi {#an-account-examined}

Ethereum hesaplarının dört alanı vardır:

- `nonce` – hesaptan gönderilen işlem sayısını gösteren bir sayaç. Bu, işlemlerin yalnızca bir kez işlenmesini sağlar. Bir sözleşme hesabında bu sayı, hesap tarafından oluşturulan sözleşmelerin sayısını temsil eder.
- `balance` – Bu adrese ait wei sayısı. Wei, ETH'nin bir birimidir ve ETH başına 1e+18 wei bulunur.
- `codeHash` – Bu hash değeri, Ethereum sanal makinesi (EVM) üzerindeki bir hesabın _kodunu_ temsil eder. Sözleşme hesaplarına, farklı işlemler gerçekleştirebilen kod parçacıkları programlanmıştır. Hesap bir mesaj çağrısı aldıysa bu EVM kodu çalıştırılır. Diğer hesap alanlarının aksine değiştirilemez. Bu türdeki tüm kod parçaları, daha sonra geri alınmak üzere durum veri tabanında karşılık gelen hash'leri altında bulunur. Bu hash değeri codeHash olarak bilinir. Harici olarak sahiplenilmiş hesaplar için codeHash alanı, boş bir dizenin hash değeridir.
- `storageRoot` - Bazen depolama hash'i olarak da bilinir. Hesabın depolama içeriğini kodlayan bir Merkle Patricia ağaç kök düğümünün 256 bit hash değeri, (256 bit tamsayı değerleri arasında bir eşleme), 256-bit tam sayı anahtarlarının 256-bit Keccak hash değerinden RLP-kodlanmış 256-bit tamsayı değerlerine bir eşleme olarak ağaç içerisine kodlanmıştır. Bu ağaç, bu hesabın depolama içeriğinin hash değerini kodlar ve varsayılan olarak boştur.

![Bir hesabın oluşumunu gösteren diyagram](./accounts.png) _Diyagram [Ethereum EVM resmediciden](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) uyarlanmıştır_

## Harici olarak sahiplenilmiş hesaplar ve anahtar çiftleri {#externally-owned-accounts-and-key-pairs}

Bir hesap, bir kriptografik anahtar çiftinden oluşur: açık ve özel anahtar. Bir işlemin gerçekten gönderen tarafından imzalandığını kanıtlamaya yardımcı olurlar ve sahteciliği önlerler. Özel anahtarınız, işlemleri imzalamak için kullandığınız anahtar olduğu için hesabınızla ilişkili fonların velayetini size verir. Kripto para aslında hiçbir zaman sizde durmaz, sizde özel anahtarlar bulunur: Fonlar her zaman Ethereum'un defterindedir.

Bu, bir işlemin gönderenini her zaman doğrulayabileceğiniz için kötü niyetli kişilerin sahte işlemler yayınlamasını önler.

Alice, kendi hesabından Bob'un hesabına ether göndermek isterse, Alice'in bir işlem talebi oluşturması ve doğrulama için ağa göndermesi gerekir. Ethereum'un açık anahtarlı kriptografi kullanımı, Alice'in işlem talebini ilk olarak kendisinin başlattığını kanıtlayabilmesini sağlar. Kriptografik mekanizmalar olmasaydı kötü niyetli bir saldırgan olan Eve, "Alice'in hesabından Havva'nın hesabına 5 ETH gönder" gibi görünen bir talebi herkese açık bir şekilde yayınlayabilir ve hiç kimse bunun Alice'den gelmediğini doğrulayamazdı.

## Hesap oluşturma {#account-creation}

Bir hesap oluşturmak istediğinizde çoğu kütüphane size rastgele bir özel anahtar üretecektir.

Bir özel anahtar, 64 hex karakterinden oluşur ve şifrelenebilir.

Örnek:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Açık anahtar, [Eliptik Eğri Dijital İmza Algoritması](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) kullanılarak özel anahtar ile oluşturulur. Açık anahtarın Keccak-256 hash değerinin son 20 baytını alarak ve başına `0x` ekleyerek hesabınız için genel bir adres alırsınız.

İşte GETH'leri kullanarak konsolda hesap oluşturmaya bir örnek: `personal_newAccount`

```go
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"

> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

[GETH belgeleri](https://geth.ethereum.org/docs)

Özel anahtarınızdan yeni açık anahtarlar türetebilirsiniz, ancak açık anahtarlardan bir özel anahtar türetemezsiniz. Bu, özel bir anahtarı güvende ve adından da anlaşılacağı gibi **ÖZEL** tutmanın hayati önem taşıdığı anlamına gelir.

Bir imza çıktısı veren mesajları ve işlemleri imzalamak için özel bir anahtara ihtiyacınız vardır. Diğerleri daha sonra ortak anahtarınızı türetmek için imzayı alabilir ve mesajın yazarını kanıtlayabilir. Uygulamanızda, işlemleri ağa göndermek için bir javascript kütüphanesi kullanabilirsiniz.

## Sözleşme hesapları {#contract-accounts}

Sözleşme hesaplarında ayrıca 42 karakterlik bir onaltılık adres bulunur:

Örnek:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Sözleşme adresi genellikle Ethereum Blok Zincirine bir sözleşme dağıtıldığında verilir. Adres, içerik oluşturucunun adresinden ve bu adresten gönderilen işlem ("nonce" değeri) sayısından gelir.

## Cüzdanlar hakkında bir not {#a-note-on-wallets}

Bir hesap cüzdan demek değildir. Bir hesap kullanıcı tarafından sahip olunan bir Ethereum hesabının anahtar çiftidir. Bir cüzdan ise Ethereum hesabınızla etkileşime geçmenizi sağlayan bir arayüz veya uygulamadır.

## Görsel bir demo {#a-visual-demo}

Austin'in hash fonksiyonlarını ve anahtar çiftlerini açıklamasını izleyin.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili konular {#related-topics}

- [Akıllı sözleşmeler](/developers/docs/smart-contracts/)
- [İşlemler](/developers/docs/transactions/)
