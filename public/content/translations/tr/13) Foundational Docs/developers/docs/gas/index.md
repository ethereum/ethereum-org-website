---
title: Gaz ve ücretler
description:
lang: tr
---

Gaz, Ethereum ağı için çok önemlidir. Arabaların benzinle çalıştığı gibi Ethereum ağı da gaz ile çalışır.

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [işlemler](/developers/docs/transactions/) ve [EVM](/developers/docs/evm/) hakkında bilgi edinmenizi öneririz.

## Gaz nedir? {#what-is-gas}

Gaz, Ethereum ağında belirli işlemleri yürütmek için gereken bilgi işlem harcamasının miktarını ölçen birimi ifade eder.

Her Ethereum işlemi çalışabilmek için bilgi işlem kaynaklarına ihtiyaç duyduğu için, söz konusu kaynaklar Ethereum'un spamlara karşı kırılgan olmadığı ve ne kadar bilgi işlem tekrarı olursa olsun takılmayacağından emin olmak için bu kaynaklar satın alınmalıdır. Bilgi işlem için ödenen ücret bir gaz ücreti formu gibi gösterilir.

Gaz ücreti **bir işlemin yapılabilmesi için kullanılan gaz miktarı ve bir birim gazın ücretinin çarpımıdır**. Ücret işlem başarılı da olsa başarısız da olsa ödenir.

![EVM operasyonlarında gazın nerede gerekli olduğunu gösteren diyagram](./gas.png) _Diyagram [Ethereum EVM resmediciden](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) uyarlanmıştır_

Gaz ücretleri Ethereum'un yerel para birimi olan ether (ETH) ile ödenmelidir. Gaz ücretlerinden genellikle gweide'den (bir ETH zümresi) bahsedilir. Her gwei Ethereumun 1 milyarda biridir, ETH (0,000000001 ETH ya da 10<sup>-9</sup> ETH).

Örneğin, gazınızın maliyeti 0,000000001 ether demek yerine, gazınızın maliyetinin 1 gwei olduğunu söyleyebilirsiniz.

Gwei kelimesi "giga-wei"nin sıkıştırılmış halidir, "milyar wei" anlamına gelir. Bir gwei 1 milyar weiye eşittir. Wei'nin kendisi (adını [b-money](https://www.investopedia.com/terms/b/bmoney.asp) yaratıcısı [Wei Dai](https://wikipedia.org/wiki/Wei_Dai)'den almıştır) ETH'nin en küçük birimidir.

## Gaz Ücretleri nasıl hesaplanır? {#how-are-gas-fees-calculated}

Bir işlem ibraz ederken ödemeye niyetli olduğunuz gaz ücretini kendiniz belirlersiniz. Belli bir gaz miktarını belirleyerek, bir sonraki blokta işleminizin dahil edilmesi için bir teklif veriyorsunuz. Eğer çok düşük bir teklif verirseniz, doğrulayıcıların sizin işleminizi dahil etme ihtimali daha azdır, yani işleminiz ya geç gerçekleşecektir ya da hiç gerçeklemeyecektir. Eğer çok fazla teklif verirseniz de, biraz ETH kaybedebilirsiniz. Yani ne kadar ödemeniz gerektiğine nasıl karar verebilirsiniz?

Ödediğiniz toplam gaz iki bileşene bölünür: `ana ücret` ve `öncelik ücreti` (bahşiş).

`Ana ücret` protokol tarafından belirlenir, işleminizin geçerli sayılabilmesi için en azından bu miktarın tamamını ödemeniz gerekir. `Öncelik ücreti` ise ana ücrete eklediğiniz ve işleminizi bir sonraki bloka dahil etmeleri konusunda doğrulayıcıları etkileme amaçlı bir bahşiştir.

