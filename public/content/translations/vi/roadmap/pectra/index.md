---
title: Prague-Electra (Pectra)
description: "Tìm hiểu về bản nâng cấp giao thức Pectra"
lang: vi
---

# Pectra {#pectra}

Bản nâng cấp mạng Pectra theo sau [Dencun](/roadmap/dencun/) và mang lại những thay đổi cho cả lớp thực thi và lớp đồng thuận của Ethereum. Tên rút gọn Pectra là sự kết hợp của Prague và Electra, là tên tương ứng cho các thay đổi đặc tả của lớp thực thi và lớp đồng thuận. Cùng nhau, những thay đổi này mang lại một số cải tiến cho người dùng, nhà phát triển và trình xác thực Ethereum.

Bản nâng cấp này đã được kích hoạt thành công trên mạng chính Ethereum tại epoch `364032`, vào **ngày 07 tháng 5 năm 2025 lúc 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Bản nâng cấp Pectra chỉ là một bước duy nhất trong các mục tiêu phát triển dài hạn của Ethereum. Tìm hiểu thêm về [lộ trình giao thức](/roadmap/) và [các bản nâng cấp trước đây](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Những cải tiến trong Pectra {#new-improvements}

Pectra mang lại số lượng [EIPs](https://eips.ethereum.org/) lớn nhất so với bất kỳ bản nâng cấp nào trước đây! Có nhiều thay đổi nhỏ nhưng cũng có một số tính năng mới quan trọng. Danh sách đầy đủ các thay đổi và chi tiết kỹ thuật có thể được tìm thấy trong từng EIP riêng lẻ đi kèm.

### Mã tài khoản EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) đại diện cho một bước tiến lớn hướng tới [trừu tượng hóa tài khoản](/roadmap/account-abstraction/) rộng rãi. Với tính năng này, người dùng có thể đặt địa chỉ của họ ([EOA](/glossary/#eoa)) để được mở rộng bằng một hợp đồng thông minh. EIP giới thiệu một loại giao dịch mới với một chức năng cụ thể - cho phép chủ sở hữu địa chỉ ký một ủy quyền đặt địa chỉ của họ để bắt chước một hợp đồng thông minh đã chọn.

Với EIP này, người dùng có thể chọn tham gia các ví có thể lập trình cho phép các tính năng mới như gộp giao dịch, giao dịch không mất gas và truy cập tài sản tùy chỉnh cho các cơ chế khôi phục thay thế. Cách tiếp cận kết hợp này kết hợp sự đơn giản của các EOA với khả năng lập trình của các tài khoản dựa trên hợp đồng.

Đọc tìm hiểu sâu hơn về 7702 [tại đây](/roadmap/pectra/7702/)

### Tăng số dư hiệu dụng tối đa {#7251}

Số dư hiệu dụng hiện tại của trình xác thực chính xác là 32 ETH. Đó là số tiền tối thiểu cần thiết để tham gia vào sự đồng thuận nhưng đồng thời cũng là mức tối đa mà một trình xác thực duy nhất có thể đặt cược.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) nâng số dư hiệu dụng tối đa có thể lên 2048 ETH, có nghĩa là một trình xác thực duy nhất hiện có thể đặt cược từ 32 đến 2048 ETH. Thay vì bội số của 32, giờ đây người đặt cược có thể chọn một lượng ETH tùy ý để đặt cược và nhận phần thưởng trên mỗi 1 ETH trên mức tối thiểu. Ví dụ: nếu số dư của trình xác thực tăng cùng với phần thưởng của họ lên 33 ETH, thì 1 ETH thừa cũng được coi là một phần của số dư hiệu dụng và nhận được phần thưởng.

Nhưng lợi ích của một hệ thống phần thưởng tốt hơn cho các trình xác thực chỉ là một phần của cải tiến này. [Người đặt cược](/staking/) chạy nhiều trình xác thực giờ đây có thể tổng hợp chúng thành một trình xác thực duy nhất, điều này cho phép vận hành dễ dàng hơn và giảm chi phí mạng. Bởi vì mọi trình xác thực trong Beacon Chain đều gửi một chữ ký trong mỗi epoch, yêu cầu băng thông tăng lên khi có nhiều trình xác thực hơn và một số lượng lớn chữ ký cần được lan truyền. Việc tổng hợp các trình xác thực sẽ giảm tải cho mạng và mở ra các tùy chọn mở rộng quy mô mới trong khi vẫn giữ được an ninh kinh tế như cũ.

Đọc tìm hiểu sâu hơn về maxEB [tại đây](/roadmap/pectra/maxeb/)

### Tăng thông lượng blob {#7691}

Các blob cung cấp [tính khả dụng của dữ liệu](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) cho các L2. Chúng đã được giới thiệu trong [bản nâng cấp mạng trước đó](/roadmap/dencun/).

Hiện tại, mạng nhắm mục tiêu trung bình 3 blob mỗi khối với tối đa 6 blob. Với [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), số lượng blob trung bình sẽ được tăng lên 6, với tối đa 9 blob mỗi khối, dẫn đến tăng dung lượng cho các rollup Ethereum. EIP này giúp thu hẹp khoảng cách cho đến khi [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) cho phép số lượng blob cao hơn nữa.

### Tăng chi phí calldata {#7623}

Trước khi giới thiệu [blob trong bản nâng cấp Dencun](/roadmap/danksharding), các L2 đã sử dụng [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) để lưu trữ dữ liệu của họ trên Ethereum. Cả blob và calldata đều ảnh hưởng đến việc sử dụng băng thông của Ethereum. Mặc dù hầu hết các khối chỉ sử dụng một lượng calldata tối thiểu, các khối chứa nhiều dữ liệu mà cũng chứa nhiều blob có thể gây hại cho mạng p2p của Ethereum.

Để giải quyết vấn đề này, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) tăng giá calldata, nhưng chỉ đối với các giao dịch chứa nhiều dữ liệu. Điều này giới hạn kích thước khối trong trường hợp xấu nhất, tạo động lực cho các L2 chỉ sử dụng blob và không ảnh hưởng đến hơn 99% giao dịch.

### Lối thoát có thể kích hoạt từ lớp thực thi {#7002}

Hiện tại, việc thoát khỏi một trình xác thực và [rút ETH đã đặt cược](/staking/withdrawals/) là một hoạt động của lớp đồng thuận yêu cầu một khóa trình xác thực đang hoạt động, cùng một khóa BLS được trình xác thực sử dụng để thực hiện các nhiệm vụ hoạt động như chứng thực. Thông tin xác thực rút tiền là một khóa lạnh riêng biệt nhận số tiền đặt cược đã thoát nhưng không thể kích hoạt việc thoát. Cách duy nhất để người đặt cược thoát là gửi một thông báo đặc biệt đến mạng Beacon Chain được ký bằng khóa trình xác thực đang hoạt động. Điều này gây hạn chế trong các trường hợp thông tin xác thực rút tiền và khóa trình xác thực được nắm giữ bởi các thực thể khác nhau hoặc khi khóa trình xác thực bị mất.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) giới thiệu một hợp đồng mới có thể được sử dụng để kích hoạt việc thoát bằng cách sử dụng thông tin xác thực rút tiền của lớp thực thi. Người đặt cược sẽ có thể thoát khỏi trình xác thực của họ bằng cách gọi một hàm trong hợp đồng đặc biệt này mà không cần khóa ký của trình xác thực hoặc quyền truy cập vào Beacon Chain. Quan trọng là, việc cho phép rút tiền của trình xác thực trên chuỗi cho phép các giao thức đặt cược với các giả định tin cậy giảm bớt đối với các nhà điều hành nút.

### Tiền gửi của trình xác thực trên chuỗi {#6110}

Tiền gửi của trình xác thực hiện được xử lý bởi [cuộc thăm dò eth1data](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), đây là một hàm trên Beacon Chain lấy dữ liệu từ lớp thực thi. Đó là một loại nợ kỹ thuật từ thời trước The Merge khi Beacon Chain là một mạng riêng biệt và phải quan tâm đến việc tái tổ chức bằng chứng công việc.

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) là một cách mới để chuyển tiền gửi từ lớp thực thi sang lớp đồng thuận, cho phép xử lý tức thì với độ phức tạp triển khai thấp hơn. Đó là một cách xử lý tiền gửi an toàn hơn, nguyên bản của Ethereum đã hợp nhất. Nó cũng giúp đảm bảo cho giao thức trong tương lai vì không yêu cầu tiền gửi lịch sử để khởi động nút, điều cần thiết cho việc hết hạn lịch sử.

### Tiền biên dịch cho BLS12-381 {#2537}

Tiền biên dịch là một tập hợp đặc biệt các hợp đồng thông minh được tích hợp trực tiếp vào Máy ảo Ethereum ([EVM](/developers/docs/evm/)). Không giống như các hợp đồng thông thường, tiền biên dịch không được người dùng triển khai mà là một phần của chính quá trình triển khai máy khách, được viết bằng ngôn ngữ gốc của nó (ví dụ: Go, Java, v.v., không phải Solidity). Tiền biên dịch phục vụ cho các chức năng được sử dụng rộng rãi và được tiêu chuẩn hóa như các hoạt động mật mã. Các nhà phát triển hợp đồng thông minh có thể gọi tiền biên dịch như một hợp đồng thông thường nhưng với độ an toàn và hiệu quả cao hơn.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) bổ sung các tiền biên dịch mới cho các hoạt động đường cong trên [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Đường cong elip này đã được sử dụng rộng rãi trong các hệ sinh thái tiền mã hóa nhờ các đặc tính thực tế của nó. Cụ thể hơn, nó đã được lớp đồng thuận của Ethereum áp dụng, nơi nó được các trình xác thực sử dụng.

Tiền biên dịch mới bổ sung khả năng cho mọi nhà phát triển thực hiện các hoạt động mật mã một cách dễ dàng, hiệu quả và an toàn bằng cách sử dụng đường cong này, ví dụ như xác minh chữ ký. Các ứng dụng trên chuỗi phụ thuộc vào đường cong này có thể trở nên tiết kiệm gas và an toàn hơn khi dựa vào một tiền biên dịch thay vì một số hợp đồng tùy chỉnh. Điều này chủ yếu áp dụng cho các ứng dụng muốn suy luận về các trình xác thực bên trong EVM, ví dụ: nhóm đặt cược, [đặt cược lại](/restaking/), máy khách nhẹ, cầu nối và cả không kiến thức.

### Phục vụ các hàm băm khối lịch sử từ trạng thái {#2935}

EVM hiện cung cấp opcode `BLOCKHASH` cho phép các nhà phát triển hợp đồng truy xuất hàm băm của một khối trực tiếp trong lớp thực thi. Tuy nhiên, điều này chỉ giới hạn ở 256 khối cuối cùng và có thể trở thành vấn đề đối với các máy khách không trạng thái trong tương lai.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) tạo ra một hợp đồng hệ thống mới có thể phục vụ 8192 hàm băm khối cuối cùng dưới dạng các khe lưu trữ. Điều này giúp đảm bảo cho giao thức trong tương lai cho việc thực thi không trạng thái và trở nên hiệu quả hơn khi cây Verkle được áp dụng. Tuy nhiên, ngoài điều này, các rollup có thể hưởng lợi từ điều này ngay lập tức, vì chúng có thể truy vấn hợp đồng trực tiếp với một cửa sổ lịch sử dài hơn.

### Chuyển chỉ số ủy ban ra ngoài Chứng thực {#7549}

Sự đồng thuận của Beacon Chain dựa trên việc các trình xác thực bỏ phiếu cho khối mới nhất và epoch đã hoàn tất. Chứng thực bao gồm 3 yếu tố, 2 trong số đó là phiếu bầu và thứ ba là giá trị chỉ số ủy ban.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) chuyển chỉ số này ra ngoài thông báo chứng thực đã ký, giúp việc xác minh và tổng hợp các phiếu bầu đồng thuận trở nên dễ dàng hơn. Điều này sẽ cho phép hiệu quả cao hơn trong mọi máy khách đồng thuận và có thể mang lại những cải tiến hiệu suất đáng kể cho các mạch không kiến thức để chứng minh sự đồng thuận của Ethereum.

### Thêm lịch trình blob vào tệp cấu hình EL {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) là một thay đổi đơn giản bổ sung một trường mới vào cấu hình máy khách lớp thực thi. Nó cấu hình số lượng khối, cho phép thiết lập động cho số lượng blob mục tiêu và tối đa mỗi khối cũng như điều chỉnh phí blob. Với cấu hình được xác định trực tiếp, các máy khách có thể tránh được sự phức tạp của việc trao đổi thông tin này qua API Engine.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Để tìm hiểu thêm về cách Pectra ảnh hưởng cụ thể đến bạn với tư cách là người dùng, nhà phát triển hoặc trình xác thực Ethereum, hãy xem <a href="https://epf.wiki/#/wiki/pectra-faq">Câu hỏi thường gặp về Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Bản nâng cấp này có ảnh hưởng đến tất cả các nút và trình xác thực Ethereum không? {#client-impact}

Có, bản nâng cấp Pectra yêu cầu cập nhật cho cả [máy khách thực thi và máy khách đồng thuận](/developers/docs/nodes-and-clients/). Tất cả các máy khách Ethereum chính sẽ phát hành các phiên bản hỗ trợ phân nhánh cứng được đánh dấu là ưu tiên cao. Để duy trì đồng bộ hóa với mạng Ethereum sau nâng cấp, các nhà khai thác nút phải đảm bảo họ đang chạy phiên bản máy khách được hỗ trợ. Lưu ý rằng thông tin về các bản phát hành máy khách rất nhạy cảm về thời gian và người dùng nên tham khảo các bản cập nhật mới nhất để biết chi tiết hiện tại nhất.

## Làm thế nào để chuyển đổi ETH sau phân nhánh cứng? {#scam-alert}

- **Không cần hành động gì đối với ETH của bạn**: Sau bản nâng cấp Pectra của Ethereum, bạn không cần phải chuyển đổi hay nâng cấp ETH của mình. Số dư tài khoản của bạn sẽ không thay đổi, và ETH bạn đang nắm giữ sẽ vẫn có thể truy cập được ở dạng hiện tại sau phân nhánh cứng.
- **Cẩn thận với lừa đảo!** <Emoji text="⚠️" /> **bất kỳ ai hướng dẫn bạn "nâng cấp" ETH của mình đều đang cố gắng lừa đảo bạn.** Bạn không cần phải làm gì liên quan đến bản nâng cấp này. Tài sản của bạn sẽ hoàn toàn không bị ảnh hưởng. Hãy nhớ rằng, luôn cập nhật thông tin là cách phòng chống lừa đảo tốt nhất.

[Tìm hiểu thêm về cách nhận biết và tránh lừa đảo](/security/)

## Tìm hiểu thêm từ video trực quan? Người học qua hình ảnh {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_Có gì trong Bản nâng cấp Pectra? - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Bản nâng cấp Pectra của Ethereum: Những điều người đặt cược cần biết — Blockdaemon_

## Đọc thêm {#further-reading}

- [Lộ trình Ethereum](/roadmap/)
- [Câu hỏi thường gặp về Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Trang thông tin Pectra.wtf](https://pectra.wtf)
- [Cách Pectra nâng cao trải nghiệm của người đặt cược](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Trang thông tin EIP7702](https://eip7702.io/)
- [Các mạng devnet của Pectra](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
