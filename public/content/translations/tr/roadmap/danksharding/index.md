---
title: Danksharding (Dank Parçalama)
description: Proto-Danksharding ve Danksharding hakkında bilgi edinin - Ethereumun ölçeklendirilmesi hakkında iki ardışık yükseltme.
lang: tr
summaryPoints:
  - Danksharding Ethereum'un ölçeklenebilirliği ve kapasitesini geliştirmek için yapılmış çok aşamalı bir yükseltmedir.
  - İlk bölümde, Proto-Danksharding, bloklara veri damlaları ekliyor
  - Veri damlaları Toplamaların Ethereuma veri gönderebilmesi için daha ucuz bir yol sağlıyor ve söz konusu masraflar kullanıcılara daha düşük işlem masrafları olarak yansıtılabiliyor.
  - Daha sonra, tam Danksharding Düğümlerin alt kümelerindeki veri damlalarını onaylamanın sorumluluğunu alıyor ve sonrasında Ethereum'u saniyede 100.000 işleme kadar ölçeklendirebilecek.
---

# Danksharding {#danksharding}

**Danksharding**, Ethereum'un gerçekten ölçeklenebilir bir blok zinciri haline gelme yöntemidir, ancak bu noktaya ulaşmak için birkaç protokol yükseltmesi gerekir. **Proto-Danksharding** bu yolda atılan bir ara adımdır. Her ikisi de Katman 2'deki işlemleri kullanıcılar için mümkün olduğunca ucuz hale getirmeyi ve Ethereum'u saniyede 100.000'den fazla işleme ölçeklendirmeyi amaçlamaktadır.

## Proto-Danksharding nedir? {#what-is-protodanksharding}

[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) olarak da bilinen Proto-Danksharding, [rollup'ların](/layer-2/#rollups) bloklara daha ucuz veri eklemesinin bir yoludur. Bu iki kavramın isimleri fikri ortaya atan araştırmacılardan gelmektedir: Protolambda ve Dankrad Feist. Tarihsel olarak, rollup'lar kullanıcı işlemlerini ne kadar ucuzlatabilecekleri konusunda, işlemlerini `CALLDATA` içinde yayınlamaları gerçeğiyle sınırlıydı.

Bu, tüm Ethereum düğümleri tarafından işlendiği ve sonsuza kadar zincir üstünde kaldığı için pahalıdır, oysa rollup'lar verilere yalnızca kısa bir süre için ihtiyaç duyar. Proto-Danksharding, bloklara gönderilebilen ve eklenebilen veri kümelerini blob'larını kullanıma sunuyor. Bu blob'lardaki verilere EVM tarafından erişilemez ve bu veriler belirli bir zaman aralığından sonra otomatik olarak silinir (bu belgenin yazımı sırasında 4096 dönem veya yaklaşık 18 gün olarak ayarlanmıştır). Bu, toplamaların verilerini çok daha ucuza gönderebileceklerini ve birikimleri de son kullanıcılara ucuz işlemler adı altında aktarabileceği anlamına gelir.

<ExpandableCard title="Blob'lar rollup'ları neden daha ucuz hâle getiriyor?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollup'lar, işlemleri zincir dışında gruplayarak ve ardından sonuçları Ethereum'a göndererek Ethereum'u ölçeklendirmenin bir yoludur. Bir Toplama esas olarak iki bölümden oluşur, veri ve yürütme kontrolü. Veri, Ethereum'a gönderilen durum değişikliğini üretmek için bir toplama tarafından işlenen bir işlem sekansıdır. Yürütme kontrolü, işlemlerin dürüst bir aktör ("kanıtlayıcı) tarafından teklif edilen durum değişikliğinin doğru olduğundan emin olunması için tekrar uygulanmasıdır. İşlem verileri, yürütme kontrolünü yapabilmek için herkesin indirip kontrol edebileceği kadar uzun süre erişilebilir olmalıdır. Bu toplama sıralayıcısının herhangi bir dürüst olmayan davranışın kanıtlayıcı tarafından cezalandırılabileceği anlamına gelir. Ancak, sonsuza kadar da ulaşılabilir olmasına gerek yoktur.

