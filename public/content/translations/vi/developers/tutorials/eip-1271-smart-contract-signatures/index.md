---
title: "EIP-1271: Ký và xác minh Chữ ký Hợp đồng thông minh"
description: Tổng quan về việc tạo và xác minh chữ ký hợp đồng thông minh với EIP-1271. Chúng tôi cũng xem xét việc triển khai EIP-1271 được sử dụng trong Safe (trước đây là Gnosis Safe) để cung cấp một ví dụ cụ thể cho các nhà phát triển hợp đồng thông minh xây dựng dựa trên đó.
author: Nathan H. Leung
lang: vi
tags: [ "eip-1271", "hợp đồng thông minh", "xác minh", "ký" ]
skill: intermediate
published: 2023-01-12
---

Tiêu chuẩn [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) cho phép các hợp đồng thông minh xác minh chữ ký.

Trong bài hướng dẫn này, chúng tôi cung cấp một cái nhìn tổng quan về chữ ký số, nền tảng của EIP-1271, và cách triển khai cụ thể của EIP-1271 được sử dụng bởi [Safe](https://safe.global/) (trước đây là Gnosis Safe). Tất cả những điều này có thể đóng vai trò là điểm khởi đầu để bạn triển khai EIP-1271 trong các hợp đồng của riêng mình.

## Chữ ký là gì?

Trong bối cảnh này, một chữ ký (chính xác hơn là “chữ ký số”) là một thông điệp cộng với một loại bằng chứng nào đó cho thấy thông điệp đến từ một người/người gửi/địa chỉ cụ thể.

Ví dụ, một chữ ký số có thể trông như thế này:

1. Thông điệp: “Tôi muốn đăng nhập vào trang web này bằng ví Ethereum của tôi.”
2. Người ký: Địa chỉ của tôi là `0x000…`
3. Bằng chứng: Đây là một số bằng chứng cho thấy tôi, `0x000…`, đã thực sự tạo ra toàn bộ thông điệp này (đây thường là một cái gì đó thuộc về mật mã).

Điều quan trọng cần lưu ý là một chữ ký số bao gồm cả “thông điệp” và “chữ ký”.

Tại sao? Ví dụ: nếu bạn đưa cho tôi một hợp đồng để ký, và sau đó tôi cắt trang chữ ký và chỉ đưa lại cho bạn chữ ký của tôi mà không có phần còn lại của hợp đồng, thì hợp đồng đó sẽ không hợp lệ.

Tương tự như vậy, một chữ ký số sẽ không có ý nghĩa gì nếu không có thông điệp đi kèm!

## Tại sao EIP-1271 lại tồn tại?

Để tạo chữ ký số để sử dụng trên các blockchain dựa trên Ethereum, bạn thường cần một khóa riêng tư bí mật mà không ai khác biết. Đây là điều làm cho chữ ký của bạn là của bạn (không ai khác có thể tạo ra chữ ký tương tự nếu không biết khóa bí mật).

Tài khoản Ethereum của bạn (tức là tài khoản sở hữu bên ngoài/EOA của bạn) có một khóa riêng tư được liên kết với nó và đây là khóa riêng tư thường được sử dụng khi một trang web hoặc ứng dụng phi tập trung yêu cầu bạn cung cấp chữ ký (ví dụ: để “Đăng nhập bằng Ethereum”).

Một ứng dụng có thể [xác minh chữ ký](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) mà bạn tạo bằng thư viện của bên thứ ba như ethers.js [mà không cần biết khóa riêng tư của bạn](https://en.wikipedia.org/wiki/Public-key_cryptography) và tin chắc rằng _chính bạn_ là người đã tạo ra chữ ký đó.

> Trên thực tế, vì chữ ký số của EOA sử dụng mật mã khóa công khai nên chúng có thể được tạo và xác minh **ngoài chuỗi**! Đây là cách hoạt động của việc bỏ phiếu DAO không tốn gas — thay vì gửi phiếu bầu trên chuỗi, chữ ký số có thể được tạo và xác minh ngoài chuỗi bằng các thư viện mật mã.

Mặc dù các tài khoản EOA có khóa riêng tư, các tài khoản hợp đồng thông minh không có bất kỳ loại khóa riêng tư hoặc khóa bí mật nào (vì vậy "Đăng nhập bằng Ethereum", v.v. không thể hoạt động nguyên bản với các tài khoản hợp đồng thông minh).

Vấn đề mà EIP-1271 nhằm giải quyết là: làm cách nào chúng ta có thể biết được chữ ký của hợp đồng thông minh là hợp lệ nếu hợp đồng thông minh không có “bí mật” nào để có thể đưa vào chữ ký?

## EIP-1271 hoạt động như thế nào?

Các hợp đồng thông minh không có khóa riêng tư có thể được sử dụng để ký các thông điệp. Vậy làm thế nào chúng ta có thể biết được một chữ ký có xác thực hay không?

Chà, một ý tưởng là chúng ta có thể chỉ cần _hỏi_ hợp đồng thông minh xem một chữ ký có xác thực hay không!

Điều EIP-1271 làm là nó chuẩn hóa ý tưởng “hỏi” một hợp đồng thông minh xem một chữ ký đã cho có hợp lệ hay không.

Một hợp đồng triển khai EIP-1271 phải có một hàm có tên là `isValidSignature` nhận vào một thông điệp và một chữ ký. Sau đó, hợp đồng có thể chạy một số logic xác thực (thông số kỹ thuật không thực thi bất kỳ điều gì cụ thể ở đây) và sau đó trả về một giá trị cho biết chữ ký có hợp lệ hay không.

Nếu `isValidSignature` trả về một kết quả hợp lệ, điều đó gần như có nghĩa là hợp đồng đang nói “vâng, tôi chấp thuận chữ ký + thông điệp này!”

### Giao diện

Đây là giao diện chính xác trong đặc tả EIP-1271 (chúng ta sẽ nói về tham số `_hash` bên dưới, nhưng hiện tại, hãy coi nó là thông điệp đang được xác minh):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Nên trả về liệu chữ ký được cung cấp có hợp lệ cho giá trị băm được cung cấp hay không
   * @param _hash      Giá trị băm của dữ liệu được ký
   * @param _signature Mảng byte chữ ký được liên kết với _hash
   *
   * PHẢI trả về giá trị magic bytes4 0x1626ba7e khi hàm vượt qua.
   * KHÔNG ĐƯỢC sửa đổi trạng thái (sử dụng STATICCALL cho solc < 0.5, công cụ sửa đổi view cho solc > 0.5)
   * PHẢI cho phép các lệnh gọi bên ngoài
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Ví dụ triển khai EIP-1271: Safe

Các hợp đồng có thể triển khai `isValidSignature` theo nhiều cách — đặc tả không nói nhiều về cách triển khai chính xác.

Một hợp đồng đáng chú ý triển khai EIP-1271 là Safe (trước đây là Gnosis Safe).

Trong mã của Safe, `isValidSignature` [được triển khai](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) để chữ ký có thể được tạo và xác minh theo [hai cách](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Thông điệp trên chuỗi
   1. Tạo: một chủ sở hữu Safe tạo một giao dịch Safe mới để “ký” một thông điệp, chuyển thông điệp dưới dạng dữ liệu vào giao dịch. Khi có đủ chủ sở hữu ký vào giao dịch để đạt đến ngưỡng đa chữ ký (multisig), giao dịch sẽ được phát và chạy. Trong giao dịch, có một hàm Safe được gọi là (`signMessage(bytes calldata _data)`) để thêm thông điệp vào danh sách các thông điệp “được chấp thuận”.
   2. Xác minh: gọi `isValidSignature` trên hợp đồng Safe, và chuyển thông điệp cần xác minh làm tham số thông điệp và [một giá trị trống cho tham số chữ ký](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (tức là `0x`). Safe sẽ thấy rằng tham số chữ ký trống và thay vì xác minh chữ ký bằng mật mã, nó sẽ biết để tiếp tục và kiểm tra xem thông điệp có nằm trong danh sách các thông điệp “được chấp thuận” hay không.
2. Thông điệp ngoài chuỗi:
   1. Tạo: một chủ sở hữu Safe tạo một thông điệp ngoài chuỗi, sau đó yêu cầu các chủ sở hữu Safe khác ký riêng lẻ vào thông điệp cho đến khi có đủ chữ ký để vượt qua ngưỡng phê duyệt đa chữ ký (multisig).
   2. Xác minh: gọi `isValidSignature`. Trong tham số thông điệp, hãy chuyển vào thông điệp cần được xác minh. Trong tham số chữ ký, hãy chuyển vào chữ ký riêng lẻ của mỗi chủ sở hữu Safe được nối lại với nhau, liên tiếp. Safe sẽ kiểm tra xem có đủ chữ ký để đáp ứng ngưỡng **và** mỗi chữ ký đều hợp lệ. Nếu vậy, nó sẽ trả về một giá trị cho biết xác minh chữ ký thành công.

## Tham số `_hash` chính xác là gì? Tại sao không chuyển toàn bộ thông điệp?

Bạn có thể đã nhận thấy rằng hàm `isValidSignature` trong [giao diện EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) không nhận vào chính thông điệp đó, mà thay vào đó là một tham số `_hash`. Điều này có nghĩa là thay vì chuyển toàn bộ thông điệp có độ dài tùy ý cho `isValidSignature`, chúng ta thay vào đó chuyển một giá trị băm 32 byte của thông điệp (thường là keccak256).

Mỗi byte calldata — tức là, dữ liệu tham số hàm được chuyển đến một hàm hợp đồng thông minh — [tốn 16 gas (4 gas nếu là byte không)](https://eips.ethereum.org/EIPS/eip-2028), vì vậy điều này có thể tiết kiệm rất nhiều gas nếu một thông điệp dài.

### Các Đặc tả EIP-1271 trước đây

Có những đặc tả EIP-1271 ngoài thực tế có hàm `isValidSignature` với tham số đầu tiên thuộc loại `bytes` (độ dài tùy ý, thay vì `bytes32` có độ dài cố định) và tên tham số `message`. Đây là một [phiên bản cũ hơn](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) của tiêu chuẩn EIP-1271.

## EIP-1271 nên được triển khai trong các hợp đồng của riêng tôi như thế nào?

Đặc tả ở đây rất mở. Việc triển khai Safe có một số ý tưởng hay:

- Bạn có thể coi chữ ký EOA từ "chủ sở hữu" của hợp đồng là hợp lệ.
- Bạn có thể lưu trữ một danh sách các thông điệp được chấp thuận và chỉ coi những thông điệp đó là hợp lệ.

Cuối cùng, điều đó tùy thuộc vào bạn với tư cách là nhà phát triển hợp đồng!

## Kết luận

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) là một tiêu chuẩn linh hoạt cho phép các hợp đồng thông minh xác minh chữ ký. Nó mở ra cánh cửa cho các hợp đồng thông minh hoạt động giống EOA hơn — ví dụ như cung cấp một cách để "Đăng nhập bằng Ethereum" hoạt động với các hợp đồng thông minh — và nó có thể được triển khai theo nhiều cách (Safe có một cách triển khai không hề đơn giản và thú vị đáng để cân nhắc).
