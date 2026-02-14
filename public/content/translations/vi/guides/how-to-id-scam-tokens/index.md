---
title: "Cách để nhận biết những token lừa đảo"
description: "Tìm hiểu về những token lừa đảo, cách làm cho chúng trở nên hợp pháp hóa, và cách để phòng tránh chúng."
lang: vi
---

# Cách nhận diện token lừa đảo {#identify-scam-tokens}

Một trong những ứng dụng cho Ethereum đó là cho một nhóm tạo ra Token có thể giao dịch, nói đơn giản là tiền tệ của riêng họ. Các token này thường tuân theo một tiêu chuẩn, [ERC-20](/developers/docs/standards/tokens/erc-20/). Tuy nhiên, bất kỳ nơi nào có các trường hợp sử dụng hợp pháp mang lại giá trị, cũng có những tên tội phạm cố gắng đánh cắp giá trị đó cho riêng họ.

Có hai cách mà họ có thể đã sử dụng để lừa bạn:

- **Bán cho bạn một token lừa đảo**, có thể trông giống như token hợp pháp mà bạn muốn mua, nhưng được những kẻ lừa đảo phát hành và không có giá trị.
- **Lừa bạn ký các giao dịch xấu**, thường bằng cách hướng bạn vào giao diện người dùng của họ. Họ có thể cố gắng yêu cầu bạn cấp cho hợp đồng của họ một khoản trợ cấp đối với mã thông báo ERC-20 của bạn, tiết lộ thông tin nhạy cảm cho phép họ truy cập vào tài sản của bạn, v.v. Những giao diện người dùng này có thể là bản sao gần như hoàn hảo của các trang web trung thực nhưng có những thủ thuật ẩn.

Để minh họa token lừa đảo là gì và cách nhận diện chúng, chúng ta sẽ xem xét một ví dụ: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Token này cố gắng trông giống như token [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) hợp pháp.

<ExpandableCard
title="ARB là gì?"
contentPreview=''>

