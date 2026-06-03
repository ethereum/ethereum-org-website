---
title: "Tại sao nên xây dựng trên Ethereum"
description: "Sự phi tập trung, khả năng chống kiểm duyệt, việc triển khai không cần cấp phép và khả năng kết hợp không phải là những điểm bán hàng riêng biệt. Chúng củng cố lẫn nhau. Một hướng dẫn thực tế về lý do tại sao các trình xây dựng nên chọn Ethereum."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "sự phi tập trung"
  - "khả năng chống kiểm duyệt"
  - "khả năng kết hợp"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: Tại sao nên xây dựng trên Ethereum
lang: vi
---

Các trình xây dựng chọn cơ sở hạ tầng dựa trên những cam kết mà ứng dụng của họ cần phải giữ.

Hầu hết các cam kết phần mềm đều phụ thuộc vào một nhà điều hành. Một nhà cung cấp đám mây giữ cho máy chủ hoạt động. Một nền tảng giữ cho tài khoản luôn mở. Một bộ xử lý thanh toán giữ cho người bán được kích hoạt. Một nhà cung cấp API giữ cho khóa hợp lệ. Điều đó là ổn đối với nhiều sản phẩm. Nhưng như vậy là chưa đủ khi giá trị của sản phẩm phụ thuộc vào quyền truy cập trung lập, trạng thái được chia sẻ và các cam kết mà người dùng và các nhà phát triển khác có thể tự mình xác minh.

Ethereum được xây dựng cho trường hợp thứ hai, nơi quyền truy cập trung lập và các cam kết có thể xác minh chính là sản phẩm. Không ai sở hữu nó. Chuỗi chạy qua nhiều quốc gia, nhiều nhà điều hành và nhiều bản triển khai máy khách độc lập, và không một công ty, trình xác thực hay tổ chức nào có thể âm thầm viết lại các quy tắc. Đối với một trình xây dựng, điều đó có nghĩa đây không chỉ là nơi để lưu trữ mã. Đó là nơi để đưa ra các cam kết công khai. Bạn có thể phát hành mà không cần hỏi ý kiến bất kỳ ai, người dùng có thể tiếp tục tiếp cận những gì bạn triển khai, các nhà phát triển khác có thể xây dựng trên đó mà không cần sự cho phép của bạn và ứng dụng của bạn có thể tiếp tục hoạt động ngay cả khi bất kỳ bên nào, kể cả bạn, ngừng hợp tác.

## Sự phi tập trung {#decentralization}

Sự phi tập trung là nền tảng mà những đặc tính đó dựa vào. Ethereum mang lại điều đó thông qua một mạng lưới các máy tính, được gọi là các nút, mỗi nút lưu trữ một bản sao của chuỗi và kiểm tra mọi giao dịch. Mỗi nút chạy phần mềm máy khách. Một nhóm nhỏ các nút, được gọi là trình xác thực, luân phiên đề xuất và xác nhận các khối mới thông qua một quá trình gọi là đồng thuận. Để tham gia, các trình xác thực đưa ETH vào làm tài sản thế chấp, được gọi là khoản đặt cọc, mà họ sẽ mất nếu vi phạm các quy tắc. Khoảng 13.700 đến 14.000 nút đã được theo dõi trong trình theo dõi nút của Etherscan vào tháng 4 năm 2026, phân bổ trên khắp Hoa Kỳ, Đức, Trung Quốc, Vương quốc Anh, Nga, Nhật Bản và hàng chục quốc gia khác.

Sự phi tập trung cũng mang tính kinh tế. Khoảng 32 đến 36 triệu ETH, chiếm khoảng 27 đến 29% nguồn cung, được đặt cọc làm tài sản thế chấp mà giao thức sẽ cắt giảm khi các trình xác thực có hành vi sai trái có thể chứng minh được. Một kẻ tấn công sẽ cần phải có được và mạo hiểm một phần đáng kể của khoản đặt cọc đó để làm hỏng chuỗi. Với giá ETH vào tháng 4 năm 2026, điều đó có nghĩa là hàng chục tỷ đô la sẽ gặp rủi ro.

