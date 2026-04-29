---
title: "Hisse kanıtı Ethereum'da yeniden düzenleme oyunu"
description: "Caspar Schwarz-Schilling, hisse kanıtı Ethereum'daki blok yeniden düzenleme saldırıları üzerine araştırmasını sunarak saldırı vektörlerini, savunma mekanizmalarını ve mevcut protokol düzeyindeki hafifletmeleri ele alıyor."
lang: tr
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "fikir birliği"
  - "pos"
  - "güvenlik"
format: presentation
author: LisCon
breadcrumb: "PoS Yeniden Düzenlemeleri"
---

Bu sunum, Hisse Kanıtı (PoS) Ethereum'da mümkün olan blok yeniden düzenleme türlerini ve bunları önlemek için tasarlanmış hafifletmeleri incelemektedir. Ethereum Vakfı'nın Sağlam Teşvikler Grubu'nda (Robust Incentives Group) araştırmacı olan Caspar Schwarz-Schilling, İş Kanıtı (PoW) ile Hisse Kanıtı (PoS) arasındaki güvenlik ortamını karşılaştırarak ex-post ve ex-ante yeniden düzenlemelerin mekaniklerini adım adım açıklıyor.

*Bu transkript, LisCon tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=xcPxwhrg3Ao) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için ufak düzenlemeler yapılmıştır.*

#### Giriş ve arka plan (0:03) {#introduction-and-background-003}

Hoş geldiniz. Bugün Hisse Kanıtı (PoS) Ethereum'da mümkün olan yeniden düzenlemeler hakkında konuşacağım.

Yakın zamanda Ethereum Vakfı'na, özellikle de Sağlam Teşvikler Grubu'na katıldım. Temel olarak teşviklerle ilgili her şeye odaklanan bir araştırma ekibiyiz. Bunu kısa tutacağım — bu konuşma oldukça dolu ve çalışmalarımızın çoğunu GitHub'da bulabilirsiniz.

#### İki tür yeniden düzenleme (0:44) {#two-types-of-reorgs-044}

Bugün yeniden düzenlemeler hakkında konuşmak istiyorum ve özellikle Hisse Kanıtı (PoS) Ethereum alanında mümkün olan iki farklı yeniden düzenleme türünü ana hatlarıyla belirtmek istiyorum.

Bir yanda **ex-post yeniden düzenlemeler**, diğer yanda ise **ex-ante yeniden düzenlemeler** var. Biraz iddialı Latince isimlendirme için beni affedin, ancak işe yarıyor.

Ex-post yeniden düzenlemeler, yeniden düzenlemeler hakkında konuştuğumuzda genellikle aklımıza gelen şeydir. Düşman bir blok görür — eğer değerliyse onu yeniden düzenlemeye çalışmak isteyebilir. Buradaki diyagramda, N+1 bloğunun saldırganın yeniden düzenleyerek çıkarmak istediği blok olduğunu görüyoruz ve aynı ebeveyn blok N üzerine inşa ederek, eğer işe yararsa, N+3 bloğu daha sonra N+2 bloğu üzerine inşa edilir. Bu her zamanki işleyiştir.

Ex-ante yeniden düzenlemeler ise biraz farklıdır. Buradaki fikir, saldırganın hangi bloğu yeniden düzenleyerek çıkaracağını bile bilmeden saldırıya başlaması gerektiğidir. Bu kabaca nasıl çalışır? Çok üst düzeyde, N+1 bloğu N'nin üzerine inşa edilir ancak hemen yayınlanmaz. Dürüst düğümler N+1'in var olduğunu bile bilmezler ve bu yüzden N üzerine inşa etmeye devam ederler. Daha sonra bir mekanizma aracılığıyla N+1 yayınlanır ve N+3, N+1'in önde olduğunu görebilir ve onun üzerine inşa edebilir, böylece N+2 aslında yeniden düzenlenerek çıkarılmış olur.

Neden böyle bir yeniden düzenleme yapmak isteyesiniz diye merak edebilirsiniz. Şey, hala yakalanacak MEV var. Şanslıysanız, N+2 bloğunda çok fazla MEV vardır — o blok her neyse sadece kopyalayıp yapıştırarak bunu yakalayabilirsiniz. En kötü durumda, dinlemeniz gereken temel olarak iki slot değerinde işlem vardır.

