---
title: Chuỗi Beacon
description: Tìm hiểu về Chuỗi Beacon - bản nâng cấp đã giới thiệu Bằng chứng cổ phần (PoS) cho Ethereum.
lang: vi
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "Chuỗi Beacon đã giới thiệu Bằng chứng cổ phần (PoS) vào hệ sinh thái Ethereum."
  - "Nó đã được hợp nhất với Chuỗi khối Bằng chứng công việc (PoW) ban đầu của Ethereum vào tháng 9 năm 2022."
  - "Chuỗi Beacon đã giới thiệu logic đồng thuận và giao thức truyền tin khối (block gossip) hiện đang bảo mật cho Ethereum."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Chuỗi Beacon đã được ra mắt vào ngày 1 tháng 12 năm 2020 và chính thức hóa Bằng chứng cổ phần (PoS) làm cơ chế đồng thuận của Ethereum với bản nâng cấp The Merge vào ngày 15 tháng 9 năm 2022.
</UpgradeStatus>

## Chuỗi Beacon là gì? {#what-is-the-beacon-chain}

Chuỗi Beacon là tên của Chuỗi khối Bằng chứng cổ phần (PoS) ban đầu được ra mắt vào năm 2020. Nó được tạo ra để đảm bảo logic đồng thuận Bằng chứng cổ phần (PoS) là hợp lý và bền vững trước khi kích hoạt nó trên Mạng chính [Ethereum](/). Do đó, nó đã chạy song song với Ethereum Bằng chứng công việc (PoW) ban đầu. Chuỗi Beacon là một Chuỗi các khối 'trống', nhưng việc tắt Bằng chứng công việc (PoW) và bật Bằng chứng cổ phần (PoS) trên Ethereum đòi hỏi phải hướng dẫn Chuỗi Beacon chấp nhận dữ liệu giao dịch từ các ứng dụng khách thực thi, nhóm chúng thành các khối và sau đó tổ chức chúng thành một Chuỗi khối bằng cách sử dụng cơ chế đồng thuận dựa trên Bằng chứng cổ phần (PoS). Cùng lúc đó, các ứng dụng khách Ethereum ban đầu đã tắt tính năng khai thác, sự truyền khối và logic đồng thuận của chúng, giao toàn bộ việc đó cho Chuỗi Beacon. Sự kiện này được gọi là [The Merge](/roadmap/merge/). Khi The Merge diễn ra, không còn hai Chuỗi khối nữa. Thay vào đó, chỉ có một Ethereum Bằng chứng cổ phần (PoS), hiện yêu cầu hai ứng dụng khách khác nhau cho mỗi nút. Chuỗi Beacon hiện là lớp đồng thuận, một mạng lưới ngang hàng của các ứng dụng khách đồng thuận xử lý việc truyền tin khối và logic đồng thuận, trong khi các ứng dụng khách ban đầu tạo thành lớp thực thi, chịu trách nhiệm truyền tin và thực thi các giao dịch, cũng như quản lý trạng thái của Ethereum. Hai lớp này có thể giao tiếp với nhau bằng Engine API.

## Chuỗi Beacon làm gì? {#what-does-the-beacon-chain-do}

