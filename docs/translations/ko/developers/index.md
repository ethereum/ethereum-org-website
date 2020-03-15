---
title: 개발자 가이드
meta:
  - property: og:title
    content: 개발자 가이드 | 이더리움
lang: ko
sidebar: auto
sidebarDepth: 0
---

# 개발자 리소스 {#developer-resources}

<div class="featured">이더리움 위에서 개발하는 개발자들을 위한 가이드와 개발 도구 그리고 각종 자료를 다룹니다.</div>

## 시작하면서 {#getting-started}

**만약 당신이 이더리움을 처음 개발해보신다면, 여기 제대로 찾아오셨습니다.** 이더리움 커뮤니티에 의해 쓰여진 이 가이드들은 이더리움 기술 스택에 대한 기초부터 기존의 앱 개발과는 다를지도 모르는 새로운 개념들을 소개해 줄 거에요.

좀 더 준비운동이 필요하시다고요? 그럼 [ethereum.org/ko/learn](/ko/learn/)로 들어와 주세요.

- [이더리움 쫓아가기](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe) _Aug 7, 2017 - Matt Condon_
- [이더리움 In Depth, 파트 1](https://blog.zeppelin.solutions/ethereum-in-depth-part-1-968981e6f833) _May 11, 2018 - Facu Spagnuolo_
- [이더리움 In Depth, 파트 2](https://blog.zeppelin.solutions/ethereum-in-depth-part-1-968981e6f833) _May 11, 2018 - Facu Spagnuolo_
- [이더리움 개발 연습, 파트 1-5](https://hackernoon.com/ethereum-development-walkthrough-part-1-smart-contracts-b3979e6e573e) _Jan 14, 2018 - dev_zl_
- [이더리움 101, Parts 1-7](https://kauri.io/collection/5bb65f0f4f34080001731dc2/ethereum-101) _Feb 13, 2019 - Wil Barnes_
- [풀스택 Hello World 투표 이더리움 Dapp 튜토리얼 ](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) _Jan 18, 2017 - Mahesh Murthy_
- [마스터링 이더리움 - 온라인으로 무료로 제공되는 포괄적인 교과서](https://github.com/ethereumbook/ethereumbook) _Dec 1, 2018 - Andreas Antonopoulos & Gavin Wood_
- [이더리움 개발자 포탈 - 이더리움 개발을 시작할 때 필요한 모든 것](https://ethereum.consensys.net/ethereum-dev-portal) _Updated often - ConsenSys_
- [솔리디티 컨트랙트를 해부해보면서](https://blog.zeppelin.solutions/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737) _Aug 13, 2018 - Alejandro Santander & Leo Arias_
- [풀스택 Dapp 튜토리얼 시리즈 ](https://kauri.io/collection/5b8e401ee727370001c942e3) _Updated Often - Joshua Cassidy_

## 스마트 컨트랙트 언어들 {#smart-contract-languages}

이더리움 가상 머신(EVM)에서 작동되는 프로그램들은 흔히 "스마트 컨트랙트(smart contract)"라고 불립니다. 이더리움 위에서 쓰여지는 스마트 컨트랙트 언어로는 **Solidity(솔리디티)** 와 **Vyper(바이퍼)** 가 있지만, [다른 언어들도 매우 활발하게 개발되고 있습니다](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages).

### 솔리디티(Solidity): _C++, 파이썬(Python), 자바스크립트(JavaScript) 로부터 영감을 얻은 이더리움에서 가장 인기 있는 언어_

- [개발문서](https://solidity.readthedocs.io)
- [깃허브](https://github.com/ethereum/solidity/)
- [솔리디티 깃터 채팅방](https://gitter.im/ethereum/solidity/)

### 바이퍼(Vyper) _파이썬 기반으로 보안에 집중한 이더리움 개발 언어_

- [개발문서](https://vyper.readthedocs.io)
- [깃허브](https://github.com/ethereum/vyper)
- [바이퍼 깃터 채팅방](https://gitter.im/ethereum/vyper)

### 추가자료 찾으세요?

- [이더리움 개발자 툴 리스트 #스마트 컨트랙트 언어들(SmartContractLanguages)](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)

## 개발자 도구 {#developer-tools}

이더리움은 개발자들이 애플리케이션을 빌드, 테스트 및 배포하는 것을 도와줄 수 있는 다양한 도구를 가지고 있고 또 많은 도구가 계속 생겨나고 있습니다. 아래는 개발을 시작할 때 가장 인기 있는 도구들을 모아놓은 것들입니다. 더 깊게 알고 싶다면 이 [목록](https://github.com/ConsenSys/ethereum-developer-tools-list)을 참고해 주세요.

### 트러플(Truffle) _개발 환경, 테스팅 프레임워크, 빌드 파이프라인(pipeline)과 각종 개발 도구들_ {#frameworks}

- [홈페이지](https://truffleframework.com/)
- [깃허브](https://github.com/trufflesuite/truffle)

### 엠바크(Embark) _개발환경, 테스트 프레임워크, 이더리움, IPFS, Whisper와 통합된 각종 개발 도구들_ {#other-tools}

- [깃허브](https://github.com/embark-framework/embark)
- [개발문서](https://embark.status.im/docs/)

### 와플(Waffle) _고급 스마트 컨트랙트 개발 및 테스트 프레임워크(ethers.js 기반)._

- [홈페이지](https://getwaffle.io/)
- [깃허브](https://github.com/EthWorks/Waffle)

### 이더라임(Etherlime) _탈중앙애플리케이션의 개발(솔리디티, 바이퍼), 배포, 디버깅, 테스트 등을 위한 Ethers.js 기반의 개발 프레임워크_

- [개발문서](https://etherlime.readthedocs.io/en/latest/)
- [깃허브](https://github.com/LimeChain/etherlime)

### 비들러(Buidler) _이더리움 스마트 컨트랙트 개발자를 위한 작업 자동화 도구_

- [홈페이지](https://buidler.dev)
- [깃허브](https://github.com/nomiclabs/buidler)

### 제플린OS(ZeppelinOS) _업그레이드 가능한 스마트 컨트랙트 개발 및 컨트랙트의 안전한 관리를 위한 개발 프레임워크_

- [홈페이지](https://zeppelinos.org)
- [깃허브](https://github.com/zeppelinos)
- [커뮤니티 포럼](https://forum.zeppelin.solutions/c/zeppelinos)

### 추가자료 찾으세요?

- [이더리움 개발 도구 목록 #프레임워크(FrameWorks)](https://github.com/ConsenSys/ethereum-developer-tools-list#frameworks)

## 통합 개발 환경 (IDEs) {#integrated-development-environments-ides}

### 비주얼 스튜디오 코드(Visual Studio Code) _공식적으로 이더리움을 지원하는 전문 크로스플랫폼(cross-platform) 통합개발환경_ {#frameworks}

- [비주얼 스튜디오 코드](https://code.visualstudio.com/)
- [애저(Azure) 블록체인 워크벤치 플러그인](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview)
- [샘플 코드](https://github.com/Azure-Samples/blockchain/blob/master/blockchain-workbench/application-and-smart-contract-samples/readme.md)

### 리믹스(Remix) _정적 분석 도구와 테스트용 블록체인 가상 머신을 포함하는 웹 기반 통합개발환경_ {#other-tools}

- [홈페이지](https://remix.ethereum.org/)

### 슈퍼블록스(Superblocks) _웹 기반 통합개발환경으로 브라우저 빌트인 형태의 블록체인 가상머신, 메타마스트(MetaMask) 통합, 전송 로그 기록 등의 다양한 기능을 포함_

- [홈페이지](https://superblocks.com/lab/)

### 이드피들(EthFiddle) _스마트 컨트랙트를 작성하고 컴파일하고 다른 사람들에게 알릴 수 있는 웹 기반 통합개발환경_

- [홈페이지](https://ethfiddle.com/)

### 추가자료 찾으세요?

- [이더리움 개발 툴 리스트 #통합개발환경들(IDEs)](https://github.com/ConsenSys/ethereum-developer-tools-list#ides)

## 프론트엔드 자바스크립트 API {#frontend-javascript-apis}

### Web3.js _이더리움 자바스크립트 API_

- [깃허브](https://github.com/ethereum/web3.js/)
- [개발문서](https://web3js.readthedocs.io/en/1.0/)

### Ethers.js _자바스크립트와 타입스크립트로 짜여진 완전한 이더리움 지갑 구현체와 각종 유틸리티 도구들_

- [깃허브](https://github.com/ethers-io/ethers.js/)
- [개발문서](https://docs.ethers.io/ethers.js/html/)

### light.js _라이트 클라이언트에 최적화된 고수준 반응형 자바스크립트 라이브러리_

- [깃허브](https://github.com/paritytech/js-libs/tree/master/packages/light.js)
- [개발문서](https://paritytech.github.io/js-libs/light.js/)

### Web3-wrapper _Web3.js의 타입스크립트 버전_

- [깃허브](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)
- [개발문서](https://0x.org/docs/web3-wrapper#introduction)

### 추가자료 찾으세요?

- [이더리움 개발 도구 목록 #프론트엔드이더리움API(Frontend-Ethereum-APIs)](https://github.com/ConsenSys/ethereum-developer-tools-list#frontend-ethereum-apis)

## 백엔드 API {#backend-apis}

### 인퓨라(Infura) _이더리움 API 서비스(AaaS, API as a Service)_

- [홈페이지](https://infura.io)

## 보안 도구 {#security-tools}

### 스릿터(Slither) _파이썬3으로 작성된 솔리디티 정적분석 프레임워크_ {#smart-contract-security}

- [깃허브](https://github.com/crytic/slither)

### 미스엑스(MythX) _이더리움 스마트 컨트랙트를 위한 보안 분석 API_ {#formal-verification}

- [홈페이지](https://mythx.io/)

### 만티코어(Manticore) _스마트 컨트렉트 및 바이너리에 대한 기호 실행(Symbolic Execution) 명령줄 도구_

- [깃허브](https://github.com/trailofbits/manticore)

### 시큐리파이(Securify) _이더리움 스마트 컨트렉트를 위한 보안 스캐너_

- [홈페이지](https://securify.chainsecurity.com/)

### 형식 검증에 대한 추가 정보

- [스마트 컨트랙트에서는 어떻게 형식 검증을 진행하는가? ](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _2018년 7월 20일 - 브라이언 머릭(Brian Marick)_
- [어떻게 형식 검증을 통해 스마트 컨트랙트의 무결성을 보장할 수 있을까? ](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _2018년 1월 29일 - 버나드 뮐러(Bernard Mueller)_

### 추가자료 찾으세요?

- [이더리움 개발 도구 목록 #보안도구](https://github.com/ConsenSys/ethereum-developer-tools-list#security-tools)

## 테스트 도구 {#testing-tools}

### 솔리디티 커버리지(Solidity-Coverage) _또다른 솔리디티 코드 커버리지 측정 도구_

- [깃허브](https://github.com/sc-forks/solidity-coverage)

### hevm _유닛 테스트 및 스마트 컨트랙트 디버깅을 위해 특별히 만들어진 EVM_

- [깃허브](https://github.com/dapphub/dapptools/tree/master/src/hevm)

### 화이트블록 제네시스(Whiteblock Genesis) _블록체인을 위한 엔드 투 엔드(end-to-end) 개발 샌드박스(sandbox) 및 테스팅 플랫폼_

- [홈페이지](https://whiteblock.io)
- [깃허브](https://github.com/whiteblock/genesis)
- [개발문서](https://docs.whiteblock.io)

### 추가자료 찾으세요?

- [이더리움 개발 도구 목록 #테스트도구(Testing-Tools)](https://github.com/ConsenSys/ethereum-developer-tools-list#testing-tools)

## 블록 탐색기 {#block-explorers}

블록 탐색기는 특정 거래, 블록, 컨트랙트 및 기타 온체인(on-chain) 활동에 대한 정보를 검색하여 이더리움 블록체인(테스트넷 포함)을 탐색할 수 있게 해주는 서비스입니다.

- [이더스캔](https://etherscan.io/)
- [블록스카우트](https://blockscout.com/)
- [이더체인](https://www.etherchain.org/)

## 테스트넷과 파우셋(Faucets) {#testnets-and-faucets}

이더리움 커뮤니티는 여러 개의 테스트넷을 관리합니다. 테스트넷은 개발자들이 이더리움 메인넷에 배포하기 전, 애플리케이션을 여러 가지 다른 조건하에 테스트하는 것에 사용됩니다.

### 롭스텐(Ropsten) _작업 증명(Proof of Work) 블록체인, 테스트 이더 채굴 가능_

- [테스트 이더 파우셋](https://faucet.ropsten.be/)

### 링크비(Rinkeby) _권한 증명(Proof of Authority) 블록체인, 게스(Geth) 개발팀에 의해 유지_

- [테스트 이더 파우셋](https://faucet.rinkeby.io/)

### 고얼리(Goerli) _크로스 클라이언트 권한 증명 블록체인, 고얼리 커뮤니티가 만들고 관리_

- [테스트 이더 파우셋](https://faucet.goerli.mudit.blog/)
- [홈페이지](https://goerli.net/)

## 클라이언트 & 나만의 노드를 직접 운영하기 {#clients--running-your-own-node}

이더리움 네트워크는 호환 가능한 클라이언트 소프트웨어를 실행하는 수많은 노드로 구성되어 있습니다. 대부분의 노드는 [ 게스(Geth) ](https://geth.ethereum.org/) 또는 [ 패리티(Parity)](https://www.parity.io/ethereum/) 클라이언트를 구동하고 있으며 각각 니즈에 따라 다양한 방식으로 구성되어 사용할 수 있습니다.

### 게스(Geth) _고(Go) 언어로 작성된 이더리움 클라이언트_ {#clients}

- [깃허브](https://github.com/ethereum/go-ethereum)
- [디스코드 채팅](https://discordapp.com/invite/nthXNEv)

### 패리티(Parity) _러스트(Rust)언어로 작성된 이더리움 클라이언트_ {#running-your-own-node}

- [홈페이지](https://www.parity.io/)
- [깃허브](https://github.com/paritytech/parity-ethereum)

### 이드노드(Ethnode) _로컬 개발 환경을 위한 이더리움 노드(게스 또는 패리티) 구동 도구_

- [깃허브](https://github.com/vrde/ethnode)

### 이더리움 노드 자료

- [노드 구성 요약](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _2019년 1월 5일 - 아프리 쇼든(Afri Schoeden)_

### 추가자료 찾으세요?

- [이더리움 개발 도구 목록 #이더리움클라이언트(Ethereum-clients)](https://github.com/ConsenSys/ethereum-developer-tools-list#ethereum-clients)

## 모범 사례, 패턴 및 안티 패턴(Anti-patterns) {#best-practices-patterns-and-anti-patterns}

### 댑시스(DappSys) _스마트 컨트랙트 개발에 사용할 수 있는 안전하고 단순 유연한 솔리디티 조각모음_ {#smart-contracts}

- [개발문서](https://dapp.tools/dappsys/)
- [깃허브](https://github.com/dapphub/dappsys)

### 오픈제플린(OpenZeppelin) _안전한 스마트 컨트랙트 개발을 위한 라이브러리_ {#security}

- [홈페이지](https://openzeppelin.org/)
- [깃허브](https://github.com/OpenZeppelin/openzeppelin-solidity)

### 아라곤OS(aragonOS) _업그레이드와 권한 제어를 위한 패턴_

- [홈페이지](https://hack.aragon.org/docs/aragonos-intro.html)

### 스마트 컨트랙트 취약점 레지스트리(Registry)

- [스마트컨트랙트 취약점 분류 레지스트리(Smart-contract Weakness Classification Registry, SWC Registry)](https://smartcontractsecurity.github.io/SWC-registry/)
- [깃허브](https://github.com/SmartContractSecurity/SWC-registry)

### 스마트 컨트랙트 보안 모범 사례 가이드

- [컨센시스(ConsenSys) 개발문서](https://consensys.github.io/smart-contract-best-practices/)
- [깃허브](https://github.com/ConsenSys/smart-contract-best-practices/)
- [보안 권장 사항 모음 및 모범 사례](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

### 추가자료 찾으세요?

- [이더리움 개발 도구 목록 #모범사례패턴(Patterns—best-practices)](https://github.com/ConsenSys/ethereum-developer-tools-list#patterns--best-practices)

## 개발자 지원 & 훈련 {#developer-support--training}

### 이더리움 스택익스체인지(Ethereum Stackexchange) {#general-learning}

- [홈페이지](https://ethereum.stackexchange.com/)

### 솔리디티 깃터 채팅방 {#game-based-learning}

- [깃터 채팅방](https://gitter.im/ethereum/solidity/)

### 이더리움 깃터 채팅방

- [깃터 채팅방](https://gitter.im/ethereum/home)

### 크립토좀비(Cryptozombies) _이더리움 위에서 게임으로 코드를 배우세요_

- [홈페이지](https://cryptozombies.io/)

### 체인샷(Chainshot) _웹 기반 탈중앙애플리케이션 코딩 튜토리얼_

- [홈페이지](https://www.chainshot.com/)

### 블록긱스(Blockgeeks) _블록체인 기술 온라인 코스_

- [홈페이지](https://courses.blockgeeks.com/)

### 댑 유니버시티(DappUniversity) _이더리움상에서의 탈중앙화 애플리케이션 개발을 배우세요_

- [홈페이지](http://www.dappuniversity.com/)

### 이더넛(Ethernaut) _컨트랙트를 해킹해가며 레벨업하는 솔리디티 기반의 워게임(wargame)_

- [홈페이지](https://ethernaut.zeppelin.solutions/)

## UI/UX {#uiux-design}

- [이더리움이 마주하고 있는 UX 문제들](https://medium.com/ecf-review/challenge-of-ux-in-ethereum-122e1a33688d) _2018년 6월 25일 - 안나 로즈(Anna Rose)_
- [블록체인을 위한 디자인: 무엇이 다르고 무엇이 문제인가?](https://media.consensys.net/designing-for-blockchain-whats-different-and-what-s-at-stake-b867eeade1c9) _2018년 3월 22일 - 사라 베이커 밀스(Sara Baker Mills)_

## 표준(Standards) {#standards}

이더리움 커뮤니티는 개발자에게 도움이 되는 많은 표준을 채택해왔습니다. 일반적으로 표준들은 [ 이더리움 개선 제안(Ethereum Improvement Proposals, EIPs)](https://eips.ethereum.org/)을 통해 소개되고, 이더리움 커뮤니티의 구성원들은 [EIP-1에 정의된 표준 절차](https://eips.ethereum.org/EIPS/eip-1)에 따라 제안된 내용에 대해 토론합니다.

- [이더리움개선제안(EIP) 목록](https://eips.ethereum.org/)
- [이더리움 개선제안 깃허브 레포지토리](https://github.com/ethereum/EIPs)
- [이더리움 개선제안 토론 게시판](https://ethereum-magicians.org/c/eips)
- [이더리움 거버넌스 개요](https://blog.bmannconsulting.com/ethereum-governance/) _2019년 3월 31일 - 보리스 맨(Boris Mann)_
- [이더리움 코어 개발자 회의 플레이리스트](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) _(유튜브 재생 목록)_
  이더리움개선제안이 프로토콜-수준보다는 애플리케이션-수준의 표준일 경우(예: 스마트 컨트렉트 형식에 대한 표준), 해당 제안들은 [이더리움 논평 요청서(Ethereum Requests for Comment, ERC)](https://eips.ethereum.org/erc)라는 이름으로 소개됩니다. 많은 ERC 표준들이 이더리움 생태계에서 널리 사용되는 핵심적인 표준입니다.
- [ERCs 리스트](https://eips.ethereum.org/erc)
- [ERC20 - 토큰을 위한 표준 인터페이스](https://eips.ethereum.org/EIPS/eip-20)
- [ERC721 - 대체불가능(non-fungible) 토큰을 위한 표준 인터페이스](https://eips.ethereum.org/EIPS/eip-721)
