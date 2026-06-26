---
title: "Fusaka 🦓"
metaTitle: Fulu-Osaka (Fusaka)
description: Tìm hiểu về bản nâng cấp giao thức Fusaka
lang: vi
authors: ["Nixo", "Mario Havel"]
---

**Bản nâng cấp Fusaka rất được mong đợi của Ethereum đã chính thức ra mắt vào ngày 3 tháng 12 năm 2025**

Bản nâng cấp mạng lưới Fusaka tiếp nối [Pectra](/roadmap/pectra/) và mang đến nhiều tính năng mới hơn cũng như cải thiện trải nghiệm cho mọi người dùng và nhà phát triển [Ethereum](/). Tên gọi này bao gồm bản nâng cấp lớp thực thi Osaka và phiên bản lớp đồng thuận được đặt theo tên ngôi sao Fulu. Cả hai phần của Ethereum đều nhận được bản nâng cấp nhằm thúc đẩy khả năng mở rộng, bảo mật và trải nghiệm người dùng của Ethereum hướng tới tương lai.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Bản nâng cấp Fusaka chỉ là một bước tiến duy nhất trong các mục tiêu phát triển dài hạn của Ethereum. Tìm hiểu thêm về [lộ trình giao thức](/roadmap/) và [các bản nâng cấp trước đó](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

<VideoWatch slug="fusaka-upgrade-explained" />

## Các cải tiến trong Fusaka {#improvements-in-fusaka}

### Mở rộng khối dữ liệu {#scale-blobs}

#### PeerDAS {#peerdas}

Đây là _điểm nhấn chính_ của Phân nhánh Fusaka, tính năng chính được thêm vào trong bản nâng cấp này. Các lớp 2 (l2) hiện tại đăng dữ liệu của chúng lên Ethereum dưới dạng các khối dữ liệu, loại dữ liệu tạm thời được tạo riêng cho các lớp 2 (l2). Trước Fusaka, mọi nút đầy đủ phải lưu trữ mọi khối dữ liệu để đảm bảo rằng dữ liệu đó tồn tại. Khi thông lượng khối dữ liệu tăng lên, việc phải tải xuống tất cả dữ liệu này trở nên tiêu tốn tài nguyên một cách không thể duy trì được.

Với [việc lấy mẫu tính khả dụng của dữ liệu](https://notes.ethereum.org/@fradamt/das-fork-choice), thay vì phải lưu trữ toàn bộ dữ liệu của khối dữ liệu, mỗi nút sẽ chịu trách nhiệm cho một tập hợp con của dữ liệu khối dữ liệu. Các khối dữ liệu được phân phối ngẫu nhiên đồng đều trên các nút trong mạng lưới với mỗi nút đầy đủ chỉ giữ 1/8 dữ liệu, do đó cho phép mở rộng quy mô theo lý thuyết lên đến 8 lần. Để đảm bảo tính khả dụng của dữ liệu, bất kỳ phần dữ liệu nào cũng có thể được tái tạo lại từ bất kỳ 50% dữ liệu hiện có nào của toàn bộ dữ liệu bằng các phương pháp giúp giảm xác suất dữ liệu sai hoặc bị thiếu xuống mức không đáng kể về mặt mật mã học (~một phần 10<sup>20</sup> đến một phần 10<sup>24</sup>).

Điều này giữ cho các yêu cầu về phần cứng và băng thông đối với các nút ở mức có thể duy trì được trong khi cho phép mở rộng khối dữ liệu, dẫn đến quy mô lớn hơn với mức phí nhỏ hơn cho các lớp 2 (l2).

[Tìm hiểu thêm về PeerDAS](/roadmap/fusaka/peerdas/)

**Tài nguyên**:

- [Đặc tả kỹ thuật EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion nói về PeerDAS: Mở rộng Ethereum hôm nay | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Học thuật: Tài liệu về PeerDAS của Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Các Phân nhánh chỉ dành cho tham số khối dữ liệu (Blob-Parameter-Only) {#blob-parameter-only-forks}

Các lớp 2 (l2) mở rộng Ethereum - khi mạng lưới của chúng phát triển, chúng cần đăng nhiều dữ liệu hơn lên Ethereum. Điều này có nghĩa là Ethereum sẽ cần tăng số lượng khối dữ liệu có sẵn cho chúng theo thời gian. Mặc dù PeerDAS cho phép mở rộng dữ liệu khối dữ liệu, nhưng việc này cần được thực hiện dần dần và an toàn.

Bởi vì Ethereum là mã chạy trên hàng nghìn nút độc lập yêu cầu sự đồng thuận về cùng các quy tắc, chúng ta không thể đơn giản đưa ra các thay đổi như tăng số lượng khối dữ liệu theo cách bạn triển khai một bản cập nhật trang web. Bất kỳ thay đổi quy tắc nào cũng phải là một bản nâng cấp có sự phối hợp, trong đó mọi nút, máy khách và phần mềm trình xác thực đều nâng cấp trước cùng một khối được xác định trước.

Các bản nâng cấp phối hợp này thường bao gồm rất nhiều thay đổi, yêu cầu thử nghiệm nhiều và điều đó cần có thời gian. Để thích ứng nhanh hơn với nhu cầu khối dữ liệu thay đổi của lớp 2 (l2), các Phân nhánh chỉ dành cho tham số khối dữ liệu giới thiệu một cơ chế để tăng các khối dữ liệu mà không cần phải chờ đợi lịch trình nâng cấp đó.

Các Phân nhánh chỉ dành cho tham số khối dữ liệu có thể được thiết lập bởi các máy khách, tương tự như các cấu hình khác như giới hạn gas. Giữa các bản nâng cấp lớn của Ethereum, các máy khách có thể đồng ý tăng các khối dữ liệu `target` và `max` lên ví dụ như 9 và 12, sau đó các nhà điều hành nút sẽ cập nhật để tham gia vào Phân nhánh nhỏ đó. Các Phân nhánh chỉ dành cho tham số khối dữ liệu này có thể được cấu hình bất cứ lúc nào.

Khi các khối dữ liệu lần đầu tiên được thêm vào mạng lưới trong bản nâng cấp Dencun, mục tiêu là 3. Con số đó đã được tăng lên 6 trong Pectra và, sau Fusaka, giờ đây nó có thể được tăng lên ở một tốc độ bền vững độc lập với các bản nâng cấp mạng lưới lớn này.

![Chart showing average blob count per block and increasing targets with upgrades](./average-blob-count-per-block.webp)

Nguồn biểu đồ: [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Phí cơ sở của khối dữ liệu bị giới hạn bởi chi phí thực thi {#blob-base-fee-bounded-by-execution-costs}

Các lớp 2 (l2) thanh toán hai khoản phí khi chúng đăng dữ liệu: phí blob và Gas thực thi cần thiết để xác minh các khối dữ liệu đó. Nếu Gas thực thi chiếm ưu thế, cuộc đấu giá phí blob có thể giảm mạnh xuống còn 1 Wei và không còn là tín hiệu giá nữa.

EIP-7918 ghim một mức giá dự trữ theo tỷ lệ dưới mỗi khối dữ liệu. Khi mức dự trữ cao hơn phí cơ sở danh nghĩa của khối dữ liệu, thuật toán điều chỉnh phí sẽ coi khối đó là vượt quá mục tiêu và ngừng đẩy phí xuống, đồng thời cho phép nó tăng lên bình thường. Kết quả là:

- thị trường phí blob luôn phản ứng với tình trạng tắc nghẽn
- các lớp 2 (l2) trả ít nhất một phần có ý nghĩa cho khối lượng tính toán mà chúng áp đặt lên các nút
- các đợt tăng đột biến phí cơ sở trên lớp thực thi (EL) không còn có thể khiến phí blob bị kẹt ở mức 1 Wei

**Tài nguyên**:

- [Đặc tả kỹ thuật EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Giải thích trên Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Mở rộng lớp 1 (l1) {#scale-l1}

#### Hết hạn lịch sử và biên lai đơn giản hơn {#history-expiry}

Vào tháng 7 năm 2025, các máy khách thực thi của Ethereum [đã bắt đầu hỗ trợ hết hạn lịch sử một phần](https://blog.ethereum.org/2025/07/08/partial-history-exp). Điều này đã loại bỏ lịch sử cũ hơn [The Merge](https://ethereum.org/roadmap/merge/) nhằm giảm dung lượng ổ đĩa mà các nhà điều hành nút yêu cầu khi Ethereum tiếp tục phát triển.

EIP này nằm trong một phần tách biệt với "Các EIP cốt lõi" vì Phân nhánh không thực sự triển khai bất kỳ thay đổi nào - đó là một thông báo rằng các nhóm máy khách phải hỗ trợ hết hạn lịch sử trước bản nâng cấp Fusaka. Trên thực tế, các máy khách có thể triển khai điều này bất cứ lúc nào nhưng việc thêm nó vào bản nâng cấp đã cụ thể hóa nó vào danh sách việc cần làm của họ và cho phép họ thử nghiệm các thay đổi của Fusaka kết hợp với tính năng này.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Đặt giới hạn trên cho MODEXP {#set-upper-bounds-for-modexp}

Cho đến nay, hợp đồng tiền biên dịch MODEXP đã chấp nhận các con số ở hầu hết mọi kích thước. Điều đó khiến nó khó kiểm tra, dễ bị lạm dụng và rủi ro đối với sự ổn định của máy khách. EIP-7823 đặt ra một giới hạn rõ ràng: mỗi số đầu vào có thể dài tối đa 8192 bit (1024 byte). Bất kỳ thứ gì lớn hơn đều bị từ chối, Gas của giao dịch bị đốt cháy và không có thay đổi trạng thái nào xảy ra. Nó đáp ứng rất thoải mái các nhu cầu trong thế giới thực trong khi loại bỏ các trường hợp cực đoan làm phức tạp việc lập kế hoạch giới hạn gas và đánh giá bảo mật. Thay đổi này cung cấp khả năng bảo mật và bảo vệ chống DoS tốt hơn mà không ảnh hưởng đến trải nghiệm của người dùng hoặc nhà phát triển.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Mức trần giới hạn gas của giao dịch {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) thêm mức trần 16.777.216 (2^24) Gas cho mỗi giao dịch. Đây là biện pháp củng cố chủ động chống DoS bằng cách giới hạn chi phí trong trường hợp xấu nhất của bất kỳ giao dịch đơn lẻ nào khi chúng ta tăng giới hạn gas của khối. Nó làm cho việc xác minh và truyền bá dễ dàng lập mô hình hơn để cho phép chúng ta giải quyết vấn đề mở rộng quy mô thông qua việc tăng giới hạn gas.

Tại sao chính xác là 2^24 Gas? Nó nhỏ hơn một cách thoải mái so với giới hạn gas hiện nay, đủ lớn cho các đợt triển khai hợp đồng thực tế & các hợp đồng tiền biên dịch nặng, và lũy thừa của 2 giúp dễ dàng triển khai trên các máy khách. Kích thước giao dịch tối đa mới này tương tự như kích thước khối trung bình trước Pectra, khiến nó trở thành một giới hạn hợp lý cho bất kỳ hoạt động nào trên Ethereum.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Tăng chi phí Gas của `MODEXP` {#modexp-gas-cost-increase}

MODEXP là một hàm tích hợp sẵn của hợp đồng tiền biên dịch dùng để tính toán lũy thừa mô-đun, một loại toán học số lớn được sử dụng trong xác minh chữ ký RSA và các hệ thống bằng chứng. Nó cho phép các hợp đồng chạy trực tiếp các tính toán này mà không cần phải tự triển khai chúng.

Các nhà phát triển và nhóm máy khách đã xác định MODEXP là một trở ngại lớn đối với việc tăng giới hạn gas của khối vì việc định giá Gas hiện tại thường đánh giá thấp lượng sức mạnh tính toán mà một số đầu vào nhất định yêu cầu. Điều này có nghĩa là một giao dịch sử dụng MODEXP có thể chiếm phần lớn thời gian cần thiết để xử lý toàn bộ khối, làm chậm mạng lưới.

EIP này thay đổi việc định giá để phù hợp với chi phí tính toán thực tế bằng cách:

- tăng mức phí tối thiểu từ 200 lên 500 Gas và loại bỏ mức chiết khấu một phần ba từ EIP-2565 đối với tính toán chi phí chung
- tăng chi phí mạnh hơn khi đầu vào số mũ rất dài. nếu số mũ (số "lũy thừa" mà bạn truyền dưới dạng đối số thứ hai) dài hơn 32 byte / 256 bit, phí Gas sẽ tăng nhanh hơn nhiều cho mỗi byte bổ sung
- tính thêm phí cho cơ số hoặc mô-đun lớn. Hai số còn lại (cơ số và mô-đun) được giả định là ít nhất 32 byte - nếu một trong hai số lớn hơn, chi phí sẽ tăng tỷ lệ thuận với kích thước của nó

Bằng cách đối chiếu chi phí tốt hơn với thời gian xử lý thực tế, MODEXP không còn có thể khiến một khối mất quá nhiều thời gian để xác minh. Thay đổi này là một trong số những thay đổi nhằm đảm bảo an toàn cho việc tăng giới hạn gas của khối Ethereum trong tương lai.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Giới hạn kích thước khối thực thi RLP {#rlp-execution-block-size-limit}

Điều này tạo ra một mức trần về độ lớn cho phép của một khối - đây là giới hạn về những gì được _gửi_ qua mạng lưới và tách biệt với giới hạn gas, vốn giới hạn _công việc_ bên trong một khối. Mức trần kích thước khối là 10 MiB, với một hạn mức nhỏ (2 MiB) được dành riêng cho dữ liệu đồng thuận để mọi thứ vừa vặn và truyền bá một cách gọn gàng. Nếu một khối xuất hiện lớn hơn mức đó, các máy khách sẽ từ chối nó.
Điều này là cần thiết vì các khối rất lớn mất nhiều thời gian hơn để lan truyền và xác minh trên toàn mạng lưới và có thể tạo ra các vấn đề về đồng thuận hoặc bị lạm dụng như một phương thức tấn công DoS. Ngoài ra, giao thức gossip của lớp đồng thuận vốn đã không chuyển tiếp các khối trên ~10 MiB, vì vậy việc điều chỉnh lớp thực thi theo giới hạn đó sẽ tránh được các tình huống kỳ lạ kiểu "một số người thấy, những người khác thì bỏ qua".

Chi tiết cốt lõi: đây là mức trần đối với kích thước khối thực thi được mã hóa [RLP](/developers/docs/data-structures-and-encoding/rlp/). 10 MiB tổng cộng, với biên độ an toàn 2 MiB được dành riêng cho việc đóng khung khối beacon (Chuỗi Beacon). Trên thực tế, các máy khách định nghĩa

`MAX_BLOCK_SIZE = 10,485,760` byte và

`SAFETY_MARGIN = 2,097,152` byte,

và từ chối bất kỳ khối thực thi nào có tải trọng RLP vượt quá

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

Mục tiêu là giới hạn thời gian truyền bá/xác minh trong trường hợp xấu nhất và điều chỉnh phù hợp với hành vi gossip của lớp đồng thuận, giảm rủi ro tổ chức lại chuỗi/DoS mà không thay đổi việc hạch toán Gas.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Đặt giới hạn gas mặc định thành 60 triệu {#set-default-gas-limit-to-60-million}

Trước khi tăng giới hạn gas từ 30 triệu lên 36 triệu vào tháng 2 năm 2025 (và sau đó lên 45 triệu), giá trị này đã không thay đổi kể từ The Merge (tháng 9 năm 2022). EIP này nhằm mục đích ưu tiên việc mở rộng quy mô nhất quán.

EIP-7935 điều phối các nhóm máy khách lớp thực thi (EL) để tăng giới hạn gas mặc định lên trên mức 45 triệu hiện nay cho Fusaka. Đây là một EIP Thông tin, nhưng nó yêu cầu rõ ràng các máy khách thử nghiệm các giới hạn cao hơn trên các mạng phát triển, hội tụ về một giá trị an toàn và đưa con số đó vào các bản phát hành Fusaka của họ.

Kế hoạch trên mạng phát triển nhắm mục tiêu thử nghiệm sức chịu đựng ở mức ~60 triệu (các khối đầy đủ với tải tổng hợp) và các đợt tăng lặp đi lặp lại; nghiên cứu cho thấy các bệnh lý về kích thước khối trong trường hợp xấu nhất không nên bị ràng buộc dưới mức ~150 triệu. Việc triển khai nên được kết hợp với mức trần giới hạn gas của giao dịch (EIP-7825) để không có giao dịch đơn lẻ nào có thể chiếm ưu thế khi các giới hạn tăng lên.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Cải thiện UX {#improve-ux}

#### Dự đoán người đề xuất mang tính xác định {#deterministic-proposer-lookahead}

Với EIP-7917, Chuỗi Beacon sẽ nhận biết được những người đề xuất khối sắp tới cho Kỷ nguyên tiếp theo. Việc có một cái nhìn xác định về việc những trình xác thực nào sẽ đề xuất các khối trong tương lai có thể cho phép [xác nhận trước](https://ethresear.ch/t/based-preconfirmations/17353) - một cam kết với người đề xuất sắp tới đảm bảo rằng giao dịch của người dùng sẽ được đưa vào khối của họ mà không cần chờ khối thực tế.

Tính năng này mang lại lợi ích cho việc triển khai máy khách và bảo mật của mạng lưới vì nó ngăn chặn các trường hợp ngoại lệ trong đó các trình xác thực có thể thao túng lịch trình của người đề xuất. Việc dự đoán trước cũng cho phép giảm bớt độ phức tạp của việc triển khai.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Mã lệnh đếm số không ở đầu (CLZ) {#count-leading-zeros-opcode}

Tính năng này thêm một lệnh EVM nhỏ, **đếm số không ở đầu (CLZ)**. Hầu hết mọi thứ trong EVM đều được biểu diễn dưới dạng giá trị 256-bit—mã lệnh mới này trả về số lượng bit không ở phía trước. Đây là một tính năng phổ biến trong nhiều kiến trúc tập lệnh vì nó cho phép các phép toán số học hiệu quả hơn. Trên thực tế, điều này thu gọn các thao tác quét bit thủ công hiện nay thành một bước, do đó việc tìm bit được thiết lập đầu tiên, quét các byte hoặc phân tích cú pháp các trường bit trở nên đơn giản và rẻ hơn. Mã lệnh này có chi phí cố định, thấp và đã được đo chuẩn để ngang bằng với một phép cộng cơ bản, giúp cắt giảm mã byte và tiết kiệm Gas cho cùng một công việc.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Hợp đồng tiền biên dịch hỗ trợ đường cong secp256r1 {#secp256r1-precompile}

Giới thiệu một trình kiểm tra chữ ký secp256r1 (P-256) kiểu mã khóa, được tích hợp sẵn tại Địa chỉ cố định `0x100` sử dụng cùng định dạng lệnh gọi đã được nhiều lớp 2 (l2) áp dụng và khắc phục các trường hợp ngoại lệ, để các hợp đồng được viết cho các môi trường đó hoạt động trên lớp 1 (l1) mà không cần thay đổi.

Nâng cấp UX! Đối với người dùng, điều này mở khóa việc ký gốc trên thiết bị và các mã khóa. Các ví có thể khai thác trực tiếp Apple Secure Enclave, kho khóa Android, các mô-đun bảo mật phần cứng (HSM) và FIDO2/WebAuthn - không cần cụm từ hạt giống, tiếp nhận người dùng mượt mà hơn và các luồng đa yếu tố mang lại cảm giác giống như các ứng dụng hiện đại. Điều này dẫn đến UX tốt hơn, phục hồi dễ dàng hơn và các mô hình trừu tượng hóa tài khoản phù hợp với những gì hàng tỷ thiết bị đã làm.

Đối với các nhà phát triển, nó nhận đầu vào 160 byte và trả về đầu ra 32 byte, giúp dễ dàng chuyển đổi các thư viện hiện có và các hợp đồng lớp 2 (l2). Về mặt kỹ thuật, nó bao gồm các kiểm tra điểm ở vô cực và so sánh mô-đun để loại bỏ các trường hợp ngoại lệ phức tạp mà không làm hỏng các trình gọi hợp lệ.

**Tài nguyên**:

- [Đặc tả kỹ thuật EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [Tìm hiểu thêm về RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Lưu ý rằng EIP-7951 đã thay thế RIP-7212)_

### Siêu dữ liệu {#meta}

#### Phương thức JSON-RPC `eth_config` {#eth-config}

Đây là một lệnh gọi JSON-RPC cho phép bạn hỏi nút của mình xem bạn đang chạy các cài đặt Phân nhánh nào. Nó trả về ba ảnh chụp nhanh: `current`, `next`, & `last` để các trình xác thực và công cụ giám sát có thể xác minh rằng các máy khách đã sẵn sàng cho một Phân nhánh sắp tới.

Nói một cách thực tế, điều này nhằm giải quyết một thiếu sót được phát hiện khi Phân nhánh Pectra ra mắt trên mạng thử nghiệm Holesky vào đầu năm 2025 với các cấu hình sai nhỏ dẫn đến trạng thái không thể hoàn tất. Điều này giúp các nhóm thử nghiệm và nhà phát triển đảm bảo rằng các Phân nhánh lớn sẽ hoạt động như mong đợi khi chuyển từ mạng phát triển sang mạng thử nghiệm và từ mạng thử nghiệm sang Mạng chính.

Các ảnh chụp nhanh bao gồm: `chainId`, `forkId`, thời gian kích hoạt Phân nhánh theo kế hoạch, các hợp đồng tiền biên dịch nào đang hoạt động, các Địa chỉ hợp đồng tiền biên dịch, các phụ thuộc hợp đồng hệ thống và lịch trình khối dữ liệu của Phân nhánh.

EIP này nằm trong một phần tách biệt với "Các EIP cốt lõi" vì Phân nhánh không thực sự triển khai bất kỳ thay đổi nào - đó là một thông báo rằng các nhóm máy khách phải triển khai phương thức JSON-RPC này trước bản nâng cấp Fusaka.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## Câu hỏi thường gặp {#faq}

### Bản nâng cấp này có ảnh hưởng đến tất cả các nút và trình xác thực Ethereum không? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Có, bản nâng cấp Fusaka yêu cầu cập nhật cho cả [máy khách thực thi và máy khách đồng thuận](/developers/docs/nodes-and-clients/). Tất cả các máy khách Ethereum chính sẽ phát hành các phiên bản hỗ trợ Phân nhánh cứng được đánh dấu là ưu tiên cao. Bạn có thể theo dõi thời điểm các bản phát hành này sẽ có sẵn trong các kho lưu trữ GitHub của máy khách, [các kênh Discord](https://ethstaker.org/support) của họ, [Discord của EthStaker](https://dsc.gg/ethstaker), hoặc bằng cách đăng ký blog Ethereum để nhận các bản cập nhật Giao thức. Để duy trì sự đồng bộ hóa với mạng lưới Ethereum sau khi nâng cấp, các nhà điều hành nút phải đảm bảo họ đang chạy một phiên bản máy khách được hỗ trợ. Lưu ý rằng thông tin về các bản phát hành máy khách có tính nhạy cảm về thời gian và người dùng nên tham khảo các bản cập nhật mới nhất để biết các chi tiết hiện tại nhất.

### Làm thế nào để chuyển đổi ETH sau Phân nhánh cứng? {#how-can-eth-be-converted-after-the-hardfork}

- **Không cần thực hiện hành động nào đối với ETH của bạn**: Sau bản nâng cấp Fusaka của Ethereum, không cần phải chuyển đổi hoặc nâng cấp ETH của bạn. Số dư Tài khoản của bạn sẽ giữ nguyên và ETH bạn hiện đang nắm giữ sẽ vẫn có thể truy cập được ở dạng hiện tại sau Phân nhánh cứng.
- **Cảnh giác với các trò lừa đảo!** <Emoji text="⚠️" /> **bất kỳ ai hướng dẫn bạn "nâng cấp" ETH của mình đều đang cố gắng lừa đảo bạn.** Bạn không cần phải làm gì liên quan đến bản nâng cấp này. Tài sản của bạn sẽ hoàn toàn không bị ảnh hưởng. Hãy nhớ rằng, việc luôn cập nhật thông tin là cách phòng vệ tốt nhất chống lại các trò lừa đảo.

[Tìm hiểu thêm về cách nhận biết và tránh các trò lừa đảo](/security/)

### Những con ngựa vằn có ý nghĩa gì? <Emoji text="🦓" /> {#whats-with-the-zebras}

Ngựa vằn là "linh vật" do nhà phát triển chọn cho Fusaka vì các sọc của nó phản ánh việc lấy mẫu tính khả dụng của dữ liệu dựa trên cột của PeerDAS, trong đó các nút lưu giữ các mạng con cột nhất định và lấy mẫu một vài cột khác từ mỗi khe của các nút ngang hàng để kiểm tra xem dữ liệu khối dữ liệu có sẵn hay không.

The Merge vào năm 2022 [đã sử dụng một con gấu trúc](https://x.com/hwwonx/status/1431970802040127498) làm linh vật để báo hiệu sự kết hợp của lớp thực thi & lớp đồng thuận. Kể từ đó, các linh vật đã được chọn một cách không chính thức cho mỗi Phân nhánh và hiển thị dưới dạng nghệ thuật ASCII trong nhật ký máy khách tại thời điểm nâng cấp. Đó chỉ là một cách thú vị để ăn mừng.

### Những cải tiến nào được bao gồm cho việc mở rộng lớp 2 (l2)? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) là tính năng chính của Phân nhánh. Nó triển khai việc lấy mẫu tính khả dụng của dữ liệu (DAS) giúp mở khóa khả năng mở rộng lớn hơn cho các bản cuộn, theo lý thuyết mở rộng không gian khối dữ liệu lên đến 8 lần kích thước hiện tại. Thị trường phí blob cũng sẽ được cải thiện để phản ứng hiệu quả với tình trạng tắc nghẽn và đảm bảo các lớp 2 (l2) trả một khoản phí có ý nghĩa cho khối lượng tính toán và không gian mà các khối dữ liệu áp đặt lên các nút.

### Các Phân nhánh BPO khác nhau như thế nào? {#how-are-bpo-forks-different}

Các Phân nhánh chỉ dành cho tham số khối dữ liệu (Blob Only Parameter) cung cấp một cơ chế để liên tục tăng số lượng khối dữ liệu (cả mục tiêu và tối đa) sau khi PeerDAS được kích hoạt, mà không cần phải chờ đợi một bản nâng cấp phối hợp đầy đủ. Mỗi lần tăng đều được mã hóa cứng để được cấu hình sẵn trong các bản phát hành máy khách hỗ trợ Fusaka.

Là người dùng hoặc trình xác thực, bạn không cần cập nhật máy khách của mình cho mỗi BPO và chỉ cần đảm bảo theo dõi các Phân nhánh cứng lớn như Fusaka. Đây là thực tiễn giống như trước đây, không cần hành động đặc biệt nào. Tuy nhiên, bạn vẫn nên giám sát các máy khách của mình xung quanh các bản nâng cấp và BPO, đồng thời cập nhật chúng ngay cả giữa các bản phát hành lớn vì các bản sửa lỗi hoặc tối ưu hóa có thể đi kèm sau Phân nhánh cứng.

### Lịch trình BPO là gì? {#what-is-the-bpo-schedule}

Lịch trình chính xác của các bản cập nhật BPO sẽ được xác định cùng với các bản phát hành Fusaka. Theo dõi [các thông báo Giao thức](https://blog.ethereum.org/category/protocol) và ghi chú phát hành của các máy khách của bạn.

Ví dụ về cách nó có thể diễn ra:

- Trước Fusaka: mục tiêu 6, tối đa 9
- Tại thời điểm kích hoạt Fusaka: mục tiêu 6, tối đa 9
- BPO1, vài tuần sau khi kích hoạt Fusaka: mục tiêu 10, tối đa 15, tăng thêm hai phần ba
- BPO2, vài tuần sau BPO1: mục tiêu 14, tối đa 21

### Điều này có làm giảm phí trên Ethereum (lớp 1 (l1)) không {#will-this-lower-gas}

Bản nâng cấp này không làm giảm phí Gas trên lớp 1 (l1), ít nhất là không trực tiếp. Trọng tâm chính là có thêm không gian khối dữ liệu cho dữ liệu Rollup, do đó làm giảm phí trên lớp 2 (l2). Điều này có thể có một số tác dụng phụ đối với thị trường phí lớp 1 (l1) nhưng không có thay đổi đáng kể nào được mong đợi.

### Là một người đặt cọc, tôi cần làm gì cho bản nâng cấp? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Như với mọi bản nâng cấp mạng lưới, hãy đảm bảo cập nhật các máy khách của bạn lên các phiên bản mới nhất được đánh dấu là có hỗ trợ Fusaka. Theo dõi các bản cập nhật trong danh sách gửi thư và [Các thông báo Giao thức trên Blog EF](https://blog.ethereum.org/category/protocol) để nhận thông tin về các bản phát hành.
Để xác minh thiết lập của bạn trước khi Fusaka được kích hoạt trên Mạng chính, bạn có thể chạy một trình xác thực trên các mạng thử nghiệm. Fusaka được [kích hoạt sớm hơn trên các mạng thử nghiệm](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement) mang lại cho bạn nhiều thời gian hơn để đảm bảo mọi thứ hoạt động và báo cáo lỗi. Các Phân nhánh mạng thử nghiệm cũng được thông báo trong danh sách gửi thư và blog.

### "Dự đoán người đề xuất mang tính xác định" (EIP-7917) có ảnh hưởng đến các trình xác thực không? {#does-7917-affect-validators}

Thay đổi này không làm thay đổi cách thức hoạt động của máy khách trình xác thực của bạn, tuy nhiên, nó sẽ cung cấp cái nhìn sâu sắc hơn về tương lai của các nhiệm vụ trình xác thực của bạn. Đảm bảo cập nhật công cụ giám sát của bạn để theo kịp các tính năng mới.

### Fusaka ảnh hưởng như thế nào đến các yêu cầu về băng thông đối với các nút và trình xác thực? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS tạo ra một sự thay đổi đáng kể trong cách các nút truyền dữ liệu khối dữ liệu. Tất cả dữ liệu được chia thành các phần gọi là các cột trên 128 mạng con với các nút chỉ đăng ký một số trong số chúng. Số lượng các cột mạng con mà các nút phải lưu giữ phụ thuộc vào cấu hình của chúng và số lượng trình xác thực được kết nối. Các yêu cầu về băng thông thực tế sẽ phụ thuộc vào số lượng khối dữ liệu được phép trong mạng lưới và loại nút. Tại thời điểm kích hoạt Fusaka, mục tiêu khối dữ liệu vẫn giữ nguyên như trước, nhưng với PeerDAS, các nhà điều hành nút có thể thấy sự sụt giảm trong việc sử dụng ổ đĩa của các khối dữ liệu và lưu lượng mạng lưới. Khi các BPO cấu hình số lượng khối dữ liệu cao hơn trong mạng lưới, băng thông cần thiết sẽ tăng lên với mỗi BPO.

Các yêu cầu của nút vẫn nằm trong [các giới hạn được khuyến nghị](https://eips.ethereum.org/EIPS/eip-7870) ngay cả sau các BPO của Fusaka.

#### Nút đầy đủ {#full-nodes}

Các nút thông thường không có bất kỳ trình xác thực nào sẽ chỉ đăng ký 4 mạng con, cung cấp quyền lưu giữ cho 1/8 dữ liệu gốc. Điều này có nghĩa là với cùng một lượng dữ liệu khối dữ liệu, băng thông tải xuống của nút sẽ nhỏ hơn tám (8) lần. Việc sử dụng ổ đĩa và băng thông tải xuống của các khối dữ liệu đối với một nút đầy đủ bình thường có thể giảm khoảng 80%, xuống chỉ còn vài Mb.

#### Người đặt cọc độc lập {#solo-stakers}

Nếu nút được sử dụng cho một máy khách trình xác thực, nó phải lưu giữ nhiều cột hơn và do đó xử lý nhiều dữ liệu hơn. Khi một trình xác thực được thêm vào, nút sẽ đăng ký ít nhất 8 mạng con cột và do đó xử lý lượng dữ liệu gấp đôi so với nút thông thường nhưng vẫn ít hơn so với trước Fusaka. Nếu số dư của trình xác thực trên 287 ETH, ngày càng nhiều mạng con sẽ được đăng ký.

Đối với một người đặt cọc độc lập, điều này có nghĩa là việc sử dụng ổ đĩa và băng thông tải xuống của họ sẽ giảm khoảng 50%. Tuy nhiên, để xây dựng các khối cục bộ và tải tất cả các khối dữ liệu lên mạng lưới, cần nhiều băng thông tải lên hơn. Các nhà xây dựng cục bộ sẽ cần băng thông tải lên cao hơn 2-3 lần so với trước đây tại thời điểm Fusaka và với mục tiêu BPO2 là 15/21 khối dữ liệu, băng thông tải lên cần thiết cuối cùng sẽ phải cao hơn khoảng 5 lần, ở mức 100Mbps.

#### Trình xác thực lớn {#large-validators}

Số lượng mạng con được đăng ký tăng lên khi có nhiều số dư và trình xác thực được thêm vào nút. Ví dụ: với số dư khoảng 800 ETH, nút lưu giữ 25 cột và sẽ cần băng thông tải xuống nhiều hơn khoảng 30% so với trước đây. Băng thông tải lên cần thiết tăng tương tự như các nút thông thường và cần ít nhất 100Mbps.

Ở mức 4096 ETH, 2 trình xác thực có số dư tối đa, nút trở thành 'siêu nút' lưu giữ tất cả các cột, do đó tải xuống và lưu trữ mọi thứ. Các nút này chủ động chữa lành mạng lưới bằng cách đóng góp lại dữ liệu bị thiếu nhưng cũng yêu cầu nhiều băng thông và dung lượng lưu trữ hơn. Với mục tiêu khối dữ liệu cuối cùng cao gấp 6 lần so với trước đây, các siêu nút sẽ phải lưu trữ thêm khoảng 600GB dữ liệu khối dữ liệu và có băng thông tải xuống duy trì nhanh hơn ở mức khoảng 20Mbps.

[Đọc thêm chi tiết về các yêu cầu dự kiến.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Những thay đổi EVM nào được triển khai? {#what-evm-changes-are-implemented}

Fusaka củng cố EVM với các thay đổi và tính năng nhỏ mới.

- Để bảo mật trong khi mở rộng quy mô, kích thước tối đa của một giao dịch đơn lẻ sẽ bị [giới hạn ở mức 16,7 triệu](https://eips.ethereum.org/EIPS/eip-7825) đơn vị Gas.
- [Mã lệnh mới đếm số không ở đầu (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) được thêm vào EVM và sẽ cho phép các ngôn ngữ hợp đồng thông minh thực hiện một số hoạt động nhất định hiệu quả hơn.
- [Chi phí của hợp đồng tiền biên dịch `ModExp` sẽ được tăng lên](https://eips.ethereum.org/EIPS/eip-7883)—các hợp đồng sử dụng nó sẽ tính phí Gas cao hơn cho việc thực thi.

### Giới hạn gas 16 triệu mới ảnh hưởng như thế nào đến các nhà phát triển hợp đồng? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka giới thiệu một giới hạn đối với [kích thước tối đa của một giao dịch đơn lẻ là 16,7 triệu](https://eips.ethereum.org/EIPS/eip-7825) (2^24) đơn vị Gas. Đây gần bằng kích thước trước đây của một khối trung bình, khiến nó đủ lớn để chứa các giao dịch phức tạp có thể tiêu tốn toàn bộ một khối. Giới hạn này tạo ra sự bảo vệ cho các máy khách, ngăn chặn các cuộc tấn công DoS tiềm ẩn trong tương lai với giới hạn gas của khối cao hơn. Mục tiêu của việc mở rộng quy mô là cho phép nhiều giao dịch hơn được đưa vào Chuỗi khối mà không có một giao dịch đơn lẻ nào tiêu tốn toàn bộ khối.

Các giao dịch của người dùng thông thường còn lâu mới đạt đến giới hạn này. Một số trường hợp ngoại lệ như các hoạt động tài chính phi tập trung (DeFi) lớn và phức tạp, các đợt triển khai hợp đồng thông minh lớn hoặc các giao dịch hàng loạt nhắm mục tiêu vào nhiều hợp đồng có thể bị ảnh hưởng bởi thay đổi này. Các giao dịch này sẽ phải được chia thành các giao dịch nhỏ hơn hoặc được tối ưu hóa theo cách khác. Sử dụng mô phỏng trước khi gửi các giao dịch có khả năng đạt đến giới hạn.

Phương thức RPC `eth_call` không bị giới hạn và sẽ cho phép mô phỏng các giao dịch lớn hơn giới hạn Chuỗi khối thực tế. Giới hạn thực tế cho các phương thức RPC có thể được cấu hình bởi nhà điều hành máy khách để đảm bảo ngăn chặn việc lạm dụng.

### CLZ có ý nghĩa gì đối với các nhà phát triển? {#what-clz-means-for-developers}

Các trình biên dịch EVM như Solidity sẽ triển khai và sử dụng hàm mới để đếm số không ở bên trong hệ thống. Các hợp đồng mới có thể được hưởng lợi từ việc tiết kiệm Gas nếu chúng dựa vào loại hoạt động này. Theo dõi các bản phát hành và thông báo tính năng của ngôn ngữ hợp đồng thông minh để biết tài liệu về các khoản tiết kiệm tiềm năng.

### Có bất kỳ thay đổi nào đối với các hợp đồng thông minh hiện tại của tôi không? {#what-clz-means-for-developers-2}

Fusaka không có ảnh hưởng trực tiếp nào có thể làm hỏng bất kỳ hợp đồng hiện có nào hoặc thay đổi hành vi của chúng. Các thay đổi được giới thiệu cho lớp thực thi được thực hiện với khả năng tương thích ngược, tuy nhiên, hãy luôn để mắt đến các trường hợp ngoại lệ và tác động tiềm ẩn.

[Với chi phí tăng lên của hợp đồng tiền biên dịch `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), các hợp đồng phụ thuộc vào nó sẽ tiêu thụ nhiều Gas hơn cho việc thực thi. Nếu hợp đồng của bạn phụ thuộc nhiều vào điều này và trở nên đắt đỏ hơn đối với người dùng, hãy xem xét lại cách nó được sử dụng.

Hãy xem xét [giới hạn 16,7 triệu mới](https://eips.ethereum.org/EIPS/eip-7825) nếu các giao dịch thực thi hợp đồng của bạn có thể đạt đến kích thước tương tự.

## Đọc thêm {#further-reading}

- [Lộ trình Ethereum](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Siêu EIP Fusaka](https://eips.ethereum.org/EIPS/eip-7607)
- [Thông báo trên blog về mạng thử nghiệm Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless: Fusaka & Pectra sẽ mang lại gì cho Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Các bản nâng cấp tiếp theo của Ethereum: Fusaka, Glamsterdam & Hơn thế nữa với Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Hồ sơ Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [Giải thích về PEEPanEIPs](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)