---
title: "비디오 추가하기"
description: "ethereum.org에 비디오를 추가하기 위한 정책"
lang: ko
---

# 비디오 추가하기 {#adding-videos}

[ethereum.org 비디오 갤러리](/videos/)는 커뮤니티 크리에이터와 신뢰할 수 있는 출처에서 제공하는 이더리움 및 이더리움 생태계에 대한 비디오를 제공합니다. 누구나 추가할 비디오를 제안할 수 있습니다.

## 등재 정책 {#listing-policy}

Ethereum.org는 중립적이고 교육적인 리소스입니다. 비디오 갤러리는 다음을 목적으로 큐레이션됩니다:

- 이더리움 기술, 생태계 및 커뮤니티에 대해 사용자를 <strong>교육</strong>합니다.
- 기술적 콘텐츠의 <strong>정확성을 유지</strong>합니다.
- 이더리움 커뮤니티와의 <strong>관련성을 유지</strong>합니다.

이 사이트는 특정 제품, 토큰 또는 상업적 서비스를 주로 홍보하는 비디오는 등재하지 않습니다.

## 포함 기준 {#criteria-for-inclusion}

### 필수 요건 {#must-haves}

- **이더리움 중심** – 비디오는 주로 이더리움, 그 기술, 생태계 또는 커뮤니티에 관한 것이어야 합니다. 일반적인 블록체인 주제에 대한 비디오는 사이트의 교육 페이지를 실질적으로 지원하거나 관련이 있는 경우, 또는 이더리움을 언급하는 경우에만 허용됩니다.
- **교육적 가치** – 비디오는 시청자에게 이더리움에 대해 무언가를 가르치거나 글로벌 이더리움 커뮤니티를 기념해야 합니다. 홍보 또는 마케팅 콘텐츠는 허용되지 않습니다.
- **정확한 정보** – 기술적 콘텐츠는 사실관계가 정확하고 최신 상태여야 합니다. 더 이상 사용되지 않는 기능에 대한 오래된 비디오는 삭제될 수 있습니다.
- **고품질 제작** – 비디오는 합리적으로 선명한 오디오 및 비디오 품질을 갖추어야 합니다.
- **공개적 이용 가능** – 비디오는 YouTube와 같은 개방형 리소스나 접근 가능한 플랫폼에서 호스팅되어야 하며, 페이월이나 가입 요구 사항 없이 무료로 접근할 수 있어야 합니다.

### 권장 요건 {#nice-to-haves}

- **대본 포함** – 대본이 있는 비디오는 접근성과 SEO를 향상시킵니다. 대본이 없는 경우 ethereum.org 팀이 생성하는 데 도움을 줄 수 있습니다.
- **신뢰할 수 있는 출처** – 검증된 교육자, 연구원 및 출처의 콘텐츠가 우선순위를 갖습니다.
- **시의적절하고 지속 가능한 가치** – 시간이 지나도 관련성을 유지하는 콘텐츠가 시간에 민감한 자료보다 선호됩니다.

## 비디오 추가 방법 {#how-to-add-a-video}

### 옵션 1: 이슈 열기 {#open-an-issue}

비디오를 제안하고 싶지만 직접 파일을 만들고 싶지 않다면, 비디오 세부 정보와 함께 GitHub 이슈를 열어주세요. 기여자가 추가를 도와드릴 수 있습니다.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  비디오 제안하기
</ButtonLink>

### 옵션 2: 풀 리퀘스트 열기 {#open-a-pull-request}

직접 비디오를 추가하려면 다음 단계를 따르세요:

#### 1단계: 비디오 파일 생성 {#step-1}

새 디렉터리와 `index.md` 파일을 다음 위치에 생성합니다:

```
public/content/videos/{your-video-slug}/index.md
```

슬러그(slug)는 URL에 안전하고 소문자여야 하며 하이픈을 사용해야 합니다(예: `blockchain-101-visual-demo`).

#### 2단계: 프런트매터 추가 {#step-2}

`index.md` 파일에 다음 YAML 프런트매터를 추가합니다:

```yaml
---
title: "Your Video Title"
description: "A brief 1–3 sentence summary of the video."
lang: en
youtubeId: "dQw4w9WgXcQ"
uploadDate: 2025-01-15
duration: "12:30"
educationLevel: beginner
topic:
  - "your-topic"
  - "another-topic"
format: explainer
author: Channel Name
---
```

**필드 참조:**

| 필드 | 필수 여부 | 설명 |
|---|---|---|
| `title` | 예 | 비디오 제목 |
| `description` | 예 | 1\~3문장 요약 |
| `lang` | 예 | 현재는 항상 `en` 사용 |
| `youtubeId` | 예 | YouTube 비디오 ID(`v=` 뒤의 URL 부분) |
| `uploadDate` | 예 | `YYYY-MM-DD` 형식의 원본 업로드 날짜 |
| `duration` | 예 | `H:MM:SS` 또는 `M:SS` 형식의 비디오 길이 |
| `educationLevel` | 예 | `beginner`, `intermediate` 또는 `advanced` |
| `topic` | 예 | 갤러리 필터링을 위한 주제 태그 배열 |
| `format` | 예 | `explainer`, `presentation`, `interview`, `tutorial` 또는 `panel` |
| `author` | 예 | 크리에이터 또는 채널 이름 |
| `breadcrumb` | 아니요 | 브레드크럼 탐색을 위한 사용자 지정 짧은 레이블 |
| `customThumbnailUrl` | 아니요 | 사용자 지정 썸네일 URL(기본값은 YouTube 썸네일) |

#### 3단계: 대본 추가(권장) {#step-3}

프런트매터 `---` 아래에 마크다운 형식으로 비디오 대본을 추가합니다:

```markdown
---
title: "..."
# ... 나머지 프런트매터
---

비디오 콘텐츠에 대한 간단한 소개입니다.

### 섹션 제목 (0:00)

이 섹션의 대본 텍스트...

### 다음 섹션 (5:30)

추가 대본 텍스트...
```

타임스탬프와 함께 `###` 제목을 사용하여 주요 섹션을 표시하세요. 이렇게 하면 대본을 쉽게 훑어볼 수 있고 SEO가 향상됩니다.

대본이 없는 경우 본문을 비워두면 팀에서 생성해 드립니다.

#### 4단계: 주제 태그 선택 {#step-4}

갤러리에서 사용되는 기존 카테고리와 일치하는 주제 태그를 선택하세요. 현재 카테고리와 해당 태그는 다음과 같습니다:

- **이더리움 작동 방식**: `how-ethereum-works`, `consensus`, `blockchain`, `cryptography`, `accounts`, `ethereum`, `intro`, `transactions`, `pos`, `smart-contracts`
- **네트워크 업그레이드**: `network-upgrades`, `upgrades`, `pectra`, `dencun`, `eip-4844`, `blobs`, `fusaka`
- **로드맵 및 우선순위**: `roadmap-and-priorities`, `pbs`, `mev`
- **확장성 및 레이어 2 (l2)**: `scaling-and-layer-2`, `scaling`, `layer-2`, `rollups`, `optimistic-rollups`, `zk-rollups`
- **사용 사례**: `use-cases`, `defi`, `finance`, `nfts`, `erc-721`, `erc-1155`, `lending`, `dapps`, `restaking`, `eigenlayer`, `dao`, `identity`, `desci`, `refi`
- **프라이버시 및 보안**: `privacy-and-security`, `privacy`, `authentication`
- **커뮤니티 스토리**: `community-stories`, `contributing`, `translations`, `community`

비디오가 갤러리 카테고리 선반에 표시되도록 하려면 최소 하나의 카테고리 키 태그(케밥 케이스로 된 굵은 글씨 이름, 예: `use-cases` 또는 `scaling-and-layer-2`)를 포함하세요. 인식된 카테고리 태그가 없는 비디오는 "전체" 보기 및 검색 결과에만 표시됩니다.

새로운 태그를 사용할 수도 있습니다. 이 태그들은 향후 카테고리 그룹화에 사용될 수 있습니다.

#### 5단계: PR 제출 {#step-5}

변경된 내용을 `dev` 브랜치로 풀 리퀘스트(PR)를 엽니다. 팀에서 제출물을 검토하고 피드백을 제공할 것입니다.

## 유지 관리 {#maintenance}

등재된 비디오는 다음 사항을 확인하기 위해 정기적으로 검토됩니다:

- 여전히 등재 기준을 충족하는지 여부
- 정확하고 최신 정보를 포함하고 있는지 여부
- 호스팅/YouTube 링크가 정상적으로 작동하는지 여부

등재된 비디오에 문제가 있는 것을 발견하면 [이슈를 생성](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml)하거나 [website@ethereum.org](mailto:website@ethereum.org)로 이메일을 보내주세요.

## 이용 약관 {#terms-of-use}

ethereum.org의 [이용 약관](/terms-of-use/)을 참조하세요. ethereum.org의 정보는 오직 일반적인 정보 제공 목적으로만 제공됩니다.