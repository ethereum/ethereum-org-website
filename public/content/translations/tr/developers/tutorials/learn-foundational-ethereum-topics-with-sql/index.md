---
title: "SQL ile Temel Ethereum Konularını Öğrenin"
description: "Bu eğitim, okuyucuların Yapılandırılmış Sorgu Dili (SQL) ile zincir içi verileri sorgulayarak işlemler, bloklar ve gaz dahil olmak üzere temel Ethereum kavramlarını anlamalarına yardımcı olur."
author: "Paul Apivat"
tags: ["SQL", "Sorgulama", "İşlemler", "veri-ve-analitik"]
skill: beginner
breadcrumb: SQL ile Ethereum
lang: tr
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Birçok Ethereum eğitimi geliştiricileri hedefler, ancak veri analistleri veya bir istemci veya düğüm çalıştırmadan zincir içi verileri görmek isteyen kişiler için eğitim kaynakları eksikliği vardır.

Bu eğitim, okuyucuların [Dune Analytics](https://dune.com/) tarafından sağlanan bir arayüz aracılığıyla yapılandırılmış sorgu dili (SQL) ile zincir içi verileri sorgulayarak işlemler, bloklar ve gaz dahil olmak üzere temel Ethereum kavramlarını anlamalarına yardımcı olur.

Zincir içi veriler, Ethereum'u, ağı ve bilgi işlem gücü için bir ekonomi olarak anlamamıza yardımcı olabilir ve bugün Ethereum'un karşılaştığı zorlukları (örneğin, artan gaz fiyatları) ve daha da önemlisi ölçeklendirme çözümleri etrafındaki tartışmaları anlamak için bir temel görevi görmelidir.

### İşlemler {#transactions}

Bir kullanıcının Ethereum'daki yolculuğu, kullanıcı kontrollü bir hesabı veya ETH bakiyesi olan bir varlığı başlatmasıyla başlar. İki hesap türü vardır: kullanıcı kontrollü veya akıllı sözleşme (bkz. [ethereum.org](/developers/docs/accounts/)).

Herhangi bir hesap, [Etherscan](https://etherscan.io/) veya [Blockscout](https://eth.blockscout.com/) gibi bir blok gezgininde görüntülenebilir. Blok gezginleri, Ethereum'un verilerine açılan bir portaldır. Bloklar, işlemler, madenciler, hesaplar ve diğer zincir içi etkinlikler hakkındaki verileri gerçek zamanlı olarak görüntülerler (bkz. [burası](/developers/docs/data-and-analytics/block-explorers/)).

Ancak bir kullanıcı, harici blok gezginleri tarafından sağlanan bilgileri doğrulamak için verileri doğrudan sorgulamak isteyebilir. [Dune Analytics](https://dune.com/), biraz SQL bilgisi olan herkese bu yeteneği sağlar.

Referans olarak, Ethereum Vakfı (EF) için akıllı sözleşme hesabı [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) üzerinde görüntülenebilir.

Unutulmaması gereken bir nokta, EF'ninki de dahil olmak üzere tüm hesapların, işlem göndermek ve almak için kullanılabilecek açık bir adresi olduğudur.

Etherscan'daki hesap bakiyesi, normal işlemlerden ve dahili işlemlerden oluşur. Dahili işlemler, adına rağmen, zincirin durumunu değiştiren _gerçek_ işlemler değildir. Bunlar, bir sözleşmenin yürütülmesiyle başlatılan değer transferleridir ([kaynak](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Dahili işlemlerin bir imzası olmadığı için blokzincire dahil **edilmezler** ve Dune Analytics ile sorgulanamazlar.

Bu nedenle, bu eğitim normal işlemlere odaklanacaktır. Bu şu şekilde sorgulanabilir:

```sql
WITH temp_table AS (
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    value / 1e18 AS ether,
    gas_used,
    gas_price / 1e9 AS gas_price_gwei
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
)
SELECT
    hash,
    block_number,
    block_time,
    "from",
    "to",
    ether,
    (gas_used * gas_price_gwei) / 1e9 AS txn_fee
FROM temp_table
```

Bu, Etherscan'ın işlem sayfasında sağlananla aynı bilgileri verecektir. Karşılaştırma için işte iki kaynak:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Blockscout'ta EF'nin sözleşme sayfası.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

Kontrol panelini [burada](https://dune.com/paulapivat/Learn-Ethereum) bulabilirsiniz. Sorguyu görmek için tabloya tıklayın (ayrıca yukarıya bakın).

### İşlemleri Parçalara Ayırmak {#breaking-down-transactions}

Gönderilen bir işlem, aşağıdakiler dahil olmak üzere çeşitli bilgiler içerir ([kaynak](/developers/docs/transactions/)):

- **Alıcı**: Alıcı adresi ("to" olarak sorgulanır)
- **İmza**: Bir göndericinin özel anahtarları bir işlemi imzalarken, SQL ile sorgulayabileceğimiz şey göndericinin açık adresidir ("from").
- **Değer**: Bu, transfer edilen ETH miktarıdır (bkz. `ether` sütunu).
- **Veri**: Bu, hash edilmiş rastgele veridir (bkz. `data` sütunu)
- **gasLimit** – işlem tarafından tüketilebilecek maksimum gaz birimi miktarı. Gaz birimleri hesaplama adımlarını temsil eder
- **maxPriorityFeePerGas** - madenciye öncelik ücreti olarak dahil edilecek maksimum gaz miktarı
- **maxFeePerGas** - işlem için ödenmek istenen maksimum gaz miktarı (baseFeePerGas ve maxPriorityFeePerGas dahil)

Ethereum Vakfı açık adresine yapılan işlemler için bu belirli bilgileri sorgulayabiliriz:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Bloklar {#blocks}

Her işlem, Ethereum sanal makinesinin ([EVM](/developers/docs/evm/)) durumunu değiştirecektir ([kaynak](/developers/docs/transactions/)). İşlemler, doğrulanmak ve bir bloka dahil edilmek üzere ağa yayınlanır. Her işlem bir blok numarasıyla ilişkilendirilir. Verileri görmek için belirli bir blok numarasını sorgulayabiliriz: 12396854 (bu yazının yazıldığı tarih itibarıyla Ethereum Vakfı işlemleri arasındaki en son blok, 11/5/21).

Ayrıca, sonraki iki bloku sorguladığımızda, her blokun bir önceki blokun hash'ini (yani üst hash) içerdiğini görebiliriz, bu da blokzincirin nasıl oluştuğunu gösterir.

Her blok, üst blokuna bir referans içerir. Bu, aşağıda `hash` ve `parent_hash` sütunları arasında gösterilmektedir ([kaynak](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

İşte Dune Analytics üzerindeki [sorgu](https://dune.com/queries/44856/88292):

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum."blocks"
WHERE "number" = 12396854 OR "number" = 12396855 OR "number" = 12396856
LIMIT 10
```

Zaman, blok numarası, zorluk, hash, üst hash ve nonce sorgulayarak bir bloku inceleyebiliriz.

Bu sorgunun kapsamadığı tek şey, aşağıda ayrı bir sorgu gerektiren _işlem listesi_ ve _durum kökü_ (state root). Tam veya arşivsel bir düğüm, tüm işlemleri ve durum geçişlerini depolayarak istemcilerin zincirin durumunu istedikleri zaman sorgulamasına olanak tanır. Bu büyük bir depolama alanı gerektirdiğinden, zincir verilerini durum verilerinden ayırabiliriz:

- Zincir verileri (blokların, işlemlerin listesi)
- Durum verileri (her işlemin durum geçişinin sonucu)

Durum kökü ikincisine girer ve _örtük_ veridir (zincir içi depolanmaz), zincir verileri ise açıktır ve zincirin kendisinde depolanır ([kaynak](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Bu eğitim için, Dune Analytics aracılığıyla SQL ile sorgulanabilen zincir içi verilere odaklanacağız.

Yukarıda belirtildiği gibi, her blok bir işlem listesi içerir, bunu belirli bir bloku filtreleyerek sorgulayabiliriz. En son bloku, 12396854'ü deneyeceğiz:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

İşte Dune üzerindeki SQL çıktısı:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Zincire eklenen bu tek blok, Ethereum sanal makinesinin ([EVM](/developers/docs/evm/)) durumunu değiştirir. Bazen düzinelerce, bazen yüzlerce işlem aynı anda doğrulanır. Bu özel durumda, 222 işlem dahil edilmiştir.

Gerçekte kaç tanesinin başarılı olduğunu görmek için, başarılı işlemleri saymak üzere başka bir filtre ekleriz:

```sql
WITH temp_table AS (
    SELECT * FROM ethereum."transactions"
    WHERE block_number = 12396854 AND success = true
    ORDER BY block_time DESC
)
SELECT
    COUNT(success) AS num_successful_txn
FROM temp_table
```

12396854 numaralı blok için, toplam 222 işlemden 204'ü başarıyla doğrulandı:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

İşlem istekleri saniyede onlarca kez gerçekleşir, ancak bloklar yaklaşık her 15 saniyede bir işlenir ([kaynak](/developers/docs/blocks/)).

Yaklaşık her 15 saniyede bir üretilen bir blok olduğunu görmek için, bir gündeki saniye sayısını (86400) 15'e bölerek günlük tahmini ortalama blok sayısını (~ 5760) elde edebiliriz.

Günlük üretilen Ethereum blokları grafiği (2016 - günümüz) şöyledir:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Bu zaman diliminde günlük üretilen ortalama blok sayısı ~5.874'tür:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Sorgular şunlardır:

```sql
# query to visualize number of blocks produced daily since 2016

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# average number of blocks produced per day

WITH temp_table AS (
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
)
SELECT
    AVG(block_count) AS avg_block_count
FROM temp_table
```

2016'dan bu yana günlük üretilen ortalama blok sayısı bu rakamın biraz üzerinde, 5.874'tür. Alternatif olarak, 86400 saniyeyi 5874 ortalama bloka bölmek 14,7 saniye veya yaklaşık her 15 saniyede bir blok sonucunu verir.

### Gaz {#gas}

Blokların boyutu sınırlıdır. Maksimum blok boyutu dinamiktir ve ağ talebine göre 12.500.000 ile 25.000.000 birim arasında değişir. Keyfi olarak büyük blok boyutlarının disk alanı ve hız gereksinimleri açısından tam düğümlere yük bindirmesini önlemek için sınırlar gereklidir ([kaynak](/developers/docs/blocks/)).

Blok gaz limitini kavramsallaştırmanın bir yolu, onu işlemleri gruplamak için mevcut blok alanının **arzı** olarak düşünmektir. Blok gaz limiti 2016'dan günümüze kadar sorgulanabilir ve görselleştirilebilir:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Bir de Ethereum zincirinde yapılan hesaplamalar (yani işlem göndermek, akıllı sözleşme çağırmak, bir NFT basımı) için ödeme yapmak üzere günlük olarak kullanılan gerçek gaz vardır. Bu, mevcut Ethereum blok alanı için **taleptir**:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

**Arz ve talebin** nasıl hizalandığını görmek için bu iki grafiği yan yana da koyabiliriz:

![gas_demand_supply](./gas_demand_supply.png)

Bu nedenle, mevcut arz göz önüne alındığında, gaz fiyatlarını Ethereum blok alanına olan talebin bir fonksiyonu olarak anlayabiliriz.

Son olarak, Ethereum zinciri için günlük ortalama gaz fiyatlarını sorgulamak isteyebiliriz, ancak bunu yapmak özellikle uzun bir sorgu süresine neden olacaktır, bu nedenle sorgumuzu Ethereum Vakfı tarafından işlem başına ödenen ortalama gaz miktarına filtreleyeceğiz.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Yıllar boyunca Ethereum Vakfı adresine yapılan tüm işlemler için ödenen gaz fiyatlarını görebiliriz. İşte sorgu:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Özet {#summary}

Bu eğitimle, zincir içi verileri sorgulayarak ve hissederek temel Ethereum kavramlarını ve Ethereum blokzincirinin nasıl çalıştığını anlıyoruz.

Bu eğitimde kullanılan tüm kodları barındıran kontrol paneli [burada](https://dune.com/paulapivat/Learn-Ethereum) bulunabilir.

Web3'ü keşfetmek için verilerin daha fazla kullanımı için [beni Twitter'da bulun](https://twitter.com/paulapivat).