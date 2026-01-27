---
title: SQL ile Temel Ethereum Konularını Öğrenin
description: Bu öğretici, okuyucuların Yapılandırılmış Sorgu Dili (SQL) ile zincir üstü verileri sorgulayarak işlemler, bloklar ve gaz dahil olmak üzere temel Ethereum kavramlarını anlamalarına yardımcı olur.
author: "Paul Apivat"
tags: [ "SQL", "Sorgulama", "İşlemler" ]
skill: beginner
lang: tr
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Birçok Ethereum öğreticisi geliştiricileri hedeflese de veri analistleri ya da bir istemci veya düğüm çalıştırmadan zincir üstü verileri görmek isteyen kişiler için yeterli eğitim kaynağı bulunmamaktadır.

Bu öğretici, okuyucuların [Dune Analytics](https://dune.com/) tarafından sağlanan bir arayüz aracılığıyla yapılandırılmış sorgu dili (SQL) ile zincir üstü verileri sorgulayarak işlemler, bloklar ve gaz dahil olmak üzere temel Ethereum kavramlarını anlamalarına yardımcı olur.

Zincir üstü veriler, Ethereum'u, ağı ve bir bilgi işlem gücü ekonomisi olarak anlamamıza yardımcı olabilir ve günümüzde Ethereum'un karşılaştığı zorlukları (yani artan gaz fiyatları) ve daha da önemlisi, ölçeklendirme çözümleri etrafındaki tartışmaları anlamak için bir temel oluşturmalıdır.

### İşlemler {#transactions}

Bir kullanıcının Ethereum'daki yolculuğu, kullanıcı kontrollü bir hesabı veya bir ETH bakiyesine sahip bir varlığı başlatmakla başlar. İki hesap türü vardır: kullanıcı kontrollü veya akıllı sözleşme (bkz. [ethereum.org](/developers/docs/accounts/)).

[Etherscan](https://etherscan.io/) veya [Blockscout](https://eth.blockscout.com/) gibi bir blok arayıcısında herhangi bir hesap görüntülenebilir. Blok arayıcıları, Ethereum'un verilerine açılan bir portaldır. Bloklar, işlemler, madenciler, hesaplar ve diğer zincir üstü etkinliklerle ilgili verileri gerçek zamanlı olarak görüntülerler (bkz. [burası](/developers/docs/data-and-analytics/block-explorers/)).

Ancak, bir kullanıcı harici blok arayıcıları tarafından sağlanan bilgileri karşılaştırmak için verileri doğrudan sorgulamak isteyebilir. [Dune Analytics](https://dune.com/), SQL hakkında biraz bilgisi olan herkese bu olanağı sağlar.

Referans olarak, Ethereum Foundation'ın (EF) akıllı sözleşme hesabı [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) üzerinde görüntülenebilir.

Unutulmaması gereken bir nokta, EF'ninki de dahil olmak üzere tüm hesapların, işlem göndermek ve almak için kullanılabilecek bir genel adrese sahip olmasıdır.

Etherscan'deki hesap bakiyesi, normal işlemlerden ve dahili işlemlerden oluşur. Dahili işlemler, adlarına rağmen, zincirin durumunu değiştiren _gerçek_ işlemler değildir. Bunlar, bir sözleşmenin yürütülmesiyle başlatılan değer transferleridir ([kaynak](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Dahili işlemlerin imzası olmadığından, blokzincirine **dahil edilmezler** ve Dune Analytics ile sorgulanamazlar.

Bu nedenle, bu öğretici normal işlemlere odaklanacaktır. Bu, şu şekilde sorgulanabilir:

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

Bu, Etherscan'in işlem sayfasında sağlanan bilgilerin aynısını verecektir. Karşılaştırma için iki kaynak şunlardır:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[EF'nin Blockscout'taki sözleşme sayfası.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Panoyu [burada](https://dune.com/paulapivat/Learn-Ethereum) bulabilirsiniz. Sorguyu görmek için tabloya tıklayın (ayrıca yukarıya bakın).

### İşlemleri Ayrıntılandırma {#breaking_down_transactions}

Gönderilen bir işlem, aşağıdakiler de dahil olmak üzere çeşitli bilgiler içerir ([kaynak](/developers/docs/transactions/)):

- **Alıcı**: Alıcı adres ("to" olarak sorgulanır)
- **İmza**: Bir göndericinin özel anahtarı bir işlemi imzalasa da, SQL ile sorgulayabileceğimiz şey göndericinin genel adresidir ("from").
- **Değer**: Bu, transfer edilen ETH miktarıdır (`ether` sütununa bakın).
- **Veri**: Bu, hash'lenmiş rastgele veridir (`data` sütununa bakın)
- **gasLimit** – işlem tarafından tüketilebilecek maksimum gaz birimi miktarı. Gaz birimleri, hesaplama adımlarını temsil eder
- **maxPriorityFeePerGas** - madenciye bahşiş olarak dahil edilecek maksimum gaz miktarı
- **maxFeePerGas** - işlem için ödenmeye razı olunan maksimum gaz miktarı (baseFeePerGas ve maxPriorityFeePerGas dahil)

Ethereum Foundation genel adresine yapılan işlemler için bu özel bilgileri sorgulayabiliriz:

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

Her işlem, Ethereum Sanal Makinesi'nin ([EVM](/developers/docs/evm/)) durumunu değiştirir ([kaynak](/developers/docs/transactions/)). İşlemler doğrulanmak üzere ağa yayınlanır ve bir bloğa dahil edilir. Her işlem bir blok numarası ile ilişkilidir. Verileri görmek için belirli bir blok numarasını sorgulayabiliriz: 12396854 (bu yazının yazıldığı 11/5/21 tarihi itibarıyla Ethereum Foundation işlemleri arasındaki en son blok).

Ayrıca, sonraki iki bloğu sorguladığımızda, her bloğun önceki bloğun hash'ini (yani üst hash) içerdiğini görebiliriz, bu da blok zincirinin nasıl oluştuğunu gösterir.

Her blok, üst bloğuna bir referans içerir. Bu, aşağıda `hash` ve `parent_hash` sütunları arasında gösterilmektedir ([kaynak](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

İşte Dune Analytics'teki [sorgu](https://dune.com/queries/44856/88292):

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

Bir bloğu; zaman, blok numarası, zorluk, hash değeri, üst hash değeri ve nonce değeri sorgulayarak inceleyebiliriz.

Bu sorgunun kapsamadığı tek şey, aşağıda ayrı bir sorgu gerektiren _işlem listesi_ ve _durum köküdür_. Tam veya arşiv düğümü, tüm işlemleri ve durum geçişlerini depolayarak istemcilerin herhangi bir zamanda zincirin durumunu sorgulamasına olanak tanır. Bu, büyük depolama alanı gerektirdiğinden, zincir verilerini durum verilerinden ayırabiliriz:

- Zincir verisi (blokların, işlemlerin listesi)
- Durum verileri (her işlemin durum geçişinin sonucu)

Durum kökü ikinci kategoriye girer ve _örtük_ veridir (zincir üstünde saklanmaz), zincir verileri ise açıktır ve zincirin kendisinde saklanır ([kaynak](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Bu öğreticide, Dune Analytics aracılığıyla SQL ile sorgulan_abilen_ zincir üstü verilere odaklanacağız.

Yukarıda belirtildiği gibi, her blok bir işlem listesi içerir; bunu belirli bir bloğa göre filtreleyerek sorgulayabiliriz. En son bloğu deneyeceğiz: 12396854

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

İşte Dune'daki SQL çıktısı:

![](./list_of_txn.png)

Zincire eklenen bu tek blok, Ethereum Sanal Makinesi'nin ([EVM](/developers/docs/evm/)) durumunu değiştirir. Bazen onlarca, bazen de yüzlerce işlem aynı anda doğrulanır. Bu özel durumda 222 işlem dahil edildi.

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

![](./successful_txn.png)

İşlem istekleri saniyede onlarca kez gerçekleşir, ancak bloklar yaklaşık olarak her 15 saniyede bir işlenir ([kaynak](/developers/docs/blocks/)).

Yaklaşık her 15 saniyede bir blok üretildiğini görmek için, bir gündeki saniye sayısını (86400) 15'e bölerek tahmini günlük ortalama blok sayısını (~ 5760) elde edebiliriz.

Günlük üretilen Ethereum blokları için grafik (2016 - günümüz) şöyledir:

![](./daily_blocks.png)

Bu zaman diliminde günlük üretilen ortalama blok sayısı ~5.874'tür:

![](./avg_daily_blocks.png)

Sorgular şunlardır:

```sql
# 2016'dan bu yana günlük üretilen blok sayısını görselleştirmek için sorgu

SELECT
    DATE_TRUNC('day', time) AS dt,
    COUNT(*) AS block_count
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1

# günlük üretilen ortalama blok sayısı

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

2016'dan bu yana günde üretilen ortalama blok sayısı, 5.874 ile bu sayının biraz üzerindedir. Alternatif olarak, 86400 saniyeyi 5874 ortalama bloğa bölmek 14,7 saniye veya yaklaşık olarak her 15 saniyede bir blok anlamına gelir.

### Gaz {#gas}

Blokların boyutu sınırlıdır. Maksimum blok boyutu dinamiktir ve ağ talebine göre 12.500.000 ila 25.000.000 birim arasında değişir. Keyfi olarak büyük blok boyutlarının disk alanı ve hız gereksinimleri açısından tam düğümlere yük bindirmesini önlemek için sınırlar gereklidir ([kaynak](/developers/docs/blocks/)).

Blok gaz limitini kavramsallaştırmanın bir yolu, onu işlemleri gruplamak için mevcut blok alanının **arzı** olarak düşünmektir. Blok gaz limiti 2016'dan günümüze sorgulanabilir ve görselleştirilebilir:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Ardından, Ethereum zincirinde yapılan hesaplama için günlük olarak kullanılan gerçek gaz vardır (yani, işlem gönderme, bir akıllı sözleşme çağırma, bir NFT basma). Bu, mevcut Ethereum blok alanı için olan **taleptir**:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

**Talep ve arzın** nasıl hizalandığını görmek için bu iki grafiği yan yana da koyabiliriz:

![gas_demand_supply](./gas_demand_supply.png)

Bu nedenle, mevcut arz göz önüne alındığında, gaz fiyatlarını Ethereum blok alanı talebinin bir fonksiyonu olarak anlayabiliriz.

Son olarak, Ethereum zinciri için ortalama günlük gaz fiyatlarını sorgulamak isteyebiliriz ancak bu, özellikle uzun bir sorgu süresine neden olacaktır, bu yüzden sorgumuzu Ethereum Foundation tarafından işlem başına ödenen ortalama gaz miktarına göre filtreleyeceğiz.

![](./ef_daily_gas.png)

Yıllar boyunca Ethereum Foundation adresine yapılan tüm işlemler için ödenen gaz fiyatlarını görebiliriz. Sorgu şu şekildedir:

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

Bu öğretici ile, temel Ethereum kavramlarını ve zincir üstü verileri sorgulayarak ve kavrayarak Ethereum blokzincirinin nasıl çalıştığını anlıyoruz.

Bu öğreticide kullanılan tüm kodları içeren pano [burada](https://dune.com/paulapivat/Learn-Ethereum) bulunabilir.

Web3'ü keşfetmek için verilerin daha fazla kullanımı hakkında bilgi için [beni Twitter'da bulun](https://twitter.com/paulapivat).
