---
title: 트랜잭션
description: 이더리움 트랜잭션에 대한 개요 - 작동 방식, 데이터 구조 및 애플리케이션을 통해 전송하는 방법.
lang: ko
---

트랜잭션은 계정에서 암호화 방식으로 서명된 명령어입니다. 계정은 [이더리움](/) 네트워크의 상태를 업데이트하기 위해 트랜잭션을 시작합니다. 가장 단순한 트랜잭션은 한 계정에서 다른 계정으로 ETH를 전송하는 것입니다.

## 전제 조건 {#prerequisites}

이 페이지를 더 잘 이해하기 위해 먼저 [계정](/developers/docs/accounts/)과 [이더리움 소개](/developers/docs/intro-to-ethereum/)를 읽어보시기를 권장합니다.

## 트랜잭션이란 무엇인가요? {#whats-a-transaction}

이더리움 트랜잭션은 외부 소유 계정, 즉 컨트랙트가 아닌 사람이 관리하는 계정에 의해 시작된 작업을 의미합니다. 예를 들어, Bob이 Alice에게 1 ETH를 전송하면 Bob의 계정에서는 차감되고 Alice의 계정에는 입금되어야 합니다. 이러한 상태 변경 작업은 트랜잭션 내에서 발생합니다.

![Diagram showing a transaction cause state change](./tx.png)
_[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)에서 발췌한 다이어그램_

EVM의 상태를 변경하는 트랜잭션은 전체 네트워크에 브로드캐스트되어야 합니다. 모든 노드는 EVM에서 트랜잭션이 실행되도록 요청을 브로드캐스트할 수 있습니다. 이 작업이 발생한 후, 검증자는 트랜잭션을 실행하고 그 결과로 발생한 상태 변경을 네트워크의 나머지 부분에 전파합니다.

트랜잭션에는 수수료가 필요하며 검증된 블록에 포함되어야 합니다. 이 개요를 더 간단하게 만들기 위해 가스비와 검증에 대해서는 다른 곳에서 다루겠습니다.

제출된 트랜잭션에는 다음 정보가 포함됩니다.

- `from` – 트랜잭션에 서명할 발신자의 주소입니다. 컨트랙트 계정은 트랜잭션을 보낼 수 없으므로 이는 외부 소유 계정이 됩니다.
- `to` – 수신 주소입니다(외부 소유 계정인 경우 트랜잭션은 가치를 전송합니다. 컨트랙트 계정인 경우 트랜잭션은 컨트랙트 코드를 실행합니다).
- `signature` – 발신자의 식별자입니다. 이는 발신자의 개인 키가 트랜잭션에 서명할 때 생성되며 발신자가 이 트랜잭션을 승인했음을 확인합니다.
- `nonce` - 계정에서 발생한 트랜잭션 번호를 나타내는 순차적으로 증가하는 카운터입니다.
- `value` – 발신자에서 수신자로 전송할 ETH의 양입니다(Wei 단위로 표시되며, 1ETH는 1e+18wei와 같습니다).
- `input data` – 임의의 데이터를 포함할 수 있는 선택적 필드입니다.
- `gasLimit` – 트랜잭션에서 소비할 수 있는 가스 단위의 최대량인 가스 한도입니다. [EVM](/developers/docs/evm/opcodes)은 각 계산 단계에 필요한 가스 단위를 지정합니다.
- `maxPriorityFeePerGas` - 검증자에게 팁으로 포함될 소비된 가스의 최대 가격입니다.
- `maxFeePerGas` - 트랜잭션을 위해 지불할 의사가 있는 가스 단위당 최대 수수료입니다(`baseFeePerGas` 및 `maxPriorityFeePerGas` 포함).

가스는 검증자가 트랜잭션을 처리하는 데 필요한 계산을 나타냅니다. 사용자는 이 계산에 대한 수수료를 지불해야 합니다. `gasLimit` 및 `maxPriorityFeePerGas`는 검증자에게 지불되는 최대 트랜잭션 수수료를 결정합니다. [가스에 대해 더 알아보기](/developers/docs/gas/).

트랜잭션 객체는 다음과 같은 형태를 띱니다.

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

하지만 트랜잭션 객체는 발신자의 개인 키를 사용하여 서명되어야 합니다. 이는 트랜잭션이 발신자로부터만 올 수 있었으며 부정하게 전송되지 않았음을 증명합니다.

Geth와 같은 이더리움 클라이언트가 이 서명 프로세스를 처리합니다.

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

응답 예시:

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

- `raw`는 [RLP(Recursive Length Prefix)](/developers/docs/data-structures-and-encoding/rlp) 인코딩 형식의 서명된 트랜잭션입니다.
- `tx`는 JSON 형식의 서명된 트랜잭션입니다.

서명 해시를 통해 트랜잭션이 발신자로부터 와서 네트워크에 제출되었음을 암호화 방식으로 증명할 수 있습니다.

### 데이터 필드 {#the-data-field}

대다수의 트랜잭션은 외부 소유 계정에서 컨트랙트에 액세스합니다.
대부분의 컨트랙트는 Solidity로 작성되며 [애플리케이션 바이너리 인터페이스(ABI)](/glossary/#abi)에 따라 데이터 필드를 해석합니다.

처음 4바이트는 함수 이름과 인수의 해시를 사용하여 호출할 함수를 지정합니다.
때로는 [이 데이터베이스](https://www.4byte.directory/signatures/)를 사용하여 선택자(selector)에서 함수를 식별할 수 있습니다.

콜 데이터의 나머지 부분은 [ABI 사양에 지정된 대로 인코딩된](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) 인수입니다.

예를 들어, [이 트랜잭션](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1)을 살펴보겠습니다.
콜 데이터를 보려면 **Click to see More**를 사용하세요.

함수 선택자는 `0xa9059cbb`입니다. [이 서명을 가진 알려진 함수](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb)가 여러 개 있습니다.
이 경우 [컨트랙트 소스 코드](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code)가 Etherscan에 업로드되었으므로 함수가 `transfer(address,uint256)`임을 알 수 있습니다.

나머지 데이터는 다음과 같습니다.

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

ABI 사양에 따르면 정수 값(예: 20바이트 정수인 주소)은 ABI에서 앞에 0이 채워진 32바이트 단어로 나타납니다.
따라서 `to` 주소가 [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279)임을 알 수 있습니다.
`value`는 0x3b0559f4 = 990206452입니다.

### 트랜잭션 설명자 {#transaction-descriptors}

데이터 필드에는 불투명한 16진수 바이트가 포함되어 있기 때문에 트랜잭션이 실제로 어떤 작업을 수행할지 확인하는 것은 매우 어려울 수 있습니다. 이러한 "블라인드 서명(blind signing)" 취약점은 (ERC-7730에 정의된) [트랜잭션 설명자](https://eips.ethereum.org/EIPS/eip-7730)를 사용하는 **[클리어 서명(Clear Signing)](https://clearsigning.org/)**을 통해 해결됩니다.  

ERC-7730 사양은 트랜잭션 설명자(종종 JSON 파일로 구성됨)를 사용하여 ABI 및 구조화된 메시지(예: EVM 트랜잭션 콜 데이터, EIP-712 메시지 및 EIP-4337 User Operations)에 있는 데이터를 보강합니다. 개발자는 이러한 설명자를 사용하여 특정 트랜잭션 변수를 포맷 템플릿에 직접 매핑함으로써 기본 데이터가 애플리케이션에서 기계 판독 가능한 상태로 유지되도록 합니다.

프론트엔드에서 지갑은 이 포맷 컨텍스트를 사용하여 불투명한 바이트코드를 명확하고 사람이 읽을 수 있는 정보로 변환합니다. 토큰 주소와 같은 값을 인식된 티커로 자동 변환하거나 금액을 소수점으로 변환함으로써, 사용자는 서명하기 전에 트랜잭션의 정확한 인텐트에 대한 평문 요약(예: '최소 0.25 WETH를 위해 1000 USDC 스왑')을 제공받습니다.

## 트랜잭션 유형 {#types-of-transactions}

이더리움에는 몇 가지 다른 유형의 트랜잭션이 있습니다.

- 일반 트랜잭션: 한 계정에서 다른 계정으로의 트랜잭션입니다.
- 컨트랙트 배포 트랜잭션: 'to' 주소가 없는 트랜잭션으로, 데이터 필드가 컨트랙트 코드에 사용됩니다.
- 컨트랙트 실행: 배포된 스마트 컨트랙트와 상호 작용하는 트랜잭션입니다. 이 경우 'to' 주소는 스마트 컨트랙트 주소입니다.

### 가스에 대하여 {#on-gas}

앞서 언급했듯이 트랜잭션을 실행하려면 [가스](/developers/docs/gas/)가 필요합니다. 단순 전송 트랜잭션에는 21000 단위의 가스가 필요합니다.

따라서 Bob이 190 Gwei의 `baseFeePerGas`와 10 Gwei의 `maxPriorityFeePerGas`로 Alice에게 1 ETH를 전송하려면 Bob은 다음 수수료를 지불해야 합니다.

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Bob의 계정에서 **-1.0042 ETH**가 차감됩니다(Alice를 위한 1 ETH + 가스비 0.0042 ETH).

Alice의 계정에 **+1.0 ETH**가 입금됩니다.

기본 수수료는 소각됩니다 **-0.00399 ETH**.

검증자는 팁을 가집니다 **+0.000210 ETH**.


![Diagram showing how unused gas is refunded](./gas-tx.png)
_[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)에서 발췌한 다이어그램_

트랜잭션에서 사용되지 않은 가스는 사용자 계정으로 환불됩니다.

### 스마트 컨트랙트 상호 작용 {#smart-contract-interactions}

스마트 컨트랙트가 포함된 모든 트랜잭션에는 가스가 필요합니다.

스마트 컨트랙트에는 컨트랙트의 상태를 변경하지 않는 [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) 또는 [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions) 함수로 알려진 함수도 포함될 수 있습니다. 따라서 EOA에서 이러한 함수를 호출하는 데는 가스가 필요하지 않습니다. 이 시나리오의 기본 RPC 호출은 [`eth_call`](/developers/docs/apis/json-rpc#eth_call)입니다.

`eth_call`를 사용하여 액세스할 때와 달리, 이러한 `view` 또는 `pure` 함수는 내부적으로(즉, 컨트랙트 자체 또는 다른 컨트랙트에서) 호출되는 경우도 흔하며 이 경우에는 가스 비용이 발생합니다.

## 트랜잭션 수명 주기 {#transaction-lifecycle}

트랜잭션이 제출되면 다음 작업이 발생합니다.

1. 트랜잭션 해시가 암호화 방식으로 생성됩니다.
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. 그런 다음 트랜잭션은 네트워크에 브로드캐스트되고 보류 중인 다른 모든 네트워크 트랜잭션으로 구성된 트랜잭션 풀에 추가됩니다.
3. 검증자는 트랜잭션을 확인하고 "성공"으로 간주하기 위해 트랜잭션을 선택하여 블록에 포함해야 합니다.
4. 시간이 지남에 따라 트랜잭션이 포함된 블록은 "정당화된" 상태로 업그레이드된 다음 "완결된" 상태로 업그레이드됩니다. 이러한 업그레이드는 트랜잭션이 성공적이었으며 결코 변경되지 않을 것임을 훨씬 더 확실하게 만듭니다. 블록이 "완결된" 상태가 되면 수십억 달러의 비용이 드는 네트워크 수준의 공격에 의해서만 변경될 수 있습니다.

## 시각적 데모 {#a-visual-demo}

Austin이 트랜잭션, 가스 및 채굴에 대해 설명하는 것을 시청하세요.

<VideoWatch slug="transactions-eth-build" />

## 타입이 지정된 트랜잭션 봉투(Typed Transaction Envelope) {#typed-transaction-envelope}

이더리움은 원래 트랜잭션에 대해 하나의 형식을 가지고 있었습니다. 각 트랜잭션에는 논스, 가스 가격, 가스 한도, 수신 주소, 값, 데이터, v, r, s가 포함되었습니다. 이러한 필드는 [RLP 인코딩](/developers/docs/data-structures-and-encoding/rlp/)되어 다음과 같은 형태를 띱니다.

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

이더리움은 레거시 트랜잭션 형식에 영향을 주지 않고 액세스 목록 및 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)와 같은 새로운 기능을 구현할 수 있도록 여러 유형의 트랜잭션을 지원하도록 발전했습니다.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)은 이러한 동작을 허용하는 것입니다. 트랜잭션은 다음과 같이 해석됩니다.

`TransactionType || TransactionPayload`

여기서 필드는 다음과 같이 정의됩니다.

- `TransactionType` - 0에서 0x7f 사이의 숫자로, 총 128개의 가능한 트랜잭션 유형을 나타냅니다.
- `TransactionPayload` - 트랜잭션 유형에 의해 정의된 임의의 바이트 배열입니다.

`TransactionType` 값을 기반으로 트랜잭션은 다음과 같이 분류될 수 있습니다.

1. **유형 0 (레거시) 트랜잭션:** 이더리움 출시 이후 사용된 원래 트랜잭션 형식입니다. 동적 가스비 계산이나 스마트 컨트랙트용 액세스 목록과 같은 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)의 기능은 포함하지 않습니다. 레거시 트랜잭션은 직렬화된 형태에서 유형을 나타내는 특정 접두사가 없으며, [RLP(Recursive Length Prefix)](/developers/docs/data-structures-and-encoding/rlp) 인코딩을 사용할 때 `0xf8` 바이트로 시작합니다. 이러한 트랜잭션의 TransactionType 값은 `0x0`입니다.

2. **유형 1 트랜잭션:** 이더리움의 [베를린 업그레이드](/ethereum-forks/#berlin)의 일부로 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)에 도입된 이 트랜잭션에는 `accessList` 매개변수가 포함됩니다. 이 목록은 트랜잭션이 액세스할 것으로 예상되는 주소와 스토리지 키를 지정하여 스마트 컨트랙트가 포함된 복잡한 트랜잭션의 [가스](/developers/docs/gas/) 비용을 잠재적으로 줄이는 데 도움을 줍니다. EIP-1559 수수료 시장 변경 사항은 유형 1 트랜잭션에 포함되지 않습니다. 유형 1 트랜잭션에는 secp256k1 서명의 y값 패리티를 나타내는 `0x0` 또는 `0x1`가 될 수 있는 `yParity` 매개변수도 포함됩니다. 이들은 `0x01` 바이트로 시작하여 식별되며, TransactionType 값은 `0x1`입니다.

3. **유형 2 트랜잭션:** 일반적으로 EIP-1559 트랜잭션이라고 불리며, 이더리움의 [런던 업그레이드](/ethereum-forks/#london)에서 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)에 도입된 트랜잭션입니다. 이들은 이더리움 네트워크의 표준 트랜잭션 유형이 되었습니다. 이 트랜잭션은 트랜잭션 수수료를 기본 수수료와 우선순위 수수료로 분리하여 예측 가능성을 향상시키는 새로운 수수료 시장 메커니즘을 도입합니다. 이들은 `0x02` 바이트로 시작하며 `maxPriorityFeePerGas` 및 `maxFeePerGas`와 같은 필드를 포함합니다. 유형 2 트랜잭션은 유연성과 효율성 덕분에 현재 기본값이 되었으며, 특히 네트워크 혼잡도가 높은 기간에 사용자가 트랜잭션 수수료를 더 예측 가능하게 관리할 수 있도록 도와주어 선호됩니다. 이러한 트랜잭션의 TransactionType 값은 `0x2`입니다.

4. **유형 3 (블롭) 트랜잭션:** 이더리움의 [덴쿤 업그레이드](/ethereum-forks/#dencun)의 일부로 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844)에 도입되었습니다. 이 트랜잭션은 "블롭" 데이터(Binary Large Objects)를 더 효율적으로 처리하도록 설계되었으며, 특히 더 낮은 비용으로 이더리움 네트워크에 데이터를 게시할 수 있는 방법을 제공하여 레이어 2 롤업에 이점을 줍니다. 블롭 트랜잭션에는 `blobVersionedHashes`, `maxFeePerBlobGas` 및 `blobGasPrice`와 같은 추가 필드가 포함됩니다. 이들은 `0x03` 바이트로 시작하며, TransactionType 값은 `0x3`입니다. 블롭 트랜잭션은 이더리움의 데이터 가용성 및 확장 기능에서 상당한 개선을 나타냅니다.

5. **유형 4 트랜잭션:** 이더리움의 [펙트라 업그레이드](/roadmap/pectra/)의 일부로 [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)에 도입되었습니다. 이 트랜잭션은 계정 추상화와 상위 호환되도록 설계되었습니다. 이를 통해 EOA는 원래 기능을 손상시키지 않으면서 일시적으로 스마트 컨트랙트 계정처럼 작동할 수 있습니다. 여기에는 EOA가 권한을 위임할 스마트 컨트랙트를 지정하는 `authorization_list` 매개변수가 포함됩니다. 트랜잭션 후 EOA의 코드 필드에는 위임된 스마트 컨트랙트의 주소가 포함됩니다.

## 더 읽어보기 {#further-reading}

- [EIP-2718: 타입이 지정된 트랜잭션 봉투](https://eips.ethereum.org/EIPS/eip-2718)

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하고 추가해 주세요!_

## 관련 주제 {#related-topics}

- [계정](/developers/docs/accounts/)
- [이더리움 가상 머신(EVM)](/developers/docs/evm/)
- [가스](/developers/docs/gas/)