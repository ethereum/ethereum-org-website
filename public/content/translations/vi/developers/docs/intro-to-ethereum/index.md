---
title: "Giới thiệu kỹ thuật về Ethereum"
description: "Một bản hướng dẫn cho các nhà phát triển ứng dụng phi tập trung cho đến các khái niệm cốt lõi của Ethereum."
lang: vi
---

## Chuỗi khối là gì? {#what-is-a-blockchain}

Một chuỗi khối là một cơ sở dữ liệu công khai được cập nhật và chia sẻ giữa nhiều máy tính trong một mạng lưới.

"Khối" đề cập đến dữ liệu và trạng thái được lưu trữ trong các nhóm liên tiếp, được biết đến là "các khối". Khi bạn gửi ETH đến người khác, dữ liệu của giao dịch cần được thêm vào một khối để được coi là thành công.

"Chuỗi" liên quan đến thực tế rằng, mỗi khối tham chiếu mã hóa đến khối mẹ của chúng. Hay nói cách khác, các khối được xâu chuỗi với nhau. Dữ liệu trong một khối không thể thay đổi mà không làm các khối tiếp theo nó thay đổi, điều mà sẽ cần đến sự đồng thuận của toàn mạng lưới.

Mọi máy tính trong mạng lưới cần phải đồng ý về mỗi khối mới và toàn phần chuỗi. Những máy tính được biết đến là các "nút". Các nút đảm bảo tất cả mọi người tiếp xúc với mạng chuỗi khối có cùng dữ liệu. Để đạt được sự đồng thuận phân tán này, chuỗi khối cần một cơ chế đồng thuận.

Ethereum sử dụng một [cơ chế đồng thuận dựa trên bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/). Bất cư ai muốn thêm khối vào chuỗi phải ký gửi ETH - đồng tiền bản địa của Ethereum - làm thế chấp và chạy phần mềm nút xác thực. Những "nút xác thực" này sẽ được chọn ngẫu nhiên để đề nghị thêm khối và được kiểm tra bởi các nút xác thực khác và ghi vào chuỗi khối. Có một hệ thống thưởng và phạt được sử dụng để khuyến khích những người tham gia trung thực và có mặt trực tuyến nhiều nhất có thể.

Nếu bạn muốn xem cách dữ liệu chuỗi khối được băm và sau đó được thêm vào lịch sử tham chiếu khối, hãy chắc chắn xem [bản demo này](https://andersbrownworth.com/blockchain/blockchain) của Anders Brownworth và xem video đi kèm bên dưới.

Xem Ander giải thích hàm băm trong chuỗi khối:

<YouTube id="_160oMzblY8" />

## Ethereum Là gì? {#what-is-ethereum}

Ethereum là một chuỗi khối với một máy tính nhúng vào nó. Nó là nền tảng để xây dựng ứng dụng và tổ chức trong một môi trường phi tập trung, không cần xin phép và chống kiểm duyệt.

Nếu như trong vũ trụ Ethereum, sẽ chỉ có một, máy tính chuẩn tắc duy nhất (được gọi là máy chủ ảo Ethereum) mà toàn bộ mạng lưới Ethereum đều đồng thuận về trạng thái của nó. Những ai tham gia vào mạng lưới Ethereum (mỗi nút Ethereum) giữ một phiên bản trạng thái của máy tính này. Thêm vào đó, những người tham gia có thể phát tán những yêu cầu từ máy chủ để thực hiện phép tính tùy thích. Khi nào những yêu cầu đó được phát tán đi, những người tham gia mạng lưới sẽ tham gia xác thực, hợp thuwcss hóa, và xử lí tính toán. Sự thực thi này làm một thay đổi trên trạng thái máy chủ ảo Ethereum (EVM), được ghi nhận và phát tán ra khắp mạng lưới.

Những yêu cầu tính toán này được gọi là yêu cầu giao dịch; những ghi chép của tất cả giao dịch và trạng thái EVM hiện tại được lưu trữ trên chuỗi khối, sau đó được lưu trữ và đồng tình ở trên tất cả các nút.

Các cơ chế mật mã học đảm bảo rằng một khi giao dịch được xác minh là hợp lệ và thêm vào mạng lưới, thì sau không thể bị giả mạo hoặc chỉnh sửa. Các cơ chế tương từ cũng đảm bảo rằng mọi giao dịch đều đưcọ ký và thực thi với quyền hạn phù hợp (không ai có thể gửi tài sản số từ tài khoản của Alice ngoại trừ chính Alice).

## Ether là gì? {#what-is-ether}

**Ether (ETH)** là đồng tiền mã hóa gốc của Ethereum. Mục đích của ETH là để cho phép một thị trường tính tồn tại. Một thị trường như vậy cung cấp động lực kinh tế cho những người tham gia để họ xác minh và thực thi các yêu cầu giao dịch, đồng thời cung cấp tài nguyên tính toán cho mạng lưới.

Bất kỳ người tham gia nào phát sóng một yêu cầu giao dịch cũng phải cung cấp cho mạng lưới một lượng ETH nhất định như một khoản thưởng. Mạng lưới sẽ đốt một phần của chi phí này và trao phần còn lại cho bất kỳ ai cuối cùng thực hiện công việc xác minh giao dịch, thực thi nó, ghi nhận nó lên chuỗi khối và phát sóng nó đến toàn bộ mạng lưới.

Lượng ETH được trả phụ thuộc và tài nguyên cần để tính toán. Những phần thưởng này cũng chặn những kẻ tham gia mạng lưới với mục đích xấu làm tắc nghẽn mạng lưới bằng cách thực hiện một vòng lặp tính toán vô tận hoặc một phép tính siêu tiêu tốn tài nguyên, bởi vì họ sẽ phải trả phí cho tài nguyên tính toán.

Eth cũng sử dụng cơ chế "mật mã học-kinh tế" để đảm bảo an toàn mạn lưới trong 3 phương pháp chính: 1) nó được sử dụng để thưởng cho nút xác thực người đề xuất khối hoặc răn đe những trường hợp gian lận bởi những nút xác thực khác; 2) nó được sử dụng để Stake bởi các nút xác thực, đóng vai trò là tài sản thế chấp chống lại hành vi gian lận - nếu như nút xác thực cố gian lận thì ETH của họ bị hủy đi; 3) nó là một công cụ để làm trọng số phiếu bầu cho việc đề xuất khối mới, cho phép đưa vào phần quy tắc chọn nhánh (Fork-Choice) của cơ chế đồng thuận.

## Hợp đồng thông minh là gì? {#what-are-smart-contracts}
Trong thực tế, người tham gia không viết mã mới mỗi khi họ muốn yêu cầu một phép tính toán trên EVM. Thay vào đó, người lập trình ứng dụng tải các chương trình (các đoạn mã có thể tái sử dụng) lên trạng thái của EVM, và người dùng gửi yêu cầu để thực thi các đoạn mã này với những tham số khác nhau. Chúng tôi gọi các chương trình được tải lên và thực thi bởi mạng là "hợp đồng thông minh".

Có thể nghĩ đơn giản là hợp đồng thông minh giống như một máy bán hàng tự động: một kịch bản khi mà ở một giới hạn nhất định, thực hiện hành động hoặc tính toán nếu như đúng điều kiện. Ví dụ, một hợp đồng thông minh bán hàng đơn giản có thể tạo ra và gán quyền sở hữu của một tài sản số nếu người gọi gửi ETH đến một người nhận cụ thể.

Bất kỳ nhà phát triển nào cũng có thể tạo một hợp đồng thông minh và công khai nó cho mạng lưới, sử dụng chuỗi khối làm lớp dữ liệu, với một khoản phí trả cho mạng lưới. Sau đó, bất kỳ người dùng nào cũng có thể gọi hợp đồng thông minh để thực thi mã nguồn của nó, cũng với một khoản phí trả cho mạng lưới.

Từ đó, với hợp đồng thông minh, các nhà phát triển có thể xây dựng và thực thi những ứng dụng và dịch vụ có độ phức tạp tùy ý như: chợ bán hàng, công cụ tài chính, game,...

## Thuật ngữ {#terminology}

### Chuỗi khối {#blockchain}

Thứ tự của những khối được ghi vĩnh viễn lên mạng lưới Ethereum và trong lịch sử của mạng lưới. Sở dĩ được gọi như vậy là vì mỗi khối đều chứa tham chiếu đến khối trước đó, điều này giúp chúng ta duy trì thứ tự giữa tất cả các khối (và do đó là toàn bộ lịch sử chính xác).

### ETH {#eth}

**Ether (ETH)** là đồng tiền mã hóa gốc của Ethereum. Người dùng trả ETH cho người khác để được thực thi mã nguồn của họ.

[Tìm hiểu thêm về ETH](/developers/docs/intro-to-ether/)

### Máy ảo Ethereum {#evm}

Máy chủ ảo Ethereum là một máy chủ ảo toàn cầu mà trạng thái của mỗi người tham gia mạng lưới của Ethereum được lưu trữ và đồng thuận. Bất kì người tham gia có thể yêu câu một thực thi mã nguồn tùy thích trên EVM; mã nguồn được thực thi sẽ thay đổi trạng thái của EVM.

[Tìm hiểu thêm về EVM](/developers/docs/evm/)

### Các nút {#nodes}

Một máy móc đời thực đang lưu trữ trạng thái của EVM. Các nút giao tiếp với nhau để đề lan truyền thông tin về trạng thái EVM và thay đổi trạng thái mới. Bất kì người dùng nào cũng có thể yêu cầu mã người phát tán và yêu cầu mã nguồn thực thi trên một nút. Mạng lưới Ethereum chính nó là tập hợp những nút Ethereum mà chúng nó giao tiếp với nhau.

[Tìm hiểu thêm về các nút](/developers/docs/nodes-and-clients/)

### Các tài khoản {#accounts}

Nơi ETH được lưu trữ. Người dùng có thể khởi tạo tài khoản, nạp ETH vào tài khoản, và chuyển ETH từ tài khoản của mình sang cho người dùng khác. Các tài khoản và số dư tài khoản được lưu trữ trong một bảng tính lớn trong EVM; chúng là một phần của trạng thái tổng thể của EVM.

[Tìm hiểu thêm về các tài khoản](/developers/docs/accounts/)

### Các giao dịch {#transactions}

Một "yêu cầu giao dịch" là thuật ngữ chính thức cho một yêu cầu thực thi mã nguồn trên EVM, và "một giao dịch" là một yêu cầu giao dịch đã được hoàn tất và liên kết thay đổi trong trạng thái mạng lưới EVM. Bất kì người dùng nào cũng có thể phát tán yêu cầu giao dịch cho mạng lưới từ nút. Để yêu cầu giao dịch ảnh hưởng lên trạng thái đã được đồng thuận trên EVM, nó phải được thực thi hợp lệ, và "ghi trên mạng lưới" bởi một nút khác. Thực thi bất kì mã nguồn nào gây nên thay đổi trạng thái EVM; tới khi được ghi, trạng thái này được lan truyền cho tất cả nút trong mạng lưới. Một vài ví dụ cho những giao dịch:

- Gửi X ETH từ tài khoản của tôi tới tài khoản của Alice.
- Công khai một mã nguồn hợp đồng thông minh lên máy chủ EVM.
- Thực thi một mã nguồn của hợp đồng thông minh tại địa chỉ X trên EVM, với đồng ý Y.

[Tìm hiểu thêm về các giao dịch](/developers/docs/transactions/)

### Các khối {#blocks}

Khối lượng giao dịch rất cao, nên các giao dịch được "cam kết" theo lô, hay các khối. Khối nói chúng chứa hàng chục đến hàng trăm giao dịch.

[Tìm hiểu thêm về các khối](/developers/docs/blocks/)

### Hợp đồng thông minh {#smart-contracts}

Một mẫu mã nguồn tái sử dụng (một chương trình) mà lập trình viên công khai trên trạng thái EVM. Bất kì ai cũng có thể yêu câu cầu một mã nguồn hợp đồng thông minh thực thi bằng cách gửi yêu cầu giao dịch. Bởi vì các nhà phát triển có thể viết các ứng dụng thực thi tùy ý vào EVM (trò chơi, thị trường, công cụ tài chính, v.v.) bằng cách xuất bản các hợp đồng thông minh, chúng cũng thường được gọi là [dapps, hay Các ứng dụng phi tập trung](/developers/docs/dapps/).

[Tìm hiểu thêm về hợp đồng thông minh](/developers/docs/smart-contracts/)

## Đọc thêm {#further-reading}

- [Sách trắng Ethereum](/whitepaper/)
- [Rốt cuộc thì Ethereum hoạt động như thế nào?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**Lưu ý:** tài liệu này vẫn có giá trị nhưng xin lưu ý rằng nó được viết trước [The Merge](/roadmap/merge) và do đó vẫn đề cập đến cơ chế bằng chứng công việc của Ethereum - Ethereum hiện được bảo mật bằng [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos))

### Tìm hiểu thêm từ video trực quan? Người học qua hình ảnh {#visual-learner}

Chuỗi video này cho phép khám phá các chủ đề nền tảng:

<YouTube id="j78ZcIIpi0Q"/>

[Danh sách phát về những kiến thức cơ bản của Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các hướng dẫn liên quan {#related-tutorials}

- [Hướng dẫn cho nhà phát triển về Ethereum, phần 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Một khám phá Ethereum rất thân thiện với người mới bắt đầu, sử dụng Python và web3.py_
