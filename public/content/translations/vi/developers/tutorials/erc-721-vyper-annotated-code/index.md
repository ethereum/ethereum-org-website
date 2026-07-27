---
title: "Hướng dẫn chi tiết hợp đồng ERC-721 bằng Vyper"
description: "Hợp đồng ERC-721 của Ryuya Nakamura và cách thức hoạt động"
author: Ori Pomerantz
lang: vi
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: Vyper ERC-721
published: 2021-04-01
---

## Giới thiệu {#introduction}

Tiêu chuẩn [ERC-721](/developers/docs/standards/tokens/erc-721/) được sử dụng để nắm giữ quyền sở hữu của Token không thể thay thế (NFT).
Các token [ERC-20](/developers/docs/standards/tokens/erc-20/) hoạt động như một loại hàng hóa, bởi vì không có sự khác biệt giữa các token riêng lẻ.
Ngược lại, các token ERC-721 được thiết kế cho các tài sản tương tự nhưng không giống hệt nhau, chẳng hạn như các [phim hoạt hình về mèo](https://www.cryptokitties.co/) khác nhau hoặc quyền sở hữu đối với các bất động sản khác nhau.

Trong bài viết này, chúng ta sẽ phân tích [hợp đồng ERC-721 của Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Hợp đồng này được viết bằng [Vyper](https://vyper.readthedocs.io/en/latest/index.html), một ngôn ngữ hợp đồng giống Python được thiết kế để làm cho việc viết mã không an toàn trở nên khó khăn hơn so với Solidity.

## Hợp đồng {#contract}

```python
# @dev Triển khai tiêu chuẩn token không thể thay thế ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Được sửa đổi từ: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Các chú thích trong Vyper, cũng giống như trong Python, bắt đầu bằng một dấu thăng (`ethereum.ercs`) và kéo dài đến cuối dòng. Các chú thích bao gồm `@<keyword>` được [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) sử dụng để tạo ra tài liệu mà con người có thể đọc được.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Giao diện ERC-721 được tích hợp sẵn trong ngôn ngữ Vyper.
[Bạn có thể xem định nghĩa mã tại đây](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Định nghĩa giao diện được viết bằng Python, thay vì Vyper, bởi vì các giao diện không chỉ được sử dụng bên trong Chuỗi khối, mà còn khi gửi một giao dịch đến Chuỗi khối từ một máy khách bên ngoài, vốn có thể được viết bằng Python.

Dòng đầu tiên nhập giao diện và dòng thứ hai chỉ định rằng chúng ta đang triển khai nó ở đây.

```python
#pragma version >0.3.10
```

```python
#pragma version >0.3.10
```
### Giao diện ERC721Receiver

```python
# Giao diện cho hợp đồng được gọi bởi safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 hỗ trợ hai loại chuyển:

- `transferFrom`, cho phép người gửi chỉ định bất kỳ địa chỉ đích nào và đặt trách nhiệm cho việc chuyển lên người gửi. Điều này có nghĩa là bạn có thể chuyển đến một địa chỉ không hợp lệ, trong trường hợp đó NFT sẽ bị mất vĩnh viễn.
- `safeTransferFrom`, kiểm tra xem địa chỉ đích có phải là một hợp đồng hay không. Nếu đúng, hợp đồng ERC-721 sẽ hỏi hợp đồng nhận xem nó có muốn nhận NFT hay không.

Để trả lời các yêu cầu `safeTransferFrom`, một hợp đồng nhận phải triển khai `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Địa chỉ `_from` là chủ sở hữu hiện tại của token. Địa chỉ `_operator` là địa chỉ đã yêu cầu chuyển (hai địa chỉ này có thể không giống nhau, do các hạn mức). Theo quy ước, hầu hết các tham số hàm trong hợp đồng này bắt đầu bằng một dấu gạch dưới (`_`).

```python
            _tokenId: uint256,
```

ID token ERC-721 là 256 bit. Thông thường, chúng được tạo ra bằng quá trình băm một mô tả về bất cứ thứ gì mà token đại diện.

```python
            _data: Bytes[1024]
```

Yêu cầu có thể có tối đa 1024 byte dữ liệu người dùng.

```python
        ) -> bytes4: nonpayable
```

Để ngăn chặn các trường hợp trong đó một hợp đồng vô tình chấp nhận một khoản chuyển, giá trị trả về không phải là một boolean, mà là một giá trị bốn byte cụ thể, bộ chọn hàm của `onERC721Received`. Hàm này là `nonpayable` bởi vì một hợp đồng nhận có thể thay đổi trạng thái của chính nó khi nó chấp nhận một token.
### Các sự kiện

[Các sự kiện](/developers/docs/smart-contracts/anatomy/#events-and-logs)
được phát ra để thông báo cho người dùng và máy chủ bên ngoài Chuỗi khối về các sự kiện. Lưu ý rằng nội dung của các sự kiện không có sẵn cho các hợp đồng trên Chuỗi khối. Ba sự kiện ERC-721 được định nghĩa bởi giao diện `IERC721` mà chúng ta đã nhập, vì vậy hợp đồng này không tự khai báo chúng; nó phát ra chúng bằng `log IERC721.<Event>(...)`, như chúng ta sẽ thấy trong các hàm chuyển bên dưới.

`Transfer` (`sender`, `receiver`, `token_id`) báo cáo sự thay đổi về quyền sở hữu của một NFT. Điều này tương tự như sự kiện Transfer của ERC-20, ngoại trừ việc chúng ta báo cáo một `token_id` thay vì một số lượng. Không ai sở hữu địa chỉ zero, vì vậy theo quy ước, chúng ta sử dụng nó để báo cáo việc tạo và tiêu hủy các token. Một ngoại lệ là việc tạo hợp đồng, trong đó bất kỳ số lượng NFT nào cũng có thể được tạo và gán mà không phát ra `Transfer`.

Một phê duyệt ERC-721 tương tự như một hạn mức ERC-20: một địa chỉ cụ thể được phép chuyển một token cụ thể, và `Approval` (`owner`, `approved`, `token_id`) được phát ra bất cứ khi nào địa chỉ được phê duyệt đó được thiết lập hoặc xác nhận lại. Điều này cung cấp một cơ chế để các hợp đồng phản hồi khi chúng chấp nhận một token. Các hợp đồng không thể lắng nghe các sự kiện, vì vậy nếu bạn chỉ chuyển token cho chúng, chúng sẽ không "biết" về điều đó. Bằng cách này, chủ sở hữu trước tiên gửi một phê duyệt và sau đó gửi một yêu cầu đến hợp đồng: "Tôi đã phê duyệt cho bạn chuyển token X, vui lòng thực hiện ...". Đây là một lựa chọn thiết kế để làm cho tiêu chuẩn ERC-721 tương tự như tiêu chuẩn ERC-20. Bởi vì các token ERC-721 không thể thay thế, một hợp đồng cũng có thể xác định rằng nó đã nhận được một token cụ thể bằng cách xem xét quyền sở hữu của token đó.

Cuối cùng, `ApprovalForAll` (`owner`, `operator`, `approved`) được phát ra khi một _người điều hành_ (operator) được bật hoặc tắt cho một chủ sở hữu. Đôi khi sẽ hữu ích nếu có một người điều hành có thể quản lý tất cả các token của một tài khoản thuộc một loại cụ thể (những token được quản lý bởi một hợp đồng cụ thể), tương tự như giấy ủy quyền. Ví dụ: tôi có thể muốn trao quyền như vậy cho một hợp đồng kiểm tra xem tôi có liên lạc với nó trong sáu tháng hay không, và nếu không, nó sẽ phân phối tài sản của tôi cho những người thừa kế của tôi (nếu một trong số họ yêu cầu, các hợp đồng không thể làm gì nếu không được gọi bởi một giao dịch). Trong ERC-20, chúng ta có thể chỉ cần cấp một hạn mức cao cho một hợp đồng thừa kế, nhưng điều đó không hoạt động đối với ERC-721 vì các token không thể thay thế. Đây là điều tương đương. Giá trị `approved` cho chúng ta biết liệu sự kiện là dành cho một phê duyệt, hay việc rút lại một phê duyệt.
### Các biến trạng thái

Các biến này chứa trạng thái hiện tại của các token: token nào có sẵn và ai sở hữu chúng. Hầu hết trong số này là các đối tượng `HashMap`, [các ánh xạ một chiều tồn tại giữa hai kiểu dữ liệu](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Ánh xạ từ ID NFT sang địa chỉ sở hữu nó.
idToOwner: HashMap[uint256, address]

# @dev Ánh xạ từ ID NFT sang địa chỉ được phê duyệt.
idToApprovals: HashMap[uint256, address]
```

Danh tính người dùng và hợp đồng trong Ethereum được đại diện bởi các địa chỉ 160 bit. Hai biến này ánh xạ từ các ID token sang chủ sở hữu của chúng và những người được phê duyệt để chuyển chúng (tối đa một người cho mỗi token). Trong Ethereum, dữ liệu chưa được khởi tạo luôn bằng không, vì vậy nếu không có chủ sở hữu hoặc người chuyển được phê duyệt, giá trị cho token đó là không.

```python
# @dev Ánh xạ từ địa chỉ chủ sở hữu sang số lượng token của họ.
ownerToNFTokenCount: HashMap[address, uint256]
```

Biến này giữ số lượng token cho mỗi chủ sở hữu. Không có ánh xạ từ chủ sở hữu sang token, vì vậy cách duy nhất để xác định các token mà một chủ sở hữu cụ thể sở hữu là nhìn lại lịch sử sự kiện của Chuỗi khối và xem các sự kiện `Transfer` thích hợp. Chúng ta có thể sử dụng biến này để biết khi nào chúng ta có tất cả các NFT và không cần phải tìm kiếm xa hơn trong quá khứ.

Lưu ý rằng thuật toán này chỉ hoạt động cho các giao diện người dùng và máy chủ bên ngoài. Mã chạy trên chính Chuỗi khối không thể đọc các sự kiện trong quá khứ.

```python
# @dev Ánh xạ từ địa chỉ chủ sở hữu sang ánh xạ của các địa chỉ người điều hành.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Một tài khoản có thể có nhiều hơn một người điều hành. Một `HashMap` đơn giản là không đủ để theo dõi chúng, bởi vì mỗi khóa dẫn đến một giá trị duy nhất. Thay vào đó, bạn có thể sử dụng `HashMap[address, bool]` làm giá trị. Theo mặc định, giá trị cho mỗi địa chỉ là `False`, có nghĩa là nó không phải là một người điều hành. Bạn có thể thiết lập các giá trị thành `True` khi cần.

```python
# @dev Địa chỉ của người đúc, người có thể đúc một token
minter: address
```

Các token mới phải được tạo ra bằng cách nào đó. Trong hợp đồng này, có một thực thể duy nhất được phép làm như vậy, đó là `minter` (người đúc). Điều này có thể là đủ cho một trò chơi, chẳng hạn. Đối với các mục đích khác, có thể cần phải tạo ra một logic nghiệp vụ phức tạp hơn.

```python
# @dev Danh sách tĩnh các ID giao diện ERC165 được hỗ trợ
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ID giao diện ERC165 của ERC165
    0x01ffc9a7,
    # ID giao diện ERC165 của ERC721
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) chỉ định một cơ chế để một hợp đồng tiết lộ cách các ứng dụng có thể giao tiếp với nó, nó tuân thủ các ERC nào. `SUPPORTED_INTERFACES` là một danh sách hằng số gồm hai ID giao diện bốn byte mà hợp đồng này tuân thủ: chính ERC-165 và ERC-721.
### Các hàm {#functions}

Đây là các hàm thực sự triển khai ERC-721.

#### Hàm khởi tạo

```python
@deploy
def __init__():
```

Trong Vyper, cũng giống như trong Python, hàm khởi tạo được gọi là `__init__`. Nó được đánh dấu bằng decorator `@deploy`, có nghĩa là nó chạy một lần, khi hợp đồng được triển khai.

```python
    """
    @dev Hàm khởi tạo hợp đồng.
    """
```

Trong Python và trong Vyper, bạn cũng có thể tạo một chú thích bằng cách chỉ định một chuỗi nhiều dòng (bắt đầu và kết thúc bằng `"""`), và không sử dụng nó theo bất kỳ cách nào. Các chú thích này cũng có thể bao gồm [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.minter = msg.sender
```

Để truy cập các biến trạng thái, bạn sử dụng `self.<tên biến>` (một lần nữa, giống như trong Python). Hàm khởi tạo ghi lại tài khoản đã triển khai hợp đồng là `minter`.
#### Các hàm View

Đây là các hàm không sửa đổi trạng thái của Chuỗi khối, và do đó có thể được thực thi miễn phí nếu chúng được gọi từ bên ngoài. Nếu các hàm view được gọi bởi một hợp đồng, chúng vẫn phải được thực thi trên mọi nút và do đó tốn Gas.

```python
@view
@external
```

Các từ khóa này trước một định nghĩa hàm bắt đầu bằng ký hiệu a còng (`@`) được gọi là _decorations_ (trình trang trí). Chúng chỉ định các trường hợp mà một hàm có thể được gọi.

- `@view` chỉ định rằng hàm này là một view.
- `@external` chỉ định rằng hàm cụ thể này có thể được gọi bởi các giao dịch và bởi các hợp đồng khác.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

Ngược lại với Python, Vyper là một [ngôn ngữ định kiểu tĩnh](https://wikipedia.org/wiki/Type_system#Static_type_checking). Bạn không thể khai báo một biến, hoặc một tham số hàm, mà không xác định [kiểu dữ liệu](https://vyper.readthedocs.io/en/latest/types.html). Trong trường hợp này, tham số đầu vào là `bytes4`, một giá trị bốn byte, và đầu ra là một giá trị boolean.

```python
    """
    @dev Việc nhận dạng giao diện được chỉ định trong ERC-165.
    @param interface_id Id của giao diện
    """
    return interface_id in SUPPORTED_INTERFACES
```

Trả về `True` nếu `interface_id` là một trong các ID giao diện trong danh sách `SUPPORTED_INTERFACES`.

```python
### CÁC HÀM VIEW ###
```

Đây là các hàm view làm cho thông tin về các token có sẵn cho người dùng và các hợp đồng khác.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Trả về số lượng NFT thuộc sở hữu của '_owner'.
         Ném lỗi nếu '_owner' là địa chỉ zero. Các NFT được gán cho địa chỉ zero được coi là không hợp lệ.
    @param _owner Địa chỉ để truy vấn số dư.
    """
    assert _owner != empty(address)
```

Dòng này [khẳng định](https://vyper.readthedocs.io/en/latest/statements.html#assert) rằng `_owner` không phải là địa chỉ zero, được viết là `empty(address)`. Nếu đúng như vậy, sẽ có lỗi và thao tác bị hoàn nguyên.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Trả về địa chỉ của chủ sở hữu NFT.
         Ném lỗi nếu '_tokenId' không phải là một NFT hợp lệ.
    @param _tokenId Định danh cho một NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Ném lỗi nếu '_tokenId' không phải là một NFT hợp lệ
    assert owner != empty(address)
    return owner
```

Trong Máy ảo Ethereum (EVM), bất kỳ bộ nhớ nào không có giá trị được lưu trữ trong đó đều bằng không. Nếu không có token tại `_tokenId` thì giá trị của `self.idToOwner[_tokenId]` là không. Trong trường hợp đó, hàm sẽ hoàn nguyên.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Lấy địa chỉ được phê duyệt cho một NFT duy nhất.
         Ném lỗi nếu '_tokenId' không phải là một NFT hợp lệ.
    @param _tokenId ID của NFT để truy vấn phê duyệt.
    """
    # Ném lỗi nếu '_tokenId' không phải là một NFT hợp lệ
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

Lưu ý rằng `getApproved` _có thể_ trả về không. Nếu token hợp lệ, nó trả về `self.idToApprovals[_tokenId]`. Nếu không có người phê duyệt, giá trị đó là không.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Kiểm tra xem '_operator' có phải là người điều hành được phê duyệt cho '_owner' hay không.
    @param _owner Địa chỉ sở hữu các NFT.
    @param _operator Địa chỉ hành động thay mặt cho chủ sở hữu.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Hàm này kiểm tra xem `_operator` có được phép quản lý tất cả các token của `_owner` trong hợp đồng này hay không. Bởi vì có thể có nhiều người điều hành, đây là một HashMap hai cấp.
#### Các hàm trợ giúp chuyển

Các hàm này triển khai các thao tác là một phần của việc chuyển hoặc quản lý các token.

```python

### CÁC HÀM TRỢ GIÚP CHUYỂN ###

@view
@internal
```

Trình trang trí này, `@internal`, có nghĩa là hàm chỉ có thể truy cập được từ các hàm khác trong cùng một hợp đồng. Theo quy ước, tên của các hàm này cũng bắt đầu bằng một dấu gạch dưới (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Trả về liệu người chi tiêu đã cho có thể chuyển một ID token đã cho hay không
    @param spender địa chỉ của người chi tiêu để truy vấn
    @param tokenId uint256 ID của token sẽ được chuyển
    @return bool liệu msg.sender có được phê duyệt cho ID token đã cho,
        là một người điều hành của chủ sở hữu, hoặc là chủ sở hữu của token hay không
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Có ba cách để một địa chỉ có thể được phép chuyển một token:

1. Địa chỉ là chủ sở hữu của token
2. Địa chỉ được phê duyệt để chi tiêu token đó
3. Địa chỉ là một người điều hành cho chủ sở hữu của token

Hàm trên có thể là một view bởi vì nó không thay đổi trạng thái. Để giảm chi phí hoạt động, bất kỳ hàm nào _có thể_ là một view thì _nên_ là một view.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Thêm một NFT vào một địa chỉ đã cho
         Ném lỗi nếu '_tokenId' thuộc sở hữu của ai đó.
    """
    # Ném lỗi nếu '_tokenId' thuộc sở hữu của ai đó
    assert self.idToOwner[_tokenId] == empty(address)
    # Thay đổi chủ sở hữu
    self.idToOwner[_tokenId] = _to
    # Thay đổi theo dõi số lượng
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Xóa một NFT khỏi một địa chỉ đã cho
         Ném lỗi nếu '_from' không phải là chủ sở hữu hiện tại.
    """
    # Ném lỗi nếu '_from' không phải là chủ sở hữu hiện tại
    assert self.idToOwner[_tokenId] == _from
    # Thay đổi chủ sở hữu
    self.idToOwner[_tokenId] = empty(address)
    # Thay đổi theo dõi số lượng
    self.ownerToNFTokenCount[_from] -= 1
```

Khi có vấn đề với một khoản chuyển, chúng ta hoàn nguyên lệnh gọi.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Xóa một phê duyệt của một địa chỉ đã cho
         Ném lỗi nếu '_owner' không phải là chủ sở hữu hiện tại.
    """
    # Ném lỗi nếu '_owner' không phải là chủ sở hữu hiện tại
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # Đặt lại các phê duyệt
        self.idToApprovals[_tokenId] = empty(address)
```

Chỉ thay đổi giá trị nếu cần thiết. Các biến trạng thái nằm trong bộ nhớ. Ghi vào bộ nhớ là một trong những thao tác đắt đỏ nhất mà EVM (Máy ảo Ethereum) thực hiện (về mặt [Gas](/developers/docs/gas/)). Do đó, tốt nhất là nên giảm thiểu nó, ngay cả việc ghi lại giá trị hiện có cũng có chi phí cao.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Thực thi việc chuyển một NFT.
         Ném lỗi trừ khi 'msg.sender' là chủ sở hữu hiện tại, một người điều hành được ủy quyền, hoặc địa chỉ
         được phê duyệt cho NFT này. (LƯU Ý: 'msg.sender' không được phép trong hàm private nên truyền '_sender'.)
         Ném lỗi nếu '_to' là địa chỉ zero.
         Ném lỗi nếu '_from' không phải là chủ sở hữu hiện tại.
         Ném lỗi nếu '_tokenId' không phải là một NFT hợp lệ.
    """
```

Chúng ta có hàm nội bộ này bởi vì có hai cách để chuyển các token (thông thường và an toàn), nhưng chúng ta chỉ muốn có một vị trí duy nhất trong mã nơi chúng ta thực hiện điều đó để làm cho việc kiểm toán dễ dàng hơn.

```python
    # Kiểm tra các yêu cầu
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Ném lỗi nếu '_to' là địa chỉ zero
    assert _to != empty(address)
    # Xóa phê duyệt. Ném lỗi nếu '_from' không phải là chủ sở hữu hiện tại
    self._clearApproval(_from, _tokenId)
    # Xóa NFT. Ném lỗi nếu '_tokenId' không phải là một NFT hợp lệ
    self._removeTokenFrom(_from, _tokenId)
    # Thêm NFT
    self._addTokenTo(_to, _tokenId)
    # Ghi nhật ký khoản chuyển
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

Để phát ra một sự kiện trong Vyper, bạn sử dụng một câu lệnh `log` ([xem tại đây để biết thêm chi tiết](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)). Bởi vì các sự kiện thuộc về giao diện đã nhập, chúng ta gọi chúng là `IERC721.Transfer` và truyền các trường của chúng bằng từ khóa.
#### Các hàm chuyển

```python

### CÁC HÀM CHUYỂN ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Ném lỗi trừ khi 'msg.sender' là chủ sở hữu hiện tại, một người điều hành được ủy quyền, hoặc địa chỉ
         được phê duyệt cho NFT này.
         Ném lỗi nếu '_from' không phải là chủ sở hữu hiện tại.
         Ném lỗi nếu '_to' là địa chỉ zero.
         Ném lỗi nếu '_tokenId' không phải là một NFT hợp lệ.
    @notice Người gọi có trách nhiệm xác nhận rằng '_to' có khả năng nhận các NFT, nếu không
            chúng có thể bị mất vĩnh viễn.
    @param _from Chủ sở hữu hiện tại của NFT.
    @param _to Chủ sở hữu mới.
    @param _tokenId NFT sẽ được chuyển.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Hàm này cho phép bạn chuyển đến một địa chỉ tùy ý. Trừ khi địa chỉ đó là một người dùng, hoặc một hợp đồng biết cách chuyển các token, bất kỳ token nào bạn chuyển sẽ bị kẹt ở địa chỉ đó và trở nên vô dụng.

Trình trang trí `@payable` ở đây bởi vì giao diện `IERC721` khai báo `transferFrom`, `safeTransferFrom`, và `approve` là payable, vì vậy một hợp đồng triển khai giao diện phải khớp với các chữ ký đó.

```python
@external
@payable
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Chuyển quyền sở hữu của một NFT từ một địa chỉ sang một địa chỉ khác.
         Ném lỗi trừ khi 'msg.sender' là chủ sở hữu hiện tại, một người điều hành được ủy quyền, hoặc
         địa chỉ được phê duyệt cho NFT này.
         Ném lỗi nếu '_from' không phải là chủ sở hữu hiện tại.
         Ném lỗi nếu '_to' là địa chỉ zero.
         Ném lỗi nếu '_tokenId' không phải là một NFT hợp lệ.
         Nếu '_to' là một hợp đồng thông minh, nó gọi 'onERC721Received' trên '_to' và ném lỗi nếu
         giá trị trả về không phải là 'bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))'.
    @param _from Chủ sở hữu hiện tại của NFT.
    @param _to Chủ sở hữu mới.
    @param _tokenId NFT sẽ được chuyển.
    @param _data Dữ liệu bổ sung không có định dạng được chỉ định, được gửi trong lệnh gọi đến '_to'.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Việc thực hiện chuyển trước là hoàn toàn ổn bởi vì nếu có vấn đề, chúng ta sẽ hoàn nguyên, vì vậy mọi thứ được thực hiện trong lệnh gọi sẽ bị hủy bỏ.

```python
    if _to.is_contract: # kiểm tra xem '_to' có phải là một địa chỉ hợp đồng hay không
```

Đầu tiên, hãy kiểm tra xem địa chỉ có phải là một hợp đồng hay không (nếu nó có mã). Nếu không, hãy giả định đó là một địa chỉ người dùng và người dùng sẽ có thể sử dụng token hoặc chuyển nó. Nhưng đừng để điều đó ru ngủ bạn vào một cảm giác an toàn giả tạo. Bạn có thể mất các token, ngay cả với `safeTransferFrom`, nếu bạn chuyển chúng đến một địa chỉ mà không ai biết khóa riêng tư.

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Gọi hợp đồng mục tiêu để xem liệu nó có thể nhận các token ERC-721 hay không. Vyper 0.4 yêu cầu các lệnh gọi đến các hợp đồng khác phải được đánh dấu, vì vậy lệnh gọi được bắt đầu bằng `extcall`.

```python
        # Ném lỗi nếu đích chuyển là một hợp đồng không triển khai 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

Nếu đích đến là một hợp đồng, nhưng là một hợp đồng không chấp nhận các token ERC-721 (hoặc đã quyết định không chấp nhận khoản chuyển cụ thể này), hãy hoàn nguyên.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Thiết lập hoặc xác nhận lại địa chỉ được phê duyệt cho một NFT. Địa chỉ zero chỉ ra rằng không có địa chỉ được phê duyệt.
         Ném lỗi trừ khi 'msg.sender' là chủ sở hữu NFT hiện tại, hoặc một người điều hành được ủy quyền của chủ sở hữu hiện tại.
         Ném lỗi nếu '_tokenId' không phải là một NFT hợp lệ. (LƯU Ý: Điều này không được viết trong EIP)
         Ném lỗi nếu '_approved' là chủ sở hữu hiện tại. (LƯU Ý: Điều này không được viết trong EIP)
    @param _approved Địa chỉ sẽ được phê duyệt cho ID NFT đã cho.
    @param _tokenId ID của token sẽ được phê duyệt.
    """
    owner: address = self.idToOwner[_tokenId]
    # Ném lỗi nếu '_tokenId' không phải là một NFT hợp lệ
    assert owner != empty(address)
    # Ném lỗi nếu '_approved' là chủ sở hữu hiện tại
    assert _approved != owner
```

Theo quy ước, nếu bạn không muốn có người phê duyệt, bạn chỉ định địa chỉ zero, chứ không phải chính bạn.

```python
    # Kiểm tra các yêu cầu
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Để thiết lập một phê duyệt, bạn có thể là chủ sở hữu, hoặc một người điều hành được chủ sở hữu ủy quyền.

```python
    # Thiết lập phê duyệt
    self.idToApprovals[_tokenId] = _approved
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Bật hoặc tắt phê duyệt cho một bên thứ ba ("người điều hành") để quản lý tất cả
         tài sản của 'msg.sender'. Nó cũng phát ra sự kiện ApprovalForAll.
         Ném lỗi nếu '_operator' là 'msg.sender'. (LƯU Ý: Điều này không được viết trong EIP)
    @notice Điều này hoạt động ngay cả khi người gửi không sở hữu bất kỳ token nào vào thời điểm đó.
    @param _operator Địa chỉ để thêm vào tập hợp các người điều hành được ủy quyền.
    @param _approved True nếu người điều hành được phê duyệt, false để thu hồi phê duyệt.
    """
    # Ném lỗi nếu '_operator' là 'msg.sender'
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
```
#### Đúc các token mới và tiêu hủy các token hiện có {#mint-burn}

Tài khoản đã tạo hợp đồng là `minter`, siêu người dùng được ủy quyền để đúc các NFT mới. Tuy nhiên, ngay cả nó cũng không được phép đốt các token hiện có. Chỉ chủ sở hữu, hoặc một thực thể được chủ sở hữu ủy quyền, mới có thể làm điều đó.

```python
### CÁC HÀM ĐÚC & ĐỐT ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Hàm này luôn trả về `True`, bởi vì nếu thao tác thất bại, nó sẽ bị hoàn nguyên.

```python
    """
    @dev Hàm để đúc các token
         Ném lỗi nếu `msg.sender` không phải là người đúc.
         Ném lỗi nếu `_to` là địa chỉ zero.
         Ném lỗi nếu `_tokenId` thuộc sở hữu của ai đó.
    @param _to Địa chỉ sẽ nhận các token được đúc.
    @param _tokenId Id token để đúc.
    @return Một boolean biểu thị liệu thao tác có thành công hay không.
    """
    # Ném lỗi nếu `msg.sender` không phải là người đúc
    assert msg.sender == self.minter
```

Chỉ người đúc (tài khoản đã tạo hợp đồng ERC-721) mới có thể đúc các token mới. Điều này có thể là một vấn đề trong tương lai nếu chúng ta muốn thay đổi danh tính của người đúc. Trong một hợp đồng sản xuất, bạn có thể sẽ muốn một hàm cho phép người đúc chuyển các đặc quyền đúc cho người khác.

```python
    # Ném lỗi nếu `_to` là địa chỉ zero
    assert _to != ZERO_ADDRESS
    # Thêm NFT. Ném lỗi nếu `_tokenId` thuộc sở hữu của ai đó
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Theo quy ước, việc đúc các token mới được tính là một khoản chuyển từ địa chỉ zero.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Đốt một token ERC-721 cụ thể.
         Ném lỗi trừ khi `msg.sender` là chủ sở hữu hiện tại, một người vận hành được ủy quyền, hoặc địa chỉ
         được phê duyệt cho NFT này.
         Ném lỗi nếu `_tokenId` không phải là một NFT hợp lệ.
    @param _tokenId uint256 id của token ERC-721 sẽ bị đốt.
    """
    # Kiểm tra các yêu cầu
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Ném lỗi nếu `_tokenId` không phải là một NFT hợp lệ
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Bất kỳ ai được phép chuyển một token đều được phép đốt nó. Mặc dù việc đốt có vẻ tương đương với việc chuyển đến địa chỉ zero, nhưng địa chỉ zero thực sự không nhận được token. Điều này cho phép chúng ta giải phóng tất cả bộ nhớ đã được sử dụng cho token, điều này có thể làm giảm chi phí Gas của giao dịch.

## Sử dụng hợp đồng này {#using-contract}

Ngược lại với Solidity, Vyper không có tính kế thừa. Đây là một lựa chọn thiết kế có chủ ý để làm cho mã rõ ràng hơn và do đó dễ bảo mật hơn. Vì vậy, để tạo hợp đồng ERC-721 bằng Vyper của riêng bạn, bạn lấy [hợp đồng này](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) và sửa đổi nó để triển khai logic nghiệp vụ mà bạn muốn.

## Kết luận {#conclusion}

Để ôn lại, dưới đây là một số ý tưởng quan trọng nhất trong hợp đồng này:

- Để nhận các token ERC-721 bằng một khoản chuyển an toàn, các hợp đồng phải triển khai giao diện `ERC721Receiver`.
- Ngay cả khi bạn sử dụng chuyển an toàn, các token vẫn có thể bị kẹt nếu bạn gửi chúng đến một địa chỉ mà khóa riêng tư không được biết đến.
- Khi có vấn đề với một thao tác, tốt nhất là nên `revert` lệnh gọi, thay vì chỉ trả về một giá trị thất bại.
- Các token ERC-721 tồn tại khi chúng có một chủ sở hữu.
- Có ba cách để được ủy quyền chuyển một NFT. Bạn có thể là chủ sở hữu, được phê duyệt cho một token cụ thể, hoặc là một người điều hành cho tất cả các token của chủ sở hữu.
- Các sự kiện trong quá khứ chỉ có thể nhìn thấy bên ngoài Chuỗi khối. Mã chạy bên trong Chuỗi khối không thể xem chúng.

Bây giờ hãy đi và triển khai các hợp đồng Vyper an toàn.

[Xem tại đây để biết thêm về công việc của tôi](https://cryptodocguy.pro/).
