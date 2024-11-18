---
title: Veri ve analizler
description: Dapp'lerinizde kullanmak için zincir içi analitik ve veriler nasıl elde edilir
lang: tr
---

## Giriş {#Introduction}

Ağın kullanımı artmaya devam ettikçe, zincir üzerindeki verilerde artan miktarda değerli bilgi bulunacaktır. Veri hacmi hızlıca artarsa, bu bilgileri raporlamak veya bir dapp'ı yönlendirmek için hesaplama, toplama zamanı veya işlem süreci açısından ağır bir çaba haline gelebilir.

Mevcut veri sağlayıcılarından yararlanmak; geliştirmeyi hızlandırabilir, daha doğru sonuçlar üretebilir ve devam eden bakım çabalarını azaltabilir. Bu, bir ekibin projelerinin sağlamaya çalıştığı temel işlevselliğe odaklanmalarını sağlar.

## Ön Koşullar {#prerequisites}

Veri analizi bağlamında bunları kullanmayı daha iyi anlamak için [Blok Arayıcıları](/developers/docs/data-and-analytics/block-explorers/)'nın temel mantığını anlamalısınız. Ayrıca, bir sistem tasarımına kattıkları faydaları anlamak için [indeks](/glossary/#index) kavramını öğrenin.

Mimari kurulum temelleri açısından, teoride olsa bile [API](https://www.wikipedia.org/wiki/API) ve [REST](https://www.wikipedia.org/wiki/Representational_state_transfer)'in ne olduğunu anlamak.

## Blok arayıcıları {#block-explorers}

Çoğu [Block Arayıcısı](/developers/docs/data-and-analytics/block-explorers/) geliştiricilere bloklar, işlemler, doğrulayıcılar, hesaplar ve zincir üstündeki diğer aktiviteler hakkında gerçek zamanlı verilerin görünürlüğünü sağlamak için [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) ağ geçitleri sunar.

Geliştiriciler daha sonra, kullanıcılarına [blok zincir](/glossary/#blockchain) ile benzersiz içgörüler ve etkileşimler sağlamak için bu verileri işleyebilir ve dönüştürebilir. Örneğin [Etherscan](https://etherscan.io) her 12 saniyelik aralıkta, yuvalar için yürütme ve mutabakat verileri sağlar.

## The Graph {#the-graph}

[Graph Network](https://thegraph.com/), blok zincir verilerini düzenlemek için merkeziyetsiz bir endeksleme protokolüdür. Geliştiriciler, The Graph ile zincir üstü verileri toplamak için zincir dışı ve merkezi veri depoları oluşturmak ve yönetmek yerine, tamamen genel altyapı üzerinde çalışan sunucusuz uygulamalar oluşturabilir.

Geliştiriciler, [GraphQL](https://graphql.org/)'u kullanarak, alt grafikler olarak bilinen küratörlüğünde açık API'lardan herhangi birini sorgulayarak dapp'larını sürmek için ihtiyaç duydukları gerekli bilgileri elde edebilirler. Bu dizinlenmiş alt grafikleri sorgulayarak, Raporlar ve merkeziyetsiz uygulamalar yalnızca performans ve ölçeklenebilirlik avantajları elde etmekle kalmaz, aynı zamanda ağ mutabakatı tarafından sağlanan yerleşik doğruluğu da elde eder. Ağa yeni iyileştirmeler ve/veya alt grafikler eklendikçe, projeleriniz bu geliştirmelerden yararlanmak için hızla yinelenebilir.

## İstemci çeşitliliği

[İstemci çeşitliliği](/developers/docs/nodes-and-clients/client-diversity/), Ethereum ağı için genel sağlık açısından önemlidir çünkü hatalara veya açıklardan kaynaklanabilecek istismar ve sorunlara karşı esneklik veya direnç sağlar. Şu anda [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) ve [Ethernodes](https://ethernodes.org/) dahil olmak üzere çeşitli istemci çeşitliliği gösterge panelleri bulunmaktadır.

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/), blok zincir verilerini ilişkisel veritabanı (DuneSQL) tablolarına önceden işler, kullanıcıların SQL kullanarak blok zincir verilerini sorgulaması ve sorgu sonuçlarına dayalı panolar oluşturmasına olanak tanır. Zincir üzerindeki veriler 4 ham tablo halinde düzenlenmektedir: `bloklar`, `işlemler`, (olay/faaliyet) `günlükler` ve (çağrı) `izler`. Popüler sözleşmeler ve protokoller çözümlenmiş yani deşifre edilmiş ve her birinin kendi olay ve çağrı tablo seti bulunmaktadır. Bu olay ve çağrı tabloları daha fazla işlenmiş ve protokol türlerine göre soyutlama tabloları olarak organize edilmiştir; örneğin, dex, borç verme, sabit paralar vb.

## SubQuery Ağı {#subquery-network}

[SubQuery](https://subquery.network/), geliştiricilere Web3 projeleri için hızlı, güvenilir, merkeziyetsiz ve kişiselleştirilmiş API'ler sağlayan öncü veri indeksleyicisidir. SubQuery, 165'ten fazla ekosistemden (Ethereum dahil) geliştiricilerin, kullanıcıları için sezgisel ve sürükleyici deneyimler oluşturmalarını sağlayan zengin indeksli veriler sağlar. SubQuery ağı, durdurulamaz uygulamalarınızı dirençli ve merkeziyetsiz altyapı ağıyla güçlendirir. Veri işleme faaliyetleri için özel bir arka uç oluşturmaya zaman harcamak yerine geleceğin web3 uygulamalarını oluşturmak için SubQuery'nin blokzincir geliştirici araç setini kullanın.

Başlarken, Ethereum blokzinciri verilerini yerel bir Docker ortamında dakikalar içinde indekslemeye başlamak ve ardından [SubQuery'nin yönetilen hizmetinde](https://managedservice.subquery.network/) veya [SubQuery'nin merkeziyetsiz ağında](https://app.subquery.network/dashboard) kullanıma sunmadan önce test etmek için [Ethereum hızlı başlangıç ​​kılavuzunu](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) ziyaret edin.

## Ethernow - Bellek Havuzu Veri Programı {#ethernow}
[Blocknative](https://www.blocknative.com/), Ethereum'un geçmiş [bellek havuzu veri arşivine](https://www.ethernow.xyz/mempool-data-archive) açık erişim sunar. Bu, araştırmacıların ve topluluk yararına projelerin Ethereum Ana Ağının zincir öncesi katmanını keşfetmesini mümkün kılar. Bu veri grubu aktif olarak yönetilmektedir ve Ethereum ekosistemindeki bellek havuzu işlem etkinliklerinin en kapsayıcı kaydıdır. [Ethernow](https://www.ethernow.xyz/)'dan daha fazla bilgi edinin.

## Daha Fazla Okuma {#further-reading}

- [Graph Ağına Genel Bakış](https://thegraph.com/docs/en/about/network/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan'deki API kodu örnekleri](https://etherscan.io/apis#contracts)
- [Beaconcha.in İçaret Zincir'i keşif aracı](https://beaconcha.in)
- [Dune Temelleri](https://docs.dune.com/#dune-basics)
- [SubQuery Ethereum Hızlı Başlangıç Kılavuzu](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
