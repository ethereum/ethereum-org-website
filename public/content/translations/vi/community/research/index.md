---
title: "Những đề tài nghiên cứu phát triển Ethereum"
description: "Khám phá mô hình nghiên cứu mở và tham gia đóng góp."
lang: vi
---

# Nghiên cứu phát triển Ethereum {#active-areas-of-ethereum-research}

Một trong những thế mạnh cốt lõi của Ethereum là việc có một cộng đồng tập hợp những nghiên cứu sinh và kĩ sư liên tục tham gia cải thiện, phát triển hệ sinh thái. Nhiều cá nhân với kĩ năng và đam mê rất sẵn sàng tham gia vào giải quyết những vấn đề tồn đọng trong hệ sinh thái Ethereum, nhưng lại gặp khó khăn trong việc tiếp cận những vấn đề đó. Trang thông tin này giúp trình bày những đề tài nghiên cứu trọng yếu mà Ethereum đang hướng tới.

## Hoạt động tham gia nghiên cứu Ethereum được triển khai như thế nào?{#how-ethereum-research-works}

Tham gia nghiên cứu Ethereum là một hoạt động công khai, thừa kế những quy tắc của [Khoa học phi tập trung (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Mục tiêu là hướng tới việc biến các công cụ và kết quả nghiên cứu trở nên thân thiện nhất có thể, ví dụ, thông qua các sổ tay thực thi. Hoạt động nghiên cứu Ethereum diễn ra với tốc độ rất nhanh, với việc các sáng kiến, thông tin mới sẽ liên tục được đăng và thảo luận trên các trang thông tin như [ethresear.ch](https://ethresear.ch/) thay vì thông qua các hình thức đăng tải truyền thống yêu cầu quy trình đánh giá phức tạp.

## Tài liệu nghiên cứu tổng hợp {#general-research-resources}

Đối với bất kì đề tài cụ thể nào, luôn luôn có các nguồn thông tin chất lượng có thể được tìm thấy ở [ethresear.ch](https://ethresear.ch) và kênh Discord Eth R&D (https://discord.gg/qGpsxSA). Tại đây cộng đồng các nhà nghiên cứu về Ethereum cùng thảo luận những ý tưởng và cơ hội phát triển mới nhất.

Bản báo cáo được phát hành vào tháng Năm 2022 bởi [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) sẽ cung cấp một cái nhìn bao quát hơn về kế hoạch phát triển của Ethereum.

## Nguồn tài trợ {#sources-of-funding}

Bạn có thể tham gia nghiên cứu cùng Ethereum và được trả tiền cho những đóng góp của bạn! Ví dụ, [Quỹ Ethereum](/foundation/) gần đây đã triển khai một [Chương trình tài trợ cho các đóng góp về học thuật](https://esp.ethereum.foundation/academic-grants). Bạn có thể tìm hiểu thêm về các hoạt động và cơ hội tài trợ sắp tới hay đang được triển khai ở [trang tài trợ của Ethereum](/community/grants/).

## Nghiên cứu về giao thức {#protocol-research}

Nghiên cứu về giao thức sẽ bao gồm những yếu tố liên quan đến lớp nền tảng của Ethereum - những quy tắc định hình cách các kết nối giữa các nút, trao đổi và lưu trữ thông tin trên Ethereum và cách đạt được sự đồng thuận về trạng thái của chuỗi khối. Nghiên cứu về giao thức được chia thành hai đề mục tiên quyết: đồng thuận và thực thi.

### Cơ chế đồng thuận {#consensus}

Nghiên cứu về cơ chế đồng thuận sẽ liên quan đến [Cơ chế bảo chứng cổ phần của Ethereum](/developers/docs/consensus-mechanisms/pos/). Một số ví dụ cho các đề tài nghiên cứu về cơ chế đồng thuận bao gồm:

- xác định và vá những lỗ hổng bảo mật;
- đo lường nền kinh tế tiền điện tử;
- cải thiện bảo mật hoặc hiệu suất của việc triển khai bộ xử lý;
- và phát triển các bộ xử lý con.

Bên cạnh những nghiên cứu mang tính phát triển, một số cơ chế cốt lõi trong việc thiết kế lại giao thức, ví dụ như Quyết định cuối cùng trong một lượt duy nhất, cũng đang được nghiên cứu để mở ra những cơ hội cải tiến Ethereum. Ngoài ra, mức độ hiệu quả, an toàn, và theo dõi hệ thống mạng ngang hàng giữa các bộ xử lý cơ chế đồng thuận cũng là những đề tài nghiên cứu quan trọng.

#### Tài liệu tham khảo {#background-reading}

- [Giới thiệu về Cơ chế bảo chứng cổ phần](/developers/docs/consensus-mechanisms/pos/)
- [Nghiên cứu về Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Giải thích về Casper-FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Nghiên cứu về Gasper](https://arxiv.org/abs/2003.03052)

#### Những nghiên cứu gần đây {#recent-research}

- [Bài nghiên cứu của Ethresear.ch về Sự đồng thuận](https://ethresear.ch/c/consensus/29)
- [Vấn đề giữa tính khả dụng và tính quyết định cuối cùng](https://arxiv.org/abs/2009.04987)
- [Quyết định cuối cùng trong một lượt hoặc vòng duy nhất](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Tách biệt nhóm đề xuất và nhóm xây dựng chuỗi khối](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Thực thi {#execution}

Lớp thực thi liên quan đến việc xử lí các giao dịch, vận hành [Máy ảo Ethereum (EVM)](/developers/docs/evm/) và khởi tạo các thông tin thực thi để gửi tới lớp đồng thuận. Những nội dung nghiên cứu nổi bật bao gồm:

- xây dựng các cơ chế hỗ trợ bộ xử lí nhỏ;
- nghiên cứu về giới hạn gas;
- và tích hợp các cấu trúc dữ liệu mới (ví dụ: Verkle Tries).

#### Tài liệu tham khảo {#background-reading-1}

- [Giới thiệu về Máy ảo Ethereum](/developers/docs/evm)
- [Nghiên cứu về lớp thực thi của Etheresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Những nghiên cứu gần đây {#recent-research-1}

- [Những phương pháp tối ưu cơ sở dữ liệu](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Hết hạn dữ liệu trạng thái](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Những điều kiện hết hạn dữ liệu trạng thái](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Đề xuất Verkle và cơ chế hết hạn dữ liệu trạng thái](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Quản lý lịch sử dữ liệu](https://eips.ethereum.org/EIPS/eip-4444)
- [Cây Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Mẫu kiểm tra tính sẵn sàng dữ liệu](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Phát triển bộ xử lí {#client-development}

Các bộ xử lí Ethereum là các phần mềm triển khai của giao thức Ethereum. Việc phát triển các bộ xử lí Ethereum giúp triển khai các nghiên cứu về giao thức thành các phần mềm thực tế. Phát triển các bộ xử lí Ethereum bao gồm việc nâng cấp cấu hình của bộ xử lí cũng như xây dựng các phầm mềm cụ thể.

Một nút Ethereum yêu cầu phải chạy hai phần mềm:

1. một bộ xử lí cơ chế đồng thuận để cập nhật thông tin mới nhất của chuỗi khối, gửi thông tin khối và xử lí logic đồng thuận
2. một bộ xử lí thực thi để hỗ trợ Máy ảo Ethereum và thực hiện các giao dịch, cũng như các hợp đồng thông minh

Tham khảo [Nút và bộ xử lí](/developers/docs/nodes-and-clients/) để có thêm thông tin về các nút, bộ xử lí và danh sách các phần mềm sẵn có. Bạn cũng có thể tìm thấy lịch sử của tất cả các đợt nâng cấp của Ethereum ở [trang lịch sử](/ethereum-forks/).

### Các ứng dụng thực thi {#execution-clients}

- [Thông số ứng dụng thực thi](https://github.com/ethereum/execution-specs)
- [Thông số API thực thi](https://github.com/ethereum/execution-apis)

### Các ứng dụng đồng thuận {#consensus-clients}

- [Thông số ứng dụng đồng thuận](https://github.com/ethereum/consensus-specs)
- [Thông số API Beacon](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Thay đổi quy mô và hiệu suất {#scaling-and-performance}

Thay đổi quy mô cho Ethereum là một đề tài lớn đối với nhiều nhà nghiên cứu Ethereum. Những hướng tiếp cận hiện tại bao gồm chuyển các giao dịch lên các giải pháp mở rộng và tối ưu để rẻ nhất về giá sử dụng các khối dữ liệu. Các thông tin giới thiệu về việc thay đổi quy mô cho Ethereum có sẵn ở trang [Thay đổi quy mô](/developers/docs/scaling).

### Lớp 2 {#layer-2}

Hiện tại đã có một vài giao thức Lớp 2 thực thiện thay đổi quy mô cho Ethereum sử dụng các kĩ thuật khác nhau để gom nhiều giao dịch thành một và đảm bảo chúng trên Lớp 1 của Ethereum. Đây là một chủ đề đang phát triển rất nhanh, với nhiều tiềm năng nghiên cứu và phát triển.

#### Tài liệu tham khảo {#background-reading-2}

- [Giới thiệu về lớp 2](/layer-2/)
- [Polynya: Giải pháp mở rộng, tính sẵn sàng dữ liệu và chuỗi mô-đun](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Những nghiên cứu gần đây {#recent-research-2}

- [Cơ chế sắp xếp công bằng của Arbitrum cho các công cụ sắp xếp](https://eprint.iacr.org/2021/1465)
- [Nghiên cứu của Etheresear.ch về lớp 2](https://ethresear.ch/c/layer-2/32)
- [Lộ trình tập trung vào Rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Cầu {#bridges}

Một đề tài liên quan đến lớp 2 cần được quan tâm nghiên cứu và phát triển hơn đó là các cầu an toàn và hiệu suất cao. Bao gồm các cầu giữa các Lớp 2 khác nhau và các cầu giữa Lớp 1 và Lớp 2. Đây là một đề tài nghiên cứu tương đối quan trọng bởi vì cầu thường được nhắm tới bởi các hacker.

#### Tài liệu tham khảo {#background-reading-3}

- [Giới thiệu về cầu chuỗi khối](/bridges/)
- [Quan điểm của Vitalik về cầu](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Các bài viết về cầu chuỗi khối](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Các giá trị được lưu trữ trong cầu](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Các nghiên cứu gần đây {#recent-research-3}

- [Đánh giá các cầu chuỗi khối](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Phân mảnh dữ liệu {#sharding}

Phân mảnh blockchain của Ethereum từ lâu đã là một phần trong lộ trình phát triển. Tuy nhiên, các giải pháp thay đổi quy mô như "Danksharding" lại đang được quan tâm nhiều hơn.

Bản tiền thân của Danksharding đầy đủ, được gọi là Proto-Danksharding, đã được triển khai sau bản nâng cấp mạng Cancun-Deneb ("Dencun").

[Thông tin về bản cập nhật Dencun](/roadmap/dencun/)

#### Tài liệu tham khảo {#background-reading-4}

- [Các ghi chú về Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Video về Danksharding từ Bankless](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Tuyển tập nghiên cứu về Phân mảnh Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Nghiên cứu về Danksharding của Polynya](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Những nghiên cứu gần đây {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Nhận định của Vitalik về phân mảnh dữ liệu và lấy mẫu các dữ liệu khả dụng](https://hackmd.io/@vbuterin/sharding_proposal)

### Phần cứng {#hardware}

[Vận hành nút](/developers/docs/nodes-and-clients/run-a-node/) trên các phần cứng đơn giản là điều kiện tiên quyết để duy trì tính phi tập trung của Ethereum. Chính vì thế nên việc liên tục nghiên cứu giảm nhẹ cấu hình phần cứng để vận hành nút là một lĩnh vực nghiên cứu quan trọng.

#### Tài liệu tham khảo {#background-reading-5}

- [Chạy Ethereum trên kiến trúc ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Những nghiên cứu gần đây {#recent-research-5}

- [ecdsa trên FPGAs](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Bảo mật {#security}

Bảo mật là một đề tài lớn, có thể bao gồm việc phòng chống hành vi lặp lại và lừa đảo, bảo mật ví, bảo mật phần cứng, bảo mật tiền điện tử, săn lỗi và kiểm thử các ứng dụng, phần mềm, cũng như quản lý khóa. Việc đóng góp hiểu biết cho những nội dung này sẽ hỗ trợ phát triển sự đón nhận từ thị trường truyền thống.

### Mật mã học & bằng chứng không kiến thức {#cryptography--zkp}

Các bằng chứng không kiến thức (ZKP) và mật mã học đóng vai trò quan trọng trong việc xây dựng tính riêng tư và bảo mật cho Ethereum cùng các ứng dụng của giao thức. Bằng chứng không kiến thức là một lĩnh vực còn khá mới nhưng đang được phát triển nhanh chóng, với nhiều cơ hội nghiên cứu và phát triển. Một số hướng nghiên cứu tiềm năng bao gồm phát triển các cách triển khai hiệu quả hơn của [thuật toán băm Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), tìm ra các cơ chế cam kết đa thức tối ưu hơn so với hiện tại, hoặc giảm chi phí của các mạch tạo khóa công khai ecdsa và xác minh chữ ký.

#### Tài liệu tham khảo {#background-reading-6}

- [Blog của 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero Knowledge podcast](https://zeroknowledge.fm/)

#### Những nghiên cứu gần đây {#recent-research-6}

- [Những nghiên cứu mới về mật mã đường cong elliptic](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### Ví {#wallets}

Ví Ethereum có thể là các tiện ích mở rộng trên trình duyệt, các ứng dụng trên máy tính và điện thoại hay các hợp đồng thông minh trên Ethereum. Hiện nay đã nhiều nghiên cứu liên quan đến phát triển các ví khôi phục chung nhằm giảm bớt rủi ro liên quan đến việc quản lý khóa cá nhân của người dùng. Song song với sự phát triển của các ví là những nghiên cứu về các hình thức trừu tượng hóa tài khoản khác, cũng là một nghiên cứu mới nổi quan trọng.

#### Tài liệu tham khảo {#background-reading-7}

- [Giới thiệu về ví](/wallets/)
- [Giới thiệu về bảo mật ví](/security/)
- [Nghiên cứu về bảo mật của Etheresear.ch](https://ethresear.ch/tag/security)
- [Trừu tượng hóa tài khoản EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Trừu tượng hóa tài khoản EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)

#### Những nghiên cứu gần đây {#recent-research-7}

- [Ví hợp đồng thông minh tập trung vào khả năng xác thực](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Tương lai của các tài khoản](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Mã vận hành AUTH và AUTHCALL EIP-3074](https://eips.ethereum.org/EIPS/eip-3074)
- [Đăng tải mã qua một địa chỉ tài khoản do người dùng sở hữu](https://eips.ethereum.org/EIPS/eip-5003)

## Cộng đồng, giáo dục và truyền thông tiếp cận {#community-education-and-outreach}

Việc đưa người dùng mới đến với Ethereum đòi hỏi phải có những tài liệu giáo dục mới và các cách tiếp cận truyền thông hiệu quả hơn. Bao gồm một số hình thức như các bài viết blog và báo, sách, podcast, meme, tài liệu giảng dạy, sự kiện và bất kỳ hình thức nào khác giúp xây dựng cộng đồng, chào đón người mới và nâng cao hiểu biết của mọi người về Ethereum.

### Trải nghiệm người dùng và giao diện người dùng {#uxui}

Để thu hút thêm nhiều người dùng đến với Ethereum, hệ sinh thái cần cải thiện trải nghiệm và giao diện người dùng. Việc này yêu cầu các nhà thiết kế và chuyên gia về sản phẩm phải xem xét lại cách thiết kế ví và ứng dụng.

#### Tài liệu tham khảo {#background-reading-8}

- [Báo cáo về Trải nghiệm người dùng và giao diện người dùng của Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Những nghiên cứu gần đây {#recent-research-8}

- [Kênh Discord về thiết kế trong Web3](https://discord.gg/FsCFPMTSm9)
- [Các quy tắc về thiết kế trong Web3](https://www.web3designprinciples.com/)
- [Thảo luận về trải nghiệm người dùng của Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Kinh tế {#economics}

Nghiên cứu kinh tế trong Ethereum thường đi theo hai hướng tiếp cận: kiểm chứng tính bảo mật của các cơ chế dựa trên khuyến khích kinh tế ("vi mô"), và phân tích các dòng giá trị giữa các giao thức, ứng dụng và người dùng ("vĩ mô"). Trong đó nhiều yếu tố kinh tế tài sản số phức tạp liên quan đến tài sản gốc của Ethereum (ether) và các loại token được xây dựng trên đó (ví dụ như các NFT và các token theo chuẩn ERC20).

#### Tài liệu tham khảo {#background-reading-9}

- [Nghiên cứu về cơ chế khuyến khích bền vững](https://rig.ethereum.org/)
- [Hội thảo chuyên đề của ETHconomics ở sự kiện Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Những nghiên cứu gần đây {#recent-research-9}

- [Nghiên cứu thực nghiệm cơ chế EIP-1559](https://arxiv.org/abs/2201.05574)
- [Cân bằng nguồn cung lưu hành](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Định lượng MEV: Mức độ che giấu và khó phát hiện của hệ thống](https://arxiv.org/abs/2101.05511)

### Không gian khối và thị trường phí {#blockspace-fee-markets}

Thị trường không gian khối quản lý việc cung cấp thông tin của người dùng cuối, trực tiếp thông qua Lớp 1 của Ethereum hoặc trên các mạng lưới cầu nối như các giải pháp mở rộng (Lớp 2). Trên Ethereum, các giao dịch được gửi tới thị trường phí triển khai trực tiếp trong giao thức dựa vào EIP-1559, giúp bảo vệ chuỗi khối khỏi các hành vi lặp lại hoặc tắc nghẽn giá. Ở trên cả hai lớp, các giao dịch đều có thể phát sinh các tác động ngoại lai, hay còn được gọi là Giá trị khai thác tối đa (MEV), qua đó tạo nên các cấu trúc thị trường mới để khai thác hoặc quản lí những tác động ngoại lai này.

#### Tài liệu tham khảo {#background-reading-10}

- [Thiết kế cơ chế phí giao dịch cho blockchain Ethereum: Phân tích về mặt kinh tế của EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Mô phỏng của EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Kinh tế của giải pháp mở rộng dựa vào các nguyên lý cơ bản](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Ưu tiên, sắp xếp lại giao dịch và sự không ổn định của cơ chế đồng thuận trên các sàn giao dịch phi tập trung](https://arxiv.org/abs/1904.05234)

#### Những nghiên cứu gần đây {#recent-research-10}

- [Video thuyết trình về EIP-1559 đa chiều](https://youtu.be/QbR4MTgnCko)
- [Giá trị khai thác tối đa xuyên miền](http://arxiv.org/abs/2112.01472)
- [Đấu giá giá trị khai thác tối đa](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Phần thưởng của cơ chế bảo chứng bằng cổ phần {#proof-of-stake-incentives}

Những bên xác thực sẽ sử dụng tài sản gốc của Ethereum (ether) để thế chấp cho các hành vi không trung thực. Nền kinh tế tài sản mã hóa của cơ chế này sẽ quyết định tính bảo mật của mạng lưới. Các bên xác thực tinh vi có thể khai thác các yếu tố phức tạp của lớp phần thưởng để thực hiện những cuộc tấn công có chủ đích.

#### Tài liệu tham khảo {#background-reading-11}

- [Mô hình kinh tế chuyên sâu của Ethereum](https://github.com/CADLabs/ethereum-economic-model)
- [Mô phỏng mô hình phần thưởng của cơ chế bảo chứng bằng cổ phần (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Những nghiên cứu gần đây {#recent-research-11}

- [Tăng khả năng chống kiểm duyệt giao dịch thông qua tách biệt bên khởi tạo và xây dựng khối (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- Ba cuộc tấn công vào cơ chế bảo chứng bằng cổ phần của Ethereum

### Kí gửi và phái sinh {#liquid-staking-and-derivatives}

Kí gửi cho phép những người dùng có ít hơn 32 ETH nhận được lãi kí gửi thông qua việc trao đổi ether để nhận về một token đại diện cho khoản ether kí gửi có thể được sử dụng trong tài chính phi tập trung. Tuy nhiên, các ưu đãi và động lực thị trường liên quan đến đặt cược thanh khoản vẫn đang được khám phá, cũng như tác động của nó đối với tính bảo mật của Ethereum (ví dụ: rủi ro tập trung hóa).

#### Tài liệu tham khảo {#background-reading-12}

- [Nghiên cứu về kí gửi của Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: Hành trình hướng tới kí gửi Ethereum minh bạch](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Giới thiệu về giao thức kí gửi Rocket Pool](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Những nghiên cứu gần đây {#recent-research-12}

- [Xử lí cơ chế rút kí gửi của Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Thông tin xác thực rút kí gửi](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Những rủi ro của phái sinh tài sản kí gửi](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Kiểm thử {#testing}

### Xác minh hình thức {#formal-verification}

Xác minh hình thức là quá trình viết mã để kiểm chứng rằng các đặc tính về cơ chế đồng thuận của Ethereum hoàn toàn chính xác và không có lỗi. Hiện nay, có một phiên bản khả dụng của các đặc tính trên được viết bằng Python cần được bảo trì và phát triển liên tục. Các nghiên cứu sâu hơn có thể giúp cải thiện phiên bản Python trên và bổ sung các công cụ có khả năng kiểm tra tính đúng đắn cũng như phát hiện các vấn đề tiềm ẩn một cách vững chắc hơn.

#### Tài liệu tham khảo {#background-reading-13}

- [Giới thiệu về xác minh hình thức](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Xác minh hình thức (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Những nghiên cứu gần đây {#recent-research-13}

- [Xác minh hình thức cho hợp đồng kí gửi](https://github.com/runtimeverification/deposit-contract-verification)
- [Xác minh hình thức cho các đặc tính của chuỗi Beacon](https://github.com/runtimeverification/deposit-contract-verification)

## Khoa học dữ liệu và phân tích {#data-science-and-analytics}

Nhu cầu trong việc có thêm các công cụ phân tích dữ liệu và bảng thông tin để cung cấp các thông tin chi tiết về hoạt động của Ethereum và trạng thái vận hành của mạng lưới.

### Tài liệu tham khảo {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Bảng thông tin của Client diversity](https://clientdiversity.org/)

#### Những nghiên cứu gần đây {#recent-research-14}

- [Phân tích dữ liệu của Robust Incentives Group](https://rig.ethereum.org/)

## Các ứng dụng và bộ công cụ {#apps-and-tooling}

Tầng ứng dụng hỗ trợ một hệ sinh thái đa dạng các chương trình có chức năng thực hiện việc xử lý và hoàn tất giao dịch trên lớp nền tảng của Ethereum. Các đội ngũ phát triển luôn cố gắng nghiên cứu những cách mới để tận dụng Ethereum nhằm tạo ra các phiên bản có thể kết hợp, không cần cấp phép và có khả năng chống kiểm duyệt của những ứng dụng Web2 quan trọng, hoặc sáng tạo ra những ý tưởng hoàn toàn mới thuộc về Web3. Bên cạnh đó, những bộ công cụ mới cũng được phát triển liên tục giúp việc xây dựng các ứng dụng phi tập trung đơn giản hơn.

### Tài chính phi tập trung {#defi}

Tài chính phi tập trung (DeFi) là một trong những lớp ứng dụng chính được xây dựng trên nền tảng Ethereum. DeFi hướng đến việc tạo ra những "khối Lego tài chính" có thể kết hợp, cho phép người dùng lưu trữ, chuyển giao, cho vay, đi vay và đầu tư tài sản mã hóa thông qua các hợp đồng thông minh. DeFi là một lĩnh vực phát triển với tốc độ nhanh và được cập nhật liên tục. Việc nghiên cứu về các giao thức an toàn, hiệu quả và dễ tiếp cận luôn luôn cần thiết.

#### Tài liệu tham khảo {#background-reading-15}

- [Tài chính phi tập trung](/defi/)
- [Coinbase: Tài chính phi tập trung là gì](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Những nghiên cứu gần đây {#recent-research-15}

- [Tài chính phi tập trung, nhưng quyền sở hữu tập trung?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: Hành trình hướng tới các giao dịch dưới 1 đô](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### Tổ chức quản trị phi tập trung {#daos}

Một ứng dụng thực tế quan trọng của Ethereum là khả năng tổ chức theo hình thức phi tập trung thông qua việc sử dụng các Tổ chức quản trị phi tập trung. Có rất nhiều nghiên cứu đang được tiến hành về cách các Tổ chức quản trị phi tập trung trên Ethereum có thể được phát triển và sử dụng để thực thi các hình thức quản trị tiên tiến hơn, với tư cách là một công cụ điều phối tối giản về mặt niềm tin, qua đó mở rộng đáng kể các lựa chọn của con người vượt ra ngoài khuôn khổ truyền thống của các công ty và tổ chức.

#### Tài liệu tham khảo {#background-reading-16}

- [Giới thiệu về các tổ chức quản trị phi tập trung](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Những nghiên cứu gần đây {#recent-research-16}

- [Bản đồ hệ sinh thái DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Công cụ nhà phát triển {#developer-tools}

Các công cụ dành cho nhà phát triển Ethereum đang liên tục được cải tiến. Có rất nhiều hoạt động nghiên cứu và phát triển đang diễn xoay quanh lĩnh vực này.

#### Tài liệu tham khảo {#background-reading-17}

- [Hệ thống công cụ theo ngôn ngữ lập trình](/developers/docs/programming-languages/)
- [Các cấu trúc nền tảng cho nhà phát triển](/developers/docs/frameworks/)
- [Danh sách công cụ dành cho nhà phát triển cơ chế đồng thuận](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Các tiêu chuẩn của token](/developers/docs/standards/tokens/)
- [[CryptoDevHub: Bộ công cụ cho máy ảo Ethereum](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Những nghiên cứu gần đây {#recent-research-17}

- [Kênh công cụ phát triển cơ chế đồng thuận trong Discord R&D Ethereum](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Trình cung cấp dữ liệu ngoài chuỗi {#oracles}

Trình cung cấp dữ liệu ngoài chuỗi cho phép đưa dữ liệu ngoài chuỗi vào chuỗi khối mà không phụ thuộc vào quyền kiểm soát tập trung hay sự cho phép của bên thứ ba. Việc đưa những dữ liệu này lên chuỗi khối cho phép các ứng dụng phi tập trung phản ứng với các sự kiện xảy ra ngoài thế giới thực, chẳng hạn như biến động giá của tài sản ngoài chuỗi, các sự kiện trong ứng dụng ngoài chuỗi, hoặc thậm chí là thay đổi thời tiết.

#### Tài liệu tham khảo {#background-reading-18}

- [Giới thiệu về Trình cung cấp dữ liệu ngoài chuỗi](/developers/docs/oracles/)

#### Những nghiên cứu gần đây {#recent-research-18}

- [Khảo sát về các trình cung cấp dữ liệu ngoài chuỗi](https://arxiv.org/pdf/2004.07140.pdf)
- [Tài liệu trắng của Chainlink](https://chain.link/whitepaper)

### Bảo mật ứng dụng {#app-security}

Các vụ tấn công trên Ethereum thường khai thác các lỗ hổng trong từng ứng dụng riêng lẻ, thay vì tấn công giao thức. Các hacker và nhà phát triển ứng dụng liên tục hướng tới việc phát triển các phương thức tấn công và phòng thủ mới. Điều này có nghĩa việc nghiên cứu và phát triển là luôn luôn cần thiết để bảo vệ những ứng dụng khỏi các cuộc tấn công.

#### Tài liệu tham khảo {#background-reading-19}

- [Báo cáo về đợt tấn công vào Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Danh sách phân tích hậu sự cố các vụ tấn công vào hợp đồng Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Những nghiên cứu gần đây {#recent-research-19}

- [Báo cáo về các ứng dụng từ Ethresear.ch](https://ethresear.ch/c/applications/18)

### Hệ thống công nghệ {#technology-stack}

Việc phát triển hệ thống công nghệ của Ethereum theo mô hình phi tập trung là một đề tài nghiên cứu thiết yếu. Hiện nay các ứng dụng phi tập trung trên Ethereum vẫn thường có một vài yếu tố mang tính tập trung do phải dựa vào các công cụ hay hạ tầng tập trung.

#### Tài liệu tham khảo {#background-reading-20}

- [Hệ thống công nghệ của Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: Giới thiệu về công nghệ Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Giới thiệu về các hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Giới thiệu về lưu trữ phi tập trung](/developers/docs/storage/)

#### Những nghiên cứu gần đây {#recent-research-20}

- [Kết hợp các hợp đồng thông minh](/developers/docs/smart-contracts/composability/)
