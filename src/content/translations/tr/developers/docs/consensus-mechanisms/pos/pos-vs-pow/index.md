---
title: Hisse ispatı ile iş ispatının karşılaştırılması
description: Mutabakat mekanizmasına dayalı olarak Ethereum'un iş ispatı ile hisse ispatını karşılaştırma
lang: tr
---

Ethererum piyasaya sürüldüğünde hisse ispatının, Ethereum'u güvence altına alabilmesi için hâlâ araştırma ve geliştirmeye ihtiyacı vardı. İş ispatı; temel geliştiricilerin Ethereum'u piyasaya sürmek için işleyebileceği anlamını taşıyan, Bitcoin tarafından çoktan kanıtlanmış daha basit bir mekanizmaydı. Hisse ispatını geliştirmek için onun işlenebileceği noktaya ulaşması sonraki sekiz yıllık zamanı aldı.

Bu sayfa Ethereum'un iş ipatından hisse ispatına geçişinin ardındaki gerekçeyi ve bu süreçteki değiş tokuşları açıklar.

## Güvenlik {#security}

Ethereum araştırmacıları hisse ispatını, iş ispatından daha güvenli görürler. Ancak bu, gerçek Ethereum Ana Ağı'na daha yeni işlendi ve iş ispatına kıyasla süre açısından daha az kanıtlanmıştır. Aşağıdaki kısımlar hisse ispatı güvenlik modelinin iş ipatına kıyasla iyi ve kötü yönlerini ele alır.

### Saldırı maliyeti {#cost-to-attack}

Hisse ispatında doğrulayıcılar, en az 32 ETH'yi bir akıllı sözleşmeye emanet (kilitleme) etmelidir. Ethereum kötü niyetle davranan doğrulayıcıları cezalandırmak için hisselenen etherleri yok edebilir. Mutabakata varmak için toplam hisselenen etherin en az %66'sı, belirli bir blok kümesinin lehine oy vermelidir. Hisseleri >=%66 ile oylanan bloklar, tekrar düzenlenmeyecek veya ortadan kaldırılamayacak anlamına gelen ''kesinleşmiş'' hale dönüşür.

Ağa saldırmak; zincirin kesinleşmesini engellemek veya gerçek zincirdeki belirli blok organizasyonlarının bir şekilde saldırgana katkı sağladığının güvence altına alınması anlamına gelir. Bu; saldırganın ya yeteri miktarda ether biriktirip bunu doğrudan oylaması ya da dürüst doğrulayıcıları belirli yönde oy kullanmaları konusunda kandırmaları ile dürüst mutakabat yolunu ayrıştırmasını gerektirir. Dürüst doğrulayıcıları kandıran karmaşık, düşük ihtimalli saldırılar bir yana, Ethereum'a saldırmanın maliyeti bir saldırganın mutabakatı kendi isteğine göre etkilemesi için biriktirmesi gereken hissenin maliyetidir.

Saldırının en düşük masrafı toplam hissenin >%33'üdür. Toplam hissenin >%33'üne sahip saldırgan yalnızca çevrimdışı olarak kesinlik gecikmesine sebep olabilir. Bu; ''hareketsizlik sızıntısı'' olarak da bilinen, çevrimiçi çoğunluğun hissenin %66'sına erişene ve zinciri yeniden kesinleştirene kadar hisseyi sızdıran bir mekanizmanın varlığından ötürü ağ için görece küçük bir sorundur. Blok üreticisi olmaları ve tüm doğrulayıcılarıyla çifter oy vermeleri istendiğinde toplam hissenin %33'ünden biraz fazlasına sahip olan bir saldırganın, bir yerine iki blok yaratarak çift kesinliğe sebep olması teorik olarak mümkündür. Her çatal, her bir bloku birinci olarak görmek için kalan dürüst doğrulayıcıların yalnızca %50'sine ihtiyaç duyar, bu sebeple eğer mesajları zamanında göndermeyi başarırlarsa her iki çatalı da kesinleştirmeyi başarabilirler. Bunun başarılı olma şansı daha azdır ancak eğer saldırgan çift kesinliğe sebep olmayı başarırsa saldırgan doğrulayıcıların diğer çatala bölünmesi gerekeceğinden Ethereum topluluğu hangi çatalı takip edeceğine karar vermek zorunda kalacaktır.

