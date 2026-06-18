---
title: Tiêu chuẩn Token không thể thay thế ERC-721
description: Tìm hiểu về ERC-721, tiêu chuẩn cho các token không thể thay thế (NFT) đại diện cho các tài sản kỹ thuật số độc nhất trên Ethereum.
lang: vi
---

## Giới thiệu {#introduction}

**Token không thể thay thế là gì?**

Một Token không thể thay thế (NFT) được sử dụng để nhận dạng một thứ gì đó hoặc một ai đó theo cách độc nhất. Loại Token này hoàn hảo để sử dụng trên các nền tảng cung cấp các vật phẩm sưu tầm, khóa truy cập, vé số, ghế đánh số cho các buổi hòa nhạc và các trận đấu thể thao, v.v. Loại Token đặc biệt này có những khả năng tuyệt vời nên nó xứng đáng có một Tiêu chuẩn phù hợp, ERC-721 ra đời để giải quyết điều đó!

**ERC-721 là gì?**

ERC-721 giới thiệu một tiêu chuẩn cho NFT, nói cách khác, loại Token này là độc nhất và có thể có giá trị khác với một Token khác từ cùng một Hợp đồng thông minh, có thể do tuổi đời, độ hiếm hoặc thậm chí là một thứ gì đó khác như hình ảnh của nó. Khoan đã, hình ảnh ư?

Đúng vậy! Tất cả các NFT đều có một biến `uint256` được gọi là `tokenId`, vì vậy đối với bất kỳ Hợp đồng ERC-721 nào, cặp `contract address, uint256 tokenId` phải là duy nhất trên toàn cầu. Điều đó có nghĩa là, một ứng dụng phi tập trung (dapp) có thể có một "bộ chuyển đổi" sử dụng `tokenId` làm đầu vào và xuất ra hình ảnh của một thứ gì đó thú vị, như thây ma, vũ khí, kỹ năng hoặc những chú mèo tuyệt vời!

## Điều kiện tiên quyết {#prerequisites}

- [Tài khoản](/developers/docs/accounts/)
- [Hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Các tiêu chuẩn token](/developers/docs/standards/tokens/)

## Nội dung {#body}

ERC-721 ([Ethereum](/) Request for Comments 721), được đề xuất bởi William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs vào tháng 1 năm 2018, là một Tiêu chuẩn Token không thể thay thế triển khai một API cho các token trong các Hợp đồng thông minh.

Nó cung cấp các chức năng như chuyển token từ tài khoản này sang tài khoản khác, lấy số dư token hiện tại của một tài khoản, lấy chủ sở hữu của một token cụ thể và cả tổng nguồn cung của token có sẵn trên mạng lưới. Bên cạnh đó, nó cũng có một số chức năng khác như chấp thuận rằng một lượng token từ một tài khoản có thể được di chuyển bởi một tài khoản của bên thứ ba.

Nếu một Hợp đồng thông minh triển khai các phương thức và sự kiện sau, nó có thể được gọi là Hợp đồng Token không thể thay thế ERC-721 và, sau khi được triển khai, nó sẽ chịu trách nhiệm theo dõi các token được tạo trên Ethereum.

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

### Các sự kiện {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Các ví dụ {#web3py-example}

Hãy xem một Tiêu chuẩn quan trọng như thế nào để làm cho mọi thứ trở nên đơn giản đối với chúng ta khi kiểm tra bất kỳ Hợp đồng Token ERC-721 nào trên Ethereum. Chúng ta chỉ cần Giao diện nhị phân ứng dụng (ABI) của Hợp đồng để tạo một giao diện cho bất kỳ Token ERC-721 nào. Như bạn có thể thấy bên dưới, chúng ta sẽ sử dụng một ABI được đơn giản hóa, để làm cho nó trở thành một ví dụ dễ tiếp cận.

#### Ví dụ Web3.py {#web3py-example-2}

Đầu tiên, hãy đảm bảo bạn đã cài đặt thư viện Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Hợp đồng CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Đấu giá bán CryptoKitties

# Đây là Giao diện nhị phân ứng dụng (ABI) hợp đồng đơn giản hóa của một hợp đồng NFT ERC-721.
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

