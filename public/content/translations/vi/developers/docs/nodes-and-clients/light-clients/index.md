---
title: "Máy khách nhẹ"
description: "Giới thiệu về máy khách nhẹ Ethereum."
lang: vi
---

Chạy một nút đầy đủ là cách không cần tin cậy, riêng tư, phi tập trung và kháng kiểm duyệt nhất để tương tác với [Ethereum](/). Với một nút đầy đủ, bạn giữ bản sao chuỗi khối của riêng mình mà bạn có thể truy vấn ngay lập tức và bạn có quyền truy cập trực tiếp vào mạng lưới ngang hàng của Ethereum. Tuy nhiên, việc chạy một nút đầy đủ yêu cầu một lượng lớn bộ nhớ, dung lượng lưu trữ và CPU. Điều này có nghĩa là không khả thi để mọi người đều chạy nút của riêng họ. Có một số giải pháp cho vấn đề này trên lộ trình Ethereum, bao gồm tính phi trạng thái, nhưng chúng còn vài năm nữa mới được triển khai. Câu trả lời trong ngắn hạn là đánh đổi một số lợi ích của việc chạy một nút đầy đủ để lấy những cải thiện lớn về hiệu suất cho phép các nút chạy với yêu cầu phần cứng rất thấp. Các nút thực hiện sự đánh đổi này được gọi là các node nhẹ.

## Máy khách nhẹ là gì {#what-is-a-light-client}

Một node nhẹ là một nút chạy phần mềm máy khách nhẹ. Thay vì giữ các bản sao cục bộ của dữ liệu chuỗi khối và xác minh độc lập tất cả các thay đổi, chúng yêu cầu dữ liệu cần thiết từ một nhà cung cấp nào đó. Nhà cung cấp có thể là một kết nối trực tiếp đến một nút đầy đủ hoặc thông qua một máy chủ RPC tập trung nào đó. Dữ liệu sau đó được xác minh bởi node nhẹ, cho phép nó theo kịp phần đầu của chuỗi. Node nhẹ chỉ xử lý các tiêu đề block, chỉ thỉnh thoảng tải xuống nội dung khối thực tế. Các nút có thể khác nhau về độ nhẹ của chúng, tùy thuộc vào sự kết hợp của phần mềm máy khách nhẹ và đầy đủ mà chúng chạy. Ví dụ, cấu hình nhẹ nhất sẽ là chạy một máy khách thực thi nhẹ và một ứng dụng khách đồng thuận nhẹ. Cũng có khả năng nhiều nút sẽ chọn chạy các ứng dụng khách đồng thuận nhẹ với các máy khách thực thi đầy đủ, hoặc ngược lại.

## Máy khách nhẹ hoạt động như thế nào? {#how-do-light-clients-work}

Khi Ethereum bắt đầu sử dụng cơ chế đồng thuận dựa trên Bằng chứng cổ phần (PoS), cơ sở hạ tầng mới đã được giới thiệu đặc biệt để hỗ trợ các máy khách nhẹ. Cách thức hoạt động là chọn ngẫu nhiên một tập hợp con gồm 512 trình xác thực mỗi 1,1 ngày để đóng vai trò là một **ủy ban đồng bộ**. Ủy ban đồng bộ ký tiêu đề block của các khối gần đây. Mỗi tiêu đề block chứa chữ ký tổng hợp của các trình xác thực trong ủy ban đồng bộ và một "trường bit" cho thấy trình xác thực nào đã ký và trình xác thực nào không. Mỗi tiêu đề cũng bao gồm một danh sách các trình xác thực dự kiến sẽ tham gia vào việc ký khối tiếp theo. Điều này có nghĩa là một máy khách nhẹ có thể nhanh chóng thấy rằng ủy ban đồng bộ đã ký xác nhận dữ liệu mà chúng nhận được, và chúng cũng có thể kiểm tra xem ủy ban đồng bộ có phải là ủy ban chính hãng hay không bằng cách so sánh ủy ban mà chúng nhận được với ủy ban mà chúng được thông báo là sẽ mong đợi trong khối trước đó. Bằng cách này, máy khách nhẹ có thể tiếp tục cập nhật kiến thức của mình về khối Ethereum mới nhất mà không cần thực sự tải xuống chính khối đó, chỉ cần tiêu đề chứa thông tin tóm tắt.

