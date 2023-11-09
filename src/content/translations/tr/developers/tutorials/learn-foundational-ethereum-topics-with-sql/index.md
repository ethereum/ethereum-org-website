---
title: SQL ile Temel Ethereum Konularını Öğrenin
description: Bu öğretici, okuyucuların Yapılandırılmış Sorgu Dili (SQL) ile zincir verilerini sorgulayarak işlemler, bloklar ve gaz dahil olmak üzere temel Ethereum kavramlarını anlamalarına yardımcı olur.
author: "Paul Apivat"
tags:
  - "SQL"
  - "Sorgulama"
  - "İşlemler"
skill: advanced
lang: tr
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

Birçok Ethereum öğreticisi geliştiricileri hedefler, ancak veri analisti veya bir istemci veya düğüm çalıştırmadan zincir üstü verileri görmek isteyen kişiler için eğitim kaynağı eksikliği vardır.

Bu öğretici, [Dune Analytics](https://dune.xyz/home) tarafından sağlanan bir arayüz aracılığıyla yapılandırılmış sorgu dili (SQL) ile okuyucuların zincir verilerini sorgulayarak işlemler, bloklar ve gaz dahil olmak üzere temel Ethereum kavramlarını anlamalarına yardımcı olur.

Zincir üstü veriler, Ethereum'u bir ağ ve bir bilgi işlem gücü ekonomisi olarak anlamamıza yardımcı olabilir ve bugün Ethereum'un karşılaştığı zorlukları (yani artan gaz fiyatları) ve daha da önemlisi ölçeklendirme çözümleri hakkındaki tartışmaları anlamak için bir temel görevi görebilir.

### İşlemler {#transactions}

Bir kullanıcının Ethereum'daki yolculuğu, kullanıcı tarafından kontrol edilen bir hesabı veya ETH bakiyesi olan bir varlığı başlatmakla başlar. İki hesap türü vardır: Kullanıcı kontrollü hesap veya bir akıllı sözleşme (bkz. [ethereum.org](/developers/docs/accounts/)).

Herhangi bir hesap, [Etherscan](https://etherscan.io/) gibi bir blok arayıcısında görüntülenebilir. Blok arayıcıları Ethereum'un verisine açılan bir geçittir. Bloklar, işlemler, madenciler, hesaplar ve diğer zincir içi faaliyetlerle ilgili verileri gerçek zamanlı olarak görüntülerler ([buraya](/developers/docs/data-and-analytics/block-explorers/) göz atın).

Bununla birlikte, bir kullanıcı, harici blok arayıcıları tarafından sağlanan bilgileri karşılaştırmak için verileri doğrudan sorgulamak isteyebilir. [Dune Analytics](https://duneanalytics.com/) SQL bilgisi olan herhangi birine bu kabiliyeti sağlar.

Referans olarak, Ethereum Vakfı (EF) için akıllı sözleşme hesabı [Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) adresinde görüntülenebilir.

Unutulmaması gereken bir nokta, Ethereum Vakfı'nınki de dahil olmak üzere tüm hesapların işlem göndermek ve almak için kullanılabilecek bir genel adrese sahip olmasıdır.

Etherscan'daki hesap bakiyesi, düzenli işlemler ve dahili işlemlerden oluşur. Adına rağmen dahili işlemler, zincirin durumunu değiştiren _gerçek_ işlemler değildir. Onlar bir sözleşmenin yürütümünden oluşturulan değer transferleridir ([kaynak](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). Dahili işlemlerin imzası olmadığı için blok zincirine **dahil edilmezler** ve Dune Analytics ile sorgulanamazlar.

Bu nedenle, bu öğreticide düzenli işlemlere odaklanılacaktır. Bu, şu şekilde sorgulanabilir:

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

Bu, Etherscan'in işlem sayfasında sağlanan bilgilerin aynısını verecektir. Karşılaştırma olarak, burada iki kaynak vardır:

#### Etherscan {#etherscan}

![](./etherscan_view.png)

[Etherscan üzerinde Ethereum Vakfı'nın sözleşme sayfası.](https://etherscan.io/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![](./dune_view.png)

Gösterge panelini [burada](https://duneanalytics.com/paulapivat/Learn-Ethereum) bulabilirsiniz. Sorguyu görmek için tabloya tıklayın (yukarıya da bakın).

### İşlemleri Parçalara Ayırma {#breaking_down_transactions}

Gönderilen bir işlem, şunlar da dahil olmak üzere çeşitli bilgiler içerir ([kaynak](/developers/docs/transactions/)):

- **Recipient**: Alıcı adres ("to" olarak sorgulanır)
- **Signature**: Göndericinin özel anahtarları bir işlemi imzalarken, SQL ile sorgulayabileceğimiz şey gönderenin açık adresidir ("from").
- **Value**: Aktarılan ETH miktarı (`ether` sütununa bakınız).
- **Data**: Bu hash edilmiş olan rastgele veridir (`data` sütununa bakınız)
- **gasLimit** – işlem tarafından tüketilebilecek maksimum gaz birimi miktarı. Gaz birimleri, bilgi işlem adımlarını temsil eder
- **maxPriorityFeePerGas** - madenciye bahşiş olarak dahil edilecek maksimum gaz miktarı
- **maxFeePerGas** - işlem için ödemeye razı olunan maksimum gaz miktarı (baseFeePerGas ve maxPriorityFeePerGas dahil)

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
    ROUND(((gas_used / gas_limit) * 100),2) AS gas_used_pct
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### Bloklar {#blocks}

Her işlem Ethereum sanal makinesinin ([EVM](/developers/docs/evm/)) durumunu değiştirir ([kaynak](/developers/docs/transactions/)). İşlemler doğrulanmak üzere ağa yayınlanır ve bir bloğa dahil edilir. Her işlem bir blok numarası ile ilişkilendirilir. Verileri görmek için belirli bir blok numarasını sorgulayabiliriz: 12396854 (bu yazı itibariyle Ethereum Vakfı işlemleri arasında en son blok, 11/5/21).

Ayrıca, sonraki iki bloğu sorguladığımızda, her bloğun bir önceki bloğun hash değerini (yani üst hash) içerdiğini görebiliriz, bu da blok zincirinin nasıl oluştuğunu gösterir.

Her blok, üst bloğa bir referans içerir. Bu, aşağıda `hash` ve `parent_hash` sütunlarının arasında gösterilmektedir ([kaynak](/developers/docs/blocks/)):

![parent_hash](./parent_hash.png)

Dune Analytics üzerinde [sorgu](https://duneanalytics.com/queries/44856/88292):

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

Bir bloğu zaman, blok numarası, zorluk, hash değeri, üst hash değeri ve nonce değeri sorgulayarak inceleyebiliriz.

Bu sorgunun kapsamadığı tek şey, aşağıda ayrı bir sorgu gerektiren _işlem listesi_ ve _kök durumdur_. Tam veya arşivsel bir düğüm, tüm işlemleri ve durum geçişlerini depolayarak, istemcilerin herhangi bir zamanda zincirin durumunu sorgulamasına olanak tanır. Bu, büyük depolama alanı gerektirdiğinden zincir verilerini durum verilerinden ayırabiliriz:

- Zincir verisi (blokların, işlemlerin listesi)
- Durum verileri (her işlemin durum geçişinin sonucu)

Durum kökü ikinci kategoridedir ve _örtülü_ verilerdir (zincirde depolanmaz), zincir verileri ise açık ve zincirin kendisinde depolanır ([kaynak](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

Bu eğitimde, Dune Analytics aracılığıyla SQL ile _sorgulanabilecek_ zincir üstü verilere odaklanacağız.

Yukarıda belirtildiği gibi, her blok bir işlem listesi içerir, bunu belirli bir blok için filtreleyerek sorgulayabiliriz. En güncel olan 12396854 bloğunu deneyeceğiz:

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

Dune üzerindeki SQL çıktısı:

![](./list_of_txn.png)

Zincire eklenen bu tek blok, Ethereum sanal makinesinin durumunu değiştirir ([EVM](/developers/docs/evm/)). Bazen düzinelerce ve hatta yüzlerce işlem aynı anda doğrulanır. Bu özel durumda, 222 işlem dahil edilmiştir.

Kaç tanesinin gerçekten başarılı olduğunu görmek amacıyla başarılı işlemleri saymak için başka bir filtre ekleriz:

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

12396854 bloğu için toplam 222 işlemden 204'ü başarıyla doğrulandı:

![](./successful_txn.png)

İşlem istekleri saniyede onlarca kez gerçekleşir, ancak bloklar yaklaşık olarak her 15 saniyede bir işlenir ([kaynak](/developers/docs/blocks/)).

Yaklaşık olarak her 15 saniyede bir blok üretildiğini görmek için bir gündeki saniye sayısını (86400) 15'e bölerek tahmini günlük ortalama blok sayısını (yaklaşık 5760) elde edebiliriz.

Günde üretilen Ethereum blokları tablosu (2016 - günümüz):

![](./daily_blocks.png)

Bu süre zarfında günlük olarak üretilen ortalama blok sayısı yaklaşık olarak 5.874'tür:

![](./avg_daily_blocks.png)

Sorgular:

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

2016'dan bu yana günlük üretilen ortalama blok sayısı, 5.874 olarak bu sayının biraz üzerindedir. Alternatif olarak, 86.400 saniyenin 5874 ortalama bloğa bölünmesi 14,7 saniyeye veya her 15 saniyede bir yaklaşık bir bloğa denk gelir.

### Gaz {#gas}

Bloklar boyut olarak sınırlıdır. Maksimum blok boyutu dinamiktir ve ağ talebine göre 12.500.000 ila 25.000.000 birim arasında değişir. Limitler, keyfi olarak çok büyük blok boyutlarınının disk alanı ve hız gereksinimleri ([kaynak](/developers/docs/blocks/)) açısından tam düğümlere baskı uygulamasını engellemek için gereklidir.

Blok gaz sınırını kavramsallaştırmanın bir yolu, bunu toplu işlemlerin gerçekleştirileceği kullanılabilir blok alanının **arz** olarak düşünmektir. Blok gaz limiti 2016'dan günümüze sorgulanabilir ve görselleştirilebilir:

![](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Ardından, Ethereum zincirinde yapılan hesaplama için günlük olarak kullanılan gerçek gaz vardır (yani: işlem gönderme, akıllı sözleşme çağırma, NFT basma). Bu, kullanılabilir Ethereum blok alanı için **taleptir**:

![](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

Ayrıca, **talep ve arzın** nasıl sıralandığını görmek için bu iki grafiği yan yana koyabiliriz:

![gas_demand_supply](./gas_demand_supply.png)

Böylece, mevcut arz göz önüne alındığında, gaz fiyatlarını Ethereum blok alanı talebinin bir fonksiyonu olarak anlayabiliriz.

Son olarak, Ethereum zinciri için ortalama günlük gaz fiyatlarını sorgulamak isteyebiliriz, ancak bunu yapmak özellikle uzun bir sorgulama süresine neden olur. Bu nedenle sorgumuzu Ethereum Vakfı tarafından işlem başına ödenen ortalama gaz miktarına göre filtreleyeceğiz.

![](./ef_daily_gas.png)

Yıllar içinde tüm işlemler için Ethereum Foundation adresine ödenmiş gaz ücretlerini görebiliriz. Sorgu burada:

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

Bu öğretici ile, temel Ethereum kavramlarını ve zincir üzerindeki verileri sorgulayarak ve bunlarla uğraşarak Ethereum blok zincirinin nasıl çalıştığını anlıyoruz.

Bu öğreticide kullanılan tüm kodları tutan gösterge paneli [burada](https://duneanalytics.com/paulapivat/Learn-Ethereum) bulunabilir.

Verinin web3 keşfi amaçlı daha fazla kullanımı için [bana Twitter'dan ulaşın](https://twitter.com/paulapivat).
