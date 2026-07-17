---
title: "Yetki Kanıtı (PoA)"
description: "Yetki kanıtı mutabakat protokolünün ve blokzincir ekosistemindeki rolünün bir açıklaması."
lang: tr
---

**Yetki kanıtı (PoA)**, [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/) mekanizmasının değiştirilmiş bir versiyonu olan itibar tabanlı bir mutabakat algoritmasıdır. Çoğunlukla özel zincirler, test ağları ve yerel geliştirme ağları tarafından kullanılır. PoA, PoS'taki stake tabanlı bir mekanizma yerine, blokları üretmek için bir dizi yetkili imzalayıcıya güvenmeyi gerektiren itibar tabanlı bir mutabakat algoritmasıdır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [işlemler](/developers/docs/transactions/), [bloklar](/developers/docs/blocks/) ve [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/) hakkında bilgi edinmenizi öneririz.

## Yetki kanıtı (PoA) nedir? {#what-is-poa}

Yetki kanıtı, PoS'taki stake tabanlı mekanizma yerine itibar tabanlı bir mutabakat algoritması olan **[Hisse Kanıtı](/developers/docs/consensus-mechanisms/pos/) (PoS)** mekanizmasının değiştirilmiş bir versiyonudur. Bu terim ilk kez 2017 yılında Gavin Wood tarafından ortaya atılmıştır ve bu mutabakat algoritması, PoW'un gerektirdiği yüksek kaliteli kaynak ihtiyacını ortadan kaldırdığı ve blokzinciri depolayan ve bloklar üreten küçük bir düğüm alt kümesine sahip olarak PoS'un ölçeklenebilirlik sorunlarının üstesinden geldiği için çoğunlukla özel zincirler, test ağları ve yerel geliştirme ağları tarafından kullanılmıştır.

