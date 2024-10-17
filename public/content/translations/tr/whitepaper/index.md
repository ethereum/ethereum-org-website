---
title: Ethereum Teknik Raporu
description: Ethereum'un başlangıcından önce 2013'te yayınlanan giriş yazısı.
lang: tr
sidebarDepth: 2
hideEditButton: true
---

# Ethereum Teknik Raporu {#ethereum-whitepaper}

_Bu tanıtım yazısının orijinali 2014 yılında, [Ethereum](/what-is-ethereum/)'un kurucusu Vitalik Buterin tarafından, projenin 2015'teki lansmanından önce yayınlandı. Birçok topluluk odaklı, açık-kaynak yazılım projesinde olduğu gibi Ethereum'un da ilk başlangıcından bu yana evrildiğini belirtmekte fayda var._

_Birkaç yıllık olmasına rağmen, bu teknik raporu güncellemeyi sürdürüyoruz çünkü Ethereum ve vizyonunun yararlı bir referansı ve doğru bir temsili olarak hizmet etmeye devam ediyor. Ethereum hakkındaki en son gelişmeleri ve protokolde nasıl değişikliklerin yapıldığını öğrenmek için [bu kılavuzu](/learn/) öneriyoruz._

[Tanıtım belgesinin [Aralık 2014 tarihli] geçmiş veya kurallara uygun bir versiyonunu arayan araştırmacılar ve akademisyenler bu PDF'yi kullanmalıdır.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Yeni Nesil Akıllı Sözleşme ve Merkeziyetsiz Uygulama Platformu {#a-next-generation-smart-contract-and-decentralized-application-platform}

Satoshi Nakamoto'nun 2009'da Bitcoin'i geliştirmesi, aynı zamanda hiçbir desteği, "[içsel değeri](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)" ve merkezi bir ihraççısı veya denetleyicisi olmayan bir dijital varlığın ilk örneği olması yönüyle genellikle para ve para birimi bağlamında radikal bir gelişme olarak kabul edildi. Ancak, Bitcoin deneyinin daha önemli bir başka yönü ise, dağıtılmış bir fikir birliği aracı olarak, altta yatan blok zincir teknolojisidir ve dikkatler hızla Bitcoin'in bu diğer yönüne kaymaya başlamaktadır. Blok zinciri teknolojisinin yaygın olarak belirtilen alternatif uygulamaları arasında, özel para birimlerini ve finansal araçları ("[renkli madeni paralar](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)") temsil etmek için blok zinciri üzerinde dijital varlıkların kullanılması, temel alınan bir fiziksel cihazın ("[akıllı mülk](https://en.bitcoin.it/wiki/Smart_Property)") mülkiyeti, alan adları gibi değiştirilemez varlıklar ("[Namecoin](http://namecoin.org)"), dijital varlıkların doğrudan keyfi kurallar uygulayan bir kod parçası tarafından kontrol edilmesini içeren daha karmaşık uygulamalar ("[akıllı sözleşmeler](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") veya blok zinciri tabanlı "[merkeziyetsiz otonom organizasyonlar](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO'lar) yer alır. Ethereum'un amacı, isteğe bağlı durum geçiş fonksiyonlarını kodlamak için kullanılabilecek "sözleşmeler" yaratmak için kullanılabilecek tam teşekküllü yerleşik bir Turing-tam programlama diline sahip bir blok zinciri sunarak kullanıcıların sadece birkaç satır kod ile mantık yazarak yukarıda bahsedilen sistemlerden herhangi birini ve henüz düşünülmemiş olanları yaratabilmesini sağlamaktır.

## Bitcoin'e Giriş ve Mevcut Kavramlar {#introduction-to-bitcoin-and-existing-concepts}

### Tarihçe {#history}

Merkeziyetsiz dijital para birimi kavramının yanı sıra mülk kayıtları gibi alternatif uygulamalar on yıllardır ortalıkta dolaşmaktadır. 1980'lerin ve 1990'ların, çoğunlukla Chaumian körleme olarak bilinen bir kriptografik ilkeye dayanan anonim e-para protokolleri, yüksek derecede mahremiyete sahip bir para birimi sağlasa da protokoller, merkezi bir aracıya olan bağlılıkları nedeniyle hiç yaygınlaşmamıştır. 1998'de, Wei Dai'nin [b-money'i](http://www.weidai.com/bmoney.txt), hesaplama bulmacaları çözerek para yaratma ve merkeziyetsiz mutabakat fikrini ortaya koyan ilk teklif oldu ancak bu teklif, merkeziyetsiz mutabakatın gerçekten nasıl uygulanabileceği konusunda yetersizdi. 2005'te Hal Finney, bir kriptopara konsepti oluşturmak için b-money fikirlerini Adam Back'in bilgi işlem açısından zor Hashcash bulmacaları ile birlikte kullanan [tekrar kullanılabilir iş ispatları](https://nakamotoinstitute.org/finney/rpow/) konseptini tanıttı ancak arka uç olarak güven gerektiren hesaplamaya dayandığı için yine yetersiz kaldı. 2009'da, merkeziyetsiz bir para birimi ilk kez Satoshi Nakamoto tarafından açık anahtar kriptografisi yoluyla sahipliği yönetmek için kullanılan yerleşik ilkelleri, "iş ispatı" olarak bilinen paralara kimin sahip olduğunu takip etmek kullanılan bir mutabakat algoritmasıyla birleştirerek kullanıma sokuldu.

İş ispatının arkasındaki mekanizma, aynı anda iki sorunu çözdüğü için bu alanda bir çığır açmıştır. İlk olarak, ağdaki düğümlerin Bitcoin defterinin durumuna ilişkin bir dizi kurallı güncelleme üzerinde toplu olarak anlaşmalarına izin veren basit ve orta derecede etkili bir mutabakat algoritması sağladı. İkinci olarak, mutabakat sürecine serbest girişe izin veren, aynı zamanda sybil saldırılarını önlerken, mutabakatı kimin etkileyeceğine karar vereceğine dair siyasi sorunu çözen bir mekanizma sağladı. Bunu, belirli bir listede benzersiz bir varlık olarak kayıt olma şartı gibi katılımın önündeki resmî bir engeli, ekonomik bir engelle değiştirerek yapar: Mutabakat oylama sürecinde tek bir düğümün ağırlığı, düğümün sağladığı hesaplama gücüyle doğru orantılıdır. O zamandan beri, bir düğümün ağırlığının hesaplama kaynaklarıyla değil, sahip olduğu para birimiyle orantılı olarak hesaplanmasıyla, _hisse ispatı_ olarak adlandırılan alternatif bir yaklaşım önerildi; iki yaklaşımın göreceli değerlerinin tartışılması bu makalenin kapsamı dışındadır, ancak her iki yaklaşımın da bir kripto para biriminin omurgası olarak kullanılabileceğini belirtmek gerekir.

### Bir Durum Geçiş Sistemi Olarak Bitcoin {#bitcoin-as-a-state-transition-system}

![Ethereum durum geçişi](./ethereum-state-transition.png)

Teknik açıdan bakıldığında, Bitcoin gibi bir kripto para biriminin defteri, mevcut tüm bitcoin'lerin sahiplik durumunun ve bir durum ve bir işlemi alıp sonuç olarak yeni bir durum çıktısı veren "durum geçiş fonksiyonunun" bulunduğu bir durum geçiş sistemi olarak düşünülebilir. Örneğin standart bir bankacılık sisteminde durum bir bilançodur, bir işlem $X'ını A'dan B'ye taşıma talebidir ve durum geçiş fonksiyonu A'nın hesabındaki değeri $X azaltır ve B hesabındaki değeri $X artırır. A'nın hesabında başlangıçta $X yoksa, durum geçiş fonksiyonu bir hata döndürür. Dolayısıyla, resmi olarak şu şekilde tanımlanabilinir:

```
APPLY(S,TX) -> S' or ERROR
```

Yukarıda tanımlanan bankacılık sisteminde:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Fakat:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

Bitcoin'deki "durum", basılmış ve henüz harcanmamış tüm paralardan oluşan (teknik olarak, "harcanmamış işlem çıktıları" veya UTXO), her UTXO'nun bir değerinin ve bir sahibinin bulunduğu bir koleksiyondur (aslında bir kriptografik açık anahtar olan 20 baytlık bir adresle tanımlanır<sup>[fn1](#notes)</sup>). Bir işlem, bir veya daha fazla girdi içerir; her girdi, mevcut bir UTXO'ya bir referans ve sahibinin adresiyle ilişkili özel anahtar tarafından üretilen bir kriptografik imza içerir ve duruma eklenecek yeni bir UTXO içeren her çıktıyla birlikte bir veya daha fazla çıktı içerir.

Durum geçiş fonksiyonu olan `APPLY(S,TX) -> S'` kabaca şu şekilde tanımlanabilir:

<ol>
  <li>
    <code>TX</code> içindeki her girdi için:
    <ul>
    <li>
        Referans verilen UTXO, <code>S</code> içinde değilse bir hata döndür.
    </li>
    <li>
        Sağlanan imza UTXO'nun sahibiyle eşleşmiyorsa bir hata döndür.
    </li>
    </ul>
  </li>
  <li>
    Tüm girdi UTXO'larının değerleri toplamı, tüm çıktı UTXO'larının birimlerinin toplamından küçükse bir hata döndür.
  </li>
  <li>
    Tüm girdi UTXO'ları kaldırıldığında ve tüm çıktı UTXO'ları eklendiğinde <code>S</code> döndür.
  </li>
</ol>

İlk adımın ilk yarısı, işlem gönderenlerin var olmayan paraları harcamasını engeller, ilk adımın ikinci yarısı, işlem gönderenlerin diğer kişilerin paralarını harcamasını engeller ve ikinci adım, değerin korunmasını zorunlu kılar. Bunu ödeme amacıyla kullanmak için gerekli protokol aşağıdaki gibidir. Alice'in Bob'a 11.7 BTC göndermek istediğini varsayalım. Alice ilk olarak sahip olduğu ve toplamı en az 11.7 BTC'ye kadar olan bir dizi kullanılabilir UTXO arayacaktır. Alice gerçekte tam olarak 11.7 BTC bulamayacak; bulabileceği en küçük sayının 6+4+2=12 olduğunu varsayalım. Daha sonra bu üç girdi ve iki çıktı ile bir işlem yaratır. İlk çıktı, sahibi olarak Bob'un adresiyle birlikte 11.7 BTC olacak ve ikinci çıktı, sahibi Alice'in kendisi olmak üzere, kalan 0.3 BTC "para üstü" olacaktır.

### Madencilik {#mining}

![Ethereum blokları](./ethereum-blocks.png)

Güvenilir bir merkezi hizmete erişimimiz olsaydı, bu sistemi uygulamak çok kolay olurdu; durumu takip etmek için merkezi bir sunucunun sabit diski kullanılarak tam olarak açıklandığı gibi kodlanabilir. Ancak Bitcoin ile merkeziyetsiz bir para birimi sistemi kurmaya çalıştığımız için herkesin işlem sırasını kabul etmesini sağlamak için durum işlem sistemini bir mutabakat sistemi ile birleştirmemiz gerekecek. Bitcoin'in merkeziyetsiz mutabakat süreci, ağdaki düğümlerin sürekli olarak "bloklar" adı verilen işlem paketleri üretmeye çalışmasını gerektirir. Ağın her on dakikada bir blok üretmesi ve her blokta bir zaman damgası, bir nonce değeri, önceki bloğa referans (yani hash değeri) ve önceki bloktan bu yana gerçekleşen işlemlerin hepsinin bir listesi olması amaçlanmıştır. Nihayetinde bu, Bitcoin defterinin en son durumunu temsil etmek için sürekli güncellenen kalıcı ve sürekli büyüyen bir "blok zinciri" yaratır.

Bu paradigmada ifade edilen, bir bloğun geçerli olup olmadığını kontrol etmek için algoritma şu şekildedir:

1. Blok tarafından referans verilen önceki bloğun mevcut ve geçerli olduğunu kontrol et.
2. Bloğun zaman damgasının, önceki bloktan daha büyük olduğunu<sup>[fn2](#notes)</sup> ve geleceğe doğru 2 saatten az olduğunu kontrol et
3. Blok üzerindeki iş ispatının geçerli olduğunu kontrol et.
4. `S[0]` önceki bloğun sonundaki durum olsun.
5. `TX`'in bloğun `n` işlem içeren işlem listesi olduğunu varsayalım. `0...n-1` içindeki tüm `i` için, `S[i+1] = APPLY(S[i],TX[i])` olarak ayarla; herhangi bir uygulama hata döndürürse, çık ve "false" döndür.
6. "true" döndür ve `S[n]` öğesini bu bloğun sonundaki durum olarak kaydet.

Temelde bloktaki her işlem, işlem yürütülmeden önceki kurallı durumdan yeni bir duruma geçerli bir durum geçişi sağlamalıdır. Durumun blokta hiçbir şekilde kodlanmadığına dikkat edin; bu yalnızca doğrulama düğümü tarafından hatırlanacak bir soyutlamadır ve herhangi bir blok için yalnızca başlangıç durumundan başlayarak ve her bloktaki her işlemi sırayla uygulayarak (güvenli bir şekilde) hesaplanabilir. Ek olarak, madencinin bloğa işlemleri dahil ettiği sıranın önemli olduğunu unutmayın; bir blokta B'nin A tarafından oluşturulan bir UTXO'yu harcadığı A ve B'nin iki işlemi varsa, blok sadece A'nın B'den önce geldiği durumda geçerli olur.

Yukarıdaki listede, diğer sistemlerde olmayan tek geçerlilik koşulu "iş ispatı" gerekliliğidir. Kesin koşul, 256 bitlik bir sayı olarak kabul edilen her bloğun çift SHA256 karma değerinin, bu yazının yazıldığı tarih itibariyle yaklaşık 2<sup>187</sup> olan dinamik olarak ayarlanmış bir hedeften daha az olması gerektiğidir. Bunun amacı, blok oluşturmayı hesaplama açısından "zor" hâle getirmek ve böylece sybil saldırganlarının tüm blok zincirini kendi lehlerine yeniden oluşturmasını engellemektir. SHA256 tamamen öngörülemeyen bir sözde rastgele fonksiyon olarak tasarlandığından, geçerli bir blok oluşturmanın tek yolu basitçe deneme yanılma, tekrar tekrar nonce değerini artırmak ve yeni hash değerinin eşleşip eşleşmediğini görmektir.

Geçerli hedef olan \~2<sup>187</sup>'de, geçerli bir blok bulunmadan önce ağın ortalama \~2<sup>69</sup> deneme yapması gerekir; genel olarak, hedef ağ tarafından her 2016 blokta bir yeniden kalibre edilir, böylece ağdaki bazı düğümler tarafından ortalama olarak her on dakikada bir yeni bir blok üretilir. Madencileri bu hesaplama işi için tazmin etmek amacıyla her bloğun madencisi, kendilerine yoktan 25 BTC veren bir işlem ekleme hakkına sahiptir. Ek olarak, herhangi bir işlemin girdileri çıktılarından daha yüksek bir toplam değere sahipse, fark madenciye "işlem ücreti" olarak da gider. Ayrıca bu, BTC'nin verildiği tek mekanizmadır; başlangıç durumu hiç para içermiyordu.

Madenciliğin amacını daha iyi anlamak için kötü niyetli bir saldırgan durumunda neler olduğunu inceleyelim. Bitcoin'in temelindeki kriptografinin güvenli olduğu biliniyorsa, saldırgan Bitcoin sisteminin doğrudan kriptografi ile korunmayan kısmını hedef alacaktır: işlem sırası. Saldırganın stratejisi basittir:

1. Bir ürün karşılığında bir satıcıya 100 BTC gönder (tercihen hızlı teslim edilen bir dijital ürün)
2. Ürünün teslim edilmesini bekle
3. Aynı 100 BTC'yi kendisine gönderen başka bir işlem üret
4. Ağı, kendisine yaptığı işlemin ilk gelen işlem olduğuna ikna etmeye çalış.

Adım (1) gerçekleştikten birkaç dakika sonra bir madenci işlemi bir bloğa, diyelim ki 270000 numaralı bloğa dahil edecektir. Yaklaşık bir saat sonra, bu bloktan sonra zincire beş blok daha eklenecek ve bu blokların her biri dolaylı olarak işleme işaret edecek ve böylece onu "onaylayacak". Bu noktada satıcı ödemeyi kesinleşmiş olarak kabul edecek ve ürünü teslim edecektir; bunun dijital bir mal olduğunu varsaydığımız için teslimat anında gerçekleşir. Şimdi, saldırgan 100 BTC'yi kendisine gönderen başka bir işlem oluşturur. Saldırgan işlemi öylece vahşi doğaya bırakırsa işlem işlenmez; madenciler `APPLY(S,TX)` çalıştırmayı deneyecek ve `TX`'in artık durumda olmayan bir UTXO tükettiğini fark edecek. Bunun yerine saldırgan, 270000 numaralı bloğun başka bir versiyonunu, bir ebeveyn olarak aynı 269999 numaralı bloğa işaret ederek ancak eskisinin işlemin yerine yeni işlemi koyarak blok zincirinin bir "çatalını" oluşturur. Blok verileri farklı olduğundan bu, iş ispatının yeniden yapılmasını gerektirir. Ayrıca, saldırganın yeni 270000 numaralı blok sürümünün farklı bir hash değeri olduğu için 270001 ila 270005 numaralı orijinal bloklar ona "işaret etmez". Bu nedenle, orijinal zincir ve saldırganın yeni zinciri tamamen ayrıdır. Bir çatalda en uzun blok zincirinin gerçek olarak kabul edilmesi kuralı bulunur ve bu nedenle meşru madenciler 270005 numaralı zincir üzerinde çalışırken, saldırgan tek başına 270000 numaralı zincir üzerinde çalışır. Saldırganın kendininkini en uzun blok zinciri yapabilmesi için ağın geri kalanının toplamından daha fazla hesaplama gücüne sahip olması gerekir (yani "%51 saldırısı").

### Merkle Ağaçları {#merkle-trees}

![Bitcoin'de SPV](./spv-bitcoin.png)

_Sol: Bir Merkle'da, ağacın bir dalının geçerliliğini kanıtlamak için, az sayıda düğüm sunmak yeterlidir._

_Sağ: Merkle ağacının herhangi bir parçasını değiştirme girişimi, sonunda zincirin bir yerinde bir tutarsızlığa yol açar._

Bitcoin'in önemli bir ölçeklenebilirlik özelliği, bloğun çok seviyeli bir veri yapısında saklanmasıdır. Bir bloğun "hash değeri" aslında yalnızca kabaca 200 baytlık bir veri parçası olan blok başlığının zaman damgasını, nonce değerini, önceki blok hash değerini ve içindeki tüm işlemleri depolayan Merkle ağacı adı verilen bir veri yapısı kök hash değerini içerir. Bir Merkle ağacı, ağacın altında temel verileri içeren çok sayıda yaprak düğümü olan bir dizi düğümden, her düğümün iki çocuğunun özeti olduğu bir dizi ara düğümden ve son olarak, yine ağacın "tepesini" temsil eden, iki çocuğunun hash değerinden oluşan tek bir kök düğümden oluşan bir ikili ağaç türüdür. Merkle ağacının amacı, bir bloktaki verilerin parça parça iletilmesine izin vermektir: Bir düğüm yalnızca bir kaynaktan bir bloğun başlığını indirebilir, ağacın kendisiyle ilgili küçük kısmını başka bir kaynaktan indirebilir ve yine de tüm verilerin doğru olduğundan emin olabilir. Bunun işe yaramasının nedeni, hash değerlerinin yukarı doğru yayılmasıdır: Kötü niyetli bir kullanıcı sahte bir işlemde Merkle ağacının altına bir takas eklemeye çalışırsa, bu değişiklik yukarıdaki düğümde bir değişikliğe ve ardından yukarıdaki düğümde bir değişikliğe neden olur, nihayetinde ağacın kökünü ve dolayısıyla bloğun hash değerini değiştirerek protokolün onu tamamen farklı bir blok olarak kaydetmesine neden olur (neredeyse kesinlikle geçersiz bir iş ispatı ile).

Merkle ağacı protokolünün, uzun vadede sürdürülebilirlik için gerekli olduğu söylenebilir. Bitcoin ağındaki her bloğun tamamını depolayan ve işleyen bir "tam düğüm", Nisan 2014 itibariyle Bitcoin ağında yaklaşık 15 GB disk alanı kaplıyor ve ayda bir gigabayttan fazla büyüyor. Şu anda bu, telefonlar için olmasa da bazı masaüstü bilgisayarlar için kullanışlıdır ve daha sonra gelecekte yalnızca işletmeler ve hobi olarak kullananlar katılabilecek. "Basitleştirilmiş ödeme doğrulaması" (SPV) olarak bilinen bir protokol, "hafif düğümler" adı verilen ve blok başlıklarını indiren, blok başlıklarındaki iş ispatını doğrulayan ve ardından yalnızca kendileriyle ilgili işlemlerle ilişkili "dalları indiren" başka bir düğüm sınıfının var olmasına izin verir. Bu, hafif düğümlerin tüm blok zincirinin yalnızca çok küçük bir bölümünü indirirken herhangi bir Bitcoin işleminin durumunun ve mevcut bakiyesinin ne olduğunu güçlü bir güvenlik garantisi ile belirlemesine olanak tanır.

### Alternatif Blok Zinciri Uygulamaları {#alternative-blockchain-applications}

Temeldeki blok zinciri fikrini alıp, diğer kavramlarda uygulama fikrinin de uzun bir geçmişi vardır. 2005 yılında Nick Szabo [sahiplik yetkili güvenli mülk unvanları](https://nakamotoinstitute.org/secure-property-titles/) kavramını ortaya attı. Bu, "çoğaltılmış veri tabanı teknolojisindeki yeni gelişmelerin", kimin hangi araziye sahip olduğuna dair kayıtları saklamak ve ev sahibi olma, fiili işgal ve Gürcü arazi vergisi gibi kavramları içeren ayrıntılı bir çerçeve oluşturmak için blok zinciri temelli bir sistemin oluşturulmasını nasıl sağlayacağını açıklayan bir belgedir. Ancak ne yazık ki o zamanlar etkili bir çoğaltılmış veri tabanı sistemi olmadığı için protokol hiçbir zaman uygulanmadı. Ancak 2009'dan sonra Bitcoin'in merkeziyetsiz mutabakat geliştirildikten sonra bir takım alternatif uygulamalar hızla ortaya çıkmaya başladı.

- **Namecoin** - 2010'da oluşturuldu, [Namecoin](https://namecoin.org/) en iyi şekilde merkeziyetsiz bir isim kayıt veri tabanı olarak tanımlanabilir. Tor, Bitcoin ve BitMessage gibi merkeziyetsiz protokollerde, insanların onlarla etkileşime girebilirmesi için hesapları tanımlamanın bir yolu olmalıdır ancak mevcut tüm çözümlerde var olan olan tek tür tanımlayıcı, `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy` gibi sözde rastgele bir hash değeridir. İnsanlar "george" gibi bir adı olan bir hesaba sahip olmak isteyecektir. Ancak sorun şu ki, bir kişi "George" adında bir hesap oluşturabilirse, o zaman başka biri de "George"u kaydetmek için aynı işlemden faydalanabilir ve onu taklit edebilir. Tek çözüm, ilk kaydedicinin başarılı olduğu ve ikincisinin başarısız olduğu ilk dosya paradigmasıdır: Bu, Bitcoin mutabakat protokolü için mükemmel bir sorundur. Namecoin, böyle bir fikir kullanarak oluşturulmuş bir isim kayıt sisteminin uygulamasının en eski ve en başarılı olan örneğidir.
- **Renkli paralar** - [Renkli paraların amacı](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit), insanların Bitcoin blok zincirinde kendi dijital para birimleri veya tek bir birimi bulunan para birimi oluşturma ihtiyacı durumunda, dijital token'lar yaratmasını sağlayan bir protokol görevi görmektir. Renkli paralar protokolünde, belirli bir Bitcoin UTXO'ya genel olarak bir renk atayarak yeni bir para birimi "yayınlanır" ve protokol, diğer UTXO'ların rengini, onları oluşturan işlemin harcadığı girdilerin rengiyle aynı olacak şekilde tekrar tekrar tanımlar (karma renkli girdiler durumunda bazı özel kurallar geçerlidir). Bu, kullanıcıların yalnızca belirli bir renkteki UTXO'yu içeren cüzdanları muhafaza etmelerine ve bunları normal bitcoin'ler gibi etrafa göndermelerine, aldıkları herhangi bir UTXO'nun rengini belirlemek için blok zinciri boyunca geri izlemelerine olanak tanır.
- **Metacoins** - metacoin'in ardındaki fikir, Bitcoin üzerinde yaşayan, metacoin işlemlerini depolamak için Bitcoin işlemlerini kullanan ancak farklı bir durum geçiş fonksiyonuna sahip olan bir protokole sahip olmaktır: `APPLY'`. Metacoin protokolü, Bitcoin blok zincirinde geçersiz metacoin işlemlerinin görünmesini engelleyemediği için, `APPLY'(S,TX)` bir hata döndürürse, protokol `APPLY'(S,TX) = S` fonksiyonuna döner. Bu, potansiyel olarak Bitcoin'in kendi içinde uygulanamayan gelişmiş özelliklere sahip, ancak madencilik ve ağ oluşturmanın karmaşıklıkları zaten Bitcoin protokolü tarafından ele alındığından çok düşük bir geliştirme maliyetiyle, isteğe bağlı bir kripto para birimi protokolü oluşturmak için kolay bir mekanizma sağlar. Metacoin'ler, bazı mali sözleşme sınıflarını, isim kaydı ve merkeziyetsiz borsayı uygulamak için kullanılmıştır.

Bu nedenle, genel olarak, bir mutabakat protokolü oluşturmaya yönelik iki yaklaşım vardır: bağımsız bir ağ oluşturmak ve Bitcoin'in üzerinde bir protokol oluşturmak. İlk yaklaşım, Namecoin gibi uygulamalarda oldukça başarılı olsa da hayata geçirilmesi zordur; her bir bireysel uygulamanın; bağımsız bir blok zinciri başlatması ve gerekli tüm durum geçişi ve ağ kodu oluşturması ve test etmesi gerekir. Ek olarak, merkeziyetsiz mutabakat teknolojisine yönelik uygulama setinin, uygulamaların büyük çoğunluğunun kendi blok zincirini gerektirmeyecek kadar küçük olacağı bir güç yasası dağılımını izleyeceğini tahmin ediyoruz ve özellikle merkeziyetsiz otonom organizasyonlar olmak üzere birbirleriyle etkileşime girmesi gereken kuruluşlar olan büyük merkeziyetsiz uygulama sınıfları olduğunu göz önünde bulunduruyoruz.

Bitcoin tabanlı yaklaşım ise Bitcoin'in basitleştirilmiş ödeme doğrulama özelliklerini miras almaması gibi bir kusura sahiptir. SPV, Bitcoin için kullanışlıdır çünkü geçerlilik için bir vekil olarak blok zinciri derinliğini kullanabilir; bir noktada, bir işlemin ataları yeterince geriye gittiğinde, yasal olarak durumun bir parçası oldukları kesin bir şekilde söylenebilir. Blok zinciri tabanlı meta protokoller ise blok zincirini kendi protokolleri bağlamında geçerli olmayan işlemleri dahil etmemeye zorlayamaz. Bu nedenle, tamamen güvenli bir SPV meta protokolü uygulamasının, belirli işlemlerin geçerli olup olmadığını belirlemek için Bitcoin blok zincirinin başlangıcına kadar geriye doğru taraması gerekir. Şu anda, Bitcoin tabanlı meta-protokollerin tüm "hafif" uygulamaları, verileri sağlamak için güvenilen bir sunucuya bel bağlıyor; bu, özellikle bir kripto para biriminin asıl amaçlarından biri güven ihtiyacını ortadan kaldırmak olduğu için muhtemelen oldukça yetersiz bir sonuç olacaktır.

### Komut Dosyaları {#scripting}

Herhangi bir uzantı olmadan bile, Bitcoin protokolü aslında "akıllı sözleşme" kavramının zayıf bir versiyonunun uygulanmasını kolaylaştırıyor. Bitcoin'deki UTXO, yalnızca bir açık anahtara değil, aynı zamanda yığın tabanlı basit bir programlama dilinde ifade edilen daha karmaşık bir komut dosyasına da sahip olabilir. Bu paradigmada, o UTXO'yu harcayan işlem, komut dosyasının gerekliliklerini yerine getirecek veriler sunmalıdır. Aslında, temel açık anahtar sahipliği mekanizması bile bir komut dosyası aracılığıyla uygulanır: Komut dosyası girdi olarak eliptik bir eğri imzası alır, bunu UTXO'nun sahip olduğu işlem ve adresle doğrular ve doğrulama başarılı olursa 1, aksi takdirde 0 döndürür. Çeşitli ek kullanım durumları için başka, daha karmaşık komut dosyaları mevcuttur. Örneğin, doğrulamak için belirli bir üç özel anahtarın ("multisig") ikisinden imza gerektiren bir komut dosyası oluşturulabilir. Bu; şirket hesapları, güvenli tasarruf hesapları ve bazı ticari emanet durumları için yararlı bir kurulumdur. Komut dosyaları ayrıca, hesaplama sorunlarının çözümleri için ödül ödemek için kullanılabilir ve hatta "bu değerin bir Dogecoin işlemini bana gönderdiğinize dair bir SPV kanıtı sağlayabilirseniz, bu Bitcoin UTXO sizindir" gibi bir şey yazan bir komut dosyası oluşturabilirsiniz. Yani esasen merkeziyetsiz bir çapraz kripto para birimi değişimine izin verir.

Bununla birlikte, Bitcoin'de uygulanan komut dosyası dilinin birkaç önemli sınırlaması vardır:

- **Turing-tamlığı eksikliği** - Yani, Bitcoin komut dosyası dilinin desteklediği büyük bir hesaplama alt kümesi olsa da, neredeyse her şeyi desteklemez. Eksik olan ana kategori, döngülerdir. Bu, işlem doğrulaması sırasında sonsuz döngülerden kaçınmak için yapılır; Teorik olarak bu, komut dosyası programcıları için aşılabilir bir engeldir. Çünkü herhangi bir döngü, temel alınan kodun bir "if" ifadesiyle birçok kez tekrarlanmasıyla simüle edilebilir ancak bu, saklama alanı açısından çok verimsiz komut dosyalarına yol açar. Örneğin, alternatif bir eliptik eğri imza algoritmasının uygulanması, muhtemelen tümü koda ayrı ayrı dahil edilen 256 tekrarlı çarpma turu gerektirecektir.
- **Değer körlüğü** - Bir UTXO komut dosyasının çekilebilecek miktar üzerinde ayrıntılı kontrol sağlamasının hiçbir yolu yoktur. Örneğin, A ve B'nin 1000 $ değerinde BTC koyduğu ve 30 gün sonra senaryonun 1000 $ değerinde BTC'yi A'ya ve geri kalanını B'ye gönderdiği bir riskten korunma sözleşmesi bir kehanet sözleşmesinin güçlü bir kullanımına örnek olabilir. Kahin, USD cinsinden 1 BTC'nin değerini belirlemek için yeterlidir ancak o zaman bile, şu anda mevcut olan tamamen merkezi çözümlere göre güven ve altyapı gereksinimi açısından büyük bir gelişmedir. Bununla birlikte, UTXO "ya hep ya hiç" niteliğinde olduğundan bunu başarmanın tek yolu, çok sayıda farklı değerde UTXO'ya sahip olmak (örneğin 30'a kadar her k başına 2<sup>k</sup> değerinde bir UTXO) ve hangi UTXO'nun A'ya ve hangisinin B'ye gönderileceğini kâhinin seçmesi gibi oldukça verimsiz bir hileyi kullanmaktır.
- **Durum eksikliği** - UTXO ya harcanabilir, ya da harcanamayabilir; bunun ötesinde başka herhangi bir dahili durumu tutan çok aşamalı sözleşmeler veya komut dosyaları için bir seçenek yoktur. Bu, çok aşamalı seçenek sözleşmeleri, merkeziyetsiz takas teklifleri veya iki aşamalı kriptografik taahhüt protokolleri (güvenli hesaplama ödülleri için gerekli) yapmayı zorlaştırır. Bu aynı zamanda UTXO'nun merkeziyetsiz kuruluşlar gibi daha karmaşık "durumlu" sözleşmeler değil, yalnızca basit, bir kerelik sözleşmeler oluşturmak için kullanılabileceği ve meta protokollerin uygulanmasını zorlaştırdığı anlamına gelir. Değer körlüğü ile birleşen ikili durum, başka bir önemli uygulamanın, yani para çekme limitlerinin imkansız olduğu anlamına gelir.
- **Blok zinciri körlüğü** - UTXO; nonce değeri, zaman damgası ve önceki bloğun hash değeri gibi blok zinciri verilerine kördür. Bu, kod yazma dilini potansiyel olarak değerli bir rastgelelik kaynağından mahrum ederek kumar ve diğer birkaç kategorideki uygulamaları ciddi şekilde sınırlar.

Böylece, kripto para biriminin üzerine gelişmiş uygulamalar oluşturmaya yönelik üç yaklaşım görüyoruz: yeni bir blok zinciri oluşturmak, Bitcoin üzerinde komut dosyası yazmak ve Bitcoin üzerinde bir meta protokol oluşturmak. Yeni bir blok zinciri oluşturmak, bir özellik kümes oluşturmada sınırsız özgürlüğe izin verir ancak geliştirme süresi, başlatma çabası ve güvenlik konusunda maliyet oluşturur. Komut dosyası oluşturmanın uygulanması ve standartlaştırılması kolaydır ancak komut dosyalarının kabiliyetleri çok sınırlıdır ve meta protokoller kolay olsa da ölçeklenebilirlikteki hatalardan muzdariptir. Ethereum ile, geliştirme kolaylığında daha da büyük kazanımların yanı sıra daha güçlü hafif istemci özellikleri sağlayan ve aynı zamanda uygulamaların ekonomik bir ortamı ve blok zinciri güvenliğini paylaşmasına izin veren alternatif bir çerçeve oluşturmayı amaçlıyoruz.

## Ethereum {#ethereum}

Ethereum'un amacı, birçok merkeziyetsiz uygulama için çok faydalı olacağına inandığımız farklı bir maliyet-kazanç kümesi sağlayan merkeziyetsiz uygulamalar için alternatif bir protokol oluşturmaktır ve hızlı geliştirme süresinin, küçük ve nadiren kullanılan uygulamalar için güvenliğin ve farklı uygulamaların çok verimli bir şekilde etkileşim kurmasının önemli olduğu durumlara özellikle önem verilir. Ethereum bunu aslında en üstün soyut temel katmanı inşa ederek yapar: Turing-tam programlama dilinde, herkesin akıllı sözleşme yazmasına izin veren, merkeziyetsiz uygulamaların kendi mülkiyet, işlem biçimleri ve durum geçişi için keyfi kural fonksiyonları oluşturabilecekleri yerleşik bir blok zinciri. Namecoin'in temel bir versiyonu iki satır kodda yazılabilir, para birimleri ve itibar sistemleri gibi diğer protokoller yirmiden az satırla oluşturulabilir. Değer içeren ve yalnızca belirli koşullar yerine getirildiğinde kilidi açılan kriptografik "kutular" olan akıllı sözleşmeler, Turing-tamlığı, değer farkındalığı, blok zinciri farkındalığı ve durum gibi ek avantajlarla Bitcoin komut dosyası tarafından sunulandan çok daha fazla güçle platform üzerinde oluşturulabilir.

### Ethereum Hesapları {#ethereum-accounts}

Ethereum'da durum, "hesap" olarak adlandırılan nesnelerden oluşur ve her hesabın 20 baytlık bir adresi vev hesaplar arasında doğrudan değer ve bilgi transferi olan durum geçişleri bulunur. Bir Ethereum hesabında dört alan bulunur:

- **nonce değeri**, her işlemin yalnızca bir kez işlenebildiğinden emin olmak için kullanılan bir sayaçtır
- Hesabın mevcut **ether bakiyesi**
- Eğer varsa, hesabın **sözleşme kodu**
- Hesabın **deposu** (varsayılan olarak boş)

"Ether", Ethereum'un ana dahili kripto yakıtıdır ve işlem ücretlerini ödemek için kullanılır. Genel olarak, iki tür hesap vardır: özel anahtarlar tarafından kontrol edilen **harici olarak sahiplenilmiş hesaplar** ve sözleşme kodları tarafından kontrol edilen **sözleşme hesapları**. Harici olarak sahiplenilmiş bir hesabın kodu yoktur ve harici olarak sahiplenilmiş bir hesaptan bir işlem oluşturularak ve imzalanarak mesaj gönderilebilir; bir sözleşme hesabında, sözleşme hesabı her mesaj aldığında kodu etkinleşir, bu da dahili depolamaya okuyup yazmasına ve başka mesajlar göndermesine veya sırayla sözleşmeler oluşturmasına izin verir.

Ethereum'daki "sözleşmelerin", "yerine getirilmesi" veya "uyulması" gereken bir şey olarak görülmemesi gerektiğini unutmayın; bundan ziyade, daha çok Ethereum yürütme ortamının içinde yaşayan, bir mesaj veya işlem tarafından "dürtüldüğünde" her zaman belirli bir kod parçasını yürüten ve kalıcı değişkenleri takip etmek için kendi ether bakiyeleri ve kendi anahtarları/değer depoları üzerinde doğrudan kontrole sahip olan "otonom temsilciler" gibidirler.

### Mesajlar ve İşlemler {#messages-and-transactions}

Ethereum'da "İşlem" terimi, harici olarak sahiplenilmiş bir hesaptan gönderilecek bir mesajı saklayan imzalı veri paketini ifade etmek için kullanılır. İşlemler şunları içerir:

- Mesajın alıcısı
- Göndereni tanımlayan bir imza
- Göndericiden alıcıya transfer edilecek ether miktarı
- İsteğe bağlı bir veri alanı
- İşlem yürütümünün gerçekleştirmesine izin verilen maksimum sayıdaki hesaplama adımlarını temsil eden bir `STARTGAS` değeri
- Hesaplama adımı başına göndericinin ödediği ücreti temsil eden bir `GASPRICE` değeri

İlk üçü, herhangi bir kripto para biriminde beklenen standart alanlardır. Veri alanının varsayılan olarak bir fonksiyonu yoktur ancak sanal makinenin bir sözleşmenin verilere erişmek için kullanabileceği bir işlem kodu vardır. Kullanım alanına bir örnek: Bir sözleşme blok zinciri üzerinde alan adı kayıt hizmeti olarak çalışıyorsa kendisine iletilen verileri, birincisi "alan adı" kaydedilecek bir alan ve ikincisi alan adının kaydedileceği IP adresi olmak üzere iki "alan" içeriyor olarak yorumlamak isteyebilir. Sözleşme bu değerleri mesaj verilerinden okur ve uygun şekilde depoya yerleştirir.

`STARTGAS` ve `GASPRICE` alanları, Ethereum'un hizmet reddi önleme modeli için çok önemlidir. Kaza veya saldırı sonucu oluşan sonsuz döngüleri veya koddaki diğer hesaplama israfını önlemek için her işlemin kullanabileceği kod yürütmenin hesaplama adımına bir sınır koyması gerekir. Temel hesaplama birimi "gaz"dır; genellikle, bir hesaplama adımı 1 gaza mal olur ancak bazı işlemler, hesaplama açısından daha pahalı olduklarından veya durumun bir parçası olarak depolanması gereken veri miktarını artırdıklarından daha yüksek miktarlarda gaza mal olur. Ayrıca işlem verilerindeki her bayt için 5 gaz ücreti bulunur. Ücret sisteminin amacı, bir saldırganın hesaplama, bant genişliği ve depolama dahil olmak üzere tükettiği her kaynak için orantılı olarak ödeme yapmasını istemektir; bu nedenle, ağın bu kaynaklardan daha fazla tüketmesine yol açan herhangi bir işlem, artışla kabaca orantılı bir gaz ücretine sahip olmalıdır.

### Mesajlar {#messages}

Sözleşmeler, diğer sözleşmelere "mesaj" gönderme yeteneğine sahiptir. Mesajlar, hiçbir zaman serileştirilmeyen ve yalnızca Ethereum yürütme ortamı içinde var olan sanal nesnelerdir. Bir mesaj şunları içerir:

- Mesajı gönderen (örtük)
- Mesajın alıcısı
- Mesajın yanında aktarılacak ether miktarı
- İsteğe bağlı bir veri alanı
- Bir `STARTGAS` değeri

Bir mesaj aslında bir işlem gibidir ancak harici bir aktör değil, bir sözleşme tarafından oluşturulur. Şu anda kodu yürüten bir sözleşme, bir mesaj üreten ve yürüten `CALL` işlem kodunu yürüttüğünde bir mesaj üretilir. Bir işlem gibi bir mesaj da, kodunu çalıştıran alıcı hesabına yönlendirir. Bu nedenle sözleşmeler, diğer sözleşmelerle tam olarak harici aktörlerin yapabileceği şekilde ilişki kurabilir.

Bir işlem veya sözleşme tarafından tahsis edilen gaz ödeneğinin, o işlem ve tüm alt yürütmeler tarafından tüketilen toplam gaz için geçerli olduğunu unutmayın. Örneğin, harici bir aktör olan A, 1000 gaz ile B'ye bir işlem gönderirse ve B de C'ye mesaj göndermeden önce 600 gaz tüketir ve C'nin dahili yürütmesi geri dönmeden önce 300 gaz tüketirse, B aktörü daha sonra gazı bitmeden önce 100 gaz daha harcayabilir.

### Ethereum Durum Geçiş Fonksiyonu {#ethereum-state-transition-function}

![Ether durum geçişi](./ether-state-transition.png)

Ethereum durum geçiş fonksiyonu, `APPLY(S,TX) -> S'` aşağıdaki gibi tanımlanabilir:

1. İşlemin iyi biçimli olup olmadığını (yani doğru sayıda değere sahip olup olmadığını), imzanın geçerli olup olmadığını ve nonce değerinin gönderenin hesabındaki nonce değeri ile eşleşip eşleşmediğini kontrol edin. Değilse, bir hata döndür.
2. İşlem ücretini `STARTGAS * GASPRICE` olarak hesapla ve imzadan gönderen adresi belirle. Ücreti gönderenin hesap bakiyesinden çıkar ve gönderenin nonce değerini artır. Harcamak için yeterli bakiye yoksa, bir hata döndür.
3. `GAS = STARTGAS` öğesini başlatın ve işlemdeki baytları ödemek için bayt başına belirli bir miktarda gaz ayırın.
4. Göndericinin hesabındaki işlem değerini alıcı hesaba aktar. Alıcı hesap henüz mevcut değilse, oluşturun. Alıcı hesap bir sözleşmeyse, sözleşmenin kodunu tamamlanana kadar veya yürütmenin gazı bitene kadar çalıştır.
5. Değer transferi, gönderenin yeterli parası olmadığı veya kod yürütmenin gazı tükendiği için başarısız olursa, ücretlerin ödenmesi dışındaki tüm durum değişikliklerini geri alın ve ücretleri madencinin hesabına ekleyin.
6. Aksi takdirde, kalan tüm gazın ücretlerini gönderene iade et ve tüketilen gaz için ödenen ücretleri madenciye gönder.

Örneğin, sözleşmenin kodunun şöyle olduğunu varsayalım:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Gerçekte sözleşme kodunun düşük seviyeli EVM kodunda yazıldığını unutmayın; bu örnek, anlaşılır olması için üst düzey dillerimizden biri olan Serpent'te yazılmıştır ve EVM koduna derlenebilir. Sözleşmenin deposunun boş olarak başladığını ve 10 ether value, 2000 gaz, 0.001 ether gasprice ve 0-31 baytlarının `2` sayısını ve 32-63 baytlarının `CHARLIE` dizesini temsil ettiği 64 baytlık veri içeren bir işlemin gönderildiğini varsayalım. Bu durumda, durum geçiş fonksiyonu için süreç aşağıdaki gibidir:

1. İşlemin geçerli ve iyi biçimlendirilmiş olduğunu kontrol et.
2. İşlem göndericisinin en az 2000 \* 0.001 = 2 ethere sahip olduğunu kontrol et. Eğer öyleyse, gönderenin hesabından 2 ether eksilt.
3. Gazı başlat = 2000; İşlemin 170 bayt uzunluğunda ve bayt ücretinin 5 olduğunu varsayarak, 1150 gaz kalması için 850 çıkarın.
4. Gönderenin hesabından 10 ether daha çıkar ve sözleşmenin hesabına ekle.
5. Kodu çalıştırın. Bu durumda, bu basittir: Sözleşmenin `2` endeksindeki depolamasının kullanılıp kullanılmadığını kontrol eder, kullanılmadığını fark eder ve böylece `2` endeksindeki depolamayı `CHARLIE` değeri şeklinde ayarlar. Bunun 187 gaz harcadığını varsayalım, yani kalan gaz miktarı: 1150 - 187 = 963
6. Gönderenin hesabına 963 \* 0.001 = 0.963 ether ekle ve elde edilen durumu döndür.

İşlemin alıcı tarafında herhangi bir sözleşme yoksa toplam işlem ücreti, sağlanan `GASPRICE` değerinin işlemin bayt cinsinden uzunluğuyla çarpımına eşit olacaktır ve işlemle birlikte gönderilen veriler önemsiz olacaktır.

Mesajların geri dönüşler açısından işlemlere eşdeğer şekilde çalıştığını unutmayın: bir mesaj yürütmesinin gazı biterse, o mesajın yürütülmesi ve bu yürütme tarafından tetiklenen tüm diğer yürütmeler geri alınır, ancak ana yürütmelerin geri alınması gerekmez. Bu, bir sözleşmenin başka bir sözleşme çağrısı yapmasının "güvenli" olduğu anlamına gelir, A'nın B'yi G miktarda gaz ile çağırıyorsa, A'nın yürütmesinin en fazla G miktarından fazla gaz kaybetmesi önlenir. Son olarak, bir sözleşme oluşturan `CREATE` adlı bir işlem kodu olduğuna dikkat edin; yürütme mekanikleri, yürütme çıktısının yeni oluşturulan bir sözleşmenin kodunu belirlemesi dışında, genellikle `CALL` öğesine benzer.

### Kod Yürütme {#code-execution}

Ethereum sözleşmelerindeki kod, "Ethereum sanal makinesi kodu" veya "EVM kodu" olarak adlandırılan düşük seviyeli, yığın tabanlı bir bayt kodu dilinde yazılır. Kod, her baytın bir işlemi temsil ettiği bir dizi bayttan oluşur. Genel olarak, kod yürütme, işlemi geçerli program sayacında (sıfırdan başlar) tekrar tekrar gerçekleştirmekten ve ardından program sayacını kodun sonuna ulaşılana kadar ve bir hatanın veya `STOP` ya da `RETURN` talimatının algılanmasına kadar birer birer artırmaktan oluşan sonsuz bir döngüdür. İşlemlerin, veri depolamak için üç tür alana erişimi vardır:

- **Yığın**, değerlerin itilip atılabileceği "son giren ilk çıkar" niteleiğinde kapsayıcı
- **Bellek**, sonsuz genişletilebilir bir bayt dizisi
- Sözleşmenin uzun vadeli **depolaması**, bir anahtar/değer deposu. Hesaplama sona erdikten sonra sıfırlanan yığın ve belleğin aksine, depolama uzun süre devam eder.

Kod ayrıca gelen mesajın değerine, göndericisine ve verilerine ve ayrıca blok başlık verilerine erişebilir ve kod ayrıca bir bayt veri dizisini çıktı olarak döndürebilir.

EVM kodunun resmi yürütme modeli şaşırtıcı derecede basittir. Ethereum sanal makinesi çalışırken, tam hesaplama durumu "demet" tarafından tanımlanabilir `(block_state, transaction, message, code, memory, stack, pc, gas)`, buradaki `block_state`, tüm hesapları, bakiyeleri ve depolamayı içeren küresel durumdur. Her yürütme turunun başlangıcında geçerli talimat, `code` öğesinin `pc` baytı alınarak bulunur (veya `pc >= len(code)` ise 0) ve her talimatın, demeti nasıl etkilediğine göre kendi tanımı vardır. Örneğin, `ADD` iki öğeyi yığından çıkarır ve toplamlarını iter, `gas` değerini 1 azaltıp `pc` değerini 1 artırırken `SSTORE`, en üstteki iki öğeyi yığından iter ve ikinci öğeyi ilk öğe tarafından belirtilen endekste sözleşmenin depolamasına ekler. Tam zamanında derleme yoluyla Ethereum sanal makine yürütmesini optimize etmenin birçok yolu olsa da, temel bir Ethereum uygulaması birkaç yüz satır kodla yapılabilir.

### Blok Zinciri ve Madencilik {#blockchain-and-mining}

![Ethereum uygulamalı blok şeması](./ethereum-apply-block-diagram.png)

Ethereum blok zinciri, bazı farklılıkları olmasına rağmen, birçok yönden Bitcoin'e benzer. Blok zinciri mimarisine göre Ethereum ve Bitcoin arasındaki temel fark, Bitcoin'den farklı olarak Ethereum bloklarının hem işlem listesinin hem de en son durumun bir kopyasını içermesidir. Bunun dışında, blok numarası ve zorluk olan diğer iki değer de blokta saklanır. Ethereum'daki temel blok doğrulama algoritması aşağıdaki gibidir:

1. Referans verilen önceki bloğun mevcut ve geçerli olup olmadığını kontrol et.
2. Bloğun zaman damgasının, referans verilen önceki bloktan daha büyük olduğunu ve geleceğe doğru 15 dakikadan az olduğunu kontrol et
3. Blok numarası, zorluk, işlem kökü, temel kök ve gaz limitinin (çeşitli düşük seviyeli Ethereum'a özgü kavramlar) geçerli olup olmadığını kontrol edin.
4. Blok üzerindeki iş ispatının geçerli olduğunu kontrol et.
5. `S[0]` önceki bloğun sonundaki durum olsun.
6. `TX`, `n` işlemle bloğun işlem listesi olsun. `0...n-1` içindeki tüm `i` için, `S[i+1] = APPLY(S[i],TX[i])` olarak ayarla. Herhangi bir uygulama bir hata döndürürse veya bu noktaya kadar blokta tüketilen toplam gaz `GASLIMIT` değerini aşarsa, bir hata döndürür.
7. `S_FINAL` `S[n]` olsun, ancak madenciye ödenen blok ödülü de dahil edilecek.
8. `S_FINAL` durumunun Merkle ağacı kökünün, blok başlığında sağlanan son durum köküne eşit olup olmadığını kontrol edin. Eğer öyleyse blok geçerlidir; aksi hâlde geçerli değildir.

Yaklaşım ilk bakışta oldukça verimsiz görünebilir, çünkü tüm durumu her blokta depolaması gerekir, ancak gerçekte verimlilik Bitcoin'inkiyle karşılaştırılabilir seviyede olacaktır. Bunun nedeni, durumun ağaç yapısında saklanması ve her bloktan sonra ağacın sadece küçük bir bölümünün değiştirilmesi gerektiğidir. Bu nedenle, genel olarak, iki bitişik blok arasında ağacın büyük çoğunluğu aynı olmalıdır ve bu nedenle veriler bir kez saklanabilir ve işaretçiler (yani alt ağaçların hash değerleri) kullanılarak iki kez referans alınabilir. Bunu başarmak için "Patricia ağacı" olarak bilinen özel bir ağaç türü kullanılır; buna Merkle ağacı konseptinde, düğümlerin verimli bir şekilde yalnızca değiştirilmeyip, eklenmesine ve silinmesine izin veren bir değişiklik dahildir. Ek olarak, tüm durum bilgileri son bloğun bir parçası olduğu için, tüm blok zinciri geçmişini depolamaya gerek yoktur: Bitcoin'e uygulanabilirse, alandan 5-20 kat tasarruf sağlayacak şekilde hesaplanabilen bir stratejidir.

Genel olarak sorulan bir soru, sözleşme kodunun fiziksel donanım olarak "nerede" yürütüldüğüdür. Bunun basit bir cevabı var: Sözleşme kodunun yürütme süreci, blok doğrulama algoritmasının bir parçası olan durum geçiş fonksiyonu tanımının bir parçasıdır, bu nedenle bir işlem `B` bloğuna eklenirse, bu işlem `B` bloğunu indiren ve doğrulayan tüm düğümler tarafından şimdi ve gelecekte çalıştırılır.

## Uygulamalar {#applications}

Genel olarak, Ethereum'un üzerinde üç tür uygulama vardır. İlk kategori, paralarını kullanarak sözleşmeleri yönetmenin ve imzalamanın güçlü yollarını sağlayan finansal uygulamalardır. Bunlar alt para birimleri, finansal türevler, riskten korunma sözleşmeleri, tasarruf cüzdanları, vasiyetnameler ve hatta bazı tam ölçekli iş sözleşmeleri sınıflarıdır. İkinci kategori, paranın söz konusu olduğu ancak yapılanların parasal olmayan ağır bir yanının da bulunduğu yarı finansal uygulamalardır; mükemmel bir örnek, hesaplama problemlerine çözümler için kendi kendini uygulayan ödüllerdir. Son olarak, çevrimiçi oylama ve merkeziyetsiz yönetim gibi uygulamalar finansal değildir.

### Token Sistemleri {#token-systems}

Block zinciri üzerindeki token sistemleri, USD veya altın gibi varlıkları temsil eden alt para birimlerinden şirket hisse senetlerine, akıllı mülkü temsil eden bireysel token'lara, güvenli sahtesi üretilemeyecek kuponlara ve hatta teşvik için puan sistemi olarak kullanılan geleneksel değerle hiçbir bağı olmayan token sistemlerine kadar birçok uygulamaya sahiptir. Token sistemlerinin Ethereum'da uygulanması şaşırtıcı derecede kolaydır. Anlaşılması gereken kilit nokta, bir para biriminin veya token sisteminin temelde tek işlemli bir veri tabanı olduğudur: A'dan X birimi çıkar ve (1) A'nın işlemden önce en az X birime sahip olması ve (2) işlemin A tarafından onaylanması şartıyla X birimini B'ye ver. Bir token sistemini uygulamak için gereken tek şey bu mantığı bir sözleşmeye uygulamaktır.

Serpent'ta bir token sistemi uygulamak için temel kod aşağıdaki gibidir:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Aslında bu, yukarıda bu belgede açıklanan "bankacılık sistemi" durum geçiş fonksiyonunun gerçek bir uygulamasıdır. İlk etapta para birimlerini ve diğer birkaç uç durumu dağıtmanın ilk adımını sağlamak için birkaç ekstra kod satırı eklenmelidir ve ideal olarak, diğer sözleşmelerin bir adresin bakiyesini sorgulamasına izin vermek için bir fonksiyon eklenebilir. Ama hepsi bu kadar. Teorik olarak, alt para birimleri olarak hareket eden Ethereum tabanlı token sistemleri, zincirdeki Bitcoin tabanlı meta para birimlerinde eksik olan başka bir önemli özelliği potansiyel olarak içerebilir: işlem ücretlerini doğrudan bu para biriminde ödeme yeteneği. Bunun uygulanma şekli, sözleşmenin, göndericiye ücret ödemek için kullanılan ether'ı iade edeceği bir ether bakiyesi sürdürmesi ve ücret olarak aldığı dahili para birimi birimlerini toplayarak ve bunları sürekli devam eden bir açık artırma ile yeniden satarak bu bakiyeyi yeniden doldurmasıdır. Bu nedenle, kullanıcıların hesaplarını ether ile "etkinleştirmesi" gerekir, ancak ether bir kez orada olduğunda, sözleşme her seferinde iade edeceği için yeniden kullanılabilir olacaktır.

### Finansal türevler ve Stabil Değerli Para Birimleri {#financial-derivatives-and-stable-value-currencies}

Finansal türevler, bir "akıllı sözleşmenin" en yaygın uygulamasıdır ve kodda uygulanması en basit olanlardan biridir. Mali sözleşmelerin uygulanmasındaki ana zorluk, çoğunluğunun harici bir fiyat göstergesine atıfta bulunmayı gerektirmesidir; örneğin, çok arzu edilen bir uygulama, ether'ın (veya başka bir kripto para biriminin) ABD dolarına göre oynaklığına karşı koruma sağlayan akıllı bir sözleşmedir ancak bunu yapmak, sözleşmenin ETH/USD'nin değerinin ne olduğunu bilmesini gerektirir. Bunu yapmanın en basit yolu, belirli bir taraf (örn. NASDAQ) tarafından yürütülen ve söz konusu tarafın sözleşmeyi gerektiği gibi güncelleyebilmesi için tasarlanmış bir "veri akışı" sözleşmesi kullanmak ve diğer sözleşmelerin bu sözleşmeye mesaj atıp, fiyatı sağlayan bir yanıt almasıdır.

Bu kritik bileşen göz önüne alındığında, riskten korunma sözleşmesi aşağıdaki gibi görünecektir:

1. A partisinin 1000 ether girmesini bekle.
2. B partisinin 1000 ether girmesini bekle.
3. Veri akışı sözleşmesini sorgulayarak hesaplanan 1000 etherin USD değerini depoya kaydet, bunun $x olduğunu varsay.
4. 30 gün sonra, $x değerinde ether'ı (yeni fiyatı almak için veri akışı sözleşmesinin yeniden sorgulanmasıyla hesaplanır) A'ya ve geri kalanını B'ye göndermek için A veya B'nin sözleşmeyi "yeniden etkinleştirmesine" izin ver.

Böyle bir sözleşme, kripto ticaretinde önemli bir potansiyele sahip olacaktır. Kripto para hakkında belirtilen ana sorunlardan biri, dengesiz olmasıdır; birçok kullanıcı ve tüccar kriptografik varlıklarla uğraşmanın güvenliğini ve rahatlığını istese de, tek bir günde fonlarının değerinin %23'ünü kaybetme ihtimaliyle yüzleşmek istemeyebilirler. Şimdiye kadar en yaygın olarak önerilen çözüm, ihraççı destekli varlıklardı; fikir, ihraççının birimleri ihraç etme ve iptal etme hakkına sahip olduğu bir alt para birimi oluşturması ve kendilerine (çevrimdışı) belirli bir dayanak varlığın (örn. altın, USD) bir birimini sağlayan herkese bir birim para birimi sağlamasıdır. İhraççı daha sonra kripto varlığın bir birimini geri gönderen herkese temeldeki varlığın bir birimini sağlamayı taahhüt eder. Bu mekanizma, veren kişinin güvenilebilir olması koşuluyla kriptografik olmayan herhangi bir varlığın bir kriptografik varlığa "yükseltilmesine" izin verir.

Ancak uygulamada, ihraççılar her zaman güvenilir değildir ve bazı durumlarda bankacılık altyapısı bu tür hizmetlerin var olması için çok zayıf veya çok düşmancadır. Finansal türevler bir alternatif sunar. Burada, bir varlığı desteklemek için fon sağlayan tek bir ihraççı yerine, bir kriptografik referans varlığının (örn. ETH) fiyatının artacağına bahse giren merkeziyetsiz bir spekülatör piyasası bu rolü oynar. İhraççıların aksine, riskten korunma sözleşmesi fonlarını emanette tuttuğu için spekülatörlerin alışverişte temerrüde düşme seçeneği yoktur. Bu yaklaşımın tamamen merkeziyetsiz olmadığını unutmayın, çünkü fiyat göstergesini sağlamak için hâlâ güvenilir bir kaynağa ihtiyaç duyulmaktadır ancak tartışmalı olarak yine de bu, altyapı gereksinimlerini azaltmak açısından büyük bir gelişmedir (bir ihraççı olmanın aksine, bir fiyat akışı yayınlamak için lisans gerekmez) ve muhtemelen ifade özgürlüğü olarak sınıflandırılabilir ve dolandırıcılık potansiyelini azaltır.

### Kimlik ve İtibar Sistemleri {#identity-and-reputation-systems}

En eski alternatif kripto para birimi olan [Namecoin](http://namecoin.org/), kullanıcıların adlarını diğer verilerle birlikte halka açık bir veri tabanına kaydedebileceği bir isim kayıt sistemi sağlamak için Bitcoin benzeri bir blok zinciri kullanmaya çalıştı. Bahsedilen başlıca kullanım örneği, "bitcoin.org" (veya Namecoin'in durumunda "bitcoin.bit") gibi alan adlarını bir IP adresine eşleyen bir [DNS](https://wikipedia.org/wiki/Domain_Name_System) sistemi içindir. Diğer kullanım alanları, e-posta kimlik doğrulamasını ve potansiyel olarak daha gelişmiş itibar sistemlerini içerir. Ethereum'da Namecoin benzeri bir isim kayıt sistemi sağlamak için temel sözleşme:

```py
def register(name, value):
    if !self.storage[name]:
        self.storage[name] = value
```

Sözleşme çok basittir; Ethereum ağındaki, ekleme yapılabilen ancak değiştirilemeyen veya kaldırılamayan bir veritabanıdır. Herkes bir değeri olan bir isim kaydedebilir ve bu kayıt sonsuza kadar kalır. Daha karmaşık bir isim kayıt sözleşmesi, diğer sözleşmelerin onu sorgulamasına izin veren bir "işlev maddesine" ve ayrıca bir adın "sahibinin" (yani ilk kaydediciye) verileri değiştirmesine veya mülkiyeti devretmesine izin veren bir mekanizmaya sahip olacaktır. Üstüne itibar ve güven ağı işlevselliği bile eklenebilir.

### Merkeziyetsiz Dosya Depolama {#decentralized-file-storage}

Son birkaç yılda, kullanıcıların sabit disklerinin bir yedeğini yüklemelerine ve hizmetin yedeği depolamasını sağlamaya çalışan ve kullanıcının aylık bir ücret karşılığında erişimine izin verenbir dizi popüler çevrimiçi dosya depolama girişimi ortaya çıktı. Dropbox bunlardan en ünlü olandır. Ancak, bu noktada dosya depolama piyasası zaman zaman nispeten verimsizdir; Çeşitli mevcut çözümlere üstünkörü bir bakış, özellikle ne ücretsiz kotaların ne de kurumsal düzeyde indirimlerin başladığı 20-200 GB seviyesi olan "tekinsiz vadide", genel dosya depolama maliyetleri için aylık fiyatların daha yüksek olduğunu gösteriyor, öyle ki; tek bir ayda tüm sabit diskin maliyetinden daha fazlasını ödüyorsunuz. Ethereum sözleşmeleri, bireysel kullanıcıların kendi sabit disklerini kiralayarak küçük miktarlarda para kazanabileceği ve kullanılmayan alanın dosya depolama maliyetlerini daha da aşağı çekmek için kullanılabileceği, merkeziyetsiz bir dosya depolama ekosisteminin geliştirilmesine izin verebilir.

Böyle bir cihazın temel dayanağı, "merkeziyetsiz Dropbox sözleşmesi" olarak adlandırdığımız şey olacaktır. Bu sözleşme aşağıdaki gibi çalışır. İlk olarak, istenen veriler bloklara bölünür, her blok gizlilik için şifrelenir ve bundan bir Merkle ağacı oluşturulur. Daha sonra kişi, her N blokta, sözleşmenin Merkle ağacında (rastgelelik kaynağı olarak sözleşme kodundan erişilebilen önceki bloğun hash değerini kullanarak) rastgele bir endeks seçeceği ve ağaçtaki bu belirli endeksteki bloğun sahipliğinin basitleştirilmiş ödeme doğrulaması benzeri ispatını sunan ilk varlığa X ether verileceği kuralına sahip bir sözleşme yapar. Bir kullanıcı dosyasını yeniden indirmek istediğinde, dosyayı kurtarmak için bir mikro ödeme kanalı protokolü kullanabilir (örn. 32 kilobayt başına 1 szabo ödemek); Ücret açısından en verimli yaklaşım, ödeme yapanın işlemi sonuna kadar yayınlamaması, bunun yerine işlemi her 32 kilobayttan sonra aynı nonce değeri ile biraz daha kazançlı bir işlemle değiştirmektir.

Protokolün önemli bir özelliği şudur: Dosyayı unutmamaya karar vermek için birçok rastgele düğüme güveniyor gibi görünse de, gizli paylaşım yoluyla dosyayı birçok parçaya bölerek bu riski sıfıra yakın bir seviyeye indirebilir ve her parçanın hala bazı düğümlerin elinde olduğunu görmek için sözleşmeleri izleyebilir. Bir sözleşme hâlâ para ödüyorsa bu, oradaki birinin hala dosyayı sakladığına dair kriptografik bir kanıt sunar.

### Merkeziyetsiz Otonom Organizasyonlar {#decentralized-autonomous-organizations}

"Merkeziyetsiz otonom organizasyon" (DAO) kavramı genel olarak, belirli bir grup üye veya hissedardan oluşan ve örneğin %67 çoğunluk ile organizasyonun fonlarını harcama ve kodunu değiştirme hakkına sahip olunan sanal bir varlıktır. Üyeler toplu olarak, kuruluş fonlarının nasıl tahsis edileceğine karar verebilir. Bir DAO'nun fonlarını tahsis etme yöntemleri; ödüller, maaşlar, çalışmayı ödüllendirmek için dahili bir para birimi gibi daha egzotik mekanizmalar kadar çeşitli olabilir. Bu, aslında geleneksel bir şirketin veya kâr amacı gütmeyen bir kuruluşun yasal özelliklerini kopyalar ancak uygulama için yalnızca kriptografik blok zinciri teknolojisini kullanır. Şimdiye kadar DAO'lar hakkındaki tartışmaların çoğu, temettü alan hissedarları ve takas edilebilir hisseleri olan bir "merkeziyetsiz otonom şirketin" (DAC) "kapitalist" modeli çevresinde olmuştur. Belki de "merkeziyetsiz otonomtopluluk" olarak tanımlanabilecek bir alternatif, tüm üyelerin karar vermede eşit paya sahip olmasını ve mevcut üyelerin %67'sinin bir üye eklemeyi veya çıkarmayı kabul etmesini gerektirebilir. Bir kişinin yalnızca bir üyeliğe sahip olabilmesi şartının grup tarafından toplu olarak uygulanması gerekir.

Bir DAO'nun nasıl kodlanacağına ilişkin genel bir taslağı aşağıda görebilirsiniz. En basit tasarım, üyelerin üçte ikisi bir değişiklik üzerinde hemfikir olursa değişen, kendi kendini değiştiren bir kod parçasıdır. Kod teorik olarak değişmez olsa da, kod parçalarını ayrı sözleşmelerde bulundurarak ve çağrılacak sözleşmelerin adresini değiştirilebilir depolamada saklayarak, bu sorunu kolayca aşabilir ve fiili değişebilirliğe sahip olabilirsiniz. Böyle bir DAO sözleşmesinin basit bir uygulamasında, işlemde sağlanan verilerle ayırt edilen üç işlem türü olacaktır:

- `K` depolama endeksindeki adresi `V` değerine değiştirme teklifini `i` endeksi ile kaydetmek için `[0,i,K,V]`
- `i` teklifi lehinde oy kaydetmek için `[1,i]`
- Yeterince oy kullanılmışsa `i` önerisini sonuçlandırmak için `[2,i]`

Sözleşmede daha sonra bunların her biri için maddeler olacaktır. Tüm açık depolama değişikliklerinin kaydını ve bunlara oy verenlerin bir listesini tutacaktır. Ayrıca tüm üyelerin bir listesi olurdu. Herhangi bir depolama değişikliği, buna oy veren üyelerin üçte ikisine ulaştığında, bir sonlandırma işlemi değişikliği gerçekleştirebilir. Daha sofistike bir iskelet, ayrıca işlem gönderme, üye ekleme ve üye çıkarma gibi özelliklere yönelik yerleşik oylama yeteneğine sahip olacaktır ve hatta [Akışkan Demokrasi](https://wikipedia.org/wiki/Liquid_democracy) tarzı oy delegasyonu sağlayabilir (yani, herkes kendisine oy vermesi için birini atayabilir ve atama geçişlidir, dolayısıyla A, B'yi ve B, C'yi atarsa; C, A'nın oyunu belirler). Bu tasarım, DAO'nun merkeziyetsiz bir topluluk olarak organik şekilde büyüyerek insanların nihayetinde kimin üye olacağını filtreleme görevini uzmanlara delege etmesine izin verir ancak "mevcut sistemin" aksine uzmanlar, bireysel topluluk üyeleri görüşlerini değiştirdikçe kolayca yok olabilir veya ortaya çıkabilirler.

Alternatif bir model, herhangi bir hesabın sıfır veya daha fazla hisseye sahip olabileceği ve karar vermek için hisselerin üçte ikisinin gerekli olduğu, merkeziyetsiz bir şirket modelidir. Tam bir iskelet, varlık yönetimi işlevselliğini, hisse satın alma veya satma teklifi yapma yeteneğini ve teklifleri kabul etme yeteneğini (tercihen sözleşme içindeki bir sipariş eşleştirme mekanizmasıyla) içerecektir. Bir "yönetim kurulu" kavramını genelleştiren Akışkan Demokrasi tarzı delegasyon da olacaktır.

### Diğer Uygulamalar {#further-applications}

**1. Tasarruf cüzdanları**. Alice'in fonlarını güvende tutmak istediğini ancak özel anahtarını kaybedeceğinden veya birinin özel anahtarını hack'leyeceğinden endişelendiğini varsayalım. Ether'ı bir banka olan Bob ile aşağıdaki gibi bir sözleşmeye koyar:

- Alice tek başına günlük paranın en fazla %1'ini çekebilir.
- Bob tek başına günlük paranın en fazla %1'ini çekebilir ancak anahtarı bu kabiliyeti kapatan Alice, işlem yapma yeteneğine sahiptir.
- Alice ve Bob birlikte her şeyi çekebilirler.

Normalde günde %1 Alice için yeterlidir ve eğer Alice daha fazla para çekmek isterse yardım için Bob ile iletişime geçebilir. Alice'in anahtarı saldırıya uğrarsa, fonları yeni bir sözleşmeye taşımak için Bob'a başvurur. Anahtarını kaybederse, Bob parayı eninde sonunda çekecektir. Bob'un kötü niyetli birisi olduğu ortaya çıkarsa, Bob'un para çekme yetkisini sonlandırabilir.

**2. Mahsul sigortası**. Herhangi bir fiyat endeksi yerine hava durumu veri beslemesini kullanarak bir finansal türev sözleşmesi kolayca yapılabilir. Iowa'daki bir çiftçi, Iowa'daki yağışa göre ters olarak ödeyen bir türev satın alırsa ve sonrasında bir kuraklık olursa, çiftçi otomatik olarak para alacak. Yeterli seviyede yağarsa da mahsulleri büyüyeceği için çiftçi mutlu olacaktır. Bu, genel olarak doğal afet sigortasına genişletilebilir.

**3. Merkeziyetsiz bir veri akışı**. Farlılık için olan mali sözleşmeler için, "[SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)" adlı bir protokol aracılığıyla veri akışını merkeziyetsizleştirmek gerçekten mümkün olabilir. SchellingCoin temel olarak şu şekilde çalışır: N partinin tümü sisteme belirli bir verinin değerini (örn. ETH/USD fiyatı) koyar, değerler sıralanır ve 25 ile 75. yüzdelik dilim arasındaki herkes ödül olarak bir token alır. Herkesin, herhangi birinin sağlayacağı yanıtı verme teşviği vardır ve çok sayıda oyuncunun gerçekçi olarak üzerinde anlaşabileceği tek değer, bariz varsayılandır: gerçek olan şey. Bu, teorik olarak herhangi bir sayıda değeri sağlayabilen; ETH/USD fiyatı, Berlin'deki sıcaklık ve hatta belirli bir sabit hesaplamanın sonucu dahil olmak üzere, merkeziyetsiz bir protokol oluşturur.

**4. Akıllı çok imzalı emanet**. Bitcoin, örneğin ele alınan beş anahtardan üçünün fonları harcayabildiği durumlarda çoklu imza işlem sözleşmelerine izin verir. Ethereum daha fazla ayrıntı düzeyine izin verir; örneğin, beşte dördü her şeyi harcayabilir, beşte üçü günde %10'a kadar harcayabilir ve beşte ikisi günde %0,5'e kadar harcayabilir. Ek olarak, Ethereum multisig (çoklu imza) eşzamansızdır: İki taraf imzalarını blok zincirine farklı zamanlarda kaydedebilir ve son imza işlemi otomatik olarak gönderir.

**5. Bulut bilişimi**. EVM teknolojisi, doğrulanabilir bir bilgi işlem ortamı oluşturmak için de kullanılabilir; bu, kullanıcıların başkalarından hesaplamalar yapmasını istemelerine ve ardından isteğe bağlı olarak, rastgele seçilen belirli kontrol noktalarında hesaplamaların doğru yapıldığının kanıtlarını istemelerine olanak tanır. Bu, herhangi bir kullanıcının masaüstü, dizüstü bilgisayar veya özel sunucusuyla katılabileceği bir bulut bilgi işlem pazarının oluşturulmasına izin verir ve sistemin güvenilir olduğundan emin olmak için güvenlik teminatlarıyla birlikte nokta kontrolü kullanılabilir (yani düğümler kârlı bir şekilde hile yapamaz). Böyle bir sistem her görev için uygun olmasa da; örneğin, yüksek düzeyde süreçler arası iletişim gerektiren görevler, büyük bir düğüm bulutu üzerinde kolayca yapılamaz. Ancak diğer görevleri paralelleştirmek çok daha kolaydır; SETI@home, folding@home ve genetik algoritmalar gibi projeler böyle bir platformun üzerine kolayca uygulanabilir.

**6. Eşler arası kumar**. Frank Stajano ve Richard Clayton'ın [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf)'ı gibi herhangi bir sayıda eşler arası kumar protokolü, Ethereum blok zincirinde uygulanabilir. En basit kumar protokolü, aslında bir sonraki blok hash değeri üzerindeki fark için bir sözleşmedir ve oradan daha gelişmiş protokoller oluşturulabilir, hile yapma yeteneği olmayan sıfıra yakın ücretlerle kumar hizmetleri oluşturulabilir.

**7. Tahmin piyasaları**. Bir kâhin veya SchellingCoin sağlandığında, tahmin piyasalarının uygulanması da kolaydır ve tahmin piyasaları, SchellingCoin ile birlikte, merkeziyetsiz organizasyonlar için bir yönetişim protokolü olarak [futarchy](http://hanson.gmu.edu/futarchy.html)'nin ilk ana akım uygulaması olabilir.

**8. Kimlik ve itibar sistemini temel alan zincir üstü merkeziyetsiz pazar yerleri**.

## Çeşitli Durumlar ve Endişeler {#miscellanea-and-concerns}

### Değiştirilmiş GHOST Uygulaması {#modified-ghost-implementation}

"Aç Gözlü En Ağır Gözlemlenmiş Alt Ağaç" (Greedy Heaviest Observed Subtree/GHOST) protokolü, ilk olarak Yonatan Sompolinsky ve Aviv Zohar tarafından [Aralık 2013](https://eprint.iacr.org/2013/881.pdf)'te tanıtılan bir yeniliktir. GHOST'un arkasındaki motivasyon, hızlı onay sürelerine sahip blok zincirlerinin şu anda yüksek eskime oranı nedeniyle düşük güvenlikten muzdarip olmasıdır. Blokların ağda yayılması belirli bir zaman aldığı için A madencisi bir blok kazarsa ve A madencisinin bloğu B madencisine yayılmadan B madencisi başka bir blok kazarsa B madencisinin bloğu boşa gidecek ve ağ güvenliğine katkıda bulunmayacaktır, bu da güvenlik oranının düşmesine neden olur. Ayrıca, bir merkezileştirme sorunu var: A Madencisi, %30 hash gücüne sahip bir madencilik havuzuysa ve B %10 hash gücüne sahipse A, %70 ihtimalle eski bir blok üretme riskine (geri kalan %30'unda A son bloğu ürettiği ve madencilik verisini anında alacağı için), B ise %90 ihtimalle eski bir blok üretme riskine sahip olacaktır. Bu nedenle, blok aralığı, bayat hızının yüksek olması için yeterince kısaysa, A boyutundan dolayı önemli ölçüde daha verimli olacaktır. Bu iki etki birleştiğinde, hızlı bir şekilde blok üreten blok zincirlerinin, madencilik süreci üzerinde fiili kontrole sahip olmak için ağ hash gücünün yeterince büyük bir yüzdesine sahip bir madencilik havuzuna yol açması çok muhtemeldir.

Sompolinsky ve Zohar tarafından açıklandığı gibi GHOST, ağ güvenliği kaybının ilk sorununu, hangi zincirin "en uzun" olduğu hesaplamasına eski blokları dahil ederek çözer; yani, bir bloğun yalnızca ebeveyni ve diğer ataları değil, aynı zamanda bloğun atasının eski torunları da (Ethereum jargonunda "amcalar") hangi bloğun en büyük toplam iş desteği ispatına sahip olduğuna dair hesaplamaya eklenir. İkinci merkezileştirme yatkınlığı sorununu çözmek için, Sompolinsky ve Zohar tarafından açıklanan protokolün ötesine geçiyoruz ve ayrıca eskilere blok ödülleri sağlıyoruz: eski bir blok, temel ödülünün %87,5'ini alıyor ve eski bloğu içeren "yeğen" de kalan %12,5'i alıyor. Ancak işlem ücretleri amcalara verilmez.

Ethereum, yalnızca yedi seviye aşağı inen basitleştirilmiş bir GHOST sürümü uygular. Spesifik olarak, aşağıdaki gibi tanımlanır:

- Bir blok bir ebeveyn belirtmeli ve 0 veya daha fazla amca belirtmelidir
- B bloğuna dahil olan bir amca aşağıdaki özelliklere sahip olmalıdır:
  - `2 <= k <= 7` olmak üzere B'nin k nesli atasının doğrudan çocuğu olmalıdır.
  - B'nin atası olamaz
  - Bir amca, geçerli bir blok başlığı olmalıdır ancak önceden doğrulanmış veya hatta geçerli bir blok olması gerekmez
  - Bir amca, önceki bloklarda yer alan tüm amcalardan ve aynı blokta yer alan diğer tüm amcalardan farklı olmalıdır (çift olmayan dahil etme)
- B bloğundaki her U amca başına, B'nin madencisinin coinbase ödülüne %3,125 eklenir ve U'nun madencisi standart bir coinbase ödülünün %93,75'ini alır.

Amcaların yalnızca 7 nesle kadar dahil edilebildiği bu sınırlı GHOST sürümü iki nedenden dolayı kullanıldı. İlk olarak, sınırsız GHOST belirli bir blok için hangi amcaların geçerli olduğunun hesaplamak için çok fazla komplikasyon yaratacaktır. İkincisi, Ethereum'da kullanılan tazminat ile sınırsız GHOST, bir madencinin halka açık bir saldırganın zincirinde değil ana zincirde madencilik yapma teşvikini ortadan kaldırır.

### Ücretler {#fees}

Blok zincirinde yayınlanan her işlem, ağa indirme ve doğrulama maliyeti getirdiğinden, kötüye kullanımı önlemek için tipik olarak işlem ücretlerini içeren bazı düzenleyici mekanizmalara ihtiyaç vardır. Bitcoin'de kullanılan varsayılan yaklaşım, madencilerin kapı bekçileri olarak hareket etmesine ve dinamik minimumlar belirlemesine güvenerek tamamen gönüllü ücretlere sahip olmaktır. Bu yaklaşım, özellikle "piyasa temelli" olduğu için Bitcoin topluluğunda çok olumlu karşılandı ve madencilerle işlem gönderenler arasındaki arz ve talebin fiyatı belirlemesine izin verdi. Bununla birlikte, bu mantığın sorunu, işlem işlemenin bir pazar olmamasıdır; İşlem işlemeyi madencinin gönderene sunduğu bir hizmet olarak yorumlamak sezgisel olarak çekici olsa da, gerçekte bir madencinin içerdiği her işlemin ağdaki her düğüm tarafından işlenmesi gerekecektir, bu nedenle işlem maliyetinin büyük çoğunluğu işlemi dahil edip etmeme kararını veren madenci değil, üçüncü taraflarca karşılanır. Bu nedenle, ortak varlıkların trajedisi sorunlarının meydana gelmesi muhtemeldir.

Ancak, ortaya çıktığı gibi, piyasaya dayalı mekanizmadaki bu kusur, belirli bir yanlış basitleştirici varsayım verildiğinde, sihirli bir şekilde kendini iptal eder. Argüman aşağıdaki gibidir. Varsayım:

1. Bir işlem `k` işleme yol açar ve `kR` ödülünü, onu içeren herhangi bir madenciye sunar; burada `R`, gönderen tarafından ayarlanır ve `k` ve `R` (kabaca) madenci tarafından önceden görülebilir.
2. Bir işlemin herhangi bir düğüm için `C` işlem maliyeti vardır (yani tüm düğümler eşit verimliliğe sahiptir)
3. Her biri tam olarak eşit işlem gücüne sahip `N` madencilik düğümü vardır (yani toplamın `1/N` kadarı)
4. Madencilik dışı tam düğümler yoktur.

Bir madenci, beklenen ödül maliyetten daha büyükse bir işlemi gerçekleştirmeye istekli olacaktır. Bu nedenle, madencinin bir sonraki bloğu işlemek için `1/N` şansı olduğundan ve madenci için işlem maliyeti basitçe `kC` olduğundan beklenen ödül `kR/N` olur. Bu nedenle, madenciler `kR/N > kC` veya `R > NC` olduğu durumlarda işlemleri dahil edecektir. `R` değerinin, gönderici tarafından sağlanan işlem başına ücret olduğunu ve bu nedenle gönderenin işlemden elde ettiği faydanın bir alt sınırı olduğunu ve `NC` değerinin bir işlemin işlenmesiyle birlikte tüm ağ içni yarattığı maliyet olduğunu unutmayın. Bu nedenle madenciler, yalnızca toplam faydanın maliyeti aştığı işlemleri dahil etme teşviğine sahiptir.

Ancak gerçekte, bu varsayımlardan birkaç önemli sapma vardır:

1. Madenci, işlemi işlemek için diğer doğrulama düğümlerinden daha yüksek bir maliyet öder, çünkü ekstra doğrulama süresi bloğun yayılmasını geciktirir ve böylece bloğun eskime şansını artırır.
2. Madencilik yapmayan tam düğümler bulunyor.
3. Madenciliğin güç dağılımı, radikal bir şekilde eşitsizlikle sonuçlanabilir.
4. Fayda işlevleri ağa zarar vermeyi içeren spekülatörler, siyasi düşmanlar ve çılgınlar var ve maliyetleri diğer doğrulama düğümleri tarafından ödenen maliyetten çok daha düşük olan sözleşmeler kurabiliyorlar.

(1) madenciye daha az işlem yapma eğilimi sağlar ve (2) `NC` değerini artırır; dolayısıyla, bu iki etki en azından kısmen birbirini iptal eder. <sup>[Nasıl?](https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup> (3) ve (4) en önemli meselelerdir; bunları çözmek için değişken bir üst sınır getirmemiz yeterlidir: Hiçbir blok `BLK_LIMIT_FACTOR` ile ortalama uzun vadeli üstel taşıma değerinin çarpımından daha fazla işleme sahip olamaz. Özellikle:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` ve `EMA_FACTOR` şimdilik 65536 ve 1.5 olarak ayarlanacak, ancak muhtemelen daha fazla analizden sonra değiştirilecek sabitlerdir.

Bitcoin'de büyük blok boyutlarını caydıran başka bir faktör daha var: Büyük blokların yayılması daha uzun sürecek ve bu nedenle eskime olasılığı daha yüksek olacak. Ethereum'da, yüksek oranda gaz tüketen blokların yayılması hem fiziksel olarak daha büyük oldukları için hem de işlem durumu geçişlerini doğrulamak için daha uzun sürdüğü için daha uzun sürebilir. Bu gecikme caydırıcı, Bitcoin'de önemli bir husustur ancak GHOST protokolü nedeniyle Ethereum'da daha az önemlidir; bu nedenle, düzenlenmiş blok limitlerine güvenmek daha istikrarlı bir temel sağlar.

### Hesaplama ve Turing-Tamlığı {#computation-and-turing-completeness}

Önemli bir not, Ethereum sanal makinesinin Turing-tam olmasıdır; bu, EVM kodunun, sonsuz döngüler dahil, makul bir şekilde gerçekleştirilebilecek herhangi bir hesaplamayı kodlayabileceği anlamına gelir. EVM kodu döngüye iki şekilde izin verir. İlk olarak, programın kodda önceki bir noktaya atlamasına izin veren bir `JUMP` talimatı ve `while x < 27: x = x * 2` gibi ifadelere izin veren koşullu atlama yapmak için `JUMPI` talimatı vardır. İkinci olarak sözleşmeler, potansiyel olarak özyineleme yoluyla döngüye izin vererek diğer sözleşmeleri çağırabilir. Bu doğal olarak bir soruna yol açar: Kötü niyetli kullanıcılar, madencileri ve tam düğümleri sonsuz bir döngüye girmeye zorlayarak onları kapatabilir mi? Sorun, bilgisayar bilimlerinde durma sorunu olarak bilinen bir sorundan kaynaklanmaktadır: Genel durumda, belirli bir programın durup durmayacağını söylemenin bir yolu yoktur.

Durum geçişi bölümünde açıklandığı gibi çözümümüz, bir işlemin atılmasına izin verilen maksimum sayıda hesaplama adımı belirlemesini gerektirerek çalışır ve yürütme daha uzun sürerse hesaplama geri alınır ancak ücretler yine ödenir. Mesajlar aynı şekilde çalışır. Çözümümüzün arkasındaki motivasyonu göstermek için, aşağıdaki örnekleri göz önünde bulundurun:

- Saldırgan, sonsuz bir döngü çalıştıran bir sözleşme oluşturur ve ardından madenciye bu döngüyü etkinleştiren bir işlem gönderir. Madenci, sonsuz döngüyü çalıştırarak işlemi işleyecek ve gazın bitmesini bekleyecektir. Yürütmenin gazı bitse ve yarıda kalsa bile, işlem hâlâ geçerlidir ve madenci yine de her hesaplama adımı için saldırgandan ücret alır.
- Saldırgan, hesaplama bitene kadar birkaç bloğun daha oluşacağı ve madencinin işlemi dahil ederek ücreti alması mümkün olmayacağı kadar uzun bir süre boyunca hesaplama yapmaya zorlamak amacıyla çok uzun bir sonsuz döngü oluşturur. Bununla birlikte saldırganın, yürütmenin alabileceği hesaplama adımlarının sayısını sınırlayan `STARTGAS` için bir değer göndermesi gerekecektir. Böylece madenci, hesaplamanın aşırı sayıda adım atacağını önceden bilecektir.
- Saldırgan, `send(A,contract.storage[A]); contract.storage[A] = 0` gibi bir kod içeren bir sözleşme görür ve ikinciyi çalıştırmadan yalnızca ilk adımı çalıştırmaya yetecek kadar gaz içeren bir işlem gönderir (yani, para çekme işlemi gerçekleştirirken bakiyenin düşmesine izin vermez). Yürütme işlemin ortasında durursa değişiklikler geri alınacağı için sözleşme yazarının bu tür saldırılara karşı güvenlik konusunda endişelenmesine gerek yoktur.
- Bir mali sözleşme, riski en aza indirmek için dokuz mülkiyet veri akışlarının ortalamasını alarak çalışır. Saldırgan, DAO'lar bölümünde açıklanan değişken adresli çağrı mekanizması aracılığıyla değiştirilebilecek şekilde tasarlanmış veri akışlarından birini devralır ve onu sonsuz bir döngü çalıştıracak şekilde dönüştürür ve böylece gazın bitmesi için mali sözleşmeden herhangi bir fon talep etme girişimini zorlamaya çalışır. Ancak mali sözleşme bu sorunu önlemek için mesaja gaz limiti koyabilir.

Turing-tamlığın alternatifi, Turing-eksikliktir, burada `JUMP` ve `JUMPI` mevcut değildir ve herhangi bir zamanda çağrı yığınında her sözleşmenin yalnızca bir kopyasının bulunmasına izin verilir. Bu sistemle, açıklanan ücret sistemi ve çözümümüzün etkinliğine ilişkin belirsizlikler gerekli olmayabilir, çünkü bir sözleşmeyi yürütmenin maliyeti yukarıdaki boyutuyla sınırlandırılacaktır. Ek olarak, Turing-eksikliği o kadar da büyük bir sınırlama değildir; dahili olarak tasarladığımız tüm sözleşme örneklerinden şimdiye kadar sadece bir tanesi bir döngüye ihtiyaç duydu ve bu döngü bile tek satırlık bir kod parçasının 26 tekrarı yapılarak kaldırılabilirdi. Turing-tamlığının ciddi sonuçları ve sınırlı yararı göz önüne alındığında, neden sadece Turing-eksik bir dile sahip olmayasınız? Ancak gerçekte Turing-eksikliği, soruna düzgün bir çözüm olmaktan uzaktır. Nedenini görmek için aşağıdaki sözleşmeleri inceleyin:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Şimdi A'ya bir işlem gönderin. Böylece 51 işlemde 2<sup>50</sup> hesaplama adımı gerçekleştiren bir sözleşmemiz olur. Madenciler, her bir sözleşmenin yanında, alabileceği maksimum hesaplama adımlarını belirten bir değer koruyarak ve bunu diğer sözleşmeleri özyinelemeli olarak çağıran sözleşmeler için hesaplayarak bu tür mantık bombalarını önceden tespit etmeye çalışabilirler ancak bu, madencilerin yeni sözleşmeleri oluşturan diğer sözleşmeleri (yukarıdaki 26 sözleşmenin tümünün oluşturulması ve yürütülmesi kolayca tek bir sözleşmeye dönüştürülebileceği için) yasaklamalarını gerektirecektir. Bir diğer sorunlu nokta, bir mesajın adres alanının bir değişken olmasıdır, bu nedenle genel olarak belirli bir sözleşmenin önceden hangi sözleşmeleri çağıracağını anlamak bile mümkün olmayabilir. Sonuç olarak, şaşırtıcı bir sonuca varıyoruz: Turing-tamlığı yönetmek şaşırtıcı derecede kolaydır ve tam olarak aynı kontroller uygulanmadıkça Turing-tamlığın eksikliğini yönetmek de aynı derecede şaşırtıcı derecede zordur. Peki bu durumda neden protokolün Turing-tam olmasını sağlamıyoruz?

### Para Birimi ve İhraç {#currency-and-issuance}

Ethereum ağı, çeşitli dijital varlık türleri arasında verimli alışverişe izin vermek amacıyla birincil bir likidite katmanı sağlamak ve daha da önemlisi işlem ücretlerini ödemek için bir mekanizma sağlamak gibi ikili bir amaca hizmet eden kendi yerleşik para birimi olan ether'ı içerir. Kolaylık ve gelecekteki tartışmalardan kaçınmak için (Bitcoin'deki mevcut mBTC/uBTC/satoshi münazarasına bakınız), değer birimleri bu şekilde ön isimlendirilecektir:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Bu, "dolar" ve "cent" veya "BTC" ve "satoshi" kavramının genişletilmiş bir versiyonu olarak düşünülmelidir. Yakın gelecekte, sıradan işlemler için "ether"ın, mikro işlemler için "finney"in ve ücretler ve protokol uygulamasıyla ilgili teknik tartışmalar için "szabo" ve "wei"nin kullanılmasını bekliyoruz; kalan değerler daha sonra faydalı olabilir ve bu noktada istemcilere dahil edilmemelidir.

İhraç modeli aşağıdaki gibi olacaktır:

- Ether, Ethereum organizasyonunu finanse etmeyi ve Mastercoin ile NXT gibi diğer platformlar tarafından başarıyla kullanılan geliştirme için ödeme yapmayı amaçlayan bir mekanizma olarak, BTC başına 1000-2000 ether değerinde para birimi satışıyla piyasaya sürülecek. Erken alıcılar daha büyük indirimlerden yararlanacak. Satıştan elde edilen BTC, tamamen geliştiricilere maaş ve ikramiye ödemek için kullanılacak ve Ethereum ile kripto para ekosistemindeki çeşitli kâr amacı güden ve kâr amacı gütmeyen projelere yatırılacak.
- Satılan toplam miktarın 0,099 katı (60102216 ETH) erken katkıda bulunanları tazmin etmek ve başlangıç bloğundan önceki ETH cinsinden harcamaları ödemek amacıyla organizasyona tahsis edilecek.
- 0.099x satılan toplam tutar uzun vadeli rezerv olarak korunacaktır.
- Satılan toplam miktarın 0,26 katı bu noktadan sonra sonsuza kadar her yıl madencilere tahsis edilecek.

| Grup                          | Başlangıçta | 1 sene sonra | 5 sene sonra |
| ----------------------------- | ----------- | ------------ | ------------ |
| Para birimleri                | 1.198X      | 1.458X       | 2.498X       |
| Satın alanlar                 | %83,5       | %68,6        | %40,0        |
| Satış öncesi harcanan rezerv  | %8,26       | %6,79        | %3,96        |
| Satış sonrası harcanan rezerv | %8,26       | %6,79        | %3,96        |
| Madenciler                    | %0          | %17,8        | %52,0        |

#### Uzun Vadeli Arz Büyüme Oranı (yüzde)

![Ethereum enflasyonu](./ethereum-inflation.png)

_Doğrusal para birimi ihracına rağmen, tıpkı zaman içinde Bitcoin'de olduğu gibi, arz büyüme oranı nihayetinde sıfıra inme eğilimindedir._

Yukarıdaki modeldeki iki ana seçenek şunlardır: (1) bir bağış havuzunun varlığı ile boyutu ve (2) Bitcoin'de olduğu gibi sınırlı bir arzın aksine kalıcı olarak büyüyen bir doğrusal arz. Bağış havuzunun gerekçesi aşağıdaki gibidir. Bağış havuzu olmasaydı ve aynı enflasyon oranını sağlamak için doğrusal ihraç 0,217 kat oranına düşürülürse, toplam ether miktarı %16,5 daha az olur ve böylece her birim %19,8 daha değerli olur. Böylece dengedeyken satışta %19,8 daha fazla ether satın alınacak ve böylece her birim yeniden eskisi kadar değerli olacaktır. Organizasyon ayrıca 1,198 kat daha fazla BTC'ye sahip olacak ve bu miktarın iki dilime ayrıldığı kabul edilebilir: orijinal BTC ve ek 0,198 katı. Dolayısıyla, bu durum bağışla _tam olarak eşdeğerdir_ ancak önemli bir fark bulunur: Organizasyon sadece BTC'ye sahiptir ve bu nedenle ether biriminin değerini desteklemeye teşvik edilmez.

Kalıcı olarak doğrusal arz büyüme modeli, Bitcoin'deki gibi aşırı servet yoğunlaşması riskini azaltır ve bireylere şimdiki ve gelecekteki çağlarda para kazanmak için adil bir şans sunarken, para birimlerini elde etmek ve elde tutmak için teşvik eder, çünkü yüzde olarak "arz büyüme oranı" hala zamanla sıfırlanma eğilimi göstermektedir. Ayrıca, paralar dikkatsizlik, ölüm vb. nedenlerle zaman içinde her zaman kaybedildiğinden ve para kaybı yıllık toplam arzın bir yüzdesi olarak modellenebileceğinden, dolaşımdaki toplam para arzının aslında sonunda bir değerde sabitleneceğini düşünüyoruz. Bu değer, yıllık ihraç bölü kayıp oranına eşittir (örneğin, %1'lik bir kayıp oranında, arz 26 katına ulaştığında, o zaman 0,26 katı kazılarak ve her yıl 0,26 katı kaybedilerek bir denge yaratılacaktır).

Gelecekte, Ethereum'un güvenlik için bir hisse ispatı modeline geçeceğini ve ihraç gereksinimini yılda sıfır ila 0,05X arasında bir seviyeye indireceğini unutmayın. Ethereum organizasyonunun fon kaybetmesi veya başka bir nedenle ortadan kalkması durumunda, bir "sosyal sözleşmeyi" açık bırakıyoruz: Herkes, Ethereum'un gelecekteki bir aday versiyonunu yaratma hakkına sahiptir. Tek koşul, ether miktarının en fazla `60102216 * (1,198 + 0,26 * n)` ile eşit olmasıdır. Burada `n`, başlangıç bloğundan sonraki yılların sayısıdır. İçerik oluşturucular toplu satış yapmakta veya hisse ispatı odaklı arz genişlemesi ve izin verilen maksimum arz genişlemesi arasındaki farkı geliştirme için kullanmakta özgürdür. Sosyal sözleşmeye uygun olmayan aday güncellemeleri, haklı olarak uyumlu sürümlere dönüştürülebilir.

### Madenciliğin Merkezileşmesi {#mining-centralization}

Bitcoin madenciliği algoritması, madencilerin blok başlığının hafifçe değiştirilmiş versiyonlarında SHA256'yı milyonlarca kez tekrar tekrar hesaplamasını sağlayarak çalışır. Bu, sonunda bir düğüm, hash değeri hedeften daha az olan bir versiyon (şu anda 2<sup>192</sup> civarında) ortaya çıkarana kadar devam eder. Ancak, bu madencilik algoritması iki tür merkezileştirmeye karşı savunmasızdır. İlk olarak, madencilik ekosistemine ASIC'ler (uygulamaya özel entegre devreler), Bitcoin madenciliğinin özel görevi için tasarlanmış ve dolayısıyla binlerce kat daha verimli olan bilgisayar çipleri hakim oldu. Bu, Bitcoin madenciliğinin artık etkin bir şekilde katılmak için milyonlarca dolarlık sermaye gerektiren oldukça merkeziyetsiz ve eşitlikçi bir arayış olmadığı anlamına geliyor. İkincisi, çoğu Bitcoin madencileri aslında yerel olarak blok doğrulaması yapmazlar; bunun yerine, blok başlıklarını sağlamak için merkezi bir madencilik havuzuna güvenirler. Bu sorun muhtemelen daha kötü: Bu yazının yazıldığı tarih itibariyle, ilk üç madencilik havuzu dolaylı olarak Bitcoin ağındaki işlem gücünün yaklaşık %50'sini kontrol ediyor, ancak madencilerin bir havuzun veya koalisyonun %51 saldırısı girişiminde bulunması durumunda diğer madencilik havuzlarına geçebilmeleri gerçeğiyle bu hafifletiliyor.

Ethereum'daki mevcut amaç, madencilerin durumdan rastgele veriler getirmesi, blok zincirindeki son N bloktan rastgele seçilen bazı işlemleri hesaplaması ve sonucun hash değerini döndürmesi gereken bir madencilik algoritması kullanmaktır. Bunun iki önemli faydası vardır. İlk olarak, Ethereum sözleşmeleri her türlü hesaplamayı içerebilir, bu nedenle bir Ethereum ASIC aslında genel hesaplama için bir ASIC olacaktır: Yani daha iyi bir işlemci. İkinci olarak madencilik, tüm blok zincirine erişim gerektirdiği için madencilerin tüm blok zincirini depolayarak ve en azından her işlemi doğrulayabilmelerini sağlar. Bu, merkezi madencilik havuzlarına olan ihtiyacı ortadan kaldırır; Madencilik havuzları, ödül dağıtımının rastgeleliğini ortadan kaldırmanın meşru rolünü hala yerine getirebilse de bu işlev, merkezi kontrolü olmayan eşler arası havuzlar tarafından eşit derecede iyi bir şekilde sunulabilir.

Bu model test edilmemiştir ve bir madencilik algoritması olarak sözleşme yürütmeyi kullanırken bazı akıllı optimizasyonlardan kaçınmanın yol boyunca zorlukları olabilir. Bununla birlikte, bu algoritmanın dikkat çekici bir özelliği, belirli ASIC'leri engellemek için özel olarak tasarlanmış blok zincirine çok sayıda sözleşme ekleyerek herkesin "kuyuyu zehirlemesine" izin vermesidir. ASIC üreticilerinin birbirlerine saldırmak için böyle bir hile kullanmaları için ekonomik teşvikler mevcuttur. Bu nedenle, geliştirmekte olduğumuz çözüm, tamamen teknik olmaktan ziyade nihayetinde uyarlanabilir bir ekonomik insan çözümüdür.

### Ölçeklenebilirlik {#scalability}

Ethereum ile ilgili ortak bir endişe, ölçeklenebilirlik sorunudur. Ethereum, Bitcoin'de olduğu gibi her işlemin ağdaki her bir düğüm tarafından işlenmesi gerekmesi sorunundan muzdariptir. Bitcoin ile, mevcut blok zincirinin boyutu 15 GB civarındadır ve saatte yaklaşık 1 MB büyümektedir. Bitcoin ağı Visa'nın 2000 işlemi saniye başına işleyecek olsaydı, her üç saniyede 1 MB (saatte 1 GB, yılda 8 TB) büyür. Ethereum'un benzer bir büyüme modelinden muzdarip olması muhtemeldir, ve bu etki Bitcoin'de olduğu gibi sadece bir para birimi yerine Ethereum blok zincirinin üzerinde birçok uygulamanın olacağı gerçeğiyle daha da ağırlaşır ancak Ethereum'un tam düğümlerinin tüm blok zinciri geçmişi yerine sadece durumu depolaması gerektiği gerçeğiyle hafifleşir.

Bu kadar büyük bir blok zinciri boyutundaki sorun, merkezileşme riskidir. Blok zinciri boyutu, örneğin 100 TB'a yükselirse, olası senaryo, yalnızca çok az sayıda büyük işletmenin tam düğümleri çalıştırması ve tüm normal kullanıcıların hafif SPV düğümleri kullanması olacaktır. Böyle bir durumda, tüm düğümlerin bir araya gelebileceği ve hepsinin kârlı bir şekilde hile yapmayı kabul edebileceği (örn. blok ödülünü değiştirme, kendilerine BTC verme) endişesi ortaya çıkar. Hafif düğümlerin bunu hemen algılamasının hiçbir yolu yoktur. Tabii ki, muhtemelen en az bir dürüst tam düğüm var olacak ve birkaç saat sonra sahtekarlık hakkında bilgi Reddit gibi kanallar aracılığıyla akacak, ancak bu noktada her şey için çok geç olacak: Başarılı bir %51 saldırısını gerçekleştirmeye benzer ölçekte büyük ve muhtemelen uygulanabilir olmayan bir koordinasyon sorunu olan verilen blokları kara listeye alma çabasını organize etmek sıradan kullanıcılara kalmış olacak. Bitcoin söz konusu olduğunda, bu hâlâ bir sorundur ancak [Peter Todd tarafından önerilen](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) ve bu sorunu hafifletecek bir blok zinciri modifikasyonu bulunmaktadır.

Kısa vadede Ethereum bu sorunla başa çıkmak için iki ek strateji kullanacak. Birincisi, blok zinciri tabanlı madencilik algoritmaları nedeniyle, en azından her madenci tam bir düğüm olmaya zorlanarak tam düğüm sayısında bir alt sınır oluşturacak. İkincisi ve daha da önemlisi, her işlemin işlenmesinden sonra blok zincirine bir ara durum ağacı kökü ekleyeceğiz. Blok doğrulama merkezileştirilse bile, tek bir dürüst doğrulama düğümü olduğu sürece, merkezileşme sorunu bir doğrulama protokolü aracılığıyla aşılabilir. Bir madenci geçersiz bir blok yayınlarsa, bu blok ya hatalı biçimlendirilmiş olmalıdır ya da `S[n]` durumu yanlıştır. `S[0]` değerinin doğru olduğu bilindiğinden, `S[i]` değerinin doğru olduğu yerlerden birinde yanlış olan bir `S[i-1]` ilk durumu olmalıdır. Doğrulama düğümü, `APPLY(S[i-1],TX[i]) -> S[i]` değerini işlemesi gereken Patricia ağaç düğümlerinin alt kümesinden oluşan bir "geçersizlik ispatı" ile birlikte `i` endeksini sağlayacaktır. Düğümler, hesaplamanın bu bölümünü çalıştırmak için bu düğümlerin kullanabilir ve oluşturulan `S[i]` değerinin sağlanan `S[i]` ile eşleşmediğini görebilir.

Daha karmaşık bir başka saldırı ise kötü niyetli madencilerin eksik bloklar yayınlamasıdır, bu durumda blokların geçerli olup olmadığına karar vermek için kullanılacak tam bilgi bulunmaz bile. Bunun çözümü bir meydan okuma-yanıt protokolüdür: Doğrulama düğümleri, hedef işlem endeksleri şeklinde "meydan okumalar" yapar ve bir düğüm alındığında hafif düğüm, madenci veya başka bir doğrulayıcı olan başka bir düğüm doğruluk ispatı olarak Patricia düğümlerinin bir alt kümesinin sunana kadar bloğa güvenilmez olarak davranır.

## Sonuç {#conclusion}

Ethereum protokolü başlangıçta kripto paraların; blok zinciri üzerinde emanet, para çekme limitleri, mali sözleşmeler, kumar piyasaları ve son derece genelleştirilmiş bir programlama dili gibi gelişmiş özellikler sağlayan yükseltilmiş bir versiyonu olarak tasarlandı. Ethereum protokolu, herhangi bir uygulamayı doğrudan "desteklemez" ancak Turing-tam bir programlama dilinin varlığı, herhangi bir işlem türü veya uygulama için teorik olarak isteğe bağlı sözleşmelerin oluşturulabileceği anlamına gelir. Bununla birlikte Ethereum hakkında daha ilginç olan şey, Ethereum protokolünün sadece bir para biriminden çok daha fazlası olmasıdır. Merkeziyetsiz dosya depolama, merkeziyetsiz hesaplama, merkeziyetsiz tahmin piyasaları, ve bu tür düzinelerce kavram arasında şekillenen protokollerde, ilk kez bir ekonomik katman eklemek suretiyle hesaplama verimliliğini önemli ölçüde artırma ve diğer eşler arası protokollere büyük bir destek sağlama potansiyeli bulunmaktadır. Son olarak, ayrıca parayla hiçbir ilgisi olmayan çok sayıda uygulama da bulunmaktadır.

Ethereum protokolü tarafından uygulanan keyfi bir durum geçiş fonksiyonu kavramı, benzersiz bir potansiyele sahip bir platform sağlar; kapalı uçlu, tek amaçlı bir protokol olmaktan ziyade veri depolama, kumar veya finans alanındaki belirli uygulamalar dizisi olmak için tasarlanmıştır. Ethereum, tasarımı gereği açık uçludur ve biz bunun önümüzdeki yıllarda hem finansal hem de finansal olmayan protokollerin kullanabileceği çok büyük sayılar için temel bir katman olarak hizmet etmeye uygun olduğuna inanıyoruz.

## Notlar ve Daha Fazla Bilgi {#notes-and-further-reading}

### Notlar {#notes}

1. İleri seviye bir okuyucu, bir Bitcoin adresinin aslında açık anahtarın kendisinin değil, eliptik eğri açık anahtarının hash değeri olduğunu görebilir. Ancak, pubkey hash değerini açık anahtarın kendisi olarak ifade etmek aslında tamamen geçerli bir kriptografik terminolojidir. Bunun nedeni, Bitcoin'in şifrelemesinin özel bir dijital imza algoritması olarak kabul edilebilmesidir; burada açık anahtar ECC yayın anahtarının hash değerinden oluşur; imza ECC imzasıyla birleştirilmiş ECC pubkey'den oluşur ve doğrulama algoritması, imzadaki ECC pubkey'i açık anahtar olarak sağlanan ECC pubkey hash değeri ile karşılaştırmayı ve ardından ECC imzasını ECC pubkey'e karşı doğrulamayı içerir.
2. Teknik olarak, önceki 11 bloğun ortanca değeri.
3. Dahili olarak, hem 2 hem de "CHARLIE" sayıdır<sup>[fn3](#notes)</sup> ve ikincisi, büyük sonlu temelinde 256 temsilidir. Sayılar en az 0, en fazla 2<sup>256</sup>-1 olabilir.

### Daha fazla bilgi {#further-reading}

1. [İçsel değer](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2. [Akıllı mülk](https://en.bitcoin.it/wiki/Smart_Property)
3. [Akıllı sözleşmeler](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Yeniden kullanılabilir iş ispatları](https://nakamotoinstitute.org/finney/rpow/)
6. [Mülkiyet unvanlarını sahiplik yetkisiyle güvence altına alın](https://nakamotoinstitute.org/secure-property-titles/)
7. [Bitcoin Teknik Raporu](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Zooko'nun üçgeni](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Renkli paralar teknik raporu](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Mastercoin Teknik Raporu](https://github.com/mastercoin-MSC/spec)
12. [Merkeziyetsiz otonom şirketler, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Basitleştirilmiş ödeme doğrulaması](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Merkle ağaçları](https://wikipedia.org/wiki/Merkle_tree)
15. [Patricia ağaçları](https://wikipedia.org/wiki/Patricia_tree)
16. [HAYALET](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ ve Otonom Temsilciler, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn'in Turing Festivalinde Akıllı Mülk hakkındaki görüşleri](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Ethereum Merkle Patricia ağaçları](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Peter Todd'un Merkle toplam ağaçları hakkında düşünceleri](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Yönergenin tarihçesini görmek için [bu wiki sayfasına](https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md) göz atın._

_Birçok topluluk odaklı, açık kaynaklı yazılım projesi gibi Ethereum'un da ilk başlangıcından bu yana gelişerek büyümeye devam ediyor. Ethereum'daki en son gelişmeleri ve protokolde nasıl değişikliklerin yapıldığını öğrenmek için [bu kılavuzu](/learn/) öneririz._
