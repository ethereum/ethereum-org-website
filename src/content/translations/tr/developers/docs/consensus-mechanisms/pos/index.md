---
title: Hisse ispatı (PoS)
description: Hisse ispatı mutabakatı protokolünün ve Ethereum'daki rolünün açıklaması.
lang: tr
incomplete: true
---

Ethereum, [iş ispatı(PoW)](/developers/docs/consensus-mekanizmas/pow/)'ndan hisse ispatı (PoS) adı verilen bir fikir birliği mekanizmasına geçiyor. Topluluğun, [yükseltmeler](/upgrades/) yoluyla Ethereum'u ölçeklendirme stratejisinin önemli bir parçası olduğu için bu her zaman öncelikli plandı. Ancak hisse ispatını doğru yapmak büyük bir teknik zorluktur ve ağ üzerinde mutabakata varmak için iş ispatı kullanmak kadar kolay değildir.

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlayabilmeniz için öncelikle [karar mekanizmaları](/developers/docs/consensus-mechanisms/)nı okumanızı öneririz.

## Hisse ispatı (PoS) nedir? {#what-is-pos}

Hisse ispatı, dağıtılmış mutabakata ulaşmak için blok zinciri ağları tarafından kullanılan bir tür [mutabakat mekanizmasıdır](/developers/docs/consensus-mechanisms/).

Kullanıcıların ağda doğrulayıcı olmak için ETH'lerini stake etmelerini gerektirir. Doğrulayıcılar, [iş ispatında](/developers/docs/consensus-mechanisms/pow/) madencilerle aynı sorumlulukları taşırlar: Tüm düğümlerin ağın durumu hakkında mutabık olmaları için işlemleri sıralamak ve yeni bloklar oluşturmak.

Hisse ispatı, bir dizi iyileştirme ile iş ispatının (PoW) yerini alacak:

- daha iyi enerji verimliliği - blok madenciliği için yüksek enerji kullanmanıza gerek yok
- daha düşük giriş bedeli ve donanım gereksinimleri - yeni bloklar oluşturma kabiliyeti için elit donanıma ihtiyacınız yok
- merkezileştirmeye karşı daha güçlü bağışıklık - hisse ispatı ağdaki düğüm sayısını artıracaktır
- [parça zincirleri](/upgrades/sharding/) için daha güçlü destek - Ethereum ağını ölçeklendirme için önemli bir yükseltme

## Hisse ispatı, stake etme ve doğrulayıcılar {#pos-staking-validators}

Hisse ispatı, yeterli miktarda stake edildiğinde doğrulayıcıları etkinleştiren temel mekanizmadır. Kullanıcıların Ethereum'da doğrulayıcı olmak için 32 ETH stake etmeleri gerekir. Doğrulayıcılar blok oluşturmak için rastgele seçilir ve oluşturmadıkları blokları kontrol etmek ve onaylamaktan sorumludur. Bir kullanıcının stake ettiği miktar, iyi doğrulayıcı davranışını teşvik etmenin bir yolu olarak da kullanılır. Örneğin, bir kullanıcı çevrimdışı olmak (doğrulayamamak) gibi nedenlerden stake ettiği miktarın bir kısmını veya kasıtlı gizli anlaşmalar yüzünden tüm stake ettiği miktarı kaybedebilir.

## Ethereum'un hisse ispatı nasıl çalışır? {#how-does-pos-work}

İş ispatının aksine, rastgele seçildikleri ve rekabet etmedikleri için doğrulayıcıların büyük miktarda bilgi işlem gücü kullanmalarına gerek yoktur. Blok madenciliği yapmaları gerekmez, sadece seçildiklerinde blok oluşturmaları ve seçilmediklerinde önerilen blokları doğrulamaları gerekir. Bu doğrulama, tasdiklemek olarak bilinir. Tasdiklemeyi, "Bence bu blokta bir sorun yok." demek gibi düşünebilirsiniz. Doğrulayıcılar, yeni bloklar önererek ve gördüklerini tasdikleyerek ödüller alırlar.

Kötü niyetli blokları tasdiklerseniz, stake ettiğiniz miktarı kaybedersiniz.

### İşaret (Beacon) zinciri {#the-beacon-chain}

Ethereum, iş ispatını hisse ispatı ile değiştirdiğinde, [parça zincirlerinin (shard chain)](/upgrades/sharding/) karmaşıklığı artacaktır. Bunlar, işlemleri gerçekleştirmek ve yeni bloklar oluşturmak için doğrulayıcılara ihtiyaç duyacak ayrı blok zincirleridir. 64 parça zincirinin bulunması ve hepsinin ağın durumu hakkında ortak bir anlayışa sahip olması planlanır. Sonuç olarak, ekstra koordinasyon gereklidir ve bu koordinasyon [işaret zinciri](/upgrades/beacon-chain/) tarafından sağlanacaktır.

İşaret zinciri, parçalardan durum bilgilerini alır ve ağın senkronize kalabilmesi için diğer parçalar için kullanılabilir hâle getirir. Aynı zamanda işaret zinciri, stake yatırımlarını kaydetmekten ödüllerini ve cezalarını vermeye kadar doğrulayıcıları yönetecektir.

İşte bu süreç şöyle çalışır.

### Doğrulama nasıl çalışır {#how-does-validation-work}

