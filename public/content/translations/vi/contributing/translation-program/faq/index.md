---
title: Hướng dẫn dịch ethereum.org
metaTitle: Các câu hỏi thường gặp (FAQ) về Chương trình Dịch thuật
lang: vi
description: Các câu hỏi thường gặp về Chương trình Dịch thuật ethereum.org
---

Nếu bạn mới tham gia Chương trình Dịch thuật và còn do dự chưa muốn bắt đầu ngay, dưới đây là một số câu hỏi thường gặp (FAQ) có thể giúp bạn bắt đầu. Hãy sử dụng hướng dẫn này để tìm câu trả lời cho các thắc mắc phổ biến nhất.

## Tôi có được trả thù lao khi dịch ethereum.org không? {#compensation}

Ethereum.org là một trang web mã nguồn mở, điều này có nghĩa là bất kỳ ai cũng có thể tham gia và đóng góp.

Chương trình Dịch thuật ethereum.org là một phần mở rộng của điều đó và được tổ chức với một triết lý tương tự.

Mục tiêu của Chương trình Dịch thuật là làm cho nội dung về Ethereum có thể tiếp cận được với mọi người, bất kể họ nói ngôn ngữ nào. Nó cũng cho phép bất kỳ người song ngữ nào tham gia vào hệ sinh thái Ethereum và đóng góp một cách dễ dàng.

Vì lý do này, Chương trình Dịch thuật mang tính mở và tự nguyện, và việc tham gia không đi kèm với thù lao. Nếu chúng tôi trả thù lao cho người dịch dựa trên số lượng từ họ dịch, chúng tôi sẽ chỉ có thể mời những người có đủ kinh nghiệm dịch thuật (dịch giả chuyên nghiệp) tham gia Chương trình Dịch thuật. Điều này sẽ làm cho Chương trình Dịch thuật mang tính loại trừ và ngăn cản chúng tôi đạt được các mục tiêu đã đề ra, cụ thể là: cho phép mọi người tham gia và đóng góp vào hệ sinh thái.

Chúng tôi nỗ lực hết sức để tạo điều kiện cho những người đóng góp thành công trong hệ sinh thái Ethereum; có nhiều phần thưởng phi tiền tệ được áp dụng như: [tặng POAP](/contributing/translation-program/acknowledgements/#poap) và [chứng nhận dịch giả](/contributing/translation-program/acknowledgements/#certificate), cũng như tổ chức [Bảng xếp hạng Dịch thuật](/contributing/translation-program/acknowledgements/) và [vinh danh tất cả các dịch giả của chúng tôi trên trang web](/contributing/translation-program/contributors/).

## Làm cách nào để dịch các chuỗi có chứa `<HTML tags>`? {#tags}

Không phải mọi chuỗi đều được viết dưới dạng văn bản thuần túy. Có một số chuỗi bao gồm các đoạn mã hỗn hợp như thẻ HTML (`<0>`, `</0>`). Điều này thường dùng cho các siêu liên kết hoặc định dạng kiểu chữ khác ở giữa câu.

- Dịch phần văn bản bên trong các thẻ nhưng không dịch bản thân các thẻ đó. Bất kỳ thứ gì nằm trong `<` và `>` đều không được dịch hoặc xóa bỏ.
- Để giữ cho chuỗi được an toàn, chúng tôi khuyên bạn nên nhấp vào nút "Copy Source" (Sao chép Nguồn) ở dưới cùng bên trái. Thao tác này sẽ sao chép chuỗi gốc và dán vào hộp văn bản. Điều này giúp bạn xác định rõ vị trí của các thẻ và tránh mắc lỗi.

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

Bạn có thể di chuyển vị trí của các thẻ trong chuỗi để làm cho câu văn tự nhiên hơn trong ngôn ngữ của bạn – chỉ cần đảm bảo di chuyển toàn bộ thẻ.

Để biết thêm thông tin chi tiết về cách xử lý các thẻ và đoạn mã, vui lòng tham khảo [Hướng dẫn Văn phong Dịch thuật ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Các chuỗi nằm ở đâu? {#strings}

Thường thì chỉ riêng các chuỗi nguồn có thể không đủ để bạn cung cấp một bản dịch chính xác.

- Hãy xem phần "screenshots" (ảnh chụp màn hình) và "context" (ngữ cảnh) để biết thêm thông tin. Trong phần chuỗi nguồn, bạn sẽ thấy hình ảnh chụp màn hình được đính kèm, cho bạn thấy cách chúng tôi đang sử dụng chuỗi đó trong ngữ cảnh thực tế.
- Nếu bạn vẫn không chắc chắn, hãy báo cáo vấn đề trong "comment section" (phần bình luận). [Bạn không chắc chắn về cách để lại bình luận?](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## Làm cách nào để tôi để lại bình luận hoặc đặt câu hỏi? Tôi muốn báo cáo một vấn đề hoặc lỗi chính tả... {#comment}

Nếu bạn muốn báo cáo về một chuỗi cụ thể cần được chú ý, đừng ngần ngại gửi bình luận.

- Nhấp vào nút thứ hai trên thanh trên cùng bên phải. Tab ẩn sẽ xuất hiện ở bên phải của bạn. Để lại một bình luận mới và đánh dấu vào ô "Issue" (Vấn đề) ở dưới cùng. Bạn có thể chỉ định loại vấn đề bằng cách chọn một trong các tùy chọn từ menu thả xuống.
- Sau khi gửi, vấn đề sẽ được báo cáo cho nhóm của chúng tôi. Chúng tôi sẽ khắc phục sự cố và thông báo cho bạn bằng cách trả lời bình luận của bạn và đóng vấn đề đó lại.
- Nếu bạn báo cáo một bản dịch không chính xác, bản dịch đó và đề xuất thay thế của bạn sẽ được một người bản ngữ xem xét trong lần đánh giá tiếp theo.

![Showing how to make comments and issues](./comment-issue.png)

## Bộ nhớ Dịch thuật (Translation Memory - TM) là gì? {#translation-memory}

Bộ nhớ Dịch thuật (Translation Memory - TM) là một tính năng của Crowdin giúp lưu trữ tất cả các chuỗi đã được dịch trước đó trên toàn bộ ethereum.org. Khi một chuỗi được dịch, nó sẽ tự động được lưu vào TM của dự án chúng tôi. Đây có thể là một công cụ hữu ích giúp bạn tiết kiệm thời gian!

- Hãy xem phần "TM and MT Suggestions" (Đề xuất từ TM và MT) và bạn sẽ thấy cách các dịch giả khác đã dịch chuỗi giống hoặc tương tự. Nếu bạn tìm thấy một đề xuất có tỷ lệ khớp cao, đừng ngần ngại tham khảo bản dịch đó bằng cách nhấp vào nó.
- Nếu không có gì trong danh sách, bạn có thể tìm kiếm trong TM các bản dịch đã thực hiện trước đó và sử dụng lại chúng để đảm bảo tính nhất quán.

![A screenshot of the translation memory](./translation-memory.png)

## Làm cách nào để sử dụng bảng thuật ngữ Crowdin? {#glossary}

Thuật ngữ Ethereum là một phần quan trọng khác trong công việc dịch thuật của chúng tôi vì thường thì các thuật ngữ công nghệ mới sẽ chưa được bản địa hóa trong nhiều ngôn ngữ. Ngoài ra, có những thuật ngữ mang ý nghĩa khác nhau trong các ngữ cảnh khác nhau. [Tìm hiểu thêm về cách dịch thuật ngữ Ethereum](#terminology)

Bảng thuật ngữ Crowdin là nơi tốt nhất để làm rõ các thuật ngữ và định nghĩa. Có hai cách để tham khảo bảng thuật ngữ.

- Đầu tiên, khi bạn thấy một thuật ngữ được gạch chân trên chuỗi nguồn, bạn có thể di chuột qua và xem định nghĩa ngắn gọn của nó.

![An example glossary definition](./glossary-definition.png)

- Thứ hai, nếu bạn thấy một thuật ngữ không quen thuộc với mình nhưng không được gạch chân, bạn có thể tìm kiếm trong tab bảng thuật ngữ (nút thứ ba ở cột bên phải). Bạn sẽ tìm thấy lời giải thích cho các thuật ngữ cụ thể và những thuật ngữ thường được sử dụng trong dự án.

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- Nếu bạn vẫn không thể tìm thấy, đây là cơ hội để bạn thêm một thuật ngữ mới! Chúng tôi khuyến khích bạn tra cứu trên công cụ tìm kiếm và thêm mô tả vào bảng thuật ngữ. Điều này sẽ giúp ích rất nhiều cho các dịch giả khác để hiểu rõ hơn về thuật ngữ đó.

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### Chính sách dịch thuật ngữ {#terminology}

_Đối với tên riêng (thương hiệu, công ty, con người) và các thuật ngữ công nghệ mới (Chuỗi Beacon, chuỗi phân mảnh, v.v.)_

Ethereum đưa ra rất nhiều thuật ngữ mới được tạo ra gần đây. Một số thuật ngữ sẽ khác nhau tùy theo từng dịch giả vì không có bản dịch chính thức nào trong ngôn ngữ tương ứng của họ. Những sự không nhất quán như vậy có thể gây hiểu lầm và làm giảm khả năng đọc hiểu.

Do sự đa dạng về ngôn ngữ và các tiêu chuẩn hóa khác nhau trong mỗi ngôn ngữ, gần như không thể đưa ra một chính sách dịch thuật ngữ thống nhất có thể áp dụng cho tất cả các ngôn ngữ được hỗ trợ.

Sau khi cân nhắc kỹ lưỡng, chúng tôi đã đi đến quyết định để lại các thuật ngữ được sử dụng thường xuyên nhất cho các bạn, những người dịch, tự quyết định.

Dưới đây là những gì chúng tôi đề xuất khi bạn gặp một thuật ngữ không quen thuộc:

- Tham khảo [Bảng thuật ngữ](#glossary), bạn có thể tìm thấy cách các dịch giả khác đã dịch nó trước đây. Nếu bạn cho rằng thuật ngữ đã được dịch trước đó không phù hợp, đừng ngần ngại khôi phục bản dịch của bạn bằng cách thêm một thuật ngữ mới vào Bảng thuật ngữ Crowdin.
- Nếu bản dịch trước đó không tồn tại trong Bảng thuật ngữ, chúng tôi khuyến khích bạn tra cứu trên công cụ tìm kiếm hoặc các bài báo truyền thông để xem thuật ngữ đó thực sự được sử dụng như thế nào trong cộng đồng của bạn.
- Nếu bạn hoàn toàn không tìm thấy bất kỳ tài liệu tham khảo nào, hãy tin vào trực giác của mình và đề xuất một bản dịch mới cho ngôn ngữ của bạn!
- Nếu bạn cảm thấy không tự tin để làm điều đó, hãy giữ nguyên thuật ngữ không dịch. Đôi khi, các thuật ngữ tiếng Anh là quá đủ để truyền đạt các định nghĩa chính xác.

Chúng tôi khuyên bạn nên giữ nguyên tên của các thương hiệu, công ty và nhân sự không dịch vì việc dịch có thể gây ra sự nhầm lẫn không cần thiết và khó khăn cho SEO.

## Quy trình đánh giá hoạt động như thế nào? {#review-process}

Để đảm bảo một mức độ chất lượng và tính nhất quán nhất định trong các bản dịch của mình, chúng tôi hợp tác với [Acolad](https://www.acolad.com/), một trong những nhà cung cấp dịch vụ ngôn ngữ lớn nhất toàn cầu. Acolad có 20.000 nhà ngôn ngữ học chuyên nghiệp, điều này có nghĩa là họ có thể cung cấp những người đánh giá chuyên nghiệp cho mọi ngôn ngữ và loại nội dung mà chúng tôi cần.

Quy trình đánh giá rất đơn giản; khi một tập hợp nội dung được dịch 100%, chúng tôi sẽ yêu cầu đánh giá cho nhóm nội dung đó. Quy trình đánh giá diễn ra trực tiếp trên Crowdin. Sau khi quá trình đánh giá hoàn tất, chúng tôi sẽ cập nhật trang web với nội dung đã được dịch.

## Làm cách nào để tôi thêm nội dung bằng ngôn ngữ của mình? {#adding-foreign-language-content}

Hiện tại, tất cả nội dung không phải tiếng Anh đều được dịch trực tiếp từ nội dung nguồn tiếng Anh và bất kỳ nội dung nào không tồn tại bằng tiếng Anh đều không thể được thêm vào các ngôn ngữ khác.

Để đề xuất nội dung mới cho ethereum.org, bạn có thể [tạo một issue](https://github.com/ethereum/ethereum-org-website/issues) trên GitHub. Nếu được thêm vào, nội dung sẽ được viết bằng tiếng Anh và được dịch sang các ngôn ngữ khác bằng Crowdin.

Chúng tôi dự định sẽ bổ sung hỗ trợ cho việc thêm nội dung không phải tiếng Anh trong tương lai gần.

## Liên hệ {#contact}

Cảm ơn bạn đã đọc hết những thông tin này. Chúng tôi hy vọng điều này sẽ giúp bạn làm quen với chương trình của chúng tôi. Đừng ngần ngại tham gia [kênh dịch thuật Discord](https://discord.gg/ethereum-org) của chúng tôi để đặt câu hỏi và cộng tác với các dịch giả khác, hoặc liên hệ với chúng tôi qua địa chỉ translations@ethereum.org!