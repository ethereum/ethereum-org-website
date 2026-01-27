---
title: "Gaz ve ücretler"
metaTitle: "Ethereum gaz ve ücretleri: teknik genel bakış"
description: "Ethereum gaz ücretleri, nasıl hesaplandıkları ve ağ güvenliği ile işlem işlemedeki rolleri hakkında bilgi edinin."
lang: tr
---

Gaz, Ethereum ağı için çok önemlidir. Arabaların benzinle çalıştığı gibi Ethereum ağı da gaz ile çalışır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [işlemler](/developers/docs/transactions/) ve [EVM](/developers/docs/evm/) hakkında bilgi edinmenizi öneririz.

## Gaz nedir? {#what-is-gas}

Gaz, Ethereum ağında belirli işlemleri yürütmek için gereken bilgi işlem harcamasının miktarını ölçen birimi ifade eder.

Her Ethereum işlemi çalışabilmek için bilgi işlem kaynaklarına ihtiyaç duyduğu için, söz konusu kaynaklar Ethereum'un spamlara karşı kırılgan olmadığı ve ne kadar bilgi işlem tekrarı olursa olsun takılmayacağından emin olmak için bu kaynaklar satın alınmalıdır. Bilgi işlem için ödenen ücret bir gaz ücreti formu gibi gösterilir.

Gaz ücreti, **bir işlemi gerçekleştirmek için kullanılan gaz miktarının, birim gaz başına maliyet ile çarpımıdır**. Ücret işlem başarılı da olsa başarısız da olsa ödenir.

![EVM operasyonlarında gazın nerede gerekli olduğunu gösteren bir diyagram](./gas.png)
_Diyagram [Resimli Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) kaynağından uyarlanmıştır_

Gaz ücretleri Ethereum'un yerel para birimi olan ether (ETH) ile ödenmelidir. Gaz ücretlerinden genellikle gweide'den (bir ETH zümresi) bahsedilir. Her gwei Ethereumun 1 milyarda biridir, ETH (0,000000001 ETH ya da 10<sup>-9</sup> ETH).

Örneğin, gazınızın maliyeti 0,000000001 ether demek yerine, gazınızın maliyetinin 1 gwei olduğunu söyleyebilirsiniz.

Gwei kelimesi "giga-wei"nin sıkıştırılmış halidir, "milyar wei" anlamına gelir. Bir gwei 1 milyar weiye eşittir. Wei'nin kendisi ([b-money](https://www.investopedia.com/terms/b/bmoney.asp) para biriminin yaratıcısı [Wei Dai](https://wikipedia.org/wiki/Wei_Dai)'den adını almıştır) ETH'nin en küçük birimidir.

## Gaz Ücretleri nasıl hesaplanır? {#how-are-gas-fees-calculated}

Bir işlem ibraz ederken ödemeye niyetli olduğunuz gaz ücretini kendiniz belirlersiniz. Belli bir gaz miktarını belirleyerek, bir sonraki blokta işleminizin dahil edilmesi için bir teklif veriyorsunuz. Eğer çok düşük bir teklif verirseniz, doğrulayıcıların sizin işleminizi dahil etme ihtimali daha azdır, yani işleminiz ya geç gerçekleşecektir ya da hiç gerçeklemeyecektir. Eğer çok fazla teklif verirseniz de, biraz ETH kaybedebilirsiniz. Yani ne kadar ödemeniz gerektiğine nasıl karar verebilirsiniz?

Ödediğiniz toplam gaz iki bileşene ayrılır: `taban ücret` ve `öncelik ücreti` (bahşiş).

`Taban ücret` protokol tarafından belirlenir; işleminizin geçerli sayılması için en az bu tutarı ödemeniz gerekir. `Öncelik ücreti`, işleminizi doğrulayıcılar için cazip hale getirmek amacıyla taban ücrete eklediğiniz bir bahşiştir, böylece doğrulayıcılar işleminizi bir sonraki bloğa dahil etmek için seçerler.

Yalnızca `taban ücreti` ödeyen bir işlem teknik olarak geçerlidir ancak doğrulayıcılara onu başka bir işlem yerine seçmeleri için hiçbir teşvik sunmadığından dahil edilmesi olası değildir. 'Doğru' `öncelik` ücreti, işleminizi gönderdiğiniz andaki ağ kullanımına göre belirlenir. Eğer çok fazla talep varsa, `öncelik` ücretinizi daha yüksek ayarlamanız gerekebilir, ancak daha az talep olduğunda daha az ödeyebilirsiniz.

Örnek olarak, diyelim ki Jordan'ın Taylor'a 1 ETH ödemesi gerekiyor. Bir ETH transferi 21.000 birim gaz gerektirir ve ana ücret de 10 gweidir. Jordan 2 gwei'lik bir bahşiş ekler.

Tüm ücret artık şuna eşit olurdu:

`kullanılan gaz birimi * (taban ücret + öncelik ücreti)`

`taban ücret` protokol tarafından belirlenen bir değerken, `öncelik ücreti` kullanıcı tarafından doğrulayıcıya bahşiş olarak belirlenen bir değerdir.

ör., `21,000 * (10 + 2) = 252,000 gwei` (0,000252 ETH).

Jordan parayı gönderdiğinde, Jordan'ın hesabından 1,000252 ETH düşülecek. Taylor'a 1,0000 ETH yatırılacak. Doğrulayıcı 0,000042 ETH'lik bir bahşiş alacak. 0,00021 ETH'lik `taban ücret` yakılır.

### Taban ücret {#base-fee}

Her blokun bir rezerv fiyatı niteliğinde bir ana ücreti vardır. Bir bloka dahil edilmeye uygun olmak için, gaz başına teklif edilen fiyatın en azından ana ücrete eşit olması gerekir. Taban ücret, mevcut bloktan bağımsız olarak hesaplanır ve bunun yerine kendisinden önceki bloklar tarafından belirlenir, bu da işlem ücretlerini kullanıcılar için daha öngörülebilir hale getirir. Blok oluşturulduğunda bu **taban ücret "yakılır"** ve dolaşımdan kaldırılır.

Taban ücret, önceki bloğun boyutunu (tüm işlemler için kullanılan gaz miktarı) hedef boyutla (gaz limitinin yarısı) karşılaştıran bir formülle hesaplanır. Hedef blok boyutunun hedefin üstünde veya altında olmasına bağlı olarak taban ücret, blok başına en fazla %12,5 oranında artacak veya azalacaktır. Bu katlanarak büyüme, blok boyutunun süresiz olarak yüksek kalmasını ekonomik olarak imkânsız hale getiriyor.

| Blok Numarası | Dahil Edilen Gaz | Ücret Artışı | Mevcut Taban Ücret |
| ------------- | ---------------: | -----------: | -----------------: |
| 1             |              18M |           %0 |           100 gwei |
| 2             |              36M |           %0 |           100 gwei |
| 3             |              36M |        %12,5 |         112,5 gwei |
| 4             |              36M |        %12,5 |         126,6 gwei |
| 5             |              36M |        %12,5 |         142,4 gwei |
| 6             |              36M |        %12,5 |         160,2 gwei |
| 7             |              36M |        %12,5 |         180,2 gwei |
| 8             |              36M |        %12,5 |         202,7 gwei |

Yukarıdaki tabloda, gaz limiti olarak 36 milyon kullanılarak bir örnek gösterilmiştir. Bu örneği takiben, 9 numaralı blokta bir işlem oluşturmak için bir cüzdan, kullanıcıya bir sonraki bloğa eklenecek **maksimum taban ücretin** `mevcut taban ücret * %112,5` veya `202,7 gwei * %112,5 = 228,1 gwei` olduğunu kesin olarak bildirecektir.

Ayrıca, blok başlatılırken oluşan ana ücretin artışı sebebiyle uzun ve esnek blok artışları görmemizin pek olası olmadığına da dikkat etmek önemlidir.

| Blok Numarası                                       |                                    Dahil Edilen Gaz | Ücret Artışı |                                  Mevcut Taban Ücret |
| --------------------------------------------------- | --------------------------------------------------: | -----------: | --------------------------------------------------: |
| 30                                                  |                                                 36M |        %12,5 |                                         2705,6 gwei |
| ... | ... |        %12,5 | ... |
| 50                                                  |                                                 36M |        %12,5 |                                        28531,3 gwei |
| ... | ... |        %12,5 | ... |
| 100                                                 |                                                 36M |        %12,5 |                                     10302608,6 gwei |

