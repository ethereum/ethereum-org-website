---
title: Mã thông báo không thể thay thế (NFT)
description: Tổng quan về NFT trên Ethereum
lang: vi
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /infrastructure_transparent.png
alt: Biểu trưng của Eth được hiển thị qua ảnh ba chiều.
summaryPoint1: Một cách để đại diện cho bất kỳ thứ gì độc nhất dưới dạng tài sản dựa trên Ethereum.
summaryPoint2: NFT đang mang lại nhiều quyền lực hơn cho người tạo nội dung hơn bao giờ hết.
summaryPoint3: Được hỗ trợ bởi các hợp đồng thông minh trên chuỗi khối Ethereum.
---

## What are NFTs? {#what-are-nfts}

NFT là các token độc nhất. Mỗi NFT có các thuộc tính khác nhau (không thể thay thế) và sở hữu tính khan hiếm có thể chứng minh được. Nó khác các loại token như ERC-20 mà mỗi token trong một tệp đều giống nhau y đúc và có cùng các thuộc tính ('thay thế được'). Bạn đâu để ý tờ tiền nào cùng 1 loại đang nằm trong ví của mình, bởi vì tờ tiền cùng loại cũng giống nhau và có giá trị bằng nhau. Tuy nhiên, bạn _phải_ để ý bạn đang sở hữu loại NFT nào, bởi vì chúng đều có các thuộc tính riêng khác nhau ('không thể thay thế').

Tính độc nhất của mỗi NFT cho phép chuyển hóa nhiều thứ như tác phẩm nghệ thuật, các bộ sưu tập, hoặc thậm chí là bất động sản thành token, trong đó một NFT độc nhất đại diện cho một tài sản thế giới thực hoặc một vật phẩm số. Quyền sở hữu của tài sản được bảo mật bởi chuỗi khối Ethereum – không một ai có thể chỉnh sửa chứng từ sở hữu hay sao chép/dán để cho ra đời một NFT mới.

<YouTube id="Xdkkux6OxfM" />

## Internet của tài sản {#internet-of-assets}

NFT và Ethereum giải quyết một số vấn đề mà đang hiện tại tồn tại trên mạng. Trong bối cảnh mọi thứ dần trở nên số hóa, việc mô phỏng những tính chất của các món đồ vật lý như tính khan hiếm, sự đặc trưng, và chứng từ sở hữu là một nhu cầu cần thiết. bằng một cách mà không bị kiểm soát bởi một tổ chức tập trung. Ví dự như, với NFT, bạn có thể sở hữu một tệp nhạc mp3 mà không phụ thuộc vào một ứng dụng bất kỳ của một công ty nào, hoặc bạn có thể sở hữu một cái tên trên mạng xã hội có thể bán được hoặc hoán đổi được, mà không bị một nhà cung cấp nền tảng nào tùy tiện tước đi.

Sau đây là một phép so sánh giữa Internet của NFT và Internet mà hầu hết chúng ta dang dùng ngày nay...

### Một phép so sánh {#nft-comparison}

