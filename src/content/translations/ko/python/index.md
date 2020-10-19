---
title: Python 개발자를 위한 이더리움
description: Python 기반 프로젝트 및 툴링을 사용한 이더리움 개발 방법 알아보기
lang: ko
sidebar: true
sidebarDepth: 1
---

# Python 개발자를 위한 이더리움 {#ethereum-for-python-devs}

<div class="featured">Python 기반 프로젝트 및 툴링을 사용한 이더리움 개발 방법 알아보기</div>

이더리움 기반으로 개발된 탈중앙화 애플리케이션(또는 “디앱”)은 암호화폐와 블록체인 기술의 장점을 가지게 됩니다. 탈중앙화 애플리케이션은 일단 이더리움에 배포되면 항상 프로그래밍된 대로 동작하므로 완전히 신뢰할 수 있습니다. 그러므로 새로운 형태의 금융 애플리케이션을 제작하기 위해 디지털 자산을 제어하는 데 사용될 수 있습니다. 그뿐만 아니라 해당 금융 애플리케이션을 어떤 특정 단체나 개인이 제어할 수 없고 검열이 거의 불가능하도록 탈중앙화할 수 있습니다.

<img src="https://i.imgur.com/VhoX4LM.png" width="100%" />

## 스마트 컨트랙트 시작하기 및 솔리디티 언어 {#getting-started-with-smart-contracts-and-solidity}

**Python과 이더리움을 통합하기 위한 첫 단계**

먼저 기본 지식이 더 필요하시나요? [ethereum.org/learn](/ko/learn/) 또는 [ethereum.org/developers](/ko/developers/)를 확인해 보세요.

- [블록체인에 관한 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 컨트랙트 이해하기](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [처음으로 스마트 컨트랙트 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [솔리디티 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 입문자용 문서 {#beginner-articles}

- [바이퍼를 사용한 스마트 컨트랙트 소개](https://kauri.io/article/af913a853eaf4db88627b3ff9572b770/v1/an-introduction-to-smart-contracts-with-vyper)
- [Python 플라스크를 사용하여 이더리움 컨트랙트를 개발하는 방법](https://medium.com/coinmonks/how-to-develop-ethereum-contract-using-python-flask-9758fe65976e)
- [Web3.py 소개 - Python 개발자를 위한 이더리움](https://www.dappuniversity.com/articles/web3-py-intro)
- [Python과 web3.py를 사용하여 스마트 컨트랙트 함수를 호출하는 방법](https://stackoverflow.com/questions/57580702/how-to-call-a-smart-contract-function-using-python-and-web3-py)

## 중급 사용자용 참고 자료 {#intermediate-articles}

- [Python 프로그래머를 위한 디앱 개발](https://levelup.gitconnected.com/dapps-development-for-python-developers-f52b32b54f28)
- [Python 이더리움 인터페이스 생성: 1부](https://hackernoon.com/creating-a-python-ethereum-interface-part-1-4d2e47ea0f4d)
- [Python으로 작성된 이더리움 스마트 컨트랙트: 종합 가이드](https://hackernoon.com/ethereum-smart-contracts-in-python-a-comprehensive-ish-guide-771b03990988)
- [Trinity 이더리움 클라이언트와 관련해 알아야 할 모든 것](https://medium.com/@pipermerriam/everything-you-need-to-know-about-the-trinity-ethereum-client-b093c756d1de)

## 고급 사용 패턴 {#advanced-use-patterns}

- [Python을 사용하여 이더리움 스마트 컨트랙트 컴파일, 배포, 호출하기](https://yohanes.gultom.me/2018/11/28/compiling-deploying-and-calling-ethereum-smartcontract-using-python/)
- [Slither를 사용하여 솔리디티 스마트 컨트랙트 분석하기](https://kauri.io/article/4f4dcf7d105d4714b212a86da742baf6/v1/analyze-solidity-smart-contracts-with-slither)

## Python 프로젝트 및 도구 {#python-projects-and-tools}

- [Brownie](https://github.com/iamdefinitelyahuman/brownie) - _이더리움 스마트 컨트랙트를 배포, 테스트, 상호 작용하기 위한 Python 프레임워크_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _이더리움 관련 코드베이스와 호환되는 유틸리티 함수_
- [py-evm](https://github.com/ethereum/py-evm) - _EVM(Ethereum Virtual Machine)의 구현체_
- [py-solc-x](https://pypi.org/project/py-solc-x/) - _0.5.x를 지원하는 solc 솔리디티 컴파일러를 둘러싸는 Python 래퍼_
- [py-wasm](https://github.com/ethereum/py-wasm) - _웹 어셈블리 인터프리터의 Python 구현체_
- [pydevp2p](https://github.com/ethereum/pydevp2p) - _이더리움 P2P 스택의 구현체_
- [pymaker](https://github.com/makerdao/pymaker) - _Maker Python API 컨트랙트_
- [Mamba](https://mamba.black) - _바이퍼 언어로 작성된 스마트 컨트랙트를 작성, 컴파일, 배포하기 위한 프레임워크_
- [Trinity](https://github.com/ethereum/trinity) - _이더리움 Python클라이언트_
- [바이퍼](https://github.com/ethereum/vyper/) - _EVM용 Python 스마트 컨트랙트 언어_
- [Web3.py](https://github.com/ethereum/web3.py) - _이더리움과의 상호 작용을 위한 Python 라이브러리_

더 많은 참고 자료를 확인하고 싶으신가요? [ethereum.org/developers](/ko/developers/)를 확인해 보세요.

## Python 커뮤니티 기여자 {#python-community-contributors}

- [Py-EVM Gitter](https://gitter.im/ethereum/py-evm)
- [트리니티(Trinity) Gitter](https://gitter.im/ethereum/trinity)
- [바이퍼(Vyper) Gitter](https://gitter.im/ethereum/vyper)
- [Webpy Gitter](https://gitter.im/ethereum/web3.py)

## 그 밖의 통합 목록 {#other-aggregated-lists}

바이퍼 위키에는 [바이퍼에 대한 수많은 리소스 목록](https://github.com/ethereum/vyper/wiki/Vyper-tools-and-resources)이 포함되어 있습니다. Python 관련 도구의 컴파일된 소스는 [py-eth.com](http://py-eth.com/)을 확인해 보세요.
