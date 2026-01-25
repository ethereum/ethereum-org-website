---
title: .NET 개발자를 위한 이더리움
description: .NET 기반 프로젝트 및 툴링을 사용하여 이더리움 개발 방법 알아보기
lang: ko
incomplete: true
---

<FeaturedText>.NET 기반 프로젝트와 툴링을 사용하여 이더리움용으로 개발하는 방법을 알아보세요</FeaturedText>

이더리움 기반으로 개발된 탈중앙화 애플리케이션(또는 “디앱”)은 암호화폐와 블록체인 기술의 장점을 가지게 됩니다. 탈중앙화 애플리케이션은 일단 이더리움에 배포되면 항상 프로그래밍된 대로 동작하므로 완전히 신뢰할 수 있습니다. 그러므로 새로운 형태의 금융 애플리케이션을 제작하기 위해 디지털 자산을 제어하는 데 사용될 수 있습니다. 그뿐만 아니라 해당 금융 애플리케이션을 어떤 특정 단체나 개인이 제어할 수 없고 검열이 거의 불가능하도록 탈중앙화할 수 있습니다.

이더리움 기반으로 개발된 탈중앙화 애플리케이션은 마이크로스프트(Microsoft) 기술 스택의 도구와 언어를 사용하여 스마트 계약과 상호 작용합니다. 지원되는 언어에는 C#, # Visual Basic .NET, F# 등이 있으며 .NET Framework/.NET Core/.NET Standard에서 VSCode 및 Visual Studio와 같은 도구를 통해 실행됩니다. 마이크로소프트 애저(Microsoft Azure) 블록체인을 사용하여 애저에서 수 분 이내에 이더리움 블록체인을 배포할 수 있습니다. 이더리움에서 .NET에 대한 열정을 표현해 보세요!

## 스마트 계약과 솔리디티 언어 시작하기 {#getting-started-with-smart-contracts-and-the-solidity-language}

**이더리움과 .NET을 통합하기 위한 첫걸음을 내딛으세요**

먼저 기본 지식이 더 필요하시나요? [ethereum.org/learn](/learn/) 또는 [ethereum.org/developers](/developers/)를 확인해 보세요.

