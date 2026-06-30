---
title: "Một Ethereum bảo mật hơn"
description: "Ethereum là nền tảng hợp đồng thông minh bảo mật và phi tập trung nhất hiện nay. Tuy nhiên, vẫn có thể thực hiện các cải tiến để Ethereum duy trì khả năng chống chịu trước mọi cấp độ tấn công trong tương lai xa."
lang: vi
image: /images/roadmap/roadmap-security.png
alt: "Lộ trình Ethereum"
template: roadmap
---

**Ethereum vốn đã là một nền tảng** [hợp đồng thông minh](/glossary/#smart-contract) phi tập trung và **rất bảo mật**. Tuy nhiên, vẫn có thể thực hiện các cải tiến để Ethereum duy trì khả năng chống chịu trước mọi loại hình tấn công trong tương lai xa. Những cải tiến này bao gồm các thay đổi tinh tế trong cách [máy khách Ethereum](/glossary/#consensus-client) xử lý các [khối](/glossary/#block) cạnh tranh, cũng như tăng tốc độ mà mạng lưới xem các khối là ["đã chung cuộc"](/developers/docs/consensus-mechanisms/pos/#finality) (nghĩa là chúng không thể bị thay đổi nếu kẻ tấn công không chịu tổn thất kinh tế cực lớn).

Ngoài ra còn có các cải tiến giúp việc kiểm duyệt giao dịch trở nên khó khăn hơn nhiều bằng cách làm cho người đề xuất khối không thể thấy nội dung thực tế trong các khối của họ, và các phương pháp mới để xác định khi nào một máy khách đang thực hiện kiểm duyệt. Cùng với nhau, những cải tiến này sẽ nâng cấp giao thức [Bằng chứng cổ phần (PoS)](/glossary/#pos) để người dùng - từ cá nhân đến các tập đoàn - có thể tin tưởng ngay lập tức vào các ứng dụng, dữ liệu và tài sản của họ trên Ethereum.

## Rút tiền đặt cọc {#staking-withdrawals}

Quá trình nâng cấp từ [Bằng chứng công việc (PoW)](/glossary/#pow) lên Bằng chứng cổ phần (PoS) bắt đầu với việc những người tiên phong của Ethereum "đặt cọc" ETH của họ vào một hợp đồng tiền gửi. Số ETH đó được sử dụng để bảo vệ mạng lưới. Đã có một bản cập nhật thứ hai vào ngày 12 tháng 4 năm 2023 để cho phép các trình xác thực rút số ETH đã đặt cọc. Kể từ đó, các trình xác thực có thể tự do đặt cọc hoặc rút ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Đọc về việc rút tiền</ButtonLink>

## Phòng thủ chống lại các cuộc tấn công {#defending-against-attacks}

Có những cải tiến có thể được thực hiện đối với giao thức Bằng chứng cổ phần (PoS) của Ethereum. Một trong số đó được gọi là [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - một thuật toán lựa chọn [phân nhánh](/glossary/#fork) bảo mật hơn, giúp gây khó khăn cho một số loại hình tấn công tinh vi nhất định.

Việc giảm thời gian Ethereum cần để [đạt tính chung cuộc](/glossary/#finality) cho các khối sẽ mang lại trải nghiệm người dùng tốt hơn và ngăn chặn các cuộc tấn công "tổ chức lại chuỗi" tinh vi nơi những kẻ tấn công cố gắng xáo trộn các khối rất gần đây để trục lợi hoặc kiểm duyệt một số giao dịch nhất định. [**Tính chung cuộc trong một slot (SSF)**](/roadmap/single-slot-finality/) là một **cách để giảm thiểu độ trễ đạt tính chung cuộc**. Hiện tại, có một lượng khối tương đương 15 phút mà về mặt lý thuyết, kẻ tấn công có thể thuyết phục các trình xác thực khác cấu hình lại. Với SSF, con số này là 0. Người dùng, từ cá nhân đến các ứng dụng và sàn giao dịch, được hưởng lợi từ sự đảm bảo nhanh chóng rằng các giao dịch của họ sẽ không bị hoàn tác, và mạng lưới được hưởng lợi nhờ việc triệt tiêu hoàn toàn một nhóm các cuộc tấn công.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Đọc về tính chung cuộc trong một slot</ButtonLink>

## Phòng thủ chống lại sự kiểm duyệt {#defending-against-censorship}

Sự phi tập trung ngăn chặn các cá nhân hoặc nhóm nhỏ các [trình xác thực](/glossary/#validator) trở nên quá có sức ảnh hưởng. Các công nghệ đặt cọc mới có thể giúp đảm bảo các trình xác thực của Ethereum duy trì tính phi tập trung ở mức tối đa đồng thời bảo vệ chúng khỏi các sự cố về phần cứng, phần mềm và mạng lưới. Điều này bao gồm phần mềm chia sẻ trách nhiệm của trình xác thực trên nhiều [nút](/glossary/#node). Điều này được gọi là **công nghệ trình xác thực phân tán (DVT)**. [Các nhóm đặt cọc](/glossary/#staking-pool) được khuyến khích sử dụng DVT vì nó cho phép nhiều máy tính cùng tham gia vào quá trình xác thực, bổ sung thêm tính dự phòng và khả năng chịu lỗi. Nó cũng phân chia các khóa của trình xác thực trên nhiều hệ thống, thay vì để các nhà điều hành đơn lẻ chạy nhiều trình xác thực. Điều này khiến các nhà điều hành không trung thực khó có thể phối hợp tấn công Ethereum hơn. Nhìn chung, ý tưởng là đạt được các lợi ích bảo mật bằng cách chạy các trình xác thực dưới dạng _cộng đồng_ thay vì cá nhân.

<ButtonLink variant="outline-color" href="/staking/dvt/">Đọc về công nghệ trình xác thực phân tán</ButtonLink>

Việc triển khai **tách biệt người đề xuất và người xây dựng (PBS)** sẽ cải thiện đáng kể các hệ thống phòng thủ tích hợp sẵn của Ethereum chống lại sự kiểm duyệt. PBS cho phép một trình xác thực tạo ra một khối và một trình xác thực khác phát sóng nó trên toàn mạng lưới Ethereum. Điều này đảm bảo rằng lợi nhuận từ các thuật toán tạo khối chuyên nghiệp nhằm tối đa hóa lợi nhuận được chia sẻ công bằng hơn trên toàn mạng lưới, **ngăn chặn việc đặt cọc bị tập trung** vào các tổ chức đặt cọc có hiệu suất tốt nhất theo thời gian. Người đề xuất khối được quyền chọn khối mang lại nhiều lợi nhuận nhất được cung cấp cho họ bởi một thị trường các trình tạo block. Để kiểm duyệt, một người đề xuất khối thường sẽ phải chọn một khối ít lợi nhuận hơn, điều này sẽ **phi lý về mặt kinh tế và cũng hiển nhiên đối với các trình xác thực còn lại** trên mạng lưới.

Có những tiện ích bổ sung tiềm năng cho PBS, chẳng hạn như các giao dịch được mã hóa và danh sách bao gồm (inclusion list), có thể cải thiện hơn nữa khả năng chống kiểm duyệt của Ethereum. Những tiện ích này làm cho trình tạo block và người đề xuất không thể thấy các giao dịch thực tế được đưa vào trong khối của họ.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Đọc về việc tách biệt người đề xuất và người xây dựng</ButtonLink>

## Bảo vệ các trình xác thực {#protecting-validators}

Có khả năng một kẻ tấn công tinh vi có thể xác định các trình xác thực sắp tới và gửi thư rác (spam) cho họ để ngăn họ đề xuất khối; điều này được gọi là một cuộc tấn công **từ chối dịch vụ (DoS)**. Việc triển khai [**bầu chọn người dẫn đầu bí mật (SLE)**](/roadmap/secret-leader-election) sẽ bảo vệ chống lại loại hình tấn công này bằng cách ngăn chặn việc biết trước danh tính của những người đề xuất khối. Phương pháp này hoạt động bằng cách liên tục xáo trộn một tập hợp các cam kết mật mã đại diện cho các ứng cử viên đề xuất khối và sử dụng thứ tự của họ để xác định trình xác thực nào được chọn theo cách mà chỉ bản thân các trình xác thực mới biết trước thứ tự của họ.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Đọc về bầu chọn người dẫn đầu bí mật</ButtonLink>

## Tiến độ hiện tại {#current-progress}

**Các bản nâng cấp bảo mật trên lộ trình đang ở giai đoạn nghiên cứu nâng cao**, nhưng dự kiến sẽ chưa được triển khai trong một thời gian nữa. Các bước tiếp theo đối với view-merge, PBS, SSF và SLE là hoàn thiện thông số kỹ thuật và bắt đầu xây dựng các nguyên mẫu.
