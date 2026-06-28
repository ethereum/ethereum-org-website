---
title: "Maksimum çıkarılabilir değer (MEV)"
description: "Maksimum çıkarılabilir değere (MEV) giriş"
lang: tr
---

Maksimum çıkarılabilir değer (MEV), bir bloktaki işlemlerin dahil edilmesi, hariç tutulması ve sırasının değiştirilmesi yoluyla standart blok ödülü ve gaz ücretlerini aşan, blok üretiminden çıkarılabilecek maksimum değeri ifade eder.

## Maksimum çıkarılabilir değer {#maximal-extractable-value}

Maksimum çıkarılabilir değer ilk olarak [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/) bağlamında uygulandı ve başlangıçta "madenci çıkarılabilir değeri" olarak adlandırıldı. Bunun nedeni, İş Kanıtı'nda madencilerin işlemlerin dahil edilmesini, hariç tutulmasını ve sıralanmasını kontrol etmesidir. Ancak, [Birleşme](/roadmap/merge) yoluyla Hisse Kanıtı'na (PoS) geçişten bu yana doğrulayıcılar bu rollerden sorumlu olmuştur ve madencilik artık [Ethereum](/) protokolünün bir parçası değildir. Yine de değer çıkarma yöntemleri hala mevcuttur, bu nedenle artık bunun yerine "Maksimum çıkarılabilir değer" terimi kullanılmaktadır.

## Ön Koşullar {#prerequisites}

[İşlemler](/developers/docs/transactions/), [bloklar](/developers/docs/blocks/), [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos) ve [gaz](/developers/docs/gas/) konularına aşina olduğunuzdan emin olun. [Merkeziyetsiz uygulamalara (dapp'ler)](/apps/) ve [merkeziyetsiz finansa (DeFi)](/defi/) aşina olmak da faydalı olacaktır.

## MEV çıkarımı {#mev-extraction}

Teoride MEV tamamen doğrulayıcılara tahakkuk eder çünkü kârlı bir MEV fırsatının yürütülmesini garanti edebilecek tek taraf onlardır. Ancak pratikte, MEV'in büyük bir kısmı "arayıcılar" olarak adlandırılan bağımsız ağ katılımcıları tarafından çıkarılır. Arayıcılar, kârlı MEV fırsatlarını tespit etmek için blokzincir verileri üzerinde karmaşık algoritmalar çalıştırır ve bu kârlı işlemleri ağa otomatik olarak göndermek için botlara sahiptir.

Doğrulayıcılar yine de tam MEV miktarının bir kısmını alırlar çünkü arayıcılar, kârlı işlemlerinin bir bloğa dahil edilme olasılığının daha yüksek olması karşılığında yüksek gaz ücretleri (doğrulayıcıya giden) ödemeye isteklidirler. Arayıcıların ekonomik olarak rasyonel olduğu varsayıldığında, bir arayıcının ödemeye istekli olduğu gaz ücreti, arayıcının MEV'inin %100'üne kadar bir miktar olacaktır (çünkü gaz ücreti daha yüksek olsaydı, arayıcı para kaybederdi).

Bununla birlikte, [DEX arbitrajı](#mev-examples-dex-arbitrage) gibi oldukça rekabetçi bazı MEV fırsatları için, arayıcılar toplam MEV gelirlerinin %90'ını veya daha fazlasını doğrulayıcıya gaz ücreti olarak ödemek zorunda kalabilirler çünkü pek çok kişi aynı kârlı arbitraj ticaretini yürütmek ister. Bunun nedeni, arbitraj işlemlerinin yürütülmesini garanti etmenin tek yolunun, işlemi en yüksek gas fiyatı ile göndermeleridir.

### Gaz golfü (Gas golfing) {#mev-extraction-gas-golfing}

Bu dinamik, "gaz golfü" (işlemleri en az miktarda gaz kullanacak şekilde programlamak) konusunda iyi olmayı rekabetçi bir avantaj haline getirmiştir, çünkü arayıcıların toplam gaz ücretlerini sabit tutarken daha yüksek bir gas fiyatı belirlemelerine olanak tanır (çünkü gaz ücretleri = gas fiyatı \* kullanılan gaz).

Bilinen birkaç gaz golfü tekniği şunları içerir: depolamak için daha az yer (ve dolayısıyla gaz) kapladıkları için uzun bir sıfır dizisiyle başlayan adresler kullanmak (örn. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)); ve bir depolama slotunu başlatmak (bakiye 0 ise geçerlidir) bir depolama slotunu güncellemekten daha fazla gaza mal olduğu için sözleşmelerde küçük [ERC-20](/developers/docs/standards/tokens/erc-20/) token bakiyeleri bırakmak. Gaz kullanımını azaltmak için daha fazla teknik bulmak, arayıcılar arasında aktif bir araştırma alanıdır.

### Genelleştirilmiş frontrunner'lar {#mev-extraction-generalized-frontrunners}

Kârlı MEV fırsatlarını tespit etmek için karmaşık algoritmalar programlamak yerine, bazı arayıcılar genelleştirilmiş frontrunner'lar çalıştırır. Genelleştirilmiş frontrunner'lar, kârlı işlemleri tespit etmek için bellek havuzunu izleyen botlardır. Frontrunner, potansiyel olarak kârlı işlemin kodunu kopyalar, adresleri frontrunner'ın adresiyle değiştirir ve değiştirilen işlemin frontrunner'ın adresine kâr sağlayıp sağlamadığını iki kez kontrol etmek için işlemi yerel olarak çalıştırır. İşlem gerçekten kârlıysa, frontrunner değiştirilmiş adrese ve daha yüksek bir gas fiyatına sahip değiştirilmiş işlemi göndererek orijinal işlemin "önüne geçer (frontrunning)" ve orijinal arayıcının MEV'ini alır.

### Flashbots {#mev-extraction-flashbots}

Flashbots, yürütme istemcilerini, arayıcıların MEV işlemlerini halka açık bellek havuzuna ifşa etmeden doğrulayıcılara göndermelerine olanak tanıyan bir hizmetle genişleten bağımsız bir projedir. Bu, işlemlerin genelleştirilmiş frontrunner'lar tarafından öne geçilmesini (frontrun edilmesini) önler.

## MEV örnekleri {#mev-examples}

MEV, blokzincirde birkaç şekilde ortaya çıkar.

### DEX arbitrajı {#mev-examples-dex-arbitrage}

[Merkeziyetsiz borsa](/glossary/#dex) (DEX) arbitrajı, en basit ve en iyi bilinen MEV fırsatıdır. Sonuç olarak, aynı zamanda en rekabetçi olanıdır.

Şu şekilde çalışır: İki DEX bir token'ı iki farklı fiyattan sunuyorsa, birisi token'ı düşük fiyatlı DEX'ten satın alıp yüksek fiyatlı DEX'te tek ve atomik bir işlemle satabilir. Blokzincirin mekaniği sayesinde bu, gerçek ve risksiz bir arbitrajdır.

Bir arayıcının Uniswap ve Sushiswap üzerindeki ETH/DAI çiftinin farklı fiyatlandırmasından yararlanarak 1.000 ETH'yi 1.045 ETH'ye dönüştürdüğü kârlı bir arbitraj işleminin [bir örneğini burada bulabilirsiniz](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4).

### Tasfiyeler {#mev-examples-liquidations}

Borç verme protokolü tasfiyeleri, iyi bilinen bir başka MEV fırsatı sunar.

Maker ve Aave gibi borç verme protokolleri, kullanıcıların bir miktar teminat (örn. ETH) yatırmasını gerektirir. Yatırılan bu teminat daha sonra diğer kullanıcılara borç vermek için kullanılır.

Kullanıcılar daha sonra yatırdıkları teminatın belirli bir yüzdesine kadar ihtiyaçlarına bağlı olarak (örneğin, bir MakerDAO yönetişim teklifinde oy kullanmak istiyorsanız MKR borç alabilirsiniz) başkalarından varlık ve token borç alabilirler. Örneğin, borç alma miktarı maksimum %30 ise, protokole 100 DAI yatıran bir kullanıcı 30 DAI değerinde başka bir varlık borç alabilir. Protokol, kesin borçlanma gücü yüzdesini belirler.

Bir borçlunun teminatının değeri dalgalandıkça, borçlanma gücü de dalgalanır. Piyasa dalgalanmaları nedeniyle, borç alınan varlıkların değeri teminatlarının değerinin örneğin %30'unu aşarsa (yine kesin yüzde protokol tarafından belirlenir), protokol tipik olarak herkesin teminatı tasfiye etmesine izin vererek borç verenlere anında ödeme yapar (bu, geleneksel finansta [teminat tamamlama çağrılarının (margin calls)](https://www.investopedia.com/terms/m/margincall.asp) çalışma şekline benzer). Tasfiye edilirse, borçlu genellikle yüklü bir tasfiye ücreti ödemek zorundadır ve bunun bir kısmı tasfiye memuruna (liquidator) gider; MEV fırsatı da tam bu noktada devreye girer.

Arayıcılar, hangi borçluların tasfiye edilebileceğini belirlemek ve bir tasfiye işlemini ilk gönderen olup tasfiye ücretini kendileri için toplamak amacıyla blokzincir verilerini olabildiğince hızlı ayrıştırmak için rekabet ederler.

### Sandviç ticareti {#mev-examples-sandwich-trading}

Sandviç ticareti, MEV çıkarımının bir başka yaygın yöntemidir.

Sandviç yapmak için bir arayıcı, büyük DEX işlemleri için bellek havuzunu izleyecektir. Örneğin, birinin Uniswap'ta DAI ile 10.000 UNI satın almak istediğini varsayalım. Bu büyüklükteki bir işlemin UNI/DAI çifti üzerinde anlamlı bir etkisi olacak ve potansiyel olarak UNI'nin fiyatını DAI'ye göre önemli ölçüde artıracaktır.

Bir arayıcı, bu büyük işlemin UNI/DAI çifti üzerindeki yaklaşık fiyat etkisini hesaplayabilir ve büyük işlemden hemen _önce_ optimal bir satın alma emri yürüterek UNI'yi ucuza satın alabilir, ardından büyük işlemden hemen _sonra_ bir satış emri yürüterek büyük emrin neden olduğu daha yüksek fiyattan satabilir.

Ancak sandviçleme, (yukarıda açıklanan DEX arbitrajının aksine) atomik olmadığı ve bir [salmonella saldırısına](https://github.com/Defi-Cartel/salmonella) eğilimli olduğu için daha risklidir.

### NFT MEV {#mev-examples-nfts}

NFT alanındaki MEV yeni ortaya çıkan bir olgudur ve her zaman kârlı olması gerekmez.

Ancak, NFT işlemleri diğer tüm Ethereum işlemleri tarafından paylaşılan aynı blokzincirde gerçekleştiğinden, arayıcılar NFT pazarında da geleneksel MEV fırsatlarında kullanılanlara benzer teknikleri kullanabilirler.

Örneğin, popüler bir NFT lansmanı (drop) varsa ve bir arayıcı belirli bir NFT'yi veya NFT setini istiyorsa, NFT'yi satın almak için sırada ilk olacak şekilde bir işlem programlayabilir veya tüm NFT setini tek bir işlemde satın alabilir. Veya bir NFT [yanlışlıkla düşük bir fiyattan listelenirse](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), bir arayıcı diğer alıcıların önüne geçebilir ve onu ucuza kapabilir.

NFT MEV'in öne çıkan bir örneği, bir arayıcının taban fiyattaki her bir Cryptopunk'ı [satın almak](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs) için 7 milyon dolar harcamasıyla meydana geldi. Bir blokzincir araştırmacısı, alıcının satın alımını gizli tutmak için bir MEV sağlayıcısıyla nasıl çalıştığını [Twitter'da açıkladı](https://twitter.com/IvanBogatyy/status/1422232184493121538).

### Uzun kuyruk (The long tail) {#mev-examples-long-tail}

DEX arbitrajı, tasfiyeler ve sandviç ticareti çok iyi bilinen MEV fırsatlarıdır ve yeni arayıcılar için kârlı olmaları pek olası değildir. Bununla birlikte, daha az bilinen MEV fırsatlarından oluşan uzun bir kuyruk vardır (NFT MEV tartışmasız böyle bir fırsattır).

Yeni başlayan arayıcılar, bu daha uzun kuyrukta MEV arayarak daha fazla başarı elde edebilirler. Flashbots'un [MEV iş panosu](https://github.com/flashbots/mev-job-board) ortaya çıkan bazı fırsatları listeler.

## MEV'in Etkileri {#effects-of-mev}

MEV tamamen kötü değildir; Ethereum'da MEV'in hem olumlu hem de olumsuz sonuçları vardır.

### Olumlu yönleri {#effects-of-mev-the-good}

Birçok DeFi projesi, protokollerinin kullanışlılığını ve istikrarını sağlamak için ekonomik olarak rasyonel aktörlere güvenir. Örneğin, DEX arbitrajı, kullanıcıların token'ları için en iyi ve en doğru fiyatları almasını sağlar ve borç verme protokolleri, borç verenlerin geri ödeme almasını sağlamak için borçlular teminatlandırma oranlarının altına düştüğünde hızlı tasfiyelere güvenir.

Ekonomik verimsizlikleri arayan ve düzelten, protokollerin ekonomik teşviklerinden yararlanan rasyonel arayıcılar olmasaydı, DeFi protokolleri ve genel olarak dapp'ler bugünkü kadar sağlam olmayabilirdi.

### Olumsuz yönleri {#effects-of-mev-the-bad}

Uygulama katmanında, sandviç ticareti gibi bazı MEV biçimleri, kullanıcılar için kesinlikle daha kötü bir deneyimle sonuçlanır. Sandviçlenen kullanıcılar, işlemlerinde artan fiyat kayması ve daha kötü yürütme ile karşı karşıya kalırlar.

Ağ katmanında, genelleştirilmiş frontrunner'lar ve sıklıkla dahil oldukları gas fiyatı müzayedeleri (iki veya daha fazla frontrunner'ın kendi işlemlerinin gas fiyatını kademeli olarak artırarak bir sonraki bloğa dahil edilmesi için rekabet etmesi), ağ tıkanıklığına ve normal işlemleri yürütmeye çalışan diğer herkes için yüksek gas fiyatlarına neden olur.

Blokların _içinde_ olup bitenlerin ötesinde, MEV'in bloklar _arasında_ zararlı etkileri olabilir. Bir blokta bulunan MEV standart blok ödülünü önemli ölçüde aşarsa, doğrulayıcılar blokları yeniden düzenlemeye (re-org) ve MEV'i kendileri için ele geçirmeye teşvik edilebilir, bu da blokzincirin yeniden düzenlenmesine ve mutabakat istikrarsızlığına neden olabilir.

Blokzincirin yeniden düzenlenmesi olasılığı [daha önce Bitcoin blokzincirinde araştırılmıştır](https://dl.acm.org/doi/10.1145/2976749.2978408). Bitcoin'in blok ödülü yarıya indikçe ve işlem ücretleri blok ödülünün giderek daha büyük bir bölümünü oluşturdukça, madencilerin bir sonraki bloğun ödülünden vazgeçip bunun yerine geçmiş blokları daha yüksek ücretlerle yeniden kazmalarının ekonomik olarak rasyonel hale geldiği durumlar ortaya çıkar. MEV'in büyümesiyle birlikte, Ethereum'da da benzer bir durum ortaya çıkabilir ve blokzincirin bütünlüğünü tehdit edebilir.

## MEV'in Durumu {#state-of-mev}

MEV çıkarımı 2021'in başlarında balon gibi büyüdü ve yılın ilk birkaç ayında son derece yüksek gas fiyatlarına neden oldu. Flashbots'un MEV rölesinin (relay) ortaya çıkması, genelleştirilmiş frontrunner'ların etkinliğini azalttı ve gas fiyatı müzayedelerini zincir dışına taşıyarak sıradan kullanıcılar için gas fiyatlarını düşürdü.

Birçok arayıcı hala MEV'den iyi para kazanırken, fırsatlar daha iyi bilindikçe ve giderek daha fazla arayıcı aynı fırsat için rekabet ettikçe, doğrulayıcılar toplam MEV gelirinin giderek daha fazlasını ele geçirecektir (çünkü yukarıda orijinal olarak açıklanan aynı tür gas müzayedeleri, özel olarak da olsa Flashbots'ta da gerçekleşir ve doğrulayıcılar ortaya çıkan gas gelirini ele geçirir). MEV ayrıca Ethereum'a özgü değildir ve Ethereum'daki fırsatlar daha rekabetçi hale geldikçe, arayıcılar Ethereum'dakilere benzer MEV fırsatlarının daha az rekabetle var olduğu Binance Smart Chain gibi alternatif blokzincirlere geçmektedir.

Öte yandan, İş Kanıtı'ndan Hisse Kanıtı'na geçiş ve toplamaları kullanarak Ethereum'u ölçeklendirmeye yönelik devam eden çabalar, MEV manzarasını hala biraz belirsiz olan şekillerde değiştirmektedir. Biraz önceden bilinen garantili blok teklifçilerine sahip olmanın, İş Kanıtı'ndaki olasılıksal modele kıyasla MEV çıkarımının dinamiklerini nasıl değiştirdiği veya [tekli gizli lider seçimi (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) ve [dağıtık doğrulayıcı teknolojisi (DVT)](/staking/dvt/) uygulandığında bunun nasıl bozulacağı henüz tam olarak bilinmemektedir. Benzer şekilde, çoğu kullanıcı etkinliği Ethereum'dan uzaklaştırılıp katman 2 (l2) toplamalarına ve parçalarına (shards) taşındığında hangi MEV fırsatlarının var olacağı henüz görülmemiştir.

## Ethereum Hisse Kanıtı'nda (PoS) MEV {#mev-in-ethereum-proof-of-stake}

Açıklandığı gibi, MEV'in genel kullanıcı deneyimi ve mutabakat katmanı güvenliği üzerinde olumsuz etkileri vardır. Ancak Ethereum'un Hisse Kanıtı mutabakatına geçişi ("Birleşme" olarak adlandırılır) potansiyel olarak MEV ile ilgili yeni riskler ortaya çıkarmaktadır:

### Doğrulayıcı merkezileşmesi {#validator-centralization}

Birleşme sonrası Ethereum'da, doğrulayıcılar (32 ETH'lik güvenlik teminatı yatırmış olarak) İşaret zincirine eklenen blokların geçerliliği konusunda mutabakata varırlar. 32 ETH birçok kişinin ulaşamayacağı bir miktar olabileceğinden, [bir staking havuzuna katılmak](/staking/pools/) daha uygulanabilir bir seçenek olabilir. Yine de, doğrulayıcıların merkezileşmesini azalttığı ve Ethereum'un güvenliğini artırdığı için [bireysel staker'ların](/staking/solo/) sağlıklı bir dağılımı idealdir.

Ancak, MEV çıkarımının doğrulayıcı merkezileşmesini hızlandırabileceğine inanılmaktadır. Bunun bir nedeni, doğrulayıcıların [blok teklif etmek için](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) madencilerin daha önce kazandığından daha az kazanması nedeniyle, MEV çıkarımının [Birleşme](/roadmap/merge/)'den bu yana [doğrulayıcı kazançlarını](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb) büyük ölçüde etkilemiş olmasıdır.

Daha büyük staking havuzları, MEV fırsatlarını yakalamak için gerekli optimizasyonlara yatırım yapacak daha fazla kaynağa sahip olacaktır. Bu havuzlar ne kadar çok MEV çıkarırsa, MEV çıkarma yeteneklerini geliştirmek (ve genel geliri artırmak) için o kadar çok kaynağa sahip olurlar ve esasen [ölçek ekonomileri](https://www.investopedia.com/terms/e/economiesofscale.asp#) yaratırlar.

Ellerinde daha az kaynak bulunan bireysel staker'lar MEV fırsatlarından kâr edemeyebilirler. Bu durum, bağımsız doğrulayıcıların kazançlarını artırmak için güçlü staking havuzlarına katılma baskısını artırabilir ve Ethereum'daki merkeziyetsizliği azaltabilir.

### İzinli bellek havuzları {#permissioned-mempools}

Sandviçleme ve önden koşma (frontrunning) saldırılarına yanıt olarak, yatırımcılar işlem gizliliği için doğrulayıcılarla zincir dışı anlaşmalar yapmaya başlayabilir. Yatırımcı, potansiyel bir MEV işlemini halka açık bellek havuzuna göndermek yerine, doğrudan doğrulayıcıya gönderir; doğrulayıcı da bunu bir bloğa dahil eder ve kârı yatırımcıyla paylaşır.

"Karanlık havuzlar (Dark pools)", bu düzenlemenin daha büyük bir versiyonudur ve belirli ücretleri ödemeye istekli kullanıcılara açık, izinli, yalnızca erişime açık bellek havuzları olarak işlev görür. Bu eğilim, Ethereum'un izinsizliğini ve güven gereksinimsizliğini azaltacak ve potansiyel olarak blokzinciri en yüksek teklifi vereni kayıran bir "oynamak için öde (pay-to-play)" mekanizmasına dönüştürecektir.

İzinli bellek havuzları, önceki bölümde açıklanan merkezileşme risklerini de hızlandıracaktır. Birden fazla doğrulayıcı çalıştıran büyük havuzlar, yatırımcılara ve kullanıcılara işlem gizliliği sunmaktan muhtemelen fayda sağlayacak ve MEV gelirlerini artıracaktır.

Birleşme sonrası Ethereum'da MEV ile ilgili bu sorunlarla mücadele etmek temel bir araştırma alanıdır. Bugüne kadar, Birleşme'den sonra MEV'in Ethereum'un merkeziyetsizliği ve güvenliği üzerindeki olumsuz etkisini azaltmak için önerilen iki çözüm [**teklifçi-oluşturucu ayrımı (PBS)**](/roadmap/pbs/) ve [**Builder API**](https://github.com/ethereum/builder-specs)'dir.

### Teklifçi-Oluşturucu Ayrımı {#proposer-builder-separation}

Hem İş Kanıtı'nda hem de Hisse Kanıtı'nda, bir blok oluşturan bir düğüm, onu mutabakata katılan diğer düğümlere zincire eklenmesi için teklif eder. Yeni bir blok, başka bir madenci onun üzerine inşa ettikten sonra (PoW'da) veya doğrulayıcıların çoğunluğundan onaylar (attestations) aldıktan sonra (PoS'ta) kurallı zincirin bir parçası haline gelir.

Blok üreticisi ve blok teklifçisi rollerinin birleşimi, daha önce açıklanan MEV ile ilgili sorunların çoğunu ortaya çıkaran şeydir. Örneğin, mutabakat düğümleri, MEV kazançlarını en üst düzeye çıkarmak için [zaman haydudu (time-bandit) saldırılarında](https://www.mev.wiki/attack-examples/time-bandit-attack) zincir yeniden düzenlemelerini tetiklemeye teşvik edilir.

[Teklifçi-oluşturucu ayrımı](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS), özellikle mutabakat katmanında MEV'in etkisini azaltmak için tasarlanmıştır. PBS'nin en önemli özelliği, blok üreticisi ve blok teklifçisi kurallarının ayrılmasıdır. Doğrulayıcılar hala blokları teklif etmekten ve oylamaktan sorumludur, ancak **blok oluşturucular** adı verilen yeni bir uzmanlaşmış varlık sınıfı, işlemleri sıralamak ve bloklar oluşturmakla görevlendirilmiştir.

PBS altında, bir blok oluşturucu bir işlem paketi oluşturur ve bunun bir İşaret zinciri bloğuna ("yürütme yükü" olarak) dahil edilmesi için bir teklif verir. Bir sonraki bloğu teklif etmek üzere seçilen doğrulayıcı daha sonra farklı teklifleri kontrol eder ve en yüksek ücrete sahip paketi seçer. PBS esasen, oluşturucuların blok alanı satan doğrulayıcılarla pazarlık yaptığı bir müzayede piyasası yaratır.

Mevcut PBS tasarımları, oluşturucuların teklifleriyle birlikte yalnızca bir bloğun içeriğine (blok başlığı) yönelik kriptografik bir taahhüt yayınladığı bir [taahhüt-ifşa (commit-reveal) şeması](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) kullanır. Kazanan teklifi kabul ettikten sonra, teklif edici blok başlığını içeren imzalı bir blok teklifi oluşturur. Blok oluşturucunun, imzalı blok teklifini gördükten sonra tam blok gövdesini yayınlaması beklenir ve kesinleşmiş olmadan önce doğrulayıcılardan yeterli [onay](/glossary/#attestation) alması gerekir.

#### Teklifçi-oluşturucu ayrımı MEV'in etkisini nasıl azaltır? {#how-does-pbs-curb-mev-impact}

Protokol içi teklifçi-oluşturucu ayrımı, MEV çıkarımını doğrulayıcıların yetki alanından çıkararak MEV'in mutabakat üzerindeki etkisini azaltır. Bunun yerine, özel donanım çalıştıran blok oluşturucular bundan sonra MEV fırsatlarını yakalayacaktır.

Ancak bu, doğrulayıcıları MEV ile ilgili gelirden tamamen dışlamaz, çünkü oluşturucular bloklarının doğrulayıcılar tarafından kabul edilmesi için yüksek teklif vermelidir. Yine de, doğrulayıcıların artık doğrudan MEV gelirini optimize etmeye odaklanmamasıyla, zaman haydudu saldırıları tehdidi azalır.

Teklifçi-oluşturucu ayrımı ayrıca MEV'in merkezileşme risklerini de azaltır. Örneğin, bir taahhüt-ifşa şemasının kullanılması, oluşturucuların MEV fırsatını çalmamaları veya diğer oluşturuculara ifşa etmemeleri konusunda doğrulayıcılara güvenme ihtiyacını ortadan kaldırır. Bu, bireysel staker'ların MEV'den faydalanmasının önündeki engeli azaltır, aksi takdirde oluşturucular zincir dışı itibara sahip büyük havuzları kayırma ve onlarla zincir dışı anlaşmalar yapma eğiliminde olacaktır.

Benzer şekilde, ödeme koşulsuz olduğu için doğrulayıcıların, oluşturucuların blok gövdelerini alıkoymayacağına veya geçersiz bloklar yayınlamayacağına güvenmesi gerekmez. Önerilen blok kullanılamıyor olsa veya diğer doğrulayıcılar tarafından geçersiz ilan edilse bile doğrulayıcının ücreti yine de işlenir. İkinci durumda, blok basitçe atılır ve blok oluşturucuyu tüm işlem ücretlerini ve MEV gelirini kaybetmeye zorlar.

### Builder API {#builder-api}

Teklifçi-oluşturucu ayrımı MEV çıkarımının etkilerini azaltmayı vaat etse de, uygulanması mutabakat protokolünde değişiklikler gerektirir. Spesifik olarak, İşaret zincirindeki [çatallanma seçimi](/developers/docs/consensus-mechanisms/pos/#fork-choice) kuralının güncellenmesi gerekecektir. [Builder API](https://github.com/ethereum/builder-specs), daha yüksek güven varsayımlarıyla da olsa, teklifçi-oluşturucu ayrımının çalışan bir uygulamasını sağlamayı amaçlayan geçici bir çözümdür.

Builder API, mutabakat katmanı istemcileri tarafından yürütme katmanı istemcilerinden yürütme yükleri talep etmek için kullanılan [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)'nin değiştirilmiş bir sürümüdür. [Dürüst doğrulayıcı spesifikasyonunda](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md) özetlendiği gibi, blok teklif etme görevleri için seçilen doğrulayıcılar, bağlı bir yürütme istemcisinden bir işlem paketi talep eder ve bunu önerilen İşaret zinciri bloğuna dahil ederler.

Builder API ayrıca doğrulayıcılar ve yürütme katmanı istemcileri arasında bir ara yazılım görevi görür; ancak farklıdır çünkü İşaret zincirindeki doğrulayıcıların (bir yürütme istemcisi kullanarak yerel olarak bir blok oluşturmak yerine) harici varlıklardan bloklar tedarik etmesine olanak tanır.

Aşağıda Builder API'nin nasıl çalıştığına dair bir genel bakış yer almaktadır:

1. Builder API, doğrulayıcıyı yürütme katmanı istemcileri çalıştıran bir blok oluşturucular ağına bağlar. PBS'de olduğu gibi, oluşturucular kaynak yoğun blok oluşturmaya yatırım yapan ve MEV + öncelik bahşişlerinden elde edilen geliri en üst düzeye çıkarmak için farklı stratejiler kullanan uzmanlaşmış taraflardır.

2. Bir doğrulayıcı (bir mutabakat katmanı istemcisi çalıştıran), oluşturucular ağından tekliflerle birlikte yürütme yükleri talep eder. Oluşturuculardan gelen teklifler, yürütme yükü başlığını (yükün içeriğine yönelik kriptografik bir taahhüt) ve doğrulayıcıya ödenecek bir ücreti içerecektir.

3. Doğrulayıcı gelen teklifleri inceler ve en yüksek ücrete sahip yürütme yükünü seçer. Builder API'yi kullanarak, doğrulayıcı yalnızca kendi imzasını ve yürütme yükü başlığını içeren "kör (blinded)" bir İşaret bloğu teklifi oluşturur ve bunu oluşturucuya gönderir.

4. Builder API'yi çalıştıran oluşturucunun, kör blok teklifini gördükten sonra tam yürütme yüküyle yanıt vermesi beklenir. Bu, doğrulayıcının ağ boyunca yaydığı "imzalı" bir İşaret bloğu oluşturmasına olanak tanır.

5. Builder API kullanan bir doğrulayıcının, blok oluşturucunun anında yanıt verememesi durumunda blok teklifi ödüllerini kaçırmaması için yine de yerel olarak bir blok oluşturması beklenir. Ancak doğrulayıcı, artık ortaya çıkan işlemleri veya başka bir seti kullanarak başka bir blok oluşturamaz, çünkü bu, kesinti (slashing) gerektiren bir suç olan _çift imza (equivocation)_ (aynı slot içinde iki bloğu imzalama) anlamına gelir.

Builder API'nin örnek bir uygulaması, Ethereum'da MEV'in negatif dışsallıklarını engellemek için tasarlanmış [Flashbots müzayede mekanizmasının](https://docs.flashbots.net/flashbots-auction/overview) bir geliştirmesi olan [MEV-Boost](https://github.com/flashbots/mev-boost)'tur. Flashbots müzayedesi, Hisse Kanıtı'ndaki doğrulayıcıların kârlı bloklar oluşturma işini **arayıcılar** adı verilen uzmanlaşmış taraflara dış kaynak olarak vermelerine olanak tanır.
![A diagram showing the MEV flow in detail](./mev.png)

Arayıcılar kazançlı MEV fırsatları arar ve bloğa dahil edilmek üzere [kapalı fiyat teklifi](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) ile birlikte blok teklifçilerine işlem paketleri gönderirler. Go Ethereum (Geth) istemcisinin çatallanmış bir versiyonu olan mev-geth'i çalıştıran doğrulayıcının yalnızca en çok kâr getiren paketi seçmesi ve onu yeni bloğun bir parçası olarak dahil etmesi gerekir. Blok teklifçilerini (doğrulayıcıları) spam ve geçersiz işlemlerden korumak için, işlem paketleri teklifçiye ulaşmadan önce doğrulama için **rölelerden (relayers)** geçer.

MEV-Boost, Ethereum'un Hisse Kanıtı'na geçişi için tasarlanmış yeni özelliklerle de olsa, orijinal Flashbots müzayedesinin aynı işleyişini korur. Arayıcılar hala bloklara dahil edilmek üzere kârlı MEV işlemleri bulurlar, ancak **oluşturucular** adı verilen yeni bir uzmanlaşmış taraf sınıfı, işlemleri ve paketleri bloklar halinde toplamaktan sorumludur. Bir oluşturucu, arayıcılardan kapalı fiyat tekliflerini kabul eder ve en kârlı sıralamayı bulmak için optimizasyonlar çalıştırır.

Röle, işlem paketlerini teklifçiye aktarmadan önce doğrulamaktan hala sorumludur. Ancak MEV-Boost, oluşturucular tarafından gönderilen blok gövdelerini ve doğrulayıcılar tarafından gönderilen blok başlıklarını depolayarak [veri kullanılabilirliği](/developers/docs/data-availability/) sağlamaktan sorumlu **emanetçiler (escrows)** sunar. Burada, bir röleye bağlı bir doğrulayıcı, mevcut yürütme yüklerini ister ve en yüksek teklif + MEV bahşişlerine sahip yük başlığını seçmek için MEV-Boost'un sıralama algoritmasını kullanır.

#### Builder API MEV'in etkisini nasıl azaltır? {#how-does-builder-api-curb-mev-impact}

Builder API'nin temel faydası, MEV fırsatlarına erişimi demokratikleştirme potansiyelidir. Taahhüt-ifşa şemalarının kullanılması, güven varsayımlarını ortadan kaldırır ve MEV'den yararlanmak isteyen doğrulayıcılar için giriş engellerini azaltır. Bu, MEV kârlarını artırmak için bireysel staker'ların büyük staking havuzlarıyla entegre olma baskısını azaltmalıdır.

Builder API'nin yaygın olarak uygulanması, blok oluşturucular arasında daha fazla rekabeti teşvik edecek ve bu da sansür direncini artıracaktır. Doğrulayıcılar birden fazla oluşturucudan gelen teklifleri incelerken, bir veya daha fazla kullanıcı işlemini sansürlemeye niyetli bir oluşturucu, başarılı olmak için sansür uygulamayan diğer tüm oluşturuculardan daha yüksek teklif vermelidir. Bu, kullanıcıları sansürlemenin maliyetini önemli ölçüde artırır ve bu uygulamadan caydırır.

MEV-Boost gibi bazı projeler, Builder API'yi, önden koşma/sandviçleme saldırılarından kaçınmaya çalışan yatırımcılar gibi belirli taraflara işlem gizliliği sağlamak için tasarlanmış genel bir yapının parçası olarak kullanır. Bu, kullanıcılar ve blok oluşturucular arasında özel bir iletişim kanalı sağlanarak elde edilir. Daha önce açıklanan izinli bellek havuzlarının aksine, bu yaklaşım aşağıdaki nedenlerden dolayı faydalıdır:

1. Piyasada birden fazla oluşturucunun bulunması sansürü pratik olmaktan çıkarır ve bu da kullanıcılara fayda sağlar. Buna karşılık, merkezi ve güvene dayalı karanlık havuzların varlığı, gücü birkaç blok oluşturucunun elinde toplayacak ve sansür olasılığını artıracaktır.

2. Builder API yazılımı açık kaynaktır ve bu da herkesin blok oluşturucu hizmetleri sunmasına olanak tanır. Bu, kullanıcıların belirli bir blok oluşturucuyu kullanmaya zorlanmadığı anlamına gelir ve Ethereum'un tarafsızlığını ve izinsizliğini geliştirir. Dahası, MEV arayan yatırımcılar özel işlem kanallarını kullanarak yanlışlıkla merkezileşmeye katkıda bulunmayacaklardır.

## İlgili kaynaklar {#related-resources}

- [Flashbots belgeleri](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _MEV-Boost röleleri ve blok oluşturucular için gerçek zamanlı istatistiklere sahip izleyici_

## Daha fazla bilgi {#further-reading}

- [Madenci Çıkarılabilir Değeri (MEV) Nedir?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV ve Ben](https://www.paradigm.xyz/2021/02/mev-and-me)
- [Ethereum Karanlık Bir Ormandır](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Karanlık Ormandan Kaçış](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: MEV Krizinin Önüne Geçmek](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller'ın MEV Konuları](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: Birleşmeye Hazır Flashbots Mimarisi](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [MEV-Boost Nedir?](https://www.alchemy.com/overviews/mev-boost)
- [Neden mev-boost çalıştırılmalı?](https://writings.flashbots.net/writings/why-run-mevboost/)
- [Otostopçunun Ethereum Rehberi](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)