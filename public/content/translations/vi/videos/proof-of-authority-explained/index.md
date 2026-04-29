---
title: "Kinh tế học mật mã: bằng chứng ủy quyền"
description: "Một bài giảng về kinh tế học mật mã giải thích cơ chế đồng thuận bằng chứng ủy quyền (PoA), bao gồm cách thức hoạt động, sự đánh đổi của nó so với bằng chứng công việc và bằng chứng cổ phần, và nơi nó được sử dụng trong thực tế."
lang: vi
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "đồng thuận"
  - "bằng chứng ủy quyền"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Bằng chứng ủy quyền"
---

Một bài giảng về kinh tế học mật mã của **Cryptoeconomics Study** giải thích cơ chế đồng thuận bằng chứng ủy quyền (PoA), bao gồm cách một cơ quan trung ương xác định thứ tự giao dịch, các vấn đề chi tiêu kép và kiểm duyệt mà nó gây ra, cùng với phương pháp giảm thiểu bằng đa chữ ký.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=Mj10HSEM5_8) được xuất bản bởi Cryptoeconomics Study. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Cách thức hoạt động của bằng chứng ủy quyền (0:00) {#how-proof-of-authority-works-000}

Chào mừng đến với phần 2.4 — bằng chứng ủy quyền — nơi chúng ta khôi phục lại cơ quan trung ương đó để xác định thứ tự giao dịch và giải quyết vấn đề chi tiêu kép phiền toái đó.

Ngày xửa ngày xưa, có một cơ quan trung ương mà mọi người đều khá yêu mến. Tất cả họ đều chấp thuận cơ quan tuyệt vời này và nói rằng: "Tại sao chúng ta không lắng nghe họ nhỉ? Chúng ta đang gặp phải những vấn đề này và chúng ta không đồng ý về trạng thái chính xác, vậy hãy để cô ấy cho chúng ta biết trạng thái là gì."

Cơ quan trung ương của chúng ta chạy nút lớn của cô ấy, và bây giờ mọi người ký các giao dịch và thay vì gửi trực tiếp cho nhau, họ gửi chúng cho cơ quan trung ương. Cơ quan trung ương áp dụng từng giao dịch và tự mình ký nó, nói rằng: "Vâng, tôi chấp thuận — đây là giao dịch số không." Sau đó, cơ quan trung ương gửi nó cho mọi người, và mọi người nhận được giao dịch và chấp nhận nó như một chân lý.

#### Vấn đề chi tiêu kép (1:05) {#the-double-spend-problem-105}

Bây giờ hãy thử chi tiêu kép. Chuyện gì sẽ xảy ra? Mallory sẽ gửi hai giao dịch xung đột đến cơ quan trung ương. Cơ quan trung ương nhận được giao dịch đầu tiên và ký xác nhận rằng đây là giao dịch thứ hai mà cô ấy đã thấy, sau đó ký xác nhận rằng đây là giao dịch thứ ba mà cô ấy đã thấy, và sau đó truyền bá những thông điệp đó.

Chuyện gì xảy ra? Mọi người đều nhận được cùng những thông điệp, và tất cả họ đều theo dõi thứ tự của cơ quan trung ương. Điều đó có nghĩa là tất cả họ đều có cùng một lịch sử. Nếu chúng ta nhìn vào các trạng thái, chúng ta đang làm tốt — Alice gửi cho Jing, sau đó Mallory gửi cho Alice, rồi Mallory cố gắng gửi cho Jing, nhưng giao dịch đó không thành công vì Mallory không có đủ tiền. Số dư của họ đều sẽ giống nhau. Tất cả họ đều đạt được đồng thuận. Cơ quan trung ương — tuyệt vời, chúng ta đã làm được.

#### Khi cơ quan ủy quyền bị xâm phạm (2:09) {#when-the-authority-is-compromised-209}

Nhưng vấn đề là chúng ta phải tin tưởng cơ quan trung ương để cung cấp thứ tự giao dịch này. Vậy chuyện gì sẽ xảy ra nếu cơ quan trung ương bị loại bỏ và hóa ra cô ấy lại chính là Mallory từ trước đến nay?

Chúng ta lại quay về với những vấn đề tương tự như trước đây. Đầu tiên, chi tiêu kép — Mallory chỉ cần ký cả hai giao dịch xung đột và nói rằng cả hai đều xảy ra cùng một lúc. Chúng ta không biết cái nào đến trước. Mallory truyền bá chúng một cách có chọn lọc và làm rối loạn các nút, và họ mất đi sự đồng thuận.

Vấn đề khác là sự kiểm duyệt. Đây là một vấn đề mới với chuỗi bằng chứng ủy quyền của chúng ta. Điều gì sẽ xảy ra nếu Mallory không thích Alice? Alice đang cố gắng gửi một giao dịch và cơ quan trung ương chỉ nhìn vào nó, nhận ra đó là Alice, và ném nó đi. Alice cố gắng gửi lại, và nó lại bị ném đi. Alice không biết chuyện gì đang xảy ra — các giao dịch của cô ấy không được thực hiện. Kiểm duyệt thành công, và chúng ta lại quay về với sự đau khổ.

#### Giảm thiểu bằng đa chữ ký (3:21) {#mitigating-with-multi-signature-321}

Đừng quá lo lắng — có một biện pháp giảm thiểu tiềm năng. Chúng ta có thể phi tập trung hóa cơ quan ủy quyền về mặt chính trị. Về mặt lý thuyết, điều này sẽ khiến Mallory khó giành quyền kiểm soát hơn. Vì vậy, thay vì một cơ quan trung ương, chúng ta có bốn cơ quan khác nhau. Tất cả họ có thể đại diện cho các lợi ích khác nhau của các bên khác nhau, và tất cả họ phải cùng nhau ký xác nhận các giao dịch.

Đây được gọi là multi-sig — một đa chữ ký. Họ nhận được một giao dịch từ Alice gửi cho Jing, và người đầu tiên ký xác nhận nói rằng: "Tôi đã thấy thông điệp này và tôi chấp thuận." Sau đó người thứ hai ký xác nhận, và người thứ ba. Chúng ta có thể nói rằng chúng ta chấp nhận đa chữ ký hai-trên-bốn, hoặc ba-trên-bốn, hoặc có thể chúng ta yêu cầu tất cả các bên — bốn trên bốn. Điều đó tùy thuộc vào bạn khi bạn thiết kế đa chữ ký của mình.

Điều này có nghĩa là giao dịch được thực hiện và nó đã được chấp thuận bởi các cơ quan ủy quyền.

#### Những hạn chế của bằng chứng ủy quyền (4:32) {#limitations-of-proof-of-authority-432}

Nhưng chuyện gì sẽ xảy ra nếu tất cả các cơ quan này đều trở thành Mallory? Chúng ta gặp phải chính xác những vấn đề tương tự — chi tiêu kép và kiểm duyệt. Vì vậy, nó không hoàn hảo. Tuy nhiên, về một số mặt, nó tốt hơn so với một bộ xử lý thanh toán tập trung vì ít nhất người dùng đang tự mình chạy tất cả các giao dịch. Cuối cùng họ có thể phát hiện ra chi tiêu kép, nhưng chúng ta vẫn có những vấn đề của mình. Về mặt kỹ thuật, chúng ta vẫn có thể chi tiêu kép và về mặt kỹ thuật, chúng ta vẫn có thể kiểm duyệt.

Không có quyền truy cập mở — có thể rất khó để trở thành một trong những cơ quan này. Và không có hình phạt nào trong giao thức nếu chi tiêu kép hoặc kiểm duyệt xảy ra. Không có gì trong giao thức sẽ trừng phạt những nhân vật có thẩm quyền này.

#### Điều gì tiếp theo (5:19) {#what-comes-next-519}

Vì vậy, Alice khôn ngoan của chúng ta quyết định có một cách khác — loại bỏ cơ quan ủy quyền. Ai cần nó chứ? Thay vào đó, chúng ta cho phép bất kỳ ai trở thành thợ đào và tham gia vào giao thức đồng thuận. Điều này mang lại quyền truy cập mở để tham gia, cung cấp phần thưởng kinh tế cho hành vi tốt — hình thành đồng thuận theo cách hiệu quả — và cung cấp các hình phạt kinh tế cho hành vi xấu, nơi chúng ta phát hiện ra nó và đốt tiền của mọi người.

Nhưng điều đó sẽ xuất hiện tiếp theo trong Bằng chứng công việc (PoW) — thiết kế cơ chế cho chương 3.