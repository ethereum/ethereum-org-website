---
title: Bir hizmet olarak Hisseleme
description: "Hizmet olarak hisseleme hakkında bilgi edinin"
lang: tr
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: "Gergedan Leslie bulutlarda dalgalanıyor."
sidebarDepth: 2
summaryPoints:
  - Üçüncü taraf düğüm operatörleri, doğrulayıcı istemcinizin çalışmasını yönetir
  - Bir düğüm çalıştırmanın teknik karmaşıklığıyla başa çıkmak konusunda kendini rahat hissetmeyen 32 ETH'si olan herkes için harika bir seçenek
  - Güveni azaltın ve para çekme anahtarlarınızın velayetini koruyun
---

## Hizmet olarak staking nedir? {#what-is-staking-as-a-service}

Hizmet olarak staking ("SaaS"), bir doğrulayıcı için kendi 32 ETH'nizi yatırdığınız, ancak düğüm işlemlerini üçüncü taraf bir operatöre devrettiğiniz bir staking hizmetleri kategorisini temsil eder. Bu süreç genellikle, anahtar oluşturma ve yatırma dahil olmak üzere ilk kurulum boyunca yönlendirilmeyi ve ardından imzalama anahtarlarınızı operatöre yüklemeyi içerir. Bu, hizmetin genellikle aylık bir ücret karşılığında doğrulayıcınızı sizin adınıza çalıştırmasını sağlar.

## Neden bir hizmet ile hisseleme? Neden bir hizmetle hisseleme yapmalı? {#why-stake-with-a-service}

Ethereum protokolü doğal olarak pay devrini desteklemez, bu nedenle bu hizmetler bu talebi karşılamak için oluşturulmuştur. Stake edilecek 32 ETH'niz varsa, ancak donanımla uğraşmaktan rahatsızlık duyuyorsanız, SaaS hizmetleri, yerel blok ödülleri kazanırken zor kısmı devretmenize izin verir.

<Grid>
  <Card title="Kendi doğrulayıcınız" emoji=":desktop_computer:" description="Ethereum mutabakatına katılacak imzalama anahtarı setinizi etkinleştirmek için kendi 32 ETH'nizi yatırın. ETH ödüllerinizin birikmesini gösterge panolarından takip edin." />
  <Card title="Kolay başlangıç" emoji="🏁" description="Donanım özelliklerini, kurulumu, düğüm bakımını ve yükseltmeleri unutun. SaaS sağlayıcıları, imzalama kimlik bilgilerinizi yükleyerek işin zor kısmını dışarıdan halletmenize olanak tanır ve küçük bir ücret karşılığında sizin adınıza bir doğrulayıcı çalıştırır." />
  <Card title="Riskinizi sınırlayın" emoji=":shield:" description="Çoğu durumda kullanıcıların, stake edilmiş fonları çekmeye veya transfer etmeye yarayan anahtarlara erişimden vazgeçmesi gerekmez. Bunlar imzalama anahtarlarından farklıdır ve bir staker olarak riskinizi sınırlamak (ama tamamen ortadan kaldırmamak) için ayrı olarak saklanabilir." />
</Grid>

<StakingComparison page="saas" />

## Dikkat edilmesi gerekenler {#what-to-consider}

ETH'nizi kilitlemenize yardımcı olacak SaaS sağlayıcılarının sayısı artmaktadır, anca her birinin kendine ait fayda ve riskleri bulunur. Tüm SaaS seçenekleri evde hisseleme ile karşılaştırıldığında ek güven varsayımları gerektirir. Saas seçenekleri açık veya denetlenebilir olmayan Ethereum istemcilerini saran ek kodlara sahip olabilir. SaaS ayrıca ağ merkeziyetsizliği üzerinde zararlı bir etkiye de sahiptir. Kuruluma göre, doğrulayıcınızı kontrol edemeyebilirsiniz - operatör sizin ETH'nizi kullanarak aldatıcı biçimde davranabilir.

Nitelik göstergeleri, listelenen bir SaaS sağlayıcısının sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için aşağıda kullanılmaktadır. Bu bölümü, stake etme yolculuğunuza yardımcı olacak bir hizmet seçerken bu nitelikleri nasıl tanımladığımıza dair bir referans olarak kullanın.

<StakingConsiderations page="saas" />

## Hisseleme hizmeti sağlayıcılarını keşfedin {#saas-providers}

Aşağıda bazı mevcut SaaS sağlayıcıları bulunmaktadır. Bu hizmetlerde size rehberlik etmesi için yukarıdaki göstergeleri kullanın

<ProductDisclaimer />

### SaaS sağlayıcıları

<StakingProductsCardGrid category="saas" />

Ağın güvenliğini iyileştirdiği ve riskinizi sınırladığı için [istemci çeşitliliğini](/developers/docs/nodes-and-clients/client-diversity/) desteklemenin önemini lütfen unutmayın. Çoğunluk istemcisi kullanımı sınırladığına dair kanıtları olan hizmetler;<em style={{ textTransform: "uppercase" }}>"yürütme istemcisi çeşitliliği"</em> ve <em style={{ textTransform: "uppercase" }}>"fikir birliği istemcisi çeşitliliği" ile belirtilir.</em>

### Anahtar Üreticileri

<StakingProductsCardGrid category="keyGen" />

Kaçırdığımız bir hizmet sağlayıcı olarak hisseleme için bir öneriniz mi var? Uygun olup olmadığını görmek ve incelemeye göndermek için [ürün listeleme politikamıza](/contributing/adding-staking-products/) göz atın.

## Sıkça sorulan sorular {#faq}

