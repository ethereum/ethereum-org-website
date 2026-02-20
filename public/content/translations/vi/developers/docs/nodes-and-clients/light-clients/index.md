---
title: "Các ứng dụng nhẹ"
description: "Giới thiệu về nút nhẹ Ethereum(Ethereum light client)."
lang: vi
---

Chạy một nút đầy đủ (full node) là cách thức không cần sự tin cậy, đảm bảo sự riêng tư, phi tập trung và chống kiểm duyệt nhất để tương tác với Ethereum. Với một nút đầy đủ, bạn giữ bản sao chuỗi khối của riêng mình mà bạn có thể truy vấn ngay lập tức và bạn có quyền truy cập trực tiếp vào mạng ngang hàng của Ethereum. Tuy nhiên, việc chạy một nút đầy đủ đòi hỏi một lượng bộ nhớ, bộ lưu trữ và CPU đáng kể. Điều này có nghĩa là không phải ai cũng có thể chạy nút riêng của mình. Có một số giải pháp cho vấn đề này trên lộ trình phát triển của Ethereum, bao gồm sự phi trạng thái(statelessness), nhưng chúng còn nhiều năm nữa mới được triển khai. Lời giải ngắn hạn cho vấn đề này là đánh đổi một số lợi ích của việc chạy nút đầy đủ để có được hiệu suất cao, cho phép các nút chạy với cấu hình phần cứng rất thấp. Các nút thực hiện sự đánh đổi này được gọi là nút nhẹ(light clients).

## Máy khách gọn nhẹ là gì {#what-is-a-light-client}

Nút nhẹ là nút chạy phần mềm light client. Thay vì giữ các bản sao cục bộ của dữ liệu blockchain và xác minh một cách độc lập tất cả các thay đổi, thì họ yêu cầu các dữ liệu cần thiết từ một số nhà cung cấp. Nhà cung cấp ở đây có thể là một kết nối trực tiếp tới một nút đầy đủ hoặc thông qua một số máy chủ RPC tập trung. Dữ liệu sau đó được xác minh bởi nút nhẹ, cho phép nó bắt kịp với phần đầu của chuỗi. Nút nhẹ chỉ xử lý các tiêu đề khối, đôi khi sẽ tải xuống toàn bộ khối. Nút có thể khác nhau về dung lượng, tùy thuộc vào sự phối hợp giữ Client nhẹ và đầy đủ mà chúng đang chạy. Ví dụ: cấu hình nhẹ nhất sẽ là chạy ứng dụng Client thực thi nhẹ (light execution client) và ứng dụng Client đồng thuận nhẹ (light consensus client). Cũng có khả năng là nhiều nút sẽ chọn chạy các máy khách đồng thuận nhẹ với các máy khách thực thi đầy đủ hoặc ngược lại. khách thực thi đầy đủ hoặc ngược lại.

## Cách Client nhẹ hoạt động? {#how-do-light-clients-work}

Khi Ethereum sử dung cơ chế đồng thuận bằng chứng cổ phần, một hạ tầng mới được giới thiệu chuyên dụng cho hỗ trợ Client nhẹ. Cách thức hoạt động của nó là chọn ngẫu nhiên một tập hợp con gồm 512 nút xác thực sau mỗi 1,1 ngày để đóng vai trò là một **ủy ban đồng bộ**. Ủy ban đồng bộ sẽ ký vào đầu chuỗi của khối hiện tại. Mỗi một đầu khối chứa một đa chữ ký của nút xác thực đồng bộ trong ủy ban và một trường Bits thể hiện rằng nút xác thực nào đã ký và nút nào không. Mỗi một đầu chuỗi cũng bao gồm một danh sách nút xác thực được mong đợi tham gia ký khối tiếp theo. Điều này có nghĩa rằng Client nhẹ có thể nhanh chóng thấy rằng ủy ban đồng bộ đã ký vào dữ liệu mà họ nhận được, và họ cũng kiểm tra việc ủy ban đồng bộ này là đúng bằng cách với danh sách ủy ban đồng thuận mà nó được thông báo sẽ mong đợi trong khối trước đó. Bằng cách này, Client nhẹ có thể liên tục cập nhật thông tin về khối Ethereum mới nhất mà không cần thực sự tải xuống toàn bộ khối, chỉ cần tải đầu chuỗi chứa thông tin tóm tắt.

