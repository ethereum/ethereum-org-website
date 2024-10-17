---
title: Ethereum Yönetişimi
description: Ethereum ile ilgili kararların nasıl alındığına giriş.
lang: tr
---

# Ethereum yönetişimine giriş {#introduction}

_Hiç kimse Ethereum'un sahibi değilse, Ethereum'a dair geçmişteki ve gelecekteki değişikliklere nasıl karar veriliyor? Ethereum yönetişimi, bu tür kararların alınmasını sağlayan süreci ifade eder._

<Divider />

## Yönetişim nedir? {#what-is-governance}

Yönetişim, kararların alınmasına izin veren mevcut sistemlerdir. Tipik bir organizasyon yapısında, yönetim ekibi veya yönetim kurulu karar vermede son söze sahip olabilir. Ya da hissedarlar değişikliği yürürlüğe koymak için tekliflere oy verebilirler. Siyasi bir sistemde, seçilmiş yetkililer seçmenlerinin arzularını temsil etmeye çalışan yasalar çıkarabilir.

## Merkeziyetsiz yönetişim {#decentralized-governance}

Ethereum protokolünün sahibi veya protokolü yöneten hiç kimse yoktur, ancak ağın uzun ömürlülüğünü ve refahını en iyi şekilde sağlamak için değişikliklerin uygulanması konusunda kararların alınması gerekir. Herhangi bir sahibin bulunmadığı bu durum, geleneksel kurumsal yönetişimi uyumsuz bir çözüm hâline getirir.

## Ethereum Yönetişimi {#ethereum-governance}

Ethereum yönetişimi, protokol değişikliklerinin yapıldığı süreçtir. Bu sürecin, insanların ve uygulamaların protokolü nasıl kullandığıyla ilgili olmadığını belirtmek önemlidir: Ethereum izinsizdir. Dünyanın herhangi bir yerinden herkes zincir içi etkinliklere katılabilir. Kimin uygulama oluşturup oluşturmayacağı veya işlem gönderip gönderemeyeceği konusunda belirlenmiş bir kural yoktur. Ancak, bu merkeziyetsiz uygulamaların üzerinde çalıştığı çekirdek protokolde değişiklik önermek için bir süreç vardır. Pek çok insan Ethereum'un istikrarına güvendiğinden, Ethereum'daki herhangi bir değişikliğin güvenli olmasını ve topluluk tarafından geniş çapta desteklenmesini sağlamak için sosyal ve teknik süreçler de dahil olmak üzere temel değişiklikler için çok yüksek bir koordinasyon eşiği vardır.

### Zincir içi ve zincir dışı yönetişim {#on-chain-vs-off-chain}

Blok zinciri teknolojisi, zincir içi yönetişim olarak bilinen yeni yönetişim kabiliyetlerine izin verir. Zincir içi yönetişim, önerilen protokol değişikliklerine, genellikle bir yönetişim token'ının sahipleri tarafından bir hissedar oyu ile karar verilmesi ve oylamanın blok zincirinde gerçekleşmesidir. Zincir üstünde yönetişimin bazı biçimlerinde, önerilen protokol değişiklikleri zaten koda yazılıdır ve paydaşlar değişiklikleri bir işlemi imzalayarak onaylarsa otomatik olarak uygulanır.

Zıt yaklaşım olan zincir dışı yönetişim, herhangi bir protokol değişikliği kararının resmi olmayan bir sosyal tartışma süreci yoluyla gerçekleştiği ve onaylanması durumunda kodda uygulanacağı yerdir.

**Ethereum yönetişimi zincir dışında gerçekleşir** ve bu sürece birçok hissedar katılır.

_Protokol düzeyinde Ethereum yönetişimi zincir dışı olsa da, DAO'lar gibi Ethereum'un üzerine inşa edilmiş birçok kullanım alanı zincir içi yönetişim kullanır._

<ButtonLink href="/dao/">
  DAO'lar hakkında daha fazla bilgi
</ButtonLink>

<Divider />

## Kimler dahil olur? {#who-is-involved}