#### İş kanıtında ex-post yeniden düzenlemeler (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Bu konuşmanın ana konusu olan ex-ante yeniden düzenlemelere dalmadan önce, ex-post yeniden düzenlemeleri kısaca özetleyeyim ve özellikle İş Kanıtı (PoW) bağlamıyla başlayayım.

Temel olarak bu, olağan şüpheliler Georgios ve Vitalik'in blog yazısının bir özetidir. Gidip okuyun, gerçekten harika.

Kısacası, İş Kanıtı (PoW) Ethereum'da ex-post yeniden düzenlemeler zordur ancak imkansız değildir. %10'luk bir madenci arka arkaya birkaç blok madenciliği yapmak için nispeten iyi bir şansa sahiptir ve eğer teşvik yeterince yüksekse — yakalanacak 100 ETH değerinde MEV'e sahip bir blok olduğunu düşünün — o zaman belki de yüzde birlik bir başarı oranı, yeniden düzenlemeye çalışmayı değerli kılmak için aslında yeterli olabilir.

#### Hisse kanıtında ex-post yeniden düzenlemeler (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

Hisse Kanıtı (PoS) sisteminde bu tamamen farklı bir durumdur. Gereken stake miktarının absürtlüğünden bahsediyoruz. Bunun ne kadar gülünç derecede zor olduğunu vurgulamak için birinin bunu nasıl yapabileceğini adım adım anlatacağım.

Belki önce bazı temel bilgiler. Hisse Kanıtı (PoS) Ethereum'da zaman slotlar halinde ilerler. Her slot 12 saniye uzunluğundadır. Her slotta iki rol vardır: bir teklif edici — tam olarak bir teklif edici — ve P2P katmanında duydukları bloklara onay vermesi beklenen binlerce onaylayıcıdan oluşan bir komite bulunur. Blok ağacını girdi olarak alan ve size zincirin başını veren bir işlev olan çatallanma seçimini çalıştırarak zincirin başını belirlerler.

Geçerli bir blok duyarsanız veya bir slotun dördüncü saniyesinde — hangisi önce gelirse — bloklara onay vermeniz beklenir. Yani herhangi bir nedenle N+1 bloğunun teklif edicisi çevrimdışıysa ve slotun dördüncü saniyesinde hiçbir blok yoksa, N bloğuna onay verirsiniz. Zamanında duyarsanız, N+1 bloğuna onay verirsiniz. Basit.

Tüm bu onaylar bloklara ağırlık verir ve bu ağırlık, en son başın ne olduğunu belirlemek için çatallanma seçimi tarafından kullanılır.

Şimdi tek blokluk bir yeniden düzenlemeyi adım adım inceleyelim. Başlangıçta her şey her zamanki gibidir — saldırgan bile herkes N bloğuna onay verir. Sonra N+1, N'nin üzerine inşa edilir ve saldırgan yeniden düzenleyerek çıkarmaya çalıştığı bloğa ağırlık vermek istemediği için bunun yerine N bloğuna onay verir. N bloğu çok fazla ağırlık kazanıyor çünkü saldırgan komitenin üçte ikisine sahip — bu da kabaca tüm stake'in üçte ikisini kontrol etmeleri gerektiği anlamına geliyor.

Dürüst insanların üçte biri N+1'e, üçte ikisi N'ye onay verdi. Şimdi N+2 bloğu geliyor — açıkçası saldırgan onu N üzerine inşa ediyor ve kendi bloğuna onay veriyor. Dürüst doğrulayıcıların bakış açısından, N+1 ağırlık açısından hala önde çünkü hem N+1 hem de N+2, N bloğunun tüm ağırlığını devralıyor, ancak N+1 aynı zamanda N+2'nin eksik olduğu bu üçte birlik onaylara da sahip.

Bunu toplarsak — N+1 bloğu üçte bir artı üçte bir değerinde onaylara sahiptir, bu da üçte iki eder ve N+2 bloğu da üçte ikiye sahiptir. Basitlik adına eşitliğin bozulmasının saldırganın lehine olduğunu varsayalım. O zaman N+3, N+2'yi önde görecek ve onun üzerine inşa edecektir.

