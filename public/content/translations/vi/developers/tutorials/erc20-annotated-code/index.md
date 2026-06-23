---
title: "Hướng dẫn chi tiết hợp đồng ERC-20"
description: "Có gì trong hợp đồng ERC-20 của OpenZeppelin và tại sao nó lại ở đó?"
author: Ori Pomerantz
lang: vi
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: "Hướng dẫn chi tiết ERC-20"
published: 2021-03-09
---

## Giới thiệu {#introduction}

Một trong những ứng dụng phổ biến nhất của Ethereum là để một nhóm tạo ra một token có thể giao dịch, theo một nghĩa nào đó là tiền tệ của riêng họ. Các token này thường tuân theo một tiêu chuẩn,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Tiêu chuẩn này giúp cho việc viết các công cụ, chẳng hạn như pool thanh khoản và ví, có thể hoạt động với tất cả các token ERC-20. Trong bài viết này, chúng ta sẽ phân tích
[bản triển khai ERC20 bằng Solidity của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), cũng như
[định nghĩa giao diện](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Đây là mã nguồn có chú thích. Nếu bạn muốn triển khai ERC-20,
[hãy đọc hướng dẫn này](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Giao diện {#the-interface}

Mục đích của một tiêu chuẩn như ERC-20 là cho phép nhiều bản triển khai token có khả năng tương tác trên các ứng dụng, như ví và các sàn giao dịch phi tập trung. Để đạt được điều đó, chúng ta tạo ra một
[giao diện](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Bất kỳ mã nào cần sử dụng hợp đồng token
đều có thể sử dụng các định nghĩa tương tự trong giao diện và tương thích với tất cả các hợp đồng token sử dụng nó, cho dù đó là ví như
MetaMask, một ứng dụng phi tập trung (dapp) như etherscan.io, hay một hợp đồng khác như pool thanh khoản.

![Illustration of the ERC-20 interface](erc20_interface.png)

Nếu bạn là một lập trình viên có kinh nghiệm, bạn có thể nhớ đã thấy các cấu trúc tương tự trong [Java](https://www.w3schools.com/java/java_interface.asp)
hoặc thậm chí trong [các tệp tiêu đề C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Đây là định nghĩa của [Giao diện ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
từ OpenZeppelin. Nó là bản dịch của [tiêu chuẩn con người có thể đọc được](https://eips.ethereum.org/EIPS/eip-20) sang mã Solidity. Tất nhiên,
bản thân giao diện không định nghĩa _cách_ để làm bất cứ điều gì. Điều đó được giải thích trong mã nguồn hợp đồng bên dưới.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Các tệp Solidity được cho là bao gồm một mã định danh giấy phép. [Bạn có thể xem danh sách các giấy phép tại đây](https://spdx.org/licenses/). Nếu bạn cần một giấy phép khác, chỉ cần giải thích nó trong các bình luận.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Ngôn ngữ Solidity vẫn đang phát triển nhanh chóng và các phiên bản mới có thể không tương thích với mã cũ
([xem tại đây](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Do đó, bạn nên chỉ định không chỉ phiên bản tối thiểu của ngôn ngữ mà còn cả phiên bản tối đa, phiên bản mới nhất mà bạn đã kiểm tra mã.

&nbsp;

```solidity
/**
 * @dev Giao diện của tiêu chuẩn ERC-20 như được định nghĩa trong EIP.
 */
```

`@dev` trong bình luận là một phần của [định dạng NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), được sử dụng để tạo tài liệu từ mã nguồn.

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

Hàm này là `external`, nghĩa là [nó chỉ có thể được gọi từ bên ngoài hợp đồng](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Nó trả về tổng nguồn cung token trong hợp đồng. Giá trị này được trả về bằng cách sử dụng kiểu phổ biến nhất trong Ethereum, số nguyên không dấu 256 bit (256 bit là
kích thước từ gốc của EVM). Hàm này cũng là một `view`, có nghĩa là nó không thay đổi trạng thái, vì vậy nó có thể được thực thi trên một nút duy nhất thay vì yêu cầu
mọi nút trong chuỗi khối chạy nó. Loại hàm này không tạo ra giao dịch và không tốn [gas](/developers/docs/gas/).

**Lưu ý:** Về lý thuyết, có vẻ như người tạo hợp đồng có thể gian lận bằng cách trả về tổng nguồn cung nhỏ hơn giá trị thực, làm cho mỗi token có vẻ
giá trị hơn thực tế. Tuy nhiên, nỗi sợ hãi đó bỏ qua bản chất thực sự của chuỗi khối. Mọi thứ xảy ra trên chuỗi khối đều có thể được xác minh bởi
mọi nút. Để đạt được điều này, mã ngôn ngữ máy và bộ nhớ của mọi hợp đồng đều có sẵn trên mọi nút. Mặc dù bạn không bắt buộc phải xuất bản mã Solidity
cho hợp đồng của mình, nhưng sẽ không ai coi trọng bạn trừ khi bạn xuất bản mã nguồn và phiên bản Solidity mà nó được biên dịch, để nó có thể
được xác minh dựa trên mã ngôn ngữ máy mà bạn đã cung cấp.
Ví dụ, xem [hợp đồng này](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Trả về số lượng token thuộc sở hữu của `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Đúng như tên gọi, `balanceOf` trả về số dư của một tài khoản. Các tài khoản Ethereum được xác định trong Solidity bằng cách sử dụng kiểu `address`, chứa 160 bit.
Nó cũng là `external` và `view`.

&nbsp;

```solidity
    /**
     * @dev Chuyển `amount` token từ Tài khoản của người gọi đến `recipient`.
     *
     * Trả về một giá trị boolean chỉ định liệu hoạt động có thành công hay không.
     *
     * Phát ra một sự kiện {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Hàm `transfer` chuyển token từ người gọi đến một địa chỉ khác. Điều này liên quan đến sự thay đổi trạng thái, vì vậy nó không phải là `view`.
Khi người dùng gọi hàm này, nó tạo ra một giao dịch và tốn gas. Nó cũng phát ra một sự kiện, `Transfer`, để thông báo cho mọi người trên
chuỗi khối về sự kiện này.

Hàm có hai loại đầu ra cho hai loại người gọi khác nhau:

- Người dùng gọi hàm trực tiếp từ giao diện người dùng. Thông thường, người dùng gửi một giao dịch
  và không đợi phản hồi, điều này có thể mất một khoảng thời gian không xác định. Người dùng có thể xem những gì đã xảy ra
  bằng cách tìm kiếm biên lai giao dịch (được xác định bởi mã băm giao dịch) hoặc bằng cách tìm kiếm
  sự kiện `Transfer`.
- Các hợp đồng khác, gọi hàm như một phần của giao dịch tổng thể. Các hợp đồng đó nhận được kết quả ngay lập tức,
  vì chúng chạy trong cùng một giao dịch, do đó chúng có thể sử dụng giá trị trả về của hàm.

Cùng một loại đầu ra được tạo bởi các hàm khác làm thay đổi trạng thái của hợp đồng.

&nbsp;

Hạn mức cho phép một tài khoản chi tiêu một số token thuộc về một chủ sở hữu khác.
Điều này rất hữu ích, ví dụ, đối với các hợp đồng đóng vai trò là người bán. Các hợp đồng không thể
theo dõi các sự kiện, vì vậy nếu người mua chuyển token trực tiếp đến hợp đồng người bán
hợp đồng đó sẽ không biết nó đã được thanh toán. Thay vào đó, người mua cho phép
hợp đồng người bán chi tiêu một số lượng nhất định và người bán chuyển số lượng đó.
Điều này được thực hiện thông qua một hàm mà hợp đồng người bán gọi, để hợp đồng người bán
có thể biết liệu nó có thành công hay không.

```solidity
    /**
     * @dev Trả về số lượng token còn lại mà `spender` sẽ được
     * phép chi tiêu thay mặt cho `owner` thông qua {transferFrom}. Giá trị này mặc định
     * là không (zero).
     *
     * Giá trị này thay đổi khi {approve} hoặc {transferFrom} được gọi.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Hàm `allowance` cho phép bất kỳ ai truy vấn để xem hạn mức mà một
địa chỉ (`owner`) cho phép một địa chỉ khác (`spender`) chi tiêu là bao nhiêu.

&nbsp;

```solidity
    /**
     * @dev Đặt `amount` làm hạn mức của `spender` đối với các token của người gọi.
     *
     * Trả về một giá trị boolean chỉ định liệu hoạt động có thành công hay không.
     *
     * QUAN TRỌNG: Hãy cẩn thận rằng việc thay đổi một hạn mức bằng phương thức này mang lại rủi ro
     * rằng ai đó có thể sử dụng cả hạn mức cũ và mới do thứ tự giao dịch
     * không may. Một giải pháp khả thi để giảm thiểu tình trạng
     * tương tranh này là trước tiên giảm hạn mức của người chi tiêu xuống 0 và đặt
     * giá trị mong muốn sau đó:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Phát ra một sự kiện {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Hàm `approve` tạo ra một hạn mức. Hãy chắc chắn đọc thông điệp về
cách nó có thể bị lạm dụng. Trong Ethereum, bạn kiểm soát thứ tự các giao dịch của riêng mình,
nhưng bạn không thể kiểm soát thứ tự mà các giao dịch của người khác sẽ
được thực thi, trừ khi bạn không gửi giao dịch của riêng mình cho đến khi bạn thấy
giao dịch của bên kia đã xảy ra.

&nbsp;

```solidity
    /**
     * @dev Chuyển `amount` token từ `sender` đến `recipient` sử dụng cơ chế
     * hạn mức. `amount` sau đó được khấu trừ từ hạn mức
     * của người gọi.
     *
     * Trả về một giá trị boolean chỉ định liệu hoạt động có thành công hay không.
     *
     * Phát ra một sự kiện {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Cuối cùng, `transferFrom` được sử dụng bởi người chi tiêu để thực sự chi tiêu hạn mức.

&nbsp;

```solidity

    /**
     * @dev Được phát ra khi `value` token được chuyển từ một Tài khoản (`from`) sang
     * Tài khoản khác (`to`).
     *
     * Lưu ý rằng `value` có thể bằng không.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Được phát ra khi hạn mức của một `spender` cho một `owner` được đặt bởi
     * một lệnh gọi đến {approve}. `value` là hạn mức mới.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Các sự kiện này được phát ra khi trạng thái của hợp đồng ERC-20 thay đổi.

## Hợp đồng thực tế {#the-actual-contract}

Đây là hợp đồng thực tế triển khai tiêu chuẩn ERC-20,
[được lấy từ đây](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Nó không nhằm mục đích được sử dụng nguyên bản, nhưng bạn có thể
[kế thừa](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) từ nó để mở rộng thành một thứ gì đó có thể sử dụng được.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Các câu lệnh Import {#import-statements}

Ngoài các định nghĩa giao diện ở trên, định nghĩa hợp đồng nhập hai tệp khác:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` là các định nghĩa cần thiết để sử dụng [OpenGSN](https://www.opengsn.org/), một hệ thống cho phép người dùng không có ether
  sử dụng chuỗi khối. Lưu ý rằng đây là phiên bản cũ, nếu bạn muốn tích hợp với OpenGSN
  [hãy sử dụng hướng dẫn này](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Thư viện SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), giúp ngăn chặn
  tràn số/tràn số dưới số học cho các phiên bản Solidity **&lt;0.8.0**. Trong Solidity ≥0.8.0, các phép toán số học tự động
  hoàn nguyên khi tràn số/tràn số dưới, làm cho SafeMath trở nên không cần thiết. Hợp đồng này sử dụng SafeMath để tương thích ngược với
  các phiên bản trình biên dịch cũ hơn.

&nbsp;

Bình luận này giải thích mục đích của hợp đồng.

```solidity
/**
 * @dev Triển khai của giao diện {IERC20}.
 *
 * Việc triển khai này không phụ thuộc vào cách các token được tạo ra. Điều này có nghĩa
 * là một cơ chế cung cấp phải được thêm vào trong một hợp đồng dẫn xuất sử dụng {_mint}.
 * Đối với một cơ chế chung, hãy xem {ERC20PresetMinterPauser}.
 *
 * MẸO: Để có bài viết chi tiết, hãy xem hướng dẫn của chúng tôi
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Cách
 * triển khai các cơ chế cung cấp].
 *
 * Chúng tôi đã tuân theo các nguyên tắc chung của OpenZeppelin: các hàm sẽ hoàn tác (revert) thay
 * vì trả về `false` khi thất bại. Tuy nhiên, hành vi này là thông thường
 * và không xung đột với kỳ vọng của các ứng dụng ERC-20.
 *
 * Ngoài ra, một sự kiện {Approval} được phát ra trong các lệnh gọi đến {transferFrom}.
 * Điều này cho phép các ứng dụng tái tạo lại hạn mức cho tất cả các Tài khoản chỉ
 * bằng cách lắng nghe các sự kiện nói trên. Các triển khai khác của EIP có thể không phát ra
 * các sự kiện này, vì nó không được yêu cầu bởi đặc tả.
 *
 * Cuối cùng, các hàm không tiêu chuẩn {decreaseAllowance} và {increaseAllowance}
 * đã được thêm vào để giảm thiểu các vấn đề đã biết xung quanh việc đặt
 * các hạn mức. Xem {IERC20-approve}.
 */

```

### Định nghĩa hợp đồng {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Dòng này chỉ định sự kế thừa, trong trường hợp này là từ `IERC20` ở trên và `Context`, cho OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Dòng này gắn thư viện `SafeMath` vào kiểu `uint256`. Bạn có thể tìm thấy thư viện này
[tại đây](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Định nghĩa biến {#variable-definitions}

Các định nghĩa này chỉ định các biến trạng thái của hợp đồng. Các biến này được khai báo là `private`, nhưng
điều đó chỉ có nghĩa là các hợp đồng khác trên chuỗi khối không thể đọc chúng. _Không có
bí mật nào trên chuỗi khối_, phần mềm trên mọi nút đều có trạng thái của mọi hợp đồng
tại mọi khối. Theo quy ước, các biến trạng thái được đặt tên là `_<something>`.

Hai biến đầu tiên là [các ánh xạ (mappings)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
nghĩa là chúng hoạt động gần giống như [mảng kết hợp](https://wikipedia.org/wiki/Associative_array),
ngoại trừ việc các khóa là các giá trị số. Bộ nhớ chỉ được phân bổ cho các mục nhập có giá trị khác
với mặc định (không).

```solidity
    mapping (address => uint256) private _balances;
```

Ánh xạ đầu tiên, `_balances`, là các địa chỉ và số dư tương ứng của chúng đối với token này. Để truy cập
số dư, hãy sử dụng cú pháp này: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Biến này, `_allowances`, lưu trữ các hạn mức đã giải thích trước đó. Chỉ số đầu tiên là chủ sở hữu
của các token và chỉ số thứ hai là hợp đồng có hạn mức. Để truy cập số lượng địa chỉ A có thể
chi tiêu từ tài khoản của địa chỉ B, hãy sử dụng `_allowances[B][A]`.

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

Một mặt, Ethereum không có biến dấu phẩy động hoặc phân số. Mặt khác,
con người thích có thể chia nhỏ token. Một lý do khiến mọi người chọn vàng làm tiền tệ là vì
rất khó để trả lại tiền thừa khi ai đó muốn mua một con bò bằng giá trị của một con vịt.

Giải pháp là theo dõi các số nguyên, nhưng thay vì đếm token thực, hãy đếm một token phân số
gần như vô giá trị. Trong trường hợp của ether, token phân số được gọi là Wei và 10^18 Wei bằng một
ETH. Tại thời điểm viết bài, 10.000.000.000.000 Wei xấp xỉ một xu Mỹ hoặc Euro.

Các ứng dụng cần biết cách hiển thị số dư token. Nếu người dùng có 3.141.000.000.000.000.000 Wei, đó là
3,14 ETH? 31,41 ETH? 3.141 ETH? Trong trường hợp của ether, nó được định nghĩa là 10^18 Wei cho mỗi ETH, nhưng đối với
token của bạn, bạn có thể chọn một giá trị khác. Nếu việc chia nhỏ token không có ý nghĩa, bạn có thể sử dụng
giá trị `_decimals` bằng không. Nếu bạn muốn sử dụng cùng tiêu chuẩn với ETH, hãy sử dụng giá trị **18**.

### Hàm khởi tạo {#the-constructor}

```solidity
    /**
     * @dev Đặt các giá trị cho {name} và {symbol}, khởi tạo {decimals} với
     * một giá trị mặc định là 18.
     *
     * Để chọn một giá trị khác cho {decimals}, hãy sử dụng {_setupDecimals}.
     *
     * Cả ba giá trị này đều không thể thay đổi (immutable): chúng chỉ có thể được đặt một lần trong
     * quá trình khởi tạo.
     */
    constructor (string memory name_, string memory symbol_) public {
        // Trong Solidity ≥0.7.0, 'public' là ngầm định và có thể được bỏ qua.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Hàm khởi tạo được gọi khi hợp đồng được tạo lần đầu tiên. Theo quy ước, các tham số hàm được đặt tên là `<something>_`.

### Các hàm giao diện người dùng {#user-interface-functions}

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
     * @dev Trả về số lượng chữ số thập phân được sử dụng để có được biểu diễn người dùng của nó.
     * Ví dụ, nếu `decimals` bằng `2`, số dư `505` token nên
     * được hiển thị cho người dùng là `5,05` (`505 / 10 ** 2`).
     *
     * Các token thường chọn giá trị là 18, bắt chước mối quan hệ giữa
     * ether và Wei. Đây là giá trị mà {ERC20} sử dụng, trừ khi {_setupDecimals} được
     * gọi.
     *
     * LƯU Ý: Thông tin này chỉ được sử dụng cho mục đích _hiển thị_: nó hoàn toàn
     * không ảnh hưởng đến bất kỳ số học nào của hợp đồng, bao gồm
     * {IERC20-balanceOf} và {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Các hàm này, `name`, `symbol` và `decimals` giúp giao diện người dùng biết về hợp đồng của bạn để chúng có thể hiển thị nó một cách chính xác.

Kiểu trả về là `string memory`, nghĩa là trả về một chuỗi được lưu trữ trong bộ nhớ. Các biến, chẳng hạn như
chuỗi, có thể được lưu trữ ở ba vị trí:

|          | Vòng đời      | Quyền truy cập hợp đồng | Chi phí gas                                                    |
| -------- | ------------- | --------------- | -------------------------------------------------------------- |
| Bộ nhớ   | Lệnh gọi hàm | Đọc/Ghi      | Hàng chục hoặc hàng trăm (cao hơn đối với các vị trí cao hơn)                 |
| Dữ liệu lệnh gọi | Lệnh gọi hàm | Chỉ đọc       | Không thể được sử dụng làm kiểu trả về, chỉ là kiểu tham số hàm |
| Lưu trữ  | Cho đến khi thay đổi | Đọc/Ghi      | Cao (800 cho đọc, 20k cho ghi)                             |

Trong trường hợp này, `memory` là lựa chọn tốt nhất.

### Đọc thông tin token {#read-token-information}

Đây là các hàm cung cấp thông tin về token, có thể là tổng nguồn cung hoặc
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

Đọc số dư của một tài khoản. Lưu ý rằng bất kỳ ai cũng được phép lấy số dư tài khoản của bất kỳ ai khác.
Không có ích gì khi cố gắng che giấu thông tin này, vì dù sao nó cũng có sẵn trên mọi
nút. _Không có bí mật nào trên chuỗi khối._

### Chuyển token {#transfer-tokens}

```solidity
    /**
     * @dev Xem {IERC20-transfer}.
     *
     * Yêu cầu:
     *
     * - `recipient` không thể là địa chỉ zero.
     * - người gọi phải có số dư ít nhất là `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Hàm `transfer` được gọi để chuyển token từ tài khoản của người gửi sang một tài khoản khác. Lưu ý
rằng mặc dù nó trả về một giá trị boolean, giá trị đó luôn là **true**. Nếu việc chuyển
thất bại, hợp đồng sẽ hoàn nguyên lệnh gọi.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Hàm `_transfer` thực hiện công việc thực tế. Nó là một hàm riêng tư chỉ có thể được gọi bởi
các hàm hợp đồng khác. Theo quy ước, các hàm riêng tư được đặt tên là `_<something>`, giống như các biến
trạng thái.

Thông thường trong Solidity, chúng ta sử dụng `msg.sender` cho người gửi thông điệp. Tuy nhiên, điều đó làm hỏng
[OpenGSN](https://opengsn.org/). Nếu chúng ta muốn cho phép các giao dịch không cần ether với token của mình, chúng ta
cần sử dụng `_msgSender()`. Nó trả về `msg.sender` cho các giao dịch bình thường, nhưng đối với các giao dịch không cần ether
nó trả về người ký ban đầu chứ không phải hợp đồng đã chuyển tiếp thông điệp.

### Các hàm hạn mức {#allowance-functions}

Đây là các hàm triển khai chức năng hạn mức: `allowance`, `approve`, `transferFrom`
và `_approve`. Ngoài ra, bản triển khai OpenZeppelin vượt xa tiêu chuẩn cơ bản để bao gồm một số tính năng cải thiện
bảo mật: `increaseAllowance` và `decreaseAllowance`.

#### Hàm allowance {#allowance}

```solidity
    /**
     * @dev Xem {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Hàm `allowance` cho phép mọi người kiểm tra bất kỳ hạn mức nào.

#### Hàm approve {#approve}

```solidity
    /**
     * @dev Xem {IERC20-approve}.
     *
     * Yêu cầu:
     *
     * - `spender` không thể là địa chỉ zero.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Hàm này được gọi để tạo một hạn mức. Nó tương tự như hàm `transfer` ở trên:

- Hàm chỉ gọi một hàm nội bộ (trong trường hợp này là `_approve`) thực hiện công việc thực sự.
- Hàm trả về `true` (nếu thành công) hoặc hoàn nguyên (nếu không).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Chúng ta sử dụng các hàm nội bộ để giảm thiểu số lượng vị trí xảy ra thay đổi trạng thái. _Bất kỳ_ hàm nào làm thay đổi
trạng thái đều là một rủi ro bảo mật tiềm ẩn cần được kiểm toán bảo mật. Bằng cách này, chúng ta có ít cơ hội làm sai hơn.

#### Hàm transferFrom {#transferfrom}

Đây là hàm mà người chi tiêu gọi để chi tiêu một hạn mức. Điều này yêu cầu hai thao tác: chuyển số lượng
đang được chi tiêu và giảm hạn mức đi số lượng đó.

```solidity
    /**
     * @dev Xem {IERC20-transferFrom}.
     *
     * Phát ra một sự kiện {Approval} chỉ định hạn mức đã được cập nhật. Điều này không
     * được yêu cầu bởi EIP. Xem lưu ý ở phần đầu của {ERC20}.
     *
     * Yêu cầu:
     *
     * - `sender` và `recipient` không thể là địa chỉ zero.
     * - `sender` phải có số dư ít nhất là `amount`.
     * - người gọi phải có hạn mức cho các token của ``sender`` ít nhất là
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Lệnh gọi hàm `a.sub(b, "message")` thực hiện hai việc. Đầu tiên, nó tính toán `a-b`, đây là hạn mức mới.
Thứ hai, nó kiểm tra xem kết quả này có âm hay không. Nếu nó âm, lệnh gọi sẽ hoàn nguyên với thông điệp được cung cấp. Lưu ý rằng khi một lệnh gọi hoàn nguyên, bất kỳ quá trình xử lý nào được thực hiện trước đó trong lệnh gọi đó đều bị bỏ qua, vì vậy chúng ta không cần phải
hoàn tác `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Các bổ sung an toàn của OpenZeppelin {#openzeppelin-safety-additions}

Thật nguy hiểm khi đặt một hạn mức khác không thành một giá trị khác không khác,
bởi vì bạn chỉ kiểm soát thứ tự các giao dịch của riêng mình, không phải của bất kỳ ai khác. Hãy tưởng tượng bạn
có hai người dùng, Alice ngây thơ và Bill không trung thực. Alice muốn một số dịch vụ từ
Bill, mà cô ấy nghĩ là có giá năm token - vì vậy cô ấy cung cấp cho Bill một hạn mức là năm token.

Sau đó, một cái gì đó thay đổi và giá của Bill tăng lên mười token. Alice, người vẫn muốn dịch vụ,
gửi một giao dịch đặt hạn mức của Bill thành mười. Ngay khi Bill nhìn thấy giao dịch mới này
trong bể giao dịch, anh ta gửi một giao dịch chi tiêu năm token của Alice và có
giá gas cao hơn nhiều để nó sẽ được khai thác nhanh hơn. Bằng cách đó, Bill có thể chi tiêu năm token đầu tiên và sau đó,
khi hạn mức mới của Alice được khai thác, chi tiêu thêm mười token nữa với tổng giá là mười lăm token, nhiều hơn
mức Alice định ủy quyền. Kỹ thuật này được gọi là
[chạy trước](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Giao dịch của Alice | Nonce của Alice | Giao dịch của Bill              | Nonce của Bill | Hạn mức của Bill | Tổng thu nhập của Bill từ Alice |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

Để tránh vấn đề này, hai hàm này (`increaseAllowance` và `decreaseAllowance`) cho phép bạn
sửa đổi hạn mức theo một số lượng cụ thể. Vì vậy, nếu Bill đã chi tiêu năm token, anh ta sẽ chỉ
có thể chi tiêu thêm năm token nữa. Tùy thuộc vào thời gian, có hai cách điều này có thể hoạt động, cả hai
đều kết thúc với việc Bill chỉ nhận được mười token:

A:

| Giao dịch của Alice          | Nonce của Alice | Giao dịch của Bill             | Nonce của Bill | Hạn mức của Bill | Tổng thu nhập của Bill từ Alice |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B:

| Giao dịch của Alice          | Nonce của Alice | Giao dịch của Bill              | Nonce của Bill | Hạn mức của Bill | Tổng thu nhập của Bill từ Alice |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /**
     * @dev Tăng một cách nguyên tử hạn mức được cấp cho `spender` bởi người gọi.
     *
     * Đây là một giải pháp thay thế cho {approve} có thể được sử dụng như một biện pháp giảm thiểu cho
     * các vấn đề được mô tả trong {IERC20-approve}.
     *
     * Phát ra một sự kiện {Approval} chỉ định hạn mức đã được cập nhật.
     *
     * Yêu cầu:
     *
     * - `spender` không thể là địa chỉ zero.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Hàm `a.add(b)` là một phép cộng an toàn. Trong trường hợp khó xảy ra là `a`+`b`>=`2^256`, nó không bị vòng lại
theo cách mà phép cộng bình thường làm.

```solidity

    /**
     * @dev Giảm một cách nguyên tử hạn mức được cấp cho `spender` bởi người gọi.
     *
     * Đây là một giải pháp thay thế cho {approve} có thể được sử dụng như một biện pháp giảm thiểu cho
     * các vấn đề được mô tả trong {IERC20-approve}.
     *
     * Phát ra một sự kiện {Approval} chỉ định hạn mức đã được cập nhật.
     *
     * Yêu cầu:
     *
     * - `spender` không thể là địa chỉ zero.
     * - `spender` phải có hạn mức cho người gọi ít nhất là
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Các hàm sửa đổi thông tin token {#functions-that-modify-token-information}

Đây là bốn hàm thực hiện công việc thực tế: `_transfer`, `_mint`, `_burn` và `_approve`.

#### Hàm _transfer {#transfer}

```solidity
    /**
     * @dev Chuyển `amount` token từ `sender` đến `recipient`.
     *
     * Hàm nội bộ này tương đương với {transfer}, và có thể được sử dụng để
     * ví dụ: triển khai phí token tự động, cơ chế cắt giảm (slashing), v.v.
     *
     * Phát ra một sự kiện {Transfer}.
     *
     * Yêu cầu:
     *
     * - `sender` không thể là địa chỉ zero.
     * - `recipient` không thể là địa chỉ zero.
     * - `sender` phải có số dư ít nhất là `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Hàm này, `_transfer`, chuyển token từ tài khoản này sang tài khoản khác. Nó được gọi bởi cả
`transfer` (đối với các khoản chuyển từ tài khoản của chính người gửi) và `transferFrom` (để sử dụng hạn mức
để chuyển từ tài khoản của người khác).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Không ai thực sự sở hữu địa chỉ zero trong Ethereum (nghĩa là không ai biết khóa riêng tư có khóa công khai khớp
được chuyển đổi thành địa chỉ zero). Khi mọi người sử dụng địa chỉ đó, nó thường là một lỗi phần mềm - vì vậy chúng ta
sẽ thất bại nếu địa chỉ zero được sử dụng làm người gửi hoặc người nhận.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Có hai cách để sử dụng hợp đồng này:

1. Sử dụng nó làm mẫu cho mã của riêng bạn
1. [Kế thừa từ nó](https://www.bitdegree.org/learn/solidity-inheritance) và chỉ ghi đè những hàm mà bạn cần sửa đổi

Phương pháp thứ hai tốt hơn nhiều vì mã ERC-20 của OpenZeppelin đã được kiểm toán và cho thấy là an toàn. Khi bạn sử dụng tính kế thừa
rõ ràng là bạn sửa đổi những hàm nào và để tin tưởng hợp đồng của bạn, mọi người chỉ cần kiểm toán những hàm cụ thể đó.

Thường rất hữu ích khi thực hiện một hàm mỗi khi token đổi chủ. Tuy nhiên, `_transfer` là một hàm rất quan trọng và có thể
viết nó một cách không an toàn (xem bên dưới), vì vậy tốt nhất là không nên ghi đè nó. Giải pháp là `_beforeTokenTransfer`, một
[hàm hook](https://wikipedia.org/wiki/Hooking). Bạn có thể ghi đè hàm này và nó sẽ được gọi trên mỗi lần chuyển.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Đây là những dòng thực sự thực hiện việc chuyển. Lưu ý rằng **không có gì** ở giữa chúng và chúng ta trừ
số lượng đã chuyển khỏi người gửi trước khi thêm nó vào người nhận. Điều này rất quan trọng vì nếu có một
lệnh gọi đến một hợp đồng khác ở giữa, nó có thể đã được sử dụng để gian lận hợp đồng này. Bằng cách này, việc chuyển
là nguyên tử, không có gì có thể xảy ra ở giữa nó.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Cuối cùng, phát ra một sự kiện `Transfer`. Các hợp đồng thông minh không thể truy cập các sự kiện, nhưng mã chạy bên ngoài chuỗi khối
có thể lắng nghe các sự kiện và phản ứng với chúng. Ví dụ, một ví có thể theo dõi khi chủ sở hữu nhận được nhiều token hơn.

#### Các hàm _mint và _burn {#mint-and-burn}

Hai hàm này (`_mint` và `_burn`) sửa đổi tổng nguồn cung token.
Chúng là nội bộ và không có hàm nào gọi chúng trong hợp đồng này,
vì vậy chúng chỉ hữu ích nếu bạn kế thừa từ hợp đồng và thêm
logic của riêng bạn để quyết định trong những điều kiện nào sẽ đúc token mới hoặc đốt những token
hiện có.

**LƯU Ý:** Mỗi token ERC-20 có logic nghiệp vụ riêng quy định việc quản lý token.
Ví dụ, một hợp đồng nguồn cung cố định có thể chỉ gọi `_mint`
trong hàm khởi tạo và không bao giờ gọi `_burn`. Một hợp đồng bán token
sẽ gọi `_mint` khi nó được thanh toán và có lẽ sẽ gọi `_burn` vào một thời điểm nào đó
để tránh lạm phát phi mã.

```solidity
    /** @dev Tạo ra `amount` token và gán chúng cho `account`, làm tăng
     * tổng nguồn cung.
     *
     * Phát ra một sự kiện {Transfer} với `from` được đặt thành địa chỉ zero.
     *
     * Yêu cầu:
     *
     * - `to` không thể là địa chỉ zero.
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
     * @dev Tiêu hủy `amount` token từ `account`, làm giảm
     * tổng nguồn cung.
     *
     * Phát ra một sự kiện {Transfer} với `to` được đặt thành địa chỉ zero.
     *
     * Yêu cầu:
     *
     * - `account` không thể là địa chỉ zero.
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

Hàm `_burn` gần như giống hệt với `_mint`, ngoại trừ việc nó đi theo hướng ngược lại.

#### Hàm _approve {#approve-2}

Đây là hàm thực sự chỉ định các hạn mức. Lưu ý rằng nó cho phép chủ sở hữu chỉ định
một hạn mức cao hơn số dư hiện tại của chủ sở hữu. Điều này là ổn vì số dư được
kiểm tra tại thời điểm chuyển, khi nó có thể khác với số dư khi hạn mức được
tạo.

```solidity
    /**
     * @dev Đặt `amount` làm hạn mức của `spender` đối với các token của `owner`.
     *
     * Hàm nội bộ này tương đương với `approve`, và có thể được sử dụng để
     * ví dụ: đặt các hạn mức tự động cho một số hệ thống con nhất định, v.v.
     *
     * Phát ra một sự kiện {Approval}.
     *
     * Yêu cầu:
     *
     * - `owner` không thể là địa chỉ zero.
     * - `spender` không thể là địa chỉ zero.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Phát ra một sự kiện `Approval`. Tùy thuộc vào cách ứng dụng được viết, hợp đồng người chi tiêu có thể được thông báo về
sự chấp thuận bởi chủ sở hữu hoặc bởi một máy chủ lắng nghe các sự kiện này.

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
     * {decimals} bị thay đổi, và có thể hoạt động không chính xác nếu điều đó xảy ra.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Hàm này sửa đổi biến `_decimals` được sử dụng để cho giao diện người dùng biết cách diễn giải số lượng.
Bạn nên gọi nó từ hàm khởi tạo. Sẽ là không trung thực nếu gọi nó ở bất kỳ thời điểm nào sau đó và các ứng dụng
không được thiết kế để xử lý nó.

### Hooks {#hooks}

```solidity

    /**
     * @dev Hook được gọi trước bất kỳ việc chuyển token nào. Điều này bao gồm
     * việc đúc (minting) và đốt (burning).
     *
     * Điều kiện gọi:
     *
     * - khi `from` và `to` đều khác zero, `amount` token của ``from``
     * sẽ được chuyển đến `to`.
     * - khi `from` là zero, `amount` token sẽ được đúc cho `to`.
     * - khi `to` là zero, `amount` token của ``from`` sẽ bị đốt.
     * - `from` và `to` không bao giờ đồng thời là zero.
     *
     * Để tìm hiểu thêm về các hook, hãy truy cập xref:ROOT:extending-contracts.adoc#using-hooks[Sử dụng Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Đây là hàm hook được gọi trong quá trình chuyển. Nó trống ở đây, nhưng nếu bạn cần
nó làm điều gì đó, bạn chỉ cần ghi đè nó.

## Kết luận {#conclusion}

Để ôn lại, đây là một số ý tưởng quan trọng nhất trong hợp đồng này (theo ý kiến của tôi, ý kiến của bạn có thể khác):

- _Không có bí mật nào trên chuỗi khối_. Bất kỳ thông tin nào mà một hợp đồng thông minh có thể truy cập
  đều có sẵn cho toàn thế giới.
- Bạn có thể kiểm soát thứ tự các giao dịch của riêng mình, nhưng không phải khi giao dịch của người khác
  xảy ra. Đây là lý do tại sao việc thay đổi một hạn mức có thể nguy hiểm, bởi vì nó cho phép
  người chi tiêu chi tiêu tổng của cả hai hạn mức.
- Các giá trị của kiểu `uint256` bị vòng lại. Nói cách khác, _0-1=2^256-1_. Nếu đó không phải là hành vi
  mong muốn, bạn phải kiểm tra nó (hoặc sử dụng thư viện SafeMath để làm điều đó cho bạn). Lưu ý rằng điều này đã thay đổi trong
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Thực hiện tất cả các thay đổi trạng thái của một loại cụ thể ở một nơi cụ thể, vì nó giúp việc kiểm toán dễ dàng hơn.
  Đây là lý do mà chúng ta có, ví dụ, `_approve`, được gọi bởi `approve`, `transferFrom`,
  `increaseAllowance` và `decreaseAllowance`
- Các thay đổi trạng thái phải là nguyên tử, không có bất kỳ hành động nào khác ở giữa chúng (như bạn có thể thấy
  trong `_transfer`). Điều này là do trong quá trình thay đổi trạng thái, bạn có một trạng thái không nhất quán. Ví dụ,
  giữa thời điểm bạn trừ vào số dư của người gửi và thời điểm bạn cộng vào số dư của
  người nhận, có ít token tồn tại hơn mức bình thường. Điều này có khả năng bị lạm dụng nếu có
  các hoạt động giữa chúng, đặc biệt là các lệnh gọi đến một hợp đồng khác.

Bây giờ bạn đã thấy cách hợp đồng ERC-20 của OpenZeppelin được viết và đặc biệt là cách nó được
làm cho an toàn hơn, hãy đi và viết các hợp đồng và ứng dụng an toàn của riêng bạn.

[Xem tại đây để biết thêm về công việc của tôi](https://cryptodocguy.pro/).