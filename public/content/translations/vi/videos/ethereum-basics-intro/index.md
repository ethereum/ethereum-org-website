---
title: "Cơ bản về Ethereum: giới thiệu"
description: "Một bài giảng giới thiệu về các nguyên tắc cơ bản của Ethereum, bao gồm Ethereum là gì, nó khác với Bitcoin như thế nào và các khái niệm cốt lõi làm nền tảng cho mạng lưới Ethereum."
lang: vi
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "ethereum"
  - "giới thiệu"
format: presentation
author: Quezar
breadcrumb: "Cơ bản về Ethereum"
---

Một bài giảng giới thiệu của **Quezar** bao gồm các nguyên tắc cơ bản của Ethereum, bao gồm blockchain là gì, cách thức hoạt động bên trong của chúng và các thành phần chính tạo nên mạng lưới Ethereum.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=j78ZcIIpi0Q) được xuất bản bởi Quezar. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Chào mừng và tổng quan về loạt bài (0:03) {#welcome-and-series-overview-003}

Chào mừng bạn quay lại với một phần khác của loạt bài về Ethereum. Nếu bạn đang tìm kiếm một tài nguyên tốt để hiểu cách thức hoạt động bên trong của Ethereum, chúng tôi sẽ giúp bạn. Trong phần trước, chúng ta đã đề cập đến cách đọc và viết các hợp đồng Solidity cơ bản và thảo luận ngắn gọn một vài điều về các thành phần khác nhau của mạng lưới Ethereum. Trong phần này, chúng ta sẽ tìm hiểu sâu hơn về kiến trúc của Ethereum và thảo luận chi tiết hơn về từng thành phần. Chúng tôi sắp ra mắt thêm nhiều video nữa, vì vậy nếu bạn thích loại nội dung này, hãy nhấn nút thích và đăng ký để nhận thông báo khi video mới được phát hành.

#### Mục tiêu và điều kiện tiên quyết (0:40) {#goals-and-prerequisites-040}

Mục tiêu của phần này trong loạt bài là cung cấp cho bạn sự hiểu biết tốt về kiến trúc của Ethereum trong vòng một tuần. Giống như phần trước, tôi đã cấu trúc nó sao cho trong vòng bảy ngày, bạn sẽ cảm thấy thoải mái hơn nhiều với mọi thứ diễn ra trên mạng lưới Ethereum bất cứ khi nào ai đó thực hiện một hoạt động trên đó.

Nói về các điều kiện tiên quyết — không có gì đặc biệt mà bạn cần phải biết trước. Nếu bạn đang xem video này, thì rất có thể bạn đã biết đủ về mạng lưới Ethereum đối với phần này. Nhưng tôi khuyên bạn nên hoàn thành phần trước của loạt bài — Cơ bản về Solidity — vì phần đó mang tính thực hành nhiều hơn. Bạn có thể chạy mã trên Remix IDE và xem mọi thứ thực sự hoạt động như thế nào trên mạng lưới Ethereum. Phần này chủ yếu sẽ thiên về lý thuyết và nếu bạn đã hoàn thành phần trước, bạn sẽ thấy dễ dàng hơn nhiều để vượt qua.

#### Những gì chúng ta sẽ đề cập (1:41) {#what-well-cover-141}

Trong phần này, chúng ta sẽ tìm hiểu blockchain là gì và xem cách thức hoạt động bên trong của chúng. Chúng ta cũng sẽ xem những thành phần nào tạo nên mạng lưới Ethereum, và sau đó chúng ta sẽ tiếp tục và thảo luận chi tiết hơn về từng thành phần.

Đối với phần này, tôi đã sử dụng tài liệu chính thức của Ethereum làm cơ sở. Khi bạn hoàn thành phần này, bạn sẽ nắm được hầu hết các chủ đề nền tảng của tài liệu này. Bạn sẽ có khoảng thời gian dễ dàng hơn nhiều khi đọc nó. Rõ ràng là không phải mọi thứ đều có trong các video, nhưng tôi đã cố gắng đề cập đến tất cả mọi thứ ở mức độ tổng quan. Bạn có thể coi phần này như một phần giới thiệu cho tài liệu, vốn chuyên sâu hơn rất nhiều.

#### Công cụ và phương pháp tiếp cận (2:30) {#tools-and-approach-230}

Chúng ta cũng sẽ sử dụng Etherscan để xem từng thành phần đang hoạt động như thế nào trong thời gian thực. Đừng lo lắng nếu bạn không thể hiểu mọi thứ trong một lần — bạn luôn có thể xem lại các chủ đề cụ thể bất cứ khi nào bạn muốn. Tôi khuyên bạn nên nghỉ giải lao ngắn sau mỗi chủ đề để bạn có thể tiếp thu chúng tốt hơn. Vậy hãy bắt đầu bằng cách tìm hiểu blockchain là gì.