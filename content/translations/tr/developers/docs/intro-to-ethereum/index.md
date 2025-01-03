---
title: Ethereum'a Giriş
description: Bir dapp geliştiricisi Ethereum'un temel kavramlarını tanıtıyor.
lang: tr
---

## Blok zinciri nedir? {#what-is-a-blockchain}

Blok zinciri, ağdaki birçok bilgisayarda paylaşılan ve güncellenen açık bir veri tabanıdır.

Peş peşe gruplar hâlinde depolanan veri ve durumlara "Blok" denir. Eğer başka bir kişiye ETH gönderirseniz, işlemin başarılı olması için işlem verisinin bir bloğa eklenmesi gerekir.

"Zincir", bütün blokların üst bloklara kriptografik olarak bağlı olduğunu belirtir. Başka bir deyişle, bloklar birbirlerine zincirlenir. Bir bloktaki veri, sonrasındaki bütün blokları değiştirmeden değişemez: Bu değişiklik, bütün ağın mutabık olmasını gerektirir.

Ağdaki her bilgisayar, her yeni blok ve bir bütün olarak zincir üzerinde anlaşmalıdır. Bu bilgisayarlar "düğümler" olarak bilinir. Düğümler, blok zinciri ile etkileşime giren herkesin aynı verilere sahip olmasını sağlar. Bu dağıtılmış anlaşmayı gerçekleştirmek için blok zincirlerinin bir mutabakat birliği mekanizmasına ihtiyacı var.

Ethereum, [hisse ispatı tabanlı bir mutabakat mekanizması](/developers/docs/consensus-mechanisms/pos/) kullanıyor. Zincire yeni bloklar eklemek isteyen herhangi biri, teminat olarak Ethereum'daki yerel para birimi olan ETH'yi hisselemeli ve doğrulayıcı yazılımını çalıştırmalı. Böylece, bu "doğrulayıcılar" diğer doğrulayıcıların kontrol edip blok zincire eklediği blokları önermek için rastgele seçilebilir. Katılımcıları dürüst ve mümkün olduğunca çevrimiçi erişilebilir olmaya şiddetle teşvik eden bir ödül ve ceza sistemi vardır.

Blok zincir verisinin nasıl şifrelendiğini ve sonrasında blok referanslarının geçmişine nasıl eklendiğini görmek isterseniz, Anders Brownworth tarafından verilen [bu demoyu](https://andersbrownworth.com/blockchain/blockchain) ve ona eşlik eden aşağıdaki videoyu gördüğünüzden emin olun.

Anders'ın blok zincirlerdeki karmaları açıklamasını izleyin:

<YouTube id="_160oMzblY8" />

## Ethereum nedir? {#what-is-ethereum}

Ethereum, içinde gömülü bilgisayar bulunan bir blok zincirdir. Bu blok zincir, uygulamaları ve organizasyonları merkeziyetsiz, izin gerektirmeyen ve sansüre dirençli bir şekilde inşa etmek için varolan bir kuruluştur.

Ethereum evreninde, Ethereum ağındaki herkesin durumu konusunda hemfikir olduğu tek bir kurallı bilgisayar (Ethereum Sanal Makinesi veya EVM olarak adlandırılır) bulunur. Ethereum ağına katılan herkes (her Ethereum düğümü), bu bilgisayarın durumunun bir kopyasını saklar. Ek olarak, herhangi bir katılımcı bu bilgisayarın rastgele hesaplama yapması için bir talep yayınlayabilir. Böyle bir talep yayınlandığında, ağdaki diğer katılımcılar hesaplamayı doğrular, geçerli hale getirir ve gerçekleştirir ("yürütür"). Bu yürütme, tüm ağ boyunca taahhüt edilen ve yayılan EVM'de bir durum değişikliğine neden olur.

Hesaplama taleplerine işlem talepleri denir; Tüm işlemlerin kaydı ve EVM'nin mevcut durumu, sırayla tüm düğümler tarafından depolanan ve üzerinde anlaşmaya varılan blok zincirde depolanır.

Kriptografik mekanizmalar, işlemlerin geçerli olduğu doğrulandıktan ve blok zincirine eklendikten sonra değiştirilemeyeceklerini garanti eder. Aynı mekanizmalar ayrıca tüm işlemlerin uygun "izinler" ile imzalanmasını ve yürütülmesini sağlar (Alice'in kendisi dışında hiç kimse Alice'in hesabından dijital varlık gönderemez).

## Ether nedir? {#what-is-ether}

**Ether (ETH)**, Ethereum'un ana kripto parasıdır. ETH'nin amacı bilgi işlem için bir piyasa oluşmasını sağlamaktır. Böyle bir piyasa, katılımcıların işlem taleplerini doğrulaması ve yürütmesi ve ağa bilgi işlem kaynakları sağlaması için ekonomik bir teşvik sağlar.

Bir işlem talebini yayınlayan herhangi bir katılımcı, ödül olarak ağa bir miktar ETH de teklif etmelidir. Ağ, ödülün bir kısmını yakacak ve geri kalanını nihayetinde işlemi doğrulama, yürütme, blokzincire işleme ve ağa gönderme işini gerçekleştirecek herhangi birine verecektir.

Ödenen ETH miktarı hesaplamanın yapılması için gereken kaynaklara karşılıktır. Bu ödüller aynı zamanda katılmcıların hesaplama kaynakları için ödeme yapması gerektiğinden dolayı zararlı katılımcıların sonsuz hesaplama yürütümü veya diğer kaynak yükü oluşturan betikleri kullanarak kasten ağı tıkamasını engeller.

ETH aynı zamanda ağa kriptoekonomik güvenlik sağlamak için üç ana şekilde kullanılmaktadır: 1) blok öneren veya diğer doğrulayıcılar tarafından aldatıcı davranışları bildiren doğrulayıcıları ödüllendirmek için kullanılır; 2) aldatıcı davranışlara karşı teminat olarak doğrulayıcılar tarafından hisselenir; eğer doğrulayıcılar yanlış davranırlarsa ETH'leri yok edilebilir; 3) yeni önerilmiş bloklar için "oyları" saymak amaçlı kullanılırlar, bu da mutabakat mekanizmasının çatal seçimi kısmına verilir.

## Akıllı sözleşmeler nedir? {#what-are-smart-contracts}

Pratikte, katılımcılar EVM'de her hesaplama isteği gönderdiklerinde yeni kod yazmazlar. Bunun yerine, uygulama geliştiricileri programları (yeniden kullanılabilir kod parçacıkları) EVM durumuna yükler ve kullanıcılar bu kod parçacıklarını değişen parametrelerle yürütmek için talepte bulunur. Yüklenen ve ağ tarafından uygulanan programlara akıllı sözleşme diyoruz.

Çok temel bir düzeyde, bir akıllı sözleşmeyi otomat gibi düşünebiliriz: belli koşullarla çağırılıp, koşullar sağlanıyorsa bazı işler yapan bir kod. Örneğin, basit bir satıcı akıllı sözleşmesi, arayan kişi belirli bir alıcıya ETH gönderirse bir dijital varlığın sahipliğini oluşturabilir ve atayabilir.

Her geliştirici, ağa bir ücret ödeme karşılığında, blok zinciri veri kaynağı şeklinde kullanarak, ağa açık bir akıllı sözleşme oluşturabilir. Herhangi bir kullanıcı daha sonra, yine ağa ödenen bir ücret karşılığında kodunu yürütmek için akıllı sözleşmeyi arayabilir.

Böylece akıllı sözleşmelerle geliştiriciler, pazar yerleri, finansal araçlar, oyunlar vb. gibi, isteğe bağlı olarak karmaşık, kullanıcıya yönelik uygulamalar ve hizmetler oluşturabilir ve dağıtabilir.

## Terminoloji {#terminology}

### Blok zinciri {#blockchain}

Ağın geçmişinde Ethereum ağına bağlı olan tüm blokların sırası. Her blok, tüm bloklar üzerinde (ve dolayısıyla kesin tarih boyunca) bir sıralamayı korumamıza yardımcı olan bir önceki bloka bir referans içerdiği için bu şekilde adlandırılmıştır.

### ETH {#eth}

**Ether (ETH)**, Ethereum'un ana kripto parasıdır. Kullanıcılar, kod yürütme taleplerinin yerine getirilmesi için diğer kullanıcılara ETH öder.

[ETH hakkında daha fazla bilgi](/developers/docs/intro-to-ether/)

### EVM {#evm}

Ethereum Sanal Makinesi, durumu Ethereum ağındaki her katılımcı tarafından saklanan ve hakkında hemfikir olunan global sanal bilgisayardır. Herhangi bir katılımcı, EVM'de rastgele kod yürütülmesini talep edebilir; kod yürütme, EVM'nin durumunu değiştirir.

[EVM hakkında daha fazlası](/developers/docs/evm/)

### Düğümler {#nodes}

EVM durumunu depolayan gerçek hayattaki makineler. Düğümler, EVM durumu ve yeni durum değişiklikleri hakkında bilgi yaymak için birbirleriyle iletişim kurar. Herhangi bir kullanıcı, bir düğümden kod yürütme talebi yayınlayarak da kodun yürütülmesini talep edebilir. Ethereum ağının kendisi, tüm Ethereum düğümlerinin ve bunların iletişimlerinin toplamıdır.

[Düğümler hakkında daha fazla bilgi](/developers/docs/nodes-and-clients/)

### Hesaplar {#accounts}

ETH'nin depolandığı yerdir. Kullanıcılar hesap açabilir, hesaplarına ETH yatırabilir ve hesaplarından diğer kullanıcılara ETH transfer edebilirler. Hesaplar ve hesap bakiyeleri EVM'de büyük bir tabloda saklanır; bunlar genel EVM durumunun bir parçasıdır.

[Hesaplar hakkında daha fazlası](/developers/docs/accounts/)

### İşlemler {#transactions}

Bir "işlem talebi", EVM'de kod yürütme talebinin resmi terimidir ve bir "işlem", yerine getirilmiş bir işlem talebi ve EVM durumundaki ilişkili değişikliktir. Herhangi bir kullanıcı, bir düğümden ağa bir işlem talebi yayınlayabilir. İşlem talebinin üzerinde anlaşılan EVM durumunu etkilemesi için, başka bir düğüm tarafından doğrulanması, yürütülmesi ve "ağa taahhüt edilmesi" gerekir. Herhangi bir kodun yürütülmesi, EVM'de bir durum değişikliğine neden olur; taahhüt üzerine, bu durum değişikliği ağdaki tüm düğümlere yayınlanır. Bazı işlem örnekleri:

- Benim hesabımdan Alice'in hesabına X ETH gönderin.
- EVM durumuna birkaç akıllı sözleşme kodu yayınla.
- Akıllı sözleşmenin kodunu EVM'deki X adresinde Y argümanlarıyla yürüt.

[İşlemler hakkında daha fazla bilgi](/developers/docs/transactions/)

### Bloklar {#blocks}

İşlem hacmi çok yüksektir, bu nedenle işlemler partiler veya bloklar halinde "taahhüt edilir". Bloklar genellikle düzinelerce ila yüzlerce işlem içerir.

[Bloklar hakkında daha fazlası](/developers/docs/blocks/)

### Akıllı sözleşmeler {#smart-contracts}

Bir geliştiricinin EVM durumuna yayınladığı yeniden kullanılabilir bir kod parçacığı (bir program). Herkes bir işlem talebinde bulunarak akıllı sözleşme kodunun yürütülmesini talep edebilir. Geliştiriciler akıllı sözleşmeler yayınlayarak EVM'ye (oyunlar, pazar yerleri, finansal araçlar vb.) keyfi yürütülebilir uygulamalar yazabildikleri için, bu uygulamalara genellikle [dapp veya Merkeziyetsiz Uygulama denir.](/developers/docs/dapps/).

[Akıllı sözleşmeler hakkında daha fazla bilgi](/developers/docs/smart-contracts/)

## Daha fazla bilgi {#further-reading}

- [Ethereum Teknik Raporu](/whitepaper/)
- [Peki, Ethereum nasıl çalışır?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**bkz.** bu kaynak hâlâ değerlidir, ancak [Birleşim](/roadmap/merge) öncesine dayandığı ve bu nedenle Ethereum'un iş ispatı mekanizmasını referans gösterdiği unutulmamalıdır - Ethereum şu anda [hisse ispatı](/developers/docs/consensus-mechanisms/pos) kullanılarak güvence altına alınmıştır)

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili öğreticiler {#related-tutorials}

- [Bir geliştiricinin Ethereum rehberi, bölüm 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/)_- Ethereum'un Python ve web3.py kullanarak acemi dostu bir şekilde keşfi_
