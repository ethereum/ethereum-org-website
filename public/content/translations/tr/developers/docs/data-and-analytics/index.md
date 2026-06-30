---
title: Veri ve analitik
description: "Merkeziyetsiz uygulamalarınızda (dapp'ler) kullanmak üzere zincir içi analitik ve verilerin nasıl elde edileceği"
lang: tr
---

## Giriş {#introduction}

Ağın kullanımı artmaya devam ettikçe, zincir içi verilerde giderek artan miktarda değerli bilgi bulunacaktır. Veri hacmi hızla arttıkça, bu bilgileri raporlamak veya bir merkeziyetsiz uygulamayı (dapp) çalıştırmak için hesaplamak ve bir araya getirmek, zaman ve işlem açısından yoğun bir çaba haline gelebilir.

Mevcut veri sağlayıcılarından yararlanmak geliştirmeyi hızlandırabilir, daha doğru sonuçlar üretebilir ve devam eden bakım çabalarını azaltabilir. Bu, bir ekibin projelerinin sağlamaya çalıştığı temel işlevselliğe odaklanmasını sağlayacaktır.

## Ön Koşullar {#prerequisites}

Veri analitiği bağlamında kullanımlarını daha iyi anlamak için [Blok Gezginlerinin](/developers/docs/data-and-analytics/block-explorers/) temel kavramını anlamalısınız. Ayrıca, bir sistem tasarımına kattıkları faydaları anlamak için [endeks](/glossary/#index) kavramına aşina olun.

Mimari temeller açısından, teoride bile olsa bir [API](https://www.wikipedia.org/wiki/API) ve [REST](https://www.wikipedia.org/wiki/Representational_state_transfer)'in ne olduğunu anlamak faydalıdır.

## Blok gezginleri {#block-explorers}

Birçok [Blok Gezgini](/developers/docs/data-and-analytics/block-explorers/), geliştiricilere bloklar, işlemler, doğrulayıcılar, hesaplar ve diğer zincir içi aktiviteler hakkındaki gerçek zamanlı verilere görünürlük sağlayacak [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) ağ geçitleri sunar.

Geliştiriciler daha sonra bu verileri işleyip dönüştürerek kullanıcılarına [Blokzincir](/glossary/#blockchain) ile benzersiz içgörüler ve etkileşimler sunabilirler. Örneğin, [Etherscan](https://etherscan.io) ve [Blockscout](https://eth.blockscout.com), her 12 saniyelik slot için yürütme ve mutabakat verileri sağlar.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/), alt grafikler olarak bilinen açık API'ler aracılığıyla blokzincir verilerini sorgulamanın kolay bir yolunu sağlayan bir endeksleme protokolüdür.

The Graph ile geliştiriciler şunlardan faydalanabilir:

- Merkeziyetsiz endeksleme: Blokzincir verilerinin birden fazla endeksleyici aracılığıyla endekslenmesini sağlar, böylece tek bir hata noktasını ortadan kaldırır
- GraphQL sorguları: Endekslenmiş verileri sorgulamak için güçlü bir GraphQL arayüzü sağlayarak veri alımını son derece basit hale getirir
- Özelleştirme: Blokzincir verilerini dönüştürmek ve depolamak için kendi mantığınızı tanımlayın ve The Graph Ağı'nda diğer geliştiriciler tarafından yayınlanan alt grafikleri yeniden kullanın

5 dakika içinde bir alt grafik oluşturmak, dağıtmak ve sorgulamak için bu [hızlı başlangıç](https://thegraph.com/docs/en/quick-start/) kılavuzunu izleyin.

## İstemci çeşitliliği {#client-diversity}

[İstemci çeşitliliği](/developers/docs/nodes-and-clients/client-diversity/), hatalara ve istismarlara karşı dayanıklılık sağladığı için Ethereum ağının genel sağlığı açısından önemlidir. Günümüzde [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) ve [Ethernodes](https://ethernodes.org/) dahil olmak üzere çeşitli istemci çeşitliliği panoları bulunmaktadır.

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/), blokzincir verilerini ilişkisel veritabanı (DuneSQL) tablolarına önceden işler, kullanıcıların SQL kullanarak blokzincir verilerini sorgulamasına ve sorgu sonuçlarına dayalı panolar oluşturmasına olanak tanır. Zincir içi veriler 4 ham tablo halinde düzenlenir: `blocks`, `transactions`, (olay) `logs` ve (çağrı) `traces`. Popüler sözleşmeler ve protokoller çözülmüştür ve her birinin kendi olay ve çağrı tabloları seti vardır. Bu olay ve çağrı tabloları daha da işlenir ve protokol türüne göre (örneğin dex, borç verme, sabit coin'ler vb.) soyutlama tabloları halinde düzenlenir.

## SQD {#sqd}

[SQD](https://sqd.dev/), büyük hacimli verilere verimli ve izinsiz erişim sağlamak için optimize edilmiş merkeziyetsiz, hiper ölçeklenebilir bir veri platformudur. Şu anda olay günlükleri, işlem makbuzları, izler ve işlem başına durum farkları dahil olmak üzere geçmiş zincir içi verileri sunmaktadır. SQD, saniyede 150 bin bloğa kadar endeksleme hızına ulaşarak özel veri çıkarma ve işleme ardışık düzenleri oluşturmak için güçlü bir araç seti sunar.

Başlamak için [belgeleri](https://docs.sqd.dev/) ziyaret edin veya SQD ile neler oluşturabileceğinize dair [EVM örneklerine](https://github.com/subsquid-labs/squid-evm-examples) bakın.

## SubQuery Ağı {#subquery-network}

[SubQuery](https://subquery.network/), geliştiricilere Web3 projeleri için hızlı, güvenilir, merkeziyetsiz ve özelleştirilmiş API'ler sunan lider bir veri endeksleyicidir. SubQuery, kullanıcıları için sezgisel ve sürükleyici deneyimler oluşturmaları amacıyla 165'ten fazla ekosistemden (Ethereum dahil) geliştiricileri zengin endekslenmiş verilerle güçlendirir. SubQuery Ağı, durdurulamaz uygulamalarınızı esnek ve merkeziyetsiz bir altyapı ağıyla destekler. Veri işleme faaliyetleri için özel bir arka uç oluşturmaya zaman harcamadan geleceğin Web3 uygulamalarını oluşturmak için SubQuery'nin blokzincir geliştirici araç setini kullanın.

Başlamak için, [SubQuery'nin yönetilen hizmetinde](https://managedservice.subquery.network/) veya [SubQuery'nin merkeziyetsiz ağında](https://app.subquery.network/dashboard) canlıya geçmeden önce test amacıyla yerel bir Docker ortamında dakikalar içinde Ethereum blokzincir verilerini endekslemeye başlamak üzere [Ethereum hızlı başlangıç kılavuzunu](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) ziyaret edin.

## Codex {#codex}

[Codex](https://www.codex.io/), 80'den fazla ağda 70 milyondan fazla Token için zenginleştirilmiş veriler sağlayan gerçek zamanlı bir blokzincir veri API'sidir. Geliştiriciler, özel endeksleme altyapısını sürdürmeden yapılandırılmış Token fiyatlandırmasına, Cüzdan bakiyelerine, işlem geçmişine ve toplu analitiklere (hacim, Likidite, benzersiz Cüzdanlar) erişebilirler. Codex, WebSocket ve webhook entegrasyonları aracılığıyla saniyenin altında veri iletimini destekler.

Başlamak için [belgeleri](https://docs.codex.io) ziyaret edin, [Gezgini](https://docs.codex.io/explore) deneyin veya [panoya](https://dashboard.codex.io/signup) kaydolun.

## EVM Sorgu Dili {#evm-query-language}

EVM Sorgu Dili (EQL), EVM (Ethereum Sanal Makinesi) zincirlerini sorgulamak için tasarlanmış SQL benzeri bir dildir. EQL'nin nihai amacı, geliştiricilere ve araştırmacılara günlük kullanım için ergonomik bir sözdizimi sağlarken EVM zincirinin birinci sınıf vatandaşları (bloklar, hesaplar ve işlemler) üzerinde karmaşık ilişkisel sorguları desteklemektir. EQL ile geliştiriciler, tanıdık SQL benzeri sözdizimini kullanarak blokzincir verilerini getirebilir ve karmaşık ortak kod (boilerplate) ihtiyacını ortadan kaldırabilir. EQL, standart blokzincir veri isteklerini (örneğin, Ethereum'da bir Hesabın nonce'unu ve bakiyesini almak veya mevcut Blok boyutunu ve zaman damgasını getirmek) destekler ve daha karmaşık istekler ile özellik setleri için sürekli olarak destek eklemektedir.

## Daha Fazla Okuma {#further-reading}

- [Kripto Verilerini Keşfetmek I: Veri Akışı Mimarileri](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Graph Ağına Genel Bakış](https://thegraph.com/docs/en/about/)
- [Graph Sorgu Oyun Alanı](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan'de API kod örnekleri](https://etherscan.io/apis#contracts)
- [Blockscout'ta API belgeleri](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in İşaret Zinciri gezgini](https://beaconcha.in)
- [Dune Temelleri](https://docs.dune.com/#dune-basics)
- [SubQuery Ethereum Hızlı Başlangıç Kılavuzu](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQD Ağına Genel Bakış](https://docs.sqd.dev/)
- [EVM Sorgu Dili](https://web.archive.org/web/20250719151453/https://www.eql.sh/blog/alpha-release-notes)

## Eğitimler: Veri ve analitik / Ethereum'da SQL {#tutorials}

- [SQL ile Temel Ethereum Konularını Öğrenin](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– İşlemleri, blokları ve gaz temellerini anlamak için zincir içi Ethereum verilerini SQL ile sorgulayın._
