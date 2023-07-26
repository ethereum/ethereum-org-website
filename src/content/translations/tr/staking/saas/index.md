---
title: Bir hizmet olarak stake etme
description: Havuzlanmış ETH faiz getirisi elde etmeye nasıl başlanacağına dair genel bir bakış
lang: tr
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-saas.png
alt: Gergedan Leslie bulutlarda dalgalanıyor.
sidebarDepth: 2
summaryPoints:
  - Üçüncü taraf düğüm operatörleri, doğrulayıcı istemcinizin çalışmasını yönetir
  - Bir düğüm çalıştırmanın teknik karmaşıklığıyla başa çıkmak konusunda kendini rahat hissetmeyen 32 ETH'si olan herkes için harika bir seçenek
  - Güveni azaltın ve para çekme anahtarlarınızın velayetini koruyun
---

## Hizmet olarak staking nedir? {#what-is-staking-as-a-service}

Hizmet olarak staking ("SaaS"), bir doğrulayıcı için kendi 32 ETH'nizi yatırdığınız, ancak düğüm işlemlerini üçüncü taraf bir operatöre devrettiğiniz bir staking hizmetleri kategorisini temsil eder. Bu süreç genellikle, anahtar oluşturma ve yatırma dahil olmak üzere ilk kurulum boyunca yönlendirilmeyi ve ardından imzalama anahtarlarınızı operatöre yüklemeyi içerir. Bu, hizmetin genellikle aylık bir ücret karşılığında doğrulayıcınızı sizin adınıza çalıştırmasını sağlar.

## Neden bir hizmet ile hisseleme? {#why-stake-with-a-service}

Ethereum protokolü doğal olarak pay devrini desteklemez, bu nedenle bu hizmetler bu talebi karşılamak için oluşturulmuştur. Stake edilecek 32 ETH'niz varsa, ancak donanımla uğraşmaktan rahatsızlık duyuyorsanız, SaaS hizmetleri, yerel blok ödülleri kazanırken zor kısmı devretmenize izin verir.

<CardGrid>
  <Card title="Sizin kendi doğrulayıcılarınız" emoji=":desktop_computer:">
    Ethereum konsensusuna katılacak kendi imzalama anahtarı setinizi etkinleştirmek için kendi 32 ETH'nizi yatırın. Bu ETH ödüllerinin birikmesini izlemek için ilerlemenizi kontrol panelleriyle izleyin.
  </Card>
  <Card title="Başlaması kolay" emoji="🏁">
    Donanım özelliklerini, kurulumu, düğüm bakımını ve yükseltmeleri unutun.
    SaaS sağlayıcıları, kendi imzalama kimlik bilgilerinizi yükleyerek, küçük bir maliyetle sizin adınıza bir doğrulayıcı çalıştırmalarına olanak tanıyarak işin zor kısmını dışarıdan temin etmenize olanak tanırlar.
  </Card>
  <Card title="Riskinizi sınırlayın" emoji=":shield:">
    Çoğu durumda, kullanıcıların stake edilen fonları çekmeyi veya aktarmayı sağlayan anahtarlara erişimden vazgeçmesi gerekmez. Bunlar, imzalama anahtarlarından farklıdır ve bir staker olarak riskinizi sınırlamak (ancak ortadan kaldırmak değil) için ayrı olarak saklanabilir.
  </Card>
</CardGrid>

<StakingComparison page="saas" />

## Ne dikkate alınmalı {#what-to-consider}

ETH'nizi stake etmenize yardımcı olacak hizmet olarak staking sağlayıcılarının sayısı giderek artıyor, ancak her biri farklı riskler ve faydalar getiriyor.

Nitelik göstergeleri, listelenen bir SaaS sağlayıcısının sahip olabileceği dikkate değer güçlü veya zayıf yönleri belirtmek için aşağıda kullanılmaktadır. Bu bölümü, stake etme yolculuğunuza yardımcı olacak bir hizmet seçerken bu nitelikleri nasıl tanımladığımıza dair bir referans olarak kullanın.

<StakingConsiderations page="saas" />

## Staking servis sağlayıcılarını keşfedin {#saas-providers}

Aşağıda bazı mevcut SaaS sağlayıcıları bulunmaktadır. Bu hizmetlerde size rehberlik etmesi için yukarıdaki göstergeleri kullanın

