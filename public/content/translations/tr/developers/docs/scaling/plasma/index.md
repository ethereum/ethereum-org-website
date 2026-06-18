---
title: Plasma zincirleri
description: "Ethereum topluluğu tarafından şu anda kullanılan bir ölçeklendirme çözümü olan Plasma zincirlerine giriş."
lang: tr
incomplete: true
sidebarDepth: 3
---

Bir Plasma zinciri, [Ethereum](/) Ana Ağına bağlı olan ancak işlemleri kendi blok doğrulama mekanizmasıyla zincir dışı yürüten ayrı bir blokzincirdir. Plasma zincirleri bazen "çocuk" zincirler olarak adlandırılır ve esasen Ethereum Ana Ağının daha küçük kopyalarıdır. Plasma zincirleri, anlaşmazlıkları çözmek için ([iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/) gibi) [sahtekarlık kanıtları](/glossary/#fraud-proof) kullanır.

Merkle ağaçları, ebeveyn zincirlerden (Ethereum Ana Ağı dahil) bant genişliği yükünü hafifletmek için çalışabilen bu zincirlerin sonsuz bir yığınının oluşturulmasını sağlar. Ancak, bu zincirler Ethereum'dan (sahtekarlık kanıtları aracılığıyla) bir miktar güvenlik elde etse de, güvenlikleri ve verimlilikleri çeşitli tasarım sınırlamalarından etkilenir.

## Ön koşullar {#prerequisites}

Tüm temel konuları iyi bir şekilde anlamış olmalı ve [Ethereum ölçeklendirmesi](/developers/docs/scaling/) hakkında üst düzey bir anlayışa sahip olmalısınız.

## Plasma nedir? {#what-is-plasma}

Plasma, Ethereum gibi halka açık blokzincirlerde ölçeklenebilirliği artırmak için bir çerçevedir. Orijinal [Plasma tanıtım belgesinde](https://plasma.io/plasma.pdf) açıklandığı gibi, Plasma zincirleri başka bir blokzincirin ("kök zincir" olarak adlandırılır) üzerine inşa edilir. Her "çocuk zincir" kök zincirden uzanır ve genellikle ebeveyn zincirde dağıtılan bir akıllı sözleşme tarafından yönetilir.

Plasma sözleşmesi, diğer şeylerin yanı sıra, kullanıcıların Ethereum Ana Ağı ile Plasma zinciri arasında varlık taşımasına olanak tanıyan bir [köprü](/developers/docs/bridges/) işlevi görür. Bu onları [yan zincirlere](/developers/docs/scaling/sidechains/) benzer kılsa da, Plasma zincirleri—en azından bir dereceye kadar—Ethereum Ana Ağının güvenliğinden faydalanır. Bu, yalnızca kendi güvenliklerinden sorumlu olan yan zincirlerden farklıdır.

## Plasma nasıl çalışır? {#how-does-plasma-work}

Plasma çerçevesinin temel bileşenleri şunlardır:

### Zincir dışı hesaplama {#offchain-computation}

Ethereum'un mevcut işlem hızı saniyede ~ 15-20 işlemle sınırlıdır ve bu da daha fazla kullanıcıyı idare edecek şekilde ölçeklenme olasılığını kısa vadede azaltır. Bu sorun temel olarak Ethereum'un [mutabakat mekanizmasının](/developers/docs/consensus-mechanisms/), blokzincirin durumuna yapılan her güncellemeyi doğrulamak için birçok eşler arası düğüm gerektirmesinden kaynaklanmaktadır.

Ethereum'un mutabakat mekanizması güvenlik için gerekli olsa da, her kullanım durumu için geçerli olmayabilir. Örneğin, Alice'in Bob'a bir fincan kahve için yaptığı günlük ödemelerin tüm Ethereum ağı tarafından doğrulanmasına gerek olmayabilir, çünkü her iki taraf arasında bir miktar güven vardır.

Plasma, Ethereum Ana Ağının tüm işlemleri doğrulamasına gerek olmadığını varsayar. Bunun yerine, işlemleri Ana Ağ dışında işleyebilir ve düğümleri her işlemi doğrulama zorunluluğundan kurtarabiliriz.

Plasma zincirleri hız ve maliyet için optimize edilebildiğinden zincir dışı hesaplama gereklidir. Örneğin, bir Plasma zinciri işlemlerin sıralanmasını ve yürütülmesini yönetmek için tek bir "operatör" kullanabilir—ve çoğunlukla kullanır. İşlemleri doğrulayan tek bir varlık olduğunda, bir Plasma zincirindeki işlem süreleri Ethereum Ana Ağındakinden daha hızlıdır.

### Durum taahhütleri {#state-commitments}

Plasma işlemleri zincir dışı yürütürken, bunlar ana Ethereum yürütme katmanında uzlaştırılır—aksi takdirde Plasma zincirleri Ethereum'un güvenlik garantilerinden faydalanamaz. Ancak Plasma zincirinin durumunu bilmeden zincir dışı işlemleri kesinleştirmek güvenlik modelini bozar ve geçersiz işlemlerin çoğalmasına izin verir. Bu nedenle, Plasma zincirinde blok üretmekten sorumlu varlık olan operatörün, Ethereum üzerinde periyodik olarak "durum taahhütleri" yayınlaması gerekir.

Bir [taahhüt şeması](https://en.wikipedia.org/wiki/Commitment_scheme), bir değeri veya ifadeyi başka bir tarafa ifşa etmeden taahhüt etmek için kullanılan kriptografik bir tekniktir. Taahhütler, bir kez taahhüt ettikten sonra değeri veya ifadeyi değiştiremeyeceğiniz anlamında "bağlayıcıdır". Plasma'daki durum taahhütleri, operatörün Ethereum zincirindeki Plasma sözleşmesine aralıklarla gönderdiği "Merkle kökleri" (bir [Merkle ağacından](/whitepaper/#merkle-trees) türetilen) şeklini alır.

Merkle kökleri, büyük miktarda bilginin sıkıştırılmasını sağlayan kriptografik ilkellerdir. Bir Merkle kökü (bu durumda "blok kökü" olarak da adlandırılır) bir bloktaki tüm işlemleri temsil edebilir. Merkle kökleri ayrıca küçük bir veri parçasının daha büyük veri kümesinin bir parçası olduğunu doğrulamayı kolaylaştırır. Örneğin, bir kullanıcı bir işlemin belirli bir bloğa dahil edildiğini kanıtlamak için bir [Merkle kanıtı](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) üretebilir.

Merkle kökleri, zincir dışı durum hakkında Ethereum'a bilgi sağlamak için önemlidir. Merkle köklerini "kayıt noktaları" olarak düşünebilirsiniz: operatör, "Bu, x anındaki Plasma zincirinin durumudur ve bu da kanıt olarak Merkle köküdür" demektedir. Operatör, bir Merkle kökü ile Plasma zincirinin _mevcut durumunu_ taahhüt etmektedir, bu nedenle buna "durum taahhüdü" denir.

### Girişler ve çıkışlar {#entries-and-exits}

Ethereum kullanıcılarının Plasma'dan faydalanabilmesi için, Ana Ağ ile Plasma zincirleri arasında fon taşımak için bir mekanizma olması gerekir. Ancak Plasma zincirindeki bir adrese keyfi olarak Ether gönderemeyiz—bu zincirler uyumsuzdur, bu nedenle işlem ya başarısız olur ya da fonların kaybolmasına yol açar.

Plasma, kullanıcı girişlerini ve çıkışlarını işlemek için Ethereum üzerinde çalışan bir ana sözleşme kullanır. Bu ana sözleşme aynı zamanda durum taahhütlerini izlemekten (daha önce açıklanmıştı) ve sahtekarlık kanıtları aracılığıyla dürüst olmayan davranışları cezalandırmaktan (buna daha sonra değinilecektir) sorumludur.

#### Plasma zincirine giriş {#entering-the-plasma-chain}

Plasma zincirine girmek için Alice'in (kullanıcı) Plasma sözleşmesine ETH veya herhangi bir ERC-20 Token yatırması gerekecektir. Sözleşme yatırımlarını izleyen Plasma operatörü, Alice'in ilk yatırdığı tutara eşit bir miktar yeniden oluşturur ve bunu Plasma zincirindeki adresine serbest bırakır. Alice'in çocuk zincirde fonları aldığını onaylaması gerekir ve ardından bu fonları işlemler için kullanabilir.

#### Plasma zincirinden çıkış {#exiting-the-plasma-chain}

Plasma zincirinden çıkmak, çeşitli nedenlerden dolayı girmekten daha karmaşıktır. En büyük neden, Ethereum'un Plasma zincirinin durumu hakkında bilgiye sahip olmasına rağmen, bilginin doğru olup olmadığını doğrulayamamasıdır. Kötü niyetli bir kullanıcı yanlış bir iddiada bulunabilir ("1000 ETH'm var") ve bu talebi desteklemek için sahte kanıtlar sunarak bundan sıyrılabilir.

Kötü niyetli çekim işlemlerini önlemek için bir "itiraz süresi" getirilmiştir. İtiraz süresi boyunca (genellikle bir hafta), herkes bir sahtekarlık kanıtı kullanarak bir çekim talebine itiraz edebilir. İtiraz başarılı olursa, çekim talebi reddedilir.

Ancak, genellikle kullanıcılar dürüsttür ve sahip oldukları fonlar hakkında doğru taleplerde bulunurlar. Bu senaryoda Alice, Plasma sözleşmesine bir işlem göndererek kök zincirde (Ethereum) bir çekim talebi başlatacaktır.

Ayrıca, Plasma zincirinde fonlarını oluşturan bir işlemin bir bloğa dahil edildiğini doğrulayan bir Merkle kanıtı sunmalıdır. Bu, [UTXO](https://en.wikipedia.org/wiki/Unspent_transaction_output) modelini kullanan [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html) gibi Plasma yinelemeleri için gereklidir.

[Plasma Cash](https://www.learnplasma.org/en/learn/cash.html) gibi diğerleri, fonları UTXO'lar yerine [değiştirilemez token'lar](/developers/docs/standards/tokens/erc-721/) olarak temsil eder. Bu durumda çekim işlemi, Plasma zincirindeki Token'ların sahiplik kanıtını gerektirir. Bu, Token'ı içeren en son iki işlemin gönderilmesi ve bu işlemlerin bir bloğa dahil edildiğini doğrulayan bir Merkle kanıtı sağlanmasıyla yapılır.

Kullanıcı ayrıca dürüst davranışın bir garantisi olarak çekim talebine bir teminat eklemelidir. Bir itirazcı Alice'in çekim talebinin geçersiz olduğunu kanıtlarsa, teminatında kesinti yapılır ve bir kısmı ödül olarak itirazcıya gider.

İtiraz süresi kimse bir sahtekarlık kanıtı sunmadan geçerse, Alice'in çekim talebi geçerli kabul edilir ve Ethereum'daki Plasma sözleşmesinden yatırdığı fonları geri almasına olanak tanır.

### Anlaşmazlık tahkimi {#dispute-arbitration}

Herhangi bir blokzincir gibi, Plasma zincirlerinin de katılımcıların kötü niyetli davranması (örneğin, fonların çifte harcaması) durumunda işlemlerin bütünlüğünü sağlamak için bir mekanizmaya ihtiyacı vardır. Bu amaçla, Plasma zincirleri durum geçişlerinin geçerliliğine ilişkin anlaşmazlıkları çözmek ve kötü davranışları cezalandırmak için sahtekarlık kanıtları kullanır. Sahtekarlık kanıtları, bir Plasma çocuk zincirinin ebeveyn zincirine veya kök zincirine şikayette bulunduğu bir mekanizma olarak kullanılır.

Bir sahtekarlık kanıtı, basitçe belirli bir durum geçişinin geçersiz olduğuna dair bir iddiadır. Bir kullanıcının (Alice) aynı fonları iki kez harcamaya çalışması buna bir örnektir. Belki UTXO'yu Bob ile yaptığı bir işlemde harcadı ve aynı UTXO'yu (artık Bob'un olan) başka bir işlemde harcamak istiyor.

Çekim işlemini önlemek için Bob, Alice'in söz konusu UTXO'yu önceki bir işlemde harcadığına dair kanıt ve işlemin bir bloğa dahil edildiğine dair bir Merkle kanıtı sunarak bir sahtekarlık kanıtı oluşturacaktır. Aynı süreç Plasma Cash'te de işler—Bob'un, Alice'in çekmeye çalıştığı Token'ları daha önce transfer ettiğine dair kanıt sunması gerekir.

Bob'un itirazı başarılı olursa, Alice'in çekim talebi iptal edilir. Ancak bu yaklaşım, Bob'un çekim talepleri için zinciri izleme yeteneğine dayanır. Bob çevrimdışıysa, Alice itiraz süresi dolduğunda kötü niyetli çekim işlemini gerçekleştirebilir.

## Plasma'da kitlesel çıkış sorunu {#the-mass-exit-problem-in-plasma}

Kitlesel çıkış sorunu, çok sayıda kullanıcının aynı anda bir Plasma zincirinden çekim yapmaya çalışmasıyla ortaya çıkar. Bu sorunun neden var olduğu, Plasma'nın en büyük sorunlarından biriyle ilgilidir: **veri kullanılamazlığı**.

Veri kullanılabilirliği, önerilen bir blok için bilgilerin blokzincir ağında gerçekten yayınlandığını doğrulama yeteneğidir. Üretici bloğun kendisini yayınlar ancak bloğu oluşturmak için kullanılan verileri saklarsa bir blok "kullanılamaz" olur.

Düğümlerin bloğu indirebilmesi ve işlemlerin geçerliliğini doğrulayabilmesi için blokların kullanılabilir olması gerekir. Blokzincirler, blok üreticilerini tüm işlem verilerini zincir içi yayınlamaya zorlayarak veri kullanılabilirliğini sağlar.

Veri kullanılabilirliği ayrıca Ethereum'un temel katmanı üzerine inşa edilen zincir dışı ölçeklendirme protokollerinin güvenliğini sağlamaya yardımcı olur. Bu zincirlerdeki operatörleri işlem verilerini Ethereum'da yayınlamaya zorlayarak, herkes zincirin doğru durumuna atıfta bulunan sahtekarlık kanıtları oluşturarak geçersiz bloklara itiraz edebilir.

Plasma zincirleri işlem verilerini öncelikle operatörde depolar ve **Ana Ağda hiçbir veri yayınlamaz** (yani, periyodik durum taahhütleri dışında). Bu, kullanıcıların geçersiz işlemlere itiraz eden sahtekarlık kanıtları oluşturmaları gerekiyorsa blok verilerini sağlamak için operatöre güvenmeleri gerektiği anlamına gelir. Bu sistem çalışırsa, kullanıcılar fonları güvence altına almak için her zaman sahtekarlık kanıtlarını kullanabilirler.

Sorun, sadece herhangi bir kullanıcı değil, operatörün kötü niyetli davranan taraf olmasıyla başlar. Operatör blokzincirin tek kontrolüne sahip olduğundan, Plasma zincirindeki kullanıcılara ait fonları çalmak gibi daha büyük ölçekte geçersiz durum geçişlerini ilerletmek için daha fazla teşvike sahiptir.

Bu durumda, klasik sahtekarlık kanıtı sistemini kullanmak işe yaramaz. Operatör, Alice ve Bob'un fonlarını kendi cüzdanına aktaran geçersiz bir işlemi kolayca yapabilir ve sahtekarlık kanıtı oluşturmak için gerekli verileri gizleyebilir. Bu mümkündür çünkü operatörün verileri kullanıcılara veya Ana Ağa sunması gerekmez.

Bu nedenle, en iyimser çözüm kullanıcıların Plasma zincirinden "kitlesel çıkış" yapmaya çalışmasıdır. Kitlesel çıkış, kötü niyetli operatörün fon çalma planını yavaşlatır ve kullanıcılar için bir miktar koruma sağlar. Çekim talepleri, her bir UTXO'nun (veya Token'ın) ne zaman oluşturulduğuna göre sıralanır ve kötü niyetli operatörlerin dürüst kullanıcılardan önden koşmasını önler.

Yine de, kitlesel bir çıkış sırasında çekim taleplerinin geçerliliğini doğrulamanın bir yoluna ihtiyacımız var—fırsatçı bireylerin geçersiz çıkışları işleyerek kaostan faydalanmasını önlemek için. Çözüm basittir: kullanıcıların paralarını çıkarmak için **zincirin son geçerli durumunu** yayınlamalarını gerektirir.

Ancak bu yaklaşımın hala sorunları var. Örneğin, bir Plasma zincirindeki tüm kullanıcıların çıkması gerekiyorsa (kötü niyetli bir operatör durumunda bu mümkündür), o zaman Plasma zincirinin tüm geçerli durumu tek seferde Ethereum'un temel katmanına dökülmelidir. Plasma zincirlerinin keyfi boyutu (yüksek işlem kapasitesi = daha fazla veri) ve Ethereum'un işlem hızlarındaki kısıtlamalar göz önüne alındığında, bu ideal bir çözüm değildir.

Çıkış oyunları teoride kulağa hoş gelse de, gerçek hayattaki kitlesel çıkışlar muhtemelen Ethereum'un kendisinde ağ çapında tıkanıklığı tetikleyecektir. Ethereum'un işlevselliğine zarar vermesinin yanı sıra, zayıf koordine edilmiş bir kitlesel çıkış, operatör Plasma zincirindeki her hesabı boşaltmadan önce kullanıcıların fonlarını çekemeyebileceği anlamına gelir.

## Plasma'nın artıları ve eksileri {#pros-and-cons-of-plasma}

| Artıları                                                                                                                                                                                                                             | Eksileri                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| İşlem başına yüksek işlem kapasitesi ve düşük maliyet sunar.                                                                                                                                                                             | Genel hesaplamayı desteklemez (akıllı sözleşmeleri çalıştıramaz). Yüklem mantığı aracılığıyla yalnızca temel Token transferleri, takaslar ve birkaç diğer işlem türü desteklenir.    |
| Keyfi kullanıcılar arasındaki işlemler için iyidir (her ikisi de Plasma zincirinde kuruluysa kullanıcı çifti başına ek yük yoktur)                                                                                                            | Fonlarınızın güvenliğini sağlamak için ağı periyodik olarak izlemeniz (canlılık gereksinimi) veya bu sorumluluğu başka birine devretmeniz gerekir.                          |
| Plasma zincirleri, ana zincirle ilgisi olmayan belirli kullanım durumlarına uyarlanabilir. İşletmeler dahil herkes, farklı bağlamlarda çalışan ölçeklenebilir altyapı sağlamak için Plasma akıllı sözleşmelerini özelleştirebilir. | Verileri depolamak ve talep üzerine sunmak için bir veya daha fazla operatöre güvenir.                                                                                                     |
| Hesaplama ve depolamayı zincir dışına taşıyarak Ethereum Ana Ağındaki yükü azaltır.                                                                                                                                                    | Çekim işlemleri, itirazlara izin vermek için birkaç gün geciktirilir. Değiştirilebilir varlıklar için bu, Likidite sağlayıcıları tarafından hafifletilebilir, ancak bununla ilişkili bir sermaye maliyeti vardır. |
|                                                                                                                                                                                                                                  | Çok fazla kullanıcı aynı anda çıkmaya çalışırsa, Ethereum Ana Ağı tıkanabilir.                                                                                          |

## Plasma ve katman 2 ölçeklendirme protokolleri {#plasma-vs-layer-2}

Plasma bir zamanlar Ethereum için yararlı bir ölçeklendirme çözümü olarak kabul edilse de, o zamandan beri [katman 2 (L2) ölçeklendirme protokolleri](/layer-2/) lehine terk edilmiştir. L2 ölçeklendirme çözümleri Plasma'nın çeşitli sorunlarını giderir:

### Verimlilik {#efficiency}

[Sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups), zincir dışı işlenen her işlem partisinin geçerliliğine dair kriptografik kanıtlar üretir. Bu, kullanıcıların (ve operatörlerin) geçersiz durum geçişlerini ilerletmesini önleyerek itiraz süreleri ve çıkış oyunları ihtiyacını ortadan kaldırır. Ayrıca, kullanıcıların fonlarını güvence altına almak için zinciri periyodik olarak izlemek zorunda kalmamaları anlamına gelir.

### Akıllı sözleşmeler için destek {#support-for-smart-contracts}

Plasma çerçevesiyle ilgili bir diğer sorun, [Ethereum akıllı sözleşmelerinin yürütülmesini destekleyememesiydi](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Sonuç olarak, Plasma'nın çoğu uygulaması çoğunlukla basit ödemeler veya ERC-20 Token'larının değişimi için inşa edildi.

Aksine, iyimser toplamalar [Ethereum Sanal Makinesi](/developers/docs/evm/) ile uyumludur ve Ethereum'a özgü [akıllı sözleşmeleri](/developers/docs/smart-contracts/) çalıştırabilir, bu da onları [merkeziyetsiz uygulamaları](/developers/docs/dapps/) ölçeklendirmek için yararlı ve _güvenli_ bir çözüm haline getirir. Benzer şekilde, ZK-toplamalarının keyfi mantığı işlemesine ve akıllı sözleşmeleri yürütmesine olanak tanıyacak [EVM'nin sıfır bilgi uygulamasını (zkEVM) oluşturma](https://ethresear.ch/t/a-zk-evm-specification/11549) planları devam etmektedir.

### Veri kullanılamazlığı {#data-unavailability}

Daha önce açıklandığı gibi, Plasma bir veri kullanılabilirliği sorunundan muzdariptir. Kötü niyetli bir operatör Plasma zincirinde geçersiz bir geçişi ilerletirse, operatör sahtekarlık kanıtı oluşturmak için gereken verileri saklayabileceğinden kullanıcılar buna itiraz edemez. Toplamalar, operatörleri işlem verilerini Ethereum'da yayınlamaya zorlayarak bu sorunu çözer, böylece herkesin zincirin durumunu doğrulamasına ve gerekirse sahtekarlık kanıtları oluşturmasına olanak tanır.

### Kitlesel çıkış sorunu {#mass-exit-problem}

ZK-toplamaları ve iyimser toplamalar, Plasma'nın kitlesel çıkış sorununu çeşitli şekillerde çözer. Örneğin, bir ZK-toplaması, operatörlerin hiçbir senaryoda kullanıcı fonlarını çalamamasını sağlayan kriptografik mekanizmalara dayanır.

Benzer şekilde, iyimser toplamalar çekim işlemlerine, herkesin bir itiraz başlatabileceği ve kötü niyetli çekim taleplerini önleyebileceği bir gecikme süresi uygular. Bu Plasma'ya benzer olsa da, aradaki fark doğrulayıcıların sahtekarlık kanıtları oluşturmak için gereken verilere erişebilmesidir. Bu nedenle, Toplama kullanıcılarının Ethereum Ana Ağına çılgınca, "ilk çıkan kurtulur" tarzı bir göçe girmesine gerek yoktur.

## Plasma, yan zincirlerden ve parçalamadan nasıl farklıdır? {#plasma-sidechains-sharding}

Plasma, yan zincirler ve parçalama oldukça benzerdir çünkü hepsi bir şekilde Ethereum Ana Ağına bağlanır. Ancak, bu bağlantıların seviyesi ve gücü değişir, bu da her ölçeklendirme çözümünün güvenlik özelliklerini etkiler.

### Plasma ve yan zincirler {#plasma-vs-sidechains}

Bir [yan zincir](/developers/docs/scaling/sidechains/), iki yönlü bir köprü aracılığıyla Ethereum Ana Ağına bağlanan bağımsız olarak işletilen bir blokzincirdir. [Köprüler](/bridges/), kullanıcıların yan zincirde işlem yapmak için iki blokzincir arasında Token alışverişi yapmasına olanak tanıyarak Ethereum Ana Ağındaki tıkanıklığı azaltır ve ölçeklenebilirliği artırır.
Yan zincirler ayrı bir mutabakat mekanizması kullanır ve tipik olarak Ethereum Ana Ağından çok daha küçüktür. Sonuç olarak, varlıkları bu zincirlere köprülemek artan risk içerir; yan zincir modelinde Ethereum Ana Ağından miras alınan güvenlik garantilerinin eksikliği göz önüne alındığında, kullanıcılar yan zincire yönelik bir saldırıda fon kaybı riskiyle karşı karşıya kalır.

Aksine, Plasma zincirleri güvenliklerini Ana Ağdan alır. Bu onları yan zincirlerden ölçülebilir derecede daha güvenli hale getirir. Hem yan zincirler hem de Plasma zincirleri farklı mutabakat protokollerine sahip olabilir, ancak aradaki fark Plasma zincirlerinin Ethereum Ana Ağındaki her blok için Merkle kökleri yayınlamasıdır. Blok kökleri, bir Plasma zincirinde gerçekleşen işlemler hakkındaki bilgileri doğrulamak için kullanabileceğimiz küçük bilgi parçalarıdır. Bir Plasma zincirinde bir saldırı gerçekleşirse, kullanıcılar uygun kanıtları kullanarak fonlarını güvenli bir şekilde Ana Ağa geri çekebilirler.

### Plasma ve parçalama {#plasma-vs-sharding}

Hem Plasma zincirleri hem de parça zincirleri periyodik olarak Ethereum Ana Ağına kriptografik kanıtlar yayınlar. Ancak her ikisinin de farklı güvenlik özellikleri vardır.

Parça zincirleri, her veri parçası hakkında ayrıntılı bilgi içeren "harmanlama başlıklarını" Ana Ağa taahhüt eder. Ana Ağdaki düğümler, veri parçalarının geçerliliğini doğrular ve uygular, geçersiz parça geçişleri olasılığını azaltır ve ağı kötü niyetli faaliyetlere karşı korur.

Plasma farklıdır çünkü Ana Ağ, çocuk zincirlerin durumu hakkında yalnızca minimum bilgi alır. Bu, Ana Ağın çocuk zincirlerde yürütülen işlemleri etkili bir şekilde doğrulayamayacağı ve onları daha az güvenli hale getireceği anlamına gelir.

**Not:** Ethereum blokzincirini parçalamak artık yol haritasında değildir. Bunun yerini toplamalar ve [danksharding](/roadmap/danksharding) yoluyla ölçeklendirme almıştır.

### Plasma'yı kullanın {#use-plasma}

Birden fazla proje, dapp'lerinize entegre edebileceğiniz Plasma uygulamaları sağlar:

- [Polygon](https://polygon.technology/) (önceden Matic Network)

## Daha fazla bilgi {#further-reading}

- [Plasma'yı Öğrenin](https://www.learnplasma.org/en/)
- ["Paylaşılan güvenlik" kavramının ne anlama geldiğine ve neden bu kadar önemli olduğuna dair hızlı bir hatırlatma](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Yan Zincirler, Plasma ve Parçalama Karşılaştırması](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Plasma'yı Anlamak, Bölüm 1: Temeller](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Plasma'nın Yaşamı ve Ölümü](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## Eğitimler: Ethereum'da Plasma zincirleri {#tutorials}

- [Gizliliği koruyan uygulamaya özel bir plasma yazın](/developers/tutorials/app-plasma/) _– Sıfır bilgi ispatları ve zincir dışı bileşenler kullanarak gizliliği koruyan bir plasma uygulaması oluşturun._