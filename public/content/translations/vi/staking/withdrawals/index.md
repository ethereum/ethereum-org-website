---
title: "Rút tiền đặt cọc"
description: "Trang tóm tắt về việc rút tiền đặt cọc là gì, cách thức hoạt động và những gì người đặt cọc cần làm để nhận phần thưởng của họ"
lang: vi
template: staking
image: /images/staking/leslie-withdrawal.png
alt: "Tê giác Leslie với phần thưởng đặt cọc của cô ấy"
sidebarDepth: 2
summaryPoints:
  - Người vận hành trình xác thực phải cung cấp địa chỉ rút tiền để cho phép rút tiền
  - Các trình xác thực cũ có số dư vượt quá 32 ETH được tự động rút vài ngày một lần
  - Các trình xác thực gộp kiếm được phần thưởng trên toàn bộ số dư của họ lên đến 2048 ETH
  - Các trình xác thực thoát hoàn toàn khỏi việc đặt cọc sẽ nhận được số dư còn lại của họ
---

**Rút tiền đặt cọc** đề cập đến việc chuyển ETH từ tài khoản trình xác thực trên lớp đồng thuận của Ethereum (Chuỗi Beacon), sang lớp thực thi nơi nó có thể được giao dịch.

> Nếu bạn là thành viên của một [nhóm đặt cọc](/staking/pools/) hoặc nắm giữ token đặt cọc, bạn nên kiểm tra với nhà cung cấp của mình để biết thêm chi tiết về cách xử lý việc rút tiền đặt cọc, vì mỗi dịch vụ hoạt động khác nhau.

Cách thức rút tiền hoạt động phụ thuộc vào loại thông tin xác thực rút tiền của trình xác thực của bạn:

- **Trình xác thực cũ (Loại 1)**: Số dư vượt quá 32 ETH được tự động và thường xuyên gửi đến địa chỉ rút tiền được liên kết với trình xác thực. Phần thưởng trên 32 ETH không đóng góp vào trọng số của trình xác thực trên mạng lưới.
- **Trình xác thực gộp (Loại 2)**: Phần thưởng được gộp vào số dư hiệu dụng của trình xác thực lên đến 2048 ETH, làm tăng trọng số của trình xác thực và kiếm được nhiều phần thưởng hơn. Chỉ số dư vượt quá 2048 ETH mới được tự động quét.

Người dùng cũng có thể **thoát hoàn toàn khỏi việc đặt cọc**, gửi một giao dịch để rút tiền, chờ đợi theo thời gian của hàng đợi rút tiền (dựa trên nhu cầu của mạng lưới) và mở khóa toàn bộ số dư trình xác thực của họ.

## Phần thưởng đặt cọc {#staking-rewards}

Cách xử lý phần thưởng phụ thuộc vào loại thông tin xác thực của trình xác thực:

**Trình xác thực cũ (Loại 1)** có số dư hiệu dụng được giới hạn ở mức 32 ETH. Bất kỳ số dư nào trên 32 ETH nhận được dưới dạng phần thưởng mạng lưới đều không đóng góp vào số dư hiệu dụng hoặc làm tăng trọng số của trình xác thực này trên mạng lưới, và những phần thưởng này được tự động rút về địa chỉ rút tiền chuyên dụng của trình xác thực vài ngày một lần. Ngoài việc cung cấp địa chỉ rút tiền một lần, việc nhận những phần thưởng này không yêu cầu bất kỳ hành động nào từ người vận hành trình xác thực. Tất cả điều này được khởi tạo trên lớp đồng thuận, do đó không yêu cầu Gas (phí giao dịch) ở bất kỳ bước nào.

