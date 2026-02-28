---
title: "트랜잭션"
description: "이더리움 트랜잭션의 개요 - 어떻게 동작하는지, 데이터 구조, 그리고 애플리케이션을 통해 어떻게 전송되는지"
lang: ko
---

트랜잭션은 계정으로부터 암호학적으로 서명된 명령들이다. 계정은 이더리움 네트워크의 상태를 업데이트하기 위해 트랜잭션을 초기화 할 것이다. 가장 간단한 트랜잭션은 한 계정에서 다른 계정으로 ETH를 보내는 것이다.

## 필수 구성 요소 {#prerequisites}

이 페이지를 더 잘 이해할 수 있도록 [계정](/developers/docs/accounts/) 및 [이더리움 소개](/developers/docs/intro-to-ethereum/)를 먼저 읽어보시는 것을 권장합니다.

## 트랜잭션이란 무엇인가? 트랜잭션이란 무엇인가요? {#whats-a-transaction}

이더리움 트랜잭션은 외부 계정, 즉 컨트랙트가 아니라 사람이 관리하는 계정에 의해 초기화된 하나의 동작을 말한다. 예를 들어, 밥이 앨리스에게 1 ETH를 보낸다면, 밥의 계정은 인출되어야 하고, 앨리스의 것은 입금되어야 한다. 이 상태-변경 동작은 트랜잭션 안에서 이루어진다.

![트랜잭션으로 인한 상태 변화를 보여주는 다이어그램](./tx.png)
_[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)에서 발췌한 다이어그램_

EVM의 상태를 변경하는 트랜잭션은 전체 네트워크로 브로드캐스트되어야 한다. 어떤 노드든 EVM 위에서 실행되는 트랜잭션을 위한 요청을 브로드캐스트 할 수 있다. 이 과정을 거치고나서, 검증자는 트랜잭션을 실행하고 상태변경 결과를 나머지 네트워크로 전파한다.

트랜잭션은 수수료가 필요하고 검증된 블록에 포함되어 있어야한다. 이 개요를 더 간단히 하기 위해서 우리는 다른곳에서 가스 수수료와 검증에 대해서 다룰 것이다.

제출된 트랜잭션은 다음 정보를 갖는다.

- `from` – 트랜잭션에 서명할 보내는 사람의 주소입니다. 컨트랙트 계정은 트랜잭션을 보낼 수 없기 때문에 외부계정에만 존재한다
- `to` – 받는 주소(외부 소유 계정인 경우, 트랜잭션이 값을 전송합니다). 컨트랙트 계정이라면 트랜잭션은 컨트랙트 코드를 실행할 것이다)
- `signature` – 보내는 사람의 식별자입니다. 이것은 송신자의 개인 키로 트랜잭션을 서명하고 송신자가 트랜잭션을 인증함을 확정하면 생성된다.
- `nonce` - 계정의 트랜잭션 수를 나타내는 순차적으로 증가하는 카운터입니다.
- `value` – 보내는 사람에서 받는 사람으로 전송할 ETH 금액(WEI 단위이며, 1ETH는 1e+18wei와 같습니다).
- `input data` – 임의의 데이터를 포함하기 위한 선택적 필드입니다.
- `gasLimit` – 트랜잭션이 소비할 수 있는 가스 단위의 최대량입니다. [EVM](/developers/docs/evm/opcodes)은 각 계산 단계에 필요한 가스 단위를 명시합니다.
- `maxPriorityFeePerGas` - 검증인에게 팁으로 포함될 소비된 가스의 최대 가격입니다.
- `maxFeePerGas` - 트랜잭션에 대해 지불하고자 하는 가스 단위당 최대 수수료(`baseFeePerGas` 및 `maxPriorityFeePerGas` 포함)입니다.

가스는 채굴자에 의해 트랜잭션을 처리하는데 필요한 컴퓨팅 계산에 대한 참조이다. 사용자들은 이 컴퓨팅에 수수료를 지불해야 한다. `gasLimit`과 `maxPriorityFeePerGas`는 검증인에게 지불되는 최대 트랜잭션 수수료를 결정합니다. [가스에 대한 자세한 정보](/developers/docs/gas/).

트랜잭션 객체는 아래처럼 보일 것이다.

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

그러나 트랜잭션 객체는 송신자의 개인 키를 사용해서 서명되어야 한다. 이는 그 트랜잭션이 그 송신자로부터만 왔고, 부정하게 보내지지 않았음을 증명한다.

Geth 같은 이더리움 클라이언트가 이 서명 과정을 처리할 것이다.

[JSON-RPC](/developers/docs/apis/json-rpc) 호출 예시:

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

예시 응답:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw`는 [RLP(Recursive Length Prefix)](/developers/docs/data-structures-and-encoding/rlp)로 인코딩된 서명된 트랜잭션입니다.
- `tx`는 JSON 형식의 서명된 트랜잭션입니다.

해시를 서명함으로써, 트랜잭션이 네트워크로부터 제출되었음과 송신자로부터 왔음을 암호학적으로 입증할 수 있다.

### 데이터 필드 {#the-data-field}

대부분의 트랜잭션은 외부 소유 계정의 컨트랙트를 액세스한다.
대부분의 컨트랙트는 솔리디티(Solidity)로 작성되며, [ABI(애플리케이션 바이너리 인터페이스)](/glossary/#abi)에 따라 데이터 필드를 해석합니다.

처음 4 바이트는 함수 이름과 arguments의 해시를 사용하여 호출할 함수를 명시합니다.
[이 데이터베이스](https://www.4byte.directory/signatures/)를 사용하여 셀렉터로부터 함수를 식별할 수 있습니다.

나머지 calldata는 인자이며, [ABI 사양에 명시된 대로 인코딩됩니다](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

예를 들어, [이 트랜잭션](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1)을 살펴보겠습니다.
calldata를 보려면 **Click to see More**를 사용하세요.

함수 셀렉터는 `0xa9059cbb`입니다. [이 서명을 가진 여러 알려진 함수](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb)가 있습니다.
이 경우 [컨트랙트 소스 코드](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code)가 Etherscan에 업로드되었으므로 함수가 `transfer(address,uint256)`임을 알 수 있습니다.

나머지 데이터는:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

ABI 명세서에 따르면, 정수값 (예를 들어 20바이트 정수인 주소) 은 ABI에서 앞에 0이 추가된 32 바이트 단어로 표시된다.
따라서 `to` 주소는 [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279)임을 알 수 있습니다.
`value`는 0x3b0559f4 = 990206452입니다.

## 트랜잭션 유형 {#types-of-transactions}

이더리움에서는 다른 몇가지 다른 유형의 트랜잭션이 있다.

- 보통의 트랜잭션: 한 계정에서 다른 계정으로의 트랜잭션
- Contract deployment transactions: 'to' address 가 없는 트랜잭션으로, 데이터 필드가 컨트랙트 코드로 사용된다.
- 컨트랙트의 실행: 배포된 스마트 컨트랙트와 상호작용하는 트랜잭션이다. 이 경우, 'to' 주소는 스마트 컨트랙트의 주소이다.

### 가스에 대하여 {#on-gas}

앞서 언급했듯이 트랜잭션을 실행하려면 [가스](/developers/docs/gas/)가 필요합니다. 간단한 전송 트랜잭션은 21000 단위의 가스가 필요하다.

따라서 밥이 앨리스에게 `baseFeePerGas` 190gwei와 `maxPriorityFeePerGas` 10gwei로 1ETH를 보내려면, 밥은 다음 수수료를 지불해야 합니다:

```
(190 + 10) * 21000 = 4,200,000 gwei
--또는--
0.0042 ETH
```

밥의 계정에서 **-1.0042 ETH**가 인출됩니다(앨리스에게 1 ETH + 가스 수수료 0.0042 ETH).

앨리스의 계정에 **+1.0 ETH**가 입금됩니다.

**-0.00399 ETH**의 기본 수수료는 소각됩니다.

검증인은 팁으로 **+0.000210 ETH**를 받습니다.

![사용되지 않은 가스가 환불되는 방식을 보여주는 다이어그램](./gas-tx.png)
_[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)에서 발췌한 다이어그램_

트랜잭션 내에서 사용되지 않은 가스는 사용자 계정으로 환불된다.

### 스마트 계약 상호작용 {#smart-contract-interactions}

스마트 계약과 관련된 모든 트랜잭션에는 가스가 필요합니다.

스마트 계약에는 컨트랙트의 상태를 변경하지 않는 [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) 또는 [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions) 함수로 알려진 함수가 포함될 수도 있습니다. 따라서 EOA에서 이러한 함수를 호출할 때 가스가 필요하지 않습니다. 이 시나리오의 기본 RPC 호출은 [`eth_call`](/developers/docs/apis/json-rpc#eth_call)입니다.

`eth_call`을 사용하여 액세스할 때와 달리, 이러한 `view` 또는 `pure` 함수는 내부적으로(즉, 컨트랙트 자체 또는 다른 컨트랙트에서) 호출될 때도 가스를 소모합니다.

## 트랜잭션 생명주기 {#transaction-lifecycle}

트랜잭션이 제출되면 다음이 일어난다.

1. 트랜잭션 해시는 암호화 방식으로 생성됩니다:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. 트랜잭션은 네트워크로 브로드캐스트 되고 다른 모든 보류 중인 네트워크 트랜잭션으로 구성된 트랜잭션 풀에 추가됩니다.
3. 검증인은 트랜잭션을를 입증하고 성공적이라고 처리하기 위해 트랜잭션을 선택하고 이를 블록에 포함해야 한다.
4. 시간이 지날 수록 블록에 포함된 당신의 트랜잭션은 "justified" 에서 "finalized"로 업그레이드 될 것이다. 이러한 업그레이드를 통해 트랜잭션이 성공적으로 완료되고 절대 변경되지 않을 것이라고 훨씬 더 확신할 수 있습니다. 블록이 "완료(finalized)"되면 수십억 달러의 비용이 드는 네트워크 수준의 공격에 의해서만 변경될 수 있습니다.

## 시각적 데모 {#a-visual-demo}

오스틴의 트랜잭션, 가스, 그리고 채굴에 대한 안내를 보라.

<YouTube id="er-0ihqFQB0" />

## 유형화된 트랜잭션 봉투 {#typed-transaction-envelope}

이더리움은 원래 트랜잭션 형식이 하나였다. 각 트랜잭션은 nonce, gas price, gas limit, to address, value, data, v, r, 와 s 를 포함 되어있었다. 이 필드들은 [RLP 인코딩](/developers/docs/data-structures-and-encoding/rlp/)되며, 다음과 같은 형식을 가집니다:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

이더리움은 기존 트랜잭션 형식에 영향을 주지 않고 액세스 목록 및 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)와 같은 새로운 기능을 구현할 수 있도록 여러 유형의 트랜잭션을 지원하도록 발전했습니다.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)은 이러한 동작을 가능하게 합니다. 트랜잭션들은 다음과 같이 해석된다:

`TransactionType || TransactionPayload`

필드는 다음과 같이 정의된다.

- `TransactionType` - 0과 0x7f 사이의 숫자로, 총 128개의 가능한 트랜잭션 유형을 나타냅니다.
- `TransactionPayload` - 트랜잭션 유형에 따라 정의되는 임의의 바이트 배열입니다.

`TransactionType` 값에 따라 트랜잭션을 다음과 같이 분류할 수 있습니다.

1. **유형 0(레거시) 트랜잭션:** 이더리움 출시 이후 사용된 원래 트랜잭션 형식입니다. 이 트랜잭션은 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)의 동적 가스 수수료 계산이나 스마트 계약용 액세스 목록과 같은 기능을 포함하지 않습니다. 레거시 트랜잭션은 직렬화된 형태에서 유형을 나타내는 특정 접두사가 없으며, [RLP(Recursive Length Prefix)](/developers/docs/data-structures-and-encoding/rlp) 인코딩을 사용할 때 바이트 `0xf8`로 시작합니다. 이러한 트랜잭션의 TransactionType 값은 `0x0`입니다.

2. **유형 1 트랜잭션:** 이더리움의 [베를린 업그레이드](/ethereum-forks/#berlin)의 일부로 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)에서 도입되었으며, 이 트랜잭션에는 `accessList` 매개변수가 포함됩니다. 이 목록은 트랜잭션이 액세스할 것으로 예상되는 주소와 스토리지 키를 지정하여 스마트 계약과 관련된 복잡한 트랜잭션의 [가스](/developers/docs/gas/) 비용을 줄이는 데 도움이 될 수 있습니다. 유형 1 트랜잭션에는 EIP-1559 수수료 시장 변경 사항이 포함되지 않습니다. 유형 1 트랜잭션에는 `yParity` 매개변수도 포함되며, `0x0` 또는 `0x1`일 수 있으며 secp256k1 서명의 y-값의 패리티를 나타냅니다. 이 트랜잭션은 바이트 `0x01`로 시작하여 식별되며, TransactionType 값은 `0x1`입니다.

3. **유형 2 트랜잭션**은 일반적으로 EIP-1559 트랜잭션이라고 하며, 이더리움의 [런던 업그레이드](/ethereum-forks/#london)에서 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)의 일부로 도입되었습니다. 이 트랜잭션들은 이더리움 네트워크의 표준 트랜잭션 유형이 되었습니다. 이 트랜잭션들은 새로운 수수료 시장 메커니즘을 도입하여 기본 수수료와 우선 수수료로 분리하여 수수료 예측성을 향상시킵니다. 이 트랜잭션은 바이트 `0x02`로 시작하며 `maxPriorityFeePerGas` 및 `maxFeePerGas`와 같은 필드를 포함합니다. 유형 2 트랜잭션은 유연성과 효율성 덕분에 현재 기본 설정이며, 특히 높은 네트워크 혼잡 시 사용자들이 트랜잭션 수수료를 보다 예측 가능하게 관리할 수 있게 해줍니다. 이러한 트랜잭션의 TransactionType 값은 `0x2`입니다.

4. **유형 3(블롭) 트랜잭션**은 이더리움의 [덴쿤 업그레이드](/ethereum-forks/#dencun)의 일부로 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)에서 도입되었습니다. 이 트랜잭션은 "블롭" 데이터(바이너리 대규모 개체)를 보다 효율적으로 처리하도록 설계되었으며, 특히 이더리움 네트워크에 더 저렴한 비용으로 데이터를 게시하는 방법을 제공하여 레이어 2 롤업에 이점을 줍니다. 블롭 트랜잭션에는 `blobVersionedHashes`, `maxFeePerBlobGas`, `blobGasPrice`와 같은 추가 필드가 포함됩니다. 이 트랜잭션은 바이트 `0x03`으로 시작하며, TransactionType 값은 `0x3`입니다. 블롭 트랜잭션은 이더리움의 데이터 가용성 및 확장성 기능에 있어 상당한 개선을 의미합니다.

5. **유형 4 트랜잭션**은 이더리움의 [펙트라 업그레이드](/roadmap/pectra/)의 일부로 [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)에서 도입되었습니다. 이러한 트랜잭션은 계정 추상화와 순방향 호환이 가능하도록 설계되었습니다. 이러한 트랜잭션을 사용하면 EOA가 원래 기능을 손상시키지 않으면서 일시적으로 스마트 계약 계정처럼 작동할 수 있습니다. `authorization_list` 매개변수를 포함하며, EOA가 권한을 위임하는 스마트 계약을 지정합니다. 트랜잭션 후 EOA의 코드 필드에는 위임된 스마트 계약의 주소가 포함됩니다.

## 더 읽어보기 {#further-reading}

- [EIP-2718: 유형화된 트랜잭션 봉투](https://eips.ethereum.org/EIPS/eip-2718)

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_

## 관련 주제 {#related-topics}

- [계정](/developers/docs/accounts/)
- [이더리움 가상 머신(EVM)](/developers/docs/evm/)
- [가스](/developers/docs/gas/)
