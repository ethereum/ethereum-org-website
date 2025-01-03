---
title: Cüzdan ekleme
description: Ethereum.org'a cüzdan eklerken kullandığımız politika
lang: tr
---

# Cüzdan ekleme {#adding-wallets}

Kullanıcıların kendilerinden emin bir tarzda Ethereum'da yön bulabilmeleri için cüzdanların özellik açısından zengin manzaralarını kapsayan, çeşitli cüzdanları gösterdiğimizden emin olmak isteriz.

Herkes, ethererum.org'a bir cüzdan önermekte özgürdür. Gözden kaçırdığımız bir cüzdan varsa lütfen bildirin!

Cüzdanlar şu anda aşağıdakilerde listeleniyor:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

Ethereum'da cüzdanlar çok hızlı bir biçimde değişiyor. Ethereum.org'da değerlendirilmek üzere adil bir çerçeve oluşturmaya çalıştık, ancak listeleme kriterleri zamanla değişecek ve gelişecektir.

## Karar çerçevesi {#the-decision-framework}

### Dahil edilme kriterleri: olmazsa olmazlar {#the-must-haves}

- **Güvenliği sınanmış bir ürün** - bir denetim, iç güvenlik ekibi, açık kaynaklı kodlama yoluyla ya da bazı başka yöntemlerle cüzdanınızın güvenliği sağlanmış olmak zorundadır. Bu, kullanıcılarımıza yönelik riski azaltır ve güvenliği ciddiye aldığınızı gösterir.
- **Altı aydan fazladır ''canlı'' olan VEYA itibarlı bir geçmişe sahip olan bir grup tarafından yayımlanan bir cüzdan** - bu, güvenliğin bir başka göstergesidir. Hayati hataların ve kötüye kullanımların bulunması için altı ay iyi bir zaman aralığıdır. Projeler olarak hızlı bir şekilde terk edilecek çatallanmaları elemek için altı ay istiyoruz.
- **Aktif bir ekibin üzerinde çalışmış olması** - bu, kalitenin sağlanmasına ve bir kullanıcının sorguları için destek almasına yardımcı olur.
- **Dürüst ve doğru listeleme bilgileri**: Projelerden önerilen tüm listelemelerin dürüst ve doğru bilgilerle gelmesi beklenir. Ürününüzü, örneğin "açık kaynaklı" değilken öyleymiş gibi duyurarak listeleme bilgilerini tahrif eden ürünler kaldırılacaktır.
- **İletişim noktası** - Cüzdan için bir iletişim noktası, değişiklikler yapıldığında doğru bilgiyi elde etmemize büyük ölçüde yardımcı olacaktır. Bu, geleceğe ait bilgileri toplarken ethereum.org'u güncelleme sürecini yönetilebilir halde tutacaktır.
- **EIP-1559 (tip 2) işlemleri** - Ethereum ana ağındaki işlemler için cüzdanınız EIP-1559 (tip 2) işlemleri desteklemek zorundadır.
- **İyi kullanıcı deneyimi** - UX öznel bir kavram olsa da, çekirdek ekip üyelerinizden birkaçının ürünü test edip kullanımında zorluk çekmesi halinde cüzdanı reddetme hakkımızı saklı tutarız ve bunun yerine iyileştirmeye yönelik faydalı önerilerde bulunuruz. Bu, çoğunluğu yeni başlayanlardan oluşan kullanıcı tabanımızı korumak için yapılır.

### Ürün kaldırma {#product-removals}

- **Güncellenmiş bilgi** - Cüzdan sağlayıcıları, sağladıkları bilgilerin geçerli ve güncel olmasını sağlamak için her 6 ayda bir cüzdan bilgilerini yeniden göndermekle yükümlüdür (ürünlerinde herhangi bir değişiklik olmasa bile). Eğer ürün ekibi bunu yapmazsa, ethereum.org projeyi sayfasından kaldırabilir.

### Diğer kriterler: olursa iyi olan şeyler {#the-nice-to-haves}