**Trình xác thực gộp (Loại 2)** có thể có số dư hiệu dụng ở bất kỳ mức nào từ 32 đến 2048 ETH. Phần thưởng mạng lưới mà các trình xác thực này nhận được sẽ gộp vào số dư hiệu dụng của chúng, làm tăng trọng số của trình xác thực và tiềm năng nhận được phần thưởng trong tương lai. Việc quét tự động chỉ xảy ra đối với số dư vượt quá 2048 ETH. Để rút phần thưởng dưới ngưỡng 2048 ETH, các trình xác thực gộp phải kích hoạt rút tiền một phần theo cách thủ công từ lớp thực thi, điều này yêu cầu Gas.

### Chúng ta đã đến bước này như thế nào? {#how-did-we-get-here}

Trong vài năm qua, [Ethereum](/) đã trải qua một số bản nâng cấp mạng lưới để chuyển đổi sang một mạng lưới được bảo mật bằng chính ETH, thay vì khai thác tiêu tốn nhiều năng lượng như trước đây. Việc tham gia vào đồng thuận trên Ethereum hiện được gọi là "đặt cọc", vì những người tham gia đã tự nguyện khóa ETH, đặt nó "vào rủi ro" (at stake) để có khả năng tham gia vào mạng lưới. Những người dùng tuân thủ các quy tắc sẽ nhận được phần thưởng, trong khi những nỗ lực gian lận có thể bị phạt.

Kể từ khi ra mắt hợp đồng tiền gửi đặt cọc vào tháng 11 năm 2020, một số người tiên phong dũng cảm của Ethereum đã tự nguyện khóa tiền để kích hoạt các "trình xác thực", những tài khoản đặc biệt có quyền chính thức chứng thực và đề xuất các khối, tuân theo các quy tắc của mạng lưới.

Trước bản nâng cấp Thượng Hải/Capella, bạn không thể sử dụng hoặc truy cập ETH đã đặt cọc của mình. Nhưng giờ đây, bạn có thể chọn tự động nhận phần thưởng của mình vào một tài khoản đã chọn và bạn cũng có thể rút ETH đã đặt cọc của mình bất cứ khi nào bạn muốn.

### Tôi cần chuẩn bị như thế nào? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Thông báo quan trọng {#important-notices}

Các tài khoản trình xác thực được yêu cầu cung cấp địa chỉ rút tiền trước khi chúng có thể truy cập và rút các phần thưởng mạng lưới đã tích lũy, hoặc xử lý việc rút tiền toàn bộ khi thoát khỏi việc đặt cọc.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Mỗi tài khoản trình xác thực chỉ có thể được chỉ định một địa chỉ rút tiền duy nhất, một lần.** Khi một địa chỉ được chọn và gửi đến lớp đồng thuận, điều này không thể được hoàn tác hoặc thay đổi lại. Hãy kiểm tra kỹ quyền sở hữu và tính chính xác của địa chỉ được cung cấp trước khi gửi.
</AlertDescription>
</AlertContent>
</Alert>

Nếu bạn chưa cung cấp địa chỉ rút tiền cho tài khoản trình xác thực của mình, thì **không có mối đe dọa nào đối với tiền của bạn trong thời gian chờ đợi**, giả sử cụm từ gợi nhớ/cụm từ hạt giống của bạn vẫn an toàn ngoại tuyến và không bị xâm phạm theo bất kỳ cách nào. Việc không thêm thông tin xác thực rút tiền sẽ chỉ khiến ETH bị khóa trong tài khoản trình xác thực cho đến khi địa chỉ rút tiền được cung cấp.

## Trình xác thực gộp {#compounding-validators}

Các trình xác thực có thể chọn **gộp** bằng cách chuyển đổi thông tin xác thực rút tiền của họ từ Loại 1 sang Loại 2. Điều này nâng số dư hiệu dụng tối đa từ 32 ETH lên **2048 ETH**, cho phép phần thưởng được gộp vào số dư hiệu dụng của trình xác thực thay vì được tự động quét.

Khi tính năng gộp được bật:

- Phần thưởng làm tăng số dư hiệu dụng của trình xác thực theo mức tăng 1 ETH (tùy thuộc vào một [bộ đệm trễ](https://www.attestant.io/posts/understanding-validator-effective-balance/) nhỏ), kiếm được nhiều phần thưởng hơn theo thời gian
- Việc quét tự động chỉ xảy ra đối với số dư vượt quá 2048 ETH
- Việc rút tiền một phần dưới ngưỡng 2048 ETH phải được kích hoạt thủ công từ lớp thực thi (điều này tốn Gas)
- Nhiều trình xác thực có thể được **hợp nhất** thành một trình xác thực gộp duy nhất, giúp giảm chi phí vận hành

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Việc chuyển đổi từ thông tin xác thực rút tiền Loại 1 sang Loại 2 là không thể đảo ngược.** Hãy sử dụng [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) làm công cụ chính thức cho việc chuyển đổi này. Để biết thêm chi tiết về quy trình chuyển đổi, rủi ro và việc hợp nhất, hãy xem [bài viết chuyên sâu về MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Thoát hoàn toàn khỏi việc đặt cọc {#exiting-staking-entirely}

Việc cung cấp địa chỉ rút tiền là bắt buộc trước khi _bất kỳ_ khoản tiền nào có thể được chuyển ra khỏi số dư tài khoản trình xác thực.

Những người dùng muốn thoát hoàn toàn khỏi việc đặt cọc và rút lại toàn bộ số dư của họ phải bắt đầu một "lệnh thoát tự nguyện". Điều này có thể được thực hiện theo hai cách:

- **Sử dụng khóa trình xác thực**: Ký và phát sóng một thông điệp thoát tự nguyện bằng ứng dụng khách trình xác thực của bạn, được gửi đến nút đồng thuận của bạn. Điều này không yêu cầu Gas.
- **Sử dụng thông tin xác thực rút tiền**: Kích hoạt việc thoát từ lớp thực thi bằng cách sử dụng địa chỉ rút tiền của bạn, mà không cần quyền truy cập vào khóa ký của trình xác thực. Điều này yêu cầu một giao dịch và tốn Gas.

Quá trình một trình xác thực thoát khỏi việc đặt cọc mất một khoảng thời gian khác nhau, tùy thuộc vào việc có bao nhiêu người khác cũng đang thoát cùng một lúc. Sau khi hoàn tất, tài khoản này sẽ không còn chịu trách nhiệm thực hiện các nhiệm vụ mạng lưới của trình xác thực, không còn đủ điều kiện nhận phần thưởng và không còn ETH "được đặt cọc" nữa. Tại thời điểm này, tài khoản sẽ được đánh dấu là hoàn toàn "có thể rút".

Khi một tài khoản được gắn cờ là "có thể rút" và thông tin xác thực rút tiền đã được cung cấp, người dùng không cần làm gì thêm ngoài việc chờ đợi. Các tài khoản được tự động và liên tục quét bởi những người đề xuất khối để tìm các khoản tiền đã thoát đủ điều kiện và số dư tài khoản của bạn sẽ được chuyển toàn bộ (còn được gọi là "rút tiền toàn bộ") trong lần <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>quét</a> tiếp theo.

## Phần thưởng tự động hoạt động như thế nào (Trình xác thực Loại 1)? {#how-do-withdrawals-work}

Việc một trình xác thực nhất định có đủ điều kiện để rút tiền hay không được xác định bởi trạng thái của chính tài khoản trình xác thực đó. Không cần bất kỳ thao tác nào từ người dùng tại bất kỳ thời điểm nào để xác định xem một tài khoản có nên được khởi tạo rút tiền hay không—toàn bộ quá trình được thực hiện tự động bởi lớp đồng thuận theo một vòng lặp liên tục.

### Bạn thích học qua hình ảnh hơn? {#visual-learner}

Hãy xem video giải thích về việc rút tiền đặt cọc Ethereum này của Finematics:

<VideoWatch slug="ethereum-staking-withdrawals" />

### "Quét" trình xác thực {#validator-sweeping}

Khi một trình xác thực được lên lịch để đề xuất khối tiếp theo, nó được yêu cầu xây dựng một hàng đợi rút tiền, với tối đa 16 khoản rút tiền đủ điều kiện. Điều này được thực hiện bằng cách bắt đầu với chỉ số trình xác thực 0, xác định xem có khoản rút tiền đủ điều kiện cho tài khoản này theo các quy tắc của Giao thức hay không và thêm nó vào hàng đợi nếu có. Trình xác thực được thiết lập để đề xuất khối tiếp theo sẽ tiếp tục từ nơi trình xác thực trước đó dừng lại, tiến triển theo thứ tự vô thời hạn.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Hãy nghĩ về một chiếc đồng hồ kim. Kim đồng hồ chỉ vào giờ, tiến lên theo một hướng, không bỏ qua bất kỳ giờ nào và cuối cùng quay trở lại điểm bắt đầu sau khi đạt đến số cuối cùng.

Bây giờ thay vì từ 1 đến 12, hãy tưởng tượng đồng hồ có từ 0 đến N _(N là tổng số tài khoản trình xác thực đã từng được đăng ký trên lớp đồng thuận, hơn 1,2 triệu tính đến tháng 4 năm 2026)._

Kim đồng hồ chỉ vào trình xác thực tiếp theo cần được kiểm tra các khoản rút tiền đủ điều kiện. Nó bắt đầu ở số 0 và tiến lên một vòng mà không bỏ qua bất kỳ tài khoản nào. Khi đạt đến trình xác thực cuối cùng, chu kỳ tiếp tục quay lại từ đầu.
</AlertDescription>
</AlertContent>
</Alert>

#### Kiểm tra tài khoản để rút tiền {#checking-an-account-for-withdrawals}

Trong khi người đề xuất đang quét qua các trình xác thực để tìm các khoản rút tiền có thể xảy ra, mỗi trình xác thực đang được kiểm tra sẽ được đánh giá dựa trên một loạt câu hỏi ngắn để xác định xem có nên kích hoạt rút tiền hay không và nếu có, thì nên rút bao nhiêu ETH.

1. **Địa chỉ rút tiền đã được cung cấp chưa?** Nếu không có địa chỉ rút tiền nào được cung cấp, tài khoản sẽ bị bỏ qua và không có khoản rút tiền nào được khởi tạo.
2. **Trình xác thực đã thoát và có thể rút tiền chưa?** Nếu trình xác thực đã thoát hoàn toàn và chúng ta đã đạt đến Kỷ nguyên mà tài khoản của họ được coi là "có thể rút", thì việc rút tiền toàn bộ sẽ được xử lý. Điều này sẽ chuyển toàn bộ số dư còn lại đến địa chỉ rút tiền.
3. **Số dư có vượt quá số dư hiệu dụng tối đa của nó không?** Đối với các trình xác thực cũ (Loại 1), ngưỡng này là 32 ETH. Đối với các trình xác thực gộp (Loại 2), ngưỡng này là 2048 ETH. Nếu tài khoản có thông tin xác thực rút tiền, chưa thoát hoàn toàn, có số dư hiệu dụng ở mức tối đa và có số dư trên ngưỡng này, thì việc rút tiền một phần sẽ được xử lý, chỉ chuyển phần vượt quá đến địa chỉ rút tiền của người dùng.

Chỉ có hai hành động được thực hiện bởi những người vận hành trình xác thực trong suốt vòng đời của một trình xác thực ảnh hưởng trực tiếp đến luồng này:

- Cung cấp thông tin xác thực rút tiền để cho phép bất kỳ hình thức rút tiền nào
- Thoát khỏi mạng lưới, điều này sẽ kích hoạt việc rút tiền toàn bộ

### Miễn phí Gas {#gas-free}

Việc quét rút tiền tự động không yêu cầu người đặt cọc phải gửi giao dịch theo cách thủ công. Điều này có nghĩa là **không yêu cầu Gas (phí giao dịch)** cho các lần quét tự động và chúng không cạnh tranh không gian khối của lớp thực thi hiện có.

Lưu ý rằng [các trình xác thực gộp](#compounding-validators) muốn kích hoạt rút tiền một phần dưới ngưỡng 2048 ETH phải thực hiện thủ công từ lớp thực thi, điều này yêu cầu Gas.

### Bao lâu thì phần thưởng đặt cọc của tôi sẽ được mở khóa và có sẵn trong Ví của tôi? {#how-soon}

Tối đa 16 khoản rút tiền có thể được xử lý trong một khối duy nhất. Với tốc độ đó, 115.200 khoản rút tiền của trình xác thực có thể được xử lý mỗi ngày (giả sử không có slot nào bị bỏ lỡ). Như đã lưu ý ở trên, các trình xác thực không có khoản rút tiền đủ điều kiện sẽ bị bỏ qua, làm giảm thời gian hoàn thành việc quét.

Mở rộng tính toán này, chúng ta có thể ước tính thời gian cần thiết để xử lý một số lượng rút tiền nhất định:

<TableContainer>

| Số lượng rút tiền | Thời gian hoàn thành |
| :-------------------: | :--------------: |
|        400.000        |     3,5 ngày     |
|        500.000        |     4,3 ngày     |
|        600.000        |     5,2 ngày     |
|        700.000        |     6,1 ngày     |
|        800.000        |     7,0 ngày     |

</TableContainer>

Như bạn thấy, quá trình này chậm lại khi có nhiều trình xác thực hơn trên mạng lưới. Sự gia tăng các slot bị bỏ lỡ có thể làm chậm quá trình này theo tỷ lệ tương ứng, nhưng điều này thường sẽ đại diện cho khía cạnh chậm hơn của các kết quả có thể xảy ra.

## Câu hỏi thường gặp {#faq}

<ExpandableCard
title="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Không, quá trình cung cấp thông tin xác thực rút tiền là quá trình diễn ra một lần và không thể thay đổi sau khi đã gửi.
</ExpandableCard>

<ExpandableCard
title="Why can a validator's withdrawal address only be set once?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
Việc thiết lập địa chỉ rút tiền trên lớp thực thi của trình xác thực là một thay đổi vĩnh viễn đối với thông tin xác thực của trình xác thực trên lớp đồng thuận. Không có cách nào để cập nhật thông tin xác thực trên lớp đồng thuận sau khi chúng đã được đăng ký.

Thông tin xác thực địa chỉ rút tiền của trình xác thực có thể được thiết lập để trỏ đến một hợp đồng thông minh (được kiểm soát bởi mã của nó) hoặc một tài khoản thuộc sở hữu bên ngoài (EOA, được kiểm soát bởi khóa riêng tư của nó). Hiện tại, các tài khoản này không có cách nào để truyền đạt một thông điệp trở lại lớp đồng thuận nhằm báo hiệu sự thay đổi thông tin xác thực của trình xác thực và việc thêm chức năng này sẽ làm tăng thêm sự phức tạp không cần thiết cho Giao thức.

Người dùng tìm kiếm khả năng quản lý rút tiền linh hoạt có thể thiết lập một Ví hợp đồng thông minh có khả năng xoay vòng khóa (chẳng hạn như [Safe](https://safe.global/)) làm địa chỉ rút tiền của trình xác thực, cho phép cập nhật EOA người nhận cuối cùng một cách hiệu quả. Nếu người dùng đã thiết lập EOA làm thông tin xác thực rút tiền, họ phải bắt đầu thoát hoàn toàn để thu hồi ETH đã đặt cọc của mình và sau đó sử dụng số tiền đó để kích hoạt một trình xác thực mới với thông tin xác thực khác.
</ExpandableCard>

<ExpandableCard
title="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
Nếu bạn sử dụng một nhóm đặt cọc hoặc nắm giữ token đặt cọc, hãy liên hệ với nhà cung cấp của bạn để tìm hiểu cách họ xử lý việc rút tiền, vì quy trình khác nhau tùy theo dịch vụ.

Nhìn chung, khi đặt cọc thông qua một nhà cung cấp hoặc nhóm, bạn sẽ được tự do lấy lại ETH đã đặt cọc cơ bản của mình, hoặc rút tiền và thay đổi nhà cung cấp dịch vụ đặt cọc mà bạn sử dụng. Nếu một nhóm cụ thể đang trở nên quá lớn, ETH đã đặt cọc có thể được thoát, quy đổi và đặt cọc lại với một [nhà cung cấp nhỏ hơn](https://rated.network/). Hoặc, nếu bạn đã tích lũy đủ ETH, bạn có thể [đặt cọc tại nhà](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Does claiming network rewards (partial withdrawals) happen automatically?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
Đối với **các trình xác thực cũ (Loại 1)**, có—miễn là trình xác thực của bạn đã cung cấp địa chỉ rút tiền. Địa chỉ này phải được cung cấp một lần để cho phép bất kỳ khoản rút tiền nào, sau đó việc phân phối phần thưởng mạng lưới đến địa chỉ rút tiền sẽ được tự động kích hoạt vài ngày một lần với mỗi lần quét trình xác thực.

Đối với **các trình xác thực gộp (Loại 2)**, phần thưởng được gộp vào số dư hiệu dụng của trình xác thực (lên đến 2048 ETH) thay vì được quét đến địa chỉ rút tiền. Việc quét tự động chỉ xảy ra đối với số dư vượt quá 2048 ETH. Để rút phần thưởng dưới ngưỡng này, bạn phải kích hoạt rút tiền một phần theo cách thủ công từ lớp thực thi.
</ExpandableCard>

<ExpandableCard title="Can I withdraw a custom amount?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Đối với **các trình xác thực cũ (Loại 1)**, bất kỳ phần thưởng mạng lưới ETH nào đã tích lũy vượt quá số dư hiệu dụng 32 ETH của trình xác thực đều được tự động đẩy đến địa chỉ rút tiền. Các trình xác thực Loại 1 đã gửi giao dịch rút tiền toàn bộ và hoàn tất quá trình thoát khỏi việc đặt cọc sẽ được rút toàn bộ số dư ETH của họ về địa chỉ rút tiền. Trình xác thực Loại 1 không thể yêu cầu rút một lượng ETH cụ thể theo cách thủ công.

**Các trình xác thực gộp (Loại 2)** có thể kích hoạt rút tiền một phần với một số lượng cụ thể từ lớp thực thi, miễn là số dư còn lại của trình xác thực duy trì ở mức bằng hoặc trên 32 ETH. Điều này yêu cầu gửi một giao dịch rút tiền một phần và tốn Gas.
</ExpandableCard>

<ExpandableCard
title="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

Những người vận hành trình xác thực được khuyến nghị truy cập trang [Rút tiền trên Staking Launchpad](https://launchpad.ethereum.org/withdrawals/), nơi bạn sẽ tìm thấy thêm chi tiết về cách chuẩn bị trình xác thực của mình cho việc rút tiền, thời gian của các sự kiện và thêm chi tiết về cách thức hoạt động của việc rút tiền.

Để thử nghiệm thiết lập của bạn trên mạng thử nghiệm trước, hãy truy cập [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org) để bắt đầu.

</ExpandableCard>

<ExpandableCard
title="Can I re-activate my validator after exiting by depositing more ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Không. Sau khi một trình xác thực đã thoát và toàn bộ số dư của nó đã được rút, bất kỳ ETH bổ sung nào được gửi vào trình xác thực đó sẽ tự động được chuyển đến địa chỉ rút tiền trong lần quét trình xác thực tiếp theo. Để bắt đầu đặt cọc lại bằng số ETH đó, bạn phải kích hoạt một trình xác thực mới.
</ExpandableCard>

<ExpandableCard
title="What is the difference between legacy and compounding validators?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Các trình xác thực cũ sử dụng thông tin xác thực rút tiền **Loại 1** (địa chỉ thông tin xác thực rút tiền bắt đầu bằng 0x01) và có số dư hiệu dụng được giới hạn ở mức 32 ETH. Bất kỳ ETH dư thừa nào nhận được dưới dạng phần thưởng mạng lưới đều được tự động quét đến địa chỉ rút tiền vài ngày một lần.

Các trình xác thực gộp sử dụng thông tin xác thực rút tiền **Loại 2** (địa chỉ thông tin xác thực rút tiền bắt đầu bằng 0x02) và có thể có số dư hiệu dụng lên đến 2048 ETH. Phần thưởng được gộp vào số dư hiệu dụng của trình xác thực, làm tăng trọng số của trình xác thực trên mạng lưới và tiềm năng nhận được phần thưởng trong tương lai. Việc quét tự động chỉ xảy ra đối với số dư vượt quá 2048 ETH. Để rút ETH dưới ngưỡng này, việc rút tiền một phần thủ công phải được kích hoạt từ lớp thực thi.

Để biết thêm chi tiết, hãy xem [bài viết chuyên sâu về MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="How do I convert to a compounding validator?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Bạn có thể chuyển đổi từ thông tin xác thực rút tiền Loại 1 sang Loại 2 bằng cách sử dụng [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Thao tác này là **không thể đảo ngược** — sau khi chuyển đổi, bạn không thể quay lại thông tin xác thực Loại 1.

Sau khi chuyển đổi, bạn cũng có thể **hợp nhất** nhiều trình xác thực thành một, kết hợp số dư của chúng thành một trình xác thực gộp duy nhất. Để xem hướng dẫn đầy đủ về quy trình chuyển đổi, rủi ro và công cụ hợp nhất, hãy xem [bài viết chuyên sâu về MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="When were staking withdrawals enabled?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
Chức năng rút tiền ban đầu được kích hoạt như một phần của bản nâng cấp Thượng Hải/Capella vào **ngày 12 tháng 4 năm 2023**. [Bản nâng cấp Pectra](/roadmap/pectra/) (tháng 5 năm 2025) sau đó đã giới thiệu các trình xác thực gộp với số dư hiệu dụng tối đa cao hơn là 2048 ETH, cũng như các lệnh thoát và rút tiền một phần được kích hoạt từ lớp thực thi.

Bản nâng cấp Thượng Hải/Capella cho phép ETH đã đặt cọc trước đó được thu hồi vào các tài khoản Ethereum thông thường. Điều này đã khép lại vòng lặp về Thanh khoản đặt cọc và đưa Ethereum tiến thêm một bước trên hành trình xây dựng một hệ sinh thái phi tập trung bền vững, có thể mở rộng và an toàn.

- [Tìm hiểu thêm về lịch sử Ethereum](/ethereum-forks/)
- [Tìm hiểu thêm về lộ trình Ethereum](/roadmap/)
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Rút tiền trên Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Các hành động của trình xác thực trên Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Bài viết chuyên sâu về MaxEB: gộp và hợp nhất](/roadmap/pectra/maxeb/)
- [EIP-4895: Rút tiền đẩy trên Chuỗi Beacon dưới dạng hoạt động](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Rút ETH đã đặt cọc (Thử nghiệm) với Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Rút tiền đẩy trên Chuỗi Beacon dưới dạng hoạt động với Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Hiểu về số dư hiệu dụng của trình xác thực](https://www.attestant.io/posts/understanding-validator-effective-balance/)