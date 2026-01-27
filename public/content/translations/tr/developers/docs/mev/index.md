---
title: Maksimum çıkarılabilir değer (MEV)
description: Maksimum çıkarılabilir değere (MEV) giriş
lang: tr
---

Maksimal çıkarılabilir değer (MEV), bir bloktaki işlemlerin sırasını dahil ederek, hariç tutarak ve değiştirerek standart blok ödülü ve gaz ücretlerini aşan blok üretiminden elde edilebilecek maksimum değeri ifade eder.

## Maksimum çıkarılabilir değer {#maximal-extractable-value}

Maksimum çıkarılabilir değer, ilk olarak [iş ispatı](/developers/docs/consensus-mechanisms/pow/) bağlamında uygulandı ve başlangıçta "madenci çıkarılabilir değeri" olarak adlandırıldı. Bunun sebebi, iş ispatında katılım, çıkarım ve sıralamayı madencilerin kontrol etmesidir. Ancak [The Merge](/roadmap/merge) aracılığıyla hisse ispatına geçişten bu yana bu rollerden doğrulayıcılar sorumlu olmuştur ve madencilik artık Ethereum protokolünün bir parçası değildir. Ancak değer çıkarım yöntemleri hala mevcuttur, yani artık bunun yerine "Maksimum çıkarılabilir değer" kullanılacaktır.

## Ön Koşullar {#prerequisites}

