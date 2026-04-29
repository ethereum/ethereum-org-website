---
title: "Trò chơi tái tổ chức trong Bằng chứng cổ phần (PoS) Ethereum"
description: "Caspar Schwarz-Schilling trình bày nghiên cứu về các cuộc tấn công tái tổ chức khối trong Bằng chứng cổ phần (PoS) Ethereum, bao gồm các hướng tấn công, cơ chế phòng thủ và các biện pháp giảm thiểu ở cấp độ giao thức đã được áp dụng."
lang: vi
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "consensus"
  - "pos"
  - "security"
format: presentation
author: LisCon
breadcrumb: "Tái tổ chức PoS"
---

Bài thuyết trình này khám phá các loại hình tái tổ chức khối có thể xảy ra trong Bằng chứng cổ phần (PoS) Ethereum và các biện pháp giảm thiểu được thiết kế để ngăn chặn chúng. Caspar Schwarz-Schilling, một nhà nghiên cứu tại Nhóm Khuyến khích Mạnh mẽ (Robust Incentives Group) của Tổ chức Ethereum, sẽ đi sâu vào cơ chế của các đợt tái tổ chức ex-post (sau sự kiện) và ex-ante (trước sự kiện), so sánh bối cảnh bảo mật giữa Bằng chứng công việc (PoW) và Bằng chứng cổ phần (PoS).

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=xcPxwhrg3Ao) được xuất bản bởi LisCon. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu và bối cảnh (0:03) {#introduction-and-background-003}

Chào mừng các bạn. Hôm nay tôi sẽ nói về các đợt tái tổ chức có thể xảy ra trong Bằng chứng cổ phần (PoS) Ethereum.

Tôi mới gia nhập Tổ chức Ethereum gần đây, cụ thể là Nhóm Khuyến khích Mạnh mẽ (Robust Incentives Group). Về cơ bản, chúng tôi là một nhóm nghiên cứu tập trung vào bất cứ thứ gì liên quan đến các biện pháp khuyến khích. Tôi sẽ nói ngắn gọn thôi — bài nói chuyện này có rất nhiều thông tin và bạn có thể tìm thấy hầu hết các công việc của chúng tôi trên GitHub.

#### Hai loại tái tổ chức (0:44) {#two-types-of-reorgs-044}

Hôm nay tôi muốn nói về tái tổ chức, và cụ thể tôi muốn phác thảo hai loại tái tổ chức khác nhau có thể xảy ra trong lĩnh vực Bằng chứng cổ phần (PoS) Ethereum.

Một mặt, chúng ta có **tái tổ chức ex-post** và mặt khác là **tái tổ chức ex-ante**. Hãy thứ lỗi cho tôi vì cách đặt tên bằng tiếng Latinh hơi phô trương này, nhưng nó diễn tả đúng bản chất vấn đề.

Tái tổ chức ex-post là những gì chúng ta thường nghĩ đến khi nói về tái tổ chức. Kẻ tấn công nhìn thấy một khối — nếu nó có giá trị, họ có thể muốn thử và tái tổ chức nó. Vì vậy, trên biểu đồ ở đây, chúng ta thấy rằng khối N+1 là khối mà kẻ tấn công muốn loại bỏ thông qua tái tổ chức, và bằng cách xây dựng trên cùng một khối cha N, nếu thành công, khối N+3 sau đó sẽ được xây dựng trên khối N+2. Đó là chuyện bình thường.

Bây giờ, tái tổ chức ex-ante lại hơi khác một chút. Ý tưởng là kẻ tấn công cần bắt đầu cuộc tấn công trước cả khi biết chúng sẽ loại bỏ khối nào thông qua tái tổ chức. Về cơ bản thì nó hoạt động như thế nào? Ở mức độ tổng quan, khối N+1 được xây dựng trên N nhưng không được phát hành ngay lập tức. Các nút trung thực thậm chí không biết rằng N+1 tồn tại và vì vậy chúng sẽ tiếp tục xây dựng trên N. Sau đó, thông qua một cơ chế nào đó, N+1 được phát hành và N+3 có thể thấy N+1 đang dẫn đầu và xây dựng trên nó, dẫn đến việc N+2 thực sự bị loại bỏ thông qua tái tổ chức.

Bạn có thể tự hỏi tại sao lại muốn thực hiện loại tái tổ chức này. Chà, vẫn còn MEV để thu thập. Nếu may mắn, khối N+2 có rất nhiều MEV — bạn có thể thu thập nó chỉ bằng cách sao chép và dán bất cứ thứ gì có trong khối đó. Trong trường hợp xấu nhất, về cơ bản bạn có các giao dịch trị giá bằng hai khe để lắng nghe.

#### Tái tổ chức ex-post trong Bằng chứng công việc (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Trước khi đi sâu vào tái tổ chức ex-ante, chủ đề chính của bài nói chuyện này, hãy để tôi tóm tắt ngắn gọn về tái tổ chức ex-post và đặc biệt là bắt đầu với bối cảnh Bằng chứng công việc (PoW).

Về cơ bản, đây là bản tóm tắt bài đăng trên blog của những gương mặt quen thuộc — Georgios và Vitalik. Hãy tìm đọc nó, bài viết đó rất tuyệt.

Tóm lại, trong Bằng chứng công việc (PoW) Ethereum, tái tổ chức ex-post rất khó nhưng không phải là không thể. Một thợ đào nắm giữ 10% có cơ hội tương đối tốt để khai thác một vài khối liên tiếp, và nếu phần thưởng đủ cao — hãy tưởng tượng có một khối với lượng MEV trị giá 100 ETH để thu thập — thì có lẽ tỷ lệ thành công một phần trăm thực sự có thể đủ để khiến việc cố gắng tái tổ chức trở nên đáng giá.

#### Tái tổ chức ex-post trong Bằng chứng cổ phần (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

Trong Bằng chứng cổ phần (PoS), đó là một câu chuyện hoàn toàn khác. Chúng ta đang nói về một lượng tiền đặt cọc khổng lồ đến mức vô lý được yêu cầu. Tôi sẽ hướng dẫn bạn cách một người có thể thực hiện điều đó chỉ để nhấn mạnh rằng nó khó khăn đến mức nực cười như thế nào.

Có lẽ nên bắt đầu với một số kiến thức cơ bản trước. Thời gian trong Bằng chứng cổ phần (PoS) Ethereum trôi qua theo các khe. Mỗi khe dài 12 giây. Trong mỗi khe có hai vai trò: bạn có một người đề xuất — chính xác là một người đề xuất — và một ủy ban gồm hàng nghìn người chứng thực có nhiệm vụ chứng thực cho các khối mà họ nghe được trên lớp P2P. Họ xác định phần đầu của Chuỗi bằng cách chạy lựa chọn Phân nhánh, về cơ bản là một hàm lấy cây khối làm đầu vào và cung cấp cho bạn phần đầu của Chuỗi.

Bạn có nhiệm vụ chứng thực cho các khối nếu bạn nghe thấy một khối hợp lệ, hoặc bốn giây sau khi bắt đầu một khe — tùy điều kiện nào đến trước. Vì vậy, nếu vì lý do nào đó mà người đề xuất của khối N+1 ngoại tuyến và không có khối nào sau bốn giây trong khe, bạn sẽ chứng thực cho khối N. Nếu bạn nghe thấy nó đúng lúc, bạn chứng thực cho khối N+1. Rất đơn giản.

Tất cả những chứng thực này mang lại trọng số cho các khối, và trọng số này được sử dụng bởi lựa chọn Phân nhánh để xác định phần đầu mới nhất là gì.

Bây giờ hãy cùng xem xét một đợt tái tổ chức một khối. Ban đầu, mọi thứ diễn ra bình thường — mọi người đều chứng thực cho khối N, ngay cả kẻ tấn công. Sau đó, N+1 được xây dựng trên N, và vì kẻ tấn công không muốn tăng trọng số cho khối mà họ đang cố gắng loại bỏ thông qua tái tổ chức, thay vào đó họ chứng thực cho khối N. Khối N đang đạt được rất nhiều trọng số vì kẻ tấn công có hai phần ba ủy ban — điều đó có nghĩa là họ cần kiểm soát khoảng hai phần ba toàn bộ lượng tiền đặt cọc.

Một phần ba những người trung thực đã chứng thực cho N+1, hai phần ba cho N. Bây giờ đến khối N+2 — rõ ràng là kẻ tấn công xây dựng nó trên N, và chứng thực cho khối của chính họ. Từ góc nhìn của các trình xác thực trung thực, N+1 vẫn đang dẫn đầu về trọng số vì cả N+1 và N+2 đều kế thừa toàn bộ trọng số của khối N, nhưng N+1 cũng có một phần ba số chứng thực này mà N+2 đang thiếu.

Nếu chúng ta tính tổng lại — khối N+1 có các chứng thực trị giá một phần ba cộng với một phần ba, mang lại hai phần ba, và khối N+2 cũng có hai phần ba. Để đơn giản, hãy giả sử việc phá vỡ thế hòa nghiêng về phía kẻ tấn công. Khi đó N+3 sẽ thấy N+2 đang dẫn đầu và xây dựng trên nó.

Để cho bạn thấy những giả định này nực cười như thế nào — ngay cả khi bạn là một người đặt cọc nắm giữ 65%, để kiểm soát hai phần ba ủy ban trong bất kỳ khe nào, bạn chỉ có xác suất là 0,05%. Điều này cho thấy sức mạnh của các chứng thực song song là có thật — tái tổ chức ex-post là vô cùng khó khăn, nếu không muốn nói là gần như không thể, trong Bằng chứng cổ phần (PoS) Ethereum.

#### Cơ chế tấn công tái tổ chức ex-ante (7:34) {#ex-ante-reorg-attack-mechanics-734}

Bây giờ tôi sẽ nói về tái tổ chức ex-ante. Cuộc tấn công này dựa trên một bài báo của Neuder và những người khác. Gần đây chúng tôi đã cải thiện đáng kể cuộc tấn công này. Chúng tôi cũng đã viết một bài báo về nó và tải nó lên arXiv vừa kịp lúc.

Cũng xin nói trước — đừng lo lắng, đã có các biện pháp giảm thiểu. Chúng sẽ được hợp nhất trước The Merge.

Một cuộc tấn công tái tổ chức ex-ante hoạt động như thế nào? Ban đầu, khối N — mọi thứ diễn ra bình thường, mọi người đều chứng thực cho nó. Bây giờ bạn là người đề xuất của N+1. Bạn đề xuất nó và chứng thực cho nó một cách riêng tư với một trình xác thực duy nhất. Quan trọng là, bạn giữ nó ở chế độ riêng tư — bạn không phát hành nó và bạn không truyền bá nó trên lớp P2P.

Điều xảy ra là những người trung thực không nhìn thấy khối N+1, vì vậy họ sẽ chứng thực cho khối N. Đó là mánh khóe — bạn kế thừa trọng số đó và bạn không thực sự phải chiến đấu với nó.

Hãy tạm thời giả định độ trễ bằng không. Trong khe N+2, những gì chúng ta làm với tư cách là kẻ tấn công là phát hành khối N+1 và chứng thực riêng tư cùng một lúc. Các trình xác thực trung thực trong khe N+2 cần chứng thực cho một khối. Từ góc nhìn của họ, họ thấy khối N+2 và khối N+1 với một chứng thực riêng tư này. Nếu họ chạy lựa chọn Phân nhánh, họ sẽ thấy rằng khối N+1 có nhiều trọng số hơn khối N+2, bởi vì N+1 có chứng thực riêng tư mà N+2 không có. Thậm chí tất cả các trình xác thực trung thực sẽ thực sự chứng thực cho khối N+1. Trong N+3, hiển nhiên, N+1 sẽ được xem là phần đầu của Chuỗi.

#### Độ trễ mạng lưới và cuộc tấn công (10:25) {#network-latency-and-the-attack-1025}

Tôi đã giả định độ trễ bằng không, điều này rõ ràng không phải là cách nó hoạt động trong thực tế. Luôn có độ trễ — cần có thời gian để truyền bá các khối và tin nhắn trên lớp P2P.

Cách mà một kẻ tấn công vẫn có thể thực hiện loại tấn công này là bằng cách có nhiều nút ở các vị trí khác nhau trên cấu trúc liên kết P2P. Khi người đề xuất trung thực trong khe N+2 đề xuất khối đó, bạn sẽ nghe về nó từ rất sớm trong quá trình truyền bá. Do đó, bạn có thể phát hành khối riêng tư của mình từ tất cả các vị trí khác nhau này sao cho đa số sẽ nghe về khối N+1 trước khi họ nghe về khối N+2 — nghĩa là họ thấy rằng khối N+1 đang dẫn đầu về trọng số và sẽ thực sự bỏ phiếu chứng thực cho nó.

Để nhấn mạnh lại những gì đang xảy ra ở đây: chúng ta có một người đề xuất với một người chứng thực duy nhất xoay sở để thực hiện một đợt tái tổ chức một khối. Nói giảm nói tránh thì điều này không lý tưởng chút nào.

#### Các chiến lược cân bằng cho các đợt tái tổ chức dài hơn (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Nếu bạn muốn làm điều gì đó phức tạp hơn, bạn có thể thực hiện các đợt tái tổ chức dài hơn bằng cách sử dụng một chiến lược cân bằng. Ý tưởng là chia ủy ban trung thực thành các góc nhìn khác nhau về Chuỗi.

Bạn phát hành khối riêng tư của mình theo cách sao cho khoảng một nửa số nút trung thực nghe về khối riêng tư và chứng thực của bạn trước khi họ nghe về khối N+2 — vì vậy họ chứng thực cho khối của bạn. Nửa còn lại, bạn muốn họ không nghe thấy khối của bạn trước khi họ chứng thực cho N+2.

Bây giờ bạn có một nửa ủy ban trung thực chứng thực cho N+1 và nửa còn lại chứng thực cho N+2. Điều đó giúp ích gì? Ủy ban trung thực bây giờ triệt tiêu lẫn nhau, và bạn với tư cách là kẻ tấn công thậm chí không phải chiến đấu với họ — về cơ bản đây là giấc mơ trở thành hiện thực của kẻ tấn công.

Đi qua biểu đồ: khối N diễn ra bình thường, khối N+1 — câu chuyện tương tự, bạn không phát hành nó. Các trình xác thực trung thực chứng thực cho khối N. Khối N+2 xuất hiện, bạn nghe về nó sớm, và bạn phát hành khối N+1 với một chứng thực — "phiếu bầu xoay chiều" — theo cách sao cho một nửa ủy ban trung thực nhìn thấy nó trước và một nửa nhìn thấy sau. Một nửa bỏ phiếu cho N+1, nửa còn lại cho N+2. Bạn thực sự muốn một sự phân chia chênh lệch một phiếu sao cho N+2 có nhiều hơn một chứng thực, vì vậy N+3 xây dựng trên N+2 và tiếp tục quá trình tái tổ chức.

Để kết thúc một đợt tái tổ chức hai khối: khối N+3 được đề xuất, bạn nghe thấy nó sớm, bạn phát hành khối N+1 và hai chứng thực còn lại của mình, làm tràn ngập lớp P2P để đa số những người trung thực bỏ phiếu cho khối N+1 — sao cho nó có nhiều trọng số hơn khối N+3 và N+4 được xây dựng trên N+1.

Nếu bạn suy nghĩ về điều đó, việc thực hiện các đợt tái tổ chức này theo những giả định này là tương đối rẻ. Ngay cả khi bạn không có sự phân chia hoàn hảo, vì lớp P2P quá lớn, bạn có một phân phối xác suất mà bạn có thể nhắm mục tiêu sao cho chi phí tấn công tăng theo căn bậc hai của quy mô ủy ban.

#### Biện pháp giảm thiểu tăng cường người đề xuất (15:17) {#proposer-boost-mitigation-1517}

Hãy nói về biện pháp giảm thiểu. Ý tưởng cơ bản là gì? Chúng ta sẽ trao cho người đề xuất thêm một chút quyền lực. Nếu một khối hợp lệ đến đúng giờ, hãy tăng trọng số của khối này trong suốt thời gian của khe. Sau khi khe đó kết thúc, chúng ta tiếp tục với điểm số LMD-GHOST thông thường và mọi thứ diễn ra như bình thường.

Vì vậy, nếu khối N+2 được đề xuất đúng giờ và nó hợp lệ, khối này sẽ có một sự tăng cường — giả sử là 80% quy mô ủy ban. Bây giờ, chứng thực N+1 nhỏ bé dễ thương này từ kẻ tấn công sẽ không thể làm nên chuyện. Không đời nào.

Các chiến lược cân bằng cũng không còn hoạt động nữa vì bạn có sự phân chia 50/50 nhưng sự tăng cường luôn đẩy nó về một hướng. Không có cách nào bạn có thể giữ được sự phân chia 50/50 đó.

Ý tưởng là với biện pháp giảm thiểu này được áp dụng, các chứng thực của kẻ thù phải cạnh tranh với sự tăng cường để thuyết phục các trình xác thực trung thực bỏ phiếu theo ý muốn của chúng. Điều này phá vỡ các chiến lược cân bằng và về cơ bản ngăn cấm hoàn toàn tất cả các đợt tái tổ chức. Tin tốt là — có một PR đang mở, vì vậy về cơ bản nó sẽ được hợp nhất trước The Merge.

#### Những điểm chính (16:48) {#key-takeaways-1648}

Một số điểm chính. Tôi đã nói về sự khác biệt giữa tái tổ chức ex-post và ex-ante. Tôi đã phác thảo ngắn gọn các bối cảnh khác nhau cho tái tổ chức trong Bằng chứng công việc (PoW) so với Bằng chứng cổ phần (PoS). Tôi đã chỉ cho bạn cách thực hiện một đợt tái tổ chức ex-ante nhưng quan trọng hơn là cách khắc phục nó.

Nếu bạn quan tâm đến điều này, có một bài báo — chi tiết hơn nhiều, nhiều sắc thái hơn. Các slide sẽ được tải lên. Hãy đến nói chuyện với tôi nếu bạn quan tâm, và bạn cũng có thể tìm thấy tôi trên Twitter.

Tôi hy vọng điều này thú vị với bạn. Cảm ơn rất nhiều.