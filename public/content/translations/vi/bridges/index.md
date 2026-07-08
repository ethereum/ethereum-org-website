---
title: Cầu nối chuỗi khối
metaTitle: Giới thiệu về cầu nối chuỗi khối
description: Cầu nối cho phép người dùng chuyển tiền của họ qua các chuỗi khối khác nhau
lang: vi
---

_Web3 đã phát triển thành một hệ sinh thái gồm các chuỗi khối lớp 1 (l1) và các giải pháp mở rộng quy mô lớp 2 (l2), mỗi giải pháp được thiết kế với các khả năng và sự đánh đổi riêng. Khi số lượng các giao thức chuỗi khối tăng lên, nhu cầu chuyển tài sản qua các chuỗi cũng tăng theo. Để đáp ứng nhu cầu này, chúng ta cần các cầu nối._

<Divider />

## Cầu nối là gì? {#what-are-bridges}

Các cầu nối chuỗi khối hoạt động giống như những cây cầu mà chúng ta biết trong thế giới thực. Giống như một cây cầu vật lý kết nối hai địa điểm vật lý, một cầu nối chuỗi khối kết nối hai hệ sinh thái chuỗi khối. **Cầu nối tạo điều kiện giao tiếp giữa các chuỗi khối thông qua việc chuyển thông tin và tài sản**.

Hãy xem xét một ví dụ:

Bạn đến từ Hoa Kỳ và đang lên kế hoạch cho một chuyến đi đến Châu Âu. Bạn có USD, nhưng bạn cần EUR để chi tiêu. Để đổi USD sang EUR, bạn có thể sử dụng dịch vụ thu đổi ngoại tệ với một khoản phí nhỏ.

