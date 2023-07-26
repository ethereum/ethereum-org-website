---
title: Ürün ekleme
description: Ethereum.org'a cüzdan ve dapp eklerken kullandığımız politika
lang: tr
---

_Cüzdan eklemeyle ilgili bir not: [1. Çeyrek ürün yol haritamızın](https://github.com/ethereum/ethereum-org-website/issues/5105) bir parçası olarak, cüzdanlar sayfamızı iyileştiriyoruz. Bu, cüzdan sayfamız için listeleme kriterlerinin iyileştirilmesini içerecektir. İyileştirilmiş listeleme kriterlerini araştırıp, oluşturup yayınlayana kadar, web sitesine aktif olarak yeni cüzdan eklemeyeceğiz._

# Ethereum ürünleri ekleme {#adding-products}

Herkes, uygun olduğunda ethereum.org'daki içeriğe yeni cüzdanlar ve dapp'ler önermekte özgürdür. **Hayır, dapp'inizi ana sayfamızda listelemeyeceğiz** 😜

Cüzdanlar ve dapp'ler şu anda şurada listeleniyor:

- ethereum.org/wallets
- ethereum.org/wallets/find-wallet
- ethereum.org/dapps
- ethereum.org/get-eth

**Lütfen sadece bu sayfalarda yeni eklemeler önerin.**

Yeni eklemeleri memnuniyetle karşılasak da, mevcut cüzdanları ve dapp'leri kullanıcılarımız için oluşturmaya çalıştığımız bir deneyime dayanarak seçtik. Bunlar, bazı tasarım ilkelerimize dayanmaktadır:

- _İlham Verici_: ethereum.org üzerindeki herhangi bir şey kullanıcılara yeni bir şey sunmalı
- _İyi bir hikâye_: listelenen şey bir "Aklıma bir fikir geldi!" anı yaşatmalı
- _Güvenilir_: Kullanıcılara yönelik riski en aza indirmek için her şey meşru işletmeler/projeler olmalıdır

Genel olarak **ethereum.org, yeni kullanıcılar için "akıcı bir başlangıç deneyimi" sağlamak istiyor**. Bu nedenle, aşağıdakilere dayalı olarak cüzdanlar/dapp'ler ekliyoruz:

- kullanım kolaylığı
- diğer ürünlerle birlikte çalışabilirlik
- güvenlik
- uzun ömürlülük

İşte karar çerçevemizin daha ayrıntılı hâli. Geri bildirim sağlamaktan veya değişiklik önermekten çekinmeyin.

## Karar çerçevesi {#decision-framework}

### Dahil edilme kriterleri: olmazsa olmazlar {#criteria-for-inclusion-the-must-haves}

- **Güvenlik testi yapılmış bir ürün** – ister denetim yoluyla, ister dahili güvenlik ekibiyle veya başka bir yöntemle olsun, ürününüzün güvenliği güvenilir bir şekilde test edilmelidir. Bu, kullanıcılarımıza yönelik riski azaltır ve güvenliği ciddiye aldığınızı gösterir.
- **6 ayı aşkın süredir "kullanımda" olan bir ürün**: Bu, güvenliğin bir başka göstergesidir. 6 ay, kritik hataların ve açıkların bulunması için iyi bir zaman dilimidir.
- **Aktif bir ekip tarafından üzerinde çalışılıyor**: Bu, kaliteyi korumaya ve bir kullanıcı sorgularıyla ilgili destek almasını sağlamaya yardımcı olur.
- **Dürüst ve doğru listeleme bilgileri**: Projelerden önerilen tüm listelemelerin dürüst ve doğru bilgilerle gelmesi beklenir. Ürününüzü "açık kaynak" değilken öyleymiş gibi duyurmak gibi listeleme bilgilerini tahrif eden ürünler kaldırılacaktır.

### Sıralama için kriter: olursa iyi olacak şeyler {#criteria-for-ranking-the-nice-to-haves}

Dapp'iniz veya cüzdanınız, aşağıdaki kriterler nedeniyle ethereum.org'da diğerleri kadar belirgin bir şekilde listelenmemiş olabilir.

**Cüzdanlar**

- **İtibari para birimi erişim yöntemi** – Bu, yeni bir kullanıcının cüzdan deneyiminde çok fazla olası sürtüşmeyi önler. Bir kullanıcının bir borsa aracılığıyla cüzdanını finanse etmesi gerektiğinde kullanıcının cüzdanı denemesi, müşteriyi tanıma kontrolleri nedeniyle günler alabilir.
- **Dapp'lerin çoğu tarafından destekleniyor** – ethereum.org içeriği, kullanıcılara Dapp'leri göstermeden onların önce bir cüzdan ve ETH ile hazır olmalarını amaçlar. Dapp'ler cüzdanınızla bağlantı kurmayı desteklemiyorsa bu durum, kullanıcıların deneyimlerini mahvedebilir.

**Dapp'ler**

- **Listelenen cüzdanların çoğu ile erişilebilmesi** – dapp'ler, ethereum.org'da listelenen cüzdanların çoğuyla çalışmalıdır.
- **Kullanıcıların bunu kendileri deneyebilmeleri –** bireysel bir kullanıcı dapp'inizi kullanabilmeli ve somut bir şey elde edebilmelidir.

**İkisi de**

- **Başlangıç** – ürününüz, kullanıcılara yardımcı olmak ve onları eğitmek için iyi tasarlanmış bir başlangıç deneyimine sahip olmalıdır. Veya makaleler veya videolar gibi rehber içeriğin kanıtı.
- **Gözetimsiz** – kullanıcılar kendi fonlarını kontrol eder. Ürününüz kaybolursa, kullanıcılar yine de fonlarına erişebilir ve bunları taşıyabilir.
- **Küresel olarak erişilebilir** – ürününüz, belirli kişilerin hizmetinize erişmesini engelleyen coğrafi sınırlamalara veya KYC gereksinimlerine sahip değildir.
- **Açık kaynak** – kodunuz erişilebilir olmalı ve daha geniş topluluktan PR'leri kabul etmelisiniz.
- **Topluluk** – kullanıcıların yardım almak veya yeni özellikler önermek için ekibinizle etkileşime geçebileceği özel bir topluluğunuzun, belki bir Discord'unuzun olması.

## Pratikte kriterler {#criteria-in-practice}

Ne kadar çok kriteri karşılarsanız, ürününüzün ethereum.org'a girme olasılığı o kadar artar.

Yalnızca olmazsa olmazları karşılayan listelenmiş bir ürün, olmazsa olmazları ve olması iyi olan şeylerden birkaçını karşılayan yeni bir ürün önerildiğinde kaldırılabilir.

Bu kararı etkileyecek diğer şeyler:

- Değiştirmek yerine eklemek, sayfanın kullanıcı deneyimini bozar mı?
  - sitemiz öncelikle eğitim amaçlıdır ve asıl amacı Ethereum ve ilgili kavramları açıklamaktır. Kullanıcılar için çok fazla seçenek eklendiğinde, sayfalar daha az okunabilir ve dolayısıyla daha az kullanışlı hâle gelebilir.
- Bu sayfa şu anda kullanıcıyı seçeneklerle felç ediyor mu?
  - izleyecek bir şeye karar veremediğiniz için saatlerce Netflix'e göz atarken olduğu gibi. Yeni kullanıcıları çok fazla seçenekle şaşırtmak bir risktir.

Bu, ethereum.org'un sorumlu olduğu bir tasarım kararıdır.

Ancak içiniz rahat olsun, **daha fazla uygulama/cüzdan sıralaması yapan diğer web sitelerine bağlantılar olacaktır**

### Ürün Siparişi {#product-ordering}

Ürünler, örneğin alfabetik olarak, aksi belirtilmedikçe, sayfaya en yakın zamanda eklenenden en eskiden eklenene doğru gösterilecektir. Diğer bir deyişle, en yeni ürünler listenin en altına eklenir.

### Kullanım koşulları {#terms-of-use}

Ayrıca lütfen [kullanım koşullarımıza](/terms-of-use/) bağlı kalın. Ethereum.org'daki bilgiler yalnızca genel bilgi amaçlı verilmektedir.

## Bakım {#maintenance}

Ethereum'un akıcı yapısında olduğu gibi, ekipler ve ürünler gelir ve gider; yenilikler her gün gerçekleşir, bu nedenle içeriğimizin rutin kontrollerini şu amaçlarla gerçekleştireceğiz:

- listelenen tüm cüzdanların ve dapp'lerin hâlâ kriterlerimizi karşıladığından emin olmak
- şu anda listelenenlerden daha fazla kriterlerimizi karşılayan önerilen ürünler olmadığını doğrulamak

Kontrol edip bize bildirerek bu konuda yardımcı olabilirsiniz. [Bir konu oluşturun](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A&projects=&template=feature_request.yaml&title=Feature+request) veya [website@ethereum.org](mailto:website@ethereum.org) adresine bir e-posta gönderin

_Ayrıca, topluluğun tercihlerini belirtebilmesi ve önerebileceğimiz en iyi ürünleri öne çıkarabilmesi için oylama seçeneklerini araştırıyoruz._

---

## Ürününüzü ekleyin {#add-your-product}

Ethereum.org'a bir cüzdan veya dapp eklemek istiyorsanız ve bu cüzdan veya dapp kriterleri karşılıyorsa GitHub'da bir sorun oluşturun.

<ButtonLink to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A&projects=&template=feature_request.yaml&title=Feature+request">
  Bir konu oluşturun
</ButtonLink>
