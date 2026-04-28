---
title: "Tiêu chuẩn Token Không Phân tách ERC-721"
description: "Tìm hiểu thêm về ERC-62, chuẩn NFT đại diện cho tài sản kỹ thuật số độc đáo trên Ethereum."
lang: vi
---

## Giới thiệu {#introduction}

**NFT (Non-Fungible Token, hay Token không thể thay thế) là gì?**

Token không thể thay thế (NFT) được dùng để xác định một thứ gì đó hoặc ai đó theo một cách độc nhất. Loại Token này rất phù hợp để sử dụng trên các nền tảng cung cấp các mặt hàng sưu tầm, chìa khóa truy cập, vé xổ số, chỗ ngồi có số cho các buổi hòa nhạc và các trận thể thao, v.v. Tiểu token đặc biệt này có khả năng kinh ngạc, và để tiêu chuẩn hóa tài sản, ERC-721 sẽ giúp chúng xử lý vấn đề này.

**ERC-721 là gì?**

ERC-721 trình bày các tiêu chuẩn NFT, nói cách khác, kiểu token này là duy nhất và có những giá trị khác nhau mà các token khác không có, dù chúng cùng Hợp đồng Thông Minh, có thể do tuổi tác, độ hiếm, hay thậm chí là thứ gì đó về bề ngoài.
Đợi đã, bề ngoài?

Vâng! Tất cả các NFT đều có một biến `uint256` gọi là `tokenId`, vì vậy đối với bất kỳ Hợp đồng ERC-721 nào, cặp
`địa chỉ hợp đồng, uint256 tokenId` phải là duy nhất trên toàn cầu. Dù vậy, một ứng dụng phi tập trung có thể có một "bộ chuyển đổi" sử dụng `tokenId` làm đầu vào và cho ra hình ảnh của một thứ gì đó thú vị, như thây ma, vũ khí, kỹ năng hoặc những chú mèo tuyệt vời!

## Điều kiện tiên quyết {#prerequisites}

- [Tài khoản](/developers/docs/accounts/)
- [Hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Các tiêu chuẩn của token](/developers/docs/standards/tokens/)

## Nội dung {#body}

ERC-721 (Ethereum Request for Comments 721) được đề xuất bởi William Entriken, Dieter Shirley, Jacod Evans, Nastassia Sachs vào tháng 1 năm 2018, là một Tiêu chuẩn Token Không phân tách, thực hiện API cho các tokens trong các Hợp đồng Thông minh.

Nó cung cấp các chức năng như chuyển token từ tài khoản này sang tài khoản khác, lấy số dư token hiện tại của một
tài khoản, lấy chủ sở hữu của một token cụ thể và cả tổng cung của token có sẵn trên mạng.
Bên cạnh đó, nó cũng có một vài tính năng như chấp thuận lượng token từ tài khoản có thể di chuyển bởi tài khoản bên thứ 3.

Nếu một Hợp đồng Thông minh có thể thực thi các phương thức và sự kiện bên dưới, chúng được gọi là Hợp đồng Token Không phân tách ERC-721, khi triển khai, chúng sẽ có trách nhiệm duy trì các token được tạo trên Ethereum.

Từ [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Các phương thức {#methods}

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

### Sự kiện {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Ví dụ {#web3py-example}

Hãy xem Tiêu chuẩn quan trọng như thế nào để giúp mọi thứ trở nên đơn giản với chúng ta khi kiểm tra Hợp đồng Token Không phân tách ERC-721 trên Ethereum.
Chúng ta chỉ cần Contract Application Binary Interface (ABI), để tạo ra giao diện một token ERC-721 bất kỳ. Như bạn cũng thấy ở dưới, chúng ta sẽ dùng một ABI đơn giản, khiến nó trở thành một ví dụ có tính ma sát thấp.

#### Ví dụ về Web3.py {#web3py-example}

Đầu tiên, hãy đảm bảo rằng bạn đã cài đặt thư viện Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Hợp đồng CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Bán Đấu giá CryptoKitties

# Đây là một Giao diện nhị phân ứng dụng (ABI) hợp đồng đơn giản hóa của một Hợp đồng NFT ERC-721.
# Nó sẽ chỉ hiển thị các phương thức: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Sử dụng ABI Sự kiện Chuyển để nhận thông tin về các Kitty đã được chuyển.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Chúng ta cần chữ ký của sự kiện để lọc nhật ký
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Lưu ý:
#   - Tăng số khối lên từ 120 nếu không có sự kiện Chuyển nào được trả về.
#   - Nếu bạn không tìm thấy bất kỳ sự kiện Chuyển nào, bạn cũng có thể thử lấy tokenId tại:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Nhấp để mở rộng nhật ký của sự kiện và sao chép đối số "tokenId" của nó
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Dán "tokenId" từ liên kết trên vào đây
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Hợp đồng CryptoKitties có vài Sự kiện thú vị hơn các hợp đồng Tiêu chuẩn

Hãy kiểm tra hai trong số chúng, `Pregnant` và `Birth`.

```python
# Sử dụng ABI Sự kiện Mang thai và Sinh để nhận thông tin về các Kitty mới.
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

# Chúng ta cần chữ ký của sự kiện để lọc nhật ký
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Đây là một Sự kiện Mang thai:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Đây là một Sự kiện Sinh:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Các NFT phổ biến {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) liệt kê các NFT hàng đầu trên Ethereum theo khối lượng chuyển nhượng.
- [CryptoKitties](https://www.cryptokitties.co/) là một trò chơi tập trung vào các sinh vật có thể nhân giống, sưu tầm và vô cùng đáng yêu mà chúng ta gọi là CryptoKitties.
- [Sorare](https://sorare.com/) là một trò chơi bóng đá giả tưởng toàn cầu, nơi bạn có thể thu thập các vật phẩm sưu tầm phiên bản giới hạn,
  quản lý đội của mình và thi đấu để giành giải thưởng.
- [Dịch vụ Định danh Ethereum (ENS)](https://ens.domains/) cung cấp một cách an toàn và phi tập trung để định địa chỉ các tài nguyên cả
  trong và ngoài chuỗi khối bằng cách sử dụng các tên đơn giản, con người có thể đọc được.
- [POAP](https://poap.xyz) cung cấp NFT miễn phí cho những người tham dự sự kiện hoặc hoàn thành các hành động cụ thể. POAP có thể được tạo và phân phối miễn phí.
- [Unstoppable Domains](https://unstoppabledomains.com/) là một công ty có trụ sở tại San Francisco chuyên xây dựng các tên miền trên
  chuỗi khối. Các tên miền chuỗi khối thay thế các địa chỉ tiền mã hóa bằng các tên mà con người có thể đọc được và có thể được sử dụng để cho phép các
  trang web chống kiểm duyệt.
- [Gods Unchained Cards](https://godsunchained.com/) là một TCG (Trò chơi thẻ bài giao dịch) trên chuỗi khối Ethereum, sử dụng NFT để mang lại quyền sở hữu thực sự
  cho các tài sản trong trò chơi.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) là một bộ sưu tập gồm 10.000 NFT độc nhất. Đây vừa là một tác phẩm nghệ thuật hiếm có thể chứng minh được, vừa hoạt động như một token thành viên của câu lạc bộ, cung cấp các đặc quyền và lợi ích cho thành viên, những lợi ích này sẽ tăng dần theo thời gian nhờ vào nỗ lực của cộng đồng.

## Đọc thêm {#further-reading}

- [EIP-721: Tiêu chuẩn Token không thể thay thế ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Tài liệu ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Triển khai ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API NFT của Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
