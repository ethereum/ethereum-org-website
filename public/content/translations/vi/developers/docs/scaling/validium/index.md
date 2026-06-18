---
title: Validium
description: Giới thiệu về Validium như một giải pháp mở rộng quy mô hiện đang được cộng đồng Ethereum sử dụng.
lang: vi
sidebarDepth: 3
---

Validium là một [giải pháp mở rộng quy mô](/developers/docs/scaling/) thực thi tính toàn vẹn của các giao dịch bằng cách sử dụng bằng chứng tính hợp lệ giống như [ZK-rollups](/developers/docs/scaling/zk-rollups/), nhưng không lưu trữ dữ liệu giao dịch trên Mạng chính [Ethereum](/). Mặc dù tính khả dụng của dữ liệu ngoài chuỗi mang lại một số đánh đổi, nó có thể dẫn đến những cải thiện lớn về khả năng mở rộng (các Validium có thể xử lý [~9.000 giao dịch, hoặc nhiều hơn, mỗi giây](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Điều kiện tiên quyết {#prerequisites}

Bạn nên đọc và hiểu trang của chúng tôi về [mở rộng quy mô Ethereum](/developers/docs/scaling/) và [lớp 2 (l2)](/layer-2).

## Validium là gì? {#what-is-validium}

Các Validium là những giải pháp mở rộng quy mô sử dụng tính khả dụng của dữ liệu và tính toán ngoài chuỗi được thiết kế để cải thiện thông lượng bằng cách xử lý các giao dịch bên ngoài Mạng chính Ethereum. Giống như các bản cuộn không kiến thức (ZK-rollups), các Validium công bố [bằng chứng không kiến thức](/glossary/#zk-proof) để xác minh các giao dịch ngoài chuỗi trên Ethereum. Điều này ngăn chặn các chuyển đổi trạng thái không hợp lệ và tăng cường các đảm bảo bảo mật của một Chuỗi Validium.

Những "bằng chứng tính hợp lệ" này có thể ở dạng ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) hoặc ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Tìm hiểu thêm về [bằng chứng không kiến thức](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Tiền thuộc về người dùng Validium được kiểm soát bởi một hợp đồng thông minh trên Ethereum. Các Validium cung cấp khả năng rút tiền gần như ngay lập tức, rất giống với ZK-rollups; một khi bằng chứng tính hợp lệ cho một yêu cầu rút tiền đã được xác minh trên Mạng chính, người dùng có thể rút tiền bằng cách cung cấp [bằng chứng Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Bằng chứng Merkle xác thực việc đưa giao dịch rút tiền của người dùng vào một lô giao dịch đã được xác minh, cho phép hợp đồng trên chuỗi xử lý việc rút tiền.

Tuy nhiên, người dùng Validium có thể bị đóng băng tiền và hạn chế rút tiền. Điều này có thể xảy ra nếu các nhà quản lý tính khả dụng của dữ liệu trên Chuỗi Validium giữ lại dữ liệu trạng thái ngoài chuỗi của người dùng. Nếu không có quyền truy cập vào dữ liệu giao dịch, người dùng không thể tính toán bằng chứng Merkle được yêu cầu để chứng minh quyền sở hữu tiền và thực hiện rút tiền.

Đây là sự khác biệt chính giữa các Validium và ZK-rollups—vị trí của chúng trên phổ tính khả dụng của dữ liệu. Cả hai giải pháp tiếp cận việc lưu trữ dữ liệu theo những cách khác nhau, điều này có ý nghĩa đối với bảo mật và tính không cần niềm tin.

## Các Validium tương tác với Ethereum như thế nào? {#how-do-validiums-interact-with-ethereum}

Các Validium là các Giao thức mở rộng quy mô được xây dựng trên Chuỗi Ethereum hiện có. Mặc dù nó thực thi các giao dịch ngoài chuỗi, một Chuỗi Validium được quản lý bởi một tập hợp các hợp đồng thông minh được triển khai trên Mạng chính bao gồm:

1. **Hợp đồng trình xác minh**: Hợp đồng trình xác minh xác minh tính hợp lệ của các bằng chứng do nhà điều hành Validium gửi khi thực hiện cập nhật trạng thái. Điều này bao gồm các bằng chứng tính hợp lệ chứng thực tính chính xác của các giao dịch ngoài chuỗi và các bằng chứng tính khả dụng của dữ liệu xác minh sự tồn tại của dữ liệu giao dịch ngoài chuỗi.

2. **Hợp đồng chính**: Hợp đồng chính lưu trữ các cam kết trạng thái (gốc Merkle) do các nhà sản xuất khối gửi và cập nhật trạng thái của Validium một khi bằng chứng tính hợp lệ được xác minh trên chuỗi. Hợp đồng này cũng xử lý các khoản tiền gửi vào và rút tiền từ Chuỗi Validium.

Các Validium cũng dựa vào Chuỗi Ethereum chính cho những điều sau:

### Quyết toán {#settlement}

Các giao dịch được thực thi trên một Validium không thể được xác nhận hoàn toàn cho đến khi Chuỗi mẹ xác minh tính hợp lệ của chúng. Mọi hoạt động kinh doanh được tiến hành trên một Validium cuối cùng phải được quyết toán trên Mạng chính. Chuỗi khối Ethereum cũng cung cấp "đảm bảo quyết toán" cho người dùng Validium, nghĩa là các giao dịch ngoài chuỗi không thể bị đảo ngược hoặc thay đổi một khi đã được cam kết trên chuỗi.

### Bảo mật {#security}

Ethereum, đóng vai trò là một lớp quyết toán, cũng đảm bảo tính hợp lệ của các chuyển đổi trạng thái trên Validium. Các giao dịch ngoài chuỗi được thực thi trên Chuỗi Validium được xác minh thông qua một hợp đồng thông minh trên lớp Ethereum cơ sở.

Nếu hợp đồng trình xác minh trên chuỗi coi bằng chứng là không hợp lệ, các giao dịch sẽ bị từ chối. Điều này có nghĩa là các nhà điều hành phải đáp ứng các điều kiện hợp lệ được thực thi bởi Giao thức Ethereum trước khi cập nhật trạng thái của Validium.

## Validium hoạt động như thế nào? {#how-does-validium-work}

### Giao dịch {#transactions}

Người dùng gửi các giao dịch cho nhà điều hành, một nút chịu trách nhiệm thực thi các giao dịch trên Chuỗi Validium. Một số Validium có thể sử dụng một nhà điều hành duy nhất để thực thi Chuỗi hoặc dựa vào cơ chế [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/) để luân phiên các nhà điều hành.

Nhà điều hành tổng hợp các giao dịch thành một lô và gửi nó đến một mạch chứng minh để chứng minh. Mạch chứng minh chấp nhận lô giao dịch (và các dữ liệu liên quan khác) làm đầu vào và xuất ra một bằng chứng tính hợp lệ xác minh rằng các hoạt động đã được thực hiện chính xác.

### Cam kết trạng thái {#state-commitments}

Trạng thái của Validium được băm thành một cây Merkle với gốc được lưu trữ trong hợp đồng chính trên Ethereum. Gốc Merkle, còn được gọi là gốc trạng thái, hoạt động như một cam kết mật mã đối với trạng thái hiện tại của các Tài khoản và số dư trên Validium.

Để thực hiện cập nhật trạng thái, nhà điều hành phải tính toán một gốc trạng thái mới (sau khi thực thi các giao dịch) và gửi nó đến hợp đồng trên chuỗi. Nếu bằng chứng tính hợp lệ được kiểm tra thành công, trạng thái được đề xuất sẽ được chấp nhận và Validium chuyển sang gốc trạng thái mới.

### Gửi tiền và rút tiền {#deposits-and-withdrawals}

Người dùng chuyển tiền từ Ethereum sang một Validium bằng cách gửi ETH (hoặc bất kỳ token tương thích ERC nào) vào hợp đồng trên chuỗi. Hợp đồng chuyển tiếp sự kiện gửi tiền đến Validium ngoài chuỗi, nơi Địa chỉ của người dùng được ghi có một số tiền bằng với khoản tiền gửi của họ. Nhà điều hành cũng đưa giao dịch gửi tiền này vào một lô mới.

Để chuyển tiền trở lại Mạng chính, người dùng Validium khởi tạo một giao dịch rút tiền và gửi nó cho nhà điều hành, người sẽ xác thực yêu cầu rút tiền và đưa nó vào một lô. Tài sản của người dùng trên Chuỗi Validium cũng bị phá hủy trước khi họ có thể thoát khỏi hệ thống. Một khi bằng chứng tính hợp lệ liên kết với lô được xác minh, người dùng có thể gọi hợp đồng chính để rút phần còn lại của khoản tiền gửi ban đầu của họ.

Như một cơ chế chống kiểm duyệt, Giao thức Validium cho phép người dùng rút tiền trực tiếp từ hợp đồng Validium mà không cần thông qua nhà điều hành. Trong trường hợp này, người dùng cần cung cấp một bằng chứng Merkle cho hợp đồng trình xác minh cho thấy sự bao gồm của một Tài khoản trong gốc trạng thái. Nếu bằng chứng được chấp nhận, người dùng có thể gọi hàm rút tiền của hợp đồng chính để thoát tiền của họ khỏi Validium.

### Gửi lô {#batch-submission}

Sau khi thực thi một lô giao dịch, nhà điều hành gửi bằng chứng tính hợp lệ liên quan đến hợp đồng trình xác minh và đề xuất một gốc trạng thái mới cho hợp đồng chính. Nếu bằng chứng hợp lệ, hợp đồng chính sẽ cập nhật trạng thái của Validium và làm cho kết quả của các giao dịch trong lô đã chung cuộc.

Không giống như một ZK-rollup, các nhà sản xuất khối trên một Validium không bị yêu cầu công bố dữ liệu giao dịch cho các lô giao dịch (chỉ các tiêu đề khối). Điều này làm cho Validium trở thành một Giao thức mở rộng quy mô hoàn toàn ngoài chuỗi, trái ngược với các Giao thức mở rộng quy mô "lai" (tức là [lớp 2 (l2)](/layer-2/)) công bố dữ liệu trạng thái trên Chuỗi Ethereum chính bằng cách sử dụng khối dữ liệu, `calldata`, hoặc sự kết hợp của cả hai.

### Tính khả dụng của dữ liệu {#data-availability}

Như đã đề cập, các Validium sử dụng mô hình tính khả dụng của dữ liệu ngoài chuỗi, nơi các nhà điều hành lưu trữ tất cả dữ liệu giao dịch bên ngoài Mạng chính Ethereum. Dấu chân dữ liệu trên chuỗi thấp của Validium cải thiện khả năng mở rộng (thông lượng không bị giới hạn bởi khả năng xử lý dữ liệu của Ethereum) và giảm phí cho người dùng (chi phí công bố dữ liệu trên chuỗi thấp hơn).

Tuy nhiên, tính khả dụng của dữ liệu ngoài chuỗi đặt ra một vấn đề: dữ liệu cần thiết để tạo hoặc xác minh các bằng chứng Merkle có thể không khả dụng. Điều này có nghĩa là người dùng có thể không thể rút tiền từ hợp đồng trên chuỗi nếu các nhà điều hành hành động ác ý.

Nhiều giải pháp Validium khác nhau cố gắng giải quyết vấn đề này bằng cách phi tập trung hóa việc lưu trữ dữ liệu trạng thái. Điều này liên quan đến việc buộc các nhà sản xuất khối gửi dữ liệu cơ bản cho các "nhà quản lý tính khả dụng của dữ liệu" chịu trách nhiệm lưu trữ dữ liệu ngoài chuỗi và cung cấp dữ liệu đó cho người dùng theo yêu cầu.

Các nhà quản lý tính khả dụng của dữ liệu trong Validium chứng thực tính khả dụng của dữ liệu cho các giao dịch ngoài chuỗi bằng việc ký mọi lô Validium. Những chữ ký này tạo thành một dạng "bằng chứng tính khả dụng" mà hợp đồng trình xác minh trên chuỗi kiểm tra trước khi phê duyệt các cập nhật trạng thái.

Các Validium khác nhau trong cách tiếp cận quản lý tính khả dụng của dữ liệu. Một số dựa vào các bên đáng tin cậy để lưu trữ dữ liệu trạng thái, trong khi những Validium khác sử dụng các trình xác thực được chỉ định ngẫu nhiên cho nhiệm vụ này.

#### Ủy ban tính khả dụng của dữ liệu (DAC) {#data-availability-committee}

Để đảm bảo tính khả dụng của dữ liệu ngoài chuỗi, một số giải pháp Validium chỉ định một nhóm các thực thể đáng tin cậy, được gọi chung là ủy ban tính khả dụng của dữ liệu (DAC), để lưu trữ các bản sao của trạng thái và cung cấp bằng chứng về tính khả dụng của dữ liệu. Các DAC dễ triển khai hơn và yêu cầu ít sự phối hợp hơn vì số lượng thành viên thấp.

Tuy nhiên, người dùng phải tin tưởng DAC sẽ cung cấp dữ liệu khi cần thiết (ví dụ: để tạo bằng chứng Merkle). Có khả năng các thành viên của ủy ban tính khả dụng của dữ liệu [bị xâm phạm bởi một tác nhân độc hại](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), kẻ sau đó có thể giữ lại dữ liệu ngoài chuỗi.

[Tìm hiểu thêm về các ủy ban tính khả dụng của dữ liệu trong các Validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Tính khả dụng của dữ liệu có thế chấp {#bonded-data-availability}

Các Validium khác yêu cầu những người tham gia được giao nhiệm vụ lưu trữ dữ liệu ngoại tuyến phải đặt cọc (tức là khóa) token trong một hợp đồng thông minh trước khi đảm nhận vai trò của họ. Khoản đặt cọc này đóng vai trò như một "thế chấp" để đảm bảo hành vi trung thực giữa các nhà quản lý tính khả dụng của dữ liệu và giảm bớt các giả định tin cậy. Nếu những người tham gia này không chứng minh được tính khả dụng của dữ liệu, khoản thế chấp sẽ bị phạt cắt giảm.

Trong một cơ chế tính khả dụng của dữ liệu có thế chấp, bất kỳ ai cũng có thể được chỉ định để giữ dữ liệu ngoài chuỗi một khi họ cung cấp khoản đặt cọc được yêu cầu. Điều này mở rộng nhóm các nhà quản lý tính khả dụng của dữ liệu đủ điều kiện, giảm bớt sự tập trung hóa ảnh hưởng đến các ủy ban tính khả dụng của dữ liệu (DAC). Quan trọng hơn, cách tiếp cận này dựa vào các động lực kinh tế mật mã để ngăn chặn hoạt động độc hại, điều này an toàn hơn đáng kể so với việc chỉ định các bên đáng tin cậy để bảo mật dữ liệu ngoại tuyến trong Validium.

[Tìm hiểu thêm về tính khả dụng của dữ liệu có thế chấp trong các Validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volition và Validium {#volitions-and-validium}

Các Validium mang lại nhiều lợi ích nhưng đi kèm với những đánh đổi (đáng chú ý nhất là tính khả dụng của dữ liệu). Nhưng, giống như nhiều giải pháp mở rộng quy mô khác, các Validium phù hợp với các trường hợp sử dụng cụ thể—đó là lý do tại sao các Volition được tạo ra.

Các Volition kết hợp một ZK-rollup và Chuỗi Validium và cho phép người dùng chuyển đổi giữa hai giải pháp mở rộng quy mô. Với các Volition, người dùng có thể tận dụng tính khả dụng của dữ liệu ngoài chuỗi của Validium cho một số giao dịch nhất định, trong khi vẫn giữ quyền tự do chuyển sang giải pháp tính khả dụng của dữ liệu trên chuỗi (ZK-rollup) nếu cần. Điều này về cơ bản mang lại cho người dùng sự tự do lựa chọn các đánh đổi theo hoàn cảnh riêng của họ.

Một sàn giao dịch phi tập trung (DEX) có thể thích sử dụng cơ sở hạ tầng có thể mở rộng và riêng tư của Validium cho các giao dịch giá trị cao. Nó cũng có thể sử dụng một ZK-rollup cho những người dùng muốn có các đảm bảo bảo mật cao hơn và tính không cần niềm tin của ZK-rollup.

## Các Validium và khả năng tương thích EVM {#validiums-and-evm-compatibility}

Giống như ZK-rollups, các Validium chủ yếu phù hợp với các ứng dụng đơn giản, chẳng hạn như hoán đổi token và thanh toán. Việc hỗ trợ tính toán chung và thực thi hợp đồng thông minh giữa các Validium rất khó triển khai, do chi phí đáng kể của việc chứng minh các lệnh [EVM](/developers/docs/evm/) trong một mạch bằng chứng không kiến thức.

Một số dự án Validium cố gắng né tránh vấn đề này bằng cách biên dịch các ngôn ngữ tương thích EVM (ví dụ: Solidity, Vyper) thành việc tạo mã byte tùy chỉnh được tối ưu hóa để chứng minh hiệu quả. Một nhược điểm của cách tiếp cận này là các máy ảo (VM) thân thiện với bằng chứng không kiến thức mới có thể không hỗ trợ các opcode EVM quan trọng và các nhà phát triển phải viết trực tiếp bằng ngôn ngữ cấp cao để có trải nghiệm tối ưu. Điều này tạo ra nhiều vấn đề hơn: nó buộc các nhà phát triển phải xây dựng các ứng dụng phi tập trung (dapp) với một ngăn xếp phát triển hoàn toàn mới và phá vỡ khả năng tương thích với cơ sở hạ tầng Ethereum hiện tại.

Tuy nhiên, một số nhóm đang cố gắng tối ưu hóa các opcode EVM hiện có cho các mạch chứng minh ZK. Điều này sẽ dẫn đến sự phát triển của một Máy ảo Ethereum không kiến thức (zkEVM), một VM tương thích EVM tạo ra các bằng chứng để xác minh tính chính xác của việc thực thi chương trình. Với một zkEVM, các Chuỗi Validium có thể thực thi các hợp đồng thông minh ngoài chuỗi và gửi các bằng chứng tính hợp lệ để xác minh một tính toán ngoài chuỗi (mà không cần phải thực thi lại nó) trên Ethereum.

[Tìm hiểu thêm về zkEVM](https://www.alchemy.com/overviews/zkevm).

## Các Validium mở rộng quy mô Ethereum như thế nào? {#scaling-ethereum-with-validiums}

### 1. Lưu trữ dữ liệu ngoài chuỗi {#offchain-data-storage}

Các dự án mở rộng quy mô lớp 2 (l2), chẳng hạn như optimistic rollups và ZK-rollups, đánh đổi khả năng mở rộng vô hạn của các Giao thức mở rộng quy mô hoàn toàn ngoài chuỗi (ví dụ: [Plasma](/developers/docs/scaling/plasma/)) để lấy bảo mật bằng cách công bố một số dữ liệu giao dịch trên lớp 1 (l1). Nhưng điều này có nghĩa là các thuộc tính khả năng mở rộng của các bản cuộn bị giới hạn bởi băng thông dữ liệu trên Mạng chính Ethereum ([phân mảnh dữ liệu](/roadmap/danksharding/) đề xuất cải thiện khả năng lưu trữ dữ liệu của Ethereum vì lý do này).

Các Validium đạt được khả năng mở rộng bằng cách giữ tất cả dữ liệu giao dịch ngoài chuỗi và chỉ đăng các cam kết trạng thái (và bằng chứng tính hợp lệ) khi chuyển tiếp các cập nhật trạng thái đến Chuỗi Ethereum chính. Tuy nhiên, sự tồn tại của các bằng chứng tính hợp lệ mang lại cho các Validium những đảm bảo bảo mật cao hơn so với các giải pháp mở rộng quy mô hoàn toàn ngoài chuỗi khác, bao gồm Plasma và [sidechains](/developers/docs/scaling/sidechains/). Bằng cách giảm lượng dữ liệu mà Ethereum phải xử lý trước khi xác thực các giao dịch ngoài chuỗi, các thiết kế Validium mở rộng đáng kể thông lượng trên Mạng chính.

### 2. Bằng chứng đệ quy {#recursive-proofs}

Một bằng chứng đệ quy là một bằng chứng tính hợp lệ xác minh tính hợp lệ của các bằng chứng khác. Những "bằng chứng của các bằng chứng" này được tạo ra bằng cách tổng hợp đệ quy nhiều bằng chứng cho đến khi một bằng chứng cuối cùng xác minh tất cả các bằng chứng trước đó được tạo ra. Các bằng chứng đệ quy mở rộng tốc độ xử lý Chuỗi khối bằng cách tăng số lượng giao dịch có thể được xác minh trên mỗi bằng chứng tính hợp lệ.

Thông thường, mỗi bằng chứng tính hợp lệ mà nhà điều hành Validium gửi cho Ethereum để xác minh sẽ xác thực tính toàn vẹn của một khối duy nhất. Trong khi đó, một bằng chứng đệ quy duy nhất có thể được sử dụng để xác nhận tính hợp lệ của một số khối Validium cùng một lúc—điều này là có thể vì mạch chứng minh có thể tổng hợp đệ quy một số bằng chứng khối thành một bằng chứng cuối cùng. Nếu hợp đồng trình xác minh trên chuỗi chấp nhận bằng chứng đệ quy, tất cả các khối cơ bản sẽ đã chung cuộc ngay lập tức.

## Ưu và nhược điểm của Validium {#pros-and-cons-of-validium}

| Ưu điểm | Nhược điểm |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Các bằng chứng tính hợp lệ thực thi tính toàn vẹn của các giao dịch ngoài chuỗi và ngăn chặn các nhà điều hành làm chung cuộc các cập nhật trạng thái không hợp lệ. | Việc tạo ra các bằng chứng tính hợp lệ yêu cầu phần cứng đặc biệt, điều này gây ra rủi ro tập trung hóa. |
| Tăng hiệu quả sử dụng vốn cho người dùng (không có sự chậm trễ trong việc rút tiền trở lại Ethereum). | Hỗ trợ hạn chế cho tính toán chung/hợp đồng thông minh; yêu cầu các ngôn ngữ chuyên biệt để phát triển. |
| Không dễ bị tổn thương trước một số cuộc tấn công kinh tế mà các hệ thống dựa trên bằng chứng gian lận gặp phải trong các ứng dụng giá trị cao. | Yêu cầu sức mạnh tính toán cao để tạo ra các bằng chứng ZK; không hiệu quả về chi phí cho các ứng dụng có thông lượng thấp. |
| Giảm phí Gas cho người dùng bằng cách không đăng dữ liệu lệnh gọi lên Mạng chính Ethereum. | Thời gian tính chung cuộc chủ quan chậm hơn (10-30 phút để tạo bằng chứng ZK) nhưng nhanh hơn để đạt tính chung cuộc hoàn toàn vì không có độ trễ thời gian tranh chấp. |
| Phù hợp với các trường hợp sử dụng cụ thể, như giao dịch hoặc trò chơi Chuỗi khối ưu tiên quyền riêng tư của giao dịch và khả năng mở rộng. | Người dùng có thể bị ngăn cản rút tiền vì việc tạo bằng chứng Merkle về quyền sở hữu yêu cầu dữ liệu ngoài chuỗi phải luôn khả dụng. |
| Tính khả dụng của dữ liệu ngoài chuỗi cung cấp mức thông lượng cao hơn và tăng khả năng mở rộng. | Mô hình bảo mật dựa vào các giả định tin cậy và các động lực kinh tế mật mã, không giống như ZK-rollups, vốn hoàn toàn dựa vào các cơ chế bảo mật mật mã. |

### Sử dụng Validium/Volition {#use-validium-and-volitions}

Nhiều dự án cung cấp các triển khai của Validium và Volition mà bạn có thể tích hợp vào các dapp của mình:

**StarkWare StarkEx** - _StarkEx là một giải pháp khả năng mở rộng lớp 2 (l2) của Ethereum dựa trên các bằng chứng tính hợp lệ. Nó có thể hoạt động ở cả hai chế độ tính khả dụng của dữ liệu ZK-Rollup hoặc Validium._

- [Tài liệu](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Trang web](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter là một Giao thức mở rộng quy mô lớp 2 (l2) giải quyết tính khả dụng của dữ liệu bằng một cách tiếp cận lai kết hợp các ý tưởng của zkRollup và phân mảnh. Nó có thể hỗ trợ số lượng phân mảnh tùy ý, mỗi phân mảnh có chính sách tính khả dụng của dữ liệu riêng._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Tài liệu](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Trang web](https://zksync.io/)

## Đọc thêm {#further-reading}

- [Validium và Lớp 2 Hai-Nhân-Hai — Số 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups so với Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition và phổ Tính khả dụng của Dữ liệu mới nổi](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Hướng dẫn Thực tế về các Bản cuộn Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)