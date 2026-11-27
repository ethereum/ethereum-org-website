---
title: "Tính phi trạng thái, hết hạn trạng thái và hết hạn lịch sử"
description: "Tìm hiểu cách hết hạn lịch sử, hết hạn trạng thái và tính phi trạng thái có thể cắt giảm dung lượng ổ đĩa cần thiết để chạy một nút Ethereum, giữ cho mạng lưới phi tập trung."
lang: vi
template: roadmap
---

Khả năng chạy các nút [Ethereum](/) trên phần cứng khiêm tốn là rất quan trọng đối với sự phi tập trung thực sự. Điều này là do việc chạy một nút cung cấp cho người dùng khả năng xác minh thông tin bằng cách thực hiện các kiểm tra mật mã học một cách độc lập thay vì tin tưởng vào một bên thứ ba cung cấp dữ liệu cho họ. Việc chạy một nút cho phép người dùng gửi các giao dịch trực tiếp đến mạng lưới ngang hàng Ethereum thay vì phải tin tưởng vào một bên trung gian. Sự phi tập trung là không thể nếu những lợi ích này chỉ dành cho những người dùng có phần cứng đắt tiền. Thay vào đó, các nút phải có khả năng chạy với các yêu cầu về bộ nhớ và xử lý cực kỳ khiêm tốn để chúng có thể chạy trên điện thoại di động, máy tính siêu nhỏ hoặc chạy ngầm trên máy tính gia đình.

Ngày nay, yêu cầu dung lượng ổ đĩa cao là rào cản chính ngăn cản quyền truy cập phổ quát vào các nút. Điều này chủ yếu là do nhu cầu lưu trữ các phần lớn dữ liệu trạng thái của Ethereum. Dữ liệu trạng thái này chứa thông tin quan trọng được yêu cầu để xử lý chính xác các khối và giao dịch mới. Tại thời điểm viết bài, một ổ SSD 4TB tốc độ cao được khuyến nghị để chạy một nút Ethereum đầy đủ, sử dụng gần 2TB khi nó giữ toàn bộ lịch sử Chuỗi (tính đến tháng 9 năm 2026). Các nút lưu trữ (archive node) lưu trữ tất cả trạng thái lịch sử cần từ khoảng 2TB đến hơn 12TB, tùy thuộc vào máy khách.

Các ổ cứng rẻ hơn có thể được sử dụng để lưu trữ dữ liệu cũ hơn nhưng chúng quá chậm để theo kịp các khối mới đến. Việc giữ các mô hình lưu trữ hiện tại cho các máy khách trong khi làm cho dữ liệu rẻ hơn và dễ lưu trữ hơn chỉ là một giải pháp tạm thời và một phần cho vấn đề vì sự tăng trưởng trạng thái của Ethereum là 'không giới hạn', có nghĩa là các yêu cầu lưu trữ sẽ chỉ có thể tăng lên và các cải tiến công nghệ sẽ luôn phải theo kịp với sự tăng trưởng trạng thái liên tục. Thay vào đó, các máy khách phải tìm ra những cách mới để xác minh các khối và giao dịch mà không phụ thuộc vào việc tra cứu dữ liệu từ các cơ sở dữ liệu cục bộ.

## Giảm dung lượng lưu trữ cho các nút {#reducing-storage-for-nodes}

Có một số cách để giảm lượng dữ liệu mà mỗi nút phải lưu trữ, mỗi cách yêu cầu Giao thức cốt lõi của Ethereum phải được cập nhật ở một mức độ khác nhau:

- **Hết hạn lịch sử**: cho phép các nút loại bỏ dữ liệu trạng thái cũ hơn X khối, nhưng không thay đổi cách máy khách Ethereum xử lý dữ liệu trạng thái.
- **Hết hạn trạng thái**: cho phép dữ liệu trạng thái không được sử dụng thường xuyên trở nên không hoạt động. Dữ liệu không hoạt động có thể bị các máy khách bỏ qua cho đến khi nó được khôi phục.
- **Tính phi trạng thái yếu**: chỉ những người tạo khối mới cần quyền truy cập vào dữ liệu trạng thái đầy đủ, các nút khác có thể xác minh các khối mà không cần cơ sở dữ liệu trạng thái cục bộ.
- **Tính phi trạng thái mạnh**: không có nút nào cần quyền truy cập vào dữ liệu trạng thái đầy đủ.

