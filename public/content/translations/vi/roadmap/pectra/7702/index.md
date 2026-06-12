---
title: Pectra 7702
metaTitle: Hướng dẫn Pectra 7702
description: Tìm hiểu thêm về 7702 trong bản phát hành Pectra
lang: vi
---

## Tóm tắt {#abstract}

EIP-7702 xác định một cơ chế để thêm mã vào một EOA. Đề xuất này cho phép các EOA, tức là các tài khoản Ethereum truyền thống, nhận được các cải tiến chức năng ngắn hạn, làm tăng tính khả dụng của các ứng dụng. Điều này được thực hiện bằng cách thiết lập một con trỏ đến mã byte đã được triển khai bằng cách sử dụng một loại giao dịch mới: 4.

Loại giao dịch mới này giới thiệu một danh sách ủy quyền. Mỗi bộ dữ liệu (tuple) ủy quyền trong danh sách được định nghĩa là

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** là sự ủy quyền (mã byte đã được triển khai sẽ được EOA sử dụng)
**chain_id** khóa ủy quyền vào một chuỗi cụ thể (hoặc 0 cho tất cả các chuỗi)
**nonce** khóa ủy quyền vào một nonce của tài khoản cụ thể
(**y_parity, r, s**) là chữ ký của bộ dữ liệu ủy quyền, được định nghĩa là keccak(0x05 || rlp ([chain_id ,address, nonce])) bởi khóa riêng tư của EOA mà ủy quyền áp dụng (còn được gọi là cơ quan thẩm quyền)

Một sự ủy quyền có thể được đặt lại bằng cách ủy quyền cho địa chỉ null.

Khóa riêng tư của EOA vẫn giữ toàn quyền kiểm soát tài khoản sau sự ủy quyền. Ví dụ: việc ủy quyền cho một Safe không biến tài khoản thành đa chữ ký vì vẫn có một khóa duy nhất có thể bỏ qua bất kỳ chính sách việc ký nào. Trong tương lai, các nhà phát triển nên thiết kế với giả định rằng bất kỳ người tham gia nào trong hệ thống đều có thể là một hợp đồng thông minh. Đối với các nhà phát triển hợp đồng thông minh, không còn an toàn khi giả định rằng `tx.origin` đề cập đến một EOA.

## Các phương pháp hay nhất {#best-practices}

**Trừu tượng hóa tài khoản**: Một hợp đồng ủy quyền nên phù hợp với các tiêu chuẩn trừu tượng hóa tài khoản (AA) rộng hơn của Ethereum để tối đa hóa khả năng tương thích. Cụ thể, lý tưởng nhất là nó nên tuân thủ hoặc tương thích với ERC-4337.

