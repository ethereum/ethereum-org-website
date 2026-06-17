---
title: Hizmet olarak staking
description: "Hizmet olarak staking hakkında bilgi edinin"
lang: tr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: "Gergedan Leslie bulutların üzerinde süzülüyor."
sidebarDepth: 2
summaryPoints:
  - Üçüncü taraf düğüm operatörleri, doğrulayıcı istemcinizin operasyonunu yönetir
  - Düğüm çalıştırmanın teknik karmaşıklığıyla uğraşmak istemeyen 32 ETH sahibi herkes için harika bir seçenek
  - Güven gereksinimini azaltın ve çekim anahtarlarınızın gözetimini elinizde tutun
---

## Hizmet olarak staking nedir? {#what-is-staking-as-a-service}

Hizmet olarak staking ("SaaS"), bir doğrulayıcı için kendi 32 ETH'nizi yatırdığınız ancak düğüm operasyonlarını üçüncü taraf bir operatöre devrettiğiniz bir staking hizmetleri kategorisini temsil eder. Bu süreç genellikle anahtar üretimi ve para yatırma dahil olmak üzere ilk kurulum boyunca yönlendirilmeyi ve ardından imzalama anahtarlarınızı operatöre yüklemeyi içerir. Bu, hizmetin genellikle aylık bir ücret karşılığında doğrulayıcınızı sizin adınıza çalıştırmasına olanak tanır.

## Neden bir hizmet ile stake etmelisiniz? {#why-stake-with-a-service}

[Ethereum](/) protokolü yerel olarak stake yetki devrini desteklemez, bu nedenle bu hizmetler bu talebi karşılamak için oluşturulmuştur. Stake etmek için 32 ETH'niz varsa ancak donanımla uğraşma konusunda rahat hissetmiyorsanız, SaaS hizmetleri yerel blok ödülleri kazanırken zor kısmı devretmenize olanak tanır.

<Grid>
  <Card title="Your own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Easy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</Grid>

<StakingComparison page="saas" />

## Dikkate alınması gerekenler {#what-to-consider}

ETH'nizi stake etmenize yardımcı olacak giderek artan sayıda SaaS sağlayıcısı vardır, ancak hepsinin kendi faydaları ve riskleri bulunur. Tüm SaaS seçenekleri, evde staking'e kıyasla ek güven varsayımları gerektirir. SaaS seçenekleri, Ethereum istemcilerini saran, açık veya denetlenebilir olmayan ek kodlara sahip olabilir. SaaS'ın ayrıca ağ merkeziyetsizliği üzerinde olumsuz bir etkisi vardır. Kuruluma bağlı olarak, doğrulayıcınızı kontrol edemeyebilirsiniz; operatör ETH'nizi kullanarak dürüst olmayan bir şekilde davranabilir.

Aşağıda, listelenen bir SaaS sağlayıcısının sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için özellik göstergeleri kullanılmıştır. Staking yolculuğunuza yardımcı olacak bir hizmet seçerken bu özellikleri nasıl tanımladığımıza dair bir referans olarak bu bölümü kullanın.

<StakingConsiderations page="saas" />

## Staking hizmet sağlayıcılarını keşfedin {#saas-providers}

Aşağıda mevcut bazı SaaS sağlayıcıları bulunmaktadır. Bu hizmetler arasında size rehberlik etmesi için yukarıdaki göstergeleri kullanın

<ProductDisclaimer />

### SaaS sağlayıcıları {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Ağın güvenliğini artırdığı ve riskinizi sınırladığı için [istemci çeşitliliğini](/developers/docs/nodes-and-clients/client-diversity/) desteklemenin önemini lütfen unutmayın. Çoğunluk istemci kullanımını sınırladığına dair kanıtı olan hizmetler <em style={{ textTransform: "uppercase" }}>"yürütme istemcisi çeşitliliği"</em> ve <em style={{ textTransform: "uppercase" }}>"fikir birliği istemcisi çeşitliliği"</em> ile belirtilmiştir.

### Anahtar Üreticileri {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Gözden kaçırdığımız bir hizmet olarak staking sağlayıcısı için öneriniz mi var? Uygun olup olmadığını görmek ve inceleme için göndermek üzere [ürün listeleme politikamıza](/contributing/adding-staking-products/) göz atın.

## Sıkça sorulan sorular {#faq}

<ExpandableCard title="Anahtarlarımı kim tutuyor?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Düzenlemeler sağlayıcıdan sağlayıcıya farklılık gösterecektir, ancak genellikle ihtiyacınız olan imzalama anahtarlarını (her 32 ETH için bir tane) ayarlama ve bunları sizin adınıza doğrulama yapmalarına izin vermek için sağlayıcınıza yükleme konusunda yönlendirileceksiniz. İmzalama anahtarları tek başına fonlarınızı çekim, transfer etme veya harcama yeteneği vermez. Ancak, mutabakat yönünde oy kullanma yeteneği sağlarlar; bu düzgün yapılmazsa çevrimdışı cezalarına veya kesintiye neden olabilir.
</ExpandableCard>