### Öncelik ücreti (bahşişler) {#priority-fee}

Öncelik ücreti (bahşiş), doğrulayıcıları, yalnızca blok gaz limitiyle kısıtlanmış bir bloktaki işlem sayısını en üst düzeye çıkarmaya teşvik eder. Bahşişler olmadan, rasyonel bir doğrulayıcı, doğrudan yürütme katmanı veya mutabakat katmanı cezası olmaksızın daha az sayıda, hatta sıfır işlem dahil edebilir, çünkü hisseleme ödülleri bir bloktaki işlem sayısından bağımsızdır. Ek olarak, bahşişler kullanıcıların aynı blok içinde öncelik için diğerlerinden daha yüksek teklif vermesine olanak tanır ve bu da aciliyeti etkili bir şekilde belirtir.

### Maksimum ücret {#maxfee}

Ağ üzerinde bir işlem yürütmek için kullanıcılar, işlemlerinin yürütülmesi için ödemek istedikleri maksimum limiti belirleyebilirler. Bu isteğe bağlı parametre `maxFeePerGas` olarak bilinir. Bir işlemin gerçekleşmesi için maksimum ücretin, ana ücret ve bahşiş toplamını aşması gerekir. Maksimum ücret ile ana ücret ve bahşiş toplamı arasındaki fark, işlemi gönderene iade edilir.

### Blok boyutu {#block-size}

Her bloğun hedef boyutu, mevcut gaz limitinin yarısıdır, ancak blokların boyutu, blok limitine ulaşılana kadar (hedef blok boyutunun 2 katı) ağ talebine göre artacak veya azalacaktır. Protokol, _tâtonnement_ süreci aracılığıyla hedefte bir denge ortalama blok boyutuna ulaşır. Bu, blok boyutunun hedef blok boyutundan büyük olması durumunda, protokolün bir sonraki blok için ana ücreti artıracağı anlamına gelir. Benzer şekilde, blok boyutu hedef blok boyutundan küçükse protokol ana ücreti düşürür.

Ana ücretin ayarlandığı miktar, mevcut blok boyutunun hedeften ne kadar uzak olduğu ile orantılıdır. Bu, boş bir blok için -%12,5'ten başlayan, hedef boyutta %0 olan ve gaz limitine ulaşan bir blok için +%12,5'e kadar çıkan doğrusal bir hesaplamadır. Gaz limiti, doğrulayıcı sinyallerine ve ağ yükseltmelerine bağlı olarak zamanla dalgalanabilir. [Gaz limitindeki değişiklikleri zaman içinde buradan görüntüleyebilirsiniz](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Bloklar hakkında daha fazla bilgi](/developers/docs/blocks/)

### Uygulamada gaz ücretlerini hesaplama {#calculating-fees-in-practice}

Açık bir şekilde işlemin uygulanması için ne kadar ödemek istediğinizi belirtebilirsiniz. Ancak, çoğu sağlayıcı kullanıcıları üzerlerine binecek kompleks yükten kurtarmak için otomatik olarak kararlaştırılan ve tavsiye edilen bir işlem ücreti belirleyecektir (ana ücret+önerilen öncelik ücreti).

## Gaz ücretleri neden var? {#why-do-gas-fees-exist}

Kısacası, gas ücretleri Ethereum ağının güvenli kalmasına yardımcı olur. Ağda yürütülen her hesaplama için bir ücret talep ederek, kötü niyetli kişilerin ağa spam göndermesini önlüyoruz. Kazara veya düşmanca sonsuz döngüleri veya koddaki diğer hesaplama israfını önlemek için, her işlemin kullanabileceği kod yürütmenin hesaplama adımına bir sınır koyması gerekir. Temel bilgi işlem birimi "gaz"dır.

Bir işlem bir limit içerse de işlemde kullanılmayan gaz kullanıcıya iade edilir (ör. `maksimum ücret - (taban ücret + bahşiş)` iade edilir).

![Kullanılmayan gazın nasıl iade edildiğini gösteren diyagram](../transactions/gas-tx.png)
_Diyagram [Resimli Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) kaynağından uyarlanmıştır_

## Gaz limiti nedir? {#what-is-gas-limit}

