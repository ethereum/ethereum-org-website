---
title: 머클 패트리샤 트라이
description: 머클 패트리샤 트라이 소개.
lang: ko
sidebarDepth: 2
---

이더리움의 상태 (전체 계정, 잔액, 스마트 컨트랙트의 총합)는 일반적으로 컴퓨터 과학에서 머클 트리라고 알려진 데이터 구조의 특수한 버전에 인코딩됩니다. 이 구조는 트리에 얽혀있는 모든 개별 데이터 조각들 사이에 검증 가능한 관계를 생성하므로 암호학의 많은 응용 프로그램에 유용하며, 데이터에 대한 것들을 증명하는 데 사용할 수 있는 단일 **루트** 값을 생성합니다.

이더리움의 데이터 구조는 '수정된 머클-패트리샤 트라이'입니다. 이는 PATRICIA(영숫자로 코딩된 정보 검색을 위한 실용적인 알고리즘)의 일부 기능을 차용했고, 이더리움 상태를 구성하는 항목들의 효율적인 데이터 re**trie**val(검색)을 위해 설계되었기 때문에 붙여진 이름입니다.

머클-패트리샤 트라이는 결정론적이며 암호학적으로 검증 가능합니다. 상태 루트를 생성하는 유일한 방법은 상태의 각 개별 조각으로부터 계산하는 것이며, 동일한 두 상태는 루트 해시와 그에 이르는 해시(_머클 증명_)를 비교하여 쉽게 증명할 수 있습니다. 반대로, 서로 다른 상태가 같은 루트 해시를 가지는 일은 없으며, 상태 값이 조금이라도 바뀌면 루트 해시도 반드시 달라집니다. 이론적으로, 이 구조는 삽입, 조회 및 삭제에 대해 `O(log(n))` 효율성이라는 '성배'를 제공합니다.

가까운 미래에 이더리움은 [버클 트리](/roadmap/verkle-trees) 구조로 마이그레이션할 계획이며, 이는 향후 프로토콜 개선을 위한 많은 새로운 가능성을 열 것입니다.

## 필수 구성 요소 {#prerequisites}

