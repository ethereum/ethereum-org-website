---
title: Cách nhận biết token lừa đảo
description: Tìm hiểu về token lừa đảo, cách chúng ngụy trang thành hợp pháp và cách phòng tránh.
lang: vi
---

Một trong những ứng dụng phổ biến nhất của Ethereum là cho phép một nhóm tạo ra một token có thể giao dịch, theo một nghĩa nào đó là tiền tệ của riêng họ. Các token này thường tuân theo một tiêu chuẩn, [ERC-20](/developers/docs/standards/tokens/erc-20/). Tuy nhiên, ở bất cứ nơi nào có các trường hợp sử dụng hợp pháp mang lại giá trị, ở đó cũng có những kẻ tội phạm cố gắng đánh cắp giá trị đó cho riêng mình.

Có hai cách mà chúng có thể lừa dối bạn:

- **Bán cho bạn một token lừa đảo**, có thể trông giống như token hợp pháp mà bạn muốn mua, nhưng lại do những kẻ lừa đảo phát hành và không có giá trị gì.
- **Lừa bạn vào việc ký các giao dịch xấu**, thường bằng cách hướng bạn đến giao diện người dùng của riêng chúng. Chúng có thể cố gắng lừa bạn cấp cho các hợp đồng của chúng một hạn mức trên các token ERC-20 của bạn, làm lộ thông tin nhạy cảm giúp chúng có quyền truy cập vào tài sản của bạn, v.v. Những giao diện người dùng này có thể là bản sao gần như hoàn hảo của các trang web trung thực, nhưng chứa các thủ đoạn ẩn.

Để minh họa token lừa đảo là gì và cách nhận biết chúng, chúng ta sẽ xem xét một ví dụ: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Token này cố gắng ngụy trang giống như token [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) hợp pháp.

<ExpandableCard
title="What is ARB?"
contentPreview=''>

