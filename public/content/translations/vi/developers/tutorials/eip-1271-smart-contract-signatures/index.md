---
title: "EIP-1271: Ký và xác minh chữ ký hợp đồng thông minh"
description: Tổng quan về việc tạo và xác minh chữ ký hợp đồng thông minh với EIP-1271. Chúng tôi cũng sẽ đi sâu vào việc triển khai EIP-1271 được sử dụng trong Safe (trước đây là Gnosis Safe) để cung cấp một ví dụ cụ thể cho các nhà phát triển hợp đồng thông minh xây dựng dựa trên đó.
author: Nathan H. Leung
lang: vi
tags: ["eip-1271", "hợp đồng thông minh", "xác minh", "ký"]
skill: intermediate
breadcrumb: Chữ ký EIP-1271
published: 2023-01-12
---

Tiêu chuẩn [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) cho phép các hợp đồng thông minh xác minh chữ ký.

Trong hướng dẫn này, chúng tôi cung cấp cái nhìn tổng quan về chữ ký số, bối cảnh của EIP-1271 và việc triển khai cụ thể EIP-1271 được sử dụng bởi [Safe](https://safe.global/) (trước đây là Gnosis Safe). Nhìn chung, điều này có thể đóng vai trò là điểm khởi đầu để triển khai EIP-1271 trong các hợp đồng của riêng bạn.

## Chữ ký là gì? {#what-is-a-signature}

Trong bối cảnh này, một chữ ký (chính xác hơn là "chữ ký số") là một thông điệp cộng với một loại bằng chứng nào đó cho thấy thông điệp đến từ một người/người gửi/Địa chỉ cụ thể.

Ví dụ, một chữ ký số có thể trông như thế này:

1. Thông điệp: "Tôi muốn đăng nhập vào trang web này bằng Ví Ethereum của mình."
2. Người ký: Địa chỉ của tôi là `0x000…`
3. Bằng chứng: Đây là một số bằng chứng cho thấy tôi, `0x000…`, thực sự đã tạo ra toàn bộ thông điệp này (điều này thường liên quan đến mật mã học).

Điều quan trọng cần lưu ý là một chữ ký số bao gồm cả "thông điệp" và "chữ ký".

Tại sao? Ví dụ, nếu bạn đưa cho tôi một hợp đồng để ký, và sau đó tôi cắt trang chữ ký và chỉ trả lại cho bạn chữ ký của tôi mà không có phần còn lại của hợp đồng, thì hợp đồng đó sẽ không hợp lệ.

Tương tự như vậy, một chữ ký số không có ý nghĩa gì nếu không có thông điệp đi kèm!

## Tại sao EIP-1271 tồn tại? {#why-does-eip-1271-exist}

Để tạo một chữ ký số để sử dụng trên các blockchain dựa trên Ethereum, bạn thường cần một khóa riêng tư bí mật mà không ai khác biết. Đây là điều làm cho chữ ký của bạn là của riêng bạn (không ai khác có thể tạo ra cùng một chữ ký mà không biết khóa bí mật).

Tài khoản Ethereum của bạn (tức là Tài khoản thuộc sở hữu bên ngoài/EOA của bạn) có một khóa riêng tư được liên kết với nó và đây là khóa riêng tư thường được sử dụng khi một trang web hoặc ứng dụng phi tập trung (dapp) yêu cầu bạn cung cấp chữ ký (ví dụ: để "Đăng nhập bằng Ethereum").

Một ứng dụng có thể [xác minh chữ ký](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) mà bạn tạo bằng cách sử dụng Thư viện của bên thứ ba như ethers.js [mà không cần biết khóa riêng tư của bạn](https://en.wikipedia.org/wiki/Public-key_cryptography) và tin chắc rằng _bạn_ chính là người đã tạo ra chữ ký đó.

> Trên thực tế, vì chữ ký số EOA sử dụng mật mã học khóa công khai, chúng có thể được tạo và xác minh **ngoài chuỗi**! Đây là cách hoạt động của việc bỏ phiếu DAO không tốn Gas — thay vì gửi các lượt bỏ phiếu trên chuỗi, chữ ký số có thể được tạo và xác minh ngoài chuỗi bằng cách sử dụng các Thư viện mật mã học.

Mặc dù các Tài khoản EOA có khóa riêng tư, nhưng các Tài khoản hợp đồng thông minh không có bất kỳ loại khóa riêng tư hoặc khóa bí mật nào (vì vậy "Đăng nhập bằng Ethereum", v.v. không thể hoạt động nguyên bản với các Tài khoản hợp đồng thông minh).

Vấn đề mà EIP-1271 hướng tới giải quyết: làm thế nào chúng ta có thể biết rằng một chữ ký hợp đồng thông minh là hợp lệ nếu hợp đồng thông minh không có "bí mật" nào để nó có thể kết hợp vào chữ ký?

## EIP-1271 hoạt động như thế nào? {#how-does-eip-1271-work}

Các hợp đồng thông minh không có khóa riêng tư có thể được sử dụng để ký các thông điệp. Vậy làm thế nào chúng ta có thể biết liệu một chữ ký có xác thực hay không?

Chà, một ý tưởng là chúng ta có thể chỉ cần _hỏi_ hợp đồng thông minh xem một chữ ký có xác thực hay không!

Những gì EIP-1271 làm là tiêu chuẩn hóa ý tưởng "hỏi" một hợp đồng thông minh xem một chữ ký nhất định có hợp lệ hay không.

Một hợp đồng triển khai EIP-1271 phải có một hàm gọi là `isValidSignature` nhận vào một thông điệp và một chữ ký. Sau đó, hợp đồng có thể chạy một số logic xác thực (đặc tả không bắt buộc bất kỳ điều gì cụ thể ở đây) và sau đó trả về một giá trị cho biết chữ ký có hợp lệ hay không.

Nếu `isValidSignature` trả về một kết quả hợp lệ, điều đó gần giống như hợp đồng đang nói "có, tôi chấp thuận chữ ký + thông điệp này!"

### Giao diện {#interface}

Đây là giao diện chính xác trong đặc tả EIP-1271 (chúng ta sẽ nói về tham số `_hash` ở bên dưới, nhưng hiện tại, hãy coi nó như là thông điệp đang được xác minh):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Nên trả về liệu chữ ký được cung cấp có hợp lệ cho mã băm được cung cấp hay không
   * @param _hash      Mã băm của dữ liệu sẽ được ký
   * @param _signature Mảng byte chữ ký liên kết với _hash
   *
   * PHẢI trả về giá trị magic bytes4 0x1626ba7e khi hàm thực thi thành công.
   * KHÔNG ĐƯỢC sửa đổi trạng thái (sử dụng STATICCALL cho solc < 0.5, view modifier cho solc > 0.5)
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

## Ví dụ triển khai EIP-1271: Safe {#example-eip-1271-implementation-safe}

Các hợp đồng có thể triển khai `isValidSignature` theo nhiều cách — đặc tả không nói nhiều về việc triển khai chính xác.

Một hợp đồng đáng chú ý triển khai EIP-1271 là Safe (trước đây là Gnosis Safe).

Trong mã của Safe, `isValidSignature` [được triển khai](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) để các chữ ký có thể được tạo và xác minh theo [hai cách](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Các thông điệp trên chuỗi
   1. Tạo: một chủ sở hữu Safe tạo một giao dịch Safe mới để "ký" một thông điệp, truyền thông điệp dưới dạng dữ liệu vào giao dịch. Khi có đủ số lượng chủ sở hữu ký giao dịch để đạt đến ngưỡng đa chữ ký, giao dịch sẽ được phát sóng và chạy. Trong giao dịch, có một hàm Safe được gọi là (`signMessage(bytes calldata _data)`) giúp thêm thông điệp vào danh sách các thông điệp "được chấp thuận".
   2. Xác minh: gọi `isValidSignature` trên hợp đồng Safe và truyền thông điệp cần xác minh làm tham số thông điệp và [một giá trị trống cho tham số chữ ký](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (tức là `0x`). Safe sẽ thấy rằng tham số chữ ký trống và thay vì xác minh chữ ký bằng mật mã học, nó sẽ biết chỉ cần tiếp tục và kiểm tra xem thông điệp có nằm trong danh sách các thông điệp "được chấp thuận" hay không.
2. Các thông điệp ngoài chuỗi:
   1. Tạo: một chủ sở hữu Safe tạo một thông điệp ngoài chuỗi, sau đó yêu cầu các chủ sở hữu Safe khác ký thông điệp một cách riêng lẻ cho đến khi có đủ chữ ký để vượt qua ngưỡng chấp thuận đa chữ ký.
   2. Xác minh: gọi `isValidSignature`. Trong tham số thông điệp, truyền vào thông điệp cần được xác minh. Trong tham số chữ ký, truyền vào các chữ ký riêng lẻ của từng chủ sở hữu Safe được nối lại với nhau, liên tiếp. Safe sẽ kiểm tra xem có đủ chữ ký để đáp ứng ngưỡng **và** mỗi chữ ký có hợp lệ hay không. Nếu có, nó sẽ trả về một giá trị cho biết việc xác minh chữ ký thành công.

## Chính xác thì tham số `_hash` là gì? Tại sao không truyền toàn bộ thông điệp? {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

Bạn có thể đã nhận thấy rằng hàm `isValidSignature` trong [giao diện EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) không nhận vào chính thông điệp đó, mà thay vào đó là một tham số `_hash`. Điều này có nghĩa là thay vì truyền toàn bộ thông điệp có độ dài tùy ý cho `isValidSignature`, thay vào đó chúng ta truyền một Mã băm 32 byte của thông điệp (thường là keccak256).

Mỗi byte của dữ liệu lệnh gọi (calldata) — tức là dữ liệu tham số hàm được truyền cho một hàm hợp đồng thông minh — [tiêu tốn 16 Gas (4 Gas nếu là byte 0)](https://eips.ethereum.org/EIPS/eip-2028), vì vậy điều này có thể tiết kiệm rất nhiều Gas nếu một thông điệp dài.

### Các đặc tả EIP-1271 trước đây {#previous-eip-1271-specifications}

Có những đặc tả EIP-1271 trong thực tế có hàm `isValidSignature` với tham số đầu tiên thuộc loại `bytes` (độ dài tùy ý, thay vì `bytes32` có độ dài cố định) và tên tham số là `message`. Đây là một [phiên bản cũ hơn](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) của tiêu chuẩn EIP-1271.

## EIP-1271 nên được triển khai như thế nào trong các hợp đồng của riêng tôi? {#how-should-eip-1271-be-implemented-in-my-own-contracts}

Đặc tả rất mở ở đây. Việc triển khai của Safe có một số ý tưởng hay:

- Bạn có thể coi các chữ ký EOA từ "chủ sở hữu" của hợp đồng là hợp lệ.
- Bạn có thể lưu trữ một danh sách các thông điệp được chấp thuận và chỉ coi những thông điệp đó là hợp lệ.

Cuối cùng, điều đó tùy thuộc vào bạn với tư cách là nhà phát triển hợp đồng!

## Kết luận {#conclusion}

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) là một tiêu chuẩn linh hoạt cho phép các hợp đồng thông minh xác minh chữ ký. Nó mở ra cánh cửa cho các hợp đồng thông minh hoạt động giống như các EOA hơn — ví dụ như cung cấp một cách để "Đăng nhập bằng Ethereum" hoạt động với các hợp đồng thông minh — và nó có thể được triển khai theo nhiều cách (Safe có một cách triển khai thú vị, không hề tầm thường để xem xét).