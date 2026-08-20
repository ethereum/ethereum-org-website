---
title: Yetki devredilmiş staking (hizmet olarak staking)
description: Yetki devredilmiş staking'e nasıl başlanacağına dair genel bir bakış
lang: tr
template: staking
image: /images/staking/leslie-saas.png
sidebarDepth: 2
summaryPoints:
  - Üçüncü taraf düğüm operatörleri, doğrulayıcı istemcinizin çalışmasını yönetir
  - Düğüm çalıştırmanın teknik karmaşıklığıyla uğraşmak istemeyen ve 32 ETH'si olan herkes için harika bir seçenek
  - Yetki devri, çekim anahtarlarınızı elinizde tuttuğunuz hizmetlerden tamamen gözetimli borsalara kadar uzanan bir yelpazeyi kapsar
---

## Yetki devredilmiş staking nedir? {#what-is-staking-as-a-service}

Yetki devredilmiş staking, bir doğrulayıcı için kendi 32 ETH'nizi yatırdığınız, ancak düğüm operasyonlarının yetkisini üçüncü taraf bir operatöre devrettiğiniz bir staking hizmetleri kategorisini temsil eder. Süreç genellikle anahtar üretimi ve para yatırma dahil olmak üzere ilk kurulumda yönlendirilmeyi ve ardından imzalama anahtarlarınızı operatöre yüklemeyi içerir. ETH'yi siz sağlarsınız, ancak doğrulayıcının donanımının çalıştırılmasını başkasına devredersiniz.

[Ethereum](/) protokolü, stake yetki devrini yerel olarak desteklemez, bu nedenle bu talebi karşılamak için bir dizi hizmet oluşturulmuştur. Bu kategori en çok **hizmet olarak staking (SaaS)** olarak bilinir, ancak stake edilen ETH'niz üzerinde ne kadar kontrol sahibi olduğunuz şeklindeki temel soruya göre farklılık gösteren bir dizi düzenlemeyi kapsar:

- **Gözetimsiz hizmet olarak staking**: Kendi çekim anahtarlarınızı elinizde tutarsınız ve yalnızca doğrulayıcı operasyonunun yetkisini devredersiniz.
- **Tamamen gözetimli staking**: Genellikle bir borsa olan sağlayıcı, hem anahtarları hem de fonları elinde tutar.

[Bireysel staking](/staking/solo/) ile karşılaştırıldığında, yetki devrinin her biçimi sizinle Ethereum protokolü arasına bir ara yazılım yerleştirir. Bu ara yazılım, başkasının işletmesi tarafından çalıştırılan yazılım ve altyapıdır. Kolaylığa doğru atılan her adım bir güven varsayımı ekler, bu nedenle bir hizmet seçmeden önce bu yelpazede nerede durduğunu belirleyin.

### Yetki devredilmiş staking ne değildir? {#what-delegated-staking-is-not}

- **Havuzlu staking ve likit staking tokenleri (LST)**: Havuzlarla, herhangi bir miktardaki ETH'yi diğer staker'larla birleştirirsiniz ve genellikle havuzun stake'indeki payınızı temsil eden bir token alırsınız. Kendi doğrulayıcınızın yetkisini devretmiyorsunuz; havuzun akıllı sözleşmeleri ve düğüm operatörleri doğrulayıcıları kontrol eder. [Havuzlu staking hakkında daha fazlası](/staking/pools/)
- **Teminatlı düğüm operasyonu**: Bazı staking protokolleri, bir teminat yatırarak kendi donanımınızda 32 ETH'den daha az bir miktarla bir doğrulayıcı çalıştırmanıza olanak tanır. Bu, yetki devrinin tam tersi olan düğüm operasyonudur ve [bireysel staking](/staking/solo/) ile birlikte ele alınır.

## Staking yetkinizi neden devretmelisiniz? {#why-stake-with-a-service}

Stake etmek için 32 ETH'niz varsa ancak donanımla uğraşırken kendinizi rahat hissetmiyorsanız, yetki devredilmiş staking hizmetleri, yerel Ethereum blok ödülleri kazanırken teknik tarafı devretmenize olanak tanır.

