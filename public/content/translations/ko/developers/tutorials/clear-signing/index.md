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

대부분의 주요 이더리움 익스플로잇(exploit)은 동일한 마지막 단계를 거쳤습니다. 바로 사용자가 의미를 제대로 이해하지 못한 채 트랜잭션을 승인하는 것입니다. 하드웨어 지갑은 원시 16진수 콜 데이터를 보여주며, 더 나아가 블라인드 서명하기(blind signing)를 강제하기도 합니다. 소프트웨어 지갑은 디코딩된 필드를 보여주지만, 컨트랙트를 인식할 때만 가능합니다. 프로토콜이 새롭거나, 앱이 손상되었거나, 기기가 오프라인 상태여서 컨트랙트를 인식하지 못할 때 사용자는 블라인드 서명을 하게 됩니다.

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)은 컨트랙트의 함수 호출이 *무엇을 의미하는지* 설명하기 위한 표준 JSON 형식을 정의합니다. 

ERC-7730을 지원하는 지갑은 설명자를 읽고 다음과 같이 표시합니다.

> **스왑**  
> 보내기: 1,000 USDC  
> 최소 받기: 0.42 WETH  
> 프로토콜: 유니스왑 V3

또는 사람과 에이전트 모두 읽을 수 있도록 구성된 단일 문장으로 표시합니다.

> 최소 0.42 WETH를 위해 1,000 USDC 스왑

함수 선택자(function selector)와 원시 정수 값 목록 대신 말입니다.

