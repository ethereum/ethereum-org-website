---
title: "Tính chủ quan yếu"
description: "Giải thích về tính chủ quan yếu và vai trò của nó trong Bằng chứng cổ phần (PoS) Ethereum."
lang: vi
---

Tính chủ quan trong các chuỗi khối đề cập đến việc dựa vào thông tin xã hội để thống nhất về trạng thái hiện tại. Có thể có nhiều phân nhánh hợp lệ được chọn dựa trên thông tin thu thập từ các máy ngang hàng khác trên mạng lưới. Ngược lại là tính khách quan, đề cập đến các chuỗi nơi chỉ có một chuỗi hợp lệ duy nhất mà tất cả các nút nhất thiết phải đồng ý bằng cách áp dụng các quy tắc được mã hóa của chúng. Ngoài ra còn có một trạng thái thứ ba, được gọi là tính chủ quan yếu. Điều này đề cập đến một chuỗi có thể tiến triển một cách khách quan sau khi một số thông tin hạt giống ban đầu được truy xuất về mặt xã hội.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu trang này, trước tiên cần phải hiểu các nguyên tắc cơ bản của [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Tính chủ quan yếu giải quyết những vấn đề gì? {#problems-ws-solves}

Tính chủ quan vốn có trong các chuỗi khối Bằng chứng cổ phần (PoS) vì việc chọn đúng chuỗi từ nhiều phân nhánh được thực hiện bằng cách đếm các phiếu bầu lịch sử. Điều này khiến chuỗi khối gặp phải một số hướng tấn công, bao gồm các cuộc tấn công tầm xa, trong đó các nút tham gia rất sớm vào chuỗi duy trì một phân nhánh thay thế mà chúng phát hành muộn hơn nhiều để trục lợi. Ngoài ra, nếu 33% trình xác thực rút khoản đặt cọc của họ nhưng tiếp tục chứng thực và tạo khối, họ có thể tạo ra một phân nhánh thay thế xung đột với chuỗi chính tắc. Các nút mới hoặc các nút đã ngoại tuyến trong một thời gian dài có thể không biết rằng các trình xác thực tấn công này đã rút tiền của họ, vì vậy những kẻ tấn công có thể lừa họ đi theo một chuỗi không chính xác. [Ethereum](/) có thể giải quyết các hướng tấn công này bằng cách áp đặt các ràng buộc làm giảm các khía cạnh chủ quan của cơ chế—và do đó là các giả định tin cậy—xuống mức tối thiểu.

## Các điểm kiểm tra tính chủ quan yếu {#ws-checkpoints}

Tính chủ quan yếu được triển khai trong Ethereum Bằng chứng cổ phần (PoS) bằng cách sử dụng "các điểm kiểm tra tính chủ quan yếu". Đây là các gốc trạng thái mà tất cả các nút trên mạng lưới đều đồng ý là thuộc về chuỗi chính tắc. Chúng phục vụ cùng một mục đích "sự thật phổ quát" như các khối nguyên thủy, ngoại trừ việc chúng không nằm ở vị trí nguyên thủy trong chuỗi khối. Thuật toán chọn nhánh tin tưởng rằng trạng thái chuỗi khối được xác định trong điểm kiểm tra đó là chính xác và nó xác minh chuỗi một cách độc lập và khách quan từ thời điểm đó trở đi. Các điểm kiểm tra hoạt động như "giới hạn hoàn nguyên" vì các khối nằm trước các điểm kiểm tra tính chủ quan yếu không thể bị thay đổi. Điều này làm suy yếu các cuộc tấn công tầm xa đơn giản bằng cách xác định các phân nhánh tầm xa là không hợp lệ như một phần của thiết kế cơ chế. Việc đảm bảo rằng các điểm kiểm tra tính chủ quan yếu được phân tách bằng một khoảng cách nhỏ hơn khoảng thời gian rút tiền của trình xác thực sẽ đảm bảo rằng một trình xác thực phân nhánh chuỗi sẽ bị phạt cắt giảm ít nhất một lượng ngưỡng nhất định trước khi họ có thể rút khoản đặt cọc của mình và những người mới tham gia không thể bị lừa vào các phân nhánh không chính xác bởi các trình xác thực đã rút khoản đặt cọc.

## Sự khác biệt giữa các điểm kiểm tra tính chủ quan yếu và các khối đã chung cuộc {#difference-between-ws-and-finalized-blocks}

Các khối đã chung cuộc và các điểm kiểm tra tính chủ quan yếu được các nút Ethereum xử lý khác nhau. Nếu một nút nhận biết được hai khối đã chung cuộc cạnh tranh nhau, thì nó sẽ bị giằng xé giữa hai khối đó - nó không có cách nào để tự động xác định đâu là phân nhánh chính tắc. Đây là triệu chứng của một sự thất bại trong đồng thuận. Ngược lại, một nút chỉ đơn giản là từ chối bất kỳ khối nào xung đột với điểm kiểm tra tính chủ quan yếu của nó. Từ góc độ của nút, điểm kiểm tra tính chủ quan yếu đại diện cho một sự thật tuyệt đối không thể bị phá vỡ bởi kiến thức mới từ các máy ngang hàng của nó.

## Yếu đến mức nào? {#how-weak-is-weak}

Khía cạnh chủ quan của Bằng chứng cổ phần (PoS) trên Ethereum là yêu cầu về một trạng thái gần đây (điểm kiểm tra tính chủ quan yếu) từ một nguồn đáng tin cậy để đồng bộ hóa. Rủi ro nhận được một điểm kiểm tra tính chủ quan yếu tồi là rất thấp vì chúng có thể được kiểm tra đối chiếu với một số nguồn công khai độc lập như các trình khám phá khối hoặc nhiều nút. Tuy nhiên, luôn cần có một mức độ tin cậy nhất định để chạy bất kỳ ứng dụng phần mềm nào, ví dụ: tin tưởng rằng các nhà phát triển phần mềm đã tạo ra phần mềm trung thực.

Một điểm kiểm tra tính chủ quan yếu thậm chí có thể đi kèm như một phần của phần mềm máy khách. Có thể cho rằng một kẻ tấn công có thể làm hỏng điểm kiểm tra trong phần mềm và cũng có thể dễ dàng làm hỏng chính phần mềm đó. Không có con đường kinh tế tiền mã hóa thực sự nào để giải quyết vấn đề này, nhưng tác động của các nhà phát triển không đáng tin cậy được giảm thiểu trong Ethereum bằng cách có nhiều nhóm máy khách độc lập, mỗi nhóm xây dựng phần mềm tương đương bằng các ngôn ngữ khác nhau, tất cả đều có quyền lợi gắn liền với việc duy trì một chuỗi trung thực. Các trình khám phá khối cũng có thể cung cấp các điểm kiểm tra tính chủ quan yếu hoặc một cách để tham chiếu chéo các điểm kiểm tra thu được từ nơi khác với một nguồn bổ sung.

Cuối cùng, các điểm kiểm tra có thể được yêu cầu từ các nút khác; có lẽ một người dùng Ethereum khác chạy một nút đầy đủ có thể cung cấp một điểm kiểm tra mà sau đó các trình xác thực có thể xác minh dựa trên dữ liệu từ một trình khám phá khối. Nhìn chung, việc tin tưởng nhà cung cấp điểm kiểm tra tính chủ quan yếu có thể được coi là có vấn đề giống như việc tin tưởng các nhà phát triển máy khách. Mức độ tin cậy tổng thể được yêu cầu là thấp. Điều quan trọng cần lưu ý là những cân nhắc này chỉ trở nên quan trọng trong trường hợp rất khó xảy ra là phần lớn các trình xác thực âm mưu tạo ra một phân nhánh thay thế của chuỗi khối. Trong bất kỳ trường hợp nào khác, chỉ có một chuỗi Ethereum duy nhất để lựa chọn.

## Đọc thêm {#further-reading}

- [Tính chủ quan yếu trong Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Cách tôi học cách yêu thích tính chủ quan yếu](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Tính chủ quan yếu (Tài liệu Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Hướng dẫn về tính chủ quan yếu Giai đoạn 0](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Phân tích tính chủ quan yếu trong Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)