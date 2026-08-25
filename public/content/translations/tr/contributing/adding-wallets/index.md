---
title: Cüzdan ekleme
description: ethereum.org'a bir cüzdan eklerken kullandığımız politika
lang: tr
---

Kullanıcıların Ethereum'da güvenle gezinebilmeleri için, cüzdanların zengin özelliklere sahip ortamını kapsayan çeşitli cüzdanlar gösterdiğimizden emin olmak istiyoruz.

Herkes ethereum.org'a bir cüzdan eklenmesini önermekte özgürdür. Gözden kaçırdığımız bir cüzdan varsa, lütfen önerin!

Cüzdanlar şu anda burada listelenmektedir:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

Ethereum'da cüzdanlar hızla değişiyor. ethereum.org'da değerlendirme için adil bir çerçeve oluşturmaya çalıştık ancak listeleme kriterleri zamanla değişecek ve gelişecektir.

## Karar çerçevesi {#the-decision-framework}

### Dahil edilme kriterleri: olmazsa olmazlar {#the-must-haves}

- **Güvenlik testi yapılmış bir ürün** - denetim, dahili bir güvenlik ekibi, açık kaynaklı kodlama veya başka bir yöntemle olsun, cüzdanınızın güvenliği güvenilir olmalıdır. Bu, kullanıcılarımıza yönelik riski azaltır ve güvenliği ciddiye aldığınızı bize gösterir.
- **Altı aydan uzun süredir "yayında" olan VEYA saygın bir geçmişe sahip bir grup tarafından piyasaya sürülen bir cüzdan** - bu, güvenliğin bir başka göstergesidir. Altı ay, kritik hataların ve istismarların bulunması için iyi bir zaman dilimidir. Proje olarak hızla terk edilen çatallanmaları filtrelemeye yardımcı olması için altı ay istiyoruz.
- **Aktif bir ekip tarafından üzerinde çalışılan** - bu, kaliteyi ve bir kullanıcının soruları için destek almasını sağlamaya yardımcı olur.
- **Dürüst ve doğru listeleme bilgileri** - projelerden önerilen tüm listelemelerin dürüst ve doğru bilgilerle gelmesi beklenir. Ürününüz açık kaynak olmadığı halde "açık kaynak" olduğunu beyan etmek gibi listeleme bilgilerinde tahrifat yapan ürünler kaldırılacaktır.
- **İletişim noktası** - Cüzdan için bir iletişim noktası, değişiklikler yapıldığında doğru bilgileri almamıza büyük ölçüde yardımcı olacaktır. Bu, gelecekteki bilgileri toplarken ethereum.org'u güncellemeyi yönetilebilir kılacaktır.
- **EIP-1559 (tip 2) işlemleri** - cüzdanınız, Ana Ağ Ethereum'daki işlemler için EIP-1559 (tip 2) işlemlerini desteklemelidir.
- **İyi kullanıcı deneyimi** - Kullanıcı deneyimi (UX) öznel olsa da, birkaç çekirdek ekip üyesi ürünü test eder ve kullanımını zor bulursa, cüzdanı reddetme hakkımızı saklı tutarız ve bunun yerine iyileştirmek için yararlı öneriler sunarız. Bu, çoğunlukla yeni başlayanlardan oluşan kullanıcı tabanımızı korumak için yapılır.
- **Ethereum odaklı** - Bir cüzdan, öncelikli olarak Ethereum odaklı bir deneyim sunmalıdır. Bu, Ethereum'un (veya herhangi bir katman 2 (l2)'nin) varsayılan ağ olarak ayarlandığı, ERC varlıklarının uygun şekilde desteklendiği ve özelliklerin Ethereum ekosistemiyle uyumlu olduğu anlamına gelir. Kullanıcı arayüzünde alternatif katman 1'lere öncelik veren cüzdanlar listelenmeyecektir. 

### Ürün kaldırmaları {#product-removals}

- **Güncellenmiş bilgiler** - Cüzdan sağlayıcıları, sağlanan bilgilerin geçerliliğini ve güncelliğini sağlamak için (ürünlerinde hiçbir değişiklik olmasa bile) cüzdan bilgilerini her 6 ayda bir yeniden göndermekten sorumludur. Ürün ekibi bunu yapmazsa, ethereum.org projeyi sayfadan kaldırabilir. 

### Diğer kriterler: olsa iyi olurlar {#the-nice-to-haves}

- **Küresel olarak erişilebilir** - cüzdanınızın, belirli kişilerin hizmetinize erişmesini engelleyen coğrafi sınırlamaları veya KYC gereksinimleri yoktur.
- **Birden fazla dilde mevcut** - cüzdanınız, dünyanın dört bir yanındaki kullanıcıların erişmesine olanak tanıyacak şekilde birden fazla dile çevrilmiştir.
- **Açık kaynak** - tüm projenizin kod tabanı (sadece modüller değil) erişilebilir olmalı ve daha geniş topluluktan gelen PR'ları kabul etmelisiniz.
- **Gözetimsiz** - kullanıcılar fonlarını kontrol eder. Ürününüz ortadan kaybolsa bile, kullanıcılar fonlarına erişmeye ve onları taşımaya devam edebilir.
- **Donanım cüzdanı desteği** - kullanıcılar işlemleri imzalamak için donanım cüzdanlarını bağlayabilirler.
- **WalletConnect** - kullanıcılar WalletConnect kullanarak merkeziyetsiz uygulamalara (dapp'lere) bağlanabilirler.
- **Ethereum RPC uç noktalarını içe aktarma** - kullanıcılar düğüm RPC verilerini içe aktararak kendi seçtikleri bir düğüme veya diğer EVM uyumlu ağlara bağlanabilirler.
- **NFT'ler** - kullanıcılar cüzdandaki NFT'lerini görüntüleyebilir ve onlarla etkileşime girebilir.
- **Ethereum uygulamalarına bağlanma** - kullanıcılar Ethereum uygulamalarına bağlanabilir ve bunları kullanabilir.
- **Staking** - kullanıcılar doğrudan cüzdan üzerinden stake edebilirler.
- **Takaslar** - kullanıcılar cüzdan üzerinden Token takası yapabilirler.
- **Çok zincirli ağlar** - cüzdanınız, kullanıcıların varsayılan olarak birden fazla Blokzincir ağına erişmesini destekler.
- **Katman 2 ağları** - cüzdanınız, kullanıcıların varsayılan olarak katman 2 (l2) ağlarına erişmesini destekler.
- **Gaz ücretlerini özelleştirme** - cüzdanınız, kullanıcıların işlem Gaz ücretlerini (taban ücret, öncelik ücreti, maksimum ücret) özelleştirmesine olanak tanır.
- **ENS desteği** - cüzdanınız, kullanıcıların ENS isimlerine işlem göndermesine olanak tanır.
- **ERC-20 desteği** - cüzdanınız, kullanıcıların ERC-20 Token sözleşmelerini içe aktarmasına olanak tanır veya ERC-20 Token'larını otomatik olarak sorgular ve görüntüler.
- **Kripto satın alma** - cüzdanınız, kullanıcıların doğrudan satın almasını ve kripto sistemine katılımını destekler.
- **İtibari para (fiat) karşılığında satma** - cüzdanınız, kullanıcıların satış yapmasını ve itibari parayı doğrudan bir karta veya banka hesabına çekmesini destekler.
- **Çoklu imza** - cüzdanınız, bir işlemi imzalamak için birden fazla imzayı destekler.
- **Sosyal kurtarma** - cüzdanınız koruyucuları destekler ve bir kullanıcı kurtarma ifadesini kaybederse bu koruyucuları kullanarak cüzdanını kurtarabilir.
- **Özel destek ekibi** - cüzdanınızın, kullanıcıların sorun yaşadıklarında başvurabilecekleri özel bir destek ekibi vardır.
- **Eğitim kaynakları/belgeler** - ürününüz, kullanıcılara yardımcı olmak ve onları eğitmek için iyi tasarlanmış bir sisteme katılım deneyimine sahip olmalıdır. Veya makaleler ya da videolar gibi nasıl yapılır içeriklerinin kanıtı olmalıdır.

## Cüzdan ekleme {#adding-a-wallet}

ethereum.org'a bir cüzdan eklemek istiyorsanız, GitHub'da bir sorun (issue) oluşturun.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Bir sorun (issue) oluşturun
</ButtonLink>

## Bakım {#maintenance}

Ethereum'un akışkan doğası gereği, ekipler ve ürünler gelir ve gider, inovasyon ise günlük olarak gerçekleşir; bu nedenle içeriğimizin rutin kontrollerini şu amaçlarla üstleneceğiz:

- listelenen tüm cüzdanların ve merkeziyetsiz uygulamaların (dapp'lerin) kriterlerimizi hala karşıladığından emin olmak
- şu anda listelenenlerden daha fazla kriterimizi karşılayan önerilmiş ürünler olmadığını doğrulamak

ethereum.org açık kaynak topluluğu tarafından sürdürülmektedir ve bunu güncel tutmaya yardımcı olması için topluluğa güveniyoruz. Listelenen cüzdanlar hakkında güncellenmesi gereken herhangi bir bilgi fark ederseniz, lütfen [bir sorun (issue) açın](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) veya [çekme isteği (pull request) gönderin](https://github.com/ethereum/ethereum-org-website/pulls)!


## Kullanım koşulları {#terms-of-use}

Lütfen [kullanım koşullarımıza](/terms-of-use/) da başvurun. ethereum.org'daki bilgiler yalnızca genel bilgilendirme amacıyla sağlanmaktadır.