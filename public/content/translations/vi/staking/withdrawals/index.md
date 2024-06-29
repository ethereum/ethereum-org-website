---
title: Rút tài sản đặt cược
description: Trang tóm tắt về rút tiền đẩy đặt cược là gì, cách chúng hoạt động và những gì người góp cổ phần cần làm để nhận được phần thưởng
lang: vi
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Tê giác Leslie và phần thưởng đặt cọc
sidebarDepth: 2
summaryPoints:
  - Bản nâng cấp Shanghai/Capella cho phép rút đặt cọc trên Ethereum
  - Các nhà điều hành nút xác thực phải cung cấp địa chỉ rút tiền để kích hoạt
  - Phần thưởng được tự động phân phối vài ngày một lần
  - Nút xác thực nào đã thoát đặt cọc hoàn toàn sẽ nhận được số dư còn lại
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Việc rút đặt cọc đã được kích hoạt khi nâng cấp Shanghai/Capella vào ngày 12 tháng 4 năm 2023.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Thông tin thêm về Shanghai/Capella</a>
</UpgradeStatus>

**Rút đặt cọc** đề cập đến việc chuyển ETH từ tài khoản xác thực trên lớp đồng thuận của Ethereum (Chuỗi Beacon), sang lớp thực thi nơi nó có thể được giao dịch.

**Các khoản thanh toán phần thưởng của số dư vượt mức** trên 32 ETH sẽ được tự động phân phối định kỳ đến địa chỉ rút tiền được liên kết với mỗi nút xác thực, sau khi người dùng cung cấp địa chỉ này. Người dùng cũng có thể **thoát đặt cọc hoàn toàn**, qua đó mở khóa toàn bộ số dư nút xác thực của họ.

## Phần thưởng góp cổ phần {#staking-rewards}

Quá trình xử lý phần thưởng tự động được kích hoạt cho các tài khoản nút xác thực đang hoạt động với số dư tối đa là 32 ETH.

Mọi số dư vượt quá 32 ETH kiếm được thông qua phần thưởng sẽ không được tính vào vốn gốc hoặc làm tăng trọng số của nút xác thực trên mạng lưới. Số dư này sẽ được tự động rút về ví dưới dạng phần thưởng vài ngày một lần. Ngoài việc cung cấp địa chỉ rút tiền một lần, nhà điều hành nút xác thực không cần thực hiện thao tác nào khác để nhận thưởng. Toàn bộ quá trình này được khởi tạo trên lớp đồng thuận, do đó không yêu cầu gas (phí giao dịch) ở bất kỳ bước nào.

### Chúng tôi đã đến được cột mốc này như thế nào? {#how-did-we-get-here}

Trong vài năm qua, Ethereum đã trải qua nhiều nâng cấp mạng lưới, chuyển đổi sang một mạng lưới được bảo mật bằng chính ETH, thay vì phương thức khai thác tốn nhiều năng lượng như trước đây. Tham gia đồng thuận trên Ethereum hiện được gọi là "đặt cọc", vì những người tham gia đã tự nguyện khóa ETH, "đặt cọc" nó để có khả năng tham gia vào mạng lưới. Người dùng tuân theo các quy tắc sẽ được thưởng, trong khi cố tình gian lận có thể bị phạt.

Kể từ khi hợp đồng đặt cọc ra mắt vào tháng 11 năm 2020, một số người tiên phong dũng cảm của Ethereum đã tự nguyện khóa tiền để kích hoạt các "nút xác thực", đây là những tài khoản đặc biệt có quyền chính thức chứng thực và đề xuất các khối, tuân theo các quy tắc của mạng lưới.

Trước bản nâng cấp Shanghai/Capella, bạn không thể sử dụng hoặc truy cập vào ETH mà bạn đã đặt cọc. Thế nhưng bây giờ, bạn có thể chọn nhận tự động phần thưởng vào một tài khoản đã chọn và cũng có thể rút ETH đã góp bất cứ lúc nào bạn muốn.

