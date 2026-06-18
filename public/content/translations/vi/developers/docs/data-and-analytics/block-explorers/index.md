---
title: Trình khám phá khối
description: Giới thiệu về trình khám phá khối, cổng thông tin của bạn vào thế giới dữ liệu Chuỗi khối, nơi bạn có thể truy vấn thông tin về các giao dịch, tài khoản, hợp đồng và nhiều thứ khác.
lang: vi
sidebarDepth: 3
---

Trình khám phá khối là cổng thông tin của bạn đến với dữ liệu của Ethereum. Bạn có thể sử dụng chúng để xem dữ liệu theo thời gian thực về các khối, giao dịch, trình xác thực, tài khoản và các hoạt động trên chuỗi khác.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu các khái niệm cơ bản về Ethereum để có thể hiểu được dữ liệu mà trình khám phá khối cung cấp cho bạn. Hãy bắt đầu với [phần giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/).

## Các công cụ mã nguồn mở {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) - Một trình khám phá Ethereum không có quảng cáo cho phép tải xuống các tập dữ liệu của nó (open-core: các mô-đun cốt lõi là mã nguồn mở)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Các dịch vụ {#services}

- [Blockchair](https://blockchair.com/ethereum) - Trình khám phá Ethereum riêng tư. Cũng dùng để sắp xếp và lọc dữ liệu (mempool). Có sẵn bằng tiếng Tây Ban Nha, tiếng Pháp, tiếng Ý, tiếng Hà Lan, tiếng Bồ Đào Nha, tiếng Nga, tiếng Trung và tiếng Ba Tư
- [Chainlens](https://www.chainlens.com/)
- [Trình khám phá khối DexGuru](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) - Cũng có sẵn bằng tiếng Trung, tiếng Hàn, tiếng Nga và tiếng Nhật
- [Ethplorer](https://ethplorer.io/) - Một trình khám phá khối tập trung vào các token. Cũng có sẵn bằng tiếng Trung, tiếng Tây Ban Nha, tiếng Pháp, tiếng Thổ Nhĩ Kỳ, tiếng Nga, tiếng Hàn và tiếng Việt
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Dữ liệu {#data}

Ethereum được thiết kế minh bạch nên mọi thứ đều có thể xác minh được. Trình khám phá khối cung cấp một giao diện để lấy thông tin này. Và điều này áp dụng cho cả mạng lưới Ethereum chính (Mạng chính) và các mạng thử nghiệm (testnet), nếu bạn cần dữ liệu đó. Dữ liệu được chia thành dữ liệu thực thi và dữ liệu đồng thuận. Dữ liệu thực thi đề cập đến các giao dịch đã được thực thi trong một khối cụ thể. Dữ liệu đồng thuận đề cập đến chính các khối và các trình xác thực đã đề xuất chúng.

Dưới đây là tóm tắt về các loại dữ liệu bạn có thể nhận được từ một trình khám phá khối.

### Dữ liệu thực thi {#execution-data}

Các khối mới được thêm vào Ethereum mỗi 12 giây (trừ khi người đề xuất khối bỏ lỡ lượt của mình), vì vậy một luồng dữ liệu gần như liên tục được thêm vào các trình khám phá khối. Các khối chứa rất nhiều dữ liệu quan trọng mà bạn có thể thấy hữu ích:

**Dữ liệu tiêu chuẩn**

- Chiều cao khối - Số khối và độ dài của Chuỗi khối (tính bằng khối) khi tạo khối hiện tại
- Dấu thời gian - Thời điểm mà một khối được đề xuất
- Giao dịch - Số lượng giao dịch được bao gồm trong khối
- Người nhận phí - Địa chỉ nhận tiền boa phí gas từ các giao dịch
- Phần thưởng khối - Số lượng ETH được thưởng cho trình xác thực đã đề xuất khối
- Kích thước - Kích thước của dữ liệu trong khối (đo bằng byte)
- Gas đã sử dụng - Tổng số đơn vị Gas được sử dụng bởi các giao dịch trong khối
- Giới hạn gas - Tổng giới hạn gas được thiết lập bởi các giao dịch trong khối
- Phí cơ sở cho mỗi gas - Hệ số nhân tối thiểu cần thiết để một giao dịch được đưa vào một khối
- Phí bị đốt - Lượng ETH bị đốt trong khối
- Dữ liệu bổ sung - Bất kỳ dữ liệu bổ sung nào mà trình xây dựng đã đưa vào khối

**Dữ liệu nâng cao**

- Mã băm - Mã băm mật mã đại diện cho tiêu đề block (định danh duy nhất của khối)
- Mã băm cha - Mã băm của khối xuất hiện trước khối hiện tại
- StateRoot - Mã băm gốc của cây Merkle lưu trữ toàn bộ trạng thái của hệ thống

### Gas {#gas}

Trình khám phá khối không chỉ cung cấp cho bạn dữ liệu về việc sử dụng Gas trong các giao dịch và khối, mà một số còn cung cấp cho bạn thông tin về giá gas hiện tại của mạng lưới. Điều này sẽ giúp bạn hiểu được mức độ sử dụng mạng lưới, gửi các giao dịch an toàn và không chi tiêu quá mức cho gas. Hãy tìm kiếm các API có thể giúp bạn đưa thông tin này vào giao diện sản phẩm của mình. Dữ liệu cụ thể về Gas bao gồm:

- Ước tính số đơn vị Gas cần thiết cho một giao dịch an toàn nhưng chậm (+ giá và thời lượng ước tính)
- Ước tính số đơn vị Gas cần thiết cho một giao dịch trung bình (+ giá và thời lượng ước tính)
- Ước tính số đơn vị Gas cần thiết cho một giao dịch nhanh (+ giá và thời lượng ước tính)
- Thời gian xác nhận trung bình dựa trên giá gas
- Các hợp đồng đang tiêu thụ Gas - nói cách khác, các sản phẩm phổ biến đang được sử dụng nhiều trên mạng lưới
- Các tài khoản đang chi tiêu Gas - nói cách khác, những người dùng mạng lưới thường xuyên

### Giao dịch {#transactions}

Trình khám phá khối đã trở thành một nơi phổ biến để mọi người theo dõi tiến trình giao dịch của họ. Đó là bởi vì mức độ chi tiết mà bạn có thể nhận được mang lại sự chắc chắn hơn. Dữ liệu giao dịch bao gồm:

**Dữ liệu tiêu chuẩn**

- Mã băm giao dịch - Một mã băm được tạo ra khi giao dịch được gửi
- Trạng thái - Dấu hiệu cho biết giao dịch đang chờ xử lý, thất bại hay thành công
- Khối - Khối mà giao dịch đã được đưa vào
- Dấu thời gian - Thời điểm mà một giao dịch được đưa vào một khối do một trình xác thực đề xuất
- Từ - Địa chỉ của tài khoản đã gửi giao dịch
- Đến - Địa chỉ của người nhận hoặc hợp đồng thông minh mà giao dịch tương tác
- Token đã chuyển - Danh sách các token đã được chuyển như một phần của giao dịch
- Giá trị - Tổng giá trị ETH đang được chuyển
- Phí giao dịch - Số tiền trả cho trình xác thực để xử lý giao dịch (được tính bằng giá gas\*gas đã sử dụng)

**Dữ liệu nâng cao**

- Giới hạn gas - Số lượng đơn vị Gas tối đa mà giao dịch này có thể tiêu thụ
- Gas đã sử dụng - Số lượng đơn vị Gas thực tế mà giao dịch đã tiêu thụ
- Giá gas - Giá được đặt cho mỗi đơn vị Gas
- Nonce - Số thứ tự giao dịch cho địa chỉ `from` (hãy nhớ rằng số này bắt đầu từ 0 nên một nonce là `100` thực tế sẽ là giao dịch thứ 101 được gửi bởi tài khoản này)
- Dữ liệu đầu vào - Bất kỳ thông tin bổ sung nào mà giao dịch yêu cầu

### Tài khoản {#accounts}

Có rất nhiều dữ liệu mà bạn có thể truy cập về một tài khoản. Đây là lý do tại sao người ta thường khuyên nên sử dụng nhiều tài khoản để tài sản và giá trị của bạn không thể dễ dàng bị theo dõi. Cũng có một số giải pháp đang được phát triển để làm cho các giao dịch và hoạt động tài khoản trở nên riêng tư hơn. Nhưng đây là dữ liệu có sẵn cho các tài khoản:

**Tài khoản người dùng**

- Địa chỉ tài khoản - Địa chỉ công khai mà bạn có thể sử dụng để gửi tiền đến
- Số dư ETH - Số lượng ETH được liên kết với tài khoản đó
- Tổng giá trị ETH - Giá trị của số ETH đó
- Token - Các token được liên kết với tài khoản và giá trị của chúng
- Lịch sử giao dịch - Danh sách tất cả các giao dịch mà tài khoản này là người gửi hoặc người nhận

**Hợp đồng thông minh**

Tài khoản hợp đồng thông minh có tất cả dữ liệu mà một tài khoản người dùng sẽ có, nhưng một số trình khám phá khối thậm chí sẽ hiển thị cả một số thông tin về mã. Các ví dụ bao gồm:

- Người tạo hợp đồng - Địa chỉ đã thực hiện việc triển khai hợp đồng lên Mạng chính
- Giao dịch tạo - Giao dịch bao gồm việc triển khai lên Mạng chính
- Mã nguồn - Mã Solidity hoặc Vyper của hợp đồng thông minh
- ABI của hợp đồng - Giao diện nhị phân ứng dụng (ABI) của hợp đồng—các lệnh gọi mà hợp đồng thực hiện và dữ liệu nhận được
- Mã tạo hợp đồng - Mã byte đã biên dịch của hợp đồng thông minh—được tạo ra khi bạn biên dịch một hợp đồng thông minh được viết bằng Solidity hoặc Vyper, v.v.
- Sự kiện hợp đồng - Lịch sử các phương thức được gọi trong hợp đồng thông minh—về cơ bản là một cách để xem hợp đồng đang được sử dụng như thế nào và tần suất ra sao

### Token {#tokens}

Token là một loại hợp đồng nên chúng sẽ có dữ liệu tương tự như một hợp đồng thông minh. Nhưng vì chúng có giá trị và có thể được giao dịch nên chúng có thêm các điểm dữ liệu:

- Loại - Cho dù chúng là ERC-20, ERC-721 hay một tiêu chuẩn token khác
- Giá - Nếu chúng là ERC-20, chúng sẽ có giá trị thị trường hiện tại
- Vốn hóa thị trường - Nếu chúng là ERC-20, chúng sẽ có vốn hóa thị trường (được tính bằng giá\*tổng nguồn cung)
- Tổng nguồn cung - Số lượng token đang lưu hành
- Người nắm giữ - Số lượng địa chỉ nắm giữ token
- Lượt chuyển - Số lần token đã được chuyển giữa các tài khoản
- Lịch sử giao dịch - Lịch sử của tất cả các giao dịch bao gồm token đó
- Địa chỉ hợp đồng - Địa chỉ của token đã được triển khai lên Mạng chính
- Số thập phân - Các token ERC-20 có thể chia nhỏ và có các chữ số thập phân

### Mạng lưới {#network}

Một số dữ liệu khối liên quan đến sức khỏe của Ethereum một cách tổng thể hơn.

- Tổng số giao dịch - Số lượng giao dịch kể từ khi Ethereum được tạo ra
- Giao dịch mỗi giây - Số lượng giao dịch có thể xử lý trong một giây
- Giá ETH - Định giá hiện tại của 1 ETH
- Tổng nguồn cung ETH - Số lượng ETH đang lưu hành—hãy nhớ rằng ETH mới được tạo ra cùng với việc tạo ra mỗi khối dưới dạng phần thưởng khối
- Vốn hóa thị trường - Tính toán bằng giá\*nguồn cung

## Dữ liệu lớp đồng thuận {#consensus-layer-data}

### Kỷ nguyên {#epoch}

Vì lý do bảo mật, các ủy ban trình xác thực ngẫu nhiên được tạo ra vào cuối mỗi Kỷ nguyên (mỗi 6,4 phút). Dữ liệu Kỷ nguyên bao gồm:

- Số Kỷ nguyên
- Trạng thái đã chung cuộc - Liệu Kỷ nguyên đã chung cuộc hay chưa (Có/Không)
- Thời gian - Thời điểm Kỷ nguyên kết thúc
- Chứng thực - Số lượng chứng thực trong Kỷ nguyên (bỏ phiếu cho các khối trong các khe)
- Tiền gửi - Số lượng tiền gửi ETH được bao gồm trong Kỷ nguyên (trình xác thực phải đặt cọc ETH để trở thành trình xác thực)
- Cắt giảm - Số lượng hình phạt được đưa ra cho những người đề xuất khối hoặc người chứng thực
- Sự tham gia bỏ phiếu - Số lượng ETH đã đặt cọc được sử dụng để chứng thực các khối
- Trình xác thực - Số lượng trình xác thực hoạt động trong Kỷ nguyên
- Số dư trình xác thực trung bình - Số dư trung bình của các trình xác thực đang hoạt động
- Khe - Số lượng khe được bao gồm trong Kỷ nguyên (các khe bao gồm một khối hợp lệ)

### Khe {#slot}

Các khe là cơ hội để tạo khối, dữ liệu có sẵn cho mỗi khe bao gồm:

- Kỷ nguyên - Kỷ nguyên mà khe đó hợp lệ
- Số khe
- Trạng thái - Trạng thái của khe (Đã đề xuất/Bị lỡ)
- Thời gian - Dấu thời gian của khe
- Người đề xuất - Trình xác thực đã đề xuất khối cho khe
- Gốc khối - Gốc cây băm (hash-tree-root) của khối beacon (BeaconBlock)
- Gốc cha - Mã băm của khối xuất hiện trước đó
- Gốc trạng thái - Gốc cây băm của Trạng thái Beacon (BeaconState)
- Chữ ký
- Tiết lộ RANDAO
- Graffiti - Một người đề xuất khối có thể bao gồm một thông điệp dài 32 byte vào đề xuất khối của mình
- Dữ liệu thực thi
  - Mã băm khối
  - Số lượng tiền gửi
  - Gốc tiền gửi
- Chứng thực - Số lượng chứng thực cho khối trong khe này
- Tiền gửi - Số lượng tiền gửi trong khe này
- Rời đi tự nguyện - Số lượng trình xác thực đã rời đi trong khe
- Cắt giảm - Số lượng hình phạt được đưa ra cho những người đề xuất khối hoặc người chứng thực
- Bỏ phiếu - Các trình xác thực đã bỏ phiếu cho khối trong khe này

### Khối {#blocks-1}

Bằng chứng cổ phần (PoS) chia thời gian thành các khe và Kỷ nguyên. Vì vậy, điều đó có nghĩa là có dữ liệu mới!

- Người đề xuất - Trình xác thực được chọn theo thuật toán để đề xuất khối mới
- Kỷ nguyên - Kỷ nguyên mà khối được đề xuất
- Khe - Khe mà khối được đề xuất
- Chứng thực - Số lượng chứng thực được bao gồm trong khe—chứng thực giống như các phiếu bầu chỉ ra rằng khối đã sẵn sàng để đi đến Chuỗi Beacon

### Trình xác thực {#validators}

Trình xác thực chịu trách nhiệm đề xuất các khối và chứng thực chúng trong các khe.

- Số trình xác thực - Số duy nhất đại diện cho trình xác thực
- Số dư hiện tại - Số dư của trình xác thực bao gồm cả phần thưởng
- Số dư hiệu dụng - Số dư của trình xác thực được sử dụng cho việc đặt cọc
- Thu nhập - Các phần thưởng hoặc hình phạt mà trình xác thực nhận được
- Trạng thái - Liệu trình xác thực hiện đang trực tuyến và hoạt động hay không
- Hiệu quả chứng thực - Thời gian trung bình cần thiết để các chứng thực của trình xác thực được đưa vào Chuỗi
- Đủ điều kiện cho sự kích hoạt - Ngày (và Kỷ nguyên) khi trình xác thực trở nên sẵn sàng để xác thực
- Hoạt động kể từ - Ngày (và Kỷ nguyên) khi trình xác thực bắt đầu hoạt động
- Các khối đã đề xuất - Khối mà trình xác thực đã đề xuất
- Chứng thực - Các chứng thực mà trình xác thực đã cung cấp
- Tiền gửi - Địa chỉ gửi, mã băm giao dịch, số khối, dấu thời gian, số tiền và trạng thái của khoản tiền đặt cọc do trình xác thực thực hiện

### Chứng thực {#attestations}

Chứng thực là các phiếu bầu "đồng ý" để đưa các khối vào Chuỗi. Dữ liệu của chúng liên quan đến bản ghi của chứng thực và các trình xác thực đã chứng thực

- Khe - Khe mà chứng thực diễn ra
- Chỉ số ủy ban - Chỉ số của ủy ban tại khe nhất định
- Các bit tổng hợp - Đại diện cho chứng thực tổng hợp của tất cả các trình xác thực tham gia vào chứng thực
- Trình xác thực - Các trình xác thực đã cung cấp chứng thực
- Gốc khối beacon - Trỏ đến khối mà các trình xác thực đang chứng thực
- Nguồn - Trỏ đến Kỷ nguyên đã được chứng minh hợp lệ mới nhất
- Đích - Trỏ đến ranh giới Kỷ nguyên mới nhất
- Chữ ký

### Mạng lưới {#network-1}

Dữ liệu cấp cao nhất của lớp đồng thuận bao gồm những điều sau:

- Kỷ nguyên hiện tại
- Khe hiện tại
- Trình xác thực đang hoạt động - Số lượng trình xác thực đang hoạt động
- Trình xác thực đang chờ xử lý - Số lượng trình xác thực đang chờ để được hoạt động
- ETH đã đặt cọc - Số lượng ETH đã đặt cọc trong mạng lưới
- Số dư trung bình - Số dư ETH trung bình của các trình xác thực

## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Các chủ đề liên quan {#related-topics}

- [Giao dịch](/developers/docs/transactions/)
- [Tài khoản](/developers/docs/accounts/)
- [Mạng lưới](/developers/docs/networks/)