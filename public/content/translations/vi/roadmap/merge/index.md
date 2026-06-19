---
title: The Merge
description: Tìm hiểu về The Merge - khi Mạng chính Ethereum áp dụng bằng chứng cổ phần (PoS).
lang: vi
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - "Mạng chính Ethereum sử dụng bằng chứng cổ phần (PoS), nhưng không phải lúc nào cũng như vậy."
  - "Bản nâng cấp từ cơ chế bằng chứng công việc (PoW) ban đầu sang bằng chứng cổ phần (PoS) được gọi là The Merge."
  - "The Merge đề cập đến việc Mạng chính Ethereum ban đầu hợp nhất với một Chuỗi khối bằng chứng cổ phần riêng biệt được gọi là Chuỗi Beacon, hiện tồn tại dưới dạng một Chuỗi duy nhất."
  - "The Merge đã giảm mức tiêu thụ năng lượng của Ethereum xuống khoảng 99,95%."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  The Merge đã được thực thi vào ngày 15 tháng 9 năm 2022. Điều này đã hoàn tất quá trình chuyển đổi của Ethereum sang đồng thuận bằng chứng cổ phần (PoS), chính thức loại bỏ bằng chứng công việc (PoW) và giảm mức tiêu thụ năng lượng xuống khoảng 99,95%.
</UpgradeStatus>

## The Merge là gì? {#what-is-the-merge}

