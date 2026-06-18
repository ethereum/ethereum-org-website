---
title: "Giới thiệu về các nút khởi động Ethereum"
description: "Thông tin cơ bản bạn cần để hiểu về các nút khởi động"
lang: vi
---

Khi một nút mới tham gia vào mạng lưới Ethereum, nó cần kết nối với các nút đã có trên mạng lưới để từ đó khám phá các peer (nút ngang hàng) mới. Các điểm truy cập này vào mạng lưới Ethereum được gọi là các nút khởi động. Các client thường có một danh sách các nút khởi động được mã hóa cứng (hardcoded) bên trong chúng. Các nút khởi động này thường được chạy bởi đội ngũ devops của Tổ chức Ethereum hoặc chính các đội ngũ phát triển client. Lưu ý rằng các nút khởi động không giống như các nút tĩnh (static nodes). Các nút tĩnh được gọi đi gọi lại nhiều lần, trong khi các nút khởi động chỉ được gọi đến nếu không có đủ các peer để kết nối và một nút cần thiết lập (bootstrap) một số kết nối mới.

## Kết nối với một nút khởi động {#connect-to-a-bootnode}

Hầu hết các client đều có sẵn một danh sách các nút khởi động được tích hợp, nhưng bạn cũng có thể muốn chạy nút khởi động của riêng mình, hoặc sử dụng một nút không nằm trong danh sách được mã hóa cứng của client. Trong trường hợp này, bạn có thể chỉ định chúng khi khởi động client của mình, như sau (ví dụ dành cho Geth, vui lòng kiểm tra tài liệu client của bạn):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Chạy một nút khởi động {#run-a-bootnode}

Các nút khởi động là các nút đầy đủ không nằm sau NAT ([Network Address Translation - Biên dịch Địa chỉ Mạng](https://www.geeksforgeeks.org/network-address-translation-nat/)). Mọi nút đầy đủ đều có thể hoạt động như một nút khởi động miễn là nó có thể truy cập công khai.

Khi bạn khởi động một nút, nó sẽ ghi nhật ký [enode](/developers/docs/networking-layer/network-addresses/#enode) của bạn, đây là một định danh công khai mà những người khác có thể sử dụng để kết nối với nút của bạn.

Enode thường được tạo lại sau mỗi lần khởi động lại, vì vậy hãy đảm bảo xem tài liệu client của bạn về cách tạo một enode cố định cho nút khởi động của bạn.

Để trở thành một nút khởi động tốt, bạn nên tăng số lượng peer tối đa có thể kết nối với nó. Việc chạy một nút khởi động với nhiều peer sẽ làm tăng đáng kể yêu cầu về băng thông.

## Các nút khởi động có sẵn {#available-bootnodes}

Bạn có thể tìm thấy danh sách các nút khởi động được tích hợp sẵn trong go-ethereum [tại đây](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Các nút khởi động này được duy trì bởi Tổ chức Ethereum và đội ngũ go-ethereum.

Ngoài ra còn có các danh sách nút khởi động khác do các tình nguyện viên duy trì. Vui lòng đảm bảo luôn bao gồm ít nhất một nút khởi động chính thức, nếu không bạn có thể bị tấn công nhật thực (eclipse attack).