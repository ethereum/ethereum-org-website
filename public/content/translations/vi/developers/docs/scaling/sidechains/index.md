---
title: "Chuỗi phụ"
description: "Giới thiệu về chuỗi phụ như một giải pháp mở rộng quy mô hiện đang được cộng đồng Ethereum sử dụng."
lang: vi
sidebarDepth: 3
---

Một chuỗi phụ là một chuỗi khối riêng biệt chạy độc lập với [Ethereum](/) và được kết nối với Mạng chính Ethereum bằng một cầu nối hai chiều. Các chuỗi phụ có thể có các tham số khối và [thuật toán đồng thuận](/developers/docs/consensus-mechanisms/) riêng biệt, thường được thiết kế để xử lý giao dịch hiệu quả. Tuy nhiên, việc sử dụng một chuỗi phụ đi kèm với những sự đánh đổi, vì chúng không kế thừa các thuộc tính bảo mật của Ethereum. Không giống như [các giải pháp mở rộng quy mô lớp 2 (l2)](/layer-2/), các chuỗi phụ không gửi các thay đổi trạng thái và dữ liệu giao dịch trở lại Mạng chính Ethereum.

Các chuỗi phụ cũng hy sinh một phần sự phi tập trung hoặc bảo mật để đạt được thông lượng cao ([bộ ba bất khả thi về khả năng mở rộng](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Tuy nhiên, Ethereum cam kết mở rộng quy mô mà không làm tổn hại đến sự phi tập trung và bảo mật.

## Các chuỗi phụ hoạt động như thế nào? {#how-do-sidechains-work}

Các chuỗi phụ là các chuỗi khối độc lập, với lịch sử, lộ trình phát triển và các cân nhắc thiết kế khác nhau. Mặc dù một chuỗi phụ có thể chia sẻ một số điểm tương đồng bề ngoài với Ethereum, nhưng nó có một số tính năng khác biệt.

### Các thuật toán đồng thuận {#consensus-algorithms}

Một trong những phẩm chất làm cho các chuỗi phụ trở nên độc đáo (tức là khác với Ethereum) là thuật toán đồng thuận được sử dụng. Các chuỗi phụ không dựa vào Ethereum để đạt được sự đồng thuận và có thể chọn các giao thức đồng thuận thay thế phù hợp với nhu cầu của chúng. Một số ví dụ về các thuật toán đồng thuận được sử dụng trên các chuỗi phụ bao gồm:

- [Bằng chứng ủy quyền (PoA)](/developers/docs/consensus-mechanisms/poa/)
- [Bằng chứng cổ phần ủy quyền](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Khả năng chịu lỗi Byzantine](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Giống như Ethereum, các chuỗi phụ có các nút xác thực để xác minh và xử lý các giao dịch, tạo ra các khối và lưu trữ trạng thái chuỗi khối. Các trình xác thực cũng chịu trách nhiệm duy trì sự đồng thuận trên toàn mạng lưới và bảo vệ nó khỏi các cuộc tấn công độc hại.

#### Các tham số khối {#block-parameters}

Ethereum đặt ra các giới hạn về [thời gian khối](/developers/docs/blocks/#block-time) (tức là thời gian cần thiết để tạo ra các khối mới) và [kích thước khối](/developers/docs/blocks/#block-size) (tức là lượng dữ liệu chứa trong mỗi khối được tính bằng Gas). Ngược lại, các chuỗi phụ thường áp dụng các tham số khác nhau, chẳng hạn như thời gian khối nhanh hơn và giới hạn Gas cao hơn, để đạt được thông lượng cao, giao dịch nhanh và phí thấp.

Mặc dù điều này có một số lợi ích, nhưng nó có những tác động quan trọng đối với sự phi tập trung và bảo mật của mạng lưới. Các tham số khối, như thời gian khối nhanh và kích thước khối lớn, làm tăng độ khó của việc chạy một nút đầy đủ—để lại một vài "siêu nút" chịu trách nhiệm bảo mật chuỗi. Trong một kịch bản như vậy, khả năng thông đồng của trình xác thực hoặc việc chiếm đoạt chuỗi một cách độc hại sẽ tăng lên.

Để các chuỗi khối mở rộng quy mô mà không làm tổn hại đến sự phi tập trung, việc chạy một nút phải mở cho tất cả mọi người—không nhất thiết phải là các bên có phần cứng chuyên dụng. Đây là lý do tại sao các nỗ lực đang được tiến hành để đảm bảo mọi người đều có thể [chạy một nút đầy đủ](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) trên mạng lưới Ethereum.

### Khả năng tương thích EVM {#evm-compatibility}

Một số chuỗi phụ tương thích với EVM và có thể thực thi các hợp đồng được phát triển cho [Máy ảo Ethereum (EVM)](/developers/docs/evm/). Các chuỗi phụ tương thích với EVM hỗ trợ các hợp đồng thông minh [được viết bằng Solidity](/developers/docs/smart-contracts/languages/), cũng như các ngôn ngữ hợp đồng thông minh EVM khác, điều này có nghĩa là các hợp đồng thông minh được viết cho Mạng chính Ethereum cũng sẽ hoạt động trên các chuỗi phụ tương thích với EVM.

Điều này có nghĩa là nếu bạn muốn sử dụng [ứng dụng phi tập trung (dapp)](/developers/docs/dapps/) của mình trên một chuỗi phụ, bạn chỉ cần triển khai [hợp đồng thông minh](/developers/docs/smart-contracts/) của mình lên chuỗi phụ này. Nó trông, có cảm giác và hoạt động giống hệt như Mạng chính—bạn viết các hợp đồng bằng Solidity và tương tác với chuỗi thông qua RPC của chuỗi phụ.

Bởi vì các chuỗi phụ tương thích với EVM, chúng được coi là một [giải pháp mở rộng quy mô](/developers/docs/scaling/) hữu ích cho các dapp gốc của Ethereum. Với dapp của bạn trên một chuỗi phụ, người dùng có thể tận hưởng phí Gas thấp hơn và các giao dịch nhanh hơn, đặc biệt là nếu Mạng chính đang bị tắc nghẽn.

Tuy nhiên, như đã giải thích trước đó, việc sử dụng một chuỗi phụ đi kèm với những sự đánh đổi đáng kể. Mỗi chuỗi phụ tự chịu trách nhiệm về bảo mật của nó và không kế thừa các thuộc tính bảo mật của Ethereum. Điều này làm tăng khả năng xảy ra hành vi độc hại có thể ảnh hưởng đến người dùng của bạn hoặc đặt tiền của họ vào rủi ro.

### Việc di chuyển tài sản {#asset-movement}

Để một chuỗi khối riêng biệt trở thành một chuỗi phụ của Mạng chính Ethereum, nó cần có khả năng tạo điều kiện thuận lợi cho việc chuyển tài sản từ và đến Mạng chính Ethereum. Khả năng tương tác này với Ethereum đạt được bằng cách sử dụng một cầu nối chuỗi khối. [Các cầu nối](/bridges/) sử dụng các hợp đồng thông minh được triển khai trên Mạng chính Ethereum và một chuỗi phụ để kiểm soát việc kết nối tiền giữa chúng.

Mặc dù các cầu nối giúp người dùng di chuyển tiền giữa Ethereum và chuỗi phụ, nhưng các tài sản không được di chuyển về mặt vật lý qua hai chuỗi. Thay vào đó, các cơ chế thường liên quan đến việc đúc và đốt được sử dụng để chuyển giá trị qua các chuỗi. Tìm hiểu thêm về [cách các cầu nối hoạt động](/developers/docs/bridges/#how-do-bridges-work).

## Ưu và nhược điểm của các chuỗi phụ {#pros-and-cons-of-sidechains}

| Ưu điểm                                                                                                                     | Nhược điểm                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Công nghệ nền tảng của các chuỗi phụ đã được thiết lập tốt và được hưởng lợi từ các nghiên cứu sâu rộng cũng như những cải tiến trong thiết kế. | Các chuỗi phụ đánh đổi một phần sự phi tập trung và tính không cần niềm tin để lấy khả năng mở rộng.                          |
| Các chuỗi phụ hỗ trợ tính toán chung và cung cấp khả năng tương thích EVM (chúng có thể chạy các dapp gốc của Ethereum).                    | Một chuỗi phụ sử dụng một cơ chế đồng thuận riêng biệt và không được hưởng lợi từ các đảm bảo bảo mật của Ethereum.         |
| Các chuỗi phụ sử dụng các mô hình đồng thuận khác nhau để xử lý giao dịch hiệu quả và giảm phí giao dịch cho người dùng.         | Các chuỗi phụ yêu cầu các giả định tin cậy cao hơn (ví dụ: một nhóm các trình xác thực chuỗi phụ độc hại có thể thực hiện gian lận). |
| Các chuỗi phụ tương thích với EVM cho phép các dapp mở rộng hệ sinh thái của chúng.                                                            |                                                                                                                  |

### Sử dụng các chuỗi phụ {#use-sidechains}

Nhiều dự án cung cấp các triển khai của các chuỗi phụ mà bạn có thể tích hợp vào các dapp của mình:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (trước đây là xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Đọc thêm {#further-reading}

- [Mở rộng quy mô các dapp Ethereum thông qua các chuỗi phụ](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Ngày 8 tháng 2 năm 2018 - Georgios Konstantopoulos_

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_