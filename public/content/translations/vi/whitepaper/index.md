---
title: Sách trắng Ethereum
description: Bản giới thiệu về Ethereum, xuất bản vào năm 2013 trước khi dự án được ra mắt.
lang: vi
sidebarDepth: 2
hideEditButton: true
---

# Giấy trắng Ethereum {#ethereum-whitepaper}

_Bài viết giới thiệu này được xuất bản lần đầu vào năm 2014 bởi Vitalik Buterin, người sáng lập [Ethereum](/what-is-ethereum/), trước khi dự án ra mắt vào năm 2015. Nên biết rằng, tương tự như nhiều dự án phần mềm mã nguồn mở và được phát triển bởi cộng đồng khác, Ethereum đã tiến hoá nhiều lần từ khi nó được tạo ra._

_Mặc dù có nhiều năm tuổi, chúng tôi vẫn lưu giữ tài liệu này vì nó vẫn hữu ích cho việc tham khảo và giải thích Ethereum và tầm nhìn của nó. _Để tìm hiểu về những phát triển mới nhất của Ethereum và cách thực hiện các thay đổi đối với giao thức, chúng tôi khuyên bạn nên đọc [hướng dẫn này](/learn/)._

[Các nhà nghiên cứu và học giả đang tìm kiếm phiên bản lịch sử hoặc chính thức của giấy trắng [từ tháng 12 năm 2014] nên sử dụng tệp PDF này.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Nền tảng Hợp đồng thông minh và Ứng dụng phi tập trung thế hệ tiếp theo {#a-next-generation-smart-contract-and-decentralized-application-platform}

Việc Satoshi Nakamoto phát triển Bitcoin vào năm 2009 thường được ca ngợi là một sự phát triển đột phá trong lĩnh vực tiền tệ, là ví dụ đầu tiên về một tài sản kỹ thuật số không có sự bảo trợ hay "[giá trị nội tại](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)" và không có bên phát hành hay kiểm soát tập trung. Tuy nhiên, một phần khác được cho là quan trọng hơn của thử nghiệm Bitcoin là công nghệ blockchain, cơ bản như một công cụ của sự đồng thuận phân tán và sự chú ý nhanh chóng bắt đầu chuyển dịch sang khía cạnh khác của Bitcoin. Các ứng dụng thay thế thường được trích dẫn của công nghệ chuỗi khối bao gồm việc sử dụng tài sản kỹ thuật số trên chuỗi khối để đại diện cho các loại tiền tệ và công cụ tài chính tùy chỉnh ("[colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), quyền sở hữu một thiết bị vật lý cơ bản ("[tài sản thông minh](https://en.bitcoin.it/wiki/Smart_Property)"), các tài sản không thể thay thế như tên miền ("[Namecoin](http://namecoin.org)"), cũng như các ứng dụng phức tạp hơn liên quan đến việc có các tài sản kỹ thuật số được kiểm soát trực tiếp bởi một đoạn mã thực hiện các quy tắc tùy ý ("[hợp đồng thông minh](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") hoặc thậm chí là các "[tổ chức tự trị phi tập trung](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAO) dựa trên chuỗi khối. Những gì Ethereum mong muốn cung cấp là một blockchain với một ngôn ngữ lập trình Turing đầy đủ tính năng tích hợp có thể được sử dụng để tạo "hợp đồng" có thể được sử dụng để mã hóa các hàm chuyển đổi trạng thái tùy ý, cho phép người dùng tạo ra bất kỳ hệ thống nào được mô tả ở trên, cũng như nhiều hệ thống khác mà chúng ta chưa tưởng tượng được, chỉ cần bằng cách viết logic trong vài dòng mã.

## Giới thiệu về Bitcoin và các khái niệm hiện có {#introduction-to-bitcoin-and-existing-concepts}

### Lịch sử {#history}

Khái niệm về tiền tệ kỹ thuật số phi tập trung, cũng như các ứng dụng thay thế như đăng ký tài sản, đã tồn tại trong nhiều thập kỷ. Các giao thức tiền điện tử ẩn danh của những năm 1980 và những năm 1990, chủ yếu dựa vào sơ bản mật mã được gọi là Chaumian blind, cung cấp một loại tiền tệ có mức độ bảo mật cao, nhưng các giao thức này phần lớn không đạt được sức hút vì phụ thuộc vào một trung gian tập trung. . Năm 1998, [b-money](http://www.weidai.com/bmoney.txt) của Wei Dai đã trở thành đề xuất đầu tiên giới thiệu ý tưởng tạo ra tiền thông qua việc giải các câu đố tính toán cũng như sự đồng thuận phi tập trung, nhưng đề xuất này còn sơ sài về chi tiết cách thức thực sự để triển khai sự đồng thuận phi tập trung. Năm 2005, Hal Finney đã giới thiệu một khái niệm về "[bằng chứng công việc có thể tái sử dụng](https://nakamotoinstitute.org/finney/rpow/)", một hệ thống sử dụng các ý tưởng từ b-money cùng với các câu đố Hashcash khó tính toán của Adam Back để tạo ra một khái niệm cho một loại tiền mã hóa, nhưng một lần nữa lại không đạt được lý tưởng vì phụ thuộc vào điện toán đáng tin cậy như một hệ thống phụ trợ. Vào 2009, một loại tiền tệ phi tập trung lần đầu tiên được Satoshi Nakamoto ứng dụng thực tiễn, kết hợp các nguyên tắc đã được thiết lập để quản lý quyền sở hữu thông qua public key với thuật toán đồng thuận để có thể theo dõi ai sở hữu coins, được biết đến với tên "proof of work".

Cơ chế đằng sau bằng chứng công việc đã đạt được một đột phá trong lĩnh vực này vì nó đồng thời giải quyết hai vấn đề. Thứ nhất, nó cung cấp một thuật toán đồng thuận đơn giản và khá hiệu quả, cho phép các nút trong mạng đồng thuận chung về một tập hợp các cập nhật cơ bản cho trạng thái của sổ cái Bitcoin. Thứ hai, nó cung cấp một cơ chế cho phép tham gia tự do vào quá trình đồng thuận, giải quyết vấn đề chính trị về quyết định ai được ảnh hưởng đến đồng thuận, đồng thời ngăn chặn các cuộc tấn công Sybil. Điều này được thực hiện bằng cách thay thế một rào cản tham gia hình thức, như yêu cầu phải đăng ký làm một thực thể duy nhất trên một danh sách cụ thể, bằng một rào cản kinh tế (economic barrier) - trọng lượng (weight) của một node duy nhất trong quá trình bỏ phiếu đồng thuận (consensus voting) tỉ lệ thuận trực tiếp với sức mạnh tính toán mà node mang lại. Kể từ đó, một phương pháp tiếp cận thay thế đã được đề xuất có tên là _bằng chứng cổ phần_, tính toán trọng số của một nút tỷ lệ thuận với số lượng tiền tệ mà nó nắm giữ chứ không phải là tài nguyên tính toán; việc thảo luận về các giá trị tương đối của hai phương pháp này nằm ngoài phạm vi của bài viết này nhưng cần lưu ý rằng cả hai phương pháp đều có thể được sử dụng làm xương sống cho một loại tiền mã hóa.

### Bitcoin như một hệ thống chuyển đổi trạng thái {#bitcoin-as-a-state-transition-system}

![Chuyển đổi trạng thái Ethereum](./ethereum-state-transition.png)

Từ góc độ kỹ thuật, sổ cái của một loại tiền điện tử như Bitcoin có thể được coi như một hệ thống chuyển trạng thái, trong đó có một "trạng thái" bao gồm tình trạng sở hữu của tất cả các bitcoin hiện có và một "hàm chuyển trạng thái" nhận vào một trạng thái và một giao dịch và xuất ra một trạng thái mới là kết quả. Trong một hệ thống ngân hàng tiêu chuẩn, ví dụ, nhà nước là một bảng cân đối, một giao dịch là một yêu cầu chuyển $X từ A sang B, và hàm chuyển trạng thái của nhà nước sẽ giảm giá trị trong tài khoản của A xuống $X và tăng giá trị trong tài khoản của B lên $X. Nếu tài khoản của A có ít hơn $X, hàm chuyển đổi trạng thái sẽ trả về một lỗi. Như thế, chúng ta có thể định nghĩa một cách chính xác:

```
APPLY(S,TX) -> S' hoặc LỖI
```

Trong hệ thống ngân hàng nói trên:

```js
APPLY({ Alice: $50, Bob: $50 },"gửi $20 từ Alice đến Bob") = { Alice: $30, Bob: $70 }
```

Nhưng:

```js
APPLY({ Alice: $50, Bob: $50 },"gửi $70 từ Alice đến Bob") = ERROR
```

Với bitcoin thì "state" là tập hợp tất cả các coins ( cụ thể hơn là tập hợp tất cả UTXO) đã được in ra và chưa bị sử dụng, với mỗi UTXO bao gồm thông tin về số lượng coin và chủ sở hữu của những đồng coin này. Chủ sở hữu của những đồng coin được xác định bởi public key<sup>[fn1](#notes)</sup> dài 20 bytes. Một giao dịch bao gồm một hoặc nhiều inputs, mỗi input bao gồm con trỏ đến một UTXO và chữ ký điện tử tạo ra từ private key, và một hoặc nhiều outputs, mỗi output bao gồm UXTO mới được tạo ra.

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
    Nếu tổng mệnh giá của tất cả UTXO đầu vào nhỏ hơn tổng mệnh giá của tất cả UTXO đầu ra, trả về một lỗi.
  </li>
  <li>
    Trả về <code>S</code> với tất cả UTXO đầu vào bị xóa và tất cả UTXO đầu ra được thêm vào.
  </li>
</ol>

Nửa đầu của bước đầu tiên ngăn chặn người gửi giao dịch tiêu xài những đồng coin không tồn tại, nửa còn lại thì ngăn họ chi tiêu coin của người khác, và bước thứ hai thì đảm bảo giữ gìn giá trị. Sau đây là những gì diễn ra trong quá trình chuyển tiền. Ví dụ như Jack muốn gửi cho Thiên An 11.7 BTC. Đầu tiên, Jack sẽ tìm kiếm những UTXO mà Jack đang sở hữu ở trên blockchain và tổng những UTXO này phải ít nhất là 11.7 BTC. Thực tế thì Jack không thể lấy ra những UTXO có tổng chính xác là 11.7 BTC, mà ít nhất Jack phải lấy ra ít nhất 12BTC. Ví dụ như Jack sẽ lấy ra 3 UTXO thuộc quyển sở hữu của Jack: 6+4+2=12. Sau đó Jack sẽ tạo ra một giao dịch với 3 inputs là 3 UTXO mới tìm được ở trên blockchain và 2 outputs mới được tạo ra. Bởi vì Jack muốn gửi 11.7 BTC cho Thiên An cho nên output đầu tiên là UTXO với số lượng 11.7BTC và chủ sở hữu là địa chỉ ví của Thiên An. Output số 2 chính là UTXO với số tiền thừa lại 0.3BTC với chủ sở hữu là Jack.

### Khai thác {#mining}

![Các khối Ethereum](./ethereum-blocks.png)

Nếu chúng ta có quyền truy cập tới một tổ chức tập trung đáng tin cậy, thì hệ thống giao dịch này rất dễ dàng được tạo ra. Nó có thể được lập trình chính xác như những gì đã miêu tả ở trên để theo dõi lịch sử giao dịch. Tuy nhiên, chúng ta đang cố gắng xây dựng một mạng lưới tiền tệ phi tập trung ở trên bitcoin, vì thế nên chúng ta cần kết hợp hệ thống ghi chép giao dịch với hệ thống đồng thuận để chắc chắn rằng tất cả mọi người đồng ý về thứ tự của các giao dịch. Cơ chế đồng thuận phi tập trung của Bitcoin cần những máy tính ở trong mạng lưới liên tục cố gắng tạo ra nhiều nhóm, mỗi nhóm bao gồm nhiều giao dịch và những nhóm này được gọi là "blocks". Mạng lưới dự định tạo ra khoảng một khối mỗi mười phút, với mỗi khối chứa một dấu thời gian, một nonce, một tham chiếu đến (tức là, hàm băm của) khối trước đó và danh sách tất cả các giao dịch đã diễn ra kể từ khối trước đó. Dần đà, điều này tạo nên một mạng lưới ngày càng ổn định và phát triển, mạng lưới này liên tục được cập nhật để ghi chép lại những giao dịch mới nhất.

Ở trong mô hình này, thuật toán được dùng để kiểm tra nếu một block là hợp lệ là như sau:

1. Kiểm tra xem hash của block trước đó có tồn tại và hợp lệ.
2. Kiểm tra xem thời gian của block hiện tại nằm sau thời gian của block trước đó<sup>[fn2](#notes)</sup> và thời gian của block hiện tại không được vượt quá 2 giờ so với block trước đó
3. Kiểm tra xem prove of work của block hiện tại là hợp lệ.
4. Đặt `S[0]` là trạng thái ở cuối khối trước đó.
5. Giả sử `TX` là danh sách giao dịch của khối với `n` giao dịch. Đối với tất cả `i` trong `0...n-1`, đặt `S[i+1] = APPLY(S[i],TX[i])` Nếu bất kỳ ứng dụng nào trả về lỗi, hãy thoát và trả về false.
6. Trả về true và đăng ký `S[n]` là trạng thái ở cuối khối này.

Về cơ bản, mỗi giao dịch trong khối phải cung cấp thông tin hợp lệ để blockchain có thể thay đổi từ State cũ sang State mới. Lưu ý rằng State không hề được mã hóa ở trong block; nó đơn giản chỉ là một bản lưu đơn giản được ghi nhớ bởi máy chủ và State của một block chỉ có thể được tính toán bằng cách bắt đầu từ trạng thái ban đầu và lần lượt áp dụng các giao dịch ở trong block đó. Hơn nữa, hãy lưu ý rằng thứ tự của những giao dịch được miners thêm vào là quan trọng; nếu có 2 giao dịch là A và B ở trong một block và giao dịch B sử dụng UTXO tạo ra bởi giao dịch A thì 2 giao dịch này chỉ hợp lệ khi mà giao dịch A xảy ra trước giao dịch B.

Bằng chứng công việc là một tiêu chí mà miner dùng để xác thực giao dịch, và tiêu chí này không có ở trong những hệ thống khác. Điều kiện chính xác là mỗi block đều bị hash 2 lần sử dụng thuật toán SHA256, và chuỗi hash này được xem như là một số chiếm 256 bit, bắt buộc phải nhỏ hơn target. Giá trị của target ở thời điểm hiện tại là 2<sup>187</sup>. Mục đích của việc yêu cầu giá trị của hash nhỏ hơn target là làm cho nó rất khó để tính toán, vì thế ngăn cản những vụ tấn công giả mạo blocks ở trong blockchain. Vì SHA256 được thiết kế để trở thành một hàm giả ngẫu nhiên hoàn toàn không thể đoán trước, cách duy nhất để tạo một khối hợp lệ đơn giản là thử và sai, liên tục tăng nonce và xem hàm băm mới có khớp không.

Với giá trị hiện tại của target là khoảng <sup>187</sup>, mạng lưới cần phải thử lỗi trung bình 2<sup>69</sup> lần trước khi tìm ra số nonce thỏa mãn điều kiện. Nhìn chung, mạng lưới sẽ hiệu chỉnh lại giá trị của target mỗi 2016 blocks để làm cho mỗi block được tạo ra mỗi 10 phút. Để có thể đền bù cho chi phí của miner, thì miner của mỗi block sẽ thêm vào một giao dịch gửi đến địa chỉ ví của họ 25BTC. Hơn nữa, nếu bất kì giao dịch có tổng số tiền ở trong inputs lớn hơn tổng số tiền ở trong output thì số tiền thừa này sẽ được chuyển tới ví của miner và được xem như là phí giao dịch. May mắn là, việc trả tiền cho miner này chính là cách duy nhất mà bitcoin được tạo ra. Khi blockchain mới tạo thành thì không hề có bitcoins nào cả.

Để có thể hiểu rõ hơn mục đích của việc đào bitcoin, thì hãy xem xét lại điều gì sẽ xảy ra khi một hacker muốn tấn công mạng lưới bitcoin. Bởi vì mạng được bitcoin được xem là an toàn, kẻ muốn tấn công mạng lưới sẽ đặt mục tiêu tới nơi mà không được bảo vệ trực tiếp bởi các thuật toán mã hóa, đó chính là thứ tự của những giao dịch. Kế hoạch của kẻ tấn công rất đơn giản:

1. Gửi 100 BTC tới nạn nhân để nhận lấy thứ gì đó (thường là những tài sản điện tử có thể dễ dàng di chuyển)
2. Nhận được hàng hóa từ nạn nhân
3. Tạo ra một giao dịch khác và giao dịch này sẽ gửi 100 BTC tới địa chỉ ví của kẻ tấn công
4. Cố gắng thuyết phục mạng lưới bitcoin rằng giao dịch gửi tới địa chỉ ví của kẻ tấn công xảy ra trước giao dịch gửi tới đuah chỉ ví của nạn nhân.

Một khi bước (1) được hoàn thành, sau ít phút thì những thợ đào sẽ thêm giao dịch vào trong block, ví dụ như block số 270000. Sau 1 giờ thì sẽ có 5 blocks được thêm vào sau block đó, với mỗi block gián tiếp trỏ đến giao dịch đó và xác nhận giao dịch này. Ở thời điểm này, nạn nhân sẽ chấp nhận thanh toán là đã hoàn thành và giao hàng; bởi vì chúng ta giả sử hàng hóa này là điện tử, việc giao hàng là tức thì. Bây giờ, kẻ tấn công sẽ tạo ra một giao dịch khác gửi tới địa chỉ ví của hắn ta. Nếu kẻ tấn công chỉ đơn giản là tung nó ra, giao dịch sẽ không được xử lý; các thợ đào sẽ cố gắng chạy `APPLY(S,TX)` và nhận thấy rằng `TX` tiêu thụ một UTXO không còn trong trạng thái đó nữa. Thay vì như vậy, kẻ tấn công tạo ra một bản sao của blockchain, bắt đầu đào kể từ bản sao này và sử dụng một phiên bản khác của block thứ 270000 và block này trỏ tới block trước đó là 269999. Block thứ 2700000 sẽ được thêm vào những giao dịch mà kẻ tấn công muốn thêm vào. Bởi vì dữ liệu ở trong block 270000 bị thay đổi, cho nên kẻ tấn công phải hoàn thành bằng chứng công việc một lần nữa. Hơn nữa, phiên bản mới của block thứ 270000 sẽ có hash khác với phiên bản gốc, vì thế cho nên block 270001 tới block 270005 không trỏ tới block của kẻ ấn công; vì thế, blockchain gốc và blockchain của kẻ tấn công hoàn toàn riêng biệt. Quy tắc của blockchain là nó sẽ chọn chuỗi dài nhất cho nên trong khi những người thợ đào trung thực đang xác thực ở block thứ 270005, kẻ tấn công lại đang xác thực cho block thứ 270000. Để làm cho chuỗi của kẻ tấn công dài nhất, hệ thống máy đào của hắn ta phải có sức tính toán mạnh hơn so với tất cả những thợ đào trung thực còn lại. Nếu điều này là sự thật, hắn có thể tấn công mạng lưới bitcoin, và cách tấn công này được gọi là 51% attack.

### Cây Merkle {#merkle-trees}

![SPV trong Bitcoin](./spv-bitcoin.png)

_Nhánh bên trái: đủ để đại diện cho một nhóm nhỏ các node ở trong cây Merkle để đưa ra bằng chứng cho tính đúng đắng của nhánh._

_Nhánh bên phải: khi thay đổi bất kì phần nào của cây Merkle sẽ dẫn tới sự sai trái ở đâu đó ở trong chuỗi._

Một tính năng quan trọng giúp cho Bitcoin có thể mở rộng đó là block được lưu trữ theo cấu trúc dữ liệu đa cấp. Hash của một block chỉ là hash của header của block đó, chỉ khoảng 200 byte dữ liệu bao gồm thời gian, số nonce, hash của block trước đó, và root hash của cấu trúc dữ liệu được gọi là cây Merkle, nơi mà tất cả các giao dịch được lưu trữ. Với root hash của cây Merkle, thợ đào có thể dễ dàng truy xuất tới giao dịch ở trong block. Cây Merkle là một loại của cây nhị phân, bao gồm tập hợp của nhiều node nằm dưới với lượng lớn các leaf node chứa dữ liệu, và một tập hợp các node nằm giữa và mỗi node là hash của 2 node con, và cuối cùng là một root node, cũng là hash của 2 node con, là nơi bắt đầu của cây. Mục đích của cây Merkle là cho phép dữ liệu ở trong block được phân phối từng phần nhỏ: một node có thể tải xuống header của một block từ một nguồn, và một phần nhỏ cây Merkle liên quan tới chúng từ một nguồn khác, và vẫn đảm bảo được tất cả dữ liệu là đúng. Cách làm này đúng là bởi vì những hash được mã hóa từ dưới lên trên: nếu như một kẻ tấn công cố gắng thay đổi một giao dịch ở dưỡi cùng của cây Merkle thì những thay đổi này sẽ tạo ra thay đổi của tất cả các node ở trên nó, và cuối cùng sẽ thay đổi luôn root của cây, vì thế hash của một block làm cho protocol nhận thấy nó là block hoàn toàn khác (đồng nghĩa với việc proof of work là không đúng).

Protocol của cây Merkle là cần thiết cho sự ổn định lâu dài. Một node đầy đủ ở trong mạng lưới bitcoin, chỉ lưu trữ và xử lý toàn bộ mỗi block, sẽ chiếm khoảng 15GB dung lượng đĩa vào tháng 4 năm 2015, và tăng lên 1GB mỗi tháng. Hiện tại, chỉ có thể dùng máy tính và không thể dùng điện thoại, và ở trong tương lai chỉ có những doanh nghiệp và người có sở thích này mới có thể tham gia. Một protocol được biết đến như là "công cụ xác thực thanh toán" cho phép một loại node khác có thể tồn tại, được gọi là "light nodes", thứ mà chỉ tải về header của blocks, xác thực bằng chứng công việc chỉ sử dụng headers và chỉ tải về nhánh liên quan tới những giao dịch mà chúng phải xử lý. Điều này cho phép light nodes biết trạng thái và số dư của bất kì giao dịch nào một cách bảo mật, trong khi chỉ cần tải về một phần nhỏ của toàn bộ blockchain.

### Các ứng dụng chuỗi khối thay thế {#alternative-blockchain-applications}

Ý tưởng về việc sử dụng ý tưởng của blockchain và ứng dụng nó cho những lý niệm khác có một lịch sử lâu dài. Năm 2005, Nick Szabo đã đưa ra khái niệm "[chứng thư sở hữu an toàn với thẩm quyền của chủ sở hữu](https://nakamotoinstitute.org/library/secure-property-titles/)", một tài liệu mô tả cách "những tiến bộ mới trong công nghệ cơ sở dữ liệu nhân bản" sẽ cho phép một hệ thống dựa trên chuỗi khối để lưu trữ sổ đăng ký về việc ai sở hữu đất đai nào, tạo ra một khuôn khổ phức tạp bao gồm các khái niệm như khai khẩn, chiếm hữu bất lợi và thuế đất Georgia. Tuy nhiên, không may là không có hệ thống sao chép dữ liệu nào hoạt động hiệu quả ở thời điểm đó, vì thế mà protocol chưa bao giờ được ứng dụng ở trong thực tiễn. Tuy nhiên là sau năm 2009, một khi hệ thống đồng thuận phi tập trung của Bitcoin được xây dựng thì số lượng những ứng dụng tương tự tăng lên một cách nhanh chóng.

- **Namecoin** - được tạo ra vào năm 2010, [Namecoin](https://namecoin.org/) được mô tả tốt nhất như một cơ sở dữ liệu đăng ký tên phi tập trung. Trong các giao thức phi tập trung như Tor, Bitcoin và BitMessage, cần có một cách nào đó để xác định tài khoản để người khác có thể tương tác với chúng, nhưng trong tất cả các giải pháp hiện có, loại định danh duy nhất có sẵn là một hàm băm giả ngẫu nhiên như `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Nhưng cách tốt nhất là vẫn là có thể tạo ra những tài khoản với tên như là "George". Tuy nhiên, vấn đề là nếu như một người có thể tạo tài khoản với tên George thì những người khác cũng có thể tạo ra tài khoản tên George và mạo danh người khác. Giải pháp duy nhất là chỉ chấp nhận người đầu tiên đăng kí tài khoản và trả về lỗi nếu những người sau đó dùng trùng tên - một giải pháp hoàn hảo cho giao thức đồng thuận của Bitcoin. Namecoin là lâu đời nhất và thành công nhất trong việc áp dụng hệ thống đăng ký tên sử dụng ý tưởng này.
- **Colored coins** - mục đích của [colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) là đóng vai trò như một giao thức cho phép mọi người tạo ra các loại tiền kỹ thuật số của riêng họ - hoặc, trong trường hợp nhỏ quan trọng của một loại tiền tệ có một đơn vị, là các token kỹ thuật số, trên chuỗi khối Bitcoin. Ở trong giao thức của Colored Coins, một người tạo ra đòng coin mới bằng cách gán một màu sắc vào một UTXO của Bitcoin, và giao thức này liên tục gán màu sắc của những UTXO khác để chúng có cùng màu sắc với inputs của giao dịch mà chúng đã sử dụng. Điều này cho phép người dùng quản lý địa chỉ ví mà chỉ có UTXO có một loại màu sắc và gửi chúng đi như là Bitcoin, truy tìm ở trong blockchain để xác định màu sắc của bất kì UTXO mà họ nhận được.
- **Metacoins** - ý tưởng đằng sau một metacoin là có một giao thức hoạt động trên Bitcoin, sử dụng các giao dịch Bitcoin để lưu trữ các giao dịch metacoin nhưng có một hàm chuyển đổi trạng thái khác, `APPLY'`. Bởi vì giao thức metacoin không thể ngăn chặn các giao dịch metacoin không hợp lệ xuất hiện trong chuỗi khối Bitcoin, một quy tắc được thêm vào rằng nếu `APPLY'(S,TX)` trả về một lỗi, giao thức sẽ mặc định là `APPLY'(S,TX) = S`. Điều này cung cấp một cách thức cho việc tạo ra bất kì một giao thức tiền điện tử nào, có khả năng kết hợp với những tính năng cao cấp mà không có thể thực hiện được ở trong bản thân của Bitcoin, nhưng với chi phí nhỏ cho việc xây dựng bởi vì sự phức tạp của việc đào và mạng lưới đã được xử lý bởi giao thức của Bitcoin. Metacoins đã được sử dụng để thực hiện một số loại hợp đồng tài chính, đăng ký tên miền và sàn phi tập trung.

Vì thế, nhìn chung thì có 2 cách tiếp cận trong việc tạo ra một giao thức đồng thuận: tạo ra một mạng lưới hoàn toàn riêng biệt hoặc là tạo ra một mạng lưới mới sử dụng mạng lưới Bitcoin như là nền tảng. Cách tiếp cận đầu tiên, mặc dù có những ứng dụng thành công như là Namecoin, nhưng lại khó để thực hiện; mỗi một ứng dụng đều phải bắt đầu một blockchain độc lập, cũng như là xây dựng và kiểm tra tất các sự thay đổi của State và Networking code. Hơn nữa, chúng tôi dự đoán rằng những ứng dụng dành cho công nghệ đồng thuận phi tập trung sẽ tuân theo luật phân phối nơi mà phần lớn các ứng dụng sẽ là quá nhỏ để đảm bảo mạng lưới của chúng, và chúng tôi lưu ý rằng những ứng dụng phi tập trung lớn, đặc biệt là những ứng dụng phi tập trung chạy tự động, cần phải tương tác với nhau.

Mặt khác, với cách tiếp cận sử dụng Bitcoin như một nền tảng, có một lỗ hổng đó là nó không kế thừa tính năng cách xác nhận thanh toán của Bitcoin. "Simplified payment verification" chạy tốt với Bitcoin bởi vì nó có thể sử dụng chiều sâu của blockchain như là một trạm trung chuyển cho việc xác thực; một thời điểm nào đó, khi mà truy vấn những giao dịch ở trong quá khứ đủ xa, thì có thể khẳng định rằng những giao dịch này là đúng đắn. Mặt khác, khi tạo ra một blockchain mới, không thể thêm vào blockchain này những giao dịch không hợp lệ trong khuôn khổ giao thức của blockchain này. Vì vậy, để thực thi SPV một cách an toàn cần phải truy vấn và kiểm tra tất cả các giao dịch bắt đầu từ giao dịch đầu tiên để xác minh rằng một giao dịch là hợp lệ hay không. Hiện tại, tất cả các phiên bản sử dụng Bitcoin như là nền tảng đều phụ thuộc vào một máy chủ tin cậy để cung cấp dữ liệu, có thể cho rằng những kết quả trả về là không tối ưu bởi vì mục tiêu cốt lõi của tiền điện tử là loại bỏ sự cần thiết của sự tin tưởng.

### Scripting {#scripting}

Giao thức hiện tại của Bitcoin thực ra cũng sử dụng một phiên bản tinh gọn của "hợp đồng thông minh". UTXO của Bitcoin không chỉ có thể được sở hữu bởi public key, nó còn có thể được sở hữu bởi những mã nguồn được viết ra sử dụng ngôn ngữ lập trình Stack. Ở trong mô hình này, một giao dịch muốn sử dụng một UTXO thì cần phải cung cấp dữ liệu thỏa mãn mã nguồn này. Thực ra, xác định quyền sở hữu dựa theo public key cũng sử dụng mã nguồn: mã nguồn sử dụng chữ ký số đường cong Elipptic làm đầu vào, dùng nó để xác minh giao dịch và địa chỉ ví sử dụng UTXO, và trả về 1 nếu như xác nhận thành công và trả về 0 nếu ngược lại. Hơn nữa, nếu phức tạp hơn, mã nguồn được sử dụng cho những ứng dụng khác nhau. Ví dụ như, một người có thể tạo ra mã nguồn cần có chữ kí từ 2 trong 3 private key để có thể xác thực (multisig), một thiết lập có lợi cho những tài khoản doanh nghiệp, tài khoản tiết kiệm an toàn, và một số tình huống của con buôn. Mã nguồn còn có thể được sử dụng để trả thưởng cho những ai tìm được đáp án cho một vấn đề cần tính toán, và một người cùng có thể viết mã nguồn như kiểu "Bitcoin UTXO này là của bạn nếu như bạn gửi một số lượng Dogecoin cho tôi", về cơ bản điều này cho phép giao dịch nhiều loại tiền điện tử một cách phi tập trung.

Tuy nhiên, ngôn ngữ lập trình mà Bitcoin sử dụng có một số giới hạn nhất định:

- **Thiếu tính đầy đủ Turing** - nghĩa là, mặc dù có một tập hợp con lớn các phép tính mà ngôn ngữ kịch bản Bitcoin hỗ trợ, nó gần như không hỗ trợ mọi thứ. Phần thiếu sót lớn nhất ở đây là không có vòng lặp. Đó là bởi vì điều này giúp cho tránh khỏi những vòng lặp vô hạn khi xác thực giao dịch; về lý thuyết thì đây trở này cũng có thể bị vượt qua bởi các lập trình viên, bởi vì bất kì một vòng lặp nào cũng có thể viết mã nguồn lặp lại với từ khóa if, nhưng điều này khiến cho mã nguồn tốn nhiều dung lượng để lưu trữ. Ví dụ như, để có thể thực hiện một thuật toán khác thay vì Elliptic thì cần phải có 256 lần thực hiện phép nhân và mỗi phép nhân đều cần phải viết mã nguồn lặp lại.
- **Thiếu nhận biết giá trị** - không có cách nào để một tập lệnh UTXO có thể cung cấp khả năng kiểm soát chi tiết đối với số tiền có thể được rút. Ví dụ như, một trường hợp quan trọng đó là một hợp đồng orcale để phòng ngừa rủi ro, khi mà A và B gửi vào 1000$ BTC và sau 30 ngày mã nguồn sẽ gửi 1000$ tới A và phần còn lại tới B. Mặc dù có một sự cải tiến lớn về khía cạnh tin tưởng và yêu cầu về cơ sở hạ tầng, việc này cũng cần oracle phải xác định được giá trị hiện tại của 1 BTC với đơn vị USD. Hiện tại BTC blockchain không biết 1BTC giá bao nhiêu USD. Tuy nhiên, vì UTXO là tất cả hoặc không có gì, cách duy nhất để đạt được điều này là thông qua một cách hack rất kém hiệu quả là có nhiều UTXO với các mệnh giá khác nhau (ví dụ: một UTXO của 2<sup>k</sup> cho mỗi k lên đến 30) và để oracle chọn UTXO nào để gửi cho A và UTXO nào để gửi cho B.
- **Thiếu trạng thái** - UTXO có thể đã được chi tiêu hoặc chưa được chi tiêu; không có cơ hội cho các hợp đồng hoặc kịch bản nhiều giai đoạn giữ bất kỳ trạng thái nội bộ nào khác ngoài trạng thái đó. Điều này gây khó khăn cho việc thực hiện các hợp đồng quyền chọn nhiều giai đoạn, cung cấp trao đổi phi tập trung hoặc các giao thức cam kết mật mã hai giai đoạn (cần thiết cho sự an toàn khi tính toán tiền thưởng). Điều này có nghĩa là UTXO chỉ có thể sử dụng để xây dựng các hợp đơn giản, đơn nhất và không thể dùng cho những hợp đồng có nhiều trạng thái phức tạp như là các tổ chức phi tập trung và làm cho các giao thức khó thực hiện. Trạng thái nhị phân (sử dụng hoặc chưa sử dụng) kết hợp với mù giá trị có nghĩa không thể nào áp dụng cho một ứng dụng quan trọng khác, giới hạn rút tiền.
- **Thiếu nhận biết chuỗi khối** - UTXO không nhận biết được dữ liệu chuỗi khối như nonce, dấu thời gian và hàm băm của khối trước đó. Điều này hoàn toàn hạn chế những ứng dụng như là các cược và những loại khác bởi vì thiếu đi ngôn ngữ lập trình có khác năng tạo ra những số ngẫu nhiên.

Vì thế, chúng ta đã thấy 3 cách để xây dựng một ứng dụng nâng cao cho một tiền điện tử: xây dựng một blockchain mới, sử dụng mã nguồn ở trong Bitcoin và xây dựng một giao thức mới sử dụng Bitcoin làm nền tảng. Xây dựng một blockchain mới cho phép sự tư do trong việc xây dựng tổ hợp các tính năng, nhưng lại tốn nhiều thời gian lập trình, bắt đầu từ đầu và mức độ an toàn. Sử dụng mã nguồn thì dễ để áp dụng và là tiêu chuẩn nhưng lại giới hạn về khả năng; còn giao thức thừa kế thì mặc dù dễ nhưng lại khó có thể mở rộng. Với Ethereum, chúng tôi có định hướng là xây dựng một framework mới, thứ mà có thể đem lại nhiều lợi ích khi lập trình cũng như có những thuộc tính nhẹ hơn, cùng lúc đó cho phép những ứng dụng cho thể chia sẻ một môi trường kinh tế và một blockchain bảo mật.

## Ethereum {#ethereum}

Mục đích của Ethereum là tạo ra một giao thức thay thế để xây dựng các ứng dụng phi tập trung, cung cấp một bộ đánh đổi khác mà chúng tôi tin rằng sẽ rất hữu ích cho một lớp lớn các ứng dụng phi tập trung, đặc biệt nhấn mạnh vào các tình huống mà thời gian phát triển nhanh, bảo mật cho các ứng dụng nhỏ và ít được sử dụng, và khả năng tương tác rất hiệu quả của các ứng dụng khác nhau là quan trọng. Ethereum thực hiện điều này bằng cách xây dựng một thứ về cơ bản là lớp nền tảng trừu tượng cuối cùng: một chuỗi khối với một ngôn ngữ lập trình đầy đủ Turing tích hợp sẵn, cho phép bất kỳ ai viết hợp đồng thông minh và các ứng dụng phi tập trung nơi họ có thể tạo ra các quy tắc tùy ý của riêng mình cho quyền sở hữu, định dạng giao dịch và các hàm chuyển đổi trạng thái. Một phiên bản cơ bản của Namecoin có thể được viết trong hai dòng mã, và các giao thức khác như tiền tệ và hệ thống danh tiếng có thể được xây dựng trong vòng chưa đến hai mươi dòng. Các hợp đồng thông minh, các "hộp" mật mã chứa giá trị và chỉ mở khóa nó nếu các điều kiện nhất định được đáp ứng, cũng có thể được xây dựng trên nền tảng này, với sức mạnh lớn hơn nhiều so với những gì kịch bản Bitcoin cung cấp nhờ vào sức mạnh bổ sung của tính đầy đủ Turing, khả năng nhận biết giá trị, khả năng nhận biết chuỗi khối và trạng thái.

### Các tài khoản Ethereum {#ethereum-accounts}

Trong Ethereum, trạng thái bao gồm các đối tượng được gọi là "tài khoản", với mỗi tài khoản có một địa chỉ 20-byte và các chuyển đổi trạng thái là các lần chuyển giá trị và thông tin trực tiếp giữa các tài khoản. Một tài khoản Ethereum chứa bốn trường:

- **Nonce**, một bộ đếm được sử dụng để đảm bảo mỗi giao dịch chỉ có thể được xử lý một lần
- **Số dư ether** hiện tại của tài khoản
- **Mã hợp đồng** của tài khoản, nếu có
- **Bộ nhớ lưu trữ** của tài khoản (mặc định là trống)

"Ether" là nhiên liệu mã hóa nội bộ chính của Ethereum, và được sử dụng để trả phí giao dịch. Nói chung, có hai loại tài khoản: **tài khoản sở hữu bên ngoài**, được kiểm soát bởi các khóa riêng tư, và **tài khoản hợp đồng**, được kiểm soát bởi mã hợp đồng của chúng. Một tài khoản sở hữu bên ngoài không có mã, và người ta có thể gửi tin nhắn từ một tài khoản sở hữu bên ngoài bằng cách tạo và ký một giao dịch; trong một tài khoản hợp đồng, mỗi khi tài khoản hợp đồng nhận được một tin nhắn, mã của nó sẽ được kích hoạt, cho phép nó đọc và ghi vào bộ nhớ lưu trữ nội bộ và gửi các tin nhắn khác hoặc tạo hợp đồng.

Lưu ý rằng "hợp đồng" trong Ethereum không nên được xem như một thứ gì đó cần được "hoàn thành" hoặc "tuân thủ"; thay vào đó, chúng giống như các "tác nhân tự trị" sống bên trong môi trường thực thi của Ethereum, luôn thực thi một đoạn mã cụ thể khi được "chọc" bởi một tin nhắn hoặc giao dịch, và có quyền kiểm soát trực tiếp đối với số dư ether của chính chúng và kho lưu trữ khóa/giá trị của riêng chúng để theo dõi các biến số bền vững.

### Tin nhắn và Giao dịch {#messages-and-transactions}

Thuật ngữ "giao dịch" được sử dụng trong Ethereum để chỉ gói dữ liệu đã ký lưu trữ một tin nhắn được gửi từ một tài khoản sở hữu bên ngoài. Các giao dịch chứa:

- Người nhận tin nhắn
- Một chữ ký xác định người gửi
- Số lượng ether cần chuyển từ người gửi đến người nhận
- Một trường dữ liệu tùy chọn
- Một giá trị `STARTGAS`, đại diện cho số bước tính toán tối đa mà việc thực thi giao dịch được phép thực hiện
- Một giá trị `GASPRICE`, đại diện cho khoản phí mà người gửi trả cho mỗi bước tính toán

Ba trường đầu tiên là các trường tiêu chuẩn được mong đợi trong bất kỳ loại tiền mã hóa nào. Trường dữ liệu không có chức năng theo mặc định, nhưng máy ảo có một mã opcode mà hợp đồng có thể sử dụng để truy cập dữ liệu; ví dụ, nếu một hợp đồng hoạt động như một dịch vụ đăng ký tên miền trên chuỗi khối, nó có thể muốn diễn giải dữ liệu được truyền đến nó như chứa hai "trường", trường đầu tiên là tên miền cần đăng ký và trường thứ hai là địa chỉ IP để đăng ký.  Hợp đồng sẽ đọc các giá trị này từ dữ liệu tin nhắn và đặt chúng vào bộ nhớ lưu trữ một cách thích hợp.

Các trường `STARTGAS` và `GASPRICE` rất quan trọng đối với mô hình chống tấn công từ chối dịch vụ của Ethereum. Để ngăn chặn các vòng lặp vô hạn vô tình hoặc có chủ ý hoặc lãng phí tính toán khác trong mã, mỗi giao dịch được yêu cầu đặt một giới hạn về số bước tính toán thực thi mã mà nó có thể sử dụng. Đơn vị tính toán cơ bản là "gas"; thông thường, một bước tính toán tốn 1 gas, nhưng một số hoạt động tốn nhiều gas hơn vì chúng tốn kém hơn về mặt tính toán, hoặc làm tăng lượng dữ liệu phải được lưu trữ như một phần của trạng thái. Cũng có một khoản phí 5 gas cho mỗi byte trong dữ liệu giao dịch. Mục đích của hệ thống phí là yêu cầu kẻ tấn công phải trả tương ứng cho mọi tài nguyên mà họ tiêu thụ, bao gồm tính toán, băng thông và bộ nhớ lưu trữ; do đó, bất kỳ giao dịch nào dẫn đến việc mạng lưới tiêu thụ một lượng lớn hơn bất kỳ tài nguyên nào trong số này đều phải có một khoản phí gas gần như tỷ lệ thuận với sự gia tăng đó.

### Tin nhắn {#messages}

Các hợp đồng có khả năng gửi "tin nhắn" đến các hợp đồng khác. Tin nhắn là các đối tượng ảo không bao giờ được tuần tự hóa và chỉ tồn tại trong môi trường thực thi Ethereum. Một tin nhắn chứa:

- Người gửi tin nhắn (ngầm định)
- Người nhận tin nhắn
- Số lượng ether để chuyển cùng với tin nhắn
- Một trường dữ liệu tùy chọn
- Một giá trị `STARTGAS`

Về cơ bản, một tin nhắn giống như một giao dịch, ngoại trừ việc nó được tạo ra bởi một hợp đồng chứ không phải một tác nhân bên ngoài. Một tin nhắn được tạo ra khi một hợp đồng đang thực thi mã thực thi mã opcode `CALL`, mã này tạo ra và thực thi một tin nhắn. Giống như một giao dịch, một tin nhắn dẫn đến việc tài khoản người nhận chạy mã của nó. Do đó, các hợp đồng có thể có mối quan hệ với các hợp đồng khác theo cách hoàn toàn giống như các tác nhân bên ngoài có thể làm.

Lưu ý rằng lượng gas được phân bổ bởi một giao dịch hoặc hợp đồng áp dụng cho tổng lượng gas được tiêu thụ bởi giao dịch đó và tất cả các lần thực thi phụ. Ví dụ, nếu một tác nhân bên ngoài A gửi một giao dịch đến B với 1000 gas, và B tiêu thụ 600 gas trước khi gửi một tin nhắn đến C, và việc thực thi nội bộ của C tiêu thụ 300 gas trước khi trả về, thì B có thể chi tiêu thêm 100 gas nữa trước khi hết gas.

### Hàm chuyển đổi trạng thái Ethereum {#ethereum-state-transition-function}

![Chuyển đổi trạng thái Ether](./ether-state-transition.png)

Hàm chuyển đổi trạng thái Ethereum, `APPLY(S,TX) -> S'` có thể được định nghĩa như sau:

1. Kiểm tra xem giao dịch có được định dạng đúng hay không (tức là có đúng số lượng giá trị), chữ ký có hợp lệ không và nonce có khớp với nonce trong tài khoản của người gửi không. Nếu không, trả về một lỗi.
2. Tính phí giao dịch là `STARTGAS * GASPRICE`, và xác định địa chỉ gửi từ chữ ký. Trừ phí khỏi số dư tài khoản của người gửi và tăng nonce của người gửi. Nếu không đủ số dư để chi tiêu, trả về một lỗi.
3. Khởi tạo `GAS = STARTGAS`, và trừ đi một lượng gas nhất định cho mỗi byte để trả cho các byte trong giao dịch.
4. Chuyển giá trị giao dịch từ tài khoản của người gửi sang tài khoản nhận. Nếu tài khoản nhận chưa tồn tại, hãy tạo nó. Nếu tài khoản nhận là một hợp đồng, hãy chạy mã của hợp đồng cho đến khi hoàn thành hoặc cho đến khi việc thực thi hết gas.
5. Nếu việc chuyển giá trị không thành công vì người gửi không có đủ tiền, hoặc việc thực thi mã hết gas, hãy hoàn nguyên tất cả các thay đổi trạng thái ngoại trừ việc thanh toán phí, và thêm phí vào tài khoản của thợ đào.
6. Nếu không, hoàn lại phí cho tất cả gas còn lại cho người gửi, và gửi phí đã trả cho gas đã tiêu thụ cho thợ đào.

Ví dụ, giả sử mã của hợp đồng là:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Lưu ý rằng trong thực tế, mã hợp đồng được viết bằng ngôn ngữ EVM cấp thấp; ví dụ này được viết bằng Serpent, một trong những ngôn ngữ cấp cao của chúng tôi, để cho rõ ràng, và có thể được biên dịch xuống mã EVM. Giả sử bộ nhớ lưu trữ của hợp đồng ban đầu trống, và một giao dịch được gửi với giá trị 10 ether, 2000 gas, giá gas 0,001 ether, và 64 byte dữ liệu, với các byte 0-31 đại diện cho số `2` và các byte 32-63 đại diện cho chuỗi `CHARLIE`. Quá trình cho hàm chuyển đổi trạng thái trong trường hợp này như sau:

1. Kiểm tra xem giao dịch có hợp lệ và được định dạng tốt hay không.
2. Kiểm tra xem người gửi giao dịch có ít nhất 2000 \* 0,001 = 2 ether hay không. Nếu có, thì trừ 2 ether khỏi tài khoản của người gửi.
3. Khởi tạo gas = 2000; giả sử giao dịch dài 170 byte và phí byte là 5, trừ đi 850 để còn lại 1150 gas.
4. Trừ thêm 10 ether khỏi tài khoản của người gửi, và cộng nó vào tài khoản của hợp đồng.
5. Chạy mã. Trong trường hợp này, điều này đơn giản: nó kiểm tra xem bộ nhớ lưu trữ của hợp đồng tại chỉ mục `2` có được sử dụng hay không, nhận thấy rằng không, và vì vậy nó đặt bộ nhớ lưu trữ tại chỉ mục `2` thành giá trị `CHARLIE`. Giả sử điều này tốn 187 gas, vì vậy lượng gas còn lại là 1150 - 187 = 963
6. Cộng 963 \* 0,001 = 0,963 ether trở lại tài khoản của người gửi, và trả về trạng thái kết quả.

Nếu không có hợp đồng ở đầu nhận của giao dịch, thì tổng phí giao dịch sẽ đơn giản bằng `GASPRICE` được cung cấp nhân với độ dài của giao dịch theo byte, và dữ liệu được gửi cùng với giao dịch sẽ không liên quan.

Lưu ý rằng các tin nhắn hoạt động tương đương với các giao dịch về mặt hoàn nguyên: nếu một lần thực thi tin nhắn hết gas, thì lần thực thi của tin nhắn đó, và tất cả các lần thực thi khác được kích hoạt bởi lần thực thi đó, sẽ hoàn nguyên, nhưng các lần thực thi mẹ không cần phải hoàn nguyên. Điều này có nghĩa là "an toàn" cho một hợp đồng để gọi một hợp đồng khác, vì nếu A gọi B với G gas thì việc thực thi của A được đảm bảo sẽ mất tối đa G gas. Cuối cùng, lưu ý rằng có một mã opcode, `CREATE`, tạo ra một hợp đồng; cơ chế thực thi của nó thường tương tự như `CALL`, với ngoại lệ là đầu ra của việc thực thi xác định mã của một hợp đồng mới được tạo.

### Thực thi mã {#code-execution}

Mã trong các hợp đồng Ethereum được viết bằng một ngôn ngữ bytecode cấp thấp, dựa trên ngăn xếp, được gọi là "mã máy ảo Ethereum" hoặc "mã EVM". Mã bao gồm một chuỗi các byte, trong đó mỗi byte đại diện cho một hoạt động. Nói chung, việc thực thi mã là một vòng lặp vô hạn bao gồm việc thực hiện lặp đi lặp lại hoạt động tại bộ đếm chương trình hiện tại (bắt đầu từ 0) và sau đó tăng bộ đếm chương trình lên một, cho đến khi đến cuối mã hoặc một lỗi hoặc lệnh `STOP` hoặc `RETURN` được phát hiện. Các hoạt động có quyền truy cập vào ba loại không gian để lưu trữ dữ liệu:

- **Ngăn xếp**, một bộ chứa vào sau-ra trước mà các giá trị có thể được đẩy vào và lấy ra
- **Bộ nhớ**, một mảng byte có thể mở rộng vô hạn
- **Bộ nhớ lưu trữ** dài hạn của hợp đồng, một kho lưu trữ khóa/giá trị. Không giống như ngăn xếp và bộ nhớ, được đặt lại sau khi tính toán kết thúc, bộ nhớ lưu trữ tồn tại lâu dài.

Mã cũng có thể truy cập giá trị, người gửi và dữ liệu của tin nhắn đến, cũng như dữ liệu tiêu đề khối, và mã cũng có thể trả về một mảng byte dữ liệu làm đầu ra.

Mô hình thực thi chính thức của mã EVM đơn giản một cách đáng ngạc nhiên. Trong khi máy ảo Ethereum đang chạy, trạng thái tính toán đầy đủ của nó có thể được định nghĩa bằng bộ `(block_state, transaction, message, code, memory, stack, pc, gas)`, trong đó `block_state` là trạng thái toàn cục chứa tất cả các tài khoản và bao gồm số dư và bộ nhớ lưu trữ. Khi bắt đầu mỗi vòng thực thi, lệnh hiện tại được tìm thấy bằng cách lấy byte thứ `pc` của `code` (hoặc 0 nếu `pc >= len(code)`), và mỗi lệnh có định nghĩa riêng về cách nó ảnh hưởng đến bộ. Ví dụ, `ADD` lấy hai mục ra khỏi ngăn xếp và đẩy tổng của chúng vào, giảm `gas` đi 1 và tăng `pc` lên 1, và `SSTORE` lấy hai mục trên cùng ra khỏi ngăn xếp và chèn mục thứ hai vào bộ nhớ lưu trữ của hợp đồng tại chỉ mục được chỉ định bởi mục đầu tiên. Mặc dù có nhiều cách để tối ưu hóa việc thực thi máy ảo Ethereum thông qua biên dịch just-in-time, một triển khai cơ bản của Ethereum có thể được thực hiện trong vài trăm dòng mã.

### Chuỗi khối và khai thác {#blockchain-and-mining}

![Sơ đồ áp dụng khối Ethereum](./ethereum-apply-block-diagram.png)

Chuỗi khối Ethereum giống chuỗi khối Bitcoin ở nhiều điểm, tuy nhiên cũng có vài khác biệt. Điểm khác biệt chính giữa Ethereum và Bitcoin khi nói về kiến trúc chuỗi khối là, không như Bitcoin, các khối của Ethereum bao gồm một bản sao chép của cả danh sách giao dịch lẫn trạng thái mới nhất. Ngoài ra, hai giá trị khác, số khối và độ khó, cũng được lưu trữ trong khối. Thuật toán xác thực khối cơ bản của Ethereum như sau:

1. Kiểm tra xem khối trước đó được tham chiếu có tồn tại và hợp lệ hay không.
2. Kiểm tra xem dấu thời gian của khối có lớn hơn dấu thời gian của khối trước đó được tham chiếu và nhỏ hơn 15 phút trong tương lai hay không
3. Kiểm tra xem số khối, độ khó, gốc giao dịch, gốc chú và giới hạn gas (các khái niệm cấp thấp khác nhau của Ethereum) có hợp lệ không.
4. Kiểm tra xem prove of work của block hiện tại là hợp lệ.
5. Đặt `S[0]` là trạng thái ở cuối khối trước đó.
6. Đặt `TX` là danh sách giao dịch của khối, với `n` giao dịch. Đối với tất cả `i` trong `0...n-1`, đặt `S[i+1] = APPLY(S[i],TX[i])`. Nếu bất kỳ ứng dụng nào trả về lỗi, hoặc nếu tổng gas tiêu thụ trong khối cho đến thời điểm này vượt quá `GASLIMIT`, trả về một lỗi.
7. Đặt `S_FINAL` là `S[n]`, nhưng cộng thêm phần thưởng khối được trả cho thợ đào.
8. Kiểm tra xem gốc cây Merkle của trạng thái `S_FINAL` có bằng với gốc trạng thái cuối cùng được cung cấp trong tiêu đề khối hay không. Nếu có, khối là hợp lệ; nếu không, nó không hợp lệ.

Phương pháp tiếp cận này có vẻ rất kém hiệu quả lúc đầu, vì nó cần lưu trữ toàn bộ trạng thái với mỗi khối, nhưng trong thực tế, hiệu quả sẽ tương đương với Bitcoin. Lý do là trạng thái được lưu trữ trong cấu trúc cây, và sau mỗi khối chỉ một phần nhỏ của cây cần được thay đổi. Do đó, nói chung, giữa hai khối liền kề, phần lớn cây sẽ giống nhau, và do đó dữ liệu có thể được lưu trữ một lần và được tham chiếu hai lần bằng cách sử dụng con trỏ (tức là, các hàm băm của các cây con). Một loại cây đặc biệt được gọi là "cây Patricia" được sử dụng để thực hiện điều này, bao gồm một sửa đổi cho khái niệm cây Merkle cho phép các nút được chèn và xóa, chứ không chỉ được thay đổi, một cách hiệu quả. Ngoài ra, vì tất cả thông tin trạng thái là một phần của khối cuối cùng, không cần phải lưu trữ toàn bộ lịch sử chuỗi khối - một chiến lược mà, nếu có thể được áp dụng cho Bitcoin, có thể được tính toán để tiết kiệm không gian từ 5-20 lần.

Một câu hỏi thường được hỏi là mã hợp đồng được thực thi "ở đâu", về mặt phần cứng vật lý. Điều này có một câu trả lời đơn giản: quá trình thực thi mã hợp đồng là một phần của định nghĩa hàm chuyển đổi trạng thái, là một phần của thuật toán xác thực khối, vì vậy nếu một giao dịch được thêm vào khối `B`, việc thực thi mã do giao dịch đó sinh ra sẽ được thực thi bởi tất cả các nút, bây giờ và trong tương lai, tải xuống và xác thực khối `B`.

## Ứng dụng {#applications}

Nhìn chung, có ba loại ứng dụng xây dựng dựa trên Ethereum. Phân loại đầu tiên là các ứng dụng tài chính, cung cấp cho người dùng với nhiều cách quản lý và ký kết hợp đồng với tiền của mình. Điều này bao gồm các loại tiền tệ phụ, các công cụ phái sinh tài chính, hợp đồng phòng hộ, ví tiết kiệm, di chúc và cuối cùng ngay cả một số loại hợp đồng lao động toàn diện. Loại thứ hai là các ứng dụng bán tài chính, nơi tiền bạc có liên quan nhưng cũng có một khía cạnh phi tiền tệ nặng nề trong những gì đang được thực hiện; một ví dụ hoàn hảo là các khoản tiền thưởng tự thực thi cho các giải pháp cho các vấn đề tính toán. Cuối cùng, có những ứng dụng như bỏ phiếu trực tuyến và quản trị phi tập trung hoàn toàn không mang tính tài chính.

### Hệ thống Token {#token-systems}

Các hệ thống token trên chuỗi khối có nhiều ứng dụng từ các loại tiền tệ phụ đại diện cho các tài sản như USD hoặc vàng đến cổ phiếu công ty, các token riêng lẻ đại diện cho tài sản thông minh, các phiếu giảm giá an toàn không thể giả mạo, và thậm chí các hệ thống token không có mối liên hệ nào với giá trị thông thường, được sử dụng như các hệ thống điểm để khuyến khích. Các hệ thống token dễ dàng triển khai một cách đáng ngạc nhiên trong Ethereum. Điểm mấu chốt cần hiểu là về cơ bản, tất cả một loại tiền tệ, hoặc hệ thống token, là một cơ sở dữ liệu với một hoạt động: trừ X đơn vị từ A và cho X đơn vị cho B, với điều kiện là (i) A có ít nhất X đơn vị trước giao dịch và (2) giao dịch được A chấp thuận. Tất cả những gì cần làm để triển khai một hệ thống token là triển khai logic này vào một hợp đồng.

Mã cơ bản để triển khai một hệ thống token trong Serpent trông như sau:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Đây về cơ bản là một triển khai theo đúng nghĩa đen của hàm chuyển đổi trạng thái "hệ thống ngân hàng" được mô tả ở trên trong tài liệu này. Cần thêm một vài dòng mã để cung cấp cho bước ban đầu là phân phối các đơn vị tiền tệ ngay từ đầu và một vài trường hợp biên khác, và lý tưởng nhất là một hàm sẽ được thêm vào để cho các hợp đồng khác truy vấn số dư của một địa chỉ. Nhưng đó là tất cả. Về mặt lý thuyết, các hệ thống token dựa trên Ethereum hoạt động như các loại tiền tệ phụ có thể bao gồm một tính năng quan trọng khác mà các siêu tiền tệ dựa trên Bitcoin trên chuỗi thiếu: khả năng trả phí giao dịch trực tiếp bằng loại tiền tệ đó. Cách thức triển khai điều này là hợp đồng sẽ duy trì một số dư ether mà nó sẽ hoàn lại ether được sử dụng để trả phí cho người gửi, và nó sẽ nạp lại số dư này bằng cách thu thập các đơn vị tiền tệ nội bộ mà nó thu được từ phí và bán lại chúng trong một cuộc đấu giá liên tục. Do đó, người dùng sẽ cần phải "kích hoạt" tài khoản của họ bằng ether, nhưng một khi ether đã ở đó, nó sẽ có thể tái sử dụng vì hợp đồng sẽ hoàn lại mỗi lần.

### Các công cụ phái sinh tài chính và tiền tệ có giá trị ổn định {#financial-derivatives-and-stable-value-currencies}

Các công cụ phái sinh tài chính là ứng dụng phổ biến nhất của một "hợp đồng thông minh", và là một trong những ứng dụng đơn giản nhất để triển khai bằng mã. Thách thức chính trong việc triển khai các hợp đồng tài chính là phần lớn chúng yêu cầu tham chiếu đến một mã giao dịch giá bên ngoài; ví dụ, một ứng dụng rất đáng mong đợi là một hợp đồng thông minh phòng hộ chống lại sự biến động của ether (hoặc một loại tiền mã hóa khác) so với đô la Mỹ, nhưng làm điều này đòi hỏi hợp đồng phải biết giá trị của ETH/USD là bao nhiêu. Cách đơn giản nhất để làm điều này là thông qua một hợp đồng "nguồn cấp dữ liệu" được duy trì bởi một bên cụ thể (ví dụ: NASDAQ) được thiết kế để bên đó có khả năng cập nhật hợp đồng khi cần thiết, và cung cấp một giao diện cho phép các hợp đồng khác gửi một tin nhắn đến hợp đồng đó và nhận lại một phản hồi cung cấp giá.

Với thành phần quan trọng đó, hợp đồng phòng hộ sẽ trông như sau:

1. Chờ bên A nhập 1000 ether.
2. Chờ bên B nhập 1000 ether.
3. Ghi lại giá trị USD của 1000 ether, được tính bằng cách truy vấn hợp đồng nguồn cấp dữ liệu, vào bộ nhớ lưu trữ, giả sử đây là $x.
4. Sau 30 ngày, cho phép A hoặc B "kích hoạt lại" hợp đồng để gửi số ether trị giá $x (được tính bằng cách truy vấn lại hợp đồng nguồn cấp dữ liệu để có được giá mới) cho A và phần còn lại cho B.

Một hợp đồng như vậy sẽ có tiềm năng đáng kể trong thương mại điện tử tiền mã hóa. Một trong những vấn đề chính được nêu ra về tiền mã hóa là thực tế nó biến động; mặc dù nhiều người dùng và thương gia có thể muốn sự an toàn và tiện lợi khi giao dịch với tài sản mật mã, họ có thể không muốn đối mặt với viễn cảnh mất 23% giá trị tiền của họ trong một ngày. Cho đến nay, giải pháp được đề xuất phổ biến nhất là tài sản được bảo lãnh bởi nhà phát hành; ý tưởng là một nhà phát hành tạo ra một loại tiền tệ phụ trong đó họ có quyền phát hành và thu hồi các đơn vị, và cung cấp một đơn vị tiền tệ cho bất kỳ ai cung cấp cho họ (ngoại tuyến) một đơn vị của một tài sản cơ bản được chỉ định (ví dụ: vàng, USD). Sau đó, nhà phát hành hứa sẽ cung cấp một đơn vị của tài sản cơ bản cho bất kỳ ai gửi lại một đơn vị của tài sản mã hóa. Cơ chế này cho phép bất kỳ tài sản phi mật mã nào được "nâng cấp" thành một tài sản mật mã, miễn là nhà phát hành có thể được tin cậy.

Tuy nhiên, trong thực tế, các nhà phát hành không phải lúc nào cũng đáng tin cậy, và trong một số trường hợp, cơ sở hạ tầng ngân hàng quá yếu, hoặc quá thù địch, để các dịch vụ như vậy tồn tại. Các công cụ phái sinh tài chính cung cấp một giải pháp thay thế. Ở đây, thay vì một nhà phát hành duy nhất cung cấp vốn để bảo lãnh cho một tài sản, một thị trường phi tập trung của các nhà đầu cơ, đặt cược rằng giá của một tài sản tham chiếu mật mã (ví dụ: ETH) sẽ tăng lên, đóng vai trò đó. Không giống như các nhà phát hành, các nhà đầu cơ không có lựa chọn nào để vỡ nợ về phía họ của thỏa thuận vì hợp đồng phòng hộ giữ tiền của họ trong ký quỹ. Lưu ý rằng phương pháp này không hoàn toàn phi tập trung, vì vẫn cần một nguồn đáng tin cậy để cung cấp mã giao dịch giá, mặc dù có thể cho rằng điều này vẫn là một cải tiến lớn về mặt giảm yêu cầu cơ sở hạ tầng (không giống như là một nhà phát hành, việc phát hành một nguồn cấp dữ liệu giá không yêu cầu giấy phép và có thể được phân loại là tự do ngôn luận) và giảm tiềm năng gian lận.

### Hệ thống Danh tính và Danh tiếng {#identity-and-reputation-systems}

Loại tiền mã hóa thay thế sớm nhất, [Namecoin](http://namecoin.org/), đã cố gắng sử dụng một chuỗi khối giống Bitcoin để cung cấp một hệ thống đăng ký tên, nơi người dùng có thể đăng ký tên của họ trong một cơ sở dữ liệu công khai cùng với các dữ liệu khác. Trường hợp sử dụng chính được trích dẫn là cho một hệ thống [DNS](https://wikipedia.org/wiki/Domain_Name_System), ánh xạ các tên miền như "bitcoin.org" (hoặc, trong trường hợp của Namecoin, "bitcoin.bit") đến một địa chỉ IP. Các trường hợp sử dụng khác bao gồm xác thực email và có thể là các hệ thống danh tiếng tiên tiến hơn. Đây là hợp đồng cơ bản để cung cấp một hệ thống đăng ký tên giống Namecoin trên Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Hợp đồng rất đơn giản; tất cả những gì nó là một cơ sở dữ liệu bên trong mạng Ethereum có thể được thêm vào, nhưng không thể sửa đổi hoặc xóa bỏ. Bất kỳ ai cũng có thể đăng ký một tên với một số giá trị, và đăng ký đó sau đó tồn tại mãi mãi. Một hợp đồng đăng ký tên phức tạp hơn cũng sẽ có một "mệnh đề chức năng" cho phép các hợp đồng khác truy vấn nó, cũng như một cơ chế cho "chủ sở hữu" (tức là, người đăng ký đầu tiên) của một tên để thay đổi dữ liệu hoặc chuyển quyền sở hữu. Người ta thậm chí có thể thêm chức năng danh tiếng và web-of-trust lên trên.

### Lưu trữ tệp phi tập trung {#decentralized-file-storage}

Trong vài năm qua, đã có một số công ty khởi nghiệp lưu trữ tệp trực tuyến phổ biến, nổi bật nhất là Dropbox, tìm cách cho phép người dùng tải lên bản sao lưu ổ cứng của họ và dịch vụ lưu trữ bản sao lưu đó và cho phép người dùng truy cập nó để đổi lấy một khoản phí hàng tháng. Tuy nhiên, tại thời điểm này, thị trường lưu trữ tệp đôi khi tương đối kém hiệu quả; một cái nhìn sơ qua về các giải pháp hiện có cho thấy rằng, đặc biệt là ở mức "thung lũng kỳ lạ" 20-200 GB mà ở đó cả hạn ngạch miễn phí lẫn giảm giá cấp doanh nghiệp đều không có hiệu lực, giá hàng tháng cho việc lưu trữ tệp chính thống là như vậy mà bạn đang trả nhiều hơn chi phí của toàn bộ ổ cứng trong một tháng. Các hợp đồng Ethereum có thể cho phép phát triển một hệ sinh thái lưu trữ tệp phi tập trung, nơi người dùng cá nhân có thể kiếm được một khoản tiền nhỏ bằng cách cho thuê ổ cứng của chính họ và không gian không sử dụng có thể được sử dụng để tiếp tục giảm chi phí lưu trữ tệp.

Phần cốt lõi của một thiết bị như vậy sẽ là cái mà chúng tôi gọi là "hợp đồng Dropbox phi tập trung". Hợp đồng này hoạt động như sau. Đầu tiên, người ta chia dữ liệu mong muốn thành các khối, mã hóa mỗi khối để bảo mật, và xây dựng một cây Merkle từ nó. Sau đó, người ta tạo một hợp đồng với quy tắc rằng, cứ sau N khối, hợp đồng sẽ chọn một chỉ mục ngẫu nhiên trong cây Merkle (sử dụng hàm băm của khối trước đó, có thể truy cập từ mã hợp đồng, làm nguồn ngẫu nhiên), và cho X ether cho thực thể đầu tiên cung cấp một giao dịch với một bằng chứng giống như xác minh thanh toán đơn giản về quyền sở hữu khối tại chỉ mục cụ thể đó trong cây. Khi người dùng muốn tải lại tệp của họ, họ có thể sử dụng một giao thức kênh thanh toán vi mô (ví dụ: trả 1 szabo cho mỗi 32 kilobyte) để khôi phục tệp; phương pháp hiệu quả nhất về phí là người trả tiền không công bố giao dịch cho đến cuối cùng, thay vào đó thay thế giao dịch bằng một giao dịch có lợi hơn một chút với cùng một nonce sau mỗi 32 kilobyte.

Một tính năng quan trọng của giao thức là, mặc dù có vẻ như người ta đang tin tưởng nhiều nút ngẫu nhiên sẽ không quyết định quên tệp, người ta có thể giảm rủi ro đó xuống gần bằng không bằng cách chia tệp thành nhiều mảnh thông qua chia sẻ bí mật, và theo dõi các hợp đồng để xem mỗi mảnh vẫn còn trong sở hữu của một số nút. Nếu một hợp đồng vẫn đang trả tiền, điều đó cung cấp một bằng chứng mật mã rằng ai đó ngoài kia vẫn đang lưu trữ tệp.

### Các tổ chức tự trị phi tập trung {#decentralized-autonomous-organizations}

Khái niệm chung về một "tổ chức tự trị phi tập trung" là một thực thể ảo có một tập hợp các thành viên hoặc cổ đông nhất định, có lẽ với đa số 67%, có quyền chi tiêu quỹ của thực thể và sửa đổi mã của nó. Các thành viên sẽ cùng nhau quyết định cách tổ chức phân bổ quỹ của mình. Các phương pháp phân bổ quỹ của một DAO có thể bao gồm từ tiền thưởng, tiền lương đến các cơ chế kỳ lạ hơn như một loại tiền tệ nội bộ để thưởng cho công việc. Điều này về cơ bản tái tạo các cạm bẫy pháp lý của một công ty hoặc tổ chức phi lợi nhuận truyền thống nhưng chỉ sử dụng công nghệ chuỗi khối mật mã để thực thi. Cho đến nay, phần lớn cuộc thảo luận xung quanh các DAO đã xoay quanh mô hình "tư bản" của một "tập đoàn tự trị phi tập trung" (DAC) với các cổ đông nhận cổ tức và cổ phiếu có thể giao dịch; một giải pháp thay thế, có lẽ được mô tả là một "cộng đồng tự trị phi tập trung", sẽ có tất cả các thành viên có một phần bằng nhau trong việc ra quyết định và yêu cầu 67% thành viên hiện tại đồng ý thêm hoặc xóa một thành viên. Yêu cầu rằng một người chỉ có thể có một tư cách thành viên sau đó sẽ cần được thực thi tập thể bởi nhóm.

Một phác thảo chung về cách viết mã một DAO như sau. Thiết kế đơn giản nhất chỉ là một đoạn mã tự sửa đổi, thay đổi nếu hai phần ba thành viên đồng ý về một sự thay đổi. Mặc dù mã về mặt lý thuyết là bất biến, người ta có thể dễ dàng vượt qua điều này và có khả năng thay đổi trên thực tế bằng cách có các đoạn mã trong các hợp đồng riêng biệt, và có địa chỉ của các hợp đồng cần gọi được lưu trữ trong bộ nhớ lưu trữ có thể sửa đổi. Trong một triển khai đơn giản của một hợp đồng DAO như vậy, sẽ có ba loại giao dịch, được phân biệt bởi dữ liệu được cung cấp trong giao dịch:

- `[0,i,K,V]` để đăng ký một đề xuất với chỉ mục `i` để thay đổi địa chỉ tại chỉ mục bộ nhớ lưu trữ `K` thành giá trị `V`
- `[1,i]` để đăng ký một phiếu bầu ủng hộ đề xuất `i`
- `[2,i]` để hoàn tất đề xuất `i` nếu đã có đủ phiếu bầu

Sau đó, hợp đồng sẽ có các điều khoản cho mỗi điều này. Nó sẽ duy trì một bản ghi của tất cả các thay đổi bộ nhớ lưu trữ đang mở, cùng với một danh sách những người đã bỏ phiếu cho chúng. Nó cũng sẽ có một danh sách tất cả các thành viên. Khi bất kỳ thay đổi bộ nhớ lưu trữ nào đạt được hai phần ba thành viên bỏ phiếu cho nó, một giao dịch hoàn tất có thể thực hiện thay đổi đó. Một bộ khung phức tạp hơn cũng sẽ có khả năng bỏ phiếu tích hợp cho các tính năng như gửi giao dịch, thêm thành viên và xóa thành viên, và thậm chí có thể cung cấp cho việc ủy quyền bỏ phiếu theo kiểu [Dân chủ chất lỏng](https://wikipedia.org/wiki/Liquid_democracy) (tức là, bất kỳ ai cũng có thể chỉ định ai đó bỏ phiếu cho họ, và việc chỉ định là bắc cầu nên nếu A chỉ định B và B chỉ định C thì C sẽ quyết định phiếu bầu của A). Thiết kế này sẽ cho phép DAO phát triển một cách hữu cơ như một cộng đồng phi tập trung, cho phép mọi người cuối cùng giao nhiệm vụ lọc ra ai là thành viên cho các chuyên gia, mặc dù không giống như trong "hệ thống hiện tại", các chuyên gia có thể dễ dàng xuất hiện và biến mất theo thời gian khi các thành viên cộng đồng cá nhân thay đổi liên kết của họ.

Một mô hình thay thế là một tập đoàn phi tập trung, nơi bất kỳ tài khoản nào cũng có thể có không hoặc nhiều cổ phần, và hai phần ba cổ phần là cần thiết để đưa ra quyết định. Một bộ khung hoàn chỉnh sẽ bao gồm chức năng quản lý tài sản, khả năng đưa ra đề nghị mua hoặc bán cổ phần, và khả năng chấp nhận đề nghị (tốt nhất là với một cơ chế khớp lệnh bên trong hợp đồng). Ủy quyền cũng sẽ tồn tại theo kiểu Dân chủ chất lỏng, khái quát hóa khái niệm về một "ban giám đốc".

### Các ứng dụng khác {#further-applications}

**1. Ví tiết kiệm**. Giả sử Alice muốn giữ tiền của mình an toàn, nhưng lo lắng rằng cô ấy sẽ mất hoặc ai đó sẽ hack khóa riêng tư của cô ấy. Cô ấy đặt ether vào một hợp đồng với Bob, một ngân hàng, như sau:

- Chỉ riêng Alice có thể rút tối đa 1% số tiền mỗi ngày.
- Chỉ riêng Bob có thể rút tối đa 1% số tiền mỗi ngày, nhưng Alice có khả năng thực hiện một giao dịch bằng khóa của mình để tắt khả năng này.
- Alice và Bob cùng nhau có thể rút bất cứ thứ gì.

Thông thường, 1% mỗi ngày là đủ cho Alice, và nếu Alice muốn rút nhiều hơn, cô ấy có thể liên hệ với Bob để được giúp đỡ. Nếu khóa của Alice bị hack, cô ấy chạy đến Bob để chuyển tiền sang một hợp đồng mới. Nếu cô ấy mất khóa, Bob cuối cùng sẽ lấy được tiền ra. Nếu Bob tỏ ra độc hại, thì cô ấy có thể tắt khả năng rút tiền của anh ta.

**2. Bảo hiểm cây trồng**. Người ta có thể dễ dàng tạo một hợp đồng phái sinh tài chính nhưng sử dụng nguồn cấp dữ liệu về thời tiết thay vì bất kỳ chỉ số giá nào. Nếu một nông dân ở Iowa mua một công cụ phái sinh trả tiền nghịch đảo dựa trên lượng mưa ở Iowa, thì nếu có hạn hán, nông dân sẽ tự động nhận được tiền và nếu có đủ mưa, nông dân sẽ vui mừng vì cây trồng của họ sẽ phát triển tốt. Điều này có thể được mở rộng cho bảo hiểm thiên tai nói chung.

**3. Một nguồn cấp dữ liệu phi tập trung**. Đối với các hợp đồng tài chính cho sự khác biệt, thực sự có thể phi tập trung hóa nguồn cấp dữ liệu thông qua một giao thức được gọi là "[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". SchellingCoin về cơ bản hoạt động như sau: N bên đều đưa vào hệ thống giá trị của một dữ liệu nhất định (ví dụ: giá ETH/USD), các giá trị được sắp xếp, và mọi người trong khoảng từ phần tư thứ 25 đến 75 sẽ nhận được một token như một phần thưởng. Mọi người đều có động lực để cung cấp câu trả lời mà mọi người khác sẽ cung cấp, và giá trị duy nhất mà một số lượng lớn người chơi có thể đồng ý một cách thực tế là mặc định hiển nhiên: sự thật. Điều này tạo ra một giao thức phi tập trung về mặt lý thuyết có thể cung cấp bất kỳ số lượng giá trị nào, bao gồm giá ETH/USD, nhiệt độ ở Berlin hoặc thậm chí là kết quả của một phép tính khó cụ thể.

**4. Ký quỹ đa chữ ký thông minh**. Bitcoin cho phép các hợp đồng giao dịch đa chữ ký, ví dụ, ba trong số năm khóa nhất định có thể chi tiêu số tiền. Ethereum cho phép chi tiết hơn; ví dụ, bốn trong năm có thể chi tiêu mọi thứ, ba trong năm có thể chi tiêu tới 10% mỗi ngày, và hai trong năm có thể chi tiêu tới 0,5% mỗi ngày. Ngoài ra, đa chữ ký Ethereum là không đồng bộ - hai bên có thể đăng ký chữ ký của họ trên chuỗi khối vào các thời điểm khác nhau và chữ ký cuối cùng sẽ tự động gửi giao dịch.

**5. Điện toán đám mây**. Công nghệ EVM cũng có thể được sử dụng để tạo ra một môi trường tính toán có thể kiểm chứng, cho phép người dùng yêu cầu người khác thực hiện các tính toán cũng như yêu cầu bằng chứng rằng các phép tính tại các điểm kiểm tra ngẫu nhiên đã được thực hiện chính xác. Điều này cho phép tạo ra một thị trường điện toán đám mây, nơi bất kỳ người dùng nào cũng có thể tham gia bằng máy tính để bàn, laptop hay máy chủ chuyên dụng, và việc kiểm tra ngẫu nhiên kết hợp với tiền ký quỹ bảo mật có thể được sử dụng để đảm bảo hệ thống đáng tin cậy (tức là các nút không thể gian lận một cách có lợi nhuận). Mặc dù hệ thống như vậy có thể không phù hợp với mọi tác vụ; các tác vụ yêu cầu mức độ giao tiếp ngang quá trình cao, chẳng hạn, không thể dễ dàng thực hiện trên một đám mây nút lớn. Tuy nhiên, các nhiệm vụ khác dễ dàng song song hóa hơn nhiều; các dự án như SETI@home, folding@home và các thuật toán di truyền có thể dễ dàng được triển khai trên một nền tảng như vậy.

**6. Cờ bạc ngang hàng**. Bất kỳ số lượng giao thức cờ bạc ngang hàng nào, chẳng hạn như [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) của Frank Stajano và Richard Clayton, đều có thể được triển khai trên chuỗi khối Ethereum. Giao thức cờ bạc đơn giản nhất thực ra chỉ là một hợp đồng chênh lệch trên hàm băm của khối tiếp theo, và các giao thức tiên tiến hơn có thể được xây dựng từ đó, tạo ra các dịch vụ cờ bạc với phí gần như bằng không mà không có khả năng gian lận.

**7. Thị trường dự đoán**. Với một oracle hoặc SchellingCoin, các thị trường dự đoán cũng dễ dàng triển khai, và các thị trường dự đoán cùng với SchellingCoin có thể chứng tỏ là ứng dụng chính thống đầu tiên của [futarchy](https://mason.gmu.edu/~rhanson/futarchy.html) như một giao thức quản trị cho các tổ chức phi tập trung.

**8. Các thị trường phi tập trung trên chuỗi**, sử dụng hệ thống danh tính và danh tiếng làm cơ sở.

## Những điều khác và các mối quan tâm {#miscellanea-and-concerns}

### Triển khai GHOST đã sửa đổi {#modified-ghost-implementation}

Giao thức "Greedy Heaviest Observed Subtree" (GHOST) là một sự đổi mới được giới thiệu lần đầu tiên bởi Yonatan Sompolinsky và Aviv Zohar vào [tháng 12 năm 2013](https://eprint.iacr.org/2013/881.pdf). Động lực phát triển GHOST là do các chuỗi khối có thời gian xác nhận nhanh hiện đang gặp vấn đề giảm tính bảo mật bởi tỷ lệ khối cũ cao - vì các khối cần một khoảng thời gian nhất định để truyền qua mạng, nếu thợ đào A khai thác được một khối và sau đó thợ đào B cũng khai thác một khối khác trước khi khối của A kịp truyền đến B, thì khối của B sẽ bị lãng phí và không đóng góp vào bảo mật của mạng. Hơn nữa, có một vấn đề tập trung hóa: nếu thợ đào A là một nhóm khai thác có 30% sức mạnh băm và B có 10% sức mạnh băm, A sẽ có nguy cơ tạo ra một khối lỗi thời 70% thời gian (vì 30% còn lại A đã tạo ra khối cuối cùng và do đó sẽ nhận được dữ liệu khai thác ngay lập tức) trong khi B sẽ có nguy cơ tạo ra một khối lỗi thời 90% thời gian. Do đó, nếu khoảng thời gian khối đủ ngắn để tỷ lệ lỗi thời cao, A sẽ hiệu quả hơn đáng kể chỉ đơn giản là do quy mô của nó. Với hai hiệu ứng này kết hợp, các chuỗi khối tạo ra các khối nhanh chóng rất có khả năng dẫn đến một nhóm khai thác có một tỷ lệ phần trăm đủ lớn sức mạnh băm của mạng lưới để có quyền kiểm soát trên thực tế đối với quá trình khai thác.

Như được mô tả bởi Sompolinsky và Zohar, GHOST giải quyết vấn đề đầu tiên về mất an ninh mạng bằng cách bao gồm các khối lỗi thời trong tính toán chuỗi nào là "dài nhất"; nghĩa là, không chỉ cha và các tổ tiên xa hơn của một khối, mà cả các hậu duệ lỗi thời của tổ tiên của khối (trong thuật ngữ của Ethereum, "uncles" hay khối chú) cũng được thêm vào tính toán khối nào có tổng bằng chứng công việc lớn nhất hỗ trợ nó. Để giải quyết vấn đề thứ hai về xu hướng tập trung hóa, chúng tôi vượt ra ngoài giao thức được mô tả bởi Sompolinsky và Zohar, và cũng cung cấp phần thưởng khối cho các khối lỗi thời: một khối lỗi thời nhận được 87,5% phần thưởng cơ bản của nó, và khối cháu bao gồm khối lỗi thời đó nhận được 12,5% còn lại. Tuy nhiên, phí giao dịch không được trao cho các khối chú.

Ethereum triển khai một phiên bản đơn giản hóa của GHOST chỉ đi xuống bảy cấp. Cụ thể, nó được định nghĩa như sau:

- Một khối phải chỉ định một khối cha, và nó phải chỉ định 0 hoặc nhiều khối chú
- Một khối chú được bao gồm trong khối B phải có các thuộc tính sau:
  - Nó phải là một con trực tiếp của tổ tiên thế hệ thứ k của B, trong đó `2 <= k <= 7`.
  - Nó không thể là một tổ tiên của B
  - Một khối chú phải là một tiêu đề khối hợp lệ, nhưng không cần phải là một khối đã được xác minh trước đó hoặc thậm chí là một khối hợp lệ
  - Một khối chú phải khác với tất cả các khối chú được bao gồm trong các khối trước đó và tất cả các khối chú khác được bao gồm trong cùng một khối (không bao gồm kép)
- Đối với mỗi khối chú U trong khối B, thợ đào của B nhận thêm 3,125% vào phần thưởng coinbase của mình và thợ đào của U nhận được 93,75% phần thưởng coinbase tiêu chuẩn.

Phiên bản giới hạn này của GHOST, với các khối chú chỉ có thể được bao gồm tối đa 7 thế hệ, được sử dụng vì hai lý do. Thứ nhất, GHOST không giới hạn sẽ bao gồm quá nhiều phức tạp vào việc tính toán xem khối chú nào cho một khối nhất định là hợp lệ. Thứ hai, GHOST không giới hạn với sự đền bù như được sử dụng trong Ethereum loại bỏ động lực cho một thợ đào khai thác trên chuỗi chính chứ không phải chuỗi của một kẻ tấn công công khai.

### Phí {#fees}

Do mỗi giao dịch được ghi lên chuỗi khối đều phát sinh cho mạng lưới chi phí để tải xuống và xác minh, vì vậy cần có một cơ chế quản lý - thường là phí giao dịch - để ngăn chặn ý đồ xấu. Cách tiếp cận mặc định, được sử dụng cho Bitcoin, là áp dụng cơ chế phí hoàn toàn tự nguyện, dựa vào các thợ đào với vai trò người gác cổng và tự thiết lập mức tối thiểu biến hóa. Cách tiếp cận này được cộng đồng Bitcoin đón nhận rất tích cực bởi nó mang tính "thị trường", cho phép cung và cầu giữa thợ đào và người gửi giao dịch quyết định mức giá. Tuy nhiên, vấn đề với dòng lý luận này là, xử lý giao dịch không phải là một thị trường; mặc dù việc giải thích xử lý giao dịch như một dịch vụ mà thợ đào cung cấp cho người gửi là hấp dẫn về mặt trực giác, trong thực tế, mọi giao dịch mà một thợ đào bao gồm sẽ cần được xử lý bởi mọi nút trong mạng lưới, vì vậy phần lớn chi phí xử lý giao dịch do các bên thứ ba chịu chứ không phải thợ đào đang đưa ra quyết định có nên bao gồm nó hay không. Do đó, các vấn đề về bi kịch của tài sản chung rất có khả năng xảy ra.

Tuy nhiên, hóa ra lỗ hổng này trong cơ chế dựa trên thị trường, khi được đưa ra một giả định đơn giản hóa không chính xác cụ thể, lại tự triệt tiêu một cách kỳ diệu. Lập luận như sau. Giả sử rằng:

1. Một giao dịch dẫn đến `k` hoạt động, cung cấp phần thưởng `kR` cho bất kỳ thợ đào nào bao gồm nó, trong đó `R` được đặt bởi người gửi và `k` và `R` (gần đúng) có thể nhìn thấy được đối với thợ đào trước đó.
2. Một hoạt động có chi phí xử lý là `C` cho bất kỳ nút nào (tức là tất cả các nút đều có hiệu quả như nhau)
3. Có `N` nút khai thác, mỗi nút có sức mạnh xử lý hoàn toàn bằng nhau (tức là `1/N` tổng số)
4. Không có nút đầy đủ nào không khai thác tồn tại.

Một thợ đào sẽ sẵn lòng xử lý một giao dịch nếu phần thưởng dự kiến lớn hơn chi phí. Do đó, phần thưởng dự kiến là `kR/N` vì thợ đào có cơ hội `1/N` xử lý khối tiếp theo, và chi phí xử lý cho thợ đào chỉ đơn giản là `kC`. Do đó, các thợ đào sẽ bao gồm các giao dịch khi `kR/N > kC`, hoặc `R > NC`. Lưu ý rằng `R` là phí cho mỗi hoạt động được cung cấp bởi người gửi, và do đó là một giới hạn dưới của lợi ích mà người gửi có được từ giao dịch, và `NC` là chi phí cho toàn bộ mạng lưới cùng nhau xử lý một hoạt động. Do đó, các thợ đào có động lực để chỉ bao gồm những giao dịch mà lợi ích vị lợi tổng thể vượt quá chi phí.

Tuy nhiên, có một số sai lệch quan trọng so với những giả định đó trong thực tế:

1. Thợ đào phải trả một chi phí cao hơn để xử lý giao dịch so với các nút xác minh khác, vì thời gian xác minh thêm làm chậm quá trình lan truyền khối và do đó làm tăng cơ hội khối sẽ trở thành khối lỗi thời.
2. Có tồn tại các nút đầy đủ không khai thác.
3. Sự phân bổ sức mạnh khai thác có thể trở nên cực kỳ bất bình đẳng trong thực tế.
4. Các nhà đầu cơ, kẻ thù chính trị và những kẻ điên rồ có chức năng hữu ích bao gồm việc gây hại cho mạng lưới thực sự tồn tại, và họ có thể thiết lập các hợp đồng một cách thông minh nơi chi phí của họ thấp hơn nhiều so với chi phí mà các nút xác minh khác phải trả.

(1) tạo ra xu hướng thợ đào bao gồm ít giao dịch hơn, và
(2) tăng `NC`; do đó, hai hiệu ứng này ít nhất một phần
cancel nhau
out.<sup>[Làm thế nào?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) và (4) là vấn đề chính; để giải quyết chúng, chúng ta chỉ cần thiết lập một
giới hạn thả nổi: không có khối nào có thể có nhiều hoạt động hơn
`BLK_LIMIT_FACTOR` lần trung bình động hàm mũ dài hạn.
Cụ thể:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` và `EMA_FACTOR` là các hằng số sẽ được đặt thành 65536 và 1,5 vào thời điểm hiện tại, nhưng có khả năng sẽ được thay đổi sau khi phân tích thêm.

Có một yếu tố khác không khuyến khích kích thước khối lớn trong Bitcoin: các khối lớn sẽ mất nhiều thời gian hơn để lan truyền, và do đó có xác suất cao hơn trở thành khối lỗi thời. Trong Ethereum, các khối tiêu thụ nhiều gas cũng có thể mất nhiều thời gian hơn để lan truyền cả vì chúng lớn hơn về mặt vật lý và vì chúng mất nhiều thời gian hơn để xử lý các chuyển đổi trạng thái giao dịch để xác thực. Sự không khuyến khích chậm trễ này là một cân nhắc quan trọng trong Bitcoin, nhưng ít hơn trong Ethereum vì giao thức GHOST; do đó, việc dựa vào các giới hạn khối được quy định cung cấp một đường cơ sở ổn định hơn.

### Tính toán và tính đầy đủ Turing {#computation-and-turing-completeness}

Một lưu ý quan trọng là máy ảo Ethereum là đầy đủ Turing; điều này có nghĩa là mã EVM có thể mã hóa bất kỳ phép tính nào có thể thực hiện được, bao gồm cả các vòng lặp vô hạn. Mã EVM cho phép lặp theo hai cách. Thứ nhất, có một lệnh `JUMP` cho phép chương trình nhảy trở lại một vị trí trước đó trong mã, và một lệnh `JUMPI` để thực hiện nhảy có điều kiện, cho phép các câu lệnh như `while x < 27: x = x * 2`. Thứ hai, các hợp đồng có thể gọi các hợp đồng khác, có khả năng cho phép lặp thông qua đệ quy. Điều này tự nhiên dẫn đến một vấn đề: liệu người dùng độc hại có thể về cơ bản làm sập các thợ đào và các nút đầy đủ bằng cách buộc họ vào một vòng lặp vô hạn không? Vấn đề nảy sinh do một vấn đề trong khoa học máy tính được gọi là vấn đề dừng: không có cách nào để biết, trong trường hợp chung, một chương trình nhất định có bao giờ dừng hay không.

Như được mô tả trong phần chuyển đổi trạng thái, giải pháp của chúng tôi hoạt động bằng cách yêu cầu một giao dịch đặt một số bước tính toán tối đa mà nó được phép thực hiện, và nếu việc thực thi mất nhiều thời gian hơn, phép tính sẽ được hoàn nguyên nhưng phí vẫn được trả. Các tin nhắn hoạt động theo cách tương tự. Để cho thấy động lực đằng sau giải pháp của chúng tôi, hãy xem xét các ví dụ sau:

- Một kẻ tấn công tạo ra một hợp đồng chạy một vòng lặp vô hạn, và sau đó gửi một giao dịch kích hoạt vòng lặp đó đến thợ đào. Thợ đào sẽ xử lý giao dịch, chạy vòng lặp vô hạn, và chờ cho đến khi nó hết gas. Mặc dù việc thực thi hết gas và dừng lại giữa chừng, giao dịch vẫn hợp lệ và thợ đào vẫn nhận được phí từ kẻ tấn công cho mỗi bước tính toán.
- Một kẻ tấn công tạo ra một vòng lặp vô hạn rất dài với ý định buộc thợ đào phải tiếp tục tính toán trong một thời gian dài đến mức khi tính toán kết thúc, một vài khối nữa sẽ xuất hiện và thợ đào sẽ không thể bao gồm giao dịch để nhận phí. Tuy nhiên, kẻ tấn công sẽ được yêu cầu gửi một giá trị cho `STARTGAS` giới hạn số bước tính toán mà việc thực thi có thể thực hiện, vì vậy thợ đào sẽ biết trước rằng phép tính sẽ mất một số lượng lớn các bước.
- Một kẻ tấn công thấy một hợp đồng với mã có dạng như `send(A,contract.storage[A]); contract.storage[A] = 0`, và gửi một giao dịch với chỉ đủ gas để chạy bước đầu tiên nhưng không phải bước thứ hai (tức là thực hiện một lần rút tiền nhưng không để số dư giảm xuống). Tác giả hợp đồng không cần lo lắng về việc bảo vệ chống lại các cuộc tấn công như vậy, bởi vì nếu việc thực thi dừng lại giữa chừng, các thay đổi sẽ được hoàn nguyên.
- Một hợp đồng tài chính hoạt động bằng cách lấy trung vị của chín nguồn cấp dữ liệu độc quyền để giảm thiểu rủi ro. Một kẻ tấn công chiếm lấy một trong các nguồn cấp dữ liệu, được thiết kế để có thể sửa đổi thông qua cơ chế gọi địa chỉ biến được mô tả trong phần về DAO, và chuyển nó thành một vòng lặp vô hạn, do đó cố gắng buộc bất kỳ nỗ lực nào để nhận tiền từ hợp đồng tài chính phải hết gas. Tuy nhiên, hợp đồng tài chính có thể đặt một giới hạn gas trên tin nhắn để ngăn chặn vấn đề này.

Giải pháp thay thế cho tính đầy đủ Turing là tính không đầy đủ Turing, trong đó `JUMP` và `JUMPI` không tồn tại và chỉ một bản sao của mỗi hợp đồng được phép tồn tại trong ngăn xếp cuộc gọi tại bất kỳ thời điểm nào. Với hệ thống này, hệ thống phí được mô tả và những bất ổn xung quanh hiệu quả của giải pháp của chúng tôi có thể không cần thiết, vì chi phí thực hiện một hợp đồng sẽ bị giới hạn trên bởi kích thước của nó. Ngoài ra, tính không đầy đủ Turing thậm chí không phải là một hạn chế lớn; trong số tất cả các ví dụ hợp đồng mà chúng tôi đã hình thành trong nội bộ, cho đến nay chỉ có một ví dụ yêu cầu một vòng lặp, và ngay cả vòng lặp đó cũng có thể được loại bỏ bằng cách thực hiện 26 lần lặp lại một đoạn mã một dòng. Với những hệ lụy nghiêm trọng của tính đầy đủ Turing, và lợi ích hạn chế, tại sao không đơn giản là có một ngôn ngữ không đầy đủ Turing? Tuy nhiên, trong thực tế, tính không đầy đủ Turing còn lâu mới là một giải pháp gọn gàng cho vấn đề. Để xem tại sao, hãy xem xét các hợp đồng sau:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (chạy một bước của một chương trình và ghi lại sự thay đổi trong bộ nhớ lưu trữ)
```

Bây giờ, gửi một giao dịch đến A. Do đó, trong 51 giao dịch, chúng ta có một hợp đồng mất 2<sup>50</sup> bước tính toán. Các thợ đào có thể cố gắng phát hiện các quả bom logic như vậy trước thời hạn bằng cách duy trì một giá trị bên cạnh mỗi hợp đồng chỉ định số bước tính toán tối đa mà nó có thể thực hiện, và tính toán điều này cho các hợp đồng gọi các hợp đồng khác một cách đệ quy, nhưng điều đó sẽ yêu cầu các thợ đào cấm các hợp đồng tạo ra các hợp đồng khác (vì việc tạo và thực thi tất cả 26 hợp đồng ở trên có thể dễ dàng được gộp vào một hợp đồng duy nhất). Một điểm có vấn đề khác là trường địa chỉ của một tin nhắn là một biến, vì vậy nói chung thậm chí có thể không thể biết trước được một hợp đồng nhất định sẽ gọi những hợp đồng nào khác. Do đó, tóm lại, chúng ta có một kết luận đáng ngạc nhiên: tính đầy đủ Turing dễ quản lý một cách đáng ngạc nhiên, và việc thiếu tính đầy đủ Turing cũng khó quản lý một cách đáng ngạc nhiên trừ khi các biện pháp kiểm soát giống hệt được áp dụng - nhưng trong trường hợp đó tại sao không để giao thức là đầy đủ Turing?

### Tiền tệ và Phát hành {#currency-and-issuance}

Mạng lưới Ethereum bao gồm cả tiền tệ có sẵn của nó, ether, phục vụ cho mục đích cung cấp một lớp thanh khoản chính cho sự trao đổi hiệu quả giữa đa dạng loại tài sản số, và quan trọng hơn, cung cấp một cơ chế để chi trả phí giao dịch. Để tiện lợi và để tránh tranh cãi trong tương lai (xem cuộc tranh luận mBTC/uBTC/satoshi hiện tại trong Bitcoin), các mệnh giá sẽ được dán nhãn trước:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Điều này nên được coi là một phiên bản mở rộng của khái niệm "đô la" và "xu" hoặc "BTC" và "satoshi". Trong tương lai gần, chúng tôi hy vọng "ether" sẽ được sử dụng cho các giao dịch thông thường, "finney" cho các giao dịch vi mô và "szabo" và "wei" cho các cuộc thảo luận kỹ thuật về phí và triển khai giao thức; các mệnh giá còn lại có thể trở nên hữu ích sau này và không nên được bao gồm trong các ứng dụng khách tại thời điểm này.

Mô hình phát hành sẽ như sau:

- Ether sẽ được phát hành trong một đợt bán tiền tệ với giá 1000-2000 ether mỗi BTC, một cơ chế nhằm tài trợ cho tổ chức Ethereum và trả tiền cho việc phát triển đã được sử dụng thành công bởi các nền tảng khác như Mastercoin và NXT. Những người mua sớm hơn sẽ được hưởng lợi từ các khoản giảm giá lớn hơn. BTC nhận được từ đợt bán sẽ được sử dụng hoàn toàn để trả lương và tiền thưởng cho các nhà phát triển và đầu tư vào các dự án vì lợi nhuận và phi lợi nhuận khác nhau trong hệ sinh thái Ethereum và tiền mã hóa.
- 0,099x tổng số tiền bán được (60102216 ETH) sẽ được phân bổ cho tổ chức để đền bù cho những người đóng góp sớm và trả các chi phí bằng ETH trước khối nguyên thủy.
- 0,099x tổng số tiền bán được sẽ được duy trì như một khoản dự trữ dài hạn.
- 0,26x tổng số tiền bán được sẽ được phân bổ cho các thợ đào mỗi năm mãi mãi sau thời điểm đó.

| Nhóm                            | Tại thời điểm ra mắt | Sau 1 năm | Sau 5 năm |
| ------------------------------- | -------------------- | --------- | --------- |
| Đơn vị tiền tệ                  | 1,198X               | 1,458X    | 2,498X    |
| Người mua                       | 83,5%                | 68,6%     | 40,0%     |
| Dự trữ chi trước khi bán        | 8,26%                | 6,79%     | 3,96%     |
| Dự trữ được sử dụng sau khi bán | 8,26%                | 6,79%     | 3,96%     |
| Thợ đào                         | 0%                   | 17,8%     | 52,0%     |

#### Tốc độ tăng trưởng nguồn cung dài hạn (phần trăm)

![Lạm phát Ethereum](./ethereum-inflation.png)

_Mặc dù phát hành tiền tệ tuyến tính, giống như với Bitcoin, theo thời gian, tốc độ tăng trưởng nguồn cung vẫn có xu hướng tiến về không._

Hai lựa chọn chính trong mô hình trên là (1) sự tồn tại và quy mô của một quỹ tài trợ, và (2) sự tồn tại của một nguồn cung tuyến tính tăng trưởng vĩnh viễn, trái ngược với một nguồn cung có giới hạn như trong Bitcoin. Sự biện minh cho quỹ tài trợ như sau. Nếu quỹ tài trợ không tồn tại, và việc phát hành tuyến tính giảm xuống 0,217x để cung cấp cùng một tỷ lệ lạm phát, thì tổng số lượng ether sẽ ít hơn 16,5% và do đó mỗi đơn vị sẽ có giá trị cao hơn 19,8%. Do đó, trong trạng thái cân bằng, sẽ có thêm 19,8% ether được mua trong đợt bán, vì vậy mỗi đơn vị một lần nữa sẽ có giá trị chính xác như trước. Tổ chức sau đó cũng sẽ có nhiều hơn 1,198x BTC, có thể được coi là được chia thành hai phần: BTC ban đầu, và 0,198x bổ sung. Do đó, tình huống này là _hoàn toàn tương đương_ với quỹ tài trợ, nhưng với một sự khác biệt quan trọng: tổ chức chỉ nắm giữ BTC, và do đó không được khuyến khích để hỗ trợ giá trị của đơn vị ether.

Mô hình tăng trưởng nguồn cung tuyến tính vĩnh viễn làm giảm rủi ro của cái mà một số người coi là sự tập trung của cải quá mức trong Bitcoin, và mang lại cho các cá nhân sống trong các thời đại hiện tại và tương lai một cơ hội công bằng để có được các đơn vị tiền tệ, đồng thời vẫn giữ được một động lực mạnh mẽ để có được và nắm giữ ether vì "tốc độ tăng trưởng nguồn cung" như một tỷ lệ phần trăm vẫn có xu hướng tiến về không theo thời gian. Chúng tôi cũng đưa ra giả thuyết rằng vì tiền xu luôn bị mất theo thời gian do sơ suất, cái chết, v.v., và việc mất tiền xu có thể được mô hình hóa như một tỷ lệ phần trăm của tổng cung mỗi năm, rằng tổng cung tiền tệ trong lưu thông thực tế cuối cùng sẽ ổn định ở một giá trị bằng với lượng phát hành hàng năm chia cho tỷ lệ mất mát (ví dụ: với tỷ lệ mất mát 1%, một khi nguồn cung đạt 26X thì 0,26X sẽ được khai thác và 0,26X bị mất mỗi năm, tạo ra một trạng thái cân bằng).

Lưu ý rằng trong tương lai, có khả năng Ethereum sẽ chuyển sang mô hình bằng chứng cổ phần để bảo mật, giảm yêu cầu phát hành xuống khoảng từ 0 đến 0,05X mỗi năm. Trong trường hợp tổ chức Ethereum mất nguồn tài trợ hoặc vì bất kỳ lý do nào khác biến mất, chúng tôi để ngỏ một "khế ước xã hội": bất kỳ ai cũng có quyền tạo ra một phiên bản ứng cử viên tương lai của Ethereum, với điều kiện duy nhất là số lượng ether phải bằng hoặc nhỏ hơn `60102216 * (1.198 + 0.26 * n)` trong đó `n` là số năm sau khối nguyên thủy. Các nhà sáng tạo có thể tự do bán huy động vốn hoặc bằng cách khác gán một phần hoặc toàn bộ sự khác biệt giữa việc mở rộng nguồn cung do PoS và việc mở rộng nguồn cung tối đa cho phép để trả tiền cho việc phát triển. Các bản nâng cấp ứng cử viên không tuân thủ khế ước xã hội có thể bị phân nhánh thành các phiên bản tuân thủ một cách chính đáng.

### Tập trung hóa khai thác {#mining-centralization}

Thuật toán khai thác Bitcoin hoạt động bằng cách yêu cầu các thợ đào tính toán SHA256 trên các phiên bản được sửa đổi một chút của tiêu đề khối hàng triệu lần lặp đi lặp lại, cho đến khi cuối cùng một nút đưa ra một phiên bản có hàm băm nhỏ hơn mục tiêu (hiện tại khoảng 2<sup>192</sup>). Tuy nhiên, thuật toán khai thác này dễ bị tổn thương trước hai hình thức tập trung hóa. Thứ nhất, hệ sinh thái khai thác đã bị chi phối bởi ASIC (mạch tích hợp chuyên dụng), các chip máy tính được thiết kế cho, và do đó hiệu quả hơn hàng nghìn lần, nhiệm vụ cụ thể của việc khai thác Bitcoin. Điều này có nghĩa là việc khai thác Bitcoin không còn là một hoạt động phi tập trung và bình đẳng cao, đòi hỏi hàng triệu đô la vốn để tham gia một cách hiệu quả. Thứ hai, hầu hết các thợ đào Bitcoin không thực sự thực hiện xác thực khối tại chỗ; thay vào đó, họ dựa vào một nhóm khai thác tập trung để cung cấp các tiêu đề khối. Vấn đề này được cho là tồi tệ hơn: tại thời điểm viết bài này, ba nhóm khai thác hàng đầu gián tiếp kiểm soát khoảng 50% sức mạnh xử lý trong mạng Bitcoin, mặc dù điều này được giảm nhẹ bởi thực tế là các thợ đào có thể chuyển sang các nhóm khai thác khác nếu một nhóm hoặc liên minh cố gắng thực hiện một cuộc tấn công 51%.

Ý định hiện tại của Ethereum là sử dụng một thuật toán khai thác mà trong đó các thợ đào phải lấy dữ liệu ngẫu nhiên từ trạng thái hiện tại, tính toán một số giao dịch được chọn ngẫu nhiên từ N khối gần nhất trên chuỗi khối và trả về giá trị băm của kết quả. Điều này có hai lợi ích quan trọng. Thứ nhất, các hợp đồng Ethereum có thể bao gồm bất kỳ loại tính toán nào, vì vậy một ASIC Ethereum về cơ bản sẽ là một ASIC cho tính toán chung - tức là, một CPU tốt hơn. Thứ hai, việc khai thác đòi hỏi quyền truy cập vào toàn bộ chuỗi khối, buộc các thợ đào phải lưu trữ toàn bộ chuỗi khối và ít nhất phải có khả năng xác minh mọi giao dịch. Điều này loại bỏ sự cần thiết của các nhóm khai thác tập trung; mặc dù các nhóm khai thác vẫn có thể phục vụ vai trò hợp pháp là làm đều sự ngẫu nhiên của việc phân phối phần thưởng, chức năng này có thể được phục vụ tốt như nhau bởi các nhóm ngang hàng không có sự kiểm soát trung tâm.

Mô hình này chưa được thử nghiệm, và có thể có những khó khăn trên đường đi trong việc tránh một số tối ưu hóa thông minh khi sử dụng việc thực thi hợp đồng như một thuật toán khai thác. Tuy nhiên, một tính năng đặc biệt thú vị của thuật toán này là nó cho phép bất kỳ ai "đầu độc giếng", bằng cách đưa một số lượng lớn các hợp đồng vào chuỗi khối được thiết kế đặc biệt để cản trở một số ASIC nhất định. Các động lực kinh tế tồn tại để các nhà sản xuất ASIC sử dụng một thủ thuật như vậy để tấn công lẫn nhau. Do đó, giải pháp mà chúng tôi đang phát triển cuối cùng là một giải pháp kinh tế thích ứng của con người chứ không phải là một giải pháp thuần túy kỹ thuật.

### Khả năng mở rộng {#scalability}

Một mối quan tâm chung về Ethereum là vấn đề khả năng mở rộng. Giống như Bitcoin, Ethereum bị một lỗ hổng là mọi giao dịch cần được xử lý bởi mọi nút trong mạng lưới. Với Bitcoin, kích thước của chuỗi khối hiện tại là khoảng 15 GB, tăng khoảng 1 MB mỗi giờ. Nếu mạng Bitcoin xử lý 2000 giao dịch mỗi giây của Visa, nó sẽ tăng 1 MB mỗi ba giây (1 GB mỗi giờ, 8 TB mỗi năm). Ethereum có khả năng chịu một mô hình tăng trưởng tương tự, tệ hơn bởi thực tế là sẽ có nhiều ứng dụng trên chuỗi khối Ethereum thay vì chỉ là một loại tiền tệ như trường hợp của Bitcoin, nhưng được cải thiện bởi thực tế là các nút đầy đủ Ethereum chỉ cần lưu trữ trạng thái thay vì toàn bộ lịch sử chuỗi khối.

Vấn đề với kích thước chuỗi khối lớn như vậy là rủi ro tập trung hóa. Nếu kích thước chuỗi khối tăng lên, giả sử, 100 TB, thì kịch bản có khả năng xảy ra là chỉ một số rất nhỏ các doanh nghiệp lớn sẽ chạy các nút đầy đủ, với tất cả người dùng thông thường sử dụng các nút SPV nhẹ. Trong tình huống như vậy, có mối lo ngại tiềm tàng rằng các nút đầy đủ có thể liên kết với nhau và tất cả đều đồng ý gian lận theo một cách có lợi nào đó (ví dụ: thay đổi phần thưởng khối, tự cho mình BTC). Các nút nhẹ sẽ không có cách nào để phát hiện ra điều này ngay lập tức. Tất nhiên, ít nhất một nút đầy đủ trung thực có khả năng tồn tại, và sau vài giờ thông tin về gian lận sẽ rò rỉ qua các kênh như Reddit, nhưng tại thời điểm đó thì đã quá muộn: sẽ tùy thuộc vào người dùng thông thường để tổ chức một nỗ lực đưa các khối đã cho vào danh sách đen, một vấn đề phối hợp lớn và có khả năng không khả thi ở quy mô tương tự như việc thực hiện thành công một cuộc tấn công 51%. Trong trường hợp của Bitcoin, đây hiện là một vấn đề, nhưng có một sửa đổi chuỗi khối [được đề xuất bởi Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) sẽ giảm nhẹ vấn đề này.

Trong thời gian tới, Ethereum sẽ sử dụng hai chiến lược bổ sung để đối phó với vấn đề này. Thứ nhất, do các thuật toán khai thác dựa trên chuỗi khối, ít nhất mọi thợ đào sẽ bị buộc phải là một nút đầy đủ, tạo ra một giới hạn dưới về số lượng các nút đầy đủ. Tuy nhiên, thứ hai và quan trọng hơn, chúng tôi sẽ bao gồm một gốc cây trạng thái trung gian trong chuỗi khối sau khi xử lý mỗi giao dịch. Ngay cả khi việc xác thực khối là tập trung, miễn là có một nút xác minh trung thực tồn tại, vấn đề tập trung hóa có thể được khắc phục thông qua một giao thức xác minh. Nếu một thợ đào công bố một khối không hợp lệ, khối đó phải được định dạng sai, hoặc trạng thái `S[n]` không chính xác. Vì `S[0]` được biết là chính xác, phải có một trạng thái đầu tiên `S[i]` không chính xác trong khi `S[i-1]` là chính xác. Nút xác minh sẽ cung cấp chỉ mục `i`, cùng với một "bằng chứng về tính không hợp lệ" bao gồm tập hợp con các nút cây Patricia cần thiết để xử lý `APPLY(S[i-1],TX[i]) -> S[i]`. Các nút sẽ có thể sử dụng các nút đó để chạy phần tính toán đó, và thấy rằng `S[i]` được tạo ra không khớp với `S[i]` được cung cấp.

Một cuộc tấn công khác, tinh vi hơn, sẽ liên quan đến việc các thợ đào độc hại công bố các khối không đầy đủ, do đó thông tin đầy đủ thậm chí không tồn tại để xác định xem các khối có hợp lệ hay không. Giải pháp cho vấn đề này là một giao thức thách thức-phản hồi: các nút xác minh đưa ra các "thách thức" dưới dạng các chỉ mục giao dịch mục tiêu, và khi nhận được một nút, một nút nhẹ coi khối đó là không đáng tin cậy cho đến khi một nút khác, dù là thợ đào hay một người xác minh khác, cung cấp một tập hợp con các nút Patricia làm bằng chứng về tính hợp lệ.

## Kết luận {#conclusion}

Giao thức Ethereum được hình thành như một phiên bản nâng cấp của tiền mã hóa, cung cấp các tính năng nâng cao như ký quỹ trên blockchain, giới hạn rút tiền, hợp đồng tài chính, thị trường cá cược và các ứng dụng tương tự thông qua một ngôn ngữ lập trình phổ biến cao. Giao thức Ethereum sẽ không trực tiếp "hỗ trợ" bất kỳ ứng dụng nào, nhưng sự tồn tại của một ngôn ngữ lập trình Turing hoàn chỉnh đồng nghĩa với việc các hợp đồng tùy hứng có thể được tạo cho bất kỳ loại giao dịch hay ứng dụng nào, trên lý thuyết. Tuy nhiên, điều thú vị hơn về Ethereum là giao thức Ethereum vượt xa hơn chỉ là tiền tệ. Các giao thức xung quanh lưu trữ tệp phi tập trung, tính toán phi tập trung và các thị trường dự đoán phi tập trung, trong số hàng tá các khái niệm tương tự khác, có tiềm năng tăng đáng kể hiệu quả của ngành công nghiệp tính toán, và cung cấp một sự thúc đẩy lớn cho các giao thức ngang hàng khác bằng cách lần đầu tiên thêm một lớp kinh tế. Cuối cùng, cũng có một loạt các ứng dụng đáng kể không liên quan gì đến tiền bạc.

Khái niệm về một hàm chuyển đổi trạng thái tùy ý được triển khai bởi giao thức Ethereum cung cấp một nền tảng với tiềm năng độc đáo; thay vì là một giao thức đóng, đơn mục đích dành cho một loạt các ứng dụng cụ thể trong lưu trữ dữ liệu, cờ bạc hoặc tài chính, Ethereum được thiết kế mở, và chúng tôi tin rằng nó cực kỳ phù hợp để phục vụ như một lớp nền tảng cho một số lượng rất lớn các giao thức tài chính và phi tài chính trong những năm tới.

## Ghi chú và Đọc thêm {#notes-and-further-reading}

### Ghi chú {#notes}

1. Một độc giả tinh vi có thể nhận thấy rằng thực tế địa chỉ Bitcoin là hàm băm của khóa công khai đường cong elip, chứ không phải là chính khóa công khai đó. Tuy nhiên, thực tế là hoàn toàn hợp pháp về mặt thuật ngữ mật mã để gọi hàm băm khóa công khai là chính khóa công khai đó. Điều này là do mật mã của Bitcoin có thể được coi là một thuật toán chữ ký số tùy chỉnh, trong đó khóa công khai bao gồm hàm băm của khóa công khai ECC, chữ ký bao gồm khóa công khai ECC được nối với chữ ký ECC, và thuật toán xác minh bao gồm việc kiểm tra khóa công khai ECC trong chữ ký với hàm băm khóa công khai ECC được cung cấp như một khóa công khai và sau đó xác minh chữ ký ECC với khóa công khai ECC.
2. Về mặt kỹ thuật, là trung vị của 11 khối trước đó.
3. Trong nội bộ, 2 và "CHARLIE" đều là các số<sup>[fn3](#notes)</sup>, với số sau ở dạng biểu diễn cơ số 256 big-endian. Các số có thể ít nhất là 0 và nhiều nhất là 2<sup>256</sup>-1.

### Đọc thêm {#further-reading}

1. [Giá trị nội tại](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Tài sản thông minh](https://en.bitcoin.it/wiki/Smart_Property)
3. [Hợp đồng thông minh](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Bằng chứng công việc có thể tái sử dụng](https://nakamotoinstitute.org/finney/rpow/)
6. [Chứng thư sở hữu an toàn với thẩm quyền của chủ sở hữu](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Giấy trắng Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Tam giác của Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Giấy trắng Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Giấy trắng Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Các tập đoàn tự trị phi tập trung, Tạp chí Bitcoin](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Xác minh thanh toán đơn giản hóa](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Cây Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Cây Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ và các Tác nhân tự trị, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn về Tài sản thông minh tại Lễ hội Turing](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](/developers/docs/data-structures-and-encoding/rlp/)
20. [Cây Merkle Patricia của Ethereum](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd về cây tổng Merkle](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Để biết lịch sử của giấy trắng, xem [wiki này](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Ethereum, giống như nhiều dự án phần mềm mã nguồn mở do cộng đồng thúc đẩy, đã phát triển kể từ khi ra đời._ _Để tìm hiểu về những phát triển mới nhất của Ethereum và cách thực hiện các thay đổi đối với giao thức, chúng tôi khuyên bạn nên đọc [hướng dẫn này](/learn/)._
