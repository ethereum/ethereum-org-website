---
title: Đặt cọc ủy quyền (staking như một dịch vụ)
description: Tổng quan về cách bắt đầu với đặt cọc ủy quyền
lang: vi
template: staking
image: /images/staking/leslie-saas.png
sidebarDepth: 2
summaryPoints:
  - Các nhà điều hành nút bên thứ ba xử lý hoạt động của máy khách trình xác thực của bạn
  - Một lựa chọn tuyệt vời cho bất kỳ ai có 32 ETH mà không muốn giải quyết sự phức tạp về mặt kỹ thuật khi chạy một nút
  - Sự ủy quyền trải dài trên một phổ rộng, từ các dịch vụ nơi bạn giữ khóa rút tiền của mình cho đến các sàn giao dịch lưu ký hoàn toàn
---

## Đặt cọc ủy quyền là gì? {#what-is-staking-as-a-service}

Đặt cọc ủy quyền đại diện cho một danh mục các dịch vụ đặt cọc nơi bạn nạp 32 ETH của riêng mình cho một trình xác thực, nhưng ủy quyền hoạt động của nút cho một nhà điều hành bên thứ ba. Quá trình này thường bao gồm việc được hướng dẫn qua thiết lập ban đầu, bao gồm tạo khóa và nạp tiền, sau đó tải lên các khóa ký của bạn cho nhà điều hành. Bạn cung cấp ETH, nhưng giao việc vận hành phần cứng của trình xác thực cho người khác.

Giao thức [Ethereum](/) không hỗ trợ gốc sự ủy quyền đặt cọc, vì vậy một loạt các dịch vụ đã được xây dựng để đáp ứng nhu cầu này. Danh mục này được biết đến nhiều nhất là **staking như một dịch vụ (SaaS)**, nhưng nó bao gồm một phổ các thỏa thuận khác nhau ở câu hỏi then chốt là bạn giữ lại bao nhiêu quyền kiểm soát đối với số ETH đã đặt cọc của mình:

- **Staking như một dịch vụ không lưu ký**: bạn giữ các khóa rút tiền của riêng mình và chỉ ủy quyền hoạt động của trình xác thực.
- **Đặt cọc lưu ký hoàn toàn**: nhà cung cấp, thường là một sàn giao dịch, giữ cả khóa và tiền.

So với [đặt cọc độc lập](/staking/solo/), mọi hình thức ủy quyền đều đặt phần mềm trung gian giữa bạn và giao thức Ethereum. Phần mềm trung gian đó là phần mềm và cơ sở hạ tầng do doanh nghiệp của người khác điều hành. Mỗi bước hướng tới sự tiện lợi đều thêm vào một giả định tin cậy, vì vậy trước khi chọn một dịch vụ, hãy xác định xem nó nằm ở đâu trên phổ này.

### Đặt cọc ủy quyền không phải là gì {#what-delegated-staking-is-not}

- **Đặt cọc chung và token staking thanh khoản (LST)**: với các pool, bạn kết hợp bất kỳ số lượng ETH nào với những người đặt cọc khác, thường nhận được một token đại diện cho phần chia sẻ của bạn trong khoản đặt cọc của pool. Bạn không ủy quyền trình xác thực của riêng mình; các hợp đồng thông minh của pool và các nhà điều hành nút kiểm soát các trình xác thực. [Tìm hiểu thêm về đặt cọc chung](/staking/pools/)
- **Hoạt động nút có thế chấp (Bonded node operation)**: một số giao thức đặt cọc cho phép bạn chạy một trình xác thực trên phần cứng của riêng mình với ít hơn 32 ETH bằng cách gửi một khoản thế chấp. Đó là hoạt động nút, ngược lại với sự ủy quyền, và được đề cập cùng với [đặt cọc độc lập](/staking/solo/).

## Tại sao nên ủy quyền việc đặt cọc của bạn? {#why-stake-with-a-service}

Nếu bạn có 32 ETH để đặt cọc, nhưng không cảm thấy thoải mái khi xử lý phần cứng, các dịch vụ đặt cọc ủy quyền cho phép bạn giao phó khía cạnh kỹ thuật trong khi bạn kiếm được phần thưởng khối Ethereum gốc.

