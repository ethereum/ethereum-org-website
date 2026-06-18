---
title: İstemci çeşitliliği
description: Ethereum istemci çeşitliliğinin önemine dair üst düzey bir açıklama.
lang: tr
sidebarDepth: 2
---

Bir [Ethereum](/) düğümünün davranışı, çalıştırdığı istemci yazılımı tarafından kontrol edilir. Her biri ayrı ekipler tarafından farklı dillerde geliştirilen ve sürdürülen birkaç üretim düzeyinde Ethereum istemcisi vardır. İstemciler, birbirleriyle sorunsuz bir şekilde iletişim kurmalarını, aynı işlevselliğe sahip olmalarını ve eşdeğer bir kullanıcı deneyimi sunmalarını sağlayan ortak bir spesifikasyona göre oluşturulmuştur. Ancak şu anda, istemcilerin düğümler arasındaki dağılımı, bu ağ güçlendirmesini tam potansiyeliyle gerçekleştirecek kadar eşit değildir. İdeal olarak kullanıcılar, ağa mümkün olduğunca fazla istemci çeşitliliği getirmek için çeşitli istemciler arasında kabaca eşit olarak bölünür.

## Ön koşullar {#prerequisites}

Düğümlerin ve istemcilerin ne olduğunu henüz anlamadıysanız, [düğümler ve istemciler](/developers/docs/nodes-and-clients/) bölümüne göz atın. [Yürütme](/glossary/#execution-layer) ve [mutabakat](/glossary/#consensus-layer) katmanları sözlükte tanımlanmıştır.

## Neden birden fazla istemci var? {#why-multiple-clients}

Bağımsız olarak geliştirilen ve sürdürülen birden fazla istemci mevcuttur çünkü istemci çeşitliliği ağı saldırılara ve hatalara karşı daha dirençli hale getirir. Birden fazla istemci, Ethereum'a özgü bir güçtür; diğer blokzincirleri tek bir istemcinin yanılmazlığına güvenir. Ancak, sadece birden fazla istemcinin mevcut olması yeterli değildir; bunların topluluk tarafından benimsenmesi ve toplam aktif düğümlerin bunlar arasında nispeten eşit bir şekilde dağıtılması gerekir.

## İstemci çeşitliliği neden önemlidir? {#client-diversity-importance}

Bağımsız olarak geliştirilen ve sürdürülen birçok istemciye sahip olmak, merkeziyetsiz bir ağın sağlığı için hayati önem taşır. Bunun nedenlerini inceleyelim.

### Hatalar {#bugs}

Bireysel bir istemcideki bir hata, Ethereum düğümlerinin azınlığını temsil ettiğinde ağ için daha az risk oluşturur. Düğümlerin birçok istemci arasında kabaca eşit bir şekilde dağıtılmasıyla, çoğu istemcinin ortak bir sorundan muzdarip olma olasılığı düşüktür ve sonuç olarak ağ daha sağlamdır.

### Saldırılara karşı direnç {#resilience}

İstemci çeşitliliği ayrıca saldırılara karşı direnç sunar. Örneğin, [belirli bir istemciyi kandırarak](https://twitter.com/vdWijden/status/1437712249926393858) zincirin belirli bir dalına yönlendiren bir saldırının başarılı olma olasılığı düşüktür çünkü diğer istemcilerin aynı şekilde istismar edilme olasılığı düşüktür ve kurallı zincir bozulmadan kalır. Düşük istemci çeşitliliği, baskın istemciye yönelik bir bilgisayar korsanlığıyla ilişkili riski artırır. İstemci çeşitliliğinin ağdaki kötü niyetli saldırılara karşı önemli bir savunma olduğu zaten kanıtlanmıştır; örneğin 2016'daki Şanghay hizmet reddi saldırısı, saldırganların baskın istemciyi (Geth) yavaş bir disk G/Ç işlemini blok başına on binlerce kez yürütmesi için kandırabilmesi nedeniyle mümkün olmuştur. Güvenlik açığını paylaşmayan alternatif istemciler de çevrimiçi olduğu için Ethereum saldırıya direnebildi ve Geth'teki güvenlik açığı düzeltilirken çalışmaya devam edebildi.

### Hisse Kanıtı (PoS) kesinliği {#finality}

Ethereum düğümlerinin %33'ünden fazlasına sahip bir fikir birliği istemcisindeki bir hata, mutabakat katmanının kesinleşmesini engelleyebilir; bu da kullanıcıların işlemlerin bir noktada geri alınmayacağına veya değiştirilmeyeceğine güvenemeyeceği anlamına gelir. Bu, Ethereum üzerine inşa edilen birçok uygulama, özellikle de merkeziyetsiz finans (DeFi) için çok sorunlu olacaktır.

<Emoji text="🚨" className="me-4" /> Daha da kötüsü, üçte iki çoğunluğa sahip bir istemcideki kritik bir hata, zincirin <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">yanlış bir şekilde bölünmesine ve kesinleşmesine</a> neden olarak büyük bir doğrulayıcı grubunun geçersiz bir zincirde sıkışıp kalmasına yol açabilir. Doğru zincire yeniden katılmak isterlerse, bu doğrulayıcılar ceza kesintisiyle veya yavaş ve pahalı bir gönüllü çekim ve yeniden etkinleştirme işlemiyle karşı karşıya kalırlar. Bir ceza kesintisinin büyüklüğü, suçlu düğümlerin sayısıyla orantılıdır ve üçte iki çoğunluk maksimum düzeyde (32 ETH) kesintiye uğrar.

Bunlar olası olmayan senaryolar olsa da, Ethereum ekosistemi, istemcilerin aktif düğümler arasındaki dağılımını eşitleyerek bu riskleri azaltabilir. İdeal olarak, hiçbir fikir birliği istemcisi toplam düğümlerin %33'lük payına ulaşmamalıdır.

### Paylaşılan sorumluluk {#responsibility}

Çoğunluk istemcilerine sahip olmanın insani bir bedeli de vardır. Küçük bir geliştirme ekibine aşırı yük ve sorumluluk bindirir. İstemci çeşitliliği ne kadar az olursa, çoğunluk istemcisini sürdüren geliştiriciler için sorumluluk yükü o kadar büyük olur. Bu sorumluluğu birden fazla ekibe yaymak, hem Ethereum'un düğüm ağının hem de insan ağının sağlığı için iyidir.

## Mevcut istemci çeşitliliği {#current-client-diversity}

### Yürütme İstemcileri {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Fikir Birliği İstemcileri {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Other", value: 0.07 }
]}
/>

