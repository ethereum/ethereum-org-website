---
title: Xác minh hợp đồng thông minh
description: Tổng quan về xác minh mã nguồn cho hợp đồng thông minh Ethereum
lang: vi
---

[Hợp đồng thông minh](/developers/docs/smart-contracts/) được thiết kế để "không cần tin cậy", có nghĩa là người dùng không cần phải tin tưởng các bên thứ ba (ví dụ: nhà phát triển và công ty) trước khi tương tác với một hợp đồng. Là một điều kiện tiên quyết cho việc không cần tin cậy, người dùng và các nhà phát triển khác phải có khả năng xác minh mã nguồn của một hợp đồng thông minh. Việc xác minh mã nguồn đảm bảo cho người dùng và nhà phát triển rằng mã hợp đồng đã công bố giống với mã đang chạy tại địa chỉ hợp đồng trên chuỗi khối Ethereum.

Điều quan trọng là phải phân biệt giữa "xác minh mã nguồn" và "[xác minh chính thức](/developers/docs/smart-contracts/formal-verification/)". Xác minh mã nguồn, sẽ được giải thích chi tiết bên dưới, đề cập đến việc xác minh rằng mã nguồn đã cho của một hợp đồng thông minh bằng ngôn ngữ cấp cao (ví dụ: Solidity) biên dịch thành cùng một chỉ thị biên dịch để được thực thi tại địa chỉ hợp đồng. Tuy nhiên, xác minh chính thức mô tả việc xác minh tính đúng đắn của một hợp đồng thông minh, có nghĩa là hợp đồng hoạt động như mong đợi. Mặc dù phụ thuộc vào ngữ cảnh, việc xác minh hợp đồng thường đề cập đến việc xác minh mã nguồn.

## Xác minh mã nguồn là gì? {#what-is-source-code-verification}

Trước khi triển khai một hợp đồng thông minh trong [Máy ảo Ethereum (EVM)](/developers/docs/evm/), các nhà phát triển [biên dịch](/developers/docs/smart-contracts/compiling/) mã nguồn của hợp đồng — các hướng dẫn [được viết bằng Solidity](/developers/docs/smart-contracts/languages/) hoặc một ngôn ngữ lập trình cấp cao khác — thành chỉ thị biên dịch. Vì EVM không thể diễn giải các hướng dẫn cấp cao, việc biên dịch mã nguồn thành chỉ thị biên dịch (tức là các hướng dẫn máy cấp thấp) là cần thiết để thực thi logic hợp đồng trong EVM.

Xác minh mã nguồn là so sánh mã nguồn của một hợp đồng thông minh và chỉ thị biên dịch đã biên dịch được sử dụng trong quá trình tạo hợp đồng để phát hiện bất kỳ sự khác biệt nào. Việc xác minh hợp đồng thông minh là quan trọng vì mã hợp đồng được quảng cáo có thể khác với mã chạy trên chuỗi khối.

Việc xác minh hợp đồng thông minh cho phép điều tra những gì một hợp đồng thực hiện thông qua ngôn ngữ cấp cao hơn mà nó được viết, mà không cần phải đọc mã máy. Các hàm, giá trị và thường là tên biến và nhận xét vẫn giống với mã nguồn gốc được biên dịch và triển khai. Điều này làm cho việc đọc mã dễ dàng hơn nhiều. Xác minh nguồn cũng cung cấp tài liệu tham khảo mã, để người dùng cuối biết hợp đồng thông minh được thiết kế để làm gì.

### Xác minh đầy đủ là gì? {#full-verification}

Có một số phần của mã nguồn không ảnh hưởng đến chỉ thị biên dịch đã biên dịch, chẳng hạn như nhận xét hoặc tên biến. Điều đó có nghĩa là hai mã nguồn có tên biến khác nhau và nhận xét khác nhau đều có thể xác minh cùng một hợp đồng. Với điều đó, một tác nhân độc hại có thể thêm các nhận xét lừa đảo hoặc đặt tên biến gây hiểu lầm bên trong mã nguồn và được xác minh hợp đồng với một mã nguồn khác với mã nguồn gốc.

