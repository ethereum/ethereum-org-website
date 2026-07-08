---
title: 레이어 2 추가하기
description: ethereum.org에 레이어 2를 추가할 때 사용하는 정책
lang: ko
---

사용자가 안전하고 자신 있게 레이어 2 공간을 탐색할 수 있도록 가능한 최고의 리소스를 나열하고자 합니다.

누구나 자유롭게 ethereum.org에 레이어 2 추가를 제안할 수 있습니다. 저희가 놓친 레이어 2가 있다면 **[제안해 주세요](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)!**

현재 다음 페이지에 l2를 나열하고 있습니다:

- [옵티미스틱 롤업](/developers/docs/scaling/optimistic-rollups/)
- [영지식 롤업](/developers/docs/scaling/zk-rollups/)
- [레이어 2](/layer-2/)

레이어 2는 이더리움의 비교적 새롭고 흥미로운 패러다임입니다. ethereum.org에서 검토를 위한 공정한 프레임워크를 만들기 위해 노력했지만, 등재 기준은 시간이 지남에 따라 변경되고 발전할 것입니다.

## 결정 프레임워크 {#decision-framework}

### 포함 기준: 필수 요건 {#criteria-for-inclusion-the-must-haves}

**L2BEAT 등재**

- 검토 대상이 되려면 해당 프로젝트가 [L2BEAT](https://l2beat.com)에 등재되어 있어야 합니다. L2BEAT는 l2 프로젝트를 평가할 때 의존하는 레이어 2 프로젝트에 대한 강력한 위험 평가를 제공합니다. **프로젝트가 L2BEAT에 소개되지 않은 경우, ethereum.org에 l2로 나열하지 않습니다.**
- [L2BEAT에 l2 프로젝트를 추가하는 방법 알아보기](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md).

**오픈 소스**

- 코드는 접근 가능해야 하며 더 넓은 커뮤니티의 PR을 수락해야 합니다.

**레이어 2 카테고리**

현재 다음을 레이어 2 솔루션으로 간주합니다:

- 옵티미스틱 롤업
- 영지식 롤업

_데이터 가용성이나 보안을 위해 이더리움을 사용하지 않는 다른 확장 솔루션은 레이어 2로 간주하지 않습니다._

**데이터 가용성을 위한 이더리움**

- 데이터 가용성은 다른 확장 솔루션과 레이어 2를 구분하는 중요한 요소입니다. 등재를 고려하려면 프로젝트가 데이터 가용성을 위해 이더리움 메인넷을 **반드시** 사용해야 합니다.

**브릿지**

- 사용자가 어떻게 레이어 2에 온보딩할 수 있나요?

**프로젝트 라이브 날짜**

- 메인넷에서 6개월 이상 "라이브" 상태인 레이어 2

- 사용자에 의해 실전 테스트를 거치지 않은 새로운 프로젝트는 등재될 가능성이 낮습니다.

**외부 보안 감사**

- 감사, 내부 보안 팀 또는 기타 방법을 통해 제품의 보안을 신뢰할 수 있게 테스트해야 합니다. 이는 사용자에게 미치는 위험을 줄이고 보안을 중요하게 생각한다는 것을 보여줍니다.

**지속적인 사용자 기반**

- 총 예치 가치 (TVL) 기록, 트랜잭션 통계, 알려진 회사나 프로젝트에서 사용하는지 여부 등의 지표를 고려합니다.

**활발한 개발 팀**

- 프로젝트에 참여하는 활발한 팀이 없는 레이어 2는 나열하지 않습니다.

**블록 탐색기**

- 등재된 프로젝트는 사용자가 체인을 쉽게 탐색할 수 있도록 작동하는 블록 탐색기가 필요합니다.

### 기타 기준: 권장 요건 {#nice-to-haves}

**프로젝트에 대한 거래소 지원**

- 사용자가 거래소에서 직접 입금 및/또는 출금할 수 있나요?

**레이어 2 생태계의 탈중앙화 애플리케이션 (dapp) 링크**

- 사용자가 이 레이어 2에서 무엇을 할 수 있을지 기대할 수 있는 정보를 제공하고자 합니다. (예: https://portal.arbitrum.io/, https://www.optimism.io/apps)

**토큰 컨트랙트 목록**

- 자산은 레이어 2에서 새로운 주소를 갖게 되므로, 사용 가능한 토큰 목록 리소스가 있다면 공유해 주세요.

**네이티브 지갑 지원**

- l2를 네이티브로 지원하는 지갑이 있나요?

## 레이어 2 추가하기 {#add-exchange}

ethereum.org에 레이어 2를 추가하려면 GitHub에서 이슈를 생성하세요.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
  이슈 생성하기
</ButtonLink>