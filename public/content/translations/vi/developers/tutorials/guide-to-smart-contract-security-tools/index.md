---
title: "Hướng dẫn về các công cụ bảo mật hợp đồng thông minh"
description: "Tổng quan về ba kỹ thuật kiểm thử và phân tích chương trình khác nhau"
author: "Trailofbits"
lang: vi
tags: ["Solidity", "hợp đồng thông minh", "bảo mật"]
skill: intermediate
breadcrumb: "Công cụ bảo mật"
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Chúng ta sẽ sử dụng ba kỹ thuật kiểm thử và phân tích chương trình riêng biệt:

- **Phân tích tĩnh với [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Tất cả các đường dẫn của chương trình được ước lượng và phân tích cùng một lúc, thông qua các cách trình bày chương trình khác nhau (ví dụ: biểu đồ luồng điều khiển - control-flow-graph).
- **Fuzzing với [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Mã được thực thi với việc tạo giao dịch giả ngẫu nhiên. Trình fuzzer sẽ cố gắng tìm một chuỗi các giao dịch vi phạm một thuộc tính nhất định.
- **Thực thi tượng trưng với [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Một kỹ thuật xác minh hình thức, dịch từng đường dẫn thực thi thành một công thức toán học, trên đó các ràng buộc có thể được kiểm tra.

Mỗi kỹ thuật đều có những ưu điểm và cạm bẫy riêng, và sẽ hữu ích trong [các trường hợp cụ thể](#determining-security-properties):

| Kỹ thuật | Công cụ | Cách sử dụng | Tốc độ | Lỗi bị bỏ sót | Báo động giả |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Phân tích tĩnh | Slither | CLI & tập lệnh | vài giây | trung bình | thấp |
| Fuzzing | Echidna | Các thuộc tính Solidity | vài phút | thấp | không có |
| Thực thi tượng trưng | Manticore | Các thuộc tính Solidity & tập lệnh | vài giờ | không có\* | không có |

\* nếu tất cả các đường dẫn được khám phá mà không bị hết thời gian (timeout)

**Slither** phân tích các hợp đồng trong vài giây, tuy nhiên, phân tích tĩnh có thể dẫn đến các báo động giả và sẽ ít phù hợp hơn cho các kiểm tra phức tạp (ví dụ: kiểm tra số học). Chạy Slither qua API để truy cập bằng một nút bấm vào các trình phát hiện được tích hợp sẵn hoặc qua API cho các kiểm tra do người dùng xác định.

**Echidna** cần chạy trong vài phút và sẽ chỉ tạo ra các kết quả dương tính thật (true positives). Echidna kiểm tra các thuộc tính bảo mật do người dùng cung cấp, được viết bằng Solidity. Nó có thể bỏ sót lỗi vì nó dựa trên việc khám phá ngẫu nhiên.

**Manticore** thực hiện phân tích "nặng nhất". Giống như Echidna, Manticore xác minh các thuộc tính do người dùng cung cấp. Nó sẽ cần nhiều thời gian hơn để chạy, nhưng nó có thể chứng minh tính hợp lệ của một thuộc tính và sẽ không báo cáo các báo động giả.

## Quy trình làm việc được đề xuất {#suggested-workflow}

Bắt đầu với các trình phát hiện được tích hợp sẵn của Slither để đảm bảo rằng không có lỗi đơn giản nào hiện diện hoặc sẽ được đưa vào sau này. Sử dụng Slither để kiểm tra các thuộc tính liên quan đến tính kế thừa, sự phụ thuộc của biến và các vấn đề cấu trúc. Khi cơ sở mã phát triển, hãy sử dụng Echidna để kiểm tra các thuộc tính phức tạp hơn của máy trạng thái. Quay lại Slither để phát triển các kiểm tra tùy chỉnh cho các biện pháp bảo vệ không có sẵn từ Solidity, chẳng hạn như bảo vệ chống lại việc một hàm bị ghi đè. Cuối cùng, sử dụng Manticore để thực hiện xác minh có mục tiêu đối với các thuộc tính bảo mật quan trọng, ví dụ: các phép toán số học.

- Sử dụng CLI của Slither để nắm bắt các vấn đề phổ biến
- Sử dụng Echidna để kiểm tra các thuộc tính bảo mật cấp cao của hợp đồng của bạn
- Sử dụng Slither để viết các kiểm tra tĩnh tùy chỉnh
- Sử dụng Manticore khi bạn muốn đảm bảo chuyên sâu về các thuộc tính bảo mật quan trọng

**Một lưu ý về kiểm thử đơn vị (unit test)**. Kiểm thử đơn vị là cần thiết để xây dựng phần mềm chất lượng cao. Tuy nhiên, các kỹ thuật này không phù hợp nhất để tìm ra các lỗ hổng bảo mật. Chúng thường được sử dụng để kiểm tra các hành vi tích cực của mã (tức là mã hoạt động như mong đợi trong bối cảnh bình thường), trong khi các lỗ hổng bảo mật có xu hướng nằm ở các trường hợp ngoại lệ (edge cases) mà các nhà phát triển không xem xét đến. Trong nghiên cứu của chúng tôi về hàng chục đánh giá bảo mật hợp đồng thông minh, [mức độ bao phủ của kiểm thử đơn vị không có tác động đến số lượng hoặc mức độ nghiêm trọng của các lỗ hổng bảo mật](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) mà chúng tôi tìm thấy trong mã của khách hàng.

## Xác định các thuộc tính bảo mật {#determining-security-properties}

Để kiểm thử và xác minh mã của bạn một cách hiệu quả, bạn phải xác định các khu vực cần chú ý. Vì các nguồn lực bạn dành cho bảo mật là có hạn, việc xác định phạm vi các phần yếu hoặc có giá trị cao trong cơ sở mã của bạn là rất quan trọng để tối ưu hóa nỗ lực của bạn. Mô hình hóa mối đe dọa (Threat modeling) có thể giúp ích. Hãy xem xét việc đánh giá:

- [Đánh giá rủi ro nhanh](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (cách tiếp cận ưa thích của chúng tôi khi thời gian eo hẹp)
- [Hướng dẫn mô hình hóa mối đe dọa hệ thống lấy dữ liệu làm trung tâm](https://csrc.nist.gov/pubs/sp/800/154/ipd) (còn gọi là NIST 800-154)
- [Mô hình hóa mối đe dọa Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Sử dụng Assertions (Câu lệnh xác nhận)](https://blog.regehr.org/archives/1091)

### Các thành phần {#components}

Biết những gì bạn muốn kiểm tra cũng sẽ giúp bạn chọn đúng công cụ.

Các lĩnh vực rộng thường liên quan đến hợp đồng thông minh bao gồm:

- **Máy trạng thái.** Hầu hết các hợp đồng có thể được biểu diễn dưới dạng một máy trạng thái. Hãy xem xét việc kiểm tra rằng (1) Không thể đạt đến trạng thái không hợp lệ nào, (2) nếu một trạng thái là hợp lệ thì nó có thể đạt được, và (3) không có trạng thái nào bẫy hợp đồng.

  - Echidna và Manticore là những công cụ được ưu tiên để kiểm tra các đặc tả của máy trạng thái.

- **Kiểm soát truy cập.** Nếu hệ thống của bạn có những người dùng đặc quyền (ví dụ: chủ sở hữu, người kiểm soát, ...) bạn phải đảm bảo rằng (1) mỗi người dùng chỉ có thể thực hiện các hành động được ủy quyền và (2) không người dùng nào có thể chặn các hành động từ một người dùng có đặc quyền cao hơn.

  - Slither, Echidna và Manticore có thể kiểm tra các kiểm soát truy cập chính xác. Ví dụ: Slither có thể kiểm tra xem chỉ những hàm trong danh sách trắng (whitelist) mới thiếu modifier onlyOwner. Echidna và Manticore hữu ích cho việc kiểm soát truy cập phức tạp hơn, chẳng hạn như quyền chỉ được cấp nếu hợp đồng đạt đến một trạng thái nhất định.

- **Các phép toán số học.** Kiểm tra tính đúng đắn của các phép toán số học là rất quan trọng. Sử dụng `SafeMath` ở mọi nơi là một bước tốt để ngăn chặn tràn số (overflow/underflow), tuy nhiên, bạn vẫn phải xem xét các lỗi số học khác, bao gồm các vấn đề làm tròn và các lỗi bẫy hợp đồng.

  - Manticore là lựa chọn tốt nhất ở đây. Echidna có thể được sử dụng nếu số học nằm ngoài phạm vi của trình giải quyết SMT.

- **Tính đúng đắn của kế thừa.** Các hợp đồng Solidity phụ thuộc rất nhiều vào đa kế thừa. Các sai lầm như một hàm che khuất (shadowing function) thiếu lệnh gọi `super` và hiểu sai thứ tự tuyến tính hóa c3 có thể dễ dàng được đưa vào.

  - Slither là công cụ để đảm bảo phát hiện các vấn đề này.

- **Tương tác bên ngoài.** Các hợp đồng tương tác với nhau và một số hợp đồng bên ngoài không nên được tin tưởng. Ví dụ: nếu hợp đồng của bạn dựa vào các oracle bên ngoài, liệu nó có còn an toàn nếu một nửa số oracle có sẵn bị xâm phạm không?

  - Manticore và Echidna là lựa chọn tốt nhất để kiểm tra các tương tác bên ngoài với hợp đồng của bạn. Manticore có một cơ chế tích hợp sẵn để tạo stub (mô phỏng) cho các hợp đồng bên ngoài.

- **Sự tuân thủ tiêu chuẩn.** Các tiêu chuẩn Ethereum (ví dụ: ERC-20) có lịch sử về các lỗ hổng trong thiết kế của chúng. Hãy nhận thức được những hạn chế của tiêu chuẩn mà bạn đang xây dựng dựa trên đó.
  - Slither, Echidna và Manticore sẽ giúp bạn phát hiện các sai lệch so với một tiêu chuẩn nhất định.

### Bảng tóm tắt lựa chọn công cụ {#tool-selection-cheatsheet}

| Thành phần | Công cụ | Ví dụ |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Máy trạng thái | Echidna, Manticore |
| Kiểm soát truy cập | Slither, Echidna, Manticore | [Bài tập Slither 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Bài tập Echidna 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Các phép toán số học | Manticore, Echidna | [Bài tập Echidna 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Bài tập Manticore 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Tính đúng đắn của kế thừa | Slither | [Bài tập Slither 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Tương tác bên ngoài | Manticore, Echidna |
| Sự tuân thủ tiêu chuẩn | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

Các lĩnh vực khác sẽ cần được kiểm tra tùy thuộc vào mục tiêu của bạn, nhưng những lĩnh vực trọng tâm tổng quát này là một khởi đầu tốt cho bất kỳ hệ thống hợp đồng thông minh nào.

Các cuộc kiểm toán công khai của chúng tôi chứa các ví dụ về các thuộc tính đã được xác minh hoặc kiểm thử. Hãy xem xét việc đọc các phần `Automated Testing and Verification` của các báo cáo sau để xem xét các thuộc tính bảo mật trong thế giới thực:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)