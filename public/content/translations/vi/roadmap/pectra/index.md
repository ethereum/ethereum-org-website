---
title: Pectra
metaTitle: Prague-Electra (Pectra)
description: Tìm hiểu về bản nâng cấp giao thức Pectra
lang: vi
authors: ["Nixo", "Mario Havel"]
---

Bản nâng cấp mạng lưới Pectra tiếp nối [Dencun](/roadmap/dencun/) và mang đến những thay đổi cho cả lớp thực thi và lớp đồng thuận của Ethereum. Tên gọi rút gọn Pectra là sự kết hợp giữa Prague và Electra, tương ứng là tên của các thay đổi đặc tả lớp thực thi và lớp đồng thuận. Cùng với nhau, những thay đổi này mang lại một số cải tiến cho người dùng, nhà phát triển và trình xác thực [Ethereum](/).

Bản nâng cấp này đã được kích hoạt thành công trên Mạng chính Ethereum tại kỷ nguyên `364032`, vào lúc **10:05 ngày 07 tháng 05 năm 2025 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Bản nâng cấp Pectra chỉ là một bước duy nhất trong các mục tiêu phát triển dài hạn của Ethereum. Tìm hiểu thêm về [lộ trình giao thức](/roadmap/) và [các bản nâng cấp trước đó](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Các cải tiến trong Pectra {#new-improvements}

Pectra mang đến số lượng [EIP](https://eips.ethereum.org/) lớn nhất so với bất kỳ bản nâng cấp nào trước đây! Có nhiều thay đổi nhỏ nhưng cũng có một số tính năng mới đáng kể. Danh sách đầy đủ các thay đổi và chi tiết kỹ thuật có thể được tìm thấy trong từng EIP riêng lẻ được bao gồm.

### Mã tài khoản EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) đại diện cho một bước tiến lớn hướng tới việc [trừu tượng hóa tài khoản](/roadmap/account-abstraction/) rộng rãi. Với tính năng này, người dùng có thể thiết lập địa chỉ của họ ([EOA](/glossary/#eoa)) để được mở rộng bằng một hợp đồng thông minh. EIP này giới thiệu một loại giao dịch mới với chức năng cụ thể - cho phép chủ sở hữu địa chỉ ký một ủy quyền thiết lập địa chỉ của họ để bắt chước một hợp đồng thông minh đã chọn. 

Với EIP này, người dùng có thể chọn tham gia vào các ví có thể lập trình cho phép các tính năng mới như gộp giao dịch, giao dịch không tốn Gas và quyền truy cập tài sản tùy chỉnh cho các phương án khôi phục thay thế. Cách tiếp cận lai này kết hợp sự đơn giản của EOA với khả năng lập trình của các tài khoản dựa trên hợp đồng. 

Đọc bài phân tích chi tiết về 7702 [tại đây](/roadmap/pectra/7702/)

### Tăng số dư hiệu dụng tối đa {#7251}

Số dư hiệu dụng hiện tại của trình xác thực chính xác là 32 ETH. Đây là số tiền tối thiểu cần thiết để tham gia vào đồng thuận nhưng đồng thời cũng là mức tối đa mà một trình xác thực duy nhất có thể đặt cọc.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) nâng số dư hiệu dụng tối đa có thể lên 2048 ETH, nghĩa là một trình xác thực duy nhất hiện có thể đặt cọc từ 32 đến 2048 ETH. Thay vì bội số của 32, người đặt cọc hiện có thể chọn một lượng ETH tùy ý để đặt cọc và nhận phần thưởng trên mỗi 1 ETH vượt quá mức tối thiểu. Ví dụ: nếu số dư của trình xác thực tăng lên cùng với phần thưởng của họ thành 33 ETH, thì 1 ETH bổ sung cũng được coi là một phần của số dư hiệu dụng và nhận được phần thưởng.

Nhưng lợi ích của một hệ thống phần thưởng tốt hơn cho các trình xác thực chỉ là một phần của cải tiến này. [Người đặt cọc](/staking/) chạy nhiều trình xác thực hiện có thể tổng hợp chúng thành một trình xác thực duy nhất, điều này cho phép vận hành dễ dàng hơn và giảm chi phí mạng lưới. Bởi vì mọi trình xác thực trong Chuỗi Beacon đều gửi một chữ ký trong mỗi kỷ nguyên, các yêu cầu về băng thông sẽ tăng lên khi có nhiều trình xác thực hơn và một lượng lớn chữ ký cần được truyền đi. Việc tổng hợp các trình xác thực sẽ giảm tải cho mạng lưới và mở ra các tùy chọn mở rộng quy mô mới trong khi vẫn giữ nguyên tính bảo mật kinh tế.

Đọc bài phân tích chi tiết về MaxEB [tại đây](/roadmap/pectra/maxeb/)

### Tăng thông lượng khối dữ liệu {#7691}

Các khối dữ liệu cung cấp [tính khả dụng của dữ liệu](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) cho các L2. Chúng đã được giới thiệu trong [bản nâng cấp mạng lưới trước đó](/roadmap/dencun/). 

Hiện tại, mạng lưới nhắm mục tiêu trung bình 3 khối dữ liệu mỗi khối với tối đa 6 khối dữ liệu. Với [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), số lượng khối dữ liệu trung bình sẽ được tăng lên 6, với tối đa 9 khối dữ liệu mỗi khối, dẫn đến việc tăng dung lượng cho các bản cuộn Ethereum. EIP này giúp thu hẹp khoảng cách cho đến khi [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) cho phép số lượng khối dữ liệu thậm chí còn cao hơn.

### Tăng chi phí dữ liệu lệnh gọi {#7623}

Trước khi giới thiệu [các khối dữ liệu trong bản nâng cấp Dencun](/roadmap/danksharding), các L2 đã sử dụng [dữ liệu lệnh gọi](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) để lưu trữ dữ liệu của họ trên Ethereum. Cả khối dữ liệu và dữ liệu lệnh gọi đều ảnh hưởng đến việc sử dụng băng thông của Ethereum. Mặc dù hầu hết các khối chỉ sử dụng một lượng tối thiểu dữ liệu lệnh gọi, nhưng các khối nặng về dữ liệu cũng chứa nhiều khối dữ liệu có thể gây hại cho mạng lưới p2p của Ethereum. 

Để giải quyết vấn đề này, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) tăng giá dữ liệu lệnh gọi, nhưng chỉ đối với các giao dịch nặng về dữ liệu. Điều này giới hạn kích thước khối trong trường hợp xấu nhất, cung cấp động lực cho các L2 chỉ sử dụng các khối dữ liệu và khiến hơn 99% các giao dịch không bị ảnh hưởng.

### Các lối thoát có thể kích hoạt từ lớp thực thi {#7002}

Hiện tại, việc thoát một trình xác thực và [rút ETH đã đặt cọc](/staking/withdrawals/) là một hoạt động của lớp đồng thuận yêu cầu một khóa trình xác thực đang hoạt động, cùng một khóa BLS được trình xác thực sử dụng để thực hiện các nhiệm vụ đang hoạt động như chứng thực. Thông tin xác thực rút tiền là một khóa lạnh riêng biệt nhận khoản đặt cọc đã thoát nhưng không thể kích hoạt việc thoát. Cách duy nhất để người đặt cọc thoát là gửi một thông điệp đặc biệt đến mạng lưới Chuỗi Beacon được ký bằng khóa trình xác thực đang hoạt động. Điều này gây hạn chế trong các tình huống mà thông tin xác thực rút tiền và khóa trình xác thực được nắm giữ bởi các thực thể khác nhau hoặc khi khóa trình xác thực bị mất.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) giới thiệu một hợp đồng mới có thể được sử dụng để kích hoạt việc thoát bằng cách sử dụng thông tin xác thực rút tiền của lớp thực thi. Người đặt cọc sẽ có thể thoát trình xác thực của họ bằng cách gọi một hàm trong hợp đồng đặc biệt này mà không cần khóa ký trình xác thực của họ hoặc quyền truy cập vào Chuỗi Beacon. Quan trọng là, việc cho phép rút tiền của trình xác thực trên chuỗi cho phép các giao thức đặt cọc với các giả định tin cậy được giảm bớt đối với các nhà điều hành nút.

### Tiền gửi của trình xác thực trên chuỗi {#6110}

Tiền gửi của trình xác thực hiện được xử lý bởi [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), đây là một hàm trên Chuỗi Beacon lấy dữ liệu từ lớp thực thi. Đây là một loại nợ kỹ thuật từ thời điểm trước The Merge khi Chuỗi Beacon là một mạng lưới riêng biệt và phải quan tâm đến các đợt tổ chức lại Bằng chứng công việc (PoW). 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) là một cách mới để chuyển tiền gửi từ lớp thực thi sang lớp đồng thuận, cho phép xử lý tức thì với độ phức tạp triển khai ít hơn. Đây là một cách an toàn hơn để xử lý các khoản tiền gửi gốc cho Ethereum đã hợp nhất. Nó cũng giúp giao thức bắt kịp tương lai vì nó không yêu cầu các khoản tiền gửi lịch sử để khởi động nút, điều này cần thiết cho việc hết hạn lịch sử.

### Hợp đồng tiền biên dịch cho BLS12-381 {#2537}

Các hợp đồng tiền biên dịch là một tập hợp đặc biệt các hợp đồng thông minh được xây dựng trực tiếp vào Máy ảo Ethereum ([EVM](/developers/docs/evm/)). Không giống như các hợp đồng thông thường, các hợp đồng tiền biên dịch không được triển khai bởi người dùng mà là một phần của chính quá trình triển khai ứng dụng khách, được viết bằng ngôn ngữ gốc của nó (ví dụ: Go, Java, v.v., không phải Solidity). Các hợp đồng tiền biên dịch phục vụ cho các chức năng được sử dụng rộng rãi và được tiêu chuẩn hóa như các hoạt động mật mã. Các nhà phát triển hợp đồng thông minh có thể gọi các hợp đồng tiền biên dịch như một hợp đồng thông thường nhưng với tính bảo mật và hiệu quả cao hơn.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) bổ sung các hợp đồng tiền biên dịch mới cho các hoạt động đường cong trên [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Đường cong elliptic này đã được sử dụng rộng rãi trong các hệ sinh thái tiền mã hóa nhờ các đặc tính thực tế của nó. Cụ thể hơn, nó đã được áp dụng bởi lớp đồng thuận của Ethereum, nơi nó được sử dụng bởi các trình xác thực.

Hợp đồng tiền biên dịch mới bổ sung khả năng cho mọi nhà phát triển thực hiện các hoạt động mật mã một cách dễ dàng, hiệu quả và an toàn bằng cách sử dụng đường cong này, ví dụ như xác minh chữ ký. Các ứng dụng trên chuỗi phụ thuộc vào đường cong này có thể trở nên tiết kiệm Gas và an toàn hơn khi dựa vào một hợp đồng tiền biên dịch thay vì một số hợp đồng tùy chỉnh. Điều này chủ yếu áp dụng cho các ứng dụng muốn suy luận về các trình xác thực bên trong EVM, ví dụ: các nhóm đặt cọc, [đặt cọc lại](/restaking/), ứng dụng khách nhẹ, cầu nối nhưng cũng bao gồm cả không tri thức.

### Cung cấp mã băm khối lịch sử từ trạng thái {#2935}

EVM hiện cung cấp mã lệnh `BLOCKHASH` cho phép các nhà phát triển hợp đồng truy xuất mã băm của một khối trực tiếp trong lớp thực thi. Tuy nhiên, điều này chỉ giới hạn ở 256 khối gần nhất và có thể trở thành vấn đề đối với các ứng dụng khách phi trạng thái trong tương lai.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) tạo ra một hợp đồng hệ thống mới có thể cung cấp 8192 mã băm khối gần nhất dưới dạng các khe lưu trữ. Điều này giúp giao thức bắt kịp tương lai cho việc thực thi phi trạng thái và trở nên hiệu quả hơn khi các cây verkle được áp dụng. Tuy nhiên, ngoài điều này, các bản cuộn có thể hưởng lợi từ điều này ngay lập tức, vì chúng có thể truy vấn hợp đồng trực tiếp với một khoảng thời gian lịch sử dài hơn.