Sadece `ana ücreti` ödeyen bir işlem teknik olarak geçerlidir fakat muhtemelen dahil edilmeyecektir çünkü doğrulayıcıların onları diğerlerinin yerine seçmesi için hiçbir teşvikleri yoktur. Doğru `öncelik` bahşişi işleminizi gönderdiğiniz sıradaki ağ kullanımına göre belirlenir, eğer çok fazla talep varsa `önceliğinizi` yüksek ayarlamanız gerekebilir, ancak talep azsa daha az ödeyebilirsiniz.

Örnek olarak, diyelim ki Jordan'ın Taylor'a 1 ETH ödemesi gerekiyor. Bir ETH transferi 21.000 birim gaz gerektirir ve ana ücret de 10 gweidir. Jordan 2 gwei'lik bir bahşiş ekler.

Tüm ücret artık şuna eşit olurdu:

`kullanılan gaz birimi * (ana ücret+ bahşiş) değerine karşılık gelir`

`ana ücret` protokol tarafından seçilirken `öncelik ücreti` kullanıcının doğrulayıcıya ödediği değerdir.

yani `21.000 * (10 + 2) = 252.000 gwei` (0,000252 ETH).

Jordan parayı gönderdiğinde, Jordan'ın hesabından 1,000252 ETH düşülecek. Taylor'a 1,0000 ETH yatırılacak. Doğrulayıcı 0,000042 ETH'lik bir bahşiş alacak. 0,00021 ETH'lik `ana ücret` yanar.

### Ana ücret {#base-fee}

Her blokun bir rezerv fiyatı niteliğinde bir ana ücreti vardır. Bir bloka dahil edilmeye uygun olmak için, gaz başına teklif edilen fiyatın en azından ana ücrete eşit olması gerekir. Ana ücret, mevcut bloktan bağımsız olarak hesaplanır ve bunun yerine önündeki bloklar tarafından belirlenir ve bu da kullanıcılar için işlem ücretlerini daha öngörülebilir hale getirir. Blok oluşturudluğunda bu **ana ücret "yanar"** ve döngüden silinir.

Ana ücret, önceki blokun boyutunu (tüm işlemler için kullanılan gaz miktarını) hedef boyutla karşılaştıran bir formülle hesaplanır. Hedef blok boyutu aşılırsa ana ücret blok başına maksimum %12,5 oranında artacaktır. Bu katlanarak büyüme, blok boyutunun süresiz olarak yüksek kalmasını ekonomik olarak imkânsız hale getiriyor.

| Blok Numarası | Dahil Edilen Gaz | Ücret Artışı | Mevcut Taban Ücret |
| ------------- | ----------------:| ------------:| ------------------:|
| 1             |        15 milyon |           0% |           100 gwei |
| 2             |        30 milyon |           0% |           100 gwei |
| 3             |        30 milyon |        %12,5 |         112,5 gwei |
| 4             |        30 milyon |        %12,5 |         126,6 gwei |
| 5             |        30 milyon |        %12,5 |         142,4 gwei |
| 6             |        30 milyon |        %12,5 |         160,2 gwei |
| 7             |        30 milyon |        %12,5 |         180,2 gwei |
| 8             |        30 milyon |        %12,5 |         202,7 gwei |

Yukarıdaki tabloyu takip ederek: 9 numaralı blokta bir işlem oluşturmak için bir cüzdan, kullanıcıya bir sonraki bloka eklenecek **maksimum ana ücretin** `mevcut ana ücret * %112,5` veya `202,7 gwei * %112,5 = 228,1 gwei` olduğunu kesin olarak bildirecektir.

Ayrıca, blok başlatılırken oluşan ana ücretin artışı sebebiyle uzun ve esnek blok artışları görmemizin pek olası olmadığına da dikkat etmek önemlidir.

| Blok Numarası | Dahil Edilen Gaz | Ücret Artışı | Mevcut Taban Ücret |
| ------------- | ----------------:| ------------:| ------------------:|
| 30            |        30 milyon |        %12,5 |        2705,6 gwei |
| ...           |              ... |        %12,5 |                ... |
| 50            |        30 milyon |        %12,5 |       28531,3 gwei |
| ...           |              ... |        %12,5 |                ... |
| 100           |        30 milyon |        %12,5 |    10302608,6 gwei |

### Öncelik ücreti (bahşişler) {#priority-fee}

Öncelik ücreti (bahşiş) ise doğrulayıcıları bir işlemi bloka koyması için teşvik eder. Bahşişler olmadan, doğrulayıcılar boş blokları kazmayı ekonomik olarak mantıklı bulurlar çünkü onlardan da aynı blok ödülünü kazanırlar. Küçük bahşişler doğrulayıcılara bir işlemi dahil etmek için küçük bir teşvik verir. Tercihen bloktaki diğer işlemlerden önce uygulanacak işlemler için rekabet edilen tercihlerin önüne geçme yolu olarak daha büyük bahşiş eklemek denenebilir.

### Maksimum ücret {#maxfee}

Ağ üzerinde bir işlem yürütmek için kullanıcılar, işlemlerinin yürütülmesi için ödemek istedikleri maksimum limiti belirleyebilirler. Bu isteğe bağlı parametre, `maxFeePerGas` olarak bilinir. Bir işlemin gerçekleşmesi için maksimum ücretin, ana ücret ve bahşiş toplamını aşması gerekir. Maksimum ücret ile ana ücret ve bahşiş toplamı arasındaki fark, işlemi gönderene iade edilir.

### Blok boyutu {#block-size}

Her blokun hedef boyutu 15 milyon gazdır, ancak blokların boyutu, 30 milyon gaz blok sınırına kadar (hedef blok boyutunun 2 katı) ağ talebine göre artacak veya azalacaktır. Protokol, _tâtonnement_ süreci ile ortalama 15 milyonluk bir denge bloku boyutuna ulaşır. Bu, blok boyutunun hedef blok boyutundan büyük olması durumunda, protokolün bir sonraki blok için ana ücreti artıracağı anlamına gelir. Benzer şekilde, blok boyutu hedef blok boyutundan küçükse protokol ana ücreti düşürür. Ana ücretin ayarlandığı miktar, mevcut blok boyutunun hedeften ne kadar uzak olduğu ile orantılıdır. [Bloklar hakkında daha fazlası](/developers/docs/blocks/).

### Pratikte gaz ücretlerini hesaplamak {#calculating-fees-in-practice}

Açık bir şekilde işlemin uygulanması için ne kadar ödemek istediğinizi belirtebilirsiniz. Ancak, çoğu sağlayıcı kullanıcıları üzerlerine binecek kompleks yükten kurtarmak için otomatik olarak kararlaştırılan ve tavsiye edilen bir işlem ücreti belirleyecektir (ana ücret+önerilen öncelik ücreti).

## Gaz ücretleri neden var? {#why-do-gas-fees-exist}

Kısacası, gas ücretleri Ethereum ağının güvenli kalmasına yardımcı olur. Ağda yürütülen her hesaplama için bir ücret talep ederek, kötü niyetli kişilerin ağa spam göndermesini önlüyoruz. Kazara veya düşmanca sonsuz döngüleri veya koddaki diğer hesaplama israfını önlemek için, her işlemin kullanabileceği kod yürütmenin hesaplama adımına bir sınır koyması gerekir. Temel bilgi işlem birimi "gaz"dır.

Bir işlem bir limit içerse de, işlemde kullanılmayan herhangi bir gaz kullanıcıya iade edilir (yani `maksismum ücret - (ana ücret + bahşiş)` iade edilir).

![Kullanılmayan gazın nasıl iade edildiğini gösteren diyagram](../transactions/gas-tx.png) _Diyagram [Ethereum EVM resmediciden](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) uyarlanmıştır_

## Gaz limiti nedir? {#what-is-gas-limit}