<Grid>
  <Card title="Trình xác thực của riêng bạn" icon={<MonitorCheck />} description="Nạp 32 ETH của riêng bạn để kích hoạt bộ khóa ký của riêng bạn sẽ tham gia vào đồng thuận Ethereum. Theo dõi tiến trình của bạn bằng các bảng điều khiển để xem những phần thưởng ETH đó tích lũy." />
  <Card title="Dễ dàng bắt đầu" icon={<Flag />} description="Quên đi các thông số kỹ thuật phần cứng, thiết lập, bảo trì nút và nâng cấp. Các nhà cung cấp cho phép bạn thuê ngoài phần khó khăn bằng cách tải lên thông tin xác thực cho việc ký của riêng bạn, cho phép họ chạy một trình xác thực thay mặt bạn, với một khoản chi phí nhỏ." />
  <Card title="Hạn chế rủi ro của bạn" icon={<ShieldHalf />} description="Với các dịch vụ không lưu ký, bạn giữ quyền kiểm soát các khóa cho phép rút tiền hoặc chuyển số tiền đã đặt cọc. Chúng khác với các khóa ký và có thể được lưu trữ riêng biệt để hạn chế (nhưng không loại bỏ) rủi ro của bạn với tư cách là người đặt cọc." />
</Grid>

## So sánh các tùy chọn đặt cọc {#comparison-of-staking-options}

<StakingComparison page="saas" />

## Phổ ủy quyền {#the-delegation-spectrum}

Các nhà cung cấp khác nhau ở chỗ họ giữ những khóa nào cho bạn, và mỗi khóa họ giữ là thứ mà bạn phải tin tưởng giao cho họ.

### Staking như một dịch vụ không lưu ký {#non-custodial-staking-as-a-service}

Với SaaS không lưu ký, bạn thường được hướng dẫn qua việc tạo các khóa trình xác thực của mình và tự thực hiện khoản nạp 32 ETH, sau đó bạn tải các _khóa ký_ lên cho nhà điều hành. Các khóa ký cho phép nhà điều hành thực hiện các nhiệm vụ của trình xác thực (chứng thực và đề xuất các khối) thay mặt bạn. Việc sử dụng sai chúng có thể khiến trình xác thực của bạn bị phạt hoặc phạt cắt giảm, nhưng chúng không thể được sử dụng để rút tiền, chuyển hoặc tiêu số tiền của bạn.

_Thông tin xác thực rút tiền_ của trình xác thực vẫn trỏ đến một địa chỉ mà bạn kiểm soát. Phần thưởng và số tiền đã thoát chỉ có thể đi đến đó (xem phần mô hình tin cậy bên dưới).

### Các dịch vụ lưu ký và đặt cọc trên sàn giao dịch {#custodial-services-and-exchange-staking}

Ở đầu ủy quyền hoàn toàn của phổ là đặt cọc lưu ký, phổ biến nhất được cung cấp bởi các sàn giao dịch tập trung. Bạn không bao giờ xử lý các khóa; bạn chỉ giữ ETH trong tài khoản nền tảng của mình và chọn tham gia đặt cọc. Đây là trải nghiệm người dùng đơn giản nhất có thể, và nó là một lựa chọn hợp lý cho những người đã giữ tiền trên một sàn giao dịch và chấp nhận rủi ro lưu ký.

Nó cũng yêu cầu sự tin tưởng lớn nhất. Nhà cung cấp kiểm soát cả khóa ký và thông tin xác thực rút tiền; những gì bạn nắm giữ là số dư trên nền tảng của họ, không phải là một trình xác thực. Điều đó có nghĩa là:

- Số ETH đã đặt cọc của bạn phải chịu rủi ro về khả năng thanh toán, bảo mật và tình hình pháp lý của nhà cung cấp, và việc rút tiền phải tuân theo các điều khoản và thời gian xử lý của họ, chứ không chỉ các quy tắc của giao thức Ethereum.
- Bạn không có cách độc lập nào để thoát trình xác thực hoặc thu hồi tiền nếu nhà cung cấp thất bại hoặc đóng băng việc rút tiền.
- Số lượng lớn ETH được đặt cọc dưới một số ít các nhà điều hành sàn giao dịch góp phần vào sự tập trung hóa đặt cọc, và các lựa chọn máy khách của các nhà điều hành này ảnh hưởng đến sức khỏe của mạng lưới. Việc đặt cọc theo cách giữ nhiều quyền kiểm soát hơn trong tay bạn, hoặc chọn các nhà cung cấp được chứng minh là chạy các máy khách thiểu số, sẽ đóng góp nhiều hơn cho khả năng phục hồi của Ethereum.

## Mô hình tin cậy: những gì cần đánh giá {#trust-model-what-to-evaluate}

Đặt cọc ủy quyền luôn có nghĩa là tin tưởng giao cho người khác một phần thiết lập đặt cọc của bạn. Hãy trả lời những câu hỏi này trước khi bàn giao bất cứ thứ gì:

- **Ai giữ các khóa rút tiền?** Thông tin xác thực rút tiền của trình xác thực (loại 0x01 hoặc 0x02) trỏ đến một địa chỉ lớp thực thi mà cuối cùng kiểm soát khoản đặt cọc. Nếu địa chỉ đó là của bạn, thỏa thuận là không lưu ký; nhà điều hành có thể chạy (hoặc quản lý kém) trình xác thực, nhưng ETH chỉ có thể được rút về cho bạn. Nếu thông tin xác thực trỏ đến địa chỉ của nhà cung cấp, bạn đang nắm giữ một lời hứa, không phải là một khoản đặt cọc.
- **Bạn có thể thoát mà không cần nhà điều hành không?** Kể từ [bản nâng cấp Pectra](/roadmap/pectra/), [việc rút tiền được kích hoạt từ lớp thực thi (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) cho phép địa chỉ rút tiền kích hoạt việc thoát trình xác thực (hoặc, đối với các trình xác thực 0x02 gộp, rút tiền một phần số dư trên 32 ETH) trực tiếp từ lớp thực thi, mà không cần các khóa ký. Nó yêu cầu một giao dịch và tốn Gas, nhưng điều đó có nghĩa là một nhà điều hành không phản hồi hoặc ngừng hoạt động không còn có thể bắt trình xác thực của bạn làm con tin, miễn là thông tin xác thực rút tiền là của bạn.
- **Cấu trúc phí là gì?** Các dịch vụ tính một khoản phí cố định hàng tháng hoặc một tỷ lệ phần trăm của phần thưởng. Kiểm tra cách các khoản phí tương tác với thời gian ngừng hoạt động và các hình phạt: ai chịu chi phí nếu nhà điều hành hoạt động kém hiệu quả, và liệu có bất kỳ bảo đảm hoặc bảo hiểm nào được cung cấp hay không.
- **Nhà điều hành chạy những máy khách nào?** Một nhà điều hành chạy đa số [máy khách thực thi hoặc ứng dụng khách đồng thuận](/developers/docs/nodes-and-clients/client-diversity/) sẽ khiến cả khoản đặt cọc của bạn và mạng lưới gặp rủi ro lỗi tương quan nếu máy khách đó có lỗi. Hãy ưu tiên các nhà cung cấp có tài liệu chứng minh việc sử dụng máy khách thiểu số.
- **Dịch vụ có mở và được kiểm toán không?** Các nhà cung cấp có thể chạy phần mềm bổ sung xung quanh các máy khách Ethereum tiêu chuẩn mà không phải là mã nguồn mở hoặc có thể kiểm toán. Hãy tìm kiếm các cuộc kiểm toán công khai, lịch sử hoạt động lâu đời và hồ sơ không bị phạt cắt giảm.
- **Điều gì xảy ra nếu nhà cung cấp biến mất?** Một nhà cung cấp có trách nhiệm sẽ ghi lại quy trình ngừng cung cấp dịch vụ của mình, cung cấp các hướng dẫn rõ ràng về cách bạn thoát trình xác thực của mình, khôi phục các khóa của bạn hoặc tự kích hoạt việc thoát. Nếu câu trả lời phụ thuộc hoàn toàn vào việc nhà cung cấp tiếp tục kinh doanh thì đó là một thỏa thuận lưu ký.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Một số nhà cung cấp có thể chạy trình xác thực của bạn bằng cách sử dụng công nghệ trình xác thực phân tán (DVT)**, chia nhỏ khóa ký trên nhiều nút để không có một máy hoặc nhà điều hành đơn lẻ nào là điểm lỗi. [Tìm hiểu thêm về công nghệ trình xác thực phân tán (DVT)](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Những điều cần cân nhắc {#what-to-consider}

Ngày càng có nhiều nhà cung cấp giúp bạn ủy quyền hoạt động của trình xác thực của mình, nhưng tất cả đều có những lợi ích và rủi ro riêng. Tất cả các tùy chọn ủy quyền đều yêu cầu các giả định tin cậy bổ sung so với đặt cọc độc lập. Các tùy chọn ủy quyền có thể có mã bổ sung bao bọc các máy khách Ethereum mà không mở hoặc không thể kiểm toán. Sự ủy quyền cũng có tác động bất lợi đến sự phi tập trung của mạng lưới. Tùy thuộc vào thiết lập, bạn có thể không kiểm soát được trình xác thực của mình và nhà điều hành có thể hành động không trung thực bằng cách sử dụng ETH của bạn.

Các chỉ báo thuộc tính được sử dụng bên dưới để báo hiệu những điểm mạnh hoặc điểm yếu đáng chú ý mà một nhà cung cấp được liệt kê có thể có. Hãy sử dụng phần này như một tài liệu tham khảo về cách chúng tôi định nghĩa các thuộc tính này trong khi bạn đang chọn một dịch vụ đặt cọc.

<StakingConsiderations page="saas" />

## Khám phá các nhà cung cấp dịch vụ đặt cọc {#saas-providers}

Dưới đây là một số nhà cung cấp staking như một dịch vụ hiện có. Sử dụng các chỉ báo ở trên để giúp hướng dẫn bạn qua các dịch vụ này.

<ProductDisclaimer />

### Các nhà cung cấp SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Xin lưu ý tầm quan trọng của việc hỗ trợ [sự đa dạng máy khách](/developers/docs/nodes-and-clients/client-diversity/) vì nó cải thiện tính bảo mật của mạng lưới và hạn chế rủi ro của bạn. Các dịch vụ có bằng chứng về việc hạn chế sử dụng máy khách đa số được biểu thị bằng <em style={{ textTransform: "uppercase" }}>"sự đa dạng máy khách thực thi"</em> và <em style={{ textTransform: "uppercase" }}>"sự đa dạng ứng dụng khách đồng thuận."</em>

### Trình tạo khóa {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Bạn có đề xuất về một nhà cung cấp staking như một dịch vụ mà chúng tôi đã bỏ lỡ? Hãy xem [chính sách niêm yết sản phẩm](/contributing/adding-staking-products/) của chúng tôi để xem liệu nó có phù hợp hay không và gửi nó để xem xét.

<StakingCommunityCallout className="my-16" />

## Các câu hỏi thường gặp {#faq}

<ExpandableCard title="Ai giữ khóa của tôi?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Các thỏa thuận khác nhau tùy theo từng nhà cung cấp. Với các dịch vụ không lưu ký, bạn sẽ được hướng dẫn qua việc tạo các khóa ký cho trình xác thực của mình (mỗi trình xác thực giữ 32 ETH, hoặc lên đến 2048 ETH với thông tin xác thực gộp (0x02) kể từ bản nâng cấp Pectra), và tải chúng lên nhà cung cấp của bạn để cho phép họ xác thực thay mặt bạn. Chỉ riêng các khóa ký không cung cấp bất kỳ khả năng nào để rút tiền, chuyển hoặc tiêu số tiền của bạn. Tuy nhiên, chúng cung cấp khả năng bỏ phiếu hướng tới đồng thuận, điều này nếu không được thực hiện đúng cách có thể dẫn đến các hình phạt ngoại tuyến hoặc phạt cắt giảm.

Với các dịch vụ lưu ký, chẳng hạn như đặt cọc thông qua một sàn giao dịch tập trung, nhà cung cấp giữ tất cả các khóa: khóa ký và thông tin xác thực rút tiền. Trong trường hợp đó, bạn đang tin tưởng giao cho nhà cung cấp chính số tiền đó, chứ không chỉ là hoạt động của trình xác thực.
</ExpandableCard>

<ExpandableCard title="Vậy là có hai bộ khóa?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Có. Mỗi trình xác thực có các khóa _ký_ và _thông tin xác thực rút tiền_ riêng biệt. Để một trình xác thực chứng thực trạng thái của chuỗi, tham gia vào các ủy ban đồng bộ hóa và đề xuất các khối, các khóa ký phải dễ dàng truy cập được bởi một máy khách trình xác thực. Chúng phải được kết nối với internet dưới một hình thức nào đó, và do đó về bản chất được coi là các khóa "nóng". Các khóa kiểm soát số tiền được rút ra được giữ riêng biệt vì lý do bảo mật.

Thông tin xác thực rút tiền chỉ định địa chỉ lớp thực thi mà phần thưởng đặt cọc và số tiền đã thoát sẽ đi đến. Các công cụ nạp tiền hiện đại cho phép bạn thiết lập địa chỉ này tại thời điểm nạp tiền, dưới dạng thông tin xác thực thông thường (0x01) hoặc gộp (0x02), và nó phải là một địa chỉ mà bạn kiểm soát, lý tưởng nhất là được bảo mật trong kho lưu trữ lạnh. Điều này bảo vệ tiền của bạn ngay cả khi người khác kiểm soát các khóa ký trình xác thực của bạn, và kể từ bản nâng cấp Pectra, nó cũng cho phép bạn thoát trình xác thực trực tiếp từ địa chỉ đó.

Các trình xác thực được thiết lập trong những ngày đầu của mạng lưới mà không có địa chỉ rút tiền thực thi sử dụng các khóa rút tiền BLS cũ, và phải ký một thông điệp một lần khai báo một địa chỉ rút tiền trước khi việc rút tiền có thể bắt đầu. Điều này liên quan đến việc tạo lại các khóa rút tiền từ cụm từ hạt giống ghi nhớ được tạo lúc thiết lập.

**Hãy chắc chắn rằng bạn sao lưu cụm từ hạt giống này một cách an toàn, nếu không bạn sẽ không thể tạo các khóa rút tiền của mình khi đến lúc.**

Hãy kiểm tra với nhà cung cấp của bạn để được hỗ trợ về cách chuẩn bị trình xác thực của bạn.
</ExpandableCard>

<ExpandableCard title="Khi nào tôi có thể rút tiền?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Cách thức hoạt động của việc rút tiền phụ thuộc vào loại thông tin xác thực rút tiền của trình xác thực của bạn. Đối với các trình xác thực thông thường (0x01), bất kỳ số dư nào trên 32 ETH sẽ tự động được chuyển đến địa chỉ rút tiền theo định kỳ vài ngày một lần. Đối với các trình xác thực gộp (0x02), phần thưởng gộp vào số dư của trình xác thực lên đến 2048 ETH, và việc rút tiền dưới mức đó yêu cầu kích hoạt rút tiền một phần từ địa chỉ rút tiền của bạn, điều này tốn Gas.

Các trình xác thực cũng có thể thoát hoàn toàn, điều này mở khóa toàn bộ số dư ETH còn lại. Sau khi hoàn tất quá trình thoát, toàn bộ số dư sẽ được chuyển đến địa chỉ rút tiền trong lần quét trình xác thực tiếp theo.

<ButtonLink href="/staking/withdrawals/">Tìm hiểu thêm về rút tiền đặt cọc</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Điều gì xảy ra nếu nhà cung cấp của tôi biến mất hoặc không thoát trình xác thực của tôi?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
Nếu thông tin xác thực rút tiền của bạn trỏ đến một địa chỉ mà bạn kiểm soát, bạn có thể tự thoát trình xác thực và thu hồi khoản đặt cọc của mình; xem [Mô hình tin cậy: những gì cần đánh giá](#trust-model-what-to-evaluate).

Nếu nhà cung cấp giữ thông tin xác thực rút tiền (như với đặt cọc lưu ký và trên sàn giao dịch), không có cách nào ở cấp độ giao thức để bạn thu hồi tiền một cách độc lập; phương sách của bạn bị giới hạn trong các quy trình riêng của nhà cung cấp.
</ExpandableCard>

<ExpandableCard title="Điều gì xảy ra nếu tôi bị phạt cắt giảm?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Bằng cách sử dụng một nhà cung cấp đặt cọc ủy quyền, bạn đang giao phó hoạt động của nút của mình cho người khác. Điều này đi kèm với rủi ro hiệu suất nút kém, điều không nằm trong tầm kiểm soát của bạn. Trong trường hợp trình xác thực của bạn bị phạt cắt giảm, một hình phạt ban đầu tỷ lệ thuận với số dư của trình xác thực của bạn sẽ được áp dụng (được làm nhỏ hơn đáng kể trong bản nâng cấp Pectra), và trình xác thực của bạn bị buộc phải thoát khỏi tập hợp trình xác thực.

Sau khi hoàn tất quá trình phạt cắt giảm/thoát, số tiền còn lại sẽ được chuyển đến địa chỉ rút tiền được chỉ định cho trình xác thực.

Liên hệ với từng nhà cung cấp để biết thêm chi tiết về bất kỳ bảo đảm hoặc tùy chọn bảo hiểm nào. Nếu bạn muốn kiểm soát hoàn toàn thiết lập trình xác thực của mình, [hãy tìm hiểu thêm về cách đặt cọc độc lập ETH của bạn](/staking/solo/).
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Staking như một dịch vụ là gì?](https://figment.io/insights/what-is-staking-as-a-service/) - _Figment_
- [Danh mục đặt cọc Ethereum](https://www.staking.directory/) - _Eridian và Spacesider_
- [Đánh giá các dịch vụ đặt cọc](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
- [EIP-7002: Việc rút tiền có thể kích hoạt từ lớp thực thi](https://eips.ethereum.org/EIPS/eip-7002) - _đặc tả cho việc thoát một trình xác thực từ địa chỉ rút tiền của nó_