Arbitrum là một tổ chức phát triển và quản lý các [bản cuộn optimistic (optimistic rollups)](/developers/docs/scaling/optimistic-rollups/). Ban đầu, Arbitrum được tổ chức dưới dạng một công ty vì lợi nhuận, nhưng sau đó đã thực hiện các bước để phi tập trung hóa. Là một phần của quá trình đó, họ đã phát hành một [token quản trị](/dao/#token-based-membership) có thể giao dịch.

</ExpandableCard>

<ExpandableCard
title="Why is the scam token called wARB?"
contentPreview=''>

Có một quy ước trên Ethereum là khi một tài sản không tuân thủ ERC-20, chúng ta tạo ra một phiên bản "được bọc" (wrapped) của nó với tên bắt đầu bằng chữ "w". Vì vậy, ví dụ, chúng ta có wBTC cho bitcoin và <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH cho ether</a>.

Việc tạo ra một phiên bản được bọc của một token ERC-20 đã có sẵn trên Ethereum là không hợp lý, nhưng những kẻ lừa đảo dựa vào vẻ ngoài hợp pháp thay vì thực tế cơ bản.

</ExpandableCard>

## Token lừa đảo hoạt động như thế nào? {#how-do-scam-tokens-work}

Mục đích cốt lõi của Ethereum là sự phi tập trung. Điều này có nghĩa là không có cơ quan trung ương nào có thể tịch thu tài sản của bạn hoặc ngăn cản bạn triển khai một hợp đồng thông minh. Nhưng điều đó cũng có nghĩa là những kẻ lừa đảo có thể triển khai bất kỳ hợp đồng thông minh nào chúng muốn.

<ExpandableCard
title="What are smart contracts?"
contentPreview=''>

[Hợp đồng thông minh](/developers/docs/smart-contracts/) là các chương trình chạy trên chuỗi khối Ethereum. Ví dụ, mọi token ERC-20 đều được triển khai dưới dạng một hợp đồng thông minh.

</ExpandableCard>

Cụ thể, Arbitrum đã triển khai một hợp đồng sử dụng ký hiệu `ARB`. Nhưng điều đó không ngăn cản những người khác cũng triển khai một hợp đồng sử dụng ký hiệu giống hệt hoặc tương tự. Bất cứ ai viết hợp đồng đều có quyền thiết lập những gì hợp đồng đó sẽ làm.

## Ngụy trang thành hợp pháp {#appearing-legitimate}

Có một số thủ đoạn mà những kẻ tạo ra token lừa đảo sử dụng để trông có vẻ hợp pháp.

- **Tên và ký hiệu hợp pháp**. Như đã đề cập trước đó, các hợp đồng ERC-20 có thể có cùng ký hiệu và tên với các hợp đồng ERC-20 khác. Bạn không thể dựa vào những trường thông tin đó để đảm bảo an toàn.

- **Chủ sở hữu hợp pháp**. Các token lừa đảo thường airdrop số dư lớn đến các địa chỉ được cho là những người nắm giữ hợp pháp của token thật.

  Ví dụ, hãy xem lại `wARB`. [Khoảng 16% số token](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) được nắm giữ bởi một địa chỉ có thẻ công khai là [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Đây _không phải_ là một địa chỉ giả mạo, nó thực sự là địa chỉ đã [triển khai hợp đồng ARB thật trên mạng chính Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Bởi vì số dư ERC-20 của một địa chỉ là một phần trong bộ nhớ của hợp đồng ERC-20, nó có thể được hợp đồng chỉ định thành bất cứ thứ gì mà nhà phát triển hợp đồng muốn. Một hợp đồng cũng có thể cấm việc chuyển token để những người dùng hợp pháp sẽ không thể loại bỏ những token lừa đảo đó.

- **Các giao dịch chuyển hợp pháp**. _Những chủ sở hữu hợp pháp sẽ không trả phí để chuyển một token lừa đảo cho người khác, vì vậy nếu có các giao dịch chuyển thì nó phải là hợp pháp, đúng không?_ **Sai**. Các sự kiện `Transfer` được tạo ra bởi hợp đồng ERC-20. Một kẻ lừa đảo có thể dễ dàng viết hợp đồng theo cách mà nó sẽ tạo ra những hành động đó.

## Các trang web lừa đảo {#websites}

Những kẻ lừa đảo cũng có thể tạo ra các trang web rất thuyết phục, đôi khi thậm chí là bản sao chính xác của các trang web xác thực với giao diện người dùng giống hệt, nhưng chứa các thủ đoạn tinh vi. Ví dụ có thể là các liên kết bên ngoài có vẻ hợp pháp nhưng thực chất lại gửi người dùng đến một trang web lừa đảo bên ngoài, hoặc các hướng dẫn sai lệch dẫn dắt người dùng làm lộ khóa của họ hoặc gửi tiền đến địa chỉ của kẻ tấn công.

Cách tốt nhất để tránh điều này là kiểm tra cẩn thận URL của các trang web bạn truy cập và lưu địa chỉ của các trang web xác thực đã biết vào dấu trang (bookmarks) của bạn. Sau đó, bạn có thể truy cập trang web thật thông qua dấu trang của mình mà không vô tình mắc lỗi chính tả hoặc phụ thuộc vào các liên kết bên ngoài.

## Làm thế nào bạn có thể tự bảo vệ mình? {#protect-yourself}

1. **Kiểm tra địa chỉ hợp đồng**. Các token hợp pháp đến từ các tổ chức hợp pháp và bạn có thể xem địa chỉ hợp đồng trên trang web của tổ chức đó. Ví dụ, [đối với `ARB` bạn có thể xem các địa chỉ hợp pháp tại đây](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Token thật có thanh khoản**. Một lựa chọn khác là xem xét quy mô pool thanh khoản trên [Uniswap](https://uniswap.org/), một trong những giao thức hoán đổi token phổ biến nhất. Giao thức này hoạt động bằng cách sử dụng các pool thanh khoản, nơi các nhà đầu tư gửi token của họ vào với hy vọng nhận được lợi nhuận từ phí giao dịch.

Các token lừa đảo thường có các pool thanh khoản rất nhỏ, nếu có, bởi vì những kẻ lừa đảo không muốn mạo hiểm với tài sản thật. Ví dụ, pool Uniswap `ARB`/`ETH` nắm giữ khoảng một triệu đô la ([xem tại đây để biết giá trị cập nhật](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) và việc mua hoặc bán một lượng nhỏ sẽ không làm thay đổi giá:

![Buying a legitimate token](./uniswap-real.png)

Nhưng khi bạn cố gắng mua token lừa đảo `wARB`, ngay cả một giao dịch mua rất nhỏ cũng sẽ làm thay đổi giá hơn 90%:

![Buying a scam token](./uniswap-scam.png)

Đây là một bằng chứng khác cho chúng ta thấy `wARB` không có khả năng là một token hợp pháp.

3. **Tra cứu trên Etherscan**. Rất nhiều token lừa đảo đã được cộng đồng xác định và báo cáo. Những token như vậy được [đánh dấu trên Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Mặc dù Etherscan không phải là một nguồn sự thật có thẩm quyền (bản chất của các mạng phi tập trung là không thể có một nguồn có thẩm quyền về tính hợp pháp), nhưng các token được Etherscan xác định là lừa đảo thì rất có khả năng là lừa đảo.

   ![Scam token in Etherscan](./etherscan-scam.png)

## Kết luận {#conclusion}

Chừng nào thế giới còn có giá trị, sẽ luôn có những kẻ lừa đảo cố gắng đánh cắp nó cho riêng mình, và trong một thế giới phi tập trung, không có ai bảo vệ bạn ngoại trừ chính bạn. Hy vọng rằng bạn sẽ nhớ những điểm này để giúp phân biệt các token hợp pháp với các token lừa đảo:

- Các token lừa đảo mạo danh các token hợp pháp, chúng có thể sử dụng cùng tên, ký hiệu, v.v.
- Các token lừa đảo _không thể_ sử dụng cùng một địa chỉ hợp đồng.
- Nguồn tốt nhất để lấy địa chỉ của token hợp pháp là tổ chức sở hữu token đó.
- Nếu không có, bạn có thể sử dụng các ứng dụng phổ biến, đáng tin cậy như [Uniswap](https://app.uniswap.org/#/swap) và [Blockscout](https://eth.blockscout.com/).