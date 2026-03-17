---
title: "Çeviri programı kılavuzu"
lang: tr
description: "Bir çeviri programı kurmaya yönelik ipuçları ve önemli hususlar koleksiyonu"
---

# Çeviri Programı Kılavuzu {#translation-program-playbook}

İngilizce, dünyada en çok konuşulan dillerden biridir ve açık ara dünyanın en çok öğrenilen dilidir. İngilizce internette, özellikle de sosyal medyada kullanılan en yaygın dil olduğundan ve çok dilli programlama dilleri kıt olduğundan, blokzincir alanındaki içeriğin büyük çoğunluğu doğal olarak İngilizce yazılmıştır.

Ancak, dünyadaki 6 milyardan fazla insanın (nüfusun %75'inden fazlası) hiç İngilizce konuşmaması, dünya nüfusunun büyük çoğunluğu için Ethereum'a girişte büyük bir engel teşkil etmektedir.

Bu nedenle, bu alandaki giderek artan sayıda proje, içeriklerini farklı dillere çevirtmeyi ve küresel topluluklar için yerelleştirmeyi hedefliyor.

Çok dilli içerik sağlamak, küresel topluluğunuzu büyütmenin, İngilizce bilmeyenlere eğitim vermenin, içeriğinizin ve iletişimlerinizin daha geniş bir kitleye ulaşmasını sağlamanın ve bu alana daha fazla insanı dahil etmenin basit ve etkili bir yoludur.

Bu kılavuz, içerik yerelleştirmesi hakkındaki yaygın zorlukları ve yanlış kanıları ele almayı amaçlamaktadır. İçerik yönetimi, çeviri ve gözden geçirme süreci, kalite güvencesi, çevirmenlere ulaşma ve yerelleştirme sürecinin diğer hayati yönleri için adım adım bir kılavuz sunmaktadır.

## İçerik Yönetimi {#content-management}

Çeviri içerik yönetimi, çeviri iş akışını otomatikleştirme sürecini ifade eder; bu da tekrarlayan manuel iş ihtiyacını ortadan kaldırır, verimliliği ve kaliteyi artırır, daha iyi kontrol sağlar ve iş birliğini mümkün kılar.

Yerelleştirme sürecinde içerik yönetimine, içeriğe ve ihtiyaçlarınıza bağlı olarak birçok farklı yaklaşım vardır.

İçeriği yönetmenin temel yolu, kaynak ve hedef metni içeren iki dilli dosyalar oluşturmaktır. Bu, basitlik dışında önemli bir avantaj sunmadığı için çeviride nadiren kullanılır.

Çeviri ajansları genellikle çeviri yönetimine, proje yönetimi yetenekleri sağlayan ve dosyalar, içerik ve dilbilimciler üzerinde çok daha fazla kontrol imkanı tanıyan çeviri yönetimi yazılımı veya yerelleştirme araçları kullanarak yaklaşır.

İçerik yönetimi hakkında daha fazlasını okuyun:

[Trados'a göre çeviri yönetimi nedir?](https://www.trados.com/solutions/translation-management/)

[Phrase'e göre çok dilli içerik yönetimi](https://phrase.com/blog/posts/multilingual-content-management/)

### Çeviri Yönetim Yazılımı {#translation-management-software}

Pek çok çeviri yönetim sistemi ve yerelleştirme aracı vardır ve yazılım seçimi temel olarak ihtiyaçlarınıza bağlıdır.

Bazı projeler çeviri yönetim sistemlerini kullanmamayı ve çevirileri manuel olarak (doğrudan iki dilli dosyalarda veya GitHub gibi barındırma hizmetlerinde) halletmeyi tercih etse de bu durum kontrolü, verimliliği, kaliteyi, ölçeklenebilirliği ve iş birliği olanaklarını önemli ölçüde azaltır. Böyle bir yaklaşım, küçük ölçekli veya tek seferlik çeviri projeleri için en faydalısı olabilir.

En güçlü ve yaygın olarak kullanılan çeviri yönetimi araçlarından bazılarına hızlı bir bakış:

**Kitle kaynak ve iş birliği için en iyisi**

[Crowdin](https://crowdin.com/)

- Açık kaynaklı projeler için ücretsizdir (sınırsız sayıda dize ve proje)
- TM ve terimler sözlüğü tüm planlarda mevcuttur
- 60'tan fazla desteklenen dosya biçimi, 70'ten fazla API entegrasyonu

[Lokalise](https://lokalise.com/)

- 2 ekip üyesi için ücretsiz, daha fazla katılımcı için ücretli planlar (çoğu plan için sınırlı sayıda dize)
- TM ve terimler sözlüğü bazı ücretli planlarda mevcuttur
- 30'dan fazla desteklenen dosya biçimi, 40'tan fazla API entegrasyonu

[Transifex](https://www.transifex.com/)

- Yalnızca ücretli planlar (çoğu plan için sınırlı sayıda dize)
- TM ve terimler sözlüğü tüm ücretli planlarda mevcuttur
- 30'dan fazla desteklenen dosya biçimi, 20'den fazla API entegrasyonu

[Phrase](https://phrase.com/)

- Yalnızca ücretli planlar (tüm planlar için sınırsız sayıda dize, sınırlı sayıda proje ve ekip üyesi)
- TM ve terimler sözlüğü bazı ücretli planlarda mevcuttur
- 40'tan fazla desteklenen dosya biçimi, 20'den fazla API entegrasyonu

[Smartcat](https://www.smartcat.com/)

- Ücretli gelişmiş özelliklere sahip temel ücretsiz plan (tüm planlar için sınırsız sayıda dize ve proje)
- TM ve terimler sözlüğü tüm planlarda mevcuttur
- 60'tan fazla desteklenen dosya biçimi, 20'den fazla API entegrasyonu

[POEditor](https://poeditor.com/)

- Açık kaynaklı projeler için ücretsizdir (tüm projeler için sınırlı sayıda dize, açık kaynaklı projeler için sınırsız)
- TM ve terimler sözlüğü ücretli planlarda mevcuttur
- 20'den fazla desteklenen dosya biçimi, 10'dan fazla API entegrasyonu

ve diğerleri...

**Profesyonel çeviri araçları**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Serbest çevirmenler ve ekipler için ücretli planlar
- Çok güçlü bilgisayar destekli çeviri (CAT) aracı ve çevirmen verimliliği yazılımı

[MemoQ](https://www.memoq.com/)

- Gelişmiş özellikler için çeşitli ücretli planların yanı sıra sınırlı bir ücretsiz sürümü de mevcuttur
- Şirketler, dil hizmeti sağlayıcıları ve çevirmenler için çeviri yönetim yazılımı

[Memsource](https://www.memsource.com/)

- Bireysel çevirmenler için ücretsiz, ekipler için çeşitli ücretli planlar
- Bulut tabanlı bilgisayar destekli çeviri ve çeviri yönetim sistemi

ve diğerleri...

Çeviri yönetim yazılımı hakkında daha fazlasını okuyun:

[Wikipedia'da çeviri yönetim sistemleri tanımı](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase'e göre her çeviri yönetim yazılımının sahip olması gereken 7 şey](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ'ya göre çeviri yönetim sistemi nedir?](https://www.memoq.com/tools/what-is-a-translation-management-system)

[Gengo'nun en iyi 16 çeviri yönetim sistemi listesi](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## İş Akışı {#workflow}

Çeviri alanında, çeviri iş akışı birbiriyle bir şekilde ilişkili olan ve projeniz için önemli hususlar içeren birkaç farklı anlama gelebilir.

Aşağıda her ikisini de inceleyeceğiz.

**Anlam 1**

Bu, muhtemelen çeviri iş akışları hakkında en yaygın düşünme biçimidir ve genellikle iş akışı kelimesi duyulduğunda akla gelen şeydir.

Özünde bu, çeviriler hakkında düşünmeye başlamaktan çevrilmiş içeriği ürününüzde kullanmaya kadar uzanan 'iş akışıdır'.

Bu durumda örnek bir iş akışı şöyle olabilir:

1. **Dosyaları çeviriye hazırlama** – Kulağa basit gelse de birkaç önemli şeyi göz önünde bulundurmanız gerekir. Bu adımda, tüm sürecin nasıl işlemesi gerektiğine dair net bir planınız olmalıdır.

- _Hangi dosya türlerini kullanacaksınız?_ Çevrilmiş dosyalarınızı hangi formatta almak istersiniz?_
  - İçeriğiniz DOCX veya MD formatında mevcutsa, yaklaşım, tanıtım belgenizin veya diğer belgelerinizin PDF sürümünü çevirmenize kıyasla çok daha basit olacaktır.
- _Hangi yerelleştirme araçları bu dosya türünü destekliyor?_ Dosya, orijinal biçimlendirmeyi koruyacak şekilde çevrilebilir mi?_
  - Tüm dosya türleri doğrudan yerelleştirmeyi desteklemez (örneğin PDF dosyaları, resim dosyaları) ve tüm yerelleştirme araçları da tüm dosya türlerini desteklemez.
- _İçeriği kim çevirecek?_ Profesyonel çeviriler mi yaptıracaksınız yoksa gönüllülere mi güveneceksiniz?_
  - Bu, vermeniz gereken bir dizi başka kararı da etkiler. Örneğin, profesyonel çevirmenler gelişmiş yerelleştirme araçlarıyla çalışırken gönüllülere göre daha rahattır.
- _Dilbilimcilerden beklentileriniz nelerdir?_ Bir dil hizmeti sağlayıcısı kullanıyorsanız, sizden ne bekliyorlar?_
  - Bu, hedeflerinizin, beklentilerinizin ve zaman çizelgelerinizin uyumlu olduğundan emin olma adımıdır.
- _Çevrilecek tüm içerik eşit derecede önemli mi?_ Bazı içerikler önce mi çevrilmeli?_
  - Önce çevrilmesi ve uygulanması gereken belirli içeriğe öncelik vermenin bazı yolları vardır. Örneğin, çevrilecek çok fazla içeriğiniz varsa, çevirmenlerin hangisine öncelik vermeleri gerektiğinin farkında olmalarını sağlamak için sürüm kontrolünü kullanabilirsiniz.

2. **Çeviri için dosyaları paylaşma** – Bu adım aynı zamanda uzun vadeli düşünmeyi de gerektirir ve kaynak dosyaları bir dil hizmeti sağlayıcısına göndermek kadar basit değildir.

- _İçeriği kim çevirecek?_ _Bu sürece kaç kişi dahil olacak?_
  - Bir yerelleştirme aracı kullanmayı planlıyorsanız, kaynak dosyaları doğrudan araca yükleyebileceğiniz için bu adım basitleşir. Çeviri süreci barındırma hizmetinde gerçekleşiyorsa da bu geçerlidir, çünkü kaynak dosyaların hiçbir yere dışa aktarılması gerekmez.
- _Kaynak dosyalar manuel olarak mı işlenecek yoksa bu süreç otomatikleştirilebilir mi?_
  - Çoğu yerelleştirme aracı, dosya yönetimi sürecinin bir tür entegrasyonuna veya otomasyonuna izin verir. Öte yandan, bireysel çevirmenlerle çalışıyorsanız ve bir yerelleştirme aracı kullanmıyorsanız, yüzlerce veya binlerce çevirmene manuel olarak kaynak dosyaları göndermek ölçeklenebilir bir süreç değildir.
- _Yerelleştirme için hangi araçlar kullanılacak?_
  - Bu sorunun cevabı, diğer her şeye nasıl yaklaşacağınızı belirleyecektir. Doğru aracı seçmek; içerik yönetimini otomatikleştirmenize, Çeviri Belleğini ve Terimler Sözlüğünü yönetmenize, çevirmenleri yönetmenize, çeviri/gözden geçirme ilerlemesini takip etmenize vb. yardımcı olabilir, bu yüzden biraz zaman ayırın ve hangi aracı kullanmak istediğiniz konusunda biraz araştırma yapın. Bir yerelleştirme aracı kullanmayı planlamıyorsanız, yukarıdakilerin tümünün manuel olarak yapılması gerekir.
- _Çeviri süreci ne kadar sürecek?_ Ne kadara mal olacak?_
  - Bu noktada, kaynak dosyaları dil hizmeti sağlayıcısı veya çevirmen havuzu ile paylaşmaya hazır olmalısınız. Dil hizmeti sağlayıcısı, kelime sayısını analiz etmenize ve çeviri süreci için ücretleri ve zaman çizelgesini içeren bir teklif sunmanıza yardımcı olabilir.
- _Bu süreçte kaynak içerikte değişiklik/güncelleme yapmayı planlıyor musunuz?_
  - İçeriğiniz dinamikse ve sık sık değişiyorsa, herhangi bir değişiklik veya güncelleme çeviri ilerlemesini kesintiye uğratabilir. Bir Çeviri Belleği kullanmak bunu önemli ölçüde azaltmaya yardımcı olabilir, ancak yine de sürecin nasıl işleyeceğini ve çevirmenlerin kaydettiği ilerlemeyi engellemekten nasıl kaçınabileceğinizi düşünmek önemlidir.

3. **Çeviri sürecini yönetme** – Kaynak içerik dil hizmeti sağlayıcısına veya çevirmenlere teslim edildikten sonra işiniz bitmez. Çevirilerin en iyi kalitede olmasını sağlamak için içerik oluşturucuları çeviri sürecine mümkün olduğunca dahil olmalıdır.

- _Çevirmenlerle nasıl iletişim kurmayı planlıyorsunuz?_
  - Bir yerelleştirme aracı kullanmayı planlıyorsanız iletişim doğrudan araç üzerinden gerçekleşebilir. Çevirmenlerle alternatif bir iletişim kanalı kurmanız da tavsiye edilir, çünkü size ulaşmaktan daha az çekinebilirler ve mesajlaşma araçları daha serbest bir iletişime olanak tanır.
- _Çevirmenlerden gelen sorular nasıl ele alınmalı?_ Bu soruları kim cevaplamalı?_
  - Çevirmenler (hem profesyonel hem de profesyonel olmayan) genellikle açıklama veya ek bağlam için sorular ve taleplerin yanı sıra geri bildirim ve iyileştirme fikirleriyle size ulaşacaktır. Bu soruları yanıtlamak genellikle daha iyi etkileşime ve çevrilen içeriğin kalitesinin artmasına yol açabilir. Onlara mümkün olduğunca çok kaynak sağlamak da değerlidir (örneğin, kılavuzlar, ipuçları, terminoloji yönergeleri, SSS'ler vb.).
- _İnceleme süreci nasıl ele alınmalı?_ Bunu dışarıdan birine mi yaptırmak istersiniz, yoksa şirket içinde inceleme yapacak kapasiteniz var mı?_
  - Her zaman gerekli olmasa da, incelemeler en uygun çeviri sürecinin ayrılmaz bir parçasıdır. Genellikle inceleme sürecini profesyonel incelemecilere dış kaynak olarak vermek en kolay yoldur. Ancak, büyük bir uluslararası ekibiniz varsa, incelemeler veya Kalite Güvencesi (QA) dahili olarak da halledilebilir.

4. **Çevrilmiş içeriği uygulama** – İş akışının son kısmı olsa da, önceden dikkate alınması yine de önemlidir.

- _Tüm çeviriler aynı anda mı tamamlanacak?_
  - Eğer değilse, hangi çevirilere öncelik verilmesi gerektiğini, devam eden çevirilerin nasıl takip edileceğini ve çeviriler yapılırken uygulamanın nasıl ele alınacağını düşünmelisiniz.
- _Çevrilen içerik size nasıl teslim edilecek?_ Hangi formatta olacak?_
  - Hangi yaklaşımı kullanırsanız kullanın, bu önemli bir husustur. Yerelleştirme araçları, hedef dosya formatı ve dışa aktarma süreci üzerinde kontrol sahibi olmanızı sağlar ve genellikle barındırma hizmetiyle entegrasyonu etkinleştirerek otomasyonu destekler.
- _Çevirileri projenizde nasıl uygulayacaksınız?_
  - Bazı durumlarda bu, çevrilmiş dosyayı yüklemek veya belgelerinize eklemek kadar basit olabilir. Ancak web sitesi veya uygulama çevirileri gibi daha karmaşık projelerde, kodun uluslararasılaştırmayı desteklediğinden emin olmalı ve uygulama sürecinin önceden nasıl ele alınacağını belirlemelisiniz.
- _Biçimlendirme kaynaktan farklı olursa ne olur?_
  - Yukarıdakine benzer şekilde, basit metin dosyalarını çeviriyorsanız biçimlendirme muhtemelen çok önemli değildir. Ancak, bir web sitesi veya uygulama içeriği gibi daha karmaşık dosyalarda, projenizde uygulanabilmesi için biçimlendirmenin ve kodun kaynakla aynı olması gerekir. Değilse, hedef dosyaların ya çevirmenler ya da geliştiricileriniz tarafından düzenlenmesi gerekir.

**Anlam 2**

Dahili kararları ve yaklaşımları hesaba katmayan alternatif bir çeviri iş akışı. Buradaki temel husus, içeriğin akışının kendisidir.

Bu durumda örnek bir iş akışı şöyle olabilir:

1. _Çeviri → Uygulama_

- En basit iş akışı, çevirinin muhtemelen insan çevirisi olacağıdır, çünkü uygulamadan önce kaliteyi değerlendirmek ve çevirileri düzenlemek için bir inceleme veya kalite güvencesi (QA) süreci yoktur.
- Bu iş akışında, çevirmenlerin belirli bir kalite seviyesini koruyabilmeleri önemlidir, bu da proje yöneticileri ve çevirmenler arasında uygun kaynakları ve iletişimi gerektirecektir.

2. _Çeviri → İnceleme → Uygulama_

- Çevirilerin kalitesinin kabul edilebilir ve tutarlı olmasını sağlamak için bir inceleme ve düzenleme süreci içeren daha gelişmiş bir iş akışı.
- Bu iş akışına yönelik bir dizi yaklaşım vardır; çeviriler profesyonel çevirmenler veya gönüllüler tarafından yapılabilirken, inceleme süreci muhtemelen hedef dilde uyulması gereken tüm dilbilgisi ve yazım kurallarına aşina olan profesyonel incelemeciler tarafından ele alınacaktır.

3. _Çeviri → İnceleme → Kalite Güvence (QA) → Uygulama_

- En yüksek kalite seviyesini sağlamak için en uygun iş akışı. Kalite güvencesi her zaman gerekli olmasa da, çeviri ve incelemeden sonra çevrilmiş metnin kalitesi hakkında size daha iyi bir fikir vermesi açısından faydalı olabilir.
- Bu iş akışıyla, çeviriler yalnızca gönüllüler veya hatta makine çevirisi tarafından yapılabilir. İnceleme süreci profesyonel çevirmenler tarafından yapılmalı, kalite güvencesi ise bir dil hizmeti sağlayıcısı tarafından veya hedef dillerde anadili konuşan çalışanlarınız varsa şirket içinde yapılabilir.

Çeviri iş akışları hakkında daha fazlasını okuyun:

[Content Rules'a göre çeviri iş akışının beş aşaması](https://contentrules.com/creating-translation-workflow/)

[Smartling'e göre çeviri iş akışı yönetimi nedir](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans'a göre çeviri iş akışı](https://www.rixtrans.com/translation-workflow)

## Terminoloji Yönetimi {#terminology-management}

Terminolojinin nasıl ele alınacağına dair net bir plan oluşturmak, çevirilerinizin kalitesini ve tutarlılığını sağlamak ve çevirmenlerinize zaman kazandırmak için en önemli adımlardan biridir.

Çeviri alanında bu, terminoloji yönetimi olarak bilinir ve dil hizmeti sağlayıcılarının, dilbilimci havuzlarına erişim ve içerik yönetiminin yanı sıra müşterilerine sundukları temel hizmetlerden biridir.

Terminoloji yönetimi, projeniz için önemli olan ve her zaman doğru ve tutarlı bir şekilde çevrilmesi gereken terminolojiyi belirleme, toplama ve yönetme sürecini ifade eder.

Terminoloji yönetimi hakkında düşünmeye başlarken izlenmesi gereken birkaç adım vardır:

- Terim tabanına dahil edilmesi gereken anahtar terimleri belirleyin.
- Terimler ve tanımlarından oluşan bir terimler sözlüğü oluşturun.
- Terimleri çevirin ve terimler sözlüğüne ekleyin.
- Çevirileri kontrol edin ve onaylayın.
- Terimler sözlüğünü koruyun ve önemli hale geldikçe yeni terimlerle güncelleyin.

Terminoloji yönetimi hakkında daha fazlasını okuyun:

[Trados'a göre terminoloji yönetimi nedir](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific'e göre terminoloji yönetimi neden önemlidir](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation'a göre terminoloji yönetimi nedir ve neden önemlidir](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Çeviri Belleği (TM) ve Terimler Sözlüğü {#tm-and-glossary}

Çeviri Belleği (TM) ve Terimler Sözlüğü, çeviri endüstrisinde önemli araçlardır ve çoğu dil hizmeti sağlayıcısının güvendiği bir şeydir.

Bu terimlerin ne anlama geldiğine ve birbirlerinden nasıl farklı olduklarına bakalım:

**Çeviri belleği (TM)** – Daha uzun metin blokları, tam cümleler, paragraflar ve bireysel terimler de dahil olmak üzere bölümleri veya dizeleri, ayrıca her dildeki mevcut ve önceki çevirilerini otomatik olarak depolayan bir veritabanıdır.

Çoğu yerelleştirme aracı, çeviri yönetim sistemi ve bilgisayar destekli çeviri aracının yerleşik çeviri bellekleri vardır ve bunlar genellikle dışa aktarılabilir ve diğer benzer araçlarda da kullanılabilir.

Bir çeviri belleği kullanmanın faydaları arasında daha hızlı çeviriler, daha iyi çeviri kalitesi, kaynak içeriği güncellerken veya değiştirirken belirli çevirileri koruma yeteneği ve tekrarlayan içerik için daha ucuz çeviri maliyetleri bulunur.

Çeviri bellekleri, farklı segmentler arasındaki yüzde eşleşmesine göre çalışır ve genellikle iki segment aynı içeriğin %50'sinden fazlasını içerdiğinde en kullanışlıdır. Ayrıca, %100 eşleşen tekrarlayan segmentleri otomatik olarak çevirmek için de kullanılırlar, böylece tekrarlayan içeriği birden fazla kez çevirme ihtiyacını ortadan kaldırırlar.

Çeviri bellekleri hakkında daha fazlasını okuyun:

[Memsource'ta çeviri bellekleri](https://www.memsource.com/translation-memory/)

[Smartling'e göre çeviri belleği nedir](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Terimler Sözlüğü –** Önemli veya hassas terimlerin, tanımlarının, işlevlerinin ve yerleşik çevirilerinin bir listesidir. Bir terimler sözlüğü ile bir çeviri belleği arasındaki temel fark, bir terimler sözlüğünün otomatik olarak oluşturulmaması ve tam cümle çevirileri içermemesidir.

Çoğu yerelleştirme aracı, çeviri yönetim sistemi ve bilgisayar destekli çeviri aracının, projeniz için önemli terminolojiyi içerdiğinden emin olmak için sürdürebileceğiniz yerleşik terimler sözlükleri vardır. TM gibi, terimler sözlüğü de genellikle dışa aktarılabilir ve diğer yerelleştirme araçlarında kullanılabilir.

Çeviri projenize başlamadan önce, çevirmenleriniz ve incelemecileriniz için bir terimler sözlüğü oluşturmak için biraz zaman ayırmanız şiddetle tavsiye edilir. Bir terimler sözlüğü kullanmak, önemli terimlerin doğru çevrilmesini sağlar, çevirmenlere çok ihtiyaç duyulan bağlamı sağlar ve çevirilerde tutarlılığı garanti eder.

Terimler sözlükleri çoğunlukla hedef dillerde yerleşik çeviriler içerse de, bunlar olmadan da kullanışlıdırlar. Yerleşik çeviriler olmasa bile, bir terimler sözlüğü teknik terimlerin tanımlarını içerebilir, çevrilmemesi gereken terimleri vurgulayabilir ve çevirmenlere belirli bir terimin isim, fiil, özel isim veya başka bir sözcük türü olarak kullanılıp kullanılmadığını bildirebilir.

Terimler sözlükleri hakkında daha fazlasını okuyun:

[Lionbridge'e göre çeviri terimler sözlüğü nedir](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex'te terimler sözlükleri](https://docs.transifex.com/glossary/glossary)

Projeniz için bir yerelleştirme aracı kullanmayı planlamıyorsanız, muhtemelen bir çeviri belleği ve terimler sözlüğü kullanamayacaksınız (bir excel dosyasında bir terimler sözlüğü veya terim tabanı oluşturabilirsiniz, ancak otomatik terimler sözlükleri çevirmenlerin terimleri ve tanımlarını manuel olarak arama ihtiyacını ortadan kaldırır).

Bu, tüm tekrarlayan ve benzer içeriğin her seferinde manuel olarak çevrilmesi gerektiği anlamına gelir. Ayrıca, çevirmenler belirli bir terimin çevrilmesi gerekip gerekmediği, metinde nasıl kullanıldığı ve bir terimin zaten yerleşik bir çevirisi olup olmadığı konusunda sorularla size ulaşmak zorunda kalacaklardır.

_ethereum.org çeviri belleğini ve terimler sözlüğünü projenizde kullanmak ister misiniz?_ Bize translations@ethereum.org adresinden ulaşın._

## Çevirmenlere Ulaşma {#translator-outreach}

**Bir dil hizmeti sağlayıcısıyla çalışma**

Bir dil hizmeti sağlayıcısıyla ve onların profesyonel çevirmenleriyle çalışıyorsanız bu bölüm sizin için pek geçerli olmayabilir.

Bu durumda, birçok dilde ihtiyacınız olan tüm hizmetleri (örneğin çeviri, inceleme, Kalite Güvence) sağlama kapasitesine sahip bir dil hizmeti sağlayıcısı seçmek önemlidir.

Yalnızca sundukları oranlara göre bir dil hizmeti sağlayıcısı seçmek cazip gelse de, en büyük dil hizmeti sağlayıcılarının daha yüksek oranlara sahip olmasının bir nedeni olduğunu belirtmek önemlidir.

- Veritabanlarında on binlerce dilbilimci bulunur, bu da projenize özel sektörünüz hakkında yeterli deneyime ve bilgiye sahip çevirmenler (yani teknik çevirmenler) atayabilecekleri anlamına gelir.
- Farklı projelerde çalışma ve müşterilerinin çeşitli ihtiyaçlarını karşılama konusunda önemli deneyime sahiptirler. Bu, özel iş akışınıza uyum sağlama, çeviri süreciniz için değerli öneriler ve potansiyel iyileştirmeler sunma ve ihtiyaçlarınızı, gereksinimlerinizi ve son teslim tarihlerinizi karşılama olasılıklarının daha yüksek olduğu anlamına gelir.
- En büyük dil hizmeti sağlayıcılarının çoğunun kullanabileceğiniz kendi yerelleştirme araçları, çeviri bellekleri ve terimler sözlükleri de vardır. Eğer yoksa, en azından havuzlarında, çevirmenlerinin kullanmak istediğiniz herhangi bir yerelleştirme aracına aşina olmalarını ve bunlarla çalışabilmelerini sağlayacak kadar dilbilimci bulunur.

[2021 Nimdzi 100 raporunda](https://www.nimdzi.com/nimdzi-100-top-lsp/), dünyanın en büyük dil hizmeti sağlayıcılarının derinlemesine bir karşılaştırmasını, her biri hakkında bazı ayrıntıları ve sağladıkları hizmetlere, coğrafi verilere vb. göre dökümleri bulabilirsiniz.

**Profesyonel olmayan çevirmenlerle çalışma**

Profesyonel olmayan çevirmenlerle çalışıyor ve çeviri yapmanıza yardımcı olacak gönüllüler arıyor olabilirsiniz.

İnsanlara ulaşmanın ve onları projenize katılmaya davet etmenin birkaç yolu vardır. Bu, büyük ölçüde ürününüze ve halihazırda ne kadar büyük bir topluluğa sahip olduğunuza bağlı olacaktır.

Gönüllüleri dahil etmenin bazı yolları aşağıda özetlenmiştir:

**Ulaşım –** Bu, aşağıdaki noktalarda bir şekilde ele alınsa da, potansiyel gönüllülere ulaşmak ve çeviri girişiminizden haberdar olmalarını sağlamak kendi başına etkili olabilir.

Birçok insan en sevdikleri projelere dahil olmak ve katkıda bulunmak ister, ancak genellikle geliştirici olmadan veya özel teknik becerilere sahip olmadan bunu yapmanın net bir yolunu göremezler. Projeniz hakkında farkındalık yaratabilirseniz, birçok iki dilli insan muhtemelen dahil olmaya istekli olacaktır.

**Topluluğunuz içinde arama –** Bu alandaki çoğu projenin zaten büyük ve aktif toplulukları vardır. Topluluk üyelerinizin çoğu muhtemelen projeye basit bir şekilde katkıda bulunma şansını takdir edecektir.

Açık kaynaklı projelere katkıda bulunmak genellikle içsel motivasyona dayansa da, aynı zamanda harika bir öğrenme deneyimidir. Projeniz hakkında daha fazla bilgi edinmek isteyen herkes, muhtemelen bir çeviri programına gönüllü olarak katılmaktan memnuniyet duyacaktır, çünkü bu, önemsedikleri bir şeye katkıda bulunmuş olmaları gerçeğini yoğun bir uygulamalı öğrenme deneyimiyle birleştirmelerini sağlayacaktır.

**Ürününüzde girişimden bahsetme –** Ürününüz popülerse ve çok sayıda insan tarafından kullanılıyorsa, çeviri programınızı vurgulamak ve kullanıcıları ürünü kullanırken eyleme çağırmak son derece etkili olabilir.

Bu, uygulamalar ve web siteleri için ürününüze bir CTA (eylem çağrısı) içeren bir banner veya açılır pencere eklemek kadar basit olabilir. Bu etkilidir çünkü hedef kitleniz topluluğunuzdur - ilk etapta dahil olma olasılığı en yüksek olan kişilerdir.

**Sosyal medya –** Sosyal medya, çeviri programınız hakkında farkındalık yaratmak ve topluluk üyelerinize ve henüz topluluğunuzun üyesi olmayan diğer kişilere ulaşmak için etkili bir yol olabilir.

Bir Discord sunucunuz veya Telegram kanalınız varsa, bunu erişim, çevirmenlerinizle iletişim ve katkıda bulunanlarınızı takdir etmek için kullanmak kolaydır.

X (eski adıyla Twitter) gibi platformlar, yeni topluluk üyelerini dahil etmek ve katkıda bulunanlarınızı herkese açık bir şekilde takdir etmek için de yararlı olabilir.

Linux Vakfı, açık kaynak katılımcılarını ve motivasyonlarını analiz eden kapsamlı bir [2020 FOSS katılımcı anketi Raporu](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf) hazırlamıştır.

## Sonuç {#conclusion}

Bu belge, her çeviri programının bilmesi gereken bazı temel hususları içermektedir. Bu kesinlikle kapsamlı bir kılavuz değildir, ancak çeviri endüstrisinde hiç deneyimi olmayan herkesin projesi için bir çeviri programı düzenlemesine yardımcı olabilir.

Farklı araçların, süreçlerin ve bir çeviri programını yönetmenin kritik yönlerinin daha ayrıntılı talimatlarını ve dökümlerini arıyorsanız, en büyük dil hizmeti sağlayıcılarından bazıları bloglar tutar ve genellikle yerelleştirme sürecinin farklı yönleri hakkında makaleler yayınlar. Yukarıdaki konulardan herhangi birine daha derinlemesine dalmak ve yerelleştirme sürecinin profesyonel olarak nasıl çalıştığını anlamak istiyorsanız, bunlar en iyi kaynaklardır.

Her bölümün sonunda bazı ilgili bağlantılar bulunmaktadır; ancak, çevrimiçi olarak daha birçok kaynak bulabilirsiniz.

İş birliği teklifleri veya ethereum.org Çeviri Programını sürdürerek edindiğimiz ek bilgiler, öğrenimler ve en iyi uygulamalar için translations@ethereum.org adresinden bize ulaşmaktan çekinmeyin.
