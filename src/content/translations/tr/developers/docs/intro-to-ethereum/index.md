---
title: Ethereum'a giriş
description: Bir dapp geliştiricisi Ethereum'un temel kavramlarını tanıtıyor.
lang: tr
---

## Blok zinciri nedir? {#what-is-a-blockchain}

Blok zinciri, ağdaki birçok bilgisayarda paylaşılan ve güncellenen açık bir veri tabanıdır.

Peş peşe gruplar hâlinde depolanan veri ve durumlara "Blok" denir. Eğer başka bir kişiye ETH gönderirseniz, işlemin başarılı olması için işlem verisinin bir bloğa eklenmesi gerekir.

"Zincir", bütün blokların üst bloklara kriptografik olarak bağlı olduğunu belirtir. Başka bir deyişle, bloklar birbirlerine zincirlenir. Bir bloktaki veri, sonrasındaki bütün blokları değiştirmeden değişemez: Bu değişiklik, bütün ağın mutabık olmasını gerektirir.

Ağdaki her bilgisayar, her yeni blok ve bir bütün olarak zincir üzerinde anlaşmalıdır. Bu bilgisayarlar "düğümler" olarak bilinir. Düğümler, blok zinciri ile etkileşime giren herkesin aynı verilere sahip olmasını sağlar. Bu dağıtılmış anlaşmayı gerçekleştirmek için blok zincirlerinin bir mutabakat birliği mekanizmasına ihtiyacı var.

Ethereum şu anda bir [iş ispatı](/developers/docs/consensus-mechanisms/pow/) mutabakat mekanizması kullanıyor. Bu, zincire yeni bloklar eklemek isteyen herkesin çok fazla bilgi işlem gücü gerektiren zor bir bulmacayı çözmesi gerektiği anlamına gelir. Bulmacayı çözmek, bilgi işlem kaynaklarını kullanarak "iş" yaptığınızı "ispatlar". Bunu yapmak, [madencilik](/developers/docs/consensus-mechanisms/pow/mining/) olarak bilinir. Madencilik genellikle kaba kuvvet tabanlı bir deneme ve yanılma yöntemidir, ancak başarılı bir şekilde blok eklemek ETH kazandırır.

Yeni bloklar ağdaki düğümlere yayınlanır, kontrol edilir ve doğrulanır, böylece blok zincirinin durumu herkes için güncellenir.

Özetlersek, birisine ETH gönderdiğiniz zaman, işlemin madencilik sürecinden geçmesi ve yeni bir bloğa dahil edilmesi gerekir. Sonrasında güncellenmiş durum bütün ağ ile paylaşılır.

Austin'in blok zincirlerini size açıklamasını izleyin:

<YouTube id="zcX7OJ-L8XQ" />

