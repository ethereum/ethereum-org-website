---
title: "IPFS cho giao diện người dùng phi tập trung"
description: "Hướng dẫn này dạy người đọc cách sử dụng IPFS để lưu trữ giao diện người dùng cho một ứng dụng phi tập trung. Mặc dù dữ liệu và logic nghiệp vụ của ứng dụng được phân cấp, nhưng nếu không có giao diện người dùng chống kiểm duyệt, người dùng vẫn có thể mất quyền truy cập vào ứng dụng đó."
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: beginner
lang: vi
published: 2024-06-29
---

Bạn đã viết một ứng dụng phi tập trung mới lạ đáng kinh ngạc. Bạn thậm chí đã viết một [giao diện người dùng](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) cho nó. Nhưng bây giờ bạn sợ rằng ai đó sẽ cố gắng kiểm duyệt nó bằng cách đánh sập giao diện người dùng của bạn, vốn chỉ là một máy chủ trên đám mây. Trong hướng dẫn này, bạn sẽ học cách tránh kiểm duyệt bằng cách đưa giao diện người dùng của bạn lên **[hệ thống tệp liên hành tinh (IPFS)](https://ipfs.tech/developers/)** để bất kỳ ai quan tâm đều có thể ghim nó trên máy chủ để truy cập trong tương lai.

Bạn có thể sử dụng một dịch vụ của bên thứ ba như [Fleek](https://resources.fleek.xyz/docs/) để thực hiện tất cả công việc. Hướng dẫn này dành cho những người muốn tự mình thực hiện đủ để hiểu những gì họ đang làm ngay cả khi nó tốn nhiều công sức hơn.

## Bắt đầu tại máy {#getting-started-locally}

Có nhiều [nhà cung cấp IPFS bên thứ ba](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), nhưng tốt nhất là nên bắt đầu chạy IPFS tại máy để thử nghiệm.

1. Cài đặt [giao diện người dùng IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Tạo một thư mục với trang web của bạn. Nếu bạn đang dùng [Vite](https://vite.dev/), hãy dùng lệnh này:

   ```sh
   pnpm vite build
   ```

3. Trong IPFS Desktop, hãy nhấp vào **Nhập > Thư mục** và chọn thư mục bạn đã tạo ở bước trước.

4. Chọn thư mục bạn vừa tải lên và nhấp vào **Đổi tên**. Đặt cho nó một cái tên có ý nghĩa hơn.

5. Chọn lại nó và nhấp vào **Chia sẻ liên kết**. Sao chép URL vào bảng nhớ tạm. Liên kết sẽ tương tự như `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Nhấp vào **Trạng thái**. Mở rộng tab **Nâng cao** để xem địa chỉ cổng. Ví dụ, trên hệ thống của tôi, địa chỉ là `http://127.0.0.1:8080`.

7. Kết hợp đường dẫn từ bước liên kết với địa chỉ cổng để tìm địa chỉ của bạn. Ví dụ: đối với ví dụ trên, URL là `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Mở URL đó trong trình duyệt để xem trang của bạn.

## Tải lên {#uploading}

Vậy bây giờ bạn có thể sử dụng IPFS để phân phát các tệp tại máy, điều này không thú vị lắm. Bước tiếp theo là làm cho chúng có thể truy cập được cho cả thế giới khi bạn ngoại tuyến.

Có một số [dịch vụ ghim](https://docs.ipfs.tech/concepts/persistence/#pinning-services) nổi tiếng. Chọn một trong số chúng. Bất kể bạn sử dụng dịch vụ nào, bạn cần tạo một tài khoản và cung cấp cho nó **mã định danh nội dung (CID)** trong IPFS desktop của bạn.

Cá nhân tôi thấy [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) là dễ sử dụng nhất. Đây là hướng dẫn cho nó:

1. Truy cập vào [bảng điều khiển](https://dashboard.4everland.org/overview) và đăng nhập bằng ví của bạn.

2. Trong thanh bên trái, hãy nhấp vào **Lưu trữ > 4EVER Pin**.

3. Nhấp vào **Tải lên > CID đã chọn**. Đặt tên cho nội dung của bạn và cung cấp CID từ IPFS desktop. Hiện tại, CID là một chuỗi bắt đầu bằng `Qm`, theo sau là 44 chữ cái và chữ số đại diện cho một [hàm băm được mã hóa theo base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), chẳng hạn như `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, nhưng [điều đó có thể sẽ thay đổi](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Trạng thái ban đầu là **Đang chờ xử lý**. Tải lại cho đến khi nó chuyển thành **Đã ghim**.

5. Nhấp vào CID của bạn để lấy liên kết. Bạn có thể xem ứng dụng của tôi [tại đây](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im/).

6. Bạn có thể cần phải kích hoạt tài khoản của mình để được ghim trong hơn một tháng. Việc kích hoạt tài khoản tốn khoảng 1$. Nếu bạn đã đóng nó, hãy đăng xuất và đăng nhập lại để được yêu cầu kích hoạt lần nữa.

## Sử dụng từ IPFS {#using-from-ipfs}

Tại thời điểm này, bạn có một liên kết đến một cổng tập trung phục vụ nội dung IPFS của bạn. Nói tóm lại, giao diện người dùng của bạn có thể an toàn hơn một chút nhưng nó vẫn chưa có khả năng chống kiểm duyệt. Để có khả năng chống kiểm duyệt thực sự, người dùng cần sử dụng IPFS [trực tiếp từ trình duyệt](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Sau khi bạn đã cài đặt nó (và IPFS desktop đang hoạt động), bạn có thể truy cập [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) trên bất kỳ trang nào và bạn sẽ nhận được nội dung đó, được phân phát theo cách phi tập trung.

## Nhược điểm {#drawbacks}

Bạn không thể xóa các tệp IPFS một cách đáng tin cậy, vì vậy miễn là bạn đang sửa đổi giao diện người dùng của mình, có lẽ tốt nhất là để nó ở dạng tập trung hoặc sử dụng [hệ thống tên liên hành tinh (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), một hệ thống cung cấp khả năng thay đổi trên IPFS. Tất nhiên, bất cứ thứ gì có thể thay đổi đều có thể bị kiểm duyệt, trong trường hợp của IPNS là bằng cách gây áp lực cho người có khoá riêng tư tương ứng với nó.

Ngoài ra, một số gói gặp sự cố với IPFS, vì vậy nếu trang web của bạn rất phức tạp thì đó có thể không phải là một giải pháp tốt. Và tất nhiên, bất cứ thứ gì phụ thuộc vào tích hợp máy chủ đều không thể phi tập trung hóa chỉ bằng cách đặt phía client trên IPFS.

## Kết luận {#conclusion}

Giống như Ethereum cho phép bạn phi tập trung hóa các khía cạnh cơ sở dữ liệu và logic nghiệp vụ của ứng dụng phi tập trung của bạn, IPFS cho phép bạn phi tập trung hóa giao diện người dùng. Điều này cho phép bạn loại bỏ thêm một vectơ tấn công khác chống lại ứng dụng phi tập trung của mình.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).