Bir parça üzerinde bir işlem gönderdiğinizde, işleminizi bir parça bloğuna eklemekten bir doğrulayıcı sorumlu olacaktır. Doğrulayıcılar, yeni bloklar önermek için işaret zinciri tarafından algoritmik olarak seçilir.

#### Tasdik {#attestation}

Doğrulayıcı yeni bir parça bloğu önermek için seçilmezse, başka bir doğrulayıcının önerisini onaylamaları ve her şeyin olması gerektiği gibi olduğunu tasdiklemeleri gerekir. İşaret zincirinde kaydedilen, işlemin kendisinden ziyade tasdiktir.

Her bir parça bloğunu doğrulamak için en az 128 doğrulayıcı gerekir: Bu doğrulayıcılar bir "komite" olarak bilinir.

Komitenin bir parça bloğu önermek ve doğrulamak için bir zaman dilimi vardır. Bu, bir "yuva" olarak bilinir. Yuva başına yalnızca bir geçerli blok oluşturulur ve bir "dönem"de 32 yuva bulunur. Her dönemden sonra komite dağıtılırak farklı ve rastgele katılımcılarla yeniden oluşturulur. Bu, parçaların kötü aktörlerden oluşan komitelerden korunmasına yardımcı olur.

#### Çapraz bağlantılar {#rewards-and-penalties}

Yeni bir parça bloğu teklifi yeterli tasdike sahip olduğunda, bloğun ve işleminizin işaret zincirine dahil edilmesini onaylayan bir "çapraz bağlantı" oluşturulur.

Bir çapraz bağlantı oluşturulduğunda, bloğu öneren doğrulayıcı ödülünü alır.

#### Kesinlik {#finality}

Dağıtılmış ağlarda, bir işlemin değişemeyen bir bloğun parçası olması durumunda işlemin "kesinliği" vardır.

Hisse ispatında bunu yapmak için, bir kesinlik protokolü olan Casper, doğrulayıcıların belirli kontrol noktalarında bir bloğun durumu üzerinde anlaşmasını sağlar. Doğrulayıcıların 2/3'ü aynı fikirde olduğu sürece blok tamamlanır. Doğrulayıcılar, bunu daha sonra %51 saldırısı yoluyla geri almaya çalışırlarsa tüm stake ettiklerini kaybederler.

Vlad Zamfir'in belirttiği gibi, bu bir madencinin %51 saldırısına katılarak madencilik donanımlarının bir anda yanmasına neden olması gibidir.

## Hisse ispatı ve güvenlik {#pos-and-security}

Hisse ispatında hâlâ bir [%51 saldırısı](https://www.investopedia.com/terms/1/51-attack.asp) tehdidi var ama saldırganlar için daha da riskli bir hâlde. Bunu yapmak için, stake edilen ETH'nin %51'ini kontrol etmeniz gerekir. Bu hem çok büyük miktarda bir paraya denk gelir hem de muhtemelen ETH'nin değerinin düşmesine neden olur. Çoğunluk hissesine sahip olduğunuz bir para biriminin değerini yok etmeyi teşvik eden pek bir neden yoktur. Ağı güvenli ve sağlıklı tutmayı teşvik eden çok daha güçlü nedenler var.

İşaret zinciri tarafından koordine edilen hisse kesme, çıkarma ve diğer cezalar, diğer kötü niyetli davranışları önlemek için mevcut olacaktır. Doğrulayıcılar ayrıca bu olayları işaretlemekten sorumlu olacaktır.

## Artıları ve eksileri {#pros-and-cons}

| Artıları                                                                                                                                                                                                                                                   | Eksileri                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Stake etme, bir düğüm çalıştırmanızı kolaylaştırır. Donanım veya enerji bazında büyük yatırımlar gerektirmez ve stake etmek için yeterli ETH'niz yoksa, stake havuzlarına katılabilirsiniz.                                                                | Hisse ispatı, hâlâ emekleme aşamasındadır ve iş ispatına kıyasla daha az kullanılmıştır |
| Stake etme daha merkeziyetsizdir. Katılımın artmasına izin verir ve daha fazla düğüm, madencilikte olduğu gibi artan getiri yüzdesi anlamına gelmez.                                                                                                       |                                                                                         |
| Stake etme, güvenli parçalamayı mümkün kılar. Parça zincirleri, Ethereum'un aynı anda birden fazla blok oluşturmasını sağlayarak işlem hacmini artırır. Bir iş ispatı sisteminde ağı parçalamak, ağın bir kısmından ödün vermek için gereken gücü düşürür. |                                                                                         |

## Daha fazla okuma {#further-reading}

- [Hisse ispatı SSS](https://vitalik.ca/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Hisse İspatı Nedir?](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ ConsenSys_
- [Hisse İspatı Nedir ve Neden Önemlidir?](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Önce okumanız gereken İşaret Zinciri Ethereum 2.0 açıklaması](https://ethos.dev/beacon-chain/) _Ethos.dev_
- [Neden Hisse İspatı (Kasım 2020)](https://vitalik.ca/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Hisse İspatı: Zayıf Öznelliği Sevmeyi Nasıl Öğrendim](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Bir Hisse İspatı Tasarım Felsefesi](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_

## İlgili Konular {#related-topics}

- [İş ispatı](/developers/docs/consensus-mechanisms/pow/)