Arbitrum là một tổ chức phát triển và quản lý [optimistic rollups](/developers/docs/scaling/optimistic-rollups/). Ban đầu, Arbitrum được tổ chức như một công ty vì lợi nhuận, nhưng sau đó đã thực hiện các bước phân cấp. Cũng như một phần của quá trình đó, họ giới thiệu về một [Token quản trị](/dao/#token-based-membership).
</ExpandableCard>

<ExpandableCard
title="Tại sao token lừa đảo lại có tên là wARB?"
contentPreview=''>

Có một quy ước trong Ethereum là khi một nội dung không tuân thủ ERC-20, chúng tôi sẽ tạo một phiên bản "được bao bọc" của nội dung đó với tên bắt đầu bằng "w". Vì vậy, ví dụ: chúng ta có wBTC cho bitcoin và <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH cho ether</a>.

Không có ý nghĩa gì khi tạo ra một phiên bản được gói của mã thông báo ERC-20 đã có trên Ethereum, nhưng những kẻ lừa đảo dựa vào sự xuất hiện của tính hợp pháp hơn là thực tế cơ bản.
</ExpandableCard>

## Làm thế nào để các mã thông báo lừa đảo hoạt động? {#how-do-scam-tokens-work}

Mục đích chính của Ethereum là mạng lưới phi tập trung. Điều đó có nghĩa là sẽ không có cơ quan tập trung nào có quyền tịch thu tài sản của bạn hoặc ngan cản bạn triển khai hợp đồng thông minh. Nhưng điều đó cũng đồng nghĩa là những người lừa đảo cũng có quyền triển khai hợp đồng thông minh theo họ muốn.

<ExpandableCard
title="Hợp đồng thông minh là gì?"
contentPreview=''>

[Hợp đồng thông minh](/developers/docs/smart-contracts/) là các chương trình chạy trên chuỗi khối Ethereum. Mọi ERC-20 token, ví dụ, đều được triển khải như một hợp đồng thông minh.
</ExpandableCard>

Cụ thể, Arbitrum đã triển khai một hợp đồng sử dụng ký hiệu `ARB`. Nhưng điều đó không có ngan cản mọi người phát triển một hợp đồng sử dụng giống ký hiệu hoặc tương tự. Bất kỳ ai viết hợp đồng sẽ được quyết đinh hợp đồng đó sẽ làm gì.

## Trông có vẻ hợp pháp {#appearing-legitimate}

Có một số chiêu trò mà những người tạo mã thông báo lừa đảo sử dụng để xuất hiện hợp pháp.

- **Chứng minh tên và giấu hiệu**. Như đã đề cập trước đó, hợp đồng ERC-20 có thể có cùng ký hiệu và tên như các hợp đồng ERC-20 khác. Bạn không thể dựa vào cách đánh giá đó cho bảo chứng.

- **Chuyển khoản chính thống**. Đồng lừa đảo thường chuyển vào số dư đáng kể tới các địa chỉ được coi là người nắm giữ hợp phát của đồng thật.

  Ví dụ, chúng ta hãy xem lại `wARB`. [Khoảng 16% số token](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) được nắm giữ bởi một địa chỉ có thẻ công khai là [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Đây _không phải_ là một địa chỉ giả, nó thực sự là địa chỉ đã [triển khai hợp đồng ARB thật trên mạng chính Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Tài vì số dư của ERC-20 là một phần của địa chỉ của hợp đồng lưu trữ dự liệu của ERC-20, nó theo có thể quy định bất cứ điều gì mà nhà phát triển hợp đồng mong muốn. Một hợp đồng cũng có thể cấm chuyển Token, khiến người dùng hợp pháp không thể thoát khỏi các Token lừa đảo đó.

- **Giao dịch hợp lệ**. _Chủ sở hữu hợp pháp sẽ không trả tiền để chuyển một token lừa đảo cho người khác, vậy nên nếu có các giao dịch chuyển tiền, hẳn là nó hợp pháp, phải không?_ **Sai**. Các sự kiện `Transfer` được tạo ra bởi hợp đồng ERC-20. Các kẻ lừa đảo có thể dễ dàng viết hợp đồng để nó tạo ra những giao dịch đấy.

## Các trang web lừa đảo {#websites}

Kẻ lừa đảo thường tạo ra những Website trông uy tín, đôi khi là bản sao chép tinh vi từ trang chính thống với giao diện tương tự, nhưng chứa những mánh khóe tinh vi. Ví dụ có thể một liên kết bên ngoài trông có vẻ uy tín nhưng thực chất dẫn người dùng đến trang lừa đảo, hoặc các hướng dẫn sai khiến người dùng lộ khóa riêng tư hoặc gửi tiền đến địa chỉ của kẻ tấn công.

Cách tốt nhất để tránh điều này là kiểm tra cẩn thận URL của trang mà bạn truy cập và lưu địa chỉ của trang chính thống trên dấu trang. Sau đó bạn có thể truy cập trang chính thống qua dấu trang mà không vô tình đánh vần sai hoặc phụ thuộc vào đường dẫn ngoài.

## Làm sao bạn có thể bảo vệ bản thân? {#protect-yourself}

1. **Kiểm tra địa chỉ hợp đồng**. Những Token hợp lệ đến từ những tổ chức hợp phá và bạn phải xem địa chỉ hợp đồng ngay trên trang chính thống của tổ chức. Ví dụ, [đối với `ARB`, bạn có thể xem các địa chỉ hợp pháp tại đây](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Token thực sự có tính thanh khoảng**. Một lựa chọn khác là xem xét quy mô bể thanh khoản trên [Uniswap](https://uniswap.org/), một trong những giao thức hoán đổi token phổ biến nhất. Giao thức này hoạt động bằng cách sử dụng quỹ thanh khoản nơi mà các nhà đầu tư gửi Token với hi vọng thu lợi từ phí giao dịch.

Những Token lừa đảo thường có quỹ thanh khoảng nhỏ, hoặc trống rỗng, bởi vì những kẻ lừa đảo không muốn rủi ro tài sản thực. Ví dụ: bể thanh khoản `ARB`/`ETH` của Uniswap nắm giữ khoảng một triệu đô la ([xem giá trị cập nhật tại đây](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) và việc mua hoặc bán một lượng nhỏ sẽ không làm thay đổi giá:

![Mua một token hợp pháp](./uniswap-real.png)

Nhưng khi bạn cố gắng mua token lừa đảo `wARB`, ngay cả một giao dịch mua nhỏ cũng sẽ làm thay đổi giá hơn 90%:

![Mua một token lừa đảo](./uniswap-scam.png)

Đây là một bằng chứng khác cho thấy `wARB` không có khả năng là một token hợp pháp.

3. **Xem trên EtherScan**. Rất nhiều lừa đảo Token đã được nhận diện và báo cáo bởi cộng đồng. Các token như vậy được [đánh dấu trong Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Trong khi Etherscan không phải là nguồn xác thực tuyệt đối (vì bản chất mạng phi tập trung là không có nguồn nào định đoạt tính hợp pháp), Token được nhận diện là lừa đảo trên Etherscan thường là lừa đảo.

   ![Token lừa đảo trong Etherscan](./etherscan-scam.png)

## Kết luận {#conclusion}

Miễn là trên thế giới còn tồn tại tài sản giá trị, sẽ luôn có những kẻ lừa đảo cố gắng đánh cắp cho riêng mình, và trong một thế giới phi tập trung, không ai bảo vệ bạn ngoài chính bạn. Mong rằng, bạn sẽ nhớ những điểm này để giúp phân biệt Token hợp pháp khỏi những lừa đảo:

- Các Token lừa đảo giả mạo Token hợp pháp, có thể sử dụng cùng tên, ký hiệu,...
- Các token lừa đảo _không thể_ sử dụng cùng một địa chỉ hợp đồng.
- Nguồn tốt nhất để lấy địa chỉ token hợp pháp là chính tổ chức phát hành token đó.
- Nếu không được, bạn có thể sử dụng các ứng dụng phổ biến, đáng tin cậy như [Uniswap](https://app.uniswap.org/#/swap) và [Blockscout](https://eth.blockscout.com/).
