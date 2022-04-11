---
title: .NET 개발자를 위한 이더리움
description: .NET 기반 프로젝트 및 툴링을 사용하여 이더리움 개발 방법 알아보기
lang: ko
sidebar: true
sidebarDepth: 1
---

# .NET 개발자를 위한 이더리움 {#ethereum-for-dot-net-devs}

<div class="featured">.NET 기반 프로젝트 및 툴링을 사용하여 이더리움 개발 방법 알아보기</div>

이더리움 기반으로 개발된 탈중앙화 애플리케이션(또는 “디앱”)은 암호화폐와 블록체인 기술의 장점을 가지게 됩니다. 탈중앙화 애플리케이션은 일단 이더리움에 배포되면 항상 프로그래밍된 대로 동작하므로 완전히 신뢰할 수 있습니다. 그러므로 새로운 형태의 금융 애플리케이션을 제작하기 위해 디지털 자산을 제어하는 데 사용될 수 있습니다. 그뿐만 아니라 해당 금융 애플리케이션을 어떤 특정 단체나 개인이 제어할 수 없고 검열이 거의 불가능하도록 탈중앙화할 수 있습니다.

이더리움 기반으로 개발된 탈중앙화 애플리케이션은 마이크로스프트(Microsoft) 기술 스택의 도구와 언어를 사용하여 스마트 컨트랙트와 상호 작용합니다. 지원되는 언어에는 C#, # Visual Basic .NET, F# 등이 있으며 .NET Framework/.NET Core/.NET Standard에서 VSCode 및 Visual Studio와 같은 도구를 통해 실행됩니다. 마이크로소프트 애저(Microsoft Azure) 블록체인을 사용하여 애저에서 수 분 이내에 이더리움 블록체인을 배포할 수 있습니다. 이더리움에서 .NET에 대한 열정을 표현해 보세요!

<img src="https://raw.githubusercontent.com/Nethereum/Nethereum/master/logos/logo192x192t.png" />

## 스마트 컨트랙트 시작하기 및 솔리디티 언어

**.NET과 이더리움을 통합하기 위한 첫 단계**

먼저 기본 지식이 더 필요하시나요? [ethereum.org/learn](/ko/learn/) 또는 [ethereum.org/developers](/ko/developers/)를 확인해 보세요.

