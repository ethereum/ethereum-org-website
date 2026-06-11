---
title: Cây Verkle
description: Mô tả tổng quan về cây Verkle và cách chúng sẽ được sử dụng để nâng cấp Ethereum
lang: vi
summaryPoints:
  - Khám phá cây Verkle là gì
  - Tìm hiểu lý do tại sao cây Verkle là một bản nâng cấp hữu ích cho Ethereum
---

Cây Verkle (từ ghép của "Vector commitment" (cam kết vector) và "Merkle Trees" (cây Merkle)) là một cấu trúc dữ liệu có thể được sử dụng để nâng cấp các nút [Ethereum](/) để chúng có thể ngừng lưu trữ lượng lớn dữ liệu trạng thái mà không làm mất đi khả năng xác thực các khối.

## Tính phi trạng thái {#statelessness}

Cây Verkle là một bước quan trọng trên con đường hướng tới các máy khách Ethereum phi trạng thái. Máy khách phi trạng thái là những máy khách không cần phải lưu trữ toàn bộ cơ sở dữ liệu trạng thái để xác thực các khối đến. Thay vì sử dụng bản sao trạng thái Ethereum cục bộ của riêng mình để xác minh các khối, các máy khách phi trạng thái sử dụng một "bằng chứng dữ liệu" cho dữ liệu trạng thái đi kèm với khối. Bằng chứng dữ liệu là một tập hợp các phần dữ liệu trạng thái riêng lẻ cần thiết để thực thi một tập hợp các giao dịch cụ thể, cùng với một bằng chứng mật mã học cho thấy bằng chứng dữ liệu thực sự là một phần của toàn bộ dữ liệu. Bằng chứng dữ liệu được sử dụng _thay cho_ cơ sở dữ liệu trạng thái. Để điều này hoạt động, các bằng chứng dữ liệu cần phải rất nhỏ, để chúng có thể được phát sóng an toàn trên mạng lưới kịp thời cho các trình xác thực xử lý chúng trong một khe 12 giây. Cấu trúc dữ liệu trạng thái hiện tại không phù hợp vì các bằng chứng dữ liệu quá lớn. Cây Verkle giải quyết vấn đề này bằng cách cho phép các bằng chứng dữ liệu nhỏ, loại bỏ một trong những rào cản chính đối với các máy khách phi trạng thái.

<ExpandableCard title="Tại sao chúng ta muốn có máy khách phi trạng thái?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Các máy khách Ethereum hiện đang sử dụng một cấu trúc dữ liệu được gọi là Patricia Merkle Trie để lưu trữ dữ liệu trạng thái của nó. Thông tin về các tài khoản cá nhân được lưu trữ dưới dạng các lá trên trie và các cặp lá được băm lặp đi lặp lại cho đến khi chỉ còn lại một mã băm duy nhất. Mã băm cuối cùng này được gọi là "gốc" (root). Để xác minh các khối, các máy khách Ethereum thực thi tất cả các giao dịch trong một khối và cập nhật trie trạng thái cục bộ của chúng. Khối được coi là hợp lệ nếu gốc của cây cục bộ giống hệt với gốc được cung cấp bởi người đề xuất khối, bởi vì bất kỳ sự khác biệt nào trong tính toán được thực hiện bởi người đề xuất khối và nút xác thực sẽ khiến mã băm gốc hoàn toàn khác biệt. Vấn đề với điều này là việc xác minh Chuỗi khối yêu cầu mỗi máy khách phải lưu trữ toàn bộ trie trạng thái cho khối đầu (head block) và một số khối lịch sử (mặc định trong Geth là giữ dữ liệu trạng thái cho 128 khối phía sau khối đầu). Điều này đòi hỏi các máy khách phải có quyền truy cập vào một lượng lớn dung lượng ổ đĩa, đây là một rào cản đối với việc chạy các nút đầy đủ trên phần cứng giá rẻ, công suất thấp. Một giải pháp cho vấn đề này là cập nhật trie trạng thái thành một cấu trúc hiệu quả hơn (cây Verkle) có thể được tóm tắt bằng cách sử dụng một "bằng chứng dữ liệu" nhỏ cho dữ liệu có thể được chia sẻ thay vì toàn bộ dữ liệu trạng thái. Việc định dạng lại dữ liệu trạng thái thành cây Verkle là một bước đệm để chuyển sang các máy khách phi trạng thái.

