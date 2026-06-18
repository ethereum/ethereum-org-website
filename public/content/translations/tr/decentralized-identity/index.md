---
title: Merkeziyetsiz kimlik
description: Merkeziyetsiz kimlik nedir ve neden önemlidir?
lang: tr
template: use-cases
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoints:
  - "Geleneksel kimlik sistemleri, tanımlayıcılarınızın ihracını, bakımını ve kontrolünü merkezileştirmiştir."
  - "Merkeziyetsiz kimlik, merkezi üçüncü taraflara olan bağımlılığı ortadan kaldırır."
  - "Kripto sayesinde kullanıcılar artık kendi tanımlayıcılarını ve onaylarını yeniden ihraç etme, tutma ve kontrol etme araçlarına sahipler."
---

Kimlik, günümüzde hayatınızın neredeyse her yönünün temelini oluşturur. Çevrim içi hizmetleri kullanmak, banka hesabı açmak, seçimlerde oy kullanmak, mülk satın almak, iş bulmak; tüm bunlar kimliğinizi kanıtlamanızı gerektirir.

Ancak geleneksel kimlik yönetimi sistemleri, uzun zamandır tanımlayıcılarınızı ve [onaylarınızı](/glossary/#attestation) ihraç eden, tutan ve kontrol eden merkezi aracılara dayanmaktadır. Bu, kimlikle ilgili bilgilerinizi kontrol edemeyeceğiniz veya kişisel olarak tanımlanabilir bilgilere (PII) kimin erişebileceğine ve bu tarafların ne kadar erişime sahip olacağına karar veremeyeceğiniz anlamına gelir.

Bu sorunları çözmek için [Ethereum](/) gibi herkese açık blokzincirler üzerine inşa edilmiş merkeziyetsiz kimlik sistemlerimiz var. Merkeziyetsiz kimlik, bireylerin kimlikle ilgili bilgilerini yönetmelerine olanak tanır. Merkeziyetsiz kimlik çözümleriyle, hizmet sağlayıcılar veya hükümetler gibi merkezi otoritelere güvenmeden tanımlayıcılar oluşturabilir, onaylarınızı talep edebilir ve tutabilirsiniz.

## Kimlik nedir? {#what-is-identity}

Kimlik, bir bireyin benzersiz özelliklerle tanımlanan benlik duygusu anlamına gelir. Kimlik, bir _birey_ olmayı, yani farklı bir insan varlığını ifade eder. Kimlik ayrıca bir kuruluş veya otorite gibi insan dışı diğer varlıklara da atıfta bulunabilir.

<VideoWatch slug="decentralized-identity-explained" />

## Tanımlayıcılar nelerdir? {#what-are-identifiers}

Tanımlayıcı, belirli bir kimliğe veya kimliklere işaretçi görevi gören bir bilgi parçasıdır. Yaygın tanımlayıcılar şunları içerir:

- İsim
- Sosyal güvenlik numarası/vergi kimlik numarası
- Cep telefonu numarası
- Doğum tarihi ve yeri
- Dijital kimlik bilgileri, ör. e-posta adresleri, kullanıcı adları, avatarlar

Bu geleneksel tanımlayıcı örnekleri, merkezi varlıklar tarafından ihraç edilir, tutulur ve kontrol edilir. Adınızı değiştirmek için hükümetinizden veya kullanıcı adınızı değiştirmek için bir sosyal medya platformundan izin almanız gerekir.

## Merkeziyetsiz kimliğin faydaları {#benefits-of-decentralized-identity}

1. Merkeziyetsiz kimlik, tanımlayıcı bilgilerin bireysel kontrolünü artırır. Merkeziyetsiz tanımlayıcılar ve onaylar, merkezi otoritelere ve üçüncü taraf hizmetlere güvenmeden doğrulanabilir.

2. Merkeziyetsiz kimlik çözümleri, kullanıcı kimliğini doğrulamak ve yönetmek için güven gerektirmeyen, sorunsuz ve gizliliği koruyan bir yöntemi kolaylaştırır.

3. Merkeziyetsiz kimlik, farklı taraflar arasında güven yaratan ve onayların geçerliliğini kanıtlamak için kriptografik garantiler sağlayan blokzincir teknolojisinden yararlanır.

4. Merkeziyetsiz kimlik, kimlik verilerini taşınabilir hale getirir. Kullanıcılar onayları ve tanımlayıcıları bir mobil cüzdanda saklar ve istedikleri herhangi bir tarafla paylaşabilirler. Merkeziyetsiz tanımlayıcılar ve onaylar, ihraç eden kuruluşun veritabanına kilitlenmez.

5. Merkeziyetsiz kimlik, bireylerin ne olduğunu açıklamadan bir şeye sahip olduklarını veya bir şey yaptıklarını kanıtlamalarını sağlayacak gelişmekte olan [sıfır bilgi](/glossary/#zk-proof) teknolojileriyle iyi çalışmalıdır. Bu, oy kullanma gibi uygulamalar için güven ve gizliliği birleştirmenin güçlü bir yolu haline gelebilir.

6. Merkeziyetsiz kimlik, bir bireyin bir sistemi manipüle etmek veya spam göndermek için birden fazla insanmış gibi davrandığını tespit etmek için [Sybil karşıtı](/glossary/#anti-sybil) mekanizmalara olanak tanır.

## Merkeziyetsiz kimlik kullanım durumları {#decentralized-identity-use-cases}

Merkeziyetsiz kimliğin birçok potansiyel kullanım durumu vardır:

### 1. Evrensel girişler {#universal-dapp-logins}

Merkeziyetsiz kimlik, parola tabanlı girişleri merkeziyetsiz kimlik doğrulama ile değiştirmeye yardımcı olabilir. Hizmet sağlayıcılar, kullanıcılara bir Ethereum cüzdanında saklanabilecek onaylar ihraç edebilir. Örnek bir onay, sahibine çevrim içi bir topluluğa erişim izni veren bir [NFT](/glossary/#nft) olabilir.

Bir [Ethereum ile Giriş Yap (SIWE)](https://siwe.xyz/) işlevi, sunucuların kullanıcının Ethereum hesabını onaylamasını ve gerekli onayı hesap adresinden almasını sağlar. Bu, kullanıcıların uzun parolaları ezberlemek zorunda kalmadan platformlara ve web sitelerine erişebileceği anlamına gelir ve kullanıcılar için çevrim içi deneyimi iyileştirir.

### 2. KYC kimlik doğrulaması {#kyc-authentication}

Birçok çevrim içi hizmeti kullanmak, bireylerin ehliyet veya ulusal pasaport gibi onaylar ve kimlik bilgileri sağlamasını gerektirir. Ancak bu yaklaşım sorunludur çünkü özel kullanıcı bilgileri tehlikeye girebilir ve hizmet sağlayıcılar onayın gerçekliğini doğrulayamaz.

Merkeziyetsiz kimlik, şirketlerin geleneksel [Müşterini Tanı (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) süreçlerini atlamasına ve doğrulanabilir kimlik bilgileri aracılığıyla kullanıcı kimliklerini doğrulamasına olanak tanır. Bu, kimlik yönetimi maliyetini azaltır ve sahte belge kullanımını önler.

### 3. Oy kullanma ve çevrim içi topluluklar {#voting-and-online-communities}

Çevrim içi oylama ve sosyal medya, merkeziyetsiz kimlik için iki yeni uygulamadır. Çevrim içi oylama planları, özellikle kötü niyetli aktörlerin oy kullanmak için sahte kimlikler oluşturması durumunda manipülasyona açıktır. Bireylerden zincir içi onaylar sunmalarını istemek, çevrim içi oylama süreçlerinin bütünlüğünü artırabilir.

Merkeziyetsiz kimlik, sahte hesaplardan arınmış çevrim içi topluluklar oluşturmaya yardımcı olabilir. Örneğin, her kullanıcının Ethereum Name Service gibi zincir içi bir kimlik sistemi kullanarak kimliğini doğrulaması gerekebilir, bu da bot olasılığını azaltır.

### 4. Sybil karşıtı koruma {#sybil-protection}

[Kuadratik oylama](/glossary/#quadratic-voting) kullanan hibe veren uygulamalar [Sybil saldırılarına](/glossary/#sybil-attack) karşı savunmasızdır çünkü daha fazla birey oy verdiğinde bir hibenin değeri artar ve bu da kullanıcıları katkılarını birçok kimliğe bölmeye teşvik eder. Merkeziyetsiz kimlikler, genellikle belirli özel bilgileri ifşa etmek zorunda kalmadan, her katılımcının gerçekten insan olduğunu kanıtlama yükünü artırarak bunu önlemeye yardımcı olur.

### 5. Ulusal ve Hükümet Kimliği {#national-and-government-id}

Hükümetler, çevrim içi kimlik doğrulamasında dolandırıcılığı ve sahteciliği azaltmak için güçlü kriptografik gerçeklik garantileri sağlayarak, ulusal kimlikler, pasaportlar veya ehliyetler gibi temel kimlik belgelerini Ethereum üzerinde doğrulanabilir kimlik bilgileri olarak ihraç etmek için merkeziyetsiz kimlik ilkelerini kullanabilir. Vatandaşlar bu onayları kişisel [cüzdanlarında](/wallets/) saklayabilir ve kimliklerini, yaşlarını veya oy kullanma haklarını kanıtlamak için kullanabilirler.

Bu model, özellikle [sıfır bilgi ispatı (ZKP)](/zero-knowledge-proofs/) gizlilik teknolojisi ile birleştirildiğinde seçici ifşaya olanak tanır. Örneğin, bir vatandaş, kesin doğum tarihini açıklamadan yaş kısıtlaması olan bir hizmete erişmek için 18 yaşından büyük olduğunu kriptografik olarak kanıtlayabilir ve geleneksel bir kimlikten daha fazla gizlilik sunar.

#### 💡Vaka çalışması: Ethereum üzerinde Bhutan Ulusal Dijital Kimliği (NDI) {#case-study-bhutan-ndi}

- Bhutan'ın yaklaşık 800.000 vatandaşı için doğrulanabilir kimlik bilgilerine erişim sağlar
- Ekim 2025'te Polygon ağından [Ethereum Ana Ağına](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878) taşındı
- Mart 2025 itibarıyla [234.000'den fazla dijital kimlik](https://www.blockchain-council.org/blockchain/bhutan-uses-blockchain-in-digital-id-project/) ihraç edildi

Bhutan Krallığı, [Ulusal Dijital Kimlik (NDI) sistemini](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878) Ekim 2025'te Ethereum'a taşıdı. Merkeziyetsiz kimlik ve kendi kendine egemen kimlik ilkeleri üzerine inşa edilen Bhutan'ın NDI sistemi, dijital olarak imzalanmış kimlik bilgilerini doğrudan bir vatandaşın kişisel cüzdanına ihraç etmek için merkeziyetsiz tanımlayıcılar ve doğrulanabilir kimlik bilgileri kullanır. Bu kimlik bilgilerinin ihraççı şemalarını Ethereum'a sabitleyerek sistem, bunların gerçek, kurcalamaya karşı korumalı olmasını ve merkezi bir otoriteyi sorgulamadan herhangi bir tarafça doğrulanabilmesini sağlar.

## Onaylar nelerdir? {#what-are-attestations}

Onay, bir varlığın başka bir varlık hakkında yaptığı bir taleptir. Amerika Birleşik Devletleri'nde yaşıyorsanız, Motorlu Taşıtlar Departmanı (bir varlık) tarafından size verilen ehliyet, yasal olarak araba kullanmanıza izin verildiğini (başka bir varlık) onaylar.

Onaylar tanımlayıcılardan farklıdır. Bir onay, belirli bir kimliğe atıfta bulunmak için tanımlayıcılar _içerir_ ve bu kimlikle ilgili bir nitelik hakkında bir talepte bulunur. Yani, ehliyetinizin tanımlayıcıları (isim, doğum tarihi, adres) vardır ancak aynı zamanda yasal araç kullanma hakkınızla ilgili bir onaydır.

### Merkeziyetsiz tanımlayıcılar nelerdir? {#what-are-decentralized-identifiers}

Yasal adınız veya e-posta adresiniz gibi geleneksel tanımlayıcılar üçüncü taraflara (hükümetler ve e-posta sağlayıcıları) dayanır. Merkeziyetsiz tanımlayıcılar (DID'ler) farklıdır; herhangi bir merkezi varlık tarafından ihraç edilmez, yönetilmez veya kontrol edilmezler.

Merkeziyetsiz tanımlayıcılar bireyler tarafından ihraç edilir, tutulur ve kontrol edilir. Bir [Ethereum hesabı](/glossary/#account), merkeziyetsiz bir tanımlayıcı örneğidir. Kimseden izin almadan ve bunları merkezi bir kayıt defterinde saklamaya gerek duymadan istediğiniz kadar hesap oluşturabilirsiniz.

Merkeziyetsiz tanımlayıcılar dağıtık defterlerde ([blokzincirler](/glossary/#blockchain)) veya [eşler arası ağlarda](/glossary/#peer-to-peer-network) saklanır. Bu, DID'leri [küresel olarak benzersiz, yüksek kullanılabilirlikle çözümlenebilir ve kriptografik olarak doğrulanabilir](https://w3c-ccg.github.io/did-primer/) hale getirir. Merkeziyetsiz bir tanımlayıcı, insanlar, kuruluşlar veya devlet kurumları dahil olmak üzere farklı varlıklarla ilişkilendirilebilir.

## Merkeziyetsiz tanımlayıcıları mümkün kılan nedir? {#what-makes-decentralized-identifiers-possible}

### 1. Açık Anahtar Kriptografisi {#public-key-cryptography}

Açık anahtar kriptografisi, bir varlık için bir [açık anahtar](/glossary/#public-key) ve [özel anahtar](/glossary/#private-key) üreten bir bilgi güvenliği önlemidir. Açık anahtar [kriptografisi](/glossary/#cryptography), blokzincir ağlarında kullanıcı kimliklerini doğrulamak ve dijital varlıkların sahipliğini kanıtlamak için kullanılır.

Ethereum hesabı gibi bazı merkeziyetsiz tanımlayıcıların açık ve özel anahtarları vardır. Açık anahtar, hesabın denetleyicisini tanımlarken, özel anahtarlar bu hesap için mesajları imzalayabilir ve şifresini çözebilir. Açık anahtar kriptografisi, tüm talepleri doğrulamak için [kriptografik imzalar](https://andersbrownworth.com/blockchain/public-private-keys/) kullanarak varlıkların kimliğini doğrulamak ve kimliğe bürünmeyi ve sahte kimliklerin kullanımını önlemek için gereken kanıtları sağlar.

### 2. Merkeziyetsiz veri depoları {#decentralized-datastores}

Bir blokzincir, doğrulanabilir bir veri kayıt defteri olarak hizmet eder: açık, güven gerektirmeyen ve merkeziyetsiz bir bilgi deposu. Herkese açık blokzincirlerin varlığı, tanımlayıcıları merkezi kayıt defterlerinde saklama ihtiyacını ortadan kaldırır.

Herhangi birinin merkeziyetsiz bir tanımlayıcının geçerliliğini onaylaması gerekirse, blokzincirdeki ilişkili açık anahtarı arayabilir. Bu, kimlik doğrulaması için üçüncü taraflara ihtiyaç duyan geleneksel tanımlayıcılardan farklıdır.

## Merkeziyetsiz tanımlayıcılar ve onaylar merkeziyetsiz kimliği nasıl sağlar? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

Merkeziyetsiz kimlik, kimlikle ilgili bilgilerin kendi kendini kontrol eden, özel ve taşınabilir olması gerektiği fikridir ve merkeziyetsiz tanımlayıcılar ve onaylar birincil yapı taşlarıdır.

Merkeziyetsiz kimlik bağlamında, onaylar (aynı zamanda [Doğrulanabilir Kimlik Bilgileri](https://www.w3.org/TR/vc-data-model/) olarak da bilinir), ihraççı tarafından yapılan kurcalamaya karşı korumalı, kriptografik olarak doğrulanabilir taleplerdir. Bir varlığın (ör. bir kuruluş) ihraç ettiği her onay veya Doğrulanabilir Kimlik Bilgisi, kendi DID'si ile ilişkilendirilir.

DID'ler blokzincirde saklandığından, herkes ihraççının DID'sini Ethereum üzerinde çapraz kontrol ederek bir onayın geçerliliğini doğrulayabilir. Temel olarak, Ethereum blokzinciri, belirli varlıklarla ilişkili DID'lerin doğrulanmasını sağlayan küresel bir dizin gibi davranır.

Merkeziyetsiz tanımlayıcılar, onayların kendi kendini kontrol etmesinin ve doğrulanabilir olmasının nedenidir. İhraççı artık mevcut olmasa bile, sahip her zaman onayın kaynağının ve geçerliliğinin kanıtına sahiptir.

Merkeziyetsiz tanımlayıcılar, merkeziyetsiz kimlik aracılığıyla kişisel bilgilerin gizliliğini korumak için de çok önemlidir. Örneğin, bir birey bir onayın kanıtını (ehliyet) sunarsa, doğrulayan tarafın kanıttaki bilgilerin geçerliliğini kontrol etmesi gerekmez. Bunun yerine, doğrulayıcının kanıtın geçerli olup olmadığını belirlemek için yalnızca onayın gerçekliğinin ve ihraç eden kuruluşun kimliğinin kriptografik garantilerine ihtiyacı vardır.

## Merkeziyetsiz kimlikte onay türleri {#types-of-attestations-in-decentralized-identity}

Ethereum tabanlı bir kimlik ekosisteminde onay bilgilerinin nasıl saklandığı ve alındığı, geleneksel kimlik yönetiminden farklıdır. Merkeziyetsiz kimlik sistemlerinde onayları ihraç etme, saklama ve doğrulama konusundaki çeşitli yaklaşımlara genel bir bakış:

### Zincir dışı onaylar {#offchain-attestations}

Onayları zincir içi saklamayla ilgili bir endişe, bireylerin gizli tutmak istedikleri bilgileri içerebilmeleridir. Ethereum blokzincirinin halka açık doğası, bu tür onayları saklamayı cazip olmaktan çıkarır.

Çözüm, kullanıcılar tarafından dijital cüzdanlarda zincir dışı tutulan, ancak ihraççının zincir içi saklanan DID'si ile imzalanmış onaylar ihraç etmektir. Bu onaylar [JSON Web Token'ları](https://en.wikipedia.org/wiki/JSON_Web_Token) olarak kodlanır ve ihraççının dijital imzasını içerir; bu da zincir dışı taleplerin kolayca doğrulanmasını sağlar.

Zincir dışı onayları açıklamak için varsayımsal bir senaryo:

1. Bir üniversite (ihraççı) bir onay (dijital bir akademik sertifika) oluşturur, anahtarlarıyla imzalar ve bunu Bob'a (kimlik sahibi) ihraç eder.

2. Bob bir işe başvurur ve akademik niteliklerini bir işverene kanıtlamak ister, bu nedenle onayı mobil cüzdanından paylaşır. Şirket (doğrulayıcı) daha sonra ihraççının DID'sini (yani Ethereum'daki açık anahtarını) kontrol ederek onayın geçerliliğini onaylayabilir.

### Kalıcı erişime sahip zincir dışı onaylar {#offchain-attestations-with-persistent-access}

Bu düzenleme kapsamında onaylar JSON dosyalarına dönüştürülür ve zincir dışı (ideal olarak IPFS veya Swarm gibi [merkeziyetsiz bir bulut depolama](/developers/docs/storage/) platformunda) saklanır. Ancak, JSON dosyasının bir [hash'i](/glossary/#hash) zincir içi saklanır ve zincir içi bir kayıt defteri aracılığıyla bir DID'ye bağlanır. İlişkili DID, onayı ihraç edenin veya alıcının DID'si olabilir.

Bu yaklaşım, talep bilgilerini şifrelenmiş ve doğrulanabilir tutarken onayların blokzincir tabanlı kalıcılık kazanmasını sağlar. Ayrıca, özel anahtarın sahibi bilgilerin şifresini çözebildiği için seçici ifşaya da olanak tanır.

### Zincir içi onaylar {#onchain-attestations}

Zincir içi onaylar, Ethereum blokzincirindeki [akıllı sözleşmelerde](/glossary/#smart-contract) tutulur. Akıllı sözleşme (bir kayıt defteri görevi görerek) bir onayı karşılık gelen bir zincir içi merkeziyetsiz tanımlayıcıyla (bir açık anahtar) eşleştirir.

Zincir içi onayların pratikte nasıl çalışabileceğini gösteren bir örnek:

1. Bir şirket (XYZ Corp), akıllı bir sözleşme kullanarak mülkiyet hisseleri satmayı planlıyor ancak yalnızca geçmiş kontrolünü tamamlamış alıcılar istiyor.

2. XYZ Corp, Ethereum üzerinde zincir içi onaylar ihraç etmek için geçmiş kontrolleri yapan şirketi görevlendirebilir. Bu onay, bir bireyin herhangi bir kişisel bilgiyi ifşa etmeden geçmiş kontrolünden geçtiğini onaylar.

3. Hisse satan akıllı sözleşme, taranan alıcıların kimlikleri için kayıt sözleşmesini kontrol edebilir ve bu da akıllı sözleşmenin kimin hisse satın almasına izin verilip verilmediğini belirlemesini mümkün kılar.

### Soulbound token'lar ve kimlik {#soulbound}

[Soulbound token'lar](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) ([devredilemez NFT'ler](/glossary/#nft)), belirli bir cüzdana özgü bilgileri toplamak için kullanılabilir. Bu, başarıları (ör. belirli bir çevrim içi kursu bitirmek veya bir oyunda eşik puanını geçmek) veya topluluk katılımını temsil eden token'ları içerebilecek belirli bir Ethereum adresine bağlı benzersiz bir zincir içi kimlik oluşturur.

## Merkeziyetsiz kimliği kullanın {#use-decentralized-identity}

Merkeziyetsiz kimlik çözümleri için Ethereum'u temel alan birçok iddialı proje var:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - _Ethereum cüzdan adresleri, içerik hash'leri ve meta veriler gibi zincir içi, makine tarafından okunabilir tanımlayıcılar için merkeziyetsiz bir isimlendirme sistemi._
- **[Ethereum ile Giriş Yap (SIWE)](https://siwe.xyz/)** - _Ethereum hesaplarıyla kimlik doğrulama için açık standart._
- **[SpruceID](https://www.spruceid.com/)** - _Kullanıcıların üçüncü taraf hizmetlere güvenmek yerine Ethereum hesapları ve ENS profilleriyle dijital kimliği kontrol etmelerini sağlayan merkeziyetsiz bir kimlik projesi._
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - _Herhangi bir şey hakkında zincir içi veya zincir dışı onaylar yapmak için merkeziyetsiz bir defter/protokol._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (veya PoH), Ethereum üzerine inşa edilmiş bir sosyal kimlik doğrulama sistemidir._
- **[Veramo](https://veramo.io/)** - _Herkesin uygulamalarında kriptografik olarak doğrulanabilir verileri kullanmasını kolaylaştıran bir JavaScript çerçevesi._

## Daha fazla bilgi {#further-reading}

### Makaleler {#articles}

- [Blokzincir Kullanım Durumları: Dijital Kimlikte Blokzincir](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [Ethereum ERC-725 Nedir? Blokzincirde Kendi Kendine Egemen Kimlik Yönetimi](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [Blokzincir Dijital Kimlik Sorununu Nasıl Çözebilir?](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [Merkeziyetsiz Kimlik Nedir ve Neden Önemsemelisiniz?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [Merkeziyetsiz Kimliğe Giriş](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### Videolar {#videos}

- [Merkeziyetsiz Kimlik (Bonus Canlı Yayın Oturumu)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Andreas Antonopolous'tan merkeziyetsiz kimlik üzerine harika bir açıklayıcı video_
- [Ceramic, IDX, React ve 3ID Connect ile Ethereum ile Giriş Yap ve Merkeziyetsiz Kimlik](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Nader Dabit'ten bir kullanıcının Ethereum cüzdanını kullanarak profilini oluşturmak, okumak ve güncellemek için bir kimlik yönetim sistemi oluşturma üzerine YouTube eğitimi_
- [BrightID - Ethereum'da Merkeziyetsiz Kimlik](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Ethereum için merkeziyetsiz bir kimlik çözümü olan BrightID'yi tartışan Bankless podcast bölümü_
- [Zincir Dışı İnternet: Merkeziyetsiz Kimlik ve Doğrulanabilir Kimlik Bilgileri](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Evin McMullen'in EthDenver 2022 sunumu
- [Doğrulanabilir Kimlik Bilgileri Açıklandı](https://www.youtube.com/watch?v=ce1IdSr-Kig) - Tamino Baumann'dan demolu YouTube açıklayıcı videosu

### Topluluklar {#communities}

- [GitHub'da ERC-725 İttifakı](https://github.com/erc725alliance) — _Ethereum blokzincirinde kimliği yönetmek için ERC-725 standardının destekçileri_
- [EthID Discord sunucusu](https://discord.com/invite/ZUyG3mSXFD) — _Ethereum ile Giriş Yap ve Ethereum Follow Protocol üzerinde çalışan meraklılar ve geliştiriciler için topluluk_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Uygulamalar için doğrulanabilir veriler için bir çerçeve oluşturmaya katkıda bulunan geliştiriciler topluluğu_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _Çeşitli sektörlerde merkeziyetsiz kimlik kullanım durumları üzerinde çalışan geliştiriciler ve kurucular topluluğu_