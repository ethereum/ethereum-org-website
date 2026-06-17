---
title: "Staking như một dịch vụ"
description: "Tìm hiểu về staking như một dịch vụ"
lang: vi
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: "Tê giác Leslie lơ lửng trên những đám mây."
sidebarDepth: 2
summaryPoints:
  - Các nhà điều hành nút bên thứ ba xử lý hoạt động của máy khách trình xác thực của bạn
  - Lựa chọn tuyệt vời cho bất kỳ ai có 32 ETH nhưng không cảm thấy thoải mái khi giải quyết sự phức tạp về mặt kỹ thuật của việc chạy một nút
  - Giảm thiểu sự tin cậy và duy trì quyền lưu giữ các khóa rút tiền của bạn
---

## Staking như một dịch vụ là gì? {#what-is-staking-as-a-service}

Staking như một dịch vụ (“SaaS") đại diện cho một danh mục các dịch vụ đặt cọc nơi bạn nạp 32 ETH của riêng mình cho một trình xác thực, nhưng ủy quyền các hoạt động của nút cho một nhà điều hành bên thứ ba. Quá trình này thường bao gồm việc được hướng dẫn qua thiết lập ban đầu, bao gồm việc tạo khóa và nạp tiền, sau đó tải các khóa ký của bạn lên cho nhà điều hành. Điều này cho phép dịch vụ vận hành trình xác thực thay mặt bạn, thường là với một khoản phí hàng tháng.

## Tại sao nên đặt cọc với một dịch vụ? {#why-stake-with-a-service}

Giao thức [Ethereum](/) không hỗ trợ sẵn sự ủy quyền đặt cọc, vì vậy các dịch vụ này đã được xây dựng để đáp ứng nhu cầu này. Nếu bạn có 32 ETH để đặt cọc, nhưng không cảm thấy thoải mái khi xử lý phần cứng, các dịch vụ SaaS cho phép bạn ủy quyền phần khó khăn trong khi bạn kiếm được phần thưởng khối gốc.

<Grid>
  <Card title="Your own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Easy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</Grid>

<StakingComparison page="saas" />

## Những điều cần cân nhắc {#what-to-consider}

Ngày càng có nhiều nhà cung cấp SaaS giúp bạn đặt cọc ETH của mình, nhưng tất cả đều có những lợi ích và rủi ro riêng. Tất cả các tùy chọn SaaS đều yêu cầu các giả định tin cậy bổ sung so với việc đặt cọc tại nhà. Các tùy chọn SaaS có thể có mã bổ sung bao bọc các máy khách Ethereum mà không mở hoặc không thể kiểm toán. SaaS cũng có tác động bất lợi đến sự phi tập trung của mạng lưới. Tùy thuộc vào thiết lập, bạn có thể không kiểm soát được trình xác thực của mình - nhà điều hành có thể hành động không trung thực khi sử dụng ETH của bạn.

Các chỉ báo thuộc tính được sử dụng bên dưới để báo hiệu những điểm mạnh hoặc điểm yếu đáng chú ý mà một nhà cung cấp SaaS được liệt kê có thể có. Sử dụng phần này như một tài liệu tham khảo về cách chúng tôi định nghĩa các thuộc tính này trong khi bạn đang chọn một dịch vụ để hỗ trợ hành trình đặt cọc của mình.

<StakingConsiderations page="saas" />

## Khám phá các nhà cung cấp dịch vụ đặt cọc {#saas-providers}

Dưới đây là một số nhà cung cấp SaaS hiện có. Sử dụng các chỉ báo ở trên để giúp hướng dẫn bạn qua các dịch vụ này

<ProductDisclaimer />

### Các nhà cung cấp SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Xin lưu ý tầm quan trọng của việc hỗ trợ [sự đa dạng máy khách](/developers/docs/nodes-and-clients/client-diversity/) vì nó cải thiện tính bảo mật của mạng lưới và hạn chế rủi ro của bạn. Các dịch vụ có bằng chứng về việc hạn chế sử dụng máy khách chiếm đa số được biểu thị bằng <em style={{ textTransform: "uppercase" }}>"sự đa dạng máy khách thực thi"</em> và <em style={{ textTransform: "uppercase" }}>"sự đa dạng ứng dụng khách đồng thuận."</em>

### Trình tạo khóa {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Bạn có đề xuất về một nhà cung cấp staking như một dịch vụ mà chúng tôi đã bỏ lỡ? Hãy xem [chính sách niêm yết sản phẩm](/contributing/adding-staking-products/) của chúng tôi để xem liệu nó có phù hợp hay không và gửi nó để được xem xét.

## Các câu hỏi thường gặp {#faq}

<ExpandableCard title="Ai giữ khóa của tôi?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Các thỏa thuận sẽ khác nhau tùy theo từng nhà cung cấp, nhưng thông thường bạn sẽ được hướng dẫn thiết lập bất kỳ khóa ký nào bạn cần (một khóa cho mỗi 32 ETH) và tải chúng lên nhà cung cấp của bạn để cho phép họ xác thực thay mặt bạn. Chỉ riêng các khóa ký không cung cấp bất kỳ khả năng nào để rút tiền, chuyển hoặc chi tiêu tiền của bạn. Tuy nhiên, chúng cung cấp khả năng bỏ phiếu hướng tới đồng thuận, điều này nếu không được thực hiện đúng cách có thể dẫn đến các hình phạt ngoại tuyến hoặc phạt cắt giảm.
</ExpandableCard>

<ExpandableCard title="Vậy là có hai bộ khóa?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Có. Mỗi Tài khoản bao gồm cả khóa <em>ký</em> BLS và khóa <em>rút tiền</em> BLS. Để một trình xác thực có thể chứng thực trạng thái của Chuỗi, tham gia vào các ủy ban đồng bộ hóa và đề xuất các khối, các khóa ký phải có thể dễ dàng truy cập được bởi một máy khách trình xác thực. Chúng phải được kết nối với internet dưới một hình thức nào đó và do đó về bản chất được coi là các khóa "nóng". Đây là một yêu cầu để trình xác thực của bạn có thể chứng thực và do đó các khóa được sử dụng để chuyển hoặc rút tiền được tách biệt vì lý do bảo mật.

Các khóa rút tiền BLS được sử dụng để ký một thông điệp một lần nhằm khai báo Tài khoản lớp thực thi nào sẽ nhận được phần thưởng đặt cọc và số tiền đã thoát. Khi thông điệp này được phát sóng, các khóa <em>rút tiền BLS</em> không còn cần thiết nữa. Thay vào đó, quyền kiểm soát đối với số tiền đã rút được ủy quyền vĩnh viễn cho Địa chỉ mà bạn đã cung cấp. Điều này cho phép bạn thiết lập một Địa chỉ rút tiền được bảo mật thông qua kho lưu trữ lạnh của riêng bạn, giảm thiểu rủi ro đối với tiền của trình xác thực của bạn, ngay cả khi người khác kiểm soát các khóa ký trình xác thực của bạn.

Cập nhật thông tin xác thực rút tiền là một bước bắt buộc để cho phép rút tiền\*. Quá trình này liên quan đến việc tạo các khóa rút tiền bằng cách sử dụng cụm từ hạt giống ghi nhớ của bạn.

<strong>Hãy chắc chắn rằng bạn sao lưu cụm từ hạt giống này một cách an toàn, nếu không bạn sẽ không thể tạo các khóa rút tiền của mình khi đến lúc.</strong>

\*Những người đặt cọc đã cung cấp Địa chỉ rút tiền cùng với khoản nạp ban đầu không cần phải thiết lập điều này. Hãy kiểm tra với nhà cung cấp SaaS của bạn để được hỗ trợ về cách chuẩn bị trình xác thực của bạn.
</ExpandableCard>

<ExpandableCard title="Khi nào tôi có thể rút tiền?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Những người đặt cọc cần cung cấp một Địa chỉ rút tiền (nếu chưa được cung cấp trong lần nạp tiền ban đầu) và các khoản thanh toán phần thưởng sẽ bắt đầu được phân phối tự động theo định kỳ vài ngày một lần.

Các trình xác thực cũng có thể thoát hoàn toàn với tư cách là một trình xác thực, điều này sẽ mở khóa số dư ETH còn lại của họ để rút tiền. Các Tài khoản đã cung cấp Địa chỉ rút tiền thực thi và hoàn tất quá trình thoát sẽ nhận được toàn bộ số dư của họ vào Địa chỉ rút tiền được cung cấp trong lần quét trình xác thực tiếp theo.

<ButtonLink href="/staking/withdrawals/">Tìm hiểu thêm về rút tiền đặt cọc</ButtonLink>
</ButtonLink>

<ExpandableCard title="Điều gì sẽ xảy ra nếu tôi bị phạt cắt giảm?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Bằng cách sử dụng một nhà cung cấp SaaS, bạn đang giao phó hoạt động của nút của mình cho người khác. Điều này đi kèm với rủi ro hiệu suất nút kém, nằm ngoài tầm kiểm soát của bạn. Trong trường hợp trình xác thực của bạn bị phạt cắt giảm, số dư trình xác thực của bạn sẽ bị phạt và bị buộc loại khỏi nhóm trình xác thực.

Sau khi hoàn tất quá trình phạt cắt giảm/thoát, số tiền này sẽ được chuyển đến Địa chỉ rút tiền được chỉ định cho trình xác thực. Điều này yêu cầu cung cấp một Địa chỉ rút tiền để kích hoạt. Điều này có thể đã được cung cấp trong lần nạp tiền ban đầu. Nếu không, các khóa rút tiền của trình xác thực sẽ cần được sử dụng để ký một thông điệp khai báo một Địa chỉ rút tiền. Nếu không có Địa chỉ rút tiền nào được cung cấp, tiền sẽ vẫn bị khóa cho đến khi được cung cấp.

Liên hệ với từng nhà cung cấp SaaS để biết thêm chi tiết về bất kỳ bảo đảm hoặc tùy chọn bảo hiểm nào và để được hướng dẫn về cách cung cấp Địa chỉ rút tiền. Nếu bạn muốn kiểm soát hoàn toàn thiết lập trình xác thực của mình, [hãy tìm hiểu thêm về cách tự đặt cọc ETH của bạn](/staking/solo/).
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Thư mục đặt cọc Ethereum](https://www.staking.directory/) - _Eridian và Spacesider_
- [Đánh giá các dịch vụ đặt cọc](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_