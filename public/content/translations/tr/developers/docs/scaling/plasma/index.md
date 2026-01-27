---
title: Plazma zincirleri
description: Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak plazma zincirlerine giriş.
lang: tr
incomplete: true
sidebarDepth: 3
---

Plazma zinciri, Ethereum Ana Ağı'na bağlı ayrı bir blokzincirdir fakat işlemleri kendi blok doğrulama mekanizmasıyla zincir dışında yürütür. Plazma zincirleri, esasen Ethereum Ana Ağı'nın daha küçük kopyaları oldukları için bazen "alt" zincirler olarak adlandırılır. Plazma zincirleri, anlaşmazlıkları çözmek için ([iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/) gibi) [sahtecilik kanıtları](/glossary/#fraud-proof) kullanır.

Merkle ağaçları, üst zincirlerdeki (Ethereum Ana Ağı dahil) bant genişliğini boşaltmak için bu zincirlerin sınırsız bir yığınının oluşturulmasını sağlar. Bununla birlikte, bu zincirler Ethereum'dan bir miktar güvenlik (sahtecilik kanıtları aracılığıyla) edinse de, güvenlikleri ve verimlilikleri birkaç tasarım kısıtlamasından etkilenir.

## Ön Koşullar {#prerequisites}

Tüm temel konuları iyi anlamalı ve [Ethereum ölçeklendirmesi](/developers/docs/scaling/) hakkında üst düzey bir anlayışa sahip olmalısınız.

## Plazma nedir?

Plazma, Ethereum gibi halka açık blokzincirlerdeki ölçeklendirmeyi geliştirmek için oluşturulan bir yapıdır. Orijinal [Plazma tanıtım belgesinde](http://plasma.io/plasma.pdf) belirtildiği gibi, Plazma zincirleri ("kök zincir" adı verilen) başka bir blokzincirinin üzerine inşa edilmiştir. Her "alt zincir" kök zincirden büyür ve genelde üst zincirde dağıtılmış bir akıllı sözleşme tarafından yönetilir.

Plazma sözleşmesi, diğer şeylerin yanı sıra, kullanıcıların varlıklarını Ethereum Ana Ağı ile plazma zinciri arasında taşımasına olanak tanıyan bir [köprü](/developers/docs/bridges/) işlevi görür. Bu onları [yan zincirlere](/developers/docs/scaling/sidechains/) benzer kılsa da plazma zincirleri en azından bir ölçüde Ethereum Ana Ağı'nın güvenliğinden yararlanır. Bu, kendi güvenliğinden tamamen kendi sorumlu olan yan zincirlerden farklıdır.

## Plazma nasıl çalışır?

Plazma yapısının basit bileşenleri şunlardır:

### Zincir dışı hesaplama {#offchain-computation}

Ethereum'un şu andaki işlem hızı saniye başına ~ 15-20 işlemle sınırlandırılmıştır, bu da daha fazla kullanıcıyı idare etmek için ölçeklendirmenin kısa vadeli olasılığını azaltır. Bu sorun temel olarak Ethereum'un [mutabakat mekanizmasının](/developers/docs/consensus-mechanisms/) blokzincirinin durumuna ilişkin her güncellemeyi doğrulamak için çok sayıda eşler arası düğüm gerektirmesinden kaynaklanmaktadır.

Ethereum'un mutabakat mekanizması güvenlik için gerekli olsa da, bu her olası olay durum için geçerli olmayabilir. Örnek olarak, iki tarafta da belli bir güven ilişkisi olduğu durumlarda Alice, Bob'a yaptığı günlük kahve ödemesinin Ethereum Ağı'nın tamamı tarafından doğrulanmasına ihtiyaç duymayabilir.

Plazma, Ethereum Ana Ağı'nın tüm işlemleri doğrulamasına gerek olmadığını varsayar. Bunun yerine düğümleri her işlemi doğrulama zorunluluğundan kurtararak işlemleri Ana Ağ dışından yapabiliriz.

Plazma zincirleri hız ve maliyet için optimize edilebildiğinden zincir dışı hesaplama gereklidir. Örnek olarak, Plazma işlemlerin düzenlenmesi ve yürütülmesi için tekli bir operatör kullanabilir; çoğu zaman da böyle olur. İşlemleri doğrulayan sadece bir varlık olunca, plazma zincirindeki işleme süreleri Ethereum Ana Ağı'na göre daha hızlı hale gelir.

### Durum taahhütleri {#state-commitments}

Plazma, işlemleri zincir dışında yürütürken, bunlar ana Ethereum yürütme katmanında sonuçlandırılır; aksi takdirde Plazma zincirleri, Ethereum'un güvenlik garantilerinden yararlanamaz. Ancak zincir dışı işlemleri plazma zincirinin durumunu bilmeden sonuçlandırmak güvenlik modelini bozar ve geçersiz işlemlerin yayılmasına neden olur. Bu yüzden plazma zincirinde blokları oluşturmaktan sorumlu yapı olan operatör, Ethereum'da periyodik olarak "durum taahhütleri" yayımlamalıdır.

Bir [taahhüt şeması](https://en.wikipedia.org/wiki/Commitment_scheme), bir değeri veya beyanı başka bir tarafa açıklamadan taahhüt etmek için kullanılan kriptografik bir tekniktir. Taahhütler siz içine girdikten sonra ifadeleri ya da değerleri değiştiremeyeceğiniz şekilde "bağlayıcı"dır. Plazma'daki durum taahhütleri, operatörün belirli aralıklarla Ethereum zincirindeki Plazma sözleşmesine gönderdiği ([Merkle ağacından](/whitepaper/#merkle-trees) türetilen) "Merkle kökleri" biçimini alır.

Merkle kökleri büyük miktarda bilgiyi sıkıştırmaya yarayan kriptografik parçalardır. Bir Merkle kökü (bu durumda "blok kökü" de denir) bir bloktaki tüm işlemleri temsil edebilir. Merkle kökleri ayrıca küçük bir veri parçasının daha büyük bir veri setinin bir parçası olduğunu doğrulamayı da kolaylaştırır. Örneğin, bir kullanıcı, bir işlemin belirli bir blokta yer aldığını kanıtlamak için bir [Merkle kanıtı](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) üretebilir.

Merkle kökleri, Ethereum'a zincir dışı durum hakkında bilgi sağlamak için önemlidir. Merkle köklerini "kayıt noktaları" olarak düşünebilirsiniz: Operatör şunu söyler: "Plazma zincirinin zamanda x noktasındaki durumu budur ve bu da kanıtı olan Merkle köküdür." Operatör, bir Merkle kökü ile plazma zincirinin _mevcut durumunu_ taahhüt eder, bu nedenle buna "durum taahhüdü" denir.

### Girişler ve çıkışlar {#entries-and-exits}

Ethereum kullanıcılarının Plazmadan faydalanabilmesi için varlıkları Ana Ağ'dan plazma zincirlerine geçiren bir mekanizma olması gerekmektedir. Ama keyfi olarak plazma zincirindeki bir adrese ether gönderemeyiz-; bu zincirler bu konuda uyumsuzdur, bu yüzden işlem ya kayıp kaynaklara gider ya da başarısız olur.

Plazma, kullanıcı giriş ve çıkışlarını işlemek için Ethereum'da bir ana sözleşme kullanır. Bu ana sözleşme ayrıca durum taahhütlerini takip etmede (daha önce açıklanmıştır) ve sahtecilik kanıtıyla (bu konuda başka açıklamalar da yapılacak) sahtecilik davranışlarını cevalandırmaktan da sorumludur.

#### Plazma zincirine giriş {#entering-the-plasma-chain}

Plazma zincirine girmek için Alice (kullanıcı) plazma sözleşmesine ETH ya da herhangi bir ERC-20 jetonu yatırmak zorunda olacaktır. Plazma operatörü, sözleşme depozitolarını inceler, Alice'in başlangıçta yatırdığı miktara eşit bir miktarı yeniden yaratır ve bunu plazma zincirindeki adresine bırakır. Alice, alt zincirde bu fonları aldığını tasdik etmek zorundadır ve bunun ardından bu fonları işlemler için kullanabilir.

#### Plazma zincirinden çıkış {#exiting-the-plasma-chain}

Plazma zincirinden çıkmak, birkaç sebepten dolayı girmekten daha karmaşıktır. Bunlardan en büyüğü, Ethereum'un plazma zincirinin durumundan haberdar olmasına karşın, bu bilginin doğru olup olmadığını kanıtlayamamasıdır. Kötü niyetli bir kullanıcı yanlış bir savda ("1000 ETH'm var) bulunabilir ve savını sahte kanıtlarla desteklemesi yanına kalabilir.

Bu kötü niyetli çekimleri engellemek için bir "itiraz dönemi" devreye alınmıştır. İtiraz döneminde (genelde bir haftadır) herhangi biri sahtecilik kanıtı kullanarak bir çekim talebine itiraz edebilir. İtiraz başarılı olursa, çekim talebi reddedilir.

Buna rağmen, kullanıcılar genelde dürüsttür ve sahip oldukları fonlarla ilgili genelde doğru iddialarda bulunurlar. Bu senaryoda, Alice plazma zincirine bir işlem göndererek kök zincirden (Ethereum) bir çekim talebi oluşturacaktır.

Ayrıca Plazma zincirinde fonlarını yaratan işlemin bir bloğa dahil edildiğini de bir Merkle ispatıyla doğrulamak zorundadır. Bu, [Harcanmamış İşlem Çıktısı (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output) modelini kullanan [Plazma MVP](https://www.learnplasma.org/en/learn/mvp.html) gibi Plazma yinelemeleri için gereklidir.

[Plazma Cash](https://www.learnplasma.org/en/learn/cash.html) gibi diğerleri, fonları UTXO'lar yerine [değiştirilemez jetonlar](/developers/docs/standards/tokens/erc-721/) olarak temsil eder. Bu durumda çekme, Plazma zincirinde jetona sahip olunduğuna dair bir kanıt gerektirir. Bu, jetonu içinde bulunduran son 2 işlemi gönderip bu işlemlerin bir bloğa dahil olduğunu doğrulayan bir Merkle ispatı sağlayarak yapılır.

Kullanıcı, çekim talebine dürüst davranışın garantisi olarak bir teminat eklemek zorundadır. İtiraz eden kişi, Alice'in çekim talebinin geçersiz olduğunu kanıtlarsa, teminatı kesilir ve bir kısmı ödül olarak itiraz edene gider.

İtiraz süresi herhangi biri sahtecilik kanıtı sağlamadan sona ererse, Alice'in geri çekim talebi geçerli sayılır, bu da yatırdıklarını Ethereum üzerindeki Plazma sözleşmesinden geri almasını sağlar.

### Anlaşmazlık tahkimi {#dispute-arbitration}

Her blokzincir gibi, plazma zincirlerinin de katılımcıların kötü niyetli davranması (ör. fonları çifte harcama) durumunda işlemlerin bütünlüğünü sağlamak için bir mekanizmaya ihtiyacı vardır. Bunun için plazma zincirleri durum işlemlerinin doğruluğunu ölçmek ve kötü davranışlara cevaplar vermek amacıyla yaptığı uyuşmazlık hakemliklerinde sahtecilik kanıtlarını kullanır. Sahtecilik kanıtları, Plazma alt zincirlerinin üst zincire ya da kök zincire şikayetler sunması şeklinde bir mekanizma olarak kullanılır.

Bir Sahtecilik kanıtı basitçe belli bir işlemin durumunun geçersiz olduğu iddiasıdır. Bir kullanıcının (Alice) aynı fonları iki kere harcamaya çalışması örnek olarak verilebilir. Belki UTXO'sunu Bob'la yaptığı bir işlemde harcamış ve aynı UTXO'yu (artık Bob'un olan) başka bir işlemde harcamak istiyordur.

Bu çekimi engellemek için Bob, Alice'in bir önceki işlemde UTXO'yu harcadığını ve bu işlemin bir bloğa dahil olduğunu söyleyen bir Merkle kanıtını kullanarak bir sahtecilik kanıtı hazırlayacaktır. Plasma Cash'te de aynı süreç işler; Bob'un, Alice'in şu anda da geri çekmeye çalıştığı jetonları daha önce transfer ettiğine dair kanıt sunması gerekecektir.

Bob'un itirazı başarılı olursa, Alice'in çekim talebi iptal edilir. Bununla birlikte, bu yaklaşım Bob'un çekim taleplerini görmek için zinciri takip etme becerisine dayalıdır. Bob çevrimdışı ise, Alice bu kötü niyetli çekimini itiraz süresi dolduğunda işleme koyabilir.

## Plazmadaki toplu çıkış sorunu {#the-mass-exit-problem-in-plasma}

Toplu çıkış problemi, çok sayıda kullanıcı plazma zincirinden aynı anda çekim yapmayı denediğinde gerçekleşir. Bu sorunun var olmasının nedeni, Plazma'nın en büyük sorunlarından biriyle ilgilidir: **veri kullanılamazlığı**.

Veri kullanılabilirliği, önerilen bir bloğun blokzincir ağında gerçekten yayımlandığına dair bilginin doğrulanması olanağıdır. Bir blok eğer üretici, bloğun kendisini yayımlar fakat bloğun oluşturulmasında kullanılan veriyi saklarsa "erişilemez" olarak adlandırılır.

Bloklar, düğümler bloğu indirebiliyor ve işlemlerin geçerliliğini doğrulayabiliyorsa erişilebilir olmak zorundadır. Blokzincirler, blok üreticilerini tüm işlem verilerini zincir üstünde yayınlamaya zorlayarak veri kullanılabilirliğini sağlar.

Veri kullanılabilirliği, Ethereum'un temel katmanı üzerine inşa edilen zincir dışı ölçeklendirme protokollerinin güvenliğini sağlamaya da yardımcı olur. Bu zincirlerdeki operatörlerin işlem verilerini Ethereum'da yayımlamasını şart koşarak dileyen herkes geçersiz bloklara zincirin doğru durumunu referans alan sahtecilik kanıtları hazırlayarak itiraz edebilir.

Plazma zincirleri, işlem verilerini öncelikli olarak operatörde depolar ve **Ana Ağ'da hiçbir veri yayımlamaz** (yani, periyodik durum taahhütleri dışında). Bu, eğer kullanıcıların geçersiz işlemlere itiraz sahtecilik kanıtları oluşturmaları gerekiyorsa, bunun operatörün blok verisi sağlayıp sağlamadığına bağlı olduğu anlamına gelir. Eğer bu sistem çalışırsa, kullanıcılar kaynakları güvende tutmak için sahtecilik kanıtlarını her zaman kullanabilirler.

Problem, kötü niyetli davranan taraf herhangi bir kullanıcı değil, operatör olduğunda başlar. Blokzincirin kontrolü operatörün elinde olduğu için işin içine daha büyük ölçekte geçersiz durumda işlem sokmak adına plazma zincirindeki kullanıcıların sahip olduğu fonları çalmak gibi daha fazla gerekçesi vardır.

Böyle bir durumda, klasik sahtecilik kanıtı sistemini kullanmak işe yaramaz. Operatör kolayca Alice'in ve Bob'un fonlarını kendi cüzdanına transfer eden geçersiz bir işlem yapabilir ve sahtecilik kanıtını oluşturmak için gereken veriyi saklayabilir. Bunun mümkün olmasının sebebi, operatörün verileri kullanıcılara ya da Ana Ağ'a açık kılmasının zorunlu olmamasıdır.

Bu yüzden, en iyimser çözüm yolu bir plazma zincirden kullanıcı "toplu çıkışı" denemesidir. Toplu çıkış, kötü niyetli operatörün fon çalma planını yavaşlatır ve kullanıcılara belli bir ölçüde güvenlik sağlar. Geri çekim talepleri her bir UTXO'nun (ya da jeton) oluşturulma zamanına göre sıralanarak kötü niyetli operatörlerin dürüst kullanıcılara front-running yapmasını engeller.

Yine de, toplu çıkış sürecindeki geri çekim taleplerinin doğruluğunu onaylamak için bir yola ihtiyacımız vardır; fırsatçı bireylerin geçersiz çıkışlar işlenirken kaostan para kazanmasını engelleyen bir yola. Çözüm basittir: kullanıcıların fonlarını çekmek için **zincirin son geçerli durumunu** göndermelerini gerektirmek.

Ama bu yaklaşımın hala sorunları vardır. Örnek olarak, plazma zincirindeki tüm kullanıcıların çıkması gerekiyorsa (kötü niyetli operatör durumunda bu mümkündür), plazma zincirinin bütün geçerli durumu hemen Ethereum'un temel katmanına boşaltılmak zorundadır. Plazma zincirlerinin keyfi boyutları (yüksek hacim = daha fazla veri) ve Ethereum'daki işleme hızı kısıtlamalarıyla bu pek de ideal bir çözüm değildir.

Çıkış senaryoları teoride kulağa iyi gelse de, gerçek hayattaki toplu çıkışlar muhtemelen Ethereum'un kendisi üzerinde ağ çapında bir sıkışıklığı tetikleyecektir. Kötü koordine edilmiş bir toplu çıkış, Ethereum'un işlevselliğine zarar vermenin yanı sıra kullanıcıların operatör plazma zincirindeki her hesabı boşaltmadan önce fonlarını geri çekemeyebileceği anlamına gelir.

## Plazmanın artıları ve eksileri {#pros-and-cons-of-plasma}

| Artıları                                                                                                                                                                                                                                                            | Eksileri                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yüksek verim ve işlem başına düşük maliyet sunar.                                                                                                                                                                                                   | Genel amaçlı hesaplamayı desteklemez (akıllı sözleşmeleri çalıştıramaz). Yüklem mantığı aracılığıyla yalnızca temel token aktarımları, takaslar ve diğer birkaç işlem türü desteklenir.        |
| Rastgele kullanıcılar arasındaki işlemler için iyi (her ikisi de plazma zincirinde kuruluysa, kullanıcı çifti başına ek yük yoktur)                                                                                                              | Fonlarınızın güvenliğini sağlamak için ağı periyodik olarak izlemeniz (canlılık gereksinimi) veya bu sorumluluğu başka birine devretme ihtiyacı.                                                               |
| Plazma zincirleri, ana zincirle ilgisi olmayan spesifik kullanım durumlarına uyarlanabilir. İşletmeler dahil herkes, farklı bağlamlarda çalışan ölçeklenebilir altyapı sağlamak için Plazma akıllı sözleşmelerini özelleştirebilir. | Verileri depolamak ve talep üzerine sunmak için bir veya daha fazla operatöre ihtiyaç duyar.                                                                                                                                      |
| Hesaplama ve depolamayı zincir dışına taşıyarak Ethereum Ana Ağı üzerindeki yükü azaltır.                                                                                                                                                           | Zorluklara izin vermek için para çekme işlemleri birkaç gün ertelenir. Geri ödenebilir varlıklar için bu, likidite sağlayıcıları tarafından hafifletilebilir, ancak bununla ilişkili bir sermaye maliyeti vardır. |
|                                                                                                                                                                                                                                                                     | Çok fazla kullanıcı aynı anda çıkmaya çalışırsa, Ethereum Mainnet'i tıkanabilir.                                                                                                                                                  |

## Plazma ve katman 2 ölçeklendirme protokolleri {#plasma-vs-layer-2}

Plazma bir zamanlar Ethereum için kullanışlı bir ölçeklendirme çözümü olarak kabul edilse de o zamandan beri [katman 2 (L2) ölçeklendirme protokolleri](/layer-2/) lehine kullanımdan kaldırılmıştır. L2 ölçeklendirme çözümleri, Plazma'nın birkaç problemini çözüyor:

### Verimlilik {#efficiency}

[Sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups), zincir dışında işlenen her işlem grubunun geçerliliğine dair kriptografik kanıtlar oluşturur. Bu, kullanıcıların (ve operatörlerin) geçersiz durum geçişlerini ilerletmesini önleyerek itiraz dönemlerine ve çıkış senaryolarına olan ihtiyacı ortadan kaldırır. Bu, aynı zamanda kullanıcıların fonlarını güvence altına almak için zinciri periyodik olarak izlemelerine gerek kalmayacağı anlamına da gelir.

### Akıllı sözleşmeler için destek {#support-for-smart-contracts}

Plazma çerçevesiyle ilgili bir başka sorun da [Ethereum akıllı sözleşmelerinin yürütülmesini destekleyememesiydi](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Sonuç olarak, Plazma uygulamalarının çoğu çoğunlukla basit ödemeler veya ERC-20 jetonlarının değişimi için oluşturuldu.

Tersine, iyimser toplamalar [Ethereum Sanal Makinesi](/developers/docs/evm/) ile uyumludur ve Ethereum'a özgü [akıllı sözleşmeleri](/developers/docs/smart-contracts/) çalıştırabilir, bu da onları [merkeziyetsiz uygulamaları](/developers/docs/dapps/) ölçeklendirmek için kullanışlı ve _güvenli_ bir çözüm haline getirir. Benzer şekilde, ZK-toplamaların isteğe bağlı mantığı işlemesine ve akıllı sözleşmeleri yürütmesine olanak tanıyacak [EVM'nin (zkEVM) sıfır bilgili bir uygulamasını oluşturma](https://ethresear.ch/t/a-zk-evm-specification/11549) planları devam etmektedir.

### Veri kullanılamazlığı {#data-unavailability}

Daha önce açıklandığı gibi plazmada veri kullanılabilirliği sorunu vardır. Eğer kötü niyetli bir operatör, geçersiz bir geçişi plazma zincirinde ilerletirse sahtecilik kanıtı oluşturmak için gereken verileri saklayabileceği için kullanıcılar buna itiraz edemez. Toplamalar, operatörleri Ethereum'a işlem verilerini göndermeye zorlayarak bu sorunu çözer, böylece herhangi birinin zincirin durumunu doğrulayabilmesine ve gerektiğinde sahtecilik kanıtları oluşturabilmesine olanak tanır.

### Toplu çıkış sorunu {#mass-exit-problem}

Hem ZK toplamalar hem de iyimser toplamalar, Plazma'nın toplu çıkış sorununu çeşitli yollarla çözer. Örneğin ZK toplama, operatörlerin herhangi bir senaryoda kullanıcı fonlarını çalamamalarını sağlayan kriptografik mekanizmalara dayanır.

Benzer şekilde iyimser toplamalar, çekimler üzerinde bir gecikme süresi uygular ve bu süre boyunca herhangi biri itiraz başlatıp kötü niyetli çekim taleplerini engelleyebilir. Bu, Plazma'ya benzer bir yaklaşımdır ancak farklılığı, doğrulayıcıların sahtecilik kanıtları oluşturmak için gereken verilere sahip olmasıdır. Bu nedenle, toplama kullanıcılarının Ethereum Ana Ağı'na yönelik çılgınca "ilk çıkan" geçişine girmelerine gerek yoktur.

## Plazma, yan zincirlerden ve parçalamadan nasıl farklıdır? {#plasma-sidechains-sharding}

Plazma, yan zincirler ve parçalama oldukça benzerdir, çünkü hepsi bir şekilde Ethereum Ana Ağı'na bağlanır. Ancak, bu bağlantıların düzeyi ve gücü değişiklik gösterir ve bu da her ölçeklendirme çözümünün güvenlik özelliklerini etkiler.

### Plazma ve yan zincirler {#plasma-vs-sidechains}

Bir [yan zincir](/developers/docs/scaling/sidechains/), Ethereum Ana Ağı'na iki yönlü bir köprü aracılığıyla bağlanan, bağımsız olarak işletilen bir blokzincirdir. [Köprüler](/bridges/), kullanıcıların iki blokzincir arasında jeton alışverişi yaparak yan zincirde işlem yapmalarını sağlar, bu da Ethereum Ana Ağı'ndaki sıkışıklığı azaltır ve ölçeklenebilirliği artırır.
Yan zincirler ayrı bir mutabakat mekanizması kullanır ve genellikle Ethereum Ana Ağı'ndan çok daha küçüktür. Sonuç olarak, varlıkları bu zincirlere bağlamak, artan risk içerir; yan zincir modelinde Ethereum Ana Ağı'ndan devralınan güvenlik garantilerinin olmaması göz önüne alındığında, kullanıcılar yan zincire yapılacak bir saldırıda fon kaybını riske etmiş olur.

Bunun tersine, plazma zincirleri güvenliklerini Ana Ağ'dan alırlar. Bu, onları yan zincirlerden ölçülebilir şekilde daha güvenli hale getirir. Hem yan zincirler hem de plazma zincirleri farklı mutabakat protokollerine sahip olabilir, ancak aradaki fark, plazma zincirlerinin Ethereum Ana Ağı'ndaki her blok için Merkle kökleri yayımlamasıdır. Blok kökleri, bir plazma zincirinde gerçekleşen işlemler hakkındaki bilgileri doğrulamak için kullanabileceğimiz küçük bilgi parçalarıdır. Plazma zincirine bir saldırı olursa, kullanıcılar uygun kanıtları kullanarak fonlarını güvenli bir şekilde Ana Ağ'a geri çekebilir.

### Plazma ve parçalama {#plasma-vs-sharding}

Hem plazma zincirleri hem de parça zincirleri, Ethereum Ana Ağı'da periyodik olarak kriptografik kanıtlar yayımlar. Ancak her ikisinin de farklı güvenlik özellikleri vardır.

Parça zincirleri, Ana Ağ'a her bir veri parçası hakkında ayrıntılı bilgi içeren "harmanlama başlıkları" gönderir. Ana Ağ'daki düğümler, veri parçalarının geçerliliğini doğrular ve uygular, böylece geçersiz parça geçişleri olasılığını azaltır ve ağı kötü niyetli etkinliklere karşı korur.

Plazma farklıdır; çünkü Ana Ağ, alt zincirlerin durumu hakkında yalnızca minimum düzeyde bilgi alır. Bu, Ana Ağ'ın alt zincirler üzerinde gerçekleştirilen işlemleri etkin bir şekilde doğrulayamadığı ve onları daha az güvenli hale getirdiği anlamına gelir.

**Not:** Ethereum blokzincirini parçalama artık yol haritasında yer almıyor. Onun yerini toplamalar ve [Danksharding](/roadmap/danksharding) yoluyla ölçeklendirme almıştır.

### Plazma kullanın {#use-plasma}

Birden çok proje, merkeziyetsiz uygulamalarınıza entegre edebileceğiniz Plazma uygulamaları sağlar:

- [Polygon](https://polygon.technology/) (önceki adıyla Matic Network)

## Daha fazla kaynak {#further-reading}

- [Plazma hakkında bilgi edinin](https://www.learnplasma.org/en/)
- ["Paylaşılan güvenliğin" ne anlama geldiği ve neden bu kadar önemli olduğuna dair hızlı bir hatırlatma](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Yan Zincirler, Plazma ve Parçalama Karşılaştırması](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Plazma'yı Anlamak, Bölüm 1: Temel Bilgiler](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Plazma'nın Doğuşu ve Ölümü](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
