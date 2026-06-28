---
title: Ethereum Tanıtım Belgesi
description: Ethereum'un piyasaya sürülmesinden önce 2013 yılında yayımlanan tanıtım belgesi.
lang: tr
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Birkaç yıllık olmasına rağmen, faydalı bir referans olmaya devam ettiği ve [Ethereum](/)'u ve vizyonunu doğru bir şekilde temsil ettiği için aşağıdaki orijinal belgeyi koruyoruz._

## Yeni Nesil Akıllı Sözleşme ve Merkeziyetsiz Uygulama Platformu {#a-next-generation-smart-contract-and-decentralized-application-platform}

Satoshi Nakamoto'nun 2009 yılında Bitcoin'i geliştirmesi, aynı anda hiçbir dayanağı veya "[içsel değeri](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" olmayan ve merkezi bir ihraççısı veya kontrol edicisi bulunmayan bir dijital varlığın ilk örneği olması nedeniyle, para ve para birimi alanında radikal bir gelişme olarak sıkça övülmüştür. Ancak, Bitcoin deneyinin tartışmasız daha önemli olan bir diğer parçası, dağıtık mutabakat aracı olarak altta yatan blokzincir teknolojisidir ve dikkatler hızla Bitcoin'in bu diğer yönüne kaymaya başlamaktadır. Blokzincir teknolojisinin yaygın olarak bahsedilen alternatif uygulamaları arasında; özel para birimlerini ve finansal araçları temsil etmek için blokzincir üzerindeki dijital varlıkları kullanmak ("[renkli coin'ler](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), temeldeki fiziksel bir cihazın mülkiyeti ("[akıllı mülkiyet](https://en.bitcoin.it/wiki/Smart_Property)"), alan adları gibi misli olmayan varlıklar ("[Namecoin](http://namecoin.org)") ve dijital varlıkların keyfi kurallar uygulayan bir kod parçası tarafından doğrudan kontrol edilmesini içeren daha karmaşık uygulamalar ("[akıllı sözleşmeler](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") veya hatta blokzincir tabanlı "[merkeziyetsiz otonom organizasyonlar](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO'lar) yer almaktadır. Ethereum'un sağlamayı amaçladığı şey, keyfi durum geçiş fonksiyonlarını kodlamak için kullanılabilecek "sözleşmeler" oluşturmaya yarayan, yerleşik, tam teşekküllü ve Turing tam (Turing-complete) bir programlama diline sahip bir blokzincirdir. Bu, kullanıcıların yukarıda açıklanan sistemlerin herhangi birini ve henüz hayal bile etmediğimiz daha pek çoğunu, sadece birkaç satır kodla mantığını yazarak oluşturmalarına olanak tanır.

## Bitcoin'e Giriş ve Mevcut Kavramlar {#introduction-to-bitcoin-and-existing-concepts}

### Tarihçe {#history}

