---
title: "Mở rộng quy mô"
description: "Giới thiệu về các tùy chọn mở rộng quy mô khác nhau hiện đang được cộng đồng Ethereum phát triển."
lang: vi
sidebarDepth: 3
---

## Tổng quan về mở rộng quy mô {#scaling-overview}

Khi số lượng người sử dụng [Ethereum](/) tăng lên, Chuỗi khối đã đạt đến những giới hạn công suất nhất định. Điều này đã làm tăng chi phí sử dụng mạng lưới, tạo ra nhu cầu về các "giải pháp mở rộng quy mô". Có nhiều giải pháp đang được nghiên cứu, thử nghiệm và triển khai với các cách tiếp cận khác nhau để đạt được những mục tiêu tương tự.

Mục tiêu chính của khả năng mở rộng là tăng tốc độ giao dịch (tính chung cuộc nhanh hơn) và thông lượng giao dịch (số lượng giao dịch mỗi giây cao hơn) mà không hy sinh sự phi tập trung hoặc tính bảo mật. Trên Chuỗi khối Ethereum lớp 1 (l1), nhu cầu cao dẫn đến các giao dịch chậm hơn và [giá Gas](/developers/docs/gas/) không khả thi. Việc tăng công suất mạng lưới về tốc độ và thông lượng là nền tảng cho sự chấp nhận rộng rãi và có ý nghĩa đối với Ethereum.

Mặc dù tốc độ và thông lượng là quan trọng, nhưng điều thiết yếu là các giải pháp mở rộng quy mô hỗ trợ các mục tiêu này vẫn phải phi tập trung và bảo mật. Việc giữ rào cản gia nhập thấp cho các nhà điều hành nút là rất quan trọng trong việc ngăn chặn sự tiến triển hướng tới sức mạnh tính toán tập trung và không an toàn.

Về mặt khái niệm, trước tiên chúng tôi phân loại việc mở rộng quy mô thành mở rộng quy mô trên chuỗi hoặc mở rộng quy mô ngoài chuỗi.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên có hiểu biết tốt về tất cả các chủ đề nền tảng. Việc triển khai các giải pháp mở rộng quy mô là nâng cao vì công nghệ này ít được thử nghiệm thực tế hơn, và vẫn tiếp tục được nghiên cứu và phát triển.

## Mở rộng quy mô trên chuỗi {#onchain-scaling}