**Thiết kế không cần cấp phép và chống kiểm duyệt**: Ethereum coi trọng sự tham gia không cần cấp phép. Một hợp đồng ủy quyền KHÔNG ĐƯỢC mã hóa cứng (hard-code) hoặc phụ thuộc vào bất kỳ một relayer (bên chuyển tiếp) hoặc dịch vụ "đáng tin cậy" duy nhất nào. Điều này sẽ làm hỏng tài khoản nếu relayer ngoại tuyến. Các tính năng như gom lô (ví dụ: approve+transferFrom) có thể được chính EOA sử dụng mà không cần relayer. Đối với các nhà phát triển ứng dụng muốn sử dụng các tính năng nâng cao do 7702 mang lại (Trừu tượng hóa Gas, Rút tiền bảo vệ quyền riêng tư), bạn sẽ cần một relayer. Mặc dù có nhiều kiến trúc relayer khác nhau, khuyến nghị của chúng tôi là sử dụng [trình đóng gói 4337](https://www.erc4337.io/bundlers) trỏ đến ít nhất [entry point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) vì:

- Chúng cung cấp các giao diện tiêu chuẩn hóa cho việc chuyển tiếp
- Bao gồm các hệ thống bên trả phí tích hợp sẵn
- Đảm bảo khả năng tương thích trong tương lai
- Có thể hỗ trợ khả năng chống kiểm duyệt thông qua một [mempool công khai](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Có thể yêu cầu hàm khởi tạo (init) chỉ được gọi từ [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Nói cách khác, bất kỳ ai cũng có thể đóng vai trò là người tài trợ/relayer giao dịch miễn là họ cung cấp chữ ký hợp lệ được yêu cầu hoặc thao tác người dùng (UserOperation) từ tài khoản. Điều này đảm bảo khả năng chống kiểm duyệt: nếu không yêu cầu cơ sở hạ tầng tùy chỉnh, các giao dịch của người dùng không thể bị chặn một cách tùy tiện bởi một relayer gác cổng. Ví dụ: [Bộ công cụ ủy quyền của MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) hoạt động rõ ràng với bất kỳ trình đóng gói hoặc bên trả phí ERC-4337 nào trên bất kỳ chuỗi nào, thay vì yêu cầu một máy chủ dành riêng cho MetaMask.

**Tích hợp ứng dụng phi tập trung (dapp) qua Giao diện Ví**:

Do các ví sẽ đưa vào danh sách trắng (whitelist) các hợp đồng ủy quyền cụ thể cho EIP-7702, các dapp không nên kỳ vọng sẽ trực tiếp yêu cầu các ủy quyền 7702. Thay vào đó, việc tích hợp nên diễn ra thông qua các giao diện ví được tiêu chuẩn hóa:

- **ERC-5792 (`wallet_sendCalls`)**: Cho phép các dapp yêu cầu ví thực thi các lệnh gọi được gom lô, tạo điều kiện cho các chức năng như gom lô giao dịch và trừu tượng hóa gas.

- **ERC-6900**: Cho phép các dapp tận dụng các khả năng của tài khoản thông minh mô-đun, chẳng hạn như khóa phiên và khôi phục tài khoản, thông qua các mô-đun do ví quản lý.

Bằng cách sử dụng các giao diện này, các dapp có thể truy cập các chức năng của tài khoản thông minh do EIP-7702 cung cấp mà không cần trực tiếp quản lý các sự ủy quyền, đảm bảo khả năng tương thích và bảo mật trên các triển khai ví khác nhau.

> Lưu ý: Không có phương pháp tiêu chuẩn hóa nào để các dapp trực tiếp yêu cầu các chữ ký ủy quyền 7702. Các dapp phải dựa vào các giao diện ví cụ thể như ERC-6900 để tận dụng các tính năng của EIP-7702.

Để biết thêm thông tin:

- [Đặc tả ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Đặc tả ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Tránh bị khóa chặt vào nhà cung cấp (Vendor Lock-In)**: Phù hợp với những điều trên, một triển khai tốt là trung lập với nhà cung cấp và có khả năng tương tác. Điều này thường có nghĩa là tuân thủ các tiêu chuẩn mới nổi cho các tài khoản thông minh. Ví dụ: [Tài khoản Mô-đun của Alchemy](https://github.com/alchemyplatform/modular-account) sử dụng tiêu chuẩn ERC-6900 cho các tài khoản thông minh mô-đun và được thiết kế với mục tiêu "sử dụng có khả năng tương tác không cần cấp phép".

**Bảo vệ quyền riêng tư**: Mặc dù quyền riêng tư trên chuỗi bị hạn chế, một hợp đồng ủy quyền nên cố gắng giảm thiểu việc phơi bày dữ liệu và khả năng liên kết. Điều này có thể đạt được bằng cách hỗ trợ các tính năng như thanh toán Gas bằng token ERC-20 (để người dùng không cần duy trì số dư ETH công khai, giúp cải thiện quyền riêng tư và trải nghiệm người dùng) và khóa phiên dùng một lần (giúp giảm sự phụ thuộc vào một khóa dài hạn duy nhất). Ví dụ: EIP-7702 cho phép thanh toán Gas bằng token thông qua các giao dịch được tài trợ và một triển khai tốt sẽ giúp dễ dàng tích hợp các bên trả phí như vậy mà không làm rò rỉ nhiều thông tin hơn mức cần thiết. Ngoài ra, việc ủy quyền ngoài chuỗi cho một số chấp thuận nhất định (sử dụng các chữ ký được xác minh trên chuỗi) có nghĩa là sẽ có ít giao dịch trên chuỗi hơn với khóa chính của người dùng, hỗ trợ quyền riêng tư. Các tài khoản yêu cầu sử dụng relayer buộc người dùng phải tiết lộ địa chỉ IP của họ. PublicMempools cải thiện điều này, khi một giao dịch/thao tác người dùng (UserOp) lan truyền qua mempool, bạn không thể biết liệu nó bắt nguồn từ IP đã gửi nó hay chỉ được chuyển tiếp qua nó thông qua giao thức p2p.

**Khả năng mở rộng và Bảo mật Mô-đun**: Các triển khai tài khoản nên có khả năng mở rộng để chúng có thể phát triển với các tính năng và cải tiến bảo mật mới. Khả năng nâng cấp vốn dĩ có thể thực hiện được với EIP-7702 (vì một EOA luôn có thể ủy quyền cho một hợp đồng mới trong tương lai để nâng cấp logic của nó). Ngoài khả năng nâng cấp, một thiết kế tốt cho phép tính mô-đun – ví dụ: các mô-đun cắm thêm (plug-in) cho các sơ đồ chữ ký hoặc chính sách chi tiêu khác nhau – mà không cần phải triển khai lại toàn bộ. Account Kit của Alchemy là một ví dụ điển hình, cho phép các nhà phát triển cài đặt các mô-đun xác thực (cho các loại chữ ký khác nhau như ECDSA, BLS, v.v.) và các mô-đun thực thi cho logic tùy chỉnh. Để đạt được tính linh hoạt và bảo mật cao hơn trong các tài khoản hỗ trợ EIP-7702, các nhà phát triển được khuyến khích ủy quyền cho một hợp đồng proxy thay vì trực tiếp cho một triển khai cụ thể. Cách tiếp cận này cho phép nâng cấp và tính mô-đun liền mạch mà không yêu cầu thêm các ủy quyền EIP-7702 cho mỗi thay đổi.

Lợi ích của Mẫu Proxy:

- **Khả năng nâng cấp**: Cập nhật logic hợp đồng bằng cách trỏ proxy đến một hợp đồng triển khai mới.

- **Logic khởi tạo tùy chỉnh**: Kết hợp các hàm khởi tạo bên trong proxy để thiết lập các biến trạng thái cần thiết một cách an toàn.

Ví dụ: [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) minh họa cách một proxy có thể được sử dụng để khởi tạo và quản lý các sự ủy quyền một cách an toàn trong các tài khoản tương thích với EIP-7702.

Nhược điểm của Mẫu Proxy:

- **Sự phụ thuộc vào các tác nhân bên ngoài**: Bạn phải dựa vào một nhóm bên ngoài để không nâng cấp lên một hợp đồng không an toàn.

## Các cân nhắc về bảo mật {#security-considerations}

**Cơ chế chống tái truy nhập**: Với sự ra đời của sự ủy quyền EIP-7702, tài khoản của người dùng có thể chuyển đổi linh hoạt giữa Tài khoản thuộc sở hữu bên ngoài (EOA) và Hợp đồng thông minh (SC). Sự linh hoạt này cho phép tài khoản vừa khởi tạo các giao dịch vừa là mục tiêu của các lệnh gọi. Do đó, các kịch bản trong đó một tài khoản tự gọi chính nó và thực hiện các lệnh gọi bên ngoài sẽ có `msg.sender` bằng với `tx.origin`, điều này làm suy yếu một số giả định bảo mật trước đây dựa trên việc `tx.origin` luôn là một EOA.

Đối với các nhà phát triển hợp đồng thông minh, không còn an toàn khi giả định rằng `tx.origin` đề cập đến một EOA. Tương tự như vậy, việc sử dụng `msg.sender == tx.origin` như một biện pháp bảo vệ chống lại các cuộc tấn công tái xâm nhập không còn là một chiến lược đáng tin cậy.

Trong tương lai, các nhà phát triển nên thiết kế với giả định rằng bất kỳ người tham gia nào trong hệ thống đều có thể là một hợp đồng thông minh. Ngoài ra, họ có thể triển khai bảo vệ tái xâm nhập rõ ràng bằng cách sử dụng các cơ chế chống tái truy nhập với các mẫu modifier `nonReentrant`. Chúng tôi khuyên bạn nên làm theo một modifier đã được kiểm toán, ví dụ như [Cơ chế chống tái truy nhập của Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Họ cũng có thể sử dụng một [biến lưu trữ tạm thời (transient storage variable)](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Các cân nhắc về bảo mật khởi tạo**

Việc triển khai các hợp đồng ủy quyền EIP-7702 đưa ra những thách thức bảo mật cụ thể, đặc biệt là liên quan đến quá trình khởi tạo. Một lỗ hổng nghiêm trọng phát sinh khi hàm khởi tạo (`init`) được ghép nối nguyên tử (atomically coupled) với quá trình ủy quyền. Trong những trường hợp như vậy, một kẻ chạy trước (frontrunner) có thể chặn chữ ký ủy quyền và thực thi hàm `init` với các tham số bị thay đổi, có khả năng chiếm quyền kiểm soát tài khoản.

Rủi ro này đặc biệt thích hợp khi cố gắng sử dụng các triển khai Tài khoản Hợp đồng Thông minh (SCA) hiện có với EIP-7702 mà không sửa đổi các cơ chế khởi tạo của chúng.

**Các giải pháp để giảm thiểu lỗ hổng khởi tạo**

- Triển khai `initWithSig`  
  Thay thế hàm `init` tiêu chuẩn bằng một hàm `initWithSig` yêu cầu người dùng ký các tham số khởi tạo. Cách tiếp cận này đảm bảo rằng quá trình khởi tạo chỉ có thể tiến hành với sự đồng ý rõ ràng của người dùng, từ đó giảm thiểu các rủi ro khởi tạo trái phép.

- Sử dụng EntryPoint của ERC-4337  
  Yêu cầu hàm khởi tạo chỉ được gọi từ hợp đồng EntryPoint của ERC-4337. Phương pháp này tận dụng khuôn khổ xác thực và thực thi được tiêu chuẩn hóa do ERC-4337 cung cấp, bổ sung thêm một lớp bảo mật cho quá trình khởi tạo.  
  _(Xem: [Tài liệu Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Bằng cách áp dụng các giải pháp này, các nhà phát triển có thể tăng cường bảo mật cho các hợp đồng ủy quyền EIP-7702, bảo vệ chống lại các cuộc tấn công chạy trước (frontrunning) tiềm ẩn trong giai đoạn khởi tạo.

**Xung đột lưu trữ** Việc ủy quyền mã không xóa bộ nhớ lưu trữ hiện có. Khi di chuyển từ một hợp đồng ủy quyền này sang một hợp đồng ủy quyền khác, dữ liệu còn sót lại từ hợp đồng trước đó vẫn được giữ nguyên. Nếu hợp đồng mới sử dụng cùng các khe (slot) lưu trữ nhưng diễn giải chúng theo cách khác, nó có thể gây ra hành vi không mong muốn. Ví dụ: nếu sự ủy quyền ban đầu là cho một hợp đồng trong đó một khe lưu trữ đại diện cho một `bool` và sự ủy quyền tiếp theo là cho một hợp đồng trong đó cùng một khe đó đại diện cho một `uint`, sự không khớp này có thể dẫn đến các kết quả không thể đoán trước.

**Rủi ro lừa đảo (Phishing)** Với việc triển khai sự ủy quyền EIP-7702, các tài sản trong tài khoản của người dùng có thể bị kiểm soát hoàn toàn bởi các hợp đồng thông minh. Nếu người dùng vô tình ủy quyền tài khoản của họ cho một hợp đồng độc hại, kẻ tấn công có thể dễ dàng giành quyền kiểm soát và đánh cắp tiền. Khi sử dụng `chain_id=0`, sự ủy quyền được áp dụng cho tất cả các ID chuỗi. Chỉ ủy quyền cho một hợp đồng bất biến (không bao giờ ủy quyền cho một proxy) và chỉ cho các hợp đồng đã được triển khai bằng CREATE2 (với initcode tiêu chuẩn - không có hợp đồng biến hình (metamorphic contracts)) để người triển khai không thể triển khai một thứ gì đó khác biệt vào cùng một địa chỉ ở nơi khác. Nếu không, sự ủy quyền của bạn sẽ đặt tài khoản của bạn vào rủi ro trên tất cả các chuỗi EVM khác.

Khi người dùng thực hiện các chữ ký được ủy quyền, hợp đồng mục tiêu nhận sự ủy quyền phải được hiển thị rõ ràng và nổi bật để giúp giảm thiểu rủi ro lừa đảo.

**Bề mặt tin cậy tối thiểu & Bảo mật**: Mặc dù mang lại sự linh hoạt, một hợp đồng ủy quyền nên giữ cho logic cốt lõi của nó ở mức tối thiểu và có thể kiểm toán được. Hợp đồng thực chất là một phần mở rộng của EOA của người dùng, vì vậy bất kỳ lỗ hổng nào cũng có thể gây ra hậu quả thảm khốc. Các triển khai nên tuân theo các phương pháp hay nhất từ cộng đồng bảo mật hợp đồng thông minh. Ví dụ: các hàm khởi tạo (constructor hoặc initializer) phải được bảo mật cẩn thận – như Alchemy đã nhấn mạnh, nếu sử dụng mẫu proxy theo 7702, một initializer không được bảo vệ có thể cho phép kẻ tấn công chiếm đoạt tài khoản. Các nhóm nên hướng tới việc giữ cho mã trên chuỗi đơn giản: hợp đồng 7702 của Ambire chỉ có khoảng 200 dòng mã Solidity, cố tình giảm thiểu độ phức tạp để giảm thiểu lỗi. Cần phải đạt được sự cân bằng giữa logic giàu tính năng và sự đơn giản giúp dễ dàng kiểm toán.

### Các triển khai đã biết {#known-implementations}

Do bản chất của EIP-7702, các ví được khuyến nghị nên thận trọng khi giúp người dùng ủy quyền cho một hợp đồng của bên thứ 3. Dưới đây là danh sách các triển khai đã biết đã được kiểm toán:

| Địa chỉ hợp đồng                           | Nguồn                                                                                                                                      | Các bản kiểm toán                                                                                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [các bản kiểm toán](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [các bản kiểm toán](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [các bản kiểm toán](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [các bản kiểm toán](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Nhóm AA của Tổ chức Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [các bản kiểm toán](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [các bản kiểm toán](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Hướng dẫn về ví phần cứng {#hardware-wallet-guidelines}

Các ví phần cứng không nên phơi bày sự ủy quyền tùy ý. Sự đồng thuận trong không gian ví phần cứng là sử dụng một danh sách các hợp đồng ủy quyền đáng tin cậy. Chúng tôi đề xuất cho phép các triển khai đã biết được liệt kê ở trên và xem xét các triển khai khác theo từng trường hợp cụ thể. Vì việc ủy quyền EOA của bạn cho một hợp đồng sẽ trao quyền kiểm soát đối với tất cả các tài sản, các ví phần cứng nên thận trọng với cách chúng triển khai 7702.

### Các kịch bản tích hợp cho các ứng dụng đồng hành {#integration-scenarios-for-companion-apps}

#### Thụ động (Lazy) {#lazy}

Vì EOA vẫn hoạt động như bình thường, không có gì cần phải làm.

Lưu ý: một số tài sản có thể tự động bị từ chối bởi mã ủy quyền, chẳng hạn như NFT ERC-1155, và bộ phận hỗ trợ nên nhận thức được điều đó.

#### Nhận thức (Aware) {#aware}

Thông báo cho người dùng rằng một sự ủy quyền đang được áp dụng cho EOA bằng cách kiểm tra mã của nó và tùy chọn đề nghị xóa sự ủy quyền.

#### Ủy quyền chung {#common-delegation}

Nhà cung cấp phần cứng đưa vào danh sách trắng các hợp đồng ủy quyền đã biết và triển khai hỗ trợ của chúng trong phần mềm đồng hành. Khuyến nghị nên chọn một hợp đồng có hỗ trợ đầy đủ ERC-4337.

Các EOA được ủy quyền cho một hợp đồng khác sẽ được xử lý như các EOA tiêu chuẩn.

#### Ủy quyền tùy chỉnh {#custom-delegation}

Nhà cung cấp phần cứng triển khai hợp đồng ủy quyền của riêng mình và thêm nó vào danh sách, đồng thời triển khai hỗ trợ của nó trong phần mềm đồng hành. Khuyến nghị nên xây dựng một hợp đồng có hỗ trợ đầy đủ ERC-4337.

Các EOA được ủy quyền cho một hợp đồng khác sẽ được xử lý như các EOA tiêu chuẩn.