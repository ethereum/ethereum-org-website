---
title: "Tek yuva kesinliği"
description: "Tek yuva kesinliğinin açıklaması"
lang: tr
---

# Tek yuva kesinliği {#single-slot-finality}

Bir Ethereum blokunun tamamlanması yaklaşık 15 dakika sürer. Bununla beraber, Ethereum'un mutabakat mekanizmasının blokları daha etkili bir biçimde doğrulanmasını sağlayarak tamamlanma süresini önemli ölçüde azaltabiliriz. On beş dakika beklemek yerine, bloklar aynı yuvanın içinde önerilip tamamlanabilir. Bu konsept **tek yuva kesinliği (SSF)** olarak bilinir.

## Kesinlik nedir? {#what-is-finality}

Ethereum'un hisse ispatına dayalı taahhüt mekanizması, toplam hisselenmiş Ethereum'un %33'ünü yakmadan blok zincirden kesinlikle bir blokun değiştirilememesi ve silinememesini garanti etmekten bahseder. Bu "kripto-ekonomik"tir çünkü bu olaya güven zincirin sırasının veya içeriğinin değiştirmesi aşırı masraflıdır ve hiçbir rasyonel ekonomik aktör bunu denemez.

## Neden daha hızlı bir kesinlik hedefliyoruz? {#why-aim-for-quicker-finality}

Kesinlik için gereken güncel zamanın çok uzun olduğu ortaya çıktı. Birçok kullanıcı kesinlik için 15 dakika beklemek istemiyor ve büyük işlemleri beklemeden ve işlemlerinin kalıcı olduğunun kesin olduğuna emin olmadan yapmak da borsa ve uygulamalar için uygunsuz bir durum. Bu blok teklifi ve kesinlik arasında yaşanan gecikme aynı zamanda saldırganların belli blokları sansürlemesi ya da MEVi çıkarmasının önünü açıyor. Güncel aşamadaki blokları yükseltmekten sorumlu olan mekanizma da oldukça karmaşık ve güvenlik konusundaki kırılganlıkları kapatabilmek için birkaç kez güncellendi, bu da Ethereum Kod bazındaki anında göze çarpmayan bazı "hata"ların oluşmasının muhtemel olduğu anlamına geliyor. Bu sorunların tamamı tek bir blokun kesinliğinin süresini azaltarak çözülebilir.

## Merkeziyetsizlik / zaman / ek yük ödünleşimi {#the-decentralization-time-overhead-tradeoff}

Kesinlik garantisi yeni bir bloka anında gelebilen bir özelllik değil, yeni bir blokun kesinlik evresine gelmesi zaman alıyor. Bunun nedeni, ağdaki toplam hisselenmiş ETH'nin en az 2/3'ünü temsil eden doğrulayıcıların, bir blokun kesinleşmiş sayılması için o bloka oy vermesi ("onaylaması") gerekmesidir. Ağdaki her doğrulayıcı düğümünün 2/3 eşiğini geçip geçmediğinin bilinebilmesi için diğer düğümler tarafından kanıtlama sürecinden geçmesi gerekiyor.

Kesinliğe kadar verilen süre ne kadar kısaltılabilirse, her düğümde daha fazla bilgi işlem gücü gerekir çünkü kanıtlama sürecinin daha hızlı yapılması gerekir. Ayrıca, ağda ne kadar fazla düğüm varsa, o kadar da fazla blok için kanıtlama süreci olacaktır, bu da işem gücü gerekliliğinde artışla sonuçlanır. Daha fazla işlem gücü gerekirse, daha az insan katılabilir çünkü her doğrulayıcı düğüm için daha pahalı donanım gerekir. Bloklar arası zamanı artırmak her düğüm için gereken bilgi işlem gücünü azaltır, ancak aynı zamanda da kesinliğe ulaşma süresini artırır çünkü kanıtlama süreci daha yavaş geçer.

Bu yüzden, Bilgi işlem gücü (overhead) merkeziyetsizleştirme (zinciri doğrulamaya katılan düğüm sayısı) ve kesinlik süresi arasında bir takas, orantı vardır. İdeal bir sistem minimum bilgi işlem gücünü, maksimum merkeziyetsizleştirmeyi ve minimum kesinlik süresini dengeler.

Ethereum'un güncel taahhüt mekanızması bu 3 parametreyi şu şekilde dengeledi:

- **Minimum hisseyi 32 ETH olarak kararlaştırdı**. Bu her bireysel düğüm tarafından işlenecek doğrulayıcı kanıtlamalarına bir üst limit koyar ve bu yüzden artık her düğüm için bilgi işlem gereklilikleri için de bir üst limit olur.
- **Kesinlik süresini ~15 dakika olarak belirlemek**. Bu doğrulayıcılara, normal ev bilgisayarlarıyla her blok için kanıtlama işlemlerini halletmek için yeterli süreyi verir.

