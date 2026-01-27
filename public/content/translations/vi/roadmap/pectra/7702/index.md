---
title: "Chỉ dẫn Pectra 7702"
description: "Tìm hiểu thêm về 7702 trong bản phát hành Pectra"
lang: vi
---

# Pectra 7702

## Tóm tắt {#abstract}

EIP 7702 được hiểu là một cơ chế để thêm mã vào EOA. Đề xuất này cho phép các EOA, tức là tài khoản ethereum cũ, nhận được những cải tiến chức năng ngắn hạn, làm tăng khả năng sử dụng của các ứng dụng. Điều này được thực hiện bằng cách thiết lập một con trỏ đến mã đã được triển khai bằng cách sử dụng một loại giao dịch mới: 4.

Loại giao dịch mới này giới thiệu một danh sách được ủy quyền. Mỗi bộ ủy quyền trong danh sách được định nghĩa là

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** là đại diện (đã triển khai mã bytecode sẽ được sử dụng bởi EOA) **chain_id** khóa quyền xác thực cho một chuỗi cụ thể (hoặc 0 cho tất cả các chuỗi) **nonce** khóa quyền xác thực cho một  tài khoản nonce cụ thể (**y_parity, r, s**) là chữ ký của bộ quyền xác thực, được định nghĩa là keccak(0x05 || rlp ([chain_id ,địa chỉ, nonce])) bởi khóa riêng của EOA mà quyền xác thực được áp dụng (được cho là có thẩm quyền)

Một đại diện có thể được thiết lập lại bằng cách ủy quyền cho địa chỉ null.

Khóa riêng của EOA giữ quyền kiểm soát hoàn toàn đối với tài khoản sau khi ủy quyền. Chẳng hạn, việc ủy quyền cho một Safe không làm cho tài khoản trở thành một multisig vì vẫn có một khóa đơn lẻ có thể vượt qua bất kỳ chính sách ký nào. Trong thời gian tới, các nhà phát triển nên thiết kế với giả định rằng bất kỳ người tham gia nào trong hệ thống cũng có thể là một hợp đồng thông minh. Đối với các nhà phát triển hợp đồng thông minh, giờ đây không còn an toàn khi giả định rằng `tx.origin` đề cập đến một EOA.

## Các phương pháp tốt nhất{#best-practices}

**Trừu tượng hóa Tài khoản**: Một hợp đồng ủy quyền cần phải tuân thủ các tiêu chuẩn trừu tượng hóa tài khoản (Account Abstraction) rộng rãi của Ethereum để tối đa hóa khả năng tương thích. Cụ thể, lý tưởng nhất là việc nó nên tuân thủ hoặc tương thích với tiêu chuẩn ERC-4337.

