---
title: "Hướng dẫn hợp đồng Vyper ERC-721"
description: "Hợp đồng ERC-721 của Ryuya Nakamura và cách hoạt động"
author: Ori Pomerantz
lang: vi
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## Giới thiệu {#introduction}

Tiêu chuẩn [ERC-721](/developers/docs/standards/tokens/erc-721/) được dùng để nắm giữ quyền sở hữu các Token không thể thay thế (NFT).
Các token [ERC-20](/developers/docs/standards/tokens/erc-20/) hoạt động như một loại hàng hóa vì không có sự khác biệt giữa các token riêng lẻ.
Ngược lại, các token ERC-721 được thiết kế cho các tài sản tương tự nhau nhưng không giống hệt nhau, chẳng hạn như các phim hoạt hình
mèo khác nhau
hoặc các quyền sở hữu đối với các bất động sản khác nhau.

Trong bài viết này, chúng ta sẽ phân tích [hợp đồng ERC-721 của Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Hợp đồng này được viết bằng [Vyper](https://vyper.readthedocs.io/en/latest/index.html), một ngôn ngữ hợp đồng giống như Python được thiết kế để gây khó khăn hơn trong việc
viết mã không an toàn so với Solidity.

## Hợp đồng {#contract}

```python
# @dev Triển khai tiêu chuẩn token không thể thay thế ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Được sửa đổi từ: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Các bình luận trong Vyper, cũng như trong Python, bắt đầu bằng một hàm băm (`#`) và tiếp tục cho đến cuối dòng. Các bình luận bao gồm
`@<từ khóa>` được [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) sử dụng để tạo ra tài liệu tham khảo
có thể đọc được.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Giao diện ERC-721 được tích hợp vào ngôn ngữ Vyper.
[Bạn có thể xem định nghĩa mã tại đây](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Định nghĩa giao diện được viết bằng Python chứ không phải Vyper, vì giao diện không chỉ được sử dụng trong
chuỗi khối, mà còn khi gửi giao dịch đến chuỗi khối từ một ứng dụng bên ngoài, có thể được viết bằng
Python.

Dòng đầu tiên nhập giao diện và dòng thứ hai chỉ định rằng chúng tôi đang triển khai nó ở đây.

### Giao diện ERC721Receiver {#receiver-interface}

```python
# Giao diện cho hợp đồng được gọi bởi safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 hỗ trợ hai loại chuyển:

- `transferFrom`, cho phép người gửi chỉ định bất kỳ địa chỉ đích nào và đặt trách nhiệm
  chuyển cho người gửi. Điều này có nghĩa là bạn có thể chuyển đến một địa chỉ không hợp lệ, trong trường hợp đó
  NFT sẽ bị mất vĩnh viễn.
- `safeTransferFrom`, kiểm tra xem địa chỉ đích có phải là hợp đồng hay không. Nếu vậy, hợp đồng ERC-721
  sẽ hỏi hợp đồng nhận xem có muốn nhận NFT hay không.

Để trả lời yêu cầu của `safeTransferFrom`, hợp đồng nhận phải triển khai `ERC721Receiver`.

```python
            _operator: địa chỉ,
            _from: địa chỉ,
```

Địa chỉ `_from` là chủ sở hữu hiện tại của token. Địa chỉ `_operator` là địa chỉ đã
yêu cầu chuyển (hai địa chỉ này có thể không giống nhau, do các khoản phụ cấp).

```python
            _tokenId: uint256,
```

ID token ERC-721 là 256 bit. Thông thường chúng được tạo ra bằng cách băm mô tả của bất cứ thứ gì mà
token đại diện.

```python
            _data: Byte[1024]
```

Yêu cầu có thể có tối đa 1024 byte dữ liệu người dùng.

```python
        ) -> bytes32: view
```

Để ngăn chặn các trường hợp hợp đồng vô tình chấp nhận chuyển, giá trị trả về không phải là một giá trị boolean,
mà là 256 bit với một giá trị cụ thể.

Hàm này là một `chế độ xem`, có nghĩa là nó có thể đọc trạng thái của chuỗi khối, nhưng không sửa đổi nó.

### Sự kiện {#events}

[Các sự kiện](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)
được phát ra để thông báo cho người dùng và các máy chủ bên ngoài chuỗi khối về các sự kiện. Lưu ý rằng nội dung của các sự kiện
không có sẵn cho các hợp đồng trên chuỗi khối.

```python
# @dev Phát ra khi quyền sở hữu của bất kỳ NFT nào thay đổi theo bất kỳ cơ chế nào. Sự kiện này phát ra khi các NFT được
# tạo (`from` == 0) và bị hủy (`to` == 0). Ngoại lệ: trong quá trình tạo hợp đồng, bất kỳ
# số lượng NFT nào cũng có thể được tạo và gán mà không phát ra Transfer. Tại thời điểm bất kỳ
# lần chuyển nào, địa chỉ được phê duyệt cho NFT đó (nếu có) được đặt lại thành không.
# @param _from Người gửi NFT (nếu địa chỉ là địa chỉ không thì cho biết tạo token).
# @param _to Người nhận NFT (nếu địa chỉ là địa chỉ không thì cho biết hủy token).
# @param _tokenId NFT đã được chuyển.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Điều này tương tự như sự kiện Chuyển ERC-20, ngoại trừ việc chúng tôi báo cáo `tokenId` thay vì số lượng.
Không ai sở hữu địa chỉ không, vì vậy theo quy ước, chúng tôi sử dụng nó để báo cáo việc tạo và hủy token.

```python
# @dev Điều này phát ra khi địa chỉ được phê duyệt cho một NFT được thay đổi hoặc xác nhận lại. Địa chỉ
# không cho biết không có địa chỉ được phê duyệt nào. Khi một sự kiện Transfer phát ra, điều này cũng
# cho biết rằng địa chỉ được phê duyệt cho NFT đó (nếu có) được đặt lại thành không.
# @param _owner Chủ sở hữu của NFT.
# @param _approved Địa chỉ mà chúng tôi đang phê duyệt.
# @param _tokenId NFT mà chúng tôi đang phê duyệt.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Sự chấp thuận ERC-721 tương tự như một khoản phụ cấp ERC-20. Một địa chỉ cụ thể được phép chuyển một token
cụ thể. Điều này cung cấp một cơ chế để các hợp đồng phản hồi khi chúng chấp nhận một token. Các hợp đồng không thể
lắng nghe các sự kiện, vì vậy nếu bạn chỉ chuyển token cho chúng, chúng sẽ không "biết" về nó. Bằng cách này, chủ sở hữu
trước tiên gửi một sự chấp thuận và sau đó gửi một yêu cầu đến hợp đồng: "Tôi đã chấp thuận cho bạn chuyển token
X, xin hãy làm ...".

Đây là một lựa chọn thiết kế để làm cho tiêu chuẩn ERC-721 tương tự như tiêu chuẩn ERC-20. Vì các token
ERC-721 không thể thay thế được, một hợp đồng cũng có thể xác định rằng nó đã nhận được một token cụ thể bằng cách
nhìn vào quyền sở hữu của token.

```python
# @dev Điều này phát ra khi một người vận hành được kích hoạt hoặc vô hiệu hóa cho một chủ sở hữu. Người vận hành có thể quản lý
# tất cả các NFT của chủ sở hữu.
# @param _owner Chủ sở hữu của NFT.
# @param _operator Địa chỉ mà chúng tôi đang đặt quyền của người vận hành.
# @param _approved Trạng thái quyền của người vận hành (true nếu quyền của người vận hành được cấp và false nếu
# bị thu hồi).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Đôi khi, việc có một _người vận hành_ có thể quản lý tất cả các token của một tài khoản thuộc một loại cụ thể (những token được quản lý bởi
một hợp đồng cụ thể) là hữu ích, tương tự như giấy ủy quyền. Ví dụ: tôi có thể muốn trao quyền đó cho một hợp đồng kiểm tra xem
tôi đã không liên lạc với nó trong sáu tháng, và nếu vậy sẽ phân phối tài sản của tôi cho những người thừa kế của tôi (nếu một trong số họ yêu cầu, các hợp đồng
không thể làm bất cứ điều gì mà không được gọi bởi một giao dịch). Trong ERC-20, chúng tôi chỉ có thể cung cấp một khoản phụ cấp cao cho một hợp đồng thừa kế,
nhưng điều đó không hoạt động với ERC-721 vì các token không thể thay thế được. Đây là điều tương đương.

Giá trị `approved` cho chúng ta biết liệu sự kiện đó là để chấp thuận hay rút lại sự chấp thuận.

### Biến trạng thái {#state-vars}

Các biến này chứa trạng thái hiện tại của các token: token nào có sẵn và ai sở hữu chúng. Hầu hết trong số này
là các đối tượng `HashMap`, [các ánh xạ một chiều tồn tại giữa hai loại](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Ánh xạ từ ID NFT đến địa chỉ sở hữu nó.
idToOwner: HashMap[uint256, address]

# @dev Ánh xạ từ ID NFT đến địa chỉ được phê duyệt.
idToApprovals: HashMap[uint256, address]
```

Danh tính người dùng và hợp đồng trong Ethereum được biểu thị bằng các địa chỉ 160-bit. Hai biến này ánh xạ
từ ID token đến chủ sở hữu của chúng và những người được chấp thuận chuyển chúng (tối đa một người cho mỗi token). Trong Ethereum,
dữ liệu chưa được khởi tạo luôn bằng không, vì vậy nếu không có chủ sở hữu hoặc người chuyển được chấp thuận, giá trị của token đó
là không.

```python
# @dev Ánh xạ từ địa chỉ chủ sở hữu đến số lượng token của anh ấy.
ownerToNFTokenCount: HashMap[address, uint256]
```

Biến này chứa số lượng token cho mỗi chủ sở hữu. Không có ánh xạ từ chủ sở hữu đến token, vì vậy
cách duy nhất để xác định các token mà một chủ sở hữu cụ thể sở hữu là xem lại lịch sử sự kiện của chuỗi khối
và xem các sự kiện `Chuyển` thích hợp. Chúng ta có thể sử dụng biến này để biết khi nào chúng ta có tất cả các NFT và không
cần phải tìm kiếm xa hơn nữa trong quá khứ.

Lưu ý rằng thuật toán này chỉ hoạt động đối với giao diện người dùng và các máy chủ bên ngoài. Mã chạy trên chính
chuỗi khối không thể đọc các sự kiện trong quá khứ.

```python
# @dev Ánh xạ từ địa chỉ chủ sở hữu đến ánh xạ các địa chỉ của người vận hành.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Một tài khoản có thể có nhiều hơn một người vận hành. Một `HashMap` đơn giản là không đủ để
theo dõi chúng, bởi vì mỗi khóa dẫn đến một giá trị duy nhất. Thay vào đó, bạn có thể sử dụng
`HashMap[địa chỉ, bool]` làm giá trị. Theo mặc định, giá trị cho mỗi địa chỉ là `False`, có nghĩa là nó
không phải là một người vận hành. Bạn có thể đặt các giá trị thành `True` khi cần.

```python
# @dev Địa chỉ của người đúc, người có thể đúc một token
minter: address
```

Các token mới phải được tạo ra bằng một cách nào đó. Trong hợp đồng này, có một thực thể duy nhất được phép làm như vậy, đó là
`người đúc`. Ví dụ, điều này có thể là đủ cho một trò chơi. Đối với các mục đích khác, có thể cần phải
tạo ra một logic kinh doanh phức tạp hơn.

```python
# @dev Ánh xạ của id giao diện đến bool về việc nó có được hỗ trợ hay không
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID giao diện ERC165 của ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID giao diện ERC165 của ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) chỉ định một cơ chế để một hợp đồng tiết lộ cách các ứng dụng
có thể giao tiếp với nó, nó tuân thủ những ERC nào. Trong trường hợp này, hợp đồng tuân thủ ERC-165 và ERC-721.

### Các hàm {#functions}

Đây là các hàm thực sự triển khai ERC-721.

#### Hàm khởi tạo {#constructor}

```python
@external
def __init__():
```

Trong Vyper, cũng như trong Python, hàm khởi tạo được gọi là `__init__`.

```python
    """
    @dev Hàm khởi tạo hợp đồng.
    """
```

Trong Python và trong Vyper, bạn cũng có thể tạo một bình luận bằng cách chỉ định một chuỗi nhiều dòng (bắt đầu và kết thúc
với `"""`), và không sử dụng nó theo bất kỳ cách nào. Những bình luận này cũng có thể bao gồm
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Để truy cập các biến trạng thái, bạn sử dụng `self.<tên biến>`` (một lần nữa, giống như trong Python).

#### Xem Hàm {#views}

Đây là các hàm không sửa đổi trạng thái của chuỗi khối, và do đó có thể được thực thi
miễn phí nếu chúng được gọi từ bên ngoài. Nếu các hàm xem được gọi bởi một hợp đồng, chúng vẫn phải được thực thi trên
mọi nút và do đó tốn gas.

```python
@view
@external
```

Những từ khóa này trước một định nghĩa hàm bắt đầu bằng dấu a còng (`@`) được gọi là _decorations_. Chúng
chỉ định các trường hợp trong đó một hàm có thể được gọi.

- `@view` chỉ định rằng hàm này là một chế độ xem.
- `@external` chỉ định rằng hàm cụ thể này có thể được gọi bởi các giao dịch và bởi các hợp đồng khác.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Trái ngược với Python, Vyper là một [ngôn ngữ được gõ tĩnh](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Bạn không thể khai báo một biến, hoặc một tham số hàm, mà không xác định [kiểu dữ liệu](https://vyper.readthedocs.io/en/latest/types.html). Trong trường hợp này, tham số đầu vào là `bytes32`, một giá trị 256-bit
(256 bit là kích thước từ gốc của [Máy ảo Ethereum](/developers/docs/evm/)). Đầu ra là một giá trị
boolean. Theo quy ước, tên của các tham số hàm bắt đầu bằng dấu gạch dưới (`_`).

```python
    """
    @dev Việc xác định giao diện được chỉ định trong ERC-165.
    @param _interfaceID Id của giao diện
    """
    return self.supportedInterfaces[_interfaceID]
```

Trả về giá trị từ HashMap `self.supportedInterfaces`, được đặt trong hàm khởi tạo (`__init__`).

```python
### XEM HÀM ###
```

Đây là các hàm xem giúp cung cấp thông tin về các token cho người dùng và các hợp đồng khác.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Trả về số lượng NFT thuộc sở hữu của `_owner`.
         Thông báo lỗi nếu `_owner` là địa chỉ không. Các NFT được gán cho địa chỉ không được coi là không hợp lệ.
    @param _owner Địa chỉ để truy vấn số dư.
    """
    assert _owner != ZERO_ADDRESS
```

Dòng này [khẳng định](https://vyper.readthedocs.io/en/latest/statements.html#assert) rằng `_owner` không phải là
không. Nếu đúng như vậy, sẽ có lỗi và hoạt động sẽ bị hoàn nguyên.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Trả về địa chỉ của chủ sở hữu NFT.
         Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ.
    @param _tokenId Mã định danh cho một NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ
    assert owner != ZERO_ADDRESS
    return owner
```

Trong Máy ảo Ethereum (EVM) bất kỳ bộ nhớ nào không có giá trị được lưu trữ trong đó đều bằng không.
Nếu không có token nào ở `_tokenId` thì giá trị của `self.idToOwner[_tokenId]` bằng không. Trong trường hợp đó
hàm sẽ hoàn nguyên.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Nhận địa chỉ được phê duyệt cho một NFT duy nhất.
         Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ.
    @param _tokenId ID của NFT để truy vấn sự phê duyệt.
    """
    # Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Lưu ý rằng `getApproved` _có thể_ trả về không. Nếu token hợp lệ, nó sẽ trả về `self.idToApprovals[_tokenId]`.
Nếu không có người phê duyệt, giá trị đó là không.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Kiểm tra xem `_operator` có phải là người vận hành được phê duyệt cho `_owner` không.
    @param _owner Địa chỉ sở hữu các NFT.
    @param _operator Địa chỉ hoạt động thay mặt cho chủ sở hữu.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Hàm này kiểm tra xem `_operator` có được phép quản lý tất cả các token của `_owner` trong hợp đồng này hay không.
Bởi vì có thể có nhiều người vận hành, đây là một HashMap hai cấp.

#### Chuyển các Hàm Trợ giúp {#transfer-helpers}

Các hàm này thực hiện các hoạt động là một phần của việc chuyển hoặc quản lý token.

```python

### TRỢ GIÚP HÀM CHUYỂN ###

@view
@internal
```

Trang trí này, `@internal`, có nghĩa là hàm chỉ có thể được truy cập từ các hàm khác trong cùng một
hợp đồng. Theo quy ước, tên các hàm này cũng bắt đầu bằng dấu gạch dưới (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Trả về liệu người chi tiêu đã cho có thể chuyển một id token đã cho hay không
    @param spender địa chỉ của người chi tiêu để truy vấn
    @param tokenId uint256 ID của token sẽ được chuyển
    @return bool liệu msg.sender có được chấp thuận cho id token đã cho hay không,
        là một người vận hành của chủ sở hữu, hoặc là chủ sở hữu của token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Có ba cách để một địa chỉ có thể được phép chuyển một token:

1. Địa chỉ là chủ sở hữu của token
2. Địa chỉ được chấp thuận để chi tiêu token đó
3. Địa chỉ là người vận hành cho chủ sở hữu token

Hàm trên có thể là một chế độ xem vì nó không thay đổi trạng thái. Để giảm chi phí vận hành, bất kỳ
hàm nào _có thể_ là một chế độ xem _nên_ là một chế độ xem.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Thêm một NFT vào một địa chỉ đã cho
         Thông báo lỗi nếu `_tokenId` được sở hữu bởi ai đó.
    """
    # Thông báo lỗi nếu `_tokenId` được sở hữu bởi ai đó
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Thay đổi chủ sở hữu
    self.idToOwner[_tokenId] = _to
    # Thay đổi theo dõi số lượng
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Xóa một NFT khỏi một địa chỉ đã cho
         Thông báo lỗi nếu `_from` không phải là chủ sở hữu hiện tại.
    """
    # Thông báo lỗi nếu `_from` không phải là chủ sở hữu hiện tại
    assert self.idToOwner[_tokenId] == _from
    # Thay đổi chủ sở hữu
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Thay đổi theo dõi số lượng
    self.ownerToNFTokenCount[_from] -= 1
```

Khi có vấn đề với việc chuyển, chúng tôi sẽ hoàn nguyên cuộc gọi.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Xóa sự phê duyệt của một địa chỉ đã cho
         Thông báo lỗi nếu `_owner` không phải là chủ sở hữu hiện tại.
    """
    # Thông báo lỗi nếu `_owner` không phải là chủ sở hữu hiện tại
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Đặt lại các phê duyệt
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Chỉ thay đổi giá trị nếu cần thiết. Các biến trạng thái nằm trong bộ nhớ. Việc ghi vào bộ nhớ là
một trong những hoạt động tốn kém nhất mà EVM (Máy ảo Ethereum) thực hiện (về mặt
[gas](/developers/docs/gas/)). Do đó, đó là một ý tưởng tốt để giảm thiểu nó, ngay cả việc viết giá trị
hiện có cũng có chi phí cao.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Thực hiện chuyển một NFT.
         Thông báo lỗi trừ khi `msg.sender` là chủ sở hữu hiện tại, một người vận hành được ủy quyền, hoặc địa chỉ được phê duyệt
         cho NFT này. (LƯU Ý: `msg.sender` không được phép trong hàm riêng tư nên truyền `_sender`.)
         Thông báo lỗi nếu `_to` là địa chỉ không.
         Thông báo lỗi nếu `_from` không phải là chủ sở hữu hiện tại.
         Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ.
    """
```

Chúng tôi có hàm nội bộ này vì có hai cách để chuyển token (thông thường và an toàn), nhưng
chúng tôi chỉ muốn có một vị trí duy nhất trong mã nơi chúng tôi thực hiện nó để việc kiểm tra dễ dàng hơn.

```python
    # Kiểm tra các yêu cầu
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Thông báo lỗi nếu `_to` là địa chỉ không
    assert _to != ZERO_ADDRESS
    # Xóa phê duyệt. Thông báo lỗi nếu `_from` không phải là chủ sở hữu hiện tại
    self._clearApproval(_from, _tokenId)
    # Xóa NFT. Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ
    self._removeTokenFrom(_from, _tokenId)
    # Thêm NFT
    self._addTokenTo(_to, _tokenId)
    # Ghi lại việc chuyển
    log Transfer(_from, _to, _tokenId)
```

Để phát ra một sự kiện trong Vyper, bạn sử dụng một câu lệnh `log` ([xem ở đây để biết thêm chi tiết](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Hàm Chuyển {#transfer-funs}

```python

### HÀM CHUYỂN ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Thông báo lỗi trừ khi `msg.sender` là chủ sở hữu hiện tại, một người vận hành được ủy quyền, hoặc địa chỉ được phê duyệt
         cho NFT này.
         Thông báo lỗi nếu `_from` không phải là chủ sở hữu hiện tại.
         Thông báo lỗi nếu `_to` là địa chỉ không.
         Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ.
    @notice Người gọi chịu trách nhiệm xác nhận rằng `_to` có khả năng nhận NFT hoặc nếu không
            chúng có thể bị mất vĩnh viễn.
    @param _from Chủ sở hữu hiện tại của NFT.
    @param _to Chủ sở hữu mới.
    @param _tokenId NFT sẽ chuyển.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Hàm này cho phép bạn chuyển đến một địa chỉ tùy ý. Trừ khi địa chỉ là người dùng, hoặc một hợp đồng
biết cách chuyển token, bất kỳ token nào bạn chuyển sẽ bị kẹt trong địa chỉ đó và vô dụng.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Chuyển quyền sở hữu của một NFT từ một địa chỉ sang địa chỉ khác.
         Thông báo lỗi trừ khi `msg.sender` là chủ sở hữu hiện tại, một người vận hành được ủy quyền, hoặc
         địa chỉ được phê duyệt cho NFT này.
         Thông báo lỗi nếu `_from` không phải là chủ sở hữu hiện tại.
         Thông báo lỗi nếu `_to` là địa chỉ không.
         Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ.
         Nếu `_to` là một hợp đồng thông minh, nó sẽ gọi `onERC721Received` trên `_to` và thông báo lỗi nếu
         giá trị trả về không phải là `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         LƯU Ý: bytes4 được biểu thị bằng bytes32 với phần đệm
    @param _from Chủ sở hữu hiện tại của NFT.
    @param _to Chủ sở hữu mới.
    @param _tokenId NFT sẽ chuyển.
    @param _data Dữ liệu bổ sung không có định dạng được chỉ định, được gửi trong cuộc gọi đến `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Việc chuyển trước là ổn vì nếu có vấn đề, chúng tôi sẽ hoàn nguyên,
do đó mọi thứ được thực hiện trong cuộc gọi sẽ bị hủy.

```python
    if _to.is_contract: # kiểm tra xem `_to` có phải là địa chỉ hợp đồng không
```

Đầu tiên, hãy kiểm tra xem địa chỉ có phải là hợp đồng không (nếu nó có mã). Nếu không, giả sử đó là một địa chỉ người dùng
và người dùng sẽ có thể sử dụng token hoặc chuyển nó. Nhưng đừng để nó ru bạn vào
một cảm giác an toàn giả tạo. Bạn có thể mất token, ngay cả với `safeTransferFrom`, nếu bạn chuyển
chúng đến một địa chỉ mà không ai biết khóa riêng tư.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Gọi hợp đồng đích để xem liệu nó có thể nhận các token ERC-721 hay không.

```python
        # Thông báo lỗi nếu đích chuyển là một hợp đồng không triển khai 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Nếu đích là một hợp đồng, nhưng là hợp đồng không chấp nhận các token ERC-721 (hoặc đã quyết định không chấp nhận
việc chuyển cụ thể này), hãy hoàn nguyên.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Đặt hoặc xác nhận lại địa chỉ được phê duyệt cho một NFT. Địa chỉ không cho biết không có địa chỉ được phê duyệt nào.
         Thông báo lỗi trừ khi `msg.sender` là chủ sở hữu NFT hiện tại, hoặc một người vận hành được ủy quyền của chủ sở hữu hiện tại.
         Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ. (LƯU Ý: Điều này không được viết trong EIP)
         Thông báo lỗi nếu `_approved` là chủ sở hữu hiện tại. (LƯU Ý: Điều này không được viết trong EIP)
    @param _approved Địa chỉ sẽ được phê duyệt cho ID NFT đã cho.
    @param _tokenId ID của token sẽ được phê duyệt.
    """
    owner: address = self.idToOwner[_tokenId]
    # Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ
    assert owner != ZERO_ADDRESS
    # Thông báo lỗi nếu `_approved` là chủ sở hữu hiện tại
    assert _approved != owner
```

Theo quy ước, nếu bạn không muốn có người phê duyệt, bạn hãy chỉ định địa chỉ không, không phải chính bạn.

```python
    # Kiểm tra các yêu cầu
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Để đặt một sự chấp thuận, bạn có thể là chủ sở hữu, hoặc một người vận hành được chủ sở hữu ủy quyền.

```python
    # Đặt sự phê duyệt
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Kích hoạt hoặc vô hiệu hóa sự phê duyệt cho một bên thứ ba ("người vận hành") để quản lý tất cả
         tài sản của `msg.sender`. Nó cũng phát ra sự kiện ApprovalForAll.
         Thông báo lỗi nếu `_operator` là `msg.sender`. (LƯU Ý: Điều này không được viết trong EIP)
    @notice Điều này hoạt động ngay cả khi người gửi không sở hữu bất kỳ token nào vào thời điểm đó.
    @param _operator Địa chỉ để thêm vào tập hợp các người vận hành được ủy quyền.
    @param _approved True nếu người vận hành được phê duyệt, false để thu hồi phê duyệt.
    """
    # Thông báo lỗi nếu `_operator` là `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Đúc Token mới và Hủy Token hiện có {#mint-burn}

Tài khoản tạo hợp đồng là `người đúc`, người dùng cấp cao được ủy quyền để đúc
các NFT mới. Tuy nhiên, ngay cả nó cũng không được phép đốt các token hiện có. Chỉ chủ sở hữu, hoặc một thực thể
được chủ sở hữu ủy quyền, mới có thể làm điều đó.

```python
### CÁC HÀM ĐÚC & ĐỐT ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Hàm này luôn trả về `True`, vì nếu hoạt động thất bại, nó sẽ được hoàn nguyên.

```python
    """
    @dev Hàm để đúc token
         Thông báo lỗi nếu `msg.sender` không phải là người đúc.
         Thông báo lỗi nếu `_to` là địa chỉ không.
         Thông báo lỗi nếu `_tokenId` được sở hữu bởi ai đó.
    @param _to Địa chỉ sẽ nhận được các token được đúc.
    @param _tokenId ID token để đúc.
    @return Một giá trị boolean cho biết hoạt động có thành công hay không.
    """
    # Thông báo lỗi nếu `msg.sender` không phải là người đúc
    assert msg.sender == self.minter
```

Chỉ người đúc (tài khoản đã tạo hợp đồng ERC-721) mới có thể đúc các token mới. Điều này có thể là một vấn đề
trong tương lai nếu chúng ta muốn thay đổi danh tính của người đúc. Trong
một hợp đồng sản xuất, bạn có thể muốn có một hàm cho phép người đúc chuyển
đặc quyền đúc cho người khác.

```python
    # Thông báo lỗi nếu `_to` là địa chỉ không
    assert _to != ZERO_ADDRESS
    # Thêm NFT. Thông báo lỗi nếu `_tokenId` được sở hữu bởi ai đó
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Theo quy ước, việc đúc các token mới được tính là một lần chuyển từ địa chỉ không.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Đốt một token ERC721 cụ thể.
         Thông báo lỗi trừ khi `msg.sender` là chủ sở hữu hiện tại, một người vận hành được ủy quyền, hoặc địa chỉ được phê duyệt
         cho NFT này.
         Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ.
    @param _tokenId uint256 id của token ERC721 sẽ được đốt.
    """
    # Kiểm tra các yêu cầu
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Thông báo lỗi nếu `_tokenId` không phải là một NFT hợp lệ
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Bất kỳ ai được phép chuyển một token đều được phép đốt nó. Mặc dù việc đốt có vẻ tương đương với
việc chuyển đến địa chỉ không, địa chỉ không thực sự nhận được token. Điều này cho phép chúng ta
giải phóng tất cả bộ nhớ đã được sử dụng cho token, điều này có thể làm giảm chi phí gas của giao dịch.

## Sử dụng Hợp đồng này {#using-contract}

Trái ngược với Solidity, Vyper không có tính kế thừa. Đây là một lựa chọn thiết kế có chủ ý để làm cho mã
rõ ràng hơn và do đó dễ bảo mật hơn. Vì vậy, để tạo hợp đồng Vyper ERC-721 của riêng bạn, bạn hãy lấy hợp đồng
này và sửa đổi nó
để triển khai logic kinh doanh mà bạn muốn.

## Kết luận {#conclusion}

Để xem lại, đây là một số ý tưởng quan trọng nhất trong hợp đồng này:

- Để nhận các token ERC-721 bằng một lần chuyển an toàn, các hợp đồng phải triển khai giao diện `ERC721Receiver`.
- Ngay cả khi bạn sử dụng chuyển an toàn, các token vẫn có thể bị kẹt nếu bạn gửi chúng đến một địa chỉ có khóa riêng tư
  không xác định.
- Khi có vấn đề với một hoạt động, tốt hơn hết là `hoàn nguyên` cuộc gọi, thay vì chỉ trả về
  một giá trị thất bại.
- Các token ERC-721 tồn tại khi chúng có chủ sở hữu.
- Có ba cách để được ủy quyền chuyển một NFT. Bạn có thể là chủ sở hữu, được chấp thuận cho một token cụ thể,
  hoặc là người vận hành cho tất cả các token của chủ sở hữu.
- Các sự kiện trong quá khứ chỉ hiển thị bên ngoài chuỗi khối. Mã chạy bên trong chuỗi khối không thể xem chúng.

Bây giờ hãy đi và triển khai các hợp đồng Vyper an toàn.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).