</ExpandableCard>

<ExpandableCard title="Blob verilerini silmek neden sorun değil?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollup'lar, işlem verilerine yönelik taahhütlerini zincir üzerinde yayınlar ve ayrıca asıl veriyi de veri bloblarında kullanılabilir hale getirir. Bu, kanıtlayıcıların taahhütlerin geçerli olup olmadığını ve yanlış olduğunu düşündüğü verileri bildirebileceği anlamına gelir. Düğüm seviyesinde, veri düğümleri fikir birliği istemcisinde tutulur. Fikir birliği istemcileri veriyi gördüklerini ve ağ içinde yayıldığını kanıtlarlar. Eğer veri sonsuza kadar tutulsaydı, bu istemciler şişer ve düğümleri çalıştırabilmek için büyük donanım gerekliliklerine ihtiyaç duyulurdu. Bunun yerine, veriler her 18 günde bir düğümden otomatik olarak silinir. Fikir birliği istemcisi kanıtlayıcıları veriyi onaylamak için yeterince fırsat olduğunu belirtirler. Asıl veri; rollup operatörleri, kullanıcılar ya da başkaları tarafından zincir dışında tutulabilir.

</ExpandableCard>

### Veri damlaları nasıl onaylanır? {#how-are-blobs-verified}

Toplamalar, yürüttükleri işlemleri veri blob'larına gönderir. Ayrıca veri için bir "taahhüt" de gönderirler. Bunu, verilere polinom bir fonksiyon sığdırıp yaparlar. Artık bu fonksiyon çeşitli noktalarda değerlendirilebilir. Örneğin, `f(x) = 2x-1` gibi son derece basit bir fonksiyon tanımlarsak, bu fonksiyonu `x = 1`, `x = 2`, `x = 3` için değerlendirerek `1, 3, 5` sonuçlarını elde edebiliriz. Bir kanıtlayıcı aynı uygulamayı verilere uygular ve aynı noktalarda onu değerlendirir. Eğer orijinal veri değişmişse, fonksiyon aynı olmaz; bu yüzden her noktadaki değerler de farklı ölçülür. Gerçekte, taahhüt ve kanıt biraz daha karmaşıktır çünkü bunlar kriptografik fonksiyonlara sarılıdır.

### KZG nedir? {#what-is-kzg}

KZG, bir veri blobunu küçük bir [kriptografik "taahhüde"](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) indirgeyen bir şemanın üç [orijinal yazarının](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) (Kate-Zaverucha-Goldberg) adlarının baş harflerinden oluşur. Bir toplama tarafından gönderilen veri blob'unun, toplamanın hatalı davranmadığından emin olmak adına doğrulanması gerekir. Bu, bir kanıtlayıcının taahhüdün geçerliliğini kontrol etmek için blob'daki işlemleri yeniden yürütmesini gerektirir. Bu, yürütüm istemcilerinin Merkle kanıtlarını kullanarak Ethereum işlemlerinin geçerliliğini sorgulamasıyla kavramsal olarak aynıdır. KZG, verilere polinom denklemi yerleştiren alternatif bir kanıttır. Taahhüt, polinomu bazı gizli veri noktalarında değerlendirir. Kanıtlayıcı aynı polinomu tekrar tekrar veriye yerleştirir ve aynı değerlerle değerlendirirse, sonuç da hep aynı olur. Bu verinin sıfır bilgi teknikleriyle uyumlu olduğunu onaylamak için bazı toplamalar ve haliyle Ethereum protokolünün farklı bölümleri tarafından kullanılan bir yöntemdir.

### KZG Töreni neydi? {#what-is-a-kzg-ceremony}

KZG töreni, Ethereum topluluğundan birçok kişinin toplu olarak bazı verileri doğrulamak için gizli bir rastgele sayı dizisi oluşturmasını sağlayan bir yöntemdi. Bu sayı dizilerinin kimse tarafından bilinmemesi ve tekrar oluşturulmaması çok önemlidir. Bundan sağlamak için törene katılan her kişi önceki katılımcıdan bir dizi aldı. Sonrasında yeni rastgele değerler oluşturdular (ör. tarayıcılarının farelerinin hareketini ölçmesine izin vererek) ve bunu önceki değerle karıştırdılar. Daha sonrasında, değeri sıradaki katılımcıya gönderdiler ve kendi yerel makinelerinden tamamen sildiler. Törende bir kişi bunu dürüstçe yaptığı sürece, nihai değer saldırgan tarafından bilinemez.

