---
title: "EIP-7805: Çatallanma seçimi ile zorunlu kılınan dahil etme listeleri (FOCIL)"
description: "Ethereum araştırmacıları Thomas Thiery ve Julian Ma, geçerli işlemlerin blok oluşturucular tarafından sansürlenemeyeceğini garanti etmek için birleştirilmiş yerel dahil etme listelerini kullanan EIP-7805'i (FOCIL) inceliyor."
lang: tr
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Ethereum Cat Herders tarafından sunulan **PEEPanEIP**'in 141. bölümü. Sunucu Pooja Ranjan'a, Çatallanma Seçimi ile Zorunlu Kılınan Dahil Etme Listeleri'ni (FOCIL) açıklamak üzere Ethereum Vakfı'ndaki Sağlam Teşvikler Grubu (Robust Incentives Group) araştırmacıları ve [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805) ortak yazarları **Thomas Thiery** ve **Julian Ma** katılıyor: Ethereum'un neden protokol düzeyinde sansür direncine ihtiyaç duyduğu, mekanizmanın nasıl çalıştığı ve uygulamanın ne aşamada olduğu ele alınıyor.

*Bu döküm, Ethereum Cat Herders tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=cUGyLx-mf6I) erişilebilir bir kopyasıdır. Okunabilirliği artırmak amacıyla üzerinde ufak düzenlemeler yapılmıştır.*

### Giriş (0:35) {#introduction-035}

**Pooja Ranjan:** Merhaba ve Ethereum Geliştirme Tekliflerini derinlemesine incelediğimiz ve ekosistem üzerindeki etkilerini keşfettiğimiz tek program olan PEEPanEIP'ye hoş geldiniz. Ethereum Cat Herders tarafından sunulan 141. bölümdeyiz. Ben sunucunuz Pooja Ranjan ve bugün EIP-7805, Çatallanma seçimiyle zorunlu kılınan Dahil Etme Listeleri hakkında konuşuyoruz.

Kasım 2024'te belgelenen EIP-7805, şu anda taslak durumunda olan standartlar yolunda bir çekirdek tekliftir. Bu teklif, bir doğrulayıcı komitesinin her bloka bir dizi işlemi zorla dahil etmesine olanak tanımayı amaçlamaktadır. Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann ve Jihoon Song tarafından ortaklaşa yazılan teklif, gelecekteki bir güncelleme için aktif olarak tartışılmaktadır.

Bu bölümde, EIP-7805'in ayrıntılarını, doğuracağı sonuçları ve Ethereum ekosistemi üzerindeki potansiyel etkisini keşfedeceğiz. Teklif hakkında daha fazla konuşmak üzere Thomas Thiery ve Julian Ma bize katılıyor. PEEPanEIP'ye hoş geldiniz.

**Thomas Thiery:** Bizi ağırladığınız için teşekkürler.

**Julian Ma:** Evet, bizi ağırladığınız için çok teşekkür ederiz.

**Pooja Ranjan:** Teklife genel bakış, bugün hangi aşamada olduğu ve onu Ethereum Ana Ağı üzerinde ne kadar yakında görebileceğimiz hakkında bilgi edinmek için heyecanlıyız. Ancak başlamadan önce, topluluğumuz bu çalışmaların arkasındaki araştırmacıları ve geliştiricileri tanımayı çok seviyor. Bize biraz kendinizden, şu anda dahil olduğunuz projeden ve Ethereum ekosistemindeki yolculuğunuzdan bahsedebilir misiniz?

### Konuk tanıtımları (2:14) {#guest-introductions-214}

**Julian Ma:** Tabii, ben başlayabilirim. Ben Julian, tıpkı Thomas gibi Ethereum Vakfı'ndaki Sağlam Teşvikler Grubu'nda (Robust Incentives Group) araştırmacıyım. Sağlam Teşvikler Grubu, çok geniş anlamda Protokol ekonomisiyle ilgileniyor. Bazılarımız EIP-1559 gibi işlem ücreti mekanizmalarını incelerken, diğerleri çoğunlukla ekonomik teşviklerle motive edilen mutabakat katmanı saldırılarını araştırıyor.

Bana gelince, taban ücret türevlerini incelediğim bir stajla başladım ve sonrasında tam zamanlı olarak katıldım. Çoğunlukla teklifçi-oluşturucu ayrımı (PBS) ve MEV ile ilgili konular üzerinde çalışıyorum ve şimdi bu EIP ile FOCIL aracılığıyla dahil etme listelerine odaklanıyorum ve onaylayıcı-teklifçi ayrımını dört gözle bekliyorum. Daha teorik çalışmalarla başlayıp bunu umarım Ethereum içinde teklif edilip uygulanabilecek bir EIP'ye doğru taşıyan bu süreç aracılığıyla araştırmayı üretime geçirme konusunda çok heyecanlı olduğumu söyleyebilirim.

**Thomas Thiery:** Ben Thomas. Ben de Ethereum Vakfı'nda Sağlam Teşvikler Grubu'nda araştırma yapıyorum. Geçmişim aslında sinirbilim alanında bir doktoraya dayanıyor, ki bu çok farklı bir alandı. Ancak Blokzincirler ve dağıtık sistemler ilgimi çekti, biraz farklı bir şey denemek istedim ve Dune adında bir kripto veri şirketine katıldım. Orada bir süre kaldım ama sonra araştırma yapmayı özledim ve şanslıyım ki EF'ye (Ethereum Vakfı) ve Sağlam Teşvikler Grubu'na katılabildim, ki bu şu ana kadar harikaydı.

Benzer konular üzerinde çalıştım. Katıldığımda MEV oldukça popülerdi. İlginç bir şekilde, ilk araştırma yazılarım çok kısaydı ancak dahil etme gecikmeleri ve sansür direnci üzerineydi. Yakın zamana kadar bu konunun pek derinlerine inmemiştim. Son altı aydan bir yıla kadar olan sürede sansür direnci ve dahil etme tarafında daha aktif oldum. Araştırma fikirleriyle başlayabilmek, çok ilginç olan ancak bahsedeceğimiz bazı detayları içermeyen önceki fikirleri geliştirmek, bir teklif ortaya koymak ve şimdi konuştuğum çoğu kişinin Ethereum'a iyi bir katkı olacağını düşündüğü uygulamalara ve geliştirici ağlarına sahip olmak gerçekten çok güzel.

**Pooja Ranjan:** Paylaştığınız için teşekkürler. Geliştiricilerin geçmişini öğrenmek her zaman ilham vericidir. Farklı alanlardan geldiklerini ve nihayetinde Ethereum ekosistemine katkıda bulunduklarını görmek ilginç. Anladığım kadarıyla bugün burada bir sunumumuz var. O halde daha fazla uzatmadan bir göz atalım.

### Sunum: FOCIL'in hedefleri (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Harika, çok teşekkür ederim. EIP-7805'in veya FOCIL'in nasıl çalıştığı ve bunu tam olarak neden yapmak istediğimiz hakkında küçük bir sunumla başlamak istiyorum. Amacı sohbeti başlatmak, bu yüzden sonrasında tartışmaya biraz yer bırakmak adına çok derinlemesine olmayacak.

FOCIL'in temel amacı, Ethereum'un güvenilir tarafsızlığını artırmaktır. FOCIL bunu, şu anda tek bir teklif edici veya blok oluşturucunun bir slot içinde sahip olduğu dahil etme tekeline son vererek yapar. Bunun yerine FOCIL, birden fazla doğrulayıcının her bir bloka işlemleri dahil ederek bir blok oluşturmaya katkıda bulunmasına olanak tanır.

Daha üst düzey hedef, zincir tarafsızlığı adını verdiğimiz bir özelliği sürdürmektir; bu da, bekleyen ve ücret ödeyen herhangi bir işlemin, eğer mevcutsa ve zincir içi dahil etmek için yer varsa dahil edilmesi gerektiği anlamına gelir. Bu özelliğin yeterince karşılanması durumunda Ethereum'un güvenilir tarafsızlığını artıracağımıza inanıyoruz.

### Neden FOCIL'e ihtiyacımız var ve neden şimdi? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** Neden böyle bir şeye ihtiyacımız var? Şu anda neredeyse tüm doğrulayıcılar blok inşasını, oluşturucuların blok inşa hakları için teklif verdiği protokol dışı bir piyasa olan MEV-Boost'a devrediyor. Bu piyasada gerçekten hakim olan sadece iki kuruluş var ve bu da blokların %90'ının sadece iki kuruluş tarafından oluşturulduğu anlamına geliyor.

Burada Ethereum'un artık güvenilir tarafsızlığını yerel blok oluşturmadan sağlayamadığını görüyoruz. Bir zamanlar sağlıyordu. Dünyanın dört bir yanında bulunan ve her biri kendi bloklarını yerel olarak oluşturan teklif edicilerle başladı, bu da tüm işlemlerin dahil edildiği anlamına geliyordu. Ancak artık blok oluşturma bu gelişmiş kuruluşlara devredildiğinden, bu artık yeterli değil. Bu nedenle daha sağlam sansür karşıtı önlemlerin uygulanması gerekiyor ve FOCIL bunu yapmanın bilinen en iyi yoludur.

FOCIL'i neden şimdi uygulamalıyız? Oluşturucuların şu anda o kadar fazla sansür uygulamadığını düşünebilirsiniz, ancak ister düzenleyici nedenlerle ister ekonomik nedenlerle olsun, herhangi bir noktada sansürlemeye başlayabilirler. Ve ekonomik sansür kesinlikle yanlış anlaşılmaması gereken bir şeydir. FOCIL'i nispeten az sansür varken tanıtmak da iyidir, çünkü o zaman onu bir temel ve varsayılan olarak sunarsınız. Tüm doğrulayıcılar, yargı bölgelerine veya ekonomik teşviklerine bakılmaksızın dahil etme listeleri oluşturur ve bu, piyasada çok az istikrarsızlığa neden olur. Oysa FOCIL'i tüm oluşturucuların sansür uyguladığı bir zamanda tanıtsaydınız, belki de daha zor olurdu.

Ayrıca, tabanlı toplamalar bugünlerde daha yaygın hale geliyor ve Ethereum'un blok oluşturma sürecine dayanacaklar. Ethereum'un sahip olduğu sıralamayı sağlamak istiyorsak, burada FOCIL aracılığıyla güvenilir bir tarafsızlığa sahip olmak gereklidir.

Ve kime sorduğunuza bağlı olarak, FOCIL potansiyel olarak ölçeklendirmeye yardımcı olabilir. Bugün Ethereum sansür direncini hala yerel blok oluşturmadan alıyor. Eğer Ethereum sansür direncini başka bir yerden, örneğin FOCIL aracılığıyla sağlayabilirse, o zaman belki blok oluşturuculardan beklentilerimizi artırabilir ve örneğin daha fazla bloba izin verebiliriz. Ancak potansiyel olarak bu FOCIL olmadan da yapılabilir. Bu nedenle, FOCIL'in Fusaka'da uygulanması teklif edilmiştir.

### FOCIL nasıl çalışır (8:10) {#how-focil-works-810}

**Julian Ma:** Şimdi size FOCIL'in nasıl çalıştığını anlatacağım. Temel bilgilerle başlayıp tam mekanizmayı elde edene kadar adım adım ilerleyeceğiz ve ardından bu tam mekanizmanın istediğimiz özellikleri nasıl karşıladığını inceleyeceğiz.

Daha önce Mike Neuder tarafından da önerilen dahil etme listesinin (inclusion list) temel fikri, bloğu bir şekilde kısıtlayan bir işlemler listesi olmasıdır. Örneğin, A ve B işlemlerini içeren bir dahil etme listesi vardır, protokol tarafından tanınan biri tarafından imzalanır ve ardından bu işlemlerin bir bloğa dahil edilmesi gerekir. FOCIL bunu değiştirmez. Bunun üzerine inşa edilir ve daha çok bu listeyi kimin oluşturduğu ve bu listenin nasıl uygulandığı ile ilgilidir.

Peki, bu listeyi kim oluşturuyor? Bu, FOCIL protokolünün nasıl çalıştığının ilk adımıdır. Her slotta, 16 doğrulayıcı dahil etme listesi komite üyesi olarak seçilir. Bu komite üyelerinin her biri bellek havuzunu gözlemler ve kendi dahil etme listesini oluşturur. Bir dahil etme listesi yaklaşık 8 kilobayt veya yaklaşık 20 ortalama işlem olmalıdır, bu da toplamda yaklaşık 320 ortalama işlem anlamına gelir.

İkinci adım bu dahil etme listelerini dağıtmaktır. Dahil etme listesi komite üyeleri, dahil etme listelerini küresel konu (global topic) üzerinden dağıtırlar ve bunları kendileri bir bloğa dahil etmezler. Bunu, onaylayıcıların (attesters) yerel dahil etme listeleri görünümlerini dondurdukları slotun 9. saniyesinden önce yapmalıdırlar. Bir sonraki adımda göreceğimiz gibi, adından da anlaşılacağı üzere (çatallanma seçimi ile uygulanan dahil etme listeleri - fork-choice enforced inclusion lists), bu dahil etme listelerini fiilen uygulayanlar onaylayıcılardır. Hangi dahil etme listelerini uygulayacaklarına dair görünümlerini 9. saniyede dondururlar ve bu, bölünmüş görünüm (split-view) saldırılarını önler. Blok üreticisinin dahil etme listelerini gözlemlemek ve herhangi bir dahil etme listesini kaçırmaktan olumsuz etkilenmediğinden emin olmak için hâlâ birkaç ekstra saniyesi vardır, bu nedenle blok üreticisinin bu ortamda hiçbir riski yoktur.

Ardından, uygulama olan son adıma geçiyoruz. Dediğim gibi, uygulama çatallanma seçimi aracılığıyla yapılır. Onaylayıcılar, yalnızca dahil etme listesi koşulunu karşılıyorsa bir blok için oy verirler. Bunu, küresel konu üzerinden gönderilen dahil etme listelerini gözlemleyerek, bu dahil etme listelerinde gördükleri işlemlerin birleştirilmiş bir listesini çıkararak ve ardından tüm bu işlemlerin blokta olup olmadığını kontrol ederek yaparlar. Bu kontrol geçerse, blok için oy verirler. Dahil etme listelerindeki tüm işlemlerin blokta olmaması, ancak bloğun dolu olması da söz konusu olabilir. Bu durumda, onaylayıcılar yine de blok için oy verirler. Yani blok işlemleri içermediği ve dolu olmadığı durumlar haricinde, onaylayıcılar blok için oy verirler.

Tam mekanizmayı özetlemek gerekirse: her slotta, 16 komite üyesi dahil etme listesi komite üyesi olarak seçilir. Bellek havuzunu gözlemlerler ve bir son tarihten, bu durumda 9. saniyeden önce küresel konu üzerinden dağıttıkları dahil etme listesi nesneleri oluştururlar. Oluşturucu bu dahil etme listelerini gözlemler ve gördüğü tüm işlemleri bloğuna dahil eder. Onaylayıcılar daha sonra 9. saniyeden önce dahil etme listelerinde gördükleri tüm işlemlerin gerçekten blokta olup olmadığını kontrol ederler. Bu kontrol geçerse, blok için oy verirler ve aynı kurulumun tekrar gerçekleştiği bir sonraki slota geçeriz.

### IL Boost ve kalabalıklaştırılamama (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** Dahil etme listeleri hakkındaki en büyük endişelerden biri, Mike'ın önceki EIP'si için ve sonrasındaki geliştirme sürecinde dile getirilen "IL Boost" veya kalabalıklaştırılamama durumudur. Bu, dahil etme listesi teklif edicilerinin bir dahil etme listesi oluşturma haklarını satmak isteyebilecekleri gerçeğini ifade eder. Bu çok mantıklı bir endişedir, çünkü bunun blok oluşturma sürecinde gerçekleştiğini görüyoruz: bu hakkın satılması, gelişmiş oluşturuculardan oluşan merkezi bir piyasaya yol açar.

FOCIL'in, aşağıdaki özellikleri nedeniyle bu MEV-Boost benzeri piyasalara veya halk arasında bilinen adıyla IL Boost'a karşı sağlam olduğunu savunuyoruz. FOCIL, işlemlerin herhangi bir şekilde sıralanmasını garanti etmez. İşleminizi dahil etme listenizde nereye koyarsanız koyun, blok oluşturucunun uygun gördüğü şekilde sıralanacaktır. Örneğin, listeye bir arbitraj işlemi dahil ederseniz, oluşturucunun arbitrajı gerçekten yürütebilmesi için arbitraj işleminizi bloğun en üstüne koyması pek olası değildir. Bunun yerine, oluşturucu muhtemelen bunu kendisi yapacaktır.

Dahası, özel emir akışı mümkün değildir. Bu dahil etme listeleri küresel konu üzerinden dağıtılır, bu nedenle işlemleriniz oluşturucu bloğu oluşturmadan önce herkese açıktır. Özel emir akışının bir dahil etme listesi aracılığıyla bloğa girmesi mümkün değildir.

Üçüncüsü, her slot için birden fazla dahil etme listesi teklif edicisi vardır. Satılacak değerli bir şey olsa bile, 16 dahil etme listesi komite üyesinin tümü bu dahil etme listesini oluşturmak için aynı olasılığa sahiptir, bu nedenle bu dahil etme listesi teklif edicileri arasındaki rekabet değeri sıfıra indirecektir.

Ve son olarak, bu dahil etme listeleri blok üreticisi harekete geçmeden 3 saniye önce oluşturulur. Dahil etme listesi taahhüt edildikten sonra ve blok üreticisi harekete geçmeden önce gelen, genellikle MEV türü işlemler için son derece alakalı olan 3 saniyelik ekstra bilgi vardır, bu da çok az bilgi avantajı olduğu anlamına gelir. Aslında, dahil etme listelerini MEV için bir araç olarak kullanmaya çalışanlar için bir bilgi dezavantajı vardır.

Bu nedenlerden dolayı, hiçbir bireysel dahil etme listesi teklif edicisinin MEV'in temel tanımı olan dahil etme, sıralama veya hariç tutma gücüne sahip olmadığına inanıyoruz. Bu nedenle dahil etme listeleri MEV'e tabi olmamalıdır.

### Sunumun özeti (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** Bu kısa sunumu özetlemek gerekirse: FOCIL, birden fazla doğrulayıcının blok inşasına katkıda bulunmasına olanak tanıyarak tek bir teklif edicinin dahil etme tekeline engel olur ve Ethereum'un güvenilir tarafsızlığını artırır. FOCIL'i şu anda uygulamanın gerekli olduğuna inanıyoruz çünkü şu anda herhangi bir noktada sansürlemeye başlayabilecek yalnızca iki baskın oluşturucu var ve bu, fayda sağlayabilecekleri ekonomik nedenlerden dolayı olabilir. Blok oluşturma daha fazla yük taşıyan bir hale gelebilir çünkü tabanlı toplamalar Ethereum'un sıralama özelliklerini kullanmak isteyecektir. FOCIL, sansür uygulayan tarafların sayısı az olduğunda çok daha sorunsuz bir şekilde başlatılacaktır: ilk olarak, bu durum doğrulayıcıların dahil etme listeleri oluşturmasının varsayılan bir eylem olduğu anlamına gelir ve ikinci olarak ise, sansür uygulayan oluşturucular ile uygulamayan oluşturucular arasında daha az piyasa istikrarsızlığı olacağı anlamına gelir. Ve son olarak, FOCIL potansiyel olarak ölçeklendirmeye yardımcı olabilir, ki bu belki de daha derinlemesine inceleyebileceğimiz bir konudur.

Bu küçük sunumu yapmama vakit ayırdığınız için teşekkürler. İlgilenenler için sadece EIP'ye yönlendiren QR kodunu göstermek istedim.

**Pooja Ranjan:** Bu hızlı sunum ve teklife genel bakış için çok teşekkür ederim.

### Soru-Cevap: EIP-7805, EIP-7547'den nasıl farklıdır? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** Soru-Cevap bölümüne, sunumunuzda da bahsedilen önceki teklif hakkındaki ilk soruyla başlamak istiyorum: Mike Neuder'in 7547 numaralı dahil etme listeleri (inclusion lists) teklifi. Bu teklif ile 7805 numaralı FOCIL arasındaki temel farkı anlamak istiyorum. Sunumunuzda IL Boost ve kalabalıklaştırılamama (uncrowdability) konularına kısmen değinmiştiniz. Belki bu konuyu biraz daha açıklamak istersiniz?

**Julian Ma:** 7805'in 7547'den nasıl farklı olduğu sorusunu yanıtlamak için belki de en uygun kişi Thomas'tır, ancak ben de bu konuda biraz bir şeyler söyleyebilirim. Öncelikle, FOCIL aynı slot içindir, oysa 7547 bir sonraki slot içindi. Aynı slot özelliği bazı şeyleri kolaylaştırır, çünkü bu, dahil etme listesinin zincir içi depolanması gerekmediği anlamına gelir.

Kalabalıklaştırılamama özelliğine gelince, bu çok ilginç ve ince bir detaydır. Teklifimizin üzerine inşa edildiği harika bir teklif olan 7547'de, dahil etme listesi koşulsuz olarak bloğun sonuna eklenir ve tek bir kişi tarafından oluşturulur. Bunun bizimkinden birkaç farklı özelliği var. Öncelikle, işlemler sıralıdır. Gelecekte blok sonu arbitrajına sahip olmak çok değerli olabilir ve aslında Thomas'ın bazı araştırmaları buranın potansiyel olarak değerli bir yer olabileceğini vurguladı. Dahil etme listesini oluşturma haklarına sahip olmak, blokta hareket eden son kişi olduğunuz anlamına gelir ve bazı durumlarda bu değerli olabilir. İkincisi, tek bir kişi tarafından yapılır, bu nedenle dahil etme listesi komite üyeleri arasında bu rekabet etkisi yoktur. Tek kişilik bir komite, işlemleri bloğun sonuna dahil etme konusunda tam hakka sahiptir, bu da onu daha değerli kılabilir. Üçüncüsü, bu koşulsuz özellik vardır, bu da blok üreticisi ne yaparsa yapsın işleminizin her halükarda zincir içi dahil edileceği anlamına gelir. Yani, dahil edilme için gerekli minimumun ötesinde, onu bir dereceye kadar değerli kılabilecek birkaç ekstra garantisi vardır.

**Thomas Thiery:** Büyük bir fark da sahip olduğumuz dahil etme listesi teklif edici sayısıdır. Önceki teklifte, n slotunun teklif edicisinin, n+1 slotunun teklif edicisinin uygulaması gereken dahil etme listesini oluşturduğu bir mekanizma vardı. Buradaki iki büyük şey: birincisi, bir slotluk bir gecikme vardır, bu nedenle dahil etme listesindeki işlemlerin yalnızca bir sonraki teklif edici tarafından bir sonraki slota dahil edilmesi gerekir. Ve dahil etme listesini gerçekten oluşturan sadece bir teklif edici vardır. FOCIL ile 16 tane var. Bu büyük bir fark yaratıyor, çünkü artık tüm mekanizmanın tasarlandığı gibi çalışması için 16 IL komite üyesinden sadece birinin dürüst olmasına ihtiyacımız var. Daha önce tek bir tarafa güvenirken, bu durum gerçekten iyi bir sansüre dirençli mekanizmaya sahip olma şansınızı katlıyor.

Ve sonra biraz daha teknik detaylar: hesap soyutlama ile bazı uyumsuzluklar vardı ve iki farklı dahil etme listesi gönderen biri anlamına gelen IL çifte imza ile başa çıkmak zordu. Blok çifte imza bilinen bir şeydir ve protokol tarafından cezalandırılır, ancak önceki teklifte her şey zincir içi gerçekleştiği için tuhaf uç durumlarla da uğraşmak zorundaydınız ve bunlara uyum sağlamak pek kolay değildi. FOCIL ile dahil etme listeleri zincir içi gitmez. Sadece P2P mutabakat katmanı ağı üzerinden yayınlanırlar. Biraz teknik, ancak hesap soyutlama kaynaklı bu uç durumlarla veya IL çifte imza ile ağı iki farklı görünüme böldüğünüz saldırılarla başa çıkmada büyük bir fark yaratıyor.

**Pooja Ranjan:** Çok teşekkür ederim. 7547 numaralı teklif hakkında daha fazla bilgi edinmek isteyenler için, Mike Neuder ile üst düzey bir genel bakış sunan kaydedilmiş bir bölümümüz var, PEEPanEIP'in 130. bölümü. Rekabet eden teklifleri görmeyi her zaman severim, çünkü bunun ekosistemin ve zincirin iyileştirilmesi için olduğunu biliyorum. Sohbette birkaç soru olduğunu görüyorum. Belki Kataya'yı sorusunu paylaşması için davet edebilirim.

### Teklif edici 16 listenin tamamını dahil etmek zorunda mı? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Merhaba, teşekkürler. Benim sorum şuydu: blok teklifçisi, her biri bir komite üyesinden olmak üzere 16 dahil etme listesi mi alıyor ve bu listelerdeki tüm işlemleri dahil etmek zorunda mı?

**Thomas Thiery:** Evet, bu doğru. Tüm listelerdeki, bizim durumumuzda 16 listedeki, tüm işlemlerin birleşimini alıyorsunuz. Açıkçası örtüşmeler olabilir, bu yüzden birleşimi alıp tekilleştiriyorsunuz, ancak evet, bloğun onaylayıcılar tarafından geçerli kabul edilmesi için tüm listelerdeki tüm işlemlerin bloğa dahil edilmesi gerekir.

**Pooja Ranjan:** Sohbetteki bir sonraki soru Justin'den. Justin, sorunu konuklar için okumak ister misin?

### Dahil etme listelerindeki özel bellek havuzu işlemleri (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** Çok fazla soru soruyorum. Özel bir bellek havuzundan bir işlemi dahil etme listesine koymayı neyin engellediğini sormak istiyordum ve sanırım bu oldukça iyi cevaplandı. Oluşturucunun bunları zaten uygun gördüğü şekilde sıralayacağı ve işleminizin dahil etme listesine (IL) girdiğinde herkese açık hale geleceği göz önüne alındığında, bu tamamen sorunsuz görünüyor. Yani bence bu mantıklı. Teşekkürler.

**Thomas Thiery:** Julian'ın da bahsettiği gibi, bu dikkate alınan bir konuydu. FOCIL ve dahil etme listelerinin MEV işlemlerini, özel emir akışını veya ön onayları dahil etmek için kullanılmasını gerçekten istemedik, çünkü nihayetinde istediğimiz şey sansür direncidir ve dikkatli olmazsanız bir mekanizmanın değerli işlemleri dahil etmek için bir araca dönüşmesi çok kolaydır. İşleminizi bir dahil etme listesine eklediğinizde otomatik olarak herkese açık hale gelmesi, herkesin onu görebilmesi, hiçbir sıralama garantisi olmaması ve oluşturucu tarafından blokta herhangi bir yere dahil edilebilmesi, onu değerli işlemler için pek uygun kılmaz.

Yani ya herkese açık bir işleminiz vardır ve bir dahil etme listesine eklenmesi için onu herkese açık bellek havuzuna gönderirsiniz ya da değerli özel işlemleriniz vardır ve o zaman FOCIL üzerinden gitmezsiniz, çünkü bunu yapmanın daha iyi yolları vardır. Doğrudan oluşturucu ile iletişime geçer ve onu özel kanallar aracılığıyla gönderirsiniz.

**Pooja Ranjan:** Paylaştığınız için teşekkürler. Gördüğüm kadarıyla bir sonraki soru Ladislaus'tan.

### FOCIL ve ölçeklendirme (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Merhaba arkadaşlar. Bu, FOCIL ve ölçeklendirme konusunda değindiğiniz noktayla ilgili. Hepimiz gibi ben de son zamanlarda Ethereum'u ölçeklendirme üzerine bazı tartışmalar gördüm ve haklı olarak belirttiğiniz gibi, piyasada az sayıdaki oluşturucunun yarattığı bir darboğaz var. Kişisel olarak FOCIL'i yerel oluşturmayı yeniden güçlendiren bir şey olarak düşünmeyi seviyorum ve bant genişliği gereksinimlerini veya genel olarak düğüm gereksinimlerini artırmadan önce protokole dahil edilmesinin bir zorunluluk olduğunu düşünüyorum. Belki bu konudaki düşüncelerinizi ve bahsettiğiniz gibi FOCIL olmadan ölçeklendirmenin diğer olası yollarını detaylandırabilirsiniz.

**Julian Ma:** Soru için teşekkürler. Öncelikle, FOCIL aracılığıyla ölçeklendirme durumu. Şu anda doğrulayıcıların %90'ı blok inşasını MEV-Boost aracılığıyla dışarıdan sağlıyor ve bu gelişmiş varlıklar açıkça minimum donanım gereksinimlerinden daha fazla bant genişliğine sahip. Örneğin, herhangi bir soruna yol açmadan bloklarına daha fazla blob dahil edebilirler. Ancak ilginç olan şey, Ethereum'un güvenilir tarafsızlık veya sansür direnci için yerel blok oluşturmaya dayanmasıdır, çünkü bu iki gelişmiş varlık, Ethereum'un sansür direncinin üzerine inşa edilebileceği varlıklar değildir.

Bu nedenle Ethereum protokolü, yerel blok oluşturmanın mümkün olacağı şekilde tasarlanmaya devam etmelidir ve aslında biz bunu MEV-Boost'a kıyasla kârsız olmayacak şekilde tasarlıyoruz. Bu Ethereum'un tasarımında var, ancak pratikte elbette MEV-Boost çok daha kârlı: birincisi, bu gelişmiş blok oluşturucuların daha karmaşık algoritmaları var ve ikincisi, çok daha fazla özel emir akışına sahipler. Yakın zamanda Data Always tarafından yapılan bir araştırma, MEV-Boost bloklarının çok daha fazla işlem içerdiğini gösterdi. Sadece bu bile daha fazla kâr sağlıyor.

Yine de protokol, protokol kuralları dahilinde bir doğrulayıcıyı diğerinden daha az kârlı hale getirecek hiçbir güç olmayacak şekilde tasarlanmıştır. Bu kuralı korumak istiyorsak FOCIL gereklidir, çünkü o zaman yerel blok oluşturucular dahil etme listelerine katkıda bulunabilir ve böylece sansür direncini koruyabilirler. Ancak bu kuraldan kurtulup temel olarak yerel blok oluşturucuların belirli sayıda blob dahil edebileceğini, ancak daha gelişmiş blok oluşturucuların, yerel blok oluşturucuların kendi başlarına bir blok oluştururken bu yükü kaldıramayacağı ölçüde daha fazla blob dahil edebileceğini de söyleyebiliriz. Dolayısıyla, maksimumun en düşük donanım gereksinimlerine ayarlandığı kuralını korumak istiyorsak FOCIL'e ihtiyacımız var. Bu kuralı esnetmekte bir sakınca görmüyorsak, ölçeklendirme için potansiyel olarak FOCIL'e ihtiyacımız olmayabilir.

**Thomas Thiery:** Sanırım çok benzer, ancak şu anda Ethereum'da tuhaf bir konumdayız, çünkü çoğu bloğu oluşturmak için gelişmiş oluşturuculara güveniyoruz, ancak bunlar sansür direnci için harika değiller, çünkü sadece iki taraf var. Keyfi bir nedenden dolayı işlemleri veya bazı adresleri sansürlemeye karar verirlerse, o zaman temel olarak sansür direncimiz veya izinsizliğimiz kalmaz ki bu da çok önemlidir. Bu, istedikleri herhangi bir aktörü sansürleyebilecekleri veya zincir içi katılımdan alıkoyabilecekleri anlamına gelir ki bu çok kötüdür.

Ve koruduğumuz sansür direnci özellikleri de harika değil, değil mi? Çoğu blok bu iki oluşturucu tarafından oluşturulduğundan, temel olarak yerel bir blok oluşturucunun seçilmesini ve normalde sansürlenen tüm bu işlemleri içeren bir blok teklif etmesini beklemeniz gerekir ki bu pek de iyi hissettirmez. Bu, söz konusu kullanıcıların işlemleri zincir içi olarak gerçekten dahil edilene kadar 10, 12, bilmiyorum, çok sayıda blok beklemeleri gerekeceği anlamına gelir.

Bu yüzden evde stake edenleri ve yerel blok oluşturucuları gerçekten elimizde tutmak istiyoruz, çünkü sansür direncini koruyanlar onlardır. Aynı zamanda, bugün onları kullanmak bile harika değil, çünkü işleminiz iki oluşturucu tarafından sansürlenirse dahil edilmesi için hala çok zaman beklemeniz gerekiyor. FOCIL ile, sansür direncini garanti eden katılımcıların, bizim durumumuzda dahil etme listesi komite üyelerinin, blokları oluşturan kişilerden farklı olabileceği bir dünyaya geçiyorsunuz. Bence bu çok ilginç bir manzara ortaya çıkarıyor, çünkü artık hem değerli bloklar oluşturmak hem de sansür direncine katkıda bulunmak için tamamen aynı katılımcıya güvenmek zorunda değiliz. FOCIL aynı zamanda bu önemli yönde atılmış bir ilk adım olarak da düşünülebilir, çünkü iki çok farklı göreviniz var ve bugün tamamen aynı doğrulayıcı düğümlerinden her ikisini de yapmalarını istiyoruz ki bu da büyük bir gerilim yaratıyor.

**Pooja Ranjan:** Çok teşekkür ederim. Sanırım bir sonraki soru Luis'ten.

### İşlemleri seçme kriterleri (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** Başlangıçtan birkaç dakika sonra katıldım, ancak bana öyle geliyor ki bu, bir bütün olarak ağdaki işlem seçimini merkeziyetsizleştiriyor. Bence bu çok iyi; MEV'e ve sansüre karşı savaşıyor. Ve bu işi onaylayıcıların yapması kısmını kesinlikle seviyorum, çünkü gelecekte oluşturuculardan daha düşük donanım gereksinimlerine sahip olacaklar, durumsuzluk ve durumsuz istemcilerle bu daha da geçerli olacak. Bunu çok düşük donanımla çalıştırabileceğiniz için, işleri çok merkeziyetsiz hale getiriyor. Sanırım buradaki asıl zorluk, bu dahil etme listelerinin işlem seçimi için kriterleri belirlemek, ister öncelik ücretleriyle ister blob sayısıyla ilerleyin; çok fazla değişken var. Uygulamayı düşündüğünüz bir dizi kritere karar verdiniz mi?

**Thomas Thiery:** Bu harika bir soru. İki yönü var. İlki çok önemli, onaylayıcıları bloğu oluşturan veya teklif eden kişilerden ayırmaya çalışmakla ilgili. Bu, onaylayıcı-teklif edici ayrımı (APS) araştırma çizgisinin tamamıdır; Julian bu konuda epey çalıştı. Buna rolleri ayrıştırmak diyoruz, böylece protokolün görevleriyle daha yakından eşleşiyorlar. Olası bir ayrım hakkında az önce paylaştığım bir yazı yazdım, bu konu oldukça açık ve insanlardan daha fazla geri bildirim almayı çok isterim. Bu yazıda onaylayıcılar, şu anda IL komite üyeleri olan dahil ediciler ve yürütme teklif edicileri veya oluşturucular arasında bir ayrım yapıyorum. Bence bunlar temelde farklı görevler ve belki de onlar için farklı rollerimiz olmalı.

Sonra, dahil etme kuralı için, bu çok iyi bir soru. Bunun üzerinde epey düşündük ve sanırım iki şeye karar verdik. Birincisi, kural çeşitliliği istiyoruz. Tüm istemciler için örneğin azalan öncelik ücretlerine göre sıralama gibi tek bir kural istemiyoruz, çünkü o zaman aslında oyunlar oynayabilir ve bellek havuzunu yalnızca sizin işlemlerinizin IL'lere dahil edileceği şekilde yeniden sıralamaya çalışabilirsiniz. Ancak, bir işlemin bellek havuzunda bekleme süresini de hesaba katan bir kural da dahil olmak üzere çeşitli kurallarınız varsa ve farklı istemciler, çoğunlukla öncelik ücretleri ve bellek havuzunda bekleme süresi etrafında şekillenen, hepsi aynı tarzda farklı kurallar uygularsa, o zaman bunu manipüle etmek çok ama çok zordur ve protokolü daha da sağlam hale getirir. Ayrıca bence bu, bugün Ethereum'da sahip olduğumuz istemci çeşitliliğinden yararlanmanın ve istemcilerin kendi görüşlerine dayalı seçimler yapmasına izin vermenin iyi bir yoludur. Aklımızda kurallar var, ancak istemcilerin kendileri için en iyi kuralları da seçebileceğini düşünüyoruz. Herkes öncelik ücretlerine göre sıralanmış tamamen aynı kurala sahip olmadığı sürece sorun yaşamayacağız.

**Luis Pinto:** Tamam, yani bu kriterleri de dağıtıyorsunuz, dahil etme listelerini oluşturanların kendi kriterlerine sahip olmasına izin veriyorsunuz. Yoksa bu protokolün bir parçası mı olacak?

**Julian Ma:** Dahil etme kuralı protokolün bir parçası olmayacak. Her şeyden önce, bunu uygulamak çok zor ve ikinci olarak, aslında hiçbir şeyi zorunlu kılmamak daha iyi. Komite üyelerinin işlemleri nasıl dahil edeceklerine kendilerinin karar vermesine izin verirsek veya istemci ekiplerinin onların adına hareket etmesine izin verirsek, o zaman ağda bir miktar sağlamlık yaratırız. Farklı tercihlere sahip kişiler farklı şekillerde dahil edecektir, bu da sisteme saldırmanın daha zor olduğu anlamına gelir.

**Luis Pinto:** Tamam, teşekkür ederim.

### EIP-7702, ePBS ve PeerDAS ile Uyumluluk (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Çok teşekkür ederim. Anladığım kadarıyla bu teklif, Pectra'dan sonraki yükseltme olan Fusaka için zaten önerilmiş durumda. Fusaka'nın devam etmekte olan diğer bazı EIP'leri içerip içermeyeceği göz önüne alındığında, hesap soyutlama için olan 7702, ePBS ve PeerDAS gibi tekliflere kıyasla FOCIL'in uyumluluk durumunun ne olduğunu merak ediyorum.

**Thomas Thiery:** Harika bir soru. Dahil etme listelerinin geçmişi nedeniyle burada biraz avantajımız vardı. Bahsettiğimiz gibi, 7547'nin dahil edilmesi düşünülmüş ve ardından uyumsuzluklar nedeniyle reddedilmişti. Bu yüzden yeni bir teklif yapmadan önce bunları çözme konusunda çok dikkatli davrandık, çünkü insanların aynı sorularla yaklaşacağını biliyorduk ki bu da çok mantıklı.

Çok eminiz, çünkü hesap soyutlama ekipleriyle de görüştük ve Potuz ve Terence ile çok konuştuk. Terence bize aktif olarak yardım ediyor ve hem ePBS hem de FOCIL üzerinde çalışıyor, bu yüzden bunun da uyumlu olup olmadığını kontrol etmek bizim için çok kolay oldu. Diğer EIP'lerin hiçbiriyle uyumsuzluk olduğunu gerçekten düşünmüyorum. ePBS ile, işlerin zamanlamasına dikkat etmeniz gerekir, çünkü yürütme yükünü mutabakat bloğundan ayırırsınız, bu nedenle tüm slot zamanlaması değişir ve şimdi yük teklif edilmeden önce yapılması gereken IL'lerin oluşturulmasını da eklersiniz. Bu yüzden zamanlamalar konusunda dikkatli olmanız gerekir, ancak doğru hatırlıyorsam, hem Potuz hem de Terence ile bu konuyu son konuştuğumuzda, hiçbir kritik uyumsuzluk yoktu. Uyumluluk söz konusu olduğunda iyi durumda olduğumuzu düşünüyorum.

**Pooja Ranjan:** Bunu bilmek güzel. Jihoon'un da özellikle ePBS ile uyumluluk hakkında daha fazla bilgi edinmek isteyenler için kaynaklara ekleyeceğimiz bir HackMD paylaştığını fark ettim. Ve evet, Mike ile yaptığımız son konuşmadan hatırlıyorum, sanırım teklif hesap soyutlama uyumsuzluğu nedeniyle dahil edilmemişti. Bu yüzden bunun zaten halledilmiş olduğunu bilmek güzel.

### FOCIL ve çoklu slot MEV'i (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** FOCIL web sitesine (meetfocil.eth.limo) eklenen belgelere ve ayrıntılara göz atıyordum ve çoklu slot MEV'i (multi-slot MEV) adı verilen bir terim öğrendim. Julian ayrıca, geliştiricilerin onu dengede tutma arzusuna ve çabalarına rağmen MEV-Boost'un genel olarak kârlı olduğundan bahsetti. FOCIL'in bunu nasıl önleyeceğini merak ediyorum.

**Julian Ma:** Sorunuz için teşekkür ederim. İlk olarak, FOCIL ve MEV hakkında bir şeyler söyleyeyim, ardından çoklu slot MEV'ine geçebiliriz. FOCIL, MEV'i illa ki önlemez ve bunun nedeni tam olarak MEV kısımları ile dahil etme kısımlarını birbirinden ayırmak istememizdir. Bize göre bunu yapmak önemlidir, çünkü aksi takdirde bu IL Boost türü piyasaların ortaya çıktığını görürsünüz. Bu mantıkla, eğer dahil etme listesi çıkarılabilecek MEV miktarını kısıtlayabilseydi, o zaman dahil etme listesini oluşturmak çok değerli hale gelirdi ve insanlar bunun etrafında piyasalar kurardı. Tasarımımız gerçekten minimum dahil etme garantisi sağlamak için var, bu da bir dahil etme listesi komite üyesi olmanın o kadar da değerli olmadığı anlamına geliyor ve bunlardan 16 tane var, yani sofistike üreticilerden oluşan bir piyasa yok.

Ardından, çoklu slot MEV'ine geçersek: FOCIL bazı sorunları hafifletiyor, ancak tamamen çözmüyor. Bunun nedeni yine hem sansür direnci sağlamak hem de MEV'e bir çözüm sunmak arasındaki bu uyumsuzluktur. FOCIL'in yaptığı şey, ücretleri ödediği sürece herhangi bir işlemin dahil edilmesine izin vermektir, bu da çoklu slot MEV'ini bir dereceye kadar çözer. Buradaki çoklu slot MEV'i, bir tarafın arka arkaya iki bloğu kontrol etmesi durumunda daha fazla MEV çıkarabilmesidir.

FOCIL bazı sorunları hafifletir çünkü işleminizi eklemenize olanak tanır. Örneğin, bir yerlerdeki bir pozisyondaki batık borcu tasfiye eden bir işlem eklemeniz gerekiyorsa, teklif edici sizi sansürlemeye çalışsa ve bir sonraki blokta sizden MEV çıkaracak olsa bile bunu yapabilirsiniz.

Tüm sorunları çözmemesinin nedeni, bir kişinin diğerinden daha fazla bilgiye sahip olduğu ekonomik bir özellik olan ters seçimdir. Çoklu slot MEV'ine bir örnek, blok oluşturucunun ilk blokta arbitraj çıkarmayıp ikinci blokta çıkardığı, iki blok üzerinden arbitraj çıkarmak olabilir. Bunun, blok oluşturucu için her iki slotta da arbitraj çıkarmaktan daha kârlı olabileceğini gösteren bazı teorik sonuçlar vardır. FOCIL'in burada yardımcı olduğunu düşünebilirsiniz, çünkü arbitrajcılar prensipte işlemlerini dahil etme listesine ekleyebilir ve böylece bir tür arbitrajın gerçekleşmesini zorlayabilirler. Durum böyle olsa da, arbitrajcıların işlemlerini FOCIL'e göndermeleri teşvik uyumlu değildir, çünkü işlemlerinin gönderilmesi ile blok oluşturucunun harekete geçebilmesi arasında hala 3 saniye vardır. Eğer arbitraj yapmaya çalışıyorsanız ve fiyat bazı dış piyasalarda sürekli hareket ediyorsa, 3 saniye önceden taahhütte bulunmak istemezsiniz, çünkü sizden daha sonra harekete geçen blok oluşturucudan çok daha az bilgiye sahipsinizdir. Ters seçim burada devreye girer çünkü oluşturucu daha fazla bilgiye sahiptir: Eğer sizin için kötüyse, yani dış piyasadaki fiyat o fazladan üç saniye içinde aleyhinize hareket ettiyse kazanmanıza izin verecek ve kendisinin kazanması daha iyiyse kendisinin kazanmasını sağlayacaktır.

Yani FOCIL, çoklu slot MEV'inin işlemlerin ters seçime maruz kalmadığı kısımlarını çözer. Ters seçimin olduğu işlemler için durum biraz daha karmaşıktır, ancak sorunu bir dereceye kadar hafifletir. Prensip olarak, işleri şu an olduğundan daha iyi hale getiriyor, ancak hala yapılması gereken biraz iş var.

**Pooja Ranjan:** Çok iyi, bunu paylaştığınız için çok teşekkür ederim. MEV konusunu ele almak için devam eden pek çok araştırma olduğunu anlıyorum, bu nedenle en azından prensipte mevcut senaryodan daha fazla yardımcı olacağını bilmek güzel.

### Ödünleşimler ve zorluklar (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** Thomas'ın daha önce bahsettiği IL çifte imzası ile ilgili bir sorum var. Teklifin güvenlik hususları bölümünde mutabakat canlılığı, IL çifte imzası ve yürütme yükü oluşturma gibi epeyce noktaya değinildiğini fark ettim. Sizce en büyük ödünleşim nedir veya daha fazla araştırma gerektirebilecek ve bu teklifin bir sonraki yükseltmeye bu haliyle girmesini engelleyebilecek şey nedir?

**Thomas Thiery:** Dürüst olmak gerekirse, güvenlik hususları bölümünün daha çok güvenlikle ilgili endişeleri düşündüğümüzü ve ele aldığımızı göstermenin bir yolu olduğunu düşünüyorum. Bilmediğimiz güvenlik konuları hakkında açık sorulara sahip olmaktan ziyade daha çok bu amaca hizmet ediyor. Güvenlik hususları açısından büyük bir engel veya sorun olduğunu düşünmüyorum.

Ödünleşimlere gelince: çok dar bir açıdan bakarsanız, FOCIL'in doğrulayıcılara bazı görevler eklediği doğrudur; hem bir dahil etme listesi teklif etmeleri gerektiğinde, hem de onaylayıcılar için bloğun dahil etme listelerine göre geçerli olduğundan emin olmak adına bir koşulu daha kontrol etmeleri gerektiğinde. Ayrıca teklif edici için de küçük bir görev ekliyor, çünkü artık yürütme yükünün IL'lerdeki işlemleri gerçekten içerdiğinden emin olması gerekiyor. Bana göre tek ödünleşim bu ve bu görevler ağır veya karmaşık değil. Bir IL komite üyesi sadece halka açık bellek havuzunu izler ve işlemleri gönderdikleri bir listeye dahil eder. Herhangi bir beceri veya karmaşıklık gerektirmiyor, ki bence bu güzel bir şey. Öte yandan, dediğimiz gibi, bazı büyük ölçeklendirme iyileştirmelerinin ve protokol içindeki katılımcılar ile görevler arasında daha iyi bir ayrımın önünü açabilir.

Taraflı olabilirim ama büyük ödünleşimler görmüyorum. Sansür direnci söz konusu olduğunda her şeyi baştan aşağı değiştirdiğini düşünüyorum. Artık oluşturucular tarafından sansürlenebilecek olanlar da dahil olmak üzere tüm işlemlerin bir sonraki bloğa dahil edilmesi için ağın temelde sadece %15'inin dürüst olmasına ihtiyacınız var, ki bu çok büyük bir gelişme. Dürüst olmak gerekirse, burada pek çok şeyden ödün verdiğinizi düşünmüyorum.

**Pooja Ranjan:** Bunu bilmek güzel. Çoğu teklifte güvenlik hususları bölümünün ya hiç bilgi içermediğini ya da çok az bilgi içerdiğini görüyoruz, bu nedenle bu kısımda araştırmanın yapıldığını ve olası güvenlik hususlarının farkında olduğumuzu bilmek güzel. Gelecekteki uygulama ve benimseme için bir engel veya potansiyel bir zorluk olmadığını bilmek sevindirici.

### Dahil etme listeleri için işlem ücreti mekanizmaları (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** Web sitesinde bulduğum bazı açık sorular hakkında, işlem ücreti mekanizmasıyla ilgili bir sorum var. Herhangi bir güncelleme olup olmadığını veya dahil etme listesine dahil edilmek üzere ücret almanın ve bu ücretleri dağıtmanın en iyi yolu hakkında daha fazla bilgi paylaşmak isteyip istemediğinizi merak ediyorum.

**Thomas Thiery:** Özel olarak bunu ve IL (dahil etme listesi) komite üyelerini ödüllendirecek teşvik mekanizmalarını inceleyen devam eden bir hibemiz var. Bu kolay değil. Oldukça zorlu ve konuya nasıl yaklaşırsanız yaklaşın, bunlar aynı zamanda çok büyük değişiklikler. Ethereum üzerinde ücretleri değiştirmek; ister bir ücreti değiştirin, ister yeni bir tane ekleyin veya yeni ihraç ekleyin, bunların hepsi çok fazla değerlendirme ve özen gerektiren büyük değişikliklerdir. Ancak bu araştırılıyor ve örneğin bir işlemi dahil eden komite üyeleri arasında ücretlerin dağıtılmasına yönelik fikirler makul görünüyor. İstediğimiz özelliklere bir nevi sahip, çünkü insanları başkalarının dahil etmek istemeyebileceği işlemleri dahil ettikleri için ödüllendirmek istiyoruz. Bu yüzden bunun üzerinde oldukça derinlemesine düşünüyoruz ve devam eden bir hibemiz var.

Ayrıca IL komite üyelerine herhangi bir ücret vermek isteyip istemediğimiz sorusu da var, çünkü dünya çapında dağılmış daha küçük katılımcıları ödüllendirmek özellikle çok zordur. Sybil saldırıları istemezsiniz ve çok fazla stake'i olan büyük katılımcıların IL komite kümesini dışlamasını da istemezsiniz. Bunu nasıl engellersiniz? Bu çok zor. Bu yüzden dikkate almanız gereken birçok tasarım hususu var.

Son zamanlardaki düşüncelerimden biri şu: FOCIL'e gizlilik gibi bazı harika özellikler eklesek ve böylece belirli bir işlem listesini kimin teklif ettiğini gerçekten bilemeseniz nasıl olur? Bunun gerçekten bir IL komite üyesi olarak seçilen biri olduğunu bilirsiniz, ancak hangi listeyi tam olarak kimin teklif ettiğini bilemezsiniz, bu nedenle IL komite üyelerini kendi IL'lerindeki işlem kümesiyle ilişkilendiremezsiniz. Bunu sağlayabilirsek ve IL komitesi rolünün bir nevi isteğe bağlı olmasına izin verirsek, o zaman muhtemelen Protokol içinde fedakar davranışlara güvenen dürüst katılımcılarımız olur ve belki de bir ücret mekanizması kurmamıza hiç gerek kalmaz. Bu çok yeni, kişisel bir görüş ve şu anda üzerinde çokça duruluyor. Bunların hepsi "FOCIL'in geleceği" tartışmalarıdır; mevcut EIP'ye dahil edilmeleri amaçlanmamıştır.

**Julian Ma:** Buna ek olarak, o son kısım da çok önemli: EIP-7805, uygulanmasını basitleştirmek için herhangi bir işlem ücreti mekanizması içermiyor. Temel olarak sansür direnci özelliklerini sağlayabileceğimiz mümkün olan en küçük yoldur, ancak oldukça genişletilebilirdir. Bunu inceliyoruz. Thomas, dahil edenler ve teklif ediciler için ayrı işlem ücretlerini inceleyen epeyce çalışma yaptı. Ardından, Thomas'ın da bahsettiği gibi, Nethermind'da FOCIL için bir işlem ücreti mekanizması oluşturmayı araştıran harika bir araştırmacıyla devam eden bir hibemiz var ve bu çok umut verici. Ve son olarak, Sarisht Wadhwa, Fan Zhang ve Kartik Nayak tarafından birkaç FOCIL yazarıyla birlikte teklif edilen açık artırma tabanlı bir dahil etme listesi tasarımı olan ve FOCIL'in AUCIL adlı bir varyantı için dahil etme listesi komite üyelerini teşvik etmenin yollarını arayan bir işlem ücreti mekanizması üzerinde çalışmalar yapıldı.

Luis'in daha önceki noktasına dönersek, teşvik etmek büyük ölçüde dahil etme listelerinin nasıl oluşturulduğuyla ilgilidir. Bu, Protokol'ün dahil etme listesi komite üyelerinin nasıl davranması gerektiğine dair belirli bir görüş sunmak istediği anlamına gelir. Genellikle bunun vardığı nokta, belirli katılımcıların farklı şeyler yapmasını istemesidir. Örneğin, komite üyeleri arasında hala bazı farklı davranışlara sahip olmak için komite üyelerini sıralayabilir ve onlara ilişkili bir denge aracılığıyla belirli işlemleri atayabilir. Yani bu mevcut teklifin bir parçası değil, ancak kesinlikle bunu inceliyoruz ve FOCIL'in genişletilebilirliği çizgisine uyuyor.

**Pooja Ranjan:** Oh, bu ilginç. Yani mevcut FOCIL özelliklerini geliştirmek için gelecekte bazı ek teklifler beklemeliyiz.

### Dahil etme listesi boyutu (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** Bir sorum daha var. Mevcut teklifin bir parçası olup olmaması gerektiğinden emin değilim, ancak IL boyutuyla ilgili herhangi bir güncelleme olup olmadığını merak ediyorum. Aşırı bant genişliği kullanımını önlemek için dahil etme listelerinin boyutunun muhtemelen sınırlandırılması gerekir. Dahil etme listesinin optimum boyutunun nasıl belirlenebileceğine dair daha fazla araştırmamız veya güncellememiz var mı?

**Thomas Thiery:** Şu anda spesifikasyonda sabit bir boyutumuz var ve bir süredir de böyle: 8 kilobayt. Bunu kilobayt cinsinden belirledik çünkü FOCIL ve IL'lerin asıl tükettiği şey bant genişliğidir ve hepsi bu kadar. Medyan işlem boyutunu alırsanız, IL başına yaklaşık 40 işleme ulaşıyoruz ve tüm işlemler benzersizse, bu 16 komite üyesinin tamamında birleştirilebilecek yaklaşık 640 işlem demektir.

Tam olarak optimum boyut üzerinde yapılması gereken çok fazla araştırma var mı bilmiyorum. Bizim tercih ettiğimiz şey: 16 çarpı 8 kilobayt temel olarak bir blob boyutundadır, bu nedenle birleştirildiğinde muazzam miktarda bir bant genişliği oluşturmaz. Ve IL'ler arasındaki işlemlerin kombinasyonu bir Bloktan daha büyük olduğu için, burada sorun yaşayacağımızı sanmıyorum.

Gelecek için IL boyutunu artırabilirsiniz, ancak IL komite üyelerinin sayısını artırmayı da düşünebilirsiniz. Bu, ağın büyük bir kısmı sansür uygulamaya karar verirse dürüst bir IL komite üyesi bulma şansınızı daha da artırmanızı sağlar. Yani bu da yapabileceğimiz bir şey. Şimdilik 16 tamamen iyi ve yeterli görünüyor, ancak sansür çok çığırından çıkarsa veya daha fazla önlem almamız gerekirse gelecekte bu parametrelerle kesinlikle oynayabilirsiniz.

### Benimsenmeyi izlemek için metrikler (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Burada küçük bir takip sorusu: Bu teklifin benimsenmesini veya başarısını anlamak için takip edebileceğimiz, aklınızda olan herhangi bir metrik var mı?

**Julian Ma:** Bu harika bir soru. Hızlıca cevap vereyim ve ardından sözü Thomas'a bırakayım. Bazı basit metrikler, boş olmayan kaç tane dahil etme listesinin teklif edildiğidir. Ayrıca, Toni Wahrstätter'in ".pics" serisi gibi, bu dahil etme listelerine bir tür kalite ölçütü atayarak belki biraz daha fazla ayrıntı sunan gösterge panellerini düşünebilirsiniz. Yine de prensipte, sansür direncini sağlamak için slot başına yalnızca bir kişinin düzgün bir dahil etme listesi oluşturması gerekir.

Bence bu o kadar önemli bir nokta ki, FOCIL'i yakında uygulamak büyük önem taşıyor; çünkü şu anda blok oluşturucuların çok fazla sansür uygulamadığı ve doğrulayıcıların da çok fazla sansür uygulamadığı sihirli bir düzendeyiz. Bunun çok kırılgan olduğunu söyleyebilirim. Şimdiye kadar blok oluşturucular uzun bir süredir sansür uyguluyordu ve eğer FOCIL'i şimdi kullanıma sunarsak, tüm bu doğrulayıcıların onu benimsemesini ve anlamlı dahil etme listeleri oluşturmasını varsayılan hale getirme olasılığımız var. Blok oluşturucular sansür uygulamadığı için burada yaratılan bir piyasa istikrarsızlığı yok. Eğer oluşturucular arasında sansür olana kadar beklersek, o zaman FOCIL'i kullanıma sunmak çok daha zor olur ve benimsenmeyi ölçmek için kullanılacak tüm metriklerin çok daha kötü olacağını tahmin ediyorum.

**Thomas Thiery:** Bakılması gereken bir diğer önemli metrik de kelimenin tam anlamıyla herkese açık bellek havuzu işlemlerinin dahil edilme gecikmesidir. Herkese açık bellek havuzunda bekleyen tüm işlemleri alırsınız ve ne kadar hızlı dahil edildiklerini görürsünüz. Eğer FOCIL işe yararsa, hepsi bir sonraki bloğa dahil edilecektir. Eğer edilmezlerse, bu, doğrulayıcıların büyük bir kısmının sansür uyguladığı anlamına gelir. Dolayısıyla bakabileceğimiz diğer metrik, kimin sansür uyguladığı ve ağın ne kadarının sansür uyguladığıdır. Bunu takip etmek için gösterge panellerimiz ve çok şeffaf metriklerimiz olacak, çünkü FOCIL'in temel olarak yapması gereken şey budur. Eğer herkese açık işlemler bir sonraki bloğa dahil edilmezse, bu, ağın çok büyük bir bölümünün aslında bu işlemleri sansürlediği anlamına gelir.

**Pooja Ranjan:** Çok ilginç. Yani belki de bu araştırmacılar için bir şeydir: yükseltmeler için olası bir istek listesi; bir teklif bir ağ yükseltmesine dahil edildiğinde, gösterge panelleri ve metrik izleyicilerin geliştiriciler tarafından paylaşılması gerektiği.

### İstemci uygulama durumu (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** Julian'ın da bahsettiği gibi, bu teklifin en kısa sürede uygulanması gerekebilir. İstemci uygulaması konusunda ne durumda olduğumuzu merak ediyorum, çünkü son test ağı görüşmesinde Paritosh'un geliştirici ağlarına bazı destekler eklemekten bahsettiğini hatırlıyorum. Peki bu konuda ne durumdayız?

**Thomas Thiery:** Oldukça iyi gidiyoruz. Öncelikle, insanların FOCIL'in uygulama kısmını nasıl ele aldıklarını görmek harikaydı, çünkü ben bir geliştirici değilim, bir araştırmacıyım. Başından beri geliştiricilerle çalışıyorum ama istemcilerde bir şeyleri uygulayan kişi ben değilim.

Buna öncülük eden üç kişi var: Prysm'den Terence ve Prysm konusunda Terence'a çok yardımcı olan ama aynı zamanda Geth üzerinde de çalışan Jihoon var. Yani artık Prysm ve Geth için çalışan bir geliştirici ağımız var, ki bu harika ve devam eden pek çok test var. Şimdi ayrıca FOCIL'in Dora gezgininde gösterilmesini ve görünür olmasını sağlamaya çalışıyoruz. Sonra Lighthouse ve Reth üzerinde çalışan Jacob var ve orada bazı çalışmaların hala devam ettiğini biliyorum. Lodestar son zamanlarda çok aktif; sanırım çalışan bir geliştirici ağına sahip olmaya çok yakınlar. Bugün Nethermind'dan bir prototipleri olduğuna dair bazı haberler aldık, bu çok güzel. Sanki bazılarını unutuyormuşum gibi hissediyorum... Jihoon, Nimbus'un da katıldığını söylüyor. Bu gerçekten çok güzel.

Genel olarak, giderek daha fazla geliştirici ağını hazır ve canlı hale getiriyoruz, yerel geliştirici ağları ve yürütme ile mutabakat katmanı istemcileri arasında giderek daha fazla kombinasyon kuruyoruz. Gerçekten çok iyi bir ilerleme kaydedildi ve bunu görmek çok güzel, çünkü hepimiz geliştiricilerin yaklaşan Pectra ile oldukça meşgul olduklarını ve halihazırda PeerDAS ve diğer şeyler üzerinde çalıştıklarını biliyoruz. Genel olarak Ethereum'daki insanların sansür direncine ne kadar önem verdiğini görmek gerçekten harikaydı. Özel olarak ulaşmadığım ekiplerin çoğu bu çabaya katıldı ve şu anda geliştirici ağları ve testler üzerinde çalışıyorlar.

**Pooja Ranjan:** Bunu paylaştığınız için teşekkür ederim. Geliştirici ağlarındaki güncellemeleri takip etmeyi dört gözle bekliyorum. Bu geliştirici ağının kaç yinelemesi olacağından emin değilim ama bunun yaklaştığını görmek beni heyecanlandırıyor. Justin'in burada bir sorusu olduğunu görüyorum. Justin, lütfen devam et.

### FOCIL Fusaka'da mı yoksa Glamsterdam'da mı? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Tamam, bunun için kemerlerinizi bağlayın. Sansürü ele almanın en iyi zamanının sansür gerçekleşmeden önce olduğuna dair çok iyi bir noktaya değindiniz, değil mi? Peki: FOCIL Fusaka'da mı olmalı, yoksa Glamsterdam'ı bekleyebilir mi? Ve bir geliştirici olarak hangisini savunmalıyım?

**Thomas Thiery:** PR'ı açtık ve birleştirildi, FOCIL Fusaka için teklif ediliyor. Fusaka'ya dahil edilmesi gerektiğini düşünüyoruz. Bunun nedenlerinden biri, bazı istemcilerin bunun üzerinde çalışmaya başlamış olması ve çok fazla engelle karşılaşmamış olmalarıdır. Uygulanması çok daha zor olan ve çok daha fazla iş gerektiren diğer teklifler gibi değil. Ayrıca çok tartışmalı da değil. Kimsenin sansür direncine karşı çıktığını sanmıyorum ve herkes bir an önce dahil edilmesi gerektiği konusunda hemfikir gibi. Bu yüzden ben Fusaka'yı seçerdim.