### Tôi cần chuẩn bị như thế nào? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Các lưu ý quan trọng {#important-notices}

Cung cấp địa chỉ rút tiền là bước bắt buộc đối với tất cả tài khoản nút xác thực trước khi có thể rút ETH từ số dư của tài khoản đó.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Mỗi tài khoản nút xác thực chỉ có một địa chỉ rút tiền duy nhất, vào một thời điểm.</strong> Sau khi chọn và gửi địa chỉ lên lớp đồng thuận, bạn sẽ không thể hoàn tác hoặc thay đổi lại. Hãy kiểm tra thật kỹ quyền sở hữu và độ chính xác của địa chỉ được cung cấp trước khi nộp.
</InfoBanner>

Trong thời gian chờ đợi, việc chưa cung cấp địa chỉ rút tiền sẽ <strong>không gây rủi ro cho tiền của bạn</strong> nếu cụm từ khởi tạo/mnemonic của bạn được giữ an toàn ngoại tuyến và không bị xâm phạm theo bất kỳ cách nào. Không thêm thông tin xác thực rút tiền sẽ khiến ETH bị khóa trong tài khoản nút xác thực cho đến khi bạn cung cấp địa chỉ rút tiền.

## Thoát đặt cọc hoàn toàn {#exiting-staking-entirely}

Cung cấp địa chỉ rút tiền là điều kiện tiên quyết trước khi _bất kỳ_ khoản tiền nào có thể được chuyển ra khỏi số dư tài khoản nút xác thực.

Người dùng muốn thoát đặt cọc hoàn toàn và rút toàn bộ số dư cần phải ký và phát một tin nhắn "thoát tự nguyện" bằng khóa nút xác thực, đây là hành động bắt đầu quá trình thoát đặt cọc. Tác vụ này được thực hiện với máy khách nút xác thực của bạn và được gửi đến nút đồng thuận của bạn, không cần gas.

Thời gian thoát đặt cọc của một nút xác thực là không cố định, phụ thuộc vào số lượng nút xác thực khác đang thoát cùng lúc. Khi hoàn tất, tài khoản này sẽ không còn chịu trách nhiệm thực hiện các nhiệm vụ mạng của nút xác thực, không còn đủ điều kiện nhận thưởng và không còn ETH "được đặt cọc" nữa. Lúc này, tài khoản sẽ được đánh dấu là "có thể rút hoàn toàn".

Sau khi một tài khoản được đánh dấu là "có thể rút hoàn toàn" và đã cung cấp thông tin xác thực rút tiền, người dùng không cần thực hiện thêm bất kỳ thao tác nào khác ngoài việc chờ đợi. Các trình đề xuất khối sẽ quét tài khoản tự động và liên tục để tìm số tiền rút đủ điều kiện và số dư tài khoản của bạn sẽ được chuyển đầy đủ (còn được gọi là "rút toàn bộ") trong lần <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>quét</a> tiếp theo.

## Khi nào thì được phép rút cổ phần? {#when}

Đặt cọc nay đã khả dụng! Tính năng rút tiền được kích hoạt khi nâng cấp Shanghai/Capella vào ngày 12 tháng 4 năm 2023.

Bản nâng cấp Shanghai/Capella cho phép người dùng lấy lại ETH đã đặt cọc trước đó vào các tài khoản Ethereum thông thường. Điều này giúp hoàn thiện tính thanh khoản của đặt cọc và đưa Ethereum tiến thêm một bước nữa trên hành trình xây dựng một hệ sinh thái phi tập trung bền vững, có khả năng mở rộng và bảo mật.

- [Thông tin thêm về lịch sử của Ethereum](/history/)
- [Thông tin thêm về lộ trình của Ethereum](/roadmap/)

## Thanh toán rút tiền hoạt động như thế nào? {#how-do-withdrawals-work}

Nút xác thực có đủ điều kiện để rút tiền hay không sẽ phụ thuộc vào tình trạng của chính tài khoản nút xác thực đó. Người dùng không cần phải can thiệp để bắt đầu quá trình rút tiền cho tài khoản. Toàn bộ quá trình được thực hiện tự động bởi lớp đồng thuận theo một vòng lặp liên tục.