EIP-4844 KZG töreni herkese açıktı ve on binlerce insan kendi entropisini (rastgelelik) eklemek için katıldı. Toplamda 140.000'den fazla katkı yapılarak dünyanın bu türden en büyük töreni gerçekleştirildi. Bu törenin baltanabilmesi için, katılımcıların %100'ünün aktif olarak sahtekar olması gerekirdi. Katılımcıların gözünde, eğer kendilerinin dürüst olduklarını biliyorlarsa, başkalarına güvenmeye gerek yoktu çünkü kendilerinin zaten töreni güvende tuttuklarını biliyorlardı (N'de 1 dürüst katılımcı gerekliliğini kişisel olarak sağlamışlardı).

<ExpandableCard title="KZG seremonisinden gelen rastgele sayı ne için kullanılıyor?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Bir rollup, bir blob içinde veri yayınladığında, zincir üzerinde yayınladığı bir "taahhüt" sunar. Bu taahhüt belli başlı noktalara polinom yerleştirmenin değerlendirilmesinin bir sonucudur. Bu noktalar, KZG töreninde oluşturulan rastgele numaralar tarafından tanımlanır. Kanıtlayıcılar veriyi onaylamak için polinomu aynı noktalarda değerlendirebilirler - eğer aynı değerlere ulaştılarsa veri doğrudur.

</ExpandableCard>

<ExpandableCard title="KZG rastgele verilerinin neden gizli kalması gerekiyor?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Biri taahhüt için kullanılan rastgele konumları biliyorsa, o belirli noktalara uyan yeni bir polinom (yani bir "çarpışma") oluşturması kolaydır. Bu, damlaya veri ekleyip damladan veri çıkarabilecekleri ve buna rağmen geçerli kanıt sunabilecekleri anlamına gelir. Bunu önlemek için, kanıtlayıcılara asıl gizli lokasyonları vermek yerine, bu lokasyonları eliptik eğriler kullanılarak oluşturulmuş kriptografik bir "kara kutu" içinde alırlar. Bunlar bu değerleri orijinal değerlerin ters mühendislik yapılamayacağı etkili bir yolla karıştıtırlar, ancak zeki matematikçi kanıtlayıcılar ve onaylayıcılar yine de polinomları ve temsil ettiği yerleri bulabilir ve değerlendirebilirler.

</ExpandableCard>

<Alert variant="warning" className="mb-8">
  Ne Danksharding ne de Proto-Danksharding, blokzinciri birden fazla parçaya ayırmayı hedefleyen geleneksel "parçalama" modelini uygulamaz. Parça zincirleri artık yol haritasının bir parçası değildir. Bunun yerine, "Danksharding", Ethereum'u ölçeklendirmek için damlalar etrafında dağıtılmış veri örneklendirmesini kullanır. Bu, uygulanması çok daha kolay bir yöntemdir. Bu modele bazen "veri parçalama" da denir.
</Alert>

## DankSharding nedir? {#what-is-danksharding}

Danksharding, Proto-Danksharing ile başlayan toplama ölçeklemesinin tamamen gerçekleştirilmesidir. Danksharding, sıkıştırılmış işlem verilerini boşaltabilmek adına Ethereum'a toplamalar için fazla miktarda alan sağlayacaktır. Bu da Ethereum'un yüzlerce bağımsız toplamayı kolaylıkla destekleyebileceği ve saniyede milyonlarca işlem gerçekleştirebileceği anlamına gelir.

Bunun çalışma biçimi, Proto-Danksharding'de bloklara bağlı blob'ların sayısının altıdan (6) tam Danksharding'de 64'e çıkarılması şeklindedir. Diğer gerekli değişiklikler, fikir birliği istemcilerinin yeni büyük damlalarla başa çıkabilmek için gereken çalışma biçimindeki güncellemelerdir. Bu değişiklerden bazıları, Danksharding'den bağımsız sebeplerden dolayı halihazırda yol haritasında bulunmaktadır. Örneğin, Danksharding, "önerici-inşa edici" ayrımının uygulanmış olmasını gerektirir. Bu, blok inşası ve blok önerisi görevlerini farklı doğrulayıcılara dağıtan bir yükseltmedir. Benzer şekilde Danksharding için, veri ulaşılabilirliği örneklemi gereklidir. Ancak, aynı zamanda yüklü miktarda geçmiş verileri depolamayan hafif istemcilerin (durumsuz istemciler) geliştirilmesinde de gereklidir.

<ExpandableCard title="Danksharding neden önerici-inşa edici ayrımı gerektiriyor?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Önerici-inşa edici ayrımı, bağımsız doğrulayıcıların 32 MB'lik damla verileri için yüksek maliyetli taahhüt ve kanıt oluşturmak zorunda kalmalarını engellemek için gereklidir. Çünkü bu durum yerel paydaşlar için zorluğa ve güçlü donanıma yatırım yapma gerekliliğine sebep olacak ve merkeziyetsizliğe zarar verecektir. Bunun yerine, özelleştirilmiş blok inşa edicileri bu maliyetli hesaplama işinin sorumluluğunu alır. Sonrasında bloklarını, blok önericilerinin yayın yapabilmesi için erişime açarlar. Blok önericileri basitçe en kârlı bloku seçerler. Herkes damlaları ucuz ve hızlı bir şekilde doğrulayabilir. Bu da demek olur ki, herhangi bir normal doğrulayıcı blok inşa edicilerinin dürüst davranıp davranmadığını kontrol edebilir. Bu da merkeziyetsizlikten feragat edilmeden büyük damlaların işlenebilmesini sağlar. Uygunsuz davranışta bulunan blok inşa edicileri ağdan dışarı atılır ve yatırdığı paranın bir kısmını (yaklaşık 1/32'sini) kaybeder. Blok inşa etme görevi kazançlı bir aktivite olduğu için diğer insanlar bu kişilerin yerini alacaktır.

</ExpandableCard>

<ExpandableCard title="Danksharding neden veri kullanılabilirliği örneklemesi gerektiriyor?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Veri kullanılabilirliği örneklendirmesi, doğrulayıcıların hızlı ve etkili bir şekilde damla verilerini doğrulayabilmesi için gereklidir. Veri kullanılabilirliği örneklendirmesi kullanılarak, doğrulayıcılar damla verisinin kullanılabilir ve doğru şekilde taahhüt edilmiş olduğundan çok emin olabilirler. Her doğrulayıcı rastgele birkaç veri noktası örnekleyerek kanıt oluşturabilir. Yani hiçbir doğrulayıcının bütün damlayı kontrol etmesi gerekmez. Veri kaybı olması durumunda, hızlıca tespit edilir ve damla reddedilir.

</ExpandableCard>

### Mevcut ilerleme {#current-progress}

Full Danksharding için birkaç yıl daha beklememiz gerekiyor. Bu esnada, KZG töreni 140.000'den fazla katkıyla tamamlandı ve Proto-Danksharding için olan [EIP](https://eips.ethereum.org/EIPS/eip-4844) olgunlaştı. Bu öneri, tüm test ağlarında tam olarak uygulanmış ve Mart 2024'te Cancun-Deneb ("Dencun") ağ yükseltmesi ile Ana Ağda faaliyete alınmıştır.

### Daha fazla kaynak {#further-reading}

- [Proto-Danksharding notları](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dankrad'ın Danksharding üzerine notları](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto ve Vitalik, Danksharding'i tartışıyor](https://www.youtube.com/watch?v=N5p0TB77flM)
- [KZG töreni](https://ceremony.ethereum.org/)
- [Carl Beekhuizen'in güvenilir kurulumlar üzerine Devcon konuşması](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Blob'lar için veri kullanılabilirliği örneklemesi hakkında daha fazlası](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [KZG taahhütleri ve kanıtları üzerine Dankrad Feist](https://youtu.be/8L2C6RDMV9Q)
- [KZG polinom taahhütleri](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
