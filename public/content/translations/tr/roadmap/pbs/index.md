---
title: Teklifi yapan-oluşturucu ayrımı
description: Ethereum doğrulayıcılarının kendi blok inşa ve blok yayımlama sorumluluklarını neden ve nasıl ayırdıklarını öğrenin.
lang: tr
---

# Teklifi yapan-oluşturucu ayrımı {#proposer-builder-separation}

Bugünün Ethereum doğrulayıcıları blokları yaratır _ve_ yayımlar. Onlar, dedikodu ağı aracılığıyla duydukları işlemleri demet haline getirir ve bunları, Ethereum ağındaki eşlerine göndermek üzere bir blok halinde paketlerler. **Önerici-inşa edici ayrımı (PBS)** çoklu doğrulayıcılar arasında bu görevleri dağıtır. Blok inşacıları, her bir yuvada blok yaratmaktan ve bunları, blok önericiye sunmaktan sorumlu hale gelir. Blok önerici blokun içeriklerini göremez; yalnızca bloku eşlerine göndermeden önce blok inşacısına bir komisyon ödeyerek basit bir şekilde en kârlı olanı seçer.

Bu, çeşitli nedenden dolayı önemli bir yükseltmedir. Öncelikle, protokol düzeyinde işlem sansürünü engellemek için fırsatlar yaratır. İkinci olarak, doğrulayıcılığı hobi olarak yapan doğrulayıcıların, rekabette kârlarını daha iyi optimize edebilen kuruluşların gerisinde kalmalarını önler. Üçüncü olarak Danksharding yükseltmesini etkinleştirerek Ethereum ölçeklendirmesine yardım eder.

## PBS ve sansür direnci {#pbs-and-censorship-resistance}

Blok inşacılar ile blok önericilerin ayrılması blok inşacıların işlemi sansürlemelerini daha zor hale getirir. Blok önerilmeden önce hiç yer almayan sansürü güvence altına alacak ekleme kriterlerinin karmaşıklığından ötürüdür. Blok önerici, blok inşacısından farklı bir birim olsa da blok inşacısının sansürüne karşı koruma rolünü taşıyabilir.

Örneğin kapsama listeleri tanıtılıabilir ve böylece işlemlerin varlığını bilen fakat bunun bloklara dahil edilmediğini gören doğrulayıcılar bunları bir sonraki blokta olmazsa olmaz olarak empoze edebilirler. Dahil etme listesi, blok önerici bellek havuzundan oluşturulur (farkında olduğu işlemler listesi) ve blok önerilmeden önce eşlerine gönderilir. Dahil etme listesindeki işlemlerden bazıları eksikse önerici ya bloku reddedebilir ve önerme öncesinde eksik işlemleri ekleyebilir ya da önerebilir ve diğer doğrulayıcıların reddetmesine izin verebilir. Ayrıca, bu fikrin inşacıların blok alanını tamamen kullanması gerektiğini ve eğer tersi bir durum varsa, işlemlerin önericinin dahili listesine eklenmesini savunan potansiyel olarak daha etkili bir fikir de var. Bu hâlâ aktif araştırma sürecinde olan bir alan ve dahil etme listeleri için ideal bir kurulum henüz kararlaştırılmadı.

[Şifrelenmiş bellek havuzları](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) ayrıca inşacı ve önericiler için bir bloka, blok çoktan yayınlanmadan önce hangi işlemleri dahil ettiklerini bilmelerini imkânsız kılıyor.

<ExpandableCard title="PBS, hangi çeşit sansürü çözer?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Güçlü organizasyonlar doğrulaycılara belirli adrese gelen veya o adrese giden işlemleri sansürlemeleri için baskı yapabilirler. Doğrulayıcılar, işlem havuzlarındaki kara listeye alınmış adresleri tespit ederek ve bunları önerdikleri bloklardan çıkararak bu baskıya uyum sağlar. PBS'den sonra bu mümkün olmayacak çünkü blok önericileri bloklarının içinde hangi işlemleri yayınlayacaklarını bilmeyecekler. Belli bireyler ya da uygulamalar için kendi bölgelerinde ne zaman yasa yapıldı gibi şeyleri dikkate alarak sansür kurallarına uymaları önemli olabilir. Bu durumlarda, rıza durumu uygulama seviyesinde olur ve bu arada da protokol izinsiz ve sansürsüz kalır.

</ExpandableCard>

## PBS ve MEV {#pbs-and-mev}

