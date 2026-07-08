---
title: Danksharding
description: Tìm hiểu về Proto-Danksharding và Danksharding - hai bản nâng cấp tuần tự để mở rộng quy mô Ethereum.
lang: vi
summaryPoints:
  - Danksharding là một bản nâng cấp gồm nhiều giai đoạn để cải thiện khả năng mở rộng và dung lượng của Ethereum.
  - Giai đoạn đầu tiên, Proto-Danksharding, thêm các khối dữ liệu vào các khối
  - Các khối dữ liệu cung cấp một cách rẻ hơn để các bản cuộn đăng dữ liệu lên Ethereum và những chi phí đó có thể được chuyển cho người dùng dưới dạng phí giao dịch thấp hơn.
  - Sau này, Danksharding đầy đủ sẽ phân bổ trách nhiệm xác minh các khối dữ liệu trên các tập hợp con của các nút, tiếp tục mở rộng quy mô Ethereum lên hơn 100.000 giao dịch mỗi giây.
---

**Danksharding** là cách [Ethereum](/) trở thành một Chuỗi khối thực sự có thể mở rộng, nhưng có một số bản nâng cấp giao thức được yêu cầu để đạt được điều đó. **Proto-Danksharding** là một bước trung gian trong quá trình này. Cả hai đều nhằm mục đích làm cho các giao dịch trên lớp 2 (l2) rẻ nhất có thể cho người dùng và sẽ mở rộng quy mô Ethereum lên >100.000 giao dịch mỗi giây.

## Proto-Danksharding là gì? {#what-is-protodanksharding}

