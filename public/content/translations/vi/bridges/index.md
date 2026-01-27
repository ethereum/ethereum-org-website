---
title: Giới thiệu về cầu nối chuỗi khối
description: Cầu nối cho phép người dùng chuyển tiền của họ qua các chuỗi khối khác nhau
lang: vi
---

# Cầu nối chuỗi khối {#prerequisites}

_Web3 đã phát triển thành một hệ sinh thái gồm các chuỗi khối L1 và các giải pháp mở rộng quy mô L2, mỗi giải pháp được thiết kế với các khả năng độc nhất những đánh đổi. Khi số lượng giao thức blockchain tăng lên, nhu cầu di chuyển tài sản qua các chuỗi cũng tăng theo.Để đáp ứng nhu cầu này, chúng ta cần cầu nối._

<Divider />

## Cầu nối là gì? {#what-are-bridges}

Cầu nối chuỗi khối hoạt động tương tự những cây cầu mà ta biết trong thế giới thực. Cũng giống như một cây cầu đời thực kết nối hai địa điểm cụ thể, một cây cầu chuỗi khối kết nối hai hệ sinh thái chuỗi khối. **Cầu nối cho phép giao tiếp giữa các chuỗi khối với nhau thông qua truyền tải thông tin và tài sản**.

Cùng xem xét ví dụ sau:

Bạn đến từ Hoa Kỳ và đang lên kế hoạch cho một chuyến đi Châu Âu. Bạn có USD, nhưng bạn cần EUR để tiêu dùng. Để đổi USD lấy EUR, bạn có thể sử dụng sàn trao đổi tiền tệ với một khoản phí nhỏ.