Khía cạnh khác là bản thân phần mềm. Mỗi nút Ethereum chạy hai phần mềm song song. Một máy khách thực thi chạy EVM và theo dõi trạng thái hợp đồng. Một ứng dụng khách đồng thuận xử lý Bằng chứng cổ phần (PoS). Nó theo dõi trình xác thực nào đề xuất khối, khối nào được mạng lưới chấp nhận và khi nào một khối đạt được tính chung cuộc. Sự phi tập trung lành mạnh cần nhiều bản triển khai độc lập cho mỗi loại, để một lỗi trong một máy khách không tự động trở thành lỗi trong Ethereum.

Lớp thực thi có năm máy khách chính đang được sản xuất. Geth chạy ở mức khoảng 50%, Nethermind khoảng 25%, Besu khoảng 9%, Reth khoảng 8% và Erigon khoảng 7%. Lớp đồng thuận chạy trên Lighthouse, Prysm, Teku, Nimbus, Lodestar và các ứng dụng khách khác. Ethereum không phải là một chuỗi đơn máy khách trên bất kỳ lớp nào.

Thị phần gần 50% của Geth là một sự mong manh thực sự. Một lỗi trong một máy khách thiểu số là điều tồi tệ đối với các nhà điều hành của nó, nhưng phần còn lại của mạng lưới vẫn có thể tiếp tục. Một lỗi nghiêm trọng trong một máy khách đa số sẽ nguy hiểm hơn. Đó là lý do tại sao sự đa dạng máy khách là một ưu tiên hoạt động trực tiếp.

Ưu tiên đó đã được thử nghiệm. Ethereum chưa bao giờ bị dừng toàn bộ chuỗi kể từ khối nguyên thủy vào ngày 30 tháng 7 năm 2015. Lần gần nhất nó gặp phải một sự cố lớn là vào ngày 11 đến 12 tháng 5 năm 2023, khi lớp đồng thuận, được gọi là Chuỗi Beacon, không thể đạt được tính chung cuộc trong khoảng 25 phút và sau đó là khoảng 64 phút. Nguyên nhân là do một lỗi của ứng dụng khách Prysm. Tính chung cuộc yêu cầu hơn hai phần ba số trình xác thực chứng thực và thị phần của Prysm vào thời điểm đó đủ cao để vấn đề của nó nhanh chóng kéo mạng lưới xuống dưới ngưỡng đó.

Sự đình trệ tính chung cuộc không giống như việc dừng chuỗi. Các khối mới vẫn tiếp tục được tạo ra, các giao dịch vẫn tiếp tục được đưa vào, và hầu hết người dùng cùng các ứng dụng vẫn tiếp tục hoạt động. Điều bị đình trệ là sự đảm bảo quyết toán mạnh mẽ nhất của Ethereum. Theo các giả định đồng thuận thông thường, một khối cũ hơn khoảng 13 phút không thể bị đảo ngược. Các cầu nối, sàn giao dịch và các hệ thống khác chờ đợi tính chung cuộc trước khi ghi có các khoản tiền gửi sẽ tạm dừng các luồng đó. Bản thân chuỗi đã tự động phục hồi khi có đủ số trình xác thực bắt kịp, mà không cần can thiệp thủ công.

Đối với các trình xây dựng, lịch sử đó rất quan trọng. Nếu những người khác sẽ nắm giữ tài sản trong các hợp đồng của bạn, định tuyến các lệnh thông qua thị trường của bạn hoặc xây dựng trên nền tảng cơ bản của bạn, họ cần nền móng bên dưới nó tiếp tục hoạt động vượt qua các lỗi, sự cố máy khách và áp lực từ các tổ chức.

