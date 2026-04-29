---
title: "Bài phát biểu chính: Trạng thái THỰC SỰ của các L2"
description: "Một bài nói chuyện về trạng thái hiện tại của các giải pháp Lớp 2, xem xét khoảng cách giữa những lời hứa về bảo mật của Rollup và thực tế, đồng thời đề xuất một con đường hướng tới sự phi tập trung thực sự."
lang: vi
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "mở rộng và lớp 2"
  - "bản cuộn"
  - "lớp 2"
format: presentation
author: Ethereum Foundation
breadcrumb: "Trạng thái của các L2"
---

Một bài phát biểu chính của **Bartek Kiepuszewski**, nhà sáng lập L2BEAT, tại Devcon SEA xem xét trạng thái hiện tại của các giải pháp lớp 2 (l2), khoảng cách giữa những lời hứa về bảo mật của Rollup và thực tế, các hạng mục đánh giá mới, và cam kết của L2BEAT trong việc đầu tư nguồn lực đáng kể vào việc xác minh các hệ thống bằng chứng trong năm tới.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=ik2JxmHDmyw) được xuất bản bởi Tổ chức Ethereum. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:00) {#introduction-000}

Là một nhà sáng lập của L2BEAT, tôi có một cơ hội đặc biệt để làm việc với hầu hết mọi nhóm L2 ngoài kia, và chúng tôi đã làm việc với họ kể từ những ngày đầu tiên của không gian này — tức là khoảng bốn năm trước. Thật không thể tin được. Thời gian trôi qua quá nhanh. Chúng tôi đã làm việc với những người tiên phong đầu tiên trong công nghệ ZK, chúng tôi đã làm việc với Plasma Group (sau này đổi tên thành Optimism), chúng tôi đã làm việc với Arbitrum. Và từ sân khấu này, tôi muốn ghi nhận tất cả các nhóm này, bởi vì nếu không có sự hỗ trợ của các bạn, chúng tôi chắc chắn sẽ không có mặt ở đây. Với tư cách là L2BEAT, chúng tôi vô cùng biết ơn mọi sự hỗ trợ mà cộng đồng đã dành cho chúng tôi.

Vậy hãy cùng nhìn lại những gì chúng ta đã đạt được. Trước hết, chúng ta đã ra mắt thành công gần 50 bản cuộn và hơn 50 L2 khác. Đó là một thành tựu đáng kinh ngạc — một số lượng lớn các hệ thống, và chúng ta cũng có gần ngần ấy hệ thống chuẩn bị ra mắt trong những tháng tới. Chúng ta cũng đã đưa rất nhiều giá trị, rất nhiều tổng giá trị bị khóa (TVL), vào các hệ thống này, và nếu bạn nhìn vào các biểu đồ, chúng đều chỉ có xu hướng đi lên.

Vấn đề là, đi kèm với tất cả sự tăng trưởng đó cũng là rất nhiều trách nhiệm. Chúng ta cần hiểu rằng những người dùng cuối đang sử dụng các hệ thống này đang đổ tiền vào các bản cuộn này vì họ tin rằng các bản cuộn kế thừa tính bảo mật của Ethereum. Với nhận thức đó, theo ý kiến của tôi, chúng ta cần bắt đầu nghiêm túc về vấn đề bảo mật.

#### Mở rộng Ethereum (2:10) {#scaling-ethereum-210}

Chúng ta cũng đã thành công trong việc mở rộng Ethereum. Ethereum đã hoạt động khá tốt, nhưng nó bắt đầu trở nên thực sự chậm chạp so với nhu cầu và phí giao dịch ngày càng cao. Vì vậy, chắc chắn là chúng ta đang mở rộng — những con số này cũng đang tăng lên. Điều này thật tuyệt vời.

Tuy nhiên, có một chữ "nhưng". Các bạn biết đấy, luôn luôn có một chữ "nhưng", phải không? Và tôi ở đây chỉ để thành thật với tất cả các bạn. Tôi thực sự muốn không gian này trở nên nghiêm túc, và đây là cơ hội để tôi kêu gọi sự hỗ trợ của các bạn nhằm đảm bảo rằng chúng ta không thất bại — chúng ta không làm phụ lòng mong đợi của cộng đồng. Chúng ta cần bắt đầu thực sự nghiêm túc về tính bảo mật của những gì chúng ta đang xây dựng.

Bởi vì các bạn biết đấy, chúng ta đã sử dụng bánh xe phụ (training wheels) quá lâu rồi. Nếu bạn là một người lớn mà vẫn dùng bánh xe phụ — và tôi xin nhắc lại, đã bốn năm trôi qua — thì bạn thực sự chưa trưởng thành. Sẽ không sao nếu bạn dùng bánh xe phụ khi còn là một đứa trẻ. Nhưng sẽ không ổn chút nào nếu bạn dùng chúng khi đã là người lớn. Và tôi nghĩ đã đến lúc tất cả chúng ta thực sự ngừng e ngại về điều đó. Tất cả chúng ta nên lên tiếng, và chúng ta không nên mắc phải hội chứng "bộ quần áo mới của hoàng đế".

#### Chữ "nhưng" lớn: thiếu các hệ thống bằng chứng (4:30) {#the-big-but-missing-proof-systems-430}

Vậy chữ "nhưng" lớn này là gì? Chà, trước hết, hầu hết các L2 hiện nay đều không có hệ thống bằng chứng, điều này khá đáng ngạc nhiên vì những người tiên phong đầu tiên như StarkNet, như zkSync, như Aztec — bốn năm trước khi họ ra mắt các bản cuộn dành riêng cho ứng dụng đầu tiên của mình, họ đã có các hệ thống bằng chứng. Vì vậy, đúng là ngày nay bạn có thể ra mắt một L2 chỉ bằng một cú nhấp chuột. Tuy nhiên, đó có thực sự là một L2 không? Đó có thực sự là một Rollup không? Những gì bạn đang làm là ra mắt một thứ được bảo mật bằng một đa chữ ký. Tôi không nghĩ như vậy là đủ tốt.

Trạng thái của hệ sinh thái ngày nay giống như trên biểu đồ này. Ở bên trái, bạn có thể thấy các L2 hiện tại có hệ thống bằng chứng. Ở bên phải, bạn có thể thấy các L2 hiện tại không có hệ thống bằng chứng. Và tôi dám cá rằng phần lớn các L2 sắp ra mắt sẽ không có hệ thống bằng chứng. Điều đó về cơ bản sẽ bao gồm mọi Chuỗi OP Stack ngoại trừ OP Mainnet và Base — nhân tiện, xin gửi lời khen ngợi đến họ, họ giống như những nhà vô địch vậy. Tuy nhiên, mọi Chuỗi OP Stack khác đơn giản là không có hệ thống bằng chứng.

Biểu đồ bên phải đó cũng sẽ bao gồm tất cả các ngăn xếp Orbit, vốn có hệ thống bằng chứng, tuy nhiên nó thực sự nằm sau một danh sách trắng có cấp phép thường rất ngắn. Đôi khi danh sách trắng này chỉ có một tác nhân — đó chính là người đề xuất trạng thái. Về cơ bản, đó là người đề xuất trạng thái và chỉ có họ mới có thể thách thức chính mình. Kiểu như, cái gì cơ? Thật sự đấy.

#### Hội đồng bảo mật (6:00) {#security-councils-600}

Hiện tại, hầu hết các L2 không sử dụng hội đồng bảo mật. Chúng ta hiểu thế nào là một hội đồng bảo mật? Một hội đồng bảo mật về cơ bản là một đa chữ ký bao gồm ít nhất tám người tham gia và yêu cầu ngưỡng đồng thuận 75%. Vì vậy, bạn có thể coi nó như một đa chữ ký lớn, nhưng vấn đề không chỉ nằm ở kích thước — mà là thực tế chúng ta muốn những người tham gia được phi tập trung về mặt địa lý. Hôm qua, bạn có thể đã nghe một bài thuyết trình tuyệt vời về sự cần thiết của việc đa dạng hóa địa lý. Đó là những gì chúng ta muốn từ các cấu trúc này. Và về cơ bản, quan trọng nhất là chúng ta muốn những người tham gia đến từ các công ty khác nhau và các khu vực pháp lý khác nhau. Điều đó cực kỳ quan trọng, và tôi sẽ cho bạn thấy một số ví dụ về lý do tại sao.

Hãy coi các hội đồng bảo mật như những đa chữ ký được tăng cường sức mạnh. Có một lớp xã hội rất quan trọng đằng sau chúng. Vì vậy, đây là trạng thái hiện tại của mọi thứ, và một lần nữa, nó rất tệ. Chúng ta chỉ có các hội đồng bảo mật ở Arbitrum, Optimism, Polygon, zkSync — và tôi biết rằng StarkNet, Scroll, và thú vị là Fuel đang ra mắt với một hội đồng bảo mật. Tất cả những người khác về cơ bản là một đa chữ ký rất nhỏ, nội bộ, thường là riêng tư, và thành thật mà nói, cực kỳ khó để phân biệt sự khác biệt giữa các đa chữ ký này và các EOA đơn giản.

#### Các giả định tin cậy về tính khả dụng của dữ liệu (7:25) {#data-availability-trust-assumptions-725}

Vấn đề lớn thứ ba mà chúng ta đã làm sai là hầu hết các L2 không phải Rollup đều được thiết lập với các giả định tin cậy về tính khả dụng của dữ liệu (DA) tồi tệ. Và tôi sử dụng từ "tồi tệ" — thứ nhất, vì tôi thích từ đó, và thứ hai, vì nó thực sự, thực sự rất tệ.

Hãy nhìn vào những ví dụ ở bên trái này — Arbitrum, StarkEx, Immutable X. Tuy nhiên, hầu hết những người khác theo đúng nghĩa đen là đang đăng DA lên máy chủ của họ dưới tầng hầm hay bất cứ đâu. Chúng ta không hề biết. Chúng ta thực sự không biết. Vấn đề là, chúng rất tệ và họ dường như không quan tâm. Vì vậy, có thể người dùng không quan tâm — chúng ta không biết. Nhưng chúng ta cần thực sự nhìn vào dữ liệu đó và nói với mọi người rằng, này, đó không phải là một ủy ban tính khả dụng của dữ liệu.

Một ủy ban tính khả dụng của dữ liệu ban đầu được tạo ra và đi tiên phong bởi StarkWare cho các triển khai StarkEx và bởi Arbitrum. Nhưng đó không phải là mục đích — rằng bạn có thể nói "Tôi có một máy chủ dưới tầng hầm, tôi có thể gọi nó là một ủy ban tính khả dụng của dữ liệu." Đó không phải là mục đích của việc làm đó.

Vì vậy, tóm lại, tôi rất tiếc phải nói rằng, nhưng hiện tại ở hầu hết các L2, các nhà điều hành có cấp phép có thể đánh cắp hoặc đóng băng tiền của bạn. Chúng tôi ở đây để làm cho tất cả các bạn nhận thức được điều đó. Xin lỗi vì phải nói ra, nhưng chúng ta cần thay đổi thái độ.

#### Tại sao các hệ thống bằng chứng lại quan trọng (8:40) {#why-proof-systems-matter-840}

Tại sao chúng ta nên quan tâm đến các hệ thống bằng chứng? Theo ý kiến của chúng tôi, có ít nhất ba lý do chính đáng giải thích tại sao tất cả chúng ta nên có một hệ thống bằng chứng hoạt động.

Một là nó thực sự cho phép thoát không cần cấp phép trong trường hợp tất cả các nhà điều hành đều ngừng hoạt động — và họ có thể ngừng hoạt động vì bất kỳ lý do gì. Gần đây chúng ta đã có một trường hợp dYdX ngừng hoạt động. Họ đã cảnh báo người dùng, rất nhiều người dùng đã không thoát. Tuy nhiên, nếu bạn có một hệ thống bằng chứng, bạn có thể thiết kế hệ thống sao cho một ai đó sẽ tiếp quản theo cách không cần cấp phép, hoặc bạn có thể xây dựng một cơ chế thoát để người dùng có thể rút tiền của họ ra. Điều đó cực kỳ quan trọng. Nếu không có hệ thống bằng chứng, bạn đơn giản là không thể làm điều đó — điều đó là không thể.

Lý do thứ hai là bạn thực sự có thể cải thiện các giả định tin cậy của hội đồng bảo mật — tất nhiên là giả sử bạn có một hội đồng. Và lý do cho điều đó khá tinh tế. Những gì bạn có thể làm bây giờ là thế này: thay vì tình huống mà một người đề xuất độc hại — và đây là biểu đồ cho thấy Rollup lạc quan cơ bản không có hệ thống bằng chứng, mà bạn có thể thấy ở rất nhiều OP Stack ngày nay — có một đa chữ ký rất mạnh có thể ghi đè gốc trạng thái, và có một người đề xuất đề xuất các gốc trạng thái. Nếu đề xuất đó là độc hại, tất cả những gì họ cần làm là hối lộ một thiểu số thành viên hội đồng bảo mật để họ làm ngơ — không phải làm bất cứ điều gì độc hại, mà chỉ đơn giản là không làm gì cả, trong trường hợp đó đề xuất độc hại sẽ thực sự được thông qua và họ sẽ đánh cắp tiền.

Một khi bạn giới thiệu một hệ thống bằng chứng, tình hình sẽ khó khăn hơn nhiều đối với người đề xuất độc hại, bởi vì bây giờ họ cần phải hối lộ **đa số** hội đồng bảo mật. Họ không chỉ phải hối lộ đa số, họ còn phải thực sự khiến những người đó làm điều gì đó độc hại — chứ không chỉ đơn giản là làm ngơ. Đó là một vấn đề rất khác. Để khiến ai đó làm ngơ là nói rằng, "Này, nếu tôi cho bạn 10 triệu đô la, bạn chỉ cần làm mất chìa khóa của mình hoặc đi một chuyến bay quốc tế dài ngày." Nếu bạn muốn khiến ai đó làm điều gì đó độc hại, đó là một vấn đề hoàn toàn khác. Chúng tôi nghĩ rằng điều này về cơ bản thay đổi các giả định tin cậy, đặc biệt là với một hội đồng bảo mật công khai.

Cuối cùng, các hệ thống bằng chứng — nếu bạn ở Giai đoạn 2 — cho phép bạn loại bỏ bất kỳ trung gian nào. Bạn không cần một hội đồng bảo mật, hoặc nếu bạn có, nó chỉ dành cho các tình huống khẩn cấp. Vì vậy, điều đó thực sự có thể có những tác động sâu sắc về mặt pháp lý. Bạn có thể muốn ra mắt L2 của mình như một hệ thống Giai đoạn 2 ngay từ đầu. Điều đó là có thể, nhưng tất nhiên bạn cần phải có một hệ thống bằng chứng — lý tưởng nhất là bạn có thể muốn có nhiều hơn một. Đã có một số thông báo về các hệ thống làm điều đó, như thông báo gần đây từ nhóm Nethermind đang xây dựng một Rollup dự định sẽ là Giai đoạn 2 khi ra mắt.

#### Tại sao lại là hội đồng bảo mật, chứ không phải đa chữ ký (11:29) {#why-security-councils-not-multisigs-1129}

Đó là về các hệ thống bằng chứng. Bây giờ, tại sao lại là hội đồng bảo mật chứ không chỉ là các đa chữ ký đơn giản? Lý do là: đừng tin rằng đa chữ ký là đa chữ ký. Đó là lý do — trừ khi có một lớp xã hội thực sự có thể thuyết phục bạn rằng chúng được đa dạng hóa về cơ bản.

Chúng ta đã có một số sự kiện lớn trong lịch sử của mình. Chúng ta đã có Multichain tuyên bố rằng họ rất phi tập trung, và hóa ra là không, họ không hề như vậy — và đây là một tuyên bố mà bạn không thể thực sự xác minh độc lập. Một cuộc tấn công lớn, hoặc một công việc nội bộ, hoặc lừa đảo (rug pull) — chúng ta không chắc chắn.

Sau đó, chúng ta có một tình huống với Oasis, nơi họ bị một tòa án Vương quốc Anh tiếp cận và họ thực sự phải sử dụng đa chữ ký để trích xuất một số tiền từ Giao thức. Sẽ không thể làm điều đó nếu bạn có một hội đồng bảo mật đa dạng về mặt địa chính trị, bởi vì không có lệnh tòa án nào có thể thực sự tiếp cận được tất cả mọi người.

Cuối cùng, khá gần đây chúng ta đã có một cuộc tấn công vào một đa chữ ký. Đừng nghĩ dù chỉ một giây rằng các đa chữ ký không thể bị tấn công. Cuối cùng chúng ta phải loại bỏ tất cả chúng.

Vì vậy, tóm lại: nếu bạn có một Rollup Giai đoạn 0 không có hội đồng bảo mật, về cơ bản một nhà điều hành độc hại có thể làm bất cứ điều gì họ muốn với tiền của bạn. Nếu bạn là một Rollup Giai đoạn 0 có hội đồng bảo mật, thì kẻ tấn công cần phải hối lộ một thiểu số hội đồng bảo mật — có thể là một việc khó làm, nhưng dễ dàng hơn nhiều so với việc hối lộ đa số hội đồng bảo mật, điều mà bạn sẽ cần làm nếu Rollup của bạn có một hệ thống bằng chứng. Và cuối cùng, không ai có thể đánh cắp tiền của bạn nếu bạn ở Giai đoạn 2. Đó là lời hứa của việc đạt đến Giai đoạn 2.

#### Đề xuất phân loại lại (13:10) {#proposed-reclassification-1310}

Câu hỏi đặt ra là: chúng ta có các động lực phù hợp để các dự án thực sự quan tâm không? Vấn đề là điều duy nhất chúng ta có thể làm — chúng ta với tư cách là L2BEAT và chúng ta với tư cách là cộng đồng Ethereum — là áp dụng áp lực xã hội. Vitalik đã nói rằng bắt đầu từ năm tới, anh ấy sẽ lên kế hoạch chỉ đề cập công khai đến các L2 ở Giai đoạn 1. Trước đây anh ấy thậm chí còn nói rằng anh ấy sẽ không gọi các hệ thống là Rollup nếu chúng không ở Giai đoạn 1.

Vì vậy, chúng tôi đã tự hỏi chúng ta có thể làm gì. Hiện tại chúng ta có các giai đoạn cho các bản cuộn. Chúng ta không có các giai đoạn cho Validium và optimium. Chúng tôi đã tự hỏi trong một thời gian dài — có lẽ chúng ta có thể giới thiệu "Giai đoạn 0+" cho các hệ thống có hệ thống bằng chứng nhưng chưa phải là Giai đoạn 1. Nhưng sau nhiều tháng thảo luận, chúng tôi đã quyết định: không, đã đến lúc phải trưởng thành.

Những gì chúng tôi đang đề xuất với cộng đồng — và điều này sẽ được đưa lên diễn đàn để lấy ý kiến phản hồi của cộng đồng — là thế này. Đầu tiên, chúng tôi muốn tạo một hạng mục riêng cho các hệ thống. Sự khác biệt chính là bạn sẽ phải có một hệ thống bằng chứng để được ở Giai đoạn 0. Vì vậy, ví dụ, StarkNet ngày nay sẽ là Giai đoạn 0 theo cách phân loại này. Tất cả các Chuỗi OP Stack không có hệ thống bằng chứng — ngoại trừ Base và Optimism — sẽ không rơi vào hạng mục này. Và tất nhiên, chúng tôi sẽ cho các hệ thống thời gian để điều chỉnh. Đó là hạng mục chính, và nó giống như một siêu giải đấu của các hệ thống.

Sau đó, bạn có một hạng mục hệ thống khác không sử dụng DA của Ethereum. Chúng sử dụng các giả định tin cậy bổ sung đi kèm với DA bên ngoài. Chúng tôi gọi chúng là "alt-DA" nhưng chúng sẽ bao gồm Validium, optimium và bất kỳ cấu trúc lai nào mà bạn có thể tạo ra. Tuy nhiên, chúng phải cung cấp cho bạn các đảm bảo DA hợp lý — đó không thể là tầng hầm của bạn. Đó phải là một ủy ban tính khả dụng của dữ liệu có quy mô hợp lý, hoặc nếu bạn đang sử dụng Celestia hoặc Avail, bạn cần sử dụng cầu nối.

#### Hạng mục "khác" và cam kết của L2BEAT (16:05) {#the-others-category-and-l2beats-pledge-1605}

Còn những hệ thống khác thì sao? Chúng tôi sẽ đưa chúng vào hạng mục thứ ba, mà chúng tôi gọi là — và bây giờ tôi đang chờ phản hồi của cộng đồng về cách đặt tên cho các hệ thống này — tên làm việc của chúng tôi là "khác" (others). Vấn đề là chúng được bảo mật bằng các đa chữ ký, và chúng tôi sẽ phơi bày bản chất thực sự của các đa chữ ký này. Đó là những gì chúng tôi muốn làm trong giao diện người dùng (UI) của mình.

Giao diện người dùng sẽ trông đại khái như thế này: bạn sẽ thấy sự phân chia này — các bản cuộn, Validium và optimium, và các hệ thống khác. Và cách sắp xếp mặc định sẽ theo mức độ bảo mật, không phải theo tổng giá trị bị khóa (TVL). Đừng chạy theo TVL với khả năng bảo mật kém — điều đó sẽ kết thúc rất tồi tệ.

Chúng tôi sẽ quảng bá các dự án Giai đoạn 1 và Giai đoạn 2. Chúng tôi sẽ coi các dự án Giai đoạn 0 là những ứng cử viên. Đối với hạng mục "khác", chúng tôi rất sẵn lòng liệt kê chúng — chúng tôi sẽ cực kỳ cởi mở. Về cơ bản, bạn chỉ cần liên kết với Ethereum và rõ ràng là có một cầu nối cho phép bạn chuyển tiền. Tuy nhiên, chúng tôi sẽ xem xét các giả định tin cậy và các đa chữ ký, và chúng tôi hy vọng rằng từ từ nhưng chắc chắn, các hệ thống sẽ chuyển từ "khác" sang Validium/optimium hoặc sang các bản cuộn.

Đây là những gì chúng tôi nghĩ hạng mục "khác" sẽ trông như thế nào — đây là dữ liệu thực tế ngay lúc này, các hệ thống thực tế có thể rơi vào hạng mục này nếu chúng không giới thiệu một hệ thống bằng chứng. Bạn sẽ thấy chính xác ai là người đề xuất, ai là người thách thức và ai là người nâng cấp. Điều thú vị là, bạn có thể thấy điều đó ngay hôm nay trên L2BEAT — chỉ là thông tin này bị ẩn quá sâu trong trang chi tiết đến mức tôi cá là chỉ có các nhà nghiên cứu và những người đam mê mới kiểm tra nó. Tất cả đều có sẵn ngay hôm nay. Tuy nhiên, chúng tôi muốn hiển thị dữ liệu cho người dùng cuối. Chúng tôi muốn người dùng cuối thực sự nhận thức được những gì đang diễn ra, để tất cả chúng ta đều phải chịu trách nhiệm về các hệ thống mà chúng ta đang xây dựng.

Chỉ nói "Tôi có một hệ thống bằng chứng" liệu có đủ không? Không. Cam kết của chúng tôi với cộng đồng với tư cách là L2BEAT là vào năm tới, chúng tôi sẽ đầu tư nguồn lực đáng kể vào việc thực sự xem xét cực kỳ kỹ lưỡng và rất sâu vào các hệ thống bằng chứng này để đảm bảo rằng chúng hợp lý và hoàn chỉnh. Chúng tôi sẽ phân tích cả ZK và lạc quan. Chúng tôi sẽ đi sâu vào mã nguồn, chúng tôi sẽ xem xét cách bạn tạo thiết lập tin cậy của mình, chúng tôi sẽ xem xét các mạch của bạn và xem chính xác những gì đang được xác minh trên chuỗi. Chúng tôi muốn làm cho mọi thứ trở nên cực kỳ minh bạch để các giả định tin cậy được truyền đạt rõ ràng — và quan trọng hơn, hệ thống bằng chứng của bạn không thể bị ẩn sau một danh sách trắng nhỏ một cách vô lý.

Chúng tôi đang tuyển dụng các nhà nghiên cứu. Chúng tôi sẽ làm tất cả công việc đó. Đây là cam kết của chúng tôi cho năm tới. Tôi hy vọng năm tới sẽ là năm của các L2 và các bản cuộn — tuy nhiên, vấn đề không phải là ra mắt một Rollup chỉ bằng một cú nhấp chuột. Vấn đề là bạn muốn có thể ra mắt một hệ thống với khả năng bảo mật tốt. Lý tưởng nhất là bạn muốn kế thừa càng nhiều tính bảo mật càng tốt từ Ethereum. Có rất nhiều việc phải làm để tất cả chúng ta đạt được điều đó. Nhưng nếu chúng ta không làm, thì tất cả những gì chúng ta đang làm về cơ bản là tạo ra hàng ngàn sidechain không an toàn. Tôi nghĩ rằng, với tư cách là một cộng đồng, chúng ta không muốn điều đó.

#### Hỏi & Đáp (18:45) {#qa-1845}

**Người dẫn chương trình:** Hãy đến với phần Hỏi & Đáp. Việc các bản cuộn có một bộ sắp xếp phi tập trung có quan trọng không, hay các cơ chế an toàn khác là đủ?

**Bartek Kiepuszewski:** Đây là một câu hỏi rất hay và quan trọng. Tôi nghĩ rằng có những thiết kế khác nhau mà chúng ta sẽ thấy. Tôi không nghĩ việc phi tập trung bộ sắp xếp là cực kỳ quan trọng đối với sự an toàn của tiền người dùng, nhưng nó có thể quan trọng đối với khả năng chống kiểm duyệt theo thời gian thực trong một số tình huống nhất định. Vitalik đã nói trong bài phát biểu khai mạc của mình rằng tương lai có thể là chúng ta thấy các bản cuộn chuyển sang dạng based — tận dụng cơ sở hạ tầng Ethereum để chống lại sự kiểm duyệt theo thời gian thực — trong khi những bản cuộn khác, ví dụ như MegaETH, thực sự có thể có một bộ sắp xếp rất tập trung và chỉ dựa vào cơ chế thoát. Chúng ta có thể thấy các cấu trúc lai. Tôi nghĩ không gian thiết kế là rất lớn, và ngay lúc này tại L2BEAT, chúng tôi thực sự muốn xem điều gì sẽ xảy ra và nó sẽ diễn ra như thế nào.

**Người dẫn chương trình:** Liệu các hệ thống bằng chứng dựa trên TEE có được coi là Giai đoạn 2 ngay cả khi chúng ngụ ý sự tin tưởng vào nhà sản xuất phần cứng không?

**Bartek Kiepuszewski:** Câu trả lời ngắn gọn là không, bởi vì với các cấu trúc mà chúng ta thấy ngày nay, nếu bạn đang sử dụng SGX, Intel có thể gửi một bằng chứng và họ có khả năng chặn, đánh cắp hoặc đóng băng bất cứ thứ gì họ muốn mà không ai thực sự nhận ra — và Ethereum cũng không nhận ra. Tuy nhiên, với tất cả những nỗ lực đang được đưa ra để tạo ra các TEE không cần tin cậy, không cần cấp phép — tôi được biết rằng đây thực sự là một công việc cực kỳ thú vị. Nhưng câu trả lời ngắn gọn là: ngày nay thì không.

**Người dẫn chương trình:** Tại sao Optimism lại được phân loại là Giai đoạn 1? Dựa trên đánh giá, họ không phải vậy — Tổ chức kiểm soát hoàn toàn quá trình đề xuất.

**Bartek Kiepuszewski:** Về cơ bản, họ đáp ứng tất cả các tiêu chí. Vấn đề không thực sự nằm ở quá trình đề xuất — mà là ai đang kiểm soát tiền. Bạn có thể có một người đề xuất tập trung, tuy nhiên có một phương án dự phòng. Nếu họ ngừng hoạt động, thì toàn bộ hệ thống sẽ trở nên không cần cấp phép hơn. Tôi nghĩ điều quan trọng là phải nhận ra vai trò của hội đồng bảo mật là gì. Chúng tôi muốn các hệ thống Giai đoạn 1 cho phép bạn thoát nếu người đề xuất tập trung dừng lại. Ví dụ, với dYdX, đề xuất cực kỳ tập trung, tuy nhiên khi họ dừng lại, mọi người có thể thoát. Vì vậy, vấn đề không phải là bạn tập trung hay phi tập trung — mà là bạn có thể thực sự thoát theo cách không cần cấp phép hay không.

Họ đã đáp ứng tất cả các tiêu chí. Nhân tiện, chúng tôi đang tinh chỉnh — các tiêu chí không phải là thứ được khắc trên đá vì tất cả các hệ thống này đều đang phát triển, vì vậy chúng tôi cần phát triển cùng với các hệ thống này. Các tiêu chí có thể thay đổi một chút, và chúng tôi đang xem xét rất kỹ cả Optimism và Arbitrum vì rõ ràng họ là hai người dẫn đầu. Có rất nhiều sắc thái mà tôi không có thời gian để đi sâu vào. Nhưng không phải là bạn có một chỉ định giai đoạn mãi mãi — nếu có thông tin mới hoặc điều gì đó chúng tôi có thể đã bỏ qua hoặc bỏ sót, rất có thể bạn sẽ mất chỉ định đó.

**Người dẫn chương trình:** Những lý do cốt lõi khiến các dự án không xây dựng hướng tới Giai đoạn 1 là gì?

**Bartek Kiepuszewski:** Sự phức tạp, thời gian, chi phí, nhân tài. Nó tốn kém một cách đáng ngạc nhiên. Như tôi đã nói, những người tiên phong bốn năm trước về cơ bản đã xây dựng — dYdX theo đúng nghĩa đen là một trong những, nếu không muốn nói là, Rollup ZK đầu tiên. Nó dành riêng cho ứng dụng, nhưng vẫn là cái đầu tiên. Và nếu không vì những sắc thái nhỏ, nó sẽ là Giai đoạn 2 — thực sự, chính quá trình Quản trị mà chúng tôi yêu cầu cho Giai đoạn 2 đang thất bại. Nhưng xét về mọi mặt, nó là một hệ thống Giai đoạn 2. Nó được xây dựng cách đây bốn năm, vì vậy không phải là không thể.

Thành thật mà nói, tôi nghĩ điều khiến tất cả các bản cuộn ngày nay cực kỳ khó thực hiện điều này là phần lớn các bản cuộn không được xây dựng bởi các nhóm — chúng được ra mắt bởi các nhà cung cấp dịch vụ Rollup (rollup-as-a-service), và chúng ta cần khuyến khích họ thực sự làm tốt hơn. Và điều đó rất khó. Không ai nói rằng nó sẽ dễ dàng.