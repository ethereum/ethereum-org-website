---
title: "ERC-7730으로 프로토콜에 명확한 서명하기 추가하기"
description: "사용자가 서명하기 전에 지갑에 사람이 읽을 수 있는 세부 정보를 표시하도록 스마트 컨트랙트 상호작용을 위한 ERC-7730 설명자(descriptor)를 작성하는 방법을 알아보세요."
author: "헤스터 브루이크만"
lang: ko
tags: ["ERC-7730", "보안", "서명하기", "스마트 컨트랙트", "지갑"]
skill: intermediate
breadcrumb: "명확한 서명하기"
published: 2026-05-11
---

대부분의 주요 이더리움 익스플로잇은 동일한 마지막 단계를 거쳤습니다. 바로 사용자가 의미를 제대로 이해하지 못한 채 트랜잭션을 승인하는 것입니다. 하드웨어 지갑은 원시 16진수 콜 데이터를 표시하며, 더 나쁜 것은 블라인드 서명하기를 강제로 켜도록 한다는 점입니다. 소프트웨어 지갑은 디코딩된 필드를 표시하지만, 컨트랙트를 인식할 때만 가능합니다. 프로토콜이 새롭거나, 앱이 손상되었거나, 디바이스가 오프라인 상태여서 컨트랙트를 인식하지 못할 때 사용자는 블라인드 서명을 하게 됩니다.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)은 컨트랙트의 함수 호출이 *무엇을 의미하는지* 설명하기 위한 표준 JSON 형식을 정의합니다.

ERC-7730을 지원하는 지갑은 설명자를 읽고 다음과 같이 표시합니다.

> **Swap**  
> Send: 1,000 USDC  
> Receive minimum: 0.42 WETH  
> Protocol: Uniswap V2

또는 함수 선택자와 원시 정수 값 목록 대신, 사람과 에이전트 모두 읽을 수 있도록 구성된 단일 문장으로 표시합니다.

> Swap 1,000 USDC for at least 0.42 WETH

이것이 바로 [명확한 서명하기(clear signing)](https://clearsigning.org/)입니다. "보이는 대로 서명한다(What You See Is What You Sign)"는 의미입니다. 이 튜토리얼에서는 자체 컨트랙트를 위한 설명자를 작성하고, 공식 CLI 도구로 유효성을 검사하며, 개방형 레지스트리에 제출하는 과정을 안내합니다.

## 전제 조건 {#prerequisites}

- Solidity 및 스마트 컨트랙트 ABI에 대한 친숙함
- 검증된 ABI가 있는 배포된 스마트 컨트랙트(설명자가 레지스트리에 수락되려면 먼저 [Sourcify](https://sourcify.dev) 검증이 필요합니다)
- 유효성 검사 CLI를 위한 Python 3.12(고정된 `erc7730` 패키지는 Python 3.13 이상에서는 설치되지 않습니다). 시스템 Python 버전이 다른 경우, [uv](https://docs.astral.sh/uv/)를 사용하여 Python 3.12를 다운로드하고 실행할 수 있습니다.
- 기본적인 JSON 지식

## ERC-7730 설명자란 무엇인가요? {#what-is-an-erc-7730-descriptor}

설명자는 세 가지 섹션으로 구성된 단일 JSON 파일입니다.

| 섹션 | 목적 |
| :---- | :---- |
| `context` | 체인 ID와 주소를 통해 설명자를 특정 컨트랙트 배포에 바인딩합니다. |
| `metadata` | 프로젝트 이름을 지정하고 재사용 가능한 상수를 정의합니다. |
| `display` | 각 함수 서명을 사람이 읽을 수 있는 레이블 및 필드 형식에 매핑합니다. |

설명자는 컨트랙트 자체와 분리되어 있으므로, 재배포 없이 기존 프로토콜에 명확한 서명하기 지원을 추가할 수 있습니다. 지갑은 레지스트리에서 설명자를 검색하여 서명할 때 사용합니다.

## 1단계: 파일 뼈대 만들기 {#step-1-create-the-file-skeleton}

`calldata-<ContractName>.json` 형식으로 파일 이름을 지정하여 생성합니다(예: `calldata-SwapRouter.json`). `calldata-` 접두사는 레지스트리에 이 설명자가 타입이 지정된 데이터 메시지를 위한 `eip712-`와 달리 컨트랙트 함수 호출을 다룬다는 것을 알려줍니다. 여러 버전의 컨트랙트를 설명해야 하는 경우, 레지스트리의 `calldata-UniswapV3Router02.json`처럼 이름에 컨트랙트 버전을 포함하세요.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {},
  "metadata": {},
  "display": {
    "formats": {}
  }
}
```

## 2단계: 컨텍스트 섹션 작성하기 {#step-2-write-the-context-section}

`context` 섹션은 설명자를 하나 이상의 컨트랙트 배포에 바인딩합니다. 지갑은 이를 사용하여 수신되는 트랜잭션을 올바른 설명자와 일치시킵니다.

```json
"context": {
  "$id": "example-swap-router",
  "contract": {
    "deployments": [
      { "chainId": 1, "address": "0xYourContractAddressOnMainnet" },
      { "chainId": 137, "address": "0xYourContractAddressOnPolygon" }
    ]
  }
}
```

### 컨텍스트 필드 {#context-fields}

- `context.$id` — 이 설명자 문서 또는 배포 구성에 대한 고유 식별자입니다.
- `contract.deployments` — 이 설명자가 적용되는 배포 세트입니다.
- `deployments[].chainId` — 배포를 위한 EVM 체인 ID입니다. 컨트랙트가 배포된 모든 체인을 포함하세요.
- `deployments[].address` — 지갑이 이 설명자와 연결해야 하는 컨트랙트 주소입니다. 이는 사용자가 실제로 트랜잭션을 보내는 주소입니다. 컨트랙트가 업그레이드 가능한 경우, 이는 구현 주소가 아닌 프록시 주소이며, `display.formats`의 함수 서명은 구현의 ABI에서 가져옵니다.

## 3단계: 메타데이터 섹션 작성하기 {#step-3-write-the-metadata-section}

메타데이터 섹션은 이 파일이 설명하는 프로젝트 및 컨트랙트에 대해 사람이 읽을 수 있는 정보를 제공합니다. 지갑은 서명하는 동안 프로토콜 이름, 링크 및 기타 컨텍스트 세부 정보를 표시하기 위해 이 정보를 사용할 수 있습니다.

```json
"metadata": {
  "owner": "Example Swap Protocol",
  "info": { "url": "https://example.xyz" },
  "contractName": "SwapRouter"
}
```

### 메타데이터 필드 {#metadata-fields}

- `owner` — 이 설명자를 담당하는 프로젝트, 프로토콜, 조직 또는 유지 관리자입니다.
- `info.url` — 지갑이 추가 컨텍스트를 위해 사용자에게 표시할 수 있는 공식 프로젝트 또는 문서 URL입니다.
- `contractName` — 이 파일이 설명하는 컨트랙트 또는 구현 이름으로, 일반적으로 검증된 소스 코드 또는 ABI와 일치합니다.

ERC-7730 파일이 ERC-20 컨트랙트를 설명하는 경우 토큰 객체도 추가해야 합니다. 

## 4단계: 디스플레이 형식 섹션 작성하기 {#step-4-write-the-displayformats-section}

`display.formats` 객체는 함수 서명을 사람이 읽을 수 있는 서명 지침에 매핑합니다. 이것이 지갑이 사용자가 트랜잭션을 승인하기 전에 함수를 보여주는 방식입니다!

각 키는 사람이 읽을 수 있는 ABI 조각입니다. 즉, 매개변수 이름과 매개변수 유형을 ABI에 나타난 그대로 포함하는 함수 서명입니다.


### 예시: 토큰 스왑 설명하기 {#eg-describing-token-swap}

이 예시는 Uniswap V2 `Router02` 컨트랙트의 `swapExactTokensForTokens`를 설명합니다. 입력 토큰은 `path`의 첫 번째 요소이고, 출력 토큰은 마지막 요소입니다(멀티 홉 스왑의 경우 `path`에 두 개 이상의 요소가 있을 수 있습니다).

```json
"display": {
  "formats": {
    "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
      "intent": "Swap",
      "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
      "fields": [
        {
          "path": "#.amountIn",
          "label": "Send",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path.[-1]"
          }
        },
        {
          "path": "#.to",
          "label": "Recipient",
          "format": "addressName",
          "params": {
            "types": ["eoa", "contract"],
            "sources": ["local", "ens"]
          }
        },
        {
          "path": "#.deadline",
          "label": "Expires",
          "format": "date",
          "params": {
            "encoding": "timestamp"
          }
        }
      ]
    }
  }
}
```

### 디스플레이 필드 {#display-fields}

- **`intent`** — **(필수)** "Swap"과 같이 짧고 사용자 친화적인 작업 설명입니다.
- **`interpolatedIntent`** — **(권장)** `"Swap {amountIn} for at least {amountOutMin}"`와 같이 형식이 지정된 필드 값을 포함하는 더 풍부한 문장 템플릿입니다. 디스플레이 제약 조건이 있는 경우 지갑이 선택하여 표시할 수 있는 훨씬 더 사용자 친화적인 설명자를 제공하기 위해 `intent`와 함께 이를 포함하세요.
- **`fields`** — **(필수)** 지갑이 사용자에게 표시해야 하는 트랜잭션 필드의 정렬된 목록입니다.
  - **`path`** — **(필수)** 트랜잭션 데이터에 대한 참조입니다. `#.fieldName`는 ABI의 이름으로 디코딩된 콜 데이터 매개변수를 가리킵니다. `@.value`은 트랜잭션과 함께 전송된 ETH 값을 나타냅니다. 배열 요소는 대괄호 앞에 `.`를 사용하여 작성합니다. `#.path.[0]`는 첫 번째 요소이고 `#.path.[-1]`은 마지막 요소입니다. `#.path[0]`(점 없음)은 린터(linter)에 의해 거부됩니다.
  - **`label`** — **(필수)** 값 옆에 표시되는 사람이 읽을 수 있는 레이블입니다.
  - **`format`** — **(권장)** 값이 렌더링되는 방식을 제어합니다. 일반적인 형식은 다음과 같습니다.
    - `tokenAmount`
    - `addressName`
    - `date`

    추가 형식이 필요하지 않은 경우 `raw`을 사용하세요. 일부 형식은 추가적인 **`params`** 구성을 허용합니다. 예를 들면 다음과 같습니다.

    - `tokenAmount`는 `tokenPath`을 사용하여 소수점 및 티커 메타데이터를 제공하는 토큰 주소를 식별할 수 있습니다.
    - `date`은 `encoding`를 사용하여 타임스탬프가 인코딩되는 방식을 설명할 수 있습니다.

    선택한 형식에 추가 정보가 필요하지 않은 경우 `params`을 생략하세요.

## 전체 설명자 {#the-complete-descriptor}

자리 표시자 주소를 배포된 컨트랙트의 주소로 바꿉니다. 린터는 해당 주소에서 검증된 ABI와 설명자를 대조하여 확인하므로, 주소를 바꿀 때까지 오류를 보고합니다.

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "example-swap-router",
    "contract": {
      "deployments": [
        {
          "chainId": 1,
          "address": "0xYourContractAddressOnMainnet"
        },
        {
          "chainId": 137,
          "address": "0xYourContractAddressOnPolygon"
        }
      ]
    }
  },
  "metadata": {
    "owner": "Example Swap Protocol",
    "info": {
      "url": "https://example.xyz"
    },
    "contractName": "SwapRouter"
  },
  "display": {
    "formats": {
      "swapExactTokensForTokens(uint256 amountIn,uint256 amountOutMin,address[] path,address to,uint256 deadline)": {
        "intent": "Swap",
        "interpolatedIntent": "Swap {amountIn} for at least {amountOutMin}",
        "fields": [
          {
            "path": "#.amountIn",
            "label": "Send",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path.[-1]"
            }
          },
          {
            "path": "#.to",
            "label": "Recipient",
            "format": "addressName",
            "params": {
              "types": ["eoa", "contract"],
              "sources": ["local", "ens"]
            }
          },
          {
            "path": "#.deadline",
            "label": "Expires",
            "format": "date",
            "params": {
              "encoding": "timestamp"
            }
          }
        ]
      }
    }
  }
}
```

## 5단계: 레지스트리에 제출하기 {#step-5-submit-to-the-registry}

[ERC-7730 레지스트리](https://github.com/ethereum/clear-signing-erc7730-registry)는 중립적인 관리자로서 [이더리움 재단](/foundation/)이 호스팅하는 개방형 리포지토리입니다. 누구나 자유롭게 복제하고 자체 호스팅할 수 있으며, 지갑은 신뢰할 레지스트리 인스턴스를 독립적으로 결정합니다.

1. GitHub에서 리포지토리를 포크합니다.
2. `registry/<your-project-name>/`에 폴더를 생성합니다.
3. 그 안에 파일을 배치합니다: `registry/myproject/calldata-SwapRouter.json`
4. `$schema` 필드를 리포지토리 내에서 사용되는 상대 경로로 업데이트합니다: `"../../specs/erc7730-v2.schema.json"`. CI는 여기서 URL을 거부합니다.
5. 테스트 파일을 추가합니다(아래 참조).
6. 로컬에서 파일의 유효성을 검사합니다(아래 참조).
7. 풀 리퀘스트(pull request)를 엽니다. 각 풀 리퀘스트는 `registry/` 아래의 폴더 하나만 변경할 수 있습니다.

### 테스트 파일 추가하기 {#add-a-test-file}

추가하거나 변경하는 모든 설명자에는 테스트 파일이 필요하므로, 명확한 서명하기 구현을 이에 대해 확인할 수 있습니다. `display.formats`의 모든 함수에 대해 하나 이상의 테스트 케이스가 포함된 `registry/<your-project-name>/testsv2/calldata-<ContractName>.tests.json`를 생성합니다. CI는 각 형식의 함수 선택자를 도출하며, 이를 호출하는 테스트 트랜잭션이 없으면 실패합니다.

```json
{
  "$schema": "../../../specs/erc7730-tests-v2.schema.json",
  "descriptor": "../calldata-SwapRouter.json",
  "dataProvider": {
    "tokens": {
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { "symbol": "USDC", "decimals": 6, "name": "USD Coin" },
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": { "symbol": "WETH", "decimals": 18, "name": "Wrapped Ether" }
    }
  },
  "tests": [
    {
      "description": "Swap 1,000 USDC for at least 0.42 WETH",
      "rawTx": "0x02f9012f0180843b9aca00...",
      "expected": {
        "intent": "Swap",
        "interpolatedIntent": "Swap 1000 USDC for at least 0.42 WETH",
        "owner": "Example Swap Protocol",
        "fields": [
          { "label": "Send", "value": "1000 USDC" },
          { "label": "Receive minimum", "value": "0.42 WETH" },
          { "label": "Recipient", "value": "0x1234567890123456789012345678901234567890" },
          { "label": "Expires", "value": "2026-01-01 00:00:00Z" }
        ]
      }
    }
  ]
}
```

- `rawTx`는 콜 데이터뿐만 아니라 전체 직렬화된 **서명되지 않은** 트랜잭션(여기서는 축약됨)입니다. 컨트랙트에 대한 실제 트랜잭션이 가장 좋은 테스트 케이스입니다.
- `dataProvider`는 테스트에 네트워크 액세스가 필요하지 않도록 토큰 메타데이터(선택적으로 주소 및 ENS 이름)를 제공합니다.
- `expected`는 지갑이 표시해야 하는 내용입니다. CI는 명확한 서명하기 구현으로 각 테스트 케이스를 렌더링하고 풀 리퀘스트에 차이점을 보고합니다.

EIP-712 설명자를 위한 테스트 파일을 포함한 전체 형식은 레지스트리 README의 [참조 테스트 케이스(Reference test cases)](https://github.com/ethereum/clear-signing-erc7730-registry#reference-test-cases)를 참조하세요.

### 로컬에서 유효성 검사하기 {#validate-locally}

레지스트리는 `.github/requirements.txt`에 고정된 [`erc7730`](https://github.com/sourcifyeth/python-erc7730) 명령줄 도구를 사용하여 설명자를 확인합니다. Python 3.12 환경에서 포크의 루트 디렉터리에서 실행하세요.

```sh
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r .github/requirements.txt
erc7730 lint registry/myproject/calldata-SwapRouter.json
```

[uv](https://docs.astral.sh/uv/)를 사용하는 경우 가상 환경을 건너뛸 수 있으며, 필요한 경우 uv가 Python 3.12를 다운로드합니다.

```sh
uvx --python 3.12 --from "$(cat .github/requirements.txt)" erc7730 lint registry/myproject/calldata-SwapRouter.json
```

린터는 스키마 및 컨트랙트의 검증된 ABI와 설명자를 대조하여 확인합니다. 모든 오류를 수정하세요. `Missing display format`와 같은 경고는 설명자가 아직 설명하지 않은 함수가 컨트랙트에 있음을 의미합니다. CI가 수행하는 방식대로 `$schema` 경로와 테스트 파일도 확인하려면 레지스트리 README의 [유효성 검사 방법(How to validate)](https://github.com/ethereum/clear-signing-erc7730-registry#how-to-validate)을 참조하세요.

PR을 열면 CI가 자동으로 스키마 유효성 검사를 실행하고, 함수 서명이 유효한 선택자를 생성하는지 확인하며, 컨트랙트 주소가 Sourcify에서 검증되었는지 확인하고, ABI 불일치를 표시합니다. 확인 결과는 PR에 인라인으로 표시됩니다. 레지스트리 유지 관리자는 형식이 잘못되었거나 잠재적으로 악의적인 설명자가 있는지 제출물을 심사합니다. 레지스트리에 포함되었다고 해서 감사나 보증을 의미하는 것은 아닙니다.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**참고:** PR이 수락되려면 먼저 <a href="https://repo.sourcify.dev">Sourcify</a>에서 컨트랙트가 검증되어야 합니다. 아직 검증되지 않은 경우 먼저 <a href="https://verify.sourcify.dev/">검증을 제출</a>하세요.
</AlertDescription>
</AlertContent>
</Alert>

## 병합 후에는 어떻게 되나요? {#what-happens-after-merging}

레지스트리의 모든 설명자는 감사자에게 공개됩니다. PR이 병합된 후, 모든 감사자는 설명자를 검토하고 정확성을 확인하는 암호화 증명([ERC-8176](https://eips.ethereum.org/EIPS/eip-8176)에 따름)을 게시할 수 있습니다. 

이러한 증명 신호를 통해 지갑은 자체 신뢰 정책을 적용할 수 있습니다. 여러 개의 독립적인 증명이 있는 설명자는 증명이 없는 설명자보다 더 큰 비중을 차지합니다. [clearsigning.org](https://clearsigning.org)를 통해 감사자 커뮤니티에 연락할 수 있습니다.

지갑은 지원할 레지스트리를 선택합니다. 설명자가 레지스트리에 등록되면, ERC-7730을 지원하는 지갑은 해당 레지스트리에 설명자가 있는 경우 이를 가져오기 시작하며, 사용자가 컨트랙트와 상호작용할 때 사람이 읽을 수 있는 데이터를 표시합니다.

## 더 읽어보기 {#further-reading}

- [ERC-7730 사양](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730 레지스트리](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — 도구, 생태계 상태 및 거버넌스  
- [Sourcify 컨트랙트 검증](https://sourcify.dev)  
- [조 달러 규모의 보안 이니셔티브(Trillion Dollar Security initiative)](https://trilliondollarsecurity.org)

