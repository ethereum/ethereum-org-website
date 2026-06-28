---
title: "Xác minh hợp đồng thông minh"
description: "Tổng quan về xác minh mã nguồn cho các hợp đồng thông minh Ethereum"
lang: vi
---

[Hợp đồng thông minh](/developers/docs/smart-contracts/) được thiết kế để "không cần tin cậy", nghĩa là người dùng không cần phải tin tưởng các bên thứ ba (ví dụ: nhà phát triển và công ty) trước khi tương tác với một hợp đồng. Như một điều kiện tiên quyết cho tính không cần niềm tin, người dùng và các nhà phát triển khác phải có khả năng xác minh mã nguồn của hợp đồng thông minh. Việc xác minh mã nguồn đảm bảo với người dùng và nhà phát triển rằng mã hợp đồng được công bố chính là mã đang chạy tại địa chỉ hợp đồng trên chuỗi khối Ethereum.

Điều quan trọng là phải phân biệt giữa "xác minh mã nguồn" và "[xác minh hình thức](/developers/docs/smart-contracts/formal-verification/)". Xác minh mã nguồn, sẽ được giải thích chi tiết dưới đây, đề cập đến việc xác minh rằng mã nguồn đã cho của một hợp đồng thông minh bằng ngôn ngữ bậc cao (ví dụ: Solidity) biên dịch ra cùng một mã byte sẽ được thực thi tại địa chỉ hợp đồng. Tuy nhiên, xác minh hình thức mô tả việc xác minh tính đúng đắn của một hợp đồng thông minh, nghĩa là hợp đồng hoạt động như mong đợi. Mặc dù phụ thuộc vào ngữ cảnh, việc xác minh hợp đồng thường đề cập đến xác minh mã nguồn.

## Xác minh mã nguồn là gì? {#what-is-source-code-verification}

Trước khi triển khai một hợp đồng thông minh trên [Máy ảo Ethereum (EVM)](/developers/docs/evm/), các nhà phát triển [biên dịch](/developers/docs/smart-contracts/compiling/) mã nguồn của hợp đồng—các chỉ thị [được viết bằng Solidity](/developers/docs/smart-contracts/languages/) hoặc một ngôn ngữ lập trình bậc cao khác—thành mã byte. Vì EVM không thể diễn giải các chỉ thị bậc cao, việc biên dịch mã nguồn thành mã byte (tức là các chỉ thị máy bậc thấp) là cần thiết để thực thi logic hợp đồng trong EVM.

Xác minh mã nguồn là việc so sánh mã nguồn của một hợp đồng thông minh và mã byte đã biên dịch được sử dụng trong quá trình tạo hợp đồng để phát hiện bất kỳ sự khác biệt nào. Việc xác minh hợp đồng thông minh rất quan trọng vì mã hợp đồng được quảng bá có thể khác với những gì đang chạy trên chuỗi khối.

Việc xác minh hợp đồng thông minh cho phép điều tra xem một hợp đồng làm gì thông qua ngôn ngữ bậc cao mà nó được viết, mà không cần phải đọc mã máy. Các hàm, giá trị, và thường là tên biến cùng các chú thích vẫn giữ nguyên như mã nguồn gốc được biên dịch và triển khai. Điều này làm cho việc đọc mã dễ dàng hơn nhiều. Xác minh mã nguồn cũng cung cấp tài liệu về mã, để người dùng cuối biết hợp đồng thông minh được thiết kế để làm gì.

### Xác minh toàn bộ là gì? {#full-verification}

Có một số phần của mã nguồn không ảnh hưởng đến mã byte đã biên dịch như các chú thích hoặc tên biến. Điều đó có nghĩa là hai mã nguồn với tên biến khác nhau và chú thích khác nhau đều có thể xác minh cùng một hợp đồng. Với điều đó, một kẻ xấu có thể thêm các chú thích lừa dối hoặc đặt tên biến gây hiểu lầm bên trong mã nguồn và làm cho hợp đồng được xác minh bằng một mã nguồn khác với mã nguồn gốc.

