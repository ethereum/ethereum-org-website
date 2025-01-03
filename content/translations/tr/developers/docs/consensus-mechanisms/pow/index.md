---
title: İş ispatı (PoW)
description: İş ispatı mutabakat protokolünün ve Ethereum'daki rolünün bir açıklaması.
lang: tr
---

Ethereum ağı, **[İş İspatı (PoW)](/developers/docs/consensus-mechanisms/pow)** kullanan bir uzlaşma mekanizmasıyla başladı. Bu durum, Ethereum ağının düğümler sisteminin Ethereum blok zincirine kaydedilen bütün bilgilerin ortak durumda anlaşmasına olanak tanıdı ve belirli ekonomik saldırı türlerini önledi. Ancak, Ethereum 2022'de iş ispatı mekanizmasını devre dışı bırakarak sonlandırdı ve bunun yerine [hisse ispatını](/developers/docs/consensus-mechanisms/pos) kullanmaya başladı.

<InfoBanner emoji=":wave:">
    İş ispatı artık kullanımdan kaldırılmıştır. Ethereum artık mutabakat mekanizmasının bir parçası olan iş ispatını kullanmamaktadır. Bunun yerine hisse ispatı kullanılmaktadır. <a href="/developers/docs/consensus-mechanisms/pos/">Hisse ispatı</a> ve <a href="/staking/">hisseleme</a> hakkında daha fazla bilgi edinin.
</InfoBanner>

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için, önce [işlemleri](/developers/docs/transactions/), [blokları](/developers/docs/blocks/) ve [mutabakat mekanizmalarını](/developers/docs/consensus-mechanisms/) okumanızı öneririz.

## İş ispatı (PoW) nedir? {#what-is-pow}

İş ispatı kullanan Nakamoto mutabakatı, merkeziyetsiz Ethereum ağının hesap bakiyeleri ve işlem sırası gibi şeyler üzerinde mutabakata varmasını (tüm düğünlerin aynı fikirde olmasını) sağlayan mekanizmadır. Bu kullanıcıların paralarını "iki kere harcamalarını" önlemiş ve Ethereum zincirine saldırı ve manipulasyonların muazzam derecede zor olmasını sağlamıştır. Bu güvenlik özellikleri artık bunun yerine [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) olarak bilinen mutabakat mekanizmasını kullanan hisse ispatı tarafından sağlanmaktadır.

## İş ispatı ve madencilik {#pow-and-mining}

Iş ispatı, madencilerin iş ispatı blok zincirlerinde yaptıkları işin zorluğunu ve kurallarını belirleyen temel algoritmadır. Madencilik "iş"in kendisidir. Zincire geçerli bloklar ekleme eylemidir. Bu önemlidir çünkü zincirin uzunluğu ağın blok zincirin doğru çatalını takip etmesine yardımcı olur. Ne kadar çok "iş" yapılırsa, zincir o kadar uzun ve blok numarası ne kadar yüksek olursa, ağ mevcut durumdan o kadar emin olabilir.

[Madencilik hakkında daha fazlası](/developers/docs/consensus-mechanisms/pow/mining/)

## Ethereum'un iş ispatı nasıl çalıştı? {#how-it-works}

Ethereum işlemleri bloklar halinde işlenir. Artık kullanımda olmayan Ethereum iş ispatındaki her bir blok, şunları içeriyordu:

- blok zorluğu – örneğin: 3.324.092.183.262.715
- mixHash – örneğin: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – örneğin: `0xd3ee432b4fb3d26b`

Bu blok verisi doğrudan iş ispatı ile alakalıydı.

### İş ispatındaki iş {#the-work}

Ethash olarak bilinen iş ispatı protokolü, madencilerin bir blokun nonce değerini bulmak için zorlu bir deneme yanılma yarışına girmesini gerektiriyordu. Zincire yalnızca geçerli bir nonce değerine sahip bloklar eklenebiliyordu.

