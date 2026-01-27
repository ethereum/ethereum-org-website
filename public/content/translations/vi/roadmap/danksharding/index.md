---
title: Danksharding
description: "Tìm hiểu về Proto-Danksharding và Danksharding - hai bản nâng cấp tuần tự để mở rộng quy mô Ethereum."
lang: vi
summaryPoints:
  - Phân đoạn thế hệ mới (Danksharding) là nâng cấp nhiều giai đoạn nhằm cải thiện khả năng mở rộng và dung tích.
  - Giai đoạn đầu tiên gọi là tiền phân đoạn thế hệ mới (Proto-Danksharding), thêm dữ liệu Blob vào khối
  - Dữ liệu Blob là cách rẻ hơn cho Rollups để truyền dữ liệu cho Ethereum và những chi phí đó sẽ được người dùng chi trả với dạng phí giao dịch.
  - Sau này, phân đoạn toàn phần sẽ được phân tán trách nhiệm xác thực Blob qua phân nhóm nút xác thực, từ đó giúp mở rộng Ethereum lên đên 100,000 giao dịch một giây.
---

# Phân đoạn thế hệ mới (Danksharding) {#danksharding}

**Phân đoạn thế hệ mới (Danksharding)** là cách Ethereum trở thành một chuỗi khối có khả năng mở rộng thực sự, nhưng cần có một vài nâng cấp giao thức để đạt được điều đó. **Tiền phân đoạn thế hệ mới (Proto-Danksharding)** là một bước trung gian trên con đường đó. Cả hai đều nhằm mục đích làm cho các giao dịch trên Lớp 2 rẻ nhất có thể cho người dùng và sẽ mở rộng quy mô của Ethereum lên >100.000 giao dịch mỗi giây.

## Tiền phân đoạn thế hệ mới (Proto-Danksharding) là gì? {#what-is-protodanksharding}