### Tìm hiểu thêm từ video trực quan? {#visual-learner}

Hãy xem qua giải thích này của Finematics về rút cổ phần Ethereum:

<YouTube id="RwwU3P9n3uo" />

### "Quét" nút xác thực {#validator-sweeping}

Khi một nút xác thực được chọn để đề xuất khối tiếp theo, cần xây dựng một hàng đợi rút tiền, tối đa 16 lệnh rút tiền hợp lệ. Quá trình này được thực hiện bằng cách bắt đầu với nút xác thực có chỉ số 0, kiểm tra xem theo quy tắc của giao thức, tài khoản này có lệnh rút tiền hợp lệ không và thêm nó vào danh sách nếu có. Nút xác thực được chọn để đề xuất khối tiếp theo sẽ bắt đầu từ vị trí nút xác thực trước đó dừng lại và tiếp tục theo thứ tự vô hạn.

<InfoBanner emoji="🕛">
Hãy tưởng tượng một chiếc đồng hồ kim. Kim đồng hồ chỉ giờ, di chuyển theo một hướng, không bỏ qua giờ nào và cuối cùng quay trở lại vị trí ban đầu sau khi đến số cuối cùng.<br/><br/>
Bây giờ, thay vì từ 1 đến 12, hãy tưởng tượng chiếc đồng hồ có các số từ 0 đến N <em>(tổng số tài khoản nút xác thực từng được đăng ký trên lớp đồng thuận, tính đến tháng 1 năm 2023 là hơn 500.000).</em><br/><br/>
Kim đồng hồ sẽ di chuyển đến nút xác thực tiếp theo cần được kiểm tra xem có lệnh rút tiền hợp lệ không. Kim bắt đầu từ 0 và di chuyển theo vòng tròn mà không bỏ qua bất kỳ tài khoản nào. Khi đến nút xác thực cuối cùng, chu kỳ sẽ tiếp tục trở lại từ đầu.
</InfoBanner>

#### Kiểm tra tài khoản để tìm các lệnh rút tiền {#checking-an-account-for-withdrawals}

Khi trình đề xuất đang quét danh sách nút xác thực để tìm các lệnh rút tiền khả thi, mỗi nút xác thực đang được kiểm tra sẽ được đánh giá dựa trên một loạt câu hỏi ngắn để xác định xem có nên kích hoạt rút tiền hay không và nếu có, thì cần rút bao nhiêu ETH.

1. **Địa chỉ rút tiền đã được cung cấp chưa?** Nếu chưa cung cấp địa chỉ rút tiền, tài khoản sẽ bị bỏ qua và không bắt đầu quá trình rút tiền.
2. **Nút xác thực đã thoát chưa và có thể rút tiền chưa?** Nếu nút xác thực đã thoát hoàn toàn và đạt đến tham số epoch mà tài khoản được coi là "có thể rút tiền", thì lệnh rút tiền đầy đủ sẽ được xử lý. Bước này sẽ chuyển toàn bộ số dư còn lại đến địa chỉ rút.
3. **Số dư hiệu dụng có đạt tối đa 32 không?** Nếu tài khoản có thông tin xác thực rút tiền, chưa thoát hoàn toàn và có phần thưởng vượt quá 32 đang chờ đợi, một lệnh rút tiền một phần sẽ được xử lý, chuyển phần thưởng vượt quá 32 đó vào địa chỉ rút tiền của người dùng.

Chỉ có hai thao tác của nhà điều hành nút xác thực trong suốt vòng đời của nút xác thực ảnh hưởng trực tiếp đến luồng này:

- Cung cấp thông tin xác thực rút tiền để kích hoạt bất kỳ hình thức rút tiền nào
- Thoát khỏi mạng lưới, từ đó kích hoạt lệnh rút toàn bộ

### Không cần gas {#gas-free}

