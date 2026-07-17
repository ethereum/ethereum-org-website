---
title: "ERC-721 대체 불가능 토큰 표준"
description: "이더리움에서 고유한 디지털 자산을 나타내는 대체 불가능 토큰(NFT)의 표준인 ERC-721에 대해 알아보세요."
lang: ko
---

## 소개 {#introduction}

**대체 불가능 토큰이란 무엇인가요?**

대체 불가능 토큰(NFT)은 무언가 또는 누군가를 고유한 방식으로 식별하는 데 사용됩니다. 이러한 유형의 토큰은 수집품, 액세스 키, 복권, 콘서트 및 스포츠 경기의 지정석 등을 제공하는 플랫폼에서 사용하기에 완벽합니다. 이 특별한 유형의 토큰은 놀라운 가능성을 가지고 있으므로 적절한 표준이 필요하며, ERC-721이 이를 해결하기 위해 등장했습니다!

**ERC-721이란 무엇인가요?**

ERC-721은 NFT에 대한 표준을 도입합니다. 즉, 이 유형의 토큰은 고유하며 동일한 스마트 컨트랙트의 다른 토큰과 연식, 희소성 또는 시각적 요소 등 다른 이유로 인해 다른 가치를 가질 수 있습니다. 잠깐, 시각적 요소라고요?

네! 모든 NFT에는 `tokenId`라는 `uint256` 변수가 있으므로, 모든 ERC-721 컨트랙트에서 `contract address, uint256 tokenId` 쌍은 전 세계적으로 고유해야 합니다. 즉, 탈중앙화 애플리케이션 (dapp)은 `tokenId`를 입력으로 사용하여 좀비, 무기, 스킬 또는 놀라운 고양이와 같은 멋진 이미지를 출력하는 "변환기"를 가질 수 있습니다!

## 전제 조건 {#prerequisites}

- [계정](/developers/docs/accounts/)
- [스마트 컨트랙트](/developers/docs/smart-contracts/)
- [토큰 표준](/developers/docs/standards/tokens/)

## 본문 {#body}

2018년 1월 William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs가 제안한 ERC-721([이더리움](/) 의견 요청 721)은 스마트 컨트랙트 내에서 토큰을 위한 API를 구현하는 대체 불가능 토큰 표준입니다.

이 표준은 한 계정에서 다른 계정으로 토큰을 전송하고, 계정의 현재 토큰 잔액을 가져오고, 특정 토큰의 소유자를 확인하며, 네트워크에서 사용 가능한 토큰의 총 공급량을 가져오는 등의 기능을 제공합니다.
이 외에도 계정의 토큰 일정량을 제3자 계정에서 이동할 수 있도록 승인하는 등의 다른 기능도 있습니다.

스마트 컨트랙트가 다음 메서드와 이벤트를 구현하면 ERC-721 대체 불가능 토큰 컨트랙트라고 부를 수 있으며, 배포된 후에는 이더리움에서 생성된 토큰을 추적하는 역할을 담당하게 됩니다.

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) 발췌:

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

이더리움에서 ERC-721 토큰 컨트랙트를 검사하는 작업을 단순화하는 데 표준이 얼마나 중요한지 살펴보겠습니다. ERC-721 토큰에 대한 인터페이스를 생성하려면 컨트랙트 애플리케이션 바이너리 인터페이스(ABI)만 있으면 됩니다. 아래에서 볼 수 있듯이, 진입 장벽을 낮추기 위해 단순화된 ABI를 사용할 것입니다.

#### Web3.py 예시 {#web3py-example-2}