Tiền phân đoạn thế hệ mới (Proto-Danksharding), còn được gọi là [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), là một cách để các [rollup](/layer-2/#rollups) thêm dữ liệu rẻ hơn vào các khối. Cái tên (Proto-Danksharding) đến từ người đề xuất ý tưởng: Protolambda và Dankrad Feist. Trong lịch sử, các rollup bị giới hạn về mức độ có thể làm cho các giao dịch của người dùng rẻ hơn bởi thực tế là chúng đăng các giao dịch của mình trong `CALLDATA`.

Việc này rất đắt đỏ vì quá trình này được thực hiện bởi tất cả nút xác thực Ethereum và trực tiếp nằm trên chuỗi vĩnh viễn, mặc dù Rollups chỉ cần dữ liệu một cách tạm thời. Tiền phân đoạn thế hệ mới giới thiệu dữ liệu Blob có thể gửi và nối với khối. Những dữ liệu Blob này không thể truy cập từ máy chủ ảo Ethereum và được tự động xóa đi sau một quãng thời gian (Đặt khoảng 4096 chu kỳ ở thời điểm bài viết này, khoảng 18 ngày). Điều này có nghĩa rằng Rollups có thể gửi dữ liệu một cách rẻ hơn và giúp người dùng cuối tiết kiệm nhờ phí giao dịch rẻ hơn.

<ExpandableCard title="Tại sao các blob giúp rollup rẻ hơn?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollups là công nghệ giúp mở rộng Ethereum bằng cách gộp cách giao dịch ngoài chuỗi và ghi lại kết quả lên Ethereum. Một Rollups cần hai thành phần: dữ liệu và kiểm tra thực thi. Dữ liệu là tất cả giao dịch được xử lí bằng cách gộp trạng thái sau lại và ghi lên Ethereum. Kiểm tra thực thi là thực thi lại những giao dịch nó bằng một bên trung thực (người chứng minh) để đảm bảo rằng trạng thái sau thay đổi là đúng. Để kiểm tra thực thi, dữ liệu phải tồn tại đủ lâu để mọi người có thể tải và kiểm tra. Điều này có nghĩa những hành vi gian lận bởi người vận hành Rollups có thể bị phát hiện và thử thách bởi người chứng minh. Tuy nhiên, nó không có nghĩa rằng dữ liệu cần tồn tại mãi mãi.
</ExpandableCard>

<ExpandableCard title="Tại sao có thể xóa dữ liệu blob?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollups đăng tải cam kết rằng giao dịch trên chuỗi và dữ liệu thực tế có thể truy cập ở trên dữ liệu Blob. Điều này có nghĩa người chứng minh có thể kiểm tra xem các cam kết này có hợp lệ hay đặt thử thách dữ liệu vì họ nghĩ rằng nó sai. Đây là ở mức độ nút xác thực, dữ liệu Blob được giữ trong Client đồng thuận. Clinet đồng thuận chứng thực rằng họ đã thấy dữ liệu và lan khuyền khắp mạng lưới. Nếu dữ liệu được giữ vĩnh viễn, các client này sẽ đầy bộ nhớ và dẫn đến yêu cầu phần cứng lớn khi vận hành nút. Thay vào đó, dữ liệu sẽ tự động bị cắt bỏ khỏi nút sau mỗi 18 ngày. Các chứng thực từ client đồng thuận cho thấy đã có đủ cơ hội để những người chứng minh xác minh dữ liệu. Đây là dữ liệu thực tế được lưu trữ ngoài chuỗi của người vận hành Rollups, người dùng và những bên khác.
</ExpandableCard>

### Dữ liệu Blob được xác minh như thế nào? {#how-are-blobs-verified}

Rollups đăng các giao dịch mà chúng thực hiện trong các dữ liệu Blob. Chúng cũng đăng một "cam kết" với dữ liệu. Bằng cách khớp một hàm đa thức với dữ liệu. Hàm này có thể được tính giá trị ở nhiều điểm khác nhau. Ví dụ, nếu ta định nghĩa một hàm rất đơn giản `f(x) = 2x-1` thì ta có thể tính hàm này tại `x = 1`, `x = 2`, `x = 3` và thu được kết quả lần lượt là `1, 3, 5`. Người chứng minh áp dụng cùng hàm đó lên dữ liệu và tính toán tại cùng các điểm. Nếu dữ liệu gốc bị thay đổi, hàm sẽ không còn giống hệt nữa, và vì thế các giá trị tính được tại mỗi điểm cũng sẽ khác. Trên thực tế, phần cam kết và bằng chứng phức tạp hơn nhiều vì chúng được gói trong các hàm mật mã.

### KZG là gì? {#what-is-kzg}

KZG là viết tắt của Kate-Zaverucha-Goldberg - tên của ba [tác giả ban đầu](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) của một lược đồ làm giảm một blob dữ liệu xuống thành một ["cam kết" mã hóa](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) nhỏ. Dữ liệu Blob gửi lên bởi Rollups cần được xác minh để đảm bảo Rollups không gian lận. Điều này đòi hỏi một người chứng minh phải chạy lại các giao dịch trong Bloc để kiểm tra rằng cam kết đó là hợp lệ. Điều này tương tự như cách các Client thực thi trên Ethereum lớp 1 kiểm tra tính hợp lệ của giao dịch bằng bằng chứng Merkle. KZG là một dạng bằng chứng khác, dựa trên việc khớp dữ liệu với một phương trình đa thức. Cam kết này được tính bằng cách đánh giá đa thức tại một số điểm dữ liệu bí mật. Người chứng minh sẽ khớp cùng đa thức đó với dữ liệu và tính toán tại cùng những giá trị này để kiểm tra xem kết quả có trùng khớp hay không. Đây là một phương pháp xác minh dữ liệu tương thích với các kỹ thuật không kiến thức (Zero-Knowledge) mà một số Rollups đang sử dụng, và về sau có thể áp dụng cho các phần khác của giao thức Ethereum.

### Nghi thức KZG là gì? {#what-is-a-kzg-ceremony}

Nghi thức KZG là một cách để nhiều người trong cộng đồng Ethereum cùng nhau tạo ra một chuỗi số ngẫu nhiên bí mật, có thể được dùng để xác minh dữ liệu. Điều rất quan trọng là chuỗi số này không được ai biết và cũng không thể bị tái tạo bởi bất kỳ ai. Để đảm bảo điều đó, mỗi người tham gia nghi thức sẽ nhận một chuỗi từ (String) người tham gia trước đó. Sau đó, họ đã tạo một số giá trị ngẫu nhiên mới (ví dụ: bằng cách cho phép trình duyệt đo lường chuyển động chuột của họ) và trộn chúng với giá trị trước đó. Tiếp theo, họ gửi giá trị đó cho người tham gia kế tiếp và xóa nó khỏi máy tính cá nhân của mình. Chỉ cần một người trong nghi thức làm điều này một cách trung thực, giá trị cuối cùng sẽ không thể bị kẻ tấn công biết được.

Nghi thức KZG cho EIP-4844 được mở công khai và hàng chục nghìn người đã tham gia để thêm tính ngẫu nhiên của riêng họ. Tổng cộng có hơn 140.000 lượt đóng góp, khiến nó trở thành nghi thức lớn nhất thế giới thuộc loại này. Để nghi thức này bị tấn công, thì 100% số người tham gia đều phải không trung thực. Từ góc nhìn của người tham gia, nếu họ biết rằng bản thân mình đã trung thực, thì họ không cần phải tin ai khác, bởi vì họ biết mình đã giúp đảm bảo an toàn cho nghi thức (họ đã tự mình đáp ứng yêu cầu chỉ cần 1-trong-N người tham gia là trung thực).

<ExpandableCard title="Số ngẫu nhiên từ nghi thức KZG được dùng để làm gì?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Rollups ghi lên dữ liệu Bloc, chúng cung cấp "cam kết" rằng họ đã ghi lên chuỗi. Cam kết này là kết quả của việc khớp dữ liệu với một đa thức và đánh giá nó tại một số điểm nhất định. Các điểm này được xác định bởi các số ngẫu nhiên được tạo ra trong nghi thức KZG. Những người chứng minh sau đó có thể đánh giá đa thức tại cùng các điểm đó để xác minh dữ liệu – nếu họ thu được cùng một giá trị thì dữ liệu là chính xác.
</ExpandableCard>

<ExpandableCard title="Tại sao dữ liệu ngẫu nhiên KZG phải được giữ bí mật?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Nếu ai đó biết các vị trí ngẫu nhiên được dùng cho cam kết, họ có thể dễ dàng tạo ra một đa thức mới khớp tại chính những điểm đó (tức là một "xung đột"). Điều này có nghĩa là họ có thể thêm hoặc xóa dữ liệu khỏi Blob mà vẫn cung cấp được một bằng chứng hợp lệ. Để ngăn điều đó, thay vì đưa cho người chứng minh những vị trí bí mật thực sự, họ nhận được các vị trí được bọc bằng một “hộp đen” mật mã học sử dụng đường cong Elliptic. Điều này làm xáo trộn các giá trị theo cách mà giá trị gốc không thể bị giải ngược, nhưng nhờ một số phép đại số tinh vi, người chứng minh và người xác thực vẫn có thể đánh giá đa thức tại các điểm mà chúng biểu diễn.
</ExpandableCard>

<Alert variant="warning" className="mb-8">
  Cả phân đoạn thế hệ mới lẫn tiền phân đoạn thế hệ mới đều không theo mô hình phân đoạn truyền thống, vốn nhằm chia chuỗi khối thành nhiều phần. Chuỗi phân đoạn không còn nằm trên lộ trình. Thay vào đó, phân đoạn thế hệ mới sử dụng mẫu dữ liệu phân tán trên Blob để mở rộng Ethereum. Đều này đơn giản hơn rất nhiều để triển khai. Mô hình này đôi khi còn được gọi là phân mảnh dữ liệu (data-sharding).
</Alert>

## Phân đoạn thế hệ mới là gì? {#what-is-danksharding}

Phân đoạn thế hệ mới là quá trình mở rộng Rollups bắt đầu với tiền phân đoạn thế hệ mới. Phân đoạn thế hệ mới sẽ mang lại một lượng không gian khổng lồ trên Ethereum để các Rollups có thể ghi dữ liệu giao dịch đã nén của chúng. Điều này có nghĩa là Ethereum sẽ có thể dễ dàng hỗ trợ hàng trăm nhà vận hành Rollup riêng lẻ và biến hàng triệu giao dịch mỗi giây thành hiện thực.

Cách mà điều này hoạt động là mở rộng số lượng Blob gắn với khối từ 6 Blob trong tiền phân đoạn thế hệ mới lên 64 Blob trong phân đoạn thế hệ mới hoàn chỉnh. Các thay đổi cần thiết còn lại đều là các bản cập nhật về cách mà Client đồng thuận hoạt động, để chúng có thể xử lý được các Blob lớn mới. Một số thay đổi trong số này vốn đã nằm trong lộ trình cho các mục đích khác, độc lập với phân đoạn thế hệ mới. Ví dụ, phân đoạn thế hệ mới yêu cầu phải triển khai cơ chế tách biệt người đề xuất khối và người xây dựng khối. Đây là một bản nâng cấp tách riêng nhiệm vụ xây dựng khối và nhiệm vụ đề xuất khối cho các nút xác thực khác nhau. Tương tự, lấy mẫu dữ liệu khả dụng là bắt buộc đối với phân đoạn thế hệ mới nhưng nó cũng cần thiết cho việc phát triển các Client dung lượng siêu nhẹ, vốn không lưu trữ nhiều dữ liệu lịch sử (gọi là “Stateless Client”).

<ExpandableCard title="Tại sao phân đoạn thế hệ mới yêu cầu tách biệt người đề xuất và người xây dựng?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Phân tách người đề xuất khối nhằm để tránh người vận hành nút xác thực phải tạo một cam kết đắt đỏ và chứng minh tân 32MB dữ liệu Blob. Điều này sẽ tạo quá nhiều gánh nặng cho những người Stake tại nhà và buộc họ phải đầu tư vào phần cứng mạnh hơn, từ đó làm tổn hại đến tính phi tập trung. Thay vào đó, các người xây khối chuyên biệt sẽ chịu trách nhiệm cho công việc tính toán tốn kém này. Sau đó, họ cung cấp các khối mà họ xây dựng cho những người đề xuất khối để phát đi. Người đề xuất khối chỉ đơn giản chọn khối nào mang lại lợi nhuận cao nhất. Bất kỳ ai cũng có thể xác minh Blob một cách nhanh chóng và rẻ, nghĩa là bất kỳ nút xác thực bình thường nào cũng có thể kiểm tra được người xây khối có hành xử trung thực hay không. Điều này cho phép xử lý các Blob lớn mà không phải hy sinh tính phi tập trung. Những người xây khối gian lận có thể bị loại khỏi mạng và bị phạt cắt quỹ (Slashed) – sẽ có những người khác thay thế họ vì việc xây dựng khối là một hoạt động sinh lợi.
</ExpandableCard>

<ExpandableCard title="Tại sao phân đoạn thế hệ mới yêu cầu lấy mẫu khả dụng dữ liệu?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Mẫu dữ liệu khả dụng cần thiết cho các nút xác thực xác minh dữ liệu nhanh và hiệu quả cho dữ liệu Blob. Bằng cách sử dụng lấy mẫu khả dụng dữ liệu, các nút xác thực có thể rất chắc chắn rằng dữ liệu trong Blob đã khả dụng và được cam kết chính xác. Mỗi nút xác thực chỉ cần ngẫu nhiên lấy mẫu một vài điểm dữ liệu và tạo bằng chứng, có nghĩa là không nút xác thực nào phải kiểm tra toàn bộ Blob. Nếu như dữ liệu bị thiếu, sẽ bị phát hiện nhanh chóng và từ chối Blob.
</ExpandableCard>

### Tiến độ hiện tại {#current-progress}

Phân đoạn thế hệ mới toàn phần nhiều năm tới. Trong khi đó, nghi lễ KZG đã kết thúc với hơn 140.000 đóng góp và [EIP](https://eips.ethereum.org/EIPS/eip-4844) cho Tiền phân đoạn thế hệ mới (Proto-Danksharding) đã hoàn thiện. Đề xuất này đã được triển khai đầy đủ trên tất cả các mạng thử nghiệm, và chính thức đi vào hoạt động trên mạng chính cùng với bản nâng cấp mạng Cancun-Deneb (“Dencun”) vào tháng 3 năm 2024.

### Đọc thêm {#further-reading}

- [Ghi chú về Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Ghi chú của Dankrad về Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto và Vitalik thảo luận về Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Nghi lễ KZG](https://ceremony.ethereum.org/)
- [Bài nói chuyện của Carl Beekhuizen tại Devcon về các thiết lập đáng tin cậy](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Tìm hiểu thêm về việc lấy mẫu tính sẵn có của dữ liệu cho các blob](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist nói về các cam kết và bằng chứng KZG](https://youtu.be/8L2C6RDMV9Q)
- [Các cam kết đa thức KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
