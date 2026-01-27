---
title: Bằng chứng công việc (PoW)
description: Giải thích về giao thức đồng thuận bằng chứng công việc và vai trò của nó trong Ethereum.
lang: vi
---

Mạng Ethereum bắt đầu bằng cách sử dụng một cơ chế đồng thuận có tên là **[Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow)**. Điều này cho phép các nút của mạng lưới Ethereum đồng thuận về trạng thái của tất cả các thông tin được ghi lại trên chuỗi khối Ethereum và ngăn chặn một số loại tấn công kinh tế nhất định. Tuy nhiên, Ethereum đã ngừng sử dụng bằng chứng công việc vào năm 2022 và thay vào đó bắt đầu sử dụng [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos).

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Chứng chỉ công việc hiện đã bị loại bỏ. Ethereum không còn sử dụng bằng chứng công việc như một phần của cơ chế đồng thuận nữa. Thay vào đó, nó sử dụng bằng chứng cổ phần. Đọc thêm về [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) và [đặt cược](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước về [các giao dịch](/developers/docs/transactions/), [các khối](/developers/docs/blocks/) và [các cơ chế đồng thuận](/developers/docs/consensus-mechanisms/).

## Bằng cứng công việc (PoW) là gì? {#what-is-pow}

Sự đồng thuận Nakamoto, vốn sử dụng bằng chứng công việc, là cơ chế từng cho phép mạng Ethereum phi tập trung đạt được sự đồng thuận (tức là mọi nút đều đồng ý) về những việc như số dư tài khoản và thứ tự các giao dịch. Điều này ngăn người dùng "chi tiêu hai lần" số tiền của họ và đảm bảo rằng chuỗi Ethereum trở nên vô cùng khó bị tấn công hoặc thao túng. Các thuộc tính bảo mật này hiện đến từ bằng chứng cổ phần, sử dụng cơ chế đồng thuận được gọi là [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Bằng chứng công việc và khai thác {#pow-and-mining}

Chứng chỉ công việc là thuật toán nền tảng xác định độ khó và các quy tắc cho công việc mà các thợ đào thực hiện trên các chuỗi khối sử dụng cơ chế Chứng chỉ công việc. Khai thác chính là bản thân “công việc” đó. Đó là hành động thêm các khối hợp lệ vào chuỗi. Điều này quan trọng vì độ dài của chuỗi giúp mạng lưới xác định đúng nhánh của chuỗi khối. Càng nhiều “công việc” được thực hiện, chuỗi càng dài, số khối càng cao, mạng lưới càng chắc chắn về trạng thái hiện tại của mọi thứ.

[Thông tin thêm về khai thác](/developers/docs/consensus-mechanisms/pow/mining/)

## Cơ chế Chứng chỉ công việc của Ethereum hoạt động như thế nào? {#how-it-works}

Các giao dịch trên Ethereum được xử lý thành các khối. Trong Ethereum sử dụng cơ chế Chứng chỉ công việc hiện đã bị loại bỏ, mỗi khối chứa:

- khối độ khó - Ví dụ: 3.324.092.183.262.715
- mixHash – ví dụ: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – ví dụ: `0xd3ee432b4fb3d26b`

Dữ liệu khối này liên quan trực tiếp đến bằng chứng công việc.

### Công việc trong bằng chứng công việc {#the-work}

Giao thức bằng chứng công việc, Ethash, yêu cầu các thợ đào phải trải qua một cuộc chạy đua thử và sai căng thẳng để tìm nonce cho một khối. Chỉ các khối có chuỗi số ngẫu nhiên hợp lệ mới có thể được thêm vào chuỗi.

Khi chạy đua để tạo một khối, thợ khai thác lặp đi lặp lại một bộ dữ liệu, chỉ có thể thu được bằng cách tải xuống và chạy toàn bộ chuỗi (như một thợ khai thác thực hiện), qua một hàm toán học. Bộ dữ liệu này được sử dụng để tạo ra một giá trị hàm băm thấp hơn mức mục tiêu do độ khó của khối quyết định. Cách tốt nhất để thực hiện việc này là thông qua phương pháp thử và sai.

Độ khó xác định mục tiêu cho giá trị băm. Mục tiêu càng thấp, tập hợp các giá trị băm hợp lệ càng nhỏ. Một khi được tạo ra, điều này trở nên cực kỳ dễ dàng để các thợ đào và các ứng dụng khác xác minh. Ngay cả khi chỉ một giao dịch thay đổi, giá trị băm sẽ hoàn toàn khác, báo hiệu gian lận.

Băm giúp dễ dàng phát hiện gian lận. Nhưng Chứng chỉ công việc như một quá trình cũng là rào cản lớn ngăn việc tấn công chuỗi.

### Bằng chứng công việc và bảo mật {#security}

Các thợ đào được khuyến khích thực hiện công việc này trên chuỗi Ethereum chính. Có rất ít động lực để một nhóm thợ đào bắt đầu chuỗi riêng của họ - vì điều đó sẽ làm suy yếu hệ thống. Chuỗi khối dựa vào việc có một trạng thái duy nhất làm nguồn tin cậy.

Mục tiêu của bằng chứng công việc là mở rộng chuỗi. Chuỗi dài nhất được tin tưởng là hợp lệ nhất vì nó có nhiều công việc tính toán nhất để tạo ra nó. Trong hệ thống PoW của Ethereum, gần như không thể tạo các khối mới để xóa giao dịch, tạo giao dịch giả, hoặc duy trì một chuỗi thứ hai. Điều này là vì một thợ khai thác ác ý sẽ phải luôn giải được chuỗi số ngẫu nhiên của khối nhanh hơn tất cả mọi người khác.

Để liên tục tạo các khối hợp lệ nhưng ác ý, một thợ khai thác ác ý sẽ cần hơn 51% sức mạnh khai thác của mạng để vượt qua tất cả những người khác. Lượng “công việc” đó đòi hỏi rất nhiều sức mạnh tính toán tốn kém và năng lượng tiêu thụ có thể còn vượt quá lợi ích đạt được từ một cuộc tấn công.

### Kinh tế học bằng chứng công việc {#economics}

Chứng chỉ công việc cũng chịu trách nhiệm phát hành tiền mới vào hệ thống và khuyến khích các thợ khai thác thực hiện công việc.

Kể từ [bản nâng cấp Constantinople](/ethereum-forks/#constantinople), các thợ đào tạo thành công một khối đã được thưởng hai ETH mới được đúc và một phần phí giao dịch. Các khối ommer cũng được bồi thường 1,75 ETH. Khối ommer là các khối hợp lệ được một thợ khai thác tạo ra gần như cùng lúc với thợ khai thác khác tạo khối chính thức, và cuối cùng khối chính thức được xác định dựa trên chuỗi nào được xây dựng tiếp trước. Các khối ommer thường xảy ra do độ trễ mạng.

## Tính kết luận cuối cùng {#finality}

Một giao dịch có “Tính kết luận cuối cùng” trên Ethereum khi nó là một phần của khối không thể thay đổi.

Vì các thợ đào làm việc theo cách phi tập trung, hai khối hợp lệ có thể được khai thác cùng lúc. Điều này tạo ra một phân nhánh tạm thời. Cuối cùng, một trong các chuỗi này trở thành chuỗi được chấp nhận sau khi các khối tiếp theo được khai thác và thêm vào, làm cho nó dài hơn.

Để làm phức tạp thêm mọi thứ, các giao dịch bị từ chối trên phân nhánh tạm thời có thể không được đưa vào chuỗi được chấp nhận. Điều này có nghĩa là nó có thể bị đảo ngược. Do đó, tính kết luận cuối cùng đề cập đến khoảng thời gian bạn nên chờ trước khi xem xét một giao dịch không thể đảo ngược. Với Ethereum bằng chứng công việc trước đây, càng có nhiều khối được khai thác trên một khối `N` cụ thể, thì độ tin cậy rằng các giao dịch trong `N` đã thành công và sẽ không bị đảo ngược càng cao. Hiện nay, với cơ chế bằng chứng cổ phần, tính cuối cùng của một khối là một đặc tính rõ ràng, thay vì mang tính xác suất.

## Mức tiêu thụ năng lượng của bằng chứng công việc {#energy}

Một trong những chỉ trích chính về chứng chỉ làm việc là lượng năng lượng cần thiết để giữ an toàn cho mạng lưới. Để duy trì bảo mật và tính phi tập trung, Ethereum khi sử dụng bằng chứng công việc đã tiêu thụ một lượng lớn năng lượng. Ngay trước khi chuyển sang bằng chứng cổ phần, các thợ đào Ethereum đã tiêu thụ tổng cộng khoảng 70 TWh/năm (tương đương mức tiêu thụ của Cộng hòa Séc - theo [digiconomist](https://digiconomist.net/) vào ngày 18 tháng 7 năm 2022).

## Ưu và nhược điểm {#pros-and-cons}

| Ưu điểm                                                                                                                                                                                                                                                                         | Nhược điểm                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bằng chứng công việc là trung lập. Bạn không cần ETH để bắt đầu và phần thưởng khối sẽ cho bạn từ 0ETH đến một số dư số dương. Với [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/), bạn cần có ETH để bắt đầu. | Bằng chứng công việc tiêu thụ quá nhiều năng lượng, gây hại cho môi trường.                                                                |
| Bằng chứng công việc là một cơ chế đồng thuận kiểm thử, giúp Bitcoin và Ethereum duy trì tính bảo mật và tính phi tập trung trong nhiều năm.                                                                                                                    | Nếu bạn muốn khai thác, bạn cần thiết bị chuyên dụng đến mức việc bắt đầu là một khoản đầu tư lớn.                                         |
| So với bằng chứng cổ phần, nó tương đối dễ triển khai.                                                                                                                                                                                                          | Do nhu cầu tính toán ngày càng tăng, các nhóm khai thác có thể chiếm ưu thế trong việc khai thác, dẫn đến tập trung hóa và rủi ro bảo mật. |

## So sánh với bằng chứng cổ phần {#compared-to-pos}

Ở cấp độ cao, bằng chứng cổ phần có cùng mục tiêu cuối cùng như bằng chứng công việc: giúp mạng phi tập trung đạt được sự đồng thuận một cách an toàn. Nhưng nó có một số khác biệt về quy trình và nhân sự:

- Bằng chứng công việc thay thế tầm quan trọng của sức mạnh tính toán bằng ETH đã được đặt cọc.
- Chứng chỉ gửi thay thế các thợ khai thác bằng các người xác thực. Các người xác thực đặt cọc ETH của họ để kích hoạt khả năng tạo các khối mới.
- Các người xác thực không cạnh tranh để tạo khối; thay vào đó, họ được chọn ngẫu nhiên bởi một thuật toán.
- Tính kết luận cuối cùng rõ ràng hơn: tại các điểm kiểm tra nhất định, nếu 2/3 trình xác thực đồng ý về trạng thái của khối, khối đó được coi là cuối cùng. Trình xác thực phải đặt cược toàn bộ tiền đặt cược của họ vào điều này, vì vậy nếu họ cố gắng thông đồng, họ sẽ mất toàn bộ tiền đặt cược.

[Thông tin thêm về bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/)

## Tìm hiểu thêm từ video trực quan? Người học qua hình ảnh {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Đọc thêm {#further-reading}

- [Tấn công đa số](https://en.bitcoin.it/wiki/Majority_attack)
- [Về tính hoàn tất của quyết toán](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Video {#videos}

- [Giải thích kỹ thuật về các giao thức bằng chứng công việc](https://youtu.be/9V1bipPkCTU)

## Các chủ đề liên quan {#related-topics}

- [Khai thác](/developers/docs/consensus-mechanisms/pow/mining/)
- [Bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/)
- [Bằng chứng ủy quyền](/developers/docs/consensus-mechanisms/poa/)