먼저 [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python 라이브러리가 설치되어 있는지 확인하세요:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # 크립토키티 컨트랙트

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # 크립토키티 판매 경매

# 이것은 ERC-721 NFT 컨트랙트의 단순화된 컨트랙트 애플리케이션 바이너리 인터페이스(ABI)입니다.
# 다음 메서드만 노출합니다: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# 전송 이벤트 ABI를 사용하여 전송된 키티에 대한 정보를 가져옵니다.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# 로그를 필터링하려면 이벤트의 서명이 필요합니다.
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# 참고:
#   - 전송 이벤트가 반환되지 않으면 블록 수를 120개 이상으로 늘리세요.
#   - 전송 이벤트를 찾지 못한 경우 다음에서 tokenId를 가져올 수도 있습니다:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       클릭하여 이벤트의 로그를 확장하고 "tokenId" 인수를 복사하세요.
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # 위 링크에서 가져온 "tokenId"를 여기에 붙여넣으세요.
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

크립토키티 컨트랙트에는 표준 이벤트 외에도 몇 가지 흥미로운 이벤트가 있습니다.

그 중 두 가지인 `Pregnant`와 `Birth`를 확인해 보겠습니다.

```python
# Pregnant 및 Birth 이벤트 ABI를 사용하여 새로운 키티에 대한 정보를 가져옵니다.
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

# 로그를 필터링하려면 이벤트의 서명이 필요합니다.
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

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts)는 전송량을 기준으로 이더리움의 상위 NFT를 나열합니다.
- [크립토키티](https://www.cryptokitties.co/)는 교배 가능하고 수집할 수 있는 아주 사랑스러운 생물인 크립토키티를 중심으로 한 게임입니다.
- [Sorare](https://sorare.com/)는 한정판 수집품을 모으고, 팀을 관리하며, 경쟁하여 상금을 받을 수 있는 글로벌 판타지 축구 게임입니다.
- [이더리움 네임 서비스(ENS)](https://ens.domains/)는 사람이 읽을 수 있는 간단한 이름을 사용하여 블록체인 안팎의 리소스 주소를 지정하는 안전하고 탈중앙화된 방법을 제공합니다.
- [POAP](https://poap.xyz)는 이벤트에 참석하거나 특정 작업을 완료한 사람들에게 무료 NFT를 제공합니다. POAP는 무료로 생성하고 배포할 수 있습니다.
- [Unstoppable Domains](https://unstoppabledomains.com/)는 샌프란시스코에 본사를 두고 블록체인 기반 도메인을 구축하는 회사입니다. 블록체인 도메인은 암호화폐 주소를 사람이 읽을 수 있는 이름으로 대체하며, 검열 저항성 웹사이트를 활성화하는 데 사용할 수 있습니다.
- [Gods Unchained Cards](https://godsunchained.com/)는 이더리움 블록체인 기반의 TCG로, NFT를 사용하여 게임 내 자산에 대한 진정한 소유권을 부여합니다.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com)는 10,000개의 고유한 NFT 컬렉션으로, 증명 가능한 희귀 예술 작품일 뿐만 아니라 클럽의 멤버십 토큰 역할을 하여 커뮤니티의 노력에 따라 시간이 지남에 따라 증가하는 회원 특전과 혜택을 제공합니다.

## 더 읽어보기 {#further-reading}

- [EIP-721: ERC-721 대체 불가능 토큰 표준](https://eips.ethereum.org/EIPS/eip-721)
- [오픈제플린 - ERC-721 문서](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [오픈제플린 - ERC-721 구현](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## 튜토리얼: 이더리움에서 대체 불가능 토큰(ERC-721)으로 빌드하기 {#tutorials}

- [Vyper ERC-721 컨트랙트 연습](/developers/tutorials/erc-721-vyper-annotated-code/) _– Vyper로 작성된 전체 ERC-721 NFT 컨트랙트에 대한 주석이 달린 연습입니다._
- [NFT 작성 및 배포 방법 (1/3부)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– 첫 번째 ERC-721 스마트 컨트랙트를 작성하고 배포하는 단계별 가이드입니다._
- [NFT 발행 방법 (2/3부)](/developers/tutorials/how-to-mint-an-nft/) _– 배포된 스마트 컨트랙트와 Web3를 사용하여 ERC-721 NFT를 발행하는 방법입니다._
- [지갑에서 NFT를 보는 방법 (3/3부)](/developers/tutorials/how-to-view-nft-in-metamask/) _– 배포 후 메타마스크에 발행된 NFT를 표시하는 방법입니다._
- [NFT 발행기 튜토리얼](/developers/tutorials/nft-minter/) _– React 프론트엔드, 메타마스크 및 Alchemy를 사용하여 풀스택 NFT 발행 탈중앙화 애플리케이션(dapp)을 빌드합니다._