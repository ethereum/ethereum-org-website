---
title: 비밀 상태를 위한 영지식 사용하기
description: 온체인 게임은 숨겨진 정보를 유지할 수 없기 때문에 한계가 있습니다. 이 튜토리얼을 읽고 나면 영지식 증명과 서버 컴포넌트를 결합하여 오프체인에 비밀 상태 컴포넌트가 있는 검증 가능한 게임을 만들 수 있습니다. 지뢰찾기 게임을 만들어 이 기술을 시연해 보겠습니다.
author: 오리 포메란츠
tags: ["서버", "오프체인", "중앙화된", "영지식", "Zokrates", "MUD", "프라이버시"]
skill: advanced
breadcrumb: ZK 비밀 상태
lang: ko
published: 2025-03-15
---

_블록체인에는 비밀이 없습니다_. 블록체인에 게시된 모든 내용은 누구나 읽을 수 있도록 공개됩니다. 블록체인은 누구나 검증할 수 있다는 점을 기반으로 하므로 이는 필수적입니다. 하지만 게임은 종종 비밀 상태에 의존합니다. 예를 들어, [지뢰찾기](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) 게임은 블록 탐색기에 들어가서 지도를 볼 수 있다면 전혀 의미가 없습니다.

가장 간단한 해결책은 비밀 상태를 유지하기 위해 [서버 컴포넌트](/developers/tutorials/server-components/)를 사용하는 것입니다. 하지만 우리가 블록체인을 사용하는 이유는 게임 개발자의 부정행위를 방지하기 위해서입니다. 우리는 서버 컴포넌트의 정직성을 보장해야 합니다. 서버는 상태의 해시를 제공할 수 있으며, [영지식 증명](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important)을 사용하여 이동 결과를 계산하는 데 사용된 상태가 올바른 상태임을 증명할 수 있습니다.

이 글을 읽고 나면 이러한 종류의 비밀 상태 유지 서버, 상태를 보여주는 클라이언트, 그리고 이 둘 사이의 통신을 위한 온체인 컴포넌트를 만드는 방법을 알게 될 것입니다. 우리가 사용할 주요 도구는 다음과 같습니다:

| 도구                                          | 목적                                                 | 검증된 버전 |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | 영지식 증명 및 그 검증            |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | 서버와 클라이언트 모두를 위한 프로그래밍 언어 |               5.4.2 |
| [Node](https://nodejs.org/en)                 | 서버 실행                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | 블록체인과의 통신                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | 온체인 데이터 관리                                 |              2.0.12 |
| [React](https://react.dev/)                   | 클라이언트 사용자 인터페이스                                   |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | 클라이언트 코드 제공                                 |               4.2.1 |

## 지뢰찾기 예제 {#minesweeper}

[지뢰찾기](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>)는 지뢰밭이 있는 비밀 지도를 포함하는 게임입니다. 플레이어는 특정 위치를 파내기로 선택합니다. 해당 위치에 지뢰가 있으면 게임 오버입니다. 그렇지 않으면 플레이어는 해당 위치를 둘러싼 8개의 칸에 있는 지뢰의 개수를 알게 됩니다.

이 애플리케이션은 [키-값 데이터베이스](https://aws.amazon.com/nosql/key-value/)를 사용하여 데이터를 온체인에 저장하고 해당 데이터를 오프체인 컴포넌트와 자동으로 동기화할 수 있게 해주는 프레임워크인 [MUD](https://mud.dev/)를 사용하여 작성되었습니다. 동기화 외에도 MUD를 사용하면 접근 제어를 쉽게 제공할 수 있으며, 다른 사용자가 무허가형으로 애플리케이션을 [확장](https://mud.dev/guides/extending-a-world)하기 쉽습니다.

### 지뢰찾기 예제 실행하기 {#running-minesweeper-example}

지뢰찾기 예제를 실행하려면 다음을 수행하세요.

1. [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), [`mprocs`](https://github.com/pvolok/mprocs)와 같은 [필수 구성 요소가 설치되어 있는지 확인](https://mud.dev/quickstart#prerequisites)합니다.

2. 리포지토리를 클론합니다.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. 패키지를 설치합니다.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Foundry가 `pnpm install`의 일부로 설치된 경우, 명령줄 셸을 다시 시작해야 합니다.

4. 컨트랙트를 컴파일합니다.

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. 프로그램([anvil](https://book.getfoundry.sh/anvil/) 블록체인 포함)을 시작하고 기다립니다.

   ```sh copy
   mprocs
   ```

   시작하는 데 시간이 오래 걸린다는 점에 유의하세요. 진행 상황을 보려면 먼저 아래쪽 화살표를 사용하여 _contracts_ 탭으로 스크롤하여 MUD 컨트랙트가 배포되는 것을 확인합니다. _Waiting for file changes…_ 메시지가 표시되면 컨트랙트가 배포된 것이며, 추가 진행 상황은 _server_ 탭에서 확인할 수 있습니다. 거기서 _Verifier address: 0x...._ 메시지가 표시될 때까지 기다립니다.

   이 단계가 성공하면 왼쪽에 여러 프로세스가 있고 오른쪽에 현재 선택된 프로세스의 콘솔 출력이 있는 `mprocs` 화면이 표시됩니다.

   ![The mprocs screen](./mprocs.png)

   `mprocs`에 문제가 있는 경우, 4개의 프로세스를 각각 별도의 명령줄 창에서 수동으로 실행할 수 있습니다.

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contracts** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. 이제 [클라이언트](http://localhost:3000)로 이동하여 **New Game**을 클릭하고 게임을 시작할 수 있습니다.

### 테이블 {#tables}

온체인에는 [여러 테이블](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts)이 필요합니다.

- `Configuration`: 이 테이블은 싱글톤이며, 키가 없고 단일 레코드를 가집니다. 게임 구성 정보를 보관하는 데 사용됩니다.
  - `height`: 지뢰밭의 높이
  - `width`: 지뢰밭의 너비
  - `numberOfBombs`: 각 지뢰밭의 폭탄 개수
- `VerifierAddress`: 이 테이블 역시 싱글톤입니다. 구성의 한 부분인 검증자 컨트랙트의 주소(`verifier`)를 보관하는 데 사용됩니다. 이 정보를 `Configuration` 테이블에 넣을 수도 있었지만, 다른 컴포넌트인 서버에 의해 설정되므로 별도의 테이블에 넣는 것이 더 쉽습니다.

- `PlayerGame`: 키는 플레이어의 주소입니다. 데이터는 다음과 같습니다.

  - `gameId`: 플레이어가 플레이 중인 지도의 해시인 32바이트 값(게임 식별자)입니다.
  - `win`: 플레이어가 게임에서 이겼는지 여부를 나타내는 부울 값입니다.
  - `lose`: 플레이어가 게임에서 졌는지 여부를 나타내는 부울 값입니다.
  - `digNumber`: 게임에서 성공적으로 파낸 횟수입니다.

- `GamePlayer`: 이 테이블은 `gameId`에서 플레이어 주소로의 역방향 매핑을 보관합니다.

- `Map`: 키는 세 가지 값의 튜플입니다.

  - `gameId`: 플레이어가 플레이 중인 지도의 해시인 32바이트 값(게임 식별자)입니다.
  - `x` 좌표
  - `y` 좌표

  값은 단일 숫자입니다. 폭탄이 감지된 경우 255입니다. 그렇지 않으면 해당 위치 주변의 폭탄 개수에 1을 더한 값입니다. EVM의 모든 스토리지와 MUD의 모든 행 값은 기본적으로 0이기 때문에 폭탄 개수만 사용할 수는 없습니다. "플레이어가 아직 여기를 파지 않음"과 "플레이어가 여기를 파서 주변에 폭탄이 0개임을 발견함"을 구분해야 합니다.

또한 클라이언트와 서버 간의 통신은 온체인 컴포넌트를 통해 이루어집니다. 이 역시 테이블을 사용하여 구현됩니다.

- `PendingGame`: 새 게임을 시작하라는 처리되지 않은 요청입니다.
- `PendingDig`: 특정 게임의 특정 장소를 파내라는 처리되지 않은 요청입니다. 이것은 [오프체인 테이블](https://mud.dev/store/tables#types-of-tables)이며, EVM 스토리지에 기록되지 않고 이벤트를 사용하여 오프체인에서만 읽을 수 있음을 의미합니다.

### 실행 및 데이터 흐름 {#execution-data-flows}

이러한 흐름은 클라이언트, 온체인 컴포넌트 및 서버 간의 실행을 조정합니다.

#### 초기화 {#initialization-flow}

`mprocs`를 실행하면 다음 단계가 발생합니다.

1. [`mprocs`](https://github.com/pvolok/mprocs)는 4개의 컴포넌트를 실행합니다.

   - 로컬 블록체인을 실행하는 [Anvil](https://book.getfoundry.sh/anvil/)
   - MUD용 컨트랙트를 컴파일(필요한 경우)하고 배포하는 [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)
   - 웹 브라우저에 UI 및 클라이언트 코드를 제공하기 위해 [Vite](https://vitejs.dev/)를 실행하는 [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)
   - 서버 작업을 수행하는 [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)

2. `contracts` 패키지는 MUD 컨트랙트를 배포한 다음 [`PostDeploy.s.sol` 스크립트](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol)를 실행합니다. 이 스크립트는 구성을 설정합니다. GitHub의 코드는 [8개의 지뢰가 있는 10x5 지뢰밭](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23)을 지정합니다.

3. [서버](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts)는 [MUD를 설정](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6)하는 것으로 시작합니다. 무엇보다도 이는 데이터 동기화를 활성화하여 관련 테이블의 복사본이 서버의 메모리에 존재하도록 합니다.

4. 서버는 [`Configuration` 테이블이 변경될 때](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) 실행될 함수를 구독합니다. [이 함수](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168)는 `PostDeploy.s.sol`가 실행되고 테이블을 수정한 후에 호출됩니다.

5. 서버 초기화 함수가 구성을 가져오면 [`zkFunctions`를 호출](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35)하여 [서버의 영지식 부분](#using-zokrates-from-typescript)을 초기화합니다. 영지식 함수는 지뢰밭의 너비와 높이를 상수로 가져야 하므로 구성을 얻기 전에는 이 작업이 발생할 수 없습니다.

6. 서버의 영지식 부분이 초기화된 후 다음 단계는 [영지식 검증 컨트랙트를 블록체인에 배포](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53)하고 MUD에 검증자 주소를 설정하는 것입니다.

7. 마지막으로 업데이트를 구독하여 플레이어가 [새 게임 시작](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) 또는 [기존 게임에서 파내기](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108)를 요청할 때 확인할 수 있도록 합니다.

#### 새 게임 {#new-game-flow}

플레이어가 새 게임을 요청할 때 발생하는 일은 다음과 같습니다.

1. 이 플레이어에 대해 진행 중인 게임이 없거나 게임이 있지만 gameId가 0인 경우, 클라이언트는 [새 게임 버튼](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175)을 표시합니다. 사용자가 이 버튼을 누르면 [React는 `newGame` 함수를 실행](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)합니다.

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46)는 `System` 호출입니다. MUD에서 모든 호출은 `World` 컨트랙트를 통해 라우팅되며, 대부분의 경우 `<namespace>__<function name>`를 호출합니다. 이 경우 호출은 `app__newGame`로 이루어지며, MUD는 이를 [`GameSystem`의 `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22)로 라우팅합니다.

3. 온체인 함수는 플레이어에게 진행 중인 게임이 없는지 확인하고, 없다면 [`PendingGame` 테이블에 요청을 추가](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)합니다.

4. 서버는 `PendingGame`의 변경 사항을 감지하고 [구독된 함수를 실행](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)합니다. 이 함수는 [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114)를 호출하고, 이는 다시 [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144)를 호출합니다.

5. `createGame`가 가장 먼저 하는 일은 [적절한 수의 지뢰가 있는 무작위 지도를 생성](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)하는 것입니다. 그런 다음 [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166)를 호출하여 Zokrates에 필요한 빈 테두리가 있는 지도를 생성합니다. 마지막으로 `createGame`는 [`calculateMapHash`](#calculatemaphash)를 호출하여 지도의 해시를 가져오며, 이는 게임 ID로 사용됩니다.

6. `newGame` 함수는 새 게임을 `gamesInProgress`에 추가합니다.

7. 서버가 마지막으로 하는 일은 온체인에 있는 [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)를 호출하는 것입니다. 이 함수는 접근 제어를 활성화하기 위해 다른 `System`인 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)에 있습니다. 접근 제어는 [MUD 구성 파일](https://mud.dev/config)인 [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72)에 정의되어 있습니다.

   접근 목록은 단일 주소만 `System`를 호출하도록 허용합니다. 이는 서버 함수에 대한 접근을 단일 주소로 제한하여 아무도 서버를 사칭할 수 없게 합니다.

8. 온체인 컴포넌트는 관련 테이블을 업데이트합니다.

   - `PlayerGame`에 게임을 생성합니다.
   - `GamePlayer`에 역방향 매핑을 설정합니다.
   - `PendingGame`에서 요청을 제거합니다.

9. 서버는 `PendingGame`의 변경 사항을 식별하지만, [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60)가 false이므로 아무 작업도 수행하지 않습니다.

10. 클라이언트에서 [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148)는 플레이어 주소에 대한 `PlayerGame` 항목으로 설정됩니다. `PlayerGame`가 변경되면 `gameRecord`도 변경됩니다.

11. `gameRecord`에 값이 있고 게임에서 이기거나 지지 않은 경우, 클라이언트는 [지도를 표시](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)합니다.

#### 파내기 {#dig-flow}

1. 플레이어가 [지도 칸의 버튼을 클릭](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)하면 [`dig` 함수](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36)가 호출됩니다. 이 함수는 [온체인의 `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32)를 호출합니다.

2. 온체인 컴포넌트는 [여러 가지 온전성 검사를 수행](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)하고, 성공하면 파내기 요청을 [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31)에 추가합니다.

3. 서버는 [`PendingDig`의 변경 사항을 감지](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)합니다. [유효한 경우](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), [영지식 코드를 호출](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95)(아래 설명 참조)하여 결과와 그것이 유효하다는 증명을 모두 생성합니다.

4. [서버](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107)는 온체인의 [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64)를 호출합니다.

5. `digResponse`는 두 가지 작업을 수행합니다. 먼저 [영지식 증명](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61)을 확인합니다. 그런 다음 증명이 확인되면 [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86)를 호출하여 실제로 결과를 처리합니다.

6. `processDigResult`는 게임에서 [졌는지](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) 또는 [이겼는지](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) 확인하고, [온체인 지도인 `Map`를 업데이트](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)합니다.

7. 클라이언트는 업데이트를 자동으로 가져와 [플레이어에게 표시되는 지도를 업데이트](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)하며, 해당되는 경우 플레이어에게 승리 또는 패배 여부를 알려줍니다.

## Zokrates 사용하기 {#using-zokrates}

위에서 설명한 흐름에서는 영지식 부분을 블랙박스로 취급하고 건너뛰었습니다. 이제 그 상자를 열어 코드가 어떻게 작성되었는지 살펴보겠습니다.

### 맵 해싱 {#hashing-map}

우리가 사용하는 Zokrates 해시 함수인 [Poseidon](https://www.poseidon-hash.info)을 구현하기 위해 [이 JavaScript 코드](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise)를 사용할 수 있습니다. 하지만 이 방법이 더 빠르긴 해도, 단순히 Zokrates 해시 함수를 사용하는 것보다 더 복잡해질 것입니다. 이 글은 튜토리얼이므로 코드는 성능이 아닌 단순성에 최적화되어 있습니다. 따라서 두 개의 서로 다른 Zokrates 프로그램이 필요합니다. 하나는 단순히 맵의 해시를 계산하는 프로그램(`hash`)이고, 다른 하나는 맵의 특정 위치를 파낸 결과에 대한 영지식 증명을 실제로 생성하는 프로그램(`dig`)입니다.

### 해시 함수 {#hash-function}

이것은 맵의 해시를 계산하는 함수입니다. 이 코드를 한 줄씩 살펴보겠습니다.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

이 두 줄은 [Zokrates 표준 라이브러리](https://zokrates.github.io/toolbox/stdlib.html)에서 두 개의 함수를 가져옵니다. [첫 번째 함수](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok)는 [Poseidon 해시](https://www.poseidon-hash.info/)입니다. 이 함수는 [`field` 요소](https://zokrates.github.io/language/types.html#field)의 배열을 받아 `field`를 반환합니다.

Zokrates의 필드 요소는 일반적으로 256비트보다 작지만, 그 차이가 크지는 않습니다. 코드를 단순화하기 위해 맵을 최대 512비트로 제한하고, 4개의 필드로 구성된 배열을 해시하며, 각 필드에서는 128비트만 사용합니다. [`pack128` 함수](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok)는 이 목적을 위해 128비트 배열을 `field`로 변환합니다.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

이 줄은 함수 정의를 시작합니다. `hashMap`는 `map`이라는 단일 매개변수를 받는데, 이는 2차원 `bool`(ean) 배열입니다. 맵의 크기가 `width+2` 곱하기 `height+2`인 이유는 [아래에 설명되어 있습니다](#why-map-border).

Zokrates 프로그램이 이 애플리케이션에서 [템플릿 문자열](https://www.w3schools.com/js/js_string_templates.asp)로 저장되기 때문에 `${width+2}` 및 `${height+2}`를 사용할 수 있습니다. `${`와 `}` 사이의 코드는 JavaScript에 의해 평가되며, 이런 방식으로 프로그램을 다양한 맵 크기에 사용할 수 있습니다. 맵 매개변수는 폭탄이 없는 1칸 너비의 테두리로 둘러싸여 있으며, 이것이 너비와 높이에 2를 더해야 하는 이유입니다.

반환 값은 해시를 포함하는 `field`입니다.

```
bool[512] mut map1d = [false; 512];
```

맵은 2차원입니다. 하지만 `pack128` 함수는 2차원 배열에서 작동하지 않습니다. 따라서 먼저 `map1d`을 사용하여 맵을 512바이트 배열로 평탄화합니다. 기본적으로 Zokrates 변수는 상수이지만, 루프 내에서 이 배열에 값을 할당해야 하므로 이를 [`mut`](https://zokrates.github.io/language/variables.html#mutability)로 정의합니다.

Zokrates에는 `undefined`가 없기 때문에 배열을 초기화해야 합니다. `[false; 512]` 표현식은 [512개의 `false` 값으로 구성된 배열](https://zokrates.github.io/language/types.html#declaration-and-initialization)을 의미합니다.

```
u32 mut counter = 0;
```

또한 `map1d`에 이미 채운 비트와 아직 채우지 않은 비트를 구분하기 위한 카운터도 필요합니다.

```
for u32 x in 0..${width+2} {
```

이것이 Zokrates에서 [`for` 루프](https://zokrates.github.io/language/control_flow.html#for-loops)를 선언하는 방법입니다. Zokrates의 `for` 루프는 고정된 경계를 가져야 합니다. 루프처럼 보이지만 컴파일러가 실제로는 이를 "풀어서(unroll)" 처리하기 때문입니다. `width`는 컴파일러를 호출하기 전에 TypeScript 코드에 의해 설정되므로 `${width+2}` 표현식은 컴파일 타임 상수입니다.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

맵의 모든 위치에 대해 해당 값을 `map1d` 배열에 넣고 카운터를 증가시킵니다.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d`에서 4개의 `field` 값으로 구성된 배열을 생성하기 위해 `pack128`를 사용합니다. Zokrates에서 `array[a..b]`는 `a`에서 시작하여 `b-1`에서 끝나는 배열의 슬라이스를 의미합니다.

```
return poseidon(hashMe);
}
```

`poseidon`를 사용하여 이 배열을 해시로 변환합니다.

### 해시 프로그램 {#hash-program}

서버는 게임 식별자를 생성하기 위해 `hashMap`를 직접 호출해야 합니다. 하지만 Zokrates는 프로그램을 시작할 때 `main` 함수만 호출할 수 있으므로, 해시 함수를 호출하는 `main`가 포함된 프로그램을 만듭니다.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### 파내기 프로그램 {#dig-program}

이것은 애플리케이션의 영지식 부분의 핵심으로, 파내기 결과를 검증하는 데 사용되는 증명을 생성하는 곳입니다.

```
${hashFragment}

// 위치 (x,y)에 있는 지뢰의 수
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### 맵 테두리가 필요한 이유 {#why-map-border}

영지식 증명은 [산술 회로](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)를 사용하는데, 여기에는 `if` 문에 해당하는 간단한 기능이 없습니다. 대신 [조건 연산자](https://en.wikipedia.org/wiki/Ternary_conditional_operator)와 동등한 기능을 사용합니다. `a`가 0 또는 1이 될 수 있다면, `if a { b } else { c }`를 `ab+(1-a)c`로 계산할 수 있습니다.

이 때문에 Zokrates의 `if` 문은 항상 두 분기를 모두 평가합니다. 예를 들어, 다음과 같은 코드가 있다고 가정해 보겠습니다.

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

이 코드는 오류를 발생시킵니다. 나중에 그 값에 0을 곱하게 되더라도 `arr[10]`를 계산해야 하기 때문입니다.

이것이 맵 전체에 1칸 너비의 테두리가 필요한 이유입니다. 특정 위치 주변의 총 지뢰 수를 계산해야 하며, 이는 파내려는 위치의 위아래 한 행과 좌우 위치를 확인해야 함을 의미합니다. 즉, Zokrates에 제공되는 맵 배열에 해당 위치들이 존재해야 합니다.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

기본적으로 Zokrates 증명에는 입력값이 포함됩니다. 실제로 어떤 지점인지 알지 못한다면 특정 지점 주변에 5개의 지뢰가 있다는 것을 아는 것은 아무 소용이 없습니다(증명자가 다른 값을 사용하고 알려주지 않을 수 있으므로 단순히 요청과 일치시킬 수만은 없습니다). 하지만 Zokrates에 맵을 제공하면서도 맵을 비밀로 유지해야 합니다. 해결책은 증명에 의해 공개되지 _않는_ `private` 매개변수를 사용하는 것입니다.

이는 또 다른 악용의 여지를 엽니다. 증명자가 올바른 좌표를 사용하되, 해당 위치 주변이나 심지어 그 위치 자체에 임의의 개수의 지뢰가 있는 맵을 생성할 수 있습니다. 이러한 악용을 방지하기 위해 영지식 증명에 게임 식별자인 맵의 해시를 포함시킵니다.

```
return (hashMap(map),
```

여기서 반환 값은 파내기 결과뿐만 아니라 맵 해시 배열을 포함하는 튜플입니다.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

해당 위치 자체에 폭탄이 있는 경우를 위한 특수 값으로 255를 사용합니다.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

플레이어가 지뢰를 건드리지 않았다면, 해당 위치 주변 영역의 지뢰 수를 더하여 반환합니다.

### TypeScript에서 Zokrates 사용하기 {#using-zokrates-from-typescript}

Zokrates에는 명령줄 인터페이스가 있지만, 이 프로그램에서는 [TypeScript 코드](https://zokrates.github.io/toolbox/zokrates_js.html) 내에서 사용합니다.

Zokrates 정의를 포함하는 라이브러리는 [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts)라고 합니다.

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript 바인딩](https://zokrates.github.io/toolbox/zokrates_js.html)을 가져옵니다. 모든 Zokrates 정의로 확인되는 프로미스(promise)를 반환하기 때문에 [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) 함수만 필요합니다.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates 자체와 마찬가지로, 우리도 단 하나의 함수만 내보내며 이 역시 [비동기적](https://www.w3schools.com/js/js_async.asp)입니다. 이 함수가 최종적으로 반환될 때, 아래에서 볼 수 있듯이 여러 함수를 제공합니다.

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates를 초기화하고, 라이브러리에서 필요한 모든 것을 가져옵니다.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

다음으로 위에서 본 해시 함수와 두 개의 Zokrates 프로그램이 있습니다.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

여기서 해당 프로그램들을 컴파일합니다.

```typescript
// 영지식 검증을 위한 키를 생성합니다.
// 프로덕션 시스템에서는 셋업 세리머니를 사용하는 것이 좋습니다.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

프로덕션 시스템에서는 더 복잡한 [설정 세리머니(setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)를 사용할 수 있지만, 데모용으로는 이것으로 충분합니다. 사용자가 증명자 키를 알 수 있다는 것은 문제가 되지 않습니다. 사실이 아닌 이상 여전히 무언가를 증명하는 데 사용할 수 없기 때문입니다. 엔트로피(두 번째 매개변수인 `""`)를 지정하기 때문에 결과는 항상 동일하게 유지됩니다.

**참고:** Zokrates 프로그램 컴파일과 키 생성은 느린 프로세스입니다. 매번 반복할 필요는 없으며 맵 크기가 변경될 때만 수행하면 됩니다. 프로덕션 시스템에서는 한 번만 수행한 다음 그 출력을 저장할 것입니다. 여기서 그렇게 하지 않는 유일한 이유는 단순성을 위해서입니다.

#### `calculateMapHash` {#calculatemaphash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) 함수는 실제로 Zokrates 프로그램을 실행합니다. 이 함수는 두 개의 필드가 있는 구조체를 반환합니다. 하나는 프로그램의 출력을 JSON 문자열로 나타내는 `output`이고, 다른 하나는 결과에 대한 영지식 증명을 생성하는 데 필요한 정보인 `witness`입니다. 여기서는 출력만 필요합니다.

출력은 따옴표로 묶인 십진수인 `"31337"` 형태의 문자열입니다. 하지만 `viem`에 필요한 출력은 `0x60A7` 형태의 16진수입니다. 따라서 `.slice(1,-1)`를 사용하여 따옴표를 제거한 다음, `BigInt`를 사용하여 십진수인 나머지 문자열을 [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)로 변환합니다. `.toString(16)`는 이 `BigInt`를 16진수 문자열로 변환하고, `"0x"+`는 16진수 마커를 추가합니다.

```typescript
// 파내고 결과에 대한 영지식 증명을 반환합니다.
// (서버 측 코드)
```

영지식 증명에는 공개 입력(`x` 및 `y`)과 결과(맵의 해시 및 폭탄 수)가 포함됩니다.

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates에서 인덱스가 범위를 벗어났는지 확인하는 것은 문제가 되므로, 여기서 확인합니다.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

파내기 프로그램을 실행합니다.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy)를 사용하고 증명을 반환합니다.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Solidity 검증자는 블록체인에 배포하여 `digCompiled.program`에 의해 생성된 증명을 검증하는 데 사용할 수 있는 스마트 컨트랙트입니다.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

마지막으로, 다른 코드에서 필요할 수 있는 모든 것을 반환합니다.

## 보안 테스트 {#security-tests}

보안 테스트는 중요합니다. 기능 버그는 결국 드러나기 마련이지만, 애플리케이션이 안전하지 않다면 누군가 부정행위를 저질러 다른 사람의 자원을 빼돌리기 전까지 오랫동안 숨겨져 있을 가능성이 높기 때문입니다.

### 권한 {#permissions}

이 게임에는 서버라는 하나의 특권 엔티티가 있습니다. 서버는 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)의 함수를 호출할 수 있는 유일한 사용자입니다. [`cast`](https://book.getfoundry.sh/cast/)를 사용하여 허가형(permissioned) 함수에 대한 호출이 서버 계정으로만 허용되는지 확인할 수 있습니다.

[서버의 개인 키는 `setupNetwork.ts`에 있습니다](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. `anvil`(블록체인)를 실행하는 컴퓨터에서 다음 환경 변수를 설정합니다.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. `cast`를 사용하여 검증자 주소를 승인되지 않은 주소로 설정해 봅니다.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast`가 실패를 보고할 뿐만 아니라, 브라우저의 게임에서 **MUD Dev Tools**를 열고 **Tables**를 클릭한 다음 **app\_\_VerifierAddress**를 선택하여 확인할 수도 있습니다. 주소가 0이 아닌 것을 확인하세요.

3. 검증자 주소를 서버의 주소로 설정합니다.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   이제 **app\_\_VerifiedAddress**의 주소는 0이어야 합니다.

동일한 `System` 내의 모든 MUD 함수는 동일한 접근 제어를 거치므로, 이 테스트만으로 충분하다고 생각합니다. 그렇지 않다면 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)에 있는 다른 함수들을 확인할 수 있습니다.

### 영지식 악용 {#zero-knowledge-abuses}

Zokrates를 검증하는 수학은 이 튜토리얼의 범위(그리고 제 능력)를 벗어납니다. 하지만 영지식 코드에 대해 다양한 검사를 실행하여 올바르게 수행되지 않으면 실패하는지 확인할 수 있습니다. 이러한 모든 테스트를 수행하려면 [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts)를 변경하고 전체 애플리케이션을 다시 시작해야 합니다. 서버 프로세스를 다시 시작하는 것만으로는 충분하지 않은데, 이는 애플리케이션을 불가능한 상태(플레이어는 게임을 진행 중이지만 서버에서는 더 이상 해당 게임을 사용할 수 없음)로 만들기 때문입니다.

#### 잘못된 답변 {#wrong-answer}

가장 간단한 가능성은 영지식 증명에서 잘못된 답변을 제공하는 것입니다. 이를 위해 `zkDig` 내부로 들어가 [91번째 줄을 수정](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91)합니다.

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

이는 정답에 관계없이 항상 폭탄이 하나 있다고 청구한다는 의미입니다. 이 버전으로 플레이해 보면 `pnpm dev` 화면의 **server** 탭에서 다음과 같은 오류를 볼 수 있습니다.

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

따라서 이런 종류의 속임수는 실패합니다.

#### 잘못된 증명 {#wrong-proof}

올바른 정보를 제공하지만 증명 데이터만 잘못된 경우에는 어떻게 될까요? 이제 91번째 줄을 다음으로 바꿉니다.

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

여전히 실패하지만, 검증자 호출 중에 발생하기 때문에 이제는 이유 없이 실패합니다.

### 사용자는 제로 트러스트 코드를 어떻게 검증할 수 있나요? {#user-verify-zero-trust}

스마트 컨트랙트는 비교적 검증하기 쉽습니다. 일반적으로 개발자는 소스 코드를 블록 탐색기에 게시하고, 블록 탐색기는 소스 코드가 [컨트랙트 배포 트랜잭션](/developers/docs/smart-contracts/deploying/)의 코드로 컴파일되는지 확인합니다. MUD `System`의 경우 이는 [약간 더 복잡](https://mud.dev/cli/verify)하지만, 크게 다르지는 않습니다.

영지식의 경우 이는 더 어렵습니다. 검증자는 일부 상수를 포함하고 그에 대한 계산을 실행합니다. 이것만으로는 무엇이 증명되고 있는지 알 수 없습니다.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

해결책은, 적어도 블록 탐색기가 사용자 인터페이스에 Zokrates 검증을 추가할 때까지는, 애플리케이션 개발자가 Zokrates 프로그램을 사용할 수 있게 하고 최소한 일부 사용자가 적절한 검증 키를 사용하여 직접 컴파일하도록 하는 것입니다.

방법은 다음과 같습니다.

1. [Zokrates를 설치합니다](https://zokrates.github.io/gettingstarted.html).
2. Zokrates 프로그램이 포함된 `dig.zok` 파일을 생성합니다. 아래 코드는 원래 맵 크기인 10x5를 유지했다고 가정합니다.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // 위치 (x,y)에 있는 지뢰의 수
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Zokrates 코드를 컴파일하고 검증 키를 생성합니다. 검증 키는 원본 서버에서 사용된 것과 동일한 엔트로피로 생성되어야 하며, [이 경우에는 빈 문자열](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)입니다.

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. 직접 Solidity 검증자를 생성하고, 블록체인에 있는 것과 기능적으로 동일한지 확인합니다(서버가 주석을 추가하지만 이는 중요하지 않습니다).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## 설계 결정 {#design}

충분히 복잡한 애플리케이션에는 항상 절충안(trade-off)이 필요한 상충하는 설계 목표들이 존재합니다. 몇 가지 절충안을 살펴보고, 현재 솔루션이 다른 옵션보다 더 나은 이유를 알아보겠습니다.

### 왜 영지식인가 {#why-zero-knowledge}

지뢰찾기 게임에서는 사실 영지식이 필요하지 않습니다. 서버가 항상 맵을 가지고 있다가 게임이 끝났을 때 전체를 공개하면 됩니다. 그런 다음 게임이 끝날 때 스마트 컨트랙트가 맵 해시를 계산하고 일치하는지 확인한 후, 일치하지 않으면 서버에 페널티를 주거나 게임을 완전히 무효화할 수 있습니다.

이처럼 더 간단한 솔루션을 사용하지 않은 이유는, 종료 상태가 명확하게 정의된 짧은 게임에서만 작동하기 때문입니다. 게임이 잠재적으로 무한할 때([자율 세계(autonomous worlds)](https://0xparc.org/blog/autonomous-worlds)의 경우처럼), 상태를 드러내지 _않고_ 증명하는 솔루션이 필요합니다.

튜토리얼로서 이 글은 이해하기 쉬운 짧은 게임이 필요했지만, 이 기술은 더 긴 게임에서 가장 유용합니다.

### 왜 Zokrates인가? {#why-zokrates}

[Zokrates](https://zokrates.github.io/)가 사용 가능한 유일한 영지식 라이브러리는 아니지만, 일반적인 [명령형](https://en.wikipedia.org/wiki/Imperative_programming) 프로그래밍 언어와 유사하며 불리언(boolean) 변수를 지원합니다.

요구 사항이 다른 여러분의 애플리케이션에서는 [Circum](https://docs.circom.io/getting-started/installation/)이나 [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/)를 사용하는 것을 선호할 수도 있습니다.

### Zokrates 컴파일 시점 {#when-compile-zokrates}

이 프로그램에서는 [서버가 시작될 때마다](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) Zokrates 프로그램을 컴파일합니다. 이는 분명한 리소스 낭비이지만, 단순성에 최적화된 튜토리얼이기 때문입니다.

만약 프로덕션 수준의 애플리케이션을 작성한다면, 해당 지뢰밭 크기에 맞게 컴파일된 Zokrates 프로그램 파일이 있는지 확인하고, 있다면 그것을 사용할 것입니다. 검증자 컨트랙트를 온체인에 배포할 때도 마찬가지입니다.

### 검증자 및 증명자 키 생성 {#key-creation}

[키 생성](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69)은 주어진 지뢰밭 크기에 대해 한 번 이상 수행할 필요가 없는 또 다른 순수 계산입니다. 이 역시 단순성을 위해 한 번만 수행됩니다.

추가로, [설정 세리머니(setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)를 사용할 수도 있습니다. 설정 세리머니의 장점은 영지식 증명을 속이려면 각 참여자의 엔트로피나 중간 결과가 필요하다는 것입니다. 세리머니 참여자 중 최소 한 명이라도 정직하게 해당 정보를 삭제한다면, 영지식 증명은 특정 공격으로부터 안전해집니다. 하지만 정보가 모든 곳에서 삭제되었는지 확인할 수 있는 _메커니즘은 없습니다_. 영지식 증명이 매우 중요하다면 설정 세리머니에 참여하는 것이 좋습니다.

여기서는 수십 명의 참여자가 있었던 [영구적인 타우의 거듭제곱(perpetual powers of tau)](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)에 의존합니다. 이는 아마도 충분히 안전하고 훨씬 더 간단할 것입니다. 또한 키 생성 과정에서 엔트로피를 추가하지 않으므로, 사용자가 [영지식 구성을 검증](#user-verify-zero-trust)하기가 더 쉽습니다.

### 검증 위치 {#where-verification}

영지식 증명은 온체인(가스 비용 발생) 또는 클라이언트([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) 사용)에서 검증할 수 있습니다. 저는 첫 번째 방법을 선택했는데, 이 방법을 사용하면 [검증자를 검증](#user-verify-zero-trust)한 후 해당 컨트랙트 주소가 동일하게 유지되는 한 변경되지 않는다고 신뢰할 수 있기 때문입니다. 클라이언트에서 검증을 수행한다면, 클라이언트를 다운로드할 때마다 수신하는 코드를 검증해야 합니다.

또한, 이 게임은 싱글 플레이어 게임이지만 많은 블록체인 게임은 멀티 플레이어 게임입니다. 온체인 검증은 영지식 증명을 한 번만 검증한다는 것을 의미합니다. 클라이언트에서 수행하면 각 클라이언트가 독립적으로 검증해야 합니다.

### TypeScript와 Zokrates 중 어디에서 맵을 평탄화할 것인가? {#where-flatten}

일반적으로 TypeScript나 Zokrates 중 어느 곳에서든 처리가 가능할 때는, 훨씬 빠르고 영지식 증명이 필요 없는 TypeScript에서 처리하는 것이 좋습니다. 예를 들어, Zokrates에 해시를 제공하고 그것이 올바른지 검증하도록 하지 않는 이유가 바로 이것입니다. 해싱은 Zokrates 내부에서 수행되어야 하지만, 반환된 해시와 온체인 해시 간의 일치 여부 확인은 그 외부에서 이루어질 수 있습니다.

하지만 TypeScript에서 할 수 있었음에도 불구하고, 우리는 여전히 [Zokrates에서 맵을 평탄화(flatten)](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)합니다. 그 이유는 제 생각에 다른 옵션들이 더 나쁘기 때문입니다.

- Zokrates 코드에 1차원 불리언 배열을 제공하고, `x*(height+2)
+y`와 같은 표현식을 사용하여 2차원 맵을 얻습니다. 이렇게 하면 [코드](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47)가 다소 복잡해지므로, 튜토리얼에서는 성능 향상이 그만한 가치가 없다고 판단했습니다.

- Zokrates에 1차원 배열과 2차원 배열을 모두 보냅니다. 하지만 이 솔루션은 우리에게 아무런 이점도 주지 않습니다. Zokrates 코드는 제공된 1차원 배열이 2차원 배열의 올바른 표현인지 검증해야 합니다. 따라서 성능 향상은 없을 것입니다.

- Zokrates에서 2차원 배열을 평탄화합니다. 이것이 가장 간단한 옵션이므로 이를 선택했습니다.

### 맵 저장 위치 {#where-store-maps}

이 애플리케이션에서 [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20)는 단순히 메모리에 있는 변수입니다. 즉, 서버가 다운되어 다시 시작해야 하는 경우 저장된 모든 정보가 손실됩니다. 플레이어는 게임을 계속할 수 없을 뿐만 아니라, 온체인 컴포넌트가 여전히 게임이 진행 중이라고 생각하기 때문에 새 게임을 시작할 수도 없습니다.

이는 데이터베이스에 이 정보를 저장해야 하는 프로덕션 시스템에서는 분명히 잘못된 설계입니다. 여기서 변수를 사용한 유일한 이유는 이것이 튜토리얼이고 단순성이 주요 고려 사항이기 때문입니다.

## 결론: 어떤 조건에서 이 기술이 적절할까요? {#conclusion}

이제 온체인에 속하지 않는 비밀 상태를 저장하는 서버를 사용하여 게임을 작성하는 방법을 알게 되었습니다. 그렇다면 어떤 경우에 이 방법을 사용해야 할까요? 두 가지 주요 고려 사항이 있습니다.

- _장기 실행 게임_: [위에서 언급했듯이](#why-zero-knowledge), 짧은 게임에서는 게임이 끝난 후 상태를 게시하고 모든 것을 검증할 수 있습니다. 하지만 게임이 길거나 무기한으로 진행되고 상태를 비밀로 유지해야 하는 경우에는 이 방법을 사용할 수 없습니다.

- _어느 정도의 중앙화 허용_: 영지식 증명은 무결성을 검증하여 엔티티가 결과를 조작하지 않았음을 확인할 수 있습니다. 하지만 엔티티가 계속 사용 가능하고 메시지에 응답할 것이라고 보장할 수는 없습니다. 가용성 또한 탈중앙화되어야 하는 상황에서는 영지식 증명만으로는 충분한 해결책이 될 수 없으며, [다자간 컴퓨팅(multi-party computation)](https://en.wikipedia.org/wiki/Secure_multi-party_computation)이 필요합니다.

[제 작업물은 여기에서 더 확인하실 수 있습니다](https://cryptodocguy.pro/).

### 감사의 글 {#acknowledgements}

- Alvaro Alonso는 이 글의 초안을 읽고 Zokrates에 대한 제 오해를 바로잡아 주었습니다.

남아있는 모든 오류는 제 책임입니다.