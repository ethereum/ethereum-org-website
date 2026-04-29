---
title: "Giao dịch — ETH.BUILD"
description: "Bản trình diễn về cách các giao dịch Ethereum hoạt động bằng công cụ giáo dục ETH.BUILD. Xem cách các giao dịch được xây dựng, được ký và gửi trên mạng lưới Ethereum."
lang: vi
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transactions"
format: tutorial
author: Austin Griffith
breadcrumb: "Giao dịch (ETH.BUILD)"
---

Một hướng dẫn của **Austin Griffith** trình bày cách các giao dịch Ethereum hoạt động bằng công cụ lập trình trực quan ETH.BUILD — bao gồm cấu trúc giao dịch, giá gas, việc ký, phát sóng và bể giao dịch.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=er-0ihqFQB0) được xuất bản bởi Austin Griffith. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Phí giao dịch và động lực cho thợ đào (0:00) {#transaction-fees-and-miner-incentives-000}

Trên ETH.BUILD hôm nay, chúng ta sẽ nói về các giao dịch. Cho đến nay, chúng ta đã thấy các giao dịch này được đào thành các khối, đóng gói trong các khối và được đào vào một Chuỗi. Chúng ta muốn nói về điều gì tạo động lực cho thợ đào — ngoài phần thưởng khối — để lấy giao dịch của chúng ta ra khỏi bể giao dịch và đưa nó vào một khối rồi đào nó lên Chuỗi, so với những người khác trong bể giao dịch. Có thể có hàng ngàn người trong bể giao dịch đang cùng nhau trả giá, và mức giá đó chính là khoản phí này.

Tôi có thể có một khoản phí trong giao dịch của mình với nội dung "Tôi là Alice và tôi đang gửi năm cho Bob, và nonce của tôi là một để bảo vệ chống phát lại." Ngoài ra, bất kỳ ai đào được khối này đều có thể lấy khoản phí đó cho riêng mình. Về cơ bản, Alice đang gửi năm cho Bob nhưng cũng trả cho thợ đào một khoản tiền nhỏ để đưa nó vào Chuỗi.

#### Cấu trúc của một giao dịch Ethereum (1:10) {#anatomy-of-an-ethereum-transaction-110}

Một giao dịch trông như thế nào trên Ethereum? Chúng ta sẽ không còn "Bob" và "Alice" nữa — chúng ta sẽ có các địa chỉ. Giá trị sẽ được tính bằng Wei, không phải bằng ETH. Và khoản phí cũng sẽ được tính bằng Wei.

Hãy cùng xem xét giao dịch này. Tôi có một tài khoản đã được nhập cụm từ gợi nhớ (mnemonic) và tôi đang kết nối với Mạng chính Ethereum. Tôi cũng đang chạy một mô-đun để lấy dữ liệu giá từ CoinMarketCap, vì vậy tôi có thể thấy rằng không phẩy một mấy ETH tương đương với khoảng hai mươi ba đô la.

#### Thiết lập giao dịch (2:25) {#setting-up-the-transaction-225}

Những gì tôi sẽ làm là tạo một giao dịch và tạo động lực cho thợ đào chọn nó và đưa nó lên chuỗi. Tôi có hai nhân vật — Alice và Bob. Alice sẽ gửi một số giá trị cho Bob bằng khóa riêng tư của cô ấy. Không có trường địa chỉ "từ" (from) ở đây vì — hãy nhớ rằng — chúng ta đang thực hiện việc ký và khôi phục bằng cặp khóa của mình. Giao dịch được đóng gói, được ký và sau đó được gửi qua mạng lưới. Không ai có thể can thiệp vào nó, và ở đầu bên kia, ai đó có thể khôi phục nó và phát hiện ra rằng thực sự chính chúng ta là người đã ký nó. Địa chỉ "từ" được suy ra từ đó.

#### Chiến lược giá gas (4:20) {#gas-price-strategy-420}

Giá gas được đặt ở mức khoảng 4.1 Gwei theo mặc định — tức là 4.1 tỷ Wei. Nhưng chúng ta muốn có chiến lược hơn về điều này và xem những gì đang diễn ra trên chuỗi ngay lúc này. Chúng ta có thể thấy rằng khối cuối cùng có 78 giao dịch và giá gas dao động từ khoảng 5 xuống một mức tối thiểu nào đó. Về cơ bản, chúng ta sẽ cần phải ở mức trên 5 để được đào vào khối đó. Vì vậy, hãy đặt giá gas thành 5.001 — chỉ cao hơn một chút.

#### Chuyển đổi sang wei (5:20) {#converting-to-wei-520}

Chúng ta cần thực hiện chuyển đổi sang Wei. Trên Ethereum, bạn chủ yếu giao dịch với hai mệnh giá: ETH, là mệnh giá mà mọi người thường nói đến, và sau đó là Wei, giống như một phần rất nhỏ của ETH. Một Gwei — thứ chúng ta sử dụng cho giá gas — nằm ở giữa. Lý do cho điều này tương tự như lý do tại sao chúng ta không đi loanh quanh và nói chuyện bằng các phần nhỏ của đồng xu.

Alice có 0.18 ETH và chúng ta sẽ gửi 0.05 ETH cho Bob. Chúng ta đặt giá gas là 5 Gwei.

#### Việc ký và phát sóng (7:02) {#signing-and-broadcasting-702}

Khi Alice chọn ký giao dịch, nó sẽ được phát ra dưới dạng một giao dịch đã ký có thể đi qua mạng lưới. Không ai có thể can thiệp vào nó — ở đầu bên kia, ai đó có thể suy ra rằng chính Alice là người đã ký nó, và nó chứa tất cả thông tin về người mà chúng ta muốn gửi đến cũng như lượng Gas dành cho thợ đào.

Chúng ta lấy giao dịch đã ký đó và đưa nó vào hàm gửi của mô-đun Chuỗi khối. Khi tôi nhấp vào gửi, nó cung cấp cho chúng ta một mã băm — mã băm giao dịch. Về cơ bản, tôi đã gửi nó đến mạng lưới phân tán và họ trả lại cho tôi một mã băm giao dịch. Nó đi ra ngoài mạng lưới, và sau đó có bể giao dịch này — mọi người đều đang trả giá để giao dịch của họ được thông qua.

#### Kiểm tra khối (8:41) {#checking-the-block-841}

Chúng ta có thể truy vấn Chuỗi khối cho giao dịch của mình. Chắc chắn rồi, nó đã được đào. Chúng ta có thể xem xét khối, sắp xếp theo giá gas và tìm thấy chính mình. Có giao dịch của chúng ta ở mức giá gas 5.001 — Alice gửi cho Bob, không có dữ liệu bổ sung. Chúng ta ở trong đó, cách khoảng bốn hoặc năm vị trí từ dưới lên.

#### Gửi dữ liệu kèm theo một giao dịch (9:54) {#sending-data-with-a-transaction-954}

Chúng ta có thể gửi giá trị và trả giá để giao dịch của mình được công nhận trên chuỗi. Nhưng hãy xem xét thêm một điều nữa — trường dữ liệu. Chúng ta có thể gửi mọi thứ cùng với giao dịch của mình. Nó sẽ ở định dạng thập lục phân (hexadecimal). Alice sẽ gửi thêm sáu đô la nữa cho Bob và chúng ta sẽ đính kèm một thông điệp: "hey Bob." Chúng ta có thể thấy "hey Bob" được chuyển đổi thành hex.

Chúng ta ký giao dịch đó, gửi nó cho một thợ đào, nó đi đến mạng lưới và chúng ta nhận lại một mã băm. Chúng ta theo dõi để nó được đào, và nó đã được đào. Khi chúng ta kiểm tra khối đó, chúng ta có thể thấy giao dịch của mình với dữ liệu được đính kèm.

#### Bể giao dịch và tăng gas (12:43) {#transaction-pool-and-gas-bumping-1243}

Đối với bản trình diễn cuối cùng, tôi đưa một giao dịch vào bể giao dịch với giá gas rất thấp — khoảng 1.001 Gwei. Nó nằm đó chưa được đào vì chúng ta không tạo đủ động lực cho các thợ đào. Chúng ta có thể thấy giao dịch đang chờ xử lý trong bể giao dịch. Bể giao dịch có từ một đến ba trăm giao dịch, nhưng các khối mới nhất đang được đào cho thấy giá gas nhỏ nhất là khoảng 5.

Vì vậy, chúng ta cần gửi lại giao dịch này — hãy tăng nó lên 10. Mức đó cao hơn nhiều so với mức cần thiết, nhưng chúng ta sẽ gửi lại cùng một giao dịch với cùng một nonce nhưng giá gas cao hơn. Mạng lưới nói rằng "cùng một người, cùng một giao dịch, sẵn sàng trả nhiều tiền hơn." Nó được chọn và được đào vào khối tiếp theo.

#### Tóm tắt (14:52) {#summary-1452}

Chúng ta đã gửi một giao dịch, chúng ta đã trả một ít Gas để tạo động lực cho thợ đào đưa nó vào Chuỗi khối. Chúng ta cũng đã gửi dữ liệu cùng với một giao dịch — có đủ loại điều thực sự thú vị mà chúng ta có thể làm bây giờ khi chúng ta có dữ liệu lệnh gọi này đi kèm, và chúng ta sẽ đi sâu vào các hợp đồng thông minh cùng nhiều điều thú vị khác sau.