---
title: "재귀 길이 접두사(RLP) 직렬화"
description: "이더리움의 실행 계층에서 사용되는 RLP 인코딩의 정의입니다."
lang: ko
sidebarDepth: 2
---

재귀 길이 접두사(RLP) 직렬화는 이더리움의 실행 클라이언트에서 광범위하게 사용됩니다. RLP는 공간 효율적인 형식으로 노드 간 데이터 전송을 표준화합니다. RLP의 목적은 임의로 중첩된 이진 데이터 배열을 인코딩하는 것이며, 이더리움의 실행 계층에서 객체를 직렬화하는 데 사용되는 주요 인코딩 방법입니다. RLP의 주된 목적은 구조를 인코딩하는 것입니다. 양의 정수를 제외하고, RLP는 특정 데이터 유형(예: 문자열, 부동 소수점)의 인코딩을 상위 프로토콜에 위임합니다. 양의 정수는 선행 0이 없는 빅 엔디언 이진 형식으로 표현되어야 합니다(따라서 정수 값 0은 빈 바이트 배열과 동일해집니다). 선행 0이 있는 역직렬화된 양의 정수는 RLP를 사용하는 모든 상위 프로토콜에서 유효하지 않은 것으로 처리되어야 합니다.

자세한 정보는 [이더리움 황서(부록 B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19)에서 확인할 수 있습니다.

딕셔너리를 인코딩하기 위해 RLP를 사용할 때 권장되는 두 가지 표준 형식은 다음과 같습니다.

- 사전순으로 정렬된 키와 함께 `[[k1,v1],[k2,v2]...]` 사용
- [이더리움](/)과 같이 상위 수준의 패트리샤 트리(Patricia Tree) 인코딩 사용

## 정의 {#definition}

RLP 인코딩 함수는 항목(item)을 입력으로 받습니다. 항목은 다음과 같이 정의됩니다.

- 문자열(즉, 바이트 배열)은 항목입니다.
- 항목들의 목록은 항목입니다.
- 양의 정수는 항목입니다.

예를 들어, 다음은 모두 항목입니다.

- 빈 문자열
- "cat"이라는 단어가 포함된 문자열
- 임의의 개수의 문자열을 포함하는 목록
- `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`와 같은 더 복잡한 데이터 구조
- 숫자 `100`

이 페이지의 나머지 부분에서 '문자열'은 "특정 바이트 수의 이진 데이터"를 의미합니다. 특별한 인코딩은 사용되지 않으며, 문자열의 내용에 대한 어떠한 지식도 암시하지 않습니다(최소화되지 않은 양의 정수를 금지하는 규칙에서 요구하는 경우는 제외).

RLP 인코딩은 다음과 같이 정의됩니다.

- 양의 정수의 경우, 빅 엔디언으로 해석했을 때 해당 정수가 되는 가장 짧은 바이트 배열로 변환된 다음, 아래 규칙에 따라 문자열로 인코딩됩니다.
- 값이 `[0x00, 0x7f]`(10진수 `[0, 127]`) 범위에 있는 단일 바이트의 경우, 해당 바이트 자체가 RLP 인코딩이 됩니다.
- 그렇지 않고 문자열의 길이가 0\~55바이트인 경우, RLP 인코딩은 값 **0x80**(10진수 128)에 문자열의 길이를 더한 단일 바이트와 그 뒤에 이어지는 문자열로 구성됩니다. 따라서 첫 번째 바이트의 범위는 `[0x80, 0xb7]`(10진수 `[128, 183]`)입니다.
- 문자열의 길이가 55바이트를 초과하는 경우, RLP 인코딩은 값 **0xb7**(10진수 183)에 이진 형식으로 표현된 문자열 길이의 바이트 길이를 더한 단일 바이트, 문자열의 길이, 그리고 문자열 순으로 구성됩니다. 예를 들어, 1024바이트 길이의 문자열은 `\xb9\x04\x00`(10진수 `185, 4, 0`) 뒤에 문자열이 이어지는 형태로 인코딩됩니다. 여기서 첫 번째 바이트는 `0xb9`(183 + 2 = 185)이며, 그 뒤에 실제 문자열의 길이를 나타내는 2바이트 `0x0400`(10진수 1024)가 옵니다. 따라서 첫 번째 바이트의 범위는 `[0xb8, 0xbf]`(10진수 `[184, 191]`)입니다.
- 문자열의 길이가 2^64바이트 이상인 경우 인코딩할 수 없습니다.
- 목록의 전체 페이로드(즉, RLP 인코딩되는 모든 항목의 결합된 길이)가 0\~55바이트인 경우, RLP 인코딩은 값 <strong>0xc0</strong>에 페이로드의 길이를 더한 단일 바이트와 그 뒤에 이어지는 항목들의 RLP 인코딩 연결로 구성됩니다. 따라서 첫 번째 바이트의 범위는 `[0xc0, 0xf7]`(10진수 `[192, 247]`)입니다.
- 목록의 전체 페이로드가 55바이트를 초과하는 경우, RLP 인코딩은 값 <strong>0xf7</strong>에 이진 형식으로 표현된 페이로드 길이의 바이트 길이를 더한 단일 바이트, 페이로드의 길이, 그리고 항목들의 RLP 인코딩 연결 순으로 구성됩니다. 따라서 첫 번째 바이트의 범위는 `[0xf8, 0xff]`(10진수 `[248, 255]`)입니다.

간략히 요약하면 다음과 같습니다.

| 범위       | 바이트 1     | 바이트 2     | ...        | 바이트 9                | 바이트 10    | 의미                                   |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | 단일 바이트 문자열                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | 짧은 문자열(0\~55바이트)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | 긴 문자열, 길이를 위한 N+1바이트 후 페이로드 |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | 짧은 목록(0\~55바이트)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | 긴 목록, 길이를 위한 N+1바이트 후 페이로드 |

- `p` = 페이로드
- `n` = 길이(페이로드 바이트 수)
- `N` = 길이의 길이 오프셋(N+1개의 `n` 바이트가 이어짐)

코드로 표현하면 다음과 같습니다.

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## 예시 {#examples}

- 문자열 "dog" = [ 0x83, 'd', 'o', 'g' ]
- 목록 [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- 빈 문자열('null') = `[ 0x80 ]`
- 빈 목록 = `[ 0xc0 ]`
- 정수 0 = `[ 0x80 ]`
- 바이트 '\x00' = `[ 0x00 ]`
- 바이트 '\x0f' = `[ 0x0f ]`
- 바이트 '\x04\x00' = `[ 0x82, 0x04, 0x00 ]`
- 3의 [집합론적 표현](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers), `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- 문자열 "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## RLP 디코딩 {#rlp-decoding}

RLP 인코딩의 규칙과 과정에 따라, RLP 디코딩의 입력은 이진 데이터 배열로 간주됩니다. RLP 디코딩 과정은 다음과 같습니다.

1.  입력 데이터의 첫 번째 바이트(즉, 접두사)에 따라 데이터 유형, 실제 데이터의 길이 및 오프셋을 디코딩합니다.

2.  데이터의 유형과 오프셋에 따라 데이터를 상응하게 디코딩하며, 양의 정수에 대한 최소 인코딩 규칙을 준수합니다.

3.  입력의 나머지 부분을 계속해서 디코딩합니다.

이 중 데이터 유형 및 오프셋을 디코딩하는 규칙은 다음과 같습니다.

1.  첫 번째 바이트(즉, 접두사)의 범위가 [0x00, 0x7f]인 경우 데이터는 문자열이며, 문자열은 첫 번째 바이트 그 자체입니다.

2.  첫 번째 바이트의 범위가 [0x80, 0xb7]인 경우 데이터는 문자열이며, 첫 번째 바이트에서 0x80을 뺀 값과 길이가 같은 문자열이 첫 번째 바이트 뒤에 옵니다.

3.  첫 번째 바이트의 범위가 [0xb8, 0xbf]인 경우 데이터는 문자열이며, 첫 번째 바이트에서 0xb7을 뺀 값과 바이트 길이가 같은 문자열의 길이가 첫 번째 바이트 뒤에 오고, 그 뒤에 문자열이 옵니다.

4.  첫 번째 바이트의 범위가 [0xc0, 0xf7]인 경우 데이터는 목록이며, 첫 번째 바이트에서 0xc0을 뺀 값과 전체 페이로드가 같은 목록의 모든 항목에 대한 RLP 인코딩 연결이 첫 번째 바이트 뒤에 옵니다.

5.  첫 번째 바이트의 범위가 [0xf8, 0xff]인 경우 데이터는 목록이며, 첫 번째 바이트에서 0xf7을 뺀 값과 길이가 같은 목록의 전체 페이로드가 첫 번째 바이트 뒤에 오고, 그 뒤에 목록의 모든 항목에 대한 RLP 인코딩 연결이 옵니다.

코드로 표현하면 다음과 같습니다.

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## 더 읽을거리 {#further-reading}

- [이더리움의 RLP](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [이더리움의 내부 동작 원리: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). ACL2에서의 이더리움 재귀 길이 접두사(Ethereum's Recursive Length Prefix in ACL2). arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## 관련 주제 {#related-topics}

- [패트리샤 머클 트라이(Patricia merkle trie)](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)