---
title: "Xác minh hình thức của các hợp đồng thông minh"
description: "Tổng quan về xác minh hình thức cho các hợp đồng thông minh Ethereum"
lang: vi
---

[Hợp đồng thông minh](/developers/docs/smart-contracts/) đang tạo điều kiện để tạo ra các ứng dụng phi tập trung, không cần tin cậy và mạnh mẽ, giới thiệu các trường hợp sử dụng mới và mở khóa giá trị cho người dùng. Bởi vì các hợp đồng thông minh xử lý lượng giá trị lớn, bảo mật là một yếu tố quan trọng cần cân nhắc đối với các nhà phát triển.

Xác minh hình thức là một trong những kỹ thuật được khuyến nghị để cải thiện [bảo mật hợp đồng thông minh](/developers/docs/smart-contracts/security/). Xác minh hình thức, sử dụng [các phương pháp hình thức](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) để đặc tả, thiết kế và xác minh các chương trình, đã được sử dụng trong nhiều năm để đảm bảo tính đúng đắn của các hệ thống phần cứng và phần mềm quan trọng.

Khi được triển khai trong các hợp đồng thông minh, xác minh hình thức có thể chứng minh rằng logic nghiệp vụ của hợp đồng đáp ứng một đặc tả được xác định trước. So với các phương pháp khác để đánh giá tính đúng đắn của mã hợp đồng, chẳng hạn như kiểm thử, xác minh hình thức đưa ra những đảm bảo mạnh mẽ hơn rằng một hợp đồng thông minh là đúng về mặt chức năng.

## Xác minh hình thức là gì? {#what-is-formal-verification}

Xác minh hình thức đề cập đến quá trình đánh giá tính đúng đắn của một hệ thống đối với một đặc tả hình thức. Nói một cách đơn giản, xác minh hình thức cho phép chúng tôi kiểm tra xem hành vi của một hệ thống có thỏa mãn một số yêu cầu hay không (tức là nó có làm những gì chúng ta muốn hay không).

Các hành vi dự kiến của hệ thống (trong trường hợp này là một hợp đồng thông minh) được mô tả bằng cách sử dụng mô hình hóa hình thức, trong khi các ngôn ngữ đặc tả cho phép tạo ra các thuộc tính hình thức. Các kỹ thuật xác minh hình thức sau đó có thể xác minh rằng việc triển khai của một hợp đồng tuân thủ đặc tả của nó và suy ra bằng chứng toán học về tính đúng đắn của việc triển khai đó. Khi một hợp đồng thỏa mãn đặc tả của nó, nó được mô tả là “đúng về mặt chức năng”, “đúng theo thiết kế” hoặc “đúng theo cấu trúc”.

### Mô hình hình thức là gì? {#what-is-a-formal-model}

Trong khoa học máy tính, [mô hình hình thức](https://en.wikipedia.org/wiki/Model_of_computation) là một mô tả toán học về một quá trình tính toán. Các chương trình được trừu tượng hóa thành các hàm toán học (phương trình), với mô hình mô tả cách kết quả đầu ra của các hàm được tính toán dựa trên một đầu vào nhất định.

Các mô hình hình thức cung cấp một mức độ trừu tượng mà trên đó việc phân tích hành vi của một chương trình có thể được đánh giá. Sự tồn tại của các mô hình hình thức cho phép tạo ra một _đặc tả hình thức_, mô tả các thuộc tính mong muốn của mô hình được đề cập.

Các kỹ thuật khác nhau được sử dụng để mô hình hóa các hợp đồng thông minh cho việc xác minh hình thức. Ví dụ, một số mô hình được sử dụng để suy luận về hành vi cấp cao của một hợp đồng thông minh. Những kỹ thuật mô hình hóa này áp dụng quan điểm hộp đen cho các hợp đồng thông minh, xem chúng như các hệ thống chấp nhận đầu vào và thực hiện tính toán dựa trên các đầu vào đó.

Các mô hình cấp cao tập trung vào mối quan hệ giữa các hợp đồng thông minh và các tác nhân bên ngoài, chẳng hạn như tài khoản sở hữu bên ngoài (EOA), tài khoản hợp đồng và môi trường chuỗi khối. Các mô hình như vậy hữu ích cho việc xác định các thuộc tính đặc tả cách một hợp đồng nên hoạt động để phản hồi lại các tương tác nhất định của người dùng.

Ngược lại, các mô hình hình thức khác tập trung vào hành vi cấp thấp của một hợp đồng thông minh. Mặc dù các mô hình cấp cao có thể giúp suy luận về chức năng của hợp đồng, chúng có thể không nắm bắt được các chi tiết về hoạt động bên trong của việc triển khai. Các mô hình cấp thấp áp dụng quan điểm hộp trắng để phân tích chương trình và dựa vào các biểu diễn cấp thấp hơn của các ứng dụng hợp đồng thông minh, chẳng hạn như dấu vết chương trình và [đồ thị luồng điều khiển](https://en.wikipedia.org/wiki/Control-flow_graph), để suy luận về các thuộc tính liên quan đến việc thực thi của hợp đồng.

Các mô hình cấp thấp được coi là lý tưởng vì chúng đại diện cho việc thực thi thực tế của một hợp đồng thông minh trong môi trường thực thi của Ethereum (tức là [EVM](/developers/docs/evm/)). Các kỹ thuật mô hình hóa cấp thấp đặc biệt hữu ích trong việc thiết lập các thuộc tính an toàn quan trọng trong các hợp đồng thông minh và phát hiện các lỗ hổng tiềm ẩn.

### Đặc tả hình thức là gì? {#what-is-a-formal-specification}

Đặc tả đơn giản là một yêu cầu kỹ thuật mà một hệ thống cụ thể phải thỏa mãn. Trong lập trình, các đặc tả đại diện cho các ý tưởng chung về việc thực thi của một chương trình (tức là, chương trình nên làm gì).

Trong bối cảnh của các hợp đồng thông minh, các đặc tả hình thức đề cập đến _các thuộc tính_—các mô tả hình thức về các yêu cầu mà một hợp đồng phải thỏa mãn. Các thuộc tính như vậy được mô tả là "bất biến" và đại diện cho các khẳng định logic về việc thực thi của một hợp đồng phải luôn đúng trong mọi hoàn cảnh có thể xảy ra, không có bất kỳ ngoại lệ nào.

Do đó, chúng ta có thể coi một đặc tả hình thức là một tập hợp các câu lệnh được viết bằng một ngôn ngữ hình thức mô tả việc thực thi dự kiến của một hợp đồng thông minh. Các đặc tả bao gồm các thuộc tính của một hợp đồng và xác định cách hợp đồng nên hoạt động trong các hoàn cảnh khác nhau. Mục đích của xác minh hình thức là để xác định xem một hợp đồng thông minh có sở hữu những thuộc tính này (bất biến) hay không và những thuộc tính này không bị vi phạm trong quá trình thực thi.

Các đặc tả hình thức rất quan trọng trong việc phát triển các triển khai bảo mật của các hợp đồng thông minh. Các hợp đồng không triển khai các bất biến hoặc có các thuộc tính bị vi phạm trong quá trình thực thi dễ bị tổn thương bởi các lỗ hổng có thể gây hại cho chức năng hoặc gây ra các khai thác độc hại.

## Các loại đặc tả hình thức cho hợp đồng thông minh {#formal-specifications-for-smart-contracts}

Các đặc tả hình thức cho phép suy luận toán học về tính đúng đắn của việc thực thi chương trình. Cũng như các mô hình hình thức, các đặc tả hình thức có thể nắm bắt các thuộc tính cấp cao hoặc hành vi cấp thấp của một triển khai hợp đồng.

Các đặc tả hình thức được bắt nguồn bằng cách sử dụng các yếu tố của [logic chương trình](https://en.wikipedia.org/wiki/Logic_programming), cho phép suy luận hình thức về các thuộc tính của một chương trình. Một logic chương trình có các quy tắc hình thức thể hiện (bằng ngôn ngữ toán học) hành vi dự kiến của một chương trình. Nhiều logic chương trình khác nhau được sử dụng trong việc tạo ra các đặc tả hình thức, bao gồm [logic khả năng tiếp cận](https://en.wikipedia.org/wiki/Reachability_problem), [logic thời gian](https://en.wikipedia.org/wiki/Temporal_logic), và [logic Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Các đặc tả hình thức cho các hợp đồng thông minh có thể được phân loại rộng rãi thành các đặc tả **cấp cao** hoặc **cấp thấp**. Bất kể một đặc tả thuộc loại nào, nó phải mô tả một cách đầy đủ và rõ ràng thuộc tính của hệ thống đang được phân tích.

### Đặc tả cấp cao {#high-level-specifications}

Như tên gọi, một đặc tả cấp cao (còn được gọi là "đặc tả hướng mô hình") mô tả hành vi cấp cao của một chương trình. Các đặc tả cấp cao mô hình hóa một hợp đồng thông minh như một [máy trạng thái hữu hạn](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), có thể chuyển đổi giữa các trạng thái bằng cách thực hiện các hoạt động, với logic thời gian được sử dụng để xác định các thuộc tính hình thức cho mô hình FSM.

[Logic thời gian](https://en.wikipedia.org/wiki/Temporal_logic) là "các quy tắc để suy luận về các mệnh đề được xác định theo thời gian (ví dụ: "Tôi _luôn_ đói" hoặc "Tôi sẽ _cuối cùng_ cũng đói")." Khi được áp dụng vào xác minh hình thức, logic thời gian được sử dụng để nêu ra các khẳng định về hành vi đúng của các hệ thống được mô hình hóa dưới dạng máy trạng thái. Cụ thể, một logic thời gian mô tả các trạng thái tương lai mà một hợp đồng thông minh có thể ở trong và cách nó chuyển đổi giữa các trạng thái.

Các đặc tả cấp cao thường nắm bắt hai thuộc tính thời gian quan trọng cho các hợp đồng thông minh: **an toàn** và **tính sống động**. Các thuộc tính an toàn đại diện cho ý tưởng rằng “không có điều tồi tệ nào xảy ra” và thường thể hiện tính bất biến. Một thuộc tính an toàn có thể xác định các yêu cầu phần mềm chung, chẳng hạn như không bị [bế tắc](https://www.techtarget.com/whatis/definition/deadlock), hoặc thể hiện các thuộc tính dành riêng cho miền cho các hợp đồng (ví dụ: các bất biến về kiểm soát truy cập cho các hàm, các giá trị có thể chấp nhận của các biến trạng thái hoặc các điều kiện cho việc chuyển token).

Lấy ví dụ yêu cầu an toàn này, bao gồm các điều kiện để sử dụng `transfer()` hoặc `transferFrom()` trong các hợp đồng token ERC-20: _“Số dư của người gửi không bao giờ thấp hơn số lượng token được yêu cầu gửi đi.”_. Mô tả bằng ngôn ngữ tự nhiên này của một bất biến của hợp đồng có thể được dịch thành một đặc tả hình thức (toán học), sau đó có thể được kiểm tra nghiêm ngặt về tính hợp lệ.

Các thuộc tính sống động khẳng định rằng “cuối cùng điều tốt đẹp sẽ xảy ra” và liên quan đến khả năng của một hợp đồng để tiến triển qua các trạng thái khác nhau. Một ví dụ về thuộc tính sống động là “tính thanh khoản”, đề cập đến khả năng của một hợp đồng để chuyển số dư của nó cho người dùng theo yêu cầu. Nếu thuộc tính này bị vi phạm, người dùng sẽ không thể rút tài sản được lưu trữ trong hợp đồng, giống như những gì đã xảy ra với [sự cố ví Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Các đặc tả cấp thấp {#low-level-specifications}

Các đặc tả cấp cao lấy điểm khởi đầu là một mô hình trạng thái hữu hạn của một hợp đồng và xác định các thuộc tính mong muốn của mô hình này. Ngược lại, các đặc tả cấp thấp (còn được gọi là "đặc tả hướng thuộc tính") thường mô hình hóa các chương trình (hợp đồng thông minh) như các hệ thống bao gồm một tập hợp các hàm toán học và mô tả hành vi đúng của các hệ thống như vậy.

Nói một cách đơn giản, các đặc tả cấp thấp phân tích _dấu vết chương trình_ và cố gắng xác định các thuộc tính của một hợp đồng thông minh trên các dấu vết này. Dấu vết đề cập đến các chuỗi thực thi hàm làm thay đổi trạng thái của một hợp đồng thông minh; do đó, các đặc tả cấp thấp giúp đặc tả các yêu cầu cho việc thực thi nội bộ của một hợp đồng.

Các đặc tả hình thức cấp thấp có thể được đưa ra dưới dạng các thuộc tính kiểu Hoare hoặc các bất biến trên các đường dẫn thực thi.

### Thuộc tính kiểu Hoare {#hoare-style-properties}

[Logic Hoare](https://en.wikipedia.org/wiki/Hoare_logic) cung cấp một bộ quy tắc hình thức để suy luận về tính đúng đắn của các chương trình, bao gồm cả các hợp đồng thông minh. Một thuộc tính kiểu Hoare được biểu diễn bằng một bộ ba Hoare `{P}c{Q}`, trong đó `c` là một chương trình và `P` và `Q` là các vị từ trên trạng thái của `c` (tức là chương trình), được mô tả chính thức là _tiền điều kiện_ và _hậu điều kiện_, tương ứng.

Tiền điều kiện là một vị từ mô tả các điều kiện cần thiết để thực thi đúng một hàm; người dùng gọi vào hợp đồng phải thỏa mãn yêu cầu này. Hậu điều kiện là một vị từ mô tả điều kiện mà một hàm thiết lập nếu được thực thi đúng; người dùng có thể mong đợi điều kiện này là đúng sau khi gọi vào hàm. Một _bất biến_ trong logic Hoare là một vị từ được bảo toàn bởi việc thực thi một hàm (tức là nó không thay đổi).

Các đặc tả kiểu Hoare có thể đảm bảo _tính đúng đắn một phần_ hoặc _tính đúng đắn toàn phần_. Việc triển khai một hàm hợp đồng là "đúng một phần" nếu tiền điều kiện đúng trước khi hàm được thực thi, và nếu việc thực thi kết thúc, hậu điều kiện cũng đúng. Bằng chứng về tính đúng đắn toàn phần có được nếu một tiền điều kiện là đúng trước khi hàm thực thi, việc thực thi được đảm bảo sẽ kết thúc và khi kết thúc, hậu điều kiện là đúng.

Việc có được bằng chứng về tính đúng đắn toàn phần là khó khăn vì một số lần thực thi có thể bị trì hoãn trước khi kết thúc, hoặc không bao giờ kết thúc. Tuy nhiên, câu hỏi về việc liệu việc thực thi có kết thúc hay không có thể coi là một điểm tranh luận vì cơ chế Gas của Ethereum ngăn chặn các vòng lặp chương trình vô hạn (việc thực thi kết thúc thành công hoặc kết thúc do lỗi 'hết gas').

Các đặc tả hợp đồng thông minh được tạo bằng logic Hoare sẽ có các tiền điều kiện, hậu điều kiện và các bất biến được xác định cho việc thực thi các hàm và vòng lặp trong một hợp đồng. Các tiền điều kiện thường bao gồm khả năng có các đầu vào sai cho một hàm, với các hậu điều kiện mô tả phản hồi dự kiến cho các đầu vào như vậy (ví dụ: đưa ra một ngoại lệ cụ thể). Bằng cách này, các thuộc tính kiểu Hoare có hiệu quả trong việc đảm bảo tính đúng đắn của các triển khai hợp đồng.

Nhiều khung xác minh hình thức sử dụng các đặc tả kiểu Hoare để chứng minh tính đúng đắn về mặt ngữ nghĩa của các hàm. Cũng có thể thêm các thuộc tính kiểu Hoare (dưới dạng các khẳng định) trực tiếp vào mã hợp đồng bằng cách sử dụng các câu lệnh `require` và `assert` trong Solidity.

`require` thể hiện một tiền điều kiện hoặc bất biến và thường được sử dụng để xác thực đầu vào của người dùng, trong khi `assert` nắm bắt một hậu điều kiện cần thiết cho sự an toàn. Ví dụ, việc kiểm soát truy cập hợp lý cho các hàm (một ví dụ về thuộc tính an toàn) có thể đạt được bằng cách sử dụng `require` như một kiểm tra tiền điều kiện về danh tính của tài khoản gọi. Tương tự, một bất biến về các giá trị cho phép của các biến trạng thái trong một hợp đồng (ví dụ: tổng số token đang lưu hành) có thể được bảo vệ khỏi bị vi phạm bằng cách sử dụng `assert` để xác nhận trạng thái của hợp đồng sau khi thực thi hàm.

### Các thuộc tính cấp dấu vết {#trace-level-properties}

Các đặc tả dựa trên dấu vết mô tả các hoạt động chuyển đổi một hợp đồng giữa các trạng thái khác nhau và các mối quan hệ giữa các hoạt động này. Như đã giải thích trước đó, dấu vết là các chuỗi hoạt động làm thay đổi trạng thái của một hợp đồng theo một cách cụ thể.

Cách tiếp cận này dựa trên mô hình của các hợp đồng thông minh như là các hệ thống chuyển đổi trạng thái với một số trạng thái được xác định trước (được mô tả bởi các biến trạng thái) cùng với một bộ các chuyển đổi được xác định trước (được mô tả bởi các hàm hợp đồng). Hơn nữa, một [đồ thị luồng điều khiển](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), là một biểu diễn đồ họa của luồng thực thi của một chương trình, thường được sử dụng để mô tả ngữ nghĩa hoạt động của một hợp đồng. Ở đây, mỗi dấu vết được biểu diễn như một đường đi trên đồ thị luồng điều khiển.

Chủ yếu, các đặc tả cấp dấu vết được sử dụng để suy luận về các mẫu thực thi nội bộ trong các hợp đồng thông minh. Bằng cách tạo các đặc tả cấp dấu vết, chúng ta khẳng định các đường dẫn thực thi có thể chấp nhận (tức là các chuyển đổi trạng thái) cho một hợp đồng thông minh. Sử dụng các kỹ thuật, chẳng hạn như thực thi biểu tượng, chúng ta có thể xác minh một cách hình thức rằng việc thực thi không bao giờ đi theo một đường dẫn không được xác định trong mô hình hình thức.

Hãy sử dụng một ví dụ về một hợp đồng [DAO](/dao/) có một số hàm có thể truy cập công khai để mô tả các thuộc tính cấp dấu vết. Ở đây, chúng tôi giả định hợp đồng DAO cho phép người dùng thực hiện các hoạt động sau:

- Gửi tiền

- Bỏ phiếu cho một đề xuất sau khi gửi tiền

- Yêu cầu hoàn tiền nếu họ không bỏ phiếu cho một đề xuất

Ví dụ về các thuộc tính cấp dấu vết có thể là _"những người dùng không gửi tiền không thể bỏ phiếu cho một đề xuất"_ hoặc _"những người dùng không bỏ phiếu cho một đề xuất phải luôn có thể yêu cầu hoàn tiền"_. Cả hai thuộc tính đều khẳng định các chuỗi thực thi ưu tiên (việc bỏ phiếu không thể xảy ra _trước khi_ gửi tiền và việc yêu cầu hoàn tiền không thể xảy ra _sau khi_ bỏ phiếu cho một đề xuất).

## Các kỹ thuật xác minh hình thức của hợp đồng thông minh {#formal-verification-techniques}

### Kiểm tra mô hình {#model-checking}

Kiểm tra mô hình là một kỹ thuật xác minh hình thức trong đó một thuật toán kiểm tra một mô hình hình thức của một hợp đồng thông minh so với đặc tả của nó. Trong việc kiểm tra mô hình, các hợp đồng thông minh thường được biểu diễn dưới dạng các hệ thống chuyển đổi trạng thái, trong khi các thuộc tính về các trạng thái hợp đồng được phép được xác định bằng logic thời gian.

Việc kiểm tra mô hình đòi hỏi phải tạo ra một biểu diễn toán học trừu tượng của một hệ thống (tức là một hợp đồng) và thể hiện các thuộc tính của hệ thống này bằng các công thức bắt nguồn từ [logic mệnh đề](https://www.baeldung.com/cs/propositional-logic). Điều này đơn giản hóa nhiệm vụ của thuật toán kiểm tra mô hình, cụ thể là chứng minh rằng một mô hình toán học thỏa mãn một công thức logic đã cho.

Việc kiểm tra mô hình trong xác minh hình thức chủ yếu được sử dụng để đánh giá các thuộc tính thời gian mô tả hành vi của một hợp đồng theo thời gian. Các thuộc tính thời gian cho các hợp đồng thông minh bao gồm _an toàn_ và _tính sống động_, mà chúng tôi đã giải thích trước đó.

Ví dụ, một thuộc tính bảo mật liên quan đến kiểm soát truy cập (ví dụ: _Chỉ chủ sở hữu của hợp đồng mới có thể gọi `selfdestruct`_) có thể được viết bằng logic hình thức. Sau đó, thuật toán kiểm tra mô hình có thể xác minh xem hợp đồng có thỏa mãn đặc tả hình thức này không.

Việc kiểm tra mô hình sử dụng kỹ thuật khám phá không gian trạng thái, bao gồm việc xây dựng tất cả các trạng thái có thể có của một hợp đồng thông minh và cố gắng tìm các trạng thái có thể đạt được dẫn đến vi phạm thuộc tính. Tuy nhiên, điều này có thể dẫn đến một số lượng trạng thái vô hạn (được gọi là "vấn đề bùng nổ trạng thái"), do đó các trình kiểm tra mô hình dựa vào các kỹ thuật trừu tượng để có thể phân tích hiệu quả các hợp đồng thông minh.

### Chứng minh định lý {#theorem-proving}

Chứng minh định lý là một phương pháp suy luận toán học về tính đúng đắn của các chương trình, bao gồm cả các hợp đồng thông minh. Nó bao gồm việc chuyển đổi mô hình của hệ thống hợp đồng và các đặc tả của nó thành các công thức toán học (các câu lệnh logic).

Mục tiêu của việc chứng minh định lý là xác minh sự tương đương logic giữa các câu lệnh này. “Tương đương logic” (còn gọi là “song suy luận logic”) là một loại mối quan hệ giữa hai câu lệnh sao cho câu lệnh đầu tiên là đúng _khi và chỉ khi_ câu lệnh thứ hai là đúng.

Mối quan hệ cần thiết (tương đương logic) giữa các câu lệnh về mô hình của một hợp đồng và thuộc tính của nó được xây dựng như một câu lệnh có thể chứng minh được (gọi là một định lý). Sử dụng một hệ thống suy luận hình thức, trình chứng minh định lý tự động có thể xác minh tính hợp lệ của định lý. Nói cách khác, một trình chứng minh định lý có thể chứng minh một cách kết luận rằng mô hình của một hợp đồng thông minh khớp chính xác với các đặc tả của nó.

Trong khi việc kiểm tra mô hình mô hình hóa các hợp đồng như các hệ thống chuyển đổi với các trạng thái hữu hạn, việc chứng minh định lý có thể xử lý việc phân tích các hệ thống trạng thái vô hạn. Tuy nhiên, điều này có nghĩa là một trình chứng minh định lý tự động không phải lúc nào cũng có thể biết liệu một vấn đề logic có "quyết định được" hay không.

Do đó, thường cần có sự trợ giúp của con người để hướng dẫn trình chứng minh định lý trong việc suy ra các bằng chứng về tính đúng đắn. Việc sử dụng nỗ lực của con người trong việc chứng minh định lý làm cho nó tốn kém hơn so với việc kiểm tra mô hình, vốn được tự động hóa hoàn toàn.

### Thực thi biểu tượng {#symbolic-execution}

Thực thi biểu tượng là một phương pháp phân tích một hợp đồng thông minh bằng cách thực thi các hàm sử dụng _giá trị biểu tượng_ (ví dụ: `x > 5`) thay vì _giá trị cụ thể_ (ví dụ: `x == 5`). Là một kỹ thuật xác minh hình thức, thực thi biểu tượng được sử dụng để suy luận hình thức về các thuộc tính cấp dấu vết trong mã của một hợp đồng.

Thực thi biểu tượng biểu diễn một dấu vết thực thi dưới dạng một công thức toán học trên các giá trị đầu vào biểu tượng, còn được gọi là _vị từ đường dẫn_. Một [trình giải SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) được sử dụng để kiểm tra xem một vị từ đường dẫn có "thỏa mãn được" hay không (tức là có tồn tại một giá trị có thể thỏa mãn công thức). Nếu một đường dẫn dễ bị tổn thương có thể thỏa mãn được, trình giải SMT sẽ tạo ra một giá trị cụ thể kích hoạt việc điều khiển thực thi đến đường dẫn đó.

Giả sử một hàm của hợp đồng thông minh nhận đầu vào là một giá trị `uint` (`x`) và hoàn nguyên khi `x` lớn hơn `5` và cũng nhỏ hơn `10`. Việc tìm một giá trị cho `x` gây ra lỗi bằng quy trình kiểm thử thông thường sẽ đòi hỏi phải chạy qua hàng chục trường hợp kiểm thử (hoặc nhiều hơn) mà không có sự đảm bảo thực sự tìm thấy một đầu vào gây lỗi.

Ngược lại, một công cụ thực thi biểu tượng sẽ thực thi hàm với giá trị biểu tượng: `X > 5 ∧ X < 10` (tức là `x` lớn hơn 5 VÀ `x` nhỏ hơn 10). Vị từ đường dẫn liên quan `x = X > 5 ∧ X < 10` sau đó sẽ được đưa cho một trình giải SMT để giải quyết. Nếu một giá trị cụ thể thỏa mãn công thức `x = X > 5 ∧ X < 10`, trình giải SMT sẽ tính toán nó—ví dụ, trình giải có thể tạo ra `7` làm giá trị cho `x`.

Bởi vì thực thi biểu tượng dựa trên các đầu vào của một chương trình, và tập hợp các đầu vào để khám phá tất cả các trạng thái có thể đạt được có khả năng là vô hạn, nó vẫn là một hình thức kiểm thử. Tuy nhiên, như được hiển thị trong ví dụ, thực thi biểu tượng hiệu quả hơn so với kiểm thử thông thường để tìm các đầu vào gây ra vi phạm thuộc tính.

Hơn nữa, thực thi biểu tượng tạo ra ít kết quả dương tính giả hơn so với các kỹ thuật dựa trên thuộc tính khác (ví dụ: fuzzing) tạo ra các đầu vào ngẫu nhiên cho một hàm. Nếu một trạng thái lỗi được kích hoạt trong quá trình thực thi biểu tượng, thì có thể tạo ra một giá trị cụ thể gây ra lỗi và tái tạo vấn đề.

Thực thi biểu tượng cũng có thể cung cấp một mức độ chứng minh toán học về tính đúng đắn. Hãy xem xét ví dụ sau về một hàm hợp đồng có bảo vệ chống tràn số:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Một dấu vết thực thi dẫn đến tràn số nguyên sẽ cần thỏa mãn công thức: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Một công thức như vậy khó có thể được giải quyết, do đó nó đóng vai trò như một bằng chứng toán học rằng hàm `safe_add` không bao giờ bị tràn.

### Tại sao sử dụng xác minh hình thức cho các hợp đồng thông minh? {#benefits-of-formal-verification}

#### Nhu cầu về độ tin cậy {#need-for-reliability}

Xác minh hình thức được sử dụng để đánh giá tính đúng đắn của các hệ thống quan trọng về an toàn mà sự cố của chúng có thể gây ra những hậu quả tàn khốc, chẳng hạn như tử vong, thương tích hoặc phá sản tài chính. Các hợp đồng thông minh là các ứng dụng có giá trị cao kiểm soát lượng giá trị khổng lồ, và những lỗi đơn giản trong thiết kế có thể dẫn đến [những tổn thất không thể phục hồi cho người dùng](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Tuy nhiên, việc xác minh hình thức một hợp đồng trước khi triển khai có thể tăng cường đảm bảo rằng nó sẽ hoạt động như mong đợi một khi chạy trên chuỗi khối.

Độ tin cậy là một chất lượng rất được mong đợi trong bất kỳ hợp đồng thông minh nào, đặc biệt là vì mã được triển khai trong Máy ảo Ethereum (EVM) thường là bất biến. Với việc nâng cấp sau khi ra mắt không dễ dàng tiếp cận, nhu cầu đảm bảo độ tin cậy của các hợp đồng làm cho việc xác minh hình thức trở nên cần thiết. Xác minh hình thức có thể phát hiện các vấn đề phức tạp, chẳng hạn như tràn số nguyên và thiếu số, tái hòa nhập và tối ưu hóa Gas kém, mà có thể bị các kiểm toán viên và người kiểm thử bỏ qua.

#### Chứng minh tính đúng đắn về chức năng {#prove-functional-correctness}

Kiểm thử chương trình là phương pháp phổ biến nhất để chứng minh rằng một hợp đồng thông minh thỏa mãn một số yêu cầu. Điều này bao gồm việc thực thi một hợp đồng với một mẫu dữ liệu mà nó dự kiến sẽ xử lý và phân tích hành vi của nó. Nếu hợp đồng trả về các kết quả mong đợi cho dữ liệu mẫu, thì các nhà phát triển có bằng chứng khách quan về tính đúng đắn của nó.

Tuy nhiên, cách tiếp cận này không thể chứng minh việc thực thi đúng cho các giá trị đầu vào không phải là một phần của mẫu. Do đó, việc kiểm thử một hợp đồng có thể giúp phát hiện lỗi (tức là, nếu một số đường dẫn mã không trả về kết quả mong muốn trong quá trình thực thi), nhưng **nó không thể chứng minh một cách kết luận sự vắng mặt của lỗi**.

Ngược lại, xác minh hình thức có thể chứng minh một cách hình thức rằng một hợp đồng thông minh thỏa mãn các yêu cầu cho một phạm vi vô hạn các lần thực thi _mà không_ cần chạy hợp đồng. Điều này đòi hỏi phải tạo ra một đặc tả hình thức mô tả chính xác các hành vi đúng của hợp đồng và phát triển một mô hình hình thức (toán học) của hệ thống hợp đồng. Sau đó, chúng ta có thể theo một quy trình chứng minh hình thức để kiểm tra tính liên tục giữa mô hình của hợp đồng và đặc tả của nó.

Với xác minh hình thức, câu hỏi về việc xác minh liệu logic nghiệp vụ của một hợp đồng có thỏa mãn các yêu cầu hay không là một mệnh đề toán học có thể được chứng minh hoặc bác bỏ. Bằng cách chứng minh hình thức một mệnh đề, chúng ta có thể xác minh một số lượng vô hạn các trường hợp kiểm thử với một số lượng hữu hạn các bước. Bằng cách này, xác minh hình thức có triển vọng tốt hơn trong việc chứng minh một hợp đồng là đúng về mặt chức năng đối với một đặc tả.

#### Các mục tiêu xác minh lý tưởng {#ideal-verification-targets}

Mục tiêu xác minh mô tả hệ thống sẽ được xác minh hình thức. Xác minh hình thức được sử dụng tốt nhất trong "các hệ thống nhúng" (các phần mềm nhỏ, đơn giản là một phần của một hệ thống lớn hơn). Chúng cũng lý tưởng cho các lĩnh vực chuyên biệt có ít quy tắc, vì điều này giúp dễ dàng sửa đổi các công cụ để xác minh các thuộc tính dành riêng cho lĩnh vực đó.

Các hợp đồng thông minh—ít nhất, ở một mức độ nào đó—đáp ứng cả hai yêu cầu. Ví dụ, kích thước nhỏ của các hợp đồng Ethereum làm cho chúng dễ dàng cho việc xác minh hình thức. Tương tự, EVM tuân theo các quy tắc đơn giản, giúp việc đặc tả và xác minh các thuộc tính ngữ nghĩa cho các chương trình chạy trong EVM trở nên dễ dàng hơn.

### Chu kỳ phát triển nhanh hơn {#faster-development-cycle}

Các kỹ thuật xác minh hình thức, chẳng hạn như kiểm tra mô hình và thực thi biểu tượng, thường hiệu quả hơn so với việc phân tích thông thường mã hợp đồng thông minh (được thực hiện trong quá trình kiểm thử hoặc kiểm toán). Điều này là do xác minh hình thức dựa trên các giá trị biểu tượng để kiểm tra các khẳng định ("điều gì sẽ xảy ra nếu người dùng cố gắng rút _n_ ether?") không giống như kiểm thử sử dụng các giá trị cụ thể ("điều gì sẽ xảy ra nếu người dùng cố gắng rút 5 ether?").

Các biến đầu vào biểu tượng có thể bao gồm nhiều lớp giá trị cụ thể, do đó các phương pháp xác minh hình thức hứa hẹn độ bao phủ mã lớn hơn trong một khung thời gian ngắn hơn. Khi được sử dụng hiệu quả, xác minh hình thức có thể đẩy nhanh chu kỳ phát triển cho các nhà phát triển.

Xác minh hình thức cũng cải thiện quy trình xây dựng các ứng dụng phi tập trung (dapps) bằng cách giảm các lỗi thiết kế tốn kém. Việc nâng cấp các hợp đồng (nếu có thể) để sửa các lỗ hổng đòi hỏi phải viết lại nhiều codebase và tốn nhiều công sức hơn cho việc phát triển. Xác minh hình thức có thể phát hiện nhiều lỗi trong các triển khai hợp đồng mà có thể bị các người kiểm thử và kiểm toán viên bỏ qua và cung cấp cơ hội lớn để khắc phục các vấn đề đó trước khi triển khai một hợp đồng.

## Nhược điểm của xác minh hình thức {#drawbacks-of-formal-verification}

### Chi phí lao động thủ công {#cost-of-manual-labor}

Xác minh hình thức, đặc biệt là xác minh bán tự động trong đó con người hướng dẫn trình chứng minh suy ra các bằng chứng về tính đúng đắn, đòi hỏi nhiều lao động thủ công. Hơn nữa, việc tạo ra đặc tả hình thức là một hoạt động phức tạp đòi hỏi trình độ kỹ năng cao.

Những yếu tố này (nỗ lực và kỹ năng) làm cho việc xác minh hình thức trở nên đòi hỏi và tốn kém hơn so với các phương pháp thông thường để đánh giá tính đúng đắn trong các hợp đồng, chẳng hạn như kiểm thử và kiểm toán. Tuy nhiên, việc trả chi phí cho một cuộc kiểm toán xác minh đầy đủ là thực tế, xét đến chi phí của các lỗi trong các triển khai hợp đồng thông minh.

### Kết quả âm tính giả {#false-negatives}

Xác minh hình thức chỉ có thể kiểm tra xem việc thực thi của hợp đồng thông minh có khớp với đặc tả hình thức hay không. Do đó, điều quan trọng là phải đảm bảo đặc tả mô tả đúng các hành vi dự kiến của một hợp đồng thông minh.

Nếu các đặc tả được viết kém, các vi phạm thuộc tính—chỉ ra các lần thực thi dễ bị tổn thương—không thể được phát hiện bởi cuộc kiểm toán xác minh hình thức. Trong trường hợp này, một nhà phát triển có thể giả định sai rằng hợp đồng không có lỗi.

### Vấn đề về hiệu suất {#performance-issues}

Xác minh hình thức gặp phải một số vấn đề về hiệu suất. Ví dụ, các vấn đề bùng nổ trạng thái và đường dẫn gặp phải trong quá trình kiểm tra mô hình và kiểm tra biểu tượng, tương ứng, có thể ảnh hưởng đến các quy trình xác minh. Ngoài ra, các công cụ xác minh hình thức thường sử dụng các trình giải SMT và các trình giải ràng buộc khác trong lớp cơ sở của chúng, và các trình giải này dựa vào các quy trình tính toán chuyên sâu.

Ngoài ra, không phải lúc nào các trình xác minh chương trình cũng có thể xác định được một thuộc tính (được mô tả dưới dạng một công thức logic) có thể được thỏa mãn hay không (vấn đề "[tính quyết định được](https://en.wikipedia.org/wiki/Decision_problem)") bởi vì một chương trình có thể không bao giờ kết thúc. Do đó, có thể không thể chứng minh một số thuộc tính cho một hợp đồng ngay cả khi nó được đặc tả tốt.

## Công cụ xác minh hình thức cho các hợp đồng thông minh Ethereum {#formal-verification-tools}

### Các ngôn ngữ đặc tả để tạo đặc tả hình thức {#specification-languages}

**Act**: __Act cho phép đặc tả các cập nhật lưu trữ, các điều kiện trước/sau và các bất biến của hợp đồng. Bộ công cụ của nó cũng có các backend chứng minh có thể chứng minh nhiều thuộc tính thông qua Coq, các trình giải SMT, hoặc hevm.__

- [GitHub](https://github.com/ethereum/act)
- [Tài liệu tham khảo](https://github.com/argotorg/act)

**Scribble** - __Scribble chuyển đổi các chú thích mã trong ngôn ngữ đặc tả Scribble thành các khẳng định cụ thể kiểm tra đặc tả.__

- [Tài liệu tham khảo](https://docs.scribble.codes/)

**Dafny** - __Dafny là một ngôn ngữ lập trình sẵn sàng cho việc xác minh, dựa vào các chú thích cấp cao để suy luận và chứng minh tính đúng đắn của mã.__

- [GitHub](https://github.com/dafny-lang/dafny)

### Các trình xác minh chương trình để kiểm tra tính đúng đắn {#program-verifiers}

**Certora Prover** - _Certora Prover là một công cụ xác minh hình thức tự động để kiểm tra tính đúng đắn của mã trong các hợp đồng thông minh. Các đặc tả được viết bằng CVL (Ngôn ngữ xác minh Certora), với các vi phạm thuộc tính được phát hiện bằng sự kết hợp giữa phân tích tĩnh và giải quyết ràng buộc._

- [Trang web](https://www.certora.com/)
- [Tài liệu tham khảo](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - __SMTChecker của Solidity là một trình kiểm tra mô hình tích hợp dựa trên SMT (Lý thuyết mô đun thỏa mãn) và giải Horn. Nó xác nhận xem mã nguồn của hợp đồng có khớp với các đặc tả trong quá trình biên dịch hay không và kiểm tra tĩnh các vi phạm về thuộc tính an toàn.__

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - __solc-verify là một phiên bản mở rộng của trình biên dịch Solidity có thể thực hiện xác minh hình thức tự động trên mã Solidity bằng cách sử dụng các chú thích và xác minh chương trình theo mô-đun.__

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - __KEVM là một ngữ nghĩa hình thức của Máy ảo Ethereum (EVM) được viết bằng khung K. KEVM có thể thực thi và có thể chứng minh một số khẳng định liên quan đến thuộc tính bằng cách sử dụng logic khả năng tiếp cận.__

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Tài liệu tham khảo](https://jellopaper.org/)

### Các khung logic để chứng minh định lý {#theorem-provers}

**Isabelle** - _Isabelle/HOL là một trợ lý chứng minh cho phép các công thức toán học được biểu diễn bằng một ngôn ngữ hình thức và cung cấp các công cụ để chứng minh các công thức đó. Ứng dụng chính là việc hình thức hóa các chứng minh toán học và đặc biệt là xác minh hình thức, bao gồm việc chứng minh tính đúng đắn của phần cứng hoặc phần mềm máy tính và chứng minh các thuộc tính của các ngôn ngữ và giao thức máy tính._

- [GitHub](https://github.com/isabelle-prover)
- [Tài liệu tham khảo](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq là một trình chứng minh định lý tương tác cho phép bạn xác định các chương trình bằng các định lý và tạo ra các bằng chứng về tính đúng đắn được kiểm tra bằng máy một cách tương tác._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Tài liệu tham khảo](https://rocq-prover.org/docs)

### Các công cụ dựa trên thực thi biểu tượng để phát hiện các mẫu dễ bị tổn thương trong các hợp đồng thông minh {#symbolic-execution-tools}

**Manticore** - __Một công cụ để phân tích mã byte EVM dựa trên thực thi biểu tượng_._

- [GitHub](https://github.com/trailofbits/manticore)
- [Tài liệu tham khảo](https://github.com/trailofbits/manticore/wiki)

**hevm** - __hevm là một công cụ thực thi biểu tượng và trình kiểm tra tương đương cho mã byte EVM.__

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Một công cụ thực thi biểu tượng để phát hiện các lỗ hổng trong các hợp đồng thông minh Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Tài liệu tham khảo](https://mythril-classic.readthedocs.io/en/develop/)

## Đọc thêm {#further-reading}

- [Cách Hoạt động của Xác minh Hình thức đối với Hợp đồng Thông minh](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Cách Xác minh Hình thức có thể Đảm bảo Hợp đồng Thông minh Không có Lỗi](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Tổng quan về các Dự án Xác minh Hình thức trong Hệ sinh thái Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Xác minh Hình thức Từ đầu đến cuối Hợp đồng Thông minh Ký gửi Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Xác minh hình thức Hợp đồng thông minh phổ biến nhất thế giới](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker và Xác minh Hình thức](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
