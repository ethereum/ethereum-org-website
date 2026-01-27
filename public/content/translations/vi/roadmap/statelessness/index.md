---
title: Statelessness, state expiry và history expiry
description: Giải thích về history expiry và stateless Ethereum
lang: vi
---

# Statelessness, state expiry và history expiry {#statelessness}

Khả năng chạy các node Ethereum trên phần cứng khiêm tốn là yếu tố then chốt để đạt được tính phi tập trung thực sự. Lý do là việc chạy một node cho phép người dùng xác minh thông tin bằng cách thực hiện các kiểm tra mật mã độc lập thay vì tin tưởng một bên thứ ba cung cấp dữ liệu. Ngoài ra, chạy node cho phép người dùng gửi giao dịch trực tiếp đến mạng ngang hàng (peer-to-peer) của Ethereum thay vì phải tin tưởng một trung gian. Phi tập trung là không thể nếu những lợi ích này chỉ dành cho người dùng có phần cứng đắt tiền. Ngược lại, các node nên được chạy với yêu cầu xử lý và bộ nhớ cực kỳ khiêm tốn để chúng có thể hoạt động trên điện thoại di động, máy vi tính mini hoặc chạy ngầm trên máy tính gia đình mà không gây chú ý.

Hiện nay, yêu cầu dung lượng ổ cứng cao là rào cản chính ngăn cản việc truy cập phổ biến vào các node. Nguyên nhân chủ yếu là do cần phải lưu trữ khối lượng lớn dữ liệu trạng thái (state) của Ethereum. Dữ liệu trạng thái này chứa thông tin quan trọng cần thiết để xử lý chính xác các khối và giao dịch mới. Tại thời điểm viết bài này, ổ cứng SSD 2TB tốc độ cao được khuyến nghị cho việc chạy một node Ethereum đầy đủ. Đối với một Node không cắt giảm bất kỳ dữ liệu cũ nào, yêu cầu lưu trữ tăng lên khoảng 14GB/tuần và các node lưu trữ tất cả dữ liệu kể từ genesis đang chiếm tới 12 TB (tại thời điểm viết bài, tháng 2 năm 2023).

Ổ cứng giá rẻ hơn có thể được sử dụng để lưu trữ dữ liệu cũ nhưng chúng quá chậm để theo kịp các khối mới đến. Giữ nguyên mô hình lưu trữ hiện tại cho các client trong khi giảm giá thành và đơn giản hóa việc lưu trữ dữ liệu chỉ là giải pháp tạm thời và cục bộ cho vấn đề vì sự phát triển trạng thái của Ethereum là "không giới hạn", nghĩa là yêu cầu lưu trữ chỉ có thể tăng lên, và những cải tiến về công nghệ luôn phải theo kịp với sự phát triển liên tục của trạng thái. Thay vào đó, các client phải tìm ra những cách thức mới để xác minh các khối và giao dịch mà không phụ thuộc vào việc tra cứu dữ liệu từ các cơ sở dữ liệu cục bộ.

## Giảm dung lượng lưu trữ cho các nút {#reducing-storage-for-nodes}

Có vài cách để giảm bớt lượng dữ liệu mà mỗi nút phải lưu trữ, mỗi cách đều cần làm cập nhật lại giao thức cốt lõi của Ethereum đến một mức độ khác nhau:

- **History expiry**: cho phép các nút loại bỏ dữ liệu trạng thái cũ hơn X khối, nhưng không thay đổi cách ứng dụng của Ethereum xử lý dữ liệu trạng thái.
- **State expiry**: cho phép dữ liệu trạng thái không được sử dụng thường xuyên chuyển sang trạng thái không hoạt động. Các client có thể bỏ qua dữ liệu không hoạt động cho đến khi cần thiết.
- **Weak statelessness**: chỉ các nhà sản xuất khối mới cần truy cập vào toàn bộ dữ liệu trạng thái, các nút khác có thể xác minh các khối mà không cần đến cơ sở dữ liệu trạng thái cục bộ.
- **Strong statelessness**: không có nút nào cần quyền truy cập vào toàn bộ dữ liệu trạng thái.

