---
title: Thông tin xác thực rút tiền
description: Giải thích về các loại thông tin xác thực rút tiền của trình xác thực (0x00, 0x01, 0x02) và ý nghĩa của chúng đối với những người đặt cọc Ethereum.
lang: vi
---

Mỗi trình xác thực có một **thông tin xác thực rút tiền** quyết định cách thức và nơi mà ETH đã đặt cọc và phần thưởng của họ có thể được rút tiền. Loại thông tin xác thực được biểu thị bằng byte đầu tiên: `0x00`, `0x01`, hoặc `0x02`. Việc hiểu rõ các loại này là rất quan trọng đối với các trình xác thực trong việc quản lý khoản đặt cọc của họ.

## 0x00: Thông tin xác thực trước Shapella {#0x00-credentials}

Loại `0x00` là định dạng thông tin xác thực rút tiền ban đầu từ trước bản nâng cấp Shapella (tháng 4 năm 2023). Các trình xác thực có loại thông tin xác thực này chưa thiết lập địa chỉ rút tiền trên lớp thực thi, nghĩa là tiền của họ vẫn bị khóa trên lớp đồng thuận. Nếu bạn vẫn có thông tin xác thực `0x00`, bạn phải nâng cấp lên `0x01` hoặc `0x02` trước khi có thể nhận bất kỳ khoản rút tiền nào.

## 0x01: Thông tin xác thực rút tiền cũ {#0x01-credentials}

Loại `0x01` được giới thiệu cùng với bản nâng cấp Shapella và trở thành tiêu chuẩn cho các trình xác thực muốn thiết lập địa chỉ rút tiền trên lớp thực thi. Với thông tin xác thực `0x01`:

- Bất kỳ số dư nào trên 32 ETH đều được **tự động chuyển** đến địa chỉ rút tiền của bạn
- Việc thoát hoàn toàn sẽ đi qua hàng đợi thoát tiêu chuẩn
- Phần thưởng trên 32 ETH không thể cộng dồn—chúng được chuyển ra ngoài theo định kỳ

**Tại sao một số trình xác thực vẫn sử dụng 0x01:** Nó đơn giản và quen thuộc. Nhiều trình xác thực đã nạp tiền sau Shapella và đã có loại này, và nó hoạt động tốt cho những ai muốn tự động rút tiền đối với số dư vượt mức.

**Tại sao nó không được khuyến nghị:** Với `0x01`, bạn mất khả năng cộng dồn phần thưởng trên 32 ETH. Mọi phần vượt mức đều tự động bị chuyển đi, điều này giới hạn tiềm năng thu nhập của trình xác thực của bạn và đòi hỏi phải quản lý riêng các khoản tiền đã rút.

## 0x02: Thông tin xác thực rút tiền cộng dồn {#0x02-credentials}

Loại `0x02` được giới thiệu cùng với bản nâng cấp Pectra và là **lựa chọn được khuyến nghị** cho các trình xác thực hiện nay. Các trình xác thực có thông tin xác thực `0x02` đôi khi được gọi là "trình xác thực cộng dồn".

Với thông tin xác thực `0x02`:

- Phần thưởng trên 32 ETH được **cộng dồn** theo mức tăng 1 ETH cho đến số dư hiệu dụng tối đa là 2048 ETH
- Việc rút tiền một phần phải được yêu cầu thủ công (việc tự động chuyển chỉ xảy ra khi vượt quá ngưỡng 2048 ETH)
- Các trình xác thực có thể hợp nhất nhiều trình xác thực 32 ETH thành một trình xác thực duy nhất có số dư cao hơn
- Việc thoát hoàn toàn vẫn được hỗ trợ thông qua hàng đợi thoát tiêu chuẩn

Cả việc rút tiền một phần và hợp nhất đều có thể được thực hiện thông qua [Hành động của trình xác thực trên Launchpad](https://launchpad.ethereum.org/en/validator-actions).

**Tại sao các trình xác thực nên ưu tiên 0x02:** Nó mang lại hiệu quả sử dụng vốn tốt hơn thông qua việc cộng dồn, kiểm soát tốt hơn thời điểm rút tiền và hỗ trợ hợp nhất trình xác thực. Đối với những người đặt cọc độc lập tích lũy phần thưởng theo thời gian, điều này có nghĩa là số dư hiệu dụng của họ—và do đó là phần thưởng của họ—có thể tăng vượt quá 32 ETH mà không cần can thiệp thủ công.

**Quan trọng:** Khi bạn chuyển đổi từ `0x01` sang `0x02`, bạn không thể hoàn nguyên lại.

Để xem hướng dẫn chi tiết về việc chuyển đổi sang thông tin xác thực Loại 2 và tính năng MaxEB, hãy xem [trang giải thích về MaxEB](/roadmap/pectra/maxeb/).

## Tôi nên chọn gì? {#what-should-i-pick}

- **Trình xác thực mới:** Chọn `0x02`. Đây là tiêu chuẩn hiện đại với khả năng cộng dồn và tính linh hoạt tốt hơn.
- **Trình xác thực 0x01 hiện tại:** Cân nhắc chuyển đổi sang `0x02` nếu bạn muốn phần thưởng cộng dồn trên 32 ETH hoặc có kế hoạch hợp nhất các trình xác thực.
- **Trình xác thực 0x00 hiện tại:** Nâng cấp ngay lập tức—bạn không thể rút tiền nếu không cập nhật thông tin xác thực của mình. Trước tiên, bạn phải chuyển đổi sang `0x01`, sau đó bạn có thể chuyển đổi sang `0x02`.

## Các công cụ để quản lý thông tin xác thực rút tiền {#withdrawal-credential-tools}

Một số công cụ hỗ trợ việc chọn hoặc chuyển đổi giữa các loại thông tin xác thực:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** - Công cụ chính thức để nạp tiền và quản lý trình xác thực, bao gồm chuyển đổi thông tin xác thực và hợp nhất
- **[Pectra Staking Manager](https://pectrastaking.com)** - Giao diện người dùng web có hỗ trợ kết nối ví để chuyển đổi và hợp nhất
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Công cụ dòng lệnh để chuyển đổi hàng loạt
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Công cụ CLI cho các hoạt động Ethereum bao gồm quản lý trình xác thực

Để xem danh sách đầy đủ các công cụ hợp nhất và hướng dẫn chuyển đổi chi tiết, hãy xem [Công cụ hợp nhất MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Đọc thêm {#further-reading}

- [Các khóa trong Bằng chứng cổ phần (PoS) Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) - Tìm hiểu về các khóa của trình xác thực và cách chúng liên quan đến thông tin xác thực rút tiền
- [MaxEB](/roadmap/pectra/maxeb/) - Hướng dẫn chi tiết về bản nâng cấp Pectra và tính năng số dư hiệu dụng tối đa