---
title: "Giới thiệu kỹ thuật về dapp"
description:
lang: vi
---

Một ứng dụng phi tập trung (dapp) là một ứng dụng được xây dựng trên một mạng lưới phi tập trung, kết hợp một [hợp đồng thông minh](/developers/docs/smart-contracts/) và một giao diện người dùng frontend. Trên [Ethereum](/), các hợp đồng thông minh có thể truy cập được và minh bạch – giống như các API mở – vì vậy dapp của bạn thậm chí có thể bao gồm một hợp đồng thông minh do người khác viết.

## Điều kiện tiên quyết {#prerequisites}

Trước khi tìm hiểu về dapp, bạn nên nắm vững [kiến thức cơ bản về Chuỗi khối](/developers/docs/intro-to-ethereum/) và đọc về mạng lưới Ethereum cũng như cách nó phi tập trung.

## Định nghĩa về dapp {#definition-of-a-dapp}

Một dapp có mã backend chạy trên một mạng lưới ngang hàng phi tập trung. Trái ngược với một ứng dụng thông thường nơi mã backend chạy trên các máy chủ tập trung.

Một dapp có thể có mã frontend và giao diện người dùng được viết bằng bất kỳ ngôn ngữ nào (giống như một ứng dụng) để thực hiện các lệnh gọi đến backend của nó. Hơn nữa, frontend của nó có thể được lưu trữ trên bộ lưu trữ phi tập trung như [IPFS](https://ipfs.io/).

- **Phi tập trung** - các dapp hoạt động trên Ethereum, một nền tảng phi tập trung công khai mở, nơi không một cá nhân hay nhóm nào có quyền kiểm soát
- **Tất định** - các dapp thực hiện cùng một chức năng bất kể môi trường mà chúng được thực thi
- **Turing hoàn chỉnh** - các dapp có thể thực hiện bất kỳ hành động nào nếu được cung cấp các tài nguyên cần thiết
- **Bị cô lập** - các dapp được thực thi trong một môi trường ảo được gọi là Máy ảo Ethereum (EVM) để nếu hợp đồng thông minh có lỗi, nó sẽ không cản trở hoạt động bình thường của mạng lưới Chuỗi khối

### Về hợp đồng thông minh {#on-smart-contracts}

Để giới thiệu về dapp, chúng ta cần giới thiệu về hợp đồng thông minh – backend của một dapp (nếu không có thuật ngữ nào tốt hơn). Để có cái nhìn tổng quan chi tiết, hãy chuyển đến phần của chúng tôi về [hợp đồng thông minh](/developers/docs/smart-contracts/).

Một hợp đồng thông minh là mã tồn tại trên Chuỗi khối Ethereum và chạy chính xác như được lập trình. Khi các hợp đồng thông minh được triển khai trên mạng lưới, bạn không thể thay đổi chúng. Các dapp có thể phi tập trung vì chúng được kiểm soát bởi logic được viết trong hợp đồng, chứ không phải một cá nhân hay công ty. Điều này cũng có nghĩa là bạn cần thiết kế các hợp đồng của mình rất cẩn thận và kiểm tra chúng một cách kỹ lưỡng.

## Lợi ích của việc phát triển dapp {#benefits-of-dapp-development}

- **Không có thời gian chết (Zero downtime)** – Khi hợp đồng thông minh được triển khai trên Chuỗi khối, toàn bộ mạng lưới sẽ luôn có thể phục vụ các máy khách muốn tương tác với hợp đồng. Do đó, các tác nhân độc hại không thể khởi chạy các cuộc tấn công từ chối dịch vụ nhắm vào các dapp riêng lẻ.
- **Quyền riêng tư** – Bạn không cần cung cấp danh tính thực tế để triển khai hoặc tương tác với một dapp.
- **Khả năng chống kiểm duyệt** – Không một thực thể đơn lẻ nào trên mạng lưới có thể chặn người dùng gửi giao dịch, triển khai dapp hoặc đọc dữ liệu từ Chuỗi khối.
- **Tính toàn vẹn dữ liệu hoàn toàn** – Dữ liệu được lưu trữ trên Chuỗi khối là bất biến và không thể chối cãi, nhờ vào các nguyên thủy mật mã học. Các tác nhân độc hại không thể giả mạo các giao dịch hoặc dữ liệu khác đã được công khai.
- **Tính toán không cần tin cậy/hành vi có thể xác minh** – Các hợp đồng thông minh có thể được phân tích và được đảm bảo thực thi theo những cách có thể dự đoán được, mà không cần phải tin tưởng vào một cơ quan trung ương. Điều này không đúng trong các mô hình truyền thống; ví dụ, khi chúng ta sử dụng các hệ thống ngân hàng trực tuyến, chúng ta phải tin tưởng rằng các tổ chức tài chính sẽ không lạm dụng dữ liệu tài chính của chúng ta, giả mạo hồ sơ hoặc bị hack.

## Hạn chế của việc phát triển dapp {#drawbacks-of-dapp-development}

- **Bảo trì** – Các dapp có thể khó bảo trì hơn vì mã và dữ liệu được xuất bản lên Chuỗi khối khó sửa đổi hơn. Rất khó để các nhà phát triển cập nhật dapp của họ (hoặc dữ liệu cơ bản được lưu trữ bởi một dapp) sau khi chúng được triển khai, ngay cả khi các lỗi hoặc rủi ro bảo mật được xác định trong một phiên bản cũ.
- **Chi phí hiệu suất** – Có một chi phí hiệu suất khổng lồ và việc mở rộng quy mô thực sự rất khó khăn. Để đạt được mức độ bảo mật, tính toàn vẹn, tính minh bạch và độ tin cậy mà Ethereum hướng tới, mọi nút đều chạy và lưu trữ mọi giao dịch. Thêm vào đó, sự đồng thuận Bằng chứng cổ phần (PoS) cũng cần có thời gian.
- **Tắc nghẽn mạng lưới** – Khi một dapp sử dụng quá nhiều tài nguyên tính toán, toàn bộ mạng lưới sẽ bị ùn ứ. Hiện tại, mạng lưới chỉ có thể xử lý khoảng 10-15 giao dịch mỗi giây; nếu các giao dịch được gửi vào nhanh hơn mức này, nhóm các giao dịch chưa được xác nhận có thể nhanh chóng phình to.
- **Trải nghiệm người dùng** – Có thể khó khăn hơn để thiết kế các trải nghiệm thân thiện với người dùng vì người dùng cuối trung bình có thể thấy quá khó để thiết lập một bộ công cụ cần thiết nhằm tương tác với Chuỗi khối một cách thực sự an toàn.
- **Sự tập trung hóa** – Các giải pháp thân thiện với người dùng và nhà phát triển được xây dựng trên lớp cơ sở của Ethereum dù sao cũng có thể trông giống như các dịch vụ tập trung. Ví dụ, các dịch vụ như vậy có thể lưu trữ khóa hoặc thông tin nhạy cảm khác ở phía máy chủ, phục vụ frontend bằng máy chủ tập trung hoặc chạy logic nghiệp vụ quan trọng trên máy chủ tập trung trước khi ghi vào Chuỗi khối. Sự tập trung hóa loại bỏ nhiều (nếu không muốn nói là tất cả) lợi thế của Chuỗi khối so với mô hình truyền thống.

## Bạn thích học qua hình ảnh hơn? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## Các công cụ để tạo dapp {#dapp-tools}

**Scaffold-ETH _- Nhanh chóng thử nghiệm với Solidity bằng cách sử dụng một frontend thích ứng với hợp đồng thông minh của bạn._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Dapp ví dụ](https://punkwallet.io/)

**Create Eth App _- Tạo các ứng dụng được hỗ trợ bởi Ethereum chỉ với một lệnh._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Công cụ FOSS để tạo frontend cho dapp từ một [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Công cụ FOSS dành cho các nhà phát triển Ethereum để kiểm tra nút của họ, cũng như soạn thảo & gỡ lỗi các lệnh gọi RPC từ trình duyệt._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDK bằng mọi ngôn ngữ, hợp đồng thông minh, công cụ và cơ sở hạ tầng cho phát triển Web3._**

- [Trang chủ](https://thirdweb.com/)
- [Tài liệu](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Nền tảng phát triển Web3 cấp doanh nghiệp để triển khai hợp đồng thông minh, cho phép thanh toán bằng thẻ tín dụng và xuyên Chuỗi, đồng thời sử dụng API để tạo, phân phối, bán, lưu trữ và chỉnh sửa NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Tài liệu](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Đọc thêm {#further-reading}

- [Khám phá các dapp](/apps)
- [Kiến trúc của một ứng dụng Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Hướng dẫn năm 2021 về các ứng dụng phi tập trung](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Ứng dụng phi tập trung là gì?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Các dapp phổ biến](https://www.alchemy.com/dapps) - _Alchemy_

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Chủ đề liên quan {#related-topics}

- [Giới thiệu về ngăn xếp Ethereum](/developers/docs/ethereum-stack/)
- [Các framework phát triển](/developers/docs/frameworks/)

## Hướng dẫn: Xây dựng ứng dụng và frontend trên Ethereum {#tutorials}

- [Hướng dẫn chi tiết về Hợp đồng Uniswap-v2](/developers/tutorials/uniswap-v2-annotated-code/) _– Một hướng dẫn có chú thích về các hợp đồng cốt lõi của Uniswap v2 giải thích cách nhà tạo lập thị trường tự động (AMM) hoạt động._
- [Xây dựng giao diện người dùng cho hợp đồng của bạn](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Cách xây dựng một frontend React + Wagmi hiện đại kết nối với hợp đồng thông minh của bạn._
- [Hợp đồng thông minh Hello World cho người mới bắt đầu – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Hướng dẫn từ đầu đến cuối: viết, triển khai và xây dựng frontend cho một hợp đồng thông minh đơn giản._
- [Các thành phần máy chủ và tác nhân cho ứng dụng Web3](/developers/tutorials/server-components/) _– Cách viết các thành phần máy chủ TypeScript lắng nghe các sự kiện Chuỗi khối và phản hồi bằng các giao dịch._
- [IPFS cho các giao diện người dùng phi tập trung](/developers/tutorials/ipfs-decentralized-ui/) _– Cách lưu trữ frontend của dapp của bạn trên IPFS để chống kiểm duyệt._