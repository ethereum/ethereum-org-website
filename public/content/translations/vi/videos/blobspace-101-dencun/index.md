---
title: "Bản nâng cấp Ethereum tiếp theo: kiến thức cơ bản về không gian khối dữ liệu"
description: "Domothy giải thích về không gian khối dữ liệu, lớp tính khả dụng của dữ liệu mới được giới thiệu bởi bản nâng cấp Dencun của Ethereum, bao gồm cách các giao dịch khối dữ liệu hoạt động, tại sao chúng quan trọng đối với việc mở rộng quy mô Ethereum và điều gì tiếp theo cho tính khả dụng của dữ liệu."
lang: vi
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "scaling"
  - "blobs"
  - "dencun"
  - "upgrades"
format: interview
author: Bankless
breadcrumb: "Không gian khối dữ liệu 101"
---

Cuộc phỏng vấn này đề cập đến tài nguyên không gian khối dữ liệu của Ethereum, được giới thiệu cùng với [EIP-4844 (Proto-Danksharding)](https://www.eip4844.com/). Nhà nghiên cứu Ethereum Domothy tham gia cùng David Hoffman và Ryan Sean Adams trên podcast Bankless để giải thích lịch sử của lộ trình tập trung vào bản cuộn (rollup), cơ chế kỹ thuật của các khối dữ liệu và ý nghĩa kinh tế của việc tách biệt không gian khối khỏi không gian khối dữ liệu.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=dFjyUY3e53Q) do Bankless xuất bản. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu về không gian khối dữ liệu (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** Chào mừng đến với Bankless, nơi chúng ta khám phá Biên giới của tiền tệ internet và tài chính internet. Đây là cách để bắt đầu, cách để trở nên tốt hơn, cách để đón đầu cơ hội. Tôi đang ở đây cùng với David Hoffman, và chúng tôi ở đây để giúp bạn trở nên "bankless" (không phụ thuộc vào ngân hàng) hơn. Bạn biết chúng ta thường nói các Chuỗi khối bán các khối như thế nào không? Chà, sắp tới Ethereum sẽ bán nhiều thứ hơn là chỉ các khối — nó cũng sẽ bán cả các khối dữ liệu nữa.

**David Hoffman:** Đúng vậy, các khối dữ liệu. Chúng ta chỉ còn vài tháng nữa là đến đợt phát hành Ethereum lớn nhất kể từ The Merge, và tôi nghĩ chưa ai vạch ra đầy đủ những tác động của điều này, nhưng nó sẽ rất lớn. Ethereum đang có một sản phẩm mới để bán. Nó được gọi là không gian khối dữ liệu, và đó là phần bổ sung cho không gian khối. Chi phí của các giao dịch trên các lớp 2 (l2) sắp giảm xuống gần bằng không. Tính kinh tế của Gas ETH và việc đốt sắp thay đổi mãi mãi. Chúng tôi gọi bản nâng cấp này là bản nâng cấp không gian khối dữ liệu, EIP-4844, Proto-Danksharding. Chúng tôi muốn đề cập đến mọi thứ mà bạn cần biết về không gian khối dữ liệu.

**Ryan Sean Adams:** Một vài điểm chính ở đây. Số một, chúng ta sẽ đi qua không gian khối dữ liệu là gì. Số hai, chúng ta sẽ đi qua lịch sử về cách chúng ta thực sự đạt được điều này — lộ trình tập trung vào bản cuộn này. Số ba, chúng ta sẽ đi qua khía cạnh kinh tế. Điều này có ý nghĩa gì đối với nền kinh tế của Ethereum, đối với sự tích lũy giá trị của ETH, đối với tài sản ETH? David, tại sao tập này lại có ý nghĩa với bạn?

**David Hoffman:** Tôi nghĩ nếu có bất kỳ lĩnh vực trò chuyện nào mà bạn và tôi thực sự yêu thích, thì đó là sự giao thoa giữa mật mã học và kinh tế học — giống như những con số và các biểu hiện kinh tế. Tôi thích chơi đùa với các Giao thức này.

**Ryan Sean Adams:** Đúng vậy, đó là ngôn ngữ tình yêu của chúng ta.

**David Hoffman:** Chúng ta đã nói về EIP-4844, chúng ta đã nói về Proto-Danksharding. Chúng là cùng một thứ. Chúng ta đã định nghĩa nó một vài lần ở một số khía cạnh khác nhau. Nhưng chúng ta chưa bao giờ thực sự đi sâu vào chi tiết và tìm ra câu trả lời cho khía cạnh kinh tế. Vì vậy, về mặt kỹ thuật, chúng ta đã mở rộng quy mô Tính khả dụng của dữ liệu ở cấp độ kỹ thuật — đó là một sự cải tiến Giao thức. Nhưng điều đó kết nối như thế nào với khía cạnh thị trường của Ethereum? Một thị trường duy nhất hiện đang bị chia nhỏ thành hai: không gian khối và không gian khối dữ liệu hiện là hai thị trường độc lập khác nhau được chứa bên trong một khối Ethereum.

Điều đó có ý nghĩa gì đối với ether? Điều đó có ý nghĩa gì đối với các thị trường phát sinh xung quanh những thứ này? Sự cân bằng cung và cầu của mỗi bên tác động qua lại lẫn nhau như thế nào? Điều này mang lại lợi ích gì cho khả năng mở rộng quy mô của lớp 2 (l2)? Điều này mang lại lợi ích gì cho các trường hợp sử dụng kinh tế trên các lớp 2 (l2)? Chúng ta sẽ bắt đầu với những điều cơ bản, nhưng sau đó chúng ta sẽ đi sâu vào khía cạnh kinh tế của cuộc trò chuyện này.

Hãy cùng chào đón khách mời của chúng ta, Dom, hay còn được biết đến với tên Domothy. Anh ấy là một nhà nghiên cứu tại Tổ chức Ethereum, làm việc trong lĩnh vực nghiên cứu và phát triển các bản nâng cấp Ethereum quan trọng sắp tới, bao gồm EIP-4844 (chủ đề của ngày hôm nay), danksharding toàn phần và đốt MEV.

#### Lịch sử của lộ trình tập trung vào bản cuộn (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** Vậy Dom, để hiểu đầy đủ về cách chúng ta đạt được không gian khối dữ liệu, tôi nghĩ thật đáng để nhìn lại quá khứ nhằm hiểu toàn bộ lộ trình của Ethereum, bởi vì nó đã đi đến một kết luận rất hợp lý về các khối dữ liệu và không gian khối dữ liệu. Bạn có thể đưa chúng tôi quay lại quá khứ không? Bởi vì đã có lúc, lộ trình tập trung vào bản cuộn của Ethereum không hề tồn tại. Chúng ta đã có một thứ gọi là phân mảnh thực thi (execution sharding), thứ mà chúng ta chưa bao giờ thực sự có được. Điểm nào trong lịch sử lộ trình của Ethereum là phù hợp để thực sự hiểu toàn bộ bối cảnh của không gian khối dữ liệu?

**Domothy:** Chắc chắn rồi. Ngay cả trước khi Ethereum ra mắt, đã có những suy nghĩ về cách mở rộng quy mô của nó vì mọi người đều biết ngay từ lúc đó rằng một Chuỗi khối duy nhất với mọi nút chạy mọi thứ sẽ là không đủ. Vì vậy, ban đầu đã có một loạt các ý tưởng khác nhau về phân mảnh. Nỗ lực đầu tiên để thực sự xác định rõ nó là phân mảnh với thực thi, nơi bạn cơ bản có, giả sử, 64 Chuỗi độc lập khác nhau và chúng cố gắng giao tiếp chéo với nhau. Hóa ra điều đó rất khó thực hiện — có rất nhiều sự phức tạp liên quan.

Nó được chia thành các giai đoạn khác nhau. Đầu tiên, chúng ta sẽ ra mắt một Chuỗi Beacon, sau đó tìm cách thực sự hợp nhất nó với lớp thực thi hiện tại. Sau đó, chúng ta sẽ thực hiện Giai đoạn Một, chỉ là phân mảnh dữ liệu — tức là không có thực thi, chỉ là các Chuỗi khối nhỏ hơn chứa dữ liệu. Và sau đó tìm cách thực hiện phân mảnh thực thi. Đó là một quá trình vừa làm vừa tìm hiểu, nhưng một cách an toàn để chúng ta không làm điều gì đó mà sau này phải hối tiếc và phá vỡ toàn bộ Chuỗi khối, bởi vì có quá nhiều hoạt động kinh tế trên đó.

**David Hoffman:** Để cung cấp chi tiết về phân mảnh thực thi — đó là việc xáo trộn các trình xác minh một cách ngẫu nhiên qua các phân mảnh riêng biệt của Chuỗi khối, với mỗi phân mảnh về cơ bản là một Chuỗi khối mini của riêng nó chạy song song với Chuỗi Beacon. Nghe có vẻ hơi giống với những gì chúng ta có ngày nay với các bản cuộn, nhưng sự khác biệt ở đây là các phân mảnh của Ethereum thực sự là một phần của Giao thức lớp 1 (l1). Giao thức lớp 1 (l1) xác định các phân mảnh là gì, trong khi các bản cuộn thì tách biệt. Ban đầu, dự kiến sẽ có 64 phân mảnh này được vận hành, quản lý và sản xuất bởi Giao thức lớp 1 (l1) của Ethereum. Tôi diễn đạt điều này có đúng không?

**Domothy:** Chính xác. Việc đạt được khả năng mở rộng quy mô thực thi theo cách này gián tiếp hơn với các bản cuộn và phân mảnh dữ liệu, nhưng nó giống như một mã gian lận từ góc độ nghiên cứu vì lớp 1 (l1) của Ethereum có ít việc phải làm và lo lắng hơn nhiều. Phần còn lại được giảm tải cho các bản cuộn, theo quan điểm của tôi là tốt hơn so với kế hoạch ban đầu. Trong kế hoạch ban đầu về các phân mảnh do trạng thái tài trợ, mọi thứ đều giống nhau — cùng một Chuỗi khối, cùng một EVM, cùng những sự đánh đổi. Bây giờ thay vì thế, bạn có thể có các bản cuộn cạnh tranh với nhau để có được môi trường và sự đánh đổi tốt nhất. Nếu bạn thích tốc độ siêu nhanh hơn là bảo mật siêu cao, bạn có thể chuyển sang một bản cuộn khác. Bạn có các lựa chọn, sự đổi mới và sự cạnh tranh ở lớp 2 (l2).

**Ryan Sean Adams:** Hãy đề cập đến thế giới mô-đun mà Ethereum đang ở trong đó. Có lớp đồng thuận, lớp tính khả dụng của dữ liệu và lớp thực thi. Lớp đồng thuận xác định điều gì là đúng — thứ tự của các khối. Lớp tính khả dụng của dữ liệu là những gì đã xảy ra — lớp dữ liệu. Lớp bên ngoài là lớp thực thi, nơi hoạt động đang diễn ra ngay lúc này. Ban đầu, Ethereum kết hợp cả ba lớp đó trên Chuỗi chính.

Bây giờ những gì chúng ta đang làm với lộ trình tập trung vào bản cuộn là chúng ta đang phân mảnh việc thực thi từ Chuỗi chính vào các bản cuộn này. Nhưng để các bản cuộn được bảo mật hoàn toàn với những đảm bảo tương tự như Mạng chính Ethereum, chúng phải đăng dữ liệu của mình trở lại Mạng chính Ethereum. Khi chúng làm điều đó, hiện tại nó tiêu tốn không gian khối và tốn rất nhiều tiền. Lý do cho Proto-Danksharding (EIP-4844) là tính kinh tế thay đổi theo hướng rất có lợi cho bản cuộn. Dom, bạn có muốn bổ sung gì ở đó không?

**Domothy:** Tôi chỉ muốn nói thêm rằng hiện tại Tính khả dụng của dữ liệu mang tính ngầm định hơn và nó tóm gọn lại ở việc xác minh không cần tin cậy. Chúng tôi muốn mọi người có thể tự mình xác minh Chuỗi và không phải có một bên thứ ba kiểu "tin tôi đi người anh em" ở giữa. Đó là nút thắt cổ chai. Bạn cần có khả năng xác minh mọi thứ, điều đó ngầm có nghĩa là bạn cần có sẵn dữ liệu để kiểm tra các quá trình chuyển đổi trạng thái.

Quay lại cuối năm 2020, mọi người nhận ra các bản cuộn đang bắt đầu trở nên cực kỳ tốt và phổ biến, và chúng đã giải quyết vấn đề mở rộng quy mô thực thi của chúng ta mà không cần đến phân mảnh thực thi. Bằng cách đi theo một hệ sinh thái các bản cuộn thay vì cố gắng trở thành một người theo chủ nghĩa tối đa hóa lớp 1 (l1), các bản cuộn có thể đưa ra những đánh đổi của riêng chúng, tạo ra các Chuỗi khối của riêng chúng và thử nghiệm những điều mới mẻ. Ethereum xử lý việc xác minh — đó là cốt lõi của một Chuỗi khối.

#### Không gian khối dữ liệu là gì? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Bây giờ hãy đưa chúng tôi đến trạng thái hiện tại, Dom. Chúng ta có nhiều bản cuộn sử dụng không gian khối lớp 1 (l1) của Ethereum, trả phí Gas cao để đăng dữ liệu trạng thái của chúng để bất kỳ ai cũng có thể xác minh nó. Vậy, Dom, khối dữ liệu là gì?

**Domothy:** Một khối dữ liệu chỉ là một mẩu dữ liệu — cụ thể về cơ bản là một mảng số thô, lớn. Một khối dữ liệu trên Ethereum hiện tại có kích thước cố định khoảng 128 kilobyte. Nó chỉ là dữ liệu thô được đính kèm vào một giao dịch, được gọi là giao dịch mang khối dữ liệu, mà bạn gửi lên lớp 1 (l1).

Ràng buộc thiết kế quan trọng ở đây là EVM (Máy ảo Ethereum) lớp 1 (l1) của Ethereum — công cụ thực thi — không có quyền truy cập vào dữ liệu bên trong khối dữ liệu. Trong các khối tiêu chuẩn, dữ liệu như dữ liệu lệnh gọi liên quan đến việc hệ thống xem xét các hàm nào đang được gọi, số tiền nào đang được di chuyển và xác minh các thay đổi trạng thái. EVM truy cập tất cả những thứ đó. Nhưng nếu việc mở rộng quy mô lớp 2 (l2) liên quan đến việc đăng dữ liệu của các bản cuộn một cách chính xác để một trình xác minh *ngoài chuỗi* có thể thực hiện tính toán, thì *lớp 1 (l1)* của Ethereum về mặt chức năng không cần phải thực sự xem xét và thực thi nó.

Về cơ bản, nó là một gói hàng được niêm phong. Lớp 1 (l1) nhận nó, đảm bảo rằng mọi người đều có quyền truy cập để xem bên trong nếu họ muốn tải nó xuống một cách vật lý, nhưng bản thân lớp thực thi xử lý chính của Ethereum không chủ động đọc và tính toán dữ liệu. Bởi vì nó không đọc và tính toán dữ liệu trong EVM, nó yêu cầu ít tài nguyên xử lý hơn rất nhiều từ các nút. Đó là lý do tại sao nó rẻ hơn rất nhiều.

**David Hoffman:** Vậy để tóm tắt lại: Không gian khối quan tâm đến tính toán, thực thi trạng thái và lưu trữ logic. Không gian khối dữ liệu chỉ quan tâm đến Tính khả dụng của dữ liệu. Lớp 1 (l1) không quan tâm ai đăng gì trong các khối dữ liệu này; tất cả những gì nó quan tâm là nhận các khối dữ liệu này và giữ chúng trong khoảng thời gian khả dụng được chỉ định để các bên quan tâm (như các trình tự tự động của bản cuộn và người dùng) có thể lấy chúng, xác minh rằng dữ liệu không bị giữ lại một cách ác ý và tiếp tục.

**Domothy:** Chính xác. Và một thuộc tính quan trọng khác của các khối dữ liệu là chúng tự động bị cắt tỉa sau một khoảng thời gian — hiện tại là khoảng 18 ngày. Lý do chúng bị cắt tỉa là để đảm bảo việc xác minh không cần tin cậy, các cá nhân chỉ cần dữ liệu đó có sẵn để chứng minh tính chung cuộc và sự đồng thuận về trạng thái bản cuộn trong một khoảng thời gian thử thách cụ thể. Bạn không cần một nghìn nút giữ các khối dữ liệu từ hai năm trước để xác minh giao dịch của bạn ngày hôm nay. Khi khoảng thời gian đó hết hạn, bạn sẽ không lấy được nó từ một nút Ethereum nữa; bạn lấy nó từ các nhà cung cấp lịch sử, các trình lập chỉ mục hoặc các trình khám phá khối gốc của bản cuộn. Lưu trữ trên Ethereum là cực kỳ đắt đỏ mãi mãi. Việc loại bỏ yêu cầu lưu trữ cho phép chúng ta mở rộng thông lượng khối dữ liệu mà không phá hủy ổ cứng của những người vận hành nút.

#### Kinh tế học và danksharding toàn phần (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** Chúng ta biết rằng 4844 là bước một — thứ mà chúng ta gọi là Proto-Danksharding. Nó thiết lập định dạng khối dữ liệu và thị trường phí bị cô lập, nhưng số lượng khối dữ liệu mục tiêu thực tế trên mỗi khối ban đầu bị hạn chế để khá an toàn. Điều này trông như thế nào khi mở rộng quy mô hướng tới danksharding toàn phần?

**Domothy:** Hiện tại, theo EIP-4844, về cơ bản chúng tôi đang nhắm mục tiêu 3 khối dữ liệu trên mỗi khối, với mức tối đa cứng là 6. Điều đó giới hạn thông lượng dữ liệu tối đa tuyệt đối trên lớp 1 (l1) ngay sau khi nâng cấp để ngăn chặn bất kỳ sự căng thẳng nào của mạng lưới trong khi chúng tôi xem xét cách tính năng này hoạt động trong quá trình sản xuất liên tục.

danksharding toàn phần mở rộng quy mô điều này một cách đáng kể. Nó hướng tới lấy mẫu tính khả dụng của dữ liệu (DAS). Với DAS, các nút đầy đủ không còn cần phải tải xuống riêng lẻ từng khối dữ liệu để xác minh dữ liệu đã được cung cấp. Chúng có thể lấy mẫu thống kê các phần nhỏ của dữ liệu khối dữ liệu. Nếu mẫu thống kê chứng minh là có sẵn, xác suất toán học mà một kẻ tấn công đang che giấu dữ liệu sẽ tiến gần đến mức không (giống như cơ hội một phần tỷ). Một khi bạn không yêu cầu tải xuống toàn bộ khối dữ liệu, bạn có thể mở rộng dung lượng khối dữ liệu lên hai con số hoặc cao hơn trên mỗi khối.

**David Hoffman:** Điều này tạo ra một thị trường phí bị chia nhỏ bên trong một khối Ethereum. Hiện tại, một bản cuộn lớp 2 (l2) phải cạnh tranh với các nhà giao dịch Uniswap và OpenSea cho cùng một tài nguyên không gian khối trong một khối Ethereum. Nhưng đây là những mô hình sử dụng hoàn toàn khác nhau. Nếu có một đợt đúc NFT diễn ra điên cuồng trên L1 của Ethereum, Gas tăng vọt và các bản cuộn lớp 2 (l2) đang cố gắng đăng trạng thái dữ liệu của chúng đột nhiên phải đối mặt với chi phí kinh doanh tăng vọt chỉ để thực hiện các nhiệm vụ bảo mật cần thiết của chúng.

Với thị trường phí hai chiều — về cơ bản là một con đường riêng biệt bị cô lập để các khối dữ liệu di chuyển — đợt đúc NFT đó trên L1 của Ethereum làm tăng vọt Gas thực thi theo cách tương tự, nhưng nó không sử dụng không gian khối dữ liệu nào. Các khối dữ liệu vẫn hoàn toàn không bị tắc nghẽn và thực tế chỉ tốn vài xu. Một đợt đúc NFT trị giá hàng triệu đô la trên Chuỗi chính không có tác động nào đến chi phí kinh tế của việc hoàn tất các giao dịch trên Arbitrum hoặc Optimism.

**Domothy:** Đúng vậy, chúng hoàn toàn bị ngắt kết nối. Và điều ngược lại cũng đúng. Nếu thông lượng lớp 2 (l2) tăng vọt mạnh mẽ và hàng nghìn bản cuộn hoạt động và làm tắc nghẽn không gian khối dữ liệu, sự gia tăng đột biến của phí cơ sở khối dữ liệu sẽ không ảnh hưởng đến chi phí thực hiện một giao dịch đơn giản trên Mạng chính Ethereum. Phí cơ sở khối dữ liệu hoạt động chính xác giống như phí cơ sở EIP-1559, nhưng trên khía cạnh riêng của nó. Và đối với câu hỏi trước đó của bạn về việc đốt — đúng vậy, phí blob tạo ra ETH bị đốt để trả cho việc đưa dữ liệu vào không gian khối dữ liệu, hoàn toàn tách biệt với việc đốt phí cơ sở của không gian khối.

#### Tương lai của khả năng mở rộng quy mô Ethereum (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** Tôi muốn đi đến những gì xảy ra cụ thể khi phát hành 4844. Ban đầu, rõ ràng có một kỳ vọng rất cao rằng khi dung lượng khối dữ liệu đột ngột được mở khóa, sẽ không có đủ nhu cầu bản cuộn tại chính xác phần triệu giây đó để lấp đầy nó hoàn toàn. Không gian khối dữ liệu sẽ rẻ đến mức gần như nực cười khi ra mắt. Nhưng chẳng phải có quy luật về nhu cầu cảm ứng sao? Nếu bạn có các tài nguyên cực kỳ rẻ, các ứng dụng tiêu thụ những tài nguyên đó sẽ bùng nổ về khối lượng.

**Domothy:** Quá trình chuyển đổi ban đầu về cơ bản sẽ làm giảm phí lớp 2 (l2) xuống gần bằng không, bởi vì tất cả các bản cuộn hiện tại đang cạnh tranh cho không gian khối đắt đỏ sẽ chuyển đổi liền mạch sang một nhóm không gian khối dữ liệu khổng lồ gần như trống rỗng. Đó là một sự mở rộng biên lợi nhuận khổng lồ và tức thời cho các mạng lưới lớp 2 (l2), điều này sẽ được chuyển trực tiếp cho người dùng ngay khi họ tích hợp logic chứng minh mới của mình với 4844.

Nhưng bạn nói đúng — không gian khối rẻ thúc đẩy thiết kế ứng dụng tốc độ cao. Khi bạn đột nhiên có thể xây dựng một trò chơi trên chuỗi tạo ra hàng triệu và hàng triệu quá trình chuyển đổi trạng thái vi mô với giá chỉ bằng một phần nhỏ của một xu vì chi phí duy trì dữ liệu đã biến mất, các phân loại ứng dụng hoàn toàn mới sẽ trở nên khả thi về mặt kinh tế mà trước đây không thể thực hiện được dưới các ràng buộc tiêu chuẩn.

Điều này thiết lập một động lực kinh tế thú vị trong cách ETH tích lũy giá trị. Nếu các giao dịch lớp 2 (l2) bùng nổ gấp 10 lần hoặc 100 lần do các ứng dụng mới có thể chạy trên Tính khả dụng của dữ liệu gần như miễn phí, khối lượng tổng hợp cuối cùng sẽ bắt đầu cạnh tranh cho không gian khối dữ liệu. Sau đó, phí cơ sở khối dữ liệu EIP-1559 sẽ tăng lên một cách tự nhiên cho đến khi thị trường đạt đến trạng thái cân bằng, tạo ra một vòng lặp liên tục kép của việc đốt ETH trong khi mở rộng tiện ích lớp 2 (l2).

**David Hoffman:** Nó đại diện cho sự thành công và trưởng thành của lộ trình tập trung vào bản cuộn. Ethereum, môi trường thực thi nguyên khối, đã chạm phải một bức tường nơi việc mở rộng thông lượng một cách tuyến tính đã phá hủy sứ mệnh về sự phi tập trung của nó. Các bản cuộn đã cung cấp một cách để vượt qua nút thắt cổ chai thực thi nhưng vẫn bị trói buộc vào nút thắt cổ chai dữ liệu lớp 1 (l1). Không gian khối dữ liệu mở khóa nút thắt cổ chai dữ liệu theo cùng cách mà các bản cuộn đã mở khóa nút thắt cổ chai thực thi. Khi bản nâng cấp này được phát hành, Ethereum sẽ chuyển đổi hoàn toàn từ việc xử lý các giao dịch đơn lẻ sang xử lý các mạng lưới thực thi đã được xác minh.

**Ryan Sean Adams:** Để tóm tắt lại dòng thời gian, EIP-4844 sẽ đến một cách lạc quan vào cuối năm nay hoặc đầu năm sau, và danksharding toàn phần sẽ theo sau trong chu kỳ phát triển tiếp theo. Nó thực sự là giàn giáo cơ sở hạ tầng cần thiết để Ethereum tiếp cận toàn cầu, và chúng ta đang ở rất gần với việc nó hoạt động trong thế giới thực. Dom, cảm ơn bạn đã hướng dẫn chúng tôi qua đợt mở khóa khổng lồ này cho mạng lưới.

**Domothy:** Cảm ơn vì đã mời tôi.