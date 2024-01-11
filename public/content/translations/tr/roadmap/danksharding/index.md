---
title: Danksharding
description: Proto-Danksharding ve Danksharding hakkında bilgi edinin - Ethereumun ölçeklendirilmesi hakkında iki ardışık yükseltme.
lang: tr
summaryPoints:
  - Danksharding Ethereum'un ölçeklenebilirliği ve kapasitesini geliştirmek için yapılmış çok aşamalı bir yükseltmedir.
  - İlk bölümde, Proto-Danksharding, bloklara veri damlaları ekliyor
  - Veri damlaları Toplamaların Ethereuma veri gönderebilmesi için daha ucuz bir yol sağlıyor ve söz konusu masraflar kullanıcılara daha düşük işlem masrafları olarak yansıtılabiliyor.
  - Daha sonra, tam Danksharding Düğümlerin alt kümelerindeki veri damlalarını onaylamanın sorumluluğunu alıyor ve sonrasında Ethereum'u saniyede 100.000 işleme kadar ölçeklendirebilecek.
---

# Danksharding {#danksharding}

**Danksharding** Ethereum'un nasıl tamamen ölçeklendirebilir bir blok zincire dönüşebilir sorusunun cevabı, ancak o noktaya gelebilmek için yapılması gereken birkaç protokol yükseltmesi var. **Proto-Danksharding** de bu yolun ortalarında bulunan bir adım. İkisi de Katman 2'deki işlemleri kullanıcılar için mümkün olduğu kadar ucuz tutmaya ve Ethereumu >saniyede 100.000 işleme kadar ölçeklendirebilmeyi hedefliyor.

## Proto-Danksharding nedir? {#what-is-protodanksharding}

Proto-Danksharding, [ EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) olarak da bilinir, [toplamaların](/layer2/#rollups) bloklara daha uygun veri ekleyebilmesi için bir yöntemdir. Bu iki kavramın isimleri fikri ortaya atan araştırmacılardan gelmektedir: Protolambda ve Dankrad Feist. İşlemlerini `CALLDATA`'ya kaydettikleri için toplamalar şu an için kullanıcı işlemlerini ne kadar uyguna yapabilecekleri konusunda sınırlandırılmışlardır. Bu çok pahalı çünkü Ethereum düğümleri tarafından işleniyor ve toplamaların veriye kısa bir süre ihtiyaç duymasına rağmen zincirde sonsuza kadar yaşıyor. Proto-Danksharding bloklara takılıp gönderilebilen veri damlalarını tanıtıyor. Bu veri damlaları Ethereum Sanal Makinesi için erişilebilir değildir ve belli bir süreden sonra otomatik olarak silinir (1-3 ay). Bu, toplamaların verilerini çok daha ucuza gönderebileceklerini ve birikimleri de son kullanıcılara ucuz işlemler adı altında aktarabileceği anlamına gelir.

<ExpandableCard title="Damlalar Toplamaları neden daha ucuz hale getirir?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Toplamalar Ethereum'u ölçeklendirmek için Zincir dışındaki işlemleri harmanlayarak ve sonrasında da Ethereum'a sonuçları göndererek uygulanan yollardır. Bir Toplama esas olarak iki bölümden oluşur, veri ve yürütme kontrolü. Veri, Ethereum'a gönderilen durum değişikliğini üretmek için bir toplama tarafından işlenen bir işlem sekansıdır. Yürütme kontrolü, işlemlerin dürüst bir aktör ("kanıtlayıcı) tarafından teklif edilen durum değişikliğinin doğru olduğundan emin olunması için tekrar uygulanmasıdır. Yürütme kontrolünün yapılması için, işlem verisi herkesin yükleyebileceği ve kontrol edebileceği kadar uzun süredir ulaşılabilir olmalıdır. Bu toplama sıralayıcısının herhangi bir dürüst olmayan davranışın kanıtlayıcı tarafından cezalandırılabileceği anlamına gelir. Ancak, sonsuza kadar da ulaşılabilir olmasına gerek yoktur.

</ExpandableCard>

