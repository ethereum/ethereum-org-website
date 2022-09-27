---
title: Maksimal çıkarılabilir değer (MEV)
description: Maksimal çıkarılabilir değere (MEV) giriş
lang: tr
---

Maksimal çıkarılabilir değer (MEV), bir bloktaki işlemlerin sırasını dahil ederek, hariç tutarak ve değiştirerek standart blok ödülü ve gaz ücretlerini aşan blok üretiminden elde edilebilecek maksimum değeri ifade eder.

### Madenci çıkarılabilirlik değeri

Bu kavram ilk olarak [iş ispatı](/developers/docs/consensus-mechanisms/pow/) bağlamında uygulandı ve başlangıçta "Madenci çıkarılabilirlik değeri" olarak adlandırıldı. Bunun sebebi, iş ispatında madencilerin katılım, çıkarım ve sıralamayı kontrol etmesidir. Ancak, [Birleştirme](/upgrades/merge) aracılığıyla hisse ispatına geçişten sonra bu rollerden doğrulayıcılar sorumlu olacak ve madencilik artık geçerli olmayacak. Buradaki değer çıkarma yöntemleri, bu geçişten sonra da devam edeceği için bir isim değişikliğine ihtiyaç duyuldu. Süreklilik için aynı kısaltmayı korurken aynı temel anlamı korumak için "maksimal çıkarılabilir değer" artık daha kapsayıcı bir ikame olarak kullanılmaktadır.

## Ön koşullar {#prerequisites}

