---
title: Đặt cọc thanh khoản & đặt cọc chung
description: Tổng quan về đặt cọc thanh khoản và đặt cọc chung trên Ethereum
lang: vi
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Đặt cọc và kiếm phần thưởng với bất kỳ số lượng ETH nào bằng cách hợp lực với những người khác
  - Bỏ qua phần khó khăn và giao phó việc vận hành trình xác thực cho bên thứ ba
  - Giữ các token staking thanh khoản trong ví của riêng bạn
---

## Nhóm đặt cọc là gì? {#what-are-staking-pools}

Nhóm đặt cọc là một phương pháp hợp tác cho phép nhiều người với số lượng ETH nhỏ hơn đạt được mức tối thiểu 32 ETH cần thiết để kích hoạt một trình xác thực trên [Ethereum](/). Chức năng gộp chung không được hỗ trợ nguyên bản trong giao thức, vì vậy các giải pháp đã được xây dựng riêng biệt để giải quyết nhu cầu tham gia với số lượng nhỏ hơn.

Một số nhóm đặt cọc hoạt động bằng cách sử dụng các hợp đồng thông minh, trong đó tiền được gửi vào một hợp đồng quản lý và theo dõi khoản đặt cọc của bạn, đồng thời cấp cho bạn một token biên lai (token staking thanh khoản) đại diện cho giá trị này. Các nhóm khác có thể không liên quan đến hợp đồng thông minh và thay vào đó được làm trung gian ngoài chuỗi.