Gaz limitinden kasıt bir işlemde tüketebileceğiniz maksimum gaz miktarıdır. [Akıllı sözleşmeleri](/developers/docs/smart-contracts/) içeren daha karmaşık işlemler daha fazla hesaplama işi gerektirir, bu nedenle basit bir ödemeden daha yüksek bir gaz limiti gerektirirler. Standart bir ETH transferi, 21.000 birim gaz limiti gerektirir.

Örneğin, basit bir ETH transferi için 50.000 gaz limiti koyarsanız, EVM 21.000 tüketir ve kalan 29.000'i geri alırsınız. Ancak, çok az gaz belirtirseniz, örneğin basit bir ETH transferi için 20.000'lik bir gaz limiti, işlem doğrulama aşamasında başarısız olur. Bir bloğa dahil edilmeden önce reddedilecek ve gaz tüketilmeyecektir. Öte yandan, bir işlem yürütme sırasında gazı biterse (örneğin, bir akıllı sözleşme gazın tamamını yarı yolda kullanırsa), EVM herhangi bir değişikliği geri alır, ancak sağlanan tüm gaz yine de gerçekleştirilen iş için tüketilir.

## Gaz ücretleri neden bu kadar yükselebiliyor? {#why-can-gas-fees-get-so-high}

Yüksek gaz ücretleri, Ethereum'un popülaritesinden kaynaklanmaktadır. Eğer çok fazla talep varsa, kullanıcılar daha yüksek bahşiş miktarları teklif edip diğer kullanıcıların işlemlerini saf dışı bırakmaya çalışmalıdır. Daha yüksek bahşiş, işleminizin bir sonraki bloka geçmesini daha olası hale getirebilir. Ayrıca, daha kompleks akıllı sözleşme uygulamaları fonksiyonlarını desteklemek için bir çok işlem yapıyor olabilirler, bu da onların çok fazla gaz tüketmesine sebep olur.

## Gaz maliyetlerini düşürmeye yönelik girişimler {#initiatives-to-reduce-gas-costs}

Ethereum [ölçeklenebilirlik yükseltmeleri](/roadmap/) nihayetinde gaz ücreti sorunlarından bazılarını ele almalıdır, bu da platformun saniyede binlerce işlemi işlemesini ve küresel olarak ölçeklenmesini sağlayacaktır.

Katman 2 ölçeklendirme; gaz maliyetlerini, kullanıcı deneyimini ve ölçeklenebilirliği büyük ölçüde iyileştirmeye yönelik birincil bir girişimdir.

[Katman 2 ölçeklendirme hakkında daha fazla bilgi](/developers/docs/scaling/#layer-2-scaling)

## Gaz ücretlerini izleme {#monitoring-gas-fees}

ETH'nizi daha ucuza gönderebilmeniz için gaz fiyatlarını takip etmek istiyorsanız, aşağıdakiler gibi birçok farklı araç kullanabilirsiniz:

- [Etherscan](https://etherscan.io/gastracker) _İşlem gaz fiyatı tahmincisi_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Açık kaynaklı işlem gaz fiyatı tahmincisi_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _İşlem ücretlerini azaltmak ve tasarruf etmek için Ethereum ve L2 gaz fiyatlarını izleyin ve takip edin_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Hem Tip 0 eski işlemleri hem de Tip 2 EIP-1559 işlemlerini destekleyen gaz tahmini Chrome uzantısı._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Ana Ağ, Arbitrum ve Polygon'daki farklı işlem türleri için gaz ücretlerini yerel para biriminizde hesaplayın._

## İlgili araçlar {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _Blocknative'in küresel bellek havuzu veri platformu tarafından desteklenen gaz tahmin API'si_
- [Gas Network](https://gas.network) Zincir Üstü Gaz Kâhinleri. 35'ten fazla zincir için destek.

## Daha fazla kaynak {#further-reading}

- [Ethereum Gaz Açıklaması](https://defiprime.com/gas)
- [Akıllı Sözleşmelerinizin gaz tüketimini azaltma](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Geliştiriciler için Gaz Optimizasyon Stratejileri](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [EIP-1559 belgeleri](https://eips.ethereum.org/EIPS/eip-1559).
- [Tim Beiko'nun EIP-1559 Kaynakları](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Mekanizmaları Memlerden Ayırma](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