Nhưng, bạn sẽ làm gì nếu muốn thực hiện một giao dịch trao đổi tương tự để sử dụng một [chuỗi khối](/glossary/#blockchain) khác? Giả sử bạn muốn đổi [ETH](/glossary/#ether) trên Mạng chính [Ethereum](/) lấy ETH trên [Arbitrum](https://arbitrum.io/). Giống như việc thu đổi ngoại tệ mà chúng ta đã thực hiện cho EUR, chúng ta cần một cơ chế để chuyển ETH của mình từ Ethereum sang Arbitrum. Các cầu nối làm cho một giao dịch như vậy trở nên khả thi. Trong trường hợp này, [Arbitrum có một cầu nối gốc](https://portal.arbitrum.io/bridge) có thể chuyển ETH từ Mạng chính sang Arbitrum.

## Tại sao chúng ta cần cầu nối? {#why-do-we-need-bridges}

Tất cả các chuỗi khối đều có những hạn chế riêng. Để Ethereum mở rộng quy mô và theo kịp nhu cầu, nó đã yêu cầu các [bản cuộn](/glossary/#rollups). Mặt khác, các lớp 1 (l1) như Solana và Avalanche được thiết kế khác biệt để cho phép thông lượng cao hơn nhưng phải đánh đổi bằng sự phi tập trung.

Tuy nhiên, tất cả các chuỗi khối đều được phát triển trong các môi trường biệt lập và có các quy tắc cũng như cơ chế [đồng thuận](/glossary/#consensus) khác nhau. Điều này có nghĩa là chúng không thể giao tiếp nguyên bản và các token không thể di chuyển tự do giữa các chuỗi khối.

Các cầu nối tồn tại để kết nối các chuỗi khối, cho phép chuyển thông tin và token giữa chúng.

**Cầu nối cho phép**:

- chuyển tài sản và thông tin chuỗi chéo.
- các [ứng dụng phi tập trung (dapp)](/glossary/#dapp) tiếp cận thế mạnh của nhiều chuỗi khối khác nhau – từ đó nâng cao khả năng của chúng (vì các giao thức hiện có nhiều không gian thiết kế hơn để đổi mới).
- người dùng truy cập các nền tảng mới và tận dụng lợi ích của các chuỗi khác nhau.
- các nhà phát triển từ các hệ sinh thái chuỗi khối khác nhau hợp tác và xây dựng các nền tảng mới cho người dùng.

[Cách chuyển token sang lớp 2 (l2)](/guides/how-to-use-a-bridge/)

<Divider />

## Các trường hợp sử dụng cầu nối {#bridge-use-cases}

Dưới đây là một số kịch bản mà bạn có thể sử dụng cầu nối:

### Phí giao dịch thấp hơn {#transaction-fees}

Giả sử bạn có ETH trên Mạng chính Ethereum nhưng muốn phí giao dịch rẻ hơn để khám phá các dapp khác nhau. Bằng cách chuyển ETH của bạn từ Mạng chính sang một bản cuộn lớp 2 (l2) của Ethereum, bạn có thể tận hưởng mức phí giao dịch thấp hơn.

### Các dapp trên các chuỗi khối khác {#dapps-other-chains}

Nếu bạn đang sử dụng Aave trên Mạng chính Ethereum để cung cấp USDT nhưng lãi suất bạn có thể nhận được khi cung cấp USDT bằng Aave trên Polygon lại cao hơn.

### Khám phá các hệ sinh thái chuỗi khối {#explore-ecosystems}

Nếu bạn có ETH trên Mạng chính Ethereum và bạn muốn khám phá một l1 thay thế để dùng thử các dapp gốc của họ. Bạn có thể sử dụng một cầu nối để chuyển ETH của mình từ Mạng chính Ethereum sang l1 thay thế đó.

### Sở hữu tài sản tiền mã hóa gốc {#own-native}

Giả sử bạn muốn sở hữu Bitcoin (BTC) gốc, nhưng bạn chỉ có tiền trên Mạng chính Ethereum. Để tiếp cận với BTC trên Ethereum, bạn có thể mua Wrapped Bitcoin (WBTC). Tuy nhiên, WBTC là một token [ERC-20](/glossary/#erc-20) gốc trên mạng lưới Ethereum, điều đó có nghĩa nó là một phiên bản Ethereum của Bitcoin chứ không phải là tài sản nguyên bản trên chuỗi khối Bitcoin. Để sở hữu BTC gốc, bạn sẽ phải chuyển tài sản của mình từ Ethereum sang Bitcoin bằng cách sử dụng một cầu nối. Điều này sẽ chuyển WBTC của bạn và chuyển đổi nó thành BTC gốc. Ngoài ra, bạn có thể sở hữu BTC và muốn sử dụng nó trong các giao thức [tài chính phi tập trung (DeFi)](/glossary/#defi) của Ethereum. Điều này sẽ yêu cầu chuyển theo chiều ngược lại, từ BTC sang WBTC, sau đó có thể được sử dụng như một tài sản trên Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Bạn cũng có thể thực hiện tất cả những điều trên bằng cách sử dụng một [sàn giao dịch tập trung](/get-eth). Tuy nhiên, trừ khi tiền của bạn đã nằm sẵn trên một sàn giao dịch, việc này sẽ bao gồm nhiều bước và có lẽ bạn nên sử dụng một cầu nối thì tốt hơn.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Các loại cầu nối {#types-of-bridge}

Cầu nối có nhiều kiểu thiết kế và sự phức tạp khác nhau. Nhìn chung, cầu nối được chia thành hai loại: cầu nối tin cậy và cầu nối không cần tin cậy.

| Cầu nối tin cậy (Trusted Bridges)                                                                                                                                         | Cầu nối không cần tin cậy (Trustless Bridges)                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Các cầu nối tin cậy phụ thuộc vào một thực thể hoặc hệ thống trung tâm cho các hoạt động của chúng.                                                                            | Các cầu nối không cần tin cậy hoạt động bằng cách sử dụng các hợp đồng thông minh và thuật toán.                                        |
| Chúng có các giả định tin cậy liên quan đến việc lưu ký tiền và tính bảo mật của cầu nối. Người dùng chủ yếu dựa vào danh tiếng của nhà điều hành cầu nối. | Chúng không cần tin cậy, tức là tính bảo mật của cầu nối giống hệt như tính bảo mật của chuỗi khối cơ sở. |
| Người dùng cần từ bỏ quyền kiểm soát tài sản tiền mã hóa của họ.                                                                                                   | Thông qua các [hợp đồng thông minh](/glossary/#smart-contract), các cầu nối không cần tin cậy cho phép người dùng duy trì quyền kiểm soát tiền của họ.           |

Tóm lại, chúng ta có thể nói rằng các cầu nối tin cậy có các giả định tin cậy, trong khi các cầu nối không cần tin cậy được tối thiểu hóa niềm tin và không tạo ra các giả định tin cậy mới ngoài những giả định của các miền cơ sở. Dưới đây là cách mô tả các thuật ngữ này:

- **Không cần tin cậy**: có tính bảo mật tương đương với các miền cơ sở. Như được mô tả bởi [Arjun Bhuptani trong bài viết này.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Giả định tin cậy:** rời xa tính bảo mật của các miền cơ sở bằng cách thêm các trình xác minh bên ngoài vào hệ thống, do đó làm cho nó kém an toàn hơn về mặt kinh tế mã hóa.

Để hiểu rõ hơn về những điểm khác biệt chính giữa hai cách tiếp cận này, hãy lấy một ví dụ:

Hãy tưởng tượng bạn đang ở điểm kiểm tra an ninh sân bay. Có hai loại điểm kiểm tra:

1. Điểm kiểm tra thủ công — được vận hành bởi các nhân viên, những người sẽ kiểm tra thủ công tất cả các chi tiết trên vé và danh tính của bạn trước khi giao thẻ lên máy bay.
2. Tự làm thủ tục (Self Check-In) — được vận hành bởi một máy tự động, nơi bạn nhập thông tin chuyến bay của mình và nhận thẻ lên máy bay nếu mọi thứ đều hợp lệ.

Một điểm kiểm tra thủ công tương tự như một mô hình tin cậy vì nó phụ thuộc vào một bên thứ ba, tức là các nhân viên, cho các hoạt động của nó. Là một người dùng, bạn tin tưởng các nhân viên sẽ đưa ra quyết định đúng đắn và sử dụng thông tin cá nhân của bạn một cách chính xác.

Tự làm thủ tục tương tự như một mô hình không cần tin cậy vì nó loại bỏ vai trò của người vận hành và sử dụng công nghệ cho các hoạt động của nó. Người dùng luôn duy trì quyền kiểm soát dữ liệu của họ và không phải tin tưởng giao thông tin cá nhân của mình cho một bên thứ ba.

Nhiều giải pháp cầu nối áp dụng các mô hình nằm giữa hai thái cực này với các mức độ của tính không cần niềm tin khác nhau.

<Divider />

## Sử dụng cầu nối {#use-bridge}

Việc sử dụng cầu nối cho phép bạn chuyển tài sản của mình qua các chuỗi khối khác nhau. Dưới đây là một số tài nguyên có thể giúp bạn tìm và sử dụng các cầu nối:

- **[Tóm tắt các cầu nối của L2BEAT](https://l2beat.com/bridges/summary) & [Phân tích rủi ro các cầu nối của L2BEAT](https://l2beat.com/bridges/summary)**: Một bản tóm tắt toàn diện về các cầu nối khác nhau, bao gồm thông tin chi tiết về thị phần, loại cầu nối và các chuỗi đích. L2BEAT cũng có một bản phân tích rủi ro cho các cầu nối, giúp người dùng đưa ra quyết định sáng suốt khi lựa chọn một cầu nối.
- **[Tóm tắt cầu nối của DefiLlama](https://defillama.com/bridges/Ethereum)**: Một bản tóm tắt về khối lượng giao dịch qua cầu nối trên các mạng lưới Ethereum.

<Divider />

## Rủi ro khi sử dụng cầu nối {#bridge-risk}

Các cầu nối đang ở trong giai đoạn phát triển ban đầu. Rất có thể thiết kế cầu nối tối ưu vẫn chưa được khám phá ra. Việc tương tác với bất kỳ loại cầu nối nào cũng đều tiềm ẩn rủi ro:

- **Rủi ro hợp đồng thông minh —** rủi ro có lỗi trong mã code có thể khiến tiền của người dùng bị mất
- **Rủi ro công nghệ —** lỗi phần mềm, mã code có lỗi, lỗi do con người, thư rác và các cuộc tấn công độc hại có thể làm gián đoạn các hoạt động của người dùng

Hơn nữa, vì các cầu nối tin cậy thêm vào các giả định tin cậy, chúng mang theo những rủi ro bổ sung như:

- **Rủi ro kiểm duyệt —** về mặt lý thuyết, các nhà điều hành cầu nối có thể ngăn chặn người dùng chuyển tài sản của họ bằng cách sử dụng cầu nối
- **Rủi ro lưu ký —** các nhà điều hành cầu nối có thể thông đồng để đánh cắp tiền của người dùng

Tiền của người dùng sẽ gặp rủi ro nếu:

- có lỗi trong hợp đồng thông minh
- người dùng mắc lỗi
- chuỗi khối cơ sở bị hack
- các nhà điều hành cầu nối có ý đồ xấu trong một cầu nối tin cậy
- cầu nối bị hack

Một vụ hack gần đây là cầu nối Wormhole của Solana, [nơi 120 nghìn wETH (325 triệu USD) đã bị đánh cắp trong vụ hack](https://rekt.news/wormhole-rekt/). Nhiều [vụ hack lớn nhất trong các chuỗi khối có liên quan đến cầu nối](https://rekt.news/leaderboard/).

Cầu nối rất quan trọng đối với việc tiếp nhận người dùng vào các lớp 2 (l2) của Ethereum, và ngay cả đối với những người dùng muốn khám phá các hệ sinh thái khác nhau. Tuy nhiên, với những rủi ro liên quan đến việc tương tác với các cầu nối, người dùng phải hiểu được những sự đánh đổi mà các cầu nối đang thực hiện. Dưới đây là một số [chiến lược cho bảo mật chuỗi chéo](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Đọc thêm {#further-reading}
- [EIP-5164: Thực thi chuỗi chéo](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 tháng 6, 2022 - Brendan Asselstine_
- [Khung rủi ro L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 tháng 7, 2022 - Bartek Kiepuszewski_
- ["Tại sao tương lai sẽ là đa chuỗi, nhưng sẽ không phải là chuỗi chéo."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 tháng 1, 2022 - Vitalik Buterin_
- [Khai thác bảo mật chia sẻ cho khả năng tương tác chuỗi chéo an toàn: Các ủy ban trạng thái Lagrange và hơn thế nữa](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 tháng 6, 2024 - Emmanuel Awosika_
- [Trạng thái của các giải pháp khả năng tương tác Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 tháng 6, 2024 - Alex Hook_