Bu diyagram güncel olmayabilir; güncel bilgiler için [ethernodes.org](https://ethernodes.org) ve [clientdiversity.org](https://clientdiversity.org) adreslerine gidin.

Yukarıdaki iki pasta grafik, yürütme ve mutabakat katmanları için mevcut istemci çeşitliliğinin anlık görüntülerini göstermektedir (Ekim 2025'te yazıldığı sırada). İstemci çeşitliliği yıllar içinde gelişti ve yürütme katmanında [Geth](https://geth.ethereum.org/) hakimiyetinde bir azalma görüldü; [Nethermind](https://www.nethermind.io/nethermind-client) yakın bir farkla ikinci, [Besu](https://besu.hyperledger.org/) üçüncü ve [Erigon](https://github.com/ledgerwatch/erigon) dördüncü sırada yer alırken, diğer istemciler ağın %3'ünden azını oluşturuyor. Mutabakat katmanında en yaygın kullanılan istemci olan [Lighthouse](https://lighthouse.sigmaprime.io/), en çok kullanılan ikinci istemciye oldukça yakındır. [Prysm](https://prysmaticlabs.com/#projects) ve [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) sırasıyla ~%31 ve ~%14'lük bir paya sahiptir ve diğer istemciler nadiren kullanılmaktadır.

Yürütme katmanı verileri 26 Ekim 2025 tarihinde [supermajority.info](https://supermajority.info/) adresinden alınmıştır. Fikir birliği istemcileri için veriler [Michael Sproul](https://github.com/sigp/blockprint)'dan alınmıştır. Fikir birliği istemcisi verilerini elde etmek daha zordur çünkü mutabakat katmanı istemcileri her zaman onları tanımlamak için kullanılabilecek net izlere sahip değildir. Veriler, bazen bazı azınlık istemcilerini karıştıran bir sınıflandırma algoritması kullanılarak oluşturulmuştur (daha fazla ayrıntı için [buraya](https://twitter.com/sproulM_/status/1440512518242197516) bakın). Yukarıdaki diyagramda, bu belirsiz sınıflandırmalar bir ya/ya da etiketiyle (ör. Nimbus/Teku) ele alınmıştır. Yine de, ağın çoğunluğunun Prysm çalıştırdığı açıktır. Sadece anlık görüntüler olmalarına rağmen, diyagramdaki değerler istemci çeşitliliğinin mevcut durumu hakkında iyi bir genel fikir vermektedir.

Mutabakat katmanı için güncel istemci çeşitliliği verileri artık [clientdiversity.org](https://clientdiversity.org/) adresinde mevcuttur.

## Yürütme katmanı {#execution-layer}

Şimdiye kadar, istemci çeşitliliği etrafındaki konuşmalar temel olarak mutabakat katmanına odaklanmıştı. Ancak, yürütme istemcisi [Geth](https://geth.ethereum.org) şu anda tüm düğümlerin yaklaşık %85'ini oluşturmaktadır. Bu oran, fikir birliği istemcileriyle aynı nedenlerden dolayı sorunludur. Örneğin, Geth'te işlem yönetimini veya yürütme yüklerinin oluşturulmasını etkileyen bir hata, fikir birliği istemcilerinin sorunlu veya hatalı işlemleri kesinleştirmesine yol açabilir. Bu nedenle, Ethereum, yürütme istemcilerinin daha eşit bir şekilde dağıtılmasıyla, ideal olarak hiçbir istemcinin ağın %33'ünden fazlasını temsil etmemesiyle daha sağlıklı olacaktır.

## Bir azınlık istemcisi kullanın {#use-minority-client}

İstemci çeşitliliğini ele almak, bireysel kullanıcıların azınlık istemcilerini seçmesinden daha fazlasını gerektirir; doğrulayıcı havuzlarının ve büyük merkeziyetsiz uygulamalar (dapp'ler) ile borsalar gibi kurumların da istemci değiştirmesini gerektirir. Bununla birlikte, tüm kullanıcılar mevcut dengesizliği gidermek ve mevcut tüm Ethereum yazılımlarının kullanımını normalleştirmek için üzerlerine düşeni yapabilirler. Birleşme'den sonra, tüm düğüm operatörlerinin bir yürütme istemcisi ve bir fikir birliği istemcisi çalıştırması gerekecektir. Aşağıda önerilen istemcilerin kombinasyonlarını seçmek, istemci çeşitliliğini artırmaya yardımcı olacaktır.

### Yürütme istemcileri {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Fikir birliği istemcileri {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Teknik kullanıcılar, azınlık istemcileri için daha fazla eğitim ve belge yazarak ve düğüm işleten akranlarını baskın istemcilerden uzaklaşmaya teşvik ederek bu süreci hızlandırmaya yardımcı olabilirler. Bir azınlık fikir birliği istemcisine geçiş kılavuzları [clientdiversity.org](https://clientdiversity.org/) adresinde mevcuttur.

## İstemci çeşitliliği panoları {#client-diversity-dashboards}

Çeşitli panolar, yürütme ve mutabakat katmanı için gerçek zamanlı istemci çeşitliliği istatistikleri sunar.

**Mutabakat katmanı:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Yürütme katmanı:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Daha fazla bilgi {#further-reading}

- [Ethereum'un mutabakat katmanında istemci çeşitliliği](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Birleşmesi: Çoğunluk istemcisini çalıştırmanın riski size aittir!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 Mart 2022_
- [İstemci çeşitliliğinin önemi](https://our.status.im/the-importance-of-client-diversity/)
- [Ethereum düğüm hizmetleri listesi](https://ethereumnodes.com/)
- [İstemci çeşitliliği sorununun "Beş Nedeni"](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Ethereum Çeşitliliği ve Nasıl Çözülür (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## İlgili konular {#related-topics}

- [Bir Ethereum düğümü çalıştırın](/run-a-node/)
- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)