- [블록체인에 관한 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 컨트랙트 이해하기](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [처음으로 스마트 컨트랙트 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [솔리디티 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 입문자용 참고 자료 및 각종 링크 {#beginner-references-and-links}

**네더리움 라이브러리(Nethereum library) 및 VS 코드 솔리디티(Code Solidity) 소개**

- [네더리움(Nethereum) 시작하기](https://docs.nethereum.com/en/latest/getting-started/)
- [VS Code 솔리디티 설치하기](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [.NET 개발자가 이더리움 스마트 컨트랙트를 작성하고 호출하기 위한 작업 흐름](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Nethereum과 스마트 컨트랙트의 통합](https://kauri.io/#collections/getting%20started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereum)
- [.NET 및 이더리움 블록체인 스마트 컨트랙트와 Nethereum 연결하기](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933), [中文版](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1) 이용 가능
- [Nethereum - 블록체인 개발을 위한 오픈 소스 .NET 통합 라이브러리](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [네더리움(Nethereum) 을 사용하여 SQL 데이터베이스에 이더리움 트랜잭션 기입하기](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [C 및 비주얼 스튜디오를 사용하여 이더리움 스마트 컨트랙트를 간편하게# 배포하는 방법 알아보기](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**설정을 건너뛰고 곧바로 샘플을 확인하고 싶으세요?**

- [Playground](http://playground.nethereum.com/) - 브라우저를 통해 이더리움과 상호 작용하고 Nethereum을 사용하는 방법 알아보기
  - 계정 잔고 쿼리하기 [C#](http://playground.nethereum.com/csharp/id/1001) [VB.NET](http://playground.nethereum.com/vb/id/2001)
  - ERC20 스마트 컨트랙트 잔고 쿼리하기 [C#](http://playground.nethereum.com/csharp/id/1005) [VB.NET](http://playground.nethereum.com/vb/id/2004)
  - 계정으로 이더 송금하기 [C#](http://playground.nethereum.com/csharp/id/1003) [VB.NET](http://playground.nethereum.com/vb/id/2003)
  - ... 기타

## 중급 사용자용 참고 자료 {#intermediate-articles}

- [네더리움(Nethereum) 워크북/샘플 목록](http://docs.nethereum.com/en/latest/Nethereum.Workbooks/docs/)
- [사용자의 개발 테스트체인 배포하기](https://github.com/Nethereum/Testchains)
- [솔리디티용 VSCode Codegen 플러그인](https://docs.nethereum.com/en/latest/nethereum-codegen-vscodesolidity/)
- [Unity와 이더리움: 이유와 방법](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [이더리움 디앱용 ASP.NET Core 웹 API 만들기](https://tech-mint.com/create-asp-net-core-web-api-for-ethereum-dapps/)
- [Nethereum Web3를 사용하여 공급망 추적 시스템 구현하기](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [Nethereum 블록 처리](https://nethereum.readthedocs.io/en/latest/nethereum-block-processing-detail/) 및 [C# Playground 샘플](http://playground.nethereum.com/csharp/id/1025)
- [네더리움 웹소켓(Nethereum WebSocket) 스트리밍](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [칼레이도(Kaleido) 및 네더리움(Nethereum)](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum 및 Nethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## 고급 사용 패턴 {#advanced-use-patterns}

- [Azure Key Vault 및 Nethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)
- [Ujo Nethereum 백엔드 참조 아키텍처](https://docs.nethereum.com/en/latest/nethereum-ujo-backend-sample/)

## .NET 프로젝트, 도구 및 기타 흥미로운 자료 {#dot-net-projects-tools-and-other-fun stiff}

- [Nethereum Playground](http://playground.nethereum.com/) - _브라우저에서 Nethereum 코드 스니펫 컴파일, 생성 및 실행_
- [Nethereum Codegen Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _Blazor에서 UI가 포함된 Nethereum 코드 생성_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _.NET Wasm SPA 경량급 블록체인 탐색기 및 간단한 지갑_
- [Wonka 비즈니스 규칙 엔진](https://docs.nethereum.com/en/latest/wonka/) - _기본적으로 메타데이터 기반 방식인 비즈니스 규칙 엔진(.NET 플랫폼 및 이더리움 플랫폼 공용)_
- [Nethermind](https://github.com/NethermindEth/nethermind) - _Linux, Windows, MacOs용 .NET Core 이더리움 클라이언트_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _이더리움 관련 코드베이스와 호환되는 유틸리티 함수_
- [TestChains](https://github.com/Nethereum/TestChains) - _빠른 응답 속도를 위해 미리 구성된 .NET 데브체인(PoA)_

더 많은 참고 자료를 확인하고 싶으신가요? [ethereum.org/developers](/ko/developers/)를 확인해 보세요.

## .NET 커뮤니티 기여자 {#dot-net-community-contributors}

Nethereum과 관련해서는 주로 [Gitter](https://gitter.im/Nethereum/Nethereum)에서 활동하고 있습니다. 여기서는 누구나 자유롭게 질문하고 답변하며, 도움을 받거나 그냥 시간을 보낼 수도 있습니다. [Nethereum GitHub 리포지토리](https://github.com/Nethereum)에서 부담 없이 PR(Pull Request)을 하거나 이슈를 생성해 보세요. 또는 다양한 사이드/샘플 프로젝트도 탐색해 볼 수 있습니다.

Nethermind와 관련해서도 [Gitter](https://gitter.im/nethermindeth/nethermind)를 통해 소통해 보세요. PR 또는 이슈는 [Nethermind GitHub 리포지토리](https://github.com/NethermindEth/nethermind)를 확인해 보세요.

## 그 밖의 통합 목록 {#other-aggregated-lists}

[공식 Nethereum 사이트](https://nethereum.com/) [공식 Nethermind 사이트](https://nethermind.io/)