Phương pháp rút đặt cọc này tránh yêu cầu người đặt cọc gửi thủ công giao dịch yêu cầu rút một lượng ETH cụ thể. Điều này có nghĩa là **không cần gas (phí giao dịch)**, và các lệnh rút tiền cũng không cạnh tranh giành không gian khối trên lớp thực thi hiện có.

### Tôi sẽ được nhận phần thưởng đặt cọc bao lâu một lần? {#how-soon}

Có thể xử lý tối đa 16 lệnh rút tiền trong một khối duy nhất. Với tốc độ đó, có thể xử lý 115.200 lệnh rút tiền của nút xác thực mỗi ngày (giả sử không có vị trí nào bị bỏ qua). Như đã đề cập ở trên, các nút xác thực không có lệnh rút tiền hợp lệ sẽ bị bỏ qua, giúp giảm thời gian quét danh sách.

Mở rộng phép tính này, chúng ta có thể ước tính thời gian cần thiết để xử lý một số lượng lần rút tiền nhất định:

<TableContainer>

| Số lần rút tiền | Thời gian hoàn thành |
| :-------------------: | :--------------: |
|        400,000        |     3,5 ngày     |
|        500,000        |     4,3 ngày     |
|        600,000        |     5,2 ngày     |
|        700,000        |     6,1 ngày     |
|        800,000        |     7,0 ngày     |

</TableContainer>

Như bạn có thể thấy, hoạt động sẽ chậm lại khi có nhiều nút xác thực hơn trên mạng lưới. Tăng số lượng vị trí bị bỏ qua có thể làm chậm quá trình này một cách tương ứng, nhưng điều này thường thể hiện ngưỡng thời gian thấp hơn trong số các kết quả có thể xảy ra.

## Những câu hỏi thường gặp {#faq}

<ExpandableCard
title="Sau khi cung cấp địa chỉ rút tiền, tôi có thể thay đổi sang địa chỉ rút tiền khác không?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Không, cung cấp thông tin xác thực rút tiền chỉ là thao tác thực hiện một lần và không thể thay đổi sau khi đã gửi.
</ExpandableCard>

<ExpandableCard
title="Tại sao địa chỉ rút tiền chỉ được thiết lập một lần?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Khi thiết lập địa chỉ rút tiền trên lớp thực thi, thông tin xác thực rút tiền cho nút xác thực đó đã thay đổi vĩnh viễn. Điều này có nghĩa là thông tin xác thực cũ sẽ không còn có hiệu lực và thông tin xác thực mới sẽ chuyển hướng trực tiếp đến tài khoản lớp thực thi.

Địa chỉ rút tiền có thể là một trong hai loại: hợp đồng thông minh (hoạt động theo mã của hợp đồng) hoặc tài khoản do người dùng sở hữu (EOA, được kiểm soát bởi khóa riêng). Hiện tại, các tài khoản này không có cách nào gửi tin nhắn ngược lại lớp đồng thuận để báo hiệu có thay đổi thông tin nút xác thực, thêm chức năng này sẽ làm phức tạp thêm giao thức một cách không cần thiết.

Thay vì thay đổi địa chỉ rút tiền cho từng nút xác thực, người dùng có thể thiết lập hợp đồng thông minh làm địa chỉ rút tiền. Loại hợp đồng này có khả năng xử lý xoay vòng khóa, ví dụ như Safe. Đối với những người dùng thiết lập rút tiền về EOA riêng, họ có thể thực hiện thoát hoàn toàn để rút tất cả tiền đã góp và sau đó đặt cọc lại bằng thông tin xác thực mới.
</ExpandableCard>

<ExpandableCard
title="Nếu tôi tham gia đặt cọc token hoặc đặt cọc theo nhóm thì sao"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Nếu bạn đang tham gia một <a href="/staking/pools/">nhóm đặt cọc</a> hoặc nắm giữ token góp cổ phần, bạn nên liên hệ với nhà cung cấp dịch vụ của mình để biết thêm chi tiết về cách thức xử lý rút tiền đặt cọc, vì mỗi dịch vụ hoạt động khác nhau.

