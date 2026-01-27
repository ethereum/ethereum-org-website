---
title: Nút Lưu Trữ Ethereum
description: Tổng quan về các nút lưu trữ
lang: vi
sidebarDepth: 2
---

Một nút lưu trữ là một phiên bản của máy khách Ethereum được cấu hình để xây dựng kho lưu trữ tất cả các trạng thái lịch sử. Đây là một công cụ hữu ích cho một số trường hợp sử dụng nhất định nhưng có thể khó chạy hơn một nút đầy đủ.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu khái niệm về [nút Ethereum](/developers/docs/nodes-and-clients/), [kiến trúc của nó](/developers/docs/nodes-and-clients/node-architecture/), [chiến lược đồng bộ hóa](/developers/docs/nodes-and-clients/#sync-modes), các phương pháp [chạy](/developers/docs/nodes-and-clients/run-a-node/) và [sử dụng chúng](/developers/docs/apis/json-rpc/).

## Nút lưu trữ là gì

Để nắm được tầm quan trọng của nút lưu trữ, hãy làm rõ khái niệm về "trạng thái". Ethereum có thể được gọi là _máy trạng thái dựa trên giao dịch_. Nó bao gồm các tài khoản và ứng dụng thực hiện các giao dịch làm thay đổi trạng thái của chúng. Dữ liệu toàn cầu với thông tin về từng tài khoản và hợp đồng được lưu trữ trong cơ sở dữ liệu trie được gọi là trạng thái. Điều này được xử lý bởi máy khách lớp thực thi (EL) và bao gồm:

- Số dư tài khoản và số nonce
- Mã hợp đồng và bộ nhớ lưu trữ
- Dữ liệu liên quan đến sự đồng thuận, ví dụ: Hợp đồng Gửi tiền Đặt cược

Để tương tác với mạng lưới, xác minh và tạo các khối mới, máy khách Ethereum phải cập nhật những thay đổi gần đây nhất (phần cuối của chuỗi) và do đó là trạng thái hiện tại. Một máy khách lớp thực thi được cấu hình như một nút đầy đủ sẽ xác minh và tuân theo trạng thái mới nhất của mạng nhưng chỉ lưu vào bộ nhớ đệm một vài trạng thái trong quá khứ, ví dụ: trạng thái được liên kết với 128 khối cuối cùng, để nó có thể xử lý việc tổ chức lại chuỗi và cung cấp quyền truy cập nhanh vào dữ liệu gần đây. Trạng thái gần đây là những gì tất cả các máy khách cần để xác minh các giao dịch đến và sử dụng mạng.

Bạn có thể hình dung trạng thái như một ảnh chụp nhanh tức thời của mạng tại một khối nhất định và kho lưu trữ như một bản phát lại lịch sử.

Các trạng thái lịch sử có thể được cắt bỏ một cách an toàn vì chúng không cần thiết cho hoạt động của mạng và sẽ là thừa thãi vô ích nếu máy khách lưu giữ tất cả dữ liệu lỗi thời. Các trạng thái tồn tại trước một số khối gần đây (ví dụ: 128 khối trước khối đứng đầu) sẽ bị loại bỏ một cách hiệu quả. Các nút đầy đủ chỉ lưu giữ dữ liệu chuỗi khối lịch sử (các khối và giao dịch) và các ảnh chụp nhanh lịch sử không thường xuyên mà chúng có thể sử dụng để tái tạo các trạng thái cũ hơn theo yêu cầu. Chúng thực hiện điều này bằng cách thực thi lại các giao dịch trong quá khứ trong máy ảo ethereum (EVM), việc này có thể đòi hỏi nhiều tính toán khi trạng thái mong muốn ở xa ảnh chụp nhanh gần nhất.

Tuy nhiên, điều này có nghĩa là việc truy cập trạng thái lịch sử trên một nút đầy đủ sẽ tiêu tốn rất nhiều tài nguyên tính toán. Máy khách có thể cần thực hiện tất cả các giao dịch trong quá khứ và tính toán một trạng thái lịch sử từ khối khởi nguyên. Các nút lưu trữ giải quyết vấn đề này bằng cách không chỉ lưu trữ các trạng thái gần đây nhất mà còn mọi trạng thái lịch sử được tạo sau mỗi khối. Về cơ bản, nó đánh đổi với yêu cầu không gian đĩa lớn hơn.

Điều quan trọng cần lưu ý là mạng không phụ thuộc vào các nút lưu trữ để lưu giữ và cung cấp tất cả dữ liệu lịch sử. Như đã đề cập ở trên, tất cả các trạng thái tạm thời trong lịch sử đều có thể được lấy ra trên một nút đầy đủ. Các giao dịch được lưu trữ bởi bất kỳ nút đầy đủ nào (hiện tại dưới 400G) và có thể được phát lại để xây dựng toàn bộ kho lưu trữ.

### Trường hợp sử dụng

Việc sử dụng Ethereum thông thường như gửi giao dịch, triển khai hợp đồng, xác minh sự đồng thuận, v.v. không yêu cầu quyền truy cập vào các trạng thái lịch sử. Người dùng không bao giờ cần nút lưu trữ để tương tác tiêu chuẩn với mạng.

Lợi ích chính của việc lưu trữ trạng thái là truy cập nhanh vào các truy vấn về các trạng thái lịch sử. Ví dụ: nút lưu trữ sẽ nhanh chóng trả về các kết quả như:

- _Số dư ETH của tài khoản 0x1337..._ tại khối 15537393?_
- _Số dư của token 0x trong hợp đồng 0x tại khối 1920000 là bao nhiêu?_

Như đã giải thích ở trên, một nút đầy đủ sẽ cần tạo dữ liệu này bằng cách thực thi máy ảo ethereum (EVM), việc này sử dụng CPU và tốn thời gian. Các nút lưu trữ truy cập chúng trên đĩa và phục vụ phản hồi ngay lập tức. Đây là một tính năng hữu ích cho một số bộ phận của cơ sở hạ tầng, ví dụ:

- Các nhà cung cấp dịch vụ như trình khám phá khối
- Các nhà nghiên cứu
- Các nhà phân tích bảo mật
- Các nhà phát triển ứng dụng phi tập trung
- Kiểm toán và tuân thủ

Có nhiều [dịch vụ](/developers/docs/nodes-and-clients/nodes-as-a-service/) miễn phí khác nhau cũng cho phép truy cập vào dữ liệu lịch sử. Vì việc chạy một nút lưu trữ đòi hỏi nhiều hơn, nên quyền truy cập này hầu hết bị hạn chế và chỉ hoạt động cho việc truy cập không thường xuyên. Nếu dự án của bạn yêu cầu quyền truy cập liên tục vào dữ liệu lịch sử, bạn nên cân nhắc tự chạy một nút.

## Triển khai và sử dụng

Nút lưu trữ trong bối cảnh này có nghĩa là dữ liệu được cung cấp bởi các máy khách lớp thực thi hướng tới người dùng khi chúng xử lý cơ sở dữ liệu trạng thái và cung cấp các điểm cuối JSON-RPC. Các tùy chọn cấu hình, thời gian đồng bộ hóa và kích thước cơ sở dữ liệu có thể khác nhau tùy theo máy khách. Để biết chi tiết, vui lòng tham khảo tài liệu do máy khách của bạn cung cấp.

Trước khi bắt đầu nút lưu trữ của riêng bạn, hãy tìm hiểu về sự khác biệt giữa các máy khách và đặc biệt là các [yêu cầu phần cứng](/developers/docs/nodes-and-clients/run-a-node/#requirements) khác nhau. Hầu hết các máy khách không được tối ưu hóa cho tính năng này và kho lưu trữ của chúng yêu cầu hơn 12TB dung lượng. Ngược lại, các triển khai như Erigon có thể lưu trữ cùng một dữ liệu trong dung lượng dưới 3TB, điều này khiến chúng trở thành cách hiệu quả nhất để chạy một nút lưu trữ.

## Các phương pháp được đề xuất

Ngoài các [đề xuất chung để chạy một nút](/developers/docs/nodes-and-clients/run-a-node/), một nút lưu trữ có thể đòi hỏi nhiều hơn về phần cứng và bảo trì. Xem xét các [tính năng chính](https://github.com/ledgerwatch/erigon#key-features) của Erigon, phương pháp tiếp cận thiết thực nhất là sử dụng triển khai máy khách [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Phần cứng

Luôn đảm bảo xác minh các yêu cầu phần cứng cho một chế độ nhất định trong tài liệu của máy khách.
Yêu cầu lớn nhất đối với các nút lưu trữ là không gian đĩa. Tùy thuộc vào máy khách, nó thay đổi từ 3TB đến 12TB. Ngay cả khi HDD có thể được coi là một giải pháp tốt hơn cho lượng lớn dữ liệu, việc đồng bộ hóa và liên tục cập nhật khối đứng đầu của chuỗi sẽ yêu cầu ổ SSD. Ổ đĩa [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) là đủ tốt nhưng nó phải có chất lượng đáng tin cậy, ít nhất là [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Các đĩa có thể được lắp vào máy tính để bàn hoặc máy chủ có đủ khe cắm. Các thiết bị chuyên dụng như vậy là lý tưởng để chạy nút có thời gian hoạt động cao. Hoàn toàn có thể chạy nó trên máy tính xách tay nhưng tính di động sẽ đi kèm với một chi phí bổ sung.

Tất cả dữ liệu cần phải nằm gọn trong một ổ đĩa, do đó các đĩa phải được nối với nhau, ví dụ: bằng [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) hoặc LVM. Cũng có thể đáng xem xét việc sử dụng [ZFS](https://en.wikipedia.org/wiki/ZFS) vì nó hỗ trợ "Sao chép khi ghi" (Copy-on-write), đảm bảo dữ liệu được ghi chính xác vào đĩa mà không có bất kỳ lỗi cấp thấp nào.

Để ổn định và bảo mật hơn trong việc ngăn ngừa hỏng cơ sở dữ liệu do vô tình, đặc biệt là trong một thiết lập chuyên nghiệp, hãy xem xét sử dụng [bộ nhớ ECC](https://en.wikipedia.org/wiki/ECC_memory) nếu hệ thống của bạn hỗ trợ. Kích thước của RAM thường được khuyên là giống như đối với một nút đầy đủ nhưng nhiều RAM hơn có thể giúp tăng tốc độ đồng bộ hóa.

Trong quá trình đồng bộ hóa ban đầu, các máy khách ở chế độ lưu trữ sẽ thực hiện mọi giao dịch kể từ khối khởi nguyên. Tốc độ thực thi hầu hết bị giới hạn bởi CPU, vì vậy một CPU nhanh hơn có thể giúp rút ngắn thời gian đồng bộ hóa ban đầu. Trên một máy tính tiêu dùng trung bình, quá trình đồng bộ hóa ban đầu có thể mất tới một tháng.

## Đọc thêm {#further-reading}

- [Nút đầy đủ Ethereum và Nút lưu trữ](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, tháng 9 năm 2022_
- [Xây dựng Nút lưu trữ Ethereum của riêng bạn](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, tháng 8 năm 2021_
- [Cách thiết lập Erigon, RPC của Erigon và TrueBlocks (scrape và API) làm dịch vụ](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, cập nhật tháng 9 năm 2022_

## Các chủ đề liên quan {#related-topics}

- [Các nút và client](/developers/docs/nodes-and-clients/)
- [Chạy một nút](/developers/docs/nodes-and-clients/run-a-node/)
