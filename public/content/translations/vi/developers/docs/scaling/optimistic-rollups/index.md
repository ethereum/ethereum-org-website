---
title: Rollup lạc quan
description: Giới thiệu về Rollup lạc quan—một giải pháp mở rộng quy mô được cộng đồng Ethereum sử dụng.
lang: vi
---

Rollup lạc quan là các Giao thức lớp 2 (l2) được thiết kế để mở rộng thông lượng của lớp cơ sở của Ethereum. Chúng giảm thiểu tính toán trên Chuỗi [Ethereum](/) chính bằng cách xử lý các giao dịch ngoài chuỗi, mang lại những cải thiện đáng kể về tốc độ xử lý. Không giống như các giải pháp mở rộng quy mô khác, chẳng hạn như [sidechain](/developers/docs/scaling/sidechains/), Rollup lạc quan lấy bảo mật từ Mạng chính bằng cách công bố kết quả giao dịch trên chuỗi, hoặc [chuỗi Plasma](/developers/docs/scaling/plasma/), cũng xác minh các giao dịch trên Ethereum bằng bằng chứng gian lận, nhưng lưu trữ dữ liệu giao dịch ở nơi khác.

Vì tính toán là phần chậm và tốn kém khi sử dụng Ethereum, Rollup lạc quan có thể mang lại sự cải thiện khả năng mở rộng lên đến 10-100 lần. Rollup lạc quan cũng ghi các giao dịch vào Ethereum dưới dạng `calldata` hoặc trong các [khối dữ liệu](/roadmap/danksharding/), giảm chi phí Gas cho người dùng.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên đọc và hiểu các trang của chúng tôi về [mở rộng quy mô Ethereum](/developers/docs/scaling/) và [lớp 2](/layer-2/).

## Rollup lạc quan là gì? {#what-is-an-optimistic-rollup}

Rollup lạc quan là một phương pháp tiếp cận để mở rộng quy mô Ethereum liên quan đến việc di chuyển tính toán và lưu trữ trạng thái ra ngoài chuỗi. Rollup lạc quan thực thi các giao dịch bên ngoài Ethereum, nhưng đăng dữ liệu giao dịch lên Mạng chính dưới dạng `calldata` hoặc trong các [khối dữ liệu](/roadmap/danksharding/).

Các nhà điều hành Rollup lạc quan gom lô nhiều giao dịch ngoài chuỗi lại với nhau thành các lô lớn trước khi gửi lên Ethereum. Cách tiếp cận này cho phép phân bổ chi phí cố định cho nhiều giao dịch trong mỗi lô, giảm phí cho người dùng cuối. Rollup lạc quan cũng sử dụng các kỹ thuật nén để giảm lượng dữ liệu được đăng trên Ethereum.

Rollup lạc quan được coi là "lạc quan" vì chúng giả định các giao dịch ngoài chuỗi là hợp lệ và không công bố bằng chứng hợp lệ cho các lô giao dịch được đăng trên chuỗi. Điều này phân biệt Rollup lạc quan với [bản cuộn không tri thức](/developers/docs/scaling/zk-rollups) vốn công bố các [bằng chứng hợp lệ](/glossary/#validity-proof) mật mã cho các giao dịch ngoài chuỗi.

Thay vào đó, Rollup lạc quan dựa vào một cơ chế chứng minh gian lận để phát hiện các trường hợp giao dịch không được tính toán chính xác. Sau khi một lô bản cuộn được gửi trên Ethereum, sẽ có một khoảng thời gian (gọi là thời gian thử thách) mà trong đó bất kỳ ai cũng có thể thách thức kết quả của một giao dịch bản cuộn bằng cách tính toán một [bằng chứng gian lận](/glossary/#fraud-proof).

Nếu bằng chứng gian lận thành công, Giao thức bản cuộn sẽ thực thi lại (các) giao dịch và cập nhật trạng thái của bản cuộn cho phù hợp. Tác động khác của một bằng chứng gian lận thành công là bộ sắp xếp chịu trách nhiệm đưa giao dịch được thực thi không chính xác vào một khối sẽ nhận một hình phạt.

Nếu lô bản cuộn không bị thách thức (tức là tất cả các giao dịch đều được thực thi chính xác) sau khi thời gian thử thách trôi qua, nó được coi là hợp lệ và được chấp nhận trên Ethereum. Những người khác có thể tiếp tục xây dựng trên một khối bản cuộn chưa được xác nhận, nhưng với một lưu ý: kết quả giao dịch sẽ bị đảo ngược nếu dựa trên một giao dịch được thực thi không chính xác đã được công bố trước đó.

## Rollup lạc quan tương tác với Ethereum như thế nào? {#optimistic-rollups-and-ethereum}

Rollup lạc quan là các [giải pháp mở rộng quy mô ngoài chuỗi](/developers/docs/scaling/#offchain-scaling) được xây dựng để hoạt động trên Ethereum. Mỗi Rollup lạc quan được quản lý bởi một tập hợp các hợp đồng thông minh được triển khai trên mạng lưới Ethereum. Rollup lạc quan xử lý các giao dịch ngoài Chuỗi Ethereum chính, nhưng đăng các giao dịch ngoài chuỗi (theo lô) lên một hợp đồng bản cuộn trên chuỗi. Giống như Chuỗi khối Ethereum, bản ghi giao dịch này là bất biến và tạo thành "Chuỗi Rollup lạc quan".

Kiến trúc của một Rollup lạc quan bao gồm các phần sau:

**Các hợp đồng trên chuỗi**: Hoạt động của Rollup lạc quan được kiểm soát bởi các hợp đồng thông minh chạy trên Ethereum. Điều này bao gồm các hợp đồng lưu trữ các khối bản cuộn, giám sát các cập nhật trạng thái trên bản cuộn và theo dõi các khoản tiền gửi của người dùng. Theo nghĩa này, Ethereum đóng vai trò là lớp cơ sở hoặc "lớp 1" cho các Rollup lạc quan.

**Máy ảo ngoài chuỗi (VM)**: Mặc dù các hợp đồng quản lý Giao thức Rollup lạc quan chạy trên Ethereum, Giao thức bản cuộn thực hiện tính toán và lưu trữ trạng thái trên một máy ảo khác tách biệt với [Máy ảo Ethereum](/developers/docs/evm/). Máy ảo ngoài chuỗi là nơi các ứng dụng tồn tại và các thay đổi trạng thái được thực thi; nó đóng vai trò là lớp trên hoặc "lớp 2" cho một Rollup lạc quan.

Vì các Rollup lạc quan được thiết kế để chạy các chương trình được viết hoặc biên dịch cho EVM, máy ảo ngoài chuỗi kết hợp nhiều thông số thiết kế của EVM. Ngoài ra, các bằng chứng gian lận được tính toán trên chuỗi cho phép mạng lưới Ethereum thực thi tính hợp lệ của các thay đổi trạng thái được tính toán trong máy ảo ngoài chuỗi.

Rollup lạc quan được mô tả là 'các giải pháp mở rộng quy mô lai' vì, mặc dù chúng tồn tại dưới dạng các Giao thức riêng biệt, các thuộc tính bảo mật của chúng được lấy từ Ethereum. Trong số những thứ khác, Ethereum đảm bảo tính chính xác của tính toán ngoài chuỗi của một bản cuộn và tính khả dụng của dữ liệu đằng sau tính toán đó. Điều này làm cho các Rollup lạc quan an toàn hơn so với các Giao thức mở rộng quy mô ngoài chuỗi thuần túy (ví dụ: [sidechain](/developers/docs/scaling/sidechains/)) không dựa vào Ethereum để bảo mật.

Rollup lạc quan dựa vào Giao thức Ethereum chính cho những điều sau:

### Tính khả dụng của dữ liệu {#data-availability}

Như đã đề cập, Rollup lạc quan đăng dữ liệu giao dịch lên Ethereum dưới dạng `calldata` hoặc [khối dữ liệu](/roadmap/danksharding/). Vì việc thực thi của Chuỗi bản cuộn dựa trên các giao dịch đã gửi, bất kỳ ai cũng có thể sử dụng thông tin này—được neo trên lớp cơ sở của Ethereum—để thực thi trạng thái của bản cuộn và xác minh tính chính xác của các quá trình chuyển đổi trạng thái.

[Tính khả dụng của dữ liệu](/developers/docs/data-availability/) là rất quan trọng vì nếu không có quyền truy cập vào dữ liệu trạng thái, những người thách thức không thể xây dựng các bằng chứng gian lận để tranh chấp các hoạt động bản cuộn không hợp lệ. Với việc Ethereum cung cấp tính khả dụng của dữ liệu, rủi ro các nhà điều hành bản cuộn thoát khỏi các hành vi độc hại (ví dụ: gửi các khối không hợp lệ) sẽ giảm đi.

### Khả năng chống kiểm duyệt {#censorship-resistance}

Rollup lạc quan cũng dựa vào Ethereum để có khả năng chống kiểm duyệt. Trong một Rollup lạc quan, một thực thể tập trung (nhà điều hành) chịu trách nhiệm xử lý các giao dịch và gửi các khối bản cuộn lên Ethereum. Điều này có một số ý nghĩa:

- Các nhà điều hành bản cuộn có thể kiểm duyệt người dùng bằng cách ngoại tuyến hoàn toàn, hoặc bằng cách từ chối tạo ra các khối bao gồm các giao dịch nhất định trong đó.

- Các nhà điều hành bản cuộn có thể ngăn người dùng rút tiền đã gửi trong hợp đồng bản cuộn bằng cách giữ lại dữ liệu trạng thái cần thiết cho các bằng chứng Merkle về quyền sở hữu. Việc giữ lại dữ liệu trạng thái cũng có thể che giấu trạng thái của bản cuộn khỏi người dùng và ngăn họ tương tác với bản cuộn.

Rollup lạc quan giải quyết vấn đề này bằng cách buộc các nhà điều hành phải công bố dữ liệu liên quan đến các cập nhật trạng thái trên Ethereum. Việc công bố dữ liệu bản cuộn trên chuỗi có những lợi ích sau:

- Nếu một nhà điều hành Rollup lạc quan ngoại tuyến hoặc ngừng sản xuất các lô giao dịch, một nút khác có thể sử dụng dữ liệu có sẵn để tái tạo trạng thái cuối cùng của bản cuộn và tiếp tục sản xuất khối.

- Người dùng có thể sử dụng dữ liệu giao dịch để tạo các bằng chứng Merkle chứng minh quyền sở hữu tiền và rút tài sản của họ khỏi bản cuộn.

- Người dùng cũng có thể gửi các giao dịch của họ trên l1 thay vì cho bộ sắp xếp, trong trường hợp đó bộ sắp xếp phải đưa giao dịch vào trong một giới hạn thời gian nhất định để tiếp tục sản xuất các khối hợp lệ.

### Quyết toán {#settlement}

Một vai trò khác mà Ethereum đóng trong bối cảnh của các Rollup lạc quan là vai trò của một lớp quyết toán. Một lớp quyết toán neo toàn bộ hệ sinh thái Chuỗi khối, thiết lập bảo mật và cung cấp tính chung cuộc khách quan nếu xảy ra tranh chấp trên một Chuỗi khác (Rollup lạc quan trong trường hợp này) đòi hỏi phải phân xử.

Mạng chính Ethereum cung cấp một trung tâm cho các Rollup lạc quan để xác minh các bằng chứng gian lận và giải quyết các tranh chấp. Hơn nữa, các giao dịch được thực hiện trên bản cuộn chỉ có tính chung cuộc _sau khi_ khối bản cuộn được chấp nhận trên Ethereum. Khi một giao dịch bản cuộn được cam kết vào lớp cơ sở của Ethereum, nó không thể bị đảo ngược (ngoại trừ trường hợp rất khó xảy ra là tổ chức lại chuỗi).

## Rollup lạc quan hoạt động như thế nào? {#how-optimistic-rollups-work}

### Thực thi và tổng hợp giao dịch {#transaction-execution-and-aggregation}

Người dùng gửi các giao dịch cho các "nhà điều hành", là các nút chịu trách nhiệm xử lý các giao dịch trên Rollup lạc quan. Còn được gọi là "trình xác thực" hoặc "trình tổng hợp", nhà điều hành tổng hợp các giao dịch, nén dữ liệu cơ bản và công bố khối trên Ethereum.

Mặc dù bất kỳ ai cũng có thể trở thành trình xác thực, các trình xác thực Rollup lạc quan phải cung cấp một khoản tiền ký quỹ trước khi sản xuất các khối, giống như một [hệ thống Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/). Khoản ký quỹ này có thể bị phạt cắt giảm nếu trình xác thực đăng một khối không hợp lệ hoặc xây dựng trên một khối cũ nhưng không hợp lệ (ngay cả khi khối của họ là hợp lệ). Bằng cách này, các Rollup lạc quan sử dụng các động lực kinh tế mật mã để đảm bảo các trình xác thực hành động trung thực.

Các trình xác thực khác trên Chuỗi Rollup lạc quan được kỳ vọng sẽ thực thi các giao dịch đã gửi bằng cách sử dụng bản sao trạng thái của bản cuộn của họ. Nếu trạng thái cuối cùng của một trình xác thực khác với trạng thái được đề xuất của nhà điều hành, họ có thể bắt đầu một thử thách và tính toán một bằng chứng gian lận.

Một số Rollup lạc quan có thể từ bỏ hệ thống trình xác thực không cần cấp phép và sử dụng một "bộ sắp xếp" duy nhất để thực thi Chuỗi. Giống như một trình xác thực, bộ sắp xếp xử lý các giao dịch, sản xuất các khối bản cuộn và gửi các giao dịch bản cuộn lên Chuỗi l1 (Ethereum).

Bộ sắp xếp khác với một nhà điều hành bản cuộn thông thường vì họ có quyền kiểm soát lớn hơn đối với việc sắp xếp thứ tự các giao dịch. Ngoài ra, bộ sắp xếp có quyền truy cập ưu tiên vào Chuỗi bản cuộn và là thực thể duy nhất được ủy quyền gửi các giao dịch lên hợp đồng trên chuỗi. Các giao dịch từ các nút không phải bộ sắp xếp hoặc người dùng thông thường chỉ đơn giản được xếp hàng trong một hộp thư đến riêng biệt cho đến khi bộ sắp xếp đưa chúng vào một lô mới.

#### Gửi các khối bản cuộn lên Ethereum {#submitting-blocks-to-ethereum}

Như đã đề cập, nhà điều hành của một Rollup lạc quan gom lô các giao dịch ngoài chuỗi thành một lô và gửi nó lên Ethereum để công chứng. Quá trình này liên quan đến việc nén dữ liệu liên quan đến giao dịch và công bố nó trên Ethereum dưới dạng `calldata` hoặc trong các khối dữ liệu.

`calldata` là một khu vực không thể sửa đổi, không lưu trữ lâu dài trong một hợp đồng thông minh hoạt động chủ yếu giống như [bộ nhớ](/developers/docs/smart-contracts/anatomy/#memory). Mặc dù `calldata` tồn tại trên chuỗi như một phần của [nhật ký lịch sử](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) của Chuỗi khối, nó không được lưu trữ như một phần của trạng thái của Ethereum. Bởi vì `calldata` không chạm vào bất kỳ phần nào của trạng thái của Ethereum, nó rẻ hơn so với trạng thái để lưu trữ dữ liệu trên chuỗi.

Từ khóa `calldata` cũng được sử dụng trong Solidity để truyền các đối số cho một hàm hợp đồng thông minh tại thời điểm thực thi. `calldata` xác định hàm đang được gọi trong một giao dịch và giữ các đầu vào cho hàm dưới dạng một chuỗi byte tùy ý.

Trong bối cảnh của các Rollup lạc quan, `calldata` được sử dụng để gửi dữ liệu giao dịch đã nén đến hợp đồng trên chuỗi. Nhà điều hành bản cuộn thêm một lô mới bằng cách gọi hàm được yêu cầu trong hợp đồng bản cuộn và truyền dữ liệu đã nén dưới dạng các đối số của hàm. Việc sử dụng `calldata` làm giảm phí cho người dùng vì hầu hết các chi phí mà các bản cuộn phải chịu đến từ việc lưu trữ dữ liệu trên chuỗi.

Đây là [một ví dụ](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) về việc gửi lô bản cuộn để cho thấy khái niệm này hoạt động như thế nào. Bộ sắp xếp đã gọi phương thức `appendSequencerBatch()` và truyền dữ liệu giao dịch đã nén dưới dạng đầu vào bằng cách sử dụng `calldata`.

Một số bản cuộn hiện sử dụng các khối dữ liệu để đăng các lô giao dịch lên Ethereum.

Các khối dữ liệu không thể sửa đổi và không lưu trữ lâu dài (giống như `calldata`) nhưng sẽ bị cắt tỉa khỏi lịch sử sau ~18 ngày. Để biết thêm thông tin về các khối dữ liệu, hãy xem [danksharding](/roadmap/danksharding).

### Các cam kết trạng thái {#state-commitments}

Tại bất kỳ thời điểm nào, trạng thái của Rollup lạc quan (Tài khoản, số dư, mã hợp đồng, v.v.) được tổ chức dưới dạng một [cây Merkle](/whitepaper/#merkle-trees) được gọi là "cây trạng thái". Gốc của cây Merkle này (gốc trạng thái), tham chiếu đến trạng thái mới nhất của bản cuộn, được băm và lưu trữ trong hợp đồng bản cuộn. Mỗi quá trình chuyển đổi trạng thái trên Chuỗi tạo ra một trạng thái bản cuộn mới, mà một nhà điều hành cam kết bằng cách tính toán một gốc trạng thái mới.

Nhà điều hành được yêu cầu gửi cả gốc trạng thái cũ và gốc trạng thái mới khi đăng các lô. Nếu gốc trạng thái cũ khớp với gốc trạng thái hiện có trong hợp đồng trên chuỗi, gốc trạng thái hiện có sẽ bị loại bỏ và thay thế bằng gốc trạng thái mới.

Nhà điều hành bản cuộn cũng được yêu cầu cam kết một gốc Merkle cho chính lô giao dịch đó. Điều này cho phép bất kỳ ai chứng minh sự bao gồm của một giao dịch trong lô (trên l1) bằng cách trình bày một [bằng chứng Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Các cam kết trạng thái, đặc biệt là các gốc trạng thái, là cần thiết để chứng minh tính chính xác của các thay đổi trạng thái trong một Rollup lạc quan. Hợp đồng bản cuộn chấp nhận các gốc trạng thái mới từ các nhà điều hành ngay sau khi chúng được đăng, nhưng sau đó có thể xóa các gốc trạng thái không hợp lệ để khôi phục bản cuộn về trạng thái chính xác của nó.

### Chứng minh gian lận {#fraud-proving}

Như đã giải thích, Rollup lạc quan cho phép bất kỳ ai công bố các khối mà không cần cung cấp các bằng chứng hợp lệ. Tuy nhiên, để đảm bảo Chuỗi vẫn an toàn, các Rollup lạc quan chỉ định một khoảng thời gian mà trong đó bất kỳ ai cũng có thể tranh chấp một quá trình chuyển đổi trạng thái. Do đó, các khối bản cuộn được gọi là "các khẳng định" vì bất kỳ ai cũng có thể tranh chấp tính hợp lệ của chúng.

Nếu ai đó tranh chấp một khẳng định, thì Giao thức bản cuộn sẽ bắt đầu tính toán bằng chứng gian lận. Mọi loại bằng chứng gian lận đều có tính tương tác—ai đó phải đăng một khẳng định trước khi một người khác có thể thách thức nó. Sự khác biệt nằm ở việc cần bao nhiêu vòng tương tác để tính toán bằng chứng gian lận.

Các cơ chế chứng minh tương tác một vòng phát lại các giao dịch bị tranh chấp trên l1 để phát hiện các khẳng định không hợp lệ. Giao thức bản cuộn mô phỏng việc thực thi lại giao dịch bị tranh chấp trên l1 (Ethereum) bằng cách sử dụng một hợp đồng trình xác minh, với gốc trạng thái được tính toán xác định ai thắng thử thách. Nếu yêu cầu nhận của người thách thức về trạng thái chính xác của bản cuộn là đúng, nhà điều hành sẽ bị phạt bằng cách bị phạt cắt giảm khoản ký quỹ của họ.

Tuy nhiên, việc thực thi lại các giao dịch trên l1 để phát hiện gian lận đòi hỏi phải công bố các cam kết trạng thái cho từng giao dịch riêng lẻ và làm tăng lượng dữ liệu mà các bản cuộn phải công bố trên chuỗi. Việc phát lại các giao dịch cũng phát sinh chi phí Gas đáng kể. Vì những lý do này, các Rollup lạc quan đang chuyển sang chứng minh tương tác nhiều vòng, đạt được cùng một mục tiêu (tức là phát hiện các hoạt động bản cuộn không hợp lệ) với hiệu quả cao hơn.

#### Chứng minh tương tác nhiều vòng {#multi-round-interactive-proving}

Chứng minh tương tác nhiều vòng liên quan đến một Giao thức qua lại giữa người khẳng định và người thách thức được giám sát bởi một hợp đồng trình xác minh l1, hợp đồng này cuối cùng sẽ quyết định bên nói dối. Sau khi một nút l2 thách thức một khẳng định, người khẳng định được yêu cầu chia khẳng định bị tranh chấp thành hai nửa bằng nhau. Mỗi khẳng định riêng lẻ trong trường hợp này sẽ chứa số bước tính toán bằng nhau.

Người thách thức sau đó sẽ chọn khẳng định mà họ muốn thách thức. Quá trình chia (được gọi là "Giao thức chia đôi") tiếp tục cho đến khi cả hai bên đang tranh chấp một khẳng định về một bước thực thi _duy nhất_. Tại thời điểm này, hợp đồng l1 sẽ giải quyết tranh chấp bằng cách đánh giá lệnh (và kết quả của nó) để bắt bên gian lận.

Người khẳng định được yêu cầu cung cấp một "bằng chứng một bước" xác minh tính hợp lệ của tính toán một bước bị tranh chấp. Nếu người khẳng định không cung cấp được bằng chứng một bước, hoặc trình xác minh l1 coi bằng chứng là không hợp lệ, họ sẽ thua thử thách.

Một số lưu ý về loại bằng chứng gian lận này:

1. Chứng minh gian lận tương tác nhiều vòng được coi là hiệu quả vì nó giảm thiểu công việc mà Chuỗi l1 phải làm trong việc phân xử tranh chấp. Thay vì phát lại toàn bộ giao dịch, Chuỗi l1 chỉ cần thực thi lại một bước trong quá trình thực thi của bản cuộn.

2. Các Giao thức chia đôi làm giảm lượng dữ liệu được đăng trên chuỗi (không cần công bố các cam kết trạng thái cho mọi giao dịch). Ngoài ra, các giao dịch Rollup lạc quan không bị ràng buộc bởi giới hạn gas của Ethereum. Ngược lại, các Rollup lạc quan thực thi lại các giao dịch phải đảm bảo một giao dịch l2 có giới hạn gas thấp hơn để mô phỏng việc thực thi của nó trong một giao dịch Ethereum duy nhất.

3. Một phần khoản ký quỹ của người khẳng định độc hại được trao cho người thách thức, trong khi phần còn lại bị đốt. Việc đốt ngăn chặn sự thông đồng giữa các trình xác thực; nếu hai trình xác thực thông đồng để bắt đầu các thử thách giả mạo, họ vẫn sẽ bị mất một phần đáng kể của toàn bộ khoản đặt cọc.

4. Chứng minh tương tác nhiều vòng yêu cầu cả hai bên (người khẳng định và người thách thức) phải thực hiện các động thái trong khoảng thời gian được chỉ định. Việc không hành động trước khi hết hạn sẽ khiến bên vi phạm bị tước quyền tham gia thử thách.

#### Tại sao bằng chứng gian lận lại quan trọng đối với Rollup lạc quan {#fraud-proof-benefits}

Bằng chứng gian lận rất quan trọng vì chúng tạo điều kiện cho _tính chung cuộc không cần tin cậy_ trong các Rollup lạc quan. Tính chung cuộc không cần tin cậy là một đặc tính của các Rollup lạc quan đảm bảo rằng một giao dịch—miễn là nó hợp lệ—cuối cùng sẽ được xác nhận.

Các nút độc hại có thể cố gắng trì hoãn việc xác nhận một khối bản cuộn hợp lệ bằng cách bắt đầu các thử thách sai. Tuy nhiên, các bằng chứng gian lận cuối cùng sẽ chứng minh tính hợp lệ của khối bản cuộn và khiến nó được xác nhận.

Điều này cũng liên quan đến một thuộc tính bảo mật khác của các Rollup lạc quan: tính hợp lệ của Chuỗi dựa vào sự tồn tại của _một_ nút trung thực. Nút trung thực có thể thúc đẩy Chuỗi một cách chính xác bằng cách đăng các khẳng định hợp lệ hoặc tranh chấp các khẳng định không hợp lệ. Dù trong trường hợp nào, các nút độc hại tham gia vào các tranh chấp với nút trung thực sẽ mất các khoản đặt cọc của họ trong quá trình chứng minh gian lận.

### Khả năng tương tác l1/l2 {#l1-l2-interoperability}

Rollup lạc quan được thiết kế cho khả năng tương tác với Mạng chính Ethereum và cho phép người dùng truyền các thông điệp và dữ liệu tùy ý giữa l1 và l2. Chúng cũng tương thích với EVM, vì vậy bạn có thể chuyển các [ứng dụng phi tập trung (dapp)](/developers/docs/dapps/) hiện có sang các Rollup lạc quan hoặc tạo các dapp mới bằng cách sử dụng các công cụ phát triển Ethereum.

#### 1. Di chuyển tài sản {#asset-movement}

##### Vào bản cuộn {#evm-compatibility}

Để sử dụng một Rollup lạc quan, người dùng gửi ETH, token ERC-20 và các tài sản được chấp nhận khác vào hợp đồng [cầu nối](/developers/docs/bridges/) của bản cuộn trên l1. Hợp đồng cầu nối sẽ chuyển tiếp giao dịch đến l2, nơi một lượng tài sản tương đương được đúc và gửi đến Địa chỉ mà người dùng đã chọn trên Rollup lạc quan.

Các giao dịch do người dùng tạo (như khoản tiền gửi l1 > l2) thường được xếp hàng cho đến khi bộ sắp xếp gửi lại chúng cho hợp đồng bản cuộn. Tuy nhiên, để duy trì khả năng chống kiểm duyệt, các Rollup lạc quan cho phép người dùng gửi một giao dịch trực tiếp đến hợp đồng bản cuộn trên chuỗi nếu nó đã bị trì hoãn quá thời gian tối đa cho phép.

Một số Rollup lạc quan áp dụng một cách tiếp cận đơn giản hơn để ngăn chặn các bộ sắp xếp kiểm duyệt người dùng. Ở đây, một khối được xác định bởi tất cả các giao dịch được gửi đến hợp đồng l1 kể từ khối trước đó (ví dụ: tiền gửi) ngoài các giao dịch được xử lý trên Chuỗi bản cuộn. Nếu một bộ sắp xếp bỏ qua một giao dịch l1, nó sẽ công bố gốc trạng thái sai (có thể chứng minh được); do đó, các bộ sắp xếp không thể trì hoãn các thông điệp do người dùng tạo một khi đã được đăng trên l1.

##### Thoát khỏi bản cuộn {#cross-chain-contract-calls}

Việc rút tiền từ một Rollup lạc quan về Ethereum khó khăn hơn do cơ chế chứng minh gian lận. Nếu một người dùng bắt đầu một giao dịch l2 > l1 để rút tiền được ký quỹ trên l1, họ phải đợi cho đến khi thời gian thử thách—kéo dài khoảng bảy ngày—trôi qua. Tuy nhiên, bản thân quá trình rút tiền khá đơn giản.

Sau khi yêu cầu rút tiền được bắt đầu trên bản cuộn l2, giao dịch được đưa vào lô tiếp theo, trong khi tài sản của người dùng trên bản cuộn bị đốt. Khi lô được công bố trên Ethereum, người dùng có thể tính toán một bằng chứng Merkle xác minh sự bao gồm của giao dịch thoát của họ trong khối. Sau đó, vấn đề chỉ là chờ qua khoảng thời gian trì hoãn để hoàn tất giao dịch trên l1 và rút tiền về Mạng chính.

Để tránh phải đợi một tuần trước khi rút tiền về Ethereum, người dùng Rollup lạc quan có thể sử dụng một **nhà cung cấp thanh khoản** (LP). Một nhà cung cấp thanh khoản đảm nhận quyền sở hữu của một khoản rút tiền l2 đang chờ xử lý và thanh toán cho người dùng trên l1 (đổi lấy một khoản phí).

Các nhà cung cấp thanh khoản có thể kiểm tra tính hợp lệ của yêu cầu rút tiền của người dùng (bằng cách tự thực thi Chuỗi) trước khi giải phóng tiền. Bằng cách này, họ có sự đảm bảo rằng giao dịch cuối cùng sẽ được xác nhận (tức là tính chung cuộc không cần tin cậy).

#### 2. Khả năng tương thích với EVM {#how-do-optimistic-rollup-fees-work}

Đối với các nhà phát triển, lợi thế của các Rollup lạc quan là khả năng tương thích của chúng—hoặc tốt hơn nữa là sự tương đương—với [Máy ảo Ethereum (EVM)](/developers/docs/evm/). Các bản cuộn tương thích với EVM tuân thủ các thông số kỹ thuật trong [sách vàng Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) và hỗ trợ EVM ở cấp độ mã byte.

Khả năng tương thích với EVM trong các Rollup lạc quan có những lợi ích sau:

i. Các nhà phát triển có thể di chuyển các hợp đồng thông minh hiện có trên Ethereum sang các Chuỗi Rollup lạc quan mà không cần phải sửa đổi cơ sở mã một cách rộng rãi. Điều này có thể tiết kiệm thời gian cho các nhóm phát triển khi triển khai các hợp đồng thông minh Ethereum trên l2.

ii. Các nhà phát triển và các nhóm dự án sử dụng Rollup lạc quan có thể tận dụng cơ sở hạ tầng của Ethereum. Điều này bao gồm các ngôn ngữ lập trình, thư viện mã, công cụ kiểm tra, phần mềm máy khách, cơ sở hạ tầng triển khai, v.v.

Việc sử dụng các công cụ hiện có là rất quan trọng vì các công cụ này đã được kiểm toán, gỡ lỗi và cải thiện rộng rãi trong nhiều năm. Nó cũng loại bỏ nhu cầu các nhà phát triển Ethereum phải học cách xây dựng với một ngăn xếp phát triển hoàn toàn mới.

#### 3. Các lệnh gọi hợp đồng chuỗi chéo {#scaling-ethereum-with-optimistic-rollups}

Người dùng (Tài khoản thuộc sở hữu bên ngoài) tương tác với các hợp đồng l2 bằng cách gửi một giao dịch đến hợp đồng bản cuộn hoặc nhờ một bộ sắp xếp hoặc trình xác thực làm điều đó cho họ. Rollup lạc quan cũng cho phép các Tài khoản hợp đồng trên Ethereum tương tác với các hợp đồng l2 bằng cách sử dụng các hợp đồng cầu nối để chuyển tiếp các thông điệp và truyền dữ liệu giữa l1 và l2. Điều này có nghĩa là bạn có thể lập trình một hợp đồng l1 trên Mạng chính Ethereum để gọi các hàm thuộc về các hợp đồng trên một Rollup lạc quan l2.

Các lệnh gọi hợp đồng chuỗi chéo diễn ra không đồng bộ—nghĩa là lệnh gọi được bắt đầu trước, sau đó được thực thi vào một thời điểm muộn hơn. Điều này khác với các lệnh gọi giữa hai hợp đồng trên Ethereum, nơi lệnh gọi tạo ra kết quả ngay lập tức.

Một ví dụ về lệnh gọi hợp đồng chuỗi chéo là khoản tiền gửi token được mô tả trước đó. Một hợp đồng trên l1 ký quỹ các token của người dùng và gửi một thông điệp đến một hợp đồng l2 được ghép nối để đúc một lượng token tương đương trên bản cuộn.

Vì các lệnh gọi thông điệp chuỗi chéo dẫn đến việc thực thi hợp đồng, người gửi thường được yêu cầu trang trải [chi phí Gas](/developers/docs/gas/) cho tính toán. Nên đặt một giới hạn gas cao để ngăn giao dịch thất bại trên Chuỗi mục tiêu. Kịch bản cầu nối token là một ví dụ điển hình; nếu phía l1 của giao dịch (gửi token) hoạt động, nhưng phía l2 (đúc token mới) thất bại do Gas thấp, khoản tiền gửi sẽ trở nên không thể phục hồi.

Cuối cùng, chúng ta nên lưu ý rằng các lệnh gọi thông điệp l2 > l1 giữa các hợp đồng cần tính đến sự chậm trễ (các lệnh gọi l1 > l2 thường được thực thi sau vài phút). Điều này là do các thông điệp được gửi đến Mạng chính từ Rollup lạc quan không thể được thực thi cho đến khi cửa sổ thử thách hết hạn.

## Phí Rollup lạc quan hoạt động như thế nào? {#optimistic-rollups-pros-and-cons}

Rollup lạc quan sử dụng một cơ chế phí gas, rất giống với Ethereum, để biểu thị số tiền người dùng phải trả cho mỗi giao dịch. Phí được tính trên các Rollup lạc quan phụ thuộc vào các thành phần sau:

1. **Ghi trạng thái**: Rollup lạc quan công bố dữ liệu giao dịch và các tiêu đề block (bao gồm Mã băm tiêu đề block trước đó, gốc trạng thái, gốc lô) lên Ethereum dưới dạng một `blob`, hoặc "đối tượng nhị phân lớn". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) đã giới thiệu một giải pháp tiết kiệm chi phí để đưa dữ liệu lên chuỗi. Một `blob` là một trường giao dịch mới cho phép các bản cuộn đăng dữ liệu chuyển đổi trạng thái đã nén lên l1 của Ethereum. Không giống như `calldata`, vốn tồn tại vĩnh viễn trên chuỗi, các khối dữ liệu có thời gian tồn tại ngắn và có thể bị cắt tỉa khỏi các máy khách sau [4096 kỷ nguyên](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (khoảng 18 ngày). Bằng cách sử dụng các khối dữ liệu để đăng các lô giao dịch đã nén, các Rollup lạc quan có thể giảm đáng kể chi phí ghi các giao dịch lên l1.

2. **Gas khối dữ liệu đã sử dụng**: Các giao dịch mang khối dữ liệu sử dụng một cơ chế phí động tương tự như cơ chế được giới thiệu bởi [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Phí gas cho các giao dịch loại 3 tính đến phí cơ sở cho các khối dữ liệu, được mạng lưới xác định dựa trên nhu cầu không gian khối dữ liệu và việc sử dụng không gian khối dữ liệu của giao dịch đang được gửi.

3. **Phí nhà điều hành l2**: Đây là số tiền được trả cho các nút bản cuộn như một khoản bồi thường cho các chi phí tính toán phát sinh trong việc xử lý các giao dịch, rất giống với phí gas trên Ethereum. Các nút bản cuộn tính phí giao dịch thấp hơn vì các l2 có khả năng xử lý cao hơn và không phải đối mặt với tình trạng tắc nghẽn mạng lưới buộc các trình xác thực trên Ethereum phải ưu tiên các giao dịch có phí cao hơn.

Rollup lạc quan áp dụng một số cơ chế để giảm phí cho người dùng, bao gồm gom lô các giao dịch và nén `calldata` để giảm chi phí công bố dữ liệu. Bạn có thể kiểm tra [trình theo dõi phí l2](https://l2fees.info/) để có cái nhìn tổng quan theo thời gian thực về chi phí sử dụng các Rollup lạc quan dựa trên Ethereum.

## Rollup lạc quan mở rộng quy mô Ethereum như thế nào? {#optimistic-video}

Như đã giải thích, Rollup lạc quan công bố dữ liệu giao dịch đã nén trên Ethereum để đảm bảo tính khả dụng của dữ liệu. Khả năng nén dữ liệu được công bố trên chuỗi là rất quan trọng để mở rộng thông lượng trên Ethereum với các Rollup lạc quan.

Chuỗi Ethereum chính đặt ra các giới hạn về lượng dữ liệu mà các khối có thể chứa, được tính bằng đơn vị Gas ([kích thước khối trung bình](/developers/docs/blocks/#block-size) là 15 triệu Gas). Mặc dù điều này hạn chế lượng Gas mà mỗi giao dịch có thể sử dụng, nó cũng có nghĩa là chúng ta có thể tăng số lượng giao dịch được xử lý trên mỗi khối bằng cách giảm dữ liệu liên quan đến giao dịch—trực tiếp cải thiện khả năng mở rộng.

Rollup lạc quan sử dụng một số kỹ thuật để đạt được việc nén dữ liệu giao dịch và cải thiện tỷ lệ TPS. Ví dụ, [bài viết](https://vitalik.eth.limo/general/2021/01/05/rollup.html) này so sánh dữ liệu mà một giao dịch người dùng cơ bản (gửi ether) tạo ra trên Mạng chính so với lượng dữ liệu mà cùng một giao dịch đó tạo ra trên một bản cuộn:

| Tham số | Ethereum (l1) | Bản cuộn (l2) |
| --------- | ---------------------- | ------------- |
| Nonce | ~3 | 0 |
| Giá Gas | ~8 | 0-0.5 |
| Gas | 3 | 0-0.5 |
| Đến | 21 | 4 |
| Giá trị | 9 | ~3 |
| Chữ ký | ~68 (2 + 33 + 33) | ~0.5 |
| Từ | 0 (được khôi phục từ chữ ký) | 4 |
| **Tổng cộng** | **~112 byte** | **~12 byte** |

Thực hiện một số tính toán sơ bộ trên các số liệu này có thể giúp cho thấy những cải thiện về khả năng mở rộng mà một Rollup lạc quan mang lại:

1. Kích thước mục tiêu cho mỗi khối là 15 triệu Gas và tốn 16 Gas để xác minh một byte dữ liệu. Chia kích thước khối trung bình cho 16 Gas (15.000.000/16) cho thấy khối trung bình có thể chứa **937.500 byte dữ liệu**.
2. Nếu một giao dịch bản cuộn cơ bản sử dụng 12 byte, thì khối Ethereum trung bình có thể xử lý **78.125 giao dịch bản cuộn** (937.500/12) hoặc **39 lô bản cuộn** (nếu mỗi lô chứa trung bình 2.000 giao dịch).
3. Nếu một khối mới được sản xuất trên Ethereum mỗi 15 giây, thì tốc độ xử lý của bản cuộn sẽ lên tới khoảng **5.208 giao dịch mỗi giây**. Điều này được thực hiện bằng cách chia số lượng giao dịch bản cuộn cơ bản mà một khối Ethereum có thể chứa (**78.125**) cho thời gian tạo khối trung bình (**15 giây**).

Đây là một ước tính khá lạc quan, vì các giao dịch Rollup lạc quan không thể bao gồm toàn bộ một khối trên Ethereum. Tuy nhiên, nó có thể đưa ra một ý tưởng sơ bộ về mức độ tăng trưởng khả năng mở rộng mà các Rollup lạc quan có thể mang lại cho người dùng Ethereum (các triển khai hiện tại cung cấp lên đến 2.000 TPS).

Việc giới thiệu [phân mảnh dữ liệu](/roadmap/danksharding/) trên Ethereum dự kiến sẽ cải thiện khả năng mở rộng trong các Rollup lạc quan. Bởi vì các giao dịch bản cuộn phải chia sẻ không gian khối với các giao dịch không phải bản cuộn khác, khả năng xử lý của chúng bị giới hạn bởi thông lượng dữ liệu trên Chuỗi Ethereum chính. danksharding sẽ tăng không gian có sẵn cho các Chuỗi l2 để công bố dữ liệu trên mỗi khối, sử dụng lưu trữ "khối dữ liệu" rẻ hơn, không lâu dài thay vì `CALLDATA` đắt tiền, lâu dài.

### Ưu điểm và nhược điểm của Rollup lạc quan {#further-reading-on-optimistic-rollups}

| Ưu điểm | Nhược điểm |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cung cấp những cải thiện lớn về khả năng mở rộng mà không hy sinh bảo mật hoặc tính không cần niềm tin. | Sự chậm trễ trong tính chung cuộc của giao dịch do các thử thách gian lận tiềm ẩn. |
| Dữ liệu giao dịch được lưu trữ trên Chuỗi lớp 1, cải thiện tính minh bạch, bảo mật, khả năng chống kiểm duyệt và sự phi tập trung. | Các nhà điều hành bản cuộn tập trung (bộ sắp xếp) có thể ảnh hưởng đến việc sắp xếp thứ tự giao dịch. |
| Việc chứng minh gian lận đảm bảo tính chung cuộc không cần tin cậy và cho phép các nhóm thiểu số trung thực bảo mật Chuỗi. | Nếu không có các nút trung thực, một nhà điều hành độc hại có thể đánh cắp tiền bằng cách đăng các khối và cam kết trạng thái không hợp lệ. |
| Việc tính toán các bằng chứng gian lận được mở cho nút l2 thông thường, không giống như các bằng chứng hợp lệ (được sử dụng trong ZK-rollup) yêu cầu phần cứng đặc biệt. | Mô hình bảo mật dựa vào ít nhất một nút trung thực thực thi các giao dịch bản cuộn và gửi các bằng chứng gian lận để thách thức các quá trình chuyển đổi trạng thái không hợp lệ. |
| Các bản cuộn được hưởng lợi từ "tính hoạt động không cần tin cậy" (bất kỳ ai cũng có thể buộc Chuỗi tiến lên bằng cách thực thi các giao dịch và đăng các khẳng định) | Người dùng phải đợi thời gian thử thách một tuần hết hạn trước khi rút tiền về Ethereum. |
| Rollup lạc quan dựa vào các động lực kinh tế mật mã được thiết kế tốt để tăng cường bảo mật trên Chuỗi. | Các bản cuộn phải đăng tất cả dữ liệu giao dịch trên chuỗi, điều này có thể làm tăng chi phí. |
| Khả năng tương thích với EVM và Solidity cho phép các nhà phát triển chuyển các hợp đồng thông minh gốc Ethereum sang các bản cuộn hoặc sử dụng các công cụ hiện có để tạo các dapp mới. |

### Giải thích trực quan về Rollup lạc quan {#tutorials}

Bạn thích học qua hình ảnh hơn? Hãy xem Finematics giải thích về Rollup lạc quan:

<VideoWatch slug="rollups-scaling-strategy" startTime="263" />

## Đọc thêm về Rollup lạc quan

- [Rollup lạc quan hoạt động như thế nào (Hướng dẫn hoàn chỉnh)](https://www.alchemy.com/overviews/optimistic-rollups)
- [Rollup Chuỗi khối là gì? Giới thiệu kỹ thuật](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [Hướng dẫn thiết yếu về Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [Hướng dẫn thực tế về các bản cuộn Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [Trạng thái của các bằng chứng gian lận trong các l2 của Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Rollup của Optimism thực sự hoạt động như thế nào?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Đi sâu vào OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Máy ảo lạc quan là gì?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Hướng dẫn: Rollup lạc quan và cầu nối trên Ethereum

- [Hướng dẫn chi tiết về hợp đồng cầu nối tiêu chuẩn của Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Một hướng dẫn chi tiết về mã có chú thích của cầu nối tiêu chuẩn Optimism để di chuyển tài sản giữa l1 và l2._