Chuỗi Beacon là tên được đặt cho một sổ cái tài khoản đã tiến hành và điều phối mạng lưới những người [đặt cọc](/staking/) Ethereum trước khi những người đặt cọc đó bắt đầu xác thực các khối Ethereum thực sự. Tuy nhiên, nó không xử lý các giao dịch hoặc xử lý các tương tác hợp đồng thông minh vì điều đó đang được thực hiện ở lớp thực thi.
Chuỗi Beacon chịu trách nhiệm cho những việc như xử lý khối và chứng thực, chạy thuật toán chọn nhánh, và quản lý phần thưởng cũng như hình phạt.
Đọc thêm trên [trang kiến trúc nút](/developers/docs/nodes-and-clients/node-architecture/#node-comparison) của chúng tôi.

## Tác động của Chuỗi Beacon {#beacon-chain-features}

### Giới thiệu việc đặt cọc {#introducing-staking}

Chuỗi Beacon đã giới thiệu [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/) cho Ethereum. Điều này giữ cho Ethereum an toàn và giúp các trình xác thực kiếm được nhiều ETH hơn trong quá trình này. Trong thực tế, việc đặt cọc liên quan đến việc đặt cọc ETH để kích hoạt phần mềm trình xác thực. Là một người đặt cọc, bạn chạy phần mềm tạo và xác thực các khối mới trong Chuỗi.

Việc đặt cọc phục vụ một mục đích tương tự như việc [khai thác](/developers/docs/consensus-mechanisms/pow/mining/) trước đây, nhưng khác biệt ở nhiều khía cạnh. Việc khai thác đòi hỏi chi phí trả trước lớn dưới dạng phần cứng mạnh mẽ và mức tiêu thụ năng lượng, dẫn đến lợi thế nhờ quy mô và thúc đẩy sự tập trung hóa. Việc khai thác cũng không đi kèm với bất kỳ yêu cầu nào về việc khóa tài sản làm tài sản thế chấp, hạn chế khả năng của Giao thức trong việc trừng phạt các tác nhân xấu sau một cuộc tấn công.

Việc chuyển đổi sang Bằng chứng cổ phần (PoS) đã làm cho Ethereum an toàn và phi tập trung hơn đáng kể so với Bằng chứng công việc (PoW). Càng nhiều người tham gia vào mạng lưới, nó càng trở nên phi tập trung và an toàn hơn trước các cuộc tấn công.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Nếu bạn quan tâm đến việc trở thành một trình xác thực và giúp bảo mật Ethereum, hãy [tìm hiểu thêm về việc đặt cọc](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Chuẩn bị cho việc phân mảnh {#setting-up-for-sharding}

Kể từ khi Chuỗi Beacon hợp nhất với Mạng chính Ethereum ban đầu, cộng đồng Ethereum đã bắt đầu tìm cách mở rộng quy mô mạng lưới.

Bằng chứng cổ phần (PoS) có lợi thế là có một sổ đăng ký của tất cả các nhà sản xuất khối được phê duyệt tại bất kỳ thời điểm nào, mỗi người đều có khoản đặt cọc bằng ETH. Sổ đăng ký này tạo tiền đề cho khả năng chia để trị nhưng phân chia một cách đáng tin cậy các trách nhiệm cụ thể của mạng lưới.

Trách nhiệm này trái ngược với Bằng chứng công việc (PoW), nơi các thợ khai thác không có nghĩa vụ với mạng lưới và có thể ngừng khai thác cũng như tắt vĩnh viễn phần mềm nút của họ ngay lập tức mà không phải chịu hậu quả gì. Cũng không có sổ đăng ký các nhà đề xuất khối đã biết và không có cách nào đáng tin cậy để phân chia trách nhiệm mạng lưới một cách an toàn.

[Tìm hiểu thêm về phân mảnh](/roadmap/danksharding/)

## Mối quan hệ giữa các bản nâng cấp {#relationship-between-upgrades}

Các bản nâng cấp Ethereum đều có phần liên quan đến nhau. Vì vậy, hãy tóm tắt lại cách Chuỗi Beacon ảnh hưởng đến các bản nâng cấp khác.

### Chuỗi Beacon và The Merge {#merge-and-beacon-chain}

Lúc đầu, Chuỗi Beacon tồn tại tách biệt với Mạng chính Ethereum, nhưng chúng đã được hợp nhất vào năm 2022.

<ButtonLink href="/roadmap/merge/">
  The Merge
</ButtonLink>

### Các phân mảnh và Chuỗi Beacon {#shards-and-beacon-chain}

Việc phân mảnh chỉ có thể tham gia vào hệ sinh thái Ethereum một cách an toàn khi có sẵn cơ chế đồng thuận Bằng chứng cổ phần (PoS). Chuỗi Beacon đã giới thiệu việc đặt cọc, thứ đã 'hợp nhất' với Mạng chính, mở đường cho việc phân mảnh để giúp mở rộng quy mô Ethereum hơn nữa.

<ButtonLink href="/roadmap/danksharding/">
  Chuỗi phân mảnh
</ButtonLink>

## Đọc thêm {#further-reading}

- [Tìm hiểu thêm về kiến trúc nút](/developers/docs/nodes-and-clients/node-architecture)
- [Tìm hiểu thêm về Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos)