---
title: Chuỗi Hải Đăng
description: Tìm hiểu thêm về chuỗi Beacon - Nâng cấp đã giới thiệu bằng chứng cổ phần trên Ethereum.
lang: vi
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: Chuỗi Beacon đã giới thiệu bằng chứng cổ phần trên hệ sinh thái Ethereum.
summaryPoint2: Nó được hợp nhất với cơ chế bằng chứng công việc gốc trên chuỗi Ethereum vào tháng 9 năm 2022.
summaryPoint3: Chuỗi Beacon đã giới thiệu Logic đồng thuận và giao thức lan truyền khối (block gossip protocol), hiện đang bảo mật cho Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Chuỗi Hải Đăng đã ra mắt vào ngày 1 tháng 12 năm 2020 và đã chính thức hóa bằng chứng cổ phần thành cơ chế đồng thuận của Ethereum với bản nâng cấp The Merge vào ngày 15 tháng 9 năm 2022.
</UpgradeStatus>

## Chuỗi Beacon là gì? {#what-is-the-beacon-chain}

Chuỗi Beacon là tên của chuỗi khối gốc cơ chế bằng chứng cổ phần được vận hành vào 2020. Nó được tạo ra với mục đích đảm bảo Logic cơ chế đồng thuận bằng chứng cổ phần hoạt động đúng và bền vững trước khi kích hoạt trên mạng chính Ethereum. Vì thế nó chạy sát cơ chế bằng chứng công việc ban đầu của Ethereum. Chuỗi Beacon là một chuỗi các khối “trống”, nhưng để tắt bằng chứng công việc và bật bằng chứng cổ phần trên Ethereum thì cần hướng dẫn Beacon Chain chấp nhận dữ liệu giao dịch từ các Client thực thi, gói chúng thành các khối và sau đó tổ chức chúng thành một chuỗi khối bằng cơ chế đồng thuận dựa trên bằng chứng cổ phần. Cùng thời điểm, Client gốc của Ethereum tắt việc đào của họ, đề xuất khối và logic đồng thuận, giao tất cả việc đó cho chuỗi Beacon. Sự kiện này được biết đến với tên gọi [The Merge](/roadmap/merge/). Một khi sự kiện hợp nhất xảy ra, không còn việc có hai chuỗi khối nữa. Thay vào đó, chhir có một bằng chứng cổ phần Ethereum và đang cần hai loại Client khác nhay để chạy mỗi nút. Chuỗi Beacon bây giờ là lớp đồng thuận, nơi các nút trong mạng ngang hàng trao đổi thông tin về khối và xử lý các quy tắc đồng thuận. Còn các Client cũ giờ là tầng thực thi, lo việc trao đổi thông tin và thực hiện giao dịch và quản lý dữ liệu trạng thái của Ethereum. Hai lớp này có thể trò chuyện với nhau bằng cách sử dụng Engine API.

## Chuỗi Hải Đăng có chức năng gì? {#what-does-the-beacon-chain-do}

Chuỗi Hải Đăng là tên được đặt cho một sổ cái các tài khoản đã tiến hành và điều phối mạng lưới [những người đặt cược](/staking/) Ethereum trước khi những người đặt cược đó bắt đầu xác thực các khối Ethereum thực. Nó không xử lí giao dịch hay đảm nhận tương tác hợp đồng thông minh vì những việc đó được thực hiện ở lớp thực thi.
Chuỗi Beacon có trách nhiệm cho việc như quản lý block và kiểm tra thực chứng, ra quyết định chọn chuỗi nào và xử lí phần thưởng và hình phạt.
Đọc thêm trên [trang kiến trúc nút](/developers/docs/nodes-and-clients/node-architecture/#node-comparison) của chúng tôi.

## Tác động của Chuỗi Hải Đăng {#beacon-chain-features}

### Giới thiệu về việc đặt cược {#introducing-staking}

Chuỗi Hải Đăng đã giới thiệu [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/) cho Ethereum. Điều này giữ Ethereum bảo mật và giúp nút xác thực nhận được ETH trong quá trình. Theo lý thuyết, Staking bao gồm đặt cược ETH để có thể kích hoạt phần mềm nút xác thực. Là một người Stake, bạn chạy phần mềm tạo và xác thực khối mới trên chuỗi.

Đặt cược phục vụ một mục đích tương tự như [khai thác](/developers/docs/consensus-mechanisms/pow/mining/) trước đây, nhưng khác biệt ở nhiều điểm. Việc đào đỏi hỏi chi phí lớn khi bắt đầu bởi chuẩn bị phần cứng mạnh mẽ và tiêu tốn nhiều điện năng, điều này dẫn đến lợi thế kinh tế theo quy mô và thúc đẩy tập trung hóa. Đòa cũng không cần phải đòi hỏi việc thế chấp tài khoản, giới hạn khả năng của giao thức trong việc phạt các hành động độc hại sau cuộc tấn công.

Việc thay đổi sang bằng chứng cổ phần giúp Ethereum bảo mật đáng kể và phi tập trung nếu so với bằng chứng công việc. Càng nhiều người tham gia mạng lưới, càng phi tập trung và an toàn khỏi cuộc tấn công.

<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Nếu bạn quan tâm đến việc trở thành người xác thực và giúp bảo mật Ethereum, [hãy tìm hiểu thêm về việc đặt cược](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Chuẩn bị cho sharding {#setting-up-for-sharding}

Kể từ khi chuỗi Beacon hợp nhất với mạng chính Ethereum, cộng đồng Ethereum bắt đầu tìm cách để mở rộng mạng lưới.

Bằng chứng cổ phần có lợi thế là sở hữu một danh sách các nhà sản xuất khối có thể phê duyệt tại mọi thời điểm, mỗi người đều đặt cược ETH. Danh sách này tạo nền tảng cho khả năng phân chia và xử lý các trách nhiệm mạng cụ thể một cách đáng tin cậy.

Trách nhiệm này trái ngược với bằng chứng công việc, nơi các thợ đào không có nghĩa vụ với mạng và có thể ngừng đào, tắt phần mềm nút của họ vĩnh viễn ngay lập tức mà không phải chịu hậu quả. Ngoài ra, không có danh sách các nhà đề xuất khối đã biết và cũng không có cách đáng tin cậy để phân chia trách nhiệm một cách an toàn trên mạng.

[Thêm về sharding](/roadmap/danksharding/)

## Mối quan hệ giữa các bản nâng cấp {#relationship-between-upgrades}

Các bản nâng cấp Ethereum đều có liên hệ với nhau. Vậy hãy cùng tóm lược lại sự ảnh hưởng của chuỗi Beacon đến các bản nâng cấp khác.

### Chuỗi Hải Đăng và The Merge {#merge-and-beacon-chain}

Đầu tiên, chuỗi Beacon tồn tại riêng biệt so với mạng Ethereum nhưng được hợp nhất vào 2022.

<ButtonLink href="/roadmap/merge/">
  The Merge
</ButtonLink>

### Các shard và Chuỗi Hải Đăng {#shards-and-beacon-chain}

Sharding chỉ có thể triển khai một cách an toàn trong hệ sinh thái Ethereum khi cơ chế đồng thuận bằng chứng cổ phần được áp dụng. Chuỗi Beacon giới thiệu Skating, được hợp nhất với mạng chính, giúp mở đường cho shardign và giúp mở rộng mạng lưới Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Các chuỗi phân đoạn
</ButtonLink>

## Đọc thêm

- [Thêm về kiến trúc nút](/developers/docs/nodes-and-clients/node-architecture)
- [Thêm về bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos)