## Hết hạn dữ liệu {#data-expiry}

### History expiry {#history-expiry}

"History expiry" ám chỉ việc các client loại bỏ dữ liệu cũ hơn mà chúng không còn thường xuyên cần đến. Mục đích là để chỉ lưu trữ một lượng nhỏ dữ liệu lịch sử, và xóa dữ liệu cũ mỗi khi dữ liệu mới được cập nhật. Có hai lý do chính khiến các client cần đến dữ liệu lịch sử: đồng bộ hóa và phục vụ các yêu cầu dữ liệu. Ban đầu, các client phải đồng bộ hóa từ khối khởi nguyên (genesis block) - khối đầu tiên trong chuỗi khối. Quá trình này yêu cầu xác minh từng khối liên tiếp để đảm bảo tính đúng đắn cho đến khối mới nhất. Hiện nay, các client sử dụng "điểm kiểm tra chủ quan yếu" (weak subjectivity checkpoints) để tăng tốc quá trình kết nối tới khối mới nhất. Các điểm kiểm tra này được xem như là những điểm khởi đầu đáng tin cậy, giống như việc có một khối khởi nguyên gần với hiện tại hơn là từ thời điểm ban đầu của Ethereum. Điều này giúp các client có thể bỏ qua dữ liệu trước điểm kiểm tra chủ quan yếu gần nhất mà không ảnh hưởng khả năng đồng bộ hóa lên khối mới nhất của chuỗi. Các client thường xử lý các yêu cầu dữ liệu lịch sử (đến qua giao thức JSON-RPC) bằng cách truy xuất trực tiếp từ cơ sở dữ liệu cục bộ. Tuy nhiên, với tính năng "history expiry", điều này sẽ bất khả thi nếu dữ liệu được yêu cầu đã bị xóa. Việc cung cấp dữ liệu lịch sử này đòi hỏi phải có một số giải pháp đột phá.

Một phương án đó là để các client yêu cầu dữ liệu lịch sử từ các máy ngang hàng bằng giải pháp như Portal Network. Portal Network là mạng lưới ngang hàng (peer-to-peer) đang được phát triển, chuyên phục vụ dữ liệu lịch sử, trong đó mỗi node chứa một phần nhỏ lịch sử Ethereum. Toàn bộ lịch sử sẽ được lưu trữ phân tán trên mạng lưới này. Các yêu cầu dữ liệu được đáp ứng bằng cách tìm kiếm và kết nối đến các node chứa dữ liệu có liên quan. Vì các ứng dụng thường là nơi cần truy cập dữ liệu lịch sử, việc lưu trữ có thể trở thành trách nhiệm của chúng. Có thể sẽ có đủ những thành phần thiện chí trong cộng đồng Ethereum sẵn sàng duy trì các kho lưu trữ lịch sử. Đây có thể là một DAO được lập ra dành riêng cho việc quản lý lưu trữ, hoặc lý tưởng nhất là sự kết hợp của tất cả các lựa chọn này. Các nhà cung cấp dịch vụ có thể chia sẻ dữ liệu theo nhiều cách, chẳng hạn như torrent, FTP, Filecoin hoặc IPFS.

Khái niệm "History expiry" còn gây tranh cãi vì từ trước đến nay Ethereum luôn đảm bảo sự sẵn có của mọi dữ liệu lịch sử. Đồng bộ hóa hoàn toàn từ genesis luôn là chức năng tiêu chuẩn, ngay cả khi cần tái dựng một số dữ liệu cũ từ ảnh chụp nhanh. "History expiry" chuyển trách nhiệm cung cấp sự đảm bảo này ra khỏi giao thức cốt lõi của Ethereum. Điều này có thể dẫn đến rủi ro kiểm duyệt mới nếu các tổ chức tập trung là bên đứng ra cung cấp dữ liệu lịch sử.

