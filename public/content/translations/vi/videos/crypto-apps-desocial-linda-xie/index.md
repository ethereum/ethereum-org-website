---
title: "Các ứng dụng tiền mã hóa và mạng xã hội phi tập trung"
description: "Linda Xie nói về các nền tảng mạng xã hội phi tập trung được xây dựng trên Ethereum, bao gồm đồ thị xã hội mở, ví nhúng, mini app trên Farcaster và những thách thức tăng trưởng mà các mạng xã hội tiền mã hóa đang phải đối mặt."
lang: vi
youtubeId: "4vl8eZEOwqk"
uploadDate: 2025-03-10
duration: "0:29:14"
educationLevel: beginner
topic:
  - "mạng xã hội"
  - "phi tập trung"
  - "dapp"
format: presentation
author: Ethereum Foundation
breadcrumb: "Ứng dụng tiền mã hóa & Mạng xã hội phi tập trung"
---

Một bài thuyết trình của **Linda Xie** tại Devconnect về mạng xã hội phi tập trung. Linda trình bày lý do tại sao người dùng và nhà sáng tạo được hưởng lợi từ các đồ thị xã hội mở, cách các ví nhúng và mini app tạo ra những trải nghiệm mới trên Farcaster, những thách thức thực tế đối với việc áp dụng, và phần Hỏi & Đáp với khán giả.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=4vl8eZEOwqk) được xuất bản bởi Tổ chức Ethereum. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Vấn đề với mạng xã hội tập trung (0:00) {#the-problem-with-centralized-social-000}

Tôi đã làm việc trong không gian tiền mã hóa được 11 năm nay và hiện đang ở trong đội ngũ Farcaster. Trước đó, tôi đã xây dựng các ứng dụng trên Farcaster. Vì vậy, tôi thực sự đam mê tiền mã hóa và mạng xã hội phi tập trung cũng như những gì nó có thể mang lại cho xã hội.

Tôi nghĩ sẽ rất hữu ích nếu trước tiên chúng ta định hình các vấn đề với mạng xã hội truyền thống hiện nay. Tôi nghĩ tất cả chúng ta đều từng gặp phải một vấn đề tương tự, đó là bạn bắt đầu trên một nền tảng và sau đó bạn phải tạo một tài khoản trên một nền tảng khác và bắt đầu lại hoàn toàn từ con số không. Trong kịch bản đó, khán giả của bạn thực chất thuộc về chính nền tảng. Và khi bạn bị đuổi khỏi một nền tảng hoặc nền tảng đó bị một quốc gia cấm, bạn sẽ không còn quyền truy cập vào bất kỳ kênh phân phối khán giả nào của mình nữa. Việc người dùng và nhà sáng tạo nội dung có thể duy trì quyền tiếp cận khán giả của họ là điều thực sự quan trọng.

Và cuối cùng, nếu tài khoản và dữ liệu thuộc sở hữu của nền tảng, điều đó có nghĩa là một khi bản thân công ty đóng cửa, bạn sẽ không thể truy cập vào thông tin đó. Chúng ta đã thấy điều đó lặp đi lặp lại. Ở Mỹ, chúng ta đã thấy TikTok có nguy cơ bị cấm và rất nhiều nhà sáng tạo đã lo ngại về điều đó. Có rất nhiều quốc gia nơi nhiều nền tảng trong số này tự cấm chính mình. Vì vậy, đây là một vấn đề mà mọi người thực sự trải qua hàng ngày.

#### Đồ thị xã hội mở (1:30) {#open-social-graphs-130}

Một trong những lợi ích của mạng xã hội phi tập trung là bạn có thể truy cập vào đồ thị xã hội (social graph) tại bất kỳ thời điểm nào. Bạn không cần bất kỳ sự cho phép nào để sử dụng dữ liệu này. Điều thực sự tuyệt vời là bạn thấy ở dưới cùng đây có một đồ thị xã hội mở. Tất cả dữ liệu này có thể được trích xuất bởi bất kỳ máy khách (client) nào, bất kỳ nhà phát triển nào, bất kỳ nền tảng nào, và bạn có thể sử dụng dữ liệu này để xây dựng trên nền tảng đó.

Một ví dụ tuyệt vời — bạn có ứng dụng Farcaster và sau đó bạn cũng có ứng dụng Base do Coinbase xây dựng. Bạn có số lượng người theo dõi tương tự nhau, với một chút khác biệt vì mỗi máy khách có bộ lọc thư rác riêng. Nhưng tôi đã có thể xây dựng lượng người theo dõi trên Farcaster, ngay lập tức bắt đầu sử dụng ứng dụng Base và tôi không phải bắt đầu lại từ đầu. Đó là một khoảnh khắc thực sự kỳ diệu khi bạn trải nghiệm nó. Và điều đó cũng sẽ tương tự đối với tất cả các máy khách Farcaster khác — Zapper, Uno và một vài máy khách khác.

Khi bạn quyết định sử dụng nền tảng này, bạn không còn phải bắt đầu lại từ đầu. Bạn có thể giữ lại khán giả của riêng mình. Bạn đăng bài một lần và sau đó bạn có thể phân phối bài viết trên nhiều máy khách trong mạng lưới. Bạn có thể là người dùng Farcaster và vẫn nhận được nhiều lượt phân phối hơn thông qua ứng dụng Base khi họ đang tiếp nhận người dùng và nhà sáng tạo mới. Đây rốt cuộc là trải nghiệm người dùng tốt nhất. Và các máy khách hiện đang cạnh tranh để giành lấy những người dùng này vì chi phí chuyển đổi thực sự thấp — bạn không phải bắt đầu lại từ đầu, bạn giữ được khán giả của mình, và vì vậy các máy khách phải cạnh tranh để xây dựng trải nghiệm người dùng tốt hơn.

#### Lợi ích cho các nhà phát triển (3:13) {#benefits-for-builders-313}

Sau đó, bạn cũng có khía cạnh người xây dựng, nơi những người xây dựng liên tục bị đuổi khỏi các nền tảng. Chúng ta đã thấy điều đó với Twitter — họ đang đuổi rất nhiều ứng dụng và người xây dựng tiền mã hóa, và đó là một điểm lỗi duy nhất (single point of failure) đối với các công ty của họ. Bankr gần đây trong cùng một ngày đã bị đuổi khỏi Twitter và Telegram. May mắn thay, họ đã được khôi phục vài ngày sau đó, nhưng điều đó thực sự cho thấy có những điểm lỗi duy nhất này. Nếu bạn là một người xây dựng dành toàn bộ thời gian và nguồn lực của mình để cố gắng xây dựng ứng dụng, thì việc bị cắt đứt kênh phân phối ngay lập tức là một trải nghiệm cực kỳ đau đớn.

Trong quá khứ, chúng ta cũng đã thấy các ứng dụng như Reddit thay đổi giá API của họ và đột nhiên việc vận hành doanh nghiệp của bạn trở nên cực kỳ đắt đỏ. Nhiều ứng dụng trước đây đã phải đóng cửa vì họ không còn đủ khả năng chi trả để hoạt động theo mức giá API mới của Reddit. Đã có một làn sóng phẫn nộ lớn về điều đó trong cộng đồng. Điều này cứ lặp đi lặp lại với các nền tảng này. Họ có thể đuổi bạn vì những lý do tùy tiện. Họ không cần phải nói lý do chính xác mà họ đuổi bạn. Và nếu họ chỉ xem bạn là một đối thủ cạnh tranh, họ có thể xóa bạn khỏi nền tảng. Cá nhân tôi đã nói chuyện với một số đội ngũ từng trực tiếp trải qua điều đó.

Một điều thực sự tuyệt vời về mạng xã hội phi tập trung là giống như việc bạn với tư cách là người dùng có thể đăng bài một lần trên mạng lưới, bạn cũng có thể xây dựng trên mạng lưới mà không cần cấp phép. Các nhà phát triển có thể xây dựng không cần cấp phép mà không phải đến từng nền tảng và hỏi: "Này, tôi có được phép xây dựng trên nền tảng của bạn không?" Tôi vừa ở gian hàng Farcaster hồi sáng nay và mọi người hỏi cách đưa họ vào danh sách trắng (whitelist) để xây dựng trên Farcaster, và tôi chỉ cần nói rằng, nó không cần cấp phép — bạn có thể sử dụng bất kỳ dữ liệu nào trong số này, tích hợp trực tiếp vào ứng dụng của bạn và bạn không cần phải nói chuyện với đội ngũ. Đó là tương lai của cách mọi thứ nên được xây dựng.

Bạn có thể thấy ở đây — tôi đã đăng một trò chơi ô chữ có tên là Miniword. Mỗi ngày mọi người đều thi đấu trên trò chơi này giống như trò chơi ô chữ của New York Times. Tôi đăng một lần trên Farcaster, nó cũng xuất hiện trên ứng dụng Base và tất cả các máy khách khác. Bạn có thể nhận được sự thúc đẩy phân phối đó với tư cách là một người xây dựng. Nếu tôi chạm để mở mini app, tôi có thể bắt đầu tương tác với nó, và vì dữ liệu xã hội là không cần cấp phép để tận dụng, bạn có thể lấy tất cả thời gian của những người khác nhau trên mạng lưới và mọi người có thể cạnh tranh để giành điểm số cao nhất. Nó trở thành một trải nghiệm mang tính xã hội hơn so với việc chỉ tự mình giải một câu đố, và bạn có thể đạt được tính lan truyền (virality) cao hơn bằng cách tận dụng đồ thị xã hội.

#### Tiền mã hóa và ví nhúng (6:30) {#crypto-and-embedded-wallets-630}

Mạng xã hội phi tập trung đã tồn tại — chúng ta đã thấy điều đó với Bluesky và họ đã làm rất tốt việc thu hút người dùng khi các nền tảng bị cấm ở các quốc gia khác nhau. Tuy nhiên, điều thực sự đặc biệt là khi bạn kết hợp tiền mã hóa và mạng xã hội phi tập trung, bởi vì giờ đây bạn đang tạo ra những trải nghiệm mà bạn sẽ không bao giờ có được trên một nền tảng truyền thống. Đó là điều mà đội ngũ của chúng tôi đang thực sự hướng tới.

Mỗi người dùng trên Farcaster đều có một địa chỉ tiền mã hóa theo mặc định. Trong ứng dụng Farcaster, bạn có một ví nhúng (embedded wallet) nơi người dùng có thể dễ dàng gửi và nhận tiền cho những người khác trên mạng lưới. Rõ ràng, đó là tiền mã hóa, vì vậy bạn chỉ cần dán một địa chỉ và gửi tiền cho mọi người từ bất kỳ đâu trên thế giới. Đó là điều làm cho tiền mã hóa trở nên đặc biệt và độc đáo. Bằng cách kết hợp điều đó với các đồ thị xã hội mở, chúng tôi cảm thấy điều này sẽ dẫn đến làn sóng tăng trưởng tiếp theo trong không gian mạng xã hội phi tập trung.

Người dùng cũng có thể tương tác với các mini app trên chuỗi vì họ có ví nhúng của mình. Bạn có thể thấy ở đây có một mini app eSIM được xây dựng tại ETH Global — ở Argentina hoặc bất kỳ quốc gia nào khác, bạn có thể mua eSIM, thanh toán bằng USDC bằng ví nhúng của mình và đó thực sự là một trải nghiệm liền mạch. Giờ đây, bạn có thể xây dựng các ứng dụng chưa từng tồn tại trước đây.

Bạn cũng có thể có các tác nhân (agent) tương tác trong bảng tin (feed). Nếu bạn thực sự tin vào tương lai của các tác nhân này, nơi có rất nhiều tác nhân tương tác với nhau, thì tiền mã hóa là nguồn tự nhiên mà họ sử dụng để gửi tiền qua lại cho nhau. Bạn không cần phải điều phối các địa chỉ hoặc cách ai đó được trả tiền — bạn tự động biết địa chỉ của người dùng, bạn có tất cả thông tin, không quan trọng họ sống ở đâu trên thế giới. Bạn có thể tương tác trực tiếp với họ. Tôi thực sự tin rằng tiền mã hóa, các tác nhân và đồ thị xã hội mở sẽ đóng một vai trò lớn hơn nhiều.

#### Tặng tiền boa vi mô (8:36) {#micro-tipping-836}

Một trong những ví dụ yêu thích của tôi về điều thực sự độc đáo của các đồ thị xã hội mở trong tiền mã hóa là tặng tiền boa vi mô (micro-tipping). Trong những ngày đầu của tiền mã hóa, mọi người luôn nói về việc sẽ tuyệt vời như thế nào nếu có thể tặng tiền boa vi mô — nếu bạn là một nhà sáng tạo đăng nội dung thực sự tuyệt vời, bạn có thể gửi một số tiền thực sự nhỏ cho nhà sáng tạo đó. Tôi từng sử dụng những ứng dụng tặng tiền boa Bitcoin thời kỳ đầu này. Nhưng vấn đề trong những ngày đầu là việc gửi những khoản tiền thực sự nhỏ lại khá chậm và đắt đỏ.

Giờ đây, bạn có khả năng gửi các giao dịch trị giá một xu hoặc thậm chí thấp hơn nhờ vào các L2 và mức độ rẻ cũng như nhanh chóng của nó. Có những ứng dụng như Tipin và Noise cho phép bạn tự động tặng tiền boa cho mọi tương tác — theo dõi, đăng lại (recast), thích một bài đăng, trả lời. Bạn có thể thiết lập một hạn mức cho số tiền bạn muốn cho đi. Trong trường hợp của tôi, tôi đã thiết lập một xu cho mỗi lần tôi thích bài đăng của ai đó, và trong nền, điều đó tự động diễn ra. Mỗi khi tôi thích nội dung trên mạng lưới, tôi tự động gửi một xu cho người dùng đó.

Bạn có thể xem lịch sử hoạt động ví của tôi — tôi đang gửi tiền cho những người dùng khác trên mạng lưới và tôi cũng đang nhận tiền từ những người dùng khác đã thiết lập các hạn mức này. Thậm chí có những giao dịch dưới một xu, đây là một khái niệm khá điên rồ. Đây là những người sống trên khắp thế giới. Nếu bạn hoàn toàn mới với tiền mã hóa và bạn tham gia Farcaster, bạn có một ví theo mặc định. Khi bạn bắt đầu đăng nội dung chất lượng cao, mọi người có thể bắt đầu tự động tặng tiền boa cho bạn và bạn có thể tích lũy số dư mà không bao giờ phải mua tiền mã hóa. Tôi đã nói chuyện với rất nhiều người dùng, họ nói rằng đây thực sự là số tiền mã hóa đầu tiên họ kiếm được nhờ tạo nội dung hoặc tương tác với các mini app.

#### Mini app và các công cụ sáng tạo (11:01) {#mini-apps-and-creative-tools-1101}

Một trong những mini app yêu thích của tôi thể hiện rất tốt việc sử dụng ví nhúng, các giao dịch tiền mã hóa và đồ thị xã hội mở là Emerge, do Atown và đội ngũ xây dựng. Nó cho phép các nhà sáng tạo tập hợp một câu lệnh (prompt) để biến đổi ảnh đại diện của bạn thành một phiên bản nào đó của câu lệnh. Đây là một ví dụ — Peachy, một nhà sáng tạo rất nổi tiếng trên mạng lưới, đã viết một câu lệnh để biến đổi ảnh đại diện thành các lá bài tarot. Tôi đã có thể tạo ra một hình ảnh bằng ảnh đại diện của mình và chia sẻ mini app để những người khác quan tâm có thể tự tạo hình ảnh của riêng họ. Có các bảng xếp hạng xem câu lệnh nào hoạt động thực sự tốt. Nếu bạn là một người sáng tạo, bạn có thể tạo các câu lệnh của riêng mình và bắt đầu kiếm tiền — tôi đã trả 25 xu cho giao dịch câu lệnh này, và 418 người dùng khác cũng đã tạo ra nó, vì vậy Peachy đang kiếm được tiền nhờ tạo ra nội dung này, và nó có thể lan truyền trong bảng tin.

#### Hiện tượng Warplet (12:41) {#the-warplet-phenomenon-1241}

Chúng tôi thực sự đã có một trong những ngày có lượng người dùng hoạt động hàng ngày cao nhất trên Farcaster nhờ vào sự lan truyền xảy ra gần đây. Đầu tiên, chúng tôi có linh vật không chính thức này của Farcaster tên là Warplet. Dan, người đồng sáng lập Farcaster, đã tạo ra nó. Đội ngũ — bao gồm cả tôi — có lẽ không nghĩ rằng nó đủ dễ thương để làm linh vật chính thức, vì vậy anh ấy đã phát hành nó cho cộng đồng và nói rằng mọi người có thể làm bất cứ điều gì họ muốn với nó.

Một nhà phát triển tên là Angel đã lấy nó và quyết định xây dựng một mini app nơi bạn có thể đúc một phiên bản của sinh vật Warplet này kết hợp với DNA từ ảnh đại diện của chính bạn. NishProf đã chia sẻ Warplet tùy chỉnh từ ảnh đại diện của cô ấy — và hơn 49.000 tài khoản đã tạo ra Warplet của họ. Nó đã hoàn toàn trở nên lan truyền. Angel đã có thể kiếm được gần 100.000 đô la từ việc tạo ra mini app này chỉ trong vài ngày. Điều đó thực sự cho thấy rằng khi bạn có một ví nhúng nơi bất kỳ ai cũng có thể dễ dàng thực hiện giao dịch, bạn có thể kiếm tiền với tư cách là một người xây dựng nhờ việc xây dựng các ứng dụng trở nên lan truyền trong bảng tin xã hội.

Điều cũng thực sự thú vị để chứng kiến là văn hóa phối lại (remix) khác nhau. Những người xây dựng đã nói rằng: "Được rồi, bây giờ mỗi người đều có Warplet của mình, vậy hãy xây dựng các trò chơi và trải nghiệm thú vị trên đó." Đã có bảng xếp hạng "Warplet nào xấu nhất?" và "một Warplet con sẽ trông như thế nào nếu bạn kết hợp hai con này?" Tất cả những trò chơi thú vị này đã được tạo ra trên mạng lưới, điều này cho thấy rằng khi bạn tận dụng đồ thị xã hội, bạn có thể tạo ra một trải nghiệm hấp dẫn hơn nhiều với tư cách là một nhà phát triển ứng dụng.

#### Mini app vì lợi ích xã hội (15:02) {#mini-apps-for-social-good-1502}

Đây là một ví dụ về một mini app — thực ra Horsefax trong đội ngũ đã xây dựng nó. Tôi nghĩ điều này thực sự quan trọng — bạn có thể hỗ trợ quỹ bào chữa pháp lý của Roman Storm. Chúng tôi đã sử dụng Daimo Pay, và bạn có thể thanh toán bằng bất kỳ token nào và đóng góp vào quỹ bào chữa pháp lý. Vì đây là một ví nhúng, bạn không bao giờ bị đẩy ra ngoài để sử dụng một ứng dụng khác. Bạn có thể ngay lập tức chia sẻ điều đó trong bảng tin của mình để nói với những người theo dõi rằng bạn đã đóng góp. Sau đó, họ có thể khám phá ứng dụng này và cũng tiếp tục quyên góp. Đây là một cơ chế để chia sẻ thêm các ứng dụng trong số những người theo dõi và khán giả mà mọi người đã tự xây dựng.

Đây là một ví dụ tương tự khác — một quỹ cộng đồng do Nicholas tại Seed Club xây dựng, giống như nền tảng GoFundMe hoặc Kickstarter. Bạn có thể thấy những người dùng khác nhau đã đóng góp. Bạn có thể chạm vào ví nhúng của mình và đóng góp tiền trực tiếp thông qua ứng dụng Farcaster. Bạn không bao giờ phải bị đẩy ra ngoài. Người tạo ra nó đã có thể huy động vượt xa mục tiêu của họ, và bạn có thể chia sẻ điều đó trong bảng tin của mình để tất cả những người theo dõi của bạn cũng có thể khám phá mini app này.

#### Những thách thức của mạng xã hội phi tập trung (16:41) {#challenges-of-decentralized-social-1641}

Tất cả những điều này thực sự tuyệt vời, và mạng xã hội phi tập trung nghe có vẻ rất hay, nhưng tôi muốn thực sự thành thật về những thách thức. Một điều cần lưu ý là nó còn nhỏ — rất nhỏ so với tất cả các nền tảng mạng xã hội truyền thống lớn này với lượng người dùng lên tới hàng tỷ và hàng trăm triệu.

Tuy nhiên, tôi thực sự muốn nhấn mạnh — tôi đã làm việc trong không gian tiền mã hóa được 11 năm nay, kể từ những ngày đầu của Bitcoin. Bạn có thể so sánh với một thứ gì đó như vàng — hãy nhìn xem Bitcoin đã tiến xa như thế nào. Bạn cũng có thể nhìn vào tài chính phi tập trung (DeFi) và tất cả tổng giá trị bị khóa (TVL) cũng như khối lượng hoán đổi và xem nó đã phát triển đến mức nào. Tất cả những điều đó đều rất khả thi nhờ vào cộng đồng, những người xây dựng và người dùng. Tôi tin tưởng mạnh mẽ rằng mạng xã hội sẽ trải qua một giai đoạn tăng trưởng khác trong không gian tiền mã hóa, bởi vì nó hoàn toàn hợp lý. Đó là một trải nghiệm tốt hơn cho người dùng, một trải nghiệm tốt hơn cho những người xây dựng, và giờ đây bạn có thể tạo ra những thứ chưa từng tồn tại trước đây. Khi tiền mã hóa trở nên phổ biến hơn, chúng tôi hy vọng sẽ phát triển cùng với nó.

Đặc biệt với Farcaster, chúng tôi nhận thấy mọi người thực sự đồng cảm với ví nhúng, vì vậy chúng tôi đang thực sự tập trung vào những tính năng đó. Việc tiếp nhận người dùng không sử dụng tiền mã hóa là điều mà bất kỳ ứng dụng tiền mã hóa nào cũng đang trải qua — nếu bạn là một người hoàn toàn mới, bạn phải hiểu ví là gì và cách giữ mọi thứ an toàn. Chúng tôi đã cải thiện rất nhiều kể từ những ngày đầu nhưng vẫn còn nhiều điều phải cải thiện so với trải nghiệm người tiêu dùng truyền thống.

Thư rác (spam) cũng là một vấn đề. Điều này cũng tồn tại trên các nền tảng mạng xã hội tập trung — bạn có thể trải nghiệm trên Twitter việc khó khăn như thế nào để phân biệt đâu là một tài khoản thật. Ở cấp độ Farcaster, bạn có thể có các dịch vụ chống thư rác giúp các máy khách thực hiện lọc ở cấp độ giao thức, hoặc một máy khách có thể tự thực hiện lọc thư rác của riêng mình.

Và sau đó là kiểm duyệt — cũng là một vấn đề và thách thức trong các nền tảng mạng xã hội truyền thống để đảm bảo người dùng có trải nghiệm tốt và khám phá nội dung mà họ thực sự quan tâm. Đây là những điều chúng tôi luôn tiếp tục nỗ lực giải quyết.

#### Tại sao lại là bây giờ? (19:48) {#why-now-1948}

Mạng xã hội phi tập trung đã tồn tại được một thời gian, nhưng tại sao lại là bây giờ? Tôi nghĩ đó là do tất cả các nguyên thủy (primitives) này đang kết hợp lại với nhau. Đầu tiên, bạn có các đồ thị xã hội mở mà bất kỳ ai cũng có thể sử dụng và tận dụng. Tôi luôn nói chuyện với các đội ngũ mà trước đây tôi thậm chí không hề biết — họ chỉ đang xây dựng các mini app Farcaster vì họ có thể tận dụng dữ liệu mà không cần đến chúng tôi.

Các L2 là một phần quan trọng của điều này, làm cho các giao dịch trở nên thực sự rẻ và nhanh chóng — bạn có thể thấy những trải nghiệm như tặng tiền boa vi mô mà chúng tôi đã chia sẻ trước đó. Ví nhúng cũng là chìa khóa — tôi thực sự muốn nhấn mạnh rằng chúng mang lại trải nghiệm tốt hơn nhiều như thế nào khi sử dụng các ứng dụng tiêu dùng. Rất nhiều người trong chúng ta đã trải qua việc bị đẩy ra ngoài một ứng dụng ví, phải được đưa trở lại, và đôi khi nó không hoạt động. Với ví nhúng, bạn đang ở trong trải nghiệm ứng dụng và có ít sự sụt giảm người dùng hơn nhiều.

Các khối xây dựng mới như mini app và các tác nhân là những thứ hoàn toàn mới mà bạn có thể sử dụng mà chúng ta chưa từng thấy ở quy mô lớn trước đây. Và một xu hướng lớn (meta) đang diễn ra bên ngoài tiền mã hóa là AI đã trở nên tốt hơn rất nhiều — giờ đây bạn có thể tạo ứng dụng bằng cách sử dụng các câu lệnh. Điều đó thực sự làm giảm chi phí và rào cản để mọi người thực sự xây dựng. Chúng tôi có các dịch vụ như Neynar cho phép bạn tạo các mini app Farcaster mà không cần phải là một nhà phát triển.

Tất cả những điều này sẽ diễn ra như thế nào — tôi nghĩ email là một sự so sánh rất hay. Khi bạn gửi email, bạn không cần phải tạo tài khoản AOL để nói chuyện với ai đó có email AOL. Bạn có thể sử dụng Gmail, Yahoo, Outlook, bất cứ thứ gì bạn muốn, và tất cả các bạn đều có thể giao tiếp với nhau ở cấp độ giao thức. Đó là cách tôi nghĩ mạng xã hội phi tập trung nên diễn ra — tất cả dữ liệu mạng lưới này, tất cả đồ thị xã hội này ở cấp độ giao thức, và mỗi máy khách có thể xây dựng trên đó với các tính năng cụ thể cho cơ sở người dùng của họ. Họ có thể có các thuật toán khác nhau, các tính năng khác nhau dựa trên những gì người dùng của họ thực sự thích.

Farcaster đang ngày càng dành nhiều thời gian hơn cho các tính năng giao dịch; nếu bạn không quan tâm đến điều đó, ứng dụng Base và Uno thực sự rất tuyệt vời trong việc giới thiệu các tính năng xã hội. Đó là cách mạng xã hội nên diễn ra trong dài hạn. Chúng ta còn một chặng đường dài phía trước, nhưng tôi thực sự nghĩ đây là tương lai mà mạng xã hội nên hướng tới.

#### Hỏi & Đáp (23:47) {#qa-2347}

**Người điều phối:** Cảm ơn bạn rất nhiều, Linda. Chúng ta có một số câu hỏi từ khán giả. Tôi nghĩ điều thực sự thú vị là trong thế giới thực, tôi có thể ra ngoài khu phố của mình và có rất nhiều điều tôi có thể làm một cách tự do. Các khu phố kỹ thuật số không phải lúc nào cũng giống như vậy, đó là lý do tại sao luận điểm về mạng xã hội phi tập trung rất hấp dẫn, đặc biệt là khi cuộc sống của chúng ta ngày càng trực tuyến nhiều hơn. Hiện đang có một sự chuyển dịch khi mọi người trên các nền tảng mạng xã hội tập trung cần chuyển sang các nền tảng mạng xã hội phi tập trung. Từ kinh nghiệm của bạn, làm thế nào chúng ta có thể làm cho quá trình di chuyển này dễ dàng hơn?

**Linda Xie:** Đó là một câu hỏi hay. Tôi nghĩ trách nhiệm của chúng ta là tạo ra những trải nghiệm tốt hơn những trải nghiệm truyền thống hiện có. Tiền mã hóa sẽ cho phép những điều mà bạn thực sự thậm chí không thể làm trên các nền tảng mạng xã hội truyền thống. Bạn đến để bắt đầu kiếm tiền mã hóa, bạn trải nghiệm tất cả các ứng dụng tiền mã hóa này được xây dựng trên nền tảng mạng xã hội tiền mã hóa. Vì vậy, đó là cách chúng tôi thu hút — nếu bạn là một người xây dựng thực sự tuyệt vời và bạn muốn phân phối, tiền mã hóa sẽ là cách bạn có thể kiếm tiền, và mạng xã hội sẽ là cách ứng dụng của bạn được phân phối. Với tư cách là người dùng, bạn có thể nhận được rất nhiều tiền boa vì đã đăng nội dung hay, điều mà bạn không nhận được trên các nền tảng truyền thống. Tôi chỉ nghĩ rằng bạn tạo ra một trải nghiệm tốt hơn.

**Người điều phối:** Farcaster gần đây đã mua lại Clanker, và điều đó cung cấp một nguồn doanh thu thay thế. Bạn nhìn nhận thế nào về quảng cáo trong một mạng xã hội phi tập trung như Farcaster?

**Linda Xie:** Mỗi máy khách có thể làm những gì họ muốn với cách họ đang kiếm tiền. Bạn thực sự có thể là một máy khách và quyết định sử dụng quảng cáo, nhưng sau đó các máy khách khác có thể quyết định đó không phải là con đường họ muốn đi và kiếm tiền theo một cách khác. Đặc biệt đối với ứng dụng Farcaster, chúng tôi có Farcaster Pro — mọi người có thể trả 120 đô la một năm để có quyền truy cập vào các tính năng bổ sung. Nhưng bất kỳ máy khách nào cũng có thể hoàn toàn dựa vào quảng cáo. Ứng dụng Base thậm chí còn có một số định dạng quảng cáo, đặc biệt là với việc mua lại Spindle. Vẻ đẹp của nó là mỗi máy khách có thể làm những gì họ muốn, nhưng chúng tôi không tích hợp quảng cáo vào cấp độ giao thức — các máy khách có thể quyết định bật nó lên.

**Người điều phối:** Một thuật ngữ chính mà chúng tôi thường sử dụng trong Tổ chức Ethereum hiện nay là tính phản xạ (reflexivity) — cách chúng tôi phản ứng với phản hồi từ người dùng cuối. Farcaster có tính phản xạ cao nhất vì bạn có những người tham gia mạng xã hội hàng ngày, những người dùng giao dịch bằng ví và những người xây dựng. Những nguyên tắc bạn tuân theo khi thu thập phản hồi từ cộng đồng của mình là gì?

**Linda Xie:** Thu thập phản hồi có lẽ là một trong những điều dễ dàng hơn trong cộng đồng vì mọi người rất thẳng thắn và họ có thể đăng những gì họ muốn thấy. Chúng tôi cũng nhắn tin trực tiếp (DM) cho mọi người. Một điều tuyệt vời về Farcaster là mọi người trên mạng lưới rất tốt bụng và luôn sẵn sàng giúp đỡ cũng như đưa ra phản hồi. Chúng tôi có tính năng nhắn tin trực tiếp ngay trong ứng dụng, vì vậy chúng tôi không chỉ có thể xem phản hồi mà mọi người đang đăng, chúng tôi còn có thể nhắn tin trực tiếp cho mọi người. Đội ngũ của chúng tôi phát hành (ship) liên tục — chúng tôi phát hành gần như hàng ngày — và chúng tôi thực sự muốn triển khai các tính năng mà mọi người quan tâm.

**Người điều phối:** Là một người đã gắn bó với tiền mã hóa trong một thời gian rất dài — điều gì giúp bạn tiếp tục? Bạn có lời khuyên nào cho một người mới bắt đầu khám phá ngay lúc này không?

**Linda Xie:** Tôi nghĩ hãy lùi lại một bước và nhận ra công nghệ này đáng kinh ngạc như thế nào. Tôi có thể sở hữu tiền của chính mình. Tôi có thể gửi cho bất kỳ ai khác trên thế giới và tôi không cần phải xin phép. Không có nền tảng tập trung nào lấy đi một khoản phí và phần trăm cắt cổ từ đó. Tất cả những công nghệ này mở rộng sang DeFi và mạng xã hội — hãy nghĩ xem loại công nghệ này có thể thay đổi cuộc sống như thế nào. Việc chúng ta có thể là một phần của tuyến đầu làm việc với công nghệ này thúc đẩy tôi mỗi ngày. Nó chứa đầy sự điên rồ và những thăng trầm, nhưng rốt cuộc, thật là một khoảnh khắc tuyệt vời khi chúng ta có thể dành thời gian làm việc với điều này. Tôi ước mình đã là một phần của những ngày đầu của internet, nhưng tôi rất may mắn khi có thể làm việc với tiền mã hóa.

**Người điều phối:** Cảm ơn bạn rất nhiều, Linda.