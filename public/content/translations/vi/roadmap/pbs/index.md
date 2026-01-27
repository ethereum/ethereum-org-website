---
title: Phân tách Bên xây dựng-đề xuất
description: Tìm hiểu làm thế nào và tại sao nút xác thực Ethereum sẽ chia trách nhiệm xây khối và phân tán nó.
lang: vi
---

# Tách biệt nhóm đề xuất và nhóm xây dựng chuỗi khối {#proposer-builder-separation}

Các trình xác thực Ethereum ngày nay tạo _và_ phát sóng các khối. Họ gom các giao dịch mà họ nhận được thông qua mạng lưới trò chuyện rồi đóng gói chúng thành một khối và gửi khối đó đến các nút ngang hàng khác trong mạng Ethereum. **Tách biệt nhóm đề xuất và nhóm xây dựng chuỗi khối (PBS)** phân chia các tác vụ này cho nhiều trình xác thực. Người xây khối chịu trách nhiệm tạo khối và gửi chúng cho người tạo khối trong mỗi Slot. Người đề xuất khối không thể nhìn thấy nội dung của khối; họ chỉ đơn giản chọn khối mang lại lợi nhuận cao nhất, trả phí cho người xây khối trước khi gửi khối đó đến các nút ngang hàng khác.

Đây là một nâng cấp quan trọng vì nhiều lý do. Thứ nhất, nó tạo ra cơ hội để ngăn chặn việc kiểm duyệt giao dịch ngay ở cấp độ giao thức. Thứ hai, nó giúp các nhà vận hành nút nghiệp dư không bị lép vế trước các tổ chức lớn, vốn có khả năng tối ưu hóa lợi nhuận từ việc xây dựng khối tốt hơn. Thứ ba, nó hỗ trợ việc mở rộng Ethereum bằng cách cho phép triển khai các nâng cấp phân đoạn thế hệ mới (Danksharding).

## PBS và khả năng kháng kiểm duyệt {#pbs-and-censorship-resistance}

Việc tách riêng người xây và người đề xuất khối khiến việc kiểm duyệt giao dịch trở nên khó khăn hơn nhiều với người xây. Bởi vì có thể thêm những tiêu chí kiểm tra phức tạp để đảm bảo rằng không có giao dịch nào bị kiểm duyệt trước khi khối được đề xuất. Vì người đề xuất khối là một thực thể tách biệt khỏi người xây, nên họ có thể đóng vai trò người bảo vệ, chống lại các người xây có ý định kiểm duyệt.

Ví dụ, có thể đưa vào danh sách bắt buộc để khi nút xác thực biết về các giao dịch nhưng không thấy chúng được đưa vào khoois, họ có thể buộc chúng phải có trong khối tiếp theo. Danh sách bắt buộc được tạo từ bộ nhớ tạm cục bộ của người đề xuất khối (danh sách các giao dịch mà nó biết đến) và được gửi cho các nút ngang hàng ngay trước khi khối được đề xuất. Nếu bất kỳ giao dịch nào trong danh sách bị thiếu, người đề xuất có thể: từ chối khối, thêm các giao dịch bị thiếu trước khi đề xuất, hoặc đề xuất khốiđó và để nó bị từ chối bởi các nút khác khi họ nhận được. Ngoài ra, còn có một phiên bản tiềm năng hiệu quả hơn của ý tưởng này, theo đó người xây bắt buộc phải tận dụng toàn bộ dung lượng khối khả dụng, và nếu họ không làm thì các giao dịch sẽ được thêm từ danh sách bắt buộc của người đề xuất. Đây vẫn là một lĩnh vực nghiên cứu đang diễn ra, và cấu hình tối ưu cho danh sách bắt buộc vẫn chưa được xác định.

[Các vùng nhớ giao dịch (mempool) được mã hóa](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) cũng có thể khiến những người xây dựng và người đề xuất không thể biết họ đang đưa giao dịch nào vào một khối cho đến khi khối đó đã được phát sóng.

<ExpandableCard title="What kinds of censorship does PBS solve?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Các tổ chức quyền lực có thể gây áp lực buộc nút kiểm duyệt các giao dịch đến hoặc đi từ một số địa chỉ nhất định. Các nút xác thực làm theo bằng cách phát hiện các địa chỉ danh sách đen trong dữ liệu giao dịch và loại bỏ chúng khỏi các khối mà họ đề xuất. Sau khi có PBS, điều này sẽ không còn khả thi nữa vì người đề xuất sẽ không biết những giao dịch nào họ đang phát tán trong khối của mình. Việc kiểm duyệt có thể quan trọng đối với một số cá nhân hoặc ứng dụng, ví dụ khi điều đó trở thành luật pháp ở khu vực của họ. Trong những trường hợp này, sự tuân thủ diễn ra ở cấp độ ứng dụng, trong khi giao thức vẫn giữ tính không cần xin phép và không bị kiểm duyệt.

</ExpandableCard>

## PBS và MEV {#pbs-and-mev}

