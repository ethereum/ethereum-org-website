---
title: Yetki İspatı (PoA)
description: Yetki ispatı mutabakat protokolü ve blokzincir ekosistemindeki rolüne dair bir açıklama.
lang: tr
---

**Yetki İspatı (PoA)** [hisse ispatı](/developers/docs/consensus-mechanisms/pos/)'nın değiştirilmiş bir versiyonu olan, itibar tabanlı bir mutabakat algoritmasıdır. Çoğunlukla; özel zincirlerde, test ağlarında ve yerel geliştirme ağlarında kullanılır. PoA, PoS tabanlı hisse ispatı mekanizmasının aksine yetkilendirilmiş imzalayıcılar adındaki belirli gruplar tarafından blokların üretiminin imzalanarak ilerlenmesini sağlayan ve itibar tabanlı bir mutabakat algoritmasıdır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [işlemler](/developers/docs/transactions/), [bloklar](/developers/docs/blocks/) ve [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/) hakkındaki kaynakları okumanızı tavsiye ediyoruz.

## Yetki ispatı (PoA) nedir? {#what-is-poa}

Yetki ispatı, PoS'taki hisseleme tabanlı mekanizma yerine itibar tabanlı bir mutabakat algoritması olan **[hisse ispatı](/developers/docs/consensus-mechanisms/pos/) (PoS)** algoritmasının değiştirilmiş bir versiyonudur. Bu terim ilk kez 2017 yılında Gavin Wood tarafından ortaya atılmış olup, bu mutabakat algoritması çoğunlukla özel zincirler, test ağları ve yerel geliştirme ağları tarafından kullanılmıştır. Çünkü PoW'da olduğu gibi yüksek kaliteli kaynaklara olan ihtiyacı ortadan kaldırır ve blokzinciri depolayan ve blok üreten küçük bir düğüm alt kümesine sahip olması sayesinde PoS'taki ölçeklenebilirlik sorunlarını aşar.