# Sử dụng ABI của sự kiện chuyển để lấy thông tin về các Kitty đã được chuyển.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Chúng ta cần chữ ký của sự kiện để lọc các nhật ký
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Ghi chú:
#   - Tăng số lượng khối lên từ 120 nếu không có sự kiện chuyển nào được trả về.
#   - Nếu bạn không tìm thấy bất kỳ sự kiện chuyển nào, bạn cũng có thể thử lấy một tokenId tại:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Nhấp để mở rộng các nhật ký của sự kiện và sao chép đối số "tokenId" của nó
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Dán "tokenId" từ liên kết ở trên vào đây
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Hợp đồng CryptoKitties có một số Sự kiện thú vị khác ngoài các Sự kiện Tiêu chuẩn.

Hãy kiểm tra hai trong số đó, `Pregnant` và `Birth`.

```python
# Sử dụng ABI của các sự kiện Pregnant và Birth để lấy thông tin về các Kitty mới.
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

# Chúng ta cần chữ ký của sự kiện để lọc các nhật ký
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Đây là một sự kiện Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Đây là một sự kiện Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Các NFT phổ biến {#popular-nfts}

- [Trình theo dõi NFT của Etherscan](https://etherscan.io/nft-top-contracts) liệt kê các NFT hàng đầu trên Ethereum theo khối lượng chuyển.
- [CryptoKitties](https://www.cryptokitties.co/) là một trò chơi xoay quanh những sinh vật có thể lai tạo, là vật phẩm sưu tầm và vô cùng đáng yêu mà chúng ta gọi là CryptoKitties.
- [Sorare](https://sorare.com/) là một trò chơi bóng đá giả tưởng toàn cầu, nơi bạn có thể thu thập các vật phẩm sưu tầm phiên bản giới hạn, quản lý đội của mình và cạnh tranh để giành giải thưởng.
- [Ethereum Name Service (ENS)](https://ens.domains/) cung cấp một cách an toàn và phi tập trung để định địa chỉ các tài nguyên cả trên và ngoài chuỗi khối bằng cách sử dụng các tên đơn giản, con người có thể đọc được.
- [POAP](https://poap.xyz) cung cấp các NFT miễn phí cho những người tham dự các sự kiện hoặc hoàn thành các hành động cụ thể. Các POAP được tạo và phân phối miễn phí.
- [Unstoppable Domains](https://unstoppabledomains.com/) là một công ty có trụ sở tại San Francisco chuyên xây dựng các tên miền trên các chuỗi khối. Các tên miền chuỗi khối thay thế các địa chỉ tiền mã hóa bằng các tên con người có thể đọc được và có thể được sử dụng để kích hoạt các trang web chống kiểm duyệt.
- [Gods Unchained Cards](https://godsunchained.com/) là một trò chơi thẻ bài giao dịch (TCG) trên chuỗi khối Ethereum sử dụng NFT để mang lại quyền sở hữu thực sự đối với các tài sản trong trò chơi.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) là một bộ sưu tập gồm 10.000 NFT độc nhất, ngoài việc là một tác phẩm nghệ thuật có độ hiếm có thể chứng minh được, nó còn đóng vai trò như một token thành viên của câu lạc bộ, cung cấp các đặc quyền và lợi ích cho thành viên tăng dần theo thời gian nhờ vào những nỗ lực của cộng đồng.

## Đọc thêm {#further-reading}

- [EIP-721: Tiêu chuẩn Token không thể thay thế ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Tài liệu ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Triển khai ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Hướng dẫn: Xây dựng với các token không thể thay thế (ERC-721) trên Ethereum {#tutorials}

- [Hướng dẫn chi tiết Hợp đồng ERC-721 bằng Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _– Hướng dẫn chi tiết có chú thích về một hợp đồng NFT ERC-721 hoàn chỉnh được viết bằng Vyper._
- [Cách viết và triển khai một NFT (Phần 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– Hướng dẫn từng bước để viết và triển khai hợp đồng thông minh ERC-721 đầu tiên của bạn._
- [Cách đúc một NFT (Phần 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– Cách đúc một NFT ERC-721 bằng cách sử dụng hợp đồng thông minh đã triển khai của bạn và Web3._
- [Cách xem NFT trong Ví của bạn (Phần 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– Cách hiển thị NFT đã đúc của bạn trong MetaMask sau khi triển khai._
- [Hướng dẫn tạo công cụ đúc NFT](/developers/tutorials/nft-minter/) _– Xây dựng một dapp đúc NFT full-stack với frontend React, MetaMask và Alchemy._