[İşlemlere](/developers/docs/transactions/), [bloklara](/developers/docs/blocks/), [hisse ispatına](/developers/docs/consensus-mechanisms/pos) ve [gaza](/developers/docs/gas/) aşina olduğunuzdan emin olun. [merkeziyetsiz uygulamalara](/apps/) ve [DeFi'ye](/defi/) aşina olmak da faydalıdır.

## MEV çıkarımı {#mev-extraction}

Teoride MEV, kârlı bir MEV fırsatının yürütülmesini garanti edebilecek tek taraf oldukları için tamamen doğrulayıcılara ilave edilir. Ancak pratikte, MEV'in büyük bir kısmı "arayıcılar" olarak bilinen bağımsız ağ katılımcıları tarafından çıkarılır. Arayıcılar kârlı MEV fırsatlarını tespit etmek için blok zinciri verisi üzerinde karmaşık algoritmalar çalıştırırlar ve botların otomatik olarak bu karlı işlemleri ağa göndermesini sağlarlar.

Doğrulayıcılar tüm MEV miktarının bir kısmını her şekilde alırlar çünkü arayıcılar kârlı işlemlerinin bir bloğa katılımının yüksek ihtimali karşılığında yüksek gaz ücretleri (doğrulayıcılara giden) ödemeye razıdır. Arayıcıların ekonomik olarak rasyonel olduklarını varsayarsak, bir arayıcının ödemeye razı olduğu gaz ücreti, arayıcının MEV'sinin %100'üne kadar bir miktar olacaktır (çünkü gaz ücreti daha yüksek olsaydı, arayıcı para kaybederdi).

Bununla birlikte, [merkeziyetsiz borsa arbitrajı](#mev-examples-dex-arbitrage) gibi oldukça rekabetçi MEV fırsatları için, arayıcıların toplam MEV gelirlerinin %90'ını veya daha fazlasını doğrulayıcıya gaz ücreti olarak ödemesi gerekebilir, çünkü pek çok kişi aynı kârlı arbitraj ticaretini yapmak istemektedir. Bunun nedeni, arbitraj işlemlerinin devam etmesini garanti etmenin tek yolunun, işlemi en yüksek gaz fiyatıyla sunmak olmasıdır.

### Gaz golfü {#mev-extraction-gas-golfing}

Bu dinamik, "gaz golfü"nde iyi olmayı, yani işlemleri en az miktarda gaz kullanacak şekilde programlamayı bir rekabet avantajı hâline getirdi, çünkü bu, arayıcıların toplam gaz ücretlerini sabit tutarken daha yüksek bir gaz fiyatı belirlemesine olanak tanır (gaz ücretleri = gaz fiyatı \* kullanılan gaz).

Birkaç iyi bilinen gaz golfü tekniği şunları içerir: depolamak için daha az yer (ve dolayısıyla gaz) kapladıkları için uzun bir sıfır dizisiyle başlayan adresler kullanmak (ör. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)); ve bir depolama yuvasını başlatmak (bakiye 0 ise durum budur) bir depolama yuvasını güncellemekten daha fazla gaza mal olduğu için sözleşmelerde küçük [ERC-20](/developers/docs/standards/tokens/erc-20/) jeton bakiyeleri bırakmak. Gaz kullanımını azaltmak için daha fazla teknik bulmak, arayıcılar arasında aktif bir araştırma alanıdır.

### Genelleştirilmiş öncüler {#mev-extraction-generalized-frontrunners}

Kârlı MEV fırsatlarını tespit etmek için karmaşık algoritmalar programlamaktansa, bazı arayıcılar genelleştirilmiş öncüler kullanırlar. Genelleştirilmiş öncüler, bellek havuzunu kârlı işlemleri tespit etmek için izleyen botlardır. Öncü, kâr potansiyeli olan işlemin kodunu kopyalar, adresleri öncü adresiyle değiştirir ve değiştirilmiş işlemin öncü adresine kâr olarak döndüğünü iki kez kontrol etmek için işlemi yerel olarak çalıştırır. İşlem gerçekten kârlıysa öncü, değiştirilmiş işlemi değiştirilmiş adresle ve daha yüksek bir gaz ücretiyle gönderecektir, yani orijinal işleme "öncülük" yapacak ve orijinal arayıcının MEV'ini alacaktır.

### Flashbots {#mev-extraction-flashbots}

Flashbot'lar, yürütüm istemcilerini arama yapanların MEV işlemlerini genel bellek havuzuna açıklamadan doğrulayıcılara göndermelerine olanak tanıyan bir hizmetle genişleten bağımsız bir projedir. Bu, işlemlere genelleştirilmiş öncüler tarafından öncülük edilmesini önler.

## MEV örnekleri {#mev-examples}

MEV, blokzincirde birkaç şekilde ortaya çıkar.

### DEX arbitrajı {#mev-examples-dex-arbitrage}

[Merkeziyetsiz borsa](/glossary/#dex) (DEX) arbitrajı, en basit ve en iyi bilinen MEV fırsatıdır. Bunun sonucu olarak ayrıca en rekabetçi olanıdır.

Şu şekilde çalışır: İki merkeziyetsiz borsa bir jetonu iki farklı fiyattan sunuyorsa, biri jetonu düşük fiyatlı merkeziyetsiz borsada satın alabilir ve tek bir atomik işlemde daha yüksek fiyatlı merkeziyetsiz borsada satabilir. Blokzincirin işleme şekli sayesinde bu, gerçek ve risksiz bir arbitrajdır.

[İşte](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) bir arayıcının Uniswap ile Sushiswap'taki ETH/DAI çiftinin farklı fiyatlandırmasından yararlanarak 1.000 ETH'yi 1.045 ETH'ye dönüştürdüğü kârlı bir arbitraj işlemi örneği.

### Tasfiyeler {#mev-examples-liquidations}

Borç protokolü likidasyonları başka bir yaygın MEV fırsatı sunar.

Maker ve Aave gibi borç verme protokolleri, kullanıcıların bir miktar teminat (ör. ETH) yatırmasını gerektirir. Yatırılan bu teminat daha sonra diğer kullanıcılara borç vermek için kullanılır.

Kullanıcılar daha sonra ihtiyaçlarına bağlı olarak (örneğin, bir MakerDAO yönetişim teklifinde oy kullanmak istiyorsanız MKR ödünç alabilirsiniz) yatırdıkları teminatın belirli bir yüzdesine kadar başkalarından varlık ve jeton ödünç alabilirler. Örnek olarak, ödünç miktarı maksimum %30 ise, protokole 100 DAI yatıran bir kullanıcı başka bir varlıktan 30 DAI değerine kadar ödünç alabilir. Tam ödünç gücü yüzdesini protokol belirler.

Bir borçlunun teminatı dalgalandıkça, borç alma gücü de azalır. Piyasa dalgalanmaları nedeniyle, ödünç alınan varlıkların değeri, diyelim ki teminatlarının değerinin %30'unu aşarsa (yine, kesin yüzde protokol tarafından belirlenir), protokol tipik olarak herkesin teminatı tasfiye etmesine ve borç verenlere anında ödeme yapmasına olanak tanır (bu, geleneksel finansta [teminat tamamlama çağrılarının](https://www.investopedia.com/terms/m/margincall.asp) işleyişine benzer). Likide edilirse, borçlu genellikle bir kısmı likide eden kişiye giden yüksek bir likidasyon ücreti ödemek zorundadır: MEV fırsatı bu noktada devreye girer.

Arayıcılar, hangi borçluların likide edilebileceğini belirlemek ve bir likidasyon işlemi gönderen ve likidasyon ücretini kendileri için toplayan ilk kişi olmak için blok zinciri verilerini mümkün olduğunca hızlı bir şekilde ayrıştırmak için rekabet eder.

### Sandviç ticareti {#mev-examples-sandwich-trading}

Sandviç ticareti, başka bir yaygın MEV çıkarma yöntemidir.

Arayıcı, sandviçlemek için bellek havuzunda büyük DEX ticaretleri arar. Örneğin, birinin Uniswap üzerinde DAI ile 10.000 UNI satın almak istediğini varsayalım. Bu büyüklükteki bir ticaret, UNI/DAI çifti üzerinde anlamlı bir etkiye sahip olacak ve DAI'ye göre UNI'nin fiyatını potansiyel olarak önemli ölçüde artıracaktır.

Bir arayıcı, bu büyük işlemin UNI/DAI çifti üzerindeki yaklaşık fiyat etkisini hesaplayabilir ve büyük işlemden hemen _önce_ en uygun alış emrini gerçekleştirerek UNI'yi ucuza alabilir, ardından büyük işlemden hemen _sonra_ bir satış emri gerçekleştirerek büyük emrin neden olduğu daha yüksek fiyattan satabilir.

Ancak sandviçleme, atomik olmadığı için (yukarıda açıklandığı gibi DEX arbitrajının aksine) daha risklidir ve [salmonella saldırısına](https://github.com/Defi-Cartel/salmonella) açıktır.

### NFT MEV'i {#mev-examples-nfts}

MEV, NFT dünyası içinde yükselen bir fenomendir ve muhakkak kârlı olmayabilir.

Bununla birlikte NFT işlemleri, diğer tüm Ethereum işlemleri tarafından paylaşılan aynı blok zincirinde gerçekleştiğinden, arayıcılar NFT pazarındaki geleneksel MEV fırsatlarında kullanılanlara benzer teknikleri de kullanabilirler.

Örneğin, popüler bir NFT yayınlanacaksa ve bir arayıcı belirli bir NFT veya NFT seti istiyorsa, NFT'yi satın almak için ilk sırada olacak şekilde bir işlemi programlayabilir veya NFT setinin tamamını tek seferde tek işlemde satın alabilir. Veya bir NFT [yanlışlıkla düşük bir fiyata listelenirse](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), bir arayıcı diğer alıcıların önüne geçerek (front-run) onu ucuza kapabilir.

NFT MEV'inin öne çıkan bir örneği, bir arayıcının taban fiyattaki her bir Cryptopunk'ı [satın almak](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) için 7 milyon dolar harcadığında meydana geldi. Bir blokzincir araştırmacısı [Twitter'da](https://twitter.com/IvanBogatyy/status/1422232184493121538) alıcının, satın alma işlemini gizli tutmak için bir MEV sağlayıcısıyla nasıl çalıştığını açıkladı.

### Uzun kuyruk {#mev-examples-long-tail}

DEX arbitrajı, likidasyonlar ve sandviç ticareti çok iyi bilinen MEV fırsatlarıdır ve yeni arayıcılar için kârlı olmaları pek olası değildir. Bununla birlikte, daha az bilinen MEV fırsatlarından oluşan uzun bir kuyruk bulunur (NFT MEV'in böyle bir fırsat olduğu söylenebilir).

Yeni başlayan arayıcılar, bu uzun kuyrukta MEV'i arayarak daha fazla başarıya erişebilirler. Flashbot'un [MEV iş ilanı panosu](https://github.com/flashbots/mev-job-board) ortaya çıkan bazı fırsatları listeler.

## MEV'in etkileri {#effects-of-mev}

MEV tamamen kötü değildir: Ethereum üzerinde MEV'in iyi ve kötü sonuçları bulunmaktadır.

### İyi yönleri {#effects-of-mev-the-good}

Birçok DeFi projesi, protokollerinin kullanışlılığını ve istikrarını sağlamak için ekonomik olarak rasyonel aktörlere güvenir. Örneğin DEX arbitrajı, kullanıcıların token'ları için en iyi, en doğru fiyatları almalarını sağlar ve borç verme protokolleri, borç verenlere ödeme yapılmasını sağlamak için borç alanlar teminatlandırma oranlarının altına düştüğünde hızlı likidasyonlara dayanır.

Ekonomik verimsizlikleri araştıran ve düzelten ve protokollerin ekonomik teşviklerinden yararlanan rasyonel arayıcılar olmadan, DeFi protokolleri ve genel olarak dapp'ler bugün olduğu kadar sağlam olmayabilirdi.

### Kötü yönleri {#effects-of-mev-the-bad}

Uygulama katmanında, sandviç ticareti gibi bazı MEV biçimleri kullanıcılar için kesinlikle daha kötü bir deneyime neden olur. Sandviçlenen kullanıcılar yüksek düşüş ve ticaretlerinde daha kötü yürütme ile karşı karşıya kalırlar.

Ağ katmanında, genelleştirilmiş öncüler ve sıklıkla katıldıkları gaz fiyatı açık artırmaları (iki veya daha fazla öncü, kendi işlemlerinin gaz fiyatını aşamalı olarak yükselterek işlemlerini bir sonraki bloğa dahil etmek için rekabet ettiğinde) normal işlemler yapmaya çalışan herkes için ağ tıkanıklığına ve yüksek gaz fiyatı maliyetine neden olur.

Bloklar _içinde_ gerçekleşenlerin ötesinde MEV, bloklar _arası_ zararlı etkilere sahip olabilir. Bir blokta mevcut olan MEV, standart blok ödülünü önemli ölçüde aşarsa, doğrulayıcılar blokları yeniden düzenlemeye ve MEV'yi kendi adlarına yakalamaya teşvik edilebilir, bu da blok zincirinin yeniden düzenlenmesine ve mutabakat kararsızlığına neden olabilir.

Blokzincirin yeniden düzenlenmesi olasılığı [daha önce Bitcoin blokzincirinde araştırılmıştır](https://dl.acm.org/doi/10.1145/2976749.2978408). Bitcoin'in blok ödülü yarıları ve işlem ücretleri, blok ödülünün gitgide daha büyük bir bölümünü oluşturduğundan madencilerin bir sonraki bloğun ödülünden vazgeçmesinin ve bunun yerine geçmiş blokları daha yüksek ücretlerle yeniden kazmasının ekonomik olarak rasyonel hâle geldiği durumlar ortaya çıkıyor. MEV'nin büyümesiyle Ethereum'da benzer bir durum meydana gelebilir ve blok zincirinin bütünlüğü tehlikeye girebilir.

## MEV'in durumu {#state-of-mev}

MEV çıkarımı 2021'in başlarında balonlanarak yılın ilk birkaç ayında son derece yüksek gaz fiyatlarına neden oldu. Flashbots'un MEV rölesinin ortaya çıkması, genelleştirilmiş öncülerin etkinliğini azaltmış ve gaz fiyatı açık artırmalarını zincir dışına taşıyarak sıradan kullanıcılar için gaz fiyatlarını düşürmüştür.

Birçok araştırmacı MEV'den hala iyi para kazanırken, fırsatlar daha iyi bilinir hale geldikçe ve daha fazla araştırmacı aynı fırsat için rekabet ettikçe, madenciler/doğrulayıcılar giderek daha fazla toplam MEV geliri elde edecektir (çünkü başlangıçta yukarıda açıklananla aynı tür gaz açık artırmaları, özel olarak da olsa Flashbot'larda da gerçekleşir ve doğrulayıcılar ortaya çıkan gaz gelirini yakalar). MEV ayrıca Ethereum'a özgü değildir ve fırsatlar Ethereum'da daha rekabetçi hâle geldikçe arayıcılar, Ethereum'dakilere benzer MEV fırsatlarının daha az rekabetle mevcut olduğu Binance Smart Chain gibi alternatif blok zincirlerine yöneliyorlar.

Öte yandan, iş ispatından hisse ispatına geçiş ve Ethereum'u toplamaları kullanarak ölçeklendirmeye yönelik süregelen çabalar, MEV görünümünü halen belirgin olmayan şekillerde değiştirmektedir. Garantili blok önericilerinin biraz önceden bilinmesinin, iş ispatındaki olasılıksal modele kıyasla MEV çıkarımının dinamiklerini nasıl değiştirdiği veya [tek gizli lider seçimi](https://ethresear.ch/t/secret-non-single-leader-election/11789) ve [dağıtılmış doğrulayıcı teknolojisi](/staking/dvt/) uygulandığında bunun nasıl kesintiye uğrayacağı henüz tam olarak bilinmemektedir. Benzer şekilde, hangi MEV fırsatlarının var olduğu, çoğu kullanıcı etkinliği Ethereum'dan uzağa ve katman 2 toplama ve parçalamalarına taşındığında görülecektir.

## Ethereum Hisse İspatı (PoS) Sisteminde MEV {#mev-in-ethereum-proof-of-stake}

Açıklandığı gibi, MEV genel kullanıcı deneyimi ve mutabakat katmanı güvenliği üzerinde negatif etkilere sahiptir. Ancak Ethereum'un bir hisse ispatı mutabakatına geçişi ("Birleşim"), MEV ile ilgili yeni riskler ortaya çıkarabilir:

### Doğrulayıcı merkezileşmesi {#validator-centralization}

Birleşim sonrası Ethereum'da, doğrulayıcılar (32 ETH'lik teminat yatırımları yapan) İşaret Zinciri'ne eklenen blokların doğruluğu hakkında mutabakata varır. 32 ETH birçok kişinin ulaşamayacağı bir miktar olabileceğinden, [bir hisseleme havuzuna katılmak](/staking/pools/) daha uygun bir seçenek olabilir. Bununla birlikte, [tek başına stake edenlerin](/staking/solo/) sağlıklı bir dağılımı idealdir, çünkü bu doğrulayıcıların merkezileşmesini azaltır ve Ethereum'un güvenliğini artırır.

Ancak, MEV çıkarımının doğrulayıcı merkezileşmesini hızlandırabilme kabiliyetine sahip olduğuna inanılmaktadır. Bunun nedeni kısmen, doğrulayıcıların [blok önermek için](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) madencilerden daha az kazanç elde etmesi ve [The Merge](/roadmap/merge/) sonrasında MEV çıkarımının [doğrulayıcı kazançlarını](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) büyük ölçüde etkilemesidir.

Daha büyük paydaşlık havuzları muhtemelen MEV fırsatlarını yakalamak için gerekli optimizasyonlara yatırım yapmak adına daha çok kaynağa sahip olacaktır. Bu havuzlar ne kadar çok MEV çıkarırsa, MEV çıkarma yeteneklerini geliştirmek (ve genel geliri artırmak) için o kadar çok kaynağa sahip olurlar ve bu da esasen [ölçek ekonomileri](https://www.investopedia.com/terms/e/economiesofscale.asp#) yaratır.

Kullanım için daha az kaynak olduğunda, tekil paydaşlar MEV fırsatlarından kâr elde edemeyebilir. Bu, bağımsız doğrulayıcıların kazançlarını artırmak için güçlü paydaş havuzlarına katılmasına yönelik baskıyı artırarak Ethereum'da merkeziyetsizliği düşürebilir.

### İzinli bellek havuzları {#permissioned-mempools}

Sandviç ve önden koşma saldırılarına yanıt olarak, yatırımcılar işlem gizliliği için doğrulayıcılarla zincir dışı anlaşmalar yapmaya başlayabilirler. Tacirler, potansiyel MEV işlemlerini bellek havuzuna göndermek yerine, işlemleri ddoğrudan bunları bloklara işleyen doğrulayıcılara gönderir ve kar paylaşılır.

"Karanlık havuzlar" bu anlaşmanın daha büyük versiyonlarıdır ve bunlar belirli ücretler ödemek isteyen kullanıcılara açık, yetkilendirilmiş, yalnızca erişimi olanlara açık bellek havuzları olarak çalışırlar. Bu trend, Ethereum'un izin ve güven gerektirmezliğini azaltır ve potansiyel olarak blokzinciri en yüksek teklif vereni ödüllendirecek bir "kazanmak-için-öde" mekanizmasına dönüştürür.

İzin gerektiren bellek havuzları, yukarıda bahsedilen merkezileşme risklerini de arttıracaktır. Birden çok doğrulayıcı çalıştıran büyük havuzlar, tacirlere ve kullanıcılara işlem gizliliği sunmaktan büyük olasılıkla kazanç sağlayacak ve MEV gelirlerini artıracaktır.

Birleşim sonrası Ethereum'da MEV ile ilgili bu problemlerle mücadele etmek, temel bir araştırma alanıdır. Bugüne kadar, MEV'nin Ethereum'un merkezsizleşmesi ve The Merge'den sonraki güvenliği üzerindeki olumsuz etkisini azaltmak için önerilen iki çözüm [**Önerici-İnşacı Ayrımı (PBS)**](/roadmap/pbs/) ve [**İnşacı API**](https://github.com/ethereum/builder-specs)'dir.

### Önerici-İnşacı Ayrımı {#proposer-builder-separation}

Hem iş ispatı hem de hisse ispatında bir blok inşa eden düğüm, onu zincire eklenmesi için mutabakata katılan diğer düğümlere önerir. Yeni bir blok başka bir madenci onun üzerine inşa ettiğinde (PoW'da) veya doğrulayıcıların çoğunluğundan tasdik aldığında (PoS'ta) kanonik zincirin parçası olur.

Blok üreticisi ve blok önericisinin rollerinin kombinasyonu, önceden açıklanmış olan MEV ile ilgili sorunların çoğunu ortaya çıkaran şeydir. Örneğin, mutabakat düğümleri, MEV kazançlarını en üst düzeye çıkarmak için [zaman haydutu saldırılarında](https://www.mev.wiki/attack-examples/time-bandit-attack) zincir yeniden düzenlemelerini tetiklemeye teşvik edilir.

[Önerici-inşacı ayrımı](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS), özellikle mutabakat katmanında MEV'in etkisini azaltmak için tasarlanmıştır. PBS'nin ana özelliği, blok üreticisi ile blok önericisi kurallarının ayrımıdır. Doğrulayıcılar hâlâ blok önermekten ve oylamaktan sorumludur, ancak **blok inşacıları** adı verilen yeni bir uzman kuruluş sınıfı, işlemleri sıralamak ve bloklar oluşturmakla görevlidir.

Bir blok inşacısı, PBS altında bir işlem kümesi oluşturur ve bu kümenin bir İşaret Zinciri bloğuna dahil edilmesi için bir teklif sunar ("yürütme yükü" olarak). Sıradaki bloğu önermek için seçilen doğrulayıcı sonrasında farklı teklifleri inceler ve en yüksek ücretli kümeyi seçer. PBS temelde inşacıların blok alanı satan doğrulayıcılar ile pazarlık edeceği bir ihale piyasası oluşturur.

Mevcut PBS tasarımları, inşacıların teklifleriyle birlikte bir bloğun içeriğine (blok başlığı) yalnızca kriptografik bir taahhüt yayınladığı bir [taahhüt-açığa çıkarma şeması](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) kullanır. Kazanan teklifi kabul ettikten sonra, önerici blok başlığını kapsayan imzalı bir blok önerisi oluşturur. Blok inşacısının imzalı blok önerisini gördükten sonra tam blok gövdesini yayınlaması beklenir ve ayrıca kesinleşmeden önce doğrulayıcılardan yeterli sayıda [onay](/glossary/#attestation) alması gerekir.

#### Önerici-inşacı ayrımı MEV'nin etkisini nasıl hafifletir? {#how-does-pbs-curb-mev-impact}

Protokol içi önerici-inşacı ayrımı, MEV çıkarımını doğrulayıcıların sahasından kaldırarak MEV'nin mutabakat üzerindeki etkisini azaltır. Bunun yerine, bundan sonra uzman donanımlar çalıştıran blok inşacıları MEV fırsatlarını yakalayacaktır.

Ancak bu, inşacılar bloklarının doğrulayıcılar tarafından kabul edilmesi için yüksek teklifler vermek zorunda olduğundan doğrulayıcıları MEV ile ilgili gelirlerin tamamen dışında bırakmaz. Buna rağmen, doğrulayıcılar artık doğrudan MEV getirisini optimize etmeye odaklı olmayacağı için zaman hırsızı saldırılarının tehdit düzeyi azalır.

Önerici-inşacı ayrımı ayrıca MEV'nin merkezileşme risklerini de azaltır. Örnek olarak, bir taahhüt etme-açığa çıkarma şemasının kullanımı, inşacıların doğrulayıcılara MEV fırsatını çalmamaları veya diğer inşacılara ifşa etmemeleri için güvenmesi gerekliliğini ortadan kaldırır. Bu, tek başına stake edenlerin MEV'den faydalanmasının önündeki engeli azaltır, aksi takdirde, inşacılar zincir dışı itibara sahip büyük havuzları tercih etme ve onlarla zincir dışı anlaşmalar yapma eğiliminde olurlardı.

Benzer şekilde, ödeme koşulsuz olduğu için doğrulayıcıların da inşacılara blok gövdelerini tutmamaları veya geçersiz bloklar yayımlamamaları için güvenmeye ihtiyaçları yoktur. Önerilen blok kullanılabilir olmasa veya diğer doğrulayıcılar tarafından geçersiz sayılsa bile doğrulayıcının ücreti işlenir. İkinci durumda, blok atılarak blok inşacısının tüm işlem ücretlerini ve MEV getirisini kaybetmesine yol açar.

### İnşacı API'si {#builder-api}

Önerici-inşacı ayrımı MEV'nin etkilerini azaltmayı vaat etse de, bunu uygulamak için mutabakat protokolünün değişmesi gerekir. Spesifik olarak, İşaret Zinciri'ndeki [çatal seçimi](/developers/docs/consensus-mechanisms/pos/#fork-choice) kuralının güncellenmesi gerekir. [İnşacı API'si](https://github.com/ethereum/builder-specs), daha yüksek güven varsayımları olsa da, önerici-inşacı ayrımının çalışan bir uygulamasını sağlamayı amaçlayan geçici bir çözümdür.

İnşacı API'si, mutabakat katmanı istemcileri tarafından yürütme katmanı istemcilerinden yürütme yüklerini istemek için kullanılan [Motor API'sinin](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) değiştirilmiş bir sürümüdür. [Dürüst doğrulayıcı spesifikasyonunda](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md) belirtildiği gibi, blok önerme görevleri için seçilen doğrulayıcılar, bağlı bir yürütme istemcisinden, önerilen İşaret Zinciri bloğuna dahil ettikleri bir işlem paketi talep ederler.

İnşacı API, ayrıca doğrulayıcılar ile yürütme katmanı istemcileri arasında bir ara yazılım görevi görür; ancak İşaret Zinciri'ndeki doğrulayıcıların blokları harici varlık almalarına izin verdiği için farklıdır (bir yürütüm istemcisi kullanarak yerel olarak blok oluşturmak yerine).

İnşacı API'nin çalışma şekline genel bir bakışı aşağıda bulabilirsiniz:

1. İnşacı API, doğrulayıcıyı yürütüm katmanı istemcilerini çalıştıran blok inşacılarının ağına bağlar. PBS'de olduğu gibi, inşacılar kaynak olarak yoğun blok inşasına yatırım yapan ve MEV + öncelik bahşişlerinden gelen geliri maksimize etmek için farklı stratejiler kullanan uzman taraflardır.

2. Bir doğrulayıcı (fikir birliği katmanı istemcisi çalıştıran), inşacı ağından teklifler ile beraber yürütme yükleri ister. İnşacıların teklifleri yürütme yükü başlığını (yükün içeriğine yönelik bir kriptografik taahhüt) ve doğrulayıcıya ödenecek ücreti içerecektir.

3. Doğrulayıcı, gelen teklifleri inceleyecek ve en yüksek ücretli yürütme yükünü seçecektir. Doğrulayıcı, İnşacı API'yi kullanarak sadece kendi imzasını ve yürütme yükü başlığını içeren "kör" bir İşaret bloğu önerisi oluşturur ve inşacıya gönderir.

4. İnşacı API çalıştıran inşacının kör blok önerisini gördüğünde tam yürütme yükü ile cevap vermesi beklenir. Bu, doğrulayıcının ağa yayımlayacağı "imzalı" bir İşaret bloğu oluşturmasını sağlar.

5. İnşacı API kullanan bir doğrulayıcının, blok önerisi ödüllerini kaçırmamak adına blok oluşturucunun hemen yanıt vermemesi durumunda yerel olarak bir blok oluşturması beklenir. Ancak doğrulayıcı, o anda açığa çıkarılan işlemleri veya başka bir seti kullanarak yeni bir blok oluşturamaz çünkü bu, kesme (slashing) ile cezalandırılabilen bir suç olan _yanıltmaca_ (aynı yuvada iki bloğu imzalama) anlamına gelir.

İnşacı API'sinin bir örnek uygulaması, MEV'nin Ethereum üzerindeki olumsuz dışsallıklarını engellemek için tasarlanmış [Flashbots açık artırma mekanizmasında](https://docs.flashbots.net/Flashbots-auction/overview) bir geliştirme olan [MEV Boost](https://github.com/flashbots/mev-boost)'tur. Flashbots açık artırması, hisse ispatındaki doğrulayıcıların kârlı bloklar oluşturma işini **arayıcılar** adı verilen uzman taraflara yaptırmasına olanak tanır.
![MEV akışını ayrıntılı olarak gösteren bir şema](./mev.png)

Arayıcılar kazançlı MEV fırsatlarını arar ve bloğa dahil edilmesi için [kapalı fiyat teklifi](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) ile birlikte blok önerenlere işlem paketleri gönderir. Go-ethereum (Geth) istemcisinin çatallı bir versiyonu olan mev-geth'i çalıştıran doğrulayıcının tek yapması gereken, en fazla kârı sağlayan paketi seçmek ve yeni bloğun bir parçası olacak şekilde eklemektir. Blok önerenlerini (doğrulayıcıları) spam ve geçersiz işlemlerden korumak için, işlem paketleri önerene ulaşmadan önce doğrulama için **aktarıcılardan** geçer.

MEV Boost, Ethereum'un hisse ispatına geçişi için tasarlanmış yeni özellikleri olsa da, başlangıçtaki Flashbotlar açık artırmasıyla aynı işleyişi korur. Arayıcılar hâlâ bloklara dahil etmek için kârlı MEV işlemleri bulur, ancak **inşacılar** adı verilen yeni bir uzman taraf sınıfı, işlemleri ve paketleri bloklar halinde bir araya getirmekten sorumludur. İnşacılar araştırmacıların kapalı fiyat tekliflerini kabul eder ve en kazançlı sıralamayı bulmak için optimizasyon yapar.

Aktarıcı, işlem paketlerini önericiye aktarmadan önce onaylamaktan hala sorumludur. Ancak MEV Boost, inşacılar tarafından gönderilen blok gövdelerini ve doğrulayıcılar tarafından gönderilen blok başlıklarını depolayarak [veri kullanılabilirliği](/developers/docs/data-availability/) sağlamaktan sorumlu **emanetler** sunar. Burada bir aktarıcıya bağlı bir doğrulayıcı, kullanılabilir yürütme yüklerini ister ve en yüksek teklifi + MEV ipuçlarını içeren yük başlığını seçmek için MEV Boost'un sıralama algoritmasını kullanır.

#### İnşacı API MEV'nin etkisini nasıl azaltır? {#how-does-builder-api-curb-mev-impact}

İnşacı API'nin en temel faydası, MEV fırsatlarına erişimi demokratik hale getirme potansiyelidir. Taahhüt etme - açığa çıkarma şemalarını kullanmak, güven varsayımlarını ortadan kaldırır ve MEV'den yararlanmak isteyen doğrulayıcılar için giriş engellerini azaltır. Bu durum, MEV kazançlarını arttırmak için büyük paydaş havuzlarıyla etkileşime giren tekil paydaşlar üzerindeki baskıyı azaltacaktır.

İnşacı API'nin yaygın kullanımı, blok inşacıları arasında daha büyük bir rekabeti beraberinde getirecek ve bu durum, sansüre karşı direnci artıracaktır. Doğrulayıcılar birden çok inşacıdan gelen teklifleri gözden geçirdikçe, bir veya daha fazla kullanıcı işlemini sansürlemeyi amaçlayan inşacıların başarılı olabilmesi için sansür uygulamayan diğer tüm inşacılardan yüksek teklif vermesi gerekecektir. Bu durum, sansür uygulayan kullanıcıların maliyetini ciddi şekilde yükseltir ve sansür uygulanmasına karşı caydırıcı etki oluşturur.

MEV Boost gibi bazı projeler, genelleştirilmiş öncü/sandviç saldırılarından kaçınmaya çalışan tacirler gibi belirli taraflara işlem gizliliği sağlamak için tasarlanmış genel bir yapının parçası olarak İnşacı API'yi kullanır. Bu, kullanıcılar ve blok inşacıları arasında özel bir iletişim kanalı sağlanarak elde edilir. Daha önce bahsedilen izin gerektiren bellek havuzlarından farklı olarak bu bakış açısı aşağıda belirtilen sebeplerden dolayı faydalıdır:

1. Piyasada birden fazla inşacının bulunması sansürü kullanışsız kılar ve bu durum kullanıcılar için faydalıdır. Bunun aksine, merkezi ve güvene dayalı karanlık havuzların varlığı, gücün birkaç blok inşacısının elinde yoğunlaşmasına ve sansür olasılığının artmasına neden olacaktır.

2. İnşacı API yazılımı açık kaynaklıdır ve herkesin blok inşa hizmetleri sunmasına olanak tanır. Bu, kullanıcıların herhangi bir blok inşacısını kullanmaya zorlanmadığı ve Ethereum'un tarafsızlığını ve izin gerektirmezliğini artırdığı anlamına gelir. Üstelik MEV arayışında olan tacirler, özel işlem kanallarını kullanarak istemeden merkezileşmeye katkıda bulunmayacaklardır.

## İlgili kaynaklar {#related-resources}

- [Flashbots belgeleri](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _MEV-Boost röleleri ve blok inşacıları için gerçek zamanlı istatistiklere sahip izleyici_

## Daha fazla kaynak {#further-reading}

- [Madenci Tarafından Çıkarılabilir Değer (MEV) Nedir?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV ve Ben](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum Karanlık Bir Ormandır](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Karanlık Ormandan Kaçış](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: MEV Krizinin Önüne Geçmek](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller'in MEV Başlıkları](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Birleşime Hazır Flashbots Mimarisi](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [MEV Boost Nedir](https://www.alchemy.com/overviews/mev-boost)
- [Neden mev-boost çalıştırmalısınız?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Otostopçunun Ethereum Rehberi](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
