---
title: "Thông tin xác thực rút tiền"
description: "Giải thích về các loại thông tin xác thực rút tiền của trình xác thực (0x00, 0x01, 0x02) và ý nghĩa của chúng đối với người đặt cọc Ethereum."
lang: vi
---

Mỗi trình xác thực đều có một **thông tin xác thực rút tiền** để xác định cách thức và nơi ETH đã đặt cọc và phần thưởng của họ có thể được rút. Loại thông tin xác thực được biểu thị bằng byte đầu tiên: `0x00`, `0x01`, hoặc `0x02`. Việc hiểu các loại này rất quan trọng đối với các trình xác thực quản lý cổ phần của họ.

## 0x00: Thông tin xác thực trước Shapella {#0x00-credentials}

Loại `0x00` là định dạng thông tin xác thực rút tiền ban đầu có từ trước bản nâng cấp Shapella (tháng 4 năm 2023). Các trình xác thực có loại thông tin xác thực này không có địa chỉ rút tiền của lớp thực thi nào được đặt, nghĩa là tiền của họ vẫn bị khóa trên lớp đồng thuận. Nếu bạn vẫn còn thông tin xác thực `0x00`, bạn phải nâng cấp lên `0x01` hoặc `0x02` trước khi có thể nhận bất kỳ khoản rút tiền nào.

## 0x01: Thông tin xác thực rút tiền cũ {#0x01-credentials}

Loại `0x01` đã được giới thiệu cùng với bản nâng cấp Shapella và trở thành tiêu chuẩn cho các trình xác thực muốn đặt địa chỉ rút tiền của lớp thực thi. Với thông tin xác thực `0x01`:

- Mọi số dư trên 32 ETH sẽ **tự động được quét** vào địa chỉ rút tiền của bạn
- Việc thoát hoàn toàn sẽ đi qua hàng chờ thoát tiêu chuẩn
- Phần thưởng trên 32 ETH không thể gộp lãi—chúng sẽ được quét định kỳ

**Tại sao một số trình xác thực vẫn sử dụng 0x01:** Nó đơn giản và quen thuộc hơn. Nhiều trình xác thực đã gửi tiền sau Shapella và đã có loại này, và nó hoạt động tốt cho những ai muốn tự động rút số dư vượt mức.

**Tại sao nó không được khuyến khích:** Với `0x01`, bạn mất khả năng gộp lãi phần thưởng trên 32 ETH. Mọi khoản dư thừa đều được quét tự động, điều này hạn chế tiềm năng kiếm tiền của trình xác thực của bạn và yêu cầu quản lý các khoản tiền đã rút một cách riêng biệt.

## 0x02: Thông tin xác thực rút tiền gộp lãi {#0x02-credentials}

Loại `0x02` đã được giới thiệu cùng với bản nâng cấp Pectra và là **lựa chọn được khuyến nghị** cho các trình xác thực ngày nay. Các trình xác thực có thông tin xác thực `0x02` đôi khi được gọi là "trình xác thực gộp lãi".

Với thông tin xác thực `0x02`:

- Phần thưởng trên 32 ETH được **gộp lãi** theo từng khoảng tăng 1 ETH cho đến số dư hiệu dụng tối đa là 2048 ETH
- Các khoản rút một phần phải được yêu cầu thủ công (việc quét tự động chỉ xảy ra trên ngưỡng 2048 ETH)
- Các trình xác thực có thể hợp nhất nhiều trình xác thực 32 ETH thành một trình xác thực có số dư cao hơn
- Việc thoát hoàn toàn vẫn được hỗ trợ thông qua hàng chờ thoát tiêu chuẩn

Cả rút tiền một phần và hợp nhất đều có thể được thực hiện thông qua [Hành động của Trình xác thực Launchpad](https://launchpad.ethereum.org/en/validator-actions).

**Tại sao các trình xác thực nên ưu tiên 0x02:** Nó mang lại hiệu quả sử dụng vốn tốt hơn thông qua việc gộp lãi, kiểm soát nhiều hơn thời điểm rút tiền và hỗ trợ hợp nhất trình xác thực. Đối với những người đặt cọc đơn lẻ tích lũy phần thưởng theo thời gian, điều này có nghĩa là số dư hiệu dụng của họ—và do đó là phần thưởng của họ—có thể tăng lên trên 32 ETH mà không cần can thiệp thủ công.

**Quan trọng:** Một khi bạn đã chuyển đổi từ `0x01` sang `0x02`, bạn không thể hoàn nguyên lại.

Để có hướng dẫn chi tiết về việc chuyển đổi sang thông tin xác thực Loại 2 và tính năng MaxEB, hãy xem [trang giải thích MaxEB](/roadmap/pectra/maxeb/).

## Tôi nên chọn cái nào? {#what-should-i-pick}

- **Trình xác thực mới:** Chọn `0x02`. Đó là tiêu chuẩn hiện đại với khả năng gộp lãi và tính linh hoạt tốt hơn.
- **Trình xác thực 0x01 hiện có:** Cân nhắc chuyển đổi sang `0x02` nếu bạn muốn phần thưởng được gộp lãi trên 32 ETH hoặc có kế hoạch hợp nhất các trình xác thực.
- **Trình xác thực 0x00 hiện có:** Nâng cấp ngay lập tức—bạn không thể rút tiền mà không cập nhật thông tin xác thực của mình. Trước tiên, bạn phải chuyển đổi sang `0x01`, sau đó bạn có thể chuyển đổi sang `0x02`.

## Các công cụ để quản lý thông tin xác thực rút tiền {#withdrawal-credential-tools}

Một số công cụ hỗ trợ việc lựa chọn hoặc chuyển đổi giữa các loại thông tin xác thực:

- **[Bệ phóng Đặt cọc Ethereum](https://launchpad.ethereum.org/en/validator-actions)** - Công cụ chính thức cho việc gửi tiền và quản lý trình xác thực, bao gồm chuyển đổi và hợp nhất thông tin xác thực
- **[Trình quản lý Đặt cọc Pectra](https://pectrastaking.com)** - Giao diện người dùng web với hỗ trợ kết nối ví để chuyển đổi và hợp nhất
- **[Công cụ CLI Vận hành Trình xác thực Pectra](https://github.com/Luganodes/Pectra-Batch-Contract)** - Công cụ dòng lệnh để chuyển đổi hàng loạt
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Công cụ CLI cho các hoạt động Ethereum bao gồm quản lý trình xác thực

Để có danh sách đầy đủ các công cụ hợp nhất và hướng dẫn chuyển đổi chi tiết, hãy xem [bộ công cụ hợp nhất MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Đọc thêm {#further-reading}

- [Các khóa trong Ethereum bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/keys/) - Tìm hiểu về các khóa của trình xác thực và cách chúng liên quan đến thông tin xác thực rút tiền
- [MaxEB](/roadmap/pectra/maxeb/) - Hướng dẫn chi tiết về bản nâng cấp Pectra và tính năng số dư hiệu dụng tối đa
