---
title: Ethereum hesapları
description: "Ethereum hesaplarının bir açıklaması: Hesapların veri yapıları ve anahtar çifti kriptografisi ile ilişkileri."
lang: tr
---

Bir Ethereum hesabı, Ethereum'da mesaj gönderebilen, ether (ETH) bakiyesine sahip bir varlıktır. Hesaplar kullanıcılar tarafından kontrol edilebilir veya akıllı sözleşme olarak dağıtılabilirler.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamanıza yardımcı olmak için, öncelikle [Ethereum'a giriş](/developers/docs/intro-to-ethereum/) yazımızı okumanızı öneriyoruz.

## Hesap türleri {#types-of-account}

Ethereum'da iki tür hesap bulunur:

- Harici olarak sahiplenilmiş hesaplar (EOA) - özel anahtarı olan herhangi biri tarafından kontrol edilir
- Sözleşme hesabı - kod tarafından kontrol edilen, ağ içine yayılmış bir akıllı sözleşme. [Akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkında bilgi edinin

İki hesap türü de şunları yapabilir:

- ETH ve token alma, tutma ve gönderme
- Dağıtılmış akıllı sözleşmelerle etkileşime girme

### Temel farklılıklar {#key-differences}

**Harici olarak sahiplenilmiş**

- Hesap oluşturmak tamamen ücretsizdir
- İşlem başlatabilir
- Harici olarak sahiplenilmiş hesaplar arası işlemler sadece ETH/token transferleri olabilir
- Kriptografik bir anahtar çiftinden oluşur: hesap aktivitelerini kontrol eden herkese açık ve özel anahtarlar

**Sözleşme**

- Ağ depolaması kullandığınız için sözleşme oluşturmanın bir ücreti vardır
- Yalnızca bir işlemin alınmasına yanıt olarak mesaj gönderebilir
- Harici bir hesaptan bir sözleşme hesabına yapılan işlemler, token'ları aktarmak ve hatta yeni bir sözleşme oluşturmak gibi birçok farklı eylemi gerçekleştirebilen kodları tetikleyebilir
- Sözleşme hesaplarının özel anahtarları yoktur. Bunun yerine, akıllı sözleşmenin kodunun mantığı tarafından kontrol edilirler

## Bir hesabın incelenmesi {#an-account-examined}

Ethereum hesaplarının dört alanı vardır:

- `nonce` – Harici olarak sahiplenilmiş bir hesaptan gönderilen işlem sayısını veya bir sözleşme hesabı tarafından oluşturulan sözleşme sayısını gösteren bir sayaç. Verilen tek seferlik sayı ile her bir hesap için sadece bir işlem yürütülebilir, bu imzalanmış işlemlerin tekrarlı şekilde yayınlandığı ve yürütüldüğü tekrar saldırılarına karşı koruma sağlar.
- `balance` – Bu adrese ait wei sayısı. Wei, ETH'nin bir birimidir ve ETH başına 1e+18 wei bulunur.
- `codeHash` – Bu hash, Ethereum sanal makinesindeki (EVM) bir hesabın _koduna_ atıfta bulunur. Sözleşme hesaplarına, farklı işlemler gerçekleştirebilen kod parçacıkları programlanmıştır. Hesap bir mesaj çağrısı aldıysa bu EVM kodu çalıştırılır. Diğer hesap alanlarının aksine değiştirilemez. Bu türdeki tüm kod parçaları, daha sonra geri alınmak üzere durum veri tabanında karşılık gelen hash'leri altında bulunur. Bu hash değeri codeHash olarak bilinir. Harici olarak sahiplenilmiş hesaplar için codeHash alanı, boş bir dizenin hash değeridir.
- `storageRoot` – Bazen depolama karması olarak da bilinir. Hesabın depolama içeriğini kodlayan bir [Merkle Patricia Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) kök düğümünün 256 bitlik karmasıdır. Bu depolama içeriği (256 bitlik tamsayı değerleri arasındaki bir eşleme), 256 bitlik tamsayı anahtarlarının Keccak 256 bitlik karmasından RLP ile kodlanmış 256 bitlik tamsayı değerlerine bir eşleme olarak trie'ye kodlanır. Bu ağaç, bu hesabın depolama içeriğinin hash değerini kodlar ve varsayılan olarak boştur.

![Bir hesabın yapısını gösteren bir şema](./accounts.png)
_Şema, [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) kaynağından uyarlanmıştır_

## Harici olarak sahiplenilmiş hesaplar ve anahtar çiftleri {#externally-owned-accounts-and-key-pairs}

Bir hesap, genel ve özel olmak üzere bir çift kriptografik anahtardan oluşur. Bir işlemin gerçekten gönderen tarafından imzalandığını kanıtlamaya yardımcı olurlar ve sahteciliği önlerler. Özel anahtarınız, işlemleri imzalamak için kullandığınız anahtar olduğu için hesabınızla ilişkili fonların velayetini size verir. Kripto para aslında hiçbir zaman sizde durmaz, sizde özel anahtarlar bulunur: Fonlar her zaman Ethereum'un defterindedir.

Bu, bir işlemin gönderenini her zaman doğrulayabileceğiniz için kötü niyetli kişilerin sahte işlemler yayınlamasını önler.

Alice, kendi hesabından Bob'un hesabına ether göndermek isterse, Alice'in bir işlem talebi oluşturması ve doğrulama için ağa göndermesi gerekir. Ethereum'un açık anahtarlı kriptografi kullanımı, Alice'in işlem talebini ilk olarak kendisinin başlattığını kanıtlayabilmesini sağlar. Kriptografik mekanizmalar olmasaydı kötü niyetli bir saldırgan olan Eve, "Alice'in hesabından Havva'nın hesabına 5 ETH gönder" gibi görünen bir talebi herkese açık bir şekilde yayınlayabilir ve hiç kimse bunun Alice'den gelmediğini doğrulayamazdı.

## Hesap oluşturma {#account-creation}

Bir hesap oluşturmak istediğinizde, çoğu kütüphane sizin için rastgele bir özel anahtar üretir.

Bir özel anahtar, 64 hex karakterinden oluşur ve şifrelenebilir.

Örnek:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Açık anahtar, özel anahtardan [Eliptik Eğri Dijital İmza Algoritması](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) kullanılarak üretilir. Açık anahtarın Keccak-256 karmasının son 20 baytını alıp başına `0x` ekleyerek hesabınız için bir açık adres elde edersiniz.

Bu, bir Harici Olarak Sahiplenilmiş Hesabın (EOA) 42 karakterli bir adrese sahip olduğu anlamına gelir (40 onaltılık karakterden ve `0x` önekinden oluşan 20 baytlık bölüm).

Örnek:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Aşağıdaki örnek, yeni bir hesap oluşturmak için [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) adlı bir imzalama aracının nasıl kullanılacağını gösterir. Clef, Ethereum istemcisi [Geth](https://geth.ethereum.org) ile birlikte gelen bir hesap yönetimi ve imzalama aracıdır. `clef newaccount` komutu yeni bir anahtar çifti oluşturur ve bunları şifrelenmiş bir anahtar depolama dosyasına kaydeder.

```
> clef newaccount --keystore <yol>

Lütfen oluşturulacak yeni hesap için bir parola girin:
> <parola>

------------
BİLGİ [10-28|16:19:09.156] Yeni anahtarınız oluşturuldu       adres=0x5e97870f263700f46aa00d967821199b9bc5a120
UYARI [10-28|16:19:09.306] Lütfen anahtar dosyanızı yedekleyin      yol=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
UYARI [10-28|16:19:09.306] Lütfen parolanızı unutmayın!
Oluşturulan hesap 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Geth belgeleri](https://geth.ethereum.org/docs)

Özel anahtarınızdan yeni açık anahtarlar türetebilirsiniz, ancak açık anahtarlardan bir özel anahtar türetemezsiniz. Özel anahtarlarınızı güvende ve adından da anlaşılacağı gibi **ÖZEL** tutmanız hayati önem taşır.

Bir imza çıktısı veren mesajları ve işlemleri imzalamak için özel bir anahtara ihtiyacınız vardır. Diğerleri daha sonra ortak anahtarınızı türetmek için imzayı alabilir ve mesajın yazarını kanıtlayabilir. Uygulamanızda, ağa işlem göndermek için JavaScript kütüphanesini kullanabilirsiniz.

## Sözleşme hesapları {#contract-accounts}

Sözleşme hesaplarında ayrıca 42 karakterlik bir onaltılık adres bulunur:

Örnek:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Sözleşme adresi genellikle Ethereum Blok Zincirine bir sözleşme dağıtıldığında verilir. Adres, içerik oluşturucunun adresinden ve bu adresten gönderilen işlem ("nonce" değeri) sayısından gelir.

## Doğrulayıcı anahtarları {#validators-keys}

Ethereumda bir anahtar türü daha var ve ilk kez Ethereum iş ispatından mutabakata dayalı olan hisse ispatına geçtiğinde tanıtıldı. Bunlar doğrulayıcıları tanımlamak için kullanılan BLS anahtarları. Bu anahtarlar ağın mutabakata varabilmesi için gereken bant genişliğini kısmak için etkili bir şekilde birleşebilirler. Bu anahtar toplama süreci olmazsa bir doğrulayıcıya düşen minimum hisse çok daha fazla olurdu.

[Doğrulayıcı anahtarları hakkında daha fazlası](/developers/docs/consensus-mechanisms/pos/keys/).

## Cüzdanlar hakkında bir not {#a-note-on-wallets}

Hesap, cüzdan demek değildir. Cüzdan, ister harici olarak sahiplenilmiş bir hesap ister bir sözleşme hesabı olsun, Ethereum hesabınızla etkileşim kurmanıza olanak sağlayan bir arayüz veya uygulamadır.

## Görsel bir demo {#a-visual-demo}

Austin'in karma fonksiyonlarını ve anahtar çiftlerini açıklamasını izleyin.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Daha fazla kaynak {#further-reading}

- [Ethereum Hesaplarını Anlamak](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## Alakalı başlıklar {#related-topics}

- [Akıllı sözleşmeler](/developers/docs/smart-contracts/)
- [İşlemler](/developers/docs/transactions/)