이것이 바로 [명확한 서명하기](https://clearsigning.org/)입니다. 즉, "보는 대로 서명한다(What You See Is What You Sign)"는 의미입니다. 이 튜토리얼에서는 자체 컨트랙트를 위한 설명자를 작성하고, 공식 CLI 도구로 유효성을 검사하며, 개방형 레지스트리에 제출하는 과정을 안내합니다.

## 전제 조건 {#prerequisites}

- Solidity 및 스마트 컨트랙트 ABI에 대한 친숙함
- 검증된 ABI가 있는 배포된 스마트 컨트랙트(설명자가 레지스트리에 수락되려면 먼저 [Sourcify](https://sourcify.dev) 검증이 필요합니다) 
- 유효성 검사 CLI를 위한 Python 3.12 이상 
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

`calldata-<contractname>-<descriptorversion>.json`라는 이름의 파일을 만듭니다. `calldata-` 접두사는 이 설명자가 타입드 데이터(typed-data) 메시지를 위한 `eip712-`와 달리 컨트랙트 함수 호출을 다룬다는 것을 레지스트리에 알려줍니다. `descriptorversion`는 레지스트리에 설명자 파일의 버전을 알려주며, 버전을 제공하지 않으면 기본값은 0입니다.


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

`context` 섹션은 설명자를 하나 이상의 컨트랙트 배포에 바인딩합니다. 지갑은 이를 사용하여 들어오는 트랜잭션을 올바른 설명자와 일치시킵니다.

```json
"context": {
  "$id": "uniswap-v3-router-mainnet",
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
- `deployments[].address` — 지갑이 이 설명자와 연결해야 하는 컨트랙트 주소입니다. 실행 로직을 보유한 구현 주소를 사용하세요.

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
            "tokenPath": "#.path[0]"
          }
        },
        {
          "path": "#.amountOutMin",
          "label": "Receive minimum",
          "format": "tokenAmount",
          "params": {
            "tokenPath": "#.path[1]"
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

- **`intent`** — **(필수)** "스왑"과 같이 짧고 사용자 친화적인 작업 설명입니다.
- **`interpolatedIntent`** — **(권장)** `"Swap {amountIn} for at least {amountOutMin}"`와 같이 형식이 지정된 필드 값을 포함하는 더 풍부한 문장 템플릿입니다. 디스플레이 제약 조건이 주어졌을 때 지갑이 선택하여 표시할 수 있는 훨씬 더 사용자 친화적인 설명자를 제공하려면 `intent`와 함께 이를 포함하세요.
- **`fields`** — **(필수)** 지갑이 사용자에게 표시해야 하는 트랜잭션 필드의 정렬된 목록입니다.
  - **`path`** — **(필수)** 트랜잭션 데이터에 대한 참조입니다. `#.fieldName`는 ABI의 이름으로 디코딩된 콜 데이터 매개변수를 가리킵니다. `@.value`는 트랜잭션과 함께 전송된 ETH 값을 나타냅니다.
  - **`label`** — **(필수)** 값 옆에 표시되는 사람이 읽을 수 있는 레이블입니다.
  - **`format`** — **(권장)** 값이 렌더링되는 방식을 제어합니다. 일반적인 형식은 다음과 같습니다.
    - `tokenAmount`
    - `addressName`
    - `date`

    추가 서식이 필요하지 않은 경우 `raw`를 사용하세요. 일부 형식은 추가적인 **`params`** 구성을 허용합니다. 예를 들면 다음과 같습니다.

    - `tokenAmount`는 `tokenPath`를 사용하여 어떤 토큰 주소가 소수점 및 티커 메타데이터를 제공하는지 식별할 수 있습니다.
    - `date`는 `encoding`를 사용하여 타임스탬프가 인코딩되는 방식을 설명할 수 있습니다.

    선택한 형식에 추가 정보가 필요하지 않은 경우 `params`를 생략하세요.

## 전체 설명자 {#the-complete-descriptor}

```json
{
  "$schema": "https://eips.ethereum.org/assets/eip-7730/erc7730-v2.schema.json",
  "context": {
    "$id": "uniswap-v3-router-mainnet",
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
              "tokenPath": "#.path[0]"
            }
          },
          {
            "path": "#.amountOutMin",
            "label": "Receive minimum",
            "format": "tokenAmount",
            "params": {
              "tokenPath": "#.path[1]"
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

1. GitHub에서 리포지토리를 포크(fork)합니다.  
2. `registry/<your-project-name>/`에 폴더를 만듭니다.  
3. 그 안에 파일을 배치합니다: `registry/myproject/calldata-mycontract-0_0.json`  
4. `$schema` 필드를 리포지토리 내에서 사용되는 상대 경로로 업데이트합니다: `"../../specs/erc7730-v2.schema.json"`  
5. 풀 리퀘스트(pull request)를 엽니다.

PR을 열면 CI가 자동으로 스키마 유효성 검사를 실행하고, 함수 서명이 유효한 선택자를 생성하는지 확인하며, 컨트랙트 주소가 Sourcify에서 검증되었는지 확인하고, ABI 불일치를 표시합니다. 검사 결과는 PR에 인라인으로 나타납니다. 레지스트 유지 관리자는 형식이 잘못되었거나 잠재적으로 악의적인 설명자가 있는지 제출물을 심사합니다. 레지스트리에 포함되었다고 해서 감사나 보증을 의미하는 것은 아닙니다.

<Alert variant="info">
<AlertContent>
<AlertDescription>
**참고:** PR이 수락되려면 먼저 <a href="https://repo.sourcify.dev">Sourcify</a>에서 컨트랙트가 검증되어야 합니다. 아직 검증되지 않은 경우 먼저 <a href="https://verify.sourcify.dev/">검증을 제출</a>하세요.
</AlertDescription>
</AlertContent>
</Alert>

## 병합 후에는 어떻게 되나요? {#what-happens-after-merging}

레지스트리의 모든 설명자는 감사자에게 공개됩니다. PR이 병합된 후, 모든 감사자는 설명자를 검토하고 정확성을 확인하는 암호화 증명([ERC-8176](https://github.com/ethereum/ERCs/pull/1576)에 따름)을 게시할 수 있습니다. 

이러한 증명 신호를 통해 지갑은 자체 신뢰 정책을 적용할 수 있습니다. 여러 개의 독립적인 증명이 있는 설명자는 증명이 없는 설명자보다 더 큰 비중을 차지합니다. [clearsigning.org](https://clearsigning.org)를 통해 감사자 커뮤니티에 연락할 수 있습니다.

지갑은 지원할 레지스트리를 선택합니다. 설명자가 레지스트리에 등록되면, ERC-7730을 지원하는 지갑은 해당 레지스트리에 설명자가 있는 경우 이를 가져오기 시작하며, 사용자가 컨트랙트와 상호작용할 때 사람이 읽을 수 있는 데이터를 표시합니다.

## 더 읽어보기 {#further-reading}

- [ERC-7730 사양](https://eips.ethereum.org/EIPS/eip-7730)  
- [ERC-7730 레지스트리](https://github.com/ethereum/clear-signing-erc7730-registry)  
- [clearsigning.org](https://clearsigning.org) — 도구, 생태계 상태 및 거버넌스  
- [Sourcify 컨트랙트 검증](https://sourcify.dev)  
- [조 달러 규모의 보안 이니셔티브(Trillion Dollar Security initiative)](https://trilliondollarsecurity.org)