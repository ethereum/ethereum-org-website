---
title: Cách chuyển token sang lớp 2 bằng cầu nối
description: Hướng dẫn giải thích cách chuyển token từ Ethereum sang lớp 2 bằng cầu nối.
lang: vi
---

Nếu có nhiều lưu lượng truy cập trên Ethereum, chi phí có thể trở nên đắt đỏ. Một giải pháp cho vấn đề này là tạo ra các "lớp" mới: tức là các mạng lưới khác nhau hoạt động theo những cách tương tự như chính Ethereum. Những cái gọi là lớp 2 (l2) này giúp giảm tắc nghẽn và chi phí trên Ethereum bằng cách xử lý nhiều giao dịch hơn với mức phí thấp hơn, và chỉ lưu trữ kết quả của chúng trên Ethereum một cách định kỳ. Do đó, các lớp 2 này cho phép chúng ta giao dịch với tốc độ tăng lên và chi phí giảm đi. Nhiều dự án tiền mã hóa phổ biến đang chuyển sang lớp 2 vì những lợi ích này. Cách đơn giản nhất để chuyển token từ Ethereum sang lớp 2 là sử dụng một cầu nối.

**Điều kiện tiên quyết:** 

- có một ví tiền mã hóa—nếu bạn chưa có, hãy làm theo hướng dẫn này để [tạo một tài khoản Ethereum](/guides/how-to-create-an-ethereum-account/)
- nạp tiền vào ví của bạn

## 1. Xác định mạng lưới lớp 2 bạn muốn sử dụng {#1-determine-which-layer-2-network-you-want-to-use}

Bạn có thể tìm hiểu thêm về các dự án khác nhau và các liên kết quan trọng trên [trang lớp 2](/layer-2/) của chúng tôi.

## 2. Truy cập vào cầu nối đã chọn {#2-go-to-the-selected-bridge}

Một số lớp 2 phổ biến là:

- [Cầu nối Arbitrum](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Cầu nối Optimism](https://app.optimism.io/bridge/deposit)
- [Cầu nối mạng lưới Boba](https://hub.boba.network/)

## 3. Kết nối với cầu nối bằng ví của bạn {#3-connect-to-the-bridge-with-your-wallet}

Đảm bảo rằng ví của bạn được kết nối với mạng lưới Mạng chính Ethereum. Nếu chưa, trang web sẽ tự động nhắc bạn chuyển đổi mạng lưới.

![Common interface for bridging tokens](./bridge1.png)

## 4. Chỉ định số lượng và chuyển tiền {#4-specify-the-amount-and-move-the-funds}

Xem lại số lượng bạn sẽ nhận lại trên mạng lưới lớp 2 và các khoản phí để tránh những bất ngờ không mong muốn.

![Common interface for bridging tokens](./bridge2.png)

## 5. Xác nhận giao dịch trong ví của bạn {#5-confirm-the-transaction-in-your-wallet}

Bạn sẽ phải trả một khoản phí (gọi là [Gas](/glossary/#gas)) dưới dạng ETH để xử lý giao dịch.

![Common interface for bridging tokens](./bridge3.png)

## 6. Chờ tiền của bạn được chuyển {#6-wait-for-your-funds-to-be-moved}

Quá trình này sẽ không mất quá 10 phút.

## 7. Thêm mạng lưới lớp 2 đã chọn vào ví của bạn (tùy chọn) {#7-add-the-selected-layer-2-network-to-your-wallet-optional}

Bạn có thể sử dụng [chainlist.org](https://chainlist.org) để tìm thông tin chi tiết về RPC của mạng lưới. Khi mạng lưới được thêm và giao dịch hoàn tất, bạn sẽ thấy các token trong ví của mình.
<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Bạn muốn tìm hiểu thêm?</div>
  <ButtonLink href="/guides/">
    Xem các hướng dẫn khác của chúng tôi
  </ButtonLink>
</AlertContent>
</Alert>

## Câu hỏi thường gặp {#frequently-asked-questions}

### Điều gì xảy ra nếu tôi có tiền trên một sàn giao dịch? {#what-if-i-have-funds-on-an-exchange}

Bạn có thể rút tiền trực tiếp từ một sàn giao dịch sang một số lớp 2. Hãy xem phần “Chuyển sang lớp 2” trên [trang Lớp 2](/layer-2/) của chúng tôi để biết thêm thông tin.

### Tôi có thể quay lại mạng chính Ethereum sau khi chuyển token của mình sang L2 bằng cầu nối không? {#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2}

Có, bạn luôn có thể chuyển tiền của mình trở lại mạng chính bằng cách sử dụng cùng một cầu nối.
