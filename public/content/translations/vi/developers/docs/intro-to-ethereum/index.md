---
title: "Giới thiệu kỹ thuật về Ethereum"
description: "Giới thiệu cho nhà phát triển dapp về các khái niệm cốt lõi của Ethereum."
lang: vi
---

## Chuỗi khối là gì? {#what-is-a-blockchain}

Chuỗi khối là một cơ sở dữ liệu công khai được cập nhật và chia sẻ trên nhiều máy tính trong một mạng lưới.

"Khối" đề cập đến dữ liệu và trạng thái được lưu trữ trong các nhóm liên tiếp được gọi là "khối". Nếu bạn gửi ETH cho người khác, dữ liệu giao dịch cần được thêm vào một khối để thành công.

"Chuỗi" đề cập đến việc mỗi khối tham chiếu bằng mật mã đến khối cha của nó. Nói cách khác, các khối được liên kết với nhau thành chuỗi. Dữ liệu trong một khối không thể thay đổi nếu không thay đổi tất cả các khối tiếp theo, điều này sẽ yêu cầu sự đồng thuận của toàn bộ mạng lưới.

Mọi máy tính trong mạng lưới phải đồng ý về mỗi khối mới và toàn bộ chuỗi. Những máy tính này được gọi là "nút". Các nút đảm bảo mọi người tương tác với chuỗi khối đều có cùng dữ liệu. Để đạt được thỏa thuận phân tán này, các chuỗi khối cần một cơ chế đồng thuận.

[Ethereum](/) sử dụng một [cơ chế đồng thuận dựa trên bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/). Bất kỳ ai muốn thêm các khối mới vào chuỗi đều phải đặt cọc ETH - loại tiền tệ gốc trong Ethereum - làm tài sản thế chấp và chạy phần mềm trình xác thực. Những "trình xác thực" này sau đó có thể được chọn ngẫu nhiên để đề xuất các khối mà các trình xác thực khác kiểm tra và thêm vào chuỗi khối. Có một hệ thống phần thưởng và hình phạt khuyến khích mạnh mẽ những người tham gia trung thực và trực tuyến nhiều nhất có thể.

Nếu bạn muốn xem cách dữ liệu chuỗi khối được băm và sau đó được nối vào lịch sử của các tham chiếu khối, hãy nhớ xem [bản demo này](https://andersbrownworth.com/blockchain/blockchain) của Anders Brownworth và xem video đi kèm bên dưới.

Xem Anders giải thích về hàm băm trong chuỗi khối:

<VideoWatch slug="blockchain-101-visual-demo" />

## Ethereum là gì? {#what-is-ethereum}

Ethereum là một chuỗi khối có tích hợp sẵn một máy tính. Nó là nền tảng để xây dựng các ứng dụng và tổ chức theo cách phi tập trung, không cần cấp phép và chống kiểm duyệt.

Trong vũ trụ Ethereum, có một máy tính chính tắc duy nhất (được gọi là Máy ảo Ethereum, hay EVM) mà trạng thái của nó được mọi người trên mạng lưới Ethereum đồng ý. Mọi người tham gia vào mạng lưới Ethereum (mọi nút Ethereum) đều giữ một bản sao trạng thái của máy tính này. Ngoài ra, bất kỳ người tham gia nào cũng có thể phát đi một yêu cầu để máy tính này thực hiện tính toán tùy ý. Bất cứ khi nào một yêu cầu như vậy được phát đi, những người tham gia khác trên mạng lưới sẽ xác minh, xác nhận và thực hiện ("thực thi") tính toán đó. Việc thực thi này gây ra sự thay đổi trạng thái trong EVM, được cam kết và truyền đi khắp toàn bộ mạng lưới.

Các yêu cầu tính toán được gọi là yêu cầu giao dịch; bản ghi của tất cả các giao dịch và trạng thái hiện tại của EVM được lưu trữ trên chuỗi khối, và chuỗi khối này lại được lưu trữ và đồng ý bởi tất cả các nút.

Các cơ chế mật mã đảm bảo rằng một khi các giao dịch được xác minh là hợp lệ và được thêm vào chuỗi khối, chúng không thể bị giả mạo sau này. Các cơ chế tương tự cũng đảm bảo rằng tất cả các giao dịch được ký và thực thi với các "quyền" thích hợp (không ai có thể gửi tài sản kỹ thuật số từ tài khoản của Alice, ngoại trừ chính Alice).

## ether là gì? {#what-is-ether}

**Ether (ETH)** là tiền mã hóa gốc của Ethereum. Mục đích của ETH là cho phép tạo ra một thị trường cho việc tính toán. Một thị trường như vậy cung cấp động lực kinh tế cho những người tham gia để xác minh và thực thi các yêu cầu giao dịch và cung cấp tài nguyên tính toán cho mạng lưới.

Bất kỳ người tham gia nào phát đi một yêu cầu giao dịch cũng phải cung cấp một lượng ETH cho mạng lưới như một khoản tiền thưởng. Mạng lưới sẽ đốt một phần tiền thưởng và trao phần còn lại cho bất kỳ ai cuối cùng thực hiện công việc xác minh giao dịch, thực thi nó, cam kết nó vào chuỗi khối và phát nó lên mạng lưới.

Số lượng ETH được trả tương ứng với các tài nguyên cần thiết để thực hiện tính toán. Những khoản tiền thưởng này cũng ngăn chặn những người tham gia độc hại cố ý làm tắc nghẽn mạng lưới bằng cách yêu cầu thực thi tính toán vô hạn hoặc các tập lệnh tiêu tốn nhiều tài nguyên khác, vì những người tham gia này phải trả tiền cho các tài nguyên tính toán.

ETH cũng được sử dụng để cung cấp bảo mật kinh tế mã hóa cho mạng lưới theo ba cách chính: 1) nó được sử dụng như một phương tiện để trao phần thưởng cho các trình xác thực đề xuất khối hoặc tố giác hành vi không trung thực của các trình xác thực khác; 2) Nó được đặt cọc bởi các trình xác thực, hoạt động như tài sản thế chấp chống lại hành vi không trung thực—nếu các trình xác thực cố gắng có hành vi sai trái, ETH của họ có thể bị tiêu hủy; 3) nó được sử dụng để tính trọng số 'phiếu bầu' cho các khối mới được đề xuất, đưa vào phần lựa chọn phân nhánh của cơ chế đồng thuận.