## Khả năng chống kiểm duyệt {#censorship-resistance}

Sự phi tập trung là cấu trúc. Khả năng chống kiểm duyệt là một trong những điều thiết thực mà nó mang lại. Người dùng không cần sự cho phép từ một công ty, chính phủ, rơ-le, trình xác thực, nhà cung cấp RPC hoặc nhà điều hành ứng dụng để gửi một giao dịch hợp lệ đến các hợp đồng của bạn.

Điều đó không có nghĩa là mọi giao dịch đều nằm trong khối tiếp theo. Nó có nghĩa là không một bên duy nhất nào có thể giữ một giao dịch hợp lệ khỏi chuỗi mãi mãi. Mỗi khối được đề xuất bởi một trình xác thực khác nhau, người làm việc với các bên bên ngoài, được gọi là trình xây dựng và rơ-le, để lắp ráp nó. Nếu một trong số họ lọc giao dịch của bạn, khe tiếp theo sẽ có một nhóm khác và cuối cùng một trong số họ sẽ đưa nó vào. Sự kiểm duyệt phải tồn tại trên toàn bộ dàn diễn viên luân phiên đó, điều này khó hơn nhiều so với việc một nhà điều hành nói không. Thời kỳ hậu Tornado Cash đã cho thấy điều đó trông như thế nào dưới áp lực.

Tornado Cash là một hợp đồng trộn quyền riêng tư giúp phá vỡ liên kết trên chuỗi giữa việc gửi tiền và rút tiền. Sau khi OFAC trừng phạt nó vào tháng 8 năm 2022, một số rơ-le MEV-Boost lớn đã từ chối chuyển tiếp các khối chứa giao dịch từ các địa chỉ bị trừng phạt. Tỷ lệ các khối được xây dựng thông qua các rơ-le tuân thủ OFAC đó đạt đỉnh gần 79% vào tháng 11 năm 2022. 21% còn lại đến từ các rơ-le và trình xây dựng không lọc, vì vậy các giao dịch Tornado Cash vẫn được đưa vào, chỉ là chậm hơn. Thời gian chờ đợi dự kiến đã tăng từ khoảng 12 giây lên khoảng một phút.

Điều đó có vẻ đáng báo động, và thực sự là như vậy. Sau đó, tỷ lệ này đã giảm xuống. Các rơ-le mới được ra mắt rõ ràng là không có bộ lọc, bao gồm Ultra Sound và Agnostic, và những người đề xuất được tự do thêm chúng vào thiết lập MEV-Boost của họ. Không ai có thể ép buộc mọi người đề xuất sử dụng một rơ-le có lọc, vì vậy tỷ lệ này không thể duy trì ở mức đỉnh. Đến đầu năm 2023, nó đã xuống dưới 50% và trong suốt phần còn lại của năm 2023, nó dao động trong khoảng từ 27% đến 47%. OFAC đã xóa Tornado Cash khỏi danh sách trừng phạt vào tháng 3 năm 2025. Sự kiện này vẫn là bài kiểm tra sức chịu đựng về khả năng chống kiểm duyệt rõ ràng nhất của Ethereum.

Ethereum cũng đang đưa nhiều hơn sự đảm bảo này vào chính giao thức. Một bản nâng cấp theo kế hoạch có tên là FOCIL (EIP-7805) bổ sung các danh sách bao gồm. Các trình xác thực được chọn ngẫu nhiên sẽ công bố các giao dịch mà họ thấy trong mempool công khai và khối tiếp theo dự kiến sẽ đáp ứng các danh sách đó. Nếu một khối bỏ qua chúng, phần còn lại của mạng lưới có thể từ chối nó. Vì vậy, không ai có thể ngăn cản người dùng của bạn sử dụng ứng dụng của bạn.

## Không cần cấp phép {#permissionless}

