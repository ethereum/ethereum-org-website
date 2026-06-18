---
title: "Nút lưu trữ Ethereum"
description: "Tổng quan về các nút lưu trữ"
lang: vi
sidebarDepth: 2
---

Một nút lưu trữ là một phiên bản của một máy khách [Ethereum](/) được cấu hình để xây dựng một kho lưu trữ tất cả các trạng thái lịch sử. Đây là một công cụ hữu ích cho một số trường hợp sử dụng nhất định nhưng có thể khó chạy hơn so với một nút đầy đủ.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu khái niệm về một [nút Ethereum](/developers/docs/nodes-and-clients/), [kiến trúc của nó](/developers/docs/nodes-and-clients/node-architecture/), [các chiến lược đồng bộ hóa](/developers/docs/nodes-and-clients/#sync-modes), các thực tiễn về việc [chạy](/developers/docs/nodes-and-clients/run-a-node/) và [sử dụng chúng](/developers/docs/apis/json-rpc/).

## Nút lưu trữ là gì {#what-is-an-archive-node}

Để nắm bắt được tầm quan trọng của một nút lưu trữ, hãy làm rõ khái niệm "trạng thái". Ethereum có thể được gọi là một _cỗ máy trạng thái dựa trên giao dịch_. Nó bao gồm các tài khoản và ứng dụng thực thi các giao dịch làm thay đổi trạng thái của chúng. Dữ liệu toàn cầu với thông tin về mỗi tài khoản và hợp đồng được lưu trữ trong một cơ sở dữ liệu trie gọi là trạng thái. Điều này được xử lý bởi máy khách lớp thực thi (EL) và bao gồm:

- Số dư tài khoản và nonce
- Mã hợp đồng và lưu trữ
- Dữ liệu liên quan đến đồng thuận, ví dụ: Hợp đồng khoản tiền đặt cọc (Staking Deposit Contract)

Để tương tác với mạng lưới, xác minh và tạo ra các khối mới, các máy khách Ethereum phải theo kịp những thay đổi gần đây nhất (phần đầu của chuỗi) và do đó là trạng thái hiện tại. Một máy khách lớp thực thi được cấu hình như một nút đầy đủ sẽ xác minh và theo dõi trạng thái mới nhất của mạng lưới nhưng chỉ lưu trữ bộ nhớ đệm (cache) một vài trạng thái trong quá khứ, ví dụ: trạng thái liên kết với 128 khối gần nhất, để nó có thể xử lý việc tổ chức lại chuỗi (chain reorgs) và cung cấp quyền truy cập nhanh vào dữ liệu gần đây. Trạng thái gần đây là những gì tất cả các máy khách cần để xác minh các giao dịch đến và sử dụng mạng lưới.

Bạn có thể hình dung trạng thái như một bản chụp nhanh (snapshot) tạm thời của mạng lưới tại một khối nhất định và kho lưu trữ như một bản phát lại lịch sử.

Các trạng thái lịch sử có thể được cắt tỉa (prune) một cách an toàn vì chúng không cần thiết cho mạng lưới hoạt động và sẽ là dư thừa vô ích nếu máy khách giữ lại tất cả dữ liệu lỗi thời. Các trạng thái tồn tại trước một khối gần đây nào đó (ví dụ: 128 khối trước phần đầu) thực sự bị loại bỏ. Các nút đầy đủ chỉ giữ lại dữ liệu chuỗi khối lịch sử (các khối và giao dịch) và thỉnh thoảng là các bản chụp nhanh lịch sử mà chúng có thể sử dụng để tạo lại các trạng thái cũ hơn theo yêu cầu. Chúng làm điều này bằng cách thực thi lại các giao dịch trong quá khứ trên EVM, điều này có thể đòi hỏi nhiều khả năng tính toán khi trạng thái mong muốn nằm cách xa bản chụp nhanh gần nhất.

Tuy nhiên, điều này có nghĩa là việc truy cập một trạng thái lịch sử trên một nút đầy đủ tiêu tốn rất nhiều khả năng tính toán. Máy khách có thể cần phải thực thi tất cả các giao dịch trong quá khứ và tính toán một trạng thái lịch sử từ khối nguyên thủy (genesis). Các nút lưu trữ giải quyết vấn đề này bằng cách lưu trữ không chỉ các trạng thái gần đây nhất mà còn mọi trạng thái lịch sử được tạo ra sau mỗi khối. Về cơ bản, nó tạo ra một sự đánh đổi với yêu cầu không gian ổ đĩa lớn hơn.

Điều quan trọng cần lưu ý là mạng lưới không phụ thuộc vào các nút lưu trữ để giữ và cung cấp tất cả dữ liệu lịch sử. Như đã đề cập ở trên, tất cả các trạng thái trung gian lịch sử có thể được suy xuất trên một nút đầy đủ. Các giao dịch được lưu trữ bởi bất kỳ nút đầy đủ nào (hiện tại dưới 400G) và có thể được phát lại để xây dựng toàn bộ kho lưu trữ.

### Các trường hợp sử dụng {#use-cases}

Việc sử dụng Ethereum thông thường như gửi giao dịch, triển khai hợp đồng, xác minh đồng thuận, v.v. không yêu cầu quyền truy cập vào các trạng thái lịch sử. Người dùng không bao giờ cần một nút lưu trữ cho một tương tác tiêu chuẩn với mạng lưới.

Lợi ích chính của kho lưu trữ trạng thái là khả năng truy cập nhanh vào các truy vấn về các trạng thái lịch sử. Ví dụ, nút lưu trữ sẽ nhanh chóng trả về các kết quả như:

- _Số dư ETH của tài khoản 0x1337... tại khối 15537393 là bao nhiêu?_
- _Số dư của token 0x trong hợp đồng 0x tại khối 1920000 là bao nhiêu?_

Như đã giải thích ở trên, một nút đầy đủ sẽ cần tạo ra dữ liệu này bằng cách thực thi EVM, điều này sử dụng CPU và mất thời gian. Các nút lưu trữ truy cập chúng trên ổ đĩa và phục vụ các phản hồi ngay lập tức. Đây là một tính năng hữu ích cho một số phần nhất định của cơ sở hạ tầng, ví dụ:

- Các nhà cung cấp dịch vụ như trình khám phá khối (block explorers)
- Các nhà nghiên cứu
- Các nhà phân tích bảo mật
- Các nhà phát triển ứng dụng phi tập trung (dapp)
- Kiểm toán và tuân thủ

Có nhiều [dịch vụ](/developers/docs/nodes-and-clients/nodes-as-a-service/) miễn phí cũng cho phép truy cập vào dữ liệu lịch sử. Vì việc chạy một nút lưu trữ đòi hỏi khắt khe hơn, quyền truy cập này hầu như bị giới hạn và chỉ hoạt động cho các truy cập thỉnh thoảng. Nếu dự án của bạn yêu cầu quyền truy cập liên tục vào dữ liệu lịch sử, bạn nên cân nhắc tự chạy một nút.

## Các triển khai và cách sử dụng {#implementations-and-usage}

Nút lưu trữ trong ngữ cảnh này có nghĩa là dữ liệu được phục vụ bởi các máy khách lớp thực thi hướng tới người dùng vì chúng xử lý cơ sở dữ liệu trạng thái và cung cấp các điểm cuối JSON-RPC. Các tùy chọn cấu hình, thời gian đồng bộ hóa và kích thước cơ sở dữ liệu có thể khác nhau tùy theo máy khách. Để biết chi tiết, vui lòng tham khảo tài liệu do máy khách của bạn cung cấp.

Trước khi bắt đầu nút lưu trữ của riêng bạn, hãy tìm hiểu về sự khác biệt giữa các máy khách và đặc biệt là các [yêu cầu phần cứng](/developers/docs/nodes-and-clients/run-a-node/#requirements) khác nhau. Hầu hết các máy khách không được tối ưu hóa cho tính năng này và kho lưu trữ của chúng yêu cầu hơn 12TB không gian. Ngược lại, các triển khai như Erigon có thể lưu trữ cùng một dữ liệu trong dưới 3TB, điều này khiến chúng trở thành cách hiệu quả nhất để chạy một nút lưu trữ.

## Các thực tiễn được khuyến nghị {#recommended-practices}

Ngoài các [khuyến nghị chung cho việc chạy một nút](/developers/docs/nodes-and-clients/run-a-node/), một nút lưu trữ có thể đòi hỏi khắt khe hơn về phần cứng và bảo trì. Xem xét các [tính năng chính](https://github.com/ledgerwatch/erigon#key-features) của Erigon, cách tiếp cận thực tế nhất là sử dụng triển khai máy khách [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Phần cứng {#hardware}

Luôn đảm bảo xác minh các yêu cầu phần cứng cho một chế độ nhất định trong tài liệu của máy khách.
Yêu cầu lớn nhất đối với các nút lưu trữ là không gian ổ đĩa. Tùy thuộc vào máy khách, nó thay đổi từ 3TB đến 12TB. Ngay cả khi HDD có thể được coi là một giải pháp tốt hơn cho lượng dữ liệu lớn, việc đồng bộ hóa nó và liên tục cập nhật phần đầu của chuỗi sẽ yêu cầu ổ đĩa SSD. Các ổ đĩa [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) là đủ tốt nhưng nó phải có chất lượng đáng tin cậy, ít nhất là [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Các ổ đĩa có thể được lắp vào một máy tính để bàn hoặc một máy chủ có đủ khe cắm. Các thiết bị chuyên dụng như vậy là lý tưởng để chạy nút có thời gian hoạt động (uptime) cao. Hoàn toàn có thể chạy nó trên một máy tính xách tay nhưng tính di động sẽ đi kèm với một chi phí bổ sung.

Tất cả dữ liệu cần phải vừa trong một phân vùng (volume), do đó các ổ đĩa phải được ghép lại với nhau, ví dụ: bằng [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) hoặc LVM. Cũng có thể đáng cân nhắc sử dụng [ZFS](https://en.wikipedia.org/wiki/ZFS) vì nó hỗ trợ "Copy-on-write" (Sao chép khi ghi) giúp đảm bảo dữ liệu được ghi chính xác vào ổ đĩa mà không có bất kỳ lỗi cấp thấp nào.

Để có thêm sự ổn định và bảo mật trong việc ngăn ngừa hỏng cơ sở dữ liệu do vô tình, đặc biệt là trong một thiết lập chuyên nghiệp, hãy cân nhắc sử dụng [bộ nhớ ECC](https://en.wikipedia.org/wiki/ECC_memory) nếu hệ thống của bạn hỗ trợ nó. Kích thước của RAM thường được khuyên là giống như đối với một nút đầy đủ nhưng nhiều RAM hơn có thể giúp tăng tốc độ đồng bộ hóa.

Trong quá trình đồng bộ hóa ban đầu, các máy khách ở chế độ lưu trữ sẽ thực thi mọi giao dịch kể từ khối nguyên thủy. Tốc độ thực thi chủ yếu bị giới hạn bởi CPU, vì vậy một CPU nhanh hơn có thể giúp giảm thời gian đồng bộ hóa ban đầu. Trên một máy tính tiêu dùng trung bình, quá trình đồng bộ hóa ban đầu có thể mất đến một tháng.

## Đọc thêm {#further-reading}

- [Nút đầy đủ Ethereum so với Nút lưu trữ](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, tháng 9 năm 2022_
- [Xây dựng Nút lưu trữ Ethereum của riêng bạn](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, tháng 8 năm 2021_
- [Cách thiết lập Erigon, RPC của Erigon và TrueBlocks (scrape và API) dưới dạng dịch vụ](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, cập nhật tháng 9 năm 2022_

## Các chủ đề liên quan {#related-topics}

- [Các nút và máy khách](/developers/docs/nodes-and-clients/)
- [Chạy một nút](/developers/docs/nodes-and-clients/run-a-node/)