</ExpandableCard>

## Bằng chứng dữ liệu là gì và tại sao chúng ta cần chúng? {#what-is-a-witness}

Xác minh một khối có nghĩa là thực thi lại các giao dịch có trong khối, áp dụng các thay đổi cho trie trạng thái của Ethereum và tính toán mã băm gốc mới. Một khối đã được xác minh là khối có mã băm gốc trạng thái được tính toán giống với mã băm được cung cấp cùng với khối (bởi vì điều này có nghĩa là người đề xuất khối thực sự đã thực hiện phép tính mà họ nói rằng họ đã làm). Trong các máy khách Ethereum ngày nay, việc cập nhật trạng thái yêu cầu quyền truy cập vào toàn bộ trie trạng thái, đây là một cấu trúc dữ liệu lớn phải được lưu trữ cục bộ. Một bằng chứng dữ liệu chỉ chứa các đoạn dữ liệu trạng thái cần thiết để thực thi các giao dịch trong khối. Sau đó, một trình xác thực chỉ có thể sử dụng các đoạn đó để xác minh rằng người đề xuất khối đã thực thi các giao dịch của khối và cập nhật trạng thái một cách chính xác. Tuy nhiên, điều này có nghĩa là bằng chứng dữ liệu cần được truyền giữa các bên ngang hàng trên mạng lưới Ethereum đủ nhanh để được nhận và xử lý bởi mỗi nút một cách an toàn trong một khe 12 giây. Nếu bằng chứng dữ liệu quá lớn, có thể mất quá nhiều thời gian để một số nút tải xuống và theo kịp Chuỗi. Đây là một lực lượng tập trung hóa vì nó có nghĩa là chỉ những nút có kết nối internet nhanh mới có thể tham gia xác thực các khối. Với cây Verkle, không cần phải lưu trữ trạng thái trên ổ cứng của bạn; _mọi thứ_ bạn cần để xác minh một khối đều được chứa trong chính khối đó. Thật không may, các bằng chứng dữ liệu có thể được tạo ra từ các trie Merkle quá lớn để hỗ trợ các máy khách phi trạng thái.

## Tại sao cây Verkle cho phép các bằng chứng dữ liệu nhỏ hơn? {#why-do-verkle-trees-enable-smaller-witnesses}

Cấu trúc của một Merkle Trie làm cho kích thước bằng chứng dữ liệu rất lớn - quá lớn để phát sóng an toàn giữa các bên ngang hàng trong một khe 12 giây. Điều này là do bằng chứng dữ liệu là một đường dẫn kết nối dữ liệu, được giữ trong các lá, với mã băm gốc. Để xác minh dữ liệu, cần phải có không chỉ tất cả các mã băm trung gian kết nối mỗi lá với gốc, mà còn tất cả các nút "anh em" (sibling). Mỗi nút trong bằng chứng có một nút anh em mà nó được băm cùng để tạo ra mã băm tiếp theo trên trie. Đây là một lượng dữ liệu rất lớn. Cây Verkle giảm kích thước bằng chứng dữ liệu bằng cách rút ngắn khoảng cách giữa các lá của cây và gốc của nó, đồng thời loại bỏ nhu cầu cung cấp các nút anh em để xác minh mã băm gốc. Thậm chí còn đạt được hiệu quả không gian lớn hơn bằng cách sử dụng một lược đồ cam kết đa thức mạnh mẽ thay vì cam kết vector kiểu băm. Cam kết đa thức cho phép bằng chứng dữ liệu có kích thước cố định bất kể số lượng lá mà nó chứng minh.