The Merge là sự kết hợp giữa lớp thực thi ban đầu của Ethereum (Mạng chính đã tồn tại kể từ [khối nguyên thủy](/ethereum-forks/#frontier)) với lớp đồng thuận bằng chứng cổ phần (PoS) mới của nó, Chuỗi Beacon. Nó đã loại bỏ nhu cầu khai thác tiêu tốn nhiều năng lượng và thay vào đó cho phép mạng lưới được bảo mật bằng cách sử dụng ETH đã đặt cọc. Đây là một bước tiến thực sự thú vị trong việc hiện thực hóa tầm nhìn của [Ethereum](/)—khả năng mở rộng, bảo mật và tính bền vững cao hơn.

<MergeInfographic />

Ban đầu, [Chuỗi Beacon](/roadmap/beacon-chain/) được phát hành tách biệt với [Mạng chính](/glossary/#mainnet). Mạng chính Ethereum - với tất cả các Tài khoản, số dư, hợp đồng thông minh và trạng thái Chuỗi khối - tiếp tục được bảo mật bằng [bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/), ngay cả khi Chuỗi Beacon chạy song song bằng cách sử dụng [bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/). The Merge là thời điểm hai hệ thống này cuối cùng kết hợp với nhau và bằng chứng công việc (PoW) đã được thay thế vĩnh viễn bằng bằng chứng cổ phần (PoS).

Hãy tưởng tượng Ethereum là một con tàu vũ trụ đã được phóng trước khi nó hoàn toàn sẵn sàng cho một chuyến du hành giữa các vì sao. Với Chuỗi Beacon, cộng đồng đã chế tạo một động cơ mới và một lớp vỏ cứng cáp hơn. Sau quá trình thử nghiệm kỹ lưỡng, đã đến lúc hoán đổi nóng động cơ mới cho động cơ cũ ngay giữa chuyến bay. Điều này đã hợp nhất động cơ mới, hiệu quả hơn vào con tàu hiện tại, cho phép nó di chuyển thêm nhiều năm ánh sáng và chinh phục vũ trụ.

## Hợp nhất với Mạng chính {#merging-with-mainnet}

Bằng chứng công việc (PoW) đã bảo mật Mạng chính Ethereum từ khối nguyên thủy cho đến The Merge. Điều này cho phép Chuỗi khối Ethereum mà tất cả chúng ta đều quen thuộc ra đời vào tháng 7 năm 2015 với tất cả các tính năng quen thuộc của nó—giao dịch, hợp đồng thông minh, Tài khoản, v.v.

Trong suốt lịch sử của Ethereum, các nhà phát triển đã chuẩn bị cho quá trình chuyển đổi cuối cùng từ bằng chứng công việc (PoW) sang bằng chứng cổ phần (PoS). Vào ngày 1 tháng 12 năm 2020, Chuỗi Beacon đã được tạo ra như một Chuỗi khối riêng biệt với Mạng chính, chạy song song.

Chuỗi Beacon ban đầu không xử lý các giao dịch trên Mạng chính. Thay vào đó, nó đạt được sự đồng thuận về trạng thái của chính nó bằng cách thống nhất về các trình xác thực đang hoạt động và số dư Tài khoản của họ. Sau quá trình thử nghiệm rộng rãi, đã đến lúc Chuỗi Beacon đạt được sự đồng thuận về dữ liệu trong thế giới thực. Sau The Merge, Chuỗi Beacon đã trở thành công cụ đồng thuận cho tất cả dữ liệu mạng lưới, bao gồm các giao dịch ở lớp thực thi và số dư Tài khoản.

The Merge đại diện cho sự chuyển đổi chính thức sang việc sử dụng Chuỗi Beacon làm công cụ sản xuất khối. Việc khai thác không còn là phương tiện để tạo ra các khối hợp lệ nữa. Thay vào đó, các trình xác thực bằng chứng cổ phần (PoS) đã đảm nhận vai trò này và hiện chịu trách nhiệm xử lý tính hợp lệ của tất cả các giao dịch và đề xuất các khối.

Không có lịch sử nào bị mất trong The Merge. Khi Mạng chính hợp nhất với Chuỗi Beacon, nó cũng hợp nhất toàn bộ lịch sử giao dịch của Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Sự chuyển đổi sang bằng chứng cổ phần (PoS) này đã thay đổi cách ether được phát hành. Tìm hiểu thêm về [việc phát hành ether trước và sau The Merge](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Người dùng và người nắm giữ {#users-holders}

**The Merge không thay đổi bất cứ điều gì đối với người nắm giữ/người dùng.**

_Điều này cần được nhắc lại_: Là người dùng hoặc người nắm giữ ETH hoặc bất kỳ tài sản kỹ thuật số nào khác trên Ethereum, cũng như những người đặt cọc không vận hành nút, **bạn không cần phải làm bất cứ điều gì với tiền hoặc Ví của mình để chuẩn bị cho The Merge.** ETH chỉ là ETH. Không có cái gọi là "ETH cũ"/"ETH mới" hay "Eth1"/"Eth2" và các Ví hoạt động hoàn toàn giống nhau sau The Merge như trước đây—những người nói với bạn điều ngược lại rất có thể là những kẻ lừa đảo.

Mặc dù đã loại bỏ bằng chứng công việc (PoW), toàn bộ lịch sử của Ethereum kể từ khối nguyên thủy vẫn còn nguyên vẹn và không bị thay đổi bởi quá trình chuyển đổi sang bằng chứng cổ phần (PoS). Bất kỳ khoản tiền nào được giữ trong Ví của bạn trước The Merge vẫn có thể truy cập được sau The Merge. **Bạn không cần thực hiện bất kỳ hành động nào để nâng cấp.**

[Tìm hiểu thêm về bảo mật Ethereum](/security/#eth2-token-scam)

### Người vận hành nút và nhà phát triển dapp {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Các hành động chính cần thực hiện bao gồm:

1. Chạy _cả_ ứng dụng khách đồng thuận và máy khách thực thi; các điểm cuối của bên thứ ba để lấy dữ liệu thực thi không còn hoạt động kể từ The Merge.
2. Xác thực cả máy khách thực thi và ứng dụng khách đồng thuận bằng một bí mật JWT dùng chung để chúng có thể giao tiếp an toàn.
3. Thiết lập một Địa chỉ `fee recipient` để nhận tiền boa phí giao dịch/MEV mà bạn kiếm được.

Việc không hoàn thành hai mục đầu tiên ở trên sẽ dẫn đến việc nút của bạn bị coi là "ngoại tuyến" cho đến khi cả hai lớp được đồng bộ hóa và xác thực.

Việc không thiết lập `fee recipient` vẫn sẽ cho phép trình xác thực của bạn hoạt động như bình thường, nhưng bạn sẽ bỏ lỡ các khoản tiền boa phí chưa bị đốt và bất kỳ MEV nào mà bạn có thể kiếm được trong các khối mà trình xác thực của bạn đề xuất.
</ExpandableCard>

<ExpandableCard
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Cho đến The Merge, một máy khách thực thi (chẳng hạn như Go Ethereum (Geth), Erigon, Besu hoặc Nethermind) là đủ để nhận, xác thực đúng cách và truyền bá các khối đang được mạng lưới lan truyền. _Sau The Merge_, tính hợp lệ của các giao dịch có trong một tải trọng thực thi hiện cũng phụ thuộc vào tính hợp lệ của "khối đồng thuận" chứa nó.

Do đó, một nút Ethereum đầy đủ hiện yêu cầu cả máy khách thực thi và ứng dụng khách đồng thuận. Hai máy khách này hoạt động cùng nhau bằng cách sử dụng một Engine API mới. Engine API yêu cầu xác thực bằng bí mật JWT, được cung cấp cho cả hai máy khách để cho phép giao tiếp an toàn.

Các hành động chính cần thực hiện bao gồm:

- Cài đặt một ứng dụng khách đồng thuận bên cạnh một máy khách thực thi
- Xác thực máy khách thực thi và ứng dụng khách đồng thuận bằng một bí mật JWT dùng chung để chúng có thể giao tiếp an toàn với nhau.

Việc không hoàn thành các mục trên sẽ dẫn đến việc nút của bạn có vẻ như "ngoại tuyến" cho đến khi cả hai lớp được đồng bộ hóa và xác thực.

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

The Merge đi kèm với những thay đổi về đồng thuận, bao gồm cả những thay đổi liên quan đến:

<ul>
  <li>cấu trúc khối</li>
  <li>thời gian khe/khối</li>
  <li>thay đổi mã lệnh</li>
  <li>các nguồn tính ngẫu nhiên trên chuỗi</li>
  <li>khái niệm về <em>safe head</em> và <em>các khối đã chung cuộc</em></li>
</ul>

Để biết thêm thông tin, hãy xem bài đăng trên blog này của Tim Beiko về <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">Cách The Merge tác động đến Lớp ứng dụng của Ethereum</a>.

</ExpandableCard>

## The Merge và mức tiêu thụ năng lượng {#merge-and-energy}

The Merge đánh dấu sự kết thúc của bằng chứng công việc (PoW) đối với Ethereum và bắt đầu kỷ nguyên của một Ethereum bền vững hơn, thân thiện với môi trường hơn. Mức tiêu thụ năng lượng của Ethereum đã giảm ước tính khoảng 99,95%, biến Ethereum thành một Chuỗi khối xanh. Tìm hiểu thêm về [mức tiêu thụ năng lượng của Ethereum](/energy-consumption/).

## The Merge và việc mở rộng quy mô {#merge-and-scaling}

The Merge cũng tạo tiền đề cho các bản nâng cấp khả năng mở rộng tiếp theo mà không thể thực hiện được theo bằng chứng công việc (PoW), đưa Ethereum tiến gần hơn một bước tới việc đạt được quy mô, bảo mật và tính bền vững toàn diện mà [lộ trình của nó](/roadmap/) đang hướng tới.

## Những quan niệm sai lầm về The Merge {#misconceptions}

<ExpandableCard
title="Misconception: &quot;Running a node requires staking 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e., run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Có hai loại nút Ethereum: các nút có thể đề xuất khối và các nút không thể.

Các nút đề xuất khối chỉ chiếm một số lượng nhỏ trong tổng số các nút trên Ethereum. Danh mục này bao gồm các nút khai thác theo bằng chứng công việc (PoW) và các nút trình xác thực theo bằng chứng cổ phần (PoS). Danh mục này yêu cầu cam kết các nguồn lực kinh tế (chẳng hạn như sức mạnh Mã băm của GPU trong bằng chứng công việc (PoW) hoặc ETH đã đặt cọc trong bằng chứng cổ phần (PoS)) để đổi lấy khả năng thỉnh thoảng đề xuất khối tiếp theo và kiếm được phần thưởng Giao thức.

Các nút khác trên mạng lưới (tức là phần lớn) không bắt buộc phải cam kết bất kỳ nguồn lực kinh tế nào ngoài một máy tính cấp độ người tiêu dùng với 1-2 TB dung lượng lưu trữ khả dụng và kết nối internet. Các nút này không đề xuất khối, nhưng chúng vẫn đóng vai trò quan trọng trong việc bảo mật mạng lưới bằng cách buộc tất cả những người đề xuất khối phải chịu trách nhiệm thông qua việc lắng nghe các khối mới và xác minh tính hợp lệ của chúng khi đến theo các quy tắc đồng thuận của mạng lưới. Nếu khối hợp lệ, nút sẽ tiếp tục truyền bá nó qua mạng lưới. Nếu khối không hợp lệ vì bất kỳ lý do gì, phần mềm nút sẽ coi nó là không hợp lệ và ngừng truyền bá nó.

Bất kỳ ai cũng có thể chạy một nút không sản xuất khối theo một trong hai cơ chế đồng thuận (bằng chứng công việc (PoW) hoặc bằng chứng cổ phần (PoS)); điều này được <em>khuyến khích mạnh mẽ</em> đối với tất cả người dùng nếu họ có đủ phương tiện. Việc chạy một nút có giá trị to lớn đối với Ethereum và mang lại những lợi ích bổ sung cho bất kỳ cá nhân nào chạy nó, chẳng hạn như cải thiện bảo mật, quyền riêng tư và khả năng chống kiểm duyệt.

Khả năng bất kỳ ai cũng có thể chạy nút của riêng họ là <em>hoàn toàn cần thiết</em> để duy trì sự phi tập trung của mạng lưới Ethereum.

[Tìm hiểu thêm về việc chạy nút của riêng bạn](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge failed to reduced gas fees.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Phí Gas là sản phẩm của nhu cầu mạng lưới so với công suất của mạng lưới. The Merge đã loại bỏ việc sử dụng bằng chứng công việc (PoW), chuyển sang bằng chứng cổ phần (PoS) để đồng thuận, nhưng không thay đổi đáng kể bất kỳ thông số nào ảnh hưởng trực tiếp đến công suất hoặc thông lượng của mạng lưới.

Với một <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">lộ trình tập trung vào Rollup</a>, các nỗ lực đang được tập trung vào việc mở rộng quy mô hoạt động của người dùng ở [lớp 2 (l2)](/layer-2/), đồng thời cho phép Mạng chính lớp 1 (l1) hoạt động như một lớp quyết toán phi tập trung an toàn được tối ưu hóa cho việc lưu trữ dữ liệu Rollup để giúp các giao dịch Rollup rẻ hơn theo cấp số nhân. Việc chuyển đổi sang bằng chứng cổ phần (PoS) là một tiền đề quan trọng để hiện thực hóa điều này. [Tìm hiểu thêm về Gas và phí.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Transactions were accelerated substantially by The Merge.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
"Tốc độ" của một giao dịch có thể được đo lường theo một số cách, bao gồm thời gian để được đưa vào một khối và thời gian để đạt tính chung cuộc. Cả hai điều này đều thay đổi một chút, nhưng không theo cách mà người dùng sẽ nhận thấy.

Về mặt lịch sử, trên bằng chứng công việc (PoW), mục tiêu là có một khối mới sau mỗi ~13,3 giây. Theo bằng chứng cổ phần (PoS), các khe xảy ra chính xác sau mỗi 12 giây, mỗi khe là một cơ hội để một trình xác thực xuất bản một khối. Hầu hết các khe đều có khối, nhưng không nhất thiết là tất cả (ví dụ: một trình xác thực đang ngoại tuyến). Trong bằng chứng cổ phần (PoS), các khối được tạo ra thường xuyên hơn ~10% so với trên bằng chứng công việc (PoW). Đây là một thay đổi khá không đáng kể và người dùng khó có thể nhận thấy.

Bằng chứng cổ phần (PoS) đã giới thiệu khái niệm tính chung cuộc của giao dịch mà trước đây không tồn tại. Trong bằng chứng công việc (PoW), khả năng đảo ngược một khối trở nên khó khăn hơn theo cấp số nhân với mỗi khối trôi qua được khai thác trên một giao dịch, nhưng nó không bao giờ hoàn toàn đạt đến mức không. Theo bằng chứng cổ phần (PoS), các khối được gộp thành các Kỷ nguyên (khoảng thời gian 6,4 phút chứa 32 cơ hội cho các khối) mà các trình xác thực bỏ phiếu. Khi một Kỷ nguyên kết thúc, các trình xác thực bỏ phiếu về việc có coi Kỷ nguyên đó là 'đã được chứng minh hợp lệ' hay không. Nếu các trình xác thực đồng ý chứng minh Kỷ nguyên đó hợp lệ, nó sẽ được chung cuộc trong Kỷ nguyên tiếp theo. Việc hoàn tác các giao dịch đã chung cuộc là không khả thi về mặt kinh tế vì nó sẽ yêu cầu thu thập và đốt hơn một phần ba tổng số ETH đã đặt cọc.

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Ban đầu sau The Merge, những người đặt cọc chỉ có thể truy cập tiền boa phí và MEV kiếm được nhờ các đề xuất khối. Những phần thưởng này được ghi có vào một Tài khoản không đặt cọc do trình xác thực kiểm soát (được gọi là <em>người nhận phí</em>) và có sẵn ngay lập tức. Những phần thưởng này tách biệt với phần thưởng Giao thức cho việc thực hiện các nhiệm vụ của trình xác thực.

Kể từ bản nâng cấp mạng lưới Thượng Hải/Capella, những người đặt cọc hiện có thể chỉ định một <em>Địa chỉ rút tiền</em> để bắt đầu nhận các khoản thanh toán tự động cho bất kỳ số dư đặt cọc vượt mức nào (ETH trên 32 từ phần thưởng Giao thức). Bản nâng cấp này cũng cho phép trình xác thực mở khóa và lấy lại toàn bộ số dư của mình khi thoát khỏi mạng lưới.

[Tìm hiểu thêm về việc rút tiền đặt cọc](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Now that The Merge is complete, and withdrawals are enabled, stakers could all exit at once.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Kể từ khi bản nâng cấp Thượng Hải/Capella cho phép rút tiền, các trình xác thực được khuyến khích rút số dư đặt cọc của họ trên 32 ETH, vì những khoản tiền này không làm tăng thêm lợi suất và nếu không sẽ bị khóa. Tùy thuộc vào APR (được xác định bởi tổng số ETH đã đặt cọc), họ có thể được khuyến khích thoát trình xác thực của mình để lấy lại toàn bộ số dư hoặc có khả năng đặt cọc nhiều hơn nữa bằng cách sử dụng phần thưởng của họ để kiếm thêm lợi suất.

Một lưu ý quan trọng ở đây là việc thoát hoàn toàn của trình xác thực bị giới hạn tỷ lệ bởi Giao thức và chỉ có một số lượng trình xác thực nhất định có thể thoát trong mỗi Kỷ nguyên (mỗi 6,4 phút). Giới hạn này dao động tùy thuộc vào số lượng trình xác thực đang hoạt động, nhưng tính ra khoảng 0,33% tổng số ETH đã đặt cọc có thể được thoát khỏi mạng lưới trong một ngày.

Điều này ngăn chặn một cuộc di cư hàng loạt của các khoản tiền đã đặt cọc. Hơn nữa, nó ngăn chặn một kẻ tấn công tiềm năng có quyền truy cập vào một phần lớn tổng số ETH đã đặt cọc thực hiện một hành vi vi phạm có thể bị phạt cắt giảm và thoát/rút toàn bộ số dư của trình xác thực vi phạm trong cùng một Kỷ nguyên trước khi Giao thức có thể thực thi hình phạt cắt giảm.

APR cũng được cố ý thiết kế linh hoạt, cho phép một thị trường những người đặt cọc cân bằng mức thù lao mà họ sẵn sàng nhận để giúp bảo mật mạng lưới. Nếu tỷ lệ này quá thấp, thì các trình xác thực sẽ thoát ở một tỷ lệ bị giới hạn bởi Giao thức. Dần dần, điều này sẽ làm tăng APR cho tất cả những người ở lại, thu hút những người đặt cọc mới hoặc những người quay trở lại một lần nữa.
</ExpandableCard>

## Chuyện gì đã xảy ra với 'Eth2'? {#eth2}

Thuật ngữ 'Eth2' đã bị loại bỏ. Sau khi hợp nhất 'Eth1' và 'Eth2' thành một Chuỗi duy nhất, không còn cần thiết phải phân biệt giữa hai mạng lưới Ethereum nữa; chỉ có Ethereum.

Để hạn chế sự nhầm lẫn, cộng đồng đã cập nhật các thuật ngữ này:

- 'Eth1' hiện là 'lớp thực thi', xử lý các giao dịch và việc thực thi.
- 'Eth2' hiện là 'lớp đồng thuận', xử lý đồng thuận bằng chứng cổ phần (PoS).

Những cập nhật thuật ngữ này chỉ thay đổi quy ước đặt tên; điều này không làm thay đổi các mục tiêu hoặc lộ trình của Ethereum.

[Tìm hiểu thêm về việc đổi tên 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Mối quan hệ giữa các bản nâng cấp {#relationship-between-upgrades}

Các bản nâng cấp của Ethereum đều có phần liên quan đến nhau. Vì vậy, hãy tóm tắt lại cách The Merge liên quan đến các bản nâng cấp khác.

### The Merge và Chuỗi Beacon {#merge-and-beacon-chain}

The Merge đại diện cho việc chính thức áp dụng Chuỗi Beacon làm lớp đồng thuận mới cho lớp thực thi Mạng chính ban đầu. Kể từ The Merge, các trình xác thực được chỉ định để bảo mật Mạng chính Ethereum và việc khai thác trên [bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/) không còn là phương tiện sản xuất khối hợp lệ nữa.

Thay vào đó, các khối được đề xuất bởi các nút xác thực đã đặt cọc ETH để đổi lấy quyền tham gia vào đồng thuận. Những bản nâng cấp này tạo tiền đề cho các bản nâng cấp khả năng mở rộng trong tương lai, bao gồm cả phân mảnh.

<ButtonLink href="/roadmap/beacon-chain/">
  Chuỗi Beacon
</ButtonLink>

### The Merge và bản nâng cấp Thượng Hải {#merge-and-shanghai}

Để đơn giản hóa và tối đa hóa sự tập trung vào quá trình chuyển đổi thành công sang bằng chứng cổ phần (PoS), bản nâng cấp The Merge không bao gồm một số tính năng được mong đợi nhất định như khả năng rút ETH đã đặt cọc. Chức năng này đã được kích hoạt riêng biệt với bản nâng cấp Thượng Hải/Capella.

Đối với những người tò mò, hãy tìm hiểu thêm về [Điều gì xảy ra sau The Merge](https://youtu.be/7ggwLccuN5s?t=101), do Vitalik trình bày tại sự kiện ETHGlobal vào tháng 4 năm 2021.

### The Merge và phân mảnh {#merge-and-data-sharding}

Ban đầu, kế hoạch là làm việc trên phân mảnh trước The Merge để giải quyết khả năng mở rộng. Tuy nhiên, với sự bùng nổ của [các giải pháp mở rộng quy mô lớp 2 (l2)](/layer-2/), ưu tiên đã chuyển sang việc hoán đổi bằng chứng công việc (PoW) sang bằng chứng cổ phần (PoS) trước.

Các kế hoạch cho phân mảnh đang phát triển nhanh chóng, nhưng với sự gia tăng và thành công của các công nghệ lớp 2 (l2) để mở rộng quy mô thực thi giao dịch, các kế hoạch phân mảnh đã chuyển sang việc tìm ra cách tối ưu nhất để phân bổ gánh nặng lưu trữ dữ liệu lệnh gọi nén từ các hợp đồng Rollup, cho phép tăng trưởng theo cấp số nhân về công suất mạng lưới. Điều này sẽ không thể thực hiện được nếu không chuyển đổi sang bằng chứng cổ phần (PoS) trước.

<ButtonLink href="/roadmap/danksharding/">
  Phân mảnh
</ButtonLink>

## Đọc thêm {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />