---
title: Dagger-Hashimoto
description: Dagger-Hashimoto 알고리즘에 대한 상세 설명.
lang: ko
---

Dagger-Hashimoto는 이더리움의 채굴 알고리즘에 대한 최초의 연구 구현이자 사양이었습니다. Dagger-Hashimoto는 [Ethash](#ethash)로 대체되었습니다. 2022년 9월 15일 [병합](/roadmap/merge/)으로 채굴이 완전히 중단되었습니다. 그 이후로 이더리움은 대신 [지분 증명](/developers/docs/consensus-mechanisms/pos) 메커니즘을 사용하여 보호되고 있습니다. 이 페이지는 역사적 관심사를 위한 것으로, 여기에 있는 정보는 병합 이후 이더리움과 더 이상 관련이 없습니다.

## 필수 구성 요소 {#prerequisites}

이 페이지를 더 잘 이해하기 위해, 먼저 [작업 증명 합의](/developers/docs/consensus-mechanisms/pow), [채굴](/developers/docs/consensus-mechanisms/pow/mining), [채굴 알고리즘](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms)에 대해 읽어보시는 것을 권장합니다.

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto는 두 가지 목표를 만족시키는 것을 목표로 합니다.

1. **ASIC 저항성**: 알고리즘을 위한 특수 하드웨어를 제작함으로써 얻는 이점은 가능한 한 작아야 합니다.
2. **라이트 클라이언트 검증 가능성**: 블록은 라이트 클라이언트에 의해 효율적으로 검증될 수 있어야 합니다.

추가적인 수정을 통해, 원할 경우 세 번째 목표를 달성하는 방법도 명시하지만, 추가적인 복잡성을 대가로 합니다:

**전체 체인 저장**: 채굴은 전체 블록체인 상태의 저장을 요구해야 합니다(이더리움 상태 트라이의 불규칙한 구조로 인해, 특히 자주 사용되는 일부 계약에 대한 일부 가지치기가 가능할 것으로 예상하지만, 이를 최소화하고자 합니다).

## DAG 생성 {#dag-generation}

알고리즘 코드는 아래 Python으로 정의됩니다. 먼저, 지정된 정밀도의 부호 없는 정수를 문자열로 마샬링하기 위한 `encode_int`를 제공합니다. 그것의 역함수도 다음과 같습니다:

```python
NUM_BITS = 512

def encode_int(x):
    "빅 엔디안 방식을 사용하여 정수 x를 64자 문자열로 인코딩합니다"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "빅 엔디안 방식을 사용하여 문자열에서 정수 x를 디코딩합니다"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

다음으로, `sha3`는 정수를 입력받아 정수를 출력하는 함수이고, `dbl_sha3`는 double-sha3 함수라고 가정합니다. 이 참조 코드를 구현으로 변환하는 경우 다음을 사용하십시오.

```python
from pyethereum import utils
def sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(x))

def dbl_sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(utils.sha3(x)))
```

### 파라미터 {#parameters}

알고리즘에 사용되는 파라미터는 다음과 같습니다.

```python
SAFE_PRIME_512 = 2**512 - 38117     # 2**512보다 작은 가장 큰 안전 소수

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # 데이터세트 크기 (4기가바이트); 65536의 배수여야 함
      "n_inc": 65536,                   # 기간당 n 값의 증가량; 65536의 배수여야 함
                                        # epochtime=20000이면 연간 882MB 성장
      "cache_size": 2500,               # 라이트 클라이언트의 캐시 크기 (라이트 클라이언트가 선택할 수 있음; 알고리즘 사양의 일부가 아님)
      "diff": 2**14,                    # 난이도 (블록 평가 중 조정됨)
      "epochtime": 100000,              # 에폭의 길이(블록 단위) (데이터세트가 업데이트되는 빈도)
      "k": 1,                           # 노드의 부모 수
      "w": w,                          # 모듈러 지수화 해싱에 사용됨
      "accesses": 200,                  # hashimoto 동안 데이터세트 접근 횟수
      "P": SAFE_PRIME_512               # 해싱 및 난수 생성을 위한 안전 소수
}
```

이 경우 `P`는 `log₂(P)`가 512보다 약간 작게 선택된 소수이며, 이는 우리가 숫자를 나타내는 데 사용해 온 512비트에 해당합니다. 실제로 DAG의 후반부만 저장하면 되므로 사실상의 RAM 요구 사항은 1GB에서 시작하여 매년 441MB씩 증가합니다.

### Dagger 그래프 구축 {#dagger-graph-building}

Dagger 그래프 구축 기본 요소는 다음과 같이 정의됩니다.

```python
def produce_dag(params, seed, length):
    P = params["P"]
    picker = init = pow(sha3(seed), params["w"], P)
    o = [init]
    for i in range(1, length):
        x = picker = (picker * init) % P
        for _ in range(params["k"]):
            x ^= o[x % i]
        o.append(pow(x, params["w"], P))
    return o
```

기본적으로, 그래프는 단일 노드인 `sha3(seed)`로 시작하며, 거기서부터 무작위 이전 노드를 기반으로 순차적으로 다른 노드를 추가하기 시작합니다. 새 노드가 생성될 때, 시드의 모듈러 거듭제곱이 계산되어 `i`보다 작은 일부 인덱스를 무작위로 선택하고(위의 `x % i` 사용), 해당 인덱스의 노드 값은 `x`에 대한 새로운 값을 생성하기 위한 계산에 사용됩니다. 그런 다음 이 값은 작은 작업 증명(PoW) 함수(XOR 기반)에 입력되어 궁극적으로 인덱스 `i`에서 그래프의 값을 생성합니다. 이 특정 설계의 근거는 DAG의 순차적 접근을 강제하는 것입니다. 접근할 다음 DAG의 값은 현재 값이 알려질 때까지 결정될 수 없습니다. 마지막으로, 모듈러 지수화는 결과를 추가로 해시합니다.

이 알고리즘은 수론의 여러 결과에 의존합니다. 자세한 내용은 아래 부록을 참조하십시오.

## 라이트 클라이언트 평가 {#light-client-evaluation}

위의 그래프 구성은 그래프의 각 노드가 적은 수의 노드로 구성된 하위 트리를 계산하고 소량의 보조 메모리만 필요로 하여 재구성될 수 있도록 합니다. k=1일 때 하위 트리는 DAG의 첫 번째 요소까지 올라가는 값의 체인일 뿐이라는 점에 유의하십시오.

DAG에 대한 라이트 클라이언트 계산 함수는 다음과 같이 작동합니다.

```python
def quick_calc(params, seed, p):
    w, P = params["w"], params["P"]
    cache = {}

    def quick_calc_cached(p):
        if p in cache:
            pass
        elif p == 0:
            cache[p] = pow(sha3(seed), w, P)
        else:
            x = pow(sha3(seed), (p + 1) * w, P)
            for _ in range(params["k"]):
                x ^= quick_calc_cached(x % p)
            cache[p] = pow(x, w, P)
        return cache[p]

    return quick_calc_cached(p)
```

기본적으로 이것은 전체 DAG의 값을 계산하는 루프를 제거하고 이전 노드 조회를 재귀 호출 또는 캐시 조회로 대체하는 위 알고리즘의 재작성일 뿐입니다. `k=1`의 경우 캐시는 불필요하지만, 추가 최적화는 실제로 DAG의 처음 몇 천 개 값을 미리 계산하고 이를 계산을 위한 정적 캐시로 유지합니다. 이에 대한 코드 구현은 부록을 참조하십시오.

## DAG의 이중 버퍼 {#double-buffer}

풀 클라이언트에서는 위 공식에 의해 생성된 2개의 DAG로 구성된 [_이중 버퍼_](https://wikipedia.org/wiki/Multiple_buffering)가 사용됩니다. 아이디어는 위 파라미터에 따라 매 `epochtime` 수의 블록마다 DAG가 생성된다는 것입니다. 클라이언트는 가장 최근에 생성된 DAG를 사용하는 대신 이전 DAG를 사용합니다. 이것의 이점은 채굴자들이 갑자기 모든 데이터를 재계산해야 하는 단계를 통합할 필요 없이 시간이 지남에 따라 DAG를 교체할 수 있다는 것입니다. 그렇지 않으면, 일정한 간격으로 체인 처리 속도가 갑자기 일시적으로 느려지고 중앙화가 급격히 증가할 가능성이 있습니다. 따라서 모든 데이터가 재계산되기 전 몇 분 안에 51% 공격 위험이 있습니다.

블록에 대한 작업을 계산하는 데 사용되는 DAG 세트를 생성하는 데 사용되는 알고리즘은 다음과 같습니다.

```python
def get_prevhash(n):
    from pyethereum.blocks import GENESIS_PREVHASH
    from pyethereum import chain_manager
    if n <= 0:
        return hash_to_int(GENESIS_PREVHASH)
    else:
        prevhash = chain_manager.index.get_block_by_number(n - 1)
        return decode_int(prevhash)

def get_seedset(params, block):
    seedset = {}
    seedset["back_number"] = block.number - (block.number % params["epochtime"])
    seedset["back_hash"] = get_prevhash(seedset["back_number"])
    seedset["front_number"] = max(seedset["back_number"] - params["epochtime"], 0)
    seedset["front_hash"] = get_prevhash(seedset["front_number"])
    return seedset

def get_dagsize(params, block):
    return params["n"] + (block.number // params["epochtime"]) * params["n_inc"]

def get_daggerset(params, block):
    dagsz = get_dagsize(params, block)
    seedset = get_seedset(params, block)
    if seedset["front_hash"] <= 0:
        # 백 버퍼를 사용할 수 없으므로 프론트 버퍼만 만듭니다
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

원래 Hashimoto의 아이디어는 블록체인을 데이터세트로 사용하여, 블록체인에서 N개의 인덱스를 선택하고, 해당 인덱스에서 트랜잭션을 수집하고, 이 데이터의 XOR을 수행한 다음 결과의 해시를 반환하는 계산을 수행하는 것입니다. 일관성을 위해 Python으로 번역된 Thaddeus Dryja의 원본 알고리즘은 다음과 같습니다.

```python
def orig_hashimoto(prev_hash, merkle_root, list_of_transactions, nonce):
    hash_output_A = sha256(prev_hash + merkle_root + nonce)
    txid_mix = 0
    for i in range(64):
        shifted_A = hash_output_A >> i
        transaction = shifted_A % len(list_of_transactions)
        txid_mix ^= list_of_transactions[transaction] << i
    return txid_mix ^ (nonce << 192)
```

불행히도 Hashimoto는 RAM 하드로 간주되지만 256비트 산술에 의존하므로 상당한 계산 오버헤드가 발생합니다. 그러나 Dagger-Hashimoto는 이 문제를 해결하기 위해 데이터세트를 인덱싱할 때 최하위 64비트만 사용합니다.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

이중 SHA3를 사용하면 제로 데이터, 거의 즉각적인 사전 검증이 가능하며, 올바른 중간값이 제공되었는지 여부만 확인합니다. 이 외부 작업 증명(PoW) 레이어는 ASIC 친화적이며 상당히 약하지만, 즉시 거부되지 않는 블록을 생성하기 위해 소량의 작업을 수행해야 하므로 DDoS 공격을 더욱 어렵게 만듭니다. 다음은 라이트 클라이언트 버전입니다.

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## 채굴 및 검증 {#mining-and-verifying}

이제 이 모든 것을 채굴 알고리즘으로 종합해 보겠습니다.

```python
def mine(daggerset, params, block):
    from random import randint
    nonce = randint(0, 2**64)
    while 1:
        result = hashimoto(daggerset, get_dagsize(params, block),
                           params, decode_int(block.prevhash), nonce)
        if result * params["diff"] < 2**256:
            break
        nonce += 1
        if nonce >= 2**64:
            nonce = 0
    return nonce
```

다음은 검증 알고리즘입니다.

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

라이트 클라이언트 친화적인 검증:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

또한 Dagger-Hashimoto는 블록 헤더에 추가 요구 사항을 부과합니다.

- 2계층 검증이 작동하려면 블록 헤더에 Nonce와 pre-sha3 중간값이 모두 있어야 합니다.
- 블록 헤더 어딘가에 현재 시드셋의 sha3을 저장해야 합니다.

## 더 읽어보기 {#further-reading}

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_

## 부록 {#appendix}

위에서 언급했듯이 DAG 생성에 사용되는 RNG는 수론의 몇 가지 결과에 의존합니다. 첫째, `picker` 변수의 기초가 되는 Lehmer RNG가 넓은 주기를 가짐을 보장합니다. 둘째, `x ∈ [2,P-2]`에서 시작하는 경우 `pow(x,3,P)`가 `x`를 `1` 또는 `P-1`에 매핑하지 않음을 보여줍니다. 마지막으로, `pow(x,3,P)`가 해싱 함수로 취급될 때 충돌률이 낮다는 것을 보여줍니다.

### 레머 난수 생성기 {#lehmer-random-number}

`produce_dag` 함수는 편향되지 않은 난수를 생성할 필요는 없지만, `seed**i % P`가 소수의 값만 취한다는 잠재적인 위협이 있습니다. 이는 패턴을 인식하는 채굴자에게 그렇지 않은 채굴자보다 이점을 제공할 수 있습니다.

이를 피하기 위해 수론의 결과를 이용합니다. [_안전 소수_](https://en.wikipedia.org/wiki/Safe_prime)는 `(P-1)/2`도 소수인 소수 `P`로 정의됩니다. [곱셈 그룹](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ`의 멤버 `x`의 _위수_는 <pre>xᵐ mod P ≡ 1</pre>인 최소 `m`으로 정의됩니다.
이러한 정의가 주어지면 다음과 같습니다.

> 관찰 1. 안전 소수 `P`에 대해 `x`를 곱셈 그룹 `ℤ/Pℤ`의 멤버라고 합시다. 만약 `x mod P ≠ 1 mod P`이고 `x mod P ≠ P-1 mod P`이면, `x`의 위수는 `P-1` 또는 `(P-1)/2`입니다.

_증명_. `P`가 안전 소수이므로 [라그랑주의 정리][lagrange]에 따라 `x`의 위수는 `1`, `2`, `(P-1)/2` 또는 `P-1` 중 하나입니다.

`x`의 위수는 `1`이 될 수 없습니다. 페르마의 소정리에 따르면 다음과 같습니다.

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

따라서 `x`는 `ℤ/nℤ`의 곱셈 항등원이어야 하며, 이는 유일합니다. 가정에 따라 `x ≠ 1`이라고 가정했으므로 이는 불가능합니다.

`x`의 위수는 `x = P-1`이 아닌 한 `2`가 될 수 없습니다. 이는 `P`가 소수라는 사실에 위배되기 때문입니다.

위의 명제로부터 `(picker * init) % P`를 반복하면 최소 `(P-1)/2`의 주기 길이를 가질 것임을 알 수 있습니다. 이는 우리가 `P`를 2의 거듭제곱에 가까운 안전 소수로 선택했고, `init`이 `[2,2**256+1]` 구간에 있기 때문입니다. `P`의 크기를 고려할 때, 모듈러 지수화에서 주기가 발생할 것으로 예상해서는 안 됩니다.

DAG의 첫 번째 셀(변수 `init`)을 할당할 때, `pow(sha3(seed) + 2, 3, P)`를 계산합니다. 언뜻 보기에 이것은 결과가 `1`도 아니고 `P-1`도 아니라는 것을 보장하지 않습니다. 그러나 `P-1`이 안전 소수이므로, 관찰 1의 따름정리인 다음과 같은 추가적인 보장을 얻을 수 있습니다.

> 관찰 2. 안전 소수 `P`에 대해 `x`를 곱셈 그룹 `ℤ/Pℤ`의 멤버라고 하고, `w`를 자연수라고 합시다. 만약 `x mod P ≠ 1 mod P`이고 `x mod P ≠ P-1 mod P`이며, `w mod P ≠ P-1 mod P`이고 `w mod P ≠ 0 mod P`이면, `xʷ mod P ≠ 1 mod P`이고 `xʷ mod P ≠ P-1 mod P`입니다.

### 해시 함수로서의 모듈러 지수화 {#modular-exponentiation}

특정 `P`와 `w` 값에 대해, `pow(x, w, P)` 함수는 많은 충돌을 가질 수 있습니다. 예를 들어, `pow(x,9,19)`는 `{1,18}` 값만 가집니다.

`P`가 소수라는 점을 감안할 때, 모듈러 지수 해싱 함수에 적합한 `w`는 다음 결과를 사용하여 선택할 수 있습니다.

> 관찰 3. `P`를 소수라고 할 때, `w`와 `P-1`이 서로소인 것은, `ℤ/Pℤ`에 있는 모든 `a`와 `b`에 대해 <center>`aʷ mod P ≡ bʷ mod P`인 것이 `a mod P ≡ b mod P`인 것과 동치</center>라는 것입니다.

따라서 `P`가 소수이고 `w`가 `P-1`과 서로소일 때, `|{pow(x, w, P) : x ∈ ℤ}| = P`가 성립하며, 이는 해싱 함수가 가능한 최소 충돌률을 가짐을 의미합니다.

우리가 선택한 것처럼 `P`가 안전 소수인 특수한 경우, `P-1`은 1, 2, `(P-1)/2`, `P-1`만을 인수로 가집니다. `P` > 7이므로, 3은 `P-1`과 서로소이며, 따라서 `w=3`은 위 명제를 만족합니다.

## 보다 효율적인 캐시 기반 평가 알고리즘 {#cache-based-evaluation}

```python
def quick_calc(params, seed, p):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_calc_cached(cache, params, p)

def quick_calc_cached(cache, params, p):
    P = params["P"]
    if p < len(cache):
        return cache[p]
    else:
        x = pow(cache[0], p + 1, P)
        for _ in range(params["k"]):
            x ^= quick_calc_cached(cache, params, x % p)
        return pow(x, params["w"], P)

def quick_hashimoto(seed, dagsize, params, header, nonce):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_hashimoto_cached(cache, dagsize, params, header, nonce)

def quick_hashimoto_cached(cache, dagsize, params, header, nonce):
    m = dagsize // 2
    mask = 2**64 - 1
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc_cached(cache, params, m + (mix & mask) % m)
    return dbl_sha3(mix)
```
