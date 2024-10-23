---
title: Dağıtılmış doğrulayıcı teknolojisi
description: Dağıtılmış doğrulayıcı teknolojisi, bir Ethereum doğrulayıcısının birden fazla tarafta dağıtılmış bir şekilde işletilmesini sağlar.
lang: tr
---

# Dağıtılmış doğrulayıcı teknolojisi {#distributed-validator-technology}

Dağıtılmış doğrulayıcı teknolojisi, tek hata noktalarını (SPOF) azaltmak ve doğrulayıcı güvenilirliğini artırmak için anahtar yönetimi ve imzalama yetkilerini birden fazla tarafa paylaştıran bir doğrulayıcı güvenliği yaklaşımıdır.

Bunu **bir doğrulayıcıyı güvence altına almak için kullanılan kişisel anahtarı** bir "küme" halinde düzenlenmiş **birçok sisteme bölerek yapar.** Bunun faydası, tam olarak hiçbir makinede saklanmadığı için saldırganların anahtara erişimini zorlaştırmasıdır. Ayrıca gerekli imzalamalar her kümedeki sistemlerin bir alt kümesi tarafından yapılabildiği için bazı düğümlerin çevrimdışı olmasına da izin verir. Bu sayede ağdaki tek hata noktaları azalırken doğrulayıcı setin tamamı da daha sağlam hale gelmiş olur.

![Tek bir doğrulayıcı anahtarın nasıl anahtar parçalarına bölündüğünü ve değişen bileşenlerle birlikte birden çok düğüme nasıl dağıtıldığını gösteren bir diyagram.](./dvt-cluster.png)

## DVT'ye neden ihtiyaç duyarız? {#why-do-we-need-dvt}

### Güvenlik {#security}

Doğrulayıcılar iki tane açık-özel anahtar çifti oluşturur: Mutabakata katılmak için doğrulayıcı anahtarlar ve fonlara erişim için para çekme anahtarları. Doğrulayıcılar soğuk depoda para çekme anahtarlarını güvende tutabilirken, doğrulayıcı özel anahtarları 7/24 çevrimiçi olmalıdır. Eğer bir doğrulayıcı özel anahtarın güvenliği ihlal edildiyse bu, saldırgan doğrulayıcıyı kontrol edebilir ve potansiyel olarak tahribe veya paydaşların ETH kaybına yol açar. DVT bu riski azaltmaya yardımcı olabilir. İşte bu şekilde:

Doğrulayıcılar özel anahtarı soğuk depoda tutarken, paydaşlar DVT kullanarak, hisselemeye katılabilir. Bu, orijinal, tam doğrulayıcı anahtarının şifrelenmesi ve daha sonra anahtar paylarına bölünmesiyle elde edilir. Anahtar paylaşımları çevrimiçi haldedir ve birden falza düğüme dağıtılır, bu doğrulayıcının dağıtılmış işlemini mümkün kılar. Bu mümkündür çünkü Ethereum doğrulayıcıları eklenebilir olan BLS imzaları kullanır, yani tam anahtar, bileşen parçalarını toplayarak yeniden yapılandırılabilir. Bu, paydaşa tam, oriijinal "yönetici" doğrulayıcı anahtarını güvenli bir şekilde çevrimdışı tutma olanağını sağlar.

### Tek bir arıza noktası yok {#no-single-point-of-failure}

Bir doğrulayıcı birden çok operatöre ve birden çok makineye bölündüğünde, ayrı donanım ve yazılım arızalarına çevrimdışı olmadan karşı koyabilir. Kümedeki düğümler arasında, çeşitli yazılım ve donanım yapılandırmaları kullanılmasıyla da arıza riski azaltılabilir. Bu direnç, tek düğümlü doğrulayıcı yapılandırmaları için mevcut değildir. DVT katmanından gelmektedir.

Eğer kümedeki bileşenlerden biri devre dışı kalırsa (örneğin, doğrulayıcı kümesinde 4 operatör varsa ve biri, hatası olan spesifik bir istemci kullanıyorsa), diğerleri doğrulayıcının çalışmaya devam etmesini sağlar.

### Merkeziyetsizlik {#decentralization}

