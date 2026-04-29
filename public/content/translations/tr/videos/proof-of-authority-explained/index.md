---
title: "Kriptoekonomi: yetki kanıtı"
description: "Yetki kanıtı (PoA) mutabakat mekanizmasını açıklayan, nasıl çalıştığını, İş Kanıtı (PoW) ve hisse kanıtı ile karşılaştırıldığında ödünleşimlerini ve pratikte nerelerde kullanıldığını kapsayan bir kriptoekonomi dersi."
lang: tr
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "mutabakat"
  - "yetki-kaniti"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Yetki Kanıtı"
---

**Cryptoeconomics Study** tarafından hazırlanan, merkezi bir yetkilinin işlem sıralamasını nasıl belirlediği, bunun ortaya çıkardığı çifte harcama ve sansür sorunları ile çoklu imza hafifletme yaklaşımı da dahil olmak üzere yetki kanıtı mutabakat mekanizmasını açıklayan bir kriptoekonomi dersi.

*Bu döküm, Cryptoeconomics Study tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=Mj10HSEM5_8) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Yetki kanıtı nasıl çalışır (0:00) {#how-proof-of-authority-works-000}

İşlem sıralamasını belirlemek ve o can sıkıcı küçük çifte harcama sorununu çözmek için merkezi yetkiliyi yeniden göreve getirdiğimiz bölüm 2.4'e, yani yetki kanıtına hoş geldiniz.

Bir zamanlar herkesin bir nevi sevdiği merkezi bir yetkili vardı. Hepsi bu harika yetkiliyi onayladı ve şöyle dediler: "Neden sadece onu dinlemiyoruz? Bu sorunları yaşıyorduk ve doğru durum üzerinde mutabakata varamıyoruz, bu yüzden bırakalım da durumun ne olduğunu bize o söylesin."

Merkezi yetkilimiz kendi büyük düğümünü çalıştırır ve artık insanlar işlemleri imzalayıp doğrudan birbirlerine göndermek yerine merkezi yetkiliye gönderirler. Merkezi yetkili her işlemi uygular ve "Evet, onaylıyorum — bu sıfırıncı işlem" diyerek bizzat imzalar. Merkezi yetkili daha sonra bunu herkese gönderir ve herkes işlemi alıp kesin bir doğru olarak kabul eder.

#### Çifte harcama sorunu (1:05) {#the-double-spend-problem-105}

Şimdi çifte harcamayı deneyelim. Ne olacak? Mallory, merkezi yetkiliye birbiriyle çelişen iki işlem gönderecek. Merkezi yetkili ilkini alır ve bunun gördüğü ikinci işlem olduğunu imzalar, ardından diğerinin gördüğü üçüncü işlem olduğunu imzalar ve sonra bu mesajları yayar.

Ne olur? Herkes aynı mesajları alır ve hepsi merkezi yetkilinin sıralamasını izler. Bu, hepsinin aynı geçmişlere sahip olacağı anlamına gelir. Durumlara bakarsak, iyi gidiyoruz — Alice Jing'e gönderir, sonra Mallory Alice'e gönderir, ardından Mallory Jing'e göndermeye çalışır, ancak Mallory'nin yeterli parası olmadığı için bu işlem gerçekleşmez. Bakiyelerinin hepsi aynı olacaktır. Hepsi mutabakat içindedir. Merkezi yetkili — harika, başardık.

#### Yetkili ele geçirildiğinde (2:09) {#when-the-authority-is-compromised-209}

Ancak sorun şu ki, bu işlem sıralamasını sağlaması için merkezi yetkiliye güvenmek zorundayız. Peki ya merkezi yetkili kovulursa ve başından beri onun Mallory olduğu ortaya çıkarsa ne olur?

Daha önce yaşadığımız aynı sorunlara geri döneriz. İlk olarak, çifte harcamalar — Mallory, her ikisinin de aynı anda gerçekleştiğini söyleyerek birbiriyle çelişen iki işlemi de imzalar. Hangisinin önce geldiğini bilemeyiz. Mallory bunları seçici olarak yayar ve düğümlerin kafasını karıştırır, böylece mutabakatı kaybederler.

Diğer sorun ise sansürdür. Bu, yetki kanıtı zincirimizdeki yeni bir sorundur. Ya Mallory Alice'i sevmiyorsa? Alice bir işlem göndermeye çalışır ve merkezi yetkili sadece ona bakar, Alice olduğunu fark eder ve onu çöpe atar. Alice tekrar göndermeyi dener ve işlem tekrar çöpe atılır. Alice ne olduğunu bilmez — işlemleri gerçekleşmiyordur. Sansür başarılı oldu ve yine başa döndük.

#### Çoklu imza ile hafifletme (3:21) {#mitigating-with-multi-signature-321}

Çok fazla endişelenmeyin — potansiyel bir hafifletme yöntemi var. Yetkiyi politik olarak merkeziyetsizleştirebiliriz. Bu, teorik olarak Mallory'nin kontrolü ele geçirmesini zorlaştıracaktır. Yani tek bir merkezi yetkili yerine dört farklı yetkilimiz olur. Belki de hepsi farklı tarafların farklı çıkarlarını temsil eder ve işlemleri onaylamak için hepsinin bir araya gelmesi gerekir.

Buna çoklu imza (multi-sig) denir. Alice'ten Jing'e bir işlem alırlar ve ilki "Bu mesajı gördüm ve onaylıyorum" diyerek imzalar. Sonra ikincisi imzalar ve ardından üçüncüsü. Dörtte iki çoklu imzayı veya dörtte üçü kabul ettiğimizi söyleyebiliriz ya da belki tüm tarafları — dörtte dört — gerektirebiliriz. Çoklu imzanızı tasarlarken bu size kalmıştır.

Bu, işlemin gerçekleştiği ve yetkililer tarafından onaylandığı anlamına gelir.

#### Yetki kanıtının sınırlamaları (4:32) {#limitations-of-proof-of-authority-432}

Peki ya bu yetkililerin hepsi Mallory olursa ne olur? Tam olarak aynı sorunları yaşarız — çifte harcamalar ve sansür. Yani mükemmel değildir. Ancak, en azından kullanıcılar tüm işlemleri kendileri yürüttüğü için bazı açılardan merkezi bir ödeme işlemcisinden daha iyidir. Sonunda bir çifte harcamayı tespit edebilirler, ancak sorunlarımız hala devam etmektedir. Teknik olarak hala çifte harcama yapabiliriz ve teknik olarak hala sansür uygulayabiliriz.

Açık erişim yoktur — bu yetkililerden biri olmak zor olabilir. Ayrıca çifte harcama veya sansür gerçekleştiğinde protokol içi cezalar yoktur. Protokolde bu yetkili figürleri cezalandıracak hiçbir şey yoktur.

#### Sırada ne var (5:19) {#what-comes-next-519}

Böylece bilge Alice'imiz başka bir yol olduğuna karar verir — yetkiliden kurtulmak. Ona kimin ihtiyacı var ki? Bunun yerine, herkesin bir madenci olmasına ve mutabakat protokolüne katılmasına izin veririz. Bu, katılmak için açık erişim sağlar, iyi davranışlar için — işe yarar bir şekilde mutabakat oluşturmak — ekonomik ödüller sunar ve kötü davranışları tespit edip insanların coin'lerinde yakım uyguladığımız durumlarda ekonomik cezalar sağlar.

Ancak bu, bölüm 3 için mekanizma tasarımı olan İş Kanıtı (PoW) konusunda bir sonraki adımda geliyor.