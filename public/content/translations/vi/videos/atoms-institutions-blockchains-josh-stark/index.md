---
title: "Nguyên tử, thể chế, chuỗi khối"
description: "Josh Stark đề xuất một khuôn khổ mới để hiểu chuỗi khối là gì, giới thiệu khái niệm 'độ cứng' như một thuộc tính chung kết nối nguyên tử, thể chế và chuỗi khối như những vật liệu xây dựng của nền văn minh."
lang: vi
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "how-ethereum-works"
  - "blockchain"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Nguyên tử, Thể chế, Chuỗi khối"
---

Một bài phát biểu mang tính triết học của **Josh Stark** từ Tổ chức Ethereum tại Pragma Denver 2024, đề xuất một khuôn khổ mới để hiểu về chuỗi khối. Bài nói chuyện giới thiệu khái niệm "độ cứng" (hardness) như một thuộc tính chung kết nối nguyên tử, thể chế và chuỗi khối như những vật liệu xây dựng của nền văn minh.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=zI07mqNdxzA) được xuất bản bởi ETHGlobal. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Tại sao chúng ta không thể giải thích chuỗi khối? (0:00) {#why-cant-we-explain-blockchains-000}

Chào mọi người, cảm ơn các bạn đã có mặt tại Pragma ở Denver. Tên tôi là Josh. Tôi làm việc tại Tổ chức Ethereum — tôi đã gắn bó với EF được khoảng năm năm nay. Tôi thường nói đùa rằng công việc của tôi là tìm xem công việc của mình nên là gì, và điều đó thay đổi sáu tháng một lần.

Tôi đã làm rất nhiều việc khác nhau trong sự nghiệp của mình trong lĩnh vực tiền mã hóa. Tôi đã làm việc cho một ví Bitcoin đời đầu. Tôi đã chế tạo — à không, tôi đã mua — một máy ATM Bitcoin ở Toronto và vận hành nó trong khoảng một năm vào năm 2015. Năm 2017, tôi đồng sáng lập ETHGlobal, cũng như một công ty tên là L4 làm việc về các giải pháp mở rộng quy mô lớp 2 (L2) đời đầu. Và trong những năm qua, tôi đã viết rất nhiều bài đăng trên blog.

Trải qua tất cả những điều này, tôi vẫn không thể thực sự giải thích chúng tôi đang làm gì hoặc tại sao. Tôi có cảm giác rằng điều này rất quan trọng, rằng nó sẽ thay đổi thế giới. Đừng hiểu sai ý tôi — tôi có thể nói về các ứng dụng riêng lẻ. Chúng ta có thể giải thích Bitcoin, NFT, Uniswap, ENS. Tất cả những thứ này trong các phạm vi nhỏ của chúng không quá khó để giải thích. Nhưng khi chúng ta cố gắng nói về bức tranh toàn cảnh — ý nghĩa của việc có một công nghệ cho phép tất cả những điều này — chúng ta bắt đầu vấp váp. Chúng ta đang phải vận dụng trí óc quá mức, ném những từ thông dụng vào mọi người, cố gắng giải thích mọi thứ.

Chúng ta thực sự cần đi vào trọng tâm của vấn đề, và tôi không nghĩ chúng ta đã tiến gần đến điều đó. Đó là một vấn đề! Nếu chúng ta có thể nói về các ứng dụng riêng lẻ này nhưng không thể trình bày rõ ràng những gì chúng có chung — thì có điều gì đó chúng ta đang bỏ lỡ. Có một mức độ giải thích vẫn chưa được tìm ra, và tôi nghĩ nó rất quan trọng. Cảm giác của tôi là một khi chúng ta tìm thấy nó, nó sẽ trở nên hiển nhiên.

Vì vậy, điều này bắt đầu từ một câu hỏi rất cụ thể mà tôi có: công nghệ đa mục đích là gì? Năng lực cơ bản này là gì? Và nó đã biến thành một thứ mà tôi thấy thú vị hơn nhiều.

#### Claude Shannon và ý tưởng về thông tin (4:00) {#claude-shannon-and-the-idea-of-information-400}

Để tôi kể cho bạn nghe một câu chuyện. Vào những năm 1930 và 40, Claude Shannon được bao quanh bởi những khởi đầu của một thời đại mới. Tại Bell Labs, ông làm việc về các hệ thống kiểm soát hỏa lực và mật mã học trong chiến tranh, và ông bắt đầu nghĩ về một cách tiếp cận tổng quát hơn đối với thông tin. Ban đầu ông không gọi nó là thông tin — năm 1939, ông viết cho một đồng nghiệp rằng ông đang nghĩ về "sự truyền tải trí tuệ". Từ thông tin có một ý nghĩa khác vào thời điểm đó.

Năm 1948, ông xuất bản "Lý thuyết Toán học về Truyền thông" — một bài báo nền tảng mở đường cho thời đại thông tin. Quan trọng nhất đối với chúng ta, lần đầu tiên nó giới thiệu một ý tưởng trừu tượng về thông tin — một định nghĩa không gắn liền với âm nhạc, lời nói, văn học hay mã. Đây là bài báo đã giới thiệu bit — đơn vị thông tin không thể chia nhỏ hơn mà bạn có thể đo lường trong bất kỳ bối cảnh nào.

Trước thời điểm này, không ai thực sự có khái niệm này về thông tin như một thứ phổ quát, chung chung. Điều đó bây giờ có vẻ điên rồ — chúng ta đã sử dụng công nghệ thông tin trong hàng ngàn năm. Nó gắn liền chặt chẽ với ý nghĩa của việc làm người, sử dụng lời nói và ngôn ngữ. Nhưng chúng ta đã không đặt tên cho thuộc tính cơ bản chung trên tất cả những thứ này cho đến rất gần đây.

Điều tôi muốn bạn rút ra từ điều này: đã có một thời gian trước khi chúng ta có ý tưởng về thông tin và một thời gian sau đó. Sẽ ra sao nếu chúng ta cũng đang bỏ lỡ một điều gì đó cơ bản như vậy? Đó là giả thuyết của tôi.

#### Ba manh mối (7:00) {#three-clues-700}

Khi tôi đang vật lộn để giải thích chuỗi khối, tôi liên tục bắt gặp những điều kỳ lạ này mà tôi nghĩ là manh mối hướng tới một điều gì đó lớn lao hơn.

**Manh mối số một** — chúng ta mô tả chuỗi khối vừa là không cần tin cậy vừa là đáng tin cậy. Thật kỳ lạ. Trong sách trắng của Satoshi, chúng ta nói về việc loại bỏ nhu cầu về sự tin cậy. Nhưng trong sách trắng của Ethereum, chúng ta nói về việc sử dụng Ethereum để làm cho các ứng dụng trở nên đáng tin cậy hơn. Tờ The Economist gọi chuỗi khối là một "cỗ máy niềm tin". Chúng ta có ý nghĩa thực sự khi nói chuỗi khối là không cần tin cậy, và chúng ta có ý nghĩa thực sự khi nói chúng đáng tin cậy. Ngôn ngữ của chúng ta chưa theo kịp. Những mâu thuẫn rõ ràng này luôn đáng để chú ý — đôi khi chúng tiết lộ một khoảng trống trong các khái niệm trừu tượng của chúng ta.

**Manh mối số hai** — chúng ta nói rất nhiều về việc chuỗi khối khác biệt như thế nào so với các thể chế tập trung — Bitcoin so với các ngân hàng trung ương, ENS so với DNS. Nhưng chúng ta hiếm khi nói về những điểm chung của chúng. Chúng có thể thay thế cho nhau. Nếu bạn đã từng giao dịch tiền pháp định để lấy Bitcoin, bạn đã thay thế chúng cho nhau. Chúng phải có điểm gì đó chung để sự thay thế đó diễn ra thường xuyên như vậy.

Với ô tô, chúng ta đã nói về "xe ngựa không ngựa", nhưng ít nhất chúng ta có thể gọi tên chúng là gì — phương tiện giao thông. Với hồ sơ kỹ thuật số, chúng ta đã nói về các phương tiện "không giấy tờ", nhưng chúng ta biết danh mục của nó — thông tin. Có vẻ như chúng ta đã phát minh ra một công nghệ trước khi chúng ta phát minh ra danh mục mà nó thuộc về.

**Manh mối số ba** — Bài báo của Satoshi bắt đầu bằng những lời này: "thương mại trên internet đã trở nên phụ thuộc gần như hoàn toàn vào các tổ chức tài chính đóng vai trò là bên thứ ba đáng tin cậy." Satoshi đang so sánh Bitcoin với các thể chế, chứ không phải với các phần mềm khác. Có điều gì đó ở đây.

#### Giới thiệu về độ cứng (11:00) {#introducing-hardness-1100}

Đây là câu trả lời của tôi cho những gì nằm trong chiếc hộp đó. Tôi gọi nó là **độ cứng** (hardness). Dưới đây là câu chuyện trong năm bước đơn giản, và sau đó chúng ta sẽ đi sâu hơn.

Đầu tiên — nền văn minh của chúng ta phụ thuộc vào cơ sở hạ tầng xã hội như tiền bạc, luật pháp và rất nhiều thứ khác, và chúng cần phải đáng tin cậy. Chúng cần hoạt động như chúng ta mong đợi, ít nhất là trong hầu hết thời gian, để chúng hữu ích cho chúng ta. Nếu không, chúng ta sẽ không dựa vào chúng — chúng sẽ không trở thành tiền.

Thứ hai — rất khó để đạt được mức độ tin cậy cần thiết đó. Cho đến nay, thực sự chỉ có ba cách chúng ta từng làm: sử dụng nguyên tử, sử dụng thể chế, và bây giờ là sử dụng chuỗi khối.

Thứ ba — có một thuộc tính chưa được công nhận chung cho cả ba, mà tôi gọi là độ cứng. Độ cứng là năng lực, là sức mạnh, cho phép chúng ta làm cho tương lai trở nên dễ đoán hơn theo những cách thực sự cụ thể mà chúng ta yêu cầu cho các trò chơi phối hợp phức tạp.

Thứ tư — ba nguồn độ cứng này đều có những thuộc tính khác nhau khiến chúng hữu ích trong các bối cảnh khác nhau.

Và thứ năm — chúng ta có thể sử dụng chúng cùng nhau và thay thế chúng cho nhau.

Tỷ lệ lạm phát của vàng đáng tin cậy nhờ vào các đặc tính vật lý của hành tinh chúng ta — nó có độ cứng của nguyên tử. Một hợp đồng đáng tin cậy vì các thể chế sẽ đến và tịch thu tài sản của bạn nếu bạn không tuân theo các cam kết của mình. Một hợp đồng thông minh sẽ hoạt động vì nó được bảo mật bởi một giao thức kinh tế mật mã với hàng tỷ đô la đang được đặt cược.

Bạn có thể coi nguyên tử, thể chế và chuỗi khối giống như vật liệu xây dựng — như gỗ, bê tông và thép. Chúng khác nhau, nhưng chúng là một phần của một danh mục chung. Và chúng ta sử dụng những thứ này không phải để xây dựng các tòa nhà, mà để xây dựng một nền văn minh. Có lẽ với những vật liệu tốt hơn, chúng ta có thể xây dựng một nền văn minh lớn hơn, tốt hơn, mạnh mẽ hơn nền văn minh mà chúng ta đang có hiện nay.

#### Độ cứng là gì? (14:00) {#what-is-hardness-1400}

Hãy để tôi giải thích chính xác hơn về ý của tôi khi nói đến độ cứng. Đây không chỉ là bất kỳ độ tin cậy nào mà bất cứ thứ gì cũng có thể có. Độ cứng là một loại cụ thể. Điều cần lưu ý đầu tiên là nó là một loại độ tin cậy quan trọng đối với sự phối hợp xã hội. Không chỉ là, bạn biết đấy, cái bàn này chắc chắn là một cái bàn — mà là bạn có thể trả tiền thuê nhà, rằng một hợp đồng sẽ được thực thi, rằng một nền kinh tế vững mạnh. Đó là những thứ mà độ cứng hướng tới.

Và chính xác thì kết quả là gì? Thật không may, tôi đang giới thiệu một từ mới khác ở đây, mà tôi gọi là **khuôn đúc** (cast). Khuôn đúc là bất kỳ trạng thái tương lai khả thi nào của thế giới được làm cho chắc chắn hoặc an toàn bằng cách sử dụng độ cứng. Tôi xin lỗi vì thuật ngữ chuyên môn này, nhưng lý do để có một từ ở đây là tôi không nghĩ chúng ta có một từ có thể khái quát hóa trên tất cả các nguồn độ cứng. Nó có lẽ giống như bit — chúng ta cần một khái niệm mà chúng ta có thể nói đến trong nhiều bối cảnh khác nhau và chuyển đổi giữa các nguồn mà không bị ràng buộc vào một trong số chúng.

Một khuôn đúc liên quan đến một khoản vay sẽ là: nếu Alice không trả lại tiền cho Bob, thì các thể chế pháp lý sẽ sử dụng các mối đe dọa và hành động ngày càng nghiêm khắc để buộc cô ấy phải làm vậy. Khuôn đúc này được làm cứng bằng cách sử dụng độ cứng của thể chế. Một khuôn đúc về vàng có thể là một lượng vàng nhất định sẽ tham gia vào thị trường mỗi năm trong 20 năm tới — được làm cho đáng tin cậy bởi các đặc tính vật lý của Trái đất chúng ta. Và một khuôn đúc về Ethereum có thể là một yêu cầu nhận rằng tài sản chỉ có thể được chuyển nhượng nếu bạn nắm giữ khóa riêng tư tương ứng với một khóa công khai nhất định — được làm cứng bởi độ cứng của chuỗi khối.

Trong thực tế, chúng ta thường tương tác với các gói của những thứ này được đan xen vào nhau. Nếu bạn sở hữu vàng và giữ nó trong ngân hàng, rất nhiều điều quan trọng đối với bạn: các khuôn đúc về nguồn cung vàng trong tương lai, các khuôn đúc về độ vững chắc của kho tiền của ngân hàng, các khuôn đúc về tính pháp lý của thỏa thuận giữa bạn và ngân hàng, các khuôn đúc về độ tin cậy của hệ thống pháp luật ở quốc gia bạn sẽ thực thi các quy tắc đó nếu có sự cố xảy ra.

Thứ hai, độ cứng có thể được nói đến như một thước đo bảo mật. Về lý thuyết, nó luôn có thể đo lường được, ngay cả khi khó thực hiện trong thực tế. Khuôn đúc rằng một lượng vàng nhất định sẽ tham gia vào thị trường mỗi năm trong 20 năm tới cứng đến mức nào? Một cách bạn có thể xem xét nó là thông qua xác suất — xem xét tất cả dữ liệu và cố gắng dự đoán khả năng xảy ra. Hoặc bạn có thể xem xét nó từ góc độ chi phí: ai đó sẽ tốn bao nhiêu để phá vỡ khuôn đúc đó? Nếu bạn là một quốc gia, bạn có thể sử dụng sức mạnh của chiến tranh và quy định quốc tế. Hoặc bạn có thể đi theo hướng khác và lấy một tiểu hành tinh từ không gian có chứa nhiều vàng, lách qua các giới hạn vật lý của Trái đất. Có một cái giá phải trả để phá vỡ hầu hết mọi khuôn đúc.

Và cuối cùng, độ cứng đến từ các nguồn nhất định — nguyên tử, thể chế và chuỗi khối. Mỗi nguồn có các thuộc tính khác nhau khiến chúng hữu ích trong các bối cảnh khác nhau.

Điều tôi thích ở khuôn khổ này là nó cho phép chúng ta đặt ra những câu hỏi sâu sắc hơn — không chỉ nói về các thuộc tính cụ thể của chuỗi khối, mà còn so sánh tất cả những thứ khác nhau này và suy nghĩ về nơi chúng phù hợp, cách chúng ta sử dụng chúng và kết hợp chúng như thế nào.

#### Độ cứng của nguyên tử (19:00) {#atom-hardness-1900}

Độ cứng của nguyên tử là khi chúng ta tìm thấy độ tin cậy trong tự nhiên xung quanh mình — các nguyên tử vật lý theo nghĩa đen nhưng cũng là các thuộc tính tự nhiên khác. Chúng ta làm điều này khi sử dụng các hạt vàng làm tiền, khi sử dụng các cấu trúc vật lý để xác định quyền tài sản, hoặc ghi lại quyền tài sản trong một vật thể vật lý như một khế ước.

Nó có nhiều ưu điểm: thực thi tự động, trạng thái được chia sẻ, một bộ quy tắc phổ quát. Rất thuận tiện cho nền văn minh nhân loại khi các quy luật vật lý áp dụng như nhau ở mọi nơi, ít nhất là ở quy mô vĩ mô quan trọng nhất đối với chúng ta.

Nhưng nó có những điểm yếu. Chúng ta bị giới hạn ở những gì chúng ta có thể tìm thấy trên thế giới. Độ cứng của nguyên tử hơi giống một kiến trúc sư muốn xây dựng một vách đá vào ngôi nhà của họ — bạn phải tìm một vách đá phù hợp. Bạn không thể chỉ tạo ra một vách đá. Bạn có thể thay đổi nó một chút, nhưng bạn đang dựa vào việc tìm kiếm một đặc điểm tự nhiên phù hợp với nhu cầu cụ thể của bạn.

Chúng ta không thể đưa ra các quy tắc mới cho nó. Chúng ta có vàng, nhưng chúng ta không thể yêu cầu vũ trụ cung cấp cho chúng ta một loại vàng mới với lạm phát thấp hơn, phân bổ địa lý công bằng hơn, hoặc có thể khắc phục vấn đề về trọng lượng. Chúng ta không thể làm điều này. Và nó có khả năng lập trình rất hạn chế — chỉ có một số loại vật thể được làm cứng nhất định mà bạn có thể tạo ra từ độ cứng của nguyên tử, chủ yếu là tiền tệ. Bạn không thể tạo ra một thỏa thuận hôn nhân từ các nguyên tử. Bạn cần một thứ gì đó phức tạp hơn, như một thể chế, để làm điều đó.

Và các khuôn đúc thường bị suy yếu bởi sự kiểm soát ngày càng tăng của con người đối với tự nhiên. Sử dụng vỏ sò làm tiền là ổn cho đến khi bạn là một phần của nền kinh tế toàn cầu có thể làm đảo lộn hoàn toàn kỳ vọng của bạn về lạm phát vỏ sò, và đột nhiên nền kinh tế của bạn bị xóa sổ. Sử dụng vàng như một phương tiện trao đổi có thể phải đối mặt với vấn đề tương tự vào một ngày nào đó nếu và khi chúng ta có thể lấy được vàng từ tiểu hành tinh và thay đổi các giả định của chúng ta về nguồn cung.

Nhưng nó còn tinh tế hơn thế. Đôi khi chúng ta có những khuôn đúc mà chúng ta thậm chí không nhận ra là có tồn tại, nhưng rồi chúng biến mất vì một điều gì đó đã thay đổi. Đã có một khuôn đúc cứng về tốc độ giao dịch trên thị trường tài chính trong một thời gian dài — nó chỉ có thể được thực hiện ở một tốc độ nhất định, có thể là tốc độ mà ai đó có thể hét vào mặt nhau trên sàn giao dịch. Khuôn đúc này cứng như nguyên tử — chúng ta đơn giản là không thể giao tiếp nhanh hơn thế. Nhưng công nghệ mới đã hoàn toàn làm suy yếu những giả định đó. Chúng ta nhận ra rằng chúng ta thực sự thích một phiên bản của khuôn đúc cũ đó và đã làm lại nó từ các thể chế — đưa ra các quy định giới hạn tốc độ giao dịch và thực thi các cơ chế ngắt mạch (circuit breakers).

#### Độ cứng của thể chế (22:00) {#institutional-hardness-2200}

Độ cứng của thể chế là một danh mục rất rộng — nó bao gồm hầu hết những thứ chúng ta có thể nghĩ đến khi nghĩ về nền văn minh. Hệ thống pháp luật, cơ quan lập pháp, lực lượng cảnh sát, tập đoàn, mọi thứ. Tất cả các thể chế cung cấp độ cứng dưới một hình thức nào đó. Chúng ta đã tạo ra các khuôn đúc mang lại trật tự cho xã hội của chúng ta, trừng phạt các hành vi chống đối xã hội. Chúng ta đã tạo ra độ cứng như một nền tảng, cho phép bất kỳ ai tạo ra các khuôn đúc của riêng họ được làm cứng bởi các thể chế nếu bạn tuân theo các quy tắc nhất định. Chúng ta đã tạo ra các khuôn đúc sinh ra các tài sản mới và cung cấp các nguồn tín dụng cho các nền kinh tế đang phát triển.

Độ cứng của thể chế có nhiều ưu điểm. Nó rất dễ lập trình — con người được nhóm thành các tổ chức có thể nhận những chỉ thị thực sự phức tạp hoặc tinh tế. Đây là một không gian thiết kế rất lớn cho các khuôn đúc khả thi. Và chúng được tạo nên từ con người, và con người thì tốt. Có lẽ thật tốt khi đôi khi ai đó có thể can thiệp và nói, "Tôi sẽ không thực thi điều đó vì tôi nghĩ nó sai." Thật tốt khi có lẽ đôi khi có một sự phá vỡ trong hệ thống để ai đó trở thành người thổi còi (whistleblower) hoặc một người nổi loạn.

Nhưng nó cũng có nhiều điểm yếu. Nó bị giới hạn bởi biên giới — chỉ ở một số quốc gia nhất định, bạn mới thực sự có quyền tiếp cận các thể chế thực thi pháp quyền. Nó dễ bị ảnh hưởng bởi sự thất bại của chính trị hoặc nhà nước — nếu chính phủ của bạn không thể thống nhất về mọi thứ, hoặc bạn bị xâm lược bởi một quốc gia hiếu chiến, một số thể chế nhất định mà bạn dựa vào cho tiền bạc hoặc hợp đồng có thể sụp đổ. Chúng thường không minh bạch — rất khó để biết một thể chế có thực sự cứng hay không cho đến khi có sự cố xảy ra. Chúng có chi phí khởi tạo cao — chúng ta không thể dễ dàng tạo ra các thể chế mới ở quy mô của Fed hoặc hệ thống pháp luật để lặp lại chúng. Chúng ta gần như bị mắc kẹt với những gì chúng ta đang có.

Và chúng được tạo nên từ con người, và con người thì xấu. Thực tế ở quốc gia này và nhiều quốc gia khác là nhiều người chưa thực sự được tiếp cận với độ cứng do các thể chế cung cấp. Họ không thể vay thế chấp. Họ không thể mở tài khoản ngân hàng. Bởi vì khi bạn lấp đầy một thể chế bằng con người, nó sẽ phải chịu những thói hư tật xấu, định kiến, hệ tư tưởng của họ. Và sự phụ thuộc của chúng ta vào độ cứng của thể chế chỉ ngày càng tăng. Vấn đề với việc phần mềm đang nuốt chửng thế giới là hầu hết phần mềm thực sự chỉ được tạo ra từ một thể chế đằng sau màn hình, và kết quả là chúng ta đang trao cho chúng ngày càng nhiều quyền lực.

#### Độ cứng của chuỗi khối (24:20) {#blockchain-hardness-2420}

Phát minh của Satoshi tất nhiên không chỉ là Bitcoin — nó là hạt nhân của một kỹ thuật đa mục đích để tạo ra độ cứng kỹ thuật số trong môi trường kỹ thuật số. Nó có nhiều điểm mạnh: khả năng tiếp cận toàn cầu phổ quát, nó được làm bằng phần mềm và bất kỳ ai cũng có thể viết phần mềm, mức độ cứng có thể minh bạch và có thể kiểm toán được, chi phí khởi tạo thấp, dễ dàng lặp lại và được bảo mật bởi các động lực thị trường — và thị trường thì hợp lý.

Nhưng nó cũng có những điểm yếu. Nó đòi hỏi một nền văn minh công nghệ — chúng ta không thể có chuỗi khối trước đây vì những yêu cầu đó, và một nền văn minh trong tương lai không có những gì chúng ta có cũng sẽ không thể sử dụng chúng. Nó được làm bằng phần mềm, và phần mềm có thể được viết rất tệ. Phạm vi của các khuôn đúc bị giới hạn trong các môi trường trên chuỗi. Và nó được bảo mật bởi các động lực thị trường — và thị trường thì phi lý.

#### Tại sao điều này lại quan trọng (25:10) {#why-this-matters-2510}

Vậy điều này có ý nghĩa gì? Điều này mang lại cho chúng ta điều gì? Tại sao điều này không chỉ là một sự quan tâm mang tính học thuật?

Rất nhiều thứ bắt đầu trở nên có ý nghĩa hơn nhiều khi được nhìn qua lăng kính này. Một là câu hỏi mà chúng ta đã bắt đầu: tại sao chúng ta nói rằng chuỗi khối vừa không cần tin cậy vừa đáng tin cậy? Lời giải thích là thế này — khi chúng ta nói chuỗi khối là không cần tin cậy, điều chúng ta thực sự muốn nói là độ cứng của chúng không phụ thuộc vào một người hay một thể chế. Và khi chúng ta nói chúng đáng tin cậy, chúng ta chỉ muốn nói rằng chúng có độ cứng — chỉ là một loại khác. Việc chúng ta không thể tạo ra sự phân biệt đó là nguyên nhân gây ra ngôn ngữ khó hiểu này.

Nó giải thích tại sao các chuỗi khối riêng tư hoặc tập trung lại không thú vị. Một chuỗi khối không phi tập trung chỉ sụp đổ trở lại thành một thể chế. Nếu nó được kiểm soát bởi ba ngân hàng hoặc một số ít các trình xác thực đều được tài trợ bởi cùng một tổ chức, thì nó chỉ là một EVM được bảo mật bởi độ cứng của thể chế. Điều thú vị nhất về chuỗi khối không phải là EVM — mà là có một nguồn độ cứng khác không tương quan hoặc không phải chịu những thất bại và hạn chế tương tự như các thể chế. Đó là lý do tại sao nó khác biệt. Đó là lý do tại sao nó quan trọng.

Nó cũng giúp hiểu được phổ các khả năng và các hệ tư tưởng mặc định mà mọi người rơi vào trong không gian chuỗi khối. Nhiều người rất tập trung vào việc sử dụng độ cứng của chuỗi khối để cạnh tranh hoặc thay thế độ cứng của thể chế — đây là những gì mà phần lớn cộng đồng Bitcoin hướng tới, những gì mà phần lớn tài chính phi tập trung (DeFi) hướng tới. Thậm chí ENS cũng đang cố gắng thay thế hoặc cạnh tranh với DNS theo một cách nào đó. Nhưng sau đó cũng có những người thấy rằng độ cứng của chuỗi khối có thể làm những điều mà độ cứng của thể chế không thể — những ý tưởng chưa ai từng thử trước đây vì chúng ta chưa bao giờ có năng lực này, hương vị độ cứng nhất định này. Và bây giờ chúng ta có thể khám phá những điều đó. Có thể NFT ở đó, hoặc các trò chơi như Dark Forest, hoặc phong trào xung quanh các thế giới tự trị.

#### Nâng cao tham vọng của chúng ta (27:00) {#raising-our-ambitions-2700}

Quan trọng nhất, tôi nghĩ khuôn khổ này nâng cao tham vọng của chúng ta. Cá nhân tôi, đây là điều quan trọng đối với tôi, và có thể nó cũng cộng hưởng với bạn — tôi không chỉ ở đây vì các ứng dụng riêng lẻ này. Tôi không phải là người chỉ thực sự quan tâm đến Bitcoin hay tất cả về DeFi hay tất cả về NFT. Có thể bạn cũng vậy. Có một điều gì đó lớn lao hơn đang diễn ra ở đây.

Chúng ta có thể thành thật đặt mục tiêu cao hơn tiền bạc. Chúng ta có thể đặt mục tiêu cao hơn tài chính. Có một bức tranh toàn cảnh lớn hơn nhiều. Tôi nghĩ điều này thực sự giúp xác định một tầm nhìn có quy mô tương xứng với những thách thức chúng ta phải đối mặt và những cơ hội mà chuỗi khối mang lại.

Sứ mệnh không chỉ là thay thế Fed. Sứ mệnh là cải thiện và mở rộng chính những vật liệu mà chúng ta đã sử dụng để xây dựng nền văn minh của mình — giảm chi phí của những công cụ này để mọi người trên Trái đất đều có quyền tiếp cận chúng, cho phép nhiều thay đổi hơn xảy ra. Và nhân tiện, chi phí đó sẽ sớm giảm xuống.

Để giúp nhân loại tiếp tục chơi trò chơi vô tận này bằng cách để nhiều người hơn thay đổi các quy tắc. Rất ít người có thể ban hành luật, nhưng bất kỳ ai cũng có thể viết một hợp đồng thông minh. Chúng ta đang mở rộng năng lực đó.

Tôi nghĩ rất nhiều người ở nhiều quốc gia khác nhau và nhiều hệ tư tưởng khác nhau cảm thấy như chúng ta đang bị mắc kẹt — rằng các quy tắc của trò chơi không còn như những gì chúng nên có nữa, nhưng chúng ta bất lực trong việc thay đổi chúng. Chúng ta bị mắc kẹt theo nhiều cách trong cực đại cục bộ (local maximum) này, và chúng ta trực giác rằng điều đó là sai. Chuỗi khối không khắc phục được điều đó, nhưng tôi nghĩ chúng có thể giúp ích. Chúng mở ra một không gian mới cho sự thử nghiệm. Chúng cho phép nhiều người hơn thay đổi các quy tắc, viết các quy tắc mới, đóng góp vào trò chơi vô tận đó. Chúng ta không thể viết luật, nhưng chúng ta có thể viết một hợp đồng thông minh.

Tôi muốn kết thúc bằng lưu ý này: nếu bạn đã từng xem các bài nói chuyện của những người tại EF trước đây, bạn biết chúng tôi rất thích cuốn sách *Trò chơi Hữu hạn và Vô hạn* (Finite and Infinite Games). Một trong những châm ngôn từ cuốn sách này là chỉ những gì có thể thay đổi mới có thể tiếp tục. Chúng ta không thể cứ mắc kẹt trong cực đại cục bộ này. Chúng ta phải thay đổi mọi thứ. Và tôi nghĩ chuỗi khối giúp chúng ta làm điều đó. Cảm ơn các bạn rất nhiều.