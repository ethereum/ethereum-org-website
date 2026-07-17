---
title: "Python 개발자를 위한 이더리움 소개, 1부"
description: "이더리움 개발 소개, 특히 Python 프로그래밍 언어 지식이 있는 분들에게 유용합니다."
author: "마크 가로"
lang: ko
tags:
  - python
  - web3.py
skill: beginner
breadcrumb: "Python과 이더리움"
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

이더리움에 대해 들어보셨고 이제 본격적으로 파헤쳐 볼 준비가 되셨나요? 이 글에서는 블록체인의 기본 사항을 빠르게 살펴본 다음, 시뮬레이션된 이더리움 노드와 상호 작용하여 블록 데이터를 읽고, 계정 잔액을 확인하고, 트랜잭션을 전송하는 방법을 알아봅니다. 그 과정에서 기존의 앱 구축 방식과 이 새로운 탈중앙화된 패러다임의 차이점을 강조할 것입니다.

## (가벼운) 사전 지식 {#soft-prerequisites}

이 글은 다양한 개발자들이 쉽게 접근할 수 있도록 작성되었습니다. [Python 도구](/developers/docs/programming-languages/python/)가 포함되지만, 이는 아이디어를 전달하기 위한 수단일 뿐이므로 Python 개발자가 아니어도 문제없습니다. 하지만 이더리움과 관련된 내용으로 빠르게 넘어가기 위해 여러분이 이미 알고 있다고 가정하는 몇 가지 사항이 있습니다.

가정:

- 터미널을 다룰 줄 압니다.
- Python 코드를 몇 줄 작성해 본 적이 있습니다.
- 컴퓨터에 Python 버전 3.6 이상이 설치되어 있습니다([가상 환경](https://realpython.com/effective-python-environment/#virtual-environments) 사용을 강력히 권장합니다).
- Python의 패키지 설치 프로그램인 `pip`을 사용해 본 적이 있습니다.
  다시 말씀드리지만, 이 중 해당하지 않는 사항이 있거나 이 글의 코드를 직접 실행해 볼 계획이 없더라도 내용을 따라가는 데는 큰 무리가 없을 것입니다.

## 블록체인 요약 {#blockchains-briefly}

이더리움을 설명하는 방법은 여러 가지가 있지만, 그 핵심은 블록체인입니다. 블록체인은 일련의 블록으로 구성되어 있으므로 여기서부터 시작하겠습니다. 가장 간단히 말해, 이더리움 블록체인의 각 블록은 약간의 메타데이터와 트랜잭션 목록일 뿐입니다. JSON 형식으로는 다음과 같습니다.

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

각 [블록](/developers/docs/blocks/)에는 이전 블록에 대한 참조가 있습니다. `parentHash`는 단순히 이전 블록의 해시입니다.

<FeaturedText>참고: 이더리움은 고정된 크기의 값("해시")을 생성하기 위해 <a href="https://wikipedia.org/wiki/Hash_function">해시 함수</a>를 정기적으로 사용합니다. 해시는 이더리움에서 중요한 역할을 하지만, 지금은 고유 ID라고 생각하셔도 무방합니다.</FeaturedText>

![A diagram depicting a blockchain including the data inside  each block](./blockchain-diagram.png)

_블록체인은 본질적으로 연결 리스트입니다. 각 블록에는 이전 블록에 대한 참조가 있습니다._

이 데이터 구조는 새로운 것이 아니지만, 네트워크를 관리하는 규칙(즉, 피어 투 피어 프로토콜)은 새롭습니다. 중앙 권한이 없으며, 피어 네트워크는 네트워크를 유지하기 위해 협력해야 하고, 다음 블록에 어떤 트랜잭션을 포함할지 결정하기 위해 경쟁해야 합니다. 따라서 친구에게 돈을 보내려면 해당 트랜잭션을 네트워크에 브로드캐스트한 다음, 다가오는 블록에 포함될 때까지 기다려야 합니다.

블록체인이 한 사용자에서 다른 사용자로 돈이 실제로 전송되었는지 확인할 수 있는 유일한 방법은 해당 블록체인에 기본적으로 내장된(즉, 해당 블록체인에서 생성되고 관리되는) 통화를 사용하는 것입니다. 이더리움에서 이 통화는 이더라고 불리며, 이더리움 블록체인에는 계정 잔액에 대한 유일한 공식 기록이 포함되어 있습니다.

## 새로운 패러다임 {#a-new-paradigm}

이 새로운 탈중앙화된 기술 스택은 새로운 개발자 도구를 탄생시켰습니다. 이러한 도구는 여러 프로그래밍 언어에 존재하지만, 우리는 Python의 관점에서 살펴볼 것입니다. 다시 말씀드리지만, Python이 여러분이 주로 사용하는 언어가 아니더라도 내용을 따라가는 데 큰 어려움은 없을 것입니다.

이더리움과 상호 작용하려는 Python 개발자는 [Web3.py](https://web3py.readthedocs.io/)를 찾게 될 것입니다. Web3.py는 이더리움 노드에 연결한 다음 데이터를 주고받는 방법을 크게 단순화하는 라이브러리입니다.

<FeaturedText>참고: "이더리움 노드"와 "이더리움 클라이언트"는 혼용되어 사용됩니다. 어느 경우든 이더리움 네트워크 참여자가 실행하는 소프트웨어를 의미합니다. 이 소프트웨어는 블록 데이터를 읽고, 체인에 새 블록이 추가될 때 업데이트를 수신하고, 새 트랜잭션을 브로드캐스트하는 등의 작업을 수행할 수 있습니다. 엄밀히 말하면 클라이언트는 소프트웨어이고, 노드는 그 소프트웨어를 실행하는 컴퓨터입니다.</FeaturedText>

[이더리움 클라이언트](/developers/docs/nodes-and-clients/)는 [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP 또는 Websockets를 통해 접근할 수 있도록 구성할 수 있으므로, Web3.py도 이 구성을 반영해야 합니다. Web3.py는 이러한 연결 옵션을 <strong>공급자(provider)</strong>라고 부릅니다. Web3.py 인스턴스를 노드와 연결하려면 세 가지 공급자 중 하나를 선택해야 합니다.

![A diagram showing how web3.py uses IPC to connect your application to an Ethereum node](./web3py-and-nodes.png)

_이더리움 노드와 Web3.py가 동일한 프로토콜(예: 이 다이어그램의 IPC)을 통해 통신하도록 구성합니다._

Web3.py가 제대로 구성되면 블록체인과 상호 작용을 시작할 수 있습니다. 앞으로 다룰 내용의 미리 보기로 몇 가지 Web3.py 사용 예시를 소개합니다.

```python
# 블록 데이터 읽기:
w3.eth.get_block('latest')

# 트랜잭션 전송:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## 설치 {#installation}

이 연습에서는 Python 인터프리터 내에서만 작업할 것입니다. 디렉터리, 파일, 클래스 또는 함수는 생성하지 않습니다.

<FeaturedText>참고: 아래 예시에서 `$` 기호로 시작하는 명령은 터미널에서 실행해야 합니다. (`$` 기호는 줄의 시작을 의미할 뿐이므로 입력하지 마세요.)</FeaturedText>

먼저, 탐색하기 쉬운 사용자 친화적인 환경을 위해 [IPython](https://ipython.org/)을 설치합니다. IPython은 탭 자동 완성 등의 기능을 제공하여 Web3.py 내에서 가능한 작업을 훨씬 쉽게 확인할 수 있게 해줍니다.

```bash
pip install ipython
```

Web3.py는 `web3`라는 이름으로 게시되어 있습니다. 다음과 같이 설치합니다.

```bash
pip install web3
```

한 가지 더, 나중에 블록체인을 시뮬레이션할 예정인데, 이를 위해 몇 가지 종속성이 더 필요합니다. 다음을 통해 설치할 수 있습니다.

```bash
pip install 'web3[tester]'
```

이제 모든 준비가 끝났습니다!

참고: `web3[tester]` 패키지는 Python 3.10.xx 버전까지만 작동합니다.

## 샌드박스 실행 {#spin-up-a-sandbox}

터미널에서 `ipython`을 실행하여 새로운 Python 환경을 엽니다. 이는 `python`을 실행하는 것과 비슷하지만, 더 많은 부가 기능을 제공합니다.

```bash
ipython
```

그러면 실행 중인 Python 및 IPython 버전에 대한 정보가 출력되고, 입력을 기다리는 프롬프트가 표시됩니다.

```python
In [1]:
```

이제 대화형 Python 셸을 보고 계십니다. 본질적으로 이것은 마음껏 테스트해 볼 수 있는 샌드박스입니다. 여기까지 오셨다면 이제 Web3.py를 가져올(import) 차례입니다.

```python
In [1]: from web3 import Web3
```

## Web3 모듈 소개 {#introducing-the-web3-module}

이더리움으로 가는 관문 역할 외에도 [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) 모듈은 몇 가지 편의 기능을 제공합니다. 몇 가지를 살펴보겠습니다.

이더리움 애플리케이션에서는 통화 단위를 변환해야 하는 경우가 많습니다. Web3 모듈은 이를 위한 몇 가지 도우미 메서드인 [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei)와 [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei)를 제공합니다.

<FeaturedText>
참고: 컴퓨터는 소수점 연산에 취약한 것으로 악명이 높습니다. 이를 우회하기 위해 개발자들은 종종 달러 금액을 센트 단위로 저장합니다. 예를 들어, 가격이 $5.99인 품목은 데이터베이스에 599로 저장될 수 있습니다.

<b>이더</b>로 트랜잭션을 처리할 때도 비슷한 패턴이 사용됩니다. 하지만 이더는 소수점 2자리가 아니라 18자리입니다! 이더의 가장 작은 단위를 <b>Wei</b>라고 부르며, 트랜잭션을 전송할 때 지정되는 값이 바로 이 단위입니다.

1 이더 = 1000000000000000000 Wei

1 Wei = 0.000000000000000001 이더

</FeaturedText>

몇 가지 값을 Wei로 변환하거나 Wei에서 변환해 보세요. 이더와 Wei 사이에는 [다양한 단위 이름이 존재](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations)한다는 점에 유의하세요. 그중 가장 잘 알려진 것은 <strong>Gwei</strong>이며, 트랜잭션 수수료를 나타낼 때 자주 사용됩니다.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Web3 모듈의 다른 유틸리티 메서드로는 데이터 형식 변환기(예: [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), 주소 도우미(예: [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)), 해시 함수(예: [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)) 등이 있습니다. 이 중 상당수는 이 시리즈의 뒷부분에서 다룰 예정입니다. 사용 가능한 모든 메서드와 속성을 보려면 `Web3`.을 입력하고 마침표 뒤에 탭 키를 두 번 눌러 IPython의 자동 완성 기능을 활용하세요.

## 체인과 통신하기 {#talk-to-the-chain}

편의 메서드도 훌륭하지만, 이제 블록체인으로 넘어가 보겠습니다. 다음 단계는 Web3.py가 이더리움 노드와 통신하도록 구성하는 것입니다. 여기서는 IPC, HTTP 또는 Websocket 공급자를 사용할 수 있는 옵션이 있습니다.

이 방법을 직접 사용하지는 않겠지만, HTTP 공급자를 사용하는 전체 워크플로의 예시는 다음과 같습니다.

- 이더리움 노드(예: [Geth](https://geth.ethereum.org/))를 다운로드합니다.
- 터미널 창에서 Geth를 시작하고 네트워크가 동기화될 때까지 기다립니다. 기본 HTTP 포트는 `8545`이지만 구성할 수 있습니다.
- Web3.py에 `localhost:8545`에서 HTTP를 통해 노드에 연결하도록 지시합니다.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- `w3` 인스턴스를 사용하여 노드와 상호 작용합니다.

이것이 "실제" 방법 중 하나이긴 하지만, 동기화 프로세스에는 몇 시간이 걸리며 개발 환경만 필요한 경우에는 불필요합니다. Web3.py는 이러한 목적을 위해 네 번째 공급자인 <strong>EthereumTesterProvider</strong>를 제공합니다. 이 테스터 공급자는 완화된 권한과 테스트용 가짜 통화가 있는 시뮬레이션된 이더리움 노드에 연결됩니다.

![A diagram showing the EthereumTesterProvider linking your web3.py application to a simulated Ethereum node](./ethereumtesterprovider.png)

_EthereumTesterProvider는 시뮬레이션된 노드에 연결되며 빠른 개발 환경을 구축하는 데 유용합니다._

이 시뮬레이션된 노드는 [eth-tester](https://github.com/ethereum/eth-tester)라고 불리며, 앞서 `pip install web3[tester]` 명령의 일부로 설치했습니다. 이 테스터 공급자를 사용하도록 Web3.py를 구성하는 방법은 다음과 같이 간단합니다.

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

이제 체인을 서핑할 준비가 되었습니다! 사람들이 흔히 쓰는 말은 아닙니다. 그냥 지어낸 말입니다. 그럼 빠르게 둘러보겠습니다.

## 빠른 둘러보기 {#the-quick-tour}

가장 먼저, 정상 작동 여부를 확인해 보겠습니다.

```python
In [5]: w3.is_connected()
Out[5]: True
```

테스터 공급자를 사용하고 있기 때문에 이 테스트가 큰 의미는 없지만, 만약 실패한다면 `w3` 변수를 인스턴스화할 때 무언가 잘못 입력했을 가능성이 높습니다. 내부 괄호를 포함했는지, 즉 `Web3.EthereumTesterProvider()`와 같이 입력했는지 다시 확인하세요.

## 둘러보기 1단계: [계정](/developers/docs/accounts/) {#tour-stop-1-accounts}

편의를 위해 테스터 공급자는 몇 개의 계정을 생성하고 테스트 이더를 미리 충전해 두었습니다.

먼저, 해당 계정 목록을 확인해 보겠습니다.

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

이 명령을 실행하면 `0x`로 시작하는 10개의 문자열 목록이 표시됩니다. 각각은 <strong>공개 주소</strong>이며, 어떤 면에서는 당좌 예금 계좌 번호와 유사합니다. 누군가 여러분에게 이더를 보내고자 할 때 이 주소를 제공하면 됩니다.

앞서 언급했듯이, 테스터 공급자는 이 각 계정에 테스트 이더를 미리 충전해 두었습니다. 첫 번째 계정에 얼마나 있는지 확인해 보겠습니다.

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

0이 정말 많네요! 가짜 은행으로 달려가며 기뻐하기 전에, 앞서 배운 통화 단위에 대한 내용을 떠올려 보세요. 이더 값은 가장 작은 단위인 Wei로 표시됩니다. 이를 이더로 변환해 보겠습니다.

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

100만 테스트 이더입니다. 여전히 나쁘지 않은 금액이네요.

## 둘러보기 2단계: 블록 데이터 {#tour-stop-2-block-data}

이 시뮬레이션된 블록체인의 상태를 살펴보겠습니다.

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

블록에 대한 많은 정보가 반환되지만, 여기서 몇 가지만 짚고 넘어가겠습니다.

- 테스터 공급자를 구성한 지 얼마나 오래되었든 블록 번호는 0입니다. 12초마다 새 블록을 추가하는 실제 이더리움 네트워크와 달리, 이 시뮬레이션은 여러분이 작업을 지시할 때까지 기다립니다.
- `transactions`는 빈 목록입니다. 이유는 동일합니다. 아직 아무 작업도 하지 않았기 때문입니다. 이 첫 번째 블록은 체인을 시작하기 위한 <strong>빈 블록</strong>입니다.
- `parentHash`가 빈 바이트 묶음이라는 점에 주목하세요. 이는 체인의 첫 번째 블록, 즉 <strong>제네시스 블록</strong>임을 의미합니다.

## 둘러보기 3단계: [트랜잭션](/developers/docs/transactions/) {#tour-stop-3-transactions}

대기 중인 트랜잭션이 있을 때까지 블록 0에 머물러 있으므로, 트랜잭션을 하나 생성해 보겠습니다. 한 계정에서 다른 계정으로 약간의 테스트 이더를 전송합니다.

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

일반적으로 이 시점에서 트랜잭션이 새 블록에 포함될 때까지 몇 초간 기다려야 합니다. 전체 프로세스는 다음과 같습니다.

1. 트랜잭션을 제출하고 트랜잭션 해시를 보관합니다. 트랜잭션이 포함된 블록이 생성되고 브로드캐스트될 때까지 트랜잭션은 "대기 중(pending)" 상태입니다.
   `tx_hash = w3.eth.send_transaction({ … })`
2. 트랜잭션이 블록에 포함될 때까지 기다립니다.
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. 애플리케이션 로직을 계속 진행합니다. 성공한 트랜잭션을 보려면 다음을 실행합니다.
   `w3.eth.get_transaction(tx_hash)`

시뮬레이션 환경에서는 트랜잭션이 새 블록에 즉시 추가되므로 트랜잭션을 바로 확인할 수 있습니다.

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

여기서 익숙한 세부 정보를 볼 수 있습니다. `from`, `to`, `value` 필드는 `send_transaction` 호출의 입력값과 일치해야 합니다. 또 다른 안심할 수 있는 부분은 이 트랜잭션이 블록 번호 1 내의 첫 번째 트랜잭션(`'transactionIndex': 0`)으로 포함되었다는 것입니다.

관련된 두 계정의 잔액을 확인하여 이 트랜잭션의 성공 여부도 쉽게 확인할 수 있습니다. 3 이더가 한 계정에서 다른 계정으로 이동했을 것입니다.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

두 번째 계정은 정상입니다! 잔액이 1,000,000 이더에서 1,000,003 이더로 늘어났습니다. 하지만 첫 번째 계정은 어떻게 된 걸까요? 3 이더보다 조금 더 많은 금액이 줄어든 것 같습니다. 아아, 세상에 공짜는 없으며, 이더리움 퍼블릭 네트워크를 사용하려면 지원 역할을 하는 피어에게 보상을 제공해야 합니다. 트랜잭션을 제출한 계정에서 소액의 트랜잭션 수수료가 차감되었습니다. 이 수수료는 소모된 가스 양(ETH 전송의 경우 21000 가스 단위)에 네트워크 활동에 따라 달라지는 기본 수수료를 곱한 값에, 트랜잭션을 블록에 포함하는 검증자에게 지급되는 팁을 더한 금액입니다.

[가스](/developers/docs/gas/#post-london)에 대해 자세히 알아보기

<FeaturedText>참고: 퍼블릭 네트워크에서 트랜잭션 수수료는 네트워크 수요와 트랜잭션 처리 속도에 따라 달라집니다. 수수료가 계산되는 방식에 관심이 있다면 <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">트랜잭션이 블록에 포함되는 방법</a>에 대한 제 이전 글을 참조하세요.</FeaturedText>

## 잠시 쉬어가기 {#and-breathe}

꽤 오랫동안 달려왔으니 여기서 잠시 쉬어가는 것이 좋겠습니다. 탐험은 계속되며, 이 시리즈의 2부에서 계속해서 파헤쳐 볼 것입니다. 앞으로 다룰 개념으로는 실제 노드 연결, 스마트 컨트랙트, 토큰 등이 있습니다. 추가 질문이 있으신가요? 알려주세요! 여러분의 피드백은 앞으로의 방향에 영향을 미칠 것입니다. [트위터](https://twitter.com/wolovim)를 통한 요청도 환영합니다.