- [블록체인 설명](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [스마트 계약 이해하기](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [첫 스마트 계약 작성하기](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [솔리디티 컴파일 및 배포 방법 알아보기](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 초보자를 위한 참고 자료 및 링크 {#beginner-references-and-links}

**네더리움 라이브러리(Nethereum library) 및 VS 코드 솔리디티(Code Solidity) 소개**

- [Nethereum, 시작하기](https://docs.nethereum.com/en/latest/getting-started/)
- [VS Code 솔리디티 설치하기](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [.NET 개발자의 이더리움 스마트 계약 생성 및 호출 워크플로](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Nethereum을 이용한 스마트 계약 통합](https://kauri.io/#collections/Getting%20Started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereumm)
- [Nethereum으로 .NET 및 이더리움 블록체인 스마트 계약 연동하기](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933), [중문판](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1)으로도 제공
- [Nethereum - 블록체인을 위한 오픈 소스 .NET 통합 라이브러리](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [Nethereum을 사용하여 이더리움 트랜잭션을 SQL 데이터베이스에 작성하기](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [C#과 VisualStudio를 사용하여 이더리움 스마트 계약을 쉽게 배포하는 방법 알아보기](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**설정을 건너뛰고 곧바로 샘플을 확인하고 싶으세요?**

- [Playground](http://playground.nethereum.com/) - 브라우저를 통해 이더리움과 상호작용하고 Nethereum 사용법을 알아보세요.
  - 계정 잔액 조회하기 [C#](http://playground.nethereum.com/csharp/id/1001) [VB.NET](http://playground.nethereum.com/vb/id/2001)
  - ERC20 스마트 계약 잔액 조회하기 [C#](http://playground.nethereum.com/csharp/id/1005) [VB.NET](http://playground.nethereum.com/vb/id/2004)
  - 계정으로 이더 전송하기 [C#](http://playground.nethereum.com/csharp/id/1003) [VB.NET](http://playground.nethereum.com/vb/id/2003)
  - ... 기타

## 중급자용 아티클 {#intermediate-articles}

- [Nethereum 워크북/샘플 목록](http://docs.nethereum.com/en/latest/Nethereum.Workbooks/docs/)
- [자체 개발 테스트 체인 배포하기](https://github.com/Nethereum/Testchains)
- [솔리디티용 VSCode Codegen 플러그인](https://docs.nethereum.com/en/latest/nethereum-codegen-vscodesolidity/)
- [Unity와 이더리움: 왜, 그리고 어떻게](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [이더리움 탈중앙화앱용 ASP.NET Core 웹 API 만들기](https://tech-mint.com/blockchain/create-asp-net-core-web-api-for-ethereum-dapps/)
- [Nethereum Web3를 사용하여 공급망 추적 시스템 구현하기](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [Nethereum 블록 처리](https://nethereum.readthedocs.io/en/latest/nethereum-block-processing-detail/), [C# Playground 샘플](http://playground.nethereum.com/csharp/id/1025) 포함
- [Nethereum 웹소켓 스트리밍](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [Kaleido와 Nethereum](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum과 Nethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## 고급 사용 패턴 {#advanced-use-patterns}

- [Azure Key Vault와 Nethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)
- [Ujo Nethereum 백엔드 참조 아키텍처](https://docs.nethereum.com/en/latest/nethereum-ujo-backend-sample/)

## .NET 프로젝트, 도구 및 기타 흥미로운 자료 {#dot-net-projects-tools-and-other-fun-stuff}

- [Nethereum Playground](http://playground.nethereum.com/) - _브라우저에서 Nethereum 코드 스니펫 컴파일, 생성 및 실행_
- [Nethereum Codegen Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _Blazor의 UI를 사용한 Nethereum codegen_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _.NET Wasm SPA 라이트 블록체인 익스플로러 및 간단한 지갑_
- [Wonka 비즈니스 규칙 엔진](https://docs.nethereum.com/en/latest/wonka/) - _근본적으로 메타데이터 기반인 비즈니스 규칙 엔진(.NET 및 이더리움 플랫폼 모두 지원)_
- [Nethermind](https://github.com/NethermindEth/nethermind) - _Linux, Windows, MacOS용 .NET Core 이더리움 클라이언트_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _이더리움 관련 코드베이스 작업을 위한 유틸리티 함수_
- [TestChains](https://github.com/Nethereum/TestChains) - _빠른 응답을 위해 사전 구성된 .NET 개발 체인(PoA)_

더 많은 참고 자료를 확인하고 싶으신가요? [ethereum.org/developers](/developers/)를 확인해 보세요.

## .NET 커뮤니티 기여자 {#dot-net-community-contributors}

Nethereum에서는 주로 [Gitter](https://gitter.im/Nethereum/Nethereum)에서 활동하며, 누구나 자유롭게 질문과 답변을 하고, 도움을 받거나 편안하게 시간을 보낼 수 있습니다. [Nethereum GitHub 리포지토리](https://github.com/Nethereum)에서 자유롭게 PR을 보내거나 이슈를 열거나, 저희가 보유한 다양한 사이드/샘플 프로젝트를 둘러보세요. [Discord](https://discord.gg/jQPrR58FxX)에서도 저희를 만나보실 수 있습니다!

Nethermind가 처음이고 시작하는 데 도움이 필요하시면, 저희 [Discord](http://discord.gg/PaCMRFdvWT)에 참여하세요. 저희 개발자들이 질문에 답변해 드립니다. [Nethermind GitHub 리포지토리](https://github.com/NethermindEth/nethermind)에서 주저하지 말고 PR을 열거나 이슈를 제기하세요.

## 기타 수집된 목록 {#other-aggregated-lists}

[Nethereum 공식 사이트](https://nethereum.com/)  
[Nethermind 공식 사이트](https://nethermind.io/)