Trên lớp thực thi không có một mô tả cụ thể cho Client thực thi nhẹ. Phạm vi của một Client thực thi nhẹ có thể khác nhau: từ "chế độ nhẹ" của một Client thực thi đầy đủ — tức là vẫn có đầy đủ chức năng EVM và mạng của một nút đầy đủ nhưng chỉ xác minh đầu chuỗi mà không tải xuống dữ liệu đi kèm — cho đến một Client tối giản hơn, phụ thuộc nhiều vào việc chuyển tiếp các yêu cầu đến một bên cung cấp RPC để tương tác với Ethereum.

## Tại sao Client nhẹ lại quan trọng? {#why-are-light-clients-important}

Client nhẹ quan trọng bởi vì cho phép người dùng xác thực dữ liệu đến thay vì mù quán tin vào người cung cấp thông tin rằng thông tin họ cung cấp là đúng và đầy đủ, trong lúc sử dụng một phần rất nhỏ của tài nguyên tính toán của một nút đầy đủ. Dữ liệu mà các Client nhẹ nhận được có thể được đối chiếu với đầu chuỗi mà chúng biết đã được ký bởi ít nhất 2/3 trong một tập hợp ngẫu nhiên gồm 512 nút xác thực của Ethereum. Đây là một bằng chứng rất thuyết phục cho thấy dữ liệu đó là chính xác.

Client nhẹ chỉ sử dụng một lượng rất nhỏ sức mạnh tính toán, bộ nhớ và lưu trữ, vì vậy nó có thể chạy trên điện thoại di động, được nhúng trong một ứng dụng hoặc như một phần của trình duyệt. Client nhẹ là cách để giảm thiểu việc cần sự tin tưởng qua Ethereum, nhưng vẫn mượt mà khi dựa vào một nhà cung cấp thứ ba.

Hãy lấy một ví dụ đơn giản. Tưởng tượng rằng bạn muốn xem số dư tài khoản của bạn. Để làm điều này bạn phải yêu cầu đến nút Ethereum. Nút đó sẽ kiểm tra trạng thái của Ethereum đang có trên cục bộ về thông tin số dư của tài khoản đó và trả về kết quả. Nếu bạn không có quyền truy cập trực tiếp vào một nút, thì có những nhà vận hành tập trung cung cấp dữ liệu này dưới dạng dịch vụ. Bạn sẽ phải gửi yêu cầu cho họ, họ kiểm tra nút của họ, và trả kết quả về cho bạn. Vấn đề với việc này là bạn phải tin người cung cấp gửi bạn kết quả đúng. Bạn không bao giờ biết được kết quả có đúng không vì bạn không xác thực được bằng chính mình.

Một Client nhẹ sẽ giải quyết vấn đề này. Bạn vẫn sẽ yêu cầu thông tin từ người cung cấp bên ngoài, nhưng khi bạn nhận dữ liệu nó sẽ đi kèm với bằng chứng mà nút nhẹ của bạn có thể kiểm tra lại thông tin mà nó nhận được ở đầu chuỗi. Điều này có nghĩa Ethereum đơn giản hóa việc xác thực tính đúng sai của dữ liệu thay vì phải tin vào nhà cung cấp.

## Những đổi mới nào mà Client nhẹ mang lại? {#what-innovations-do-light-clients-enable}

Lợi ích chính của Client nhẹ là cho phép nhiều người hơn truy cập Ethereum một cách độc lập, với yêu cầu phần cứng không đáng kể và ít phụ thuộc vào bên thứ ba. Điều này tốt cho người dùng vì họ có thể tự xác minh dữ liệu của mình, và cũng tốt cho mạng lưới vì nó làm tăng số lượng và sự đa dạng của các nút đang xác minh chuỗi.

Khả năng chạy các nút Ethereum trên những thiết bị có bộ nhớ, dung lượng lưu trữ và sức mạnh xử lý rất nhỏ là một trong những lĩnh vực đổi mới lớn mà Client nhẹ mở ra. Trong khi hiện nay các nút Ethereum yêu cầu nhiều tài nguyên tính toán, thì Client nhẹ có thể được nhúng vào trình duyệt, chạy trên điện thoại di động, và thậm chí có thể trên các thiết bị nhỏ hơn như đồng hồ thông minh. Điều này có nghĩa ví Ethereum với Client trong đó sẽ chạy trên điện thoại di động. Điều này có nghĩa là các ví di động có thể trở nên phi tập trung hơn nhiều, vì chúng sẽ không phải tin tưởng vào các nhà cung cấp dữ liệu tập trung để lấy dữ liệu.