Theo lược đồ cam kết đa thức, các bằng chứng dữ liệu có kích thước có thể quản lý được, có thể dễ dàng được truyền trên mạng lưới ngang hàng. Điều này cho phép các máy khách xác minh các thay đổi trạng thái trong mỗi khối với một lượng dữ liệu tối thiểu.

<ExpandableCard title="Chính xác thì cây Verkle có thể giảm kích thước bằng chứng dữ liệu bao nhiêu?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Kích thước bằng chứng dữ liệu thay đổi tùy thuộc vào số lượng lá mà nó bao gồm. Giả sử bằng chứng dữ liệu bao phủ 1000 lá, một bằng chứng dữ liệu cho một Merkle trie sẽ vào khoảng 3.5MB (giả sử trie có 7 cấp độ). Một bằng chứng dữ liệu cho cùng một dữ liệu trong một cây Verkle (giả sử cây có 4 cấp độ) sẽ vào khoảng 150 kB - **nhỏ hơn khoảng 23 lần**. Sự sụt giảm kích thước bằng chứng dữ liệu này sẽ cho phép các bằng chứng dữ liệu của máy khách phi trạng thái nhỏ ở mức chấp nhận được. Các bằng chứng dữ liệu đa thức có kích thước từ 0.128 - 1 kB tùy thuộc vào cam kết đa thức cụ thể nào được sử dụng.

</ExpandableCard>

## Cấu trúc của một cây Verkle là gì? {#what-is-the-structure-of-a-verkle-tree}

Cây Verkle là các cặp `(key,value)` trong đó các khóa là các phần tử 32 byte bao gồm một _thân_ (stem) 31 byte và một _hậu tố_ (suffix) 1 byte. Các khóa này được tổ chức thành các nút _mở rộng_ (extension) và các nút _bên trong_ (inner). Các nút mở rộng đại diện cho một thân duy nhất cho 256 nút con với các hậu tố khác nhau. Các nút bên trong cũng có 256 nút con, nhưng chúng có thể là các nút mở rộng khác. Sự khác biệt chính giữa cấu trúc cây Verkle và cây Merkle là cây Verkle phẳng hơn nhiều, nghĩa là có ít nút trung gian liên kết một lá với gốc hơn, và do đó cần ít dữ liệu hơn để tạo ra một bằng chứng.

![Diagram of a Verkle tree data structure](./verkle.png)

[Đọc thêm về cấu trúc của cây Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Tiến độ hiện tại {#current-progress}

Các mạng thử nghiệm cây Verkle đã được thiết lập và đang hoạt động, nhưng vẫn còn những bản cập nhật đáng kể chưa được giải quyết cho các máy khách cần thiết để hỗ trợ cây Verkle. Bạn có thể giúp đẩy nhanh tiến độ bằng cách triển khai các hợp đồng lên các mạng thử nghiệm hoặc chạy các máy khách mạng thử nghiệm.

[Xem Guillaume Ballet giải thích về mạng thử nghiệm Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (lưu ý rằng mạng thử nghiệm Condrieu là Bằng chứng công việc (PoW) và hiện đã được thay thế bằng mạng thử nghiệm Verkle Gen Devnet 6).

## Đọc thêm {#further-reading}

- [Cây Verkle cho tính phi trạng thái](https://verkle.info/)
- [Dankrad Feist giải thích về cây Verkle trên PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Cây Verkle cho tất cả chúng ta](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Giải phẫu một bằng chứng Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet giải thích về cây Verkle tại ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Cách cây Verkle làm cho Ethereum tinh gọn và mạnh mẽ" bởi Guillaume Ballet tại Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam nói về các máy khách phi trạng thái từ ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest giải thích về cây Verkle và tính phi trạng thái trên podcast Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin nói về cây Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist nói về cây Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Tài liệu EIP về cây Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)