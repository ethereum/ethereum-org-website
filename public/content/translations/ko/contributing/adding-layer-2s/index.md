---
title: "Layer 2(오프체인) 추가"
description: "ethereum.org 에 Layer 2를 추가할 시에 적용되는 정책"
lang: ko
---

# 레이어 2 추가하기 {#adding-layer-2}

유저가 안전하고 신뢰할 수 있는 방식으로 Layer 2의 공간을 탐색할 수 있도록 가능한 최상의 리소스들을 제공할 것입니다.

누구나 자유롭게 Layer 2 를 ethereum.org 에 추가하기 위해 건의할 수 있습니다. 저희가 놓친 레이어 2가 있다면 **[제안해 주세요](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)!**

현재 L2는 다음 페이지에 기재되어 있습니다:

- [낙관적 롤업](/developers/docs/scaling/optimistic-rollups/)
- [영지식 롤업](/developers/docs/scaling/zk-rollups/)
- [레이어 2](/layer-2/)

Layer 2는 이더리움보다 새롭고 흥미로운 패러다임입니다. ethereum.org 에서 고려하기 위한 공정한 프레임워크를 만들려고 노력하겠지만, 목록의 기준은 시간이 지남에 따라 변경되고 발전할 것입니다.

## 결정 프레임워크 {#decision-framework}

### 포함 기준: 필수 사항 {#criteria-for-inclusion-the-must-haves}

**L2BEAT 등재**

- 등록 대상 프로젝트로 고려되려면 [L2BEAT](https://l2beat.com)에 등재되어야 합니다. L2BEAT는 L2 프로젝트를 평가하는 데 필요한 강력한 위험성 평가를 제공합니다. **프로젝트가 L2BEAT에 포함되지 않을 경우, ethereum.org 에 L2로 표시되지 않습니다.**
- [L2BEAT에 L2 프로젝트를 추가하는 방법 알아보기](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md).

**오픈 소스**

- 귀하의 코드에 엑세스할 수 있어야 하며, 더 큰 커뮤니티로부터 PR을 수락해야 합니다.

**Layer 2 카테고리**

다음 사항들은 Layer 2에 대한 솔루션입니다.

- Optimistic Rollup
- Zero-Knowledge Rollup, ZK-Rollup

_데이터 가용성 또는 보안을 위해 이더리움을 사용하지 않는 다른 확장 솔루션은 레이어 2로 간주하지 않습니다._

**데이터 가용성을 위한 이더리움**

- 데이터 가용성은 다른 확장 솔루션과 Layer 2의 중요한 차별화 요소입니다. 프로젝트가 등록 대상으로 고려되려면 데이터 가용성을 위해 이더리움 메인넷을 **반드시** 사용해야 합니다.

**브리지**

- 어떻게 Layer 2에 온보드할 수 있는가?

**프로젝트 실행 날짜**

- 메인넷에서 6개월 이상 "live"상태인 Layer 2

- battle-tested를 거치지 않은 새로운 프로젝트는 리스트에 올라갈 가능성이 적습니다.

**외부 보안 감사**

- 감사, 내부 보안 팀 또는 다른 방법을 통해 저작물의 보안을 안정적으로 검사해야 합니다. 이는 사용자에 대한 위험을 줄이고 귀하가 보안을 중요하게 생각한다는 것을 보여줍니다.

**지속적인 사용자 기반**

- 이더리움에서는 TVL history, 거래 통계, 인지도 있는 회사나 프로젝트에서의 사용 여부 등의 지표를 바탕으로 심사를 진행합니다.

**적극적인 개발팀**

- 프로젝트를 적극적으로 진행 중인 팀이 없는 Layer 2는 등재되지 않습니다.

**블록 탐색기**

- 등재된 프로젝트에는 사용자가 체인을 쉽게 탐색할 수 있도록 작동하는 블록 탐색기가 필요합니다.

### 기타 기준: 필수 사항은 아니지만 있으면 좋은 것들 {#nice-to-haves}

**프로젝트에 대한 거래소 지원**

- 사용자가 거래소에서 직접 입금 및/또는 인출을 할 수 있는가?

**Layer 2 에코시스템의 Dapp 링크**

- 우리는 사용자가 이 layer 2에서 무엇을 할 수 있을 것으로 기대할 수 있는지에 대한 정보를 제공할 수 있기를 원합니다. (e.g., https://portal.arbitrum.io/, https://www.optimism.io/apps)

**토큰 계약 목록**

- 자산은 layer 2에서 새로운 주소를 갖게 되므로 사용할 수 있는 토큰 목록 리소스가 있으면 공유해 주십시오.

**네이티브 지갑의 지원**

- L2를 기본적으로 지원하는 지갑이 있습니까?

## 레이어 2 추가하기 {#add-exchange}

Ethereum.org 에 layer 2를 추가하려면 GitHub에서 이슈를 생성하십시오.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
이슈 만들기
</ButtonLink>