- **Küresel olarak erişilebilir** - cüzdanınız, belirli kişilerin hizmetinize erişmesini engelleyen coğrafi kısıtlamalara veya KYC koşullarına sahip değildir.
- **Birden fazla dilde mevcut olma** - cüzdanınız, tüm dünyadaki kullanıcıların erişim sağlayabilmesi için birden çok dile çevrilir.
- **Açık kaynak** - tüm projenizin kod tabanı (yalnızca modülleri değil) erişilebilir olmalıdır ve daha geniş topluluktan gelecek PR'leri kabul etmelisiniz.
- **Gözetimsiz** - kullanıcılar kendi fonlarını kontrol eder. Ürününüz kaybolursa, kullanıcılar yine de fonlarına erişebilir ve bunları taşıyabilir.
- **Donanım cüzdan desteği** - kullanıcılar, işlemleri imzalamak amacıyla kendi donanım cüzdanlarını bağlayabilir.
- **WalletConnect** - kullanıcılar, WalletConnect'i kullanarak merkeziyetsiz uygulamalara bağlanabilir.
- **Ethereum RPC uç noktalarını içe aktarma** - kullanıcılar, düğüm RPC verilerini içe aktararak kendi seçtikleri bir düğüme veya EVM uyumlu diğer ağlara bağlanmalarına olanak tanır.
- **NFT'ler** - kullanıcılar, cüzdanlarındaki NFT'leri görebilir ve onlarla etkileşime girebilir.
- **Ethereum uygulamalarına bağlanma** - kullanıcılar, Ethereum uygulamalarına bağlanabilir ve onları kullanabilir.
- **Hisseleme** - kullanıcılar, cüzdan aracılığıyla doğrudan hisseleme yapabilir.
- **Takaslar** - kullanıcılar, cüzdan aracılığıyla jeton takas edebilir.
- **Çok zincirli ağlar** - cüzdanınız, varsayılan olarak kullanıcıların çoklu blokzincir ağlarına erişimini destekler.
- **Katman 2 ağları** - cüzdanınız, varsayılan olarak kullanıcıların katman 2 ağlarına erişimini destekler.
- **Gaz ücretlerini özelleştirme** - cüzdanınız, kullanıcılara işlem gaz ücretlerini (ana ücret, öncelik ücreti, azami ücret) düzenleme imkanı tanır.
- **ENS desteği** - cüzdanınız, kullanıcıların ENS isimlerine işlem göndermelerine olanak sağlar.
- **ERC-20 desteği** - cüzdanınız, kullanıcılara ERC-20 jeton sözleşmelerini içe aktarma veya otomatik sorgulama imkanı sunar ve ERC-20 jetonlarını görüntüler.
- **Kripto satın alımı** - cüzdanınız, kullanıcıların doğrudan kripto satın alımını ve kriptoya alışmalarını destekler.
- **İtibari para için satış** - cüzdanınız, kullanıcıların itibari para için satmalarını ve doğrudan bir karta veya banka hesabına çekim yapmalarını destekler.
- **Çoklu imza** - cüzdanınız, bir işlemi imzalamak için çoklu imzayı destekler.
- **Sosyal kurtarma** - cüzdanınız, muhafızları destekler ve bir kullanıcı, güvenlik kelimelerini kaybederse bu muhafızları kullanarak cüzdanını kurtarabilir.
- **Özel destek ekibi** - cüzdanınız, kullanıcıların sorun yaşadıklarında gidebilecekleri özel bir destek ekibine sahiptir.
- **Eğitim kaynakları/dokümanları** - ürününüz, kullanıcılara yardım etmek ve onları bilgilendirmek için iyi tasarlanmış bir alıştırma deneyimine sahip olmalıdır. Alternatif olarak, makaleler veya videolar gibi nasıl yapılır içeriğinin kanıtına da sahip olabilir.

## Cüzdan ekleme {#adding-a-wallet}

Ethereum.org'a bir cüzdan eklemek istiyorsanız GitHub'da bir konu oluşturun.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Bir konu oluştur
</ButtonLink>

## Bakım {#maintenance}

Ethereum'un akıcı yapısında olduğu gibi, ekipler ve ürünler gelir ve gider; yenilikler her gün gerçekleşir, bu nedenle şu amaçlarla içeriğimizin rutin kontrollerini gerçekleştireceğiz:

- listelenen tüm cüzdan ve merkeziyetsiz uygulamaların hala kriterlerimizi karşıladığından emin olmak
- şu anda listelenenlerden daha fazla sayıda kriterimizi karşılayan önerilmiş ürünler olmadığını doğrulamak

ethereum.org açık kaynak topluluğu tarafından yönetilmektedir ve güncel tutulması konusunda topluluğa güveniriz. Listelenmiş cüzdanlar ile ilgili herhangi bir bilginin güncelleştirilmesi gerektiğini fark ettiyseniz lütfen [bir konu açın](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) veya [çekme isteği oluşturun](https://github.com/ethereum/ethereum-org-website/pulls)!


## Kullanım koşulları {#terms-of-use}

Ayrıca lütfen [kullanım koşullarımıza](/terms-of-use/) başvurun. Ethereum.org'daki bilgiler, yalnızca genel bilgi amaçlı verilmektedir.