EIP-4444 (đề xuất cải tiến Ethereum liên quan đến "history expiry") hiện chưa sẵn sàng, nhưng đang được thảo luận tích cực. Thú vị là những thách thức với EIP-4444 không nằm ở khía cạnh kỹ thuật, mà chủ yếu là ở việc quản lý cộng đồng. Để được triển khai, cần có sự đồng thuận từ cộng đồng, bao gồm cả thỏa thuận và cam kết lưu trữ, phục vụ dữ liệu lịch sử từ các tổ chức đáng tin cậy.

Nâng cấp này về cơ bản không thay đổi cách các node Ethereum xử lý dữ liệu trạng thái, mà chỉ thay đổi cách truy cập dữ liệu lịch sử.

### State expiry {#state-expiry}

"State expiry" đề cập đến việc xóa bỏ các dữ liệu trạng thái khỏi từng node riêng lẻ nếu chúng không được truy cập trong một khoảng thời gian gần đây. Có một số cách để triển khai cơ chế này, bao gồm:

- **Expire by rent**: tính "phí duy trì" cho các tài khoản và cho chúng hết hạn khi phí này về không
- **Expire by time**: chuyển tài khoản sang trạng thái không hoạt động nếu không có bất kỳ thao tác đọc/ghi nào trên tài khoản đó trong một khoảng thời gian nhất định

Expiry by rent có thể là một khoản phí trực tiếp được tính cho các tài khoản để giữ chúng trong cơ sở dữ liệu trạng thái hoạt động. Expiry by time có thể được tính từ lần tương tác gần nhất với tài khoản, hoặc có thể là hết hạn định kỳ đối với tất cả các tài khoản. Ngoài ra, có thể có các cơ chế kết hợp các yếu tố của cả hai mô hình: phí duy trì và thời gian. Ví dụ, các tài khoản đơn lẻ vẫn tồn tại trong trạng thái hoạt động nếu chúng trả một khoản phí nhỏ trước khi hết hạn dựa trên thời gian. Với state expiry, điều quan trọng cần lưu ý là trạng thái không hoạt động **không bị xóa**, nó chỉ được lưu trữ tách biệt khỏi trạng thái hoạt động. Trạng thái không hoạt động vẫn có thể được đưa trở lại vào trạng thái hoạt động khi cần.

Cách thức hoạt động có thể là sử dụng các cây trạng thái (state tree) cho các khoảng thời gian cụ thể (có thể khoảng 1 năm). Bất cứ khi nào một giai đoạn mới bắt đầu, một cây trạng thái hoàn toàn mới cũng được khởi tạo song song. Chỉ cây trạng thái hiện tại có thể được sửa đổi, tất cả các cây trạng thái khác là cố định, không thể thay đổi. Các node Ethereum chỉ cần giữ cây trạng thái hiện tại và cây trạng thái gần đây nhất. Điều này đòi hỏi một phương pháp để gắn dấu thời gian (time-stamp) cho một địa chỉ với khoảng thời gian nó tồn tại. Có [một số cách khả thi](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) để thực hiện việc này, nhưng phương án hàng đầu yêu cầu [việc kéo dài các địa chỉ](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) để chứa thêm thông tin bổ sung với lợi ích đi kèm là các địa chỉ dài hơn sẽ bảo mật hơn nhiều. Mục trong lộ trình thực hiện việc này được gọi là [mở rộng không gian địa chỉ](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Tương tự như "history expiry", với "state expiry", trách nhiệm lưu trữ dữ liệu trạng thái cũ không còn thuộc về người dùng cá nhân mà được chuyển sang các thành phần khác như nhà cung cấp tập trung, các thành viên vì cộng đồng hoặc các giải pháp phi tập trung mang tính tương lai hơn như Portal Network.

"State expiry" vẫn đang trong giai đoạn nghiên cứu và chưa sẵn sàng để triển khai. Nó có thể được triển khai muộn hơn so với các client dạng "stateless" (không trạng thái) và "history expiry" vì những nâng cấp đó giúp việc quản lý dung lượng lưu trữ lớn dễ dàng hơn cho phần lớn các validators.

## Statelessness {#statelessness}

Thuật ngữ "statelessness" có phần dễ gây hiểu lầm, bởi nó không có nghĩa là loại bỏ hoàn toàn khái niệm "trạng thái" (state) trong mạng lưới, mà thay vào đó, nó liên quan đến cách các node Ethereum xử lý dữ liệu trạng thái. Bản thân "statelessness" được chia thành hai dạng: "weak statelessness" và "strong statelessness". Weak statelessness cho phép phần lớn các node không cần lưu trữ trạng thái, bằng cách chuyển trách nhiệm lưu trữ đó cho một số node nhất định. Strong statelessness loại bỏ hoàn toàn nhu cầu lưu trữ dữ liệu trạng thái đầy đủ đối với bất kỳ node nào. Cả hai dạng statelessness đều mang lại những lợi ích sau cho các validator thông thường:

- đồng bộ hóa gần như tức thì
- khả năng xác thực các khối theo cách không cần tuân thủ thứ tự nghiêm ngặt
- các nút có thể chạy với yêu cầu phần cứng rất thấp (ví dụ: trên điện thoại)
- các node có thể chạy trên ổ cứng giá rẻ vì không yêu cầu đọc/ghi dữ liệu liên tục
- tương thích với các đợt nâng cấp trong tương lai đối với thuật toán mật mã của Ethereum

### Weak Statelessness {#weak-statelessness}

Mặc dù "weak statelessness" làm thay đổi cách các node Ethereum xác thực các thay đổi trạng thái, nhưng nó không loại bỏ hoàn toàn nhu cầu lưu trữ trạng thái trong tất cả các node trên mạng lưới. Thay vào đó, "weak statelessness" đặt trách nhiệm lưu trữ trạng thái lên các node đề xuất khối (block proposer), trong khi tất cả các node khác trên mạng chỉ cần xác thực các khối mà không lưu trữ dữ liệu trạng thái đầy đủ.

**Đề xuất khối cần truy cập dữ liệu trạng thái đầy đủ, nhưng xác thực khối không yêu cầu bất kỳ dữ liệu trạng thái nào**

Để điều này xảy ra, [Cây Verkle](/roadmap/verkle-trees/) phải đã được triển khai trong các ứng dụng của Ethereum. Verkle trees là một cấu trúc dữ liệu thay thế cho việc lưu trữ dữ liệu trạng thái Ethereum. Chúng cho phép tạo ra các "nhân chứng" (witnesses) có kích thước nhỏ, cố định. Các "nhân chứng" này được chuyển giữa các node ngang hàng và được sử dụng để xác thực các khối thay vì phải đối chiếu với cơ sở dữ liệu cục bộ. [Sự phân tách người đề xuất-người xây dựng](/roadmap/pbs/) cũng được yêu cầu vì điều này cho phép người xây dựng khối là các nút chuyên dụng với phần cứng mạnh hơn, và đó là những nút yêu cầu quyền truy cập vào toàn bộ dữ liệu trạng thái.

<ExpandableCard title="Tại sao việc có ít người đề xuất khối hơn vẫn ổn?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

"Statelessness" phụ thuộc vào người xây dựng khối duy trì một bản sao của dữ liệu trạng thái đầy đủ để họ có thể tạo ra các "nhân chứng" được sử dụng nhằm xác thực khối. Các node khác không cần truy cập vào dữ liệu trạng thái, vì tất cả thông tin cần thiết để xác thực khối đã có sẵn trong "nhân chứng". Điều này tạo ra tình huống là việc đề xuất một khối rất tốn kém (về tài nguyên), nhưng xác minh khối lại ít tốn kém hơn, ngụ ý rằng sẽ có ít nhà vận hành một node đề xuất khối hơn. Tuy nhiên, việc phân quyền cho các trình đề xuất khối không quá quan trọng, miễn là càng nhiều người tham gia càng tốt, họ đều có thể xác minh một cách độc lập rằng các khối được đề xuất là hợp lệ.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Đọc thêm trong ghi chú của Dankrad</ButtonLink> </ExpandableCard>

Các trình đề xuất khối sử dụng dữ liệu trạng thái để tạo ra các "nhân chứng" - tập dữ liệu tối thiểu chứng minh giá trị của các trạng thái đang bị thay đổi bởi các giao dịch trong một khối. Các validator khác không lưu trữ trạng thái, chúng chỉ lưu trữ gốc trạng thái (state root - một mã hash của toàn bộ trạng thái). Các validator nhận được một khối và một "nhân chứng", sau đó sử dụng chúng để cập nhật gốc trạng thái của mình. Điều này làm cho một node xác thực trở nên cực kỳ gọn nhẹ.

"Weak statelessness" đang trong giai đoạn nghiên cứu chuyên sâu, nhưng công cuộc triển khai sẽ phụ thuộc vào sự tách biệt trình xây dựng khối - trình đề xuất khối và cách ứng dụng "Verkle Trees" để có thể truyền các "nhân chứng" nhỏ giữa các node ngang hàng tham gia mạng lưới. Nghĩa là "weak statelessness" có thể sẽ mất vài năm nữa trước khi được triển khai chính thức trên Ethereum Mainnet.

### Strong statelessness {#strong-statelessness}

Tình trạng tính không trạng thái loại bỏ nhu cầu đối với bất kỳ nút nào lưu trữ dữ liệu trạng thái. Thay vào đó, các giao dịch được gửi đi kèm theo các "nhân chứng" có thể được tổng hợp bởi các trình sản xuất khối. Các trình sản xuất khối này sẽ chịu trách nhiệm lưu trữ chỉ những trạng thái cần thiết để tạo ra "nhân chứng" cho các tài khoản liên quan. Trách nhiệm về trạng thái gần như được chuyển hoàn toàn sang người dùng, vì họ chính là người gửi các "nhân chứng" cùng với 'danh sách truy cập' (access list) để khai báo các tài khoản và khóa lưu trữ mà họ đang tương tác. Cơ chế này cho phép các node hoạt động cực kỳ gọn nhẹ, nhưng cũng dẫn đến các tình huống đánh đổi, bao gồm rào cản trong thực hiện giao dịch với các hợp đồng thông minh.

Các nhà nghiên cứu đã phân tích kỹ "strong statelessness", nhưng hiện tại không kỳ vọng nó sẽ là một phần trong lộ trình phát triển của Ethereum. Khả năng cao là "weak statelessness" đã đủ để đáp ứng nhu cầu mở rộng quy mô của Ethereum.

## Tiến độ hiện tại {#current-progress}

Weak statelessness, history expiry và state expiry đều đang trong giai đoạn nghiên cứu, và dự kiến sẽ mất vài năm nữa để triển khai thực tế. Không có gì đảm bảo rằng tất cả các đề xuất này đều sẽ được ứng dụng đồng thời, ví dụ, nếu "state expiry" được triển khai trước, có thể nhu cầu triển khai "history expiry" là không còn cần thiết nữa. Ngoài ra còn có các mục khác trong lộ trình, chẳng hạn như [Cây Verkle](/roadmap/verkle-trees) và [Sự phân tách người đề xuất-người xây dựng](/roadmap/pbs) cần phải được hoàn thành trước.

## Đọc thêm {#further-reading}

- [Stateless Ethereum là gì?](https://stateless.fyi/)
- [AMA của Vitalik về statelessness](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Lý thuyết về quản lý kích thước trạng thái](https://hackmd.io/@vbuterin/state_size_management)
- [Resurrection-conflict-minimized state bounding](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Các con đường dẫn đến statelessness và state expiry](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Đặc tả EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes nói về EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Tại sao việc chuyển sang không trạng thái lại quan trọng đến vậy](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Ghi chú ban đầu về khái niệm ứng dụng không trạng thái](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Thông tin thêm về state expiry](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Thêm thông tin về state expiry](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Trang thông tin về Stateless Ethereum](https://stateless.fyi)
