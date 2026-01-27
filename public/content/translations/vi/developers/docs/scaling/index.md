---
title: "Thay đổi quy mô"
description: "Một giới thiệu về các tùy chọn mở rộng khác nhau đang được cộng đồng Ethereum phát triển."
lang: vi
sidebarDepth: 3
---

## Tổng quan về việc thay đổi quy mô {#scaling-overview}

Khi số lượng người sử dụng Ethereum tăng lên, blockchain đã đạt đến những giới hạn nhất định về khả năng. Điều này đã làm tăng chi phí sử dụng mạng, tạo ra nhu cầu về 'giải pháp mở rộng'. Có nhiều giải pháp đang được nghiên cứu, thử nghiệm và triển khai, áp dụng các phương pháp khác nhau để đạt được những mục tiêu tương tự.

Mục tiêu chính của khả năng mở rộng là tăng tốc độ giao dịch (tính kết luận cuối cùng nhanh hơn) và thông lượng giao dịch (số lượng giao dịch mỗi giây cao hơn) mà không phải hy sinh tính phi tập trung hay tính bảo mật. Trên chuỗi khối Ethereum lớp 1, nhu cầu cao dẫn đến các giao dịch chậm hơn và [giá gas](/developers/docs/gas/) không khả thi. Việc tăng cường khả năng mạng về tốc độ và băng thông là điều cơ bản đối với việc chấp nhận Ethereum một cách có ý nghĩa và rộng rãi.

Trong khi tốc độ và thông lượng là quan trọng, việc các giải pháp mở rộng nhằm đạt được những mục tiêu này vẫn phải duy trì tính phân cấp và an toàn là điều thiết yếu. Giữ cho rào cản gia nhập thấp cho các nhà điều hành nút là rất quan trọng để ngăn chặn sự tiến triển hướng tới sức mạnh tính toán tập trung và không an toàn.

Về mặt khái niệm, chúng ta đầu tiên phân loại việc mở rộng thành hai loại: mở rộng trên chuỗi và mở rộng ngoài chuỗi.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên có sự hiểu biết vững chắc về tất cả các chủ đề cơ bản. Việc triển khai các giải pháp mở rộng là một bước tiến cao, vì công nghệ này chưa được thử nghiệm nhiều trong thực tế và vẫn đang được nghiên cứu và phát triển.

## Thay đổi quy mô trên chuỗi {#onchain-scaling}

