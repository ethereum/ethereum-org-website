---
title: İş ispatı (PoW)
description: İş ispatı mutabakat protokolünün ve Ethereum'daki rolünün bir açıklaması.
lang: tr
incomplete: true
---

Ethereum, Bitcoin gibi şu anda **[İş ispatı (PoW)](https://wikipedia.org/wiki/Proof_of_work)** adlı bir mutabakat protokolünü kullanıyor. Bu, Ethereum ağının düğümlerinin, Ethereum blok zincirinde kaydedilen tüm bilgilerin durumu üzerinde anlaşmasını sağlar ve belirli türdeki ekonomik saldırıları önler.

Önümüzdeki sene, **[Hisse ispatı (PoS)](/developers/docs/consensus-mechanisms/pos)** aşamalı olarak iş ispatının yerini alacaktır. Hisse ispatına geçiş ayrıca Ethereum madenciliğini de aşamalı olarak durduracaktır. [Birleştirme hakkında daha fazla bilgi](/upgrades/merge/)

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için, önce [işlemleri](/developers/docs/transactions/), [blokları](/developers/docs/blocks/) ve [mutabakat mekanizmalarını](/developers/docs/consensus-mechanisms/) okumanızı öneririz.

## İş ispatı (PoW) nedir? {#what-is-pow}

İş ispatı, merkeziyetsiz Ethereum ağının mutabakata varmasını sağlayan veya hesap bakiyeleri ve işlem sırası gibi şeyler üzerinde anlaşmasını sağlayan mekanizmadır. Bu, kullanıcıların paralarını "çifte harcamasını" önler ve Ethereum zincirine saldırmanın veya zinciri manipüle etmenin son derece zor olmasını sağlar.

## İş ispatı ve madencilik {#pow-and-mining}

İş ispatı, madencilerin yaptığı işin zorluğunu ve kurallarını belirleyen temel algoritmadır. Madencilik "iş"in kendisidir. Zincire geçerli bloklar ekleme eylemidir. Bu önemlidir çünkü zincirin uzunluğu ağın doğru Ethereum zincirini takip etmesine ve Ethereum'un mevcut durumunu anlamasına yardımcı olur. Ne kadar çok "iş" yapılırsa, zincir o kadar uzun ve blok numarası ne kadar yüksek olursa, ağ mevcut durumdan o kadar emin olabilir.

[Madencilik hakkında daha fazlası](/developers/docs/consensus-mechanisms/pow/mining/)

## Ethereum'un iş ispatı nasıl çalışır? {#how-it-works}

Ethereum işlemleri bloklar hâlinde işlenir. Her blokta şunlar bulunur:

- blok zorluğu – örneğin: 3.324.092.183.262.715
- mixHash – örneğin: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – örneğin: `0xd3ee432b4fb3d26b`

Bu blok verisi doğrudan iş ispatı ile alakalıdır.

### İş ispatındaki iş {#the-work}

Ethash olarak bilinen iş ispatı protokolü, madencilerin bir bloğun nonce değerini bulmak için zorlu bir deneme yanılma yarışına girmesini gerektirir. Zincire yalnızca geçerli bir nonce değerine sahip bloklar eklenebilir.

Bir blok oluşturmak için yarışırken, bir madenci art arda bir veri kümesi koyacaktır; bu veri kümesini yalnızca tam zinciri indirip çalıştırarak (bir madencinin yaptığı gibi) matematiksel bir fonksiyon aracılığıyla elde edebilirsiniz. Veri kümesi, blok zorluğu tarafından emredildiği gibi hedef nonce değeri altında bir mixHash üretmek için kullanılır. Bunu yapmanın en iyi yolu deneme yanılma yöntemidir.

Zorluk, hash için hedefi belirler. Hedef ne kadar düşükse, geçerli hash kümesi o kadar küçük olur. Oluşturulduktan sonra, diğer madencilerin ve istemcilerin doğrulaması inanılmaz derecede kolaydır. Bir işlem bile değişseydi, hash tamamen değişik olurdu, bu da sahtekârlık olduğunu gösterirdi.

Hash, dolandırıcılığın fark edilmesini kolaylaştırır. Ancak bir süreç olarak iş ispatı, zincire yönelik saldırılara karşı da büyük bir caydırıcıdır.

### İş ispatı ve güvenlik {#security}

Madenciler bu işi ana Ethereum zincirinde yapmaya teşvik edilir. Madencilerin bir alt kümesinin kendi zincirlerini kurmaları için çok az teşvik vardır: Bu, sistemi baltalar. Blok zincirleri, gerçeğin kaynağı olarak tek bir duruma sahip olmaya bağlıdır. Ve kullanıcılar her zaman en uzun veya "en ağır" zinciri seçecektir.

İş ispatının amacı, zinciri uzatmaktır. En uzun zincir, geçerliliği en inandırıcı olanıdır çünkü en fazla bilgi işlem işi yapılmış olan zincirdir. Ethereum'un iş ispatı sisteminde; işlemleri silen, sahte işlemler oluşturan veya ikinci bir zincir yürüten yeni bloklar oluşturmak neredeyse imkansızdır. Bunun nedeni, kötü niyetli bir madencinin her zaman bloğun nonce değerini herkesten daha hızlı çözmesi gerekmesidir.

Sürekli olarak kötü niyetli ancak geçerli bloklar oluşturabilmek için, diğer herkesi yenmek için ağ madenciliği gücünün %51'inden fazlasına ihtiyacınız olacaktır. Bu miktarda "iş" yapabilmek için çok fazla bilgi işlem gücüne ihtiyacınız olur. Ve harcanan enerji, bir saldırıda elde edeceğiniz kazançlardan daha ağır basabilir.

### İş ispatı ekonomisi {#economics}

İş ispatı ayrıca sisteme yeni para birimi vermekten ve madencileri işi yapmaya teşvik etmekten de sorumludur.

Başarılı şekilde bir blok oluşturan madenciler, taze basılmış iki ETH ile ödüllendirilirler ancak ana ücret yakıldığı için artık tüm işlem ücretlerini almazlar, bahşiş ve blok ödülü madenciye gider. Bir madenci ayrıca bir amca bloğu için de 1,75 ETH alabilir. Amca blokları (Uncle blocks), pratik olarak başka bir madencinin başarılı bloğu kazmasıyla aynı anda başka bir madenci tarafından oluşturulan geçerli bloklardır. Amca blokları genellikle ağ gecikmesi sebebiyle gerçekleşir.

## Kesinlik {#finality}

Bir işlem, değişemeyen bir bloğun parçası olduğunda Ethereum üzerinde bir "kesinliği" vardır.

Madenciler merkeziyetsiz bir şekilde çalıştıkları için, aynı anda iki geçerli blok çıkarılabilir. Bu, geçici bir çatal oluşturur. Sonuç olarak, sonraki bir blok çıkarıldıktan ve eklendikten sonra bu zincirlerden birisi kabul edilen zincir olacak ve uzayacaktır.

Ancak geçici çatalda reddedilen işlemler, işleri daha da karmaşık hâle getirecek şekilde kabul edilen zincire dahil edilmiş olabilir. Bu, tersine dönebileceği anlamına gelir. Dolayısıyla kesinlik, bir işlemin tersine dönemeyeceğine kanaat getirmeden önce beklemeniz gereken süreyi ifade eder. Ethereum için önerilen süre, altı blok veya 1 dakikanın biraz üzerindedir. Altı bloktan sonra, işlemin başarılı olduğundan emin olabilirsiniz. Daha da emin olmak için daha uzun süre bekleyebilirsiniz.

Kesinlik, dapp tasarlarken göz önünde bulundurmanız gereken bir şeydir. Özellikle işlemin yüksek bir değere sahip olduğu durumlarda kullanıcılarınıza yanlış işlem bilgisi aktarmak, kullanıcı deneyimini olumsuz etkiler.

Unutmayın, bu zamanlama, bir işlemin bir madenci tarafından alınması için geçen süreyi içermez.

## İş ispatı enerji kullanımı {#energy}

İş ispatıyla ilgili büyük bir eleştiri, iş ispatının ağı güvende tutması için gereken enerji miktarı hakkındadır. İş ispatı bazında çalışan Ethereum, güvenliği ve merkeziyetsizliği sürdürmek için her yıl 73,2 TWh harcar, bu miktar Avusturya gibi orta büyüklükte bir ülkenin harcadığı enerjiye eşittir.

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

## İlgili Konular {#related-topics}

- [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/)
- [Hisse ispatı](/developers/docs/consensus-mechanisms/pos/)
