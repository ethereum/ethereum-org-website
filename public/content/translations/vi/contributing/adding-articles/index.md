---
title: "Thêm bài viết"
description: "Hướng dẫn đóng góp bài viết cho trình xây dựng trên ethereum.org"
lang: vi
---

## Xuất bản bài viết cho trình xây dựng {#publishing-a-builder-article}

Các bài viết cho trình xây dựng xuất hiện tại [ethereum.org/latest/](/latest/) và được soạn thảo dưới dạng các tệp Markdown trong kho lưu trữ. Đây là các bài viết dạng dài, được lưu trữ nội bộ, bao gồm các tổng quan và hướng dẫn về hệ sinh thái Ethereum, bối cảnh công nghệ mã nguồn mở, cũng như các cập nhật kịp thời cho các trình xây dựng và nhà nghiên cứu, bao gồm các chủ đề như nâng cấp giao thức, các mẫu công cụ mới, các bản triển khai tham chiếu và nhiều nội dung khác.

### Chính sách niêm yết {#listing-policy}

Ethereum.org là một tài nguyên giáo dục, trung lập. Phần "Mới nhất" được tuyển chọn nhằm:

- **Giáo dục** các trình xây dựng và cộng đồng rộng lớn hơn về công nghệ Ethereum, hệ sinh thái mã nguồn mở và các bước phát triển kịp thời
- **Đảm bảo tính chính xác** trong nội dung kỹ thuật và các tài liệu tham khảo
- **Duy trì sự phù hợp** với cộng đồng trình xây dựng Ethereum

Trang web không niêm yết các bài viết chủ yếu quảng bá cho một sản phẩm, token hoặc dịch vụ thương mại cụ thể. Tất cả các bài nộp đều được đội ngũ ethereum.org xem xét trước khi xuất bản.

### Tiêu chí để được đưa vào {#criteria-for-inclusion}

#### Các yêu cầu bắt buộc {#must-haves}

- **Tập trung vào Ethereum và mã nguồn mở** - Bài viết phải chủ yếu nói về Ethereum, giao thức, công cụ hoặc hệ sinh thái trình xây dựng của nó, hoặc về các công nghệ mã nguồn mở và công nghệ sanctuary hỗ trợ nó. Nội dung về các chủ đề chuỗi khối hoặc Web3 nói chung mà không đề cập đáng kể đến Ethereum hoặc bối cảnh mã nguồn mở của nó sẽ không được chấp nhận.
- **Giá trị giáo dục hoặc bối cảnh** - Bài viết nên hướng dẫn các trình xây dựng một điều gì đó có thể thực hành được (ví dụ: cách sử dụng một EIP mới, cách đánh giá một lựa chọn kiến trúc, cách triển khai hoặc đóng góp vào cơ sở hạ tầng mã nguồn mở) hoặc cung cấp một góc nhìn có ý nghĩa về trạng thái của Ethereum và hệ sinh thái mã nguồn mở xung quanh nó. Nội dung quảng bá cho các sản phẩm, token hoặc dịch vụ thương mại cụ thể sẽ không được chấp nhận.
- **Thông tin chính xác** - Các tuyên bố kỹ thuật phải đúng sự thật và cập nhật. Hãy trích dẫn các EIP, thông báo chính thức hoặc dữ liệu trên chuỗi nếu có thể.
- **Tác phẩm gốc** - Nội dung phải là bản gốc hoặc được sử dụng khi có sự cho phép. Xem [chính sách đạo văn](/contributing/#plagiarism).
- **Ngôn ngữ** - Các bài viết có thể được nộp bằng bất kỳ [ngôn ngữ nào được hỗ trợ](/contributing/translation-program/). Đặt trường `lang` khớp với ngôn ngữ mà bài viết được viết (ví dụ: `en` cho tiếng Anh, `es` cho tiếng Tây Ban Nha). Sau khi bài viết được nộp, các bài nộp bằng tiếng Anh có thể được dịch sang các ngôn ngữ khác và các bài nộp không phải tiếng Anh có thể được dịch sang tiếng Anh.

#### Các yếu tố khuyến khích {#nice-to-haves}

- **Kịp thời và có giá trị lâu dài** - Nội dung vẫn hữu ích sau ngày xuất bản được ưu tiên hơn so với các tài liệu chỉ mang tính thời sự.
- **Độ tin cậy của tác giả** - Các bài viết từ các trình xây dựng, nhà nghiên cứu đã có tên tuổi hoặc các cộng tác viên liên kết với CROPS sẽ được ưu tiên.
- **Đọc thêm** - Bao gồm phần `## Further reading` với các liên kết đến các EIP, tài liệu và nguồn chính có liên quan.

### Đề xuất một bài viết cho trình xây dựng {#propose-a-builder-article}

Nếu bạn muốn viết một bài viết cho trình xây dựng trên ethereum.org và bài viết đó đáp ứng các tiêu chí, hãy tạo một issue trên GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=content-suggestion.yml">
  Đề xuất một bài viết
</ButtonLink>