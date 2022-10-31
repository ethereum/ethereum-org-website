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

Her Ethereum işleminin yürütülmesi için bilgi işlem kaynakları gerektiğinden, her işlem bir ücret gerektirir. Özetle gaz, Ethereum'da başarılı bir şekilde işlem yapmak için gereken ücreti ifade eder.

![EVM operasyonlarında gazın nerede gerekli olduğunu gösteren bir diyagram](./gas.png) _Diyagram [Ethereum EVM resmediciden](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) uyarlanmıştır_

Gaz ücretleri Ethereum'un yerel para birimi ether (ETH) ile ödenir. Gaz fiyatları, kendisi ETH'nin bir birimi olan Gwei'de belirtilir: Her Gwei, 0,000000001 ETH'ye (1<sup>-9</sup> ETH) eşittir. Örneğin, gazınızın maliyeti 0,000000001 ether demek yerine, gazınızın maliyetinin 1 gwei olduğunu söyleyebilirsiniz. "Gwei" kelimesinin kendisi "giga-wei" anlamına gelir ve gwei, 1.000.000.000 wei'ye eşittir. Wei'nin kendisi (adını [b-money](https://www.investopedia.com/terms/b/bmoney.asp) yaratıcısı [Wei Dai](https://wikipedia.org/wiki/Wei_Dai)'den almıştır) ETH'nin en küçük birimidir.

## Londra yükseltmesinden önce {#pre-london}

Ethereum ağındaki işlem ücretlerinin hesaplanma şekli, Ağustos 2021'deki [Londra Yükseltmesi](/history/#london) ile değişti. Eskiden işlerin nasıl yürüdüğüne dair bir özet:

Alice'in Bob'a 1 ETH ödemek zorunda olduğunu varsayalım. İşlemde gaz limiti 21.000 birim, gaz fiyatı ise 200 gwei'dir.

Toplam ücret şöyle olurdu: `Gas units (limit) * Gas price per unit` yani `21,000 * 200 = 4,200,000 gwei` veya 0.0042 ETH

Alice parayı gönderdiğinde, Alice'in hesabından 1,0042 ETH harcanır. Bob'a 1,0000 ETH yatırılır. Madenci 0,0042 ETH alır.

Bu video, gaza ve gazın neden var olduğuna dair kısa bir genel bakış sunar:

<YouTube id="AJvzNICwcwc" />

## Londra yükseltmesinden sonra {#post-london}

[Londra Yükseltmesi](/history/#london), Ethereum'un işlem ücreti mekanizmasını elden geçirerek Ethereum'da işlem yapmayı kullanıcılar için daha öngörülebilir hâle getirmek için 5 Ağustos 2021'de uygulandı. Bu değişikliğin getirdiği üst düzey faydalar arasında, daha iyi işlem ücreti tahmini, genellikle daha hızlı işlem dahil etme ve işlem ücretlerinin bir yüzdesini yakarak ETH ihracını dengeleme yer alıyor.

Londra ağ yükseltmesinden başlayarak, her bloğun bir taban ücreti vardır; bu bloğa dahil edilmek üzere gaz birimi başına minimum fiyat, ağ tarafından blok alanı talebine göre hesaplanır. İşlem ücretinin taban ücreti yakıldığı için kullanıcıların işlemlerinde de bir bahşiş (öncelik ücreti) belirlemeleri beklenir. Bahşiş, bloklar hâlinde kullanıcı işlemlerini yürüten ve yayan madenciler için telafi niteliğindedir ve bahşişin çoğu cüzdan tarafından otomatik olarak ayarlanması beklenir.

Toplam işlem ücretinin hesaplanması şu şekilde çalışır: `Gas units (limit) * (Base fee + Tip)`

Diyelim ki Jordan, Taylor'a 1 ETH ödemek zorunda. İşlemde gaz limiti 21.000 birim ve taban ücret 100 gwei'dir. Jordan 10 gwei'lik bir bahşiş ekler.

Yukarıdaki formülü kullanarak bunu `21,000 * (100 + 10) = 2,310,000 gwei` veya 0,00231 ETH olarak hesaplayabiliriz.

Jordan parayı gönderdiğinde, Jordan'ın hesabından 1,00231 ETH düşülecek. Taylor'a 1,0000 ETH yatırılacak. Madenci 0,00021 ETH bahşişini alır. 0,0021 ETH taban ücreti yakılır.

Ek olarak Jordan, işlem için bir maksimum ücret (`maxFeePerGas`) belirleyebilir. Maksimum ücret ile gerçek ücret arasındaki fark Jordan'a iade edilir, yani `refund = max fee - (base fee + priority fee)`. Jordan, işlemin yürütülmesi için ödenecek maksimum tutarı belirleyebilir ve işlem yürütüldüğünde taban ücretin "üstünde" ödeme yapmaktan endişe duymaz.

### Blok boyutu {#block-size}

Londra yükseltmesinden önce, Ethereum'un sabit boyutlu blokları vardı. Ağ talebinin yüksek olduğu zamanlarda bu bloklar tam kapasitede çalıştı. Sonuç olarak, kullanıcılar genellikle bir bloğa dahil olmak için yüksek talebin düşmesini beklemek zorunda kaldılar ve bu da kötü bir kullanıcı deneyimine yol açtı.

Londra Yükseltmesi, Ethereum'a değişken boyutlu bloklar getirdi. Her bloğun hedef boyutu 15 milyon gazdır, ancak blokların boyutu, 30 milyon gaz blok sınırına kadar (hedef blok boyutunun 2 katı) ağ talebine göre artacak veya azalacaktır. Protokol, _tâtonnement_ süreci ile ortalama 15 milyonluk bir denge bloğu boyutuna ulaşır. Bu, blok boyutunun hedef blok boyutundan büyük olması durumunda, protokolün bir sonraki blok için taban ücreti artıracağı anlamına gelir. Benzer şekilde, blok boyutu hedef blok boyutundan küçükse protokol taban ücretini düşürür. Taban ücretin ayarlandığı miktar, mevcut blok boyutunun hedeften ne kadar uzak olduğu ile orantılıdır. [Bloklar hakkında daha fazla bilgi](/developers/docs/blocks/).

### Taban ücret {#base-fee}

Her bloğun bir rezerv fiyatı niteliğinde bir taban ücreti vardır. Bir bloğa dahil edilmeye uygun olmak için, gaz başına teklif edilen fiyatın en azından taban ücrete eşit olması gerekir. Taban ücret, mevcut bloktan bağımsız olarak hesaplanır ve bunun yerine önündeki bloklar tarafından belirlenir ve bu da kullanıcılar için işlem ücretlerini daha öngörülebilir hâle getirir. Blok kazıldığında, bu taban ücret "yakılır" ve dolaşımdan çıkarılır.

Taban ücret, önceki bloğun boyutunu (tüm işlemler için kullanılan gaz miktarını) hedef boyutla karşılaştıran bir formülle hesaplanır. Hedef blok boyutu aşılırsa taban ücret blok başına maksimum %12,5 oranında artacaktır. Bu katlanarak büyüme, blok boyutunun süresiz olarak yüksek kalmasını ekonomik olarak imkansız hâle getiriyor.

| Blok Numarası | Dahil Edilen Gaz | Ücret Artışı | Mevcut Taban Ücret |
| ------------- | ---------------: | -----------: | -----------------: |
| 1             |        15 milyon |           0% |           100 gwei |
| 2             |        30 milyon |           0% |           100 gwei |
| 3             |        30 milyon |        %12,5 |         112,5 gwei |
| 4             |        30 milyon |        %12,5 |         126,6 gwei |
| 5             |        30 milyon |        %12,5 |         142,4 gwei |
| 6             |        30 milyon |        %12,5 |         160,2 gwei |
| 7             |        30 milyon |        %12,5 |         180,2 gwei |
| 8             |        30 milyon |        %12,5 |         202,7 gwei |

Londra öncesi gaz ihale piyasasına kıyasla, bu işlem ücreti mekanizması değişikliği, ücret tahmininin daha güvenilir olmasını sağlıyor. Yukarıdaki tabloyu takip ederek: 9 numaralı blokta bir işlem oluşturmak için bir cüzdan, kullanıcıya bir sonraki bloğa eklenecek **maksimum taban ücretin** `current base fee * 112.5%` veya `202.8 gwei * 112.5% = 228.1 gwei` olduğunu kesin olarak bildirecektir.

Ayrıca, tam blok başlatılırkenki taban ücret artış hızı nedeniyle, uzun tam blok artışları görmemizin olası olmadığını da not etmek önemlidir.

| Blok Numarası | Dahil Edilen Gaz | Ücret Artışı | Mevcut Taban Ücret |
| ------------- | ---------------: | -----------: | -----------------: |
| 30            |        30 milyon |        %12,5 |        2705,6 gwei |
| ...           |              ... |        %12,5 |                ... |
| 50            |        30 milyon |        %12,5 |       28531,3 gwei |
| ...           |              ... |        %12,5 |                ... |
| 100           |        30 milyon |        %12,5 |    10302608,6 gwei |

### Öncelik ücreti (bahşişler) {#priority-fee}

Londra Yükseltmesinden önce madenciler, bir bloğa dahil edilen herhangi bir işlemden toplam gaz ücretini alırdı.

Yeni taban ücretin yakılmasıyla Londra Yükseltmesi, madencileri bloğa bir işlem eklemeye teşvik etmek için bir öncelik ücreti (bahşiş) getirdi. Bahşişler olmadan madenciler, aynı blok ödülünü alacakları için boş blokları kazmayı ekonomik olarak uygun bulurlardı. Normal koşullar altında küçük bir bahşiş, madencilere bir işlemi dahil etmek için minimum bir teşvik sağlar. Tercihen aynı bloktaki diğer işlemlerden önce yürütülmesi gereken işlemler için, rakip işlemlerden daha yüksek teklif vermeye çalışmak için daha yüksek bir bahşiş gerekli olacaktır.

### Maksimum ücret {#maxfee}

Ağ üzerinde bir işlem yürütmek için kullanıcılar, işlemlerinin yürütülmesi için ödemek istedikleri maksimum limiti belirleyebilirler. Bu isteğe bağlı parametre, `maxFeePerGas` olarak bilinir. Bir işlemin gerçekleşmesi için maksimum ücretin, taban ücret ve bahşiş toplamını aşması gerekir. Maksimum ücret ile taban ücret ve bahşiş toplamı arasındaki fark, işlemi gönderene iade edilir.

### Ücretleri hesaplama {#calculating-fees}

Londra yükseltmesinin ana faydalarından biri, işlem ücretlerini belirlerken kullanıcının deneyimini iyileştirmesidir. Yükseltmeyi destekleyen cüzdanlar için, işleminizi gerçekleştirmek için ne kadar ödemek istediğinizi açıkça belirtmek yerine cüzdan sağlayıcıları, kullanıcılarına yüklenen karmaşıklığı azaltmak için otomatik olarak önerilen bir işlem ücreti (taban ücret + önerilen öncelik ücreti) belirleyecektir.

## EIP-1559 {#eip-1559}

[EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)'un Londra Yükseltmesinde uygulanması, işlem ücreti mekanizmasını önceki gaz fiyatı ihalesinden daha karmaşık hâle getirdi ancak gaz ücretlerini daha öngörülebilir hâle getirme avantajına sahip; bu da daha verimli bir işlem ücreti piyasası sağlıyor. Kullanıcılar, gaz için piyasa fiyatından (`baseFeePerGas`) fazlasını ödemeyeceklerini bilerek, işlemin gerçekleşmesi için ne kadar ödemeye razı olduklarına karşılık gelen bir `maxFeePerGas` ile işlem gönderebilirler ve herhangi bir fazlalığı ve verdikleri bahşiş hariç geri alırlar.

Bu video, EIP-1559'u ve getirdiği faydaları açıklıyor:

<YouTube id="MGemhK9t44Q" />

İlgileniyorsanız, [EIP-1559 şartnamesini](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) tam olarak okuyabilirsiniz.

Bu [EIP-1559 Kaynakları](https://hackmd.io/@timbeiko/1559-resources) ile daha derine inmeye devam edin.

## Gaz Ücretleri Neden Var? {#why-do-gas-fees-exist}

Kısacası, gaz ücretleri Ethereum ağının güvenli kalmasına yardımcı olur. Ağda yürütülen her hesaplama için bir ücret talep ederek, kötü niyetli kişilerin ağa spam göndermesini önlüyoruz. Kazara veya düşmanca sonsuz döngüleri veya koddaki diğer hesaplama israfını önlemek için, her işlemin kullanabileceği kod yürütmenin hesaplama adımına bir sınır koyması gerekir. Temel bilgi işlem birimi "gaz"dır.

Bir işlem bir limit içerse de, işlemde kullanılmayan herhangi bir gaz kullanıcıya iade edilir (yani `max fee - (base fee + tip)` iade edilir).

![Kullanılmayan gazın nasıl iade edildiğini gösteren diyagram](../transactions/gas-tx.png) _Diyagram [Ethereum EVM resmediciden](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) uyarlanmıştır_

## Gaz limiti nedir? {#what-is-gas-limit}

Gaz limiti, bir işlemde tüketmek istediğiniz maksimum gaz miktarını ifade eder. [Akıllı sözleşmeleri](/developers/docs/smart-contracts/) içeren daha karmaşık işlemler, daha fazla hesaplama çalışması gerektirdiğinden, basit bir ödemeden daha yüksek bir gaz limiti gerektirir. Standart bir ETH transferi, 21.000 birim gaz sınırı gerektirir.

Örneğin, basit bir ETH transferi için 50.000 gaz limiti koyarsanız, EVM 21.000 tüketir ve kalan 29.000'i geri alırsınız. Ancak, örneğin basit bir ETH transferi için 20.000'lik bir gaz limiti gibi çok az gaz belirtirseniz, EVM işlemi gerçekleştirmeye çalışırken 20.000 gaz biriminizi tüketir, ancak işlemi tamamlamaz. EVM daha sonra herhangi bir değişikliği geri alır, ancak madenci zaten 20 bin gaz birimi değerinde iş yaptığından, bu gaz tüketilir.

## Gaz ücretleri neden bu kadar yükselebiliyor? {#why-can-gas-fees-get-so-high}

Yüksek gaz ücretleri, Ethereum'un popülaritesinden kaynaklanmaktadır. Ethereum üzerinde herhangi bir işlem yapmak, gaz tüketmeyi gerektirir ve blok başına gaz alanı sınırlıdır. Ücretler; farklı miktarlarda "gaz" birimi tüketen hesaplama, verilerin depolanmasını veya manipüle edilmesi veya token'ların aktarılması gibi işlemleri içerir. Dapp işlevselliği daha karmaşık hâle geldikçe, bir akıllı sözleşmenin gerçekleştirdiği işlemlerin sayısı da artar, bu da her işlemin sınırlı boyutlu bir bloktan daha fazla yer kapladığı anlamına gelir. Çok fazla talep varsa, kullanıcılar diğer kullanıcıların işlemlerini denemek ve daha yüksek teklif vermek için daha yüksek bir bahşiş tutarı teklif etmelidir. Daha yüksek bahşiş, işleminizin bir sonraki bloğa geçmesini daha olası hâle getirebilir.

Gaz fiyatı tek başına belirli bir işlem için ne kadar ödememiz gerektiğini belirlemez. İşlem ücretini hesaplamak için gwei cinsinden ölçülen işlem ücretini kullanılan gaz ile çarpmamız gerekiyor.

## Gaz maliyetlerini azaltmak için girişimler {#initiatives-to-reduce-gas-costs}

Ethereum [ölçeklenebilirlik yükseltmeleri](/upgrades/) nihayetinde platformun saniyede binlerce işlemi işlemesini ve küresel olarak ölçeklenmesini sağlayacak olan bazı gaz ücreti sorunlarını çözecektir.

Katman 2 ölçekleme; gaz maliyetlerini, kullanıcı deneyimini ve ölçeklenebilirliği büyük ölçüde iyileştirmeye yönelik birincil bir girişimdir. [Katman 2 ölçekleme hakkında daha fazla bilgi](/developers/docs/scaling/#layer-2-scaling).

İşaret Zincirinde tanıtılan yeni hisse ispatı modeli, yüksek güç tüketimini ve özel donanıma olan bağımlılığı azaltacaktır. Bu zincir, merkezi olmayan Ethereum ağının ağ üzerinde anlaşmaya varmasına ve ağı güvende tutmasına izin verirken, finansal bir taahhüt gerektirerek enerji tüketimini sınırlandıracaktır.

En az 32 ETH'si olan herkes bunları stake edebilir ve işlemleri işlemekten, blokları doğrulamaktan ve zincire eklenecek yeni bloklar önermekten sorumlu bir doğrulayıcı olabilir. 32'den az ETH'ye sahip olan kullanıcılar, stake havuzlarına katılabilir.

## Gaz maliyetlerini düşürmeniz için stratejiler {#strategies-for-you-to-reduce-gas-costs}

ETH'niz için gaz maliyetlerini azaltmak istiyorsanız, işleminizin öncelik seviyesini belirtmek için bir bahşiş belirleyebilirsiniz. Madenciler, ödediğiniz bahşişleri tutuyorken gaz başına daha yüksek bir bahşiş sunan işlemlerle "ilgilenecekler" ve bunları gerçekleştirecekler ve bu sırada daha düşük bahşiş setine sahip işlemleri gerçekleştirmeye daha az meyilli olacaklar.

ETH'nizi daha ucuza gönderebilmeniz için gaz fiyatlarını takip etmek istiyorsanız, aşağıdakiler gibi birçok farklı araç kullanabilirsiniz:

- [Etherscan](https://etherscan.io/gastracker) _İşlem gaz fiyatı tahmincisi_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Gaz tahmin eden, hem Tip 0 eski işlemleri hem de Tip 2 EIP-1559 işlemlerini destekleyen Chrome uzantısı._

- [ETH Gas Station](https://ethgasstation.info/) _Ethereum gaz piyasası için tüketici odaklı ölçümler_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Mainnet, Arbitrum ve Polygon üzerindeki farklı işlem türleri için yerel para biriminizde gaz ücretlerini hesaplayın._

## İlgili araçlar {#related-tools}

- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _Ethereum ağı gaz istatistikleri_
- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _Blocknative'in küresel bellek havuzu veri platformu tarafından desteklenen gaz tahmin API'sı_

## Daha fazla bilgi {#further-reading}

- [Ethereum Gazı Açıklaması](https://defiprime.com/gas)
- [Fiyat arttıkça Ethereum kullanmak pahalılaşıyor mu?](https://docs.ethhub.io/questions-about-ethereum/is-ethereum-more-expensive-to-use-as-price-rises/)
- [Akıllı Sözleşmelerinizin gaz tüketimini azaltmak](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Hisse İspatına karşı İş İspatı](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)

## İlgili konular {#related-topics}

- [Madencilik](/developers/docs/consensus-mechanisms/pow/mining/)
