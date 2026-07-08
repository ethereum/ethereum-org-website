---
title: 이더리움 개선 제안(EIP) 소개
metaTitle: 이더리움 개선 제안(EIP)
description: EIP를 이해하는 데 필요한 기본 정보
lang: ko
---

## EIP란 무엇인가요? {#what-are-eips}

[이더리움 개선 제안(EIP)](https://eips.ethereum.org/)은 이더리움의 잠재적인 새로운 기능이나 프로세스를 명시하는 표준입니다. EIP는 제안된 변경 사항에 대한 기술 사양을 포함하며 커뮤니티를 위한 "진실의 원천(source of truth)" 역할을 합니다. [이더리움](/)의 네트워크 업그레이드 및 애플리케이션 표준은 EIP 프로세스를 통해 논의되고 개발됩니다.

이더리움 커뮤니티의 누구라도 EIP를 작성할 수 있습니다. EIP 작성 가이드라인은 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)에 포함되어 있습니다. EIP는 기본적으로 약간의 제안 배경(motivation)과 함께 간결한 기술 사양을 제공해야 합니다. EIP 작성자는 커뮤니티 내에서 합의를 이끌어내고 반대 의견을 문서화할 책임이 있습니다. 형식을 잘 갖춘 EIP를 제출하기 위한 기술적 장벽이 높기 때문에, 역사적으로 대부분의 EIP 작성자는 주로 애플리케이션 또는 프로토콜 개발자였습니다.

## EIP는 왜 중요한가요? {#why-do-eips-matter}

EIP는 이더리움에서 변경 사항이 발생하고 문서화되는 방식에 있어 중심적인 역할을 합니다. 이는 사람들이 변경 사항을 제안, 토론 및 채택하는 방법입니다. [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)와 같이 합의에 영향을 미치고 네트워크 업그레이드가 필요한 저수준 프로토콜 변경을 위한 코어(Core) EIP, 그리고 [EIP-20](https://eips.ethereum.org/EIPS/eip-20) 및 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)과 같은 애플리케이션 표준을 위한 ERC 등 [다양한 유형의 EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)가 있습니다.

모든 네트워크 업그레이드는 네트워크 상의 각 [이더리움 클라이언트](/learn/#clients-and-nodes)가 구현해야 하는 일련의 EIP로 구성됩니다. 이는 이더리움 메인넷의 다른 클라이언트와 합의를 유지하기 위해, 클라이언트 개발자가 필수 EIP를 모두 구현했는지 확인해야 함을 의미합니다.

변경 사항에 대한 기술 사양을 제공하는 것과 더불어, EIP는 이더리움에서 거버넌스가 이루어지는 단위입니다. 누구나 자유롭게 제안할 수 있으며, 커뮤니티의 다양한 이해관계자가 토론을 거쳐 이를 표준으로 채택할지 또는 네트워크 업그레이드에 포함할지 결정합니다. 비코어(non-core) EIP는 모든 애플리케이션에서 채택할 필요가 없지만(예를 들어, EIP-20을 구현하지 않는 대체 가능 토큰을 생성할 수 있음), 코어 EIP는 널리 채택되어야 하므로(모든 노드가 동일한 네트워크의 일부로 유지되려면 업그레이드해야 하기 때문), 코어 EIP는 비코어 EIP보다 커뮤니티 내에서 더 광범위한 합의가 필요합니다.

## EIP의 역사 {#history-of-eips}

[이더리움 개선 제안(EIP) GitHub 리포지토리](https://github.com/ethereum/EIPs)는 2015년 10월에 생성되었습니다. EIP 프로세스는 [비트코인 개선 제안(BIP)](https://github.com/bitcoin/bips) 프로세스를 기반으로 하며, 이는 다시 [Python 개선 제안(PEP)](https://www.python.org/dev/peps/) 프로세스를 기반으로 합니다.

EIP 편집자는 기술적 건전성, 형식 문제, 맞춤법, 문법 및 코드 스타일 수정 등을 위해 EIP를 검토하는 프로세스를 담당합니다. 마틴 베체, 비탈릭 부테린, 개빈 우드 및 기타 몇 명의 인물이 2015년부터 2016년 말까지 초기 EIP 편집자로 활동했습니다.

현재 EIP 편집자는 다음과 같습니다.

- 알렉스 베레그자지 (@axic)
- 개빈 존 (@Pandapip1)
- 그렉 콜빈 (@gcolvin)
- 맷 가넷 (@lightclient)
- 샘 윌슨 (@SamWilsn)

명예 EIP 편집자는 다음과 같습니다.

- 케이시 데트리오 (@cdetrio)
- 허드슨 제임슨 (@Souptacular)
- 마틴 베체 (@wanderer)
- 미카 졸투 (@MicahZoltu)
- 닉 존슨 (@arachnid)
- 닉 세이버스 (@nicksavers)
- 비탈릭 부테린 (@vbuterin)

EIP 편집자가 되고 싶다면 [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)를 확인하세요.

EIP 편집자는 제안이 EIP가 될 준비가 되었는지 결정하고, EIP 작성자가 제안을 발전시킬 수 있도록 돕습니다. [Ethereum Cat Herders](https://www.ethereumcatherders.com/)는 EIP 편집자와 커뮤니티 간의 회의를 조직하는 데 도움을 줍니다([EIPIP](https://github.com/ethereum-cat-herders/EIPIP) 참조).

차트와 함께 전체 표준화 프로세스는 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)에 설명되어 있습니다.

## 더 알아보기 {#learn-more}

EIP에 대해 더 자세히 알고 싶다면 [EIP 웹사이트](https://eips.ethereum.org/)와 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)을 확인하세요. 다음은 유용한 링크입니다.

- [모든 이더리움 개선 제안 목록](https://eips.ethereum.org/all)
- [모든 EIP 유형에 대한 설명](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [모든 EIP 상태에 대한 설명](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### 커뮤니티 교육 프로젝트 {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP는 이더리움 개선 제안(EIP)과 예정된 업그레이드의 주요 기능에 대해 논의하는 교육용 비디오 시리즈입니다.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf는 상태, 구현 세부 정보, 관련 풀 리퀘스트 및 커뮤니티 피드백을 포함하여 이더리움 개선 제안(EIP)에 대한 추가 정보를 제공합니다.* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun은 이더리움 개선 제안(EIP)에 대한 최신 뉴스, EIP 회의 업데이트 등을 제공합니다.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight는 다양한 리소스에서 수집한 정보를 바탕으로 이더리움 개선 제안(EIP) 프로세스 및 통계의 상태를 보여줍니다.*

## 참여하기 {#participate}

누구나 EIP를 작성할 수 있습니다. 제안을 제출하기 전에 EIP 프로세스와 EIP 작성 방법을 설명하는 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)을 읽어야 하며, 초안을 제출하기 전에 커뮤니티와 제안을 처음 논의하는 [Ethereum Magicians](https://ethereum-magicians.org/)에서 피드백을 구해야 합니다.

## 참고 자료 {#references}

<cite class="citation">

페이지 콘텐츠의 일부는 허드슨 제임슨의 [이더리움 프로토콜 개발 거버넌스 및 네트워크 업그레이드 조정](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)에서 제공되었습니다.

</cite>