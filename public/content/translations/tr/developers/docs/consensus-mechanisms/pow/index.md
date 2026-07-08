---
title: "İş Kanıtı (PoW)"
description: "İş kanıtı mutabakat protokolünün ve Ethereum'daki rolünün bir açıklaması."
lang: tr
---

[Ethereum](/) ağı, **[İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow)** içeren bir mutabakat mekanizması kullanarak başladı. Bu, Ethereum ağının düğümlerinin Ethereum blokzincirine kaydedilen tüm bilgilerin durumu üzerinde mutabakata varmasını sağladı ve belirli türdeki ekonomik saldırıları önledi. Ancak Ethereum, 2022'de iş kanıtını kapattı ve bunun yerine [hisse kanıtı](/developers/docs/consensus-mechanisms/pos) kullanmaya başladı.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    İş kanıtı artık kullanımdan kaldırılmıştır. Ethereum artık mutabakat mekanizmasının bir parçası olarak iş kanıtını kullanmıyor. Bunun yerine hisse kanıtı kullanıyor. [Hisse kanıtı](/developers/docs/consensus-mechanisms/pos/) ve [staking](/staking/) hakkında daha fazla bilgi edinin.
</AlertDescription>
</AlertContent>
</Alert>

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [işlemler](/developers/docs/transactions/), [bloklar](/developers/docs/blocks/) ve [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/) hakkında okuma yapmanızı öneririz.

## İş Kanıtı (PoW) nedir? {#what-is-pow}

İş kanıtından yararlanan Nakamoto mutabakatı, bir zamanlar merkeziyetsiz Ethereum ağının hesap bakiyeleri ve işlemlerin sırası gibi konularda mutabakata varmasını (yani tüm düğümlerin anlaşmasını) sağlayan mekanizmadır. Bu, kullanıcıların coin'lerini "çifte harcamasını" önledi ve Ethereum zincirine saldırmanın veya onu manipüle etmenin son derece zor olmasını sağladı. Bu güvenlik özellikleri artık [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) olarak bilinen mutabakat mekanizması kullanılarak hisse kanıtından gelmektedir.

## İş kanıtı ve madencilik {#pow-and-mining}

İş kanıtı, madencilerin iş kanıtı blokzincirlerinde yaptıkları işin zorluğunu ve kurallarını belirleyen temel algoritmadır. Madencilik "işin" kendisidir. Zincire geçerli bloklar ekleme eylemidir. Bu önemlidir çünkü zincirin uzunluğu, ağın blokzincirin doğru çatallanmasını takip etmesine yardımcı olur. Ne kadar çok "iş" yapılırsa, zincir o kadar uzun olur ve blok numarası ne kadar yüksek olursa, ağ mevcut durumdan o kadar emin olabilir.

[Madencilik hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pow/mining/)

## Ethereum'un iş kanıtı nasıl çalışıyordu? {#how-it-works}

Ethereum işlemleri bloklar halinde işlenir. Artık kullanımdan kaldırılan iş kanıtı Ethereum'unda her blok şunları içeriyordu:

- blok zorluğu – örneğin: 3,324,092,183,262,715
- mixHash – örneğin: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – örneğin: `0xd3ee432b4fb3d26b`

Bu blok verileri doğrudan iş kanıtı ile ilgiliydi.

### İş kanıtındaki iş {#the-work}

İş kanıtı protokolü Ethash, madencilerin bir blok için nonce'u bulmak adına yoğun bir deneme yanılma yarışından geçmesini gerektiriyordu. Zincire yalnızca geçerli bir nonce'a sahip bloklar eklenebilirdi.

Bir blok oluşturmak için yarışırken, bir madenci yalnızca (bir madencinin yaptığı gibi) tüm zinciri indirip çalıştırarak elde edilebilecek bir veri kümesini tekrar tekrar matematiksel bir fonksiyondan geçirirdi. Veri kümesi, blok zorluğu tarafından dikte edilen bir hedefin altında bir mixHash oluşturmak için kullanılırdı. Bunu yapmanın en iyi yolu deneme yanılmadır.

