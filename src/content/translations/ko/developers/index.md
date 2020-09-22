---
title: 개발자를 위한 이더리움
description: 이더리움 기반 개발자를 위한 각종 가이드, 참고 자료 및 개발 도구.
lang: ko
sidebar: true
sidebarDepth: 2
---

# 개발자용 참고 자료 {#developer-resources}

<div class="featured">이더리움 위에서 개발하는 개발자들을 위한 가이드와 개발 도구 그리고 각종 자료를 다룹니다.</div>

## 시작하기 {#getting-started}

**만약 당신이 이더리움을 처음 개발해보신다면, 여기 제대로 찾아오셨습니다.** 이더리움 커뮤니티에 의해 쓰여진 이 가이드들은 이더리움 기술 스택에 대한 기초부터 기존의 앱 개발과는 다를지도 모르는 새로운 개념들을 소개해 줄 거에요.

지금 바로 코딩을 시작하고 싶으세요? [코딩 시작하기](/ko/build/).

먼저 기본 지식이 더 필요하시나요? [학습용 참고 자료](/ko/learn/)를 확인해 보세요.

**유용한 참고 자료**

- [Getting up to speed on Ethereum](https://medium.com/@mattcondon/getting-up-to-speed-on-ethereum-63ed28821bbe) _Aug 7, 2017 - Matt Condon_
- [Ethereum In Depth, Part 1](https://blog.zeppelin.solutions/ethereum-in-depth-part-1-968981e6f833) _May 11, 2018 - Facu Spagnuolo_
- [Ethereum In Depth, Part 2 ](https://blog.zeppelin.solutions/ethereum-in-depth-part-2-6339cf6bddb9) _July 24, 2018 - Facu Spagnuolo_
- [Ethereum Development Walkthrough, Parts 1-5](https://hackernoon.com/ethereum-development-walkthrough-part-1-smart-contracts-b3979e6e573e) _Jan 14, 2018 - dev_zl_
- [Ethereum 101, Parts 1-7](https://kauri.io/collection/5bb65f0f4f34080001731dc2/ethereum-101) _Feb 13, 2019 - Wil Barnes_
- [Full Stack Hello World Voting Ethereum Dapp Tutorial ](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) _Jan 18, 2017 - Mahesh Murthy_
- [Mastering Ethereum - A comprehensive textbook available for free online](https://github.com/ethereumbook/ethereumbook) _Dec 1, 2018 - Andreas Antonopoulos & Gavin Wood_
- [Ethereum Developer Portal - Everything you need to get started building on Ethereum](https://ethereum.consensys.net/ethereum-dev-portal) _Updated often - ConsenSys_
- [Deconstructing a Solidity Contract](https://blog.zeppelin.solutions/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737) _Aug 13, 2018 - Alejandro Santander & Leo Arias_
- [Full Stack Dapp Tutorial Series ](https://kauri.io/collection/5b8e401ee727370001c942e3) _Updated Often - Joshua Cassidy_

## 스마트 컨트랙트 언어 {#smart-contract-languages}

이더리움 가상 머신(EVM)에서 작동되는 프로그램을 흔히 "스마트 컨트랙트(smart contract)"라고 부릅니다. 이더리움에 기반하여 스마트 컨트랙트를 작성할 때 주로 사용되는 언어로는 **Solidity(솔리디티)**와 **Vyper(바이퍼)**가 있지만, [다른 언어들도 매우 활발하게 개발되고 있습니다](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages).

**솔리디티(Solidity) -** **_C++, 파이썬(Python), 자바스크립트(JavaScript)에서 영감을 얻은 가장 인기 있는 이더리움 기반 언어_**

- [개발문서](https://solidity.readthedocs.io)
- [깃허브](https://github.com/ethereum/solidity/)
- [솔리디티 깃터 채팅방](https://gitter.im/ethereum/solidity/)

**바이퍼(Vyper) -** **_파이썬에 기반하여 보안에 중점을 둔 이더리움 개발 언어_**

- [개발문서](https://vyper.readthedocs.io)
- [깃허브](https://github.com/ethereum/vyper)
- [바이퍼 깃터 채팅방](https://gitter.im/ethereum/vyper)

**자료가 더 필요하세요?**

- [이더리움 개발자 툴 리스트 #스마트 컨트랙트 언어들(SmartContractLanguages)](https://github.com/ConsenSys/ethereum-developer-tools-list#smart-contract-languages)

## 언어별 참고 자료 {#language-specific-resources}

개발자들이 자신이 선호하는 프로그래밍 언어로 이더리움을 배울 수 있도록 각 언어별 랜딩 페이지를 만들고 있습니다.

- [Java 개발자를 위한 이더리움](/ko/java/)
- [Python 개발자를 위한 이더리움](/ko/python/)
- [JavaScript 개발자를 위한 이더리움](/ko/javascript/)
- [Go 개발자를 위한 이더리움](/ko/golang/)
- [Rust 개발자를 위한 이더리움](/ko/rust/)
- [.NET 개발자를 위한 이더리움](/ko/dot-net/)
- 향후 더 많은 내용이 추가될 예정입니다! 원하는 언어를 찾을 수 없으세요? [이슈 생성하기](https://github.com/ethereum/ethereum-org-website/issues/new/choose)!

## 개발 도구 {#developer-tools}

이더리움은 개발자들이 애플리케이션을 빌드, 테스트 및 배포하도록 도와 주는 다양한 도구를 갖추고 있으며, 많은 도구가 계속 추가되고 있습니다. 아래에 개발을 시작할 때 가장 인기 있는 도구들이 정리되어 있습니다. 더 자세히 알고 싶으면 이 [목록](https://github.com/ConsenSys/ethereum-developer-tools-list)을 참고해 주세요.

### 프레임워크 {#frameworks}

**트러플(Truffle) -** **_개발 환경, 테스팅 프레임워크, 빌드 파이프라인 및 기타 각종 개발 도구_**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [깃허브(GitHub)](https://github.com/trufflesuite/truffle)

**엠바크(Embark) -** **_개발 환경, 테스팅 프레임워크, 이더리움과 통합된 기타 개발 도구, IPFS, Whisper_**

- [개발 문서](https://embark.status.im/docs/)
- [깃허브(GitHub)](https://github.com/embark-framework/embark)

**와플(Waffle) -** **_고급 스마트 컨트랙트 개발 및 테스트용 프레임워크(ethers.js 기반)_**

- [getwaffle.io](https://getwaffle.io/)
- [깃허브(GitHub)](https://github.com/EthWorks/Waffle)

**이더라임(Etherlime) -** **_디앱 개발(솔리디티, 바이퍼), 배포, 디버깅, 테스트 등의 작업을 위한 Ethers.js 기반 프레임워크_**

- [개발 문서](https://etherlime.readthedocs.io/en/latest/)
- [깃허브(GitHub)](https://github.com/LimeChain/etherlime)

### 기타 개발 도구 {#other-tools}

**Ethereum Grid -** **_이더리움 클라이언트 및 도구를 다운로드, 설정, 실행할 수 있는 데스크톱 애플리케이션_**

- [grid.ethereum.org](https://grid.ethereum.org)
- [깃허브(GitHub)](https://github.com/ethereum/grid)

**비들러(Buidler) -** **_이더리움 스마트 컨트랙트 개발자를 위한 작업 실행기_**

- [buidler.dev](https://buidler.dev)
- [깃허브(GitHub)](https://github.com/nomiclabs/buidler)

**OpenZeppelin SDK -** **_궁극적인 스마트 컨트랙트 도구 키트: 스마트 컨트랙트 개발, 컴파일, 업그레이드, 배포, 상호 작용을 지원하는 도구 모음_**

- [OpenZeppelin SDK](https://openzeppelin.com/sdk/)
- [깃허브(GitHub)](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [커뮤니티 포럼](https://forum.openzeppelin.com/c/sdk)

**The Graph -** **_이더리움 및 IPFS 데이터를 인덱싱하고 GraphQL을 사용하여 쿼리하기 위한 프로토콜_**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [개발 문서](https://thegraph.com/docs/)
- [깃허브(GitHub)](https://github.com/graphprotocol/)
- [디스코드(Discord)](https://thegraph.com/discord)

**Tenderly -** **_오류 추적, 경고, 성능 메트릭, 컨트랙트 상세 분석을 통해 스마트 컨트랙트를 간편하게 모니터링할 수 있는 플랫폼_**

- [tenderly.dev](https://tenderly.dev/)
- [깃허브(GitHub)](https://github.com/Tenderly)
- [디스코드(Discord)](https://discord.gg/eCWjuvt)

**Python Tooling -** **_파이썬을 통해 이더리움 상호 작용을 구현하기 위한 다양한 라이브러리_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py 깃허브](https://github.com/ethereum/web3.py)
- [web3.py 채팅](https://gitter.im/ethereum/web3.py)

**Brownie -** **_Python 기반 개발 환경 및 테스트 프레임워크_**

- [개발 문서](https://eth-brownie.readthedocs.io/en/latest/)
- [깃허브(GitHub)](https://github.com/iamdefinitelyahuman/brownie)

**web3j -** **_이더리움용 Java/Android/Kotlin/Scala 통합 라이브러리_**

- [web3j.io](https://web3j.io)
- [깃허브(GitHub)](https://github.com/web3j/web3j)
- [개발 문서](https://docs.web3j.io/)
- [깃터(Gitter)](https://gitter.im/web3j/web3j)

**One Click dApp -** **_ABI에서 직접 프런트 엔드를 생성하여 빠른 개발 및 테스트 지원_**

- [OneClickDapp.com](https://oneclickdapp.com)
- [Truffle 플러그인](https://npmjs.org/package/oneclick)
- [Remix 플러그인](https://github.com/pi0neerpat/remix-plugin-one-click-dapp)
- [깃허브(GitHub)](https://github.com/pi0neerpat/one-click-dapp)

**자료가 더 필요하세요?**

- [이더리움 개발 도구 목록 #프레임워크](https://github.com/ConsenSys/ethereum-developer-tools-list#frameworks)

## 통합 개발 환경 (IDE) {#integrated-development-environments-ides}

**Ethereum Studio -** **_스마트 컨트랙트로 다양한 실험을 하고 싶은 신규 개발자를 위한 웹 기반 IDE. Ethereum Studio는 다양한 템플릿, MetaMask 통합, 트랜잭션 로거, 브라우저 빌트인 형태의 이더리움 가상 머신(EVM)을 갖추고 있어서 이더리움에 기반한 개발 작업을 아주 빠르게 시작할 수 있습니다._**

- [studio.ethereum.org](https://studio.ethereum.org)
- [superblocks.com/ethereum-studio](https://superblocks.com/ethereum-studio)
- [깃허브(GitHub)](https://github.com/SuperblocksHQ/ethereum-studio)

**비주얼 스튜디오 코드(Visual Studio Code) -** **_공식적으로 이더리움을 지원하는 전문 크로스 플랫폼 통합 개발 환경_**

- [비주얼 스튜디오 코드](https://code.visualstudio.com/)
- [이더리움 개발을 위한 애저(Azure) 블록체인 개발 키트](https://marketplace.visualstudio.com/items?itemName=AzBlockchain.azure-blockchain)
- [애저(Azure) 블록체인 워크벤치 플러그인](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/microsoft-azure-blockchain.azure-blockchain-workbench?tab=Overview)
- [샘플 코드](https://github.com/Azure-Samples/blockchain/blob/master/blockchain-workbench/application-and-smart-contract-samples/readme.md)
- [깃허브(GitHub)](https://github.com/microsoft/vscode)

**리믹스(Remix) -** **_정적 분석 도구와 테스트용 블록체인 가상 머신이 내장된 웹 기반 통합 개발 환경_**

- [remix.ethereum.org](https://remix.ethereum.org/)

**이드피들(EthFiddle) -** **_스마트 컨트랙트의 작성, 컴파일, 디버깅을 지원하는 웹 기반 통합 개발 환경_**

- [ethfiddle.com](https://ethfiddle.com/)
- [깃터(Gitter)](https://gitter.im/loomnetwork/ethfiddle)

**자료가 더 필요하세요?**

- [이더리움 개발 도구 목록 #통합개발환경(IDE)](https://github.com/ConsenSys/ethereum-developer-tools-list#ides)

## 프런트 엔드 자바스크립트 API {#frontend-javascript-apis}

**Web3.js -** **_이더리움 자바스크립트 API_**

- [개발 문서](https://web3js.readthedocs.io/en/1.0/)
- [깃허브(GitHub)](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_자바스크립트와 타입스크립트로 작성된 완전한 이더리움 지갑 구현체 및 각종 유틸리티_**

- [개발 문서](https://docs.ethers.io/ethers.js/html/)
- [깃허브(GitHub)](https://github.com/ethers-io/ethers.js/)

**light.js -** **_경량급 클라이언트에 최적화된 고도의 반응형 자바스크립트 라이브러리_**

- [개발 문서](https://paritytech.github.io/js-libs/light.js/)
- [깃허브(GitHub)](https://github.com/paritytech/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Web3.js의 타입스크립트 버전_**

- [개발 문서](https://0x.org/docs/web3-wrapper#introduction)
- [깃허브(GitHub)](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**자료가 더 필요하세요?**

- [이더리움 개발 도구 목록 #프런트엔드이더리움API](https://github.com/ConsenSys/ethereum-developer-tools-list#frontend-ethereum-apis)

## 백엔드 API {#backend-apis}

**인퓨라(Infura) -** **_이더리움 API 서비스_**

- [infura.io](https://infura.io)
- [개발 문서](https://infura.io/docs)
- [깃허브(GitHub)](https://github.com/INFURA)

**Cloudflare 이더리움 게이트웨이**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_이더리움 메인넷 및 테스트넷에 대한 JSON-RPC API 액세스 도구_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [개발 문서](https://nodesmith.io/docs/#/ethereum/apiRef)

**Chainstack -** **_공유 및 전용 이더리움 노드 서비스_**

- [chainstack.com](https://chainstack.com)
- [개발 문서](https://docs.chainstack.com)

## 스토리지 {#storage}

**IPFS -** **_InterPlanetary File System은 이더리움을 위한 분산 스토리지 및 파일 참조 시스템입니다_**

- [ipfs.io](https://ipfs.io/)
- [개발 문서](https://docs.ipfs.io/)
- [깃허브(GitHub)](https://github.com/ipfs/ipfs)

**Swarm -** **_이더리움 web3 스택을 위한 분산 스토리지 플랫폼 및 콘텐츠 배포 서비스_**

- [Swarm](https://ethersphere.github.io/swarm-home/)
- [깃허브(GitHub)](https://github.com/ethersphere/swarm)

**OrbitDB -** **_IPFS에 기반한 탈중앙화 피어 투 피어(P2P) 데이터베이스_**

- [개발문서](https://github.com/orbitdb/field-manual)
- [깃허브(GitHub)](https://github.com/orbitdb/orbit-db)

## 보안 도구 {#security-tools}

### 스마트 컨트랙트 보안 {#smart-contract-security}

**Slither -** **_파이썬3으로 작성된 솔리디티 정적 분석 프레임워크_**

- [깃허브(GitHub)](https://github.com/crytic/slither)

**MythX -** **_이더리움 스마트 컨트랙트용 보안 분석 API_**

- [mythx.io](https://mythx.io/)
- [개발 문서](https://docs.mythx.io/en/latest/)

**Mythril -** **_EVM 바이트코드용 보안 분석 도구_**

- [mythril](https://github.com/ConsenSys/mythril)
- [개발 문서](https://mythril-classic.readthedocs.io/en/master/about.html)

**SmartContract.Codes -** **_검증된 솔리디티 소스 코드용 검색 엔진_**

- [smartcontract.codes (alpha)](https://smartcontract.codes/)
- [개발 문서](https://github.com/ethereum-play/smartcontract.codes/blob/master/README.md)

**Manticore -** **_명령줄 인터페이스를 통해 스마트 컨트랙트 및 바이너리를 분석하는 기호 실행(symbolic execution) 도구 _**

- [깃허브(GitHub)](https://github.com/trailofbits/manticore)
- [개발 문서](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_이더리움 스마트 컨트랙트용 보안 스캐너_**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [디스코드(Discord)](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_컨트랙트가 ERC20 표준에 부합하는지 확인하는 데 사용되는 검증 도구_**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [포럼](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### 형식 검증 {#formal-verification}

**형식 검증에 대한 참고 자료**

- [스마트 컨트랙트에 대한 형식 검증은 어떻게 진행되는가? ](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _2018년 7월 20일 - 브라이언 머릭(Brian Marick)_
- [형식 검증을 통해 어떻게 스마트 컨트랙트의 무결성을 보장할 수 있는가? ](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _2018년 1월 29일 - 버나드 뮐러(Bernard Mueller)_

**자료가 더 필요하세요?**

- [이더리움 개발 도구 목록 #보안도구](https://github.com/ConsenSys/ethereum-developer-tools-list#security-tools)

## 테스트 도구 {#testing-tools}

**Solidity-Coverage -** **_또 다른 솔리디티 도구 커버리지 도구_**

- [깃허브(GitHub)](https://github.com/sc-forks/solidity-coverage)

**hevm -** **_스마트 컨트랙트 유닛 테스트 및 디버깅을 위해 특별히 제작된 EVM_**

- [깃허브(GitHub)](https://github.com/dapphub/dapptools/tree/master/src/hevm)
- [DappHub 채팅](https://dapphub.chat/)

**Whiteblock Genesis -** **_블록체인을 위한 엔드 투 엔드 개발 샌드박스 및 테스팅 플랫폼_**

- [Whiteblock.io](https://whiteblock.io)
- [개발 문서](https://docs.whiteblock.io)
- [깃허브(GitHub)](https://github.com/whiteblock/genesis)

**추가자료 찾으세요?**

- [이더리움 개발 도구 목록 #테스트도구](https://github.com/ConsenSys/ethereum-developer-tools-list#testing-tools)

## 블록 탐색기 {#block-explorers}

블록 탐색기는 특정 거래, 블록, 컨트랙트 및 기타 온체인(on-chain) 활동에 대한 정보를 검색하여 이더리움 블록체인(테스트넷 포함)을 탐색할 수 있게 해주는 서비스입니다.

- [이더스캔(Etherscan)](https://etherscan.io/)
- [블록스카우트(Blockscout)](https://blockscout.com/)
- [이더체인(Etherchain)](https://www.etherchain.org/)

## 테스트넷과 파우셋(Faucets) {#testnets-and-faucets}

이더리움 커뮤니티는 여러 개의 테스트넷을 관리합니다. 테스트넷은 개발자들이 이더리움 메인넷에 배포하기 전, 애플리케이션을 여러 가지 다른 조건에서 테스트하는 데 사용됩니다.

**롭스텐(Ropsten) -** **_작업 증명(Proof of Work) 블록체인, 테스트 이더 채굴 가능_**

- [테스트 이더 파우셋](https://faucet.ropsten.be/)

**Rinkeby -** **_권위 증명(Proof of Authority blockchain) 블록체인, 게스(Geth) 개발팀이 관리함_**

- [테스트 이더 파우셋](https://faucet.rinkeby.io/)
- [범용 파우셋](https://faucets.blockxlabs.com)

**Goerli -** **_크로스 클라이언트 권위 증명 블록체인, Goerli 커뮤니티가 구축하고 관리함_**

- [테스트 이더 파우셋](https://faucet.goerli.mudit.blog/)
- [goerli.net](https://goerli.net/)
- [범용 파우셋](https://faucets.blockxlabs.com)

## 클라이언트 및 사용자 자신의 노드 운영하기 {#clients--running-your-own-node}

이더리움 네트워크는 호환 가능한 클라이언트 소프트웨어를 실행하는 수많은 노드로 구성되어 있습니다. 대부분의 노드는 [ 게스(Geth) ](https://geth.ethereum.org/) 또는 [ 패리티(Parity)](https://www.parity.io/ethereum/) 클라이언트를 구동하고 있으며 사용자의 필요에 따라 다양한 방식으로 구성할 수 있습니다.

### 클라이언트 {#clients}

**게스(Geth) -** **_Go로 작성된 이더리움 클라이언트_**

- [깃허브(GitHub)](https://github.com/ethereum/go-ethereum)
- [디스코드(Discord) 채팅](https://discordapp.com/invite/nthXNEv)

**패리티(Parity) -** **_Rust로 작성된 이더리움 클라이언트_**

- [parity.io](https://www.parity.io/)
- [깃허브(GitHub)](https://github.com/paritytech/parity-ethereum)

**판테온(Pantheon) -** **_Java로 작성된 이더리움 클라이언트_**

- [pegasys.tech](http://pegasys.tech)
- [깃허브(GitHub)](https://github.com/PegaSysEng/pantheon/)

**Nethermind -** **_C# .NET Core로 작성된 이더리움 클라이언트_**

- [Nethermind.io](http://nethermind.io/)
- [깃허브(GitHub)](https://github.com/NethermindEth/nethermind)
- [깃터(Gitter)](https://gitter.im/nethermindeth/nethermind)

### 사용자 자신의 노드 운영하기 {#running-your-own-node}

**Ethnode -** **_로컬 개발 환경을 위한 이더리움 노드(게스 또는 패리티) 운영 도구_**

- [깃허브(GitHub)](https://github.com/vrde/ethnode)

**이더리움 노드 참고 자료**

- [노드 구성 요약](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) \*2019년 1월 5일 - 아프리 쇼든(Afri Schoeden)
  **자료가 더 필요하세요?**
  - [이더리움 개발 도구 목록 #이더리움클라이언트](https://github.com/ConsenSys/ethereum-developer-tools-list#ethereum-clients)
  ## 모범 사례, 패턴 및 안티패턴(Anti-patterns) {#best-practices-patterns-and-anti-patterns}
  ### 스마트 컨트랙트 {#smart-contracts}
  **DappSys -** **_스마트 컨트랙트 개발에 사용할 수 있는 안전하고 단순하며 유연한 스마트 컨트랙트 구성 요소 모음_**
  - [개발 문서](https://dapp.tools/dappsys/)
  - [깃허브(GitHub)](https://github.com/dapphub/dappsys)
  **OpenZeppelin 컨트랙트 -** **_보안 스마트 컨트랙트 개발용 라이브러리_**
  - [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
  - [깃허브(GitHub)](https://github.com/OpenZeppelin/openzeppelin-contracts)
  - [커뮤니티 포럼](https://forum.openzeppelin.com/c/contracts)
  **aragonOS -** **_업그레이드 가능성 및 권한 제어를 위한 패턴_**
  - [hack.aragon.org](https://hack.aragon.org/docs/aragonos-intro.html#aragonos-provides-the-following-functionality)
  - [개발 문서](https://wiki.aragon.org/)
  **스마트 컨트랙트 취약점 레지스트리**
  - [스마트 컨트랙트 취약점 분류 레지스트리(Smart Contract Weakness Classification Registry, SWC Registry)](https://smartcontractsecurity.github.io/SWC-registry/)
  - [깃허브(GitHub)](https://github.com/SmartContractSecurity/SWC-registry)
  ### 보안 {#security}
  **스마트 컨트랙트 보안 모범 사례 가이드**
  - [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
  - [깃허브(GitHub)](https://github.com/ConsenSys/smart-contract-best-practices/)
  - [보안 권장 사항 모음 및 모범 사례](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)
  **스마트 컨트랙트 보안 검증 표준(SCSVS)**
  - [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)
  **자료가 더 필요하세요?**
  - [이더리움 개발 도구 목록 #패턴-모범사례](https://github.com/ConsenSys/ethereum-developer-tools-list#patterns--best-practices)
  ## 개발자 지원 및 교육 {#developer-support--training}
  ### 일반 학습 {#general-learning}
  **이더리움 스택 익스체인지(Ethereum Stack Exchange)**
  - [ethereum.stackexchange.com](https://ethereum.stackexchange.com/)
  **ConsenSys Academy -** **_엔드 투 엔드 이더리움 개발자를 위해 연중 운영되는 자기 주도형 코스_**
  - [consensys.academy](https://consensys.net/academy/ondemand/)
  **솔리디티 깃터 채팅방**
  - [gitter.im/ethereum/solidity](https://gitter.im/ethereum/solidity/)
  **이더리움 깃터 채팅방**
  - [gitter.im/ethereum/home](https://gitter.im/ethereum/home)
  **Chainshot -** **_웹 기반 디앱 코딩 튜토리얼_**
  - [chainshot.com](https://www.chainshot.com/)
  **Blockgeeks -** **_블록체인 기술에 대한 온라인 코스_**
  - [courses.blockgeeks.com](https://courses.blockgeeks.com/)
  **DappUniversity -** **_이더리움 블록체인에서 탈중앙화 애플리케이션을 개발하는 방법 교육_**
  - [DappUniversity.com](http://www.dappuniversity.com/)
  **B9lab Academy -** **_가장 오래된 전문 이더리움 디앱 개발자 코스 및 감사인과 QA를 위한 추가 교육 제공. 포함 내용: 멘토링 및 코드 리뷰_**
  - [academy.b9lab.com](https://academy.b9lab.com)
  ### 게임 기반 학습 {#game-based-learning}
  **크립토좀비(Cryptozombies) -** **_이더리움 기반 게임을 코딩하는 방법 학습_**
  - [Cryptozombies.io](https://cryptozombies.io/)
  **Ethernaut -** **_레벨에 해당하는 컨트랙트를 해킹하며 진행하는 솔리디티 기반 워게임(가상 전쟁 게임)_**
  - [ethernaut.openzeppelin.com](https://ethernaut.openzeppelin.com/)
  **Capture the Ether -** **_이더리움 스마트 컨트랙트 보안 게임_**
  - [capturetheether.com](https://capturetheether.com/)
  ## UI/UX 디자인 {#uiux-design}
  - [Challenge of UX in Ethereum](https://medium.com/ecf-review/challenge-of-ux-in-ethereum-122e1a33688d) _2018년 6월 25일 - Anna Rose_
  - [Designing for blockchain: what’s different and what’s at stake](https://media.consensys.net/designing-for-blockchain-whats-different-and-what-s-at-stake-b867eeade1c9) _2018년 3월 22일 - Sarah Baker Mills_
  **Rimble UI** **_- 탈중앙화 애플리케이션에 적용 가능한 구성 요소 및 디자인 표준_**
  - [rimble.consensys.design](https://rimble.consensys.design)
  - [깃허브(GitHub)](https://github.com/ConsenSys/rimble-ui)
  ## 표준 {#standards}
  이더리움 커뮤니티는 개발자에게 도움이 되는 많은 표준을 채택해왔습니다. 일반적으로, [ 이더리움 개선 제안(Ethereum Improvement Proposals, EIPs)](http://eips.ethereum.org/)을 통해 표준이 소개되고, 이더리움 커뮤니티의 구성원들이 <a href = "http : // eips.ethereum.org/EIPS/eip-1"> EIP-1에 정의된 표준 절차</a>에 따라 제안된 내용에 대해 토론합니다.
  - [이더리움 개선 제안(EIP) 목록](http://eips.ethereum.org/)
  - [이더리움 개선 제안 깃허브 리포지토리](https://github.com/ethereum/EIPs)
  - [이더리움 개선 제안 토론 게시판](https://ethereum-magicians.org/c/eips)
  - [이더리움 거버넌스 개요](https://blog.bmannconsulting.com/ethereum-governance/) _2019년 3월 31일 - 보리스 맨(Boris Mann)_
  - [이더리움 코어 개발자 회의 재생 목록](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) _(유튜브 재생 목록)_
  이더리움 개선 제안이 프로토콜 수준이 아닌 애플리케이션 수준의 표준일 경우(예: 스마트 컨트랙트 형식에 대한 표준), 해당 제안은 [이더리움 논평 요청서(Ethereum Requests for Comment, ERC)](https://eips.ethereum.org/erc)의 형태로 소개됩니다. 많은 ERC 표준이 이더리움 생태계에서 널리 사용되고 있는 핵심적인 표준입니다.
  - [ERC 목록](http://eips.ethereum.org/erc)
  - [ERC20 - 토큰용 표준 인터페이스](https://eips.ethereum.org/EIPS/eip-20)
  - [ERC721 - 대체불가 토큰용 표준 인터페이스](https://eips.ethereum.org/EIPS/eip-721)
