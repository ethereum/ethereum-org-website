---
title: Danksharding
description: Ethereum'u ölçeklendirmek için birbirini izleyen iki güncelleme olan Proto-Danksharding ve Danksharding hakkında bilgi edinin.
lang: tr
summaryPoints:
  - Danksharding, Ethereum'un ölçeklenebilirliğini ve kapasitesini artırmak için çok aşamalı bir güncellemedir.
  - İlk aşama olan Proto-Danksharding, bloklara veri blob'ları ekler
  - Veri blob'ları, toplamalar için Ethereum'a veri göndermenin daha ucuz bir yolunu sunar ve bu maliyetler kullanıcılara daha düşük işlem ücretleri şeklinde yansıtılabilir.
  - Daha sonra, tam Danksharding, veri blob'larını doğrulama sorumluluğunu Düğüm alt kümelerine yayarak Ethereum'u saniyede 100.000'den fazla işleme ölçeklendirecektir.
---

**Danksharding**, [Ethereum](/)'un gerçekten ölçeklenebilir bir Blokzincir haline gelmesinin yoludur, ancak oraya ulaşmak için gereken birkaç Protokol güncellemesi vardır. **Proto-Danksharding** bu yolda bir ara adımdır. Her ikisi de Katman 2'deki işlemleri kullanıcılar için mümkün olduğunca ucuz hale getirmeyi amaçlar ve Ethereum'u saniyede 100.000'den fazla işleme ölçeklendirmelidir.

## Proto-Danksharding nedir? {#what-is-protodanksharding}

[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) olarak da bilinen Proto-Danksharding, [toplamalar](/layer-2/#rollups) için bloklara daha ucuz veri eklemenin bir yoludur. Adı, fikri öneren iki araştırmacıdan gelir: Protolambda ve Dankrad Feist. Tarihsel olarak toplamalar, işlemlerini `CALLDATA` içinde yayınladıkları için kullanıcı işlemlerini ne kadar ucuzlatabilecekleri konusunda sınırlı kalmışlardı.

Bu pahalıdır çünkü toplamalar veriye sadece kısa bir süreliğine ihtiyaç duysa da, tüm Ethereum Düğümleri tarafından işlenir ve sonsuza kadar zincir içi yaşar. Proto-Danksharding, gönderilebilen ve bloklara eklenebilen veri blob'larını tanıtır. Bu blob'lardaki verilere EVM tarafından erişilemez ve sabit bir süre sonra (yazının yazıldığı sırada 4096 dönem veya yaklaşık 18 gün olarak ayarlanmıştır) otomatik olarak silinir. Bu, toplamaların verilerini çok daha ucuza gönderebileceği ve tasarrufları son kullanıcılara daha ucuz işlemler şeklinde yansıtabileceği anlamına gelir.

<ExpandableCard title="Bloblar toplamaları neden daha ucuz hale getirir?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Toplamalar, işlemleri zincir dışı toplu işleme tabi tutarak ve ardından sonuçları Ethereum'da yayınlayarak Ethereum'u ölçeklendirmenin bir yoludur. Bir Rollup temel olarak iki bölümden oluşur: veri ve yürütme kontrolü. Veri, Ethereum'da yayınlanan durum değişikliğini üretmek için bir Rollup tarafından işlenen işlemlerin tam dizisidir. Yürütme kontrolü, önerilen durum değişikliğinin doğru olduğundan emin olmak için bu işlemlerin dürüst bir aktör (bir "kanıtlayıcı") tarafından yeniden yürütülmesidir. Yürütme kontrolünü gerçekleştirmek için, işlem verilerinin herkesin indirip kontrol edebileceği kadar uzun süre erişilebilir olması gerekir. Bu, Rollup sıralayıcısı tarafından yapılan herhangi bir dürüst olmayan davranışın kanıtlayıcı tarafından tespit edilip itiraz edilebileceği anlamına gelir. Ancak, sonsuza kadar erişilebilir olmasına gerek yoktur.

</ExpandableCard>

<ExpandableCard title="Blob verilerini silmek neden sorun olmaz?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Toplamalar, işlem verilerine yönelik taahhütleri zincir içi yayınlar ve ayrıca gerçek verileri veri blob'larında erişilebilir hale getirir. Bu, kanıtlayıcıların taahhütlerin geçerli olup olmadığını kontrol edebileceği veya yanlış olduğunu düşündükleri verilere itiraz edebileceği anlamına gelir. Düğüm düzeyinde, veri blob'ları fikir birliği istemcisinde tutulur. Fikir birliği istemcileri, verileri gördüklerini ve ağ etrafında yayıldığını onaylarlar. Veriler sonsuza kadar saklansaydı, bu istemciler şişer ve Düğümleri çalıştırmak için büyük donanım gereksinimlerine yol açardı. Bunun yerine, veriler her 18 günde bir Düğümden otomatik olarak budanır. Fikir birliği istemcisi onayları, kanıtlayıcıların verileri doğrulaması için yeterli fırsat olduğunu gösterir. Gerçek veriler, Rollup operatörleri, kullanıcılar veya diğerleri tarafından zincir dışı saklanabilir.

</ExpandableCard>

### Blob verileri nasıl doğrulanır? {#how-are-blobs-verified}

Toplamalar, yürüttükleri işlemleri veri blob'larında yayınlar. Ayrıca verilere yönelik bir "taahhüt" yayınlarlar. Bunu, verilere bir polinom fonksiyonu uydurarak yaparlar. Bu fonksiyon daha sonra çeşitli noktalarda değerlendirilebilir. Örneğin, son derece basit bir `f(x) = 2x-1` fonksiyonu tanımlarsak, bu fonksiyonu `x = 1`, `x = 2`, `x = 3` için değerlendirebilir ve `1, 3, 5` sonuçlarını elde edebiliriz. Bir kanıtlayıcı aynı fonksiyonu verilere uygular ve aynı noktalarda değerlendirir. Orijinal veriler değiştirilirse, fonksiyon aynı olmayacak ve dolayısıyla her noktada değerlendirilen değerler de aynı olmayacaktır. Gerçekte, taahhüt ve kanıt kriptografik fonksiyonlarla sarıldıkları için daha karmaşıktır.

### KZG nedir? {#what-is-kzg}

KZG, bir veri blob'unu küçük bir [kriptografik "taahhüde"](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) indirgeyen bir şemanın üç [orijinal yazarının](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) isimleri olan Kate-Zaverucha-Goldberg'in kısaltmasıdır. Bir Rollup tarafından gönderilen veri blob'unun, Rollup'ın hatalı davranmadığından emin olmak için doğrulanması gerekir. Bu, bir kanıtlayıcının taahhüdün geçerli olduğunu kontrol etmek için blob'daki işlemleri yeniden yürütmesini içerir. Bu, kavramsal olarak yürütme istemcilerinin Merkle kanıtlarını kullanarak katman 1'deki Ethereum işlemlerinin geçerliliğini kontrol etme şekliyle aynıdır. KZG, verilere bir polinom denklemi uyduran alternatif bir kanıttır. Taahhüt, polinomu bazı gizli veri noktalarında değerlendirir. Bir kanıtlayıcı, aynı polinomu veriler üzerine uydurur ve aynı değerlerde değerlendirerek sonucun aynı olup olmadığını kontrol eder. Bu, bazı toplamalar ve nihayetinde Ethereum Protokolünün diğer bölümleri tarafından kullanılan sıfır bilgi teknikleriyle uyumlu verileri doğrulamanın bir yoludur.

### KZG Seremonisi neydi? {#what-is-a-kzg-ceremony}

KZG seremonisi, Ethereum topluluğunun dört bir yanından birçok kişinin bazı verileri doğrulamak için kullanılabilecek gizli ve rastgele bir sayı dizisini toplu olarak oluşturmasının bir yoluydu. Bu sayı dizisinin bilinmemesi ve hiç kimse tarafından yeniden oluşturulamaması çok önemlidir. Bunu sağlamak için, seremonide yer alan her kişi bir önceki katılımcıdan bir dizi aldı. Daha sonra bazı yeni rastgele değerler oluşturdular (örneğin, tarayıcılarının fare hareketlerini ölçmesine izin vererek) ve bunu önceki değerle karıştırdılar. Daha sonra değeri bir sonraki katılımcıya gönderdiler ve yerel makinelerinden yok ettiler. Seremonideki bir kişi bunu dürüstçe yaptığı sürece, nihai değer bir saldırgan tarafından bilinemez olacaktır.

EIP-4844 KZG seremonisi halka açıktı ve on binlerce kişi kendi entropi (rastgelelik) katkılarını eklemek için katıldı. Toplamda 140.000'den fazla katkı sağlandı ve bu da onu türünün dünyadaki en büyük seremonisi haline getirdi. Seremoninin baltalanması için, bu katılımcıların %100'ünün aktif olarak dürüst olmaması gerekirdi. Katılımcıların bakış açısına göre, dürüst olduklarını biliyorlarsa, başka hiç kimseye güvenmelerine gerek yoktur çünkü seremoniyi güvence altına aldıklarını bilirler (N'de 1 dürüst katılımcı gereksinimini bireysel olarak karşılamışlardır).

<ExpandableCard title="KZG seremonisinden elde edilen rastgele sayı ne için kullanılır?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Bir Rollup bir blob'da veri yayınladığında, zincir içi yayınladıkları bir "taahhüt" sağlarlar. Bu taahhüt, verilere uydurulan bir polinomun belirli noktalarda değerlendirilmesinin sonucudur. Bu noktalar, KZG seremonisinde üretilen rastgele sayılarla tanımlanır. Kanıtlayıcılar daha sonra verileri doğrulamak için polinomu aynı noktalarda değerlendirebilirler - eğer aynı değerlere ulaşırlarsa veriler doğrudur.

</ExpandableCard>

<ExpandableCard title="KZG rastgele verileri neden gizli kalmalıdır?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Birisi taahhüt için kullanılan rastgele konumları biliyorsa, o belirli noktalara uyan yeni bir polinom (yani bir "çarpışma") üretmesi kolaydır. Bu, blob'a veri ekleyebilecekleri veya çıkarabilecekleri ve yine de geçerli bir kanıt sağlayabilecekleri anlamına gelir. Bunu önlemek için, kanıtlayıcılara gerçek gizli konumları vermek yerine, aslında eliptik eğriler kullanılarak kriptografik bir "kara kutu" içine sarılmış konumları alırlar. Bunlar, orijinal değerlerin tersine mühendislikle çözülemeyeceği şekilde değerleri etkili bir şekilde karıştırır, ancak bazı zekice cebir işlemleriyle kanıtlayıcılar ve doğrulayıcılar temsil ettikleri noktalardaki polinomları hala değerlendirebilirler.

</ExpandableCard>

<Alert variant="warning">
  Ne Danksharding ne de Proto-Danksharding, Blokzincir'i birden fazla parçaya bölmeyi amaçlayan geleneksel "parçalama (sharding)" modelini izlemez. Parça zincirleri artık yol haritasının bir parçası değildir. Bunun yerine Danksharding, Ethereum'u ölçeklendirmek için blob'lar arasında dağıtılmış veri örneklemesini kullanır. Bunun uygulanması çok daha basittir. Bu model bazen "veri parçalama (data-sharding)" olarak da adlandırılmıştır.
</Alert>

## Danksharding nedir? {#what-is-danksharding}

Danksharding, Proto-Danksharding ile başlayan Rollup ölçeklendirmesinin tam olarak hayata geçirilmesidir. Danksharding, toplamaların sıkıştırılmış işlem verilerini boşaltmaları için Ethereum'da devasa miktarda alan getirecektir. Bu, Ethereum'un yüzlerce bireysel Rollup'ı kolaylıkla destekleyebileceği ve saniyede milyonlarca işlemi gerçeğe dönüştürebileceği anlamına gelir.

Bunun çalışma şekli, bloklara eklenen blob'ları Proto-Danksharding'deki altı (6) adetten tam Danksharding'de 64'e çıkarmaktır. Gerekli olan diğer değişikliklerin tümü, yeni büyük blob'ları işleyebilmelerini sağlamak için fikir birliği istemcilerinin çalışma şekline yönelik güncellemelerdir. Bu değişikliklerin birçoğu, Danksharding'den bağımsız olarak başka amaçlar için zaten yol haritasındadır. Örneğin, Danksharding, teklifçi-oluşturucu ayrımı (PBS) uygulamasının gerçekleştirilmiş olmasını gerektirir. Bu, blok oluşturma ve blok önerme görevlerini farklı Doğrulayıcılar arasında ayıran bir güncellemedir. Benzer şekilde, Danksharding için veri kullanılabilirliği örneklemesi gereklidir, ancak bu aynı zamanda çok fazla geçmiş veri depolamayan çok hafif istemcilerin ("durumsuz istemciler") geliştirilmesi için de gereklidir.

<ExpandableCard title="Danksharding neden teklifçi-oluşturucu ayrımı gerektirir?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Bireysel Doğrulayıcıların 32 MB'lık blob verisi için pahalı taahhütler ve kanıtlar üretmek zorunda kalmasını önlemek için teklifçi-oluşturucu ayrımı (PBS) gereklidir. Bu, evde stake yapanlara çok fazla yük bindirir ve daha güçlü donanımlara yatırım yapmalarını gerektirir, bu da merkeziyetsizliğe zarar verir. Bunun yerine, uzmanlaşmış blok oluşturucular bu pahalı hesaplama işinin sorumluluğunu üstlenirler. Daha sonra, bloklarını yayınlamaları için blok teklifçilerine sunarlar. Blok teklifçisi sadece en karlı olan bloğu seçer. Herkes blob'ları ucuz ve hızlı bir şekilde doğrulayabilir, bu da herhangi bir normal Doğrulayıcının blok oluşturucuların dürüst davranıp davranmadığını kontrol edebileceği anlamına gelir. Bu, merkeziyetsizlikten ödün vermeden büyük blob'ların işlenmesine olanak tanır. Hatalı davranan blok oluşturucular ağdan kolayca atılabilir ve ceza kesintisine uğratılabilir - blok oluşturma karlı bir faaliyet olduğu için diğerleri onların yerini alacaktır.

</ExpandableCard>

<ExpandableCard title="Danksharding neden veri kullanılabilirliği örneklemesi gerektirir?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Doğrulayıcıların blob verilerini hızlı ve verimli bir şekilde doğrulaması için veri kullanılabilirliği örneklemesi gereklidir. Veri kullanılabilirliği örneklemesini kullanarak, Doğrulayıcılar blob verilerinin erişilebilir olduğundan ve doğru bir şekilde taahhüt edildiğinden çok emin olabilirler. Her Doğrulayıcı rastgele sadece birkaç veri noktasını örnekleyebilir ve bir kanıt oluşturabilir, bu da hiçbir Doğrulayıcının tüm blob'u kontrol etmek zorunda olmadığı anlamına gelir. Herhangi bir veri eksikse, hızlı bir şekilde tespit edilecek ve blob reddedilecektir.

</ExpandableCard>

### Mevcut ilerleme {#current-progress}

Tam Danksharding'e daha birkaç yıl var. Bu arada, KZG seremonisi 140.000'den fazla katkıyla sonuçlandı ve Proto-Danksharding için [EIP](https://eips.ethereum.org/EIPS/eip-4844) olgunlaştı. Bu teklif tüm test ağlarında tam olarak uygulandı ve Mart 2024'te Cancun-Deneb ("Dencun") ağ güncellemesi ile Ana Ağ'da yayına girdi.

### Daha fazla okuma {#further-reading}

- [Proto-Danksharding notları](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Dankrad'ın Danksharding üzerine notları](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto ve Vitalik Danksharding'i tartışıyor](https://www.youtube.com/watch?v=N5p0TB77flM)
- [KZG seremonisi](https://ceremony.ethereum.org/)
- [Carl Beekhuizen'in güvenilir kurulumlar üzerine Devcon konuşması](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Blob'lar için veri kullanılabilirliği örneklemesi hakkında daha fazlası](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist'in KZG taahhütleri ve kanıtları üzerine yazısı](https://youtu.be/8L2C6RDMV9Q)
- [KZG polinom taahhütleri](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)