<ExpandableCard title="Yani iki set anahtar mı var?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Evet. Her hesap hem BLS <em>imzalama</em> anahtarlarından hem de BLS <em>çekim</em> anahtarlarından oluşur. Bir doğrulayıcının zincirin durumunu onaylaması, eşzamanlama komitelerine katılması ve bloklar önermesi için imzalama anahtarlarının bir doğrulayıcı istemcisi tarafından kolayca erişilebilir olması gerekir. Bunların bir şekilde internete bağlı olması gerekir ve bu nedenle doğası gereği "sıcak" anahtarlar olarak kabul edilirler. Bu, doğrulayıcınızın onaylama yapabilmesi için bir gerekliliktir ve bu nedenle fonları transfer etmek veya çekim yapmak için kullanılan anahtarlar güvenlik nedenleriyle ayrılmıştır.

BLS çekim anahtarları, staking ödüllerinin ve çıkış yapılan fonların hangi yürütme katmanı hesabına gitmesi gerektiğini bildiren tek seferlik bir mesajı imzalamak için kullanılır. Bu mesaj yayınlandıktan sonra, <em>BLS çekim</em> anahtarlarına artık ihtiyaç duyulmaz. Bunun yerine, çekilen fonlar üzerindeki kontrol kalıcı olarak sağladığınız adrese devredilir. Bu, kendi soğuk deponuz aracılığıyla güvence altına alınmış bir çekim adresi belirlemenize olanak tanır ve doğrulayıcı imzalama anahtarlarınızı başka biri kontrol etse bile doğrulayıcı fonlarınıza yönelik riski en aza indirir.

Çekim kimlik bilgilerini güncellemek, çekim işlemlerini etkinleştirmek için gerekli bir adımdır\*. Bu süreç, anımsatıcı kurtarma ifadenizi kullanarak çekim anahtarlarını oluşturmayı içerir.

<strong>Bu kurtarma ifadesini güvenli bir şekilde yedeklediğinizden emin olun, aksi takdirde zamanı geldiğinde çekim anahtarlarınızı oluşturamazsınız.</strong>

\*İlk para yatırma işlemiyle birlikte bir çekim adresi sağlayan staker'ların bunu ayarlamasına gerek yoktur. Doğrulayıcınızı nasıl hazırlayacağınız konusunda destek için SaaS sağlayıcınıza danışın.
</ExpandableCard>

<ExpandableCard title="Ne zaman çekim yapabilirim?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Staker'ların bir çekim adresi sağlaması gerekir (ilk para yatırma işleminde sağlanmadıysa) ve ödül ödemeleri birkaç günde bir periyodik olarak otomatik olarak dağıtılmaya başlanacaktır.

Doğrulayıcılar ayrıca bir doğrulayıcı olarak tamamen çıkış yapabilirler, bu da kalan ETH bakiyelerinin çekim için kilidini açacaktır. Bir yürütme çekim adresi sağlayan ve çıkış sürecini tamamlayan hesaplar, bir sonraki doğrulayıcı taraması sırasında tüm bakiyelerini sağlanan çekim adresine alacaklardır.

<ButtonLink href="/staking/withdrawals/">Staking çekim işlemleri hakkında daha fazlası</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Ceza kesintisine uğrarsam ne olur?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Bir SaaS sağlayıcısı kullanarak, düğümünüzün operasyonunu başka birine emanet etmiş olursunuz. Bu, kontrolünüzde olmayan zayıf düğüm performansı riskiyle birlikte gelir. Doğrulayıcınızın kesintiye uğraması durumunda, doğrulayıcı bakiyeniz cezalandırılacak ve zorla doğrulayıcı havuzundan çıkarılacaktır.

Kesinti/çıkış sürecinin tamamlanmasının ardından, bu fonlar doğrulayıcıya atanan çekim adresine transfer edilecektir. Bunu etkinleştirmek için bir çekim adresi sağlamak gerekir. Bu, ilk para yatırma işleminde sağlanmış olabilir. Aksi takdirde, bir çekim adresi bildiren bir mesajı imzalamak için doğrulayıcı çekim anahtarlarının kullanılması gerekecektir. Hiçbir çekim adresi sağlanmadıysa, fonlar sağlanana kadar kilitli kalacaktır.

Herhangi bir garanti veya sigorta seçeneği hakkında daha fazla ayrıntı ve bir çekim adresinin nasıl sağlanacağına dair talimatlar için ilgili SaaS sağlayıcısıyla iletişime geçin. Doğrulayıcı kurulumunuzun tam kontrolünün sizde olmasını tercih ederseniz, [ETH'nizi nasıl solo stake edeceğiniz hakkında daha fazla bilgi edinin](/staking/solo/).
</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [Ethereum Staking Dizini](https://www.staking.directory/) - _Eridian ve Spacesider_
- [Staking Hizmetlerini Değerlendirme](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_