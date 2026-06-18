---
title: ETH'nizi evden stake edin
description: "ETH'nizi evden stake etmeye nasıl başlayacağınıza dair bir genel bakış"
lang: tr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: "Kendi bilgisayar çipinin üzerindeki gergedan Leslie."
sidebarDepth: 2
summaryPoints:
  - Doğrulayıcınızı düzgün çalışır durumda ve çevrimiçi tuttuğunuz için doğrudan protokolden maksimum ödül alın
  - Ev donanımını çalıştırın ve Ethereum ağının güvenliğine ve merkeziyetsizliğine kişisel olarak katkıda bulunun
  - Güven ihtiyacını ortadan kaldırın ve fonlarınızın anahtarlarının kontrolünden asla vazgeçmeyin
---

## Evden staking nedir? {#what-is-solo-staking}

Evden staking, internete bağlı [bir Ethereum düğümü çalıştırma](/run-a-node/) ve bir [doğrulayıcıyı](#faq) etkinleştirmek için 32 ETH yatırma eylemidir; bu da size ağ mutabakatına doğrudan katılma yeteneği verir.

**Evden staking, Ethereum ağının merkeziyetsizliğini artırarak** [Ethereum](/)'u sansüre karşı daha dirençli ve saldırılara karşı daha sağlam hâle getirir. Diğer staking yöntemleri ağa aynı şekilde yardımcı olmayabilir. Evden staking, Ethereum'u güvence altına almak için en iyi staking seçeneğidir.

Bir Ethereum düğümü, hem bir yürütme katmanı (EL) istemcisinden hem de bir mutabakat katmanı (CL) istemcisinden oluşur. Bu istemciler, işlemleri ve blokları doğrulamak, zincirin doğru başını onaylamak, onayları bir araya getirmek ve bloklar önermek için geçerli bir imzalama anahtarları setiyle birlikte çalışan yazılımlardır.

Evden stake edenler, bu istemcileri çalıştırmak için gereken donanımı işletmekten sorumludur. Bunun için evden işlettiğiniz özel bir makine kullanmanız şiddetle tavsiye edilir; bu, ağın sağlığı için son derece faydalıdır.

Evden stake eden biri, doğrulayıcısını düzgün çalışır durumda ve çevrimiçi tuttuğu için doğrudan protokolden ödüller alır.

## Neden evden stake etmelisiniz? {#why-stake-solo}

Evden staking daha fazla sorumluluk getirir ancak fonlarınız ve staking kurulumunuz üzerinde size maksimum kontrol sağlar.

<Grid>
  <Card title="Yeni ETH kazanın" emoji="💸" description="Doğrulayıcınız çevrimiçi olduğunda, aracıların pay almasına gerek kalmadan doğrudan protokolden ETH cinsinden ödüller kazanın." />
  <Card title="Tam kontrol" emoji="🎛️" description="Kendi anahtarlarınızı saklayın. Riskinizi en aza indirmenize ve ağın sağlığına ve güvenliğine en iyi şekilde katkıda bulunmanıza olanak tanıyan istemci ve donanım kombinasyonunu seçin. Üçüncü taraf staking hizmetleri bu kararları sizin yerinize verir ve her zaman en güvenli seçimleri yapmazlar." />
  <Card title="Ağ güvenliği" emoji="🔐" description="Evde staking, stake etmenin en etkili yoludur. Evde kendi donanımınız üzerinde bir doğrulayıcı çalıştırarak Ethereum protokolünün sağlamlığını, merkeziyetsizliğini ve güvenliğini güçlendirirsiniz." />
</Grid>

## Evden staking öncesi dikkat edilmesi gerekenler {#considerations-before-staking-solo}

Evden staking'in herkes için erişilebilir ve risksiz olmasını ne kadar istesek de gerçek bu değildir. ETH'nizi evden stake etmeyi seçmeden önce akılda tutulması gereken bazı pratik ve ciddi hususlar vardır.

<ExpandableCard title="Okunması gerekenler" eventCategory="SoloStaking" eventName="clicked required reading">
Kendi düğümünüzü işletirken, seçtiğiniz yazılımı nasıl kullanacağınızı öğrenmek için biraz zaman harcamalısınız. Bu, ilgili belgeleri okumayı ve bu geliştirici ekiplerinin iletişim kanallarına uyum sağlamayı içerir.

Çalıştırdığınız yazılım ve Hisse Kanıtı'nın (PoS) nasıl çalıştığı hakkında ne kadar çok şey anlarsanız, stake eden biri olarak o kadar az riskli olur ve bir düğüm operatörü olarak yol boyunca ortaya çıkabilecek sorunları düzeltmek o kadar kolay olur.
</ExpandableCard>

<ExpandableCard title="Bilgisayarlara aşinalık" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Yeni araçlar bunu zamanla kolaylaştırsa da düğüm kurulumu, bilgisayarlarla çalışırken makul bir rahatlık seviyesi gerektirir. Komut satırı arayüzünü anlamak faydalıdır ancak artık kesinlikle gerekli değildir.

Ayrıca çok temel bir donanım kurulumu ve önerilen minimum özellikler hakkında biraz anlayış gerektirir.
</ExpandableCard>

<ExpandableCard title="Güvenli anahtar yönetimi" eventCategory="SoloStaking" eventName="clicked secure key management">
Tıpkı özel anahtarların Ethereum adresinizi güvence altına alması gibi, doğrulayıcınız için de özel olarak anahtarlar oluşturmanız gerekecektir. Herhangi bir kurtarma ifadesini veya özel anahtarı nasıl güvende ve emniyette tutacağınızı anlamalısınız.{' '}

[Ethereum güvenliği ve dolandırıcılığı önleme](/security/)
</ExpandableCard>

<ExpandableCard title="Bakım" eventCategory="SoloStaking" eventName="clicked maintenance">
Donanım bazen arızalanır, ağ bağlantıları hata verir ve istemci yazılımının bazen yükseltilmesi gerekir. Düğüm bakımı kaçınılmazdır ve zaman zaman dikkatinizi gerektirecektir. Beklenen herhangi bir ağ yükseltmesinden veya diğer kritik istemci yükseltmelerinden haberdar olduğunuzdan emin olmak isteyeceksiniz.
</ExpandableCard>

<ExpandableCard title="Güvenilir çalışma süresi" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Ödülleriniz, doğrulayıcınızın çevrimiçi olduğu ve düzgün bir şekilde onayladığı süreyle orantılıdır. Kesinti süresi, aynı anda kaç tane diğer doğrulayıcının çevrimdışı olduğuyla orantılı cezalara neden olur, ancak <a href="#faq">ceza kesintisi ile sonuçlanmaz</a>. Zamanında alınmayan onaylar için ödüller azaldığından bant genişliği de önemlidir. Gereksinimler değişecektir, ancak minimum 10 Mb/s indirme ve yükleme önerilir.
</ExpandableCard>

<ExpandableCard title="Kesinti riski" eventCategory="SoloStaking" eventName="clicked slashing risk">
Çevrimdışı olmaktan kaynaklanan hareketsizlik cezalarından farklı olarak, <em>ceza kesintisi (slashing)</em> kötü niyetli suçlar için ayrılmış çok daha ciddi bir cezadır. Anahtarlarınızın aynı anda yalnızca bir makineye yüklendiği bir azınlık istemcisi çalıştırarak, ceza kesintisine uğrama riskiniz en aza indirilir. Bununla birlikte, stake eden herkes ceza kesintisi risklerinin farkında olmalıdır.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Ceza kesintisi ve doğrulayıcı yaşam döngüsü hakkında daha fazlası</a>
</ExpandableCard>

<StakingComparison page="solo" />

## Nasıl çalışır {#how-it-works}

<StakingHowSoloWorks />

Aktifken, periyodik olarak çekim adresinize yatırılacak olan ETH ödülleri kazanacaksınız.

İstenirse, çevrimiçi olma gereksinimini ortadan kaldıran ve daha fazla ödülü durduran bir doğrulayıcı olarak çıkış yapabilirsiniz. Kalan bakiyeniz daha sonra kurulum sırasında belirlediğiniz çekim adresine çekilecektir.

[Staking çekim işlemleri hakkında daha fazlası](/staking/withdrawals/)

## Staking Launchpad'de başlayın {#get-started-on-the-staking-launchpad}

Staking Launchpad, stake eden biri olmanıza yardımcı olacak açık kaynaklı bir uygulamadır. İstemcilerinizi seçme, anahtarlarınızı oluşturma ve ETH'nizi staking depozitosu sözleşmesine yatırma konusunda size rehberlik edecektir. Doğrulayıcınızı güvenli bir şekilde kurmak için her şeyi kapsadığınızdan emin olmanız için bir kontrol listesi sağlanmıştır.

<StakingLaunchpadWidget />

## Düğüm ve istemci kurulum araçlarıyla ilgili nelere dikkat edilmeli {#node-tool-considerations}

ETH'nizi evden stake etmenize yardımcı olacak giderek artan sayıda araç ve hizmet vardır, ancak her biri farklı riskler ve faydalarla birlikte gelir.

Aşağıda, listelenen bir staking aracının sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için özellik göstergeleri kullanılmıştır. Staking yolculuğunuzda size yardımcı olacak araçları seçerken bu özellikleri nasıl tanımladığımıza dair bir referans olarak bu bölümü kullanın.

<StakingConsiderations page="solo" />

## Düğüm ve istemci kurulum araçlarını keşfedin {#node-and-client-tools}

Kurulumunuzda size yardımcı olacak çeşitli seçenekler mevcuttur. Aşağıdaki araçlar konusunda size rehberlik etmesi için yukarıdaki göstergeleri kullanın.

<ProductDisclaimer />

### Düğüm araçları {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Ağın güvenliğini artırdığı ve riskinizi sınırladığı için bir [azınlık istemcisi](/developers/docs/nodes-and-clients/client-diversity/) seçmenin önemini lütfen unutmayın. Azınlık istemcisi kurmanıza olanak tanıyan araçlar <em style={{ textTransform: "uppercase" }}>"çoklu istemci"</em> olarak belirtilmiştir.

### Anahtar Oluşturucular {#key-generators}

Bu araçlar, anahtar oluşturmaya yardımcı olmak için [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/)'ya bir alternatif olarak kullanılabilir.

<StakingProductsCardGrid category="keyGen" />

Gözden kaçırdığımız bir staking aracı için öneriniz mi var? Uygun olup olmadığını görmek ve inceleme için göndermek üzere [ürün listeleme politikamıza](/contributing/adding-staking-products/) göz atın.

## Evden staking rehberlerini keşfedin {#staking-guides}

<StakingGuides />

## Sıkça sorulan sorular {#faq}

Bunlar, staking hakkında bilinmeye değer en yaygın sorulardan birkaçıdır.

<ExpandableCard title="Doğrulayıcı nedir?">

Bir <em>doğrulayıcı</em>, Ethereum üzerinde yaşayan ve Ethereum protokolünün mutabakatına katılan sanal bir varlıktır. Doğrulayıcılar bir bakiye, açık anahtar ve diğer özelliklerle temsil edilir. Bir <em>doğrulayıcı istemcisi</em>, özel anahtarını tutarak ve kullanarak doğrulayıcı adına hareket eden yazılımdır. Tek bir doğrulayıcı istemcisi, birçok doğrulayıcıyı kontrol ederek birçok anahtar çiftini tutabilir.

</ExpandableCard>

<ExpandableCard title="32 ETH'den fazla yatırabilir miyim?">
Evet, modern doğrulayıcı hesapları 2048 ETH'ye kadar tutma kapasitesine sahiptir. 32'nin üzerindeki ek ETH, gerçek bakiyeniz arttıkça tam sayı artışlarıyla kademeli bir şekilde birleşecektir. Bu, <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">etkin bakiye</a>niz olarak bilinir.

Bir hesabın etkin bakiyesini artırmak ve dolayısıyla ödülleri artırmak için, herhangi bir tam ETH eşiğinin üzerinde 0,25 ETH'lik bir tamponun aşılması gerekir. Örneğin, gerçek bakiyesi 32,9 ve etkin bakiyesi 32 olan bir hesabın, etkin bakiyede bir artışı tetiklemeden önce gerçek bakiyesini 33,25'in üzerine çıkarmak için 0,35 ETH daha kazanması gerekir.

Bu tampon ayrıca, mevcut etkin bakiyesinin 0,25 ETH altına düşene kadar etkin bir bakiyenin düşmesini de önler.

Bir doğrulayıcıyla ilişkili her anahtar çiftinin etkinleştirilmesi için en az 32 ETH gerekir. Bunun üzerindeki herhangi bir bakiye, bu adres tarafından imzalanan bir işlem aracılığıyla herhangi bir zamanda ilişkili çekim adresine çekilebilir. Maksimum etkin bakiyenin üzerindeki tüm fonlar periyodik olarak otomatik olarak çekilecektir.

Evden staking sizin için çok zorlayıcı görünüyorsa, bir [hizmet olarak staking](/staking/saas/) sağlayıcısı kullanmayı düşünün veya 32 ETH'den daha azıyla çalışıyorsanız [staking havuzlarına](/staking/pools/) göz atın.
</ExpandableCard>

<ExpandableCard title="Çevrimdışı olursam ceza kesintisine uğrar mıyım? (Özetle: Hayır.)">
Ağ düzgün bir şekilde kesinleşirken çevrimdışı olmak ceza kesintisi ile SONUÇLANMAZ. Doğrulayıcınız belirli bir dönem (her biri 6,4 dakika uzunluğunda) için onay vermeye uygun değilse küçük <em>hareketsizlik cezaları</em> uygulanır, ancak bu <em>ceza kesintisinden</em> çok farklıdır. Bu cezalar, doğrulayıcı onay vermeye uygun olsaydı kazanacağınız ödülden biraz daha azdır ve kayıplar, yaklaşık olarak eşit bir süre tekrar çevrimiçi kalarak geri kazanılabilir.

Hareketsizlik cezalarının, aynı anda kaç doğrulayıcının çevrimdışı olduğuyla orantılı olduğunu unutmayın. Ağın büyük bir bölümünün aynı anda çevrimdışı olduğu durumlarda, bu doğrulayıcıların her biri için cezalar, tek bir doğrulayıcının kullanılamadığı durumlardan daha büyük olacaktır.

Aşırı durumlarda, doğrulayıcıların üçte birinden fazlasının çevrimdışı olması sonucunda ağ kesinleşmeyi durdurursa, bu kullanıcılar çevrimdışı doğrulayıcı hesaplarından üstel bir ETH tükenmesi olan <em>ikinci dereceden hareketsizlik sızıntısı</em> olarak bilinen duruma maruz kalacaklardır. Bu, ağın, bakiyeleri 16 ETH'ye ulaşana kadar aktif olmayan doğrulayıcıların ETH'sini yakarak sonunda kendi kendini iyileştirmesini sağlar ve bu noktada doğrulayıcı havuzundan otomatik olarak çıkarılırlar. Kalan çevrimiçi doğrulayıcılar sonunda ağın 2/3'ünden fazlasını oluşturacak ve zinciri bir kez daha kesinleştirmek için gereken süper çoğunluğu sağlayacaktır.
</ExpandableCard>

<ExpandableCard title="Ceza kesintisine uğramayacağımdan nasıl emin olabilirim?">
Kısacası, bu hiçbir zaman tam olarak garanti edilemez, ancak iyi niyetle hareket ederseniz, bir azınlık istemcisi çalıştırırsanız ve imzalama anahtarlarınızı aynı anda yalnızca bir makinede tutarsanız, ceza kesintisine uğrama riski neredeyse sıfırdır.

Bir doğrulayıcının ceza kesintisine uğramasına ve ağdan atılmasına neden olabilecek yalnızca birkaç belirli yol vardır. Yazının yazıldığı sırada, meydana gelen ceza kesintileri, imzalama anahtarlarının aynı anda iki ayrı makinede depolandığı yedekli donanım kurulumlarının bir ürünü olmuştur. Bu, yanlışlıkla anahtarlarınızdan <em>çifte oy</em> çıkmasına neden olabilir ki bu da ceza kesintisi gerektiren bir suçtur.

Bir süper çoğunluk istemcisi (ağın 2/3'ünden fazlası tarafından kullanılan herhangi bir istemci) çalıştırmak, bu istemcinin bir zincir çatallanmasına neden olan bir hataya sahip olması durumunda potansiyel ceza kesintisi riskini de barındırır. Bu, kesinleşen hatalı bir çatallanma ile sonuçlanabilir. Hedeflenen zincire geri dönmek, kesinleşmiş bir bloğu geri almaya çalışarak bir <em>çevreleme oyu (surround vote)</em> göndermeyi gerektirir. Bu da ceza kesintisi gerektiren bir suçtur ve bunun yerine sadece bir azınlık istemcisi çalıştırılarak önlenebilir.

Bir <em>azınlık istemcisindeki eşdeğer hatalar asla kesinleşmez</em> ve bu nedenle asla bir çevreleme oyu ile sonuçlanmaz ve <em>ceza kesintisi değil</em>, sadece hareketsizlik cezaları ile sonuçlanır.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Bir azınlık istemcisi çalıştırmanın önemi hakkında daha fazla bilgi edinin.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Ceza kesintisini önleme hakkında daha fazla bilgi edinin</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Hangi istemci en iyisidir?">
Bireysel istemciler, her biri çeşitli programlama dilleri kullanılarak farklı ekipler tarafından geliştirildiği için performans ve kullanıcı arayüzü açısından biraz farklılık gösterebilir. Bununla birlikte, hiçbiri "en iyi" değildir. Tüm üretim istemcileri, blokzincir ile eşzamanlama yapmak ve etkileşimde bulunmak için aynı temel işlevleri yerine getiren mükemmel yazılım parçalarıdır.

Tüm üretim istemcileri aynı temel işlevselliği sağladığından, bir <strong>azınlık istemcisi</strong> seçmeniz, yani şu anda ağdaki doğrulayıcıların çoğunluğu tarafından KULLANILMAYAN herhangi bir istemciyi seçmeniz aslında çok önemlidir. Bu kulağa mantıksız gelebilir, ancak bir çoğunluk veya süper çoğunluk istemcisi çalıştırmak, o istemcide bir hata olması durumunda sizi yüksek bir ceza kesintisi riskine sokar. Bir azınlık istemcisi çalıştırmak bu riskleri büyük ölçüde sınırlar.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">İstemci çeşitliliğinin neden kritik olduğu hakkında daha fazla bilgi edinin</a>
</ExpandableCard>

<ExpandableCard title="Sadece bir VPS (sanal özel sunucu) kullanabilir miyim?">
Ev donanımının yerine sanal bir özel sunucu (VPS) kullanılabilse de, doğrulayıcı istemcinizin fiziksel erişimi ve konumu <em>önemlidir</em>. Amazon Web Services veya Digital Ocean gibi merkezi bulut çözümleri, ağı merkezileştirme pahasına donanım edinme ve işletme zorunluluğu olmamasının rahatlığını sağlar.

Tek bir merkezi bulut depolama çözümünde ne kadar çok doğrulayıcı istemcisi çalışırsa, bu kullanıcılar için o kadar tehlikeli hâle gelir. İster bir saldırı, ister düzenleyici talepler veya sadece güç/internet kesintileri yoluyla olsun, bu sağlayıcıları çevrimdışı bırakan herhangi bir olay, bu sunucuya dayanan her doğrulayıcı istemcisinin aynı anda çevrimdışı olmasına neden olacaktır.

Çevrimdışı cezaları, aynı anda kaç kişinin çevrimdışı olduğuyla orantılıdır. Bir VPS kullanmak, çevrimdışı cezalarının daha şiddetli olma riskini büyük ölçüde artırır ve kesintinin yeterince büyük olması durumunda ikinci dereceden sızıntı veya ceza kesintisi riskinizi artırır. Kendi riskinizi ve ağa yönelik riski en aza indirmek için, kullanıcıların kendi donanımlarını edinmeleri ve işletmeleri şiddetle tavsiye edilir.
</ExpandableCard>

<ExpandableCard title="Ödüllerimin kilidini nasıl açarım veya ETH'mi nasıl geri alırım?">

İşaret zincirinden yapılacak her türlü çekim işlemi, çekim kimlik bilgilerinin ayarlanmasını gerektirir.

Yeni stake edenler bunu anahtar oluşturma ve para yatırma sırasında ayarlar. Bunu henüz ayarlamamış olan mevcut staker'lar, bu işlevselliği desteklemek için anahtarlarını yükseltebilirler.

Çekim kimlik bilgileri ayarlandıktan sonra, ödül ödemeleri (ilk 32'nin üzerinde biriken ETH) periyodik olarak otomatik olarak çekim adresine dağıtılacaktır.

Tüm bakiyenizin kilidini açmak ve geri almak için doğrulayıcınızdan çıkış işlemini de tamamlamanız gerekir.

<ButtonLink href="/staking/withdrawals/">Staking çekim işlemleri hakkında daha fazlası</ButtonLink>
</ButtonLink>

## Daha fazla okuma {#further-reading}

- [Ethereum Staking Dizini](https://www.staking.directory/) - _Eridian ve Spacesider_
- [Ethereum'un İstemci Çeşitliliği Sorunu](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [İstemci Çeşitliliğine Yardımcı Olmak](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Ethereum'un mutabakat katmanında istemci çeşitliliği](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Nasıl Yapılır: Ethereum Doğrulayıcı Donanımı Satın Almak](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Eth2 Ceza Kesintisini Önleme İpuçları](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />