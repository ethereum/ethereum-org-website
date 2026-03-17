---
title: Optimistic Rollups
description: "Giới thiệu về Optimistic rollups - một giải pháp mở rộng dành cho cộng đồng Ethereum."
lang: vi
---

Optimistic rollups là một giao thức layer 2 (L2) được thiết kế với mục đích mở rộng thông lượng của lớp Ethereum cơ sở. Những rollup này giảm bớt nhu cầu tính toán trên mạng lưới Ethereum bằng việc xử lý các giao dịch offchain, vì thế tăng đáng kể tốc độ xử lý. Không giống như các giải pháp mở rộng quy mô khác, chẳng hạn như [các chuỗi bên](/developers/docs/scaling/sidechains/), các gộp giao dịch lạc quan có được sự bảo mật từ Mạng chính bằng cách công bố kết quả giao dịch trên chuỗi, hoặc [các chuỗi plasma](/developers/docs/scaling/plasma/), vốn cũng xác minh các giao dịch trên Ethereum bằng bằng chứng gian lận nhưng lưu trữ dữ liệu giao dịch ở nơi khác.

Tốc độ xử lý chậm, chi phí cao như là một phần của việc sử dụng Ethereum, optimistic rollups có thể cung cấp các cải tiến về khả năng mở rộng lên 10-100 lần. Các gộp giao dịch lạc quan cũng ghi các giao dịch vào Ethereum dưới dạng `calldata` hoặc trong [các blob](/roadmap/danksharding/), giúp giảm chi phí gas cho người dùng.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên đọc và hiểu các trang của chúng tôi về [mở rộng Ethereum](/developers/docs/scaling/) và [lớp 2](/layer-2/).

## Optimistic rollup là gì? {#what-is-an-optimistic-rollup}

Rollup lạc quan là một phương án để mở rộng mạng lưới Ethereum bằng cách dịch chuyển xử lý tính toán và lưu trữ dữ liệu ra offchain. Các gộp giao dịch lạc quan thực thi các giao dịch bên ngoài Ethereum, nhưng đăng dữ liệu giao dịch lên Mạng chính dưới dạng `calldata` hoặc trong [các blob](/roadmap/danksharding/).

Các đơn vị vận hành Rollup Lạc Quan sẽ gộp nhiều giao dịch lại với nhau offchain thành nhiều lô lớn trước khi gửi tới Ethereum. Các giải quyết này cho phép phân bổ chi phí trên những giao dịch trong một đợt, vô hình chung sẽ giảm chi phí cho người dùng cuối cùng. Nén để giảm lượng dữ liệu được đăng trên Ethereum là cách Optimistic rollups sử dụng.

Rollup Lạc Quan được coi là "lạc quan" vì đều mặc định các giao dịch offchain là hợp lệ và không đăng những bằng chứng hợp lệ cho các lô giao dịch khi gửi lên onchain. Điều này tách biệt các gộp giao dịch lạc quan khỏi [các gộp giao dịch không kiến thức](/developers/docs/scaling/zk-rollups) vốn công bố [bằng chứng hợp lệ](/glossary/#validity-proof) mật mã cho các giao dịch ngoài chuỗi.

Thay vào đó, các Optimistic rollups dựa vào một bằng chứng gian lận để phát hiện các giao dịch không được tính toán chính xác. Sau khi một lô gộp giao dịch được gửi trên Ethereum, sẽ có một khoảng thời gian (được gọi là giai đoạn thử thách) mà trong đó bất kỳ ai cũng có thể thách thức kết quả của một giao dịch gộp bằng cách tính toán [bằng chứng gian lận](/glossary/#fraud-proof).

Nếu bằng chứng gian lận được hoàn thành, giao thức tổng hợp sẽ thực hiện lại (các) giao dịch và cập nhật trạng thái của bản tổng hợp cho phù hợp. Hệ quả khác của việc chứng minh gian lận thành công là trình sắp xếp chịu trách nhiệm bao gồm giao dịch được thực hiện không chính xác trong một khối nhận lỗi.

Nếu các lô tổng hợp vượt qua những thử thách ( nghĩa là tất cả các giao dịch được thực hiện chính xác) sau khi giai đoạn thử thách kết thúc, thì lô đó được coi là hợp lệ và được chấp nhận trên Ethereum. Những người khác có thể tiếp tục phát triển trên một khối rollup chưa được xác nhận, nhưng lưu ý : kết quả giao dịch sẽ bị đảo người nếu dựa trên một giao dịch được thực hiện không chính xác đã được công bố trước đó.

## Các optimistic rollups tương tác với Ethereum như thế nào ? Các gộp giao dịch lạc quan và Ethereum {#optimistic-rollups-and-Ethereum}

Các gộp giao dịch lạc quan là [các giải pháp mở rộng quy mô ngoài chuỗi](/developers/docs/scaling/#offchain-scaling) được xây dựng để hoạt động trên nền tảng Ethereum. Mỗi optimistic rollup được quản lý bởi một tập hợp các hợp đồng thông minh được triển khai trên mạng lưới Ethereum. Những rollup lạc quan xử lý giao dịch ngoài mạng lưới Ethereum chính, nhưng đăng những giao dịch offchain này (theo lô) vào một hợp đồng rollup onchain. Giống như chuỗi khối Ethereum, bản ghi giao dịch này là bất biến vào tạo thành "chuỗi optimistic rollup".

Cấu trúc của một rollup lạc quan bao gồm các phần sau:

**Hợp đồng trên chuỗi**: Hoạt động của gộp giao dịch lạc quan được kiểm soát bởi các hợp đồng thông minh chạy trên Ethereum. Điều này bao gồm các hợp đồng lưu trữ các khối rollup, theo dõi các cập nhật trạng thái trên rollup và tra soát tiền gửi của người dùng. Theo nghĩa này, Ethereum đóng vai trò là lớp cơ sở hay "lớp 1" cho các gộp giao dịch lạc quan.

**Máy ảo (VM) ngoài chuỗi**: Mặc dù các hợp đồng quản lý giao thức gộp giao dịch lạc quan chạy trên Ethereum, giao thức gộp giao dịch thực hiện tính toán và lưu trữ trạng thái trên một máy ảo khác tách biệt với [Máy ảo Ethereum](/developers/docs/evm/). Máy ảo offchain là nơi các ứng dụng tồn tại và trạng thái dữ liệu được thực thi; nó đóng vai trò là tầng lớp ở trên hay còn gọi là "layer 2" cho một rollup lạc quan.

Vì các rollup lạc quan được thiết kế để chạy các chương trình được viết hoặc biên dịch cho EVM, nên máy ảo offchain cũng tích hợp nhiều thông số kỹ thuật EVM. Ngoài ra, các bằng chứng gian lận được tính toán trên chuỗi cho phép mạng Ethereum thực thi tính hợp lệ của các thay đổi trạng thái được tính toán trong VM ngoài chuỗi.

Các optimistic rollup được mô tả là 'các giải pháp mở rộng quy mô kết hợp' bởi vì, mặc dù chúng tồn tại dưới dạng các giao thức riêng biệt, nhưng các đặc tính bảo mật của chúng có nguồn gốc từ Ethereum. Trong một vài thứ khác, Ethereum đảm bảo tính chính xác của việc rollup tính toán offchain và khả năng truy cập dữ liệu đằng sau phép tính. Điều này làm cho các gộp giao dịch lạc quan an toàn hơn so với các giao thức mở rộng quy mô hoàn toàn ngoài chuỗi (ví dụ: [các chuỗi bên](/developers/docs/scaling/sidechains/)) không phụ thuộc vào Ethereum để bảo mật.

Những yếu tố dựa trên giao thức chính của Ethereum mà optimistic rollup áp dụng :

### Tính khả dụng của dữ liệu {#data-availability}

Như đã đề cập, các gộp giao dịch lạc quan đăng dữ liệu giao dịch lên Ethereum dưới dạng `calldata` hoặc [các blob](/roadmap/danksharding/). Vì quá trình thực thi của rollup dựa trên các giao dịch đã gửi nên bất kỳ ai cũng có thể sử dụng thông tin này — được cố định trên lớp cơ sở của Ethereum — để thực hiện trạng thái của rollup và xác minh tính đúng đắn của các chuyển đổi trạng thái.

[Tính khả dụng của dữ liệu](/developers/docs/data-availability/) là rất quan trọng vì nếu không có quyền truy cập vào dữ liệu trạng thái, những người thách thức không thể xây dựng bằng chứng gian lận để tranh chấp các hoạt động gộp giao dịch không hợp lệ. Việc Ethereum cung cấp dữ liệu sẵn có, nguy cơ bị các nhà khai thác rollup xử lý các hành vi độc hại (ví dụ: gửi các khối không hợp lệ) sẽ giảm xuống.

### Chống kiểm duyệt {#censorship-resistance}

Các đợt optimistic rollup cũng dựa vào Ethereum để chống lại sự kiểm duyệt. Trong một optimistic rollup, một thực thể tập trung (người điều hành) chịu trách nhiệm xử lý các giao dịch và gửi các khối tổng hợp cho Ethereum. Điều này có một số ý nghĩa:

- Nhà khai thác rollup có thể kiểm duyệt người dùng bằng cách chuyển sang chế độ ngoại tuyến hoàn toàn hoặc bằng cách từ chối sản xuất các khối bao gồm các giao dịch nhất định trong đó.

- Có thể ngăn chặn người dùng rút tiền được gửi trong hợp đồng rollup bằng cách giữ lại dữ liệu trạng thái cần thiết để Merkle bằng chứng về quyền sở hữu. Dữ liệu trạng thái giữ lại cũng có thể che giấu trạng thái của rollup với người dùng và ngăn họ tương tác với rollup.

Những rollup lạc quan giải quyết vấn đề này bằng cách yêu cầu đơn vị vận hành phải đăng dữ liệu liên quan đến cập nhật trạng thái lên Ethereum. Việc rollup đăng dữ liệu onchain có những ưu điểm sau:

- Nếu đơn vị vận hành rollup lạc quan bị offline hoặc dừng khởi tạo lô dữ liệu giao dịch, một nút mạng lưới khác có thể dùng dữ liệu sẵn có để khôi phục trạng thái rollup cuối cùng và tiếp tục tạo khối.

- Người dùng có thể sử dụng dữ liệu giao dịch để tạo ra bằng chứng Merkle chứng minh việc sở hữu tiền và rút tài sản ra khỏi rollup.

- Người dùng có thể gửi những giao dịch của họ ở L1 thay vì gửi tới sequencer, trong trường hợp này sequencer phải xử lý giao dịch trong một khoảng thời gian nhất định để tiếp tục khởi tạo khối hợp lệ.

### Thanh toán {#settlement}

Một vai trò khác của Ethereum trong ngữ cảnh của các rollup lạc quan là trở thành một tầng lớp chuyên quyết toán. Một tầng lớp chuyên quyết toán là nền tảng neo giữ cho toàn bộ hệ sinh thái blockchain, đảm bảo tính bảo mật và là nguồn kết luận cuối cùng khách quan khi có tranh chấp xảy ra trên các mạng lưới khác (chẳng hạn như rollup lạc quan trong trường hợp này) cần phân xử.

Mainnet của Ethereum là trung tâm hoà giải tranh chấp thông qua việc xác minh bằng chứng gian lận cho các rollup lạc quan. Hơn nữa, các giao dịch được thực hiện trên gộp giao dịch chỉ được coi là cuối cùng _sau khi_ khối gộp giao dịch được chấp nhận trên Ethereum. Một khi giao dịch rollup được ghi vào tầng lớp nền Ethereum, nó sẽ không thể bị đảo ngược (ngoại trừ trường hợp cực kỳ hiếm là chuỗi các khối bị thay đổi tổ chức).

## Các rollup lạc quan hoạt động như thế nào? {#how-optimistic-rollups-work}

### Thực thi và tổng hợp giao dịch {#transaction-execution-and-aggregation}

Người dùng gửi giao dịch của họ tới những "đơn vị vận hành", đây là những nút mạng lưới chịu trách nhiệm xử lý giao dịch trên rollup lạc quan. Hay còn gọi là "đơn vị xác minh" hoặc "đơn vị tổng hợp", đơn vị vận hành sẽ gom các giao dịch, nén dữ liệu ở dưới lại, và đăng khối đó lên Ethereum.

Mặc dù bất kỳ ai cũng có thể trở thành người xác thực, nhưng những người xác thực gộp giao dịch lạc quan phải cung cấp một khoản ký quỹ trước khi tạo khối, giống như một [hệ thống bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/). Khoản ký quỹ này có thể bị phạt cắt giảm nếu đơn vị xác minh đưa lên một khối sai hoặc tiếp tục xây dựng trên một khối cũ nhưng không hợp lệ (dù khối mới của họ là hợp lệ). Nhờ đó, rollup lạc quan tận dụng các động lực kinh tế thông qua mật mã để buộc đơn vị xác minh phải hành xử trung thực.

Những đơn vị xác minh khác trên chuỗi rollup lạc quan sẽ phải thực hiện lại các giao dịch đã nộp bằng chính bản sao trạng thái dữ liệu rollup của họ. Nếu trạng thái dữ liệu cuối cùng của đơn vị xác minh không trùng với trạng thái mà đơn vị vận hành đề xuất, họ có thể khởi động quy trình khiếu nại và tính toán bằng chứng gian lận.

Một số rollup lạc quan không dùng hệ thống đơn vị xác minh mở, mà chỉ có một "sequencer" duy nhất để vận hành mạng mưới. Tương tự như đơn vị xác minh, sequencer xử lý giao dịch, tạo khối rollup và đẩy lô giao dịch rollup lên mạng lưới L1 (Ethereum).

Sequencer khác với đơn vị vận hành thông thường của rollup ở chỗ họ có khả năng kiểm soát thứ tự giao dịch nhiều hơn. Hơn nữa, sequencer được ưu tiên truy cập mạng lưới rollup và là đơn vị duy nhất có quyền gửi giao dịch đến hợp đồng trên mạng lưới. Những giao dịch từ các nút mạng lưới mà không phải sequencer hoặc từ người dùng sẽ được đưa vào hàng chờ riêng, đợi đến khi sequencer gom chúng vào một lô mới.

#### Gửi các khối gộp giao dịch lên Ethereum {#submitting-blocks-to-ethereum}

Như đã nói ở trên, đơn vị vận hành của rollup lạc quan gom các giao dịch offchain thành một lô và chuyển lên Ethereum để chứng thực. Quá trình này bao gồm việc nén dữ liệu liên quan đến giao dịch và công bố nó trên Ethereum dưới dạng `calldata` hoặc trong các blob.

`calldata` là một vùng không thể sửa đổi, không liên tục trong một hợp đồng thông minh, hoạt động chủ yếu giống như [bộ nhớ](/developers/docs/smart-contracts/anatomy/#memory). Mặc dù `calldata` tồn tại trên chuỗi như một phần của [nhật ký lịch sử](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) của chuỗi khối, nó không được lưu trữ như một phần trạng thái của Ethereum. Vì `calldata` không chạm vào bất kỳ phần nào của trạng thái Ethereum, nên việc lưu trữ dữ liệu trên chuỗi bằng cách này sẽ rẻ hơn so với lưu vào trạng thái.

Từ khóa `calldata` cũng được sử dụng trong Solidity để truyền các đối số cho một hàm hợp đồng thông minh tại thời điểm thực thi. `calldata` xác định hàm đang được gọi trong một giao dịch và giữ các đầu vào cho hàm dưới dạng một chuỗi byte tùy ý.

Trong bối cảnh các gộp giao dịch lạc quan, `calldata` được sử dụng để gửi dữ liệu giao dịch đã nén đến hợp đồng trên chuỗi. Một đơn vị vận hành rollup thêm một lô mới bằng cách gọi những hàm cần thiết trong hợp đồng rollup và gửi dữ liệu đã nén dưới dạng tham số truyền vào hàm. Sử dụng `calldata` giúp giảm phí người dùng vì hầu hết các chi phí mà các gộp giao dịch phải chịu đều đến từ việc lưu trữ dữ liệu trên chuỗi.

Đây là [một ví dụ](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) về việc gửi một lô gộp giao dịch để cho thấy khái niệm này hoạt động như thế nào. Trình sắp xếp thứ tự đã gọi phương thức `appendSequencerBatch()` và chuyển dữ liệu giao dịch đã nén làm đầu vào bằng cách sử dụng `calldata`.

Một số rollup bây giờ sử dụng blobs để đăng các lô giao dịch đến Ethereum.

Các blob không thể sửa đổi và không liên tục (giống như `calldata`) nhưng sẽ bị cắt bỏ khỏi lịch sử sau ~18 ngày. Để biết thêm thông tin về các blob, hãy xem [Danksharding](/roadmap/danksharding).

### Cam kết trạng thái {#state-commitments}

Tại bất kỳ thời điểm nào, trạng thái của gộp giao dịch lạc quan (tài khoản, số dư, mã hợp đồng, v.v.) được tổ chức dưới dạng một [cây Merkle](/whitepaper/#merkle-trees) được gọi là “cây trạng thái”. Gốc của cây Merkle này (gốc trạng thái), tham chiếu đến trạng thái mới nhất của gộp giao dịch, được băm và lưu trữ trong hợp đồng gộp giao dịch. Mỗi quá trình chuyển đổi trạng thái trên chuỗi sẽ tạo ra một trạng thái gộp giao dịch mới, mà một nhà điều hành cam kết bằng cách tính toán một gốc trạng thái mới.

Nhà điều hành được yêu cầu gửi cả gốc trạng thái cũ và gốc trạng thái mới khi đăng các lô. Nếu gốc trạng thái cũ khớp với gốc trạng thái hiện có trong hợp đồng trên chuỗi, gốc trạng thái hiện có sẽ bị loại bỏ và thay thế bằng gốc trạng thái mới.

Nhà điều hành gộp giao dịch cũng được yêu cầu cam kết một gốc Merkle cho chính lô giao dịch đó. Điều này cho phép bất kỳ ai chứng minh sự bao gồm của một giao dịch trong lô (trên L1) bằng cách trình bày một [bằng chứng Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Các cam kết trạng thái, đặc biệt là các gốc trạng thái, là cần thiết để chứng minh tính đúng đắn của các thay đổi trạng thái trong một gộp giao dịch lạc quan. Hợp đồng gộp giao dịch chấp nhận các gốc trạng thái mới từ các nhà điều hành ngay sau khi chúng được đăng, nhưng sau đó có thể xóa các gốc trạng thái không hợp lệ để khôi phục gộp giao dịch về trạng thái chính xác của nó.

### Chứng minh gian lận {#fraud-proving}

Như đã giải thích, các gộp giao dịch lạc quan cho phép bất kỳ ai công bố các khối mà không cần cung cấp bằng chứng về tính hợp lệ. Tuy nhiên, để đảm bảo chuỗi vẫn an toàn, các gộp giao dịch lạc quan chỉ định một khoảng thời gian mà trong đó bất kỳ ai cũng có thể tranh chấp một quá trình chuyển đổi trạng thái. Do đó, các khối gộp giao dịch được gọi là “khẳng định” vì bất kỳ ai cũng có thể tranh chấp tính hợp lệ của chúng.

Nếu ai đó tranh chấp một khẳng định, thì giao thức gộp giao dịch sẽ bắt đầu tính toán bằng chứng gian lận. Mọi loại bằng chứng gian lận đều có tính tương tác—ai đó phải đăng một khẳng định trước khi người khác có thể thách thức nó. Sự khác biệt nằm ở số vòng tương tác cần thiết để tính toán bằng chứng gian lận.

Các lược đồ chứng minh tương tác một vòng sẽ phát lại các giao dịch bị tranh chấp trên L1 để phát hiện các khẳng định không hợp lệ. Giao thức gộp giao dịch mô phỏng việc thực thi lại giao dịch bị tranh chấp trên L1 (Ethereum) bằng cách sử dụng hợp đồng xác minh, với gốc trạng thái được tính toán sẽ xác định ai là người chiến thắng trong thử thách. Nếu tuyên bố của người thách thức về trạng thái chính xác của gộp giao dịch là đúng, nhà điều hành sẽ bị phạt bằng cách bị cắt giảm khoản ký quỹ của họ.

Tuy nhiên, việc thực thi lại các giao dịch trên L1 để phát hiện gian lận đòi hỏi phải công bố các cam kết trạng thái cho các giao dịch riêng lẻ và làm tăng lượng dữ liệu mà các gộp giao dịch phải công bố trên chuỗi. Việc phát lại các giao dịch cũng gây ra chi phí gas đáng kể. Vì những lý do này, các gộp giao dịch lạc quan đang chuyển sang chứng minh tương tác nhiều vòng, vốn đạt được cùng một mục tiêu (tức là phát hiện các hoạt động gộp giao dịch không hợp lệ) với hiệu quả cao hơn.

#### Chứng minh tương tác nhiều vòng {#multi-round-interactive-proving}

Chứng minh tương tác nhiều vòng bao gồm một giao thức qua lại giữa người khẳng định và người thách thức được giám sát bởi một hợp đồng xác minh L1, mà cuối cùng sẽ quyết định bên nào nói dối. Sau khi một nút L2 thách thức một khẳng định, người khẳng định được yêu cầu chia khẳng định bị tranh chấp thành hai nửa bằng nhau. Mỗi khẳng định riêng lẻ trong trường hợp này sẽ chứa số bước tính toán bằng nhau.

Người thách thức sau đó sẽ chọn khẳng định mà họ muốn thách thức. Quá trình phân chia (được gọi là “giao thức chia đôi”) tiếp tục cho đến khi cả hai bên tranh chấp một khẳng định về một bước thực thi _duy nhất_. Tại thời điểm này, hợp đồng L1 sẽ giải quyết tranh chấp bằng cách đánh giá lệnh (và kết quả của nó) để bắt bên gian lận.

Người khẳng định được yêu cầu cung cấp "bằng chứng một bước" để xác minh tính hợp lệ của phép tính một bước bị tranh chấp. Nếu người khẳng định không cung cấp được bằng chứng một bước, hoặc người xác minh L1 cho rằng bằng chứng không hợp lệ, họ sẽ thua trong thử thách.

Một số lưu ý về loại bằng chứng gian lận này:

1. Chứng minh gian lận tương tác nhiều vòng được coi là hiệu quả vì nó giảm thiểu công việc mà chuỗi L1 phải làm trong việc phân xử tranh chấp. Thay vì phát lại toàn bộ giao dịch, chuỗi L1 chỉ cần thực thi lại một bước trong quá trình thực thi của gộp giao dịch.

2. Các giao thức chia đôi làm giảm lượng dữ liệu được đăng trên chuỗi (không cần phải công bố các cam kết trạng thái cho mọi giao dịch). Ngoài ra, các giao dịch gộp giao dịch lạc quan không bị giới hạn bởi giới hạn gas của Ethereum. Ngược lại, các gộp giao dịch lạc quan thực thi lại các giao dịch phải đảm bảo một giao dịch L2 có giới hạn gas thấp hơn để mô phỏng việc thực thi của nó trong một giao dịch Ethereum duy nhất.

3. Một phần khoản ký quỹ của người khẳng định độc hại được trao cho người thách thức, trong khi phần còn lại bị đốt cháy. Việc đốt cháy ngăn chặn sự thông đồng giữa những người xác thực; nếu hai người xác thực thông đồng để khởi tạo các thử thách giả mạo, họ vẫn sẽ mất một phần đáng kể trong toàn bộ số tiền đã ký quỹ.

4. Chứng minh tương tác nhiều vòng yêu cầu cả hai bên (người khẳng định và người thách thức) phải thực hiện các hành động trong khoảng thời gian được chỉ định. Việc không hành động trước khi hết thời hạn sẽ khiến bên không thực hiện nghĩa vụ bị xử thua trong thử thách.

#### Tại sao bằng chứng gian lận lại quan trọng đối với các gộp giao dịch lạc quan {#fraud-proof-benefits}

Bằng chứng gian lận rất quan trọng vì chúng tạo điều kiện cho _tính hữu hạn không cần tin cậy_ trong các gộp giao dịch lạc quan. Tính hữu hạn không cần tin cậy là một đặc tính của các gộp giao dịch lạc quan đảm bảo rằng một giao dịch—miễn là nó hợp lệ—cuối cùng sẽ được xác nhận.

Các nút độc hại có thể cố gắng trì hoãn việc xác nhận một khối gộp giao dịch hợp lệ bằng cách bắt đầu các thử thách sai. Tuy nhiên, bằng chứng gian lận cuối cùng sẽ chứng minh tính hợp lệ của khối gộp giao dịch và khiến nó được xác nhận.

Điều này cũng liên quan đến một thuộc tính bảo mật khác của các gộp giao dịch lạc quan: tính hợp lệ của chuỗi phụ thuộc vào sự tồn tại của _một_ nút trung thực. Nút trung thực có thể thúc đẩy chuỗi một cách chính xác bằng cách đăng các khẳng định hợp lệ hoặc tranh chấp các khẳng định không hợp lệ. Trong mọi trường hợp, các nút độc hại tham gia vào các tranh chấp với nút trung thực sẽ mất tiền đặt cọc trong quá trình chứng minh gian lận.

### Khả năng tương tác L1/L2 {#l1-l2-interoperability}

Các gộp giao dịch lạc quan được thiết kế để có khả năng tương tác với Mạng chính Ethereum và cho phép người dùng chuyển tin nhắn và dữ liệu tùy ý giữa L1 và L2. Chúng cũng tương thích với EVM, vì vậy bạn có thể chuyển [các ứng dụng phi tập trung](/developers/docs/dapps/) hiện có sang các gộp giao dịch lạc quan hoặc tạo các ứng dụng phi tập trung mới bằng các công cụ phát triển Ethereum.

#### 1. Chuyển động tài sản {#asset-movement}

##### Tham gia gộp giao dịch

Để sử dụng một gộp giao dịch lạc quan, người dùng gửi ETH, token ERC-20 và các tài sản được chấp nhận khác vào hợp đồng [cầu nối](/developers/docs/bridges/) của gộp giao dịch trên L1. Hợp đồng cầu nối sẽ chuyển tiếp giao dịch đến L2, nơi một lượng tài sản tương đương được đúc và gửi đến địa chỉ đã chọn của người dùng trên gộp giao dịch lạc quan.

Các giao dịch do người dùng tạo (như gửi tiền từ L1 > L2) thường được xếp vào hàng đợi cho đến khi trình sắp xếp thứ tự gửi lại chúng vào hợp đồng gộp giao dịch. Tuy nhiên, để duy trì khả năng chống kiểm duyệt, các gộp giao dịch lạc quan cho phép người dùng gửi giao dịch trực tiếp đến hợp đồng gộp giao dịch trên chuỗi nếu nó đã bị trì hoãn quá thời gian tối đa cho phép.

Một số gộp giao dịch lạc quan áp dụng một cách tiếp cận đơn giản hơn để ngăn chặn các trình sắp xếp thứ tự kiểm duyệt người dùng. Ở đây, một khối được xác định bởi tất cả các giao dịch được gửi đến hợp đồng L1 kể từ khối trước đó (ví dụ: các khoản tiền gửi) ngoài các giao dịch được xử lý trên chuỗi gộp giao dịch. Nếu một trình sắp xếp thứ tự bỏ qua một giao dịch L1, nó sẽ công bố gốc trạng thái sai (có thể chứng minh được); do đó, các trình sắp xếp thứ tự không thể trì hoãn các tin nhắn do người dùng tạo ra sau khi được đăng trên L1.

##### Thoát khỏi gộp giao dịch

Việc rút tiền từ một gộp giao dịch lạc quan về Ethereum khó khăn hơn do cơ chế chứng minh gian lận. Nếu một người dùng khởi tạo một giao dịch L2 > L1 để rút tiền được ký quỹ trên L1, họ phải đợi cho đến khi giai đoạn thử thách—kéo dài khoảng bảy ngày—kết thúc. Tuy nhiên, quá trình rút tiền tự nó khá đơn giản.

Sau khi yêu cầu rút tiền được khởi tạo trên gộp giao dịch L2, giao dịch được bao gồm trong lô tiếp theo, trong khi tài sản của người dùng trên gộp giao dịch bị đốt cháy. Sau khi lô được công bố trên Ethereum, người dùng có thể tính toán một bằng chứng Merkle để xác minh sự bao gồm của giao dịch thoát của họ trong khối. Sau đó, vấn đề chỉ là chờ đợi qua giai đoạn trì hoãn để hoàn tất giao dịch trên L1 và rút tiền về Mạng chính.

Để tránh phải chờ một tuần trước khi rút tiền về Ethereum, người dùng gộp giao dịch lạc quan có thể sử dụng **nhà cung cấp thanh khoản** (LP). Một nhà cung cấp thanh khoản đảm nhận quyền sở hữu của một khoản rút tiền L2 đang chờ xử lý và trả tiền cho người dùng trên L1 (để đổi lấy một khoản phí).

Các nhà cung cấp thanh khoản có thể kiểm tra tính hợp lệ của yêu cầu rút tiền của người dùng (bằng cách tự thực thi chuỗi) trước khi giải phóng tiền. Bằng cách này, họ có sự đảm bảo rằng giao dịch cuối cùng sẽ được xác nhận (tức là tính hữu hạn không cần tin cậy).

#### 2. Khả năng tương thích với EVM {#evm-compatibility}

Đối với các nhà phát triển, lợi thế của các gộp giao dịch lạc quan là khả năng tương thích của chúng—hoặc tốt hơn nữa là tương đương—với [Máy ảo Ethereum (EVM)](/developers/docs/evm/). Các gộp giao dịch tương thích với EVM tuân thủ các thông số kỹ thuật trong [Sách vàng Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) và hỗ trợ EVM ở cấp độ bytecode.

Khả năng tương thích EVM trong các gộp giao dịch lạc quan có những lợi ích sau:

i. Các nhà phát triển có thể di chuyển các hợp đồng thông minh hiện có trên Ethereum sang các chuỗi gộp giao dịch lạc quan mà không cần phải sửa đổi nhiều cơ sở mã. Điều này có thể tiết kiệm thời gian cho các nhóm phát triển khi triển khai các hợp đồng thông minh Ethereum trên L2.

ii. Các nhà phát triển và các nhóm dự án sử dụng các gộp giao dịch lạc quan có thể tận dụng cơ sở hạ tầng của Ethereum. Điều này bao gồm các ngôn ngữ lập trình, thư viện mã, công cụ kiểm thử, phần mềm máy khách, cơ sở hạ tầng triển khai, v.v.

Việc sử dụng các bộ công cụ hiện có là quan trọng vì những công cụ này đã được kiểm toán, gỡ lỗi và cải tiến rộng rãi trong nhiều năm. Nó cũng loại bỏ sự cần thiết cho các nhà phát triển Ethereum phải học cách xây dựng với một bộ công cụ phát triển hoàn toàn mới.

#### 3. Các lệnh gọi hợp đồng chuỗi chéo {#cross-chain-contract-calls}

Người dùng (tài khoản thuộc sở hữu bên ngoài) tương tác với các hợp đồng L2 bằng cách gửi một giao dịch đến hợp đồng gộp giao dịch hoặc để một trình sắp xếp thứ tự hoặc người xác thực làm điều đó cho họ. Các gộp giao dịch lạc quan cũng cho phép các tài khoản hợp đồng trên Ethereum tương tác với các hợp đồng L2 bằng cách sử dụng các hợp đồng cầu nối để chuyển tiếp tin nhắn và chuyển dữ liệu giữa L1 và L2. Điều này có nghĩa là bạn có thể lập trình một hợp đồng L1 trên Mạng chính Ethereum để gọi các hàm thuộc về các hợp đồng trên một gộp giao dịch lạc quan L2.

Các lệnh gọi hợp đồng chuỗi chéo xảy ra không đồng bộ—nghĩa là lệnh gọi được khởi tạo trước, sau đó được thực thi vào một thời điểm sau đó. Điều này khác với các lệnh gọi giữa hai hợp đồng trên Ethereum, nơi lệnh gọi tạo ra kết quả ngay lập tức.

Một ví dụ về lệnh gọi hợp đồng chuỗi chéo là việc gửi token được mô tả trước đó. Một hợp đồng trên L1 ký quỹ token của người dùng và gửi một tin nhắn đến một hợp đồng L2 được ghép nối để đúc một lượng token tương đương trên gộp giao dịch.

Vì các lệnh gọi tin nhắn chuỗi chéo dẫn đến việc thực thi hợp đồng, người gửi thường được yêu cầu chi trả [chi phí gas](/developers/docs/gas/) cho việc tính toán. Bạn nên đặt giới hạn gas cao để ngăn giao dịch bị thất bại trên chuỗi đích. Kịch bản cầu nối token là một ví dụ điển hình; nếu phía L1 của giao dịch (gửi token) hoạt động, nhưng phía L2 (đúc token mới) thất bại do gas thấp, khoản tiền gửi sẽ không thể phục hồi được.

Cuối cùng, chúng ta cần lưu ý rằng các lệnh gọi tin nhắn L2 > L1 giữa các hợp đồng cần tính đến sự chậm trễ (các lệnh gọi L1 > L2 thường được thực thi sau vài phút). Điều này là do các tin nhắn được gửi đến Mạng chính từ gộp giao dịch lạc quan không thể được thực thi cho đến khi cửa sổ thử thách hết hạn.

## Phí của gộp giao dịch lạc quan hoạt động như thế nào? {#how-do-optimistic-rollup-fees-work}

Các gộp giao dịch lạc quan sử dụng một cơ chế phí gas, giống như Ethereum, để biểu thị số tiền người dùng trả cho mỗi giao dịch. Các khoản phí được tính trên các gộp giao dịch lạc quan phụ thuộc vào các thành phần sau:

1. **Ghi trạng thái**: Các gộp giao dịch lạc quan công bố dữ liệu giao dịch và tiêu đề khối (bao gồm hàm băm của tiêu đề khối trước đó, gốc trạng thái, gốc lô) lên Ethereum dưới dạng một `blob`, hoặc "đối tượng lớn nhị phân". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) đã giới thiệu một giải pháp tiết kiệm chi phí để bao gồm dữ liệu trên chuỗi. Một `blob` là một trường giao dịch mới cho phép các gộp giao dịch đăng dữ liệu chuyển đổi trạng thái đã nén lên Ethereum L1. Không giống như `calldata`, vốn vẫn tồn tại vĩnh viễn trên chuỗi, các blob chỉ tồn tại trong thời gian ngắn và có thể bị cắt bỏ khỏi các máy khách sau [4096 epoch](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (khoảng 18 ngày). Bằng cách sử dụng các blob để đăng các lô giao dịch đã nén, các gộp giao dịch lạc quan có thể giảm đáng kể chi phí ghi giao dịch vào L1.

2. **Gas blob đã sử dụng**: Các giao dịch mang blob sử dụng một cơ chế phí động tương tự như cơ chế được giới thiệu bởi [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Phí gas cho các giao dịch loại 3 tính đến phí cơ bản cho các blob, được xác định bởi mạng lưới dựa trên nhu cầu về không gian blob và việc sử dụng không gian blob của giao dịch đang được gửi.

3. **Phí của nhà điều hành L2**: Đây là số tiền trả cho các nút gộp giao dịch để bù đắp cho các chi phí tính toán phát sinh trong quá trình xử lý giao dịch, giống như phí gas trên Ethereum. Các nút gộp giao dịch tính phí giao dịch thấp hơn vì các L2 có khả năng xử lý cao hơn và không phải đối mặt với tình trạng tắc nghẽn mạng buộc những người xác thực trên Ethereum phải ưu tiên các giao dịch có phí cao hơn.

Các gộp giao dịch lạc quan áp dụng một số cơ chế để giảm phí cho người dùng, bao gồm gộp các giao dịch và nén `calldata` để giảm chi phí công bố dữ liệu. Bạn có thể kiểm tra [công cụ theo dõi phí L2](https://l2fees.info/) để có cái nhìn tổng quan theo thời gian thực về chi phí sử dụng các gộp giao dịch lạc quan dựa trên Ethereum.

## Các gộp giao dịch lạc quan mở rộng quy mô Ethereum như thế nào? {#scaling-ethereum-with-optimistic-rollups}

Như đã giải thích, các gộp giao dịch lạc quan công bố dữ liệu giao dịch đã nén trên Ethereum để đảm bảo tính khả dụng của dữ liệu. Khả năng nén dữ liệu được công bố trên chuỗi là rất quan trọng để mở rộng thông lượng trên Ethereum bằng các gộp giao dịch lạc quan.

Chuỗi Ethereum chính đặt ra giới hạn về lượng dữ liệu mà các khối có thể chứa, được tính bằng đơn vị gas ([kích thước khối trung bình](/developers/docs/blocks/#block-size) là 15 triệu gas). Mặc dù điều này hạn chế lượng gas mà mỗi giao dịch có thể sử dụng, nó cũng có nghĩa là chúng ta có thể tăng số giao dịch được xử lý trên mỗi khối bằng cách giảm dữ liệu liên quan đến giao dịch—cải thiện trực tiếp khả năng mở rộng.

Các gộp giao dịch lạc quan sử dụng một số kỹ thuật để đạt được việc nén dữ liệu giao dịch và cải thiện tỷ lệ TPS. Ví dụ, [bài viết](https://vitalik.eth.limo/general/2021/01/05/rollup.html) này so sánh dữ liệu mà một giao dịch người dùng cơ bản (gửi ether) tạo ra trên Mạng chính so với lượng dữ liệu mà cùng giao dịch đó tạo ra trên một gộp giao dịch:

| Thông số      | Ethereum (L1)                     | Gộp giao dịch (L2) |
| ------------- | ---------------------------------------------------- | ------------------------------------- |
| Nonce         | ~3                                   | 0                                     |
| Giá gas       | ~8                                   | 0-0.5                 |
| Gas           | 3                                                    | 0-0.5                 |
| Đến           | 21                                                   | 4                                     |
| Giá trị       | 9                                                    | ~3                    |
| Chữ ký        | ~68 (2 + 33 + 33) | ~0.5  |
| Từ            | 0 (phục hồi từ chữ ký)            | 4                                     |
| **Tổng cộng** | **~112 byte**                        | **~12 byte**          |

Thực hiện một số tính toán sơ bộ trên những con số này có thể giúp cho thấy những cải tiến về khả năng mở rộng mà một gộp giao dịch lạc quan mang lại:

1. Kích thước mục tiêu cho mỗi khối là 15 triệu gas và chi phí để xác minh một byte dữ liệu là 16 gas. Chia kích thước khối trung bình cho 16 gas (15.000.000/16) cho thấy khối trung bình có thể chứa **937.500 byte dữ liệu**.
2. Nếu một giao dịch gộp giao dịch cơ bản sử dụng 12 byte, thì khối Ethereum trung bình có thể xử lý **78.125 giao dịch gộp giao dịch** (937.500/12) hoặc **39 lô gộp giao dịch** (nếu mỗi lô chứa trung bình 2.000 giao dịch).
3. Nếu một khối mới được sản xuất trên Ethereum cứ sau 15 giây, thì tốc độ xử lý của gộp giao dịch sẽ vào khoảng **5.208 giao dịch mỗi giây**. Điều này được thực hiện bằng cách chia số lượng giao dịch gộp giao dịch cơ bản mà một khối Ethereum có thể chứa (**78.125**) cho thời gian khối trung bình (**15 giây**).

Đây là một ước tính khá lạc quan, vì các giao dịch gộp giao dịch lạc quan không thể chiếm toàn bộ một khối trên Ethereum. Tuy nhiên, nó có thể đưa ra một ý tưởng sơ bộ về mức độ tăng khả năng mở rộng mà các gộp giao dịch lạc quan có thể mang lại cho người dùng Ethereum (các triển khai hiện tại cung cấp tới 2.000 TPS).

Sự ra đời của [phân mảnh dữ liệu](/roadmap/danksharding/) trên Ethereum được kỳ vọng sẽ cải thiện khả năng mở rộng trong các gộp giao dịch lạc quan. Bởi vì các giao dịch gộp giao dịch phải chia sẻ không gian khối với các giao dịch không phải gộp giao dịch khác, khả năng xử lý của chúng bị giới hạn bởi thông lượng dữ liệu trên chuỗi Ethereum chính. Danksharding sẽ tăng không gian có sẵn cho các chuỗi L2 để công bố dữ liệu trên mỗi khối, bằng cách sử dụng lưu trữ "blob" rẻ hơn, không lâu dài thay vì `CALLDATA` đắt đỏ, vĩnh viễn.

### Ưu và nhược điểm của các gộp giao dịch lạc quan {#optimistic-rollups-pros-and-cons}

| Ưu điểm                                                                                                                                                                                                                                | Nhược điểm                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cung cấp những cải tiến lớn về khả năng mở rộng mà không phải hy sinh tính bảo mật hoặc tính không cần tin cậy.                                                                                                        | Trì hoãn trong việc hoàn tất giao dịch do các thách thức gian lận tiềm tàng.                                                                                              |
| Dữ liệu giao dịch được lưu trữ trên chuỗi lớp 1, cải thiện tính minh bạch, bảo mật, khả năng chống kiểm duyệt và phân quyền.                                                                                           | Các nhà điều hành gộp giao dịch tập trung (trình sắp xếp thứ tự) có thể ảnh hưởng đến thứ tự giao dịch.                                                |
| Chứng minh gian lận đảm bảo tính hữu hạn không cần tin cậy và cho phép các nhóm thiểu số trung thực bảo mật chuỗi.                                                                                                     | Nếu không có nút trung thực nào, một nhà điều hành độc hại có thể đánh cắp tiền bằng cách đăng các khối và cam kết trạng thái không hợp lệ.                               |
| Việc tính toán bằng chứng gian lận mở cho nút L2 thông thường, không giống như bằng chứng hợp lệ (được sử dụng trong các gộp giao dịch ZK) yêu cầu phần cứng đặc biệt.                              | Mô hình bảo mật dựa vào ít nhất một nút trung thực thực hiện các giao dịch gộp giao dịch và gửi bằng chứng gian lận để thách thức các chuyển đổi trạng thái không hợp lệ. |
| Các gộp giao dịch được hưởng lợi từ "tính sống động không cần tin cậy" (bất kỳ ai cũng có thể buộc chuỗi tiến lên bằng cách thực hiện các giao dịch và đăng các khẳng định)                                         | Người dùng phải đợi thời gian thử thách một tuần hết hạn trước khi rút tiền về Ethereum.                                                                                  |
| Các gộp giao dịch lạc quan dựa vào các ưu đãi kinh tế mã hóa được thiết kế tốt để tăng cường bảo mật trên chuỗi.                                                                                                       | Các gộp giao dịch phải đăng tất cả dữ liệu giao dịch trên chuỗi, điều này có thể làm tăng chi phí.                                                                        |
| Khả năng tương thích với EVM và Solidity cho phép các nhà phát triển chuyển các hợp đồng thông minh gốc của Ethereum sang các gộp giao dịch hoặc sử dụng các bộ công cụ hiện có để tạo các ứng dụng phi tập trung mới. |                                                                                                                                                                                           |

### Giải thích trực quan về các gộp giao dịch lạc quan {#optimistic-video}

Tìm hiểu thêm từ video trực quan? Xem Finematics giải thích về các gộp giao dịch lạc quan:

<YouTube id="7pWxCklcNsU" start="263" />

## Đọc thêm về các gộp giao dịch lạc quan

- [Các gộp giao dịch lạc quan hoạt động như thế nào (Hướng dẫn Toàn diện)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Gộp giao dịch chuỗi khối là gì? Giới thiệu kỹ thuật](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Hướng dẫn cần thiết về Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Hướng dẫn thực hành về các gộp giao dịch Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Tình trạng của Bằng chứng Gian lận trong các L2 của Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Gộp giao dịch của Optimism thực sự hoạt động như thế nào?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Tìm hiểu sâu về OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Máy ảo Lạc quan là gì?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
