---
title: "Thị trường dự đoán"
lang: vi
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Giao dịch dựa trên kết quả của các sự kiện trong tương lai"
  - "Giá cả hoạt động như một ước tính công khai, trực tiếp về khả năng xảy ra của một điều gì đó"
buttons:
  - content: Tìm hiểu thêm
    toId: how-prediction-markets-work
  - content: Khám phá ứng dụng
    toId: find-a-prediction-market
    isSecondary: false
---

Các thị trường dự đoán cho phép mọi người mua và bán cổ phần dựa trên kết quả của các sự kiện trong tương lai. Giá của một cổ phần cho thấy thị trường nói chung đánh giá khả năng xảy ra kết quả đó như thế nào. Chúng đã thu hút sự chú ý rộng rãi trong cuộc bầu cử Hoa Kỳ năm 2024.

## Cách thức hoạt động của thị trường dự đoán {#how-prediction-markets-work}

Mỗi thị trường đặt ra một câu hỏi với câu trả lời rõ ràng, chẳng hạn như "Ngày mai trời có mưa ở Lisbon không?". Một cổ phần **Có** (Yes) sẽ trả 1 đô la nếu câu trả lời là có và không trả gì nếu không phải. Một cổ phần **Không** (No) hoạt động theo chiều ngược lại.

Nếu cổ phần Có giao dịch ở mức 67 xu, thị trường đang cho thấy có khoảng 67% khả năng trời sẽ mưa. Bất kỳ ai cho rằng khả năng thực tế khác đi đều có thể mua hoặc bán, và điều đó làm thay đổi giá. Bởi vì những người biết nhiều thông tin hơn có lý do để giao dịch, thông tin mới có xu hướng phản ánh vào giá một cách nhanh chóng. Đó là lý do tại sao các thị trường dự đoán có thể là những dự báo hữu ích. Dù chúng không hoàn hảo.

Mỗi cổ phần chiến thắng được trả bởi một người giữ phe thua. Các thị trường dự đoán là **trò chơi có tổng bằng không** (zero-sum): ngoại trừ phí, những gì người thắng kiếm được chính là những gì người thua mất đi.

## Tại sao điều này lại quan trọng? {#why-does-this-matter}

Các thị trường dự đoán dựa trên chuỗi khối bổ sung một vài điều mà các trang web cá cược và sàn giao dịch truyền thống không có:

<Grid>
  <Card title="Dữ liệu mở" emoji="🔍" description="Mọi giao dịch đều được ghi lại trên chuỗi, vì vậy bất kỳ ai cũng có thể kiểm tra giá cả, khối lượng và ai đã thắng hay thua."/>
  <Card title="Thanh toán trên chuỗi" emoji="🌎" description="Các vị thế là các token trong ví của riêng bạn và các hợp đồng thông minh sẽ thanh toán các cổ phần chiến thắng sau khi kết quả được báo cáo." />
  <Card title="Tỷ lệ cược do thị trường thúc đẩy" emoji="🤝" description="Giá được thiết lập bởi các nhà giao dịch mua và bán cổ phần kết quả, thay vì được thiết lập sẵn bởi một nhà cái tập trung." />
</Grid>

