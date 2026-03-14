---
title: "Ethereum minh chứng tương lai"
description: "Những nâng cấp này củng cố Ethereum như một lớp nền tảng phi tập trung, linh hoạt cho tương lai, bất kể tương lai đó có ra sao."
lang: vi
image: /images/roadmap/roadmap-future.png
alt: "Lộ trình Ethereum"
template: roadmap
---

Một số phần trong lộ trình không nhất thiết phải cần thiết để mở rộng quy mô hoặc bảo mật Ethereum trong thời gian ngắn, nhưng sẽ thiết lập sự ổn định và độ tin cậy cho Ethereum trong tương lai xa.

## Kháng lượng tử {#quantum-resistance}

Một số [mật mã học](/glossary/#cryptography) bảo mật Ethereum hiện nay sẽ bị xâm phạm khi điện toán lượng tử trở thành hiện thực. Mặc dù máy tính lượng tử có lẽ phải mất hàng chục năm nữa mới có thể trở thành mối đe dọa thực sự đối với mật mã học hiện đại, nhưng Ethereum đang được xây dựng để đảm bảo an toàn trong nhiều thế kỉ tới. Điều này có nghĩa là làm cho [Ethereum kháng lượng tử](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) càng sớm càng tốt.

Thách thức mà các nhà phát triển Ethereum phải đối mặt là giao thức [bằng chứng cổ phần](/glossary/#pos) hiện tại dựa trên một lược đồ chữ ký rất hiệu quả được gọi là BLS để tổng hợp phiếu bầu cho các [khối](/glossary/#block) hợp lệ. Sơ đồ chữ ký này bị phá vỡ bởi máy tính lượng tử, nhưng các giải pháp thay thế kháng lượng tử thì không hiệu quả bằng.

Các [lược đồ cam kết “KZG”](/roadmap/danksharding/#what-is-kzg) được sử dụng ở một số nơi trên Ethereum để tạo bí mật mật mã được biết là dễ bị tấn công lượng tử. Hiện tại, điều này có thể được giải quyết bằng cách sử dụng "các thiết lập đáng tin cậy" (trong đó lể thiết lập chính đã hoàn thành thành công vào năm 2023), trong đó nhiều người dùng đã tạo ra tính ngẫu nhiên mà máy tính lượng tử không thể đảo ngược được. Tuy nhiên, giải pháp lý tưởng lâu dài sẽ là kết hợp mật mã an toàn lượng tử. Có hai phương pháp tiếp cận hàng đầu có thể trở thành sự thay thế hiệu quả cho lược đồ BLS: ký [dựa trên STARK](https://hackmd.io/@vbuterin/stark_aggregation) và [dựa trên lattice](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Những điều này vẫn đang được nghiên cứu và phát triển bản thử nghiệm**.

[Đọc về KZG và các thiết lập đáng tin cậy](/roadmap/danksharding#what-is-kzg)

## Ethereum đơn giản và hiệu quả hơn {#simpler-more-efficient-ethereum}

Độ phức tạp tạo ra cơ hội cho các lỗi hoặc lỗ hổng mà những kẻ tấn công có thể khai thác. Do đó, một phần của lộ trình là đơn giản hóa Ethereum và loại bỏ hoặc sửa đổi mã đã tồn tại qua nhiều lần nâng cấp nhưng không còn cần thiết hoặc hiện có thể được cải thiện. Một cơ sở mã gọn gàng, đơn giản hơn sẽ giúp các nhà phát triển dễ dàng bảo trì và suy luận hơn.

Để làm cho [Máy ảo Ethereum (EVM)](/developers/docs/evm) đơn giản và hiệu quả hơn, các cải tiến liên tục được nghiên cứu và triển khai. Điều này bao gồm cả việc giải quyết các thành phần cũ và đưa ra các biện pháp tối ưu hóa.

**Những thay đổi gần đây đã được áp dụng:**

- **Đại tu việc tính toán Gas:** Cách tính [gas](/glossary/#gas) đã được cải thiện đáng kể với **EIP-1559 (được triển khai trong bản nâng cấp London, 2021)**, giới thiệu một phí cơ bản và cơ chế đốt để định giá giao dịch dễ dự đoán hơn.
- **Hạn chế `SELFDESTRUCT`:** Mã lệnh `SELFDESTRUCT`, dù hiếm khi được sử dụng, vẫn tiềm ẩn những rủi ro. Chức năng của nó đã bị **hạn chế đáng kể trong bản nâng cấp Dencun (tháng 3 năm 2024) thông qua EIP-6780** để giảm thiểu các mối nguy hiểm, đặc biệt là liên quan đến quản lý trạng thái.
- **Các loại giao dịch được hiện đại hóa:** Các định dạng giao dịch mới đã được giới thiệu (ví dụ: thông qua **EIP-2718** và **EIP-4844** cho các blob trong bản nâng cấp Dencun) để hỗ trợ các tính năng mới và cải thiện hiệu quả so với các loại cũ.

**Mục tiêu cho hiện tại và tương lai:**

- **Xử lý sâu hơn về `SELFDESTRUCT`:** Mặc dù đã bị hạn chế, **khả năng loại bỏ hoàn toàn** mã lệnh `SELFDESTRUCT` vẫn đang được xem xét cho các bản nâng cấp trong tương lai để đơn giản hóa hơn nữa trạng thái EVM. ([Bối cảnh chi tiết hơn về các vấn đề của SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Loại bỏ dần các giao dịch cũ:** Mặc dù các [máy khách Ethereum](/glossary/#consensus-client) vẫn hỗ trợ các loại giao dịch cũ hơn để đảm bảo khả năng tương thích ngược, mục tiêu là khuyến khích việc chuyển sang các loại mới hơn và **có khả năng ngừng hỗ trợ hoặc loại bỏ hoàn toàn các định dạng cũ nhất** trong tương lai.
- **Tiếp tục nghiên cứu hiệu quả gas:** Việc khám phá các **tinh chỉnh sâu hơn cho việc tính toán gas** vẫn đang được tiếp tục, có khả năng bao gồm các khái niệm như gas đa chiều để phản ánh tốt hơn việc sử dụng tài nguyên.
- **Tối ưu hóa các hoạt động mật mã:** Các nỗ lực đang được tiếp tục để **đưa vào các phương pháp hiệu quả hơn cho phép tính số học** làm nền tảng cho các hoạt động mật mã được sử dụng trong EVM.

Tương tự, có những cập nhật có thể được thực hiện cho các phần khác của các ứng dụng Ethereum hiện tại. Một ví dụ là các ứng dụng thực thi và đồng thuận hiện tại sử dụng các loại nén dữ liệu khác nhau. Việc chia sẻ dữ liệu giữa các ứng dụng sẽ dễ dàng và trực quan hơn nhiều khi lược đồ nén được thống nhất trên toàn mạng. Điều này vẫn là một lĩnh vực đang được khám phá.

## Tiến độ hiện tại {#current-progress}

Nhiều bản nâng cấp đảm bảo cho tương lai lâu dài, đặc biệt là **khả năng kháng lượng tử hoàn toàn cho các giao thức cốt lõi, vẫn đang trong giai đoạn nghiên cứu và có thể còn vài năm nữa** mới được triển khai.

Tuy nhiên, **tiến bộ đáng kể đã đạt được trong các nỗ lực đơn giản hóa.** Ví dụ, các thay đổi chính như **hạn chế `SELFDESTRUCT` (EIP-6780)** và giới thiệu **các giao dịch mang blob (EIP-4844)** đã được triển khai trong **bản nâng cấp Dencun (tháng 3 năm 2024)**. Công việc hài hòa các cơ chế nén của ứng dụng và những cải tiến hiệu suất khác cũng đang được tiếp tục.

**Đọc thêm**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Cấu trúc dữ liệu](/developers/docs/data-structures-and-encoding)