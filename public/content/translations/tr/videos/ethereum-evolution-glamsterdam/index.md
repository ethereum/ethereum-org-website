---
title: "Ethereum'un evrimi: Fusaka, Glamsterdam ve ötesi"
description: "Preston Van Loon, Fusaka ve Glamsterdam yol haritası kilometre taşlarını ve protokolün uzun vadeli evrimini kapsayan, Ethereum'un yaklaşan protokol yükseltmeleri hakkında konuşuyor."
lang: tr
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "roadmap-and-priorities"
  - "roadmap"
  - "upgrades"
format: presentation
author: ETHDenver
breadcrumb: "Ethereum Evrimi"
---

Offchain Labs ve Prysm'den **Preston Van Loon**'un ETHDenver'da yaptığı bir sunum. Preston, Ethereum'un son yükseltme hızını ve Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, daha kısa slot süreleri ve daha hızlı kesinlik dahil olmak üzere ağ için nelerin ufukta olduğunu ele alıyor.

*Bu döküm, ETHDenver tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=GgKveVMLnoo) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Giriş (0:07) {#introduction-007}

**Sunucu:** Pekâlâ millet. Hız kesmeden devam ediyoruz. Preston Van Loon ile Ethereum'un evrimi hakkında konuşacağız. Söz sende.

**Preston Van Loon:** Pekâlâ. Teşekkürler. GM — biliyorsunuz, sabah olsun ya da olmasın, gece veya gündüz her zaman GM'dir. Bu yüzden bütün gün ve gece GM diyorum. Ethereum'un evrimi hakkında konuşmak istiyorum, o yüzden hadi başlayalım.

Muhtemelen daha önce duyduğunuz bir anlatı var: Ethereum ürün çıkarmada çok yavaş. Bunu duyduğunuzu biliyorum. Ben de duydum. Defalarca duydunuz. İnsanlar şöyle derdi: "Birleşme ne zaman? Geliştiriciler bir şey yapamaz mı? Diğer zincirler hızlı ilerliyor. Ethereum neden bu kadar yavaş ilerliyor?" Size bu anlatının artık öldüğünü söylemek için buradayım.

Prysm fikir birliği istemcisi üzerinde çalışıyorum. Bu, Ethereum işaret zincirinin temel bileşenlerinden biridir. Ve en son güncellemeler için — Pectra, Fusaka için — cephedeydim. İçeriden gördüğüm kadarıyla bu, insanların yıllardır Ethereum için iddia ettiği yavaş işleyen bir bürokrasi değildi. Aslında, Ethereum tarihinde şimdiye kadar gördüğümüz en büyük yükseltmelerden bazılarını sunan, yüksek hızlı ve iyi işleyen bir makineydi.

#### Bir yılda üç yükseltme yayımlamak (1:18) {#shipping-three-upgrades-in-one-year-118}

2025'te yayımladığımız şey, bir yıl içinde üç büyük güncellemeydi. İlk olarak, Mayıs 2025'te Pectra. Bu, yerleşik hesap soyutlama, birleştirmelere olanak tanıyan doğrulayıcı maksimum etkin bakiye artışı ve on adet daha EIP getirdi. Mayıs ayında bu, EIP'ler açısından Ethereum'un şimdiye kadar gördüğü en büyük yükseltmeydi.

Ancak sadece yedi ay sonra, EIP'ler açısından daha da büyük bir yükseltme olan Fusaka'yı yayımladık. Bunda, gerçekten heyecan verici olan PeerDAS adlı bir inovasyonla birlikte on üç EIP vardı. Ancak sadece altı gün sonra, bir BPO1 çatallanması ile tekrar yükseltme yaptık ve kısa bir süre sonra BPO2 onu izleyerek Ethereum'un blob kapasitesini artırdı.

Bu, Ethereum'un ürün çıkarma becerisinin bir kanıtıdır. Bu; beş veya altı fikir birliği istemcisi, beş yürütme istemcisi, birçok araştırmacı — Ethereum'un çekirdek geliştirmesine dahil olan yüzden fazla kişi — arasındaki bir iş birliğidir ve hepsi aynı anda koordineli bir şekilde ürün yayımlıyor.

#### PeerDAS ölçeklendirmesi (2:22) {#peerdas-scaling-222}

Fusaka'nın başrol oyuncusuna bir göz atalım: PeerDAS. PeerDAS çok harika bir ölçeklendirme çözümüdür. PeerDAS'tan önce Pectra vardı ve Pectra ile — bir düğüm operatörü veya doğrulayıcı olarak — bir blok ile gelen her blob'u indirmek zorundaydınız. Bu, blok başına altı blob'u hedefliyordu. Herkesin bunu indirmesi gerekiyordu ve bu gerçekten bir ölçeklendirme darboğazıdır. Bunu artırmak isterseniz, düğüm operatörlerinden blob'lar için bant genişliği kullanımlarını orantılı olarak artırmalarını istemiş olursunuz.

Şimdi Fusaka ile, silme kodlamalı (erasure-coded) blob'larımız var ve doğrulayıcılardan bunun sadece bir kısmını muhafaza etmelerini istiyoruz. Blob'ların sadece sekizde birini muhafaza etmeniz yeterli. Ve blob'ların herhangi bir %50'si ile tamamını yeniden oluşturabilirsiniz. Dolayısıyla, bunun ağ üzerine yayılmasıyla, verilerin kullanılabilir olduğundan ve bireysel stake edenlerin üzerindeki yükün azaldığından emin olunur. Bu bize blob kullanımında anında neredeyse %90'lık bir ağ bant genişliği azalması sağlıyor.

Rakamlara bakacak olursak: Pectra için 36 milyonluk bir gaz limiti ile altı hedefimiz ve maksimum dokuz blob'umuz vardı. Bunu blob kullanımı için temel olarak kabul ediyoruz — bu, blok başına 768 kilobayt idi. Şimdi, Pectra ve Fusaka arasında, gaz limitinin artırıldığı bant dışı bir yükseltme yaptık. Bu, doğrulayıcıların blok limitinin ne olması gerektiğine dair basitçe oy kullandığı bir zincir içi yönetişim süreciydi — 36'dan 45 milyona çıktı. Ve sonra yılın ilerleyen zamanlarında, blob hedefini veya maksimumunu değiştirmeyen ancak gaz limitini tekrar artıran Fusaka'ya ulaştık.

Ve sonra, altı blob hedefi olan her bloğun artık bir doğrulayıcının depolaması gereken sadece 96 kilobaytlık blob verisi olduğu o büyük bant genişliği düşüşünü elde ettik. Sonra yine sadece blob parametrelerini içeren çatallanma olan BPO1 ile hedefi 10'a ve maksimumu 15'e çıkardık. Sadece bir ay sonra gerçekleşen BPO2, 14 ve 21'e çıktı — bu Pectra'da sahip olduğumuzun iki katı, ancak bireysel stake edenler için blob'larda hala %71 daha az bant genişliği kullanımı anlamına geliyor.

#### Glamsterdam'da neler geliyor (4:30) {#whats-coming-in-glamsterdam-430}

Glamsterdam'da sırada ne var? Gerçekten kilit öneme sahip üç şey ve hala aktif araştırma aşamasında olan bir şey var.

Birincisi ePBS — protokole yerleşik teklifçi-oluşturucu ayrımı (PBS). Bugün blok üretiminin yapılma şekliyle, birçok kişi MEV-Boost aracılığıyla bir blok oluşturma fırsatını çok sofistike oluşturuculara devrediyor. Bu, ağın çoğunluğunu oluşturuyor. Sorun şu ki, bir aktarıcıya güvenmek zorundasınız ve oluşturucunun teklif verdiği bloğu gerçekten öne süreceğine dair büyük bir güven gerekiyor. ePBS, çok daha az güven gerektiren bir protokol içi mekanizma sunar ve aynı fikrin çok temiz bir uygulamasıdır.

Sahip olduğumuz bir sonraki şey blok düzeyinde erişim listeleridir. Bu, her bloğun durum içinde nerede veri okuduğunu veya yazdığını belirten bir listeyle geleceği harika bir inovasyondur. Bunun anlamı, blokları paralel olarak işleyebilmenizdir. Bugün blokları sırayla işlemek zorundasınız. 10. bloğu işlemek istiyorsanız, önce 9'u, 8'i ve diğerlerini işlemeniz gerekir. Şimdi, eğer bir blok koleksiyonunuz varsa ve hiçbiri durum erişim bilgileriyle çakışmıyorsa, sekizinin tamamını paralel olarak işleyebilirsiniz. Belki sekiz çekirdeğiniz vardır — bu, Ethereum'u blokları işlemek için daha verimli ve daha hızlı hale getirir.

Üçüncü şey gaz yeniden fiyatlandırmasıdır. Bu EIP aracılığıyla bazı işlem kodlarının aşırı fiyatlandırıldığını, bazılarının ise düşük fiyatlandırıldığını gösteren kıyaslamalar yapıldı. Şimdi, Ethereum'u daha güvenli ve daha verimli hale getirmek için her bir işlem kodu için ödediğiniz ücretleri gerçeği yansıtacak şekilde güncelleyeceğiz.

#### Katman 2 (L2)'lerin evrilen rolü (6:14) {#the-evolving-role-of-l2s-614}

Vitalik'in yakın zamanda bahsettiği bir şey hakkında konuşmak istiyorum. Birkaç hafta önce attığı bir tweet'te, katman 2 (L2)'lerin orijinal vizyonunun ve Ethereum'daki rollerinin artık mantıklı olmadığını söyledi. Bu çok fazla manşet oldu ve bence birçok insan bundan yanlış bir sonuç çıkardı.

İçeriden biri olarak bunun ne anlama geldiğini size söyleyeyim. Ethereum beklenenden daha hızlı ölçekleniyor. Ücretler her zamankinden daha düşük. Ana Ağ üzerinde bir Gwei'den daha az gaz ücreti ödeyeceğimi hiç düşünmezdim ama işte buradayız. Blob'lar bol miktarda — elimizde fazlasıyla var. Blob'ları beklenenden daha hızlı ölçeklendiriyoruz. Ve L2 ücretleri bile gerçekten düşük.

Dolayısıyla, genel amaçlı L2'lere ihtiyacımız olduğu fikri — yani, katman 1 (L1)'de sahip olduğumuz aynı EVM olan, sadece birkaç kez kopyalayıp yapıştırdığımız ve tek yaptıkları daha hızlı gitmek olan L2'ler — artık vizyonumuz bu değil. Bu L2'ler uzmanlaşarak gelişecekler. Bazıları gizlilik, oyun, merkeziyetsiz finans (DeFi) içindeki belirli alanlar veya EVM'nin uzantıları gibi şeyleri hedefleyecek. Ancak sadece L1'in klonlanmış bir kopyası iseler, L2'ler aracılığıyla bu tür parçalanmış bir paradigmayı ilk başta hayal ettiğimiz yol haritasının bir parçası değillerdir.

#### FOCIL: protokol düzeyinde sansür direnci (7:25) {#focil-protocol-level-censorship-resistance-725}

Glamsterdam'ın ötesinde, aktif geliştirme ve araştırma aşamasında olan gerçekten harika üç şey var. Birincisi FOCIL — Çatallanma Seçimi ile Zorunlu Kılınan Dahil Etme Listeleri.

Çözmeyi amaçladığı sorun, blok oluşturucuların bir seçeneğe sahip olmasıdır. Hangi işlemlerin bloğa dahil edileceğine onlar karar verir. Bazılarını tercih edebilir veya diğerlerini etmeyebilirler — belki bu bir MEV avantajı içindir, belki de düzenleyici baskıdır. Ancak her halükarda, işlemleri istedikleri gibi sansürleyebilirler ve kimsenin bu konuda yapabileceği hiçbir şey yoktur.

FOCIL güç dinamiğini değiştiriyor. Blok oluşturucuların bir bloktaki tüm işlemleri seçebileceğini söylemek yerine, yerel sezgisel yöntemlerine dayanarak bir sonraki bloğa dahil edilmesi gerektiğine inandıkları bazı işlemleri seçen rastgele bir komite vardır. Bu, bir sonraki bloktaki işlemlerin tamamı değildir. Oluşturucuların hala çok fazla özgürlüğü var, ancak dahil etmeleri gereken bir alt küme bulunuyor. Blok teklifçisi bu kısa listeyi — belki sekiz kadar işlemi — alıp bloğun sonuna koyacak ve bunlar blokla birlikte yürütülecek.

Bu, çatallanma seçimi yoluyla zorunlu kılınır. Bir bloğu gören doğrulayıcılar, altına eklenmiş bir dahil etme listesi olmadığı sürece ona onay vermeyecektir. Listesi olmayan bir blok görürlerse, o bloğu geçersiz sayacak ve görmezden geleceklerdir — onu yaymayacaklar, üzerine oy vermeyecekler. Bu, bazı parametreleri hala kararlaştırılmakta olan aktif bir araştırmadır, ancak yön açıktır: Ethereum, protokol düzeyinde sansür direncini içerecektir.

#### Daha kısa slot süreleri (9:24) {#shorter-slot-times-924}

Bir sonraki gerçekten heyecan verici olan şey daha kısa slot süreleridir. Glamsterdam'dan sonraki çatallanma olan Hegata ile, daha kısa slot sürelerini veya hızlı slotları dahil edip edemeyeceğimizi değerlendiriyoruz. Bu, doğrudan altı saniyelik slotlara veya daha da hızlısına atlayacağımız anlamına gelmiyor, ancak bunu mümkün kılacak altyapıyı inşa ediyoruz.

Kulağa gerçekten basit geliyor — "hadi daha hızlı gidelim" gibi. Ancak ağ yayılımını, gerçekleştirmek için sınırlı bir süreleri olan doğrulayıcı onay görevlerini ve ardından ekonomiyi düşünmeniz gerekir. Bunu ilk denediğimde, sadece 12'yi 6 olarak değiştirdim ve aniden herkes iki kat daha fazla ihraç — iki kat daha fazla para — kazanmaya başladı, ki bu daha kısa slot sürelerinin arkasındaki asıl niyet değildir. Amaç daha hızlı gitmek ama her şeyi eşit tutmaktır. Yani bu çok karmaşık bir şey, ancak oyunun sonunda oraya kademeli olarak ulaşma olasılığı var.

#### Daha hızlı kesinlik (10:20) {#faster-finality-1020}

Üçüncü şey daha hızlı kesinliktir. Bu gerçekten önemlidir çünkü Ethereum her iki dönemde bir — her 13 dakikada bir — kesinleşir ve şu soruyu sormaya gerçekten bağlı olan uygulamalar vardır: işlemim kalıcı mı? İşlem kesinleşmiş bir dönemde yer almadıysa, cevap hayırdır — yeniden organize edilerek (reorg) ortadan kalkma ve işlemin tekrar gönderilmesi gerekme ihtimali küçüktür.

Şimdi, eğer hızlı kesinliğe sahip olursak, borsalar, köprüler veya herhangi bir uygulama bir işlemin kesin olduğundan emin olabilir. İlk olarak, kesinlik için iki dönem yerine bunu bir dönemde yapalım. Sonra 32 slot uzunluğundaki dönemler yerine, bunları dört slota kısaltalım diyebiliriz. Şimdi, bunu altı saniyelik slot süreleriyle birleştirirseniz, 30 saniyeden daha kısa sürede kesinlikten bahsediyorsunuz demektir. Bu gerçekten harika bir nihai hedeftir.

#### Kutup yıldızı (11:15) {#the-north-star-1115}

Tüm bunlar, katman 1 (L1)'in saniyeler içinde kesinleşme ile hızlı olduğunu söylediğimiz kutup yıldızına (nihai hedefe) entegre edilmiştir. Oraya nasıl ulaşırız? İlk olarak, halihazırda yayımlanmış olan PeerDAS ile başlıyoruz. Bu bize veri kullanılabilirliği için ölçeklenebilir bir katman sağladı. Sırada, çoğunlukla teklifçi-oluşturucu ayrımı (PBS) için temiz bir uygulama olan ve FOCIL gibi şeyleri daha etkili hale getiren ePBS'yi içeren Glamsterdam var. FOCIL, ePBS ile çok uyumlu olan sansür direnci ile devreye giriyor. Daha hızlı slotlarla, daha hızlı slot süreleri daha hızlı kesinliği daha da etkili hale getirir. Sonra saniyeler içinde kesinleşmiş hızlı işlemlere gerçekten sahip olduğumuz bu nihai hedefe ulaşıyoruz.

#### Kapanış (12:02) {#closing-1202}

İki yıl sonra hayatın nasıl olacağını hayal etmenizi istiyorum. Kripto çok hızlı ilerlediği için düşünmesi biraz zor. Sadece iki yıl içinde şunlar gerçek olabilir: dört veya altı saniyelik işlem onay süreleri; dakikalarla değil saniyelerle ölçülen kesinlik; sansür direnci için protokol düzeyinde yaptırım; kuantum sonrası kriptografiye karşı korumalar; ve sadece daha hızlı gitmekle kalmayıp özellikler ve yeni inovasyonlar üzerinde rekabet eden katman 2 (L2)'ler. Tüm bunlar olurken, evde tam düğüm çalıştırmak için tüketici sınıfı bir dizüstü bilgisayar veya donanım kullanabilme erdemi de korunacak. Ethereum erişilebilirdir ve gelecekte de herkes için erişilebilir kalacaktır.

Çıkarmanızı istediğim sonuç şu: Başlangıçta size sunduğum anlatıyı destekleyecek hiçbir kanıt gerçekten yok. Ethereum hızlı bir şekilde ürün çıkarıyor. Sadece bir yıl içinde üç yükseltme yapıldı. Ve önümüzdeki 24 ay içinde daha da fazla şey geliyor ve bunlar daha da hızlı gelecek.

Bunlar sadece fantezi ürünü beş yıllık zaman çizelgeleri değil. Bunlar şu anda geliştirilmekte olan somut tekliflere sahip gerçek şeylerdir. Şu anda geliştirici ağında olan şeyler var. Biz konuşurken bu uygulamalar üzerinde çalışan insanlar var. Bugün Ethereum üzerinde bir şeyler inşa ediyorsanız, dünyadaki en aktif şekilde geliştirilen blokzincir üzerinde inşa ediyorsunuz demektir.

Ben Preston Van Loon, Ethereum çekirdek geliştiricisiyim. Offchain Labs'te Prysm ekibinde çalışıyorum. Eğer dahil olmak istiyorsanız, Ethereum'da olup bitenlere ayak uydurmanın en iyi yolu onu bizzat inşa etmeye yardımcı olmaktır. Daha sonra gelip benimle konuşun. Gelin Prysm deposuna veya herhangi bir fikir birliği spesifikasyonu ya da yürütme spesifikasyonu deposuna göz atın — katkılarınızı gerçekten çok isteriz. Teşekkür ederim.