**Giá trị trích xuất tối đa (MEV)** đề cập đến việc các trình xác thực tối đa hóa lợi nhuận của họ bằng cách sắp xếp các giao dịch một cách có lợi. Các ví dụ phổ biến bao gồm kinh doanh chênh lệch giá các giao dịch hoán đổi trên các sàn giao dịch phi tập trung (ví dụ: chạy trước một lệnh mua hoặc bán lớn) hoặc xác định các cơ hội để thanh lý các vị thế DeFi. Tối ưu MEV đòi hỏi phải có chuyên môn giỏi và phần mềm tùy chỉnh bổ sung cho nút xác thực thông thường, làm cho các tổ chức lớn có khả năng vượt trội hơn cá nhân và dân nghiệp dư trong việc thai khác MEV. Điều này có nghĩa là lợi nhuận từ việc Staking sẽ cao hơn đối với tổ chức tập trung, tạo một thế lực tập trung có thể giảm động lực chạy Staking tại nhà.

PBS giúp giải quyết các phần đề này bằng cách tái cấu trúc lại cơ chế kinh tế của MEV. Thay vì người đề xuất khối tự mình tìm kiếm MEV, họ chỉ đơn giản chọn một khối được nhiều người xây đề xuất cho họ. Những người xây khối có thể đã thực hiện khai thác MEV tinh vi, nhưng phần thưởng lại thuộc về các người đề xuất khối. Điều này có nghĩa là khi một nhóm nhỏ người xây khối chuyên biệt thống trị việc khai thác MEV, thì phần thưởng cũng có thể thuộc về bất kì nút xác thực nào trong mạng và gồm cả những người Stake tại nhà.

<ExpandableCard title="Why is it OK to centralize block building?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Những cá nhân được khuyến khích Stake thông qua nhóm chung (Pool) thay vì một mình để có thể đạt được phần thưởng cao hơn mà các chiến lược MEV tinh vi mang lại. Việc tách rời quá trình xây dựng khối khỏi việc đề xuất khối đồng nghĩa với việc MEV được khai thác sẽ được phân phối cho nhiều nút xác thực hơn, thay vì tập trung vào những người khai thác MEV hiệu quả nhất. Đồng thời, cho phép người xây khối chuyên biệt tồn tại sẽ giúp gỡ bỏ gánh nặng xây dựng khối khỏi các cá nhân, đồng thời ngăn các cá nhân lấy cắp MEV, trong khi vẫn tối đa hóa số lượng nút cá nhân và độc lập có thể kiểm tra tính trung thực của các khối. Khái niệm quan trọng ở đây là “bất đối xứng giữa người chứng minh và kiểm chứng ("Prover-Verifier Asymmetry"), chỉ rằng việc sản xuất khối tập trung là chấp nhận được miễn là có một mạng lưới người kiểm chứng mạnh mẽ và phi tập trung tối đa để kiểm chứng rằng các khối là trung thực. Phi tập trung là phương tiện, không phải là mục tiêu cuối - những gì chúng ta cần là một khối trung thực. </ExpandableCard>

## PBS và Danksharding {#pbs-and-danksharding}

Danksharding là cách Ethereum sẽ mở rộng quy mô lên >100.000 giao dịch mỗi giây và giảm thiểu phí cho người dùng rollup. Nó dựa trên PBS, bởi vì nó tăng khối lượng công việc cho những người xây khối, những người phải tính toán bằng chứng lên đến 64 MB Rollups trong chưa đầy một giây. Điều này có lẽ sẽ đòi hỏi người xây chuyên biệt, có thể dành phần cứng mạnh mẽ cho công việc này. Tuy nhiên, trong tình hình hiện tại xây dựng khối có thể ngày càng tập trung hơn vào các nhà vận hành tinh vi và mạnh mẽ hơn cũng vì khai thác MEV. Tách người đề xuất và xây khối là một cách để chấp nhận thực tế này, đồng thời ngăn nó gây lực tập trung hóa lên xác thực khối (đây là phần quan trọng) haocjw phân phối phần thưởng Staking. Một lợi ích bên cạch đó là những nhà xây khối chuyên biệt cũng rất sẵn sàng và có khả năng tính toán các bằng chứng dữ liệu cần thiết cho phân đoạn thế hệ mới.

## Tiến độ hiện tại {#current-progress}

PBS là một đề tài nâng cao trong nghiên cứu, nhưng vẫn có những câu hỏi thiết kế quan trọng cần được giải đáp trước khi áp dụng vào Client của Ethereum. Vẫn chưa có bản đặc tả chính thức nào được hoàn thiện. Điều này có nghĩa PBS sẽ cần một hoặc nhiều năm nữa. Kiểm tra [tình hình nghiên cứu mới nhất](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Đọc thêm {#further-reading}

- [Tình hình nghiên cứu: khả năng kháng kiểm duyệt trong PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Các thiết kế thị trường phí thân thiện với PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS và khả năng kháng kiểm duyệt](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Danh sách bao gồm](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
