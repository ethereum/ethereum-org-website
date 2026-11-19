---
title: "Chuỗi Plasma"
description: "Giới thiệu về các chuỗi Plasma như một giải pháp mở rộng quy mô hiện đang được cộng đồng Ethereum sử dụng."
lang: vi
incomplete: true
sidebarDepth: 3
---

Một chuỗi Plasma là một Chuỗi khối riêng biệt được neo vào [Mạng chính Ethereum](/) nhưng thực thi các giao dịch ngoài chuỗi với cơ chế xác thực khối của riêng nó. Các chuỗi Plasma đôi khi được gọi là chuỗi "con", về cơ bản là các bản sao nhỏ hơn của Mạng chính Ethereum. Các chuỗi Plasma sử dụng [bằng chứng gian lận](/glossary/#fraud-proof) (giống như [các bản cuộn lạc quan](/developers/docs/scaling/optimistic-rollups/)) để phân xử các tranh chấp.

Các cây Merkle cho phép tạo ra một ngăn xếp vô tận của các chuỗi này, có thể hoạt động để giảm tải băng thông cho các chuỗi cha (bao gồm cả Mạng chính Ethereum). Tuy nhiên, mặc dù các chuỗi này nhận được một số bảo mật từ Ethereum (thông qua bằng chứng gian lận), tính bảo mật và hiệu quả của chúng bị ảnh hưởng bởi một số hạn chế trong thiết kế.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên có hiểu biết tốt về tất cả các chủ đề nền tảng và hiểu biết tổng quan về [mở rộng quy mô Ethereum](/developers/docs/scaling/).

## Plasma là gì? {#what-is-plasma}

Plasma là một khuôn khổ để cải thiện khả năng mở rộng trong các Chuỗi khối công khai như Ethereum. Như được mô tả trong [sách trắng Plasma](https://plasma.io/plasma.pdf) gốc, các chuỗi Plasma được xây dựng trên một Chuỗi khối khác (được gọi là "chuỗi gốc"). Mỗi "chuỗi con" mở rộng từ chuỗi gốc và thường được quản lý bởi một hợp đồng thông minh được triển khai trên chuỗi cha.

Hợp đồng Plasma hoạt động, cùng với những chức năng khác, như một [cầu nối](/developers/docs/bridges/) cho phép người dùng di chuyển tài sản giữa Mạng chính Ethereum và chuỗi Plasma. Mặc dù điều này làm cho chúng tương tự như [chuỗi phụ](/developers/docs/scaling/sidechains/), các chuỗi Plasma được hưởng lợi—ít nhất, ở một mức độ nào đó—từ tính bảo mật của Mạng chính Ethereum. Điều này không giống như các chuỗi phụ tự chịu hoàn toàn trách nhiệm về tính bảo mật của mình.

## Plasma hoạt động như thế nào? {#how-does-plasma-work}

Các thành phần cơ bản của khuôn khổ Plasma là:

### Tính toán ngoài chuỗi {#offchain-computation}

Tốc độ xử lý hiện tại của Ethereum bị giới hạn ở khoảng 15-20 giao dịch mỗi giây, làm giảm khả năng mở rộng quy mô trong ngắn hạn để xử lý thêm nhiều người dùng hơn. Vấn đề này tồn tại chủ yếu là do [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/) của Ethereum yêu cầu nhiều nút ngang hàng xác minh mọi bản cập nhật đối với trạng thái của Chuỗi khối.

Mặc dù cơ chế đồng thuận của Ethereum là cần thiết cho tính bảo mật, nó có thể không áp dụng cho mọi trường hợp sử dụng. Ví dụ, Alice có thể không cần các khoản thanh toán hàng ngày của cô ấy cho Bob cho một tách cà phê phải được toàn bộ mạng lưới Ethereum xác minh vì đã có một số sự tin tưởng nhất định giữa cả hai bên.

Plasma giả định rằng Mạng chính Ethereum không cần phải xác minh tất cả các giao dịch. Thay vào đó, chúng ta có thể xử lý các giao dịch ngoài Mạng chính, giải phóng các nút khỏi việc phải xác minh mọi giao dịch.

Việc tính toán ngoài chuỗi là cần thiết vì các chuỗi Plasma có thể tối ưu hóa về tốc độ và chi phí. Ví dụ: một chuỗi Plasma có thể—và thường là—sử dụng một "người vận hành" duy nhất để quản lý việc sắp xếp thứ tự và thực thi các giao dịch. Với chỉ một thực thể duy nhất xác minh các giao dịch, thời gian xử lý trên một chuỗi Plasma sẽ nhanh hơn Mạng chính Ethereum.

### Cam kết trạng thái {#state-commitments}

Mặc dù Plasma thực thi các giao dịch ngoài chuỗi, chúng được thanh toán trên lớp thực thi chính của Ethereum—nếu không, các chuỗi Plasma sẽ không thể hưởng lợi từ các đảm bảo bảo mật của Ethereum. Nhưng việc hoàn tất các giao dịch ngoài chuỗi mà không biết trạng thái của chuỗi Plasma sẽ phá vỡ mô hình bảo mật và cho phép sự gia tăng của các giao dịch không hợp lệ. Đây là lý do tại sao người vận hành, thực thể chịu trách nhiệm tạo ra các khối trên chuỗi Plasma, được yêu cầu phải công bố các "cam kết trạng thái" trên Ethereum theo định kỳ.

Một [kế hoạch cam kết](https://en.wikipedia.org/wiki/Commitment_scheme) là một kỹ thuật mật mã học để cam kết về một giá trị hoặc một tuyên bố mà không tiết lộ nó cho bên khác. Các cam kết có tính "ràng buộc" theo nghĩa là bạn không thể thay đổi giá trị hoặc tuyên bố sau khi bạn đã cam kết với nó. Các cam kết trạng thái trong Plasma mang hình thức của các "gốc Merkle" (được dẫn xuất từ một [cây Merkle](/whitepaper/#merkle-trees)) mà người vận hành gửi theo từng khoảng thời gian đến hợp đồng Plasma trên chuỗi Ethereum.

Các gốc Merkle là các nguyên thủy mật mã học cho phép nén một lượng lớn thông tin. Một gốc Merkle (cũng được gọi là "gốc khối" trong trường hợp này) có thể đại diện cho tất cả các giao dịch trong một khối. Các gốc Merkle cũng giúp việc xác minh rằng một mẩu dữ liệu nhỏ là một phần của tập dữ liệu lớn hơn trở nên dễ dàng hơn. Ví dụ, một người dùng có thể tạo ra một [bằng chứng Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) để chứng minh sự bao gồm của một giao dịch trong một khối cụ thể.

Gốc Merkle rất quan trọng để cung cấp thông tin về trạng thái ngoài chuỗi cho Ethereum. Bạn có thể coi gốc Merkle như những "điểm lưu": người vận hành đang nói rằng "Đây là trạng thái của chuỗi Plasma tại thời điểm x, và đây là gốc Merkle như một bằng chứng." Người vận hành đang cam kết với _trạng thái hiện tại_ của chuỗi Plasma bằng một gốc Merkle, đó là lý do tại sao nó được gọi là "cam kết trạng thái".

### Đi vào và thoát ra {#entries-and-exits}

Để người dùng Ethereum có thể tận dụng lợi thế của Plasma, cần có một cơ chế để di chuyển tiền giữa Mạng chính và chuỗi Plasma. Mặc dù vậy, chúng ta không thể tùy ý gửi ether tới một Địa chỉ trên chuỗi Plasma—những chuỗi này không tương thích với nhau, do đó giao dịch sẽ thất bại hoặc dẫn đến mất tiền.

Plasma sử dụng một hợp đồng chính chạy trên Ethereum để xử lý các khoản vào và thoát của người dùng. Hợp đồng chính này cũng chịu trách nhiệm theo dõi các cam kết trạng thái (được giải thích ở trên) và trừng phạt hành vi thiếu trung thực thông qua các bằng chứng gian lận (sẽ nói thêm về điều này sau).

#### Tham gia vào chuỗi Plasma {#entering-the-plasma-chain}

Để tham gia vào chuỗi Plasma, Alice (người dùng) sẽ phải gửi ETH hoặc bất kỳ token ERC-20 nào vào hợp đồng Plasma. Người vận hành Plasma, người theo dõi các khoản tiền gửi vào hợp đồng, sẽ tái tạo một khoản tiền bằng với số tiền gửi ban đầu của Alice và chuyển nó đến Địa chỉ của cô ấy trên chuỗi Plasma. Alice được yêu cầu chứng thực việc nhận quỹ tiền trên chuỗi con và sau đó có thể sử dụng các khoản tiền này cho các giao dịch.

#### Thoát khỏi chuỗi Plasma {#exiting-the-plasma-chain}

Việc thoát khỏi chuỗi Plasma phức tạp hơn so với việc tham gia vì nhiều lý do. Lý do lớn nhất là, trong khi Ethereum có thông tin về trạng thái của chuỗi Plasma, nó không thể xác minh thông tin đó là đúng hay sai. Một người dùng độc hại có thể đưa ra một khẳng định không chính xác ("Tôi có 1000 ETH") và thoát tội bằng cách cung cấp các bằng chứng giả mạo để chứng minh cho khẳng định đó.

Để ngăn chặn các khoản rút tiền độc hại, một "khoảng thời gian thử thách" được đưa ra. Trong khoảng thời gian thử thách này (thường là một tuần), bất kỳ ai cũng có thể thách thức một yêu cầu rút tiền bằng cách sử dụng bằng chứng gian lận. Nếu thách thức thành công, thì yêu cầu rút tiền sẽ bị từ chối.

Tuy nhiên, thông thường thì người dùng trung thực và đưa ra các yêu cầu nhận chính xác về số tiền mà họ sở hữu. Trong kịch bản này, Alice sẽ khởi tạo một yêu cầu rút tiền trên chuỗi gốc (Ethereum) bằng cách gửi một giao dịch đến hợp đồng Plasma.

Cô ấy cũng phải cung cấp một bằng chứng Merkle để xác minh rằng một giao dịch tạo ra số tiền của cô ấy trên chuỗi Plasma đã được bao gồm trong một khối. Điều này là cần thiết đối với các phiên bản của Plasma, chẳng hạn như Plasma MVP, sử dụng mô hình [Đầu ra giao dịch chưa chi tiêu (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Các phiên bản khác, như Plasma Cash, đại diện cho quỹ tiền dưới dạng các [token không thể thay thế](/developers/docs/standards/tokens/erc-721/) thay vì các UTXO. Việc rút tiền, trong trường hợp này, yêu cầu có bằng chứng về quyền sở hữu các token trên chuỗi Plasma. Điều này được thực hiện bằng cách gửi hai giao dịch mới nhất liên quan đến token và cung cấp một bằng chứng Merkle để xác minh sự bao gồm của những giao dịch đó trong một khối.

Người dùng cũng phải thêm một khoản tiền ký quỹ vào yêu cầu rút tiền như một sự bảo đảm cho hành vi trung thực. Nếu một người thách thức chứng minh yêu cầu rút tiền của Alice là không hợp lệ, khoản ký quỹ của cô ấy sẽ bị phạt cắt giảm, và một phần trong số đó sẽ được chuyển cho người thách thức như một phần thưởng.

Nếu khoảng thời gian thử thách trôi qua mà không có ai cung cấp bằng chứng gian lận, yêu cầu rút tiền của Alice được coi là hợp lệ, cho phép cô ấy lấy lại tiền gửi từ hợp đồng Plasma trên Ethereum.

### Phân xử tranh chấp {#dispute-arbitration}

Giống như bất kỳ Chuỗi khối nào, các chuỗi Plasma cần một cơ chế để thực thi tính toàn vẹn của các giao dịch trong trường hợp những người tham gia hành động ác ý (ví dụ: chi tiêu kép quỹ tiền). Để đạt được mục đích này, các chuỗi Plasma sử dụng bằng chứng gian lận để phân xử các tranh chấp liên quan đến tính hợp lệ của các chuyển đổi trạng thái và trừng phạt hành vi xấu. Bằng chứng gian lận được sử dụng như một cơ chế mà qua đó một chuỗi con Plasma nộp khiếu nại lên chuỗi cha hoặc chuỗi gốc của nó.

Một bằng chứng gian lận đơn giản là một yêu cầu nhận định rằng một chuyển đổi trạng thái cụ thể là không hợp lệ. Một ví dụ là khi một người dùng (Alice) cố gắng chi tiêu cùng một số tiền hai lần. Có thể cô ấy đã chi tiêu UTXO trong một giao dịch với Bob và muốn chi tiêu cùng UTXO đó (hiện đã là của Bob) trong một giao dịch khác.

Để ngăn chặn việc rút tiền, Bob sẽ xây dựng một bằng chứng gian lận bằng cách cung cấp chứng cứ về việc Alice đã chi tiêu UTXO nói trên trong một giao dịch trước đó và một bằng chứng Merkle về việc giao dịch đã được bao gồm trong một khối. Quy trình tương tự cũng áp dụng trong Plasma Cash—Bob sẽ cần cung cấp bằng chứng rằng trước đó Alice đã chuyển đi những token mà cô ấy đang cố gắng rút.

Nếu thách thức của Bob thành công, yêu cầu rút tiền của Alice sẽ bị hủy bỏ. Tuy nhiên, phương pháp này phụ thuộc vào khả năng của Bob trong việc theo dõi chuỗi để tìm các yêu cầu rút tiền. Nếu Bob ngoại tuyến, thì Alice có thể xử lý khoản rút tiền độc hại một khi thời gian thử thách trôi qua.

## Vấn đề thoát hàng loạt trong Plasma {#the-mass-exit-problem-in-plasma}

Vấn đề thoát hàng loạt xảy ra khi một số lượng lớn người dùng cố gắng rút tiền từ chuỗi Plasma cùng một lúc. Lý do tồn tại vấn đề này liên quan đến một trong những hạn chế lớn nhất của Plasma: **sự không có sẵn của dữ liệu**.

Tính khả dụng của dữ liệu là khả năng xác minh rằng thông tin đối với một khối được đề xuất đã thực sự được công bố trên mạng lưới Chuỗi khối. Một khối được coi là "không khả dụng" nếu nhà sản xuất công bố bản thân khối đó nhưng lại giữ lại dữ liệu được sử dụng để tạo ra khối.

Các khối phải khả dụng nếu các nút muốn có thể tải xuống khối và xác minh tính hợp lệ của các giao dịch. Các Chuỗi khối đảm bảo tính khả dụng của dữ liệu bằng cách buộc những nhà sản xuất khối phải đăng tất cả dữ liệu giao dịch trên chuỗi.

Tính khả dụng của dữ liệu cũng giúp bảo mật các giao thức mở rộng quy mô ngoài chuỗi được xây dựng trên lớp cơ sở của Ethereum. Bằng cách buộc những người vận hành trên các chuỗi này công bố dữ liệu giao dịch trên Ethereum, bất kỳ ai cũng có thể thách thức các khối không hợp lệ bằng cách xây dựng bằng chứng gian lận tham chiếu đến trạng thái chính xác của chuỗi.

Các chuỗi Plasma chủ yếu lưu trữ dữ liệu giao dịch với người vận hành và **không công bố bất kỳ dữ liệu nào trên Mạng chính** (nghĩa là, ngoại trừ các cam kết trạng thái định kỳ). Điều này có nghĩa là người dùng phải phụ thuộc vào người vận hành trong việc cung cấp dữ liệu khối nếu họ cần tạo các bằng chứng gian lận để thách thức các giao dịch không hợp lệ. Nếu hệ thống này hoạt động, người dùng luôn có thể sử dụng các bằng chứng gian lận để đảm bảo an toàn cho quỹ tiền.

Vấn đề bắt đầu xảy ra khi người vận hành, không chỉ là bất kỳ người dùng nào, lại là bên hành động ác ý. Do người vận hành có toàn quyền kiểm soát đối với Chuỗi khối, họ có nhiều động cơ hơn để xúc tiến các chuyển đổi trạng thái không hợp lệ ở quy mô lớn hơn, chẳng hạn như đánh cắp quỹ tiền thuộc về những người dùng trên chuỗi Plasma.

Trong trường hợp này, việc sử dụng hệ thống bằng chứng gian lận cổ điển sẽ không có tác dụng. Người vận hành có thể dễ dàng thực hiện một giao dịch không hợp lệ chuyển số tiền của Alice và Bob sang Ví của họ và che giấu đi dữ liệu cần thiết để tạo bằng chứng gian lận. Điều này hoàn toàn có thể xảy ra vì người vận hành không bị bắt buộc phải cung cấp dữ liệu cho người dùng hoặc Mạng chính.

Do đó, giải pháp lạc quan nhất là thử một đợt "thoát hàng loạt" của những người dùng khỏi chuỗi Plasma. Việc thoát hàng loạt làm chậm kế hoạch đánh cắp tiền của người vận hành độc hại và mang lại một số biện pháp bảo vệ cho người dùng. Các yêu cầu rút tiền được sắp xếp theo trình tự dựa trên thời điểm mỗi UTXO (hoặc token) được tạo ra, ngăn chặn những người vận hành ác ý chạy trước những người dùng trung thực.

Dù vậy, chúng ta vẫn cần một cách để xác minh tính hợp lệ của các yêu cầu rút tiền trong suốt đợt thoát hàng loạt—để ngăn những cá nhân cơ hội lợi dụng sự hỗn loạn nhằm xử lý các đợt thoát không hợp lệ. Giải pháp rất đơn giản: yêu cầu người dùng phải đăng tải **trạng thái hợp lệ cuối cùng của chuỗi** để rút tiền của họ.

Nhưng phương pháp này vẫn còn những vấn đề. Ví dụ, nếu tất cả người dùng trên chuỗi Plasma cần phải thoát (điều này có thể xảy ra trong trường hợp có người vận hành ác ý), thì toàn bộ trạng thái hợp lệ của chuỗi Plasma phải được kết xuất lên lớp cơ sở của Ethereum cùng một lúc. Với kích thước tùy ý của các chuỗi Plasma (thông lượng cao = nhiều dữ liệu hơn) và những hạn chế về tốc độ xử lý của Ethereum, đây không phải là một giải pháp lý tưởng.

Mặc dù các trò chơi thoát ra nghe có vẻ hay về mặt lý thuyết, nhưng các đợt thoát hàng loạt trong thực tế có khả năng gây ra sự tắc nghẽn trên toàn mạng lưới trên chính Ethereum. Bên cạnh việc làm tổn hại đến chức năng của Ethereum, một đợt thoát hàng loạt được phối hợp kém đồng nghĩa với việc người dùng có thể không lấy lại được tiền trước khi người vận hành rút sạch mọi Tài khoản trên chuỗi Plasma.

## Ưu và nhược điểm của Plasma {#pros-and-cons-of-plasma}

| Ưu điểm                                                                                                                                                                                                                             | Nhược điểm                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cung cấp thông lượng cao và chi phí thấp cho mỗi giao dịch.                                                                                                                                                                             | Không hỗ trợ tính toán chung (không thể chạy các hợp đồng thông minh). Chỉ các chuyển khoản token cơ bản, hoán đổi và một số loại giao dịch khác mới được hỗ trợ thông qua logic vị từ.    |
| Tốt cho các giao dịch giữa những người dùng ngẫu nhiên (không có chi phí bổ sung cho mỗi cặp người dùng nếu cả hai đã được thiết lập trên chuỗi Plasma)                                                                                                            | Cần phải theo dõi mạng lưới định kỳ (yêu cầu về tính sống) hoặc ủy quyền trách nhiệm này cho người khác để đảm bảo an toàn cho quỹ tiền của bạn.                          |
| Chuỗi Plasma có thể được điều chỉnh cho các trường hợp sử dụng cụ thể mà không liên quan đến chuỗi chính. Bất kỳ ai, bao gồm cả các doanh nghiệp, đều có thể tùy chỉnh các hợp đồng thông minh Plasma để cung cấp cơ sở hạ tầng có thể mở rộng hoạt động trong các bối cảnh khác nhau. | Phụ thuộc vào một hoặc nhiều người vận hành để lưu trữ dữ liệu và cung cấp khi có yêu cầu.                                                                                                     |
| Giảm tải cho Mạng chính Ethereum bằng cách chuyển việc tính toán và lưu trữ ra ngoài chuỗi.                                                                                                                                                    | Các khoản rút tiền bị trì hoãn vài ngày để cho phép các thách thức. Đối với các tài sản có thể thay thế, điều này có thể được giảm thiểu bởi các nhà cung cấp Thanh khoản, nhưng đi kèm với một chi phí vốn liên quan. |
|                                                                                                                                                                                                                                  | Nếu có quá nhiều người dùng cố gắng thoát cùng một lúc, Mạng chính Ethereum có thể bị tắc nghẽn.                                                                                          |

## Plasma và các giao thức mở rộng quy mô lớp 2 {#plasma-vs-layer-2}

Mặc dù Plasma từng được coi là một giải pháp mở rộng quy mô hữu ích cho Ethereum, nhưng nó đã bị loại bỏ để nhường chỗ cho [các giao thức mở rộng quy mô lớp 2 (l2)](/layer-2/). Các giải pháp mở rộng quy mô l2 khắc phục một số vấn đề của Plasma:

### Hiệu quả {#efficiency}

[Các bản cuộn không tri thức](/developers/docs/scaling/zk-rollups) tạo ra các bằng chứng mật mã về tính hợp lệ của từng lô giao dịch được xử lý ngoài chuỗi. Điều này ngăn người dùng (và những người vận hành) đưa ra các chuyển đổi trạng thái không hợp lệ, loại bỏ nhu cầu về các giai đoạn thử thách và trò chơi thoát ra. Điều đó cũng có nghĩa là người dùng không cần phải theo dõi chuỗi định kỳ để đảm bảo an toàn cho tiền của họ.

### Hỗ trợ cho các hợp đồng thông minh {#support-for-smart-contracts}

Một vấn đề khác với khuôn khổ Plasma là [không có khả năng hỗ trợ thực thi các hợp đồng thông minh Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Do đó, hầu hết các triển khai của Plasma chủ yếu được xây dựng cho các khoản thanh toán đơn giản hoặc trao đổi token ERC-20.

Ngược lại, các bản cuộn lạc quan, tương thích với [Máy ảo Ethereum](/developers/docs/evm/) và có thể chạy các [hợp đồng thông minh](/developers/docs/smart-contracts/) gốc của Ethereum, khiến chúng trở thành một giải pháp hữu ích và _bảo mật_ để mở rộng quy mô các [ứng dụng phi tập trung (dapp)](/developers/docs/dapps/). Tương tự, các kế hoạch đang được tiến hành để [tạo ra một bản triển khai không tri thức của EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) cho phép các ZK-rollup có thể xử lý logic tùy ý và thực thi các hợp đồng thông minh.

### Tính không khả dụng của dữ liệu {#data-unavailability}

Như đã giải thích trước đó, Plasma gặp phải vấn đề về tính khả dụng của dữ liệu. Nếu một người vận hành ác ý xúc tiến một chuyển đổi không hợp lệ trên chuỗi Plasma, người dùng sẽ không thể thách thức nó do người vận hành có thể giữ lại dữ liệu cần thiết để tạo bằng chứng gian lận. Các Bản cuộn giải quyết vấn đề này bằng cách buộc những người vận hành đăng dữ liệu giao dịch lên Ethereum, cho phép bất kỳ ai xác minh trạng thái của chuỗi và tạo bằng chứng gian lận nếu cần thiết.

### Vấn đề thoát hàng loạt {#mass-exit-problem}

Các bản cuộn ZK và các bản cuộn lạc quan đều giải quyết vấn đề thoát hàng loạt của Plasma theo nhiều cách khác nhau. Ví dụ, ZK-rollup dựa trên các cơ chế mật mã học đảm bảo rằng những người vận hành không thể đánh cắp tiền của người dùng trong bất kỳ kịch bản nào.

Tương tự, các bản cuộn lạc quan áp đặt một khoảng thời gian trì hoãn cho các lần rút tiền, trong thời gian đó bất kỳ ai cũng có thể khởi xướng thách thức và ngăn chặn các yêu cầu rút tiền độc hại. Mặc dù điều này tương tự như Plasma, nhưng sự khác biệt là những người xác minh có quyền truy cập vào dữ liệu cần thiết để tạo bằng chứng gian lận. Do đó, những người dùng của Bản cuộn không cần phải tham gia vào một cuộc di cư hỗn loạn theo kiểu "ai ra trước thì thoát" sang Mạng chính Ethereum.

## Plasma khác với các chuỗi phụ và chuỗi phân mảnh như thế nào? {#plasma-sidechains-sharding}

Plasma, các chuỗi phụ và phân mảnh khá tương tự nhau vì tất cả chúng đều kết nối với Mạng chính Ethereum theo một cách nào đó. Tuy nhiên, mức độ và cường độ của các kết nối này khác nhau, điều này ảnh hưởng đến các đặc tính bảo mật của từng giải pháp mở rộng quy mô.

### Plasma và chuỗi phụ {#plasma-vs-sidechains}

Một [chuỗi phụ](/developers/docs/scaling/sidechains/) là một Chuỗi khối được vận hành độc lập, kết nối với Mạng chính Ethereum thông qua cầu nối hai chiều. Các [cầu nối](/bridges/) cho phép người dùng trao đổi token giữa hai Chuỗi khối để giao dịch trên chuỗi phụ, giúp giảm bớt sự tắc nghẽn trên Mạng chính Ethereum và cải thiện khả năng mở rộng.
Các chuỗi phụ sử dụng một cơ chế đồng thuận riêng biệt và thường nhỏ hơn nhiều so với Mạng chính Ethereum. Do đó, việc làm cầu nối chuyển tài sản sang các chuỗi này liên quan đến rủi ro cao hơn; với sự thiếu hụt các đảm bảo bảo mật được kế thừa từ Mạng chính Ethereum trong mô hình chuỗi phụ, người dùng có nguy cơ bị mất tiền trong một cuộc tấn công vào chuỗi phụ.

Ngược lại, các chuỗi Plasma nhận được tính bảo mật từ Mạng chính. Điều này làm cho chúng an toàn hơn đáng kể so với các chuỗi phụ. Cả chuỗi phụ và chuỗi Plasma đều có thể có các giao thức đồng thuận khác nhau, nhưng điểm khác biệt là các chuỗi Plasma công bố các gốc Merkle đối với mỗi khối trên Mạng chính Ethereum. Các gốc khối là những đoạn thông tin nhỏ mà chúng ta có thể sử dụng để xác minh thông tin về các giao dịch xảy ra trên một chuỗi Plasma. Nếu một cuộc tấn công xảy ra trên một chuỗi Plasma, người dùng có thể rút tiền an toàn về Mạng chính bằng cách sử dụng các bằng chứng thích hợp.

### Plasma và phân mảnh {#plasma-vs-sharding}

Cả chuỗi Plasma và chuỗi phân mảnh đều định kỳ công bố các chứng minh mật mã lên Mạng chính Ethereum. Tuy nhiên, cả hai có các đặc tính bảo mật khác nhau.

Các chuỗi phân mảnh cam kết các "tiêu đề đối chiếu" lên Mạng chính chứa thông tin chi tiết về từng phân mảnh dữ liệu. Các nút trên Mạng chính xác minh và thực thi tính hợp lệ của các phân mảnh dữ liệu, giảm thiểu khả năng xảy ra các chuyển đổi phân mảnh không hợp lệ và bảo vệ mạng lưới chống lại hoạt động độc hại.

Plasma khác biệt vì Mạng chính chỉ nhận được một lượng thông tin tối thiểu về trạng thái của các chuỗi con. Điều này có nghĩa là Mạng chính không thể xác minh một cách hiệu quả các giao dịch được tiến hành trên các chuỗi con, làm cho chúng kém an toàn hơn.

**Lưu ý** rằng việc phân mảnh Chuỗi khối Ethereum không còn nằm trên lộ trình phát triển nữa. Nó đã được thay thế bằng việc mở rộng quy mô thông qua các Bản cuộn và [danksharding](/roadmap/danksharding).

### Sử dụng Plasma {#use-plasma}

Một số dự án cung cấp các bản triển khai của Plasma mà bạn có thể tích hợp vào các dapp của mình:

- [Polygon](https://polygon.technology/) (trước đây là Matic Network)

## Đọc thêm {#further-reading}

- [Gợi nhớ nhanh về ý nghĩa của "bảo mật chia sẻ" và tại sao nó lại quan trọng đến vậy](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Chuỗi phụ và Plasma và Phân mảnh](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Tìm hiểu về Plasma, Phần 1: Những điều cơ bản](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Sự sống và cái chết của Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Bạn biết một tài nguyên cộng đồng đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm tài nguyên đó vào!_

## Hướng dẫn: Chuỗi Plasma trên Ethereum {#tutorials}

- [Viết một plasma dành riêng cho ứng dụng nhằm bảo vệ quyền riêng tư](/developers/tutorials/app-plasma/) _– Xây dựng một ứng dụng plasma bảo vệ quyền riêng tư bằng cách sử dụng Bằng chứng không kiến thức và các thành phần ngoài chuỗi._