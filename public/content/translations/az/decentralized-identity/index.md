---
title: Mərkəzləşdirilməmiş şəxsiyyət
description: Mərkəzləşdirilməmiş kimlik nədir və bunun nə üçün əhəmiyyəti var?
lang: az
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /eth-gif-cat.png
summaryPoint1: Ənənəvi kimlik sistemləri məlumatlarınızın verilməsi, saxlanması və onlara nəzarəti mərkəzləşdirib.
summaryPoint2: Mərkəzləşdirilməmiş kimlik mərkəzləşdirilmiş üçüncü tərəflərdən asılılığı aradan qaldırır.
summaryPoint3: Kriptovalyuta sayəsində istifadəçilər artıq öz məlumatlarını və sertifikatlarını vermək, saxlamaq və nəzarət etmək üçün alətlərə sahibdirlər.
---

Kimliyiniz bu gün həyatınızın demək olar ki, hər bir sahəsinin əsasını təşkil edir. Onlayn xidmətlərdən istifadə, bank hesabının açılması, seçkilərdə səs vermək, əmlak alınması, məşğulluğun təmin edilməsi - bütün bunlar kimliyinizi sübut etməyi tələb edir.

Bununla belə, ənənəvi kimlik sistemləri uzun zamandır ki, məlumatlarınızı və [sertifikalarınızı](#what-are-attestations) təmin edən, saxlayan və onlara nəzarət edən mərkəzləşdirilmiş vasitəçilərə etibar etmişdir. Bu isə o deməkdir ki, siz kimlik məlumatlarınıza nəzarət edə və ya kimin kimlik məlumatlarınıza (EMM) çıxışı olduğuna və bu tərəflərin nə qədər istifadə hüququna malik olduğuna qərar verə bilmirsiniz.

Bu problemləri həll etmək üçün Ethereum kimi publik blokçeynlər üzərində qurulmuş mərkəzləşdirilməmiş kimlik sistemlərimiz var. Mərkəzləşdirilməmiş kimlik fərdlərə şəxsiyyətləri ilə bağlı məlumatlarını idarə etməyə imkan verir. Mərkəzləşdirilməmiş kimlik həlləri ilə _siz_ xidmət təminatçıları və ya hökumətlər kimi mərkəzi orqanlara etibar etmədən məlumatlar yarada və sertifikatlarınızı tələb edə və saxlaya bilərsiniz.

## Kimlik nədir? {#what-is-identity}

Kimlik fərdin özünəməxsus xüsusiyyətləri ilə təyin edilən özünü müəyyən etməsi deməkdir. Kimlik_ fərdi._, yəni fərqli bir insan varlığına dəlalət edir. Kimlik təşkilat və ya orqan kimi digər qeyri-insani qurumlara da aid edilə bilər.

## İdentifikator nədir? {#what-are-identifiers}

İdentifikator müəyyən bir kimliyə və ya kimliklərə işarə kimi çıxış edən məlumatdır. Ümumi identifikatorlara aşağıdakılar daxildir:

- Ad
- Sosial təminat nömrəsi/vergi ID nömrəsi
- Mobil nömrə
- Tarix və Anadan olduğu yer
- Rəqəmsal identifikasiya etimadnamələri, məsələn, e-poçt ünvanları, istifadəçi adları, avatarlar

Bu ənənəvi identifikator nümunələri mərkəzi qurumlar tərəfindən verilir, saxlanılır və nəzarət olunur. Adınızı dəyişdirmək üçün hökumətinizdən və ya məlumatlarınızı dəyişdirmək üçün sosial media platformasından icazə almalısınız.

## Attestasiyalar nədir? {#what-are-attestations}

Attestasiya bir qurumun digər quruma qarşı irəli sürdüyü iddiadır. Əgər Birləşmiş Ştatlarda yaşayırsınızsa, Avtomobil Nəqliyyatı Departamenti (bir müəssisə) tərəfindən sizə verilmiş sürücülük vəsiqəsi sizə (digər quruma) qanuni olaraq avtomobil idarə etməyə icazə verildiyini təsdiq edir.

Attestasiyalar identifikatorlardan fərqlidir. Attestasiya müəyyən kimliyə istinad etmək üçün _identifikatorları ehtiva edir_ və bu kimliklə əlaqəli atribut haqqında iddia təşkil edir. Beləliklə, sürücülük vəsiqənizdə identifikatorlar (adı, doğum tarixi, ünvanı) olub, bu həm də sizin qanuni sürücülük hüququnuzun təsdiqidir.

### Mərkəzləşdirilməmiş identifikatorlar hansılardır? {#what-are-decentralized-identifiers}

Qanuni adınız və ya e-poçt ünvanınız kimi ənənəvi identifikatorlar üçüncü tərəflərə - hökumətlərə və e-poçt provayderlərindən asılıdır. Mərkəzləşdirilməmiş identifikatorlar (DID) fərqlidir - onlar heç bir mərkəzi qurum tərəfindən verilmir, idarə olunmur və ya nəzarət edilmir.

Mərkəzləşdirilməmiş identifikatorlar fərdlər tərəfindən verilir, saxlanılır və idarə olunur. [Ethereum hesabı](/developers/docs/accounts/) mərkəzləşdirilməmiş identifikatorun nümunəsidir. Siz heç kimdən icazə almadan və onları mərkəzi reyestrdə saxlamağa ehtiyac olmadan istədiyiniz qədər hesab yarada bilərsiniz.

Mərkəzləşdirilməmiş identifikatorlar paylanmış kitabçalarda (blokçeynlər) və ya peer-to-peer şəbəkələrində saxlanılır. Bu, DID-ləri [qlobal miqyasda unikal, yüksək əlçatanlıqla həll edilə bilən və kriptoqrafik olaraq yoxlanıla bilən edir](https://w3c-ccg.github.io/did-primer/). Mərkəzləşdirilməmiş identifikator müxtəlif qurumlarla, o cümlədən insanlar, təşkilatlar və ya dövlət qurumları ilə əlaqələndirilə bilər.

## Mərkəzləşdirilməmiş identifikatorları nə mümkün edir? {#what-makes-decentralized-identifiers-possible}

### 1. Açıq Açar İnfrastruktur (PKI) {#public-key-infrastructure}

Açıq açar infrastrukturu (PKI) [ictimai açar](/glossary/#public-key) və [ yaradan informasiya təhlükəsizliyi tədbiridir. müəssisə üçün şəxsi açar](/glossary/#private-key). Açıq açar kriptoqrafiyası blokçeyn şəbəkələrində istifadəçi kimliklərinin autentifikasiyası və rəqəmsal aktivlərin sahibliyini sübut etmək üçün istifadə olunur.

Ethereum hesabı kimi bəzi mərkəzləşdirilməmiş identifikatorların açıq və şəxsi açarları var. Açıq açar hesabın nəzarətçisini müəyyən edir, şəxsi açarlar isə bu hesab üçün mesajları imzalaya və şifrəni aça bilər. PKI bütün iddiaları yoxlamaq üçün [kriptoqrafik imzalardan](https://andersbrownworth.com/blockchain/public-private-keys/) istifadə edərək, subyektlərin autentifikasiyası və saxta kimliklərin istifadəsinin qarşısını almaq üçün lazım olan sübutları təmin edir.

### 2. Mərkəzləşdirilməmiş databazalar {#decentralized-datastores}

Blockchain yoxlanıla bilən məlumat reyestri kimi xidmət edir: açıq, etibarsız və mərkəzləşdirilməmiş məlumat anbarı. İctimai blokçeynlərin mövcudluğu identifikatorların mərkəzləşdirilmiş registrlərdə saxlanmasına ehtiyacı aradan qaldırır.

Kimsə mərkəzləşdirilməmiş identifikatorun etibarlılığını təsdiqləməlidirsə, o, blokçeynində əlaqəli açıq açarı axtara bilər. Bu, üçüncü tərəflərin autentifikasiyasını tələb edən ənənəvi identifikatorlardan fərqlidir.

## Mərkəzləşdirilməmiş identifikatorlar və sertifikatlar mərkəzləşdirilməmiş kimliyi necə təmin edir? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

Mərkəzləşdirilməmiş kimlikdə mərkəzləşdirilməmiş identifikatorlar və sertifikatlar əsas tikinti blokları olub, bu kimliklə əlaqəli məlumatın özünün idarə edilməsi, şəxsi və daşına bilən olması deməkdir.

Mərkəzləşdirilməmiş kimlik kontekstində attestasiyalar (həmçinin [Yoxlanılan Etibarnamələr](https://www.w3.org/TR/vc-data-model/) kimi tanınır) kriptoqrafik olaraq saxtakarlığa və emitent tərəfindən təsdiq edilə bilən iddialar qarşı davamlıdır. Müəssisənin (məsələn, təşkilatın) verdiyi hər bir attestasiya və ya Doğrulana bilən Etibarnamə onların DID ilə əlaqələndirilir.

DID-lər blokçeynində saxlandığı üçün hər kəs emitentin DID-ini Ethereum-da çarpaz yoxlayaraq attestasiyanın etibarlılığını yoxlaya bilər. Əslində, Ethereum blockchain müəyyən qurumlarla əlaqəli DID-lərin yoxlanılmasına imkan verən qlobal bir kataloq kimi fəaliyyət göstərir.

Mərkəzləşdirilməmiş identifikatorlar attestasiyaların öz-özünə idarə olunması və yoxlanıla bilməsinin səbəbidir. Emitent artıq mövcud olmasa belə, sahibinin həmişə sertifikatın mənşəyinə və etibarlılığına dair sübutu var.

Mərkəzləşdirilməmiş identifikatorlar həmçinin mərkəzləşdirilməmiş kimlik vasitəsilə şəxsi məlumatların məxfiliyini qorumaq üçün çox vacibdir. Məsələn, bir şəxs attestasiyanın sübutunu (sürücülük vəsiqəsi) təqdim edərsə, təsdiq edən tərəfin sübutdakı məlumatların etibarlılığını yoxlamasına ehtiyac yoxdur. Bunun əvəzinə, təsdiqləyiciyə sübutun etibarlı olub-olmadığını müəyyən etmək üçün yalnız attestasiyanın həqiqiliyinə və onu verən təşkilatın kimliyinə dair kriptoqrafik zəmanətlər lazımdır.

## Mərkəzləşdirilməmiş kimlikdə attestasiya növləri {#types-of-attestations-in-decentralized-identity}

Ethereum əsaslı kimlik ekosistemində attestasiya məlumatlarının necə saxlandığı və əldə edildiyi ənənəvi kimlik idarəçiliyindən fərqlidir. Mərkəzləşdirilməmiş kimlik sistemlərində attestasiyaların verilməsi, saxlanması və yoxlanılması üçün müxtəlif yanaşmaların icmalı:

### Zəncirdən kənar sertifikatlar {#off-chain-attestations}

Sertifikatların zəncirdə saxlanması ilə bağlı narahatlıqlardan biri, onların şəxsi saxlamaq istədikləri məlumatları ehtiva edə bilməsidir. Ethereum blokçeyninin ictimai təbiəti bu cür sertifikatların saxlanmasını cəlbedici edir.

Həll yolu istifadəçilər tərəfindən rəqəmsal cüzdanlarda zəncirdən kənarda saxlanılan, lakin zəncirdə saxlanılan emitentin DID ilə imzalanmış sertifikatların verilməsidir. Bu sertifikatlar [JSON Veb Tokenləri](https://en.wikipedia.org/wiki/JSON_Web_Token) kimi kodlaşdırılıb və emitentin rəqəmsal imzasını ehtiva edir ki, bu da zəncirdən kənar iddiaların asan yoxlanılmasına imkan verir.

Zəncirdən kənar sertifikatları izah etmək üçün hipotetik bir ssenari:

1. Universitet (emitent) attestasiya (rəqəmsal akademik sertifikat) yaradır, öz açarları ilə onu imzalayır və onu Boba (şəxsiyyət sahibi) verir.

2. Bob işə müraciət edir və akademik keyfiyyətlərini işəgötürənə sübut etmək istəyir, buna görə də mobil telefonundan attestasiyanı paylaşır. Şirkət (təsdiqləyici) daha sonra emitentin DID-ini (yəni, Ethereum-da açıq açarı) yoxlayaraq attestasiyanın etibarlılığını təsdiq edə bilər.

### Davamlı girişi olan zəncirdən kənar sertifikatlar {#offchain-attestations-with-persistent-access}

Bu tənzimləmə çərçivəsində sertifikatlar JSON fayllarına çevrilir və zəncirdən kənar saxlanılır (ideal olaraq IPFS və ya Swarm kimi [mərkəzləşdirilməmiş bulud yaddaşı](/developers/docs/storage/) platformasında). Bununla belə, JSON faylı [hash](/glossary/#hash) zəncirdə saxlanılır və zəncirli reyestr vasitəsilə DID ilə əlaqələndirilir. Əlaqədar DID ya attestasiyanı verənin, ya da qəbul edəninki ola bilər.

Bu yanaşma, iddia məlumatlarını şifrələnmiş və yoxlanıla bilən saxlayarkən attestasiyalara blokçeyn əsaslı davamlılıq əldə etməyə imkan verir. Şəxsi açarın sahibi məlumatı deşifrə edə bildiyi üçün o, həmçinin seçici açıqlamaya da imkan verir.

### Zəncirvari sertifikatlar {#onchain-attestations}

Zəncir üzərində attestasiyalar Ethereum blokçeynində [ağıllı müqavilələrdə](/developers/docs/smart-contracts/) keçirilir. Ağıllı müqavilə (reyestr kimi fəaliyyət göstərir) sertifikatı müvafiq zəncirdə mərkəzləşdirilməmiş identifikatora (ictimai açar) uyğunlaşdıracaq.

Zəncirvari attestasiyaların praktikada necə işləyə biləcəyini göstərən bir nümunə:

1. Bir şirkət (XYZ Corp) ağıllı müqavilədən istifadə edərək sahiblik səhmlərini satmağı planlaşdırır, lakin yalnız arxa plan yoxlamasını tamamlamış alıcıları istəyir.

2. XYZ Corp, Ethereum-da zəncir üzərində sertifikatlar vermək üçün fon yoxlaması apara bilər. Bu attestasiya, şəxsin heç bir şəxsi məlumatı ifşa etmədən arxa plan yoxlamasından keçdiyini təsdiq edir.

3. Ağıllı müqavilə satış səhmləri reyestr müqaviləsini yoxlanılan alıcıların şəxsiyyətləri üçün yoxlaya bilər ki, bu da smart müqavilənin kimin səhm almasına icazə verildiyini və ya verilmədiyini müəyyən etməyə imkan verir.

### Soulbound token və kimlik {#soulbound}

[Soulbound token](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) (köçürülməyən NFT-lər) xüsusi pul kisəsi üçün unikal məlumat toplamaq məqsədilə istifadə edilə bilər. Bu, effektiv şəkildə müəyyən bir Ethereum ünvanına bağlı unikal zəncirli kimlik yaradır ki, bura nailiyyətləri (məsələn, bəzi xüsusi onlayn kursu bitirmək və ya oyunda səviyyəni keçmək) və ya icma iştirakını əks etdirən əlamətlər daxil edə bilər.

## Mərkəzləşdirilməmiş kimliyin üstünlükləri {#benefits-of-decentralized-identity}

1. Mərkəzləşdirilməmiş kimlik identifikasiya məlumatlarına fərdi nəzarəti artırır. Mərkəzləşdirilməmiş identifikatorlar və sertifikatlar mərkəzləşdirilmiş orqanlara və üçüncü tərəf xidmətlərinə etibar etmədən yoxlana bilər.

2. Mərkəzləşdirilməmiş kimlik həlləri istifadəçi kimliyini yoxlamaq və idarə etmək üçün etibarlı, qüsursuz və məxfiliyi qoruyan metodu asanlaşdırır.

3. Mərkəzləşdirilməmiş kimlik müxtəlif tərəflər arasında etimad yaradan və attestasiyaların etibarlılığını sübut etmək üçün kriptoqrafik zəmanətlər verən blokçeyn texnologiyasından istifadə edir.

4. Mərkəzləşdirilməmiş kimlik məlumatları portativ edir. İstifadəçilər sertifikatları və identifikatorları mobil cüzdanda saxlaya və istədikləri tərəflə paylaşa bilərlər. Mərkəzləşdirilməmiş identifikatorlar və attestasiyalar emitent təşkilatın məlumat bazasına daxil edilmir.

5. Mərkəzləşdirilməmiş kimlik, fərdlərə sahib olduqları bir şeyi və ya məşğuliyyətlərini sübut etməyə imkan verəcək yeni yaranan sıfır bilik texnologiyaları ilə yaxşı işləməlidir. Bu, səsvermə kimi tətbiqlər üçün etibar və məxfiliyi birləşdirməyin güclü yolu ola bilər.

6. Mərkəzləşdirilməmiş kimlik anti-Sybil mexanizmlərinə imkan verir ki, bir insanın bir neçə insan kimi davranaraq hansısa sistemlə oynadığını və ya spam göndərdiyini müəyyən etsin.

## Mərkəzləşdirilməmiş kimlikdən istifadə halları {#decentralized-identity-use-cases}

Mərkəzləşdirilməmiş kimlik bir çox potensial istifadə hallarına malikdir:

### 1. Universal girişlər {#universal-dapp-logins}

Mərkəzləşdirilməmiş kimlik parol əsaslı girişləri ilə əvəz etməyə kömək edə bilər [mərkəzləşdirilməmiş autentifikasiya](https://www.ibm.com/blogs/blockchain/2018/10/decentralized-identity-an-alternative-to-password-based-authentication/"). Xidmət təminatçıları istifadəçilərə Ethereum cüzdanında saxlanıla bilən sertifikatlar verə bilər. Misal attestasiya sahibinə onlayn icmaya giriş imkanı verən [NFT](/nft/) ola bilər.

[Ethereum ilə daxil olun](https://login.xyz/) funksiyası daha sonra serverlərə istifadəçinin Ethereum hesabını təsdiqləməyə və hesab ünvanından tələb olunan sertifikatı əldə etməyə imkan verəcək. Bu o deməkdir ki, istifadəçilər uzun parolları yadda saxlamadan platformalara və vebsaytlara daxil ola bilər ki, bu da istifadəçilər üçün onlayn təcrübəni yaxşılaşdırır.

### 2. KYC identifikasiyası {#kyc-authentication}

Bir çox onlayn xidmətlərdən istifadə fərdlərdən sürücülük vəsiqəsi və ya milli pasport kimi sertifikatlar və etimadnamələr təqdim etmələrini tələb edir. Lakin bu yanaşma problemlidir, çünki şəxsi istifadəçi məlumatı pozula bilir və xidmət təminatçıları attestasiyanın həqiqiliyini yoxlaya bilmirlər.

Mərkəzləşdirilməmiş kimlik şirkətlərə adi [Know-Your-Customer (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) proseslərini atlamağa və Doğrulana bilən Etibarnamələr vasitəsilə istifadəçi şəxsiyyətlərini təsdiq etməyə imkan verir. Bu, kimliyin idarə edilməsi xərclərini azaldır və saxta sənədlərdən istifadənin qarşısını alır.

### 3. Səsvermə və onlayn icmalar {#voting-and-online-communities}

Onlayn səsvermə və sosial media mərkəzləşdirilməmiş şəxsiyyət üçün iki yeni proqramdır. Onlayn səsvermə sxemləri manipulyasiyaya həssasdır, xüsusən də pis niyyətli şəxslər səs vermək üçün saxta şəxsiyyətlər yaradırsa. Fərdlərdən zəncir üzərində sertifikatlar təqdim etmələrini xahiş etmək onlayn səsvermə proseslərinin bütövlüyünü yaxşılaşdıra bilər.

Mərkəzləşdirilməmiş kimlik saxta hesablardan azad onlayn icmalar yaratmağa kömək edə bilər. Məsələn, hər bir istifadəçi botların mümkünlüyünü azaldan Ethereum Ad Xidməti kimi zəncirli şəxsiyyət sistemindən istifadə edərək öz kimliyini təsdiq etməli ola bilər.

### 4. Anti-Sybil müdafiəsi {#sybil-protection}

Sybil hücumları, təsirlərini artırmaq üçün fərdi insanların bir sistemi aldataraq, bir çox insan olduğunu düşünməsinə aiddir. [kvadrat səsvermə](https://www.radicalxchange.org/concepts/plural-voting/)istifadə edən[Qrant verən proqramlar](https://gitcoin.co/grants/)bu Sybil hücumlarına qarşı həssasdır, çünki daha çox fərd ona səs verdikdə qrantın dəyəri artır və bu da istifadəçiləri öz töhfələrini bir çox kimlik üzrə bölməyə təşviq edir. Mərkəzləşdirilməmiş kimliklər, hər bir iştirakçının həqiqətən insan olduqlarını sübut etmək üçün yükü qaldıraraq, bunun qarşısını almağa kömək edir, baxmayaraq ki, çox vaxt xüsusi şəxsi məlumatı açıqlamağa ehtiyac yoxdur.

## Mərkəzləşdirilməmiş kimlikdən istifadə edin {#use-decentralized-identity}

Ethereum-dan mərkəzləşdirilməmiş kimlik həlləri üçün əsas kimi istifadə edən bir çox iddialı layihələr var:

- **[Ethereum Ad Xidməti (ENS)](https://ens.domains/)** - _Ethereum cüzdanı ünvanları, məzmun hashləri və metadata kimi zəncirdə, maşın tərəfindən oxuna bilən identifikatorlar üçün mərkəzləşdirilməmiş adlandırma sistemi. _
- **[SpruceID](https://www.spruceid.com/)** - _Mərkəzləşdirilməmiş kimlik istifadəçilərə üçüncü tərəf xidmətlərinə etibar etmək əvəzinə Ethereum hesabları və ENS profilləri ilə rəqəmsal kimliyə nəzarət etməyə imkan verən layihə._
- **[Ethereum Attestasiya Xidməti (EAS)](https://attest.sh/)** - _ Hər hansı bir şey haqqında zəncirli və ya zəncirdən kənar sertifikatlar əldə etmək üçün mərkəzləşdirilməmiş kitab/protokol._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (or PoH) Ethereum üzərində qurulmuş sosial kimlik yoxlama sistemidir._
- **[BrightID](https://www.brightid.org/)** - _Mərkəzləşdirilməmiş, sosial qrafikin yaradılması və təhlili vasitəsilə kimliyin yoxlanılmasında islahatlar aparmağa çalışan açıq mənbəli sosial kimlik şəbəkəsi._
- **[Kimliyi təsdiq edən pasport](https://proofofpersonhood.com/)** - _ Mərkəzləşdirilməmiş rəqəmsal kimlik toplayıcısı._
- **[walt.id](https://walt.id)** — _Tərtibatçılara və təşkilatlara öz suveren kimlik və NFTs/SBT-lərdən istifadə etməyə imkan verən açıq mənbəli mərkəzləşdirilməmiş kimlik və cüzdan infrastrukturu._

## Further reading {#further-reading}

### Məqalələr {#articles}

- [Blokçeyndən istifadə halları: Rəqəmsal kimlikdə blokçeyn](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [Ethereum ERC725 nədir? Blokçeyndə Şəxsi Suveren Kimlik İdarəetmə](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [Blokçeyn rəqəmsal kimlik problemini necə həll edə bilər](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [Mərkəzləşdirilməmiş kimlik nədir və buna nə üçün diqqət yetirməlisiniz?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [Mərkəzləşdirilməmiş Kimliyə Giriş](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### Videolar {#videos}

- [Mərkəzləşdirilməmiş Kimlik (Bonus Canlı Yayım Sessiyası)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Andreas Antonopolous_ tərəfindən mərkəzləşdirilməmiş kimlik haqqında izahedici video
- [Ceramic, IDX, React və 3ID Connect ilə Ethereum və Mərkəzləşdirilməmiş Kimlik ilə daxil olun](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Nader Dabit tərəfindən Ethereum cüzdanından istifadə edərək istifadəçi profilinin yaradılması, oxunması və yenilənməsi üçün kimlik idarəetmə sisteminin yaradılması üzrə YouTube dərsliyi_
- [BrightID - Ethereum-da Mərkəzləşdirilməmiş Kimlik](https://www.youtube.com/watch?v=D3DbMFYGroM) — _BrightID-in Ethereum_ üçün mərkəzləşdirilməmiş kimlik həlli üzrə banksız podcast epizodu
- [Zəncirvari İnternet: Mərkəzləşdirilməmiş Kimlik & Doğrulana bilən etimadnamələr](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Evin McMullen tərəfindən EthDenver 2022 təqdimatı
- [Təsdiq edilə bilən etimadnamələr izah edildi](https://www.youtube.com/watch?v=ce1IdSr-Kig) - Tamino Baumann tərəfindən demo ilə YouTube izahat videosu

### İcmalar {#communities}

- [GitHub-da ERC-725 Alyansı](https://github.com/erc725alliance) — _Ethereum blokçeynində kimlik idarə etmək üçün ERC725 standartının tərəfdarları_
- [SpruceID Discord serveri](https://discord.com/invite/Sf9tSFzrnt) — _Ethereum ilə Giriş üzərində işləyən həvəskarlar və tərtibatçılar üçün icma_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Tətbiqlər üçün yoxlanıla bilən məlumatlar üzrə çərçivənin qurulmasına töhfə verən tərtibatçılar icması_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _Müxtəlif sənayelərdə mərkəzləşdirilməmiş kimlikdən istifadə halları üzərində işləyən tərtibatçılar və inşaatçılar icması_