Gaz limitinden kasıt bir işlemde tüketebileceğiniz maksimum gaz miktarıdır. [Akıllı sözleşmeleri](/developers/docs/smart-contracts/) içeren daha karmaşık işlemler, daha fazla hesaplama çalışması gerektirdiğinden, basit bir ödemeden daha yüksek bir gaz limiti gerektirir. Standart bir ETH transferi, 21.000 birim gaz limiti gerektirir.

Örneğin, basit bir ETH transferi için 50.000 gaz limiti koyarsanız, EVM 21.000 tüketir ve kalan 29.000'i geri alırsınız. Ancak, örneğin basit bir ETH transferi için 20.000'lik bir gaz limiti gibi çok az gaz belirtirseniz, EVM işlemi gerçekleştirmeye çalışırken 20.000 gaz biriminizi tüketir, ancak işlemi tamamlamaz. Ethereum Sanal Makinesi daha sonra herhangi bir değişikliği geri alır, ancak doğrulayıcı zaten 20000 gaz birimi değerinde iş yaptığı için o gaz tüketilmişir.

## Gaz ücretleri neden bu kadar yükselebiliyor? {#why-can-gas-fees-get-so-high}

Yüksek gaz ücretleri, Ethereum'un popülaritesinden kaynaklanmaktadır. Eğer çok fazla talep varsa, kullanıcılar daha yüksek bahşiş miktarları teklif edip diğer kullanıcıların işlemlerini saf dışı bırakmaya çalışmalıdır. Daha yüksek bahşiş, işleminizin bir sonraki bloka geçmesini daha olası hale getirebilir. Ayrıca, daha kompleks akıllı sözleşme uygulamaları fonksiyonlarını desteklemek için bir çok işlem yapıyor olabilirler, bu da onların çok fazla gaz tüketmesine sebep olur.

## Gaz maliyetlerini azaltmak için girişimler {#initiatives-to-reduce-gas-costs}

Ethereum [ölçeklenebilirlik yükseltmeleri](/roadmap/) nihayetinde platformun saniyede binlerce işlemi işlemesini ve küresel olarak ölçeklendirmesini sağlayacak olan bazı gaz ücreti sorunlarını çözecektir.

Katman 2 ölçeklendirme; gaz maliyetlerini, kullanıcı deneyimini ve ölçeklenebilirliği büyük ölçüde iyileştirmeye yönelik birincil bir girişimdir. [Katman 2 ölçeklendirme hakkında daha fazlası](/developers/docs/scaling/#layer-2-scaling).

## Gaz ücretlerini takip etme {#monitoring-gas-fees}

ETH'nizi daha ucuza gönderebilmeniz için gaz fiyatlarını takip etmek istiyorsanız, aşağıdakiler gibi birçok farklı araç kullanabilirsiniz:

- [Etherscan](https://etherscan.io/gastracker) _İşlem gaz fiyatı tahmincisi_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Gaz tahmin eden, hem Tip 0 eski işlemleri hem de Tip 2 EIP-1559 işlemlerini destekleyen Chrome uzantısı._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Ana Ağ, Arbitrum ve Polygon üzerindeki farklı işlem türleri için yerel para biriminizde gaz ücretlerini hesaplayın._

## İlgili araçlar {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _Blocknative'in küresel bellek havuzu veri platformu tarafından desteklenen gaz tahmin API'sı_

## Daha fazla bilgi {#further-reading}

- [Ethereum Gazı Açıklaması](https://defiprime.com/gas)
- [Akıllı Sözleşmelerinizin gaz tüketimini azaltmak](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Hisse İspatına karşı İş İspatı](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)
- [Geliştiriciler İçin Gaz Optimizasyonu](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [EIP-1559 dokümanları](https://eips.ethereum.org/EIPS/eip-1559).
- [Tim Beiko'nun EIP-1559 Kaynakları](https://hackmd.io/@timbeiko/1559-resources).
