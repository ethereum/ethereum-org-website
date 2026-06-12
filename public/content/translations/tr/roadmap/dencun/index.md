---
title: Kankun-Deneb (Dencun)
metaTitle: Kankun-Deneb (Dencun) SSS
description: Kankun-Deneb (Dencun) ağ güncellemesi hakkında sıkça sorulan sorular
lang: tr
---

Kankun-Deneb (Dencun), daha ucuz [katman 2 (l2)](/glossary/#layer-2) Rollup depolaması için geçici veri **blob**'ları sunan **Proto-Danksharding (EIP-4844)**'i etkinleştiren bir Ethereum ağ güncellemesidir.

Yeni bir işlem türü, Rollup sağlayıcılarının verileri "blob" olarak bilinen yapılarda daha uygun maliyetli bir şekilde depolamasına olanak tanır. Blob'ların ağda yaklaşık 18 gün (daha kesin bir ifadeyle 4096 [Dönem](/glossary/#epoch)) boyunca erişilebilir olması garanti edilir. Bu sürenin ardından blob'lar ağdan budanır, ancak uygulamalar kanıtları kullanarak verilerinin geçerliliğini doğrulamaya devam edebilir. 

Bu, toplamaların maliyetini önemli ölçüde azaltır, Zincir büyümesini sınırlar ve güvenliği ve merkeziyetsiz bir Düğüm operatörleri kümesini korurken daha fazla kullanıcıyı desteklemeye yardımcı olur.

## Toplamaların Proto-Danksharding sayesinde daha düşük ücretleri ne zaman yansıtmasını bekliyoruz? {#when}

- Bu güncelleme 269568. dönemde, **13 Mart 2024 saat 13:55'te (UTC)** etkinleştirildi
- Arbitrum veya Optimism gibi tüm büyük Rollup sağlayıcıları, blob'ların güncellemenin hemen ardından destekleneceğinin sinyalini verdi
- Her sağlayıcının yeni blob alanından yararlanmak için sistemlerini güncellemesi gerektiğinden, bireysel Rollup desteği için zaman çizelgesi değişiklik gösterebilir

## Sert çatallanma sonrasında ETH nasıl dönüştürülebilir? {#scam-alert}

- **ETH'niz İçin Hiçbir İşlem Gerekmiyor**: Ethereum Dencun güncellemesinin ardından ETH'nizi dönüştürmenize veya yükseltmenize gerek yoktur. Hesap bakiyeleriniz aynı kalacak ve şu anda elinizde bulunan ETH, sert çatallanma sonrasında mevcut haliyle erişilebilir olmaya devam edecektir.
- **Dolandırıcılıklara Karşı Dikkatli Olun!** <Emoji text="⚠️" /> **Size ETH'nizi "yükseltmenizi" söyleyen herkes sizi dolandırmaya çalışıyordur.** Bu güncellemeyle ilgili yapmanız gereken hiçbir şey yoktur. Varlıklarınız tamamen etkilenmeden kalacaktır. Unutmayın, bilgili kalmak dolandırıcılıklara karşı en iyi savunmadır.

[Dolandırıcılıkları tanıma ve bunlardan kaçınma hakkında daha fazlası](/security/)

## Dencun ağ güncellemesi hangi sorunu çözüyor? {#network-impact}

Dencun öncelikle ağın **merkeziyetsizliğini korurken**, **uygun fiyatlı ücretlerle** **ölçeklenebilirliği** (daha fazla kullanıcıyı ve daha fazla işlemi idare etmeyi) ele alır.

Ethereum topluluğu, büyümesi için katman 2 toplamalarını daha fazla kullanıcıyı güvenli bir şekilde desteklemenin birincil aracı olarak konumlandıran "Rollup merkezli" bir yaklaşım benimsiyor.

Rollup ağları, işlemlerin _işlenmesini_ (veya "yürütülmesini") Ana Ağ'dan ayrı olarak gerçekleştirir ve ardından sonuçların kriptografik bir kanıtını ve/veya sıkıştırılmış işlem verilerini kayıt tutulması için Ana Ağ'da yayınlar. Bu kanıtları depolamak, Proto-Danksharding'den önce tüm ağ Düğüm operatörleri tarafından kalıcı olarak depolanması gereken ve bu nedenle pahalı bir görev olan bir masraf ([Gaz](/glossary/#gas) şeklinde) getirir.

Dencun güncellemesinde Proto-Danksharding'in sunulması, Düğüm operatörlerinin bu verileri yalnızca yaklaşık 18 gün boyunca depolamasını gerektirerek bu kanıtlar için daha ucuz veri depolaması ekler; bu sürenin ardından donanım gereksinimlerinin artmasını önlemek için veriler güvenli bir şekilde kaldırılabilir. Toplamalar genellikle 7 günlük bir çekim süresine sahip olduğundan, blob'lar bu süre boyunca l1'de mevcut olduğu sürece güvenlik modelleri değişmez. 18 günlük budama penceresi, bu süre için önemli bir tampon sağlar.

[Ethereum'u ölçeklendirme hakkında daha fazlası](/roadmap/scaling/)

## Eski blob verilerine nasıl erişilir? {#historical-access}

Normal Ethereum düğümleri her zaman ağın _mevcut durumunu_ tutacak olsa da, geçmiş blob verileri sunulduktan yaklaşık 18 gün sonra atılabilir. Bu verileri atmadan önce Ethereum, verilerin tüm ağ katılımcılarına sunulduğundan emin olarak şunlar için zaman tanır:

- İlgili tarafların verileri indirmesi ve depolaması.
- Tüm Rollup itiraz sürelerinin tamamlanması.
- Rollup işlemlerinin kesinleşmesi.

_Geçmiş_ blob verileri çeşitli nedenlerle istenebilir ve çeşitli merkeziyetsiz protokoller kullanılarak depolanabilir ve erişilebilir:

- The Graph gibi **üçüncü taraf endeksleme protokolleri**, bu verileri kripto-ekonomik mekanizmalarla teşvik edilen merkeziyetsiz bir Düğüm operatörleri ağı aracılığıyla depolar.
- **BitTorrent**, gönüllülerin bu verileri tutabileceği ve başkalarına dağıtabileceği merkeziyetsiz bir protokoldür.
- **[Ethereum Portal Ağı](/developers/docs/networking-layer/portal-network/)**, verileri BitTorrent'e benzer şekilde katılımcılar arasında dağıtarak merkeziyetsiz bir Düğüm operatörleri ağı aracılığıyla tüm Ethereum verilerine erişim sağlamayı amaçlar.
- **Bireysel kullanıcılar**, geçmişe dönük referans için istedikleri herhangi bir verinin kendi kopyalarını depolamakta her zaman özgürdür.
- **Rollup sağlayıcıları**, Rollup'larının kullanıcı deneyimini geliştirmek için bu verileri depolamaya teşvik edilir.
- **Blok gezginleri** genellikle, kullanıcıların bir web arayüzü aracılığıyla erişebileceği, kolay geçmiş referansı için tüm bu bilgileri endeksleyen ve depolayan arşiv düğümleri çalıştırır.

Geçmiş durumu kurtarmanın **N'de 1 güven modeli** üzerinde çalıştığını belirtmek önemlidir. Bu, ağın mevcut durumunu kullanarak doğruluğunu teyit etmek için yalnızca _tek bir güvenilir kaynaktan_ gelen verilere ihtiyacınız olduğu anlamına gelir.

## Bu güncelleme daha geniş Ethereum yol haritasına nasıl katkıda bulunuyor? {#roadmap-impact}

Proto-Danksharding, [danksharding](/roadmap/danksharding/)'in tam olarak uygulanmasına zemin hazırlar. Danksharding, Rollup verilerinin depolanmasını Düğüm operatörleri arasında dağıtmak için tasarlanmıştır, böylece her operatörün toplam verinin yalnızca küçük bir kısmını işlemesi gerekir. Bu dağıtım, Ethereum'u daha fazla kullanıcıyı ve işlemi idare edecek şekilde ölçeklendirmek için gerekli olan Blok başına veri blob'larının sayısını artıracaktır.

Bu ölçeklenebilirlik, merkeziyetsiz bir ağı korurken uygun fiyatlı ücretler ve daha gelişmiş uygulamalarla [Ethereum'da milyarlarca kullanıcıyı desteklemek](/roadmap/scaling/) için çok önemlidir. Bu değişiklikler olmadan, Düğüm operatörleri için donanım talepleri artacak ve giderek daha pahalı ekipmanlara ihtiyaç duyulmasına yol açacaktır. Bu durum, daha küçük operatörleri piyasa dışına itebilir ve ağ kontrolünün birkaç büyük operatör arasında yoğunlaşmasına neden olarak merkeziyetsizlik ilkesine ters düşebilir.

## Bu güncelleme tüm Ethereum mutabakat ve Doğrulayıcı istemcilerini etkiliyor mu? {#client-impact}

Evet, Proto-Danksharding (EIP-4844) hem yürütme istemcilerinde hem de mutabakat istemcilerinde güncellemeler gerektirir. Tüm ana Ethereum istemcileri güncellemeyi destekleyen sürümler yayınladı. Güncelleme sonrasında Ethereum ağıyla senkronizasyonu sürdürmek için Düğüm operatörleri, desteklenen bir istemci sürümünü çalıştırdıklarından emin olmalıdır. İstemci sürümleri hakkındaki bilgilerin zamana duyarlı olduğunu ve kullanıcıların en güncel ayrıntılar için en son güncellemelere başvurmaları gerektiğini unutmayın. [Desteklenen istemci sürümleri hakkındaki ayrıntılara bakın](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Mutabakat istemcileri, tümü güncellemeyi barındıracak şekilde güncellenmiş olan _Doğrulayıcı_ yazılımını idare eder.

## Kankun-Deneb (Dencun) Ethereum test ağlarını nasıl etkiler? {#testnet-impact}

- Geliştirici ağları (Devnet'ler), Sepolia ve Holesky, Dencun güncellemesinden geçti ve Proto-Danksharding tam olarak çalışıyor
- Rollup geliştiricileri bu ağları EIP-4844 testi için kullanabilir
- Çoğu kullanıcı, her bir test ağındaki bu değişiklikten tamamen etkilenmeyecektir

## L2'lerdeki tüm işlemler artık geçici blob alanını mı kullanacak, yoksa seçim yapabilecek misiniz? {#calldata-vs-blobs}

Ethereum'un Katman 2'sindeki (l2) Rollup işlemleri iki tür veri depolama kullanma seçeneğine sahiptir: geçici blob alanı veya kalıcı Akıllı sözleşme çağrı verisi. Blob alanı, daha düşük maliyetle geçici depolama sağlayan ekonomik bir seçimdir. Gerekli tüm itiraz süreleri için veri kullanılabilirliğini garanti eder. Öte yandan, Akıllı sözleşme çağrı verisi kalıcı depolama sunar ancak daha pahalıdır.

Blob alanı veya çağrı verisi kullanma arasındaki karar öncelikle Rollup sağlayıcıları tarafından verilir. Bu kararı blob alanına olan mevcut talebe dayandırırlar. Blob alanına yüksek talep varsa, toplamalar verilerin zamanında yayınlanmasını sağlamak için çağrı verisini tercih edebilir.

Kullanıcıların tercih ettikleri depolama türünü seçmeleri teorik olarak mümkün olsa da, bu seçimi genellikle Rollup sağlayıcıları yönetir. Bu seçeneği kullanıcılara sunmak, özellikle uygun maliyetli paketleme işlemlerinde karmaşıklık katacaktır. Bu seçimle ilgili belirli ayrıntılar için kullanıcılar, bireysel Rollup sağlayıcıları tarafından sağlanan belgelere başvurmalıdır.

## 4844, l1 Gazını azaltacak mı? {#l1-fee-impact}

Önemli ölçüde değil. Rollup sağlayıcılarının kullanımı için özel olarak blob alanına yönelik yeni bir Gaz piyasası sunulmuştur. _Rollup verilerinin blob'lara aktarılmasıyla l1'deki ücretler azaltılabilse de, bu güncelleme öncelikle l2 ücretlerinin azaltılmasına odaklanmaktadır. L1'deki (Ana Ağ) ücretlerin düşmesi, daha az ölçüde ikinci dereceden bir etki olarak ortaya çıkabilir._

- L1 Gazındaki azalma, Rollup sağlayıcıları tarafından blob verilerinin benimsenmesi/kullanımı ile orantılı olacaktır
- L1 Gazının, Rollup ile ilgili olmayan faaliyetlerden dolayı rekabetçi kalması muhtemeldir
- Blob alanının kullanımını benimseyen toplamalar daha az l1 Gazı talep edecek ve bu da yakın vadede l1 Gaz ücretlerini aşağı çekmeye yardımcı olacaktır
- Blob alanı hala sınırlıdır, bu nedenle bir Blok içindeki blob'lar doygunluğa ulaşırsa/dolarsa, toplamaların bu süre zarfında verilerini kalıcı veri olarak yayınlaması gerekebilir ve bu da l1 ve l2 Gaz fiyatlarını yukarı çekecektir

## Bu, diğer EVM katman 1 blokzincirlerindeki ücretleri azaltacak mı? {#alt-l1-fee-impact}

Hayır. Proto-Danksharding'in faydaları, kanıtlarını katman 1'de (Ana Ağ) depolayan Ethereum katman 2 toplamalarına özgüdür.

Sadece Ethereum Sanal Makinesi (EVM) ile uyumlu olmak, bir ağın bu güncellemeden herhangi bir fayda göreceği anlamına gelmez. Ethereum'dan bağımsız olarak çalışan ağlar (EVM uyumlu olsun veya olmasın) verilerini Ethereum'da depolamazlar ve bu güncellemeden herhangi bir fayda görmezler.

[Katman 2 toplamaları hakkında daha fazlası](/layer-2/)

## Görsel öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_Ethereum'un Ölçeklenmesinin Kilidini Açmak, EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_Domothy ile Blobspace 101 — Bankless_

## Daha fazla okuma {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Parça blob işlemleri (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Dencun Ana Ağ Duyurusu](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Ethereum Foundation blogu_
- [Otostopçunun Ethereum Rehberi: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding SSS](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [EIP-4844'ün Derinlemesine Açıklaması: Kankun Güncellemesinin Çekirdeği](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [AllCoreDevs Güncellemesi 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_