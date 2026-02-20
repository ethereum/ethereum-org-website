---
title: "Hướng dẫn về Hợp đồng ERC-20"
description: "Hợp đồng ERC-20 của OpenZeppelin chứa những gì và tại sao chúng lại ở đó?"
author: Ori Pomerantz
lang: vi
tags: [ "solidity", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## Giới thiệu {#introduction}

Một trong những ứng dụng cho Ethereum đó là cho một nhóm tạo ra Token có thể giao dịch, nói đơn giản là tiền tệ của riêng họ. Các token này thường tuân theo một tiêu chuẩn,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Tiêu chuẩn này giúp có thể viết các công cụ, chẳng hạn như các bể thanh khoản và ví, hoạt động với tất cả các token
ERC-20. Trong bài viết này, chúng tôi sẽ phân tích
[việc triển khai Solidity ERC20 của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), cũng như
[định nghĩa giao diện](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Đây là mã nguồn có chú thích. Nếu bạn muốn triển khai ERC-20,
[hãy đọc hướng dẫn này](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Giao diện {#the-interface}

Mục đích của một tiêu chuẩn như ERC-20 là cho phép nhiều triển khai token có thể tương tác trên các ứng dụng, như ví và sàn giao dịch phi tập trung. Để đạt được điều đó, chúng tôi tạo một
[giao diện](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Bất kỳ mã nào cần sử dụng hợp đồng token
đều có thể sử dụng các định nghĩa giống nhau trong giao diện và tương thích với tất cả các hợp đồng token sử dụng nó, cho dù đó là ví như
MetaMask, một ứng dụng phi tập trung như etherscan.io, hoặc một hợp đồng khác như bể thanh khoản.

![Minh họa về giao diện ERC-20](erc20_interface.png)

Nếu bạn là một lập trình viên có kinh nghiệm, bạn có thể nhớ đã thấy các cấu trúc tương tự trong [Java](https://www.w3schools.com/java/java_interface.asp)
hoặc ngay cả trong [các tệp tiêu đề C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Đây là định nghĩa của [Giao diện ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
từ OpenZeppelin. Đó là một bản dịch của [tiêu chuẩn mà con người có thể đọc được](https://eips.ethereum.org/EIPS/eip-20) thành mã Solidity. Tất nhiên,
bản thân giao diện không định nghĩa _cách_ làm bất cứ điều gì. Điều đó được giải thích trong mã nguồn hợp đồng bên dưới.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Các tệp Solidity phải bao gồm một mã định danh giấy phép. [Bạn có thể xem danh sách các giấy phép tại đây](https://spdx.org/licenses/). Nếu bạn cần một giấy phép
khác, chỉ cần giải thích nó trong các bình luận.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Ngôn ngữ Solidity vẫn đang phát triển nhanh chóng, và các phiên bản mới có thể không tương thích với mã cũ
([xem tại đây](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Do đó, bạn nên chỉ định không chỉ phiên bản tối thiểu
của ngôn ngữ, mà còn cả phiên bản tối đa, phiên bản mới nhất mà bạn đã kiểm tra mã.

&nbsp;

```solidity
/**
 * @dev Giao diện của tiêu chuẩn ERC20 như được định nghĩa trong EIP.
 */
```

`@dev` trong bình luận là một phần của [định dạng NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), được sử dụng để tạo
tài liệu từ mã nguồn.

&nbsp;

```solidity
interface IERC20 {
```

Theo quy ước, tên giao diện bắt đầu bằng `I`.

&nbsp;

```solidity
    /**
     * @dev Trả về số lượng token đang tồn tại.
     */
    function totalSupply() external view returns (uint256);
```

Hàm này là `external`, có nghĩa là [nó chỉ có thể được gọi từ bên ngoài hợp đồng](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Nó trả về tổng cung token trong hợp đồng. Giá trị này được trả về bằng cách sử dụng loại phổ biến nhất trong Ethereum, số nguyên không dấu 256 bit (256 bit là
kích thước từ gốc của EVM). Hàm này cũng là một `view`, có nghĩa là nó không thay đổi trạng thái, vì vậy nó có thể được thực thi trên một nút duy nhất thay vì
mọi nút trong chuỗi khối đều phải chạy nó. Loại hàm này không tạo ra một giao dịch và không tốn [gas](/developers/docs/gas/).

**Lưu ý:** Về lý thuyết, có vẻ như người tạo hợp đồng có thể gian lận bằng cách trả về tổng cung nhỏ hơn giá trị thực, khiến mỗi token có vẻ
giá trị hơn so với thực tế. Tuy nhiên, nỗi sợ đó đã bỏ qua bản chất thực sự của chuỗi khối. Mọi thứ xảy ra trên chuỗi khối đều có thể được xác minh bởi
mọi nút. Để đạt được điều này, mã ngôn ngữ máy và bộ nhớ của mọi hợp đồng đều có sẵn trên mọi nút. Mặc dù bạn không bắt buộc phải xuất bản mã
Solidity cho hợp đồng của mình, nhưng sẽ không ai coi trọng bạn trừ khi bạn xuất bản mã nguồn và phiên bản Solidity mà nó được biên dịch, để nó có thể
được xác minh với mã ngôn ngữ máy mà bạn đã cung cấp.
Ví dụ: xem [hợp đồng này](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Trả về số lượng token thuộc sở hữu của `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Đúng như tên gọi, `balanceOf` trả về số dư của một tài khoản. Các tài khoản Ethereum được xác định trong Solidity bằng loại `address`, chứa 160 bit.
Nó cũng là `external` và `view`.

&nbsp;

```solidity
    /**
     * @dev Di chuyển `amount` token từ tài khoản của người gọi đến `recipient`.
     *
     * Trả về một giá trị boolean cho biết liệu hoạt động có thành công hay không.
     *
     * Phát ra một sự kiện {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Hàm `transfer` chuyển token từ người gọi đến một địa chỉ khác. Điều này liên quan đến việc thay đổi trạng thái, vì vậy nó không phải là `view`.
Khi người dùng gọi hàm này, nó sẽ tạo ra một giao dịch và tốn gas. Nó cũng phát ra một sự kiện, `Transfer`, để thông báo cho mọi người trên
chuỗi khối về sự kiện này.

Hàm có hai loại đầu ra cho hai loại người gọi khác nhau:

- Người dùng gọi hàm trực tiếp từ giao diện người dùng. Thông thường người dùng gửi một giao dịch
  và không đợi phản hồi, việc này có thể mất một khoảng thời gian không xác định. Người dùng có thể xem những gì đã xảy ra
  bằng cách tìm biên lai giao dịch (được xác định bởi hàm băm giao dịch) hoặc bằng cách tìm
  sự kiện `Transfer`.
- Các hợp đồng khác, gọi hàm như một phần của một giao dịch tổng thể. Các hợp đồng đó nhận được kết quả ngay lập tức,
  vì chúng chạy trong cùng một giao dịch, vì vậy chúng có thể sử dụng giá trị trả về của hàm.

Loại đầu ra tương tự được tạo bởi các hàm khác làm thay đổi trạng thái của hợp đồng.

&nbsp;

Hạn mức cho phép một tài khoản chi tiêu một số token thuộc về một chủ sở hữu khác.
Điều này hữu ích, ví dụ, đối với các hợp đồng hoạt động như người bán. Các hợp đồng không thể
giám sát các sự kiện, vì vậy nếu người mua chuyển token trực tiếp đến hợp đồng của người bán
thì hợp đồng đó sẽ không biết nó đã được thanh toán. Thay vào đó, người mua cho phép
hợp đồng người bán chi tiêu một số tiền nhất định và người bán chuyển số tiền đó.
Điều này được thực hiện thông qua một hàm mà hợp đồng người bán gọi, do đó hợp đồng người bán
có thể biết liệu nó có thành công hay không.

```solidity
    /**
     * @dev Trả về số lượng token còn lại mà `spender` sẽ được
     * phép chi tiêu thay mặt cho `owner` thông qua {transferFrom}. Con số này
     * mặc định là không.
     *
     * Giá trị này thay đổi khi {approve} hoặc {transferFrom} được gọi.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Hàm `allowance` cho phép bất kỳ ai truy vấn để xem hạn mức mà một
địa chỉ (`owner`) cho phép một địa chỉ khác (`spender`) chi tiêu.

&nbsp;

```solidity
    /**
     * @dev Đặt `amount` làm hạn mức của `spender` trên các token của người gọi.
     *
     * Trả về một giá trị boolean cho biết liệu hoạt động có thành công hay không.
     *
     * QUAN TRỌNG: Cẩn thận rằng việc thay đổi hạn mức bằng phương pháp này có nguy cơ
     * ai đó có thể sử dụng cả hạn mức cũ và mới do thứ tự
     * giao dịch không may mắn. Một giải pháp khả thi để giảm thiểu tình trạng
     * chạy đua này là trước tiên giảm hạn mức của người chi tiêu xuống 0 và đặt
     * giá trị mong muốn sau đó:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Phát ra một sự kiện {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Hàm `approve` tạo ra một hạn mức. Hãy chắc chắn đọc thông điệp về
cách nó có thể bị lạm dụng. Trong Ethereum, bạn kiểm soát thứ tự các giao dịch của chính mình,
nhưng bạn không thể kiểm soát thứ tự các giao dịch của người khác sẽ
được thực hiện, trừ khi bạn không gửi giao dịch của mình cho đến khi bạn thấy
giao dịch của phía bên kia đã xảy ra.

&nbsp;

```solidity
    /**
     * @dev Di chuyển `amount` token từ `sender` đến `recipient` bằng cách sử dụng
     * cơ chế hạn mức. `amount` sau đó được khấu trừ từ hạn mức của người gọi
     * 
     *
     * Trả về một giá trị boolean cho biết liệu hoạt động có thành công hay không.
     *
     * Phát ra một sự kiện {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Cuối cùng, `transferFrom` được người chi tiêu sử dụng để thực sự chi tiêu hạn mức.

&nbsp;

```solidity

    /**
     * @dev Được phát ra khi token `value` được chuyển từ một tài khoản (`from`) sang
     * một tài khoản khác (`to`).
     *
     * Lưu ý rằng `value` có thể bằng không.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Được phát ra khi hạn mức của `spender` cho một `owner` được đặt bởi
     * một cuộc gọi đến {approve}. `value` là hạn mức mới.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Những sự kiện này được phát ra khi trạng thái của hợp đồng ERC-20 thay đổi.

## Hợp đồng thực tế {#the-actual-contract}

Đây là hợp đồng thực tế triển khai tiêu chuẩn ERC-20,
[lấy từ đây](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Nó không có nghĩa là để được sử dụng nguyên trạng, nhưng bạn có thể
[kế thừa](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) từ nó để mở rộng nó thành một cái gì đó có thể sử dụng được.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Các câu lệnh nhập {#import-statements}

Ngoài các định nghĩa giao diện ở trên, định nghĩa hợp đồng nhập hai tệp khác:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` là các định nghĩa cần thiết để sử dụng [OpenGSN](https://www.opengsn.org/), một hệ thống cho phép người dùng không có ether
  sử dụng chuỗi khối. Lưu ý rằng đây là một phiên bản cũ, nếu bạn muốn tích hợp với OpenGSN
  [hãy sử dụng hướng dẫn này](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Thư viện SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), ngăn chặn
  tràn số/tràn số dưới cho các phiên bản Solidity **<0.8.0**. Trong Solidity ≥0.8.0, các phép toán số học tự động
  hoàn nguyên khi tràn số/tràn số dưới, khiến SafeMath không cần thiết. Hợp đồng này sử dụng SafeMath để tương thích ngược với
  các phiên bản trình biên dịch cũ hơn.

&nbsp;

Bình luận này giải thích mục đích của hợp đồng.

```solidity
/**
 * @dev Việc triển khai giao diện {IERC20}.
 *
 * Việc triển khai này không phụ thuộc vào cách token được tạo ra. Điều này có nghĩa là
 * một cơ chế cung cấp phải được thêm vào trong một hợp đồng phái sinh bằng cách sử dụng {_mint}.
 * Để biết cơ chế chung, hãy xem {ERC20PresetMinterPauser}.
 *
 * MẸO: Để xem bài viết chi tiết, hãy xem hướng dẫn của chúng tôi
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Cách
 * triển khai cơ chế cung cấp].
 *
 * Chúng tôi đã tuân theo các nguyên tắc chung của OpenZeppelin: các hàm sẽ hoàn nguyên thay
 * vì trả về `false` khi thất bại. Hành vi này tuy nhiên là thông thường
 * và không mâu thuẫn với các kỳ vọng của ứng dụng ERC20.
 *
 * Ngoài ra, một sự kiện {Approval} được phát ra khi gọi hàm {transferFrom}.
 * Điều này cho phép các ứng dụng tái tạo khoản cấp phép cho tất cả các tài khoản chỉ
 * bằng cách lắng nghe các sự kiện đã nói. Các triển khai khác của EIP có thể không phát ra
 * các sự kiện này, vì nó không được yêu cầu bởi đặc tả.
 *
 * Cuối cùng, các hàm không chuẩn {decreaseAllowance} và {increaseAllowance}
 * đã được thêm vào để giảm thiểu các vấn đề đã biết xung quanh việc đặt
 * khoản cấp phép. Xem {IERC20-approve}.
 */
```

### Định nghĩa Hợp đồng {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Dòng này chỉ định sự kế thừa, trong trường hợp này là từ `IERC20` ở trên và `Context`, cho OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Dòng này gắn thư viện `SafeMath` vào loại `uint256`. Bạn có thể tìm thấy thư viện này
[tại đây](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Định nghĩa Biến {#variable-definitions}

Các định nghĩa này chỉ định các biến trạng thái của hợp đồng. Các biến này được khai báo là `private`, nhưng
điều đó chỉ có nghĩa là các hợp đồng khác trên chuỗi khối không thể đọc chúng. _Không có bí mật nào
trên chuỗi khối_, phần mềm trên mọi nút có trạng thái của mọi hợp đồng
tại mỗi khối. Theo quy ước, các biến trạng thái được đặt tên là `_<something>`.

Hai biến đầu tiên là [ánh xạ](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
có nghĩa là chúng hoạt động gần giống như [mảng liên kết](https://wikipedia.org/wiki/Associative_array),
ngoại trừ việc các khóa là các giá trị số. Lưu trữ chỉ được cấp phát cho các mục có giá trị khác
với giá trị mặc định (không).

```solidity
    mapping (address => uint256) private _balances;
```

Ánh xạ đầu tiên, `_balances`, là các địa chỉ và số dư tương ứng của token này. Để truy cập
số dư, hãy sử dụng cú pháp này: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Biến này, `_allowances`, lưu trữ các khoản cấp phép đã được giải thích trước đó. Chỉ số đầu tiên là chủ sở hữu
của các token, và chỉ số thứ hai là hợp đồng có khoản cấp phép. Để truy cập số tiền mà địa chỉ A có thể
tiêu từ tài khoản của địa chỉ B, hãy sử dụng `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Đúng như tên gọi, biến này theo dõi tổng nguồn cung token.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Ba biến này được sử dụng để cải thiện khả năng đọc. Hai biến đầu tiên tự giải thích, nhưng `_decimals`
thì không.

Một mặt, Ethereum không có các biến dấu phẩy động hoặc biến phân số. Mặt khác,
con người thích có thể chia nhỏ các token. Một lý do mọi người chọn vàng làm tiền tệ là vì
rất khó để thối tiền khi ai đó muốn mua một con vịt bằng giá trị của một con bò.

Giải pháp là theo dõi các số nguyên, nhưng thay vì đếm token thực, chúng ta đếm một token phân số gần như
vô giá trị. Trong trường hợp của ether, token phân số được gọi là wei, và 10^18 wei bằng một
ETH. Tại thời điểm viết bài, 10.000.000.000.000 wei xấp xỉ một cent Mỹ hoặc Euro.

Các ứng dụng cần biết cách hiển thị số dư token. Nếu một người dùng có 3.141.000.000.000.000.000 wei, đó có phải là
3.14 ETH không? 31.41 ETH? 3.141 ETH? Trong trường hợp của ether, nó được định nghĩa là 10^18 wei cho một ETH, nhưng đối với
token của bạn, bạn có thể chọn một giá trị khác. Nếu việc chia token không có ý nghĩa, bạn có thể sử dụng một
giá trị `_decimals` bằng không. Nếu bạn muốn sử dụng cùng một tiêu chuẩn như ETH, hãy sử dụng giá trị **18**.

### Hàm dựng {#the-constructor}

```solidity
    /**
     * @dev Đặt các giá trị cho {name} và {symbol}, khởi tạo {decimals} với
     * giá trị mặc định là 18.
     *
     * Để chọn một giá trị khác cho {decimals}, hãy sử dụng {_setupDecimals}.
     *
     * Cả ba giá trị này đều là bất biến: chúng chỉ có thể được đặt một lần trong
     * quá trình khởi tạo.
     */
    constructor (string memory name_, string memory symbol_) public {
        // Trong Solidity ≥0.7.0, 'public' là ngầm định và có thể được bỏ qua.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Hàm dựng được gọi khi hợp đồng được tạo lần đầu tiên. Theo quy ước, các tham số hàm được đặt tên là `<something>_`.

### Các Hàm Giao diện Người dùng {#user-interface-functions}

```solidity
    /**
     * @dev Trả về tên của token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Trả về ký hiệu của token, thường là một phiên bản ngắn hơn của
     * tên.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Trả về số lượng số thập phân được sử dụng để lấy biểu diễn người dùng của nó.
     * Ví dụ, nếu `decimals` bằng `2`, số dư là `505` token sẽ
     * được hiển thị cho người dùng là `5,05` (`505 / 10 ** 2`).
     *
     * Các token thường chọn giá trị là 18, bắt chước mối quan hệ giữa
     * ether và wei. Đây là giá trị mà {ERC20} sử dụng, trừ khi {_setupDecimals}
     * được gọi.
     *
     * LƯU Ý: Thông tin này chỉ được sử dụng cho mục đích _hiển thị_: nó
     * không ảnh hưởng đến bất kỳ phép tính số học nào của hợp đồng, bao gồm
     * {IERC20-balanceOf} và {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Các hàm này, `name`, `symbol`, và `decimals` giúp các giao diện người dùng biết về hợp đồng của bạn để chúng có thể hiển thị nó một cách chính xác.

Loại trả về là `string memory`, có nghĩa là trả về một chuỗi được lưu trữ trong bộ nhớ. Các biến, chẳng hạn như
chuỗi, có thể được lưu trữ ở ba vị trí:

|          | Vòng đời                  | Truy cập Hợp đồng | Chi phí Gas                                                                  |
| -------- | ------------------------- | ----------------- | ---------------------------------------------------------------------------- |
| Bộ nhớ   | Lệnh gọi hàm              | Đọc/Ghi           | Hàng chục hoặc hàng trăm (cao hơn cho các vị trí cao hơn) |
| Calldata | Lệnh gọi hàm              | Chỉ đọc           | Không thể được sử dụng làm loại trả về, chỉ là loại tham số hàm              |
| Lưu trữ  | Cho đến khi được thay đổi | Đọc/Ghi           | Cao (800 cho đọc, 20k cho ghi)                            |

Trong trường hợp này, `memory` là lựa chọn tốt nhất.

### Đọc thông tin Token {#read-token-information}

Đây là các hàm cung cấp thông tin về token, hoặc là tổng nguồn cung hoặc là
số dư của một tài khoản.

```solidity
    /**
     * @dev Xem {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Hàm `totalSupply` trả về tổng nguồn cung token.

&nbsp;

```solidity
    /**
     * @dev Xem {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Đọc số dư của một tài khoản. Lưu ý rằng bất kỳ ai cũng được phép lấy số dư tài khoản
của bất kỳ ai khác. Không có lý do gì để cố gắng che giấu thông tin này, vì nó có sẵn trên mọi
nút. _Không có bí mật nào trên chuỗi khối._

### Chuyển Token {#transfer-tokens}

```solidity
    /**
     * @dev Xem {IERC20-transfer}.
     *
     * Các yêu cầu:
     *
     * - `recipient` không được là địa chỉ không.
     * - người gọi phải có số dư ít nhất là `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Hàm `transfer` được gọi để chuyển token từ tài khoản của người gửi sang một tài khoản khác. Lưu ý
rằng mặc dù nó trả về một giá trị boolean, giá trị đó luôn là **true**. Nếu việc chuyển khoản
thất bại, hợp đồng sẽ hoàn nguyên lệnh gọi.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Hàm `_transfer` thực hiện công việc thực tế. Nó là một hàm riêng tư chỉ có thể được gọi bởi
các hàm khác của hợp đồng. Theo quy ước, các hàm riêng tư được đặt tên là `_<something>`, giống như các biến
trạng thái.

Thông thường trong Solidity, chúng ta sử dụng `msg.sender` cho người gửi thông điệp. Tuy nhiên, điều đó làm hỏng
[OpenGSN](http://opengsn.org/). Nếu chúng ta muốn cho phép các giao dịch không cần ether với token của mình, chúng ta
cần sử dụng `_msgSender()`. Nó trả về `msg.sender` cho các giao dịch bình thường, nhưng đối với các giao dịch không cần ether
thì trả về người ký ban đầu chứ không phải hợp đồng đã chuyển tiếp thông điệp.

### Các Hàm Cấp phép {#allowance-functions}

Đây là các hàm triển khai chức năng cấp phép: `allowance`, `approve`, `transferFrom`,
và `_approve`. Ngoài ra, việc triển khai OpenZeppelin vượt ra ngoài tiêu chuẩn cơ bản để bao gồm một số tính năng cải thiện
bảo mật: `increaseAllowance`, và `decreaseAllowance`.

#### Hàm cấp phép {#allowance}

```solidity
    /**
     * @dev Xem {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Hàm `allowance` cho phép mọi người kiểm tra bất kỳ khoản cấp phép nào.

#### Hàm phê duyệt {#approve}

```solidity
    /**
     * @dev Xem {IERC20-approve}.
     *
     * Các yêu cầu:
     *
     * - `spender` không được là địa chỉ không.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Hàm này được gọi để tạo một khoản cấp phép. Nó tương tự như hàm `transfer` ở trên:

- Hàm chỉ gọi một hàm nội bộ (trong trường hợp này là `_approve`) để thực hiện công việc thực tế.
- Hàm sẽ trả về `true` (nếu thành công) hoặc hoàn nguyên (nếu không).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Chúng tôi sử dụng các hàm nội bộ để giảm thiểu số lượng nơi xảy ra thay đổi trạng thái. _Bất kỳ_ hàm nào thay đổi
trạng thái đều là một rủi ro bảo mật tiềm tàng cần được kiểm tra về mặt bảo mật. Bằng cách này, chúng ta có ít cơ hội làm sai hơn.

#### Hàm transferFrom {#transferFrom}

Đây là hàm mà một người chi tiêu gọi để sử dụng một khoản cấp phép. Điều này đòi hỏi hai hoạt động: chuyển số tiền
đang được chi tiêu và giảm khoản cấp phép đi số tiền đó.

```solidity
    /**
     * @dev Xem {IERC20-transferFrom}.
     *
     * Phát ra một sự kiện {Approval} cho biết khoản cấp phép đã được cập nhật. Điều này không
     * được EIP yêu cầu. Xem ghi chú ở đầu {ERC20}.
     *
     * Các yêu cầu:
     *
     * - `sender` và `recipient` không được là địa chỉ không.
     * - `sender` phải có số dư ít nhất là `amount`.
     * - người gọi phải có khoản cấp phép cho các token của ``sender`` ít nhất là
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Lệnh gọi hàm `a.sub(b, "message")` thực hiện hai việc. Đầu tiên, nó tính toán `a-b`, là khoản cấp phép mới.
Thứ hai, nó kiểm tra xem kết quả này có phải là số âm hay không. Nếu nó là số âm, lệnh gọi sẽ hoàn nguyên với thông điệp được cung cấp. Lưu ý rằng khi một lệnh gọi hoàn nguyên, bất kỳ quá trình xử lý nào đã được thực hiện trước đó trong lệnh gọi đó đều bị bỏ qua, vì vậy chúng ta không cần phải
hoàn tác `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: số tiền chuyển vượt quá khoản cấp phép"));
        return true;
    }
```

#### Các bổ sung an toàn của OpenZeppelin {#openzeppelin-safety-additions}

Việc đặt một khoản cấp phép khác không thành một giá trị khác không khác là rất nguy hiểm,
bởi vì bạn chỉ kiểm soát thứ tự các giao dịch của riêng mình, chứ không phải của bất kỳ ai khác. Hãy tưởng tượng bạn
có hai người dùng, Alice là người ngây thơ và Bill là người không trung thực. Alice muốn một số dịch vụ từ
Bill, mà cô ấy nghĩ rằng có giá năm token - vì vậy cô ấy cấp cho Bill một khoản cấp phép là năm token.

Sau đó, có điều gì đó thay đổi và giá của Bill tăng lên mười token. Alice, người vẫn muốn dịch vụ,
gửi một giao dịch đặt khoản cấp phép của Bill thành mười. Ngay khi Bill nhìn thấy giao dịch mới này
trong bể giao dịch, anh ta gửi một giao dịch chi tiêu năm token của Alice và có giá gas cao hơn
nhiều để nó sẽ được khai thác nhanh hơn. Bằng cách đó, Bill có thể chi tiêu năm token đầu tiên và sau đó,
khi khoản cấp phép mới của Alice được khai thác, chi tiêu thêm mười token nữa với tổng giá là mười lăm token, nhiều hơn
số tiền Alice dự định ủy quyền. Kỹ thuật này được gọi là
[chạy trước](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Giao dịch của Alice                  | Nonce của Alice | Giao dịch của Bill                               | Nonce của Bill         | Khoản cấp phép của Bill | Tổng thu nhập của Bill từ Alice |
| ------------------------------------ | --------------- | ------------------------------------------------ | ---------------------- | ----------------------- | ------------------------------- |
| approve(Bill, 5)  | 10              |                                                  |                        | 5                       | 0                               |
|                                      |                 | transferFrom(Alice, Bill, 5)  | 10.123 | 0                       | 5                               |
| approve(Bill, 10) | 11              |                                                  |                        | 10                      | 5                               |
|                                      |                 | transferFrom(Alice, Bill, 10) | 10,124                 | 0                       | 15                              |

Để tránh vấn đề này, hai hàm này (`increaseAllowance` và `decreaseAllowance`) cho phép bạn
sửa đổi hạn mức theo một số lượng cụ thể. Vì vậy, nếu Bill đã chi tiêu năm token, anh ta sẽ chỉ
có thể chi tiêu thêm năm token nữa. Tùy thuộc vào thời gian, có hai cách điều này có thể hoạt động, cả hai
đều kết thúc với việc Bill chỉ nhận được mười token:

A:

| Giao dịch của Alice                           | Nonce của Alice | Giao dịch của Bill                              |         Nonce của Bill | Khoản cấp phép của Bill | Tổng thu nhập của Bill từ Alice |
| --------------------------------------------- | --------------: | ----------------------------------------------- | ---------------------: | ----------------------: | ------------------------------- |
| approve(Bill, 5)           |              10 |                                                 |                        |                       5 | 0                               |
|                                               |                 | transferFrom(Alice, Bill, 5) | 10.123 |                       0 | 5                               |
| increaseAllowance(Bill, 5) |              11 |                                                 |                        |                 0+5 = 5 | 5                               |
|                                               |                 | transferFrom(Alice, Bill, 5) |                 10,124 |                       0 | 10                              |

B:

| Giao dịch của Alice                           | Nonce của Alice | Giao dịch của Bill                               | Nonce của Bill | Khoản cấp phép của Bill | Tổng thu nhập của Bill từ Alice |
| --------------------------------------------- | --------------: | ------------------------------------------------ | -------------: | ----------------------: | ------------------------------: |
| approve(Bill, 5)           |              10 |                                                  |                |                       5 |                               0 |
| increaseAllowance(Bill, 5) |              11 |                                                  |                |                5+5 = 10 |                               0 |
|                                               |                 | transferFrom(Alice, Bill, 10) |         10,124 |                       0 |                              10 |

```solidity
    /**
     * @dev Tăng một cách nguyên tử hạn mức được cấp cho `spender` bởi người gọi.
     *
     * Đây là một giải pháp thay thế cho {approve} có thể được sử dụng như một biện pháp giảm thiểu cho
     * các vấn đề được mô tả trong {IERC20-approve}.
     *
     * Phát ra một sự kiện {Approval} cho biết hạn mức đã được cập nhật.
     *
     * Các yêu cầu:
     *
     * - `spender` không thể là địa chỉ không.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Hàm `a.add(b)` là một hàm cộng an toàn. Trong trường hợp không thể xảy ra là `a`+`b`>=`2^256`, nó không quay vòng
theo cách cộng thông thường.

```solidity

    /**
     * @dev Giảm một cách nguyên tử hạn mức được cấp cho `spender` bởi người gọi.
     *
     * Đây là một giải pháp thay thế cho {approve} có thể được sử dụng như một biện pháp giảm thiểu cho
     * các vấn đề được mô tả trong {IERC20-approve}.
     *
     * Phát ra một sự kiện {Approval} cho biết hạn mức đã được cập nhật.
     *
     * Các yêu cầu:
     *
     * - `spender` không thể là địa chỉ không.
     * - `spender` phải có hạn mức cho người gọi ít nhất
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Các hàm sửa đổi thông tin Token {#functions-that-modify-token-information}

Đây là bốn hàm thực hiện công việc thực tế: `_transfer`, `_mint`, `_burn`, và `_approve`.

#### Hàm _transfer {#_transfer}

```solidity
    /**
     * @dev Di chuyển `amount` token từ `sender` sang `recipient`.
     *
     * Hàm nội bộ này tương đương với {transfer}, và có thể được sử dụng để
     * ví dụ, triển khai phí token tự động, cơ chế phạt, v.v.
     *
     * Phát ra một sự kiện {Transfer}.
     *
     * Các yêu cầu:
     *
     * - `sender` không thể là địa chỉ không.
     * - `recipient` không thể là địa chỉ không.
     * - `sender` phải có số dư ít nhất `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Hàm này, `_transfer`, chuyển token từ một tài khoản sang một tài khoản khác. Nó được gọi bởi cả
`transfer` (đối với các lần chuyển từ tài khoản của chính người gửi) và `transferFrom` (đối với việc sử dụng hạn mức
để chuyển từ tài khoản của người khác).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Không ai thực sự sở hữu địa chỉ không trong Ethereum (tức là, không ai biết một khóa riêng tư mà khóa công khai phù hợp của nó
được chuyển đổi thành địa chỉ không). Khi mọi người sử dụng địa chỉ đó, thường là một lỗi phần mềm - vì vậy chúng tôi
báo lỗi nếu địa chỉ không được sử dụng làm người gửi hoặc người nhận.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Có hai cách để sử dụng hợp đồng này:

1. Sử dụng nó như một mẫu cho mã của riêng bạn
2. [Kế thừa từ nó](https://www.bitdegree.org/learn/solidity-inheritance), và chỉ ghi đè những hàm mà bạn cần sửa đổi

Phương pháp thứ hai tốt hơn nhiều vì mã ERC-20 của OpenZeppelin đã được kiểm toán và cho thấy là an toàn. Khi bạn sử dụng kế thừa,
nó sẽ rõ ràng những hàm nào bạn sửa đổi, và để tin tưởng vào hợp đồng của bạn, mọi người chỉ cần kiểm toán những hàm cụ thể đó.

Thường rất hữu ích khi thực hiện một hàm mỗi khi token được trao tay. Tuy nhiên, `_transfer` là một hàm rất quan trọng và có
thể viết nó một cách không an toàn (xem bên dưới), vì vậy tốt nhất là không nên ghi đè nó. Giải pháp là `_beforeTokenTransfer`, một
[hàm móc](https://wikipedia.org/wiki/Hooking). Bạn có thể ghi đè hàm này, và nó sẽ được gọi trên mỗi lần chuyển khoản.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Đây là những dòng thực sự thực hiện việc chuyển khoản. Lưu ý rằng **không có gì** ở giữa chúng, và chúng tôi trừ
số tiền được chuyển từ người gửi trước khi cộng nó vào người nhận. Điều này quan trọng vì nếu có một
cuộc gọi đến một hợp đồng khác ở giữa, nó có thể đã được sử dụng để gian lận hợp đồng này. Bằng cách này, việc chuyển khoản
là nguyên tử, không có gì có thể xảy ra ở giữa nó.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Cuối cùng, phát ra một sự kiện `Transfer`. Các sự kiện không thể truy cập được đối với các hợp đồng thông minh, nhưng mã chạy bên ngoài chuỗi khối
có thể lắng nghe các sự kiện và phản ứng với chúng. Ví dụ, một chiếc ví có thể theo dõi khi chủ sở hữu nhận được nhiều token hơn.

#### Các hàm _mint và _burn {#_mint-and-_burn}

Hai hàm này (`_mint` và `_burn`) sửa đổi tổng cung token.
Chúng là nội bộ và không có hàm nào gọi chúng trong hợp đồng này,
vì vậy chúng chỉ hữu ích nếu bạn kế thừa từ hợp đồng và thêm logic của riêng bạn
để quyết định trong điều kiện nào để đúc token mới hoặc đốt token hiện có.

**LƯU Ý:** Mỗi token ERC-20 đều có logic kinh doanh riêng để quyết định việc quản lý token.
Ví dụ, một hợp đồng cung cấp cố định có thể chỉ gọi `_mint`
trong hàm khởi tạo và không bao giờ gọi `_burn`. Một hợp đồng bán token
sẽ gọi `_mint` khi được thanh toán, và có lẽ sẽ gọi `_burn` tại một thời điểm nào đó
để tránh lạm phát phi mã.

```solidity
    /** @dev Tạo `amount` token và gán chúng cho `account`, tăng
     * tổng cung.
     *
     * Phát ra một sự kiện {Transfer} với `from` được đặt thành địa chỉ không.
     *
     * Các yêu cầu:
     *
     * - `to` không thể là địa chỉ không.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Đảm bảo cập nhật `_totalSupply` khi tổng số token thay đổi.

&nbsp;

```solidity
    /**
     * @dev Hủy `amount` token từ `account`, giảm
     * tổng cung.
     *
     * Phát ra một sự kiện {Transfer} với `to` được đặt thành địa chỉ không.
     *
     * Các yêu cầu:
     *
     * - `account` không thể là địa chỉ không.
     * - `account` phải có ít nhất `amount` token.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Hàm `_burn` gần như giống hệt `_mint`, ngoại trừ nó đi theo hướng ngược lại.

#### Hàm _approve {#_approve}

Đây là hàm thực sự chỉ định các hạn mức. Lưu ý rằng nó cho phép chủ sở hữu chỉ định
một hạn mức cao hơn số dư hiện tại của chủ sở hữu. Điều này là OK vì số dư được
kiểm tra tại thời điểm chuyển khoản, khi nó có thể khác với số dư khi hạn mức được
tạo ra.

```solidity
    /**
     * @dev Đặt `amount` làm hạn mức của `spender` trên các token của `owner`.
     *
     * Hàm nội bộ này tương đương với `approve`, và có thể được sử dụng để
     * ví dụ, đặt các hạn mức tự động cho một số hệ thống con, v.v.
     *
     * Phát ra một sự kiện {Approval}.
     *
     * Các yêu cầu:
     *
     * - `owner` không thể là địa chỉ không.
     * - `spender` không thể là địa chỉ không.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Phát ra một sự kiện `Approval`. Tùy thuộc vào cách ứng dụng được viết, hợp đồng người chi tiêu có thể được thông báo về
việc phê duyệt bởi chủ sở hữu hoặc bởi một máy chủ lắng nghe những sự kiện này.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Sửa đổi biến Decimals {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Đặt {decimals} thành một giá trị khác với giá trị mặc định là 18.
     *
     * CẢNH BÁO: Hàm này chỉ nên được gọi từ hàm khởi tạo. Hầu hết
     * các ứng dụng tương tác với các hợp đồng token sẽ không mong đợi
     * {decimals} thay đổi, và có thể hoạt động không chính xác nếu nó thay đổi.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Hàm này sửa đổi biến `_decimals` được sử dụng để cho giao diện người dùng biết cách diễn giải số lượng.
Bạn nên gọi nó từ hàm khởi tạo. Sẽ là không trung thực nếu gọi nó tại bất kỳ thời điểm nào sau đó, và các ứng dụng
không được thiết kế để xử lý nó.

### Hook {#hooks}

```solidity

    /**
     * @dev Móc được gọi trước bất kỳ lần chuyển token nào. Điều này bao gồm
     * việc đúc và đốt.
     *
     * Điều kiện gọi:
     *
     * - khi `from` và `to` đều khác không, `amount` token của ``from``
     * sẽ được chuyển đến `to`.
     * - khi `from` bằng không, `amount` token sẽ được đúc cho `to`.
     * - khi `to` bằng không, `amount` token của ``from`` sẽ bị đốt.
     * - `from` và `to` không bao giờ cùng bằng không.
     *
     * Để tìm hiểu thêm về các móc, hãy truy cập xref:ROOT:extending-contracts.adoc#using-hooks[Sử dụng các Móc].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Đây là hàm móc sẽ được gọi trong các lần chuyển khoản. Nó trống ở đây, nhưng nếu bạn cần
nó làm gì đó, bạn chỉ cần ghi đè nó.

## Kết luận {#conclusion}

Để xem lại, đây là một số ý tưởng quan trọng nhất trong hợp đồng này (theo ý kiến của tôi, ý kiến của bạn có thể khác):

- _Không có bí mật nào trên chuỗi khối_. Bất kỳ thông tin nào mà một hợp đồng thông minh có thể truy cập
  đều có sẵn cho cả thế giới.
- Bạn có thể kiểm soát thứ tự các giao dịch của mình, nhưng không thể kiểm soát khi nào giao dịch của người khác
  xảy ra. Đây là lý do tại sao việc thay đổi hạn mức có thể nguy hiểm, vì nó cho phép
  người chi tiêu chi tiêu tổng của cả hai hạn mức.
- Các giá trị của loại `uint256` sẽ quay vòng. Nói cách khác, _0-1=2^256-1_. Nếu đó không phải là hành vi
  mong muốn, bạn phải kiểm tra nó (hoặc sử dụng thư viện SafeMath làm điều đó cho bạn). Lưu ý rằng điều này đã thay đổi trong
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Thực hiện tất cả các thay đổi trạng thái của một loại cụ thể ở một nơi cụ thể, vì nó giúp việc kiểm toán dễ dàng hơn.
  Đây là lý do tại sao chúng ta có, ví dụ, `_approve`, được gọi bởi `approve`, `transferFrom`,
  `increaseAllowance`, và `decreaseAllowance`
- Các thay đổi trạng thái phải là nguyên tử, không có bất kỳ hành động nào khác ở giữa chúng (như bạn có thể thấy
  trong `_transfer`). Điều này là do trong quá trình thay đổi trạng thái, bạn có một trạng thái không nhất quán. Ví dụ,
  giữa thời điểm bạn khấu trừ từ số dư của người gửi và thời điểm bạn cộng vào số dư của
  người nhận, có ít token tồn tại hơn so với thực tế. Điều này có thể bị lạm dụng nếu có
  các hoạt động giữa chúng, đặc biệt là các cuộc gọi đến một hợp đồng khác.

Bây giờ bạn đã thấy cách hợp đồng ERC-20 của OpenZeppelin được viết, và đặc biệt là cách nó được
làm an toàn hơn, hãy đi và viết các hợp đồng và ứng dụng an toàn của riêng bạn.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).