Có thể tránh điều này bằng cách nối thêm dữ liệu bổ sung vào chỉ thị biên dịch để làm _đảm bảo mật mã_ cho tính chính xác của mã nguồn và làm _dấu vân tay_ của thông tin biên dịch. Thông tin cần thiết được tìm thấy trong [siêu dữ liệu hợp đồng của Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), và hàm băm của tệp này được nối vào chỉ thị biên dịch của một hợp đồng. Bạn có thể thấy nó hoạt động trong [sân chơi siêu dữ liệu](https://playground.sourcify.dev)

Tệp siêu dữ liệu chứa thông tin về việc biên dịch hợp đồng bao gồm các tệp nguồn và hàm băm của chúng. Nghĩa là, nếu bất kỳ cài đặt biên dịch nào hoặc thậm chí một byte trong một trong các tệp nguồn thay đổi, tệp siêu dữ liệu sẽ thay đổi. Do đó, hàm băm của tệp siêu dữ liệu, được nối vào chỉ thị biên dịch, cũng thay đổi. Điều đó có nghĩa là nếu chỉ thị biên dịch của hợp đồng + hàm băm siêu dữ liệu được nối vào khớp với mã nguồn và cài đặt biên dịch đã cho, chúng ta có thể chắc chắn rằng đây chính xác là cùng một mã nguồn được sử dụng trong quá trình biên dịch ban đầu, không có một byte nào khác.

Loại xác minh này tận dụng hàm băm siêu dữ liệu được gọi là **"[xác minh đầy đủ](https://docs.sourcify.dev/docs/full-vs-partial-match/)"** (cũng là "xác minh hoàn hảo"). Nếu các hàm băm siêu dữ liệu không khớp hoặc không được xem xét trong quá trình xác minh, đó sẽ là một "kết quả khớp một phần", hiện là cách phổ biến hơn để xác minh hợp đồng. Có thể [chèn mã độc hại](https://samczsun.com/hiding-in-plain-sight/) mà sẽ không được phản ánh trong mã nguồn đã xác minh nếu không có xác minh đầy đủ. Hầu hết các nhà phát triển không biết về xác minh đầy đủ và không giữ tệp siêu dữ liệu của quá trình biên dịch của họ, do đó xác minh một phần đã là phương pháp trên thực tế để xác minh hợp đồng cho đến nay.

## Tại sao việc xác minh mã nguồn lại quan trọng? {#importance-of-source-code-verification}

### Tính không cần tin cậy {#trustlessness}

Tính không cần tin cậy được cho là tiền đề lớn nhất cho các hợp đồng thông minh và [các ứng dụng phi tập trung (dapps)](/developers/docs/dapps/). Các hợp đồng thông minh là "bất biến" và không thể thay đổi; một hợp đồng sẽ chỉ thực thi logic kinh doanh được xác định trong mã tại thời điểm triển khai. Điều này có nghĩa là các nhà phát triển và doanh nghiệp không thể can thiệp vào mã của hợp đồng sau khi triển khai trên Ethereum.

Để một hợp đồng thông minh không cần tin cậy, mã hợp đồng phải có sẵn để xác minh độc lập. Mặc dù chỉ thị biên dịch đã biên dịch cho mọi hợp đồng thông minh đều có sẵn công khai trên chuỗi khối, nhưng ngôn ngữ cấp thấp rất khó hiểu — đối với cả nhà phát triển và người dùng.

Các dự án giảm bớt các giả định về sự tin cậy bằng cách công bố mã nguồn của các hợp đồng của họ. Nhưng điều này dẫn đến một vấn đề khác: rất khó để xác minh rằng mã nguồn đã xuất bản khớp với chỉ thị biên dịch của hợp đồng. Trong trường hợp này, giá trị của tính không cần tin cậy bị mất đi vì người dùng phải tin tưởng các nhà phát triển sẽ không thay đổi logic kinh doanh của hợp đồng (tức là bằng cách thay đổi chỉ thị biên dịch) trước khi triển khai nó trên chuỗi khối.

Các công cụ xác minh mã nguồn cung cấp sự đảm bảo rằng các tệp mã nguồn của hợp đồng thông minh khớp với mã hợp ngữ. Kết quả là một hệ sinh thái không cần tin cậy, nơi người dùng không tin tưởng một cách mù quáng vào các bên thứ ba mà thay vào đó xác minh mã trước khi gửi tiền vào hợp đồng.

### An toàn cho Người dùng {#user-safety}

Với các hợp đồng thông minh, thường có rất nhiều tiền bị đe dọa. Điều này đòi hỏi sự đảm bảo an ninh cao hơn và xác minh logic của một hợp đồng thông minh trước khi sử dụng nó. Vấn đề là các nhà phát triển vô đạo đức có thể lừa dối người dùng bằng cách chèn mã độc hại vào một hợp đồng thông minh. Nếu không có xác minh, các hợp đồng thông minh độc hại có thể có [cửa hậu](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), các cơ chế kiểm soát truy cập gây tranh cãi, các lỗ hổng có thể bị khai thác và những thứ khác gây nguy hiểm cho sự an toàn của người dùng mà không bị phát hiện.

Việc công bố các tệp mã nguồn của một hợp đồng thông minh giúp những người quan tâm, chẳng hạn như kiểm toán viên, đánh giá hợp đồng để tìm các véc-tơ tấn công tiềm ẩn dễ dàng hơn. Với nhiều bên độc lập xác minh một hợp đồng thông minh, người dùng có sự đảm bảo mạnh mẽ hơn về tính bảo mật của nó.

## Cách xác minh mã nguồn cho các hợp đồng thông minh Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Việc triển khai một hợp đồng thông minh trên Ethereum](/developers/docs/smart-contracts/deploying/) yêu cầu gửi một giao dịch có tải trọng dữ liệu (chỉ thị biên dịch đã biên dịch) đến một địa chỉ đặc biệt. Tải trọng dữ liệu được tạo bằng cách biên dịch mã nguồn, cộng với các [đối số hàm khởi tạo](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) của phiên bản hợp đồng được nối vào tải trọng dữ liệu trong giao dịch. Biên dịch có tính xác định, có nghĩa là nó luôn tạo ra cùng một đầu ra (tức là chỉ thị biên dịch hợp đồng) nếu cùng một tệp nguồn và cài đặt biên dịch (ví dụ: phiên bản trình biên dịch, trình tối ưu hóa) được sử dụng.

![Sơ đồ hiển thị việc xác minh mã nguồn hợp đồng thông minh](./source-code-verification.png)

Việc xác minh một hợp đồng thông minh về cơ bản bao gồm các bước sau:

1. Nhập các tệp nguồn và cài đặt biên dịch vào trình biên dịch.

2. Trình biên dịch xuất ra chỉ thị biên dịch của hợp đồng

3. Lấy chỉ thị biên dịch của hợp đồng đã triển khai tại một địa chỉ nhất định

4. So sánh chỉ thị biên dịch đã triển khai với chỉ thị biên dịch đã biên dịch lại. Nếu các mã khớp nhau, hợp đồng sẽ được xác minh với mã nguồn và cài đặt biên dịch đã cho.

5. Ngoài ra, nếu các hàm băm siêu dữ liệu ở cuối chỉ thị biên dịch khớp nhau, đó sẽ là một kết quả khớp hoàn toàn.

Lưu ý rằng đây là một mô tả đơn giản về xác minh và có nhiều ngoại lệ sẽ không hoạt động với điều này, chẳng hạn như có [các biến bất biến](https://docs.sourcify.dev/docs/immutables/).

## Các công cụ xác minh mã nguồn {#source-code-verification-tools}

Quy trình xác minh hợp đồng truyền thống có thể phức tạp. Đây là lý do tại sao chúng tôi có các công cụ để xác minh mã nguồn cho các hợp đồng thông minh được triển khai trên Ethereum. Các công cụ này tự động hóa phần lớn quá trình xác minh mã nguồn và cũng quản lý các hợp đồng đã xác minh vì lợi ích của người dùng.

### Etherscan {#etherscan}

Mặc dù chủ yếu được biết đến như một [trình khám phá chuỗi khối Ethereum](/developers/docs/data-and-analytics/block-explorers/), Etherscan cũng cung cấp [dịch vụ xác minh mã nguồn](https://etherscan.io/verifyContract) cho các nhà phát triển và người dùng hợp đồng thông minh.

Etherscan cho phép bạn biên dịch lại chỉ thị biên dịch của hợp đồng từ tải trọng dữ liệu gốc (mã nguồn, địa chỉ thư viện, cài đặt trình biên dịch, địa chỉ hợp đồng, v.v.) Nếu chỉ thị biên dịch được biên dịch lại được liên kết với chỉ thị biên dịch (và các tham số của hàm tạo) của hợp đồng trên chuỗi, thì [hợp đồng được xác minh](https://info.etherscan.com/types-of-contract-verification/).

Sau khi được xác minh, mã nguồn của hợp đồng của bạn sẽ nhận được nhãn "Đã xác minh" và được xuất bản trên Etherscan để những người khác kiểm tra. Nó cũng được thêm vào phần [Hợp đồng đã xác minh](https://etherscan.io/contractsVerified/) — một kho lưu trữ các hợp đồng thông minh có mã nguồn đã được xác minh.

Etherscan là công cụ được sử dụng nhiều nhất để xác minh hợp đồng. Tuy nhiên, việc xác minh hợp đồng của Etherscan có một nhược điểm: nó không thể so sánh **hàm băm siêu dữ liệu** của chỉ thị biên dịch trên chuỗi và chỉ thị biên dịch đã được biên dịch lại. Do đó, các kết quả trùng khớp trong Etherscan là các kết quả khớp một phần.

[Tìm hiểu thêm về xác minh hợp đồng trên Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) là một trình khám phá chuỗi khối mã nguồn mở cũng cung cấp [dịch vụ xác minh hợp đồng](https://eth.blockscout.com/contract-verification) cho các nhà phát triển và người dùng hợp đồng thông minh. Là một giải pháp thay thế mã nguồn mở, Blockscout cung cấp sự minh bạch trong cách thực hiện xác minh và cho phép cộng đồng đóng góp để cải thiện quy trình xác minh.

Tương tự như các dịch vụ xác minh khác, Blockscout cho phép bạn xác minh mã nguồn hợp đồng của mình bằng cách biên dịch lại chỉ thị biên dịch và so sánh nó với hợp đồng đã triển khai. Sau khi được xác minh, hợp đồng của bạn sẽ nhận được trạng thái xác minh và mã nguồn sẽ được công khai để kiểm tra và tương tác. Các hợp đồng đã xác minh cũng được liệt kê trong [kho lưu trữ hợp đồng đã xác minh](https://eth.blockscout.com/verified-contracts) của Blockscout để dễ dàng duyệt và khám phá.

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) là một công cụ khác để xác minh các hợp đồng có mã nguồn mở và phi tập trung. Nó không phải là một trình khám phá khối và chỉ xác minh các hợp đồng trên [các mạng dựa trên EVM khác nhau](https://docs.sourcify.dev/docs/chains). Nó hoạt động như một cơ sở hạ tầng công cộng để các công cụ khác xây dựng trên đó, và nhằm mục đích cho phép các tương tác hợp đồng thân thiện với con người hơn bằng cách sử dụng [ABI](/developers/docs/smart-contracts/compiling/#web-applications) và các nhận xét [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) được tìm thấy trong tệp siêu dữ liệu.

Không giống như Etherscan, Sourcify hỗ trợ các kết quả khớp hoàn toàn với hàm băm siêu dữ liệu. Các hợp đồng đã xác minh được phục vụ trong [kho lưu trữ công khai](https://docs.sourcify.dev/docs/repository/) của nó trên HTTP và [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), đây là một bộ lưu trữ phi tập trung, [có thể định địa chỉ nội dung](https://docs.storacha.network/concepts/content-addressing/). Điều này cho phép tìm nạp tệp siêu dữ liệu của hợp đồng qua IPFS vì hàm băm siêu dữ liệu được nối vào là một hàm băm IPFS.

Ngoài ra, người ta cũng có thể truy xuất các tệp mã nguồn qua IPFS, vì các hàm băm IPFS của các tệp này cũng được tìm thấy trong siêu dữ liệu. Một hợp đồng có thể được xác minh bằng cách cung cấp tệp siêu dữ liệu và các tệp nguồn qua Giao diện Lập trình Ứng dụng của nó hoặc [Giao diện Người dùng](https://sourcify.dev/#/verifier), hoặc sử dụng các plugin. Công cụ giám sát của Sourcify cũng lắng nghe việc tạo hợp đồng trên các khối mới và cố gắng xác minh các hợp đồng nếu siêu dữ liệu và tệp nguồn của chúng được xuất bản trên IPFS.

[Thông tin thêm về việc xác minh hợp đồng trên Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Nền tảng Tenderly](https://tenderly.co/) cho phép các nhà phát triển Web3 xây dựng, kiểm tra, giám sát và vận hành các hợp đồng thông minh. Kết hợp các công cụ gỡ lỗi với khả năng quan sát và các khối xây dựng cơ sở hạ tầng, Tenderly giúp các nhà phát triển tăng tốc phát triển hợp đồng thông minh. Để kích hoạt đầy đủ các tính năng của Tenderly, các nhà phát triển cần [thực hiện xác minh mã nguồn](https://docs.tenderly.co/monitoring/contract-verification) bằng một số phương pháp.

Có thể xác minh hợp đồng một cách riêng tư hoặc công khai. Nếu được xác minh riêng tư, hợp đồng thông minh chỉ hiển thị với bạn (và các thành viên khác trong dự án của bạn). Việc xác minh một hợp đồng công khai sẽ làm cho nó hiển thị với mọi người sử dụng nền tảng Tenderly.

Bạn có thể xác minh các hợp đồng của mình bằng [Bảng điều khiển](https://docs.tenderly.co/contract-verification), [plugin Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat), hoặc [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Khi xác minh hợp đồng thông qua Bảng điều khiển, bạn cần nhập tệp nguồn hoặc tệp siêu dữ liệu được tạo bởi trình biên dịch Solidity, địa chỉ/mạng và cài đặt trình biên dịch.

Sử dụng plugin Tenderly Hardhat cho phép kiểm soát nhiều hơn đối với quá trình xác minh với ít nỗ lực hơn, cho phép bạn lựa chọn giữa xác minh tự động (không cần mã) và thủ công (dựa trên mã).

## Đọc thêm {#further-reading}

- [Xác minh mã nguồn hợp đồng](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