Nhìn chung, người dùng cần được đảm bảo quyền rút lại ETH gốc đã góp hoặc thay đổi nhà cung cấp góp cổ phần mà họ sử dụng. Ví dụ, nếu một nhóm góp cổ phần nào đó trở nên quá lớn, bạn có thể thoát, đổi thưởng và đặt cọc lại với một <a href="https://rated.network/">nhà cung cấp nhỏ hơn</a>. Hoặc nếu bạn đã tích lũy đủ ETH, bạn có thể <a href="/staking/solo/">tự đặt cọc tại nhà</a>.

</ExpandableCard>

<ExpandableCard
title="Việc thanh toán phần thưởng (rút tiền một phần) có tự động được thực hiện không?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Có, miễn là nút xác thực của bạn đã cung cấp địa chỉ rút tiền. Địa chỉ này phải được cung cấp một lần để thực hiện bất kỳ lệnh rút tiền ban đầu nào, sau đó các khoản thanh toán phần thưởng sẽ được tự động kích hoạt vài ngày một lần với mỗi đợt quét nút xác thực.
</ExpandableCard>

<ExpandableCard
title="Rút toàn bộ số tiền có diễn ra tự động không?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Không, nếu nút xác thực của bạn vẫn hoạt động trên mạng lưới, thì sẽ không tự động rút toàn bộ tiền. Thao tác này yêu cầu khởi chạy thủ công bằng lệnh thoát tự nguyện.

Sau khi nút xác thực hoàn tất quá trình thoát và tài khoản có thông tin xác thực rút tiền, số dư còn lại <em>sau đó</em> sẽ được tự động rút trong lần <a href="#validator-sweeping">quét nút xác thực</a> kế tiếp.

</ExpandableCard>

<ExpandableCard title="Tôi có thể rút một số tiền tùy ý không?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Có thể rút tiền tự động, chuyển bất kỳ ETH nào không chủ động tham gia đặt cọc. Lệnh rút tự động này sẽ bao gồm toàn bộ số dư của các tài khoản đã hoàn thành quá trình thoát.

Người dùng không thể yêu cầu rút thủ công một số tiền ETH cụ thể.
</ExpandableCard>

<ExpandableCard
title="Tôi điều hành một nút xác thực. Tôi có thể tìm thêm thông tin về kích hoạt các lệnh rút tiền ở đâu?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Các nhà điều hành nút xác thực được khuyến nghị truy cập trang <a href="https://launchpad.ethereum.org/withdrawals/">Rút tiền trên Staking Launchpad</a> để biết thêm chi tiết về cách chuẩn bị nút xác thực để rút tiền, thời gian diễn ra sự kiện và nhiều thông tin hơn về cách thức hoạt động của chức năng rút tiền.

Để thử thiết lập trên mạng thử nghiệm trước, hãy truy cập <a href="https://holesky.launchpad.ethereum.org">Staking Launchpad của Mạng thử nghiệm Holesky</a> để bắt đầu.

</ExpandableCard>

<ExpandableCard
title="Tôi có thể kích hoạt lại nút xác thực sau khi thoát bằng cách đặt cọc thêm ETH không?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Không. Sau khi nút xác thực đã thoát và rút toàn bộ số dư, bất kỳ khoản tiền nào gửi thêm vào nút xác thực đó sẽ tự động được chuyển đến địa chỉ rút tiền trong lần quét nút xác thực tiếp theo. Để góp lại ETH, cần phải kích hoạt một nút xác thực mới.
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Rút tiền trên Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Chuỗi Beacon đẩy các lệnh rút tiền dưới dạng thao tác](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders - Thượng Hải](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Rút ETH đã góp (Thử nghiệm) với Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Các lệnh rút tiền đẩy của Chuỗi Beacon dưới dạng thao tác với Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Giải thích về số dư hiệu quả của nút xác thực](https://www.attestant.io/posts/understanding-validator-effective-balance/)
