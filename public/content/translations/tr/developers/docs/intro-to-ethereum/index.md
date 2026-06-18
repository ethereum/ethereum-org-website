---
title: "Ethereum'a teknik giriş"
description: "Bir merkeziyetsiz uygulama (dapp) geliştiricisinin Ethereum'un temel kavramlarına girişi."
lang: tr
---

## Blokzincir nedir? {#what-is-a-blockchain}

Blokzincir, bir ağdaki birçok bilgisayar arasında güncellenen ve paylaşılan halka açık bir veritabanıdır.

"Blok", verilerin ve durumun "bloklar" olarak bilinen ardışık gruplar halinde saklanmasını ifade eder. Başka birine ETH gönderirseniz, işlemin başarılı olması için işlem verilerinin bir bloğa eklenmesi gerekir.

"Zincir", her bloğun kriptografik olarak kendi ebeveynine referans vermesi gerçeğini ifade eder. Başka bir deyişle, bloklar birbirine zincirlenir. Bir bloktaki veriler, tüm ağın mutabakatını gerektirecek olan sonraki tüm bloklar değiştirilmeden değiştirilemez.

Ağdaki her bilgisayar, her yeni blok ve bir bütün olarak zincir üzerinde anlaşmalıdır. Bu bilgisayarlar "düğüm" olarak bilinir. Düğümler, blokzincir ile etkileşime giren herkesin aynı verilere sahip olmasını sağlar. Bu dağıtık anlaşmayı sağlamak için blokzincirlerin bir mutabakat mekanizmasına ihtiyacı vardır.

[Ethereum](/), [Hisse Kanıtı (PoS) tabanlı bir mutabakat mekanizması](/developers/docs/consensus-mechanisms/pos/) kullanır. Zincire yeni bloklar eklemek isteyen herkes, Ethereum'un yerel para birimi olan ETH'yi teminat olarak stake etmeli ve doğrulayıcı yazılımı çalıştırmalıdır. Bu "doğrulayıcılar" daha sonra diğer doğrulayıcıların kontrol edip blokzincire ekleyeceği blokları önermek üzere rastgele seçilebilir. Katılımcıları dürüst olmaya ve mümkün olduğunca çevrimiçi kalmaya güçlü bir şekilde teşvik eden bir ödül ve ceza sistemi vardır.

Blokzincir verilerinin nasıl özetlendiğini (hash) ve ardından blok referanslarının geçmişine nasıl eklendiğini görmek isterseniz, Anders Brownworth'un [bu demosuna](https://andersbrownworth.com/blockchain/blockchain) göz atmayı ve aşağıdaki ilgili videoyu izlemeyi unutmayın.

Anders'in blokzincirlerdeki özetleri (hash) açıklamasını izleyin:

<VideoWatch slug="blockchain-101-visual-demo" />

## Ethereum nedir? {#what-is-ethereum}

Ethereum, içine bir bilgisayar yerleştirilmiş bir blokzincirdir. Uygulamaları ve organizasyonları merkeziyetsiz, izinsiz ve sansüre dirençli bir şekilde oluşturmanın temelidir.

Ethereum evreninde, Ethereum ağındaki herkesin durumu üzerinde anlaştığı tek ve kurallı bir bilgisayar (Ethereum Sanal Makinesi veya EVM olarak adlandırılır) vardır. Ethereum ağına katılan herkes (her Ethereum düğümü) bu bilgisayarın durumunun bir kopyasını tutar. Ek olarak, herhangi bir katılımcı bu bilgisayarın rastgele hesaplamalar yapması için bir istek yayınlayabilir. Böyle bir istek yayınlandığında, ağdaki diğer katılımcılar hesaplamayı doğrular, onaylar ve gerçekleştirir ("yürütür"). Bu yürütme, EVM'de bir durum değişikliğine neden olur; bu değişiklik taahhüt edilir ve tüm ağa yayılır.

Hesaplama isteklerine işlem istekleri denir; tüm işlemlerin kaydı ve EVM'nin mevcut durumu blokzincirde saklanır, bu da sırasıyla tüm düğümler tarafından saklanır ve üzerinde anlaşmaya varılır.

Kriptografik mekanizmalar, işlemler geçerli olarak doğrulandıktan ve blokzincire eklendikten sonra, daha sonra üzerlerinde oynanamamasını sağlar. Aynı mekanizmalar ayrıca tüm işlemlerin uygun "izinlerle" imzalanmasını ve yürütülmesini sağlar (Alice'in kendisi dışında hiç kimse Alice'in hesabından dijital varlık gönderememelidir).

## Ether nedir? {#what-is-ether}