Toplam hissenin >%33'ü ile Ethereum ağında daha ufak (kesinlik gecikmesi) ya da daha büyük (çift kesinlik) etkilere sahip olma şansı vardır. Ağda hisselenmiş 14.000.000'dan fazla ETH ve ETH başına 1000$ değeri ile bu saldırılara girişmenin asgari maliyeti `1000 x 14.000.000 x 0,33 = $4.620.000.000`'dır. Saldırgan bu parayı, cezalandırılma ve ağın dışına konulma ile kaybedebilir. Yeniden saldırmak için tüm hissenin >%33'ünü (yeniden) biriktirmeli ve bunu yakmalıdır (yeniden). Ağa her saldırı girişimi >$4.6 milyardan fazlasına mal olacaktır (ETH başına 1000$ ve hisselenmiş 14.000.000 ETH için). Saldırgan da bunlar cezalandırıldığında ağın dışına konulur ve tekrar katılım için aktivasyon sırasına girmek zorundadır. Bunun anlamı; tekrarlı saldırının yalnızca saldırganın toplam kilidin >%33'ünü biriktirme hızıyla değil ağdaki tüm doğrulayıcıları tekrardan ağa dahil etme zamanıyla sınırlandırılmıştır. Saldırgan her saldırdığında daha fakirleşir ve topluluğun geri kalanı, tedarik şoku sayesinde daha zenginleşir.

Diğer saldırılar, %51 saldırısı veya toplam hissenin %66'sı ile kesinlik geri çevirmesi gibi, çok miktarda daha fazla ETH gerektirir ve saldırgan için çok daha masraflıdır.

İş ispatı ile karşılaştırıldığında. İş ispatlı Ethereum'a saldırı başlatmanın maliyeti ağın toplam karma oranının >%50'sine sürekli sahip olmanın maliyeti kadar tutar. Bu durum, sürekli olarak iş ispatı çözümlerini hesaplamak için diğer madencileri geride bırakacak yeterli hesaplama gücüne sahip donanımın ve işletme maliyetlerinin toplamı anlamına geliyor. Ethereum'da genellikle ASIC'ler yerine GPU'lar kullanılarak madencilik yapıldı, bu da maliyeti düşük tuttu (ancak Ethereum iş ispatı üzerinde devam etseydi, ASIC madenciliği daha popüler hale gelebilirdi). Bir saldırganın iş ispatı temelli bir Ethereum ağına saldırmak için çok miktarda donanım satın alması ve işletmesi için elektrik ödemesi gerekebilir, ancak toplam maliyet, bir saldırı başlatmak için yeterli miktarda ETH biriktirmek için gereken maliyetten daha düşük olacaktır. İş ispatı, hisse ispatına dayalı bir ağda %51 saldırısı [ gerçekleştirmek, yaklaşık 20 kat daha az maliyetlidir](https://youtu.be/1m12zgJ42dI?t=1562). Eğer saldırı tespit edilirse ve zincirdeki değişiklikleri kaldırmak için sert bir çatallanma gerçekleşirse, saldırgan aynı donanımı tekrar tekrar kullanarak yeni çatalı da hedef alabilir.

### Karmaşıklık {#complexity}

Hisse ispatı, iş ispatından çok daha fazla karmaşıktır. Hataların veya kazara daha basit protokollere kasti olmayan etkilerin tanıtımı daha zor olduğundan bu, iş ispatının lehine bir nokta olabilir. Ancak karmaşıklık, yıllar süren araştıma-geliştirmeleri, simülasyonlar ve test ağı işlemeleriyle azaltıldı. Hisse ispatı protokolü; beş ayrı ekip (yürütüm ve fikir birliği katmanlarının her birinde) tarafından, müşteri hatalarına karşı dayanıklılık sunarak beş programlama dilinde bağımsız bir şekilde işlendi.

Hisse ispatı mutabakat mantığını güvenli şekilde geliştirmek ve denemek için, hisse ispatı Ethereum Ana Ağı'na işlenmeden iki sene önce İşaret Zinciri piyasaya sürüldü. İşaret Zinciri, hisse ispatına dayalı testler için bir kum havuzu görevi gördü çünkü gerçek Ethereum işlemlerine dokunmadan hisse ispatına dayalı mutabakat mantığını uygulayan canlı bir blok zincir oldu - etkili bir şekilde sadece kendi üzerinde mutabakata vardı. Bu, yeterli bir süre boyunca istikrarlı ve hatadan arınmış olunca, İşaret Zinciri Ethereum Ana Ağı ile ''birleştirildi''. Tüm bunlar, hisse ispatına dayalı karmaşıklığı dizginlemeye katkıda bulundu ve istenmeyen sonuçların veya müşteri hataları riskinin çok düşük olduğu bir noktaya geldi.

### Saldırı yüzeyi {#attack-surface}

Hisse ispatının, iş ispatından daha karmaşık olması daha fazla potasiyel saldırı vektörünün olacağı anlamına gelir. İstemcileri bağlayan eşler arası bir ağ yerine her biri ayrı bir protokolü işleyen iki tane ağ vardır. Her bir yuvada blok önerecek özel doğrulayıcının önceden seçilmişliğine sahip olmak fazla miktarda ağ trafiğinin bu özel doğrulayıcıyı çevrimdışı yakaladığında devireceği hizmet reddi potansiyelini yaratır.