Ethereum için ideal senaryo, mümkün olduğunca çok sayıda bağımsız çalışan doğrulayıcıya sahip olmaktır. Ancak, birkaç hisseleme sağlayıcısı çok popüler oldu ve ağdaki hisselenen toplam ETH miktarının büyük bir kısmını oluşturuyor. DVT, kilitin merkeziyetsizliğini korurken, bu operatörlerin var olmasına izin verebilir. Bunun sebebi, her bir doğrulayıcı anahtarının, birçok makineye dağıtılmış durumda olması ve bir doğrulayıcının kötü niyetli hale gelmesi için çok daha büyük gizli anlaşmalar gerektirmesidir.

DVT olmadan, hisse sağlayıcılarının tüm doğrulayıcıları adına sadece bir veya iki istemci yapılandırmasını desteklemesi daha kolaydır ve bu bir istemci hatasının etkisini artırır. DVT, riski birden çok istemci yapılandırmasına ve farklı donanıma yaymak için ve çeşitlilik sağlayarak direnç yaratmak için kullanılabilir.

**DVT, Ethereum'a aşağıdaki avantajları sunar:**

1. Ethereum'un hisse ispatı mutabakatının **merkeziyetsizliği**
2. Ağın **canlılığını** sağlar
3. Doğrulayıcı ** hata toleransı** oluşturur
4. **Minimum düzeyde güven ile **doğrulayıcı işlemi
5. **Minimum düzeyde tahribat** ve süre aksama riski
6. **Çeşitliliği arttırır** (istemci, veri merkezi, konum, düzenleme vb.)
7. Doğrulayıcı anahtar yönetiminin **gelişmiş güvenliği**

## DVT nasıl çalışır? {#how-does-dvt-work}

Bir DVT çözümü aşağıdaki bileşenleri içerir:

- **[Shamir'in gizli paylaşımı](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** -Doğrulayıcılar [BLS anahtarları](https://en.wikipedia.org/wiki/BLS_digital_signature) kullanırlar. Ayrı BSL "anahtar payları" ("anahtar payları") tek bir kümelenmiş anahtarda (imza) birleştirilebilir. DVT'de, odoğrulayıcı için olan özel anahtar her kümedeki operatörün BSL imzasıyla birleştirilmiştir.
- **[Eşik imza şeması](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Ayrı anahtar paylarının imzalama görevlerinin sayısını belirler, ör. 4'ünden 3'ü.
- **[Dağıtılmış anahtar üretimi (DAÜ)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Kriptografik anahtar paylarını üreten ve var olan veya yeni doğrulayıcı anahtarı paylarını hücredeki düğümlere dağıtır.
- **[Çok taraflı hesaplama (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Tam doğrulayıcı anahtarı gizli çok taraflı hesaplama ile üretilir. Tam anahtar asla hiçbir ayrı operatör tarafından bilinmeyecek - Operatörler sadece kendi bölümlerini (kendilerinin "paylarını") bilecekler.
- **Mutabakat protokolü** - Mutabakat protokolü blok önericisi olarak bir düğüm seçer. Bloklarını, anahtar paylarını imzaları birleştirmek için ekleyen diğer düğümlerle bir hücrenin içinde paylaşırlar. Anahtar payları yeteri kadar toplandığında blok, Ethereum üzerinde sunulur.

Dağıtılmış doğrulayıcılar hata toleransı içine yerleşir ve bazı ayrı düğümler çevrimdışı olsa bile çalışmaya devam eder. Bu, hücrenin bazı düğümlerin kötü niyetli veya uyuşuk olması durumuna dahi dayanıklı olduğu anlamına gelir.

## DVT kullanım alanları {#dvt-use-cases}

DVT, daha geniş hisseleme endüstrisi için bariz çıkarımlara sahiptir:

### Solo paydaşlar {#solo-stakers}

Ayrıca DVT, tüm anahtarını tamamen çevrimdışı tutarken doğrulama anahtarını uzaktan düğümlere dağıtmana izin vererek gözetimsiz hisseleme olanağı sunar. Bu ana paydaşların anahtar paylarını dağıtarak potansiyel saldırılara karşı güçlenmeye yardım ederken, yazılım için masraf yapmanın gereklik olmaması anlamına geliyor.

### Bir hizmet olarak stake etme (SaaS) {#saas}

Operatörler (paydaşlık havuzları ve kurumsal paydaşlar gibi) birçok doğrulayıcıyı yönetirken DVT'yi riski azaltmak için kullanabilirler. Arayüzlerini dağıtmayla, operasyonlarına fazlalık ekleyebilir ve kullandıkları donanımı çeşitlendirebilirler.

DVT, anahtar yönetim sorumluluğunu birden fazla düğüm arasında paylaşır, bu da bazı işletme maliyetlerinin de paylaşılabileceği anlamına gelir. DVT aynı zamanda hisseleme sağlayıcıları için işletme riskini ve sigorta maliyetlerini de azaltabilir.

### Stake havuzları {#staking-pools}

Standart doğrulayıcı yapıları nedeniyle, paydaşlık havuzları ve likit hisseleme sağlayıcıları, kazançlar ve kayıplar havuz genelinde paylaşıldığı için farklı düzeylerde tek işletmeci güvenine sahip olmaya zorlanmaktadır. Aynı zamanda, şimdiye kadar başka bir seçenek olmadığı için, imzalama anahtarlarını korumak için işletmelere güvenmek zorundadırlar.

Geleneksel olarak riski dağıtmak amacıyla kilitlerin birden fazla işletmeci arasında dağıtılması için çaba sarf edilmesine rağmen, her işletmeci hâlâ bağımsız bir şekilde önemli bir kilidi yönetir. Tek bir işletmeciye güvenmek, zayıf performans sergilemeleri, işlem dışı kalmaları, güvenlik açıklarıyla karşılaşmaları veya kötü niyetli davranmaları durumunda son derece büyük riskler oluşturur.

DVT kullanıldığında, operatörlerden istenen güven büyük oranda azalır. **Havuzlar operatörlerin doğrulayıcı anahtarlarının velayetine sahip olmadan kilitli tutabilmesinin önünü açarlar** (sadece anahtar hisseleri kullanıldığı için). Ayrıca yönetilen hisselerin operatörler arasında dağıtımını sağlarlar (örneğin 1000 doğrulayıcıyı yöneten tek bir operatöre sahip olmak yerine DVT, bu doğrulayıcıların birden fazla operatör tarafından toplu biçimde yönetilmesini sağlar). Çeşitli operatör konfigürasyonları eğer bir operatör düşerse, diğerlerinin hâlâ doğrulayabileceğini garantiye alacaktır. Bunun sonucu hem ödülleri arttıran, hem de daha iyi performansa ve esnekliğe olanak veren fazlalık ve çeşitliliktir.

Tek operatöre güveni minimize etmenin diğer bir faydası ise hisseleme havuzlarının daha açık ve izin istemeyen operatör katılımına olanak verebilmesidir. Bunu yaparak, servisler risklerini azaltabilir ve örneğin ev ya da daha küçük paydaşları büyükleri ile eşleyerek hem seçili hem de izin istemeyen operatör gruplarını kullanarak Ethereum merkeziyetsizliğini destekleyebilir.

## DVT kullanmanın potansiyel eksileri {#potential-drawbacks-of-using-dvt}

- **Ek bileşen** - Bir DVT düğümü eklemek, hatalı veya saldırıya açık olabilecek başka bir parça ekler. Bundan kaçınmanın bir yolu bir DVT düğümünün birden fazla uygulaması için, yani birden fazla DVT istemcisi için çabalamaktır (tıpkı fikir birliği ve yürütme katmanları için birden fazla istemci olduğu gibi).
- **Operasyonel maliyetler** - DVT doğrulayıcıyı birden fazla taraf arasında dağıttığı için, tek bir düğümdense operasyon için daha fazla düğüm gerekir, bu da artmış operasyon maliyetleri çıkartır.
- **Potansiyel artmış gecikme** - DVT doğrulayıcı yöneten birden fazla düğüm arasında mutabakata ulaşmak amaçlı bir mutabakat protokolü kullandığı için potansiyel olarak artmış gecikme süreleri oluşabilir.

## Daha Fazla Bilgi {#further-reading}

- [Ethereum dağıtılmış doğrulayıcı özellikleri (yüksek seviye)](https://github.com/ethereum/distributed-validator-specs)
- [Ethereum dağıtılmış doğrulayıcı teknik özellikleri](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Shamir gizli paylaşım demo uygulaması](https://iancoleman.io/shamir/)