Bir blok oluşturmak için yarışırken, bir madenci art arda bir veri kümesi koyuyordu; bu veri kümesini yalnızca tam zinciri indirip çalıştırarak (tıpkı bir madencinin yaptığı gibi) matematiksel bir fonksiyon aracılığıyla elde edebiliyordunuz. Veri kümesi, blok zorluğu tarafından belirlenen bir hedef nonce değeri altında bir mixHash üretmek için kullanıldı. Bunu yapmanın en iyi yolu deneme yanılmadır.

Zorluk, karma için hedefi belirledi. Hedef ne kadar düşükse, geçerli karma kümesi o kadar küçük olur. Bir kere oluşturulduktan sonra, diğer madencilerin ve istemcilerin doğrulaması inanılmaz derecede kolay oluyordu. Bir işlem bile değişseydi, karma tamamen değişik olurdu, bu da dolandırıcılık olduğunu gösterirdi.

Karma, dolandırıcılığın fark edilmesini kolaylaştırır. Ancak bir süreç olarak iş ispatı, zincire yönelik saldırılara karşı da büyük bir caydırıcıydı.

### İş ispatı ve güvenlik {#security}

Madenciler bu işi ana Ethereum zincirinde yapmaya teşvik ediliyordu. Madencilerin bir alt kümesinin kendi zincirlerini kurması - ki bu sisteme zarar verir - için çok az teşvik vardı. Blok zincirler, gerçeğin kaynağı olarak tek bir duruma sahip olmaya güvenir.

İş ispatının amacı, zinciri uzatmaktı. En fazla hesaplama işini yapan zincir en uzun zincir olduğu için en çok onun geçerli olduğuna inanılırdı. Ethereum'un iş ispatı sisteminde; işlemleri silen, sahte işlemler oluşturan veya ikinci bir zincir yürüten yeni bloklar oluşturmak neredeyse imkansızdı. Bunun nedeni, kötü niyetli bir madencinin her zaman blokun nonce değerini herkesten daha hızlı çözmesi gerekmesiydi.

Kötü niyetli bir madencinin, kötü niyetli ve geçerli bloklar çıkarabilmesi için sürekli olarak ağın madencilik gücünün %51'inden fazlasına ihtiyacı vardı. Bu kadar "iş" çok pahalı işlem gücü gerektirir ve harcanan enerji; bir saldırıda elde edilen kazanımdan daha ağır basmış bile olabilir.

### İş ispatı ekonomisi {#economics}

İş ispatı ayrıca sisteme yeni para birimi çıkartmaktan ve madencileri işi yapmaya teşvik etmekten de sorumluydu.