[Ethereum topluluğunda](/community/) her biri yönetişim sürecinde rol oynayan çeşitli hissedarlar vardır. Protokolden en uzaktaki hissedarlardan başlayarak ve yakınlaşarak şunları görebiliriz:

- **Ether sahipleri**: Bu kişilerin elinde keyfi miktarda ETH bulunur. [ETH hakkında daha fazla bilgi](/eth/).
- **Uygulama Kullanıcıları**: Bu kişiler, Ethereum blok zincirindeki uygulamalarla etkileşime girer.
- **Uygulama/Araç Geliştiricileri**: Bu kişiler Ethereum blok zincirinde çalışan uygulamalar yazarlar (örneğin DeFi, NFT'ler vb.) veya Ethereum ile etkileşime giren araçlar oluştururlar (örneğin cüzdanlar, test paketleri vb.). [Dapp'ler hakkında daha fazla bilgi](/dapps/).
- **Düğüm Operatörleri**: Bu kişiler, blokları ve işlemleri yayan, karşılaştıkları geçersiz işlemleri veya blokları reddeden düğümleri çalıştırır. [Düğümler hakkında daha fazla bilgi](/developers/docs/nodes-and-clients/).
- **EIP Yazarları**: Bu kişiler, Ethereum İyileştirme Önerileri (EIP'ler) aracılığıyla Ethereum protokolüne değişiklikler yapmayı teklif ederler. [EIP'ler hakkında daha fazla bilgi](/eips/).
- **Doğrulayıcılar**: Bu kişiler, Ethereum blok zincirine yeni bloklar ekleyebilen düğümler çalıştırırlar.
- **Protokol Geliştiricileri** (diğer adıyla "Çekirdek Geliştiriciler" ): Bu kişiler çeşitli Ethereum uygulamalarını (örneğin yürütüm katmanında go-ethereum, Nethermind, Besu, Erigon, Reth veya fikir birliği katmanında Prysm, Lighthouse, Nimbus, Teku, Lodestar) sürdürür. [Ethereum istemcileri hakkında daha fazla bilgi.](/developers/docs/nodes-and-clients/).

