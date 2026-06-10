---
title: Ethereum yönetişimine giriş
metaTitle: Ethereum Yönetişimi
description: Ethereum hakkındaki kararların nasıl alındığına dair bir giriş.
lang: tr
---

_Hiç kimse [Ethereum](/)'un sahibi değilse, Ethereum'daki geçmiş ve gelecekteki değişiklikler hakkındaki kararlar nasıl alınıyor? Ethereum yönetişimi, bu tür kararların alınmasını sağlayan süreci ifade eder._

<Divider />

## Yönetişim nedir? {#what-is-governance}

Yönetişim, kararların alınmasına olanak tanıyan mevcut sistemlerdir. Tipik bir organizasyon yapısında, karar alma sürecinde son sözü yönetim ekibi veya yönetim kurulu söyleyebilir. Veya belki de hissedarlar, değişikliği yürürlüğe koymak için teklifleri oylarlar. Siyasi bir sistemde, seçilmiş yetkililer seçmenlerinin arzularını temsil etmeye çalışan yasalar çıkarabilirler.

## Merkeziyetsiz yönetişim {#decentralized-governance}

Hiç kimse Ethereum protokolünün sahibi değildir veya onu kontrol etmez, ancak ağın uzun ömürlülüğünü ve refahını en iyi şekilde sağlamak için değişikliklerin uygulanması hakkında yine de kararlar alınması gerekir. Bu sahiplik eksikliği, geleneksel organizasyonel yönetişimi uyumsuz bir çözüm haline getirir.

## Ethereum Yönetişimi {#ethereum-governance}

Ethereum yönetişimi, protokol değişikliklerinin yapıldığı süreçtir. Bu sürecin, insanların ve uygulamaların protokolü nasıl kullandığıyla ilgili olmadığını belirtmek önemlidir - Ethereum izinsizdir. Dünyanın herhangi bir yerinden herkes zincir içi etkinliklere katılabilir. Kimin bir uygulama geliştirebileceği veya bir işlem gönderip gönderemeyeceği konusunda belirlenmiş hiçbir kural yoktur. Ancak, merkeziyetsiz uygulamaların (dapp) üzerinde çalıştığı çekirdek protokole değişiklikler önermek için bir süreç vardır. Çok sayıda insan Ethereum'un istikrarına bağlı olduğundan, Ethereum'daki herhangi bir değişikliğin güvenli olmasını ve topluluk tarafından geniş çapta desteklenmesini sağlamak için sosyal ve teknik süreçler de dahil olmak üzere çekirdek değişiklikler için çok yüksek bir koordinasyon eşiği vardır.

<VideoWatch slug="ethereum-core-governance-explained" />

### Zincir içi ve zincir dışı yönetişim {#onchain-vs-offchain}

Blokzincir teknolojisi, zincir içi yönetişim olarak bilinen yeni yönetişim yeteneklerine olanak tanır. Zincir içi yönetişim, önerilen protokol değişikliklerinin genellikle bir yönetişim token'ı sahipleri tarafından bir paydaş oylamasıyla kararlaştırıldığı ve oylamanın blokzincir üzerinde gerçekleştiği durumdur. Bazı zincir içi yönetişim biçimlerinde, önerilen protokol değişiklikleri zaten kodla yazılmıştır ve paydaşlar bir işlemi imzalayarak değişiklikleri onaylarsa otomatik olarak uygulanır.

Bunun zıttı olan yaklaşım, yani zincir dışı yönetişim, herhangi bir protokol değişikliği kararının, onaylandığı takdirde kodda uygulanacak olan gayriresmi bir sosyal tartışma süreci aracılığıyla gerçekleştiği durumdur.

**Ethereum yönetişimi**, sürece dahil olan çok çeşitli paydaşlarla **zincir dışı gerçekleşir**.

_Protokol düzeyinde Ethereum yönetişimi zincir dışı olsa da, DAO'lar gibi Ethereum üzerine inşa edilen birçok kullanım durumu zincir içi yönetişimi kullanır._

<ButtonLink href="/dao/">
  DAO'lar hakkında daha fazlası
</ButtonLink>

<Divider />

## Kimler dahil? {#who-is-involved}

