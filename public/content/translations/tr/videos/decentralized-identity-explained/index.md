---
title: "Merkeziyetsiz kimlik (DID) açıklandı"
description: "Merkeziyetsiz kimliğin kullanıcılara dijital kimlikleri üzerinde nasıl daha fazla kontrol sağladığını ve blokzinciri tabanlı kimlik bilgileri kullanarak internetteki kişisel bilgileri nasıl daha güvende tuttuğunu anlatan bir açıklama."
lang: tr
youtubeId: "Ew-_F-OtDFI"
uploadDate: 2022-04-12
duration: "0:05:22"
educationLevel: beginner
topic:
  - "identity"
format: explainer
author: Microsoft Security
breadcrumb: "Merkeziyetsiz Kimlik"
---

**Microsoft Security** tarafından hazırlanan, merkeziyetsiz kimliğin (DID) kullanıcılara dijital kimlik bilgileri üzerinde nasıl daha fazla kontrol sağladığını, mevcut dijital tanımlayıcılarla ilgili sorunları, Doğrulanabilir Kimlik Bilgilerinin (Verifiable Credentials) ve Merkeziyetsiz Tanımlayıcıların (Decentralized Identifiers) nasıl çalıştığını ve bunun çevrimiçi gizlilik için ne anlama geldiğini kapsayan bir açıklama.

*Bu döküm, Microsoft Security tarafından yayımlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=Ew-_F-OtDFI) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Dijital kimlik bilgileriyle ilgili sorun (0:02) {#the-problem-with-digital-credentials-002}

Her gün kartlarla dolu cüzdanlar taşıyoruz. Ancak, devlet kimlikleri ve kredi kartları gibi sadece seçili birkaçı yaygın olarak kabul görüyor. Toplumumuz, bu fiziksel kartların temsil ettiği kimlik bilgilerini nasıl sunacağımız ve doğrulayacağımız konusunda küresel normlar oluşturmuştur. Ancak dijital kimlik bilgileri için bunun gerçek bir karşılığı yoktur.

Neden yok? İlk olarak, dijital kartlar düzenlemek için standart bir mekanizma bulunmuyor. Evrensel olarak kabul edilebilir dijital kartlar veya kimlik bilgileri düzenlemek için, bireylerin herhangi bir varlık, kuruluş veya kurumdan bağımsız olarak sahip olabileceği dijital tanımlayıcılara ihtiyacımız var. Şu anda, web sitelerine ve uygulamalara erişmek için tanımlayıcı olarak e-posta adreslerini ve telefon numaralarını kullanıyoruz. Ancak bu tanımlayıcılara ve kişisel bilgilerimize erişimimiz, bunları istedikleri zaman iptal edebilecek hizmet sağlayıcıların insafına kalmıştır.

İkinci olarak, dijital kimlik bilgilerini kurumsal sınırlar ötesinde ifade etmek, değiş tokuş etmek ve doğrulamak için evrensel olarak kabul edilmiş standartlar yoktur.

#### Merkeziyetsiz kimlik (DID) nasıl çalışır (1:03) {#how-decentralized-identity-works-103}

Tüm bunlar değişmek üzere. Doğrulanabilir Kimlik Bilgileri ve Merkeziyetsiz Tanımlayıcılar gibi gelişmekte olan standartlara dayanan yeni bir dijital kimlik biçimi, dijital kimlik bilgilerinin her yerde çalışmasını, daha güvenilir olmasını ve gizliliğe saygı duymasını sağlayabilir.

İşte böyle çalışıyor. Alice ile tanışın. Yeni dijital cüzdanı, ona kimlik bilgilerine sahip olma ve bunları kontrol etme gücü veriyor. Herhangi bir kuruluşa bağlı olmadığı için, yetkili kaynaklar Alice'e standartlara dayalı kimlik bilgilerini güvenle verebilir. Alice bu kimlik bilgilerini sunduğunda, web siteleri ve uygulamalar bunların geçerli olup olmadığını kontrol edebilir (örneğin, bir üniversiteyle orada öğrenci olduğunu teyit ederek) ve ardından buna göre erişim izni verebilir.

#### Kriptografik güven (1:51) {#cryptographic-trust-151}

Bu süreç daha kolay olsa da, güvenilir olduğunu nasıl bilebiliriz? Merkeziyetsiz Tanımlayıcılar kanıtlanmış kriptografik sistemlerden yararlanır. Alice kimlik bilgilerini sunduğunda, dijital cüzdanı benzersiz bir tanımlayıcı oluşturur ve bunu yalnızca kendisinin bildiği bir biyometrik kanıt veya PIN ile güvence altına alınmış bir özel anahtar kullanarak imzalar. Benzersiz bir şekilde eşleştirilmiş açık anahtar dağıtık bir defterde yayımlanır.

Alice dijital öğrenci kimlik kartını bir kitapçıya sunabilir ve kitapçı indirim yapmadan önce üniversitenin kartı Alice'e verdiğini teyit edebilir.

#### Gizlilik ve kontrol (2:27) {#privacy-and-control-227}

Bu deneyim Alice'in bugün yaptıklarını taklit ediyor. Tıpkı fiziksel bir kart sunar gibi bir dizi Doğrulanabilir Kimlik Bilgisini dijital olarak sunabilir ve doğrulayabilir. Ve tıpkı bir kartı cüzdanına geri koyar gibi tek bir tıklamayla bunları iptal edebilir.

En iyisi de bu dijital kartların gizli olmasıdır. Bu durum Alice'i dijital kimliğinin tek hakimi yapar; kararları o verir. Doğrulanabilir Kimlik Bilgileri, kontrolü elde tutmayı kolaylaştıracak ve hepimiz için gizliliğe saygı duyan daha güvenilir bir internetin kilidini açmaya yardımcı olacaktır.