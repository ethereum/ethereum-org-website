---
title: "Vụ hack DAO: câu chuyện về Ethereum Classic"
description: "Câu chuyện về vụ hack DAO năm 2016 và cách phản ứng của cộng đồng đã dẫn đến việc tạo ra Ethereum Classic như một Chuỗi riêng biệt."
lang: vi
youtubeId: "rNeLuBOVe8A"
uploadDate: 2021-12-15
duration: "0:09:48"
educationLevel: beginner
topic:
  - "Quản trị"
  - "lịch sử"
  - "dao"
format: explainer
author: Junion
breadcrumb: "Vụ hack DAO"
---

Một video giải thích của **Junion** kể về câu chuyện của vụ hack DAO vào năm 2016, một trong những vụ trộm kỹ thuật số lớn nhất trong lịch sử tiền mã hóa, và cách quyết định gây tranh cãi của cộng đồng Ethereum về việc Phân nhánh Chuỗi khối đã dẫn đến sự ra đời của Ethereum Classic.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=rNeLuBOVe8A) được xuất bản bởi Junion. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Sự khám phá (0:00) {#the-discovery-000}

Hôm nay là thứ Hai, ngày 13 tháng 6 năm 2016. Một giáo sư khoa học máy tính tại Cornell đang kiểm tra mã nguồn của DAO, một trong những dự án tham vọng nhất trong không gian tiền mã hóa. Trong nhiều tháng, ông đã ủng hộ việc tạm dừng dự án, vì ông tin rằng có những lỗ hổng nhất định có thể gây nguy hiểm cho toàn bộ hệ thống. Nhưng hôm nay ông phát hiện ra một lỗ hổng nghiêm trọng: một lỗi ở dòng 666.

Ông lo sợ rằng lỗi này có thể cho phép một hacker thực hiện các khoản rút tiền không giới hạn giống như tại máy ATM. Ngay cả khi kẻ tấn công chỉ có 10 đô la trong Tài khoản của họ, họ vẫn có thể rút tiền lặp đi lặp lại cho đến khi hết sạch tiền. Có một phần tư tỷ đô la được đầu tư vào DAO, và từng xu đều đang gặp rủi ro.

Slock.it, công ty đứng sau DAO, thừa nhận khả năng bị khai thác nhưng tuyên bố rằng bất kỳ cuộc tấn công nào cũng là bất khả thi, vì vậy tất cả các khoản tiền vẫn an toàn. Họ thực hiện commit lên GitHub bằng cách hoán đổi hai dòng mã — một bản sửa lỗi sẽ được đưa vào như một phần của DAO Framework phiên bản 1.1.

Nhưng ngay khi đội ngũ đang tuyên bố chiến thắng, một hacker đã bí mật theo dõi từng bước đi của họ, phát triển một mã khai thác tận dụng chính xác lỗi này. Bây giờ là thứ Sáu, bốn ngày sau, và DAO vừa bị hack với số tiền lên tới 55 triệu đô la.

Giống như vụ hack SWIFT trị giá 81 triệu đô la đã công khai những lỗ hổng trong ngành ngân hàng tập trung, và cuộc tấn công mã độc tống tiền WannaCry đã tiết lộ những lỗ hổng nghiêm trọng trong các hệ điều hành máy tính, vụ hack DAO đã phơi bày sự mong manh ban đầu của bảo mật hợp đồng thông minh trong một thế giới nơi mã nguồn quyết định mọi thứ. Nó khiến cộng đồng Ethereum suy sụp khi họ phải cuống cuồng cố gắng giành lại quyền kiểm soát Chuỗi khối.

Đây là câu chuyện về một trong những vụ trộm kỹ thuật số lớn nhất từ trước đến nay và nỗ lực táo bạo nhằm viết lại lịch sử để nó chưa từng xảy ra.

#### DAO là gì? (2:00) {#what-was-the-dao-200}

Hãy đến với DAO — viết tắt của tổ chức tự trị phi tập trung (decentralized autonomous organization). Ý tưởng này được lấy cảm hứng từ việc gọi vốn cộng đồng. Thay vì nhiều quỹ cho các dự án khác nhau, sẽ có một quỹ duy nhất để quản lý tất cả, và không có cách nào tốt hơn để làm điều này ngoài một DAO.

Khi ra mắt, các nhà đầu tư sẽ nhận được 100 token DAO cho mỗi ether được nạp vào. Những token này mang lại cho họ quyền Quản trị đối với Giao thức và đại diện cho cổ phần của họ trong DAO. Những người nắm giữ token có thể gửi các đề xuất — ví dụ: bạn có thể đề xuất đầu tư một triệu đô la để đổi lấy 10% cổ phần trong công ty XYZ.

Khi một đề xuất vượt qua quá trình xác minh ban đầu, nó sẽ được tất cả các nhà đầu tư khác bỏ phiếu. Trong khoảng thời gian này, những người nắm giữ token có thể bỏ phiếu đồng ý nếu họ tin rằng khoản đầu tư mang lại giá trị kỳ vọng dương, hoặc không đồng ý nếu họ tin rằng nó mang lại giá trị kỳ vọng âm. Họ cũng có thể sử dụng diễn đàn để nêu ý kiến của mình và đọc ý kiến của người khác.

Khi thời gian bỏ phiếu kết thúc và đạt đủ túc số 20% của tất cả các token, DAO sẽ tự động chuyển số ether được chỉ định vào hợp đồng thông minh đại diện cho đề xuất đó. Bất kỳ ether nào được tạo ra từ các đề xuất này sau đó sẽ được trả lại cho kho bạc. Nó giống như một quỹ phòng hộ phi tập trung khổng lồ, được thiết kế để tạo ra lợi nhuận. Ý tưởng là trí tuệ của đám đông sẽ giúp tạo ra các cơ hội đầu tư tốt nhất.

Tuy nhiên, vẫn cần có một cách để bảo vệ thiểu số khỏi sự áp bức của đa số. Nếu một nhóm thiểu số kịch liệt phản đối một đề xuất mà họ không thể thắng thế trong cuộc bỏ phiếu, thay vì bỏ phiếu không, họ có thể gọi một hàm tách (split) và chuyển ether của họ từ DAO chính sang một DAO con, về cơ bản là chia DAO làm hai. Hàm tách này sẽ rất quan trọng về sau.

#### Gọi vốn cộng đồng (4:01) {#the-crowdfund-401}

DAO là dự án gọi vốn cộng đồng lớn nhất từ trước đến nay, huy động được 12,7 triệu ether — trị giá 150 triệu đô la vào thời điểm đó. Nó diễn ra trong kỷ nguyên sơ khai của Ethereum, nơi dự án phải chịu một lượng lớn sự cường điệu và tâm lý sợ bỏ lỡ (FOMO) của nhà đầu tư.

Trước đó, các dự án Ethereum chủ yếu chỉ là các bằng chứng khái niệm (proof of concept) tùy ý, nhưng đây là một dự án hoạt động đầy đủ với tiềm năng to lớn. Nó hoàn toàn an toàn trước bất kỳ vụ hack nào, được bảo mật bởi hàng triệu thợ đào trên toàn thế giới, và nó mang tính phi tập trung — toàn bộ dự án được tạo thành từ một loạt các hợp đồng thông minh trên Ethereum.

Đây là mã nguồn bất biến được lưu trữ trên máy tính an toàn nhất thế giới, đảm bảo các thuộc tính chính của một DAO: một tổ chức hoàn toàn phi tập trung và tự trị. Khi các hợp đồng được triển khai vào ngày 30 tháng 4, không một thực thể đơn lẻ nào — kể cả Slock.it — có thể thực hiện các thay đổi đối với Giao thức hoặc ngăn chặn sự tồn tại của nó. Mã nguồn của nó đã được kiểm toán vô số lần bởi nhiều nhà phát triển Ethereum khác nhau và mọi người đều có thể xem để đánh giá.

#### Vụ hack (5:02) {#the-hack-502}

"Lonely, so lonely" — tên của Đề xuất DAO #59. Nó chỉ là một đề xuất tách bình thường, nhưng thực chất đó là nơi vụ hack bắt đầu. Sau khi hacker gửi đề xuất, có một khoảng thời gian tranh luận tiêu chuẩn kéo dài bảy ngày, nơi bất kỳ ai cũng có thể tự do tham gia. Tuy nhiên, không ai tham gia vào đợt tách này.

Theo quy trình tiêu chuẩn, một người có thể tự mình gọi hàm tách, tạo một DAO con, và sau đó tạo một đề xuất gửi tất cả ether trở lại Ví của họ. Điều này cho phép người dùng lấy lại tiền được bảo chứng bằng token DAO của họ. Bảy ngày đã trôi qua, và hacker hiện được phép gọi hàm tách. Không ai nghi ngờ điều gì.

Tuy nhiên, khi hàm tách được gọi, cộng đồng nhận ra một điều đáng báo động. ether đang bị rút cạn khỏi DAO với tốc độ tám triệu đô la một giờ. Cộng đồng cuống cuồng tìm hiểu xem chuyện gì đang xảy ra. Có vẻ như kẻ tấn công đang gọi đệ quy hàm tách — lặp đi lặp lại, hàng trăm lần.

Bạn còn nhớ bản sửa lỗi diễn ra bốn ngày trước không? Thật đáng tiếc là không có cách nào để chỉnh sửa mã của một hợp đồng thông minh sau khi nó được triển khai, vì vậy bản sửa lỗi này chỉ tồn tại trên GitHub như một phần của The DAO 1.1, một DAO hoàn toàn khác đang được xây dựng. Bản sửa lỗi nhỏ này có thể đã ngăn chặn toàn bộ sự việc — tất cả những gì nó làm là hoán đổi hai dòng mã để số dư được cập nhật trước khi khoản thanh toán thực tế diễn ra.

Nhưng nếu không có bản sửa lỗi này, bất kỳ ai cũng có thể liên tục gọi hàm để rút ether trước khi hợp đồng cập nhật số dư của họ. Nó giống như một máy ATM không thay đổi số dư của bạn cho đến khi nó đưa tiền cho bạn. "Tôi có thể rút mười đô la không? Khoan đã, trước đó, tôi có thể rút mười đô la không? Khoan đã, trước đó..."

#### Nhóm Robin Hood (6:55) {#the-robin-hood-group-655}

Những người nắm giữ token DAO chứng kiến các khoản đầu tư của họ đang dần bị rút cạn từ DAO chính sang DAO con, còn được gọi là dark DAO (DAO hắc ám). Ngoài ra, giá của Ethereum đã sụp đổ chớp nhoáng từ 20 đô la xuống còn 15 đô la sau tin tức này. Cần phải làm điều gì đó, và cách duy nhất là rút cạn phần còn lại trước khi hacker làm điều đó. Và thế là cuộc đua rút cạn bắt đầu.

Ở bên kia bán cầu, trong căn hộ của mình tại khu phố Copacabana của Rio de Janeiro, Alex Van de Sande thức dậy khi điện thoại của anh tràn ngập tin nhắn Skype. Anh quay sang vợ và nói: "Em có nhớ khi anh kể cho em nghe về đống tiền khổng lồ không thể bị hack đó không? Nó đã bị hack rồi."

Alex đã liên lạc với một số nhà phát triển giấu tên khác và họ thành lập một nhóm có biệt danh là Robin Hood — những hacker mũ trắng sẽ rút cạn số tiền còn lại và trả lại cho những chủ sở hữu hợp pháp. Tuy nhiên, họ không có thời gian để đề xuất một đợt tách mới, vì điều đó sẽ yêu cầu khoảng thời gian bỏ phiếu kéo dài bảy ngày.

Thay vào đó, họ nhắm đến Đề xuất #71, dự kiến sẽ kết thúc trong vài giờ tới. Họ sẽ tham gia vào đợt tách đó và sử dụng cùng một cách hack để hút tất cả số tiền còn lại vào DAO con này. Sáu giờ đã trôi qua kể từ khi cuộc tấn công bắt đầu, và tên trộm đã đánh cắp được 30% số ether của DAO. Nhưng vì một lý do không xác định nào đó, cuộc tấn công đã ngừng hoạt động. Các giao dịch thất bại và mọi thứ đã chấm dứt.

Trong khi đó, Alex vừa chuẩn bị khởi động cuộc tấn công mũ trắng để bảo vệ 70% số tiền còn lại. Nhưng đột nhiên anh bị mất kết nối internet. Chỉ còn 30 phút nữa, anh điên cuồng gọi cho NET, nhà cung cấp dịch vụ internet tại Brazil của mình, nhưng chỉ nhận được câu trả lời từ một giọng nói tự động: "Chúng tôi thấy có sự cố internet trong khu vực của bạn." Đề xuất tách đã kết thúc và anh vừa bỏ lỡ cơ hội để thực hiện cuộc tấn công Robin Hood.

Sáng hôm sau, Alex cố gắng tập hợp lại nhóm để xâm nhập vào một đề xuất tách khác, nhưng những người khác đều bận. "Chúng tôi cảm thấy mình giống như những hacker tồi tệ nhất trong lịch sử. Chúng tôi đã bị cản trở bởi internet kém và các cam kết gia đình."

#### Cuộc đua rút cạn (9:10) {#the-race-to-empty-910}

Bốn ngày sau cuộc tấn công ban đầu, DAO lại bị tấn công. Nó đang bị rút cạn từ từ — vài ether mỗi vòng — nhưng nó đã tích lũy được vài nghìn đô la. Có vẻ như đây là từ một kẻ tấn công đang thử nghiệm. Tại thời điểm này, Robin Hood cần phải làm điều gì đó.

Họ chọn xâm nhập vào Đợt tách #78 vì họ đã xác định được người quản lý của đề xuất và nó sắp kết thúc. Họ đã liên hệ với một số cá voi (whale), những người rất sẵn lòng quyên góp token DAO của họ, cho phép nhóm đảm bảo được sáu triệu token. Hợp đồng Robin càng có nhiều token, nó càng có thể hút ether nhanh hơn. Kẻ tấn công đã tăng tốc và những kẻ tấn công khác cũng tham gia. Nhưng nhờ các khoản quyên góp, Robin Hood đã có thể vượt qua họ. Điều này cho phép họ bảo vệ được 7,2 triệu ether — 55% của DAO.

#### Phân nhánh (10:08) {#the-fork-1008}

DAO chính hiện đã bị rút cạn và tất cả số tiền được phân bổ trên một số DAO con — hai DAO chính là DAO mũ trắng và dark DAO. Nhưng tất cả số tiền đều bị khóa theo thời gian. Không có đề xuất nào có thể được đưa ra dưới một DAO con cho đến khi thời gian chờ 27 ngày kết thúc. Và ngay cả sau đó, việc gửi tiền đến một Địa chỉ bên ngoài yêu cầu phải gửi đề xuất và chờ đợi trong hai tuần. Về cơ bản, vẫn còn 41 ngày cho đến khi hacker có thể rút ra số tiền tương đương với 5% tổng nguồn cung của Ethereum.

Nhưng hacker sẽ không bao giờ được chạm vào số Ethereum của mình. Những gì xảy ra tiếp theo là một trong những tình tiết táo bạo và gây tranh cãi nhất trong lịch sử Chuỗi khối. Cộng đồng quyết định họ sẽ không để hacker chiến thắng. Họ muốn viết lại lịch sử để mọi giao dịch liên quan đến vụ hack đều bị hoàn tác, và mọi người sẽ lấy lại được tiền của mình. Họ đã chọn Phân nhánh Ethereum.

Một Chuỗi khối giống như một danh sách các giao dịch tiếp tục phát triển với mỗi khối được khai thác. Mọi giao dịch đều được khắc sâu vào Chuỗi khối mãi mãi. Nhưng nếu hơn 50% thợ đào thông đồng, họ có thể thay đổi sai lệch Chuỗi khối, viết lại lịch sử theo bất kỳ cách nào họ muốn. Thông thường, điều này được gọi là cuộc tấn công 51%. Nhưng không có gì ác ý về đợt Phân nhánh này — cộng đồng chỉ đang đòi lại số tiền đã bị đánh cắp từ họ.

#### Mã nguồn là luật (11:48) {#code-is-law-1148}

Tuy nhiên, không phải ai cũng đồng tình với đợt Phân nhánh được đề xuất. Họ lập luận rằng mã nguồn là luật. Theo quan điểm này, kẻ tấn công không giống một hacker mà giống một luật sư thông minh đã đọc kỹ các điều khoản của một hợp đồng. Do đó, không có khoản tiền nào thực sự bị đánh cắp và họ hoàn toàn có quyền hợp pháp đối với số ether từ dark DAO.

Điều quan trọng cần lưu ý là bản thân Ethereum chưa bao giờ thực sự bị hack — đó chỉ là một hợp đồng thông minh được viết kém bị khai thác. Hai điều hoàn toàn khác nhau. Ngoài ra, họ tin rằng những điều xảy ra trên Chuỗi khối là bất biến và không bao giờ được can thiệp bất kể tình huống nào.

Một ngày sau cuộc tấn công ban đầu, kẻ tấn công đã gửi một bức thư ngỏ trong nhóm chat Slack của DAO, được ký bằng khóa riêng tư của họ:

"Gửi tới DAO và cộng đồng Ethereum: Tôi đã kiểm tra cẩn thận mã nguồn của The DAO và đã yêu cầu bồi thường hợp pháp 3 triệu ether, và muốn cảm ơn DAO vì phần thưởng này. Tôi thất vọng với những người đang mô tả việc sử dụng tính năng có chủ ý này là 'trộm cắp'. Tôi đang sử dụng tính năng được mã hóa rõ ràng này theo các điều khoản của hợp đồng thông minh. Một đợt phân nhánh mềm hoặc Phân nhánh cứng sẽ tương đương với việc tịch thu số ether hợp pháp và chính đáng của tôi. Một đợt Phân nhánh như vậy sẽ vĩnh viễn và không thể vãn hồi phá hủy mọi niềm tin không chỉ vào Ethereum mà còn vào lĩnh vực hợp đồng thông minh và công nghệ Chuỗi khối. Đừng nhầm lẫn: bất kỳ đợt Phân nhánh nào, dù mềm hay cứng, sẽ làm tổn hại thêm Ethereum và phá hủy danh tiếng cũng như sức hấp dẫn của nó."

Sau khi kiểm tra kỹ hơn, mọi người nhận ra rằng chữ ký không hợp lệ, vì vậy bức thư này chỉ được viết bởi một người tự xưng là kẻ tấn công.

Mặt khác, những người ủng hộ lập luận rằng "mã nguồn là luật" là một tuyên bố quá quyết liệt và con người nên có tiếng nói cuối cùng thông qua sự đồng thuận xã hội. Hacker không được phép trục lợi từ việc khai thác vì điều đó là sai trái về mặt đạo đức và rất có thể là bất hợp pháp. Nhưng quan trọng nhất, DAO đơn giản là quá lớn để có thể sụp đổ. Nó nắm giữ khoảng 15% tổng nguồn cung của ether.

#### Ethereum Classic (14:34) {#ethereum-classic-1434}

Trong một sự kiện gợi nhớ đến cuộc khủng hoảng tài chính năm 2008, các nhà phát triển Ethereum đã giải cứu DAO. Vitalik Buterin, người sáng tạo và nhà phát triển chính của Ethereum, đã không hề hối lỗi về việc thúc đẩy một đợt Phân nhánh. Trong một cuộc phỏng vấn, sau này anh nói: "Một số người dùng Bitcoin coi Phân nhánh cứng theo một cách nào đó là vi phạm các giá trị cơ bản nhất của họ. Cá nhân tôi nghĩ rằng những giá trị cơ bản này, khi bị đẩy đến mức cực đoan như vậy, thật là ngớ ngẩn."

Những quan điểm này đã chi phối phần lớn cộng đồng Ethereum. Một cuộc bỏ phiếu cộng đồng gây tranh cãi — nơi một ether bằng một phiếu bầu — cho thấy 87% ủng hộ việc Phân nhánh. Vì vậy, tại khối 1.920.000, các nút máy tính trên toàn thế giới đã cập nhật phần mềm của họ và chấp nhận đợt Phân nhánh. Tất cả ether từ DAO và các DAO con đã được chuyển đến một hợp đồng hoàn tiền.

Nhưng mọi chuyện không kết thúc ở đó. Chuỗi khối Ethereum ban đầu — Chuỗi có vụ hack DAO — vẫn tiếp tục hoạt động. Trên thực tế, nó đang phát triển. Những thợ đào phản đối đợt Phân nhánh tiếp tục khai thác các khối và các giao dịch vẫn đang được thực hiện. Ngày hôm sau, Poloniex đã niêm yết đồng tiền này và nó bắt đầu giao dịch ở mức 2 đô la mỗi đồng. Chuỗi này được biết đến với tên gọi Ethereum Classic — Chuỗi khối nguyên bản, không bị thay đổi.

Nếu bạn nắm giữ ether trước đợt Phân nhánh, bây giờ bạn sẽ có một Ethereum và một Ethereum Classic. Nếu bạn nắm giữ một ether trong DAO, bạn sẽ có thể rút một Ethereum từ hợp đồng hoàn tiền. Và nếu bạn vừa hack DAO, bạn sẽ kiếm được một gia tài kha khá bằng Ethereum Classic — khoảng bảy triệu đô la.

#### Di sản của DAO (16:14) {#legacy-of-the-dao-1614}

Ban đầu, Ethereum Classic đã đạt được động lực như một giải pháp thay thế, với một cộng đồng vững mạnh gồm những người theo chủ nghĩa cơ bản về Chuỗi khối, những người không đồng ý với gói cứu trợ. Nhưng kể từ đó, Ethereum Classic đã không thể thu hút được sự chú ý và chỉ thực sự tồn tại như một ý tưởng với ít tiện ích. Trong khi Ethereum là ngôi nhà của hàng ngàn Giao thức, Ethereum Classic chỉ có một vài Giao thức cơ bản. Rõ ràng là đợt Phân nhánh đã chiến thắng.

Hai tháng sau, Robin Hood đã chuyển 2,9 triệu Ethereum Classic của họ sang Poloniex và bán tất cả để lấy Ethereum trong nỗ lực bán phá giá. 14% đã được chuyển đổi thành công, nhưng 86% đã bị Poloniex đóng băng và trả lại cho nhóm. Robin Hood đã thiết lập một hợp đồng hoàn tiền trên mạng lưới Ethereum Classic cho những người dùng bị ảnh hưởng bởi vụ hack DAO.

Về phần hacker, họ đã rời đi với 3,6 triệu Ethereum Classic — trị giá 150 triệu đô la ngày nay. Nhưng nếu không có đợt Phân nhánh, 3,6 triệu Ethereum đó sẽ trị giá hơn bảy tỷ đô la ngày nay.

#### Tác động lâu dài của DAO (17:26) {#the-daos-lasting-impact-1726}

Điều quan trọng cần lưu ý là DAO hiện nay thường được gọi là Genesis DAO để tránh nhầm lẫn, vì nó là DAO đầu tiên nhưng chắc chắn không phải là DAO cuối cùng. Bất chấp những thất bại ban đầu, các DAO ngày càng trở nên phổ biến hơn. MakerDAO Quản trị stablecoin DAI, và các Giao thức tài chính phi tập trung (DeFi) như Uniswap với token UNI của nó thường có một DAO Quản trị. Tất cả các DAO này đều được xây dựng từ kinh nghiệm của các dự án trước đó để tạo ra các tổ chức linh hoạt và thành công hơn nữa.

Nhưng Genesis DAO là tổ chức đầu tiên thuộc loại hình này, được tạo ra như một thử nghiệm — một thử nghiệm đắt giá — kiểm soát 250 triệu đô la ở thời kỳ đỉnh cao, tương đương 15% tổng nguồn cung của Ethereum. Christoph Jentzsch, nhà phát triển chính, chỉ mong đợi nó huy động được năm triệu đô la và sau đó nói rằng anh hối hận vì đã không giới hạn mức trần. Đối với một thử nghiệm lớn như vậy, nó đã diễn ra quá sớm và chắc chắn là quá lớn để có thể sụp đổ.

Việc tạo ra một hợp đồng thông minh giống như phát triển một chiếc xe tự lái — đó là một trách nhiệm lớn đòi hỏi phải thử nghiệm rộng rãi để tránh tai nạn. Ngay cả với sự thận trọng mới này, các Giao thức DeFi vẫn bị hack với số tiền lên tới 50 triệu đô la, một số thậm chí sau khi đã được kiểm toán bởi các công ty kiểm toán chuyên nghiệp. Nhưng kể từ vụ hack DAO, đã không còn gói cứu trợ nào nữa. Cộng đồng Ethereum hiện đã mạnh mẽ hơn và sẵn sàng chuyển sang các dự án thậm chí còn lớn hơn và tham vọng hơn, xây dựng thế hệ ứng dụng kỹ thuật số tiếp theo.