<Grid>
  <Card title="Your own validator" icon={<MonitorCheck />} description="Ethereum mutabakatına katılacak kendi imzalama anahtarı setinizi etkinleştirmek için kendi 32 ETH'nizi yatırın. Bu ETH ödüllerinin birikmesini izlemek için gösterge panelleriyle ilerlemenizi takip edin." />
  <Card title="Easy to start" icon={<Flag />} description="Donanım özelliklerini, kurulumu, düğüm bakımını ve yükseltmelerini unutun. Sağlayıcılar, kendi imzalama kimlik bilgilerinizi yükleyerek zor kısmı dışarıdan temin etmenize olanak tanır ve küçük bir maliyet karşılığında sizin adınıza bir doğrulayıcı çalıştırmalarına izin verir." />
  <Card title="Limit your risk" icon={<ShieldHalf />} description="Gözetimsiz hizmetlerle, stake edilen fonların çekilmesini veya transfer edilmesini sağlayan anahtarların kontrolünü elinizde tutarsınız. Bunlar imzalama anahtarlarından farklıdır ve bir staker olarak riskinizi sınırlamak (ancak ortadan kaldırmamak) için ayrı olarak saklanabilir." />
</Grid>

## Staking seçeneklerinin karşılaştırması {#comparison-of-staking-options}

<StakingComparison page="saas" />

## Yetki devri yelpazesi {#the-delegation-spectrum}

Sağlayıcılar sizin için hangi anahtarları tuttukları konusunda farklılık gösterir ve tuttukları her anahtar, onlara güvenmeniz gereken bir şeydir.

### Gözetimsiz hizmet olarak staking {#non-custodial-staking-as-a-service}

Gözetimsiz SaaS ile, genellikle doğrulayıcı anahtarlarınızı oluşturma ve kendi 32 ETH yatırma işleminizi yapma konusunda yönlendirilirsiniz, ardından _imzalama anahtarlarını_ operatöre yüklersiniz. İmzalama anahtarları, operatörün sizin adınıza doğrulayıcı görevlerini (blokları onaylama ve önerme) yerine getirmesine olanak tanır. Bunların yanlış kullanılması doğrulayıcınızın cezalandırılmasına veya ceza kesintisine uğramasına neden olabilir, ancak fonlarınızı çekmek, transfer etmek veya harcamak için kullanılamazlar.

Doğrulayıcının _çekim kimlik bilgileri_ sizin kontrol ettiğiniz bir adrese işaret etmeye devam eder. Ödüller ve çıkış yapılan fonlar yalnızca oraya gidebilir (aşağıdaki güven modeli bölümüne bakın).

### Gözetimli hizmetler ve borsa staking'i {#custodial-services-and-exchange-staking}

Yelpazenin tamamen yetki devredilmiş ucunda, en yaygın olarak merkezi borsalar tarafından sunulan gözetimli staking yer alır. Anahtarlarla hiçbir zaman ilgilenmezsiniz; sadece platform hesabınızda ETH tutarsınız ve staking'e katılırsınız. Bu, mümkün olan en basit kullanıcı deneyimidir ve halihazırda bir borsada fon tutan ve gözetim riskini kabul eden kişiler için meşru bir seçenektir.

Aynı zamanda en fazla güveni gerektirir. Sağlayıcı hem imzalama anahtarlarını hem de çekim kimlik bilgilerini kontrol eder; elinizde tuttuğunuz şey bir doğrulayıcı değil, onların platformundaki bir bakiyedir. Bu şu anlama gelir:

- Stake edilen ETH'niz sağlayıcının ödeme gücüne, güvenliğine ve düzenleyici durumuna maruz kalır ve çekim işlemleri yalnızca Ethereum protokol kurallarına değil, onların şartlarına ve işlem sürelerine tabidir.
- Sağlayıcı başarısız olursa veya çekim işlemlerini dondurursa, doğrulayıcıdan çıkış yapmak veya fonları kurtarmak için bağımsız bir yolunuz yoktur.
- Bir avuç borsa operatörü altında stake edilen büyük miktarlardaki ETH, stake merkezileşmesine katkıda bulunur ve bu operatörlerin istemci seçimleri ağın sağlığını etkiler. Kontrolü daha fazla elinizde tutacak şekilde stake yapmak veya azınlık istemcilerini çalıştırdığı kanıtlanabilen sağlayıcıları seçmek, Ethereum'un dayanıklılığı için daha fazlasını yapar.

## Güven modeli: nelerin değerlendirileceği {#trust-model-what-to-evaluate}

Yetki devredilmiş staking, staking kurulumunuzun bir kısmı için her zaman başka birine güvenmek anlamına gelir. Herhangi bir şeyi devretmeden önce şu soruları yanıtlayın:

- **Çekim anahtarlarını kim tutuyor?** Bir doğrulayıcının çekim kimlik bilgileri (0x01 veya 0x02 türü), nihayetinde stake'i kontrol eden bir yürütme katmanı adresini işaret eder. Bu adres size aitse, düzenleme gözetimsizdir; operatör doğrulayıcıyı çalıştırabilir (veya kötü yönetebilir), ancak ETH yalnızca size çekilebilir. Kimlik bilgileri sağlayıcının adresini işaret ediyorsa, elinizde bir stake değil, bir söz tutuyorsunuz demektir.
- **Operatör olmadan çıkış yapabilir misiniz?** [Pectra yükseltmesinden](/roadmap/pectra/) bu yana, [yürütme katmanı tetiklemeli çekim işlemleri (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002), çekim adresinin imzalama anahtarları olmadan doğrudan yürütme katmanından bir doğrulayıcı çıkışını (veya bileşik 0x02 doğrulayıcıları için 32 ETH'nin üzerindeki bakiyenin kısmi çekimini) tetiklemesine olanak tanır. Bir işlem gerektirir ve gaz maliyeti vardır, ancak çekim kimlik bilgileri size ait olduğu sürece, yanıt vermeyen veya çalışmayan bir operatörün artık doğrulayıcınızı rehin tutamayacağı anlamına gelir.
- **Ücret yapısı nedir?** Hizmetler sabit bir aylık ücret veya ödüllerin bir yüzdesini alır. Ücretlerin kesinti süreleri ve cezalarla nasıl etkileşime girdiğini kontrol edin: Operatör düşük performans gösterirse maliyeti kimin üstlendiğini ve herhangi bir garanti veya sigorta sunulup sunulmadığını inceleyin.
- **Operatör hangi istemcileri çalıştırıyor?** Çoğunluk [yürütme veya fikir birliği istemcilerini](/developers/docs/nodes-and-clients/client-diversity/) çalıştıran bir operatör, o istemcide bir hata olması durumunda hem stake'inizi hem de ağı ilişkili bir başarısızlığa maruz bırakır. Azınlık istemci kullanımını belgeleyen sağlayıcıları tercih edin.
- **Hizmet açık ve denetlenmiş mi?** Sağlayıcılar, standart Ethereum istemcilerinin etrafında açık kaynaklı veya denetlenebilir olmayan ek yazılımlar çalıştırabilir. Halka açık denetimler, köklü bir çalışma geçmişi ve temiz bir ceza kesintisi kaydı arayın.
- **Sağlayıcı ortadan kaybolursa ne olur?** Sorumlu bir sağlayıcı, doğrulayıcınızdan nasıl çıkış yapacağınız, anahtarlarınızı nasıl kurtaracağınız veya bir çıkışı kendiniz nasıl tetikleyeceğiniz konusunda net talimatlar sağlayarak sistemden ayrılma sürecini belgeler. Cevap tamamen sağlayıcının iş hayatında kalmasına bağlıysa, bu gözetimli bir düzenlemedir.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Bazı sağlayıcılar, doğrulayıcınızı dağıtık doğrulayıcı teknolojisi (DVT) kullanarak çalıştırabilir**, imzalama anahtarını birden fazla düğüme bölerek hiçbir tek makinenin veya operatörün bir hata noktası olmamasını sağlar. [Dağıtık doğrulayıcı teknolojisi hakkında daha fazlası](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Dikkate alınması gerekenler {#what-to-consider}

Doğrulayıcınızın operasyonunu devretmenize yardımcı olacak giderek artan sayıda sağlayıcı vardır, ancak hepsinin kendi faydaları ve riskleri bulunur. Tüm yetki devredilmiş seçenekler, bireysel staking'e kıyasla ek güven varsayımları gerektirir. Yetki devredilmiş seçenekler, Ethereum istemcilerini saran, açık veya denetlenebilir olmayan ek kodlara sahip olabilir. Yetki devrinin ayrıca ağın merkeziyetsizliği üzerinde olumsuz bir etkisi vardır. Kuruluma bağlı olarak, doğrulayıcınızı kontrol edemeyebilirsiniz ve operatör ETH'nizi kullanarak dürüst olmayan bir şekilde davranabilir.

Aşağıdaki özellik göstergeleri, listelenen bir sağlayıcının sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için kullanılır. Bir staking hizmeti seçerken bu özellikleri nasıl tanımladığımıza dair bir referans olarak bu bölümü kullanın.

<StakingConsiderations page="saas" />

## Staking hizmet sağlayıcılarını keşfedin {#saas-providers}

Aşağıda mevcut bazı hizmet olarak staking sağlayıcıları bulunmaktadır. Bu hizmetler arasında size rehberlik etmesi için yukarıdaki göstergeleri kullanın.

<ProductDisclaimer />

### SaaS sağlayıcıları {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Ağın güvenliğini artırdığı ve riskinizi sınırladığı için [istemci çeşitliliğini](/developers/docs/nodes-and-clients/client-diversity/) desteklemenin önemini lütfen unutmayın. Çoğunluk istemci kullanımını sınırladığına dair kanıtı olan hizmetler <em style={{ textTransform: "uppercase" }}>"yürütme istemcisi çeşitliliği"</em> ve <em style={{ textTransform: "uppercase" }}>"fikir birliği istemcisi çeşitliliği"</em> ile belirtilmiştir.

### Anahtar Üreticileri {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Gözden kaçırdığımız bir hizmet olarak staking sağlayıcısı için bir öneriniz mi var? Uygun olup olmadığını görmek ve inceleme için göndermek üzere [ürün listeleme politikamıza](/contributing/adding-staking-products/) göz atın.

<StakingCommunityCallout className="my-16" />

## Sıkça sorulan sorular {#faq}

<ExpandableCard title="Anahtarlarımı kim tutuyor?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Düzenlemeler sağlayıcıdan sağlayıcıya farklılık gösterir. Gözetimsiz hizmetlerde, doğrulayıcınız için imzalama anahtarlarını oluşturma (her doğrulayıcı 32 ETH veya Pectra yükseltmesinden bu yana bileşik (0x02) kimlik bilgileriyle 2048 ETH'ye kadar tutar) ve sizin adınıza doğrulama yapmalarına izin vermek için bunları sağlayıcınıza yükleme konusunda yönlendirileceksiniz. İmzalama anahtarları tek başına fonlarınızı çekme, transfer etme veya harcama yeteneği vermez. Ancak, mutabakata yönelik oy kullanma yeteneği sağlarlar ve bu düzgün yapılmazsa çevrimdışı cezalarına veya ceza kesintisine neden olabilir.

Merkezi bir borsa aracılığıyla staking gibi gözetimli hizmetlerde, sağlayıcı tüm anahtarları elinde tutar: imzalama anahtarları ve çekim kimlik bilgileri. Bu durumda, sağlayıcıya yalnızca doğrulayıcı operasyonu konusunda değil, fonların kendisi konusunda da güveniyorsunuz demektir.
</ExpandableCard>

<ExpandableCard title="Yani iki set anahtar mı var?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Evet. Her doğrulayıcının _imzalama_ anahtarları ve ayrı _çekim_ kimlik bilgileri vardır. Bir doğrulayıcının zincirin durumunu onaylaması, eşzamanlama komitelerine katılması ve bloklar önermesi için imzalama anahtarlarının bir doğrulayıcı istemcisi tarafından kolayca erişilebilir olması gerekir. Bunların bir şekilde internete bağlı olması gerekir ve bu nedenle doğası gereği "sıcak" anahtarlar olarak kabul edilirler. Çekilen fonları kontrol eden anahtarlar güvenlik nedenleriyle ayrı tutulur.

Çekim kimlik bilgileri, staking ödüllerinin ve çıkış yapılan fonların gideceği yürütme katmanı adresini belirler. Modern para yatırma araçları, bu adresi para yatırma sırasında normal (0x01) veya bileşik (0x02) bir kimlik bilgisi olarak ayarlamanıza olanak tanır ve bu, ideal olarak soğuk depolamada güvence altına alınmış, sizin kontrol ettiğiniz bir adres olmalıdır. Bu, doğrulayıcı imzalama anahtarlarınızı başka biri kontrol etse bile fonlarınızı korur ve Pectra yükseltmesinden bu yana, doğrulayıcıdan doğrudan o adresten çıkış yapmanıza da olanak tanır.

Ağın ilk günlerinde bir yürütme çekim adresi olmadan kurulan doğrulayıcılar, eski BLS çekim anahtarlarını kullanır ve çekim işlemlerinin başlayabilmesi için bir çekim adresi beyan eden tek seferlik bir mesaj imzalamalıdır. Bu, kurulum sırasında oluşturulan anımsatıcı kurtarma ifadesinden çekim anahtarlarının yeniden oluşturulmasını içerir.

**Bu kurtarma ifadesini güvenli bir şekilde yedeklediğinizden emin olun, aksi takdirde zamanı geldiğinde çekim anahtarlarınızı oluşturamazsınız.**

Doğrulayıcınızı nasıl hazırlayacağınızla ilgili destek için sağlayıcınıza danışın.
</ExpandableCard>

<ExpandableCard title="Ne zaman çekim yapabilirim?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Çekim işlemlerinin nasıl çalıştığı, doğrulayıcınızın çekim kimlik bilgisi türüne bağlıdır. Normal (0x01) doğrulayıcılar için, 32 ETH'nin üzerindeki herhangi bir bakiye, birkaç günde bir periyodik olarak otomatik olarak çekim adresine aktarılır. Bileşik (0x02) doğrulayıcılar için ödüller, doğrulayıcının bakiyesine 2048 ETH'ye kadar eklenir ve bunun altındaki bir miktarı çekmek, çekim adresinizden kısmi bir çekim tetiklemeyi gerektirir ve bu da gaz maliyetine neden olur.

Doğrulayıcılar ayrıca tamamen çıkış yapabilir, bu da kalan tüm ETH bakiyesinin kilidini açar. Çıkış işlemini tamamladıktan sonra, tam bakiye sonraki bir doğrulayıcı taraması sırasında çekim adresine transfer edilir.

<ButtonLink href="/staking/withdrawals/">Staking çekim işlemleri hakkında daha fazlası</ButtonLink>
</ButtonLink>

<ExpandableCard title="Sağlayıcım ortadan kaybolursa veya doğrulayıcımdan çıkış yapmazsa ne olur?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
Çekim kimlik bilgileriniz kontrol ettiğiniz bir adresi işaret ediyorsa, doğrulayıcıdan kendiniz çıkış yapabilir ve stake'inizi kurtarabilirsiniz; bkz. [Güven modeli: nelerin değerlendirileceği](#trust-model-what-to-evaluate).

Sağlayıcı çekim kimlik bilgilerini elinde tutuyorsa (gözetimli ve borsa staking'inde olduğu gibi), fonları bağımsız olarak kurtarmanız için protokol düzeyinde bir yol yoktur; başvuracağınız yol sağlayıcının kendi süreçleriyle sınırlıdır.
</ExpandableCard>

<ExpandableCard title="Kesintiye uğrarsam ne olur?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Yetki devredilmiş bir staking sağlayıcısı kullanarak, düğümünüzün operasyonunu başka birine emanet etmiş olursunuz. Bu, sizin kontrolünüzde olmayan zayıf düğüm performansı riskiyle birlikte gelir. Doğrulayıcınızın ceza kesintisine uğraması durumunda, doğrulayıcınızın bakiyesiyle orantılı bir ilk ceza uygulanır (Pectra yükseltmesinde önemli ölçüde küçültülmüştür) ve doğrulayıcınız zorla doğrulayıcı setinden çıkarılır.

Ceza kesintisi/çıkış işleminin tamamlanmasının ardından, kalan fonlar doğrulayıcıya atanan çekim adresine transfer edilir.

Herhangi bir garanti veya sigorta seçeneği hakkında daha fazla ayrıntı için bireysel sağlayıcılarla iletişime geçin. Doğrulayıcı kurulumunuzun tam kontrolünün sizde olmasını tercih ederseniz, [ETH'nizi nasıl bireysel stake edeceğiniz hakkında daha fazla bilgi edinin](/staking/solo/).
</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [Hizmet Olarak Staking Nedir?](https://figment.io/insights/what-is-staking-as-a-service/) - _Figment_
- [Ethereum Staking Dizini](https://www.staking.directory/) - _Eridian ve Spacesider_
- [Staking Hizmetlerini Değerlendirme](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
- [EIP-7002: Yürütme katmanı tetiklemeli çekim işlemleri](https://eips.ethereum.org/EIPS/eip-7002) - _bir doğrulayıcının çekim adresinden çıkış yapmasına yönelik spesifikasyon_