Şu anki mekanizma tasarımıyla, kesinlik süresini azaltmak için, ağdaki doğrulayıcı sayısını azaltmak ya da her düğüm için gerekli donanım seviyesini arttırmak şarttır. Ancak, kanıtlamaların yapılma şekline veri yüküne ekleme olmadan bir kerede sayılacak daha fazla kanıtlamaya izin vermek gibi geliştirmeler de var. Daha verimli bu süreç kesinliğin iki dönem arasında değil, tek bir yuvada belirlenmesini sağlayacak.

## SSF'ye giden yollar {#routes-to-ssf}

<ExpandableCard title= "Bugün neden SSF'ye sahip değiliz?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Güncel taahhüt mekanizması her doğrulayıcının bir bloku doğrulamak için işlemden geçirmesi gereken mesajların sayısını azaltmak için çoklu doğralıyıcıların tasdiklerini birleştiriyor. Her doğrulayıcının her dönem (32 yuva) için tasdik imkânı var, ancak her yuvada, sadece bir doğrulayıcı alt kümesi, komite olarak da bilinir, tasdik yapıyorlar. Bunu, birkaç doğrulayıcıyı toplayıcı olarak seçip alt ağlara bölünerek yapıyorlar. Bu toplayıcıların hepsi kendi alt ağlarının içinde diğer doğrulayıcılardan gördükleri imzaları tek bir toplanmış imza şeklinde birleştiriyorlar. En çok bireysel katkıyı toplayan toplayıcı toplanmış imzasını blok önericine gönderir, o da bu imzayı blokun diğer komitelerden de aldığı toplanmış imzaların yanına katar.

Bu süreç her doğrulayıcının her dönem içerisinde oy kullanabilmesi için yeterli kapasiteyi sağlar çünkü "32 yuva_64 komite_komite başına 256 doğrulayıcı=Dönem başına 524.288 doğrulayıcı" yapar. Yazma sürecinde (Şubat 2023), 513.000 akfit doğrulayıcı vardı.

Bu şemada, her doğrulayıcının oy kullanabilmesi sadece kendi tasdiklerini dönem içine yaymasıyla mümkündür. Ancak, mekanizmayı her doğrulayıcının her yuvada tastik edebilmesi için geliştirmenin potansiyel bazı yolları var.
</ExpandableCard>

Ethereum Taahhüt mekanizması tasarlandığından beri, imza toplama şemasının (BLS) başta düşünüldüğüne göre çok daha ölçeklenebilir olduğu ortaya çıktı, tabi bu süreçte istemcilerin işlem ve onay imzaları da gelişti. Tasdik işleminin büyük sayıda doğrulayıcı tarafından tek yuva içinde yapılmasının da aslında mümkün olduğu ortaya çıktı. Örnek olarak, 1 milyon doğrulayıcının her yuvada 2 kere oy kullandığını ve yuvanın süresinin 16 saniye olarak kararlaştıldığı varsayılırsa, 1 yuvada 1 milyon tastiğin yapılabilmesi için her düğümün saniyede 125.000 toplanmayı onaylaması gerekir. Gerçekte normal bir bilgisayar, bir imza onayı gerçekleştirebilmek için 500 nanosaniyeye ihtiyaç duyar, bu da 125.000 imza onayının ~62,5 ms'de, yani 1 saniye eşiğinden çok daha kısa sürede yapılabileceği anlamına gelir.

Örneğin yuva başına rastgele seçilmiş 125.000 doğrulayıcıdan oluşan süper komiteler oluşturularak daha fazla verimlilik kazanımı elde edilebilir. Sadece bu doğrulayıcılar bir blokta oy kullanma hakkına sahiptir ve bu yüzden sadece bu doğrulayıcı alt kümesi blokun kesinleştiğine karar verebilir. Bu fikrin iyi olup olmadığı da, topluluğun Ethereum'a yapılacak bir saldırının ne kadar maliyetli olmasını tercih ettiğine bağlıdır. Bunun nedeni, toplam hisselenmiş ether'in 2/3'ünü gerektirmek yerine bir saldırganın, _o süper komitedeki_ hisselenmiş ether'in 2/3'ü ile dürüst olmayan bir bloku kesinleştirebilmesidir. Bu hâlâ aktif bir araştırma alanıdır, ancak en başta süper komiteler gerektirecek kadar büyük bir doğrulayıcı seti için, bu alt komitelerden birine saldırmanın maliyetinin son derece yüksek olacağı makul görünmektedir (örneğin, ETH cinsinden saldırı maliyeti `2/3 * 125.000 * 32 = ~2.6 milyon ETH` olacaktır). Saldırı maliyeti, doğrulayıcı setinin boyutunu artırarak ayarlanabilir (örneğin, doğrulayıcı boyutunu saldırı maliyeti 1 milyon ether, 4 milyon ether, 10 milyon ether vb. olacak şekilde ayarlamak). Topluluğun yaptığı [ön anketler](https://youtu.be/ojBgyFl6-v4?t=755), 1-2 milyon ether'in kabul edilebilir bir saldırı maliyeti olduğunu gösteriyor gibi görünüyor ki bu da süper komite başına yaklaşık 65.536 - 97.152 doğrulayıcı anlamına geliyor.

