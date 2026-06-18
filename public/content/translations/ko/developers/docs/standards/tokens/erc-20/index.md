---
title: "ERC-20 토큰 표준"
description: "상호운용 가능한 토큰 애플리케이션을 가능하게 하는 이더리움의 대체 가능 토큰 표준인 ERC-20에 대해 알아보세요."
lang: ko
---

## 소개 {#introduction}

**토큰이란 무엇인가요?**

토큰은 [이더리움](/)에서 사실상 거의 모든 것을 나타낼 수 있습니다.

- 온라인 플랫폼의 평판 점수
- 게임 캐릭터의 스킬
- 회사 주식과 같은 금융 자산
- USD와 같은 법정화폐
- 금 1온스
- 그 외 다수...

이더리움의 이렇게 강력한 기능은 강력한 표준으로 다루어져야겠죠? 바로 이 부분에서 ERC-20이 역할을 합니다! 이 표준을 통해 개발자는 다른 제품 및 서비스와 상호운용 가능한 토큰 애플리케이션을 구축할 수 있습니다. 또한 ERC-20 표준은 [이더](/glossary/#ether)에 추가 기능을 제공하는 데에도 사용됩니다.

**ERC-20이란 무엇인가요?**

ERC-20은 대체 가능 토큰(Fungible Token)에 대한 표준을 도입합니다. 즉, 각 토큰이 다른 토큰과 (유형 및 가치 면에서) 정확히 동일하게 만드는 속성을 가지고 있습니다. 예를 들어, ERC-20 토큰은 ETH와 똑같이 작동하므로 1개의 토큰은 항상 다른 모든 1개의 토큰과 동일한 가치를 지닙니다.

## 전제 조건 {#prerequisites}

- [계정](/developers/docs/accounts)
- [스마트 컨트랙트](/developers/docs/smart-contracts/)
- [토큰 표준](/developers/docs/standards/tokens/)

## 본문 {#body}

2015년 11월 파비안 보겔스텔러(Fabian Vogelsteller)가 제안한 ERC-20(Ethereum Request for Comments 20)은 스마트 컨트랙트 내에서 토큰을 위한 API를 구현하는 토큰 표준입니다.

ERC-20이 제공하는 기능의 예시는 다음과 같습니다.

- 한 계정에서 다른 계정으로 토큰 전송
- 계정의 현재 토큰 잔액 조회
- 네트워크에서 사용 가능한 토큰의 총 공급량 조회
- 계정의 토큰 일정량을 제3자 계정에서 사용할 수 있는지 승인

스마트 컨트랙트가 다음 메서드와 이벤트를 구현하면 ERC-20 토큰 컨트랙트라고 부를 수 있으며, 배포된 후에는 이더리움에서 생성된 토큰을 추적하는 역할을 담당하게 됩니다.

[EIP-20](https://eips.ethereum.org/EIPS/eip-20) 발췌:

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

이더리움에서 ERC-20 토큰 컨트랙트를 검사하는 작업을 단순화하는 데 표준이 얼마나 중요한지 살펴보겠습니다. ERC-20 토큰에 대한 인터페이스를 생성하려면 컨트랙트 애플리케이션 바이너리 인터페이스(ABI)만 있으면 됩니다. 아래에서 볼 수 있듯이, 진입 장벽을 낮추기 위해 단순화된 ABI를 사용할 것입니다.

#### Web3.py 예시 {#web3py-example-2}

먼저 [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 라이브러리가 설치되어 있는지 확인하세요.

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # 래핑된 이더 (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # 유니스왑 V2: DAI 2

# 이것은 ERC-20 토큰 컨트랙트의 단순화된 컨트랙트 애플리케이션 바이너리 인터페이스(ABI)입니다.
# 이것은 balanceOf(address), decimals(), symbol() 및 totalSupply() 메서드만 노출합니다.
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

## 알려진 문제 {#erc20-issues}

### ERC-20 토큰 수신 문제 {#reception-issue}

**2024년 6월 20일 기준으로 이 문제로 인해 최소 83,656,418달러 가치의 ERC-20 토큰이 손실되었습니다. 아래 나열된 것처럼 표준 위에 추가적인 제한 사항을 구현하지 않는 한, 순수한 ERC-20 구현은 이 문제에 취약하다는 점에 유의하세요.**

ERC-20 토큰을 처리하도록 설계되지 않은 스마트 컨트랙트로 ERC-20 토큰을 전송하면 해당 토큰이 영구적으로 손실될 수 있습니다. 이는 수신 컨트랙트에 들어오는 토큰을 인식하거나 응답할 수 있는 기능이 없고, ERC-20 표준에는 수신 컨트랙트에 들어오는 토큰에 대해 알리는 메커니즘이 없기 때문에 발생합니다. 이 문제가 나타나는 주요 방식은 다음과 같습니다.

1.	토큰 전송 메커니즘
  - ERC-20 토큰은 transfer 또는 transferFrom 함수를 사용하여 전송됩니다.
	-	사용자가 이 함수들을 사용하여 컨트랙트 주소로 토큰을 전송할 때, 수신 컨트랙트가 이를 처리하도록 설계되었는지 여부와 관계없이 토큰이 전송됩니다.
2.	알림 부재
	-	수신 컨트랙트는 토큰이 전송되었다는 알림이나 콜백을 받지 못합니다.
	-	수신 컨트랙트에 토큰을 처리할 메커니즘(예: 폴백 함수 또는 토큰 수신을 관리하는 전용 함수)이 없으면 토큰은 사실상 컨트랙트 주소에 갇히게 됩니다.
3.	내장된 처리 기능 없음
	-	ERC-20 표준에는 수신 컨트랙트가 구현해야 하는 필수 함수가 포함되어 있지 않아, 많은 컨트랙트가 들어오는 토큰을 제대로 관리할 수 없는 상황이 발생합니다.

**가능한 해결책**

ERC-20에서 이 문제를 완전히 방지하는 것은 불가능하지만, 최종 사용자의 토큰 손실 가능성을 크게 줄일 수 있는 방법이 있습니다.

- 가장 흔한 문제는 사용자가 토큰 컨트랙트 주소 자체로 토큰을 전송하는 경우입니다(예: USDT 토큰 컨트랙트 주소로 USDT를 입금). 이러한 전송 시도를 되돌리기 하도록 `transfer(..)` 함수를 제한하는 것이 좋습니다. `transfer(..)` 함수 구현 내에 `require(_to != address(this));` 검사를 추가하는 것을 고려해 보세요.
- 일반적으로 `transfer(..)` 함수는 컨트랙트에 토큰을 입금하도록 설계되지 않았습니다. 대신 ERC-20 토큰을 컨트랙트에 입금할 때는 `approve(..) & transferFrom(..)` 패턴이 사용됩니다. transfer 함수를 제한하여 이를 통한 컨트랙트 입금을 허용하지 않도록 할 수 있지만, 이는 `transfer(..)` 함수로 컨트랙트에 토큰을 입금할 수 있다고 가정하는 컨트랙트(예: 유니스왑 유동성 풀)와의 호환성을 깨뜨릴 수 있습니다.
- 컨트랙트가 토큰을 수신하도록 설계되지 않았더라도 ERC-20 토큰이 컨트랙트에 들어올 수 있다고 항상 가정하세요. 수신자 측에서 실수로 입금된 것을 방지하거나 거부할 방법은 없습니다. 실수로 입금된 ERC-20 토큰을 추출할 수 있는 함수를 구현하는 것이 좋습니다.
- 대체 토큰 표준 사용을 고려해 보세요.

이 문제로 인해 [ERC-223](/developers/docs/standards/tokens/erc-223) 또는 [ERC-1363](/developers/docs/standards/tokens/erc-1363)과 같은 몇 가지 대체 표준이 등장했습니다.

## 더 읽어보기 {#further-reading}

- [EIP-20: ERC-20 토큰 표준](https://eips.ethereum.org/EIPS/eip-20)
- [오픈제플린 - 토큰](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [오픈제플린 - ERC-20 구현](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 토큰 가이드](https://www.alchemy.com/overviews/erc20-solidity)

## 기타 대체 가능 토큰 표준 {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - 토큰화된 금고](/developers/docs/standards/tokens/erc-4626)

## 튜토리얼: 이더리움에서 ERC-20으로 구축하기 {#tutorials}

- [ERC-20 컨트랙트 연습](/developers/tutorials/erc20-annotated-code/) _– 오픈제플린 ERC-20 컨트랙트 구현에 대한 줄 단위 주석이 달린 연습입니다._
- [안전 장치가 있는 ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– 사용자가 흔히 하는 실수를 피할 수 있도록 ERC-20 토큰에 안전 장치를 추가하는 방법입니다._
- [Ethers.js를 사용하여 토큰 전송하기](/developers/tutorials/send-token-ethersjs/) _– Ethers.js를 사용하여 ERC-20 토큰을 전송하는 초보자 친화적인 가이드입니다._
- [스캠 토큰이 사용하는 몇 가지 속임수와 이를 감지하는 방법](/developers/tutorials/scam-token-tricks/) _– 스캠 ERC-20 토큰 패턴과 이를 식별하는 방법에 대한 심층 분석입니다._