---
title: "Tiêu chuẩn token ERC-20"
description: "Tìm hiểu về ERC-20, tiêu chuẩn cho các token có thể thay thế trên Ethereum, cho phép các ứng dụng token tương thích với nhau."
lang: vi
---

## Giới thiệu {#introduction}

**Token là gì?**

Token đại diện cho bất kỳ thứ gì trên Ethereum:

- Điểm danh tiếng trên nền tảng online
- Kỹ năng của nhân vật trong game
- Tài sản tài chính như cổ phần của một công ty
- Tiền pháp định như USD chẳng hạn
- Một ounce vàng (khoảng 31 gram)
- và nhiều thứ khác

Một tính năng mạnh mẽ như vậy của Ethereum chắc chắn phải được quản lý bằng một tiêu chuẩn vững chắc, đúng chứ? Đó chính xác là những gì ERC-20 đang thực hiện. Tiêu chuẩn này cho phép các nhà phát triển xây dựng các ứng dụng token có khả năng tương tác với các sản phẩm và dịch vụ khác. Tiêu chuẩn ERC-20 cũng được sử dụng để cung cấp chức năng bổ sung cho [ether](/glossary/#ether).

**ERC-20 là gì?**

ERC-20 đặt ra một tiêu chuẩn cho các token có thể thay thế, nghĩa là mỗi token
giống hệt nhau về loại và giá trị. Ví dụ, một Token ERC-20 hoạt động giống như ETH, có nghĩa là 1 Token luôn và sẽ luôn bằng tất cả các Token khác.

## Điều kiện tiên quyết {#prerequisites}

- [Tài khoản](/developers/docs/accounts)
- [Hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Các tiêu chuẩn của token](/developers/docs/standards/tokens/)

## Nội dung {#body}

ERC-20 (Ethereum Requests for Comments 20), được dự thảo bởi Fabian Vogelsteller vào tháng 11/2015, là một tiêu chuẩn token thực thi API cho token trong Hợp đồng Thông minh.

Ví dụ một số chức năng ERC-20 cung cấp:

- gửi các token từ một tài khoản này đến một tài khoản khác
- lấy thông tin số lượng token của tài khoản
- lấy tổng cung của token đang có trên mạng
- phê duyệt xem tài khoản của bên thứ ba có thể sử dụng token từ tài khoản hay không

Nếu một Hợp đồng Thông minh có thể thực thi các phương thức và sự kiện bên dưới, chúng được gọi là Hợp đồng Token ERC-20, khi triển khai, chúng sẽ có trách nhiệm duy trì các token được tạo trên Ethereum.

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

### Sự kiện {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Ví dụ {#web3py-example}

Hãy xem Tiêu chuẩn quan trọng như thế nào để giúp mọi thứ trở nên đơn giản với chúng ta khi kiểm tra Hợp đồng Token ERC-20 trên Ethereum.
Chúng ta chỉ cần Contract Application Binary Interface (ABI), để tạo ra giao diện một token ERC-20 bất kỳ. Như bạn cũng thấy ở dưới, chúng ta sẽ dùng một ABI đơn giản, khiến nó trở thành một ví dụ có tính ma sát thấp.

#### Ví dụ về Web3.py {#web3py-example}

Đầu tiên, hãy đảm bảo rằng bạn đã cài đặt thư viện Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Ether được bọc (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Đây là Giao diện nhị phân ứng dụng (ABI) hợp đồng được đơn giản hóa của một Hợp đồng Token ERC-20.
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

### Sự cố nhận token ERC-20 {#reception-issue}

**Tính đến ngày 20/06/2024, ít nhất 83.656.418 USD giá trị token ERC-20 đã bị mất do sự cố này. Lưu ý rằng việc triển khai ERC-20 thuần túy dễ gặp phải vấn đề này trừ khi bạn triển khai một tập hợp các hạn chế bổ sung bên trên tiêu chuẩn như được liệt kê dưới đây.**

Khi các token ERC-20 được gửi đến một hợp đồng thông minh không được thiết kế để xử lý các token ERC-20, những token đó có thể bị mất vĩnh viễn. Điều này xảy ra bởi vì hợp đồng nhận không có chức năng nhận diện hoặc phản hồi với các token đến, và không có cơ chế nào trong tiêu chuẩn ERC-20 để thông báo cho hợp đồng nhận về các token được gửi đến. Lý do chính mà vấn đề này thể hiện là qua:

1. Cơ chế chuyển đổi token

- Các token ERC-20 được chuyển đổi bằng cách sử dụng các hàm transfer hoặc transferFrom.
  - Khi một người dùng gửi token đến địa chỉ hợp đồng bằng cách sử dụng những hàm này, token sẽ được chuyển giao bất kể hợp đồng nhận có được thiết kế để xử lý chúng hay không.

2. Thất thoát thông báo
   - Hợp đồng nhận không nhận thông báo hoặc cuộc gọi lại rằng các token đã được gửi đến nó.
   - Nếu hợp đồng nhận thiếu cơ chế để xử lý token (ví dụ: một hàm fallback hoặc một hàm chuyên dụng để quản lý việc nhận token), các token sẽ bị mắc kẹt trong địa chỉ của hợp đồng.
3. Không tích hợp xử lý sẵn
   - Chuẩn ERC-20 không có một hàm bắt buộc nào cho các hợp đồng nhận tiền phải thực hiện, dẫn đến việc nhiều hợp đồng không thể quản lý các token đến một cách đúng đắn.

**Các giải pháp khả thi**

Mặc dù không thể ngăn chặn hoàn toàn vấn đề này với ERC-20, nhưng có vài cách cho phép giảm đáng kể khả năng mất tokens cho người dùng:

- Vấn đề phổ biến nhất là khi người dùng gửi token đến chính địa chỉ hợp đồng token (ví dụ: USDT được gửi vào địa chỉ của hợp đồng token USDT). Khuyến nghị hạn chế hàm `transfer(...)` để hoàn tác các nỗ lực chuyển tiền như vậy. Cân nhắc thêm kiểm tra `require(_to != address(this));` trong quá trình triển khai hàm `transfer(...)`.
- Nhìn chung, hàm `transfer(...)` không được thiết kế để gửi token vào các hợp đồng. Thay vào đó, mẫu `approve(..) & transferFrom(...)` được sử dụng để gửi token ERC-20 vào các hợp đồng. Có thể hạn chế hàm `transfer(...)` để không cho phép gửi token vào bất kỳ hợp đồng nào bằng hàm đó, tuy nhiên, điều này có thể phá vỡ tính tương thích với các hợp đồng giả định rằng token có thể được gửi vào các hợp đồng bằng hàm `transfer(...)` (ví dụ: các bể thanh khoản Uniswap).
- Luôn luôn giả định rằng các token ERC-20 có thể xuất hiện trong hợp đồng của bạn, ngay cả khi hợp đồng của bạn không được thiết kế để nhận bất kỳ token nào. Không thể ngăn chặn hoặc từ chối các khoản tiền gửi không mong muốn từ phía người nhận. Nên thực hiện một chức năng cho phép trích xuất các token ERC-20 được gửi nhầm.
- Hãy xem xét việc sử dụng các chuẩn token khác.

Một số tiêu chuẩn thay thế đã ra đời từ vấn đề này, chẳng hạn như [ERC-223](/developers/docs/standards/tokens/erc-223) hoặc [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Đọc thêm {#further-reading}

- [EIP-20: Tiêu chuẩn Token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Token](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Triển khai ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Hướng dẫn về Token ERC20 trong Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Các tiêu chuẩn token có thể thay thế khác {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Kho tiền được token hóa](/developers/docs/standards/tokens/erc-4626)