Ancak, darboğazın asıl noktası onaylamada değil, doğrulayıcı düğümlerini gerçekten zora sokan imza toplamada. İmza birleştirmeyi ölçeklendirmek, muhtemelen her bir alt ağdaki doğrulayıcı sayısını artırmayı, alt ağların sayısını artırmayı veya ek birleştirme katmanları eklemeyi (yani, komitelerin komitelerini uygulamak) gerektirecektir. Çözümün bir parçası özelleştirilmiş toplayıcılara izin vermek olabilir, bu da blok inşasına ve toplamalar için oluşturulan taahhüt verilerinin özelleştirilmiş blok inşacılarına önerici-inşacı ayrımıyla (PBS) ve Danksharding altında verilmesine benzer bir süreçtir.

## Çatal-seçim kuralının SSF'deki rolü ne? {#role-of-the-fork-choice-rule}

Bugünün taahhüt mekanizması kesinlik aracı (doğrulayıcıların 2/3'ünün belli bir zinciri tasdik ettiğini belirleyen algoritma) ve çatal seçim kuralı (çoklu seçenek varken hangi zincirin doğru olan olduğuna karar veren algoritma) arasındaki sıkı bir bağa dayanıyor. Çatal seçim algoritması, yalnızca son kesinleştirilmiş bloktan _sonraki_ blokları dikkate alır. SSF altında çatal seçim kuralının dikkate alacağı bir blok olmaz çünkü kesinlik olayı blokun önerildiği yuvayla aynı yerde gerçekleşir. Bu, SSF altında herhangi bir zamanda _ya_ çatal seçim algoritmasının _ya da_ kesinlik aracının aktif olacağı anlamına gelir. Kesinlik aleti blokları doğrulayıcıların 2/3ü çevrimiçiyken ve tasdikleri dürütsçe yapıyorken kesinleştirir. Eğer bir blok 2/3 eşiğini geçemiyorsa, çatal seçim kuralı hangi zincirin takip edileceğinin kararlaştırılması için devreye girer. Bu aynı zamanda, doğrulayıcıların >1/3'ünün çevrimdışı olduğu bir zinciri kurtaran eylemsizlik sızıntısı mekanizmasını, bazı ek nüansları olsa da, sürdürmek için bir fırsat yaratır.

## Çözülmemiş sorunlar {#outstanding-issues}

Ölçeklendirme toplamasıyla ilgili sorun alt küme başına düşen doğrulayıcı sayısının artması ve bunun eşler arası ağ için daha büyük bir yük oluşturması. Birleştirme katmanları eklemenin sorunu, mühendisliğinin oldukça karmaşık olması ve gecikme eklemesidir (yani, blok önericisinin tüm alt ağ toplayıcılarından haber alması daha uzun sürebilir). Ayrıca, ağda her yuvaya makul bir şekilde işlem yaptırabilecek kadar fazla aktif doğrulayıcının olduğu senaryonun nasıl halledileceği BLS imza toplamayla bile biraz belirsiz. SSF'nin altında bir komite olmadığı ve her doğrulayıcı her yuvada tasdik yaptığı için, normal dengedeki 32 ETH kapasitesi tamamen silinebilir, çoklu doğrulayıcıları yöneten operatörler, hisselerini pekiştirebilir ve yavaşlatabilir, bu da doğrulama düğümlerinin bütün doğrulama kümeleri için işlemesi gereken mesaj sayısını azaltır. Bu potansiyel bir çözümdür. Bu süreç büyük hissedarların doğrulayıcılarını pekiştirmekte anlaşmasına bağlıdır. Ayrıca, doğrulayıcı sayısı ya da herhangi bir zamanda paylanan ETH miktarı için ayarlanmış bir kapasite empoze etmek de mümkündür. Ancak, bu hangi doğrulayıcıların katılıp katılamayacağına karar veren bir mekanizmaya ihtiyaç duyar, bu da istenmeyen ikincil etkilerden sorumlu olabilir.

## Mevcut ilerleme {#current-progress}

SSF araştırma aşamasında. Büyük olasılıkla [Verkle ağaçları](/roadmap/verkle-trees/) ve [Danksharding](/roadmap/danksharding/) gibi diğer önemli yükseltmelerden sonra, birkaç yıl boyunca yayınlanması beklenmiyor.

## Daha fazla kaynak {#further-reading}

- [Vitalik'in EDCON 2022'de SSF üzerine konuşması](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Vitalik'in notları: Tek yuva kesinliğine giden yollar](https://notes.ethereum.org/@vbuterin/single_slot_finality)