Trên lớp thực thi, không có một đặc tả duy nhất nào cho một máy khách thực thi nhẹ. Phạm vi của một máy khách thực thi nhẹ có thể thay đổi từ "chế độ nhẹ" của một máy khách thực thi đầy đủ có tất cả chức năng EVM và mạng lưới của một nút đầy đủ nhưng chỉ xác minh các tiêu đề block, mà không tải xuống dữ liệu liên quan, hoặc nó có thể là một máy khách được rút gọn hơn phụ thuộc nhiều vào việc chuyển tiếp các yêu cầu đến một nhà cung cấp RPC để tương tác với Ethereum.

## Tại sao máy khách nhẹ lại quan trọng? {#why-are-light-clients-important}

Máy khách nhẹ quan trọng vì chúng cho phép người dùng xác minh dữ liệu đến thay vì tin tưởng một cách mù quáng rằng nhà cung cấp dữ liệu của họ là chính xác và trung thực, trong khi chỉ sử dụng một phần rất nhỏ tài nguyên tính toán của một nút đầy đủ. Dữ liệu mà các máy khách nhẹ nhận được có thể được kiểm tra dựa trên các tiêu đề block mà chúng biết đã được ký bởi ít nhất 2/3 của một tập hợp ngẫu nhiên gồm 512 trình xác thực Ethereum. Đây là bằng chứng rất mạnh mẽ cho thấy dữ liệu là chính xác.

Máy khách nhẹ chỉ sử dụng một lượng nhỏ sức mạnh tính toán, bộ nhớ và dung lượng lưu trữ nên nó có thể được chạy trên điện thoại di động, được nhúng trong một ứng dụng hoặc như một phần của trình duyệt. Máy khách nhẹ là một cách để làm cho việc truy cập tối thiểu hóa niềm tin vào Ethereum trở nên trơn tru giống như việc tin tưởng một nhà cung cấp bên thứ ba.

Hãy lấy một ví dụ đơn giản. Hãy tưởng tượng bạn muốn kiểm tra số dư tài khoản của mình. Để làm điều này, bạn phải tạo một yêu cầu đến một nút Ethereum. Nút đó sẽ kiểm tra bản sao cục bộ của trạng thái Ethereum để tìm số dư của bạn và trả lại cho bạn. Nếu bạn không có quyền truy cập trực tiếp vào một nút, có các nhà điều hành tập trung cung cấp dữ liệu này như một dịch vụ. Bạn có thể gửi yêu cầu cho họ, họ kiểm tra nút của họ và gửi kết quả lại cho bạn. Vấn đề với điều này là sau đó bạn phải tin tưởng nhà cung cấp sẽ cung cấp cho bạn thông tin chính xác. Bạn không bao giờ có thể thực sự biết thông tin là chính xác nếu bạn không thể tự mình xác minh nó.

Một máy khách nhẹ giải quyết vấn đề này. Bạn vẫn yêu cầu dữ liệu từ một nhà cung cấp bên ngoài nào đó, nhưng khi bạn nhận lại dữ liệu, nó đi kèm với một bằng chứng mà node nhẹ của bạn có thể kiểm tra dựa trên thông tin mà nó nhận được trong tiêu đề block. Điều này có nghĩa là Ethereum đang xác minh tính chính xác của dữ liệu của bạn thay vì một nhà điều hành đáng tin cậy nào đó.

## Máy khách nhẹ cho phép những đổi mới nào? {#what-innovations-do-light-clients-enable}

Lợi ích chính của máy khách nhẹ là cho phép nhiều người hơn truy cập Ethereum một cách độc lập với yêu cầu phần cứng không đáng kể và sự phụ thuộc tối thiểu vào các bên thứ ba. Điều này tốt cho người dùng vì họ có thể xác minh dữ liệu của chính mình và nó tốt cho mạng lưới vì nó làm tăng số lượng và sự đa dạng của các nút đang xác minh chuỗi.

Khả năng chạy các nút Ethereum trên các thiết bị có dung lượng lưu trữ, bộ nhớ và sức mạnh xử lý rất nhỏ là một trong những lĩnh vực đổi mới chính được mở khóa bởi các máy khách nhẹ. Trong khi ngày nay các nút Ethereum yêu cầu rất nhiều tài nguyên tính toán, các máy khách nhẹ có thể được nhúng vào trình duyệt, chạy trên điện thoại di động và có lẽ cả các thiết bị nhỏ hơn như đồng hồ thông minh. Điều này có nghĩa là các ví Ethereum với các máy khách được nhúng có thể chạy trên điện thoại di động. Điều này có nghĩa là các ví di động có thể phi tập trung hơn nhiều vì chúng sẽ không phải tin tưởng các nhà cung cấp dữ liệu tập trung cho dữ liệu của chúng.

