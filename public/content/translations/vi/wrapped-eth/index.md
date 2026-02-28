---
title: "Ether được bọc (WETH) là gì"
description: "Một giới thiệu về Ether được bọc (WETH) - Một dạng \"bọc\" Ether (ETH) chuẩn ERC20."
lang: vi
---

# Ether được bọc (Wrapped Ether - WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Kết nối ví của bạn tới một ETH được bọc hoặc không bọc trên mọi chuỗi tại [WarpETH.com](https://www.wrapeth.com/)</div>
</Alert>

Ether (ETH) là tiền tệ chính của Ethereum. Nó được sử dụng cho nhiều mục đích như Staking, làm tiền tệ, và trả phí Gas cho việc tính toán. **WETH là một dạng ETH được nâng cấp, có thêm một số chức năng bổ sung mà cần thiết bởi nhiều ứng dụng và [Token ERC-20](/glossary/#erc-20)**, vốn là các loại tài sản số khác trên Ethereum. Để có thể tương tác với các Token này, ETH phải tuân theo cùng một bộ quy tắc như chúng, được gọi là chuẩn ERC-20.

Để lấp khoảng trống này, ETH được bọc (WETH) đã được tạo ra. **ETH được bọc là một hợp đồng thông minh cho phép bạn gửi vào bất kỳ lượng ETH nào và nhận lại đúng số lượng đó dưới dạng WETH được đúc**, tuân theo chuẩn Token ERC-20. WETH là một dạng đại diện của ETH, cho phép bạn tương tác với nó như một Token ERC-20, chứ không phải như tài sản gốc ETH. Bạn vẫn cần lượng ETH gốc để trả phí Gas, vì vậy hãy giữ một ít khi nạp.

Bạn có thể tháo bọc cho WETH thành ETH bằng cách sử dụng hợp đồng thông minh WETH. Bạn có thể đổi lại bất kỳ số lượng WETH nào thông qua hợp đồng thông minh WETH, và bạn sẽ nhận lại cùng số lượng ETH đó. Lượng WETH được gửi vào sẽ bị đốt và loại khỏi lưu thông trong WETH.

**Khoảng ~3% lưu lượng ETH thông hành được khóa vào hợp đồng thông minh WETH** làm cho nó trở thành [hợp đồng thông minh](/glossary/#smart-contract) phổ biến nhất. WETH đặc biệt quan trọng cho người dùng tương tác với ứng dụng trên tài chính phi tập trung (DeFi).

## Tịa sao chúng ta cần ETH được bọc như một ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) định nghĩa giao diện tiêu chuẩn cho các Token có thể chuyển đi được, nhờ đó bất kì ai cũng có thể tạo Token tương tác tốt hơn với các ứng dụng và các Token khác sử dụng chuẩn này trong hệ sinh thái Ethereum. Vì **ETH ra đời trước chuẩn ERC-20**, vì vậy ETH không theo chuẩn này. Điều này có nghĩa rằng **bạn sẽ gặp khó khăn** trao đổi ETH với những Token chuẩn ERC-20 khác hoặc **sử dụng ETH trong ứng dụng tiêu chuẩn ERC-20**. Việc bọc ETH cho phép bạn làm những điều sau:

- **Đổi ETH với Token ERC-20**: Bạn không thể đổi ETH trực tiếp lấy Token ERC-20 khác. WETH là một dạng đại diện của ETH, tuân thủ chuẩn ERC-20 Token có thể thay thế và có thể được trao đổi với các Token ERC-20 khác.

- **Sử dụng ETH trong DApp**: Bởi vì ETH tương thích chuẩn ERC-20, nhà phát triển phải cần sử dụng một giao diện riêng biệt (một dành cho ETH còn lại là cho Token ERC-20) trong DApp. Bọc ETH loại bỏ trở ngại này và cho phép lập trình viên xử lý ETH và các Token khác trong cùng một DApp. Nhiều ứng dụng tài chính phi tập trung (DeFi) sử dụng chuẩn này, và tạo ra các thị trường để trao đổi các Token đó.

## Ether được bọc (WETH) và Ether (ETH): Sự khác nhau là gì? {#weth-vs-eth-differences}

|              | **Ether (ETH)**                                                                                                                                                                                                      | **Ether được bọc (WETH)**                                                                                                                                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nguồn cung   | Nguồn cung của ETH được quản lý bởi giao thức Ethereum. Việc [phát hành](/roadmap/merge/issuance) của ETH được đảm nhiệm bởi các nút xác thực cảu Ethereum trong quá trình xử lí giao dịch và tạo khối. | WETH là một Token ERC-20 khi mà nguồn cung được quản lý bởi hợp đồng thông minh. Các đơn vị WETH được phát hành dựa trên hợp đồng nhận lượng số lượng ETH gửi vào từ người dùng, hoặc đơn vị WETH sẽ bị đốt khi người dùng rút WETH về ETH. |
| Quyền sở hữu | Quyền sở hữu được quản lý bởi giao thức Ethereum qua số dư tài khoản của bạn.                                                                                                                                           | Quyền sở hữu WETH được quản lý bởi hợp đồng thông minh WETH, bảo mật bởi giao thức Ethereum.                                                                                                                                                                |
| Gas          | Ether (ETH) được chấp nhận là phương tiện thanh toán cho việc tính toán trên mạng Ethereum. Phí Gas được tính theo đơn vị Gwei (một đơn vị của Ether).            | Trả phí Gas bằng WETH không được hỗ trợ trực tiếp.                                                                                                                                                                                                          |

## Những câu hỏi thường gặp {#faq}

<ExpandableCard title="Có tốn phí để bọc/mở bọc ETH không?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Bạn trả phí Gas cho việc bọc hoặc tháo bọc ETH sử dụng hợp đồng WETH.
</ExpandableCard>

<ExpandableCard title="WETH có an toàn không?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH nhìn chung vẫn bảo mật bởi vì nó rất đơn giản, hợp đồng thông minh đã trải qua nhiều kiểm chứng thực tế. Hợp đồng WETH cũng được kiểm chứng chính thức, đây là tiêu chuẩn bảo mật cao nhất dành cho các hợp đồng thông minh trên Ethereum.
</ExpandableCard>

<ExpandableCard title="Tại sao tôi thấy nhiều loại token WETH khác nhau?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Ngoài [bản triển khai chuẩn của WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) được mô tả trên trang này, còn có nhiều biến thể khác đang tồn tại ngoài thực tế. Chúng có thể là Token tùy chỉnh do các nhà phát triển ứng dụng tạo ra, hoặc các phiên bản phát hành trên chuỗi khối khác, và có thể hoạt động khác nhau hoặc có sự bảo mật khác biệt. **Luôn kiểm tra kỹ thông tin Token để biết chính xác bạn đang tương tác với bản triển khai WETH nào**
</ExpandableCard>

<ExpandableCard title="Hợp đồng WETH trên các mạng khác là gì?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Mạng chính Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)
</ExpandableCard>

## Đọc thêm {#further-reading}

- [WETH là cái quần gì?](https://weth.tkn.eth.limo/)
- [Thông tin về Token WETH bởi Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Kiểm chứng chính quy của WETH](https://zellic.io/blog/formal-verification-weth)
