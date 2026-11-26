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
sourceUrl: https://web.archive.org/web/20260516182620/https://paulapivat.com/post/query_ethereum/
---

Birçok Ethereum eğitimi geliştiricileri hedefler, ancak veri analistleri veya bir istemci veya düğüm çalıştırmadan zincir içi verileri görmek isteyen kişiler için eğitim kaynakları eksikliği vardır.

Bu eğitim, okuyucuların [Dune](https://dune.com/) tarafından sağlanan bir arayüz aracılığıyla yapılandırılmış sorgu dili (SQL) ile zincir içi verileri sorgulayarak işlemler, bloklar ve gaz dahil olmak üzere temel Ethereum kavramlarını anlamalarına yardımcı olur. Sorgular, Dune'un SQL lehçesi olan [DuneSQL](https://docs.dune.com/query-engine/overview)'i kullanır.

Zincir içi veriler, Ethereum'u, ağı ve bilgi işlem gücü için bir ekonomi olarak anlamamıza yardımcı olabilir ve bugün Ethereum'un karşılaştığı zorlukları (örneğin, artan gaz fiyatları) ve daha da önemlisi ölçeklendirme çözümleri etrafındaki tartışmaları anlamak için bir temel görevi görmelidir.

### İşlemler {#transactions}

Bir kullanıcının Ethereum'daki yolculuğu, kullanıcı kontrollü bir hesap veya ETH bakiyesi olan bir varlık başlatmasıyla başlar. İki hesap türü vardır: kullanıcı kontrollü veya akıllı sözleşme (bkz. [ethereum.org](/developers/docs/accounts/)).

Herhangi bir hesap, [Etherscan](https://etherscan.io/) veya [Blockscout](https://eth.blockscout.com/) gibi bir blok gezgininde görüntülenebilir. Blok gezginleri, Ethereum'un verilerine açılan bir portaldır. Bloklar, işlemler, doğrulayıcılar, hesaplar ve diğer zincir içi etkinlikler hakkındaki verileri gerçek zamanlı olarak görüntülerler (bkz. [burası](/developers/docs/data-and-analytics/block-explorers/)).

Ancak bir kullanıcı, harici blok gezginleri tarafından sağlanan bilgileri doğrulamak için verileri doğrudan sorgulamak isteyebilir. [Dune](https://dune.com/), biraz SQL bilgisi olan herkese bu yeteneği sağlar.

Referans olarak, Ethereum Vakfı (EF) için akıllı sözleşme hesabı [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) üzerinde görüntülenebilir.

Unutulmaması gereken bir nokta, EF'ninki de dahil olmak üzere tüm hesapların, işlem göndermek ve almak için kullanılabilecek genel bir adresi olduğudur.

Etherscan'daki hesap bakiyesi, normal işlemlerden ve dahili işlemlerden oluşur. Dahili işlemler, adına rağmen, zincirin durumunu değiştiren _gerçek_ işlemler değildir. Bunlar, bir sözleşmenin yürütülmesiyle başlatılan değer transferleridir ([kaynak](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Dahili işlemlerin bir imzası olmadığı için, blokzincire işlem olarak dahil **edilmezler**. Dune bunları ayrı olarak, `ethereum.traces` tablosunda kaydeder.

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
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
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

Adreslerin tırnak işareti olmadan `0x...` değişmezleri olarak yazıldığına dikkat edin. DuneSQL'de adresler ve hash'ler dize değil, ikili değerlerdir.

Bu, Etherscan'ın işlem sayfasında sağlananla aynı bilgileri verecektir. Karşılaştırma için işte iki kaynak:

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Blockscout'ta EF'nin sözleşme sayfası.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune {#dune-analytics}

![Screenshot of a Dune query dashboard](./dune_view.png)

Kontrol panelini [burada](https://dune.com/paulapivat/Learn-Ethereum) bulabilirsiniz. Sorguyu görmek için tabloya tıklayın (ayrıca yukarıya bakın).

### İşlemleri Parçalara Ayırmak {#breaking-down-transactions}

Gönderilen bir işlem, aşağıdakiler dahil olmak üzere çeşitli bilgiler içerir ([kaynak](/developers/docs/transactions/)):

- **Alıcı**: Alıcı adresi ("to" olarak sorgulanır)
- **İmza**: Bir göndericinin özel anahtarları bir işlemi imzalarken, SQL ile sorgulayabileceğimiz şey göndericinin genel adresidir ("from").
- **Değer**: Bu, transfer edilen ETH miktarıdır (bkz. `ether` sütunu).
- **Veri**: Bu, hash'lenmiş rastgele veridir (bkz. `data` sütunu)
- **gasLimit** – işlem tarafından tüketilebilecek maksimum gaz birimi miktarı. Gaz birimleri hesaplama adımlarını temsil eder
- **maxPriorityFeePerGas** - doğrulayıcıya öncelik ücreti olarak dahil edilecek maksimum gaz miktarı
- **maxFeePerGas** - işlem için ödenmek istenen maksimum gaz miktarı (baseFeePerGas ve maxPriorityFeePerGas dahil)

Ethereum Vakfı genel adresine yapılan işlemler için bu belirli bilgileri sorgulayabiliriz:

```sql
SELECT
    "to",
    "from",
    value / 1e18 AS ether,
    data,
    gas_limit,
    gas_price / 1e9 AS gas_price_gwei,
    gas_used,
    ROUND(CAST(gas_used AS DOUBLE) / gas_limit * 100, 2) AS gas_used_pct
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

`CAST` gereklidir çünkü DuneSQL'de bir tam sayıyı diğerine bölmek tam sayı bir sonuç verir, bu da neredeyse her yüzdeyi sıfıra yuvarlar.

### Bloklar {#blocks}

Her işlem, Ethereum Sanal Makinesi'nin ([EVM](/developers/docs/evm/)) durumunu değiştirecektir ([kaynak](/developers/docs/transactions/)). İşlemler, doğrulanmak ve bir bloğa dahil edilmek üzere ağa yayınlanır. Her işlem bir blok numarasıyla ilişkilendirilir. Verileri görmek için belirli bir blok numarasını sorgulayabiliriz: 12396854 (yazının yazıldığı Mayıs 2021'de Ethereum Vakfı işlemleri arasındaki en son blok).

Dahası, sonraki iki bloğu sorguladığımızda, her bloğun bir önceki bloğun hash'ini (yani üst hash) içerdiğini görebiliriz, bu da blokzincirin nasıl oluştuğunu gösterir.

Her blok, üst bloğuna bir referans içerir. Bu, aşağıda `hash` ve `parent_hash` sütunları arasında gösterilmektedir ([kaynak](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

İşte sorgu:

```sql
SELECT
   time,
   number,
   hash,
   parent_hash,
   nonce
FROM ethereum.blocks
WHERE number IN (12396854, 12396855, 12396856)
```

Zamanı, blok numarasını, hash'i, üst hash'i ve nonce'u sorgulayarak bir bloğu inceleyebiliriz. Blok 12396854, blokların İş Kanıtı (PoW) ile çıkarıldığı ve nonce'un anlamlı olduğu [Birleşme](/roadmap/merge/)'den önce üretildi. Hisse Kanıtı (PoS) bloklarında nonce her zaman sıfırdır.

Bu sorgunun kapsamadığı tek şey, aşağıda ayrı bir sorgu gerektiren _işlem listesi_ ve _durum kökü_ (state root). Tam veya arşivsel bir düğüm, tüm işlemleri ve durum geçişlerini depolayarak istemcilerin zincirin durumunu istedikleri zaman sorgulamasına olanak tanır. Bu büyük bir depolama alanı gerektirdiğinden, zincir verilerini durum verilerinden ayırabiliriz:

- Zincir verileri (blokların, işlemlerin listesi)
- Durum verileri (her işlemin durum geçişinin sonucu)

Durum kökü ikincisine girer ve _örtük_ veridir (zincir içinde depolanmaz), zincir verileri ise açıktır ve zincirin kendisinde depolanır ([kaynak](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Bu eğitim için, Dune aracılığıyla SQL ile sorgulanabilen zincir içi verilere odaklanacağız.

Yukarıda belirtildiği gibi, her blok bir işlem listesi içerir, bunu belirli bir bloğa göre filtreleyerek sorgulayabiliriz. 12396854 numaralı bloğu deneyeceğiz:

```sql
SELECT * FROM ethereum.transactions
WHERE block_number = 12396854
```

İşte Dune'daki SQL çıktısı:

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

Zincire eklenen bu tek blok, Ethereum Sanal Makinesi'nin ([EVM](/developers/docs/evm/)) durumunu değiştirir. Bazen düzinelerce, bazen yüzlerce işlem aynı anda doğrulanır. Bu özel durumda, 222 işlem dahil edildi.

Gerçekte kaç tanesinin başarılı olduğunu görmek için, başarılı işlemleri saymak üzere başka bir filtre ekleriz:

```sql
SELECT
    COUNT(*) AS num_successful_txn
FROM ethereum.transactions
WHERE block_number = 12396854 AND success = true
```

12396854 numaralı blok için, toplam 222 işlemden 204'ü başarıyla doğrulandı:

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

İşlem istekleri saniyede düzinelerce kez gerçekleşir, ancak bloklar yalnızca periyodik olarak eklenir ([kaynak](/developers/docs/blocks/)). İş Kanıtı (PoW) altında, bir blok ortalama olarak her 13 ila 15 saniyede bir, çok fazla varyasyonla çıkarılıyordu. Eylül 2022'deki [Birleşme](/roadmap/merge/)'den bu yana, Hisse Kanıtı (PoS) zamanı 12 saniyelik slot'lara böler ve her slot en fazla bir bloğa sahip olabilir.

Yani bugün günde en fazla 86400 / 12 = 7200 blok olabilir. Uygulamada biraz daha azdır, çünkü bir doğrulayıcı zaman zaman slot'unu kaçırır.

Günlük üretilen Ethereum blokları grafiği (2016 - 2021) şöyledir:

![Chart showing daily Ethereum block production](./daily_blocks.png)

Bu zaman diliminde günlük üretilen ortalama blok sayısı ~5.874'tür:

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

Sorgular şunlardır:

İşte günlük üretilen blok sayısını görselleştirmek için sorgu. `WHERE` yan tümcesi, henüz bitmemiş olan geçerli günü hariç tutar.

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Ve bu sorgu, Birleşme'den önce ve sonra günde üretilen ortalama blok sayısını hesaplar. 15537394 numaralı blok, ilk Hisse Kanıtı (PoS) bloğudur.

```sql
WITH daily AS (
    SELECT
        DATE_TRUNC('day', time) AS dt,
        MIN(number) >= 15537394 AS after_merge,
        COUNT(*) AS block_count
    FROM ethereum.blocks
    WHERE time < DATE_TRUNC('day', NOW())
    GROUP BY 1
)
SELECT
    after_merge,
    AVG(block_count) AS avg_block_count,
    86400 / AVG(block_count) AS avg_seconds_per_block
FROM daily
GROUP BY 1
```

Bu eğitim ilk olarak Mayıs 2021'de yazıldığında, ortalama günde 5.874 blok veya her 14,7 saniyede bir bloktu. Birleşme'den sonra ortalama, maksimum 7200'ün biraz altındadır, yaklaşık her 12 saniyede bir bloktur.

### Gaz {#gas}

Blokların boyutu sınırlıdır. Her bloğun bir gaz limiti vardır ve [EIP-1559](/developers/docs/gas/#base-fee)'dan bu yana her bloğun ayrıca limitin yarısı olan bir gaz hedefi vardır. Bloklar hedeften daha fazla gaz kullandığında taban ücret artar ve daha az kullandıklarında düşer. Gaz limitinin kendisi doğrulayıcılar tarafından ayarlanır ve yıllar içinde birkaç kez yükseltilmiştir. Disk alanı ve hız gereksinimleri açısından tam düğümlere yük bindiren keyfi olarak büyük blok boyutlarını önlemek için limitler gereklidir ([kaynak](/developers/docs/blocks/)).

Blok gaz limitini kavramsallaştırmanın bir yolu, onu işlemleri gruplamak için mevcut blok alanının **arzı** olarak düşünmektir. Blok gaz limiti 2016'dan günümüze kadar sorgulanabilir ve görselleştirilebilir:

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

Bir de Ethereum zincirinde yapılan hesaplamalar (yani işlem gönderme, akıllı sözleşme çağırma, bir NFT basımı) için ödeme yapmak üzere günlük olarak kullanılan gerçek gaz vardır. Bu, mevcut Ethereum blok alanı için **taleptir**:

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum.blocks
WHERE time < DATE_TRUNC('day', NOW())
GROUP BY 1
ORDER BY 1
```

**Arz ve talebin** nasıl sıralandığını görmek için bu iki grafiği yan yana da koyabiliriz:

![gas_demand_supply](./gas_demand_supply.png)

Bu nedenle, mevcut arz göz önüne alındığında, gaz fiyatlarını Ethereum blok alanına olan talebin bir fonksiyonu olarak anlayabiliriz.

Son olarak, Ethereum zinciri için ortalama günlük gaz fiyatlarını sorgulamak isteyebiliriz, ancak bunu yapmak özellikle uzun bir sorgu süresine neden olacaktır, bu nedenle sorgumuzu Ethereum Vakfı tarafından işlem başına ödenen ortalama gaz miktarına göre filtreleyeceğiz.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

Yıllar boyunca Ethereum Vakfı adresine yapılan tüm işlemler için ödenen gaz fiyatlarını görebiliriz. İşte sorgu:

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum.transactions
WHERE "to" = 0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe
ORDER BY block_time DESC
```

### Özet {#summary}

Bu eğitimle, zincir içi verileri sorgulayarak ve hissederek temel Ethereum kavramlarını ve Ethereum blokzincirinin nasıl çalıştığını anlıyoruz.

Bu eğitimde kullanılan tüm kodları barındıran kontrol paneli [burada](https://dune.com/paulapivat/Learn-Ethereum) bulunabilir.

Web3'ü keşfetmek için verilerin daha fazla kullanımı için [beni Twitter'da bulun](https://twitter.com/paulapivat).
