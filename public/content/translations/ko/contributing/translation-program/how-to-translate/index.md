---
title: 번역하는 방법
lang: ko
description: Crowdin을 사용하여 ethereum.org를 번역하는 방법에 대한 지침
---

## 시각적 가이드 {#visual-guide}

시각적인 학습을 선호하신다면, Luka가 Crowdin 설정 과정을 설명하는 영상을 시청해 보세요. 또는 다음 섹션에서 동일한 단계를 서면으로 확인할 수도 있습니다.

<VideoWatch slug="crowdin-translation-guide" />

## 서면 가이드 {#written-guide}

### Crowdin에서 프로젝트 참여하기 {#join-project}

Crowdin 계정에 로그인하거나 계정이 없다면 가입해야 합니다. 가입에는 이메일 계정과 비밀번호만 있으면 됩니다.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  프로젝트 참여하기
</ButtonLink>

### 언어 열기 {#open-language}

Crowdin에 로그인하면 프로젝트 설명과 사용 가능한 모든 언어 목록이 표시됩니다.
각 언어에는 번역 가능한 총 단어 수에 대한 정보와 특정 언어로 번역 및 승인된 콘텐츠의 양에 대한 개요도 포함되어 있습니다.

번역하려는 언어를 열어 번역 가능한 파일 목록을 확인하세요.

![List of languages in Crowdin](./list-of-languages.png)

### 작업할 문서 찾기 {#find-document}

웹사이트 콘텐츠는 여러 문서와 콘텐츠 버킷으로 나뉩니다. 오른쪽에서 각 문서의 진행 상황을 확인할 수 있습니다. 번역 진행률이 100% 미만이라면 기여해 주세요!

원하는 언어가 목록에 없나요? [이슈를 열거나](https://github.com/ethereum/ethereum-org-website/issues/new/choose) [디스코드](https://discord.gg/ethereum-org)에서 문의해 주세요.

![Translated and untranslated files in Crowdin](./crowdin-files.png)

콘텐츠 버킷에 대한 참고 사항: 우선순위가 가장 높은 콘텐츠를 먼저 배포하기 위해 Crowdin 내에서 '콘텐츠 버킷'을 사용합니다. 예를 들어 [필리핀어](https://crowdin.com/project/ethereum-org/fil#)와 같은 언어를 확인하면 콘텐츠 버킷 폴더("1. Homepage", "2. Essentials", "3. Exploring" 등)를 볼 수 있습니다.

가장 영향력 있는 페이지가 먼저 번역될 수 있도록 이 숫자 순서(1 → 2 → 3 → ⋯)대로 번역하는 것을 권장합니다.

### 번역하기 {#translate}

번역할 파일을 선택하면 온라인 에디터에서 열립니다. Crowdin을 처음 사용하는 경우, 이 빠른 가이드를 통해 기본 사항을 살펴볼 수 있습니다.

![Crowdin online editor](./online-editor.png)

**_1 – 왼쪽 사이드바_**

- 미번역(빨간색) – 아직 작업하지 않은 텍스트입니다. 여러분이 번역해야 할 문자열입니다.
- 번역됨(초록색) – 이미 번역되었지만 아직 검토되지 않은 텍스트입니다. 대체 번역을 제안하거나 에디터의 '+' 및 '-' 버튼을 사용하여 기존 번역에 투표할 수 있습니다.
- 승인됨(체크 표시) – 이미 검토를 마쳤으며 현재 웹사이트에 반영되어 있는 텍스트입니다.

상단의 버튼을 사용하여 특정 문자열을 검색하거나, 상태별로 필터링하거나, 보기를 변경할 수도 있습니다.

**_2 – 에디터 영역_**

메인 번역 영역입니다. 원문 텍스트가 상단에 표시되며, 가능한 경우 추가 컨텍스트와 스크린샷이 함께 제공됩니다.
새로운 번역을 제안하려면 'Enter translation here(여기에 번역 입력)' 필드에 번역을 입력하고 저장을 클릭하세요.

이 섹션에서는 해당 문자열의 기존 번역과 다른 언어로의 번역뿐만 아니라, 번역 메모리(TM) 일치 항목 및 기계 번역 제안도 찾을 수 있습니다.

**_3 – 오른쪽 사이드바_**

여기에서 댓글, 번역 메모리 항목 및 용어집 항목을 찾을 수 있습니다. 기본 보기에는 댓글이 표시되며, 번역가들이 소통하거나, 이슈를 제기하거나, 잘못된 번역을 신고할 수 있습니다.

상단의 버튼을 사용하여 기존 번역을 검색할 수 있는 번역 메모리(Translation Memory)나 주요 용어의 설명 및 표준 번역이 포함된 용어집(Glossary)으로 전환할 수도 있습니다.

더 자세히 알고 싶으신가요? [Crowdin 온라인 에디터 사용에 대한 문서](https://support.crowdin.com/online-editor/)를 확인해 보세요.

### 검토 프로세스 {#review-process}

번역을 완료하면(즉, 콘텐츠 버킷의 모든 파일이 100%로 표시되면) 전문 번역 서비스에서 콘텐츠를 검토(및 필요시 수정)합니다. 검토가 완료되면(즉, 검토 진행률이 100%가 되면) 웹사이트에 추가됩니다.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  프로젝트 번역에 기계 번역을 사용하지 마세요. 모든 번역은 웹사이트에 추가되기 전에 검토를 거칩니다. 제안한 번역이 기계 번역으로 확인될 경우 거절되며, 기계 번역을 자주 사용하는 기여자는 프로젝트에서 제외됩니다.
</AlertContent>
</Alert>

### 문의하기 {#get-in-touch}

질문이 있으신가요? 아니면 저희 팀 및 다른 번역가들과 협업하고 싶으신가요? [ethereum.org 디스코드 서버](https://discord.gg/ethereum-org)의 #translations 채널에 글을 남겨주세요.

translations@ethereum.org로 문의하실 수도 있습니다.

ethereum.org 번역 프로그램에 참여해 주셔서 감사합니다!