<InfoBanner emoji="⚠️" isWarning>
Ağın güvenliğini iyileştirdiği ve riskinizi sınırladığı için <a href="/developers/docs/nodes-and-clients/client-diversity/">istemci çeşitliliğini</a> desteklemenin önemini lütfen unutmayın. Çoğunluk istemci kullanımını sınırladığına dair kanıta sahip hizmetler, <em style="text-transform: büyük harf;">"çeşitli istemciler"</em> olarak işaretlenir
</InfoBanner>

#### SaaS sağlayıcıları

<StakingProductsCardGrid category="saas" />

#### Anahtar Üreticileri

<StakingProductsCardGrid category="keyGen" />

Kaçırdığımız bir hizmet sağlayıcı olarak staking için bir öneriniz mi var? Uygun olup olmadığını görmek ve incelemeye göndermek için [ürün listeleme politikamıza](/contributing/adding-staking-products/) göz atın.

## SSS {#faq}

<ExpandableCard title="Anahtarlarımı kim tutuyor?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  Düzenlemeler sağlayıcıdan sağlayıcıya farklılık gösterecektir, ancak genellikle ihtiyacınız olan tüm imzalama anahtarlarını (32 ETH başına bir tane olmak üzere) ayarlamanız ve bunları sizin adınıza doğrulamalarına izin vermek için sağlayıcınıza yüklemeniz konusunda size rehberlik edilecektir. İmza anahtarları tek başına paranızı çekme, transfer etme veya harcama imkanı vermez. Ancak, uygun şekilde yapılmadığı takdirde çevrimdışı cezalara veya kesintilere neden olabilecek konsensusa doğru oy kullanma yeteneği sağlarlar.
</ExpandableCard>

<ExpandableCard title="Yani iki anahtar seti mi var?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Evet. Her hesap hem <em>imzalama</em> anahtarlarından hem de <em>para çekme</em> anahtarlarından oluşur. Doğrulayıcının zincirin durumunu tasdik etmesi, eşitleme kurullarına katılması ve bloklar önermesi için imzalama anahtarlarına, bir doğrulayıcı müşterisi tarafından kolayca erişilebilir olmalıdır. Bunların bir şekilde internete bağlı olması gerekir ve bu nedenle doğal olarak "kısayol" tuşları olarak kabul edilirler. Bu, doğrulayıcınızın onaylayabilmesi için bir gerekliliktir ve bu nedenle, para transfer etmek veya çekmek için kullanılan anahtarlar güvenlik nedeniyle ayrılmıştır.

Bu anahtarların tümü, 24 kelimelik mnemonik güvenlik kelimelerinizi kullanılarak her zaman tekrarlanabilir bir şekilde yeniden oluşturulabilir. <em>Bu tohum ifadesini güvenli bir şekilde yedeklediğinizden emin olun, aksi takdirde zamanı geldiğinde para çekme anahtarlarınızı oluşturamazsınız</em>.
</ExpandableCard>

<ExpandableCard title="Ne zaman geri çekebilirim?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
  Bir SaaS sağlayıcısıyla 32 ETH stake ettiğinizde, bu ETH hala resmi stake depozito sözleşmesine yatırılır. Bu nedenle, SaaS stakerları şu anda solo stakerlarla aynı para çekme kısıtlamalarıyla sınırlıdır. Bu, ETH'nizi stake etmenin şu anda tek yönlü bir depozito olduğu anlamına gelir. Durum, Şanghay yükseltmesine kadar böyle olacak.
</ExpandableCard>

<ExpandableCard title="Kesik yersem ne olur?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Bir SaaS sağlayıcısı kullanarak, düğümünüzün çalışmasını başka birine emanet ediyorsunuz. Bu, sizin kontrolünüzde olmayan düşük düğüm performansı riskiyle birlikte gelir. Doğrulayıcınızın kesintiye uğraması durumunda, doğrulayıcı bakiyeniz cezalandırılacak ve doğrulayıcı havuzundan zorla kaldırılacaktır. Bu fonlar, protokol düzeyinde para çekme işlemleri etkinleştirilene kadar kilitlenecektir.

Herhangi bir garanti veya sigorta seçeneği hakkında daha fazla ayrıntı için bireysel SaaS sağlayıcısı ile iletişime geçin. Doğrulayıcı kurulumunuzun tam kontrolünün sizde olmasını tercih ediyorsanız, <a href="/staking/solo/">ETH'nizi tek başına nasıl stake edeceğiniz hakkında daha fazla bilgi edinin</a>.
</ExpandableCard>

## Daha fazla bilgi {#further-reading}

- [Staking hizmetlerini değerlendirmek](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
