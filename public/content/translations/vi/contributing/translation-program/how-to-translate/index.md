---
title: Cách dịch
lang: vi
description: Hướng dẫn sử dụng Crowdin để dịch ethereum.org
---

## Hướng dẫn trực quan {#visual-guide}

Đối với những người thích học qua hình ảnh, hãy xem Luka hướng dẫn cách thiết lập với Crowdin. Ngoài ra, bạn có thể tìm thấy các bước tương tự dưới dạng văn bản trong phần tiếp theo.

<VideoWatch slug="crowdin-translation-guide" />

## Hướng dẫn bằng văn bản {#written-guide}

### Tham gia dự án của chúng tôi trên Crowdin {#join-project}

Bạn sẽ cần đăng nhập vào tài khoản Crowdin của mình hoặc đăng ký nếu bạn chưa có. Tất cả những gì cần thiết để đăng ký là một tài khoản email và mật khẩu.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Tham gia dự án
</ButtonLink>

### Mở ngôn ngữ của bạn {#open-language}

Sau khi đăng nhập vào Crowdin, bạn sẽ thấy mô tả dự án và danh sách tất cả các ngôn ngữ có sẵn.
Mỗi ngôn ngữ cũng chứa thông tin về tổng số từ có thể dịch và tổng quan về lượng nội dung đã được dịch và phê duyệt trong một ngôn ngữ cụ thể.

Mở ngôn ngữ bạn muốn dịch sang để xem danh sách các tệp có sẵn để dịch.

![List of languages in Crowdin](./list-of-languages.png)

### Tìm tài liệu để làm việc {#find-document}

Nội dung trang web được chia thành một số tài liệu và nhóm nội dung (content bucket). Bạn có thể kiểm tra tiến độ của từng tài liệu ở bên phải – nếu tiến độ dịch dưới 100%, vui lòng đóng góp!

Không thấy ngôn ngữ của bạn được liệt kê? [Mở một issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose) hoặc hỏi trong [Discord](https://discord.gg/ethereum-org) của chúng tôi

![Translated and untranslated files in Crowdin](./crowdin-files.png)

Lưu ý về các nhóm nội dung: chúng tôi sử dụng 'nhóm nội dung' trong Crowdin để ưu tiên phát hành nội dung quan trọng nhất trước. Khi bạn kiểm tra một ngôn ngữ, ví dụ: [Tiếng Philippines](https://crowdin.com/project/ethereum-org/fil#), bạn sẽ thấy các thư mục cho nhóm nội dung ("1. Homepage", "2. Essentials", "3. Exploring", v.v.).

Chúng tôi khuyến khích bạn dịch theo thứ tự số này (1 → 2 → 3 → ⋯) để đảm bảo các trang có tác động cao nhất được dịch trước.

### Dịch {#translate}

Sau khi chọn tệp bạn muốn dịch, tệp đó sẽ mở trong trình chỉnh sửa trực tuyến. Nếu bạn chưa từng sử dụng Crowdin trước đây, bạn có thể sử dụng hướng dẫn nhanh này để nắm qua các bước cơ bản.

![Crowdin online editor](./online-editor.png)

**_1 – Thanh bên trái_**

- Chưa dịch (màu đỏ) – văn bản chưa được xử lý. Đây là những chuỗi mà bạn nên dịch.
- Đã dịch (màu xanh lá cây) – văn bản đã được dịch, nhưng chưa được đánh giá. Bạn có thể đề xuất các bản dịch thay thế hoặc bỏ phiếu cho các bản dịch hiện có bằng cách sử dụng các nút ‘’+’’ và ‘’-‘‘ trong trình chỉnh sửa.
- Đã phê duyệt (dấu kiểm) – văn bản đã được đánh giá và hiện đang hiển thị trực tiếp trên trang web.

Bạn cũng có thể sử dụng các nút ở trên cùng để tìm kiếm các chuỗi cụ thể, lọc chúng theo trạng thái hoặc thay đổi chế độ xem.

**_2 – Khu vực chỉnh sửa_**

Khu vực dịch chính – văn bản nguồn được hiển thị ở trên cùng, với ngữ cảnh bổ sung và ảnh chụp màn hình, nếu có.
Để đề xuất một bản dịch mới, hãy nhập bản dịch của bạn vào trường ‘’Enter translation here’’ (Nhập bản dịch tại đây) và nhấp vào Save (Lưu).

Bạn cũng có thể tìm thấy các bản dịch hiện có của chuỗi và các bản dịch sang các ngôn ngữ khác trong phần này, cũng như các kết quả khớp từ bộ nhớ dịch và các đề xuất dịch máy.

**_3 – Thanh bên phải_**

Đây là nơi bạn có thể tìm thấy các bình luận, các mục trong bộ nhớ dịch và các mục trong bảng thuật ngữ. Chế độ xem mặc định hiển thị các bình luận và cho phép các dịch giả giao tiếp, nêu vấn đề hoặc báo cáo các bản dịch không chính xác.

Bằng cách sử dụng các nút ở trên cùng, bạn cũng có thể chuyển sang Bộ nhớ dịch (Translation Memory), nơi bạn có thể tìm kiếm các bản dịch hiện có, hoặc Bảng thuật ngữ (Glossary), chứa các mô tả và bản dịch chuẩn của các thuật ngữ chính.

Bạn muốn tìm hiểu thêm? Vui lòng xem [tài liệu về cách sử dụng trình chỉnh sửa trực tuyến Crowdin](https://support.crowdin.com/online-editor/)

### Quy trình đánh giá {#review-process}

Sau khi bạn đã hoàn thành bản dịch (tức là tất cả các tệp cho một nhóm nội dung hiển thị 100%), dịch vụ dịch thuật chuyên nghiệp của chúng tôi sẽ đánh giá (và có thể chỉnh sửa) nội dung. Khi quá trình đánh giá hoàn tất (tức là tiến độ đánh giá là 100%), chúng tôi sẽ thêm nội dung đó vào trang web.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Vui lòng không sử dụng dịch máy để dịch dự án. Tất cả các bản dịch sẽ được đánh giá trước khi được thêm vào trang web. Nếu các bản dịch được đề xuất của bạn bị phát hiện là dịch máy, chúng sẽ bị loại bỏ và những người đóng góp thường xuyên sử dụng dịch máy sẽ bị xóa khỏi dự án.
</AlertContent>
</Alert>

### Liên hệ {#get-in-touch}

Bạn có bất kỳ câu hỏi nào không? Hoặc muốn cộng tác với nhóm của chúng tôi và các dịch giả khác? Vui lòng đăng bài trong kênh #translations trên [máy chủ Discord của ethereum.org](https://discord.gg/ethereum-org)

Bạn cũng có thể liên hệ với chúng tôi tại translations@ethereum.org

Cảm ơn bạn đã tham gia Chương trình Dịch thuật ethereum.org!