<ExpandableCard title="Damla verilerini silmek neden sorun çıkarmaz?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Toplamalar, Zincir üstündeki işlem verilerine taahhütler gönderirler ve ayrıca asıl veriyi de veri damlalarında ulaşılabilir kılarlar. Bu, kanıtlayıcıların taahhütlerin geçerli olup olmadığını ve yanlış olduğunu düşündüğü verileri bildirebileceği anlamına gelir. Düğüm seviyesinde, veri düğümleri fikir birliği istemcisinde tutulur. Fikir birliği istemcileri veriyi gördüklerini ve ağ içinde yayıldığını kanıtlarlar. Eğer veri sonsuza kadar tutulsaydı, bu istemciler şişer ve düğümleri çalıştırabilmek için büyük donanım gerekliliklerine ihtiyaç duyulurdu. Bunun yerine, her 1 ila 3 ayda bir veri otomatik olarak düğümden çıkarılır. Fikir birliği istemcisi kanıtlayıcıları veriyi onaylamak için yeterince fırsat olduğunu belirtirler. Asıl veri; toplama operatörleri, kullanıcılar ya da başkaları tarafından zincir dışında tutulabilir.

</ExpandableCard>

### Veri damlaları nasıl onaylanır? {#how-are-blobs-verified}

Toplamalar veri damlalarında uyguladığı işlemleri gönderirler. Ayrıca veri için bir "taahhüt" de gönderirler. Bunu veriye polinom bir fonksiyon sığdırıp yaparlar. Artık bu fonksiyon çeşitli noktalarda değerlendirilebilir. Örneğin aşırı basit bir fonksiyonu ele alırsak, `f(x) = 2x-1`, bu fonksiyonu sonrasında `x = 1`, `x = 2`, `x = 3` için de değerlendirebiliriz ve vereceği sonuçlar `1, 3, 5` olur. Bir kanıtlayıcı aynı uygulamayı veriye uygular ve aynı noktalarda onu değerlendirir. Eğer orijinal veri değişmişse, fonksiyon aynı olmayacaktır, bu yüzden her noktadaki değerler de farklı ölçülecektir. Gerçekte, taahhüt ve kanıt biraz daha karmaşık çünkü bunlar kriptografik fonksiyonlarda sarılıdır.

### KZG nedir? {#what-is-kzg}

KZG'nin açılımı Kate-Zaverucha-Goldberg'dür. Bunlar [bir](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) veri blokunu daha küçük bir veri blokuna indirgeyen bir [şemanın 3 orijinal yazarıdır: "kriptografik taahhüt"](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Veri damları, toplama tarafından girilir ve toplamanın yanlış davranmadığına dair onaylanması şarttır. Bu bir kanıtlayıcının veri damlası içindeki işlemleri taahhütün geçerliliği için tekrar uygulamasını kapsar. Bu, kavramsal olarak yürütüm istemcisilerinin Merkle kanıtlarını kullanarak Ethereum işlemlerinin geçerliliğini sorgulamasıyla aynıdır. KZG verinin içine polinom fonksiyon yerleştiren alternatif bir kanıttır. Taahhüt, polinomu bazı gizli veri noktalarında değerlendirir. Kanıtlayıcı aynı polinomu tekrar tekrar veriye yerleştirir ve aynı değerlerle değerlendirirse, sonuç da hep aynı olur. Bu verinin sıfır bilgi teknikleriyle uyumlu olduğunu onaylamak için bazı toplamalar ve haliyle Ethereum protokolünün farklı bölümleri tarafından kullanılan bir yoldur.

### KZG Töreni nedir? {#what-is-a-kzg-ceremony}

KZG Töreni, Ethereum topluluğundan birçok insanın beraber veri onaylamak için kullanmak üzere yazdığı rastgele bir dizidir. Bu sayı dizilerinin kimse tarafından bilinmemesi ve tekrar oluşturulmaması çok önemlidir. Bundan emin olmak için, törene katılan herkes önceki katılımcıdan bir dizi alır. Sonra kendileri bazı yeni değerler oluştururlar (örnek: internet tarayıcısının mouse hareketini ölçmesine izin vermek) ve önceki değerlerle karıştırırlar. Sonrada bu değeri bir sonraki katılımcıya gönderirler ve yerel cihazlarından silerler. Törendeki bir kişi bunu dürüst yaptığı sürece, son değer saldırgan için bilinemez olacak. EIP-4844 KZG töreni hâlâ açıktı ve on binlerce insan kendi entropilerini eklemek için katıldı. Bu törenin baltanabilmesi için, katılımcıların %100'ünün aktif olarak sahtekar olması gerekirdi. Katılımcıların gözünde, eğer kendilerinin dürüst olduklarını biliyorlarsa, başkalarına güvenmeye gerek yoktu çünkü kendilerinin zaten töreni güvende tuttuklarını biliyorlardı (N'de 1 dürüst katılımcı gerekliliğini kişisel olarak sağlamışlardı).

