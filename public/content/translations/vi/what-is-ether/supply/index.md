---
title: Nguồn cung và phát hành ETH
metaTitle: Hiểu về nguồn cung và phát hành ETH
description: Hướng dẫn thân thiện với người mới bắt đầu về nguồn cung và phát hành ETH, bao gồm các khái niệm chính như EIP, PoS và EIP-1559.
lang: vi
---

## Điều kiện tiên quyết {#prerequisites}

Bài viết này được viết cho người mới bắt đầu chưa có kiến thức nền tảng. Tuy nhiên, để hiểu đầy đủ về chủ đề này, sẽ rất hữu ích nếu bạn có hiểu biết cơ bản về các khái niệm như [Đề xuất cải tiến Ethereum (EIP)](/eips/#introduction-to-ethereum-improvement-proposals), [Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/), [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/), và [Bản nâng cấp London](/ethereum-forks/#london).

## Hiện nay có bao nhiêu token ETH? {#current-eth-supply}

Tổng nguồn cung ETH là động và thay đổi liên tục do hai yếu tố chính:

1. **Phát hành Bằng chứng cổ phần (PoS)**: ETH mới được tạo ra như phần thưởng cho các trình xác thực bảo vệ mạng lưới
2. **Đốt theo EIP-1559**: Một phần phí giao dịch bị loại bỏ vĩnh viễn khỏi lưu thông

Bạn có thể theo dõi nguồn cung hiện tại và những thay đổi này theo thời gian thực trên các nền tảng như [Ultrasound Money](https://ultrasound.money).

Nguồn cung và phát hành của Ethereum là những số liệu cần thiết để hiểu về sức khỏe và tương lai của mạng lưới. Nhưng chính xác thì phát hành ETH có nghĩa là gì? Hãy cùng phân tích chi tiết.

## Tại sao nguồn cung và phát hành ETH lại quan trọng {#why-eth-supply-matters}

Trong tài chính truyền thống, các ngân hàng trung ương kiểm soát nguồn cung tiền, thường in thêm để kích thích nền kinh tế. Mặt khác, Ethereum hoạt động trên một hệ thống minh bạch và có thể dự đoán được, được quản lý bởi mã nguồn của nó. Việc biết có bao nhiêu ETH tồn tại và tốc độ phát hành ETH mới giúp:

- **Xây dựng niềm tin**: Cộng đồng Ethereum có thể xác minh dữ liệu nguồn cung và phát hành trực tiếp từ Chuỗi khối.
- **Hiểu về giá trị**: Mối quan hệ giữa tỷ lệ phát hành và tỷ lệ đốt ETH tác động đến lạm phát hoặc giảm phát của ETH, ảnh hưởng đến giá trị của nó theo thời gian.
- **Theo dõi sức khỏe mạng lưới**: Những thay đổi trong tỷ lệ phát hành và tỷ lệ đốt phản ánh hoạt động và tính bảo mật của mạng lưới.

## Phát hành ETH là gì? {#eth-issuance}

Phát hành ETH đề cập đến quá trình tạo ra ETH mới như phần thưởng cho các trình xác thực bảo vệ mạng lưới Ethereum. Nó tách biệt với tổng nguồn cung, tức là tổng số lượng ETH đang lưu thông.

### Nói một cách đơn giản: {#in-simple-terms}
- **Phát hành** thêm ETH mới vào mạng lưới.
- **Đốt** (được giới thiệu bởi EIP-1559) loại bỏ ETH khỏi mạng lưới bằng cách tiêu hủy một phần phí giao dịch.

Hai lực lượng này quyết định liệu nguồn cung của Ethereum sẽ tăng lên (lạm phát) hay thu hẹp lại (giảm phát) theo thời gian.

## Nguồn cung và phát hành ETH hiện nay {#eth-supply-today}

Hệ thống Bằng chứng cổ phần (PoS) của Ethereum đã giảm đáng kể lượng phát hành ETH so với mô hình Bằng chứng công việc (PoW) trước đó. Các trình xác thực—những người khóa ETH để bảo vệ mạng lưới—kiếm được ETH như phần thưởng. Bạn có thể xem tỷ lệ phát hành hiện tại trên [Ultrasound Money](https://ultrasound.money).

Tuy nhiên, con số này là động. Nhờ EIP-1559, khi hoạt động mạng lưới cao, tỷ lệ đốt ETH có thể vượt qua lượng phát hành, tạo ra hiệu ứng giảm phát. Ví dụ, trong những giai đoạn nhu cầu cao, như khi ra mắt NFT hoặc hoạt động tài chính phi tập trung (DeFi), lượng ETH bị đốt có thể nhiều hơn lượng được phát hành.

### Các công cụ để theo dõi nguồn cung và phát hành ETH: {#tools-to-track-eth-supply-and-issuance}
- [Ultrasound Money](https://ultrasound.money) - Theo dõi thời gian thực về nguồn cung, tỷ lệ phát hành và tỷ lệ đốt ETH
- [Etherscan](https://etherscan.io) - Trình khám phá khối với các số liệu về nguồn cung

## Các yếu tố ảnh hưởng đến nguồn cung và phát hành ETH trong tương lai {#future-eth-supply}

Nguồn cung trong tương lai của Ethereum không cố định—nó phụ thuộc vào một số biến số:

1. **Sự tham gia đặt cọc**: 
   - Nhiều trình xác thực tham gia mạng lưới hơn đồng nghĩa với việc có nhiều phần thưởng ETH được phân phối hơn.
   - Ít trình xác thực tham gia hơn có thể làm giảm lượng phát hành.
   - Tìm hiểu thêm về [việc đặt cọc](/staking/).

2. **Hoạt động mạng lưới**:
   - Khối lượng giao dịch cao dẫn đến việc có nhiều ETH bị đốt hơn, có khả năng bù đắp hoặc vượt quá lượng phát hành.
   - Đọc về [phí Gas](/developers/docs/gas/) và cách chúng ảnh hưởng đến việc đốt.

3. **Nâng cấp Giao thức**:
   - Những thay đổi trong tương lai đối với mã nguồn của Ethereum có thể điều chỉnh phần thưởng đặt cọc hoặc cơ chế đốt, tiếp tục định hình động lực nguồn cung.
   - Cập nhật thông tin với [lộ trình Ethereum](/roadmap/).

## Tóm tắt: Nguồn cung, phát hành ETH và những gì tiếp theo {#recap}

Dưới đây là tóm tắt nhanh về những gì bạn cần biết về nguồn cung và phát hành ETH:

- **Nguồn cung ETH**: Động và thay đổi liên tục, có thể theo dõi theo thời gian thực thông qua các công cụ như [Ultrasound Money](https://ultrasound.money)
- **Phát hành theo PoS**: Giảm đáng kể so với PoW, với phần thưởng thuộc về các trình xác thực. Xem tỷ lệ hiện tại trên [Ultrasound Money](https://ultrasound.money)
- **Vai trò của EIP-1559**: Việc đốt ETH có thể làm cho mạng lưới giảm phát trong những giai đoạn hoạt động cao
- **Xu hướng tương lai**: Sự tham gia đặt cọc, nhu cầu mạng lưới và các bản cập nhật Giao thức đều sẽ định hình nguồn cung ETH

Việc hiểu về phát hành ETH giúp làm sáng tỏ giá trị của Ethereum và tiềm năng của nó như một tài sản phi tập trung, giảm phát. Để biết thêm thông tin chi tiết về cách The Merge tác động đến nguồn cung ETH, hãy xem [bài phân tích chi tiết](/roadmap/merge/issuance/) của chúng tôi. Bạn tò mò về tương lai của ETH? Hãy tìm hiểu sâu hơn với các công cụ như [Ultrasound Money](https://ultrasound.money) hoặc khám phá [hướng dẫn đặt cọc](/staking/) của chúng tôi.