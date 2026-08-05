---
title: Các lĩnh vực nghiên cứu đang hoạt động của Ethereum
description: Khám phá các lĩnh vực nghiên cứu mở khác nhau và tìm hiểu cách tham gia.
lang: vi
---

Một trong những điểm mạnh chính của Ethereum là có một cộng đồng kỹ thuật và nghiên cứu tích cực không ngừng cải thiện nó. Nhiều người nhiệt huyết, có kỹ năng trên toàn thế giới muốn cống hiến cho các vấn đề nổi bật trong Ethereum, nhưng không phải lúc nào cũng dễ dàng tìm ra những vấn đề đó là gì. Trang này phác thảo các lĩnh vực nghiên cứu đang hoạt động chính như một hướng dẫn sơ bộ về những công nghệ tiên tiến nhất của Ethereum.

## Cách thức hoạt động của nghiên cứu Ethereum {#how-ethereum-research-works}

Nghiên cứu Ethereum mang tính mở và minh bạch, thể hiện các nguyên tắc của [khoa học phi tập trung (desci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Văn hóa ở đây là làm cho các công cụ và kết quả nghiên cứu trở nên cởi mở và có tính tương tác nhất có thể, ví dụ: thông qua các sổ tay có thể thực thi. Nghiên cứu Ethereum tiến triển nhanh chóng, với những phát hiện mới được đăng tải và thảo luận công khai trên các diễn đàn như [ethresear.ch](https://ethresear.ch/) thay vì tiếp cận cộng đồng thông qua các ấn phẩm truyền thống sau nhiều vòng bình duyệt.

## Tài nguyên nghiên cứu chung {#general-research-resources}

Bất kể chủ đề cụ thể là gì, có vô số thông tin về nghiên cứu Ethereum có thể được tìm thấy tại [ethresear.ch](https://ethresear.ch) và [kênh Discord Eth R&D](https://discord.gg/qGpsxSA). Đây là những nơi chính mà các nhà nghiên cứu Ethereum thảo luận về những ý tưởng và cơ hội phát triển mới nhất.

Báo cáo này được xuất bản vào tháng 5 năm 2022 bởi [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) cung cấp một cái nhìn tổng quan tốt về lộ trình Ethereum.

## Nguồn tài trợ {#sources-of-funding}

Bạn có thể tham gia vào nghiên cứu Ethereum và được trả tiền cho việc đó! Ví dụ, [Tổ chức Ethereum](/foundation/) gần đây đã tổ chức một [vòng tài trợ Trợ cấp Học thuật](https://esp.ethereum.foundation/academic-grants). Bạn có thể tìm thấy thông tin về các cơ hội tài trợ đang hoạt động và sắp tới trên [trang trợ cấp Ethereum](/community/grants/).

## Nghiên cứu Giao thức {#protocol-research}

Nghiên cứu Giao thức liên quan đến lớp cơ sở của Ethereum - tập hợp các quy tắc xác định cách các nút kết nối, giao tiếp, trao đổi và lưu trữ dữ liệu Ethereum và đạt được đồng thuận về trạng thái của Chuỗi khối. Nghiên cứu Giao thức được chia thành hai danh mục cấp cao nhất: đồng thuận và thực thi.

### Đồng thuận {#consensus}

Nghiên cứu đồng thuận liên quan đến [cơ chế Bằng chứng cổ phần (PoS) của Ethereum](/developers/docs/consensus-mechanisms/pos/). Một số chủ đề nghiên cứu đồng thuận ví dụ là:

- xác định và vá các lỗ hổng;
- định lượng bảo mật kinh tế học mật mã;
- tăng cường bảo mật hoặc hiệu suất của các triển khai máy khách;
- và phát triển các máy khách nhẹ.

Cùng với nghiên cứu hướng tới tương lai, một số thiết kế lại cơ bản của Giao thức, chẳng hạn như tính chung cuộc trong một slot, đang được nghiên cứu để cho phép những cải tiến đáng kể đối với Ethereum. Hơn nữa, tính hiệu quả, an toàn và giám sát mạng lưới ngang hàng giữa các ứng dụng khách đồng thuận cũng là những chủ đề nghiên cứu quan trọng.

#### Tài liệu đọc thêm {#background-reading}

- [Giới thiệu về Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Bài báo về Casper FFG](https://arxiv.org/abs/1710.09437)
- [Giải thích về Casper FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Bài báo về Gasper](https://arxiv.org/abs/2003.03052)

#### Nghiên cứu gần đây {#recent-research}

- [Đồng thuận trên Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Tình thế tiến thoái lưỡng nan về Tính khả dụng/Tính chung cuộc](https://arxiv.org/abs/2009.04987)
- [Tính chung cuộc trong một slot](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Tách biệt người đề xuất và người xây dựng (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Thực thi {#execution}

Lớp thực thi liên quan đến việc thực thi các giao dịch, chạy [Máy ảo Ethereum (EVM)](/developers/docs/evm/) và tạo các tải trọng thực thi để chuyển đến lớp đồng thuận. Có nhiều lĩnh vực nghiên cứu đang hoạt động, bao gồm:

- xây dựng hỗ trợ máy khách nhẹ;
- nghiên cứu giới hạn Gas;
- và kết hợp các cấu trúc dữ liệu mới (ví dụ: cây Verkle).

#### Tài liệu đọc thêm {#background-reading-1}

- [Giới thiệu về EVM](/developers/docs/evm)
- [Lớp thực thi trên Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Nghiên cứu gần đây {#recent-research-1}

- [Tối ưu hóa cơ sở dữ liệu](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Hết hạn trạng thái](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Các con đường dẫn đến hết hạn trạng thái](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Đề xuất Verkle và hết hạn trạng thái](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Quản lý lịch sử](https://eips.ethereum.org/EIPS/eip-4444)
- [Cây Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Lấy mẫu tính khả dụng của dữ liệu](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Phát triển Máy khách {#client-development}

Các máy khách Ethereum là các bản triển khai của Giao thức Ethereum. Việc phát triển máy khách biến các kết quả từ nghiên cứu Giao thức thành hiện thực bằng cách xây dựng chúng vào các máy khách này. Phát triển máy khách bao gồm việc cập nhật các thông số kỹ thuật của máy khách cũng như xây dựng các bản triển khai cụ thể.

Một nút Ethereum được yêu cầu chạy hai phần mềm:

1. một ứng dụng khách đồng thuận để theo dõi phần đầu của Chuỗi khối, truyền bá các khối và xử lý logic đồng thuận
2. một máy khách thực thi để hỗ trợ Máy ảo Ethereum và thực thi các giao dịch và hợp đồng thông minh

Xem [trang nút và máy khách](/developers/docs/nodes-and-clients/) để biết thêm chi tiết về các nút và máy khách cũng như danh sách tất cả các bản triển khai máy khách hiện tại. Bạn cũng có thể tìm thấy lịch sử của tất cả các bản nâng cấp Ethereum trên [trang lịch sử](/ethereum-forks/).

### Máy khách thực thi {#execution-clients}

- [Thông số kỹ thuật máy khách thực thi](https://github.com/ethereum/execution-specs)
- [Thông số kỹ thuật API thực thi](https://github.com/ethereum/execution-apis)

### Ứng dụng khách đồng thuận {#consensus-clients}

- [Thông số kỹ thuật ứng dụng khách đồng thuận](https://github.com/ethereum/consensus-specs)
- [Thông số kỹ thuật API Beacon](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Mở rộng quy mô và hiệu suất {#scaling-and-performance}

Mở rộng quy mô Ethereum là một lĩnh vực trọng tâm lớn đối với các nhà nghiên cứu Ethereum. Các phương pháp tiếp cận hiện tại bao gồm việc chuyển các giao dịch sang các bản cuộn và làm cho chúng rẻ nhất có thể bằng cách sử dụng các blob dữ liệu. Thông tin giới thiệu về việc mở rộng quy mô Ethereum có sẵn trên [trang mở rộng quy mô](/developers/docs/scaling) của chúng tôi.

### Lớp 2 {#layer-2}

Hiện có một số Giao thức lớp 2 (l2) mở rộng quy mô Ethereum bằng cách sử dụng các kỹ thuật khác nhau để gom lô các giao dịch và bảo mật chúng trên lớp 1 (l1) của Ethereum. Đây là một chủ đề đang phát triển rất nhanh với nhiều tiềm năng nghiên cứu và phát triển.

#### Tài liệu đọc thêm {#background-reading-2}

- [Giới thiệu về lớp 2](/layer-2/)
- [Polynya: Bản cuộn, DA và các chuỗi mô-đun](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Nghiên cứu gần đây {#recent-research-2}

- [Sắp xếp công bằng cho các trình tự tự động (sequencer) của Arbitrum](https://eprint.iacr.org/2021/1465)
- [Lớp 2 trên Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [Lộ trình lấy Rollup làm trung tâm](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### Cầu nối {#bridges}

Một lĩnh vực cụ thể của lớp 2 đòi hỏi nhiều nghiên cứu và phát triển hơn là các cầu nối an toàn và hiệu suất cao. Điều này bao gồm các cầu nối giữa các lớp 2 khác nhau và các cầu nối giữa lớp 1 và lớp 2. Đây là một lĩnh vực nghiên cứu đặc biệt quan trọng vì các cầu nối thường là mục tiêu của tin tặc.

#### Tài liệu đọc thêm {#background-reading-3}

- [Giới thiệu về cầu nối Chuỗi khối](/bridges/)
- [Vitalik nói về cầu nối](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Bài viết về cầu nối Chuỗi khối](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Giá trị bị khóa trong các cầu nối](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### Nghiên cứu gần đây {#recent-research-3}

- [Xác thực các cầu nối](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Phân mảnh {#sharding}

Phân mảnh Chuỗi khối của Ethereum từ lâu đã là một phần của lộ trình phát triển. Tuy nhiên, các giải pháp mở rộng quy mô mới như "danksharding" hiện đang chiếm vị trí trung tâm.

Tiền thân của danksharding đầy đủ được gọi là Proto-Danksharding đã đi vào hoạt động cùng với bản nâng cấp Dencun (Cancun-Deneb) của mạng lưới.

[Tìm hiểu thêm về bản nâng cấp Dencun](/roadmap/dencun/)

#### Tài liệu đọc thêm {#background-reading-4}

- [Ghi chú về Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Video về danksharding của Bankless](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Bản tóm tắt nghiên cứu phân mảnh Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Nghiên cứu gần đây {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik nói về phân mảnh và lấy mẫu tính khả dụng của dữ liệu](https://hackmd.io/@vbuterin/sharding_proposal)

### Phần cứng {#hardware}

[Chạy các nút](/developers/docs/nodes-and-clients/run-a-node/) trên phần cứng khiêm tốn là nền tảng để giữ cho Ethereum phi tập trung. Do đó, nghiên cứu tích cực về việc giảm thiểu các yêu cầu phần cứng để chạy các nút là một lĩnh vực nghiên cứu quan trọng.

#### Tài liệu đọc thêm {#background-reading-5}

- [Ethereum trên ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Nghiên cứu gần đây {#recent-research-5}

- [ECDSA trên FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Bảo mật {#security}

Bảo mật là một chủ đề rộng có thể bao gồm phòng chống thư rác/lừa đảo, bảo mật Ví, bảo mật phần cứng, bảo mật kinh tế học mật mã, săn lỗi và thử nghiệm các ứng dụng và phần mềm máy khách cũng như quản lý khóa. Đóng góp kiến thức trong các lĩnh vực này sẽ giúp thúc đẩy việc áp dụng rộng rãi.

### Mật mã học & ZKP {#cryptography--zkp}

Bằng chứng không kiến thức (ZKP) và mật mã học rất quan trọng để xây dựng quyền riêng tư và bảo mật vào Ethereum và các ứng dụng của nó. Không tri thức là một không gian tương đối non trẻ nhưng phát triển nhanh chóng với nhiều cơ hội nghiên cứu và phát triển mở. Một số khả năng bao gồm phát triển các bản triển khai hiệu quả hơn của [thuật toán băm Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), tìm kiếm các cam kết đa thức tốt hơn so với hiện tại hoặc giảm chi phí tạo khóa công khai ECDSA và các mạch xác minh chữ ký.

#### Tài liệu đọc thêm {#background-reading-6}

- [Blog 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Podcast Zero Knowledge](https://zeroknowledge.fm/)

#### Nghiên cứu gần đây {#recent-research-6}

- [Tiến bộ gần đây trong mật mã học đường cong elliptic](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [ZK trên Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Ví {#wallets}

Ví Ethereum có thể là tiện ích mở rộng trình duyệt, ứng dụng trên máy tính để bàn và thiết bị di động hoặc hợp đồng thông minh trên Ethereum. Có nghiên cứu tích cực về các Ví khôi phục xã hội giúp giảm thiểu một số rủi ro liên quan đến việc quản lý khóa của người dùng cá nhân. Gắn liền với sự phát triển của Ví là nghiên cứu về các hình thức trừu tượng hóa tài khoản thay thế, đây là một lĩnh vực nghiên cứu mới nổi quan trọng.

#### Tài liệu đọc thêm {#background-reading-7}

- [Giới thiệu về Ví](/wallets/)
- [Giới thiệu về bảo mật Ví](/security/)
- [Bảo mật trên Ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938: Trừu tượng hóa tài khoản](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337: Trừu tượng hóa tài khoản](https://eips.ethereum.org/EIPS/eip-4337)

#### Nghiên cứu gần đây {#recent-research-7}

- [Ví hợp đồng thông minh tập trung vào xác thực](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Tương lai của các tài khoản](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074: Các Opcode AUTH và AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Xuất bản mã tại một Địa chỉ EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Cộng đồng, giáo dục và tiếp cận {#community-education-and-outreach}

Việc tiếp nhận người dùng mới vào Ethereum đòi hỏi các tài nguyên giáo dục và phương pháp tiếp cận mới. Điều này có thể bao gồm các bài đăng trên blog và bài viết, sách, podcast, meme, tài nguyên giảng dạy, sự kiện và bất kỳ thứ gì khác giúp xây dựng cộng đồng, chào đón những người mới bắt đầu và giáo dục mọi người về Ethereum.

### UX/UI {#uxui}

Để tiếp nhận người dùng nhiều hơn vào Ethereum, hệ sinh thái phải cải thiện UX/UI. Điều này sẽ yêu cầu các nhà thiết kế và chuyên gia sản phẩm xem xét lại thiết kế của Ví và ứng dụng.

#### Tài liệu đọc thêm {#background-reading-8}

- [UX/UI trên Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Nghiên cứu gần đây {#recent-research-8}

- [Discord Thiết kế Web3](https://discord.gg/FsCFPMTSm9)
- [Các nguyên tắc thiết kế Web3](https://www.web3designprinciples.com/)
- [Thảo luận về UX của Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Kinh tế học {#economics}

Nghiên cứu kinh tế học trong Ethereum nhìn chung tuân theo hai cách tiếp cận: xác thực tính bảo mật của các cơ chế dựa trên các ưu đãi kinh tế ("kinh tế vi mô") và phân tích các luồng giá trị giữa các Giao thức, ứng dụng và người dùng ("kinh tế vĩ mô"). Có những yếu tố kinh tế học mật mã phức tạp liên quan đến tài sản gốc của Ethereum (ether) và các token được xây dựng trên nó (ví dụ: NFT và token ERC-20).

#### Tài liệu đọc thêm {#background-reading-9}

- [Nhóm Ưu đãi Mạnh mẽ (Robust Incentives Group)](https://rig.ethereum.org/)
- [Hội thảo ETHconomics tại Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Nghiên cứu gần đây {#recent-research-9}

- [Phân tích thực nghiệm về EIP-1559](https://arxiv.org/abs/2201.05574)
- [Cân bằng nguồn cung lưu hành](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Định lượng MEV: Khu rừng tối đến mức nào?](https://arxiv.org/abs/2101.05511)

### Không gian khối và thị trường phí {#blockspace-fee-markets}

Thị trường không gian khối quản lý việc đưa vào các giao dịch của người dùng cuối, trực tiếp trên Ethereum (lớp 1) hoặc trên các mạng lưới được kết nối, ví dụ: các bản cuộn (lớp 2). Trên Ethereum, các giao dịch được gửi đến thị trường phí được triển khai trong Giao thức dưới dạng EIP-1559, bảo vệ Chuỗi khỏi thư rác và định giá tắc nghẽn. Trên cả hai lớp, các giao dịch có thể tạo ra các ngoại ứng, được gọi là Giá trị có thể trích xuất tối đa (MEV), điều này tạo ra các cấu trúc thị trường mới để nắm bắt hoặc quản lý các ngoại ứng này.

#### Tài liệu đọc thêm {#background-reading-10}

- [Thiết kế Cơ chế Phí giao dịch cho Chuỗi khối Ethereum: Phân tích Kinh tế về EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Mô phỏng EIP-1559 (Nhóm Ưu đãi Mạnh mẽ)](https://ethereum.github.io/abm1559)
- [Kinh tế học Rollup từ các nguyên tắc cơ bản](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Chạy trước (Frontrunning), Sắp xếp lại Giao dịch và Sự bất ổn định Đồng thuận trong các Sàn giao dịch Phi tập trung](https://arxiv.org/abs/1904.05234)

#### Nghiên cứu gần đây {#recent-research-10}

- [Video thuyết trình về EIP-1559 đa chiều](https://youtu.be/QbR4MTgnCko)
- [MEV xuyên miền](https://arxiv.org/abs/2112.01472)
- [Đấu giá MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Các ưu đãi Bằng chứng cổ phần {#proof-of-stake-incentives}

Các trình xác thực sử dụng tài sản gốc của Ethereum (ether) làm tài sản thế chấp chống lại hành vi không trung thực. Kinh tế học mật mã của điều này quyết định tính bảo mật của mạng lưới. Các trình xác thực tinh vi có thể khai thác các sắc thái của lớp ưu đãi để khởi chạy các cuộc tấn công rõ ràng.

#### Tài liệu đọc thêm {#background-reading-11}

- [Lớp học chuyên sâu về kinh tế học Ethereum và mô hình kinh tế](https://github.com/CADLabs/ethereum-economic-model)
- [Mô phỏng các ưu đãi PoS (Nhóm Ưu đãi Mạnh mẽ)](https://ethereum.github.io/beaconrunner/)

#### Nghiên cứu gần đây {#recent-research-11}

- [Tăng cường khả năng chống kiểm duyệt của các giao dịch theo cơ chế tách biệt người đề xuất và người xây dựng (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Ba cuộc tấn công vào Ethereum PoS](https://arxiv.org/abs/2110.10086)

### Đặt cọc thanh khoản và các công cụ phái sinh {#liquid-staking-and-derivatives}

Đặt cọc thanh khoản cho phép người dùng có ít hơn 32 ETH nhận được lợi suất đặt cọc bằng cách hoán đổi ether lấy một token đại diện cho ether đã đặt cọc có thể được sử dụng trong DeFi. Tuy nhiên, các ưu đãi và động lực thị trường liên quan đến đặt cọc thanh khoản vẫn đang được khám phá, cũng như tác động của nó đối với bảo mật của Ethereum (ví dụ: rủi ro tập trung hóa).

#### Tài liệu đọc thêm {#background-reading-12}

- [Đặt cọc thanh khoản trên Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Con đường dẫn đến việc đặt cọc Ethereum không cần tin cậy](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: Giới thiệu Giao thức đặt cọc](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Nghiên cứu gần đây {#recent-research-12}

- [Xử lý rút tiền từ Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Thông tin xác thực rút tiền](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Rủi ro của các Công cụ Phái sinh Đặt cọc Thanh khoản](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Thử nghiệm {#testing}

### Xác minh hình thức {#formal-verification}

Xác minh hình thức là việc viết mã để xác minh rằng các thông số kỹ thuật đồng thuận của Ethereum là chính xác và không có lỗi. Có một phiên bản có thể thực thi của thông số kỹ thuật được viết bằng Python yêu cầu bảo trì và phát triển. Nghiên cứu sâu hơn có thể giúp cải thiện việc triển khai Python của thông số kỹ thuật và thêm các công cụ có thể xác minh tính chính xác một cách mạnh mẽ hơn và xác định các vấn đề.

#### Tài liệu đọc thêm {#background-reading-13}

- [Giới thiệu về xác minh hình thức](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Xác minh hình thức (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Nghiên cứu gần đây {#recent-research-13}

- [Xác minh hình thức của hợp đồng tiền gửi](https://github.com/runtimeverification/deposit-contract-verification)
- [Xác minh hình thức của thông số kỹ thuật Chuỗi Beacon](https://github.com/runtimeverification/deposit-contract-verification)

## Khoa học dữ liệu và phân tích {#data-science-and-analytics}

Cần có thêm các công cụ phân tích dữ liệu và bảng điều khiển cung cấp thông tin chi tiết về hoạt động trên Ethereum và tình trạng của mạng lưới.

### Tài liệu đọc thêm {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Bảng điều khiển sự đa dạng máy khách](https://clientdiversity.org/)

#### Nghiên cứu gần đây {#recent-research-14}

- [Phân tích Dữ liệu của Nhóm Ưu đãi Mạnh mẽ](https://rig.ethereum.org/)

## Ứng dụng và công cụ {#apps-and-tooling}

Lớp ứng dụng hỗ trợ một hệ sinh thái đa dạng gồm các chương trình giải quyết các giao dịch trên lớp cơ sở của Ethereum. Các nhóm phát triển không ngừng tìm ra những cách mới để tận dụng Ethereum nhằm tạo ra các phiên bản có khả năng kết hợp, không cần cấp phép và chống kiểm duyệt của các ứng dụng Web2 quan trọng hoặc tạo ra các khái niệm hoàn toàn mới dành riêng cho Web3. Đồng thời, các công cụ mới đang được phát triển giúp việc xây dựng các ứng dụng phi tập trung (dapp) trên Ethereum trở nên bớt phức tạp hơn.

### DeFi {#defi}

Tài chính phi tập trung (DeFi) là một trong những lớp ứng dụng chính được xây dựng trên Ethereum. DeFi nhằm mục đích tạo ra các "lego tiền tệ" có khả năng kết hợp cho phép người dùng lưu trữ, chuyển, cho vay, đi vay và đầu tư tài sản tiền mã hóa bằng cách sử dụng các hợp đồng thông minh. DeFi là một không gian phát triển nhanh chóng và liên tục được cập nhật. Nghiên cứu về các Giao thức an toàn, hiệu quả và dễ tiếp cận là điều liên tục cần thiết.

#### Tài liệu đọc thêm {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: DeFi là gì?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Nghiên cứu gần đây {#recent-research-15}

- [Tài chính phi tập trung, quyền sở hữu tập trung?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Con đường dẫn đến các giao dịch dưới một đô la](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Một trường hợp sử dụng có tác động lớn đối với Ethereum là khả năng tổ chức theo cách phi tập trung thông qua việc sử dụng các DAO. Có rất nhiều nghiên cứu tích cực về cách các DAO trên Ethereum có thể được phát triển và sử dụng để thực thi các hình thức Quản trị được cải thiện, như một công cụ điều phối tối thiểu hóa niềm tin, mở rộng đáng kể các lựa chọn của mọi người vượt ra ngoài các tập đoàn và tổ chức truyền thống.

#### Tài liệu đọc thêm {#background-reading-16}

- [Giới thiệu về DAO](/dao/)
- [DAO Collective](https://daocollective.xyz/)

#### Nghiên cứu gần đây {#recent-research-16}

- [Lập bản đồ hệ sinh thái DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Công cụ dành cho nhà phát triển {#developer-tools}

Các công cụ dành cho nhà phát triển Ethereum đang được cải thiện nhanh chóng. Có rất nhiều nghiên cứu và phát triển tích cực cần thực hiện trong lĩnh vực chung này.

#### Tài liệu đọc thêm {#background-reading-17}

- [Công cụ theo ngôn ngữ lập trình](/developers/docs/programming-languages/)
- [Các Framework dành cho nhà phát triển](/developers/docs/frameworks/)
- [Danh sách công cụ dành cho nhà phát triển đồng thuận](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Các tiêu chuẩn token](/developers/docs/standards/tokens/)
- [CryptoDevHub: Các công cụ EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Nghiên cứu gần đây {#recent-research-17}

- [Kênh Công cụ Đồng thuận trên Discord Eth R&D](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Oracle {#oracles}

Các oracle nhập dữ liệu ngoài chuỗi vào Chuỗi khối theo cách không cần cấp phép và phi tập trung. Việc đưa dữ liệu này lên chuỗi cho phép các dapp phản ứng với các hiện tượng trong thế giới thực như biến động giá của các tài sản trong thế giới thực, các sự kiện trong các ứng dụng ngoài chuỗi hoặc thậm chí là những thay đổi về thời tiết.

#### Tài liệu đọc thêm {#background-reading-18}

- [Giới thiệu về Oracle](/developers/docs/oracles/)

#### Nghiên cứu gần đây {#recent-research-18}

- [Khảo sát về các oracle Chuỗi khối](https://arxiv.org/pdf/2004.07140.pdf)
- [Sách trắng Chainlink](https://chain.link/whitepaper)

### Bảo mật ứng dụng {#app-security}

Các vụ hack trên Ethereum thường khai thác các lỗ hổng trong các ứng dụng riêng lẻ thay vì trong chính Giao thức. Tin tặc và các nhà phát triển ứng dụng đang bị cuốn vào một cuộc chạy đua vũ trang để phát triển các cuộc tấn công và phòng thủ mới. Điều này có nghĩa là luôn cần có những nghiên cứu và phát triển quan trọng để giữ cho các ứng dụng an toàn trước các vụ hack.

#### Tài liệu đọc thêm {#background-reading-19}

- [Báo cáo khai thác Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Danh sách các bài phân tích sau sự cố hack hợp đồng Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Nghiên cứu gần đây {#recent-research-19}

- [Các ứng dụng trên Ethresear.ch](https://ethresear.ch/c/applications/18)

### Ngăn xếp công nghệ {#technology-stack}

Phi tập trung hóa toàn bộ ngăn xếp công nghệ Ethereum là một lĩnh vực nghiên cứu quan trọng. Hiện tại, các dapp trên Ethereum thường có một số điểm tập trung hóa vì chúng dựa vào các công cụ hoặc cơ sở hạ tầng tập trung.

#### Tài liệu đọc thêm {#background-reading-20}

- [Ngăn xếp Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: Giới thiệu về Ngăn xếp Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Giới thiệu về hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Giới thiệu về lưu trữ phi tập trung](/developers/docs/storage/)

#### Nghiên cứu gần đây {#recent-research-20}

- [Khả năng kết hợp của hợp đồng thông minh](/developers/docs/smart-contracts/composability/)