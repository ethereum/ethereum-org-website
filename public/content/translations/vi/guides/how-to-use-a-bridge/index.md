---
title: "Cách chuyển token sang lớp 2"
description: "Một hướng dẫn giải thích cách do chuyển mã thông báo từ Ethereum sang lớp thứ 2 bằng cầu nối."
lang: vi
---

# Cách chuyển token sang lớp 2

Nếu như có rất nhiều lưu lượng truy cập trên Ethereum, nó có thể trở nên đắt đỏ. Một giải pháp cho vấn đề này là tạo ra các "lớp" mới: tức là các mạng khác nhau hoạt động theo cách tương tự như chính Ethereum. Cái được gọi là Layer 2s giúp giảm thiểu tắc nghẽn và trả phí trên Ethereum bằng cách xử lý nhiều giao dịch cơ sở dữ liệu với mức chi phí thấp hơn và chỉ thường xuyên lưu trữ kết quả này trên Ethereum thường xuyên. Như vậy, những layers 2s này cho phép chúng ta giao dịch cơ sở sở dữ liệu với tốc độ cao và chi phí thấp hơn. Có rấy nhiều dự án crypto nổi tiếng đang chuyển sang layer 2s bởi vì những lợi ích này. Cách dễ nhất để di chuyển tokens từ Ethereum đến layer 2 là sử dụng cầu nối.

**Lưu ý:**

- có một ví tiền mã hóa—nếu bạn chưa có, hãy làm theo hướng dẫn này để [tạo một tài khoản Ethereum](/guides/how-to-create-an-ethereum-account/)
- gửi tài sản vào ví đã tạo phía trên

## 1. Xác định mạng lớp 2 mà bạn muốn sử dụng

Bạn có thể tìm hiểu thêm về các dự án khác nhau và các liên kết quan trọng trên [trang lớp 2](/layer-2/) của chúng tôi.

## 2. Đi đến cầu nối đã chọn

Một vài lớp 2 phổ biến như:

- [Cầu nối Arbitrum](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Cầu nối Optimism](https://app.optimism.io/bridge/deposit)
- [Cầu nối Boba Network](https://hub.boba.network/)

## 3. Kết nối ví của bạn với cầu nối

Hãy đảm bảo rằng ví của bạn kết nối với mạng chính Ethereum. Nếu không, trang Web sẽ tự động yêu cầu bạn đổi mạng lưới.

![Giao diện chung để cầu nối token](./bridge1.png)

## 4. Cụ thể hóa lượng và di chuyển quỹ

Hãy kiểm tra trước số lượng bạn sẽ nhận được trên mạng layer 2 và các khoản phí để tránh bị bất ngờ.

![Giao diện chung để cầu nối token](./bridge2.png)

## 5. Xác nhận giao dịch trong ví của bạn

Bạn sẽ phải trả một khoản phí (gọi là [gas](/glossary/#gas)) bằng ETH để xử lý giao dịch.

![Giao diện chung để cầu nối token](./bridge3.png)

## 6. Chờ cho quỹ của bạn di chuyển

Quá trình này sẽ không quá 10 phút.

## 7. Thêm một mạng lớp 2 vào ví của bạn (không bắt buộc)

Bạn có thể sử dụng [chainlist.org](http://chainlist.org) để tìm chi tiết RPC của mạng. Một khi mạng lưới đã được thêm vào và giao dịch hoạt tất bạn sẽ thấy Token trong ví của bạn. <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Bạn muốn tìm hiểu thêm?</div>
  <ButtonLink href="/guides/">
    Xem các hướng dẫn khác của chúng tôi
  </ButtonLink>
</AlertContent>
</Alert>

## Những câu hỏi thường gặp

### Nếu tôi còn quỹ ở trên sàn giao dịch thì sao?

Bạn có thể rút một số lớp 2 trực tiếp từ sàn giao dịch. Xem mục “Chuyển sang lớp 2” trong [trang Lớp 2](/layer-2/) của chúng tôi để biết thêm thông tin.

### Tôi có thể quay trở lại mạng chính Ethereum sau khi nối Token của mình sang lớp 2?

Vâng, bạn luôn có thể di chuyển quỹ của mình về mạng chính sử dụng cùng cầu nối.
