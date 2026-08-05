---
title: "Nâng cấp hợp đồng thông minh"
description: "Tổng quan về các mẫu nâng cấp cho hợp đồng thông minh Ethereum"
lang: vi
---

Hợp đồng thông minh trên Ethereum là các chương trình tự thực thi chạy trên Máy ảo Ethereum (EVM). Các chương trình này được thiết kế với tính bất biến, điều này ngăn chặn mọi cập nhật đối với logic nghiệp vụ sau khi hợp đồng được triển khai.

Mặc dù tính bất biến là cần thiết cho tính không cần niềm tin, sự phi tập trung và bảo mật của hợp đồng thông minh, nó có thể là một hạn chế trong một số trường hợp nhất định. Ví dụ, mã bất biến có thể khiến các nhà phát triển không thể sửa chữa các hợp đồng có lỗ hổng.

Tuy nhiên, việc gia tăng nghiên cứu nhằm cải thiện hợp đồng thông minh đã dẫn đến sự ra đời của một số mẫu nâng cấp. Các mẫu nâng cấp này cho phép các nhà phát triển nâng cấp hợp đồng thông minh (trong khi vẫn giữ nguyên tính bất biến) bằng cách đặt logic nghiệp vụ vào các hợp đồng khác nhau.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên có hiểu biết tốt về [hợp đồng thông minh](/developers/docs/smart-contracts/), [cấu trúc hợp đồng thông minh](/developers/docs/smart-contracts/anatomy/), và [Máy ảo Ethereum (EVM)](/developers/docs/evm/). Hướng dẫn này cũng giả định rằng người đọc đã nắm bắt được cách lập trình hợp đồng thông minh.

## Nâng cấp hợp đồng thông minh là gì? {#what-is-a-smart-contract-upgrade}

Việc nâng cấp hợp đồng thông minh liên quan đến việc thay đổi logic nghiệp vụ của một hợp đồng thông minh trong khi vẫn bảo toàn trạng thái của hợp đồng. Cần làm rõ rằng khả năng nâng cấp và tính có thể thay đổi (mutability) không giống nhau, đặc biệt là trong bối cảnh của hợp đồng thông minh.

Bạn vẫn không thể thay đổi một chương trình đã được triển khai tại một địa chỉ trên mạng lưới Ethereum. Nhưng bạn có thể thay đổi mã được thực thi khi người dùng tương tác với một hợp đồng thông minh.

Điều này có thể được thực hiện thông qua các phương pháp sau:

1. Tạo nhiều phiên bản của một hợp đồng thông minh và di chuyển trạng thái (tức là dữ liệu) từ hợp đồng cũ sang một phiên bản mới của hợp đồng.

2. Tạo các hợp đồng riêng biệt để lưu trữ logic nghiệp vụ và trạng thái.

3. Sử dụng các mẫu proxy để ủy quyền các lệnh gọi hàm từ một hợp đồng proxy bất biến sang một hợp đồng logic có thể sửa đổi.

4. Tạo một hợp đồng chính bất biến giao tiếp và dựa vào các hợp đồng vệ tinh linh hoạt để thực thi các chức năng cụ thể.

5. Sử dụng mẫu kim cương (diamond pattern) để ủy quyền các lệnh gọi hàm từ một hợp đồng proxy sang các hợp đồng logic.

### Cơ chế nâng cấp #1: Di chuyển hợp đồng {#contract-migration}

Việc di chuyển hợp đồng dựa trên việc tạo phiên bản (versioning)—ý tưởng tạo và quản lý các trạng thái duy nhất của cùng một phần mềm. Việc di chuyển hợp đồng liên quan đến việc triển khai một phiên bản mới của một hợp đồng thông minh hiện có và chuyển bộ nhớ lưu trữ cùng số dư sang hợp đồng mới.

Hợp đồng mới được triển khai sẽ có bộ nhớ lưu trữ trống, cho phép bạn khôi phục dữ liệu từ hợp đồng cũ và ghi nó vào bản triển khai mới. Sau đó, bạn sẽ cần cập nhật tất cả các hợp đồng đã tương tác với hợp đồng cũ để phản ánh địa chỉ mới.

Bước cuối cùng trong việc di chuyển hợp đồng là thuyết phục người dùng chuyển sang sử dụng hợp đồng mới. Phiên bản hợp đồng mới sẽ giữ lại số dư và địa chỉ của người dùng, điều này bảo tồn tính bất biến. Nếu đó là một hợp đồng dựa trên token, bạn cũng sẽ cần liên hệ với các sàn giao dịch để loại bỏ hợp đồng cũ và sử dụng hợp đồng mới.