Một phần mở rộng của điều này là cho phép các thiết bị **internet vạn vật (IoT)**. Một máy khách nhẹ có thể được sử dụng để nhanh chóng chứng minh quyền sở hữu của một số dư token hoặc NFT nào đó, với tất cả các đảm bảo bảo mật được cung cấp bởi các ủy ban đồng bộ, kích hoạt một hành động nào đó trên mạng lưới IoT. Hãy tưởng tượng một [dịch vụ cho thuê xe đạp](https://youtu.be/ZHNrAXf3RDE?t=929) sử dụng một ứng dụng có nhúng máy khách nhẹ để nhanh chóng xác minh rằng bạn sở hữu NFT của dịch vụ cho thuê và nếu có, sẽ mở khóa một chiếc xe đạp để bạn đạp đi!

Các bản cuộn Ethereum cũng sẽ được hưởng lợi từ các máy khách nhẹ. Một trong những vấn đề lớn đối với các bản cuộn là các vụ hack nhắm vào các cầu nối cho phép chuyển tiền từ Mạng chính Ethereum sang một Rollup. Một lỗ hổng là các nguồn cấp dữ liệu mà các bản cuộn sử dụng để phát hiện rằng một người dùng đã thực hiện một khoản tiền gửi vào cầu nối. Nếu một nguồn cấp dữ liệu cung cấp dữ liệu xấu, chúng có thể đánh lừa Rollup nghĩ rằng đã có một khoản tiền gửi vào cầu nối và giải phóng tiền một cách không chính xác. Một máy khách nhẹ được nhúng trong Rollup có thể được sử dụng để bảo vệ chống lại các nguồn cấp dữ liệu bị hỏng vì khoản tiền gửi vào cầu nối có thể đi kèm với một bằng chứng có thể được xác minh bởi Rollup trước khi giải phóng bất kỳ token nào. Khái niệm tương tự cũng có thể được áp dụng cho các cầu nối liên chuỗi khác.

Máy khách nhẹ cũng có thể được sử dụng để nâng cấp các ví Ethereum. Thay vì tin tưởng dữ liệu được cung cấp từ một nhà cung cấp RPC, ví của bạn có thể trực tiếp xác minh dữ liệu đang được trình bày cho bạn bằng cách sử dụng một máy khách nhẹ được nhúng. Điều này sẽ tăng cường bảo mật cho ví của bạn. Nếu nhà cung cấp RPC của bạn không trung thực và cung cấp cho bạn dữ liệu không chính xác, máy khách nhẹ được nhúng có thể cho bạn biết!

## Tình trạng phát triển máy khách nhẹ hiện tại như thế nào? {#current-state-of-development}

Có một số máy khách nhẹ đang được phát triển, bao gồm máy khách thực thi, đồng thuận và máy khách nhẹ kết hợp thực thi/đồng thuận. Đây là các triển khai máy khách nhẹ mà chúng tôi biết tại thời điểm viết trang này:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): ứng dụng khách đồng thuận nhẹ bằng TypeScript
- [Helios](https://github.com/a16z/helios): máy khách nhẹ kết hợp thực thi và đồng thuận bằng Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): chế độ nhẹ cho máy khách thực thi (đang phát triển) bằng Go
- [Nimbus](https://nimbus.guide/el-light-client.html): ứng dụng khách đồng thuận nhẹ bằng Nim

Theo hiểu biết của chúng tôi, chưa có triển khai nào trong số này được coi là sẵn sàng cho sản xuất.

Cũng có rất nhiều công việc đang được thực hiện để cải thiện các cách mà máy khách nhẹ có thể truy cập dữ liệu Ethereum. Hiện tại, các máy khách nhẹ dựa vào các yêu cầu RPC đến các nút đầy đủ bằng cách sử dụng mô hình máy khách/máy chủ, nhưng trong tương lai, dữ liệu có thể được yêu cầu theo cách phi tập trung hơn bằng cách sử dụng một mạng lưới chuyên dụng như [Portal Network](https://www.ethportal.net/) có thể phục vụ dữ liệu cho các máy khách nhẹ bằng cách sử dụng một giao thức lan truyền ngang hàng.

Các mục [lộ trình](/roadmap/) khác như [cây Verkle](/roadmap/verkle-trees/) và [tính phi trạng thái](/roadmap/statelessness/) cuối cùng sẽ mang lại các đảm bảo bảo mật của máy khách nhẹ ngang bằng với các máy khách đầy đủ.

## Đọc thêm {#further-reading}

- [Zsolt Felfodhi về các máy khách nhẹ Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling về mạng lưới máy khách nhẹ](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling về các máy khách nhẹ sau The Merge](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Con đường quanh co đến các máy khách nhẹ hoạt động được](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)