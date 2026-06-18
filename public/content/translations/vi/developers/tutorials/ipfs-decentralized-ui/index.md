---
title: IPFS cho các giao diện người dùng phi tập trung
description: Hướng dẫn này dạy người đọc cách sử dụng IPFS để lưu trữ giao diện người dùng cho một dapp. Mặc dù dữ liệu và logic nghiệp vụ của ứng dụng là phi tập trung, nhưng nếu không có giao diện người dùng kháng kiểm duyệt, người dùng vẫn có thể mất quyền truy cập vào nó.
author: Ori Pomerantz
tags:
  - ipfs
  - dapp
  - frontend
skill: beginner
breadcrumb: IPFS cho giao diện người dùng dapp
lang: vi
published: 2024-06-29
---

Bạn đã viết một ứng dụng phi tập trung (dapp) mới tuyệt vời. Bạn thậm chí đã viết một [giao diện người dùng](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) cho nó. Nhưng bây giờ bạn sợ rằng ai đó sẽ cố gắng kiểm duyệt nó bằng cách đánh sập giao diện người dùng của bạn, vốn chỉ là một máy chủ trên đám mây. Trong hướng dẫn này, bạn sẽ học cách tránh bị kiểm duyệt bằng cách đưa giao diện người dùng của mình lên **[hệ thống tệp liên hành tinh (IPFS)](https://ipfs.tech/developers/)** để bất kỳ ai quan tâm đều có thể ghim nó trên một máy chủ để truy cập trong tương lai.

Bạn có thể sử dụng một dịch vụ của bên thứ ba như [Fleek](https://resources.fleek.xyz/docs/) để thực hiện toàn bộ công việc. Hướng dẫn này dành cho những người muốn tự làm đủ nhiều để hiểu những gì họ đang làm ngay cả khi việc đó tốn nhiều công sức hơn.

## Bắt đầu trên máy cục bộ {#getting-started-locally}

Có nhiều [nhà cung cấp IPFS bên thứ ba](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), nhưng tốt nhất là bắt đầu bằng cách chạy IPFS cục bộ để thử nghiệm.

1. Cài đặt [giao diện người dùng IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Tạo một thư mục chứa trang web của bạn. Nếu bạn đang sử dụng [Vite](https://vite.dev/), hãy sử dụng lệnh này:

   ```sh
   pnpm vite build
   ```

3. Trong IPFS Desktop, nhấp vào **Import > Folder** và chọn thư mục bạn đã tạo ở bước trước.

4. Chọn thư mục bạn vừa tải lên và nhấp vào **Rename**. Đặt cho nó một cái tên có ý nghĩa hơn.

5. Chọn lại thư mục đó và nhấp vào **Share link**. Sao chép URL vào khay nhớ tạm. Liên kết sẽ tương tự như `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Nhấp vào **Status**. Mở rộng tab **Advanced** để xem Địa chỉ cổng kết nối (gateway). Ví dụ: trên hệ thống của tôi, Địa chỉ là `http://127.0.0.1:8080`.

7. Kết hợp đường dẫn từ bước lấy liên kết với Địa chỉ cổng kết nối để tìm Địa chỉ của bạn. Ví dụ: đối với ví dụ trên, URL là `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Mở URL đó trong trình duyệt để xem trang web của bạn.

## Tải lên {#uploading}

Vậy là bây giờ bạn có thể sử dụng IPFS để phục vụ các tệp cục bộ, điều này không thú vị lắm. Bước tiếp theo là làm cho chúng có sẵn cho mọi người trên thế giới khi bạn ngoại tuyến.

Có một số [dịch vụ ghim (pinning services)](https://docs.ipfs.tech/concepts/persistence/#pinning-services) nổi tiếng. Hãy chọn một trong số đó. Bất kể bạn sử dụng dịch vụ nào, bạn cần tạo một Tài khoản và cung cấp cho nó **mã định danh nội dung (CID)** trong IPFS desktop của bạn.

Cá nhân tôi thấy [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) là dễ sử dụng nhất. Dưới đây là hướng dẫn cho dịch vụ này:

1. Truy cập vào [bảng điều khiển](https://dashboard.4everland.org/overview) và đăng nhập bằng Ví của bạn.

2. Ở thanh bên trái, nhấp vào **Storage > 4EVER Pin**.

3. Nhấp vào **Upload > Selected CID**. Đặt tên cho nội dung của bạn và cung cấp CID từ IPFS desktop. Hiện tại, CID là một chuỗi bắt đầu bằng `Qm` theo sau là 44 chữ cái và chữ số đại diện cho một Mã băm [được mã hóa base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), chẳng hạn như `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, nhưng [điều đó có khả năng sẽ thay đổi](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Trạng thái ban đầu là **Queued**. Tải lại trang cho đến khi nó chuyển thành **Pinned**.

5. Nhấp vào CID của bạn để lấy liên kết. Bạn có thể xem ứng dụng của tôi [tại đây](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Bạn có thể cần kích hoạt Tài khoản của mình để ghim nó trong hơn một tháng. Sự kích hoạt Tài khoản tốn khoảng 1 đô la. Nếu bạn đã đóng thông báo đó, hãy đăng xuất và đăng nhập lại để được yêu cầu kích hoạt lại.

## Sử dụng từ IPFS {#using-from-ipfs}

Tại thời điểm này, bạn có một liên kết đến một cổng kết nối tập trung phục vụ nội dung IPFS của bạn. Tóm lại, giao diện người dùng của bạn có thể an toàn hơn một chút nhưng nó vẫn chưa kháng kiểm duyệt. Để thực sự kháng kiểm duyệt, người dùng cần sử dụng IPFS [trực tiếp từ trình duyệt](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Khi bạn đã cài đặt xong (và IPFS desktop đang hoạt động), bạn có thể truy cập [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) trên bất kỳ trang web nào và bạn sẽ nhận được nội dung đó, được phục vụ theo cách phi tập trung.

## Hạn chế {#drawbacks}

Bạn không thể xóa các tệp IPFS một cách đáng tin cậy, vì vậy miễn là bạn đang sửa đổi giao diện người dùng của mình, có lẽ tốt nhất là để nó tập trung hoặc sử dụng [hệ thống tên liên hành tinh (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), một hệ thống cung cấp khả năng thay đổi trên nền tảng IPFS. Tất nhiên, bất cứ thứ gì có thể thay đổi đều có thể bị kiểm duyệt, trong trường hợp của IPNS là bằng cách gây áp lực lên người giữ khóa riêng tư tương ứng với nó.

Ngoài ra, một số gói (packages) gặp vấn đề với IPFS, vì vậy nếu trang web của bạn rất phức tạp thì đó có thể không phải là một giải pháp tốt. Và tất nhiên, bất cứ thứ gì dựa vào sự tích hợp máy chủ đều không thể trở nên phi tập trung chỉ bằng cách đặt phía máy khách (client side) trên IPFS.

## Khả năng khám phá thông qua ENS {#discoverability}

Nếu bạn trỏ một tên ENS (như vitalik.eth) đến trang web của mình, nó sẽ được coi là một trang web hoàn toàn phi tập trung và sẽ được tự động ghim bởi dịch vụ [dweb3.wtf](https://dweb3.wtf), cũng như có thể tìm kiếm được thông qua công cụ tìm kiếm [web3compass.net](https://web3compass.net), giống như cách DuckDuckGo, Brave Search hoặc Google làm cho web truyền thống.

## Kết luận {#conclusion}

Giống như Ethereum cho phép bạn phi tập trung hóa cơ sở dữ liệu và các khía cạnh logic nghiệp vụ của dapp, IPFS cho phép bạn phi tập trung hóa giao diện người dùng. Điều này giúp bạn loại bỏ thêm một hướng tấn công (attack vector) nhắm vào dapp của bạn.

[Xem thêm các bài viết khác của tôi tại đây](https://cryptodocguy.pro/).