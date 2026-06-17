---
title: "Tiêu chuẩn token ERC-20"
description: "Tìm hiểu về ERC-20, tiêu chuẩn cho các token có thể thay thế trên Ethereum, cho phép các ứng dụng token có khả năng tương tác."
lang: vi
---

## Giới thiệu {#introduction}

**Token là gì?**

Token có thể đại diện cho hầu hết mọi thứ trên [Ethereum](/):

- điểm uy tín trên một nền tảng trực tuyến
- kỹ năng của một nhân vật trong trò chơi
- tài sản tài chính như cổ phần trong một công ty
- tiền pháp định như USD
- một ounce vàng
- và nhiều hơn nữa...

Một tính năng mạnh mẽ như vậy của Ethereum phải được xử lý bởi một tiêu chuẩn vững chắc, đúng không? Đó chính xác là nơi ERC-20 đóng vai trò của mình! Tiêu chuẩn này cho phép các nhà phát triển xây dựng các ứng dụng token có khả năng tương tác với các sản phẩm và dịch vụ khác. Tiêu chuẩn ERC-20 cũng được sử dụng để cung cấp chức năng bổ sung cho [ether](/glossary/#ether).

**ERC-20 là gì?**

ERC-20 giới thiệu một tiêu chuẩn cho các Token có thể thay thế, nói cách khác, chúng có một thuộc tính làm cho mỗi Token hoàn toàn giống hệt (về loại và giá trị) với một Token khác. Ví dụ, một Token ERC-20 hoạt động giống hệt như ETH, nghĩa là 1 Token đang và sẽ luôn luôn bằng với tất cả các Token khác.

## Điều kiện tiên quyết {#prerequisites}

- [Tài khoản](/developers/docs/accounts)
- [Hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Các tiêu chuẩn token](/developers/docs/standards/tokens/)

## Nội dung chính {#body}

ERC-20 (Ethereum Request for Comments 20), được đề xuất bởi Fabian Vogelsteller vào tháng 11 năm 2015, là một Tiêu chuẩn Token triển khai một API cho các token bên trong các Hợp đồng thông minh.

Các chức năng ví dụ mà ERC-20 cung cấp:

- chuyển token từ một tài khoản này sang một tài khoản khác
- lấy số dư token hiện tại của một tài khoản
- lấy tổng nguồn cung của token có sẵn trên mạng lưới
- chấp thuận xem một lượng token từ một tài khoản có thể được chi tiêu bởi một tài khoản của bên thứ ba hay không

Nếu một Hợp đồng thông minh triển khai các phương thức và sự kiện sau, nó có thể được gọi là một Hợp đồng Token ERC-20 và, sau khi được triển khai, nó sẽ chịu trách nhiệm theo dõi các token được tạo ra trên Ethereum.

Từ [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Các phương thức {#methods}

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

### Các sự kiện {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Các ví dụ {#web3py-example}

Hãy xem một Tiêu chuẩn quan trọng như thế nào trong việc làm cho mọi thứ trở nên đơn giản để chúng ta kiểm tra bất kỳ Hợp đồng Token ERC-20 nào trên Ethereum. Chúng ta chỉ cần Giao diện nhị phân ứng dụng (ABI) của Hợp đồng để tạo một giao diện cho bất kỳ Token ERC-20. Như bạn có thể thấy bên dưới, chúng ta sẽ sử dụng một ABI được đơn giản hóa, để làm cho nó trở thành một ví dụ dễ tiếp cận.

#### Ví dụ Web3.py {#web3py-example-2}

Đầu tiên, hãy đảm bảo bạn đã cài đặt thư viện Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Đây là một Giao diện nhị phân ứng dụng hợp đồng (ABI) được đơn giản hóa của một Hợp đồng Token ERC-20.
# Nó sẽ chỉ hiển thị các phương thức: balanceOf(address), decimals(), symbol() và totalSupply()
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

## Các vấn đề đã biết {#erc20-issues}

### Vấn đề tiếp nhận token ERC-20 {#reception-issue}

**Tính đến ngày 20/06/2024, ít nhất 83.656.418 USD giá trị token ERC-20 đã bị mất do vấn đề này. Lưu ý rằng một bản triển khai ERC-20 thuần túy rất dễ gặp phải vấn đề này trừ khi bạn triển khai một tập hợp các hạn chế bổ sung trên tiêu chuẩn như được liệt kê bên dưới.**

Khi các token ERC-20 được gửi đến một hợp đồng thông minh không được thiết kế để xử lý các token ERC-20, những token đó có thể bị mất vĩnh viễn. Điều này xảy ra vì hợp đồng nhận không có chức năng để nhận diện hoặc phản hồi các token được gửi đến, và không có cơ chế nào trong tiêu chuẩn ERC-20 để thông báo cho hợp đồng nhận về các token đang đến. Các cách chính mà vấn đề này hình thành là thông qua:

1.	Cơ chế chuyển token
  - Các token ERC-20 được chuyển bằng cách sử dụng các hàm transfer hoặc transferFrom
	-	Khi một người dùng gửi token đến một địa chỉ hợp đồng bằng cách sử dụng các hàm này, các token sẽ được chuyển bất kể hợp đồng nhận có được thiết kế để xử lý chúng hay không
2.	Thiếu thông báo
	-	Hợp đồng nhận không nhận được thông báo hoặc lệnh gọi lại (callback) rằng các token đã được gửi đến nó
	-	Nếu hợp đồng nhận thiếu một cơ chế để xử lý token (ví dụ: một hàm dự phòng hoặc một hàm chuyên dụng để quản lý việc tiếp nhận token), các token thực sự sẽ bị kẹt trong địa chỉ của hợp đồng
3.	Không có xử lý tích hợp sẵn
	-	Tiêu chuẩn ERC-20 không bao gồm một hàm bắt buộc để các hợp đồng nhận phải triển khai, dẫn đến tình trạng nhiều hợp đồng không thể quản lý các token được gửi đến một cách hợp lý

**Các giải pháp khả thi**

Mặc dù không thể ngăn chặn hoàn toàn vấn đề này với ERC-20, nhưng có những phương pháp cho phép giảm thiểu đáng kể khả năng mất token đối với người dùng cuối:

- Vấn đề phổ biến nhất là khi một người dùng gửi token đến chính địa chỉ hợp đồng token đó (ví dụ: USDT được nạp vào địa chỉ của hợp đồng token USDT). Khuyến nghị nên hạn chế hàm `transfer(..)` để hoàn nguyên các nỗ lực chuyển như vậy. Hãy cân nhắc thêm kiểm tra `require(_to != address(this));` bên trong bản triển khai của hàm `transfer(..)`.
- Hàm `transfer(..)` nói chung không được thiết kế để nạp token vào các hợp đồng. Thay vào đó, mẫu `approve(..) & transferFrom(..)` được sử dụng để nạp các token ERC-20 vào các hợp đồng. Có thể hạn chế hàm chuyển để không cho phép nạp token vào bất kỳ hợp đồng nào bằng hàm này, tuy nhiên điều đó có thể phá vỡ khả năng tương thích với các hợp đồng giả định rằng token có thể được nạp vào các hợp đồng bằng hàm `transfer(..)` (ví dụ: các nhóm thanh khoản Uniswap).
- Luôn giả định rằng các token ERC-20 có thể lọt vào hợp đồng của bạn ngay cả khi hợp đồng của bạn không được cho là sẽ nhận bất kỳ token nào. Không có cách nào để ngăn chặn hoặc từ chối các khoản nạp tình cờ ở phía người nhận. Khuyến nghị nên triển khai một hàm cho phép trích xuất các token ERC-20 bị nạp nhầm.
- Cân nhắc sử dụng các tiêu chuẩn token thay thế.

Một số tiêu chuẩn thay thế đã ra đời từ vấn đề này như [ERC-223](/developers/docs/standards/tokens/erc-223) hoặc [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Đọc thêm {#further-reading}

- [EIP-20: Tiêu chuẩn token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Các token](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Triển khai ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Hướng dẫn về các token ERC20 trong Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Các tiêu chuẩn token có thể thay thế khác {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Các kho tiền được token hóa](/developers/docs/standards/tokens/erc-4626)

## Hướng dẫn: Xây dựng với ERC-20 trên Ethereum {#tutorials}

- [Hướng dẫn chi tiết về hợp đồng ERC-20](/developers/tutorials/erc20-annotated-code/) _– Hướng dẫn chi tiết có chú thích từng dòng về bản triển khai hợp đồng ERC-20 của OpenZeppelin._
- [ERC-20 với các rào chắn an toàn](/developers/tutorials/erc20-with-safety-rails/) _– Cách thêm các biện pháp bảo vệ vào token ERC-20 để giúp người dùng tránh các sai lầm phổ biến._
- [Gửi token bằng ethers.js](/developers/tutorials/send-token-ethersjs/) _– Hướng dẫn thân thiện với người mới bắt đầu về cách chuyển token ERC-20 bằng ethers.js._
- [Một số thủ thuật được sử dụng bởi các token lừa đảo và cách phát hiện chúng](/developers/tutorials/scam-token-tricks/) _– Một cuộc khám phá chi tiết về các mô hình token ERC-20 lừa đảo và cách nhận diện chúng._