## Hợp đồng thông minh là gì? {#what-are-smart-contracts}

Trong thực tế, những người tham gia không viết mã mới mỗi khi họ muốn yêu cầu một tính toán trên EVM. Thay vào đó, các nhà phát triển ứng dụng tải lên các chương trình (các đoạn mã có thể tái sử dụng) vào trạng thái EVM và người dùng đưa ra yêu cầu thực thi các đoạn mã này với các tham số khác nhau. Chúng tôi gọi các chương trình được tải lên và thực thi bởi mạng lưới là "hợp đồng thông minh".

Ở mức độ rất cơ bản, bạn có thể coi một hợp đồng thông minh giống như một loại máy bán hàng tự động: một tập lệnh mà khi được gọi với các tham số nhất định, sẽ thực hiện một số hành động hoặc tính toán nếu các điều kiện nhất định được thỏa mãn. Ví dụ: một hợp đồng thông minh bán hàng đơn giản có thể tạo và chỉ định quyền sở hữu một tài sản kỹ thuật số nếu người gọi gửi ETH đến một người nhận cụ thể.

Bất kỳ nhà phát triển nào cũng có thể tạo một hợp đồng thông minh và công khai nó trên mạng lưới, sử dụng chuỗi khối làm lớp dữ liệu của nó, với một khoản phí trả cho mạng lưới. Bất kỳ người dùng nào sau đó cũng có thể gọi hợp đồng thông minh để thực thi mã của nó, một lần nữa với một khoản phí trả cho mạng lưới.

Do đó, với các hợp đồng thông minh, các nhà phát triển có thể xây dựng và triển khai các ứng dụng và dịch vụ hướng tới người dùng phức tạp tùy ý như: thị trường, công cụ tài chính, trò chơi, v.v.

## Thuật ngữ {#terminology}

### Chuỗi khối {#blockchain}

Chuỗi tất cả các khối đã được cam kết vào mạng lưới Ethereum trong lịch sử của mạng lưới. Được đặt tên như vậy vì mỗi khối chứa một tham chiếu đến khối trước đó, điều này giúp chúng ta duy trì thứ tự trên tất cả các khối (và do đó trên lịch sử chính xác).

### ETH {#eth}

**Ether (ETH)** là tiền mã hóa gốc của Ethereum. Người dùng trả ETH cho những người dùng khác để các yêu cầu thực thi mã của họ được hoàn thành.

