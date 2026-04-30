---
title: "Bảo mật thông qua sự che giấu: sử dụng vi điểm để lưu trữ bí mật"
description: "Trình bày một cách tiếp cận độc đáo đối với việc lưu ký khóa bằng cách sử dụng công nghệ vi điểm vật lý, che giấu các cụm từ hạt giống trong các hình ảnh in mà mắt thường không thể nhìn thấy."
lang: vi
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "privacy-and-security"
  - "privacy"
  - "authentication"
format: presentation
author: Ethereum Foundation
breadcrumb: "Bảo mật bằng vi điểm"
---

Một bài thuyết trình ngắn của **jseam** tại Devcon SEA khám phá một cách tiếp cận độc đáo đối với việc lưu ký khóa bằng cách sử dụng công nghệ vi điểm (microdot) vật lý, vốn được sử dụng trong hoạt động tình báo trong lịch sử để che giấu các cụm từ hạt giống trong các hình ảnh in mà mắt thường gần như không thể nhìn thấy.

*Bản ghi lời thoại này là một bản sao có thể truy cập của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=k9Dfg19JPEw) được xuất bản bởi Tổ chức Ethereum. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Tại sao lại là vi điểm? (0:00) {#why-microdots-000}

Chào mọi người, chào mừng đến với Thái Lan. Trong bài thuyết trình của mình, tôi sẽ nói về vi điểm — chính xác thì chúng là gì, tại sao bạn lại cần chúng và làm thế nào bạn có thể thực sự tạo ra chúng. Tôi có một vài mẫu vật, vì vậy sau buổi nói chuyện, các bạn có thể xem thử.

Có rất nhiều câu hỏi về OpSec (bảo mật hoạt động) và cách bạn có thể giấu các cụm từ hạt giống. Rất nhiều quy trình hiện tại đều là kỹ thuật số. Nhưng điều gì sẽ xảy ra nếu có các quy trình vật lý? Điều gì sẽ xảy ra nếu bạn có thể che giấu mọi thứ? Việc lưu ký khóa vẫn là một vấn đề lớn. Chúng ta có chia sẻ bí mật, khôi phục xã hội — nhưng tôi biết rất nhiều người chơi tiền mã hóa khá khép kín, vì vậy khôi phục xã hội có thể sẽ khó khăn.

Hãy nhìn vào biểu đồ này: chúng ta đang có một đại dịch cô đơn diễn ra ngay lúc này. Vì vậy, việc lưu ký khóa và khôi phục xã hội sẽ là những vấn đề rất lớn. Điều gì sẽ xảy ra nếu có những cách tiếp cận vật lý để che giấu thông tin?

#### Lịch sử của kỹ thuật giấu tin bằng vi điểm (2:00) {#the-history-of-microdot-steganography-200}

Đây là một kỹ thuật giấu tin (steganography) được gọi là vi điểm. Lý do tôi trình bày điều này hôm nay là vì nó đã từng được sử dụng trong hoạt động tình báo trong lịch sử. Mục tiêu về cơ bản là giấu các thông điệp ngay trước mắt mọi người.

Tất cả các tài liệu xung quanh vấn đề này đều rất hạn chế. Bạn có thể hỏi Claude và nó sẽ nói, "Xin lỗi, không có thông tin nào cho bạn." Tôi đã tự mình dịch ngược thông tin này. Các slide tài liệu hóa mọi thứ. Tôi sẽ không thể đề cập đến mọi chi tiết, nhưng tôi sẽ đi qua những phần thú vị. Tôi cũng đã tạo một kho lưu trữ GitHub ghi lại các quy trình này.

#### Nhiếp ảnh analog cho mục đích bảo mật (3:30) {#analog-photography-for-security-330}

Chúng ta sẽ hồi sinh nhiếp ảnh analog cho trường hợp sử dụng này. Tại sao lại là analog? Về cơ bản, không có cơ hội nào để ai đó hack một chiếc máy ảnh analog trừ khi họ đánh cắp nó từ bạn một cách vật lý.

Một trong những vấn đề chính của nhiếp ảnh analog là ISO. Trên máy ảnh kỹ thuật số, đây không phải là vấn đề lớn — bạn có thể điều chỉnh nó. Nhưng với phim, ISO là một hàm của các hạt phim. Điều này trở thành một vấn đề khi bạn muốn thu nhỏ hình ảnh. Nhìn chung, ISO càng nhỏ thì các hạt càng nhỏ.

Có hai giai đoạn. Đầu tiên, bạn chụp một bức ảnh, tráng phim và hãm ảnh. Giai đoạn thứ hai là nơi, thay vì phóng to hình ảnh, chúng ta làm ngược lại — chúng ta thu nhỏ nó xuống quy mô vi thể.

#### Quy trình của Anh (5:00) {#the-british-process-500}

Đây là cách bạn thực hiện. Bạn viết cụm từ hạt giống của mình. Thông thường, một hướng dẫn của MetaMask yêu cầu bạn viết cụm từ hạt giống — nhưng sau đó bạn cất nó ở đâu? Đây là một cách: bạn chụp ảnh cụm từ hạt giống, cuộn phim lại, tráng phim. Điều thú vị là — tất cả những thứ này đều là kim loại nặng, kim loại bạc. Bạn không nên đổ chúng vào bồn cầu. Tôi đã vô tình đổ một ít vào bồn cầu của mình, vì vậy tôi có thể đã vi phạm một số quy định về môi trường. Trong trường hợp xấu nhất, nó có thể sẽ ăn mòn đường ống của tôi.

Bạn chụp ảnh lại một lần nữa, và tada — bạn có một chấm nhỏ xíu này. Đây được gọi là quy trình của Anh.

#### Quy trình dichromate (7:00) {#the-dichromated-process-700}

Quy trình tiếp theo, thậm chí còn khắc nghiệt hơn là quy trình dichromate. Đây là cách bạn có thể đạt được độ phóng đại vi thể như 1000x. Mục tiêu là tìm ra một chất nền hóa học cho việc này, và đây là lúc thứ mà tôi gọi là "Nước cam cấm kỵ" xuất hiện — amoni dichromate. Nó rất độc. Tôi đã làm đổ một ít, và tôi gần như đã chết khi hít phải bụi của nó. Có lẽ tôi cần đi tầm soát ung thư sau vụ này.

Bạn chiếu hình ảnh và bạn nhận được những chấm nhỏ xíu này trên một mảnh giấy. Các chấm này nhỏ đến mức bạn chắc chắn cần một kính hiển vi. Với quy trình của Anh, bạn có thể nhìn thấy bằng mắt thường, nhưng quy trình dichromate tạo ra một thứ gì đó thực sự nhỏ bé — tôi thậm chí không chắc liệu nó có phải là một hình ảnh thực sự hay không nếu không có kính hiển vi.

#### Hỏi đáp (8:00) {#qa-800}

Các vi điểm nhỏ đến mức nào? Bạn có thể nhìn thấy vi điểm được tạo ra bằng quy trình của Anh bằng mắt thường, nhưng quy trình dichromate tạo ra một thứ gì đó thực sự nhỏ bé — bạn chắc chắn cần một kính hiển vi. Thật khó để biết liệu nó có phải là một hình ảnh thực sự hay không nếu không có kính hiển vi.

**Câu hỏi:** Nó tồn tại được bao lâu? Có chu kỳ bán rã không?

**jseam:** Nó không có tính phóng xạ. Chúng ta sẽ biết kết quả sau 20 năm nữa.

**Câu hỏi:** Bạn đã đảo ngược quy trình chưa — mã hóa và sau đó giải mã để xem liệu bạn có thể khôi phục nó không?

**jseam:** Tôi nghĩ là có thể. Bạn có lẽ sẽ cần một loại thiết lập trình chiếu quang học nào đó.

Cảm ơn các bạn rất nhiều. Nếu các bạn muốn xem các mẫu vật, tôi sẽ ở quanh đây. Cảm ơn các bạn đã dành thời gian.