<ExpandableCard title="KZG töreninde kullanılan rastgele numara nedir?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Bir toplama, damlada veri yayınladığında, zincirde yayınladıkları bir taahhüt sağlarlar. Bu taahhüt belli başlı noktalara polinom yerleştirmenin değerlendirilmesinin bir sonucudur. Bu noktalar, KZG töreninde oluşturulan rastgele numaralar tarafından tanımlanır. Kanıtlayıcılar veriyi onaylamak için polinomu aynı noktalarda değerlendirebilirler - eğer aynı değerlere ulaştılarsa veri doğrudur.

</ExpandableCard>

<ExpandableCard title="KZG rastgele verileri neden gizli tutulmalıdır?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Eğer biri bu taahhüt için kullanılan rastgele lokasyonları biliyorsa, söz konusu spesifik noktalara (ör. "çarpışma") oturacak yeni polinomlar yazmak onlar için kolaydır. Bu, damlaya veri ekleyip damladan veri çıkarabilecekleri ve buna rağmen geçerli kanıt sunabilecekleri anlamına gelir. Bunu önlemek için, kanıtlayıcılara asıl gizli lokasyonları vermek yerine, bu lokasyonları eliptik eğriler kullanılarak oluşturulmuş kriptografik bir "kara kutu" içinde alırlar. Bunlar bu değerleri orijinal değerlerin ters mühendislik yapılamayacağı etkili bir yolla karıştıtırlar, ancak zeki matematikçi kanıtlayıcılar ve onaylayıcılar yine de polinomları ve temsil ettiği yerleri bulabilir ve değerlendirebilirler.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Ne Danksharding ne de Proto-Danksharding blok zinciri çoklu parçalara ayırmayı hedeflemiş olan geleneksel "Parçalama"ya uymaz. Parça zincirleri artık yol haritasının bir parçası değildir. Bunun yerine, "Danksharding", Ethereum'u ölçeklendirmek için damlalar etrafında dağıtılmış veri örneklendirmesini kullanır. Bu, uygulanması çok daha kolay bir yöntemdir. Bu modele bazen "veri parçalama" da denir.
</InfoBanner>

## DankSharding nedir? {#what-is-danksharding}

Danksharding, Proto-Danksharing ile başlayan toplama ölçeklemesinin tamamen gerçekleştirilmesidir. Danksharding, sıkıştırılmış işlem verilerini boşaltabilmek adına Ethereum'a toplamalar için fazla miktarda alan sağlayacaktır. Bu da Ethereum'un yüzlerce bağımsız toplamayı kolaylıkla destekleyebileceği ve saniyede milyonlarca işlem gerçekleştirebileceği anlamına gelir.

Bunun çalışma mantığı damlaların, Proto-Danksharding'teki bloklara bağlı 1'den tam Danksharding'deki 64'e genişletilmesidir. Diğer gerekli değişiklikler, fikir birliği istemcilerinin yeni büyük damlalarla başa çıkabilmek için gereken çalışma biçimindeki güncellemelerdir. Bu değişiklerden bazıları, Danksharding'den bağımsız sebeplerden dolayı halihazırda yol haritasında bulunmaktadır. Örneğin, Danksharding, "önerici-inşa edici" ayrımının uygulanmış olmasını gerektirir. Bu, blok inşası ve blok önerisi görevlerini farklı doğrulayıcılara dağıtan bir yükseltmedir. Benzer şekilde Danksharding için, veri ulaşılabilirliği örneklemi gereklidir. Ancak, aynı zamanda yüklü miktarda geçmiş verileri depolamayan hafif istemcilerin (durumsuz istemciler) geliştirilmesinde de gereklidir.

<ExpandableCard title="Danksharding neden, önerici-inşa edici ayrımına ihtiyaç duyuyor?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Önerici-inşa edici ayrımı, bağımsız doğrulayıcıların 32 MB'lik damla verileri için yüksek maliyetli taahhüt ve kanıt oluşturmak zorunda kalmalarını engellemek için gereklidir. Çünkü bu durum yerel paydaşlar için zorluğa ve güçlü donanıma yatırım yapma gerekliliğine sebep olacak ve merkeziyetsizliğe zarar verecektir. Bunun yerine, özelleştirilmiş blok inşa edicileri bu maliyetli hesaplama işinin sorumluluğunu alır. Sonrasında bloklarını, blok önericilerinin yayın yapabilmesi için erişime açarlar. Blok önericileri basitçe en kârlı bloku seçerler. Herkes damlaları ucuz ve hızlı bir şekilde doğrulayabilir. Bu da demek olur ki, herhangi bir normal doğrulayıcı blok inşa edicilerinin dürüst davranıp davranmadığını kontrol edebilir. Bu da merkeziyetsizlikten feragat edilmeden büyük damlaların işlenebilmesini sağlar. Uygunsuz davranışta bulunan blok inşa edicileri ağdan dışarı atılır ve yatırdığı paranın bir kısmını (yaklaşık 1/32'sini) kaybeder. Blok inşa etme görevi kazançlı bir aktivite olduğu için diğer insanlar bu kişilerin yerini alacaktır.

</ExpandableCard>

<ExpandableCard title="Danksharding neden veri kullanılabilirliği örneklendirmesine ihtiyaç duyuyor?" eventCateogry="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Veri kullanılabilirliği örneklendirmesi, doğrulayıcıların hızlı ve etkili bir şekilde damla verilerini doğrulayabilmesi için gereklidir. Veri kullanılabilirliği örneklendirmesi kullanılarak, doğrulayıcılar damla verisinin kullanılabilir ve doğru şekilde taahhüt edilmiş olduğundan çok emin olabilirler. Her doğrulayıcı rastgele birkaç veri noktası örnekleyerek kanıt oluşturabilir. Yani hiçbir doğrulayıcının bütün damlayı kontrol etmesi gerekmez. Veri kaybı olması durumunda, hızlıca tespit edilir ve damla reddedilir.

</ExpandableCard>

### Güncel ilerleme {#current-progress}

Full Danksharding için birkaç yıl daha beklememiz gerekiyor. Ancak, Proto-Danksharding nispeten daha yakın bir tarihte gelecektir. Yazım zamanında (Şubat 2023) KZG töreni hâlâ açık ve şu ana kadar toplam 50000 kişiyi katkıda bulunacak kadar etkiledi. Proto-Danksharding için [EIP](https://eips.ethereum.org/EIPS/eip-4844)'nin olgunlaştığını söyleyebiliriz, şartnamede anlaşıldı ve müşteriler şu anda yürütülen bazı testleri uygulayıp üretime hazır hale getirdi. Bundan sonraki adım ise, bu değişimleri halka açık bir Test Ağında denemek. [EIP 4844 hazırlık kontrolünü](https://github.com/ethereum/pm/blob/master/Breakout-Room/4844-readiness-checklist.md#client-implementation-status) takip ederek güncel durumdan haberdar kalabilirsiniz.

### Daha fazla bilgi {#further-reading}

- [Proto-Danksharding notları](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dankrad'ın Danksharding üzerine notları](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto ve Vitali Danksharding hakkında konuşuyor](https://www.youtube.com/watch?v=N5p0TB77flM)
- [KZG töreni](https://ceremony.ethereum.org/)
- [Carl Beekhuizen'in güvenilir kurumlarla ilgili Devcon konuşması](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Damlalar için veri kullanılabilirliği örneklendirmesi hakkında daha fazlası](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist'in KZG taahhütleri ve ispatları hakkındaki görüşleri](https://youtu.be/8L2C6RDMV9Q)
- [KZG polinom taahhütleri](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
