---
title: İstemci çeşitliliği
description: Ethereum istemci çeşitliliğinin önemine dair üst düzey bir açıklama.
lang: tr
sidebarDepth: 2
---

Ethereum düğümünün davranışı, çalıştırdığı istemci yazılımı tarafından kontrol edilir. Her biri farklı dillerde ayrı takımlar tarafından geliştirilen ve sürdürülen birden çok kullanılabilir seviyede Ethereum istemcisi bulunmaktadır. İstemciler, istemcilerin birbiriyle kesintisiz biçimde iletişim kuracağı, aynı fonksiyonelliğe sahip olacağı ve eş değer bir kullanıcı deneyimi sunacağı ortak özellikler üzerine kurulmuştur. Ancak, şu anda düğümler arasında istemcilerin dağıtımı ağ güçlendirmenin tam potansiyeline erişmesi için yeterince eşit değildir. İdeal olarak kullanıcılar ağa olabildiğince istemci çeşitliliği getirmek için farklı istemciler arasında aşağı yukarı eşit olarak dağılırlar.

## Ön koşullar {#prerequisites}

Düğümlerin ve istemcilerin ne olduğu konusunda henüz bir fikriniz yoksa, [düğümler ve istemciler](/developers/docs/nodes-and-clients/) kısmına bakın. [Yürütme](/glossary/#execution-layer) ve [mutabakat](/glossary/#consensus-layer) katmanları sözlükte tanımlanmıştır.

## Neden birden fazla istemci var? {#why-multiple-clients}

Birden fazla, bağımsız geliştirilen ve sürdürülen istemci bulunmaktadır çünkü istemci çeşitliliği ağı saldırılara ve hatalara karşı daha dayanıklı hale getirir. Birden fazla istemci Ethereum'a özel bir güçtür - diğer blok zincirler tek bir istemcinin yanılmazlığına güvenir. Ancak, sadece birden fazla istemci olması yetmez, topluluk tarafından benimsenmiş ve toplam aktif düğümlerin onların arasında neredeyse eş olarak dağıtılmış olması gerekir.

## İstemci çeşitliliği neden önemli? {#client-diversity-importance}

Birçok bağımsız geliştirilen ve sürdürülen istemci olması merkeziyetsiz bir ağın iyi durumu için hayatidir. Hadi sebeplerini öğrenelim.

### Hatalar {#bugs}

Tekil bir istemcideki hata Ethereum düğümlerinin azınlık bir kısmını temsil ediyorken ağ için daha küçük bir risktir. Birçok istemci arasında kabaca eşit bir düğüm dağılımı ile, çoğu istemcinin paylaşılan bir sorundan muzdarip olma olasılığı düşüktür ve sonuç olarak ağ daha sağlamdır.

### Saldırılara karşı dayanıklılık {#resilience}

İstemci çeşitliliği saldırılara karşı da dayanıklılık sağlar. Örneğin, [spesifik bir istemciyi](https://twitter.com/vdWijden/status/1437712249926393858) zincirin özel bir dalına doğru kandıran bir saldırının başarılı olma ihtimali düşüktür çünkü diğer istemcilerin aynı şekilde saldırılabilir olması muhtemel değildir ve normal zincir bozulmamış şekilde durur. Düşük istemci çeşitliliği, baskın istemciye yönelik bir saldırıyla ilişkilendirilen riski arttırır. İstemci çeşitliliği, ağdaki kötü niyetli saldırılara karşı önemli bir savunma olduğunu zaten kanıtlamıştır, örneğin 2016'daki Şanghay hizmet reddi saldırısı, saldırganların baskın istemciyi (Geth) blok başına on binlerce kez yavaş bir disk girdi/çıktı işlemi yürütmesi için kandırabilmeleri nedeniyle mümkün oldu. Çünkü açığı paylaşmayan alternatif istemciler de çevrimiçiydi, Geth'teki açık kapatılırken Ethereum saldırıya karşı koymayı ve çalışmaya devam etmeyi başarmıştı.

### Hisse kanıtı nihayeti {#finality}

Ethereum düğümlerinin %33'ünden fazlasına sahip olan bir fikir birliği katmanındaki bir açık fikir birliği katmanının kesinleşmesini engelleyebilirdi, yani kullanıcılar işlemlerin bir noktada geri alınmayacağına veya değiştirilmeyeceğine güvenemezdi. Bu özellikle DeFi gibi Ethereum üzerinde inşa edilmiş birçok uygulama için bayağı sıkıntılı olurdu.

<Emoji text="🚨" me="1rem" /> Daha kötüsü, üçte ikilik bir çoğunluğa sahip olan bir istemcideki kritik bir hata zincirin <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">hatalı biçimde ayrılmasına ve kesinleşmesine</a> yol açabilirdi, bu da doğrulayıcıların büyük bir kısmının geçersiz bir zincirde takılı kalmasına sebep olurdu. Eğer doğru zincire geri katılmak isterlerse, bu doğrulayıcılar ya cezalandırma ile ya da yavaş ve pahalı bir gönüllü çekilme ve yeniden aktifleştirme ile karşı karşıya kalırlardı. Bir kesintinin büyüklüğü maksimum olarak üçte ikilik bir çoğunluk cezalandırılacak şekilde (32 ETH) sorunlu düğümlerin sayısı ile ölçeklendirilir.

Bunlar muhtemel olmayan senaryolar olsa da, Ethereum ekosistemi istemcilerin aktif düğümler arasındaki dağıtımını eşitleyerek riski azaltabilir. İdeal olarak, hiçbir fikir birliği istemcisi, toplam düğümlerin %33'lük bir kısmına sahip olamaz.

### Ortak sorumluluk {#responsibility}

Çoğunluk istemciye sahip olmanın bir insan maliyeti de vardır. Küçük bir geliştirme ekibine aşırı baskı ve sorumluluk yükler. İstemci çeşitliliği ne kadar azsa, çoğunluk istemciyi koruyan geliştiricilerin sorumluluk yükü o kadar büyük olur. Bu sorumluluğu birden fazla ekibe yaymak, hem Ethereum'un düğüm ağının hem de insan ağının durumu için için iyidir.

## Mevcut istemci çeşitliliği {#current-client-diversity}

![İstemci çeşitliliğini gösteren pasta grafiği](./client-diversity.png) _[ethernodes.org](https://ethernodes.org) ve [clientdiversity.org](https://clientdiversity.org/) diyagram verisi_

Yukarıdaki iki pasta grafiği yürütüm ve fikir birliği katmanları için mevcut istemci çeşitliliğini resmetmektedir (yazıldığı Ocak 2022 esnasında). Yürütüm katmanı büyük oranda [Geth](https://geth.ethereum.org/) tarafından domine edilmiştir, uzak ikinci sırada [Open Ethereum](https://openethereum.github.io/) gelir, [Erigon](https://github.com/ledgerwatch/erigon) üçüncü ve [Nethermind](https://nethermind.io/) dördüncüdür, diğer istemciler de ağın %1'den azını kapsar. Fikir birliği katmanında en yaygın kullanılan istemci - [Prysm](https://prysmaticlabs.com/#projects) - Geth kadar baskın olmasa da yine de ağın %60'tan fazlasını temsil eder. [Lighthouse](https://lighthouse.sigmaprime.io/) ve [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) sırasıyla 20% ve 14% civarını kapsar ve diğer istemciler nadiren kullanılır.

Yürütüm katmanı verileri, 23 Ocak 2022 tarihinde [Ethernodes](https://ethernodes.org)'tan alınmıştır. Fikir birliği istemcileri hakkındaki veriler [Micheal Sproul](https://github.com/sigp/blockprint)'dan alınmıştır. Fikir birliği istemcisi verilerinin elde edilmesi daha zordur çünkü fikir birliği katmanı müşterileri her zaman onları tanımlamak için kullanılabilecek açık izlere sahip değildir. Veri bazen azınlık istemcilerin bazılarını karıştıran bir sınıflandırma algoritması tarafından oluşturulmuştur (daha fazla ayrıntı için [buraya](https://twitter.com/sproulM_/status/1440512518242197516) bakın). Yukarıdaki diyagramda, bu karışık sınıflandırmalar bir ya/veya etiketiyle işlem görmüştür (ör. Nimbus/Teku). Yine de, ağın çoğunluğunun Prysm çalıştırdığı açıktır. Veri belirli bir blok dizisinin anlık çekimidir (bu durumda 2048001 ila 2164916 arası yuvalardaki İşaret blokları) ve Prysm'in baskınlığı bazen %68'i geçecek şekilde daha yüksek olmuştur. Sadece anlık çekimler olmasına rağmen, diyagramdaki değerler mevcut istemci çeşitliliği durumu hakkında iyi bir genel algı sağlamaktadır.

Fikir birliği katmanı için güncel istemci çeşitliliği verileri artık [clientdiversity.org](https://clientdiversity.org/) adresinde mevcuttur.

## Yürütüm katmanı {#execution-layer}

Şimdiye kadar, istemci çeşitliliği etrafındaki konuşmalar esas olarak fikir birliği katmanına odaklandı. Ancak, yürütüm istemcisi [Geth](https://geth.ethereum.org) şu anda tüm düğümlerin yaklaşık %85'ini oluşturmaktadır. Bu yüzde, fikir birliği istemcileri için olduğu gibi aynı nedenlerle sorunludur. Örneğin, Geth'de işlemlerin ele alınmasını veya yürütme yüklerinin oluşturulmasını etkileyen bir hata fikir birliği istemcilerinin sıkıntılı veya hatalı işlemleri sonlandırmasına yol açabilir. Bundan dolayı, Ethereum daha eşit bir yürütüm katmanı dağılımı ile, ideal olarak hiçbir istemcinin ağın %33'ünden fazlasını temsil etmediği bir durum ile daha sağlıklı olurdu.

## Azınlık istemcisi kullanın {#use-minority-client}

İstemci çeşitliliğini ele almak, azınlık istemcileri seçmek için bireysel kullanıcılardan daha fazlasını gerektirir - madencilik/doğrulayıcı havuzları ve büyük dapp'ler ve borsalar gibi kurumların da istemcileri değiştirmesini gerektirir. Ancak tüm kullanıcılar tüm mevcut Ethereum yazılımlarının kullanımını normalleştirerek mevcut eşitsizliği ortadan kaldırmaya katkı sağlayabilirler. Birleşimden sonra, tüm düğüm operatörlerinin, bir yürütüm istemcisi ve bir fikir birliği istemcisi çalıştırmaları gerekecektir. Aşağıda önerilen istemci kombinasyonlarını seçmek, istemci çeşitliliğini artırmaya yardımcı olacaktır.

### Yürütüm istemcileri {#execution-clients}

[Besu](https://www.hyperledger.org/use/besu)

[Nethermind](https://downloads.nethermind.io/)

[Erigon](https://github.com/ledgerwatch/erigon)

[Go-Ethereum](https://geth.ethereum.org/)

### Mutabakat istemcileri {#consensus-clients}

[Nimbus](https://nimbus.team/)

[Lighthouse](https://github.com/sigp/lighthouse)

[Teku](https://consensys.net/knowledge-base/ethereum-2/teku/)

[Lodestar](https://github.com/ChainSafe/lodestar)

[Prysm](https://docs.prylabs.network/docs/getting-started)

Teknik kullanıcılar azınlık istemcileri için daha fazla öğretici ve doküman yazarak ve düğüm yöneten yakınlarını baskın istemcilerden ayrılmaya yönlendirerek bu süreci hızlandırmaya yardımcı olabilirler. Bir azınlık fikir birliği katmanına geçiş için kılavuzlar [clientdiversity.org](https://clientdiversity.org/) adresinde mevcuttur.

## İstemci çeşitliliği gösterge panelleri {#client-diversity-dashboards}

Birden fazla gösterge paneli yürütüm ve fikir birliği katmanları için gerçek zamanlı istemci çeşitliliği istatisikleri verir.

**Fikir birliği katmanı:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/) **Yürütüm katmanı:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Daha fazla okuma {#further-reading}

- [Ethereum'un fikir birliği katmanında istemci çeşitliliği](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Birleşimi: Çoğunluk istemcisini sorumluluğunu alarak çalıştırın!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 Mart 2022_
- [İstemci çeşitliliğinin önemi](https://our.status.im/the-importance-of-client-diversity/)
- [Ethereum düğüm hizmetleri listesi](https://ethereumnodes.com/)
- [İstemci çeşitliliği sorununun "Beş Nedeni"](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Ethereum Çeşitliliği ve Bunun İçin Nasıl Çözüm Buluruz (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## İlgili konular {#related-topics}

- [Bir Ethereum düğümü çalıştırın](/run-a-node/)
- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