Bekleyip bekleyemeyeceğini bilmiyorum. Teklifler ve yükseltmeler her zaman bekleyebilir. Sadece bu değişiklikleri uygulamanın o kadar kolay olmadığı bir dünyadan kaçınmak istiyorum. İşler çok çabuk tersine dönebilir. Gördüğümüz gibi, tam tersi oldu: birkaç ay önce, ana oluşturuculardan biri durup dururken sansürlemeyi bıraktı. Nedenini sorduk ve "evet, sadece yapmamaya karar verdik" gibi bir cevap aldık. Bu durumda iyiydi, çünkü iyi taraftaydı, ancak tamamen tersine dönebilir ve o zaman bazı işlemleri sansürleyen iki oluşturucumuz olabilir ve çok kötü bir duruma geri dönebiliriz.

Bahsetmek istediğim diğer bir şey, çünkü bunun önemli olduğunu düşünüyorum: eğer üzerinde çalıştığımız bazı tasarımlarla onaylayıcı ve teklif ediciyi gerçekten ayırabileceğiniz APS gibi konuştuğumuz bazı şeylere doğru gidersek, bundan önce FOCIL'in devrede olması ve FOCIL'in çalıştığını bilmemiz gerekir. Amacını, yani Ethereum'un sansür direnci özelliklerini korumayı ve geliştirmeyi yerine getirdiğinden gerçekten emin olmak için FOCIL'in altı ay, bir yıl boyunca Ana Ağ'da olması gerekir. Yani en azından bana göre bir başka aciliyet de, onaylayıcıları zamanlama oyunlarından ve APS ile ulaşmak istediğimiz diğer bazı endişelerden korumak istiyorsak, FOCIL'i mümkün olan en kısa sürede devreye almamız gerektiğidir.

**Pooja Ranjan:** Bazen tekliflerin bir sonraki veya en yakın yükseltme için seçilmediğini görmek üzücü, ancak bir yükseltmeye yalnızca belirli sayıda teklif dahil edilebilir. Teklifin sunulmasının, teklifin hazır olmasının ve ayrıca buna dahil olan testlerin arkasında yapılan tüm sıkı çalışmayı gerçekten takdir ediyorum. Ethereum ekosistemi için yaptığınız tüm çalışmalar için çok teşekkür ederim.

### Hızlı soru-cevap (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Bitirmeden önce, kısa bir hızlı soru-cevap turumuz var. Tek şart, cevabın tek bir kelime veya tek bir cümle olması ve bunu bir zamanlayıcıyla, belki her biri için 30 saniye ile yapmaya çalışacağız. Hazırsanız, devam edelim ve Julian ile başlayalım. Şu anda Blokzincir araştırmalarındaki en zor problem nedir?

**Julian Ma:** Çok fazla geyik yapmayacağım, bu yüzden ciddiyetle cevaplayacağım. En zor problemin staking'in geleceği olduğunu söyleyebilirim: staking'in geleceğinin ne anlama geldiği, hangi hizmet sağlayıcıların hangi rolleri üstlendiği, bunun için nasıl telafi edildikleri ve birbirleriyle nasıl ilişki kurdukları.

**Pooja Ranjan:** Yeterince keşfedilmemiş bir Blokzincir kullanım durumu nedir?

**Julian Ma:** FOCIL derdim.

**Pooja Ranjan:** Bugün Ethereum için en büyük güvenlik riski nedir?

**Julian Ma:** Dürüst olmak gerekirse burada sansür direncinin çok kritik olduğunu söyleyebilirim, çünkü örneğin L2'ler için büyük güvenlik riskleri oluşturabilecek çoklu blok MEV gibi şeyler var.

**Pooja Ranjan:** MEV minimize mi edilmeli, benimsenmeli mi, yoksa ikisinin arasında bir şey mi olmalı?

**Julian Ma:** Burada Flashbots'un görüşüne büyük ölçüde katılıyorum; yani demokratikleştirilmeli, bu da gerekli olduğu yerlerde maksimize edilmesi ve uygulama katmanında minimize edilmesi gerektiği anlamına geliyor.

**Pooja Ranjan:** Merkeziyetsizlik her zaman ödün vermeye değer mi?

**Julian Ma:** Genellikle ödün vermeye değerdir.

**Pooja Ranjan:** Ethereum'un dünyaya getirdiği en büyük inovasyon nedir?

**Julian Ma:** Burada Mike Neuder'in Devcon'daki dijital mülkiyet hakları üzerine konuşmasına atıfta bulunmak istiyorum. Dünyayı gerçekten değiştiren sansüre dirençli dijital mülkiyet hakları diyebilirim.

**Pooja Ranjan:** Çok teşekkür ederim, çok iyi cevapladınız. Bir sonraki soru setim Thomas için. Peki, Ethereum var olmasaydı hangi Blokzincir üzerinde çalışıyor olurdunuz?

**Thomas Thiery:** Sanırım ben çok geyik yapacağım ve Julian beni biraz ters köşeye yatırdı çünkü onun da aynısını yapacağını düşünmüştüm. O Blokzincir FOCIL olurdu.

**Pooja Ranjan:** Blokzincir için en çok abartılan kullanım durumu nedir?

**Thomas Thiery:** FOCIL olmadan hiçbir kullanım durumu abartılmaya değmez.

**Pooja Ranjan:** Ethereum'un bir an önce geliştirmesi gereken bir şey nedir?

**Thomas Thiery:** FOCIL ile sansür direnci.

**Pooja Ranjan:** Merkeziyetsizliği tanımlamak için tek bir kelime?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** Sizce Ethereum ölçeklenebilirliği tamamen çözecek mi?

**Thomas Thiery:** FOCIL ile Ethereum, evet.

**Pooja Ranjan:** Katman 1 (L1) ölçeklendirmesi mi yoksa katman 2 (L2) ölçeklendirmesi mi, hangisi kazanır?

**Thomas Thiery:** Sonsuz katmanlar, hepsi FOCIL ile.

**Pooja Ranjan:** Çok iyiydi, çok teşekkür ederim Thomas. Tüm bu soruları cevapladığınız için teşekkürler. Toparlarken, bu fırsatı size vermek istiyorum: teklif hakkında topluluğa veya genel olarak Ethereum topluluğuna bir mesajınız var mı?

### Topluluğa mesajlar (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** Aslında bu çok önemli bir konu, çünkü sürekli aktif tartışmalarımız oluyor ve bunların hepsi Discord'da herkese açık. Başlangıçta her şeyi herkese açık hale getirmek için bir çaba vardı ve insanlar bunu gerçekten yapıyor, bu yüzden çok memnunum. Tartışmaları ve ilerlemeyi herkese açık Eth R&D Discord'unda, inclusion-list kanalından takip edebilirsiniz. Şu anda her şey temel olarak orada gerçekleşiyor. Ayrıca bize Twitter, Telegram veya herhangi bir yerden ulaşabilirsiniz. Çekinmeyin.

Ne kadar çok insanla konuşur ve onları dahil edersek, tasarım ve uygulama o kadar iyi olacaktır. Bu yüzden herhangi bir şekilde yardımcı olabilecekseniz bize ulaşın; araştırma tarafı da dahil olmak üzere her konuda yardımcı olmaktan mutluluk duyarız. Sanırım FOCIL'in geleceği üzerinde çalışmak isteyen insanlarla çalışmak bizim için daha da uygun. Gizlilikten bahsettik, işlem ücreti mekanizmalarından bahsettik ve ayrıca bloblar için FOCIL'e çok fazla odaklanacağız. Tüm bu konular insanlara ve araştırma çabasına ihtiyaç duyuyor. İlgileniyorsanız bize ulaşın. Bizi ağırladığınız için çok teşekkürler ve Ethereum için yaptığınız tüm çalışmalar için de teşekkür ederiz.

**Julian Ma:** Buna ek olarak, umarım bazı insanları FOCIL konusunda heyecanlandırmışızdır. Eğer heyecan duyuyorsanız, lütfen bize bildirin. Ve hala sorularınız varsa, bunları yanıtlamaktan mutluluk duyarız ve umarım sizi FOCIL'in gerçekten doğru yol olduğuna ikna edebiliriz. Çok teşekkür ederim. Burada olmak gerçekten bir zevkti ve bu oturuma ev sahipliği yaptığınız için teşekkürler. Ve tabii ki katılan herkese de teşekkürler.

### Kapanış sözleri (59:52) {#closing-words-5952}

**Pooja Ranjan:** Teşekkürler. Programımızın sonuna geldik. Bugün bize katıldıkları ve EIP-7805 hakkındaki görüşlerini paylaştıkları için Thomas ve Julian'a çok teşekkür ederiz. Tüm katılımcılara teşekkürler; sorularınız teşvik edici ve bilgilendiriciydi. Bizi izlediğiniz için teşekkürler. Bu sohbetten keyif aldıysanız beğenmeyi, abone olmayı ve bu bölümü diğer Ethereum meraklılarıyla paylaşmayı unutmayın. PEEPanEIP'te size daha fazla EIP ve araştırma gelişmesi sunmaya devam edeceğiz. Bir dahaki sefere kadar, bilgiyle mırıldanmaya ve Ethereum Cat Herders ile Ethereum'da gezinmeye devam edin. Gününüzün geri kalanının harika geçmesini dilerim.