Proto-Danksharding, còn được gọi là [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), là một cách để các [bản cuộn](/layer-2/#rollups) thêm dữ liệu rẻ hơn vào các khối. Tên gọi này xuất phát từ hai nhà nghiên cứu đã đề xuất ý tưởng: Protolambda và Dankrad Feist. Trong lịch sử, các bản cuộn đã bị giới hạn về mức độ rẻ mà chúng có thể tạo ra cho các giao dịch của người dùng bởi thực tế là chúng đăng các giao dịch của mình trong `CALLDATA`.

Điều này rất tốn kém vì nó được xử lý bởi tất cả các nút Ethereum và tồn tại trên chuỗi vĩnh viễn, mặc dù các bản cuộn chỉ cần dữ liệu trong một thời gian ngắn. Proto-Danksharding giới thiệu các khối dữ liệu có thể được gửi và đính kèm vào các khối. Dữ liệu trong các khối dữ liệu này không thể truy cập được đối với EVM và tự động bị xóa sau một khoảng thời gian cố định (được đặt thành 4096 kỷ nguyên tại thời điểm viết bài, hoặc khoảng 18 ngày). Điều này có nghĩa là các bản cuộn có thể gửi dữ liệu của chúng rẻ hơn nhiều và chuyển khoản tiết kiệm đó cho người dùng cuối dưới dạng các giao dịch rẻ hơn.

<ExpandableCard title="Tại sao khối dữ liệu giúp bản cuộn rẻ hơn?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Các bản cuộn là một cách để mở rộng quy mô Ethereum bằng cách gom lô các giao dịch ngoài chuỗi và sau đó đăng kết quả lên Ethereum. Một Rollup về cơ bản bao gồm hai phần: dữ liệu và kiểm tra thực thi. Dữ liệu là toàn bộ chuỗi các giao dịch đang được xử lý bởi một Rollup để tạo ra thay đổi trạng thái được đăng lên Ethereum. Kiểm tra thực thi là việc thực thi lại các giao dịch đó bởi một tác nhân trung thực (một "trình chứng minh") để đảm bảo rằng thay đổi trạng thái được đề xuất là chính xác. Để thực hiện kiểm tra thực thi, dữ liệu giao dịch phải có sẵn đủ lâu để bất kỳ ai cũng có thể tải xuống và kiểm tra. Điều này có nghĩa là bất kỳ hành vi không trung thực nào của bộ sắp xếp Rollup đều có thể được xác định và thách thức bởi trình chứng minh. Tuy nhiên, nó không cần phải có sẵn vĩnh viễn.

</ExpandableCard>

<ExpandableCard title="Tại sao việc xóa dữ liệu của khối dữ liệu là ổn?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Các bản cuộn đăng các cam kết đối với dữ liệu giao dịch của chúng trên chuỗi và cũng làm cho dữ liệu thực tế có sẵn trong các khối dữ liệu. Điều này có nghĩa là các trình chứng minh có thể kiểm tra xem các cam kết có hợp lệ hay không hoặc thách thức dữ liệu mà họ cho là sai. Ở cấp độ nút, các khối dữ liệu được giữ trong ứng dụng khách đồng thuận. Các ứng dụng khách đồng thuận chứng thực rằng họ đã thấy dữ liệu và nó đã được truyền bá trên toàn mạng lưới. Nếu dữ liệu được giữ vĩnh viễn, các ứng dụng khách này sẽ phình to và dẫn đến các yêu cầu phần cứng lớn để chạy các nút. Thay vào đó, dữ liệu tự động được cắt tỉa khỏi nút sau mỗi 18 ngày. Các chứng thực của ứng dụng khách đồng thuận chứng minh rằng đã có đủ cơ hội để các trình chứng minh xác minh dữ liệu. Dữ liệu thực tế có thể được lưu trữ ngoài chuỗi bởi các nhà điều hành Rollup, người dùng hoặc những người khác.

</ExpandableCard>

### Dữ liệu khối dữ liệu được xác minh như thế nào? {#how-are-blobs-verified}

Các bản cuộn đăng các giao dịch mà chúng thực thi trong các khối dữ liệu. Chúng cũng đăng một "cam kết" đối với dữ liệu. Chúng làm điều này bằng cách khớp một hàm đa thức với dữ liệu. Hàm này sau đó có thể được đánh giá tại các điểm khác nhau. Ví dụ: nếu chúng ta định nghĩa một hàm cực kỳ đơn giản `f(x) = 2x-1` thì chúng ta có thể đánh giá hàm này cho `x = 1`, `x = 2`, `x = 3` cho ra kết quả `1, 3, 5`. Một trình chứng minh áp dụng cùng một hàm cho dữ liệu và đánh giá nó tại cùng các điểm. Nếu dữ liệu gốc bị thay đổi, hàm sẽ không giống hệt nhau và do đó các giá trị được đánh giá tại mỗi điểm cũng vậy. Trên thực tế, cam kết và bằng chứng phức tạp hơn vì chúng được bọc trong các hàm mật mã.

### KZG là gì? {#what-is-kzg}

KZG là viết tắt của Kate-Zaverucha-Goldberg - tên của ba [tác giả ban đầu](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) của một cơ chế giúp giảm một khối dữ liệu xuống thành một ["cam kết" mật mã](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) nhỏ. Khối dữ liệu được gửi bởi một Rollup phải được xác minh để đảm bảo Rollup không hoạt động sai. Điều này liên quan đến việc một trình chứng minh thực thi lại các giao dịch trong khối dữ liệu để kiểm tra xem cam kết có hợp lệ hay không. Về mặt khái niệm, điều này giống với cách các ứng dụng khách thực thi kiểm tra tính hợp lệ của các giao dịch Ethereum trên lớp 1 (l1) bằng cách sử dụng bằng chứng Merkle. KZG là một bằng chứng thay thế khớp một phương trình đa thức với dữ liệu. Cam kết đánh giá đa thức tại một số điểm dữ liệu bí mật. Một trình chứng minh sẽ khớp cùng một đa thức trên dữ liệu và đánh giá nó tại cùng các giá trị, kiểm tra xem kết quả có giống nhau không. Đây là một cách để xác minh dữ liệu tương thích với các kỹ thuật không tri thức được sử dụng bởi một số bản cuộn và cuối cùng là các phần khác của giao thức Ethereum.

### Buổi lễ KZG là gì? {#what-is-a-kzg-ceremony}

Buổi lễ KZG là một cách để nhiều người từ khắp cộng đồng Ethereum cùng nhau tạo ra một chuỗi số ngẫu nhiên bí mật có thể được sử dụng để xác minh một số dữ liệu. Điều rất quan trọng là chuỗi số này không được biết đến và không thể được tạo lại bởi bất kỳ ai. Để đảm bảo điều này, mỗi người tham gia buổi lễ đã nhận được một chuỗi từ người tham gia trước đó. Sau đó, họ tạo ra một số giá trị ngẫu nhiên mới (ví dụ: bằng cách cho phép trình duyệt của họ đo chuyển động của chuột) và trộn nó với giá trị trước đó. Sau đó, họ gửi giá trị cho người tham gia tiếp theo và tiêu hủy nó khỏi máy cục bộ của họ. Miễn là có một người trong buổi lễ thực hiện điều này một cách trung thực, giá trị cuối cùng sẽ không thể biết được đối với kẻ tấn công.

Buổi lễ KZG EIP-4844 đã được mở cho công chúng và hàng chục nghìn người đã tham gia để thêm entropy (tính ngẫu nhiên) của riêng họ. Tổng cộng đã có hơn 140.000 đóng góp, khiến nó trở thành buổi lễ lớn nhất thế giới thuộc loại này. Để buổi lễ bị phá hoại, 100% những người tham gia đó sẽ phải chủ động không trung thực. Từ góc độ của những người tham gia, nếu họ biết họ trung thực, không cần phải tin tưởng bất kỳ ai khác vì họ biết rằng họ đã bảo mật buổi lễ (họ đã đáp ứng yêu cầu 1-trong-N người tham gia trung thực một cách cá nhân).

<ExpandableCard title="Số ngẫu nhiên từ nghi lễ KZG được sử dụng để làm gì?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Khi một Rollup đăng dữ liệu trong một khối dữ liệu, họ cung cấp một "cam kết" mà họ đăng trên chuỗi. Cam kết này là kết quả của việc đánh giá một đa thức khớp với dữ liệu tại các điểm nhất định. Các điểm này được xác định bởi các số ngẫu nhiên được tạo ra trong buổi lễ KZG. Các trình chứng minh sau đó có thể đánh giá đa thức tại cùng các điểm để xác minh dữ liệu - nếu họ đạt được cùng các giá trị thì dữ liệu là chính xác.

</ExpandableCard>

<ExpandableCard title="Tại sao dữ liệu ngẫu nhiên KZG phải được giữ bí mật?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Nếu ai đó biết các vị trí ngẫu nhiên được sử dụng cho cam kết, họ có thể dễ dàng tạo ra một đa thức mới khớp tại các điểm cụ thể đó (tức là một "sự va chạm"). Điều này có nghĩa là họ có thể thêm hoặc xóa dữ liệu khỏi khối dữ liệu và vẫn cung cấp một bằng chứng hợp lệ. Để ngăn chặn điều này, thay vì cung cấp cho các trình chứng minh các vị trí bí mật thực tế, họ thực sự nhận được các vị trí được bọc trong một "hộp đen" mật mã bằng cách sử dụng các đường cong elliptic. Những đường cong này xáo trộn các giá trị một cách hiệu quả theo cách mà các giá trị gốc không thể được dịch ngược, nhưng với một số đại số thông minh, các trình chứng minh và người xác minh vẫn có thể đánh giá các đa thức tại các điểm mà chúng đại diện.

</ExpandableCard>

<Alert variant="warning">
  Cả Danksharding và Proto-Danksharding đều không tuân theo mô hình "sharding" (phân mảnh) truyền thống nhằm chia Chuỗi khối thành nhiều phần. Các chuỗi phân mảnh không còn là một phần của lộ trình. Thay vào đó, Danksharding sử dụng việc lấy mẫu dữ liệu phân tán trên các khối dữ liệu để mở rộng quy mô Ethereum. Điều này đơn giản hơn nhiều để triển khai. Mô hình này đôi khi được gọi là "data-sharding" (phân mảnh dữ liệu).
</Alert>

## Danksharding là gì? {#what-is-danksharding}

Danksharding là sự hiện thực hóa đầy đủ của việc mở rộng quy mô Rollup bắt đầu với Proto-Danksharding. Danksharding sẽ mang lại không gian khổng lồ trên Ethereum để các bản cuộn đổ dữ liệu giao dịch đã nén của chúng. Điều này có nghĩa là Ethereum sẽ có thể hỗ trợ hàng trăm bản cuộn riêng lẻ một cách dễ dàng và biến hàng triệu giao dịch mỗi giây thành hiện thực.

Cách thức hoạt động của điều này là bằng cách mở rộng các khối dữ liệu được đính kèm vào các khối từ sáu (6) trong Proto-Danksharding, lên 64 trong Danksharding đầy đủ. Phần còn lại của các thay đổi được yêu cầu đều là các bản cập nhật cho cách các ứng dụng khách đồng thuận hoạt động để cho phép chúng xử lý các khối dữ liệu lớn mới. Một số thay đổi này đã có trên lộ trình cho các mục đích khác độc lập với Danksharding. Ví dụ: Danksharding yêu cầu tách biệt người đề xuất và người xây dựng (PBS) phải được triển khai. Đây là một bản nâng cấp tách biệt các nhiệm vụ xây dựng khối và đề xuất khối trên các trình xác thực khác nhau. Tương tự, việc lấy mẫu tính khả dụng của dữ liệu là bắt buộc đối với Danksharding, nhưng nó cũng được yêu cầu cho sự phát triển của các ứng dụng khách rất nhẹ không lưu trữ nhiều dữ liệu lịch sử ("ứng dụng khách phi trạng thái").

<ExpandableCard title="Tại sao danksharding yêu cầu tách biệt người đề xuất và người xây dựng?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Tách biệt người đề xuất và người xây dựng (PBS) là cần thiết để ngăn chặn các trình xác thực cá nhân phải tạo ra các cam kết và bằng chứng đắt tiền cho 32MB dữ liệu khối dữ liệu. Điều này sẽ gây quá nhiều áp lực cho những người tham gia đặt cược tại nhà và yêu cầu họ đầu tư vào phần cứng mạnh mẽ hơn, điều này làm tổn hại đến sự phi tập trung. Thay vào đó, các nhà xây dựng khối chuyên dụng chịu trách nhiệm cho công việc tính toán đắt tiền này. Sau đó, họ cung cấp các khối của mình cho những người đề xuất khối để phát sóng. Người đề xuất khối chỉ cần chọn khối có lợi nhuận cao nhất. Bất kỳ ai cũng có thể xác minh các khối dữ liệu một cách rẻ và nhanh chóng, có nghĩa là bất kỳ trình xác thực bình thường nào cũng có thể kiểm tra xem các nhà xây dựng khối có đang hoạt động trung thực hay không. Điều này cho phép các khối dữ liệu lớn được xử lý mà không hy sinh sự phi tập trung. Các nhà xây dựng khối hoạt động sai có thể đơn giản bị loại khỏi mạng lưới và bị phạt cắt giảm - những người khác sẽ bước vào vị trí của họ vì xây dựng khối là một hoạt động có lợi nhuận.

</ExpandableCard>

<ExpandableCard title="Tại sao danksharding yêu cầu lấy mẫu tính khả dụng của dữ liệu?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Việc lấy mẫu tính khả dụng của dữ liệu là cần thiết để các trình xác thực xác minh dữ liệu khối dữ liệu một cách nhanh chóng và hiệu quả. Bằng cách sử dụng việc lấy mẫu tính khả dụng của dữ liệu, các trình xác thực có thể rất chắc chắn rằng dữ liệu khối dữ liệu đã có sẵn và được cam kết chính xác. Mỗi trình xác thực có thể lấy mẫu ngẫu nhiên chỉ một vài điểm dữ liệu và tạo ra một bằng chứng, có nghĩa là không có trình xác thực nào phải kiểm tra toàn bộ khối dữ liệu. Nếu thiếu bất kỳ dữ liệu nào, nó sẽ được xác định nhanh chóng và khối dữ liệu sẽ bị từ chối.

</ExpandableCard>

### Tiến độ hiện tại {#current-progress}

Danksharding đầy đủ còn vài năm nữa mới hoàn thành. Trong thời gian chờ đợi, buổi lễ KZG đã kết thúc với hơn 140.000 đóng góp và [EIP](https://eips.ethereum.org/EIPS/eip-4844) cho Proto-Danksharding đã trưởng thành. Đề xuất này đã được triển khai đầy đủ trên tất cả các mạng thử nghiệm và đã đi vào hoạt động trên Mạng chính với bản nâng cấp mạng Cancun-Deneb ("Dencun") vào tháng 3 năm 2024.

### Đọc thêm {#further-reading}

- [Ghi chú về Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Ghi chú của Dankrad về Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto và Vitalik thảo luận về Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Buổi lễ KZG](https://ceremony.ethereum.org/)
- [Bài nói chuyện tại Devcon của Carl Beekhuizen về các thiết lập đáng tin cậy](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Thêm về việc lấy mẫu tính khả dụng của dữ liệu cho các khối dữ liệu](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist nói về các cam kết và bằng chứng KZG](https://youtu.be/8L2C6RDMV9Q)
- [Các cam kết đa thức KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)