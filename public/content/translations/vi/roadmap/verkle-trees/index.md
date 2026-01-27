---
title: Cây Verkle
description: Bài viết chi tiết miêu tả cây Verkle và cách chúng được dùng để nâng cấp Ethereum
lang: vi
summaryPoints:
  - Khám phá cây Verkle là gì
  - Đọc thêm tại sao cây Verkle lại là một nâng cấp hữu ích cho Ethereum
---

# Cây Verkle {#verkle-trees}

Cây Verkle (một từ ghép của "Vector commitment" và "cây Merkle") là dạng cấu trúc dữ liệu dùng để nâng cấp nút xác thực Ethereum để chúng có thể dự trữ lượng lớn dữ liệu mà không mất đi khả năng xác thực khối.

## Statelessness {#statelessness}

Cây Verkle là một bước quan trọng trên con đường Client Ethereum không trạng thái (Stateless). Client không trạng thái là những Client không cần lưu trữ toàn bộ cơ sở dữ liệu trạng thái để có thể xác thực các khối được gửi đến. Thay vì sử dụng bản sao trạng thái Ethereum cục bộ riêng để xác minh các khối, Client không trạng thái sử dụng một dữ liệu chứng minh (Witness) cho dữ liệu trạng thái đi kèm với khối. Dữ liệu chứng minh là tập hợp các phần riêng lẻ của dữ liệu trạng thái cần thiết để thực thi một tập hợp giao dịch cụ thể, cùng với một bằng chứng mật mã học cho thấy dữ liệu chứng minh đó thực sự là một phần của toàn bộ dữ liệu. Dữ liệu chứng minh được sử dụng _thay cho_ cơ sở dữ liệu trạng thái. Để điều này hoạt động, dữ liệu chứng minh cần phải rất nhỏ, để chúng có thể được phát tán an toàn trên mạng kịp thời cho các nút xác thực xử lý trong vòng 12 giây của một Slot. Cấu trúc dữ liệu trạng thái hiện tại là không phù hợp vì dữ liệu chứng minh. Cây Verkle giải quyết vấn đề này bằng cách cho phép dữ liệu chứng minh nhỏ, loại bỏ một trong những rào cản chính đối với Client không trạng thái.

<ExpandableCard title="Why do we want stateless clients?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Client Ethereum hiện tại sử dụng cấu trúc dữ liệu được biết đến là cây Merkle-Patricia để chứa dữ liệu trạng thái của nó. Thông tin về mỗi tài khoản được lưu trữ như một lá của một nhánh và một đôi lá được băm liên tục cho đến khi còn một hàm băm thôi. Kết quả băm cuối cùng này được gọi là "Rễ" (Root). Để xác thực một khối, Client Ethereum thực thi tất cả giao dịch trong một khối và nâng cấp trạng thái của nhánh cục bộ. Khối được xem là hợp lệ nếu như rễ của cây cục bộ đồng với kết quả cung cấp bởi người đề xuất khối, bởi vì nếu có bất kì những thay đổi trong tính toán bởi người đề xuất khối và xác thực khối sẽ khiến cho hàm băm rễ khác nhau hoàn toàn. Vấn đề là việc xác thực chuỗi khối này cần mỗi Client lưu trữ toàn bộ trạng thái nhánh của đầu khói và một và khối trước đó (mặc định trong Geth là giữ trạng thái của 128 khối trước đầu chuỗi). Điều này đòi hỏi Client phải có truy cập vào một lượng ổ cứng lớn, là một rào cản cho việc chạy nút toàn bộ rẻ, với phần cứng yếu. Một giải pháp cho vấn đề này là cập nhật cây trạng thái sang một cấu trúc hiệu quả hơn (cây Verkle) có thể được tóm gọn bằng một “tập dữ liệu chứng minh” nhỏ để chia sẻ thay cho toàn bộ dữ liệu trạng thái. Việc định dạng lại dữ liệu trạng thái thành một cây Verkle là bước đệm để tiến tới các Client không trạng thái.

</ExpandableCard>

## Tập dữ liệu chứng minh là gì tại sao chúng ta cần chúng? {#what-is-a-witness}

Xác minh một khối đồng nghĩa với việc thực thi lại giao dịch chứa trong khói, áp dụng để thay đổi trạng thái cây Ethereum, và tình toán hàm băm rễ mới. Một khối được xác minh là khối có giá trị băm của trạng thái rễ được tính toán trùng khớp với giá trị được cung cấp cùng với khối (bởi vì điều này có nghĩa là người đề xuất khối thật sự đã thực hiện phép tính mà họ tuyên bố). Trong Client Ethereum ngày nay, việc cập nhật trạng thái đòi hỏi truy cập cả cây trạng thái, một cấu trúc dữ liệu lớn cần được lưu trữ cục bộ. Một tập dữ liệu chứng minh chỉ chứa các phần của dữ liệu trạng thái cần thiết để thực thi các giao dịch trong khối. Một nút xác thực có thể sử dụng các phần này để xác thực rằng người đề xuất khối đã thực hiện giao dịch hkoois và cập nhật trạng thái đúng. Tuy nhiên, điều này có nghĩa là tập dữ liệu chứng minh cần được truyền giữa các bên ngang hàng trong mạng Ethereum đủ nhanh để mỗi nút nhận và xử lí kịp trong 12 giây của một Slot. Nếu trạng thái tập dữ liệu chứng minh quá lớn, nó sẽ khiến một số nút xác thực quá chậm trong việc tải và bắt kịp với chuỗi. Điều này làm tập trung hóa, bởi vì có nghĩa là những nút có kết nối internet nhanh mới có thể tham gia xác thực khối. Với cây Verkle, không cần phải lưu trữ trạng thái trên ổ cứng của bạn; _mọi thứ_ bạn cần để xác minh một khối đều được chứa trong chính khối đó. Không may là tập dữ liệu chứng minh được tạo từ cây Merkle trả lại kết quả quá lớn đẻ hỗ trợ cho Client không trạng thái.

## Tại sao cây Verkle lại cần tập dữ liệu chứng minh nhỏ hơn nữa? {#why-do-verkle-trees-enable-smaller-witnesses}

Cấu trúc của cây Merkle khiến kích thước tệp dữ liệu chứng minh trở nên rất lớn – quá lớn để có thể phát tán an toàn giữa các nút ngang hàng trong vòng 12 giây của một Slot. Điều này là bởi vì tệp dữ liệu chứng minh chính là một đường dẫn kết nối dữ liệu (nằm ở các lá) đến gốc băm. Để xác minh dữ liệu, cần phải có không chỉ tất cả các băm trung gian kết nối mỗi lá với gốc, mà còn phải có tất cả các nút “anh em”. Mỗi nút trong bằng chứng đều có một nút anh em mà nó được băm chung để tạo ra băm tiếp theo trong cây. Đây là một lượng dữ liệu rất lớn. Cây Verkle giúp giảm kích thước tệp dữ liệu chứng minh bằng cách rút ngắn khoảng cách giữa các lá của cây và gốc, đồng thời loại bỏ nhu cầu phải cung cấp các nút anh em để xác minh băm rễ. Dung lượng được tối ưu hơn nữa nhờ sử dụng cơ chế cam kết bằng đa thức (Polynomial Commitment Scheme) thay cho cam kết véc-tơ kiểu băm. Cơ chế cam kết bằng đa thức cho phép tệp dữ liệu chứng minh có thể có dung lượng cố định cho dù số lượng lá mà nó chứng minh.

Dưới cơ chế cam kết bằng đa thức, tệp dữ liệu chứng minh có dung lượng đủ để dễ dàng vận chuyển cho các mạng lưới ngang hàng. Điều này cho phép trạng thái Client thay đổi trong mỗi khối với lượng dữ liệu tối thiểu.

<ExpandableCard title="Exactly how much can Verkle trees reduce witness size?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Dung lượng của tệp dữ liệu chứng minh dựa vào số lượng lá trong đó. Giả sử tệp dữ liệu chứng minh bao gồm 1000 lá, thì một tệp dữ liệu chứng minh cho cây Merkle sẽ có dung lượng khoảng 3,5 Mb (giả sử cây có 7 tầng). Một tệp dữ liệu chứng minh cho cùng dữ liệu đó trong cây Verkle (giả sử cây có 4 tầng) sẽ vào khoảng 150 kB – **nhỏ hơn khoảng 23 lần**. Việc giảm tệp dữ liệu chứng minh cho phép Client không trạng thái có thể rất nhẹ về dung lượng. Đa thức tệp dữ liệu chứng minh có kích thước từ 0,128 - 1 kB, tùy thuộc vào loại cam kết đa thức được sử dụng.

</ExpandableCard>

## Cấu trúc của cây Verkle là gì? {#what-is-the-structure-of-a-verkle-tree}

Cây Verkle là các cặp `(khóa,giá trị)`, trong đó khóa là các phần tử 32 byte được tạo thành từ một _thân_ 31 byte và một _hậu tố_ một byte. Các khóa này được tổ chức thành các nút _mở rộng_ và các nút _trung gian_. Nút mở rộng đại diện cho một cuốn duy nhất, có 256 nút con với hậu tố khác nhau. Nút trung gian có 256 con, nhưng các nút con có thể là những nút mở rộng khác. Sự khác biệt chính giữa cấu trúc cây Verkle và cây Merkle là cây Verkle phẳng hơn nhiều, tức là có ít nút trung gian hơn nối một lá với rễ, và vì thế cần ít dữ liệu hơn để tạo bằng chứng.

![](./verkle.png)

[Đọc thêm về cấu trúc của cây Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Tiến độ hiện tại {#current-progress}

Mạng thử nghiệm cây Verkle đã đang triển khai và đang hoạt động, nhưng vẫn có những cập nhật lớn cho Client để đạt yêu cầu hỗ trợ cây Verkle. Bạn có thể giúp đẩy nhanh quá trình bằng cách triển khai các hợp đồng hoặc chạy các máy khách trên mạng thử nghiệm.

[Xem Guillaume Ballet giải thích về mạng thử nghiệm Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (lưu ý rằng mạng thử nghiệm Condrieu chạy theo cơ chế bằng chứng công việc và hiện đã được thay thế bởi mạng thử nghiệm Verkle Gen Devnet 6).

## Đọc thêm {#further-reading}

- [Cây Verkle cho tính không trạng thái](https://verkle.info/)
- [Dankrad Feist giải thích về cây Verkle trên PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Cây Verkle dành cho tất cả chúng ta](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Giải phẫu một bằng chứng Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet giải thích về cây Verkle tại ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Cách cây Verkle giúp Ethereum tinh gọn và mạnh mẽ" của Guillaume Ballet tại Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam nói về các trình khách không trạng thái tại ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest giải thích về cây Verkle và tính không trạng thái trên podcast Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin viết về cây Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist viết về cây Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Tài liệu tham khảo EIP về cây Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
