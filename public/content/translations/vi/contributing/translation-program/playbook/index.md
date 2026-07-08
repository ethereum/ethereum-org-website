---
title: Cẩm nang Chương trình Dịch thuật
metaTitle: Cẩm nang chương trình dịch thuật
lang: vi
description: Tuyển tập các mẹo và lưu ý quan trọng để thiết lập một chương trình dịch thuật
---

Tiếng Anh là một trong những ngôn ngữ được nói nhiều nhất trên thế giới và cho đến nay là ngôn ngữ được học nhiều nhất thế giới. Vì tiếng Anh là ngôn ngữ phổ biến nhất được sử dụng trên internet – đặc biệt là trên mạng xã hội – và các ngôn ngữ lập trình đa ngôn ngữ rất khan hiếm, phần lớn nội dung trong không gian Chuỗi khối (blockchain) được viết nguyên bản bằng tiếng Anh.

Tuy nhiên, vì có hơn 6 tỷ người trên thế giới (hơn 75% dân số) hoàn toàn không nói tiếng Anh, điều này tạo ra một rào cản gia nhập Ethereum khổng lồ đối với đại đa số dân số thế giới.

Vì lý do này, ngày càng có nhiều dự án trong không gian này đang tìm cách dịch nội dung của họ sang các ngôn ngữ khác nhau và bản địa hóa cho các cộng đồng toàn cầu.

Cung cấp nội dung đa ngôn ngữ là một cách đơn giản và hiệu quả để phát triển cộng đồng toàn cầu của bạn, cung cấp giáo dục cho những người không nói tiếng Anh, đảm bảo nội dung và thông tin liên lạc của bạn tiếp cận được lượng khán giả rộng hơn và tiếp nhận người dùng (onboarding) nhiều người hơn vào không gian này.

Hướng dẫn này nhằm giải quyết các thách thức và quan niệm sai lầm phổ biến về bản địa hóa nội dung. Nó cung cấp hướng dẫn từng bước để quản lý nội dung, quy trình dịch thuật và đánh giá, đảm bảo chất lượng, tiếp cận dịch giả và các khía cạnh quan trọng khác của quy trình bản địa hóa.

## Quản lý nội dung {#content-management}

Quản lý nội dung dịch thuật đề cập đến quá trình tự động hóa quy trình dịch thuật, giúp loại bỏ nhu cầu làm các công việc thủ công lặp đi lặp lại, cải thiện hiệu quả và chất lượng, cho phép kiểm soát tốt hơn và hỗ trợ cộng tác.

Có nhiều cách tiếp cận khác nhau để quản lý nội dung trong quá trình bản địa hóa, tùy thuộc vào nội dung và nhu cầu của bạn.

Cách cơ bản để quản lý nội dung là tạo các tệp song ngữ, chứa văn bản nguồn và văn bản đích. Cách này hiếm khi được sử dụng trong dịch thuật, vì nó không mang lại lợi thế đáng kể nào, ngoại trừ sự đơn giản.

Các công ty dịch thuật thường tiếp cận việc quản lý dịch thuật bằng cách sử dụng phần mềm quản lý dịch thuật hoặc các công cụ bản địa hóa, cung cấp khả năng quản lý dự án và cho phép kiểm soát tốt hơn nhiều đối với các tệp, nội dung và nhà ngôn ngữ học.

Đọc thêm về quản lý nội dung:

[Trados nói về quản lý dịch thuật là gì](https://www.trados.com/solutions/translation-management/)

[Phrase nói về quản lý nội dung đa ngôn ngữ](https://phrase.com/blog/posts/multilingual-content-management/)

### Phần mềm quản lý dịch thuật {#translation-management-software}

Có rất nhiều hệ thống quản lý dịch thuật và công cụ bản địa hóa, và việc lựa chọn phần mềm chủ yếu phụ thuộc vào nhu cầu của bạn.

Mặc dù một số dự án quyết định không sử dụng hệ thống quản lý dịch thuật và thích xử lý các bản dịch theo cách thủ công – trực tiếp trong các tệp song ngữ hoặc trên các dịch vụ lưu trữ, chẳng hạn như GitHub – điều này làm giảm đáng kể khả năng kiểm soát, năng suất, chất lượng, khả năng mở rộng và khả năng cộng tác. Cách tiếp cận như vậy có thể có lợi nhất cho các dự án dịch thuật quy mô nhỏ hoặc chỉ thực hiện một lần.

Điểm qua một số công cụ quản lý dịch thuật mạnh mẽ và được sử dụng rộng rãi nhất:

**Tốt nhất cho huy động nguồn lực cộng đồng và cộng tác**

[Crowdin](https://crowdin.com/)

- Miễn phí cho các dự án nguồn mở (không giới hạn số lượng chuỗi và dự án)
- Bộ nhớ dịch (TM) và bảng thuật ngữ có sẵn với tất cả các gói
- Hỗ trợ hơn 60 định dạng tệp, hơn 70 tích hợp API

[Lokalise](https://lokalise.com/)

- Miễn phí cho 2 thành viên trong nhóm, các gói trả phí cho nhiều người đóng góp hơn (giới hạn số lượng chuỗi đối với hầu hết các gói)
- Bộ nhớ dịch (TM) và bảng thuật ngữ có sẵn với một số gói trả phí
- Hỗ trợ hơn 30 định dạng tệp, hơn 40 tích hợp API

[Transifex](https://www.transifex.com/)

- Chỉ có các gói trả phí (giới hạn số lượng chuỗi đối với hầu hết các gói)
- Bộ nhớ dịch (TM) và bảng thuật ngữ có sẵn với tất cả các gói trả phí
- Hỗ trợ hơn 30 định dạng tệp, hơn 20 tích hợp API

[Phrase](https://phrase.com/)

- Chỉ có các gói trả phí (không giới hạn số lượng chuỗi cho tất cả các gói, giới hạn số lượng dự án và thành viên nhóm)
- Bộ nhớ dịch (TM) và bảng thuật ngữ có sẵn với một số gói trả phí
- Hỗ trợ hơn 40 định dạng tệp, hơn 20 tích hợp API

[Smartcat](https://www.smartcat.com/)

- Gói miễn phí cơ bản với các tính năng nâng cao phải trả phí (không giới hạn số lượng chuỗi và dự án cho tất cả các gói)
- Bộ nhớ dịch (TM) và bảng thuật ngữ có sẵn với tất cả các gói
- Hỗ trợ hơn 60 định dạng tệp, hơn 20 tích hợp API

[POEditor](https://poeditor.com/)

- Miễn phí cho các dự án nguồn mở (giới hạn số lượng chuỗi cho tất cả các dự án, không giới hạn cho các dự án nguồn mở)
- Bộ nhớ dịch (TM) và bảng thuật ngữ có sẵn cho các gói trả phí
- Hỗ trợ hơn 20 định dạng tệp, hơn 10 tích hợp API

và nhiều công cụ khác...

**Các công cụ dịch thuật chuyên nghiệp**

[SDL Trados Studio](https://www.trados.com/products/trados-studio/)

- Các gói trả phí cho dịch giả tự do và các nhóm
- Công cụ dịch thuật có sự hỗ trợ của máy tính (CAT) và phần mềm năng suất dịch giả rất mạnh mẽ

[MemoQ](https://www.memoq.com/)

- Có sẵn phiên bản miễn phí giới hạn với một số gói trả phí cho các tính năng nâng cao
- Phần mềm quản lý dịch thuật cho các công ty, nhà cung cấp dịch vụ ngôn ngữ và dịch giả

[Memsource](https://www.memsource.com/)

- Miễn phí cho các dịch giả cá nhân với một số gói trả phí cho các nhóm
- Hệ thống quản lý dịch thuật và dịch thuật có sự hỗ trợ của máy tính dựa trên đám mây

và nhiều công cụ khác...

Đọc thêm về phần mềm quản lý dịch thuật:

[Định nghĩa của Wikipedia về hệ thống quản lý dịch thuật](https://en.wikipedia.org/wiki/Translation_management_system)

[Phrase nói về 7 điều mà mọi phần mềm quản lý dịch thuật nên có](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[MemoQ nói về hệ thống quản lý dịch thuật là gì](https://www.memoq.com/tools/what-is-a-translation-management-system)

[Danh sách 16 hệ thống quản lý dịch thuật tốt nhất của Gengo](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Quy trình làm việc {#workflow}

Trong không gian dịch thuật, quy trình dịch thuật có thể mang một vài ý nghĩa khác nhau, cả hai đều có phần liên quan với nhau và là những cân nhắc quan trọng cho dự án của bạn.

Chúng ta sẽ khám phá cả hai ý nghĩa này dưới đây.

**Ý nghĩa 1**

Đây có lẽ là cách nghĩ phổ biến nhất về quy trình dịch thuật và là điều thường xuất hiện trong đầu khi nghe từ quy trình làm việc (workflow).

Về bản chất, đó là 'luồng công việc' từ khi bắt đầu nghĩ về các bản dịch cho đến khi sử dụng nội dung đã dịch trong sản phẩm của bạn.

Một quy trình làm việc ví dụ trong trường hợp này sẽ là:

1. **Chuẩn bị các tệp để dịch** – Nghe có vẻ đơn giản; tuy nhiên, bạn cần xem xét một vài điều quan trọng. Ở bước này, bạn nên có một kế hoạch rõ ràng về cách toàn bộ quy trình sẽ hoạt động.

- _Bạn sẽ sử dụng những loại tệp nào? Bạn muốn nhận các tệp đã dịch của mình ở định dạng nào?_
  - Nếu nội dung của bạn có sẵn ở định dạng DOCX hoặc MD, cách tiếp cận sẽ đơn giản hơn nhiều so với việc bạn đang dịch phiên bản PDF của sách trắng hoặc các tài liệu khác.
- _Những công cụ bản địa hóa nào hỗ trợ loại tệp này? Tệp có thể được dịch theo cách giữ nguyên định dạng gốc không?_
  - Không phải tất cả các loại tệp đều hỗ trợ bản địa hóa trực tiếp (ví dụ: tệp PDF, tệp hình ảnh) và không phải tất cả các công cụ bản địa hóa đều hỗ trợ tất cả các loại tệp.
- _Ai sẽ dịch nội dung? Bạn sẽ đặt hàng các bản dịch chuyên nghiệp hay dựa vào các tình nguyện viên?_
  - Điều này ảnh hưởng đến một số quyết định khác mà bạn cần đưa ra. Ví dụ, các dịch giả chuyên nghiệp thoải mái hơn khi làm việc với các công cụ bản địa hóa nâng cao so với các tình nguyện viên.
- _Kỳ vọng của bạn đối với các nhà ngôn ngữ học là gì? Nếu bạn đang sử dụng một nhà cung cấp dịch vụ ngôn ngữ, họ mong đợi điều gì ở bạn?_
  - Đây là bước để đảm bảo các mục tiêu, kỳ vọng và mốc thời gian của bạn được thống nhất.
- _Có phải tất cả nội dung cần dịch đều quan trọng như nhau không? Có nên dịch một số nội dung trước không?_
  - Có một số cách để ưu tiên nội dung nhất định, nội dung nào nên được dịch và triển khai trước. Ví dụ: nếu bạn có nhiều nội dung cần dịch, bạn có thể sử dụng kiểm soát phiên bản để đảm bảo các dịch giả biết họ nên ưu tiên nội dung nào.

2. **Chia sẻ các tệp để dịch** – Bước này cũng đòi hỏi một số suy nghĩ dài hạn và không đơn giản như việc gửi các tệp nguồn cho một nhà cung cấp dịch vụ ngôn ngữ.

- _Ai sẽ dịch nội dung? Sẽ có bao nhiêu người tham gia vào quá trình này?_
  - Nếu bạn dự định sử dụng một công cụ bản địa hóa, bước này được đơn giản hóa vì bạn có thể tải trực tiếp các tệp nguồn lên công cụ. Điều này cũng đúng nếu quá trình dịch diễn ra trên dịch vụ lưu trữ vì các tệp nguồn không cần phải xuất đi đâu cả.
- _Các tệp nguồn sẽ được xử lý thủ công hay quá trình này có thể được tự động hóa?_
  - Hầu hết các công cụ bản địa hóa đều cho phép một số loại tích hợp hoặc tự động hóa quy trình quản lý tệp. Mặt khác, nếu bạn đang làm việc với các dịch giả cá nhân và không sử dụng công cụ bản địa hóa, việc gửi tệp nguồn theo cách thủ công cho hàng trăm hoặc hàng nghìn dịch giả không phải là một quy trình có thể mở rộng.
- _Những công cụ nào sẽ được sử dụng cho việc bản địa hóa?_
  - Câu trả lời cho câu hỏi này sẽ quyết định cách bạn tiếp cận mọi thứ khác. Việc chọn công cụ phù hợp có thể giúp bạn tự động hóa quản lý nội dung, quản lý Bộ nhớ dịch và Bảng thuật ngữ, quản lý dịch giả, theo dõi tiến độ dịch/đánh giá, v.v., vì vậy hãy dành chút thời gian và nghiên cứu xem bạn muốn sử dụng công cụ nào. Nếu bạn không dự định sử dụng công cụ bản địa hóa, tất cả những điều trên sẽ cần được thực hiện thủ công.
- _Quá trình dịch sẽ mất bao lâu? Chi phí sẽ là bao nhiêu?_
  - Tại thời điểm này, bạn nên sẵn sàng chia sẻ các tệp nguồn với nhà cung cấp dịch vụ ngôn ngữ hoặc nhóm dịch giả. Nhà cung cấp dịch vụ ngôn ngữ có thể giúp bạn phân tích số lượng từ và cung cấp báo giá, bao gồm mức giá và mốc thời gian cho quá trình dịch thuật.
- _Bạn có dự định thực hiện các thay đổi/cập nhật nội dung nguồn trong quá trình này không?_
  - Nếu nội dung của bạn mang tính động và thay đổi thường xuyên, bất kỳ thay đổi hoặc cập nhật nào cũng có thể làm gián đoạn tiến độ dịch thuật. Sử dụng Bộ nhớ dịch có thể giúp giảm thiểu đáng kể điều này, mặc dù vẫn cần phải suy nghĩ về cách quy trình sẽ hoạt động và cách bạn có thể ngăn chặn việc làm chậm tiến độ mà các dịch giả đang thực hiện.

3. **Quản lý quá trình dịch thuật** – Công việc của bạn chưa hoàn tất sau khi nội dung nguồn được giao cho nhà cung cấp dịch vụ ngôn ngữ hoặc các dịch giả. Để đảm bảo chất lượng tối ưu của các bản dịch, người tạo nội dung nên tham gia vào quá trình dịch thuật càng nhiều càng tốt.

- _Bạn dự định giao tiếp với các dịch giả như thế nào?_
  - Nếu bạn dự định sử dụng một công cụ bản địa hóa, việc giao tiếp có thể diễn ra trực tiếp trong công cụ. Việc thiết lập một kênh liên lạc thay thế với các dịch giả cũng được khuyến khích vì họ có thể ít ngần ngại hơn khi liên hệ và các công cụ nhắn tin cho phép giao tiếp trôi chảy hơn.
- _Làm thế nào để xử lý các câu hỏi từ dịch giả? Ai nên trả lời những câu hỏi này?_
  - Các dịch giả (cả chuyên nghiệp và không chuyên) sẽ thường xuyên liên hệ với các câu hỏi và yêu cầu làm rõ hoặc thêm ngữ cảnh, cũng như phản hồi và ý tưởng cải tiến. Việc trả lời những thắc mắc này thường có thể dẫn đến sự tương tác và chất lượng nội dung dịch tốt hơn. Việc cung cấp cho họ càng nhiều tài nguyên càng tốt (ví dụ: hướng dẫn, mẹo, nguyên tắc thuật ngữ, Câu hỏi thường gặp, v.v.) cũng rất có giá trị.
- _Làm thế nào để xử lý quá trình đánh giá? Bạn muốn thuê ngoài hay bạn có khả năng thực hiện các đánh giá nội bộ?_
  - Mặc dù không phải lúc nào cũng cần thiết, nhưng đánh giá là một phần không thể thiếu của một quy trình dịch thuật tối ưu. Thông thường, cách dễ nhất là thuê ngoài quy trình đánh giá cho các chuyên gia đánh giá chuyên nghiệp. Tuy nhiên, nếu bạn có một nhóm quốc tế lớn, các đánh giá hoặc QA (Đảm bảo chất lượng) cũng có thể được xử lý nội bộ.

4. **Triển khai nội dung đã dịch** – Phần cuối cùng của quy trình làm việc, mặc dù vẫn quan trọng để xem xét trước.

- _Tất cả các bản dịch sẽ được hoàn thành cùng một lúc chứ?_
  - Nếu không, bạn nên suy nghĩ xem bản dịch nào nên được ưu tiên, làm thế nào để theo dõi các bản dịch đang được tiến hành và việc triển khai được xử lý như thế nào trong khi các bản dịch được thực hiện.
- _Nội dung đã dịch sẽ được chuyển đến bạn như thế nào? Nó sẽ ở định dạng nào?_
  - Đây là một cân nhắc quan trọng, bất kể bạn sử dụng phương pháp nào. Các công cụ bản địa hóa cho phép bạn duy trì quyền kiểm soát đối với định dạng tệp đích và quy trình xuất và thường hỗ trợ tự động hóa, ví dụ: bằng cách cho phép tích hợp với dịch vụ lưu trữ.
- _Bạn sẽ triển khai các bản dịch trong dự án của mình như thế nào?_
  - Trong một số trường hợp, điều này có thể đơn giản như tải lên tệp đã dịch hoặc thêm nó vào tài liệu của bạn. Tuy nhiên, với các dự án phức tạp hơn, như dịch trang web hoặc ứng dụng, bạn nên đảm bảo mã hỗ trợ quốc tế hóa và thiết lập cách quy trình triển khai sẽ được xử lý trước.
- _Điều gì xảy ra nếu định dạng khác với nguồn?_
  - Tương tự như trên, nếu bạn đang dịch các tệp văn bản đơn giản, định dạng có lẽ không quá quan trọng. Tuy nhiên, với các tệp phức tạp hơn, như nội dung cho trang web hoặc ứng dụng, định dạng và mã cần phải giống hệt với nguồn để được triển khai trong dự án của bạn. Nếu không, các tệp đích sẽ cần được chỉnh sửa, bởi các dịch giả hoặc các nhà phát triển của bạn.

**Ý nghĩa 2**

Một quy trình dịch thuật thay thế, không tính đến các quyết định và phương pháp tiếp cận nội bộ. Cân nhắc chính ở đây là luồng của chính nội dung.

Một quy trình làm việc ví dụ trong trường hợp này sẽ là:

1. _Dịch thuật → Triển khai_

- Quy trình làm việc đơn giản nhất, trong đó bản dịch có thể sẽ là bản dịch của con người, vì không có quy trình đánh giá hoặc QA để đánh giá chất lượng và chỉnh sửa các bản dịch trước khi triển khai.
- Với quy trình làm việc này, điều quan trọng là các dịch giả có thể duy trì một mức chất lượng nhất định, điều này sẽ đòi hỏi các nguồn lực và sự giao tiếp phù hợp giữa các nhà quản lý dự án và dịch giả.

2. _Dịch thuật → Đánh giá → Triển khai_

- Một quy trình làm việc nâng cao hơn, bao gồm quy trình đánh giá và chỉnh sửa, để đảm bảo chất lượng của các bản dịch có thể chấp nhận được và nhất quán.
- Có một số cách tiếp cận đối với quy trình làm việc này, trong đó các bản dịch có thể được thực hiện bởi các dịch giả chuyên nghiệp hoặc tình nguyện viên, trong khi quy trình đánh giá có thể sẽ được xử lý bởi các chuyên gia đánh giá chuyên nghiệp, những người quen thuộc với tất cả các quy tắc ngữ pháp và chính tả cần được tuân thủ trong ngôn ngữ đích.

3. _Dịch thuật → Đánh giá → QA → Triển khai_

- Quy trình làm việc tối ưu để đảm bảo mức chất lượng cao nhất. Mặc dù QA không phải lúc nào cũng cần thiết, nhưng nó có thể hữu ích để cung cấp cho bạn cảm nhận tốt hơn về chất lượng của văn bản đã dịch sau khi dịch và đánh giá.
- Với quy trình làm việc này, các bản dịch có thể được thực hiện độc quyền bởi các tình nguyện viên hoặc thậm chí là dịch máy. Quá trình đánh giá nên được thực hiện bởi các dịch giả chuyên nghiệp, trong khi QA có thể được thực hiện bởi một nhà cung cấp dịch vụ ngôn ngữ hoặc nội bộ, nếu bạn có nhân viên là người bản ngữ của các ngôn ngữ đích.

Đọc thêm về quy trình dịch thuật:

[Các quy tắc nội dung về năm giai đoạn của quy trình dịch thuật](https://contentrules.com/creating-translation-workflow/)

[Smartling nói về quản lý quy trình dịch thuật là gì](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[RixTrans nói về quy trình dịch thuật](https://www.rixtrans.com/translation-workflow)

## Quản lý thuật ngữ {#terminology-management}

Thiết lập một kế hoạch rõ ràng về cách xử lý thuật ngữ là một trong những bước quan trọng nhất để đảm bảo chất lượng và tính nhất quán cho các bản dịch của bạn và tiết kiệm thời gian cho các dịch giả.

Trong không gian dịch thuật, điều này được gọi là quản lý thuật ngữ và là một trong những dịch vụ chính mà các nhà cung cấp dịch vụ ngôn ngữ cung cấp cho khách hàng của họ, bên cạnh việc tiếp cận nhóm các nhà ngôn ngữ học và quản lý nội dung của họ.

Quản lý thuật ngữ đề cập đến quá trình xác định, thu thập và quản lý thuật ngữ quan trọng đối với dự án của bạn và phải luôn được dịch chính xác và nhất quán.

Có một vài bước cần làm theo khi bắt đầu nghĩ về quản lý thuật ngữ:

- Xác định các thuật ngữ chính nên được đưa vào cơ sở thuật ngữ (termbase).
- Tạo một bảng thuật ngữ và định nghĩa của chúng.
- Dịch các thuật ngữ và thêm chúng vào bảng thuật ngữ.
- Kiểm tra và chấp thuận các bản dịch.
- Duy trì bảng thuật ngữ và cập nhật nó với các thuật ngữ mới, khi chúng trở nên quan trọng.

Đọc thêm về quản lý thuật ngữ:

[Trados nói về quản lý thuật ngữ là gì](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[Language Scientific nói về lý do tại sao quản lý thuật ngữ lại quan trọng](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[Clear Words Translation nói về quản lý thuật ngữ là gì và tại sao nó lại quan trọng](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Bộ nhớ dịch và Bảng thuật ngữ {#tm-and-glossary}

Bộ nhớ dịch và Bảng thuật ngữ là những công cụ quan trọng trong ngành dịch thuật và là thứ mà hầu hết các nhà cung cấp dịch vụ ngôn ngữ đều dựa vào.

Hãy xem những thuật ngữ này có nghĩa là gì và chúng khác nhau như thế nào:

**Bộ nhớ dịch (TM)** – Một cơ sở dữ liệu tự động lưu trữ các phân đoạn hoặc chuỗi, bao gồm các khối văn bản dài hơn, các câu hoàn chỉnh, các đoạn văn và các thuật ngữ riêng lẻ, cũng như các bản dịch hiện tại và trước đó của chúng bằng mọi ngôn ngữ.

Hầu hết các công cụ bản địa hóa, hệ thống quản lý dịch thuật và công cụ dịch thuật có sự hỗ trợ của máy tính đều có bộ nhớ dịch tích hợp, thường có thể được xuất và sử dụng trong các công cụ tương tự khác.

Lợi ích của việc sử dụng bộ nhớ dịch bao gồm dịch nhanh hơn, chất lượng dịch tốt hơn, khả năng giữ lại các bản dịch nhất định khi cập nhật hoặc thay đổi nội dung nguồn và chi phí dịch rẻ hơn cho nội dung lặp đi lặp lại.

Bộ nhớ dịch hoạt động dựa trên tỷ lệ phần trăm khớp giữa các phân đoạn khác nhau và thường hữu ích nhất khi hai phân đoạn chứa hơn 50% nội dung giống nhau. Chúng cũng được sử dụng để tự động dịch các phân đoạn lặp đi lặp lại, khớp 100%, do đó loại bỏ nhu cầu phải dịch nội dung lặp đi lặp lại nhiều hơn một lần.

Đọc thêm về bộ nhớ dịch:

[Memsource nói về bộ nhớ dịch](https://www.memsource.com/translation-memory/)

[Smartling nói về bộ nhớ dịch là gì](https://www.smartling.com/resources/101/what-is-translation-memory/)

**Bảng thuật ngữ –** Một danh sách các thuật ngữ quan trọng hoặc nhạy cảm, định nghĩa, chức năng và các bản dịch đã được thiết lập của chúng. Sự khác biệt chính giữa bảng thuật ngữ và bộ nhớ dịch là bảng thuật ngữ không được tạo tự động và nó không chứa các bản dịch của các câu hoàn chỉnh.

Hầu hết các công cụ bản địa hóa, hệ thống quản lý dịch thuật và công cụ dịch thuật có sự hỗ trợ của máy tính đều có bảng thuật ngữ tích hợp mà bạn có thể duy trì để đảm bảo chúng chứa thuật ngữ quan trọng cho dự án của bạn. Giống như TM, bảng thuật ngữ thường có thể được xuất và sử dụng trong các công cụ bản địa hóa khác.

Trước khi bắt đầu dự án dịch thuật của bạn, chúng tôi thực sự khuyên bạn nên dành chút thời gian và tạo một bảng thuật ngữ cho các dịch giả và người đánh giá của bạn. Việc sử dụng bảng thuật ngữ đảm bảo rằng các thuật ngữ quan trọng được dịch chính xác, cung cấp cho dịch giả ngữ cảnh rất cần thiết và đảm bảo tính nhất quán trong các bản dịch.

Mặc dù các bảng thuật ngữ thường chứa các bản dịch đã được thiết lập trong các ngôn ngữ đích, nhưng chúng cũng hữu ích ngay cả khi không có điều này. Ngay cả khi không có các bản dịch đã được thiết lập, một bảng thuật ngữ có thể có các định nghĩa về các thuật ngữ kỹ thuật, làm nổi bật các thuật ngữ không nên dịch và thông báo cho dịch giả biết liệu một thuật ngữ cụ thể được sử dụng như một danh từ, động từ, danh từ riêng hay bất kỳ từ loại nào khác.

Đọc thêm về bảng thuật ngữ:

[Lionbridge nói về bảng thuật ngữ dịch thuật là gì](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[Transifex nói về bảng thuật ngữ](https://docs.transifex.com/glossary/glossary)

Nếu bạn không dự định sử dụng công cụ bản địa hóa cho dự án của mình, bạn có thể sẽ không thể sử dụng bộ nhớ dịch và bảng thuật ngữ (bạn có thể tạo bảng thuật ngữ hoặc cơ sở thuật ngữ trong tệp excel, tuy nhiên, các bảng thuật ngữ tự động loại bỏ nhu cầu dịch giả phải tìm kiếm thủ công các thuật ngữ và định nghĩa của chúng).

Điều này có nghĩa là tất cả nội dung lặp đi lặp lại và tương tự sẽ phải được dịch thủ công mỗi lần. Ngoài ra, các dịch giả sẽ phải liên hệ với các câu hỏi về việc liệu một thuật ngữ nhất định có cần được dịch hay không, nó được sử dụng như thế nào trong văn bản và liệu một thuật ngữ đã có bản dịch được thiết lập hay chưa.

_Bạn có muốn sử dụng bộ nhớ dịch và bảng thuật ngữ của ethereum.org trong dự án của mình không? Hãy liên hệ với chúng tôi tại translations@ethereum.org._

## Tiếp cận dịch giả {#translator-outreach}

**Làm việc với một nhà cung cấp dịch vụ ngôn ngữ**

Nếu bạn đang làm việc với một nhà cung cấp dịch vụ ngôn ngữ và các dịch giả chuyên nghiệp của họ, phần này có thể không quá liên quan đến bạn.

Trong trường hợp này, điều quan trọng là phải chọn một nhà cung cấp dịch vụ ngôn ngữ có khả năng cung cấp tất cả các dịch vụ bạn cần (ví dụ: dịch thuật, đánh giá, QA) bằng nhiều ngôn ngữ.

Mặc dù có thể hấp dẫn khi chọn một nhà cung cấp dịch vụ ngôn ngữ chỉ dựa trên mức giá được cung cấp của họ, nhưng điều quan trọng cần lưu ý là các nhà cung cấp dịch vụ ngôn ngữ lớn nhất có mức giá cao hơn là có lý do.

- Họ có hàng chục nghìn nhà ngôn ngữ học trong cơ sở dữ liệu của mình, điều đó có nghĩa là họ sẽ có thể chỉ định các dịch giả có đủ kinh nghiệm và kiến thức về lĩnh vực cụ thể của bạn cho dự án của bạn (tức là các dịch giả kỹ thuật).
- Họ có kinh nghiệm đáng kể khi làm việc trên các dự án khác nhau và đáp ứng nhu cầu đa dạng của khách hàng. Điều này có nghĩa là họ sẽ có nhiều khả năng thích ứng với quy trình làm việc cụ thể của bạn, đưa ra các đề xuất có giá trị và các cải tiến tiềm năng cho quy trình dịch thuật của bạn, đồng thời đáp ứng các nhu cầu, yêu cầu và thời hạn của bạn.
- Hầu hết các nhà cung cấp dịch vụ ngôn ngữ lớn nhất cũng có các công cụ bản địa hóa, bộ nhớ dịch và bảng thuật ngữ riêng mà bạn có thể sử dụng. Nếu không, ít nhất họ cũng có đủ các nhà ngôn ngữ học trong nhóm của mình để đảm bảo rằng các dịch giả của họ sẽ quen thuộc và có thể làm việc với bất kỳ công cụ bản địa hóa nào bạn muốn sử dụng.

Bạn có thể tìm thấy so sánh chuyên sâu về các nhà cung cấp dịch vụ ngôn ngữ lớn nhất trên thế giới, một số chi tiết về từng nhà cung cấp và phân tích theo các dịch vụ họ cung cấp, dữ liệu địa lý, v.v. trong [Báo cáo Nimdzi 100 năm 2021](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Làm việc với các dịch giả không chuyên**

Bạn có thể đang làm việc với các dịch giả không chuyên và tìm kiếm các tình nguyện viên để giúp bạn dịch.

Có một số cách để tiếp cận mọi người và mời họ tham gia dự án của bạn. Điều này phần lớn sẽ phụ thuộc vào sản phẩm của bạn và cộng đồng bạn đã có lớn đến mức nào.

Một số cách tiếp nhận tình nguyện viên được nêu dưới đây:

**Tiếp cận –** Mặc dù điều này phần nào được đề cập trong các điểm dưới đây, nhưng việc tiếp cận các tình nguyện viên tiềm năng và đảm bảo họ biết về sáng kiến dịch thuật của bạn tự bản thân nó đã có thể mang lại hiệu quả.

Rất nhiều người muốn tham gia và đóng góp cho các dự án yêu thích của họ, nhưng thường không thấy cách rõ ràng để làm điều đó nếu không phải là nhà phát triển hoặc có các kỹ năng kỹ thuật đặc biệt. Nếu bạn có thể lan tỏa nhận thức về dự án của mình, rất nhiều người song ngữ có thể sẽ muốn tham gia.

**Tìm kiếm trong cộng đồng của bạn –** Hầu hết các dự án trong không gian này đều đã có các cộng đồng lớn và tích cực. Rất nhiều thành viên trong cộng đồng của bạn có lẽ sẽ đánh giá cao cơ hội đóng góp cho dự án một cách đơn giản.

Mặc dù việc đóng góp cho các dự án nguồn mở thường dựa trên động lực nội tại, nhưng đó cũng là một trải nghiệm học tập tuyệt vời. Bất kỳ ai quan tâm đến việc tìm hiểu thêm về dự án của bạn có thể sẽ rất vui khi tham gia vào một chương trình dịch thuật với tư cách là một tình nguyện viên, vì điều đó sẽ cho phép họ kết hợp việc họ đã đóng góp cho điều gì đó mà họ quan tâm với một trải nghiệm học tập thực tế chuyên sâu.

**Đề cập đến sáng kiến trong sản phẩm của bạn –** Nếu sản phẩm của bạn phổ biến và được một lượng lớn người sử dụng, việc làm nổi bật chương trình dịch thuật của bạn và kêu gọi người dùng hành động trong khi sử dụng sản phẩm có thể cực kỳ hiệu quả.

Điều này có thể đơn giản như thêm một biểu ngữ hoặc cửa sổ bật lên với Lời kêu gọi hành động (CTA) vào sản phẩm của bạn đối với các ứng dụng và trang web. Điều này hiệu quả vì đối tượng mục tiêu của bạn là cộng đồng của bạn - những người có nhiều khả năng tham gia nhất ngay từ đầu.

**Mạng xã hội –** Mạng xã hội có thể là một cách hiệu quả để lan tỏa nhận thức về chương trình dịch thuật của bạn và tiếp cận các thành viên trong cộng đồng của bạn, cũng như những người khác chưa phải là thành viên trong cộng đồng của bạn.

Nếu bạn có máy chủ Discord hoặc kênh Telegram, thật dễ dàng để sử dụng chúng cho việc tiếp cận, giao tiếp với các dịch giả của bạn và ghi nhận những người đóng góp của bạn.

Các nền tảng như X (trước đây là Twitter) cũng có thể hữu ích cho việc tiếp nhận các thành viên cộng đồng mới và công khai ghi nhận những người đóng góp của bạn.

Linux Foundation đã tạo ra một [Báo cáo mở rộng về cuộc khảo sát người đóng góp FOSS năm 2020](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf), phân tích những người đóng góp nguồn mở và động lực của họ.

## Kết luận {#conclusion}

Tài liệu này chứa một số cân nhắc chính mà mọi chương trình dịch thuật nên biết. Đây hoàn toàn không phải là một hướng dẫn toàn diện, mặc dù nó có thể giúp bất kỳ ai không có kinh nghiệm trong ngành dịch thuật tổ chức một chương trình dịch thuật cho dự án của họ.

Nếu bạn đang tìm kiếm các hướng dẫn chi tiết hơn và phân tích về các công cụ, quy trình khác nhau và các khía cạnh quan trọng của việc quản lý một chương trình dịch thuật, một số nhà cung cấp dịch vụ ngôn ngữ lớn nhất duy trì các blog và thường xuất bản các bài viết về các khía cạnh khác nhau của quy trình bản địa hóa. Đây là những tài nguyên tốt nhất nếu bạn muốn đi sâu hơn vào bất kỳ chủ đề nào ở trên và hiểu cách quy trình bản địa hóa hoạt động một cách chuyên nghiệp.

Một số liên kết có liên quan được bao gồm ở cuối mỗi phần; tuy nhiên, bạn có thể tìm thấy nhiều tài nguyên khác trực tuyến.

Đối với các đề xuất hợp tác hoặc thông tin bổ sung, bài học và các phương pháp hay nhất mà chúng tôi đã thu thập được bằng cách duy trì Chương trình Dịch thuật ethereum.org, vui lòng liên hệ với chúng tôi tại translations@ethereum.org.