---
title: "Blokzincir mutabakat mekanizmalarını anlamak"
description: "Blokzincirlerde kullanılan temel mutabakat mekanizmalarını ve merkeziyetsiz ağların merkezi bir otorite olmadan işlemlerin durumu üzerinde anlaşmasını nasıl sağladıklarını kapsayan bir açıklayıcı."
lang: tr
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "consensus"
  - "blockchain"
format: explainer
author: Tech in Asia
breadcrumb: "Mutabakat Mekanizmaları"
---

**Tech in Asia** tarafından hazırlanan, Blokzincir sistemlerinde kullanılan üç ana mutabakat mekanizmasını (İş Kanıtı (PoW), Hisse Kanıtı (PoS) ve yetki kanıtı) ve bunların merkeziyetsiz ağların işlemlerin durumu üzerinde anlaşmasını nasıl sağladığını kapsayan bir açıklayıcı.

*Bu transkript, Tech in Asia tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=ojxfbN78WFQ) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

#### Mutabakat mekanizmaları nelerdir? (0:00) {#what-are-consensus-mechanisms-000}

Blokzincir — 2018'in en popüler kelimesi. Peki, otoriter bir figürü olmayan merkeziyetsiz, eşler arası bir sistemin nasıl karar verdiğini biliyor musunuz? Cevap mutabakat mekanizmalarında yatıyor. Çeşitli mutabakat mekanizmaları vardır, ancak hepsi aynı amaca hizmet eder: kayıtların doğru ve dürüst olmasını sağlamak. Aralarındaki fark, mutabakata varılma şeklidir. Burada üç tür mutabakat mekanizmasını inceleyeceğiz.

#### İş Kanıtı (PoW) (0:23) {#proof-of-work-023}

Bir İş Kanıtı (PoW) sisteminde, işlem verileri Bloklar halinde saklanır ve insanların buna bağlı karmaşık bir matematik problemini çözmesiyle doğrulanır. Bu genellikle güçlü bilgisayarlar tarafından yapılır ve "madencilik" olarak bilinir. Problemi çözen ilk madenciye kripto para şeklinde bir ödül verilir.

Bir grup hazine avcısının, üzerinde karmaşık bir kilit bulunan bir sandığı açmaya çalıştığını hayal edin. Doğru kombinasyonu bulmak zahmetlidir, ancak bunu yapan ilk kişi ödüllendirilir. Basitçe söylemek gerekirse, İş Kanıtı (PoW) bir hazine sandığındaki doğru kombinasyonu bulma yarışıdır. Bitcoin ve Ethereum gibi kripto paralar bir İş Kanıtı (PoW) mekanizması kullanır.

#### Hisse Kanıtı (PoS) (1:04) {#proof-of-stake-104}

Sırada Hisse Kanıtı (PoS) var. Burada, Doğrulayıcı olarak da bilinen yeni bir Blok yaratıcısı, ağa ne kadar stake ettiklerine bağlı olarak rastgele seçilir. Ne kadar yüksek stake edilirse, Doğrulayıcı olarak seçilme şansı o kadar yüksek olur.

Bunu hazine sandığı senaryosuna uygulayalım. Bir sandık için yarışan bir grup hazine avcısı düşünün. Sandık bir piyango sistemine göre ödüllendirilir. Katılmak için her avcının piyango bileti alması gerekir. Her avcı ne kadar çok bilet alırsa, kazanma şansı o kadar yüksek olur. Cardano'nun Ouroboros'u ve EOS gibi Blokzincir protokolleri Hisse Kanıtı (PoS) mutabakatını benimser.

#### Yetki kanıtı (1:42) {#proof-of-authority-142}

Son olarak, yetki kanıtı — Hisse Kanıtı'nın (PoS) değiştirilmiş bir şekli. Burada, yalnızca itibarlarına göre seçilen onaylı taraflar Doğrulayıcı olabilir.

Hazine sandığı senaryosunu tekrar gözden geçirelim. Hazine avcıları grubu bir birlik oluşturur ve hazinelerini bir araya getirir. Güvenilirlik düzeylerine bağlı olarak, sandığın içeriğinin geçerliliğini sağlamak için grup tarafından seçilmiş birkaç kişi atanır. IBM'in Hyperledger Fabric'i ve Ethereum'un Kovan test ağı, yetki kanıtı kullanan Blokzincir sistemlerine bazı örneklerdir.

#### Hibrit mutabakat modelleri (2:14) {#hybrid-consensus-models-214}

Geleneksel Blokzincir şirketleri tek bir mutabakat mekanizması üzerinde var olurken, bazı yenilikçi olanlar birden fazla mutabakat protokolünü benimsiyor. Örneğin, hem yetki kanıtı hem de İş Kanıtı (PoW) protokollerini uygulayarak eğitim asistanı sohbet robotu uygulamasında toplanan verileri depolamak için benzersiz bir Blokzincir inşa eden Opet Foundation'ı ele alalım.

Öğrencilerin akademik, ders dışı ve kişilik profili kayıtları gibi veriler Blokzincir üzerinde saklanır ve potansiyel olarak Hyperledger Fabric tarafından desteklenen bir yetki kanıtı çerçevesi aracılığıyla doğrulanır. Bu durumda Doğrulayıcılar, saygın eğitim kurumları veya hatta ulusal kayıt memurları ve ilgili eğitim bakanlıklarıdır. Bu, tüm öğrenci verilerinin güvenilir olmasını sağlamaya yardımcı olur.

Peki kim bedavaya çalışacak? İş Kanıtı (PoW) mutabakatı, işi gerçekleştiren Doğrulayıcıları ödüllendirmek için devreye girer.

#### Gizlilik ve öğrenci verileri (3:02) {#privacy-and-student-data-302}

Hyperledger Fabric ile her öğrenci kaydı, öğrencinin sahip olduğu özel bir hash anahtarı ile güvence altına alınır. Verilere yalnızca öğrenci benzersiz anahtarı sağladığında erişilebilir. Bu, öğrenci gizliliğinin korunduğu ve bizzat öğrenci tarafından kontrol edildiği anlamına gelir.

Örneğin, öğrenciler Opet'in platformu üzerinden üniversiteye başvurduklarında, kayıtlarının benzersiz anahtarını üniversiteye sağlarlar. Bununla birlikte üniversite, en son akademik kayıtlarına erişebilir. Öğrenciler ayrıca kayıtlarının kilidinin açılıp açılmadığını veya en azından başvuru için değerlendirilip değerlendirilmediğini görebileceklerdir. Bu, geleneksel yöntemlere kıyasla verimliliği ve şeffaflığı artırır.

#### Kapanış (3:37) {#closing-337}

İş Kanıtı (PoW) ve yetki kanıtı modellerini birleştiren Opet Foundation'ın Blokzincir çözümü, öğrencilerin verilerinde gizlilik sağlarken, platforma katkıda bulunduklarında hem eğitim kurumlarını hem de öğrencileri teşvik eder. Blokzincirlerin popülerlik kazanmasıyla birlikte, daha da benzersiz hibrit sistemlerin yaratıldığını görmemiz an meselesidir.