### Di chuyển chỉ số ủy ban ra ngoài Chứng thực {#7549}

Đồng thuận Chuỗi Beacon dựa trên việc các trình xác thực bỏ phiếu cho khối mới nhất và kỷ nguyên đã chung cuộc. Chứng thực bao gồm 3 yếu tố, 2 trong số đó là các phiếu bầu và yếu tố thứ ba là giá trị chỉ số ủy ban.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) di chuyển chỉ số này ra ngoài thông điệp chứng thực đã ký, điều này giúp dễ dàng xác minh và tổng hợp các phiếu bầu đồng thuận hơn. Điều này sẽ cho phép hiệu quả cao hơn trong mọi ứng dụng khách đồng thuận và có thể mang lại những cải tiến hiệu suất đáng kể cho các mạch không tri thức để chứng minh đồng thuận Ethereum.

### Thêm lịch trình khối dữ liệu vào các tệp cấu hình EL {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) là một thay đổi đơn giản bổ sung một trường mới vào cấu hình ứng dụng khách lớp thực thi. Nó cấu hình số lượng khối, cho phép thiết lập động cho số lượng khối dữ liệu mục tiêu và tối đa trên mỗi khối cũng như điều chỉnh phí blob. Với cấu hình được xác định trực tiếp, các ứng dụng khách có thể tránh được sự phức tạp của việc trao đổi thông tin này thông qua Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Để tìm hiểu thêm về cách Pectra ảnh hưởng cụ thể đến bạn với tư cách là người dùng, nhà phát triển hoặc trình xác thực Ethereum, hãy xem <a href="https://epf.wiki/#/wiki/pectra-faq">Câu hỏi thường gặp về Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Bản nâng cấp này có ảnh hưởng đến tất cả các nút và trình xác thực Ethereum không? {#client-impact}

