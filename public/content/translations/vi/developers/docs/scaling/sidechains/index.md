---
title: "Chuỗi bên"
description: "Giới thiệu về chuỗi bên như một giải pháp mở rộng quy mô hiện đang được cộng đồng Ethereum sử dụng."
lang: vi
sidebarDepth: 3
---

Chuỗi bên là một chuỗi khối riêng biệt chạy độc lập với Ethereum và được kết nối với Mạng chính Ethereum bằng cầu nối hai chiều. Các chuỗi bên có thể có các thông số khối riêng biệt và [các thuật toán đồng thuận](/developers/docs/consensus-mechanisms/), thường được thiết kế để xử lý giao dịch hiệu quả. Tuy nhiên, việc sử dụng chuỗi bên có sự đánh đổi, vì chúng không kế thừa các thuộc tính bảo mật của Ethereum. Không giống như [các giải pháp mở rộng quy mô lớp 2](/layer-2/), các chuỗi bên không đăng các thay đổi trạng thái và dữ liệu giao dịch trở lại Mạng chính Ethereum.

Các chuỗi bên cũng hy sinh một mức độ phân cấp hoặc bảo mật nhất định để đạt được thông lượng cao ([thế khó ba nan giải về khả năng mở rộng](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Tuy nhiên, Ethereum cam kết mở rộng quy mô mà không ảnh hưởng đến tính phi tập trung và bảo mật.

## Các chuỗi bên hoạt động như thế nào? {#how-do-sidechains-work}

Các chuỗi bên là các chuỗi khối độc lập, với lịch sử, lộ trình phát triển và các cân nhắc thiết kế khác nhau. Mặc dù chuỗi bên có thể có một số điểm tương đồng ở bề ngoài với Ethereum, nó có một số tính năng đặc biệt.

### Các thuật toán đồng thuận {#consensus-algorithms}

Một trong những phẩm chất làm cho các chuỗi bên trở nên độc nhất (tức là khác với Ethereum) là thuật toán đồng thuận được sử dụng. Các chuỗi bên không dựa vào Ethereum để có được sự đồng thuận và có thể chọn các giao thức đồng thuận thay thế phù hợp với nhu cầu của chúng. Một số ví dụ về thuật toán đồng thuận được sử dụng trên các chuỗi bên bao gồm:

- [Bằng chứng ủy quyền](/developers/docs/consensus-mechanisms/poa/)
- [Bằng chứng cổ phần được ủy quyền](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Khả năng chịu lỗi Byzantine](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Giống như Ethereum, các chuỗi bên có các nút xác thực để xác minh và xử lý các giao dịch, sản xuất các khối và lưu trữ trạng thái chuỗi khối. Trình xác thực cũng chịu trách nhiệm duy trì sự đồng thuận trên toàn mạng và bảo mật mạng trước các cuộc tấn công độc hại.

#### Các thông số khối {#block-parameters}

Ethereum đặt ra các giới hạn về [thời gian tạo khối](/developers/docs/blocks/#block-time) (tức là thời gian cần thiết để tạo ra các khối mới) và [kích thước khối](/developers/docs/blocks/#block-size) (tức là lượng dữ liệu chứa trong mỗi khối được tính bằng gas). Ngược lại, các chuỗi bên thường áp dụng các thông số khác nhau, chẳng hạn như thời gian tạo khối nhanh hơn và giới hạn gas cao hơn, để đạt được thông lượng cao, giao dịch nhanh và phí thấp.

Mặc dù điều này có một số lợi ích, nó có những tác động quan trọng đối với tính phi tập trung và bảo mật của mạng. Các thông số khối, như thời gian tạo khối nhanh và kích thước khối lớn, làm tăng độ khó của việc chạy một nút đầy đủ—để lại một vài "siêu nút" chịu trách nhiệm bảo mật chuỗi. Trong một kịch bản như vậy, khả năng thông đồng của trình xác thực hoặc một cuộc tiếp quản chuỗi độc hại sẽ tăng lên.

Để các chuỗi khối mở rộng quy mô mà không gây hại cho tính phi tập trung, việc chạy một nút phải mở cho tất cả mọi người—không nhất thiết phải là các bên có phần cứng chuyên dụng. Đây là lý do tại sao các nỗ lực đang được tiến hành để đảm bảo mọi người đều có thể [chạy một nút đầy đủ](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) trên mạng Ethereum.

### Khả năng tương thích với EVM {#evm-compatibility}

Một số chuỗi bên tương thích với EVM và có thể thực thi các hợp đồng được phát triển cho [Máy ảo Ethereum (EVM)](/developers/docs/evm/). Các chuỗi bên tương thích với EVM hỗ trợ các hợp đồng thông minh [được viết bằng Solidity](/developers/docs/smart-contracts/languages/), cũng như các ngôn ngữ hợp đồng thông minh EVM khác, điều đó có nghĩa là các hợp đồng thông minh được viết cho Mạng chính Ethereum cũng sẽ hoạt động trên các chuỗi bên tương thích với EVM.

Điều này có nghĩa là nếu bạn muốn sử dụng [ứng dụng phi tập trung](/developers/docs/dapps/) của mình trên một chuỗi bên, bạn chỉ cần triển khai [hợp đồng thông minh](/developers/docs/smart-contracts/) của mình tới chuỗi bên này. Nó trông, cảm nhận và hoạt động giống như Mạng chính—bạn viết các hợp đồng bằng Solidity và tương tác với chuỗi thông qua RPC của chuỗi bên.

Vì các chuỗi bên tương thích với EVM, chúng được coi là một [giải pháp mở rộng quy mô](/developers/docs/scaling/) hữu ích cho các ứng dụng phi tập trung gốc của Ethereum. Với ứng dụng phi tập trung của bạn trên một chuỗi bên, người dùng có thể hưởng phí gas thấp hơn và giao dịch nhanh hơn, đặc biệt là nếu Mạng chính bị tắc nghẽn.

Tuy nhiên, như đã giải thích trước đó, việc sử dụng chuỗi bên có những đánh đổi đáng kể. Mỗi chuỗi bên chịu trách nhiệm về bảo mật của riêng mình và không kế thừa các thuộc tính bảo mật của Ethereum. Điều này làm tăng khả năng xảy ra hành vi độc hại có thể ảnh hưởng đến người dùng của bạn hoặc khiến tiền của họ gặp rủi ro.

### Chuyển động tài sản {#asset-movement}

Để một chuỗi khối riêng biệt trở thành một chuỗi bên cho Mạng chính Ethereum, nó cần có khả năng tạo điều kiện thuận lợi cho việc chuyển tài sản từ và đến Mạng chính Ethereum. Khả năng tương tác này với Ethereum đạt được bằng cách sử dụng một cầu nối chuỗi khối. [Cầu nối](/bridges/) sử dụng các hợp đồng thông minh được triển khai trên Mạng chính Ethereum và một chuỗi bên để kiểm soát việc kết nối các quỹ giữa chúng.

Trong khi các cầu nối giúp người dùng chuyển tiền giữa Ethereum và chuỗi bên, tài sản không được di chuyển vật lý qua hai chuỗi. Thay vào đó, các cơ chế thường liên quan đến việc đúc và đốt được sử dụng để chuyển giá trị qua các chuỗi. Tìm hiểu thêm về [cách các cầu nối hoạt động](/developers/docs/bridges/#how-do-bridges-work).

## Ưu và nhược điểm của các chuỗi bên {#pros-and-cons-of-sidechains}

| Ưu điểm                                                                                                                                                                           | Nhược điểm                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Công nghệ nền tảng của các chuỗi bên đã được thiết lập tốt và được hưởng lợi từ nghiên cứu sâu rộng và những cải tiến trong thiết kế.                             | Các chuỗi bên đánh đổi một mức độ phi tập trung và không cần tin cậy nhất định để có khả năng mở rộng.                                                                                     |
| Các chuỗi bên hỗ trợ tính toán chung và cung cấp khả năng tương thích với EVM (chúng có thể chạy các ứng dụng phi tập trung gốc của Ethereum). | Một chuỗi bên sử dụng một cơ chế đồng thuận riêng biệt và không được hưởng lợi từ các đảm bảo bảo mật của Ethereum.                                                                        |
| Các chuỗi bên sử dụng các mô hình đồng thuận khác nhau để xử lý các giao dịch một cách hiệu quả và giảm phí giao dịch cho người dùng.                             | Các chuỗi bên đòi hỏi các giả định tin cậy cao hơn (ví dụ: một số đại biểu của các trình xác thực chuỗi bên độc hại có thể thực hiện hành vi gian lận). |
| Các chuỗi bên tương thích với EVM cho phép các ứng dụng phi tập trung mở rộng hệ sinh thái của chúng.                                                             |                                                                                                                                                                                                            |

### Sử dụng các chuỗi bên {#use-sidechains}

Nhiều dự án cung cấp các triển khai chuỗi bên mà bạn có thể tích hợp vào các ứng dụng phi tập trung của mình:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Chuỗi Gnosis (trước đây là xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Đọc thêm {#further-reading}

- [Mở rộng quy mô các ứng dụng phi tập trung của Ethereum thông qua các chuỗi bên](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 tháng 2, 2018 - Georgios Konstantopoulos_

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