[Constantinople yükseltmesinden](/history/#constantinople) bu yana başarılı bir blok oluşturan madencilere, iki yeni basılmış Ether ve işlem ücretlerinin bir kısmı verilirdi. Ommer blokları da 1,75 Ether'i telafi etti. Ommer blokları, bir madenci tarafından pratik olarak yaklaşık aynı zamanda başka bir madencinin kurallı bloku oluşturmasıyla oluşturulan geçerli bloklardı ve bu blok en sonunda hangi zincirin üzerine ilkinin inşa edildiğine göre belirlendi. Ommer blokları genellikle ağ gecikmesi sebebiyle gerçekleşirdi.

## Kesinlik {#finality}

Bir işlem, değişemeyen bir blokun parçası olduğunda Ethereum üzerinde bir "kesinliği" vardır.

Madenciler merkeziyetsiz bir şekilde çalıştıkları için, aynı anda iki geçerli blok çıkarılabiliyordu. Bu geçici bir çatal oluşturur. Zamanla, sıradaki bloklar kazılıp eklendikten sonra bu zincirlerden biri daha uzun hale gelmiş ve kabul edilen zincir haline gelmiştir.

İşleri daha da karmaşıklaştıran şekilde, geçici çatalda reddedilen işlemler kabul edilen zincire dahil edilmemiş olabilir. Bu, tersine dönebileceği anlamına gelir. Dolayısıyla kesinlik, geri dönüşü olmayan bir işlemi düşünmeden önce beklemeniz gereken süreyi ifade eder. Önceki iş ispatı Ethereum'u altında; spesifik `N` bloku üzerine ne kadar fazla blok madenciliği yapılırsa `N`'deki yürütmelerin güvenilirliği o denli artar ve geri çevrilmezlerdi. Şimdi hisse ispatıyla kesinlik, olasılıktan ziyade blokun bir niteliği halinde kesindir.

## İş ispatı enerji kullanımı {#energy}

İş ispatıyla ilgili büyük bir eleştiri, iş ispatının ağı güvende tutması için gereken enerji miktarı hakkındadır. Güvenlik ve merkeziyetsizliği sürdürmek için is ispatındaki Ethereum, büyük miktarda eneji tüketti. Hisse ispatına geçmeden kısa süre önce Ethereum madencileri toplu olarak yaklaşık 70 TWh/yıl kadar enerji (18 Temmuz 2022'de [digiconomist](https://digiconomist.net/)'e göre Çek Cumhuriyeti ile neredeyse aynı) harcardı.

## Artıları ve eksileri {#pros-and-cons}

| Artıları                                                                                                                                                                                                                             | Eksileri                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Emek ispatı tarafsızdır. Başlamak için ETH'ye ihtiyacınız yoktur ve blok ödülleri 0 ETH'den artı bakiyeye geçmenize izin verir. [Hisse ispatı](/developers/docs/consensus-mechanisms/pos/) ile başlamak için ETH'ye ihtiyacınız var. | İş ispatı çok fazla enerji kullandığı için çevreye zararlıdır.                                                                                                            |
| İş ispatı, Bitcoin ve Ethereum'u uzun yıllar boyunca güvenli ve merkeziyetsiz hâlde tutan denenmiş ve test edilmiş bir mutabakat mekanizmasıdır.                                                                                     | Madencilik yapmak istiyorsanız, ihtiyacınız olan özel ekipman o kadar özeldir ki büyük bir yatırım yapmanız gerekmektedir.                                                |
| Hisse ispatı ile karşılaştırıldığında, uygulanması nispeten kolaydır.                                                                                                                                                                | Artan bilgi işlem ihtiyacı nedeniyle, madencilik havuzları potansiyel olarak madencilik sektörüne hükmedebilir ve bu da merkezileşme ve güvenlik risklerine yol açabilir. |

## Hisse ispatı ile karşılaştırıldığında {#compared-to-pos}

Yüksek düzeyde, hisse ispatı ile iş ispatı birbiriyle aynı nihai hedefe sahiptir: merkeziyetsiz ağın, güvenli bir şekilde mutabakata varmasına yardımcı olmak. Ancak süreç ve personel açısından bazı farklılıkları vardır:

- Hisse ispatı, stake edilen ETH için bilgi işlem gücünün önemini ortadan kaldırıyor.
- Hisse ispatı, madencileri doğrulayıcılarla değiştirir. Doğrulayıcılar, yeni bloklar oluşturma kabiliyetini etkinleştirmek için ETH'lerini stake ederler.
- Doğrulayıcılar blok oluşturmak için rekabet etmezler, bunun yerine bir algoritma tarafından rastgele seçilirler.
- Kesinlik daha açıktır: Belirli kontrol noktalarında, 2/3 doğrulayıcı bloğun durumu üzerinde anlaşmaya varırsa, blok "kesin" olarak kabul edilir. Doğrulayıcılar, tüm stake ettiklerini buna yatırmak zorunda oldukları için zincirde gizlice anlaşmaya çalışırlarsa tüm stake ettiklerini kaybederler.

[Hisse ispatı hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pos/)

## Görsel olarak öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Daha fazla bilgi {#further-reading}

- [Çoğunluk saldırısı](https://en.bitcoin.it/wiki/Majority_attack)
- [Uzlaşma kesinliği hakkında](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Videolar {#videos}

- [İş ispatı protokollerinin teknik bir açıklaması](https://youtu.be/9V1bipPkCTU)

## İlgili konular {#related-topics}

- [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/)
- [Hisse ispatı](/developers/docs/consensus-mechanisms/pos/)
- [Yetki kanıtı](/developers/docs/consensus-mechanisms/poa/)
