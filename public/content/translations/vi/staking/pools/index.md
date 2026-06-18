---
title: Đặt cọc chung
description: Tìm hiểu về các nhóm đặt cọc
lang: vi
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Tê giác Leslie đang bơi trong hồ bơi.
sidebarDepth: 2
summaryPoints:
  - Đặt cọc và kiếm phần thưởng với bất kỳ số lượng ETH nào bằng cách hợp tác với những người khác
  - Bỏ qua phần khó khăn và giao phó việc vận hành trình xác thực cho bên thứ ba
  - Giữ các token đặt cọc trong ví của riêng bạn
---

## Nhóm đặt cọc là gì? {#what-are-staking-pools}

Các nhóm đặt cọc (staking pool) là một phương pháp hợp tác cho phép nhiều người có số lượng ETH nhỏ hơn có thể đạt được 32 ETH cần thiết để kích hoạt một bộ khóa trình xác thực. Chức năng gộp chung không được hỗ trợ nguyên bản trong giao thức, vì vậy các giải pháp đã được xây dựng riêng biệt để giải quyết nhu cầu này.

Một số nhóm hoạt động bằng cách sử dụng các hợp đồng thông minh, nơi tiền có thể được gửi vào một hợp đồng, hợp đồng này quản lý và theo dõi khoản đặt cọc của bạn một cách không cần tin cậy, đồng thời phát hành cho bạn một token đại diện cho giá trị này. Các nhóm khác có thể không liên quan đến hợp đồng thông minh và thay vào đó được làm trung gian ngoài chuỗi.

## Tại sao nên đặt cọc với một nhóm? {#why-stake-with-a-pool}

Ngoài những lợi ích mà chúng tôi đã nêu trong [phần giới thiệu về đặt cọc](/staking/), việc đặt cọc với một nhóm còn mang lại một số lợi ích khác biệt.

<Grid>
  <Card title="Rào cản gia nhập thấp" emoji="🐟" description="Không phải là cá voi? Không vấn đề gì. Hầu hết các nhóm đặt cọc cho phép bạn đặt cọc hầu như bất kỳ số lượng ETH nào bằng cách hợp lực với những người đặt cọc khác, không giống như việc đặt cọc độc lập yêu cầu 32 ETH." />
  <Card title="Đặt cọc ngay hôm nay" emoji=":stopwatch:" description="Việc đặt cọc với một nhóm dễ dàng như một giao dịch hoán đổi token. Không cần lo lắng về việc thiết lập phần cứng và bảo trì nút. Các nhóm cho phép bạn nạp ETH của mình, từ đó cho phép những người vận hành nút chạy các trình xác thực. Phần thưởng sau đó được phân phối cho những người đóng góp sau khi trừ đi một khoản phí cho các hoạt động của nút." />
  <Card title="Token đặt cọc" emoji=":droplet:" description="Nhiều nhóm đặt cọc cung cấp một token đại diện cho quyền sở hữu đối với số ETH đã đặt cọc của bạn và phần thưởng mà nó tạo ra. Điều này cho phép bạn sử dụng số ETH đã đặt cọc của mình, ví dụ: làm tài sản thế chấp trong các ứng dụng DeFi." />
</Grid>

<StakingComparison page="pools" />

## Những điều cần cân nhắc {#what-to-consider}

Việc đặt cọc chung hoặc ủy quyền không được hỗ trợ nguyên bản bởi giao thức [Ethereum](/), nhưng do nhu cầu của người dùng muốn đặt cọc ít hơn 32 ETH, ngày càng có nhiều giải pháp được xây dựng để phục vụ nhu cầu này.

Mỗi nhóm và các công cụ hoặc hợp đồng thông minh mà họ sử dụng đã được xây dựng bởi các nhóm khác nhau, và mỗi nhóm đều đi kèm với những lợi ích và rủi ro. Các nhóm cho phép người dùng hoán đổi ETH của họ lấy một token đại diện cho ETH đã đặt cọc. Token này rất hữu ích vì nó cho phép người dùng hoán đổi bất kỳ số lượng ETH nào thành một lượng tương đương của token sinh lời, tạo ra lợi nhuận từ phần thưởng đặt cọc được áp dụng cho ETH đã đặt cọc cơ sở (và ngược lại) trên các sàn giao dịch phi tập trung mặc dù ETH thực tế vẫn được đặt cọc trên lớp đồng thuận. Điều này có nghĩa là việc hoán đổi qua lại giữa sản phẩm ETH đã đặt cọc sinh lời và "ETH thô" diễn ra nhanh chóng, dễ dàng và không chỉ khả dụng ở các bội số của 32 ETH.

Tuy nhiên, các token ETH đã đặt cọc này có xu hướng tạo ra các hành vi giống như độc quyền, trong đó một lượng lớn ETH đã đặt cọc cuối cùng nằm dưới sự kiểm soát của một vài tổ chức tập trung thay vì trải rộng trên nhiều cá nhân độc lập. Điều này tạo điều kiện cho sự kiểm duyệt hoặc trích xuất giá trị. Tiêu chuẩn vàng cho việc đặt cọc phải luôn là các cá nhân chạy các trình xác thực trên phần cứng của riêng họ bất cứ khi nào có thể.