Blok zincirinin verileri nasıl hash'lediğini ve ardından önceki bloğun nasıl tüm geçmiş bloklara referans verdiğini görmek istiyorsanız, Anders Brownworth'un [bu demosuna](https://andersbrownworth.com/blockchain/blockchain) bakmayı ve aşağıdaki videoyu izlemeyi unutmayın.

Anders'ın blok zincirlerdeki hash'leri açıklamasını izleyin:

<YouTube id="_160oMzblY8" />

## Ethereum nedir? {#what-is-ethereum}

Ethereum evreninde, Ethereum ağındaki herkesin durumunu konusunda hemfikir olduğu tek bir kurallı bilgisayar (Ethereum Sanal Makinesi veya EVM olarak adlandırılır) bulunur. Ethereum ağına katılan herkes (her Ethereum düğümü), bu bilgisayarın durumunun bir kopyasını tutar. Ek olarak, herhangi bir katılımcı bu bilgisayarın rastgele hesaplama yapması için bir talep yayınlayabilir. Böyle bir talep yayınlandığında, ağdaki diğer katılımcılar hesaplamayı doğrular, geçerli hâle getirir ve gerçekleştirir ("yürütür"). Bu yürütme, tüm ağ boyunca taahhüt edilen ve yayılan EVM'de bir durum değişikliğine neden olur.

Hesaplama taleplerine işlem talepleri denir; Tüm işlemlerin kaydı ve EVM'nin mevcut durumu, sırayla tüm düğümler tarafından depolanan ve üzerinde anlaşmaya varılan blok zincirinde depolanır.

Kriptografik mekanizmalar, işlemlerin geçerli olduğu doğrulandıktan ve blok zincirine eklendikten sonra değiştirilemeyeceklerini garanti eder. Aynı mekanizmalar ayrıca tüm işlemlerin uygun "izinler" ile imzalanmasını ve yürütülmesini sağlar (Alice'in kendisi dışında hiç kimse Alice'in hesabından dijital varlık gönderemez).

## Ether nedir? {#what-is-ether}

**Ether (ETH)**, Ethereum'un ana kripto parasıdır. Ether'ın amacı, bilgi işlem için bir piyasa oluşmasını sağlamaktır. Böyle bir piyasa, katılımcıların işlem taleplerini doğrulaması ve yürütmesi ve ağa bilgi işlem kaynakları sağlaması için ekonomik bir teşvik sağlar.

Bir işlem talebini yayınlayan herhangi bir katılımcı, ödül olarak ağa bir miktar ether da teklif etmelidir. Bu ödül; işlemi doğrulama, yürütme, blok zincirine taahhüt etme ve ağa yayınlama işini nihayetinde yapan kişiye verilecektir.

Ödenen ether miktarı, hesaplamayı yapmak için gereken süreye karşılık gelir. Bu ödüller aynı zamanda, bu katılımcıların hesaplama süresi için ödeme yapması gerektiğinden kötü niyetli katılımcıların, sonsuz hesaplama veya diğer yoğun kaynak harcayan komut dosyalarının yürütülmesini talep ederek ağı kasıtlı olarak tıkamalarını da önler.

## Akıllı sözleşmeler nedir? {#what-are-smart-contracts}

Pratikte, katılımcılar EVM'de her hesaplama talebi gönderdiklerinde yeni kod yazmazlar. Bunun yerine, uygulama geliştiricileri programları (yeniden kullanılabilir kod parçacıkları) EVM durumuna yükler ve kullanıcılar bu kod parçacıklarını değişen parametrelerle yürütmek için talepte bulunur. Yüklenen ve ağ tarafından uygulanan programlara akıllı sözleşme diyoruz.

Çok temel bir düzeyde, bir akıllı sözleşmeyi bir otomat gibi düşünebiliriz: Belli koşullarla çağırılıp, koşullar sağlanıyorsa bazı işler yapan bir kod. Mesela basit bir satıcı akıllı sözleşmesi, çağıran kişi belirli bir alıcıya ether gönderirse bir dijital varlık oluşturup bu varlığın sahipliğini belirleyebilir.

Her geliştirici, ağa bir ücret ödeme karşılığında, blok zincirini veri kaynağı olarak kullanıp ağa açık bir akıllı sözleşme oluşturabilir. Herhangi bir kullanıcı daha sonra, yine ağa ödenen bir ücret karşılığında kodunu yürütmek için akıllı sözleşmeyi çağırabilir.

Böylece akıllı sözleşmelerle geliştiriciler; pazar yerleri, finansal araçlar, oyunlar vb. gibi, isteğe bağlı olarak karmaşık, kullanıcıya yönelik uygulamalar ve hizmetler oluşturabilir ve dağıtabilir.

## Terminoloji {#terminology}

### Blok zinciri {#blockchain}

Ağın geçmişinde Ethereum ağına taahhüt edilmiş tüm blokların sırası. Her blok, tüm bloklar üzerinde (ve dolayısıyla kesin tarih boyunca) bir sıralamayı korumamıza yardımcı olan bir önceki bloğa bir referans içerdiği için bu şekilde adlandırılmıştır.

### ETH {#eth}

Ethereum'un yerel kripto parası. Kullanıcılar, kod yürütme taleplerinin yerine getirilmesi için diğer kullanıcılara ether öder.

[ETH hakkında daha fazla bilgi](/developers/docs/intro-to-ether/)

### EVM {#evm}

Ethereum Sanal Makinesi, durumu Ethereum ağındaki her katılımcı tarafından saklanan ve hakkında hemfikir olunan global sanal bilgisayardır. Herhangi bir katılımcı, EVM'de rastgele kod yürütülmesini talep edebilir; kod yürütme, EVM'nin durumunu değiştirir.

[EVM hakkında daha fazla bilgi](/developers/docs/evm/)

### Düğümler {#nodes}

EVM durumunu depolayan gerçek hayattaki makineler. Düğümler, EVM durumu ve yeni durum değişiklikleri hakkında bilgi yaymak için birbirleriyle iletişim kurar. Herhangi bir kullanıcı, bir düğümden kod yürütme talebi yayınlayarak da kodun yürütülmesini talep edebilir. Ethereum ağının kendisi, tüm Ethereum düğümlerinin ve bunların iletişimlerinin toplamıdır.

[Düğümler hakkında daha fazla bilgi](/developers/docs/nodes-and-clients/)

### Hesaplar {#accounts}

Etherin depolandığı yerdir. Kullanıcılar hesapları başlatabilir, hesaplarına ether yatırabilir ve hesaplarından diğer kullanıcılara ether aktarabilir. Hesaplar ve hesap bakiyeleri EVM'de büyük bir tabloda saklanır; bunlar genel EVM durumunun bir parçasıdır.

[Hesaplar hakkında daha fazla bilgi](/developers/docs/accounts/)

### İşlemler {#transactions}

Bir "işlem talebi", EVM'de kod yürütme talebinin resmi terimidir ve bir "işlem", yerine getirilmiş bir işlem talebi ve EVM durumundaki ilişkili değişikliktir. Herhangi bir kullanıcı, bir düğümden ağa bir işlem talebi yayınlayabilir. İşlem talebinin üzerinde anlaşılan EVM durumunu etkilemesi için, başka bir düğüm tarafından doğrulanması, yürütülmesi ve "ağa taahhüt edilmesi" gerekir. Herhangi bir kodun yürütülmesi, EVM'de bir durum değişikliğine neden olur; taahhüt üzerine, bu durum değişikliği ağdaki tüm düğümlere yayınlanır. Bazı işlem örnekleri:

- Hesabımdan Alice'in hesabına X tane ether gönder.
- EVM durumuna birkaç akıllı sözleşme kodu yayınla.
- Akıllı sözleşmenin kodunu EVM'deki X adresinde Y argümanlarıyla yürüt.

[İşlemler hakkında daha fazla bilgi](/developers/docs/transactions/)

### Bloklar {#blocks}

İşlem hacmi çok yüksektir, bu nedenle işlemler partiler veya bloklar halinde "taahhüt edilir". Bloklar genellikle düzinelerce ila yüzlerce işlem içerir.

[Bloklar hakkında daha fazla bilgi](/developers/docs/blocks/)

### Akıllı sözleşmeler {#smart-contracts}

Bir geliştiricinin EVM durumuna yayınladığı yeniden kullanılabilir bir kod parçacığı (bir program). Herkes bir işlem talebi yaparak akıllı sözleşme kodunun yürütülmesini talep edebilir. Geliştiriciler akıllı sözleşmeler yayınlayarak EVM'ye (oyunlar, pazar yerleri, finansal araçlar vb.) keyfi yürütülebilir uygulamalar yazabildikleri için, bu uygulamalara genellikle [dapp veya Merkeziyetsiz Uygulama denir.](/developers/docs/dapps/).

[Akıllı sözleşmeler hakkında daha fazla bilgi](/developers/docs/smart-contracts/)

## Daha fazla bilgi {#further-reading}

- [Ethereum Teknik Raporu](/whitepaper/)
- [Ethereum nasıl çalışıyor sahiden?](https://www.preethikasireddy.com/post/how-does-ethereum-work-anyway) - _Preethi Kasireddy_

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## İlgili öğreticiler {#related-tutorials}

- [Bir geliştiricinin Ethereum kılavuzu, 1. bölüm](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _Yeni başlayanlar için Python ve web3.py kullanarak hazırlanmış bir Ethereum tanıtımı_
