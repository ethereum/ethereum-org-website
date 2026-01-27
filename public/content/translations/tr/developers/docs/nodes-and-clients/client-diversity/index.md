---
title: "İstemci çeşitliliği"
description: "Ethereum istemci çeşitliliğinin önemine dair üst düzey bir açıklama."
lang: tr
sidebarDepth: 2
---

Ethereum düğümünün davranışı, çalıştırdığı istemci yazılımı tarafından kontrol edilir. Her biri farklı dillerde ayrı takımlar tarafından geliştirilen ve sürdürülen birden çok kullanılabilir seviyede Ethereum istemcisi bulunmaktadır. İstemciler, istemcilerin birbiriyle kesintisiz biçimde iletişim kuracağı, aynı fonksiyonelliğe sahip olacağı ve eş değer bir kullanıcı deneyimi sunacağı ortak özellikler üzerine kurulmuştur. Ancak, şu anda düğümler arasında istemcilerin dağıtımı ağ güçlendirmenin tam potansiyeline erişmesi için yeterince eşit değildir. İdeal olarak kullanıcılar ağa olabildiğince istemci çeşitliliği getirmek için farklı istemciler arasında aşağı yukarı eşit olarak dağılırlar.

## Ön Koşullar {#prerequisites}

Düğümlerin ve istemcilerin ne olduğunu henüz anlamadıysanız, [düğümler ve istemciler](/developers/docs/nodes-and-clients/) sayfasına göz atın. [Yürütme](/glossary/#execution-layer) ve [mutabakat](/glossary/#consensus-layer) katmanları sözlükte tanımlanmıştır.

## Neden birden fazla istemci var? {#why-multiple-clients}

Birden fazla, bağımsız geliştirilen ve sürdürülen istemci bulunmaktadır çünkü istemci çeşitliliği ağı saldırılara ve hatalara karşı daha dayanıklı hale getirir. Birden fazla istemci Ethereum'a özel bir güçtür - diğer blok zincirler tek bir istemcinin yanılmazlığına güvenir. Ancak, yalnızca birden fazla istemcinin mevcut olması yeterli değildir, bunların topluluk tarafından benimsenmesi ve toplam aktif düğümlerin aralarında nispeten eşit bir şekilde dağıtılması gerekir.

## İstemci çeşitliliği neden önemli? {#client-diversity-importance}

Birçok bağımsız geliştirilen ve sürdürülen istemci olması merkeziyetsiz bir ağın iyi durumu için hayatidir. Hadi sebeplerini öğrenelim.

### Hatalar {#bugs}

Tekil bir istemcideki hata Ethereum düğümlerinin azınlık bir kısmını temsil ediyorken ağ için daha küçük bir risktir. Birçok istemci arasında kabaca eşit bir düğüm dağılımı ile, çoğu istemcinin paylaşılan bir sorundan muzdarip olma olasılığı düşüktür ve sonuç olarak ağ daha sağlamdır.

### Saldırılara karşı dayanıklılık {#resilience}

İstemci çeşitliliği saldırılara karşı da dayanıklılık sağlar. Örneğin, zincirin belirli bir dalında [belirli bir istemciyi tuzağa düşüren](https://twitter.com/vdWijden/status/1437712249926393858) bir saldırının başarılı olma olasılığı düşüktür çünkü diğer istemcilerin aynı şekilde istismar edilmesi olası değildir ve kanonik zincir bozulmadan kalır. Düşük istemci çeşitliliği, baskın istemciye yönelik bir saldırıyla ilişkilendirilen riski arttırır. İstemci çeşitliliğinin ağdaki kötü niyetli saldırılara karşı önemli bir savunma olduğu kanıtlanmıştır. Örneğin, 2016'daki Şanghay hizmet reddi saldırısı, saldırganların baskın istemciyi (Geth) blok başına on binlerce kez yavaş bir disk G/Ç işlemi yürütmeye yönlendirebilmesi nedeniyle mümkün olmuştur. Çünkü açığı paylaşmayan alternatif istemciler de çevrimiçiydi, Geth'teki açık kapatılırken Ethereum saldırıya karşı koymayı ve çalışmaya devam etmeyi başarmıştı.

### Hisse ispatı kesinliği {#finality}

Ethereum düğümlerinin %33'ünden fazlasına sahip olan bir fikir birliği katmanındaki bir açık fikir birliği katmanının kesinleşmesini engelleyebilirdi, yani kullanıcılar işlemlerin bir noktada geri alınmayacağına veya değiştirilmeyeceğine güvenemezdi. Bu özellikle DeFi gibi Ethereum üzerinde inşa edilmiş birçok uygulama için bayağı sıkıntılı olurdu.

<Emoji text="🚨" className="me-4" /> Daha da kötüsü, üçte iki çoğunluğa sahip bir istemcideki kritik bir hata, zincirin <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">yanlış bir şekilde bölünmesine ve kesinleşmesine</a> neden olarak çok sayıda doğrulayıcının geçersiz bir zincirde takılıp kalmasına yol açabilir. Eğer doğru zincire geri katılmak isterlerse, bu doğrulayıcılar ya cezalandırma ile ya da yavaş ve pahalı bir gönüllü çekilme ve yeniden aktifleştirme ile karşı karşıya kalırlardı. Bir kesintinin büyüklüğü maksimum olarak üçte ikilik bir çoğunluk cezalandırılacak şekilde (32 ETH) sorunlu düğümlerin sayısı ile ölçeklendirilir.

Bunlar muhtemel olmayan senaryolar olsa da, Ethereum ekosistemi istemcilerin aktif düğümler arasındaki dağıtımını eşitleyerek riski azaltabilir. İdeal olarak, hiçbir fikir birliği istemcisi, toplam düğümlerin %33'lük bir kısmına sahip olamaz.

### Paylaşılan sorumluluk {#responsibility}

Çoğunluk istemciye sahip olmanın bir insan maliyeti de vardır. Küçük bir geliştirme ekibine aşırı baskı ve sorumluluk yükler. İstemci çeşitliliği ne kadar azsa, çoğunluk istemciyi koruyan geliştiricilerin sorumluluk yükü o kadar büyük olur. Bu sorumluluğu birden fazla ekibe yaymak, hem Ethereum'un düğüm ağının hem de insan ağının durumu için için iyidir.

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

### Mutabakat İstemcileri {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Diğer", value: 0.07 }
]}
/>

