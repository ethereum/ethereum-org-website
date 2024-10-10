---
title: Cancun-Deneb (Dencun) SSS
description: Cancun-Deneb (Dencun) ağ güncellemesi hakkında sıkça sorulan sorular
lang: tr
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun), Ethereum ağında **Proto-Danksharding'i (EIP-4844)** etkinleştiren ve daha ucuz [katman 2 (L2)](/glossary/#layer-2) toplama depolaması için geçici veri **blob'ları** sunan bir yükseltmedir.

Yeni bir işlem türü, toplama sağlayıcılarının verileri "blob" olarak bilinen yapılarda daha az maliyetle depolamasına olanak tanıyor. Blob'ların ağda yaklaşık 18 gün (daha kesin olarak 4096 [dönem](/glossary/#epoch)) boyunca erişilebilir olacağı garanti edilir. Bu sürenin sonunda blob'lar ağdan temizlenir ancak uygulamalar, verilerinin geçerliliğini kanıtlar yardımıyla hala doğrulayabilir.

Bu, toplamaların maliyetini önemli ölçüde azaltır, zincir büyümesini sınırlar ve hem güvenliği hem de merkeziyetsiz bir düğüm operatörü grubunu korurken daha fazla kullanıcının desteklenmesine yardımcı olur.

## Proto-Danksharding nedeniyle düşen ücretlerin toplamalara ne zaman yansımasını bekliyoruz? {#when}

- Bu yükseltme, dönem 269568'de, **13-Mar-2024 13:55PM (UTC)** tarihinde etkilenleştirildi
- Arbitrum veya Optimism gibi tüm büyük toplama sağlayıcıları, blob'ların yükseltmenin hemen ardından destekleneceğini sinyalini verdi
- Her sağlayıcının yeni blob alanından yararlanmak için sistemlerini güncellemesi gerektiği için bağımsız toplama desteğinin zaman çizelgesi değişiklik gösterebilir

## Sert çatallanma sonrasında ETH nasıl dönüştürülebilir? {#scam-alert}

- **ETH'niz İçin Hiçbir İşlem Gerekmiyor**. Ethereum Dencun yükseltmesinin ardından, ETH'nizi dönüştürmeniz ya da yükseltmeniz gerekmez. Hesap bakiyeleriniz aynı kalacak ve sert çatallanmanın ardından şu an sahip olduğunuz ETH mevcut biçiminde erişilebilir olacaktır.
- **Dolandırıcılıklara Karşı Dikkatli Olun!** <Emoji text="⚠️" /> **ETH'nizi "yükseltmenizi" söyleyen kişiler sizi dolandırmaya çalışıyor.** Bu yükseltmeyle ilgili yapmanız gereken hiçbir şey yok. Varlıklarınız hiçbir şekilde etkilenmeyecek. Unutmayın, bilgi sahibi olmak dolandırıcılıklardan korunmanın en iyi yoludur.

[Dolandırıcılığı tanıma ve dolandırıcılıktan kaçınma hakkında daha fazla bilgi](/güvenlik/)

## Dencun ağ yükseltmesi hangi problemi çözüyor? {#network-impact}

Dencun, ağırlıklı olarak **uygun ücretler** ile **ölçeklenebilirliği** (daha fazla kullanıcı ve daha fazla işlem yönetmeyi) ele alırken, ağın **merkeziyetsizliğini** de koruyor.

Ethereum topluluğu, katman 2 toplamalarını daha fazla kullanıcıyı güvenli bir şekilde desteklemenin birincil yolu olarak gören "toplama merkezli" bir büyüme yaklaşımını benimsiyor.