## Hết hạn dữ liệu {#data-expiry}

### Hết hạn lịch sử {#history-expiry}

Hết hạn lịch sử đề cập đến việc các máy khách cắt tỉa dữ liệu cũ hơn mà chúng không có khả năng cần đến, để chúng chỉ lưu trữ một lượng nhỏ dữ liệu lịch sử, loại bỏ dữ liệu cũ hơn khi có dữ liệu mới. Có hai lý do khiến các máy khách yêu cầu dữ liệu lịch sử: đồng bộ hóa và phục vụ các yêu cầu dữ liệu. Ban đầu, các máy khách phải đồng bộ hóa từ khối nguyên thủy, xác minh rằng mỗi khối liên tiếp đều chính xác cho đến tận đầu Chuỗi. Ngày nay, các máy khách sử dụng "các điểm kiểm tra tính chủ quan yếu" để tự khởi động đường đến đầu Chuỗi. Các điểm kiểm tra này là các điểm bắt đầu đáng tin cậy, giống như có một khối nguyên thủy gần với hiện tại hơn là ngay từ lúc bắt đầu của Ethereum. Điều này có nghĩa là các máy khách có thể loại bỏ tất cả thông tin trước điểm kiểm tra tính chủ quan yếu gần đây nhất mà không làm mất khả năng đồng bộ hóa với đầu Chuỗi. Các máy khách hiện đang phục vụ các yêu cầu (đến qua JSON-RPC) đối với dữ liệu lịch sử bằng cách lấy nó từ các cơ sở dữ liệu cục bộ của chúng. Tuy nhiên, với hết hạn lịch sử, điều này sẽ không thể thực hiện được nếu dữ liệu được yêu cầu đã bị cắt tỉa. Việc phục vụ dữ liệu lịch sử này là nơi cần có một số giải pháp sáng tạo.

Một lựa chọn là các máy khách yêu cầu dữ liệu lịch sử từ các thiết bị ngang hàng bằng cách sử dụng một giải pháp như Portal Network. [Portal Network](/developers/docs/networking-layer/portal-network/) là một mạng lưới ngang hàng để phục vụ dữ liệu lịch sử, nơi mỗi nút lưu trữ một phần nhỏ lịch sử của Ethereum sao cho toàn bộ lịch sử tồn tại phân tán trên toàn mạng lưới. Các yêu cầu được phục vụ bằng cách tìm kiếm các thiết bị ngang hàng lưu trữ dữ liệu liên quan và yêu cầu từ họ. Ngoài ra, vì thông thường các ứng dụng mới là bên yêu cầu quyền truy cập vào dữ liệu lịch sử, nên việc lưu trữ dữ liệu đó có thể trở thành trách nhiệm của chúng. Cũng có thể có đủ các tác nhân vị tha trong không gian Ethereum sẵn sàng duy trì các kho lưu trữ lịch sử. Đó có thể là một DAO được thành lập để quản lý việc lưu trữ dữ liệu lịch sử, hoặc lý tưởng nhất là sự kết hợp của tất cả các lựa chọn này. Các nhà cung cấp này có thể phục vụ dữ liệu theo nhiều cách, chẳng hạn như trên torrent, FTP, Filecoin hoặc IPFS.

Hết hạn lịch sử có phần gây tranh cãi vì cho đến nay Ethereum luôn ngầm đảm bảo tính khả dụng của bất kỳ dữ liệu lịch sử nào. Một quá trình đồng bộ hóa đầy đủ từ khối nguyên thủy luôn có thể thực hiện được theo tiêu chuẩn, ngay cả khi nó phụ thuộc vào việc xây dựng lại một số dữ liệu cũ hơn từ các bản chụp nhanh (snapshot). Hết hạn lịch sử chuyển trách nhiệm cung cấp sự đảm bảo này ra bên ngoài Giao thức cốt lõi của Ethereum. Điều này có thể gây ra những rủi ro kiểm duyệt mới nếu các tổ chức tập trung cuối cùng lại là bên can thiệp để cung cấp dữ liệu lịch sử.