| Internet của NFT                                                                                                                                            | Internet ngày nay                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bạn sở hữu tài sản của chính mình! Chỉ có mình bạn bán hoặc hoán đổi chúng được.                                                                            | Bạn thuê một tài sản từ một tổ chức nào đó.                                                                                                                                                                |
| NFT mang tính chất đặc trưng về số hóa, không có NFT nào là hoàn toàn giống nhau.                                                                           | Một bản sao của một thực thể thường không phân biệt được với bản gốc.                                                                                                                                      |
| Quyền sở hữu của một NFT được lưu trữ trên chuỗi khối mà bất kì ai cũng có thể xác thực được.                                                               | Chứng từ sở hữu của những sản phẩm số được lưu trữ trên máy chủ kiểm soát bởi các định chế - bạn chỉ có cách tin vào lời của họ.                                                                           |
| NFT là hợp đồng thông minh trên Ethereum. Điều này có nghĩa là chúng có thể được dùng dễ dàng trong các hợp đồng thông minh và ứng dụng khác trên Ethereum! | Các công ty với vật phẩm số thường yêu cầu cơ sở hạ tầng "khu vườn có tường rào" của riêng họ.                                                                                                             |
| Các nhà sáng tạo nội dung có thể bán sản phẩm của họ ở bất kì đâu và có thể tiếp cận với một thị trường toàn cầu.                                           | Các nhà sáng tạo nội dung dựa vào cơ sở hạ tầng và hệ thống phân phối của những nền tảng mà họ sử dụng. Phương thức này thường chịu những hạn chế liên quan đến điều khoản sử dụng và các giới hạn địa lý. |
| Nhà sáng tạo NFT có thể giữ quyền sở hữu với các tác phẩm của mình, và thiết lập phí bản quyền thẳng trong hợp đồng NFT.                                    | Các nền tảng, ví dụ như các dịch vụ phát trực tuyến âm nhạc, nắm giữ phần lớn lợi nhuận từ việc bán sản phẩm.                                                                                              |

## NFT hoạt động như thế nào? {#how-nfts-work}

Như token bất kì nào được phân phối trên Ethereum, NFT được phân phối bởi một hợp đồng thông minh. Hợp đồng thông minh tuân thủ một vài tiêu chuẩn NFT (thường là ERC-721 hoặc ERC-1155) có chức năng xác định tính năng của hợp đồng đó. Hợp đồng đó có thể tạo ra ('khởi tạo') nhiều NFT và phân bổ chúng cho một chủ sở hữu riêng biệt. Quyền sở hữu được định sẵn trong hợp đồng bằng cách liên kết các NFT cụ thể tới từng địa chỉ cụ thể. NFT có một mã ID và cũng thường có siêu dữ liệu liên kết làm cho token đó trở nên độc nhất.

Khi ai đó tạo ra hoặc khởi tạo một NFT, họ thường dùng một phương trình trong hợp đồng thông mình mà phân bổ một NFT cụ thể đó tới địa chỉ của họ. Thông tin này được lưu trữ trong kho của hợp đồng đó, mà cũng là một phần của chuỗi khối. Người sáng tạo ra hợp đồng có thể viết thêm logic vào trong hợp đồng, ví dụ như giới hạn tổng số lượng hay xác định một phí bản quyền cần trả cho người sáng tạo đó mỗi lần một token được chuyển đi.

## NFT được dùng để làm gì? {#nft-use-cases}

NFT được dùng cho nhiều thứ, bao gồm:

- chứng minh rằng bạn đã tham dự một sự kiện
- chứng nhận rằng bạn đã hoàn thành một khóa học
- những vật phẩm sở hữu được cho các trò chơi
- nghệ thuật số
- chuyển hóa các tài sản thực thành token
- chứng nhận định danh trực tuyến của bạn
- quản lý quyền truy cập vào nội dung
- quản lý vé
- tên miền mạng phi tập trung
- tài sản thế chấp trong DeFi

Có thể bạn là một nghệ sĩ muốn chia sẻ tác phẩm của mình bằng NFT mà không bị mất quyền kiểm soát chúng hoặc hy sinh lợi nhuận của mình cho các bên trung gian. Bạn có thể tạo một hợp đồng mới và định sẵn số lượng NFT, thuộc tính của chúng và một liên kết tới một tác phẩm nghệ thuật cụ thể nào đó. Là nghệ sĩ, bạn có thể lập trình vào hợp đồng thông minh phí bản quyền sẽ được trả cho bạn (ví dụ như chuyển 5% của giá bán tới người sở hữu hợp đồng mỗi lần một NFT được chuyển đi). Bạn luôn luôn có thể chứng minh rằng bạn đã tạo ra những NFT đó bởi vì bạn sở hữu ví mà triển khai hợp đồng đó. Người mua của bạn có thể dễ dàng chứng minh rằng họ sở hữu NFT xác thực từ bộ sưu tập của bạn bởi vì địa chỉ ví của họ được liên kết với một token trong hợp đồng thông minh của bạn. Họ có thể dùng nó trong hệ sinh thái Ethereum và yên tâm về tính xác thực của nó.

