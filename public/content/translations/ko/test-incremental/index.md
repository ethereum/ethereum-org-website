---
title: "스마트 컨트랙트 구축 및 배포"
description: "이더리움 네트워크에서 스마트 컨트랙트를 작성, 테스트 및 배포하기 위한 실용적인 가이드입니다."
image: /images/developers/smart-contracts-hero.png
alt: "스마트 컨트랙트 배포 다이어그램"
lang: ko
emoji: ":computer:"
summaryPoints:
  - 개발 환경을 설정하는 방법 알아보기
  - 첫 번째 스마트 컨트랙트 작성 및 테스트하기
  - 테스트넷에 배포하고 온체인에서 검증하기
---

스마트 컨트랙트는 이더리움 블록체인에 저장된 자동 실행 프로그램입니다. 한 번 배포되면 프로그래밍된 대로 정확히 실행되며 변경할 수 없습니다. 이 가이드는 첫 번째 컨트랙트 작성부터 라이브 네트워크에 배포하는 것까지의 전체 수명 주기를 안내합니다.

## 개발 환경 {#development-environment}

코드를 작성하기 전에 로컬 개발 환경을 설정해야 합니다. 프레임워크로 [Hardhat](https://hardhat.org/) 또는 [Foundry](https://book.getfoundry.sh/)를 설치하고, 테스트를 위해 [Sepolia](https://sepolia.ethpandaops.io/)에 연결하며, 배포를 검증하기 위해 [Blockscout](https://eth.blockscout.com/)를 사용하세요.

`solc` 컴파일러는 Solidity 소스 코드를 EVM이 실행할 수 있는 바이트코드로 변환합니다. 컴파일러 버전이 컨트랙트의 `pragma` 구문과 일치하는지 확인하세요.

<a href="https://eth.blockscout.com/address/0x5678" target="_blank">Blockscout</a>에서 배포된 컨트랙트를 확인하여 바이트코드와 검증된 소스 코드를 검사할 수 있습니다.

![Contract deployment flow](/images/developers/deploy-flow-v2.png)

## 컨트랙트 작성하기 {#writing-your-contract}

### 기본 구조 {#basic-structure}

모든 Solidity 컨트랙트는 버전 pragma와 컨트랙트 선언으로 시작합니다. 다음은 최소한의 예시입니다:

```solidity
// SPDX-License-Identifier: MIT
// 시연을 위한 간단한 스토리지 컨트랙트
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private storedValue;

    function set(uint256 value) public {
        storedValue = value;
    }

    function get() public view returns (uint256) {
        return storedValue;
    }
}
```

### "가스"란 무엇이며 왜 중요한가요? {#what-is-gas}

EVM의 모든 작업에는 [가스](/developers/docs/gas/)가 소모됩니다. 표준 ERC-20 전송은 약 21,000 가스 단위를 사용하는 반면, 복잡한 탈중앙화 금융 (DeFi) 상호작용은 300,000 이상을 소비할 수 있습니다. 총 트랜잭션 수수료는 (base_fee + priority_fee) * gas_used로 계산되며, Wei로 지불됩니다. 예를 들어, 기본 수수료가 30 Gwei이고 팁이 2 Gwei일 때 21,000 가스를 사용하는 전송 비용은 (30 + 2) * 21,000 = 672,000 Gwei입니다. 로직이 복잡할수록 사용자가 지불해야 하는 수수료가 높아집니다.

<ExpandableCard title="How are gas fees calculated?" eventCategory="/test-incremental" eventName="clicked gas fees">

가스 수수료는 `base_fee + priority_fee`에 소비된 가스 단위를 곱하여 계산됩니다. 기본 수수료는 네트워크 혼잡도에 따라 동적으로 조정되는 반면, 우선순위 수수료(팁)는 검증자가 트랜잭션을 포함하도록 장려합니다. [Blocknative Gas Estimator](https://www.blocknative.com/gas-estimator)와 같은 도구를 사용하여 비용을 추정할 수 있습니다.

</ExpandableCard>

## 테스트 및 자동화 {#testing}

### 단위 테스트 {#unit-testing}

모든 public 함수에 대해 단위 테스트를 작성하세요. 자동화된 테스트는 배포 전에 버그를 잡아내고 메인넷에서 실패한 트랜잭션으로 인한 가스 비용을 절약해 줍니다.

다음은 테스트 보고를 자동화하는 Python 헬퍼 스크립트입니다:

```python
# 컨트랙트에 대한 테스트 커버리지 보고서를 생성합니다 {#best-practices}
import subprocess

def run_coverage(project_path):
    """테스트 커버리지를 실행하고 결과를 반환합니다."""
    result = subprocess.run(
        ["npx", "hardhat", "coverage"],
        cwd=project_path,
        capture_output=True
    )
    return result.stdout.decode()
```

### 모범 사례 {#deployment}

컨트랙트를 테스트할 때 다음 가이드라인을 염두에 두세요:

1. **모든 public 함수 테스트하기** -- 엣지 케이스와 실패 모드를 포함합니다.
2. 복잡한 수학 연산에 **퍼징(fuzzing) 사용하기**.
3. [Smock](https://github.com/defi-wonderland/smock)과 같은 도구를 사용하여 **외부 종속성 모킹(mocking)하기**.

> "코드가 법이다(Code is law)"라는 말은 코드가 철저하게 테스트되었을 때만 유효합니다. 테스트되지 않은 컨트랙트는 자산이 아니라 부채입니다.

다음 참고 사항은 프로젝트 README 파일에 일반적으로 포함됩니다:

```markdown
테스트를 실행하기 전에 **로컬 노드**가 실행 중이고
[환경 변수](/developers/docs/frameworks/)가 올바르게 구성되어 있는지 확인하세요.
```

## 배포 {#networks-and-tools}

### 네트워크 및 도구 {#deployment-checklist}

[Holesky](https://holesky.dev/) 또는 [Sepolia](https://sepolia.ethpandaops.io/)에서 [Remix](https://remix.ethereum.org/)를 사용하여 컨트랙트를 배포하고, [Blockscout](https://eth.blockscout.com/)에서 소스 코드를 검증할 수 있습니다. 프로덕션 배포의 경우, 프로세스를 자동화하기 위해 **Hardhat Ignition** 또는 **Foundry 스크립트** 사용을 고려해 보세요.

<ButtonLink variant="outline-color" href="/developers/docs/frameworks/">프레임워크 탐색하기</ButtonLink>

<YouTube id="abc123xyz" />

<Divider />

<InfoBanner emoji=":warning:" title="Security reminder">

메인넷에 배포하기 전에 항상 컨트랙트를 감사(audit)하세요. [오픈제플린 Defender](https://www.openzeppelin.com/defender)와 같은 도구를 사용하고, [Trail of Bits](https://www.trailofbits.com/) 또는 [오픈제플린](https://www.openzeppelin.com/security-audits)과 같은 전문 업체의 감사를 고려해 보세요.

</InfoBanner>

### 배포 체크리스트 {#community-resources}

| 단계 | 도구 | 상태 |
| --- | --- | --- |
| 컴파일 | `solc` 또는 [Hardhat](https://hardhat.org/docs) | 필수 |
| 테스트 | [Foundry](https://book.getfoundry.sh/forge/tests) | 필수 |
| 배포 | [Remix](https://remix.ethereum.org/) | 선택 |
| 검증 | [Blockscout](https://eth.blockscout.com/) | 권장 |

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>첫 번째 컨트랙트를 배포할 준비가 되셨나요?</div>
  <ButtonLink href="/developers/tutorials/hello-world-smart-contract/">
    단계별 튜토리얼 따라하기
  </ButtonLink>
</AlertContent>
</Alert>

## 커뮤니티 리소스 {#further-reading}

더 깊은 이해를 원하신다면 [이더리움 백서](/whitepaper/)를 탐색하고, [Solidity 문서](https://docs.soliditylang.org/)를 검토하며, [오픈제플린](https://www.openzeppelin.com/contracts)에서 실제 컨트랙트를 연구해 보세요.

<CategoryAppsGrid category="developer-tools" />

## 더 읽을거리

프로토콜 수준의 변경을 제안하기 전에 [백서](/whitepaper/)를 읽고, [황서](https://ethereum.github.io/yellowpaper/paper.pdf)를 연구하며, [EIPs](https://eips.ethereum.org/)를 검토해야 합니다. 비용에 대한 자세한 내용은 위의 [가스 설명](#what-is-gas)을 참조하세요.

- ConsenSys의 [스마트 컨트랙트 보안 모범 사례](https://consensys.github.io/smart-contract-best-practices/)
- [이더리움 개발 문서](/developers/docs/)
- [EVM의 이해](/developers/docs/evm/) -- 컨트랙트가 온체인에서 실행되는 방식