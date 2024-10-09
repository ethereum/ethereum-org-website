---
title: Tek yuva kesinliği
description: Tek yuva kesinliğinin açıklaması
lang: tr
---

# Tek yuva kesinliği {#single-slot-finality}

Bir Ethereum blokunun tamamlanması yaklaşık 15 dakika sürer. Bununla beraber, Ethereum'un mutabakat mekanizmasının blokları daha etkili bir biçimde doğrulanmasını sağlayarak tamamlanma süresini önemli ölçüde azaltabiliriz. On beş dakika beklemek yerine, bloklar aynı yuvanın içinde önerilip tamamlanabilir. Bu konsept **tek yuva kesinliği (SSF)** olarak bilinir.

## Kesinlik nedir? {#what-is-finality}

Ethereum'un hisse ispatına dayalı taahhüt mekanizması, toplam hisselenmiş Ethereum'un %33'ünü yakmadan blok zincirden kesinlikle bir blokun değiştirilememesi ve silinememesini garanti etmekten bahseder. Bu "kripto-ekonomik"tir çünkü bu olaya güven zincirin sırasının veya içeriğinin değiştirmesi aşırı masraflıdır ve hiçbir rasyonel ekonomik aktör bunu denemez.

## Neden daha hızlı bir kesinlik hedefliyoruz? {#why-aim-for-quicker-finality}

Kesinlik için gereken güncel zamanın çok uzun olduğu ortaya çıktı. Birçok kullanıcı kesinlik için 15 dakika beklemek istemiyor ve büyük işlemleri beklemeden ve işlemlerinin kalıcı olduğunun kesin olduğuna emin olmadan yapmak da borsa ve uygulamalar için uygunsuz bir durum. Bu blok teklifi ve kesinlik arasında yaşanan gecikme aynı zamanda saldırganların belli blokları sansürlemesi ya da MEVi çıkarmasının önünü açıyor. Güncel aşamadaki blokları yükseltmekten sorumlu olan mekanizma da oldukça karmaşık ve güvenlik konusundaki kırılganlıkları kapatabilmek için birkaç kez güncellendi, bu da Ethereum Kod bazındaki anında göze çarpmayan bazı "hata"ların oluşmasının muhtemel olduğu anlamına geliyor. Bu sorunların tamamı tek bir blokun kesinliğinin süresini azaltarak çözülebilir.

## Merkezisyetsizleştime/süre genel gider takası {#the-decentralization-time-overhead-tradeoff}

Kesinlik garantisi yeni bir bloka anında gelebilen bir özelllik değil, yeni bir blokun kesinlik evresine gelmesi zaman alıyor. Bunun sebebi doğrulayıcıların ağdaki toplam pay edilmiş ETH'nin 2/3'ünü temsil etmesi ve blokun sonuçlanmış sayılabilmesi için oy kullanmak zorunda olmaları ("kanıtlama"). Ağdaki her doğrulayıcı düğümünün 2/3 eşiğini geçip geçmediğinin bilinebilmesi için diğer düğümler tarafından kanıtlama sürecinden geçmesi gerekiyor.

Kesinliğe kadar verilen süre ne kadar kısaltılabilirse, her düğümde daha fazla bilgi işlem gücü gerekir çünkü kanıtlama sürecinin daha hızlı yapılması gerekir. Ayrıca, ağda ne kadar fazla düğüm varsa, o kadar da fazla blok için kanıtlama süreci olacaktır, bu da işem gücü gerekliliğinde artışla sonuçlanır. Daha fazla işlem gücü gerekirse, daha az insan katılabilir çünkü her doğrulayıcı düğüm için daha pahalı donanım gerekir. Bloklar arası zamanı artırmak her düğüm için gereken bilgi işlem gücünü azaltır, ancak aynı zamanda da kesinliğe ulaşma süresini artırır çünkü kanıtlama süreci daha yavaş geçer.

Bu yüzden, Bilgi işlem gücü (overhead) merkeziyetsizleştirme (zinciri doğrulamaya katılan düğüm sayısı) ve kesinlik süresi arasında bir takas, orantı vardır. İdeal bir sistem minimum bilgi işlem gücünü, maksimum merkeziyetsizleştirmeyi ve minimum kesinlik süresini dengeler.

Ethereum'un güncel taahhüt mekanızması bu 3 parametreyi şu şekilde dengeledi:

- **Minimum hisseyi 32 ETH olarak kararlaştırdı**. Bu her bireysel düğüm tarafından işlenecek doğrulayıcı kanıtlamalarına bir üst limit koyar ve bu yüzden artık her düğüm için bilgi işlem gereklilikleri için de bir üst limit olur.
- **Kesinlik süresini ~15 dakika olarak belirlemek**. Bu doğrulayıcılara, normal ev bilgisayarlarıyla her blok için kanıtlama işlemlerini halletmek için yeterli süreyi verir.

Şu anki mekanizma tasarımıyla, kesinlik süresini azaltmak için, ağdaki doğrulayıcı sayısını azaltmak ya da her düğüm için gerekli donanım seviyesini arttırmak şarttır. Ancak, kanıtlamaların yapılma şekline veri yüküne ekleme olmadan bir kerede sayılacak daha fazla kanıtlamaya izin vermek gibi geliştirmeler de var. Daha verimli bu süreç kesinliğin iki dönem arasında değil, tek bir yuvada belirlenmesini sağlayacak.

## SSF'ye gden yollar {#routes-to-ssf}

<ExpandableCard title= "Neden bugün SSF'ye sahip olamayız?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Güncel taahhüt mekanizması her doğrulayıcının bir bloku doğrulamak için işlemden geçirmesi gereken mesajların sayısını azaltmak için çoklu doğralıyıcıların tasdiklerini birleştiriyor. Her doğrulayıcının her dönem (32 yuva) için tasdik imkânı var, ancak her yuvada, sadece bir doğrulayıcı alt kümesi, komite olarak da bilinir, tasdik yapıyorlar. Bunu, birkaç doğrulayıcıyı toplayıcı olarak seçip alt ağlara bölünerek yapıyorlar. Bu toplayıcıların hepsi kendi alt ağlarının içinde diğer doğrulayıcılardan gördükleri imzaları tek bir toplanmış imza şeklinde birleştiriyorlar. En çok bireysel katkıyı toplayan toplayıcı toplanmış imzasını blok önericine gönderir, o da bu imzayı blokun diğer komitelerden de aldığı toplanmış imzaların yanına katar.

Bu süreç her doğrulayıcının her dönem içerisinde oy kullanabilmesi için yeterli kapasiteyi sağlar çünkü "32 yuva*64 komite*komite başına 256 doğrulayıcı=Dönem başına 524.288 doğrulayıcı" yapar. Yazma sürecinde (Şubat 2023), 513.000 akfit doğrulayıcı vardı.

Bu şemada, her doğrulayıcının oy kullanabilmesi sadece kendi tasdiklerini dönem içine yaymasıyla mümkündür. Ancak, mekanizmayı her doğrulayıcının her yuvada tastik edebilmesi için geliştirmenin potansiyel bazı yolları var.
</ExpandableCard>

Ethereum Taahhüt mekanizması tasarlandığından beri, imza toplama şemasının (BLS) başta düşünüldüğüne göre çok daha ölçeklenebilir olduğu ortaya çıktı, tabi bu süreçte istemcilerin işlem ve onay imzaları da gelişti. Tasdik işleminin büyük sayıda doğrulayıcı tarafından tek yuva içinde yapılmasının da aslında mümkün olduğu ortaya çıktı. Örnek olarak, 1 milyon doğrulayıcının her yuvada 2 kere oy kullandığını ve yuvanın süresinin 16 saniye olarak kararlaştıldığı varsayılırsa, 1 yuvada 1 milyon tastiğin yapılabilmesi için her düğümün saniyede 125.000 toplanmayı onaylaması gerekir. Gerçekte normal bir bilgisayar, bir imza onayı gerçekleştirebilmek için 500 nanosaniyeye ihtiyaç duyar, bu da 125.000 imza onayının ~62,5 ms'de, yani 1 saniye eşiğinden çok daha kısa sürede yapılabileceği anlamına gelir.

Daha verimli katkılar yuva başına 125.000 rastgele seçilmiş doğrulayıcıdan oluşan süper komiteler oluşturarak yapılabilir. Sadece bu doğrulayıcılar bir blokta oy kullanma hakkına sahiptir ve bu yüzden sadece bu doğrulayıcı alt kümesi blokun kesinleştiğine karar verebilir. Bu fikrin iyi olup olmadığı da, topluluğun Ethereum'a yapılacak bir saldırının ne kadar maliyetli olmasını tercih ettiğine bağlıdır. Bunun sebebi 2/3 hisselenmiş ether'e ihtiyaç duymak yerine, _süper komitedeki bir_ saldırgan 2/3 hisselenmiş ether'le birlikte bir tane sahte blok kesinleştirebilir. Bu hâlâ aktif olarak araştırılan bir alan, ancak yeteri kadar büyük bir doğrulayıcı kümesinin süper komiteler gerektirmesi daha mantıklı görünüyor çünkü bu süper komitelere saldırmanın masrafı aşırı fazla olacak.(Ör. ETH cinsinden saldırının masrafı `2/3 * 125.000 * 32 = ~2.6 milyon ETH` olurdu). Saldırının masrafı doğrulayıcı kümesinin boyutunu artırarak ayarlanabilir (ör. doğrulayıcı büyüklüğünü saldırının tam 1 milyon, 4 milyon ya da 10 milyon olarak hesaplayacak şekilde ayarlamak vb.). [Topluluğa yapılan ön anketler](https://youtu.be/ojBgyFl6-v4?t=755) yapılacak bir saldırı için 1-2 milyonluk hesaplanan bir değerin kabul edilebilir olduğu yönünde, bu da süper komite başına ~65.536 - 97.152 doğrulayıcı demek.

Ancak, darboğazın asıl noktası onaylamada değil, doğrulayıcı düğümlerini gerçekten zora sokan imza toplamada. İmza toplamalarını ölçeklendirebilmek muhtemelen her alt kümedeki doğrulayıcı sayısını artırmayı gerektirecek, bu da alt küme sayısını artıtır ya da ek toplama katmanları ekletir (yani komitelerin komiteleri gibi). Çözümün bir parçası özelleştirilmiş toplayıcılara izin vermek olabilir, bu da blok inşasına ve toplamalar için oluşturulan taahhüt verilerinin özelleştirilmiş blok inşacılarına önerici-inşacı ayrımıyla (PBS) ve Danksharding altında verilmesine benzer bir süreçtir.

## Çatal-seçim kuralının SSF'deki rolü ne? {#role-of-the-fork-choice-rule}

Bugünün taahhüt mekanizması kesinlik aracı (doğrulayıcıların 2/3'ünün belli bir zinciri tasdik ettiğini belirleyen algoritma) ve çatal seçim kuralı (çoklu seçenek varken hangi zincirin doğru olan olduğuna karar veren algoritma) arasındaki sıkı bir bağa dayanıyor. Çatals eçim algoritması sadece son kesinleştirilmiş bloktan _itibaren_ olan blokları dikkate alır. SSF altında çatal seçim kuralının dikkate alacağı bir blok olmaz çünkü kesinlik olayı blokun önerildiği yuvayla aynı yerde gerçekleşir. Bu SSF altında _ya_ çatal seçim algoritmasının _ya da_ kesinlik aletinin herhangi bir zamanda aktif olabileceği anlamına gelir. Kesinlik aleti blokları doğrulayıcıların 2/3ü çevrimiçiyken ve tasdikleri dürütsçe yapıyorken kesinleştirir. Eğer bir blok 2/3 eşiğini geçemiyorsa, çatal seçim kuralı hangi zincirin takip edileceğinin kararlaştırılması için devreye girer. Bu ayrıca doğrulayıcıların >1/3'ü çevrimdışıyken devreye giren inaktiflik sızıntısı mekanizmasının yönetilmesi için bir olanak sağlar, tabi bazı nüanslarla birlikte.

## Bekleyen sorunlar {#outstanding-issues}

Ölçeklendirme toplamasıyla ilgili sorun alt küme başına düşen doğrulayıcı sayısının artması ve bunun eşler arası ağ için daha büyük bir yük oluşturması. Toplama katmanları eklemekle ilgili olan sorun ise mühendisliğinin çok karmaşık olması ve gecikmeler eklemesi (yani blok önericisinin bütün toplayıcı alt kümelerinden haber alması daha uzun sürebilir). Ayrıca, ağda her yuvaya makul bir şekilde işlem yaptırabilecek kadar fazla aktif doğrulayıcının olduğu senaryonun nasıl halledileceği BLS imza toplamayla bile biraz belirsiz. SSF'nin altında bir komite olmadığı ve her doğrulayıcı her yuvada tasdik yaptığı için, normal dengedeki 32 ETH kapasitesi tamamen silinebilir, çoklu doğrulayıcıları yöneten operatörler, hisselerini pekiştirebilir ve yavaşlatabilir, bu da doğrulama düğümlerinin bütün doğrulama kümeleri için işlemesi gereken mesaj sayısını azaltır. Bu potansiyel bir çözümdür. Bu süreç büyük hissedarların doğrulayıcılarını pekiştirmekte anlaşmasına bağlıdır. Ayrıca, doğrulayıcı sayısı ya da herhangi bir zamanda paylanan ETH miktarı için ayarlanmış bir kapasite empoze etmek de mümkündür. Ancak, bu hangi doğrulayıcıların katılıp katılamayacağına karar veren bir mekanizmaya ihtiyaç duyar, bu da istenmeyen ikincil etkilerden sorumlu olabilir.

## Güncel ilerleme {#current-progress}

SSF araştırma aşamasında. [Verkle ağaçları](/roadmap/verkle-trees/) ve [Danksharding](/roadmap/danksharding/) gibi diğer önemli yükseltmelerin ardından muhtemelen birkaç yıl daha gelmesi beklenmiyor.

## Daha fazla bilgi {#further-reading}

- [Vitalik'in SSF hakkındaki görüşleri, EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Vitalik'in notları: Tek yuva kesinliğine giden yollar](https://notes.ethereum.org/@vbuterin/single_slot_finality)
