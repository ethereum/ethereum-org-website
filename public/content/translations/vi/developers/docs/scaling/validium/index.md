---
title: Validium
description: Giới thiệu về một giải pháp mở rộng, Validium hiện đang được cộng đồng Ethereum sử dụng.
lang: vi
sidebarDepth: 3
---

Validium là một [giải pháp mở rộng quy mô](/developers/docs/scaling/) thực thi tính toàn vẹn của các giao dịch bằng các bằng chứng hợp lệ như [ZK-rollup](/developers/docs/scaling/zk-rollups/), nhưng không lưu trữ dữ liệu giao dịch trên Mạng chính Ethereum. Mặc dù tính khả dụng của dữ liệu ngoài chuỗi mang lại những sự đánh đổi, nhưng nó có thể dẫn đến những cải tiến lớn về khả năng mở rộng (validium có thể xử lý [khoảng 9.000 giao dịch trở lên mỗi giây](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Điều kiện tiên quyết {#prerequisites}

Bạn nên đọc và hiểu trang của chúng tôi về [mở rộng quy mô Ethereum](/developers/docs/scaling/) và [lớp 2](/layer-2).

## Validium là gì? {#what-is-validium}

Validium là các giải pháp mở rộng quy mô sử dụng tính khả dụng và tính toán dữ liệu ngoài chuỗi, được thiết kế để cải thiện thông lượng bằng cách xử lý các giao dịch bên ngoài Mạng chính Ethereum. Giống như các ZK-rollup, validium xuất bản [bằng chứng không kiến thức](/glossary/#zk-proof) để xác minh các giao dịch ngoài chuỗi trên Ethereum. Điều này ngăn chặn các chuyển đổi trạng thái không hợp lệ và tăng cường đảm bảo an ninh cho chuỗi validium.

Các "bằng chứng hợp lệ" này có thể ở dạng ZK-SNARK (Đối số Kiến thức Không Tương tác Ngắn gọn Không Kiến thức) hoặc ZK-STARK (Đối số Kiến thức Minh bạch Có thể Mở rộng Không Kiến thức). Thông tin thêm về [bằng chứng không kiến thức](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Các khoản tiền thuộc về người dùng validium được kiểm soát bởi một hợp đồng thông minh trên Ethereum. Validium cung cấp khả năng rút tiền gần như tức thì, giống như các ZK-rollup; một khi bằng chứng hợp lệ cho yêu cầu rút tiền đã được xác minh trên Mạng chính, người dùng có thể rút tiền bằng cách cung cấp [bằng chứng Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). Bằng chứng Merkle xác thực việc giao dịch rút tiền của người dùng được bao gồm trong một lô giao dịch đã được xác minh, cho phép hợp đồng trên chuỗi xử lý việc rút tiền.

Tuy nhiên, người dùng validium có thể bị đóng băng tiền và bị hạn chế rút tiền. Điều này có thể xảy ra nếu những người quản lý tính khả dụng của dữ liệu trên chuỗi validium giữ lại dữ liệu trạng thái ngoài chuỗi từ người dùng. Nếu không có quyền truy cập vào dữ liệu giao dịch, người dùng không thể tính toán bằng chứng Merkle cần thiết để chứng minh quyền sở hữu tiền và thực hiện rút tiền.

Đây là điểm khác biệt chính giữa validium và ZK-rollup—vị trí của chúng trên phổ tính khả dụng của dữ liệu. Cả hai giải pháp đều tiếp cận việc lưu trữ dữ liệu theo cách khác nhau, điều này có ý nghĩa đối với tính bảo mật và tính phi tín nhiệm.

## Validium tương tác với Ethereum như thế nào? {#how-do-validiums-interact-with-ethereum}

Validium là các giao thức mở rộng quy mô được xây dựng trên chuỗi Ethereum hiện có. Mặc dù nó thực hiện các giao dịch ngoài chuỗi, một chuỗi validium được quản lý bởi một tập hợp các hợp đồng thông minh được triển khai trên Mạng chính, bao gồm:

1. **Hợp đồng xác minh**: Hợp đồng xác minh kiểm tra tính hợp lệ của các bằng chứng do nhà điều hành validium gửi khi thực hiện cập nhật trạng thái. Điều này bao gồm các bằng chứng hợp lệ chứng thực tính chính xác của các giao dịch ngoài chuỗi và bằng chứng về tính khả dụng của dữ liệu để xác minh sự tồn tại của dữ liệu giao dịch ngoài chuỗi.

2. **Hợp đồng chính**: Hợp đồng chính lưu trữ các cam kết trạng thái (gốc Merkle) do các nhà sản xuất khối gửi và cập nhật trạng thái của validium sau khi một bằng chứng hợp lệ được xác minh trên chuỗi. Hợp đồng này cũng xử lý các khoản tiền gửi vào và rút ra từ chuỗi validium.

Validium cũng dựa vào chuỗi Ethereum chính cho những điều sau:

### Thanh toán {#settlement}

Các giao dịch được thực hiện trên validium không thể được xác nhận hoàn toàn cho đến khi chuỗi mẹ xác minh tính hợp lệ của chúng. Tất cả các hoạt động được tiến hành trên validium cuối cùng phải được thanh toán trên Mạng chính. Chuỗi khối Ethereum cũng cung cấp "đảm bảo thanh toán" cho người dùng validium, có nghĩa là các giao dịch ngoài chuỗi không thể bị đảo ngược hoặc thay đổi sau khi đã được cam kết trên chuỗi.

### Bảo mật {#security}

Ethereum, hoạt động như một lớp thanh toán, cũng đảm bảo tính hợp lệ của các chuyển đổi trạng thái trên validium. Các giao dịch ngoài chuỗi được thực hiện trên chuỗi validium được xác minh thông qua một hợp đồng thông minh trên lớp Ethereum cơ sở.

Nếu hợp đồng xác minh trên chuỗi cho rằng bằng chứng không hợp lệ, các giao dịch sẽ bị từ chối. Điều này có nghĩa là các nhà điều hành phải đáp ứng các điều kiện hợp lệ do giao thức Ethereum thực thi trước khi cập nhật trạng thái của validium.

## Validium hoạt động như thế nào? {#how-does-validium-work}

### Các giao dịch {#transactions}

Người dùng gửi giao dịch cho nhà điều hành, một nút chịu trách nhiệm thực hiện các giao dịch trên chuỗi validium. Một số validium có thể sử dụng một nhà điều hành duy nhất để thực thi chuỗi hoặc dựa vào cơ chế [bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/) để luân chuyển các nhà điều hành.

Nhà điều hành tổng hợp các giao dịch thành một lô và gửi đến một mạch chứng minh để tạo bằng chứng. Mạch chứng minh chấp nhận lô giao dịch (và các dữ liệu liên quan khác) làm đầu vào và tạo ra một bằng chứng hợp lệ xác minh rằng các hoạt động đã được thực hiện một cách chính xác.

### Cam kết trạng thái {#state-commitments}

Trạng thái của validium được băm thành một cây Merkle với gốc được lưu trữ trong hợp đồng chính trên Ethereum. Gốc Merkle, còn được gọi là gốc trạng thái, hoạt động như một cam kết mã hóa đối với trạng thái hiện tại của các tài khoản và số dư trên validium.

Để thực hiện cập nhật trạng thái, nhà điều hành phải tính toán một gốc trạng thái mới (sau khi thực hiện các giao dịch) và gửi nó đến hợp đồng trên chuỗi. Nếu bằng chứng hợp lệ, trạng thái được đề xuất sẽ được chấp nhận và validium chuyển sang gốc trạng thái mới.

### Gửi và rút tiền {#deposits-and-withdrawals}

Người dùng chuyển tiền từ Ethereum sang validium bằng cách gửi ETH (hoặc bất kỳ token nào tương thích với ERC) vào hợp đồng trên chuỗi. Hợp đồng chuyển tiếp sự kiện gửi tiền đến validium ngoài chuỗi, nơi địa chỉ của người dùng được ghi có một số tiền bằng với số tiền gửi của họ. Nhà điều hành cũng bao gồm giao dịch gửi tiền này trong một lô mới.

Để chuyển tiền trở lại Mạng chính, người dùng validium bắt đầu một giao dịch rút tiền và gửi nó cho nhà điều hành, người xác thực yêu cầu rút tiền và đưa nó vào một lô. Tài sản của người dùng trên chuỗi validium cũng bị hủy trước khi họ có thể thoát khỏi hệ thống. Khi bằng chứng hợp lệ liên quan đến lô được xác minh, người dùng có thể gọi hợp đồng chính để rút phần còn lại của khoản tiền gửi ban đầu của họ.

Như một cơ chế chống kiểm duyệt, giao thức validium cho phép người dùng rút tiền trực tiếp từ hợp đồng validium mà không cần thông qua nhà điều hành. Trong trường hợp này, người dùng cần cung cấp bằng chứng Merkle cho hợp đồng xác minh để chứng minh một tài khoản được bao gồm trong gốc trạng thái. Nếu bằng chứng được chấp nhận, người dùng có thể gọi hàm rút tiền của hợp đồng chính để rút tiền của họ ra khỏi validium.

### Gửi lô {#batch-submission}

Sau khi thực hiện một lô giao dịch, nhà điều hành gửi bằng chứng hợp lệ liên quan đến hợp đồng xác minh và đề xuất một gốc trạng thái mới cho hợp đồng chính. Nếu bằng chứng hợp lệ, hợp đồng chính sẽ cập nhật trạng thái của validium và hoàn tất kết quả của các giao dịch trong lô.

Không giống như ZK-rollup, các nhà sản xuất khối trên validium không bắt buộc phải xuất bản dữ liệu giao dịch cho các lô giao dịch (chỉ có tiêu đề khối). Điều này làm cho validium trở thành một giao thức mở rộng quy mô hoàn toàn ngoài chuỗi, trái ngược với các giao thức mở rộng quy mô "lai" (tức là [lớp 2](/layer-2/)) xuất bản dữ liệu trạng thái trên chuỗi Ethereum chính bằng cách sử dụng dữ liệu blob, `calldata` hoặc kết hợp cả hai.

### Tính khả dụng của dữ liệu {#data-availability}

Như đã đề cập, validium sử dụng mô hình tính khả dụng của dữ liệu ngoài chuỗi, trong đó các nhà điều hành lưu trữ tất cả dữ liệu giao dịch bên ngoài Mạng chính Ethereum. Dấu chân dữ liệu trên chuỗi thấp của Validium giúp cải thiện khả năng mở rộng (thông lượng không bị giới hạn bởi khả năng xử lý dữ liệu của Ethereum) và giảm phí người dùng (chi phí xuất bản dữ liệu trên chuỗi thấp hơn).

Tuy nhiên, tính khả dụng của dữ liệu ngoài chuỗi lại đặt ra một vấn đề: dữ liệu cần thiết để tạo hoặc xác minh bằng chứng Merkle có thể không khả dụng. Điều này có nghĩa là người dùng có thể không thể rút tiền từ hợp đồng trên chuỗi nếu các nhà điều hành có hành vi độc hại.

Nhiều giải pháp validium khác nhau cố gắng giải quyết vấn đề này bằng cách phi tập trung hóa việc lưu trữ dữ liệu trạng thái. Điều này liên quan đến việc buộc các nhà sản xuất khối phải gửi dữ liệu cơ bản cho "những người quản lý tính khả dụng của dữ liệu", những người chịu trách nhiệm lưu trữ dữ liệu ngoài chuỗi và cung cấp dữ liệu đó cho người dùng khi có yêu cầu.

Những người quản lý tính khả dụng của dữ liệu trong validium chứng thực tính khả dụng của dữ liệu cho các giao dịch ngoài chuỗi bằng cách ký vào mỗi lô validium. Những chữ ký này tạo thành một dạng "bằng chứng về tính khả dụng" mà hợp đồng xác minh trên chuỗi sẽ kiểm tra trước khi phê duyệt các bản cập nhật trạng thái.

Các validium khác nhau trong cách tiếp cận quản lý tính khả dụng của dữ liệu. Một số dựa vào các bên đáng tin cậy để lưu trữ dữ liệu trạng thái, trong khi những người khác sử dụng các trình xác thực được chỉ định ngẫu nhiên cho nhiệm vụ này.

#### Ủy ban khả dụng dữ liệu (DAC) {#data-availability-committee}

Để đảm bảo tính khả dụng của dữ liệu ngoài chuỗi, một số giải pháp validium chỉ định một nhóm các thực thể đáng tin cậy, được gọi chung là ủy ban khả dụng dữ liệu (DAC), để lưu trữ các bản sao của trạng thái và cung cấp bằng chứng về tính khả dụng của dữ liệu. DAC dễ triển khai hơn và đòi hỏi ít sự phối hợp hơn vì số lượng thành viên thấp.

Tuy nhiên, người dùng phải tin tưởng DAC sẽ cung cấp dữ liệu khi cần thiết (ví dụ: để tạo bằng chứng Merkle). Có khả năng các thành viên của ủy ban khả dụng dữ liệu [bị một tác nhân độc hại xâm phạm](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), sau đó có thể giữ lại dữ liệu ngoài chuỗi.

[Thông tin thêm về các ủy ban khả dụng dữ liệu trong validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Tính khả dụng của dữ liệu được bảo đảm {#bonded-data-availability}

Các validium khác yêu cầu những người tham gia chịu trách nhiệm lưu trữ dữ liệu ngoại tuyến phải đặt cược (tức là khóa) token trong một hợp đồng thông minh trước khi đảm nhận vai trò của họ. Khoản cược này đóng vai trò như một “bảo đảm” để đảm bảo hành vi trung thực của những người quản lý tính khả dụng của dữ liệu và giảm bớt các giả định về sự tin cậy. Nếu những người tham gia này không chứng minh được tính khả dụng của dữ liệu, khoản bảo đảm sẽ bị cắt giảm.

Trong một kế hoạch tính khả dụng của dữ liệu được bảo đảm, bất kỳ ai cũng có thể được chỉ định để giữ dữ liệu ngoài chuỗi một khi họ cung cấp khoản cược cần thiết. Điều này mở rộng nhóm những người quản lý tính khả dụng của dữ liệu đủ điều kiện, giảm sự tập trung hóa ảnh hưởng đến các ủy ban khả dụng dữ liệu (DAC). Quan trọng hơn, cách tiếp cận này dựa vào các ưu đãi kinh tế tiền mã hóa để ngăn chặn hoạt động độc hại, điều này an toàn hơn đáng kể so với việc chỉ định các bên đáng tin cậy để bảo mật dữ liệu ngoại tuyến trong validium.

[Thông tin thêm về tính khả dụng của dữ liệu được bảo đảm trong validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volition và validium {#volitions-and-validium}

Validium mang lại nhiều lợi ích nhưng đi kèm với sự đánh đổi (đáng chú ý nhất là tính khả dụng của dữ liệu). Nhưng, cũng như nhiều giải pháp mở rộng quy mô khác, validium phù hợp với các trường hợp sử dụng cụ thể—đó là lý do tại sao volition được tạo ra.

Volition kết hợp một ZK-rollup và chuỗi validium và cho phép người dùng chuyển đổi giữa hai giải pháp mở rộng quy mô. Với volition, người dùng có thể tận dụng tính khả dụng của dữ liệu ngoài chuỗi của validium cho các giao dịch nhất định, đồng thời vẫn giữ được quyền tự do chuyển sang giải pháp khả dụng dữ liệu trên chuỗi (ZK-rollup) nếu cần. Điều này về cơ bản mang lại cho người dùng quyền tự do lựa chọn sự đánh đổi theo hoàn cảnh riêng của họ.

Một sàn giao dịch phi tập trung (DEX) có thể thích sử dụng cơ sở hạ tầng có thể mở rộng và riêng tư của validium cho các giao dịch có giá trị cao. Nó cũng có thể sử dụng ZK-rollup cho những người dùng muốn đảm bảo an ninh cao hơn và tính phi tín nhiệm của ZK-rollup.

## Validium và khả năng tương thích với EVM {#validiums-and-evm-compatibility}

Giống như ZK-rollup, validium chủ yếu phù hợp với các ứng dụng đơn giản, chẳng hạn như hoán đổi token và thanh toán. Việc hỗ trợ tính toán chung và thực thi hợp đồng thông minh giữa các validium rất khó thực hiện, do chi phí đáng kể để chứng minh các chỉ dẫn của [EVM](/developers/docs/evm/) trong một mạch bằng chứng không kiến thức.

Một số dự án validium cố gắng giải quyết vấn đề này bằng cách biên dịch các ngôn ngữ tương thích với EVM (ví dụ: Solidity, Vyper) để tạo bytecode tùy chỉnh được tối ưu hóa cho việc chứng minh hiệu quả. Một nhược điểm của phương pháp này là các máy ảo thân thiện với bằng chứng không kiến thức mới có thể không hỗ trợ các mã vận hành EVM quan trọng và các nhà phát triển phải viết trực tiếp bằng ngôn ngữ cấp cao để có trải nghiệm tối ưu. Điều này tạo ra nhiều vấn đề hơn nữa: nó buộc các nhà phát triển phải xây dựng các ứng dụng phi tập trung với một bộ công cụ phát triển hoàn toàn mới và phá vỡ khả năng tương thích với cơ sở hạ tầng Ethereum hiện tại.

Tuy nhiên, một số nhóm đang cố gắng tối ưu hóa các mã vận hành EVM hiện có cho các mạch chứng minh ZK. Điều này sẽ dẫn đến sự phát triển của một Máy ảo Ethereum không kiến thức (zkEVM), một máy ảo tương thích với EVM tạo ra các bằng chứng để xác minh tính đúng đắn của việc thực thi chương trình. Với zkEVM, các chuỗi validium có thể thực thi các hợp đồng thông minh ngoài chuỗi và gửi bằng chứng hợp lệ để xác minh một phép tính ngoài chuỗi (mà không cần phải thực thi lại) trên Ethereum.

[Thông tin thêm về zkEVM](https://www.alchemy.com/overviews/zkevm).

## Validium mở rộng quy mô Ethereum như thế nào? {#scaling-ethereum-with-validiums}

### 1. Lưu trữ dữ liệu ngoài chuỗi {#offchain-data-storage}

Các dự án mở rộng quy mô Lớp 2, chẳng hạn như gộp giao dịch lạc quan và ZK-rollup, đánh đổi khả năng mở rộng vô hạn của các giao thức mở rộng quy mô ngoài chuỗi thuần túy (ví dụ: [Plasma](/developers/docs/scaling/plasma/)) để lấy tính bảo mật bằng cách xuất bản một số dữ liệu giao dịch trên L1. Nhưng điều này có nghĩa là các thuộc tính khả năng mở rộng của các bản gộp bị giới hạn bởi băng thông dữ liệu trên Mạng chính Ethereum ([phân mảnh dữ liệu](/roadmap/danksharding/) đề xuất cải thiện dung lượng lưu trữ dữ liệu của Ethereum vì lý do này).

Validium đạt được khả năng mở rộng bằng cách giữ tất cả dữ liệu giao dịch ngoài chuỗi và chỉ đăng các cam kết trạng thái (và bằng chứng hợp lệ) khi chuyển tiếp các cập nhật trạng thái đến chuỗi Ethereum chính. Tuy nhiên, sự tồn tại của các bằng chứng hợp lệ mang lại cho validium sự đảm bảo an ninh cao hơn so với các giải pháp mở rộng quy mô ngoài chuỗi thuần túy khác, bao gồm Plasma và [chuỗi bên](/developers/docs/scaling/sidechains/). Bằng cách giảm lượng dữ liệu mà Ethereum phải xử lý trước khi xác thực các giao dịch ngoài chuỗi, các thiết kế validium giúp mở rộng đáng kể thông lượng trên Mạng chính.

### 2. Bằng chứng đệ quy {#recursive-proofs}

Bằng chứng đệ quy là một bằng chứng hợp lệ xác minh tính hợp lệ của các bằng chứng khác. Những "bằng chứng của các bằng chứng" này được tạo ra bằng cách tổng hợp đệ quy nhiều bằng chứng cho đến khi một bằng chứng cuối cùng xác minh tất cả các bằng chứng trước đó được tạo ra. Bằng chứng đệ quy giúp mở rộng quy mô tốc độ xử lý của chuỗi khối bằng cách tăng số lượng giao dịch có thể được xác minh trên mỗi bằng chứng hợp lệ.

Thông thường, mỗi bằng chứng hợp lệ mà nhà điều hành validium gửi cho Ethereum để xác minh sẽ xác thực tính toàn vẹn của một khối duy nhất. Trong khi đó, một bằng chứng đệ quy duy nhất có thể được sử dụng để xác nhận tính hợp lệ của một số khối validium cùng một lúc—điều này có thể thực hiện được vì mạch chứng minh có thể tổng hợp đệ quy một số bằng chứng khối thành một bằng chứng cuối cùng. Nếu hợp đồng xác minh trên chuỗi chấp nhận bằng chứng đệ quy, tất cả các khối cơ bản sẽ được hoàn tất ngay lập tức.

## Ưu và nhược điểm của validium {#pros-and-cons-of-validium}

| Ưu điểm                                                                                                                                                            | Nhược điểm                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bằng chứng hợp lệ thực thi tính toàn vẹn của các giao dịch ngoài chuỗi và ngăn các nhà điều hành hoàn tất các cập nhật trạng thái không hợp lệ.    | Việc tạo ra các bằng chứng hợp lệ đòi hỏi phần cứng đặc biệt, điều này gây ra rủi ro tập trung hóa.                                                                      |
| Tăng hiệu quả sử dụng vốn cho người dùng (không có sự chậm trễ trong việc rút tiền trở lại Ethereum)                                            | Hỗ trợ hạn chế cho tính toán chung/hợp đồng thông minh; yêu cầu các ngôn ngữ chuyên biệt để phát triển.                                                                  |
| Không dễ bị tấn công bởi một số cuộc tấn công kinh tế mà các hệ thống dựa trên bằng chứng gian lận phải đối mặt trong các ứng dụng có giá trị cao. | Yêu cầu sức mạnh tính toán cao để tạo ra các bằng chứng ZK; không hiệu quả về chi phí cho các ứng dụng có thông lượng thấp.                                              |
| Giảm phí gas cho người dùng bằng cách không đăng calldata lên Mạng chính Ethereum.                                                                 | Thời gian hoàn tất chủ quan chậm hơn (10-30 phút để tạo bằng chứng ZK) nhưng nhanh hơn để hoàn tất hoàn toàn vì không có độ trễ thời gian tranh chấp. |
| Phù hợp với các trường hợp sử dụng cụ thể, như giao dịch hoặc chơi game trên chuỗi khối ưu tiên quyền riêng tư và khả năng mở rộng của giao dịch.  | Người dùng có thể bị ngăn không cho rút tiền vì việc tạo bằng chứng Merkle về quyền sở hữu đòi hỏi dữ liệu ngoài chuỗi phải luôn khả dụng.                               |
| Tính khả dụng của dữ liệu ngoài chuỗi cung cấp mức thông lượng cao hơn và tăng khả năng mở rộng.                                                   | Mô hình bảo mật dựa trên các giả định tin cậy và các ưu đãi kinh tế tiền mã hóa, không giống như ZK-rollup, vốn hoàn toàn dựa vào các cơ chế bảo mật mã hóa.             |

### Sử dụng Validium/Volition {#use-validium-and-volitions}

Nhiều dự án cung cấp các triển khai của Validium và volition mà bạn có thể tích hợp vào các ứng dụng phi tập trung của mình:

**StarkWare StarkEx** - _StarkEx là một giải pháp mở rộng quy mô Lớp 2 (L2) của Ethereum dựa trên các bằng chứng hợp lệ. Nó có thể hoạt động ở các chế độ khả dụng dữ liệu ZK-Rollup hoặc Validium._

- [Tài liệu](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Trang web](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter là một giao thức mở rộng quy mô Lớp 2 giải quyết vấn đề tính khả dụng của dữ liệu bằng một phương pháp lai kết hợp các ý tưởng của zkRollup và phân mảnh. Nó có thể hỗ trợ một số lượng phân mảnh tùy ý, mỗi phân mảnh có chính sách khả dụng dữ liệu riêng._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Tài liệu](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Trang web](https://zksync.io/)

## Đọc thêm {#further-reading}

- [Validium và Ma trận 2x2 của Lớp 2 — Số 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollup và Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition và Phổ Khả dụng Dữ liệu Mới nổi](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollup, Validium và Volition: Tìm hiểu về các Giải pháp Mở rộng quy mô Ethereum Hot nhất](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
- [Hướng dẫn thực tế về Rollup của Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
