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

Birçok [Blok Arayıcısı](/developers/docs/data-and-analytics/block-explorers/), geliştiricilere bloklar, işlemler, madenciler, hesaplar ve diğer zincir üstü etkinlikler hakkında gerçek zamanlı verilere görünürlük sağlayacak [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API)'sı ağ geçitleri sunar.

Geliştiriciler daha sonra, kullanıcılarına [blok zincir](/glossary/#blockchain) ile benzersiz içgörüler ve etkileşimler sağlamak için bu verileri işleyebilir ve dönüştürebilir. Örneğin [Etherscan](https://etherscan.io) her 12 saniyelik aralıkta, yuvalar için yürütme ve mutabakat verileri sağlar.

## The Graph {#the-graph}

[Graph Network](https://thegraph.com/), blok zincir verilerini düzenlemek için merkeziyetsiz bir endeksleme protokolüdür. Geliştiriciler, The Graph ile zincir üstü verileri toplamak için zincir dışı ve merkezi veri depoları oluşturmak ve yönetmek yerine, tamamen genel altyapı üzerinde çalışan sunucusuz uygulamalar oluşturabilir.

Geliştiriciler, [GraphQL](https://graphql.org/)'u kullanarak, alt grafikler olarak bilinen küratörlüğünde açık API'lardan herhangi birini sorgulayarak dapp'larını sürmek için ihtiyaç duydukları gerekli bilgileri elde edebilirler. Bu dizinlenmiş alt grafikleri sorgulayarak, Raporlar ve merkeziyetsiz uygulamalar yalnızca performans ve ölçeklenebilirlik avantajları elde etmekle kalmaz, aynı zamanda ağ mutabakatı tarafından sağlanan yerleşik doğruluğu da elde eder. Ağa yeni iyileştirmeler ve/veya alt grafikler eklendikçe, projeleriniz bu geliştirmelerden yararlanmak için hızla yinelenebilir.

## İstemci çeşitliliği

[İstemci çeşitliliği](/developers/docs/nodes-and-clients/client-diversity/), Ethereum ağı için genel sağlık açısından önemlidir çünkü hatalara veya açıklardan kaynaklanabilecek istismar ve sorunlara karşı esneklik veya direnç sağlar. Şu anda [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://rated.network/), [execution-diversity.info](https://execution-diversity.info/) ve [Ethernodes](https://ethernodes.org/) dahil olmak üzere çeşitli istemci çeşitliliği gösterge panelleri bulunmaktadır.

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/), blok zincir verilerini ilişkisel veritabanı (PostgreSQL ve DatabricksSQL) tablolarına önceden işler, kullanıcıların SQL kullanarak blok zincir verilerini sorgulaması ve sorgu sonuçlarına dayalı panolar oluşturmasına olanak tanır. Zincir üzerindeki veriler 4 ham tablo halinde düzenlenmektedir: `bloklar`, `işlemler`, (olay/faaliyet) `günlükler` ve (çağrı) `izler`. Popüler sözleşmeler ve protokoller çözümlenmiş yani deşifre edilmiş ve her birinin kendi olay ve çağrı tablo seti bulunmaktadır. Bu olay ve çağrı tabloları daha fazla işlenmiş ve protokol türlerine göre soyutlama tabloları olarak organize edilmiştir; örneğin, dex, borç verme, sabit paralar vb.

## Daha Fazla Okuma {#further-reading}

- [Graph Ağına Genel Bakış](https://thegraph.com/docs/en/about/network/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan'deki API kodu örnekleri](https://etherscan.io/apis#contracts)
- [Beaconcha.in İçaret Zincir'i keşif aracı](https://beaconcha.in)
- [Dune Temelleri](https://docs.dune.com/#dune-basics)
