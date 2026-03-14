---
title: "Một Ethereum bảo mật hơn"
description: "Ethereum là nền tảng hợp đồng thông minh an toàn và phi tập trung nhất hiện nay. Tuy nhiên, vẫn còn những cải tiến có thể được thực hiện để Ethereum duy trì khả năng chống chịu trước mọi cấp độ tấn công trong tương lai xa."
lang: vi
image: /images/roadmap/roadmap-security.png
alt: "Lộ trình Ethereum"
template: roadmap
---

**Ethereum đã là một nền tảng [hợp đồng thông minh](/glossary/#smart-contract) rất an toàn và phi tập trung.** Tuy nhiên, vẫn còn những cải tiến có thể được thực hiện để Ethereum duy trì khả năng chống chịu trước mọi loại tấn công trong tương lai xa. Những thay đổi này bao gồm các thay đổi nhỏ trong cách [máy khách Ethereum](/glossary/#consensus-client) xử lý các [khối](/glossary/#block) cạnh tranh, cũng như tăng tốc độ mà mạng lưới coi các khối là ["đã hoàn tất"](/developers/docs/consensus-mechanisms/pos/#finality) (nghĩa là chúng không thể bị thay đổi nếu kẻ tấn công không chịu tổn thất kinh tế cực kỳ lớn).

Cũng có những cải tiến giúp việc kiểm duyệt giao dịch trở nên khó khăn hơn nhiều bằng cách khiến các người đề xuất khối không thể biết nội dung thực tế của khối mà họ đề xuất, cùng với những cách mới để phát hiện khi một Client đang kiểm duyệt. Tất cả những cải tiến này kết hợp lại sẽ nâng cấp giao thức [bằng chứng cổ phần](/glossary/#pos), để người dùng — từ cá nhân cho đến doanh nghiệp — có thể ngay lập tức tin tưởng vào ứng dụng, dữ liệu và tài sản của mình trên Ethereum.

## Rút tiền Staking {#staking-withdrawals}

Việc nâng cấp từ [bằng chứng công việc](/glossary/#pow) sang bằng chứng cổ phần đã bắt đầu khi những người tiên phong của Ethereum “staking” ETH của họ trong một hợp đồng ký quỹ. Số ETH đó được dùng để bảo vệ mạng lưới. Đã có bản cập nhật thứ hai vào ngày 12 tháng 4 năm 2023 để cho phép người xác thực rút ETH đã staking. Từ lúc đó, các nút xác thực có thể tự do Stake hoặc rút ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Đọc về việc rút tiền</ButtonLink>

## Phòng chống các cuộc tấn công {#defending-against-attacks}

Có những cải tiến có thể được thực hiện đối với giao thức bằng chứng cổ phần của Ethereum. Một giải pháp được gọi là [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - một thuật toán lựa chọn [phân nhánh](/glossary/#fork) an toàn hơn, khiến một số loại tấn công tinh vi trở nên khó thực hiện hơn.

Giảm thời gian Ethereum [hoàn tất](/glossary/#finality) các khối sẽ mang lại trải nghiệm người dùng tốt hơn và ngăn chặn các cuộc tấn công "reorg" tinh vi, trong đó kẻ tấn công cố gắng sắp xếp lại các khối gần nhất để trục lợi hoặc kiểm duyệt một số giao dịch nhất định. [**Single Slot Finality (SSF)**](/roadmap/single-slot-finality/) là **cách để giảm thiểu độ trễ của việc hoàn tất**. Hiện tại đang có khoảng 15 phút khối (số khối tạo ra trong 15 phút) mà về lý thuyết, kẻ tấn công có thể thuyết phục các nút xác thực khác cấu hình lại. Với SSF, con số này là 0. Người dùng, từ cá nhân đến ứng dụng và sàn giao dịch được hưởng lợi ích nhờ sự đảm bảo nhanh chóng rằng giao dịch của họ sẽ không bị đảo ngược, và mạng lưới cũng được lợi nhờ loại bỏ hoàn toàn một lớp tấn công.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Đọc thêm về Single Slot Finality</ButtonLink>

## Chống kiểm duyệt {#defending-against-censorship}

Tính phi tập trung ngăn các cá nhân hoặc nhóm nhỏ [người xác thực](/glossary/#validator) trở nên quá có ảnh hưởng. Công nghệ Staking mới có thể giúp đảm bảo rằng các nút xác thực Ethereum duy trì phi tập trung tối đa, đồng thời bảo vệ họ trước các sự cố về phần cứng, phần mềm và sập mạng lưới. Điều này bao gồm phần mềm chia sẻ trách nhiệm của người xác thực trên nhiều [nút](/glossary/#node). Công nghệ này được gọi là **công nghệ trình xác thực phân tán (DVT)**. [Các bể staking](/glossary/#staking-pool) được khuyến khích sử dụng DVT vì nó cho phép nhiều máy tính cùng nhau tham gia vào việc xác thực, tăng thêm tính dự phòng và khả năng chịu lỗi. Nó cũng chia nhỏ chìa khóa của các nút xác thực ra nhiều hệ thống, thay vì để một người vận hành duy nhất chạy nhiều nút xác thực. Điều này khiến cho những nhà vận hành không trung thực khó phối hợp để tấn công Ethereum hơn. Nhìn chung, ý tưởng là thu được lợi ích bảo mật bằng cách vận hành những người xác thực dưới dạng _cộng đồng_ thay vì cá nhân.

<ButtonLink variant="outline-color" href="/staking/dvt/">Đọc về công nghệ trình xác thực phân tán</ButtonLink>

Việc triển khai **cơ chế tách biệt người đề xuất và người xây dựng khối (PBS)** sẽ cải thiện đáng kể khả năng chống kiểm duyệt vốn có của Ethereum. PBS cho phép một nút xác thực tạo khối và một nút khác phát tán khối đó trên toàn mạng lưới Ethereum. Điều này đảm bảo rằng lợi nhuận từ các thuật toán xây dựng khối chuyên nghiệp nhằm tối đa hóa lợi nhuận được chia sẻ công bằng hơn trên toàn mạng, **ngăn chặn việc cổ phần bị tập trung** vào những người staking tổ chức có hiệu suất tốt nhất theo thời gian. Người đề xuất khối sẽ chọn khối sinh lợi cao nhất được gửi tới họ bởi một thị trường những người xây dựng khối. Để kiểm duyệt, một người đề xuất khối thường sẽ phải chọn một khối kém lợi nhuận hơn, điều này **vừa phi lý về mặt kinh tế, vừa dễ bị những người xác thực còn lại trên mạng phát hiện**.

Có những tính năng bổ sung tiềm năng cho PBS, chẳng hạn như giao dịch được mã hóa và danh sách bắt buộc, có thể giúp cải thiện hơn nữa khả năng chống kiểm duyệt của Ethereum. Những cơ chế này khiến cho người xây dựng khối và người đề xuất khối không thể nhìn thấy các giao dịch thực tế được đưa vào trong khối của họ.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Đọc về cơ chế tách biệt người đề xuất-người xây dựng</ButtonLink>

## Bảo vệ người xác thực {#protecting-validators}

Có khả năng một kẻ tấn công tinh vi có thể xác định những người xác thực sắp tới và spam họ để ngăn họ đề xuất các khối; đây được gọi là một cuộc tấn công **từ chối dịch vụ (DoS)**. Việc triển khai [**cơ chế bầu chọn người dẫn đầu bí mật (SLE)**](/roadmap/secret-leader-election) sẽ bảo vệ khỏi loại tấn công này bằng cách ngăn chặn việc người đề xuất khối bị biết trước. Cơ chế này hoạt động bằng cách liên tục xáo trộn chuỗi mật mã học đại diện cho những ứng viên đề xuất khối, và sử dụng thứ tự của chúng để xác định nút xác thực nào được chọn theo cách mà chỉ chính các nút xác thực mới biết thứ tự đó từ trước.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Đọc về bầu chọn người dẫn đầu bí mật</ButtonLink>

## Tiến độ hiện tại {#current-progress}

**Các nâng cấp bảo mật trên lộ trình đang ở giai đoạn nghiên cứu nâng cao**, nhưng dự kiến sẽ chưa được triển khai trong một thời gian. Các bước tiếp theo cho view-merge, PBS, SSF và SLE là hoàn thiện đặc tả và bắt đầu xây dựng các nguyên mẫu.
