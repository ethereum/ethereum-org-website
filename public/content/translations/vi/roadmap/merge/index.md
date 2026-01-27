---
title: The Merge
description: Tìm hiểu thêm về sự kiện hợp nhất - Khi mạng chính Ethereum tiếp nhận bằng chứng cổ phần.
lang: vi
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: Mạng chính Ethereum sử dụng bằng chứng cổ phần, nhưng trước đây thì không như vậy.
summaryPoint2: Nâng cấp từ cơ chế bằng chứng công việc sang bằng chứng cổ phần được gọi à sự kiện hợp nhất.
summaryPoint3: Sự kiện hợp nhất là sự kiện mạng chính Ethereum bắt đầu hợp nhất với chuỗi bằng chứng cổ phần riêng gọi là chuỗi Beacon, bây giờ là một chuỗi thống nhất.
summaryPoint4: Sự kiện sự kiện hợp nhất giảm ~95,95% năng lượng tiêu thụ của Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Sự kiện hợp nhất được tiến hành vào ngày 15 tháng 9 năm 2022. Điều này chuyển Ethereum sang cơ chế bằng chứng cổ phần hoàn toàn, chính thức loại bỏ bằng chứng công việc và giảm ~99,5% năng lượng tiêu thụ.
</UpgradeStatus>

## Sự kiện hợp nhất là gì? {#what-is-the-merge}

