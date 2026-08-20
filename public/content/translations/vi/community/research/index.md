---
title: "Các lĩnh vực nghiên cứu đang hoạt động của Ethereum"
description: "Khám phá các lĩnh vực nghiên cứu mở khác nhau và tìm hiểu cách tham gia."
lang: vi
---

Một trong những thế mạnh chính của Ethereum là có một cộng đồng kỹ thuật và nghiên cứu năng động không ngừng cải tiến nó. Nhiều người nhiệt huyết, có kỹ năng trên toàn thế giới muốn cống hiến cho các vấn đề còn tồn đọng của Ethereum, nhưng không phải lúc nào cũng dễ dàng tìm ra những vấn đề đó là gì. Trang này phác thảo các lĩnh vực nghiên cứu đang hoạt động chính như một hướng dẫn sơ bộ về những công nghệ tiên tiến nhất của Ethereum.

## Cách thức hoạt động của nghiên cứu Ethereum {#how-ethereum-research-works}

Nghiên cứu Ethereum mang tính mở và minh bạch. Văn hóa ở đây là làm cho các công cụ và kết quả nghiên cứu trở nên mở và có tính tương tác nhất có thể, ví dụ như thông qua các sổ tay có thể thực thi (executable notebooks). Nghiên cứu Ethereum tiến triển nhanh chóng, với những phát hiện mới được đăng tải và thảo luận công khai trên các diễn đàn như [ethresear.ch](https://ethresear.ch/) thay vì tiếp cận cộng đồng thông qua các ấn phẩm truyền thống sau nhiều vòng bình duyệt. Tổ chức Ethereum cũng công bố những gì họ đang ưu tiên và lý do tại sao, để bất kỳ ai cũng có thể thấy những vấn đề nào hiện đang được coi là cấp bách.

## Tài nguyên nghiên cứu chung {#general-research-resources}

Bất kể chủ đề cụ thể là gì, có vô số thông tin về nghiên cứu Ethereum có thể được tìm thấy tại [ethresear.ch](https://ethresear.ch) và [kênh Discord Eth R&D](https://discord.gg/qGpsxSA). Đây là những nơi chính mà các nhà nghiên cứu Ethereum thảo luận về những ý tưởng và cơ hội phát triển mới nhất.

Để có cái nhìn tổng quan về hướng đi của Giao thức, hãy bắt đầu với [lộ trình Ethereum](/roadmap/), sau đó đọc [Cập nhật Ưu tiên Giao thức cho năm 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026) của Tổ chức Ethereum và [các bản cập nhật cụm giao thức](https://blog.ethereum.org/2026/05/11/protocol-update-may-26) báo cáo tiến độ so với lộ trình đó. [Nghiên cứu Giao thức Ethereum](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) là một điểm khởi đầu có cấu trúc dành cho những người muốn làm việc trực tiếp trên Giao thức.

## Nguồn tài trợ {#sources-of-funding}

Bạn có thể tham gia vào nghiên cứu Ethereum và được trả tiền cho việc đó. [Tổ chức Ethereum](/foundation/) tài trợ cho nghiên cứu và hàng hóa công cộng thông qua [Chương trình Hỗ trợ Hệ sinh thái](https://esp.ethereum.foundation/applicants), nơi đăng tải các hạng mục mong muốn và yêu cầu đề xuất mô tả các vấn đề mà họ muốn được giải quyết. Bạn có thể tìm thấy thông tin về các cơ hội tài trợ đang hoạt động và sắp tới trên [trang tài trợ Ethereum](/community/grants/).

## Nghiên cứu giao thức {#protocol-research}

Nghiên cứu giao thức liên quan đến lớp cơ sở của Ethereum: tập hợp các quy tắc xác định cách các nút kết nối, giao tiếp, trao đổi và lưu trữ dữ liệu Ethereum cũng như đạt được đồng thuận về trạng thái của Chuỗi khối. Hai hạng mục lâu đời của nó là đồng thuận và thực thi, và một số chủ đề nghiên cứu hiện nay bao trùm cả hai.

### Đồng thuận {#consensus}

Nghiên cứu đồng thuận liên quan đến [cơ chế Bằng chứng cổ phần (PoS) của Ethereum](/developers/docs/consensus-mechanisms/pos/): tính bảo mật của quy tắc lựa chọn Phân nhánh và công cụ tính chung cuộc, kinh tế học mật mã của việc đặt cọc, mạng lưới ngang hàng truyền tải các khối, chứng thực và dữ liệu khối dữ liệu, cùng với mật mã học mà các trình xác thực sử dụng để ký. Một số chủ đề nghiên cứu đồng thuận ví dụ là:

- xác định và vá các lỗ hổng;
- định lượng bảo mật kinh tế học mật mã;
- giảm thời gian cần thiết để một khối đạt được tính chung cuộc;
- và cải thiện hiệu quả, tính an toàn cũng như khả năng giám sát của mạng lưới ngang hàng giữa các ứng dụng khách đồng thuận.

Phần lớn công việc này đã chuyển từ lý thuyết trên giấy sang đặc tả kỹ thuật. Việc lấy mẫu tính khả dụng của dữ liệu đã được triển khai trong bản nâng cấp [Fusaka](/roadmap/fusaka/), những thay đổi về cách các khối được xây dựng và cách các giao dịch được đảm bảo đưa vào đã được chỉ định cho các bản nâng cấp sắp tới, và một thiết kế lại với tầm nhìn dài hạn hơn được gọi là đồng thuận tinh gọn (lean consensus) đang khám phá tính chung cuộc nhanh hơn cùng với các chữ ký hậu lượng tử.

#### Tài liệu đọc thêm {#background-reading}

- [Giới thiệu về Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Tính chung cuộc trong một slot](/roadmap/single-slot-finality/)
- [Bài báo về Casper FFG](https://arxiv.org/abs/1710.09437)
- [Bài báo về Gasper](https://arxiv.org/abs/2003.03052)
- [Ethereum tinh gọn](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### Nghiên cứu gần đây {#recent-research}

- [Đồng thuận trên Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Tình thế tiến thoái lưỡng nan giữa Tính khả dụng/Tính chung cuộc](https://arxiv.org/abs/2009.04987)
- [Tính chung cuộc 3 slot: SSF không chỉ là về "một" slot](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### Thực thi {#execution}

Lớp thực thi liên quan đến việc thực thi các giao dịch, chạy [Máy ảo Ethereum (EVM)](/developers/docs/evm/) và tạo ra các tải trọng thực thi để chuyển đến lớp đồng thuận. Nghiên cứu ở đây chia thành hai hướng: làm cho trạng thái trở nên rẻ để lưu giữ và chứng minh, và tăng thông lượng mà không đẩy thêm chi phí cho những người chạy các nút. Có nhiều lĩnh vực nghiên cứu đang hoạt động, bao gồm:

- định giá lại chi phí Gas của các hoạt động tạo ra trạng thái;
- hết hạn lịch sử mà các nút không còn cần phải phục vụ;
- danh sách truy cập cấp độ khối cho phép các giao dịch được xác thực song song;
- thị trường phí đa chiều định giá trạng thái, dữ liệu và tính toán một cách riêng biệt;
- và chứng minh việc thực thi các khối lớp 1 (l1) bằng một zkEVM.

#### Tài liệu đọc thêm {#background-reading-1}

- [Giới thiệu về EVM](/developers/docs/evm/)
- [Lớp thực thi trên Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)
- [Đặc tả kỹ thuật lớp thực thi Ethereum](https://github.com/ethereum/execution-specs)
- [Tối ưu hóa cơ sở dữ liệu](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Nghiên cứu gần đây {#recent-research-1}

- [EIP-7928: Danh sách truy cập cấp độ khối](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: Tăng chi phí Gas tạo trạng thái](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: Thị trường phí đa chiều thống nhất](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, hết hạn lịch sử và biên lai đơn giản hơn](https://eips.ethereum.org/EIPS/eip-7642)
- [Triển khai zkEVM lớp 1 (l1): chứng minh theo thời gian thực](https://blog.ethereum.org/2025/07/10/realtime-proving)

### Khả năng chống kiểm duyệt và xây dựng khối {#censorship-resistance-and-block-building}

Hầu hết các khối Ethereum hiện đang được lắp ráp bởi một số lượng nhỏ các trình xây dựng chuyên biệt, điều này tập trung quyền lực quyết định những giao dịch nào được đưa vào. Nghiên cứu trong lĩnh vực này bao gồm việc đưa thị trường trình xây dựng vào chính Giao thức, để vai trò đề xuất và xây dựng một khối được tách biệt bởi các quy tắc đồng thuận thay vì bởi phần mềm ngoài giao thức, và cung cấp cho các trình xác thực một cách để buộc đưa vào các giao dịch mà các trình xây dựng bỏ sót.

#### Tài liệu đọc thêm {#background-reading-21}

- [Tách biệt người đề xuất và người xây dựng (PBS)](/roadmap/pbs/)
- [Bầu chọn một nhà lãnh đạo bí mật duy nhất (SSLE)](/roadmap/secret-leader-election/)

#### Nghiên cứu gần đây {#recent-research-21}

- [EIP-7732: Tách biệt người đề xuất và người xây dựng (PBS) được tích hợp](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: Danh sách đưa vào được thực thi bởi lựa chọn Phân nhánh](https://eips.ethereum.org/EIPS/eip-7805)
- [Tăng cường khả năng chống kiểm duyệt của các giao dịch dưới sự tách biệt người đề xuất và người xây dựng (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Sự gia tăng trạng thái và tính phi trạng thái {#state-growth-and-statelessness}

Mỗi nút đầy đủ đều lưu trữ trạng thái của Ethereum, vì vậy tốc độ gia tăng của trạng thái đó thiết lập mức sàn cho chi phí chạy một nút. Trong ngắn hạn, nghiên cứu tập trung vào việc định giá lại các hoạt động tạo ra trạng thái và hết hạn lịch sử mà các nút không còn cần phải giữ lại. Trong dài hạn, kế hoạch là thay thế cây Merkle-Patricia hệ cơ số 16 của Ethereum bằng một cây nhị phân tạo ra các bằng chứng nhỏ hơn nhiều, và tiến tới tính phi trạng thái, để một nút có thể xác minh các khối mà không cần giữ toàn bộ trạng thái. Các công trình trước đây trong lĩnh vực này giả định sử dụng cây Verkle; đề xuất hiện tại là một cây nhị phân thống nhất, kế thừa lịch trình Gas bằng chứng dữ liệu được chỉ định cho hướng nghiên cứu trước đó.

#### Tài liệu đọc thêm {#background-reading-22}

- [Tính phi trạng thái và hết hạn trạng thái](/roadmap/statelessness/)
- [Sách về tính phi trạng thái của Ethereum](https://stateless.fyi/)

#### Nghiên cứu gần đây {#recent-research-22}

- [EIP-7864: Trạng thái Ethereum sử dụng cây nhị phân thống nhất](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: Những thay đổi về chi phí Gas của tính phi trạng thái](https://eips.ethereum.org/EIPS/eip-4762)
- [Tại sao trạng thái phi tập trung lại quan trọng đối với Ethereum](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### Mật mã học hậu lượng tử {#post-quantum-cryptography}

Các chữ ký của trình xác thực Ethereum và phần lớn lớp ứng dụng của nó dựa trên mật mã học đường cong elliptic, thứ mà một máy tính lượng tử đủ mạnh có thể phá vỡ. Làm cho Ethereum có khả năng kháng lượng tử có nghĩa là thay thế các chữ ký đó bằng các giải pháp thay thế dựa trên Mã băm hoặc dựa trên mạng tinh thể (lattice-based), giữ cho việc tổng hợp chữ ký đủ hiệu quả đối với một tập hợp trình xác thực lớn, và cung cấp cho các Tài khoản hiện tại một lộ trình di chuyển. Tổ chức Ethereum điều hành một nhóm chuyên trách về hậu lượng tử, và đây là một trong những chương trình có tầm nhìn dài hạn nhất trên lộ trình.

#### Tài liệu đọc thêm {#background-reading-23}

- [Khả năng kháng lượng tử](/roadmap/security/quantum-resistance/)
- [Ethereum hậu lượng tử](https://pq.ethereum.org/)

#### Nghiên cứu gần đây {#recent-research-23}

- [Ethereum tinh gọn](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Mật mã học trên Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Các triển khai Ethereum tinh gọn](https://github.com/leanEthereum)

## Phát triển máy khách {#client-development}

Các máy khách Ethereum là những bản triển khai của Giao thức Ethereum. Việc phát triển máy khách biến các kết quả từ nghiên cứu giao thức thành hiện thực bằng cách xây dựng chúng vào các máy khách này. Phát triển máy khách bao gồm việc cập nhật các đặc tả kỹ thuật của máy khách cũng như xây dựng các bản triển khai cụ thể.

Một nút Ethereum được yêu cầu phải chạy hai phần mềm:

1. một ứng dụng khách đồng thuận để theo dõi phần đầu của Chuỗi khối, truyền bá các khối và xử lý logic đồng thuận
2. một máy khách thực thi để hỗ trợ Máy ảo Ethereum và thực thi các giao dịch cũng như hợp đồng thông minh

Các lớp máy khách mới đang được tạo nguyên mẫu song song với hai loại trên, bao gồm các máy khách chứng minh việc thực thi các khối lớp 1 (l1) và các ứng dụng khách đồng thuận tinh gọn được xây dựng xoay quanh các chữ ký hậu lượng tử.

Xem [trang các nút và máy khách](/developers/docs/nodes-and-clients/) để biết thêm chi tiết về các nút và máy khách cũng như danh sách tất cả các bản triển khai máy khách hiện tại. Bạn cũng có thể tìm thấy lịch sử của tất cả các bản nâng cấp Ethereum trên [trang lịch sử](/ethereum-forks/).

### Máy khách thực thi {#execution-clients}

- [Đặc tả kỹ thuật máy khách thực thi](https://github.com/ethereum/execution-specs)
- [Đặc tả kỹ thuật API thực thi](https://github.com/ethereum/execution-apis)

### Ứng dụng khách đồng thuận {#consensus-clients}

- [Đặc tả kỹ thuật ứng dụng khách đồng thuận](https://github.com/ethereum/consensus-specs)
- [Đặc tả kỹ thuật API Beacon](https://ethereum.github.io/beacon-APIs/)

### Máy khách zkEVM {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Triển khai zkEVM lớp 1 (l1): nền tảng bảo mật](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## Mở rộng quy mô và hiệu suất {#scaling-and-performance}

Mở rộng quy mô Ethereum là một lĩnh vực trọng tâm lớn đối với các nhà nghiên cứu Ethereum, và nó chạy trên hai hướng cùng một lúc: tăng thông lượng của chính lớp 1 (l1), và chuyển việc thực thi sang các bản cuộn đăng tải dữ liệu của chúng lên Ethereum. Công việc hiện tại bao gồm tăng giới hạn gas của khối, định giá lại sự gia tăng trạng thái, mở rộng dung lượng khối dữ liệu cho dữ liệu Rollup, và giảm bớt những gì một nút phải lưu trữ và xác minh. Thông tin giới thiệu về việc mở rộng quy mô Ethereum có sẵn trên [trang mở rộng quy mô](/developers/docs/scaling/) và [lộ trình mở rộng quy mô](/roadmap/scaling/) của chúng tôi.

### Lớp 2 {#layer-2}

Hiện có một số giao thức lớp 2 (l2) mở rộng quy mô Ethereum bằng cách sử dụng các kỹ thuật khác nhau để gom lô các giao dịch và bảo mật chúng trên lớp 1 (l1) của Ethereum. Nghiên cứu mở bao gồm việc giảm độ trễ và chi phí chứng minh, rút ngắn thời gian cần thiết để một giao dịch đạt được tính chung cuộc không cần tin cậy, và mang đến cho người dùng một trải nghiệm nhất quán duy nhất trên nhiều bản cuộn.

#### Tài liệu đọc thêm {#background-reading-2}

- [Giới thiệu về lớp 2 (l2)](/layer-2/)
- [L2BEAT: tóm tắt về mở rộng quy mô](https://l2beat.com/scaling/summary)
- [Lộ trình Ethereum lấy Rollup làm trung tâm](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### Nghiên cứu gần đây {#recent-research-2}

- [Lớp 2 (l2) trên Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: chi phí trên chuỗi](https://l2beat.com/scaling/costs)
- [Xây dựng trên Ethereum vào năm 2026: những gì đã thay đổi](/latest/building-on-ethereum-in-2026/)

### Khả năng tương tác {#interoperability}

Người dùng và tài sản nằm rải rác trên lớp 1 (l1) của Ethereum và nhiều lớp 2 (l2), và vấn đề nghiên cứu là cho phép họ di chuyển và hoạt động trên các Chuỗi đó mà không cần tin cậy vào một bên trung gian. Công việc ở đây bao gồm các giao dịch chuyển dựa trên ý định, định danh và đặt tên chuỗi chéo được tiêu chuẩn hóa, truyền thông điệp chung, và trừu tượng hóa Chuỗi ở cấp độ Ví. Điều này thay thế một mô hình trong đó các cầu nối lưu ký nắm giữ tài sản, và các cầu nối trong lịch sử từng là một trong những nguồn gây thất thoát lớn nhất trong hệ sinh thái, vì vậy tính bảo mật của bất kỳ cơ chế chuỗi chéo nào vẫn là một mối quan tâm trọng tâm.

#### Tài liệu đọc thêm {#background-reading-3}

- [Giới thiệu về cầu nối Chuỗi khối](/bridges/)
- [Làm cho Ethereum có cảm giác như một Chuỗi duy nhất trở lại](https://blog.ethereum.org/2025/11/18/eil)
- [Khung Ý định Mở (Open Intents Framework)](https://openintents.xyz/)
- [Xác thực các cầu nối](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Nghiên cứu gần đây {#recent-research-3}

- [ERC-7683: Ý định chuỗi chéo](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: Địa chỉ có khả năng tương tác](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: Tên có khả năng tương tác](https://eips.ethereum.org/EIPS/eip-7828)

### Tính khả dụng của dữ liệu và mở rộng quy mô khối dữ liệu {#data-availability-and-blob-scaling}

Các bản cuộn đăng tải dữ liệu của chúng lên Ethereum dưới dạng các khối dữ liệu, và việc mở rộng quy mô lớp dữ liệu đó tự thân nó là một vấn đề nghiên cứu, tách biệt với việc mở rộng quy mô thực thi. Ethereum hiện sử dụng việc lấy mẫu tính khả dụng của dữ liệu, vì vậy các trình xác thực có thể xác minh rằng dữ liệu khối dữ liệu đã được xuất bản bằng cách lấy mẫu các phần của nó thay vì tải xuống toàn bộ, và dung lượng khối dữ liệu được tăng dần thông qua các đợt Phân nhánh chỉ dành riêng cho tham số khối dữ liệu. Các câu hỏi mở bao gồm việc lấy mẫu có thể được đẩy xa đến mức nào, làm thế nào để giữ cho các yêu cầu về băng thông ở mức có thể quản lý được đối với những người đặt cọc tại nhà, và việc định giá khối dữ liệu nên phản ứng với nhu cầu như thế nào.

#### Tài liệu đọc thêm {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Bản nâng cấp Fusaka](/roadmap/fusaka/)
- [danksharding](/roadmap/danksharding/)
- [Tính khả dụng của dữ liệu](/developers/docs/data-availability/)
- [EIP-4844: Giao dịch khối dữ liệu chuỗi phân mảnh](https://eips.ethereum.org/EIPS/eip-4844)
- [Ghi chú về Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### Nghiên cứu gần đây {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: Các đợt hardfork chỉ dành cho tham số khối dữ liệu](https://eips.ethereum.org/EIPS/eip-7892)
- [Phân mảnh trên Ethresear.ch](https://ethresear.ch/c/sharding/6)

### Phần cứng {#hardware}

[Chạy các nút](/developers/docs/nodes-and-clients/run-a-node/) trên phần cứng khiêm tốn là nền tảng để giữ cho Ethereum phi tập trung, vì vậy mọi sự gia tăng về thông lượng đều phải được cân nhắc so với chi phí mà người vận hành nút phải chịu. Với giới hạn gas của khối đang tăng lên và các đợt tăng tiếp theo đã được lên kế hoạch, nghiên cứu đang hoạt động bao gồm sự gia tăng trạng thái và cách định giá nó, hiệu suất đồng bộ hóa và cơ sở dữ liệu trên trạng thái lớn hơn, khả năng tiết kiệm dung lượng đĩa từ việc hết hạn lịch sử, và cuối cùng là tính phi trạng thái.

#### Tài liệu đọc thêm {#background-reading-5}

- [Khởi chạy nút Ethereum của riêng bạn](/developers/docs/nodes-and-clients/run-a-node/)
- [Tính phi trạng thái và hết hạn trạng thái](/roadmap/statelessness/)
- [Ethereum trên ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Nghiên cứu gần đây {#recent-research-5}

- [Mở rộng quy mô Ethereum: con đường hướng tới giới hạn gas cao hơn và xa hơn nữa](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: Lịch trình giới hạn gas](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: Tăng chi phí Gas tạo trạng thái](https://eips.ethereum.org/EIPS/eip-8037)

## Bảo mật {#security}

Bảo mật là một chủ đề rộng có thể bao gồm việc ngăn chặn thư rác và lừa đảo, bảo mật Ví, bảo mật phần cứng, bảo mật kinh tế học mật mã, khả năng chống kiểm duyệt, sự sẵn sàng cho hậu lượng tử, săn lỗi (bug hunting), cũng như việc kiểm thử và xác minh các ứng dụng và phần mềm máy khách. [Lộ trình bảo mật](/roadmap/security/) của Ethereum bao gồm các công việc ở cấp độ Giao thức.

### Mật mã học & ZKP {#cryptography--zkp}

Bằng chứng không kiến thức (ZKP) và mật mã học rất quan trọng để xây dựng quyền riêng tư và bảo mật vào Ethereum và các ứng dụng của nó. Việc chứng minh không tri thức đã chuyển từ nghiên cứu sang cơ sở hạ tầng sản xuất: các trình chứng minh (provers) chứng minh các khối Ethereum thực tế hiện đang được đánh giá chuẩn công khai về độ trễ, chi phí và tính hợp lệ. Các vấn đề mở đã thay đổi tương ứng, hướng tới việc chứng minh các khối lớp 1 (l1) đủ nhanh để thực hiện trong thời gian thực, tính toán chặt chẽ về tính bảo mật của các hệ thống chứng minh đang được sử dụng, và chuẩn bị cho mật mã học hậu lượng tử.

#### Tài liệu đọc thêm {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Quyền riêng tư](/roadmap/privacy/)
- [Podcast về Không tri thức](https://zeroknowledge.fm/)

#### Nghiên cứu gần đây {#recent-research-6}

- [ZK trên Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Mật mã học trên Ethresear.ch](https://ethresear.ch/c/cryptography/28)
- [Công cụ tính toán tính hợp lệ cho các hệ thống chứng minh zkEVM dựa trên Mã băm](https://github.com/ethereum/soundcalc)
- [Triển khai zkEVM lớp 1 (l1): nền tảng bảo mật](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### Ví {#wallets}

Ví Ethereum có thể là tiện ích mở rộng trình duyệt, ứng dụng trên máy tính để bàn và thiết bị di động hoặc các hợp đồng thông minh trên Ethereum. Trừu tượng hóa tài khoản không còn là thử nghiệm: ERC-4337 cung cấp các Tài khoản thông minh mà không cần thay đổi Giao thức, và EIP-7702 cho phép một Tài khoản thông thường thiết lập mã để việc gom lô giao dịch, tài trợ Gas và khôi phục xã hội hoạt động với Địa chỉ mà người dùng đã có. Nghiên cứu mở hiện tập trung vào trừu tượng hóa tài khoản gốc trong chính Giao thức, vào các kiến trúc Tài khoản có tính mô-đun và có thể kiểm toán, cũng như vào việc quản lý và khôi phục khóa mà những người bình thường có thể vận hành một cách an toàn.

#### Tài liệu đọc thêm {#background-reading-7}

- [Giới thiệu về Ví](/wallets/)
- [Giới thiệu về bảo mật Ví](/security/)
- [Trừu tượng hóa tài khoản](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Bảo mật trên Ethresear.ch](https://ethresear.ch/c/security/25)

#### Nghiên cứu gần đây {#recent-research-7}

- [EIP-8141: Giao dịch khung (Frame transaction)](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: API gọi Ví](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: Khám phá nhiều nhà cung cấp được tiêm (injected provider)](https://eips.ethereum.org/EIPS/eip-6963)
- [Ví hợp đồng thông minh tập trung vào xác thực](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## Cộng đồng, giáo dục và tiếp cận {#community-education-and-outreach}

Việc tiếp nhận người dùng mới vào Ethereum đòi hỏi các tài nguyên giáo dục và phương pháp tiếp cận mới. Điều này có thể bao gồm các bài đăng trên blog và bài báo, sách, podcast, meme, tài nguyên giảng dạy, sự kiện và bất kỳ thứ gì khác giúp xây dựng cộng đồng, chào đón những người mới bắt đầu và giáo dục mọi người về Ethereum.

### Thiết kế và UX {#design-and-ux}

Để tiếp nhận người dùng nhiều hơn vào Ethereum, hệ sinh thái phải cải thiện thiết kế và trải nghiệm người dùng. Điều này đòi hỏi các nhà thiết kế và chuyên gia sản phẩm phải xem xét lại cách thức hoạt động của Ví và ứng dụng, và ngày càng có nghĩa là thiết kế dựa trên các tiêu chuẩn đã tồn tại: các lệnh gọi Ví được gom lô, tài trợ Gas, các Tài khoản có thể được khôi phục, và các Địa chỉ mà con người có thể đọc được mang theo Chuỗi mà chúng thuộc về. Có tương đối ít các địa điểm chính thống cho nghiên cứu UX Web3, vì vậy các nghiên cứu đã công bố và hướng dẫn thiết kế có xu hướng bị phân tán.

#### Tài liệu đọc thêm {#background-reading-8}

- [Thiết kế và UX trong Web3](/developers/docs/design-and-ux/)
- [Lộ trình trải nghiệm người dùng Ethereum](/roadmap/user-experience/)
- [Cẩm nang Thiết kế Web3](https://learnweb3.design/)
- [Sổ tay Thiết kế UX Web3](https://web3ux.design/)

#### Nghiên cứu gần đây {#recent-research-8}

- [UX/UI trên Ethresear.ch](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: API gọi Ví](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: Tên có khả năng tương tác](https://eips.ethereum.org/EIPS/eip-7828)

### Kinh tế học {#economics}

Nghiên cứu kinh tế học trong Ethereum nhìn chung theo hai hướng tiếp cận: xác thực tính bảo mật của các cơ chế dựa trên các ưu đãi kinh tế ("kinh tế vi mô") và phân tích các luồng giá trị giữa các giao thức, ứng dụng và người dùng ("kinh tế vĩ mô"). Có những yếu tố kinh tế học mật mã phức tạp liên quan đến tài sản gốc của Ethereum (ether) và các token được xây dựng trên nó (ví dụ như NFT và token ERC-20).

#### Tài liệu đọc thêm {#background-reading-9}

- [Nhóm Ưu đãi Mạnh mẽ (Robust Incentives Group)](https://rig.ethereum.org/)
- [Lớp học chuyên sâu về kinh tế học Ethereum và mô hình kinh tế](https://github.com/CADLabs/ethereum-economic-model)

#### Nghiên cứu gần đây {#recent-research-9}

- [Kinh tế học trên Ethresear.ch](https://ethresear.ch/c/economics/16)
- [Cân bằng nguồn cung lưu hành](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Định lượng MEV: Khu rừng tối đến mức nào?](https://arxiv.org/abs/2101.05511)

### Không gian khối và thị trường phí {#blockspace-fee-markets}

Thị trường không gian khối quản lý việc đưa vào các giao dịch của người dùng cuối, trực tiếp trên Ethereum (lớp 1 (l1)) hoặc trên các mạng lưới được kết nối, ví dụ: các bản cuộn (lớp 2 (l2)). Trên Ethereum, các giao dịch được gửi đến thị trường phí được triển khai trong giao thức dưới dạng EIP-1559, bảo vệ Chuỗi khỏi thư rác và định giá sự tắc nghẽn. Trên cả hai lớp, các giao dịch có thể tạo ra các ngoại ứng, được gọi là Giá trị có thể trích xuất tối đa (MEV), điều này dẫn đến các cấu trúc thị trường mới để nắm bắt hoặc quản lý các ngoại ứng này. Công việc hiện tại mở rộng điều này sang việc định giá nhiều tài nguyên cùng một lúc, vì trạng thái, dữ liệu và tính toán bị tắc nghẽn một cách độc lập, và thay đổi ai là người lắp ráp các khối và theo những điều khoản nào.

#### Tài liệu đọc thêm {#background-reading-10}

- [Thiết kế Cơ chế Phí Giao dịch cho Chuỗi khối Ethereum: Phân tích Kinh tế về EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Mô phỏng EIP-1559 (Nhóm Ưu đãi Mạnh mẽ)](https://ethereum.github.io/abm1559)
- [Kinh tế học Rollup từ những nguyên tắc cơ bản](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Chạy trước (Frontrunning), Sắp xếp lại Giao dịch và Sự bất ổn định Đồng thuận trong các Sàn giao dịch Phi tập trung](https://arxiv.org/abs/1904.05234)

#### Nghiên cứu gần đây {#recent-research-10}

- [EIP-7999: Thị trường phí đa chiều thống nhất](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: Danh sách truy cập cấp độ khối](https://eips.ethereum.org/EIPS/eip-7928)
- [MEV xuyên miền](https://arxiv.org/abs/2112.01472)

### Ưu đãi Bằng chứng cổ phần (PoS) {#proof-of-stake-incentives}

Các trình xác thực sử dụng tài sản gốc của Ethereum (ether) làm tài sản thế chấp chống lại hành vi không trung thực. Kinh tế học mật mã của điều này quyết định tính bảo mật của mạng lưới. Các trình xác thực tinh vi có thể khai thác các sắc thái của lớp ưu đãi để tiến hành các cuộc tấn công rõ ràng. Kể từ bản nâng cấp Pectra, các trình xác thực cũng có thể nắm giữ và kiếm tiền trên một số dư hiệu dụng lớn hơn nhiều và hợp nhất một số trình xác thực thành một, điều này làm thay đổi tính kinh tế của việc vận hành chúng.

#### Tài liệu đọc thêm {#background-reading-11}

- [Số dư hiệu dụng tối đa](/roadmap/pectra/maxeb/)
- [Lớp học chuyên sâu về kinh tế học Ethereum và mô hình kinh tế](https://github.com/CADLabs/ethereum-economic-model)
- [Mô phỏng các ưu đãi PoS (Nhóm Ưu đãi Mạnh mẽ)](https://ethereum.github.io/beaconrunner/)

#### Nghiên cứu gần đây {#recent-research-11}

- [Nhóm Ưu đãi Mạnh mẽ](https://rig.ethereum.org/)
- [Ba cuộc tấn công vào Ethereum PoS](https://arxiv.org/abs/2110.10086)

### Đặt cọc thanh khoản và phái sinh {#liquid-staking-and-derivatives}

Việc đặt cọc thanh khoản cho phép người dùng có ít hơn 32 ETH nhận được lợi suất đặt cọc bằng cách hoán đổi ether lấy một token đại diện cho ether đã đặt cọc có thể được sử dụng trong tài chính phi tập trung (DeFi). Tuy nhiên, các ưu đãi và động lực thị trường liên quan đến đặt cọc thanh khoản vẫn đang được khám phá, cũng như tác động của nó đối với tính bảo mật của Ethereum (ví dụ: rủi ro tập trung hóa).

#### Tài liệu đọc thêm {#background-reading-12}

- [Đặt cọc thanh khoản trên Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Con đường hướng tới việc đặt cọc Ethereum không cần tin cậy](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### Nghiên cứu gần đây {#recent-research-12}

- [Những rủi ro của Phái sinh Đặt cọc thanh khoản](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [Xử lý việc rút tiền từ Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## Kiểm thử {#testing}

### Kiểm thử máy khách và mạng lưới {#client-and-network-testing}

Các đặc tả kỹ thuật của Ethereum có thể thực thi được, và các bộ dữ liệu kiểm thử (test fixtures) được tạo ra từ chúng là những gì các nhóm máy khách dùng để kiểm tra các bản triển khai của họ. Bên cạnh đó, các bộ khung kiểm thử dùng chung chạy các máy khách đối đầu với nhau và đối đầu với các điều kiện mạng lưới thù địch có chủ ý, và các mạng thử nghiệm công khai thực thi các bản nâng cấp trước khi chúng tiếp cận Mạng chính. Cải thiện cơ sở hạ tầng này là một trong những công việc mang lại hiệu quả cao nhất, bởi vì đó là cách các lỗi được phát hiện trước khi chúng tiếp cận người dùng.

#### Tài liệu đọc thêm {#background-reading-24}

- [Đặc tả kỹ thuật lớp thực thi Ethereum](https://github.com/ethereum/execution-specs)
- [Đặc tả kỹ thuật ứng dụng khách đồng thuận](https://github.com/ethereum/consensus-specs)

#### Nghiên cứu gần đây {#recent-research-24}

- [hive, một bộ khung kiểm thử máy khách đầu cuối](https://github.com/ethereum/hive)
- [Assertoor, một công cụ kiểm thử mạng thử nghiệm](https://github.com/ethpandaops/assertoor)

### Xác minh hình thức {#formal-verification}

Xác minh hình thức sử dụng bằng chứng toán học được máy kiểm tra để thiết lập rằng một đặc tả kỹ thuật hoặc một bản triển khai hoạt động như dự định. Trong Ethereum, điều này bao gồm việc chứng minh rằng các bản triển khai EVM khớp với một ngữ nghĩa hình thức, chứng minh tính hợp lệ của các mạch và hệ thống chứng minh mà các trình chứng minh không tri thức dựa vào, và xác minh các nguyên thủy mật mã học bên dưới chúng. Nghiên cứu sâu hơn có thể củng cố các bằng chứng này và mở rộng chúng ra nhiều phần hơn của ngăn xếp.

#### Tài liệu đọc thêm {#background-reading-13}

- [Các zkEVM đã được xác minh](https://verified-zkevm.org/)
- [Xác minh hình thức (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Nghiên cứu gần đây {#recent-research-13}

- [Tổng quan về dự án zkEVM đã được xác minh](https://github.com/Verified-zkEVM/Overview)
- [KEVM: ngữ nghĩa của EVM trong K](https://github.com/runtimeverification/evm-semantics)
- [Xác minh hình thức của hợp đồng tiền gửi](https://github.com/runtimeverification/deposit-contract-verification)

## Khoa học dữ liệu và phân tích {#data-science-and-analytics}

Cần có thêm các công cụ phân tích dữ liệu và bảng điều khiển cung cấp thông tin chi tiết về hoạt động trên Ethereum và tình trạng của mạng lưới. Phần lớn dữ liệu cơ bản là công khai và có thể truy vấn được, vì vậy khoảng trống thường nằm ở khâu phân tích và trình bày thay vì ở khâu truy cập.

### Tài liệu đọc thêm {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Bảng điều khiển sự đa dạng máy khách](https://clientdiversity.org/)
- [Đặc tả kỹ thuật API thực thi JSON-RPC của Ethereum](https://ethereum.github.io/execution-apis/)

#### Nghiên cứu gần đây {#recent-research-14}

- [Phân tích Dữ liệu của Nhóm Ưu đãi Mạnh mẽ](https://rig.ethereum.org/)
- [Dữ liệu mở ethPandaOps](https://ethpandaops.io/data/)
- [L2BEAT: tóm tắt về mở rộng quy mô](https://l2beat.com/scaling/summary)

## Ứng dụng và công cụ {#apps-and-tooling}

Lớp ứng dụng hỗ trợ một hệ sinh thái đa dạng gồm các chương trình thanh toán các giao dịch trên lớp cơ sở của Ethereum. Các nhóm phát triển không ngừng tìm ra những cách mới để tận dụng Ethereum nhằm tạo ra các phiên bản có khả năng kết hợp, không cần cấp phép và chống kiểm duyệt của các ứng dụng Web2 quan trọng hoặc tạo ra các khái niệm hoàn toàn mới mang tính bản địa của Web3. Đồng thời, các công cụ mới đang được phát triển giúp cho việc xây dựng các ứng dụng phi tập trung (dapp) trên Ethereum bớt phức tạp hơn.

### DeFi {#defi}

Tài chính phi tập trung (DeFi) là một trong những lớp ứng dụng chính được xây dựng trên Ethereum. DeFi nhằm mục đích tạo ra các "lego tiền tệ" có khả năng kết hợp cho phép người dùng lưu trữ, chuyển, cho vay, đi vay và đầu tư tài sản tiền mã hóa bằng cách sử dụng các hợp đồng thông minh. DeFi là một không gian chuyển động nhanh và liên tục cập nhật. Nghiên cứu về các giao thức an toàn, hiệu quả và dễ tiếp cận là điều liên tục cần thiết.

#### Tài liệu đọc thêm {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: DeFi là gì?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Nghiên cứu gần đây {#recent-research-15}

- [Tài chính phi tập trung, quyền sở hữu tập trung?](https://arxiv.org/pdf/2012.09306.pdf)
- [Các ứng dụng trên Ethresear.ch](https://ethresear.ch/c/applications/18)

### DAO {#daos}

Một trường hợp sử dụng có tác động lớn đối với Ethereum là khả năng tổ chức theo cách phi tập trung thông qua việc sử dụng các DAO. Có rất nhiều nghiên cứu đang hoạt động về cách các DAO trên Ethereum có thể được phát triển và sử dụng để thực thi các hình thức Quản trị được cải thiện, như một công cụ điều phối tối thiểu hóa niềm tin, mở rộng đáng kể các lựa chọn của mọi người vượt ra ngoài các tập đoàn và tổ chức truyền thống.

#### Tài liệu đọc thêm {#background-reading-16}

- [Giới thiệu về DAO](/dao/)

#### Nghiên cứu gần đây {#recent-research-16}

- [Lập bản đồ hệ sinh thái DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Công cụ dành cho nhà phát triển {#developer-tools}

Các công cụ dành cho nhà phát triển Ethereum đang cải thiện nhanh chóng. Có rất nhiều hoạt động nghiên cứu và phát triển đang diễn ra trong lĩnh vực chung này.

#### Tài liệu đọc thêm {#background-reading-17}

- [Công cụ theo ngôn ngữ lập trình](/developers/docs/programming-languages/)
- [Các khung phát triển (Developer Frameworks)](/developers/docs/frameworks/)
- [Giới thiệu về dapp](/developers/docs/dapps/)
- [Các tiêu chuẩn token](/developers/docs/standards/tokens/)

#### Nghiên cứu gần đây {#recent-research-17}

- [Discord Eth R&D](https://discord.gg/qGpsxSA)
- [Đặc tả kỹ thuật API thực thi Ethereum](https://github.com/ethereum/execution-apis)

### Oracle {#oracles}

Các Oracle nhập dữ liệu ngoài chuỗi vào Chuỗi khối theo cách không cần cấp phép và phi tập trung. Việc đưa dữ liệu này lên trên chuỗi cho phép các dapp phản ứng với các hiện tượng trong thế giới thực như biến động giá của các tài sản trong thế giới thực, các sự kiện trong các ứng dụng ngoài chuỗi, hoặc thậm chí là những thay đổi về thời tiết.

#### Tài liệu đọc thêm {#background-reading-18}

- [Giới thiệu về Oracle](/developers/docs/oracles/)

#### Nghiên cứu gần đây {#recent-research-18}

- [Khảo sát về các Oracle Chuỗi khối](https://arxiv.org/pdf/2004.07140.pdf)

### Bảo mật ứng dụng {#app-security}

Các vụ hack trên Ethereum thường khai thác các lỗ hổng trong các ứng dụng riêng lẻ thay vì trong chính Giao thức. Các tin tặc và nhà phát triển ứng dụng đang bị cuốn vào một cuộc chạy đua vũ trang để phát triển các phương thức tấn công và phòng thủ mới. Điều này có nghĩa là luôn cần có những nghiên cứu và phát triển quan trọng để giữ cho các ứng dụng an toàn trước các vụ hack.

#### Tài liệu đọc thêm {#background-reading-19}

- [Bảo mật hợp đồng thông minh](/developers/docs/smart-contracts/security/)
- [Báo cáo về vụ khai thác Wormhole](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Danh sách các báo cáo sau sự cố (post-mortem) về các vụ hack hợp đồng Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Nghiên cứu gần đây {#recent-research-19}

- [Các ứng dụng trên Ethresear.ch](https://ethresear.ch/c/applications/18)

### Ngăn xếp công nghệ {#technology-stack}

Phi tập trung hóa toàn bộ ngăn xếp công nghệ Ethereum là một lĩnh vực nghiên cứu quan trọng. Hiện tại, các dapp trên Ethereum thường có một số điểm tập trung hóa vì chúng dựa vào các công cụ hoặc cơ sở hạ tầng tập trung. Giảm bớt sự phụ thuộc đó có nghĩa là làm cho các ứng dụng có thể đọc Ethereum một cách thực tế mà không cần tin cậy vào một nhà cung cấp duy nhất, đó là lúc các máy khách nhẹ và quyền truy cập không cần tin cậy vào dữ liệu nút phát huy tác dụng.

#### Tài liệu đọc thêm {#background-reading-20}

- [Ngăn xếp Ethereum](/developers/docs/ethereum-stack/)
- [Máy khách nhẹ](/developers/docs/nodes-and-clients/light-clients/)
- [Giới thiệu về hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Giới thiệu về lưu trữ phi tập trung](/developers/docs/storage/)

#### Nghiên cứu gần đây {#recent-research-20}

- [Khả năng kết hợp của hợp đồng thông minh](/developers/docs/smart-contracts/composability/)
- [Coinbase: Giới thiệu về Ngăn xếp Web3](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)