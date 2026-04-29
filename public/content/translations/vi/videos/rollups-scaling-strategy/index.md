---
title: "Bản cuộn: chiến lược mở rộng quy mô Ethereum tối thượng?"
description: "Một cái nhìn sâu sắc về bản cuộn như là chiến lược mở rộng quy mô chính của Ethereum. Video này giải thích cách hoạt động của Rollup lạc quan (Arbitrum, Optimism) và Rollup không tri thức."
lang: vi
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "mở-rộng-quy-mô"
  - "bản-cuộn"
  - "rollup-lạc-quan"
  - "zk-rollups"
format: explainer
author: Finematics
breadcrumb: "Bản cuộn"
---

Một video giải thích của **Finematics** bao quát về bản cuộn như là chiến lược mở rộng quy mô chính của Ethereum. Video so sánh Rollup lạc quan (Arbitrum, Optimism) với ZK rollup, và xem xét lý do tại sao bản cuộn đã trở thành phương pháp thống trị để mở rộng quy mô Ethereum.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=7pWxCklcNsU) được xuất bản bởi Finematics. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Lớp 2 (1:17) {#layer-2-117}

Việc mở rộng quy mô Ethereum đã là một trong những chủ đề được thảo luận nhiều nhất trong lĩnh vực tiền mã hóa. Cuộc tranh luận về mở rộng quy mô thường nóng lên trong những giai đoạn hoạt động mạng lưới tăng cao như cơn sốt CryptoKitties vào năm 2017, Mùa hè tài chính phi tập trung (DeFi) năm 2020, hoặc thị trường giá lên của tiền mã hóa vào đầu năm 2021. Trong những giai đoạn này, nhu cầu chưa từng có đối với mạng lưới Ethereum đã dẫn đến phí Gas cực kỳ cao, khiến người dùng thông thường phải trả chi phí đắt đỏ cho các giao dịch của họ.

Để giải quyết vấn đề này, việc tìm kiếm giải pháp mở rộng quy mô tối thượng đã là một trong những ưu tiên hàng đầu của nhiều nhóm và toàn bộ cộng đồng Ethereum.

Nhìn chung, có ba cách chính để mở rộng quy mô Ethereum — hoặc thực tế là hầu hết các Chuỗi khối khác: mở rộng quy mô chính Chuỗi khối đó (mở rộng quy mô lớp 1 (l1)), xây dựng trên cùng của lớp 1 (mở rộng quy mô lớp 2 (l2)), và xây dựng bên cạnh lớp 1 (chuỗi phụ).

#### Bên ngoài lớp 1 (1:58) {#outside-of-layer-1-158}

Khi nói đến lớp 1 (l1), Eth2 là giải pháp được chọn để mở rộng quy mô Chuỗi khối Ethereum. Eth2 đề cập đến một tập hợp các thay đổi liên kết với nhau như việc chuyển đổi sang Bằng chứng cổ phần (PoS), hợp nhất trạng thái của Chuỗi khối Bằng chứng công việc (PoW) vào Chuỗi Bằng chứng cổ phần (PoS) mới, và phân mảnh. Phân mảnh, nói riêng, có thể làm tăng đáng kể thông lượng của mạng lưới Ethereum, đặc biệt là khi kết hợp với bản cuộn.

Khi nói đến việc mở rộng quy mô bên ngoài lớp 1 (l1), nhiều giải pháp mở rộng quy mô khác nhau đã được thử nghiệm với một số kết quả trái chiều. Một mặt, chúng ta có các giải pháp lớp 2 (l2) như các kênh (channels) được bảo mật hoàn toàn bởi Ethereum nhưng chỉ hoạt động tốt cho một tập hợp các ứng dụng cụ thể. Mặt khác, chuỗi phụ thường tương thích với EVM và có thể mở rộng quy mô các ứng dụng đa mục đích. Hạn chế chính là chúng kém an toàn hơn so với các giải pháp lớp 2 (l2) do không dựa vào tính bảo mật của Ethereum mà thay vào đó có các mô hình đồng thuận riêng.

Hầu hết các bản cuộn đều hướng tới việc đạt được những điều tốt nhất của cả hai thế giới này bằng cách tạo ra một giải pháp mở rộng quy mô đa mục đích trong khi vẫn hoàn toàn dựa vào tính bảo mật của Ethereum. Đây là chén thánh của việc mở rộng quy mô, vì nó cho phép triển khai tất cả các hợp đồng thông minh hiện có trên Ethereum lên một Rollup với ít hoặc không có thay đổi nào trong khi không hy sinh tính bảo mật. Không có gì ngạc nhiên khi bản cuộn có lẽ là giải pháp mở rộng quy mô được mong đợi nhất trong tất cả.

Rollup là một loại giải pháp mở rộng quy mô hoạt động bằng cách thực thi các giao dịch bên ngoài lớp 1 (l1) nhưng đăng tải dữ liệu giao dịch lên lớp 1 (l1). Điều này cho phép Rollup mở rộng quy mô mạng lưới và vẫn lấy được tính bảo mật từ sự đồng thuận của Ethereum. Việc di chuyển tính toán ngoài chuỗi về cơ bản cho phép xử lý tổng cộng nhiều giao dịch hơn, vì chỉ một phần dữ liệu của các giao dịch Rollup cần phải nằm gọn trong các khối Ethereum.

Để đạt được điều này, các giao dịch Rollup được thực thi trên một Chuỗi riêng biệt thậm chí có thể chạy một phiên bản EVM dành riêng cho Rollup. Bước tiếp theo sau khi thực thi các giao dịch trên một Rollup là gộp chúng lại với nhau và đăng tải chúng lên Chuỗi Ethereum chính. Toàn bộ quá trình về cơ bản là thực thi các giao dịch, lấy dữ liệu, nén nó lại và cuộn nó lên Chuỗi chính trong một lô duy nhất — do đó có tên là "rollup" (bản cuộn).

Mỗi Rollup triển khai một tập hợp các hợp đồng thông minh trên lớp 1 (l1) chịu trách nhiệm xử lý các khoản tiền gửi và rút tiền cũng như xác minh các bằng chứng. Bằng chứng cũng là nơi xuất hiện sự khác biệt chính giữa các loại bản cuộn khác nhau. Rollup lạc quan sử dụng bằng chứng gian lận, trong khi ZK rollup sử dụng bằng chứng tính hợp lệ.

#### Rollup lạc quan (4:26) {#optimistic-rollups-426}

Rollup lạc quan đăng tải dữ liệu lên lớp 1 (l1) và giả định rằng nó chính xác — do đó có tên là "lạc quan". Nếu dữ liệu được đăng tải là hợp lệ, chúng ta đang đi trên con đường suôn sẻ và không cần phải làm gì thêm. Rollup lạc quan được hưởng lợi từ việc không phải làm thêm bất kỳ công việc nào trong kịch bản lạc quan.

Trong trường hợp có một giao dịch không hợp lệ, hệ thống phải có khả năng xác định nó, khôi phục trạng thái chính xác và trừng phạt bên gửi giao dịch đó. Để đạt được điều này, Rollup lạc quan triển khai một hệ thống giải quyết tranh chấp có khả năng xác minh các bằng chứng gian lận, phát hiện các giao dịch gian lận và làm nản lòng các tác nhân xấu khỏi việc gửi các giao dịch không hợp lệ khác hoặc các bằng chứng gian lận không chính xác.

Trong hầu hết các triển khai Rollup lạc quan, bên có khả năng gửi các lô giao dịch lên lớp 1 (l1) phải cung cấp một khoản tiền gửi bảo đảm, thường dưới dạng ETH. Bất kỳ người tham gia mạng lưới nào khác đều có thể gửi một bằng chứng gian lận nếu họ phát hiện ra một giao dịch không chính xác. Sau khi một bằng chứng gian lận được gửi, hệ thống sẽ chuyển sang chế độ giải quyết tranh chấp. Trong chế độ này, giao dịch đáng ngờ được thực thi lại — lần này là trên Chuỗi Ethereum chính. Nếu việc thực thi chứng minh rằng giao dịch đó thực sự là gian lận, bên đã gửi giao dịch này sẽ bị trừng phạt, thường là bằng cách bị phạt cắt giảm số ETH đã gửi bảo đảm của họ.

Để ngăn chặn các tác nhân xấu gửi thư rác mạng lưới bằng các bằng chứng gian lận không chính xác, các bên muốn gửi bằng chứng gian lận thường cũng phải cung cấp một khoản tiền gửi bảo đảm có thể bị phạt cắt giảm.

Để có thể thực thi một giao dịch Rollup trên lớp 1 (l1), Rollup lạc quan phải triển khai một hệ thống có khả năng phát lại một giao dịch với trạng thái chính xác đã hiện diện khi giao dịch được thực thi ban đầu trên Rollup. Đây là một trong những phần phức tạp của Rollup lạc quan và thường đạt được bằng cách tạo ra một hợp đồng quản lý riêng biệt thay thế các lệnh gọi hàm nhất định bằng một trạng thái từ Rollup.

Hệ thống có thể hoạt động như mong đợi và phát hiện gian lận ngay cả khi chỉ có một bên trung thực giám sát trạng thái của Rollup và gửi bằng chứng gian lận nếu cần. Do các động lực khuyến khích chính xác trong hệ thống Rollup, việc bước vào quá trình giải quyết tranh chấp nên là một tình huống ngoại lệ chứ không phải là điều xảy ra thường xuyên.

Khi nói đến ZK rollup, hoàn toàn không có việc giải quyết tranh chấp. Điều này có thể thực hiện được bằng cách tận dụng một phần thông minh của mật mã học được gọi là bằng chứng không tri thức — do đó có tên là ZK rollup. Trong mô hình này, mỗi lô được đăng tải lên lớp 1 (l1) bao gồm một bằng chứng mật mã học được gọi là ZK-SNARK. Bằng chứng này có thể được xác minh nhanh chóng bởi hợp đồng lớp 1 (l1) khi lô giao dịch được gửi, và các lô không hợp lệ có thể bị từ chối ngay lập tức.

#### Những khác biệt khác (7:28) {#other-differences-728}

Do bản chất của quá trình giải quyết tranh chấp, Rollup lạc quan phải dành đủ thời gian cho tất cả những người tham gia mạng lưới để gửi bằng chứng gian lận trước khi hoàn tất một giao dịch trên lớp 1 (l1). Khoảng thời gian này thường khá dài — để đảm bảo rằng ngay cả trong kịch bản tồi tệ nhất, các giao dịch gian lận vẫn có thể bị tranh chấp. Điều này khiến cho việc rút tiền từ Rollup lạc quan diễn ra khá lâu, vì người dùng phải đợi tới một hoặc hai tuần để có thể rút tiền của họ về lại lớp 1 (l1).

May mắn thay, có một vài dự án đang làm việc để cải thiện tình trạng này bằng cách cung cấp các "lối thoát Thanh khoản" nhanh chóng. Các dự án này cung cấp khả năng rút tiền gần như ngay lập tức về lại lớp 1 (l1), một lớp 2 (l2) khác, hoặc thậm chí là một chuỗi phụ và tính một khoản phí nhỏ cho sự tiện lợi này. Hop Protocol và Connext là những dự án đáng chú ý.

ZK rollup không gặp phải vấn đề rút tiền lâu, vì tiền có sẵn để rút ngay khi lô Rollup, cùng với một bằng chứng tính hợp lệ, được gửi lên lớp 1 (l1).

Tuy nhiên, ZK rollup cũng đi kèm với những hạn chế riêng. Do sự phức tạp của công nghệ, việc tạo ra một ZK rollup tương thích với EVM khó khăn hơn nhiều, điều này làm cho việc mở rộng quy mô các ứng dụng đa mục đích trở nên khó khăn hơn mà không phải viết lại logic của ứng dụng. Mặc dù vậy, zkSync đang đạt được những tiến bộ đáng kể trong lĩnh vực này và họ có thể sẽ sớm ra mắt một ZK rollup tương thích với EVM.

Rollup lạc quan có phần dễ dàng hơn với khả năng tương thích EVM. Chúng vẫn phải chạy phiên bản EVM của riêng mình với một vài sửa đổi, nhưng 99% các hợp đồng có thể được chuyển đổi mà không cần thực hiện bất kỳ thay đổi nào. ZK rollup cũng đòi hỏi tính toán nặng nề hơn nhiều so với Rollup lạc quan, có nghĩa là các nút tính toán bằng chứng ZK phải là những cỗ máy có cấu hình cao, khiến cho những người dùng khác khó có thể chạy chúng.

#### Những cải tiến về mở rộng quy mô (9:32) {#scaling-improvements-932}

Khi nói đến những cải tiến về mở rộng quy mô, cả hai loại bản cuộn đều có khả năng mở rộng quy mô Ethereum từ khoảng 15–45 giao dịch mỗi giây (tùy thuộc vào loại giao dịch) lên tới 1.000–4.000 giao dịch mỗi giây. Đáng chú ý là có thể xử lý nhiều giao dịch hơn nữa mỗi giây bằng cách cung cấp thêm không gian cho các lô Rollup trên lớp 1 (l1).

Đây cũng là lý do tại sao Eth2 có thể tạo ra một sức mạnh tổng hợp khổng lồ với bản cuộn, vì nó làm tăng không gian Tính khả dụng của dữ liệu có thể có bằng cách tạo ra nhiều phân mảnh — mỗi phân mảnh có khả năng lưu trữ một lượng dữ liệu đáng kể. Sự kết hợp giữa Eth2 và bản cuộn có thể đưa tốc độ giao dịch của Ethereum lên tới 100.000 giao dịch mỗi giây.

Optimism và Arbitrum hiện là những lựa chọn phổ biến nhất khi nói đến Rollup lạc quan. Optimism đã được triển khai một phần trên Mạng chính Ethereum với một nhóm đối tác hạn chế như Synthetix và Uniswap để đảm bảo rằng công nghệ hoạt động như mong đợi trước khi ra mắt toàn thức. Arbitrum đã triển khai phiên bản của mình lên Mạng chính và bắt đầu tiếp nhận người dùng cũng như các dự án khác nhau vào hệ sinh thái của mình.

Một số dự án đáng chú ý nhất ra mắt trên Arbitrum bao gồm Uniswap, Sushi, Bancor, Augur, Chainlink, Aave, và nhiều dự án khác. Arbitrum cũng đã công bố quan hệ đối tác với Reddit, tập trung vào việc ra mắt một Chuỗi Rollup riêng biệt để mở rộng quy mô hệ thống phần thưởng của họ. Optimism đang hợp tác với MakerDAO để tạo ra cầu nối Optimism Dai Bridge và cho phép rút nhanh DAI cùng các token khác về lại lớp 1 (l1).

Mặc dù cả Arbitrum và Optimism đều cố gắng đạt được cùng một mục tiêu — xây dựng các giải pháp Rollup lạc quan tương thích với EVM — nhưng có một vài khác biệt trong thiết kế của chúng. Arbitrum có một mô hình giải quyết tranh chấp khác. Thay vì chạy lại toàn bộ một giao dịch trên lớp 1 (l1) để xác minh xem bằng chứng gian lận có hợp lệ hay không, họ đã đưa ra một mô hình tương tác nhiều vòng cho phép thu hẹp phạm vi tranh chấp và có khả năng chỉ thực thi một vài lệnh trên lớp 1 (l1) để kiểm tra xem một giao dịch đáng ngờ có hợp lệ hay không.

Một khác biệt lớn khác là cách tiếp cận để xử lý việc sắp xếp thứ tự giao dịch và MEV. Arbitrum ban đầu sẽ chạy một bộ sắp xếp chịu trách nhiệm sắp xếp các giao dịch, nhưng họ muốn phi tập trung hóa nó về lâu dài. Optimism thích một cách tiếp cận khác, nơi việc sắp xếp các giao dịch — và do đó là MEV — có thể được bán đấu giá cho các bên khác trong một khoảng thời gian nhất định.

#### ZK rollup (13:10) {#zk-rollups-1310}

Mặc dù có vẻ như cộng đồng Ethereum đang chủ yếu tập trung vào Rollup lạc quan — ít nhất là trong ngắn hạn — các dự án làm việc trên ZK rollup cũng đang tiến triển cực kỳ nhanh chóng.

Loopring sử dụng công nghệ ZK rollup để mở rộng quy mô Giao thức thanh toán và sàn giao dịch của mình. Hermez và ZKTube đang làm việc để mở rộng quy mô thanh toán bằng cách sử dụng ZK rollup, với Hermez cũng đang xây dựng một ZK rollup tương thích với EVM. Aztec đang tập trung vào việc mang các tính năng quyền riêng tư vào công nghệ ZK rollup của họ.

Các bản cuộn dựa trên StarkWare đã được sử dụng rộng rãi bởi các dự án như DeversiFi, Immutable X, và dYdX. Như đã đề cập trước đó, zkSync đang làm việc trên một máy ảo tương thích với EVM sẽ có khả năng hỗ trợ đầy đủ bất kỳ hợp đồng thông minh tùy ý nào được viết bằng Solidity.

#### DeFi (14:02) {#defi-1402}

Bản cuộn cũng sẽ có tác động lớn đến tài chính phi tập trung (DeFi). Những người dùng trước đây không thể giao dịch trên Ethereum do phí giao dịch cao sẽ có thể ở lại trong hệ sinh thái vào lần tới khi hoạt động mạng lưới tăng cao. Bản cuộn cũng sẽ cho phép một thế hệ ứng dụng mới yêu cầu các giao dịch rẻ hơn và thời gian xác nhận nhanh hơn — tất cả trong khi được bảo mật hoàn toàn bởi sự đồng thuận của Ethereum. Có vẻ như bản cuộn có thể kích hoạt một giai đoạn tăng trưởng cao khác cho DeFi.

#### Những thách thức (14:29) {#challenges-1429}

Tuy nhiên, có một vài thách thức khi nói đến bản cuộn. Khả năng kết hợp là một trong số đó — để kết hợp một giao dịch sử dụng nhiều Giao thức, tất cả chúng sẽ phải được triển khai trên cùng một Rollup.

Một thách thức khác là Thanh khoản bị phân mảnh. Nếu không có dòng tiền mới chảy vào toàn bộ hệ sinh thái Ethereum, Thanh khoản hiện có trên lớp 1 (l1) trong các Giao thức như Uniswap hoặc Aave sẽ được chia sẻ giữa lớp 1 (l1) và nhiều triển khai Rollup. Thanh khoản thấp hơn thường có nghĩa là trượt giá cao hơn và việc thực thi giao dịch kém hơn.

Điều này cũng có nghĩa là theo lẽ tự nhiên sẽ có người thắng và kẻ thua. Hiện tại, hệ sinh thái Ethereum hiện có không đủ lớn để tận dụng tất cả các giải pháp mở rộng quy mô. Điều này có thể — và có lẽ sẽ — thay đổi về lâu dài, nhưng trong ngắn hạn, chúng ta có thể thấy một số bản cuộn và các giải pháp mở rộng quy mô khác trở thành những thị trấn ma. Trong tương lai, chúng ta cũng có thể thấy người dùng sống hoàn toàn trong một hệ sinh thái Rollup và không tương tác với Chuỗi Ethereum chính cũng như các giải pháp mở rộng quy mô khác trong thời gian dài.

#### Mối đe dọa đối với chuỗi phụ (15:44) {#threat-to-sidechains-1544}

Một câu hỏi rất thường xuyên được đặt ra khi thảo luận về bản cuộn là liệu chúng có phải là mối đe dọa đối với chuỗi phụ hay không. Chuỗi phụ vẫn sẽ có vị trí của chúng trong hệ sinh thái Ethereum. Mặc dù chi phí giao dịch trên lớp 2 (l2) sẽ thấp hơn nhiều so với trên lớp 1 (l1), nhưng rất có thể nó vẫn sẽ đủ cao để loại bỏ một số loại ứng dụng nhất định như trò chơi và các ứng dụng có khối lượng lớn khác. Điều này có thể thay đổi khi Ethereum giới thiệu phân mảnh, nhưng đến lúc đó chuỗi phụ có thể tạo ra đủ hiệu ứng mạng lưới để tồn tại lâu dài.

Ngoài ra, phí trên bản cuộn cao hơn so với trên chuỗi phụ vì mỗi lô Rollup vẫn phải trả tiền cho không gian khối Ethereum. Cộng đồng Ethereum đặt trọng tâm rất lớn vào bản cuộn trong chiến lược mở rộng quy mô Ethereum — ít nhất là trong ngắn hạn đến trung hạn và có khả năng còn lâu hơn nữa.