[İşlemler](/developers/docs/transactions/), [bloklar](/developers/docs/blocks/), [gaz](/developers/docs/gas/) ve [madencilik](/developers/docs/consensus-mechanisms/pow/mining/) hakkında bilgi sahibi olduğunuzdan emin olun. [Dapp'ler](/dapps/) ve [DeFi](/defi/) ile aşina olmak da yardımcı olabilir.

## MEV çıkarma {#mev-extraction}

Teoride MEV, madenciler kârlı bir MEV fırsatının yürütülmesini garanti edebilecek tek taraf oldukları için tamamen madencilere tahakkuk eder (en azından mevcut iş ispatı zincirinde böyle, bu durum [Birleştirme](/upgrades/merge/)'den sonra değişecektir). Ancak pratikte, MEV'in büyük bir kısmı "arayıcılar" olarak bilinen bağımsız ağ katılımcıları tarafından çıkarılır. Arayıcılar kârlı MEV fırsatlarını tespit etmek için blok zinciri verisi üzerinde karmaşık algoritmalar çalıştırırlar ve botların otomatik olarak bu karlı işlemleri ağa göndermesini sağlarlar.

Madenciler tüm MEV miktarının bir kısmını her şekilde alırlar çünkü arayıcılar kârlı işlemlerinin bir bloğa katılımının yüksek ihtimali karşılığında yüksek gaz ücretleri (madencilere giden) ödemeye razılardır. Arayıcıların ekonomik olarak rasyonel olduklarını varsayarsak, bir arayıcının ödemeye razı olduğu gaz ücreti, arayıcının MEV'sinin %100'üne kadar bir miktar olacaktır (çünkü gaz ücreti daha yüksek olsaydı, arayıcı para kaybederdi).

Bununla birlikte, [DEX arbitrajı](#mev-examples-dex-arbitrage) gibi oldukça rekabetçi MEV fırsatları için, arayıcıların toplam MEV gelirlerinin %90'ını veya daha fazlasını madenciye gaz ücretleri olarak ödemek zorundadır, çünkü pek çok insan aynı kârlı arbitraj ticareti yapmak istiyor. Bunun nedeni, arbitraj işlemlerinin devam etmesini garanti etmenin tek yolunun, işlemi en yüksek gaz fiyatıyla sunmak olmasıdır.

### Gaz golfü {#mev-extraction-gas-golfing}

Bu dinamik, "gaz golfü"nde iyi olmayı, yani işlemleri en az miktarda gaz kullanacak şekilde programlamayı bir rekabet avantajı hâline getirdi, çünkü bu, arayıcıların toplam gaz ücretlerini sabit tutarken daha yüksek bir gaz fiyatı belirlemesine olanak tanır (gaz ücretleri = gaz fiyatı \* kullanılan gaz).

Birkaç iyi bilinen gazlı golf tekniği: daha az depolama alanı (ve böylece gaz) harcadıkları için uzun bir sıfır dizisiyle başlayan adresler kullanmak (ör. [0x000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)); bir depolama yuvası başlatmak (bakiye 0 olduğunda gerçekleşen durum), bir depolama yuvasını güncellemekten daha fazla gaza mal olduğu için sözleşmelerde ufak bir [ERC-20](/developers/docs/standards/tokens/erc-20/) token bakiyesi bırakmak. Gaz kullanımını azaltmak için daha fazla teknik bulmak, arayıcılar arasında aktif bir araştırma alanıdır.

### Genelleştirilmiş öncüler (frontrunner) {#mev-extraction-generalized-frontrunners}

Kârlı MEV fırsatlarını tespit etmek için karmaşık algoritmalar programlamaktansa, bazı arayıcılar genelleştirilmiş öncüler kullanırlar. Genelleştirilmiş öncüler, bellek havuzunu kârlı işlemleri tespit etmek için izleyen botlardır. Öncü, kâr potansiyeli olan işlemin kodunu kopyalar, adresleri öncü adresiyle değiştirir ve değiştirilmiş işlemin öncü adresine kâr olarak döndüğünü iki kez kontrol etmek için işlemi yerel olarak çalıştırır. İşlem gerçekten kârlıysa öncü, değiştirilmiş işlemi değiştirilmiş adresle ve daha yüksek bir gaz ücretiyle gönderecektir, yani orijinal işleme "öncülük" yapacak ve orijinal arayıcının MEV'ini alacaktır.

### Flashbotlar {#mev-extraction-flashbots}

Flashbotlar, go-ethereum istemcisini, arama yapanların MEV işlemlerini genel bellek havuzuna açıklamadan madencilere göndermelerine olanak tanıyan bir hizmetle genişleten bağımsız bir projedir. Bu, işlemlere genelleştirilmiş öncüler tarafından öncülük edilmesini önler.

Bu yazım itibariyle, MEV işlemlerinin önemli bir kısmı Flashbotlar aracılığıyla yönlendirildiği için genelleştirilmiş öncüler eskisi kadar etkili değil.

## MEV örnekleri {#mev-examples}

MEV, blok zincirinde birkaç şekilde ortaya çıkar.

### DEX arbitrajı {#mev-examples-dex-arbitrage}

[Merkeziyetsiz borsa](/glossary/#dex) (DEX) arbitraj yapılması en basit ve yaygın MEV fırsatıdır. Bunun sonucu olarak ayrıca en rekabetçi olandır.

Şu şekilde çalışır: İki DEX bir token'ı iki farklı fiyattan sunuyorsa, biri token'ı düşük fiyatlı DEX'te satın alabilir ve tek bir atomik işlemde daha yüksek fiyatlı DEX'te satabilir. Blok zinciri mekanikleri sayesinde, bu gerçek ve risksiz bir arbitraj sağlar.

[Burada](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) bir araştırmacının Uniswap ve Sushiswap'ta ETH/DAI çiftinin farklı fiyatlandırmasından yararlanarak 1.000 ETH'yi 1.045 ETH'ye çevirdiği kârlı bir arbitraj işlemi örneği verilmiştir.

### Likidasyon {#mev-examples-liquidations}

Borç protokolü likidasyonları başka bir yaygın MEV fırsatını sunar.

Maker ve Aave gibi borç protokolleri, kullanıcıların bir tür teminat (örneğin ETH) yatırmasını gerektirerek çalışır. Kullanıcılar daha sonra ihtiyaç duydukları şeye bağlı olarak yatırılan teminatlarının belirli bir miktarı kadar, örneğin %30 (tam borçlanma gücü yüzdesi protokol tarafından belirlenir), diğerlerinden farklı varlıklar ve token'lar ödünç alabilirler (örneğin, bir MakerDAO yönetişim teklifine oy vermek isterlerse MKR; Sushiswap'ta işlem ücretlerinin bir kısmını kazanmak istiyorlarsa SUSHI ödünç alabilirler). Bu durumda diğer token'ları borç aldıkları kullanıcılar, borç veren görevi görürler.

Bir borçlunun teminatı dalgalandıkça, borç alma gücü de azalır. Piyasa dalgalanmaları nedeniyle ödünç alınan varlıkların değeri, teminatlarının değerinin %30'unu aşarsa (yine, kesin yüzde protokol tarafından belirlenir), protokol tipik olarak herkesin teminatı likide etmesine izin vererek borç verenlere anında ödeme yapmasına izin verir (bu, geleneksel finanstaki [teminat çağrılarının](https://www.investopedia.com/terms/m/margincall.asp) işleyişine benzer). Likide edilirse, borçlu genellikle bir kısmı likide eden kişiye giden yüksek bir likidasyon ücreti ödemek zorundadır: MEV fırsatı bu noktada devreye girer.

Arayıcılar, hangi borçluların likide edilebileceğini belirlemek ve bir likidasyon işlemi gönderen ve likidasyon ücretini kendileri için toplayan ilk kişi olmak için blok zinciri verilerini mümkün olduğunca hızlı bir şekilde ayrıştırmak için rekabet eder.

### Sandviç ticareti {#mev-examples-sandwich-trading}

Sandviç ticareti, başka bir yaygın MEV çıkarma yöntemidir.

Arayıcı, sandviçlemek için bellek havuzunda büyük DEX ticaretleri arar. Örneğin, birinin Uniswap üzerinde DAI ile 10.000 UNI satın almak istediğini varsayalım. Bu büyüklükteki bir ticaret, UNI/DAI çifti üzerinde anlamlı bir etkiye sahip olacak ve DAI'ye göre UNI'nin fiyatını potansiyel olarak önemli ölçüde artıracaktır.

Bir arayıcı, bu büyük ticaretin UNI/DAI çifti üzerindeki yaklaşık fiyat etkisini hesaplayabilir ve büyük ticaretten hemen _önce_ bir optimal satın alma emri yürüterek UNI'yi ucuza satın alabilir, ardından büyük ticaretten hemen _sonra_ bir satış emri yürüterek, büyük emirin neden olduğu daha yüksek fiyata satar.

Ancak sandviçleme, atomik olmadığı için daha risklidir (yukarıda açıklandığı gibi DEX arbitrajının aksine) ve bir [salmonella saldırısına](https://github.com/Defi-Cartel/salmonella) açıktır.

### NFT MEV {#mev-examples-nfts}

MEV, NFT dünyası içinde yükselen bir fenomendir ve muhakkak kârlı olmayabilir.

Bununla birlikte NFT işlemleri, diğer tüm Ethereum işlemleri tarafından paylaşılan aynı blok zincirinde gerçekleştiğinden, arayıcılar NFT pazarındaki geleneksel MEV fırsatlarında kullanılanlara benzer teknikleri de kullanabilirler.

Örneğin, popüler bir NFT yayınlanacaksa ve bir arayıcı belirli bir NFT veya NFT seti istiyorsa, NFT'yi satın almak için ilk sırada olacak şekilde bir işlemi programlayabilir veya NFT setinin tamamını tek seferde tek işlemde satın alabilir. Veya bir NFT [hatayla düşük bir fiyata listelenirse](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), bir arayıcı diğer alıcıların önüne geçebilir ve onu ucuza kapabilir.

Önde gelen bir NFT MEV örneği, bir arayıcı her bir Cryptopunk'u taban fiyatta [satın almak](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) için 7 milyon $ harcadığında gerçekleşti. Bir blok zinciri araştırmacısı, [Twitter'da](https://twitter.com/IvanBogatyy/status/1422232184493121538) alıcının satın alım işlemini gizlemek için bir MEV sağlayıcısıyla nasıl çalıştığını açıkladı.

### Uzun kuyruk {#mev-examples-long-tail}

DEX arbitrajı, likidasyonlar ve sandviç ticareti çok iyi bilinen MEV fırsatlarıdır ve yeni arayıcılar için kârlı olmaları pek olası değildir. Bununla birlikte, daha az bilinen MEV fırsatlarından oluşan uzun bir kuyruk bulunur (NFT MEV'in böyle bir fırsat olduğu söylenebilir).

Yeni başlayan arayıcılar, bu uzun kuyrukta MEV'i arayarak daha fazla başarıya erişebilirler. Flashbotların [MEV iş ilanları](https://github.com/flashbots/mev-job-board), bazı yükselen fırsatları listeler.

## MEV'in etkileri {#effects-of-mev}

MEV tamamen kötü değildir: Ethereum üzerinde MEV'in iyi ve kötü sonuçları bulunmaktadır.

### İyi {#effects-of-mev-the-good}

Birçok DeFi projesi, protokollerinin kullanışlılığını ve istikrarını sağlamak için ekonomik olarak rasyonel aktörlere güvenir. Örneğin DEX arbitrajı, kullanıcıların token'ları için en iyi, en doğru fiyatları almalarını sağlar ve borç verme protokolleri, borç verenlere ödeme yapılmasını sağlamak için borç alanlar teminatlandırma oranlarının altına düştüğünde hızlı likidasyonlara dayanır.

Ekonomik verimsizlikleri araştıran ve düzelten ve protokollerin ekonomik teşviklerinden yararlanan rasyonel arayıcılar olmadan, DeFi protokolleri ve genel olarak dapp'ler bugün olduğu kadar sağlam olmayabilirdi.

### Kötü {#effects-of-mev-the-bad}

Uygulama katmanında, sandviç ticareti gibi bazı MEV biçimleri kullanıcılar için kesinlikle daha kötü bir deneyime neden olur. Sandviçlenen kullanıcılar yüksek düşüş ve ticaretlerinde daha kötü yürütme ile karşı karşıya kalırlar.

Ağ katmanında, genelleştirilmiş öncüler ve sıklıkla katıldıkları gaz fiyatı açık artırmaları (iki veya daha fazla öncü, kendi işlemlerinin gaz fiyatını aşamalı olarak yükselterek işlemlerini bir sonraki bloğa dahil etmek için rekabet ettiğinde) normal işlemler yapmaya çalışan herkes için ağ tıkanıklığına ve yüksek gaz fiyatı maliyetine neden olur.

Bloklar _içinde_ gerçekleşenlerin ötesinde MEV, bloklar _arası_ zararlı etkilere sahip olabilir. Bir blokta bulunan MEV, standart blok ödülünü önemli ölçüde aşarsa, madenciler blokları yeniden işlemeye ve MEV'yi kendi adlarına yakalamaya teşvik edilebilir, bu da blok zincirinin yeniden düzenlenmesine ve mutabakat kararsızlığına neden olabilir.

Blok zincirinin yeniden düzenlenmesine yönelik bu ihtimal [geçmişte Bitcoin blok zincirinde incelenmiştir](https://dl.acm.org/doi/10.1145/2976749.2978408). Bitcoin'in blok ödülü yarıları ve işlem ücretleri, blok ödülünün gitgide daha büyük bir bölümünü oluşturduğundan madencilerin bir sonraki bloğun ödülünden vazgeçmesinin ve bunun yerine geçmiş blokları daha yüksek ücretlerle yeniden kazmasının ekonomik olarak rasyonel hâle geldiği durumlar ortaya çıkıyor. MEV'nin büyümesiyle Ethereum'da benzer bir durum meydana gelebilir ve blok zincirinin bütünlüğü tehlikeye girebilir.

## MEV'nin Durumu {#state-of-mev}

MEV çıkarımı 2021'in başlarında balonlanarak yılın ilk birkaç ayında son derece yüksek gaz fiyatlarına neden oldu. Flashbotların MEV rölesinin ortaya çıkması, genelleştirilmiş öncülerin etkinliğini azalttı ve gaz fiyatı açık artırmalarını zincirden çıkararak sıradan kullanıcılar için gaz fiyatlarını düşürdü.

Birçok arayıcı MEV'den hâlâ iyi para kazanırken, fırsatlar bilinir hâle geldikçe ve daha fazla arayıcı aynı fırsat için rekabet ettikçe, madenciler giderek daha fazla toplam MEV geliri elde edecekler (çünkü başlangıçta yukarıda açıklanan türde gaz ihaleleri özel olarak da olsa Flashbotlarda da meydana gelir ve madenciler ortaya çıkan gaz gelirini yakalarlar). MEV ayrıca Ethereum'a özgü değildir ve fırsatlar Ethereum'da daha rekabetçi hâle geldikçe arayıcılar, Ethereum'dakilere benzer MEV fırsatlarının daha az rekabetle mevcut olduğu Binance Smart Chain gibi alternatif blok zincirlerine yöneliyorlar.

DeFi büyüdükçe ve popülaritesi arttıkça, MEV yakında temel Ethereum blok ödülünden önemli ölçüde daha ağır basabilir. Bu, beraberinde artan bir bencil blok kazma ve mutabakat istikrarsızlığı olasılığı geliyor. Bazıları bunun Ethereum için varoluşsal bir tehdit olduğunu düşünüyor ve bencil madencilikten caydırma, Ethereum protokol teorisinde aktif bir araştırma alanı hâlindedir. Şu anda keşfedilen bir çözüm, [MEV ödülü yumuşatmadır](https://ethresear.ch/t/committee-driven-mev-smoothing/10408).

## İlgili kaynaklar {#related-resources}

- [Flashbotlar GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _MEV işlemleri için gösterge paneli ve canlı işlem gezgini_

## Daha fazla okuma {#further-reading}

- [Madenci Çıkarılabilirlik Değeri (MEV) nedir?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV ve Ben](https://research.paradigm.xyz/MEV)
- [Ethereum Karanlık bir Ormandır](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Karanlık Ormandan Kaçış](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbotlar: MEV Krizine Öncülük Etmek](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller'ın MEV Yazıları](https://twitter.com/bertcmiller/status/1402665992422047747)
