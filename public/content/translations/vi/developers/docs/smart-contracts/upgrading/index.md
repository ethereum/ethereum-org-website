---
title: Nâng cấp hợp đồng thông minh
description: Tổng quan về các mẫu nâng cấp cho hợp đồng thông minh Ethereum
lang: vi
---

Hợp đồng thông minh trên Ethereum là các chương trình tự thực thi chạy trong Máy ảo Ethereum (EVM). Các chương trình này được thiết kế bất biến, giúp ngăn chặn mọi cập nhật đối với logic nghiệp vụ sau khi hợp đồng được triển khai.

Mặc dù tính bất biến là cần thiết cho tính không cần tin cậy, tính phi tập trung và tính bảo mật của các hợp đồng thông minh, nhưng nó có thể là một nhược điểm trong một số trường hợp nhất định. Ví dụ: mã bất biến có thể khiến các nhà phát triển không thể sửa các hợp đồng dễ bị tấn công.

Tuy nhiên, việc tăng cường nghiên cứu nhằm cải thiện các hợp đồng thông minh đã dẫn đến sự ra đời của một số mẫu nâng cấp. Các mẫu nâng cấp này cho phép các nhà phát triển nâng cấp các hợp đồng thông minh (trong khi vẫn duy trì tính bất biến) bằng cách đặt logic nghiệp vụ vào các hợp đồng khác nhau.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên có hiểu biết tốt về [hợp đồng thông minh](/developers/docs/smart-contracts/), [cấu trúc của hợp đồng thông minh](/developers/docs/smart-contracts/anatomy/) và [Máy ảo Ethereum (EVM)](/developers/docs/evm/). Hướng dẫn này cũng giả định rằng người đọc đã nắm được kiến thức lập trình hợp đồng thông minh.

## Nâng cấp hợp đồng thông minh là gì? {#what-is-a-smart-contract-upgrade}

Nâng cấp hợp đồng thông minh bao gồm việc thay đổi logic nghiệp vụ của hợp đồng thông minh trong khi vẫn giữ nguyên trạng thái của hợp đồng. Điều quan trọng là phải làm rõ rằng khả năng nâng cấp và khả năng thay đổi là không giống nhau, đặc biệt là trong bối cảnh hợp đồng thông minh.

Bạn vẫn không thể thay đổi một chương trình đã được triển khai đến một địa chỉ trên mạng Ethereum. Nhưng bạn có thể thay đổi mã được thực thi khi người dùng tương tác với hợp đồng thông minh.

Điều này có thể được thực hiện thông qua các phương pháp sau:

1. Tạo nhiều phiên bản của một hợp đồng thông minh và di chuyển trạng thái (tức là dữ liệu) từ hợp đồng cũ sang một phiên bản mới của hợp đồng.

2. Tạo các hợp đồng riêng biệt để lưu trữ logic nghiệp vụ và trạng thái.

3. Sử dụng các mẫu proxy để ủy quyền các lệnh gọi hàm từ một hợp đồng proxy bất biến đến một hợp đồng logic có thể sửa đổi.

4. Tạo một hợp đồng chính bất biến giao tiếp với và dựa vào các hợp đồng vệ tinh linh hoạt để thực hiện các chức năng cụ thể.

5. Sử dụng mẫu kim cương để ủy quyền các lệnh gọi hàm từ hợp đồng proxy đến các hợp đồng logic.

### Cơ chế nâng cấp số 1: Di chuyển hợp đồng {#contract-migration}

Di chuyển hợp đồng dựa trên việc tạo phiên bản—ý tưởng tạo và quản lý các trạng thái duy nhất của cùng một phần mềm. Việc di chuyển hợp đồng bao gồm việc triển khai một phiên bản mới của một hợp đồng thông minh hiện có và chuyển lưu trữ và số dư sang hợp đồng mới.

Hợp đồng mới được triển khai sẽ có một bộ nhớ trống, cho phép bạn khôi phục dữ liệu từ hợp đồng cũ và ghi nó vào bản triển khai mới. Sau đó, bạn sẽ cần cập nhật tất cả các hợp đồng đã tương tác với hợp đồng cũ để phản ánh địa chỉ mới.

Bước cuối cùng trong việc di chuyển hợp đồng là thuyết phục người dùng chuyển sang sử dụng hợp đồng mới. Phiên bản hợp đồng mới sẽ giữ lại số dư và địa chỉ của người dùng, điều này giúp duy trì tính bất biến. Nếu đó là hợp đồng dựa trên token, bạn cũng sẽ cần liên hệ với các sàn giao dịch để loại bỏ hợp đồng cũ và sử dụng hợp đồng mới.