Có, bản nâng cấp Pectra yêu cầu cập nhật cho cả [ứng dụng khách thực thi và ứng dụng khách đồng thuận](/developers/docs/nodes-and-clients/). Tất cả các ứng dụng khách Ethereum chính sẽ phát hành các phiên bản hỗ trợ phân nhánh cứng được đánh dấu là ưu tiên cao. Để duy trì đồng bộ hóa với mạng lưới Ethereum sau khi nâng cấp, các nhà điều hành nút phải đảm bảo họ đang chạy một phiên bản ứng dụng khách được hỗ trợ. Lưu ý rằng thông tin về các bản phát hành ứng dụng khách có tính nhạy cảm về thời gian và người dùng nên tham khảo các bản cập nhật mới nhất để biết các chi tiết hiện tại nhất.

## Làm thế nào để chuyển đổi ETH sau phân nhánh cứng? {#scam-alert}

- **Không cần thực hiện hành động nào đối với ETH của bạn**: Sau bản nâng cấp Pectra của Ethereum, không cần phải chuyển đổi hoặc nâng cấp ETH của bạn. Số dư tài khoản của bạn sẽ giữ nguyên và ETH bạn hiện đang nắm giữ sẽ vẫn có thể truy cập được ở dạng hiện tại sau phân nhánh cứng.
- **Cảnh giác với các trò lừa đảo!** <Emoji text="⚠️" /> **bất kỳ ai hướng dẫn bạn "nâng cấp" ETH của mình đều đang cố gắng lừa đảo bạn.** Bạn không cần phải làm gì liên quan đến bản nâng cấp này. Tài sản của bạn sẽ hoàn toàn không bị ảnh hưởng. Hãy nhớ rằng, việc luôn cập nhật thông tin là cách phòng vệ tốt nhất chống lại các trò lừa đảo.

[Tìm hiểu thêm về cách nhận biết và tránh các trò lừa đảo](/security/)

## Bạn thích học qua hình ảnh hơn? {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_Những gì sẽ có trong Bản nâng cấp Pectra? - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_Bản nâng cấp Pectra của Ethereum: Những điều người đặt cọc cần biết — Blockdaemon_

## Đọc thêm {#further-reading}

- [Lộ trình Ethereum](/roadmap/)
- [Câu hỏi thường gặp về Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Trang thông tin Pectra.wtf](https://pectra.wtf)
- [Cách Pectra nâng cao trải nghiệm của người đặt cọc](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Trang thông tin EIP-7702](https://eip7702.io/)
- [Các devnet của Pectra](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)