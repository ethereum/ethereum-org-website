---
title: Phần thưởng và hình phạt trong proof-of-stake
description: Tìm hiểu về các ưu đãi trong giao thức của Ethereum proof-of-stake.
lang: vi
---

[Ethereum](/) được bảo mật bằng tiền mã hóa gốc của nó, ether (ETH). Các nhà điều hành nút muốn tham gia vào việc xác thực các khối và xác định đầu của chuỗi, sẽ đặt cọc ether vào [hợp đồng tiền gửi](/staking/deposit-contract/) trên Ethereum. Sau đó, họ được trả bằng ether để chạy phần mềm trình xác thực nhằm kiểm tra tính hợp lệ của các khối mới nhận được qua mạng lưới ngang hàng và áp dụng thuật toán lựa chọn phân nhánh để xác định đầu của chuỗi.

Có hai vai trò chính đối với một trình xác thực: 1) kiểm tra các khối mới và "chứng thực" cho chúng nếu chúng hợp lệ, 2) đề xuất các khối mới khi được chọn ngẫu nhiên từ tổng nhóm trình xác thực. Nếu trình xác thực không thực hiện được một trong hai nhiệm vụ này khi được yêu cầu, họ sẽ bỏ lỡ khoản thanh toán ether. Các trình xác thực đôi khi cũng được giao nhiệm vụ tổng hợp chữ ký và tham gia vào các ủy ban đồng bộ.

Cũng có một số hành động rất khó xảy ra do vô tình và biểu thị một số ý định độc hại, chẳng hạn như đề xuất nhiều khối cho cùng một khe hoặc chứng thực nhiều khối cho cùng một khe. Đây là những hành vi "có thể bị phạt cắt giảm", dẫn đến việc trình xác thực bị đốt một lượng ether (lên đến 1 ETH) trước khi trình xác thực bị xóa khỏi mạng lưới, quá trình này mất 36 ngày. Lượng ether của trình xác thực bị phạt cắt giảm sẽ từ từ cạn kiệt trong suốt thời gian thoát, nhưng vào Ngày thứ 18, họ sẽ nhận được một "hình phạt tương quan" (correlation penalty), hình phạt này sẽ lớn hơn khi có nhiều trình xác thực bị phạt cắt giảm trong cùng một khoảng thời gian. Do đó, cấu trúc ưu đãi của cơ chế đồng thuận trả thưởng cho sự trung thực và trừng phạt những kẻ xấu.

Tất cả các phần thưởng và hình phạt được áp dụng một lần mỗi kỷ nguyên.

Đọc tiếp để biết thêm chi tiết...

## Phần thưởng và hình phạt {#rewards}

### Phần thưởng {#rewards-2}

Các trình xác thực nhận được phần thưởng khi họ bỏ phiếu nhất quán với đa số các trình xác thực khác, khi họ đề xuất khối và khi họ tham gia vào các ủy ban đồng bộ. Giá trị của các phần thưởng trong mỗi kỷ nguyên được tính toán từ một `base_reward`. Đây là đơn vị cơ sở mà từ đó các phần thưởng khác được tính toán. `base_reward` đại diện cho phần thưởng trung bình mà một trình xác thực nhận được trong các điều kiện tối ưu mỗi kỷ nguyên. Điều này được tính toán từ số dư hiệu dụng của trình xác thực và tổng số trình xác thực đang hoạt động như sau:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

trong đó `base_reward_factor` là 64, `base_rewards_per_epoch` là 4 và `sum(active balance)` là tổng số ether được đặt cọc trên tất cả các trình xác thực đang hoạt động.

Điều này có nghĩa là phần thưởng cơ sở tỷ lệ thuận với số dư hiệu dụng của trình xác thực và tỷ lệ nghịch với số lượng trình xác thực trên mạng lưới. Càng có nhiều trình xác thực, tổng lượng phát hành càng lớn (vì `sqrt(N)` nhưng `base_reward` cho mỗi trình xác thực càng nhỏ (vì `1/sqrt(N)`). Những yếu tố này ảnh hưởng đến APR cho một nút đặt cọc. Đọc lý do cho điều này trong [ghi chú của Vitalik](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

Tổng phần thưởng sau đó được tính bằng tổng của năm thành phần, mỗi thành phần có một trọng số xác định mức độ đóng góp của mỗi thành phần vào tổng phần thưởng. Các thành phần đó là:

```
1. source vote: trình xác thực đã bỏ phiếu kịp thời cho điểm kiểm tra nguồn (source checkpoint) chính xác
2. target vote: trình xác thực đã bỏ phiếu kịp thời cho điểm kiểm tra đích (target checkpoint) chính xác
3. head vote: trình xác thực đã bỏ phiếu kịp thời cho khối đầu (head block) chính xác
4. sync committee reward: trình xác thực đã tham gia vào một ủy ban đồng bộ
5. proposer reward: trình xác thực đã đề xuất một khối trong khe chính xác
```

Trọng số cho mỗi thành phần như sau:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Tổng các trọng số này là 64. Phần thưởng được tính bằng tổng các trọng số áp dụng chia cho 64. Một trình xác thực đã bỏ phiếu kịp thời cho nguồn, đích và đầu, đề xuất một khối và tham gia vào một ủy ban đồng bộ có thể nhận được `64/64 * base_reward == base_reward`. Tuy nhiên, một trình xác thực thường không phải là người đề xuất khối, vì vậy phần thưởng tối đa của họ là `64-8 /64 * base_reward == 7/8 * base_reward`. Các trình xác thực không phải là người đề xuất khối cũng không nằm trong ủy ban đồng bộ có thể nhận được `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Một phần thưởng bổ sung được thêm vào để khuyến khích các chứng thực nhanh chóng. Đây là `inclusion_delay_reward`. Phần thưởng này có giá trị bằng `base_reward` nhân với `1/delay` trong đó `delay` là số lượng khe phân tách giữa đề xuất khối và chứng thực. Ví dụ: nếu chứng thực được gửi trong vòng một khe kể từ khi đề xuất khối, người chứng thực sẽ nhận được `base_reward * 1/1 == base_reward`. Nếu chứng thực đến trong khe tiếp theo, người chứng thực sẽ nhận được `base_reward * 1/2` và cứ tiếp tục như vậy.

Người đề xuất khối nhận được `8 / 64 * base_reward` cho **mỗi chứng thực hợp lệ** được bao gồm trong khối, vì vậy giá trị thực tế của phần thưởng tăng theo tỷ lệ với số lượng trình xác thực chứng thực. Người đề xuất khối cũng có thể tăng phần thưởng của họ bằng cách đưa bằng chứng về hành vi sai trái của các trình xác thực khác vào khối được đề xuất của họ. Những phần thưởng này là "củ cà rốt" khuyến khích sự trung thực của trình xác thực. Một người đề xuất khối bao gồm việc phạt cắt giảm sẽ được thưởng bằng `slashed_validators_effective_balance / 512`.

### Hình phạt {#penalties}

Cho đến nay, chúng ta đã xem xét các trình xác thực hoạt động hoàn toàn tốt, nhưng còn những trình xác thực không bỏ phiếu kịp thời cho đầu, nguồn và đích hoặc thực hiện việc đó một cách chậm chạp thì sao?

Các hình phạt cho việc bỏ lỡ các phiếu bầu đích và nguồn bằng với phần thưởng mà người chứng thực sẽ nhận được nếu họ đã gửi chúng. Điều này có nghĩa là thay vì được cộng phần thưởng vào số dư của họ, họ sẽ bị trừ đi một giá trị tương đương khỏi số dư. Không có hình phạt nào cho việc bỏ lỡ phiếu bầu đầu (tức là phiếu bầu đầu chỉ được thưởng, không bao giờ bị phạt). Không có hình phạt nào liên quan đến `inclusion_delay` - phần thưởng đơn giản là sẽ không được cộng vào số dư của trình xác thực. Cũng không có hình phạt nào cho việc không đề xuất được khối.

Đọc thêm về phần thưởng và hình phạt trong [thông số kỹ thuật đồng thuận](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Phần thưởng và hình phạt đã được điều chỉnh trong bản nâng cấp Bellatrix - hãy xem Danny Ryan và Vitalik thảo luận về điều này trong [video Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ) này.

## Phạt cắt giảm {#slashing}

Phạt cắt giảm là một hành động nghiêm khắc hơn dẫn đến việc buộc phải loại bỏ một trình xác thực khỏi mạng lưới và đi kèm với việc mất số ether đã đặt cọc của họ. Có ba cách khiến một trình xác thực có thể bị phạt cắt giảm, tất cả đều tương đương với việc đề xuất hoặc chứng thực khối không trung thực:

- Bằng cách đề xuất và ký hai khối khác nhau cho cùng một khe
- Bằng cách chứng thực cho một khối "bao quanh" một khối khác (thực chất là thay đổi lịch sử)
- Bằng cách "bỏ phiếu kép" thông qua việc chứng thực cho hai ứng cử viên cho cùng một khối

Nếu những hành động này bị phát hiện, trình xác thực sẽ bị phạt cắt giảm. Điều này có nghĩa là 0.0078125 ETH sẽ bị đốt ngay lập tức đối với một trình xác thực có 32 ETH (được chia tỷ lệ tuyến tính với số dư đang hoạt động), sau đó khoảng thời gian loại bỏ 36 ngày sẽ bắt đầu. Trong khoảng thời gian loại bỏ này, khoản đặt cọc của trình xác thực sẽ dần cạn kiệt. Ở thời điểm giữa (Ngày thứ 18), một hình phạt bổ sung sẽ được áp dụng với mức độ tăng theo tỷ lệ với tổng số ether được đặt cọc của tất cả các trình xác thực bị phạt cắt giảm trong 36 ngày trước sự kiện phạt cắt giảm. Điều này có nghĩa là khi có nhiều trình xác thực bị phạt cắt giảm hơn, mức độ phạt cắt giảm sẽ tăng lên. Mức phạt cắt giảm tối đa là toàn bộ số dư hiệu dụng của tất cả các trình xác thực bị phạt cắt giảm (tức là, nếu có nhiều trình xác thực bị phạt cắt giảm, họ có thể mất toàn bộ khoản đặt cọc của mình). Mặt khác, một sự kiện phạt cắt giảm đơn lẻ, biệt lập chỉ đốt một phần nhỏ khoản đặt cọc của trình xác thực. Hình phạt ở thời điểm giữa này tăng theo tỷ lệ với số lượng trình xác thực bị phạt cắt giảm được gọi là "hình phạt tương quan" (correlation penalty).

## Rò rỉ do không hoạt động {#inactivity-leak}

Nếu lớp đồng thuận đã trải qua hơn bốn kỷ nguyên mà không đạt được tính chung cuộc, một giao thức khẩn cấp được gọi là "rò rỉ do không hoạt động" sẽ được kích hoạt. Mục đích cuối cùng của rò rỉ do không hoạt động là tạo ra các điều kiện cần thiết để chuỗi phục hồi tính chung cuộc. Như đã giải thích ở trên, tính chung cuộc yêu cầu đa số 2/3 tổng số ether được đặt cọc đồng ý về các điểm kiểm tra nguồn và đích. Nếu các trình xác thực đại diện cho hơn 1/3 tổng số trình xác thực ngoại tuyến hoặc không gửi được các chứng thực chính xác thì đa số tuyệt đối 2/3 không thể hoàn tất các điểm kiểm tra. Rò rỉ do không hoạt động cho phép khoản đặt cọc thuộc về các trình xác thực không hoạt động dần cạn kiệt cho đến khi họ kiểm soát ít hơn 1/3 tổng số tiền đặt cọc, cho phép các trình xác thực đang hoạt động còn lại hoàn tất chuỗi. Cho dù nhóm trình xác thực không hoạt động có lớn đến đâu, các trình xác thực đang hoạt động còn lại cuối cùng sẽ kiểm soát >2/3 khoản đặt cọc. Việc mất khoản đặt cọc là một động lực mạnh mẽ để các trình xác thực không hoạt động kích hoạt lại càng sớm càng tốt! Một kịch bản rò rỉ do không hoạt động đã gặp phải trên mạng thử nghiệm Medalla khi < 66% các trình xác thực đang hoạt động có thể đi đến đồng thuận về đầu hiện tại của chuỗi khối. Rò rỉ do không hoạt động đã được kích hoạt và tính chung cuộc cuối cùng đã được phục hồi!

Thiết kế phần thưởng, hình phạt và phạt cắt giảm của cơ chế đồng thuận khuyến khích các trình xác thực cá nhân hành xử đúng đắn. Tuy nhiên, từ những lựa chọn thiết kế này xuất hiện một hệ thống khuyến khích mạnh mẽ việc phân phối đồng đều các trình xác thực trên nhiều máy khách và sẽ không khuyến khích mạnh mẽ sự thống trị của một máy khách duy nhất.

## Đọc thêm {#further-reading}

- [Nâng cấp Ethereum: Lớp ưu đãi](https://eth2book.info/altair/part2/incentives)
- [Các ưu đãi trong giao thức Casper lai của Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Thông số kỹ thuật có chú thích của Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Mẹo phòng ngừa phạt cắt giảm trên Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Phân tích các hình phạt cắt giảm theo EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Nguồn_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_