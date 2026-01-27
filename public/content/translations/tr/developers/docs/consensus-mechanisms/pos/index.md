---
title: Hisse ispatı (PoS)
description: Hisse ispatı mutabakatı protokolünün ve Ethereum'daki rolünün açıklaması.
lang: tr
---

Hisse ispatı (PoS), Ethereum'un [mutabakat mekanizmasının](/developers/docs/consensus-mechanisms/) temelini oluşturur. Ethereum, önceki [iş ispatı](/developers/docs/consensus-mechanisms/pow) mimarisine kıyasla daha güvenli, daha az enerji yoğun ve yeni ölçeklendirme çözümlerini uygulamak için daha iyi olması nedeniyle 2022'de hisse ispatı mekanizmasını devreye soktu.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/) hakkında bilgi edinmenizi öneririz.

## Hisse ispatı (PoS) nedir? {#what-is-pos}

Hisse ispatı doğrulayıcıların ağda dürüst olmayan bir hareket yaptıkları zaman yok edilebilecek değerli bir şey koyduklarını kanıtlamanın bir yoludur. Ethereum hisse ispatında, doğrulayıcıların Ethereum'daki bir akıllı sözleşmeye ETH şeklinde açıkça sermaye yatırdığı hisse ispatını kullanır. Doğrulayıcı, daha sonra ağ üzerinden yayılan yeni blokların geçerli olup olmadığını kontrol etmekten ve zaman zaman yeni blokları kendileri oluşturup yaymaktan sorumludur. Ağı dolandırmaya çalışırlarsa (örneğin bir blok önermeleri gerekirken bir den fazla blok önererek veya çelişkili onaylamalar göndererek), hisseledikleri ETH'nin bir kısmı ya da tamamı yok edilebilir.

## Doğrulayıcılar {#validators}

Doğrulayıcı olarak katılım gösterebilmek için bir kullanıcının depozito sözleşmesine 32 ETH yatırması ve üç ayrı yazılım çalıştırması gerekir: bir yürütüm istemcisi, bir fikir birliği istemcisi ve bir doğrulayıcı istemcisi. Etherlerini yatırırken, kullanıcı ağa katılan yeni doğrulayıcıların oranını sınırlayan bir etkinleştirme kuyruğuna katılır. Etkinleştirildikten sonra doğrulayıcılar, Ethereum ağındaki eşlerden yeni bloklar alırlar. Ethereum'un o anki durumunda önerilen değişikliklerin ve de blok imzasının geçerli olup olmadığı o blokta teslim edilen işlemler yenide yürütülerek kontrol edilir. Doğrulayıcı daha sonra ağ genelinde bu blok lehine bir oy (onay adı verilir) gönderir.

İş ispatında blokların zamanlaması madencilik zorluğuna göre belirlenirken, hisse ispatındatempo sabittir. Hisse ispatı Ethereum'daki süre, yuvalara (12 saniye) ve dönemlere (32 yuva) bölünmüştür. Her yuvada bir blok teklifçisi olmak üzere rastgele bir doğrulayıcı seçilir. Bu doğrulayıcı, yeni bir blok oluşturmaktan ve bunu ağdaki diğer düğümlere göndermekten sorumludur. Ayrıca her yuvada, oyları önerilen blokun geçerliliğini belirlemek için kullanılan bir doğrulayıcı kurulu rastgele seçilir. Doğrulayıcı kurulumunu çeşitli kurullara ayırmak ağ yükünü yönetilebilir kılmak için önemlidir. Kurullar, doğrulayıcı kümesini her aktif doğrulayıcı her aktif dönemde onaylayacak, ancak her yuvada onaylamayacak şekilde böler.

## Bir İşlem Ethereum PoS'ta Nasıl Yürütülür {#transaction-execution-ethereum-pos}

Aşağıda Ethereum hisse ispatında bir işlemin ne şekilde yürütüldüğüne dair uçtan uca bir açıklamaya yer verilmiştir.