Các tùy chọn đặt cọc chung khác nhau rất nhiều về mức độ bạn có thể xác minh về chúng. Các nhóm minh bạch, được quản trị bằng giao thức là các hợp đồng thông minh mã nguồn mở trên Ethereum giữ các khoản tiền gửi, công bố các tập hợp người vận hành nút của chúng và phát hành một token có thể quy đổi; mọi thứ hỗ trợ vị thế của bạn đều có thể nhìn thấy trên chuỗi. Các sản phẩm đặt cọc chung không minh bạch, chẳng hạn như một số chương trình lợi suất của sàn giao dịch tập trung, sẽ lưu ký ETH của bạn và bạn không thể xác minh độc lập những gì được đặt cọc thay mặt bạn, nếu có. Phần lớn trang này đề cập đến loại đầu tiên; hãy xem [các sản phẩm đặt cọc chung không minh bạch](#opaque-pooled-products) để biết cách phân biệt.

Mọi tùy chọn đặt cọc chung đều giải quyết vấn đề tiếp cận thực tế của việc đặt cọc với ít hơn 32 ETH, hoặc không cần chạy phần cứng. Nhưng mỗi tùy chọn cũng đặt một bên trung gian giữa người đặt cọc và giao thức Ethereum cốt lõi. Chỉ có [đặt cọc độc lập](/staking/solo/) mới mang lại cho bạn mối quan hệ trực tiếp, không qua trung gian với Ethereum.

## Tại sao nên đặt cọc với một nhóm? {#why-stake-with-a-pool}

Ngoài những lợi ích của việc [tham gia đặt cọc](/staking/), việc đặt cọc với một nhóm còn mang lại một số lợi ích độc đáo.

<Grid>
  <Card title="Low barrier to entry" icon={<Fish />} description="Không phải là cá voi? Không thành vấn đề. Hầu hết các nhóm đặt cọc cho phép bạn đặt cọc hầu như bất kỳ số lượng ETH nào bằng cách hợp lực với những người đặt cọc khác, không giống như đặt cọc độc lập yêu cầu 32 ETH." />
  <Card title="Stake today" icon={<Clock />} description="Đặt cọc với một nhóm dễ dàng như một giao dịch hoán đổi token. Không cần lo lắng về việc thiết lập phần cứng và bảo trì nút. Các nhóm cho phép bạn gửi ETH của mình, điều này cho phép những người vận hành nút chạy các trình xác thực. Phần thưởng sau đó được phân phối cho những người đóng góp trừ đi một khoản phí cho các hoạt động của nút." />
  <Card title="Liquid staking tokens" icon={<Droplets />} description="Nhiều nhóm đặt cọc cung cấp một token đại diện cho yêu cầu nhận đối với số ETH đã đặt cọc của bạn và phần thưởng mà nó tạo ra. Điều này cho phép bạn sử dụng số ETH đã đặt cọc của mình, ví dụ: làm tài sản thế chấp trong các ứng dụng tài chính phi tập trung (DeFi)." />
</Grid>

## So sánh các tùy chọn đặt cọc {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Token staking thanh khoản {#liquid-staking-tokens}

Hầu hết các nhóm đặt cọc minh bạch đều phát hành một **token staking thanh khoản (LST)**, một token ERC-20 đại diện cho yêu cầu nhận đối với số ETH đã đặt cọc và phần thưởng mà nó kiếm được. Khi bạn gửi ETH, giao thức sẽ đặt cọc nó với những người vận hành nút của nó và đúc một token biên lai (LST) vào ví của bạn. Bạn có thể tự giữ token hoặc lưu ký nó với nhà cung cấp bên thứ ba, và có thể chuyển hoặc bán token bất cứ lúc nào. Số ETH cơ sở vẫn được đặt cọc trên lớp đồng thuận. Các giao thức đặt cọc thanh khoản chiếm khoảng một phần ba tổng số ETH được đặt cọc, khiến LST trở thành một trong những cách phổ biến nhất để đặt cọc hiện nay.

### Cách phần thưởng hiển thị trong token {#how-rewards-show-up-in-the-token}

LST phản ánh phần thưởng đặt cọc theo một trong hai cách:

- **Token điều chỉnh cơ sở (Rebasing tokens)** (chẳng hạn như stETH của Lido): số dư token của bạn tăng lên khi phần thưởng tích lũy, vì vậy một token vẫn có giá trị xấp xỉ bằng một ETH.
- **Token tỷ giá hối đoái (Exchange-rate tokens)** (chẳng hạn như rETH của Rocket Pool): số dư token của bạn giữ nguyên, nhưng mỗi token có thể quy đổi thành một lượng ETH ngày càng tăng theo thời gian.

Cả hai thiết kế đều mang lại phần thưởng sau khi trừ đi phí của giao thức đặt cọc. Không có thiết kế nào vốn dĩ tốt hơn, nhưng chúng hoạt động khác nhau trong các ví và ứng dụng DeFi, và được xử lý khác nhau cho mục đích thuế ở một số khu vực pháp lý. Các token điều chỉnh cơ sở thường có các phiên bản "được bọc" (wrapped) không điều chỉnh cơ sở để tương thích với các ứng dụng [DeFi](/glossary/#defi).

### Quy đổi và giao dịch {#redeeming-and-trading}

Có hai cách để thoát khỏi một vị thế LST:

- **Quy đổi thông qua giao thức** để lấy ETH cơ sở. Việc quy đổi phụ thuộc vào việc giao thức có sẵn thanh khoản hay không, có thể là một bộ đệm ETH chưa đặt cọc hoặc các trình xác thực đang thoát thông qua hàng đợi thoát của lớp đồng thuận, điều này có thể mất thời gian.
- **Bán trên thị trường thứ cấp** bất cứ lúc nào. Vì token giao dịch tự do, giá thị trường của nó có thể chênh lệch so với giá trị của ETH hỗ trợ nó, đặc biệt là trong những giai đoạn thị trường căng thẳng.

Kể từ bản nâng cấp Pectra, [các khoản rút tiền được kích hoạt từ lớp thực thi (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) cho phép việc thoát của trình xác thực được kích hoạt trực tiếp từ lớp thực thi bởi người nắm giữ địa chỉ rút tiền. Các giao thức đặt cọc có thể sử dụng tính năng này để đảm bảo các trình xác thực của chúng có thể thoát mà không cần dựa vào sự hợp tác của những người vận hành nút, do đó việc quy đổi ít phụ thuộc vào việc tin tưởng những người vận hành nút hơn so với trước đây.

### Giữ một LST không giống như việc đặt cọc {#holding-an-lst-is-not-the-same-as-staking}

Giao thức Ethereum trả phần thưởng cho các trình xác thực; nó không biết token của bạn tồn tại. Khi bạn giữ một LST, bạn không phải là người đặt cọc theo quan điểm của giao thức. Thay vào đó, bạn nắm giữ một yêu cầu nhận đối với một dịch vụ hoặc hợp đồng thông minh đặt cọc thay mặt bạn. Điều này hoạt động tốt trong điều kiện bình thường, nhưng nó đi kèm với các phụ thuộc về niềm tin bổ sung. Số ETH đã đặt cọc của bạn phụ thuộc vào các hợp đồng, quản trị và những người vận hành của nhóm hoạt động chính xác, chứ không chỉ phụ thuộc vào bản thân Ethereum.

## Rủi ro của các token staking thanh khoản {#risks-of-liquid-staking-tokens}

LST kế thừa các rủi ro cơ bản của việc đặt cọc (chẳng hạn như phạt cắt giảm và hình phạt thời gian ngừng hoạt động đối với các trình xác thực của nhóm) và thêm các lớp rủi ro của riêng chúng:

- **Rủi ro hợp đồng thông minh** - ETH của bạn được giữ bởi các hợp đồng có thể chứa lỗi hoặc bị khai thác. Hãy ưu tiên các giao thức có mã nguồn mở, đã được kiểm toán và thử nghiệm thực tế.
- **Rủi ro thị trường và thanh khoản** - giá thị trường thứ cấp của token có thể giảm xuống dưới giá trị của ETH hỗ trợ nó ("mất chốt"). Nếu việc quy đổi của giao thức diễn ra chậm hoặc bị tắc nghẽn khi bạn muốn thoát, việc bán với giá chiết khấu có thể là lối thoát nhanh duy nhất của bạn.
- **Rủi ro quản trị và nâng cấp** - phí, các tập hợp người vận hành nút và thậm chí cả cách token hoạt động có thể bị thay đổi thông qua quản trị của giao thức và các bản nâng cấp hợp đồng. Là một người nắm giữ token, bạn thường không có quyền bỏ phiếu trong quản trị đó.
- **Sự tập trung của tập hợp người vận hành** - một số nhóm tập trung khoản đặt cọc vào những người vận hành nút mà họ đã chọn. Số lượng lớn ETH được đặt cọc dưới sự kiểm soát của một vài tổ chức tạo điều kiện cho sự kiểm duyệt, trích xuất giá trị và các điểm lỗi duy nhất. Hãy ưu tiên các nhóm có các tập hợp người vận hành phân tán, không cần cấp phép.
- **Chuyển giao phạt cắt giảm** - nếu các trình xác thực của nhóm bị phạt cắt giảm hoặc bị phạt, khoản lỗ thường được chia sẻ cho tất cả những người nắm giữ token theo các quy tắc của giao thức.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
Nhiều nhóm giảm thiểu rủi ro từ người vận hành bằng cách sử dụng **công nghệ trình xác thực phân tán (DVT)**, một phần mềm trung gian chia nhỏ khóa của trình xác thực trên nhiều máy và người vận hành để không có một lỗi hoặc sự xâm phạm đơn lẻ nào có thể làm hỏng trình xác thực. [Tìm hiểu thêm về công nghệ trình xác thực phân tán](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Các sản phẩm đặt cọc chung không minh bạch {#opaque-pooled-products}

Không phải mọi thứ được tiếp thị là "đặt cọc" đều là đặt cọc trên giao thức. Các chương trình "kiếm tiền" hoặc "phần thưởng" của sàn giao dịch tập trung, và một số sản phẩm lợi suất được xây dựng trên các token đặt cọc, gộp chung ETH của khách hàng theo những cách mà bạn không thể kiểm tra:

- **Lưu ký** - nhà cung cấp nắm giữ các khóa rút tiền và ETH.
- **Các điều khoản có thể thay đổi** - lãi suất, thời gian khóa và điều kiện tham gia được thiết lập bởi chính sách của công ty và có thể được sửa đổi bất cứ lúc nào, không giống như các quy tắc được thực thi bởi các hợp đồng trên chuỗi.
- **Có thể hoàn toàn không phải là đặt cọc** - về mặt kỹ thuật, lợi suất có thể đến từ việc cho vay, giao dịch hoặc các hoạt động khác thay vì từ các trình xác thực. Bạn thường không có cách nào để xác minh.
- **Rủi ro đối tác** - nếu nhà cung cấp mất khả năng thanh toán hoặc đóng băng việc rút tiền, sẽ không có gì trên chuỗi để bạn quy đổi.

Để phân biệt một nhóm minh bạch với một sản phẩm không minh bạch, hãy tự hỏi:

1. Bạn có thể xác minh trên chuỗi nơi ETH của bạn đi đến, trong các hợp đồng mã nguồn mở, đã được kiểm toán không?
2. Tập hợp người vận hành nút có được công bố không?
3. Bạn có nhận được một token được giữ trong ví của riêng bạn có thể quy đổi thành ETH cơ sở không?
4. Các quy tắc được thực thi bởi các hợp đồng thông minh và quản trị công khai, hay bởi các điều khoản dịch vụ của một công ty?

Càng nhiều câu hỏi trong số này mà nhà cung cấp chỉ có thể trả lời bằng "hãy tin chúng tôi", thì sản phẩm đó càng không minh bạch.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Một số sản phẩm quảng cáo lợi suất "nâng cao" hoặc "được tăng cường" bằng cách kết hợp đặt cọc với **đặt cọc lại (restaking)**, một trường hợp sử dụng cho LST cam kết số ETH đã đặt cọc để bảo mật các giao thức bổ sung dưới các điều kiện phạt cắt giảm bổ sung. Đặt cọc lại là một danh mục rủi ro riêng biệt và là một ứng dụng mới lạ được xây dựng trên LST, không phải là một hình thức tham gia đặt cọc trực tiếp. Nếu một con số lợi suất cao hơn đáng kể so với tỷ lệ đặt cọc của mạng lưới cốt lõi, bạn nên hỏi chính xác lợi suất tăng thêm đó đến từ đâu. [Đặt cọc lại là gì?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Chạy một nút cho một nhóm {#run-a-node-for-a-pool}

Trở thành một người vận hành nút có ký quỹ cho một nhóm đặt cọc là con đường trung gian giữa việc nắm giữ một token và đặt cọc độc lập. Một số giao thức đặt cọc cho phép các cá nhân chạy các trình xác thực bằng cách sử dụng ETH được gộp chung từ những người dùng khác. Bạn gửi một khoản ký quỹ bằng ETH của riêng mình làm tài sản thế chấp, chạy phần cứng và các khóa, đồng thời kiếm được hoa hồng trên khoản đặt cọc được khớp với bạn.

Ví dụ: các trình xác thực megapool của Rocket Pool yêu cầu khoản ký quỹ 4 ETH cho mỗi trình xác thực và Mô-đun Đặt cọc Cộng đồng của Lido yêu cầu khoảng 2,4 ETH cho khóa trình xác thực đầu tiên (1,5 ETH đối với Những người đặt cọc cộng đồng đã được xác định). Điều này cung cấp cho những người có ít hơn 32 ETH một cách để chạy phần cứng của riêng họ và củng cố tập hợp người vận hành của mạng lưới, đồng thời chấp nhận các quy tắc, yêu cầu hiệu suất và điều kiện phạt của nhóm.

## Những điều cần cân nhắc {#what-to-consider}

Mỗi nhóm và các công cụ hoặc hợp đồng thông minh mà họ sử dụng đã được xây dựng bởi các nhóm khác nhau, và mỗi nhóm đều đi kèm với những lợi ích và rủi ro. Đặt cọc chung hoặc đặt cọc ủy quyền không được hỗ trợ nguyên bản bởi giao thức Ethereum, và tiêu chuẩn vàng cho việc đặt cọc phải luôn là các cá nhân chạy các trình xác thực trên phần cứng của riêng họ bất cứ khi nào có thể.

Các chỉ báo thuộc tính được sử dụng bên dưới để báo hiệu những điểm mạnh hoặc điểm yếu đáng chú ý mà một nhóm đặt cọc được liệt kê có thể có. Hãy sử dụng phần này làm tài liệu tham khảo cho cách chúng tôi định nghĩa các thuộc tính này trong khi bạn đang chọn một nhóm để tham gia.

<StakingConsiderations page="pools" />

## Khám phá các nhóm đặt cọc {#explore-staking-pools}

Có nhiều tùy chọn có sẵn để giúp bạn thiết lập. Hãy sử dụng các chỉ báo ở trên để giúp hướng dẫn bạn qua các công cụ bên dưới.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Xin lưu ý tầm quan trọng của việc chọn một dịch vụ coi trọng [sự đa dạng máy khách](/developers/docs/nodes-and-clients/client-diversity/), vì nó cải thiện tính bảo mật của mạng lưới và hạn chế rủi ro của bạn. Các dịch vụ có bằng chứng về việc hạn chế sử dụng máy khách chiếm đa số được biểu thị bằng <em style={{ textTransform: "uppercase" }}>"sự đa dạng máy khách thực thi"</em> và <em style={{ textTransform: "uppercase" }}>"sự đa dạng ứng dụng khách đồng thuận."</em>

Bạn có đề xuất về một công cụ đặt cọc mà chúng tôi đã bỏ lỡ? Hãy xem [chính sách niêm yết sản phẩm](/contributing/adding-staking-products/) của chúng tôi để xem liệu nó có phù hợp hay không và gửi nó để được xem xét.

<StakingCommunityCallout className="my-16" />

## Các câu hỏi thường gặp {#faq}

<ExpandableCard title="Làm thế nào để tôi kiếm được phần thưởng?">
Thông thường, các token staking thanh khoản ERC-20 được phát hành cho những người đặt cọc và đại diện cho giá trị của số ETH đã đặt cọc của họ cộng với phần thưởng. Phần thưởng đến tay bạn theo một trong hai cách tùy thuộc vào thiết kế token: token điều chỉnh cơ sở làm tăng số dư token của bạn khi phần thưởng tích lũy, trong khi token tỷ giá hối đoái giữ cố định số dư của bạn và có thể quy đổi thành nhiều ETH hơn theo thời gian. Dù bằng cách nào, phần thưởng được phân phối sau khi trừ đi phí của nhóm.
</ExpandableCard>

<ExpandableCard title="Khi nào tôi có thể rút khoản đặt cọc của mình?">
Việc rút tiền đặt cọc đã được kích hoạt kể từ bản nâng cấp Thượng Hải/Capella vào tháng 4 năm 2023. Các tài khoản trình xác thực hỗ trợ các nhóm đặt cọc có thể thoát và rút ETH về địa chỉ rút tiền được chỉ định của chúng, điều này cho phép bạn quy đổi phần đặt cọc của mình lấy ETH cơ sở. Tốc độ quy đổi phụ thuộc vào thanh khoản có sẵn của nhóm bạn và hàng đợi thoát của lớp đồng thuận. Hãy kiểm tra với nhà cung cấp của bạn để xem họ hỗ trợ chức năng này như thế nào.

Kể từ bản nâng cấp Pectra, các nhóm cũng có thể sử dụng các khoản rút tiền được kích hoạt từ lớp thực thi (EIP-7002) để thoát các trình xác thực trực tiếp từ địa chỉ rút tiền, mà không cần dựa vào các khóa ký của những người vận hành nút, làm giảm sự tin tưởng cần thiết để các khoản quy đổi được thực hiện.

Ngoài ra, các nhóm sử dụng token staking thanh khoản ERC-20 cho phép người dùng giao dịch token này trên thị trường mở, cho phép bạn bán vị thế đặt cọc của mình, thực chất là "rút tiền" mà không thực sự loại bỏ ETH khỏi hợp đồng đặt cọc. Lưu ý rằng giá thị trường có thể khác với giá trị quy đổi của token.

<ButtonLink href="/staking/withdrawals/">Tìm hiểu thêm về việc rút tiền đặt cọc</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Điều này có khác với việc đặt cọc trên sàn giao dịch của tôi không?">
Có nhiều điểm tương đồng giữa các tùy chọn đặt cọc chung này và các sàn giao dịch tập trung, chẳng hạn như khả năng đặt cọc số lượng nhỏ ETH và gộp chúng lại với nhau để kích hoạt các trình xác thực.

Không giống như các sàn giao dịch tập trung, nhiều tùy chọn đặt cọc chung khác sử dụng các hợp đồng thông minh và/hoặc các token staking thanh khoản, thường là các token ERC-20 có thể được giữ trong ví của riêng bạn, và được mua hoặc bán giống như bất kỳ token nào khác. Điều này cung cấp một lớp chủ quyền và bảo mật bằng cách cung cấp cho bạn quyền kiểm soát đối với các token của mình, nhưng vẫn không cung cấp cho bạn quyền kiểm soát trực tiếp đối với máy khách trình xác thực đang chứng thực thay mặt bạn ở chế độ nền.

Các chương trình "kiếm tiền" của sàn giao dịch cũng mang tính lưu ký và được quản lý bởi các điều khoản của công ty thay vì các quy tắc trên chuỗi, và lợi suất của chúng có thể hoàn toàn không đến từ việc đặt cọc trên giao thức. Hãy xem [các sản phẩm đặt cọc chung không minh bạch](#opaque-pooled-products) để biết cách phân biệt.

Một số tùy chọn gộp chung phi tập trung hơn những tùy chọn khác khi nói đến các nút hỗ trợ chúng. Để thúc đẩy sự lành mạnh và sự phi tập trung của mạng lưới, những người đặt cọc luôn được khuyến khích chọn một dịch vụ gộp chung cho phép một tập hợp người vận hành nút phi tập trung không cần cấp phép.
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Danh mục đặt cọc Ethereum](https://www.staking.directory/) - _Eridian và Spacesider_
- [Rủi ro của các công cụ phái sinh đặt cọc thanh khoản](https://notes.ethereum.org/@djrtwo/risks-of-lsd) - _Danny Ryan_
- [Đặt cọc thanh khoản là gì?](https://chain.link/education-hub/liquid-staking) - _Chainlink_
- [EIP-7002: Các khoản rút tiền có thể kích hoạt từ lớp thực thi](https://eips.ethereum.org/EIPS/eip-7002) - _Đề xuất Cải tiến Ethereum_
- [Xếp hạng nhóm đặt cọc Ethereum](https://explorer.rated.network/) - _Rated Network Explorer_
- [Sự khác biệt giữa token đặt cọc lại thanh khoản (LRT) và token staking thanh khoản (LST) là gì?](https://liquidcollective.io/lst-vs-lrt/) - _Liquid Collective_