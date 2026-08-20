---
title: ETH'nizi evden stake edin
description: ETH'nizi evden stake etmeye nasıl başlayacağınıza dair genel bir bakış
lang: tr
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - Doğrulayıcınızı düzgün çalışır durumda ve çevrimiçi tutarak doğrudan protokolden maksimum ödül alın
  - Ev donanımını çalıştırın ve Ethereum ağının güvenliğine ve merkeziyetsizliğine kişisel olarak katkıda bulunun
  - Güven varsayımlarını ortadan kaldırın ve fonlarınızın anahtarlarının kontrolünden asla vazgeçmeyin
---

## Evden staking nedir? {#what-is-solo-staking}

Evden staking, internete bağlı [bir Ethereum düğümü çalıştırma](/run-a-node/) ve bir [doğrulayıcıyı](#faq) etkinleştirmek için en az 32 ETH yatırma eylemidir; bu da size ağ mutabakatına doğrudan katılma yeteneği verir.

Evden staking, stake etmenin en doğrudan yoludur. Sizinle protokol arasında hiçbir akıllı sözleşme, operatör veya saklayıcı bulunmaz. Kendi anahtarlarınızı elinizde tutar, [Ethereum](/) ağını doğrulamaya aktif olarak katılır ve ağ ödüllerini doğrudan alırsınız. Diğer tüm staking yöntemleri, bu temel ağ etkinliğinin üzerine teknoloji, ara yazılım veya hizmet katmanları ekler.

**Evden staking, Ethereum ağının merkeziyetsizliğini artırarak** Ethereum'u sansüre karşı daha dirençli ve saldırılara karşı sağlam hâle getirir. Diğer staking yöntemleri ağa aynı şekilde yardımcı olmayabilir. Evden staking, Ethereum'u güvence altına almak için en iyi staking seçeneğidir.

Bir Ethereum düğümü, hem bir yürütme katmanı (EL) istemcisinden hem de bir mutabakat katmanı (CL) istemcisinden oluşur. Bu istemciler, işlemleri ve blokları doğrulamak, zincirin doğru başını onaylamak, onayları bir araya getirmek ve bloklar önermek için geçerli bir imzalama anahtarları setiyle birlikte çalışan yazılımlardır.

Evden stake edenler, bu istemcileri çalıştırmak için gereken donanımı işletmekten sorumludur. Bunun için evden çalıştırdığınız özel bir makine kullanmanız şiddetle tavsiye edilir; bu, ağın sağlığı için son derece faydalıdır.

Evden stake eden biri, doğrulayıcısını düzgün çalışır durumda ve çevrimiçi tuttuğu için doğrudan protokolden ödüller alır.

## Neden evden stake etmelisiniz? {#why-stake-solo}

Evden staking daha fazla sorumluluk getirir ancak fonlarınız ve staking kurulumunuz üzerinde size maksimum kontrol sağlar.

<Grid>
  <Card title="Keep all rewards" icon={<HandCoins />} description="Evden stake edenler, doğrulayıcıları çevrimiçi olduğu sürece doğrudan protokol tarafından ödenen protokol ödüllerinin %100'ünü alırlar." />
  <Card title="Bireysel egemenlik" icon={<KeyRound />} description="Kendi anahtarlarınızı ve fonlarınızın tam velayetini her zaman elinizde tutun. Riskinizi en aza indirmenizi sağlayan istemci ve donanım kombinasyonunu seçin. Hiçbir üçüncü taraf sizin için bu kararları veremez veya çekim işlemlerinizi kısıtlayamaz." />
  <Card title="Client and geographic diversity" icon={<GlobeLock />} description="Birçok konuma yayılmış donanımlarda azınlık istemcileri çalıştıran evden stake edenler, ağın merkeziyetsizliğini ve güvenliğini güçlendirir." />
</Grid>

## Evden stake etmeden önce dikkat edilmesi gerekenler {#considerations-before-staking-solo}

Evden staking'in herkes için erişilebilir ve risksiz olmasını ne kadar istesek de gerçek bu değildir. ETH'nizi evden stake etmeyi seçmeden önce akılda tutulması gereken bazı pratik ve ciddi hususlar vardır.

<ExpandableCard title="Zorunlu okuma" eventCategory="SoloStaking" eventName="clicked required reading">
Kendi düğümünüzü çalıştırırken, seçtiğiniz yazılımı nasıl kullanacağınızı öğrenmek için biraz zaman harcamalısınız. Bu, ilgili belgeleri okumayı ve bu geliştirici ekiplerinin iletişim kanallarına uyum sağlamayı içerir.

Çalıştırdığınız yazılım ve Hisse Kanıtı'nın (PoS) nasıl çalıştığı hakkında ne kadar çok şey anlarsanız, bir staker olarak o kadar az riskli olur ve bir düğüm operatörü olarak yol boyunca ortaya çıkabilecek sorunları düzeltmek o kadar kolaylaşır.
</ExpandableCard>

<ExpandableCard title="Bilgisayarlara aşinalık" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Yeni araçlar zamanla bunu kolaylaştırsa da düğüm kurulumu, bilgisayarlarla çalışırken makul bir rahatlık seviyesi gerektirir. Komut satırı arayüzünü anlamak faydalıdır ancak artık kesinlikle gerekli değildir.

Ayrıca çok temel bir donanım kurulumu ve önerilen minimum özellikler hakkında biraz anlayış gerektirir.
</ExpandableCard>

<ExpandableCard title="Donanım gereksinimleri" eventCategory="SoloStaking" eventName="clicked hardware requirements">
Doğrulayıcı donanımı ve bant genişliği için mevcut topluluk rehberliği, [donanım ve bant genişliği önerilerinde (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) sürdürülmektedir. Kaba bir rehber olarak, 4 TB NVMe SSD, 64 GB RAM (daha azı da çalışabilir ancak önerilen boşluk budur), sağlam ve modern çok çekirdekli bir CPU ve yaklaşık 50 Mbps indirme / 25 Mbps yükleme hızına sahip bir internet bağlantısı planlayın.

Fusaka yükseltmesi PeerDAS'ı tanıttığından beri, bir staking düğümünün ağın blob verilerinin yalnızca bir kısmını depolaması ve indirmesi gerekir; bu da evden stake edenler için disk ve bant genişliği gereksinimlerini önemli ölçüde azaltır.
</ExpandableCard>

<ExpandableCard title="Güvenli anahtar yönetimi" eventCategory="SoloStaking" eventName="clicked secure key management">
Tıpkı özel anahtarların Ethereum adresinizi güvence altına alması gibi, doğrulayıcınız için özel olarak anahtarlar oluşturmanız gerekecektir. Herhangi bir kurtarma ifadesini veya özel anahtarı nasıl güvende ve emniyette tutacağınızı anlamalısınız.{' '}

[Ethereum güvenliği ve dolandırıcılığı önleme](/security/)
</ExpandableCard>

<ExpandableCard title="Bakım" eventCategory="SoloStaking" eventName="clicked maintenance">
Donanım zaman zaman arızalanır, ağ bağlantıları hata verir ve istemci yazılımının zaman zaman yükseltilmesi gerekir. Düğüm bakımı kaçınılmazdır ve zaman zaman dikkatinizi gerektirecektir. Beklenen ağ yükseltmelerinden veya diğer kritik istemci yükseltmelerinden haberdar olduğunuzdan emin olmak isteyeceksiniz.
</ExpandableCard>

<ExpandableCard title="Güvenilir çalışma süresi" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Ödülleriniz, doğrulayıcınızın çevrimiçi olduğu ve düzgün bir şekilde onayladığı süreyle orantılıdır. Kesinti süresi, aynı anda kaç tane diğer doğrulayıcının çevrimdışı olduğuyla orantılı cezalara neden olur ancak [kesinti (slashing) ile sonuçlanmaz](#faq). Zamanında alınmayan onaylar için ödüller azaldığından bant genişliği de önemlidir. Gereksinimler değişebilir ancak mevcut [donanım ve bant genişliği önerileri (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) yaklaşık 50 Mbps indirme ve 25 Mbps yükleme önermektedir.
</ExpandableCard>

<ExpandableCard title="Kesinti riski" eventCategory="SoloStaking" eventName="clicked slashing risk">
Çevrimdışı olmaktan kaynaklanan hareketsizlik cezalarından farklı olarak <em>kesinti (slashing)</em>, kötü niyetli suçlar için ayrılmış çok daha ciddi bir cezadır. Anahtarlarınızın aynı anda yalnızca bir makineye yüklendiği bir azınlık istemcisi çalıştırarak, kesintiye uğrama riskiniz en aza indirilir. Bununla birlikte, tüm staker'lar kesinti risklerinin farkında olmalıdır.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Kesinti ve doğrulayıcı yaşam döngüsü hakkında daha fazlası</a>
</ExpandableCard>

## Staking seçeneklerinin karşılaştırması {#comparison-of-staking-options}

<StakingComparison page="solo" />

## Nasıl çalışır {#how-it-works}

<StakingHowSoloWorks />

Düğümünüz eşzamanlandıktan ve anahtarlarınız oluşturulduktan sonra, doğrulayıcınızı etkinleştirmek için stake'inizi yatırırsınız. Tek bir doğrulayıcı minimum 32 ETH gerektirir ve 2048 ETH'ye kadar tutabilir. Ağ, yatırılan miktarları yaklaşık 13 dakika içinde tanır ancak yeni doğrulayıcılar onaylamaya başlamadan önce bir etkinleştirme kuyruğundan geçer; bunun uzunluğu talebe göre değişir.

Aktifken ETH ödülleri kazanırsınız. Bileşik (0x02) çekim kimlik bilgileri ile ödüller otomatik olarak stake'inize eklenir; normal çekim (0x01) kimlik bilgileri ile, başlangıçtaki 32 ETH'nin üzerindeki ödüller periyodik olarak çekim adresinize aktarılır.

İstenirse, çevrimiçi olma gereksinimini ortadan kaldıran ve daha fazla ödülü durduran bir doğrulayıcı olarak çıkış yapabilirsiniz. Kalan bakiyeniz daha sonra kurulum sırasında belirlediğiniz çekim adresine çekilecektir. Çıkışlar, doğrulayıcı imzalama anahtarlarınızla başlatılabilir veya doğrudan çekim adresinizden bir yürütme katmanı işlemiyle tetiklenebilir, böylece fonlarınızın nihai kontrolü her zaman çekim adresinizde kalır.

### Bileşik getiri ve 2048 ETH maksimumu {#compounding}

Doğrulayıcıların iki tür çekim kimlik bilgisinden biri vardır:

- **Normal çekimler (0x01)**: doğrulayıcının etkin bakiyesi 32 ETH ile sınırlandırılmıştır ve bunun üzerindeki herhangi bir bakiye birkaç günde bir otomatik olarak çekim adresinize aktarılır.
- **Bileşik (0x02)**: doğrulayıcının etkin bakiyesi 2048 ETH'ye kadar büyüyebilir. Ödüller otomatik olarak birleşir ve minimum 32 ETH'nin üzerindeki her tam ETH'den ödül kazanırsınız, böylece yalnızca 32'nin katları değil, 40 ETH gibi esnek miktarlarda stake edebilirsiniz. Yalnızca 2048 ETH'nin üzerindeki bakiye otomatik olarak aktarılır; bunun dışında herhangi bir şeyi çekmek, çekim adresinizden manuel olarak kısmi bir çekim tetiklemek anlamına gelir ve bu da gaz maliyeti gerektirir.

Birden fazla doğrulayıcı çalıştırıyorsanız, ağdan çıkıp yeniden girmeden bunları tek bir bileşik doğrulayıcıda birleştirebilir ve bakım yükünüzü azaltabilirsiniz. Birleştirme, çekim adresinizden talep edilir ve işlem kuyruklarına tabidir. Bir doğrulayıcıyı 0x01'den 0x02 kimlik bilgilerine geçirmek aynı mekanizmayı kullanır ve tamamen çıkış yapıp tekrar yatırmadan **geri alınamaz**.

[Staking çekim işlemleri hakkında daha fazlası](/staking/withdrawals/)

## Staking Launchpad'de başlayın {#get-started-on-the-staking-launchpad}

Staking Launchpad, bir staker olmanıza yardımcı olacak açık kaynaklı bir uygulamadır. İstemcilerinizi seçme, anahtarlarınızı oluşturma ve ETH'nizi staking depozitosu sözleşmesine yatırma konusunda size rehberlik edecektir. Doğrulayıcınızı güvenli bir şekilde kurmak için her şeyi kapsadığınızdan emin olmanız için bir kontrol listesi sağlanmıştır.

<StakingLaunchpadWidget />

## Düğüm ve istemci kurulum araçlarıyla ilgili dikkate alınması gerekenler {#node-tool-considerations}

ETH'nizi evden stake etmenize yardımcı olacak giderek artan sayıda araç ve hizmet vardır ancak her biri farklı riskler ve faydalarla birlikte gelir.

Aşağıda, listelenen bir staking aracının sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için özellik göstergeleri kullanılmıştır. Staking yolculuğunuza yardımcı olacak araçları seçerken bu özellikleri nasıl tanımladığımıza dair bir referans olarak bu bölümü kullanın.

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

## Ekip staking'i: hata toleranslı evden staking {#squad-staking}

**Dağıtık doğrulayıcı teknolojisi (DVT)**, tek bir doğrulayıcının yalnızca bir makine yerine bir makine kümesi üzerinde çalışmasına olanak tanır. Doğrulayıcı anahtarı, dağıtık anahtar oluşturma kullanılarak paylara bölünür ve kümenin bir eşiği (örneğin, 4 düğümden herhangi 3'ü) birlikte imzalamalıdır; tam anahtar hiçbir zaman tek bir makinede bulunmaz. Bir makine arızalanırsa, çevrimdışı olursa veya yanlış yapılandırılırsa, kümenin geri kalanı doğrulayıcının onaylamasını sürdürür.

Evden stake edenler için bu, "ekip staking'ini" mümkün kılar: doğrulayıcıları birlikte çalıştırmak için arkadaşlarla veya diğer topluluk üyeleriyle ekip oluşturmak, tekli bir kurulumun tek hata noktalarını ortadan kaldırmak ve hatalı davranan tek bir makineden kaynaklanan kesinti riskini azaltmak. Obol ve SSV Network, bugün evden staking, hizmet olarak staking ve staking havuzlarında kullanılan üretim DVT uygulamaları sağlar.

[Dağıtık doğrulayıcı teknolojisi (DVT) hakkında daha fazlası](/staking/dvt/)

## Bir staking protokolü için doğrulayıcılar çalıştırın {#run-validators-for-a-staking-protocol}

Bir düğüm çalıştırmak için donanıma ve becerilere sahipseniz ancak 32 ETH'den daha azına sahipseniz, bazı staking protokolleri doğrulayıcınızı havuzlu staker'larından gelen ETH ile eşleştirecektir. Teminat olarak daha küçük bir bono yatırır ve doğrulayıcıyı kendi makinenizde çalıştırırsınız; protokol stake'in geri kalanını sağlar ve siz de ödüllerden pay kazanırsınız.

Bu hibrit bir yaklaşımdır: kendi donanımınızı işletmenin sorumluluklarını (ve memnuniyetini) korursunuz ancak doğrulayıcınız protokolün akıllı sözleşmeleri, yönetişimi ve performans kuralları altında çalışır; bu da kendi ETH'nizi doğrudan stake etmekten farklı bir güven profilidir.

Güven varsayımları ve token mekanikleri de dâhil olmak üzere bu protokollerin nasıl çalıştığı hakkında daha fazla bilgiyi [havuzlu staking sayfasında](/staking/pools/) edinin.

## Düğümünüzü kullanmanın daha fazla yolu {#more-ways-to-use-your-node}

Düğüm işletme becerilerinizi işe koşmak için hiç stake etmenize gerek yoktur. Herkes herhangi bir ETH yatırmadan [bir Ethereum düğümü çalıştırabilir](/run-a-node/). Zincirin kendi kendine doğrulanan bir görünümünü, işlemler göndermek ve uygulamalarla etkileşim kurmak için kendi özel uç noktanızı elde edersiniz ve ağın sağlığına ve dayanıklılığına katkıda bulunursunuz. Bir düğüm çalıştırmak, hiçbir ETH riske atılmadan bir doğrulayıcıyı etkinleştirmeden önce deneyim kazanmanın da iyi bir yoludur.

<StakingCommunityCallout className="my-16" />

## Sıkça sorulan sorular {#faq}

Bunlar, staking hakkında bilinmeye değer en yaygın sorulardan birkaçıdır.

<ExpandableCard title="Doğrulayıcı nedir?">

Bir <em>doğrulayıcı</em>, Ethereum üzerinde yaşayan ve Ethereum protokolünün mutabakatına katılan sanal bir varlıktır. Doğrulayıcılar bir bakiye, açık anahtar ve diğer özelliklerle temsil edilir. Bir <em>doğrulayıcı istemcisi</em>, özel anahtarını tutarak ve kullanarak doğrulayıcı adına hareket eden yazılımdır. Tek bir doğrulayıcı istemcisi, birçok doğrulayıcıyı kontrol eden birçok anahtar çiftini tutabilir.

</ExpandableCard>

<ExpandableCard title="32 ETH'den fazla yatırabilir miyim?">
Evet. _Bileşik_ (0x02) çekim kimlik bilgilerine sahip bir doğrulayıcı, 2048 ETH'ye kadar etkin bakiye tutabilirken, etkinleştirmek için minimum miktar 32 ETH olarak kalır. Bileşik bir doğrulayıcıdaki ödüller otomatik olarak stake'ine eklenir ve minimum 32 ETH'nin üzerindeki her tam ETH'den ödül kazanır, böylece 32'nin katları olmayan miktarları stake edebilirsiniz. Bkz. [Bileşik getiri ve 2048 ETH maksimumu](#compounding).

_Normal çekim_ (0x01) kimlik bilgilerine sahip doğrulayıcılar, 32 ETH'lik bir etkin bakiye ile sınırlandırılmış olarak kalır ve bunun üzerindeki herhangi bir bakiye birkaç günde bir otomatik olarak çekim adresine aktarılır.

Bileşik bir doğrulayıcı için, yalnızca maksimum 2048 ETH'nin üzerindeki bakiye otomatik olarak aktarılır. Bunun altındaki herhangi bir şeyi çekmek için, çekim adresinizden kısmi bir çekim (gaz maliyeti olan bir işlem) tetiklersiniz; bu, minimum 32 ETH'nin üzerindeki herhangi bir bakiyeyi çekebilir. Birden fazla doğrulayıcı çalıştırıyorsanız, ağdan çıkmadan bunları tek bir bileşik doğrulayıcıda da birleştirebilirsiniz.

[Staking çekim işlemleri hakkında daha fazlası](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="Çevrimdışı olursam kesintiye uğrar mıyım? (Özet: Hayır.)">
Ağ düzgün bir şekilde kesinleşirken çevrimdışı olmak kesinti (slashing) ile sonuçlanmayacaktır. Doğrulayıcınız belirli bir dönem (her biri 6,4 dakika uzunluğunda) için onaylamaya uygun değilse küçük <em>hareketsizlik cezaları</em> uygulanır ancak bu <em>kesintiden</em> çok farklıdır. Bu cezalar, doğrulayıcı onaylamaya uygun olsaydı kazanacağınız ödülden biraz daha azdır ve kayıplar, yaklaşık olarak eşit bir süre tekrar çevrimiçi kalınarak geri kazanılabilir.

Hareketsizlik cezalarının, aynı anda kaç doğrulayıcının çevrimdışı olduğuyla orantılı olduğunu unutmayın. Ağın büyük bir bölümünün aynı anda çevrimdışı olduğu durumlarda, bu doğrulayıcıların her biri için cezalar, tek bir doğrulayıcının kullanılamadığı durumlardan daha büyük olacaktır.

Aşırı durumlarda, doğrulayıcıların üçte birinden fazlasının çevrimdışı olması sonucunda ağ kesinleşmeyi durdurursa, bu kullanıcılar çevrimdışı doğrulayıcı hesaplarından üstel bir ETH tükenmesi olan <em>ikinci dereceden hareketsizlik sızıntısı</em> olarak bilinen duruma maruz kalacaklardır. Bu, bakiyeleri 16 ETH'ye ulaşana kadar aktif olmayan doğrulayıcıların ETH'sini yakarak ağın sonunda kendi kendini iyileştirmesini sağlar; bu noktada doğrulayıcı havuzundan otomatik olarak çıkarılırlar. Kalan çevrimiçi doğrulayıcılar sonunda ağın 2/3'ünden fazlasını oluşturacak ve zinciri bir kez daha kesinleştirmek için gereken süper çoğunluğu sağlayacaktır.
</ExpandableCard>

<ExpandableCard title="Kesintiye uğramayacağımdan nasıl emin olabilirim?">
Kısacası, bu hiçbir zaman tam olarak garanti edilemez ancak iyi niyetle hareket ederseniz, bir azınlık istemcisi çalıştırırsanız ve imzalama anahtarlarınızı aynı anda yalnızca bir makinede tutarsanız, kesintiye uğrama riski neredeyse sıfırdır.

Bir doğrulayıcının kesintiye uğramasına ve ağdan atılmasına neden olabilecek yalnızca birkaç belirli yol vardır. Yazının yazıldığı sırada, meydana gelen kesintiler, imzalama anahtarlarının aynı anda iki ayrı makinede depolandığı yedekli donanım kurulumlarının bir ürünü olmuştur. Bu, yanlışlıkla anahtarlarınızdan <em>çifte oy</em> çıkmasına neden olabilir ki bu da kesinti gerektiren bir suçtur.

Bir süper çoğunluk istemcisi (ağın 2/3'ünden fazlası tarafından kullanılan herhangi bir istemci) çalıştırmak, bu istemcide zincir çatallanmasına neden olan bir hata olması durumunda potansiyel kesinti riskini de barındırır. Bu, kesinleşen hatalı bir çatallanma ile sonuçlanabilir. Hedeflenen zincire geri dönmek, kesinleşmiş bir bloğu geri almaya çalışarak bir <em>çevreleme oyu (surround vote)</em> göndermeyi gerektirecektir. Bu da kesinti gerektiren bir suçtur ve bunun yerine sadece bir azınlık istemcisi çalıştırılarak önlenebilir.

Bir <em>azınlık istemcisindeki eşdeğer hatalar asla kesinleşmez</em> ve bu nedenle asla bir çevreleme oyu ile sonuçlanmaz ve <em>kesinti değil</em>, sadece hareketsizlik cezaları ile sonuçlanır.

<ul>
  <li><a href="https://clientdiversity.org/">Bir azınlık istemcisi çalıştırmanın önemi hakkında daha fazla bilgi edinin.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">Ödüller, cezalar ve kesinti hakkında daha fazla bilgi edinin</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Hangi istemci en iyisi?">
Bireysel istemciler, her biri çeşitli programlama dilleri kullanılarak farklı ekipler tarafından geliştirildiği için performans ve kullanıcı arayüzü açısından biraz farklılık gösterebilir. Bununla birlikte, hiçbiri "en iyi" değildir. Tüm üretim istemcileri, blokzincir ile eşzamanlama yapmak ve etkileşim kurmak için aynı temel işlevleri yerine getiren mükemmel yazılım parçalarıdır.

Tüm üretim istemcileri aynı temel işlevselliği sağladığından, bir <strong>azınlık istemcisi</strong> seçmeniz, yani şu anda ağdaki doğrulayıcıların çoğunluğu tarafından KULLANILMAYAN herhangi bir istemciyi seçmeniz aslında çok önemlidir. Bu mantığa aykırı gelebilir ancak bir çoğunluk veya süper çoğunluk istemcisi çalıştırmak, o istemcide bir hata olması durumunda sizi yüksek bir kesinti riskine sokar. Bir azınlık istemcisi çalıştırmak bu riskleri büyük ölçüde sınırlar.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">İstemci çeşitliliğinin neden kritik olduğu hakkında daha fazla bilgi edinin</a>
</ExpandableCard>

<ExpandableCard title="Sadece bir VPS (sanal özel sunucu) kullanabilir miyim?">
Ev donanımının yerine sanal bir özel sunucu (VPS) kullanılabilse de doğrulayıcı istemcinizin fiziksel erişimi ve konumu <em>önemlidir</em>. Amazon Web Services veya Digital Ocean gibi merkezi bulut çözümleri, ağı merkezileştirme pahasına donanım edinme ve işletme zorunluluğunun olmaması kolaylığını sağlar.

Tek bir merkezi bulut depolama çözümünde ne kadar çok doğrulayıcı istemcisi çalışırsa, bu kullanıcılar için o kadar tehlikeli hâle gelir. İster bir saldırı, ister düzenleyici talepler veya sadece güç/internet kesintileri olsun, bu sağlayıcıları çevrimdışı bırakan herhangi bir olay, bu sunucuya dayanan her doğrulayıcı istemcisinin aynı anda çevrimdışı olmasına neden olacaktır.

Çevrimdışı cezaları, aynı anda kaç kişinin çevrimdışı olduğuyla orantılıdır. Bir VPS kullanmak, çevrimdışı cezalarının daha şiddetli olma riskini büyük ölçüde artırır ve kesintinin yeterince büyük olması durumunda ikinci dereceden sızıntı veya kesinti riskinizi artırır. Kendi riskinizi ve ağa yönelik riski en aza indirmek için kullanıcıların kendi donanımlarını edinmeleri ve işletmeleri şiddetle tavsiye edilir.
</ExpandableCard>

<ExpandableCard title="Ödüllerimin kilidini nasıl açarım veya ETH'mi nasıl geri alırım?">

Her çekim işlemi, doğrulayıcınızın bir çekim adresi belirlemiş olmasını gerektirir. Yeni staker'lar bunu anahtar oluşturma ve yatırma sırasında belirler. Ağın ilk günlerinden beri henüz bir çekim adresi belirlememiş olan staker'ların çekim yapmadan önce çekim kimlik bilgilerini güncellemeleri gerekecektir.

Normal çekim (0x01) kimlik bilgilerine sahip doğrulayıcılar için ödül ödemeleri (başlangıçtaki 32'nin üzerinde biriken ETH) periyodik olarak otomatik olarak çekim adresine dağıtılır. Bileşik (0x02) doğrulayıcılar için ödüller stake edilmiş olarak kalır ve otomatik olarak birleşir. Çekim adresinizden kısmi bir çekim tetikleyerek 32 ETH'nin üzerindeki herhangi bir bakiyeyi çekebilirsiniz.

Tüm bakiyenizin kilidini açmak ve geri almak için doğrulayıcınızdan çıkış yapmalısınız. Bunu doğrulayıcı imzalama anahtarlarınızı kullanarak yapabilir veya doğrudan çekim adresinizden bir yürütme katmanı işlemiyle tetikleyebilirsiniz; bu, imzalama anahtarlarınız kaybolsa bile fonlarınızın kurtarılabilir kalacağı anlamına gelir.

<ButtonLink href="/staking/withdrawals/">Staking çekim işlemleri hakkında daha fazlası</ButtonLink>
</ButtonLink>

## Daha fazla okuma {#further-reading}

- [İstemci çeşitliliği istatistikleri ve geçiş rehberleri](https://clientdiversity.org/)
- [İstemci Çeşitliliğine Yardımcı Olmak](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Ethereum'un mutabakat katmanında istemci çeşitliliği](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Nasıl Yapılır: Ethereum Doğrulayıcı Donanımı Satın Almak](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870: Donanım ve bant genişliği önerileri](https://eips.ethereum.org/EIPS/eip-7870)
- [Pectra yükseltmesi: maksimum etkin bakiye ve daha fazlası](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />