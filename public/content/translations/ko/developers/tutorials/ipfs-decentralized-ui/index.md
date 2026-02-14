---
title: "탈중앙화된 사용자 인터페이스를 위한 IPFS"
description: "이 튜토리얼은 탈중앙화앱의 사용자 인터페이스를 저장하기 위해 IPFS를 사용하는 방법을 설명합니다. 애플리케이션의 데이터와 비즈니스 로직이 탈중앙화되어 있더라도, 검열 저항성 사용자 인터페이스가 없으면 사용자는 결국 액세스 권한을 잃을 수 있습니다."
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: beginner
lang: ko
published: 2024-06-29
---

여러분은 놀라운 새 탈중앙화앱을 작성했습니다. 심지어 [사용자 인터페이스](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)도 작성했습니다. 하지만 클라우드에 있는 단 하나의 서버일 뿐인 여러분의 사용자 인터페이스를 누군가가 다운시켜 검열할까 봐 걱정됩니다. 이 튜토리얼에서는 사용자 인터페이스를 \*\*[인터플래네터리 파일 시스템(IPFS)](https://ipfs.tech/developers/)\*\*에 올려 검열을 피하는 방법을 배웁니다. 그러면 관심 있는 사람은 누구나 나중에 액세스할 수 있도록 서버에 고정할 수 있습니다.

[Fleek](https://resources.fleek.xyz/docs/)과 같은 타사 서비스를 사용하여 모든 작업을 수행할 수 있습니다. 이 튜토리얼은 일이 더 많더라도 자신이 무엇을 하고 있는지 이해할 수 있을 만큼 충분히 하고 싶은 사람들을 위한 것입니다.

## 로컬에서 시작하기 {#getting-started-locally}

여러 [타사 IPFS 공급자](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service)가 있지만, 테스트를 위해 로컬에서 IPFS를 실행하여 시작하는 것이 가장 좋습니다.

1. [IPFS 사용자 인터페이스](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions)를 설치합니다.

2. 웹 사이트가 있는 디렉토리를 만듭니다. [Vite](https://vite.dev/)를 사용하는 경우 다음 명령을 사용합니다.

   ```sh
   pnpm vite build
   ```

3. IPFS 데스크톱에서 **가져오기 > 폴더**를 클릭하고 이전 단계에서 만든 디렉토리를 선택합니다.

4. 방금 업로드한 폴더를 선택하고 **이름 바꾸기**를 클릭합니다. 더 의미 있는 이름을 지정합니다.

5. 다시 선택하고 **링크 공유**를 클릭합니다. URL을 클립보드에 복사합니다. 링크는 `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`와 유사합니다.

6. **상태**를 클릭합니다. **고급** 탭을 확장하여 게이트웨이 주소를 확인합니다. 예를 들어, 제 시스템의 주소는 `http://127.0.0.1:8080`입니다.

7. 링크 단계의 경로와 게이트웨이 주소를 결합하여 자신의 주소를 찾습니다. 예를 들어 위 예시의 URL은 `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`입니다. 브라우저에서 해당 URL을 열어 사이트를 확인합니다.

## 업로드 {#uploading}

이제 IPFS를 사용하여 로컬에서 파일을 제공할 수 있지만, 이는 그리 흥미로운 일은 아닙니다. 다음 단계는 여러분이 오프라인일 때도 전 세계에서 사용할 수 있도록 하는 것입니다.

잘 알려진 여러 [고정 서비스](https://docs.ipfs.tech/concepts/persistence/#pinning-services)가 있습니다. 그중 하나를 선택합니다. 어떤 서비스를 사용하든 계정을 만들고 IPFS 데스크톱에 있는 \*\*콘텐츠 식별자(CID)\*\*를 제공해야 합니다.

개인적으로 [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides)가 가장 사용하기 쉽다고 생각합니다. 사용 방법은 다음과 같습니다.

1. [대시보드](https://dashboard.4everland.org/overview)로 이동하여 지갑으로 로그인합니다.

2. 왼쪽 사이드바에서 **Storage > 4EVER Pin**을 클릭합니다.

3. **Upload > Selected CID**를 클릭합니다. 콘텐츠에 이름을 지정하고 IPFS 데스크톱의 CID를 제공합니다. 현재 CID는 `Qm`으로 시작하고 44개의 문자와 숫자가 뒤따르는 문자열로, `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`와 같이 [base-58로 인코딩된](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524) 해시를 나타내지만, [이는 변경될 가능성이 있습니다](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. 초기 상태는 \*\*대기열에 추가됨(Queued)\*\*입니다. \*\*고정됨(Pinned)\*\*으로 변경될 때까지 새로 고칩니다.

5. CID를 클릭하여 링크를 가져옵니다. 제 애플리케이션은 [여기](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im/)에서 볼 수 있습니다.

6. 한 달 이상 고정하려면 계정을 활성화해야 할 수 있습니다. 계정 활성화 비용은 약 1달러입니다. 창을 닫았다면, 로그아웃한 후 다시 로그인하면 활성화하라는 메시지가 다시 표시됩니다.

## IPFS에서 사용하기 {#using-from-ipfs}

이 시점에서 여러분은 IPFS 콘텐츠를 제공하는 중앙화된 게이트웨이 링크를 갖게 됩니다. 요컨대, 사용자 인터페이스가 조금 더 안전해졌을지는 모르지만 여전히 검열 저항성이 있는 것은 아닙니다. 진정한 검열 저항성을 위해서는 사용자가 [브라우저에서 직접](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites) IPFS를 사용해야 합니다.

일단 설치하고(데스크톱 IPFS가 작동하면) 모든 사이트에서 [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im)로 이동하여 탈중앙화된 방식으로 제공되는 해당 콘텐츠를 얻을 수 있습니다.

## 단점 {#drawbacks}

IPFS 파일은 안정적으로 삭제할 수 없으므로, 사용자 인터페이스를 수정하는 동안에는 중앙화된 상태로 두거나 IPFS 위에 가변성을 제공하는 시스템인 [인터플래네터리 네임 시스템(IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs)을 사용하는 것이 가장 좋습니다. 물론 변경 가능한 모든 것은 검열될 수 있으며, IPNS의 경우 해당하는 개인 키를 가진 사람에게 압력을 가함으로써 검열이 가능합니다.

또한 일부 패키지는 IPFS와 문제가 있으므로 웹 사이트가 매우 복잡한 경우 좋은 해결책이 아닐 수 있습니다. 물론, 클라이언트 측을 IPFS에 두는 것만으로 서버 통합에 의존하는 모든 것을 탈중앙화할 수는 없습니다.

## 결론 {#conclusion}

이더리움이 탈중앙화앱의 데이터베이스 및 비즈니스 로직 측면을 탈중앙화할 수 있게 해주는 것처럼, IPFS는 사용자 인터페이스를 탈중앙화할 수 있게 해줍니다. 이를 통해 여러분의 탈중앙화앱에 대한 또 다른 공격 벡터를 차단할 수 있습니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).
