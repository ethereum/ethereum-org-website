---
title: Trình duyệt khối
description: Giới thiệu về trình khám phá khối, thông tin của bạn ở trong thế giới của dữ liệu blockchain, nơi bạn có thể truy vấn thông tin về giao dịch, tài khoản, liên lạc và nhiều hơn nữa.
lang: vi
sidebarDepth: 3
---

Các trình duyệt khối là cổng thông tin của bạn đến dữ liệu của Ethereum. Bạn có thể sử dụng chúng để xem dữ liệu theo thời gian thực về các khối, giao dịch, người xác thực, tài khoản và các hoạt động trên chuỗi khác.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu các khái niệm cơ bản về Ethereum để có thể hiểu được dữ liệu mà trình duyệt khối cung cấp cho bạn. Bắt đầu với [phần giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/).

## Các dịch vụ {#services}

- [Etherscan](https://etherscan.io/) -_Cũng có sẵn bằng tiếng Trung, tiếng Hàn, tiếng Nga và tiếng Nhật_
- [3xpl](https://3xpl.com/ethereum)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum) -_Cũng có sẵn bằng tiếng Tây Ban Nha, tiếng Pháp, tiếng Ý, tiếng Hà Lan, tiếng Bồ Đào Nha, tiếng Nga, tiếng Trung và tiếng Farsi_
- [Blockscout](https://eth.blockscout.com/)
- [Chainlens](https://www.chainlens.com/)
- [Trình duyệt khối DexGuru](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) -_Cũng có sẵn bằng tiếng Trung, tiếng Tây Ban Nha, tiếng Pháp, tiếng Thổ Nhĩ Kỳ, tiếng Nga, tiếng Hàn và tiếng Việt_
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)
- [Ethseer](https://ethseer.io)

## Các công cụ mã nguồn mở {#open-source-tools}

- [Otterscan](https://otterscan.io/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)

## Dữ liệu {#data}

Ethereum được thiết kế minh bạch để mọi thứ đều có thể kiểm chứng được. Các trình duyệt khối cung cấp một giao diện để nhận thông tin này. Và điều này dành cho cả mạng chính Ethereum và các mạng thử nghiệm, phòng khi bạn cần dữ liệu đó. Dữ liệu được chia thành dữ liệu thực thi và dữ liệu đồng thuận. Dữ liệu thực thi đề cập đến các giao dịch đã được thực hiện trong một khối cụ thể. Dữ liệu đồng thuận đề cập đến chính các khối và những người xác thực đã đề xuất chúng.

Đây là bản tóm tắt các loại dữ liệu bạn có thể nhận được từ một trình duyệt khối.

### Dữ liệu thực thi {#execution-data}

Các khối mới được thêm vào Ethereum sau mỗi 12 giây (trừ khi người đề xuất khối bỏ lỡ lượt của mình), do đó, một luồng dữ liệu gần như không đổi được thêm vào các trình duyệt khối. Các khối chứa rất nhiều dữ liệu quan trọng mà bạn có thể thấy hữu ích:

**Dữ liệu tiêu chuẩn**

- Chiều cao khối - Số khối và độ dài của chuỗi khối (tính bằng khối) khi tạo khối hiện tại
- Dấu thời gian - Thời điểm một khối được đề xuất
- Các giao dịch - Số lượng giao dịch có trong khối
- Người nhận phí - Địa chỉ đã nhận tiền boa phí gas từ các giao dịch
- Phần thưởng khối - Lượng ETH được trao cho người xác thực đã đề xuất khối đó
- Kích thước - Kích thước của dữ liệu trong khối (được đo bằng byte)
- Gas đã sử dụng - Tổng số đơn vị gas được sử dụng bởi các giao dịch trong khối
- Giới hạn gas - Tổng giới hạn gas được đặt bởi các giao dịch trong khối
- Phí cơ bản mỗi gas - Hệ số nhân tối thiểu cần thiết để một giao dịch được đưa vào một khối
- Phí bị đốt - Lượng ETH bị đốt trong khối
- Dữ liệu bổ sung - Mọi dữ liệu bổ sung mà người xây dựng đã đưa vào khối

**Dữ liệu nâng cao**

- Hàm băm - Hàm băm mã hóa đại diện cho tiêu đề khối (mã định danh duy nhất của khối)
- Hàm băm mẹ - Hàm băm của khối có trước khối hiện tại
- StateRoot - Hàm băm gốc của cây Merkle lưu trữ toàn bộ trạng thái của hệ thống

### Gas {#gas}

Các trình duyệt khối không chỉ cung cấp cho bạn dữ liệu về việc sử dụng Gas trong các giao dịch và khối, mà một số còn cung cấp cho bạn thông tin về giá gas hiện tại của mạng. Điều này sẽ giúp bạn hiểu việc sử dụng mạng, gửi các giao dịch an toàn và không chi tiêu quá nhiều cho gas. Hãy tìm các API có thể giúp bạn đưa thông tin này vào giao diện sản phẩm của mình. Dữ liệu dành riêng cho gas bao gồm:

- Ước tính các đơn vị gas cần thiết cho một giao dịch an toàn nhưng chậm (+ giá và thời gian ước tính)
- Ước tính các đơn vị gas cần thiết cho một giao dịch trung bình (+ giá và thời gian ước tính)
- Ước tính các đơn vị gas cần thiết cho một giao dịch nhanh (+ giá và thời gian ước tính)
- Thời gian xác nhận trung bình dựa trên giá gas
- Các hợp đồng đang tiêu thụ gas - nói cách khác, các sản phẩm phổ biến đang được sử dụng nhiều trên mạng
- Các tài khoản đang chi tiêu gas - nói cách khác, những người dùng mạng thường xuyên

### Các giao dịch {#transactions}

Các trình duyệt khối đã trở thành một nơi phổ biến để mọi người theo dõi tiến trình giao dịch của họ. Đó là vì mức độ chi tiết bạn có thể nhận được mang lại sự chắc chắn hơn. Dữ liệu giao dịch bao gồm:

**Dữ liệu tiêu chuẩn**

- Hàm băm giao dịch - Một hàm băm được tạo khi giao dịch được gửi đi
- Trạng thái - Chỉ báo liệu giao dịch đang chờ xử lý, không thành công hay đã thành công
- Khối - Khối mà giao dịch đã được đưa vào
- Dấu thời gian - Thời điểm một giao dịch được đưa vào một khối do một người xác thực đề xuất
- Từ - Địa chỉ của tài khoản đã gửi giao dịch
- Đến - Địa chỉ của người nhận hoặc hợp đồng thông minh mà giao dịch tương tác
- Các token đã chuyển - Danh sách các token đã được chuyển như một phần của giao dịch
- Giá trị - Tổng giá trị ETH đang được chuyển
- Phí giao dịch - Số tiền trả cho người xác thực để xử lý giao dịch (được tính bằng giá gas\*gas đã sử dụng)

**Dữ liệu nâng cao**

- Giới hạn gas - Số đơn vị gas tối đa mà giao dịch này có thể tiêu thụ
- Gas đã sử dụng - Lượng đơn vị gas thực tế mà giao dịch đã tiêu thụ
- Giá gas - Giá được đặt cho mỗi đơn vị gas
- Nonce - Số giao dịch cho địa chỉ `from` (lưu ý rằng số này bắt đầu từ 0, do đó, nonce `100` thực sự sẽ là giao dịch thứ 101 được gửi bởi tài khoản này)
- Dữ liệu đầu vào - Bất kỳ thông tin bổ sung nào được yêu cầu bởi giao dịch

### Các tài khoản {#accounts}

Có rất nhiều dữ liệu bạn có thể truy cập về một tài khoản. Đây là lý do tại sao thường nên sử dụng nhiều tài khoản để tài sản và giá trị của bạn không thể bị theo dõi dễ dàng. Cũng có một số giải pháp đang được phát triển để làm cho các giao dịch và hoạt động tài khoản trở nên riêng tư hơn. Nhưng đây là dữ liệu có sẵn cho các tài khoản:

**Tài khoản người dùng**

- Địa chỉ tài khoản - Địa chỉ công khai bạn có thể sử dụng để gửi tiền đến
- Số dư ETH - Lượng ETH được liên kết với tài khoản đó
- Tổng giá trị ETH - Giá trị của ETH
- Token - Các token được liên kết với tài khoản và giá trị của chúng
- Lịch sử giao dịch - Danh sách tất cả các giao dịch mà tài khoản này là người gửi hoặc người nhận

**Hợp đồng thông minh**

Các tài khoản hợp đồng thông minh có tất cả dữ liệu mà một tài khoản người dùng sẽ có, nhưng một số trình duyệt khối thậm chí sẽ hiển thị một số thông tin mã. Các ví dụ bao gồm:

- Người tạo hợp đồng - Địa chỉ đã triển khai hợp đồng lên Mainnet
- Giao dịch tạo - Giao dịch bao gồm việc triển khai lên Mainnet
- Mã nguồn - Mã Solidity hoặc Vyper của hợp đồng thông minh
- ABI hợp đồng - Giao diện nhị phân ứng dụng của hợp đồng—các lệnh gọi mà hợp đồng thực hiện và dữ liệu nhận được
- Mã tạo hợp đồng - Bytecode đã biên dịch của hợp đồng thông minh—được tạo khi bạn biên dịch một hợp đồng thông minh được viết bằng Solidity hoặc Vyper, v.v.
- Sự kiện hợp đồng - Lịch sử các phương thức được gọi trong hợp đồng thông minh—về cơ bản là một cách để xem hợp đồng đang được sử dụng như thế nào và tần suất ra sao

### Token {#tokens}

Token là một loại hợp đồng nên chúng sẽ có dữ liệu tương tự như một hợp đồng thông minh. Nhưng vì chúng có giá trị và có thể được giao dịch nên chúng có các điểm dữ liệu bổ sung:

- Loại - Cho dù chúng là ERC-20, ERC-721 hay một tiêu chuẩn token khác
- Giá - Nếu là token ERC-20, chúng sẽ có giá trị thị trường hiện tại
- Vốn hóa thị trường - Nếu là token ERC-20, chúng sẽ có vốn hóa thị trường (tính bằng giá\*tổng nguồn cung)
- Tổng nguồn cung - Số lượng token đang lưu hành
- Người nắm giữ - Số lượng địa chỉ nắm giữ token
- Lượt chuyển - Số lần token đã được chuyển giữa các tài khoản
- Lịch sử giao dịch - Lịch sử của tất cả các giao dịch bao gồm token
- Địa chỉ hợp đồng - Địa chỉ của token đã được triển khai lên Mainnet
- Số thập phân - Token ERC-20 có thể chia được và có các chữ số thập phân

### Mạng {#network}

Một số dữ liệu khối quan tâm đến sức khỏe của Ethereum một cách toàn diện hơn.

- Tổng số giao dịch - Số lượng giao dịch kể từ khi Ethereum được tạo
- Giao dịch mỗi giây - Số lượng giao dịch có thể xử lý trong một giây
- Giá ETH - Định giá hiện tại của 1 ETH
- Tổng cung ETH - Số lượng ETH đang lưu hành—hãy nhớ ETH mới được tạo ra với việc tạo ra mọi khối dưới dạng phần thưởng khối
- Vốn hóa thị trường - Tính toán giá\*nguồn cung

## Dữ liệu lớp đồng thuận {#consensus-layer-data}

### Epoch {#epoch}

Vì lý do bảo mật, các ủy ban người xác thực ngẫu nhiên được tạo ra vào cuối mỗi epoch (mỗi 6,4 phút). Dữ liệu epoch bao gồm:

- Số epoch
- Trạng thái hoàn tất - Liệu epoch đã được hoàn tất hay chưa (Có/Không)
- Thời gian - Thời điểm epoch kết thúc
- Sự chứng thực - Số lượng chứng thực trong epoch (phiếu bầu cho các khối trong các slot)
- Tiền gửi - Số lượng tiền gửi ETH có trong epoch (người xác thực phải đặt cược ETH để trở thành người xác thực)
- Việc phạt - Số lượng hình phạt dành cho người đề xuất khối hoặc người chứng thực
- Sự tham gia bỏ phiếu - Lượng ETH đã đặt cược được sử dụng để chứng thực các khối
- Người xác thực - Số lượng người xác thực hoạt động trong epoch
- Số dư trung bình của người xác thực - Số dư trung bình của những người xác thực đang hoạt động
- Slot - Số lượng slot có trong epoch (các slot bao gồm một khối hợp lệ)

### Slot {#slot}

Các slot là cơ hội để tạo khối, dữ liệu có sẵn cho mỗi slot bao gồm:

- Epoch - Epoch mà trong đó slot có hiệu lực
- Số slot
- Trạng thái - Trạng thái của slot (Được đề xuất/Bị bỏ lỡ)
- Thời gian - Dấu thời gian của slot
- Người đề xuất - Người xác thực đã đề xuất khối cho slot
- Gốc khối - Gốc cây băm của BeaconBlock
- Gốc mẹ - Hàm băm của khối có trước
- Gốc trạng thái - Gốc cây băm của BeaconState
- Chữ ký
- Tiết lộ Randao
- Graffiti - Một người đề xuất khối có thể bao gồm một thông báo dài 32 byte trong đề xuất khối của mình
- Dữ liệu thực thi
  - Hàm băm khối
  - Số lượng tiền gửi
  - Gốc tiền gửi
- Sự chứng thực - Số lượng chứng thực cho khối trong slot này
- Tiền gửi - Số lượng tiền gửi trong slot này
- Thoát tự nguyện - Số lượng người xác thực đã rời đi trong slot
- Việc phạt - Số lượng hình phạt dành cho người đề xuất khối hoặc người chứng thực
- Phiếu bầu - Những người xác thực đã bỏ phiếu cho khối trong slot này

### Các khối {#blocks-1}

Bằng chứng cổ phần chia thời gian thành các slot và epoch. Vì vậy, điều đó có nghĩa là có dữ liệu mới!

- Người đề xuất - Người xác thực được chọn theo thuật toán để đề xuất khối mới
- Epoch - Epoch mà trong đó khối được đề xuất
- Slot - Slot mà trong đó khối được đề xuất
- Sự chứng thực - Số lượng chứng thực có trong slot—các chứng thực giống như các phiếu bầu cho thấy khối đã sẵn sàng để đi đến Chuỗi Beacon

### Người xác thực {#validators}

Những người xác thực chịu trách nhiệm đề xuất các khối và chứng thực chúng trong các slot.

- Số người xác thực - Số duy nhất đại diện cho người xác thực
- Số dư hiện tại - Số dư của người xác thực bao gồm cả phần thưởng
- Số dư hiệu dụng - Số dư của người xác thực được sử dụng để đặt cược
- Thu nhập - Phần thưởng hoặc hình phạt mà người xác thực nhận được
- Trạng thái - Liệu người xác thực hiện có đang trực tuyến và hoạt động hay không
- Hiệu quả chứng thực - Thời gian trung bình để các chứng thực của người xác thực được đưa vào chuỗi
- Đủ điều kiện kích hoạt - Ngày (và epoch) khi người xác thực có thể xác thực
- Hoạt động từ - Ngày (và epoch) khi người xác thực bắt đầu hoạt động
- Các khối đã đề xuất - Khối mà người xác thực đã đề xuất
- Sự chứng thực - Các chứng thực mà người xác thực đã cung cấp
- Tiền gửi - Địa chỉ gửi, hàm băm giao dịch, số khối, dấu thời gian, số tiền và trạng thái của khoản tiền gửi đặt cược do người xác thực thực hiện

### Sự chứng thực {#attestations}

Sự chứng thực là các phiếu bầu "đồng ý" để đưa các khối vào chuỗi. Dữ liệu của họ liên quan đến một bản ghi về sự chứng thực và những người xác thực đã chứng thực

- Slot - Slot mà trong đó sự chứng thực diễn ra
- Chỉ số ủy ban - Chỉ số của ủy ban tại một slot nhất định
- Các bit tổng hợp - Đại diện cho sự chứng thực tổng hợp của tất cả những người xác thực tham gia vào việc chứng thực
- Người xác thực - Những người xác thực đã cung cấp chứng thực
- Gốc khối Beacon - Trỏ đến khối mà những người xác thực đang chứng thực
- Nguồn - Trỏ đến epoch hợp lý mới nhất
- Mục tiêu - Trỏ đến ranh giới epoch mới nhất
- Chữ ký

### Mạng {#network-1}

Dữ liệu cấp cao nhất của lớp đồng thuận bao gồm những điều sau:

- Epoch hiện tại
- Slot hiện tại
- Người xác thực đang hoạt động - Số lượng người xác thực đang hoạt động
- Người xác thực đang chờ - Số lượng người xác thực đang chờ để được kích hoạt
- ETH đã đặt cược - Lượng ETH đã đặt cược trong mạng
- Số dư trung bình - Số dư ETH trung bình của những người xác thực

## Trình duyệt khối {#block-explorers}

- [Etherscan](https://etherscan.io/) - một trình duyệt khối bạn có thể sử dụng để tìm nạp dữ liệu cho Mainnet và mạng thử nghiệm của Ethereum
- [3xpl](https://3xpl.com/ethereum) - một trình duyệt Ethereum mã nguồn mở không có quảng cáo cho phép tải xuống các bộ dữ liệu của nó
- [Beaconcha.in](https://beaconcha.in/) - một trình duyệt khối mã nguồn mở cho Mainnet và mạng thử nghiệm của Ethereum
- [Blockchair](https://blockchair.com/ethereum) - trình duyệt Ethereum riêng tư nhất. Cũng dùng để sắp xếp và lọc dữ liệu (mempool)
- [Etherchain](https://www.etherchain.org/) - một trình duyệt khối cho Mainnet của Ethereum
- [Ethplorer](https://ethplorer.io/) - một trình duyệt khối tập trung vào các token cho Mainnet của Ethereum và mạng thử nghiệm Kovan

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Giao dịch](/developers/docs/transactions/)
- [Tài khoản](/developers/docs/accounts/)
- [Các mạng](/developers/docs/networks/)