Zorluk, hash hedefini belirlerdi. Hedef ne kadar düşükse, geçerli hash kümesi o kadar küçük olurdu. Oluşturulduktan sonra, diğer madencilerin ve istemcilerin bunu doğrulaması inanılmaz derecede kolaydı. Tek bir işlem bile değişse, hash tamamen farklı olur ve dolandırıcılık sinyali verirdi.

Hashleme, dolandırıcılığı tespit etmeyi kolaylaştırır. Ancak bir süreç olarak iş kanıtı, zincire saldırmak için de büyük bir caydırıcıydı.

### İş kanıtı ve güvenlik {#security}

Madenciler bu işi ana Ethereum zincirinde yapmaya teşvik edilirdi. Bir alt madenci grubunun kendi zincirini başlatması için çok az teşvik vardı; bu sistemi baltalar. Blokzincirler, bir doğruluk kaynağı olarak tek bir duruma sahip olmaya dayanır.

İş kanıtının amacı zinciri uzatmaktı. En uzun zincir, onu oluşturmak için en çok hesaplama işi yapıldığından geçerli olan olarak en inandırıcı olandı. Ethereum'un PoW sistemi içinde, işlemleri silen, sahtelerini oluşturan veya ikinci bir zinciri sürdüren yeni bloklar oluşturmak neredeyse imkansızdı. Bunun nedeni, kötü niyetli bir madencinin blok nonce'unu her zaman herkesten daha hızlı çözmesi gerekmesiydi.

Sürekli olarak kötü niyetli ancak geçerli bloklar oluşturmak için, kötü niyetli bir madencinin herkesi yenmek adına ağ madencilik gücünün %51'inden fazlasına ihtiyacı olurdu. Bu miktarda "iş", çok fazla pahalı hesaplama gücü gerektirir ve harcanan enerji, bir saldırıda elde edilen kazançlardan bile daha ağır basabilirdi.

### İş kanıtı ekonomisi {#economics}

İş kanıtı ayrıca sisteme yeni para birimi ihraç etmekten ve madencileri işi yapmaya teşvik etmekten de sorumluydu.