Di chuyển hợp đồng là một biện pháp tương đối đơn giản và an toàn để nâng cấp hợp đồng thông minh mà không làm gián đoạn các tương tác của người dùng. Tuy nhiên, việc di chuyển thủ công bộ nhớ lưu trữ và số dư của người dùng sang hợp đồng mới tốn nhiều thời gian và có thể phát sinh chi phí Gas cao.

[Tìm hiểu thêm về di chuyển hợp đồng.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Cơ chế nâng cấp #2: Tách biệt dữ liệu {#data-separation}

Một phương pháp khác để nâng cấp hợp đồng thông minh là tách biệt logic nghiệp vụ và lưu trữ dữ liệu thành các hợp đồng riêng biệt. Điều này có nghĩa là người dùng tương tác với hợp đồng logic, trong khi dữ liệu được lưu trữ trong hợp đồng lưu trữ.

Hợp đồng logic chứa mã được thực thi khi người dùng tương tác với ứng dụng. Nó cũng giữ địa chỉ của hợp đồng lưu trữ và tương tác với nó để lấy và thiết lập dữ liệu.

Trong khi đó, hợp đồng lưu trữ giữ trạng thái liên kết với hợp đồng thông minh, chẳng hạn như số dư và địa chỉ của người dùng. Lưu ý rằng hợp đồng lưu trữ thuộc sở hữu của hợp đồng logic và được cấu hình với địa chỉ của hợp đồng logic tại thời điểm triển khai. Điều này ngăn chặn các hợp đồng không được ủy quyền gọi hợp đồng lưu trữ hoặc cập nhật dữ liệu của nó.

Theo mặc định, hợp đồng lưu trữ là bất biến—nhưng bạn có thể thay thế hợp đồng logic mà nó trỏ tới bằng một bản triển khai mới. Điều này sẽ thay đổi mã chạy trong EVM, trong khi vẫn giữ nguyên bộ nhớ lưu trữ và số dư.

Sử dụng phương pháp nâng cấp này yêu cầu cập nhật địa chỉ của hợp đồng logic trong hợp đồng lưu trữ. Bạn cũng phải cấu hình hợp đồng logic mới với địa chỉ của hợp đồng lưu trữ vì những lý do đã giải thích trước đó.

Mẫu tách biệt dữ liệu được cho là dễ triển khai hơn so với việc di chuyển hợp đồng. Tuy nhiên, bạn sẽ phải quản lý nhiều hợp đồng và triển khai các cơ chế ủy quyền phức tạp để bảo vệ hợp đồng thông minh khỏi các bản nâng cấp độc hại.

### Cơ chế nâng cấp #3: Các mẫu proxy {#proxy-patterns}

Mẫu proxy cũng sử dụng việc tách biệt dữ liệu để giữ logic nghiệp vụ và dữ liệu trong các hợp đồng riêng biệt. Tuy nhiên, trong một mẫu proxy, hợp đồng lưu trữ (được gọi là proxy) gọi hợp đồng logic trong quá trình thực thi mã. Đây là sự đảo ngược của phương pháp tách biệt dữ liệu, nơi hợp đồng logic gọi hợp đồng lưu trữ.

Đây là những gì xảy ra trong một mẫu proxy:

1. Người dùng tương tác với hợp đồng proxy, hợp đồng này lưu trữ dữ liệu nhưng không chứa logic nghiệp vụ.

2. Hợp đồng proxy lưu trữ địa chỉ của hợp đồng logic và ủy quyền tất cả các lệnh gọi hàm cho hợp đồng logic (nơi chứa logic nghiệp vụ) bằng cách sử dụng hàm `delegatecall`.

3. Sau khi lệnh gọi được chuyển tiếp đến hợp đồng logic, dữ liệu trả về từ hợp đồng logic sẽ được truy xuất và trả lại cho người dùng.

Sử dụng các mẫu proxy đòi hỏi sự hiểu biết về hàm **delegatecall**. Về cơ bản, `delegatecall` là một mã lệnh cho phép một hợp đồng gọi một hợp đồng khác, trong khi việc thực thi mã thực tế diễn ra trong ngữ cảnh của hợp đồng gọi. Một hệ quả của việc sử dụng `delegatecall` trong các mẫu proxy là hợp đồng proxy đọc và ghi vào bộ nhớ lưu trữ của nó và thực thi logic được lưu trữ tại hợp đồng logic giống như đang gọi một hàm nội bộ.

Từ [tài liệu Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Tồn tại một biến thể đặc biệt của lời gọi thông điệp, có tên là **delegatecall**, giống hệt với một lời gọi thông điệp ngoại trừ việc mã tại địa chỉ đích được thực thi trong ngữ cảnh (tức là tại địa chỉ) của hợp đồng gọi và `msg.sender` cùng `msg.value` không thay đổi giá trị của chúng._ _Điều này có nghĩa là một hợp đồng có thể tải động mã từ một địa chỉ khác trong thời gian chạy. Bộ nhớ lưu trữ, địa chỉ hiện tại và số dư vẫn tham chiếu đến hợp đồng gọi, chỉ có mã được lấy từ địa chỉ được gọi._

Hợp đồng proxy biết cách gọi `delegatecall` bất cứ khi nào người dùng gọi một hàm vì nó có một hàm `fallback` được tích hợp sẵn. Trong lập trình Solidity, [hàm dự phòng](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) được thực thi khi một lệnh gọi hàm không khớp với các hàm được chỉ định trong một hợp đồng.

Để làm cho mẫu proxy hoạt động, cần phải viết một hàm dự phòng tùy chỉnh chỉ định cách hợp đồng proxy nên xử lý các lệnh gọi hàm mà nó không hỗ trợ. Trong trường hợp này, hàm dự phòng của proxy được lập trình để khởi tạo một delegatecall và định tuyến lại yêu cầu của người dùng đến bản triển khai hợp đồng logic hiện tại.

Hợp đồng proxy mặc định là bất biến, nhưng các hợp đồng logic mới với logic nghiệp vụ được cập nhật có thể được tạo ra. Việc thực hiện nâng cấp sau đó chỉ là vấn đề thay đổi địa chỉ của hợp đồng logic được tham chiếu trong hợp đồng proxy.

Bằng cách trỏ hợp đồng proxy đến một hợp đồng logic mới, mã được thực thi khi người dùng gọi hàm của hợp đồng proxy sẽ thay đổi. Điều này cho phép chúng ta nâng cấp logic của một hợp đồng mà không yêu cầu người dùng tương tác với một hợp đồng mới.

Các mẫu proxy là một phương pháp phổ biến để nâng cấp hợp đồng thông minh vì chúng loại bỏ những khó khăn liên quan đến việc di chuyển hợp đồng. Tuy nhiên, các mẫu proxy phức tạp hơn để sử dụng và có thể gây ra các lỗi nghiêm trọng, chẳng hạn như [xung đột bộ chọn hàm (function selector clashes)](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), nếu sử dụng không đúng cách.

[Tìm hiểu thêm về các mẫu proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Cơ chế nâng cấp #4: Mẫu chiến lược {#strategy-pattern}

Kỹ thuật này bị ảnh hưởng bởi [mẫu chiến lược](https://en.wikipedia.org/wiki/Strategy_pattern), khuyến khích việc tạo ra các chương trình phần mềm giao tiếp với các chương trình khác để triển khai các tính năng cụ thể. Việc áp dụng mẫu chiến lược vào phát triển Ethereum có nghĩa là xây dựng một hợp đồng thông minh gọi các hàm từ các hợp đồng khác.

Hợp đồng chính trong trường hợp này chứa logic nghiệp vụ cốt lõi, nhưng giao tiếp với các hợp đồng thông minh khác ("hợp đồng vệ tinh") để thực thi một số chức năng nhất định. Hợp đồng chính này cũng lưu trữ địa chỉ cho mỗi hợp đồng vệ tinh và có thể chuyển đổi giữa các bản triển khai khác nhau của hợp đồng vệ tinh.

Bạn có thể xây dựng một hợp đồng vệ tinh mới và cấu hình hợp đồng chính với địa chỉ mới. Điều này cho phép bạn thay đổi _các chiến lược_ (tức là triển khai logic mới) cho một hợp đồng thông minh.

Mặc dù tương tự như mẫu proxy đã thảo luận trước đó, mẫu chiến lược khác biệt ở chỗ hợp đồng chính, nơi người dùng tương tác, nắm giữ logic nghiệp vụ. Sử dụng mẫu này mang lại cho bạn cơ hội đưa ra các thay đổi giới hạn đối với một hợp đồng thông minh mà không ảnh hưởng đến cơ sở hạ tầng cốt lõi.

Hạn chế chính là mẫu này chủ yếu hữu ích cho việc tung ra các bản nâng cấp nhỏ. Ngoài ra, nếu hợp đồng chính bị xâm phạm (ví dụ: thông qua một vụ hack), bạn không thể sử dụng phương pháp nâng cấp này.

### Cơ chế nâng cấp #5: Mẫu kim cương {#diamond-pattern}

Mẫu kim cương có thể được coi là một sự cải tiến so với mẫu proxy. Các mẫu kim cương khác với các mẫu proxy vì hợp đồng proxy kim cương có thể ủy quyền các lệnh gọi hàm cho nhiều hơn một hợp đồng logic.

Các hợp đồng logic trong mẫu kim cương được gọi là _facets_ (các khía cạnh). Để làm cho mẫu kim cương hoạt động, bạn cần tạo một ánh xạ trong hợp đồng proxy để ánh xạ [các bộ chọn hàm](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) tới các địa chỉ facet khác nhau.

Khi người dùng thực hiện một lệnh gọi hàm, hợp đồng proxy sẽ kiểm tra ánh xạ để tìm facet chịu trách nhiệm thực thi hàm đó. Sau đó, nó gọi `delegatecall` (sử dụng hàm dự phòng) và chuyển hướng lệnh gọi đến hợp đồng logic thích hợp.

Mẫu nâng cấp kim cương có một số lợi thế so với các mẫu nâng cấp proxy truyền thống:

1. Nó cho phép bạn nâng cấp một phần nhỏ của hợp đồng mà không cần thay đổi toàn bộ mã. Sử dụng mẫu proxy cho các bản nâng cấp yêu cầu tạo một hợp đồng logic hoàn toàn mới, ngay cả đối với các bản nâng cấp nhỏ.

2. Tất cả các hợp đồng thông minh (bao gồm cả các hợp đồng logic được sử dụng trong các mẫu proxy) đều có giới hạn kích thước 24KB, điều này có thể là một hạn chế—đặc biệt đối với các hợp đồng phức tạp yêu cầu nhiều chức năng hơn. Mẫu kim cương giúp dễ dàng giải quyết vấn đề này bằng cách chia nhỏ các hàm trên nhiều hợp đồng logic.

3. Các mẫu proxy áp dụng cách tiếp cận "bắt tất cả" (catch-all) đối với các kiểm soát truy cập. Một thực thể có quyền truy cập vào các hàm nâng cấp có thể thay đổi _toàn bộ_ hợp đồng. Nhưng mẫu kim cương cho phép một cách tiếp cận quyền hạn theo mô-đun, nơi bạn có thể hạn chế các thực thể chỉ được nâng cấp một số hàm nhất định trong một hợp đồng thông minh.

[Tìm hiểu thêm về mẫu kim cương](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Ưu và nhược điểm của việc nâng cấp hợp đồng thông minh {#pros-and-cons-of-upgrading-smart-contracts}

| Ưu điểm                                                                                                                                        | Nhược điểm                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Việc nâng cấp hợp đồng thông minh có thể giúp dễ dàng sửa chữa các lỗ hổng được phát hiện trong giai đoạn sau triển khai.                      | Việc nâng cấp hợp đồng thông minh phủ nhận ý tưởng về tính bất biến của mã, điều này có những tác động đến sự phi tập trung và bảo mật.                                                                |
| Các nhà phát triển có thể sử dụng các bản nâng cấp logic để thêm các tính năng mới vào các ứng dụng phi tập trung.                             | Người dùng phải tin tưởng các nhà phát triển không sửa đổi hợp đồng thông minh một cách tùy tiện.                                                                                                       |
| Các bản nâng cấp hợp đồng thông minh có thể cải thiện sự an toàn cho người dùng cuối vì các lỗi có thể được sửa chữa nhanh chóng.              | Việc lập trình chức năng nâng cấp vào hợp đồng thông minh thêm một lớp phức tạp khác và làm tăng khả năng xảy ra các lỗi nghiêm trọng.                                                                  |
| Các bản nâng cấp hợp đồng mang lại cho các nhà phát triển nhiều không gian hơn để thử nghiệm các tính năng khác nhau và cải thiện dapp theo thời gian. | Cơ hội nâng cấp hợp đồng thông minh có thể khuyến khích các nhà phát triển khởi chạy dự án nhanh hơn mà không thực hiện thẩm định kỹ lưỡng trong giai đoạn phát triển.                                  |
|                                                                                                                                                | Kiểm soát truy cập không an toàn hoặc sự tập trung hóa trong hợp đồng thông minh có thể giúp các tác nhân độc hại dễ dàng thực hiện các bản nâng cấp trái phép.                                         |

## Những cân nhắc khi nâng cấp hợp đồng thông minh {#considerations-for-upgrading-smart-contracts}

1. Sử dụng các cơ chế kiểm soát truy cập/ủy quyền an toàn để ngăn chặn các bản nâng cấp hợp đồng thông minh trái phép, đặc biệt nếu sử dụng các mẫu proxy, mẫu chiến lược hoặc tách biệt dữ liệu. Một ví dụ là hạn chế quyền truy cập vào hàm nâng cấp, sao cho chỉ chủ sở hữu của hợp đồng mới có thể gọi nó.

2. Nâng cấp hợp đồng thông minh là một hoạt động phức tạp và đòi hỏi mức độ cẩn trọng cao để ngăn chặn việc đưa vào các lỗ hổng.

3. Giảm thiểu các giả định tin cậy bằng cách phi tập trung hóa quá trình triển khai các bản nâng cấp. Các chiến lược khả thi bao gồm sử dụng một [hợp đồng Ví đa chữ ký (multi-sig)](/developers/docs/smart-contracts/#multisig) để kiểm soát các bản nâng cấp, hoặc yêu cầu [các thành viên của một DAO](/dao/) bỏ phiếu để phê duyệt bản nâng cấp.

4. Nhận thức được các chi phí liên quan đến việc nâng cấp hợp đồng. Ví dụ, việc sao chép trạng thái (ví dụ: số dư của người dùng) từ một hợp đồng cũ sang một hợp đồng mới trong quá trình di chuyển hợp đồng có thể yêu cầu nhiều hơn một giao dịch, đồng nghĩa với việc tốn nhiều phí Gas hơn.

5. Cân nhắc triển khai **khóa thời gian (timelocks)** để bảo vệ người dùng. Khóa thời gian đề cập đến một độ trễ được áp dụng đối với các thay đổi của một hệ thống. Khóa thời gian có thể được kết hợp với một hệ thống Quản trị đa chữ ký để kiểm soát các bản nâng cấp: nếu một hành động được đề xuất đạt đến ngưỡng phê duyệt cần thiết, nó sẽ không thực thi cho đến khi khoảng thời gian trễ được xác định trước trôi qua.

Khóa thời gian cung cấp cho người dùng một khoảng thời gian để thoát khỏi hệ thống nếu họ không đồng ý với một thay đổi được đề xuất (ví dụ: nâng cấp logic hoặc các cơ chế tính phí mới). Nếu không có khóa thời gian, người dùng cần phải tin tưởng các nhà phát triển không thực hiện các thay đổi tùy tiện trong một hợp đồng thông minh mà không thông báo trước. Hạn chế ở đây là khóa thời gian hạn chế khả năng vá các lỗ hổng một cách nhanh chóng.

## Tài nguyên {#resources}

**OpenZeppelin Upgrades Plugins - _Một bộ công cụ để triển khai và bảo mật các hợp đồng thông minh có thể nâng cấp._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Tài liệu](https://docs.openzeppelin.com/upgrades)

## Hướng dẫn {#tutorials}

- [Nâng cấp Hợp đồng Thông minh của bạn | Hướng dẫn trên YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) bởi Patrick Collins
- [Hướng dẫn Di chuyển Hợp đồng Thông minh Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) bởi Austin Griffith
- [Sử dụng mẫu proxy UUPS để nâng cấp hợp đồng thông minh](https://blog.logrocket.com/author/praneshas/) bởi Pranesh A.S
- [Hướng dẫn Web3: Viết hợp đồng thông minh có thể nâng cấp (proxy) bằng OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) bởi fangjun.eth

## Đọc thêm {#further-reading}

- [Trạng thái của các Bản nâng cấp Hợp đồng Thông minh](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) bởi Santiago Palladino
- [Nhiều cách để nâng cấp một hợp đồng thông minh Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blog Crypto Market Pool
- [Học: Nâng cấp Hợp đồng Thông minh](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Tài liệu OpenZeppelin
- [Các Mẫu Proxy cho Khả năng Nâng cấp của Hợp đồng Solidity: Transparent vs UUPS Proxies](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) bởi Naveen Sahu
- [Cách thức hoạt động của các Bản nâng cấp Kim cương](https://dev.to/mudgen/how-diamond-upgrades-work-417j) bởi Nick Mudge