**Ether (ETH)**, Ethereum'un yerel kripto parasıdır. ETH'nin amacı, hesaplama için bir pazara olanak tanımaktır. Böyle bir pazar, katılımcıların işlem isteklerini doğrulaması ve yürütmesi ile ağa hesaplama kaynakları sağlaması için ekonomik bir teşvik sunar.

Bir işlem isteği yayınlayan herhangi bir katılımcı, ağa ödül olarak bir miktar ETH de sunmalıdır. Ağ, ödülün bir kısmını yakacak ve geri kalanını işlemi doğrulama, yürütme, blokzincire taahhüt etme ve ağa yayınlama işini eninde sonunda yapan kişiye ödül olarak verecektir.

Ödenen ETH miktarı, hesaplamayı yapmak için gereken kaynaklara karşılık gelir. Bu ödüller ayrıca, kötü niyetli katılımcıların sonsuz hesaplama veya diğer kaynak yoğun betiklerin yürütülmesini isteyerek ağı kasıtlı olarak tıkamasını önler, çünkü bu katılımcılar hesaplama kaynakları için ödeme yapmak zorundadır.

ETH ayrıca ağa üç ana yolla kripto-ekonomik güvenlik sağlamak için kullanılır: 1) blok öneren veya diğer doğrulayıcıların dürüst olmayan davranışlarını ifşa eden doğrulayıcıları ödüllendirmek için bir araç olarak kullanılır; 2) Doğrulayıcılar tarafından stake edilir ve dürüst olmayan davranışlara karşı teminat görevi görür; doğrulayıcılar kötü davranmaya çalışırsa ETH'leri yok edilebilir; 3) yeni önerilen bloklar için 'oyları' tartmak amacıyla kullanılır ve mutabakat mekanizmasının çatal seçimi (fork-choice) kısmını besler.

## Akıllı sözleşmeler nedir? {#what-are-smart-contracts}

Uygulamada katılımcılar, EVM'de bir hesaplama talep etmek istediklerinde her seferinde yeni kod yazmazlar. Bunun yerine, uygulama geliştiricileri EVM durumuna programlar (yeniden kullanılabilir kod parçacıkları) yükler ve kullanıcılar bu kod parçacıklarını değişen parametrelerle yürütmek için istekte bulunurlar. Ağa yüklenen ve ağ tarafından yürütülen programlara "akıllı sözleşme" diyoruz.

Çok temel bir düzeyde, bir akıllı sözleşmeyi bir tür otomat makinesi gibi düşünebilirsiniz: belirli parametrelerle çağrıldığında, belirli koşullar yerine getirilirse bazı eylemleri veya hesaplamaları gerçekleştiren bir betik. Örneğin, basit bir satıcı akıllı sözleşmesi, çağıran kişi belirli bir alıcıya ETH gönderirse bir dijital varlık oluşturabilir ve sahipliğini atayabilir.

Herhangi bir geliştirici, ağa ödenen bir ücret karşılığında blokzinciri veri katmanı olarak kullanarak bir akıllı sözleşme oluşturabilir ve bunu ağa açık hale getirebilir. Daha sonra herhangi bir kullanıcı, yine ağa ödenen bir ücret karşılığında kodunu yürütmek için akıllı sözleşmeyi çağırabilir.

Böylece, akıllı sözleşmelerle geliştiriciler, pazar yerleri, finansal araçlar, oyunlar vb. gibi kullanıcıya dönük isteğe bağlı karmaşıklıkta uygulamalar ve hizmetler oluşturabilir ve dağıtabilir.

## Terminoloji {#terminology}

### Blokzincir {#blockchain}

Ağın geçmişinde Ethereum ağına taahhüt edilmiş tüm blokların dizisi. Her blok önceki bloğa bir referans içerdiği için bu şekilde adlandırılmıştır, bu da tüm bloklar (ve dolayısıyla kesin geçmiş) üzerinde bir sıralama sağlamamıza yardımcı olur.

### ETH {#eth}

**Ether (ETH)**, Ethereum'un yerel kripto parasıdır. Kullanıcılar, kod yürütme isteklerinin yerine getirilmesi için diğer kullanıcılara ETH öderler.

[ETH hakkında daha fazlası](/developers/docs/intro-to-ether/)

### EVM {#evm}

Ethereum Sanal Makinesi (EVM), Ethereum ağındaki her katılımcının durumunu sakladığı ve üzerinde anlaştığı küresel sanal bilgisayardır. Herhangi bir katılımcı EVM üzerinde rastgele kod yürütülmesini talep edebilir; kod yürütme EVM'nin durumunu değiştirir.

[EVM hakkında daha fazlası](/developers/docs/evm/)

### Düğümler {#nodes}