[Tìm hiểu thêm về ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

Máy ảo Ethereum là máy tính ảo toàn cầu mà trạng thái của nó được mọi người tham gia trên mạng lưới Ethereum lưu trữ và đồng ý. Bất kỳ người tham gia nào cũng có thể yêu cầu thực thi mã tùy ý trên EVM; việc thực thi mã làm thay đổi trạng thái của EVM.

[Tìm hiểu thêm về EVM](/developers/docs/evm/)

### Nút {#nodes}

Các máy móc ngoài đời thực đang lưu trữ trạng thái EVM. Các nút giao tiếp với nhau để truyền bá thông tin về trạng thái EVM và các thay đổi trạng thái mới. Bất kỳ người dùng nào cũng có thể yêu cầu thực thi mã bằng cách phát đi một yêu cầu thực thi mã từ một nút. Bản thân mạng lưới Ethereum là tập hợp của tất cả các nút Ethereum và các giao tiếp của chúng.

[Tìm hiểu thêm về các nút](/developers/docs/nodes-and-clients/)

### Tài khoản {#accounts}

Nơi lưu trữ ETH. Người dùng có thể khởi tạo tài khoản, gửi ETH vào tài khoản và chuyển ETH từ tài khoản của họ sang người dùng khác. Các tài khoản và số dư tài khoản được lưu trữ trong một bảng lớn trong EVM; chúng là một phần của trạng thái EVM tổng thể.

[Tìm hiểu thêm về tài khoản](/developers/docs/accounts/)

### Giao dịch {#transactions}

"Yêu cầu giao dịch" là thuật ngữ chính thức cho một yêu cầu thực thi mã trên EVM và "giao dịch" là một yêu cầu giao dịch đã được hoàn thành và sự thay đổi liên quan trong trạng thái EVM. Bất kỳ người dùng nào cũng có thể phát đi một yêu cầu giao dịch lên mạng lưới từ một nút. Để yêu cầu giao dịch ảnh hưởng đến trạng thái EVM đã được đồng ý, nó phải được xác minh, thực thi và "cam kết vào mạng lưới" bởi một nút khác. Việc thực thi bất kỳ mã nào đều gây ra sự thay đổi trạng thái trong EVM; khi được cam kết, sự thay đổi trạng thái này được phát đến tất cả các nút trong mạng lưới. Một số ví dụ về giao dịch:

- Gửi X ETH từ tài khoản của tôi đến tài khoản của Alice.
- Xuất bản một số mã hợp đồng thông minh vào trạng thái EVM.
- Thực thi mã của hợp đồng thông minh tại địa chỉ X trong EVM, với các đối số Y.

[Tìm hiểu thêm về giao dịch](/developers/docs/transactions/)

### Khối {#blocks}

Khối lượng giao dịch rất cao, vì vậy các giao dịch được "cam kết" theo đợt, hoặc các khối. Các khối thường chứa hàng chục đến hàng trăm giao dịch.

[Tìm hiểu thêm về khối](/developers/docs/blocks/)

### Hợp đồng thông minh {#smart-contracts}

Một đoạn mã có thể tái sử dụng (một chương trình) mà nhà phát triển xuất bản vào trạng thái EVM. Bất kỳ ai cũng có thể yêu cầu thực thi mã hợp đồng thông minh bằng cách tạo một yêu cầu giao dịch. Bởi vì các nhà phát triển có thể viết các ứng dụng thực thi tùy ý vào EVM (trò chơi, thị trường, công cụ tài chính, v.v.) bằng cách xuất bản các hợp đồng thông minh, chúng thường được gọi là [ứng dụng phi tập trung (dapp)](/developers/docs/dapps/).

[Tìm hiểu thêm về hợp đồng thông minh](/developers/docs/smart-contracts/)

## Bước tiếp theo {#where-to-go-next}

Hầu hết người đọc theo dõi các tài liệu theo thứ tự, nhưng con đường ngắn nhất phụ thuộc vào những gì bạn đang cố gắng xây dựng:

- **Các dapp tương tác với Ethereum:** [tài khoản](/developers/docs/accounts/) và [giao dịch](/developers/docs/transactions/), sau đó chọn một [framework](/developers/docs/frameworks/).
- **Phát triển hợp đồng thông minh:** [hợp đồng thông minh](/developers/docs/smart-contracts/) và [ngôn ngữ lập trình](/developers/docs/programming-languages/).
- **Các nút và việc đặt cọc:** [các nút và máy khách](/developers/docs/nodes-and-clients/), sau đó là [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/).

## Đọc thêm {#further-reading}

- [Sách trắng Ethereum](/whitepaper/)
- [Dù sao thì Ethereum hoạt động như thế nào?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**Lưu ý** tài nguyên này vẫn có giá trị nhưng hãy lưu ý rằng nó có trước [The Merge](/roadmap/merge) và do đó vẫn đề cập đến cơ chế bằng chứng công việc (PoW) của Ethereum - Ethereum thực tế hiện được bảo mật bằng cách sử dụng [bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos))

### Bạn thích học qua hình ảnh hơn? {#visual-learner}

Chuỗi video này cung cấp một sự khám phá chi tiết về các chủ đề nền tảng:

<VideoWatch slug="ethereum-basics-intro" />

[Danh sách phát cơ bản về Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Bạn biết một tài nguyên cộng đồng đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Hướng dẫn liên quan {#related-tutorials}

- [Hướng dẫn về Ethereum cho nhà phát triển, phần 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Một khám phá rất thân thiện với người mới bắt đầu về Ethereum bằng Python và web3.py_