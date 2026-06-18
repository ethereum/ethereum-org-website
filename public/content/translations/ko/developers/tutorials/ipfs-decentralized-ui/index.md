---
title: 탈중앙화 사용자 인터페이스를 위한 IPFS
description: 이 튜토리얼에서는 IPFS를 사용하여 탈중앙화 애플리케이션 (dapp)의 사용자 인터페이스를 저장하는 방법을 설명합니다. 애플리케이션의 데이터와 비즈니스 로직이 탈중앙화되어 있더라도, 검열 저항적인 사용자 인터페이스가 없다면 사용자는 애플리케이션에 대한 접근 권한을 잃을 수 있습니다.
author: 오리 포메란츠
tags:
  - IPFS
  - dapps
  - 프론트엔드
skill: beginner
breadcrumb: dapp UI를 위한 IPFS
lang: ko
published: 2024-06-29
---

여러분은 놀랍고 새로운 탈중앙화 애플리케이션 (dapp)을 작성했습니다. 심지어 이를 위한 [사용자 인터페이스](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)도 작성했습니다. 하지만 이제 누군가 클라우드의 단일 서버에 불과한 사용자 인터페이스를 다운시켜 검열을 시도할까 봐 걱정될 수 있습니다. 이 튜토리얼에서는 사용자 인터페이스를 **[IPFS(Interplanetary File System)](https://ipfs.tech/developers/)**에 올려 검열을 피하는 방법을 배웁니다. 이를 통해 관심 있는 누구나 향후 접근을 위해 서버에 고정(pin)할 수 있습니다.

[Fleek](https://resources.fleek.xyz/docs/)과 같은 서드파티 서비스를 사용하여 모든 작업을 처리할 수도 있습니다. 이 튜토리얼은 작업량이 더 많더라도 자신이 무엇을 하고 있는지 충분히 이해하고 싶은 사람들을 위한 것입니다.

## 로컬에서 시작하기 {#getting-started-locally}

여러 [서드파티 IPFS 제공자](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service)가 있지만, 테스트를 위해 로컬에서 IPFS를 실행하여 시작하는 것이 가장 좋습니다.

1. [IPFS 사용자 인터페이스](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions)를 설치합니다.

2. 웹사이트가 포함된 디렉터리를 생성합니다. [Vite](https://vite.dev/)를 사용하는 경우 다음 명령어를 사용하세요:

   ```sh
   pnpm vite build
   ```

3. IPFS 데스크톱에서 **가져오기(Import) > 폴더(Folder)**를 클릭하고 이전 단계에서 생성한 디렉터리를 선택합니다.

4. 방금 업로드한 폴더를 선택하고 **이름 바꾸기(Rename)**를 클릭합니다. 더 의미 있는 이름을 지정하세요.

5. 폴더를 다시 선택하고 **링크 공유(Share link)**를 클릭합니다. URL을 클립보드에 복사합니다. 링크는 `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`와 유사할 것입니다.

6. **상태(Status)**를 클릭합니다. **고급(Advanced)** 탭을 확장하여 게이트웨이 주소를 확인합니다. 예를 들어, 제 시스템의 주소는 `http://127.0.0.1:8080`입니다.

7. 링크 단계의 경로와 게이트웨이 주소를 결합하여 주소를 찾습니다. 예를 들어, 위 예시의 URL은 `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`입니다. 브라우저에서 해당 URL을 열어 사이트를 확인하세요.

## 업로드하기 {#uploading}

이제 IPFS를 사용하여 로컬에서 파일을 제공할 수 있지만, 이것만으로는 그다지 흥미롭지 않습니다. 다음 단계는 오프라인 상태일 때도 전 세계에서 파일에 접근할 수 있도록 만드는 것입니다.

잘 알려진 [피닝(pinning) 서비스](https://docs.ipfs.tech/concepts/persistence/#pinning-services)가 여러 개 있습니다. 그중 하나를 선택하세요. 어떤 서비스를 사용하든 계정을 생성하고 IPFS 데스크톱에 있는 **콘텐츠 식별자(CID)**를 제공해야 합니다.

개인적으로는 [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides)가 가장 사용하기 쉬웠습니다. 사용 방법은 다음과 같습니다:

1. [대시보드](https://dashboard.4everland.org/overview)로 이동하여 지갑으로 로그인합니다.

2. 왼쪽 사이드바에서 **Storage > 4EVER Pin**을 클릭합니다.

3. **Upload > Selected CID**를 클릭합니다. 콘텐츠의 이름을 지정하고 IPFS 데스크톱에서 CID를 제공합니다. 현재 CID는 `Qm`로 시작하고 그 뒤에 [base-58로 인코딩된](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524) 해시를 나타내는 44개의 문자와 숫자가 이어지는 문자열(예: `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`)이지만, [이는 변경될 가능성이 있습니다](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. 초기 상태는 **Queued(대기 중)**입니다. 상태가 **Pinned(고정됨)**로 변경될 때까지 새로고침합니다.

5. CID를 클릭하여 링크를 가져옵니다. 제 애플리케이션은 [여기](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/)에서 확인할 수 있습니다.

6. 한 달 이상 고정하려면 계정을 활성화해야 할 수도 있습니다. 계정 활성화 비용은 약 1달러입니다. 창을 닫았다면 로그아웃 후 다시 로그인하여 활성화 요청을 다시 받으세요.

## IPFS에서 사용하기 {#using-from-ipfs}

이 시점에서 여러분은 IPFS 콘텐츠를 제공하는 중앙화된 게이트웨이에 대한 링크를 갖게 됩니다. 요약하자면, 사용자 인터페이스가 조금 더 안전해졌을 수는 있지만 여전히 검열 저항적인 것은 아닙니다. 진정한 검열 저항성을 확보하려면 사용자가 [브라우저에서 직접](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites) IPFS를 사용해야 합니다.

이를 설치하고(데스크톱 IPFS가 작동 중인 상태에서) 아무 사이트에서나 [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im)로 이동하면, 탈중앙화된 방식으로 제공되는 해당 콘텐츠를 얻을 수 있습니다.

## 단점 {#drawbacks}

IPFS 파일은 확실하게 삭제할 수 없으므로, 사용자 인터페이스를 수정하는 동안에는 중앙화된 상태로 두거나 IPFS 위에서 가변성을 제공하는 시스템인 [IPNS(Interplanetary Name System)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs)를 사용하는 것이 가장 좋습니다. 물론 가변적인 것은 무엇이든 검열될 수 있으며, IPNS의 경우 해당 개인 키를 가진 사람을 압박함으로써 검열이 이루어질 수 있습니다.

또한 일부 패키지는 IPFS와 호환성 문제가 있으므로, 웹사이트가 매우 복잡하다면 좋은 해결책이 아닐 수 있습니다. 그리고 당연하게도, 서버 연동에 의존하는 모든 것은 클라이언트 측을 IPFS에 두는 것만으로는 탈중앙화될 수 없습니다.

## ENS를 통한 검색 가능성 {#discoverability}

ENS 이름(예: vitalik.eth)을 웹사이트에 연결하면, 완전히 탈중앙화된 웹페이지로 간주되어 [dweb3.wtf](https://dweb3.wtf) 서비스에 의해 자동으로 고정(pin)됩니다. 또한 DuckDuckGo, Brave Search 또는 Google이 기존 웹에서 하는 것과 마찬가지로 [web3compass.net](https://web3compass.net) 검색 엔진을 통해 검색할 수 있게 됩니다.

## 결론 {#conclusion}

이더리움이 탈중앙화 애플리케이션 (dapp)의 데이터베이스와 비즈니스 로직 측면을 탈중앙화할 수 있게 해주는 것처럼, IPFS는 사용자 인터페이스를 탈중앙화할 수 있게 해줍니다. 이를 통해 dapp에 대한 또 다른 공격 벡터를 차단할 수 있습니다.

[제 작업물은 여기에서 더 확인하실 수 있습니다](https://cryptodocguy.pro/).