Saldırganların, bloklarını veya tasdiklerini dikkatli bir şekilde zamanlamaları da mümkündür; böylece dürüst ağın belirli bir yüzdesi tarafından alınırlar ve bu kişilerin belirli şekillerde oy vermelerine etki ederler. Son olarak, saldırgan hisselemek için yeterli ETH biriktirebilir ve mutabakat mekanizmasını domine edebilir. Her bir saldırı [ vektörünün ilişkilendirilmiş savunmaları bulunsa da](/developers/docs/consensus-mechanisms/pos/attack-and-defense), iş ispatı altında savunma amacıyla var olmazlar.

## Merkeziyetsizlik {#decentralization}

Hisse ispatı, iş ispatı kadar merkezi olmayan bir sistemdir çünkü madencilik donanımı yarışları genellikle bireyleri ve küçük organizasyonları fiyatlandırma eğilimindedir. Her ne kadar teorik olarak herkes mütevazı donanım ile madencilik yapmaya başlayabilse de, herhangi bir ödül alma olasılıkları kurumsal madencilik operasyonlarına kıyasla oldukça küçüktür. Hisse ispatına dayalı sistemde, tüm katılımcılar için hisseleme maliyeti ve bu hisseleme üzerinden elde edilen yüzde dönüş oranı aynıdır. Şu anda doğrulayıcı çalıştırmanın maliyeti 32 ETH'dir.

Başka bir deyişle, likidite hisseleme türevlerinin icadı birkaç büyük sağlayıcının büyük miktarlarda hisselenmiş ETH yönetmesi sebebiyle merkeziyet endişelerine neden oldu. Bu sıkıntılıdır ve en kısa sürede düzeltilmesi gerekir, ancak göründüğünden çok daha inceliklidir. Merkezi hisseleme sağlayıcıları, genellikle doğrudan merkezi kontrolü sağlamazlar; sıkça, bağımsız düğüm operatörlerinin birçoğunun 32 ETH'ye ihtiyaç duymadan hisseleme yapabileceği merkezi bir ETH havuzu oluşturmanın bir yolu olarak hizmet verirler.

Ethereum için en iyi seçenek, doğrulayıcıların ana sayfa bilgisayarlarında yerel olarak çalıştırılmasıdır, böylece merkeziyet en aza indirgenir. Bu nedenle Ethereum, bir düğüm/doğrulayıcı çalıştırmak için donanım gereksinimlerini artıran değişikliklere karşı direnç gösterir.

## Sürdürülebilirlik {#sustainability}

Hisse ispatı blok zinciri güvence altına almanın karbon açısından ucuz yoludur. İş ispatı altında, madenciler bir blokta madencilik yapma hakkı için yarışırlar. Madenciler hesaplamaları daha hızlı gerçekleştirebildikleri zaman daha başarılı olurlar, bu da donanım ve enerji tüketimine yatırım yapmayı teşvik eder. Bu Ethereum için hisse ispatına geçiş yapmadan önce gözlemlenmişti. Hisse ispatına geçişten kısa bir süre önce, Ethereum görünürde yıllık yaklaşık 78 TWh tüketiyordu - neredeyse küçük bir ülke kadar. Ancak, hisse ispatına geçiş Ethereum'un enerji tüketimini yaklaşık %99,98 düşürdü. Hisse ispatı Ethereum'u enerji tasarruflu, düşük karbonlu bir platform haline getirdi.

[Ethereum'un enerji tüketimi hakkında daha fazlası](/energy-consumption)

## Basım {#issuance}

Hisse ispatı Ethereum, iş isparı Ethereum'dan çok daha az coin basımı yaparak güvenliğini karşılayabilir çünkü doğrulayıcıların yüksek elektrik ücretleri ödemesi gerekmez. Sonuç olarak, yüksek miktarda ETH yakıldığında ETH enflasyonunu azaltabilir veya hatta deflasyona neden olabilir. Düşük enflasyon seviyeleri Ethereum'un güvenliğinin iş ispatındakinden daha ucuz olduğu anlamına gelir.

## Görsel olarak öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

Justin Drake'in hisse ispatının iş ispatına göre avantajlarını açıklamasını izleyin:

<YouTube id="1m12zgJ42dI" />

## Daha fazla bilgi {#further-reading}

- [Vitalik'in hisse ispatı tasarım felsefesi](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Vitalik'in hisse ispatı SSS'leri](https://vitalik.ca/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Hisse ispatı ve iş ispatının "basitçe açıklanmış" videosu](https://www.youtube.com/watch?v=M3EFi_POhps)