Yetki ispatı, [başlangıç bloğu](/glossary/#genesis-block)'nda belirlenmiş ve güvenilen bir grup imzalayıcıya ihtiyaç duyar. Güncel uygulamaların çoğunda, zincirin mutabakatını belirlerken tüm yetkili imzacılar eşit güç ve ayrıcalıklara sahiptir. İtibar tabanlı hisselemenin arkasında yatan fikir, yetkili her doğrulayıcının "müşterinizi tanıyın" (KYC) gibi şeyler aracılığıyla veya tek doğrulayıcının iyi bilinen bir kuruluş olması yoluyla herkes tarafından iyi tanınmasıdır; bu sayede, bir doğrulayıcı yanlış bir şey yaptığında kimliği öğrenilebilir.

PoA'nın birden fazla uygulaması vardır ancak standart Ethereum uygulaması, [EIP-225'i](https://eips.ethereum.org/EIPS/eip-225) uygulayan **clique**'dir. Clique, tüm istemci senkronizasyon tiplerini destekleyen, geliştirici dostu ve kolay uygulanabilir bir standarttır. Diğer uygulamalar arasında [IBFT 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) ve [Aura](https://openethereum.github.io/Chain-specification) yer alır.

## Nasıl çalışır? {#how-it-works}

PoA'da bir dizi yetkili imzalayıcı, yeni blokların üretimi için seçilir. İmzalayıcılar, itibarlarına göre seçilir ve yeni bloklar oluşturma yetkisine sahip olan tek kişiler onlardır. İmzalayıcılar sırayla seçilir ve her imzalayıcının belirli bir zaman dilimi içinde bir blok oluşturmasına izin verilir. Blok üretim süresi sabittir ve imzalayıcılar bu zaman aralığında blokları üretmekle yükümlüdür.

Bu bağlamda itibar, nicel bir şeyi değil, Microsoft ve Google gibi tanınmış şirketlerin itibarını ifade eder. Dolayısıyla güvenilir imzalayıcıları seçme yöntemi algoritmik değil, insani bir normal _güven_ eylemidir; burada örneğin Microsoft, yüzlerce veya binlerce yeni girişim arasında bir PoA özel ağı oluşturarak kendisi tek güvenilir imzalayıcı rolü üstlenir ve gelecekte Google gibi tanınmış diğer imzalayıcıları ekleme olanağına sahip olur. Yeni girişimler şüphesiz Microsoft'un her zaman dürüst bir şekilde hareket ederek ağı kullanacağına güvenecektir. Bu, farklı amaçlar için oluşturulmuş farklı küçük/özel ağları merkeziyetsiz ve çalışır durumda tutmak için bu ağlara yatırım yapma ihtiyacının yanı sıra çok fazla güç ve kaynak tüketen madencilere olan ihtiyacı da ortadan kaldırır. VeChain gibi bazı özel ağlar PoA standardını kullanırken, Binance gibi bazıları da PoA ve PoS'nin özel olarak değiştirilmiş bir versiyonu olan [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) standardını kullanır.

Oylama süreci imzalayıcılar tarafından gerçekleştirilir. Her imzalayıcı, yeni bir blok oluşturduğunda kendi bloğuna bir imzalayanın eklenmesi veya çıkarılması için oy kullanır. Oylar, düğümler tarafından sayılır ve imzalayıcılar, "SIGNER_LIMIT" eşiğine ulaştıktan sonra oylara göre bloklara eklenir veya çıkarılır.

Küçük çatallanmaların meydana geldiği durumlar olabilir; bir bloğun zorluğu, bloğun sırayla mı yoksa sıra olmadan mı imzalandığına bağlıdır. "Sıra dahilindeki" bloklar 2. dereceden zorluğa, "sıra haricindeki" bloklar ise 1. dereceden zorluğa sahiptir. Küçük çatallanmaların olduğu durumlarda, blokları "sırayla" imzalayanların çoğunun bulunduğu zincir en fazla zorluğu biriktirecek ve kazanacaktır.

## Saldırı vektörleri {#attack-vectors}

### Kötü niyetli imzalayıcılar {#malicious-signers}

Kötü niyetli bir kullanıcı imzalayıcıların olduğu listeye eklenebilir ya da imzalayıcı anahtar/makine riskli hale gelmiş olabilir. Bu tarz senaryolarda, protokol kendisini yeniden örgütlenmelere ve spamlamalara karşı savunabilecek durumda olabilmelidir. Teklif edilen çözüm ise, N adet yetkili imzalayıcının olduğu bir listede her K döngüsünde her bir imzalayıcının sadece bir blok basabilmesidir. Bu sayede alınan hasar sınırlandırılır ve kalan doğrulayıcılar kötü niyetli kullanıcıyı oylayarak sistemin dışına atabilir.

### Sansür {#censorship-attack}

Başka bir ilgi çekici saldırı vektörü ise, bir imzalayıcı (ya da bir grup imzalayıcı) kendisini yetkili listesinden çıkartmayı içeren oylamanın bloğunu sansürlemeye çalıştığında oluşur. Bu sorunu aşmak için imzalayıcıların izin verilen basma sıklığı N/2'de 1 ile sınırlandırılmıştır. Bu, kötü niyetli imzalayıcıların imzalayıcı hesapların en az %51'ini kontrol etmeye mecbur olmasını sağlar ve sonucunda efektif bir şekilde zincir için yeni doğruluk kaynağı haline gelmelerini engeller.

### Spam {#spam-attack}

Başka bir saldırı vektörü ise, kötü niyetli imzalayıcıların bastıkları her bloğun içerisine yeni bir oylama teklifi eklemeleri ile olur. Düğümlerin yetkili imzalayıcıların gerçek listesini oluşturmak için tüm oyları sayması gerektiğinden, zaman içerisinde tüm oyları kaydetmesi gerekir. Oy verme süresine bir sınır getirilmediği takdirde, bu süre yavaş ama sınırsız bir şekilde uzayabilir. Çözüm ise, oyların geçmişte kaldığının kabul edildiği W blokluk bir _hareketli_ pencere yerleştirmektir. _Uygun bir pencere yaklaşık olarak 1-2 dönemdir._

### Eş zamanlı bloklar {#concurrent-blocks}

Bir PoA ağında, N yetkili imzalayıcı olduğunda her bir imzalayıcı K döngüsünden 1 blok basma yetkisine sahiptir. Bu da N-K+1 doğrulayıcının herhangi bir zamanda blok basabilmesi anlamına gelir. Bu doğrulayıcıların bloklar için yarışmasına engel olmak için, her bir imzalayıcı yeni bir blok yayınladığında zaman sürecine küçük ve rastgele bir "dengeleyici zaman" eklemelidir. Her ne kadar bu süreç küçük çatallanmaların nadiren oluşmasını sağlasa da aynı ana ağ gibi tesadüfi çatallanmalar meydana gelebilir. Bir imzalayıcı yetkisini suistimal ederse ve kaosa sebebiyet verirse, diğer imzalayıcılar onu oylayarak yetkili listesinin dışına atabilir.

Örneğin, 10 yetkili imzalayıcı varsa ve her imzalayıcının 20 bloktan 1'ini oluşturulmasına izin veriliyorsa, herhangi bir zamanda 11 doğrulayıcı blokları oluşturabilir. Blok üretimi için yarışmalarını önlemek için, her bir imzalayıcı yeni bir blok yayınlandığında zaman sürecine küçük ve rastgele bir "dengeleyici zaman" eklemelidir. Bu, küçük çatallanmaların oluşmasını en düşük seviyeye indirir ancak Ethereum Ana Ağında görüldüğü gibi tesadüfi çatallanmalar meydana gelebilir. Bir imzalayıcı yetkisini kötüye kullanırsa ve aksamalara sebebiyet verirse, oylanarak ağdan atılabilir.

## Artı ve eksiler {#pros-and-cons}

| Artıları                                                                                                                                               | Eksileri                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sınırlı sayıda blok imzalayıcısına dayandığından dolayı PoS ve PoW gibi popüler diğer mekanizmalardan daha ölçeklenebilir niteliktedir                 | PoA ağları genellikle az sayıda doğrulayıcı düğüme sahiptir. Bu, PoA ağlarını daha merkezi hale getirir.                                                            |
| PoA blokzincirlerini çalıştırmak ve sürdürmek inanılmaz derecede ucuzdur                                                                               | Yetkili bir imzalayıcı olmak sıradan bir kişi için genellikle ulaşılamaz bir durumdur çünkü blokzincir güçlü itibara sahip kişilere ihtiyaç duyar.                                  |
| İşlemler çok hızlı bir şekilde, neredeyse 1 saniyenin altında bir sürede onaylanır çünkü blokları doğrulamak için sınırlı sayıda imzalayıcı gereklidir | Kötü niyetli bir imzalayıcı yeniden organize olabilir, çift harcama yapabilir ve ağdaki işlemleri sansürleyebilir. Bu tip saldırıların ihtimali azaltılmıştır ancak halen mümkündür |

## Daha fazla kaynak {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique standardı_
- [Yetki İspatı çalışması](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Kriptoekonomi_
- [Yetki İspatı nedir?](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Yetki İspatına İlişkin Açıklama](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [Blokzincirde PoA](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique, açıklamalı](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Kullanımdan kaldırılmış PoA, Aura spesifikasyonu](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, başka bir PoA uygulaması](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### Görsel olarak öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

Yetki ispatının görsel açıklamasını izleyin:

<YouTube id="Mj10HSEM5_8" />

## Alakalı başlıklar {#related-topics}

- [İş ispatı](/developers/docs/consensus-mechanisms/pow/)
- [Hisse ispatı](/developers/docs/consensus-mechanisms/pos/)
