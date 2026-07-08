---
title: "Thị trường dự đoán"
lang: vi
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Nhận ưu đãi tài chính để tạo ra các dự báo chính xác"
  - "Dự đoán chất lượng cao về các sự kiện trong tương lai"
buttons: 
  - content: Tìm hiểu thêm
    toId: how-prediction-markets-work
  - content: Khám phá ứng dụng
    toId: find-a-prediction-market
    isSecondary: false
---

Thị trường dự đoán sử dụng trí tuệ đám đông và các ưu đãi tài chính để dự báo các sự kiện. Chúng cung cấp dữ liệu đa dạng, chất lượng cao và đã thu hút được sự chú ý trong cuộc bầu cử Hoa Kỳ năm 2024.

## Cách thức hoạt động của thị trường dự đoán {#how-prediction-markets-work}

Khác với các phương pháp dự báo truyền thống dựa vào ý kiến chuyên gia, mẫu khảo sát hạn chế hoặc dữ liệu lịch sử, thị trường dự đoán tận dụng **các ưu đãi tài chính theo thời gian thực** và **trí tuệ đám đông** để tạo ra thông tin chi tiết liên quan đến một sự kiện cụ thể—bầu cử, giá tiền mã hóa, kết quả thể thao—bất cứ điều gì. 

Điều này cho phép bất kỳ ai cũng có thể thể hiện sự ủng hộ đối với một kết quả cụ thể bằng một cam kết tài chính.
 
Bằng cách cho phép đặt cược vào các sự kiện trong thế giới thực và điều chỉnh giá khi có thông tin mới, các ý kiến có cơ sở sẽ được đánh giá cao hơn và sự chính xác có thể được khen thưởng. 

Về lý thuyết, vì người đặt cược có thể kiếm lời từ việc dự đoán đúng, thị trường dự đoán có thể dự báo kết quả với độ chính xác cao. Các thị trường dự đoán dựa trên Chuỗi khối thậm chí còn thú vị hơn, vì hầu như bất kỳ ai cũng có thể tham gia dự báo và kiếm được phần thưởng bằng stablecoin hoặc tiền mã hóa.

## Tại sao điều này lại quan trọng? {#why-does-this-matter}

Khác với dự báo truyền thống, các thị trường dự đoán dựa trên Chuỗi khối có tính:

<Grid>
  <Card title="Được khuyến khích" emoji=":money_with_wings:" description="Người tham gia đặt cọc tiền thật, từ đó mang lại những dự đoán chất lượng cao."/>
  <Card title="Sự phi tập trung" emoji="🌎" description="Việc sử dụng chuỗi khối và hợp đồng thông minh đảm bảo các khoản thanh toán minh bạch và tự động." />
  <Card title="Tỷ lệ cược do thị trường quyết định" emoji="🤝" description="Giá được định đoạt bởi các nhà giao dịch mua và bán cổ phần kết quả, thay vì được định sẵn bởi một nhà cái tập trung." />
</Grid>

Ngay cả khi là một người quan sát thị trường, bạn cũng có thể đánh giá các dữ liệu có giá trị mà nếu không thì sẽ không có sẵn. Hãy nghĩ về nó như thế này:

1. Các dự đoán được gắn với một sự kiện cụ thể (ví dụ: Beam Chain có triển khai trước năm 2030 không?).
2. Những người tham gia thị trường mua và bán cổ phần dựa trên sự tự tin của họ vào bất kỳ kết quả nào.
3. Giá cả điều chỉnh khi có nhiều người tham gia đặt cọc cho niềm tin của họ, phản ánh thông tin chi tiết theo thời gian thực.
4. Bất kỳ ai đặt cược đúng đều kiếm được tỷ lệ thuận với số tiền đã đặt cọc. 
5. Những người quan sát thị trường có thể tận dụng dữ liệu mở để cung cấp thông tin cho nghiên cứu hoặc thảo luận.

## Tìm một thị trường dự đoán {#find-a-prediction-market}

Có một số thị trường dự đoán dựa trên Ethereum hiện có sẵn. Dưới đây là một số thị trường dự đoán nổi tiếng nhất hiện nay:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Hãy lưu tâm đến các rủi ro</strong></p>
  <p className="mt-2">Chỉ đặt cược những gì bạn có thể chi trả và nhận thức được các hành vi gây nghiện tiềm ẩn.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Thách thức & Rủi ro {#challenges-and-risks}

Thị trường dự đoán trên Chuỗi khối phải đối mặt với một số thách thức có thể ảnh hưởng đến tính công bằng, tính hợp pháp và độ chính xác.

⚠️ **Thao túng thị trường** – Những người chơi giàu có có thể làm sai lệch kết quả thông qua giao dịch rửa (wash trading).  
💧 **Vấn đề thanh khoản** – Sự tham gia thấp ([Thanh khoản mỏng](https://www.investopedia.com/terms/t/thinmarket.asp)) có thể làm giảm độ tin cậy của thị trường.  
🏛 **Sự không chắc chắn về quy định** – Các chính phủ đã áp đặt các hạn chế đối với một số nền tảng.

Để giảm thiểu những vấn đề này, các nhà phát triển Ethereum đang thử nghiệm các giải pháp như futarchy (Quản trị bằng thị trường dự đoán) và xác minh danh tính phi tập trung.

## Thử nghiệm với thị trường dự đoán {#experimenting-with-prediction-markets}

Thị trường dự đoán đang định hình lại việc ra quyết định trong thời đại kỹ thuật số. Bằng cách tận dụng Ethereum, chúng cung cấp **những cách thức công bằng, cởi mở và bổ ích để dự đoán tương lai.**

Có nhiều cách để sử dụng các công cụ dự báo ngoài mục đích lợi ích tài chính. Ví dụ, trong một [Đề xuất cải tiến DevCon](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP), người ta đã đề xuất rằng các nhà tổ chức DevCon sử dụng thị trường dự đoán để dự đoán số lượng người tham dự cho các sự kiện trong tương lai. 

Điều này sẽ giúp các nhà tổ chức xác định địa điểm nào sẽ dẫn đến sự kiện lớn nhất, so với địa điểm nào sẽ dễ tiếp cận nhất trên phạm vi quốc tế. Lợi ích của việc này có nghĩa là các nhà tổ chức DevCon có thể đẩy nhanh thời gian cần thiết để sàng lọc nhiều chính sách thị thực, khả năng tiếp cận sân bay và chi phí sinh hoạt trong khu vực, đồng thời thu thập dữ liệu về nơi mà những người có khả năng tham dự sẽ hào hứng muốn đến.

## Đọc thêm {#further-reading}

[Từ thị trường dự đoán đến tài chính thông tin](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Phát triển thị trường dự đoán phi tập trung trên Ethereum](https://blockchain.oodles.io/dev-blog/decentralized-prediction-market-development-ethereum/)  
[Sách trắng của dự án Augur](https://github.com/AugurProject/whitepaper)
