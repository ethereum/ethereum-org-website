---
title: ERC-721 대체 불가능 토큰 표준
description: 이더리움에서 고유한 디지털 자산을 나타내는 대체 불가 토큰(NFT)의 표준인 ERC-721에 대해 알아보세요.
lang: ko
---

## 소개 {#introduction}

**대체 불가능 토큰이란 무엇인가요?**

대체 불가능 토큰(NFT)은 무언가나 누군가를 독특한 방식으로 식별하는 데 사용됩니다. 이 유형의 토큰은 수집품, 접근 키, 복권, 콘서트 및 스포츠 경기의 번호 매겨진 좌석 등을 제공하는 플랫폼에서 사용하기에 적합합니다. 이 특별한 유형의 토큰은 놀라운 가능성을 가지고 있어 ERC-721이라는 적절한 표준이 필요합니다!

**ERC-721은 무엇인가요?**

ERC-721은 NFT 표준을 도입하였으며, 즉, 이 유형의 토큰은 고유하며 같은 스마트 계약의 다른 토큰과는 나이나 희귀성 또는 시각적인 요소 등으로 인해 다른 가치를 가질 수 있습니다.
잠깐, 시각적인 요소라고요?

네! 모든 NFT에는 `tokenId`라는 `uint256` 변수가 있으므로 모든 ERC-721 계약의 경우
`contract address, uint256 tokenId` 쌍은 전역적으로 고유해야 합니다. 즉, 탈중앙화앱은 `tokenId`를 입력으로 사용하고 좀비, 무기, 기술 또는 놀라운 고양이 같은 멋진 것을 이미지로 출력하는 "변환기"를 가질 수 있습니다!

## 필수 구성 요소 {#prerequisites}

- [계정](/developers/docs/accounts/)
- [스마트 계약](/developers/docs/smart-contracts/)
- [토큰 표준](/developers/docs/standards/tokens/)

## 본문 {#body}

ERC-721(Ethereum Request for Comments 721)은 2018년 1월 William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs가 제안한 대체 불가능 토큰 표준으로, 스마트 계약 내에서 토큰을 위한 API를 구현합니다.

이 표준은 한 계정에서 다른 계정으로 토큰을 전송하고, 계정의 현재 토큰 잔액을 확인하고, 특정 토큰의 소유자를 확인하며 네트워크에서 사용 가능한 토큰의 총 공급량을 가져오는 기능을 제공합니다.
또한, 다른 계정이 특정 계정에서 일정량의 토큰을 이동하도록 승인하는 기능도 포함되어 있습니다.

스마트 계약이 다음 메서드와 이벤트를 구현하면 ERC-721 대체 불가능 토큰 계약이라 부를 수 있으며, 배포되면 이더리움 상에서 생성된 토큰을 추적하는 책임을 갖게 됩니다.

[EIP-721](https://eips.ethereum.org/EIPS/eip-721)에서 발췌:

### 메서드 {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### 이벤트 {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### 예시 {#web3py-example}

표준이 이더리움의 모든 ERC-721 토큰 계약을 간단하게 검사하는 데 얼마나 중요한지 살펴보겠습니다.
모든 ERC-721 토큰에 대한 인터페이스를 생성하려면 계약 애플리케이션 바이너리 인터페이스(ABI)만 있으면 됩니다. 아래 보이는 것처럼 우리는 잡음을 줄이기 위해 단순화된 ABI를 사용해 예제를 만들것이다.

#### Web3.py 예시 {#web3py-example}

먼저, [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) 파이썬 라이브러리를 설치했는지 확인하세요.

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # 크립토키티 계약

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # 크립토키티 판매 경매

# 이것은 ERC-721 NFT 계약의 단순화된 계약 애플리케이션 바이너리 인터페이스(ABI)입니다.
# balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply() 메서드만 노출합니다.
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
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
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] 경매 중인 NFT: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] 임신 중인 NFT: {pregnant_kitties}")

# 전송 이벤트 ABI를 사용하여 전송된 키티에 대한 정보 얻기
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# 로그를 필터링하려면 이벤트의 서명이 필요합니다
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# 참고:
#   - 전송 이벤트가 반환되지 않으면 블록 수를 120개 이상으로 늘립니다.
#   - 전송 이벤트를 찾지 못한 경우 다음에서 tokenId를 얻을 수도 있습니다.
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       이벤트 로그를 확장하고 "tokenId" 인수를 복사하려면 클릭하십시오.
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # 위 링크에서 "tokenId"를 여기에 붙여넣습니다.
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFT {kitty_id} 임신 여부: {is_pregnant}")
```

CryptoKitties 계약은 표준 이벤트 외에도 몇 가지 흥미로운 이벤트가 있습니다.

그중 `Pregnant`와 `Birth` 두 가지를 확인해 보겠습니다.

```python
# Pregnant 및 Birth 이벤트 ABI를 사용하여 새로운 키티에 대한 정보 얻기
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# 로그를 필터링하려면 이벤트의 서명이 필요합니다
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# 다음은 Pregnant 이벤트입니다:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# 다음은 Birth 이벤트입니다:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## 인기 있는 NFT {#popular-nfts}

- [Etherscan NFT 추적기](https://etherscan.io/nft-top-contracts)는 전송량을 기준으로 이더리움의 상위 NFT를 나열합니다.
- [CryptoKitties](https://www.cryptokitties.co/)는 우리가 CryptoKitties라고 부르는 번식 가능하고 수집 가능하며 아주 사랑스러운 생물을 중심으로 하는 게임입니다.
- [Sorare](https://sorare.com/)는 한정판 수집품을 수집하고, 팀을 관리하며 상품을 획득하기 위해 경쟁하는 글로벌 판타지 축구 게임입니다.
- [이더리움 이름 서비스(ENS)](https://ens.domains/)는 간단하고 사람이 읽을 수 있는 이름을 사용하여 블록체인 온체인과 오프체인 리소스의 주소를 지정하는 안전하고 분산된 방법을 제공합니다.
- [POAP](https://poap.xyz)는 이벤트에 참석하거나 특정 작업을 완료하는 사람들에게 무료 NFT를 제공합니다. POAP는 무료로 생성 및 배포할 수 있습니다.
- [Unstoppable Domains](https://unstoppabledomains.com/)는 샌프란시스코에 본사를 둔 블록체인 도메인 구축 회사입니다. 블록체인 도메인은 암호화폐 주소를 사람이 읽을 수 있는 이름으로 대체하며, 검열 저항성 웹사이트를 활성화하는 데 사용할 수 있습니다.
- [Gods Unchained Cards](https://godsunchained.com/)는 NFT를 사용하여 게임 내 자산에 대한 실제 소유권을 부여하는 이더리움 블록체인 기반의 TCG입니다.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com)은 10,000개의 고유한 NFT 컬렉션으로, 증명할 수 있는 희귀한 예술 작품일 뿐만 아니라 클럽의 멤버십 토큰 역할을 하며, 커뮤니티의 노력의 결과로 시간이 지남에 따라 증가하는 회원 특전과 혜택을 제공합니다.

## 더 읽어보기 {#further-reading}

- [EIP-721: ERC-721 대체 불가 토큰 표준](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 문서](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 구현](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
