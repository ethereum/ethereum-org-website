---
title: "Bằng chứng không kiến thức được giải thích ở 5 cấp độ khó"
description: "Một nhà khoa học máy tính giải thích bằng chứng không kiến thức ở năm cấp độ phức tạp khác nhau, từ một đứa trẻ đến một chuyên gia."
lang: vi
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "privacy-and-security"
  - "zero-knowledge-proofs"
  - "cryptography"
format: explainer
author: WIRED
breadcrumb: "Bằng chứng không kiến thức"
---

Nhà khoa học máy tính **Amit Sahai**, giáo sư tại Trường Kỹ thuật Samueli thuộc UCLA, giải thích các bằng chứng không kiến thức ở năm cấp độ phức tạp, từ một đứa trẻ đến một chuyên gia, trong tác phẩm này của **WIRED**. Khái niệm này được minh họa thông qua các phép loại suy vật lý và được thảo luận với chiều sâu kỹ thuật tăng dần, giúp mọi người đều có thể tiếp cận một trong những khái niệm quan trọng nhất của mật mã học.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=fOGdb1CTu5c) do WIRED xuất bản. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:00) {#introduction-000}

**Amit Sahai:** Xin chào, tên tôi là Amit Sahai, và tôi là giáo sư khoa học máy tính tại Trường Kỹ thuật Samueli thuộc UCLA. Hôm nay, tôi được yêu cầu giải thích các bằng chứng không kiến thức ở năm cấp độ phức tạp tăng dần.

Bằng chứng không kiến thức là một cách để một trình chứng minh thuyết phục một trình xác minh rằng một tuyên bố nào đó là đúng, nhưng không tiết lộ thêm bất kỳ thông tin nào ngoài việc tuyên bố đó là đúng. Các bằng chứng không kiến thức đang được sử dụng trong các chuỗi khối và tiền mã hóa. Các nhà mật mã học rất hào hứng với không tri thức vì những đặc tính toán học tuyệt vời của nó, nhưng cũng vì khả năng ứng dụng đáng kinh ngạc của nó vào rất nhiều kịch bản khác nhau.

#### Cấp độ 1: trẻ em (0:41) {#level-1-child-041}

**Amit Sahai:** Môn học yêu thích của cháu là gì?

**Chelsea:** Cháu nghĩ là môn toán. Một số bài toán nhỏ thực ra có thể rất lớn và phức tạp. Nó giống như một câu đố vậy.

**Amit Sahai:** Chú cũng yêu môn toán vì lý do tương tự. Hôm nay, chú sẽ kể cho cháu nghe về một thứ gọi là bằng chứng không kiến thức. Trong một bằng chứng không kiến thức, có hai người — một trình chứng minh và một trình xác minh. Chú muốn chứng minh với cháu rằng một điều gì đó là đúng, nhưng điều kỳ lạ là, chú muốn chứng minh với cháu rằng nó đúng mà không cho cháu biết bất kỳ lý do nào. Chú nhớ khi lần đầu tiên nghe về nó, chú đã kiểu, khoan đã, cái gì cơ? Làm sao điều đó có thể xảy ra được?

Vậy cháu thấy gì trong bức ảnh này?

**Chelsea:** Rất nhiều chim cánh cụt.

**Amit Sahai:** Đúng vậy. Ẩn giữa tất cả những con chim cánh cụt này là một con hải âu cổ rụt. Cháu có muốn thử tìm nó không? Cháu có thấy nó ở đâu không? Chú biết nó ở đâu, nhưng chú không muốn nói cho cháu biết. Cháu có tin chú không?

**Chelsea:** Dạ có.

**Amit Sahai:** Nhưng sẽ ra sao nếu chú có thể chứng minh cho cháu thấy rằng chú biết con hải âu cổ rụt ở đâu mà không tiết lộ cho cháu biết vị trí của nó? Để chú cho cháu xem. Chú đã lấy bức ảnh đó và đặt nó đằng sau tấm áp phích này. Sao cháu không thử nhìn qua cái lỗ đó xem?

**Chelsea:** Cháu thấy con hải âu cổ rụt rồi.

**Amit Sahai:** Vậy khi cháu nhìn vào tấm bảng này, chúng ta không biết bức ảnh đã ở đâu, đúng không? Có phải bức ảnh có góc ở đây, trong trường hợp đó con hải âu cổ rụt sẽ nằm hoàn toàn ở bên này? Hay bức ảnh có góc ở đây, trong trường hợp đó con hải âu cổ rụt sẽ ở phía bên kia? Vì vậy, đây là một ví dụ thực sự đơn giản về một bằng chứng không kiến thức. Chú đã thuyết phục được cháu rằng chú biết con hải âu cổ rụt ở đâu, nhưng cháu không biết thêm được điều gì khác.

**Chelsea:** Tại sao chú lại nghiên cứu bằng chứng không kiến thức ạ?

**Amit Sahai:** Khi lần đầu tiên biết về chúng, chú chỉ nghĩ rằng chúng thật tuyệt. Nhưng hóa ra chúng cũng thực sự hữu ích — không chỉ để tìm hải âu cổ rụt. Nếu cháu chỉ gõ mật khẩu của mình và tin tặc xâm nhập vào máy tính, chúng có thể lấy được mật khẩu của cháu. Sẽ ra sao nếu thay vào đó, chúng ta có thể sử dụng một bằng chứng không kiến thức để đăng nhập? Cháu sẽ chỉ cần chứng minh rằng cháu là Chelsea, mà không tiết lộ bất cứ điều gì cho chúng. Nếu cháu có thể làm điều đó, thì sẽ thật tuyệt vời, bởi vì ngay cả khi tin tặc xâm nhập vào máy tính, chúng cũng sẽ không biết được gì — bởi vì ngay cả máy tính cũng không biết được gì.

Vậy Chelsea, theo lời của cháu, bằng chứng không kiến thức là gì?

**Chelsea:** Bằng chứng không kiến thức là bằng chứng cho một tuyên bố. Chú không cho họ thấy tại sao hoặc cái gì. Chú chỉ cho họ thấy một phân đoạn nhỏ, hoặc chỉ làm một trò ảo thuật kỳ lạ nào đó không thực sự là ảo thuật, và họ sẽ bị thuyết phục. Và chú không cho họ thấy tại sao, hay bất cứ điều gì tương tự.

#### Cấp độ 2: thanh thiếu niên (3:31) {#level-2-teen-331}

**Amit Sahai:** Vậy cháu đã bao giờ nghe đến thuật ngữ bằng chứng không kiến thức trước đây chưa?

**Teen:** Cháu chưa từng nghe ạ.

**Amit Sahai:** Đó là một cách để một trình chứng minh thuyết phục một trình xác minh rằng một điều gì đó là đúng mà không tiết lộ bất cứ điều gì về lý do tại sao nó đúng, điều này nghe có vẻ hoàn toàn kỳ lạ. Những gì chú muốn làm là chứng minh cho cháu thấy rằng chú biết mã số kết hợp này mà không tiết lộ mã số đó cho cháu. Và những gì cháu có thể làm là viết một tờ giấy nhớ nhỏ, một bí mật mà chú chắc chắn sẽ không biết. Gấp nó lại, nhét vào đây. Và sau đó, nếu chú biết mã số, chú sẽ có thể mở nó ra và nói cho cháu biết cháu đã viết gì.

Được rồi. "Con chó của tôi tên là Doug."

**Teen:** Chú có tìm ra mã số là gì không?

**Amit Sahai:** Không. Vì vậy, không có lúc nào trong quá trình tương tác này mà cháu thấy bất kỳ thông tin nào mà cháu chưa biết. Vậy mà chú đã thuyết phục được cháu rằng chú biết mã số.

**Teen:** Vậy mục đích chính xác của một bằng chứng không kiến thức là gì? Có phải nó giống như việc chứng minh một điều gì đó nhưng không cung cấp đủ thông tin có thể gây nguy hiểm cho bất cứ điều gì mà chú đang chứng minh không?

**Amit Sahai:** Mọi người không tin tưởng lẫn nhau. Và nếu chú có thể chứng minh rằng chú đã làm đúng một việc gì đó với ai đó mà không phải tiết lộ bí mật của mình, thì người đó sẽ tin tưởng chú hơn.

**Teen:** Điều này liên quan như thế nào đến công nghệ máy tính? Nó có phải là một sự tương tác trực tiếp không?

**Amit Sahai:** Giả sử cháu muốn trao đổi thông điệp với một người mà cháu quen biết. Chắc hẳn đầu tiên các cháu sẽ gặp nhau và tìm ra một mật mã bí mật nào đó, đúng không? Và sau đó viết thông điệp cho nhau bằng mật mã đó. Nhưng sẽ ra sao nếu cháu chưa từng gặp người đó trước đây? Sẽ ra sao nếu cháu muốn trao đổi thông điệp bí mật với chú và chúng ta chưa từng gặp nhau trước đây? Làm sao chúng ta có thể làm được điều đó?

**Teen:** Cháu không biết nữa.

**Amit Sahai:** Nghe có vẻ bất khả thi, đúng không? Nhưng không phải vậy. Cháu sẽ không sử dụng một ổ khóa vật lý hay một chiếc hộp vật lý. Thay vào đó, chúng ta sẽ sử dụng toán học để làm những việc như thế này. Cháu có thể lấy một thông điệp và mã hóa nó bằng toán học. Và sau đó chú có thể chứng minh cho cháu thấy rằng chú biết khóa, mở nó ra và gửi lại cho cháu. Bằng cách đó, chú sẽ chứng minh cho cháu thấy rằng chú biết khóa toán học của hộp khóa toán học.

Vậy dựa trên những gì chúng ta đã thảo luận hôm nay, theo lời của cháu, bằng chứng không kiến thức là gì?

**Teen:** Nó giống như việc chú có một bí mật thực sự quan trọng mà chú muốn ai đó biết, nhưng chú không muốn kể cho họ nghe mọi thứ. Chú có thể sử dụng một bằng chứng không kiến thức để chứng minh cho họ thấy bí mật đó, nhưng không tiết lộ toàn bộ.

#### Cấp độ 3: sinh viên đại học (6:13) {#level-3-college-student-613}

**Amit Sahai:** Bạn đang học ngành gì?

**College Student:** Tôi là sinh viên năm nhất ngành khoa học máy tính tại USC Viterbi. Tôi quan tâm đến tất cả những thứ như dữ liệu, internet, chuỗi khối và tiền mã hóa.

**Amit Sahai:** Bạn đã bao giờ nghe nói về bằng chứng không kiến thức chưa?

**College Student:** Tôi chỉ mới nghe thoáng qua.

**Amit Sahai:** Thực ra, không gian chuỗi khối là một trong những không gian mà chúng ta đang thấy các bằng chứng không kiến thức được triển khai — và tôi nghĩ đó mới chỉ là khởi đầu. Về cốt lõi, một bằng chứng không kiến thức là sự tương tác giữa hai người. Tôi sẽ có thể thuyết phục bạn rằng một tuyên bố nào đó là đúng, nhưng bạn sẽ không biết tại sao nó lại đúng.

Cách chúng ta sẽ tiếp cận vấn đề này là thông qua một thứ gọi là tính đầy đủ NP (NP-completeness). Một bài toán NP-đầy đủ là một bài toán thực sự khó giải. Nhưng nếu bạn có thể giải được nó, bạn có thể giải được bất kỳ bài toán nào thuộc lớp NP — và điều đó bao gồm một số lượng lớn các bài toán. Chúng ta sẽ sử dụng một bài toán NP-đầy đủ để thực sự chứng minh một loạt các tuyên bố đáng kinh ngạc thông qua một bằng chứng không kiến thức. Bài toán NP-đầy đủ cụ thể mà chúng ta sẽ xem xét được gọi là tô màu bản đồ bằng ba màu (map three-coloring).

Ở đây chúng ta có một bản đồ với một loạt các quốc gia, được sắp xếp sao cho không có quốc gia nào có cùng màu sắc lại có chung đường biên giới. Đó là điều làm cho một bản đồ như thế này được tô màu hợp lệ. Hóa ra việc một bản đồ có thể được tô bằng ba màu theo cách này hay không là một ví dụ về bài toán NP-đầy đủ.

Có thể điều bạn thực sự muốn làm là đưa ra một bằng chứng không kiến thức rằng bạn có ít nhất 0.3 Bitcoin, mà không tiết lộ địa chỉ tài khoản của bạn. Hóa ra tôi có thể lấy tuyên bố đó và chuyển đổi nó thành một bản đồ các quốc gia. Bản đồ các quốc gia đó sẽ chỉ có thể tô bằng ba màu nếu bạn có ít nhất 0.2 Bitcoin.

**College Student:** Làm thế nào chúng ta có thể biến một thứ như thế này thành một bằng chứng không kiến thức?

**Amit Sahai:** Tất nhiên, bước đầu tiên là chúng ta phải xóa tất cả các màu. Tôi đã đặt một màu vào bên trong mỗi phong bì này. Bây giờ, làm sao bạn biết rằng đó là một cách tô màu hợp lệ? Bạn không biết. Bạn phải chọn hai quốc gia láng giềng bất kỳ — bạn có thể chọn chúng theo bất kỳ cách nào bạn thích, một cách ngẫu nhiên.

**College Student:** Tôi có thể lấy hai cái này không?

**Amit Sahai:** Ở đây chúng ta có màu xanh lá cây, và ở đây chúng ta có màu xanh lam. Như bạn có thể thấy, chúng là hai màu khác nhau. Vì vậy, bạn có một chút tự tin rằng tôi đã tô màu đúng — nhưng không tự tin lắm, vì tôi mới chỉ cho bạn xem hai trong số các quốc gia. Một cách để có thêm sự tự tin là mở thêm nhiều phong bì nữa, nhưng điều đó sẽ tiết lộ thông tin cho bạn. Tôi không muốn làm điều đó.

Vì vậy, thay vào đó, tôi sẽ yêu cầu bạn vui lòng quay lại. Và bây giờ, hãy thay đổi những màu sắc này.

Bạn có thể chọn ngẫu nhiên hai quốc gia, và chúng ta sẽ lại tiết lộ hai trong số các màu.

**College Student:** Tôi sẽ lấy cái này và cái này.

**Amit Sahai:** Bạn thật thông minh khi kiểm tra lại với cùng một cái mà bạn đã có. Nhưng như bạn sẽ thấy, bây giờ nó không phải là màu xanh lá cây — nó là màu xanh lam. Và mặt khác, cái này là màu xanh lá cây. Những màu tôi cho bạn xem lần trước không khớp với những màu mới này. Nhưng nó khớp với cách tô màu mà tôi đang cho bạn xem ngay bây giờ. Vì vậy, những gì chúng ta đã làm là khiến bạn không thể ghép các mảnh lại với nhau. Và nếu bạn làm điều này một nghìn lần, và mỗi lần tôi đều cho bạn xem các màu khác nhau một cách chính xác, bạn sẽ thực sự bị thuyết phục. Và đó là tất cả — đó là toàn bộ bằng chứng không kiến thức.

**College Student:** Vậy nó giống như một bằng chứng xác suất phải không?

**Amit Sahai:** Đúng vậy. Trong các triển khai thực tế, chúng ta sẽ không sử dụng phong bì — bạn sẽ sử dụng mã hóa. Nhưng đây là giao thức.

**College Student:** Vậy những ý nghĩa rộng lớn hơn của các bằng chứng không kiến thức là gì? Chúng được cho là thực tế hơn để triển khai, hay chúng được cho là để chứng minh điều gì đó về mặt cấu trúc?

**Amit Sahai:** Nó không phải là về việc làm cho một cái gì đó hiệu quả hơn. Nó là về việc làm những điều mà trước đây chúng ta không biết cách làm. Tôi thực sự có thể chứng minh cho bạn thấy, mà không tiết lộ bất kỳ bí mật nào của mình, rằng tôi đang hành xử trung thực. Tôi có thể chứng minh cho bạn thấy rằng tôi đã ký một tài liệu được mã hóa nào đó một cách chính xác mà không tiết lộ tài liệu bí mật đó là gì. Khả năng thay đổi cuộc chơi đó — thực sự thay đổi những gì chúng ta có thể làm — là những gì không tri thức mang lại.

**College Student:** Bạn nghĩ chúng ta có thể xây dựng thêm niềm tin ở đâu bằng cách sử dụng các bằng chứng không kiến thức?

**Amit Sahai:** Một ví dụ tuyệt vời là các cuộc bầu cử. Nếu bạn có thể chứng minh rằng một cuộc bầu cử đã được tiến hành chính xác — rằng mọi lá phiếu bỏ phiếu đều được kiểm đếm và tất cả cộng lại thành một người chiến thắng với một tổng số cụ thể — trong không tri thức, thì bạn không phải từ bỏ các lá phiếu thực tế của bất kỳ người nào. Vậy mà mọi người đều có thể thấy rằng nó đã được thực hiện chính xác.

#### Cấp độ 4: nghiên cứu sinh (11:59) {#level-4-grad-student-1159}

**Amit Sahai:** Thật tuyệt khi có bạn ở đây và được trò chuyện với bạn, Eli. Bạn có thể kể cho tôi nghe một chút về nghiên cứu của bạn không?

**Eli:** Nghiên cứu của tôi là về mật mã học. Cụ thể, tôi đang làm việc trên một số giao thức tính toán đa bên (multi-party computation). Giao thức mà tôi đang làm việc hiện tại là một hệ thống để tính toán các số liệu thống kê tổng hợp, để các nhà cung cấp dịch vụ như Google Chrome hoặc Tesla có thể thu thập các số liệu thống kê đó mà không biết bất cứ điều gì về dữ liệu của từng người dùng cá nhân. Tôi, với tư cách là một người dùng, không cần phải cho Firefox biết rằng trang web yêu thích của tôi là mylittlepony.com. Nhưng họ có thể biết có bao nhiêu người dùng truy cập mylittlepony.com mỗi ngày.

**Amit Sahai:** Thật tuyệt vời. Tính toán đa bên là một lĩnh vực rất gần gũi và thân thiết với tôi. Rõ ràng, các bằng chứng không kiến thức là về việc chứng minh mọi thứ cho người khác mà không tiết lộ chi tiết về những gì bạn đang chứng minh. Nhưng trong suy nghĩ của tôi, không tri thức thực sự còn tiến xa hơn thế. Đó là khái niệm bao trùm này mà bạn có thể thấy rất nhiều trong tính toán đa bên, nơi bạn muốn hoàn thành một nhiệm vụ nào đó mà không tiết lộ bất cứ điều gì nhiều hơn chính xác những gì bạn cần để hoàn thành nhiệm vụ đó.

**Eli:** Đúng vậy, và nó cho phép bạn chứng minh rằng bạn đã hành xử trung thực, mà không tiết lộ bất kỳ bí mật liên quan nào mà bạn sử dụng để thực sự hành xử trung thực. Chúng ta biết rằng các bằng chứng không kiến thức cho các ngôn ngữ NP-đầy đủ đóng một vai trò rất lớn trong mật mã học. Trải nghiệm đầu tiên của bạn với tính đầy đủ NP là như thế nào?

**Amit Sahai:** Lần đầu tiên tôi tiếp xúc là trong lớp học thuật toán đầu tiên của tôi khi còn là sinh viên đại học. Một ngôn ngữ NP-đầy đủ là một bài toán tuyệt vời không chỉ cho bạn biết về chính nó, mà việc giải quyết bài toán này thực sự có thể cho bạn biết về toàn bộ một lớp các bài toán thực sự thú vị.

**Eli:** Khi bạn lần đầu tiên bắt đầu nghĩ về các bằng chứng như một trò chơi tương tác nơi chúng ta đang nói chuyện với nhau, điều đó có làm cho không tri thức trở nên khả thi không?

**Amit Sahai:** Chắc chắn rồi. Và ý tưởng rằng tính ngẫu nhiên có thể hữu ích để chứng minh một điều gì đó — một lần nữa, dường như rất phản trực giác nếu chúng ta nghĩ về lý tưởng thuần túy của một bằng chứng. Không có tính ngẫu nhiên, không có tính không xác định hiện diện ở đó.

**Eli:** Nó liên quan đến toàn bộ ý tưởng lật ngược một bằng chứng. Trong một bằng chứng cổ điển cũ, tính ngẫu nhiên đặc biệt đi ngược lại mục tiêu của những gì bạn đang cố gắng làm, bởi vì bạn đang cố gắng làm cho mọi thứ trở nên rõ ràng và tiết lộ luồng thông tin. Nhưng một khi bạn lật ngược điều đó và bạn không còn cố gắng làm điều đó nữa, đột nhiên tất cả các đặc tính xấu của tính ngẫu nhiên lại trở nên tốt.

**Amit Sahai:** Chính xác. Ngẫu nhiên là không thể đoán trước, và đó là những gì chúng ta muốn. Chúng ta muốn sự không thể đoán trước đó thực sự che giấu thông tin mà chúng ta muốn che giấu. Bạn đã sử dụng không tri thức như thế nào trong các dự án mà bạn đã thực hiện? Những thách thức mà bạn nhận thấy là gì?

**Eli:** Thông thường phần khó nhất là tìm ra chính xác đâu là nơi tốt nhất để sử dụng nó. Tôi đã viết một số bài báo sử dụng không tri thức theo một cách lý thuyết hơn, nhưng khi nói đến các ứng dụng, một số ứng dụng thú vị nhất mà tôi thấy cho đến nay là trong không gian chuỗi khối.

**Amit Sahai:** Một số nút thắt về hiệu suất là gì?

**Eli:** Một trong những điều thú vị nhất về các bằng chứng không kiến thức là có rất nhiều loại — tôi thích gọi chúng là các hương vị. Nhìn chung, khi bạn đang sử dụng các bằng chứng không kiến thức trong ứng dụng, nút thắt chính thường nằm ở trình chứng minh.

**Amit Sahai:** Bạn có thể lấy công việc của trình chứng minh và chia nó thành nhiều tính toán song song không?

**Eli:** Đó là một câu hỏi rất thú vị. Tôi nghĩ chúng ta vẫn chưa biết câu trả lời cho điều đó với tư cách là một lĩnh vực. Một trong những điều tuyệt vời nhất mà tôi đã thấy trong ba hoặc bốn năm qua là sự chuyển đổi từ lý thuyết sang ứng dụng — chứng kiến tất cả những hệ thống tuyệt vời này mà mọi người đã nghĩ ra trong 30 năm qua bắt đầu thực sự trở nên đủ hiệu quả để được tạo ra.

**Amit Sahai:** Không còn nghi ngờ gì nữa. Và đặc biệt là với điện toán đám mây — việc khai thác sức mạnh của đám mây để kích hoạt các bằng chứng không kiến thức sẽ rất tuyệt vời. Ngoài ra trong không gian chuỗi khối, nếu bạn muốn tăng tốc độ tạo ra các bằng chứng, nếu điều đó có thể được thực hiện theo cách phân tán, thì sẽ rất tuyệt. Một trong những hy vọng của tôi là sức mạnh của tính toán đa bên là về việc mang những người không tin tưởng lẫn nhau lại với nhau. Liệu chúng ta có thể lấy sức mạnh đó trong mật mã học và sử dụng nó để giúp giải quyết mức độ mất niềm tin to lớn đang tồn tại trong xã hội hiện nay không?

**Eli:** Tôi nghĩ đó là một trong những lý do khiến tôi bị thu hút bởi tính toán đa bên. Một trong những vấn đề quan trọng nhất trên thế giới là thực tế có rất nhiều người không tin tưởng lẫn nhau. Việc có thể sử dụng toán học để tạo ra công nghệ cho phép mọi người làm việc cùng nhau mà không cần phải tin tưởng lẫn nhau là một sứ mệnh thực sự thú vị và tuyệt vời.

#### Cấp độ 5: chuyên gia (17:10) {#level-5-expert-1710}

**Amit Sahai:** Shang-Hua, thật tuyệt khi được gặp lại anh. Tôi nghĩ lần cuối chúng ta gặp nhau là vào năm 2017 hay khoảng thời gian đó.

**Shang-Hua:** Tôi nghĩ chúng ta đã Zoom một lần trong đại dịch, nhưng thật tốt khi được gặp anh trực tiếp. Thực ra, vào năm 86, tôi đã tham gia một lớp học về mật mã học với Giáo sư Leonard Adleman, chữ A trong RSA. Ông ấy đã giao cho tôi bài báo của Goldwasser, Micali và Charlie Rackoff về bằng chứng không kiến thức. Vì vậy, đó thực sự là bài thuyết trình đầu tiên của tôi, từ trước đến nay, ở đất nước này — về không tri thức.

**Amit Sahai:** Thật tuyệt vời. Đó là một khái niệm gần như thôi miên.

**Shang-Hua:** Việc làm thế nào để hình thành các khái niệm đó về mặt toán học cũng rất thú vị. Ví dụ, chúng ta có dữ liệu. Cuối cùng từ dữ liệu, thông qua khai thác dữ liệu, anh có thể nhận được thông tin. Và sau đó anh có từ này gọi là "kiến thức". Kiến thức đã được tranh luận từ lâu ngay cả trong triết học. Kiến thức là gì? Nhưng đây là một cách rất hấp dẫn mà các nhà toán học hoặc nhà khoa học máy tính muốn nắm bắt kiến thức này. Nó không nói là "bằng chứng không thông tin". Vậy quan điểm của anh về lý do tại sao lại là "kiến thức" thay vì "thông tin", hay "bằng chứng không dữ liệu" là gì? Rõ ràng là có dữ liệu ở đó, vì vậy nó không thể là không dữ liệu.

**Amit Sahai:** Chắc chắn rồi. Tôi không nghĩ chúng ta vẫn có một câu trả lời hoàn toàn thỏa đáng cho câu hỏi đó. Một cái nhìn sâu sắc tuyệt đẹp như vậy là ý tưởng về không tri thức là một thứ gì đó mà anh đã có thể dự đoán được. Nếu anh đã có thể dự đoán được câu trả lời, thì anh chắc chắn không thu được bất kỳ kiến thức nào từ sự tương tác đó. Cái nhìn sâu sắc này — về việc có thể dự đoán tương lai một cách chính xác và đó là bằng chứng cho sự thiếu hụt kiến thức mới — là một cái nhìn sâu sắc tuyệt đẹp và đáng kinh ngạc.

**Shang-Hua:** Chà, không phải là không có thông tin ở đây. Về cơ bản, từ góc độ điện toán và bảo mật, điều quan trọng là anh đang thu được bao nhiêu kiến thức, nhiều hơn là anh đã thu được bao nhiêu thông tin và anh có bao nhiêu dữ liệu. Dữ liệu không ngay lập tức ngụ ý kiến thức. Nhưng mọi người không phải lúc nào cũng có thể phân biệt được.

**Amit Sahai:** Đúng vậy. Ví dụ, trong nghiên cứu y học — sẽ tuyệt vời như thế nào nếu có một loại thuốc và chứng minh rằng nó hoạt động trong mô hình này, mà không cần phải tiết lộ cấu trúc của hợp chất?

**Shang-Hua:** Anh sẽ nói những hướng đi tiếp theo trong không gian này là gì?

**Amit Sahai:** Khái niệm về các chương trình không tri thức này sẽ cho phép anh thực hiện các tính toán hoàn toàn tùy ý theo cách không tri thức, mà không cần bất kỳ sự tương tác nào. Tôi có thể chỉ cần lấy chương trình, chuyển đổi nó thành một chương trình không tri thức — hoặc một chương trình bị làm rối (obfuscated program) — và sau đó chỉ cần gửi nó cho anh. Anh có thể chạy nó và thu được lợi ích từ tính toán đó mà không cần phải nói chuyện với tôi nữa.

**Shang-Hua:** Đúng vậy. Có một bản chất không tương tác. Nhưng có khả năng xác minh trong đó. Trong chuỗi khối, họ cũng bắt đầu kết hợp một bằng chứng không kiến thức tổng quát hơn vào sổ cái.

**Amit Sahai:** Chúng ta chắc chắn đang ở thời điểm mà không tri thức sẽ được sử dụng ngày càng nhiều. Có rất nhiều hội nghị và cuộc họp trong không gian không tri thức mà anh và tôi không được mời — bởi vì nó dành cho những người đang phát triển, những người đang lập trình, chứ không phải những nhà toán học như chúng ta. Và tôi nghĩ đó là một dấu hiệu. Đó là dấu hiệu cho thấy đứa con của chúng ta đã lớn, và đã đến lúc nó được phát triển.

**Shang-Hua:** Tôi nghĩ một cách sâu sắc, các sinh viên thường hỏi tôi những hướng đi trong tương lai là gì — cả về mật mã học, bằng chứng không kiến thức, trong thế giới thực và trong điện toán toán học.

**Amit Sahai:** Đó là một câu hỏi tuyệt vời. Tôi ước mình có thể nhìn thấy tương lai. Tôi không thể, nhưng hãy để tôi thử. Tôi nghĩ chúng ta đã làm được rất nhiều điều trong mật mã học trong vài thập kỷ qua, nhưng chúng ta hiểu quá ít. Khía cạnh cơ bản nhất là hiểu được độ khó — làm thế nào chúng ta có được những bài toán khó? Làm thế nào chúng ta thực sự xây dựng được những bài toán khó về mặt toán học để sau đó chúng ta có thể sử dụng chúng để xây dựng các chương trình và bằng chứng không kiến thức hiệu quả?

**Shang-Hua:** Tôi đoán là, trong điện toán lượng tử, anh cần những bài toán thậm chí còn khó hơn.

**Amit Sahai:** Thật vậy. Bây giờ khi chúng ta có bóng ma của điện toán lượng tử đang đến gần, tất cả chúng ta đều biết rằng máy tính lượng tử có thể phá vỡ rất nhiều hệ thống mật mã. Đó là một thách thức sâu sắc. Vậy chúng ta có thể tìm ra những nguồn độ khó mới có khả năng kháng lượng tử — mà ngay cả máy tính lượng tử cũng không thể phá vỡ không? Đó là điều mà tôi đã và đang nghiên cứu trong vài năm qua.

**Shang-Hua:** Nhưng tôi chắc chắn rằng chúng sẽ thúc đẩy những nền toán học tuyệt đẹp.

**Amit Sahai:** Vâng, đúng vậy. Một trong những điều tuyệt vời về thế giới thực là mọi người trong thế giới thực đều có những nhu cầu. Và những nhu cầu đó thường nghe có vẻ bất khả thi. Và đó là lúc chúng ta bước vào — công việc của chúng ta là biến điều không thể thành có thể.