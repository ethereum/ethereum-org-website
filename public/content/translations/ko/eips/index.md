---
title: 이더리움 개선 제안 (EIP:Ethereum Improvement Proposals)
description: EIP를 이해하는 데 필요한 기본 정보
lang: ko
---

# 이더리움 개선 제안(EIP) 소개 {#introduction-to-ethereum-improvement-proposals}

## EIP란 무엇인가요? {#what-are-eips}

[이더리움 개선 제안(EIP)](https://eips.ethereum.org/)은 이더리움의 잠재적인 새로운 기능 또는 프로세스를 명시하는 표준입니다. EIP는 제안하는 변경의 기술 사양을 포함하며 커뮤니티의 "진실의 출처"로 동작합니다. 이더리움의 네트워크 업그레이드와 애플리케이션 표준이 EIP 프로세스를 통해 토의되고 개발됩니다.

이더리움 커뮤니티 내의 누구라도 EIP를 만들 수 있습니다. EIP 작성 가이드라인은 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)에 포함되어 있습니다. EIP는 기본적으로 약간의 동기와 함께 간결한 기술 사양을 제공해야 합니다. EIP 작성자는 커뮤니티에서 합의에 도달하고 반대 의견을 문서화할 책임이 있습니다. 잘 구성된 EIP 제출에는 높은 기술적 장벽이 존재함에 따라, 예전부터 대부분의 EIP 작성자는 보통 애플리케이션 또는 프로토콜 개발자였습니다.

## EIP가 왜 중요한가요? {#why-do-eips-matter}

EIP는 변경 사항이 발생하고 이더리움에 문서화되는 방식에서 중심적인 역할을 합니다. 이는 사람들이 변경 사항을 제안, 토론 및 채택하는 방법입니다. 합의에 영향을 미치고 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)와 같은 네트워크 업그레이드가 필요한 하위 수준 프로토콜 변경을 위한 핵심 EIP와, [EIP-20](https://eips.ethereum.org/EIPS/eip-20) 및 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)과 같은 애플리케이션 표준을 위한 ERC를 포함하여 [다양한 유형의 EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)가 있습니다.

모든 네트워크 업그레이드는 네트워크의 각 [이더리움 클라이언트](/learn/#clients-and-nodes)가 구현해야 하는 EIP 세트로 구성됩니다. 이는 이더리움 메인넷에서 다른 클라이언트와 합의를 유지하기 위해 클라이언트 개발자가 필요한 EIP를 모두 구현했는지 확인해야 함을 의미합니다.

변경 사항에 대한 기술 사양을 제공하는 것과 함께 EIP는 이더리움에서 거버넌스가 발생하는 단위입니다. 누구나 자유롭게 제안할 수 있으며 커뮤니티의 다양한 이해 관계자들이 표준으로 채택해야 하는지나 네트워크 업그레이드 내에 포함되어야 하는지에 대해 토론합니다. 비코어 EIP는 모든 애플리케이션에서 채택할 필요가 없지만(예를 들면, ERC-20을 구현하지 않은 대체 가능 토큰 생성 가능), 코어 EIP는 널리 채택되어야 하기 때문에(모든 노드는 동일한 네트워크의 일부로 유지되도록 업그레이드해야 함) 코어 EIP는 비코어 EIP보다 커뮤니티 내에서 더 넓은 합의가 필요합니다.

## EIP의 역사 {#history-of-eips}

[이더리움 개선 제안(EIP) GitHub 저장소](https://github.com/ethereum/EIPs)는 2015년 10월에 생성되었습니다. EIP 프로세스는 [비트코인 개선 제안(BIP)](https://github.com/bitcoin/bips) 프로세스에 기반하며, 이 프로세스 자체는 [파이썬 개선 제안(PEP)](https://www.python.org/dev/peps/) 프로세스에 기반합니다.

EIP 편집자는 EIP의 기술적 건전성을 검토하고, 문제를 서식화하고, 철자, 문법 및 코드 스타일을 교정하는 절차를 담당합니다. Martin Becze, Vitalik Buterin, Gavin Wood 및 몇몇 다른 사람들은 2015년부터 2016년 말까지 최초의 EIP 편집자였습니다

현재 EIP 편집자들은 다음과 같습니다.

- 알렉스 베레그사지 (@axic)
- 개빈 존(@Pandapip1)
- 그렉 콜빈 (@gcolvin)
- 매트 가넷 (@lightclient)
- 샘 윌슨 (@SamWilsn)

은퇴한 EIP 편집자들은 다음과 같습니다.

- 케이시 디트리오 (@cdetrio)
- 허드슨 제임슨 (@Souptacular)
- 마틴 베체 (@wanderer)
- 미카 졸트 (@MicahZoltu)
- 닉 존슨 (@arachnid)
- 닉 세이버스 (@nicksavers)
- 비탈릭 부테린 (@vbuterin)

EIP 편집자가 되고 싶다면 [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)를 확인하세요.

EIP 편집자는 제안이 EIP가 될 시기를 정하며, EIP 작성자가 제안을 진행하도록 도와줍니다. [Ethereum Cat Herders](https://www.ethereumcatherders.com/)는 EIP 편집자와 커뮤니티 간의 회의를 조직하는 데 도움을 줍니다([EIPIP](https://github.com/ethereum-cat-herders/EIPIP) 참조).

차트와 함께 전체 표준화 프로세스는 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)에 설명되어 있습니다.

## 더 알아보기 {#learn-more}

EIP에 대해 더 자세히 알고 싶다면 [EIP 웹사이트](https://eips.ethereum.org/)와 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)을 확인하세요. 몇 가지 유용한 링크입니다.

- [모든 이더리움 개선 제안 목록](https://eips.ethereum.org/all)
- [모든 EIP 유형에 대한 설명](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [모든 EIP 상태에 대한 설명](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### 커뮤니티 교육 프로젝트 {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP는 이더리움 개선 제안(EIP)과 향후 업그레이드의 주요 기능을 다루는 교육용 동영상 시리즈입니다._
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf는 상태, 구현 세부 정보, 관련 풀 리퀘스트, 커뮤니티 피드백을 포함하여 이더리움 개선 제안(EIP)에 대한 추가 정보를 제공합니다._
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun은 이더리움 개선 제안(EIP)에 대한 최신 소식, EIP 회의 업데이트 등을 제공합니다._
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight는 다양한 리소스에서 수집한 정보를 바탕으로 이더리움 개선 제안(EIP) 프로세스의 상태와 통계를 나타냅니다._

## 참여하기 {#participate}

누구나 EIP를 제작할 수 있습니다. 제안서를 제출하기 전에, EIP 프로세스와 작성법을 설명하는 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)을 읽고, 초안 제출 전 커뮤니티에서 먼저 제안에 대해 논의하는 [이더리움 마술사](https://ethereum-magicians.org/)에서 피드백을 요청해야 합니다.

## 참고 자료 {#references}

<cite class="citation">

Jameson Hudson의 [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)에서 일부 제공되는 페이지 콘텐츠

</cite>