Khả năng chống kiểm duyệt là về việc liệu người dùng có thể tiếp tục tiếp cận ứng dụng của bạn sau khi bạn phát hành hay không. Tính không cần cấp phép là về việc liệu bạn có thể phát hành ngay từ đầu hay không.

Việc triển khai trên Ethereum không yêu cầu quan hệ đối tác, tài khoản, phê duyệt niêm yết, đánh giá trên cửa hàng ứng dụng hoặc thỏa thuận thương mại. Bất kỳ ai cũng có thể triển khai mã, gọi một hợp đồng, chạy một nút, lập chỉ mục dữ liệu, xây dựng một ví hoặc xuất bản một giao diện. Lớp cơ sở không biết liệu bạn là một công ty khởi nghiệp, một ngân hàng, một nhà phát triển độc lập, một tác nhân, một DAO hay một người dùng không có công ty nào cả.

Điều đó thay đổi mô hình trình xây dựng. Trên một nền tảng, chủ sở hữu nền tảng có thể thay đổi các điều khoản, thu hồi khóa, chặn các khu vực, xóa ứng dụng hoặc đặt điều kiện truy cập dựa trên mối quan hệ kinh doanh. Trên Ethereum, giao thức đánh giá các giao dịch theo cùng các quy tắc công khai cho bất kỳ người gọi nào. Một hợp đồng được triển khai hôm nay sẽ chạy theo các quy tắc công khai đó cho mọi địa chỉ miễn là chuỗi vẫn tiếp tục hoạt động.

Điều này không loại bỏ mọi sự phụ thuộc. Hầu hết người dùng không tiếp cận trực tiếp các hợp đồng của bạn. Họ đi qua một giao diện người dùng (frontend), một ví và một nhà cung cấp RPC, và bất kỳ lớp nào trong số đó đều có thể bị hỏng hoặc bị lọc. Giao diện người dùng có thể bị gỡ xuống. Các nhà cung cấp RPC, những dịch vụ định tuyến hầu hết các yêu cầu của ứng dụng và ví đến chuỗi, có thể từ chối chuyển tiếp các giao dịch hoặc chặn các khu vực và địa chỉ cụ thể. Ví có thể chọn những gì chúng hiển thị.

Môi trường thực thi cơ sở vẫn mở ở bên dưới. Nếu giao diện người dùng của bạn ngừng hoạt động, người dùng vẫn có thể gọi hợp đồng trực tiếp và một nhà phát triển khác có thể xây dựng một giao diện mới. Nếu một ví ngừng hỗ trợ token của bạn, hợp đồng vẫn hoạt động. Nếu một nhà cung cấp RPC lọc, một ứng dụng có thể định tuyến qua một nhà cung cấp khác hoặc chạy nút riêng của nó để tiếp cận mạng lưới.

## Khả năng kết hợp {#composability}

Tính không cần cấp phép đưa mã của bạn lên chuỗi. Một khi nó ở đó, không ai có thể gỡ nó xuống, vì vậy các nhà phát triển khác có thể xây dựng trên các hợp đồng của bạn và bạn có thể xây dựng trên các hợp đồng của họ.

WETH là ví dụ rõ ràng nhất. Nó là một hợp đồng bọc ETH để nó có thể được sử dụng như một token tiêu chuẩn trong các hợp đồng khác. Nó nằm ở một địa chỉ Ethereum cố định, nắm giữ khoảng 1,8 triệu WETH tính đến tháng 5 năm 2026, có khoảng 3,25 triệu người nắm giữ và hoạt động như một đơn vị chung trên các DEX, thị trường cho vay, kho tiền và cầu nối. Đó là mã mà hàng ngàn hợp đồng và ứng dụng khác có thể sử dụng trực tiếp.

