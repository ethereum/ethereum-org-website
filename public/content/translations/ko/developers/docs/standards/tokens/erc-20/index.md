---
title: ERC-20 토큰 표준
description: 상호 운용 가능한 토큰 애플리케이션을 지원하는 이더리움의 대체 가능한 토큰 표준인 ERC-20에 대해 알아보세요.
lang: ko
---

## 소개 {#introduction}

**토큰이란 무엇인가요?**

이더리움에서 토큰은 거의 모든 것을 표현할 수 있습니다.

- 온라인 플랫폼의 평판점수
- 게임 캐릭터의 스킬
- 회사 주식지분 같은 금융자산
- 미국달러와 같은 법정통화
- 1 온스의 금
- 그 이상 많은것들...

이더리움의 이러한 강력한 특성은 견고한 표준 위에서 동작해야 하지 않을까요? 그것이 바로 ERC-20의 역할입니다! 이 표준을 통해서 개발자들은 다른 제품 및 서비스와 상호 연계 운용 가능한 토큰 애플리케이션을 구축할 수 있습니다. ERC-20 표준은 [이더](/glossary/#ether)에 추가적인 기능을 제공하는 데에도 사용됩니다.

**ERC-20은 무엇인가요?**

ERC-20은 대체가능 토큰의 표준을 제시합니다. 즉, 각 토큰은 다른 토큰과 정확히 동일(유형 및 가치) 하게 만드는 속성을 가지고 있습니다. 예를 들어 ERC-20 토큰은 ETH로 취급되며, 이는 1 토큰이 다른 모든 토큰과 항상 동일함을 의미합니다.

## 필수 구성 요소 {#prerequisites}

- [계정](/developers/docs/accounts)
- [스마트 계약](/developers/docs/smart-contracts/)
- [토큰 표준](/developers/docs/standards/tokens/)

## 본문 {#body}

2015년 11월 Fabian Vogelsteller가 제안한 ERC-20(Ethereum Request for Comments 20) 은 스마트 계약 내에서 토큰용 API를 구현하는 토큰 표준이다.

ERC-20에서 제공하는 기능 예시

- 서로 다른 계정간에 토큰 전송하기
- 계정에서 토큰 잔고 확인하기
- 가용 중인 네트워크 상의 토큰 총 공급량 확인하기
- 특정 계정의 토큰을 다른 외부 계정에서 사용 가능한 지 여부를 승인하기

스마트 계약이 다음과 같은 방법과 이벤트를 실행할 경우 이를 ERC-20 토큰 계약이라고 할 수 있으며, 한번 구축되면 이더리움에서 생성된 토큰들을 추적해야 한다.

[EIP-20](https://eips.ethereum.org/EIPS/eip-20)에서:

### 메서드 {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### 이벤트 {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### 예시 {#web3py-example}

우리가 이더리움상의 어느 ERC-20 토큰 계약을 검사하는데 있어서 이 표준이 얼마나 주요하게 그 검사를 간단히 만드는지 살펴보자.
ERC-20 토큰에 대한 인터페이스를 생성하려면 계약 애플리케이션 바이너리 인터페이스(ABI) 가 필요하다. 아래 보이는 것처럼 우리는 잡음을 줄이기 위해 단순화된 ABI를 사용해 예제를 만들것이다.

#### Web3.py 예시 {#web3py-example}

먼저, [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) 파이썬 라이브러리를 설치했는지 확인하세요.

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# 이것은 ERC-20 토큰 계약의 단순화된 계약 애플리케이션 바이너리 인터페이스(ABI)입니다.
# balanceOf(address), decimals(), symbol() 및 totalSupply() 메서드만 노출합니다.
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## 알려진 문제점 {#erc20-issues}

### ERC-20 토큰 수신 문제 {#reception-issue}

**2024년 6월 20일 기준, 이 문제로 인해 최소 83,656,418달러 상당의 ERC-20 토큰이 손실되었습니다. 아래 목록에 명시된 대로 표준 외에 추가적인 제한 사항을 구현하지 않는 한 순수한 ERC-20 구현은 이 문제에 취약하다는 점에 유의하세요.**

ERC-20 토큰이 ERC-20 토큰을 처리하도록 설계되지 않은 스마트 계약으로 전송되면, 해당 토큰은 영구적으로 손실될 수 있습니다. 이는 수신 계약이 들어오는 토큰을 인식하거나 응답할 수 있는 기능이 없기 때문에 발생하며, ERC-20 표준에는 수신 계약에 들어오는 토큰을 알리는 메커니즘이 없습니다. 이 문제는 다음과 같은 방식으로 발생합니다:

1. 토큰 전송 메커니즘

- ERC-20 토큰은 transfer 또는 transferFrom 함수를 사용하여 전송됩니다.
  - 사용자가 이러한 함수를 사용하여 토큰을 계약 주소로 전송할 때, 수신 계약이 토큰을 처리하도록 설계되었는지와 상관없이 토큰은 전송됩니다.

2. 알림의 부재
   - 수신 계약은 토큰이 전송되었다는 알림이나 콜백을 받지 않습니다.
   - 수신 계약에 토큰을 처리할 메커니즘(예: 폴백 함수나 토큰 수신을 관리하는 전용 함수)이 없는 경우, 토큰은 사실상 계약의 주소에 갇히게 됩니다.
3. 내장된 처리 없음
   - ERC-20 표준은 수신 계약이 구현해야 할 필수 기능을 포함하지 않으므로, 많은 계약이 들어오는 토큰을 적절히 관리할 수 없는 상황이 발생합니다.

**가능한 해결책**

ERC-20으로 이 문제를 완전히 방지할 수는 없지만, 최종 사용자의 토큰 손실 가능성을 크게 줄일 수 있는 방법들이 있습니다.

- 가장 흔한 문제는 사용자가 토큰 계약 주소 자체로 토큰을 보내는 경우입니다(예: USDT 토큰 계약 주소로 USDT를 예치하는 경우). `transfer(..)` 함수를 제한하여 이러한 전송 시도를 되돌리는 것을 권장합니다. `transfer(..)` 함수의 구현 내에 `require(_to != address(this));` 확인을 추가하는 것을 고려하세요.
- 일반적으로 `transfer(..)` 함수는 계약에 토큰을 예치하기 위해 설계되지 않았습니다. `approve(..)` & transferFrom(..)`패턴은 대신 ERC-20 토큰을 계약에 예치하는 데 사용됩니다. 전송 함수를 제한하여 이를 통해 어떤 계약에도 토큰을 예치하는 것을 허용하지 않도록 할 수 있지만,`trasnfer(..)\` 함수를 사용하여 계약에 토큰을 예치할 수 있다고 가정하는 계약(예: Uniswap 유동성 풀)과의 호환성을 깨뜨릴 수 있습니다.
- 계약이 어떠한 토큰도 받지 않도록 되어 있더라도 ERC-20 토큰이 계약에 들어올 수 있다고 항상 가정하세요. 수신자 측에서 우발적인 예치를 방지하거나 거부할 방법은 없습니다. 우발적으로 예치된 ERC-20 토큰을 추출할 수 있는 함수를 구현하는 것을 권장합니다.
- 대안 토큰 표준 사용을 고려해 보세요.

이 문제에서 [ERC-223](/developers/docs/standards/tokens/erc-223) 또는 [ERC-1363](/developers/docs/standards/tokens/erc-1363)과 같은 일부 대안 표준이 나왔습니다.

## 더 읽어보기 {#further-reading}

- [EIP-20: ERC-20 토큰 표준](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - 토큰](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 구현](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 토큰 가이드](https://www.alchemy.com/overviews/erc20-solidity)

## 기타 대체 가능한 토큰 표준 {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - 토큰화된 금고](/developers/docs/standards/tokens/erc-4626)