The Merge là sự kết hợp của lớp thực thi ban đầu của Ethereum (Mạng chính đã tồn tại kể từ [khởi nguyên](/ethereum-forks/#frontier)) với lớp đồng thuận bằng chứng cổ phần mới của nó, Chuỗi Hải Đăng. Sự kiện này loại bỏ nhu cầu khai thác tiêu tốn năng lượng và thay vào đó cho phép mạng lưới được bảo mật bằng Stake ETH. Đây là một bước tiến đầy hứng khởi trong việc hiện thực hóa tầm nhìn của Ethereum — tăng tính mở rộng, an toàn và bền vững.

<MergeInfographic />

Ban đầu, [Chuỗi Hải Đăng](/roadmap/beacon-chain/) hoạt động riêng biệt với [Mạng chính](/glossary/#mainnet). Mạng chính Ethereum – với tất cả tài khoản, số dư, hợp đồng thông minh và trạng thái chuỗi khối – tiếp tục được bảo mật bằng [bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/), ngay cả khi Chuỗi Hải Đăng chạy song song và sử dụng [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/). Sự kiện hợp nhất là thời điểm hai hệ thống này cuối cùng hợp nhất lại, và bằng chứng công việc bị thay thế vĩnh viễn bởi bằng chứng cổ phần.

Tưởng tượng Ethereum như một con tàu vũ trụ được phóng đi trước khi nó thực sự sẵn sàng cho một chuyến du hành liên sao. Với chuỗi Beacon, cộng đồng đã xây dựng một động cơ mới và lớp vỏ cứng cáp hơn. Sau quá trình thử nghiệm kỹ lưỡng, đã đến lúc hoán đổi trực tiếp động cơ mới cho động cơ cũ ngay giữa lúc đang bay. Việc này đã hợp nhất động cơ mới, hiệu quả hơn vào con tàu hiện tại, giúp nó có thể bứt phá thêm nhiều năm ánh sáng và chinh phục vũ trụ.

## Hợp nhất với Mạng chính {#merging-with-mainnet}

Bằng chứng công việc đã bảo mật mạng chính Ethereum từ khối khởi nguyên tới sự kiện hợp nhất. Điều này cho phép chuỗi khối Ethereum mà chúng ta quen thuộc ra đời vào tháng 7 năm 2015 với tất cả tính năng đặc trưng như — giao dịch, hợp đồng thông minh, tài khoản,...

Trong suốt lịch sử của Ethereum, lập trình viên chauarn bị cho sự thay đổi từ bằng chứng công việc sang bằng chứng cổ phần. Vào ngày 1 tháng 12 năm 2020, chuỗi Beacon được tạo ra như chuỗi khối rời so với mạng chính, chạy song song.

Chuỗi Beacon không được sử lý các giao dịch trên mạng chính vào thời gian đầu. Thay vào đó, nó đạt đồng thuận về trạng thái riêng bằng cách thống nhất các nút xác thực đang hoạt động và số dư của tài khoản họ. Sau kiểm nghiệm, đã đến lúc chuỗi Beacon đạt đồng thuận trên dữ liệu thực tế. Sau sự kiện hợp nhất, chuỗi beacon trở thành động cơ đồng thuận cho toàn bộ dữ liệu mạng lưới, bao gồm giao dịch lớp xác thực và số dư tài khoản.

Sự kiện hợp nhất đại diện cho sự hoán đổi hính thức sử dụng chuỗi Beacon như một động cơ sản xuất khối. Việc đào đã không còn sinh ra khối nữa. Thay vào đó, nút xác thực bằng chứng công việc đảm nhận vai trò này và chịu trách nhiệm xử lí mọi giao dịch và đề xuất khối.

Không có dữ liệu lịch sử nào bị mất trong sự kiện hợp nhất. Khi mạng chính hợp nhất với chuỗi Beacon, nó cũng hợp nhất toàn bộ lịch sử giao dịch của Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Quá trình chuyển đổi sang bằng chứng cổ phần này đã thay đổi cách ether được phát hành. Tìm hiểu thêm về [việc phát hành ether trước và sau The Merge](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Người dùng và người nắm giữ {#users-holders}

**Sự kiện hợp nhất không thay đổi bất cứ gì cho người nắm giữ / người sử dụng.**

_Điều này cần được nhắc lại_: Là người dùng hoặc người nắm giữ ETH hay bất kỳ tài sản kỹ thuật số nào khác trên Ethereum, cũng như những người đặt cược không vận hành nút, **bạn không cần phải làm bất cứ điều gì với tiền hoặc ví của mình để chuẩn bị cho The Merge.** ETH vẫn là ETH. Không có khái niệm "ETH cũ / ETH mới" hay "ETH1 / ETH2" và ví vẫn hoạt động như cũ sau sự kiện hợp nhất — ai đó nói khác đi thì họ có thể là lừa đảo.

Mặc dù chuyển khỏi cơ chế bằng chứng công việc, taonf bộ lịch sử từ khởi nguyên của Ethereum vẫn còn đó không bị ảnh hưởng bởi việc chuyển sang bằng chứng cổ phần. Bất kỳ tài sản nào được giữ trong ví của bạn trước sự kiện hợp nhất vẫn có thể truy cập sau sự kiện hợp nhất. **Không đòi hỏi bất kì hành động nào để nâng cấp từ bạn.**

[Thông tin thêm về bảo mật Ethereum](/security/#eth2-token-scam)

### Nhà vận hành nút và nhà phát triển dapp {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Các hành động quan trọng gồm:

1. Chạy _cả_hai_Client_ một Client đồng thuận và một Client thực thi; các điểm kết thúc của bên thứ ba để lấy dữ liệu thực thi không còn nữa từ sự kiện hợp nhất.
2. Xác thực cả Client thực thi và Client đồng thuận bằng khóa JWT mật chung để chúng có thể giao tiếp an toàn với nhau.
3. Thiết lập một địa chỉ `nhận phí` để nhận phí ưu tiên từ giao dịch/MEV mà bạn kiếm được.

Nếu không hoàn thành hai mục đầu tiên ở trên, nút của bạn sẽ bị xem là “ngoại tuyến” cho đến khi cả hai lớp được đồng bộ và xác thực.

Nếu không thiết lập `nhận phí`, nút xác thực của bạn vẫn hoạt động bình thường, nhưng bạn sẽ bỏ lỡ phần phí ưu tiên chưa bị đốt và bất kỳ MEV nào mà nút xác thực của bạn có thể kiếm được từ các khối mà nó đề xuất. </ExpandableCard>

<ExpandableCard
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Trước sự kiện hợp nhất, chỉ cần một Client thực thi (như Geth, Erigon, Besu hoặc Nethermind) là đủ để nhận, xác thực và phát tán các khối được truyền đi trong mạng. Sau sự kiện hợp nhất, tính hợp lệ của các giao dịch trong tải trọng thực thi giờ đây cũng phụ thuộc vào tính hợp lệ của “khối đồng thuận” chứa nó.

Do đó, một nút Ethereum đầy đủ hiện nay cần có cả Client thực thi và Client đồng thuận. Hai Client này hoạt động cùng nhau sử dụng Engine API mới. Engine API này cần xác thực bằng mã JWT mật, mã này được cung cấp cho cả hai Client cho phép truyền thông tin một cách bảo mật.

Các hành động quan trọng gồm:

- Cài đặt một máy khách đồng thuận cùng với một máy khách thực thi
- Xác thực các máy khách thực thi và đồng thuận bằng một mã bí mật JWT được chia sẻ để chúng có thể giao tiếp an toàn với nhau.

Nếu không hoàn thành các mục trên, nút của bạn sẽ bị hiển thị là “ngoại tuyến” cho đến khi cả hai lớp được đồng bộ và xác thực.

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

Sự kiện hợp nhất thay đổi cơ chế đồng thuận, cũng đồng nghĩa với thay đổi như:

<ul>
  <li>kiến trúc khối</li>
  <li>slot/thời gian khối</li>
  <li>mã lệnh (opcode) thay đổi</li>
  <li>các nguồn ngẫu nhiên trên chuỗi</li>
  <li>định nghĩa <em>đầu chuỗi an toàn(Safe Head)</em> và <em>khối được chốt (Finalized Block)</em></li>
</ul>

Đây là một số thông tin thêm, hãy xem thêm bài viết của Tim Beiko về <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">Các mà sự kiện hợp nhất tác động lên lớp ứng dụng của Ethereum</a>.

</ExpandableCard>

## The Merge và mức tiêu thụ năng lượng {#merge-and-energy}

Sự kiện hợp nhất đánh dấu sự kết thúc của bằng chứng công việc đối với Ethereum và mở ra kỷ nguyên của một Ethereum bền vững hơn, thân thiện với môi trường hơn. Năng lượng tiêu thụ của Ethereum giảm ước lượng là khoảng ~95,95%, làm cho chuỗi khối Ethereum là thân thiện môi trường. Tìm hiểu thêm về [mức tiêu thụ năng lượng của Ethereum](/energy-consumption/).

## The Merge và khả năng mở rộng {#merge-and-scaling}

The Merge cũng tạo tiền đề cho các nâng cấp về khả năng mở rộng hơn nữa vốn không thể thực hiện được dưới bằng chứng công việc, đưa Ethereum tiến một bước gần hơn đến việc đạt được quy mô, tính bảo mật và tính bền vững đầy đủ mà [lộ trình của nó](/roadmap/) đang hướng tới.

## Những quan niệm sai lầm về The Merge {#misconceptions}

<ExpandableCard
title="Quan niệm sai lầm: &quot;Chạy một nút yêu cầu đặt cược 32 ETH.&quot;"
contentPreview="Sai. Bất kỳ ai cũng có thể tự do đồng bộ hóa bản sao Ethereum đã tự xác minh của riêng họ (tức là chạy một nút). Không cần ETH—dù là trước The Merge, sau The Merge, hay bất cứ lúc nào.">

Có hai loại nút Ethereum: nút có thể đề xuất khối và nút không thể.

Nút có thể đề xuất khối là một con số nhỏ trong tổng số nút trên Ethereum. Nhóm này bao gồm các nút khai thác (mining nodes) trong bằng chứng công việc và các nút xác thực (Validator nodes) trong bằng chứng cổ phần. Nhóm này yêu cầu cam kết kinh tế (như sức mạnh tính toán đồ họa trong bằng chứng công việc hoặc đặt cọc ETH trong bằng chứng cổ phần) để đổi lại khả năng thi thoảng được chọn để đề xuất khối tiếp theo và nhận phần thưởng từ giao thức.

Các nút khác trên mạng (tức là phần lớn) không bắt buộc phải cam kết bất kỳ nguồn lực kinh tế nào ngoài một máy tính cấp tiêu dùng có dung lượng lưu trữ khả dụng 1-2 TB và kết nối internet. Các nút này không đề xuất khối, nhưng vẫn đóng vai trò then chốt trong việc bảo mật mạng lưới bằng cách giám sát tất cả những người đề xuất khối bằng cách theo dõi các khối mới và xác minh tính hợp lệ của chúng ngay khi xuất hiện theo quy tắc đồng thuận của mạng. Nếu một khối hợp lệ, nút sẽ tiếp tục phát tán nó trên mạng lưới. Nếu khối không hợp lệ vì bất kì lý do, phần mềm trên nút sẽ loại bỏ nó là ngừng phát tán.

Việc vận hành một nút không đề xuất là khả thi cho mọi người thực hiện dù cho là theo cơ chế đồng thuận nào (đồng thuận công việc hay đồng thuận cổ phần); điều này <em>rất khuyến nghị</em> cho mọi người dùng nếu họ có nguồn lực. Vận hành nốt đóng góp giá trị to lớn với Ethereum và mang lại lợi ích cho cá nhân vận hành, chẳng hạng như tăng cường bảo mật, riêng tư và chống kiểm duyệt.

Khả năng để bất kì ai chạy node của họ là <em>thực sự cần thiết</em> để duy trì tính tập trung mạng Ethereum.

[Thông tin thêm về việc chạy nút của riêng bạn](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Quan niệm sai lầm: &quot;The Merge đã không làm giảm phí gas.&quot;"
contentPreview="Sai. The Merge là một sự thay đổi về cơ chế đồng thuận, không phải là một sự mở rộng về dung lượng mạng, và chưa bao giờ có mục đích làm giảm phí gas.">

Phí Gas là kết quả của nhu cầu mạng so với năng lực xử lý của mạng. The Mere đã loại bỏ sử dụng bằng chứng công việc, chuyển sang cơ chế đồng thuận bằng chứng cổ phần nhưng không làm thay đổi đáng kể tới bất kì tham số nào ảnh hưởng đến năng lực hoặc thông lượng mạng lưới.

Với <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">lộ trình tập trung vào rollup</a>, các nỗ lực đang được tập trung vào việc mở rộng hoạt động của người dùng ở [lớp 2](/layer-2/), đồng thời cho phép Mạng chính lớp 1 hoạt động như một lớp thanh toán phi tập trung an toàn được tối ưu hóa để lưu trữ dữ liệu rollup nhằm giúp các giao dịch rollup rẻ hơn theo cấp số nhân. Sự chuyển đổi sang cơ chế bằng chứng cổ phần là một bước tiền đề quan trọng để thực hiện hóa điều này. [Thông tin thêm về gas và phí.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Quan niệm sai lầm: &quot;Các giao dịch đã được tăng tốc đáng kể nhờ The Merge.&quot;"
contentPreview="Sai. Mặc dù có một vài thay đổi nhỏ, tốc độ giao dịch trên lớp 1 hiện tại hầu như giống như trước The Merge.">
"Tốc độ" của một giao dịch có thể được đo bằng một vài cách, bao gồm thời gian để được đưa vào một khối và thời gian để hoàn tất. Hai yếu tố đều thay đổi một chút, tuy nhiên không thể thấy rõ khi sử dụng.

Trước đây, trên bằng chứng công việc, mục tiêu là có một khối mới khoảng mỗi 13,3 giây. Dưới bằng chứng cổ phần, Slot diễn ra chính xác 12 giây, và mỗi slot là cơ hội để nút xác thực công bố một khối. Hầu hết các slot đều có các khối, nhưng không nhất thiết là tất cả (tức là một trình xác thực đang ngoại tuyến). Trong bằng chứng cổ phần, khối được sản sinh thường xuyên hơn ~10% so với bằng chứng công việc. Đây là một thay đổi khá nhỏ và người dùng hầu như không thấy khác biệt.

Bằng chứng cổ phần giới thiệu khái niệm chốt giao dịch (Transaction Finality) mà trước đây không tồn tại. Trong bằng chứng công việc khả năng đảo ngược khối trở nên khó khăn theo cấp số nhân mỗi khối mới được chồng lên giao dịch, nhưng nó không bao giờ đạt mức bằng không. Trong bằng chứng cổ phần, khối được nhóm lại thành chu kỳ (Epoch - dài khoản 6,4 phút và chứa 32 cơ hội cho khối) mà nút xác thực sẽ bỏ phiếu. Nếu một chu kỳ kết thúc, nút xác thực sẽ bầu chọn cân nhắc chu kì nào được xem là hợp lệ bước đầu. Nếu nút xác thực đồng ý hợp lệ một chu kỳ, nó sẽ được chốt ở chu kỳ tiếp theo. Việc đảo ngược các giao dịch đã chốt là bất khả thi về mặt kinh tế vì sẽ cần phải chiếm được và đốt hơn một phần ba tổng số ETH đã Stake.

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Ban đầu sau sự kiện hợp nhất, những người Stake chỉ có thể nhận được phí hoa hồng và MEV mà họ kiếm được từ việc đề xuất khối. Các phần thưởng này được gửi vào một tài khoản không có tính chất staking do validator kiểm soát (được gọi là <em>người nhận phí</em>), và có sẵn ngay lập tức. Các phần thường này tách biệt với thưởng giao thức từ việc thực hiện nghĩa vụ nút xác thực.

Kể từ bản nâng cấp mạng Shanghai/Capella, người Stake có thể chỉ định một <em>địa chỉ rút tiền</em> để bắt đầu nhận các khoản thanh toán tự động cho phần dư của số dư Staking (ETH vượt quá 32 ETH từ phần thưởng giao thức). Bản nâng cấp này cũng cho phép một nút xác thực mở khóa và rút toàn bộ số dư của mình khi thoát khỏi mạng lưới.

[Thông tin thêm về việc rút tiền đặt cược](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Quan niệm sai lầm: &quot;Giờ đây The Merge đã hoàn tất và việc rút tiền đã được kích hoạt, tất cả những người đặt cược có thể thoát ra cùng một lúc.&quot;"
contentPreview="Sai. Việc thoát của trình xác thực bị giới hạn tốc độ vì lý do bảo mật.">
Kể từ khi bản nâng cấp Shanghai/Capella cho phép rút tiền, các trình xác thực được khuyến khích rút số dư đặt cược của họ trên 32 ETH, vì các khoản tiền này không làm tăng lợi nhuận và nếu không sẽ bị khóa. Tùy theo lãi hằng năm (được xác định bởi tổng lượng ETH Stake), họ có thể được khuyến khích thoát khỏi vận hành nút để rút toàn bộ số dư, hoặc ngược lại, có thể Stake thêm bằng phần thưởng nhận được để kiếm thêm lợi nhuận.

Lưu ý quan trọng ở đây là việc thoát vận hành nút hoàn toàn bị giới hạn tốc độ bởi giao thức, và chỉ có một số lượng nhất định nút xác thực có thể thoát trong mỗi chu kỳ (khoảng 6,4 phút). Giới hạn này biến đổi tùy theo số lượng nút xác thực đang hoạt động, nhưng trung bình khoảng 0,33% tổng số tất cả ETH đã Stake trên mạng lưới có thể thoát mạng trong một ngày.

Đều này ngăn chặn việc rút Stake hàng loạt. Hơn nữa, cơ chế này ngăn chặn một kẻ tấn công tiềm năng (có thể đang kiểm soát một phần lớn tổng ETH Stake trên toàn bộ mạng) khỏi thực hiện hành vi vi phạm có thể bị cắt quỹ (Slashing) rồi thoát ra/rút toàn bộ số dư của các nút xác thực vi phạm đó trong cùng một chu kỳ, trước khi giao thức kịp áp dụng hình phạt cắt quỹ.

Lợi nhuận hằng năm cũng biến đổi có mục đích, cho phép thị trường vận hành nút xác thực cân bằng giữa việc họ sẽ chịu chi trả bao nhiêu để giúp bảo mật mạng lưới. Nếu như tỉ lệ này quá thấp thì nút xác thực sẽ thoát ra tuân theo tỉ lệ của giao thức. Dần dần điều này sẽ tăng lợi nhuận hằng năm cho những gnuoiwf ở lại, thu hút người mới hoặc người đã Stake trước đó. </ExpandableCard>

## Chuyện gì đã xảy ra với 'Eth2'? {#eth2}

Thuật ngữ 'ETH2' đã bị phản đối. Sau khi gộp 'Eth1' và 'Eth2' thành một chuỗi duy nhất, không còn cần thiết phải phân biệt giữa hai mạng Ethereum; chỉ còn lại Ethereum.

Để hạn chế nhầm lẫn, cộng đồng đã cập nhật các thuật ngữ sau:

- 'Eth1' hiện là 'lớp thực thi', xử lý các giao dịch và thực thi giao dịch.
- 'Eth2' hiện là 'lớp đồng thuận', xử lý sự đồng thuận bằng chứng cổ phần.

Những thuật ngữ mới này chỉ thay đổi quy ước đặt tên; nó không làm thay đổi mục tiêu hoặc lộ trình của Ethereum.

[Tìm hiểu thêm về việc đổi tên 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Mối quan hệ giữa các bản nâng cấp {#relationship-between-upgrades}

Các bản nâng cấp Ethereum đều có liên hệ với nhau. Vậy cùng nhau tóm lượng về những nâng cấp liên hệ như thế nào với sự kiện hợp nhất.

### The Merge và Chuỗi Hải Đăng {#merge-and-beacon-chain}

Sự kiện hợp nhất đánh dấu việc chính thức đưa chuỗi Beacon trở thành lớp đồng thuận mới cho lớp thực thi chính gốc. Kể từ The Merge, các trình xác thực được giao nhiệm vụ bảo mật Mạng chính Ethereum, và việc khai thác bằng [bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/) không còn là một phương tiện hợp lệ để tạo khối.

Thay vào đó khối được đề xuất bởi các nút xác thực đã Stake ETH để đổi lấy quyền tham gia đồng thuận. Những nâng cấp này tạo tiền đề cho các cải tiến mở rộng trong tương lai, bao gồm cả phân đoạn (Sharding).

<ButtonLink href="/roadmap/beacon-chain/">
  Chuỗi Hải Đăng
</ButtonLink>

### The Merge và bản nâng cấp Shanghai {#merge-and-shanghai}

Để có thể tối giản và tối đa sự tập trung cho chuyển mình sang bằng chứng cổ phần, sự kiện hợp nhất không có các tính năng kỳ vọng như khả năng rút ETH đã Stake. Chức năng này chỉ được thêm vào bằng nâng cấp Shanghai/Capella riêng.

Đối với những người tò mò, hãy tìm hiểu thêm về [What Happens After The Merge](https://youtu.be/7ggwLccuN5s?t=101), được trình bày bởi Vitalik tại sự kiện ETHGlobal tháng 4 năm 2021.

### The Merge và sharding {#merge-and-data-sharding}

Bạn đầu, kế hoạch là sẽ tập trung vào phân đoạn (Sharding) trước sự kiện hợp nhất để giúp mở rộng. Tuy nhiên, với sự bùng nổ của các [giải pháp mở rộng quy mô lớp 2](/layer-2/), ưu tiên đã chuyển sang việc hoán đổi bằng chứng công việc sang bằng chứng cổ phần trước.

Kế hoạch cho phân đoạn đang tiến triển nahnh, nhưng do sự thành công của công nghệ lớp 2 để mở rộng xử lí giao dịch, kế hoạch phân đoạn đã chuyển sang tìm giải pháp tốt nhất để có thể dữ trữ dữ liệu từ hợp đồng Rollups (Calldata), cho phép sự tăng trưởng tăng vọt của sức chứa mạng lưới. Đều này sẽ bất khả thi nếu không chuyển sang cơ chế bằng chứng cổ phần trước.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Đọc thêm {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