Bu diyagram güncelliğini yitirmiş olabilir — güncel bilgiler için [ethernodes.org](https://ethernodes.org) ve [clientdiversity.org](https://clientdiversity.org) adreslerine gidin.

Yukarıdaki iki pasta grafiği, yürütme ve mutabakat katmanları için mevcut istemci çeşitliliğinin anlık görüntülerini göstermektedir (yazıldığı tarih itibarıyla Ekim 2025). İstemci çeşitliliği yıllar içinde gelişti ve yürütme katmanı [Geth](https://geth.ethereum.org/)'in hakimiyetinde bir azalma gördü; [Nethermind](https://www.nethermind.io/nethermind-client) ikinci, [Besu](https://besu.hyperledger.org/) üçüncü ve [Erigon](https://github.com/ledgerwatch/erigon) dördüncü sırada yer alırken, diğer istemciler ağın %3'ünden daha azını oluşturuyor. Mutabakat katmanında en sık kullanılan istemci olan [Lighthouse](https://lighthouse.sigmaprime.io/), en çok kullanılan ikinci istemciye oldukça yakındır. [Prysm](https://prysmaticlabs.com/#projects) ve [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) sırasıyla ~%31 ve ~%14'lük bir paya sahiptir ve diğer istemciler nadiren kullanılmaktadır.

Yürütme katmanı verileri 26 Ekim 2025 tarihinde [supermajority.info](https://supermajority.info/) adresinden alınmıştır. Mutabakat istemcileri için veriler [Michael Sproul](https://github.com/sigp/blockprint) adresinden alınmıştır. Fikir birliği istemcisi verilerinin elde edilmesi daha zordur çünkü fikir birliği katmanı müşterileri her zaman onları tanımlamak için kullanılabilecek açık izlere sahip değildir. Veriler, bazen azınlık istemcilerden bazılarını karıştıran bir sınıflandırma algoritması kullanılarak oluşturulmuştur (daha fazla ayrıntı için [buraya](https://twitter.com/sproulM_/status/1440512518242197516) bakın). Yukarıdaki şemada bu belirsiz sınıflandırmalar ya/ya da etiketi ile ele alınmıştır (ör. Nimbus/Teku). Yine de, ağın çoğunluğunun Prysm çalıştırdığı açıktır. Sadece anlık çekimler olmasına rağmen, diyagramdaki değerler mevcut istemci çeşitliliği durumu hakkında iyi bir genel algı sağlamaktadır.

Mutabakat katmanı için güncel istemci çeşitliliği verileri artık [clientdiversity.org](https://clientdiversity.org/) adresinde mevcuttur.

## Yürütme katmanı {#execution-layer}

Şimdiye kadar, istemci çeşitliliği etrafındaki konuşmalar esas olarak fikir birliği katmanına odaklandı. Ancak, yürütme istemcisi [Geth](https://geth.ethereum.org) şu anda tüm düğümlerin yaklaşık %85'ini oluşturmaktadır. Bu yüzde, fikir birliği istemcileri için olduğu gibi aynı nedenlerle sorunludur. Örneğin, Geth'de işlemlerin ele alınmasını veya yürütme yüklerinin oluşturulmasını etkileyen bir hata fikir birliği istemcilerinin sıkıntılı veya hatalı işlemleri sonlandırmasına yol açabilir. Bundan dolayı, Ethereum daha eşit bir yürütüm katmanı dağılımı ile, ideal olarak hiçbir istemcinin ağın %33'ünden fazlasını temsil etmediği bir durum ile daha sağlıklı olurdu.

## Bir azınlık istemcisi kullanın {#use-minority-client}

İstemci çeşitliliğini ele almak, bireysel kullanıcıların azınlık istemcileri seçmesinden daha fazlasını gerektirir; doğrulayıcı havuzlarının ve büyük merkeziyetsiz uygulamalar ve borsalar gibi kurumların da istemcileri değiştirmesini gerektirir. Ancak tüm kullanıcılar tüm mevcut Ethereum yazılımlarının kullanımını normalleştirerek mevcut eşitsizliği ortadan kaldırmaya katkı sağlayabilirler. Birleşimden sonra, tüm düğüm operatörlerinin, bir yürütüm istemcisi ve bir fikir birliği istemcisi çalıştırmaları gerekecektir. Aşağıda önerilen istemci kombinasyonlarını seçmek, istemci çeşitliliğini artırmaya yardımcı olacaktır.

### Yürütüm İstemcileri {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Mutabakat İstemcileri {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Teknik kullanıcılar azınlık istemcileri için daha fazla öğretici ve doküman yazarak ve düğüm yöneten yakınlarını baskın istemcilerden ayrılmaya yönlendirerek bu süreci hızlandırmaya yardımcı olabilirler. Bir azınlık mutabakat istemcisine geçiş kılavuzları [clientdiversity.org](https://clientdiversity.org/) adresinde mevcuttur.

## İstemci çeşitliliği panoları {#client-diversity-dashboards}

Birden fazla gösterge paneli yürütüm ve fikir birliği katmanları için gerçek zamanlı istemci çeşitliliği istatisikleri verir.

**Fikir birliği katmanı:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Yürütme katmanı:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Daha fazla kaynak {#further-reading}

- [Ethereum'un mutabakat katmanında istemci çeşitliliği](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Merge: Çoğunluk istemcisini kendi sorumluluğunuzda çalıştırın!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 Mart 2022_
- [İstemci çeşitliliğinin önemi](https://our.status.im/the-importance-of-client-diversity/)
- [Ethereum düğüm hizmetleri listesi](https://ethereumnodes.com/)
- [İstemci çeşitliliği sorununun "Beş Nedeni"](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Ethereum Çeşitliliği ve Nasıl Çözüleceği (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Alakalı başlıklar {#related-topics}

- [Bir Ethereum düğümü çalıştırın](/run-a-node/)
- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