Mô hình đó lặp lại trên toàn hệ sinh thái. Từ khối nguyên thủy đến đầu năm 2025, Ethereum đã chứng kiến hàng chục triệu việc triển khai hợp đồng và khoảng 2,5 triệu mã byte (bytecode) duy nhất theo thống kê của Zellic. Các tiêu chuẩn như ERC-20 cho các token có thể thay thế và ERC-721 cho các token không thể thay thế (NFT) đã trở thành các lớp điều phối. Một token mà hợp đồng của bạn phát hành có thể được giao dịch trên một DEX, được dùng làm tài sản thế chấp để vay trong một thị trường tiền tệ, được lập chỉ mục bởi các công cụ phân tích, được hiển thị trong ví và được kết nối hoặc bọc bởi các hệ thống khác mà không cần mỗi nhóm phải đàm phán một thỏa thuận tùy chỉnh.

Tính đến tháng 5 năm 2026, khoảng 46 tỷ đô la đã nằm trong tài chính phi tập trung (DeFi) trên Ethereum. Số tiền đó bị khóa bên trong hàng ngàn giao thức đang hoạt động, bao gồm tài sản, thị trường, oracle, ví, hệ thống tài khoản, hợp đồng quản trị, cầu nối, phân tích và các công cụ dành cho nhà phát triển. Tất cả đều là mã mà bạn có thể gọi trực tiếp ngay từ ngày đầu tiên, thay vì xây dựng từ đầu hoặc chờ đợi các quan hệ đối tác.

## Nền kinh tế tác nhân {#the-agent-economy}

Quyền truy cập không cần cấp phép và khả năng chống kiểm duyệt, với sự phi tập trung ở bên dưới chúng, thậm chí còn quan trọng hơn đối với làn sóng người dùng tiếp theo tham gia vào Ethereum. Các tác nhân AI chính là làn sóng đó, và chúng thanh toán cho các dịch vụ, nắm giữ vốn và quyết toán với các tác nhân khác thông qua các giao dịch và các lệnh gọi hợp đồng, tất cả đều không có sự can thiệp của con người. Một tác nhân không có thẻ để tính phí, không có tài khoản nền tảng để đình chỉ và không có con người để gọi khi một rơ-le từ chối chuyển tiếp một giao dịch. Đó là lý do tại sao cả hai đặc tính này không còn là tùy chọn đối với loại phần mềm đó, và các đặc tính của Ethereum hoàn toàn phù hợp với những gì một tác nhân thực sự cần. Ethereum là nơi nền kinh tế đó dự kiến sẽ diễn ra, và điều đó có thể làm tăng cơ sở người dùng một cách vô cùng to lớn.

Cho dù bạn phát hành tác nhân hay phát hành các hợp đồng mà tác nhân gọi, những vấn đề tương tự đều xuất hiện. Trên một ngăn xếp được lưu trữ điển hình, danh tính của tác nhân được thuê từ một tài khoản nền tảng có thể bị thu hồi. Các khoản thanh toán của nó phụ thuộc vào thẻ hoặc khóa API của con người. Các quy tắc của nó chạy trên một máy chủ do một nhà điều hành kiểm soát. Tính liên tục của nó phụ thuộc vào một máy chủ lưu trữ có thể biến mất. Mỗi một sự phụ thuộc đó chính là những gì lớp cơ sở của Ethereum được thiết kế để loại bỏ.

Trên Ethereum, không có điều nào trong số đó phụ thuộc vào một nhà điều hành. Các khóa của tác nhân là của riêng nó và các quy tắc mà nó ký kết không thể bị viết lại một chiều. Các giao dịch của nó đi qua cùng một dàn diễn viên luân phiên gồm các trình xác thực, trình xây dựng và rơ-le giúp bảo vệ bất kỳ địa chỉ nào khác khỏi việc bị chặn có chủ đích. Các quá trình chuyển đổi trạng thái diễn ra công khai, vì vậy các hợp đồng ở phía bên kia của lệnh gọi không phải tin tưởng một nhà điều hành để báo cáo những gì đã xảy ra.

