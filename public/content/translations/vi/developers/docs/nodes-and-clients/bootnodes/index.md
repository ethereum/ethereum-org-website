---
title: Giới thiệu về các bootnode Ethereum
description: Thông tin cơ bản bạn cần biết để hiểu về các bootnode
lang: vi
---

Khi một nút mới tham gia mạng Ethereum, nó cần kết nối với các nút đã có trên mạng để sau đó khám phá các nút ngang hàng mới. Các điểm vào mạng Ethereum này được gọi là bootnode. Các ứng dụng thường có một danh sách các bootnode được mã hóa cứng vào chúng. Các bootnode này thường được vận hành bởi đội ngũ devops của Ethereum Foundation hoặc chính các đội ngũ phát triển ứng dụng. Lưu ý rằng bootnode không giống như các nút tĩnh. Các nút tĩnh được gọi lặp đi lặp lại, trong khi các bootnode chỉ được gọi khi không có đủ nút ngang hàng để kết nối và một nút cần khởi tạo một số kết nối mới.

## Kết nối với một bootnode {#connect-to-a-bootnode}

Hầu hết các ứng dụng đều có danh sách các bootnode được tích hợp sẵn, nhưng bạn cũng có thể muốn chạy bootnode của riêng mình hoặc sử dụng một bootnode không có trong danh sách được mã hóa cứng của ứng dụng. Trong trường hợp này, bạn có thể chỉ định chúng khi khởi động ứng dụng của mình, như sau (ví dụ dành cho Geth, vui lòng kiểm tra tài liệu tham khảo của ứng dụng của bạn):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Chạy một bootnode {#run-a-bootnode}

Bootnode là các nút đầy đủ không nằm sau NAT ([Dịch địa chỉ mạng](https://www.geeksforgeeks.org/network-address-translation-nat/)). Mọi nút đầy đủ đều có thể hoạt động như một bootnode miễn là nó có sẵn công khai.

Khi bạn khởi động một nút, nó sẽ ghi lại [enode](/developers/docs/networking-layer/network-addresses/#enode) của bạn, đây là một mã định danh công khai mà những người khác có thể sử dụng để kết nối với nút của bạn.

Enode thường được tạo lại sau mỗi lần khởi động lại, vì vậy hãy đảm bảo xem tài liệu tham khảo của ứng dụng để biết cách tạo enode cố định cho bootnode của bạn.

Để trở thành một bootnode tốt, bạn nên tăng số lượng nút ngang hàng tối đa có thể kết nối với nó. Việc chạy một bootnode với nhiều nút ngang hàng sẽ làm tăng đáng kể yêu cầu về băng thông.

## Các bootnode có sẵn {#available-bootnodes}

Bạn có thể tìm thấy một danh sách các bootnode tích hợp sẵn trong go-ethereum [tại đây](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Các bootnode này được duy trì bởi Ethereum Foundation và đội ngũ go-ethereum.

Có các danh sách bootnode khác được duy trì bởi các tình nguyện viên. Vui lòng đảm bảo luôn bao gồm ít nhất một bootnode chính thức, nếu không bạn có thể bị tấn công che khuất.