Bu varsayımların ne kadar gülünç olduğu hakkında size bir fikir vermek gerekirse — %65'lik bir stake eden olsanız bile, herhangi bir slotta komitenin üçte ikisini kontrol etme olasılığınız %0,05'tir. Bu, paralel onayların gücünün gerçek olduğunu gösteriyor — ex-post yeniden düzenlemeler, Hisse Kanıtı (PoS) Ethereum'da neredeyse imkansız olmasa da inanılmaz derecede zordur.

#### Ex-ante yeniden düzenleme saldırı mekanikleri (7:34) {#ex-ante-reorg-attack-mechanics-734}

Şimdi ex-ante yeniden düzenlemeler hakkında konuşacağım. Bu saldırı Neuder ve diğerlerinin bir makalesine dayanmaktadır. Yakın zamanda bu saldırıyı önemli ölçüde geliştirdik. Ayrıca bunun üzerine bir makale yazdık ve tam zamanında arXiv'e yüklemeyi başardık.

Ayrıca peşinen söyleyeyim — endişelenmeyin, hafifletmeler var. Bunlar Birleşme'den önce birleştirilecek.

Bir ex-ante yeniden düzenleme saldırısı nasıl çalışır? Başlangıçta, N bloğu — her zamanki gibi, herkes ona onay verir. Şimdi siz N+1'in teklif edicisisiniz. Onu teklif edersiniz ve tek bir doğrulayıcı ile özel olarak onay verirsiniz. Önemli olan, bunu gizli tutmanızdır — yayınlamazsınız ve P2P katmanında yaymazsınız.

Olan şudur ki dürüst insanlar N+1 bloğunu görmezler, bu yüzden N bloğuna onay verirler. İşin püf noktası budur — bu ağırlığı devralırsınız ve aslında onunla savaşmak zorunda kalmazsınız.

Şimdilik sıfır gecikme olduğunu varsayalım. N+2 slotunda, saldırgan olarak yaptığımız şey N+1 bloğunu ve özel onayı aynı anda yayınlamaktır. N+2 slotundaki dürüst doğrulayıcıların bir bloğa onay vermesi gerekir. Kendi açılarından N+2 bloğunu ve bu tek özel onaya sahip N+1 bloğunu görürler. Çatallanma seçimini çalıştırırlarsa, N+1 bloğunun N+2 bloğundan daha fazla ağırlığa sahip olduğunu göreceklerdir, çünkü N+1, N+2'nin sahip olmadığı özel onaya sahiptir. Tüm dürüst doğrulayıcılar bile aslında N+1 bloğuna onay verecektir. N+3'te, basitçe, N+1 zincirin başı olarak görülecektir.

#### Ağ gecikmesi ve saldırı (10:25) {#network-latency-and-the-attack-1025}

Sıfır gecikme varsaydım, ki açıkçası işler böyle yürümez. Gecikme vardır — blokları ve mesajları P2P katmanında yaymak zaman alır.

Bir saldırganın bu tür bir saldırıyı hala gerçekleştirebilmesinin yolu, P2P topolojisinde farklı konumlarda çok sayıda düğüme sahip olmasıdır. N+2 slotundaki dürüst teklif edici bu bloğu teklif ettiğinde, yayılma sürecinin çok başlarında bunu duyarsınız. Sonuç olarak, özel bloğunuzu tüm bu farklı konumlardan yayınlayabilirsiniz, böylece çoğunluk N+2 bloğunu duymadan önce N+1 bloğunu duyar — yani N+1 bloğunun ağırlıkta önde olduğunu görürler ve aslında ona onay verirler.

Burada olanları yeniden vurgulamak gerekirse: tek bir onaylayıcıya sahip bir teklif edicinin tek blokluk bir yeniden düzenlemeyi başarması söz konusu. En hafif tabirle ideal değil.

#### Daha uzun yeniden düzenlemeler için dengeleme stratejileri (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Eğer işi daha da ileri götürmek isterseniz, bir dengeleme stratejisi kullanarak daha uzun yeniden düzenlemeler gerçekleştirebilirsiniz. Buradaki fikir, dürüst komiteyi zincirin farklı görünümlerine bölmektir.

Özel bloğunuzu öyle bir şekilde yayınlarsınız ki, dürüst düğümlerin kabaca yarısı özel bloğunuzu ve onayınızı N+2 bloğunu duymadan önce duyar — böylece sizin bloğunuza onay verirler. Diğer yarısının ise N+2'ye onay vermeden önce sizin bloğunuzu duymamasını istersiniz.