Nhưng bạn sẽ làm gì nếu muốn thực hiện một trao đổi tương tự để sử dụng một [chuỗi khối](/glossary/#blockchain) khác? Giả sử bạn muốn trao đổi [ETH](/glossary/#ether) trên Mạng chính Ethereum để lấy ETH trên [Arbitrum](https://arbitrum.io/). Tương tự cuộc trao đổi tiền tệ mà ta đã thực hiện với đồng EUR, chúng ta cần một cơ chế để chuyển ETH của mình từ Ethereum sang Arbitrum. Cầu nối giúp một giao dịch như vậy khả thi. Trong trường hợp này, [Arbitrum có một cầu nối gốc](https://portal.arbitrum.io/bridge) có thể chuyển ETH từ Mạng chính lên Arbitrum.

## Tại sao chúng ta cần cầu nối? {#why-do-we-need-bridges}

Tất cả chuỗi khối đều có giới hạn. Để Ethereum mở rộng quy mô và đáp ứng nhu cầu, nó đã yêu cầu các [rollup](/glossary/#rollups). Ngoài ra, các L1 như Solana và Avalanche được thiết kế khác nhau để cho phép thông lượng cao hơn nhưng phải trả giá bằng sự kém phi tập trung.

Tuy nhiên, tất cả các chuỗi khối đều được phát triển trong các môi trường biệt lập và có các quy tắc cũng như cơ chế [sự đồng thuận](/glossary/#consensus) khác nhau. Điều này có nghĩa là chúng không thể giao tiếp tự nhiên và các mã thông báo không thể di chuyển tự do giữa các chuỗi khối.

Cầu tồn tại để kết nối các chuỗi khối, cho phép trao đổi thông tin và mã thông báo giữa chúng.

**Cầu nối cho phép**:

- chuyển giao tài sản và thông tin xuyên chuỗi.
- [Các ứng dụng phi tập trung](/glossary/#dapp) có thể truy cập vào thế mạnh của nhiều chuỗi khối khác nhau – do đó nâng cao khả năng của chúng (vì các giao thức hiện có nhiều không gian thiết kế hơn để đổi mới).
- người dùng truy cập các nền tảng mới và tận dụng lợi ích của các chuỗi khác nhau.
- các nhà phát triển từ các hệ sinh thái chuỗi khối khác nhau cộng tác và xây dựng các nền tảng mới cho người dùng.

[Cách bắc cầu token sang Lớp 2](/guides/how-to-use-a-bridge/)

<Divider />

## Các trường hợp sử dụng cầu nối {#bridge-use-cases}

Sau đây là một số trường hợp mà bạn có thể dùng cầu nối:

### Phí giao dịch thấp hơn {#transaction-fees}

Giả sử bạn có ETH trên Ethereum Mainnet nhưng muốn phí giao dịch rẻ hơn để khám phá các dapp khác nhau. Bằng cách bắc cầu ETH của bạn từ Mainnet sang Ethereum L2 rollip, bạn có thể tận hưởng phí giao dịch thấp hơn.

### Các ứng dụng phi tập trung trên các chuỗi khối khác {#dapps-other-chains}

Nếu bạn đang sử dụng Aave trên mạng chính Ethereum để cung cấp USDT nhưng lãi suất mà bạn nhận được khi cung cấp USDT thông qua Aave trên Polygon lại cao hơn.

### Khám phá hệ sinh thái chuỗi khối {#explore-ecosystems}

Nếu bạn có ETH trên Ethereum Mainnet và bạn muốn khám phá một L1 thay thế để thử các dapp gốc của họ. Bạn có thể sử dụng cầu nối để chuyển ETH của mình từ Ethereum Mainnet sang L1 thay thế.

### Sở hữu tài sản tiền mã hóa gốc {#own-native}

Giả sử bạn muốn sở hữu Bitcoin (BTC) gốc, nhưng bạn chỉ có tiền trên Ethereum Mainnet. Để tiếp xúc với BTC trên Ethereum, bạn có thể mua Bitcoin được bao bọc - Wrapped Bitcoin (WBTC). Tuy nhiên, WBTC là một token [ERC-20](/glossary/#erc-20) gốc của mạng Ethereum, có nghĩa là đây là phiên bản Ethereum của Bitcoin chứ không phải là tài sản gốc trên chuỗi khối Bitcoin. Để sở hữu BTC gốc, bạn sẽ phải bắc cầu tài sản của mình từ Ethereum sang Bitcoin bằng cầu nối. Hành động này sẽ bắc cầu WBTC của bạn và chuyển đổi nó thành BTC gốc. Ngoài ra, bạn có thể sở hữu BTC và muốn sử dụng nó trong các giao thức [DeFi](/glossary/#defi) của Ethereum. Điều này sẽ yêu cầu bắc cầu theo cách khác, từ BTC sang WBTC, sau đó có thể được sử dụng làm tài sản trên Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Bạn cũng có thể thực hiện tất cả những điều trên bằng cách sử dụng một [sàn giao dịch tập trung](/get-eth). Tuy nhiên, trừ khi tiền của bạn đã có sẵn trên một sàn giao dịch, nó sẽ bao gồm nhiều bước và có thể sẽ tối hơn nếu bạn sử dụng cầu nối.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Các loại cầu nối {#types-of-bridge}

Cầu nối có rất nhiều loại thiết kế và các chi tiết phức tạp. Nói chung, các cây cầu được chia thành hai loại: cầu nối tin cậy và cầu nối không cần tin cậy.

| Cầu nối cần tin cậy                                                                                                                                                                    | Cầu nối không cần tin cậy                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cầu nối cần tin cậy phụ thuộc vào một thực thể hoặc hệ thống tập trung để vận hành.                                                                                    | Cầu nối không cần tin cậy vận hành bằng các hợp đồng thông minh và thuật toán.                                                                                 |
| Họ có các giả định về niềm tin đối với việc lưu giữ tiền và sự an toàn của cây cầu. Người dùng thường phụ thuộc vào danh tiếng của người vận hành cầu. | Chúng không cần sự tin cậy, nghĩa là tính bảo mật của cây cầu giống như tính bảo mật của chuỗi khối cơ bản.                                                    |
| Người dùng phải từ bỏ quyền kiểm soát tài sản điện tử của họ.                                                                                                          | Thông qua các [hợp đồng thông minh](/glossary/#smart-contract), các cầu nối không cần tin cậy cho phép người dùng duy trì quyền kiểm soát đối với tiền của họ. |

Tóm lại, chúng ta có thể khẳng định các cầu cần tin cậy có các giả định niềm tin, trong khi các cầu không cần tin cậy phụ thuộc tối thiểu vào niềm tin và không đưa ra các giả định niềm tin mới vượt qua giả định cơ sở hạ tầng cơ bản. Các thuật ngữ có thể được mô tả như dưới đây:

- **Không cần tin cậy**: có độ bảo mật tương đương với các miền cơ sở. Như được mô tả bởi [Arjun Bhuptani trong bài viết này.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Các giả định về sự tin cậy:** loại bỏ tính bảo mật của các miền cơ sở bằng cách thêm các trình xác minh bên ngoài vào hệ thống, do đó làm cho nó kém an toàn hơn về mặt kinh tế tiền mã hóa.

Để hiểu rõ hơn về sự khác biệt chính giữa hai cách tiếp cận, hãy lấy một ví dụ:

Hãy tưởng tượng bạn đang ở trạm kiểm soát an ninh sân bay. Có hai loại trạm kiểm soát:

1. Điểm Kiểm Tra Thủ Công — được vận hành bởi các viên chức nhà nước kiểm thủ công tất cả các chi tiết về vé và danh tính của bạn trước khi giao thẻ lên máy bay.
2. Tự Check-In — được vận hành bởi một máy tính nơi bạn nhập chi tiết chuyến bay của mình và nhận thẻ lên máy bay nếu mọi thứ đều ổn.

Sử dụng cầu nối Là người dùng, bạn tin tưởng các viên chức sẽ đưa ra quyết định đúng đắn và sử dụng thông tin cá nhân của bạn một cách chính xác.

Tự check-in tương tự như mô hình không cần tin cậy vì nó loại bỏ vai trò của người điều hành và sử dụng công nghệ cho hoạt động của mình. Người dùng luôn có quyền kiểm soát dữ liệu của họ và không phải tin tưởng bên thứ ba về thông tin cá nhân của họ.

Nhiều giải pháp cầu nối áp dụng các mô hình giữa hai thái cực này với mức độ tin cậy khác nhau.

<Divider />

## Sử dụng cầu nối {#use-bridge}

Sử dụng cầu nối cho phép bạn di chuyển tài sản của mình trên các chuỗi khối khác nhau. Đây là một số nguồn giúp bạn có thể tìm và sử dụng cầu nối:

- **[Tóm tắt về các Cầu nối của L2BEAT](https://l2beat.com/bridges/summary) & [Phân tích Rủi ro về các Cầu nối của L2BEAT](https://l2beat.com/bridges/summary)**: Bản tóm tắt toàn diện về các cầu nối khác nhau, bao gồm thông tin chi tiết về thị phần, loại cầu nối và các chuỗi đích. L2BEAT cũng có phân tích về rủi ro của cầu nói, giúp người dùng có thể đưa ra lựa chọn cầu nối một cách sáng suốt.
- **[Tóm tắt cầu nối của DefiLlama](https://defillama.com/bridges/Ethereum)**: Bản tóm tắt khối lượng cầu nối trên các mạng Ethereum.

<Divider />

## Rủi ro khi sử dụng cầu nối {#bridge-risk}

Cầu đang trong giai đoạn phát triển sơ khai. Có khả năng thiết kế cầu nối tối ưu vẫn chưa được tìm ra. Tương tác với bất kỳ loại cầu nào đều có rủi ro:

- **Rủi ro hợp đồng thông minh —** rủi ro có lỗi trong mã có thể khiến tiền của người dùng bị mất
- **Rủi ro công nghệ —** lỗi phần mềm, mã có lỗi, lỗi do con người, spam và các cuộc tấn công độc hại có thể làm gián đoạn hoạt động của người dùng

Hơn nữa, vì các cây cầu cần tin cậy bổ sung các giả định niềm tin, nên chúng mang thêm các rủi ro như:

- **Rủi ro kiểm duyệt —** các nhà điều hành cầu nối về mặt lý thuyết có thể ngăn người dùng chuyển tài sản của họ bằng cách sử dụng cầu nối
- **Rủi ro lưu ký —** các nhà điều hành cầu nối có thể thông đồng để đánh cắp tiền của người dùng

Tiền của người dùng gặp nguy hiểm nếu:

- có lỗi trong hợp đồng thông minh
- người dùng gây ra lỗi
- cơ sở chuỗi khối bị hack
- người vận hành cầu có ác ý trong trường hợp cầu cần tin cậy
- cầu bị hack

Một vụ hack gần đây là vụ cầu nối Wormhole của Solana, [nơi 120 nghìn wETH (325 triệu USD) đã bị đánh cắp trong vụ hack](https://rekt.news/wormhole-rekt/). Nhiều trong số [các vụ hack hàng đầu trong chuỗi khối có liên quan đến cầu nối](https://rekt.news/leaderboard/).

Các cầu nối rất quan trọng trong việc đưa người dùng lên Ethereum L2 và cả đối với những người dùng muốn khám phá các hệ sinh thái khác nhau. Tuy nhiên, do những rủi ro liên quan đến việc tương tác với các cầu nối, người dùng phải hiểu những đánh đổi mà các cầu nối đang tạo ra. Đây là một số [chiến lược bảo mật chuỗi chéo](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Đọc thêm {#further-reading}

- [EIP-5164: Thực thi chuỗi chéo](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 tháng 6 năm 2022 - Brendan Asselstine_
- [Khuôn khổ rủi ro cầu nối L2](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 tháng 7 năm 2022 - Bartek Kiepuszewski_
- ["Tại sao tương lai sẽ là đa chuỗi, nhưng sẽ không phải là chuỗi chéo."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 tháng 1 năm 2022 - Vitalik Buterin_
- [Khai thác Bảo mật Chung để có Khả năng tương tác Chuỗi chéo An toàn: Các Ủy ban Trạng thái Lagrange và Hơn thế nữa](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 tháng 6 năm 2024 - Emmanuel Awosika_
- [Thực trạng các giải pháp tương tác Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 tháng 6 năm 2024 - Alex Hook_