_Not: Herhangi bir kişi bu grupların birçoğunun parçası olabilir (örneğin, bir protokol geliştiricisi bir EIP'ye öncülük edebilir, bir işaret zinciri doğrulayıcı çalıştırabilir ve DeFi uygulamalarını kullanabilir). Kavramsal netlik için, aralarında ayrım yapmak en iyisidir._

<Divider />

## EIP nedir? {#what-is-an-eip}

Ethereum yönetişiminde kullanılan önemli süreçlerden birisi **Ethereum İyileştirme Önerileridir (EIP'ler)**. EIP'ler, Ethereum için potansiyel yeni özellikleri veya süreçleri belirleyen standartlardır. Ethereum topluluğu içindeki herkes bir EIP oluşturabilir. Eğer bir EIP yazmaya veya yönetişim ve/veya bağımsız değerlendirmeye katılım sağlamaya meraklıysanız şuna bakın:

<ButtonLink href="/eips/">
  EIP'ler hakkında daha fazla bilgi
</ButtonLink>

<Divider />

## Resmi süreç {#formal-process}

Ethereum protokolünde değişiklik yapmak için resmi süreç aşağıdaki gibidir:

1. **Bir Çekirdek EIP Önerin**: [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips) bölümünde açıklandığı gibi, resmi olarak Ethereum'da bir değişiklik önermenin ilk adımı, bunu bir Çekirdek EIP'de detaylandırmaktır. Bu, kabul edildiği takdirde Protokol Geliştiricilerinin uygulayacağı bir EIP için resmi şartname görevi görecektir.

2. **EIP'nizi Protokol Geliştiricilerine sunun**: Topluluk fikirlerini topladığınız bir Çekirdek EIP'ye sahip olduğunuzda, bunu Protokol Geliştiricilerine sunmalısınız. Bunu, bir [AllCoreDevs çağrısında](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status) tartışmaya sunarak yapabilirsiniz. [Ethereum Magician's forumunda](https://ethereum-magicians.org/) veya [Ethereum R&D Discord'unda](https://discord.gg/mncqtgVSVw) bazı tartışmalar zaten eşzamansız olarak gerçekleşmiş olabilir.

> Bu aşamanın olası sonuçları şunlardır:

> - Gelecekteki bir ağ yükseltmesi için EIP dikkate alınacaktır
> - Teknik değişiklikler istenecektir
> - Öncelikli bir konu değilse veya geliştirme, geliştirme çalışmalarına kıyasla yeterince büyük değilse reddedilebilir

3. **Nihai teklife gelene kadar yineleyin:** İlgili tüm hissedarlardan geri bildirim aldıktan sonra, güvenliğini artırmak veya çeşitli kullanıcıların ihtiyaçlarını daha iyi karşılamak için muhtemelen ilk teklifinizde değişiklikler yapmanız gerekecektir. Gerekli olduğuna inandığınız tüm değişiklikler EIP'nize eklendikten sonra, bunu tekrar Protokol Geliştiricilerine sunmanız gerekecektir. Daha sonra, bu sürecin bir sonraki adımına geçersiniz veya teklifinizi yinelemenizi gerektirecek yeni endişeler ortaya çıkar.

4. **Ağ Yükseltmesine Dahil EIP**: EIP'nin onaylandıktan, test edildikten ve uygulandıktan sonra bir ağ yükseltmesinin parçası olarak planlanır. Ağ yükseltmelerinin yüksek koordinasyon maliyetleri göz önüne alındığında (herkesin aynı anda yükseltme yapması gerekir), EIP'ler genellikle yükseltmelerde birlikte paketlenir.

5. **Ağ Yükseltmesi Etkinleştirildi**: Ağ yükseltmesi etkinleştirildikten sonra EIP, Ethereum ağında kullanıma girecektir. _Not: Ağ yükseltmeleri genellikle Ethereum Mainnet'te etkinleştirilmeden önce test ağlarında etkinleştirilir._

Bu akış, çok basitleştirilmiş olsa da, Ethereum'da bir protokol değişikliğinin etkinleştirilmesi için gereken önemli aşamalara genel bir bakış sunar. Şimdi bu süreçte rol oynayan resmi gayriresmî faktörlere bakalım.

## Gayriresmî süreç {#informal-process}

### Geçmişteki çalışmaları anlamak {#prior-work}

EIP Öncüleri, Ethereum Mainnet'te dağıtım için ciddi olarak düşünülebilecek bir EIP oluşturmadan önce önceki çalışmalara ve tekliflere aşina olmalıdır. Bu şekilde, EIP'nin daha önce reddedilmemiş yeni bir şey sunması umulur. Bunu araştırmak için üç ana yer şunlardır: [EIP deposu](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) ve [ethresear.ch](https://ethresear.ch/).

### Çalışma grupları {#working-groups}

Bir EIP'nin ilk taslağının, düzenleme veya değişiklik yapılmadan Ethereum Mainnet'te uygulanması pek olası değildir. Genel olarak EIP Öncüleri, tekliflerini belirlemek, uygulamak, test etmek, yinelemek ve sonuçlandırmak için Protokol Geliştiricilerinin bir alt kümesiyle birlikte çalışır. Tarihsel olarak, bu çalışma grupları birkaç ay (ve bazen yıllarca!) çalışmayı gerektirmiştir. Benzer şekilde, bu tür değişiklikler için EIP Öncüleri, ilgili Uygulama/Araç Geliştiricilerini son kullanıcı geri bildirimi toplama ve herhangi bir dağıtım riskini azaltma çabalarına erken dahil etmelidir.

### Topluluk mutabakatı {#community-consensus}

Bazı EIP'ler minimum ayrıntılara sahip basit teknik iyileştirmeler olsa da, bazıları daha karmaşıktır ve farklı hissedarları farklı yollarla etkileyecek bazı feragatlarla birlikte gelirler. Bu, bazı EIP'lerin topluluk içinde diğerlerinden daha tartışmalı olduğu anlamına gelir.

Tartışmalı tekliflerin nasıl ele alınacağına dair net bir kural kitabı yok. Bu hiçbir tekil hissedar grubunun bir diğerini kaba kuvvet yoluyla zorlayamayacağı Ethereum'un merkeziyetsiz tasarımının bir sonucudur: Protokol geliştiricileri kod değişiklikleri uygulamamayı seçebilir; düğüm operatörleri en güncel Ethereum istemcisini çalıştırmamayı seçebilir; uygulama takımları ve kullanıcıları zincirde işlem yapmamayı seçebilir. Protokol Geliştiricileri, insanları ağ yükseltmelerini benimsemeye zorlayamayacakları için genellikle tartışmaların topluluğun çoğunluğuna olacak faydadan daha ağır bastığı EIP'leri uygulamaktan kaçınırlar.

EIP Öncülerinin ilgili tüm hissedarlardan geri bildirim talep etmesi beklenir. Tartışmalı bir EIP'nin öncüsüyseniz, EIP'niz hakkında mutabakat oluşturmak için itirazları ele almaya çalışmalısınız. Ethereum topluluğunun büyüklüğü ve çeşitliliği göz önüne alındığında, topluluk fikir birliğini ölçmek için kullanılabilecek tek bir ölçüm (örneğin bir token oyu) yoktur ve EIP Şampiyonlarının tekliflerinin koşullarına uyum sağlaması beklenir.

Ethereum ağının güvenliğinin ötesinde, Ekosistemi diğer hissedarlar için çekici kılan şeyin Ethereum üzerinde kullanımları ve geliştirmeleri olduğu göz önüne alındığında, Protokol Geliştiricileri tarafından Uygulama/Araç Geliştiricilerinin ve Uygulama Kullanıcılarının tarihsel olarak neye değer verdiğine önemli bir ağırlık verilmiştir. Ek olarak, farklı ekipler tarafından yönetilen tüm istemci uygulamalarında EIP'lerin uygulanması gerekir. Bu sürecin bir kısmı genellikle, birden fazla Protokol Geliştirici ekibini belirli bir değişikliğin değerli olduğuna ve son kullanıcılara yardımcı olduğuna veya bir güvenlik sorununu çözdüğüne ikna etmek anlamına gelir.

<Divider />

## Anlaşmazlıkların ele alınması {#disagreements}

Farklı motivasyon ve inançlara sahip birçok hissedar bulunduğu için sık sık anlaşmazlıklarla karşılaşılabilir.

Genel olarak anlaşmazlıklar, sorunun kökenini anlamak ve herkesin durumu ölçmesine izin vermek için halka açık forumlarda uzun süreli tartışmalarla ele alınır. Tipik olarak, bir grup durumu kabul eder veya uygun bir ortak çözüme ulaşılır. Bir grup yeterince güçlü hissediyorsa, belirli bir değişikliği zorlamak zincirin bölünmesine neden olabilir. Zincir bölünmesi, bazı hissedarların, iki farklı blok zincirinin ortaya çıktığı, protokolün farklı, uyumsuz sürümleriyle sonuçlanan bir protokol değişikliğini uygulamayı protesto etmesidir.

### DAO çatalı {#dao-fork}

Çatallar, ağda büyük teknik yükseltmeler veya değişiklikler yapılması ve protokolün "kurallarının" değiştirilmesi gerekmesidir. [Ethereum istemcileri](/developers/docs/nodes-and-clients/) yeni çatal kurallarını uygulamak için yazılımlarını güncellemelidir.

DAO çatalı, güvenli olmayan bir [DAO](/glossary/#dao) sözleşmesinin bir hackte 3,6 milyon ETH boşaltıldığı [2016 DAO saldırısına](https://www.coindesk.com/understanding-dao-hack-journalists) yanıt olarak yapıldı. Çatal, fonları hatalı sözleşmeden yeni bir sözleşmeye taşıdı ve hack sırasında fon kaybeden herkesin fonlarını geri almasını sağladı.

Bu eylem planı, Ethereum topluluğu tarafından oylandı. Tüm ETH sahipleri, [bir oylama platformunda](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/) bir işlem aracılığıyla oy kullanabildi. Çatallanma kararı oyların %85'inden fazlasına ulaştı.

Protokol, hack'in etkilerini geri almak için çatallama yapmış olsa da çatallamaya karar veren oyların ağırlığı birkaç nedenden dolayı tartışmaya açıktır:

- Oylamaya katılım inanılmaz derecede düşüktü
- Çoğu insan oylamanın yapıldığını bilmiyordu
- Oy, sistemdeki diğer katılımcılar olmadan yalnızca ETH sahiplerini temsil etti

Topluluğun bir alt kümesi, büyük ölçüde DAO olayının protokolde bir kusur olmadığını düşündükleri için çatallanmayı reddetti. [Ethereum Classic](https://ethereumclassic.org/)'i oluşturmaya karar verdiler.

Günümüzde Ethereum topluluğu, sistemin güvenilir tarafsızlığını korumak için sözleşme hataları veya kayıp fon durumlarında müdahale etmeme politikası benimsemiştir.

DAO saldırısı hakkında daha fazlasını izleyin:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Çatallamanın faydası {#forking-utility}

Ethereum/Ethereum Classic çatalı, sağlıklı bir çatalın mükemmel bir örneğidir. Kendi spesifik eylem planlarını sürdürmenin içerdiği risklere değdiğini hissedecek kadar bazı temel değerler konusunda birbirleriyle yeterince anlaşamayan iki grubumuz vardı.

Önemli politik, felsefi veya ekonomik farklılıklar karşısında çatallanma kabiliyeti, Ethereum yönetişiminin başarısında büyük rol oynar. Çatallanma kabiliyetinin olmamasının alternatifi: Sürekli devam eden iç tartışmalar, sonunda Ethereum Classic'i oluşturanlar için isteksiz katılım ve Ethereum için başarının ne demek olduğuna dair giderek farklılaşan bir vizyondu.

<Divider />

## İşaret Zinciri yönetişimi {#beacon-chain}

Ethereum yönetişim süreci, genellikle açıklık ve kapsayıcılık için hız ve verimlilikten ödün verir. İşaret Zincirinin gelişimini hızlandırmak için, İşaret Zinciri Ethereum'unun iş ispatı ağından ayrı olarak kullanıma sokuldu ve İşaret Zincirine has yönetişim yöntemleri izlendi.

Tanım ve geliştirme uygulamaları her zaman tamamen açık kaynak olsa da, yukarıda açıklanan güncellemeleri önermek için kullanılan resmi süreçler kullanılmadı. Bu, değişikliklerin araştırmacılar ve uygulayıcılar tarafından daha hızlı belirlenmesine ve üzerinde anlaşmaya varılmasına izin verdi.

İşaret Zinciri 15 Eylül 2022'de Ethereum yürütüm katmanı ile birleştiğinde Birleşim [Paris ağ yükseltmesinin](/history/#paris) bir parçası olarak tamamlanmıştı. [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) önerisi 'Son Çağrı' yerine 'Final' olmuştu ve hisse ispatına geçiş tamamlanmıştı.

<ButtonLink href="/roadmap/merge/">
  Birleştirme hakkında ek bilgi
</ButtonLink>

<Divider />

## Nasıl dahil olabilirim? {#get-involved}

- [Bir EIP önerin](/eips/#participate)
- [Mevcut teklifleri tartışın](https://ethereum-magicians.org/)
- [Ar-Ge tartışmasına katılın](https://ethresear.ch/)
- [Ethereum R&D Discord'una katılın](https://discord.gg/mncqtgVSVw)
- [Bir düğüm çalıştırın](/developers/docs/nodes-and-clients/run-a-node/)
- [İstemci geliştirmeye katkıda bulunun](/developers/docs/nodes-and-clients/#execution-clients)
- [Çekirdek Geliştirici Çıraklık Programı](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Daha fazla bilgi {#further-reading}

Ethereum'daki yönetişimin katı kuralları yoktur. Çeşitli topluluk katılımcıları bu konuda farklı bakış açılarına sahiptir. İşte bunlardan birkaçı:

- [Blokzincir Yönetişimi Üzerine Notlar](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Ethereum yönetişimi nasıl çalışır?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Ethereum yönetişimin çalışması](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Ethereum çekirdek geliştiricisi nedir?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Yönetişim, Bölüm 2: Plütokrasi Hâlâ Kötü](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Parayla oylama yönetişiminin ötesine geçmek](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
