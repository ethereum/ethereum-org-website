---
title: Ethereum'da Oyun
description: "Ethereum'un doğrulanabilir kurallar, oyunculara ait varlıklar ve herkesin üzerine inşa edebileceği açık ekosistemlerle zincir içi oyunlara nasıl güç verdiğini öğrenin."
lang: tr
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoints:
  - "Oyun kuralları ve durumu, bir stüdyonun sunucuları tarafından değil, zincir içi oyunların temel bir avantajını temsil eden Ethereum blokzinciri tarafından uygulanabilir"
  - "Herkes aynı açık zincir içi veriye bağlanan modlar, botlar veya tamamen yeni oyunlar geliştirebilir"
  - "Özel olarak oluşturulmuş L2'ler daha düşük ücretlerle gerçek zamanlı oynanış sağlarken, oyun geliştirme çerçeveleri zincir içi oyunlar geliştirmeyi her zamankinden daha erişilebilir hale getiriyor"
buttons:
  - content: Daha fazla bilgi edinin
    toId: gaming-on-ethereum
  - content: Oyunları keşfedin
    toId: games
    isSecondary: false
---

## Ethereum'da Oyun {#gaming-on-ethereum}

Ethereum'da oyun, blokzinciri belirli özellikler için kullanan oyunlardan tüm oyun dünyasının zincir içi yaşadığı oyunlara kadar çeşitli şekillerde karşımıza çıkar. Ethereum blokzinciri, oyunlarla çeşitli kapasitelerde kullanılabilir. Oyunlar, para birimlerini transfer edilebilir token'lar veya diğer oyun içi varlıkları (karakterler, ekipmanlar, evcil hayvanlar vb.) [değiştirilemez token'lar (NFT'ler)](/nft/) biçiminde saklayabilir. Oyunlar ayrıca mantıklarını, kurallarını ve durumlarını zincir içi barındırmak için akıllı sözleşmelerden yararlanabilir. Bu tür oyunlar genellikle "tamamen zincir içi oyunlar" olarak adlandırılır.

Ethereum ekosistemi ayrıca, Ethereum Ana Ağı'nın güvenlik garantilerini devralırken Ethereum'un ölçeğini genişleten ve özel kullanım durumlarını destekleyen [katman 2 (L2) blokzincirleri](/layer-2/learn/) içerir. L2 ağları, daha hızlı onay süreleri ve daha düşük ücretleri sayesinde zincir içi oyunlar ve toplulukları için ek avantajlar sağlayarak oynanışı daha erişilebilir hale getirebilir.

[Katman 1 (L1) ölçeklendikçe](/roadmap/scaling/), oyunlar Ethereum Ana Ağı'na dönmeye başlıyor. Bunun bir örneği, şu anda Ethereum L1 üzerinde oyun testinde olan tamamen zincir içi bir oyun olan [Asphodel](https://x.com/asph0d37)'dir. Ancak çoğu oyun, daha düşük ücretlerden yararlanmak için hala L2 çözümlerini kullanmaktadır.

## Ethereum oyunlarının yükselişi {#rise-of-ethereum-gaming}

EVE Online, World of Warcraft, MapleStory ve RuneScape gibi geleneksel MMO'lar, sanal ekonomilerin gerçek dünya değeri üretebileceğini kanıtladı. Oyuncular gelir elde etmek için altın kastı, EVE'in ekonomisi gerçek finansal sistemleri yansıttı ve mod kültürü (Counter-Strike, DotA 2, Minecraft sunucuları) oyuncuların mevcut dünyalar üzerine bir şeyler inşa etmek istediğini gösterdi. Vitalik'in [bir World of Warcraft zayıflatmasına (nerf) duyduğu meşhur hayal kırıklığı](https://youtu.be/Letsfuhpobw?t=140) bile kapalı oyun ekosistemlerindeki sorunların erken bir sembolü haline geldi. Ancak stüdyolar her şeyi kontrol ediyordu; hesapları yasaklayabilir, sunucuları kapatabilir veya oyuncular tarafından oluşturulan içerik üzerinde mülkiyet iddia edebilirlerdi.