Yetki kanıtı, [başlangıç bloğunda](/glossary/#genesis-block) belirlenen bir dizi yetkili imzalayıcıya güvenmeyi gerektirir. Mevcut uygulamaların çoğunda, tüm yetkili imzalayıcılar zincirin mutabakatını belirlerken eşit güç ve ayrıcalıklara sahiptir. İtibar staking'inin arkasındaki fikir, her yetkili doğrulayıcının müşterini tanı (KYC) gibi yöntemlerle herkes tarafından iyi bilinmesi veya tek doğrulayıcının iyi bilinen bir kuruluş olmasıdır; bu şekilde bir doğrulayıcı yanlış bir şey yaparsa kimliği bilinir.

PoA'nın birden fazla uygulaması vardır, ancak standart Ethereum uygulaması, [EIP-225](https://eips.ethereum.org/EIPS/eip-225)'i uygulayan **clique**'tir. Clique, tüm istemci eşzamanlama türlerini destekleyen, geliştirici dostu ve uygulaması kolay bir standarttır. Diğer uygulamalar arasında [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) ve [Aura](https://openethereum.github.io/Chain-specification) bulunur.

## Nasıl çalışır {#how-it-works}

PoA'da, yeni bloklar oluşturmak için bir dizi yetkili imzalayıcı seçilir. İmzalayıcılar itibarlarına göre seçilir ve yeni bloklar oluşturmalarına izin verilen tek kişiler onlardır. İmzalayıcılar sırayla (round-robin) seçilir ve her imzalayıcının belirli bir zaman diliminde bir blok oluşturmasına izin verilir. Blok oluşturma süresi sabittir ve imzalayıcıların bu zaman dilimi içinde bir blok oluşturması gerekir.

Bu bağlamdaki itibar nicelleştirilmiş bir şey değil, daha ziyade Microsoft ve Google gibi tanınmış şirketlerin itibarıdır; bu nedenle güvenilir imzalayıcıları seçme yöntemi algoritmik değil, daha ziyade normal bir insani _güven_ eylemidir. Örneğin Microsoft'un yüzlerce veya binlerce girişim arasında bir PoA özel ağı oluşturduğunu ve gelecekte Google gibi diğer tanınmış imzalayıcıları ekleme olasılığıyla birlikte tek güvenilir imzalayıcı rolünü üstlendiğini varsayalım; girişimler, Microsoft'un her zaman dürüst bir şekilde hareket edeceğine şüphesiz güvenecek ve ağı kullanacaktır. Bu, farklı amaçlar için inşa edilmiş çeşitli küçük/özel ağları merkeziyetsiz ve işlevsel tutmak için stake etme ihtiyacını ve çok fazla güç ve kaynak tüketen madencilere olan ihtiyacı çözer. VeChain gibi bazı özel ağlar PoA standardını olduğu gibi kullanırken, Binance gibi bazıları ise PoA ve PoS'un özel olarak değiştirilmiş bir versiyonu olan [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa)'yı kullanarak onu değiştirir.

Oylama süreci imzalayıcıların kendileri tarafından yapılır. Her imzalayıcı, yeni bir blok oluşturduğunda kendi bloğunda bir imzalayıcının eklenmesi veya çıkarılması için oy kullanır. Oylar düğümler tarafından sayılır ve imzalayıcılar, oyların belirli bir eşiğe `SIGNER_LIMIT` ulaşmasına bağlı olarak eklenir veya çıkarılır.

Küçük çatallanmaların meydana geldiği bir durum olabilir; bir bloğun zorluğu, bloğun sırayla mı yoksa sıra dışı mı imzalandığına bağlıdır. "Sırayla" imzalanan blokların zorluğu 2, "sıra dışı" imzalanan blokların zorluğu ise 1'dir. Küçük çatallanmalar durumunda, imzalayıcıların çoğunun blokları "sırayla" mühürlediği zincir en fazla zorluğu biriktirecek ve kazanacaktır.

## Saldırı vektörleri {#attack-vectors}

### Kötü niyetli imzalayıcılar {#malicious-signers}

Kötü niyetli bir kullanıcı imzalayıcılar listesine eklenebilir veya bir imzalama anahtarı/makinesi ele geçirilmiş olabilir. Böyle bir senaryoda protokolün kendisini yeniden düzenlemelere ve spam'e karşı savunabilmesi gerekir. Önerilen çözüm, N yetkili imzalayıcıdan oluşan bir liste verildiğinde, herhangi bir imzalayıcının her K bloktan yalnızca 1'ini basabilmesidir. Bu, hasarın sınırlı olmasını sağlar ve geri kalan doğrulayıcılar kötü niyetli kullanıcıyı oylayarak çıkarabilir.

### Sansür {#censorship-attack}

Bir diğer ilginç saldırı vektörü, bir imzalayıcının (veya imzalayıcı grubunun) kendilerini yetkilendirme listesinden çıkarmak için oy kullanan blokları sansürlemeye çalışmasıdır. Bunu aşmak için, imzalayıcıların izin verilen basım sıklığı N/2'de 1 ile sınırlandırılmıştır. Bu, kötü niyetli imzalayıcıların imzalama hesaplarının en az %51'ini kontrol etmesi gerektiği anlamına gelir ki bu noktada zincir için fiilen yeni doğruluk kaynağı haline gelirler.

### Spam {#spam-attack}

Bir diğer küçük saldırı vektörü, kötü niyetli imzalayıcıların bastıkları her bloğun içine yeni oy teklifleri enjekte etmesidir. Düğümlerin gerçek yetkili imzalayıcılar listesini oluşturmak için tüm oyları sayması gerektiğinden, zaman içindeki tüm oyları kaydetmeleri gerekir. Oy penceresine bir sınır koyulmazsa, bu yavaşça ama sınırsız bir şekilde büyüyebilir. Çözüm, oyların bayat kabul edileceği W blokluk _hareketli_ bir pencere yerleştirmektir. _Makul bir pencere 1-2 dönem (epoch) olabilir._

### Eşzamanlı bloklar {#concurrent-blocks}

Bir PoA ağında, N yetkili imzalayıcı olduğunda, her imzalayıcının K bloktan 1'ini basmasına izin verilir, bu da herhangi bir zamanda N-K+1 doğrulayıcının basım yapmasına izin verildiği anlamına gelir. Bu doğrulayıcıların bloklar için yarışmasını önlemek amacıyla, her imzalayıcı yeni bir blok yayınladığı zamana küçük, rastgele bir "sapma" (offset) eklemelidir. Bu süreç küçük çatallanmaların nadir olmasını sağlasa da, tıpkı Ana Ağ'da olduğu gibi ara sıra çatallanmalar yine de meydana gelebilir. Bir imzalayıcının gücünü kötüye kullandığı ve kaosa neden olduğu tespit edilirse, diğer imzalayıcılar onu oylayarak çıkarabilir.

Örneğin 10 yetkili imzalayıcı varsa ve her imzalayıcının 6 bloktan 1'ini oluşturmasına izin veriliyorsa, herhangi bir zamanda 5 doğrulayıcı blok oluşturabilir. Blok oluşturmak için yarışmalarını önlemek amacıyla, her imzalayıcı yeni bir blok yayınladığı zamana küçük, rastgele bir "sapma" ekler. Bu, küçük çatallanmaların oluşumunu azaltır ancak Ethereum Ana Ağı'nda görüldüğü gibi ara sıra çatallanmalara yine de izin verir. Bir imzalayıcı yetkisini kötüye kullanır ve aksamalara neden olursa, oylanarak ağdan çıkarılabilir.

## Artıları ve eksileri {#pros-and-cons}

| Artıları                                                                                                                                                      | Eksileri                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sınırlı sayıda blok imzalayıcısına dayandığı için PoS ve PoW gibi diğer popüler mekanizmalardan daha fazla ölçeklenebilirdir                                          | PoA ağları tipik olarak nispeten az sayıda doğrulayıcı düğüme sahiptir. Bu, bir PoA ağını daha merkezi hale getirir.                                 |
| PoA blokzincirlerini çalıştırmak ve sürdürmek inanılmaz derecede ucuzdur                                                                                                  | Yetkili bir imzalayıcı olmak sıradan bir kişi için genellikle ulaşılamazdır, çünkü blokzincir yerleşik itibara sahip kuruluşlar gerektirir. |
| Yeni blokları doğrulamak için yalnızca sınırlı sayıda imzalayıcı gerektiğinden işlemler 1 saniyenin altına inebilecek kadar çok hızlı onaylanır | Kötü niyetli imzalayıcılar ağdaki işlemleri yeniden düzenleyebilir, çifte harcama yapabilir, sansürleyebilir; bu saldırılar hafifletilmiştir ancak yine de mümkündür                       |

## Daha fazla bilgi {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique standardı_
- [Yetki Kanıtı çalışması](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Kriptoekonomi_
- [Yetki Kanıtı Nedir](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Yetki Kanıtı Açıklaması](https://academy.binance.com/en/articles/proof-of-authority-explained) _Binance_
- [Blokzincirde PoA](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique açıklaması](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Kullanımdan kaldırılan PoA, Aura spesifikasyonu](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, başka bir PoA uygulaması](https://besu.hyperledger.org/private-networks/concepts/poa)

### Görsel öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

Yetki kanıtının görsel bir açıklamasını izleyin:

<VideoWatch slug="proof-of-authority-explained" />

## İlgili konular {#related-topics}

- [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/)