---
title: "Cấu trúc của các hợp đồng thông minh"
description: "Hiểu rõ hơn về cấu trúc của một hợp đồng thông minh - các hàm, dữ liệu và các biến."
lang: vi
---

Hợp đồng thông minh là một chương trình chạy tại một địa chỉ của người dùng trên mạng Ethereum. Chúng được tạo nên bởi dữ liệu và các hàm. Khi nhận được một giao dịch, các hợp đồng thông minh sẽ thực thi. Dưới đây là tổng quan về những gì tạo nên một hợp đồng thông minh.

## Điều kiện tiên quyết {#prerequisites}

Hãy đảm bảo rằng bạn đã đọc về [hợp đồng thông minh](/developers/docs/smart-contracts/) trước tiên. Tài liệu này giả định rằng bạn đã biết rõ các ngôn ngữ lập trình như JavaScript hoặc Python.

## Dữ liệu {#data}

Bất kỳ dữ liệu hợp đồng nào cũng phải được gán cho một vị trí: `storage` hoặc `memory`. Việc chỉnh sửa nơi lưu trữ trong một hợp đồng thông minh rất tốn kém, vì vậy bạn cần cân nhắc xem dữ liệu của mình sẽ được lưu ở đâu.

### Lưu trữ {#storage}

Storage là nơi lưu trữu các dữ liệu được truy không thường xuyên, ít khi được sửa đổi và được đại diện bởi các biến trạng thái. Các giá trị này được lưu trữ vĩnh viễn trên chuỗi khối. Bạn cần khai báo kiểu dữ liệu để hợp đồng có thể theo dõi được dung lượng lưu trữ trên chuỗi khối mà nó cần khi biên dịch.

```solidity
// Ví dụ về Solidity
contract SimpleStorage {
    uint storedData; // Biến trạng thái
    // ...
}
```

```python
# Ví dụ về Vyper
storedData: int128
```

Nếu bạn đã từng lập trình hướng đối tượng, bạn có thể sẽ quen với hầu hết các loại ngôn ngữ. Tuy nhiên, `address` có thể sẽ là một khái niệm mới đối với bạn nếu bạn mới bắt đầu phát triển trên Ethereum.

Một loại `address` có thể chứa một địa chỉ Ethereum tương đương với 20 byte hoặc 160 bit. Nó trả về một giá trị bắt đầu bằng 0x ở dạng thập lục phân.

Các loại kiểu dữ liệu khác:

- boolean
- interger
- fixed point numbers
- mảng tĩnh
- mảng byte có kích thước động
- giá trị cố định hữu tỉ và số nguyên
- giá trị cố định chuỗi
- giá trị cố định thập lục phân
- enums

Để rõ hơn, hãy tìm hiểu thêm các tài liệu:

- [Xem các loại Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Xem các loại Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Bộ nhớ {#memory}

Memory là nơi lưu trữ các giá trị chỉ được sử dụng trong khi thực thi một hàm của hợp đồng và được đại diện bởi các biến memory. Vì các giá trị đó không được lưu trữ vĩnh viễn trên chuỗi khối nên chúng không tốn nhiều tài nguyên khi sử dụng.

Tìm hiểu thêm về cách Máy ảo Ethereum (EVM) lưu trữ dữ liệu (Storage, Memory và Stack) trong [tài liệu Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Các biến môi trường {#environment-variables}

Bên cạnh những biến mà bạn định nghĩa trong hợp đồng của bạn, có một số biến toàn cục đặc biệt. Chúng được sử dụng chủ yếu để cung cấp thông tin về chuỗi khối hoặc giao dịch hiện tại.

Ví dụ:

| **Thuộc tính**    | **Biến trạng thái** | **Mô tả**                                                   |
| ----------------- | ------------------- | ----------------------------------------------------------- |
| `block.timestamp` | uint256             | Khối epoch timestamp hiện tại                               |
| `msg.sender`      | địa chỉ             | Người gửi thông điệp (cuộc gọi hiện tại) |

## Các hàm {#functions}

Nói một cách đơn giản, các hàm được dùng để lấy thông tin hoặc thiết lập thông tin để phản hồi các giao dịch đến.

Có hai loại lời gọi hàm:

- `internal` – các hàm này không tạo lệnh gọi EVM
  - Các hàm nội bộ và biến trạng thái chỉ có thể được truy cập nội bộ (tức là từ bên trong hợp đồng hiện tại hoặc các hợp đồng kế thừa từ nó)
- `external` – các hàm này tạo lệnh gọi EVM
  - Các hàm external là một phần của giao diện hợp đồng, điều này có nghĩa là các hàm này có thể được gọi từ các hợp đồng khác và qua các giao dịch. Một hàm bên ngoài `f` không thể được gọi nội bộ (tức là `f()` không hoạt động, nhưng `this.f()` thì hoạt động).

Chúng cũng có thể là `public` hoặc `private`

- Các hàm `public` có thể được gọi nội bộ từ bên trong hợp đồng hoặc bên ngoài thông qua các thông điệp
- Các hàm `private` chỉ hiển thị đối với hợp đồng mà chúng được định nghĩa và không hiển thị trong các hợp đồng phái sinh

Tất cả các hàm và các biến trạng thái đều có thể được khởi tạo là public hoặc private

Dưới đây là một hàm có chức năng cập nhật một biến trạng thái cho một hợp đồng:

```solidity
// Ví dụ về Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Tham số `value` của loại `string` được chuyển vào hàm: `update_name`
- Hàm được khai báo là `public`, nghĩa là bất kỳ ai cũng có thể truy cập
- Hàm không được khai báo `view` nên có thể sửa đổi trạng thái hợp đồng

### Các hàm View {#view-functions}

Các hàm này không được phép chỉnh sửa trạng thái dữ liệu của hợp đồng. Ví dụ phổ biến là hàm "getter" - bạn có thể sử dụng hàm này để lấy thông tin số dư của người dùng chẳng hạn.

```solidity
// Ví dụ về Solidity
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

Những điều được coi là thay đổi trạng thái hợp đồng:

1. Ghi vào các biến trạng thái.
2. [Phát sự kiện](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Tạo các hợp đồng khác](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Sử dụng `selfdestruct`.
5. Gửi Ethers qua các lời gọi.
6. Gọi bất kỳ hàm nào không được đánh dấu là `view` hoặc `pure`.
7. Sử dụng các lời gọi cấp thấp.
8. Sử dụng mã assembly nội dòng có chứa các mã vận hành nhất định.

### Các hàm constructor {#constructor-functions}

Các hàm `constructor` chỉ được thực thi một lần khi hợp đồng được triển khai lần đầu tiên. Giống như `constructor` trong nhiều ngôn ngữ lập trình dựa trên lớp, các hàm này thường khởi tạo các biến trạng thái theo các giá trị được chỉ định của chúng.

```solidity
// Ví dụ về Solidity
// Khởi tạo dữ liệu của hợp đồng, đặt `owner`
// thành địa chỉ của người tạo hợp đồng.
constructor() public {
    // Tất cả các hợp đồng thông minh đều dựa vào các giao dịch bên ngoài để kích hoạt các hàm của chúng.
    // `msg` là một biến toàn cục bao gồm dữ liệu liên quan về giao dịch nhất định,
    // chẳng hạn như địa chỉ của người gửi và giá trị ETH có trong giao dịch.
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Ví dụ về Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Các hàm dựng sẵn {#built-in-functions}

Ngoài các biến và các hàm bạn định nghĩa trong hợp đồng của bạn, còn có một số hàm tích hợp đặc biệt. Ví dụ rõ ràng nhất là:

- `address.send()` – Solidity
- `send(address)` – Vyper

Hai hàm trên cho phép những hợp đồng gửi ETH đến các tài khoản khác.

## Viết hàm {#writing-functions}

Hàm của bạn cần:

- biến tham số và kiểu dữ liệu của nó (nếu hàm đó cho phép truyền các tham số)
- khai báo internal/external
- khai báo pure/view/payable
- kiểu dữ liệu trả về (nếu hàm đó trả về một giá trị)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // biến trạng thái

    // Được gọi khi hợp đồng được triển khai và khởi tạo giá trị
    constructor() public {
        dapp_name = "Ứng dụng phi tập trung ví dụ của tôi";
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

Một hợp đồng hoàn chỉnh có thể trông giống như trên. Ở đây, hàm `constructor` cung cấp một giá trị ban đầu cho biến `dapp_name`.

## Các sự kiện và nhật ký {#events-and-logs}

Sự kiện cho phép hợp đồng thông minh của bạn giao tiếp với giao diện người dùng hoặc các ứng dụng đăng ký khác.    Khi một giao dịch được xác thực và thêm vào một khối, các hợp đồng thông minh có thể phát ra tín hiệu và ghi lại thông tin, điều này sẽ được phần mềm phía trước xử lý và sử dụng.

## Các ví dụ có chú thích {#annotated-examples}

Dưới đây là một vài ví dụ được viết bằng Solidity. Nếu bạn muốn thử nghiệm với mã, bạn có thể tương tác với chúng trong [Remix](http://remix.ethereum.org).

### Xin chào thế giới {#hello-world}

```solidity
// Chỉ định phiên bản của Solidity, sử dụng lập phiên bản ngữ nghĩa.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Định nghĩa một hợp đồng có tên là `HelloWorld`.
// Hợp đồng là một tập hợp các hàm và dữ liệu (trạng thái của nó).
// Sau khi được triển khai, một hợp đồng sẽ nằm tại một địa chỉ cụ thể trên chuỗi khối Ethereum.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Khai báo một biến trạng thái `message` thuộc loại `string`.
    // Các biến trạng thái là các biến có giá trị được lưu trữ vĩnh viễn trong bộ lưu trữ hợp đồng.
    // Từ khóa `public` giúp các biến có thể truy cập được từ bên ngoài hợp đồng
    // và tạo một hàm mà các hợp đồng hoặc ứng dụng khách khác có thể gọi để truy cập giá trị.
    string public message;

    // Tương tự như nhiều ngôn ngữ lập trình hướng đối tượng dựa trên lớp, một hàm constructor là
    // một hàm đặc biệt chỉ được thực thi khi tạo hợp đồng.
    // Các hàm constructor được sử dụng để khởi tạo dữ liệu của hợp đồng.
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Chấp nhận một đối số chuỗi `initMessage` và đặt giá trị
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
    // Một `address` có thể so sánh với một địa chỉ email - nó được dùng để xác định một tài khoản trên Ethereum.
    // Các địa chỉ có thể đại diện cho một hợp đồng thông minh hoặc tài khoản bên ngoài (người dùng).
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // Một `mapping` về cơ bản là một cấu trúc dữ liệu bảng băm.
    // `mapping` này gán một số nguyên không dấu (số dư token) cho một địa chỉ (người nắm giữ token).
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Các sự kiện cho phép ghi lại hoạt động trên chuỗi khối.
    // Các ứng dụng khách Ethereum có thể lắng nghe các sự kiện để phản ứng với các thay đổi trạng thái hợp đồng.
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Khởi tạo dữ liệu của hợp đồng, đặt `owner`
    // thành địa chỉ của người tạo hợp đồng.
    constructor() public {
        // Tất cả các hợp đồng thông minh đều dựa vào các giao dịch bên ngoài để kích hoạt các hàm của chúng.
        // `msg` là một biến toàn cục bao gồm dữ liệu liên quan về giao dịch nhất định,
        // chẳng hạn như địa chỉ của người gửi và giá trị ETH có trong giao dịch.
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Tạo một lượng token mới và gửi chúng đến một địa chỉ.
    function mint(address receiver, uint amount) public {
        // `require` là một cấu trúc điều khiển được sử dụng để thực thi các điều kiện nhất định.
        // Nếu câu lệnh `require` ước tính là `false`, một ngoại lệ sẽ được kích hoạt,
        // hoàn nguyên tất cả các thay đổi được thực hiện đối với trạng thái trong lệnh gọi hiện tại.
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Chỉ chủ sở hữu hợp đồng mới có thể gọi hàm này
        require(msg.sender == owner, "Bạn không phải là chủ sở hữu.");

        // Thực thi số lượng token tối đa
        require(amount < 1e60, "Vượt quá mức phát hành tối đa");

        // Tăng số dư của `receiver` lên `amount`
        balances[receiver] += amount;
    }

    // Gửi một lượng token hiện có từ bất kỳ người gọi nào đến một địa chỉ.
    function transfer(address receiver, uint amount) public {
        // Người gửi phải có đủ token để gửi
        require(amount <= balances[msg.sender], "Số dư không đủ.");

        // Điều chỉnh số dư token của hai địa chỉ
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Phát sự kiện được xác định trước đó
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Tài sản kỹ thuật số duy nhất {#unique-digital-asset}

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

    // Các biến trạng thái không đổi trong Solidity tương tự như các ngôn ngữ khác
    // nhưng bạn phải gán từ một biểu thức không đổi tại thời điểm biên dịch.
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Các loại cấu trúc cho phép bạn xác định loại của riêng mình
    // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Tạo một mảng trống gồm các cấu trúc Pizza
    Pizza[] public pizzas;

    // Ánh xạ từ ID pizza đến địa chỉ của chủ sở hữu
    mapping(uint256 => address) public pizzaToOwner;

    // Ánh xạ từ địa chỉ của chủ sở hữu đến số lượng token sở hữu
    mapping(address => uint256) public ownerPizzaCount;

    // Ánh xạ từ ID token đến địa chỉ được phê duyệt
    mapping(uint256 => address) pizzaApprovals;

    // Bạn có thể lồng các ánh xạ, ví dụ này ánh xạ chủ sở hữu với các phê duyệt của nhà điều hành
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Hàm nội bộ để tạo một Pizza ngẫu nhiên từ chuỗi (tên) và DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Từ khóa `internal` có nghĩa là hàm này chỉ hiển thị
        // trong hợp đồng này và các hợp đồng kế thừa từ hợp đồng này
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` là một bộ điều chỉnh hàm kiểm tra xem pizza đã tồn tại chưa
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Thêm Pizza vào mảng Pizza và lấy id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Kiểm tra xem chủ sở hữu Pizza có giống với người dùng hiện tại không
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // lưu ý rằng address(0) là địa chỉ không,
        // cho biết rằng pizza[id] chưa được phân bổ cho một người dùng cụ thể.

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

    // Tạo DNA ngẫu nhiên từ chuỗi (tên) và địa chỉ của chủ sở hữu (người tạo)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Các hàm được đánh dấu là `pure` cam kết không đọc hoặc sửa đổi trạng thái
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Tạo uint ngẫu nhiên từ chuỗi (tên) + địa chỉ (chủ sở hữu)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Trả về mảng Pizza được tìm thấy bởi chủ sở hữu
    function getPizzasByOwner(address _owner)
        public
        // Các hàm được đánh dấu là `view` cam kết không sửa đổi trạng thái
        // Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Sử dụng vị trí lưu trữ `memory` để lưu trữ các giá trị chỉ trong
        // vòng đời của lệnh gọi hàm này.
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

    // Chuyển Pizza và quyền sở hữu cho địa chỉ khác
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Địa chỉ không hợp lệ.");
        require(_exists(_pizzaId), "Pizza không tồn tại.");
        require(_from != _to, "Không thể chuyển đến cùng một địa chỉ.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Địa chỉ không được phê duyệt.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Phát sự kiện được xác định trong hợp đồng IERC721 đã nhập
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Chuyển quyền sở hữu của một ID token nhất định sang một địa chỉ khác một cách an toàn
     * Nếu địa chỉ mục tiêu là một hợp đồng, nó phải triển khai `onERC721Received`,
     * được gọi khi thực hiện một lần chuyển an toàn và trả về giá trị đặc biệt
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * nếu không, việc chuyển khoản sẽ bị hoàn nguyên.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Chuyển quyền sở hữu của một ID token nhất định sang một địa chỉ khác một cách an toàn
     * Nếu địa chỉ mục tiêu là một hợp đồng, nó phải triển khai `onERC721Received`,
     * được gọi khi thực hiện một lần chuyển an toàn và trả về giá trị đặc biệt
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * nếu không, việc chuyển khoản sẽ bị hoàn nguyên.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Phải triển khai onERC721Received.");
    }

    /**
     * Hàm nội bộ để gọi `onERC721Received` trên một địa chỉ mục tiêu
     * Lệnh gọi không được thực thi nếu địa chỉ mục tiêu không phải là hợp đồng
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

    // Đốt một Pizza - phá hủy hoàn toàn Token
    // Bộ điều chỉnh hàm `external` có nghĩa là hàm này là
    // một phần của giao diện hợp đồng và các hợp đồng khác có thể gọi nó
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Địa chỉ không hợp lệ.");
        require(_exists(_pizzaId), "Pizza không tồn tại.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Địa chỉ không được phê duyệt.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Trả về số lượng Pizza theo địa chỉ
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Trả về chủ sở hữu của Pizza được tìm thấy bằng id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "ID Pizza không hợp lệ.");
        return owner;
    }

    // Phê duyệt địa chỉ khác để chuyển quyền sở hữu Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Phải là chủ sở hữu Pizza.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Trả về địa chỉ được phê duyệt cho Pizza cụ thể
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza không tồn tại.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Hàm riêng tư để xóa phê duyệt hiện tại của một ID token nhất định
     * Hoàn nguyên nếu địa chỉ đã cho thực sự không phải là chủ sở hữu của token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Phải là chủ sở hữu pizza.");
        require(_exists(_pizzaId), "Pizza không tồn tại.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Đặt hoặc bỏ đặt phê duyệt của một nhà điều hành nhất định
     * Một nhà điều hành được phép chuyển tất cả các token của người gửi thay mặt họ
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Không thể phê duyệt địa chỉ của chính mình");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Cho biết một nhà điều hành có được một chủ sở hữu nhất định phê duyệt hay không
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Nhận quyền sở hữu Pizza - chỉ dành cho người dùng được phê duyệt
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Địa chỉ không được phê duyệt.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Kiểm tra xem Pizza có tồn tại không
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Kiểm tra xem địa chỉ có phải là chủ sở hữu hoặc được phê duyệt để chuyển Pizza không
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
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
        require(result, "Pizza với tên như vậy đã tồn tại.");
        _;
    }

    // Trả về việc địa chỉ mục tiêu có phải là một hợp đồng không
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Hiện tại không có cách nào tốt hơn để kiểm tra xem có hợp đồng trong một địa chỉ hay không
        // ngoài việc kiểm tra kích thước của mã tại địa chỉ đó.
        // Xem https://ethereum.stackexchange.com/a/14016/36603
        // để biết thêm chi tiết về cách hoạt động của nó.
        // TODO Kiểm tra lại điều này trước khi phát hành Serenity, bởi vì tất cả các địa chỉ sau đó sẽ là
        // hợp đồng.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Đọc thêm {#further-reading}

Xem thêm tài liệu của Solidity và Vyper để có cái nhìn tổng quát hơn về các hợp đồng thông minh:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Các chủ đề liên quan {#related-topics}

- [Hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Máy ảo Ethereum](/developers/docs/evm/)

## Các hướng dẫn liên quan {#related-tutorials}

- [Thu nhỏ hợp đồng để chống lại giới hạn kích thước hợp đồng](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Một số mẹo thực tế để giảm kích thước hợp đồng thông minh của bạn._
- [Ghi dữ liệu từ các hợp đồng thông minh bằng các sự kiện](/developers/tutorials/logging-events-smart-contracts/) _– Giới thiệu về các sự kiện hợp đồng thông minh và cách bạn có thể sử dụng chúng để ghi dữ liệu._
- [Tương tác với các hợp đồng khác từ Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cách triển khai một hợp đồng thông minh từ một hợp đồng hiện có và tương tác với nó._
