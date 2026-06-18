---
title: Bằng chứng công việc (PoW)
description: Giải thích về giao thức đồng thuận bằng chứng công việc và vai trò của nó trong Ethereum.
lang: vi
---

Mạng lưới [Ethereum](/) bắt đầu bằng việc sử dụng một cơ chế đồng thuận liên quan đến **[Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow)**. Điều này cho phép các nút của mạng lưới Ethereum đồng thuận về trạng thái của tất cả thông tin được ghi lại trên Chuỗi khối Ethereum và ngăn chặn một số loại tấn công kinh tế. Tuy nhiên, Ethereum đã tắt bằng chứng công việc vào năm 2022 và bắt đầu sử dụng [bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos) để thay thế.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Bằng chứng công việc hiện đã bị loại bỏ. Ethereum không còn sử dụng bằng chứng công việc như một phần của cơ chế đồng thuận nữa. Thay vào đó, nó sử dụng bằng chứng cổ phần. Đọc thêm về [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/) và [việc đặt cọc](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [giao dịch](/developers/docs/transactions/), [khối](/developers/docs/blocks/) và [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/).

## Bằng chứng công việc (PoW) là gì? {#what-is-pow}

Đồng thuận Nakamoto, sử dụng bằng chứng công việc, là cơ chế từng cho phép mạng lưới Ethereum phi tập trung đạt được đồng thuận (tức là tất cả các nút đều đồng ý) về những thứ như số dư tài khoản và thứ tự của các giao dịch. Điều này ngăn chặn người dùng "chi tiêu kép" số tiền của họ và đảm bảo rằng Chuỗi Ethereum cực kỳ khó bị tấn công hoặc thao túng. Những thuộc tính bảo mật này hiện đến từ bằng chứng cổ phần thay vì sử dụng cơ chế đồng thuận được gọi là [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Bằng chứng công việc và khai thác {#pow-and-mining}

Bằng chứng công việc là thuật toán cơ bản thiết lập độ khó và các quy tắc cho công việc mà các thợ đào thực hiện trên các Chuỗi khối bằng chứng công việc. Khai thác chính là "công việc". Đó là hành động thêm các khối hợp lệ vào Chuỗi. Điều này rất quan trọng vì chiều dài của Chuỗi giúp mạng lưới đi theo đúng Phân nhánh của Chuỗi khối. Càng nhiều "công việc" được thực hiện, Chuỗi càng dài và số khối càng cao, mạng lưới càng có thể chắc chắn về trạng thái hiện tại của mọi thứ.

[Tìm hiểu thêm về khai thác](/developers/docs/consensus-mechanisms/pow/mining/)

## Bằng chứng công việc của Ethereum đã hoạt động như thế nào? {#how-it-works}

Các giao dịch Ethereum được xử lý thành các khối. Trong Ethereum bằng chứng công việc hiện đã bị loại bỏ, mỗi khối chứa:

- độ khó của khối – ví dụ: 3,324,092,183,262,715
- mixHash – ví dụ: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – ví dụ: `0xd3ee432b4fb3d26b`

Dữ liệu khối này liên quan trực tiếp đến bằng chứng công việc.

### Công việc trong bằng chứng công việc {#the-work}

Giao thức bằng chứng công việc, Ethash, yêu cầu các thợ đào phải trải qua một cuộc đua thử và sai khốc liệt để tìm ra nonce cho một khối. Chỉ những khối có nonce hợp lệ mới có thể được thêm vào Chuỗi.

Khi chạy đua để tạo ra một khối, một thợ đào liên tục đưa một tập dữ liệu, thứ chỉ có thể thu được bằng cách tải xuống và chạy toàn bộ Chuỗi (như một thợ đào vẫn làm), qua một hàm toán học. Tập dữ liệu được sử dụng để tạo ra một mixHash dưới một mục tiêu được quyết định bởi độ khó của khối. Cách tốt nhất để làm điều này là thông qua thử và sai.

Độ khó xác định mục tiêu cho Mã băm. Mục tiêu càng thấp, tập hợp các Mã băm hợp lệ càng nhỏ. Sau khi được tạo ra, điều này cực kỳ dễ dàng để các thợ đào và máy khách khác xác minh. Ngay cả khi một giao dịch thay đổi, Mã băm sẽ hoàn toàn khác, báo hiệu sự gian lận.

Quá trình băm làm cho gian lận dễ bị phát hiện. Nhưng bằng chứng công việc như một quá trình cũng là một rào cản lớn đối với việc tấn công Chuỗi.

### Bằng chứng công việc và bảo mật {#security}

Các thợ đào được khuyến khích thực hiện công việc này trên Chuỗi Ethereum chính. Có rất ít động lực để một nhóm nhỏ thợ đào bắt đầu Chuỗi của riêng họ—điều đó làm suy yếu hệ thống. Các Chuỗi khối dựa vào việc có một trạng thái duy nhất làm nguồn chân lý.

Mục tiêu của bằng chứng công việc là mở rộng Chuỗi. Chuỗi dài nhất đáng tin cậy nhất là Chuỗi hợp lệ vì nó có nhiều công việc tính toán nhất được thực hiện để tạo ra nó. Trong hệ thống PoW của Ethereum, gần như không thể tạo ra các khối mới xóa các giao dịch, tạo ra các giao dịch giả mạo hoặc duy trì một Chuỗi thứ hai. Đó là bởi vì một thợ đào độc hại sẽ luôn cần phải giải quyết nonce của khối nhanh hơn tất cả những người khác.

Để liên tục tạo ra các khối độc hại nhưng hợp lệ, một thợ đào độc hại sẽ cần hơn 51% sức mạnh khai thác của mạng lưới để đánh bại tất cả những người khác. Lượng "công việc" đó đòi hỏi rất nhiều sức mạnh tính toán đắt tiền và năng lượng tiêu tốn thậm chí có thể vượt quá lợi ích thu được trong một cuộc tấn công.

### Tính kinh tế của bằng chứng công việc {#economics}

Bằng chứng công việc cũng chịu trách nhiệm phát hành tiền tệ mới vào hệ thống và khuyến khích các thợ đào thực hiện công việc.

Kể từ [bản nâng cấp Constantinople](/ethereum-forks/#constantinople), các thợ đào tạo thành công một khối được thưởng hai ETH mới đúc và một phần phí giao dịch. Các khối Ommer cũng được bồi thường 1,75 ETH. Các khối Ommer là các khối hợp lệ được tạo bởi một thợ đào gần như cùng lúc với một thợ đào khác tạo ra khối chính tắc, điều này cuối cùng được xác định bởi Chuỗi nào được xây dựng trên đó trước. Các khối Ommer thường xảy ra do độ trễ của mạng lưới.

## Tính chung cuộc {#finality}

Một giao dịch có "tính chung cuộc" trên Ethereum khi nó là một phần của một khối không thể thay đổi.

Bởi vì các thợ đào làm việc theo cách phi tập trung, hai khối hợp lệ có thể được khai thác cùng một lúc. Điều này tạo ra một Phân nhánh tạm thời. Cuối cùng, một trong những Chuỗi này trở thành Chuỗi được chấp nhận sau khi các khối tiếp theo được khai thác và thêm vào nó, làm cho nó dài hơn.

Để làm mọi thứ phức tạp hơn, các giao dịch bị từ chối trên Phân nhánh tạm thời có thể không được đưa vào Chuỗi được chấp nhận. Điều này có nghĩa là nó có thể bị đảo ngược. Vì vậy, tính chung cuộc đề cập đến thời gian bạn nên chờ đợi trước khi coi một giao dịch là không thể đảo ngược. Dưới Ethereum bằng chứng công việc trước đây, càng nhiều khối được khai thác trên một khối cụ thể `N`, độ tin cậy càng cao rằng các giao dịch trong `N` đã thành công và sẽ không bị hoàn tác. Giờ đây, với bằng chứng cổ phần, việc hoàn tất là một thuộc tính rõ ràng, thay vì mang tính xác suất, của một khối.

## Mức sử dụng năng lượng của bằng chứng công việc {#energy}

Một lời chỉ trích lớn đối với bằng chứng công việc là lượng năng lượng đầu ra cần thiết để giữ cho mạng lưới an toàn. Để duy trì bảo mật và sự phi tập trung, Ethereum trên bằng chứng công việc đã tiêu thụ một lượng lớn năng lượng. Ngay trước khi chuyển sang bằng chứng cổ phần, các thợ đào Ethereum đã cùng nhau tiêu thụ khoảng 70 TWh/năm (gần bằng Cộng hòa Séc - theo [digiconomist](https://digiconomist.net/) vào ngày 18 tháng 7 năm 2022).

## Ưu và nhược điểm {#pros-and-cons}

| Ưu điểm                                                                                                                                                                                                                         | Nhược điểm                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Bằng chứng công việc là trung lập. Bạn không cần ETH để bắt đầu và phần thưởng khối cho phép bạn đi từ 0 ETH đến số dư dương. Với [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/), bạn cần có ETH để bắt đầu. | Bằng chứng công việc sử dụng quá nhiều năng lượng nên nó có hại cho môi trường.                                                                      |
| Bằng chứng công việc là một cơ chế đồng thuận đã được thử nghiệm và kiểm chứng, giúp giữ cho Bitcoin và Ethereum an toàn và phi tập trung trong nhiều năm.                                                                                          | Nếu bạn muốn khai thác, bạn cần thiết bị chuyên dụng đến mức đó là một khoản đầu tư lớn để bắt đầu.                                                |
| So với bằng chứng cổ phần, nó tương đối dễ triển khai.                                                                                                                                                                | Do nhu cầu tính toán ngày càng tăng, các nhóm khai thác có khả năng thống trị cuộc chơi khai thác, dẫn đến rủi ro tập trung hóa và bảo mật. |

## So sánh với bằng chứng cổ phần {#compared-to-pos}

Ở mức độ tổng quan, bằng chứng cổ phần có cùng mục tiêu cuối cùng như bằng chứng công việc: giúp mạng lưới phi tập trung đạt được đồng thuận một cách an toàn. Nhưng nó có một số khác biệt về quy trình và nhân sự:

- Bằng chứng cổ phần thay thế tầm quan trọng của sức mạnh tính toán bằng ETH được đặt cọc.
- Bằng chứng cổ phần thay thế các thợ đào bằng các trình xác thực. Các trình xác thực đặt cọc ETH của họ để kích hoạt khả năng tạo các khối mới.
- Các trình xác thực không cạnh tranh để tạo khối, thay vào đó họ được chọn ngẫu nhiên bởi một thuật toán.
- Tính chung cuộc rõ ràng hơn: tại các điểm kiểm tra nhất định, nếu 2/3 trình xác thực đồng ý về trạng thái của khối, nó được coi là cuối cùng. Các trình xác thực phải đặt cược toàn bộ khoản đặt cọc của họ vào điều này, vì vậy nếu họ cố gắng thông đồng sau này, họ sẽ mất toàn bộ khoản đặt cọc của mình.

[Tìm hiểu thêm về bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/)

## Bạn thích học qua hình ảnh hơn? {#visual-learner}

<VideoWatch slug="proof-of-work-explained" />

## Đọc thêm {#further-reading}

- [Tấn công đa số](https://en.bitcoin.it/wiki/Majority_attack)
- [Về tính chung cuộc của quyết toán](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Video {#videos}

- [Giải thích kỹ thuật về các giao thức bằng chứng công việc](https://youtu.be/9V1bipPkCTU)

## Chủ đề liên quan {#related-topics}

- [Khai thác](/developers/docs/consensus-mechanisms/pow/mining/)
- [Bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/)
- [Bằng chứng ủy quyền](/developers/docs/consensus-mechanisms/poa/)