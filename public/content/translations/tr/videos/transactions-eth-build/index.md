---
title: "İşlemler — ETH.BUILD"
description: "ETH.BUILD eğitim aracını kullanarak Ethereum işlemlerinin nasıl çalıştığına dair bir gösterim. İşlemlerin Ethereum ağında nasıl oluşturulduğunu, imzalandığını ve gönderildiğini görün."
lang: tr
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transactions"
format: tutorial
author: Austin Griffith
breadcrumb: "İşlemler (ETH.BUILD)"
---

**Austin Griffith** tarafından hazırlanan ve ETH.BUILD görsel programlama aracını kullanarak Ethereum işlemlerinin nasıl çalıştığını gösteren bir eğitim — işlem yapısı, gas fiyatları, imzalama, yayınlama ve işlem havuzunu kapsar.

*Bu döküm, Austin Griffith tarafından yayınlanan [orijinal video dökümünün](https://www.youtube.com/watch?v=er-0ihqFQB0) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

#### İşlem ücretleri ve madenci teşvikleri (0:00) {#transaction-fees-and-miner-incentives-000}

Bugün ETH.BUILD'de işlemler hakkında konuşacağız. Şimdiye kadar, bu işlemlerin bloklara kazılması, bloklar halinde paketlenmesi ve bir zincire kazılması gibi bir durumumuz vardı. Madenciyi — blok ödülü dışında — işlemimizi havuzdan çıkarıp bir bloka koymaya ve havuzdaki diğer insanlara kıyasla zincire kazmaya neyin teşvik ettiğinden bahsetmek istiyoruz. Havuzda teklif veren binlerce kişi olabilir ve bu teklif bu ücretle yapılır.

İşlemimde, "Ben Alice'im ve Bob'a beş gönderiyorum ve tekrar oynatma koruması için nonce değerim bir" diyen bir ücretim olabilir. Ayrıca, bunu kim kazarsa ücreti kendisi alabilir. Temel olarak Alice, Bob'a beş gönderiyor ama aynı zamanda bunu zincire koyması için madenciye bir miktar ödeme yapıyor.

#### Bir Ethereum işleminin anatomisi (1:10) {#anatomy-of-an-ethereum-transaction-110}

Ethereum'da bir işlem neye benzer? Artık "Bob" ve "Alice" olmayacak — adreslerimiz olacak. Değer ETH cinsinden değil, Wei cinsinden olacaktır. Ve ücret de Wei cinsinden olacaktır.

Hemen konuya girelim ve bu işleme bakalım. İçine bir anımsatıcı (mnemonic) bırakılmış bir hesabım var ve Ethereum Ana Ağına bağlıyım. Ayrıca CoinMarketCap'ten fiyat verilerini almak için bir modül çalıştırıyorum, böylece sıfır nokta bir küsur ETH'nin yaklaşık yirmi üç dolara karşılık geldiğini görebiliyorum.

#### İşlemi ayarlama (2:25) {#setting-up-the-transaction-225}

Yapacağım şey bir işlem oluşturmak ve madenciyi onu alıp zincire koyması için teşvik etmek. İki karakterim var — Alice ve Bob. Alice, özel anahtarı ile Bob'a bir miktar değer gönderecek. Burada "gönderen" (from) adres alanı yok çünkü — unutmayın — anahtar çiftimizle imzalama ve kurtarma yapıyoruz. İşlem paketlenir, imzalanır ve ardından ağ üzerinden gönderilir. Hiç kimse onu kurcalayamaz ve diğer tarafta biri onu kurtarabilir ve onu imzalayanın gerçekten biz olduğumuzu bulabilir. "Gönderen" adresi türetilir.

#### Gas fiyatı stratejisi (4:20) {#gas-price-strategy-420}

Gas fiyatı varsayılan olarak yaklaşık 4.1 Gwei'ye ayarlanmıştır — bu 4.1 milyar Wei'dir. Ancak bu konuda daha stratejik olmak ve şu anda zincir içi neler olup bittiğini görmek istiyoruz. Son blokta 78 işlem olduğunu ve gas fiyatının yaklaşık 5'ten bir minimuma kadar değiştiğini görebiliriz. Temel olarak, o bloka kazılmak için 5'in üzerinde olmamız gerekir. Bu yüzden gas fiyatını 5.001'e ayarlayalım — sadece biraz daha fazla.

#### Wei'ye dönüştürme (5:20) {#converting-to-wei-520}

Wei'ye bir dönüştürme yapmamız gerekiyor. Ethereum'da, temel olarak iki birimle ilgilenirsiniz: İnsanların normalde hakkında konuştuğu ETH ve ardından ETH'nin çok küçük bir kesri gibi olan Wei. Gas fiyatları için kullandığımız Gwei ise ikisinin arasındadır. Bunun nedeni, neden kuruşların kesirleriyle konuşarak dolaşmadığımıza benzer.

Alice'in 0.18 ETH'si var ve Bob'a 0.05 ETH göndereceğiz. 5 Gwei'lik bir gas fiyatı giriyoruz.

#### İmzalama ve yayınlama (7:02) {#signing-and-broadcasting-702}

Alice işlemi imzalamayı seçtiğinde, ağ üzerinden gidebilecek imzalı bir işlem olarak yola çıkar. Hiç kimse ona müdahale edemez — diğer tarafta, biri onu imzalayanın Alice olduğunu türetebilir ve kime göndermek istediğimiz ve madenciye giden Gaz hakkındaki tüm bilgileri içerir.

Bu imzalı işlemi alıyoruz ve blokzincir modülünün gönderme işlevine takıyoruz. Gönder'e tıkladığımda, bize bir hash verir — işlemin hash'i. Temel olarak, onu dağıtık ağa gönderdim ve bana bir işlem hash'i geri verdiler. Ağda dışarı çıkar ve ardından bu işlem havuzu vardır — herkes işlemini geçirmek için teklif verir.

#### Bloku kontrol etme (8:41) {#checking-the-block-841}

İşlemimiz için blokzinciri sorgulayabiliriz. Nitekim, çoktan kazılmış. Bloka bakabilir, gas fiyatına göre sıralayabilir ve kendimizi bulabiliriz. İşte 5.001 gas fiyatındaki işlemimiz — Alice'ten Bob'a gönderiliyor, ekstra veri yok. Oradayız, aşağıdan yaklaşık dört veya beş sıra yukarıda.

#### Bir işlemle veri gönderme (9:54) {#sending-data-with-a-transaction-954}

Değer gönderebiliyor ve işlemimizin zincirde tanınması için teklif verebiliyoruz. Ancak bir şeye daha bakalım — veri alanı. İşlemimizle birlikte bir şeyler gönderebiliriz. Onaltılık (hexadecimal) formatta olacak. Alice, Bob'a altı dolar daha gönderecek ve bir mesaj ekleyeceğiz: "hey Bob." "hey Bob"un hex formatına dönüştürüldüğünü görebiliriz.

Bu işlemi imzalıyoruz, bir madenciye gönderiyoruz, ağa gidiyor ve geri bir hash alıyoruz. Kazılmasını izliyoruz ve kazılıyor. O bloku kontrol ettiğimizde, işlemimizi ekli verilerle birlikte görebiliriz.

#### İşlem havuzu ve gas artırma (12:43) {#transaction-pool-and-gas-bumping-1243}

Son bir gösterim için, havuza çok düşük bir gas fiyatıyla — yaklaşık 1.001 Gwei — bir işlem koydum. Madencileri yeterince teşvik etmediğimiz için orada kazılmamış halde duruyor. İşlemin işlem havuzunda beklediğini görebiliriz. Havuzda yüz ile üç yüz arasında işlem var, ancak kazılan son bloklar en küçük gas fiyatının yaklaşık 5 olduğunu gösteriyor.

Bu yüzden bu işlemi yeniden göndermemiz gerekiyor — hadi bunu 10'a çıkaralım. Bu olması gerekenden çok daha fazla, ancak aynı işlemi aynı nonce değeriyle fakat daha yüksek bir gas fiyatıyla yeniden göndereceğiz. Ağ, "aynı kişi, aynı işlem, daha fazla ödemeye istekli" diyor. Alınır ve bir sonraki bloka kazılır.

#### Özet (14:52) {#summary-1452}

Bir işlem gönderdik, madenciyi onu blokların zincirine koyması için teşvik etmek amacıyla biraz Gaz ödedik. Ayrıca bir işlemle birlikte veri de gönderdik — artık bu çağrı verisi geldiğine göre yapabileceğimiz her türlü gerçekten harika şey var ve daha sonra akıllı sözleşmelere ve birçok eğlenceli şeye gireceğiz.