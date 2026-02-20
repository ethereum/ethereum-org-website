---
title: "Giới thiệu kỹ thuật về ứng dụng phi tập trung"
description:
lang: vi
---

Một ứng dụng phi tập trung (dapp) là một ứng dụng được xây dựng trên một mạng phi tập trung kết hợp một [hợp đồng thông minh](/developers/docs/smart-contracts/) và một giao diện người dùng frontend. Trên Ethereum, các smartcontract có thể truy cập và minh bạch giống như các API mở, Dapp của bạn thậm chí có thể bao gồm một smartcontract mà người khác đã viết.

## Điều kiện tiên quyết {#prerequisites}

Trước khi tìm hiểu về các ứng dụng phi tập trung, bạn nên nắm những [kiến thức cơ bản về chuỗi khối](/developers/docs/intro-to-ethereum/) và đọc về mạng Ethereum cũng như cách nó được phi tập trung hóa.

## Định nghĩa về dapp {#definition-of-a-dapp}

Một dapp có backend của nó chạy trên một mạng phi tập trung ngang hàng. Ngược lại điều này với một ứng dụng có backend đang chạy trên các máy chủ tập trung.

Một Dapp có thể có frontend và giao diện người dùng được viết bằng bất cứ ngôn ngữ nào ( giống như một app) để thực hiện các hành động tới backend. Hơn nữa, giao diện frontend của nó có thể được lưu trữ trên bộ nhớ phi tập trung như [IPFS](https://ipfs.io/).

- **Phi tập trung** - các ứng dụng phi tập trung hoạt động trên Ethereum, một nền tảng phi tập trung công khai, mở, nơi không một cá nhân hay tổ chức nào có quyền kiểm soát
- **Tất định** - các ứng dụng phi tập trung thực hiện cùng một chức năng bất kể môi trường mà chúng được thực thi
- **Hoàn thiện Turing** - các ứng dụng phi tập trung có thể thực hiện bất kỳ hành động nào nếu được cung cấp đủ các tài nguyên cần thiết
- **Cô lập** - các ứng dụng phi tập trung được thực thi trong một môi trường ảo được gọi là Máy ảo Ethereum (EVM), do đó, nếu hợp đồng thông minh có lỗi, nó sẽ không cản trở hoạt động bình thường của mạng chuỗi khối

### Về hợp đồng thông minh {#on-smart-contracts}

Để giới thiệu Dapps, chúng ta cần giới thiệu các smartcontract- một backend của dapp vì không có thuật ngữ nào tốt hơn để giới thiệu. Để có cái nhìn tổng quan chi tiết, hãy chuyển đến phần của chúng tôi về [hợp đồng thông minh](/developers/docs/smart-contracts/).

Smartcontract là những code thực thi trên Ethereum blockchain và chạy chính xác như được lập trình. Sau khi các smart contract được triển khai trên network, bạn không thể thay đổi. Dapps có thể được phân cấp vì chúng được kiểm soát bởi logic được ghi trong contract, không phải là một cá nhân hay một tổ chức. Bạn cần thiết kế contract của mình rất cẩn thận và kiểm tra chúng một cách kĩ lưỡng.

## Lợi ích của việc phát triển ứng dụng phi tập trung {#benefits-of-dapp-development}

- **Không có thời gian chết** – Một khi hợp đồng thông minh được triển khai trên chuỗi khối, toàn bộ mạng lưới sẽ luôn có thể phục vụ các máy khách muốn tương tác với hợp đồng. Do đó, các tác nhân độc hại không thể khởi động các cuộc tấn công từ chối dịch vụ nhằm vào các dapp riêng lẻ.
- **Quyền riêng tư** – Bạn không cần cung cấp danh tính trong thế giới thực để triển khai hoặc tương tác với một ứng dụng phi tập trung.
- **Chống kiểm duyệt** – Không một thực thể đơn lẻ nào trên mạng có thể chặn người dùng gửi giao dịch, triển khai các ứng dụng phi tập trung, hoặc đọc dữ liệu từ chuỗi khối.
- **Toàn vẹn dữ liệu tuyệt đối** – Dữ liệu được lưu trữ trên chuỗi khối là bất biến và không thể chối cãi, nhờ vào các nguyên hàm mật mã. Các tác nhân độc hại không thể giả mạo các giao dịch hoặc dữ liệu khác đã được công khai.
- **Tính toán phi tín nhiệm/hành vi có thể xác minh** – Các hợp đồng thông minh có thể được phân tích và được đảm bảo thực thi theo những cách có thể dự đoán được mà không cần phải tin tưởng vào một cơ quan trung ương. Điều này không đúng trong các mô hình truyền thống, ví dụ: Khi sử dụng các ngân hàng online, chúng ta phải tin tưởng các tổ chức tài chính sẽ không sử dụng sai số liệu tài chính của chúng ta, giả mạo hồ sơ hoặc bị tấn công.

## Nhược điểm của việc phát triển ứng dụng phi tập trung {#drawbacks-of-dapp-development}

- **Bảo trì** – Các ứng dụng phi tập trung có thể khó bảo trì hơn vì mã và dữ liệu được công bố trên chuỗi khối khó sửa đổi hơn. Các developes khó có thể update dapp của họ sau khi chúng được release, ngay cả khi lỗi hoặc rủi ro bảo mật được xác định trong phiên bản cũ.
- **Chi phí hiệu suất** – Có một chi phí hiệu suất rất lớn, và việc thay đổi quy mô là thực sự khó khăn. Để đạt được tính bảo mật, tính toàn vẹn và tính minh bạch mà Ethereum mong muốn thì các node đều chạy và lưu trữ mọi giao dịch. Cơ chế đồng thuận bằng chứng cổ phần cũng cần có thời gian.
- **Tắc nghẽn mạng** – Khi một ứng dụng phi tập trung sử dụng quá nhiều tài nguyên tính toán, toàn bộ mạng sẽ bị tắc nghẽn. Hiện tại, theo tính toán thì network có thể xử lý khoảng 10-15 giao dịch mỗi giây. Nếu các yêu cầu giao dịch nhanh hơn mức này, nhóm các giao dịch chưa được xử lý sẽ nhanh chóng tăng vọt.
- **Trải nghiệm người dùng** – Có thể khó hơn để thiết kế các trải nghiệm thân thiện với người dùng vì người dùng cuối thông thường có thể thấy quá khó để thiết lập một bộ công cụ cần thiết để tương tác với chuỗi khối một cách thực sự an toàn.
- **Tập trung hóa** – Các giải pháp thân thiện với người dùng và nhà phát triển được xây dựng trên lớp cơ sở của Ethereum cuối cùng có thể trông giống như các dịch vụ tập trung. Ví dụ: các dịch vụ như vậy có thể lưu trữ khóa hoặc thông tin nhạy cảm khác ở phía máy chủ, phục vụ giao diện người dùng sử dụng máy chủ tập trung hoặc chạy logic nghiệp vụ quan trọng trên máy chủ tập trung trước khi ghi vào chuỗi khối. Tập trung hóa loại bỏ nhiều (nếu không phải tất cả) những lợi thế của blockchain so với mô hình truyền thống.

## Tìm hiểu thêm từ video trực quan? Người học qua hình ảnh {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Các công cụ để tạo các ứng dụng phi tập trung {#dapp-tools}

**Scaffold-ETH _- Nhanh chóng thử nghiệm với Solidity bằng một giao diện frontend có thể tự điều chỉnh theo hợp đồng thông minh của bạn._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Ví dụ về ứng dụng phi tập trung](https://punkwallet.io/)

**Create Eth App _- Tạo các ứng dụng chạy trên Ethereum chỉ với một lệnh._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Công cụ FOSS để tạo giao diện frontend cho ứng dụng phi tập trung từ một [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Công cụ FOSS cho các nhà phát triển Ethereum để kiểm tra nút của họ, cũng như soạn và gỡ lỗi các lệnh gọi RPC từ trình duyệt._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- Các bộ SDK cho mọi ngôn ngữ, hợp đồng thông minh, công cụ, và cơ sở hạ tầng cho việc phát triển web3._**

- [Trang chủ](https://thirdweb.com/)
- [Tài liệu tham khảo](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Nền tảng phát triển web3 cấp doanh nghiệp để triển khai các hợp đồng thông minh, cho phép thanh toán bằng thẻ tín dụng và đa chuỗi, và sử dụng các API để tạo, phân phối, bán, lưu trữ và chỉnh sửa NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Tài liệu tham khảo](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Đọc thêm {#further-reading}

- [Khám phá các ứng dụng phi tập trung](/apps)
- [Kiến trúc của một ứng dụng Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Hướng dẫn về các ứng dụng phi tập trung năm 2021](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Ứng dụng phi tập trung là gì?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Các ứng dụng phi tập trung phổ biến](https://www.alchemy.com/dapps) - _Alchemy_

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Giới thiệu về bộ công cụ Ethereum](/developers/docs/ethereum-stack/)
- [Các khung phát triển](/developers/docs/frameworks/)