Thay đổi quy mô trên chuỗi yêu cầu thay đổi đối với giao thức Ethereum (lớp 1 [Mainnet](/glossary/#mainnet)). Trong một thời gian dài, việc chia nhỏ blockchain được kỳ vọng sẽ mở rộng quy mô cho Ethereum. Điều này sẽ liên quan đến việc chia nhỏ chuỗi khối thành các phần riêng biệt (shard) để được xác thực bởi các tập hợp validator. Tuy nhiên, việc mở rộng bằng các lớp cuộn thứ hai đã trở thành kỹ thuật mở rộng chính. Điều này được hỗ trợ bởi việc bổ sung một dạng dữ liệu mới với chi phí thấp gắn liền với các khối Ethereum, được thiết kế đặc biệt để làm cho việc sử dụng rollup trở nên rẻ hơn cho người dùng.

### Phân mảnh dữ liệu {#sharding}

Sharding là quá trình phân chia cơ sở dữ liệu. Các tập con của các trình xác thực sẽ chịu trách nhiệm cho từng shard riêng lẻ thay vì theo dõi toàn bộ Ethereum. Sharding đã nằm trong [lộ trình](/roadmap/) của Ethereum một thời gian dài, và từng được dự định sẽ ra mắt trước The Merge để chuyển sang bằng chứng cổ phần. Tuy nhiên, sự phát triển nhanh chóng của [rollup lớp 2](#layer-2-scaling) và sự ra đời của [Danksharding](/roadmap/danksharding) (thêm các blob dữ liệu rollup vào khối Ethereum mà người xác thực có thể xác minh rất hiệu quả) đã khiến cộng đồng Ethereum ủng hộ việc thay đổi quy mô lấy rollup làm trung tâm thay vì thay đổi quy mô bằng sharding. Điều này cũng sẽ giúp giữ cho logic đồng thuận của Ethereum đơn giản hơn.

## Thay đổi quy mô ngoài chuỗi {#offchain-scaling}

Giải pháp ngoại chuỗi được triển khai tách biệt với Mainnet layer 1 - chúng không yêu cầu thay đổi nào đối với giao thức Ethereum hiện tại. Một số giải pháp, được gọi là giải pháp "lớp 2", có được tính bảo mật trực tiếp từ sự đồng thuận của Ethereum lớp 1, chẳng hạn như [gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups/), [Rollup không kiến thức](/developers/docs/scaling/zk-rollups/) hoặc [kênh trạng thái](/developers/docs/scaling/state-channels/). Các giải pháp khác liên quan đến việc tạo ra các chuỗi mới dưới nhiều hình thức khác nhau có được tính bảo mật riêng biệt với Mainnet, chẳng hạn như [chuỗi bên](#sidechains), [validium](#validium) hoặc [chuỗi plasma](#plasma). Các giải pháp này giao tiếp với Mainnet nhưng thu được an ninh theo cách khác nhau để đạt được nhiều mục tiêu.

### Thay đổi quy mô lớp 2 {#layer-2-scaling}

Danh mục giải pháp offchain này có được sự bảo mật từ mạng chính Ethereum.

Lớp 2 là thuật ngữ tổng hợp chỉ các giải pháp được thiết kế nhằm giúp mở rộng ứng dụng của bạn bằng cách xử lý giao dịch ngoài mạng chính Ethereum (lớp 1) trong khi tận dụng mô hình bảo mật phi tập trung mạnh mẽ của mạng chính. Tốc độ giao dịch bị ảnh hưởng khi mạng bận, khiến trải nghiệm người dùng trở nên kém cho một số loại dapps. Và khi mạng lưới trở nên bận rộn hơn, giá gas sẽ tăng lên khi những người gửi giao dịch nỗ lực để đưa ra giá đấu thầu cao hơn nhau. Điều này có thể khiến việc sử dụng Ethereum trở nên rất tốn kém.

Hầu hết các giải pháp lớp 2 đều tập trung vào một máy chủ hoặc một cụm máy chủ, mỗi máy chủ có thể được gọi là nút, trình xác thực, nhà điều hành, trình tuần tự, nhà sản xuất khối, hoặc thuật ngữ tương tự. Tùy thuộc vào việc triển khai, các nút lớp 2 này có thể được vận hành bởi các cá nhân, doanh nghiệp hoặc tổ chức sử dụng chúng, hoặc bởi một nhà điều hành bên thứ ba, hoặc bởi một nhóm lớn các cá nhân (tương tự như Mainnet). Nói chung, các giao dịch được gửi đến các nút layer 2 này thay vì được gửi trực tiếp đến layer 1 (Mainnet). Đối với một số giải pháp, thực thể layer 2 sẽ kết hợp chúng thành các nhóm trước khi gán chúng vào layer 1, sau đó chúng được bảo mật bởi layer 1 và không thể bị thay đổi. Chi tiết về cách thức thực hiện điều này khác nhau đáng kể giữa các công nghệ và triển khai lớp 2 khác nhau.

Một trường hợp cụ thể của Layer 2 có thể được thiết kế để mở và chia sẻ cho nhiều ứng dụng khác nhau sử dụng chung, hoặc có thể được triển khai bởi một dự án cụ thể và chỉ phục vụ riêng cho ứng dụng của dự án đó.

#### Tại sao Layer 2 lại cần thiết? {#why-is-layer-2-needed}

- Số giao dịch mỗi giây tăng lên rất nhiều cải thiện trải nghiệm người dùng và giảm tắc nghẽn mạng trên Mainnet Ethereum.
- Các giao dịch được tổng hợp thành một giao dịch duy nhất trên Mainnet Ethereum, giảm phí gas cho người dùng và làm cho Ethereum trở nên toàn diện và dễ tiếp cận hơn với mọi người ở khắp nơi.
- Mọi cập nhật về khả năng mở rộng không nên được thực hiện với cái giá phải trả cho sự phân cấp hoặc an ninh – layer 2 được xây dựng trên nền tảng Ethereum.
- Có những mạng layer 2 cụ thể cho ứng dụng mang lại bộ hiệu quả riêng khi làm việc với tài sản quy mô lớn.

[Thêm về lớp 2](/layer-2/).

#### Rollup {#rollups}

Rollups thực hiện việc thực thi giao dịch ngoài layer 1 và sau đó dữ liệu được đăng lên layer 1 nơi đạt được sự đồng thuận. Khi dữ liệu giao dịch được bao gồm trong các khối layer 1, điều này cho phép các rollup được bảo vệ bởi tính bảo mật gốc của Ethereum.

Có hai loại rollup với các mô hình bảo mật khác nhau:

- **Gộp giao dịch lạc quan**: giả định rằng các giao dịch là hợp lệ theo mặc định và chỉ chạy tính toán, thông qua [**bằng chứng gian lận**](/glossary/#fraud-proof), trong trường hợp có thách thức. [Thêm về gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups/).
- **Rollup không kiến thức**: chạy tính toán ngoài chuỗi và gửi [**bằng chứng hợp lệ**](/glossary/#validity-proof) cho chuỗi. [Thêm về Rollup không kiến thức](/developers/docs/scaling/zk-rollups/).

#### Kênh trạng thái {#channels}

Các kênh nhà nước sử dụng hợp đồng đa chữ ký để cho phép các bên tham gia giao dịch nhanh chóng và tự do ngoài chuỗi, sau đó thanh toán cuối cùng với mạng chính. Điều này giảm thiểu tắc nghẽn mạng, phí tổn và thời gian trễ. Hai loại kênh này hiện tại là kênh nhà nước và kênh thanh toán.

Tìm hiểu thêm về [kênh trạng thái](/developers/docs/scaling/state-channels/).

### Chuỗi bên {#sidechains}

Một sidechain là một blockchain độc lập tương thích với EVM chạy song song với Mainnet. Những cái này tương thích với Ethereum thông qua các cầu hai chiều và hoạt động theo các quy tắc đồng thuận và tham số khối mà họ đã chọn.

Tìm hiểu thêm về [Chuỗi bên](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Chuỗi plasma là một chuỗi khối riêng biệt được neo vào chuỗi Ethereum chính và sử dụng bằng chứng gian lận (như [gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups/)) để phân xử các tranh chấp.

Tìm hiểu thêm về [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Một chuỗi Validium sử dụng chứng minh tính hợp lệ giống như các rollup không biết nhưng dữ liệu không được lưu trữ trên chuỗi Ethereum lớp 1 chính. Điều này có thể dẫn đến 10.000 giao dịch mỗi giây cho mỗi chuỗi Validium và có thể chạy nhiều chuỗi song song.

Tìm hiểu thêm về [Validium](/developers/docs/scaling/validium/).

## Tại sao cần nhiều giải pháp mở rộng đến vậy? {#why-do-we-need-these}

- Nhiều giải pháp có thể giúp giảm tình trạng tắc nghẽn tổng thể ở bất kỳ phần nào của mạng và cũng ngăn chặn các điểm thất bại đơn lẻ.
- Toàn thể lớn hơn tổng của các phần của nó. Các giải pháp khác nhau có thể tồn tại và hoạt động hài hòa, cho phép tạo ra hiệu ứng bùng nổ đối với tốc độ giao dịch và lưu lượng trong tương lai.
- Không phải tất cả các giải pháp đều yêu cầu sử dụng trực tiếp thuật toán đồng thuận Ethereum, và các phương án thay thế có thể mang lại những lợi ích mà nếu không có sẽ khó có được.

## Tìm hiểu thêm từ video trực quan? Người học qua hình ảnh {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Lưu ý rằng lời giải thích trong video sử dụng thuật ngữ "Layer 2" để chỉ tất cả các giải pháp mở rộng ngoài chuỗi, trong khi chúng tôi phân biệt "Layer 2" như một giải pháp ngoài chuỗi mà có được độ an toàn thông qua sự đồng thuận của Mainnet lớp 1._

<YouTube id="7pWxCklcNsU" />

## Đọc thêm {#further-reading}

- [Lộ trình Ethereum lấy rollup làm trung tâm](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Phân tích cập nhật về các giải pháp thay đổi quy mô Lớp 2 cho Ethereum](https://www.l2beat.com/)
- [Đánh giá các Giải pháp Thay đổi quy mô lớp 2 của Ethereum: Khung so sánh](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Hướng dẫn chưa đầy đủ về Rollup](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollup được Ethereum hỗ trợ: Dẫn đầu thế giới](https://hackmd.io/@canti/rkUT0BD8K)
- [Gộp giao dịch lạc quan và ZK Rollup](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Tại sao rollup + phân đoạn dữ liệu là giải pháp bền vững duy nhất cho khả năng mở rộng cao](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Loại Lớp 3 nào là hợp lý?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Tính sẵn sàng của dữ liệu hoặc: Các rollup đã học cách ngừng lo lắng và yêu Ethereum như thế nào](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Hướng dẫn thực tế về Rollup của Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
