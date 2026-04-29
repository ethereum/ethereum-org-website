---
title: "Chuỗi khối — ETH.BUILD"
description: "Một minh họa về cách thức khai thác Chuỗi khối hoạt động, bao gồm cách các khối được liên kết với nhau, cách bằng chứng công việc bảo mật Chuỗi khối và điều gì xảy ra khi ai đó cố gắng giả mạo dữ liệu."
lang: vi
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "khai thác"
  - "chuỗi khối"
format: tutorial
author: Austin Griffith
breadcrumb: "Chuỗi khối (ETH.BUILD)"
---

Một hướng dẫn của **Austin Griffith** minh họa cách thức khai thác Chuỗi khối hoạt động bằng cách sử dụng công cụ lập trình trực quan ETH.BUILD. Austin đề cập đến đồng thuận bằng chứng công việc (PoW), việc liên kết khối, độ khó khai thác, phần thưởng khối và tính bất biến của Chuỗi.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) do Austin Griffith xuất bản. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Vấn đề về sự phối hợp (0:00) {#the-problem-of-coordination-000}

Chào buổi sáng, thứ Sáu thắt nơ vui vẻ! Tập ETH.BUILD này tập trung vào Chuỗi khối — một thứ thực sự thú vị. Chúng ta đang ở trong chiếc thuyền hề này, với chiếc nơ Bitcoin của chúng ta. Bắt đầu nào.

Cho đến nay trong chương trình học, chúng ta đã đi qua các cặp khóa, mã băm và sổ cái. Những gì chúng ta nhận thấy là nếu chúng ta muốn giao dịch giá trị qua lại trên một mạng lưới phân tán — không phải mạng lưới tập trung — chúng ta sẽ gặp phải các vấn đề về sự phối hợp. Chúng ta gặp phải vấn đề là không thể tìm thấy sự đồng thuận giữa các bên khác nhau vì họ đều nhận được các giao dịch khác nhau vào những thời điểm khác nhau. Có rất nhiều cách khác nhau để giải quyết vấn đề này, nhưng không có cách nào thực sự tuyệt vời cho đến khi bằng chứng công việc (PoW) xuất hiện.

Chúng ta đã đề cập đến bài toán các vị tướng Byzantine như một nhiệm vụ phụ, và những gì chúng ta học được ở đó là các vị tướng cần phải chứng minh họ có một đội quân khi họ gửi thông điệp qua một mạng lưới không an toàn. Sau đó, bên nhận có thể biết rằng người đó thực sự là một vị tướng với một đội quân sắp tấn công, và họ có thể phối hợp với nhau.

#### Các khối và nonce (1:04) {#blocks-and-the-nonce-104}

Vì vậy, với sổ cái này, chúng ta đang đưa các giao dịch từ mạng lưới vào. Thay vì yêu cầu mỗi người dùng cá nhân chứng minh công việc của họ, chúng ta sẽ trừu tượng hóa bằng chứng công việc (PoW) thành một khối các giao dịch và để một thợ đào làm việc với nó.

Chúng ta đưa vào một khối chứa các giao dịch — bất cứ thứ gì đi qua mạng lưới, chúng ta đều tải vào khối này. Nếu chúng ta nhìn vào cấu trúc của khối này, nó cũng có một nonce. Nonce đó cho phép chúng ta tinh chỉnh mã băm. Nếu chúng ta lấy toàn bộ khối này, chuyển nó thành chuỗi và băm nó, chúng ta sẽ nhận được một mã băm. Khi các giao dịch thay đổi, mã băm đó cũng thay đổi, nhưng khi chúng ta thay đổi nonce, mã băm cũng thay đổi theo.

Chúng ta đang thực hiện một số công việc ở đây — chúng ta có một tập hợp các giao dịch ngẫu nhiên và chúng ta đang thay đổi nonce cho đến khi mã băm có một số không ở đầu. Nếu bạn đã xem nhiệm vụ phụ về các vị tướng Byzantine, chúng ta đã chọn số không ở đầu này như một khối lượng công việc tùy ý để chứng minh. Vì vậy, nonce chỉ cần chạy qua mọi con số — một, hai, ba, bốn — và khi chúng ta nhận được một số không ở đầu, chúng ta nói: đó là một khối hợp lệ.

#### Bằng chứng công việc trong thực tế (3:00) {#proof-of-work-in-action-300}

Nếu chúng ta lấy một khối đã được khai thác, rút mã băm ra và thả nó vào một Hàm băm, chúng ta có thể chứng minh nó có một số không ở đầu — chúng ta có thể chứng minh khối này đã được xử lý.

Hàm băm tiêu tốn CPU, vốn là một tài nguyên có hạn. Chúng ta đang dồn toàn bộ sức mạnh CPU của mình để cố gắng tìm một mã băm có các số không ở đầu. Khi chúng ta làm được điều đó, chúng ta có một khối hợp lệ — khối này về cơ bản bị đóng băng. Bất kỳ giao dịch nào có trong đó vào thời điểm đó hiện đều nằm trong khối này, và mọi người đều tôn trọng nó, và chúng ta có thể chuyển sang khối tiếp theo.

#### Liên kết các khối lại với nhau (3:56) {#chaining-blocks-together-356}

Đây là bí quyết: chúng ta lấy khối cũ và liên kết nó với khối mới. Nếu chúng ta nhìn vào cấu trúc, khối mới không có giao dịch nào và một nonce trống, nhưng nó có một khối cha chứa các giao dịch. Khối trước đó sẽ là một phần của khối tiếp theo, vì vậy chúng ta sẽ có một Chuỗi hoàn chỉnh.

Chúng ta đưa vào các giao dịch mới nhất từ bể giao dịch và tiến hành tìm kiếm một nonce. Khối số hai được khai thác — chúng ta cần một nonce bằng mười để làm cho các giao dịch này hợp lệ. Sau đó, chúng ta làm điều tương tự: liên kết khối cũ, đưa khối mới vào, ném vào bất kỳ giao dịch mới nhất nào và lại tiếp tục xử lý nó. Sau đủ số lần thử, chúng ta đã tìm thấy một nonce cho khối số ba. Khối số bốn — quy trình tương tự, và chúng ta tiếp tục tiến về phía trước.

#### Độ khó khai thác (5:02) {#mining-difficulty-502}

Điều này quá dễ dàng — chúng ta có thể tìm thấy một khối hợp lệ rất nhanh chóng và chúng ta muốn nó khó hơn. Tôi sẽ tăng độ khó lên mức hai. Chúng ta liên kết khối số năm, đưa vào các giao dịch mới nhất và để bộ đếm chạy liên tục. Bây giờ chúng ta đang khai thác — sử dụng sức mạnh CPU hạn chế của mình để liên tục ném các mã băm ngẫu nhiên vào đây cho đến khi chúng ta tìm thấy một mã băm có hai số không ở đầu, bởi vì độ khó đã được tăng lên. Việc đó sẽ mất một chút thời gian.

Bây giờ chúng ta có Chuỗi khối gồm năm khối này. Các khối đó chứa các giao dịch và mỗi khối tham chiếu đến khối trước đó. Mỗi khối cần một khối lượng công việc tùy ý để tạo ra, và khối lượng công việc đó được kiểm soát bởi độ khó.

#### Thợ đào (6:46) {#the-miner-646}

Hãy xem thợ đào là gì. Trong bài toán các vị tướng Byzantine, vị tướng muốn "tấn công lúc bình minh" cần có binh lính. Những gì diễn ra bên trong mỗi người lính chính xác là những gì chúng ta đang làm ở đây với thợ đào của mình — chúng ta đang lấy một thông điệp và một nonce rồi ném nó vào một Hàm băm nhanh nhất có thể, cố gắng đạt được những số không ở đầu đó. Các số không ở đầu là một thứ tùy ý mà tất cả chúng ta đã đồng ý — đây là đủ khối lượng công việc để chứng minh rằng bạn là một người lính, hoặc bạn có thể tiến hành chiến tranh.

Hãy để tôi đưa một thợ đào vào và làm điều này nhanh hơn một chút. Thợ đào sẽ làm điều tương tự cho các khối của chúng ta — nó lấy các giao dịch đến từ bể giao dịch, bơm chúng vào khối và chỉ cần xử lý nó cho đến khi tìm thấy một mã băm hợp lệ.

Thợ đào hiệu quả hơn một chút. Anh ta tập trung hơn vào việc khai thác. Anh ta đang ném các mã băm một cách ngẫu nhiên — đó chính xác là những gì thợ đào của chúng ta đã làm trước đây, chỉ là được trừu tượng hóa đi. Chúng ta có thể thấy nó đang chạy ngầm, liên tục xử lý các mã băm. Nó đã tìm thấy — khối số sáu đã được khai thác.

#### Chi tiêu kép và sự lan truyền mạng lưới (10:00) {#double-spends-and-network-propagation-1000}

Bây giờ chúng ta đã nói về vấn đề chi tiêu kép này, và thậm chí cả vấn đề lan truyền mạng lưới. Khi chúng ta có một sổ cái và một mạng lưới phân tán và ai đó gửi một giao dịch, nó sẽ đến tay những người khác nhau vào những thời điểm khác nhau. Do đó, chúng ta có thể có hai thợ đào ngoài kia trên mạng lưới cùng khai thác một khối vào cùng một thời điểm chính xác, và chúng chứa các giao dịch khác nhau.

Mỗi khối đều hợp lệ vào thời điểm đó — cả hai đều đã thực hiện bằng chứng công việc (PoW), cả hai đều có các số không ở đầu. Nhưng cả hai không thể cùng là chính thống. Cả hai không thể cùng là sự thật. Vì vậy, chúng ta cần một cách để mạng lưới đi đến đồng thuận về việc đâu là Chuỗi thực sự.

#### Nhiều thợ đào và sự đồng thuận (12:27) {#multiple-miners-and-consensus-1227}

Hãy để tôi lấy khối này và di chuyển nó qua đây. Điều tôi muốn là hai thợ đào khác nhau cùng giải quyết một vấn đề, kiểu như cùng lắng nghe một bể giao dịch và tạo ra các khối một cách độc lập. Chúng ta có hai thợ đào: Mallory và Mike. Tôi đã chuyển độ khó lên ba, và cả hai đều đang cố gắng tìm một mã băm có ba số không ở đầu.

Vậy là Mallory đã tìm thấy một khối trước! Tuyệt vời. Bây giờ điều gì sẽ xảy ra — vì chúng ta đang ở trên một mạng lưới phân tán, Mike có thể thậm chí chưa biết về khối của Mallory. Anh ta có thể vẫn đang làm việc trên phiên bản của riêng mình. Và bây giờ Mike cũng đã tìm thấy một khối. Vậy là chúng ta có hai con đường hợp lệ.

Nếu bạn là một nút ngang hàng trên mạng lưới và bạn nhìn thấy khối của Mallory trước, bạn sẽ nghĩ đó là khối chính. Sau đó khối của Mike mới đến. Bạn đang giữ cả hai khối phòng trường hợp một trong số chúng trở thành Chuỗi dài nhất. Và quy tắc là: đi theo Chuỗi hợp lệ dài nhất.

#### Coinbase và phần thưởng khối (15:33) {#coinbase-and-block-rewards-1533}

Khi một thợ đào khai thác một khối, chúng ta nói: đây là tất cả các giao dịch chúng ta muốn, đây là nonce, đây là khối cha — nhưng chúng ta cũng sẽ nói đây là người đã khai thác khối đó. Nó được gọi là coinbase — tôi nghĩ hiện nay có một công ty tên như vậy, nhưng nó khác. Chúng ta sẽ chỉ gọi nó là "thợ đào". Vì vậy, các khối của chúng ta bây giờ yêu cầu một trường thợ đào.

Vậy là Mike vừa tìm thấy khối, và Mike cũng sẽ nhận được giá trị là mười từ việc này. Chúng ta cần khuyến khích các thợ đào thực hiện tất cả công việc này, phải không? Họ đang tiêu tiền để mua những dàn máy này về cơ bản là để làm cho mạng lưới an toàn. Những thợ đào này đang tiêu tiền để bảo mật mạng lưới bằng tất cả sức mạnh băm của họ — với tất cả các thợ đào kết hợp lại, có thể lên tới hàng chục nghìn. Họ đang trả một khoản tiền lớn để xây dựng các dàn máy xử lý các mã băm này, và để khuyến khích họ, chúng ta chia cho họ một phần gọi là phần thưởng khối của mỗi khối mà họ khai thác.

#### Phần thưởng khối và các ưu đãi (16:52) {#block-rewards-and-incentives-1652}

Vì vậy, trong phiên bản khối này, Mallory có mười đô la, nhưng trong phiên bản này Mike có mười đô la. Mỗi người trong số hai người chơi này đều được khuyến khích tiếp tục đi theo Chuỗi của riêng họ, và phần còn lại của mạng lưới cần tìm ra sự đồng thuận. Về cơ bản, vấn đề là ai có Chuỗi hợp lệ dài nhất.

Mike sẽ thiết lập khối của mình làm khối cha và bắt đầu làm việc trên khối tiếp theo. Mallory cũng sẽ làm điều tương tự. Và vấn đề là những ai khác trên mạng lưới sẽ chọn phe của ai. Vì chúng ta không muốn trừng phạt những người có mạng lưới kém, tôi khá chắc chắn rằng trong Ethereum, chúng ta trả tiền cho các khối chú (uncle blocks) — những khối hợp lệ không lọt vào Chuỗi dài nhất — bởi vì chúng vẫn đang giúp bảo mật mạng lưới.

Chúng ta đã gặp phải vấn đề về sự phối hợp và đồng thuận này, và chúng ta đã giải quyết nó bằng cách đưa vào một khối lượng công việc tùy ý bắt buộc phải có để làm cho các giao dịch hợp lệ. Mallory đã thực hiện tất cả công việc băm, băm và băm này để tìm ra ba số không ở đầu của một mã băm gồm tất cả các giao dịch này và khối trước đó.

#### Truy vấn Chuỗi khối (18:30) {#querying-the-blockchain-1830}

Chúng ta có thể giao tiếp với bất kỳ Chuỗi nào dài nhất. Mike vẫn chưa đạt đến khối số bảy, vì vậy chúng ta có thể thấy chiều cao ở đây vẫn là sáu. Và chúng ta có thể làm những việc như truy vấn số dư cho mọi người. Vì vậy, chúng ta nhấn vào số dư — chúng ta nhận được gì? Năm trăm hai mươi tư. Vậy là Heidi đang nắm giữ 524 hoặc bất kỳ token gốc nào của Chuỗi này. Chúng ta có thể thấy nonce của cô ấy, chúng ta có thể làm mọi thứ mà chúng ta có thể làm với sổ cái, nhưng bây giờ chúng ta đang xếp chồng các khối và những khối đó đang chứa các giao dịch.

Chúng ta đã trừu tượng hóa công việc từ những người dùng, những người chỉ đang gửi tiền, sang các thợ đào, và chúng ta đã khuyến khích họ bằng cách trao cho họ phần thưởng khối này. Cũng sẽ có một khoản nhỏ mà mỗi người phải trả cho mỗi giao dịch, nhưng chúng ta sẽ đề cập đến điều đó trong một tập sau. Chúng ta không muốn nói về Gas ngay bây giờ, nhưng sẽ rất hữu ích khi biết rằng có một động lực không chỉ để khai thác một khối, mà còn để khai thác một khối đầy ắp với nhiều giao dịch. Nhưng đó là một động lực nhỏ hơn — cuối cùng chúng ta sẽ đề cập đến nó.

#### Tính bất biến của Chuỗi (19:51) {#chain-immutability-1951}

Khi các khối được khai thác, chúng ngày càng trở nên an toàn hơn. Hãy để tôi cho bạn thấy ý tôi là gì. Vậy là Mike đã khai thác được một khối, Mallory ở bên này đang làm một minh họa và không thể khai thác được khối nào. Vì vậy, bây giờ Chuỗi của Mike sẽ là Chuỗi dài nhất, và nó sẽ lan truyền khắp mạng lưới. Mọi người sẽ nhìn thấy nó và nói: được rồi, Chuỗi này có bảy khối, tất cả đều hợp lệ — đây là Chuỗi mà chúng ta sẽ đi theo. Bạn có thể gặp phải các đợt Phân nhánh cứng (hard forks), các đợt Phân nhánh gây tranh cãi, nơi các quy tắc mà chúng ta đang tuân theo sẽ thay đổi và các nhóm người khác nhau muốn đi theo các Chuỗi khác nhau. Những thứ rất thú vị.

Được rồi cuối cùng, nếu chúng ta quay lại khối số ba và thay đổi điều gì đó — thay đổi bất kỳ chi tiết nhỏ nào — tôi sẽ vào đây. Có một số giao dịch gửi cho Frank. Giả sử thay vì Frank, chúng ta đổi thành Eve. Bây giờ hãy xem điều gì xảy ra khi tôi nhấn OK: nhìn kìa. Tôi đã thay đổi một phần nhỏ xíu của khối số ba và đột nhiên toàn bộ Chuỗi sụp đổ. Nó không còn hợp lệ nữa. Nếu tôi phát sóng điều đó trên mạng lưới, mọi người sẽ cười nhạo tôi.

Bạn không thể thay đổi bất cứ điều gì một khi khối đã được khai thác trừ khi bạn quay lại và khai thác lại mọi thứ khi nó thay đổi. Về cơ bản, tôi sẽ phải kết nối lại thợ đào ở đây và cố gắng có đủ sức mạnh để bắt kịp Mike ở tận ngoài này với bảy khối. Điều đó sẽ rất, rất khó. Một khối càng nằm sâu, càng khó để quay lại thay đổi nó. Thực tế là khối số ba ở đây nơi Carlos gửi 84 cho Bob — Bob có thể khá yên tâm khi biết rằng, sâu dưới nhiều khối, số tiền đó chắc chắn ở đó. Không đời nào có một đợt Phân nhánh gây tranh cãi nào ở đây — tôi rất chắc chắn. Đó là những gì chúng ta gọi là tính chung cuộc.

#### Tóm tắt (22:00) {#summary-2200}

Thay vì có một sổ cái và vấn đề đồng thuận này, chúng ta sử dụng bằng chứng công việc (PoW) để xử lý một mã băm nhằm xác thực một khối — và "hợp lệ" có nghĩa là một số lượng tùy ý các số không ở đầu. Chúng ta vẫn sẽ gặp phải các vấn đề khi xây dựng Chuỗi các khối, nơi các khối đã được khai thác thực sự có thể đến các địa điểm khác nhau vào những thời điểm khác nhau. Vì vậy, chúng ta có một thuật toán đồng thuận sâu hơn nói rằng: hãy đi theo Chuỗi dài nhất hợp lệ và tuân theo bộ quy tắc mà bạn muốn tham gia.

Được rồi, thứ Sáu thắt nơ vui vẻ! Đó là Chuỗi khối trên ETH.BUILD. Tôi sẽ lưu cái này và đưa nó lên đó để bạn chỉ cần nhấn "tải" và có một Chuỗi để chơi cùng. Thứ Sáu vui vẻ!