[Tìm hiểu thêm về rủi ro của các token đặt cọc](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Các chỉ báo thuộc tính được sử dụng bên dưới để báo hiệu những điểm mạnh hoặc điểm yếu đáng chú ý mà một nhóm đặt cọc được liệt kê có thể có. Hãy sử dụng phần này làm tài liệu tham khảo về cách chúng tôi định nghĩa các thuộc tính này trong khi bạn đang chọn một nhóm để tham gia.

<StakingConsiderations page="pools" />

## Khám phá các nhóm đặt cọc {#explore-staking-pools}

Có nhiều tùy chọn có sẵn để giúp bạn thiết lập. Sử dụng các chỉ báo ở trên để giúp hướng dẫn bạn qua các công cụ bên dưới.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Xin lưu ý tầm quan trọng của việc chọn một dịch vụ coi trọng [sự đa dạng máy khách](/developers/docs/nodes-and-clients/client-diversity/), vì nó cải thiện tính bảo mật của mạng lưới và hạn chế rủi ro của bạn. Các dịch vụ có bằng chứng về việc hạn chế sử dụng máy khách chiếm đa số được biểu thị bằng <em style={{ textTransform: "uppercase" }}>"sự đa dạng máy khách thực thi"</em> và <em style={{ textTransform: "uppercase" }}>"sự đa dạng ứng dụng khách đồng thuận".</em>

Bạn có đề xuất về một công cụ đặt cọc mà chúng tôi đã bỏ lỡ? Hãy xem [chính sách niêm yết sản phẩm](/contributing/adding-staking-products/) của chúng tôi để xem liệu nó có phù hợp hay không và gửi nó để được xem xét.

## Câu hỏi thường gặp {#faq}

<ExpandableCard title="Làm cách nào để tôi kiếm được phần thưởng?">
Thông thường, các token đặt cọc ERC-20 được phát hành cho những người đặt cọc và đại diện cho giá trị ETH đã đặt cọc của họ cộng với phần thưởng. Hãy nhớ rằng các nhóm khác nhau sẽ phân phối phần thưởng đặt cọc cho người dùng của họ thông qua các phương pháp hơi khác nhau, nhưng đây là chủ đề chung.
</ExpandableCard>

<ExpandableCard title="Khi nào tôi có thể rút khoản đặt cọc của mình?">
Ngay bây giờ! Bản nâng cấp mạng lưới Thượng Hải/Capella đã diễn ra vào tháng 4 năm 2023 và giới thiệu tính năng rút tiền đặt cọc. Các tài khoản trình xác thực hỗ trợ các nhóm đặt cọc hiện có khả năng thoát và rút ETH về địa chỉ rút tiền được chỉ định của họ. Điều này cho phép khả năng đổi phần đặt cọc của bạn lấy ETH cơ sở. Hãy kiểm tra với nhà cung cấp của bạn để xem họ hỗ trợ chức năng này như thế nào.

Ngoài ra, các nhóm sử dụng token đặt cọc ERC-20 cho phép người dùng giao dịch token này trên thị trường mở, cho phép bạn bán vị thế đặt cọc của mình, thực chất là "rút tiền" mà không thực sự loại bỏ ETH khỏi hợp đồng đặt cọc.

<ButtonLink href="/staking/withdrawals/">Tìm hiểu thêm về rút tiền đặt cọc</ButtonLink>
</ButtonLink>

<ExpandableCard title="Điều này có khác với việc đặt cọc trên sàn giao dịch của tôi không?">
Có nhiều điểm tương đồng giữa các tùy chọn đặt cọc chung này và các sàn giao dịch tập trung, chẳng hạn như khả năng đặt cọc số lượng nhỏ ETH và gộp chúng lại với nhau để kích hoạt các trình xác thực.

Không giống như các sàn giao dịch tập trung, nhiều tùy chọn đặt cọc chung khác sử dụng các hợp đồng thông minh và/hoặc token đặt cọc, thường là các token ERC-20 có thể được giữ trong ví của riêng bạn và được mua hoặc bán giống như bất kỳ token nào khác. Điều này cung cấp một lớp chủ quyền và bảo mật bằng cách cung cấp cho bạn quyền kiểm soát các token của mình, nhưng vẫn không cung cấp cho bạn quyền kiểm soát trực tiếp đối với máy khách trình xác thực đang chứng thực thay mặt bạn ở chế độ nền.

Một số tùy chọn gộp chung phi tập trung hơn những tùy chọn khác khi nói đến các nút hỗ trợ chúng. Để thúc đẩy sức khỏe và sự phi tập trung của mạng lưới, những người đặt cọc luôn được khuyến khích chọn một dịch vụ gộp chung cho phép một tập hợp các nhà điều hành nút phi tập trung không cần cấp phép.
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Danh mục đặt cọc Ethereum](https://www.staking.directory/) - _Eridian và Spacesider_
- [Đặt cọc với Rocket Pool - Tổng quan về đặt cọc](https://docs.rocketpool.net/guides/staking/overview.html) - _Tài liệu RocketPool_
- [Đặt cọc Ethereum với Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Tài liệu trợ giúp Lido_