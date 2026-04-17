---
title: "오픈 소스 라이선스 이해하기"
description: "자유 소프트웨어 라이선스 및 협업 개발을 위한 실용적인 가이드"
image: /images/open-source/hero-licensing.png
alt: "다양한 라이선스 유형을 보여주는 다이어그램"
template: tutorial
lang: ko
published: 2025-06-15
tags:
  - 오픈 소스
  - 라이선스
  - 컴플라이언스
summaryPoints:
  - 오픈 소스 라이선스는 코드를 사용, 수정 및 공유하는 방법을 정의합니다.
  - 카피레프트 라이선스는 파생 저작물도 오픈 소스로 유지할 것을 요구합니다.
  - 퍼미시브 라이선스는 최소한의 제한으로 독점적 사용을 허용합니다.
---

# 오픈 소스 라이선스 이해하기 {#understanding-open-source-licensing}

오픈 소스 소프트웨어는 코드를 자유롭게 공유하고, 연구하며, 개선해야 한다는 원칙을 바탕으로 만들어집니다. 이 가이드는 주요 라이선스 제품군, 라이선스 선택 방법, 그리고 협업 개발을 위한 모범 사례를 다룹니다.

**기억하세요: 라이선스는 법적인 문제입니다. 이 가이드는 교육 목적이며 법률적 조언이 아닙니다. 구체적인 상황에 대해서는 자격을 갖춘 변호사와 상담하세요.**

<Divider />

## 오픈 소스란 무엇인가요? {#what-is-open-source}

소프트웨어 라이선스는 다른 사람들이 여러분의 코드를 사용, 수정 및 배포하는 방법을 결정합니다. 이를 제한하는 독점 라이선스와 달리, 오픈 소스 라이선스는 이러한 권리를 명시적으로 부여합니다.

[오픈 소스 이니셔티브(Open Source Initiative)](https://opensource.org/osd)는 공식 오픈 소스 정의를 유지 관리하며, 이 정의에 따르면 라이선스는 자유로운 재배포, 소스 코드 접근 및 파생 저작물을 허용해야 합니다.

_명확한 라이선스가 없다면_, 모든 프로젝트는 맞춤형 법률 검토가 필요할 것입니다. 리포지토리의 `LICENSE` 파일은 `README.md` 파일이 프로젝트의 목적을 설명하는 것과 유사하게 어떤 권한이 부여되는지 정확히 알려줍니다.

<a href="https://choosealicense.com/">Choose a License</a>에서 프로젝트의 라이선스를 확인하여 허용되는 사항을 이해할 수 있습니다.

![License comparison chart](/images/open-source/license-comparison.png)

### 4가지 자유 {#the-four-freedoms}

[자유 소프트웨어 재단(Free Software Foundation)](https://www.fsf.org/about/what-is-free-software)은 4가지 필수적인 자유를 정의합니다:

- **자유 0**: 어떤 목적으로든 프로그램을 실행할 수 있는 자유
- **자유 1**: 프로그램이 어떻게 작동하는지 연구하고 이를 수정할 수 있는 자유
- **자유 2**: 복사본을 재배포할 수 있는 자유
- **자유 3**: 프로그램을 개선하고 그 개선 사항을 배포할 수 있는 자유

이러한 자유는 모든 자유 오픈 소스 소프트웨어(FOSS) 라이선스의 기반을 형성합니다.

<InfoBanner title="Important distinction" description="Free as in freedom, not free as in price">

자유 소프트웨어에서 "자유(free)"라는 단어는 비용이 아니라 자유(liberty)를 의미합니다. 독점 소프트웨어도 무료일 수 있으며, 자유 소프트웨어도 상업적으로 판매될 수 있습니다. 자세한 설명은 [GNU 철학](https://www.gnu.org/philosophy/free-sw.html)을 참조하세요.

</InfoBanner>

## 라이선스 선택하기 {#choosing-a-license}

### 카피레프트 라이선스 {#copyleft-licenses}

`GPL-3.0`와 같은 카피레프트 라이선스는 파생 저작물도 동일한 라이선스를 사용하도록 요구합니다. 이는 소프트웨어와 모든 수정 사항이 자유롭게 유지되도록 보장합니다. `AGPL-3.0`는 이 요구 사항을 네트워크를 통해 액세스하는 소프트웨어로 확장합니다.

```solidity
// SPDX-License-Identifier: GPL-3.0
// 이 컨트랙트는 간단한 레지스트리를 보여줍니다.
pragma solidity ^0.8.0;

contract ProjectRegistry {
  mapping(address => string) public projects;

  function register(string memory name) public {
    require(bytes(name).length > 0, "Name required");
    projects[msg.sender] = name;
  }
}
```

카피레프트의 주요 장점은 개선 사항을 커뮤니티와 다시 공유해야 한다는 것입니다. 누군가 여러분의 GPL 라이선스 라이브러리를 기반으로 개발한다면, 그들의 수정 사항 역시 GPL 라이선스를 따라야 합니다.

<ExpandableCard title="When should I use copyleft?" contentPreview="Copyleft is ideal when you want to ensure derivatives stay open" eventCategory="/open-source/copyleft">

다음과 같은 경우 카피레프트를 사용하세요:

1. 모든 파생 저작물이 오픈 소스로 유지되기를 원할 때
2. 다른 사람들이 확장할 라이브러리나 프레임워크를 구축할 때
3. 작업물의 독점적인 포크(fork)를 방지하고 싶을 때

단점은 라이선스의 "바이러스성" 특성 때문에 일부 기업이 카피레프트 라이선스가 적용된 종속성을 피한다는 것입니다.

카피레프트 컴플라이언스에 대한 일반적인 질문은 <a href="https://www.gnu.org/licenses/gpl-faq.html">GPL FAQ</a>를 확인하세요.

</ExpandableCard>

### 퍼미시브 라이선스 {#permissive-licenses}

`MIT` 및 `Apache-2.0`와 같은 퍼미시브 라이선스는 독점적인 파생물을 허용합니다. `BSD-2-Clause`는 제한이 최소화된 또 다른 인기 있는 퍼미시브 옵션입니다.

```python
# 예제: 프로젝트의 라이선스 파일 읽기
def read_license(path: str) -> str:
  """LICENSE 파일의 내용을 읽고 반환합니다."""
  with open(path, "r") as f:
    return f.read()

# 라이선스가 허용적인지 확인합니다.
def is_permissive(license_text: str) -> bool:
  permissive_keywords = ["MIT", "Apache", "BSD"]
  return any(kw in license_text for kw in permissive_keywords)
```

퍼미시브 라이선스의 주요 장점은 채택을 극대화할 수 있다는 것입니다. 코드 사용 방법에 대한 제한이 없기 때문에 기업들이 퍼미시브 라이선스 프로젝트를 사용하고 기여할 가능성이 더 높습니다.

[GitHub](https://github.com/)을 사용하여 모든 호스팅 플랫폼에 프로젝트를 배포할 수 있으며, [SPDX](https://spdx.org/)로 컴플라이언스를 확인할 수 있습니다.

프로덕션 환경에 배포하기 전에 [Sepolia](https://sepolia.dev/)에서 [블록 탐색기](https://eth.blockscout.com/)와 함께 [Remix](https://remix.ethereum.org/)를 사용하여 [스마트 컨트랙트](/glossary/#smart-contract)를 테스트하세요.

### 비교 표 {#comparison-table}

| 라이선스 | 유형 | 파생 저작물 | 특허 부여 |
|---------|------|-----------------|-------------|
| GPL-3.0 | 카피레프트 | GPL이어야 함 | 예 |
| AGPL-3.0 | 네트워크 카피레프트 | AGPL이어야 함 | 예 |
| LGPL-3.0 | 약한 카피레프트 | 라이브러리는 독점적일 수 있음 | 예 |
| MIT | 퍼미시브 | 모든 라이선스 | 아니요 |
| Apache-2.0 | 퍼미시브 | 모든 라이선스 | 예 |
| BSD-2-Clause | 퍼미시브 | 모든 라이선스 | 아니요 |
| MPL-2.0 | 파일 수준 카피레프트 | 수정된 파일은 MPL이어야 함 | 예 |

## 커뮤니티 협업 {#community-collaboration}

### 프로젝트에 기여하기 {#contributing-to-projects}

오픈 소스에 기여하는 것은 프로젝트의 워크플로우를 이해하는 것에서 시작됩니다. 대부분의 프로젝트는 이슈 트래커를 사용하여 작업을 조율하고 풀 리퀘스트(pull request)를 통해 변경 사항을 제안합니다.

<ButtonLink href="/contributing/guide/">오늘 바로 기여를 시작하세요</ButtonLink>

<DocLink href="/contributing/">
  이 프로젝트에 기여하는 방법
</DocLink>

<DocLink href="/community/">
  커뮤니티 참여하기
</DocLink>

기여를 제출하기 전에 항상 프로젝트의 `CONTRIBUTING.md` 파일에서 가이드라인을 확인하세요. 코드 스타일, 테스트 요구 사항 및 리뷰 프로세스는 프로젝트마다 다릅니다.

```md
## 풀 리퀘스트 템플릿

**설명:** 변경 사항에 대한 간략한 요약
**관련 이슈:** 이 작업이 해결하는 이슈 링크
**테스트:** 어떻게 테스트되었나요?
```

### <Emoji text=":bulb:" size={1} className="me-2" /> 코드 리뷰 모범 사례 {#code-review}

코드 리뷰는 협업 프로젝트에서 품질을 유지하는 데 필수적입니다. 리뷰어는 정확성, 스타일 일관성 및 잠재적인 보안 문제를 확인해야 합니다.

<Alert variant="update">
<AlertEmoji text=":mag:"/>
<AlertContent>
<AlertDescription>
  좋은 코드 리뷰는 단순한 포맷팅이 아니라 로직과 설계에 중점을 둡니다. 스타일 적용을 위해서는 린터(linter)와 같은 자동화된 도구를 사용하고, 아키텍처 결정이나 엣지 케이스(edge case)에 대해서는 사람이 직접 리뷰하도록 하세요.
</AlertDescription>
</AlertContent>
</Alert>

<QuizWidget quizKey="open-source-licensing" />

## 컴플라이언스 및 감사 {#compliance-and-auditing}

오픈 소스 소프트웨어를 사용하는 조직은 종속성을 추적하고 라이선스 컴플라이언스를 보장해야 합니다<sup>1</sup>. [FOSSA](https://fossa.com/) 및 [Snyk](https://snyk.io/)와 같은 도구를 사용하면 이 프로세스를 자동화할 수 있습니다.

<CardGrid>
  <Card title="License Audit" description="Scan your project for license conflicts" href="/tools/audit/" />
  <Card title="SBOM Generator" description="Create a software bill of materials" href="/tools/sbom/" />
</CardGrid>

### 라이선스 스캐닝 {#license-scanning}

자동화된 라이선스 스캐닝은 모든 CI/CD 파이프라인의 일부가 되어야 합니다. 이는 호환되지 않는 라이선스가 종속성 트리에 들어가기 전에 잡아냅니다.

```bash
# 프로젝트에서 라이선스 스캔을 실행합니다.
npx license-checker --production --json > licenses.json

# 프로덕션 의존성에서 카피레프트 라이선스를 확인합니다.
npx license-checker --production --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;ISC"
```

종속성을 최신 상태로 유지하고 라이선스 변경 사항을 모니터링하려면 <a href="https://docs.github.com/en/code-security/dependabot" target="_blank">Dependabot</a> 사용을 고려해 보세요.

### SBOM 생성 {#sbom-generation}

소프트웨어 자재 명세서(Software Bill of Materials, SBOM)는 소프트웨어의 모든 구성 요소를 나열합니다. 특히 보안에 민감한 산업에서는 규제 준수를 위해 SBOM 생성이 점점 더 요구되고 있습니다.

<YouTube id="spec-fixture-001" />

### 주요 용어 {#key-terms}

<GlossaryDefinition term="open-source" />

<GlossaryDefinition term="copyleft" />

라이선스에 대해 <strong>정보에 입각한 결정</strong>을 내리려면 이러한 용어를 이해하는 것이 <em>필수적</em>입니다.

<Alert variant="info">
<Emoji text="📋" />
<div>

추가적인 정의는 전체 [용어집](/glossary/)을 검토하세요. 이 리소스는 커뮤니티에서 유지 관리하며 정기적으로 업데이트됩니다.

</div>
</Alert>

## 추가 자료 {#further-reading}

_이 가이드는 [오픈 소스 이니셔티브(Open Source Initiative)](https://opensource.org/) 및 [자유 소프트웨어 재단(Free Software Foundation)](https://www.fsf.org/)의 자료를 바탕으로 작성되었습니다._

- [Choose a License 가이드](https://choosealicense.com/) - _프로젝트에 적합한 라이선스를 선택하는 데 도움이 되는 간단한 도구_
- [SPDX 라이선스 목록](https://spdx.org/licenses/) - _500개 이상의 오픈 소스 라이선스에 대한 표준화된 식별자_
- [오픈 소스 가이드](https://opensource.guide/) - _프로젝트 운영 및 기여를 위해 커뮤니티에서 유지 관리하는 리소스_
- [FOSSA](https://fossa.com/)의 컴플라이언스 도구 - _자동화된 라이선스 스캐닝 및 종속성 관리_