Di chuyển hợp đồng là một biện pháp tương đối đơn giản và an toàn để nâng cấp các hợp đồng thông minh mà không làm gián đoạn các tương tác của người dùng. Tuy nhiên, việc di chuyển thủ công bộ nhớ và số dư của người dùng sang hợp đồng mới tốn nhiều thời gian và có thể phát sinh chi phí gas cao.

[Thông tin thêm về di chuyển hợp đồng.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Cơ chế nâng cấp số 2: Tách dữ liệu {#data-separation}

Một phương pháp khác để nâng cấp hợp đồng thông minh là tách logic nghiệp vụ và lưu trữ dữ liệu thành các hợp đồng riêng biệt. Điều này có nghĩa là người dùng tương tác với hợp đồng logic, trong khi dữ liệu được lưu trữ trong hợp đồng lưu trữ.

Hợp đồng logic chứa mã được thực thi khi người dùng tương tác với ứng dụng. Nó cũng giữ địa chỉ của hợp đồng lưu trữ và tương tác với nó để lấy và thiết lập dữ liệu.

Trong khi đó, hợp đồng lưu trữ giữ trạng thái liên quan đến hợp đồng thông minh, chẳng hạn như số dư và địa chỉ của người dùng. Lưu ý rằng hợp đồng lưu trữ thuộc sở hữu của hợp đồng logic và được cấu hình với địa chỉ của hợp đồng logic tại thời điểm triển khai. Điều này ngăn các hợp đồng không được ủy quyền gọi hợp đồng lưu trữ hoặc cập nhật dữ liệu của nó.

Theo mặc định, hợp đồng lưu trữ là bất biến—nhưng bạn có thể thay thế hợp đồng logic mà nó trỏ đến bằng một bản triển khai mới. Điều này sẽ thay đổi mã chạy trong EVM, trong khi vẫn giữ nguyên bộ nhớ và số dư.

Sử dụng phương pháp nâng cấp này yêu cầu cập nhật địa chỉ của hợp đồng logic trong hợp đồng lưu trữ. Bạn cũng phải cấu hình hợp đồng logic mới với địa chỉ của hợp đồng lưu trữ vì những lý do đã giải thích trước đó.

Mẫu tách dữ liệu được cho là dễ triển khai hơn so với di chuyển hợp đồng. Tuy nhiên, bạn sẽ phải quản lý nhiều hợp đồng và triển khai các lược đồ ủy quyền phức tạp để bảo vệ các hợp đồng thông minh khỏi các nâng cấp độc hại.

### Cơ chế nâng cấp số 3: Các mẫu proxy {#proxy-patterns}

Mẫu proxy cũng sử dụng phương pháp tách dữ liệu để giữ logic nghiệp vụ và dữ liệu trong các hợp đồng riêng biệt. Tuy nhiên, trong một mẫu proxy, hợp đồng lưu trữ (được gọi là proxy) sẽ gọi hợp đồng logic trong quá trình thực thi mã. Đây là phương pháp đảo ngược của phương pháp tách dữ liệu, trong đó hợp đồng logic gọi hợp đồng lưu trữ.

Đây là những gì xảy ra trong một mẫu proxy:

1. Người dùng tương tác với hợp đồng proxy, nơi lưu trữ dữ liệu nhưng không giữ logic nghiệp vụ.

2. Hợp đồng proxy lưu trữ địa chỉ của hợp đồng logic và ủy quyền tất cả các lệnh gọi hàm cho hợp đồng logic (nơi chứa logic nghiệp vụ) bằng hàm `delegatecall`.

3. Sau khi lệnh gọi được chuyển tiếp đến hợp đồng logic, dữ liệu trả về từ hợp đồng logic sẽ được truy xuất và trả lại cho người dùng.

Sử dụng các mẫu proxy đòi hỏi sự hiểu biết về hàm **delegatecall**. Về cơ bản, `delegatecall` là một mã vận hành cho phép một hợp đồng gọi một hợp đồng khác, trong khi việc thực thi mã thực tế diễn ra trong ngữ cảnh của hợp đồng gọi. Một hệ quả của việc sử dụng `delegatecall` trong các mẫu proxy là hợp đồng proxy đọc và ghi vào bộ nhớ của nó và thực thi logic được lưu trữ tại hợp đồng logic như thể đang gọi một hàm nội bộ.

Từ [tài liệu tham khảo Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Tồn tại một biến thể đặc biệt của một lệnh gọi hàm nhắn tin, có tên là **delegatecall**, giống hệt với một lệnh gọi hàm nhắn tin ngoại trừ việc mã tại địa chỉ đích được thực thi trong ngữ cảnh (tức là tại địa chỉ) của hợp đồng gọi và `msg.sender` cùng `msg.value` không thay đổi giá trị của chúng._ _Điều này có nghĩa là một hợp đồng có thể tải động mã từ một địa chỉ khác trong thời gian chạy. Lưu trữ, địa chỉ hiện tại và số dư vẫn tham chiếu đến hợp đồng gọi, chỉ có mã được lấy từ địa chỉ được gọi._

Hợp đồng proxy biết cách gọi `delegatecall` bất cứ khi nào người dùng gọi một hàm vì nó có một hàm `fallback` được tích hợp sẵn. Trong lập trình Solidity, [hàm dự phòng](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) được thực thi khi một lệnh gọi hàm không khớp với các hàm được chỉ định trong hợp đồng.

Để mẫu proxy hoạt động, cần phải viết một hàm dự phòng tùy chỉnh chỉ định cách hợp đồng proxy xử lý các lệnh gọi hàm mà nó không hỗ trợ. Trong trường hợp này, hàm dự phòng của proxy được lập trình để khởi tạo một delegatecall và định tuyến lại yêu cầu của người dùng đến bản triển khai hợp đồng logic hiện tại.

Hợp đồng proxy là bất biến theo mặc định, nhưng các hợp đồng logic mới với logic nghiệp vụ được cập nhật có thể được tạo. Việc thực hiện nâng cấp sau đó là vấn đề thay đổi địa chỉ của hợp đồng logic được tham chiếu trong hợp đồng proxy.

Bằng cách trỏ hợp đồng proxy đến một hợp đồng logic mới, mã được thực thi khi người dùng gọi hàm của hợp đồng proxy sẽ thay đổi. Điều này cho phép chúng tôi nâng cấp logic của hợp đồng mà không cần yêu cầu người dùng tương tác với hợp đồng mới.

Các mẫu proxy là một phương pháp phổ biến để nâng cấp các hợp đồng thông minh vì chúng loại bỏ những khó khăn liên quan đến việc di chuyển hợp đồng. Tuy nhiên, các mẫu proxy phức tạp hơn khi sử dụng và có thể gây ra các lỗi nghiêm trọng, chẳng hạn như [xung đột bộ chọn hàm](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), nếu được sử dụng không đúng cách.

[Thông tin thêm về các mẫu proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Cơ chế nâng cấp số 4: Mẫu chiến lược {#strategy-pattern}

Kỹ thuật này bị ảnh hưởng bởi [mẫu chiến lược](https://en.wikipedia.org/wiki/Strategy_pattern), khuyến khích việc tạo ra các chương trình phần mềm giao tiếp với các chương trình khác để triển khai các tính năng cụ thể. Áp dụng mẫu chiến lược cho việc phát triển Ethereum có nghĩa là xây dựng một hợp đồng thông minh gọi các hàm từ các hợp đồng khác.

Hợp đồng chính trong trường hợp này chứa logic nghiệp vụ cốt lõi, nhưng giao tiếp với các hợp đồng thông minh khác ("hợp đồng vệ tinh") để thực hiện các chức năng nhất định. Hợp đồng chính này cũng lưu trữ địa chỉ cho mỗi hợp đồng vệ tinh và có thể chuyển đổi giữa các bản triển khai khác nhau của hợp đồng vệ tinh.

Bạn có thể xây dựng một hợp đồng vệ tinh mới và cấu hình hợp đồng chính với địa chỉ mới. Điều này cho phép bạn thay đổi _chiến lược_ (tức là triển khai logic mới) cho một hợp đồng thông minh.

Mặc dù tương tự như mẫu proxy đã được thảo luận trước đó, mẫu chiến lược lại khác biệt vì hợp đồng chính, nơi người dùng tương tác, nắm giữ logic nghiệp vụ. Sử dụng mẫu này mang lại cho bạn cơ hội để giới thiệu những thay đổi hạn chế đối với hợp đồng thông minh mà không ảnh hưởng đến cơ sở hạ tầng cốt lõi.

Nhược điểm chính là mẫu này chủ yếu hữu ích cho việc triển khai các nâng cấp nhỏ. Ngoài ra, nếu hợp đồng chính bị xâm phạm (ví dụ, thông qua một vụ hack), bạn không thể sử dụng phương pháp nâng cấp này.

### Cơ chế nâng cấp số 5: Mẫu kim cương {#diamond-pattern}

Mẫu kim cương có thể được coi là một cải tiến so với mẫu proxy. Các mẫu kim cương khác với các mẫu proxy vì hợp đồng proxy kim cương có thể ủy quyền các lệnh gọi hàm cho nhiều hơn một hợp đồng logic.

Các hợp đồng logic trong mẫu kim cương được gọi là _facet_. Để làm cho mẫu kim cương hoạt động, bạn cần tạo một ánh xạ trong hợp đồng proxy để ánh xạ [các bộ chọn hàm](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) đến các địa chỉ facet khác nhau.

Khi người dùng thực hiện một lệnh gọi hàm, hợp đồng proxy sẽ kiểm tra ánh xạ để tìm facet chịu trách nhiệm thực thi hàm đó. Sau đó, nó gọi `delegatecall` (sử dụng hàm dự phòng) và chuyển hướng lệnh gọi đến hợp đồng logic thích hợp.

Mẫu nâng cấp kim cương có một số ưu điểm so với các mẫu nâng cấp proxy truyền thống:

1. Nó cho phép bạn nâng cấp một phần nhỏ của hợp đồng mà không cần thay đổi toàn bộ mã. Sử dụng mẫu proxy để nâng cấp đòi hỏi phải tạo một hợp đồng logic hoàn toàn mới, ngay cả đối với các nâng cấp nhỏ.

2. Tất cả các hợp đồng thông minh (bao gồm cả các hợp đồng logic được sử dụng trong các mẫu proxy) đều có giới hạn kích thước 24KB, đây có thể là một hạn chế—đặc biệt đối với các hợp đồng phức tạp đòi hỏi nhiều chức năng hơn. Mẫu kim cương giúp giải quyết vấn đề này dễ dàng bằng cách chia các chức năng trên nhiều hợp đồng logic.

3. Các mẫu proxy áp dụng phương pháp tiếp cận toàn diện để kiểm soát truy cập. Một thực thể có quyền truy cập vào các chức năng nâng cấp có thể thay đổi _toàn bộ_ hợp đồng. Nhưng mẫu kim cương cho phép một cách tiếp cận cấp phép theo mô-đun, nơi bạn có thể hạn chế các thực thể nâng cấp một số chức năng nhất định trong một hợp đồng thông minh.

[Thông tin thêm về mẫu kim cương](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Ưu và nhược điểm của việc nâng cấp hợp đồng thông minh {#pros-and-cons-of-upgrading-smart-contracts}

| Ưu điểm                                                                                                                                                                             | Nhược điểm                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Việc nâng cấp hợp đồng thông minh có thể giúp dễ dàng sửa các lỗ hổng được phát hiện trong giai đoạn sau triển khai.                                                | Việc nâng cấp các hợp đồng thông minh phủ nhận ý tưởng về tính bất biến của mã, điều này có ý nghĩa đối với tính phi tập trung và bảo mật.                            |
| Các nhà phát triển có thể sử dụng các nâng cấp logic để thêm các tính năng mới cho các ứng dụng phi tập trung.                                                      | Người dùng phải tin tưởng các nhà phát triển sẽ không sửa đổi các hợp đồng thông minh một cách tùy tiện.                                                              |
| Việc nâng cấp hợp đồng thông minh có thể cải thiện sự an toàn cho người dùng cuối vì các lỗi có thể được sửa chữa nhanh chóng.                                      | Việc lập trình chức năng nâng cấp vào các hợp đồng thông minh sẽ thêm một lớp phức tạp khác và làm tăng khả năng xảy ra các lỗi nghiêm trọng.                         |
| Các nâng cấp hợp đồng giúp các nhà phát triển có nhiều không gian hơn để thử nghiệm các tính năng khác nhau và cải thiện các ứng dụng phi tập trung theo thời gian. | Cơ hội nâng cấp các hợp đồng thông minh có thể khuyến khích các nhà phát triển khởi chạy dự án nhanh hơn mà không cần thực hiện thẩm định trong giai đoạn phát triển. |
|                                                                                                                                                                                     | Việc kiểm soát truy cập không an toàn hoặc tập trung hóa trong các hợp đồng thông minh có thể giúp các tác nhân độc hại thực hiện các nâng cấp trái phép dễ dàng hơn. |

## Những lưu ý khi nâng cấp hợp đồng thông minh {#considerations-for-upgrading-smart-contracts}

1. Sử dụng các cơ chế kiểm soát/ủy quyền truy cập an toàn để ngăn chặn các nâng cấp hợp đồng thông minh trái phép, đặc biệt nếu sử dụng các mẫu proxy, mẫu chiến lược hoặc tách dữ liệu. Một ví dụ là hạn chế quyền truy cập vào chức năng nâng cấp, để chỉ chủ sở hữu của hợp đồng mới có thể gọi nó.

2. Nâng cấp hợp đồng thông minh là một hoạt động phức tạp và đòi hỏi sự cẩn trọng cao độ để ngăn chặn việc phát sinh các lỗ hổng bảo mật.

3. Giảm các giả định về sự tin cậy bằng cách phi tập trung hóa quy trình thực hiện các nâng cấp. Các chiến lược khả thi bao gồm việc sử dụng [hợp đồng ví đa chữ ký](/developers/docs/smart-contracts/#multisig) để kiểm soát các nâng cấp, hoặc yêu cầu [các thành viên của một DAO](/dao/) bỏ phiếu để phê duyệt việc nâng cấp.

4. Hãy lưu ý đến các chi phí liên quan đến việc nâng cấp hợp đồng. Ví dụ, việc sao chép trạng thái (ví dụ: số dư của người dùng) từ hợp đồng cũ sang hợp đồng mới trong quá trình di chuyển hợp đồng có thể yêu cầu nhiều hơn một giao dịch, nghĩa là sẽ tốn nhiều phí gas hơn.

5. Hãy cân nhắc việc triển khai **khóa thời gian** để bảo vệ người dùng. Khóa thời gian đề cập đến một sự chậm trễ được áp dụng đối với các thay đổi của một hệ thống. Khóa thời gian có thể được kết hợp với một hệ thống quản trị đa chữ ký để kiểm soát các nâng cấp: nếu một hành động được đề xuất đạt đến ngưỡng phê duyệt yêu cầu, nó sẽ không được thực thi cho đến khi khoảng thời gian trì hoãn được xác định trước trôi qua.

Khóa thời gian cho người dùng một khoảng thời gian để thoát khỏi hệ thống nếu họ không đồng ý với một thay đổi được đề xuất (ví dụ: nâng cấp logic hoặc các lược đồ phí mới). Nếu không có khóa thời gian, người dùng cần phải tin tưởng các nhà phát triển sẽ không thực hiện các thay đổi tùy tiện trong một hợp đồng thông minh mà không có thông báo trước. Nhược điểm ở đây là khóa thời gian hạn chế khả năng vá nhanh các lỗ hổng bảo mật.

## Tài nguyên {#resources}

**Plugin Nâng cấp OpenZeppelin - _Một bộ công cụ để triển khai và bảo mật các hợp đồng thông minh có thể nâng cấp._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Tài liệu tham khảo](https://docs.openzeppelin.com/upgrades)

## Hướng dẫn {#tutorials}

- [Nâng cấp các Hợp đồng thông minh của bạn | Hướng dẫn trên YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) của Patrick Collins
- [Hướng dẫn Di chuyển Hợp đồng thông minh Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) của Austin Griffith
- [Sử dụng mẫu proxy UUPS để nâng cấp hợp đồng thông minh](https://blog.logrocket.com/author/praneshas/) của Pranesh A.S
- [Hướng dẫn Web3: Viết hợp đồng thông minh có thể nâng cấp (proxy) bằng OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) của fangjun.eth

## Đọc thêm {#further-reading}

- [Thực trạng Nâng cấp Hợp đồng thông minh](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) của Santiago Palladino
- [Nhiều cách để nâng cấp một hợp đồng thông minh Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - blog của Crypto Market Pool
- [Tìm hiểu: Nâng cấp Hợp đồng thông minh](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Tài liệu OpenZeppelin
- [Các Mẫu Proxy cho Khả năng Nâng cấp của Hợp đồng Solidity: Proxy Transparent so với UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) của Naveen Sahu
- [Cách thức hoạt động của các bản nâng cấp Diamond](https://dev.to/mudgen/how-diamond-upgrades-work-417j) của Nick Mudge
