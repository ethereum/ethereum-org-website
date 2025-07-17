---
title: ETH'nizi bireysel olarak hisseleyin
description: ETH'nizi solo stake etmeye nasıl başlayacağınıza dair genel bir bakış
lang: tr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Gergedan Leslie bilgisayar çipinin üstünde.
sidebarDepth: 2
summaryPoints:
  - Doğrulayıcınızın düzgün çalışmasını ve çevrimiçi olmasını sağlamak için doğrudan protokolden maksimum ödülleri alın
  - Ev donanımını çalıştırın ve Ethereum ağının güvenliğine ve merkezsizleştirilmesine kişisel olarak katkıda bulunun
  - Güveni ortadan kaldırın ve fonlarınızın anahtarlarının kontrolünü asla bırakmayın
---

## Bireysel hisseleme nedir? {#what-is-solo-staking}

Solo stake etme, internete bağlı [bir Ethereum düğümü çalıştırma](/run-a-node/) ve bir [doğrulayıcıyı](#faq) etkinleştirmek için 32 ETH yatırma işlemidir, size doğrudan ağ konsensüsüne katılma yeteneği verir.

** Bireysel hisseleme Ethereum ağının merkeziyetsizliğini arttırır ** ve Ethereum'un sansüre ve saldırılara karşı dayanıklılığını arttırır. Diğer hisseleme yöntemleri ağa aynı şekillerde yardım etmeyebilir. Solo hisseleme, Ethereum'un güvenliğini sağlamak için en iyi seçenektir.

Bir Ethereum düğümü, hem bir yürütüm katmanı (YK) istemcisinden hem de bir konsensus katmanı (MK) istemcisinden oluşur. Bu istemciler, işlemleri ve blokları doğrulamak, zincirin doğru başını doğrulamak, tasdikleri toplamak ve blok önermek için geçerli bir imza anahtarı seti ile birlikte çalışan yazılımlardır.

Bu istemcileri çalıştırmak için gereken donanımı çalıştırmaktan tek başına pay sahipleri sorumludur. Evden çalıştırdığınız bunun için özel bir makine kullanmanız şiddetle tavsiye edilir – bu, ağın sağlığı için son derece faydalıdır.

Solo staker, doğrulayıcısının düzgün şekilde çalışmasını ve çevrimiçi olmasını sağladığı için doğrudan protokolden ödüller alır.

## Neden solo stake? {#why-stake-solo}

Solo hisseleme daha fazla sorumluluk gerektirmesine rağmen fonlarınız ve hisseleme kurulumunuz üzerinde maksimum kontrol sağlar.

<CardGrid>
  <Card title="Taze ETH kazan" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Tam kontrol" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Ağ güvenliği" emoji="🔐" description="Solo staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Solo staking yapmadan önce dikkate alınması gerekenler {#considerations-before-staking-solo}

Solo staking'in herkes için erişilebilir ve risksiz olmasını dilesek de, bu gerçek değil. ETH'nizi solo stake etmeyi seçmeden önce akılda tutulması gereken bazı pratik ve ciddi hususlar vardır.

<InfoGrid>
<ExpandableCard title="Gerekli okuma" eventCategory="SoloStaking" eventName="clicked required reading">
Kendi düğümünüzü çalıştırırken, seçtiğiniz yazılımı nasıl kullanacağınızı öğrenmek için biraz zaman harcamalısınız. Bu, ilgili belgeleri okumayı ve bu geliştirme ekiplerinin iletişim kanallarına uyum sağlamayı içerir.

Çalıştırdığınız yazılım ve hisse kanıtının nasıl çalıştığı hakkında ne kadar çok şey anlarsanız, bir staker olarak daha az risk almış olacaksınız ve bir düğüm operatörü olarak yol boyunca ortaya çıkabilecek sorunları çözmek de o kadar kolay olacaktır.
</ExpandableCard>

<ExpandableCard title="Bilgisayar konusunda bilgili" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Düğüm kurulumu, bilgisayarlarla çalışırken makul bir rahatlık düzeyi gerektirir, ancak yeni araçlar bunu zamanla daha da kolay hale getirir. Komut satırı arabiriminin anlaşılması yararlıdır, ancak artık kesinlikle gerekli değildir.

Ayrıca, çok temel donanım kurulumu ve önerilen minimum özelliklerin biraz anlaşılmasını gerektirir.
</ExpandableCard>

<ExpandableCard title="Güvenli anahtar yönetimi" eventCategory="SoloStaking" eventName="clicked secure key management">
Tıpkı özel anahtarların Ethereum adresinizi koruduğu gibi, doğrulayıcınız için özel olarak anahtarlar oluşturmanız gerekecektir. Güvenlik kelimelerinizi ve özel anahtarınızı nasıl güvenli tutacağınızı anlamalısınız
</ExpandableCard>

<ExpandableCard title="Bakım" eventCategory="SoloStaking" eventName="clicked maintenance">
Donanım bazen başarısız oluyor, ağ bağlantıları hata veriyor ve istemci yazılımının zaman zaman yükseltilmesi gerekiyor. Düğüm bakımı kaçınılmazdır ve zaman zaman ilgilenmenizi gerektirir. Beklenen ağ yükseltmelerinden veya diğer kritik müşteri yükseltmelerinden haberdar olduğunuzdan emin olmak isteyeceksiniz.
</ExpandableCard>

<ExpandableCard title="Güvenilir çalışma süresi" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Ödülleriniz, doğrulayıcınızın çevrimiçi olduğu ve doğru şekilde tasdik ettiği süre ile orantılıdır. Kapalı kalma süresi, aynı anda kaç doğrulayıcının çevrimdışı olduğuyla orantılı olarak cezalara neden olur, ancak <a href="#faq">slashing ile sonuçlanmaz</a>. Bant genişliği de önemlidir, çünkü zamanında alınmayan onaylar için ödüller azalır. Gereksinimler değişiklik gösterecektir, ancak minimum 10 Mb/sn yukarı ve aşağı önerilir.
</ExpandableCard>

<ExpandableCard title="Cezalandırılma riski" eventCategory="SoloStaking" eventName="clicked slashing risk">
Çevrimdışı olmanın verdiği hareketsizlik cezalarından farklı olarak, <em>kesme</em>, kötü niyetli suçlar için ayrılmış çok daha ciddi bir cezadır. Anahtarlarınız aynı anda yalnızca bir makineye yüklenmiş bir azınlık istemcisi çalıştırarak cezalandırılma riskiniz en aza indirilir. Özetle, bütün stakerlar kesilme risklerini göze almak zorundadır.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">Kesme ve doğrulayıcı döngüsü hakkında daha fazlası </a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Nasıl Çalışır {#how-it-works}

<StakingHowSoloWorks />

Aktif olduğu durumda ETH ödülleri kazanırsınız. Bu ödüller periyodik olarak para çekme adresinize yatırılır.

İstenirse, çevrimiçi olma gereksinimini ortadan kaldıran ve diğer ödülleri durduran bir doğrulayıcı olarak çıkabilirsiniz. Sonrasında kalan bakiyeniz kurulum esnasında belirlediğiniz para çekme adresine aktarılacaktır.

[Hisseleme para çekme işlemleri hakkında daha fazlası](/staking/withdrawals/)

## Hisseleme Başlama Noktası başlangıç rehberi {#get-started-on-the-staking-launchpad}

Staking Launchpad, stake yapmanıza yardımcı olacak açık kaynaklı bir uygulamadır. İstemcilerinizi seçme, anahtarlarınızı oluşturma ve ETH'nizi stake depozito sözleşmesine yatırma konusunda size rehberlik edecektir. Doğrulayıcınızı güvenli bir şekilde kurmak ve her şeyi kapsadığınızdan emin olmak için bir kontrol listesi sağlanmıştır.

<StakingLaunchpadWidget />

## Düğüm ve istemci kurulum araçlarıyla ilgili olarak nelere dikkat edilmelidir {#node-tool-considerations}

ETH'nizi tek başınıza stake etmenize yardımcı olacak, giderek artan sayıda araç ve hizmet var, ancak bunların her biri farklı riskler ve faydalar içeriyor.

Nitelik göstergeleri, listelenen bir stake etme aracının sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için aşağıda kullanılmaktadır. Stake yolculuğunuza yardımcı olacak araçları seçerken bu özellikleri nasıl tanımladığımıza dair bu bölümü referans olarak kullanın.

<StakingConsiderations page="solo" />

## Düğüm ve istemci kurulum araçlarını keşfedin {#node-and-client-tools}

Kurulumunuzda size yardımcı olacak çeşitli seçenekler mevcuttur. Aşağıdaki araçlarda size rehberlik etmesi için yukarıdaki göstergeleri kullanın.

<ProductDisclaimer />

### Düğüm araçları

<StakingProductsCardGrid category="nodeTools" />

Ağın güvenliğini iyileştirdiği ve riskinizi sınırladığı için bir [azınlık istemcisi](/developers/docs/nodes-and-clients/client-diversity/) seçmenin önemini lütfen unutmayın. Azınlık istemcisini kurmanıza olanak tanıyan araçlar, <em style={{ textTransform: "uppercase" }}>"çoklu istemci"</em> olarak anılır.

### Anahtar Üreticileri

Bu araçlar, anahtar oluşturmaya yardımcı olmak için [hisseleme Mevduat CLI'sına](https://github.com/ethereum/staking-deposit-cli/) alternatif olarak kullanılabilir.

<StakingProductsCardGrid category="keyGen" />

Kaçırdığımız bir hisseleme aracı için öneriniz mi var mı? Uygun olup olmadığını görmek ve incelemeye göndermek için [ürün listeleme politikamıza](/contributing/adding-staking-products/) göz atın.

## Solo staking kılavuzlarını keşfet {#staking-guides}

<StakingGuides />

## Sıkça sorulan sorular {#faq}

Bunlar, hisseleme hakkında bilmeye değer en yaygın sorulardan birkaçıdır.

<ExpandableCard title="Doğrulayıcı nedir?">

<em>Doğrulayıcı, </em> Ethereum üzerinde yaşayan sanal bir varlıktır ve Ethereum protokolünün mutabakatına katılır. Doğrulayıcılar bir denge, ortak anahtar ve diğer özelliklerle temsil edilir. Bir <em>doğrulayıcı istemcisi</em>, özel anahtarını tutup kullanarak doğrulayıcı adına hareket eden yazılımdır. Tek bir doğrulayıcı istemcisi, birçok doğrulayıcıyı kontrol ederek birçok anahtar çiftini tutabilir.

</ExpandableCard>

<ExpandableCard title="32 ETH'den fazla yatırabilir miyim?">
Doğrulayıcı ile ilişkili her bir anahtar çiftinin etkinleştirilmesi için tam olarak 32 ETH gerekir. Tek bir anahtar setine daha fazla ETH yatırılması ödül potansiyelini artırmaz çünkü her doğrulayıcı 32 ETH'lik <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">etkili bakiye</a> ile sınırlandırılmıştır. Bu, stake işleminin her biri kendi anahtar ve dengesine sahip 32 ETH artışıyla yapıldığı anlamına gelir.

Tek bir doğrulayıcı için 32 ETH'den fazla para yatırmayın. Ödüllerinizi artırmayacaktır. Eğer doğrulayıcı için bir para çekme adresi ayarlanmışsa, bir sonraki doğrulayıcı taraması sırasında 32 ETH'in üzerindeki fonlar otomatik olarak bu adrese yatırılacaktır.

Solo staking sizin için çok zorlu görünüyorsa, bir <a href="/staking/saas/">servis sağlayıcı</a> kullanmayı düşünün veya 32 ETH'den daha azıyla çalışıyorsanız, <a href="/staking/pools/">stake havuzları</a>na göz atın.
</ExpandableCard>

<ExpandableCard title="Eğer çevrimdışı olursam cezalandırılır mıyım? (tldr: Hayır.)">
Ağ düzgün bir şekilde sonlandırılırken çevrimdışı duruma geçmek, kesintiye neden OLMAZ. Doğrulayıcınız belirli bir dönem için (her biri 6,4 dakika uzunluğunda) kanıtlamak için müsait değilse küçük <em>hareketsizlik cezaları</em> uygulanır, ancak bu <em>kesme</em>den çok farklıdır. Bu cezalar, doğrulayıcının onay vermesi durumunda kazanacağınız ödülden biraz daha azdır ve kayıplar tekrar çevrimiçi durumda yaklaşık olarak eşit bir süre ile geri kazanılabilir.

Hareketsizlik cezalarının aynı anda kaç doğrulayıcının çevrimdışı olduğuyla orantılı olduğunu unutmayın. Ağın büyük bir bölümünün aynı anda çevrimdışı olduğu durumlarda, bu doğrulayıcıların her biri için verilen cezalar, tek bir doğrulayıcının kullanılamadığı duruma göre daha fazla olacaktır.

Aşırı durumlarda, doğrulayıcıların üçte birinden fazlasının çevrimdışı olmasının bir sonucu olarak ağ sonlandırmayı durdurursa, bu kullanıcılar, çevrimdışı doğrulayıcı hesaplarından üstel bir ETH tahliyesi olan <em>kuadratik hareketsizlik sızıntısı</em> olarak bilinen sorunla karşılaşacaklardır. Bu, ağın etkin olmayan doğrulayıcıların ETH'sini bakiyeleri 16 ETH'ye ulaşana kadar yakarak sonunda kendi kendini iyileştirmesini sağlar; bu noktada doğrulayıcı havuzundan otomatik olarak çıkarılırlar. Kalan çevrimiçi doğrulayıcılar, sonunda tekrar ağın 2/3'ünden fazlasını oluşturacak ve zinciri bir kez daha sonlandırmak için gereken süper çoğunluğu karşılayacaktır.
</ExpandableCard>

<ExpandableCard title="Kesik yemeyeceğimden nasıl emin olabilirim?">
Kısacası, bu hiçbir zaman tam olarak garanti edilemez, ancak iyi niyetle hareket ederseniz, bir azınlık istemcisi çalıştırırsanız ve imzalama anahtarlarınızı bir seferde yalnızca bir makinede tutarsanız, kesilme riski neredeyse sıfırdır.

Bir doğrulayıcının ağdan ayrılmasına ve çıkarılmasına neden olabilecek yalnızca birkaç belirli yol vardır. Yazma sırasında, meydana gelen kesikler, yalnızca imzalama anahtarlarının aynı anda iki ayrı makinede depolandığı yedekli donanım kurulumlarının bir ürünüydü. Bu yanlışlıkla anahtarlarınızdan <em>çifte oy</em> almanıza neden olabilir, bu da bölünebilir bir suçtur.

Süper çoğunluklu bir istemciyi çalıştırmak (ağın 2/3'ünden fazlası tarafından kullanılan herhangi bir istemci), bu istemcide zincir çatalıyla sonuçlanan bir hata olması durumunda olası kesinti riskini de taşır. Bu, sonlandırılan hatalı bir çatala neden olabilir. Amaçlanan zincire geri dönmek için, kesinleşmiş bir bloğu geri almaya çalışarak bir <em>çevre oyu</em> göndermeniz gerekir. Bu aynı zamanda cezalandırılabilinir bir suçtur ve bunun yerine bir azınlık istemcisi çalıştırılarak basitçe önlenebilir.

Bir <em>azınlık istemcisindeki eşdeğer hatalar hiçbir zaman kesinleşmeyecek</em> ve dolayısıyla hiçbir zaman bir çevre oylamasıyla sonuçlanmayacak ve yalnızca <em>kesik yeme değil</em> hareketsizlik cezalarıyla sonuçlanacaktır.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Azınlık istemcisi çalıştırmanın önemi hakkında daha fazla bilgi edinin.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Kesilmekten korunma konusunda daha fazla bilgi alın</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Hangi istemci en iyisi?">
Her biri farklı ekipler tarafından çeşitli programlama dilleri kullanılarak geliştirildiğinden, bireysel istemciler performans ve kullanıcı arabirimi açısından biraz farklılık gösterebilir. Bununla birlikte, hiçbiri "en iyi" değildir Tüm üretim müşterileri, blok zinciri ile senkronize etmek ve etkileşim kurmak için hepsi aynı temel işlevleri gerçekleştiren mükemmel yazılım parçalarıdır.

Tüm üretim istemcileri aynı temel işlevi sağladığından, aslında bir <strong>azınlık istemcisi</strong> seçmeniz çok önemlidir; bu, şu anda, ağdaki doğrulayıcıların çoğunluğu tarafından KULLANILMAYAN herhangi bir istemci anlamına gelir. Bu kulağa mantıksız gelebilir, ancak çoğunluk veya üstün çoğunluk istemcisi çalıştırmak, o istemcide bir hata olması durumunda, sizi artan bir kesinti riskine sokar. Bir azınlık istemcisini çalıştırmak bu riskleri büyük ölçüde sınırlar.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">İstemci çeşitliliğinin neden kritik olduğu hakkında daha fazla bilgi edinin</a>
</ExpandableCard>

<ExpandableCard title="VPS (Sanal özel servis) kullanabilir miyim?">
Sanal özel sunucu (VPS) ev donanımının yerine kullanılabilse de, doğrulayıcı istemcinizin fiziksel erişimi ve konumu <em>önemlidir</em>. Amazon Web Services veya Digital Ocean gibi merkezi bulut çözümleri, ağı merkezileştirme pahasına donanım edinme ve çalıştırma zorunluluğunu ortadan kaldırıyor.

Tek bir merkezi bulut depolama çözümü üzerinde çalışan doğrulayıcı istemci sayısı arttıkça, bu kullanıcılar için daha tehlikeli hale gelir. Bu sağlayıcıları bir saldırı, düzenleyici talepler veya yalnızca güç/internet kesintileri nedeniyle çevrimdışına alan herhangi bir olay, bu sunucuya güvenen her doğrulayıcı istemcinin aynı anda çevrimdışı olmasına neden olur.

Çevrimdışı cezalar, aynı anda kaç kişinin çevrimdışı olduğuyla orantılıdır. Bir VPS kullanmak, çevrimdışı cezaların daha şiddetli olması riskini büyük ölçüde artırır ve kesintinin yeterince büyük olması durumunda ikinci dereceden sızıntı veya kesinti riskinizi artırır. Kendi riskinizi ve ağ riskini en aza indirmek için, kullanıcıların kendi donanımlarını edinmeleri ve çalıştırmaları şiddetle tavsiye edilir.
</ExpandableCard>

<ExpandableCard title="Ödüllerimin kilidini nasıl kaldırırım veya ETH'mi nasıl geri alırım?">

İşaret Zincirinden tüm para çekme işlemleri, para çekme bilgilerinin belirlenmiş olmasını gerektirir.

Yeni paydaşlar bunu anahtar üretim ve yatırma zamanında belirler. Henüz bu bilgileri belirlememiş mevcut paydaşlar kendi anahtarlarını güncelleyerek bu işlevi destekleyebilir.

Çekim bilgileri ayarlandığında, ödül ödemeleri (başlangıçtaki 32 adedin üstünde toplananlar) periyodik olarak para çekme adresine otomatik dağıtılacaktır.

Tüm bakiyenizin kilidini kaldırmak ve tamamını almak için aynı zamanda doğrulayıcınızın çıkış sürecini tamamlamanız da gerekir.

<ButtonLink href="/staking/withdrawals/">Hisseleme para çekme işlemleri hakkında daha fazlası</ButtonLink>
</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [Ethereum Hisseleme Dizini](https://www.staking.directory/) - _Eridian ve Spacesider_
- [Ethereum'un İstemci Çeşitliliği Sorunu](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [İstemci Çeşitliliğine Yardımcı Olmak](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Ethereum'un konsensüs katmanında müşteri çeşitliliği](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Nasıl Yapılır: Ethereum Doğrulayıcı Donanımı Satın Alımı](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Adım Adım: Ethereum 2.0 Testnet'e nasıl katılınır](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [Eth2 Slashing Önleme İpuçları](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
