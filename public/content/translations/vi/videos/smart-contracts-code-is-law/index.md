---
title: "Mã là luật? Giải thích về hợp đồng thông minh"
description: "Khám phá khái niệm 'mã là luật' qua lăng kính của hợp đồng thông minh trên Ethereum và DeFi. Video này đề cập đến hợp đồng thông minh là gì, cách chúng hoạt động và câu hỏi mang tính triết học về việc liệu mã có nên là trọng tài tối cao hay không."
lang: vi
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "hợp đồng thông minh"
format: explainer
author: Finematics
breadcrumb: "Hợp đồng thông minh"
---

Một video giải thích của **Finematics** khám phá khái niệm "mã là luật" qua lăng kính của hợp đồng thông minh trên Ethereum, bao gồm hợp đồng thông minh là gì, cách chúng hoạt động, lợi thế của chúng so với các hợp đồng truyền thống và lý do tại sao chúng là nền tảng của tài chính phi tập trung (DeFi).

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=pWGLtjG-F5c) được xuất bản bởi Finematics. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:00) {#introduction-000}

Bạn đã bao giờ nghe đến thành ngữ "mã là luật", nơi công nghệ được sử dụng để thực thi các quy tắc chưa? Trong trường hợp đó, liệu chúng ta có cần đến luật sư nữa không? Hoặc có lẽ chúng ta có thể sống trong một thế giới hoàn toàn tự động, nơi mã ra lệnh cho những gì chúng ta có thể và không thể làm. Với sự phát triển hiện tại của hợp đồng thông minh, viễn cảnh tương lai này có thể gần hơn chúng ta nghĩ.

Hợp đồng thông minh là một đoạn mã có thể được thực thi tự động và theo một cách xác định. Mã hợp đồng thông minh thường được lưu trữ và thực thi trên chuỗi khối để làm cho nó không cần tin cậy và an toàn. Hợp đồng thông minh cũng có khả năng nhận, lưu trữ và gửi tiền — và thậm chí gọi các hợp đồng thông minh khác. Chúng tuân theo ngữ nghĩa nếu-thì (if-then), điều này làm cho chúng khá dễ lập trình.

Hợp đồng thông minh nhằm mục đích loại bỏ yếu tố con người khỏi việc ra quyết định. Yếu tố con người thường được chứng minh là yếu tố dễ xảy ra lỗi và không đáng tin cậy nhất của các hợp đồng truyền thống tiêu chuẩn.

Máy bán hàng tự động rất thường được đưa ra như một sự so sánh tương đồng tốt với hợp đồng thông minh, vì nó chia sẻ một số điểm tương đồng. Một máy bán hàng tự động điển hình được lập trình theo cách cho phép các hành động và chuyển đổi trạng thái nhất định dựa trên đầu vào. Nó cũng hoạt động theo một cách hoàn toàn xác định. Ví dụ, nếu bạn muốn mua một lon coca có giá hai đô la và bạn chỉ có một đô la, cho dù bạn có thử bao nhiêu lần đi chăng nữa, bạn sẽ không thể lấy được đồ uống. Mặt khác, nếu bạn nhét vào ba đô la, máy sẽ đưa cho bạn một lon coca và tiền thừa thích hợp. Ngay cả tiền thừa được đưa ra cũng được chọn theo một cách được xác định trước và được lập trình dựa trên những đồng xu nào có sẵn và những đồng xu nào máy muốn loại bỏ trước.

Hợp đồng thông minh có thể hoàn toàn dựa vào thông tin có sẵn trên chuỗi khối — ví dụ: "nếu bạn đưa cho tôi mười token A, tôi sẽ đưa cho bạn mười token B." Hoặc nó có thể dựa vào một nguồn dữ liệu bên ngoài, ví dụ, vào giá ETH hoặc S&P 500. Ví dụ sau làm cho hợp đồng thông minh trở nên khó khăn hơn, vì chúng phải tin tưởng vào dữ liệu thế giới thực. Sự tin cậy cần thiết có thể được giảm thiểu bằng cách sử dụng các dịch vụ nguồn cấp dữ liệu, nhưng ngay cả các dịch vụ nguồn cấp dữ liệu cũng phải được tin cậy. Đã có một vài dự án, bằng cách sử dụng các ưu đãi nhất định, làm cho các nguồn cấp dữ liệu có nhiều khả năng cung cấp dữ liệu chính xác hơn. Chainlink là một dự án thực sự nổi bật trong danh mục này.

#### Hợp đồng thông minh Ethereum (3:09) {#ethereum-smart-contracts-309}

Ethereum là một chuỗi khối hỗ trợ hợp đồng thông minh và giúp lập trình viên có thể triển khai các hợp đồng thông minh của riêng họ. Một hợp đồng thông minh có thể được viết bằng một ngôn ngữ lập trình gọi là Solidity, được tạo ra đặc biệt cho mục đích đó. Trong Ethereum, tất cả các hợp đồng thông minh được triển khai đều bất biến — điều này có nghĩa là một khi được triển khai, chúng không thể bị sửa đổi, điều này tạo ra những rủi ro nhất định mà chúng ta sẽ thảo luận sau.

Hợp đồng thông minh trên Ethereum cũng phi tập trung, có nghĩa là không có một máy tính đơn lẻ nào kiểm soát hợp đồng. Trên thực tế, tất cả các nút trên mạng lưới Ethereum đều lưu trữ cùng một hợp đồng với cùng một trạng thái chính xác. Mặc dù Ethereum hiện là nền tảng hợp đồng thông minh đa mục đích phổ biến nhất, nhưng nó không phải là nền tảng duy nhất và nó có một vài đối thủ cạnh tranh, bao gồm Cardano, Tezos, EOS và Tron — nhưng không phải tất cả chúng đều chia sẻ các đặc điểm giống nhau.

#### Định nghĩa hợp đồng thông minh (4:23) {#smart-contract-definition-423}

Thuật ngữ "hợp đồng thông minh" được đặt ra bởi nhà mật mã học nổi tiếng Nick Szabo vào đầu những năm 1990. Cái tên này, mặc dù không phải là cái tên dễ hiểu nhất, nhưng đã gắn liền và nó được sử dụng phổ biến, đặc biệt là trong ngành công nghiệp chuỗi khối. Để thấy được lợi ích của hợp đồng thông minh, hãy so sánh một hợp đồng thông minh giả định với hợp đồng tương đương của nó trong không gian truyền thống.

#### Ví dụ về hợp đồng thông minh (4:46) {#smart-contract-example-446}

Giả sử chúng ta muốn viết hợp đồng sau: nếu Alice gửi X số lượng token A và Bob gửi cùng số lượng token B, các token sẽ được hoán đổi — Alice sẽ nhận được token của Bob và Bob sẽ nhận được token của Alice.

Trong một thế giới không có hợp đồng thông minh, một cách để đạt được điều đó mà Alice không cần phải tin tưởng Bob và Bob không cần phải tin tưởng Alice sẽ là tạo một hợp đồng ký quỹ với một bên thứ ba. Bên thứ ba sẽ thu thập token A từ Alice, đợi cùng số lượng token B từ Bob, và gửi cho Alice và Bob các token đã được hoán đổi tương ứng.

#### Các vấn đề của hợp đồng thông minh (5:45) {#smart-contract-problems-545}

Cách tiếp cận này đã cho thấy một vài vấn đề mà Alice và Bob có thể phải đối mặt:

- **Tin tưởng vào các bên trung gian** — không có gì đảm bảo rằng bên thứ ba sẽ không bỏ trốn cùng với các token sau khi nhận được tiền từ Alice và Bob. Chúng ta phải dựa vào danh tiếng của bên trung gian và bảo hiểm tiềm năng.
- **Kết quả không xác định** — nếu có sự cố xảy ra, nó có thể có các kết quả khác nhau tùy thuộc vào nhiều yếu tố, bao gồm cả khu vực tài phán nơi một vụ việc tiềm ẩn sẽ được giải quyết.

Mặt khác, một hợp đồng thông minh sẽ hoạt động theo một cách hoàn toàn tự động và xác định, đảm bảo cả hai bên đều nhận được tiền khi họ đáp ứng các tiêu chí ban đầu về việc nạp token. Hợp đồng thông minh cũng có thể tự giữ tiền bên trong chúng, điều không thể đạt được trong thế giới truyền thống.

#### Tốc độ (6:47) {#speed-647}

Tùy thuộc vào bên trung gian, Alice và Bob có thể phải đợi thậm chí vài ngày hoặc vài tuần để giải quyết việc chuyển giao token. Điều gì sẽ xảy ra nếu họ muốn hoán đổi token vào Chủ nhật và bên trung gian không hoạt động? Với hợp đồng thông minh, những loại vấn đề này sẽ biến mất và hợp đồng có thể được hoàn thành vài giây sau khi các tiêu chí ban đầu được đáp ứng.

#### Chi phí (7:16) {#cost-716}

Các hợp đồng truyền thống không chỉ đắt đỏ vì bên trung gian phải kiếm lợi nhuận — mà còn có rủi ro rất lớn về các chi phí ẩn cho những thứ như trọng tài và thực thi nếu có bất kỳ vấn đề nào với hợp đồng.

Khả năng tái sử dụng là một lợi thế khác: cùng một hợp đồng thông minh chịu trách nhiệm hoán đổi token của Alice và Bob có thể được sử dụng bởi bất kỳ ai khác muốn hoán đổi token. Trong thế giới truyền thống, tất cả họ sẽ phải ký các hợp đồng riêng biệt và trả các khoản phí tương ứng cho bên trung gian.

#### Gian lận (7:58) {#fraud-758}

Gian lận lại là một chi phí ẩn khác, lần này là đối với chính bên trung gian. Bên trung gian sẽ phải đảm bảo rằng token của cả Alice và Bob đều hợp pháp trước khi khởi tạo một giao dịch hoán đổi. Gian lận rất phổ biến trong tài chính truyền thống và hầu hết các công ty đều có những đội ngũ khổng lồ làm việc hoàn toàn để ngăn chặn gian lận. Với hợp đồng thông minh, các token có thể được xác minh trên chuỗi khối và với chữ ký số, có thể thấy rõ ngay lập tức liệu cả Alice và Bob có đủ điều kiện để chi tiêu token của họ hay không.

#### Các trường hợp sử dụng (8:42) {#use-cases-842}

Hợp đồng thông minh có số lượng trường hợp sử dụng ngày càng tăng, từ thanh toán và tài chính phi tập trung (DeFi) đến chuỗi cung ứng và huy động vốn cộng đồng. Hợp đồng thông minh cũng là những khối xây dựng cơ bản cho các ứng dụng phi tập trung (dapp).

#### DeFi (9:07) {#defi-907}

Tài chính phi tập trung (DeFi) là một trong những ngành công nghiệp mới phụ thuộc rất nhiều vào hợp đồng thông minh. Một số thứ đã được xây dựng trong không gian này bao gồm:

- **Stablecoin phi tập trung** — với việc sử dụng khéo léo các hợp đồng thông minh và các ưu đãi nhất định, chúng ta có thể tạo ra một stablecoin được neo giá với đồng đô la Mỹ mà không cần phải lưu trữ đô la trong thế giới thực. MakerDAO là một trong những dự án biến điều này thành hiện thực.
- **Cung cấp thanh khoản tự động** — một tập hợp các hợp đồng thông minh có thể cho phép người dùng cung cấp thanh khoản và hoán đổi token theo một cách hoàn toàn không cần cấp phép và phi tập trung. Uniswap và Kyber Network là những ví dụ điển hình về các giao thức như vậy.

#### Huy động vốn cộng đồng và chuỗi cung ứng (10:05) {#crowdfunding-and-supply-chains-1005}

Một trường hợp sử dụng khác là cung cấp sự minh bạch hơn cho các chuỗi cung ứng, nơi các giao thức như OriginTrail phát huy tác dụng. Khi nói đến huy động vốn cộng đồng, bạn có thể tưởng tượng một hợp đồng sẽ mở khóa tiền ngay khi các mục tiêu nhất định được đáp ứng và được cộng đồng xác minh.

#### Hợp đồng thông minh trong tương lai (10:29) {#future-smart-contracts-1029}

Sẽ ra sao nếu hợp đồng thông minh có thể tạo điều kiện cho những việc như đi chung xe, cho thuê căn hộ và nhiều hơn thế nữa? Còn về từ thiện thì sao? Bạn có thể tưởng tượng một quỹ hoàn toàn tự động sẽ gửi tiền trực tiếp đến những người cần nó nhất mà không cần bất kỳ bên trung gian nào. Ví dụ, quỹ có thể xác định rằng một khu vực nhất định đã bị bão tấn công và chuyển hướng tiền đến khu vực đó trên thế giới. Hiện tại, điều đó nghe có vẻ khá bất khả thi, nhưng tất cả các yếu tố cần thiết để biến điều gì đó như thế này thành hiện thực đang được xây dựng ngay lúc này.

Các trường hợp sử dụng cho hợp đồng thông minh gần như là vô tận, nhưng trước khi chúng ta có thể đạt được tất cả những điều đó, chúng ta phải giải quyết một vài vấn đề:

- **Lỗi (Bugs)** — một trong những rủi ro chính khi nói đến hợp đồng thông minh là thứ ám ảnh mọi phần mềm khác. Ví dụ điển hình nhất là vụ hack The DAO, dẫn đến việc mất hàng triệu đô la giá trị ether do kẻ tấn công có thể rút cạn tiền từ hợp đồng thông minh. Điều này đã khiến Ethereum phải phân nhánh cứng và tạo ra rất nhiều sự bất đồng trong cộng đồng Ethereum. Kể từ vụ hack The DAO, cộng đồng Ethereum đã đưa ra rất nhiều biện pháp bảo mật bổ sung. Ngày nay, hầu hết tất cả các hợp đồng thông minh phổ biến đều đã trải qua một cuộc kiểm toán bảo mật, thường là bởi nhiều đội ngũ. Cũng có một xu hướng sử dụng các phương pháp xác minh hình thức để chứng minh rằng các hợp đồng nhất định sẽ luôn hoạt động theo một cách được mong đợi.
- **Thay đổi giao thức** — ngay cả khi một hợp đồng thông minh không có bất kỳ lỗi nào và đã được kiểm toán, chúng ta vẫn không thể đảm bảo rằng một sự thay đổi ở cấp độ nền tảng sẽ không gây ra sự cố. Một bản nâng cấp cho chính giao thức có thể khiến một số hợp đồng thông minh bắt đầu hoạt động khác với mong đợi.
- **Dữ liệu thế giới thực** — các dịch vụ nguồn cấp dữ liệu có thể cung cấp một cách đáng tin cậy để đưa thông tin từ thế giới thực vào chuỗi khối. Nhưng hãy tưởng tượng bạn đã thuê một căn hộ hoặc một chiếc ô tô và vô tình gây ra một số thiệt hại. Làm thế nào một hợp đồng thông minh, mà không có bất kỳ sự can thiệp nào của con người, có thể biết về điều đó? Có nhiều ví dụ mà thật khó để tưởng tượng làm thế nào một điều gì đó bất ngờ xảy ra trong thế giới thực có thể được hiển thị cho một hợp đồng thông minh.

Bên cạnh những điều trên, cũng có những rủi ro liên quan đến quy định và thuế, nhưng tất cả những điều này cuối cùng đều có thể được giải quyết.

#### Chúng ta có thể thay thế luật sư không? (13:58) {#can-we-replace-lawyers-1358}

Vậy chúng ta có thực sự có thể thay thế luật sư bằng mã không? Không hẳn — ít nhất là không phải ngay bây giờ. Trong tương lai, ngày càng có nhiều hợp đồng có khả năng được tự động hóa, đặc biệt là trong lĩnh vực tài chính. Nhưng ngay cả trong một thế giới hoàn toàn tự động, các luật sư có thể cung cấp kiến thức có giá trị có thể được dịch thành mã. Cũng có rất nhiều thách thức về quy định xung quanh ngành công nghiệp tiền mã hóa sẽ khiến các luật sư rất bận rộn trong một thời gian. Tuy nhiên, nếu tôi là một luật sư, tôi sẽ bắt đầu tìm hiểu về hợp đồng thông minh và lập trình, vì chúng sẽ đóng một vai trò lớn trong tương lai.

#### Tóm tắt (14:53) {#summary-1453}

Ưu điểm của hợp đồng thông minh:

- Hoàn toàn tự động
- Kết quả xác định
- Không cần tin cậy
- Nhanh chóng, chính xác và an toàn
- Tiết kiệm chi phí và minh bạch

Nhược điểm của hợp đồng thông minh:

- Lỗi phần mềm
- Thay đổi giao thức
- Sự không chắc chắn về quy định và thuế

Mặc dù hợp đồng thông minh mang những rủi ro nhất định, chúng ta vẫn đang ở giai đoạn rất sớm và hầu hết các vấn đề hiện tại đều có thể giải quyết được.