Một phần mở rộng của điều này là việc kích hoạt các thiết bị **Internet of things (IoT)**. Một Client nhẹ có thể được dùng để nhanh chóng chứng minh bạn sở hữu một lượng Token hoặc một NFT nào đó, với tất cả các đảm bảo an toàn từ ủy ban đồng bộ, và từ đó kích hoạt một hành động trên mạng lưới IoT. Hãy tưởng tượng một [dịch vụ cho thuê xe đạp](https://youtu.be/ZHNrAXf3RDE?t=929) sử dụng một ứng dụng có máy khách gọn nhẹ được nhúng để nhanh chóng xác minh rằng bạn sở hữu NFT của dịch vụ cho thuê đó, và nếu vậy, sẽ mở khóa một chiếc xe đạp để bạn có thể đi!

Ethereum Rollups cũng sẽ hưởng lợi tù Clients nhẹ. Một trong những vấn đề của Rollups đã là những vụ Hack nhắm vào cầu nối cho phép quỹ di chuyển từ mạng chính Ethereum đến Rollup. Một lỗ hổng là các cổng dữ liệu mà Rollups sử dụng để phát hiện việc một người dùng đã gửi tiền vào cầu nối. Nếu một cổng dữ liệu cung cấp dữ liệu sai, chúng có thể đánh lừa Rollup khiến nó tưởng rằng đã có khoản gửi vào cầu nối và từ đó giải phóng sai tiền. Một Client nhẹ được nhúng trong Rollup có thể được dùng để chống lại các cổng dữ liệu bị hỏng, bởi vì khoản gửi vào cầu nối có thể đi kèm với một bằng chứng mà Rollup có thể xác minh trước khi giải phóng bất kỳ Token nào. Cùng một khái niệm này cũng có thể được áp dụng cho các cầu nối liên chuỗi khác.

Client nhẹ cũng được dùng trong nâng cấp ví Ethereum. Thay vì tin tưởng dữ liệu từ nhà cung cấp RPC, ví của bạn có thể xác thực dữ liệu bằng cách sử dụng Client nhẹ nhúng. Điều này sẽ thêm bảo mật vào ví của bạn. Nếu nhà cung cấp RPC không trung thực và cung cấp cho bạn dữ liệu sai, Client nhẹ được nhúng sẽ báo bạn điều đó!

## Tình trạng phát triển của Client nhẹ hiện nay như thế nào? {#current-state-of-development}

Hiện có một số Client nhẹ đang được phát triển, bao gồm Client nhẹ cho thực thi, đồng thuận, và loại kết hợp thực thi/đồng thuận. Đây là những bản triển khai Client nhẹ mà chúng tôi biết tại thời điểm viết trang này:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): máy khách đồng thuận gọn nhẹ bằng TypeScript
- [Helios](https://github.com/a16z/helios): máy khách gọn nhẹ thực thi và đồng thuận kết hợp bằng Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): chế độ gọn nhẹ cho máy khách thực thi (đang phát triển) bằng Go
- [Nimbus](https://nimbus.guide/el-light-client.html): máy khách đồng thuận gọn nhẹ bằng Nim

Theo chúng tôi được biết, chưa có sản phẩm nào trong số này được coi là sẵn sàng để sản xuất.

Ngoài ra, còn rất nhiều việc đang được thực hiện để cải thiện các cách mà các máy khách gọn nhẹ có thể truy cập dữ liệu Ethereum. Hiện tại, các máy khách gọn nhẹ dựa vào các yêu cầu RPC tới các nút đầy đủ sử dụng mô hình máy khách/máy chủ, nhưng trong tương lai, dữ liệu có thể được yêu cầu theo cách phi tập trung hơn bằng cách sử dụng một mạng chuyên dụng như [Mạng Portal](https://www.ethportal.net/) có thể phục vụ dữ liệu cho các máy khách gọn nhẹ bằng giao thức gossip ngang hàng.

Các mục khác trong [lộ trình](/roadmap/) như [cây Verkle](/roadmap/verkle-trees/) và [tính không trạng thái](/roadmap/statelessness/) cuối cùng sẽ mang lại sự đảm bảo an ninh của các máy khách gọn nhẹ ngang bằng với các máy khách đầy đủ.

## Đọc thêm {#further-reading}

- [Zsolt Felfodhi nói về các máy khách Geth gọn nhẹ](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling nói về mạng lưới máy khách gọn nhẹ](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling nói về các máy khách gọn nhẹ sau The Merge](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Con đường quanh co đến các máy khách gọn nhẹ có chức năng](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
