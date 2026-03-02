---
title: "Các chuỗi Plasma"
description: "Giới thiệu về các chuỗi Plasma như một giải pháp thay đổi quy mô hiện đang được cộng đồng Ethereum sử dụng."
lang: vi
incomplete: true
sidebarDepth: 3
---

Chuỗi Plasma là một chuỗi khối riêng biệt được neo vào Mạng chính Ethereum nhưng thực hiện các giao dịch ngoài chuỗi bằng cơ chế xác thực khối riêng. Các chuỗi Plasma đôi khi được gọi là chuỗi "con", về cơ bản là các bản sao nhỏ hơn của Mạng chính Ethereum. Các chuỗi Plasma sử dụng [bằng chứng gian lận](/glossary/#fraud-proof) (giống như [các gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups/)) để phân xử các tranh chấp.

Cây Merkle cho phép tạo ra một chồng chuỗi vô tận có thể hoạt động để giảm tải băng thông từ các chuỗi mẹ (bao gồm cả Mạng chính Ethereum). Tuy nhiên, trong khi các chuỗi này có được một số bảo mật từ Ethereum (thông qua bằng chứng gian lận), thì tính bảo mật và hiệu quả của chúng lại bị ảnh hưởng bởi một số hạn chế về thiết kế.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên có hiểu biết tốt về tất cả các chủ đề nền tảng và hiểu biết ở cấp độ cao về [việc thay đổi quy mô của Ethereum](/developers/docs/scaling/).

## Plasma là gì?

Plasma là một khuôn khổ để cải thiện khả năng mở rộng trong các chuỗi khối công khai như Ethereum. Như được mô tả trong [sách trắng Plasma](http://plasma.io/plasma.pdf) ban đầu, các chuỗi Plasma được xây dựng trên một chuỗi khối khác (được gọi là "chuỗi gốc"). Mỗi "chuỗi con" kéo dài từ chuỗi gốc và thường được quản lý bởi một hợp đồng thông minh được triển khai trên chuỗi mẹ.

Hợp đồng Plasma hoạt động, cùng với các chức năng khác, như một [cầu nối](/developers/docs/bridges/) cho phép người dùng di chuyển tài sản giữa Mạng chính Ethereum và chuỗi Plasma. Mặc dù điều này làm cho chúng tương tự như [các chuỗi bên](/developers/docs/scaling/sidechains/), các chuỗi plasma được hưởng lợi — ít nhất là ở một mức độ nào đó — từ tính bảo mật của Mạng chính Ethereum. Điều này không giống như các chuỗi bên hoàn toàn chịu trách nhiệm về tính bảo mật của chúng.

## Plasma hoạt động như thế nào?

Các thành phần cơ bản của khuôn khổ Plasma là:

### Tính toán ngoài chuỗi {#offchain-computation}

Tốc độ xử lý hiện tại của Ethereum bị giới hạn ở khoảng 15-20 giao dịch mỗi giây, làm giảm khả năng thay đổi quy mô trong ngắn hạn để xử lý nhiều người dùng hơn. Vấn đề này tồn tại chủ yếu là do [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/) của Ethereum yêu cầu nhiều nút ngang hàng xác minh mọi cập nhật đối với trạng thái của chuỗi khối.

Mặc dù cơ chế đồng thuận của Ethereum là cần thiết để bảo mật, nó có thể không áp dụng cho mọi trường hợp sử dụng. Ví dụ: Alice có thể không cần các khoản thanh toán hàng ngày của mình cho Bob cho một tách cà phê được xác minh bởi toàn bộ mạng Ethereum vì giữa hai bên đã có một số sự tin tưởng nhất định.

Plasma cho rằng Mạng chính Ethereum không cần xác minh tất cả các giao dịch. Thay vào đó, chúng ta có thể xử lý các giao dịch ngoài Mạng chính, giải phóng các nút khỏi việc phải xác thực mọi giao dịch.

Tính toán ngoài chuỗi là cần thiết vì các chuỗi Plasma có thể tối ưu hóa tốc độ và chi phí. Ví dụ: một chuỗi Plasma có thể — và thường xuyên nhất là — sử dụng một "người vận hành" duy nhất để quản lý việc sắp xếp thứ tự và thực hiện các giao dịch. Chỉ với một thực thể xác minh các giao dịch, thời gian xử lý trên chuỗi plasma nhanh hơn Mạng chính Ethereum.

### Cam kết trạng thái {#state-commitments}

Trong khi Plasma thực hiện các giao dịch ngoài chuỗi, chúng được giải quyết trên lớp thực thi Ethereum chính — nếu không, các chuỗi Plasma không thể hưởng lợi từ sự đảm bảo bảo mật của Ethereum. Nhưng việc hoàn tất các giao dịch ngoài chuỗi mà không biết trạng thái của chuỗi plasma sẽ phá vỡ mô hình bảo mật và cho phép sự gia tăng của các giao dịch không hợp lệ. Đây là lý do tại sao người vận hành, thực thể chịu trách nhiệm sản xuất các khối trên chuỗi plasma, được yêu cầu xuất bản các "cam kết trạng thái" trên Ethereum theo định kỳ.

[Lược đồ cam kết](https://en.wikipedia.org/wiki/Commitment_scheme) là một kỹ thuật mã hóa để cam kết một giá trị hoặc một tuyên bố mà không tiết lộ nó cho một bên khác. Các cam kết có tính "ràng buộc" theo nghĩa là bạn không thể thay đổi giá trị hoặc tuyên bố một khi bạn đã cam kết với nó. Các cam kết trạng thái trong Plasma có dạng "gốc Merkle" (bắt nguồn từ [cây Merkle](/whitepaper/#merkle-trees)) mà người vận hành gửi theo các khoảng thời gian đến hợp đồng Plasma trên chuỗi Ethereum.

Gốc Merkle là các nguyên hàm mã hóa cho phép nén lượng lớn thông tin. Gốc Merkle (còn được gọi là "gốc khối" trong trường hợp này) có thể đại diện cho tất cả các giao dịch trong một khối. Gốc Merkle cũng giúp dễ dàng xác minh rằng một phần dữ liệu nhỏ là một phần của tập dữ liệu lớn hơn. Ví dụ, người dùng có thể tạo [bằng chứng Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) để chứng minh sự bao gồm của một giao dịch trong một khối cụ thể.

Gốc Merkle rất quan trọng để cung cấp thông tin về trạng thái ngoài chuỗi cho Ethereum. Bạn có thể nghĩ về gốc Merkle như là các "điểm lưu": người vận hành đang nói, "Đây là trạng thái của chuỗi Plasma tại thời điểm x, và đây là gốc Merkle làm bằng chứng." Người vận hành đang cam kết với _trạng thái hiện tại_ của chuỗi plasma với một gốc Merkle, đó là lý do tại sao nó được gọi là "cam kết trạng thái".

### Vào và thoát {#entries-and-exits}

Để người dùng Ethereum tận dụng lợi thế của Plasma, cần có một cơ chế để di chuyển tiền giữa Mạng chính và các chuỗi plasma. Tuy nhiên, chúng ta không thể tùy tiện gửi ether đến một địa chỉ trên chuỗi plasma — các chuỗi này không tương thích, vì vậy giao dịch sẽ thất bại hoặc dẫn đến mất tiền.

Plasma sử dụng một hợp đồng chính chạy trên Ethereum để xử lý việc vào và ra của người dùng. Hợp đồng chính này cũng chịu trách nhiệm theo dõi các cam kết trạng thái (đã giải thích trước đó) và trừng phạt hành vi không trung thực thông qua các bằng chứng gian lận (sẽ nói thêm về điều này sau).

#### Vào chuỗi plasma {#entering-the-plasma-chain}

Để vào chuỗi plasma, Alice (người dùng) sẽ phải gửi ETH hoặc bất kỳ token ERC-20 nào vào hợp đồng plasma. Người vận hành plasma, người theo dõi các khoản tiền gửi của hợp đồng, tạo lại một số tiền bằng với khoản tiền gửi ban đầu của Alice và chuyển nó đến địa chỉ của cô ấy trên chuỗi plasma. Alice được yêu cầu chứng thực việc nhận tiền trên chuỗi con và sau đó có thể sử dụng số tiền này cho các giao dịch.

#### Thoát khỏi chuỗi plasma {#exiting-the-plasma-chain}

Thoát khỏi chuỗi plasma phức tạp hơn việc vào chuỗi vì một số lý do. Lý do lớn nhất là, trong khi Ethereum có thông tin về trạng thái của chuỗi plasma, nó không thể xác minh thông tin đó có đúng hay không. Một người dùng độc hại có thể đưa ra một khẳng định không chính xác ("Tôi có 1000 ETH") và thoát khỏi việc cung cấp các bằng chứng giả để sao lưu cho tuyên bố đó.

Để ngăn chặn việc rút tiền độc hại, một "thời gian thử thách" được đưa ra. Trong thời gian thử thách (thường là một tuần), bất kỳ ai cũng có thể thách thức yêu cầu rút tiền bằng cách sử dụng bằng chứng gian lận. Nếu thử thách thành công, thì yêu cầu rút tiền sẽ bị từ chối.

Tuy nhiên, thông thường, người dùng trung thực và đưa ra các tuyên bố chính xác về số tiền họ sở hữu. Trong trường hợp này, Alice sẽ bắt đầu một yêu cầu rút tiền trên chuỗi gốc (Ethereum) bằng cách gửi một giao dịch đến hợp đồng plasma.

Cô ấy cũng phải cung cấp một bằng chứng Merkle xác minh rằng một giao dịch tạo ra tiền của cô ấy trên chuỗi Plasma đã được bao gồm trong một khối. Điều này là cần thiết cho các lần lặp lại của Plasma, chẳng hạn như [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), sử dụng mô hình [Đầu ra Giao dịch Chưa được Chi tiêu (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Những loại khác, như [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), đại diện cho các khoản tiền dưới dạng [token không thể thay thế](/developers/docs/standards/tokens/erc-721/) thay vì UTXO. Trong trường hợp này, việc rút tiền đòi hỏi bằng chứng về quyền sở hữu các token trên chuỗi Plasma. Điều này được thực hiện bằng cách gửi hai giao dịch gần đây nhất liên quan đến token và cung cấp một bằng chứng Merkle xác minh sự bao gồm của các giao dịch đó trong một khối.

Người dùng cũng phải thêm một khoản ký quỹ vào yêu cầu rút tiền như một sự đảm bảo cho hành vi trung thực. Nếu một người thách thức chứng minh yêu cầu rút tiền của Alice là không hợp lệ, khoản ký quỹ của cô ấy sẽ bị phạt và một phần trong số đó sẽ được chuyển cho người thách thức như một phần thưởng.

Nếu thời gian thử thách trôi qua mà không có ai cung cấp bằng chứng gian lận, yêu cầu rút tiền của Alice được coi là hợp lệ, cho phép cô ấy lấy lại tiền gửi từ hợp đồng Plasma trên Ethereum.

### Phân xử tranh chấp {#dispute-arbitration}

Giống như bất kỳ chuỗi khối nào, các chuỗi plasma cần một cơ chế để thực thi tính toàn vẹn của các giao dịch trong trường hợp những người tham gia có hành vi độc hại (ví dụ: chi tiêu gấp đôi). Để đạt được mục tiêu này, các chuỗi plasma sử dụng bằng chứng gian lận để phân xử các tranh chấp liên quan đến tính hợp lệ của các chuyển đổi trạng thái và xử phạt các hành vi xấu. Các bằng chứng gian lận được sử dụng như một cơ chế mà qua đó một chuỗi con Plasma nộp đơn khiếu nại lên chuỗi mẹ của nó hoặc lên chuỗi gốc.

Bằng chứng gian lận chỉ đơn giản là một tuyên bố rằng một chuyển đổi trạng thái cụ thể là không hợp lệ. Một ví dụ là nếu một người dùng (Alice) cố gắng chi tiêu cùng một khoản tiền hai lần. Có lẽ cô ấy đã chi tiêu UTXO trong một giao dịch với Bob và muốn chi tiêu cùng một UTXO (hiện là của Bob) trong một giao dịch khác.

Để ngăn chặn việc rút tiền, Bob sẽ xây dựng một bằng chứng gian lận bằng cách cung cấp bằng chứng về việc Alice đã chi tiêu UTXO nói trên trong một giao dịch trước đó và một bằng chứng Merkle về sự bao gồm của giao dịch trong một khối. Quy trình tương tự cũng hoạt động trong Plasma Cash — Bob sẽ cần cung cấp bằng chứng rằng Alice trước đó đã chuyển các token mà cô ấy đang cố gắng rút.

Nếu thử thách của Bob thành công, yêu cầu rút tiền của Alice sẽ bị hủy. Tuy nhiên, cách tiếp cận này phụ thuộc vào khả năng của Bob trong việc theo dõi chuỗi để tìm các yêu cầu rút tiền. Nếu Bob ngoại tuyến, thì Alice có thể xử lý việc rút tiền độc hại sau khi hết thời gian thử thách.

## Vấn đề thoát hàng loạt trong plasma {#the-mass-exit-problem-in-plasma}

Vấn đề thoát hàng loạt xảy ra khi một số lượng lớn người dùng cố gắng rút khỏi một chuỗi plasma cùng một lúc. Lý do vấn đề này tồn tại liên quan đến một trong những vấn đề lớn nhất của Plasma: **tính không sẵn có của dữ liệu**.

Tính sẵn có của dữ liệu là khả năng xác minh rằng thông tin cho một khối được đề xuất đã thực sự được xuất bản trên mạng chuỗi khối. Một khối là "không có sẵn" nếu nhà sản xuất xuất bản chính khối đó nhưng giữ lại dữ liệu được sử dụng để tạo khối.

Các khối phải có sẵn nếu các nút có thể tải xuống khối và xác minh tính hợp lệ của các giao dịch. Các chuỗi khối đảm bảo tính sẵn có của dữ liệu bằng cách buộc các nhà sản xuất khối phải đăng tất cả dữ liệu giao dịch trên chuỗi.

Tính sẵn có của dữ liệu cũng giúp bảo mật các giao thức thay đổi quy mô ngoài chuỗi được xây dựng trên lớp cơ sở của Ethereum. Bằng cách buộc các người vận hành trên các chuỗi này xuất bản dữ liệu giao dịch trên Ethereum, bất kỳ ai cũng có thể thách thức các khối không hợp lệ bằng cách xây dựng các bằng chứng gian lận tham chiếu đến trạng thái chính xác của chuỗi.

Các chuỗi Plasma chủ yếu lưu trữ dữ liệu giao dịch với người vận hành và **không xuất bản bất kỳ dữ liệu nào trên Mạng chính** (tức là, ngoài các cam kết trạng thái định kỳ). Điều này có nghĩa là người dùng phải dựa vào người vận hành để cung cấp dữ liệu khối nếu họ cần tạo bằng chứng gian lận thách thức các giao dịch không hợp lệ. Nếu hệ thống này hoạt động, thì người dùng luôn có thể sử dụng bằng chứng gian lận để bảo mật tiền.

Vấn đề bắt đầu khi người vận hành, chứ không phải bất kỳ người dùng nào, là bên hành động độc hại. Bởi vì người vận hành có toàn quyền kiểm soát chuỗi khối, họ có nhiều động cơ hơn để thúc đẩy các chuyển đổi trạng thái không hợp lệ ở quy mô lớn hơn, chẳng hạn như ăn cắp tiền thuộc về người dùng trên chuỗi plasma.

Trong trường hợp này, việc sử dụng hệ thống bằng chứng gian lận cổ điển không hoạt động. Người vận hành có thể dễ dàng thực hiện một giao dịch không hợp lệ chuyển tiền của Alice và Bob vào ví của họ và che giấu dữ liệu cần thiết để tạo bằng chứng gian lận. Điều này có thể thực hiện được vì người vận hành không bắt buộc phải cung cấp dữ liệu cho người dùng hoặc Mạng chính.

Do đó, giải pháp lạc quan nhất là cố gắng thực hiện một cuộc "thoát hàng loạt" của người dùng khỏi chuỗi plasma. Việc thoát hàng loạt làm chậm kế hoạch ăn cắp tiền của người vận hành độc hại và cung cấp một số biện pháp bảo vệ cho người dùng. Các yêu cầu rút tiền được sắp xếp theo thứ tự dựa trên thời điểm mỗi UTXO (hoặc token) được tạo ra, ngăn chặn các người vận hành độc hại chạy trước người dùng trung thực.

Tuy nhiên, chúng ta vẫn cần một cách để xác minh tính hợp lệ của các yêu cầu rút tiền trong một cuộc thoát hàng loạt — để ngăn chặn các cá nhân cơ hội lợi dụng sự hỗn loạn để xử lý các lần thoát không hợp lệ. Giải pháp rất đơn giản: yêu cầu người dùng đăng **trạng thái hợp lệ cuối cùng của chuỗi** để rút tiền của họ.

Nhưng cách tiếp cận này vẫn có vấn đề. Ví dụ: nếu tất cả người dùng trên chuỗi plasma cần thoát (điều này có thể xảy ra trong trường hợp có người vận hành độc hại), thì toàn bộ trạng thái hợp lệ của chuỗi plasma phải được đổ vào lớp cơ sở của Ethereum cùng một lúc. Với kích thước tùy ý của các chuỗi plasma (thông lượng cao = nhiều dữ liệu hơn) và các ràng buộc về tốc độ xử lý của Ethereum, đây không phải là một giải pháp lý tưởng.

Mặc dù các trò chơi thoát nghe có vẻ hay về mặt lý thuyết, nhưng các cuộc thoát hàng loạt trong đời thực có thể sẽ gây ra tắc nghẽn trên toàn mạng trên chính Ethereum. Bên cạnh việc gây hại cho chức năng của Ethereum, một cuộc thoát hàng loạt được phối hợp kém có nghĩa là người dùng có thể không thể rút tiền trước khi người vận hành rút cạn mọi tài khoản trên chuỗi plasma.

## Ưu và nhược điểm của plasma {#pros-and-cons-of-plasma}

| Ưu điểm                                                                                                                                                                                                                                                                                                            | Nhược điểm                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cung cấp thông lượng cao và chi phí thấp cho mỗi giao dịch.                                                                                                                                                                                                                                        | Không hỗ trợ tính toán chung (không thể chạy các hợp đồng thông minh). Chỉ các giao dịch chuyển token cơ bản, hoán đổi và một vài loại giao dịch khác được hỗ trợ thông qua logic vị từ.    |
| Tốt cho các giao dịch giữa những người dùng tùy ý (không có chi phí phát sinh cho mỗi cặp người dùng nếu cả hai đều được thiết lập trên chuỗi plasma)                                                                                                                                           | Cần phải theo dõi mạng định kỳ (yêu cầu về tính sống động) hoặc ủy thác trách nhiệm này cho người khác để đảm bảo an toàn cho tiền của bạn.                                                                 |
| Các chuỗi Plasma có thể được điều chỉnh cho các trường hợp sử dụng cụ thể không liên quan đến chuỗi chính. Bất kỳ ai, kể cả các doanh nghiệp, đều có thể tùy chỉnh các hợp đồng thông minh Plasma để cung cấp cơ sở hạ tầng có thể mở rộng hoạt động trong các bối cảnh khác nhau. | Dựa vào một hoặc nhiều người vận hành để lưu trữ dữ liệu và cung cấp dữ liệu theo yêu cầu.                                                                                                                                     |
| Giảm tải trên Mạng chính Ethereum bằng cách di chuyển tính toán và lưu trữ ra ngoài chuỗi.                                                                                                                                                                                                         | Việc rút tiền bị trì hoãn trong vài ngày để cho phép các thử thách. Đối với các tài sản có thể thay thế, điều này có thể được giảm thiểu bởi các nhà cung cấp thanh khoản, nhưng có một chi phí vốn liên quan. |
|                                                                                                                                                                                                                                                                                                                    | Nếu có quá nhiều người dùng cố gắng thoát đồng thời, Mạng chính Ethereum có thể bị tắc nghẽn.                                                                                                                                  |

## Plasma so với các giao thức thay đổi quy mô lớp 2 {#plasma-vs-layer-2}

Trong khi Plasma từng được coi là một giải pháp thay đổi quy mô hữu ích cho Ethereum, nó đã bị loại bỏ để chuyển sang các [giao thức thay đổi quy mô lớp 2 (L2)](/layer-2/). Các giải pháp thay đổi quy mô L2 khắc phục một số vấn đề của Plasma:

### Hiệu quả {#efficiency}

[Các gộp giao dịch không kiến thức](/developers/docs/scaling/zk-rollups) tạo ra các bằng chứng mã hóa về tính hợp lệ của mỗi lô giao dịch được xử lý ngoài chuỗi. Điều này ngăn người dùng (và người vận hành) thúc đẩy các chuyển đổi trạng thái không hợp lệ, loại bỏ nhu cầu về thời gian thử thách và các trò chơi thoát. Điều đó cũng có nghĩa là người dùng không phải theo dõi chuỗi định kỳ để bảo mật tiền của họ.

### Hỗ trợ các hợp đồng thông minh {#support-for-smart-contracts}

Một vấn đề khác với khuôn khổ plasma là [không có khả năng hỗ trợ việc thực thi các hợp đồng thông minh Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Do đó, hầu hết các triển khai của Plasma chủ yếu được xây dựng cho các khoản thanh toán đơn giản hoặc trao đổi token ERC-20.

Ngược lại, các gộp giao dịch lạc quan, tương thích với [Máy ảo Ethereum](/developers/docs/evm/) và có thể chạy các [hợp đồng thông minh](/developers/docs/smart-contracts/) gốc của Ethereum, khiến chúng trở thành một giải pháp hữu ích và _bảo mật_ để thay đổi quy mô [các ứng dụng phi tập trung](/developers/docs/dapps/). Tương tự, các kế hoạch đang được tiến hành để [tạo một triển khai không kiến thức của EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) sẽ cho phép các ZK-rollup xử lý logic tùy ý và thực thi các hợp đồng thông minh.

### Tính không sẵn có của dữ liệu {#data-unavailability}

Như đã giải thích trước đó, plasma gặp phải vấn đề về tính sẵn có của dữ liệu. Nếu một người vận hành độc hại thúc đẩy một quá trình chuyển đổi không hợp lệ trên chuỗi plasma, người dùng sẽ không thể thách thức nó vì người vận hành có thể giữ lại dữ liệu cần thiết để tạo bằng chứng gian lận. Các gộp giao dịch giải quyết vấn đề này bằng cách buộc các người vận hành đăng dữ liệu giao dịch trên Ethereum, cho phép bất kỳ ai xác minh trạng thái của chuỗi và tạo bằng chứng gian lận nếu cần.

### Vấn đề thoát hàng loạt {#mass-exit-problem}

Các ZK-rollup và gộp giao dịch lạc quan đều giải quyết vấn đề thoát hàng loạt của Plasma theo nhiều cách khác nhau. Ví dụ: một ZK-rollup dựa trên các cơ chế mã hóa đảm bảo rằng người vận hành không thể ăn cắp tiền của người dùng trong bất kỳ trường hợp nào.

Tương tự, các gộp giao dịch lạc quan áp đặt một khoảng thời gian trì hoãn đối với việc rút tiền, trong đó bất kỳ ai cũng có thể bắt đầu một thử thách và ngăn chặn các yêu cầu rút tiền độc hại. Mặc dù điều này tương tự như Plasma, nhưng điểm khác biệt là người xác minh có quyền truy cập vào dữ liệu cần thiết để tạo bằng chứng gian lận. Do đó, người dùng rollup không cần phải tham gia vào một cuộc di cư điên cuồng, "người đầu tiên ra ngoài" đến Mạng chính Ethereum.

## Plasma khác với chuỗi bên và phân mảnh như thế nào? {#plasma-sidechains-sharding}

Plasma, chuỗi bên và phân mảnh khá giống nhau vì tất cả chúng đều kết nối với Mạng chính Ethereum theo một cách nào đó. Tuy nhiên, mức độ và sức mạnh của các kết nối này khác nhau, điều này ảnh hưởng đến các thuộc tính bảo mật của từng giải pháp thay đổi quy mô.

### Plasma so với chuỗi bên {#plasma-vs-sidechains}

Một [chuỗi bên](/developers/docs/scaling/sidechains/) là một chuỗi khối được vận hành độc lập được kết nối với Mạng chính Ethereum thông qua một cầu nối hai chiều. [Các cầu nối](/bridges/) cho phép người dùng trao đổi các token giữa hai chuỗi khối để giao dịch trên chuỗi bên, giảm tắc nghẽn trên Mạng chính Ethereum và cải thiện khả năng mở rộng.
Các chuỗi bên sử dụng một cơ chế đồng thuận riêng biệt và thường nhỏ hơn nhiều so với Mạng chính Ethereum. Do đó, việc kết nối tài sản với các chuỗi này có nguy cơ gia tăng; do thiếu sự đảm bảo bảo mật được kế thừa từ Mạng chính Ethereum trong mô hình chuỗi bên, người dùng có nguy cơ mất tiền trong một cuộc tấn công vào chuỗi bên.

Ngược lại, các chuỗi plasma có được sự bảo mật từ Mạng chính. Điều này làm cho chúng an toàn hơn một cách có thể đo lường được so với các chuỗi bên. Cả chuỗi bên và chuỗi plasma đều có thể có các giao thức đồng thuận khác nhau, nhưng sự khác biệt là chuỗi plasma xuất bản các gốc Merkle cho mỗi khối trên Mạng chính Ethereum. Gốc khối là những mẩu thông tin nhỏ mà chúng ta có thể sử dụng để xác minh thông tin về các giao dịch xảy ra trên chuỗi plasma. Nếu một cuộc tấn công xảy ra trên chuỗi plasma, người dùng có thể rút tiền của họ một cách an toàn về Mạng chính bằng cách sử dụng các bằng chứng thích hợp.

### Plasma so với phân mảnh {#plasma-vs-sharding}

Cả chuỗi plasma và chuỗi phân mảnh đều định kỳ xuất bản các bằng chứng mã hóa cho Mạng chính Ethereum. Tuy nhiên, cả hai đều có các thuộc tính bảo mật khác nhau.

Các chuỗi phân mảnh cam kết các "tiêu đề đối chiếu" với Mạng chính có chứa thông tin chi tiết về từng phân mảnh dữ liệu. Các nút trên Mạng chính xác minh và thực thi tính hợp lệ của các phân mảnh dữ liệu, giảm khả năng chuyển đổi phân mảnh không hợp lệ và bảo vệ mạng khỏi hoạt động độc hại.

Plasma khác biệt vì Mạng chính chỉ nhận được thông tin tối thiểu về trạng thái của các chuỗi con. Điều này có nghĩa là Mạng chính không thể xác minh hiệu quả các giao dịch được thực hiện trên các chuỗi con, khiến chúng kém an toàn hơn.

**Lưu ý** rằng việc phân mảnh chuỗi khối Ethereum không còn nằm trong lộ trình. Nó đã được thay thế bằng việc thay đổi quy mô thông qua các gộp giao dịch và [Danksharding](/roadmap/danksharding).

### Sử dụng Plasma {#use-plasma}

Nhiều dự án cung cấp các triển khai Plasma mà bạn có thể tích hợp vào các ứng dụng phi tập trung của mình:

- [Polygon](https://polygon.technology/) (trước đây là Matic Network)

## Đọc thêm {#further-reading}

- [Tìm hiểu về Plasma](https://www.learnplasma.org/en/)
- [Lời nhắc nhanh về ý nghĩa của "bảo mật được chia sẻ" và tại sao nó lại quan trọng như vậy](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Chuỗi bên so với Plasma so với Phân mảnh](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Tìm hiểu về Plasma, Phần 1: Các vấn đề cơ bản](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [Sự sống và cái chết của Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