Các đường ray đã được thiết lập sẵn. Các hợp đồng thông minh, stablecoin và trừu tượng hóa tài khoản cung cấp cho một tác nhân tự trị một địa chỉ hoạt động, một số dư hoạt động và các giới hạn chi tiêu có thể lập trình ngay hôm nay. Các tiêu chuẩn cho danh tính tác nhân và thanh toán gốc trên máy đang bắt kịp. ERC-8004 định nghĩa các sổ đăng ký trên chuỗi cho danh tính, danh tiếng và xác thực của tác nhân. x402 sử dụng mã trạng thái HTTP 402 để cho phép các máy khách, bao gồm cả các tác nhân, thanh toán cho các API và dịch vụ kỹ thuật số bằng stablecoin mà không cần tài khoản truyền thống. Việc áp dụng còn ở giai đoạn đầu nhưng đang tiến triển và bề mặt tích hợp là nhỏ. Chấp nhận thanh toán x402 tại các điểm cuối của bạn, đăng ký hoặc kiểm tra danh tính thông qua ERC-8004 và coi các địa chỉ tác nhân như những người dùng hạng nhất trong các hợp đồng của bạn.

Đối với bất kỳ trình xây dựng nào đang chọn một chuỗi để phát hành, các tác nhân là lớp người dùng tiếp theo đang hình thành và các đường ray đã hoạt động. Các hợp đồng bạn phát hành hôm nay có thể phục vụ họ vào ngày mai mà không cần chờ đợi một giao thức trong tương lai.

## Kết luận {#conclusion}

Sự phi tập trung, khả năng chống kiểm duyệt, việc triển khai không cần cấp phép và khả năng kết hợp không phải là những điểm bán hàng riêng biệt. Chúng củng cố lẫn nhau. Sự phi tập trung làm cho khả năng chống kiểm duyệt trở nên đáng tin cậy và cho phép người dùng tiếp tục tiếp cận những gì được phát hành. Việc triển khai không cần cấp phép cho phép các trình xây dựng phát hành. Khả năng kết hợp biến những ứng dụng đó thành cơ sở hạ tầng được chia sẻ. Các tác nhân tự trị có thể giao dịch thông qua nó và không ai có thể ngăn cản chúng. Những gì bạn phát hành là một cam kết công khai. Nó tiếp tục hoạt động mà không cần có bạn.

## Đọc thêm {#further-reading}

- [Tổ chức Ethereum Checkpoint #9 (Tháng 4 năm 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [clientdiversity.org](https://clientdiversity.org/)
- [Trình theo dõi nút Etherscan](https://etherscan.io/nodetracker)
- [trình xác thực beaconcha.in](https://beaconcha.in/charts/validators)
- [Báo cáo sau sự cố: Tính chung cuộc của Mạng chính vào tháng 5 năm 2023](https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)
- [mevwatch.info](https://www.mevwatch.info/)
- [The Block: Các khối tuân thủ OFAC giảm xuống còn 27%](https://www.theblock.co/post/230179/ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship)
- [Đề xuất Hegotá Headliner: FOCIL (EIP-7805)](https://ethereum-magicians.org/t/hegota-headliner-proposal-focil-eip-7805/27604)
- [EIP-7805: Danh sách bao gồm được thực thi theo lựa chọn phân nhánh (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8004: Danh tính tác nhân trên chuỗi](https://eips.ethereum.org/EIPS/eip-8004)
- [coinbase/x402 GitHub](https://github.com/coinbase/x402)
- [CoinDesk: Nhu cầu x402 chưa thành hiện thực](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
- [WETH trên Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Zellic: Tất cả các hợp đồng Ethereum](https://www.zellic.io/blog/all-ethereum-contracts/)
- [DefiLlama: Chuỗi Ethereum](https://defillama.com/chain/ethereum)
- [OpenZeppelin: Đánh giá rủi ro kỹ thuật trên các mạng lưới Chuỗi khối (Tháng 4 năm 2026)](https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf)