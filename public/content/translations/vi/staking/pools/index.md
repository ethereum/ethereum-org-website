---
title: Staking chung
description: "Tìm hiểu thêm về bể cổ phần"
lang: vi
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: "Chú tê giác Leslie đang bơi trong bể."
sidebarDepth: 2
summaryPoints:
  - Đặt cọc và nhận thưởng với số lượng ETH bất kỳ bằng cách tham gia cùng những người khác
  - Bỏ qua phần phức tạp và giao phó việc điều hành nút xác thực cho bên thứ ba
  - Giữ các token đã góp trong ví riêng
---

## Nhóm đặt cọc là gì? {#what-are-staking-pools}

Nhóm đặt cọc là phương pháp mang tính hợp tác cho phép nhiều chủ sở hữu số lượng ETH nhỏ có thể đạt đến 32 ETH theo yêu cầu để kích hoạt một nhóm khóa xác thực. Phương pháp đặt cọc theo nhóm không được hỗ trợ ngay từ đầu trong giao thức, vì vậy các giải pháp đã được xây dựng một cách độc lập để đáp ứng nhu cầu này.

Một số nhóm vận hành bằng hợp đồng thông minh, trong đó tiền có thể được đặt cọc vào một hợp đồng, hợp đồng này sẽ quản lí và theo dõi số tiền bạn đã góp và cấp cho bạn 1 token với giá trị tương đương. Các bể khác có thể không liên quan đến hợp đồng thông minh và thay vào đó được điều phối ngoài chuỗi.

## Tại sao cần đặt cọc theo nhóm? {#why-stake-with-a-pool}

Ngoài những lợi ích mà chúng tôi đã nêu trong [phần giới thiệu về đặt cọc](/staking/), việc đặt cọc theo nhóm còn đi kèm với một số lợi ích riêng biệt.

<CardGrid>
  <Card title="Dễ dàng tham gia" emoji="🐟" description="Không phải 'cá voi'? Không vấn đề. Hầu hết các nhóm đặt cọc cho phép bạn tham gia với gần như bất kỳ lượng ETH nào bằng cách gộp chung với những người khác, không giống như việc tự đặt cọc vốn yêu cầu 32 ETH." />
  <Card title="Đặt cọc ngay hôm nay" emoji=":stopwatch:" description="Đặt cọc qua nhóm dễ như hoán đổi token. Bạn không cần lo về việc thiết lập phần cứng và bảo trì node. Các nhóm cho phép bạn gửi ETH của mình để người vận hành node chạy trình xác thực. Phần thưởng sau đó sẽ được phân phối cho những người đóng góp sau khi trừ phí vận hành node." />
  <Card title="Token đặt cọc" emoji=":droplet:" description="Nhiều nhóm đặt cọc cung cấp một token đại diện cho quyền sở hữu đối với ETH đã đặt cọc của bạn và phần thưởng mà nó tạo ra. Điều này cho phép bạn sử dụng ETH đã đặt cọc của mình, ví dụ, làm tài sản thế chấp trong các ứng dụng DeFi." />
</CardGrid>

<StakingComparison page="pools" />

## Những điều cần cân nhắc {#what-to-consider}

Đặt cọc theo nhóm hoặc đặt cọc ủy quyền không được giao thức Ethereum hỗ trợ ngay từ đầu, nhưng với nhu cầu góp dưới 32 ETH của người dùng, ngày càng nhiều giải pháp đã được xây dựng để phục vụ nhu cầu này.

Mỗi nhóm cùng các công cụ hoặc hợp đồng thông minh đi kèm đều được phát triển bởi các đội ngũ khác nhau, mỗi nhóm có những lợi ích và rủi ro riêng biệt. Nhóm cho phép người dùng hoán đổi ETH thành token đại diện cho ETH được đặt cọc. Ưu điểm của token này là cho phép người dùng đổi bất kỳ số lượng ETH nào với một lượng token sinh lời tương đương mà token này vốn mang lại lợi nhuận từ phần thưởng đặt cọc áp dụng cho ETH được đặt cọc (và ngược lại) trên các sàn giao dịch phi tập trung, ngay cả khi ETH thực tế vẫn được đặt cọc trên lớp đồng thuận. Nhờ đó, người dùng có thể dễ dàng chuyển đổi qua lại giữa sản phẩm ETH sinh lời đã góp và "ETH thô" một cách nhanh chóng và dễ dàng, không nhất thiết phải là bội số của 32 ETH.

Tuy nhiên, các token ETH đã góp này lại tiềm ẩn nguy cơ hình thành các nhóm lợi ích. Điều này có nghĩa là một lượng lớn ETH được góp sẽ nằm dưới sự kiểm soát của một vài tổ chức tập trung thay vì được phân tán giữa nhiều cá nhân độc lập. Hệ quả là gia tăng khả năng kiểm duyệt hoặc trích xuất giá trị từ hệ thống. Vì vậy, cách đặt cọc lý tưởng nhất là mỗi người dùng tự chạy các nút xác thực trên phần cứng riêng nếu có thể.

[Thêm về rủi ro của việc đặt cọc token](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Các chỉ báo thuộc tính được sử dụng dưới đây để báo hiệu những điểm mạnh hoặc điểm yếu đáng chú ý mà một nhóm đặt cọc được niêm yết có thể có. Sử dụng phần này làm tài liệu tham khảo về cách chúng tôi xác định các thuộc tính này trong khi bạn chọn một nhóm để tham gia.

<StakingConsiderations page="pools" />

## Khám phá các bể đặt cọc {#explore-staking-pools}

Có nhiều tùy chọn có sẵn để giúp bạn thiết lập. Sử dụng các chỉ báo bên trên làm hướng dẫn về các công cụ bên dưới.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Xin lưu ý tầm quan trọng của việc chọn một dịch vụ xem trọng [tính đa dạng của máy khách](/developers/docs/nodes-and-clients/client-diversity/), vì nó giúp cải thiện tính bảo mật của mạng và hạn chế rủi ro cho bạn. Các dịch vụ có bằng chứng về việc hạn chế sử dụng máy khách đa số được biểu thị bằng <em style={{ textTransform: "uppercase" }}>"tính đa dạng của máy khách thực thi"</em> và <em style={{ textTransform: "uppercase" }}>"tính đa dạng của máy khách đồng thuận."</em>

Bạn có đề xuất về một công cụ đặt cọc mà chúng tôi còn thiếu không? Hãy xem [chính sách niêm yết sản phẩm](/contributing/adding-staking-products/) của chúng tôi để xem liệu nó có phù hợp hay không và gửi nó để được xem xét.

## Những câu hỏi thường gặp {#faq}

<ExpandableCard title="Làm sao để nhận phần thưởng?">
Thông thường, các token đặt cọc theo chuẩn ERC-20 được phát hành cho các người đặt cọc và đại diện cho giá trị của ETH được góp của họ cộng với phần thưởng đặt cọc. Hãy luôn nhớ rằng những nhóm khác nhau sẽ phân phối phần thưởng góp cổ phần cho những người dùng theo các phương thức khác nhau, nhưng đây là chủ đề chung.
</ExpandableCard>

<ExpandableCard title="Khi nào tôi có thể rút tiền đặt cọc?">
Ngay bây giờ! Nâng cấp mạng lưới Shanghai/Capella diễn ra vào tháng 4 năm 2023 và đã ra mắt tính năng rút tiền được đặt cọc. Tài khoản xác thực hỗ trợ các nhóm đặt cọc giờ đây có thể thoát và rút ETH về địa chỉ rút tiền được chỉ định. Điều này cho phép bạn lấy lại ETH gốc tương ứng với phần đã đặt cọc của mình. Hãy kiểm tra với nhà cung cấp dịch vụ để biết cách họ hỗ trợ tính năng này.

Ngoài ra, các nhóm đặt cọc sử dụng token đặt cọc ERC-20 cho phép người dùng giao dịch token này trên thị trường mở, giúp bạn bán vị thế đặt cọc, qua đó "rút" một cách hiệu quả mà không cần thực sự rút ETH khỏi hợp đồng đặt cọc.

<ButtonLink href="/staking/withdrawals/">Tìm hiểu thêm về rút tiền đặt cọc</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Việc này có khác với đặt cọc trên sàn giao dịch không?">
Có nhiều điểm tương đồng giữa các tùy chọn đặt cọc theo nhóm này và các sàn giao dịch tập trung, chẳng hạn như khả năng đặt cọc một lượng nhỏ ETH và chúng được gộp lại với nhau để kích hoạt nút xác thực.

Không giống như các sàn giao dịch tập trung, nhiều hình thức đặt cọc theo nhóm khác tận dụng hợp đồng thông minh và/hoặc token đặt cọc. Đây thường là các token ERC-20, bạn có thể tự lưu trữ trong ví cá nhân và mua bán chúng dễ dàng trên thị trường, giống như mọi token khác. Điều này cung cấp một lớp chủ quyền và bảo mật bằng cách cho phép bạn kiểm soát các token của mình, nhưng vẫn không cung cấp cho bạn quyền kiểm soát trực tiếp đối với máy khách xác thực chứng thực thay mặt bạn trong nền.

Một số tùy chọn góp theo nhóm phi tập trung hơn những tùy chọn khác khi nói đến các nút hỗ trợ chúng. Nhằm gia tăng tính bảo mật và phi tập trung cho mạng lưới, người đặt cọc nên ưu tiên chọn dịch vụ theo nhóm cho phép nhiều người vận hành nút phi tập trung tham gia mà không cần quyền.
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Thư mục Đặt cọc Ethereum](https://www.staking.directory/) - _Eridian and Spacesider_
- [Đặt cọc với Rocket Pool - Tổng quan về Đặt cọc](https://docs.rocketpool.net/guides/staking/overview.html) - _Tài liệu RocketPool_
- [Đặt cọc Ethereum với Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Tài liệu trợ giúp của Lido_
