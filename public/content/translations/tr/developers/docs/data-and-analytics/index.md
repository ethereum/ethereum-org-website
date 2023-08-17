---
title: Veri ve analizler
description: Dapp'lerinizde kullanmak için zincir içi analitik ve veriler nasıl elde edilir
lang: tr
---

## Giriş {#Introduction}

Ağın kullanımı artmaya devam ettikçe, zincir üzerindeki verilerde artan miktarda değerli bilgi bulunacaktır. Veri hacmi hızla arttıkça, bir dApp'i raporlamak veya yönlendirmek için bu bilgileri hesaplamak ve birleştirmek, zaman ve süreç gerektiren ağır bir çaba hâline gelebilir.

Mevcut veri sağlayıcılarından yararlanmak; geliştirmeyi hızlandırabilir, daha doğru sonuçlar üretebilir ve devam eden bakım çabalarını azaltabilir. Bu, bir ekibin projelerinin sağlamaya çalıştığı temel işlevselliğe odaklanmalarını sağlar.

## Ön Koşullar {#prerequisites}

Veri analizi bağlamında bunları kullanmayı daha iyi anlamak için [Blok Arayıcıları](/developers/docs/data-and-analytics/block-explorers/)'nın temel mantığını anlamalısınız. Ayrıca, bir sistem tasarımına kattıkları faydaları anlamak için [indeks](/glossary/#index) kavramını öğrenin.

Mimari kurulum temelleri açısından, teoride olsa bile [API](https://www.wikipedia.org/wiki/API) ve [REST](https://www.wikipedia.org/wiki/Representational_state_transfer)'in ne olduğunu anlamak.

## The Graph {#the-graph}

[Graph Network](https://thegraph.com/), blok zinciri verilerini düzenlemek için merkeziyetsiz bir endeksleme protokolüdür. Geliştiriciler, The Graph ile zincir üstü verileri toplamak için zincir dışı ve merkezi veri depoları oluşturmak ve yönetmek yerine, tamamen genel altyapı üzerinde çalışan sunucusuz uygulamalar oluşturabilir.

Geliştiriciler, [GraphQL](https://graphql.org/)'yi kullanarak, alt grafikler olarak bilinen, seçilmiş açık API'lerden herhangi birini sorgulayarak dApp'lerini yürütmek için ihtiyaç duydukları bilgileri elde edebilir. Raporlar ve dApp'ler bu endekslenmiş alt grafikleri sorgulayarak yalnızca performans ve ölçeklenebilirlik avantajları elde etmekle kalmaz, aynı zamanda ağ mutabakatı tarafından sağlanan yerleşik doğruluğu da elde ederler. Ağa yeni iyileştirmeler ve/veya alt grafikler eklendikçe, projeleriniz bu geliştirmelerden yararlanmak için hızla yinelenebilir.

## Blok arayıcıları {#block-explorers}

Birçok [Blok Arayıcısı](/developers/docs/data-and-analytics/block-explorers/), geliştiricilere bloklar, işlemler, madenciler, hesaplar ve diğer zincir üstü etkinlikler hakkında gerçek zamanlı verilere görünürlük sağlayacak [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API)'si ağ geçitleri sunar.

Geliştiriciler daha sonra, kullanıcılarına [blok zinciri](/glossary/#blockchain) ile benzersiz içgörüler ve etkileşimler sağlamak için bu verileri işleyebilir ve dönüştürebilir.

## Daha fazla bilgi {#further-reading}

- [Graph Ağına Genel Bakış](https://thegraph.com/docs/en/about/network/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan'deki API kodu örnekleri](https://etherscan.io/apis#contracts)
