---
title: Làm thế nào để thông dịch
lang: vi
description: Hướng dẫn sử dụng Crowdin để dịch ethereum.org
---

# Cách dịch {#how-to-translate}

## Hướng dẫn bằng hình ảnh {#visual-guide}

Đối với những người học ưa thích trực quan hơn, bạn có thể xem Luka hướng dẫn cách thiết lập Crowdin. Ngoài ra, bạn cũng có thể tìm thấy cùng các bước đó dưới dạng văn bản trong phần tiếp theo.

<YouTube id="Ii7bYhanLs4" />

## Hướng dẫn bằng văn bản {#written-guide}

### Tham gia dự án của chúng tôi trên Crowdin {#join-project}

Bạn sẽ cần đăng nhập vào tài khoản Crowdin của mình hoặc đăng ký nếu bạn chưa có sẵn. Chỉ cần một tài khoản email và mật khẩu để đăng ký.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Tham gia dự án
</ButtonLink>

### Mở ngôn ngữ của bạn {#open-language}

Sau khi đăng nhập vào Crowdin, bạn sẽ thấy mô tả dự án và danh sách toàn bộ các ngôn ngữ có sẵn.
Mỗi ngôn ngữ cũng chứa thông tin về tổng số từ có thể dịch cũng như tổng quan về mức độ nội dung đã được dịch và phê duyệt trong ngôn ngữ đó.

Mở ngôn ngữ mà bạn muốn dịch sang để xem danh sách các tệp có sẵn cho việc dịch.

![Danh sách các ngôn ngữ trong Crowdin](./list-of-languages.png)

### Tìm một tài liệu để làm việc {#find-document}

Nội dung của trang web được chia thành nhiều tài liệu và các xô nội dung. Bạn có thể kiểm tra tiến độ của mỗi tài liệu ở bên phải - nếu tiến độ dịch chưa đạt 100%, xin hãy đóng góp!

Không thấy ngôn ngữ của mình được liệt kê? [Tạo một vấn đề](https://github.com/ethereum/ethereum-org-website/issues/new/choose) hoặc hỏi trong [Discord](https://discord.gg/ethereum-org) của chúng tôi

![Các tệp đã dịch và chưa dịch trong Crowdin](./crowdin-files.png)

Lưu ý về các xô nội dung: chúng tôi sử dụng xô nội dung trong Crowdin để phát hành nội dung có mức độ ưu tiên cao nhất trước tiên. Khi bạn mở một ngôn ngữ, ví dụ, [Tiếng Philipin](https://crowdin.com/project/ethereum-org/fil#) bạn sẽ thấy các thư mục cho các xô nội dung (\ Homepage", "2. Essentials", "3. Exploring", v.v.).

Chúng tôi khuyến khích bạn dịch theo thứ tự số này (1 → 2 → 3 → ⋯) để đảm bảo các trang quan trọng nhất được dịch trước.

### Dịch {#translate}

Sau khi chọn tệp bạn muốn dịch, nó sẽ mở trong trình biên tập trực tuyến. Nếu bạn chưa bao giờ sử dụng Crowdin, bạn có thể sử dụng hướng dẫn nhanh này để học những cái cơ bản.

![Trình chỉnh sửa trực tuyến Crowdin](./online-editor.png)

**_1 – Thanh bên trái_**

- Chưa dịch (đỏ) - văn bản chưa được dịch. Đây là những dòng chữ bạn cần dịch.
- Đã dịch (xanh) - văn bản đã được dịch, nhưng chưa được duyệt. Bạn có thể đề xuất bản dịch khác, hoặc bỏ phiếu cho bản dịch hiện tại bằng các nút “+” và “-” trong trình biên tập.
- Đã duyệt (dấu tick) - văn bản đã được duyệt và đang hiển thị trực tiếp trên trang web.

Bạn cũng có thể sử dụng các nút trên cùng để tìm kiếm dòng chữ cụ thể, lọc theo trạng thái hay thay đổi chế độ xem.

**_2 – Khu vực biên tập_**

Đây là khu vực dịch chính - văn bản gốc hiển thị ở trên, kèm theo ngữ cảnh bổ sung và ảnh chụp màn hình, nếu có.
Để đề xuất bản dịch mới, nhập bản dịch của bạn vào trường “Enter translation here” và nhấn Lưu.

Bạn cũng có thể tìm thấy các bản dịch hiện có của dòng chữ và bản dịch sang các ngôn ngữ khác trong phần này, cũng như gợi ý từ bộ nhớ dịch và dịch máy.

**_3 – Thanh bên phải_**

Đây là nơi bạn có thể tìm phần bình luận, phần bộ nhớ dịch và phần từ vựng. Chế độ xem mặc định hiển thị các bình luận, cho phép các dịch giả trao đổi, nêu vấn đề hoặc báo cáo bản dịch sai.

Bằng việc sử dụng các nút trên cùng, bạn cũng có thể chuyển sang Translation Memory, nơi bạn tìm các bản dịch có sẵn, hoặc sang Glossary, nơi chứa mô tả và bản dịch tiêu chuẩn của các thuật ngữ quan trọng.

Bạn muốn tìm hiểu thêm? Hãy thoải mái xem qua [tài liệu về cách sử dụng trình biên tập trực tuyến của Crowdin](https://support.crowdin.com/online-editor/)

### Quy trình xét duyệt {#review-process}

Sau khi bạn hoàn thành việc dịch (tức là tất cả các tệp trong một xô nội dung hiển thị 100%), dịch vụ dịch thuật chuyên nghiệp của chúng tôi sẽ xem xét (và có thể chỉnh sửa) nội dung. Sau khi việc duyệt hoàn thành (tức là tiến độ duyệt đạt 100%), chúng tôi sẽ thêm nội dung đó vào trang web.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Vui lòng không sử dụng dịch máy để dịch dự án này. Tất cả các bản dịch sẽ được duyệt trước khi thêm vào trang web. Nếu bản dịch bạn đề xuất bị phát hiện là dịch máy, chúng sẽ bị loại bỏ và những người đóng góp thường xuyên dùng dịch máy sẽ bị đuổi khỏi dự án.
</AlertContent>
</Alert>

### Liên hệ {#get-in-touch}

Bạn có câu hỏi? Hay bạn muốn hợp tác cùng nhóm của chúng tôi và các dịch giả khác? Vui lòng đăng bài trong kênh #translations trên [máy chủ Discord của ethereum.org](https://discord.gg/ethereum-org)

Bạn cũng có thể liên hệ với chúng tôi qua email translations@ethereum.org

Cảm ơn bạn đã tham gia Chương trình Dịch thuật ethereum.org!