Có thể tránh điều này bằng cách nối thêm dữ liệu vào mã byte để đóng vai trò như một _đảm bảo mật mã_ cho tính chính xác của mã nguồn, và như một _dấu vân tay_ của thông tin biên dịch. Thông tin cần thiết được tìm thấy trong [siêu dữ liệu hợp đồng của Solidity](https://docs.soliditylang.org/en/v0.8.15/metadata.html), và mã băm của tệp này được nối vào mã byte của một hợp đồng. Bạn có thể xem nó hoạt động trong [sân chơi siêu dữ liệu](https://playground.sourcify.dev)

Tệp siêu dữ liệu chứa thông tin về việc biên dịch hợp đồng bao gồm các tệp nguồn và mã băm của chúng. Nghĩa là, nếu bất kỳ cài đặt biên dịch nào hoặc thậm chí một byte trong một trong các tệp nguồn thay đổi, tệp siêu dữ liệu sẽ thay đổi. Do đó, mã băm của tệp siêu dữ liệu, được nối vào mã byte, cũng thay đổi. Điều đó có nghĩa là nếu mã byte của hợp đồng + mã băm siêu dữ liệu được nối khớp với mã nguồn và cài đặt biên dịch đã cho, chúng ta có thể chắc chắn đây chính xác là mã nguồn được sử dụng trong lần biên dịch gốc, không có dù chỉ một byte khác biệt.

Loại xác minh tận dụng mã băm siêu dữ liệu này được gọi là **"[xác minh toàn bộ](https://docs.sourcify.dev/docs/full-vs-partial-match/)"** (còn gọi là "xác minh hoàn hảo"). Nếu các mã băm siêu dữ liệu không khớp hoặc không được xem xét trong quá trình xác minh, nó sẽ là một "khớp một phần", hiện là cách phổ biến hơn để xác minh hợp đồng. Có thể [chèn mã độc](https://samczsun.com/hiding-in-plain-sight/) mà không được phản ánh trong mã nguồn đã xác minh nếu không có xác minh toàn bộ. Hầu hết các nhà phát triển không nhận thức được việc xác minh toàn bộ và không giữ lại tệp siêu dữ liệu của lần biên dịch của họ, do đó xác minh một phần đã trở thành phương pháp thực tế để xác minh hợp đồng cho đến nay.

## Tại sao xác minh mã nguồn lại quan trọng? {#importance-of-source-code-verification}

### Tính không cần niềm tin {#trustlessness}

Tính không cần niềm tin được cho là tiền đề lớn nhất cho các hợp đồng thông minh và [ứng dụng phi tập trung (dapp)](/developers/docs/dapps/). Các hợp đồng thông minh là "bất biến" và không thể bị thay đổi; một hợp đồng sẽ chỉ thực thi logic nghiệp vụ được định nghĩa trong mã tại thời điểm triển khai. Điều này có nghĩa là các nhà phát triển và doanh nghiệp không thể can thiệp vào mã của hợp đồng sau khi triển khai trên Ethereum.

Để một hợp đồng thông minh không cần tin cậy, mã hợp đồng phải có sẵn để xác minh độc lập. Mặc dù mã byte đã biên dịch cho mọi hợp đồng thông minh đều có sẵn công khai trên chuỗi khối, ngôn ngữ bậc thấp rất khó hiểu—đối với cả nhà phát triển và người dùng.

Các dự án giảm thiểu các giả định tin cậy bằng cách công bố mã nguồn của các hợp đồng của họ. Nhưng điều này dẫn đến một vấn đề khác: rất khó để xác minh rằng mã nguồn được công bố khớp với mã byte của hợp đồng. Trong kịch bản này, giá trị của tính không cần niềm tin bị mất đi vì người dùng phải tin tưởng các nhà phát triển không thay đổi logic nghiệp vụ của hợp đồng (tức là bằng cách thay đổi mã byte) trước khi triển khai nó trên chuỗi khối.

Các công cụ xác minh mã nguồn cung cấp sự đảm bảo rằng các tệp mã nguồn của một hợp đồng thông minh khớp với mã hợp ngữ. Kết quả là một hệ sinh thái không cần tin cậy, nơi người dùng không mù quáng tin tưởng các bên thứ ba mà thay vào đó xác minh mã trước khi nạp tiền vào một hợp đồng.

### An toàn cho người dùng {#user-safety}

Với các hợp đồng thông minh, thường có rất nhiều tiền được đặt cọc. Điều này đòi hỏi các đảm bảo bảo mật cao hơn và việc xác minh logic của một hợp đồng thông minh trước khi sử dụng nó. Vấn đề là các nhà phát triển vô đạo đức có thể lừa dối người dùng bằng cách chèn mã độc vào một hợp đồng thông minh. Nếu không có xác minh, các hợp đồng thông minh độc hại có thể có [cửa hậu (backdoor)](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), các cơ chế kiểm soát truy cập gây tranh cãi, các lỗ hổng có thể bị khai thác, và những thứ khác gây nguy hiểm cho sự an toàn của người dùng mà không bị phát hiện.

Việc công bố các tệp mã nguồn của một hợp đồng thông minh giúp những người quan tâm, chẳng hạn như các kiểm toán viên, dễ dàng đánh giá hợp đồng về các vectơ tấn công tiềm ẩn. Với nhiều bên độc lập xác minh một hợp đồng thông minh, người dùng có những đảm bảo mạnh mẽ hơn về tính bảo mật của nó.

## Cách xác minh mã nguồn cho các hợp đồng thông minh Ethereum {#source-code-verification-for-ethereum-smart-contracts}

[Việc triển khai một hợp đồng thông minh trên Ethereum](/developers/docs/smart-contracts/deploying/) yêu cầu gửi một giao dịch với tải trọng dữ liệu (mã byte đã biên dịch) đến một địa chỉ đặc biệt. Tải trọng dữ liệu được tạo ra bằng cách biên dịch mã nguồn, cộng với các [đối số hàm khởi tạo](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) của phiên bản hợp đồng được nối vào tải trọng dữ liệu trong giao dịch. Việc biên dịch mang tính tất định, nghĩa là nó luôn tạo ra cùng một đầu ra (tức là mã byte của hợp đồng) nếu sử dụng cùng các tệp nguồn và cài đặt biên dịch (ví dụ: phiên bản trình biên dịch, trình tối ưu hóa).

![A diagram showing showing smart contract source code verification](./source-code-verification.png)

Việc xác minh một hợp đồng thông minh về cơ bản bao gồm các bước sau:

1. Nhập các tệp nguồn và cài đặt biên dịch vào một trình biên dịch.

2. Trình biên dịch xuất ra mã byte của hợp đồng.

3. Lấy mã byte của hợp đồng đã triển khai tại một địa chỉ nhất định.

4. So sánh mã byte đã triển khai với mã byte được biên dịch lại. Nếu các mã khớp nhau, hợp đồng được xác minh với mã nguồn và cài đặt biên dịch đã cho.

5. Ngoài ra, nếu các mã băm siêu dữ liệu ở cuối mã byte khớp nhau, nó sẽ là một sự trùng khớp toàn bộ.

Lưu ý rằng đây là một mô tả đơn giản hóa về việc xác minh và có nhiều ngoại lệ sẽ không hoạt động với cách này, chẳng hạn như việc có các [biến bất biến](https://docs.sourcify.dev/docs/immutables/).

## Các công cụ xác minh mã nguồn {#source-code-verification-tools}

Quá trình xác minh hợp đồng truyền thống có thể phức tạp. Đây là lý do tại sao chúng ta có các công cụ để xác minh mã nguồn cho các hợp đồng thông minh được triển khai trên Ethereum. Các công cụ này tự động hóa phần lớn việc xác minh mã nguồn và cũng tuyển chọn các hợp đồng đã được xác minh vì lợi ích của người dùng.

### Etherscan {#etherscan}

Mặc dù chủ yếu được biết đến như một [trình khám phá chuỗi khối Ethereum](/developers/docs/data-and-analytics/block-explorers/), Etherscan cũng cung cấp một [dịch vụ xác minh mã nguồn](https://etherscan.io/verifyContract) cho các nhà phát triển và người dùng hợp đồng thông minh.

Etherscan cho phép bạn biên dịch lại mã byte của hợp đồng từ tải trọng dữ liệu gốc (mã nguồn, địa chỉ thư viện, cài đặt trình biên dịch, địa chỉ hợp đồng, v.v.). Nếu mã byte được biên dịch lại liên kết với mã byte (và các tham số hàm khởi tạo) của hợp đồng trên chuỗi, thì [hợp đồng được xác minh](https://info.etherscan.com/types-of-contract-verification/).

Sau khi được xác minh, mã nguồn hợp đồng của bạn nhận được nhãn "Verified" (Đã xác minh) và được công bố trên Etherscan để những người khác kiểm toán. Nó cũng được thêm vào phần [Hợp đồng đã xác minh](https://etherscan.io/contractsVerified/)—một kho lưu trữ các hợp đồng thông minh với mã nguồn đã được xác minh.

Etherscan là công cụ được sử dụng nhiều nhất để xác minh hợp đồng. Tuy nhiên, việc xác minh hợp đồng của Etherscan có một nhược điểm: nó không so sánh **mã băm siêu dữ liệu** của mã byte trên chuỗi và mã byte được biên dịch lại. Do đó, các kết quả khớp trong Etherscan là khớp một phần.

[Tìm hiểu thêm về việc xác minh hợp đồng trên Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) là một trình khám phá chuỗi khối mã nguồn mở cũng cung cấp một [dịch vụ xác minh hợp đồng](https://eth.blockscout.com/contract-verification) cho các nhà phát triển và người dùng hợp đồng thông minh. Là một giải pháp thay thế mã nguồn mở, Blockscout mang lại sự minh bạch trong cách thực hiện xác minh và cho phép cộng đồng đóng góp để cải thiện quá trình xác minh.

Tương tự như các dịch vụ xác minh khác, Blockscout cho phép bạn xác minh mã nguồn hợp đồng của mình bằng cách biên dịch lại mã byte và so sánh nó với hợp đồng đã triển khai. Sau khi được xác minh, hợp đồng của bạn nhận được trạng thái xác minh và mã nguồn trở nên công khai để kiểm toán và tương tác. Các hợp đồng đã xác minh cũng được liệt kê trong [kho lưu trữ hợp đồng đã xác minh](https://eth.blockscout.com/verified-contracts) của Blockscout để dễ dàng duyệt và khám phá.

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) là một công cụ khác để xác minh hợp đồng có mã nguồn mở và phi tập trung. Nó không phải là một trình khám phá khối và chỉ xác minh các hợp đồng trên [các mạng lưới dựa trên EVM khác nhau](https://docs.sourcify.dev/docs/chains). Nó hoạt động như một cơ sở hạ tầng công cộng để các công cụ khác xây dựng trên đó, và nhằm mục đích cho phép các tương tác hợp đồng thân thiện với con người hơn bằng cách sử dụng [ABI](/developers/docs/smart-contracts/compiling/#web-applications) và các chú thích [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) được tìm thấy trong tệp siêu dữ liệu.

Không giống như Etherscan, Sourcify hỗ trợ khớp toàn bộ với mã băm siêu dữ liệu. Các hợp đồng đã xác minh được phục vụ trong [kho lưu trữ công khai](https://docs.sourcify.dev/docs/repository/) của nó trên HTTP và [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), là một bộ lưu trữ phi tập trung, [được định địa chỉ theo nội dung](https://docs.storacha.network/concepts/content-addressing/). Điều này cho phép tìm nạp tệp siêu dữ liệu của một hợp đồng qua IPFS vì mã băm siêu dữ liệu được nối thêm là một mã băm IPFS.

Ngoài ra, người ta cũng có thể truy xuất các tệp mã nguồn qua IPFS, vì mã băm IPFS của các tệp này cũng được tìm thấy trong siêu dữ liệu. Một hợp đồng có thể được xác minh bằng cách cung cấp tệp siêu dữ liệu và các tệp nguồn qua API của nó hoặc [giao diện người dùng (UI)](https://sourcify.dev/#/verifier), hoặc sử dụng các plugin. Công cụ giám sát của Sourcify cũng lắng nghe việc tạo hợp đồng trên các khối mới và cố gắng xác minh các hợp đồng nếu siêu dữ liệu và tệp nguồn của chúng được công bố trên IPFS.

[Tìm hiểu thêm về việc xác minh hợp đồng trên Sourcify](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Nền tảng Tenderly](https://tenderly.co/) cho phép các nhà phát triển Web3 xây dựng, thử nghiệm, giám sát và vận hành các hợp đồng thông minh. Kết hợp các công cụ gỡ lỗi với khả năng quan sát và các khối xây dựng cơ sở hạ tầng, Tenderly giúp các nhà phát triển tăng tốc độ phát triển hợp đồng thông minh. Để kích hoạt đầy đủ các tính năng của Tenderly, các nhà phát triển cần [thực hiện xác minh mã nguồn](https://docs.tenderly.co/monitoring/contract-verification) bằng một số phương pháp.

Có thể xác minh một hợp đồng một cách riêng tư hoặc công khai. Nếu được xác minh riêng tư, hợp đồng thông minh chỉ hiển thị với bạn (và các thành viên khác trong dự án của bạn). Việc xác minh một hợp đồng công khai làm cho nó hiển thị với mọi người sử dụng nền tảng Tenderly.

Bạn có thể xác minh các hợp đồng của mình bằng cách sử dụng [Bảng điều khiển (Dashboard)](https://docs.tenderly.co/contract-verification), [plugin Tenderly Hardhat](https://docs.tenderly.co/contract-verification/hardhat), hoặc [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

Khi xác minh hợp đồng thông qua Bảng điều khiển, bạn cần nhập tệp nguồn hoặc tệp siêu dữ liệu được tạo bởi trình biên dịch Solidity, địa chỉ/mạng lưới, và các cài đặt trình biên dịch.

Sử dụng plugin Tenderly Hardhat cho phép kiểm soát nhiều hơn đối với quá trình xác minh với ít nỗ lực hơn, cho phép bạn chọn giữa xác minh tự động (không cần mã) và thủ công (dựa trên mã).

## Đọc thêm {#further-reading}

- [Xác minh mã nguồn hợp đồng](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)