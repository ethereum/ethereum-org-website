---
title: "Cấu trúc của hợp đồng thông minh"
description: "Cái nhìn sâu sắc về cấu trúc của một hợp đồng thông minh – các hàm, dữ liệu và biến."
lang: vi
---

Một hợp đồng thông minh là một chương trình chạy tại một địa chỉ trên Ethereum. Chúng được tạo thành từ dữ liệu và các hàm có thể thực thi khi nhận được một giao dịch. Dưới đây là tổng quan về những gì tạo nên một hợp đồng thông minh.

## Điều kiện tiên quyết {#prerequisites}

Đảm bảo rằng bạn đã đọc về [hợp đồng thông minh](/developers/docs/smart-contracts/) trước. Tài liệu này giả định rằng bạn đã quen thuộc với các ngôn ngữ lập trình như JavaScript hoặc Python.

## Dữ liệu {#data}

Bất kỳ dữ liệu hợp đồng nào cũng phải được gán cho một vị trí: hoặc là `storage` hoặc `memory`. Việc sửa đổi bộ nhớ lưu trữ trong một hợp đồng thông minh rất tốn kém, vì vậy bạn cần cân nhắc xem dữ liệu của mình nên nằm ở đâu.

### Lưu trữ {#storage}

Dữ liệu cố định được gọi là lưu trữ (storage) và được biểu diễn bằng các biến trạng thái. Những giá trị này được lưu trữ vĩnh viễn trên Chuỗi khối. Bạn cần khai báo kiểu dữ liệu để hợp đồng có thể theo dõi xem nó cần bao nhiêu dung lượng lưu trữ trên Chuỗi khối khi biên dịch.

```solidity
// Ví dụ Solidity
contract SimpleStorage {
    uint storedData; // Biến trạng thái
    // ...
}
```

```python
# Ví dụ Vyper
storedData: int128
```

Nếu bạn đã từng lập trình các ngôn ngữ hướng đối tượng, có thể bạn sẽ quen thuộc với hầu hết các kiểu dữ liệu. Tuy nhiên, `address` có thể sẽ mới mẻ đối với bạn nếu bạn mới làm quen với việc phát triển [Ethereum](/).

Kiểu `address` có thể chứa một địa chỉ Ethereum tương đương với 20 byte hoặc 160 bit. Nó trả về dưới dạng ký hiệu thập lục phân với tiền tố 0x.

Các kiểu khác bao gồm:

- boolean
- số nguyên (integer)
- số thực dấu phẩy tĩnh (fixed point numbers)
- mảng byte kích thước cố định
- mảng byte kích thước động
- hằng số hữu tỉ và số nguyên
- hằng chuỗi
- hằng số thập lục phân
- enums

Để có thêm giải thích, hãy xem tài liệu:

- [Xem các kiểu dữ liệu của Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Xem các kiểu dữ liệu của Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Bộ nhớ {#memory}

Các giá trị chỉ được lưu trữ trong suốt thời gian thực thi hàm của hợp đồng được gọi là biến bộ nhớ (memory variables). Vì chúng không được lưu trữ vĩnh viễn trên Chuỗi khối, nên việc sử dụng chúng rẻ hơn rất nhiều.

Tìm hiểu thêm về cách EVM lưu trữ dữ liệu (Lưu trữ, Bộ nhớ và Ngăn xếp) trong [tài liệu Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Biến môi trường {#environment-variables}

Ngoài các biến bạn định nghĩa trong hợp đồng của mình, còn có một số biến toàn cục đặc biệt. Chúng chủ yếu được sử dụng để cung cấp thông tin về Chuỗi khối hoặc giao dịch hiện tại.

Ví dụ:

| **Thuộc tính**          | **Biến trạng thái** | **Mô tả**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | Dấu thời gian kỷ nguyên của khối hiện tại        |
| `msg.sender`      | address            | Người gửi thông điệp (lời gọi hiện tại) |

## Các hàm {#functions}

Nói một cách đơn giản nhất, các hàm có thể lấy thông tin hoặc thiết lập thông tin để phản hồi lại các giao dịch đến.

Có hai loại lời gọi hàm:

- `internal` – chúng không tạo ra một lời gọi EVM
  - Các hàm nội bộ (internal) và biến trạng thái chỉ có thể được truy cập từ bên trong (nghĩa là từ bên trong hợp đồng hiện tại hoặc các hợp đồng kế thừa từ nó)
- `external` – chúng tạo ra một lời gọi EVM
  - Các hàm bên ngoài (external) là một phần của giao diện hợp đồng, có nghĩa là chúng có thể được gọi từ các hợp đồng khác và thông qua các giao dịch. Một hàm bên ngoài `f` không thể được gọi từ bên trong (nghĩa là `f()` không hoạt động, nhưng `this.f()` thì có).

Chúng cũng có thể là `public` hoặc `private`

- Các hàm `public` có thể được gọi từ bên trong hợp đồng hoặc từ bên ngoài thông qua các thông điệp
- Các hàm `private` chỉ hiển thị đối với hợp đồng mà chúng được định nghĩa và không hiển thị trong các hợp đồng kế thừa

Cả hàm và biến trạng thái đều có thể được đặt là public (công khai) hoặc private (riêng tư)

Dưới đây là một hàm để cập nhật một biến trạng thái trên một hợp đồng:

```solidity
// Ví dụ Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Tham số `value` có kiểu `string` được truyền vào hàm: `update_name`
- Nó được khai báo là `public`, nghĩa là bất kỳ ai cũng có thể truy cập nó
- Nó không được khai báo là `view`, vì vậy nó có thể sửa đổi trạng thái hợp đồng

### Các hàm View {#view-functions}

Những hàm này cam kết không sửa đổi trạng thái dữ liệu của hợp đồng. Các ví dụ phổ biến là các hàm "getter" – ví dụ: bạn có thể sử dụng hàm này để nhận số dư của người dùng.

```solidity
// Ví dụ Solidity
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

Những gì được coi là sửa đổi trạng thái:

1. Ghi vào các biến trạng thái.
2. [Phát ra các sự kiện](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Tạo các hợp đồng khác](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Sử dụng `selfdestruct`.
5. Gửi ether thông qua các lời gọi.
6. Gọi bất kỳ hàm nào không được đánh dấu là `view` hoặc `pure`.
7. Sử dụng các lời gọi cấp thấp (low-level calls).
8. Sử dụng inline assembly có chứa các opcode nhất định.

### Các hàm khởi tạo {#constructor-functions}

Các hàm `constructor` chỉ được thực thi một lần khi hợp đồng được triển khai lần đầu. Giống như `constructor` trong nhiều ngôn ngữ lập trình dựa trên lớp (class-based), các hàm này thường khởi tạo các biến trạng thái với các giá trị được chỉ định của chúng.

```solidity
// Ví dụ Solidity
// Khởi tạo dữ liệu của hợp đồng, thiết lập `owner`
// thành Địa chỉ của người tạo hợp đồng.
constructor() public {
    // Tất cả hợp đồng thông minh đều dựa vào các giao dịch bên ngoài để kích hoạt các hàm của nó.
    // `msg` là một biến toàn cục bao gồm dữ liệu liên quan về giao dịch đã cho,
    // chẳng hạn như Địa chỉ của người gửi và giá trị ETH được bao gồm trong giao dịch.
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Ví dụ Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Các hàm tích hợp sẵn {#built-in-functions}

Ngoài các biến và hàm bạn định nghĩa trong hợp đồng của mình, còn có một số hàm tích hợp sẵn đặc biệt. Ví dụ rõ ràng nhất là:

- `address.send()` – Solidity
- `send(address)` – Vyper

Chúng cho phép các hợp đồng gửi ETH đến các tài khoản khác.

## Viết các hàm {#writing-functions}

Hàm của bạn cần:

- biến tham số và kiểu dữ liệu (nếu nó chấp nhận tham số)
- khai báo internal/external
- khai báo pure/view/payable
- kiểu trả về (nếu nó trả về một giá trị)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // biến trạng thái

    // Được gọi khi hợp đồng được triển khai và khởi tạo giá trị
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Hàm Get
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Hàm Set
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Một hợp đồng hoàn chỉnh có thể trông giống như thế này. Ở đây, hàm `constructor` cung cấp một giá trị ban đầu cho biến `dapp_name`.

## Sự kiện và nhật ký {#events-and-logs}

Các sự kiện cho phép hợp đồng thông minh của bạn giao tiếp với frontend hoặc các ứng dụng đăng ký theo dõi khác. Khi một giao dịch được xác thực và thêm vào một khối, các hợp đồng thông minh có thể phát ra các sự kiện và ghi lại thông tin vào nhật ký, sau đó frontend có thể xử lý và sử dụng thông tin này.

## Các ví dụ có chú thích {#annotated-examples}

Đây là một số ví dụ được viết bằng Solidity. Nếu bạn muốn thử nghiệm với mã nguồn, bạn có thể tương tác với chúng trong [Remix](https://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Chỉ định phiên bản của Solidity, sử dụng lập phiên bản theo ngữ nghĩa.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Định nghĩa một hợp đồng có tên `HelloWorld`.
// Một hợp đồng là một tập hợp các hàm và dữ liệu (trạng thái của nó).
// Sau khi được triển khai, một hợp đồng nằm ở một Địa chỉ cụ thể trên Chuỗi khối Ethereum.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Khai báo một biến trạng thái `message` có kiểu `string`.
    // Biến trạng thái là các biến có giá trị được lưu trữ vĩnh viễn trong bộ nhớ của hợp đồng.
    // Từ khóa `public` làm cho các biến có thể truy cập được từ bên ngoài một hợp đồng
    // và tạo ra một hàm mà các hợp đồng hoặc máy khách khác có thể gọi để truy cập giá trị.
    string public message;

    // Tương tự như nhiều ngôn ngữ hướng đối tượng dựa trên lớp, một hàm khởi tạo là
    // một hàm đặc biệt chỉ được thực thi khi tạo hợp đồng.
    // Các hàm khởi tạo được sử dụng để khởi tạo dữ liệu của hợp đồng.
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Chấp nhận một đối số chuỗi `initMessage` và thiết lập giá trị
        // vào biến lưu trữ `message` của hợp đồng).
        message = initMessage;
    }

    // Một hàm public chấp nhận một đối số chuỗi
    // và cập nhật biến lưu trữ `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Một Địa chỉ có thể so sánh với một địa chỉ email - nó được sử dụng để xác định một tài khoản trên Ethereum.
    // Các Địa chỉ có thể đại diện cho một hợp đồng thông minh hoặc các tài khoản (người dùng) bên ngoài.
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Một `mapping` về cơ bản là một cấu trúc dữ liệu bảng băm.
    // `mapping` này gán một số nguyên không dấu (số dư token) cho một Địa chỉ (người nắm giữ token).
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Các sự kiện cho phép ghi Nhật ký hoạt động trên Chuỗi khối.
    // Các máy khách Ethereum có thể lắng nghe các sự kiện để phản ứng với các thay đổi trạng thái của hợp đồng.
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Khởi tạo dữ liệu của hợp đồng, thiết lập `owner`
    // thành Địa chỉ của người tạo hợp đồng.
    constructor() public {
        // Tất cả hợp đồng thông minh đều dựa vào các giao dịch bên ngoài để kích hoạt các hàm của nó.
        // `msg` là một biến toàn cục bao gồm dữ liệu liên quan về giao dịch đã cho,
        // chẳng hạn như Địa chỉ của người gửi và giá trị ETH được bao gồm trong giao dịch.
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Tạo ra một số lượng token mới và gửi chúng đến một Địa chỉ.
    function mint(address receiver, uint amount) public {
        // `require` là một cấu trúc điều khiển được sử dụng để bắt buộc các điều kiện nhất định.
        // Nếu một câu lệnh `require` đánh giá là `false`, một ngoại lệ sẽ được kích hoạt,
        // điều này sẽ hoàn tác tất cả các thay đổi được thực hiện đối với trạng thái trong lần gọi hiện tại.
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Chỉ chủ sở hữu hợp đồng mới có thể gọi hàm này
        require(msg.sender == owner, "You are not the owner.");

        // Bắt buộc một số lượng token tối đa
        require(amount < 1e60, "Maximum issuance exceeded");

        // Tăng số dư của `receiver` thêm `amount`
        balances[receiver] += amount;
    }

    // Gửi một số lượng token hiện có từ bất kỳ người gọi nào đến một Địa chỉ.
    function transfer(address receiver, uint amount) public {
        // Người gửi phải có đủ token để gửi
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Điều chỉnh số dư token của hai Địa chỉ
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Phát ra sự kiện đã được định nghĩa trước đó
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Tài sản kỹ thuật số độc nhất {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Nhập các ký hiệu từ các tệp khác vào hợp đồng hiện tại.
// Trong trường hợp này, một loạt các hợp đồng trợ giúp từ OpenZeppelin.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Từ khóa `is` được sử dụng để kế thừa các hàm và từ khóa từ các hợp đồng bên ngoài.
// Trong trường hợp này, `CryptoPizza` kế thừa từ các hợp đồng `IERC721` và `ERC165`.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Sử dụng thư viện SafeMath của OpenZeppelin để thực hiện các phép toán số học một cách an toàn.
    // Tìm hiểu thêm: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Các biến trạng thái hằng số trong Solidity tương tự như các ngôn ngữ khác
    // nhưng bạn phải gán từ một biểu thức là hằng số tại thời điểm biên dịch.
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Các kiểu Struct cho phép bạn định nghĩa kiểu của riêng mình
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Tạo một mảng trống chứa các struct Pizza
    Pizza[] public pizzas;

    // Ánh xạ từ ID của pizza đến Địa chỉ của chủ sở hữu nó
    mapping(uint256 => address) public pizzaToOwner;

    // Ánh xạ từ Địa chỉ của chủ sở hữu đến số lượng token được sở hữu
    mapping(address => uint256) public ownerPizzaCount;

    // Ánh xạ từ ID của token đến Địa chỉ được phê duyệt
    mapping(uint256 => address) pizzaApprovals;

    // Bạn có thể lồng các ánh xạ, ví dụ này ánh xạ chủ sở hữu đến các phê duyệt của người vận hành
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Hàm nội bộ để tạo một Pizza ngẫu nhiên từ chuỗi (tên) và DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Từ khóa `internal` có nghĩa là hàm này chỉ có thể nhìn thấy
        // trong hợp đồng này và các hợp đồng kế thừa hợp đồng này
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` là một modifier của hàm để kiểm tra xem pizza đã tồn tại hay chưa
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Thêm Pizza vào mảng các Pizza và lấy id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Kiểm tra xem chủ sở hữu Pizza có giống với người dùng hiện tại không
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // lưu ý rằng address(0) là Địa chỉ không,
        // chỉ ra rằng pizza[id] chưa được phân bổ cho một người dùng cụ thể.

        assert(pizzaToOwner[id] == address(0));

        // Ánh xạ Pizza cho chủ sở hữu
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Tạo một Pizza ngẫu nhiên từ chuỗi (tên)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Tạo DNA ngẫu nhiên từ chuỗi (tên) và Địa chỉ của chủ sở hữu (người tạo)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Các hàm được đánh dấu là `pure` cam kết không đọc hoặc sửa đổi trạng thái
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Tạo uint ngẫu nhiên từ chuỗi (tên) + Địa chỉ (chủ sở hữu)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Trả về mảng các Pizza được tìm thấy bởi chủ sở hữu
    function getPizzasByOwner(address _owner)
        public
        // Các hàm được đánh dấu là `view` cam kết không sửa đổi trạng thái
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Sử dụng vị trí lưu trữ `memory` để lưu trữ các giá trị chỉ trong
        // vòng đời của lần gọi hàm này.
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Chuyển nhượng Pizza và quyền sở hữu sang Địa chỉ khác
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Phát ra sự kiện được định nghĩa trong hợp đồng IERC721 đã nhập
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Chuyển nhượng an toàn quyền sở hữu của một ID token đã cho sang một Địa chỉ khác
     * Nếu Địa chỉ đích là một hợp đồng, nó phải triển khai `onERC721Received`,
     * hàm này được gọi khi chuyển nhượng an toàn và trả về giá trị ma thuật
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * nếu không, giao dịch chuyển nhượng sẽ bị hoàn tác.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Chuyển nhượng an toàn quyền sở hữu của một ID token đã cho sang một Địa chỉ khác
     * Nếu Địa chỉ đích là một hợp đồng, nó phải triển khai `onERC721Received`,
     * hàm này được gọi khi chuyển nhượng an toàn và trả về giá trị ma thuật
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * nếu không, giao dịch chuyển nhượng sẽ bị hoàn tác.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * Hàm nội bộ để gọi `onERC721Received` trên một Địa chỉ đích
     * Lời gọi không được thực thi nếu Địa chỉ đích không phải là một hợp đồng
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // Đốt một Pizza - phá hủy hoàn toàn token
    // Modifier của hàm `external` có nghĩa là hàm này là
    // một phần của giao diện hợp đồng và các hợp đồng khác có thể gọi nó
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Trả về số lượng Pizza theo Địa chỉ
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Trả về chủ sở hữu của Pizza được tìm thấy theo id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Phê duyệt Địa chỉ khác để chuyển nhượng quyền sở hữu Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Trả về Địa chỉ được phê duyệt cho Pizza cụ thể
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Hàm private để xóa phê duyệt hiện tại của một ID token đã cho
     * Hoàn tác nếu Địa chỉ đã cho không thực sự là chủ sở hữu của token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Thiết lập hoặc hủy thiết lập phê duyệt của một người vận hành đã cho
     * Một người vận hành được phép chuyển nhượng tất cả các token của người gửi thay mặt cho họ
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Cho biết liệu một người vận hành có được phê duyệt bởi một chủ sở hữu đã cho hay không
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Nắm quyền sở hữu Pizza - chỉ dành cho người dùng được phê duyệt
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Kiểm tra xem Pizza có tồn tại không
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Kiểm tra xem Địa chỉ có phải là chủ sở hữu hoặc được phê duyệt để chuyển nhượng Pizza không
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Vô hiệu hóa kiểm tra solium vì
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Kiểm tra xem Pizza có phải là duy nhất và chưa tồn tại không
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // Trả về việc Địa chỉ đích có phải là một hợp đồng hay không
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Hiện tại không có cách nào tốt hơn để kiểm tra xem có hợp đồng trong một Địa chỉ hay không
        // ngoài việc kiểm tra kích thước của mã tại Địa chỉ đó.
        // Xem https://ethereum.stackexchange.com/a/14016/36603
        // để biết thêm chi tiết về cách thức hoạt động của nó.
        // TODO Kiểm tra lại điều này trước bản phát hành Serenity, vì tất cả các Địa chỉ sẽ là
        // các hợp đồng sau đó.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Đọc thêm {#further-reading}

Hãy xem tài liệu của Solidity và Vyper để có cái nhìn tổng quan đầy đủ hơn về các hợp đồng thông minh:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Các chủ đề liên quan {#related-topics}

- [Hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Máy ảo Ethereum (EVM)](/developers/docs/evm/)

## Các hướng dẫn liên quan {#related-tutorials}

- [Thu nhỏ hợp đồng để đối phó với giới hạn kích thước hợp đồng](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Một số mẹo thực tế để giảm kích thước hợp đồng thông minh của bạn._
- [Ghi nhật ký dữ liệu từ các hợp đồng thông minh bằng các sự kiện](/developers/tutorials/logging-events-smart-contracts/) _– Giới thiệu về các sự kiện của hợp đồng thông minh và cách bạn có thể sử dụng chúng để ghi nhật ký dữ liệu._
- [Tương tác với các hợp đồng khác từ Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cách triển khai một hợp đồng thông minh từ một hợp đồng hiện có và tương tác với nó._