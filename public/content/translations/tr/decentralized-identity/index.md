---
title: Merkeziyetsiz kimlik
description: "Merkeziyetsiz kimlik nedir ve neden önemlidir?"
lang: tr
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: "Geleneksel kimlik sistemleri tanımlayıcılarınızın belirlenmesini, korunmasını ve kontrolünü merkezleştirdi."
summaryPoint2: "Merkeziyetsiz kimlik, merkezi üçüncü taraflara olan bağımlılığı ortadan kaldırır."
summaryPoint3: "Kripto sayesinde, kullanıcılar artık kendi tanımlayıcılarını ve onaylarını yayınlama, tutma ve kontrol etme araçlarına bir kez daha sahipler."
---

Kimlik, bugün hayatınızın neredeyse her yönünün temelini oluşturuyor. Çevrimiçi hizmetleri kullanmak, bir banka hesabı açmak, seçimlerde oy kullanmak, mülk satın almak, istihdam sağlamak - bunların tümü kimliğinizi kanıtlamayı gerektirir.

Ancak, geleneksel kimlik yönetim sistemleri uzun süredir tanımlayıcılarınızı ve [tasdiklerinizi](/glossary/#attestation) düzenleyen, tutan ve kontrol eden merkezi aracılara dayanmaktadır. Bu, kimlikle ilgili bilgilerinizi kontrol edemeyeceğiniz veya kişisel olarak tanımlanabilir bilgilere (PII) kimin erişebileceğine ve bu tarafların ne kadar erişime sahip olduğuna karar veremeyeceğiniz anlamına gelir.

Bu sorunları çözmek için Ethereum gibi halka açık blok zincirler üzerine inşa edilmiş merkeziyetsiz kimlik sistemlerimiz var. Merkeziyetsiz kimlik, bireylerin kimlikle ilgili bilgilerini yönetmelerine olanak tanır. Merkeziyetsiz kimlik çözümleriyle _siz_, hizmet sağlayıcılar veya hükümetler gibi merkezi otoritelere güvenmeden tanımlayıcılar oluşturabilir, tasdiklerinizi talep edebilir ve tutabilirsiniz.

## Kimlik nedir? {#what-is-identity}

Kimlik, bir bireyin benzersiz özelliklerle tanımlanan benlik duygusu anlamına gelir. Kimlik, bir _birey_ olma, yani ayrı bir insan varlığı olma durumunu ifade eder. Kimlik ayrıca bir kuruluş veya otorite gibi diğer insan dışı varlıklara da atıfta bulunabilir.

<YouTube id="Ew-_F-OtDFI" />

## Tanımlayıcılar nedir? {#what-are-identifiers}

Tanımlayıcı, belirli bir kimliğe veya kimliklere işaret etme işlevi gören bir bilgi parçasıdır. Yaygın tanımlayıcılar şunlardır:

- İsim
- Sosyal güvenlik numarası/vergi numarası
- Cep telefonu numarası
- Doğum tarihi ve yeri
- Dijital kimlik bilgileri, ör. e-posta adresleri, kullanıcı adları, avatarlar

Bu geleneksel tanımlayıcı örnekleri merkezi kuruluşlar tarafından düzenlenir, tutulur ve kontrol edilir. İsminizi değiştirmek için devletinizden veya kullanıcı adınızı değiştirmek için bir sosyal medya platformundan izin almanız gerekir.

## Merkeziyetsiz kimliğin faydaları {#benefits-of-decentralized-identity}

1. Merkeziyetsiz kimlik, tanımlayıcı bilgilerin bireysel kontrolünü arttırır. Merkeziyetsiz tanımlayıcılar ve tasdikler, merkezi otoritelere veya üçüncü taraflara ihtiyaç duymadan doğrulanabilir.

2. Merkeziyetsiz kimlik çözümleri, kullanıcı kimliğini doğrulamak ve yönetmek için güven gerektirmeyen, sorunsuz ve gizliliği koruyan bir yöntem sunar.

3. Merkeziyetsiz kimlik, blok zincir teknolojisinden yararlanır, bu farklı taraflar arasında güven yaratır ve tasdiklerin geçerliliğini kanıtlayan kriptografik garantiler sağlar.

4. Merkeziyetsiz kimlik, kimlik verilerini taşınabilir kılar. Kullanıcılar tasdikleri ve tanımlayıcıları mobil cüzdanlarında depolayıp istedikleri herhangi bir tarafla paylaşabilirler. Merkeziyetsiz tanımlayıcılar ve tasdikler, veren kuruluşların veritabanında kilitli değildir.

5. Merkeziyetsiz kimlik, bireylerin sahip oldukları veya yaptıkları bir şeyin ne olduğunu açıklamadan kanıtlamalarını sağlayacak olan, gelişmekte olan [sıfır bilgi](/glossary/#zk-proof) teknolojileriyle iyi çalışmalıdır. Bu oylama benzeri uygulamalar için güven ve gizliliği birleştirmenin güçlü bir yolu olabilir.

6. Merkeziyetsiz kimlik, bir insanın bir sistemi kandırmak veya spamlamak için birden fazla insan gibi davrandığını tespit etmek üzere [anti-Sybil](/glossary/#anti-sybil) mekanizmalarını etkinleştirir.

## Merkeziyetsiz kimlik kullanım örnekleri {#decentralized-identity-use-cases}

Merkeziyetsiz kimliğin birçok potansiyel kullanım örneği vardır:

### 1. Evrensel girişler {#universal-dapp-logins}

Merkeziyetsiz kimlik, şifre bazlı giriş yöntemlerinin merkeziyetsiz doğrulama ile değiştirilmesine yardımcı olabilir. Hizmet sağlayıcılar, kullanıcılara tasdik verebilir, bu tasdikler bir Ethereum cüzdanında saklanabilir. Örnek bir tasdik, sahibine bir çevrimiçi topluluğa erişim sağlayan bir [NFT](/glossary/#nft) olabilir.

Bir [Ethereum ile Oturum Açma](https://siwe.xyz/) işlevi daha sonra sunucuların kullanıcının Ethereum hesabını onaylamasını ve hesap adreslerinden gerekli tasdiği almasını sağlar. Bu, kullanıcıların uzun şifreleri ezberlemek zorunda kalmadan platformlara ve web sitelerine erişebileceği ve kullanıcılar için çevrimiçi deneyimi iyileştirebileceği anlamına gelir.

### 2. KYC kimlik doğrulaması {#kyc-authentication}

Birçok çevrimiçi hizmeti kullanmak, bireylerin ehliyet veya ulusal pasaport gibi tasdik ve kimlik bilgilerini sağlamasını gerektirir. Ancak bu yaklaşım sorunludur çünkü özel kullanıcı bilgilerinin güvenliği ihlal edilebilir ve hizmet sağlayıcılar tasdiğin gerçekliğini doğrulayamaz.

Merkeziyetsiz kimlik, şirketlerin geleneksel [Müşterini Tanı (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) süreçlerini atlamasına ve Doğrulanabilir Kimlik Bilgileri aracılığıyla kullanıcı kimliklerini doğrulamasına olanak tanır. Bu, kimlik yönetimi maliyetini düşürür ve sahte dokümanların kullanılmasını önler.

### 3. Oylama ve çevrimiçi topluluklar {#voting-and-online-communities}

Çevrimiçi oylama ve sosyal medya, merkeziyetsiz kimlik için iki yeni uygulamadır. Çevrimiçi oylama düzenleri, özellikle kötü niyetli aktörler oy vermek için sahte kimlikler oluşturursa manipülasyona açıktır. Bireylerden zincir üstü tasdikler sunmalarını istemek, çevrimiçi oylama süreçlerinin bütünlüğünü artırabilir.

Merkeziyetsiz kimlik, sahte hesaplardan arınmış çevrimiçi topluluklar oluşturmaya yardımcı olabilir. Örneğin, her kullanıcının kimliğini Ethereum İsim Hizmeti gibi zincir üstü bir kimlik sistemi kullanarak doğrulaması gerekebilir, bu da bot olasılığını azaltır.

### 4. Anti-Sybil koruması {#sybil-protection}

[Karesel oylama](/glossary/#quadratic-voting) kullanan hibe veren uygulamalar, [Sybil saldırılarına](/glossary/#sybil-attack) karşı savunmasızdır, çünkü bir hibenin değeri daha fazla kişi oy verdiğinde artar ve bu durum kullanıcıları katkılarını birçok kimliğe bölmeye teşvik eder. Merkeziyetsiz kimlikler, her katılımcının gerçekten insan olduğunu kanıtlama yükünü kaldırarak bunu önlemeye yardımcı olur ve bunu genelde özel bilgileri açığa çıkarmaya gerek duymadan yaparlar.

### 5. Ulusal ve Hükümet Kimliği {#national-and-government-id}

Hükümetler, çevrimiçi kimlik doğrulamasında sahtekarlığı ve kalpazanlığı azaltmak için güçlü kriptografik özgünlük garantileri sağlayarak, ulusal kimlikler, pasaportlar veya ehliyetler gibi temel kimlik belgelerini Ethereum üzerinde doğrulanabilir kimlik bilgileri olarak yayınlamak için merkeziyetsiz kimlik ilkelerini kullanabilirler. Vatandaşlar bu tasdikleri kişisel [cüzdanlarında](/wallets/) saklayabilir ve bunları kimliklerini, yaşlarını veya oy kullanma haklarını kanıtlamak için kullanabilirler.

Bu model, özellikle [sıfır bilgili ispat (ZKP)](/zero-knowledge-proofs/) gizlilik teknolojisi ile birleştirildiğinde seçici açıklamaya olanak tanır. Örneğin, bir vatandaş, yaş kısıtlamalı bir hizmete erişmek için tam doğum tarihini açıklamadan 18 yaşından büyük olduğunu kriptografik olarak kanıtlayabilir, bu da geleneksel bir kimliğe göre daha fazla gizlilik sunar.

#### 💡Vaka çalışması: Ethereum üzerinde Butan Ulusal Dijital Kimliği (NDI) {#case-study-bhutan-ndi}

- Butan'ın yaklaşık 800.000 vatandaşı için doğrulanabilir kimlik bilgilerine erişim sağlar
- Ekim 2025'te Polygon ağından [Ethereum ana ağına](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878) taşındı
- Mart 2025 itibarıyla [234.000'den fazla dijital kimlik](https://www.blockchain-council.org/blockchain/bhutan-uses-blockchain-in-digital-id-project/) düzenlendi

Butan Krallığı, [Ulusal Dijital Kimlik (NDI) sistemini](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878) Ekim 2025'te Ethereum'a taşıdı. Merkeziyetsiz kimlik ve kendi kendine egemen kimlik ilkeleri üzerine inşa edilen Butan'ın NDI sistemi, dijital olarak imzalanmış kimlik bilgilerini doğrudan bir vatandaşın kişisel cüzdanına vermek için merkeziyetsiz tanımlayıcılar ve doğrulanabilir kimlik bilgileri kullanır. Bu kimlik bilgilerinin kriptografik kanıtlarını Ethereum'a sabitleyerek, sistem bunların özgün, kurcalamaya karşı korumalı ve merkezi bir otoriteyi sorgulamadan herhangi bir tarafça doğrulanabilir olmasını sağlar.

Sistemin mimarisi, [sıfır bilgili ispat (ZKP)](/zero-knowledge-proofs/) teknolojisinin kullanımı yoluyla gizliliği vurgular. Bu "seçici açıklama" uygulaması, vatandaşların tam kimlik numaraları veya doğum tarihleri gibi temel kişisel verileri açıklamadan hizmetlere erişmek için belirli gerçekleri (ör. "18 yaşından büyüğüm" veya "Ben bir vatandaşım") kanıtlamalarına olanak tanır. Bu, güvenli, kullanıcı merkezli ve gizliliği koruyan bir ulusal kimlik sistemi için Ethereum'un güçlü, gerçek dünya kullanımını göstermektedir.

#### 💡Vaka çalışması: Buenos Aires Şehri'nin Ethereum [Katman 2](/layer-2/) ZKSync Era üzerindeki QuarkID'si {#case-study-buenos-aires-quarkid}

- Lansman sırasında [3,6 milyondan fazla kullanıcıya](https://buenosaires.gob.ar/innovacionytransformaciondigital/miba-con-tecnologia-quarkid-la-ciudad-de-buenos-aires-incorporo) merkeziyetsiz kimlik bilgileri verildi
- QuarkID, BM Sürdürülebilir Kalkınma Hedefleri kapsamında bir [Dijital Kamu Malı](https://www.digitalpublicgoods.net/r/quarkid) olarak tanınan açık kaynaklı bir protokoldür
- Şehrin protokole sahip olmadığı, vatandaşlara tam veri sahipliği ve gizlilik sağlayan bir "[kullanıcı olarak hükümet](https://buenosaires.gob.ar/innovacionytransformaciondigital/miba-con-tecnologia-quarkid-la-ciudad-de-buenos-aires-incorporo)" modelini vurgular

2024'te, Buenos Aires Şehri Hükümeti (GCBA), GCBA'nın İnovasyon ve Dijital Dönüşüm Sekreterliği tarafından oluşturulan açık kaynaklı "dijital güven çerçevesi" olan QuarkID'yi, şehir sakinlerinin devlet hizmetlerine ve resmi belgelere erişmesi için şehrin resmi uygulaması olan miBA'ya entegre etti. Lansman sırasında, miBA'nın 3,6 milyondan fazla kullanıcısının tümüne, vatandaşlık belgeleri, doğum, evlilik ve ölüm sertifikaları, vergi kayıtları, aşı kayıtları ve daha fazlası dahil olmak üzere doğrulanabilir dijital belgeleri ve sertifikaları zincir üstünde yönetmelerine ve paylaşmalarına olanak tanıyan merkeziyetsiz dijital kimlikler verildi.

Ethereum [Katman 2](/layer-2/) ağı ZKSync Era üzerine inşa edilen QuarkID sistemi, vatandaşların gereksiz kişisel verileri açığa çıkarmadan mobil cihazları aracılığıyla kişisel kimlik bilgilerini eşler arası doğrulamalarına olanak sağlamak için ZKP teknolojisini kullanır. Program, GCBA'nın merkezi bir sahip olarak hareket etmek yerine açık kaynaklı, birlikte çalışabilir QuarkID protokolünün bir kullanıcısı olarak hareket ettiği bir "kullanıcı olarak hükümet" modelini vurgular. Bu ZKP özellikli mimari önemli bir gizlilik özelliği sunar: GCBA dahil hiçbir üçüncü taraf, bir vatandaşın kimlik bilgilerini nasıl, ne zaman veya neden kullandığını izleyemez. Bu başarılı program, vatandaşlara tamamen kendi kendine egemen kimlik ve hassas verileri üzerinde kontrol sağlar ve tümü Ethereum'un küresel olarak dağıtılmış ağı tarafından güvence altına alınır.

## Tasdik nedir? {#what-are-attestations}

Tasdik, bir kurum tarafından başka bir kurum hakkında bulunulan bir iddiadır. Amerika Birleşik Devletleri'nde yaşıyorsanız Motorlu Taşıtlar Dairesi (bir kurum) tarafından size verilen sürücü belgesi, sizin (başka bir kurum) yasal olarak araba kullanma iznine sahip olduğunuzu kanıtlar.

Tasdikler tanımlayıcılardan farklıdır. Bir tasdik, belirli bir kimliğe atıfta bulunmak için tanımlayıcılar _içerir_ ve bu kimlikle ilgili bir nitelik hakkında bir iddiada bulunur. Yani, ehliyetiniz tanımlayıcılara (isim, doğum tarihi, adres) sahiptir, ancak aynı zamanda yasal araç kullanma hakkınızla ilgili bir tasdiktir.

### Merkeziyetsiz tanımlayıcılar nelerdir? {#what-are-decentralized-identifiers}

Yasal isminiz, e-posta adresiniz gibi geleneksel tanımlayıcılar, üçüncü taraflara (hükümet veya e-posta servis sağlayıcılar) bağlıdır. Merkeziyetsiz tanımlayıcılar (MT'ler) farklıdır. Bunlar çıkarılmaz, yönetilmez veya merkezi bir kuruluş tarafından kontrol edilmez.

Merkeziyetsiz tanımlayıcılar bireyler tarafından çıkarılır, tutulur ve kontrol edilir. Bir [Ethereum hesabı](/glossary/#account), merkeziyetsiz bir tanımlayıcı örneğidir. Kimseden izin almadan veya merkezi bir depolamaya ihtiyaç duymadan istediğiniz kadar hesap oluşturabilirsiniz.

Merkeziyetsiz tanımlayıcılar, dağıtılmış defterlerde ([blokzincirler](/glossary/#blockchain)) veya [eşler arası ağlarda](/glossary/#peer-to-peer-network) depolanır. Bu, DID'leri [küresel olarak benzersiz, yüksek kullanılabilirlikle çözülebilir ve kriptografik olarak doğrulanabilir](https://w3c-ccg.github.io/did-primer/) kılar. Merkeziyetsiz bir tanımlayıcı; kişiler, kuruluşlar veya devlet kurumları dahil olmak üzere farklı varlıklarla ilişkilendirilebilir.

## Merkeziyetsiz tanımlayıcıları mümkün kılan nedir? {#what-makes-decentralized-identifiers-possible}

### 1. Açık Anahtar Kriptografisi {#public-key-cryptography}

Açık anahtar kriptografisi, bir varlık için bir [açık anahtar](/glossary/#public-key) ve bir [özel anahtar](/glossary/#private-key) üreten bir bilgi güvenliği önlemidir. Açık anahtar [kriptografisi](/glossary/#cryptography), blokzincir ağlarında kullanıcı kimliklerini doğrulamak ve dijital varlıkların mülkiyetini kanıtlamak için kullanılır.

Bazı merkeziyetsiz tanımlayıcıların, (Ethereum hesabı gibi) açık ve özel anahtarları vardır. Açık anahtar hesabın yöneticisini tanımlar, özel anahtarsa bu hesap için mesajları imzalayıp şifrelerini çözebilir. Açık anahtar kriptografisi, tüm iddiaları doğrulamak için [kriptografik imzalar](https://andersbrownworth.com/blockchain/public-private-keys/) kullanarak varlıkların kimliğini doğrulamak, kimliğe bürünmeyi ve sahte kimliklerin kullanımını önlemek için gereken kanıtları sağlar.

### 2. Merkeziyetsiz veri depoları {#decentralized-datastores}

Bir blok zincir açık, güvensiz (güvene ihtiyaç duymayan) ve merkeziyetsiz veri deposu olarak hizmet eder. Açık blok zincirlerin varlığı, tanımlayıcıların merkezi kayıtlarda tutulma ihtiyacını ortadan kaldırır.

Eğer bir merkeziyetsiz tanımlayıcının geçeriliğinin kontrol edilmesi gerekirse blok zincirde karşılığı olan açık anahtara bakılabilir. Bu üçüncü tarafların doğrulamalarının gerektiği geleneksel tanımlayıcılardan farklıdır.

## Merkeziyetsiz tanımlayıcılar ve tasdikler merkeziyetsiz kimliği nasıl mümkün kılar? Merkeziyetsiz tanımlayıcılar ve tasdikler, merkeziyetsiz kimliği nasıl mümkün kılar? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

Merkeziyetsiz kimlik, kimlikle ilgili bilgilerin kendi kendini kontrol eden, özel ve taşınabilir olması gerektiği, merkeziyetsiz tanımlayıcılar ve onayların birincil yapı taşları olduğu fikridir.

Merkeziyetsiz kimlik bağlamında tasdikler (aynı zamanda [Doğrulanabilir Kimlik Bilgileri](https://www.w3.org/TR/vc-data-model/) olarak da bilinir), düzenleyici tarafından yapılan, kurcalamaya karşı korumalı, kriptografik olarak doğrulanabilir iddialardır. Bir varlığın (ör. bir kuruluş) verdiği her onay veya Doğrulanabilir Kimlik Bilgisi, MT'leriyle ilişkilendirilir.

MT'ler blok zincirde depolandığından herkes, verenin Ethereum'daki MT'sini çapraz kontrol ederek bir tasdikin geçerliliğini doğrulayabilir. Esasen, Ethereum blok zinciri, belirli varlıklarla ilişkili MT'lerin doğrulanmasını sağlayan küresel bir dizin gibi davranır.

Merkeziyetsiz tanımlayıcılar, tasdiklerin kendi kendini kontrol etmesinin ve doğrulanabilir olmasının nedenidir. Düzenleyen artık mevcut olmasa bile, hamil her zaman tasdikin kaynağına ve geçerliliğine dair kanıta sahiptir.

Merkeziyetsiz tanımlayıcılar, merkeziyetsiz kimlik aracılığıyla kişisel bilgilerin gizliliğini korumak için de çok önemlidir. Örneğin, bir kişi bir tasdik belgesi (sürücü belgesi) sunarsa doğrulayan tarafın kanıttaki bilgilerin geçerliliğini kontrol etmesine gerek yoktur. Bunun yerine doğrulayıcı, kanıtın geçerli olup olmadığını belirlemek için yalnızca tasdikin gerçekliğine ve veren kuruluşun kimliğine ilişkin kriptografik garantilere ihtiyaç duyar.

## Merkeziyetsiz kimlikte tasdik türleri {#types-of-attestations-in-decentralized-identity}

Tasdik bilgilerinin Ethereum tabanlı bir kimlik ekosisteminde nasıl depolandığı ve alındığı, geleneksel kimlik yönetiminden farklıdır. Burada, merkeziyetsiz kimlik sistemlerinde tasdiklerin yayınlanması, saklanması ve doğrulanmasına yönelik çeşitli yaklaşımlara genel bir bakış sunulmaktadır:

### Zincir dışı tasdikler {#offchain-attestations}

Tasdikleri zincir üstünde saklamayla ilgili bir endişe, bireylerin gizli tutmak isteyebileceği bilgileri içerebilmeleridir. Ethereum blok zincirinin açık doğası bu gibi tasdiklerin depolanmasını tercih edilmez hale getirmektedir.

Çözüm, kullanıcılar tarafından zincir dışında dijital cüzdanlarda tutulan, ancak düzenleyicinin zincir üstünde saklanan DID'si ile imzalanan tasdikler yayınlamaktır. Bu tasdikler [JSON Web Token'ları](https://en.wikipedia.org/wiki/JSON_Web_Token) olarak kodlanır ve düzenleyicinin dijital imzasını içerir; bu da zincir dışı iddiaların kolayca doğrulanmasını sağlar.

İşte zincir dışı tasdikleri açıklamak için varsayımsal bir senaryo:

1. Bir üniversite (çıkaran), bir tasdik (dijital akademik sertifika) oluşturur, anahtarları ile imzalar ve Bob'a (kimlik sahibine) verir.

2. Bob işe başvurur ve akademik niteliklerini işverene kanıtlamak ister ve mobil cüzdanındaki tasdiği paylaşır. Şirket (doğrulayan) tasdiğin geçerliliğini çıkaranın MT'sini (ör. Ethereum'daki açık anahtarını) kontrol ederek doğrulayabilir.

### Kalıcı erişime sahip zincir dışı tasdikler {#offchain-attestations-with-persistent-access}

Bu düzenleme kapsamında tasdikler JSON dosyalarına dönüştürülür ve zincir dışında (tercihen IPFS veya Swarm gibi [merkeziyetsiz bir bulut depolama](/developers/docs/storage/) platformunda) saklanır. Ancak, JSON dosyasının bir [karma](/glossary/#hash) değeri zincir üstünde depolanır ve zincir üstü bir kayıt aracılığıyla bir DID'ye bağlanır. Bağlantılı MT, tasdiğin çıkaranı veya alıcısı olabilir.

Bu yaklaşım tasdikleri şifreli ve doğrulanabilir kılarken blok zincir temelli kalıcılığını da sağlar. Ayrıca özel anahtarın sahibi bilginin şifresini açabilidiği için seçici gösterimi de mümkün kılar.

### Zincir üstü tasdikler {#onchain-attestations}

Zincir üstü tasdikler, Ethereum blokzincirindeki [akıllı sözleşmelerde](/glossary/#smart-contract) tutulur. Akıllı sözleşme (bir kayıt defteri gibi davranarak), bir tasdiği ilgili zincir üstü merkeziyetsiz tanımlayıcıyla (bir açık anahtar) eşler.

İşte zincir üstü tasdiklerin pratikte nasıl çalışabileceğini gösteren bir örnek:

1. Bir şirket (XYZ Şirketi) hisselerini akıllı sözleşme kullanarak satmayı planlıyor ama sadece sabıka kaydı yaptırmış alıcıların alabilmesini istiyor.

2. XYZ Corp, geçmiş kontrolleri yapan şirkete Ethereum üzerinde zincir üstü tasdikler yayınlatabilir. Bu tasdik bir kimsenin sabıka kaydı kontrolünden geçtiğini herhangi bir kişisel veri teşhir etmeden onaylar.

3. Akıllı sözleşme satan hisse senetleri, taranan alıcıların kimlikleri için sicil sözleşmesini kontrol edebilir ve akıllı sözleşmenin kimin hisse satın almasına izin verilip verilmediğini belirlemesini mümkün kılar.

### Soulbound token'lar ve kimlik {#soulbound}

[Soulbound token'lar](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) ([devredilemez NFT'ler](/glossary/#nft)), belirli bir cüzdana özgü bilgileri toplamak için kullanılabilir. Bu, başarıları (örneğin belirli bir çevrimiçi kursu bitirmek veya bir oyunda bir eşik puanını geçmek) veya topluluk katılımını temsil eden token'ları içerebilen belirli bir Ethereum adresine bağlı benzersiz bir zincir üstü kimliği etkili bir şekilde oluşturur.

## Merkeziyetsiz kimlik kullanın {#use-decentralized-identity}

Merkeziyetsiz kimlik çözümlerinin temeli olarak Ethereum'u kullanan çok sayıda iddialı proje vardır:

- **[Ethereum İsim Hizmeti (ENS)](https://ens.domains/)** - _Ethereum cüzdan adresleri, içerik karmaları ve meta veriler gibi zincir üstü, makine tarafından okunabilir tanımlayıcılar için merkeziyetsiz bir adlandırma sistemi._
- **[Ethereum ile Oturum Açma (SIWE)](https://siwe.xyz/)** - _Ethereum hesaplarıyla kimlik doğrulaması için açık standart._
- **[SpruceID](https://www.spruceid.com/)** - _Kullanıcıların üçüncü taraf hizmetlerine güvenmek yerine Ethereum hesapları ve ENS profilleri ile dijital kimliği kontrol etmelerini sağlayan merkeziyetsiz bir kimlik projesi._
- **[Ethereum Tasdik Hizmeti (EAS)](https://attest.org/)** - _Herhangi bir şey hakkında zincir üstü veya zincir dışı tasdiklerde bulunmak için merkeziyetsiz bir kayıt defteri/protokol._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (veya PoH), Ethereum üzerine kurulmuş bir sosyal kimlik doğrulama sistemidir._
- **[BrightID](https://www.brightid.org/)** - _Bir sosyal grafiğin oluşturulması ve analizi yoluyla kimlik doğrulamasını yeniden şekillendirmeyi amaçlayan merkeziyetsiz, açık kaynaklı bir sosyal kimlik ağı._
- **[walt.id](https://walt.id)** — _Geliştiricilerin ve kuruluşların kendi kendine egemen kimlikten ve NFT'lerden/SBT'lerden yararlanmasını sağlayan açık kaynaklı merkeziyetsiz kimlik ve cüzdan altyapısı._
- **[Veramo](https://veramo.io/)** - _Herkesin uygulamalarında kriptografik olarak doğrulanabilir verileri kullanmasını kolaylaştıran bir JavaScript çerçevesi._

## Daha fazla kaynak {#further-reading}

### Makaleler {#articles}

- [Blokzincir Kullanım Alanları: Dijital Kimlikte Blokzincir](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [What is Ethereum ERC725? [Blokzincirde Kendi Kendine Egemen Kimlik Yönetimi](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [Blokzincir Dijital Kimlik Sorununu Nasıl Çözebilir?](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [Merkeziyetsiz Kimlik Nedir ve Neden Önemsemelisiniz?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [Merkeziyetsiz Kimliğe Giriş](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### Videolar {#videos}

- [Merkeziyetsiz Kimlik (Bonus Canlı Yayın Oturumu)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Andreas Antonopoulos'tan merkeziyetsiz kimlik üzerine harika bir açıklayıcı video_
- [Ethereum ile Oturum Açma ve Ceramic, IDX, React ve 3ID Connect ile Merkeziyetsiz Kimlik](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Nader Dabit tarafından, bir kullanıcının profilini Ethereum cüzdanını kullanarak oluşturmak, okumak ve güncellemek için bir kimlik yönetim sistemi oluşturmaya yönelik YouTube eğitimi_
- [BrightID - Ethereum'da Merkeziyetsiz Kimlik](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Ethereum için merkeziyetsiz bir kimlik çözümü olan BrightID'yi ele alan Bankless podcast bölümü_
- [Zincir Dışı İnternet: Merkeziyetsiz Kimlik ve Doğrulanabilir Kimlik Bilgileri](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Evin McMullen tarafından EthDenver 2022 sunumu
- [Doğrulanabilir Kimlik Bilgilerinin Açıklaması](https://www.youtube.com/watch?v=ce1IdSr-Kig) - Tamino Baumann'ın demosunu içeren açıklayıcı YouTube videosu

### Topluluklar {#communities}

- [GitHub'da ERC-725 Alliance](https://github.com/erc725alliance) — _Ethereum blokzincirinde kimlik yönetimi için ERC725 standardının destekçileri_
- [EthID Discord sunucusu](https://discord.com/invite/ZUyG3mSXFD) — _Ethereum ile Oturum Açma ve Ethereum Takip Protokolü üzerinde çalışan meraklılar ve geliştiriciler için topluluk_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Uygulamalar için doğrulanabilir veriler için bir çerçeve oluşturmaya katkıda bulunan bir geliştirici topluluğu_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _Çeşitli sektörlerde merkeziyetsiz kimlik kullanım durumları üzerinde çalışan geliştiricilerden ve oluşturuculardan oluşan bir topluluk_
