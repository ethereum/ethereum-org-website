---
title: Rút tiền ký gửi
description: Trang tóm tắt về việc rút tiền ký gửi đẩy (push withdrawals) là gì, cách chúng hoạt động và những người đặt cọc cần làm gì để nhận phần thưởng của họ
lang: vi
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Tê giác Leslie với phần thưởng ký gửi của cô ấy
sidebarDepth: 2
summaryPoints:
  - Người vận hành trình xác thực phải cung cấp địa chỉ rút tiền để kích hoạt tính năng rút tiền
  - Các trình xác thực truyền thống có số dư vượt quá 32 ETH sẽ tự động được rút vài ngày một lần
  - Các trình xác thực cộng dồn kiếm được phần thưởng trên toàn bộ số dư của họ lên đến 2048 ETH
  - Các trình xác thực thoát hoàn toàn khỏi việc ký gửi sẽ nhận được số dư còn lại của họ
---

**Rút tiền ký gửi** đề cập đến việc chuyển ETH từ tài khoản trình xác thực trên lớp đồng thuận của Ethereum (chuỗi beacon), sang lớp thực thi nơi nó có thể được giao dịch.

Cách thức rút tiền hoạt động phụ thuộc vào loại thông tin xác thực rút tiền của trình xác thực của bạn:

- **Các trình xác thực truyền thống (Loại 1)**: Số dư vượt quá 32 ETH được tự động và thường xuyên gửi đến địa chỉ rút tiền được liên kết với trình xác thực. Phần thưởng trên 32 ETH không đóng góp vào trọng số của trình xác thực trên mạng lưới.
- **Các trình xác thực cộng dồn (Loại 2)**: Phần thưởng được cộng dồn vào số dư hiệu dụng của trình xác thực lên đến 2048 ETH, làm tăng trọng số của trình xác thực và kiếm được nhiều phần thưởng hơn. Chỉ số dư vượt quá 2048 ETH mới được tự động quét.

Người dùng cũng có thể **thoát hoàn toàn khỏi việc ký gửi**, mở khóa toàn bộ số dư trình xác thực của họ.

## Phần thưởng ký gửi {#staking-rewards}

Cách xử lý phần thưởng phụ thuộc vào loại thông tin xác thực của trình xác thực:

**Các trình xác thực truyền thống (Loại 1)** có số dư hiệu dụng được giới hạn ở mức 32 ETH. Bất kỳ số dư nào trên 32 ETH kiếm được thông qua phần thưởng đều không đóng góp vào tiền gốc hoặc làm tăng trọng số của trình xác thực này trên mạng lưới, và được tự động rút dưới dạng thanh toán phần thưởng vài ngày một lần. Ngoài việc cung cấp địa chỉ rút tiền một lần, những phần thưởng này không yêu cầu bất kỳ hành động nào từ người vận hành trình xác thực. Tất cả điều này được khởi tạo trên lớp đồng thuận, do đó không cần ga (phí giao dịch) ở bất kỳ bước nào.

**Các trình xác thực cộng dồn (Loại 2)** có thể có số dư hiệu dụng ở bất kỳ mức nào từ 32 đến 2048 ETH. Phần thưởng kiếm được bởi các trình xác thực này được cộng dồn vào số dư hiệu dụng của chúng, làm tăng trọng số của trình xác thực và phần thưởng trong tương lai. Việc tự động quét chỉ xảy ra đối với số dư vượt quá 2048 ETH. Để rút phần thưởng dưới ngưỡng 2048 ETH, các trình xác thực cộng dồn phải kích hoạt rút tiền một phần theo cách thủ công từ lớp thực thi, điều này yêu cầu ga.

### Chúng ta đã đến bước này như thế nào? {#how-did-we-get-here}

Trong vài năm qua, [Ethereum](/) đã trải qua một số đợt nâng cấp mạng lưới để chuyển đổi sang một mạng lưới được bảo mật bằng chính ETH, thay vì khai thác tiêu tốn nhiều năng lượng như trước đây. Việc tham gia vào sự đồng thuận trên Ethereum hiện được gọi là "ký gửi", vì những người tham gia đã tự nguyện khóa ETH, "đặt cọc" nó để có khả năng tham gia vào mạng lưới. Người dùng tuân thủ các quy tắc sẽ được thưởng, trong khi những nỗ lực gian lận có thể bị phạt.

Kể từ khi ra mắt hợp đồng ký gửi vào tháng 11 năm 2020, một số người tiên phong dũng cảm của Ethereum đã tự nguyện khóa tiền để kích hoạt "các trình xác thực", các tài khoản đặc biệt có quyền chính thức chứng thực và đề xuất các khối, tuân theo các quy tắc của mạng lưới.

Trước bản nâng cấp Shanghai/Capella, bạn không thể sử dụng hoặc truy cập ETH đã đặt cọc của mình. Nhưng giờ đây, bạn có thể chọn tự động nhận phần thưởng của mình vào một tài khoản đã chọn và bạn cũng có thể rút ETH đã đặt cọc của mình bất cứ khi nào bạn muốn.

### Tôi cần chuẩn bị như thế nào? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Các lưu ý quan trọng {#important-notices}

Cung cấp địa chỉ rút tiền là một bước bắt buộc đối với bất kỳ tài khoản trình xác thực nào trước khi nó đủ điều kiện để rút ETH khỏi số dư của mình.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Mỗi tài khoản trình xác thực chỉ có thể được chỉ định một địa chỉ rút tiền duy nhất, một lần.** Khi một địa chỉ được chọn và gửi đến lớp đồng thuận, điều này không thể được hoàn tác hoặc thay đổi lại. Hãy kiểm tra kỹ quyền sở hữu và tính chính xác của địa chỉ được cung cấp trước khi gửi.
</AlertDescription>
</AlertContent>
</Alert>

Sẽ **không có mối đe dọa nào đối với tiền của bạn trong thời gian chờ đợi** nếu không cung cấp thông tin này, giả sử cụm từ ghi nhớ/cụm từ hạt giống của bạn vẫn an toàn ngoại tuyến và không bị xâm phạm theo bất kỳ cách nào. Việc không thêm thông tin xác thực rút tiền sẽ chỉ khiến ETH bị khóa trong tài khoản trình xác thực như trước đây cho đến khi địa chỉ rút tiền được cung cấp.

## Các trình xác thực cộng dồn {#compounding-validators}

Các trình xác thực có thể chọn **cộng dồn** bằng cách chuyển đổi thông tin xác thực rút tiền của họ từ Loại 1 sang Loại 2. Điều này nâng số dư hiệu dụng tối đa từ 32 ETH lên **2048 ETH**, cho phép phần thưởng được cộng dồn vào số dư hiệu dụng của trình xác thực thay vì được tự động quét.

Khi tính năng cộng dồn được bật:

- Phần thưởng làm tăng số dư hiệu dụng của trình xác thực theo mức tăng 1 ETH (tùy thuộc vào một [bộ đệm trễ (hysteresis buffer)](https://www.attestant.io/posts/understanding-validator-effective-balance/) nhỏ), kiếm được nhiều phần thưởng hơn theo thời gian
- Việc tự động quét chỉ xảy ra đối với số dư vượt quá 2048 ETH
- Việc rút tiền một phần dưới ngưỡng 2048 ETH phải được kích hoạt thủ công từ lớp thực thi (điều này tốn ga)
- Nhiều trình xác thực có thể được **hợp nhất** thành một trình xác thực cộng dồn duy nhất, giảm chi phí vận hành

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Việc chuyển đổi thông tin xác thực rút tiền từ Loại 1 sang Loại 2 là không thể đảo ngược.** Sử dụng [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) làm công cụ chính thức cho việc chuyển đổi này. Để biết thêm chi tiết về quá trình chuyển đổi, rủi ro và việc hợp nhất, hãy xem [bài viết chuyên sâu về MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Thoát hoàn toàn khỏi việc ký gửi {#exiting-staking-entirely}

Cung cấp địa chỉ rút tiền là bắt buộc trước khi _bất kỳ_ khoản tiền nào có thể được chuyển ra khỏi số dư tài khoản trình xác thực.

Người dùng muốn thoát hoàn toàn khỏi việc ký gửi và rút lại toàn bộ số dư của họ phải bắt đầu một "lệnh thoát tự nguyện". Điều này có thể được thực hiện theo hai cách:

- **Sử dụng khóa trình xác thực**: Ký và phát sóng một tin nhắn thoát tự nguyện bằng ứng dụng khách trình xác thực của bạn, được gửi đến nút đồng thuận của bạn. Điều này không yêu cầu ga.
- **Sử dụng thông tin xác thực rút tiền**: Kích hoạt việc thoát từ lớp thực thi bằng địa chỉ rút tiền của bạn, mà không cần quyền truy cập vào khóa ký của trình xác thực. Điều này yêu cầu một giao dịch và tốn ga.

Quá trình một trình xác thực thoát khỏi việc ký gửi mất một khoảng thời gian khác nhau, tùy thuộc vào việc có bao nhiêu người khác cũng đang thoát cùng một lúc. Sau khi hoàn tất, tài khoản này sẽ không còn chịu trách nhiệm thực hiện các nhiệm vụ mạng lưới của trình xác thực, không còn đủ điều kiện nhận phần thưởng và không còn ETH "được đặt cọc" nữa. Tại thời điểm này, tài khoản sẽ được đánh dấu là hoàn toàn “có thể rút”.

Khi một tài khoản được gắn cờ là "có thể rút" và thông tin xác thực rút tiền đã được cung cấp, người dùng không cần làm gì thêm ngoài việc chờ đợi. Các tài khoản được tự động và liên tục quét bởi người đề xuất khối đối với các khoản tiền đã thoát đủ điều kiện và số dư tài khoản của bạn sẽ được chuyển toàn bộ (còn được gọi là "rút toàn bộ") trong lần <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>quét</a> tiếp theo.

## Tính năng rút tiền ký gửi được kích hoạt khi nào? {#when}

Chức năng rút tiền ban đầu được kích hoạt như một phần của bản nâng cấp Shanghai/Capella vào ngày **12 tháng 4 năm 2023**. [Bản nâng cấp Pectra](/roadmap/pectra/) (tháng 5 năm 2025) sau đó đã giới thiệu các trình xác thực cộng dồn với số dư hiệu dụng tối đa cao hơn là 2048 ETH, cũng như các lệnh thoát và rút tiền một phần được kích hoạt từ lớp thực thi.

Bản nâng cấp Shanghai/Capella cho phép ETH đã đặt cọc trước đó được thu hồi vào các tài khoản Ethereum thông thường. Điều này đã khép lại vòng lặp về thanh khoản ký gửi và đưa Ethereum tiến thêm một bước trên hành trình xây dựng một hệ sinh thái phi tập trung bền vững, có thể mở rộng và an toàn.

- [Tìm hiểu thêm về lịch sử Ethereum](/ethereum-forks/)
- [Tìm hiểu thêm về lộ trình Ethereum](/roadmap/)

## Các khoản thanh toán rút tiền hoạt động như thế nào? {#how-do-withdrawals-work}

Việc một trình xác thực nhất định có đủ điều kiện để rút tiền hay không được xác định bởi trạng thái của chính tài khoản trình xác thực đó. Không cần bất kỳ thao tác nào từ người dùng tại bất kỳ thời điểm nào để xác định xem một tài khoản có nên được khởi tạo rút tiền hay không—toàn bộ quá trình được thực hiện tự động bởi lớp đồng thuận theo một vòng lặp liên tục.

### Bạn thích học qua hình ảnh hơn? {#visual-learner}

Hãy xem video giải thích về việc rút tiền ký gửi Ethereum này của Finematics:

<YouTube id="RwwU3P9n3uo" />

### "Quét" trình xác thực {#validator-sweeping}

Khi một trình xác thực được lên lịch để đề xuất Khối tiếp theo, nó được yêu cầu xây dựng một hàng đợi rút tiền, với tối đa 16 khoản rút tiền đủ điều kiện. Điều này được thực hiện bằng cách bắt đầu với chỉ mục trình xác thực 0, xác định xem có khoản rút tiền đủ điều kiện cho tài khoản này theo các quy tắc của giao thức hay không và thêm nó vào hàng đợi nếu có. Trình xác thực được thiết lập để đề xuất Khối tiếp theo sẽ tiếp tục từ nơi trình xác thực trước đó dừng lại, tiến hành theo thứ tự vô thời hạn.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Hãy nghĩ về một chiếc đồng hồ kim. Kim trên đồng hồ chỉ vào giờ, tiến theo một hướng, không bỏ qua bất kỳ giờ nào và cuối cùng quay trở lại điểm bắt đầu sau khi đạt đến số cuối cùng.

Bây giờ thay vì từ 1 đến 12, hãy tưởng tượng đồng hồ có từ 0 đến N _(tổng số tài khoản trình xác thực đã từng được đăng ký trên lớp đồng thuận, hơn 500.000 tính đến tháng 1 năm 2023)._

Kim trên đồng hồ chỉ vào trình xác thực tiếp theo cần được kiểm tra các khoản rút tiền đủ điều kiện. Nó bắt đầu ở số 0 và tiến hành một vòng mà không bỏ qua bất kỳ tài khoản nào. Khi đạt đến trình xác thực cuối cùng, chu kỳ tiếp tục quay lại từ đầu.
</AlertDescription>
</AlertContent>
</Alert>

#### Kiểm tra tài khoản để rút tiền {#checking-an-account-for-withdrawals}

Trong khi một người đề xuất khối đang quét qua các trình xác thực để tìm các khoản rút tiền có thể xảy ra, mỗi trình xác thực đang được kiểm tra sẽ được đánh giá dựa trên một loạt câu hỏi ngắn để xác định xem có nên kích hoạt rút tiền hay không và nếu có, thì nên rút bao nhiêu ETH.

1. **Địa chỉ rút tiền đã được cung cấp chưa?** Nếu không có địa chỉ rút tiền nào được cung cấp, tài khoản sẽ bị bỏ qua và không có khoản rút tiền nào được khởi tạo.
2. **Trình xác thực đã thoát và có thể rút tiền chưa?** Nếu trình xác thực đã thoát hoàn toàn và chúng ta đã đạt đến kỷ nguyên mà tài khoản của họ được coi là "có thể rút", thì một khoản rút tiền toàn bộ sẽ được xử lý. Điều này sẽ chuyển toàn bộ số dư còn lại đến địa chỉ rút tiền.
3. **Số dư có vượt quá số dư hiệu dụng tối đa không?** Đối với các trình xác thực truyền thống (Loại 1), ngưỡng này là 32 ETH. Đối với các trình xác thực cộng dồn (Loại 2), ngưỡng này là 2048 ETH. Nếu tài khoản có thông tin xác thực rút tiền, chưa thoát hoàn toàn và có số dư trên ngưỡng của nó, một khoản rút tiền một phần sẽ được xử lý, chỉ chuyển phần vượt quá đến địa chỉ rút tiền của người dùng.

Chỉ có hai hành động được thực hiện bởi những người vận hành trình xác thực trong suốt vòng đời của một trình xác thực ảnh hưởng trực tiếp đến luồng này:

- Cung cấp thông tin xác thực rút tiền để kích hoạt bất kỳ hình thức rút tiền nào
- Thoát khỏi mạng lưới, điều này sẽ kích hoạt việc rút toàn bộ tiền

### Miễn phí ga {#gas-free}

Các lần quét rút tiền tự động không yêu cầu những người đặt cọc phải gửi giao dịch theo cách thủ công. Điều này có nghĩa là **không yêu cầu ga (phí giao dịch)** cho các lần quét tự động và chúng không cạnh tranh không gian Khối của lớp thực thi hiện có.

Lưu ý rằng [các trình xác thực cộng dồn](#compounding-validators) muốn kích hoạt rút tiền một phần dưới ngưỡng 2048 ETH phải thực hiện thủ công từ lớp thực thi, điều này yêu cầu ga.

### Bao lâu thì tôi sẽ nhận được phần thưởng ký gửi của mình? {#how-soon}

Tối đa 16 khoản rút tiền có thể được xử lý trong một Khối duy nhất. Với tốc độ đó, 115.200 khoản rút tiền của trình xác thực có thể được xử lý mỗi ngày (giả sử không có slot nào bị bỏ lỡ). Như đã lưu ý ở trên, các trình xác thực không có khoản rút tiền đủ điều kiện sẽ bị bỏ qua, làm giảm thời gian hoàn thành việc quét.

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

## Các câu hỏi thường gặp {#faq}

<ExpandableCard
title="Sau khi tôi đã cung cấp địa chỉ rút tiền, tôi có thể thay đổi nó thành một địa chỉ rút tiền khác không?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Không, quá trình cung cấp thông tin xác thực rút tiền là quá trình chỉ thực hiện một lần và không thể thay đổi sau khi đã gửi.
</ExpandableCard>

<ExpandableCard
title="Tại sao địa chỉ rút tiền chỉ có thể được thiết lập một lần?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Bằng cách thiết lập địa chỉ rút tiền trên lớp thực thi, thông tin xác thực rút tiền cho trình xác thực đó đã bị thay đổi vĩnh viễn. Điều này có nghĩa là thông tin xác thực cũ sẽ không còn hoạt động và thông tin xác thực mới sẽ hướng đến một tài khoản lớp thực thi.

Địa chỉ rút tiền có thể là một hợp đồng thông minh (được kiểm soát bởi mã của nó) hoặc một tài khoản sở hữu ngoại biên (EOA, được kiểm soát bởi khóa riêng tư của nó). Hiện tại, các tài khoản này không có cách nào để truyền đạt một tin nhắn trở lại lớp đồng thuận nhằm báo hiệu sự thay đổi thông tin xác thực của trình xác thực và việc thêm chức năng này sẽ làm tăng thêm sự phức tạp không cần thiết cho giao thức.

Như một giải pháp thay thế cho việc thay đổi địa chỉ rút tiền đối với một trình xác thực cụ thể, người dùng có thể chọn thiết lập một hợp đồng thông minh làm địa chỉ rút tiền của họ, hợp đồng này có thể xử lý việc xoay vòng khóa, chẳng hạn như Safe. Người dùng thiết lập tiền của họ vào EOA của riêng họ có thể thực hiện thoát hoàn toàn để rút tất cả số tiền đã đặt cọc của họ, sau đó ký gửi lại bằng thông tin xác thực mới.
</ExpandableCard>

<ExpandableCard
title="Điều gì xảy ra nếu tôi tham gia vào các token ký gửi hoặc bể đặt cọc"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Nếu bạn là thành viên của một [bể đặt cọc](/staking/pools/) hoặc nắm giữ các token ký gửi, bạn nên kiểm tra với nhà cung cấp của mình để biết thêm chi tiết về cách xử lý việc rút tiền ký gửi, vì mỗi dịch vụ hoạt động khác nhau.

Nhìn chung, người dùng nên được tự do thu hồi ETH đã đặt cọc cơ bản của họ hoặc thay đổi nhà cung cấp dịch vụ ký gửi mà họ sử dụng. Nếu một bể cụ thể trở nên quá lớn, tiền có thể được rút, quy đổi và ký gửi lại với một [nhà cung cấp nhỏ hơn](https://rated.network/). Hoặc, nếu bạn đã tích lũy đủ ETH, bạn có thể [ký gửi tại nhà](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Các khoản thanh toán phần thưởng (rút tiền một phần) có diễn ra tự động không?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Đối với **các trình xác thực truyền thống (Loại 1)**, có — miễn là trình xác thực của bạn đã cung cấp địa chỉ rút tiền. Địa chỉ này phải được cung cấp một lần để kích hoạt bất kỳ khoản rút tiền nào ban đầu, sau đó các khoản thanh toán phần thưởng sẽ tự động được kích hoạt vài ngày một lần với mỗi lần quét trình xác thực.

Đối với **các trình xác thực cộng dồn (Loại 2)**, phần thưởng được cộng dồn vào số dư hiệu dụng thay vì được quét. Việc tự động quét chỉ xảy ra đối với số dư vượt quá 2048 ETH. Để rút phần thưởng dưới ngưỡng này, bạn phải kích hoạt rút tiền một phần theo cách thủ công từ lớp thực thi.
</ExpandableCard>

<ExpandableCard
title="Việc rút toàn bộ tiền có diễn ra tự động không?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Không, nếu trình xác thực của bạn vẫn đang hoạt động trên mạng lưới, việc rút toàn bộ tiền sẽ không diễn ra tự động. Điều này yêu cầu phải bắt đầu một lệnh thoát tự nguyện theo cách thủ công.

Khi một trình xác thực đã hoàn tất quá trình thoát và giả sử tài khoản có thông tin xác thực rút tiền, số dư còn lại _sau đó_ sẽ được rút trong lần <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>quét trình xác thực</a> tiếp theo.

</ExpandableCard>

<ExpandableCard title="Tôi có thể rút một số tiền tùy chỉnh không?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Đối với **các trình xác thực truyền thống (Loại 1)**, các khoản rút tiền được đẩy tự động, chuyển bất kỳ ETH nào không tích cực đóng góp vào việc đặt cọc. Điều này bao gồm toàn bộ số dư cho các tài khoản đã hoàn tất quá trình thoát. Không thể yêu cầu thủ công rút một số lượng ETH cụ thể đối với các trình xác thực Loại 1.

**Các trình xác thực cộng dồn (Loại 2)** có thể kích hoạt rút tiền một phần với một số lượng cụ thể từ lớp thực thi, miễn là số dư còn lại ở mức hoặc trên 32 ETH. Điều này yêu cầu một giao dịch và tốn ga.
</ExpandableCard>

<ExpandableCard
title="Tôi vận hành một trình xác thực. Tôi có thể tìm thêm thông tin về việc kích hoạt rút tiền ở đâu?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Những người vận hành trình xác thực được khuyến nghị truy cập trang [Rút tiền trên Staking Launchpad](https://launchpad.ethereum.org/withdrawals/), nơi bạn sẽ tìm thấy thêm chi tiết về cách chuẩn bị trình xác thực của mình cho việc rút tiền, thời gian của các sự kiện và thêm chi tiết về cách thức hoạt động của việc rút tiền.

Để thử nghiệm thiết lập của bạn trên mạng thử nghiệm trước, hãy truy cập [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org) để bắt đầu.

</ExpandableCard>

<ExpandableCard
title="Tôi có thể kích hoạt lại trình xác thực của mình sau khi thoát bằng cách nạp thêm ETH không?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Không. Khi một trình xác thực đã thoát và toàn bộ số dư của nó đã được rút, bất kỳ khoản tiền bổ sung nào được nạp vào trình xác thực đó sẽ tự động được chuyển đến địa chỉ rút tiền trong lần quét trình xác thực tiếp theo. Để ký gửi lại ETH, một trình xác thực mới phải được kích hoạt.
</ExpandableCard>

<ExpandableCard
title="Sự khác biệt giữa các trình xác thực truyền thống và cộng dồn là gì?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Các trình xác thực truyền thống sử dụng thông tin xác thực rút tiền **Loại 1** và có số dư hiệu dụng được giới hạn ở mức 32 ETH. Bất kỳ phần vượt quá nào đều được tự động quét đến địa chỉ rút tiền vài ngày một lần.

Các trình xác thực cộng dồn sử dụng thông tin xác thực rút tiền **Loại 2** và có thể có số dư hiệu dụng lên đến 2048 ETH. Phần thưởng được cộng dồn vào số dư hiệu dụng của chúng, làm tăng trọng số của trình xác thực trên mạng lưới và phần thưởng trong tương lai. Việc tự động quét chỉ xảy ra đối với số dư vượt quá 2048 ETH. Để rút tiền dưới ngưỡng này, một khoản rút tiền một phần thủ công phải được kích hoạt từ lớp thực thi.

Để biết thêm chi tiết, hãy xem [bài viết chuyên sâu về MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Làm cách nào để tôi chuyển đổi thành một trình xác thực cộng dồn?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Bạn có thể chuyển đổi thông tin xác thực rút tiền từ Loại 1 sang Loại 2 bằng cách sử dụng [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Thao tác này là **không thể đảo ngược** — một khi bạn chuyển đổi, bạn không thể quay lại thông tin xác thực Loại 1.

Sau khi chuyển đổi, bạn cũng có thể **hợp nhất** nhiều trình xác thực thành một, kết hợp số dư của chúng thành một trình xác thực cộng dồn duy nhất. Để xem hướng dẫn đầy đủ về quá trình chuyển đổi, rủi ro và công cụ hợp nhất, hãy xem [bài viết chuyên sâu về MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Rút tiền trên Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Các hành động của trình xác thực trên Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Bài viết chuyên sâu về MaxEB: cộng dồn và hợp nhất](/roadmap/pectra/maxeb/)
- [EIP-4895: Rút tiền đẩy trên chuỗi beacon dưới dạng các hoạt động](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Rút ETH đã đặt cọc (Thử nghiệm) với Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Rút tiền đẩy trên chuỗi beacon dưới dạng các hoạt động với Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Hiểu về số dư hiệu dụng của trình xác thực](https://www.attestant.io/posts/understanding-validator-effective-balance/)