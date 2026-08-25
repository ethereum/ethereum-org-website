---
title: "SQL로 이더리움 기초 주제 배우기"
description: "이 튜토리얼은 구조화된 질의어(SQL)로 온체인 데이터를 쿼리하여 트랜잭션, 블록, 가스를 포함한 이더리움의 기본 개념을 이해하도록 돕습니다."
author: "폴 아피밧"
tags: ["SQL", "쿼리", "트랜잭션", "데이터 및 분석"]
skill: beginner
breadcrumb: "SQL을 활용한 이더리움"
lang: ko
published: 2021-05-11
source: paulapivat.com
sourceUrl: https://paulapivat.com/post/query_ethereum/
---

많은 이더리움 튜토리얼이 개발자를 대상으로 하지만, 데이터 분석가나 클라이언트 또는 노드를 실행하지 않고 온체인 데이터를 보고자 하는 사람들을 위한 교육 자료는 부족합니다.

이 튜토리얼은 [Dune Analytics](https://dune.com/)에서 제공하는 인터페이스를 통해 구조화된 질의어(SQL)로 온체인 데이터를 쿼리하여 트랜잭션, 블록, 가스를 포함한 이더리움의 기본 개념을 이해하도록 돕습니다.

온체인 데이터는 이더리움, 네트워크, 그리고 컴퓨팅 파워를 위한 경제로서의 이더리움을 이해하는 데 도움을 주며, 오늘날 이더리움이 직면한 과제(예: 가스 가격 상승)와 더 중요하게는 확장성 솔루션에 대한 논의를 이해하는 기반이 되어야 합니다.

### 트랜잭션 {#transactions}

이더리움에서 사용자의 여정은 사용자가 제어하는 계정이나 ETH 잔액이 있는 엔티티를 초기화하는 것으로 시작됩니다. 계정에는 사용자가 제어하는 계정과 스마트 컨트랙트라는 두 가지 유형이 있습니다([ethereum.org](/developers/docs/accounts/) 참조).

모든 계정은 [Etherscan](https://etherscan.io/)이나 [Blockscout](https://eth.blockscout.com/)과 같은 블록 탐색기에서 볼 수 있습니다. 블록 탐색기는 이더리움 데이터로 향하는 포털입니다. 블록 탐색기는 블록, 트랜잭션, 채굴자, 계정 및 기타 온체인 활동에 대한 데이터를 실시간으로 표시합니다([여기](/developers/docs/data-and-analytics/block-explorers/) 참조).

하지만 사용자는 외부 블록 탐색기에서 제공하는 정보를 대조하기 위해 데이터를 직접 쿼리하고 싶을 수 있습니다. [Dune Analytics](https://dune.com/)는 SQL에 대한 약간의 지식이 있는 사람이라면 누구나 이 기능을 사용할 수 있도록 제공합니다.

참고로 이더리움 재단(EF)의 스마트 컨트랙트 계정은 [Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)에서 확인할 수 있습니다.

한 가지 유의할 점은 EF의 계정을 포함한 모든 계정에는 트랜잭션을 보내고 받는 데 사용할 수 있는 공개 주소가 있다는 것입니다.

Etherscan의 계정 잔액은 일반 트랜잭션과 내부 트랜잭션으로 구성됩니다. 내부 트랜잭션은 이름과 달리 체인의 상태를 변경하는 _실제_ 트랜잭션이 아닙니다. 이는 컨트랙트를 실행하여 시작되는 가치 전송입니다([출처](https://ethereum.stackexchange.com/questions/3417/how-to-get-contract-internal-transactions)). 내부 트랜잭션에는 서명이 없으므로 블록체인에 포함되지 **않으며** Dune Analytics로 쿼리할 수 없습니다.

따라서 이 튜토리얼에서는 일반 트랜잭션에 중점을 둘 것입니다. 이는 다음과 같이 쿼리할 수 있습니다.

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

이렇게 하면 Etherscan의 트랜잭션 페이지에서 제공되는 것과 동일한 정보가 산출됩니다. 비교를 위해 두 출처를 아래에 제시합니다.

#### Etherscan {#etherscan}

![Screenshot of Etherscan transaction explorer view](./etherscan_view.png)

[Blockscout의 EF 컨트랙트 페이지.](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe)

#### Dune Analytics {#dune-analytics}

![Screenshot of a Dune Analytics query dashboard](./dune_view.png)

대시보드는 [여기](https://dune.com/paulapivat/Learn-Ethereum)에서 찾을 수 있습니다. 테이블을 클릭하여 쿼리를 확인하세요(위 내용도 참조).

### 트랜잭션 분석하기 {#breaking-down-transactions}

제출된 트랜잭션에는 다음을 포함한 여러 정보가 포함됩니다([출처](/developers/docs/transactions/)).

- **수신자(Recipient)**: 수신 주소("to"로 쿼리됨)
- **서명(Signature)**: 발신자의 개인 키가 트랜잭션에 서명하지만, SQL로 쿼리할 수 있는 것은 발신자의 공개 주소("from")입니다.
- **값(Value)**: 전송된 ETH의 양입니다(`ether` 열 참조).
- **데이터(Data)**: 해시 처리된 임의의 데이터입니다(`data` 열 참조).
- **가스 한도(gasLimit)** – 트랜잭션에서 소비할 수 있는 가스 단위의 최대량입니다. 가스 단위는 계산 단계를 나타냅니다.
- **maxPriorityFeePerGas** - 채굴자에게 팁으로 포함될 가스의 최대량입니다.
- **maxFeePerGas** - 트랜잭션에 대해 지불할 의향이 있는 가스의 최대량입니다(baseFeePerGas 및 maxPriorityFeePerGas 포함).

이더리움 재단 공개 주소로 향하는 트랜잭션에 대해 이러한 특정 정보를 쿼리할 수 있습니다.

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

### 블록 {#blocks}

각 트랜잭션은 이더리움 가상 머신([EVM](/developers/docs/evm/))의 상태를 변경합니다([출처](/developers/docs/transactions/)). 트랜잭션은 검증되어 블록에 포함되도록 네트워크에 브로드캐스트됩니다. 각 트랜잭션은 블록 번호와 연결됩니다. 데이터를 보기 위해 특정 블록 번호인 12396854(이 글을 작성하는 2021년 5월 11일 기준 이더리움 재단 트랜잭션 중 가장 최근 블록)를 쿼리할 수 있습니다.

또한 다음 두 블록을 쿼리하면 각 블록에 이전 블록의 해시(즉, 부모 해시)가 포함되어 있어 블록체인이 어떻게 형성되는지 알 수 있습니다.

각 블록에는 부모 블록에 대한 참조가 포함되어 있습니다. 이는 아래의 `hash` 열과 `parent_hash` 열 사이에 표시됩니다([출처](/developers/docs/blocks/)).

![parent_hash](./parent_hash.png)

다음은 Dune Analytics의 [쿼리](https://dune.com/queries/44856/88292)입니다.

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

시간, 블록 번호, 난이도, 해시, 부모 해시, 논스를 쿼리하여 블록을 검사할 수 있습니다.

이 쿼리에서 다루지 않는 유일한 것은 아래에 별도의 쿼리가 필요한 <em>트랜잭션 목록</em>과 <em>상태 루트</em>입니다. 풀 노드 또는 아카이브 노드는 모든 트랜잭션과 상태 전환을 저장하여 클라이언트가 언제든지 체인의 상태를 쿼리할 수 있도록 합니다. 이를 위해서는 큰 저장 공간이 필요하므로 체인 데이터와 상태 데이터를 분리할 수 있습니다.

- 체인 데이터(블록, 트랜잭션 목록)
- 상태 데이터(각 트랜잭션의 상태 전환 결과)

상태 루트는 후자에 속하며 _암시적_ 데이터(온체인에 저장되지 않음)인 반면, 체인 데이터는 명시적이며 체인 자체에 저장됩니다([출처](https://ethereum.stackexchange.com/questions/359/where-is-the-state-data-stored)).

이 튜토리얼에서는 Dune Analytics를 통해 SQL로 쿼리할 수 _있는_ 온체인 데이터에 중점을 둘 것입니다.

위에서 언급했듯이 각 블록에는 트랜잭션 목록이 포함되어 있으며, 특정 블록을 필터링하여 이를 쿼리할 수 있습니다. 가장 최근 블록인 12396854를 시도해 보겠습니다.

```sql
SELECT * FROM ethereum."transactions"
WHERE block_number = 12396854
ORDER BY block_time DESC`
```

다음은 Dune의 SQL 출력입니다.

![Screenshot of a list of Ethereum transactions](./list_of_txn.png)

체인에 추가되는 이 단일 블록은 이더리움 가상 머신([EVM](/developers/docs/evm/))의 상태를 변경합니다. 수십 개, 때로는 수백 개의 트랜잭션이 한 번에 검증됩니다. 이 특정 사례에서는 222개의 트랜잭션이 포함되었습니다.

실제로 성공한 트랜잭션 수를 확인하려면 성공한 트랜잭션을 계산하는 또 다른 필터를 추가해야 합니다.

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

블록 12396854의 경우 총 222개의 트랜잭션 중 204개가 성공적으로 검증되었습니다.

![Screenshot of a successful Ethereum transaction](./successful_txn.png)

트랜잭션 요청은 초당 수십 번 발생하지만 블록은 약 15초마다 한 번씩 커밋됩니다([출처](/developers/docs/blocks/)).

약 15초마다 하나의 블록이 생성된다는 것을 확인하기 위해 하루의 초 수(86400)를 15로 나누어 하루 평균 예상 블록 수(약 5760개)를 구할 수 있습니다.

하루에 생성되는 이더리움 블록(2016년 - 현재)에 대한 차트는 다음과 같습니다.

![Chart showing daily Ethereum block production](./daily_blocks.png)

이 기간 동안 매일 생성된 평균 블록 수는 약 5,874개입니다.

![Chart showing daily Ethereum block production](./avg_daily_blocks.png)

쿼리는 다음과 같습니다.

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

2016년 이후 하루 평균 생성된 블록 수는 5,874개로 그 수치보다 약간 높습니다. 또는 86400초를 평균 블록 수인 5874로 나누면 14.7초, 즉 약 15초마다 하나의 블록이 생성되는 것으로 나옵니다.

### 가스 {#gas}

블록은 크기가 제한되어 있습니다. 최대 블록 크기는 동적이며 네트워크 수요에 따라 12,500,000에서 25,000,000 단위 사이에서 달라집니다. 임의로 큰 블록 크기가 디스크 공간 및 속도 요구 사항 측면에서 풀 노드에 부담을 주는 것을 방지하기 위해 한도가 필요합니다([출처](/developers/docs/blocks/)).

블록 가스 한도를 개념화하는 한 가지 방법은 이를 트랜잭션을 일괄 처리할 수 있는 사용 가능한 블록 공간의 <strong>공급</strong>으로 생각하는 것입니다. 블록 가스 한도는 2016년부터 현재까지 쿼리하고 시각화할 수 있습니다.

![Chart showing average Ethereum gas limit over time](./avg_gas_limit.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_limit) AS avg_block_gas_limit
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

그리고 이더리움 체인에서 수행되는 컴퓨팅(예: 트랜잭션 전송, 스마트 컨트랙트 호출, NFT 발행)에 대한 비용을 지불하기 위해 매일 사용되는 실제 가스가 있습니다. 이것이 사용 가능한 이더리움 블록 공간에 대한 <strong>수요</strong>입니다.

![Chart showing daily Ethereum gas used](./daily_gas_used.png)

```sql
SELECT
    DATE_TRUNC('day', time) AS dt,
    AVG(gas_used) AS avg_block_gas_used
FROM ethereum."blocks"
GROUP BY dt
OFFSET 1
```

또한 이 두 차트를 나란히 배치하여 <strong>수요와 공급</strong>이 어떻게 일치하는지 확인할 수 있습니다.

![gas_demand_supply](./gas_demand_supply.png)

따라서 가스 가격은 가용 공급이 주어졌을 때 이더리움 블록 공간에 대한 수요의 함수로 이해할 수 있습니다.

마지막으로 이더리움 체인의 일일 평균 가스 가격을 쿼리하고 싶을 수 있지만, 그렇게 하면 쿼리 시간이 특히 길어지므로 이더리움 재단이 트랜잭션당 지불한 평균 가스 양으로 쿼리를 필터링하겠습니다.

![Chart showing Ethereum Foundation daily gas usage](./ef_daily_gas.png)

수년 동안 이더리움 재단 주소로 이루어진 모든 트랜잭션에 대해 지불된 가스 가격을 확인할 수 있습니다. 쿼리는 다음과 같습니다.

```sql
SELECT
    block_time,
    gas_price / 1e9 AS gas_price_gwei,
    value / 1e18 AS eth_sent
FROM ethereum."transactions"
WHERE "to" = '\xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
ORDER BY block_time DESC
```

### 요약 {#summary}

이 튜토리얼을 통해 온체인 데이터를 쿼리하고 감을 잡음으로써 이더리움의 기본 개념과 이더리움 블록체인이 어떻게 작동하는지 이해할 수 있습니다.

이 튜토리얼에서 사용된 모든 코드가 포함된 대시보드는 [여기](https://dune.com/paulapivat/Learn-Ethereum)에서 찾을 수 있습니다.

Web3를 탐색하기 위해 데이터를 더 활용하는 방법에 대해서는 [트위터에서 저를 찾아주세요](https://twitter.com/paulapivat).