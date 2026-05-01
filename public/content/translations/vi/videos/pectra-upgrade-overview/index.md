---
title: "Những gì sẽ có trong bản nâng cấp Pectra?"
description: "Christine Kim nói về bản nâng cấp Pectra của Ethereum, bao gồm các EIP có trong bản nâng cấp, những thay đổi của chúng đối với Giao thức và lý do tại sao chúng quan trọng đối với người dùng, nhà phát triển và trình xác thực."
lang: vi
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "upgrades"
format: presentation
author: Ethereum Foundation
breadcrumb: "Tổng quan về Pectra"
---

Một bài thuyết trình của **Christine Kim** tại Devcon SEA bao gồm các EIP có trong bản nâng cấp Pectra của Ethereum, những thay đổi của chúng đối với Giao thức, thời điểm dự kiến cho sự kích hoạt Mạng chính và những EIP nào đã bị loại khỏi phạm vi.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=ufIDBCgdGwY) được xuất bản bởi Tổ chức Ethereum. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:00) {#introduction-000}

Chúng ta sẽ nói về tất cả các EIP sẽ có trong bản nâng cấp Pectra. Một tuyên bố miễn trừ trách nhiệm nhanh trước khi tôi bắt đầu: mọi thứ tôi sắp nói đều mang tính thông tin — vì mục đích cung cấp thông tin — và không nên được hiểu là lời khuyên tài chính hoặc đầu tư.

#### Khi nào Pectra lên Mạng chính (0:23) {#when-is-pectra-mainnet-023}

Trước khi chúng ta đi sâu vào những gì sẽ có trong Pectra, câu hỏi mà tôi được hỏi nhiều nhất là "khi nào Pectra sẽ lên Mạng chính?" Vì vậy, tôi sẽ trả lời câu hỏi đó trước để chúng ta có thể đi vào các vấn đề kỹ thuật.

Đây là một phân tích dòng thời gian rất dự kiến. Khi mọi người hỏi tôi khi nào Pectra sẽ diễn ra, tôi nói rằng còn quá sớm để nói — bởi vì điều đó là sự thật. Pectra vẫn đang ở những giai đoạn phát triển rất sớm. Các thông số kỹ thuật đang thay đổi và phạm vi của Pectra vẫn chưa thực sự đã chung cuộc.

Thông qua quá trình này, một trong những điều bạn có thể học được là cách các bản nâng cấp được phát triển, cách các bản nâng cấp được thử nghiệm và cuối cùng là cách chúng được đưa lên Mạng chính. Ban đầu, các nhà phát triển quyết định một vài EIP để đưa vào một bản nâng cấp, và sau đó họ triển khai các EIP đó lên các mạng thử nghiệm riêng tư tập trung vào nhà phát triển được gọi là mạng phát triển. Các nhà phát triển đã khởi chạy một vài mạng phát triển cho Pectra, vì vậy các EIP này đã trải qua một vài vòng triển khai. Các nhà phát triển đã nhận thấy các trường hợp ngoại lệ và lỗi mà họ muốn sửa, và họ lặp lại các EIP này bằng cách khởi chạy các mạng phát triển mới. Mạng phát triển 4 đã được khởi chạy vào tháng trước trong tháng 10.

Điều này thường không xảy ra, nhưng các nhà phát triển — rất đặc biệt dành cho toàn bộ hội nghị này và cho mọi người trong khán giả — đã khởi chạy mạng thử nghiệm Pectra công khai đầu tiên trong tháng này. Nó được gọi là Mekong, vì vậy bạn có thể đi và tương tác sớm với một số EIP sẽ có trong Pectra. Nó dựa trên các thông số kỹ thuật của mạng phát triển 4, nhưng xin lưu ý rằng các thông số kỹ thuật đó đang thay đổi.

Có một danh sách các thay đổi thông số kỹ thuật đối với các EIP mà các nhà phát triển đã muốn đưa vào mạng phát triển 5 của Pectra — những thứ như định giá lại hợp đồng tiền biên dịch BLS và một EIP mới chưa được triển khai vào mạng phát triển 4 nhưng các nhà phát triển đang nhắm đến việc triển khai cho mạng phát triển 5 hoặc một bản nâng cấp trong tương lai. Vì vậy, các thông số kỹ thuật của Pectra đang thay đổi. Tôi dự đoán sẽ còn nhiều mạng phát triển nữa trước khi các thông số kỹ thuật thực sự có thể được đóng băng.

Phần khác thực sự quan trọng đối với bản nâng cấp Pectra trong tiến trình lên Mạng chính là phạm vi phải đã chung cuộc — để tất cả các EIP đi vào Pectra được quyết định. Có một EIP — nó chưa thực sự là một EIP — nhưng đó là việc tăng dung lượng khối dữ liệu mà các nhà phát triển chưa chính thức đưa vào Pectra, nhưng có vẻ như họ có khả năng sẽ đưa vào một số loại tăng dung lượng khối dữ liệu vì gần đây họ đã đưa vào một EIP giới thiệu cơ chế cập nhật mục tiêu Gas khối dữ liệu và Gas khối dữ liệu tối đa một cách linh hoạt thông qua lớp đồng thuận, thay vì để các tham số đó được mã hóa cứng trong lớp thực thi và lớp đồng thuận.

Khi phạm vi đã chung cuộc, bạn bắt đầu thử nghiệm bất kỳ EIP mới nào mà bạn đã triển khai — toàn bộ phạm vi của bản nâng cấp Pectra — và thử nghiệm thực chiến nó trên một vài mạng phát triển nữa. Tôi hình dung có thể cho đến mạng phát triển 6 hoặc 7. Và sau đó, khi các thông số kỹ thuật của Pectra được đóng băng và sẵn sàng — tất cả các trường hợp ngoại lệ mà các nhà phát triển có thể tìm thấy trên các mạng phát triển đã được tìm thấy — sau đó họ sẽ phát hành bản nâng cấp Pectra lên các mạng thử nghiệm Ethereum công khai. Hiện tại có hai mạng: Sepolia và Holesky.

Về mặt lịch sử, các nhà phát triển đã dự trù khoảng hai tuần giữa các lần nâng cấp mạng thử nghiệm công khai. Trong những trường hợp hiếm hoi, các nhà phát triển đã rút ngắn khoảng thời gian đó xuống chỉ còn một tuần giữa các mạng thử nghiệm, nhưng do quy mô của Pectra, tôi tưởng tượng các nhà phát triển sẽ muốn dành toàn bộ thời gian. Tôi đang dự trù khoảng một tháng cho Sepolia và Holesky, và sau đó là lúc bạn cuối cùng có thể có sự kích hoạt Mạng chính.

Dựa trên tất cả thông tin tôi biết hiện tại và tiến độ mà các nhà phát triển đã đạt được cho đến nay đối với Pectra, phân tích và dự đoán tốt nhất của tôi là Mạng chính Pectra sẽ diễn ra một cách thực tế vào tháng 4 năm 2025 tới. Một lần nữa, điều này rất dự kiến vì nhiều thứ có thể thay đổi. Quá trình phát triển diễn ra hàng tuần — các nhà phát triển tham gia các cuộc gọi ACD này để nói về lỗi mà họ không ngờ tới trong EIP này hoặc EIP mới này mà họ muốn thêm vào Pectra.

#### Các EIP của lớp thực thi (6:23) {#execution-layer-eips-623}

Hãy chuyển sang phần chính của bài nói chuyện này — những gì sẽ có trong bản nâng cấp Pectra. Có mười EIP sẽ có trong Pectra và bốn trong số đó tập trung vào lớp thực thi.

**EIP-2537** là một hợp đồng tiền biên dịch mới vào EVM — các phép toán đường cong BLS12-381. Đây là một sơ đồ chữ ký mật mã học mới mà các nhà phát triển hợp đồng thông minh đã yêu cầu từ rất lâu. EIP này được tạo ra vào năm 2020 và vào thời điểm đó, các nhà phát triển ứng dụng phi tập trung (dapp) đã nói rằng họ thực sự muốn nó vì nó sẽ cung cấp cho một số dapp dựa trên mật mã học không tri thức các đảm bảo quyền riêng tư mạnh mẽ hơn, có khả năng tăng cường bảo mật và khả năng mở rộng. Chữ ký BLS cũng là sự tổng hợp diễn ra trên lớp đồng thuận cho các chứng thực của trình xác thực. EIP này đã được chờ đợi từ lâu. Một trong những mối quan tâm là: liệu vẫn còn các ứng dụng đang chờ hợp đồng tiền biên dịch BLS và liệu họ có sử dụng nó khi nó đi vào hoạt động không? Nhưng nếu bạn đang ở trong khán giả này và không biết rằng hợp đồng tiền biên dịch BLS cuối cùng cũng sắp ra mắt — thì nó đang đến.

**EIP-2935** — phục vụ các hàm băm khối lịch sử từ trạng thái. EIP này giới thiệu một thay đổi đối với lớp thực thi sao cho các bằng chứng về các khối lịch sử có thể được tạo ra từ trạng thái. Nó có một số lợi ích ngắn hạn cho việc đồng bộ hóa máy khách nhẹ và cho các hợp đồng thông minh có thể muốn sử dụng dữ liệu về trạng thái của một khối trước đó trực tiếp thông qua EVM — bạn thực sự không thể làm điều đó ngay bây giờ. Nhưng những lợi ích ngắn hạn đó không phải là lý do chính khiến EIP này được đưa vào Pectra. Lý do chính là nó là điều kiện tiên quyết cho Verkle — cuộc đại tu lớn đối với cấu trúc dữ liệu trạng thái của Ethereum. Các nhà phát triển đã nghĩ rằng quá trình chuyển đổi đó sẽ diễn ra ngay sau Pectra, nhưng Verkle sẽ không đi vào Fusaka. Họ đã đẩy nó sang một bản nâng cấp khác, nhưng bước đệm này đã được đánh dấu hoàn thành trong danh sách.

**EIP-7685** — các yêu cầu lớp thực thi đa mục đích. EIP này không thực sự giới thiệu các tính năng mới cho Ethereum — nó là một EIP để hỗ trợ các EIP khác trong Pectra. Trong Pectra, có một vài EIP mà lớp thực thi sẽ có thể truyền nhiều tin nhắn hơn — các loại tin nhắn khác nhau — đến lớp đồng thuận mà trước đây nó không thể. Các hợp đồng thông minh trên lớp thực thi sẽ có thể kích hoạt việc rút tiền, hợp nhất và gửi tiền của trình xác thực. Thay vì triển khai tất cả các kênh giao tiếp mới này theo một cách riêng biệt, độc đáo, EIP này tạo ra một cấu trúc tổng quát — một bus tổng quát — để chứa các yêu cầu này. Nó sẽ dễ kiểm tra hơn, dễ triển khai trên các máy khách hơn và dễ chuẩn hóa hơn, đặc biệt nếu các nhà phát triển muốn giới thiệu các loại yêu cầu có thể kích hoạt từ lớp thực thi mới.

**EIP-7702** — thiết lập mã cho các tài khoản thuộc sở hữu bên ngoài. Một loại giao dịch mới sắp xuất hiện trên Ethereum. Loại giao dịch này sẽ tạm thời cho phép một EOA có tính linh hoạt cao hơn, kích hoạt các tính năng như gom lô giao dịch, giao dịch được tài trợ, giao dịch có điều kiện và bảo mật được ủy quyền. Bạn có thể đang nghĩ, "đây có phải là tầm nhìn trừu tượng hóa tài khoản đang trở thành hiện thực trên Ethereum không?" Không, không phải vậy — đó là một bước đi nhỏ. Đó là một bước đầu để xem lộ trình thực sự hướng tới trừu tượng hóa tài khoản gốc thực sự có thể trông như thế nào trên Ethereum. Đã có khá nhiều cuộc tranh luận về cách các nhà phát triển nên thực hiện bước đầu tiên đó, và rất nhiều tranh cãi xung quanh việc EIP này được đưa vào cũng như thiết kế của nó — nhưng nó đã được đưa vào.

#### Các EIP của lớp đồng thuận (12:00) {#consensus-layer-eips-1200}

Có sáu EIP khác — đây là các EIP của lớp đồng thuận.

**EIP-7742** — tách rời số lượng khối dữ liệu giữa lớp đồng thuận và lớp thực thi. Đây là EIP gần đây nhất được đưa vào Pectra. Hiện tại, dung lượng khối dữ liệu được mã hóa cứng vào lớp thực thi và lớp đồng thuận trong tất cả các máy khách khác nhau. Việc cập nhật mã hóa cứng đó không dễ dàng như một số người có thể nghĩ. Việc tạo ra một cơ chế để thiết lập động dung lượng khối dữ liệu thông qua lớp đồng thuận sẽ đảm bảo rằng trong tương lai các nhà phát triển có thể dễ dàng thay đổi dung lượng khối dữ liệu của Ethereum, và một bản nâng cấp như vậy chỉ yêu cầu các thay đổi ở lớp đồng thuận — không phải thay đổi ở cả hai lớp.

**EIP-6110** — cung cấp các khoản tiền gửi của trình xác thực trên chuỗi. The Merge đã diễn ra và Ethereum đã trưởng thành hơn với tư cách là một Chuỗi khối Bằng chứng cổ phần (PoS). Một số giả định bảo mật nhất định hiện có thể được nới lỏng. EIP này loại bỏ một vòng bỏ phiếu bổ sung diễn ra ở phía lớp đồng thuận mỗi khi bạn gửi 32 ETH vào hợp đồng tiền gửi, đảm bảo tất cả việc xác thực tiền gửi diễn ra trên lớp thực thi. Điều này mang lại lợi ích cho trải nghiệm người dùng của trình xác thực — nó sẽ rút ngắn thời gian giữa lúc bạn gửi 32 ETH và lúc bạn thấy trình xác thực thực sự được kích hoạt trên Chuỗi Beacon.

**EIP-7002** — các khoản rút tiền có thể kích hoạt từ lớp thực thi. Điều này rất tốt cho các nhóm đặt cọc. Ngay bây giờ, nếu bạn muốn rút tiền hoàn toàn từ một trình xác thực, người vận hành nút điều hành trình xác thực đó cần sử dụng khóa rút tiền của họ để thoát hoàn toàn khỏi trình xác thực. Thông qua EIP này, các hợp đồng thông minh sẽ có thể khởi tạo các khoản rút tiền toàn bộ đó. Đó là một giả định tin cậy mà giờ đây bạn có thể loại bỏ khỏi các nhóm đặt cọc — những cái tên như Lido, Rocket Pool và các nhóm đặt cọc dựa trên hợp đồng thông minh khác giờ đây có thể kích hoạt việc rút tiền toàn bộ của các trình xác thực nếu họ muốn.

**EIP-7251** — tăng số dư hiệu dụng tối đa. Đây thực sự là một vấn đề. Khi các nhà phát triển đang suy nghĩ về Chuỗi Beacon, họ không ngờ tập hợp trình xác thực lại phát triển nhanh như vậy — chúng ta đang ở mức khoảng 1,2 hoặc 1,3 triệu trình xác thực. Có rất nhiều trình xác thực đang hoạt động, rất nhiều tin nhắn được truyền đi trên lớp mạng và điều đó là quá nhiều. Nó đang gây căng thẳng cho các nút, và nếu không được kiểm soát, nó sẽ là một vấn đề lớn đối với sức khỏe của Ethereum. EIP-7251 được thiết kế để khuyến khích các trình xác thực hợp nhất ETH của họ và có số dư hiệu dụng tối đa cao hơn 32 ETH, làm giảm số lượng trình xác thực đang hoạt động trên Ethereum.

**EIP-7549** — di chuyển chỉ số ủy ban ra ngoài chứng thực. Đây là việc tái cấu trúc và cấu trúc lại cách các chứng thực được tổng hợp để giảm tải mạng trên Ethereum và tiết kiệm băng thông của nút. Khi các nhà phát triển đưa điều này vào Pectra, họ nghĩ rằng đó là một thay đổi tuyệt vời với những lợi ích tuyệt vời và dễ dàng — nhưng trong thực tế, nó hóa ra khó triển khai hơn nhiều so với dự kiến.

#### Tóm tắt (17:19) {#summary-1719}

Pectra là một tập hợp các bản cập nhật hỗn hợp. Nó sẽ làm ba điều: thứ nhất, khắc phục những thiếu sót nghiêm trọng của Ethereum với tư cách là một Chuỗi khối Bằng chứng cổ phần (PoS) — hãy nghĩ về MaxEB, đó là một bản sửa lỗi quan trọng vì quy mô tập hợp trình xác thực có thể tiếp tục tăng lên mà không được kiểm soát. Thứ hai, cải thiện trải nghiệm người dùng — loại giao dịch mới, thiết kế linh hoạt hơn, một số cải tiến cho các thiết kế không cần tin cậy hơn cho các nhóm đặt cọc. Và thứ ba, tăng Tính khả dụng của dữ liệu của Ethereum — điều đó chưa được chính thức đưa vào Pectra nhưng có vẻ rất khả thi.

#### Các EIP đã bị loại khỏi Pectra (18:02) {#eips-removed-from-pectra-1802}

Dưới đây là tất cả các EIP đã bị loại khỏi Pectra. Đây là lần đầu tiên một bản nâng cấp có nhiều EIP bị loại bỏ như vậy.

**PeerDAS** — ban đầu sẽ có một sự gia tăng lớn hơn nhiều đối với Tính khả dụng của dữ liệu trong Pectra. PeerDAS sẽ cho phép các nhà phát triển tăng mục tiêu khối dữ liệu của Ethereum lên gấp nhiều lần mà không ảnh hưởng lớn đến mức tiêu thụ băng thông và yêu cầu tính toán của việc chạy một nút Ethereum. Nhưng nó vẫn đang trong giai đoạn nghiên cứu và phát triển.

**EOF** — Định dạng Đối tượng EVM. Mười một thay đổi mã này dưới dạng một gói là một bản cập nhật lớn cho EVM của Ethereum. Cả PeerDAS và EOF ban đầu thực sự được đưa vào Pectra nhưng đang được thử nghiệm trên các mạng phát triển riêng biệt. Các nhà phát triển nghĩ rằng họ sẽ cần nhiều thời gian hơn nữa để sẵn sàng cho sự kích hoạt Mạng chính, và họ không muốn trì hoãn các EIP khác của Pectra. Vì vậy, họ nói rằng PeerDAS và EOF rõ ràng cần thêm thời gian — họ sẽ đẩy chúng sang một bản nâng cấp khác và không kìm hãm các EIP khác của Pectra lên Mạng chính.

Những thứ này hiện đã được chuyển sang Fusaka. Verkle ban đầu được dự kiến cho Fusaka nhưng kể từ đó đã bị trì hoãn thêm. EOF và PeerDAS hiện đang ở trong Fusaka. Có những EIP khác mà các nhà phát triển sẽ xem xét lại để đưa vào Fusaka — quá trình chuyển đổi SSZ, danh sách bao gồm, các thay đổi đối với việc phát hành, hết hạn lịch sử, ePBS và hướng đi của trừu tượng hóa tài khoản.

#### Hỏi & Đáp (22:02) {#qa-2202}

**Người dẫn chương trình:** Khi nào có EOF?

**Christine Kim:** Tôi vừa mới nói rằng các nhà phát triển sẽ cố gắng đưa nó vào Fusaka. Tôi có nghĩ rằng điều đó có khả năng xảy ra không? Có lẽ là không. Tôi có nghĩ rằng Fusaka sẽ diễn ra vào năm 2025 không? Chắc chắn là không. Khoảng thời gian cần thiết để chuẩn bị cho Pectra — Fusaka sẽ mất một khoảng thời gian tương tự nếu không muốn nói là lâu hơn.

**Người dẫn chương trình:** Có con đường khẩn cấp nào để tăng mục tiêu khối dữ liệu từ nay cho đến sự kích hoạt Pectra không?

**Christine Kim:** Không. Mục tiêu khối dữ liệu là một tham số được mã hóa cứng trong lớp thực thi và lớp đồng thuận. Để dung lượng khối dữ liệu thay đổi, các nhà phát triển cần thực hiện một Phân nhánh cứng. Tôi không nghĩ rằng có bất kỳ cách nào để dung lượng khối dữ liệu tăng lên từ nay cho đến Pectra mà không có Phân nhánh cứng.

**Người dẫn chương trình:** Đề xuất này chỉ thay đổi giới hạn khối dữ liệu hay cả mục tiêu khối dữ liệu?

**Christine Kim:** Câu hỏi rất hay. Mức tăng thận trọng nhất là từ ba lên bốn — chỉ thay đổi mục tiêu, hoàn toàn không thay đổi mức tối đa. Nhưng đó không phải là những gì các nhà phát triển lớp 2 (l2) đã yêu cầu. Có một đại diện của nhóm Base — nhóm Base của Coinbase — và anh ấy đã và đang tranh giành những mức tăng mạnh mẽ hơn. Anh ấy đã đưa ra dữ liệu để cho thấy rằng sự gia tăng sẽ không tác động tiêu cực đến sự phi tập trung của Ethereum. Có một đề xuất thận trọng là chỉ thay đổi mục tiêu, và sau đó có một đề xuất tham vọng hơn là thay đổi cả mức tối đa và mục tiêu — như tám và bốn, hoặc sáu và mười hai. Có nhiều mức độ khác nhau.

**Người dẫn chương trình:** Bạn đã thúc giục mọi người tham gia nhiều hơn vào Quản trị. Làm thế nào cộng đồng có thể tham gia nhiều hơn?

**Christine Kim:** ETH Research và ETH Magicians là hai diễn đàn thảo luận thực sự tuyệt vời để ủng hộ các EIP nhất định và thể hiện sự ủng hộ của bạn. Các cuộc gọi ACD có lẽ là nơi có tín hiệu cao nhất — tất cả những gì bạn phải làm là để lại bình luận trên chương trình nghị sự của cuộc gọi ACD trên GitHub và nói rằng đây là một EIP mà bạn muốn nói đến hoặc trình bày. Người điều hành cuộc gọi thường rất sẵn lòng dành thời gian cho bạn. Tuy nhiên, đừng chiếm quá nhiều thời gian — có thể là năm phút để nói lên ý kiến của bạn.