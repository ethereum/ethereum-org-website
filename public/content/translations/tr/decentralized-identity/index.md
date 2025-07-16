---
title: Merkeziyetsiz kimlik
description: Merkeziyetsiz kimlik nedir ve neden önemlidir?
lang: tr
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: Geleneksel kimlik sistemleri, tanımlayıcılarınızın verilmesini, bakımını ve kontrolünü merkezileştirdi.
summaryPoint2: Merkeziyetsiz kimlik, merkezi üçüncü taraflara olan bağımlılığı ortadan kaldırır.
summaryPoint3: Kripto sayesinde, kullanıcılar artık kendi tanımlayıcılarını ve onaylarını yayınlama, tutma ve kontrol etme araçlarına bir kez daha sahipler.
---

Kimlik, bugün hayatınızın neredeyse her yönünün temelini oluşturuyor. Çevrimiçi hizmetleri kullanmak, bir banka hesabı açmak, seçimlerde oy kullanmak, mülk satın almak, istihdam sağlamak - bunların tümü kimliğinizi kanıtlamayı gerektirir.

Bununla birlikte, geleneksel kimlik yönetim sistemleri uzun süredir kimlik tanımlayıcılarınızı ve [tasdiklerinizi](/glossary/#attestation) düzenleyen, tutan ve kontrol eden merkezi aracıları kullanmaktadır. Bu, kimlikle ilgili bilgilerinizi kontrol edemeyeceğiniz veya kişisel olarak tanımlanabilir bilgilere (PII) kimin erişebileceğine ve bu tarafların ne kadar erişime sahip olduğuna karar veremeyeceğiniz anlamına gelir.

Bu sorunları çözmek için Ethereum gibi halka açık blok zincirler üzerine inşa edilmiş merkeziyetsiz kimlik sistemlerimiz var. Merkeziyetsiz kimlik, bireylerin kimlikle ilgili bilgilerini yönetmelerine olanak tanır. Merkeziyetsiz kimlik çözümleriyle, hizmet sağlayıcılar veya hükûmetler gibi merkezi yetkililere güvenmeden tanımlayıcılar oluşturabilir ve tasdiklerinizi _talep edebilir_ ve _tutabilirsiniz._

## Kimlik nedir? {#what-is-identity}

Kimlik, bir bireyin benzersiz özelliklerle tanımlanan benlik duygusu anlamına gelir. Kimlik, bir _birey_, yani ayrı bir insan varlığı anlamına gelir. Kimlik ayrıca bir kuruluş veya otorite gibi diğer insan dışı varlıklara da atıfta bulunabilir.

<YouTube id="Ew-_F-OtDFI" />

## Tanımlayıcılar nedir? {#what-are-identifiers}

Tanımlayıcı, belirli bir kimliğe veya kimliklere işaret etme işlevi gören bir bilgi parçasıdır. Yaygın tanımlayıcılar şunlardır:

- İsim
- Sosyal güvenlik numarası/vergi numarası
- Cep telefonu numarası
- Doğum tarihi ve yeri
- Dijital kimlik bilgileri, ör. e-posta adresleri, kullanıcı adları, avatarlar

Bu geleneksel tanımlayıcı örnekleri merkezi kuruluşlar tarafından düzenlenir, tutulur ve kontrol edilir. İsminizi değiştirmek için devletinizden veya kullanıcı adınızı değiştirmek için bir sosyal medya platformundan izin almanız gerekir.

## Merkeziyetsiz kimliğin avantajları {#benefits-of-decentralized-identity}

1. Merkeziyetsiz kimlik, tanımlayıcı bilgilerin bireysel kontrolünü arttırır. Merkeziyetsiz tanımlayıcılar ve tasdikler, merkezi otoritelere veya üçüncü taraflara ihtiyaç duymadan doğrulanabilir.

2. Merkeziyetsiz kimlik çözümleri güvene dayalı olmayan, sorunsuz ve kullanıcı kimliğini yönetirken ve doğrularken gizliliğini korumayı sağlar.

3. Merkeziyetsiz kimlik, blok zincir teknolojisinden yararlanır, bu farklı taraflar arasında güven yaratır ve tasdiklerin geçerliliğini kanıtlayan kriptografik garantiler sağlar.

4. Merkeziyetsiz kimlik, kimlik verilerini taşınabilir kılar. Kullanıcılar tasdikleri ve tanımlayıcıları mobil cüzdanlarında depolayıp istedikleri herhangi bir tarafla paylaşabilirler. Merkeziyetsiz tanımlayıcılar ve tasdikler, veren kuruluşların veritabanında kilitli değildir.

5. Merkeziyetsiz kimliklerin, bireylerin bir şeye sahip olduklarını veya o şeyin ne olduğunu açıklamadan bir şey yaptıklarını kanıtlamalarını sağlayacak yeni [sıfır bilgi](/glossary/#zk-proof) teknolojileri ile iyi çalışması beklenir. Bu oylama benzeri uygulamalar için güven ve gizliliği birleştirmenin güçlü bir yolu olabilir.

6. Merkeziyetsiz kimlik, bir insanın bir sistemi kandırmak veya spamlamak için birden fazla insan gibi davrandığını tespit etmeye yarayan [Sybil önleyici](/glossary/#anti-sybil) mekanizmaları mümkün kılar.

## Merkeziyetsiz kimlik kullanım örnekleri {#decentralized-identity-use-cases}

Merkeziyetsiz kimliğin birçok potansiyel kullanım örneği vardır:

### 1. Evrensel girişler {#universal-dapp-logins}

Merkeziyetsiz kimlik, şifre bazlı giriş yöntemlerinin merkeziyetsiz doğrulama ile değiştirilmesine yardımcı olabilir. Hizmet sağlayıcılar, kullanıcılara tasdik verebilir, bu tasdikler bir Ethereum cüzdanında saklanabilir. Bir tasdik örneği, sahibinin çevrimiçi topluluğa erişimini sağlayan bir [NFT](/glossary/#nft) olabilir.

[Ethereum ile Oturum Açma](https://login.xyz/) işlevi, sunucuların kullanıcının Ethereum hesabını onaylamasını ve hesap adreslerinden gerekli tasdiği almasına olanak tanır. Bu, kullanıcıların uzun şifreleri ezberlemek zorunda kalmadan platformlara ve web sitelerine erişebileceği ve kullanıcılar için çevrimiçi deneyimi iyileştirebileceği anlamına gelir.

### 2. KYC kimlik doğrulaması {#kyc-authentication}

Birçok çevrimiçi hizmeti kullanmak, bireylerin ehliyet veya ulusal pasaport gibi tasdik ve kimlik bilgilerini sağlamasını gerektirir. Ancak bu yaklaşım sorunludur çünkü özel kullanıcı bilgilerinin güvenliği ihlal edilebilir ve hizmet sağlayıcılar tasdiğin gerçekliğini doğrulayamaz.

Merkeziyetsiz kimlik, şirketlerin geleneksel [Müşterini Tanı (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) süreçlerini atlamalarına ve Doğrulanabilir Kimlik Bilgileri aracılığıyla kullanıcı kimliklerini doğrulamalarına olanak tanır. Bu, kimlik yönetimi maliyetini düşürür ve sahte dokümanların kullanılmasını önler.

### 3. Oylama ve çevrimiçi topluluklar {#voting-and-online-communities}

Çevrimiçi oylama ve sosyal medya, merkeziyetsiz kimlik için iki yeni uygulamadır. Çevrimiçi oylama düzenleri, özellikle kötü niyetli aktörler oy vermek için sahte kimlikler oluşturursa manipülasyona açıktır. Bireylerden zincir üstünde tasdikler sunmalarını istemek, çevrimiçi oylama süreçlerinin dürüstlüğünü iyileştirebilir.

Merkeziyetsiz kimlik, sahte hesaplardan arınmış çevrimiçi topluluklar oluşturmaya yardımcı olabilir. Örneğin, her kullanıcının bot olasılığını azaltarak Ethereum İsim Hizmeti gibi bir zincir üstünde kimlik sistemi kullanarak kimliğini doğrulaması gerekebilir.

### 4. Sybil'e karşı koruma {#sybil-protection}

[Kuadratik oylama](/glossary/#quadratic-voting) kullanarak hibe veren uygulamalar, [Sybil saldırılarına](/glossary/#sybil-attack) karşı savunmasızdır. Çünkü bir hibenin değeri, daha fazla kişi oy verdiğinde artar ve kullanıcıları, katkılarını birçok kimliğe bölmeye teşvik eder. Merkeziyetsiz kimlikler, her katılımcının gerçekten insan olduğunu kanıtlama yükünü kaldırarak bunu önlemeye yardımcı olur ve bunu genelde özel bilgileri açığa çıkarmaya gerek duymadan yaparlar.

## Tasdik nedir? {#what-are-attestations}

Tasdik, bir kurum tarafından başka bir kurum hakkında bulunulan bir iddiadır. Amerika Birleşik Devletleri'nde yaşıyorsanız Motorlu Taşıtlar Dairesi (bir kurum) tarafından size verilen sürücü belgesi, sizin (başka bir kurum) yasal olarak araba kullanma iznine sahip olduğunuzu kanıtlar.

Tasdikler tanımlayıcılardan farklıdır. Bir tasdik, belirli bir kimliğe atıfta bulunmak için tanımlayıcılar _içerir_ ve bu kimlikle ilgili bir nitelik hakkında bir iddiada bulunur. Yani, ehliyetiniz tanımlayıcılara (isim, doğum tarihi, adres) sahiptir, ancak aynı zamanda yasal araç kullanma hakkınızla ilgili bir tasdiktir.

### Merkeziyetsiz tanımlayıcılar nelerdir? {#what-are-decentralized-identifiers}

Yasal isminiz, e-posta adresiniz gibi geleneksel tanımlayıcılar, üçüncü taraflara (hükümet veya e-posta servis sağlayıcılar) bağlıdır. Merkeziyetsiz tanımlayıcılar (MT'ler) farklıdır. Bunlar çıkarılmaz, yönetilmez veya merkezi bir kuruluş tarafından kontrol edilmez.

Merkeziyetsiz tanımlayıcılar bireyler tarafından çıkarılır, tutulur ve kontrol edilir. Bir [Ethereum hesabı](/glossary/#account), merkeziyetsiz tanımlayıcıya bir örnek teşkil eder. Kimseden izin almadan veya merkezi bir depolamaya ihtiyaç duymadan istediğiniz kadar hesap oluşturabilirsiniz.

Merkeziyetsiz kimlikler, dağıtık defterlerde ([blokzincirler](/glossary/#blockchain)) ya da [eşler arası ağlarda](/glossary/#peer-to-peer-network) depolanır. Bu MT'leri [küresel olarak eşsiz, yüksek kullanımda bile çözümlenebilir ve kriptografik olarak doğrulanabilir yapar](https://w3c-ccg.github.io/did-primer/). Merkeziyetsiz bir tanımlayıcı; kişiler, kuruluşlar veya devlet kurumları dahil olmak üzere farklı varlıklarla ilişkilendirilebilir.

## Merkeziyetsiz tanımlayıcıları mümkün kılan nedir? {#what-makes-decentralized-identifiers-possible}

### 1. Açık Anahtar Kriptografisi {#public-key-cryptography}

Açık anahtar kriptografisi, bir varlık için birer [açık anahtar](/glossary/#public-key) ve [özel anahtar](/glossary/#private-key) oluşturan bilgi güvenliği önlemidir. Açık anahtar [kriptografisi](/glossary/#cryptography), blokzincir ağlarında kullanıcı kimliklerini ve dijital varlıkların mülkiyetini doğrulamak için kullanılır.

Bazı merkeziyetsiz tanımlayıcıların, (Ethereum hesabı gibi) açık ve özel anahtarları vardır. Açık anahtar hesabın yöneticisini tanımlar, özel anahtarsa bu hesap için mesajları imzalayıp şifrelerini çözebilir. Açık anahtar kriptografisi, varlıkların kimliğini doğrulamak ve sahte kimliklerin kullanımını ve taklit edilmesini önlemek adına gereken kanıtları sağlamak üzere [kriptografik imzalar](https://andersbrownworth.com/blockchain/public-private-keys/) kullanarak tüm iddiaları doğrular.

### 2. Merkeziyetsiz veri depoları {#decentralized-datastores}

Bir blok zincir açık, güvensiz (güvene ihtiyaç duymayan) ve merkeziyetsiz veri deposu olarak hizmet eder. Açık blok zincirlerin varlığı, tanımlayıcıların merkezi kayıtlarda tutulma ihtiyacını ortadan kaldırır.

Eğer bir merkeziyetsiz tanımlayıcının geçeriliğinin kontrol edilmesi gerekirse blok zincirde karşılığı olan açık anahtara bakılabilir. Bu üçüncü tarafların doğrulamalarının gerektiği geleneksel tanımlayıcılardan farklıdır.

## Merkeziyetsiz tanımlayıcılar ve tasdikler merkeziyetsiz kimliği nasıl mümkün kılar? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

Merkeziyetsiz kimlik, kimlikle ilgili bilgilerin kendi kendini kontrol eden, özel ve taşınabilir olması gerektiği, merkeziyetsiz tanımlayıcılar ve onayların birincil yapı taşları olduğu fikridir.

Merkezi olmayan kimlik bağlamında, tasdikler ([Doğrulanabilir Kimlik Bilgileri](https://www.w3.org/TR/vc-data-model/) olarak da bilinir), ihraççı tarafından yapılan kurcalamaya karşı korumalı, kriptografik olarak doğrulanabilir iddialardır. Bir varlığın (ör. bir kuruluş) verdiği her onay veya Doğrulanabilir Kimlik Bilgisi, MT'leriyle ilişkilendirilir.

MT'ler blok zincirde depolandığından herkes, verenin Ethereum'daki MT'sini çapraz kontrol ederek bir tasdikin geçerliliğini doğrulayabilir. Esasen, Ethereum blok zinciri, belirli varlıklarla ilişkili MT'lerin doğrulanmasını sağlayan küresel bir dizin gibi davranır.

Merkeziyetsiz tanımlayıcılar, tasdiklerin kendi kendini kontrol etmesinin ve doğrulanabilir olmasının nedenidir. Düzenleyen artık mevcut olmasa bile, hamil her zaman tasdikin kaynağına ve geçerliliğine dair kanıta sahiptir.

Merkeziyetsiz tanımlayıcılar, merkeziyetsiz kimlik aracılığıyla kişisel bilgilerin gizliliğini korumak için de çok önemlidir. Örneğin, bir kişi bir tasdik belgesi (sürücü belgesi) sunarsa doğrulayan tarafın kanıttaki bilgilerin geçerliliğini kontrol etmesine gerek yoktur. Bunun yerine doğrulayıcı, kanıtın geçerli olup olmadığını belirlemek için yalnızca tasdikin gerçekliğine ve veren kuruluşun kimliğine ilişkin kriptografik garantilere ihtiyaç duyar.

## Merkeziyetsiz kimlikte tasdik türleri {#types-of-attestations-in-decentralized-identity}

Tasdik bilgilerinin Ethereum tabanlı bir kimlik ekosisteminde nasıl depolandığı ve alındığı, geleneksel kimlik yönetiminden farklıdır. Burada, merkeziyetsiz kimlik sistemlerinde tasdiklerin yayınlanması, saklanması ve doğrulanmasına yönelik çeşitli yaklaşımlara genel bir bakış sunulmaktadır:

### Zincir dışındaki tasdikler {#off-chain-attestations}

Tasdikleri zincir üstünde tutmanın endişelerinden biri, bireylerin gizli tutmak isteyeceği bilgiler içerebilmeleridir. Ethereum blok zincirinin açık doğası bu gibi tasdiklerin depolanmasını tercih edilmez hale getirmektedir.

Bu soruna çözüm tasdikleri çıkarıp kullanıcıların zincir dışı dijital cüzdanlarında tutmasıdır. Tasdiklerse çıkaranın zincirde depolanan MT'si ile imzalanacaktır. Bu tasdikler [JSON Web Token'ları](https://en.wikipedia.org/wiki/JSON_Web_Token) olarak kodlanır ve çıkaranın dijital imzasını içerir, bu da zincir dışı iddiaların kolayca doğrulanmasını sağlar.

Burada, zincir dışı tasdikleri açıklamak için varsayımsal bir senaryo verilmiştir:

1. Bir üniversite (çıkaran), bir tasdik (dijital akademik sertifika) oluşturur, anahtarları ile imzalar ve Bob'a (kimlik sahibine) verir.

2. Bob işe başvurur ve akademik niteliklerini işverene kanıtlamak ister ve mobil cüzdanındaki tasdiği paylaşır. Şirket (doğrulayan) tasdiğin geçerliliğini çıkaranın MT'sini (ör. Ethereum'daki açık anahtarını) kontrol ederek doğrulayabilir.

### Kalıcı erişime sahip zincir dışındaki tasdikler {#offchain-attestations-with-persistent-access}

Bu düzenleme kapsamında tasdikler JSON dosyalarına dönüştürülür ve zincir dışında depolanır (ideal olarak IPFS veya Swarm gibi [merkeziyetsiz bulut depolama](/developers/docs/storage/) platformlarında). Ancak JSON dosyasının [karması](/glossary/#hash) zincirde depolanır ve MT'nin zincir üztündeki kaydına bağlanır. Bağlantılı MT, tasdiğin çıkaranı veya alıcısı olabilir.

Bu yaklaşım tasdikleri şifreli ve doğrulanabilir kılarken blok zincir temelli kalıcılığını da sağlar. Ayrıca özel anahtarın sahibi bilginin şifresini açabilidiği için seçici gösterimi de mümkün kılar.

### Zincir üstündeki tasdikler {#onchain-attestations}

Zincir üstündeki tasdikler, Ethereum blokzincirindeki [akıllı sözleşmelerde](/glossary/#smart-contract) tutulur. Akıllı sözleşme (kayıt defteri işlevi görür) tasdiği zincir üstündeki bir kimliğe (açık anahtara) bağlar.

Burada, zincir üstündeki tasdiklerin uygulamada nasıl çalışabileceğine bir örnek verilmiştir:

1. Bir şirket (XYZ Şirketi) hisselerini akıllı sözleşme kullanarak satmayı planlıyor ama sadece sabıka kaydı yaptırmış alıcıların alabilmesini istiyor.

2. XYZ Şirketi Ethereum zinciri üstünde tasik çıkarmak için firmanın sabıka kaydı kontrolleri yapmasını sağlayabilir. Bu tasdik bir kimsenin sabıka kaydı kontrolünden geçtiğini herhangi bir kişisel veri teşhir etmeden onaylar.

3. Akıllı sözleşme satan hisse senetleri, taranan alıcıların kimlikleri için sicil sözleşmesini kontrol edebilir ve akıllı sözleşmenin kimin hisse satın almasına izin verilip verilmediğini belirlemesini mümkün kılar.

### Soulbound token'lar ve kimlik {#soulbound}

[Soulbould jetonlar](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) ([transfer edilemez NFTler](/glossary/#nft)), her cüzdana özgü olan bilgileri toplamak için kullanılabilir. Bu, başarıları (örneğin, belirli bir çevrimiçi kursu bitirme veya bir oyunda bir eşik puanını geçme) veya topluluk katılımını temsil eden tokenleri içerebilen belirli bir Ethereum adresine bağlı benzersiz bir zincir-üstü kimlik oluşturur.

## Merkeziyetsiz kimliği kullanın {#use-decentralized-identity}

Merkeziyetsiz kimlik çözümlerinin temeli olarak Ethereum'u kullanan çok sayıda iddialı proje vardır:

- **[Ethereum İsim Servisi (ENS)](https://ens.domains/)** - _Ethereum cüzdan adresleri, içerik karmaları ve metaveriler için zincir üstünde, makine tarafından okunabilen, merkeziyetsiz isimlendirme sistemi._
- **[SpruceID](https://www.spruceid.com/)** - _Kullanıcıların üçüncü taraf hizmetlerine güvenmek yerine Ethereum hesapları ve ENS profilleri ile dijital kimliği kontrol etmelerini sağlayan merkeziyetsiz bir kimlik projesi._
- **[Ethereum Tasdik Hizmeti (EAS)](https://attest.sh/)** - _Her şey hakkında zincir üstünde veya dışında tasdik etmek için merkeziyetsiz bir ledger'dır/protokoldür._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (veya PoH) Ethereum üzerine inşa edilmiş bir sosyal kimlik doğrulama sistemidir._
- **[BrightID](https://www.brightid.org/)** - _Bir sosyal grafiğin oluşturulması ve analizi yoluyla kimlik doğrulamasını yeniden düzenlemeyi amaçlayan merkeziyetsiz, açık kaynaklı bir sosyal kimlik ağı._
- **[walt.id](https://walt.id)** — _Geliştiricilerin ve kuruluşların kendi kendine egemen kimlik ve NFT'lerden/SBT'lerden yararlanmasına olanak tanıyan açık kaynaklı merkezi olmayan kimlik ve cüzdan altyapısı._
- **[Veramo](https://veramo.io/)** - _Kendi uygulamalarında kriptografik olarak doğrulanabilir veri kullanmak isteyen kişilerin işini kolaylaştıran bir JavaScript kitaplığı._

## Daha fazla okuma {#further-reading}

### Makaleler {#articles}

- [Blockchain Use Cases: Blockchain in Digital Identity](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [What is Ethereum ERC725? Self-Sovereign Identity Management on the Blockchain](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [How Blockchain Could Solve the Problem of Digital Identity](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [What Is Decentralized Identity And Why Should You Care?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [Introduction to Decentralized Identity](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### Videolar {#videos}

- [Decentralized Identity (Bonus Livestream Session)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Andreas Antonopoulos'tan merkezi olmayan kimlik üzerine harika bir açıklayıcı video_
- [Sign In with Ethereum and Decentralized Identity with Ceramic, IDX, React, and 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Nader Dabit tarafından Ethereum cüzdanı kullanarak bir profili oluşturmak, okumak ve güncellemek için bir kimlik yönetim sistemi oluşturmaya yönelik YouTube eğitimi_
- [BrightID - Decentralized Identity on Ethereum](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Ethereum için merkeziyetsiz bir kimlik çözümü olan BrightID'yi tartışan Bankless podcast bölümü_
- [The Off Chain Internet: Decentralized Identity & Verifiable Credentials](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Evin McMullen tarafından yapılan EthDenver 2022 sunumu
- [Verifiable Credentials Explained](https://www.youtube.com/watch?v=ce1IdSr-Kig) -Tamino Baumann'ın demosunu içeren açıklayıcı YouTube videosu

### Topluluklar {#communities}

- [ERC-725 Alliance on GitHub](https://github.com/erc725alliance) — _Ethereum blok zincirinde kimlik yönetimi için ERC725 standardının destekçileri_
- [SpruceID Discord server](https://discord.com/invite/Sf9tSFzrnt) — _Ethereum ile oturum açma üzerinde çalışan meraklılar ve geliştiriciler için topluluk_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Uygulamalar için doğrulanabilir veriler için bir çerçeve oluşturmaya katkıda bulunan bir geliştiriciler topluluğu_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _Çeşitli sektörlerde merkezi olmayan kimlik kullanım örnekleri üzerinde çalışan geliştiricilerden ve derleyicilerden oluşan bir topluluk_