Artık dürüst komitenin yarısı N+1'e, diğer yarısı ise N+2'ye onay veriyor. Bu nasıl yardımcı olur? Dürüst komite artık birbirini iptal eder ve saldırgan olarak onlarla savaşmak zorunda bile kalmazsınız — ki bu temel olarak saldırganın hayalinin gerçeğe dönüşmesidir.

Diyagram üzerinden gidersek: N bloğu her zamanki gibi, N+1 bloğu — aynı hikaye, onu yayınlamıyorsunuz. Dürüst doğrulayıcılar N bloğuna onay verir. N+2 bloğu gelir, bunu erkenden duyarsınız ve N+1 bloğunu tek bir onayla — "belirleyici oy" — dürüst komitenin yarısının önce, yarısının sonra göreceği şekilde yayınlarsınız. Yarısı N+1 için, diğer yarısı N+2 için oy kullanır. Aslında N+2'nin bir onay daha fazla alacağı şekilde bir farkla bölünme istersiniz, böylece N+3, N+2 üzerine inşa edilir ve yeniden düzenleme devam eder.

İki blokluk bir yeniden düzenlemeyi sona erdirmek için: N+3 bloğu teklif edilir, bunu erkenden duyarsınız, N+1 bloğunu ve kalan iki onayınızı yayınlarsınız, P2P katmanını doldurursunuz, böylece dürüst insanların çoğunluğu N+1 bloğu için oy kullanır — öyle ki N+3 bloğundan daha fazla ağırlığa sahip olur ve N+4, N+1'in üzerine inşa edilir.

Düşündüğünüzde, bu varsayımlar altında bu yeniden düzenlemeleri yapmak nispeten ucuzdur. Mükemmel bölünmelere sahip olmasanız bile, P2P katmanı çok büyük olduğu için, saldırı maliyetinin komite boyutunun karekökü oranında artacağı şekilde hedefleyebileceğiniz bir olasılık dağılımına sahipsiniz.

#### Teklifçi desteği hafifletmesi (15:17) {#proposer-boost-mitigation-1517}

Hafifletme hakkında konuşalım. Temel fikir nedir? Teklif ediciye biraz daha fazla güç vereceğiz. Geçerli bir blok zamanında gelirse, bu bloğun ağırlığını slot süresince artıralım. O slot bittikten sonra, olağan LMD-GHOST puanına devam ederiz ve her şey normale döner.

Yani N+2 bloğu zamanında teklif edilirse ve geçerliyse, bu blok bir desteğe sahip olacaktır — diyelim ki komite boyutunun %80'i kadar. Artık saldırganın bu sevimli küçük N+1 onayı işe yaramayacak. İmkânı yok.

Dengeleme işleri de artık işe yaramıyor çünkü 50/50'lik bir bölünmeniz var ancak destek bunu her zaman bir yöne atıyor. Bu 50/50 bölünmeyi korumanızın hiçbir yolu yok.

Buradaki fikir, bu hafifletme yürürlükteyken, düşmanın onaylarının dürüst doğrulayıcıları kendi isteklerine göre oy kullanmaya ikna etmek için destekle rekabet etmek zorunda kalmasıdır. Bu, dengeleme stratejilerini bozar ve temel olarak tüm yeniden düzenlemeleri tamamen yasaklar. İyi haber — açık bir PR var, yani temel olarak Birleşme'den önce birleştirilecek.

#### Önemli çıkarımlar (16:48) {#key-takeaways-1648}

Bazı önemli çıkarımlar. Ex-post ve ex-ante yeniden düzenlemeler arasındaki farklardan bahsettim. İş Kanıtı (PoW) ile Hisse Kanıtı (PoS) sistemlerindeki yeniden düzenlemeler için farklı ortamları kısaca ana hatlarıyla belirttim. Size bir ex-ante yeniden düzenlemeyi nasıl gerçekleştireceğinizi ama aynı zamanda önemli ölçüde bunu nasıl düzelteceğinizi gösterdim.

Eğer bununla ilgileniyorsanız, bir makale var — çok daha ayrıntılı, daha nüanslı. Slaytlar yüklenecek. İlgileniyorsanız gelip benimle konuşun, ayrıca beni Twitter'da da bulabilirsiniz.

Umarım bu sizin için ilginç olmuştur. Çok teşekkürler.