[Konstantinopolis yükseltmesinden](/ethereum-forks/#constantinople) bu yana, başarılı bir şekilde blok oluşturan madenciler yeni basılmış iki ETH ve işlem ücretlerinin bir kısmı ile ödüllendiriliyordu. Ommer blokları da 1,75 ETH telafi ediyordu. Ommer blokları, bir madenci tarafından, başka bir madencinin kurallı bloğu oluşturmasıyla pratik olarak aynı zamanda oluşturulan geçerli bloklardı ve bu, nihayetinde ilk olarak hangi zincirin üzerine inşa edildiğiyle belirleniyordu. Ommer blokları genellikle ağ gecikmesi nedeniyle meydana geliyordu.

## Kesinlik {#finality}

Bir işlem, değişemeyecek bir bloğun parçası olduğunda Ethereum'da "kesinliğe" sahip olur.

Madenciler merkeziyetsiz bir şekilde çalıştıkları için aynı anda iki geçerli blok çıkarılabilirdi. Bu geçici bir çatallanma yaratır. Sonunda, bu zincirlerden biri, sonraki bloklar çıkarılıp ona eklendikten sonra kabul edilen zincir haline gelir ve onu daha uzun hale getirirdi.

İşleri daha da karmaşıklaştırmak gerekirse, geçici çatallanmada reddedilen işlemler kabul edilen zincire dahil edilmemiş olabilirdi. Bu, geri alınabileceği anlamına gelir. Bu nedenle kesinlik, bir işlemi geri döndürülemez olarak kabul etmeden önce beklemeniz gereken süreyi ifade eder. Önceki iş kanıtı Ethereum'u altında, belirli bir `N` bloğunun üzerine ne kadar çok blok çıkarılırsa, `N` içindeki işlemlerin başarılı olduğuna ve geri alınmayacağına dair güven o kadar yüksek olurdu. Şimdi, hisse kanıtı ile kesinleşme, bir bloğun olasılıksal olmaktan ziyade açık bir özelliğidir.

## İş kanıtı enerji kullanımı {#energy}

İş kanıtına yönelik önemli bir eleştiri, ağı güvende tutmak için gereken enerji çıktısı miktarıdır. Güvenliği ve merkeziyetsizliği korumak için iş kanıtı üzerindeki Ethereum büyük miktarda enerji tüketiyordu. Hisse kanıtına geçmeden kısa bir süre önce, Ethereum madencileri toplu olarak yılda yaklaşık 70 TWh tüketiyordu (18 Temmuz 2022'de [digiconomist](https://digiconomist.net/)'e göre Çek Cumhuriyeti ile yaklaşık aynı).

## Artılar ve eksiler {#pros-and-cons}

| Artılar                                                                                                                                                                                                                         | Eksiler                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| İş kanıtı tarafsızdır. Başlamak için ETH'ye ihtiyacınız yoktur ve blok ödülleri 0 ETH'den pozitif bir bakiyeye geçmenizi sağlar. [Hisse kanıtı](/developers/docs/consensus-mechanisms/pos/) ile başlamak için ETH'ye ihtiyacınız vardır. | İş kanıtı o kadar çok enerji tüketir ki çevre için kötüdür.                                                                      |
| İş kanıtı, Bitcoin ve Ethereum'u uzun yıllar boyunca güvenli ve merkeziyetsiz tutan, denenmiş ve test edilmiş bir mutabakat mekanizmasıdır.                                                                                          | Madencilik yapmak istiyorsanız, o kadar özel ekipmanlara ihtiyacınız vardır ki başlamak büyük bir yatırımdır.                                                |
| Hisse kanıtına kıyasla uygulanması nispeten kolaydır.                                                                                                                                                                | Artan hesaplama ihtiyacı nedeniyle, madencilik havuzları potansiyel olarak madencilik oyununa hakim olabilir ve bu da merkezileşmeye ve güvenlik risklerine yol açabilir. |

## Hisse kanıtı ile karşılaştırma {#compared-to-pos}

Üst düzeyde, hisse kanıtı iş kanıtı ile aynı nihai hedefe sahiptir: merkeziyetsiz ağın güvenli bir şekilde mutabakata varmasına yardımcı olmak. Ancak süreç ve personel açısından bazı farklılıkları vardır:

- Hisse kanıtı, hesaplama gücünün önemini stake edilmiş ETH ile değiştirir.
- Hisse kanıtı, madencilerin yerini doğrulayıcılarla değiştirir. Doğrulayıcılar, yeni bloklar oluşturma yeteneğini etkinleştirmek için ETH'lerini stake ederler.
- Doğrulayıcılar blok oluşturmak için rekabet etmezler, bunun yerine bir algoritma tarafından rastgele seçilirler.
- Kesinlik daha nettir: belirli kontrol noktalarında, doğrulayıcıların 2/3'ü bloğun durumu üzerinde anlaşırsa kesin olarak kabul edilir. Doğrulayıcılar tüm stake'lerini buna yatırmalıdır, bu nedenle ileride gizli anlaşma yapmaya çalışırlarsa tüm stake'lerini kaybederler.

[Hisse kanıtı hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pos/)

## Görsel öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<VideoWatch slug="proof-of-work-explained" />

## Daha Fazla Okuma {#further-reading}

- [Çoğunluk saldırısı](https://en.bitcoin.it/wiki/Majority_attack)
- [Uzlaşma kesinliği üzerine](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Videolar {#videos}

- [İş kanıtı protokollerinin teknik bir açıklaması](https://youtu.be/9V1bipPkCTU)

## İlgili Konular {#related-topics}

- [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/)
- [Hisse kanıtı](/developers/docs/consensus-mechanisms/pos/)
- [Yetki kanıtı](/developers/docs/consensus-mechanisms/poa/)