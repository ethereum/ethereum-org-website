---
title: "Mở khóa khả năng mở rộng của Ethereum: Giải thích về EIP-4844"
description: "Finematics giải thích về EIP-4844 (Proto-Danksharding), bản nâng cấp chính trong Phân nhánh cứng Dencun giới thiệu các giao dịch khối dữ liệu (blob) để giảm đáng kể chi phí cho các bản cuộn lớp 2 trên Ethereum."
lang: vi
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "cách ethereum hoạt động"
  - "mở rộng"
  - "eip-4844"
  - "dencun"
  - "nâng cấp"
format: explainer
author: Finematics
breadcrumb: "Giải thích về EIP-4844"
---

Một video giải thích của **Finematics** về EIP-4844 (Proto-Danksharding), bản nâng cấp chính trong Phân nhánh cứng Dencun giới thiệu các giao dịch khối dữ liệu (blob) để giảm đáng kể chi phí cho các bản cuộn lớp 2 trên Ethereum.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=HT9PHWloIiU) được xuất bản bởi Finematics. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:00) {#introduction-000}

Khả năng mở rộng của Ethereum đã là một chủ đề được tranh luận sôi nổi trong một thời gian. Các giải pháp lớp 2 (L2) đã đi đầu trong cuộc chiến này, cung cấp một cách để xử lý các giao dịch bên ngoài Chuỗi chính nhằm giảm bớt tắc nghẽn và giảm phí. Nhưng có một vấn đề — ngay cả các L2 cũng phải đối mặt với những hạn chế cản trở hiệu quả và khả năng mở rộng của chúng. EIP-4844 là bước tiếp theo trong việc gia tăng tiềm năng của L2 và điều chỉnh Ethereum phù hợp với lộ trình mở rộng của nó.

Vậy, EIP-4844 là gì? Chính xác thì nó giúp mở rộng các L2 như thế nào? Nó mở ra những khả năng mới nào? Và có đúng là nó có thể giảm phí giao dịch trên các L2 hơn 90% không?

#### EIP-4844 và Proto-Danksharding là gì (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Xin nhắc lại, EIP là viết tắt của Đề xuất cải tiến Ethereum (Ethereum Improvement Proposal), một quy trình mà qua đó các nhà phát triển có thể đề xuất các thay đổi đối với Giao thức Ethereum. Cụ thể, EIP-4844 đề xuất một loại giao dịch mới có thể tăng cường đáng kể cách dữ liệu được xử lý và giải quyết trên Ethereum. Bạn cũng có thể đã nghe đến cái tên "Proto-Danksharding", hiện được sử dụng thay thế cho EIP-4844.

Proto-Danksharding là một đợt triển khai ban đầu của danksharding toàn diện. Nó đặt nền móng cho việc mở rộng hơn nữa với danksharding trong tương lai. Điều này đạt được bằng cách triển khai hầu hết logic và "bộ khung" tạo nên một đặc tả danksharding toàn diện, mà không cần triển khai phân mảnh dữ liệu thực tế. Làm theo cách này cho phép quá trình chuyển đổi diễn ra dễ dàng và ít gián đoạn hơn, có thể diễn ra qua nhiều bản nâng cấp mạng lưới mà không gây ra quá nhiều rủi ro cho Ethereum trong một bản nâng cấp duy nhất.

Ý tưởng cốt lõi đằng sau EIP-4844 là hỗ trợ tương lai "lấy Rollup làm trung tâm" của Ethereum. Các bản cuộn là các giải pháp lớp 2 xử lý các giao dịch bên ngoài Chuỗi Ethereum chính nhưng kế thừa tính bảo mật của Ethereum. EIP-4844 nhằm mục đích làm cho các bản cuộn rẻ hơn và hiệu quả hơn bằng cách giới thiệu một loại giao dịch mới mà các bản cuộn có thể tận dụng để cho phép chúng giảm chi phí hoạt động theo cấp số nhân. Điều này đến lượt nó sẽ cho phép các ứng dụng được xây dựng trên các bản cuộn có chi phí sử dụng rẻ hơn nhiều và tăng cường sự chấp nhận của toàn bộ hệ sinh thái Ethereum.

Hãy tưởng tượng việc thực hiện một giao dịch hoán đổi trên DEX ở một trong các bản cuộn. Nếu chi phí hiện tại để thực hiện một thao tác như vậy là, giả sử, 1 đô la, thì rất có thể nó sẽ giảm xuống còn khoảng 0,10 đô la sau EIP-4844. Tuy nhiên, tác động trong ví dụ này có một số lưu ý mà chúng ta sẽ đề cập ở phần sau của video.

EIP-4844 cùng với một vài EIP khác sẽ được đưa vào bản nâng cấp Dencun sắp tới của mạng lưới.

#### Chi tiết kỹ thuật (2:50) {#technical-details-250}

Bây giờ, hãy cùng xem xét kỹ hơn cách EIP-4844 hoạt động.

EIP-4844 giới thiệu một loại giao dịch mới cho Ethereum, chấp nhận các "khối dữ liệu" (blob) để được lưu trữ trong nút Beacon trong một khoảng thời gian ngắn. Những thay đổi này tương thích chuyển tiếp với lộ trình mở rộng của Ethereum và các khối dữ liệu đủ nhỏ để giữ cho việc sử dụng ổ đĩa ở mức có thể quản lý được. Các giao dịch khối dữ liệu có cùng định dạng mà chúng được kỳ vọng sẽ tồn tại trong đặc tả danksharding cuối cùng.

Điều này đi kèm với một "thị trường phí blob", đảm bảo rằng không gian khối dữ liệu được sử dụng hiệu quả và duy trì tính khả thi về mặt kinh tế. Điều này đạt được bằng cách giới thiệu Gas khối dữ liệu (blob gas) như một loại Gas mới. Nó độc lập với Gas thông thường. Hiện tại, chỉ có các khối dữ liệu mới được định giá bằng Gas khối dữ liệu.

Các khối dữ liệu là 4.096 phần tử trường (field element), mỗi phần tử có kích thước 32 byte. Giới hạn khối dữ liệu trên mỗi khối được kiểm soát bởi tham số MAX_BLOBS_PER_BLOCK. Giới hạn này có thể bắt đầu ở mức thấp và tăng dần qua nhiều bản nâng cấp mạng lưới. Ban đầu, Dencun nhắm mục tiêu 6 khối dữ liệu mỗi khối. 4.096 × 32 byte × 6 mỗi khối = 0,75 MB mỗi khối.

Các khối dữ liệu được lưu trữ trong các nút Beacon (lớp đồng thuận), không phải trong lớp thực thi. Công việc phân mảnh trong tương lai chỉ yêu cầu các thay đổi đối với nút Beacon, cho phép lớp thực thi làm việc song song trên các sáng kiến khác.

Các khối dữ liệu tồn tại trong thời gian ngắn và bị cắt tỉa sau khoảng hai tuần. Chúng có sẵn đủ lâu để tất cả các tác nhân của một Rollup có thể truy xuất chúng, nhưng đủ ngắn để giữ cho việc sử dụng ổ đĩa ở mức có thể quản lý được. Điều này cho phép các khối dữ liệu được định giá rẻ hơn so với dữ liệu lệnh gọi (calldata), vốn là dữ liệu được lưu trữ vĩnh viễn trong lịch sử.

Xương sống mật mã học của EIP-4844 là các cam kết KZG. Không cần đi quá sâu vào chi tiết kỹ thuật, chúng cho phép đưa dữ liệu vào một cách hiệu quả và an toàn, điều này rất quan trọng đối với chức năng của các giao dịch khối dữ liệu. Bằng cách này, chỉ các cam kết đối với các khối dữ liệu mới phải được EVM diễn giải trong lớp thực thi chứ không phải bản thân các khối dữ liệu.

Để tạo ra bí mật chia sẻ cho các cam kết KZG, một buổi lễ phân tán rộng rãi dựa trên trình duyệt đã được tổ chức để tất cả những người tham gia mạng lưới Ethereum đều có cơ hội đảm bảo rằng nó được tạo ra một cách chính xác và an toàn.

EIP-4844 bổ sung một hợp đồng tiền biên dịch mới gọi là đánh giá điểm (point evaluation) để xác minh một bằng chứng KZG, trong đó khẳng định rằng một khối dữ liệu (được đại diện bởi một cam kết) đánh giá ra một giá trị nhất định tại một điểm nhất định.

Vậy chính xác thì tất cả những điều này áp dụng cho các bản cuộn như thế nào? Với không gian khối dữ liệu mới, các bản cuộn sẽ có thể đưa dữ liệu khối của chúng vào các khối dữ liệu thay vì dữ liệu lệnh gọi đắt đỏ hơn vốn được sử dụng cho mục đích này cho đến nay. Việc tận dụng một không gian khối dữ liệu tồn tại trong thời gian ngắn ở lớp đồng thuận là khả thi vì các bản cuộn chỉ cần dữ liệu có sẵn đủ lâu để đảm bảo các tác nhân trung thực có thể xây dựng không gian Rollup.

Trong trường hợp của các bản cuộn lạc quan (optimistic rollup) như Optimism hoặc Arbitrum, chúng chỉ cần cung cấp dữ liệu cơ sở trong khoảng thời gian cửa sổ thử thách gian lận còn mở. Bằng chứng gian lận có thể xác minh quá trình chuyển đổi theo các bước nhỏ hơn, tải tối đa một vài giá trị của khối dữ liệu tại một thời điểm thông qua dữ liệu lệnh gọi.

Các bản cuộn không tri thức (ZK rollup) sẽ cung cấp hai cam kết cho dữ liệu giao dịch hoặc dữ liệu delta trạng thái của chúng: cam kết khối dữ liệu và cam kết riêng của ZK rollup bằng cách sử dụng bất kỳ hệ thống bằng chứng nào mà Rollup đó sử dụng nội bộ. Chúng cũng sẽ sử dụng một Giao thức bằng chứng tương đương, sử dụng hợp đồng tiền biên dịch đánh giá điểm đã đề cập trước đó, để chứng minh rằng hai cam kết này tham chiếu đến cùng một dữ liệu.

#### Tác động (6:25) {#impact-625}

Tác động của EIP-4844 đối với hệ sinh thái Ethereum là vô cùng to lớn. Trước hết, nó cải thiện đáng kể khả năng mở rộng của các giải pháp lớp 2, giảm chi phí hoạt động của chúng và làm cho chúng cạnh tranh hơn với các Chuỗi khối thay thế, giá rẻ khác. Việc giảm chi phí hoạt động là khả thi vì phần lớn chi phí hiện tại mà các bản cuộn phải chịu là do phí trả cho dữ liệu lệnh gọi.

Hơn nữa, EIP-4844 đặt nền móng cho việc mở rộng hơn nữa thông qua danksharding toàn diện. Bản nâng cấp trong tương lai này sẽ chia mạng lưới Ethereum thành nhiều chuỗi phân mảnh dữ liệu, mỗi chuỗi có khả năng lưu trữ dữ liệu độc lập, giúp tăng cường hơn nữa công suất của mạng lưới.

Với việc chi phí hoạt động giảm xuống, chúng ta có thể chứng kiến một làn sóng các giải pháp lớp 2 mới xuất hiện, thu hút các nhà phát triển xây dựng các ứng dụng sáng tạo trên các bản cuộn.

Khi nói đến việc giảm chi phí giao dịch trên các bản cuộn, được minh họa bằng ví dụ hoán đổi trên DEX trước đó của chúng ta, tình hình khá phức tạp. Giả sử nhu cầu đối với các bản cuộn vẫn không đổi sau EIP-4844, chúng ta thực sự có thể dự đoán chi phí cho người dùng sẽ giảm đáng kể. Tuy nhiên, những cải thiện về khả năng mở rộng có thể dẫn đến những tác động kinh tế không lường trước được. Ví dụ, phí giao dịch thấp hơn cho người dùng cuối có thể thúc đẩy nhiều người sử dụng các bản cuộn hơn, sau đó làm tăng nhu cầu đối với các tài nguyên mạng lưới và có khả năng làm tăng chi phí giao dịch.

Có một điều chắc chắn — ngay cả khi kết quả chính là sự gia tăng thông lượng giao dịch và chi phí giao dịch vẫn giữ nguyên, EIP-4844 vẫn đặt nền móng cho khả năng mở rộng thậm chí còn lớn hơn trong tương lai, điều cuối cùng sẽ mang lại các giao dịch rẻ hơn cho người dùng.

#### Tóm tắt (8:04) {#summary-804}

Cộng đồng Ethereum đã hoàn tất việc thử nghiệm EIP-4844 trên nhiều mạng thử nghiệm khác nhau, với việc ra mắt trên Mạng chính dự kiến vào ngày 13 tháng 3. Đây là một bước tiến hoành tráng hướng tới việc đạt được khả năng mở rộng vô song cho Ethereum. Chúng ta đã có thể thấy hầu hết các L2 lớn cam kết bắt đầu sử dụng không gian khối dữ liệu mới ngay khi bản nâng cấp Dencun diễn ra.

Tóm lại, EIP-4844 không chỉ là một bản nâng cấp. Đó là một khoảnh khắc then chốt trong hành trình của Ethereum hướng tới việc trở thành một Chuỗi khối có khả năng mở rộng, hiệu quả và thân thiện với người dùng hơn. Bằng cách giảm chi phí và tăng hiệu quả của các giải pháp lớp 2, Ethereum đã sẵn sàng củng cố vị trí của mình như là nền tảng hàng đầu cho các ứng dụng phi tập trung.