**Thiết kế tự do và kháng kiểm duyệt**: Ethereum coi trọng sự tham gia một cách thoải mái. Một hợp đồng ủy quyền BỊ CẤM nhũng trực tiếp hoặc phụ thuộc vào bất kỳ “người chuyển tiếp” hoặc dịch vụ “đáng tin cậy” nào. Điều này sẽ làm tài khoản bị khóa nếu relayer không hoạt động. Các tính năng như batching (ví dụ: approve+transferFrom) có thể được sử dụng bởi chính EOA mà không cần một relayer. Đối với các nhà phát triển ứng dụng muốn sử dụng các tính năng nâng cao được kích hoạt bởi 7702 (Gas Abstraction, Privacy-Preserving Withdrawals) bạn sẽ cần một người trung gian. Mặc dù có nhiều kiến trúc relayer khác nhau, chúng tôi khuyến nghị sử dụng [bundler 4337](https://www.erc4337.io/bundlers) hướng tới ít nhất [điểm vào 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) vì các lý do sau:

- Họ cung cấp các giao diện chuẩn hóa để truyền tải
- Bao gồm hệ thống thanh toán sẵn có
- Đảm bảo tính tương thích về sau
- Có thể hỗ trợ tính kháng kiểm duyệt thông qua một [mempool công khai](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Có thể yêu cầu hàm init chỉ được gọi từ [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Nói cách khác, bất kỳ ai cũng có thể làm người tài trợ/gửi giao dịch miễn là họ cung cấp chữ ký hợp lệ hoặc UserOperation từ tài khoản. Điều này đảm bảo tính chống kiểm duyệt: nếu không cần cơ sở hạ tầng tùy chỉnh, các giao dịch của người dùng sẽ không bị chặn một cách tùy tiện bởi một trung gian kiểm soát. Chẳng hạn, [Bộ công cụ đại diện của MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) hoạt động rõ ràng với bất kỳ bundler hoặc paymaster ERC-4337 nào trên bất kỳ chuỗi nào, thay vì yêu cầu một máy chủ riêng biệt cho MetaMask.

**Tích hợp dApps qua giao diện ví**:

Vì ví sẽ cho phép chỉ định các hợp đồng đại diện cụ thể cho EIP-7702, các ứng dụng phi tập trung không nên mong đợi để yêu cầu quyền 7702 trực tiếp. Thay vào đó, việc tích hợp nên diễn ra thông qua các giao diện ví chuẩn hóa:

- **ERC-5792 (`wallet_sendCalls`)**: Cho phép các dApp yêu cầu ví thực hiện gọi theo lô, tạo điều kiện cho các chức năng như kết hợp giao dịch và trừu tượng hóa phí gas.

- **ERC-6900**: Cho phép dApp tận dụng các chức năng tài khoản thông minh dạng mô-đun, chẳng hạn như khóa phiên và khôi phục tài khoản, thông qua các mô-đun do ví quản lý.

Bằng cách sử dụng các giao diện này, dApp có thể truy cập các chức năng tài khoản thông minh do EIP-7702 cung cấp mà không cần quản lý trực tiếp các quyền ủy quyền, đảm bảo khả năng tương thích và bảo mật trên các triển khai ví khác nhau.

> Lưu ý: Không có phương pháp chuẩn hóa nào để dApp yêu cầu chữ ký ủy quyền 7702 trực tiếp. DApp phải dựa vào các giao diện ví cụ thể như ERC-6900 để tận dụng các tính năng của EIP-7702.

Để biết thêm thông tin:

- [Đặc tả ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Đặc tả ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Tránh phụ thuộc vào nhà cung cấp**: theo như đề cập ở trên,một cách triển khai tốt cần trung lập với nhà cung cấp và có khả năng tương tác.  Điều này thường có nghĩa là tuân thủ các tiêu chuẩn mới nổi dành cho các tài khoản thông minh Ví dụ,[Tài khoản Modular của Alchemy](https://github.com/alchemyplatform/modular-account) sử dụng tiêu chuẩn ERC-6900 cho các tài khoản thông minh dạng mô-đun và được thiết kế với mục tiêu “sử dụng có khả năng tương tác một cách phi tập trung”.

**Bảo vệ quyền riêng tư**: Mặc dù quyền riêng tư trên chuỗi còn hạn chế,một hợp đồng ủy quyền nên cố gắng giảm thiệu việc lộ dữ liệu và khả năng liên kết thông tin. Điều này có thể đạt được bằng cách hỗ trợ các tính năng như thanh toán phí giao dịch (gas) bằng các đồng ERC-20 (giúp cho người dùng không cần duy trì số dư ETH công khai,từ đó cải thiện quyền riêng tư và trải nghiệm người dùng) và khóa dùng một lần theo phiên (giúp giảm phụ thuộc vào một khóa dài nhất duy nhất) Ví dụ,EIP-7702 cho phép thanh toán tiền giao dịch (gas) bằng token thông qua những giao dịch được tài trợ, và một triển khai tốt sẽ giúp việc tích hợp các paymasters như vậy trở nên dễ dàng mà không để lộ nhiều thôn tin hơn mức cần thiết. Ngoài ra,việc ủy quyền mốt số quyền phê duyệt ngoài chuỗi (bằng những chữ ký được xác minh trên chuỗi) giúp giảm số lượng giao dịch trên chuỗi liên quan đến khóa chính của người dùng,từ đó cải thiện quyền riêng tư. Câc tài khoản yêu cầu sử dụng relayer sẽ buộc người dùng phải tiết lộ địa chỉ IP của họ. PublicMempools sẽ cải thiện điều này: Khi một giao dịch/UserOp được lân truyền trong mempool,bạn sẽ không thể biết nó có bắt nguồn từ địa chỉ IP đã gửi hay chỉ được truyền tiếp qua đó thông qua gioa thức p2p

. Khả năng nâng cấp vốn dĩ có thể thực hiện được với EIP-7702 (vì một EOA luôn có thể ủy quyền cho một hợp đồng mới trong tương lai để nâng cấp logic của nó). Ngoài khả năng nâng cấp, một thiết kế tốt còn cho phép mô-đun hóa – ví dụ: các mô-đun plug-in cho các lược đồ chữ ký hoặc chính sách chi tiêu khác nhau – mà không cần phải triển khai lại toàn bộ. Bộ công cụ tài khoản của Alchemy là một ví dụ điển hình, cho phép các nhà phát triển cài đặt các mô-đun xác thực (cho các loại chữ ký khác nhau như ECDSA, BLS, v.v.) và các mô-đun thực thi cho logic tùy chỉnh. Để đạt được sự linh hoạt và bảo mật cao hơn trong các tài khoản được kích hoạt EIP-7702, các nhà phát triển được khuyến khích ủy quyền cho một hợp đồng proxy thay vì trực tiếp cho một triển khai cụ thể. Cách tiếp cận này cho phép nâng cấp liền mạch và mô-đun hóa mà không yêu cầu các ủy quyền EIP-7702 bổ sung cho mỗi thay đổi.

Lợi ích của Mẫu Proxy:

- **Khả năng nâng cấp**: Cập nhật logic hợp đồng bằng cách trỏ proxy đến một hợp đồng triển khai mới.

- **Logic Khởi tạo Tùy chỉnh**: Tích hợp các hàm khởi tạo trong proxy để thiết lập các biến trạng thái cần thiết một cách an toàn.

Ví dụ, [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) minh họa cách một proxy có thể được sử dụng để khởi tạo và quản lý các ủy quyền một cách an toàn trong các tài khoản tương thích EIP-7702.

Nhược điểm của Mẫu Proxy:

- **Phụ thuộc vào các tác nhân bên ngoài**: Bạn phải dựa vào một đội ngũ bên ngoài để không nâng cấp lên một hợp đồng không an toàn.

## Các cân nhắc về bảo mật {#security-considerations}

**Biện pháp bảo vệ chống tấn công tái nhập**: Với sự ra đời của ủy quyền EIP-7702, tài khoản của người dùng có thể chuyển đổi linh hoạt giữa Tài khoản sở hữu bên ngoài (EOA) và Hợp đồng thông minh (SC). Tính linh hoạt này cho phép tài khoản vừa có thể khởi tạo các giao dịch, vừa có thể là mục tiêu của các lệnh gọi. Kết quả là, các trường hợp một tài khoản tự gọi chính nó và thực hiện các lệnh gọi bên ngoài sẽ có `msg.sender` bằng với `tx.origin`, điều này làm suy yếu một số giả định bảo mật nhất định trước đây vốn dựa vào việc `tx.origin` luôn là một EOA.

Đối với các nhà phát triển hợp đồng thông minh, không còn an toàn khi cho rằng `tx.origin` đề cập đến một EOA. Tương tự, việc sử dụng `msg.sender == tx.origin` như một biện pháp bảo vệ chống lại các cuộc tấn công tái nhập không còn là một chiến lược đáng tin cậy nữa.

Trong thời gian tới, các nhà phát triển nên thiết kế với giả định rằng bất kỳ người tham gia nào trong hệ thống cũng có thể là một hợp đồng thông minh. Ngoài ra, họ có thể triển khai biện pháp bảo vệ chống tấn công tái nhập một cách tường minh bằng cách sử dụng các biện pháp bảo vệ chống tấn công tái nhập với các mẫu bổ trợ `nonReentrant`. Chúng tôi khuyên bạn nên làm theo một bổ trợ đã được kiểm toán, ví dụ như [Reentrancy Guard của Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Họ cũng có thể sử dụng một [biến lưu trữ tạm thời](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Các cân nhắc về bảo mật khi khởi tạo**

Việc triển khai các hợp đồng ủy quyền EIP-7702 đặt ra những thách thức bảo mật cụ thể, đặc biệt là liên quan đến quá trình khởi tạo. Một lỗ hổng nghiêm trọng phát sinh khi hàm khởi tạo (`init`) được kết hợp một cách nguyên tử với quá trình ủy quyền. Trong những trường hợp như vậy, một kẻ chạy trước có thể chặn chữ ký ủy quyền và thực thi hàm `init` với các tham số đã bị thay đổi, có khả năng chiếm quyền kiểm soát tài khoản.

Rủi ro này đặc biệt liên quan khi cố gắng sử dụng các triển khai Tài khoản Hợp đồng Thông minh (SCA) hiện có với EIP-7702 mà không sửa đổi cơ chế khởi tạo của chúng.

**Các giải pháp để giảm thiểu lỗ hổng khởi tạo**

- Triển khai `initWithSig`
  Thay thế hàm `init` tiêu chuẩn bằng hàm `initWithSig` yêu cầu người dùng ký các tham số khởi tạo. Cách tiếp cận này đảm bảo rằng việc khởi tạo chỉ có thể tiến hành khi có sự đồng ý rõ ràng của người dùng, do đó giảm thiểu rủi ro khởi tạo trái phép.

- Sử dụng EntryPoint của ERC-4337
  Yêu cầu hàm khởi tạo phải được gọi độc quyền từ hợp đồng EntryPoint ERC-4337. Phương pháp này tận dụng khuôn khổ xác thực và thực thi được tiêu chuẩn hóa do ERC-4337 cung cấp, thêm một lớp bảo mật bổ sung vào quá trình khởi tạo.  
  _(Xem: [Safe Docs](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Bằng cách áp dụng các giải pháp này, các nhà phát triển có thể tăng cường bảo mật cho các hợp đồng ủy quyền EIP-7702, bảo vệ chống lại các cuộc tấn công chạy trước tiềm tàng trong giai đoạn khởi tạo.

**Xung đột lưu trữ** Mã ủy quyền không xóa bộ nhớ hiện có. Khi di chuyển từ hợp đồng ủy quyền này sang hợp đồng ủy quyền khác, dữ liệu còn lại từ hợp đồng trước đó vẫn còn. Nếu hợp đồng mới sử dụng cùng các khe lưu trữ nhưng diễn giải chúng theo cách khác, nó có thể gây ra hành vi không mong muốn. Ví dụ, nếu ủy quyền ban đầu là cho một hợp đồng trong đó một khe lưu trữ đại diện cho một `bool`, và ủy quyền tiếp theo là cho một hợp đồng trong đó cùng một khe đó đại diện cho một `uint`, sự không khớp có thể dẫn đến các kết quả không thể đoán trước.

**Rủi ro lừa đảo** Với việc triển khai ủy quyền EIP-7702, các tài sản trong tài khoản của người dùng có thể hoàn toàn được kiểm soát bởi các hợp đồng thông minh. Nếu một người dùng vô tình ủy quyền tài khoản của họ cho một hợp đồng độc hại, kẻ tấn công có thể dễ dàng giành quyền kiểm soát và đánh cắp tiền. Khi sử dụng `chain_id=0`, ủy quyền được áp dụng cho tất cả các id chuỗi. Chỉ ủy quyền cho một hợp đồng bất biến (không bao giờ ủy quyền cho một proxy) và chỉ cho các hợp đồng được triển khai bằng CREATE2 (với initcode tiêu chuẩn - không có hợp đồng biến hình) để người triển khai không thể triển khai một thứ khác đến cùng một địa chỉ ở nơi khác. Nếu không, việc ủy quyền của bạn sẽ đặt tài khoản của bạn vào tình trạng rủi ro trên tất cả các chuỗi EVM khác.

Khi người dùng thực hiện các chữ ký được ủy quyền, hợp đồng mục tiêu nhận ủy quyền phải được hiển thị rõ ràng và nổi bật để giúp giảm thiểu rủi ro lừa đảo.

**Bề mặt tin cậy tối thiểu & Bảo mật**: Mặc dù mang lại sự linh hoạt, một hợp đồng ủy quyền nên giữ logic cốt lõi của nó ở mức tối thiểu và có thể kiểm toán được. Hợp đồng thực chất là một phần mở rộng của EOA của người dùng, vì vậy bất kỳ lỗ hổng nào cũng có thể là thảm họa. Các triển khai nên tuân theo các thực tiễn tốt nhất từ cộng đồng bảo mật hợp đồng thông minh. Ví dụ, các hàm khởi tạo hoặc hàm dựng phải được bảo mật cẩn thận – như Alchemy đã nhấn mạnh, nếu sử dụng một mẫu proxy theo 7702, một hàm khởi tạo không được bảo vệ có thể cho phép kẻ tấn công chiếm quyền kiểm soát tài khoản. Các đội nên đặt mục tiêu giữ cho mã trên chuỗi đơn giản: Hợp đồng 7702 của Ambire chỉ có ~200 dòng Solidity, cố tình giảm thiểu sự phức tạp để giảm lỗi. Phải đạt được sự cân bằng giữa logic giàu tính năng và sự đơn giản giúp việc kiểm toán dễ dàng hơn.

### Các triển khai đã biết {#known-implementations}

Do bản chất của EIP 7702, các ví được khuyến nghị nên thận trọng khi giúp người dùng ủy quyền cho hợp đồng của bên thứ ba. Dưới đây là một bộ sưu tập các triển khai đã biết đã được kiểm toán:

| Địa chỉ hợp đồng                           | Nguồn                                                                                                                                          | Các cuộc kiểm toán                                                                                                                                                        |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                          | [Các cuộc kiểm toán](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                          | [Các cuộc kiểm toán](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)                  | [Các cuộc kiểm toán](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                              | [Các cuộc kiểm toán](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Nhóm AA của Ethereum Foundation](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [Các cuộc kiểm toán](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                          | [Các cuộc kiểm toán](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Hướng dẫn về ví cứng {#hardware-wallet-guidelines}

Ví cứng không nên cho phép ủy quyền tùy ý. Sự đồng thuận trong không gian ví cứng là sử dụng một danh sách các hợp đồng ủy quyền đáng tin cậy. Chúng tôi đề nghị cho phép các triển khai đã biết được liệt kê ở trên và xem xét các trường hợp khác theo từng trường hợp cụ thể. Vì việc ủy quyền EOA của bạn cho một hợp đồng sẽ trao toàn quyền kiểm soát tất cả tài sản, các ví cứng nên thận trọng với cách họ triển khai 7702.

### Các kịch bản tích hợp cho ứng dụng đồng hành {#integration-scenarios-for-companion-apps}

#### Thụ động {#lazy}

Vì EOA vẫn hoạt động như bình thường, nên không cần làm gì cả.

Lưu ý: một số tài sản có thể bị mã ủy quyền từ chối tự động, chẳng hạn như NFT ERC 1155 và bộ phận hỗ trợ nên biết về điều đó.

#### Nhận biết {#aware}

Thông báo cho người dùng rằng một ủy quyền đang được áp dụng cho EOA bằng cách kiểm tra mã của nó và tùy chọn đề nghị xóa ủy quyền.

#### Ủy quyền chung {#common-delegation}

Nhà cung cấp phần cứng đưa các hợp đồng ủy quyền đã biết vào danh sách trắng và triển khai hỗ trợ của họ trong phần mềm đồng hành. Nên chọn một hợp đồng có hỗ trợ đầy đủ ERC 4337.

Các EOA được ủy quyền cho một EOA khác sẽ được xử lý như các EOA tiêu chuẩn.

#### Ủy quyền tùy chỉnh {#custom-delegation}

Nhà cung cấp phần cứng triển khai hợp đồng ủy quyền của riêng mình và thêm nó vào danh sách, đồng thời triển khai hỗ trợ của nó trong phần mềm đồng hành. Nên xây dựng một hợp đồng có hỗ trợ đầy đủ ERC 4337.

Các EOA được ủy quyền cho một EOA khác sẽ được xử lý như các EOA tiêu chuẩn.
