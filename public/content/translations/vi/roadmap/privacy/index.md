---
title: Lộ trình quyền riêng tư cho Ethereum
description: Ethereum đang nỗ lực đưa quyền riêng tư trở thành thuộc tính hàng đầu của mạng lưới thông qua các bản nâng cấp giúp bảo vệ quyền riêng tư của giao dịch, bảo mật quyền truy cập dữ liệu người dùng và cho phép danh tính có thể xác minh nhưng vẫn riêng tư.
lang: vi
image: /images/roadmap/roadmap-security.png
alt: Lộ trình Ethereum
template: roadmap
---

**Quyền riêng tư trên Ethereum đang chuyển từ một tiện ích bổ sung tùy chọn sang mặc định ở cấp độ mạng lưới.** Các lộ trình quyền riêng tư được đề xuất của Ethereum nhắm vào các điểm kết nối dễ bị tổn thương cụ thể, nơi dữ liệu người dùng có thể bị rò rỉ hiện nay. Nghiên cứu trên toàn hệ sinh thái nhằm mục đích biến Ethereum thành một nền tảng nơi quyền riêng tư mang tính cấu trúc thay vì phải chọn tham gia (opt-in).

Các nhà nghiên cứu tại Tổ chức Ethereum đã [tổng hợp ba ưu tiên cốt lõi của lộ trình](https://pse.dev/blog/pse-roadmap-2025) từ các nghiên cứu phân tán trên toàn hệ sinh thái:

- **Đọc riêng tư (Private reads)** - truy vấn và duyệt Ethereum mà không tiết lộ địa chỉ, hợp đồng hoặc dữ liệu nào mà người dùng đang truy cập. Việc bảo vệ quá trình đọc sẽ ngăn chặn dữ liệu bị thu thập ngay cả trước khi một giao dịch được ký.
- **Ghi riêng tư (Private writes)** - gửi các giao dịch có khả năng chống kiểm duyệt và rò rỉ siêu dữ liệu, từ việc đưa vào mempool cho đến quyết toán cuối cùng. Việc bảo vệ quá trình ghi đảm bảo các giao dịch riêng tư không bị kiểm duyệt hoặc bị liên kết ngược lại với nguồn gốc của chúng.
- **Chứng minh riêng tư (Private proving)** - xác minh danh tính, tính đủ điều kiện hoặc dữ liệu mà không tiết lộ thông tin cá nhân cơ bản, sử dụng các bằng chứng không tri thức hiệu quả. Chứng minh riêng tư cho phép người dùng tham gia vào mạng lưới trong khi chỉ chọn tiết lộ thông tin tối thiểu cần thiết (tiết lộ có chọn lọc).

Cùng với nhau, ba lĩnh vực này tạo thành một mô hình quyền riêng tư đầu cuối. Mục tiêu là **chủ quyền tính toán**, đảm bảo Ethereum là một nền tảng nơi các cá nhân và tổ chức có thể tương tác, phối hợp và giao dịch trên toàn cầu mà không bị thu thập dữ liệu trái phép, giám sát hoặc kiểm duyệt tập trung.

**Tại sao quyền riêng tư lại quan trọng?** Tìm hiểu về quyền riêng tư, cách bảo vệ quyền riêng tư trực tuyến của bạn và bảo vệ quyền riêng tư của bạn trên Ethereum hiện nay.

<ButtonLink variant="outline" href="/privacy/">Thêm về quyền riêng tư</ButtonLink>

## Đọc riêng tư bảo vệ các truy vấn và dữ liệu truy cập của người dùng {#private-reads}

Trước khi một giao dịch được ký, người dùng cần đọc dữ liệu từ chuỗi khối. Để kiểm tra số dư, ước tính gas hoặc xác minh trạng thái của một hợp đồng thông minh, phần mềm ví sẽ gửi các truy vấn đến một nhà cung cấp nút. Các truy vấn **Gọi thủ tục từ xa (Remote Procedure Call - RPC)** tiêu chuẩn này làm lộ ra một lượng lớn siêu dữ liệu.

Nhà cung cấp nút có thể thấy địa chỉ IP, dấu vân tay thiết bị, các địa chỉ được truy vấn cụ thể, cũng như thời gian và tần suất hoạt động của người dùng. Ngay cả khi người dùng sau đó gửi một giao dịch riêng tư, nhà cung cấp cơ sở hạ tầng đã có quyền truy cập vào một bản đồ chi tiết về ý định của họ.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

Rò rỉ siêu dữ liệu ở lớp truy cập là một trong những vấn đề về quyền riêng tư dai dẳng nhất trong tất cả các hệ thống chuỗi khối. Ethereum nhằm mục đích giải quyết rò rỉ siêu dữ liệu thông qua quyền riêng tư về nguồn gốc (ẩn người đã hỏi), quyền riêng tư về nội dung (ẩn nội dung đã hỏi) và xác minh tính chính xác của thông tin được trả về.

**Quyền riêng tư về nguồn gốc** sử dụng [RPC ẩn danh](https://privreads.ethereum.foundation/feed/anon-rpc/) và các giải pháp mạng ẩn danh để che giấu thực thể yêu cầu dữ liệu, **quyền riêng tư về nội dung** sử dụng các chiến thuật như truy xuất thông tin riêng tư và [RAM lãng quên (oblivious RAM)](https://en.wikipedia.org/wiki/Oblivious_RAM) để ẩn dữ liệu đang được truy vấn, trong khi **xác minh tính chính xác** sử dụng các light client để chứng minh dữ liệu trả về là chính xác.

Khối xây dựng mật mã học đằng sau quyền riêng tư về nội dung là [**Truy xuất thông tin riêng tư (Private Information Retrieval - PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), một kỹ thuật mật mã học cho phép máy khách truy vấn cơ sở dữ liệu và truy xuất một phần thông tin cụ thể mà không tiết lộ cho máy chủ biết mục nào đã được truy cập. Máy chủ xử lý yêu cầu một cách mù quáng và trả về một phản hồi được mã hóa mà chỉ ví truy vấn mới có thể giải mã.

PIR hoạt động ở lớp truy cập, nằm giữa phần mềm ví và các nhà cung cấp nút. Khi các triển khai PIR trưởng thành, chúng sẽ được tích hợp vào các bộ công cụ phát triển phần mềm (SDK) của ví và các nhà cung cấp cơ sở hạ tầng, cho phép người dùng truy vấn mạng lưới mà không làm lộ hoạt động của họ cho các bên trung gian tập trung.

Đọc riêng tư cũng làm giảm nguy cơ bị chạy trước và các cuộc tấn công sắp xếp giao dịch. Nếu một nhà cung cấp cơ sở hạ tầng không thể thấy hợp đồng thông minh hoặc địa chỉ nào mà người dùng đang truy vấn, họ không thể bán thông tin đó cho những tác nhân kiếm lời từ việc dự đoán hoạt động trên chuỗi.

## Ghi riêng tư ngăn chặn kiểm duyệt và rò rỉ giao dịch {#private-writes}

Khi một giao dịch được gửi đi, nó sẽ đi qua cơ sở hạ tầng mạng lưới có thể quan sát hoặc chặn nó trước khi nó được ghi lại trên chuỗi. Đây là nơi nhiều giao thức quyền riêng tư thất bại trong thực tế. Các trình tạo block tập trung, quy mô lớn giám sát mempool và có thể âm thầm gạt sang một bên hoặc kiểm duyệt các giao dịch bắt nguồn từ các công cụ quyền riêng tư. Ngay cả khi mật mã học cơ bản là an toàn, một giao dịch không bao giờ được đưa vào một khối sẽ không mang lại sự bảo vệ nào.

Hai bản nâng cấp ở cấp độ giao thức cùng nhau giải quyết vấn đề này:

[**EIP-8141 (Giao dịch Khung - Frame Transactions)**](https://eips.ethereum.org/EIPS/eip-8141) giới thiệu một loại giao dịch mới chia các giao dịch thành các phân đoạn để xác thực chữ ký và ủy quyền phí, và cho các lệnh giao dịch thực tế. Giao dịch khung cho phép các [tài khoản thông minh](/roadmap/account-abstraction/) xác định các lược đồ chữ ký của riêng chúng và sử dụng các hợp đồng bên ngoài để trang trải phí gas. Các quy tắc hộp cát (sandboxing) nghiêm ngặt trong mempool ngăn chặn các giao dịch này mở ra mạng lưới cho các cuộc tấn công từ chối dịch vụ.

Giao dịch khung đang được xem xét cho [bản nâng cấp Hegotá](https://forkcast.org/upgrade/hegota/) của Ethereum, bản nâng cấp mạng lưới tiếp theo sau [bản nâng cấp Glamsterdam](/roadmap/glamsterdam/) sắp tới. Bản nâng cấp tương tự cũng sẽ cho phép các tài khoản thông minh áp dụng [chữ ký an toàn lượng tử](/roadmap/security/quantum-resistance/) trước khi quá trình chuyển đổi mạng lưới hậu lượng tử hoàn tất.

<ExpandableCard title="Giao dịch frame (EIP-8141) hỗ trợ quyền riêng tư như thế nào?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Giao dịch khung cho phép các tài khoản chọn phương pháp xác minh chữ ký của riêng họ. Đối với quyền riêng tư, điều này có nghĩa là người dùng có thể áp dụng các lược đồ chữ ký bảo vệ quyền riêng tư mà không cần chờ đợi một cuộc di chuyển quy mô lớn trên toàn mạng lưới. Giao dịch khung cũng cho phép trừu tượng hóa phí gas, cho phép các công cụ quyền riêng tư trang trải chi phí giao dịch mà không làm lộ địa chỉ người dùng trên chuỗi.

</ExpandableCard>

[**EIP-7805 (Danh sách đưa vào bắt buộc theo lựa chọn phân nhánh, hay FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) cung cấp cơ chế thực thi cho việc ghi riêng tư. Các quy tắc đồng thuận yêu cầu những người đề xuất khối phải đưa các giao dịch vào khối của họ từ các danh sách đưa vào cục bộ được tổng hợp, thu thập các giao dịch từ nhiều nguồn. Nếu một trình tạo block cố gắng kiểm duyệt một giao dịch đã xuất hiện trong danh sách đưa vào, các nút chứng thực sẽ từ chối hoàn toàn khối được đề xuất. FOCIL hiện đang được xem xét cho [bản nâng cấp Hegotá](https://forkcast.org/upgrade/hegota/).

Giao dịch khung mang lại cho người dùng sự linh hoạt để xây dựng các giao dịch bảo vệ quyền riêng tư với các lược đồ chữ ký tùy chỉnh, trong khi FOCIL đảm bảo các giao dịch đó không thể bị kiểm duyệt có chọn lọc một khi chúng đi vào mempool. Cùng nhau, chúng giải quyết hai điểm thất bại khác nhau: một cái cho phép định dạng của các giao dịch riêng tư, cái kia đảm bảo việc đưa chúng vào. Không một tác nhân trung tâm nào có thể chặn một giao dịch chuyển hợp lệ và riêng tư.

<VideoWatch slug="eip-7805-focil-explained" />

Một điểm dễ bị tổn thương thứ hai đối với quyền riêng tư của người dùng là cách Ethereum theo dõi thứ tự của các giao dịch, được gọi là hệ thống nonce tuần tự. Trong mô hình tài khoản Ethereum tiêu chuẩn, mỗi tài khoản sử dụng một bộ đếm tăng dần tuyến tính duy nhất. Nếu một giao dịch riêng tư bị trì hoãn trong mempool, tất cả các giao dịch tiếp theo từ tài khoản đó sẽ bị đình trệ phía sau nó. Chuỗi nonce cũng cho phép những người quan sát mạng lưới liên kết nhiều giao dịch trở lại cùng một tài khoản gốc, làm suy yếu quyền riêng tư.

[**EIP-8250 (Keyed Nonces cho Giao dịch Khung)**](https://eips.ethereum.org/EIPS/eip-8250), hiện đang được xem xét cho Hegotá, giải quyết vấn đề này bằng cách cho phép một tài khoản duy nhất quản lý đồng thời nhiều chuỗi giao dịch song song. Người dùng có thể thực thi nhiều giao dịch riêng tư trên các bối cảnh khác nhau cùng một lúc và những người quan sát không còn có thể tương quan một cách đáng tin cậy các hoạt động riêng biệt trở lại cùng một tài khoản mẹ.

### Thanh toán riêng tư và chuyển giá trị {#private-payments}

Ngoài việc định tuyến giao dịch và quản lý nonce, việc bảo vệ quá trình ghi đòi hỏi phải che chắn danh tính và tài sản liên quan đến một giao dịch chuyển. Ngay cả khi người dùng truy vấn một cách riêng tư và phát sóng một giao dịch mà không bị kiểm duyệt, dữ liệu giao dịch được ghi lại trên chuỗi vẫn hiển thị công khai. Bất kỳ ai cũng có thể thấy ai đã gửi bao nhiêu cho ai và các công ty phân tích chuỗi tổng hợp dữ liệu này thành các hồ sơ có thể tìm kiếm tồn tại vô thời hạn.

[**EIP-8182 (Chuyển ETH và ERC-20 riêng tư)**](https://eips.ethereum.org/EIPS/eip-8182), được đề xuất cho bản nâng cấp Hegotá, giới thiệu một nhóm được che chắn (shielded pool) dùng chung, gốc trực tiếp vào giao thức Ethereum cho các giao dịch chuyển ETH và ERC-20. Các nhóm quyền riêng tư sử dụng kỹ thuật trộn mật mã học để cắt đứt liên kết giữa việc nạp và rút tiền, nhưng hiện nay chỉ khả dụng thông qua các ứng dụng quyền riêng tư, ví và các mạng lưới lớp 2 (l2).

Trong lịch sử, các giải pháp quyền riêng tư ở cấp độ ứng dụng đã làm phân mảnh thanh khoản và gặp phải vấn đề về tập hợp ẩn danh thấp. EIP-8182 củng cố các giao dịch chuyển được che chắn ở cấp độ giao thức, cho phép người dùng định tuyến tiền thông qua các khóa phân phối ẩn mà không yêu cầu kiến trúc ví chuyên dụng hoặc tương tác với các ứng dụng phân mảnh, chọn tham gia.

Các phương pháp nghiên cứu khác đang được thúc đẩy cho quyền riêng tư của giao dịch bao gồm các bằng chứng cho phép người dùng chứng minh rằng số tiền giao dịch là hợp lệ mà không tiết lộ các giá trị thực tế (như bulletproofs và range proofs). Nghiên cứu về **giao dịch bảo mật (confidential transactions)** nhằm mục đích ẩn số tiền trong khi vẫn cho phép mạng lưới xác minh rằng không có giá trị nào được tạo ra hoặc bị phá hủy.

Các giải pháp ở lớp thanh toán này được xây dựng dựa trên cơ sở hạ tầng đã mô tả trước đó trong phần này. PIR bảo vệ giai đoạn chuẩn bị, giao dịch khung và FOCIL đảm bảo các khoản thanh toán riêng tư đến được mempool mà không bị kiểm duyệt, và zkVMs cho phép mật mã học phức tạp cần thiết để ẩn giá trị trong khi vẫn duy trì các đảm bảo bảo mật của mạng lưới.

## Chứng minh riêng tư và bảo vệ danh tính {#private-proving}

Quyền riêng tư không phải là sự che giấu hoàn toàn. Nó là về **tiết lộ có chọn lọc**, hay chọn thông tin nào để tiết lộ, cho ai và theo những điều khoản nào. Ethereum hỗ trợ tiết lộ có chọn lọc thông qua [**bằng chứng không tri thức (ZKPs)**](/zero-knowledge-proofs/), cho phép một bên chứng minh một tuyên bố là đúng mà không tiết lộ dữ liệu cơ bản. Ví dụ: chứng minh quyền công dân mà không tiết lộ chi tiết hộ chiếu, hoặc chứng minh ngưỡng tuổi mà không tiết lộ ngày sinh chính xác.

Chứng minh riêng tư kết nối với lộ trình quyền riêng tư bằng cách cho phép danh tính có thể xác minh mà không làm lộ dữ liệu ở cấp độ giao thức. Trong khi đọc và ghi riêng tư bảo vệ siêu dữ liệu giao dịch, chứng minh riêng tư đảm bảo rằng các kiểm tra danh tính và tính đủ điều kiện cần thiết cho sự tham gia trong thế giới thực không yêu cầu phải giao nộp dữ liệu cá nhân cho các hệ thống xác minh tập trung.

Trên lộ trình quyền riêng tư của Ethereum, chứng minh riêng tư được hỗ trợ bởi các hướng cơ sở hạ tầng bổ sung, một trên lớp thực thi để làm cho tính toán riêng tư có thể thực hiện được ở cấp độ giao thức, và một trên lớp truy cập, giúp tính toán riêng tư trở nên thiết thực trên các thiết bị của người tiêu dùng.

**Máy ảo không tri thức (zkVMs)** cho phép các hợp đồng thông minh chạy logic của chúng và tạo ra một bằng chứng mật mã học rằng công việc đã được thực hiện chính xác. Khi bằng chứng đó thực sự là không tri thức, nó không tiết lộ bất cứ điều gì về các đầu vào, trạng thái trung gian hoặc đầu ra, mở khóa tính toán riêng tư ở cấp độ mạng lưới.

Cái tên "zkVM" mang một sắc thái; hầu hết các hệ thống được gọi là zkVMs hiện nay đều ngắn gọn (succinct) thay vì không tri thức. Các bằng chứng của chúng nhỏ và xác minh nhanh, nhưng không nhất thiết phải ẩn dữ liệu được sử dụng để tạo ra chúng. Ngày nay, chỉ có một số ít các hệ thống chứng minh cung cấp thuộc tính ẩn mà các ứng dụng quyền riêng tư phụ thuộc vào. Các [điểm chuẩn Chứng minh phía máy khách (Client-Side Proving benchmarks)](https://ethproofs.org/csp-benchmarks) theo dõi những zkVMs nào đã được phân tích về tính không tri thức thực tế trong các thuộc tính hệ thống của chúng. Việc thu hẹp khoảng cách đó là một phần trong công việc chứng minh riêng tư của lộ trình.

Giao dịch khung (EIP-8141) cũng được kết nối với việc triển khai zkVMs. Chúng có thể sử dụng các lược đồ xác minh tùy chỉnh để gửi các chuyển đổi trạng thái đã được xác minh bằng chứng, cho phép các ứng dụng cung cấp môi trường thực thi riêng tư và gửi bằng chứng mật mã học lên mạng lưới Ethereum công khai rằng hành động đã được thực hiện chính xác, mà không làm lộ chính dữ liệu giao dịch.

Bằng chứng không tri thức rất tuyệt vời trong việc cho phép các cá nhân chứng minh dữ liệu của họ là hợp lệ trong khi vẫn giữ bí mật, nhưng chúng không thể dễ dàng quản lý các hợp đồng thông minh nơi nhiều người dùng cần tương tác với một nhóm dữ liệu bí mật dùng chung cùng một lúc.

Để thu hẹp khoảng cách này, lộ trình của Ethereum kết hợp **Mã hóa đồng cấu hoàn toàn (Fully Homomorphic Encryption - FHE)**. FHE cho phép các hợp đồng thông minh chạy các tính toán trực tiếp trên dữ liệu được mã hóa mà không bao giờ phải giải mã hoặc làm lộ thông tin cơ bản. Việc tích hợp các khối xây dựng FHE và các bộ đồng xử lý mật mã học chuyên dụng vào Ethereum là điều cần thiết cho các ứng dụng phi tập trung dựa trên một "trạng thái ẩn" dùng chung, như các nhà tạo lập thị trường tự động (AMM) riêng tư, các nhóm cho vay bảo mật hoặc các cuộc đấu giá bỏ thầu kín nơi đầu vào của mọi người phải tương tác trong khi vẫn hoàn toàn bí mật.

**Chứng minh phía máy khách (Client-side proving)** làm cho việc tạo ra các bằng chứng quyền riêng tư này trở nên thiết thực trên các thiết bị hàng ngày. Dự án Chứng minh phía máy khách duy trì một bộ điểm chuẩn công khai so sánh các hệ thống chứng minh và zkVMs trên phần cứng của người tiêu dùng, công bố kết quả tại [ethproofs.org](https://ethproofs.org). Nghiên cứu kỹ thuật hướng tới các bằng chứng minh bạch, [hậu lượng tử](/roadmap/security/quantum-resistance/) với xác minh trực tiếp trên chuỗi, giúp tính toán riêng tư nhanh hơn, dễ xác minh trực tiếp hơn trên mạng lưới Ethereum và khả thi trên các thiết bị di động.

[**Sáng kiến zkID**](https://pse.dev/projects/zk-id) đã tạo ra cơ sở hạ tầng mã nguồn mở phù hợp với các khuôn khổ danh tính toàn cầu, bao gồm cả ví Danh tính Kỹ thuật số Châu Âu (EUDI). Hệ thống Thông tin xác thực Ẩn danh Mở (Open Anonymous Credentials - OpenAC) cung cấp khả năng không thể liên kết cho các thông tin xác thực được cấp, đảm bảo rằng nhiều bằng chứng được tạo bởi cùng một người dùng trên các nền tảng khác nhau không thể tương quan trở lại một hồ sơ duy nhất.

Trong không gian Quản trị, giao thức [**Cơ sở hạ tầng chống thông đồng tối thiểu (Minimal Anti-Collusion Infrastructure - MACI)**](https://maci.pse.dev/) cung cấp **tính không có biên lai (receipt-freeness)**, khiến cho việc chứng minh một tài khoản đã bỏ phiếu như thế nào là không thể về mặt mật mã học. Bởi vì cử tri không thể xuất trình biên lai cho thấy lựa chọn của họ, việc mua phiếu bầu và ép buộc sẽ mất đi động lực kinh tế. MACI đã bảo mật các quyết định tài trợ trong thế giới thực kể từ năm 2020 thông qua [clr.fund](https://clr.fund/), nơi đã phân phối hàng triệu đô la tài trợ bậc hai cho các hàng hóa công cộng của Ethereum.

Việc bỏ phiếu bảo vệ quyền riêng tư đã và đang bảo vệ các cử tri thực sự trong các bối cảnh có rủi ro cao. [Freedom Tool của Rarimo](https://docs.rarimo.com/freedom-tool/) sử dụng xác minh hộ chiếu không tri thức để cho phép công dân chứng minh họ đủ điều kiện bỏ phiếu mà không tiết lộ họ là ai. Nó đã hỗ trợ các cuộc bầu cử ẩn danh và các cuộc thăm dò ý kiến đối lập ở các quốc gia bao gồm Nga (cuộc bỏ phiếu đối lập [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a)), Georgia (ứng dụng thăm dò ý kiến United Space) và Iran (dự án Iranians Vote), nơi sự an toàn của cử tri phụ thuộc vào tính bí mật của lá phiếu bằng mật mã học.

Chứng minh riêng tư cũng cho phép **quyền riêng tư nhận thức tuân thủ (compliance-aware privacy)**. Các giải pháp quyền riêng tư như các nhóm quyền riêng tư chấp nhận tiền nạp một cách tự do nhưng yêu cầu người dùng tạo ra các bằng chứng không tri thức rằng tiền của họ không giao cắt với các địa chỉ độc hại đã biết trước khi rút tiền. Mô hình tuân thủ có thể lập trình tách biệt hành động che chắn các giao dịch khỏi hành động chứng minh sự tuân thủ quy định, cho phép người dùng hàng ngày giao dịch riêng tư trong khi vẫn đáp ứng các yêu cầu của tổ chức.

zkEVMs có thể thực thi các kiểm tra tuân thủ này một cách riêng tư, xác minh trạng thái quy định mà không làm lộ chi tiết giao dịch hoặc danh tính người dùng.

## Tiến độ lộ trình hiện tại {#current-progress}

Hướng phát triển quyền riêng tư trên Ethereum được định hình bởi sự liên kết trên toàn hệ sinh thái thay vì bất kỳ tổ chức đơn lẻ nào. Lộ trình [strawmap.org](https://strawmap.org/) thu thập các bản nâng cấp được đề xuất từ khắp hệ sinh thái để theo dõi và đề xuất nơi cộng đồng đã đạt được sự đồng thuận. Các nhà nghiên cứu tại Tổ chức Ethereum giúp quản lý một lộ trình nghiên cứu và phát triển song song trên toàn hệ sinh thái nghiên cứu, tập trung vào việc thúc đẩy các công cụ quyền riêng tư ở lớp truy cập, cơ sở hạ tầng danh tính và các hệ thống nhận thức tuân thủ. Cả hai ví dụ đều phản ánh cùng một ưu tiên cơ bản là làm cho quyền riêng tư trên Ethereum mang tính cấu trúc thay vì tùy chọn.

Nghiên cứu và phát triển về quyền riêng tư trên Ethereum trải dài qua hàng chục nhóm trên toàn hệ sinh thái. Công việc đang tiến triển trên các bản nâng cấp giao thức, các giải pháp lớp truy cập, cơ sở hạ tầng danh tính và các công cụ nhận thức tuân thủ.

**Nâng cấp giao thức**: EIP-8141 (Giao dịch Khung), EIP-7805 (FOCIL), EIP-8250 (Keyed Nonces) và EIP-8182 (Nhóm được che chắn ở cấp độ giao thức) đang được phát triển tích cực và được xem xét cho [bản nâng cấp Hegotá](https://forkcast.org/upgrade/hegota/), bản nâng cấp mạng lưới tiếp theo sau [Glamsterdam](/roadmap/glamsterdam/). EIP-8025 (bằng chứng thực thi tùy chọn) và cây Verkle cũng được nhắm mục tiêu cho Hegotá, cung cấp nền tảng cho tính toán riêng tư dựa trên zkEVM trên Mạng chính Ethereum. Song song đó, nghiên cứu đang trưởng thành xung quanh các bộ đồng xử lý FHE để cho phép các hợp đồng thông minh được mã hóa nhiều bên.

**Lớp truy cập**: Nghiên cứu PIR đang tiến triển với các triển khai tích cực đang được thử nghiệm bởi các nhóm cơ sở hạ tầng. SDK ví Kohaku đang được phát triển như một tài liệu tham khảo mã nguồn mở cho các ví bảo vệ quyền riêng tư.

**Chứng minh phía máy khách**: Các nhóm đang tích cực sử dụng kết quả thử nghiệm dựa trên điểm chuẩn để tối ưu hóa cách các bằng chứng không tri thức chạy trên các thiết bị tiêu chuẩn. Các dự án như Spartan-WHIR đang thúc đẩy các bằng chứng an toàn, kháng lượng tử có thể dễ dàng được xác minh trực tiếp trên mạng lưới Ethereum. Các sáng kiến nghiên cứu như leanVM cung cấp một zkVM nhẹ được thiết kế để gộp nhiều chữ ký mật mã học lại với nhau, thu nhỏ kích thước dữ liệu của các chữ ký an toàn lượng tử đi 250 lần để tiết kiệm không gian và giảm chi phí mạng lưới.

**Danh tính và chứng minh**: Sáng kiến zkID đang tạo ra các lược đồ chứng minh được tối ưu hóa cho các thiết bị di động. MACI tiếp tục bảo mật các vòng tài trợ bậc hai và Quản trị DAO, các công cụ như Freedom Tool của Rarimo đang đưa việc bỏ phiếu không tri thức vào các cuộc bầu cử trong thế giới thực và nghiên cứu đang diễn ra tiếp tục đi sâu vào các tiêu chuẩn danh tính bảo vệ quyền riêng tư.

Không có phần nào của công việc này đã hoàn thành. Các mốc thời gian là mục tiêu, không phải là sự đảm bảo và [quy trình Quản trị dựa trên đồng thuận](/governance/) của Ethereum có nghĩa là lộ trình có thể thay đổi khi nghiên cứu tiến triển. Nhưng phạm vi phát triển tích cực và số lượng các nhóm làm việc về quyền riêng tư thể hiện một cam kết rõ ràng trong việc làm cho Ethereum có khả năng chống trích xuất (extraction-resistant) theo mặc định.

## Đọc thêm {#further-reading}

- [Quyền riêng tư trên Ethereum](/privacy/)
- [Lộ trình PSE: 2025 và xa hơn](https://pse.dev/blog/pse-roadmap-2025)
- [Nhiệm vụ của Tổ chức Ethereum](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Bằng chứng không tri thức](/zero-knowledge-proofs/)
- [Danh tính phi tập trung](/decentralized-identity/)
- [Lộ trình Kohaku](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Điểm chuẩn Chứng minh phía máy khách](https://ethproofs.org/csp-benchmarks)
- [zkEVM qua các con số](https://zkevm.ethereum.foundation/)