---
title: "Ngăn xếp quyền riêng tư Ethereum: đọc riêng tư, mạng lưới và rò rỉ tiềm ẩn"
description: "Andy Guzman giải thích cách siêu dữ liệu bị rò rỉ khi ví đọc dữ liệu từ Ethereum, và cách nghiên cứu về đọc riêng tư và mạng lưới trong lộ trình quyền riêng tư giúp khắc phục rò rỉ ở lớp truy cập."
lang: vi
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Ngăn xếp quyền riêng tư Ethereum"
---

Một bài nói chuyện của **Andy Guzman**, trưởng nhóm Privacy Stewards of Ethereum (PSE) tại Tổ chức Ethereum, tại EthBoulder 2026. Ông vạch trần một điểm mù lớn trong quyền riêng tư Ethereum: ngay cả những người dùng không bao giờ ký một giao dịch nào cũng rò rỉ dữ liệu hành vi chi tiết thông qua các truy vấn hàng ngày. Ông giới thiệu ngăn xếp quyền riêng tư Ethereum, bao gồm đọc riêng tư (PIR), quyền riêng tư lưu lượng (định tuyến củ hành và mixnet), và các công việc về hiệu suất như cây nhị phân hợp nhất và trạng thái có thể xác minh bằng ZK.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=tvAqDJXCBaA) được xuất bản bởi EthBoulder. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Bức thư hư cấu từ nhà cung cấp RPC (0:12) {#the-fictional-rpc-provider-letter-012}

Chào mọi người, tôi là Andy, và tôi muốn giới thiệu một chủ đề không thường được thảo luận trong hệ sinh thái Ethereum nhưng lại cực kỳ quan trọng. Như bạn có thể đã nhận thấy từ slide và phần giới thiệu, nó liên quan đến quyền riêng tư, và cách chúng ta đang không được bảo vệ đầy đủ mà thậm chí không hề hay biết.

Hãy để tôi bắt đầu bằng một bức thư mà ai đó đã viết cho bạn.

"Kính gửi người dùng quý giá, cảm ơn bạn vì 847 truy vấn bạn đã thực hiện trong tháng này. Chúng tôi thực sự rất vui khi được biết bạn. Chúng tôi biết rằng bạn đang giữ ETH trên ba ví khác nhau. Chúng tôi biết rằng bạn đã kiểm tra giá ETH 94 lần vào thứ Ba tuần trước. Đó là một ngày rất khó khăn đối với tất cả mọi người, vì vậy chúng tôi không phán xét gì cả. Bạn cũng đã kiểm tra giá BTC, điều này khá thú vị, vì bạn không giữ bất kỳ Bitcoin nào. Bạn đang nghĩ đến việc đa dạng hóa danh mục đầu tư sao? Điều đó sẽ là bí mật giữa chúng ta, và tất nhiên là cả các đối tác phân tích của chúng tôi nữa. Bạn cũng đang theo dõi rất sát sao hai pool Uniswap, và bạn đã kiểm tra hệ số sức khỏe Aave của mình 14 lần vào tuần trước. Bạn có thể muốn thư giãn một chút, hoặc chỉ cần thêm một số tài sản thế chấp. Vào thứ Năm, bạn đã kiểm tra nó ba lần trong vòng 12 phút, và bạn đã rất lo lắng. Bạn đã xem xét bốn tên ENS khác nhau, vì vậy hoặc là bạn đang bắt đầu một dự án mới hoặc bạn đang gặp khủng hoảng danh tính. Và bạn luôn im lặng từ 11 giờ đêm đến 7 giờ sáng theo giờ Miền núi (Mountain time)."

#### Cách bạn rò rỉ dữ liệu mà không cần ký giao dịch (1:34) {#how-you-leak-data-without-signing-transactions-134}

"Vì vậy, chúng tôi khá tự tin rằng bạn đang sống ở Boulder, hoặc gần đó. Bạn chưa bao giờ ký một giao dịch nào thông qua chúng tôi. Bạn chưa bao giờ phải làm thế. Sự tò mò của bạn đã nói cho chúng tôi biết mọi thứ. Thân mến, nhà cung cấp RPC của bạn."

Tất nhiên đây là một bức thư hư cấu, nhưng nó mô tả một điều mà chúng ta thực sự rò rỉ mỗi ngày. Ngay cả khi bạn không thực hiện một giao dịch nào hoặc bất kỳ hành động trên chuỗi nào, về cơ bản bạn đang kể mọi thứ cho bất kỳ công ty phân tích nào muốn nhúng tay vào dữ liệu đó và các hành vi của bạn.

#### Ghi riêng tư so với đọc riêng tư (2:07) {#private-writes-vs-private-reads-207}

Vậy điều gì đang thực sự diễn ra trong thế giới quyền riêng tư hiện nay? Tôi thấy rằng chúng ta đặt rất nhiều trọng tâm vào quyền riêng tư trên chuỗi, hay những gì chúng tôi tại PSE gọi là ghi riêng tư: tất cả các hành động mà bạn thực hiện trên chuỗi. Và điều đó là hợp lý, phải không? Những hành động đó được ghi lại mãi mãi và truyền đi khắp thế giới, vì vậy việc không rò rỉ địa chỉ của bạn với một hành động cụ thể là hoàn toàn hợp lý. Chúng ta cũng đặt nhiều trọng tâm vào công cụ: nguồn dữ liệu, bằng chứng, DSL và các ngôn ngữ mà chúng ta có thể sử dụng để cung cấp cho các nhà phát triển nhiều công cụ hơn nhằm thể hiện và xây dựng các ứng dụng mạnh mẽ hơn có nhiều quyền riêng tư hơn trên chuỗi.

Nhưng tôi muốn lập luận trong bài thuyết trình này rằng chúng ta chưa dành đủ sự chú ý và nỗ lực cho các lĩnh vực khác này: những gì chúng tôi gọi là đọc riêng tư, bởi vì bất cứ khi nào bạn truy vấn dữ liệu từ một chuỗi khối, bạn đang rò rỉ rất nhiều thông tin, và mạng lưới riêng tư, bởi vì ngay cả trước khi bất cứ điều gì đến được trên chuỗi, toàn bộ lưu lượng truy cập của bạn đã bị rò rỉ.

Nói một chút về mặt kỹ thuật: tất cả các lệnh gọi RPC, như eth_getBalance, eth_call và eth_getLogs, đều là các yêu cầu dưới dạng văn bản thuần túy được gửi đến các nhà cung cấp RPC và được liên kết với IP của bạn.

#### Tại sao nhiều hoạt động hơn lại làm tăng rủi ro bị lập hồ sơ (3:20) {#why-more-activity-increases-profiling-risk-320}

Với thông tin này, việc lập hồ sơ mọi người, phân khúc họ và lập mô hình hành vi trở nên rất dễ dàng. Và điều này có thể được sử dụng để chống lại bạn. Như bạn có thể tưởng tượng, thông tin là sức mạnh, và người ta càng có nhiều thông tin về bạn và hành vi của bạn, họ càng có nhiều quyền lực đối với bạn.

Hầu hết mọi người không nhận ra điều này. Hầu hết mọi người sẽ nói, ồ, chà, điều đó không thực sự quan trọng vì đây không phải là thông tin quan trọng. Hoặc họ có thể nghĩ: càng có nhiều hoạt động, tôi sẽ càng được bảo vệ. Điều này hoàn toàn không đúng, và đi ngược lại với trực giác. Đối với các hành động trên chuỗi, bất cứ nơi nào có các tập ẩn danh, nó thực sự hữu ích: càng nhiều người dùng, càng có nhiều quyền riêng tư và càng dễ hòa nhập. Nhưng với việc đọc thì ngược lại, bởi vì các truy vấn không thể hoán đổi cho nhau. Bạn càng truyền nhiều hoạt động, bạn càng thực hiện nhiều hành động, bề mặt tương quan càng phong phú và càng dễ dàng xây dựng hồ sơ về các hành động của bạn.

Vì vậy, bất cứ khi nào có cơn sốt tài chính phi tập trung (DeFi) hoặc sự điên rồ của NFT, mọi người trở nên cẩu thả hơn. OpSec, tất nhiên, bị ném ra ngoài cửa sổ, và việc gỡ bỏ tính ẩn danh của mọi người dựa trên các mô hình hoạt động mà hầu hết mọi người rơi vào trở nên dễ dàng hơn rất nhiều.

#### Giới thiệu ngăn xếp quyền riêng tư Ethereum (4:43) {#introducing-the-ethereum-privacy-stack-443}

Tôi muốn bắt đầu với bối cảnh: chúng ta nên tấn công vào đâu, cần những gì và ai đang làm việc gì. Bài nói chuyện này sẽ đi sâu vào một số chủ đề kỹ thuật hơn và một số chủ đề khái niệm cấp cao hơn, để mọi người đều có thể rút ra được một số giá trị từ nó.

Tôi muốn trình bày những gì tôi gọi là ngăn xếp quyền riêng tư Ethereum, hoặc các lớp của ngăn xếp quyền riêng tư Ethereum, và tôi nghĩ điều này rất hữu ích để suy luận. Nếu chúng ta thực sự muốn quyền riêng tư, chúng ta không chỉ cần quyền riêng tư trên chuỗi; chúng ta cũng cần quyền riêng tư trong tất cả các lớp này của ngăn xếp, tương tự như vòng đời của một giao dịch, hoặc mô hình OSI và các lớp công nghệ của nó. Tôi cho rằng chúng ta có thể tạo ra một tiêu chuẩn, hoặc một dạng công nhận trên toàn hệ sinh thái, rằng các lớp này tồn tại. Có thể đây không phải là hình thức cuối cùng, nhưng tôi nghĩ nó được cho là đã hữu ích rồi.

#### Từng lớp một: nơi bạn bị rò rỉ (5:41) {#layer-by-layer-where-you-leak-541}

Trên cùng là lớp ứng dụng. Tất nhiên, bất cứ khi nào bạn truy cập một trang web, bạn đang rò rỉ những gì bạn đang truy cập và mọi người có thể bắt đầu lập hồ sơ: các tập ẩn danh, thông tin xác thực, liên kết IP của bạn với những gì bạn đang truy cập, ngay cả khi bạn không làm gì cả.

Tiếp theo là lớp ví. Bất cứ khi nào bạn thực hiện một hành động, bạn không chỉ rò rỉ thông tin cho lớp ứng dụng mà còn cho các cổng kết nối. Các ví hiện nay rất phức tạp, chúng tích hợp với nhiều hệ thống và dịch vụ khác, và bạn rò rỉ nhiều thông tin hơn bạn tưởng tượng. Ngay cả khi bạn chỉ mở ví của mình và nó truy vấn giá ETH hoặc số dư của bạn, bạn đang rò rỉ mọi thứ.

Sau đó, bạn có các cổng kết nối: các RPC, các proxy, các relayer. Bạn lại rò rỉ thêm siêu dữ liệu. Sau đó là những gì mọi người sẽ tưởng tượng là yếu tố trên chuỗi, đó là bất cứ khi nào mọi thứ được truy vấn trên EVM, như trạng thái hoặc các mô hình thực thi. Ví dụ: truy vấn số dư của một thứ gì đó hoặc trạng thái của một hợp đồng thông minh. Và cuối cùng là sự đồng thuận, nơi có tất cả các trình xác thực. Tùy thuộc vào việc bạn đang ghi trên chuỗi hay đọc trên chuỗi, bạn cũng có thể chạm vào mempool.

Và có một chiều dọc khác, đó là những gì chúng tôi gọi là mạng lưới, mang tính xuyên suốt, cắt ngang tất cả các lớp này. Ví dụ: ngay bây giờ bạn truy cập một trang web và máy chủ biết IP của bạn. Nhưng điều gì sẽ xảy ra nếu bạn truy cập trang web đó thông qua Tor hoặc một mạng ẩn danh khác? Bạn sẽ biết địa chỉ IP của trang web, nhưng họ sẽ không biết địa chỉ IP của bạn. Và điều gì sẽ xảy ra nếu trang web đó được lưu trữ ở một quốc gia gần đây đã bắt đầu kiểm duyệt tất cả mọi thứ về tiền mã hóa? Trang web và công ty đó cũng sẽ muốn ẩn IP của họ và muốn ẩn tên miền của họ đằng sau một tên miền củ hành.

Đó là những loại điều có ý nghĩa: chúng ta cần đi từng lớp một, củng cố mọi thứ, phân tích qua lăng kính của một kẻ tấn công rất phá hoại muốn kiểm duyệt mọi thứ. Ngay cả khi chúng ta không làm điều đó, và chúng ta nói rằng chúng ta đang sống trong một trạng thái đủ tốt, thông tin này hiện đang được ghi lại và sẽ được lưu trữ mãi mãi bởi rất nhiều người mà bạn thậm chí không biết, các công ty bắt đầu bán dữ liệu của bạn. Cuối cùng, trong năm năm nữa, ai đó có thể cấm tiền mã hóa và nói, "bất kỳ ai đã sử dụng Uniswap trong năm năm qua, tôi là IRS, tôi sẽ bắt đầu gõ cửa và tống bạn vào tù," hoặc bất cứ điều gì. Những kịch bản đen tối này đang xảy ra ở các quốc gia khác nhau trên thế giới ngay lúc này.

#### Đọc riêng tư và mạng lưới riêng tư (8:24) {#private-reads-and-private-networking-824}

Được rồi, vậy là chúng ta có ngăn xếp quyền riêng tư Ethereum. Chúng ta nên tập trung vào đâu? Trong bài thuyết trình này, tôi muốn nói về hai lĩnh vực này. Đọc riêng tư: bất cứ khi nào bạn truy cập trạng thái từ trên chuỗi, bạn chạm vào tất cả các lớp này, từ ứng dụng, giả sử tôi muốn truy vấn giá ETH, đến ví, đến các cổng kết nối, đến một nút đang chạy Ethereum và EVM, và sau đó quay lại. Về cơ bản là một nhà cung cấp RPC hoặc một trình lập chỉ số. Và mạng lưới riêng tư, đó là tất cả các hành động xảy ra trên lớp mạng lưới. Đây là những gì chúng ta muốn củng cố.

#### Ba trụ cột: dữ liệu, lưu lượng, hiệu suất (9:05) {#three-pillars-data-traffic-performance-905}

Có ba trụ cột mà tôi nghĩ là rất quan trọng để chúng ta đạt được điều này. Chúng ta muốn ẩn và làm cho bản thân dữ liệu trở nên riêng tư. Chúng ta muốn ẩn và làm cho bản thân lưu lượng truy cập trở nên riêng tư. Và sau đó chúng ta muốn làm cho nó có hiệu suất cao, hữu ích, thiết thực và rẻ. Điều này tóm tắt rất nhiều thông tin về những điều đang diễn ra trong hệ sinh thái, nhưng tôi nghĩ nó hữu ích để vẽ ra bức tranh toàn cảnh và xác định các điểm đòn bẩy nơi chúng ta có thể tăng tốc.

#### Ẩn dữ liệu: từ proxy đến PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

Vậy, dữ liệu. Chúng ta muốn bảo vệ điều gì? Chúng ta muốn ẩn thông tin mà bạn đang yêu cầu các máy chủ này, và chúng ta muốn ẩn các mô hình về cách bạn truy cập dữ liệu này. Không chỉ nội dung mà còn cả các mô hình.

Có các cấp độ kỹ thuật khác nhau. Đầu tiên là không có gì: bạn chỉ rò rỉ mọi thứ. Bất cứ khi nào bạn kết nối ví của mình, bạn liên kết địa chỉ IP của mình với hợp đồng mà bạn đang truy vấn, với một eth_getBalance cụ thể cho một địa chỉ cụ thể, và thế là xong. Ngay cả khi bạn đang sử dụng một giao thức quyền riêng tư, giả sử là Tornado Cash, và bạn muốn truy vấn trạng thái của cây Merkle, bạn hoặc phải tải xuống toàn bộ cây, điều này không có hiệu suất cao lắm, hoặc bạn rò rỉ đường dẫn và các lá mà bạn đang truy vấn, làm giảm tập ẩn danh của bạn. Vì vậy, ngay cả việc sử dụng một giao thức quyền riêng tư mạnh mẽ như Tornado Cash cũng không đủ nếu bạn không bảo vệ mạng lưới và các mô hình truy cập dữ liệu của mình.

Cấp độ tiếp theo là một số loại proxy hoặc relayer: rất nhiều máy không biết yêu cầu đến từ đâu và cuối cùng truy xuất dữ liệu. Điều đó không thực tế lắm, và không hoàn toàn không cần tin cậy.

Sau đó, bạn có TEE, đây là một bước tiến, và đây là nơi một số nhóm và công ty đang cung cấp dịch vụ. Tôi nghĩ đây là một bước tiến tốt nhưng chưa đủ, một lần nữa vì chi phí tấn công và làm hỏng TEE đang giảm rất nhiều. Đối với một số trường hợp sử dụng quan trọng nhất định, điều này là không đủ; đối với nhiều trường hợp sử dụng hàng ngày, nó có thể đủ.

Có những nhóm khác đang làm việc trên OMAP, các mô hình truy cập bản đồ không nhận biết, và ORAM, RAM không nhận biết. Đây là những kỹ thuật tương tự cố gắng làm xáo trộn những phần nào của tập dữ liệu mà bạn đang cố gắng truy cập. Thay vì nói "Tôi muốn số dư từ địa chỉ ETH này," bạn đang truy cập ngẫu nhiên vào những thứ khác nhau, vì vậy máy chủ không biết.

Và tôi cho rằng kết cục của những thứ này sẽ là PIR, truy xuất thông tin riêng tư, có nghĩa là máy chủ không biết bạn đang truy vấn điều gì và không tìm hiểu được bất cứ điều gì về nó.

#### Giải thích về Truy xuất Thông tin Riêng tư (12:03) {#private-information-retrieval-explained-1203}

Truy xuất thông tin riêng tư là một kỹ thuật siêu mạnh mẽ trong mật mã học, và nó sẽ được sử dụng rất nhiều. Có hai biến thể: PIR chỉ số, mà bạn có thể sử dụng nếu bạn có dữ liệu có cấu trúc dưới một chỉ số, và PIR từ khóa, nơi, như tên gọi của nó, bạn truy vấn theo từ khóa. Rất khó để có một sơ đồ hoạt động cho mọi thứ.

Trạng thái Ethereum rất lớn và rất đa dạng. Các nhật ký, tôi mới biết hôm qua, là chỉ nối thêm, nhưng mô hình tài khoản thì khác: một số trạng thái được cập nhật rất thường xuyên, một số thì không. Tùy thuộc vào cách bạn cắt và chia nhỏ nó, bạn có thể có hàng megabyte, gigabyte hoặc terabyte dữ liệu, với các mô hình truy cập rất khác nhau.

#### Kiến trúc PIR đa tác nhân (12:48) {#a-multi-agent-pir-architecture-1248}

Đề xuất mà chúng tôi đang thực hiện trong PSE, và ở đây tôi sẽ nói về mặt khái niệm và sau đó về các dự án cụ thể mà chúng tôi đang thực hiện tại PSE và những thứ khác mà tôi đang thấy trong hệ sinh thái, là một kiến trúc đa tác nhân. Không có một sơ đồ duy nhất nào hoàn hảo cho tất cả trạng thái Ethereum. Nhưng nếu chúng ta có thể cắt nhỏ trạng thái Ethereum theo loại hoặc theo mô hình truy cập, chúng ta có thể tìm thấy các sơ đồ rất tốt cho từng loại.

Điều gì sẽ xảy ra nếu chúng ta có một dịch vụ chạy kiến trúc đa tác nhân này, và tùy thuộc vào loại truy vấn và vị trí của chúng trong trạng thái Ethereum, nó chạy sơ đồ này hoặc sơ đồ khác? Điều đó đã đưa chúng ta đến rất gần với một thứ gì đó khả thi, có khả năng sản xuất và có thể cung cấp cho hệ sinh thái. Điều này sẽ yêu cầu một thứ gì đó giống như một API thống nhất, để các ví, trình lập chỉ số, người dùng và nhà phát triển ứng dụng phi tập trung (dapp) không cần phải lo lắng về việc sơ đồ nào được sử dụng và cách gọi nó. Bạn chỉ cần có API tiêu chuẩn, và người khác sẽ lo lắng về các chi tiết triển khai.

Chúng tôi đã và đang làm điều này và triển khai hai sơ đồ khác nhau. Chúng tôi sẽ mở các khoản tài trợ, và chúng tôi đang cố gắng điều phối nhiều người hơn trong hệ sinh thái để giải quyết một số vấn đề này và xem những vấn đề nào là cần thiết nhất cho Ethereum.

Dưới đây là một vài con số về các sơ đồ PIR khác nhau: thông lượng, chi phí giao tiếp, v.v. Thật khó, bởi vì các ứng dụng khác nhau có các mô hình truy cập khác nhau. Một số truy cập rất nhiều biên lai, một số muốn truy cập nhiều trạng thái hơn, như Rotki, và một số truy cập nhiều giao dịch hơn, như Helios. Không có viên đạn bạc nào cả, và rất có thể một kiến trúc hỗn hợp sẽ hữu ích. Chúng tôi cũng đang thực hiện hệ thống hóa kiến thức, vì vậy nếu điều này thú vị với bạn, chúng tôi có thể chia sẻ nó. Và đây chỉ là một số nhóm đang làm việc trong các lĩnh vực này. Xin thứ lỗi nếu bạn là thành viên của một nhóm và tôi đã không đưa bạn vào; nếu ai đó xem bản ghi và thấy thiếu, vui lòng cho tôi biết và tôi có thể bắt đầu thêm bạn vào.

#### Ẩn lưu lượng: định tuyến củ hành và Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Chúng ta đã đề cập đến dữ liệu. Nhóm lớn khác là lưu lượng truy cập. Làm thế nào để chúng ta ẩn lưu lượng truy cập, và chúng ta muốn ẩn điều gì? Nói một cách rất đơn giản, chúng ta muốn ẩn IP của máy khách và máy chủ với nhau, và với phần còn lại của thế giới có thể đang rình mò lưu lượng truy cập. Chúng ta có các kỹ thuật khác nhau: dịch vụ củ hành, mixnet, VPN, DC-net, và có thể có các phân loại khác. Tôi sẽ chỉ nói về hai kỹ thuật đầu tiên.

Các kỹ thuật định tuyến củ hành mã hóa theo từng lớp, và lưu lượng truy cập cũng được giải mã theo từng lớp. Những người ở giữa không bao giờ có thể biết nguồn gốc, một số không bao giờ có thể biết đích đến, và một số không bao giờ biết được bất cứ điều gì; họ chỉ đóng vai trò là bộ định tuyến.

Tóm lại là: điều gì sẽ xảy ra nếu tất cả lưu lượng truy cập của hệ sinh thái Ethereum có thể được định tuyến qua mạng Tor, có thể nói như vậy? Cũng có những lựa chọn khác. Chúng ta sẽ giúp bảo vệ IP của người gửi: điện thoại hoặc máy tính xách tay của bạn sẽ không bị rò rỉ khi bạn đang gửi giao dịch hoặc yêu cầu thông tin. Và tất nhiên chúng ta cũng sẽ bảo vệ người nhận, máy chủ. Hãy tưởng tượng rằng ở Iran, Trung Quốc, Triều Tiên hoặc Venezuela, ai đó đang cố gắng lưu trữ một giao thức tài chính phi tập trung (DeFi) hoặc một dịch vụ và nó bị quốc gia của họ kiểm duyệt. Đây là một lựa chọn có thể bảo vệ mạng sống của họ. Nó vượt qua sự kiểm duyệt và cũng ẩn lưu lượng truy cập khỏi các ISP, nhà cung cấp dịch vụ internet, mà tất cả chúng ta đều biết là bị các cơ quan tình báo nghe lén mọi thứ.

Mục tiêu là có một sự thay thế trực tiếp: một SDK, để các ví, nhà phát triển ứng dụng phi tập trung (dapp) và nhà cung cấp cơ sở hạ tầng không cần phải lo lắng về các chi tiết triển khai. Họ chỉ biết rằng nếu họ sử dụng SDK này, lưu lượng truy cập sẽ được định tuyến củ hành, mã hóa và củng cố.

Có một nhóm mà tôi muốn tuyên dương, nhóm Brume Wallet, những người đã bắt đầu Echalote, một bản triển khai mã nguồn mở của Tor cho web. Điều này hiện đang tồn tại: có các máy khách Tor, nhưng chúng được viết bằng C và chúng cần chạy trong một trình duyệt đặc biệt. Điều gì sẽ xảy ra nếu tôi muốn thêm tính năng này vào MetaMask, hoặc vào ví Kohaku, hoặc vào Ambire, Rabby và tất cả những ví khác? Chúng ta cần các SDK JavaScript, và đó là những gì Echalote đã bắt đầu.

Sau đó, Tor Project có một bản triển khai mới đang được phát triển có tên là Arti, thế hệ tiếp theo của máy khách của họ. Nhưng chúng ta cần một Arti nhúng. Arti dựa trên Rust và nó cần được biên dịch sang WASM để có thể chạy trong trình duyệt của bạn, vì vậy bạn có thể nhập nó thực sự dễ dàng. Về cơ bản, chúng tôi có sự hợp tác với nhóm Tor: các cuộc gọi mỗi tuần, và một số dự án và quan hệ đối tác cùng nhau.

#### Mixnet cho Ethereum (18:16) {#mixnets-for-ethereum-1816}

Về phía mixnet, tôi muốn tuyên dương một số nhóm đang tiếp cận vấn đề này: nhóm Nym; HOPR, cũng là một trong những nhóm đầu tiên; các VPN như Gnosis VPN; và một vài nhóm khác mới đối với tôi, như Anyone Protocol, và tôi nghĩ ai đó từ nhóm đó nên có mặt ở đây tại Denver, cộng với một số nhóm mới khác. Có nhiều nhóm đang làm việc trên mixnet, VPN và các phương pháp tiếp cận khác.

Chúng ta muốn xem: điều gì sẽ xảy ra nếu chúng ta tạo ra một mixnet được xây dựng có mục đích cho Ethereum, nơi chúng ta có thể định tuyến lưu lượng RPC? Mixnet có những đảm bảo mạnh mẽ, nhưng chúng làm tăng thêm rất nhiều độ trễ. Đối với một số trường hợp sử dụng, điều đó không sao: không quan trọng nếu mất nhiều thời gian hơn một chút, miễn là bạn có quyền riêng tư. Nhưng đối với những thứ như tài chính phi tập trung (DeFi) và giao dịch, rất khó có khả năng những thứ này sẽ được áp dụng nếu chúng làm tăng độ trễ. Vậy, tốc độ nhanh nhất mà chúng ta có thể chạy với các đảm bảo quyền riêng tư cao nhất là bao nhiêu? Một lần nữa, xin tuyên dương một số nhóm này, và nếu ai đó đang làm việc trong các lĩnh vực này và tôi chưa thêm bạn vào, tôi rất muốn trò chuyện.

#### Hiệu suất: cây nhị phân hợp nhất và tăng tốc GPU (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

Điều cuối cùng tôi muốn nói đến, trụ cột thứ ba để biến điều này thành hiện thực, là hiệu suất. Chúng ta muốn những thứ này chạy nhanh và rẻ. Tôi có một nguyên tắc: những thứ này sẽ không được áp dụng nếu chi phí cao hơn lợi ích. Chi phí có nghĩa là trải nghiệm người dùng, thời gian và công sức của người dùng, nhưng cũng là chi phí cho các nhà phát triển và cơ sở hạ tầng: việc chạy cái này có đắt không? Chúng ta cần giảm chi phí càng nhiều càng tốt, và có hai sáng kiến cấp cao mà tôi có thể nói đến.

Một là UBT. Tùy thuộc vào mức độ bạn tham gia vào các EIP của giao thức, bạn có thể đã nghe nói về điều này. Hiện tại chúng ta có cây tiền tố Merkle Patricia, rất hữu ích, nhưng không hữu ích lắm cho ZK và các loại mật mã học khác. Có một đề xuất, EIP-7864, không chuyển sang cây Verkle mà chuyển sang cây nhị phân hợp nhất. Điều này hiệu quả hơn nhiều cho việc truy vấn trạng thái và sau đó thực hiện các hoạt động mật mã học như ZK ở trên cùng.

Chúng tôi có một dự án thực hiện UBT có thể xác minh: bạn thêm một sidecar vào bất kỳ máy khách Ethereum nào, thay vì chạy cơ sở dữ liệu MPT, nó có cơ sở dữ liệu trạng thái UBT, và sau đó bạn chứng minh rằng quá trình chuyển đổi từ MPT sang UBT này là hợp lệ bằng cách sử dụng zkVM. Điều này đã rất mạnh mẽ rồi. Một khi chúng ta quản lý để làm điều này, các máy khách nhẹ có thể sử dụng nó để tăng hiệu suất của chúng, và những thứ như PIR có thể chạy nhanh hơn nhiều.

Khía cạnh khác là tăng tốc GPU. Chúng ta có thể chạy những thứ này nhanh hơn nhiều nếu chúng ta tối ưu hóa các cấp độ thấp hơn của ngăn xếp: GPU là một, hoặc tăng tốc CPU cũng vậy. Những thứ này có thể sẽ chạy trên máy chủ, không phải trên điện thoại, vì vậy việc bắt đầu khám phá cách chúng ta có thể tạo ra các thư viện cấp thấp này để chạy nhanh hơn nhiều cũng rất có giá trị.

Tóm tắt lại cho đến nay: chúng ta có năm lớp này, và chúng ta muốn bao quát các trường hợp sử dụng này. Có ba trụ cột: dữ liệu, lưu lượng và hiệu suất. Đối với dữ liệu, chúng ta có proxy, TEE, ORAM, OMAP và PIR. Đối với lưu lượng truy cập, chúng ta có mixnet, định tuyến củ hành và những thứ khác. Về hiệu suất, chúng ta có UBT và tăng tốc GPU. Nếu bạn muốn đọc thêm, ít nhất là về những đóng góp mà PSE đang thực hiện, bạn có thể truy cập pse.dev/research.

#### Đo lường thành công (22:15) {#measuring-success-2215}

Vậy thành công là gì, và làm thế nào chúng ta có thể đo lường nó? Quay trở lại với các lớp này: nếu tôi muốn có thể tuyên bố rằng Ethereum là chuỗi riêng tư nhất, thì kết cục là gì? Tôi sẽ cần cảm thấy thoải mái rằng tất cả các lớp này đều được củng cố cực kỳ vững chắc. Tôi sẽ đo lường nó như thế nào? Tôi kỳ vọng sẽ có nhiều trang web và giao diện người dùng của ứng dụng phi tập trung (dapp) được lưu trữ đằng sau các tên miền củ hành. Tôi rất muốn các ví sử dụng định tuyến ẩn danh một cách tự nhiên, và các cổng kết nối, nhà cung cấp RPC và trình lập chỉ số cũng vậy. Và tôi sẽ đo lường một tỷ lệ phần trăm.

Câu hỏi đặt ra là: trong số các giao diện người dùng của hệ sinh thái Ethereum hiện tại, có bao nhiêu giao diện được lưu trữ đằng sau một tên miền củ hành? Tôi có thể nói là cực kỳ ít, 1% nếu có. Để tôi cảm thấy hài lòng và nói rằng chúng ta đã làm được, chúng ta có thể sẽ cần hơn 80% ở tất cả các lớp này. Hiện tại có bao nhiêu ví đang định tuyến lưu lượng truy cập thông qua các kỹ thuật định tuyến ẩn danh? Rất, rất ít. Tương tự với các nhà cung cấp RPC: các nhà cung cấp này có cung cấp PIR không? Không. Vì vậy, đối với tôi, tuyên bố thành công có nghĩa là các tác nhân ở tất cả các lớp này áp dụng các loại công nghệ này, ít nhất 80% các nhóm, lưu lượng truy cập hoặc các truy vấn.

#### So sánh nút củ hành của Bitcoin (23:39) {#bitcoins-onion-node-comparison-2339}

Đây là một điều mà chúng ta có thể ghen tị với Bitcoin. Bất chấp tất cả những lời chỉ trích mà họ nhận được, đây là một bức ảnh từ tháng 11 năm ngoái: 64% các nút đầy đủ có thể tiếp cận của họ được ẩn đằng sau các tên miền củ hành.

Chúng ta có thể tự làm điều đó không? Đây là quyền riêng tư ở cấp độ thấp hơn, cấp độ đồng thuận, nhưng chúng ta có thể nói rằng các nút đầy đủ và nút trình xác thực của chúng ta nằm sau một mạng củ hành hoặc mixnet không? Tôi chắc chắn nghĩ rằng chúng ta nên làm vậy, và chúng ta có lẽ đang ở mức dưới 1%. Chúng ta có những thách thức khác mà họ không có: chúng ta chạy nhanh hơn nhiều và sự đồng thuận của chúng ta là khác nhau. Nhưng tôi rất muốn có những bảng điều khiển như thế này và nói rằng hơn 80% các ví đã áp dụng các loại công nghệ này, và các nhà cung cấp RPC, trình khám phá, giao diện người dùng, bộ cân bằng tải và SDK cũng vậy. Tôi rất muốn danh sách này phát triển.

#### So sánh Ethereum với Monero và Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

Tôi đã mạn phép, vào đêm qua và đêm trước đó, bắt đầu xem xét cách hệ sinh thái Ethereum so sánh với những thứ như Solana, Bitcoin, Zcash và Monero thông qua lăng kính của các lớp này. Những thứ màu vàng là các kỹ thuật chọn tham gia, và tôi nghĩ chúng ta rất tốt ở điểm đó. Những thứ màu xanh lam là các đề xuất, một số trong đó là các đề xuất giao thức. Những thứ màu xanh lá cây được thực thi ở lớp giao thức.

Bởi vì lịch sử 10 năm là một chuỗi công khai của chúng ta, tôi nghĩ sẽ rất khó để bắt kịp Monero và Zcash trong việc biến quyền riêng tư thành bản địa. Nhưng tôi nghĩ chúng ta có thể làm rất tốt trong việc đạt được sự áp dụng chọn tham gia, và gây ảnh hưởng về mặt văn hóa và xã hội đến các nhóm và người dùng để áp dụng nhiều hơn các kỹ thuật này. Bitcoin và Solana có những thách thức riêng của họ, và tôi nghĩ họ sẽ còn tụt lại phía sau xa hơn, ít nhất là về những vấn đề quyền riêng tư này.

#### Thách thức: hệ sinh thái có thể lập trình riêng tư nhất (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Mục tiêu của tôi, và mục tiêu tôi muốn đặt vào tâm trí bạn, là để Ethereum trở thành hệ sinh thái riêng tư nhất, không cần cấp phép, không cần tin cậy và có thể lập trình nhất trên thế giới. Chúng ta có các chuỗi thanh toán riêng tư khác, và điều đó thật tuyệt, chúng rất tốt, nhưng tôi nghĩ họ sẽ gặp khó khăn hơn nhiều trong việc trở nên có thể lập trình và tạo ra hệ sinh thái mà chúng ta đã tạo ra.

Thách thức của tôi đối với bạn, và tất nhiên là đối với tôi và nhóm của tôi, là trở thành hệ sinh thái không cần cấp phép, không cần tin cậy và riêng tư nhất trong số các hệ sinh thái có thể lập trình. Chúng ta không thể chỉ tập trung vào các yếu tố trên chuỗi. Chúng ta cần tập trung vào tất cả các lớp này.

Vì vậy, nếu bạn đang làm việc về đọc riêng tư, mạng lưới, triển khai PIR, tăng tốc GPU, cấu trúc dữ liệu, UBT, cơ sở hạ tầng hoặc trình xác thực, tôi rất muốn trò chuyện với bạn sau đó. Cảm ơn các bạn rất nhiều. Ethereum là dành cho quyền riêng tư.