Mở rộng quy mô trên chuỗi yêu cầu các thay đổi đối với Giao thức Ethereum ([Mạng chính](/glossary/#mainnet) lớp 1 (l1)). Trong một thời gian dài, việc phân mảnh Chuỗi khối được kỳ vọng sẽ mở rộng quy mô Ethereum. Điều này sẽ liên quan đến việc chia Chuỗi khối thành các phần riêng biệt (phân mảnh) để được xác minh bởi các nhóm nhỏ trình xác thực. Tuy nhiên, việc mở rộng quy mô bằng các bản cuộn lớp 2 (l2) đã chiếm ưu thế như là kỹ thuật mở rộng quy mô chính. Điều này được hỗ trợ bởi việc bổ sung một dạng dữ liệu mới rẻ hơn được đính kèm vào các khối Ethereum, được thiết kế đặc biệt để làm cho các bản cuộn trở nên rẻ hơn cho người dùng.

### Phân mảnh {#sharding}

Phân mảnh là quá trình chia nhỏ một cơ sở dữ liệu. Các nhóm nhỏ trình xác thực sẽ chịu trách nhiệm cho từng phân mảnh riêng lẻ thay vì theo dõi toàn bộ Ethereum. Phân mảnh đã nằm trên [lộ trình](/roadmap/) Ethereum trong một thời gian dài, và từng được dự định sẽ ra mắt trước The Merge sang Bằng chứng cổ phần (PoS). Tuy nhiên, sự phát triển nhanh chóng của [các bản cuộn lớp 2 (l2)](#layer-2-scaling) và việc phát minh ra [danksharding](/roadmap/danksharding) (thêm các blob dữ liệu Rollup vào các khối Ethereum có thể được xác minh rất hiệu quả bởi các trình xác thực) đã khiến cộng đồng Ethereum ưu tiên việc mở rộng quy mô tập trung vào Rollup thay vì mở rộng quy mô bằng phân mảnh. Điều này cũng sẽ giúp giữ cho logic đồng thuận của Ethereum đơn giản hơn.

## Mở rộng quy mô ngoài chuỗi {#offchain-scaling}

Các giải pháp ngoài chuỗi được triển khai tách biệt với Mạng chính lớp 1 (l1) - chúng không yêu cầu thay đổi đối với Giao thức Ethereum hiện tại. Một số giải pháp, được gọi là các giải pháp "lớp 2 (l2)", lấy tính bảo mật trực tiếp từ sự đồng thuận Ethereum lớp 1 (l1), chẳng hạn như [các bản cuộn optimistic](/developers/docs/scaling/optimistic-rollups/), [các bản cuộn không tri thức](/developers/docs/scaling/zk-rollups/) hoặc [kênh trạng thái](/developers/docs/scaling/state-channels/). Các giải pháp khác liên quan đến việc tạo ra các Chuỗi mới dưới nhiều hình thức khác nhau lấy tính bảo mật tách biệt với Mạng chính, chẳng hạn như [chuỗi phụ](#sidechains), [Validium](#validium), hoặc [chuỗi Plasma](#plasma). Các giải pháp này giao tiếp với Mạng chính nhưng lấy tính bảo mật theo những cách khác nhau để đạt được nhiều mục tiêu.

### Mở rộng quy mô lớp 2 (l2) {#layer-2-scaling}

Danh mục các giải pháp ngoài chuỗi này lấy tính bảo mật từ Mạng chính Ethereum.

Lớp 2 (l2) là một thuật ngữ chung cho các giải pháp được thiết kế để giúp mở rộng quy mô ứng dụng của bạn bằng cách xử lý các giao dịch bên ngoài Mạng chính Ethereum (lớp 1 (l1)) trong khi tận dụng mô hình bảo mật phi tập trung mạnh mẽ của Mạng chính. Tốc độ giao dịch bị ảnh hưởng khi mạng lưới bận rộn, làm cho trải nghiệm người dùng trở nên kém đối với một số loại ứng dụng phi tập trung (dapp). Và khi mạng lưới trở nên bận rộn hơn, giá Gas tăng lên do những người gửi giao dịch cố gắng trả giá cao hơn nhau. Điều này có thể làm cho việc sử dụng Ethereum trở nên rất đắt đỏ.

Hầu hết các giải pháp lớp 2 (l2) đều tập trung xung quanh một máy chủ hoặc cụm máy chủ, mỗi máy chủ có thể được gọi là một nút, trình xác thực, nhà điều hành, bộ sắp xếp, nhà sản xuất khối, hoặc thuật ngữ tương tự. Tùy thuộc vào việc triển khai, các nút lớp 2 (l2) này có thể được điều hành bởi các cá nhân, doanh nghiệp hoặc tổ chức sử dụng chúng, hoặc bởi một nhà điều hành bên thứ 3, hoặc bởi một nhóm lớn các cá nhân (tương tự như Mạng chính). Nói chung, các giao dịch được gửi đến các nút lớp 2 (l2) này thay vì được gửi trực tiếp đến lớp 1 (l1) (Mạng chính). Đối với một số giải pháp, phiên bản lớp 2 (l2) sau đó sẽ gom chúng thành các nhóm trước khi neo chúng vào lớp 1 (l1), sau đó chúng được bảo mật bởi lớp 1 (l1) và không thể bị thay đổi. Chi tiết về cách thực hiện điều này khác nhau đáng kể giữa các công nghệ và triển khai lớp 2 (l2) khác nhau.

Một phiên bản lớp 2 (l2) cụ thể có thể mở và được chia sẻ bởi nhiều ứng dụng, hoặc có thể được triển khai bởi một dự án và dành riêng để chỉ hỗ trợ ứng dụng của họ.

#### Tại sao cần lớp 2 (l2)? {#why-is-layer-2-needed}

- Việc tăng số lượng giao dịch mỗi giây cải thiện đáng kể trải nghiệm người dùng và giảm tắc nghẽn mạng lưới trên Mạng chính Ethereum.
- Các giao dịch được cuộn lại thành một giao dịch duy nhất lên Mạng chính Ethereum, giảm phí Gas cho người dùng và làm cho Ethereum trở nên toàn diện và dễ tiếp cận hơn đối với mọi người ở khắp mọi nơi.
- Bất kỳ bản cập nhật nào về khả năng mở rộng đều không được đánh đổi bằng sự phi tập trung hoặc tính bảo mật – lớp 2 (l2) được xây dựng trên nền tảng của Ethereum.
- Có các mạng lưới lớp 2 (l2) dành riêng cho ứng dụng mang lại những hiệu quả riêng khi làm việc với các tài sản ở quy mô lớn.

[Tìm hiểu thêm về lớp 2 (l2)](/layer-2/).

#### Bản cuộn {#rollups}

Các bản cuộn thực hiện việc thực thi giao dịch bên ngoài lớp 1 (l1) và sau đó dữ liệu được đăng lên lớp 1 (l1) nơi đạt được sự đồng thuận. Vì dữ liệu giao dịch được bao gồm trong các khối lớp 1 (l1), điều này cho phép các bản cuộn được bảo mật bằng tính bảo mật gốc của Ethereum.

Có hai loại bản cuộn với các mô hình bảo mật khác nhau:

- **Bản cuộn Optimistic**: giả định các giao dịch là hợp lệ theo mặc định và chỉ chạy tính toán, thông qua một [**bằng chứng gian lận**](/glossary/#fraud-proof), trong trường hợp có tranh chấp. [Tìm hiểu thêm về bản cuộn Optimistic](/developers/docs/scaling/optimistic-rollups/).
- **Bản cuộn không tri thức**: chạy tính toán ngoài chuỗi và gửi một [**bằng chứng tính hợp lệ**](/glossary/#validity-proof) lên Chuỗi. [Tìm hiểu thêm về bản cuộn không tri thức](/developers/docs/scaling/zk-rollups/).

#### Kênh trạng thái {#channels}

Kênh trạng thái sử dụng các hợp đồng đa chữ ký để cho phép những người tham gia giao dịch nhanh chóng và tự do ngoài chuỗi, sau đó giải quyết tính chung cuộc với Mạng chính. Điều này giảm thiểu tắc nghẽn mạng lưới, phí và sự chậm trễ. Hai loại kênh hiện tại là kênh trạng thái và kênh thanh toán.

Tìm hiểu thêm về [kênh trạng thái](/developers/docs/scaling/state-channels/).

### Chuỗi phụ {#sidechains}

Chuỗi phụ là một Chuỗi khối độc lập tương thích với EVM chạy song song với Mạng chính. Chúng tương thích với Ethereum thông qua các cầu nối hai chiều và chạy theo các quy tắc đồng thuận và tham số khối do chính chúng chọn.

Tìm hiểu thêm về [Chuỗi phụ](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Chuỗi Plasma là một Chuỗi khối riêng biệt được neo vào Chuỗi Ethereum chính và sử dụng bằng chứng gian lận (giống như [các bản cuộn optimistic](/developers/docs/scaling/optimistic-rollups/)) để phân xử các tranh chấp.

Tìm hiểu thêm về [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Chuỗi Validium sử dụng bằng chứng tính hợp lệ giống như các bản cuộn không tri thức nhưng dữ liệu không được lưu trữ trên Chuỗi Ethereum lớp 1 (l1) chính. Điều này có thể dẫn đến 10 nghìn giao dịch mỗi giây trên mỗi chuỗi Validium và nhiều Chuỗi có thể được chạy song song.

Tìm hiểu thêm về [Validium](/developers/docs/scaling/validium/).

## Tại sao cần quá nhiều giải pháp mở rộng quy mô? {#why-do-we-need-these}

- Nhiều giải pháp có thể giúp giảm tắc nghẽn tổng thể trên bất kỳ phần nào của mạng lưới và cũng ngăn chặn các điểm lỗi duy nhất.
- Tổng thể lớn hơn tổng các phần của nó. Các giải pháp khác nhau có thể tồn tại và hoạt động hài hòa, cho phép tạo ra hiệu ứng cấp số nhân đối với tốc độ và thông lượng giao dịch trong tương lai.
- Không phải tất cả các giải pháp đều yêu cầu sử dụng trực tiếp thuật toán đồng thuận Ethereum, và các giải pháp thay thế có thể mang lại những lợi ích mà nếu không thì sẽ khó đạt được.

## Bạn thích học qua hình ảnh hơn? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Lưu ý rằng lời giải thích trong video sử dụng thuật ngữ "Lớp 2" để chỉ tất cả các giải pháp mở rộng quy mô ngoài chuỗi, trong khi chúng tôi phân biệt "Lớp 2 (l2)" là một giải pháp ngoài chuỗi lấy tính bảo mật thông qua sự đồng thuận của Mạng chính lớp 1 (l1)._

<VideoWatch slug="rollups-scaling-strategy" />

## Đọc thêm {#further-reading}

- [Lộ trình Ethereum tập trung vào Rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Phân tích cập nhật về các giải pháp mở rộng quy mô Lớp 2 cho Ethereum](https://www.l2beat.com/)
- [Đánh giá các giải pháp mở rộng quy mô lớp 2 của Ethereum: Một khuôn khổ so sánh](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Hướng dẫn chưa hoàn chỉnh về các bản cuộn](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollups được hỗ trợ bởi Ethereum: Những người dẫn đầu thế giới](https://hackmd.io/@canti/rkUT0BD8K)
- [Bản cuộn Optimistic so với Bản cuộn ZK](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Tại sao các bản cuộn + phân mảnh dữ liệu là giải pháp bền vững duy nhất cho khả năng mở rộng cao](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Loại Lớp 3 nào là hợp lý?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Tính khả dụng của dữ liệu hay: Cách các bản cuộn học cách ngừng lo lắng và yêu Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Hướng dẫn thực tế về các bản cuộn Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Hướng dẫn: Xây dựng Lớp 2 (l2) có thể mở rộng trên Ethereum {#tutorials}

- [Tất cả những gì bạn có thể lưu trữ đệm](/developers/tutorials/all-you-can-cache/) _– Cách xây dựng và sử dụng hợp đồng lưu trữ đệm để giảm chi phí dữ liệu lệnh gọi trên các bản cuộn._
- [ABI ngắn để tối ưu hóa dữ liệu lệnh gọi](/developers/tutorials/short-abi/) _– Cách sử dụng các ABI ngắn hơn để giảm chi phí dữ liệu lệnh gọi cho các giao dịch lớp 2 (l2)._