이 페이지를 더 잘 이해하려면 [해시](https://en.wikipedia.org/wiki/Hash_function), [머클 트리](https://en.wikipedia.org/wiki/Merkle_tree), [트라이](https://en.wikipedia.org/wiki/Trie), [직렬화](https://en.wikipedia.org/wiki/Serialization)에 대한 기본 지식이 있으면 도움이 됩니다. 이 문서는 기본 [래딕스 트리](https://en.wikipedia.org/wiki/Radix_tree)에 대한 설명으로 시작하여 이더리움의 더 최적화된 데이터 구조에 필요한 수정 사항을 점진적으로 소개합니다.

## 기본 래딕스 트라이 {#basic-radix-tries}

기본적인 radix trie에서 모든 노드는 다음과 같은 형태를 가집니다:

```
    [i_0, i_1 ... i_n, value]
```

여기서 `i_0 ...` `i_n`은 알파벳의 기호(주로 이진 또는 16진수)를 나타내고, `value`는 노드의 터미널 값이며, `i_0, i_1 ...`에 있는 값은 `i_n` 슬롯은 `NULL`이거나 다른 노드에 대한 포인터(이 경우 해시)입니다. 이것은 기본적인 `(키, 값)` 저장소를 형성합니다.

키-값 쌍 집합에 대한 순서를 유지하기 위해 래딕스 트리 데이터 구조를 사용한다고 가정해 보겠습니다. 트라이에서 `dog` 키에 현재 매핑된 값을 찾으려면 먼저 `dog`를 알파벳 문자로 변환(`64 6f 67`이 됨)한 다음 해당 경로를 따라 트라이를 내려가 값을 찾습니다. 즉, 플랫 키/값 DB에서 루트 해시를 조회하여 트라이의 루트 노드를 찾는 것으로 시작합니다. 이는 다른 노드를 가리키는 키의 배열로 표시됩니다. 인덱스 `6`의 값을 키로 사용하여 플랫 키/값 DB에서 조회하여 한 수준 아래의 노드를 가져옵니다. 그런 다음 인덱스 `4`를 선택하여 다음 값을 조회하고, 다음으로 인덱스 `6`을 선택하는 식으로 `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7` 경로를 따를 때까지 계속한 다음 노드의 값을 조회하고 결과를 반환합니다.

'트라이'에서 무언가를 조회하는 것과 기본 플랫 키/값 'DB'에서 조회하는 것 사이에는 차이가 있습니다. 둘 다 키/값 배열을 정의하지만, 기본 DB는 키를 한 단계로 조회하는 전통적인 방식을 사용할 수 있습니다. 트라이에서 키를 조회하려면 위에서 설명한 최종 값에 도달하기 위해 여러 번의 기본 DB 조회가 필요합니다. 모호함을 없애기 위해 후자를 `path`라고 부르겠습니다.

래딕스 트라이의 업데이트 및 삭제 작업은 다음과 같이 정의할 수 있습니다.

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

'머클' 래딕스 트리는 결정론적으로 생성된 암호화 해시 다이제스트를 사용하여 노드를 연결하여 구축됩니다. 이 콘텐츠 주소 지정(키/값 DB에서 `key == keccak256(rlp(value))`)은 저장된 데이터의 암호화 무결성을 보장합니다. 주어진 트라이의 루트 해시가 공개적으로 알려진 경우, 기본 리프 데이터에 접근할 수 있는 사람은 누구나 특정 값을 트리 루트에 연결하는 각 노드의 해시를 제공하여 트라이가 특정 경로에 주어진 값을 포함한다는 증명을 구성할 수 있습니다.

루트 해시는 궁극적으로 그 아래의 모든 해시를 기반으로 하므로 공격자가 존재하지 않는 `(path, value)` 쌍에 대한 증명을 제공하는 것은 불가능합니다. 기본적인 수정 사항이 있다면 루트 해시가 변경됩니다. 해시는 해싱 함수의 프리이미지 저항성에 의해 보호되는 데이터의 구조적 정보에 대한 압축된 표현이라고 생각할 수 있습니다.

래딕스 트리의 원자 단위(예: 단일 16진수 문자 또는 4비트 이진수)를 '니블(nibble)'이라고 부릅니다. 위에서 설명한 대로 한 번에 한 니블씩 경로를 순회하는 동안 노드는 최대 16개의 자식을 참조할 수 있지만 `value` 요소를 포함합니다. 따라서 이를 길이 17의 배열로 표현합니다. 이 17개 요소 배열을 '브랜치 노드'라고 부릅니다.

## 머클 패트리샤 트라이 {#merkle-patricia-trees}

래딕스 트라이에는 한 가지 주요한 한계가 있습니다. 바로 비효율적이라는 점입니다. 이더리움에서처럼 경로가 64자 길이(`bytes32`의 니블 수)인 `(path, value)` 바인딩 하나를 저장하려면 문자당 한 레벨을 저장하기 위해 1킬로바이트 이상의 추가 공간이 필요하며, 각 조회 또는 삭제에는 전체 64단계가 소요됩니다. 다음에 소개되는 패트리샤 트라이는 이 문제를 해결합니다.

### 최적화 {#optimization}

머클 패트리샤 트라이의 노드는 다음 중 하나입니다.

1. `NULL` (빈 문자열로 표시)
2. `branch` 17개 항목 노드 `[ v0 ...` v15, vt ]\`
3. `leaf` 2개 항목 노드 `[ encodedPath, value ]`
4. `extension` 2개 항목 노드 `[ encodedPath, key ]`

64자 경로를 사용하면 트라이의 처음 몇 개 레이어를 순회한 후, 적어도 일부 경로에서는 분기 경로가 존재하지 않는 노드에 도달하는 것이 불가피합니다. 경로를 따라 최대 15개의 희소한 `NULL` 노드를 생성하지 않도록 `[ encodedPath, key ]` 형식의 `extension` 노드를 설정하여 내려가는 과정을 단축합니다. 여기서 `encodedPath`는 건너뛸 '부분 경로'(아래 설명된 간결한 인코딩 사용)를 포함하고, `key`는 다음 DB 조회를 위한 것입니다.

`encodedPath`의 첫 번째 니블에 있는 플래그로 표시될 수 있는 `leaf` 노드의 경우, 경로는 모든 이전 노드의 경로 조각을 인코딩하며 `value`를 직접 조회할 수 있습니다.

그러나 위의 최적화는 모호성을 야기합니다.

경로를 니블 단위로 순회할 때 순회할 니블의 수가 홀수가 될 수 있지만, 모든 데이터는 `bytes` 형식으로 저장됩니다. 예를 들어, 니블 `1`과 니블 `01`을 구별할 수 없습니다(둘 다 `<01>`로 저장되어야 함). 홀수 길이를 지정하기 위해 부분 경로에는 플래그가 접두사로 붙습니다.

### 사양: 선택적 종결자가 있는 16진수 시퀀스의 간결한 인코딩 {#specification}

위에서 설명한 _홀수 대 짝수 남은 부분 경로 길이_와 _리프 대 확장 노드_의 플래그 지정은 모두 2개 항목 노드의 부분 경로의 첫 번째 니블에 있습니다. 결과는 다음과 같습니다.

| 16진수 문자 | 비트   | 노드 유형                      | 경로 길이 |
| ------- | ---- | -------------------------- | ----- |
| 0       | 0000 | 확장                         | 짝수    |
| 1       | 0001 | 확장                         | 홀수    |
| 2       | 0010 | 종결 (리프) | 짝수    |
| 3       | 0011 | 종결 (리프) | 홀수    |

남은 경로 길이가 짝수(`0` 또는 `2`)인 경우, 항상 다른 `0` '패딩' 니블이 뒤따릅니다.

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray now has an even length whose first nibble is the flags.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

예시:

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

다음은 머클 패트리샤 트라이에서 노드를 가져오는 확장 코드입니다.

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### 트라이 예시 {#example-trie}

네 개의 경로/값 쌍 `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`을 포함하는 트라이를 원한다고 가정해 보겠습니다.

먼저, 경로와 값을 모두 `bytes`로 변환합니다. 아래에서 _경로_의 실제 바이트 표현은 `<>`로 표시되지만, _값_은 이해를 돕기 위해 여전히 문자열로 표시되며 `''`로 표시됩니다(실제로는 이들도 `bytes`가 됩니다).

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

이제 기본 DB에서 다음 키/값 쌍으로 이러한 트라이를 구축합니다.

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

한 노드가 다른 노드 내에서 참조될 때 포함되는 것은 `len(rlp.encode(node)) >= 32`인 경우 `keccak256(rlp.encode(node))`이고, 그렇지 않으면 `node`입니다. 여기서 `rlp.encode`는 [RLP](/developers/docs/data-structures-and-encoding/rlp) 인코딩 함수입니다.

트라이를 업데이트할 때, 새로 생성된 노드의 길이가 32보다 크거나 같은 경우 영구 조회 테이블에 키/값 쌍 `(keccak256(x), x)`를 저장해야 합니다. 그러나 노드가 그보다 짧으면 f(x) = x 함수는 가역적이므로 아무것도 저장할 필요가 없습니다.

## 이더리움의 트라이 {#tries-in-ethereum}

이더리움 실행 레이어의 모든 머클 트라이는 머클 패트리샤 트라이를 사용합니다.

블록 헤더에는 이 트라이들 중 3개의 루트가 있습니다.

1. stateRoot
2. transactionsRoot
3. receiptsRoot

### 상태 트라이 {#state-trie}

하나의 전역 상태 트라이가 있으며, 클라이언트가 블록을 처리할 때마다 업데이트됩니다. 여기서 `path`는 항상 `keccak256(ethereumAddress)`이고 `value`는 항상 `rlp(ethereumAccount)`입니다. 더 구체적으로, 이더리움 `account`는 `[nonce,balance,storageRoot,codeHash]`의 4개 항목 배열입니다. 이 시점에서 이 `storageRoot`는 다른 패트리샤 트라이의 루트라는 점을 주목할 가치가 있습니다.

### 스토리지 트라이 {#storage-trie}

스토리지 트라이는 _모든_ 컨트랙트 데이터가 있는 곳입니다. 각 계정마다 별도의 스토리지 트라이가 있습니다. 주어진 주소의 특정 스토리지 위치에서 값을 검색하려면 스토리지 주소, 스토리지에 저장된 데이터의 정수 위치 및 블록 ID가 필요합니다. 그런 다음 이를 JSON-RPC API에 정의된 `eth_getStorageAt`에 인수로 전달할 수 있습니다. 예를 들어, 주소 `0x295a70b2de5e3953354a6a8344e616ed314d7251`의 스토리지 슬롯 0에 있는 데이터를 검색하려면 다음과 같이 합니다.

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

스토리지의 다른 요소를 검색하는 것은 스토리지 트라이에서의 위치를 먼저 계산해야 하므로 약간 더 복잡합니다. 위치는 주소와 스토리지 위치의 `keccak256` 해시로 계산되며, 둘 다 32바이트 길이가 되도록 왼쪽에 0으로 채워집니다. 예를 들어, 주소 `0x391694e7e0b0cce554cb130d723a9d27458f9298`의 스토리지 슬롯 1에 있는 데이터의 위치는 다음과 같습니다.

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Geth 콘솔에서는 다음과 같이 계산할 수 있습니다.

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

`path`는 따라서 `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`입니다. 이제 이것을 사용하여 이전과 같이 스토리지 트라이에서 데이터를 검색할 수 있습니다.

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

참고: 이더리움 계정의 `storageRoot`는 컨트랙트 계정이 아닌 경우 기본적으로 비어 있습니다.

### 트랜잭션 트라이 {#transaction-trie}

모든 블록에는 별도의 트랜잭션 트라이가 있으며, 여기에도 `(키, 값)` 쌍이 저장됩니다. 여기서 경로는 `rlp(transactionIndex)`이며, 이는 다음에 의해 결정되는 값에 해당하는 키를 나타냅니다.

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

이에 대한 자세한 내용은 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 문서에서 찾을 수 있습니다.

### 영수증 트라이 {#receipts-trie}

모든 블록에는 자체 영수증 트라이가 있습니다. 여기서 `path`는 `rlp(transactionIndex)`입니다. `transactionIndex`는 포함된 블록 내에서의 인덱스입니다. 영수증 트라이는 절대 업데이트되지 않습니다. 트랜잭션 트라이와 유사하게 현재 및 레거시 영수증이 있습니다. 영수증 트라이에서 특정 영수증을 쿼리하려면 해당 블록 내 트랜잭션의 인덱스, 영수증 페이로드 및 트랜잭션 유형이 필요합니다. 반환된 영수증은 `TransactionType`과 `ReceiptPayload`의 연결로 정의되는 `Receipt` 유형이거나 `rlp([status, cumulativeGasUsed, logsBloom, logs])`로 정의되는 `LegacyReceipt` 유형일 수 있습니다.

이에 대한 자세한 내용은 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 문서에서 찾을 수 있습니다.

## 추가 정보 {#further-reading}

- [수정된 머클 패트리샤 트라이 — 이더리움이 상태를 저장하는 방법](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [이더리움의 머클링](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [이더리움 트라이 이해하기](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
