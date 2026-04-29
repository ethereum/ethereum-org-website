---
title: "Ethereum Pectra güncellemesi: stake edenlerin bilmesi gerekenler"
description: "Pectra güncellemesini stake edenlerin perspektifinden açıklayarak doğrulayıcılar, staking operasyonları ve Ethereum protokolünde staking'i etkileyen temel EIP'ler üzerindeki pratik etkilerini kapsar."
lang: tr
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "yol haritası"
  - "pectra"
  - "staking"
format: explainer
author: Blockdaemon
breadcrumb: "Stake Edenler için Pectra"
---

**Blockdaemon** tarafından sunulan ve Blokzincir mühendisi Julia Schmidt (Alluvial) ile Freddy Tänzer'in (Blockdaemon) Pectra güncellemesinin ETH staking'ini nasıl etkilediğini tartıştığı bir web semineri. Web semineri, yürütme katmanı tarafından tetiklenebilen çekim işlemlerini, maksimum etkin bakiye artışlarını, doğrulayıcı konsolidasyonunu ve likit staking etkilerini kapsıyor.

*Bu döküm, Blockdaemon tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=_UpAFpC7X6Y) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Giriş (0:00) {#introduction-000}

**Sunucu:** Merhaba ve Blockdaemon'ın sunduğu, Ethereum'un yaklaşan Pectra güncellemesine odaklanan bu web seminerine hoş geldiniz. Bugün bizimle Alluvial'da Blokzincir mühendisi olan Julia Schmidt ve Blockdaemon Ethereum ekosistem lideri Freddy Tänzer var; Pectra'nın getireceği değişikliklerin ETH staking'ini, ağın bütününü, likit staking hizmetlerini ve daha fazlasını nasıl etkileyeceğini tartışacağız. Başlamak gerekirse, Freddy — bize Pectra güncellemesi ve bunun stake edenler üzerindeki etkisi hakkında kısa bir genel bakış sunabilir misin?

#### Pectra nedir (1:28) {#what-is-pectra-128}

**Freddy Tänzer:** Pectra, 2025'in ilk çeyreğinin sonlarına — yaklaşık Mart ayına, belki biraz daha ileriye, Nisan civarına — planlanan bir Ethereum güncellemesidir. Aslında başlangıçta küçük bir çatallanma olması gerekiyordu, ancak sonrasında giderek daha fazla şey eklendi, bu yüzden şimdi onu ikiye böldüler.

İlk bölüm birçok şeyi içeriyor — örneğin akıllı hesaplar, hesap soyutlama ve benzeri konularla ilgili — ancak ben gerçekten izleyicilerimizi ilgilendiren staking değişikliklerine odaklanmak istiyorum. Temel olarak iki büyük değişiklik var.

Birincisi, yürütme katmanı — çekim kimlik bilgileri — aracılığıyla doğrulayıcınızdan çekim işlemlerini ve çıkışları tetikleyebilmenizdir; bu da temel olarak düğüm operatörüne olan bağımlılığı ortadan kaldırır. İkincisi ve etkisi tartışmasız daha da büyük olanı, bir doğrulayıcının maksimum etkin bakiyesinin artık değişebilmesidir. Eskiden sabit bir miktar olarak yalnızca 32 ETH idi, şimdi ise 32 ile 2.048 ETH arasında herhangi bir değer olabiliyor.

Ayrıca, yatırma işlemlerinin çok daha hızlı olmasını sağlayan daha küçük bir değişiklik de var — zincir içi kayıt süresi yaklaşık 14 saatten bir saatin altına iniyor — ancak bence buradaki tartışmamız için en çok ilgili olanlar bu iki büyük değişiklik.

#### EIP-7002: yürütme katmanı tarafından tetiklenebilen çıkışlar (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Sunucu:** İlk büyük değişiklik için Julia, Pectra sonrası sürecin, Ethereum'un staking ekosisteminde çekim işlemlerinin şu anki başlatılma yöntemlerine kıyasla nasıl değişeceğini açıklayabilir misin?

**Julia Schmidt:** Blok önermek ve onaylamak için doğrulayıcının sürekli çevrim içi olması ve 32 ETH'lik stake edilmiş bir bakiyeye sahip olması gerekir. Mutabakat mekanizmasına katılmak üzere bir doğrulayıcı kurduğunuzda, iki anahtar ayarlarsınız. Birincisi, doğrulayıcı görevlerini yerine getirmek — blok onaylarını imzalama — için kullanılan doğrulayıcı anahtarıdır. İkincisi ise stake edilen ETH'nin sahipliğini temsil eden çekim anahtarıdır.

İki staking yönteminiz var: bireysel staking veya Blockdaemon ile ve Liquid Collective'de yaptığımız gibi, tüm doğrulayıcı görevlerini ve doğrulayıcı operasyonlarını sizin adınıza yapması için düğüm operatörünüzü seçebileceğiniz çoklu saklama (multi-custodial) kurulumları. Bu onlara doğrulayıcı anahtarını verir ve siz yalnızca çekim anahtarına erişebilirsiniz.

Bir doğrulayıcıdan çıkış yapmak için gereken asıl mesaj, yalnızca düğüm operatörü tarafından kontrol edilen doğrulayıcı anahtarından gönderilebilir. Bu, düğüm operatörünüze güvenmenizi — doğrulayıcınızdan sizin için çıkış yapmaları konusunda onlara bağımlı olmanızı — gerektirir. Bunu yaparlarsa harika, ancak her zaman bu üçüncü tarafa güvenmek zorundasınız.

Daha önce olan şey, bu çoklu saklama staking kurulumunu oluşturduğunuzda çıkış mesajlarını önceden imzalamayı kabul etmenizdi. Daha sonra doğrulayıcınızdan çıkış yapmak için kullanabileceğiniz bir mesaj alırdınız, ancak çıkış mesajının gerçekten işe yarayıp yaramayacağını bilemezdiniz. Ethereum'da sürüm numarasını değiştiren her güncelleme olduğunda, çıkış mesajınız artık çalışmayabilirdi.

Son Dencun güncellemesinde, yeni bir EIP bu çıkış mesajlarının sona erme süresini değiştirdi — ancak bu sadece semptomu tedavi ediyordu, sorunu çözmüyordu. Asıl sorun, stake edilen ETH'nin sahibinin çekim işlemini tetikleyememesidir. Fonlar esasen düğüm operatörü tarafından rehin tutulabilir.

Bu durum artık hem doğrulayıcı anahtarının hem de çekim anahtarının yürütme katmanından çıkışı tetiklemesine olanak tanıyan EIP-7002 ile çözülüyor — sadece özel bir çekim sözleşmesine bir işlem göndererek, burada bir çekim talebi gönderir ve doğrulayıcıdan tam bir çıkış veya stake edilen bakiyeden kısmi bir çekim işlemi belirlersiniz.

#### EIP-7251: maksimum etkin bakiye (4:15) {#eip-7251-max-effective-balance-415}

**Sunucu:** Freddy, Pectra'dan itibaren maksimum etkin bakiye hakkında bize genel bir bakış sunabilir misin ve bu durum şu anda stake eden kişileri nasıl etkileyecek?

**Freddy Tänzer:** Sadece eklemek gerekirse — kurumsal müşterilerimiz için düğüm operatörüne olan bu bağımlılık, temel olarak düzenleyicilerin endişelerini veya iş sürekliliği endişelerini gidermek amacıyla genellikle önceden imzalanmış çıkış mesajlarıyla ele alınıyordu. Ayrıca bu çıkış mesajlarını güvende tutmaları gerekiyordu. Dolayısıyla, bu bağımlılığı ortadan kaldırarak sürecin net bir şekilde basitleştirilmesi söz konusu.

Şimdi, maksimum etkin bakiye konusunda: birçok şey değişmiyor ve tüm bunlar isteğe bağlı. Hiçbir şeyi değiştirmek zorunda değilsiniz. Ethereum çekirdek geliştiricilerinin ve genel olarak ekosistemin amacı, ağdaki doğrulayıcı sayısını azaltmaktır. Şu anda bir milyonun üzerinde doğrulayıcıyız ve her birinin onaylar ve mutabakat hakkında diğerleriyle iletişim kurması gerekiyor. Bu çok fazla ağ trafiği demek — testler, iki milyon doğrulayıcıya ulaşmanın bir sorun olabileceğini gösterdi.

Amaç, ağın güvenliğini etkilemeden doğrulayıcı sayısını azaltmaktır — çünkü stake edilen toplam ETH miktarı sabit kalacak, sadece doğrulayıcı başına ortalama olarak daha fazla ETH düşecektir.

Müşteri için bu, temel olarak yeni doğrulayıcı türünü mü yoksa eskisini mi kullanacaklarına karar vermeleri gerektiği anlamına gelir. Bu, onların likidite ihtiyaçlarına bağlıdır. 32 ETH'lik doğrulayıcıların olduğu mevcut kurulumda, protokol ödülleriniz her dokuz veya on günde bir çekim kimlik bilgilerinize aktarılır ve size düzenli likidite sağlar.

Ancak birçok kurulum, ödüllerin stake'i bileşik hale getirmek için kullanıldığını varsayar. Geçmişte, bileşik getiri sağlarken, manuel olarak yeni bir doğrulayıcı başlatmak için ödüllerde 32 ETH'ye ulaşana kadar beklemeniz gerekirdi. Yeni doğrulayıcı türüyle, ödüllerinizi otomatik olarak bileşik hale getirirsiniz — bu daha fazla ödül ve daha az iş demektir.

Bunun dezavantajı, ödülleri düzenli olarak alamamanız ve onları geri almak için bir süreç oluşturmanız gerekmesidir. Çekim tetikleyicileri artık eski modelde olduğu gibi ödülleri ücretsiz almak yerine, gaz ücreti gerektiren normal işlemlerdir.

Ceza kesintisi konusunda da iyi haberler var: ilk ceza kesintisi miktarı dramatik bir şekilde — yaklaşık 128 kat — düşecek. 32 ETH'lik bir doğrulayıcı ile ilk ceza bir ETH idi. Pectra'dan sonra bu, bir ETH'nin çok küçük bir kısmı olacak — belki 20 veya 25 dolar. Bunun, Ethereum'un güvenilir tarafsızlığı için açıkça önemli olan bireysel staking üzerinde olumlu yan etkileri vardır.

Otomatik bileşik getiri avantajı temel olarak daha küçük stake miktarlarına fayda sağlar. Eğer bin tane doğrulayıcınız varsa, her ay manuel olarak yeni bir tane başlatabilirsiniz. Ancak sadece bir doğrulayıcınız varsa, bileşik getiri elde etmek için pratikte 32 yıl beklemeniz gerekir.

#### Likit staking etkileri (11:25) {#liquid-staking-implications-1125}

**Sunucu:** Julia, daha büyük doğrulayıcıların konsolidasyonu likit staking'in faydalarıyla nasıl karşılaştırılır? Pectra sonrasında stake eden birinin zihninde bu kararlar nasıl tartılacak?

**Julia Schmidt:** Alluvial'da bu değişiklikleri yakından takip ediyoruz ve her iki çözümü de sunmak istiyoruz. Pectra'daki konsolidasyon talepleri, etkin bakiyenizin kazanç süresini etkilememesi gereken geçici bir çözümdür — birden fazla doğrulayıcıyı konsolide ederken tekrar bir etkinleştirme sırasından geçmesi gerekmeyecektir. Süreç oldukça sorunsuz.

İlk ceza kesintisi miktarının düşürülmüş olması, yüksek bakiyeli doğrulayıcıları çalıştırma riskini azaltır. Ethereum Vakfı'nın asıl teşviki, ağ yükünü azaltmak için elimizden geldiğince konsolide etmektir. Küçük bir dezavantaj var: 2.048 ETH'lik maksimum etkin bakiyeye sahip bir doğrulayıcının ceza kesintisine uğraması gibi çok nadir bir durumda, çıkış sırasına girer ve fonlarınız daha uzun süre kilitli kalır — bu, 64 doğrulayıcının aynı anda ceza kesintisine uğraması gibi olurdu. Bu yüzden müşterinin risk iştahına göre esnek doğrulayıcı tavanları sunmaya çalışacağız.

Fayda tarafında, bir likit staking tokeni (LST) açıkça likidite ekler — yürütme katmanından kısmi çekim işlemleriyle bile bu anında gerçekleşmeyecektir. İşlemi gönderirsiniz, sıraya alınır, ardından çıkış dönemi ve çekim dönemi gelir. Likit staking tokenleri, kısmi çekim işlemlerinin sağlayamayacağı anında likiditeyi sunmaya devam eder.

#### Stake edenler için sonraki adımlar (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer:** Gördüğümüz kadarıyla finansal kurumlar, geri ödemeler için geri kalanını bir likidite tamponu olarak kullanmaları gerektiğinden, genellikle gözetim altındaki ETH'lerinin %65'i ile %85'i arasında bir kısmını stake ediyorlar. Likit staking ile, stake edilen ETH miktarını potansiyel olarak artırabilirsiniz, bu da daha yüksek ödüller üretir.

Her iki taraf da Pectra'dan faydalanıyor — likit staking yürütme katmanı çekim işlemleri seçeneğini elde ederken, geleneksel staking özellikle daha küçük stake'ler için 32 ETH'lik artış probleminin ortadan kalkmasını sağlıyor.

**Julia Schmidt:** Liquid Collective protokolü ile sadece tek bir düğüm operatörüne staking sunmuyoruz — stake'leri döngüsel (round-robin) bir yaklaşımla tahsis ettiğimiz farklı düğüm operatörlerinden oluşan bir konsorsiyumumuz var. Bu, stake edilen ETH'nin merkeziyetsizliğini artırır. Ayrıca bu düğüm operatörleri NORS'u (Düğüm Operatörü Risk Standardı) takip ediyor, bu nedenle ceza kesintisi durumunda da güvence garanti ediyoruz.

Henüz değinmediğim önemli bir avantaj da kısmi çekim işlemleridir — artık stake edilen ETH'yi yürütme katmanından çekebildiğinize göre, bu durum EigenLayer gibi protokollerin çekim işlemlerini ve çıkışları tetiklemesi için yeni yollar açıyor. Merkeziyetsiz finansın (DeFi) artık yatırma işleminden çıkışa kadar tüm doğrulayıcı yaşam döngüsüne daha iyi dahil edebileceği işlevsellik ve birlikte çalışabilirlik açısından büyük bir artış var. Bir Blokzincir mühendisi olarak, tüm iş akışını otomatikleştirebilmek heyecan verici.

#### Kapanış (19:50) {#closing-1950}

**Sunucu:** Julia, insanlar Liquid Collective ve Alluvial hakkında daha fazla bilgi edinmek için nereye gidebilirler?

**Julia Schmidt:** Alluvial ve Liquid Collective'i Twitter'da, X'te, LinkedIn'de veya Alluvial web sitesinde takip edebilirsiniz. Pectra güncellemesiyle ilgili değişiklikleri ve bunların Ethereum manzarasını nasıl etkileyeceğini detaylandıran bir makale paylaşacağız.

**Sunucu:** Freddy, Pectra ile ilgili paylaşılacak herhangi bir güncelleme var mı?

**Freddy Tänzer:** Gelecek çok şeyimiz var. Web sitemiz blockdaemon.com'da özel bir sayfamız olacak — tüm kaynakların merkezi noktası olacak. Bir blog yazımız, bir SSS bölümümüz ve hangi tür doğrulayıcının seçileceği ve hangi boyutta olacağı konusunda bazı rehberlik ve modelleme önerilerimiz olacak. İster 2.000 ETH'lik bir doğrulayıcı, ister 1.000 ETH'lik iki tane veya 500 ETH'lik dört tane isteyin — tüm bunlar genel olarak mümkündür ve verilmesi gereken ödünleşim kararları vardır. Müşterilerimizin bu süreçte yollarını bulmalarına yardımcı olacağız.

**Sunucu:** Harika. Freddy, Julia, bugün ayırdığınız zaman için çok teşekkürler — büyüleyici bir tartışma ve harika bir Pectra başlangıcı oldu.