**Maksimum çıkarılabilir değerden (MEV)** kasıt, doğruluyacılıarın kazançlarını ve isteğe bağlı olarak işlem emirlerini maksimize etmesidir. Buna verilebilecek yaygın örnekler takasları merkeziyetsiz borsalarda tahkim etmek (büyük bir satışı ya da alışı önceden halletmek) ya da DeFi pozisyonlarını likidite etmek için fırsatlar tanımlamaktır. MEV'yi maksimize etmek normal doğrulayıcılara ek olarak işin nasıl yapılacağını bilecek kadar sofistike teknik bilgi ve özel yazılım gerektirir, bu da ensistü operatörlerinin bu konuda bireysel ve hobi için bu işi yapan doğrulayıcılara MEV çıkarması konusunda daha iyi performans göstermesiyle sonuçlanır. Bu da hisseleme dönüşlerinin muhtemelen merkeziyetçi operatörlerin ev hisselemesinden caydıracak bir merkezi güç oluşturmasıyla daha fazla olacağı anlamına gelir.

PBS bu problemi MEV'nin ekonomi ayarlarını yeniden şekillendirerek çözer. Blok önericisinin kendi MEV araştırmasını yapması yerine, PBS basitçe blok oluşturucuları tarafından önerilen bloklar arasından bir blok seçer. Blok oluşturucuları çok yönlü ve iyi bir MEV çıkarması yapmış olabilirler, ancak bunun ödülü onlara değil blok önericisine gider. Bu küçücük bir uzmanlaşmış blok oluşturucu grubu MEV çıkarmasını domine etse bile, bunun ödülünün ağdaki herhangi bir doğruluyacıya, ana paydaşlar da dahil, gidebileceği anlamına gelir.

<ExpandableCard title="Blok inşasının merkezileştirilmesi neden İYİ?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Bireyler kendi başlarına hisselemek yerine havuzlarla birlikte hisselemeye teşvik edilir, bunun sebebi de komplike MEV stratejileri için teklif edilen abartılı ödüllerdir. Blok oluşturmayı blok önermekten ayrıştırmak, çıkarılan MEV'in en etkili MEV araştırmacısına verip olayı merkeziyetçileştirmesindense, daha fazla doğrulayıcı arasında dağıtılır. Aynı zamanda, uzmanlaşmış blok oluşturucularının varlığına izin vermek blok oluşturma işinin yükünü bireylerden kurtarır ve aynı zamanda bireylerin MEV'den para çalmasını da engeller. Birey sayısını maksimize ederken, bağımsız doğrulayıcılar blokların dürüst olup olmadığını kontrol edebilirler. Önemli olan konsept "önerici-onaylayıcı asimetrisidir". Burada bundan kasıt merkeziyetçi blok üretiminin blokların dürüst olduğunu kanıtlayabilen güçlü ve azami ölçüde merkeziyetsizleştirilmiş bir doğrulayıcı ağı olduğu sürece kabul edilebilir olduğudur. Merkeziyetsizleştirme nihai hedefimiz değil, asıl istediğimiz şey dürüst bloklar.
</ExpandableCard>

## PBS ve Danksharding {#pbs-and-danksharding}

Danksharding Ethereum'un saniyede >100.000 işleme ulaşması ve toplama kullanıcıları için masrafları en aza indirmenin yoludur. PBS'ye dayanır çünkü 64 MB kadar toplama verisini 1 saniyeden az sürede kanıtlamak için bilgi-işlem yapacak olan blok oluşturucularının iş yüküne eklenir. Bu muhtemelen bu işe sağlam donanımla katılabilecek uzmanlaşmış oluşturuculara ihtiyaç duyulacağı anlamına geliyor. Ancak, blok oluşturuculuğunun güncel durumu MEV çıkarması sebebiyle daha sofistike ve güçlü operatörler etrafında artarak merkezileşebilir. Önerici, oluşturucu ayrımı bu gerçekliği kabul etmek ve blok doğrulama sürecine merkeziyetçi bir güç eklenmesini (önemli kısım) ya da hisseleme ödüllerini engellemek için bir yoldur. Güzel bir ek fayda da uzmanlaşmış blok oluşturucularının da Danksharding için gerekli veri kanıtlarını işlemek için istekli ve kalifiye olmalarıdır.

## Güncel ilerleme {#current-progress}

PBS geliştirilmiş bir araştırma aşamasında, ancak hâlâ Ethereum istemcilerinde prototip haline getirilmeden önce cevaplanması gereken bazı önemli dizayn soruları var. Sonuçlanmış özellik henüz yok. Bunun anlamı da PBS'nin bir yıl veya daha uzun vadede gerçekleşeceğidir. En son [araştırma durumunu](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) denetleyin.

## Daha Fazla Bilgi {#further-reading}

- [Araştırma durumu: PBS altında sansür direnci](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [PBS dostu serbest piyasa tasarımları](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS ve sansür direnci](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Dahil etme listeleri](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