1. Bir kullanıcı, özel anahtarıyla bir [işlem](/developers/docs/transactions/) oluşturur ve imzalar. Bu genellikle bir cüzdan veya [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) gibi bir kütüphane tarafından gerçekleştirilir ancak arka planda kullanıcı, Ethereum [JSON-RPC API'sini](/developers/docs/apis/json-rpc/) kullanarak bir düğüme istekte bulunur. Kullanıcı, yapacağı işlemin bloka dahil edilmesini teşvik etmek için doğrulayıcıya bahşiş olarak ödemeye hazır olduğu gaz miktarını belirler. [İpuçları](/developers/docs/gas/#priority-fee), doğrulayıcıya ödenirken [taban ücret](/developers/docs/gas/#base-fee) yakılır.
2. İşlem, geçerliliğini doğrulayan bir Ethereum [yürütüm istemcisine](/developers/docs/nodes-and-clients/#execution-client) gönderilir. Bu da gönderenin hem işlemi gerçekleştirmek için yeterli ETH'ye sahip olduğundan hem de doğru anahtarla işlemi imzaladığından emin olma anlamına gelir.
3. İşlem geçerli ise yürütüm istemcisi bunu yerel bellek havuzuna (bekleyen işlemler listesi) ekler ve ayrıca yürütüm katmanı dedikodu ağı üzerinden diğer düğümlere de yayımlar. Diğer düğümler de işlemi duydukları zaman işlemi kendi yerel bellek havuzlarına eklerler. İleri düzey kullanıcılar, işlemlerini yayınlamaktan kaçınabilir ve bunun yerine [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview) gibi özel blok oluşturucularına iletebilir. Bu, maksimum kâr ([MEV](/developers/docs/mev/#mev-extraction)) için gelecek bloklardaki işlemleri organize etmelerine olanak tanır.
4. Ağdaki doğrulayıcı düğümlerinden biri, daha önce RANDAO kullanılarak rastgele seçilmiş olan mevcut yuva için blok önericisidir. Bu düğüm Ethereum blok zincirine eklenecek bir sonraki bloku oluşturmak, yayımlamak ve de global durumunu güncellemekten sorumludur. Bir düğüm 3 bölümden oluşur: yürütüm istemcisi, fikir birliği istemcisi ve doğrulayıcı istemcisi. Yürütüm istemcisi, işlemleri yerel bellek havuzundan bir "yürütme yüküne" paketler ve bir durum değişikliği oluşturabilmek için bunları yerel olarak yürütür. Bu bilgi, yürütme yükünün ağın başlangıcındaki blok dizisi üzerinde anlaşmasını sağlayan; ödüller, cezalar, tasdikler, kesintiler vb. hakkında da bilgiler içeren bir çeşit "işaret blokunun" parçası olarak paketlendiği fikir birliği istemcisine iletilir. Yürütüm ve mutabakat istemcileri arasındaki iletişim, [Mutabakat ve Yürütüm İstemcilerini Bağlama](/developers/docs/networking-layer/#connecting-clients) bölümünde daha ayrıntılı olarak açıklanmaktadır.
5. Diğer düğümler yeni işaret blokunu fikir birliği katmanındaki dedikodu ağından alırlar. Onlar da işlemlerin tekrardan yerel olarak yürütülüp sunulan durum değişikliğinden emin olunduğu yürütüm istemcisine aktarırlar. Doğrulayıcı istemcisi daha sonra bloğun geçerli olduğunu ve zincir görünümünde mantıksal olarak bir sonraki blok olduğunu tasdik eder (yani [çatal seçim kurallarında](/developers/docs/consensus-mechanisms/pos/#fork-choice) tanımlandığı gibi en büyük tasdik ağırlığına sahip zincir üzerine kurulur). Blok, kendini onaylayan her düğümdeki yerel veritabanına eklenir.
6. Bir işlem eğer "süper çoğunluğun denkliğini" alarak iki kontrol noktası arasında zincirin bir parçası olduysa "kesinleşmiş" olarak görülebilir. Kontrol noktaları, her dönemin başlangıcında meydana gelir ve aktif doğrulayıcıların sadece bir alt kümesinin her yuvada doğrulama yaptığını; ancak tüm aktif doğrulayıcıların dönemler boyunca doğrulama yaptığını hesaba katmak için var olurlar. Yani sadece bitişik iki dönem arasında eğer "süper çoğunluk denkliği" varsa gösterilebilir (bu da ağdaki ETH paydaşlarının %66'sının iki kontrol noktası konusunda uzlaşması demektir).

Kesinlik konusunda daha fazla ayrıntıya aşağıda ulaşılabilir.

## Kesinlik {#finality}

Bir işlem ciddi miktarda Ether yakmadan değişmeyen bir blokun parçası olduğunda o işlemin dağıtılmış ağlarda "kesinliği" vardır. Hisse ispatı Ethereum'da bu, "kontrol noktası" blokları kullanılarak yönetilir. Her dönemdeki ilk blok, bir kontrol noktasıdır. Doğrulayıcılar, geçerli olduğunu düşündüğü kontrol noktası çiftlerine oy verir. Bir çift kontrol noktası, toplam hisselenen ETH'nin en az üçte ikisini temsil eden oyları çekerse, kontrol noktaları yükseltilir. İkisinden (hedef) daha yeni olanı "doğrulanmış" hale gelir. Önceki dönemde "hedef" olduğu için, ikisinden daha erken olanı zaten doğrulanmıştır. Şimdi "kesinleşmiş" olarak yükseltildi. Kontrol noktalarını yükseltme süreci **[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437)** tarafından yürütülür. Casper-FFG, mutabakat için bir blok kesinlik aracıdır. Bir blok kesinleştirildikten sonra, paydaşların çoğunluğu kesintiye uğramadan geri alınamaz veya değiştirilemez, bu da onu ekonomik olarak olanaksız kılar.

Bir saldırgan kesinleşmiş bir bloku geri almak için toplam hisselenen ether arzının en az üçte birini kaybetmeyi göze alır. Bunun tam nedeni bu [Ethereum Foundation blog gönderisinde](https://blog.ethereum.org/2016/05/09/on-settlement-finality/) açıklanmaktadır. Kesinlik üçte iki çoğunluk gerektirdiğinden, bir saldırgan toplam payın üçte biriyle oy vererek ağın kesinliğe ulaşmasını engelleyebilir. Buna karşı savunma sağlayacak bir mekanizma vardır: [hareketsizlik sızıntısı](https://eth2book.info/bellatrix/part2/incentives/inactivity). Bu, zincir dörtten fazla dönemde kesinleşmediğinde etkinleşir. Hareketsizlik sızıntısı, çoğunluğa karşı oy veren doğrulayıcılardan hisselenen ETH'yi geri kalan çoğunluğa aktarır ve üçte ikilik çoğunluğun yeniden kazanılmasına ve zincirin kesinleşmesine olanak verir.

## Kripto-ekonomik güvenlik {#crypto-economic-security}

Doğrulayıcı çalıştırmak bir taahhüttür. Doğrulayıcının, blok doğrulama ve teklife katılmak için yeterli donanıma ve bağlantıya sahip olması beklenir. Karşılığında, doğrulayıcıya ETH ile ödeme yapılır (hisselenen bakiyeleri artar). Öte yandan, doğrulayıcı olarak katılmak, kullanıcıların kişisel kazanç veya sabotaj için ağa saldırması için yeni yollar açar. Bunu önlemek için, doğrulayıcılar, çağrıldıklarında katılmazlarsa ETH ödüllerini kaçırırlar ve dürüst davranmazlarsa mevcut payları yok edilebilir. Temelde iki davranış dürüst olmayan olarak kabul edilebilir: Tek bir yuvada birden fazla blok önermek (belirsizlik) ve çelişkili tasdikler göndermek.

Ceza olarak kesilen Ether miktarı, aynı anda kaç doğrulayıcıya ceza verildiği ile de bağlıdır. Bu, ["korelasyon cezası"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) olarak bilinir ve küçük olabilir (tek başına kesintiye uğrayan bir doğrulayıcı için yaklaşık %1 hisse) ya da doğrulayıcının hissesinin %100'ünün yok edilmesiyle sonuçlanabilir (toplu kesinti olayı). 1. Günde acil bir ceza (1 ETH'ye kadar), 18. Günde korelasyon cezası ve son olarak 36. Günde ağdan çıkarma ile başlayan bir zorunlu çıkış döneminin yarısında uygulanır. Ağda bulundukları, ancak oy vermedikleri için her gün küçük tasdik cezaları alırlar. Bütün bunlar, koordineli bir saldırının saldırgan için çok maliyetli olacağı anlamına gelir.

## Çatal seçimi {#fork-choice}

Ağ, optimum ve dürüst bir şekilde çalıştığında, zincirin başında yalnızca bir yeni blok vardır ve tüm doğrulayıcılar bunu tasdik eder. Bununla birlikte, ağ gecikmesi veya bir blok öneren kişinin yanlış anlaması nedeniyle doğrulayıcıların zincirin başı hakkında farklı görüşlere sahip olması mümkündür. Bu nedenle, fikir birliği istemcileri, hangisini tercih edeceklerine karar vermek için bir algoritmaya ihtiyaç duyar. Hisse ispatı Ethereum'da kullanılan algoritmaya [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) denir ve geçmişinde en yüksek ağırlıkta tasdik bulunan çatalı belirleyerek çalışır.

## Hisse ispatı ve güvenlik {#pos-and-security}

[%51 saldırısı](https://www.investopedia.com/terms/1/51-attack.asp) tehdidi, iş ispatında olduğu gibi hisse ispatında da mevcuttur ancak saldırganlar için daha da risklidir. Saldırganın hisselenmiş ETH'nin %51'ine ihtiyacı vardır. Daha sonra, tercih ettikleri çatalın en fazla birikmiş onaylara sahip olduğundan emin olmak için kendi onaylarını kullanabilirler. Birikmiş onayların "ağırlığı", fikir birliği istemcilerinin doğru zinciri belirlemek için kullandıkları şeydir, bu nedenle bu saldırgan çatallarını kurallı hale getirebilir. Bununla birlikte, hisse ispatının iş ispatı üzerindeki gücü, topluluğun bir karşı saldırı başlatma esnekliğine sahip olmasıdır. Örneğin, dürüst doğrulayıcılar azınlık zincirini geliştirmeye devam etmeye ve saldırganın çatalını görmezden gelirken uygulamaları, borsaları ve havuzları da aynısını yapmaya teşvik edebilir. Ayrıca, saldırganı ağdan zorla çıkarmaya ve hisselenmiş ETH'sini yok etmeye karar verebilirler. Bunlar, %51 saldırısına karşı güçlü ekonomik savunmalardır.

%51 saldırılarının yanı sıra, kötü niyetli kişiler de farklı tipteki kötü niyetli faaliyetleri deneyebilir. Örneğin:

- uzun menzilli saldırılar (her ne kadar sonlandırma aracı bu saldırı vektörünü etkisiz hale getirse de)
- kısa vadeli "yeniden düzenlemeler" (öneri sahibinin desteklenmesi ve tasdik son tarihleri ​​bunu hafifletse de)
- zıplama ve dengeleme saldırıları (öneri sahibinin desteklenmesi ile hafifletilir, bu saldırılar zaten sadece idealize edilmiş ağ koşulları altında gösterilmiştir)
- çığ saldırıları (çatal seçim algoritmalarının yalnızca son mesajı dikkate alma kuralı ile etkisiz hale getirilmiştir)

Genel olarak, Ethereum'da uygulandığı için hisse ispatının, iş ispatından ekonomik olarak daha güvenli olduğu kanıtlanmıştır.

## Artı ve eksiler {#pros-and-cons}

| Artıları                                                                                                                                                                                                                                                                                                                   | Eksileri                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Staking, bireylerin ağın güvenliğini sağlamaya katılmasını kolaylaştırır ve merkeziyetsizliği teşvik eder. doğrulayıcı düğümü, normal bir dizüstü bilgisayarda çalıştırılabilir. Staking havuzları, kullanıcıların 32 ETH'ye sahip olmadan stake yapmalarına olanak tanır. | Hisse ispatı, iş ispatına kıyasla daha genç ve savaşta daha az test edildi                                               |
| Stake etme daha merkeziyetsizdir. Ölçek ekonomileri, PoW madenciliği için geçerli olduğu şekilde uygulanmaz.                                                                                                                                                                               | Hisse kanıtı, iş kanıtından daha karmaşıktır                                                                             |
| Hisse ispatı, iş ispatından daha fazla kripto-ekonomik güvenlik sunar                                                                                                                                                                                                                                                      | Kullanıcıların Ethereum'un hisse ispatı sistemine katılabilmek için 3 adet yazılım çalıştırması gerekir. |
| Ağ katılımcılarını teşvik etmek için daha az yeni Ether verilmesi gerekiyor                                                                                                                                                                                                                                                |                                                                                                                          |

### İş ispatı ile karşılaştırma {#comparison-to-proof-of-work}

Ethereum başlangıçta iş ispatı kullanmış ancak 2022 Eylül'de hisse ispatına geçiş yapmıştır. PoS, PoW'un aksine birkaç avantaj sunar. Örneğin:

- daha iyi enerji verimliliği - iş kanıtı hesaplamalarında çok fazla enerji kullanmaya gerek yoktur
- daha düşük giriş engelleri, daha düşük donanım gereksinimleri - yeni bloklar oluşturma şansına sahip olmak için elit donanıma gerek yoktur
- azaltılmış merkezileştirme riski - hisse kanıtı, ağı güvence altına alan daha fazla düğüme yol açmalıdır
- düşük enerji gereksinimi nedeniyle, katılımı teşvik etmek için daha az ETH ihracı gerekir
- uygunsuz davranış için ekonomik cezalar, örneğin bir saldırgan için iş ispatına kıyasla %51 tarzı saldırıları daha da maliyetli hale getirir
- %51 saldırısı kripto-ekonomik savunmaların üstesinden gelmek için, topluluk dürüst bir zincirin sosyal iyileşmesine başvurabilir.

## Daha fazla kaynak {#further-reading}

- [Hisse İspatı SSS](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Hisse İspatı Nedir](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Hisse İspatı Nedir ve Neden Önemlidir](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Neden Hisse İspatı (Kasım 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Hisse İspatı: Zayıf Öznelliği Sevmeyi Nasıl Öğrendim](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Hisse ispatı Ethereum saldırı ve savunması](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Bir Hisse İspatı Tasarım Felsefesi](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin, Lex Fridman'a hisse ispatını açıklıyor](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Alakalı başlıklar {#related-topics}

- [İş ispatı](/developers/docs/consensus-mechanisms/pow/)
- [Otorite İspatı](/developers/docs/consensus-mechanisms/poa/)
