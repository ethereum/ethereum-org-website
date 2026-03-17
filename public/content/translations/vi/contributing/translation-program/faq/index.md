---
title: "Câu hỏi thường gặp về Chương trình Dịch thuật (FAQ)"
lang: vi
description: "Các câu hỏi thường gặp về Chương trình Dịch thuật ethereum.org"
---

# Hướng dẫn dịch thuật ethereum.org {#translating-ethereum-guide}

Nếu bạn chưa tham gia Chương trình Dịch thuật và đang lưỡng lự tham gia, đây là một số câu hỏi thường gặp có thể giúp bạn bắt đầu. Sử dụng những hướng dẫn này để tìm hướng giải quyết cho các truy vấn phổ biến nhất.

## Tôi có được trả lương để dịch ethereum.org không? {#compensation}

Ethereum.org là một trang web mã nguồn mở, tức là bất kỳ ai có thể tham gia đóng góp.

Do đó, chương trình Dịch thuật ethereum.org cũng được tổ chức theo triết lý ấy.

Mục đích của Chương trinh Dịch thuật là để giúp nội dung về Ethereum có thể được tiếp cận bởi bất cứ ai, dù họ nói ngôn ngữ nào. Nó cũng cho phép những người có khả năng song ngữ tham gia vào hệ sinh thái Ethereum và đóng góp một cách có thể tiếp cận.

Vì vậy, Chương trình Dịch thuật là hoàn toàn mở và tự nguyện, và sự tham gia không đồng nghĩa với việc được trả lương. Nếu chúng tôi có thể trả lương cho dịch giả dựa vào số từ họ dịch, thì chúng tôi sẽ chỉ có thể mời những người có đủ kinh nghiệm dịch thuật (những người dịch chuyên nghiệp) tham gia Chương trình Dịch thuật. Điều này sẽ làm Chương trình Dịch thuật trở nên hạn chế và ngăn cản chúng tôi đạt các mục đích đã đề ra, đặc biệt là: cho phép tất cả mọi người tham gia đóng góp vào hệ sinh thái.

Chúng tôi nỗ lực hết mình để giúp những người đóng góp thành công trong hệ sinh thái Ethereum; nhiều ưu đãi phi tiền tệ được áp dụng như: [cung cấp POAP](/contributing/translation-program/acknowledgements/#poap) và [chứng chỉ dịch giả](/contributing/translation-program/acknowledgements/#certificate), cũng như tổ chức [Bảng xếp hạng Dịch thuật](/contributing/translation-program/acknowledgements/) và [liệt kê tất cả các dịch giả của chúng tôi trên trang web](/contributing/translation-program/contributors/).

## Làm cách nào để dịch các chuỗi có `<thẻ HTML>`? {#tags}

Không phải các phần tử nào ở trong một thẻ đều được viết ở dạng văn bản thuần túy. Có một số chuỗi bao gồm các tập lệnh hỗn hợp như thẻ HTML (`<0>`, `</0>`). Điều này thường dùng cho các siêu liên kết hoặc kiểu dáng thay thế ở giữa câu.

- Chỉ dịch những đoạn văn bản bên trong các thẻ chứ không dịch tên của thẻ đó. Bất cứ thứ gì trong dấu `<` và `>` đều không được dịch hoặc xóa.
- Để đảm bảo các thẻ không bị lỗi, chúng tôi khuyên bạn nên nhấp vào nút "Sao chép từ gốc" (Ctrl+Shift+C) ở phía dưới bên trái. Cách này sẽ giúp bạn sao chép toàn bộ đoạn kí tự và thẻ gốc vào khung dịch. Hơn nữa nó sẽ giúp bạn làm rõ được là những đoạn đóng mở thẻ nằm ở đâu, và hạn chế bạn thay đổi chúng.

![Giao diện Crowdin với nút sao chép nguồn được làm nổi bật](./html-tag-strings.png)

Bạn có thể di chuyển vị trí của các thẻ trong đoạn văn bản để nó tương xứng hơn trong cách thể hiện ngôn ngữ của bạn - phải nhớ là di chuyển toàn bộ đoạn chứa thẻ.

Để biết thêm thông tin chuyên sâu về việc xử lý các thẻ và đoạn mã, vui lòng tham khảo [Hướng dẫn về Phong cách Dịch thuật của ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Những thẻ đó nằm ở đâu? {#strings}

Thường thì những thẻ riêng biệt đó có thể không đủ để bạn cung cấp bản dịch chính xác.

- Hãy thử nhìn vào "Ảnh chụp" và "Nội dung" để hiểu thêm. Trong đoạn văn bản gốc, bạn sẽ thấy ảnh chụp màn hình được đính kèm. Chúng sẽ cho bạn thấy khi dịch, thẻ cùng đoạn dịch thuật đó sẽ được hiển thị như thế nào.
- Nếu bạn vẫn chưa rõ hay còn phân vân, hãy cắm cờ trong "Phần bình luận". [Bạn chưa biết cách để lại bình luận?](#comment)

![Cách cung cấp ngữ cảnh cho dòng chữ bằng ảnh chụp màn hình](./source-string.png)

![Một ví dụ về ảnh chụp màn hình được thêm làm ngữ cảnh](./source-string-2.png)

## Làm thế nào để tôi có thể thảo luận hay đưa ra khiếu nại? Tôi muốn khiếu nại về lỗi dịch thuật... {#comment}

Nếu bạn muốn cắm cờ (khiếu nại) về một đoạn văn bản cụ thể nào nó cần được xem xét dịch lại, vui lòng gửi phản hồi ở mục bình luận.

- Nhấn vào nút thứ hai của thanh trên cùng phía bên phải. Tab ẩn danh sẽ xuất hiện phía bên phải. Để lại lời bình/khiếu nại hoặc chuyển bình luận đó thành danh mục bàn luận khác bằng cách click vào ô "Issue" ở ngay dưới ô gõ. Bạn có thể nêu rõ danh mục của vấn đề bạn đang đề cập là gì một cách chi tiết theo những lựa chọn có sẵn.
- Một khi đã gửi, phản hồi của bạn sẽ được báo cáo đến đội ngũ của chúng tôi. Chúng tôi sẽ giải quyết những vấn đề đó và sẽ thông tin đến bạn bằng cách phản hồi trực tiếp và đóng khiếu nại.
- Nếu bạn báo cáo một bản dịch sai, bản dịch đó cũng như chỉnh sửa khuyến nghị của bạn sẽ được duyệt bởi một người bản xứ trong lần duyệt tiếp theo.

![Cách nêu bình luận và vấn đề](./comment-issue.png)

## Bộ nhớ dịch thuật (Translation Memory - TM) là gì? {#translation-memory}

Bộ nhớ dịch thuật (Translation Memory - TM) là một tính năng thú vị của Crowdin. Nó sẽ tự động lưu những danh từ riêng, thuật ngữ phổ biến mà đã được dịch từ trước trên ethereum.org. Khi một thuật ngữ nào đó được dịch, nó sẽ tự động được lưu theo project đó trên Bộ nhớ dịch thuật (TM). Đây sẽ là công cụ rất hữu dụng để tiết kiệm thời gian của bạn!

- Để ý đến phần "TM AND MT SUGGESTIONS" và bạn sẽ thấy các dịch giả khác đã dịch những thuật ngữ đó giống y hệt hoặc gần tương tự như thế nào. Nếu bạn cảm thấy bản dịch mà được khuyến nghị dùng khá sát với ngữ nghĩa bạn đang nghĩ, hãy đừng ngần ngại mà dùng chúng bằng cách nhấn trực tiếp vào chúng nhé.
- Nếu chẳng có thuật ngữ nào được đề xuất cho bản dịch của bạn thì bạn có thể tìm trên TM bản dịch trước đó và tái sử dụng nó để đảm bảo tính nhất quán (các thuật ngữ mới dịch theo cách của bản thân phải thống nhất với những dịch giả trước).

![Ảnh chụp màn hình của bộ nhớ dịch](./translation-memory.png)

## Làm thế nào để sử dụng bảng thuật ngữ Crowdin? {#glossary}

Thuật ngữ Ethereum là một phần quan trọng khác trong công việc dịch thuật của chúng tôi vì thường các thuật ngữ công nghệ mới chưa được dịch thuần trong nhiều ngôn ngữ. Ngoài ra, có những thuật ngữ có ý nghĩa khác nhau trong các ngữ cảnh khác nhau. [Tìm hiểu thêm về thuật ngữ Ethereum](#terminology)

Bảng thuật ngữ Crowdin là công cụ tốt nhất để hiểu rõ các thuật ngữ và định nghĩa của chúng. Có hai cách để tra bảng thuật ngữ.

- Cách thứ nhất, khi bạn đang dịch mà tìm thấy một thuật ngữ nào đó có dấu gạch dưới trên đoạn văn bản gốc, bạn có thể di chuột vào để xem định nghĩa ngắn gọn về nó bằng ngôn ngữ của bạn.

![Một định nghĩa ví dụ trong bảng thuật ngữ](./glossary-definition.png)

- Thứ hai, nếu bạn thấy một thuật ngữ nào đó bạn không hiểu và cũng không được gạch chân, bạn có thể tìm kiếm trong tab thuật ngữ (icon thứ 3 của thanh phía trên bên phải). Bạn sẽ tìm thấy sự giải thích về các thuật ngữ cụ thể và những thuật ngữ thường được sử dụng trong dự án.

![Ảnh chụp màn hình hiển thị vị trí tab Bảng thuật ngữ trong Crowdin](./glossary-tab.png)

- Nếu bạn vẫn không thể tìm nó, đây là cơ hội của bạn để tạo ra một thuật ngữ mới! Chúng tôi khuyến nghị bạn tra nó trên một công cụ tìm kiếm và thêm miêu tả vào mục chú giải. Nó sẽ giúp đỡ các dịch giả khác rất nhiều để hiểu rõ thuật ngữ hơn.

![Ảnh chụp màn hình hiển thị cách thêm một thuật ngữ vào Bảng thuật ngữ trên Crowdin](./add-glossary-term.png)

### Chính sách dịch thuật thuật ngữ {#terminology}

_Đối với tên gọi (thương hiệu, công ty, cá nhân) và các thuật ngữ công nghệ mới (Chuỗi Hải Đăng, các chuỗi phân đoạn, v.v.)_

Ethereum đưa ra rất nhiều thuật ngữ mới vừa được gắn tên gần đây. Một số thuật ngữ sẽ có cách dịch khác nhau giữa các dịch giả vì không có bản dịch chính thức trong từng ngôn ngữ. Những sự không nhất quán này có thể gây hiểu lầm và làm giảm khả năng đọc.

Do sự đa dạng ngôn ngữ và các tiêu chuẩn khác nhau ở từng ngôn ngữ, gần như không thể xây dựng một chính sách dịch thuật thống nhất cho tất cả các ngôn ngữ được hỗ trợ.

Sau khi cân nhắc kỹ lưỡng, chúng tôi đã quyết định để các thuật ngữ được sử dụng thường xuyên nhất cho các bạn, những dịch giả.

Chúng tôi gợi ý như sau khi bạn gặp một thuật ngữ lạ:

- Tham khảo [Bảng thuật ngữ](#glossary), bạn có thể thấy các dịch giả khác đã dịch thuật ngữ đó như thế nào. Nếu bạn cho rằng bản dịch trước đó chưa phù hợp, bạn có thể hồi phục bản dịch của mình bằng cách thêm thuật ngữ mới vào Chú giải thuật ngữ Crowdin.
- Nếu không có bản dịch trước đó trong mục Chú giải, chúng tôi khuyến khích bạn tra trên công cụ tìm kiếm hoặc các bài đăng truyền thông để xem thuật ngữ đó thường được sử dụng như thế nào trong cộng đồng của bạn.
- Nếu bạn không tìm thấy bất cứ tài liệu tham khảo nào, hãy tin vào trực giác của mình và đề xuất một bản dịch mới của ngôn ngữ của bạn!
- Nếu bạn không tự tin, hãy giữ thuật ngữ không dịch. Đôi lúc, các thuật ngữ bằng tiếng Anh đã đủ để truyền tải định nghĩa đúng.

Chúng tôi khuyến nghị bạn không dịch tên thương hiệu, công ty và cá nhân vì việc dịch có thể gây nhầm lẫn không cần thiết và khó khăn về SEO.

## Quy trình duyệt hoạt động thế nào? {#review-process}

Để đảm bảo một mức độ chất lượng và tính nhất quán nhất định trong các bản dịch của chúng tôi, chúng tôi hợp tác với [Acolad](https://www.acolad.com/), một trong những nhà cung cấp dịch vụ ngôn ngữ lớn nhất toàn cầu. Acolad có 20.000 ngôn ngữ viên chuyên nghiệp, nghĩa là họ có thể cung cấp người duyệt bản dịch chuyên nghiệp cho mọi ngôn ngữ và loại nội dung mà chúng tôi cần.

Quy trình duyệt rất đơn giản; một khi một gói nội dung được dịch 100%, chúng tôi sẽ đặt dịch vụ duyệt cho gói nội dung đó. Quá trình duyệt diễn ra trực tiếp trên Crowdin. Sau khi quá trình duyệt hoàn tất, chúng tôi cập nhật nội dung đã dịch lên trang web.

## Làm sao để thêm nội dung bằng ngôn ngữ của tôi? {#adding-foreign-language-content}

Hiện tại, tất cả nội dung không phải tiếng Anh đều được dịch trực tiếp từ nội dung gốc tiếng Anh, và bất kỳ nội dung nào không tồn tại bằng tiếng Anh thì không thể thêm vào các ngôn ngữ khác.

Để đề xuất nội dung mới cho ethereum.org, bạn có thể [tạo một vấn đề](https://github.com/ethereum/ethereum-org-website/issues) trên GitHub. Nếu được thêm, nội dung đó sẽ được viết bằng tiếng Anh và sau đó dịch sang các ngôn ngữ khác bằng Crowdin.

Chúng tôi có kế hoạch hỗ trợ việc bổ sung nội dung bằng ngôn ngữ khác ngoài tiếng Anh trong tương lai gần.

## Liên hệ {#contact}

Cảm ơn bạn đã đọc hết toàn bộ thông tin này. Chúng tôi mong nó sẽ giúp bạn dễ dàng tham gia chương trình của chúng tôi hơn. Hãy thoải mái tham gia [kênh dịch thuật Discord](https://discord.gg/ethereum-org) của chúng tôi để đặt câu hỏi và cộng tác với các dịch giả khác, hoặc liên hệ với chúng tôi tại translations@ethereum.org!
