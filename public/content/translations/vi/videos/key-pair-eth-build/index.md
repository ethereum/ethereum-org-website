---
title: "Cặp khóa — ETH.BUILD"
description: "Bản trình diễn về các cặp khóa công khai-riêng tư sử dụng công cụ giáo dục ETH.BUILD. Tìm hiểu cách các cặp khóa mật mã học bảo mật các tài khoản Ethereum và cho phép việc ký giao dịch."
lang: vi
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "tài khoản"
  - "mật mã học"
format: tutorial
author: Austin Griffith
breadcrumb: "Cặp khóa (ETH.BUILD)"
---

Một hướng dẫn của **Austin Griffith** trình bày cách hoạt động của các cặp khóa công khai-riêng tư bằng cách sử dụng công cụ lập trình trực quan ETH.BUILD, bao gồm việc tạo khóa riêng tư, dẫn xuất khóa công khai, việc ký thông điệp và khôi phục chữ ký.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=9LtBDy67Tho) được xuất bản bởi Austin Griffith. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

### Khóa riêng tư (0:00) {#the-private-key-000}

Trong video đầu tiên, chúng ta đã sử dụng một mã băm, và các mã băm sẽ rất quan trọng trong tương lai. Nhưng phần quan trọng tiếp theo là một cặp khóa. Phần quan trọng nhất của một cặp khóa là khóa riêng tư. Hãy tiến hành tạo một khóa — về cơ bản nó là một chuỗi thập lục phân 64 ký tự ngẫu nhiên, có cùng kích thước với mã băm mà chúng ta vừa làm việc.

Bạn bắt đầu với nó như là khóa riêng tư của mình, và sau đó sử dụng mật mã học đường cong elliptic — hãy tìm hiểu thêm trên Wikipedia như một nhiệm vụ phụ — chúng ta dẫn xuất ra một khóa công khai. Vậy là bây giờ chúng ta đã có một khóa riêng tư và một khóa công khai. Chúng ta vừa tạo ra một khóa riêng tư từ hư không, và khóa công khai cung cấp cho chúng ta một địa chỉ. Đây là nơi mọi người thực sự có thể gửi tiền. Khi ai đó nói "hãy gửi đến địa chỉ Ethereum của tôi", thì đó chính là cái này.

Nếu tôi muốn tạo một tài khoản tại Wells Fargo, tôi sẽ phải lái xe đến ngân hàng và cung cấp cho họ một đống thông tin. Sẽ mất một lúc. Nhưng để tạo một tài khoản trong một hệ thống mật mã học như thế này, nơi tôi có thể gửi và nhận tiền, tôi chỉ cần tạo khóa riêng tư này. Khóa riêng tư thập lục phân 64 ký tự này dẫn xuất ra mọi thứ khác.

### Việc ký và khôi phục các thông điệp (1:54) {#signing-and-recovering-messages-154}

Có một đặc tính thực sự thú vị về cặp khóa này mà chúng ta nên khám phá, và đó là việc ký và khôi phục các thông điệp. Về cơ bản, bạn lấy khóa riêng tư của mình và sử dụng nó để ký một loại thông điệp nào đó. Hãy gõ một thông điệp — "the bear is sticky with honey."

Chúng ta đưa nó vào làm thông điệp của mình, và với tính năng tự động ký được bật, nó trả về cho chúng ta một chữ ký. Hơi giống với mã băm, chữ ký của chúng ta về cơ bản là lấy thông điệp và khóa riêng tư của chúng ta và ký một cái gì đó. Những gì chúng ta nhận được từ đó là một chữ ký.

Tôi có thể gửi cái này ra thế giới — tôi có thể gửi công khai cái này cho mọi người — chuỗi chữ ký này cùng với thông điệp. Những gì bất kỳ ai cũng có thể làm bằng toán học là xác minh rằng tôi chính xác là người đã ký nó.

### Khôi phục địa chỉ của người ký (3:17) {#recovering-the-signers-address-317}

Hãy để tôi cho bạn thấy cách nó hoạt động. Chúng ta sử dụng một phương thức "recover" (khôi phục). Chúng ta cần hai đầu vào: thông điệp — "the bear is sticky with honey" — và chữ ký. Những gì xuất ra từ đó là địa chỉ đã được sử dụng để ký nó. Chúng ta có thể thấy trực quan rằng tài khoản đã ký thông điệp đó bằng cách sử dụng các biểu tượng nhận dạng Blockie.

Không có cách nào để giả mạo điều này. Nếu bất kỳ ai thay đổi dù chỉ một từ — như đổi "bear" thành "badger" — mọi thứ sẽ thay đổi. Ngay cả với cùng một chữ ký, một thông điệp khác sẽ nhả ra một địa chỉ khác, không phải là địa chỉ chính xác.

Thông điệp này không thể bị giả mạo. Chúng ta có thể ném một dấu thời gian vào đó — chúng ta có thể nói "vào ngày này tôi dự đoán rằng một điều gì đó sẽ xảy ra", ký nó, đưa ra chữ ký và thông điệp, và bất kỳ ai trong suốt phần thời gian còn lại đều có thể chứng minh bằng toán học rằng bạn đã ký thông điệp đó vào thời điểm đó.

### Đặc tính then chốt của một cặp khóa (4:58) {#the-key-property-of-a-key-pair-458}

Đây là đặc tính then chốt của một cặp khóa. Một cặp khóa được tạo ra từ không gì khác ngoài một chuỗi ngẫu nhiên thập lục phân 64 ký tự có thể được sử dụng để ký một thông điệp, và sau đó thông điệp đó có thể được khôi phục.

- Khóa riêng tư + thông điệp = chữ ký
- Chữ ký + thông điệp = địa chỉ công khai

Chúng ta có thể ký dữ liệu bằng khóa riêng tư của mình, và mọi người có thể chứng minh rằng chính chúng ta là người đã ký nó. Đó sẽ là một phần quan trọng cho bước tiếp theo.