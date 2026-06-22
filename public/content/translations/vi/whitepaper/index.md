---
title: Sách trắng Ethereum
description: Một bài viết giới thiệu về Ethereum, được xuất bản vào năm 2013 trước khi ra mắt.
lang: vi
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Mặc dù đã vài năm tuổi, chúng tôi vẫn giữ nguyên bài viết gốc dưới đây vì nó tiếp tục đóng vai trò là một tài liệu tham khảo hữu ích và thể hiện chính xác về [Ethereum](/) cũng như tầm nhìn của nó._

## Nền tảng Ứng dụng phi tập trung và Hợp đồng thông minh Thế hệ tiếp theo {#a-next-generation-smart-contract-and-decentralized-application-platform}

Sự phát triển Bitcoin của Satoshi Nakamoto vào năm 2009 thường được ca ngợi là một bước phát triển mang tính bước ngoặt trong lĩnh vực tiền tệ, là ví dụ đầu tiên về một tài sản kỹ thuật số đồng thời không có tài sản đảm bảo hay "[giá trị nội tại](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" và không có tổ chức phát hành hay kiểm soát tập trung nào. Tuy nhiên, một phần khác, có thể nói là quan trọng hơn, của thử nghiệm Bitcoin chính là công nghệ chuỗi khối nền tảng như một công cụ của sự đồng thuận phân tán, và sự chú ý đang nhanh chóng bắt đầu chuyển hướng sang khía cạnh khác này của Bitcoin. Các ứng dụng thay thế thường được trích dẫn của công nghệ chuỗi khối bao gồm việc sử dụng các tài sản kỹ thuật số trên chuỗi khối để đại diện cho các loại tiền tệ và công cụ tài chính tùy chỉnh ("[colored coin](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), quyền sở hữu một thiết bị vật lý cơ sở ("[tài sản thông minh](https://en.bitcoin.it/wiki/Smart_Property)"), các tài sản không thể thay thế như tên miền ("[Namecoin](http://namecoin.org)"), cũng như các ứng dụng phức tạp hơn liên quan đến việc các tài sản kỹ thuật số được kiểm soát trực tiếp bởi một đoạn mã thực thi các quy tắc tùy ý ("[hợp đồng thông minh](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") hoặc thậm chí là các "[tổ chức tự trị phi tập trung](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO) dựa trên chuỗi khối. Những gì Ethereum dự định cung cấp là một chuỗi khối được tích hợp sẵn một ngôn ngữ lập trình Turing hoàn chỉnh và toàn diện, có thể được sử dụng để tạo ra các "hợp đồng" dùng để mã hóa các hàm chuyển đổi trạng thái tùy ý, cho phép người dùng tạo ra bất kỳ hệ thống nào được mô tả ở trên, cũng như nhiều hệ thống khác mà chúng ta chưa thể tưởng tượng ra, chỉ đơn giản bằng cách viết logic trong một vài dòng mã.

## Giới thiệu về Bitcoin và các Khái niệm Hiện có {#introduction-to-bitcoin-and-existing-concepts}

### Lịch sử {#history}

Khái niệm về tiền kỹ thuật số phi tập trung, cũng như các ứng dụng thay thế như sổ đăng ký tài sản, đã xuất hiện từ nhiều thập kỷ trước. Các giao thức tiền điện tử ẩn danh của những năm 1980 và 1990, chủ yếu dựa trên một nguyên thủy mật mã học được gọi là Chaumian blinding, đã cung cấp một loại tiền tệ có mức độ quyền riêng tư cao, nhưng các giao thức này phần lớn không thu hút được sự chú ý vì chúng phụ thuộc vào một bên trung gian tập trung. Năm 1998, [b-money](http://www.weidai.com/bmoney.txt) của Wei Dai trở thành đề xuất đầu tiên giới thiệu ý tưởng tạo ra tiền thông qua việc giải các câu đố tính toán cũng như sự đồng thuận phi tập trung, nhưng đề xuất này lại thiếu chi tiết về cách thức sự đồng thuận phi tập trung có thể thực sự được triển khai. Năm 2005, Hal Finney đã giới thiệu khái niệm về "[bằng chứng công việc có thể tái sử dụng](https://nakamotoinstitute.org/finney/rpow/)", một hệ thống sử dụng các ý tưởng từ b-money cùng với các câu đố Hashcash khó về mặt tính toán của Adam Back để tạo ra khái niệm cho một loại tiền mã hóa, nhưng một lần nữa lại không đạt được lý tưởng do phụ thuộc vào điện toán tin cậy (trusted computing) làm backend. Năm 2009, một loại tiền tệ phi tập trung lần đầu tiên được Satoshi Nakamoto triển khai trong thực tế, kết hợp các nguyên thủy đã được thiết lập để quản lý quyền sở hữu thông qua mật mã học khóa công khai với một thuật toán đồng thuận để theo dõi ai sở hữu tiền, được gọi là "bằng chứng công việc (PoW)".

Cơ chế đằng sau bằng chứng công việc (PoW) là một bước đột phá trong không gian này vì nó đồng thời giải quyết được hai vấn đề. Thứ nhất, nó cung cấp một thuật toán đồng thuận đơn giản và hiệu quả ở mức độ vừa phải, cho phép các nút trong mạng lưới cùng nhau thống nhất về một tập hợp các bản cập nhật chính tắc đối với trạng thái của sổ cái Bitcoin. Thứ hai, nó cung cấp một cơ chế cho phép tham gia tự do vào quá trình đồng thuận, giải quyết vấn đề chính trị trong việc quyết định ai có quyền ảnh hưởng đến sự đồng thuận, đồng thời ngăn chặn các cuộc tấn công sybil. Nó thực hiện điều này bằng cách thay thế một rào cản tham gia chính thức, chẳng hạn như yêu cầu phải được đăng ký như một thực thể duy nhất trong một danh sách cụ thể, bằng một rào cản kinh tế - trọng số của một nút duy nhất trong quá trình bỏ phiếu đồng thuận tỷ lệ thuận trực tiếp với sức mạnh tính toán mà nút đó mang lại. Kể từ đó, một phương pháp thay thế đã được đề xuất gọi là _bằng chứng cổ phần (PoS)_, tính toán trọng số của một nút tỷ lệ thuận với lượng tiền tệ mà nó nắm giữ chứ không phải tài nguyên tính toán; việc thảo luận về giá trị tương đối của hai phương pháp này nằm ngoài phạm vi của bài viết này nhưng cần lưu ý rằng cả hai phương pháp đều có thể được sử dụng làm xương sống của một loại tiền mã hóa.

### Bitcoin Như Một Hệ Thống Chuyển Đổi Trạng Thái {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

Từ quan điểm kỹ thuật, sổ cái của một loại tiền mã hóa như Bitcoin có thể được coi là một hệ thống chuyển đổi trạng thái, trong đó có một "trạng thái" bao gồm tình trạng sở hữu của tất cả các bitcoin hiện có và một "hàm chuyển đổi trạng thái" nhận vào một trạng thái và một giao dịch rồi xuất ra một trạng thái mới là kết quả. Ví dụ, trong một hệ thống ngân hàng tiêu chuẩn, trạng thái là một bảng cân đối kế toán, một giao dịch là một yêu cầu chuyển $X từ A sang B, và hàm chuyển đổi trạng thái sẽ giảm giá trị trong tài khoản của A đi $X và tăng giá trị trong tài khoản của B lên $X. Nếu tài khoản của A có ít hơn $X ngay từ đầu, hàm chuyển đổi trạng thái sẽ trả về một lỗi. Do đó, người ta có thể định nghĩa một cách chính thức:

```
APPLY(S,TX) -> S' or ERROR
```

Trong hệ thống ngân hàng được định nghĩa ở trên:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Nhưng:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

"Trạng thái" trong Bitcoin là tập hợp tất cả các đồng tiền (về mặt kỹ thuật là "đầu ra giao dịch chưa chi tiêu" hoặc UTXO) đã được đúc và chưa được chi tiêu, với mỗi UTXO có một mệnh giá và một chủ sở hữu (được xác định bởi một địa chỉ 20 byte về cơ bản là một khóa công khai mật mã học<sup>[fn1](#notes)</sup>). Một giao dịch chứa một hoặc nhiều đầu vào, với mỗi đầu vào chứa một tham chiếu đến một UTXO hiện có và một chữ ký mật mã học được tạo ra bởi khóa riêng tư liên kết với địa chỉ của chủ sở hữu, và một hoặc nhiều đầu ra, với mỗi đầu ra chứa một UTXO mới sẽ được thêm vào trạng thái.

Hàm chuyển đổi trạng thái `APPLY(S,TX) -> S'` có thể được định nghĩa đại khái như sau:

<ol>
  <li>
    Đối với mỗi đầu vào trong <code>TX</code>:
    <ul>
    <li>
        Nếu UTXO được tham chiếu không có trong <code>S</code>, trả về một lỗi.
    </li>
    <li>
        Nếu chữ ký được cung cấp không khớp với chủ sở hữu của UTXO, trả về một lỗi.
    </li>
    </ul>
  </li>
  <li>
    Nếu tổng mệnh giá của tất cả các UTXO đầu vào nhỏ hơn tổng mệnh giá của tất cả các UTXO đầu ra, trả về một lỗi.
  </li>
  <li>
    Trả về <code>S</code> với tất cả các UTXO đầu vào đã bị xóa và tất cả các UTXO đầu ra được thêm vào.
  </li>
</ol>

Nửa đầu của bước đầu tiên ngăn người gửi giao dịch chi tiêu những đồng tiền không tồn tại, nửa sau của bước đầu tiên ngăn người gửi giao dịch chi tiêu tiền của người khác, và bước thứ hai thực thi việc bảo toàn giá trị. Để sử dụng điều này cho việc thanh toán, giao thức diễn ra như sau. Giả sử Alice muốn gửi 11.7 BTC cho Bob. Đầu tiên, Alice sẽ tìm kiếm một tập hợp các UTXO có sẵn mà cô ấy sở hữu có tổng cộng ít nhất là 11.7 BTC. Trên thực tế, Alice sẽ không thể có chính xác 11.7 BTC; giả sử rằng mức nhỏ nhất cô ấy có thể có là 6+4+2=12. Sau đó, cô ấy tạo một giao dịch với ba đầu vào đó và hai đầu ra. Đầu ra đầu tiên sẽ là 11.7 BTC với địa chỉ của Bob là chủ sở hữu, và đầu ra thứ hai sẽ là 0.3 BTC "tiền thừa" còn lại, với chủ sở hữu chính là Alice.

### Khai thác {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Nếu chúng ta có quyền truy cập vào một dịch vụ tập trung đáng tin cậy, hệ thống này sẽ rất dễ triển khai; nó có thể được lập trình chính xác như mô tả, sử dụng ổ cứng của một máy chủ tập trung để theo dõi trạng thái. Tuy nhiên, với Bitcoin, chúng ta đang cố gắng xây dựng một hệ thống tiền tệ phi tập trung, vì vậy chúng ta sẽ cần kết hợp hệ thống giao dịch trạng thái với một hệ thống đồng thuận để đảm bảo rằng mọi người đều đồng ý về thứ tự của các giao dịch. Quá trình đồng thuận phi tập trung của Bitcoin yêu cầu các nút trong mạng lưới liên tục cố gắng tạo ra các gói giao dịch được gọi là "khối". Mạng lưới được thiết kế để tạo ra khoảng một khối mỗi mười phút, với mỗi khối chứa một dấu thời gian, một nonce, một tham chiếu đến (tức là mã băm của) khối trước đó và một danh sách tất cả các giao dịch đã diễn ra kể từ khối trước đó. Theo thời gian, điều này tạo ra một "chuỗi khối" liên tục, không ngừng phát triển, liên tục cập nhật để đại diện cho trạng thái mới nhất của sổ cái Bitcoin.

Thuật toán để kiểm tra xem một khối có hợp lệ hay không, được thể hiện trong mô hình này, như sau:

1. Kiểm tra xem khối trước đó được tham chiếu bởi khối này có tồn tại và hợp lệ hay không.
2. Kiểm tra xem dấu thời gian của khối có lớn hơn dấu thời gian của khối trước đó<sup>[fn2](#notes)</sup> và không vượt quá 2 giờ trong tương lai hay không
3. Kiểm tra xem bằng chứng công việc (PoW) trên khối có hợp lệ hay không.
4. Gọi `S[0]` là trạng thái ở cuối khối trước đó.
5. Giả sử `TX` là danh sách giao dịch của khối với `n` giao dịch. Đối với tất cả `i` trong `0...n-1`, đặt `S[i+1] = APPLY(S[i],TX[i])` Nếu bất kỳ ứng dụng nào trả về một lỗi, hãy thoát và trả về false.
6. Trả về true và đăng ký `S[n]` làm trạng thái ở cuối khối này.

Về cơ bản, mỗi giao dịch trong khối phải cung cấp một quá trình chuyển đổi trạng thái hợp lệ từ trạng thái chính tắc trước khi giao dịch được thực thi sang một trạng thái mới nào đó. Lưu ý rằng trạng thái không được mã hóa trong khối theo bất kỳ cách nào; nó hoàn toàn là một sự trừu tượng hóa để nút xác thực ghi nhớ và chỉ có thể được tính toán (một cách an toàn) cho bất kỳ khối nào bằng cách bắt đầu từ trạng thái nguyên thủy và áp dụng tuần tự mọi giao dịch trong mọi khối. Ngoài ra, lưu ý rằng thứ tự mà thợ đào đưa các giao dịch vào khối rất quan trọng; nếu có hai giao dịch A và B trong một khối sao cho B chi tiêu một UTXO do A tạo ra, thì khối sẽ hợp lệ nếu A đứng trước B nhưng sẽ không hợp lệ nếu ngược lại.

Một điều kiện hợp lệ có trong danh sách trên mà không được tìm thấy trong các hệ thống khác là yêu cầu về "bằng chứng công việc (PoW)". Điều kiện chính xác là mã băm SHA-256 kép của mỗi khối, được coi là một số 256-bit, phải nhỏ hơn một mục tiêu được điều chỉnh động, mà tại thời điểm viết bài này là khoảng 2<sup>187</sup>. Mục đích của việc này là làm cho việc tạo khối trở nên "khó khăn" về mặt tính toán, từ đó ngăn chặn những kẻ tấn công sybil làm lại toàn bộ chuỗi khối theo hướng có lợi cho chúng. Bởi vì SHA-256 được thiết kế để trở thành một hàm giả ngẫu nhiên hoàn toàn không thể đoán trước, cách duy nhất để tạo ra một khối hợp lệ chỉ đơn giản là thử và sai, liên tục tăng nonce và xem liệu mã băm mới có khớp hay không.

Ở mục tiêu hiện tại là ~2<sup>187</sup>, mạng lưới phải thực hiện trung bình ~2<sup>69</sup> lần thử trước khi tìm thấy một khối hợp lệ; nhìn chung, mục tiêu được mạng lưới hiệu chỉnh lại sau mỗi 2016 khối để trung bình một khối mới được tạo ra bởi một nút nào đó trong mạng lưới cứ sau mười phút. Để đền bù cho thợ đào vì công việc tính toán này, thợ đào của mỗi khối có quyền đưa vào một giao dịch tự thưởng cho mình 25 BTC từ hư không. Ngoài ra, nếu bất kỳ giao dịch nào có tổng mệnh giá ở đầu vào cao hơn ở đầu ra, phần chênh lệch cũng sẽ thuộc về thợ đào dưới dạng "phí giao dịch". Ngẫu nhiên, đây cũng là cơ chế duy nhất mà BTC được phát hành; trạng thái nguyên thủy hoàn toàn không chứa đồng tiền nào.

Để hiểu rõ hơn về mục đích của việc khai thác, chúng ta hãy xem xét điều gì sẽ xảy ra trong trường hợp có một kẻ tấn công độc hại. Vì mật mã học cơ bản của Bitcoin được biết đến là an toàn, kẻ tấn công sẽ nhắm mục tiêu vào một phần của hệ thống Bitcoin không được bảo vệ trực tiếp bằng mật mã học: thứ tự của các giao dịch. Chiến lược của kẻ tấn công rất đơn giản:

1. Gửi 100 BTC cho một người bán để đổi lấy một sản phẩm nào đó (tốt nhất là một hàng hóa kỹ thuật số giao nhanh)
2. Chờ giao sản phẩm
3. Tạo một giao dịch khác gửi chính 100 BTC đó cho bản thân mình
4. Cố gắng thuyết phục mạng lưới rằng giao dịch gửi cho chính mình mới là giao dịch diễn ra trước.

Khi bước (1) đã diễn ra, sau vài phút, một thợ đào nào đó sẽ đưa giao dịch vào một khối, giả sử là khối số 270000. Sau khoảng một giờ, năm khối nữa sẽ được thêm vào chuỗi sau khối đó, với mỗi khối trong số đó gián tiếp trỏ đến giao dịch và do đó "xác nhận" nó. Tại thời điểm này, người bán sẽ chấp nhận khoản thanh toán là đã chung cuộc và giao sản phẩm; vì chúng ta đang giả định đây là một hàng hóa kỹ thuật số, việc giao hàng diễn ra ngay lập tức. Bây giờ, kẻ tấn công tạo một giao dịch khác gửi 100 BTC cho chính mình. Nếu kẻ tấn công chỉ đơn giản là phát hành nó vào thực tế, giao dịch sẽ không được xử lý; các thợ đào sẽ cố gắng chạy `APPLY(S,TX)` và nhận thấy rằng `TX` tiêu thụ một UTXO không còn trong trạng thái nữa. Vì vậy, thay vào đó, kẻ tấn công tạo ra một "phân nhánh" của chuỗi khối, bắt đầu bằng việc khai thác một phiên bản khác của khối 270000 trỏ đến cùng một khối 269999 làm khối cha nhưng với giao dịch mới thay cho giao dịch cũ. Bởi vì dữ liệu khối khác nhau, điều này yêu cầu phải làm lại bằng chứng công việc (PoW). Hơn nữa, phiên bản mới của khối 270000 của kẻ tấn công có một mã băm khác, vì vậy các khối gốc từ 270001 đến 270005 không "trỏ" đến nó; do đó, chuỗi gốc và chuỗi mới của kẻ tấn công hoàn toàn tách biệt. Quy tắc là trong một phân nhánh, chuỗi khối dài nhất được coi là sự thật, và vì vậy các thợ đào hợp pháp sẽ làm việc trên chuỗi 270005 trong khi chỉ có kẻ tấn công làm việc trên chuỗi 270000. Để kẻ tấn công làm cho chuỗi khối của mình dài nhất, hắn sẽ cần có nhiều sức mạnh tính toán hơn phần còn lại của mạng lưới cộng lại để bắt kịp (do đó gọi là "cuộc tấn công 51%").

### Cây Merkle {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_Trái: chỉ cần trình bày một số lượng nhỏ các nút trong cây Merkle là đủ để đưa ra bằng chứng về tính hợp lệ của một nhánh._

_Phải: bất kỳ nỗ lực nào nhằm thay đổi bất kỳ phần nào của cây Merkle cuối cùng sẽ dẫn đến sự không nhất quán ở đâu đó trên chuỗi._

Một tính năng mở rộng quy mô quan trọng của Bitcoin là khối được lưu trữ trong một cấu trúc dữ liệu đa cấp. "Mã băm" của một khối thực chất chỉ là mã băm của tiêu đề block, một đoạn dữ liệu khoảng 200 byte chứa dấu thời gian, nonce, mã băm của khối trước đó và mã băm gốc của một cấu trúc dữ liệu được gọi là cây Merkle lưu trữ tất cả các giao dịch trong khối. Cây Merkle là một loại cây nhị phân, bao gồm một tập hợp các nút với một số lượng lớn các nút lá ở dưới cùng của cây chứa dữ liệu cơ bản, một tập hợp các nút trung gian trong đó mỗi nút là mã băm của hai nút con của nó, và cuối cùng là một nút gốc duy nhất, cũng được tạo thành từ mã băm của hai nút con của nó, đại diện cho "đỉnh" của cây. Mục đích của cây Merkle là cho phép dữ liệu trong một khối được phân phối từng phần: một nút có thể chỉ tải xuống tiêu đề của một khối từ một nguồn, phần nhỏ của cây có liên quan đến chúng từ một nguồn khác, và vẫn được đảm bảo rằng tất cả dữ liệu đều chính xác. Lý do tại sao điều này hoạt động là vì các mã băm lan truyền lên trên: nếu một người dùng độc hại cố gắng hoán đổi một giao dịch giả mạo vào dưới cùng của cây Merkle, sự thay đổi này sẽ gây ra sự thay đổi ở nút phía trên, và sau đó là sự thay đổi ở nút phía trên nữa, cuối cùng làm thay đổi gốc của cây và do đó làm thay đổi mã băm của khối, khiến giao thức ghi nhận nó như một khối hoàn toàn khác (gần như chắc chắn với một bằng chứng công việc (PoW) không hợp lệ).

Giao thức cây Merkle được cho là rất cần thiết cho sự bền vững lâu dài. Một "nút đầy đủ" trong mạng lưới Bitcoin, nút lưu trữ và xử lý toàn bộ mọi khối, chiếm khoảng 15 GB dung lượng ổ đĩa trong mạng lưới Bitcoin tính đến tháng 4 năm 2014, và đang tăng lên hơn một gigabyte mỗi tháng. Hiện tại, điều này khả thi đối với một số máy tính để bàn chứ không phải điện thoại, và sau này trong tương lai, chỉ có các doanh nghiệp và những người có sở thích mới có thể tham gia. Một giao thức được gọi là "xác minh thanh toán đơn giản hóa" (SPV) cho phép một lớp nút khác tồn tại, được gọi là "node nhẹ", tải xuống các tiêu đề block, xác minh bằng chứng công việc (PoW) trên các tiêu đề block, và sau đó chỉ tải xuống các "nhánh" liên quan đến các giao dịch có liên quan đến chúng. Điều này cho phép các node nhẹ xác định với sự đảm bảo an mật mạnh mẽ về trạng thái của bất kỳ giao dịch Bitcoin nào, và số dư hiện tại của chúng, trong khi chỉ tải xuống một phần rất nhỏ của toàn bộ chuỗi khối.

### Các Ứng dụng Chuỗi khối Thay thế {#alternative-blockchain-applications}

Ý tưởng lấy ý tưởng chuỗi khối cơ bản và áp dụng nó vào các khái niệm khác cũng có một lịch sử lâu dài. Năm 2005, Nick Szabo đã đưa ra khái niệm về "[quyền sở hữu tài sản an toàn với thẩm quyền của chủ sở hữu](https://nakamotoinstitute.org/library/secure-property-titles/)", một tài liệu mô tả cách "những tiến bộ mới trong công nghệ cơ sở dữ liệu nhân bản" sẽ cho phép một hệ thống dựa trên chuỗi khối để lưu trữ sổ đăng ký về việc ai sở hữu mảnh đất nào, tạo ra một khuôn khổ phức tạp bao gồm các khái niệm như quyền sở hữu nhà cửa, chiếm hữu bất hợp pháp và thuế đất đai kiểu George. Tuy nhiên, thật không may là không có hệ thống cơ sở dữ liệu nhân bản hiệu quả nào có sẵn vào thời điểm đó, và vì vậy giao thức này chưa bao giờ được triển khai trong thực tế. Tuy nhiên, sau năm 2009, một khi sự đồng thuận phi tập trung của Bitcoin được phát triển, một số ứng dụng thay thế đã nhanh chóng bắt đầu xuất hiện.

- **Namecoin** - được tạo ra vào năm 2010, [Namecoin](https://namecoin.org/) được mô tả tốt nhất là một cơ sở dữ liệu đăng ký tên phi tập trung. Trong các giao thức phi tập trung như Tor, Bitcoin và BitMessage, cần có một cách nào đó để xác định các tài khoản để những người khác có thể tương tác với chúng, nhưng trong tất cả các giải pháp hiện có, loại định danh duy nhất có sẵn là một mã băm giả ngẫu nhiên như `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Lý tưởng nhất là người ta muốn có thể có một tài khoản với một cái tên như "george". Tuy nhiên, vấn đề là nếu một người có thể tạo một tài khoản có tên "george" thì người khác cũng có thể sử dụng quy trình tương tự để đăng ký "george" cho chính họ và mạo danh người đó. Giải pháp duy nhất là mô hình nộp đơn trước (first-to-file), trong đó người đăng ký đầu tiên thành công và người thứ hai thất bại - một vấn đề hoàn toàn phù hợp với giao thức đồng thuận của Bitcoin. Namecoin là hệ thống đăng ký tên lâu đời nhất và thành công nhất sử dụng ý tưởng như vậy.
- **Colored coins (Tiền xu màu)** - mục đích của [colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) là đóng vai trò như một giao thức cho phép mọi người tạo ra các loại tiền kỹ thuật số của riêng họ - hoặc, trong trường hợp đơn giản quan trọng của một loại tiền tệ có một đơn vị, các token kỹ thuật số, trên chuỗi khối Bitcoin. Trong giao thức colored coins, người ta "phát hành" một loại tiền tệ mới bằng cách công khai gán một màu sắc cho một UTXO Bitcoin cụ thể, và giao thức định nghĩa đệ quy màu sắc của các UTXO khác giống với màu sắc của các đầu vào mà giao dịch tạo ra chúng đã chi tiêu (một số quy tắc đặc biệt được áp dụng trong trường hợp đầu vào có màu hỗn hợp). Điều này cho phép người dùng duy trì các ví chỉ chứa UTXO của một màu cụ thể và gửi chúng đi giống như các bitcoin thông thường, truy xuất ngược qua chuỗi khối để xác định màu sắc của bất kỳ UTXO nào mà họ nhận được.
- **Metacoins** - ý tưởng đằng sau một metacoin là có một giao thức tồn tại trên nền tảng Bitcoin, sử dụng các giao dịch Bitcoin để lưu trữ các giao dịch metacoin nhưng có một hàm chuyển đổi trạng thái khác, `APPLY'`. Bởi vì giao thức metacoin không thể ngăn chặn các giao dịch metacoin không hợp lệ xuất hiện trong chuỗi khối Bitcoin, một quy tắc được thêm vào là nếu `APPLY'(S,TX)` trả về một lỗi, giao thức sẽ mặc định là `APPLY'(S,TX) = S`. Điều này cung cấp một cơ chế dễ dàng để tạo ra một giao thức tiền mã hóa tùy ý, có khả năng với các tính năng nâng cao không thể được triển khai bên trong chính Bitcoin, nhưng với chi phí phát triển rất thấp vì sự phức tạp của việc khai thác và mạng lưới đã được xử lý bởi giao thức Bitcoin. Metacoins đã được sử dụng để triển khai một số lớp hợp đồng tài chính, đăng ký tên và sàn giao dịch phi tập trung.

Do đó, nhìn chung, có hai phương pháp để xây dựng một giao thức đồng thuận: xây dựng một mạng lưới độc lập và xây dựng một giao thức trên nền tảng Bitcoin. Phương pháp đầu tiên, mặc dù khá thành công trong trường hợp của các ứng dụng như Namecoin, nhưng lại khó triển khai; mỗi quá trình triển khai riêng lẻ cần phải khởi động một chuỗi khối độc lập, cũng như xây dựng và thử nghiệm tất cả các mã mạng lưới và chuyển đổi trạng thái cần thiết. Ngoài ra, chúng tôi dự đoán rằng tập hợp các ứng dụng cho công nghệ đồng thuận phi tập trung sẽ tuân theo phân phối luật lũy thừa (power law distribution), trong đó phần lớn các ứng dụng sẽ quá nhỏ để đảm bảo có chuỗi khối riêng của chúng, và chúng tôi lưu ý rằng có tồn tại các lớp ứng dụng phi tập trung lớn, đặc biệt là các tổ chức tự trị phi tập trung, cần tương tác với nhau.

Mặt khác, phương pháp dựa trên Bitcoin có một lỗ hổng là nó không kế thừa các tính năng xác minh thanh toán đơn giản hóa của Bitcoin. SPV hoạt động cho Bitcoin vì nó có thể sử dụng độ sâu của chuỗi khối như một đại diện cho tính hợp lệ; tại một thời điểm nào đó, khi các tổ tiên của một giao dịch lùi đủ xa về quá khứ, có thể an toàn để nói rằng chúng là một phần hợp pháp của trạng thái. Mặt khác, các siêu giao thức (meta-protocols) dựa trên chuỗi khối không thể buộc chuỗi khối không bao gồm các giao dịch không hợp lệ trong bối cảnh các giao thức của riêng chúng. Do đó, một quá trình triển khai siêu giao thức SPV hoàn toàn an toàn sẽ cần phải quét ngược toàn bộ về phần đầu của chuỗi khối Bitcoin để xác định xem các giao dịch nhất định có hợp lệ hay không. Hiện tại, tất cả các quá trình triển khai "nhẹ" của các siêu giao thức dựa trên Bitcoin đều dựa vào một máy chủ đáng tin cậy để cung cấp dữ liệu, được cho là một kết quả rất không tối ưu, đặc biệt là khi một trong những mục đích chính của tiền mã hóa là loại bỏ nhu cầu về sự tin cậy.

### Scripting {#scripting}

Ngay cả khi không có bất kỳ tiện ích mở rộng nào, giao thức Bitcoin thực sự tạo điều kiện cho một phiên bản yếu của khái niệm "hợp đồng thông minh". UTXO trong Bitcoin có thể được sở hữu không chỉ bởi một khóa công khai, mà còn bởi một kịch bản (script) phức tạp hơn được thể hiện bằng một ngôn ngữ lập trình dựa trên ngăn xếp (stack-based) đơn giản. Trong mô hình này, một giao dịch chi tiêu UTXO đó phải cung cấp dữ liệu thỏa mãn kịch bản. Thật vậy, ngay cả cơ chế sở hữu khóa công khai cơ bản cũng được triển khai thông qua một kịch bản: kịch bản lấy một chữ ký đường cong elliptic làm đầu vào, xác minh nó dựa trên giao dịch và địa chỉ sở hữu UTXO, và trả về 1 nếu việc xác minh thành công và 0 nếu ngược lại. Các kịch bản khác, phức tạp hơn, tồn tại cho nhiều trường hợp sử dụng bổ sung khác nhau. Ví dụ, người ta có thể xây dựng một kịch bản yêu cầu chữ ký từ hai trong số ba khóa riêng tư nhất định để xác thực ("đa chữ ký"), một thiết lập hữu ích cho các tài khoản công ty, tài khoản tiết kiệm an toàn và một số tình huống ký quỹ của người bán. Các kịch bản cũng có thể được sử dụng để trả tiền thưởng cho các giải pháp cho các vấn đề tính toán, và người ta thậm chí có thể xây dựng một kịch bản nói rằng "UTXO Bitcoin này là của bạn nếu bạn có thể cung cấp bằng chứng SPV rằng bạn đã gửi một giao dịch Dogecoin với mệnh giá này cho tôi", về cơ bản cho phép trao đổi tiền mã hóa chéo phi tập trung.

Tuy nhiên, ngôn ngữ kịch bản được triển khai trong Bitcoin có một số hạn chế quan trọng:

- **Thiếu tính hoàn thiện Turing (Turing-completeness)** - có nghĩa là, mặc dù có một tập hợp con lớn các phép tính mà ngôn ngữ kịch bản Bitcoin hỗ trợ, nhưng nó gần như không hỗ trợ mọi thứ. Danh mục chính bị thiếu là các vòng lặp. Điều này được thực hiện để tránh các vòng lặp vô hạn trong quá trình xác minh giao dịch; về mặt lý thuyết, đây là một trở ngại có thể vượt qua đối với các lập trình viên kịch bản, vì bất kỳ vòng lặp nào cũng có thể được mô phỏng bằng cách lặp lại mã cơ bản nhiều lần với câu lệnh if, nhưng nó dẫn đến các kịch bản rất kém hiệu quả về mặt không gian. Ví dụ, việc triển khai một thuật toán chữ ký đường cong elliptic thay thế có thể sẽ yêu cầu 256 vòng nhân lặp lại, tất cả đều được đưa riêng lẻ vào mã.
- **Mù giá trị (Value-blindness)** - không có cách nào để một kịch bản UTXO cung cấp khả năng kiểm soát chi tiết đối với số tiền có thể được rút. Ví dụ, một trường hợp sử dụng mạnh mẽ của hợp đồng nguồn cấp dữ liệu (oracle) sẽ là một hợp đồng phòng ngừa rủi ro, trong đó A và B đưa vào số BTC trị giá $1000 và sau 30 ngày, kịch bản sẽ gửi số BTC trị giá $1000 cho A và phần còn lại cho B. Điều này sẽ yêu cầu một nguồn cấp dữ liệu để xác định giá trị của 1 BTC bằng USD, nhưng ngay cả khi đó, nó vẫn là một sự cải thiện lớn về mặt tin cậy và yêu cầu cơ sở hạ tầng so với các giải pháp hoàn toàn tập trung hiện có. Tuy nhiên, vì UTXO là tất cả hoặc không có gì, cách duy nhất để đạt được điều này là thông qua một thủ thuật rất kém hiệu quả là có nhiều UTXO với các mệnh giá khác nhau (ví dụ: một UTXO có giá trị 2<sup>k</sup> cho mỗi k lên đến 30) và để nguồn cấp dữ liệu chọn UTXO nào sẽ gửi cho A và UTXO nào sẽ gửi cho B.
- **Thiếu trạng thái** - UTXO chỉ có thể được chi tiêu hoặc chưa được chi tiêu; không có cơ hội cho các hợp đồng hoặc kịch bản nhiều giai đoạn giữ bất kỳ trạng thái nội bộ nào khác ngoài điều đó. Điều này gây khó khăn cho việc tạo ra các hợp đồng quyền chọn nhiều giai đoạn, các đề nghị sàn giao dịch phi tập trung hoặc các giao thức cam kết mật mã học hai giai đoạn (cần thiết cho các khoản tiền thưởng tính toán an toàn). Nó cũng có nghĩa là UTXO chỉ có thể được sử dụng để xây dựng các hợp đồng đơn giản, dùng một lần chứ không phải các hợp đồng "có trạng thái" phức tạp hơn như các tổ chức phi tập trung, và làm cho các siêu giao thức khó triển khai. Trạng thái nhị phân kết hợp với sự mù giá trị cũng có nghĩa là một ứng dụng quan trọng khác, giới hạn rút tiền, là không thể thực hiện được.
- **Mù chuỗi khối (Blockchain-blindness)** - UTXO bị mù đối với dữ liệu chuỗi khối như nonce, dấu thời gian và mã băm của khối trước đó. Điều này hạn chế nghiêm trọng các ứng dụng trong cờ bạc và một số danh mục khác, bằng cách tước đi của ngôn ngữ kịch bản một nguồn tính ngẫu nhiên có giá trị tiềm năng.

Do đó, chúng ta thấy có ba phương pháp để xây dựng các ứng dụng tiên tiến trên nền tảng tiền mã hóa: xây dựng một chuỗi khối mới, sử dụng kịch bản trên nền tảng Bitcoin và xây dựng một siêu giao thức trên nền tảng Bitcoin. Việc xây dựng một chuỗi khối mới cho phép tự do không giới hạn trong việc xây dựng một bộ tính năng, nhưng phải trả giá bằng thời gian phát triển, nỗ lực khởi động và tính bảo mật. Sử dụng kịch bản rất dễ triển khai và chuẩn hóa, nhưng khả năng của nó rất hạn chế, và các siêu giao thức, mặc dù dễ dàng, lại gặp phải các lỗi về khả năng mở rộng. Với Ethereum, chúng tôi dự định xây dựng một khuôn khổ thay thế cung cấp những lợi ích thậm chí còn lớn hơn về sự dễ dàng trong phát triển cũng như các thuộc tính máy khách nhẹ mạnh mẽ hơn, đồng thời cho phép các ứng dụng chia sẻ một môi trường kinh tế và bảo mật chuỗi khối.

## Ethereum {#ethereum}

Ý định của Ethereum là tạo ra một giao thức thay thế để xây dựng các ứng dụng phi tập trung (dapp), cung cấp một tập hợp các sự đánh đổi khác biệt mà chúng tôi tin rằng sẽ rất hữu ích cho một lớp lớn các ứng dụng phi tập trung, với sự nhấn mạnh đặc biệt vào các tình huống mà thời gian phát triển nhanh chóng, bảo mật cho các ứng dụng nhỏ và hiếm khi được sử dụng, cùng khả năng tương tác rất hiệu quả của các ứng dụng khác nhau là những yếu tố quan trọng. Ethereum thực hiện điều này bằng cách xây dựng những gì về cơ bản là lớp nền tảng trừu tượng tối thượng: một chuỗi khối với ngôn ngữ lập trình Turing hoàn đủ (Turing-complete) được tích hợp sẵn, cho phép bất kỳ ai cũng có thể viết các hợp đồng thông minh và ứng dụng phi tập trung, nơi họ có thể tạo ra các quy tắc tùy ý của riêng mình về quyền sở hữu, định dạng giao dịch và các hàm chuyển đổi trạng thái. Một phiên bản cơ bản của Namecoin có thể được viết chỉ bằng hai dòng mã, và các giao thức khác như tiền tệ và hệ thống danh tiếng có thể được xây dựng với chưa tới hai mươi dòng. Các hợp đồng thông minh, những "chiếc hộp" mật mã học chứa giá trị và chỉ mở khóa nếu đáp ứng các điều kiện nhất định, cũng có thể được xây dựng trên nền tảng này, với sức mạnh lớn hơn nhiều so với những gì kịch bản Bitcoin (Bitcoin scripting) cung cấp nhờ vào các sức mạnh bổ sung của tính Turing hoàn đủ, nhận thức về giá trị, nhận thức về chuỗi khối và trạng thái.

### Tài khoản Ethereum {#ethereum-accounts}

Trong Ethereum, trạng thái được tạo thành từ các đối tượng gọi là "tài khoản", với mỗi tài khoản có một địa chỉ 20 byte và các quá trình chuyển đổi trạng thái là việc chuyển giao trực tiếp giá trị và thông tin giữa các tài khoản. Một tài khoản Ethereum chứa bốn trường:

- **nonce**, một bộ đếm được sử dụng để đảm bảo mỗi giao dịch chỉ có thể được xử lý một lần
- **Số dư ether** hiện tại của tài khoản
- **Mã hợp đồng** của tài khoản, nếu có
- **Lưu trữ** của tài khoản (mặc định là trống)

"Ether" là nhiên liệu tiền mã hóa nội bộ chính của Ethereum, và được sử dụng để trả phí giao dịch. Nhìn chung, có hai loại tài khoản: **tài khoản thuộc sở hữu bên ngoài** (externally owned accounts), được kiểm soát bởi các khóa riêng tư, và **tài khoản hợp đồng**, được kiểm soát bởi mã hợp đồng của chúng. Một tài khoản thuộc sở hữu bên ngoài không có mã, và người ta có thể gửi các thông điệp từ một tài khoản thuộc sở hữu bên ngoài bằng cách tạo và ký một giao dịch; trong một tài khoản hợp đồng, mỗi khi tài khoản hợp đồng nhận được một thông điệp, mã của nó sẽ kích hoạt, cho phép nó đọc và ghi vào bộ lưu trữ nội bộ, đồng thời gửi các thông điệp khác hoặc lần lượt tạo ra các hợp đồng.

Lưu ý rằng "hợp đồng" trong Ethereum không nên được xem như một thứ gì đó cần được "hoàn thành" hay "tuân thủ"; thay vào đó, chúng giống như các "tác nhân tự trị" sống bên trong môi trường thực thi của Ethereum, luôn thực thi một đoạn mã cụ thể khi bị "kích hoạt" bởi một thông điệp hoặc giao dịch, và có quyền kiểm soát trực tiếp đối với số dư ether của chính chúng cũng như kho lưu trữ khóa/giá trị (key/value store) của riêng chúng để theo dõi các biến liên tục.

### Thông điệp và Giao dịch {#messages-and-transactions}

Thuật ngữ "giao dịch" được sử dụng trong Ethereum để chỉ gói dữ liệu đã được ký, lưu trữ một thông điệp sẽ được gửi từ một tài khoản thuộc sở hữu bên ngoài. Các giao dịch chứa:

- Người nhận thông điệp
- Một chữ ký xác định người gửi
- Số lượng ether cần chuyển từ người gửi đến người nhận
- Một trường dữ liệu tùy chọn
- Một giá trị `STARTGAS`, đại diện cho số bước tính toán tối đa mà quá trình thực thi giao dịch được phép thực hiện
- Một giá trị `GASPRICE`, đại diện cho mức phí mà người gửi phải trả cho mỗi bước tính toán

Ba trường đầu tiên là các trường tiêu chuẩn được mong đợi ở bất kỳ loại tiền mã hóa nào. Trường dữ liệu mặc định không có chức năng gì, nhưng máy ảo có một mã lệnh (opcode) mà hợp đồng có thể sử dụng để truy cập dữ liệu; ví dụ về một trường hợp sử dụng, nếu một hợp đồng đang hoạt động như một dịch vụ đăng ký tên miền trên chuỗi khối, thì nó có thể muốn diễn giải dữ liệu được truyền cho nó là chứa hai "trường", trường đầu tiên là tên miền cần đăng ký và trường thứ hai là địa chỉ IP để đăng ký tên miền đó. Hợp đồng sẽ đọc các giá trị này từ dữ liệu thông điệp và đặt chúng vào bộ lưu trữ một cách thích hợp.

Các trường `STARTGAS` và `GASPRICE` rất quan trọng đối với mô hình chống từ chối dịch vụ của Ethereum. Để ngăn chặn các vòng lặp vô hạn do vô tình hoặc có chủ đích thù địch, hay các sự lãng phí tính toán khác trong mã, mỗi giao dịch được yêu cầu phải thiết lập một giới hạn về số bước tính toán của quá trình thực thi mã mà nó có thể sử dụng. Đơn vị tính toán cơ bản là "Gas"; thông thường, một bước tính toán tốn 1 Gas, nhưng một số thao tác tốn lượng Gas cao hơn vì chúng đòi hỏi nhiều tính toán hơn, hoặc làm tăng lượng dữ liệu phải được lưu trữ như một phần của trạng thái. Ngoài ra còn có một khoản phí là 5 Gas cho mỗi byte trong dữ liệu giao dịch. Ý định của hệ thống phí là yêu cầu kẻ tấn công phải trả tiền tương xứng cho mọi tài nguyên mà chúng tiêu thụ, bao gồm tính toán, băng thông và lưu trữ; do đó, bất kỳ giao dịch nào dẫn đến việc mạng lưới tiêu thụ một lượng lớn hơn bất kỳ tài nguyên nào trong số này đều phải có phí gas xấp xỉ tỷ lệ thuận với mức tăng đó.

### Thông điệp {#messages}

Các hợp đồng có khả năng gửi "thông điệp" đến các hợp đồng khác. Thông điệp là các đối tượng ảo không bao giờ được tuần tự hóa (serialized) và chỉ tồn tại trong môi trường thực thi Ethereum. Một thông điệp chứa:

- Người gửi thông điệp (ngầm định)
- Người nhận thông điệp
- Số lượng ether cần chuyển cùng với thông điệp
- Một trường dữ liệu tùy chọn
- Một giá trị `STARTGAS`

Về cơ bản, một thông điệp giống như một giao dịch, ngoại trừ việc nó được tạo ra bởi một hợp đồng chứ không phải một tác nhân bên ngoài. Một thông điệp được tạo ra khi một hợp đồng đang thực thi mã chạy mã lệnh `CALL`, mã lệnh này sẽ tạo và thực thi một thông điệp. Giống như một giao dịch, một thông điệp dẫn đến việc tài khoản người nhận chạy mã của nó. Do đó, các hợp đồng có thể có mối quan hệ với các hợp đồng khác theo cách hoàn toàn giống như các tác nhân bên ngoài.

Lưu ý rằng hạn mức Gas được chỉ định bởi một giao dịch hoặc hợp đồng áp dụng cho tổng lượng Gas được tiêu thụ bởi giao dịch đó và tất cả các quá trình thực thi phụ. Ví dụ, nếu một tác nhân bên ngoài A gửi một giao dịch đến B với 1000 Gas, và B tiêu thụ 600 Gas trước khi gửi một thông điệp đến C, và quá trình thực thi nội bộ của C tiêu thụ 300 Gas trước khi trả về, thì B có thể tiêu thêm 100 Gas nữa trước khi hết Gas.

### Hàm chuyển đổi trạng thái Ethereum {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

Hàm chuyển đổi trạng thái Ethereum, `APPLY(S,TX) -> S'` có thể được định nghĩa như sau:

1. Kiểm tra xem giao dịch có được định dạng đúng hay không (tức là có đúng số lượng giá trị), chữ ký có hợp lệ không và nonce có khớp với nonce trong tài khoản của người gửi hay không. Nếu không, trả về một lỗi.
2. Tính phí giao dịch là `STARTGAS * GASPRICE`, và xác định địa chỉ gửi từ chữ ký. Trừ khoản phí này khỏi số dư tài khoản của người gửi và tăng nonce của người gửi lên. Nếu không có đủ số dư để chi tiêu, trả về một lỗi.
3. Khởi tạo `GAS = STARTGAS`, và trừ đi một lượng Gas nhất định cho mỗi byte để trả cho các byte trong giao dịch.
4. Chuyển giá trị giao dịch từ tài khoản của người gửi sang tài khoản nhận. Nếu tài khoản nhận chưa tồn tại, hãy tạo nó. Nếu tài khoản nhận là một hợp đồng, hãy chạy mã của hợp đồng cho đến khi hoàn tất hoặc cho đến khi quá trình thực thi hết Gas.
5. Nếu việc chuyển giá trị thất bại do người gửi không có đủ tiền, hoặc quá trình thực thi mã hết Gas, hãy hoàn nguyên tất cả các thay đổi trạng thái ngoại trừ việc thanh toán các khoản phí, và thêm các khoản phí đó vào tài khoản của thợ đào.
6. Nếu không, hoàn trả phí cho tất cả lượng Gas còn lại cho người gửi, và gửi các khoản phí đã trả cho lượng Gas đã tiêu thụ cho thợ đào.

Ví dụ, giả sử rằng mã của hợp đồng là:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Lưu ý rằng trên thực tế, mã hợp đồng được viết bằng mã EVM cấp thấp; ví dụ này được viết bằng Serpent, một trong những ngôn ngữ cấp cao của chúng tôi, để cho rõ ràng, và có thể được biên dịch xuống thành mã EVM. Giả sử rằng bộ lưu trữ của hợp đồng bắt đầu ở trạng thái trống, và một giao dịch được gửi với giá trị 10 ether, 2000 Gas, giá Gas là 0.001 ether, và 64 byte dữ liệu, với các byte 0-31 đại diện cho số `2` và các byte 32-63 đại diện cho chuỗi `CHARLIE`<sup>[fn3](#notes)</sup>. Quá trình cho hàm chuyển đổi trạng thái trong trường hợp này như sau:

1. Kiểm tra xem giao dịch có hợp lệ và được định dạng đúng hay không.
2. Kiểm tra xem người gửi giao dịch có ít nhất 2000 \* 0.001 = 2 ether hay không. Nếu có, thì trừ 2 ether khỏi tài khoản của người gửi.
3. Khởi tạo Gas = 2000; giả sử giao dịch dài 170 byte và phí cho mỗi byte là 5, trừ đi 850 để còn lại 1150 Gas.
4. Trừ thêm 10 ether khỏi tài khoản của người gửi, và thêm nó vào tài khoản của hợp đồng.
5. Chạy mã. Trong trường hợp này, điều này rất đơn giản: nó kiểm tra xem bộ lưu trữ của hợp đồng tại chỉ số `2` đã được sử dụng chưa, nhận thấy rằng nó chưa được sử dụng, và do đó nó thiết lập bộ lưu trữ tại chỉ số `2` thành giá trị `CHARLIE`. Giả sử việc này tốn 187 Gas, vậy lượng Gas còn lại là 1150 - 187 = 963
6. Thêm 963 \* 0.001 = 0.963 ether trở lại tài khoản của người gửi, và trả về trạng thái kết quả.

Nếu không có hợp đồng nào ở đầu nhận của giao dịch, thì tổng phí giao dịch sẽ chỉ đơn giản bằng `GASPRICE` được cung cấp nhân với độ dài của giao dịch tính bằng byte, và dữ liệu được gửi cùng với giao dịch sẽ không liên quan.

Lưu ý rằng các thông điệp hoạt động tương đương với các giao dịch về mặt hoàn nguyên: nếu quá trình thực thi một thông điệp hết Gas, thì quá trình thực thi của thông điệp đó, và tất cả các quá trình thực thi khác được kích hoạt bởi quá trình thực thi đó, sẽ hoàn nguyên, nhưng các quá trình thực thi gốc (parent executions) không cần phải hoàn nguyên. Điều này có nghĩa là việc một hợp đồng gọi một hợp đồng khác là "an toàn", vì nếu A gọi B với G Gas thì quá trình thực thi của A được đảm bảo sẽ mất tối đa G Gas. Cuối cùng, lưu ý rằng có một mã lệnh, `CREATE`, dùng để tạo ra một hợp đồng; cơ chế thực thi của nó nhìn chung tương tự như `CALL`, với ngoại lệ là đầu ra của quá trình thực thi sẽ xác định mã của một hợp đồng mới được tạo.

### Thực thi mã {#code-execution}

Mã trong các hợp đồng Ethereum được viết bằng một ngôn ngữ mã byte (bytecode) cấp thấp, dựa trên ngăn xếp (stack-based), được gọi là "mã máy ảo Ethereum" hoặc "mã EVM". Mã bao gồm một chuỗi các byte, trong đó mỗi byte đại diện cho một thao tác. Nhìn chung, quá trình thực thi mã là một vòng lặp vô hạn bao gồm việc liên tục thực hiện thao tác tại bộ đếm chương trình hiện tại (bắt đầu từ số 0) và sau đó tăng bộ đếm chương trình lên một, cho đến khi đạt đến cuối mã hoặc phát hiện ra một lỗi hay lệnh `STOP` hoặc `RETURN`. Các thao tác có quyền truy cập vào ba loại không gian để lưu trữ dữ liệu:

- **Ngăn xếp** (stack), một vùng chứa vào-sau-ra-trước (last-in-first-out) mà các giá trị có thể được đẩy vào (push) và lấy ra (pop)
- **Bộ nhớ** (memory), một mảng byte có thể mở rộng vô hạn
- **Lưu trữ** (storage) dài hạn của hợp đồng, một kho lưu trữ khóa/giá trị. Không giống như ngăn xếp và bộ nhớ, vốn sẽ thiết lập lại sau khi quá trình tính toán kết thúc, lưu trữ tồn tại lâu dài.

Mã cũng có thể truy cập giá trị, người gửi và dữ liệu của thông điệp đến, cũng như dữ liệu tiêu đề block, và mã cũng có thể trả về một mảng byte dữ liệu dưới dạng đầu ra.

Mô hình thực thi chính thức của mã EVM đơn giản một cách đáng ngạc nhiên. Trong khi máy ảo Ethereum đang chạy, trạng thái tính toán đầy đủ của nó có thể được xác định bởi bộ giá trị (tuple) `(block_state, transaction, message, code, memory, stack, pc, gas)`, trong đó `block_state` là trạng thái toàn cục chứa tất cả các tài khoản và bao gồm số dư cũng như lưu trữ. Khi bắt đầu mỗi vòng thực thi, lệnh hiện tại được tìm thấy bằng cách lấy byte thứ `pc` của `code` (hoặc 0 nếu `pc >= len(code)`), và mỗi lệnh có định nghĩa riêng về cách nó ảnh hưởng đến bộ giá trị. Ví dụ, `ADD` lấy hai mục ra khỏi ngăn xếp và đẩy tổng của chúng vào, giảm `gas` đi 1 và tăng `pc` lên 1, và `SSTORE` lấy hai mục trên cùng ra khỏi ngăn xếp và chèn mục thứ hai vào bộ lưu trữ của hợp đồng tại chỉ số được chỉ định bởi mục đầu tiên. Mặc dù có nhiều cách để tối ưu hóa quá trình thực thi của máy ảo Ethereum thông qua biên dịch just-in-time (JIT), một bản triển khai cơ bản của Ethereum có thể được thực hiện chỉ trong vài trăm dòng mã.

### Chuỗi khối và Khai thác {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

Chuỗi khối Ethereum về nhiều mặt tương tự như chuỗi khối Bitcoin, mặc dù nó có một số điểm khác biệt. Sự khác biệt chính giữa Ethereum và Bitcoin liên quan đến kiến trúc chuỗi khối là, không giống như Bitcoin, các khối Ethereum chứa một bản sao của cả danh sách giao dịch và trạng thái gần đây nhất. Ngoài ra, hai giá trị khác là số khối và độ khó cũng được lưu trữ trong khối. Thuật toán xác thực khối cơ bản trong Ethereum như sau:

1. Kiểm tra xem khối trước đó được tham chiếu có tồn tại và hợp lệ hay không.
2. Kiểm tra xem dấu thời gian của khối có lớn hơn dấu thời gian của khối trước đó được tham chiếu và nhỏ hơn 15 phút trong tương lai hay không
3. Kiểm tra xem số khối, độ khó, gốc giao dịch (transaction root), gốc uncle (uncle root) và giới hạn gas (các khái niệm cấp thấp khác nhau dành riêng cho Ethereum) có hợp lệ hay không.
4. Kiểm tra xem bằng chứng công việc (PoW) trên khối có hợp lệ hay không.
5. Gọi `S[0]` là trạng thái ở cuối khối trước đó.
6. Gọi `TX` là danh sách giao dịch của khối, với `n` giao dịch. Đối với tất cả `i` trong `0...n-1`, thiết lập `S[i+1] = APPLY(S[i],TX[i])`. Nếu bất kỳ ứng dụng nào trả về lỗi, hoặc nếu tổng lượng Gas tiêu thụ trong khối cho đến thời điểm này vượt quá `GASLIMIT`, trả về một lỗi.
7. Gọi `S_FINAL` là `S[n]`, nhưng cộng thêm phần thưởng khối được trả cho thợ đào.
8. Kiểm tra xem gốc cây Merkle của trạng thái `S_FINAL` có bằng với gốc trạng thái cuối cùng được cung cấp trong tiêu đề block hay không. Nếu bằng, khối đó hợp lệ; nếu không, nó không hợp lệ.

Thoạt nhìn, cách tiếp cận này có vẻ rất kém hiệu quả, vì nó cần lưu trữ toàn bộ trạng thái với mỗi khối, nhưng trên thực tế, hiệu quả sẽ tương đương với Bitcoin. Lý do là trạng thái được lưu trữ trong cấu trúc cây, và sau mỗi khối, chỉ một phần nhỏ của cây cần được thay đổi. Do đó, nhìn chung, giữa hai khối liền kề, phần lớn cây sẽ giống nhau, và vì vậy dữ liệu có thể được lưu trữ một lần và tham chiếu hai lần bằng cách sử dụng các con trỏ (tức là, mã băm của các cây con). Một loại cây đặc biệt được gọi là "cây Patricia" được sử dụng để hoàn thành việc này, bao gồm một sửa đổi đối với khái niệm cây Merkle cho phép các nút được chèn và xóa, chứ không chỉ thay đổi, một cách hiệu quả. Ngoài ra, vì tất cả thông tin trạng thái là một phần của khối cuối cùng, nên không cần phải lưu trữ toàn bộ lịch sử chuỗi khối - một chiến lược mà nếu có thể áp dụng cho Bitcoin, có thể được tính toán là sẽ tiết kiệm không gian từ 5-20 lần.

Một câu hỏi thường gặp là mã hợp đồng được thực thi "ở đâu", xét về mặt phần cứng vật lý. Câu hỏi này có một câu trả lời đơn giản: quá trình thực thi mã hợp đồng là một phần trong định nghĩa của hàm chuyển đổi trạng thái, vốn là một phần của thuật toán xác thực khối, vì vậy nếu một giao dịch được thêm vào khối `B`, quá trình thực thi mã do giao dịch đó sinh ra sẽ được thực thi bởi tất cả các nút, hiện tại và trong tương lai, tải xuống và xác thực khối `B`.

## Các ứng dụng {#applications}

Nhìn chung, có ba loại ứng dụng trên nền tảng Ethereum. Loại đầu tiên là các ứng dụng tài chính, cung cấp cho người dùng những cách thức mạnh mẽ hơn để quản lý và tham gia vào các hợp đồng bằng tiền của họ. Điều này bao gồm các loại tiền tệ phụ (sub-currencies), các công cụ phái sinh tài chính, hợp đồng phòng ngừa rủi ro, ví tiết kiệm, di chúc và cuối cùng là cả một số loại hợp đồng lao động toàn diện. Loại thứ hai là các ứng dụng bán tài chính, nơi có liên quan đến tiền bạc nhưng cũng có một khía cạnh phi tiền tệ lớn đối với những gì đang được thực hiện; một ví dụ hoàn hảo là các khoản tiền thưởng tự thực thi cho các giải pháp đối với các bài toán tính toán. Cuối cùng, có những ứng dụng như bỏ phiếu trực tuyến và quản trị phi tập trung hoàn toàn không mang tính tài chính.

### Hệ thống Token {#token-systems}

Các hệ thống token trên chuỗi khối có nhiều ứng dụng, từ các loại tiền tệ phụ đại diện cho các tài sản như USD hoặc vàng cho đến cổ phiếu công ty, các token cá nhân đại diện cho tài sản thông minh, các phiếu giảm giá an toàn không thể làm giả, và thậm chí cả các hệ thống token hoàn toàn không gắn liền với giá trị thông thường, được sử dụng như hệ thống điểm để tạo động lực. Các hệ thống token cực kỳ dễ triển khai trên Ethereum. Điểm mấu chốt cần hiểu là về cơ bản, tất cả những gì cấu thành nên một loại tiền tệ hoặc hệ thống token chỉ là một cơ sở dữ liệu với một thao tác: trừ X đơn vị từ A và cấp X đơn vị cho B, với điều kiện là (i) A có ít nhất X đơn vị trước giao dịch và (2) giao dịch được A chấp thuận. Tất cả những gì cần thiết để triển khai một hệ thống token là đưa logic này vào một hợp đồng.

Mã cơ bản để triển khai một hệ thống token bằng Serpent trông như sau:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Đây về cơ bản là một bản triển khai theo nghĩa đen của hàm chuyển đổi trạng thái "hệ thống ngân hàng" đã được mô tả ở phần trước trong tài liệu này. Cần thêm một vài dòng mã để cung cấp cho bước ban đầu là phân phối các đơn vị tiền tệ ngay từ đầu và một vài trường hợp ngoại lệ khác, và lý tưởng nhất là một hàm sẽ được thêm vào để cho phép các hợp đồng khác truy vấn số dư của một địa chỉ. Nhưng tất cả chỉ có vậy. Về mặt lý thuyết, các hệ thống token dựa trên Ethereum hoạt động như các loại tiền tệ phụ có khả năng bao gồm một tính năng quan trọng khác mà các siêu tiền tệ (meta-currencies) dựa trên Bitcoin trên chuỗi còn thiếu: khả năng thanh toán phí giao dịch trực tiếp bằng loại tiền tệ đó. Cách thức triển khai điều này là hợp đồng sẽ duy trì một số dư ether để hoàn trả ether đã dùng để trả phí cho người gửi, và nó sẽ nạp lại số dư này bằng cách thu thập các đơn vị tiền tệ nội bộ mà nó thu được từ phí và bán lại chúng trong một cuộc đấu giá diễn ra liên tục. Do đó, người dùng sẽ cần "kích hoạt" tài khoản của họ bằng ether, nhưng một khi đã có ether ở đó, nó sẽ có thể tái sử dụng vì hợp đồng sẽ hoàn trả lại mỗi lần.

### Các công cụ phái sinh tài chính và Tiền tệ có giá trị ổn định {#financial-derivatives-and-stable-value-currencies}

Các công cụ phái sinh tài chính là ứng dụng phổ biến nhất của một "hợp đồng thông minh", và là một trong những ứng dụng đơn giản nhất để triển khai bằng mã. Thách thức chính trong việc triển khai các hợp đồng tài chính là phần lớn chúng yêu cầu tham chiếu đến một mã giá bên ngoài; ví dụ, một ứng dụng rất đáng mong đợi là một hợp đồng thông minh phòng ngừa sự biến động của ether (hoặc một loại tiền mã hóa khác) so với đồng đô la Mỹ, nhưng để làm được điều này đòi hỏi hợp đồng phải biết giá trị của ETH/USD là bao nhiêu. Cách đơn giản nhất để làm điều này là thông qua một hợp đồng "nguồn cấp dữ liệu" được duy trì bởi một bên cụ thể (ví dụ: NASDAQ) được thiết kế sao cho bên đó có khả năng cập nhật hợp đồng khi cần, và cung cấp một giao diện cho phép các hợp đồng khác gửi một thông điệp đến hợp đồng đó và nhận lại phản hồi cung cấp mức giá.

Với thành phần quan trọng đó, hợp đồng phòng ngừa rủi ro sẽ trông như sau:

1. Đợi bên A nạp vào 1000 ether.
2. Đợi bên B nạp vào 1000 ether.
3. Ghi lại giá trị USD của 1000 ether, được tính toán bằng cách truy vấn hợp đồng nguồn cấp dữ liệu, vào bộ nhớ lưu trữ, giả sử đây là $x.
4. Sau 30 ngày, cho phép A hoặc B "kích hoạt lại" hợp đồng để gửi số ether trị giá $x (được tính toán bằng cách truy vấn lại hợp đồng nguồn cấp dữ liệu để lấy giá mới) cho A và phần còn lại cho B.

Một hợp đồng như vậy sẽ có tiềm năng đáng kể trong thương mại tiền mã hóa. Một trong những vấn đề chính được nhắc đến về tiền mã hóa là thực tế nó rất dễ biến động; mặc dù nhiều người dùng và người bán có thể muốn sự an toàn và tiện lợi khi giao dịch bằng tài sản mật mã học, họ có thể không muốn đối mặt với viễn cảnh mất 23% giá trị quỹ của mình chỉ trong một ngày. Cho đến nay, giải pháp được đề xuất phổ biến nhất là các tài sản được hỗ trợ bởi tổ chức phát hành; ý tưởng là một tổ chức phát hành tạo ra một loại tiền tệ phụ mà trong đó họ có quyền phát hành và thu hồi các đơn vị, và cung cấp một đơn vị tiền tệ cho bất kỳ ai cung cấp cho họ (ngoại tuyến) một đơn vị của một tài sản cơ sở được chỉ định (ví dụ: vàng, USD). Tổ chức phát hành sau đó hứa sẽ cung cấp một đơn vị tài sản cơ sở cho bất kỳ ai gửi lại một đơn vị tài sản tiền mã hóa. Cơ chế này cho phép bất kỳ tài sản phi mật mã học nào được "nâng cấp" thành một tài sản mật mã học, với điều kiện là tổ chức phát hành có thể được tin tưởng.

Tuy nhiên, trên thực tế, các tổ chức phát hành không phải lúc nào cũng đáng tin cậy, và trong một số trường hợp, cơ sở hạ tầng ngân hàng quá yếu kém, hoặc quá thù địch, để các dịch vụ như vậy có thể tồn tại. Các công cụ phái sinh tài chính cung cấp một giải pháp thay thế. Ở đây, thay vì một tổ chức phát hành duy nhất cung cấp tiền để hỗ trợ một tài sản, một thị trường phi tập trung gồm các nhà đầu cơ, đặt cược rằng giá của một tài sản tham chiếu mật mã học (ví dụ: ETH) sẽ tăng lên, sẽ đóng vai trò đó. Không giống như các tổ chức phát hành, các nhà đầu cơ không có lựa chọn nào để vỡ nợ đối với phần thỏa thuận của họ vì hợp đồng phòng ngừa rủi ro giữ tiền của họ trong tài khoản ký quỹ. Lưu ý rằng cách tiếp cận này không hoàn toàn phi tập trung, bởi vì vẫn cần một nguồn đáng tin cậy để cung cấp mã giá, mặc dù có thể cho rằng đây vẫn là một sự cải thiện lớn về mặt giảm thiểu các yêu cầu cơ sở hạ tầng (không giống như việc trở thành một tổ chức phát hành, việc phát hành một nguồn cấp giá không yêu cầu giấy phép và có khả năng được phân loại là quyền tự do ngôn luận) và giảm thiểu khả năng gian lận.

### Hệ thống Danh tính và Danh tiếng {#identity-and-reputation-systems}

Loại tiền mã hóa thay thế sớm nhất trong tất cả, [Namecoin](http://namecoin.org/), đã cố gắng sử dụng một chuỗi khối giống Bitcoin để cung cấp một hệ thống đăng ký tên, nơi người dùng có thể đăng ký tên của họ trong một cơ sở dữ liệu công khai cùng với các dữ liệu khác. Trường hợp sử dụng chính được trích dẫn là cho một hệ thống [DNS](https://wikipedia.org/wiki/Domain_Name_System), ánh xạ các tên miền như "bitcoin.org" (hoặc, trong trường hợp của Namecoin là "bitcoin.bit") tới một địa chỉ IP. Các trường hợp sử dụng khác bao gồm xác thực email và có khả năng là các hệ thống danh tiếng tiên tiến hơn. Dưới đây là hợp đồng cơ bản để cung cấp một hệ thống đăng ký tên giống Namecoin trên Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Hợp đồng này rất đơn giản; tất cả chỉ là một cơ sở dữ liệu bên trong mạng lưới Ethereum có thể được thêm vào, nhưng không thể sửa đổi hoặc xóa bỏ. Bất kỳ ai cũng có thể đăng ký một cái tên với một giá trị nào đó, và đăng ký đó sau đó sẽ tồn tại mãi mãi. Một hợp đồng đăng ký tên phức tạp hơn cũng sẽ có một "mệnh đề hàm" cho phép các hợp đồng khác truy vấn nó, cũng như một cơ chế để "chủ sở hữu" (tức là người đăng ký đầu tiên) của một cái tên thay đổi dữ liệu hoặc chuyển quyền sở hữu. Người ta thậm chí có thể thêm chức năng danh tiếng và mạng lưới niềm tin (web-of-trust) lên trên đó.

### Lưu trữ Tệp Phi tập trung {#decentralized-file-storage}

Trong vài năm qua, đã xuất hiện một số công ty khởi nghiệp lưu trữ tệp trực tuyến phổ biến, nổi bật nhất là Dropbox, tìm cách cho phép người dùng tải lên bản sao lưu ổ cứng của họ và để dịch vụ lưu trữ bản sao lưu đó cũng như cho phép người dùng truy cập nó để đổi lấy một khoản phí hàng tháng. Tuy nhiên, tại thời điểm này, thị trường lưu trữ tệp đôi khi tương đối kém hiệu quả; một cái nhìn lướt qua các giải pháp hiện có khác nhau cho thấy rằng, đặc biệt là ở mức "thung lũng kỳ lạ" 20-200 GB mà tại đó cả hạn ngạch miễn phí lẫn chiết khấu cấp doanh nghiệp đều không được áp dụng, giá hàng tháng cho chi phí lưu trữ tệp chính thống cao đến mức bạn đang phải trả nhiều hơn chi phí của toàn bộ ổ cứng chỉ trong một tháng. Các hợp đồng Ethereum có thể cho phép phát triển một hệ sinh thái lưu trữ tệp phi tập trung, nơi người dùng cá nhân có thể kiếm được một lượng tiền nhỏ bằng cách cho thuê ổ cứng của chính họ và không gian chưa sử dụng có thể được dùng để tiếp tục giảm chi phí lưu trữ tệp.

Thành phần nền tảng chính của một thiết bị như vậy sẽ là thứ mà chúng tôi gọi là "hợp đồng Dropbox phi tập trung". Hợp đồng này hoạt động như sau. Đầu tiên, người ta chia nhỏ dữ liệu mong muốn thành các khối, mã hóa từng khối để đảm bảo quyền riêng tư, và xây dựng một cây Merkle từ đó. Sau đó, người ta tạo một hợp đồng với quy tắc là, cứ mỗi N khối, hợp đồng sẽ chọn một chỉ số ngẫu nhiên trong cây Merkle (sử dụng mã băm khối trước đó, có thể truy cập từ mã hợp đồng, làm nguồn cho tính ngẫu nhiên), và trao X ether cho thực thể đầu tiên cung cấp một giao dịch với bằng chứng quyền sở hữu giống như xác minh thanh toán đơn giản hóa của khối tại chỉ số cụ thể đó trong cây. Khi người dùng muốn tải lại tệp của họ, họ có thể sử dụng giao thức kênh vi thanh toán (ví dụ: trả 1 szabo cho mỗi 32 kilobyte) để khôi phục tệp; cách tiếp cận hiệu quả nhất về phí là người trả tiền không công bố giao dịch cho đến phút cuối, thay vào đó thay thế giao dịch bằng một giao dịch sinh lời hơn một chút với cùng một nonce sau mỗi 32 kilobyte.

Một tính năng quan trọng của giao thức là, mặc dù có vẻ như người ta đang tin tưởng nhiều nút ngẫu nhiên sẽ không quyết định quên tệp, người ta có thể giảm rủi ro đó xuống gần bằng không bằng cách chia tệp thành nhiều mảnh thông qua chia sẻ bí mật, và theo dõi các hợp đồng để xem mỗi mảnh vẫn đang thuộc quyền sở hữu của một nút nào đó. Nếu một hợp đồng vẫn đang chi trả tiền, điều đó cung cấp một bằng chứng mật mã học rằng ai đó ngoài kia vẫn đang lưu trữ tệp.

### Các Tổ chức Tự trị Phi tập trung {#decentralized-autonomous-organizations}

Khái niệm chung về một "tổ chức tự trị phi tập trung" là một thực thể ảo có một tập hợp các thành viên hoặc cổ đông nhất định, những người mà, có lẽ với đa số 67%, có quyền chi tiêu quỹ của thực thể và sửa đổi mã của nó. Các thành viên sẽ cùng nhau quyết định cách tổ chức nên phân bổ quỹ của mình. Các phương pháp phân bổ quỹ của một DAO có thể bao gồm từ tiền thưởng, tiền lương cho đến các cơ chế mới lạ hơn như một loại tiền tệ nội bộ để làm phần thưởng cho công việc. Điều này về cơ bản sao chép các khuôn khổ pháp lý của một công ty truyền thống hoặc tổ chức phi lợi nhuận nhưng chỉ sử dụng công nghệ chuỗi khối mật mã học để thực thi. Cho đến nay, phần lớn các cuộc thảo luận xung quanh DAO đều xoay quanh mô hình "tư bản" của một "tập đoàn tự trị phi tập trung" (DAC) với các cổ đông nhận cổ tức và cổ phiếu có thể giao dịch; một giải pháp thay thế, có lẽ được mô tả là một "cộng đồng tự trị phi tập trung", sẽ có tất cả các thành viên có phần bằng nhau trong việc ra quyết định và yêu cầu 67% thành viên hiện tại đồng ý để thêm hoặc xóa một thành viên. Yêu cầu rằng một người chỉ có thể có một tư cách thành viên sau đó sẽ cần được thực thi chung bởi cả nhóm.

Một phác thảo chung về cách lập trình một DAO như sau. Thiết kế đơn giản nhất chỉ là một đoạn mã tự sửa đổi sẽ thay đổi nếu hai phần ba số thành viên đồng ý về một sự thay đổi. Mặc dù mã về mặt lý thuyết là bất biến, người ta có thể dễ dàng lách luật này và có được tính có thể thay đổi trên thực tế bằng cách đặt các khối mã trong các hợp đồng riêng biệt, và lưu trữ địa chỉ của các hợp đồng cần gọi trong bộ nhớ lưu trữ có thể sửa đổi. Trong một bản triển khai đơn giản của một hợp đồng DAO như vậy, sẽ có ba loại giao dịch, được phân biệt bởi dữ liệu cung cấp trong giao dịch:

- `[0,i,K,V]` để đăng ký một đề xuất với chỉ số `i` nhằm thay đổi địa chỉ tại chỉ số lưu trữ `K` thành giá trị `V`
- `[1,i]` để đăng ký một phiếu bầu ủng hộ đề xuất `i`
- `[2,i]` để chốt đề xuất `i` nếu đã có đủ số phiếu bầu

Hợp đồng sau đó sẽ có các điều khoản cho từng loại này. Nó sẽ duy trì một bản ghi về tất cả các thay đổi lưu trữ đang mở, cùng với danh sách những người đã bỏ phiếu cho chúng. Nó cũng sẽ có một danh sách tất cả các thành viên. Khi bất kỳ thay đổi lưu trữ nào nhận được hai phần ba số thành viên bỏ phiếu cho nó, một giao dịch chốt có thể thực thi sự thay đổi đó. Một bộ khung phức tạp hơn cũng sẽ có khả năng bỏ phiếu tích hợp cho các tính năng như gửi một giao dịch, thêm thành viên và xóa thành viên, và thậm chí có thể cung cấp sự ủy quyền bỏ phiếu theo phong cách [Dân chủ Thanh khoản (Liquid Democracy)](https://wikipedia.org/wiki/Liquid_democracy) (tức là, bất kỳ ai cũng có thể chỉ định người khác bỏ phiếu thay cho họ, và sự chỉ định có tính chất bắc cầu nên nếu A chỉ định B và B chỉ định C thì C sẽ quyết định phiếu bầu của A). Thiết kế này sẽ cho phép DAO phát triển một cách tự nhiên như một cộng đồng phi tập trung, cho phép mọi người cuối cùng ủy quyền nhiệm vụ sàng lọc ai là thành viên cho các chuyên gia, mặc dù không giống như trong "hệ thống hiện tại", các chuyên gia có thể dễ dàng xuất hiện và biến mất theo thời gian khi các thành viên cá nhân trong cộng đồng thay đổi sự liên kết của họ.

Một mô hình thay thế là cho một tập đoàn phi tập trung, nơi bất kỳ tài khoản nào cũng có thể có không hoặc nhiều cổ phần, và cần hai phần ba số cổ phần để đưa ra quyết định. Một bộ khung hoàn chỉnh sẽ bao gồm chức năng quản lý tài sản, khả năng đưa ra đề nghị mua hoặc bán cổ phần, và khả năng chấp nhận các đề nghị (tốt nhất là với một cơ chế khớp lệnh bên trong hợp đồng). Sự ủy quyền cũng sẽ tồn tại theo phong cách Dân chủ Thanh khoản, khái quát hóa khái niệm về một "hội đồng quản trị".

### Các Ứng dụng Khác {#further-applications}

**1. Ví tiết kiệm**. Giả sử Alice muốn giữ tiền của mình an toàn, nhưng lo lắng rằng cô ấy sẽ làm mất hoặc ai đó sẽ hack khóa riêng tư của mình. Cô ấy đưa ether vào một hợp đồng với Bob, một ngân hàng, như sau:

- Chỉ một mình Alice có thể rút tối đa 1% số tiền mỗi ngày.
- Chỉ một mình Bob có thể rút tối đa 1% số tiền mỗi ngày, nhưng Alice có khả năng thực hiện một giao dịch bằng khóa của mình để tắt khả năng này.
- Alice và Bob cùng nhau có thể rút bất kỳ khoản nào.

Thông thường, 1% mỗi ngày là đủ cho Alice, và nếu Alice muốn rút nhiều hơn, cô ấy có thể liên hệ với Bob để được giúp đỡ. Nếu khóa của Alice bị hack, cô ấy chạy đến Bob để chuyển tiền sang một hợp đồng mới. Nếu cô ấy làm mất khóa, Bob cuối cùng sẽ lấy được tiền ra. Nếu Bob hóa ra là kẻ xấu, thì cô ấy có thể tắt khả năng rút tiền của anh ta.

**2. Bảo hiểm mùa màng**. Người ta có thể dễ dàng tạo ra một hợp đồng phái sinh tài chính nhưng sử dụng nguồn cấp dữ liệu về thời tiết thay vì bất kỳ chỉ số giá nào. Nếu một nông dân ở Iowa mua một công cụ phái sinh chi trả tỷ lệ nghịch dựa trên lượng mưa ở Iowa, thì nếu có hạn hán, người nông dân sẽ tự động nhận được tiền và nếu có đủ mưa, người nông dân sẽ vui vẻ vì mùa màng của họ sẽ phát triển tốt. Điều này có thể được mở rộng thành bảo hiểm thiên tai nói chung.

**3. Một nguồn cấp dữ liệu phi tập trung**. Đối với các hợp đồng chênh lệch tài chính, thực tế có thể phi tập trung hóa nguồn cấp dữ liệu thông qua một giao thức có tên là "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)". SchellingCoin về cơ bản hoạt động như sau: N bên đều đưa vào hệ thống giá trị của một dữ liệu nhất định (ví dụ: giá ETH/USD), các giá trị được sắp xếp, và mọi người nằm trong khoảng từ phân vị thứ 25 đến 75 sẽ nhận được một token làm phần thưởng. Mọi người đều có động lực để cung cấp câu trả lời mà những người khác sẽ cung cấp, và giá trị duy nhất mà một số lượng lớn người chơi có thể thực sự đồng ý là mặc định hiển nhiên: sự thật. Điều này tạo ra một giao thức phi tập trung mà về mặt lý thuyết có thể cung cấp bất kỳ số lượng giá trị nào, bao gồm giá ETH/USD, nhiệt độ ở Berlin hoặc thậm chí là kết quả của một phép tính khó cụ thể.

**4. Ký quỹ đa chữ ký thông minh**. Bitcoin cho phép các hợp đồng giao dịch đa chữ ký, trong đó, ví dụ, ba trong số năm khóa nhất định có thể chi tiêu tiền. Ethereum cho phép mức độ chi tiết cao hơn; ví dụ, bốn trong số năm người có thể chi tiêu tất cả, ba trong số năm người có thể chi tiêu tối đa 10% mỗi ngày, và hai trong số năm người có thể chi tiêu tối đa 0.5% mỗi ngày. Ngoài ra, đa chữ ký của Ethereum là không đồng bộ - hai bên có thể đăng ký chữ ký của họ trên chuỗi khối vào các thời điểm khác nhau và chữ ký cuối cùng sẽ tự động gửi giao dịch.

**5. Điện toán đám mây**. Công nghệ EVM cũng có thể được sử dụng để tạo ra một môi trường điện toán có thể xác minh, cho phép người dùng yêu cầu người khác thực hiện các phép tính và sau đó tùy chọn yêu cầu các bằng chứng rằng các phép tính tại một số điểm kiểm tra được chọn ngẫu nhiên đã được thực hiện chính xác. Điều này cho phép tạo ra một thị trường điện toán đám mây nơi bất kỳ người dùng nào cũng có thể tham gia bằng máy tính để bàn, máy tính xách tay hoặc máy chủ chuyên dụng của họ, và việc kiểm tra ngẫu nhiên cùng với tiền gửi bảo mật có thể được sử dụng để đảm bảo rằng hệ thống là đáng tin cậy (tức là, các nút không thể gian lận để kiếm lời). Mặc dù một hệ thống như vậy có thể không phù hợp với mọi tác vụ; ví dụ, các tác vụ yêu cầu mức độ giao tiếp liên tiến trình cao không thể dễ dàng thực hiện trên một đám mây lớn gồm các nút. Tuy nhiên, các tác vụ khác lại dễ dàng song song hóa hơn nhiều; các dự án như SETI@home, folding@home và các thuật toán di truyền có thể dễ dàng được triển khai trên nền tảng như vậy.

**6. Đánh bạc ngang hàng**. Bất kỳ số lượng giao thức đánh bạc ngang hàng nào, chẳng hạn như [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) của Frank Stajano và Richard Clayton, đều có thể được triển khai trên chuỗi khối Ethereum. Giao thức đánh bạc đơn giản nhất thực ra chỉ là một hợp đồng chênh lệch dựa trên mã băm khối tiếp theo, và các giao thức tiên tiến hơn có thể được xây dựng từ đó, tạo ra các dịch vụ đánh bạc với mức phí gần như bằng không và không có khả năng gian lận.

**7. Thị trường dự đoán**. Nếu được cung cấp một nguồn cấp dữ liệu hoặc SchellingCoin, các thị trường dự đoán cũng rất dễ triển khai, và các thị trường dự đoán cùng với SchellingCoin có thể chứng minh là ứng dụng chính thống đầu tiên của [futarchy](https://mason.gmu.edu/~rhanson/futarchy.html) như một giao thức quản trị cho các tổ chức phi tập trung.

**8. Các thị trường phi tập trung trên chuỗi**, sử dụng hệ thống danh tính và danh tiếng làm cơ sở.

## Các vấn đề khác và mối quan ngại {#miscellanea-and-concerns}

### Triển khai GHOST sửa đổi {#modified-ghost-implementation}

Giao thức "Greedy Heaviest Observed Subtree" (GHOST) là một sự đổi mới được Yonatan Sompolinsky và Aviv Zohar giới thiệu lần đầu tiên vào [tháng 12 năm 2013](https://eprint.iacr.org/2013/881.pdf). Động lực đằng sau GHOST là các chuỗi khối có thời gian xác nhận nhanh hiện đang bị giảm bảo mật do tỷ lệ khối cũ (stale rate) cao - vì các khối cần một khoảng thời gian nhất định để truyền qua mạng lưới, nếu thợ đào A khai thác một khối và sau đó thợ đào B tình cờ khai thác một khối khác trước khi khối của thợ đào A truyền đến B, khối của thợ đào B sẽ bị lãng phí và sẽ không đóng góp vào bảo mật mạng lưới. Hơn nữa, có một vấn đề về tập trung hóa: nếu thợ đào A là một mỏ đào với 30% sức mạnh băm và B có 10% sức mạnh băm, A sẽ có nguy cơ tạo ra một khối cũ trong 70% thời gian (vì 30% thời gian còn lại A đã tạo ra khối cuối cùng và do đó sẽ nhận được dữ liệu khai thác ngay lập tức) trong khi B sẽ có nguy cơ tạo ra một khối cũ trong 90% thời gian. Do đó, nếu khoảng thời gian tạo khối đủ ngắn để tỷ lệ khối cũ ở mức cao, A sẽ hiệu quả hơn đáng kể chỉ nhờ vào quy mô của nó. Kết hợp hai hiệu ứng này lại, các chuỗi khối tạo ra khối nhanh chóng rất có khả năng dẫn đến việc một mỏ đào có đủ tỷ lệ phần trăm sức mạnh băm của mạng lưới để nắm quyền kiểm soát thực tế đối với quá trình khai thác.

Như Sompolinsky và Zohar đã mô tả, GHOST giải quyết vấn đề đầu tiên về việc mất bảo mật mạng lưới bằng cách đưa các khối cũ vào tính toán xem chuỗi nào là "dài nhất"; nghĩa là, không chỉ khối cha và các khối tổ tiên xa hơn của một khối, mà cả các khối hậu duệ cũ của khối tổ tiên (trong thuật ngữ Ethereum gọi là "uncle") cũng được thêm vào tính toán xem khối nào có tổng bằng chứng công việc (PoW) lớn nhất hỗ trợ nó. Để giải quyết vấn đề thứ hai về thiên kiến tập trung hóa, chúng tôi tiến xa hơn giao thức do Sompolinsky và Zohar mô tả, và cũng cung cấp phần thưởng khối cho các khối cũ: một khối cũ nhận được 87,5% phần thưởng cơ bản của nó và khối cháu (nephew) bao gồm khối cũ đó sẽ nhận được 12,5% còn lại. Tuy nhiên, phí giao dịch không được trao cho các khối uncle.

Ethereum triển khai một phiên bản GHOST đơn giản hóa chỉ đi xuống bảy cấp độ. Cụ thể, nó được định nghĩa như sau:

- Một khối phải chỉ định một khối cha và nó phải chỉ định 0 hoặc nhiều khối uncle
- Một khối uncle được bao gồm trong khối B phải có các thuộc tính sau:
  - Nó phải là khối con trực tiếp của khối tổ tiên thế hệ thứ k của B, trong đó `2 <= k <= 7`.
  - Nó không thể là khối tổ tiên của B
  - Một khối uncle phải là một tiêu đề block hợp lệ, nhưng không cần phải là một khối đã được xác minh trước đó hoặc thậm chí là một khối hợp lệ
  - Một khối uncle phải khác với tất cả các khối uncle được bao gồm trong các khối trước đó và tất cả các khối uncle khác được bao gồm trong cùng một khối (không bao gồm kép)
- Đối với mỗi khối uncle U trong khối B, thợ đào của B nhận thêm 3,125% vào phần thưởng coinbase của mình và thợ đào của U nhận được 93,75% phần thưởng coinbase tiêu chuẩn.

Phiên bản GHOST giới hạn này, với các khối uncle chỉ có thể được bao gồm tối đa 7 thế hệ, được sử dụng vì hai lý do. Thứ nhất, GHOST không giới hạn sẽ bao gồm quá nhiều sự phức tạp vào việc tính toán xem khối uncle nào cho một khối nhất định là hợp lệ. Thứ hai, GHOST không giới hạn với khoản bồi thường như được sử dụng trong Ethereum sẽ loại bỏ động lực để một thợ đào khai thác trên chuỗi chính chứ không phải chuỗi của một kẻ tấn công công khai.

### Phí {#fees}

Bởi vì mọi giao dịch được công bố vào chuỗi khối đều áp đặt lên mạng lưới chi phí cần thiết để tải xuống và xác minh nó, nên cần có một số cơ chế quản lý, thường liên quan đến phí giao dịch, để ngăn chặn lạm dụng. Cách tiếp cận mặc định, được sử dụng trong Bitcoin, là có các khoản phí hoàn toàn tự nguyện, dựa vào các thợ đào đóng vai trò là người gác cổng và thiết lập các mức tối thiểu động. Cách tiếp cận này đã được cộng đồng Bitcoin đón nhận rất tích cực, đặc biệt vì nó "dựa trên thị trường", cho phép cung và cầu giữa các thợ đào và người gửi giao dịch quyết định giá cả. Tuy nhiên, vấn đề với lập luận này là việc xử lý giao dịch không phải là một thị trường; mặc dù về mặt trực giác, việc coi xử lý giao dịch như một dịch vụ mà thợ đào đang cung cấp cho người gửi là rất hấp dẫn, nhưng trên thực tế, mọi giao dịch mà thợ đào đưa vào sẽ cần được xử lý bởi mọi nút trong mạng lưới, do đó phần lớn chi phí xử lý giao dịch do các bên thứ ba chịu chứ không phải thợ đào đang đưa ra quyết định có đưa nó vào hay không. Do đó, các vấn đề bi kịch của tài sản chung (tragedy-of-the-commons) rất có khả năng xảy ra.

Tuy nhiên, hóa ra lỗ hổng này trong cơ chế dựa trên thị trường, khi được đưa ra một giả định đơn giản hóa không chính xác cụ thể, lại tự triệt tiêu một cách kỳ diệu. Lập luận như sau. Giả sử rằng:

1. Một giao dịch dẫn đến `k` thao tác, cung cấp phần thưởng `kR` cho bất kỳ thợ đào nào đưa nó vào, trong đó `R` do người gửi thiết lập và `k` cùng `R` (gần như) hiển thị trước cho thợ đào.
2. Một thao tác có chi phí xử lý là `C` đối với bất kỳ nút nào (nghĩa là tất cả các nút đều có hiệu quả như nhau)
3. Có `N` nút khai thác, mỗi nút có sức mạnh xử lý hoàn toàn bằng nhau (nghĩa là `1/N` tổng số)
4. Không có nút đầy đủ nào không tham gia khai thác.

Một thợ đào sẽ sẵn sàng xử lý một giao dịch nếu phần thưởng dự kiến lớn hơn chi phí. Do đó, phần thưởng dự kiến là `kR/N` vì thợ đào có `1/N` cơ hội xử lý khối tiếp theo và chi phí xử lý đối với thợ đào chỉ đơn giản là `kC`. Do đó, các thợ đào sẽ đưa vào các giao dịch trong đó `kR/N > kC`, hoặc `R > NC`. Lưu ý rằng `R` là phí cho mỗi thao tác do người gửi cung cấp, và do đó là giới hạn dưới của lợi ích mà người gửi thu được từ giao dịch, và `NC` là chi phí của toàn bộ mạng lưới cùng nhau để xử lý một thao tác. Do đó, các thợ đào có động lực chỉ đưa vào những giao dịch mà tổng lợi ích thực tế vượt quá chi phí.

Tuy nhiên, có một số sai lệch quan trọng so với những giả định đó trong thực tế:

1. Thợ đào thực sự phải trả chi phí cao hơn để xử lý giao dịch so với các nút xác minh khác, vì thời gian xác minh bổ sung làm chậm sự truyền khối và do đó làm tăng khả năng khối sẽ trở thành khối cũ.
2. Thực sự có tồn tại các nút đầy đủ không tham gia khai thác.
3. Sự phân bổ sức mạnh khai thác có thể trở nên cực kỳ bất bình đẳng trong thực tế.
4. Những kẻ đầu cơ, kẻ thù chính trị và những kẻ điên rồ có mục đích bao gồm việc gây hại cho mạng lưới thực sự tồn tại, và họ có thể khéo léo thiết lập các hợp đồng trong đó chi phí của họ thấp hơn nhiều so với chi phí mà các nút xác minh khác phải trả.

(1) tạo ra xu hướng thợ đào đưa vào ít giao dịch hơn, và
(2) làm tăng `NC`; do đó, hai hiệu ứng này ít nhất triệt tiêu lẫn nhau một phần.<sup>[Như thế nào?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) và (4) là vấn đề chính; để giải quyết chúng, chúng tôi chỉ cần thiết lập một giới hạn thả nổi: không có khối nào có thể có nhiều thao tác hơn
`BLK_LIMIT_FACTOR` lần đường trung bình động hàm mũ dài hạn.
Cụ thể:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` và `EMA_FACTOR` là các hằng số sẽ được đặt thành 65536 và 1.5 trong thời điểm hiện tại, nhưng có khả năng sẽ được thay đổi sau khi phân tích thêm.

Có một yếu tố khác làm giảm động lực đối với kích thước khối lớn trong Bitcoin: các khối lớn sẽ mất nhiều thời gian hơn để truyền đi, và do đó có xác suất trở thành khối cũ cao hơn. Trong Ethereum, các khối tiêu thụ nhiều Gas cũng có thể mất nhiều thời gian hơn để truyền đi, vừa vì chúng lớn hơn về mặt vật lý, vừa vì chúng mất nhiều thời gian hơn để xử lý các quá trình chuyển đổi trạng thái giao dịch nhằm xác thực. Sự cản trở do độ trễ này là một cân nhắc đáng kể trong Bitcoin, nhưng ít hơn trong Ethereum do giao thức GHOST; do đó, việc dựa vào các giới hạn khối được quy định cung cấp một cơ sở ổn định hơn.

### Tính toán và tính hoàn thiện Turing {#computation-and-turing-completeness}

Một lưu ý quan trọng là máy ảo Ethereum có tính hoàn thiện Turing (Turing-complete); điều này có nghĩa là mã EVM có thể mã hóa bất kỳ tính toán nào có thể thực hiện được, bao gồm cả các vòng lặp vô hạn. Mã EVM cho phép lặp theo hai cách. Thứ nhất, có một lệnh `JUMP` cho phép chương trình nhảy ngược lại một vị trí trước đó trong mã và một lệnh `JUMPI` để thực hiện nhảy có điều kiện, cho phép các câu lệnh như `while x < 27: x = x * 2`. Thứ hai, các hợp đồng có thể gọi các hợp đồng khác, có khả năng cho phép lặp thông qua đệ quy. Điều này tự nhiên dẫn đến một vấn đề: liệu những người dùng độc hại có thể về cơ bản đánh sập các thợ đào và nút đầy đủ bằng cách buộc chúng rơi vào một vòng lặp vô hạn không? Vấn đề phát sinh do một bài toán trong khoa học máy tính được gọi là bài toán dừng (halting problem): trong trường hợp tổng quát, không có cách nào để biết liệu một chương trình nhất định có bao giờ dừng lại hay không.

Như được mô tả trong phần chuyển đổi trạng thái, giải pháp của chúng tôi hoạt động bằng cách yêu cầu một giao dịch thiết lập số bước tính toán tối đa mà nó được phép thực hiện, và nếu quá trình thực thi mất nhiều thời gian hơn, tính toán sẽ được hoàn nguyên nhưng phí vẫn được thanh toán. Các thông điệp hoạt động theo cách tương tự. Để cho thấy động lực đằng sau giải pháp của chúng tôi, hãy xem xét các ví dụ sau:

- Một kẻ tấn công tạo ra một hợp đồng chạy một vòng lặp vô hạn, sau đó gửi một giao dịch kích hoạt vòng lặp đó cho thợ đào. Thợ đào sẽ xử lý giao dịch, chạy vòng lặp vô hạn và đợi nó hết Gas. Mặc dù quá trình thực thi hết Gas và dừng lại giữa chừng, giao dịch vẫn hợp lệ và thợ đào vẫn yêu cầu nhận phí từ kẻ tấn công cho mỗi bước tính toán.
- Một kẻ tấn công tạo ra một vòng lặp vô hạn rất dài với ý định buộc thợ đào tiếp tục tính toán trong một thời gian dài đến mức khi tính toán kết thúc, một vài khối nữa sẽ được tạo ra và thợ đào sẽ không thể đưa giao dịch vào để yêu cầu nhận phí. Tuy nhiên, kẻ tấn công sẽ được yêu cầu gửi một giá trị cho `STARTGAS` giới hạn số bước tính toán mà quá trình thực thi có thể thực hiện, do đó thợ đào sẽ biết trước rằng tính toán sẽ mất một số lượng bước quá lớn.
- Một kẻ tấn công nhìn thấy một hợp đồng có mã dạng như `send(A,contract.storage[A]); contract.storage[A] = 0` và gửi một giao dịch với lượng Gas vừa đủ để chạy bước đầu tiên nhưng không đủ cho bước thứ hai (nghĩa là thực hiện rút tiền nhưng không để số dư giảm xuống). Tác giả hợp đồng không cần lo lắng về việc bảo vệ chống lại các cuộc tấn công như vậy, bởi vì nếu quá trình thực thi dừng lại giữa chừng, các thay đổi sẽ được hoàn nguyên.
- Một hợp đồng tài chính hoạt động bằng cách lấy giá trị trung vị của chín nguồn cấp dữ liệu độc quyền nhằm giảm thiểu rủi ro. Một kẻ tấn công chiếm quyền kiểm soát một trong các nguồn cấp dữ liệu, vốn được thiết kế để có thể sửa đổi thông qua cơ chế gọi địa chỉ biến đổi (variable-address-call) được mô tả trong phần về DAO, và chuyển đổi nó để chạy một vòng lặp vô hạn, qua đó cố gắng buộc bất kỳ nỗ lực nào nhằm yêu cầu nhận tiền từ hợp đồng tài chính đều bị hết Gas. Tuy nhiên, hợp đồng tài chính có thể đặt giới hạn gas cho thông điệp để ngăn chặn vấn đề này.

Giải pháp thay thế cho tính hoàn thiện Turing là tính không hoàn thiện Turing (Turing-incompleteness), trong đó `JUMP` và `JUMPI` không tồn tại và chỉ một bản sao của mỗi hợp đồng được phép tồn tại trong ngăn xếp lệnh gọi (call stack) tại bất kỳ thời điểm nào. Với hệ thống này, hệ thống phí được mô tả và những điểm không chắc chắn xung quanh tính hiệu quả của giải pháp của chúng tôi có thể không cần thiết, vì chi phí thực thi một hợp đồng sẽ bị giới hạn trên bởi kích thước của nó. Ngoài ra, tính không hoàn thiện Turing thậm chí không phải là một hạn chế quá lớn; trong số tất cả các ví dụ về hợp đồng mà chúng tôi đã hình thành trong nội bộ, cho đến nay chỉ có một hợp đồng yêu cầu vòng lặp và ngay cả vòng lặp đó cũng có thể được loại bỏ bằng cách lặp lại 26 lần một đoạn mã gồm một dòng. Với những tác động nghiêm trọng của tính hoàn thiện Turing và lợi ích hạn chế, tại sao không đơn giản là có một ngôn ngữ không hoàn thiện Turing? Tuy nhiên, trên thực tế, tính không hoàn thiện Turing khác xa so với một giải pháp gọn gàng cho vấn đề. Để hiểu lý do, hãy xem xét các hợp đồng sau:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Bây giờ, hãy gửi một giao dịch đến A. Do đó, trong 51 giao dịch, chúng ta có một hợp đồng chiếm tới 2<sup>50</sup> bước tính toán. Các thợ đào có thể cố gắng phát hiện trước các quả bom logic như vậy bằng cách duy trì một giá trị bên cạnh mỗi hợp đồng chỉ định số bước tính toán tối đa mà nó có thể thực hiện, và tính toán điều này cho các hợp đồng gọi các hợp đồng khác một cách đệ quy, nhưng điều đó sẽ yêu cầu các thợ đào cấm các hợp đồng tạo ra các hợp đồng khác (vì việc tạo và thực thi tất cả 26 hợp đồng ở trên có thể dễ dàng được gộp vào một hợp đồng duy nhất). Một điểm có vấn đề khác là trường địa chỉ của một thông điệp là một biến, do đó, nói chung, thậm chí có thể không biết trước được một hợp đồng nhất định sẽ gọi những hợp đồng nào khác. Do đó, nhìn chung, chúng ta có một kết luận đáng ngạc nhiên: tính hoàn thiện Turing lại dễ quản lý một cách đáng ngạc nhiên, và việc thiếu tính hoàn thiện Turing cũng khó quản lý một cách đáng ngạc nhiên không kém trừ khi áp dụng chính xác các biện pháp kiểm soát tương tự - nhưng trong trường hợp đó, tại sao không để giao thức có tính hoàn thiện Turing?

### Tiền tệ và phát hành {#currency-and-issuance}

Mạng lưới Ethereum bao gồm loại tiền tệ tích hợp riêng của nó, ether, phục vụ mục đích kép là cung cấp một lớp thanh khoản chính để cho phép trao đổi hiệu quả giữa các loại tài sản kỹ thuật số khác nhau và quan trọng hơn là cung cấp một cơ chế để thanh toán phí giao dịch. Để thuận tiện và tránh tranh cãi trong tương lai (xem cuộc tranh luận mBTC/uBTC/satoshi hiện tại trong Bitcoin), các mệnh giá sẽ được dán nhãn trước:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Điều này nên được coi là một phiên bản mở rộng của khái niệm "đô la" và "xu" hoặc "BTC" và "satoshi". Trong tương lai gần, chúng tôi kỳ vọng "ether" sẽ được sử dụng cho các giao dịch thông thường, "finney" cho các giao dịch vi mô và "szabo" cùng "wei" cho các cuộc thảo luận kỹ thuật xung quanh phí và triển khai giao thức; các mệnh giá còn lại có thể trở nên hữu ích sau này và không nên được đưa vào các máy khách (client) tại thời điểm này.

Mô hình phát hành sẽ như sau:

- Ether sẽ được phát hành trong một đợt bán tiền tệ với giá 1000-2000 ether cho mỗi BTC, một cơ chế nhằm tài trợ cho tổ chức Ethereum và trả chi phí phát triển đã được các nền tảng khác như Mastercoin và NXT sử dụng thành công. Những người mua sớm hơn sẽ được hưởng lợi từ các khoản chiết khấu lớn hơn. Số BTC nhận được từ đợt bán sẽ được sử dụng hoàn toàn để trả lương và tiền thưởng cho các nhà phát triển, đồng thời đầu tư vào các dự án vì lợi nhuận và phi lợi nhuận khác nhau trong hệ sinh thái Ethereum và tiền mã hóa.
- 0,099x tổng số lượng được bán (60102216 ETH) sẽ được phân bổ cho tổ chức để bồi thường cho những người đóng góp sớm và thanh toán các chi phí bằng ETH trước khối nguyên thủy.
- 0,099x tổng số lượng được bán sẽ được duy trì như một khoản dự trữ dài hạn.
- 0,26x tổng số lượng được bán sẽ được phân bổ cho các thợ đào mỗi năm mãi mãi sau thời điểm đó.

| Nhóm | Khi ra mắt | Sau 1 năm | Sau 5 năm |
| ---------------------- | --------- | ------------ | ------------- |
| Đơn vị tiền tệ | 1.198X | 1.458X | 2.498X |
| Người mua | 83.5% | 68.6% | 40.0% |
| Dự trữ đã chi tiêu trước khi bán | 8.26% | 6.79% | 3.96% |
| Dự trữ được sử dụng sau khi bán | 8.26% | 6.79% | 3.96% |
| Thợ đào | 0% | 17.8% | 52.0% |

#### Tốc độ tăng trưởng nguồn cung dài hạn (phần trăm) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_Mặc dù phát hành tiền tệ tuyến tính, giống như Bitcoin theo thời gian, tốc độ tăng trưởng nguồn cung vẫn có xu hướng tiến về 0._

Hai lựa chọn chính trong mô hình trên là (1) sự tồn tại và quy mô của một quỹ tài trợ (endowment pool), và (2) sự tồn tại của một nguồn cung tuyến tính tăng trưởng vĩnh viễn, trái ngược với nguồn cung bị giới hạn như trong Bitcoin. Sự biện minh cho quỹ tài trợ như sau. Nếu quỹ tài trợ không tồn tại và lượng phát hành tuyến tính giảm xuống 0,217x để cung cấp cùng một tỷ lệ lạm phát, thì tổng số lượng ether sẽ ít hơn 16,5% và do đó mỗi đơn vị sẽ có giá trị hơn 19,8%. Do đó, ở trạng thái cân bằng, sẽ có thêm 19,8% ether được mua trong đợt bán, vì vậy mỗi đơn vị sẽ lại có giá trị chính xác như trước. Tổ chức sau đó cũng sẽ có lượng BTC gấp 1,198 lần, có thể được coi là chia thành hai phần: BTC ban đầu và 0,198x bổ sung. Do đó, tình huống này _hoàn toàn tương đương_ với quỹ tài trợ, nhưng có một điểm khác biệt quan trọng: tổ chức chỉ nắm giữ thuần túy BTC, và do đó không có động lực để hỗ trợ giá trị của đơn vị ether.

Mô hình tăng trưởng nguồn cung tuyến tính vĩnh viễn làm giảm rủi ro của những gì một số người coi là sự tập trung tài sản quá mức trong Bitcoin, và mang lại cho các cá nhân sống trong thời đại hiện tại và tương lai một cơ hội công bằng để có được các đơn vị tiền tệ, đồng thời vẫn giữ được động lực mạnh mẽ để có được và nắm giữ ether vì "tốc độ tăng trưởng nguồn cung" tính theo tỷ lệ phần trăm vẫn có xu hướng tiến về 0 theo thời gian. Chúng tôi cũng đưa ra giả thuyết rằng vì các đồng tiền luôn bị mất theo thời gian do bất cẩn, tử vong, v.v., và việc mất tiền có thể được mô hình hóa dưới dạng tỷ lệ phần trăm của tổng nguồn cung mỗi năm, nên tổng nguồn cung tiền tệ đang lưu thông trên thực tế cuối cùng sẽ ổn định ở một giá trị bằng lượng phát hành hàng năm chia cho tỷ lệ mất mát (ví dụ: với tỷ lệ mất mát là 1%, khi nguồn cung đạt 26X thì 0,26X sẽ được khai thác và 0,26X bị mất mỗi năm, tạo ra một trạng thái cân bằng).

Lưu ý rằng trong tương lai, có khả năng Ethereum sẽ chuyển sang mô hình Bằng chứng cổ phần (PoS) để bảo mật, giảm yêu cầu phát hành xuống một mức nào đó giữa 0 và 0,05X mỗi năm. Trong trường hợp tổ chức Ethereum mất tài trợ hoặc vì bất kỳ lý do nào khác mà biến mất, chúng tôi để ngỏ một "hợp đồng xã hội": bất kỳ ai cũng có quyền tạo ra một phiên bản ứng cử viên tương lai của Ethereum, với điều kiện duy nhất là số lượng ether tối đa phải bằng `60102216 * (1.198 + 0.26 * n)` trong đó `n` là số năm sau khối nguyên thủy. Những người sáng tạo có quyền tự do bán huy động vốn từ cộng đồng (crowd-sell) hoặc chỉ định một phần hoặc toàn bộ chênh lệch giữa việc mở rộng nguồn cung do PoS thúc đẩy và mức mở rộng nguồn cung tối đa cho phép để trả chi phí phát triển. Các bản nâng cấp ứng cử viên không tuân thủ hợp đồng xã hội có thể được phân nhánh một cách chính đáng thành các phiên bản tuân thủ.

### Tập trung hóa khai thác {#mining-centralization}

Thuật toán khai thác Bitcoin hoạt động bằng cách yêu cầu các thợ đào tính toán SHA-256 trên các phiên bản được sửa đổi một chút của tiêu đề block hàng triệu lần lặp đi lặp lại, cho đến khi cuối cùng một nút đưa ra một phiên bản có mã băm nhỏ hơn mục tiêu (hiện tại là khoảng 2<sup>192</sup>). Tuy nhiên, thuật toán khai thác này dễ bị tổn thương trước hai hình thức tập trung hóa. Thứ nhất, hệ sinh thái khai thác đã bị thống trị bởi ASIC (mạch tích hợp chuyên dụng), các chip máy tính được thiết kế cho, và do đó hiệu quả hơn hàng nghìn lần đối với, nhiệm vụ cụ thể là khai thác Bitcoin. Điều này có nghĩa là việc khai thác Bitcoin không còn là một hoạt động theo đuổi mang tính phi tập trung và bình đẳng cao nữa, mà đòi hỏi hàng triệu đô la vốn để tham gia một cách hiệu quả. Thứ hai, hầu hết các thợ đào Bitcoin không thực sự thực hiện xác thực khối cục bộ; thay vào đó, họ dựa vào một mỏ đào tập trung để cung cấp các tiêu đề block. Vấn đề này được cho là tồi tệ hơn: tính đến thời điểm viết bài này, ba mỏ đào hàng đầu gián tiếp kiểm soát khoảng 50% sức mạnh xử lý trong mạng lưới Bitcoin, mặc dù điều này được giảm nhẹ bởi thực tế là các thợ đào có thể chuyển sang các mỏ đào khác nếu một mỏ đào hoặc liên minh cố gắng thực hiện một cuộc tấn công 51%.

Ý định hiện tại tại Ethereum là sử dụng một thuật toán khai thác trong đó các thợ đào được yêu cầu lấy dữ liệu ngẫu nhiên từ trạng thái, tính toán một số giao dịch được chọn ngẫu nhiên từ N khối cuối cùng trong chuỗi khối và trả về mã băm của kết quả. Điều này có hai lợi ích quan trọng. Thứ nhất, các hợp đồng Ethereum có thể bao gồm bất kỳ loại tính toán nào, do đó một ASIC Ethereum về cơ bản sẽ là một ASIC cho tính toán tổng quát - tức là một CPU tốt hơn. Thứ hai, việc khai thác yêu cầu quyền truy cập vào toàn bộ chuỗi khối, buộc các thợ đào phải lưu trữ toàn bộ chuỗi khối và ít nhất phải có khả năng xác minh mọi giao dịch. Điều này loại bỏ nhu cầu về các mỏ đào tập trung; mặc dù các mỏ đào vẫn có thể phục vụ vai trò hợp pháp là san bằng tính ngẫu nhiên của việc phân phối phần thưởng, chức năng này có thể được phục vụ tốt không kém bởi các mỏ đào ngang hàng không có sự kiểm soát trung tâm.

Mô hình này chưa được kiểm chứng và có thể có những khó khăn trong quá trình tránh một số tối ưu hóa thông minh nhất định khi sử dụng việc thực thi hợp đồng làm thuật toán khai thác. Tuy nhiên, một tính năng thú vị đáng chú ý của thuật toán này là nó cho phép bất kỳ ai "đầu độc giếng nước" (poison the well), bằng cách đưa một số lượng lớn các hợp đồng vào chuỗi khối được thiết kế đặc biệt để cản trở một số ASIC nhất định. Các động lực kinh tế tồn tại để các nhà sản xuất ASIC sử dụng thủ thuật như vậy để tấn công lẫn nhau. Do đó, giải pháp mà chúng tôi đang phát triển cuối cùng là một giải pháp kinh tế thích ứng của con người chứ không hoàn toàn là một giải pháp kỹ thuật.

### Khả năng mở rộng {#scalability}

Một mối quan ngại phổ biến về Ethereum là vấn đề khả năng mở rộng. Giống như Bitcoin, Ethereum mắc phải một nhược điểm là mọi giao dịch cần được xử lý bởi mọi nút trong mạng lưới. Với Bitcoin, kích thước của chuỗi khối hiện tại ở mức khoảng 15 GB, tăng khoảng 1 MB mỗi giờ. Nếu mạng lưới Bitcoin xử lý 2000 giao dịch mỗi giây của Visa, nó sẽ tăng 1 MB mỗi ba giây (1 GB mỗi giờ, 8 TB mỗi năm). Ethereum có khả năng sẽ chịu một mô hình tăng trưởng tương tự, trở nên tồi tệ hơn bởi thực tế là sẽ có nhiều ứng dụng trên chuỗi khối Ethereum thay vì chỉ là một loại tiền tệ như trường hợp của Bitcoin, nhưng được cải thiện bởi thực tế là các nút đầy đủ của Ethereum chỉ cần lưu trữ trạng thái thay vì toàn bộ lịch sử chuỗi khối.

Vấn đề với kích thước chuỗi khối lớn như vậy là rủi ro tập trung hóa. Nếu kích thước chuỗi khối tăng lên, giả sử là 100 TB, thì kịch bản có khả năng xảy ra là chỉ một số lượng rất nhỏ các doanh nghiệp lớn sẽ chạy các nút đầy đủ, với tất cả người dùng thông thường sử dụng các node nhẹ SPV. Trong tình huống như vậy, nảy sinh mối quan ngại tiềm tàng rằng các nút đầy đủ có thể liên kết với nhau và tất cả đều đồng ý gian lận theo một cách sinh lời nào đó (ví dụ: thay đổi phần thưởng khối, tự cấp BTC cho mình). Các node nhẹ sẽ không có cách nào phát hiện ra điều này ngay lập tức. Tất nhiên, ít nhất một nút đầy đủ trung thực có khả năng sẽ tồn tại, và sau vài giờ thông tin về vụ gian lận sẽ rò rỉ qua các kênh như Reddit, nhưng tại thời điểm đó thì đã quá muộn: người dùng thông thường sẽ phải tổ chức một nỗ lực để đưa các khối đó vào danh sách đen, một vấn đề phối hợp khổng lồ và có khả năng không khả thi ở quy mô tương tự như việc thực hiện thành công một cuộc tấn công 51%. Trong trường hợp của Bitcoin, đây hiện là một vấn đề, nhưng có một sửa đổi chuỗi khối [do Peter Todd đề xuất](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) sẽ làm giảm bớt vấn đề này.

Trong ngắn hạn, Ethereum sẽ sử dụng thêm hai chiến lược để đối phó với vấn đề này. Thứ nhất, do các thuật toán khai thác dựa trên chuỗi khối, ít nhất mọi thợ đào sẽ bị buộc phải là một nút đầy đủ, tạo ra một giới hạn dưới về số lượng các nút đầy đủ. Tuy nhiên, thứ hai và quan trọng hơn, chúng tôi sẽ đưa một gốc cây trạng thái trung gian vào chuỗi khối sau khi xử lý mỗi giao dịch. Ngay cả khi việc xác thực khối bị tập trung hóa, miễn là có một nút xác minh trung thực tồn tại, vấn đề tập trung hóa có thể được khắc phục thông qua một giao thức xác minh. Nếu một thợ đào công bố một khối không hợp lệ, khối đó phải được định dạng sai hoặc trạng thái `S[n]` không chính xác. Vì `S[0]` được biết là chính xác, nên phải có một trạng thái đầu tiên `S[i]` nào đó không chính xác trong khi `S[i-1]` là chính xác. Nút xác minh sẽ cung cấp chỉ số `i`, cùng với một "bằng chứng không hợp lệ" bao gồm tập hợp con của các nút cây Patricia cần thiết để xử lý `APPLY(S[i-1],TX[i]) -> S[i]`. Các nút sẽ có thể sử dụng các nút đó để chạy phần tính toán đó và thấy rằng `S[i]` được tạo ra không khớp với `S[i]` được cung cấp.

Một cuộc tấn công khác, tinh vi hơn, sẽ liên quan đến việc các thợ đào độc hại công bố các khối không hoàn chỉnh, do đó thông tin đầy đủ thậm chí không tồn tại để xác định xem các khối có hợp lệ hay không. Giải pháp cho vấn đề này là một giao thức thử thách-phản hồi (challenge-response): các nút xác minh đưa ra các "thử thách" dưới dạng các chỉ số giao dịch mục tiêu, và khi nhận được một nút, một node nhẹ sẽ coi khối đó là không đáng tin cậy cho đến khi một nút khác, cho dù là thợ đào hay một trình xác minh khác, cung cấp một tập hợp con các nút Patricia như một bằng chứng hợp lệ.

## Kết luận {#conclusion}

Giao thức Ethereum ban đầu được hình thành như một phiên bản nâng cấp của một loại tiền mã hóa, cung cấp các tính năng nâng cao như ký quỹ trên chuỗi khối, giới hạn rút tiền, hợp đồng tài chính, thị trường cờ bạc và những thứ tương tự thông qua một ngôn ngữ lập trình mang tính tổng quát cao. Giao thức Ethereum sẽ không "hỗ trợ" trực tiếp bất kỳ ứng dụng nào, nhưng sự tồn tại của một ngôn ngữ lập trình Turing hoàn chỉnh có nghĩa là các hợp đồng tùy ý về mặt lý thuyết có thể được tạo ra cho bất kỳ loại giao dịch hoặc ứng dụng nào. Tuy nhiên, điều thú vị hơn về Ethereum là giao thức Ethereum tiến xa hơn nhiều so với việc chỉ là tiền tệ. Các giao thức xoay quanh lưu trữ tệp phi tập trung, tính toán phi tập trung và thị trường dự đoán phi tập trung, cùng với hàng tá các khái niệm tương tự khác, có tiềm năng làm tăng đáng kể hiệu quả của ngành công nghiệp máy tính, và cung cấp một sự thúc đẩy mạnh mẽ cho các giao thức ngang hàng khác bằng cách lần đầu tiên bổ sung thêm một lớp kinh tế. Cuối cùng, cũng có một loạt các ứng dụng đáng kể hoàn toàn không liên quan gì đến tiền bạc.

Khái niệm về một hàm chuyển đổi trạng thái tùy ý như được triển khai bởi giao thức Ethereum mang đến một nền tảng với tiềm năng độc đáo; thay vì là một giao thức khép kín, đơn mục đích dành cho một loạt các ứng dụng cụ thể trong lưu trữ dữ liệu, cờ bạc hoặc tài chính, Ethereum được thiết kế theo hướng mở, và chúng tôi tin rằng nó cực kỳ phù hợp để đóng vai trò như một lớp nền tảng cho một số lượng rất lớn các giao thức cả tài chính và phi tài chính trong những năm tới.

## Ghi chú và Đọc thêm {#notes-and-further-reading}

### Ghi chú {#notes}

1. Một độc giả tinh ý có thể nhận ra rằng trên thực tế, một địa chỉ Bitcoin là mã băm của khóa công khai đường cong elliptic, chứ không phải là chính khóa công khai đó. Tuy nhiên, trên thực tế, việc gọi mã băm khóa công khai là chính khóa công khai là một thuật ngữ mật mã học hoàn toàn hợp lệ. Điều này là do mật mã học của Bitcoin có thể được coi là một thuật toán chữ ký số tùy chỉnh, trong đó khóa công khai bao gồm mã băm của khóa công khai ECC, chữ ký bao gồm khóa công khai ECC được nối với chữ ký ECC, và thuật toán xác minh liên quan đến việc kiểm tra khóa công khai ECC trong chữ ký với mã băm khóa công khai ECC được cung cấp dưới dạng khóa công khai, sau đó xác minh chữ ký ECC với khóa công khai ECC.
2. Về mặt kỹ thuật, là giá trị trung vị của 11 khối trước đó.
3. Về mặt nội bộ, 2 và "CHARLIE" đều là các số, trong đó "CHARLIE" được biểu diễn ở dạng cơ số 256 Big-endian. Các số có thể có giá trị nhỏ nhất là 0 và lớn nhất là 2<sup>256</sup>-1.

### Đọc thêm {#further-reading}

1. [Giá trị nội tại](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Tài sản thông minh](https://en.bitcoin.it/wiki/Smart_Property)
3. [Hợp đồng thông minh](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Bằng chứng công việc (PoW) có thể tái sử dụng](https://nakamotoinstitute.org/finney/rpow/)
6. [Quyền sở hữu tài sản an toàn với thẩm quyền của chủ sở hữu](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Sách trắng Bitcoin](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Tam giác Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Sách trắng Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Sách trắng Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Các tập đoàn tự trị phi tập trung, Tạp chí Bitcoin](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Xác minh thanh toán đơn giản hóa](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Cây Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Cây Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ và Các tác nhân tự trị, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn nói về Tài sản thông minh tại Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](/developers/docs/data-structures-and-encoding/rlp/)
20. [Cây Merkle Patricia của Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd nói về Cây tổng Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Để biết lịch sử của sách trắng, hãy xem [wiki này](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_Ethereum, giống như nhiều dự án phần mềm mã nguồn mở do cộng đồng thúc đẩy, đã phát triển kể từ khi mới thành lập. Để tìm hiểu về những phát triển mới nhất của Ethereum và cách các thay đổi đối với giao thức được thực hiện, chúng tôi khuyên bạn nên đọc [hướng dẫn này](/learn/)._
