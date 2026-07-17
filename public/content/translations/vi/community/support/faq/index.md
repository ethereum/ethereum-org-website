---
title: Các câu hỏi thường gặp
description: Các câu hỏi phổ biến về Ethereum liên quan đến ví, giao dịch, đặt cọc và nhiều vấn đề khác.
lang: vi
---

## Tôi đã gửi tiền mã hóa đến sai địa chỉ {#wrong-wallet}

Một giao dịch được gửi trên Ethereum là không thể đảo ngược. Thật không may, nếu bạn đã gửi ETH hoặc token đến sai ví, không có cách nào để đảo ngược giao dịch.

**Những gì bạn có thể làm:**

- **Nếu bạn biết chủ sở hữu của địa chỉ đó**, hãy liên hệ trực tiếp với họ và yêu cầu họ trả lại tiền
- **Nếu địa chỉ thuộc về một sàn giao dịch hoặc dịch vụ đã biết**, hãy liên hệ với đội ngũ hỗ trợ của họ, vì họ có thể giúp đỡ
- **Nếu bạn đã gửi token đến một địa chỉ hợp đồng**, hãy kiểm tra xem hợp đồng đó có chức năng rút tiền hoặc khôi phục hay không (điều này rất hiếm)

Trong hầu hết các trường hợp, không có cách nào để lấy lại tiền. Không có tổ chức trung tâm, thực thể hay cá nhân nào sở hữu Ethereum, điều đó có nghĩa là không ai có thể đảo ngược các giao dịch. Luôn kiểm tra kỹ địa chỉ người nhận trước khi xác nhận.

## Tôi đã mất quyền truy cập vào ví của mình {#lost-wallet-access}

Các tùy chọn khôi phục của bạn phụ thuộc vào loại ví bạn sử dụng.

### Nếu bạn có cụm từ hạt giống (cụm từ khôi phục) {#if-you-have-your-seed-phrase-recovery-phrase}

Bạn có thể khôi phục ví của mình trong bất kỳ ứng dụng ví tương thích nào bằng cách sử dụng cụm từ hạt giống của bạn. Đây là lý do tại sao việc lưu trữ cụm từ hạt giống của bạn ngoại tuyến một cách an toàn là rất quan trọng. Hãy kiểm tra tài liệu của nhà cung cấp ví của bạn để biết hướng dẫn khôi phục.

### Nếu bạn đã làm mất cụm từ hạt giống {#if-you-have-lost-your-seed-phrase}

Nếu không có cụm từ hạt giống hoặc khóa riêng tư, tiền của bạn không thể được khôi phục. Không ai, kể cả ethereum.org, có thể đặt lại mật khẩu của bạn hoặc khôi phục quyền truy cập vào một ví tự lưu ký.

### Nếu tài khoản của bạn nằm trên một sàn giao dịch {#if-your-account-is-on-an-exchange}

Nếu tài khoản của bạn nằm trên một sàn giao dịch tập trung như Coinbase, Binance hoặc Kraken, hãy liên hệ trực tiếp với đội ngũ hỗ trợ của sàn giao dịch. Họ kiểm soát các tài khoản trên nền tảng của họ và có thể giúp đặt lại mật khẩu hoặc khôi phục tài khoản.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Không bao giờ chia sẻ cụm từ hạt giống của bạn với bất kỳ ai** tự xưng là giúp bạn khôi phục ví. Đây là một trong những thủ đoạn lừa đảo phổ biến nhất. Không có dịch vụ hợp pháp nào sẽ yêu cầu cụm từ hạt giống của bạn.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Cách sử dụng ví
</DocLink>

## Giao dịch của tôi bị kẹt hoặc đang chờ xử lý {#stuck-transaction}

Các giao dịch trên Ethereum có thể bị kẹt khi phí gas bạn đặt thấp hơn mức mà mạng lưới hiện đang yêu cầu. Hầu hết các ví đều cho phép bạn khắc phục điều này:

- **Tăng tốc:** Gửi lại cùng một giao dịch với phí gas cao hơn
- **Hủy:** Gửi một giao dịch 0 ETH đến địa chỉ của chính bạn bằng cách sử dụng cùng một nonce như giao dịch đang chờ xử lý

### Các hướng dẫn hữu ích {#helpful-guides}

- [Cách tăng tốc hoặc hủy một giao dịch đang chờ xử lý trên MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Cách hủy các giao dịch đang chờ xử lý trên Ethereum](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Làm cách nào để tôi yêu cầu nhận phần thưởng Ethereum của mình? {#giveaway-scam}

Các chương trình tặng thưởng Ethereum là những trò lừa đảo được thiết kế để đánh cắp ETH của bạn. Đừng bị cám dỗ bởi những lời đề nghị có vẻ quá tốt để có thể là sự thật. Nếu bạn gửi ETH đến một địa chỉ tặng thưởng, bạn sẽ không nhận được phần thưởng nào và bạn sẽ không thể lấy lại tiền của mình.

[Tìm hiểu thêm về cách phòng chống lừa đảo](/security/#common-scams)

## Làm cách nào để tôi đặt cọc ETH? {#how-to-stake}

Để trở thành một trình xác thực, bạn phải đặt cọc 32 ETH vào hợp đồng tiền gửi Ethereum và thiết lập một nút trình xác thực. Bạn cũng có thể tham gia với ít ETH hơn thông qua các nhóm đặt cọc.

Thông tin thêm có sẵn trên [các trang đặt cọc](/staking/) của chúng tôi và tại [bệ phóng đặt cọc](https://launchpad.ethereum.org/).

## Làm cách nào để tôi khai thác Ethereum? {#mining-ethereum}

Việc khai thác Ethereum không còn khả thi nữa. Việc khai thác đã bị tắt khi Ethereum chuyển từ [Bằng chứng công việc (PoW)](/glossary/#pow) sang [Bằng chứng cổ phần (PoS)](/glossary/#pos) trong sự kiện [The Merge](/roadmap/merge/) vào tháng 9 năm 2022. Giờ đây, thay vì các thợ đào, Ethereum có các trình xác thực. Bất kỳ ai cũng có thể [đặt cọc](/glossary/#staking) ETH và nhận phần thưởng đặt cọc khi chạy phần mềm trình xác thực để bảo mật mạng lưới.