EVM durumunu saklayan gerçek hayattaki makineler. Düğümler, EVM durumu ve yeni durum değişiklikleri hakkındaki bilgileri yaymak için birbirleriyle iletişim kurar. Herhangi bir kullanıcı ayrıca bir düğümden kod yürütme isteği yayınlayarak kodun yürütülmesini talep edebilir. Ethereum ağının kendisi, tüm Ethereum düğümlerinin ve iletişimlerinin toplamıdır.

[Düğümler hakkında daha fazlası](/developers/docs/nodes-and-clients/)

### Hesaplar {#accounts}

ETH'nin saklandığı yer. Kullanıcılar hesapları başlatabilir, hesaplara ETH yatırabilir ve hesaplarından diğer kullanıcılara ETH transfer edebilir. Hesaplar ve hesap bakiyeleri EVM'de büyük bir tabloda saklanır; bunlar genel EVM durumunun bir parçasıdır.

[Hesaplar hakkında daha fazlası](/developers/docs/accounts/)

### İşlemler {#transactions}

Bir "işlem isteği", EVM'de kod yürütme isteği için kullanılan resmi terimdir ve bir "işlem", yerine getirilmiş bir işlem isteği ve EVM durumundaki ilişkili değişikliktir. Herhangi bir kullanıcı bir düğümden ağa bir işlem isteği yayınlayabilir. İşlem isteğinin üzerinde anlaşılan EVM durumunu etkilemesi için başka bir düğüm tarafından doğrulanması, yürütülmesi ve "ağa taahhüt edilmesi" gerekir. Herhangi bir kodun yürütülmesi EVM'de bir durum değişikliğine neden olur; taahhüt üzerine bu durum değişikliği ağdaki tüm düğümlere yayınlanır. Bazı işlem örnekleri:

- Hesabımdan Alice'in hesabına X ETH gönder.
- EVM durumuna bir akıllı sözleşme kodu yayınla.
- EVM'de X adresindeki akıllı sözleşmenin kodunu Y argümanlarıyla yürüt.

[İşlemler hakkında daha fazlası](/developers/docs/transactions/)

### Bloklar {#blocks}

İşlem hacmi çok yüksektir, bu nedenle işlemler partiler veya bloklar halinde "taahhüt edilir". Bloklar genellikle düzinelerce ila yüzlerce işlem içerir.

[Bloklar hakkında daha fazlası](/developers/docs/blocks/)

### Akıllı sözleşmeler {#smart-contracts}

Bir geliştiricinin EVM durumuna yayınladığı yeniden kullanılabilir bir kod parçacığı (bir program). Herkes bir işlem isteğinde bulunarak akıllı sözleşme kodunun yürütülmesini talep edebilir. Geliştiriciler akıllı sözleşmeler yayınlayarak EVM'ye isteğe bağlı yürütülebilir uygulamalar (oyunlar, pazar yerleri, finansal araçlar vb.) yazabildikleri için, bunlara genellikle [merkeziyetsiz uygulamalar (dapp)](/developers/docs/dapps/) da denir.

[Akıllı sözleşmeler hakkında daha fazlası](/developers/docs/smart-contracts/)

## Sırada ne var {#where-to-go-next}

Çoğu okuyucu belgeleri sırasıyla takip eder, ancak en kısa yol ne oluşturmaya çalıştığınıza bağlıdır:

- **Ethereum ile etkileşime giren merkeziyetsiz uygulamalar (dapp):** [hesaplar](/developers/docs/accounts/) ve [işlemler](/developers/docs/transactions/), ardından bir [çerçeve (framework)](/developers/docs/frameworks/) seçin.
- **Akıllı sözleşme geliştirme:** [akıllı sözleşmeler](/developers/docs/smart-contracts/) ve [programlama dilleri](/developers/docs/programming-languages/).
- **Düğümler ve staking:** [düğümler ve istemciler](/developers/docs/nodes-and-clients/), ardından [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/).

## Daha fazla okuma {#further-reading}

- [Ethereum Tanıtım Belgesi (Whitepaper)](/whitepaper/)
- [Ethereum nasıl çalışır?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**Not:** Bu kaynak hala değerlidir ancak [Birleşme'den (The Merge)](/roadmap/merge) öncesine ait olduğunu ve bu nedenle hala Ethereum'un İş Kanıtı (PoW) mekanizmasına atıfta bulunduğunu unutmayın - Ethereum aslında artık [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos) kullanılarak güvence altına alınmaktadır)

### Daha çok görsel olarak mı öğreniyorsunuz? {#visual-learner}

Bu video serisi, temel konuların kapsamlı bir incelemesini sunar:

<VideoWatch slug="ethereum-basics-intro" />

[Ethereum Temelleri Oynatma Listesi](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili eğitimler {#related-tutorials}

- [Geliştiriciler için Ethereum rehberi, bölüm 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Python ve web3.py kullanarak Ethereum'un yeni başlayanlar için çok uygun bir incelemesi_