<ExpandableCard title="Anahtarlarımı kim tutuyor?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Düzenlemeler sağlayıcıdan sağlayıcıya farklılık gösterecektir, ancak genellikle ihtiyacınız olan tüm imzalama anahtarlarını (32 ETH başına bir tane olmak üzere) ayarlamanız ve bunları sizin adınıza doğrulamalarına izin vermek için sağlayıcınıza yüklemeniz konusunda size rehberlik edilecektir. İmza anahtarları tek başına paranızı çekme, transfer etme veya harcama imkanı vermez. Ancak, uygun şekilde yapılmadığı takdirde çevrimdışı cezalara veya kesintilere neden olabilecek konsensusa doğru oy kullanma yeteneği sağlarlar.
</ExpandableCard>

<ExpandableCard title="Yani iki set anahtar mı var?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Evet. Tüm hesaplar BLS <em> imzalama </em> ve BLS <em> para çekme </em> anahtarlarından oluşur. Doğrulayıcının zincirin durumunu tasdik etmesi, eşitleme kurullarına katılması ve bloklar önermesi için imzalama anahtarlarına, bir doğrulayıcı müşterisi tarafından kolayca erişilebilir olmalıdır. Bunların bir şekilde internete bağlı olması gerekir ve bu nedenle doğal olarak "kısayol" tuşları olarak kabul edilirler. Bu, doğrulayıcınızın onaylayabilmesi için bir gerekliliktir ve bu nedenle, para transfer etmek veya çekmek için kullanılan anahtarlar güvenlik nedeniyle ayrılmıştır.

BLS para çekme anahtarları, hangi yürütme katmanı hesabının hisseleme ödüllerinin ve çıkış yapılan fonların gitmesi gerektiğini gösteren tek seferlik bir mesajı imzalamak için kullanılır. Bu mesaj bir kere yayınlandıktan sonra <em>BLS para çekme</em> anahtarlarına ihtiyaç duyulmaz. Bunun yerine, çekilen fonların kontrolü kalıcı bir şekilde verdiğiniz adrese devredilir. Bu kendi soğuk depolamanız tarafından güvenli kılınan bir para çekme adresi ayarlayarak, başkası sizin doğrulayıcı imzalama anahtarlarınızı kontrol etse bile doğrulayıcı fonlarınızın riskini minimize eder.

Çekim bilgilerini güncellemek çekme işlemini aktif hale getirmek için gerekli bir adımdır\*. Bu süreç sizin anımsatıcı güvenlik kelimenizi kullanarak para çekme anahtarlarını oluşturmayı kapsar.

<strong>Bu güvenlik kelimelerini güvenli bir şekilde yedeklediğinizden emin olun, aksi takdirde zamanı geldiğinde para çekme anahtarlarınızı oluşturamazsınız.</strong>

\*İlk para yatırma işleminde para çekme adresi belirten paydaşların bunu ayarlamasına gerek yoktur. Doğrulayıcınızı nasıl hazırlayacağınızla ilgili destek almak için SaaS sağlayıcınıza danışın.
</ExpandableCard>

<ExpandableCard title="Ne zaman para çekebilirim?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Paydaşların (eğer ilk para yatırma işleminde sağlanmadıysa) bir para çekme adresi sağlaması gerekir ve ödül ödemeleri periyodik olarak birkaç günde bir otomatik olarak dağıtılmaya başlayacaktır.

Doğrulayıcılar ayrıca bir doğrulayıcı olarak tamamen çıkabilir, bu da kalan ETH bakiyelerinin çekim için kilidini kaldıracaktır. Bir yürütme çekim adresi sağlamış ve çıkış sürecini tamamlamış adresler sıradaki doğrulayıcı süpürmesinde para çekme adresine tüm bakiyelerini alacaklardır.

<ButtonLink href="/staking/withdrawals/">Hisseleme çekimleri hakkında daha fazla bilgi</ButtonLink>\n
</ExpandableCard>

<ExpandableCard title="Kesintiye uğrarsam ne olur?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Bir SaaS sağlayıcısı kullanarak, düğümünüzün çalışmasını başka birine emanet ediyorsunuz. Bu, sizin kontrolünüzde olmayan düşük düğüm performansı riskiyle birlikte gelir. Doğrulayıcınızın kesintiye uğraması durumunda, doğrulayıcı bakiyeniz cezalandırılacak ve doğrulayıcı havuzundan zorla kaldırılacaktır.

Kesinti/çıkış sürecinin tamamlanmasından sonra, bu fonlar doğrulayıcıya atanmış olan para çekme adresine transfer edilecektir. Bu, aktif hale getirilmek için bir para çekme adresinin sağlanmasını gerektirir. Bu ilk yatırımda sağlanabilir. Eğer sağlanmadıysa, doğrulayıcı para çekme anahtarları çekim adresini belirten bir mesajı imzalamak için kullanılmalıdır. Eğer herhangi bir para çekme adresi sağlanmadıysa, sağlanana kadar fonlar kilitli kalacaktır.

Herhangi bir garanti veya sigorta seçeneği hakkında daha fazla detay için ya da nasıl para çekme adresi sağlanacağıyla ilgili yönergeler için bireysel SaaS sağlayıcınızla iletişime geçin. Doğrulayıcı kurulumunuzun tam kontrolünün sizde olmasını tercih ediyorsanız, [ETH'nizi tek başına nasıl hisseleyeceğiniz hakkında daha fazla bilgi edinin](/staking/solo/).
</ExpandableCard>

## Daha fazla kaynak {#further-reading}

- [Ethereum Hisseleme Dizini](https://www.staking.directory/) - _Eridian ve Spacesider_
- [Hisseleme Hizmetlerinin Değerlendirilmesi](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
