---
title: Hisse Kanıtı (PoS)
description: Hisse kanıtı mutabakat protokolünün ve Ethereum'daki rolünün bir açıklaması.
lang: tr
---

Hisse Kanıtı (PoS), Ethereum'un [mutabakat mekanizmasının](/developers/docs/consensus-mechanisms/) temelini oluşturur. Ethereum, önceki [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow) mimarisine kıyasla daha güvenli, daha az enerji yoğun ve yeni ölçeklendirme çözümlerini uygulamak için daha iyi olduğu için 2022'de hisse kanıtı mekanizmasına geçiş yaptı.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/) hakkında okuma yapmanızı öneririz.

## Hisse Kanıtı (PoS) nedir? {#what-is-pos}

Hisse kanıtı, doğrulayıcıların ağa, dürüst olmayan bir şekilde davrandıklarında yok edilebilecek değerli bir şey koyduklarını kanıtlamanın bir yoludur. [Ethereum'un](/) hisse kanıtında, doğrulayıcılar Ethereum üzerindeki bir akıllı sözleşmeye açıkça ETH şeklinde sermaye stake ederler. Doğrulayıcı daha sonra ağ üzerinden yayılan yeni blokların geçerli olup olmadığını kontrol etmekten ve zaman zaman kendisi yeni bloklar oluşturup yaymaktan sorumludur. Ağı dolandırmaya çalışırlarsa (örneğin, bir tane göndermeleri gerekirken birden fazla blok teklif ederek veya çelişkili onaylar göndererek), stake ettikleri ETH'nin bir kısmı veya tamamı yok edilebilir.

## Doğrulayıcılar {#validators}

Bir doğrulayıcı olarak katılmak için, bir kullanıcının yatırma sözleşmesine 32 ETH yatırması ve üç ayrı yazılım çalıştırması gerekir: bir yürütme istemcisi, bir fikir birliği istemcisi ve bir doğrulayıcı istemcisi. ETH'lerini yatırdıklarında kullanıcı, ağa katılan yeni doğrulayıcıların oranını sınırlayan bir etkinleştirme kuyruğuna katılır. Etkinleştirildikten sonra doğrulayıcılar, Ethereum ağındaki eşlerden yeni bloklar alırlar. Blokta teslim edilen işlemler, Ethereum'un durumunda önerilen değişikliklerin geçerli olup olmadığını kontrol etmek için yeniden yürütülür ve blok imzası kontrol edilir. Doğrulayıcı daha sonra ağ genelinde o blok lehine bir oy (onay olarak adlandırılır) gönderir.

İş kanıtı altında blokların zamanlaması madencilik zorluğu tarafından belirlenirken, hisse kanıtında tempo sabittir. Hisse kanıtı Ethereum'da zaman, slotlara (12 saniye) ve dönemlere (32 slot) bölünmüştür. Her slotta bir doğrulayıcı rastgele blok teklifçisi olarak seçilir. Bu doğrulayıcı, yeni bir blok oluşturmaktan ve bunu ağdaki diğer düğümlere göndermekten sorumludur. Ayrıca her slotta, oyları teklif edilen bloğun geçerliliğini belirlemek için kullanılan rastgele bir doğrulayıcı komitesi seçilir. Doğrulayıcı kümesini komitelere bölmek, ağ yükünü yönetilebilir tutmak için önemlidir. Komiteler, her aktif doğrulayıcının her dönemde onay vermesini, ancak her slotta vermemesini sağlayacak şekilde doğrulayıcı kümesini böler.

## Ethereum PoS'ta Bir İşlem Nasıl Yürütülür {#transaction-execution-ethereum-pos}

Aşağıda, Ethereum hisse kanıtında bir işlemin nasıl yürütüldüğüne dair uçtan uca bir açıklama sunulmaktadır.

1. Bir kullanıcı özel anahtarı ile bir [işlem](/developers/docs/transactions/) oluşturur ve imzalar. Bu genellikle bir cüzdan veya [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) vb. gibi bir kütüphane tarafından halledilir, ancak arka planda kullanıcı Ethereum [JSON-RPC API](/developers/docs/apis/json-rpc/)'sini kullanarak bir düğüme istekte bulunur. Kullanıcı, işlemi bir bloğa dahil etmeye teşvik etmek için bir doğrulayıcıya öncelik ücreti olarak ödemeye hazır olduğu gaz miktarını tanımlar. [Öncelik ücretleri](/developers/docs/gas/#priority-fee) doğrulayıcıya ödenirken [taban ücret](/developers/docs/gas/#base-fee) yakılır.
2. İşlem, geçerliliğini doğrulayan bir Ethereum [yürütme istemcisine](/developers/docs/nodes-and-clients/#execution-client) gönderilir. Bu, gönderenin işlemi gerçekleştirmek için yeterli ETH'ye sahip olduğundan ve doğru anahtarla imzaladığından emin olmak anlamına gelir.
3. İşlem geçerliyse, yürütme istemcisi bunu yerel bellek havuzuna (bekleyen işlemler listesi) ekler ve ayrıca yürütme katmanı dedikodu ağı üzerinden diğer düğümlere yayınlar. Diğer düğümler işlemi duyduklarında bunu kendi yerel bellek havuzlarına da eklerler. Gelişmiş kullanıcılar işlemlerini yayınlamaktan kaçınabilir ve bunun yerine [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview) gibi uzmanlaşmış blok oluşturuculara iletebilirler. Bu, maksimum kâr ([MEV](/developers/docs/mev/#mev-extraction)) için yaklaşan bloklardaki işlemleri organize etmelerine olanak tanır.
4. Ağdaki doğrulayıcı düğümlerden biri, daha önce RANDAO kullanılarak sözde rastgele seçilmiş olan mevcut slot için blok teklifçisidir. Bu düğüm, Ethereum blokzincirine eklenecek bir sonraki bloğu oluşturmaktan, yayınlamaktan ve küresel durumu güncellemekten sorumludur. Düğüm üç bölümden oluşur: bir yürütme istemcisi, bir fikir birliği istemcisi ve bir doğrulayıcı istemcisi. Yürütme istemcisi, yerel bellek havuzundaki işlemleri bir "yürütme yükü" halinde paketler ve bir durum değişikliği oluşturmak için bunları yerel olarak yürütür. Bu bilgi, yürütme yükünün, ağın zincirin başındaki blokların sırası üzerinde anlaşmasını sağlayan ödüller, cezalar, kesintiler, onaylar vb. hakkında bilgiler de içeren bir "işaret bloğunun" parçası olarak sarıldığı fikir birliği istemcisine iletilir. Yürütme ve fikir birliği istemcileri arasındaki iletişim, [Fikir Birliği ve Yürütme İstemcilerini Bağlama](/developers/docs/networking-layer/#connecting-clients) bölümünde daha ayrıntılı olarak açıklanmaktadır.
5. Diğer düğümler yeni işaret bloğunu mutabakat katmanı dedikodu ağında alırlar. Önerilen durum değişikliğinin geçerli olduğundan emin olmak için işlemlerin yerel olarak yeniden yürütüldüğü yürütme istemcilerine iletirler. Doğrulayıcı istemcisi daha sonra bloğun geçerli olduğunu ve zincir görüşlerine göre mantıksal bir sonraki blok olduğunu onaylar (bu, [çatallanma seçimi kurallarında](/developers/docs/consensus-mechanisms/pos/#fork-choice) tanımlandığı gibi en büyük onay ağırlığına sahip zincir üzerine inşa edildiği anlamına gelir). Blok, onu onaylayan her düğümdeki yerel veritabanına eklenir.
6. İşlem, iki kontrol noktası arasında "süper çoğunluk bağlantısı" olan bir zincirin parçası haline gelmişse "kesinleşmiş" olarak kabul edilebilir. Kontrol noktaları her dönemin başında gerçekleşir ve her slotta yalnızca aktif doğrulayıcıların bir alt kümesinin onay vermesi, ancak tüm aktif doğrulayıcıların her dönem boyunca onay vermesi gerçeğini hesaba katmak için vardırlar. Bu nedenle, bir 'süper çoğunluk bağlantısı' yalnızca dönemler arasında gösterilebilir (bu, ağdaki toplam stake edilen ETH'nin %66'sının iki kontrol noktası üzerinde anlaştığı yerdir).

Kesinlik hakkında daha fazla ayrıntı aşağıda bulunabilir.

## Kesinlik {#finality}

Dağıtık ağlarda bir işlem, büyük miktarda ETH yakılmadan değiştirilemeyen bir bloğun parçası olduğunda "kesinliğe" sahip olur. Hisse kanıtı Ethereum'da bu, "kontrol noktası" blokları kullanılarak yönetilir. Her dönemdeki ilk blok bir kontrol noktasıdır. Doğrulayıcılar, geçerli olduğunu düşündükleri kontrol noktası çiftleri için oy kullanırlar. Bir kontrol noktası çifti, toplam stake edilen ETH'nin en az üçte ikisini temsil eden oyları çekerse, kontrol noktaları yükseltilir. İkisinden daha yeni olanı (hedef) "gerekçelendirilmiş" hale gelir. İkisinden daha eski olanı zaten gerekçelendirilmiştir çünkü önceki dönemde "hedef" idi. Şimdi "kesinleşmiş" olarak yükseltilir. Kontrol noktalarını yükseltme süreci **[Casper FFG (Casper the Friendly Finality Gadget)](https://arxiv.org/pdf/1710.09437)** tarafından yürütülür. Casper FFG, mutabakat için bir blok kesinlik aracıdır. Bir blok kesinleştikten sonra, staker'ların çoğunluğunun ceza kesintisine uğraması olmadan geri alınamaz veya değiştirilemez, bu da onu ekonomik olarak uygulanamaz hale getirir.

Kesinleşmiş bir bloğu geri almak için, bir saldırganın stake edilen toplam ETH arzının en az üçte birini kaybetmeyi taahhüt etmesi gerekir. Bunun kesin nedeni bu [Ethereum Vakfı blog gönderisinde](https://blog.ethereum.org/2016/05/09/on-settlement-finality) açıklanmaktadır. Kesinlik üçte iki çoğunluk gerektirdiğinden, bir saldırgan toplam stake'in üçte biriyle oy kullanarak ağın kesinliğe ulaşmasını engelleyebilir. Buna karşı savunma yapmak için bir mekanizma vardır: [hareketsizlik sızıntısı](https://eth2book.info/bellatrix/part2/incentives/inactivity). Bu, zincir dört dönemden fazla kesinleşemediğinde etkinleşir. Hareketsizlik sızıntısı, çoğunluğa karşı oy kullanan doğrulayıcılardan stake edilen ETH'yi yavaş yavaş eksiltir, böylece çoğunluğun üçte iki çoğunluğu yeniden kazanmasına ve zinciri kesinleştirmesine olanak tanır.

## Kripto-ekonomik güvenlik {#crypto-economic-security}

Bir doğrulayıcı çalıştırmak bir taahhüttür. Doğrulayıcının, blok doğrulama ve teklifine katılmak için yeterli donanım ve bağlantıyı sürdürmesi beklenir. Karşılığında, doğrulayıcıya ETH ödenir (stake edilen bakiyeleri artar). Öte yandan, bir doğrulayıcı olarak katılmak, kullanıcıların kişisel kazanç veya sabotaj için ağa saldırmaları için yeni yollar da açar. Bunu önlemek için, doğrulayıcılar çağrıldıklarında katılamazlarsa ETH ödüllerini kaçırırlar ve dürüst olmayan bir şekilde davranırlarsa mevcut stake'leri yok edilebilir. İki temel davranış dürüst olmayan olarak kabul edilebilir: tek bir slotta birden fazla blok teklif etmek (çift taraflı davranmak) ve çelişkili onaylar sunmak.

Kesintiye uğrayan ETH miktarı, aynı zamanda kaç doğrulayıcının da kesintiye uğradığına bağlıdır. Bu, ["korelasyon cezası"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) olarak bilinir ve küçük olabilir (kendi başına kesintiye uğrayan tek bir doğrulayıcı için ~%1 stake) veya doğrulayıcının stake'inin %100'ünün yok edilmesiyle sonuçlanabilir (toplu kesinti olayı). 1. Günde anında bir ceza (1 ETH'ye kadar), 18. Günde korelasyon cezası ve son olarak 36. Günde ağdan atılma ile başlayan zorunlu bir çıkış döneminin yarısında uygulanır. Ağda bulundukları ancak oy göndermedikleri için her gün küçük onay cezaları alırlar. Tüm bunlar, koordineli bir saldırının saldırgan için çok maliyetli olacağı anlamına gelir.

## Çatallanma seçimi {#fork-choice}

Ağ en iyi ve dürüst bir şekilde performans gösterdiğinde, zincirin başında her zaman yalnızca bir yeni blok bulunur ve tüm doğrulayıcılar bunu onaylar. Ancak, ağ gecikmesi nedeniyle veya bir blok teklifçisinin çift taraflı davranması nedeniyle doğrulayıcıların zincirin başı hakkında farklı görüşlere sahip olması mümkündür. Bu nedenle, fikir birliği istemcileri hangisini tercih edeceklerine karar vermek için bir algoritmaya ihtiyaç duyarlar. Hisse kanıtı Ethereum'da kullanılan algoritma [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) olarak adlandırılır ve geçmişinde en büyük onay ağırlığına sahip çatallanmayı belirleyerek çalışır.

## Hisse kanıtı ve güvenlik {#pos-and-security}

Bir [%51 saldırısı](https://www.investopedia.com/terms/1/51-attack.asp) tehdidi, iş kanıtında olduğu gibi hisse kanıtında da hala mevcuttur, ancak saldırganlar için daha da risklidir. Bir saldırganın stake edilen ETH'nin %51'ine ihtiyacı olacaktır. Daha sonra, tercih ettikleri çatallanmanın en çok birikmiş onaya sahip olan olduğundan emin olmak için kendi onaylarını kullanabilirler. Birikmiş onayların 'ağırlığı', fikir birliği istemcilerinin doğru zinciri belirlemek için kullandığı şeydir, bu nedenle bu saldırgan kendi çatallanmasını kurallı olan haline getirebilir. Ancak, hisse kanıtının iş kanıtına göre bir gücü, topluluğun bir karşı saldırı düzenlemede esnekliğe sahip olmasıdır. Örneğin, dürüst doğrulayıcılar azınlık zinciri üzerine inşa etmeye devam etmeye ve saldırganın çatallanmasını görmezden gelmeye karar verirken, uygulamaları, borsaları ve havuzları da aynısını yapmaya teşvik edebilirler. Ayrıca saldırganı ağdan zorla çıkarmaya ve stake ettikleri ETH'yi yok etmeye de karar verebilirler. Bunlar %51 saldırısına karşı güçlü ekonomik savunmalardır.

%51 saldırılarının ötesinde, kötü niyetli aktörler aşağıdakiler gibi diğer türde kötü niyetli faaliyetlerde de bulunmaya çalışabilirler:

- uzun menzilli saldırılar (kesinlik aracı bu saldırı vektörünü etkisiz hale getirse de)
- kısa menzilli 'yeniden düzenlemeler' (teklif edici güçlendirmesi ve onay son tarihleri bunu hafifletse de)
- sıçrama ve dengeleme saldırıları (ayrıca teklif edici güçlendirmesi ile hafifletilir ve bu saldırılar zaten yalnızca idealize edilmiş ağ koşullarında gösterilmiştir)
- çığ saldırıları (yalnızca en son mesajı dikkate alan çatallanma seçimi algoritmaları kuralı ile etkisiz hale getirilir)

Genel olarak, Ethereum'da uygulandığı şekliyle hisse kanıtının, iş kanıtından ekonomik olarak daha güvenli olduğu kanıtlanmıştır.

## Artılar ve eksiler {#pros-and-cons}

| Artılar                                                                                                                                                                                                                | Eksiler                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Staking, bireylerin ağın güvenliğini sağlamaya katılmasını kolaylaştırarak merkeziyetsizliği teşvik eder. Doğrulayıcı düğüm normal bir dizüstü bilgisayarda çalıştırılabilir. Staking havuzları, kullanıcıların 32 ETH'ye sahip olmadan stake etmelerine olanak tanır. | Hisse kanıtı, iş kanıtına kıyasla daha yenidir ve daha az savaş testinden geçmiştir              |
| Staking daha merkeziyetsizdir. Ölçek ekonomileri, PoW madenciliği için geçerli olduğu şekilde geçerli değildir.                                                                                                         | Hisse kanıtını uygulamak, iş kanıtından daha karmaşıktır                          |
| Hisse kanıtı, iş kanıtından daha fazla kripto-ekonomik güvenlik sunar                                                                                                                                           | Kullanıcıların Ethereum'un hisse kanıtına katılmak için üç yazılım çalıştırması gerekir. |
| Ağ katılımcılarını teşvik etmek için daha az yeni ETH ihracı gerekir                                                                                                                                            |                                                                                         |

### İş kanıtı ile karşılaştırma {#comparison-to-proof-of-work}

Ethereum başlangıçta iş kanıtı kullanıyordu ancak Eylül 2022'de hisse kanıtına geçti. PoS, PoW'a göre aşağıdakiler gibi çeşitli avantajlar sunar:

- daha iyi enerji verimliliği – iş kanıtı hesaplamalarında çok fazla enerji kullanmaya gerek yoktur
- daha düşük giriş engelleri, azaltılmış donanım gereksinimleri – yeni bloklar oluşturma şansına sahip olmak için elit donanıma gerek yoktur
- azaltılmış merkezileşme riski – hisse kanıtı, ağı güvence altına alan daha fazla düğüme yol açmalıdır
- düşük enerji gereksinimi nedeniyle katılımı teşvik etmek için daha az ETH ihracı gerekir
- kötü davranışlara yönelik ekonomik cezalar, %51 tarzı saldırıları bir saldırgan için iş kanıtına kıyasla daha maliyetli hale getirir
- bir %51 saldırısı kripto-ekonomik savunmaları aşarsa, topluluk dürüst bir zincirin sosyal kurtarmasına başvurabilir.

## Daha fazla bilgi {#further-reading}

- [Hisse Kanıtı SSS](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Hisse Kanıtı Nedir](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Hisse Kanıtı Nedir ve Neden Önemlidir](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Neden Hisse Kanıtı (Kasım 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Hisse Kanıtı: Zayıf Öznelliği Sevmeyi Nasıl Öğrendim](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Hisse kanıtı Ethereum saldırısı ve savunması](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Bir Hisse Kanıtı Tasarım Felsefesi](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin, Lex Fridman'a hisse kanıtını açıklıyor](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## İlgili konular {#related-topics}

- [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Yetki kanıtı](/developers/docs/consensus-mechanisms/poa/)