Hoặc xem nó như một vé tham gia một sự kiện thể thao. Giống như một nhà tổ chức sự kiện có thể lựa chọn số lượng vé sẽ bán, tác giả của một NFT có thể quyết định số lượng phiên bản NFT tồn tại. Đôi khi chúng là những phiên bản y hệt nhau, ví dụ như 5000 vé tham dự một sự kiện. Đôi khi một số khác thì được phát hành rất tương đồng nhưng mỗi phiên bản sẽ hơi khác nhau, ví dụ như mỗi tấm vé với một số ghế riêng. Những thứ này có thể được bán và mua giữa người dùng mà không phải trả tiền cho các nhà quản lí vé, và người mua luôn đảm bảo được tính xác thực của vé đó bằng cách kiểm tra địa chỉ của hợp đồng đó.

Trên ethereum.org, NFT được dùng để xác thực rằng người dùng đã đóng góp vào kho chứa GitHub của chúng tôi hoặc đã tham gia các cuộc trò chuyện, và chúng tôi thậm chí có luôn các tên miền NFT của chính mình. Nếu đóng góp cho ethereum.org, bạn có thể yêu cầu một NFT POAP. Một vài sự kiện gặp gỡ trong crypto đã dùng POAP như vé tham gia. [Đọc thêm về việc đóng góp](/contributing/#poap).

![ethereum.org POAP](./poap.png)

Trang web này cũng có một tên miền thay thế được vận hành bởi NFT, **ethereum.eth**. Địa chỉ `.org` của chúng tôi được quản lý một cách tập trung bởi một nhà cung cấp tên miền (DNS), trong khi ethereum`.eth` được đăng kí trên Ethereum thông qua Dịch vụ tên miền Ethereum (ENS). Và nó được sở hữu và quản lý bởi chúng tôi. [Hãy xem sổ lưu trữ ENS của chúng tôi](https://app.ens.domains/name/ethereum.eth)

[Đọc thêm về ENS](https://app.ens.domains)

<Divider />

### Bảo mật NFT {#nft-security}

Tính bảo mật của Ethereum đến từ cơ chế đồng thuận bằng chứng cổ phần. Hệ thống được thiết kế để ngăn chặn các hành động phá hoại kinh tế, giúp Ethereum chống được mạo danh. Đây là thứ làm cho NFT trở nên khả thi. Sau khi khối chứa giao dịch NFT của bạn được xác thực xong, kẻ tấn công sẽ tốn hàng triệu ETH để thay đổi. Bất kỳ ai chạy phần mềm Ethereum sẽ ngay lập tức có thể phát hiện tình trạng gian lận bất hợp pháp của NFT đó và kẻ tình nghi sẽ bị phạt tiền và cấm cửa vĩnh viễn.

Các vấn đề bảo mật liên quan đến NFT thường ít hay nhiều liên quan đến nạn lừa đảo, lỗ hổng hợp đồng thông minh hoặc lỗi người dùng (chẳng hạn như vô tình làm lộ khóa cá nhân), khiến cho việc bảo vệ ví điện tử trở nên cực kì quan trọng đối với chủ sở hữu NFT.

<ButtonLink to="/security/">
  Tìm hiểu thêm về bảo mật
</ButtonLink>

## Đọc thêm {#further-reading}

- [Hướng dẫn nhập môn cho NFT](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, tháng 01, 2020_
- [Công cụ theo dõi EtherscanNFT](https://etherscan.io/nft-top-contracts)
- [Tiêu chuẩn token ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Tiêu chuẩn token ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