Ethereum piyasaya sürüldüğünde, **oyun tasarımcıları kapatılamayacak dünyalar inşa etmek için bir fırsat gördüler**. [Conquest.eth'in yaratıcısı Ronan Sandford'un ifade ettiği gibi](https://ronan.eth.limo/blog/infinite-games/): "Ethereum'a rastladığım günden beri, yaratıcısından bağımsız olarak çalışan ve gelişen oyunlar yaratma fikrine bağımlı oldum."

Ethereum blokzinciri, kuralların keyfi olarak değiştirilemediği, durumun silinemediği ve herkesin ağ var olduğu sürece yaşayan eklentiler geliştirebileceği dünyalara olanak tanıdı. Bu, Ethereum'un yerel olarak sağladığı bir şeydir.

## Ethereum'un oyun ekosistemine genel bakış {#ethereums-gaming-ecosystem-overview}

- **Katman 2'ler:** Daha ucuz ücretler ve kısa işlem süreleriyle Ethereum L2'leri, oyunların piyasaya sürülmesi için yaygın bir yer haline geldi. L2 manzarası gelişmeye devam ediyor; Ronin (başlangıçta Axie Infinity için bir yan zincir) gibi önde gelen Web3 oyun ekosistemleri, oyun için optimize edilmiş altyapısını korurken Ethereum'un güvenlik garantilerini devralarak yakın zamanda Ethereum katman 2 mimarisine geçiş yaptı. Oyun için mevcut önde gelen L2'ler şunları içerir: [Ronin](https://www.roninchain.com/), [Starknet](https://www.starknet.io/), [Abstract](https://abs.xyz/), [Immutable](https://www.immutable.com/) ve [Base](https://www.base.org/).
- **Altyapı:** Zincir içi oyunlar geliştirmeyi kolaylaştırmak için bir dizi araç yığını mevcuttur; [Cartridge](https://cartridge.gg/) (oturum anahtarları, ödemeci aracılığıyla gazsız işlemler ve Cartridge Controller üzerinden WebAuthn tabanlı kimlik doğrulama sunar), [Dojo](https://dojoengine.org/) (yerel hesap soyutlama desteğine sahip doğrulanabilir bir oyun çerçevesi), [MUD](https://mud.dev/) (EVM tabanlı bir zincir içi oyun motoru). [Proof of Play](https://proofofplay.com/) ve [Thirdweb](https://thirdweb.com/) gibi diğerleri, geliştiricilerin Web2 benzeri kullanıcı deneyimlerine sahip oyunlar oluşturmasına olanak tanır.
- **Oyun toplulukları:** Ethereum'un oyun ekosistemi, oyuncu iş birliği için oyun loncaları ([YGG](https://x.com/YieldGuild), [MANA Gaming](https://x.com/ManaGamingBR), [WASD](https://x.com/WASD_0x), [LegacyGG](https://x.com/Lgc_GG), [Gaming Grid](https://x.com/GamingGridx) ve [OLAGG](https://x.com/OLAGuildGames) dahil), [GAM3S.GG](https://games.gg/) gibi keşif platformları ve oyun analitiği ile ekosistem kapsamı için [Gaming Daily](https://x.com/GamingDailyx) gibi medya kuruluşları tarafından desteklenmektedir. [FOCGERS](https://x.com/FOCGERS) gibi bazıları ise bunların tümünü kapsar.
- **Oyun türleri:** Belirli oyun türleri, Ethereum blokzincirinin benzersiz özellikleriyle doğal olarak uyum sağlar: **kalıcı durum**, **doğrulanabilir mantık** ve **oyunculara ait ekonomiler**. Geliştiriciler entegrasyona farklı yaklaşırlar. Bazıları tüm mantığın ve durumun blokzincirde yaşadığı tamamen zincir içi oyunlar inşa ederken, diğerleri blokzinciri NFT kozmetikleri gibi varlık sahipliği için asgari düzeyde kullanır. Geliştiriciler, aşağıdakiler de dahil olmak üzere hangi oyun türlerinin zincir içi mimariden en çok yararlandığını keşfediyorlar:
   1. **Zindan Tarayıcıları ve Roguelike'lar:** Loot Survivor'ın doğrulanabilir yüksek skorlara sahip tamamen zincir içi kalıcı ölüm (permadeath) zindanları, Onchain Heroes'un Maze of Gains'i ve labirent keşfini DeFi mekanikleriyle birleştiren Axie: Den of Mysteries adlı Axie temalı yeniden giydirilmiş (reskin) versiyonu.
   2. **MMO'lar:** Cambria'nın güvenli bölgelerin dışındaki her adımın gerçek riskler taşıdığı, PvP ve çıkarma (extraction) mekaniklerine sahip sezonluk kazanmak için risk al (risk-to-earn) MMO'su Gold Rush. ForTheKingdom'ın büyük ölçekli fraksiyon savaşları içeren tamamen zincir içi MMO strateji oyunu. Oyuncuların PvE zindanlarında ve gerçek riskler barındıran PvP savaşlarında mücadele ettiği, Ronin üzerinde zincir içi bir MMO olan Axie Infinity: Atia's Legacy. 
   3. **4X Strateji ve Büyük Strateji:** Oyuncuların filolar üretmek ve ittifaklar kurmak için gezegenlerde token stake ettiği, zincir içi sonsuza dek çalışan izinsiz bir uzay fethi ve diplomasi oyunu olan Conquest.eth. Realms, oyuncuların tamamen oyuncu odaklı bir ekonomi içinde kaynak çıkarmak, ordular kurmak ve karmaşık diplomasiye girmek için Diyarları (arazi NFT'leri) kontrol ettiği fantastik bir ortama Ethereum 4X mekaniklerini getiriyor. Dark Forest, ZK-proof (sıfır bilgi ispatı) savaş sisi mekanikleriyle bu türe öncülük etti ve şu anda DFArchon tarafından bir topluluk çatallanması olarak sürdürülüyor.
   4. **Strateji ve Taktik:** Realms, Blitz'in yoğun 1 saatlik katılım ücretine (buy-in) dayalı strateji maçlarını içerir ve yaklaşmakta olan Asphodel otomatik savaşçısı (autobattler) Ethereum Ana Ağı'nda oyun testinden geçmektedir.
   5. **Koleksiyon Kart Oyunları:** Showdown, koleksiyon kart oyunu stratejisini pokerin yoğunluğuyla birleştirir. Axie Infinity Classic; satranç, poker ve Pokemon'un birleşimidir ve milyonlarca oyuncuya ulaşan ilk Web3 oyunudur.
   6. **Rekabetçi Arenalar:** Oyuncuların ölümüne hızlı tempolu 1v1 düellolarda ETH stake ettiği Cambria'nın Duel Arena'sı. Oyuncuların özelleştirilebilir robotları (mech) kullandığı rekabetçi bir robot savaş arenası olan AveForge.

## Denenebilecek oyunlar {#games}

<CategoryAppsGrid category="gaming" />

## Zincir içi oyunların özellikleri {#features-of-onchain-games}

1. **Dijital ürünleri takas etmenin güvenli yolu**

   Takas edilebilir oyun içi varlıklar, oyuncular arasında diğer oyun içi varlıklar veya o zincirdeki token'lar karşılığında takas edilebilir. Geçmişteki oyunlar, özellikle nadir ve değerli eşyalar için oyuncular arasında adil ticareti kolaylaştırma zorluğuyla sıklıkla karşılaşıyordu. Üçüncü taraf pazar yerleri ve eşler arası ticaret, genellikle oyuncuların yanıltılmasına veya değerli eşyalarının dolandırılmasına yol açıyordu. Zincir içi varlıklar yerleşik bir veri yapısını takip ettiğinden, mevcut pazar yerlerine kolayca entegre edilebilirler ve bu da oyunculara bunları takas ederken gönül rahatlığı sağlar. Otomatik piyasa yapıcılardaki (AMM'ler) ilerlemeler de oyuncuların işlemlerini tamamlamak için bir karşı taraf (alıcı/satıcı) beklemek zorunda kalmadan belirli öğeleri anında takas etmelerine olanak tanır.

2. **Şeffaf varlık kökeni**

   Orijinallerin sahteleri ve kopyaları, özellikle kişi gerçek bir öğeyi sahtesinden nasıl ayırt edeceğine çok aşina değilse, öğelere değer biçerken önemli bir sorun olabilir. Zincir içi varlıklar her zaman onlara kimin (hangi cüzdanın) sahip olduğuna ve köken adreslerine dair eksiksiz bir kayıt geçmişine sahiptir. Öğenin mükemmel bir kopyası zincir içi mevcut olsa bile, köken akıllı sözleşmesine dayalı olarak orijinalinden açıkça ayırt edilir ve dolandırıcılık riskini azaltır.

3. **Şeffaf mantık**

   Tamamen zincir içi oyunlar, işlevsellikleri için akıllı sözleşmeler kullanır. Bu, herkesin oyunun mantığını inceleyip doğrulayabileceği ve geliştiricilerin amaçladığı şekilde çalıştığından emin olabileceği anlamına gelir. Bu mantık şeffaflığı, diğer geliştiricilerin oyunu genişletebilecek veya bazı özellikleriyle entegre edilebilecek yeni akıllı sözleşmeler oluşturmasına da olanak tanır.

4. **Doğrulanabilir başarılar**

   Tamamen zincir içi oyunlarda, her oyuncu eylemi blokzincire kaydedilir. Bu, bir oyuncunun belirli bir dönüm noktası/başarı için gereken eylemleri yapıp yapmadığını kontrol etmeyi ve doğrulamayı çok kolaylaştırır. Blokzincirlerin değişmez doğası gereği, bu başarı kayıtları zincir çalışmaya devam ettiği sürece bozulmadan kalacak ve (geleneksel oyunlarda yaygın olarak görüldüğü gibi sadece geliştiriciler tarafından değil) herhangi bir tarafça doğrulanabilecektir.

5. **Sonsuz oyunlar**

   Oyuncular oyun içi itibarlarını ve karakterlerini oluşturmak için çok fazla zaman ve çaba harcarlar, ancak geliştiriciler sunucuları kapatmaya karar verirse (özellikle çevrimiçi bir oyunsa) bu ilerleme kolayca kaybolabilir. Tamamen zincir içi oyunlar mantıklarını ve durumlarını zincir içi sakladığından, oyunun ana geliştiricisi geliştirmeyi durdursa bile oyuncular oyunun akıllı sözleşmeleriyle etkileşime girmeye devam edebilir. Bu tür oyunlar hala oynanabilir ve mantıkları hala blokzincirde çalıştığı için topluluklarından güncellemeler almaya devam edebilir.

## Oyunlar blokzincirleri nasıl entegre eder {#how-games-integrate-blockchains}

Oyun geliştiricileri, farklı Ethereum özelliklerini oyunlarına dahil etmeye karar verebilirler. Özelliklerin var olması, Ethereum üzerine inşa edilen her oyunun hepsini kullanması gerektiği anlamına gelmez, çünkü geliştiricilerin bunun yerine kullanabileceği (kendi artıları ve eksileri olan) alternatif çözümler mevcuttur.

### Ethereum ile Giriş Yap (Sign-in) {#sign-in-with-ethereum}

Oyuncular oyuna giriş yapmak için zincir içi hesaplarını kullanabilirler. Bu genellikle bir oyuncunun Web3 cüzdanı ile bir işlem imzalama yoluyla kolaylaştırılır. Oyuncular daha sonra aynı cüzdanı kullanarak giriş yaptıkları tüm oyunlarda oyun içi varlıklarını tutabilir ve oyuncu itibarlarını tek bir hesapta taşıyabilirler. Ethereum'un [EVM](/developers/docs/evm/)'si birçok blokzincirde yaygın olarak kullanılan bir standarttır, bu nedenle bir oyuncu genellikle cüzdanın desteklediği herhangi bir EVM uyumlu blokzincirdeki oyunlara giriş yapmak için aynı hesabı kullanabilir (not: bazı Web3 cüzdanları, özellikle daha yeni blokzincirler için, o zincirde herhangi bir şey yapmak için kullanılmadan önce manuel bir RPC içe aktarımı gerektirir).

### Değiştirilebilir token'lar {#fungible-tokens}

Tıpkı Ether gibi, değiştirilebilir oyun içi kaynaklar ve para birimleri zincir içi değiştirilebilir token'lar olarak saklanabilir. Token'lar daha sonra adresler arasında gönderilebilir ve akıllı sözleşmelerde kullanılabilir, bu da oyuncuların açık piyasalarda oyun içi kaynakları ve para birimlerini takas etmelerine veya hediye etmelerine olanak tanır.

### Değiştirilemez token'lar {#non-fungible-tokens}

Değiştirilemez token'lar, zincir içi saklanan farklı özelliklere ve sahiplik kayıtlarına sahip benzersiz dijital varlıkları temsil eder. Ethereum, zincirler arası oyun NFT'lerinin ticareti için baskın genel amaçlı pazar yeri olmaya devam eden [OpenSea](https://opensea.io/) ile en büyük NFT ekosistemine ev sahipliği yapmaktadır. Son gelişmeler, NFT'lerin Axie Infinity'nin Axie'leri gibi statik koleksiyon parçalarının ötesine geçerek zincir içi oyunlar oynamak için kullanılabilecek dinamik, işlevsel dijital varlıklara dönüştüğünü göstermektedir.

Starknet'in Loot Survivor oyunundaki Canavar (Beast) NFT'leri; tür, aşama, seviye, sağlık, savaş türü ve yenilgi geçmişi dahil olmak üzere tamamen zincir içi meta veri depolar. Bu, her NFT'yi **oyun olaylarının doğrulanabilir, kalıcı olarak zincir içi bir kaydı** haline getirir. Bir oyuncu isimlendirilmiş bir Canavarı ilk yenen kişi olduğunda, NFT'yi basar ve o Canavar daha sonra diğer tüm oyuncuların zindanında görünmeye devam eder; o Canavara karşı yaşanan her sonraki ölüm meta verisine kaydedilir ve merkezi sunucular gerektirmeden oyuncular arası etkileşimler yaratır. Oyuncu ölümleri, sahip olunan Canavar NFT'sine ödüller kazandırır. 

Gigaverse'in ROM NFT'leri, zaman içinde malzeme ve kaynak üreten fabrikalar olarak işlev görür. Oyuncular tek bir öğeye sahip olmak yerine üretim altyapısına sahip olabilir, bu da **oyun ekonomilerine tedarik zinciri mekanikleri ve devam eden değer üretimi** sunar. Abstract'ın Cambria 'Core' NFT'leri, oyuncuların evcil hayvanlar ve görünümler basmasına izin vererek mikro işlem modelini tersine çevirir. Core sahipleri Parçalar (Shards) kazanır, yeni kozmetikler yaratmak için bunları yakar ve oyuncu odaklı pazarlarda takas ederken, stüdyo doğrudan satışlar yerine telif haklarından kazanır.  


### Akıllı sözleşmeler {#smart-contracts}

Tamamen zincir içi oyunlar, şeffaf ve değişmez oyun mantığı oluşturmak için akıllı sözleşmeler kullanır. Bu gibi durumlarda blokzincir, oyunun arka ucu (backend) olarak hizmet eder ve mantığını ile veri depolamasını merkezi bir sunucuda barındırma ihtiyacının yerini alır. (Not: tüm Web3 oyunları tamamen zincir içi oyunlar değildir. Daha önce de belirtildiği gibi, oyunun verilerinin ve mantığının ne kadarının zincir içi, ne kadarının başka bir DA katmanında veya klasik bir sunucuda saklandığı duruma göre değişir.)

## Oyuncu kullanıcı deneyimi (UX) iyileştirmelerinin evrimi {#evolution-of-player-ux-improvements}

### Birlikte çalışabilirlik ve zincirler arası oyun {#interoperability-and-cross-chain-play}

Zincirler arası etkileşimler ve köprü kurmadaki ilerlemeler, oyuncuların Ethereum'daki oyunlara her zamankinden daha sorunsuz bir şekilde erişmesine olanak tanır. Oyunlar birden fazla blokzincirde dağıtılabilir ve bir oyunun zincir içi varlıkları başka bir oyun tarafından entegre edilebilir. Geçmişte, oyuncuların oyun içinde kullanmaya başlamadan önce genellikle fonlarını başka bir zincire köprülemeleri gerekiyordu. Günümüzde oyunlar, oyuncuların sisteme katılımını kolaylaştırmak için genellikle diğer zincirlere token köprüleri entegre etmektedir.

### Ölçeklenebilirlik ve gaz ücreti iyileştirmeleri {#scalability-and-gas-fee-improvements}

2017'de CryptoKitties etrafındaki çılgınlık, Ethereum'da işlem yapan tüm kullanıcılar için gaz ücretlerini önemli ölçüde artırdı. O zamandan beri, ağ yükseltmelerinde çok sayıda Ethereum İyileştirme Teklifi başarıyla dağıtıldı, Ethereum Ana Ağı'nın bant genişliği artırıldı ve ortalama işlem ücretleri önemli ölçüde düşürüldü. Katman 2'ler mevcut işlem kapasitesini daha da genişleterek işlem ücretlerini sentlere veya daha da altına düşürür. Daha düşük ücretler ve daha yüksek işlem kapasitesi, Ethereum üzerine inşa edilebilecek oyun kullanım durumlarını genişleterek, yüksek hacimli eylemleri ve günlük oyuncuları fiyatlandırmayan oyun içi mikro işlemleri destekledi.

### Sosyal girişler {#social-logins}

Tüm EVM uyumlu blokzincirlerde kullanılabilen zincir içi bir Ethereum hesabı ile giriş yapmak, en yaygın kimlik doğrulama yöntemlerinden biridir. Bazı EVM dışı zincirler de bunu hesap oluşturmak için bir seçenek olarak kullanır. Ancak, yeni bir oyuncunun mevcut bir Ethereum hesabı yoksa ve bir oyuna giriş yapmak için kolayca bir hesap oluşturmak istiyorsa, [hesap soyutlama](/roadmap/account-abstraction/) sosyal hesaplarıyla giriş yapmalarına ve arka planda bir Ethereum hesabı oluşturmalarına olanak tanır.

### Ödemeci ve oturum anahtarları {#paymaster-and-session-keys}

Zincir içi işlemler göndermek veya akıllı sözleşmelerle etkileşime girmek için gaz ücreti ödemek, birçok yeni oyuncu için önemli bir sürtünme noktası olabilir. Ödemeci hesapları oyuncu tarafından finanse edilebilir veya oyun tarafından sübvanse edilebilir. Oturum anahtarları, oyuncunun oturumunun tamamı boyunca oyunda oturum açmış kalmasına olanak tanır ve yalnızca oturumlarının ilk mesajını imzalamalarını gerektirir, sonraki mesajlar arka planda imzalanır.

Bu mekanikler etrafında zıt felsefeler vardır. Önde gelen bir örnek, oyuncu tarafından ödenen gazı doğrudan gelir olarak ele alan Initia'nın Kamigotchi'sidir. Buna karşılık, Starknet'te 4'ten fazla canlı tamamen zincir içi oyun içeren Realms.World oyun ekosistemi tam tersi bir yaklaşım benimser. Ekosistemdeki tüm oyunlar Cartridge Ödemecisini kullanarak oyuncuların oyunlarla sıfır gaz maliyetiyle etkileşime girmesini sağlar. Kamigotchi gaz ücretlerini ekonomik tasarımın bir parçası olarak benimserken, Realms.World oyunları gaz maliyetlerini öncelikle oyuncu deneyiminin önünde bir engel olarak görür.

## Ethereum'da oyun oynamaya başlayın {#get-started-with-gaming-on-ethereum}

1. **Oynamak için eğlenceli bir oyun bulun** - Yukarıda listelenen oyunlara göz atın veya [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) ve [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games) gibi platformları keşfedin.
2. **Kripto cüzdanınızı kurun** - Oyuncuların dijital oyun içi varlıkları yönetmek ve (bazı durumlarda) oyunlara giriş yapmak için bir cüzdana ihtiyacı vardır. [Buradan bir cüzdan bulun](/wallets/find-wallet/).
3. **Cüzdanınıza fon ekleyin** - Oynamayı planladığınız L2 ağıyla ilgili biraz Ether (ETH) veya token edinin. [ETH'yi nereden alacağınızı buradan öğrenin](/get-eth/). 
4. **Oynayın** - Oynamaya başlayın ve oyun içi ilerlemenizin gerçek sahipliğinin tadını çıkarın!