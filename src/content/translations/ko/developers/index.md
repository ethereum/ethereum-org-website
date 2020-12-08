---
title: 개발자를 위한 이더리움
description: 이더리움 디앱 개발자를 위한 각종 가이드, 참고 자료 및 개발 도구
lang: ko
sidebar: true
sidebarDepth: 2
---

# 개발자용 참고 자료 {#developer-resources}

<div class="featured">이더리움 디앱 개발자를 위한 각종 가이드, 참고 자료 및 개발 도구</div>

## 시작하기 {#getting-started}

**이더리움이 처음인 개발자는 위에서 소개한 참고 자료를 확인해 보세요.** 이더리움 커뮤니티에서 작성한 이 가이드에서는 이더리움 스택의 기본적인 사용법을 소개하고 이미 잘 알고 있는 다른 앱 개발과는 다를 수 있는 핵심 개념을 소개합니다.

지금 바로 코딩을 시작해 볼까요? [여기에서 시작해 보세요](/ko/build/).

먼저 기본 지식이 더 필요하시나요? [학습용 참고 자료](/ko/learn/)를 확인해 보세요.

**유용한 참고 자료**

- [이더리움 최신 정보 따라잡기](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe) _2017년 8월 7일 - Matt Condon_
- [이더리움 심층 가이드, 1부](https://blog.openzeppelin.com/ethereum-in-depth-part-1-968981e6f833/) _2018년 5월 11일 - Facu Spagnuolo_
- [이더리움 심층 가이드, 2부](https://blog.openzeppelin.com/ethereum-in-depth-part-2-6339cf6bddb9/) _2018년 7월 24일 - Facu Spagnuolo_
- [이더리움 개발 둘러보기, 1~5부](https://hackernoon.com/ethereum-development-walkthrough-part-1-smart-contracts-b3979e6e573e) _2018년 1월 14일 - dev_zl_
- [이더리움 기초, 1~7부](https://kauri.io/collection/5bb65f0f4f34080001731dc2/ethereum-101) _2019년 2월 13일 - Wil Barnes_
- [전체 스택 Hello World 투표 이더리움 디앱 튜토리얼](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2)  _2019년 2월 - Mahesh Murthy_
- [이더리움 터득하기 - 무료 온라인 종합 가이드](https://github.com/ethereumbook/ethereumbook) _2018년 12월 1일 - Andreas Antonopoulos 및 Gavin Wood_
- [이더리움 개발자 포털 - 이더리움 개발을 시작하기 전에 필요한 모든 사항](https://ethereum.consensys.net/ethereum-dev-portal) _자주 갱신됨 - ConsenSys_
- [솔리디티 컨트랙트 해체](https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/) _2018년 8월 13일 - Alejandro Santander 및 Leo Arias_
- [전체 스택 디앱 튜토리얼 시리즈](https://kauri.io/collection/5b8e401ee727370001c942e3)  _자주 갱신됨 - Joshua Cassidy_

## 스마트 컨트랙트 언어 {#smart-contract-languages}

이더리움 가상머신(Ethereum Virtual Machine, EVM) 에서 작동되는 프로그램을 흔히 “스마트 컨트랙트(smart contract)”라고 부릅니다. 이더리움을 기반으로 스마트 컨트랙트를 작성하는 데 주로 사용되는 언어로는 **솔리디티(Solidity)**와 **바이퍼(Vyper)**가 있으며 [다른 언어들도 개발 중입니다.](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages).

**솔리디티(Solidity) -** **_이더리움에서 가장 많이 사용되는 언어로, C++, Python 및 JavaScript에서 아이디어를 얻었습니다._**

- [개발 문서](https://solidity.readthedocs.io)
- [GitHub](https://github.com/ethereum/solidity/)
- [솔리디티 Gitter 채팅방](https://gitter.im/ethereum/solidity/)

**바이퍼(Vyper) -** **_보안에 중점을 둔 이더리움 언어로 Python을 기반으로 합니다._**

- [개발 문서](https://vyper.readthedocs.io)
- [GitHub](https://github.com/ethereum/vyper)
- [바이퍼 Gitter 채팅방](https://gitter.im/ethereum/vyper)

**다른 언어를 찾고 계시나요?**

- [이더리움 개발자를 위한 도구 목록 #스마트컨트랙트언어](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)

## 언어별 참고 자료 {#language-specific-resources}

개발자들이 자신이 선호하는 프로그래밍 언어로 이더리움을 배울 수 있도록 각 언어별 랜딩 페이지를 만들고 있습니다.

- [Java 개발자를 위한 이더리움](/ko/java/)
- [Python 개발자를 위한 이더리움](/ko/python/)
- [JavaScript 개발자를 위한 이더리움](/ko/javascript/)
- [Go 개발자를 위한 이더리움](/ko/golang/)
- [Rust 개발자를 위한 이더리움](/ko/rust/)
- [.NET 개발자를 위한 이더리움](/ko/dot-net/)
- 더 많은 언어가 추가될 예정입니다! 원하는 언어를 찾을 수 없으세요? [이슈 생성하기](https://github.com/ethereum/ethereum-org-website/issues/new/choose)!

## 개발자 도구 {#developer-tools}

이더리움은 개발자가 애플리케이션을 빌드, 테스트 및 배포하도록 도와주는 다양한 도구를 제공하고 있으며 점점 더 많은 도구가 추가되고 있습니다. 아래에는 개발을 시작할 때 가장 많이 사용되는 도구가 나와 있습니다. 자세히 살펴보려면 [전체 목록](https://github.com/ConsenSys/ethereum-developer-tools-list)을 확인해 보세요.

### 프레임워크 {#frameworks}

**트러플(Truffle) -** **_개발 환경, 테스트 프레임워크, 빌드 파이프라인, 각종 개발 도구_**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [GitHub](https://github.com/trufflesuite/truffle)

**엠바크(Embark) -** **_개발 환경, 테스트 프레임워크, 이더리움과 통합된 각종 개발 도구, IPFS, Whisper_**

- [개발 문서](https://embark.status.im/docs/)
- [GitHub](https://github.com/embark-framework/embark)

**와플(Waffle) -** **_고급 스마트 컨트랙트 개발 및 테스트용 프레임워크(ethers.js 기반)_**

- [getwaffle.io](https://getwaffle.io/)
- [GitHub](https://github.com/EthWorks/Waffle)

**이더라임(Etherlime) -** **_디앱 개발(솔리디티 및 바이퍼), 배포, 디버깅, 테스트 등에 적합한 Ethers.js 기반 프레임워크_**

- [개발 문서](https://etherlime.readthedocs.io/en/latest/)
- [GitHub](https://github.com/LimeChain/etherlime)

### 기타 개발 도구 {#other-tools}

**비들러(Hardhat) -** **_이더리움 스마트 컨트랙트 개발자를 위한 작업 자동화 도구_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**오픈제플린 SDK(OpenZeppelin SDK) -** **_궁극적인 스마트 컨트랙트 툴킷: 스마트 컨트랙트의 개발, 컴파일, 업그레이드, 배포, 상호 작용을 지원하는 도구 모음_**

- [OpenZeppelin SDK](https://openzeppelin.com/sdk/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [커뮤니티 포럼](https://forum.openzeppelin.com/c/sdk)

**더 그래프(The Graph) -** **_이더리움 및 IPFS 데이터를 인덱싱하고 GraphQL을 사용하여 쿼리하기 위한 프로토콜_**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [개발 문서](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**텐더리(Tenderly) -** **_오류 추적, 경고, 성능 메트릭, 컨트랙트 상세 분석을 통해 스마트 컨트랙트를 간편하게 모니터링할 수 있는 플랫폼_**

- [tenderly.dev](https://tenderly.dev/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**파이썬 툴링(Python Tooling) -** **_Python을 통해 이더리움 상호 작용을 구현하기 위한 다양한 라이브러리_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**브라우니(Brownie) -** **_Python 기반의 개발 환경 및 테스트 프레임워크_**

- [개발 문서](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/iamdefinitelyahuman/brownie)

**web3j -** **_이더리움의 Java/Android/Kotlin/Scala 통합 라이브러리_**

- [web3j.io](https://web3j.io)
- [GitHub](https://github.com/web3j/web3j)
- [개발 문서](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**원 클릭 댑(One Click Dapp) -** **_ABI에서 직접 프런트엔드를 생성하여 빠른 개발 및 테스트 지원_**

- [OneClickDapp.com](https://oneclickdapp.com)
- [Truffle 플러그인](https://npmjs.org/package/oneclick)
- [Remix 플러그인](https://github.com/pi0neerpat/remix-plugin-one-click-dapp)
- [GitHub](https://github.com/pi0neerpat/one-click-dapp)

**다른 언어를 찾고 계시나요?**

- [이더리움 개발자 도구 목록 #프레임워크](https://github.com/ConsenSys/ethereum-developer-tools-list#frameworks)

## 통합 개발 환경(IDE) {#integrated-development-environments-ides}

**이더리움 스튜디오(Ethereum Studio) -** **_스마트 컨트랙트를 실험해 보려는 신규 개발자를 위한 웹 기반 IDE. 이더리움 스튜디오(Ethereum Studio) 에는 다양한 템플릿, 메타마스크(MetaMask) 통합, 트랜잭션 로거, 브라우저 빌트인 형태의 이더리움 가상머신(Ethereum Virtual Machine, EVM) 이 포함되어 있어 이더리움에 기반한 개발 작업 시간을 최대한 단축할 수 있습니다._**

- [studio.ethereum.org](/en/studio/)
- [superblocks.com/ethereum-studio](https://superblocks.com/ethereum-studio)
- [GitHub](https://github.com/SuperblocksHQ/ethereum-studio)

**비쥬얼 스튜디오 코드(Visual Studio Code) -** **_공식적으로 이더리움을 지원하는 전문 크로스 플랫폼 통합 개발 환경(IDE)_**

- [Visual Studio Code](https://code.visualstudio.com/)
- [이더리움 개발을 위한 Azure 블록체인 개발 키트](https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain)
- [Azure 블록체인 워크벤치 플러그인](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview)
- [샘플 코드](https://github.com/Azure-Samples/blockchain/blob/master/blockchain-workbench/application-and-smart-contract-samples/readme.md)
- [GitHub](https://github.com/microsoft/vscode)

**리믹스(Remix) -** **_정적 분석 도구와 테스트용 블록체인 가상 머신을 포함하는 웹 기반 통합 개발 환경(IDE)_**

- [remix.ethereum.org](https://remix.ethereum.org/)

**이드피들(EthFiddle) -** **_스마트 컨트랙트의 작성, 컴파일, 디버깅을 지원하는 웹 기반 통합 개발 환경(IDE)_**

- [ethfiddle.com](https://ethfiddle.com/)
- [Gitter](https://gitter.im/loomnetwork/ethfiddle)

**다른 언어를 찾고 계시나요?**

- [이더리움 개발자 도구 목록 #IDE](https://github.com/ConsenSys/ethereum-developer-tools-list#ides)

## 프런트엔드 JavaScript API {#frontend-javascript-apis}

**Web3.js -** **_이더리움 JavaScript API_**

- [개발 문서](https://web3js.readthedocs.io/en/1.0/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_JavaScript와 TypeScript로 작성된 완전한 이더리움 지갑 구현체 및 각종 유틸리티_**

- [개발 문서](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**light.js -** **_경량급 클라이언트에 최적화된 고도의 반응형 JavaScript 라이브러리_**

- [개발 문서](https://paritytech.github.io/js-libs/light.js/)
- [GitHub](https://github.com/paritytech/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Web3.js의 Typescript 버전_**

- [개발 문서](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**다른 언어를 찾고 계시나요?**

- [이더리움 개발자 도구 목록 #프런트엔드-이더리움-API](https://github.com/ConsenSys/ethereum-developer-tools-list#frontend-ethereum-apis)

## 백엔드 API {#backend-apis}

**인퓨라(Infura) -** **_서비스로 제공되는 이더리움 API_**

- [infura.io](https://infura.io)
- [개발 문서](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**클라우드플레어 이더리움 게이트웨이(Cloudflare Ethereum Gateway)**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**노드스미스(Nodesmith) -** **_이더리움 메인넷 및 테스트넷에 대한 JSON-RPC API 액세스 도구_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [개발 문서](https://nodesmith.io/docs/#/ethereum/apiRef)

**체인스택(Chainstack) -** **_서비스로 제공되는 공유 및 전용 이더리움 노드_**

- [chainstack.com](https://chainstack.com)
- [개발 문서](https://docs.chainstack.com)

## 스토리지 {#storage}

**IPFS -** **_InterPlanetary File System을 나타내며 이더리움을 위한 분산 스토리지 및 파일 참조 시스템입니다._**

- [ipfs.io](https://ipfs.io/)
- [개발 문서](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**스웜(Swarm) -** **_이더리움 web3 스택을 위한 분산 스토리지 플랫폼 및 콘텐츠 배포 서비스_**

- [Swarm](https://ethersphere.github.io/swarm-home/)
- [GitHub](https://github.com/ethersphere/swarm)

**오르빗DB(OrbitDB) -** **_IPFS에 기반한 탈중앙화 P2P 데이터베이스_**

- [개발 문서](https://github.com/orbitdb/field-manual)
- [GitHub](https://github.com/orbitdb/orbit-db)

## 보안 도구 {#security-tools}

### 스마트 컨트랙트 보안 {#smart-contract-security}

**슬리터(Slither) -** **_Python 3로 작성된 솔리디티 정적 분석 프레임워크_**

- [GitHub](https://github.com/crytic/slither)

**미스엑스(MythX) -** **_이더리움 스마트 컨트랙트를 위한 보안 분석 API_**

- [mythx.io](https://mythx.io/)
- [개발 문서](https://docs.mythx.io/en/latest/)

**미스릴(Mythril) -** **_EVM 바이트코드용 보안 분석 도구_**

- [mythril](https://github.com/ConsenSys/mythril)
- [개발 문서](https://mythril-classic.readthedocs.io/en/master/about.html)

**SmartContract.Codes -** **_검증된 솔리디티 소스 코드용 검색 엔진_**

- [smartcontract.codes(알파)](https://smartcontract.codes/)
- [개발 문서](https://github.com/ethereum-play/smartcontract.codes/blob/master/README.md)

**만티코어(Manticore) -** **_명령줄 인터페이스를 통해 스마트 컨트랙트 및 바이너리를 분석하는 기호화된 실행 도구_**

- [GitHub](https://github.com/trailofbits/manticore)
- [개발 문서](https://github.com/trailofbits/manticore/wiki)

**시큐리파이(Securify) -** **_이더리움 스마트 컨트랙트의 취약점을 탐지하는 보안 스캐너_**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 검증 도구(ERC20 Verifier) -** **_컨트랙트가 ERC20 표준을 준수하는지 여부를 확인하는 데 사용되는 검증 도구_**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### 형식 검증 {#formal-verification}

**형식 검증 정보**

- [스마트 컨트랙트의 형식 검증 작동 원리](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _2018년 7월 20일 - Brian Marick_
- [형식 검증을 통해 스마트 컨트랙트의 무결성을 보장하는 방법](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _2018년 1월 29일, 2018 - Bernard Mueller_

**다른 언어를 찾고 계시나요?**

- [이더리움 개발자 도구 목록 #보안도구](https://github.com/ConsenSys/ethereum-developer-tools-list#security-tools)

## 테스트 도구 {#testing-tools}

**솔리디티 커버리지(Solidity-Coverage) -** **_또 다른 솔리디티 코드 범위 도구_**

- [GitHub](https://github.com/sc-forks/solidity-coverage)

**hevm -** **_스마트 컨트랙트의 유닛 테스트 및 디버깅을 위해 특별히 제작된 EVM_**

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)
- [DappHub 채팅](https://dapphub.chat/)

**화이트블록 제네시스(Whiteblock Genesis) -** **_블록체인을 위한 엔드 투 엔드 개발 샌드박스 및 테스트 플랫폼_**

- [Whiteblock.io](https://whiteblock.io)
- [개발 문서](https://docs.whiteblock.io)
- [GitHub](https://github.com/whiteblock/genesis)

**다른 언어를 찾고 계시나요?**

- [이더리움 개발자 도구 목록 #테스트도구](https://github.com/ConsenSys/ethereum-developer-tools-list#testing-tools)

## 블록 탐색기 {#block-explorers}

블록 탐색기는 특정 거래, 블록, 컨트랙트 및 기타 온체인(on-chain) 활동에 대한 정보를 검색하여 이더리움 블록체인(테스트넷 포함)을 탐색할 수 있게 해주는 서비스입니다.

- [이더스캔(Etherscan)](https://etherscan.io/)
- [블록스카우트(Blockscout)](https://blockscout.com/)
- [이더체인(Etherchain)](https://www.etherchain.org/)

## 테스트넷과 파우셋(Faucets) {#testnets-and-faucets}

이더리움 커뮤니티는 여러 개의 테스트넷을 관리합니다. 테스트넷은 개발자들이 이더리움 메인넷에 배포하기 전에 애플리케이션을 여러 가지 다른 조건에서 테스트하는 데 사용됩니다.

**롭스텐(Ropsten) -** **_작업 증명(Proof of Work) 블록체인, 테스트 이더 채굴 가능_**

- [테스트 이더 파우셋](https://faucet.ropsten.be/)

**린케비(Rinkeby) -** **_권한 증명(Proof of Authority) 블록체인, 게스(Geth) 개발팀에서 관리_**

- [테스트 이더 파우셋](https://faucet.rinkeby.io/)
- [범용 파우셋](https://faucets.blockxlabs.com)

**괴를리(Goerli) -** **_크로스 클라이언트 권한 증명 블록체인, 고얼리 커뮤니티에서 만들고 관리_**

- [테스트 이더 파우셋](https://faucet.goerli.mudit.blog/)
- [goerli.net](https://goerli.net/)
- [범용 파우셋](https://faucets.blockxlabs.com)

## 클라이언트 및 사용자 노드 실행하기 {#clients--running-your-own-node}

이더리움 네트워크는 호환 가능한 클라이언트 소프트웨어를 실행하는 수많은 노드로 구성되어 있습니다. 대부분의 노드는 [게스(Geth)](https://geth.ethereum.org/) 또는 [패리티(Parity)](https://www.parity.io/ethereum/) 클라이언트를 실행하고 있으며 필요에 따라 다양한 방식으로 구성할 수 있습니다.

### 클라이언트 {#clients}

**게스(Geth) -** **_Go로 작성된 이더리움 클라이언트_**

- [GitHub](https://github.com/ethereum/go-ethereum)
- [디스코드(Discord) 채팅](https://discordapp.com/invite/nthXNEv)

**패리티(Parity) -** **_Rust로 작성된 이더리움 클라이언트_**

- [parity.io](https://www.parity.io/)
- [GitHub](https://github.com/paritytech/parity-ethereum)

**판테온(Pantheon) -** **_Java로 작성된 이더리움 클라이언트_**

- [pegasys.tech](http://pegasys.tech)
- [GitHub](https://github.com/PegaSysEng/pantheon/)

**네더마인드(Nethermind) -** **_C# .NET Core로 작성된 이더리움 클라이언트_**

- [Nethermind.io](http://nethermind.io/)
- [GitHub](https://github.com/NethermindEth/nethermind)
- [Gitter](https://gitter.im/nethermindeth/nethermind)

### 사용자 노드 실행하기 {#running-your-own-node}

**이드노드(Ethnode) -** **_로컬 개발을 위한 이더리움 노드(게스 또는 패리티) 실행 도구_**

- [GitHub](https://github.com/vrde/ethnode)

**이더리움 노드 참고 자료**

- [노드 구성 요약본](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _2019년 1월 5일 - Afri Schoeden_

**다른 언어를 찾고 계시나요?**

- [이더리움 개발자 도구 목록 #이더리움클라이언트](https://github.com/ConsenSys/ethereum-developer-tools-list#ethereum-clients)

## 모범 사례, 패턴 및 안티패턴 {#best-practices-patterns-and-anti-patterns}

### 스마트 컨트랙트 {#smart-contracts}

**댑시스(DappSys) -** **_스마트 컨트랙트 개발에 사용할 수 있는 안전하고 단순하며 유연한 구성 요소 모음_**

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

**오픈제플린(OpenZeppelin) 컨트랙트 -** **_안전한 스마트 컨트랙트 개발을 위한 라이브러리_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [커뮤니티 포럼](https://forum.openzeppelin.com/c/contracts)

**아라곤OS(aragonOS) -** **_업그레이드와 권한 제어를 위한 패턴_**

- [hack.aragon.org](https://hack.aragon.org/docs/aragonos-intro.html#aragonos-provides-the-following-functionality)
- [개발 문서](https://wiki.aragon.org/)

**스마트 컨트랙트 취약점 레지스트리**

- [SWC 레지스트리](https://smartcontractsecurity.github.io/SWC-registry/)
- [GitHub](https://github.com/SmartContractSecurity/SWC-registry)

### 보안 {#security}

**스마트 컨트랙트 보안 모범 사례 가이드**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [보안 권장 사항 및 모범 사례 모음](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**스마트 컨트랙트 보안 검증 표준(SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

**다른 언어를 찾고 계시나요?**

- [이더리움 개발자 도구 목록 #패턴-모범사례](https://github.com/ConsenSys/ethereum-developer-tools-list#patterns--best-practices)

## 개발자 지원 및 교육 {#developer-support--training}

### 일반 학습 {#general-learning}

**이더리움 스택 익스체인지(Ethereum Stack Exchange)**

- [ethereum.stackexchange.com](https://ethereum.stackexchange.com/)

**컨센시스 아카데미(ConsenSys Academy) -** **_엔드 투 엔드 이더리움 개발자를 위해 연중 운영되는 자기 주도형 코스_**

- [consensys.academy](https://consensys.net/academy/ondemand/)

**솔리디티 Gitter 채팅방**

- [gitter.im/ethereum/solidity](https://gitter.im/ethereum/solidity/)

**모든 이더리움 Gitter 채팅방**

- [gitter.im/ethereum/home](https://gitter.im/ethereum/home)

**체인샷(Chainshot) -** **_웹 기반 디앱 코딩 튜토리얼_**

- [chainshot.com](https://www.chainshot.com/)

**블록긱스(Blockgeeks) -** **_블록체인 기술 온라인 코스_**

- [courses.blockgeeks.com](https://courses.blockgeeks.com/)

**댑 유니버시티(DappUniversity) -** **_이더리움 블록체인에서 탈중앙화 애플리케이션을 개발하는 방법 교육_**

- [DappUniversity.com](http://www.dappuniversity.com/)

**B9lab Academy -** **_가장 오래된 전문 이더리움 디앱 개발자 코스 및 감사관과 QA를 위한 추가 교육 제공(멘토링 및 코드 리뷰 포함)_**

- [academy.b9lab.com](https://academy.b9lab.com)

### 게임 기반 학습 {#game-based-learning}

**크립토좀비(Cryptozombies) -** **_이더리움 기반으로 게임 코딩하는 방법 학습_**

- [Cryptozombies.io](https://cryptozombies.io/)

**이더넛(Ethernaut) -** **_컨트랙트를 해킹하면서 레벨업하는 솔리디티 기반의 워게임(wargame)_**

- [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)

**이더 캡처 -** **_이더리움 스마트 컨트랙트 보안 게임_**

- [capturetheether.com](https://capturetheether.com/)

## UI/UX 디자인 {#uiux-design}

- [이더리움 UX의 문제](https://medium.com/ecf-review/challenge-of-ux-in-ethereum-122e1a33688d) _2018년 6월 25일 - Anna Rose_
- [블록체인을 위한 설계: 차이점과 문제점](https://media.consensys.net/designing-for-blockchain-whats-different-and-what-s-at-stake-b867eeade1c9) _2018년 3월 22일 - Sarah Baker Mills_

**Rimble UI** **_- 탈중앙화 애플리케이션에 적용 가능한 구성 요소 및 디자인 표준_**

- [rimble.consensys.design](https://rimble.consensys.design)
- [GitHub](https://github.com/ConsenSys/rimble-ui)

## 표준 {#standards}

이더리움 커뮤니티는 개발자에게 도움이 되는 많은 표준을 채택해왔습니다. 일반적으로 [이더리움 개선 제안](http://eips.ethereum.org/)(Ethereum Improvement Proposals, EIP)을 통해 표준이 소개되고, 이더리움 커뮤니티의 구성원들이 [EIP-1에 정의된 표준 절차](http://eips.ethereum.org/EIPS/eip-1)에 따라 제안된 내용에 대해 토론합니다.

- [EIP 목록](http://eips.ethereum.org/)
- [EIP Github 리포지토리](https://github.com/ethereum/EIPs)
- [EIP 토론 게시판](https://ethereum-magicians.org/c/eips)
- [이더리움 거버넌스 개요](https://blog.bmannconsulting.com/ethereum-governance/) _2019년 3월 31일 - Boris Mann_
- [이더리움 코어 개발자 회의 재생 목록](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) _(YouTube 재생 목록)_

이더리움 개선 제안(EIP)이 애플리케이션 수준의 표준(예: 스마트 컨트랙트 형식에 대한 표준)일 경우 해당 제안은 [이더리움 논평 요청(Ethereum Requests for Comment, ERC)](https://eips.ethereum.org/erc)의 형태로 소개됩니다. 많은 ERC 표준이 이더리움 생태계에서 널리 사용되고 있는 핵심적인 표준입니다.

- [ERC 목록](http://eips.ethereum.org/erc)
- [ERC20 - 토큰용 표준 인터페이스](https://eips.ethereum.org/EIPS/eip-20)
- [ERC721 - 대체 불가능한 토큰용 표준 인터페이스](https://eips.ethereum.org/EIPS/eip-721)
