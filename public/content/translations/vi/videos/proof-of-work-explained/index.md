---
title: "Bằng chứng công việc là gì?"
description: "Một giải thích thân thiện với người mới bắt đầu về cơ chế đồng thuận bằng chứng công việc (PoW), bao gồm cách các thợ đào giải quyết các câu đố mật mã để xác thực giao dịch và bảo mật mạng lưới Chuỗi khối."
lang: vi
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "đồng thuận"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "Bằng chứng công việc"
---

Một bài giải thích của **Binance Academy** về cơ chế đồng thuận bằng chứng công việc (PoW), bao gồm nguồn gốc của nó, cách các thợ đào cạnh tranh để giải quyết các câu đố mật mã và cách nó bảo mật mạng lưới Chuỗi khối.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=3EUAcxhuoU4) được xuất bản bởi Binance Academy. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Nguồn gốc của bằng chứng công việc (0:00) {#origins-of-proof-of-work-000}

Bắt nguồn từ năm 1993, khái niệm bằng chứng công việc (PoW) được phát triển để ngăn chặn các cuộc tấn công từ chối dịch vụ và các hành vi lạm dụng dịch vụ khác như thư rác trên một mạng lưới, bằng cách yêu cầu một số công việc từ người dùng dịch vụ — thường có nghĩa là thời gian xử lý của một máy tính.

Vào năm 2009, Bitcoin đã giới thiệu một cách sáng tạo để sử dụng bằng chứng công việc như một thuật toán đồng thuận để xác thực các giao dịch và phát sóng các khối mới lên Chuỗi khối. Kể từ đó, nó đã lan rộng để trở thành một thuật toán đồng thuận được sử dụng rộng rãi trong nhiều loại tiền điện tử.

#### Cách bằng chứng công việc hoạt động (0:33) {#how-proof-of-work-works-033}

Tóm lại, các thợ đào trên một mạng lưới cạnh tranh với nhau để giải quyết các câu đố tính toán phức tạp. Những câu đố này rất khó giải nhưng lại dễ dàng xác minh một khi ai đó tìm ra giải pháp chính xác.

Một khi một thợ đào đã tìm ra giải pháp cho câu đố, họ có thể phát sóng khối đó lên mạng lưới, nơi tất cả các thợ đào khác sẽ xác minh rằng giải pháp đó là chính xác.

#### Ví dụ về khai thác Bitcoin (0:56) {#bitcoin-mining-example-056}

Bitcoin là một hệ thống dựa trên Chuỗi khối được duy trì bởi công việc tập thể của các nút phi tập trung. Một số nút này được gọi là thợ đào và chịu trách nhiệm thêm các khối mới vào Chuỗi khối.

Để làm như vậy, các thợ đào cần cố gắng và đoán một số giả ngẫu nhiên được gọi là nonce. Số này, khi được kết hợp với dữ liệu được cung cấp trong khối và được truyền qua một Hàm băm, phải tạo ra một kết quả khớp với các điều kiện nhất định — ví dụ: một Mã băm bắt đầu bằng bốn số không.

Khi tìm thấy một kết quả khớp, các nút khác sẽ xác minh tính hợp lệ của kết quả và nút thợ đào được thưởng bằng phần thưởng khối. Do đó, không thể thêm một khối mới vào Chuỗi chính mà không tìm thấy một nonce hợp lệ trước, điều này sau đó tạo ra giải pháp cho khối cụ thể đó — được gọi là Mã băm của khối.

#### Tại sao nó được gọi là "bằng chứng công việc" (1:46) {#why-its-called-proof-of-work-146}

Mỗi khối được xác thực chứa một Mã băm của khối đại diện cho công việc được thực hiện bởi thợ đào. Đây là lý do tại sao nó được gọi là bằng chứng công việc.

#### Lợi ích bảo mật (1:54) {#security-benefits-154}

Bằng chứng công việc giúp bảo vệ mạng lưới chống lại nhiều cuộc tấn công khác nhau. Một cuộc tấn công thành công sẽ yêu cầu rất nhiều sức mạnh tính toán và rất nhiều thời gian để thực hiện các phép tính. Do đó, nó sẽ không hiệu quả vì chi phí phát sinh sẽ lớn hơn phần thưởng tiềm năng cho việc tấn công mạng lưới.

#### Hạn chế (2:10) {#limitations-210}

Một vấn đề với bằng chứng công việc là việc khai thác yêu cầu phần cứng máy tính đắt tiền tiêu thụ một lượng điện năng lớn. Mặc dù các phép tính thuật toán phức tạp đảm bảo tính bảo mật của mạng lưới, nhưng những phép tính này không thể được sử dụng cho mục đích nào khác ngoài việc đó.

#### Nhìn về phía trước (2:25) {#looking-ahead-225}

Mặc dù bằng chứng công việc có thể không phải là giải pháp hiệu quả nhất, nhưng nó vẫn là một trong những phương pháp phổ biến nhất để đạt được sự đồng thuận trong các Chuỗi khối. Đã có các phương pháp và cách tiếp cận thay thế cố gắng giải quyết những vấn đề này, nhưng chỉ có thời gian mới trả lời được phương pháp nào sẽ là người kế nhiệm của bằng chứng công việc.