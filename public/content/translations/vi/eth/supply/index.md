---
title: Hiểu về nguồn cung và cơ chế phát hành của ETH
description: Một bài viết thân thiện về nguồn cung và cơ chế phát hành của ETH, bao gồm khái niệm khóa như EIPs, PoS, và EIP-1559.
lang: vi
---

# Nguồn cung và cơ chế phát hành của ETH {#eth-supply-and-issuance}

## Prerequisites {#prerequisites}

Bài viết này nhắm đến những người mới chưa có nhiều kiến thức. Tuy nhiên, để hiểu tường tận chủ đề, sẽ rất giúp ích nếu hiểu về các khái niệm như [Đề xuất cải tiến Ethereum (EIPs)](/eips/#introduction-to-ethereum-improvement-proposals), [bằng chứng công việc - Proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow/), [bằng chứng cổ phần - Proof-of-stake (PoS)](/developers/docs/consensus-mechanisms/pos/) và [Bản cập nhật London](/history/#london).

## Có bao nhiêu ETH Token ở thời điểm hiện tại? {#current-eth-supply}

Tổng nguồn cung ETH có thể biến động và thay đổi liên tục do hai yếu tố chính:

1. **Phát hành theo Proof-of-Stake (PoS)**: ETH mới được tạo ra để thưởng cho những người xác thực và bảo mật mạng lưới
2. **Cơ chế đốt EIP-1559**: Một phần nhỏ của phí giao dịch được loại bỏ hoàn toàn khỏi lưu thông

Bạn có thể xem nguồn cung hiện tại và sự thay đổi trong thời gian thực trên những nền tảng như [Ultrasound Money](https://ultrasound.money).

Nguồn cung và cơ chế phát hành của Ethereum là những chỉ số then chột để hiểu về sức khỏe và tương lai của mạng lưới. Nhưng cơ chế phát hành ETH nghĩa là gì? Hãy cùng nhau tìm hiểu.

## Tại sao nguồn cung và cơ chế phát hành ETH quan trọng {#why-eth-supply-matters}

Trong tài chính truyền thống, ngân hàng trung ương kiểm soát nguồn cung của tiền, thường xuyên in thêm tiền để kích thích nền kinh tế. Ngược lại Ethereum vận hành một cách minh bạch và có thể dự đoán được do vận hành bởi mã nguồn của của nó. Biết được có bao nhiêu ETH tồn tại và tốc độ phát hành ETH mới như thế nào sẽ giúp:

- **Tạo dựng niềm tin**: Cộng động Ethereum có thể xác thực nguồn cung và dữ liệu phát hành ngay trên chuỗi khối.
- **Hiểu được giá trị**: Mối tương quan giữa phát hành và cơ chế đốt ETH tác động lên tỉ lệ lạm phát hoặc giảm phát của ETH, ảnh hưởng giá cả qua thời gian.
- **Theo dõi sức khỏe mạng lưới**: Cơ chế phát hành và tỉ lệ đốt phản ánh hoạt động và bảo mật của mạng lưới.

## Phát hành ETH là gì? {#eth-issuance}

Phát hành ETH là quá trình tạo ra ETH mới như một phần thưởng cho nút xác thực những người mà bảo mật mạng lưới Ethereum. Nó khác với tổng cung, vốn là toàn bộ lượng ETH lưu hành trên thị trường.

### Nói một cách đơn giản:

- **Phát hành** thêm ETH mới vào mạng lưới.
- **Đốt cháy** (Được giới thiệu bởi EIP-1559) loại bỏ ETH khói mạng lưới và hủy một phần của phí giao dịch.

Hai cơ chế nào quyết định tổng cung Ethereum tăng (lạm phát) hay giảm (giảm phát) theo thời gian.

## Nguồn cung và phát hành ETH hiện tại {#eth-supply-today}

Hệ thống bằng chứng cổ phần (PoS) của Ethereum đã cắt giảm mạnh lượng ETH phát hành so với trước khi áp dụng cơ chế bằng chứng công việc (PoW). Nốt xác thực (Validators) — những người khóa ETH để có thể bảo mật mạng lưới — nhận được ETH như phần thưởng. Bạn có thể theo dõi tỷ lệ phát hành hiện tại trên [Ultrasound Money](https://ultrasound.money).

Tuy nhiên, con số này luôn biến động. Nhờ có EIP-1559, khi mà mạng lưới hoạt động mạnh, lượng ETH đốt có thể vượt quá lượng phát hành, tạo ra hiệu ứng giảm phát. Ví dụ, trong giai đoạn nhu cầu tăng vọt, như ra mắt NFT hay hoạt động DeFi, ETH có thể bị đốt nhiều hơn phát hành.

### Các công cụ để theo dõi nguồn cung và phát hành ETH:

- [Ultrasound Money](https://ultrasound.money) - Theo dõi thời gian thực nguồn cung, phát hành và tốc độ đốt của ETH
- [Etherscan](https://etherscan.io) - Trình duyệt khối với chỉ số nguồn cung

## Những yếu tố ảnh hưởng đến nguồn cung và phát hành của ETH trong tương lai {#future-eth-supply}

Nguồn cung tương lai của Ethereum không cố định — nó phụ thuộc vào vài yếu tố:

1. **Mức độ tham gia Staking**:
   - Càng nhiều nốt xác thực tham gia mạng lưới nghĩa là càng nhiều ETH được phân phối như phần thưởng.
   - Số nốt xác thực ít đi có thể làm giảm sự phát hành.
   - Tìm hiểu thêm về [staking](/staking/).

2. **Các hoạt động của mạng lưới**:
   - Khối lượng giao dịch cao dẫn đến nhiều ETH bị đốt có thể dẫn đến sự bù đắp hoặc vượt qua phát hành.
   - Đọc thêm về [phí Gas](/developers/docs/gas/) và cách chúng ảnh hưởng đến cơ chế đốt.

3. **Các nâng cấp giao thức**:
   - Những thay đổi trong mã nguồn Ethereum trong tương lai có thể điều chỉnh phần thưởng hoặc cơ chế đốt, từ đó định hình nguồn cung.
   - Hãy cập nhật với [lộ trình Ethereum](/roadmap/).

## Tóm lượt: Nguồn cung, phát hành ETH và triển vọng sắp tới {#recap}

Đây là tóm tắt nhanh những gì bạn cần nắm về nguồn cung và phát hành ETH:

- **Nguồn cung ETH**: Biến động và sẽ luôn thay đổi, có thể theo dõi theo thời gian thực qua công cụ như [Ultrasound Money](https://ultrasound.money)
- **Phát hành dưới PoS**: Giảm đáng kể so với PoW, với phần thưởng cho các nốt xác thực. Theo dõi tỷ lệ hiện tại trên [Ultrasound Money](https://ultrasound.money)
- **Luật của EIP-1559**: ETH bị đốt đi giúp mạng lưới giảm phát trong thời gian hoạt động cao
- **Xu hướng tương lai**: Mức độ tham gia Staking, nhu cầu sử dụng và các bản nâng cấp giao thức sẽ định hình nguồn cung ETH

Hiểu rõ cơ chế phát hành ETH giúp sáng tỏ giá trị của Ethereum và tiềm năng như một tài sản giảm phát, phi tập trung. Để tìm hiểu thêm về sự kiện hợp nhất (The Merge) tác động lên nguồn cung ETH, xem thêm [phân tích chi tiết](/roadmap/merge/issuance/). Tương lai của ETH sẽ đi về đâu? Nghiên cứu sâu hơn về công cụ [Ultrasound Money](https://ultrasound.money) hoặc khám phá [hướng dẫn Staking](/staking/).