Toplama ağları, işlemlerin _işlenmesini_ (veya "yürütülmesini") Ana Ağdan ayrı olarak gerçekleştirir ve ardından sonuçların kriptografik kanıtını ve/veya sıkıştırılmış işlem verilerini kayıt tutma amacıyla Ana Ağa geri gönderir. Bu kanıtların depolanması bir masrafa yol açıyordu ([gaz](/glossary/#gas) biçiminde) ve Proto-Danksharding öncesinde tüm ağ düğüm operatörleri tarafından kalıcı olarak depolanması gerektiği için pahalı bir işti.

Dencun yükseltmesinde Proto-Danksharding'in tanıtılması, düğüm operatörlerinin bu verileri yalnızca yaklaşık 18 gün boyunca saklamasının yeterli olmasını beraberinde getirerek bu kanıtlar için daha ucuz veri depolama olanağı sağlıyor; ardından veriler, donanım gereksinimlerinin genişlemesini önlemek için güvenli bir şekilde kaldırılabiliyor.  Toplamalar genellikle 7 günlük bir çekim süresine sahip olduğundan bu süre boyunca L1'de blob'lar mevcut olduğu sürece güvenlik modeli değişmez. 18 günlük temizleme süresi, bu süreç için önemli bir tampon sağlar.

[Ethereum'u ölçeklendirme hakkında daha fazla bilgi için](/roadmap/scaling/)

## Eski blob verilerine nasıl erişilir? {#historical-access}

Normal Ethereum düğümleri her zaman ağın _mevcut durumunu_ saklayacak olsa da, tarihsel blob verileri başlangıcından yaklaşık 18 gün sonra kaldırılabilir. Bu veriler kaldırılmadan önce Ethereum bu verilerin tüm ağ katılımcılarına sunulmasını sağlayarak aşağıdaki işlemler için zaman tanır:

- İlgili tarafların verileri indirip saklaması.
- Tüm toplama yarışma dönemlerinin tamamlanması.
- Toplama işlemlerinin sonuçlandırılması.

_Tarihsel_ blob verileri çeşitli nedenlerle istenebilir ve çeşitli merkeziyetsiz protokoller kullanılarak saklanıp bunlara erişilebilir:

- The Graph gibi \***üçüncü taraf indeksleme protokolleri**, bu verileri kripto-ekonomik mekanizmalarla teşvik edilen merkeziyetsiz bir düğüm operatörleri ağı aracılığıyla saklar.
- **BitTorrent**, gönüllülerin bu verileri saklayıp başkalarına dağıtabileceği merkeziyetsiz bir protokoldür.
- **[Ethereum portal ağı](/developers/docs/networking-layer/portal-network/)**, BitTorrent'e benzer şekilde verileri katılımcılar arasında dağıtarak merkeziyetsiz düğüm operatörleri ağı aracılığıyla tüm Ethereum verilerine erişim sunmayı amaçlar.
- **Bireysel kullanıcılar** geçmişe bakmak amacıyla diledikleri verilerin kendilerine ait kopyalarını saklamakta her zaman özgürdür.
- **Toplama sağlayıcıları**, toplamalara ilişkin kullanıcı deneyimini geliştirmek için bu verileri depolamaya teşvik edilir.
- **Blok arayıcıları** genellikle tüm bu bilgileri kolayca geçmişe bakmak için indeksleyen ve depolayan arşiv düğümlerini çalıştırır ve kullanıcıların bunlara bir web arayüzü aracılığıyla erişmesini sağlar.

Tarihsel durumu geri yüklemenin **1/N güven modeli** üzerinde çalıştığını belirtmek önemlidir. Bu, ağın mevcut durumunu kullanarak doğruluğunu onaylamak için yalnızca _tek bir güvenilir kaynaktan_ gelen verilere ihtiyacınız olduğu anlamına gelir.

## Bu yükseltme, Ethereum'un genel yol haritasına nasıl katkıda bulunuyor? {#roadmap-impact}

Proto-Danksharding, [Danksharding](/roadmap/danksharding/)'in tam olarak uygulanması için zemin hazırlar. Danksharding, toplama verilerinin depolama alanını düğüm operatörleri arasında dağıtmak üzere tasarlanmıştır; bu sayede, her operatörün toplama verilerinin sadece küçük bir kısmını işlemesi gerekir. Bu dağıtım, blok başına veri parçacıklarının sayısını artırır ve bu da Ethereum'u daha fazla kullanıcıyı ve işlem hacmini destekleyebilecek şekilde ölçeklendirmek için gereklidir.

Bu ölçeklenebilirlik, bir yandan merkeziyetsiz bir ağın sürdürülmesini sağlarken diğer yandan uygun ücretler ve daha gelişmiş uygulamalarla [Ethereum'daki milyarlarca kullanıcıyı desteklemek](/roadmap/scaling/) açısından hayati önem taşır. Bu değişiklikler olmadan, düğüm operatörleri için gereken donanım talepleri artacak ve giderek daha pahalı ekipmanlara ihtiyaç duyulacaktır. Bu, daha küçük operatörlerin devre dışı kalmasına yol açabilir ve ağ üzerindeki kontrolün birkaç büyük operatörde toplanmasına neden olabilir, bu da merkeziyetsizlik ilkesine aykırıdır.

## Bu yükseltme tüm Ethereum mutabakat ve doğrulayıcı istemcilerini etkiliyor mu? {#client-impact}

Evet, Proto-Danksharding (EIP-4844) hem yürütüm istemcilerinin hem de fikir birliği istemcilerinin güncellenmesini gerektirir. Tüm ana Ethereum istemcileri, yükseltmeyi destekleyen sürümler yayımlamıştır. Yükseltme sonrasında Ethereum ağı ile senkronizasyonu sürdürmek için düğüm operatörlerinin desteklenen bir istemci sürümü çalıştırdıklarından emin olmaları gerekir. İstemci sürümleri hakkındaki bilgilerin zamana duyarlı olduğunu ve kullanıcıların en güncel ayrıntılar için en son güncellemelere başvurmaları gerektiğini unutmayın. [Desteklenen istemci sürümleri hakkında ayrıntılara bakın](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Fikir birliği istemcileri, yükseltmeye uyum sağlayacak şekilde güncellenen _Doğrulayıcı_ yazılımını yönetir.

## Cancun-Deneb (Dencun), Goerli veya diğer Ethereum test ağlarını nasıl etkiler? {#testnet-impact}

- Devnets, Goerli, Sepolia ve Holesky'nin her biri Dencun yükseltmesinden geçmiştir ve Proto-Danksharding tüm işlevleriyle çalışmaktadır
- Toplama geliştiricileri, bu ağları EIP-4844 testleri için kullanabilir
- Çoğu kullanıcı test ağında yapılan bu değişiklikten hiçbir şekilde etkilenmeyecektir

## Artık L2'ler üzerindeki tüm işlemler geçici blob alanını mı kullanacak yoksa seçme şansına sahip olacak mısınız? {#calldata-vs-blobs}

Ethereum'un Katman 2'deki (L2) toplama işlemleri, geçici blob alanı veya kalıcı akıllı sözleşme verileri olmak üzere iki tür veri depolama seçeneğine sahiptir. Blob alanı, düşük maliyetle geçici depolama sağlayan ekonomik bir seçenektir. Gerekli tüm yarışma dönemlerinde veri kullanılabilirliğini garanti eder. Diğer yandan, akıllı sözleşme verileri kalıcı depolama sunmakla birlikte daha maliyetlidir.

Blob alanı veya calldata seçeneklerinden hangisinin kullanılacağına dair karar, ağırlıklı olarak toplama sağlayıcıları tarafından verilir. Bu kararı, blob alanına olan mevcut talebe dayandırırlar. Toplamalar, blob alanına olan talep yüksekse verilerin zamanında gönderilmesini sağlamak için calldata'yı tercih edebilir.

Teorik olarak kullanıcıların tercih ettikleri depolama türünü seçmeleri mümkün olsa da, genellikle bu seçimi toplama sağlayıcıları yönetir. Kullanıcılara bu seçeneğin sunulması, özellikle uygun maliyetli paketleme işlemlerinde karmaşıklık yaratacaktır. Kullanıcılar, bu seçime ilişkin özel ayrıntılar için ilgili toplama sağlayıcıları tarafından sağlanan dokümanlara başvurmalıdır.

## 4844, L1 gazını azaltacak mı? {#l1-fee-impact}

Önemli ölçüde değil. Toplama sağlayıcılarının kullanması amacıyla sadece blob alanı için yeni bir gaz pazarı tanıtıldı. _Her ne kadar L1'deki ücretler, toplama verilerinin blob'lara aktarılmasıyla azaltılabilse de, bu yükseltme öncelikli olarak L2 ücretlerinin azaltılmasına odaklanıyor. L1'deki (Ana Ağ) ücretlerin azaltılması, daha az ölçüde ikinci dereceden bir etki olarak ortaya çıkabilir._

- L1 gaz azalması, toplama sağlayıcıları tarafından blob verilerinin benimsenmesiyle/kullanımıyla orantılı olacaktır
- L1 gazı, toplama dışı faaliyetler sayesinde muhtemelen rekabet gücünü koruyacaktır
- Blob alanı kullanımını benimseyen toplamalar, daha az L1 gazı talep edecek ve bu sayede kısa vadede L1 gaz ücretleri aşağı çekilebilecektir
- Blob alanı hala sınırlı olduğundan bir blok içindeki blob'lar doymuşsa/doluysa, verilerini kalıcı veri olarak göndermek için toplamalar gerekli olabilir ve bu da L1 ve L2 gaz fiyatlarını artırabilir

## Bu, diğer EVM katman 1 blokzincirlerindeki ücretleri düşürecek mi? {#alt-l1-fee-impact}

Hayır. Proto-Danksharding'in faydaları, ispatlarını katman 1'de (Ana Ağ) saklayan Ethereum katman 2 toplamalarına özgüdür.

Sadece Ethereum Sanal Makinesi (EVM) ile uyumlu olması, bir ağın bu yükseltmeden herhangi bir fayda sağlayacağı anlamına gelmez. Ethereum'dan bağımsız çalışan ağlar (EVM uyumlu olup olmamalarına bakılmaksızın) verilerini Ethereum'da depolamaz ve bu yükseltmeden herhangi bir fayda sağlamaz.

[Katman 2 toplamaları hakkında daha fazla bilgi](/layer-2/)

## Görsel olarak öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Unlocking Ethereum's Scaling, EIP-4844 — Finematics _

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 with Domothy — Bankless_

## Daha fazla kaynak {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Shard blob transactions (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Dencun Ana Ağ Duyurusu](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Ethereum Foundation blog_
- [Otostopçunun Ethereum Rehberi: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding SSS](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [EIP-4844'ün Ayrıntılı Açıklaması: Cancun Yükseltmesinin Temeli](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [AllCoreDevs Güncellemesi 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
