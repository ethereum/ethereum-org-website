---
title: "Hardhat과 ethers를 사용한 Waffle 'hello world' 튜토리얼"
description: "Hardhat과 ethers.js로 여러분의 첫 Waffle 프로젝트를 만들어 보세요"
author: "MiZiet"
tags:
  [
    "Waffle",
    "스마트 계약",
    "Solidity",
    "테스트",
    "Hardhat",
    "ethers.js"
  ]
skill: beginner
lang: ko
published: 2020-10-16
---

이번 [Waffle](https://ethereum-waffle.readthedocs.io) 튜토리얼에서는 [hardhat](https://hardhat.org/)과 [ethers.js](https://docs.ethers.io/v5/)를 사용하여 간단한 "Hello world" 스마트 계약 프로젝트를 설정하는 방법을 알아볼 거예요. 그다음 스마트 계약에 새로운 기능을 추가하고 Waffle로 테스트하는 방법을 알아볼게요.

새 프로젝트를 생성하며 시작해 봐요:

```bash
yarn init
```

또는

```bash
npm init
```

그리고 필요한 패키지를 설치해요:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

또는

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

다음 단계는 `npx hardhat`을 실행해서 샘플 hardhat 프로젝트를 만드는 거예요.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Hardhat v2.0.3에 오신 걸 환영해요 👷‍

? 무엇을 하고 싶으세요? …
❯ 샘플 프로젝트 생성
빈 hardhat.config.js 생성
종료
```

`Create a sample project`를 선택하세요.

프로젝트 구조는 다음과 같을 거예요:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributes
├── .gitignore
├── hardhat.config.js
└── package.json
```

### 이제 이 파일들에 대해 알아볼게요: {#now-lets-talk}

- Greeter.sol - Solidity로 작성된 스마트 계약이에요;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("다음 인사말로 Greeter 배포:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("'%s'에서 '%s'(으)로 인사말 변경", greeting, _greeting);
greeting = _greeting;
}
}
```

스마트 계약은 세 부분으로 나눌 수 있어요:

1. constructor - `greeting`이라는 문자열 유형의 변수를 선언하는 곳이에요,
2. function greet - 호출되면 `greeting`을 반환하는 함수예요,
3. function setGreeting - `greeting` 값을 변경할 수 있게 해주는 함수예요.

- sample-test.js - 테스트 파일이에요

```js
describe("Greeter", function () {
  it("변경 후 새로운 인사말을 반환해야 해요", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### 다음 단계는 스마트 계약을 컴파일하고 테스트를 실행하는 거예요: {#compiling-and-testing}

Waffle 테스트는 Mocha(테스트 프레임워크)와 Chai(어설션 라이브러리)를 사용해요. `npx hardhat test`를 실행하고 다음 메시지가 나타날 때까지 기다리기만 하면 돼요.

```bash
✓ 변경 후 새로운 인사말을 반환해야 해요
```

### 지금까지 아주 좋아요. 프로젝트에 복잡성을 조금 더 추가해 볼까요? <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

누군가 인사말로 빈 문자열을 추가하는 상황을 상상해 보세요. 따뜻한 인사는 아니겠죠?  
그런 일이 일어나지 않도록 해봐요:

누군가 빈 문자열을 전달하면 Solidity의 `revert`를 사용하고 싶어요. 다행히 Waffle의 chai 매처인 `to.be.revertedWith()`로 이 기능을 쉽게 테스트할 수 있어요.

```js
it("빈 문자열을 전달하면 revert되어야 해요", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "인사말은 비워둘 수 없어요"
  )
})
```

새 테스트가 통과하지 못한 것 같아요:

```bash
다음 인사말로 Greeter 배포: Hello, world!
'Hello, world!'에서 'Hola, mundo!'(으)로 인사말 변경
    ✓ 변경 후 새로운 인사말을 반환해야 해요 (1514ms)
다음 인사말로 Greeter 배포: Hello, world!
'Hello, world!'에서 ''(으)로 인사말 변경
    1) 빈 문자열을 전달하면 revert되어야 해요


  1개 통과 (2초)
  1개 실패
```

이 기능을 스마트 계약에 구현해 봐요:

```solidity
require(bytes(_greeting).length > 0, "인사말은 비워둘 수 없어요");
```

이제 setGreeting 함수는 이렇게 보여요:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "인사말은 비워둘 수 없어요");
console.log("'%s'에서 '%s'(으)로 인사말 변경", greeting, _greeting);
greeting = _greeting;
}
```

테스트를 다시 실행해 봐요:

```bash
✓ 변경 후 새로운 인사말을 반환해야 해요 (1467ms)
✓ 빈 문자열을 전달하면 revert되어야 해요 (276ms)

2개 통과 (2초)
```

축하해요! 해내셨네요 :)

### 결론 {#conclusion}

Waffle, Hardhat, ethers.js로 간단한 프로젝트를 만들어 봤어요. 프로젝트를 설정하고, 테스트를 추가하고, 새로운 기능을 구현하는 방법을 배웠어요.

스마트 계약을 테스트하기 위한 더 많은 훌륭한 chai 매처에 대해서는 [Waffle 공식 문서](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html)를 확인해 보세요.