Dữ liệu mở có ý nghĩa quan trọng trong thực tế. Các nhà nghiên cứu đã có thể [nghiên cứu mọi giao dịch trên Polymarket](https://cepr.org/publications/dp21615), bao gồm hơn 2,4 triệu người dùng từ tháng 11 năm 2022 đến tháng 3 năm 2026, bởi vì các giao dịch của nó được thanh toán trên một chuỗi khối công khai. Loại kiểm tra độc lập đó không thể thực hiện được trên các nền tảng tập trung như Kalshi, nơi giao dịch và thanh toán diễn ra trên hệ thống riêng của công ty. Không có hồ sơ công khai nào để kiểm toán và không có hợp đồng thông minh nào đảm bảo rằng các vị thế chiến thắng sẽ được thanh toán.

Dưới đây là cách một thị trường hoạt động từ đầu đến cuối:

1. Một thị trường được tạo ra xoay quanh một câu hỏi với các quy tắc rõ ràng về cách nó sẽ được quyết định.
2. Các nhà giao dịch mua và bán cổ phần Có và Không, và giá sẽ thay đổi theo hành động của họ.
3. Khi sự kiện xảy ra, một [nguồn cấp dữ liệu](/developers/docs/oracles/) sẽ báo cáo kết quả trên chuỗi. Trên Polymarket, bất kỳ ai cũng có thể đề xuất kết quả bằng cách đặt cọc và bất kỳ ai khác cũng có thể tranh chấp kết quả đó. Nếu một tranh chấp không được giải quyết, những người nắm giữ token UMA sẽ bỏ phiếu về kết quả.
4. Mỗi cổ phần chiến thắng có thể được đổi lấy 1 đô la. Cổ phần thua không có giá trị.
5. Bất kỳ ai cũng có thể sử dụng lịch sử giá và dữ liệu giao dịch để nghiên cứu hoặc thảo luận.

## Tìm một thị trường dự đoán {#find-a-prediction-market}

Các thị trường dự đoán này thanh toán các giao dịch trên chuỗi, vì vậy bất kỳ ai cũng có thể kiểm tra giá cả và lịch sử giao dịch:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Hãy lưu tâm đến các rủi ro</strong></p>
  <p className="mt-2">Hầu hết những người giao dịch trên các thị trường dự đoán đều mất tiền. Chỉ giao dịch với số tiền mà bạn có thể chấp nhận mất và hãy nhận thức về các hành vi gây nghiện tiềm ẩn.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Thách thức & Rủi ro {#challenges-and-risks}

Các thị trường dự đoán đối mặt với những thách thức thực sự ảnh hưởng đến tính công bằng, tính hợp pháp và độ chính xác.

📉 **Hầu hết các nhà giao dịch đều thua lỗ** – Một [nghiên cứu về mọi giao dịch trên Polymarket](https://cepr.org/publications/dp21615) từ tháng 11 năm 2022 đến tháng 3 năm 2026 cho thấy khoảng 69% người dùng kết thúc với một khoản lỗ. Trong số những người dùng kiếm được tiền, 1% đứng đầu đã chiếm 76,5% lợi nhuận. Những người chiến thắng lớn nhất chủ yếu là các nhà giao dịch cung cấp thanh khoản bằng các lệnh giới hạn, thường là chuyên nghiệp và với khối lượng lớn.

🕵️ **Giao dịch nội gián** – Những người biết trước kết quả có thể kiếm lợi nhuận từ sự thua lỗ của các nhà giao dịch khác. [Các nhà nghiên cứu tại Trường Luật Columbia và Đại học Haifa](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) ước tính rằng các nhà giao dịch bị nghi ngờ có thông tin nội bộ đã kiếm được khoảng 143 triệu đô la trên Polymarket từ tháng 2 năm 2024 đến tháng 2 năm 2026.

⚖️ **Kết quả bị tranh chấp** – Các hợp đồng thông minh có thể thanh toán tự động, nhưng vẫn phải có người báo cáo những gì đã xảy ra. Khi một câu hỏi được diễn đạt lỏng lẻo hoặc các sự kiện không rõ ràng, kết quả được báo cáo có thể bị tranh chấp.

⚠️ **Thao túng thị trường** – Các nhà giao dịch có nhiều tiền có thể làm thay đổi giá cả, đặc biệt là trong các thị trường nhỏ. Giao dịch rửa tiền (wash trading - tự giao dịch với chính mình) có thể làm cho một thị trường trông có vẻ nhộn nhịp hơn thực tế.

💧 **Các vấn đề về thanh khoản** – Sự tham gia thấp ([thanh khoản mỏng](https://www.investopedia.com/terms/t/thinmarket.asp)) có thể làm cho giá cả kém tin cậy hơn.

🏛 **Sự không chắc chắn về quy định** – Các quy tắc khác nhau tùy theo quốc gia và thay đổi nhanh chóng. Tại Hoa Kỳ, các cơ quan quản lý và tòa án vẫn đang quyết định xem một số hợp đồng sự kiện, đặc biệt là về thể thao, được tính là sản phẩm tài chính hay cờ bạc. Nhiều nền tảng chặn người dùng ở một số quốc gia nhất định.

## Thử nghiệm với thị trường dự đoán {#experimenting-with-prediction-markets}

Các thị trường dự đoán có thể hữu ích vượt ra ngoài việc giao dịch để kiếm lợi nhuận. Một ý tưởng, được gọi là futarchy (chính trị thị trường), tiến xa hơn và sử dụng các thị trường để giúp đưa ra quyết định, chứ không chỉ dự báo chúng.

Ví dụ, một [Đề xuất Cải tiến Devcon (DIP)](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) đã đề nghị các nhà tổ chức Devcon sử dụng các thị trường dự đoán để dự báo số lượng người tham dự tại các địa điểm có thể tổ chức trong tương lai. Điều này có thể giúp họ cân nhắc xem thành phố nào sẽ thu hút sự kiện lớn nhất so với thành phố nào sẽ dễ tiếp cận nhất trên phạm vi quốc tế. Nó cũng có thể tiết kiệm thời gian dành cho việc so sánh các chính sách thị thực, khả năng tiếp cận sân bay và chi phí sinh hoạt, đồng thời cho thấy những người dự định tham dự sẽ hào hứng muốn đi đến đâu.

## Đọc thêm {#further-reading}

[Từ các thị trường dự đoán đến tài chính thông tin (info finance)](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Ai thắng và ai thua trong các thị trường dự đoán? Bằng chứng từ Polymarket](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie, và Martineau  
[Sách trắng của Dự án Augur](https://github.com/AugurProject/whitepaper)