[Ethereum topluluğunda](/community/), her biri yönetişim sürecinde rol oynayan çeşitli paydaşlar vardır. Protokole en uzak paydaşlardan başlayıp yakından bakacak olursak, şunlar bulunur:

- **Ether sahipleri**: bu kişiler rastgele miktarda ETH tutarlar. [ETH hakkında daha fazlası](/what-is-ether/).
- **Uygulama Kullanıcıları**: bu kişiler Ethereum blokzinciri üzerindeki uygulamalarla etkileşime girerler.
- **Uygulama/Araç Geliştiricileri**: bu kişiler Ethereum blokzinciri üzerinde çalışan uygulamalar (ör. merkeziyetsiz finans (DeFi), NFT'ler vb.) yazarlar veya Ethereum ile etkileşime girmek için araçlar (ör. cüzdanlar, test paketleri vb.) oluştururlar. [Dapp'ler hakkında daha fazlası](/apps/).
- **Düğüm Operatörleri**: bu kişiler, blokları ve işlemleri yayan, karşılaştıkları geçersiz işlemleri veya blokları reddeden düğümleri çalıştırırlar. [Düğümler hakkında daha fazlası](/developers/docs/nodes-and-clients/).
- **EIP Yazarları**: bu kişiler, Ethereum İyileştirme Teklifleri (EIP'ler) biçiminde Ethereum protokolünde değişiklikler önerirler. [EIP'ler hakkında daha fazlası](/eips/).
- **Doğrulayıcılar**: bu kişiler, Ethereum blokzincirine yeni bloklar ekleyebilen düğümleri çalıştırırlar.
- **Protokol Geliştiricileri** (diğer adıyla "Çekirdek Geliştiriciler"): bu kişiler çeşitli Ethereum uygulamalarını (ör. yürütme katmanında go-ethereum, Nethermind, Besu, Erigon, Reth veya mutabakat katmanında Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine) sürdürürler. [Ethereum istemcileri hakkında daha fazlası](/developers/docs/nodes-and-clients/).