Merkeziyetsiz dijital para birimi kavramı ve mülkiyet sicilleri gibi alternatif uygulamalar onlarca yıldır varlığını sürdürmektedir. 1980'lerin ve 1990'ların, çoğunlukla Chaumian körlemesi (Chaumian blinding) olarak bilinen bir kriptografik ilkele dayanan anonim e-nakit protokolleri, yüksek derecede gizlilik sağlayan bir para birimi sundu, ancak protokoller merkezi bir aracıya dayanmaları nedeniyle büyük ölçüde ilgi görmekte başarısız oldu. 1998'de Wei Dai'nin [b-money](http://www.weidai.com/bmoney.txt)'si, hesaplamalı bulmacaları çözerek para yaratma fikrini ve merkeziyetsiz mutabakatı tanıtan ilk teklif oldu, ancak teklif merkeziyetsiz mutabakatın gerçekte nasıl uygulanabileceğine dair ayrıntılar açısından yetersizdi. 2005 yılında Hal Finney, bir kripto para birimi konsepti oluşturmak için b-money'den gelen fikirleri Adam Back'in hesaplama açısından zor Hashcash bulmacalarıyla birlikte kullanan bir sistem olan "[yeniden kullanılabilir iş kanıtları](https://nakamotoinstitute.org/finney/rpow/)" kavramını tanıttı, ancak arka planda güvenilir bilgi işleme dayanarak bir kez daha idealin gerisinde kaldı. 2009 yılında, açık anahtar kriptografisi aracılığıyla sahipliği yönetmek için yerleşik ilkeleri, coin'lerin kime ait olduğunu takip etmek için "İş Kanıtı (PoW)" olarak bilinen bir mutabakat algoritmasıyla birleştiren merkeziyetsiz bir para birimi, ilk kez Satoshi Nakamoto tarafından uygulamaya kondu.

İş Kanıtı (PoW) arkasındaki mekanizma bu alanda bir dönüm noktasıydı çünkü aynı anda iki sorunu çözdü. İlk olarak, ağdaki düğümlerin Bitcoin defterinin durumuna yönelik bir dizi kurallı güncelleme üzerinde toplu olarak anlaşmasına olanak tanıyan basit ve orta derecede etkili bir mutabakat algoritması sağladı. İkinci olarak, mutabakat sürecine serbest girişe izin veren bir mekanizma sağlayarak, mutabakatı kimin etkileyeceğine karar verme şeklindeki politik sorunu çözerken aynı zamanda sybil saldırılarını da engelledi. Bunu, belirli bir listede benzersiz bir varlık olarak kaydedilme gerekliliği gibi katılıma yönelik resmi bir engeli, ekonomik bir engelle değiştirerek yapar; mutabakat oylama sürecinde tek bir düğümün ağırlığı, düğümün getirdiği hesaplama gücüyle doğru orantılıdır. O zamandan beri, bir düğümün ağırlığını hesaplama kaynaklarıyla değil, elinde tuttuğu para birimiyle orantılı olarak hesaplayan _Hisse Kanıtı (PoS)_ adı verilen alternatif bir yaklaşım önerilmiştir; iki yaklaşımın göreceli yararlarının tartışılması bu belgenin kapsamı dışındadır, ancak her iki yaklaşımın da bir kripto paranın omurgası olarak hizmet etmek üzere kullanılabileceği unutulmamalıdır.

### Bir Durum Geçiş Sistemi Olarak Bitcoin {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

Teknik bir bakış açısıyla, Bitcoin gibi bir kripto paranın defteri, mevcut tüm bitcoin'lerin sahiplik statüsünden oluşan bir "durum" ve bir durum ile bir işlemi alıp sonuç olarak yeni bir durum çıkaran bir "durum geçiş fonksiyonu"nun bulunduğu bir durum geçiş sistemi olarak düşünülebilir. Örneğin standart bir bankacılık sisteminde durum bir bilançodur, işlem X$'ı A'dan B'ye taşımak için bir taleptir ve durum geçiş fonksiyonu A'nın hesabındaki değeri X$ kadar azaltır ve B'nin hesabındaki değeri X$ kadar artırır. Eğer A'nın hesabında en başta X$'dan daha az para varsa, durum geçiş fonksiyonu bir hata döndürür. Dolayısıyla, resmi olarak şu şekilde tanımlanabilir:

```
APPLY(S,TX) -> S' or ERROR
```

Yukarıda tanımlanan bankacılık sisteminde:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Ancak:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

Bitcoin'deki "durum", basılmış ve henüz harcanmamış tüm coin'lerin (teknik olarak "harcanmamış işlem çıktıları" veya UTXO) koleksiyonudur; her UTXO'nun bir değeri ve bir sahibi (temelde kriptografik bir açık anahtar olan 20 baytlık bir adres ile tanımlanır<sup>[fn1](#notes)</sup>) vardır. Bir işlem bir veya daha fazla girdi içerir; her girdi mevcut bir UTXO'ya bir referans ve sahibinin adresiyle ilişkili özel anahtar tarafından üretilen kriptografik bir imza içerir ve her çıktı duruma eklenecek yeni bir UTXO içeren bir veya daha fazla çıktı içerir.

Durum geçiş fonksiyonu `APPLY(S,TX) -> S'` kabaca şu şekilde tanımlanabilir:

<ol>
  <li>
    <code>TX</code> içindeki her girdi için:
    <ul>
    <li>
        Referans verilen UTXO <code>S</code> içinde değilse, bir hata döndür.
    </li>
    <li>
        Sağlanan imza UTXO'nun sahibiyle eşleşmiyorsa, bir hata döndür.
    </li>
    </ul>
  </li>
  <li>
    Tüm girdi UTXO'larının değerlerinin toplamı, tüm çıktı UTXO'larının değerlerinin toplamından azsa, bir hata döndür.
  </li>
  <li>
    Tüm girdi UTXO'ları çıkarılmış ve tüm çıktı UTXO'ları eklenmiş olarak <code>S</code>'i döndür.
  </li>
</ol>

İlk adımın ilk yarısı, işlem göndericilerinin var olmayan coin'leri harcamasını engeller, ilk adımın ikinci yarısı işlem göndericilerinin başkalarının coin'lerini harcamasını engeller ve ikinci adım değerin korunmasını zorunlu kılar. Bunu ödeme için kullanmak adına protokol şu şekildedir. Diyelim ki Alice, Bob'a 11.7 BTC göndermek istiyor. İlk olarak Alice, sahip olduğu ve toplamı en az 11.7 BTC olan bir dizi kullanılabilir UTXO arayacaktır. Gerçekçi olmak gerekirse, Alice tam olarak 11.7 BTC elde edemeyecektir; diyelim ki elde edebileceği en küçük miktar 6+4+2=12'dir. Daha sonra bu üç girdi ve iki çıktı ile bir işlem oluşturur. İlk çıktı, sahibi Bob'un adresi olan 11.7 BTC olacak ve ikinci çıktı, sahibi Alice'in kendisi olan kalan 0.3 BTC'lik "para üstü" olacaktır.

### Madencilik {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Güvenilir merkezi bir hizmete erişimimiz olsaydı, bu sistemin uygulanması çok kolay olurdu; durumu takip etmek için merkezi bir sunucunun sabit diskini kullanarak tam olarak açıklandığı gibi kodlanabilirdi. Ancak Bitcoin ile merkeziyetsiz bir para sistemi kurmaya çalışıyoruz, bu nedenle herkesin işlemlerin sırası üzerinde hemfikir olmasını sağlamak için durum işlem sistemini bir mutabakat sistemiyle birleştirmemiz gerekecek. Bitcoin'in merkeziyetsiz mutabakat süreci, ağdaki düğümlerin sürekli olarak "bloklar" adı verilen işlem paketleri üretmeye çalışmasını gerektirir. Ağın kabaca her on dakikada bir blok üretmesi amaçlanmıştır; her blok bir zaman damgası, bir nonce, önceki bloğa bir referans (yani hash'i) ve önceki bloktan bu yana gerçekleşen tüm işlemlerin bir listesini içerir. Zamanla bu, Bitcoin defterinin en son durumunu temsil etmek üzere sürekli güncellenen, kalıcı ve sürekli büyüyen bir "blokzincir" yaratır.

Bir bloğun geçerli olup olmadığını kontrol etme algoritması, bu paradigmada ifade edildiği şekliyle şöyledir:

1. Blok tarafından referans verilen önceki bloğun var olup olmadığını ve geçerli olup olmadığını kontrol edin.
2. Bloğun zaman damgasının önceki bloğunkinden daha büyük<sup>[fn2](#notes)</sup> ve gelecekteki 2 saatten daha az olduğunu kontrol edin.
3. Bloktaki İş Kanıtı (PoW) geçerliliğini kontrol edin.
4. `S[0]` önceki bloğun sonundaki durum olsun.
5. `TX`'nin `n` işlem içeren bloğun işlem listesi olduğunu varsayalım. `0...n-1` içindeki tüm `i` için `S[i+1] = APPLY(S[i],TX[i])` ayarlayın. Herhangi bir uygulama bir hata döndürürse, çıkın ve false döndürün.
6. True döndürün ve `S[n]`'yi bu bloğun sonundaki durum olarak kaydedin.

Esasen, bloktaki her işlem, işlem yürütülmeden önceki kurallı durumdan yeni bir duruma geçerli bir durum geçişi sağlamalıdır. Durumun blokta hiçbir şekilde kodlanmadığına dikkat edin; bu tamamen doğrulayıcı düğüm tarafından hatırlanması gereken bir soyutlamadır ve herhangi bir blok için yalnızca başlangıç durumundan başlayarak ve her bloktaki her işlemi sırayla uygulayarak (güvenli bir şekilde) hesaplanabilir. Ek olarak, madencinin işlemleri bloğa dahil etme sırasının önemli olduğunu unutmayın; bir blokta B'nin A tarafından oluşturulan bir UTXO'yu harcadığı A ve B gibi iki işlem varsa, A, B'den önce gelirse blok geçerli olur, aksi takdirde geçerli olmaz.

Yukarıdaki listede bulunan ve diğer sistemlerde bulunmayan tek geçerlilik koşulu "İş Kanıtı (PoW)" gerekliliğidir. Kesin koşul, 256 bitlik bir sayı olarak ele alınan her bloğun çift SHA-256 hash'inin, bu yazının yazıldığı an itibarıyla yaklaşık 2<sup>187</sup> olan dinamik olarak ayarlanan bir hedeften daha az olması gerektiğidir. Bunun amacı, blok oluşturmayı hesaplama açısından "zor" hale getirmek ve böylece sybil saldırganlarının tüm blokzinciri kendi lehlerine yeniden oluşturmalarını engellemektir. SHA-256 tamamen öngörülemez bir sözde rastgele fonksiyon olacak şekilde tasarlandığından, geçerli bir blok oluşturmanın tek yolu basitçe deneme yanılma yapmak, nonce değerini tekrar tekrar artırmak ve yeni hash'in eşleşip eşleşmediğini görmektir.

Mevcut ~2<sup>187</sup> hedefinde, geçerli bir blok bulunmadan önce ağın ortalama ~2<sup>69</sup> deneme yapması gerekir; genel olarak hedef, ağdaki bir düğüm tarafından ortalama her on dakikada bir yeni bir blok üretilecek şekilde her 2016 blokta bir ağ tarafından yeniden kalibre edilir. Madencileri bu hesaplama işi için telafi etmek amacıyla, her bloğun madencisi, kendisine yoktan 25 BTC veren bir işlemi dahil etme hakkına sahiptir. Ek olarak, herhangi bir işlemin girdilerindeki toplam değer çıktılarındakinden daha yüksekse, aradaki fark da "işlem ücreti" olarak madenciye gider. Tesadüfen, bu aynı zamanda BTC'nin ihraç edildiği tek mekanizmadır; başlangıç durumu hiç coin içermiyordu.

Madenciliğin amacını daha iyi anlamak için, kötü niyetli bir saldırgan durumunda ne olacağını inceleyelim. Bitcoin'in temel kriptografisinin güvenli olduğu bilindiğinden, saldırgan Bitcoin sisteminin doğrudan kriptografi tarafından korunmayan tek bölümünü hedef alacaktır: işlemlerin sırası. Saldırganın stratejisi basittir:

1. Bir ürün (tercihen hızlı teslim edilen dijital bir ürün) karşılığında bir satıcıya 100 BTC gönderin
2. Ürünün teslim edilmesini bekleyin
3. Aynı 100 BTC'yi kendisine gönderen başka bir işlem üretin
4. Ağı, kendisine yaptığı işlemin ilk gelen işlem olduğuna ikna etmeye çalışın.

Adım (1) gerçekleştikten sonra, birkaç dakika içinde bir madenci işlemi bir bloğa, örneğin 270000 numaralı bloğa dahil edecektir. Yaklaşık bir saat sonra, o bloktan sonra zincire beş blok daha eklenmiş olacak ve bu blokların her biri dolaylı olarak işleme işaret edecek ve böylece onu "onaylayacaktır". Bu noktada satıcı, ödemeyi kesinleşmiş olarak kabul edecek ve ürünü teslim edecektir; bunun dijital bir ürün olduğunu varsaydığımız için teslimat anında gerçekleşir. Şimdi saldırgan, 100 BTC'yi kendisine gönderen başka bir işlem yaratır. Saldırgan bunu basitçe ağa yayarsa, işlem işlenmeyecektir; madenciler `APPLY(S,TX)` çalıştırmayı deneyecek ve `TX`'nin artık durumda olmayan bir UTXO'yu tükettiğini fark edeceklerdir. Bu yüzden bunun yerine saldırgan, ebeveyn olarak aynı 269999 numaralı bloğa işaret eden ancak eski işlemin yerine yeni işlemin olduğu 270000 numaralı bloğun başka bir versiyonunun madenciliğini yaparak blokzincirde bir "çatallanma" yaratır. Blok verileri farklı olduğundan, bu İş Kanıtı'nın (PoW) yeniden yapılmasını gerektirir. Dahası, saldırganın 270000 numaralı bloğunun yeni versiyonu farklı bir hash'e sahiptir, bu nedenle orijinal 270001 ila 270005 numaralı bloklar ona "işaret etmez"; böylece orijinal zincir ve saldırganın yeni zinciri tamamen ayrıdır. Kural, bir çatallanmada en uzun blokzincirin doğru olarak kabul edilmesidir ve bu nedenle meşru madenciler 270005 zinciri üzerinde çalışırken saldırgan tek başına 270000 zinciri üzerinde çalışacaktır. Saldırganın kendi blokzincirini en uzun hale getirebilmesi için, arayı kapatmak adına ağın geri kalanının toplamından daha fazla hesaplama gücüne sahip olması gerekir (dolayısıyla "%51 saldırısı").

### Merkle Ağaçları {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_Sol: Bir dalın geçerliliğinin kanıtını sunmak için bir Merkle ağacında yalnızca az sayıda düğüm sunmak yeterlidir._

_Sağ: Merkle ağacının herhangi bir bölümünü değiştirme girişimi, eninde sonunda zincirin yukarısında bir yerde tutarsızlığa yol açacaktır._

Bitcoin'in önemli bir ölçeklenebilirlik özelliği, bloğun çok seviyeli bir veri yapısında saklanmasıdır. Bir bloğun "hash'i" aslında yalnızca blok başlığının hash'idir; bu, zaman damgasını, nonce'u, önceki blok hash'ini ve bloktaki tüm işlemleri depolayan Merkle ağacı adı verilen bir veri yapısının kök hash'ini içeren yaklaşık 200 baytlık bir veri parçasıdır. Merkle ağacı, ağacın en altında temel verileri içeren çok sayıda yaprak düğümden, her düğümün iki çocuğunun hash'i olduğu bir dizi ara düğümden ve son olarak ağacın "tepesini" temsil eden, yine iki çocuğunun hash'inden oluşan tek bir kök düğümden meydana gelen bir tür ikili ağaçtır. Merkle ağacının amacı, bir bloktaki verilerin parça parça teslim edilmesine olanak tanımaktır: bir düğüm bir kaynaktan yalnızca bir bloğun başlığını, başka bir kaynaktan ağacın kendisiyle ilgili küçük bir bölümünü indirebilir ve yine de tüm verilerin doğru olduğundan emin olabilir. Bunun işe yaramasının nedeni hash'lerin yukarı doğru yayılmasıdır: kötü niyetli bir kullanıcı bir Merkle ağacının en altına sahte bir işlem yerleştirmeye çalışırsa, bu değişiklik yukarıdaki düğümde bir değişikliğe ve ardından onun üzerindeki düğümde bir değişikliğe neden olacak, sonunda ağacın kökünü ve dolayısıyla bloğun hash'ini değiştirerek protokolün onu tamamen farklı bir blok olarak (neredeyse kesinlikle geçersiz bir İş Kanıtı ile) kaydetmesine neden olacaktır.

Merkle ağacı protokolü tartışmasız uzun vadeli sürdürülebilirlik için gereklidir. Bitcoin ağında her bloğun tamamını depolayan ve işleyen bir "tam düğüm", Nisan 2014 itibarıyla Bitcoin ağında yaklaşık 15 GB disk alanı kaplamaktadır ve ayda bir gigabayttan fazla büyümektedir. Şu anda bu, telefonlar için değil bazı masaüstü bilgisayarlar için uygundur ve gelecekte yalnızca işletmeler ve hobiciler katılabilecektir. "Basitleştirilmiş ödeme doğrulaması" (SPV) olarak bilinen bir protokol, blok başlıklarını indiren, blok başlıklarındaki İş Kanıtı'nı doğrulayan ve ardından yalnızca kendileriyle ilgili işlemlerle ilişkili "dalları" indiren "hafif düğümler" adı verilen başka bir düğüm sınıfının var olmasına olanak tanır. Bu, hafif düğümlerin tüm blokzincirin yalnızca çok küçük bir bölümünü indirirken herhangi bir Bitcoin işleminin durumunun ve mevcut bakiyelerinin ne olduğunu güçlü bir güvenlik garantisiyle belirlemesine olanak tanır.

### Alternatif Blokzincir Uygulamaları {#alternative-blockchain-applications}

Temel blokzincir fikrini alıp diğer kavramlara uygulama fikrinin de uzun bir geçmişi vardır. 2005 yılında Nick Szabo, "çoğaltılmış veritabanı teknolojisindeki yeni gelişmelerin" kimin hangi araziye sahip olduğuna dair bir sicili depolamak için blokzincir tabanlı bir sisteme nasıl olanak tanıyacağını açıklayan ve arazi edinimi, zilyetlik ve Gürcü arazi vergisi gibi kavramları içeren ayrıntılı bir çerçeve oluşturan "[sahip yetkisiyle güvenli mülkiyet tapuları](https://nakamotoinstitute.org/library/secure-property-titles/)" kavramını ortaya attı. Ancak ne yazık ki o dönemde mevcut etkili bir çoğaltılmış veritabanı sistemi yoktu ve bu nedenle protokol hiçbir zaman uygulamaya konmadı. Ancak 2009'dan sonra, Bitcoin'in merkeziyetsiz mutabakatı geliştirildikten sonra bir dizi alternatif uygulama hızla ortaya çıkmaya başladı.

- **Namecoin** - 2010 yılında oluşturulan [Namecoin](https://namecoin.org/), en iyi merkeziyetsiz bir isim kayıt veritabanı olarak tanımlanabilir. Tor, Bitcoin ve BitMessage gibi merkeziyetsiz protokollerde, diğer insanların onlarla etkileşime girebilmesi için hesapları tanımlamanın bir yolu olması gerekir, ancak mevcut tüm çözümlerde kullanılabilen tek tanımlayıcı türü `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy` gibi sözde rastgele bir hash'tir. İdeal olarak, bir kişi "george" gibi bir isme sahip bir hesaba sahip olmak ister. Ancak sorun şu ki, eğer bir kişi "george" adında bir hesap oluşturabiliyorsa, başka biri de aynı işlemi kullanarak "george" adını kendisi için kaydedebilir ve onun kimliğine bürünebilir. Tek çözüm, ilk kaydedenin başarılı olduğu ve ikincisinin başarısız olduğu ilk başvuran paradigmasıdır - bu, Bitcoin mutabakat protokolü için mükemmel şekilde uygun bir sorundur. Namecoin, böyle bir fikri kullanan bir isim kayıt sisteminin en eski ve en başarılı uygulamasıdır.
- **Renkli coin'ler (Colored coins)** - [renkli coin'lerin](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) amacı, insanların kendi dijital para birimlerini - veya tek birimli bir para biriminin önemli önemsiz durumunda, dijital token'ları - Bitcoin blokzincirinde oluşturmalarına olanak tanıyan bir protokol olarak hizmet etmektir. Renkli coin'ler protokolünde, belirli bir Bitcoin UTXO'suna herkese açık olarak bir renk atanarak yeni bir para birimi "ihraç edilir" ve protokol, diğer UTXO'ların rengini özyinelemeli olarak onları oluşturan işlemin harcadığı girdilerin rengiyle aynı olacak şekilde tanımlar (karışık renkli girdiler durumunda bazı özel kurallar geçerlidir). Bu, kullanıcıların yalnızca belirli bir renkteki UTXO'ları içeren cüzdanları korumalarına ve aldıkları herhangi bir UTXO'nun rengini belirlemek için blokzincirde geriye doğru giderek onları normal bitcoin'ler gibi göndermelerine olanak tanır.
- **Metacoin'ler** - bir metacoin'in arkasındaki fikir, Bitcoin'in üzerinde yaşayan, metacoin işlemlerini depolamak için Bitcoin işlemlerini kullanan ancak farklı bir durum geçiş fonksiyonuna, `APPLY'`'e sahip bir protokole sahip olmaktır. Metacoin protokolü geçersiz metacoin işlemlerinin Bitcoin blokzincirinde görünmesini engelleyemediğinden, `APPLY'(S,TX)` bir hata döndürürse protokolün varsayılan olarak `APPLY'(S,TX) = S`'ye döneceği kuralı eklenir. Bu, potansiyel olarak Bitcoin'in kendi içinde uygulanamayan gelişmiş özelliklere sahip, ancak madencilik ve ağ oluşturmanın karmaşıklıkları zaten Bitcoin protokolü tarafından ele alındığından çok düşük bir geliştirme maliyetiyle keyfi bir kripto para protokolü oluşturmak için kolay bir mekanizma sağlar. Metacoin'ler bazı finansal sözleşme sınıflarını, isim kaydını ve merkeziyetsiz borsayı uygulamak için kullanılmıştır.

Bu nedenle, genel olarak bir mutabakat protokolü oluşturmaya yönelik iki yaklaşım vardır: bağımsız bir ağ oluşturmak ve Bitcoin üzerine bir protokol oluşturmak. İlk yaklaşım, Namecoin gibi uygulamalar söz konusu olduğunda makul ölçüde başarılı olsa da, uygulanması zordur; her bir uygulamanın bağımsız bir blokzinciri başlatmasının yanı sıra gerekli tüm durum geçişi ve ağ kodunu oluşturması ve test etmesi gerekir. Ek olarak, merkeziyetsiz mutabakat teknolojisine yönelik uygulama setinin, uygulamaların büyük çoğunluğunun kendi blokzincirlerini garanti edemeyecek kadar küçük olacağı bir güç yasası dağılımını izleyeceğini öngörüyoruz ve birbirleriyle etkileşime girmesi gereken, özellikle merkeziyetsiz otonom organizasyonlar olmak üzere büyük merkeziyetsiz uygulama sınıflarının var olduğunu not ediyoruz.

Öte yandan Bitcoin tabanlı yaklaşım, Bitcoin'in basitleştirilmiş ödeme doğrulama özelliklerini devralmaması gibi bir kusura sahiptir. SPV Bitcoin için işe yarar çünkü blokzincir derinliğini geçerlilik için bir vekil olarak kullanabilir; bir noktada, bir işlemin ataları yeterince geriye gittiğinde, bunların meşru olarak durumun bir parçası olduğunu söylemek güvenlidir. Öte yandan blokzincir tabanlı meta-protokoller, blokzinciri kendi protokolleri bağlamında geçerli olmayan işlemleri dahil etmemeye zorlayamaz. Bu nedenle, tamamen güvenli bir SPV meta-protokol uygulamasının, belirli işlemlerin geçerli olup olmadığını belirlemek için Bitcoin blokzincirinin başlangıcına kadar geriye doğru tarama yapması gerekecektir. Şu anda, Bitcoin tabanlı meta-protokollerin tüm "hafif" uygulamaları verileri sağlamak için güvenilir bir sunucuya dayanmaktadır; bu, özellikle bir kripto paranın birincil amaçlarından birinin güven ihtiyacını ortadan kaldırmak olduğu düşünüldüğünde, tartışmasız oldukça yetersiz bir sonuçtur.

### Betik (Scripting) {#scripting}

Herhangi bir uzantı olmasa bile, Bitcoin protokolü aslında "akıllı sözleşmeler" kavramının zayıf bir versiyonunu kolaylaştırır. Bitcoin'deki UTXO'lar yalnızca bir açık anahtara değil, aynı zamanda basit yığın tabanlı bir programlama dilinde ifade edilen daha karmaşık bir betiğe de ait olabilir. Bu paradigmada, o UTXO'yu harcayan bir işlem, betiği tatmin eden veriler sağlamalıdır. Nitekim, temel açık anahtar sahipliği mekanizması bile bir betik aracılığıyla uygulanır: betik girdi olarak bir eliptik eğri imzası alır, bunu işleme ve UTXO'ya sahip olan adrese karşı doğrular ve doğrulama başarılı olursa 1, aksi takdirde 0 döndürür. Çeşitli ek kullanım durumları için daha karmaşık başka betikler de mevcuttur. Örneğin, doğrulamak için verilen üç özel anahtardan ikisinin imzasını gerektiren bir betik ("çoklu imza") oluşturulabilir; bu, kurumsal hesaplar, güvenli tasarruf hesapları ve bazı satıcı emanet durumları için yararlı bir kurulumdur. Betikler ayrıca hesaplama problemlerinin çözümleri için ödül ödemek amacıyla da kullanılabilir ve hatta "bana bu değerde bir Dogecoin işlemi gönderdiğinize dair bir SPV kanıtı sağlayabilirseniz bu Bitcoin UTXO'su sizindir" gibi bir şey söyleyen bir betik bile oluşturulabilir, bu da temelde merkeziyetsiz çapraz kripto para takasına olanak tanır.

Ancak, Bitcoin'de uygulandığı şekliyle betik dilinin birkaç önemli sınırlaması vardır:

- **Turing eksiksizliğinin olmaması** - yani, Bitcoin betik dilinin desteklediği büyük bir hesaplama alt kümesi olsa da, neredeyse her şeyi desteklemez. Eksik olan ana kategori döngülerdir. Bu, işlem doğrulaması sırasında sonsuz döngülerden kaçınmak için yapılır; teorik olarak betik programcıları için aşılabilir bir engeldir, çünkü herhangi bir döngü, temel kodu bir if ifadesiyle birçok kez tekrarlayarak simüle edilebilir, ancak bu, alan açısından çok verimsiz betiklere yol açar. Örneğin, alternatif bir eliptik eğri imza algoritmasının uygulanması, muhtemelen tümü koda ayrı ayrı dahil edilen 256 tekrarlanan çarpma turu gerektirecektir.
- **Değer körlüğü** - bir UTXO betiğinin çekilebilecek miktar üzerinde ince ayarlı kontrol sağlamasının hiçbir yolu yoktur. Örneğin, bir kâhin sözleşmesinin güçlü bir kullanım durumu, A ve B'nin 1000$ değerinde BTC koyduğu ve 30 gün sonra betiğin A'ya 1000$ değerinde BTC ve geri kalanını B'ye gönderdiği bir riskten korunma sözleşmesi olabilir. Bu, 1 BTC'nin USD cinsinden değerini belirlemek için bir kâhin gerektirir, ancak o zaman bile şu anda mevcut olan tamamen merkezi çözümlere kıyasla güven ve altyapı gereksinimi açısından muazzam bir gelişmedir. Ancak, UTXO'lar ya hep ya hiç olduğundan, bunu başarmanın tek yolu, değişen değerlerde birçok UTXO'ya (örneğin, 30'a kadar her k için 2<sup>k</sup>'lık bir UTXO) sahip olmak ve kâhinin hangi UTXO'yu A'ya ve hangisini B'ye göndereceğini seçmesini sağlamak gibi çok verimsiz bir hileden geçer.
- **Durum eksikliği** - UTXO ya harcanabilir ya da harcanmamış olabilir; bunun ötesinde başka herhangi bir iç durumu koruyan çok aşamalı sözleşmeler veya betikler için bir fırsat yoktur. Bu, çok aşamalı opsiyon sözleşmeleri, merkeziyetsiz borsa teklifleri veya iki aşamalı kriptografik taahhüt protokolleri (güvenli hesaplama ödülleri için gereklidir) yapmayı zorlaştırır. Bu aynı zamanda UTXO'nun merkeziyetsiz organizasyonlar gibi daha karmaşık "durumlu" sözleşmeler oluşturmak için değil, yalnızca basit, tek seferlik sözleşmeler oluşturmak için kullanılabileceği anlamına gelir ve meta-protokollerin uygulanmasını zorlaştırır. İkili durumun değer körlüğü ile birleşmesi, bir diğer önemli uygulama olan çekim limitlerinin de imkansız olduğu anlamına gelir.
- **Blokzincir körlüğü** - UTXO'lar nonce, zaman damgası ve önceki blok hash'i gibi blokzincir verilerine karşı kördür. Bu, betik dilini potansiyel olarak değerli bir rastgelelik kaynağından mahrum bırakarak kumar ve diğer birkaç kategorideki uygulamaları ciddi şekilde sınırlar.

Böylece, kripto para üzerine gelişmiş uygulamalar oluşturmak için üç yaklaşım görüyoruz: yeni bir blokzincir oluşturmak, Bitcoin üzerinde betik kullanmak ve Bitcoin üzerinde bir meta-protokol oluşturmak. Yeni bir blokzincir oluşturmak, bir özellik seti oluşturmada sınırsız özgürlük sağlar, ancak geliştirme süresi, başlatma çabası ve güvenlik pahasına. Betik kullanmanın uygulanması ve standartlaştırılması kolaydır, ancak yetenekleri açısından çok sınırlıdır ve meta-protokoller kolay olmalarına rağmen ölçeklenebilirlik hatalarından muzdariptir. Ethereum ile, geliştirme kolaylığında daha da büyük kazanımların yanı sıra daha da güçlü hafif istemci özellikleri sağlayan ve aynı zamanda uygulamaların ekonomik bir ortamı ve blokzincir güvenliğini paylaşmasına olanak tanıyan alternatif bir çerçeve oluşturmayı amaçlıyoruz.

## Ethereum {#ethereum}

Ethereum'un niyeti, merkeziyetsiz uygulamalar (dapp) oluşturmak için alternatif bir protokol yaratmak ve hızlı geliştirme süresinin, küçük ve nadiren kullanılan uygulamalar için güvenliğin ve farklı uygulamaların çok verimli bir şekilde etkileşime girme yeteneğinin önemli olduğu durumlara özel bir vurgu yaparak, büyük bir merkeziyetsiz uygulama sınıfı için çok yararlı olacağına inandığımız farklı bir dizi ödünleşim sunmaktır. Ethereum bunu, esasen nihai soyut temel katmanı inşa ederek yapar: herkesin mülkiyet, işlem formatları ve durum geçiş işlevleri için kendi keyfi kurallarını oluşturabileceği akıllı sözleşmeler ve merkeziyetsiz uygulamalar yazmasına olanak tanıyan, yerleşik bir Turing tam programlama diline sahip bir blokzincir. Namecoin'in en temel sürümü iki satır kodla yazılabilir ve para birimleri ile itibar sistemleri gibi diğer protokoller yirminin altında satırla inşa edilebilir. Değer içeren ve yalnızca belirli koşullar karşılandığında kilidini açan kriptografik "kutular" olan akıllı sözleşmeler de, Turing tamlığı, değer farkındalığı, blokzincir farkındalığı ve durumun eklenen güçleri nedeniyle Bitcoin betiklerinin sunduğundan çok daha fazla güçle platformun üzerine inşa edilebilir.

### Ethereum Hesapları {#ethereum-accounts}

Ethereum'da durum, "hesaplar" adı verilen nesnelerden oluşur; her hesabın 20 baytlık bir adresi vardır ve durum geçişleri, hesaplar arasındaki doğrudan değer ve bilgi transferleridir. Bir Ethereum hesabı dört alan içerir:

- Her işlemin yalnızca bir kez işlenebildiğinden emin olmak için kullanılan bir sayaç olan **nonce**
- Hesabın mevcut **Ether bakiyesi**
- Varsa, hesabın **sözleşme kodu**
- Hesabın **depolama alanı** (varsayılan olarak boştur)

"Ether", Ethereum'un ana dahili kripto yakıtıdır ve işlem ücretlerini ödemek için kullanılır. Genel olarak iki tür hesap vardır: özel anahtarlar tarafından kontrol edilen **harici olarak sahip olunan hesaplar** ve sözleşme kodları tarafından kontrol edilen **kontrat hesapları**. Harici olarak sahip olunan bir hesabın kodu yoktur ve bir işlem oluşturup imzalayarak harici olarak sahip olunan bir hesaptan mesajlar gönderilebilir; bir kontrat hesabında, kontrat hesabı her mesaj aldığında kodu etkinleşir, bu da onun dahili depolama alanını okuyup yazmasına ve sırasıyla diğer mesajları göndermesine veya sözleşmeler oluşturmasına olanak tanır.

Ethereum'daki "sözleşmelerin" "yerine getirilmesi" veya "uyulması" gereken bir şey olarak görülmemesi gerektiğine dikkat edin; daha ziyade, Ethereum yürütme ortamının içinde yaşayan, bir mesaj veya işlem tarafından "dürtüldüğünde" her zaman belirli bir kod parçasını yürüten ve kalıcı değişkenleri takip etmek için kendi Ether bakiyeleri ile kendi anahtar/değer depoları üzerinde doğrudan kontrole sahip olan "otonom aracılar" gibidirler.

### Mesajlar ve İşlemler {#messages-and-transactions}

"İşlem" terimi Ethereum'da, harici olarak sahip olunan bir hesaptan gönderilecek bir mesajı depolayan imzalı veri paketini ifade etmek için kullanılır. İşlemler şunları içerir:

- Mesajın alıcısı
- Göndereni tanımlayan bir imza
- Gönderenden alıcıya transfer edilecek Ether miktarı
- İsteğe bağlı bir veri alanı
- İşlem yürütmesinin atmasına izin verilen maksimum hesaplama adımı sayısını temsil eden bir `STARTGAS` değeri
- Gönderenin hesaplama adımı başına ödediği ücreti temsil eden bir `GASPRICE` değeri

İlk üçü, herhangi bir kripto parada beklenen standart alanlardır. Veri alanının varsayılan olarak hiçbir işlevi yoktur, ancak sanal makinenin, bir sözleşmenin verilere erişmek için kullanabileceği bir işlem kodu vardır; örnek bir kullanım durumu olarak, bir sözleşme blokzincir üzerinde bir alan adı kayıt hizmeti olarak işlev görüyorsa, kendisine iletilen verileri iki "alan" içeriyormuş gibi yorumlamak isteyebilir; ilk alan kaydedilecek bir alan adı ve ikinci alan da bunun kaydedileceği IP adresidir. Sözleşme bu değerleri mesaj verilerinden okuyacak ve uygun şekilde depolama alanına yerleştirecektir.

`STARTGAS` ve `GASPRICE` alanları, Ethereum'un hizmet reddi önleme modeli için çok önemlidir. Kodda kazara veya kötü niyetli sonsuz döngüleri ya da diğer hesaplama israflarını önlemek için, her işlemin kullanabileceği kod yürütme hesaplama adımı sayısına bir sınır belirlemesi gerekir. Temel hesaplama birimi "Gaz"dır; genellikle bir hesaplama adımı 1 gaza mal olur, ancak bazı işlemler hesaplama açısından daha pahalı oldukları veya durumun bir parçası olarak depolanması gereken veri miktarını artırdıkları için daha yüksek miktarda gaza mal olur. Ayrıca işlem verilerindeki her bayt için 5 gazlık bir ücret vardır. Ücret sisteminin niyeti, bir saldırganın hesaplama, bant genişliği ve depolama dahil olmak üzere tükettiği her kaynak için orantılı olarak ödeme yapmasını gerektirmektir; bu nedenle, ağın bu kaynaklardan herhangi birini daha fazla tüketmesine yol açan herhangi bir işlemin, artışla kabaca orantılı bir gaz ücretine sahip olması gerekir.

### Mesajlar {#messages}

Sözleşmeler diğer sözleşmelere "mesajlar" gönderme yeteneğine sahiptir. Mesajlar, asla serileştirilmeyen ve yalnızca Ethereum yürütme ortamında var olan sanal nesnelerdir. Bir mesaj şunları içerir:

- Mesajın göndereni (örtük)
- Mesajın alıcısı
- Mesajla birlikte transfer edilecek Ether miktarı
- İsteğe bağlı bir veri alanı
- Bir `STARTGAS` değeri

Esasen bir mesaj, harici bir aktör tarafından değil de bir sözleşme tarafından üretilmesi dışında bir işlem gibidir. Bir mesaj, halihazırda kod yürüten bir sözleşme, bir mesaj üretip yürüten `CALL` işlem kodunu yürüttüğünde üretilir. Bir işlem gibi, bir mesaj da alıcı hesabın kendi kodunu çalıştırmasına yol açar. Böylece sözleşmeler, tıpkı harici aktörlerin yapabildiği gibi diğer sözleşmelerle ilişkiler kurabilir.

Bir işlem veya sözleşme tarafından atanan gaz harcama izninin, o işlem ve tüm alt yürütmeler tarafından tüketilen toplam gaz için geçerli olduğuna dikkat edin. Örneğin, harici bir aktör A, B'ye 1000 gaz ile bir işlem gönderirse ve B, C'ye bir mesaj göndermeden önce 600 gaz tüketirse ve C'nin dahili yürütmesi geri dönmeden önce 300 gaz tüketirse, B gazı bitmeden önce 100 gaz daha harcayabilir.

### Ethereum Durum Geçiş İşlevi {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

Ethereum durum geçiş işlevi `APPLY(S,TX) -> S'` şu şekilde tanımlanabilir:

1. İşlemin iyi biçimlendirilmiş olup olmadığını (yani doğru sayıda değere sahip olup olmadığını), imzanın geçerli olup olmadığını ve nonce değerinin gönderenin hesabındaki nonce ile eşleşip eşleşmediğini kontrol edin. Eşleşmiyorsa bir hata döndürün.
2. İşlem ücretini `STARTGAS * GASPRICE` olarak hesaplayın ve imzadan gönderen adresi belirleyin. Ücreti gönderenin hesap bakiyesinden çıkarın ve gönderenin nonce değerini artırın. Harcayacak yeterli bakiye yoksa bir hata döndürün.
3. `GAS = STARTGAS` değerini başlatın ve işlemdeki baytları ödemek için bayt başına belirli bir miktar gazı eksiltin.
4. İşlem değerini gönderenin hesabından alıcı hesaba transfer edin. Alıcı hesap henüz mevcut değilse, onu oluşturun. Alıcı hesap bir sözleşmeyse, sözleşmenin kodunu ya tamamlanana kadar ya da yürütmenin gazı bitene kadar çalıştırın.
5. Gönderenin yeterli parası olmadığı için değer transferi başarısız olursa veya kod yürütmesinin gazı biterse, ücretlerin ödenmesi dışındaki tüm durum değişikliklerini geri alın ve ücretleri madencinin hesabına ekleyin.
6. Aksi takdirde, kalan tüm gazın ücretlerini gönderene iade edin ve tüketilen gaz için ödenen ücretleri madenciye gönderin.

Örneğin, sözleşmenin kodunun şu olduğunu varsayalım:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Gerçekte sözleşme kodunun düşük seviyeli EVM kodunda yazıldığına dikkat edin; bu örnek, netlik sağlaması açısından yüksek seviyeli dillerimizden biri olan Serpent ile yazılmıştır ve EVM koduna derlenebilir. Sözleşmenin depolama alanının boş başladığını ve 10 Ether değeri, 2000 gaz, 0.001 Ether gaz fiyatı ve 64 bayt veri ile bir işlem gönderildiğini varsayalım; 0-31 baytları `2` sayısını ve 32-63 baytları `CHARLIE` dizesini temsil eder<sup>[fn3](#notes)</sup>. Bu durumda durum geçiş işlevi süreci aşağıdaki gibidir:

1. İşlemin geçerli ve iyi biçimlendirilmiş olduğunu kontrol edin.
2. İşlem göndericisinin en az 2000 \* 0.001 = 2 Ether'e sahip olduğunu kontrol edin. Öyleyse, gönderenin hesabından 2 Ether çıkarın.
3. Gazı 2000 olarak başlatın; işlemin 170 bayt uzunluğunda olduğunu ve bayt ücretinin 5 olduğunu varsayarak, geriye 1150 gaz kalacak şekilde 850 çıkarın.
4. Gönderenin hesabından 10 Ether daha çıkarın ve bunu kontrat hesabına ekleyin.
5. Kodu çalıştırın. Bu durumda bu basittir: sözleşmenin `2` endeksindeki depolama alanının kullanılıp kullanılmadığını kontrol eder, kullanılmadığını fark eder ve bu nedenle `2` endeksindeki depolama alanını `CHARLIE` değerine ayarlar. Bunun 187 gaz aldığını varsayalım, bu nedenle kalan gaz miktarı 1150 - 187 = 963'tür.
6. Gönderenin hesabına 963 \* 0.001 = 0.963 Ether geri ekleyin ve ortaya çıkan durumu döndürün.

İşlemin alıcı tarafında hiçbir sözleşme olmasaydı, toplam işlem ücreti basitçe sağlanan `GASPRICE` değerinin işlemin bayt cinsinden uzunluğuyla çarpımına eşit olurdu ve işlemle birlikte gönderilen veriler alakasız olurdu.

Mesajların geri almalar açısından işlemlerle eşdeğer çalıştığına dikkat edin: bir mesaj yürütmesinin gazı biterse, o mesajın yürütülmesi ve o yürütme tarafından tetiklenen diğer tüm yürütmeler geri alınır, ancak üst yürütmelerin geri alınmasına gerek yoktur. Bu, bir sözleşmenin başka bir sözleşmeyi çağırmasının "güvenli" olduğu anlamına gelir, çünkü A, B'yi G gaz ile çağırırsa, A'nın yürütmesinin en fazla G gaz kaybedeceği garanti edilir. Son olarak, bir sözleşme oluşturan bir `CREATE` işlem kodu olduğuna dikkat edin; yürütme mekaniği genel olarak `CALL` ile benzerdir, tek istisna yürütmenin çıktısının yeni oluşturulan bir sözleşmenin kodunu belirlemesidir.

### Kod Yürütme {#code-execution}

Ethereum sözleşmelerindeki kod, "Ethereum sanal makine kodu" veya "EVM kodu" olarak adlandırılan düşük seviyeli, yığın tabanlı bir baytkod dilinde yazılır. Kod, her baytın bir işlemi temsil ettiği bir dizi bayttan oluşur. Genel olarak kod yürütme, mevcut program sayacındaki (sıfırdan başlayan) işlemi tekrar tekrar gerçekleştirmekten ve ardından kodun sonuna ulaşılana veya bir hata ya da `STOP` veya `RETURN` talimatı algılanana kadar program sayacını bir artırmaktan oluşan sonsuz bir döngüdür. İşlemlerin veri depolamak için üç tür alana erişimi vardır:

- Değerlerin itilebildiği ve çekilebildiği son giren ilk çıkar bir kapsayıcı olan **yığın (stack)**
- Sonsuz genişletilebilir bir bayt dizisi olan **bellek (memory)**
- Sözleşmenin uzun vadeli **depolama alanı (storage)**, bir anahtar/değer deposu. Hesaplama bittikten sonra sıfırlanan yığın ve belleğin aksine, depolama alanı uzun vadede kalıcıdır.

Kod ayrıca gelen mesajın değerine, gönderenine ve verilerine ve ayrıca blok başlığı verilerine erişebilir ve kod ayrıca çıktı olarak bir bayt veri dizisi döndürebilir.

EVM kodunun resmi yürütme modeli şaşırtıcı derecede basittir. Ethereum sanal makinesi çalışırken, tam hesaplama durumu `(block_state, transaction, message, code, memory, stack, pc, gas)` demeti ile tanımlanabilir; burada `block_state`, tüm hesapları içeren ve bakiyeleri ile depolama alanını kapsayan küresel durumdur. Her yürütme turunun başlangıcında, mevcut talimat `code`'un `pc`. baytı alınarak bulunur (`pc >= len(code)` ise 0) ve her talimatın demeti nasıl etkilediği açısından kendi tanımı vardır. Örneğin, `ADD` yığından iki öğe çeker ve toplamlarını iter, `gas` değerini 1 azaltır ve `pc` değerini 1 artırır ve `SSTORE` yığından en üstteki iki öğeyi çeker ve ikinci öğeyi ilk öğe tarafından belirtilen endekste sözleşmenin depolama alanına ekler. Tam zamanında derleme yoluyla Ethereum sanal makine yürütmesini optimize etmenin birçok yolu olsa da, Ethereum'un temel bir uygulaması birkaç yüz satır kodla yapılabilir.

### Blokzincir ve Madencilik {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

Ethereum blokzinciri birçok yönden Bitcoin blokzincirine benzer, ancak bazı farklılıkları vardır. Blokzincir mimarisi açısından Ethereum ve Bitcoin arasındaki temel fark, Bitcoin'in aksine Ethereum bloklarının hem işlem listesinin hem de en son durumun bir kopyasını içermesidir. Bunun dışında, blok numarası ve zorluk olmak üzere iki değer daha blokta saklanır. Ethereum'daki temel blok doğrulama algoritması aşağıdaki gibidir:

1. Referans verilen önceki bloğun mevcut ve geçerli olup olmadığını kontrol edin.
2. Bloğun zaman damgasının referans verilen önceki bloğunkinden daha büyük ve gelecekte 15 dakikadan daha az olduğunu kontrol edin.
3. Blok numarası, zorluk, işlem kökü, amca (uncle) kökü ve gaz limitinin (çeşitli düşük seviyeli Ethereum'a özgü kavramlar) geçerli olduğunu kontrol edin.
4. Bloktaki İş Kanıtı (PoW) geçerli olduğunu kontrol edin.
5. `S[0]`, önceki bloğun sonundaki durum olsun.
6. `TX`, `n` işlem içeren bloğun işlem listesi olsun. `0...n-1` içindeki tüm `i` için `S[i+1] = APPLY(S[i],TX[i])` ayarlayın. Herhangi bir uygulama bir hata döndürürse veya bu noktaya kadar blokta tüketilen toplam gaz `GASLIMIT` değerini aşarsa, bir hata döndürün.
7. `S_FINAL`, madenciye ödenen blok ödülünün eklendiği `S[n]` olsun.
8. `S_FINAL` durumunun Merkle ağacı kökünün blok başlığında sağlanan nihai durum köküne eşit olup olmadığını kontrol edin. Eşitse blok geçerlidir; aksi takdirde geçerli değildir.

Bu yaklaşım ilk bakışta oldukça verimsiz görünebilir, çünkü her blokla birlikte tüm durumu depolaması gerekir, ancak gerçekte verimlilik Bitcoin'inkiyle karşılaştırılabilir olmalıdır. Bunun nedeni, durumun ağaç yapısında depolanması ve her bloktan sonra ağacın yalnızca küçük bir bölümünün değiştirilmesi gerekmesidir. Bu nedenle, genel olarak, bitişik iki blok arasında ağacın büyük çoğunluğu aynı olmalıdır ve bu nedenle veriler bir kez depolanabilir ve işaretçiler (yani alt ağaçların hash'leri) kullanılarak iki kez referans verilebilir. Bunu başarmak için, düğümlerin yalnızca değiştirilmesine değil, aynı zamanda verimli bir şekilde eklenmesine ve silinmesine de olanak tanıyan Merkle ağacı konseptinde bir değişiklik de dahil olmak üzere "Patricia ağacı" olarak bilinen özel bir ağaç türü kullanılır. Ek olarak, tüm durum bilgileri son bloğun bir parçası olduğundan, tüm blokzincir geçmişini depolamaya gerek yoktur - bu, Bitcoin'e uygulanabilseydi, alanda 5-20 kat tasarruf sağlayacağı hesaplanabilen bir stratejidir.

Sıkça sorulan bir soru, fiziksel donanım açısından sözleşme kodunun "nerede" yürütüldüğüdür. Bunun basit bir cevabı vardır: sözleşme kodunu yürütme süreci, blok doğrulama algoritmasının bir parçası olan durum geçiş işlevinin tanımının bir parçasıdır, bu nedenle bir işlem `B` bloğuna eklenirse, o işlem tarafından oluşturulan kod yürütmesi, şimdi ve gelecekte `B` bloğunu indiren ve doğrulayan tüm düğümler tarafından yürütülecektir.

## Uygulamalar {#applications}

Genel olarak, Ethereum üzerinde üç tür uygulama vardır. İlk kategori, kullanıcılara paralarını kullanarak sözleşmeleri yönetmeleri ve bunlara girmeleri için daha güçlü yollar sunan finansal uygulamalardır. Buna alt para birimleri, finansal türevler, riskten korunma (hedging) sözleşmeleri, tasarruf cüzdanları, vasiyetnameler ve nihayetinde bazı tam ölçekli iş sözleşmesi sınıfları bile dahildir. İkinci kategori, paranın dahil olduğu ancak yapılan işin parasal olmayan ağır bir yönünün de bulunduğu yarı finansal uygulamalardır; hesaplama problemlerine yönelik çözümler için kendi kendini yürüten ödüller buna mükemmel bir örnektir. Son olarak, çevrimiçi oylama ve merkeziyetsiz yönetişim gibi hiçbir şekilde finansal olmayan uygulamalar vardır.

### Token Sistemleri {#token-systems}

Blokzincir üzerindeki Token sistemleri, USD veya altın gibi varlıkları temsil eden alt para birimlerinden şirket hisselerine, akıllı mülkiyeti temsil eden bireysel Token'lara, güvenli ve taklit edilemez kuponlara ve hatta teşvik amaçlı puan sistemleri olarak kullanılan, geleneksel değerle hiçbir bağı olmayan Token sistemlerine kadar pek çok uygulamaya sahiptir. Token sistemlerini Ethereum'da uygulamak şaşırtıcı derecede kolaydır. Anlaşılması gereken kilit nokta, bir para biriminin veya Token sisteminin temelinde tek bir işleme sahip bir veritabanı olduğudur: (i) A'nın işlemden önce en az X birime sahip olması ve (2) işlemin A tarafından onaylanması şartıyla, A'dan X birim çıkar ve B'ye X birim ver. Bir Token sistemi uygulamak için tek gereken, bu mantığı bir sözleşmeye uygulamaktır.

Serpent'te bir Token sistemi uygulamak için temel kod aşağıdaki gibidir:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Bu, esasen bu belgede daha yukarıda açıklanan "bankacılık sistemi" durum geçiş fonksiyonunun birebir uygulamasıdır. Para birimlerinin ilk etapta dağıtılmasına yönelik başlangıç adımını ve diğer birkaç uç durumu sağlamak için birkaç ekstra kod satırı eklenmesi gerekir ve ideal olarak diğer sözleşmelerin bir adresin bakiyesini sorgulamasına izin verecek bir fonksiyon eklenmelidir. Ancak hepsi bu kadar. Teorik olarak, alt para birimleri olarak hareket eden Ethereum tabanlı Token sistemleri, zincir içi Bitcoin tabanlı meta para birimlerinin sahip olmadığı bir başka önemli özelliği potansiyel olarak içerebilir: işlem ücretlerini doğrudan o para birimi cinsinden ödeme yeteneği. Bunun uygulanma şekli şöyledir: Sözleşme, göndericiye ücretleri ödemek için kullanılan Ether'i iade edeceği bir Ether bakiyesi tutar ve ücret olarak aldığı dahili para birimlerini toplayıp sürekli devam eden bir açık artırmada yeniden satarak bu bakiyeyi doldurur. Böylece kullanıcıların hesaplarını Ether ile "etkinleştirmeleri" gerekecektir, ancak Ether bir kez oraya konduğunda, sözleşme her seferinde iade edeceği için yeniden kullanılabilir olacaktır.

### Finansal Türevler ve Sabit Değerli Para Birimleri {#financial-derivatives-and-stable-value-currencies}

Finansal türevler, bir "akıllı sözleşme"nin en yaygın uygulamasıdır ve kodda uygulanması en basit olanlardan biridir. Finansal sözleşmeleri uygulamanın önündeki temel zorluk, çoğunun harici bir fiyat göstergesine referans gerektirmesidir; örneğin, çok arzu edilen bir uygulama, Ether'in (veya başka bir kripto paranın) ABD doları karşısındaki volatilitesine karşı riskten koruyan bir akıllı sözleşmedir, ancak bunu yapmak sözleşmenin ETH/USD değerinin ne olduğunu bilmesini gerektirir. Bunu yapmanın en basit yolu, belirli bir tarafça (örneğin NASDAQ) sürdürülen, o tarafın sözleşmeyi gerektiği gibi güncelleme yeteneğine sahip olacağı şekilde tasarlanmış ve diğer sözleşmelerin o sözleşmeye bir mesaj gönderip fiyatı sağlayan bir yanıt almasına olanak tanıyan bir arayüz sunan bir "veri beslemesi" sözleşmesidir.

Bu kritik bileşen göz önüne alındığında, riskten korunma sözleşmesi aşağıdaki gibi görünecektir:

1. A tarafının 1000 Ether girmesini bekle.
2. B tarafının 1000 Ether girmesini bekle.
3. Veri beslemesi sözleşmesini sorgulayarak hesaplanan 1000 Ether'in USD değerini depolama alanına kaydet, diyelim ki bu $x olsun.
4. 30 gün sonra, A'ya $x değerinde Ether (yeni fiyatı almak için veri beslemesi sözleşmesini tekrar sorgulayarak hesaplanır) ve geri kalanını B'ye göndermek için A veya B'nin sözleşmeyi "yeniden etkinleştirmesine" izin ver.

Böyle bir sözleşme, kripto ticaretinde önemli bir potansiyele sahip olacaktır. Kripto para hakkında belirtilen temel sorunlardan biri volatil olmasıdır; birçok kullanıcı ve tüccar kriptografik varlıklarla işlem yapmanın güvenliğini ve rahatlığını istese de, fonlarının değerinin %23'ünü tek bir günde kaybetme ihtimaliyle yüzleşmek istemeyebilirler. Şimdiye kadar en yaygın olarak önerilen çözüm, ihraççı destekli varlıklar olmuştur; buradaki fikir, bir ihraççının birim ihraç etme ve iptal etme hakkına sahip olduğu bir alt para birimi yaratması ve kendisine (çevrimdışı olarak) belirtilen bir dayanak varlığın (örneğin altın, USD) bir birimini sağlayan herkese para biriminin bir birimini sağlamasıdır. İhraççı daha sonra, kripto varlığın bir birimini geri gönderen herkese dayanak varlığın bir birimini sağlamayı taahhüt eder. Bu mekanizma, ihraççıya güvenilebilmesi şartıyla, kriptografik olmayan herhangi bir varlığın kriptografik bir varlığa "yükseltilmesine" olanak tanır.

Ancak pratikte ihraççılar her zaman güvenilir değildir ve bazı durumlarda bankacılık altyapısı bu tür hizmetlerin var olması için çok zayıf veya çok düşmancadır. Finansal türevler bir alternatif sunar. Burada, bir varlığı desteklemek için fon sağlayan tek bir ihraççı yerine, kriptografik bir referans varlığın (örneğin ETH) fiyatının artacağına bahse giren spekülatörlerden oluşan merkeziyetsiz bir piyasa bu rolü oynar. İhraççıların aksine, spekülatörlerin anlaşmanın kendi taraflarında temerrüde düşme seçenekleri yoktur çünkü riskten korunma sözleşmesi fonlarını emanette tutar. Bu yaklaşımın tamamen merkeziyetsiz olmadığını unutmayın, çünkü fiyat göstergesini sağlamak için hala güvenilir bir kaynağa ihtiyaç vardır; ancak tartışmalı da olsa bu, altyapı gereksinimlerini azaltma (bir ihraççı olmanın aksine, bir fiyat beslemesi yayınlamak lisans gerektirmez ve muhtemelen ifade özgürlüğü olarak kategorize edilebilir) ve dolandırıcılık potansiyelini azaltma açısından hala muazzam bir gelişmedir.

### Kimlik ve İtibar Sistemleri {#identity-and-reputation-systems}

Tüm alternatif kripto paraların en eskisi olan [Namecoin](http://namecoin.org/), kullanıcıların isimlerini diğer verilerle birlikte halka açık bir veritabanına kaydedebilecekleri bir isim kayıt sistemi sağlamak için Bitcoin benzeri bir Blokzincir kullanmaya çalıştı. Belirtilen başlıca kullanım durumu, "bitcoin.org" (veya Namecoin örneğinde "bitcoin.bit") gibi alan adlarını bir IP adresiyle eşleyen bir [DNS](https://wikipedia.org/wiki/Domain_Name_System) sistemi içindir. Diğer kullanım durumları arasında e-posta kimlik doğrulaması ve potansiyel olarak daha gelişmiş itibar sistemleri yer alır. İşte Ethereum üzerinde Namecoin benzeri bir isim kayıt sistemi sağlamak için temel sözleşme:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Sözleşme çok basittir; tek yaptığı, Ethereum ağı içinde ekleme yapılabilen ancak değiştirilemeyen veya silinemeyen bir veritabanı olmaktır. Herkes bir ismi bir değerle kaydedebilir ve bu kayıt sonsuza kadar kalır. Daha karmaşık bir isim kayıt sözleşmesi, diğer sözleşmelerin onu sorgulamasına izin veren bir "fonksiyon yan tümcesi"nin yanı sıra, bir ismin "sahibinin" (yani ilk kaydedenin) verileri değiştirmesi veya sahipliği transfer etmesi için bir mekanizmaya da sahip olacaktır. Bunun üzerine itibar ve güven ağı (web-of-trust) işlevselliği bile eklenebilir.

### Merkeziyetsiz Dosya Depolama {#decentralized-file-storage}

Geçtiğimiz birkaç yıl içinde, en öne çıkanı Dropbox olmak üzere, kullanıcıların sabit disklerinin bir yedeğini yüklemelerine ve hizmetin bu yedeği depolamasına ve aylık bir ücret karşılığında kullanıcının buna erişmesine olanak tanımayı amaçlayan bir dizi popüler çevrimiçi dosya depolama girişimi ortaya çıktı. Ancak bu noktada dosya depolama pazarı zaman zaman nispeten verimsizdir; mevcut çeşitli çözümlere üstünkörü bir bakış, özellikle ne ücretsiz kotaların ne de kurumsal düzeydeki indirimlerin devreye girmediği "tekinsiz vadi" olan 20-200 GB seviyesinde, ana akım dosya depolama maliyetleri için aylık fiyatların, tek bir ayda tüm sabit diskin maliyetinden daha fazlasını ödediğiniz seviyelerde olduğunu göstermektedir. Ethereum sözleşmeleri, bireysel kullanıcıların kendi sabit disklerini kiralayarak küçük miktarlarda para kazanabilecekleri ve kullanılmayan alanın dosya depolama maliyetlerini daha da düşürmek için kullanılabileceği merkeziyetsiz bir dosya depolama ekosisteminin geliştirilmesine olanak tanıyabilir.

Böyle bir aygıtın temelini oluşturan kilit parça, "merkeziyetsiz Dropbox sözleşmesi" olarak adlandırdığımız şey olacaktır. Bu sözleşme şu şekilde çalışır. İlk olarak, istenen veri bloklara bölünür, gizlilik için her bir blok şifrelenir ve bundan bir Merkle ağacı oluşturulur. Daha sonra, her N blokta bir, sözleşmenin Merkle ağacında rastgele bir endeks seçeceği (rastgelelik kaynağı olarak sözleşme kodundan erişilebilen önceki blok hash'ini kullanarak) ve ağaçtaki o belirli endeksteki bloğun sahipliğine dair basitleştirilmiş bir ödeme doğrulaması benzeri kanıt içeren bir işlem sağlayan ilk varlığa X Ether vereceği kuralına sahip bir sözleşme yapılır. Bir kullanıcı dosyasını yeniden indirmek istediğinde, dosyayı kurtarmak için bir mikro ödeme kanalı protokolü (örneğin, 32 kilobayt başına 1 szabo ödeme) kullanabilir; ücret açısından en verimli yaklaşım, ödeyenin işlemi sonuna kadar yayınlamaması, bunun yerine her 32 kilobayttan sonra işlemi aynı nonce ile biraz daha kazançlı olanıyla değiştirmesidir.

Protokolün önemli bir özelliği, dosyayı unutmaya karar vermemeleri konusunda birçok rastgele düğüme güveniliyormuş gibi görünse de, dosyayı gizli paylaşım yoluyla birçok parçaya bölerek ve her bir parçanın hala bir düğümün elinde olup olmadığını görmek için sözleşmeleri izleyerek bu riskin sıfıra yaklaştırılabilecek olmasıdır. Eğer bir sözleşme hala para ödüyorsa, bu dışarıda birinin hala dosyayı depoladığına dair kriptografik bir kanıt sağlar.

### Merkeziyetsiz Otonom Organizasyonlar {#decentralized-autonomous-organizations}

Bir "merkeziyetsiz otonom organizasyon"un genel konsepti, belki de %67 çoğunlukla, varlığın fonlarını harcama ve kodunu değiştirme hakkına sahip belirli bir üye veya hissedar grubuna sahip sanal bir varlık olmasıdır. Üyeler, organizasyonun fonlarını nasıl tahsis etmesi gerektiğine toplu olarak karar verirler. Bir DAO'nun fonlarını tahsis etme yöntemleri, ödüllerden, maaşlardan, işi ödüllendirmek için dahili bir para birimi gibi daha da egzotik mekanizmalara kadar değişebilir. Bu, esasen geleneksel bir şirketin veya kar amacı gütmeyen kuruluşun yasal donanımlarını kopyalar, ancak uygulama için yalnızca kriptografik Blokzincir teknolojisini kullanır. Şimdiye kadar DAO'lar etrafındaki konuşmaların çoğu, temettü alan hissedarları ve ticareti yapılabilir hisseleri olan bir "merkeziyetsiz otonom şirket" (DAC) "kapitalist" modeli etrafında olmuştur; belki de bir "merkeziyetsiz otonom topluluk" olarak tanımlanan bir alternatifte, tüm üyeler karar alma sürecinde eşit paya sahip olacak ve bir üye eklemek veya çıkarmak için mevcut üyelerin %67'sinin kabul etmesi gerekecektir. Bir kişinin yalnızca bir üyeliğe sahip olabileceği gerekliliği daha sonra grup tarafından toplu olarak uygulanmalıdır.

Bir DAO'nun nasıl kodlanacağına dair genel bir taslak aşağıdaki gibidir. En basit tasarım, üyelerin üçte ikisi bir değişiklik üzerinde anlaştığında değişen, kendi kendini değiştiren bir kod parçasıdır. Kod teorik olarak değişmez olsa da, kodun parçalarını ayrı sözleşmelerde tutarak ve hangi sözleşmelerin çağrılacağının adresini değiştirilebilir depolama alanında saklayarak bunun etrafından kolayca dolaşılabilir ve fiili bir değiştirilebilirlik elde edilebilir. Böyle bir DAO sözleşmesinin basit bir uygulamasında, işlemde sağlanan verilerle ayırt edilen üç işlem türü olacaktır:

- Depolama endeksi `K`'daki adresi `V` değeriyle değiştirmek üzere `i` endeksli bir teklif kaydetmek için `[0,i,K,V]`
- `i` teklifi lehine bir oy kaydetmek için `[1,i]`
- Yeterli oy kullanılmışsa `i` teklifini kesinleştirmek için `[2,i]`

Sözleşme daha sonra bunların her biri için yan tümcelere sahip olacaktır. Kimlerin oy kullandığının bir listesiyle birlikte tüm açık depolama değişikliklerinin bir kaydını tutacaktır. Ayrıca tüm üyelerin bir listesine sahip olacaktır. Herhangi bir depolama değişikliği üyelerin üçte ikisinin oyunu aldığında, kesinleştiren bir işlem değişikliği yürütebilir. Daha karmaşık bir iskelet, bir işlem gönderme, üye ekleme ve üye çıkarma gibi özellikler için yerleşik oylama yeteneğine de sahip olacak ve hatta [Akışkan Demokrasi (Liquid Democracy)](https://wikipedia.org/wiki/Liquid_democracy) tarzı oy yetki devri sağlayabilecektir (yani, herkes kendi adına oy kullanması için birini atayabilir ve atama geçişlidir, bu nedenle A B'yi atarsa ve B C'yi atarsa, C A'nın oyunu belirler). Bu tasarım, DAO'nun merkeziyetsiz bir topluluk olarak organik bir şekilde büyümesine olanak tanıyacak ve insanların kimin üye olduğunu filtreleme görevini zamanla uzmanlara devretmelerine izin verecektir; ancak "mevcut sistemin" aksine, bireysel topluluk üyeleri yönelimlerini değiştirdikçe uzmanlar zaman içinde kolayca ortaya çıkıp kaybolabilir.

Alternatif bir model, herhangi bir hesabın sıfır veya daha fazla hisseye sahip olabileceği ve bir karar vermek için hisselerin üçte ikisinin gerektiği merkeziyetsiz bir şirket içindir. Eksiksiz bir iskelet, varlık yönetimi işlevselliğini, hisse almak veya satmak için teklif verme yeteneğini ve teklifleri kabul etme yeteneğini (tercihen sözleşme içinde bir emir eşleştirme mekanizması ile) içerecektir. Yetki devri de Akışkan Demokrasi tarzında var olacak ve "yönetim kurulu" kavramını genelleştirecektir.

### Diğer Uygulamalar {#further-applications}

**1. Tasarruf cüzdanları**. Alice'in fonlarını güvende tutmak istediğini, ancak özel anahtarını kaybedeceğinden veya birinin hackleyeceğinden endişe ettiğini varsayalım. Bir banka olan Bob ile aşağıdaki gibi bir sözleşmeye Ether koyar:

- Sadece Alice günde fonların en fazla %1'ini çekebilir.
- Sadece Bob günde fonların en fazla %1'ini çekebilir, ancak Alice anahtarıyla bir işlem yaparak bu yeteneği kapatma olanağına sahiptir.
- Alice ve Bob birlikte her şeyi çekebilirler.

Normalde günde %1 Alice için yeterlidir ve Alice daha fazlasını çekmek isterse yardım için Bob ile iletişime geçebilir. Alice'in anahtarı hacklenirse, fonları yeni bir sözleşmeye taşımak için Bob'a koşar. Anahtarını kaybederse, Bob eninde sonunda fonları çıkaracaktır. Bob'un kötü niyetli olduğu ortaya çıkarsa, onun çekim yapma yeteneğini kapatabilir.

**2. Mahsul sigortası**. Herhangi bir fiyat endeksi yerine hava durumunun veri beslemesini kullanarak kolayca bir finansal türev sözleşmesi yapılabilir. Iowa'daki bir çiftçi, Iowa'daki yağış miktarına ters orantılı olarak ödeme yapan bir türev satın alırsa, kuraklık olduğunda çiftçi otomatik olarak para alacak ve yeterince yağmur yağarsa çiftçi mutlu olacaktır çünkü mahsulleri iyi durumda olacaktır. Bu, genel olarak doğal afet sigortasına genişletilebilir.

**3. Merkeziyetsiz bir veri beslemesi**. Fark sözleşmeleri (CFD) gibi finansal sözleşmeler için, veri beslemesini "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)" adlı bir protokol aracılığıyla merkeziyetsizleştirmek aslında mümkün olabilir. SchellingCoin temel olarak şu şekilde çalışır: N tarafın tümü sisteme belirli bir verinin değerini (örneğin ETH/USD fiyatı) girer, değerler sıralanır ve 25. ile 75. yüzdelik dilim arasındaki herkes ödül olarak bir Token alır. Herkesin diğer herkesin vereceği cevabı verme teşviki vardır ve çok sayıda oyuncunun gerçekçi bir şekilde üzerinde anlaşabileceği tek değer bariz varsayılandır: gerçek. Bu, teorik olarak ETH/USD fiyatı, Berlin'deki sıcaklık veya hatta belirli bir zor hesaplamanın sonucu da dahil olmak üzere herhangi bir sayıda değer sağlayabilen merkeziyetsiz bir protokol yaratır.

**4. Akıllı çoklu imza emaneti**. Bitcoin, örneğin verilen beş anahtardan üçünün fonları harcayabildiği çoklu imza işlem sözleşmelerine izin verir. Ethereum daha fazla ayrıntıya izin verir; örneğin, beş kişiden dördü her şeyi harcayabilir, beş kişiden üçü günde %10'a kadar harcayabilir ve beş kişiden ikisi günde %0,5'e kadar harcayabilir. Ek olarak, Ethereum çoklu imza (multisig) asenkrondur - iki taraf imzalarını Blokzincir'e farklı zamanlarda kaydedebilir ve son imza işlemi otomatik olarak gönderecektir.

**5. Bulut bilişim**. EVM teknolojisi, kullanıcıların başkalarından hesaplamalar yapmasını istemelerine ve ardından isteğe bağlı olarak rastgele seçilen belirli kontrol noktalarındaki hesaplamaların doğru yapıldığına dair kanıtlar istemelerine olanak tanıyan doğrulanabilir bir bilgi işlem ortamı oluşturmak için de kullanılabilir. Bu, herhangi bir kullanıcının masaüstü, dizüstü bilgisayarı veya özel sunucusuyla katılabileceği bir bulut bilişim pazarının yaratılmasına olanak tanır ve sistemin güvenilir olmasını (yani düğümlerin kârlı bir şekilde hile yapamamasını) sağlamak için güvenlik depozitolarıyla birlikte anlık kontroller kullanılabilir. Böyle bir sistem tüm görevler için uygun olmasa da; örneğin yüksek düzeyde süreçler arası iletişim gerektiren görevler, büyük bir düğüm bulutunda kolayca yapılamaz. Ancak diğer görevleri paralelleştirmek çok daha kolaydır; SETI@home, folding@home ve genetik algoritmalar gibi projeler böyle bir platform üzerinde kolayca uygulanabilir.

**6. Eşler arası kumar**. Frank Stajano ve Richard Clayton'ın [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf)'ı gibi herhangi bir sayıda eşler arası kumar protokolü Ethereum Blokzincir'i üzerinde uygulanabilir. En basit kumar protokolü aslında sadece bir sonraki blok hash'i üzerinde bir fark sözleşmesidir ve daha gelişmiş protokoller buradan inşa edilebilir, böylece hile yapma yeteneği olmayan sıfıra yakın ücretli kumar hizmetleri yaratılabilir.

**7. Tahmin piyasaları**. Bir kâhin veya SchellingCoin sağlandığında, tahmin piyasalarının uygulanması da kolaydır ve SchellingCoin ile birlikte tahmin piyasaları, merkeziyetsiz organizasyonlar için bir yönetişim protokolü olarak [futarşinin](https://mason.gmu.edu/~rhanson/futarchy.html) ilk ana akım uygulaması olabilir.

**8. Zincir içi merkeziyetsiz pazar yerleri**, kimlik ve itibar sistemini temel alarak.

## Çeşitli Konular ve Endişeler {#miscellanea-and-concerns}

### Değiştirilmiş GHOST Uygulaması {#modified-ghost-implementation}

"Greedy Heaviest Observed Subtree" (GHOST) protokolü, ilk olarak Yonatan Sompolinsky ve Aviv Zohar tarafından [Aralık 2013'te](https://eprint.iacr.org/2013/881.pdf) tanıtılan bir yeniliktir. GHOST'un arkasındaki motivasyon, hızlı onay sürelerine sahip blokzincirlerin şu anda yüksek bayat (stale) oranı nedeniyle azalan güvenlikten muzdarip olmasıdır; blokların ağda yayılması belirli bir zaman aldığından, eğer A madencisi bir blok kazar ve ardından A madencisinin bloğu B'ye yayılmadan önce B madencisi başka bir blok kazarsa, B madencisinin bloğu boşa gidecek ve ağ güvenliğine katkıda bulunmayacaktır. Ayrıca, bir merkezileşme sorunu vardır: Eğer A madencisi %30 hash gücüne sahip bir madencilik havuzuysa ve B %10 hash gücüne sahipse, A'nın zamanın %70'inde bayat bir blok üretme riski olacaktır (çünkü zamanın diğer %30'unda A son bloğu üretmiştir ve bu nedenle madencilik verilerini hemen alacaktır), oysa B'nin zamanın %90'ında bayat bir blok üretme riski olacaktır. Bu nedenle, blok aralığı bayat oranının yüksek olmasına yetecek kadar kısaysa, A sadece boyutu sayesinde önemli ölçüde daha verimli olacaktır. Bu iki etki birleştiğinde, hızlı bir şekilde blok üreten blokzincirlerin, bir madencilik havuzunun madencilik süreci üzerinde fiili kontrole sahip olacak kadar büyük bir ağ hash gücü yüzdesine sahip olmasına yol açması kuvvetle muhtemeldir.

Sompolinsky ve Zohar tarafından açıklandığı gibi GHOST, hangi zincirin "en uzun" olduğunun hesaplanmasına bayat blokları dahil ederek ağ güvenliği kaybı şeklindeki ilk sorunu çözer; yani, sadece bir bloğun ebeveyni ve daha eski ataları değil, aynı zamanda bloğun atasının bayat soyundan gelenler de (Ethereum jargonunda "amcalar" (uncles)) hangi bloğun onu destekleyen en büyük toplam iş kanıtına (proof-of-work) sahip olduğunun hesaplanmasına eklenir. Merkezileşme eğilimi şeklindeki ikinci sorunu çözmek için, Sompolinsky ve Zohar tarafından açıklanan protokolün ötesine geçiyoruz ve bayat bloklara da blok ödülleri sağlıyoruz: bayat bir blok temel ödülünün %87,5'ini alır ve bayat bloğu içeren yeğen (nephew) kalan %12,5'i alır. Ancak işlem ücretleri amcalara verilmez.

Ethereum, yalnızca yedi seviye aşağı inen basitleştirilmiş bir GHOST sürümü uygular. Spesifik olarak, şu şekilde tanımlanır:

- Bir blok bir ebeveyn belirtmeli ve 0 veya daha fazla amca belirtmelidir
- B bloğuna dahil edilen bir amca aşağıdaki özelliklere sahip olmalıdır:
  - `2 <= k <= 7` olmak üzere, B'nin k'ıncı nesil atasının doğrudan bir çocuğu olmalıdır.
  - B'nin bir atası olamaz
  - Bir amca geçerli bir blok başlığı olmalıdır, ancak önceden doğrulanmış veya hatta geçerli bir blok olması gerekmez
  - Bir amca, önceki bloklara dahil edilen tüm amcalardan ve aynı bloğa dahil edilen diğer tüm amcalardan farklı olmalıdır (çifte dahil etmeme)
- B bloğundaki her U amcası için, B'nin madencisi coinbase ödülüne ek olarak %3,125 alır ve U'nun madencisi standart bir coinbase ödülünün %93,75'ini alır.

Amcaların yalnızca 7 nesle kadar dahil edilebildiği bu sınırlı GHOST sürümü iki nedenden dolayı kullanılmıştır. İlk olarak, sınırsız GHOST, belirli bir blok için hangi amcaların geçerli olduğunun hesaplanmasına çok fazla karmaşıklık katacaktır. İkinci olarak, Ethereum'da kullanıldığı şekliyle telafili sınırsız GHOST, bir madencinin halka açık bir saldırganın zincirinde değil de ana zincirde madencilik yapma teşvikini ortadan kaldırır.

### Ücretler {#fees}

Blokzincirde yayınlanan her işlem, ağa onu indirme ve doğrulama maliyeti yüklediğinden, kötüye kullanımı önlemek için tipik olarak işlem ücretlerini içeren bazı düzenleyici mekanizmalara ihtiyaç vardır. Bitcoin'de kullanılan varsayılan yaklaşım, madencilerin bekçi olarak hareket etmesine ve dinamik minimumlar belirlemesine dayanarak tamamen gönüllü ücretlere sahip olmaktır. Bu yaklaşım, özellikle "piyasa temelli" olduğu ve madenciler ile işlem göndericileri arasındaki arz ve talebin fiyatı belirlemesine izin verdiği için Bitcoin topluluğunda çok olumlu karşılanmıştır. Ancak bu akıl yürütme tarzındaki sorun, işlem işlemenin bir piyasa olmamasıdır; işlem işlemeyi madencinin göndericiye sunduğu bir hizmet olarak yorumlamak sezgisel olarak çekici olsa da, gerçekte bir madencinin dahil ettiği her işlemin ağdaki her düğüm tarafından işlenmesi gerekecektir, bu nedenle işlem işleme maliyetinin büyük çoğunluğu, onu dahil edip etmeme kararını veren madenci tarafından değil, üçüncü taraflarca karşılanır. Bu nedenle, ortak malların trajedisi (tragedy-of-the-commons) sorunlarının ortaya çıkması kuvvetle muhtemeldir.

Bununla birlikte, piyasa temelli mekanizmadaki bu kusurun, belirli bir yanlış basitleştirici varsayım verildiğinde sihirli bir şekilde kendini iptal ettiği ortaya çıkıyor. Argüman şu şekildedir. Varsayalım ki:

1. Bir işlem `k` operasyona yol açar ve onu dahil eden herhangi bir madenciye `kR` ödülünü sunar; burada `R` gönderici tarafından belirlenir ve `k` ile `R` madenci tarafından önceden (kabaca) görülebilir.
2. Bir operasyonun herhangi bir düğüme işleme maliyeti `C` kadardır (yani, tüm düğümler eşit verimliliğe sahiptir)
3. Her biri tam olarak eşit işlem gücüne (yani toplamın `1/N` kadarına) sahip `N` madencilik düğümü vardır
4. Madencilik yapmayan tam düğüm yoktur.

Beklenen ödül maliyetten büyükse, bir madenci bir işlemi işlemeye istekli olacaktır. Böylece, madencinin bir sonraki bloğu işleme şansı `1/N` olduğundan beklenen ödül `kR/N` olur ve madenci için işleme maliyeti basitçe `kC` kadardır. Bu nedenle madenciler, `kR/N > kC` veya `R > NC` olan işlemleri dahil edecektir. Unutmayın ki `R`, gönderici tarafından sağlanan operasyon başına ücrettir ve bu nedenle göndericinin işlemden elde ettiği faydanın bir alt sınırıdır ve `NC`, bir operasyonu işlemenin tüm ağa olan toplam maliyetidir. Bu nedenle madenciler, yalnızca toplam faydacı yararın maliyeti aştığı işlemleri dahil etme teşvikine sahiptir.

Ancak gerçekte bu varsayımlardan birkaç önemli sapma vardır:

1. Ekstra doğrulama süresi blok yayılımını geciktirdiğinden ve dolayısıyla bloğun bayatlama şansını artırdığından, madenci işlemi işlemek için diğer doğrulayıcı düğümlerden daha yüksek bir maliyet öder.
2. Madencilik yapmayan tam düğümler mevcuttur.
3. Madencilik gücü dağılımı pratikte radikal bir şekilde eşitsiz sonuçlanabilir.
4. Fayda fonksiyonu ağa zarar vermeyi içeren spekülatörler, siyasi düşmanlar ve çılgınlar mevcuttur ve maliyetlerinin diğer doğrulayıcı düğümlerin ödediği maliyetten çok daha düşük olduğu sözleşmeleri akıllıca kurabilirler.

(1) madencinin daha az işlem dahil etme eğilimi sağlar ve
(2) `NC` değerini artırır; dolayısıyla bu iki etki en azından kısmen birbirini iptal
eder.<sup>[Nasıl?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) ve (4) ana sorundur; bunları çözmek için basitçe dalgalı bir üst sınır (floating cap) kuruyoruz: hiçbir blok, uzun vadeli üstel hareketli ortalamanın
`BLK_LIMIT_FACTOR` katından daha fazla operasyona sahip olamaz.
Spesifik olarak:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` ve `EMA_FACTOR`, şimdilik 65536 ve 1.5 olarak ayarlanacak, ancak daha fazla analizden sonra muhtemelen değiştirilecek olan sabitlerdir.

Bitcoin'de büyük blok boyutlarını caydıran başka bir faktör daha vardır: büyük blokların yayılması daha uzun sürer ve bu nedenle bayatlama olasılıkları daha yüksektir. Ethereum'da, yüksek gaz tüketen blokların yayılması da hem fiziksel olarak daha büyük oldukları için hem de doğrulamak üzere işlem durum geçişlerini işlemeleri daha uzun sürdüğü için daha uzun sürebilir. Bu gecikme caydırıcılığı Bitcoin'de önemli bir husustur, ancak GHOST protokolü nedeniyle Ethereum'da daha az önemlidir; bu nedenle, düzenlenmiş blok limitlerine güvenmek daha istikrarlı bir temel sağlar.

### Hesaplama ve Turing Tamlığı {#computation-and-turing-completeness}

Önemli bir not, Ethereum sanal makinesinin Turing tam (Turing-complete) olmasıdır; bu, EVM kodunun sonsuz döngüler de dahil olmak üzere akla gelebilecek her türlü hesaplamayı kodlayabileceği anlamına gelir. EVM kodu iki şekilde döngüye izin verir. İlk olarak, programın koddaki önceki bir noktaya geri atlamasını sağlayan bir `JUMP` talimatı ve koşullu atlama yapmak için `while x < 27: x = x * 2` gibi ifadelere izin veren bir `JUMPI` talimatı vardır. İkinci olarak, sözleşmeler diğer sözleşmeleri çağırabilir ve potansiyel olarak özyineleme (recursion) yoluyla döngüye izin verebilir. Bu doğal olarak bir soruna yol açar: kötü niyetli kullanıcılar, madencileri ve tam düğümleri sonsuz bir döngüye girmeye zorlayarak onları esasen kapatabilir mi? Sorun, bilgisayar biliminde durma problemi (halting problem) olarak bilinen bir problemden kaynaklanmaktadır: genel durumda, belirli bir programın durup durmayacağını söylemenin bir yolu yoktur.

Durum geçişi bölümünde açıklandığı gibi, çözümümüz bir işlemin atmasına izin verilen maksimum hesaplama adımı sayısını belirlemesini gerektirerek çalışır ve yürütme daha uzun sürerse hesaplama geri alınır ancak ücretler yine de ödenir. Mesajlar da aynı şekilde çalışır. Çözümümüzün arkasındaki motivasyonu göstermek için aşağıdaki örnekleri göz önünde bulundurun:

- Bir saldırgan sonsuz döngü çalıştıran bir sözleşme oluşturur ve ardından bu döngüyü etkinleştiren bir işlemi madenciye gönderir. Madenci, sonsuz döngüyü çalıştırarak işlemi işleyecek ve gazının bitmesini bekleyecektir. Yürütmenin gazı bitip yarıda durmasına rağmen, işlem hala geçerlidir ve madenci her hesaplama adımı için saldırgandan ücreti yine de talep eder.
- Bir saldırgan, madenciyi o kadar uzun süre hesaplama yapmaya zorlamak amacıyla çok uzun bir sonsuz döngü oluşturur ki, hesaplama bittiğinde birkaç blok daha çıkmış olur ve madencinin ücreti talep etmek için işlemi dahil etmesi mümkün olmaz. Ancak saldırganın, yürütmenin atabileceği hesaplama adımlarının sayısını sınırlayan `STARTGAS` için bir değer sunması gerekecektir, böylece madenci hesaplamanın aşırı derecede fazla adım atacağını önceden bilecektir.
- Bir saldırgan `send(A,contract.storage[A]); contract.storage[A] = 0` gibi bir forma sahip koda sahip bir sözleşme görür ve ilk adımı çalıştırmaya yetecek kadar, ancak ikinci adımı çalıştırmayacak kadar (yani, bir çekim işlemi yapıp bakiyenin düşmesine izin vermeyecek kadar) gaz içeren bir işlem gönderir. Sözleşme yazarının bu tür saldırılara karşı korunma konusunda endişelenmesine gerek yoktur, çünkü yürütme yarıda durursa değişiklikler geri alınır.
- Bir finansal sözleşme, riski en aza indirmek için dokuz tescilli veri beslemesinin medyanını alarak çalışır. Bir saldırgan, DAO'lar bölümünde açıklanan değişken adresli çağrı mekanizması aracılığıyla değiştirilebilir olacak şekilde tasarlanmış veri beslemelerinden birini ele geçirir ve onu sonsuz bir döngü çalıştıracak şekilde dönüştürür, böylece finansal sözleşmeden fon talep etme girişimlerini gazın bitmesine zorlamaya çalışır. Ancak finansal sözleşme, bu sorunu önlemek için mesaja bir gaz limiti koyabilir.

Turing tamlığına alternatif, `JUMP` ve `JUMPI` talimatlarının bulunmadığı ve herhangi bir zamanda çağrı yığınında her sözleşmenin yalnızca bir kopyasının bulunmasına izin verilen Turing eksikliğidir (Turing-incompleteness). Bu sistemle, bir sözleşmeyi yürütmenin maliyeti boyutuyla üstten sınırlandırılacağından, açıklanan ücret sistemi ve çözümümüzün etkinliği etrafındaki belirsizlikler gerekli olmayabilir. Ek olarak, Turing eksikliği o kadar da büyük bir sınırlama değildir; kendi içimizde tasarladığımız tüm sözleşme örnekleri arasında şimdiye kadar sadece bir tanesi döngü gerektiriyordu ve bu döngü bile tek satırlık bir kod parçasının 26 tekrarı yapılarak kaldırılabiliyordu. Turing tamlığının ciddi sonuçları ve sınırlı faydası göz önüne alındığında, neden basitçe Turing eksikliği olan bir dile sahip olmayalım? Ancak gerçekte, Turing eksikliği soruna temiz bir çözüm olmaktan uzaktır. Nedenini görmek için aşağıdaki sözleşmeleri göz önünde bulundurun:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Şimdi A'ya bir işlem gönderin. Böylece, 51 işlemde, 2<sup>50</sup> hesaplama adımı süren bir sözleşmemiz olur. Madenciler, her sözleşmenin yanına atabileceği maksimum hesaplama adımı sayısını belirten bir değer tutarak ve bunu diğer sözleşmeleri özyinelemeli olarak çağıran sözleşmeler için hesaplayarak bu tür mantık bombalarını önceden tespit etmeye çalışabilirler, ancak bu, madencilerin diğer sözleşmeleri oluşturan sözleşmeleri yasaklamasını gerektirir (çünkü yukarıdaki 26 sözleşmenin tamamının oluşturulması ve yürütülmesi kolayca tek bir sözleşmede birleştirilebilir). Bir diğer sorunlu nokta, bir mesajın adres alanının bir değişken olmasıdır, bu nedenle genel olarak belirli bir sözleşmenin hangi diğer sözleşmeleri çağıracağını önceden söylemek bile mümkün olmayabilir. Sonuç olarak, şaşırtıcı bir sonuca varıyoruz: Turing tamlığını yönetmek şaşırtıcı derecede kolaydır ve Turing tamlığının olmamasını yönetmek, tamamen aynı kontroller yerinde olmadığı sürece eşit derecede şaşırtıcı derecede zordur - ancak bu durumda neden protokolün Turing tam olmasına izin vermeyelim?

### Para Birimi ve İhraç {#currency-and-issuance}

Ethereum ağı, çeşitli dijital varlık türleri arasında verimli takasa izin vermek için birincil bir likidite katmanı sağlama ve daha da önemlisi işlem ücretlerini ödemek için bir mekanizma sağlama gibi ikili bir amaca hizmet eden kendi yerleşik para birimi olan Ether'i içerir. Kolaylık sağlamak ve gelecekteki tartışmaları önlemek için (Bitcoin'deki mevcut mBTC/uBTC/satoshi tartışmasına bakın), birimler önceden etiketlenecektir:

- 1: Wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: Ether

Bu, "dolar" ve "sent" veya "BTC" ve "satoshi" kavramının genişletilmiş bir versiyonu olarak alınmalıdır. Yakın gelecekte, sıradan işlemler için "Ether", mikro işlemler için "finney" ve ücretler ile protokol uygulaması etrafındaki teknik tartışmalar için "szabo" ve "Wei" kullanılmasını bekliyoruz; kalan birimler daha sonra faydalı hale gelebilir ve bu noktada istemcilere dahil edilmemelidir.

İhraç modeli aşağıdaki gibi olacaktır:

- Ether, Ethereum organizasyonunu finanse etmeyi ve geliştirmeyi ödemeyi amaçlayan ve Mastercoin ile NXT gibi diğer platformlar tarafından başarıyla kullanılan bir mekanizma olan para birimi satışında BTC başına 1000-2000 Ether fiyatından piyasaya sürülecektir. Erken alıcılar daha büyük indirimlerden yararlanacaktır. Satıştan elde edilen BTC, tamamen geliştiricilere maaş ve ödül ödemek için kullanılacak ve Ethereum ile kripto para ekosistemindeki çeşitli kâr amacı güden ve gütmeyen projelere yatırılacaktır.
- Satılan toplam miktarın 0,099 katı (60102216 ETH), erken katkıda bulunanları telafi etmek ve başlangıç bloğundan önce ETH cinsinden giderleri ödemek için organizasyona tahsis edilecektir.
- Satılan toplam miktarın 0,099 katı uzun vadeli bir rezerv olarak tutulacaktır.
- Satılan toplam miktarın 0,26 katı, o noktadan sonra sonsuza dek her yıl madencilere tahsis edilecektir.

| Grup | Başlangıçta | 1 yıl sonra | 5 yıl sonra |
| ---------------------- | --------- | ------------ | ------------- |
| Para birimleri | 1.198X | 1.458X | 2.498X |
| Alıcılar | %83,5 | %68,6 | %40,0 |
| Satış öncesi harcanan rezerv | %8,26 | %6,79 | %3,96 |
| Satış sonrası kullanılan rezerv | %8,26 | %6,79 | %3,96 |
| Madenciler | %0 | %17,8 | %52,0 |

#### Uzun Vadeli Arz Büyüme Oranı (yüzde) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_Doğrusal para birimi ihracına rağmen, tıpkı Bitcoin'de olduğu gibi zamanla arz büyüme oranı yine de sıfıra eğilimlidir._

Yukarıdaki modeldeki iki ana seçenek, (1) bir bağış havuzunun varlığı ve boyutu ile (2) Bitcoin'deki gibi sınırlı bir arzın aksine, sürekli büyüyen doğrusal bir arzın varlığıdır. Bağış havuzunun gerekçesi şu şekildedir. Eğer bağış havuzu olmasaydı ve aynı enflasyon oranını sağlamak için doğrusal ihraç 0,217 katına düşürülseydi, toplam Ether miktarı %16,5 daha az olacak ve bu nedenle her birim %19,8 daha değerli olacaktı. Bu nedenle, dengede satışta %19,8 daha fazla Ether satın alınacak, böylece her birim bir kez daha tam olarak eskisi kadar değerli olacaktı. Organizasyon ayrıca 1,198 katı kadar BTC'ye sahip olacaktı ki bu iki dilime ayrılmış olarak düşünülebilir: orijinal BTC ve ek 0,198 katı. Dolayısıyla bu durum bağışla _tamamen eşdeğerdir_, ancak önemli bir farkla: organizasyon tamamen BTC tutar ve bu nedenle Ether biriminin değerini desteklemeye teşvik edilmez.

Kalıcı doğrusal arz büyüme modeli, bazılarının Bitcoin'de aşırı servet yoğunlaşması olarak gördüğü riski azaltır ve şimdiki ve gelecekteki çağlarda yaşayan bireylere para birimlerini elde etmek için adil bir şans verirken, aynı zamanda Ether elde etmek ve elde tutmak için güçlü bir teşviki korur çünkü yüzde olarak "arz büyüme oranı" zamanla hala sıfıra eğilimlidir. Ayrıca, dikkatsizlik, ölüm vb. nedenlerle coin'ler zaman içinde her zaman kaybolduğundan ve coin kaybı yıllık toplam arzın bir yüzdesi olarak modellenebildiğinden, dolaşımdaki toplam para arzının aslında eninde sonunda yıllık ihracın kayıp oranına bölünmesine eşit bir değerde dengeleneceğini teorize ediyoruz (örneğin, %1'lik bir kayıp oranında, arz 26X'e ulaştığında her yıl 0,26X kazılacak ve 0,26X kaybolacak, böylece bir denge oluşacaktır).

Gelecekte Ethereum'un güvenlik için bir hisse kanıtı (PoS) modeline geçmesinin ve ihraç gereksinimini yılda sıfır ile 0,05X arasına düşürmesinin muhtemel olduğunu unutmayın. Ethereum organizasyonunun fon kaybetmesi veya başka bir nedenle ortadan kaybolması durumunda, bir "sosyal sözleşmeyi" açık bırakıyoruz: herkesin gelecekteki bir aday Ethereum sürümünü oluşturma hakkı vardır, tek koşul Ether miktarının en fazla `60102216 * (1.198 + 0.26 * n)` değerine eşit olmasıdır; burada `n` başlangıç bloğundan sonraki yıl sayısıdır. Yaratıcılar, geliştirmeyi ödemek için PoS odaklı arz genişlemesi ile izin verilen maksimum arz genişlemesi arasındaki farkın bir kısmını veya tamamını kitle fonlamasıyla satmakta veya başka bir şekilde tahsis etmekte özgürdür. Sosyal sözleşmeye uymayan aday yükseltmeler, haklı olarak uyumlu sürümlere çatallanabilir.

### Madencilik Merkezileşmesi {#mining-centralization}

Bitcoin madencilik algoritması, madencilerin blok başlığının biraz değiştirilmiş versiyonları üzerinde SHA256'yı milyonlarca kez tekrar tekrar hesaplamasıyla çalışır, ta ki sonunda bir düğüm hash değeri hedeften (şu anda 2<sup>192</sup> civarında) daha küçük olan bir versiyon bulana kadar. Ancak bu madencilik algoritması iki tür merkezileşmeye karşı savunmasızdır. İlk olarak, madencilik ekosistemi, Bitcoin madenciliğinin özel görevi için tasarlanmış ve bu nedenle binlerce kez daha verimli olan bilgisayar çipleri olan ASIC'lerin (uygulamaya özel entegre devreler) hakimiyetine girmiştir. Bu, Bitcoin madenciliğinin artık son derece merkeziyetsiz ve eşitlikçi bir uğraş olmadığı ve etkili bir şekilde katılmak için milyonlarca dolarlık sermaye gerektirdiği anlamına gelir. İkinci olarak, çoğu Bitcoin madencisi aslında blok doğrulamayı yerel olarak gerçekleştirmez; bunun yerine, blok başlıklarını sağlamak için merkezi bir madencilik havuzuna güvenirler. Bu sorun tartışmasız daha kötüdür: bu yazının yazıldığı an itibarıyla, en büyük üç madencilik havuzu Bitcoin ağındaki işlem gücünün kabaca %50'sini dolaylı olarak kontrol etmektedir, ancak bu durum, bir havuz veya koalisyon bir %51 saldırısı girişiminde bulunursa madencilerin diğer madencilik havuzlarına geçebileceği gerçeğiyle hafifletilmektedir.

Ethereum'daki mevcut niyet, madencilerin durumdan rastgele veriler getirmesinin, blokzincirdeki son N bloktan rastgele seçilmiş bazı işlemleri hesaplamasının ve sonucun hash'ini döndürmesinin gerektiği bir madencilik algoritması kullanmaktır. Bunun iki önemli faydası vardır. İlk olarak, Ethereum sözleşmeleri her türlü hesaplamayı içerebilir, bu nedenle bir Ethereum ASIC'i esasen genel hesaplama için bir ASIC, yani daha iyi bir CPU olacaktır. İkinci olarak, madencilik tüm blokzincire erişim gerektirir, bu da madencileri tüm blokzinciri depolamaya ve en azından her işlemi doğrulayabilmeye zorlar. Bu, merkezi madencilik havuzlarına olan ihtiyacı ortadan kaldırır; madencilik havuzları ödül dağıtımının rastgeleliğini dengeleme gibi meşru bir role hala hizmet edebilse de, bu işlev merkezi kontrolü olmayan eşler arası havuzlar tarafından da eşit derecede iyi bir şekilde yerine getirilebilir.

Bu model test edilmemiştir ve sözleşme yürütmeyi bir madencilik algoritması olarak kullanırken belirli akıllı optimizasyonlardan kaçınma konusunda yol boyunca zorluklar olabilir. Bununla birlikte, bu algoritmanın dikkate değer ölçüde ilginç bir özelliği, blokzincire belirli ASIC'leri engellemek için özel olarak tasarlanmış çok sayıda sözleşme sunarak herkesin "kuyuyu zehirlemesine" izin vermesidir. ASIC üreticilerinin birbirlerine saldırmak için böyle bir numara kullanmaları için ekonomik teşvikler mevcuttur. Bu nedenle, geliştirmekte olduğumuz çözüm nihayetinde tamamen teknik bir çözümden ziyade uyarlanabilir ekonomik bir insan çözümüdür.

### Ölçeklenebilirlik {#scalability}

Ethereum ile ilgili yaygın bir endişe ölçeklenebilirlik sorunudur. Bitcoin gibi Ethereum da her işlemin ağdaki her düğüm tarafından işlenmesi gerektiği kusurundan muzdariptir. Bitcoin'de mevcut blokzincirin boyutu yaklaşık 15 GB'dir ve saatte yaklaşık 1 MB büyümektedir. Eğer Bitcoin ağı Visa'nın saniyede 2000 işlemini işleseydi, her üç saniyede 1 MB (saatte 1 GB, yılda 8 TB) büyüyecekti. Ethereum'un da benzer bir büyüme modeli yaşaması muhtemeldir; bu durum, Bitcoin'de olduğu gibi sadece bir para birimi yerine Ethereum blokzincirinin üzerinde birçok uygulama olacağı gerçeğiyle daha da kötüleşir, ancak Ethereum tam düğümlerinin tüm blokzincir geçmişi yerine sadece durumu depolaması gerektiği gerçeğiyle iyileşir.

Böylesine büyük bir blokzincir boyutuyla ilgili sorun merkezileşme riskidir. Blokzincir boyutu örneğin 100 TB'a çıkarsa, olası senaryo yalnızca çok az sayıda büyük işletmenin tam düğümleri çalıştırması ve tüm normal kullanıcıların hafif SPV düğümlerini kullanması olacaktır. Böyle bir durumda, tam düğümlerin bir araya gelip kârlı bir şekilde hile yapmak (örneğin, blok ödülünü değiştirmek, kendilerine BTC vermek) için anlaşabilecekleri potansiyel endişesi ortaya çıkar. Hafif düğümlerin bunu hemen tespit etmesinin hiçbir yolu olmazdı. Elbette, muhtemelen en az bir dürüst tam düğüm var olacaktır ve birkaç saat sonra dolandırıcılıkla ilgili bilgiler Reddit gibi kanallar aracılığıyla sızacaktır, ancak o noktada çok geç olacaktır: verilen blokları kara listeye alma çabasını organize etmek sıradan kullanıcılara kalacaktır ki bu, başarılı bir %51 saldırısı gerçekleştirmekle benzer ölçekte devasa ve muhtemelen uygulanamaz bir koordinasyon sorunudur. Bitcoin söz konusu olduğunda bu şu anda bir sorundur, ancak [Peter Todd tarafından önerilen](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) ve bu sorunu hafifletecek bir blokzincir modifikasyonu mevcuttur.

Yakın vadede Ethereum, bu sorunla başa çıkmak için iki ek strateji kullanacaktır. İlk olarak, blokzincir tabanlı madencilik algoritmaları nedeniyle, en azından her madenci tam düğüm olmaya zorlanacak ve bu da tam düğüm sayısında bir alt sınır oluşturacaktır. İkinci ve daha da önemlisi, her işlemi işledikten sonra blokzincire bir ara durum ağacı kökü dahil edeceğiz. Blok doğrulama merkezi olsa bile, dürüst bir doğrulayıcı düğüm var olduğu sürece, merkezileşme sorunu bir doğrulama protokolü aracılığıyla aşılabilir. Bir madenci geçersiz bir blok yayınlarsa, o blok ya kötü biçimlendirilmiş olmalıdır ya da `S[n]` durumu yanlıştır. `S[0]`'ın doğru olduğu bilindiğinden, `S[i-1]`'nin doğru olduğu yerde yanlış olan bir ilk `S[i]` durumu olmalıdır. Doğrulayıcı düğüm, `APPLY(S[i-1],TX[i]) -> S[i]`'yı işlemek için gereken Patricia ağacı düğümlerinin alt kümesinden oluşan bir "geçersizlik kanıtı" ile birlikte `i` endeksini sağlayacaktır. Düğümler, hesaplamanın o bölümünü çalıştırmak için bu düğümleri kullanabilecek ve üretilen `S[i]`'nin sağlanan `S[i]` ile eşleşmediğini görebilecektir.

Daha karmaşık bir başka saldırı, kötü niyetli madencilerin eksik bloklar yayınlamasını içerecektir, böylece blokların geçerli olup olmadığını belirlemek için tam bilgi bile mevcut olmaz. Bunun çözümü bir meydan okuma-yanıt (challenge-response) protokolüdür: doğrulama düğümleri hedef işlem endeksleri şeklinde "meydan okumalar" yayınlar ve bir düğüm aldıktan sonra hafif bir düğüm, madenci veya başka bir doğrulayıcı olsun başka bir düğüm geçerlilik kanıtı olarak Patricia düğümlerinin bir alt kümesini sağlayana kadar bloğu güvenilmez olarak ele alır.

## Sonuç {#conclusion}

Ethereum protokolü başlangıçta, son derece genelleştirilmiş bir programlama dili aracılığıyla blokzincir içi emanet, çekim limitleri, finansal sözleşmeler, kumar piyasaları ve benzeri gelişmiş özellikler sunan bir kripto paranın yükseltilmiş bir sürümü olarak tasarlandı. Ethereum protokolü uygulamaların hiçbirini doğrudan "desteklemeyecekti", ancak Turing tam bir programlama dilinin varlığı, teorik olarak herhangi bir işlem türü veya uygulama için isteğe bağlı sözleşmelerin oluşturulabileceği anlamına gelir. Ancak Ethereum ile ilgili daha ilginç olan şey, Ethereum protokolünün sadece bir para birimi olmanın çok ötesine geçmesidir. Merkeziyetsiz dosya depolama, merkeziyetsiz hesaplama ve merkeziyetsiz tahmin piyasaları etrafındaki protokoller, diğer düzinelerce benzer kavramın yanı sıra, bilişim endüstrisinin verimliliğini önemli ölçüde artırma ve ilk kez ekonomik bir katman ekleyerek diğer eşler arası protokollere büyük bir ivme kazandırma potansiyeline sahiptir. Son olarak, para ile hiçbir ilgisi olmayan önemli bir uygulama dizisi de bulunmaktadır.

Ethereum protokolü tarafından uygulandığı şekliyle isteğe bağlı bir durum geçiş işlevi kavramı, benzersiz potansiyele sahip bir platform sağlar; veri depolama, kumar veya finans alanındaki belirli bir uygulama dizisi için tasarlanmış kapalı uçlu, tek amaçlı bir protokol olmak yerine, Ethereum tasarımı gereği açık uçludur ve önümüzdeki yıllarda hem finansal hem de finansal olmayan çok sayıda protokol için temel bir katman olarak hizmet etmeye son derece uygun olduğuna inanıyoruz.

## Notlar ve İleri Okuma {#notes-and-further-reading}

### Notlar {#notes}

1. Bilgili bir okuyucu, aslında bir Bitcoin adresinin açık anahtarın kendisi değil, eliptik eğri açık anahtarının hash'i olduğunu fark edebilir. Ancak, açık anahtar hash'ini açık anahtarın kendisi olarak adlandırmak aslında tamamen geçerli bir kriptografik terminolojidir. Bunun nedeni, Bitcoin'in kriptografisinin özel bir dijital imza algoritması olarak kabul edilebilmesidir; burada açık anahtar ECC açık anahtarının hash'inden oluşur, imza ECC imzası ile birleştirilmiş ECC açık anahtarından oluşur ve doğrulama algoritması, imzadaki ECC açık anahtarını açık anahtar olarak sağlanan ECC açık anahtarı hash'ine karşı kontrol etmeyi ve ardından ECC imzasını ECC açık anahtarına karşı doğrulamayı içerir.
2. Teknik olarak, önceki 11 bloğun medyanı.
3. Dahili olarak, 2 ve "CHARLIE"nin her ikisi de sayıdır ve ikincisi büyük uçlu 256 tabanlı gösterimdedir. Sayılar en az 0 ve en fazla 2<sup>256</sup>-1 olabilir.

### İleri Okuma {#further-reading}

1. [İçsel değer](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Akıllı mülkiyet](https://en.bitcoin.it/wiki/Smart_Property)
3. [Akıllı sözleşmeler](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Yeniden kullanılabilir iş kanıtları](https://nakamotoinstitute.org/finney/rpow/)
6. [Sahip yetkisiyle güvenli mülkiyet tapuları](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Bitcoin tanıtım belgesi](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Zooko üçgeni](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Colored coins tanıtım belgesi](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Mastercoin tanıtım belgesi](https://github.com/mastercoin-MSC/spec)
12. [Merkeziyetsiz otonom şirketler, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Basitleştirilmiş ödeme doğrulaması](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Merkle ağaçları](https://wikipedia.org/wiki/Merkle_tree)
15. [Patricia ağaçları](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ ve Otonom Ajanlar, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Turing Festivali'nde Akıllı Mülkiyet Üzerine Mike Hearn](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](/developers/docs/data-structures-and-encoding/rlp/)
20. [Ethereum Merkle Patricia ağaçları](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Merkle toplam ağaçları üzerine Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Tanıtım belgesinin tarihi için [bu wiki'ye](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/) bakın._

_Ethereum, topluluk odaklı birçok açık kaynaklı yazılım projesi gibi, ilk başlangıcından bu yana gelişti. Ethereum'un en son gelişmeleri ve protokole yönelik değişikliklerin nasıl yapıldığı hakkında bilgi edinmek için [bu rehberi](/learn/) öneriyoruz._