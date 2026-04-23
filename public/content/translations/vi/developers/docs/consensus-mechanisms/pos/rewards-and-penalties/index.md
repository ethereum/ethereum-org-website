---
title: "Phần thưởng và hình phạt của Bằng chứng cổ phần"
description: "Tìm hiểu về các ưu đãi trong giao thức trong Ethereum bằng chứng cổ phần."
lang: vi
---

Ethereum được bảo mật bằng tiền mã hóa gốc của nó, ether (ETH). Các nhà khai thác nút muốn tham gia xác thực các khối và xác định phần đầu của chuỗi, hãy gửi ether vào [hợp đồng ký gửi](/staking/deposit-contract/) trên Ethereum. Sau đó, họ được trả bằng ether để chạy phần mềm trình xác thực nhằm kiểm tra tính hợp lệ của các khối mới nhận được qua mạng ngang hàng và áp dụng thuật toán lựa chọn phân nhánh để xác định phần đầu của chuỗi.

Trình xác thực có hai vai trò chính: 1) kiểm tra các khối mới và “chứng thực” chúng nếu hợp lệ, 2) đề xuất các khối mới khi được chọn ngẫu nhiên từ tổng nhóm trình xác thực. Nếu trình xác thực không thực hiện một trong hai nhiệm vụ này khi được yêu cầu, họ sẽ bỏ lỡ khoản thanh toán bằng ether. Các trình xác thực đôi khi cũng được giao nhiệm vụ tổng hợp chữ ký và tham gia vào các ủy ban đồng bộ.

Ngoài ra còn có một số hành động rất khó thực hiện một cách vô tình và biểu thị một số ý định độc hại, chẳng hạn như đề xuất nhiều khối cho cùng một slot hoặc chứng thực nhiều khối cho cùng một slot. Đây là những hành vi “có thể bị cắt giảm” dẫn đến việc trình xác thực bị đốt một lượng ether (lên đến 1 ETH) trước khi trình xác thực bị xóa khỏi mạng, quá trình này mất 36 ngày. Ether của trình xác thực bị cắt giảm sẽ dần dần cạn kiệt trong giai đoạn thoát, nhưng vào Ngày thứ 18, họ phải nhận một “hình phạt tương quan” lớn hơn khi có nhiều trình xác thực bị cắt giảm hơn trong cùng một khoảng thời gian. Do đó, cấu trúc khuyến khích của cơ chế đồng thuận sẽ trả công cho sự trung thực và trừng phạt những kẻ xấu.

Tất cả các phần thưởng và hình phạt được áp dụng mỗi epoch một lần.

Đọc tiếp để biết thêm chi tiết...

## Phần thưởng và hình phạt {#rewards}

### Phần thưởng {#rewards}

Trình xác thực nhận được phần thưởng khi họ thực hiện các phiếu bầu nhất quán với phần lớn các trình xác thực khác, khi họ đề xuất các khối và khi họ tham gia vào các ủy ban đồng bộ. Giá trị của phần thưởng trong mỗi epoch được tính từ `base_reward`. Đây là đơn vị cơ sở mà các phần thưởng khác được tính toán. `base_reward` đại diện cho phần thưởng trung bình mà một trình xác thực nhận được trong điều kiện tối ưu cho mỗi epoch. Điều này được tính từ số dư hiệu dụng của trình xác thực và tổng số trình xác thực đang hoạt động như sau:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

trong đó `base_reward_factor` là 64, `base_rewards_per_epoch` là 4 và `sum(active balance)` là tổng số ether đã đặt cược trên tất cả các trình xác thực đang hoạt động.

Điều này có nghĩa là phần thưởng cơ bản tỷ lệ thuận với số dư hiệu dụng của trình xác thực và tỷ lệ nghịch với số lượng trình xác thực trên mạng. Càng nhiều trình xác thực, tổng lượng phát hành càng lớn (dưới dạng `sqrt(N)` nhưng `base_reward` cho mỗi trình xác thực càng nhỏ (dưới dạng `1/sqrt(N)`). Các yếu tố này ảnh hưởng đến APR cho một nút đặt cược. Đọc lý do cho điều này trong [ghi chú của Vitalik](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

Tổng phần thưởng sau đó được tính bằng tổng của năm thành phần, mỗi thành phần có một trọng số xác định mức độ mà mỗi thành phần thêm vào tổng phần thưởng. Các thành phần là:

```
1. bỏ phiếu nguồn: trình xác thực đã bỏ phiếu kịp thời cho điểm kiểm tra nguồn chính xác
2. bỏ phiếu mục tiêu: trình xác thực đã bỏ phiếu kịp thời cho điểm kiểm tra mục tiêu chính xác
3. bỏ phiếu đầu: trình xác thực đã bỏ phiếu kịp thời cho khối đầu chính xác
4. phần thưởng ủy ban đồng bộ: trình xác thực đã tham gia vào một ủy ban đồng bộ
5. phần thưởng người đề xuất: trình xác thực đã đề xuất một khối trong slot chính xác
```

Trọng số cho mỗi thành phần như sau:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Các trọng số này có tổng là 64. Phần thưởng được tính bằng tổng các trọng số áp dụng chia cho 64. Một trình xác thực đã thực hiện các phiếu bầu nguồn, mục tiêu và đầu đúng lúc, đề xuất một khối và tham gia vào ủy ban đồng bộ có thể nhận được `64/64 * base_reward == base_reward`. Tuy nhiên, một trình xác thực thường không phải là người đề xuất khối, vì vậy phần thưởng tối đa của họ là `64-8 /64 * base_reward == 7/8 * base_reward`. Các trình xác thực không phải là người đề xuất khối cũng không thuộc ủy ban đồng bộ có thể nhận được `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Một phần thưởng bổ sung được thêm vào để khuyến khích các sự chứng thực nhanh chóng. Đây là `inclusion_delay_reward`. Giá trị này bằng `base_reward` nhân với `1/delay`, trong đó `delay` là số lượng slot phân tách đề xuất khối và sự chứng thực. Ví dụ: nếu sự chứng thực được gửi trong vòng một slot của đề xuất khối, người chứng thực sẽ nhận được `base_reward * 1/1 == base_reward`. Nếu sự chứng thực đến trong slot tiếp theo, người chứng thực sẽ nhận được `base_reward * 1/2`, v.v.

Người đề xuất khối nhận `8 / 64 * base_reward` cho **mỗi sự chứng thực hợp lệ** có trong khối, vì vậy giá trị thực tế của phần thưởng sẽ thay đổi theo quy mô cùng số lượng trình xác thực chứng thực. Người đề xuất khối cũng có thể tăng phần thưởng của mình bằng cách bao gồm bằng chứng về hành vi sai trái của các trình xác thực khác trong khối được đề xuất của họ. Những phần thưởng này là “củ cà rốt” khuyến khích sự trung thực của trình xác thực. Một người đề xuất khối bao gồm hành vi phạt cắt giảm sẽ được thưởng bằng `slashed_validators_effective_balance / 512`.

### Hình phạt {#penalties}

Cho đến nay, chúng tôi đã xem xét các trình xác thực hoạt động hoàn hảo, nhưng còn các trình xác thực không bỏ phiếu cho đầu, nguồn và mục tiêu kịp thời hoặc làm như vậy một cách chậm chạp thì sao?

Các hình phạt cho việc bỏ lỡ các phiếu bầu mục tiêu và nguồn bằng với phần thưởng mà người chứng thực sẽ nhận được nếu họ đã gửi chúng. Điều này có nghĩa là thay vì được cộng phần thưởng vào số dư của mình, họ sẽ bị trừ đi một giá trị tương đương từ số dư của mình. Không có hình phạt nào cho việc bỏ lỡ phiếu bầu đầu (tức là phiếu bầu đầu chỉ được thưởng, không bao giờ bị phạt). Không có hình phạt nào liên quan đến `inclusion_delay` - phần thưởng sẽ không được cộng vào số dư của trình xác thực. Cũng không có hình phạt nào cho việc không đề xuất được một khối.

Đọc thêm về phần thưởng và hình phạt trong [thông số kỹ thuật đồng thuận](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Phần thưởng và hình phạt đã được điều chỉnh trong bản nâng cấp Bellatrix - hãy xem Danny Ryan và Vitalik thảo luận về điều này trong [video Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Phạt cắt giảm {#slashing}

Phạt cắt giảm là một hành động nghiêm trọng hơn dẫn đến việc loại bỏ một trình xác thực khỏi mạng và mất đi một phần ether đã đặt cược của họ. Có ba cách một trình xác thực có thể bị phạt cắt giảm, tất cả đều dẫn đến việc đề xuất hoặc chứng thực các khối không trung thực:

- Bằng cách đề xuất và ký hai khối khác nhau cho cùng một slot
- Bằng cách chứng thực một khối "bao quanh" một khối khác (thay đổi lịch sử một cách hiệu quả)
- Bằng cách "bỏ phiếu kép" bằng cách chứng thực hai ứng cử viên cho cùng một khối

Nếu những hành động này bị phát hiện, trình xác thực sẽ bị phạt cắt giảm. Điều này có nghĩa là 0,0078125 sẽ bị đốt ngay lập tức đối với một trình xác thực 32 ETH (thay đổi quy mô tuyến tính với số dư hoạt động), sau đó bắt đầu giai đoạn loại bỏ 36 ngày. Trong giai đoạn loại bỏ này, cổ phần của trình xác thực dần dần bị mất đi. Tại điểm giữa (Ngày thứ 18), một hình phạt bổ sung được áp dụng với mức độ thay đổi theo quy mô cùng tổng số ether đã đặt cược của tất cả các trình xác thực bị phạt cắt giảm trong 36 ngày trước sự kiện phạt cắt giảm. Điều này có nghĩa là khi càng nhiều trình xác thực bị phạt cắt giảm, mức độ phạt cắt giảm càng tăng. Mức phạt cắt giảm tối đa là toàn bộ số dư hiệu dụng của tất cả các trình xác thực bị phạt cắt giảm (tức là, nếu có nhiều trình xác thực bị phạt cắt giảm, họ có thể mất toàn bộ cổ phần của mình). Mặt khác, một sự kiện phạt cắt giảm đơn lẻ, riêng biệt chỉ đốt một phần nhỏ cổ phần của trình xác thực. Hình phạt giữa kỳ này thay đổi theo quy mô cùng số lượng trình xác thực bị phạt cắt giảm được gọi là "hình phạt tương quan".

## Rò rỉ do không hoạt động {#inactivity-leak}

Nếu lớp đồng thuận đã trải qua hơn bốn epoch mà không hoàn tất, một giao thức khẩn cấp được gọi là "rò rỉ do không hoạt động" sẽ được kích hoạt. Mục đích cuối cùng của việc rò rỉ do không hoạt động là tạo ra các điều kiện cần thiết để chuỗi phục hồi tính kết luận cuối cùng. Như đã giải thích ở trên, tính kết luận cuối cùng đòi hỏi đa số 2/3 tổng số ether đã đặt cược phải đồng ý về các điểm kiểm tra nguồn và mục tiêu. Nếu các trình xác thực đại diện cho hơn 1/3 tổng số trình xác thực ngoại tuyến hoặc không gửi các chứng thực chính xác thì không thể có đa số 2/3 để hoàn tất các điểm kiểm tra. Rò rỉ do không hoạt động cho phép cổ phần của các trình xác thực không hoạt động dần dần bị mất đi cho đến khi họ kiểm soát ít hơn 1/3 tổng số cổ phần, cho phép các trình xác thực đang hoạt động còn lại hoàn tất chuỗi. Tuy nhiên, dù nhóm trình xác thực không hoạt động lớn đến đâu, các trình xác thực đang hoạt động còn lại cuối cùng sẽ kiểm soát >2/3 cổ phần. Việc mất cổ phần là một động lực mạnh mẽ để các trình xác thực không hoạt động kích hoạt lại càng sớm càng tốt! Một kịch bản rò rỉ do không hoạt động đã xảy ra trên mạng thử nghiệm Medalla khi < 66% trình xác thực đang hoạt động có thể đi đến sự đồng thuận về phần đầu hiện tại của chuỗi khối. Rò rỉ do không hoạt động đã được kích hoạt và tính kết luận cuối cùng cuối cùng đã được lấy lại!

Thiết kế phần thưởng, hình phạt và phạt cắt giảm của cơ chế đồng thuận khuyến khích các trình xác thực cá nhân hành xử đúng đắn. Tuy nhiên, từ những lựa chọn thiết kế này đã tạo ra một hệ thống khuyến khích mạnh mẽ việc phân phối đồng đều các trình xác thực trên nhiều máy khách và sẽ ngăn cản mạnh mẽ sự thống trị của một máy khách duy nhất.

## Đọc thêm {#further-reading}

- [Nâng cấp Ethereum: Lớp ưu đãi](https://eth2book.info/altair/part2/incentives)
- [Các ưu đãi trong giao thức Casper kết hợp của Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Thông số kỹ thuật có chú thích của Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Mẹo phòng chống phạt cắt giảm Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Phân tích hình phạt cắt giảm theo EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Nguồn_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