Bước đầu tiên đã được triển khai: kể từ khi [hết hạn lịch sử một phần](https://blog.ethereum.org/2025/07/08/partial-history-exp) vào tháng 7 năm 2025, các máy khách thực thi có thể loại bỏ phần thân và biên lai của mọi khối trước The Merge. Lịch sử đó vẫn có sẵn từ các kho lưu trữ, torrent và Portal Network. Việc hết hạn lịch sử theo chu kỳ cuốn chiếu, như EIP-4444 đề xuất, vẫn đang được thảo luận. Thú vị là, những thách thức với EIP-4444 không hẳn là về mặt kỹ thuật, mà chủ yếu là về quản lý cộng đồng. Để điều này được triển khai, cần có sự đồng thuận của cộng đồng, bao gồm không chỉ sự đồng ý mà còn cả các cam kết lưu trữ và phục vụ dữ liệu lịch sử từ các thực thể đáng tin cậy.

Bản nâng cấp này về cơ bản không thay đổi cách các nút Ethereum xử lý dữ liệu trạng thái, nó chỉ thay đổi cách truy cập dữ liệu lịch sử.

### Hết hạn trạng thái {#state-expiry}

Hết hạn trạng thái đề cập đến việc loại bỏ trạng thái khỏi các nút riêng lẻ nếu nó không được truy cập gần đây. Có một số cách để triển khai điều này, bao gồm:

- **Hết hạn theo tiền thuê**: tính "tiền thuê" đối với các Tài khoản và cho chúng hết hạn khi tiền thuê của chúng bằng không
- **Hết hạn theo thời gian**: làm cho các Tài khoản không hoạt động nếu không có hoạt động đọc/ghi nào vào Tài khoản đó trong một khoảng thời gian nhất định

Hết hạn theo tiền thuê có thể là một khoản tiền thuê trực tiếp được tính cho các Tài khoản để giữ chúng trong cơ sở dữ liệu trạng thái hoạt động. Hết hạn theo thời gian có thể là đếm ngược từ lần tương tác Tài khoản cuối cùng, hoặc có thể là hết hạn định kỳ của tất cả các Tài khoản. Cũng có thể có các cơ chế kết hợp các yếu tố của cả mô hình dựa trên thời gian và tiền thuê, ví dụ như các Tài khoản riêng lẻ vẫn tồn tại ở trạng thái hoạt động nếu chúng trả một khoản phí nhỏ trước khi hết hạn theo thời gian. Với hết hạn trạng thái, điều quan trọng cần lưu ý là trạng thái không hoạt động **không bị xóa**, nó chỉ được lưu trữ riêng biệt với trạng thái hoạt động. Trạng thái không hoạt động có thể được khôi phục thành trạng thái hoạt động.

Cách thức hoạt động của điều này có lẽ là có một cây trạng thái cho các khoảng thời gian cụ thể (có thể là ~1 năm). Bất cứ khi nào một khoảng thời gian mới bắt đầu, một cây trạng thái hoàn toàn mới cũng bắt đầu. Chỉ có cây trạng thái hiện tại mới có thể được sửa đổi, tất cả các cây khác đều bất biến. Các nút Ethereum chỉ được kỳ vọng sẽ giữ cây trạng thái hiện tại và cây gần đây nhất tiếp theo. Điều này yêu cầu một cách để gắn dấu thời gian cho một Địa chỉ với khoảng thời gian mà nó tồn tại. Có [một số cách khả thi](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) để thực hiện việc này, nhưng lựa chọn hàng đầu yêu cầu [các Địa chỉ phải được kéo dài](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) để chứa thông tin bổ sung với lợi ích đi kèm là các Địa chỉ dài hơn sẽ an toàn hơn nhiều. Mục lộ trình thực hiện điều này được gọi là [mở rộng không gian Địa chỉ](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Tương tự như hết hạn lịch sử, dưới sự hết hạn trạng thái, trách nhiệm lưu trữ dữ liệu trạng thái cũ được gỡ bỏ khỏi người dùng cá nhân và đẩy sang các thực thể khác như các nhà cung cấp tập trung, các thành viên cộng đồng vị tha hoặc các giải pháp phi tập trung mang tính tương lai hơn như Portal Network.

Hết hạn trạng thái vẫn đang trong giai đoạn nghiên cứu và chưa sẵn sàng để ra mắt. Hết hạn trạng thái rất có thể sẽ diễn ra muộn hơn so với các máy khách phi trạng thái và hết hạn lịch sử vì những nâng cấp đó làm cho kích thước trạng thái lớn trở nên dễ quản lý đối với phần lớn các trình xác thực.

## Tính phi trạng thái {#statelessness-2}

Tính phi trạng thái là một thuật ngữ hơi sai lệch vì nó không có nghĩa là khái niệm "trạng thái" bị loại bỏ, mà nó liên quan đến những thay đổi trong cách các nút Ethereum xử lý dữ liệu trạng thái. Bản thân tính phi trạng thái có hai dạng: tính phi trạng thái yếu và tính phi trạng thái mạnh. Tính phi trạng thái yếu cho phép hầu hết các nút trở nên phi trạng thái bằng cách đặt trách nhiệm lưu trữ trạng thái lên một số ít nút. Tính phi trạng thái mạnh hoàn toàn loại bỏ nhu cầu lưu trữ dữ liệu trạng thái đầy đủ của bất kỳ nút nào. Cả tính phi trạng thái yếu và mạnh đều mang lại những lợi ích sau cho các trình xác thực thông thường:

- đồng bộ hóa gần như tức thì
- khả năng xác thực các khối không theo thứ tự
- các nút có thể chạy với yêu cầu phần cứng rất thấp (ví dụ: trên điện thoại)
- các nút có thể chạy trên các ổ cứng rẻ tiền vì không yêu cầu đọc/ghi đĩa
- tương thích với các bản nâng cấp trong tương lai đối với mật mã học của Ethereum

### Tính phi trạng thái yếu {#weak-statelessness}

Tính phi trạng thái yếu có liên quan đến những thay đổi trong cách các nút Ethereum xác minh các thay đổi trạng thái, nhưng nó không hoàn toàn loại bỏ nhu cầu lưu trữ trạng thái ở tất cả các nút trên mạng lưới. Thay vào đó, tính phi trạng thái yếu đặt trách nhiệm lưu trữ trạng thái lên những người đề xuất khối, trong khi tất cả các nút khác trên mạng lưới xác minh các khối mà không cần lưu trữ dữ liệu trạng thái đầy đủ.

**Trong tính phi trạng thái yếu, việc đề xuất các khối yêu cầu quyền truy cập vào dữ liệu trạng thái đầy đủ nhưng việc xác minh các khối không yêu cầu dữ liệu trạng thái nào**

Để điều này xảy ra, trước tiên các máy khách Ethereum phải áp dụng một cấu trúc dữ liệu mới để lưu trữ dữ liệu trạng thái Ethereum cho phép các "bằng chứng dữ liệu" nhỏ đối với dữ liệu được truyền giữa các thiết bị ngang hàng và được sử dụng để xác minh các khối thay vì xác minh các khối dựa trên các cơ sở dữ liệu cục bộ. Đề xuất hiện tại là một cây nhị phân hợp nhất ([EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)), thay thế cho thiết kế [cây Verkle](/roadmap/verkle-trees/) trước đó. [Tách biệt người đề xuất và người xây dựng (PBS)](/roadmap/pbs/) cũng được yêu cầu vì điều này cho phép những người xây dựng khối trở thành các nút chuyên biệt với phần cứng mạnh mẽ hơn, và đó là những nút yêu cầu quyền truy cập vào dữ liệu trạng thái đầy đủ.

<ExpandableCard title="Tại sao việc dựa vào ít người đề xuất khối hơn lại ổn?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Tính phi trạng thái dựa vào việc những người xây dựng khối duy trì một bản sao của dữ liệu trạng thái đầy đủ để họ có thể tạo ra các bằng chứng dữ liệu có thể được sử dụng để xác minh khối. Các nút khác không cần quyền truy cập vào dữ liệu trạng thái, tất cả thông tin được yêu cầu để xác minh khối đều có sẵn trong bằng chứng dữ liệu. Điều này tạo ra một tình huống trong đó việc đề xuất một khối thì tốn kém, nhưng việc xác minh khối lại rẻ, ngụ ý rằng sẽ có ít nhà điều hành chạy một nút đề xuất khối hơn. Tuy nhiên, sự phi tập trung của những người đề xuất khối không quá quan trọng miễn là có càng nhiều người tham gia càng tốt có thể xác minh độc lập rằng các khối mà họ đề xuất là hợp lệ.

<ButtonLink variant="outline" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Đọc thêm trên các ghi chú của Dankrad</ButtonLink>
</ExpandableCard>

Những người đề xuất khối sử dụng dữ liệu trạng thái để tạo ra các "bằng chứng dữ liệu" - tập hợp dữ liệu tối thiểu chứng minh các giá trị của trạng thái đang bị thay đổi bởi các giao dịch trong một khối. Các trình xác thực khác không giữ trạng thái, họ chỉ lưu trữ gốc trạng thái (một Mã băm của toàn bộ trạng thái). Họ nhận được một khối và một bằng chứng dữ liệu và sử dụng chúng để cập nhật gốc trạng thái của họ. Điều này làm cho một nút xác thực trở nên cực kỳ nhẹ.

Tính phi trạng thái yếu đang ở giai đoạn nghiên cứu nâng cao, nhưng nó phụ thuộc vào việc tách biệt người đề xuất và người xây dựng và một cây trạng thái mới đã được triển khai để các bằng chứng dữ liệu nhỏ có thể được truyền giữa các thiết bị ngang hàng. Điều này có nghĩa là tính phi trạng thái yếu có thể còn vài năm nữa mới có mặt trên Mạng chính Ethereum.

[zkEVM để xác minh L1](/roadmap/zkevm/) là một công nghệ bổ sung có thể tăng cường hơn nữa việc xác minh phi trạng thái. Thay vì chỉ kiểm tra các bằng chứng dữ liệu, các trình xác thực có thể xác minh một Bằng chứng không kiến thức rằng toàn bộ khối đã được thực thi chính xác—cung cấp sự chắc chắn về mặt mật mã học mà không cần thực thi lại các giao dịch.

### Tính phi trạng thái mạnh {#strong-statelessness}

Tính phi trạng thái mạnh loại bỏ nhu cầu lưu trữ dữ liệu trạng thái của bất kỳ nút nào. Thay vào đó, các giao dịch được gửi kèm theo các bằng chứng dữ liệu có thể được tổng hợp bởi những người tạo khối. Những người tạo khối sau đó chịu trách nhiệm chỉ lưu trữ trạng thái cần thiết để tạo ra các bằng chứng dữ liệu cho các Tài khoản liên quan. Trách nhiệm đối với trạng thái gần như hoàn toàn được chuyển sang người dùng, vì họ gửi các bằng chứng dữ liệu và 'danh sách truy cập' để khai báo các Tài khoản và khóa lưu trữ nào mà họ đang tương tác. Điều này sẽ cho phép các nút cực kỳ nhẹ, nhưng có những sự đánh đổi bao gồm việc làm cho việc giao dịch với các hợp đồng thông minh trở nên khó khăn hơn.

Tính phi trạng thái mạnh đã được các nhà nghiên cứu điều tra nhưng hiện không được kỳ vọng sẽ là một phần trong lộ trình của Ethereum - nhiều khả năng tính phi trạng thái yếu là đủ cho nhu cầu mở rộng quy mô của Ethereum.

## Tiến độ hiện tại {#current-progress}

Hết hạn lịch sử một phần đã được triển khai vào tháng 7 năm 2025, cho phép các máy khách thực thi loại bỏ lịch sử từ trước The Merge. Tính phi trạng thái yếu, hết hạn lịch sử theo chu kỳ cuốn chiếu và hết hạn trạng thái vẫn đang trong giai đoạn nghiên cứu và dự kiến sẽ được triển khai trong vài năm tới. Không có gì đảm bảo rằng tất cả các đề xuất này sẽ được triển khai, ví dụ, nếu hết hạn trạng thái được triển khai trước thì có thể không cần phải triển khai thêm hết hạn lịch sử. Cũng có các mục lộ trình khác, chẳng hạn như một cây trạng thái mới (hiện được đề xuất là một cây nhị phân trong [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)) và [Tách biệt người đề xuất và người xây dựng (PBS)](/roadmap/pbs) cần phải được hoàn thành trước.

## Đọc thêm {#further-reading}

- [Ethereum phi trạng thái là gì?](https://stateless.fyi/)
- [AMA về tính phi trạng thái của Vitalik](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Lý thuyết về quản lý kích thước trạng thái](https://hackmd.io/@vbuterin/state_size_management)
- [Giới hạn trạng thái giảm thiểu xung đột khôi phục](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Các con đường dẫn đến tính phi trạng thái và hết hạn trạng thái](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Đặc tả EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes nói về EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Tại sao việc trở nên phi trạng thái lại quan trọng đến vậy](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Các ghi chú khái niệm máy khách phi trạng thái ban đầu](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Thêm về hết hạn trạng thái](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Nhiều hơn nữa về hết hạn trạng thái](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Trang thông tin Ethereum phi trạng thái](https://stateless.fyi)
