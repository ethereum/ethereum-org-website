---
title: Veri ve analizler
description: Merkeziyetsiz uygulamalarınızda kullanmak üzere zincir üstü analitikleri ve verileri nasıl alırsınız
lang: tr
---

## Giriş {#Introduction}

Ağın kullanımı artmaya devam ettikçe, zincir üstü verilerde giderek artan miktarda değerli bilgi yer alacaktır. Veri hacmi hızlıca artarsa, bu bilgileri raporlamak veya bir dapp'ı yönlendirmek için hesaplama, toplama zamanı veya işlem süreci açısından ağır bir çaba haline gelebilir.

Mevcut veri sağlayıcılarından yararlanmak; geliştirmeyi hızlandırabilir, daha doğru sonuçlar üretebilir ve devam eden bakım çabalarını azaltabilir. Bu, bir ekibin projelerinin sağlamaya çalıştığı temel işlevselliğe odaklanmalarını sağlar.

## Ön Koşullar {#prerequisites}

Veri analizi bağlamında kullanımlarını daha iyi anlamak için [Blok Arayıcıları](/developers/docs/data-and-analytics/block-explorers/) temel konseptini anlamalısınız. Ayrıca, bir sistem tasarımına kattıkları faydaları anlamak için [indeks](/glossary/#index) kavramına aşina olun.

Mimari temeller açısından, teoride bile olsa bir [API](https://www.wikipedia.org/wiki/API) ve [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) öğesinin ne olduğunu anlamak.

## Blok Arayıcıları {#block-explorers}

Birçok [Blok Arayıcısı](/developers/docs/data-and-analytics/block-explorers/), geliştiricilere bloklar, işlemler, doğrulayıcılar, hesaplar ve diğer zincir üstü faaliyetler hakkındaki gerçek zamanlı verilere görünürlük sağlayacak [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) ağ geçitleri sunar.

Geliştiriciler daha sonra bu verileri işleyip dönüştürerek kullanıcılarına [blok zinciri](/glossary/#blockchain) ile benzersiz içgörüler ve etkileşimler sunabilir. Örneğin, [Etherscan](https://etherscan.io) ve [Blockscout](https://eth.blockscout.com) her 12 saniyelik yuva için yürütme ve mutabakat verileri sağlar.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/), alt grafikler olarak bilinen açık API'ler aracılığıyla blok zinciri verilerini sorgulamanın kolay bir yolunu sunan bir indeksleme protokolüdür.

The Graph ile geliştiriciler şunlardan yararlanabilir:

- Merkeziyetsiz indeksleme: Blok zinciri verilerinin birden çok indeksleyici aracılığıyla indekslenmesini sağlayarak tek bir hata noktasını ortadan kaldırır
- GraphQL sorguları: İndekslenmiş verileri sorgulamak için güçlü bir GraphQL arayüzü sağlayarak veri alımını çok basit hale getirir
- Özelleştirme: Blok zinciri verilerini dönüştürmek ve depolamak için kendi mantığınızı tanımlayın ve The Graph Ağı'ndaki diğer geliştiriciler tarafından yayınlanan alt grafikleri yeniden kullanın

5 dakika içinde bir alt grafik oluşturmak, dağıtmak ve sorgulamak için bu [hızlı başlangıç](https://thegraph.com/docs/en/quick-start/) kılavuzunu izleyin.

## İstemci çeşitliliği {#client-diversity}

[İstemci çeşitliliği](/developers/docs/nodes-and-clients/client-diversity/), hatalara ve istismarlara karşı dayanıklılık sağladığı için Ethereum ağının genel sağlığı açısından önemlidir. Şu anda [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) ve [Ethernodes](https://ethernodes.org/) dahil olmak üzere birkaç istemci çeşitliliği panosu bulunmaktadır.

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/), blok zinciri verilerini ilişkisel veritabanı (DuneSQL) tablolarına önceden işler, kullanıcıların SQL kullanarak blok zinciri verilerini sorgulamasına ve sorgu sonuçlarına dayalı panolar oluşturmasına olanak tanır. Zincir üstü veriler 4 ham tabloya ayrılmıştır: `blocks`, `transactions`, (olay) `logs` ve (çağrı) `traces`. Popüler sözleşmeler ve protokoller çözümlenmiş yani deşifre edilmiş ve her birinin kendi olay ve çağrı tablo seti bulunmaktadır. Bu olay ve çağrı tabloları daha fazla işlenmiş ve protokol türlerine göre soyutlama tabloları olarak organize edilmiştir; örneğin, dex, borç verme, sabit paralar vb.

## SQD {#sqd}

[SQD](https://sqd.dev/), büyük hacimli verilere verimli, izinsiz erişim sağlamak için optimize edilmiş, merkeziyetsiz, hiper ölçeklenebilir bir veri platformudur. Şu anda olay günlükleri, işlem makbuzları, izler ve işlem başına durum farklılıkları da dahil olmak üzere geçmiş zincir üstü verileri sunmaktadır. SQD, saniyede 150 bin bloka kadar indeksleme hızına ulaşan, özel veri çıkarma ve işleme ardışık düzenleri oluşturmak için güçlü bir araç seti sunar.

Başlamak için [belgeleri](https://docs.sqd.dev/) ziyaret edin veya SQD ile neler oluşturabileceğinize dair [EVM örneklerini](https://github.com/subsquid-labs/squid-evm-examples) görün.

## SubQuery Ağı {#subquery-network}

[SubQuery](https://subquery.network/), geliştiricilere web3 projeleri için hızlı, güvenilir, merkeziyetsiz ve özelleştirilmiş API'ler sunan lider bir veri indeksleyicisidir. SubQuery, 165'ten fazla ekosistemden (Ethereum dahil) geliştiricilerin, kullanıcıları için sezgisel ve sürükleyici deneyimler oluşturmalarını sağlayan zengin indeksli veriler sağlar. SubQuery ağı, durdurulamaz uygulamalarınızı dirençli ve merkeziyetsiz altyapı ağıyla güçlendirir. Veri işleme faaliyetleri için özel bir arka uç oluşturmaya zaman harcamak yerine geleceğin web3 uygulamalarını oluşturmak için SubQuery'nin blokzincir geliştirici araç setini kullanın.

Başlamak için, [SubQuery'nin yönetilen hizmetinde](https://managedservice.subquery.network/) veya [SubQuery'nin merkeziyetsiz ağında](https://app.subquery.network/dashboard) canlıya geçmeden önce test için yerel bir Docker ortamında Ethereum blok zinciri verilerini dakikalar içinde indekslemeye başlamak üzere [Ethereum hızlı başlangıç kılavuzunu](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) ziyaret edin.

## EVM Sorgu Dili {#evm-query-language}

EVM Sorgu Dili (EQL), EVM (Ethereum Sanal Makinesi) zincirlerini sorgulamak için tasarlanmış SQL benzeri bir dildir. EQL'nin nihai hedefi, geliştiricilere ve araştırmacılara günlük kullanım için ergonomik bir sözdizimi sunarken, EVM zincirinin birinci sınıf vatandaşları (bloklar, hesaplar ve işlemler) üzerinde karmaşık ilişkisel sorguları desteklemektir. EQL ile geliştiriciler, alışılmış SQL benzeri sözdizimini kullanarak blok zinciri verilerini alabilir ve karmaşık standart kod ihtiyacını ortadan kaldırabilir. EQL, standart blok zinciri veri isteklerini (örneğin, Ethereum'daki bir hesabın nonce'unu ve bakiyesini almak veya mevcut blok boyutunu ve zaman damgasını getirmek) destekler ve sürekli olarak daha karmaşık istekler ve özellik setleri için destek eklemektedir.

## Ek Okumalar {#further-reading}

- [Kripto Verilerini Keşfetme I: Veri Akış Mimarileri](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Graph Ağına Genel Bakış](https://thegraph.com/docs/en/about/)
- [Graph Sorgu Oyun Alanı](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan'deki API kod örnekleri](https://etherscan.io/apis#contracts)
- [Blockscout'taki API belgeleri](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in İşaret Zinciri gezgini](https://beaconcha.in)
- [Dune Temelleri](https://docs.dune.com/#dune-basics)
- [SubQuery Ethereum Hızlı Başlangıç Kılavuzu](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQD Ağına Genel Bakış](https://docs.sqd.dev/)
- [EVM Sorgu Dili](https://eql.sh/blog/alpha-release-notes)