_Not: herhangi bir birey bu grupların birden fazlasının parçası olabilir (örneğin, bir protokol geliştiricisi bir EIP'ye öncülük edebilir, bir İşaret zinciri doğrulayıcısı çalıştırabilir ve DeFi uygulamalarını kullanabilir). Yine de kavramsal netlik açısından, bunları birbirinden ayırmak en kolayıdır._

<Divider />

## EIP nedir? {#what-is-an-eip}

Ethereum yönetişiminde kullanılan önemli bir süreç, **Ethereum İyileştirme Tekliflerinin (EIP'ler)** sunulmasıdır. EIP'ler, Ethereum için potansiyel yeni özellikleri veya süreçleri belirleyen standartlardır. Ethereum topluluğundaki herkes bir EIP oluşturabilir. Bir EIP yazmakla veya akran değerlendirmesine ve/veya yönetişime katılmakla ilgileniyorsanız, şuraya bakın:

<ButtonLink href="/eips/">
  EIP'ler hakkında daha fazlası
</ButtonLink>

<Divider />

## Resmi süreç {#formal-process}

Ethereum protokolünde değişiklikler yapmak için resmi süreç aşağıdaki gibidir:

1. **Bir Çekirdek EIP Önerin**: [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips)'de açıklandığı gibi, Ethereum'da resmi olarak bir değişiklik önermenin ilk adımı, bunu bir Çekirdek EIP'de detaylandırmaktır. Bu, kabul edildiği takdirde Protokol Geliştiricilerinin uygulayacağı bir EIP için resmi spesifikasyon görevi görecektir.

2. **EIP'nizi Protokol Geliştiricilerine Sunun**: topluluktan geri bildirim topladığınız bir Çekirdek EIP'niz olduğunda, bunu Protokol Geliştiricilerine sunmalısınız. Bunu, bir [AllCoreDevs çağrısında](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status) tartışmaya sunarak yapabilirsiniz. Muhtemelen bazı tartışmalar [Ethereum Magicians forumunda](https://ethereum-magicians.org/) veya [Ethereum Ar-Ge Discord'unda](https://discord.gg/mncqtgVSVw) eşzamansız olarak zaten gerçekleşmiş olacaktır.

> Bu aşamanın olası sonuçları şunlardır:

> - EIP, gelecekteki bir ağ yükseltmesi için değerlendirilecektir
> - Teknik değişiklikler talep edilecektir
> - Bir öncelik değilse veya iyileştirme, geliştirme çabasına kıyasla yeterince büyük değilse reddedilebilir

3. **Nihai bir teklife doğru yineleyin:** ilgili tüm paydaşlardan geri bildirim aldıktan sonra, güvenliğini artırmak veya çeşitli kullanıcıların ihtiyaçlarını daha iyi karşılamak için muhtemelen ilk teklifinizde değişiklikler yapmanız gerekecektir. EIP'niz gerekli olduğuna inandığınız tüm değişiklikleri içerdiğinde, onu Protokol Geliştiricilerine tekrar sunmanız gerekecektir. Daha sonra bu sürecin bir sonraki adımına geçeceksiniz veya teklifiniz üzerinde başka bir yineleme turu gerektiren yeni endişeler ortaya çıkacaktır.

4. **EIP'nin Ağ Yükseltmesine Dahil Edilmesi**: EIP'nin onaylandığı, test edildiği ve uygulandığı varsayıldığında, bir ağ yükseltmesinin parçası olarak planlanır. Ağ yükseltmelerinin yüksek koordinasyon maliyetleri göz önüne alındığında (herkesin aynı anda yükseltme yapması gerekir), EIP'ler genellikle yükseltmelerde bir araya getirilir.

5. **Ağ Yükseltmesinin Etkinleştirilmesi**: ağ yükseltmesi etkinleştirildikten sonra, EIP Ethereum ağında yayına girecektir. _Not: ağ yükseltmeleri genellikle Ethereum Ana Ağı'nda etkinleştirilmeden önce test ağlarında etkinleştirilir._

Bu akış, çok basitleştirilmiş olsa da, Ethereum'da bir protokol değişikliğinin etkinleştirilmesi için önemli aşamalara genel bir bakış sunar. Şimdi, bu süreçte rol oynayan gayriresmi faktörlere bakalım.

## Gayriresmi süreç {#informal-process}

### Önceki çalışmaları anlamak {#prior-work}

EIP Öncüleri, Ethereum Ana Ağı'nda dağıtım için ciddi şekilde değerlendirilebilecek bir EIP oluşturmadan önce önceki çalışmalara ve tekliflere aşina olmalıdır. Bu şekilde, EIP umarız daha önce reddedilmemiş yeni bir şey getirir. Bunu araştırmak için üç ana yer [EIP deposu](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) ve [ethresear.ch](https://ethresear.ch/)'dir.

### Çalışma grupları {#working-groups}

Bir EIP'nin ilk taslağının, düzenlemeler veya değişiklikler olmadan Ethereum Ana Ağı'nda uygulanması pek olası değildir. Genellikle, EIP Öncüleri tekliflerini belirlemek, uygulamak, test etmek, yinelemek ve son haline getirmek için Protokol Geliştiricilerinin bir alt kümesiyle birlikte çalışırlar. Tarihsel olarak, bu çalışma grupları birkaç ay (ve bazen yıllar!) çalışma gerektirmiştir. Benzer şekilde, bu tür değişiklikler için EIP Öncüleri, son kullanıcı geri bildirimlerini toplamak ve herhangi bir dağıtım riskini azaltmak için çabalarının erken aşamalarında ilgili Uygulama/Araç Geliştiricilerini dahil etmelidir.

### Topluluk mutabakatı {#community-consensus}

Bazı EIP'ler minimum nüansa sahip basit teknik iyileştirmeler olsa da, bazıları daha karmaşıktır ve farklı paydaşları farklı şekillerde etkileyecek ödünleşimlerle birlikte gelir. Bu, bazı EIP'lerin topluluk içinde diğerlerinden daha tartışmalı olduğu anlamına gelir.

Tartışmalı tekliflerin nasıl ele alınacağına dair net bir kural kitabı yoktur. Bu, hiçbir paydaş grubunun diğerini kaba kuvvet yoluyla zorlayamayacağı Ethereum'un merkeziyetsiz tasarımının bir sonucudur: protokol geliştiricileri kod değişikliklerini uygulamamayı seçebilir; düğüm operatörleri en son Ethereum istemcisini çalıştırmamayı seçebilir; uygulama ekipleri ve kullanıcılar zincir üzerinde işlem yapmamayı seçebilir. Protokol Geliştiricilerinin insanları ağ yükseltmelerini benimsemeye zorlamanın bir yolu olmadığından, genellikle tartışmaların daha geniş topluluğa sağlanan faydalardan daha ağır bastığı EIP'leri uygulamaktan kaçınacaklardır.

EIP Öncülerinin ilgili tüm paydaşlardan geri bildirim istemesi beklenir. Kendinizi tartışmalı bir EIP'nin öncüsü olarak bulursanız, EIP'niz etrafında mutabakat oluşturmak için itirazları ele almaya çalışmalısınız. Ethereum topluluğunun büyüklüğü ve çeşitliliği göz önüne alındığında, topluluk mutabakatını ölçmek için kullanılabilecek tek bir metrik (örneğin, bir coin oylaması) yoktur ve EIP Öncülerinin tekliflerinin koşullarına uyum sağlaması beklenir.

Ethereum ağının güvenliğinin ötesinde, Ethereum'u kullanmaları ve üzerinde geliştirme yapmaları ekosistemi diğer paydaşlar için cazip kılan şey olduğundan, Protokol Geliştiricileri tarafından tarihsel olarak Uygulama/Araç Geliştiricilerinin ve Uygulama Kullanıcılarının değer verdiği şeylere önemli bir ağırlık verilmiştir. Ek olarak, EIP'lerin farklı ekipler tarafından yönetilen tüm istemci uygulamalarında uygulanması gerekir. Bu sürecin bir kısmı genellikle birden fazla Protokol Geliştiricisi ekibini belirli bir değişikliğin değerli olduğuna ve son kullanıcılara yardımcı olduğuna veya bir güvenlik sorununu çözdüğüne ikna etmek anlamına gelir.

<Divider />

## Anlaşmazlıkların ele alınması {#disagreements}

Farklı motivasyonlara ve inançlara sahip birçok paydaşın olması, anlaşmazlıkların nadir olmadığı anlamına gelir.

Genellikle anlaşmazlıklar, sorunun kökenini anlamak ve herkesin fikrini belirtmesine olanak tanımak için halka açık forumlarda uzun biçimli tartışmalarla ele alınır. Tipik olarak, bir grup taviz verir veya mutlu bir orta yol bulunur. Bir grup yeterince güçlü hissediyorsa, belirli bir değişikliği zorlamak bir zincir bölünmesiyle sonuçlanabilir. Zincir bölünmesi, bazı paydaşların bir protokol değişikliğinin uygulanmasını protesto etmesi ve bunun sonucunda protokolün farklı, uyumsuz sürümlerinin çalışması ve bunlardan iki farklı blokzincirin ortaya çıkmasıdır.

### DAO çatallanması {#dao-fork}

Çatallanmalar, ağda büyük teknik yükseltmelerin veya değişikliklerin yapılması gerektiği ve protokolün "kurallarını" değiştirdiği durumlardır. [Ethereum istemcileri](/developers/docs/nodes-and-clients/), yeni çatallanma kurallarını uygulamak için yazılımlarını güncellemelidir.

DAO çatallanması, güvensiz bir [DAO](/glossary/#dao) sözleşmesinin bir bilgisayar korsanlığı olayında 3,6 milyondan fazla ETH'sinin boşaltıldığı [2016 DAO saldırısına](https://www.coindesk.com/learn/understanding-the-dao-attack) bir yanıttı. Çatallanma, fonları hatalı sözleşmeden yeni bir sözleşmeye taşıyarak, bilgisayar korsanlığında fon kaybeden herkesin bunları kurtarmasına olanak tanıdı.

Bu hareket tarzı Ethereum topluluğu tarafından oylandı. Herhangi bir ETH sahibi, [bir oylama platformundaki](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) bir işlem aracılığıyla oy kullanabildi. Çatallanma kararı oyların %85'inden fazlasına ulaştı.

Protokolün bilgisayar korsanlığını geri almak için çatallanmasına rağmen, oylamanın çatallanma kararında taşıdığı ağırlığın birkaç nedenden dolayı tartışmaya açık olduğunu belirtmek önemlidir:

- Oylamaya katılım inanılmaz derecede düşüktü
- Çoğu insan oylamanın gerçekleştiğini bilmiyordu
- Oylama, sistemdeki diğer katılımcıları değil, yalnızca ETH sahiplerini temsil ediyordu

Topluluğun bir alt kümesi, büyük ölçüde DAO olayının protokolde bir kusur olmadığını düşündükleri için çatallanmayı reddetti. Daha sonra [Ethereum Classic](https://ethereumclassic.org/)'i kurdular.

Bugün Ethereum topluluğu, sistemin güvenilir tarafsızlığını korumak için sözleşme hataları veya kaybedilen fonlar durumunda müdahale etmeme politikasını benimsemiştir.

DAO saldırısı hakkında daha fazlasını izleyin:

<VideoWatch slug="dao-hack-ethereum-classic" />

<Divider />

### Çatallanmanın faydası {#forking-utility}

Ethereum/Ethereum Classic çatallanması, sağlıklı bir çatallanmanın mükemmel bir örneğidir. Bazı temel değerler konusunda birbirleriyle, kendi özel hareket tarzlarını sürdürmenin içerdiği risklere değeceğini hissedecek kadar güçlü bir şekilde anlaşamayan iki grubumuz vardı.

Önemli siyasi, felsefi veya ekonomik farklılıklar karşısında çatallanma yeteneği, Ethereum yönetişiminin başarısında büyük rol oynar. Çatallanma yeteneği olmasaydı, alternatif, devam eden iç çatışmalar, sonunda Ethereum Classic'i kuranlar için zoraki isteksiz katılım ve Ethereum için başarının nasıl göründüğüne dair giderek farklılaşan bir vizyon olurdu.

<Divider />

## İşaret zinciri yönetişimi {#beacon-chain}

Ethereum yönetişim süreci genellikle açıklık ve kapsayıcılık uğruna hız ve verimlilikten ödün verir. İşaret zincirinin gelişimini hızlandırmak için, İş Kanıtı (PoW) Ethereum ağından ayrı olarak başlatıldı ve kendi yönetişim uygulamalarını izledi.

Spesifikasyon ve geliştirme uygulamaları her zaman tamamen açık kaynaklı olsa da, yukarıda açıklanan güncellemeleri önermek için kullanılan resmi süreçler kullanılmadı. Bu, değişikliklerin araştırmacılar ve uygulayıcılar tarafından daha hızlı belirlenmesine ve üzerinde anlaşmaya varılmasına olanak tanıdı.

İşaret zinciri 15 Eylül 2022'de Ethereum yürütme katmanıyla birleştiğinde, Birleşme [Paris ağ yükseltmesinin](/ethereum-forks/#paris) bir parçası olarak tamamlandı. [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) teklifi 'Son Çağrı'dan 'Nihai'ye değiştirilerek Hisse Kanıtı'na (PoS) geçiş tamamlandı.

<ButtonLink href="/roadmap/merge/">
  Birleşme hakkında daha fazlası
</ButtonLink>

<Divider />

## Nasıl dahil olabilirim? {#get-involved}

- [Bir EIP önerin](/eips/#participate)
- [Mevcut teklifleri tartışın](https://ethereum-magicians.org/)
- [Ar-Ge tartışmalarına katılın](https://ethresear.ch/)
- [Ethereum Ar-Ge Discord'una katılın](https://discord.gg/mncqtgVSVw)
- [Bir düğüm çalıştırın](/developers/docs/nodes-and-clients/run-a-node/)
- [İstemci geliştirmeye katkıda bulunun](/developers/docs/nodes-and-clients/#execution-clients)
- [Çekirdek Geliştirici Çıraklık Programı](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## Daha fazla okuma {#further-reading}

Ethereum'da yönetişim katı bir şekilde tanımlanmamıştır. Çeşitli topluluk katılımcılarının bu konuda farklı bakış açıları vardır. İşte bunlardan birkaçı:

- [Blokzincir Yönetişimi Üzerine Notlar](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Ethereum Yönetişimi nasıl çalışır?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Ethereum yönetişimi nasıl çalışır](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Ethereum çekirdek geliştiricisi nedir?](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Yönetişim, Bölüm 2: Plütokrasi Hala Kötüdür](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Coin oylaması yönetişiminin ötesine geçmek](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [Blokzincir Yönetişimini Anlamak](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [Ethereum Hükümeti](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_