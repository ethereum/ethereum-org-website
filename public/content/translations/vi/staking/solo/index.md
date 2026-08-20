---
title: Đặt cọc ETH tại nhà
description: Tổng quan về cách bắt đầu đặt cọc ETH tại nhà
lang: vi
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - Nhận phần thưởng tối đa trực tiếp từ giao thức nhờ việc giữ cho trình xác thực của bạn hoạt động bình thường và trực tuyến
  - Chạy phần cứng tại nhà và đích thân đóng góp vào tính bảo mật và sự phi tập trung của mạng lưới Ethereum
  - Loại bỏ sự tin cậy và không bao giờ từ bỏ quyền kiểm soát các khóa đối với tiền của bạn
---

## Đặt cọc tại nhà là gì? {#what-is-solo-staking}

Đặt cọc tại nhà là hành động [chạy một nút Ethereum](/run-a-node/) được kết nối với internet và đặt cọc ít nhất 32 ETH để kích hoạt một [trình xác thực](#faq), mang lại cho bạn khả năng tham gia trực tiếp vào sự đồng thuận của mạng lưới.

Đặt cọc tại nhà là cách trực tiếp nhất để đặt cọc. Không có hợp đồng thông minh, nhà điều hành hoặc người giám sát nào đứng giữa bạn và giao thức. Bạn giữ các khóa của riêng mình, tích cực tham gia vào việc xác thực mạng lưới [Ethereum](/) và nhận phần thưởng mạng lưới trực tiếp. Mọi phương pháp đặt cọc khác đều thêm các lớp công nghệ, phần mềm trung gian hoặc dịch vụ lên trên hoạt động mạng lưới cốt lõi này.

**Đặt cọc tại nhà làm tăng sự phi tập trung của mạng lưới Ethereum**, giúp Ethereum có khả năng chống kiểm duyệt tốt hơn và mạnh mẽ hơn trước các cuộc tấn công. Các phương pháp đặt cọc khác có thể không giúp ích cho mạng lưới theo những cách tương tự. Đặt cọc tại nhà là lựa chọn đặt cọc tốt nhất để bảo mật Ethereum.

Một nút Ethereum bao gồm cả máy khách lớp thực thi (EL) cũng như máy khách lớp đồng thuận (CL). Các máy khách này là phần mềm hoạt động cùng nhau, cùng với một bộ khóa ký hợp lệ, để xác minh các giao dịch và khối, chứng thực phần đầu chính xác của chuỗi, tổng hợp các chứng thực và đề xuất các khối.

Những người đặt cọc tại nhà chịu trách nhiệm vận hành phần cứng cần thiết để chạy các máy khách này. Chúng tôi đặc biệt khuyến nghị sử dụng một máy chuyên dụng cho việc này mà bạn vận hành từ nhà – điều này cực kỳ có lợi cho sức khỏe của mạng lưới.

Người đặt cọc tại nhà nhận được phần thưởng trực tiếp từ giao thức nhờ việc giữ cho trình xác thực của họ hoạt động bình thường và trực tuyến.

## Tại sao nên đặt cọc từ nhà? {#why-stake-solo}

Đặt cọc tại nhà đi kèm với nhiều trách nhiệm hơn nhưng cung cấp cho bạn quyền kiểm soát tối đa đối với tiền và thiết lập đặt cọc của mình.

<Grid>
  <Card title="Giữ toàn bộ phần thưởng" icon={<HandCoins />} description="Những người đặt cọc tại nhà nhận được 100% phần thưởng giao thức, được trả trực tiếp bởi giao thức trong khi trình xác thực của bạn trực tuyến." />
  <Card title="Tự chủ" icon={<KeyRound />} description="Luôn giữ các khóa của riêng bạn và toàn quyền lưu giữ tiền của bạn. Chọn sự kết hợp giữa máy khách và phần cứng cho phép bạn giảm thiểu rủi ro. Không có bên thứ ba nào có thể đưa ra những quyết định này thay bạn hoặc hạn chế việc rút tiền của bạn." />
  <Card title="Sự đa dạng máy khách và địa lý" icon={<GlobeLock />} description="Những người đặt cọc tại nhà chạy các máy khách thiểu số trên phần cứng trải rộng ở nhiều địa điểm giúp củng cố sự phi tập trung và bảo mật của mạng lưới." />
</Grid>

## Những điều cần cân nhắc trước khi đặt cọc tại nhà {#considerations-before-staking-solo}

Mặc dù chúng tôi mong muốn rằng việc đặt cọc tại nhà có thể tiếp cận được và không có rủi ro đối với tất cả mọi người, nhưng đây không phải là thực tế. Có một số cân nhắc thực tế và nghiêm túc cần ghi nhớ trước khi chọn đặt cọc ETH tại nhà.

<ExpandableCard title="Tài liệu bắt buộc đọc" eventCategory="SoloStaking" eventName="clicked required reading">
Khi vận hành nút của riêng mình, bạn nên dành chút thời gian tìm hiểu cách sử dụng phần mềm bạn đã chọn. Điều này liên quan đến việc đọc tài liệu liên quan và theo dõi các kênh liên lạc của các nhóm phát triển đó.

Bạn càng hiểu rõ về phần mềm bạn đang chạy và cách thức hoạt động của Bằng chứng cổ phần (PoS), thì rủi ro khi trở thành người đặt cọc sẽ càng ít và bạn sẽ càng dễ dàng khắc phục mọi sự cố có thể phát sinh trong quá trình vận hành nút.
</ExpandableCard>

<ExpandableCard title="Thành thạo máy tính" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Việc thiết lập nút yêu cầu mức độ thoải mái hợp lý khi làm việc với máy tính, mặc dù các công cụ mới đang làm cho việc này trở nên dễ dàng hơn theo thời gian. Hiểu biết về giao diện dòng lệnh là hữu ích, nhưng không còn bắt buộc nghiêm ngặt nữa.

Nó cũng yêu cầu thiết lập phần cứng rất cơ bản và một số hiểu biết về các thông số kỹ thuật tối thiểu được đề xuất.
</ExpandableCard>

<ExpandableCard title="Yêu cầu phần cứng" eventCategory="SoloStaking" eventName="clicked hardware requirements">
Hướng dẫn hiện tại của cộng đồng về phần cứng và băng thông của trình xác thực được duy trì trong [các đề xuất về phần cứng và băng thông (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870). Theo hướng dẫn sơ bộ, hãy lên kế hoạch cho ổ SSD NVMe 4 TB, RAM 64 GB (ít hơn cũng có thể hoạt động, nhưng đây là khoảng trống được khuyến nghị), CPU đa lõi hiện đại, mạnh mẽ và kết nối internet có tốc độ tải xuống khoảng 50 Mbps / tải lên 25 Mbps.

Kể từ khi bản nâng cấp Fusaka giới thiệu PeerDAS, một nút đặt cọc chỉ cần lưu trữ và tải xuống một phần khối dữ liệu của mạng lưới, giúp giảm đáng kể yêu cầu về ổ đĩa và băng thông cho những người đặt cọc tại nhà.
</ExpandableCard>

<ExpandableCard title="Quản lý khóa an toàn" eventCategory="SoloStaking" eventName="clicked secure key management">
Giống như cách các khóa riêng tư bảo mật địa chỉ Ethereum của bạn, bạn sẽ cần tạo các khóa dành riêng cho trình xác thực của mình. Bạn phải hiểu cách giữ an toàn và bảo mật cho bất kỳ cụm từ hạt giống hoặc khóa riêng tư nào.{' '}

[Bảo mật Ethereum và phòng chống lừa đảo](/security/)
</ExpandableCard>

<ExpandableCard title="Bảo trì" eventCategory="SoloStaking" eventName="clicked maintenance">
Phần cứng đôi khi bị lỗi, kết nối mạng bị lỗi và phần mềm máy khách đôi khi cần nâng cấp. Việc bảo trì nút là không thể tránh khỏi và đôi khi sẽ cần sự chú ý của bạn. Bạn sẽ muốn đảm bảo rằng mình luôn nắm rõ mọi bản nâng cấp mạng lưới dự kiến hoặc các bản nâng cấp máy khách quan trọng khác.
</ExpandableCard>

<ExpandableCard title="Thời gian hoạt động ổn định" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Phần thưởng của bạn tỷ lệ thuận với thời gian trình xác thực của bạn trực tuyến và chứng thực đúng cách. Thời gian ngừng hoạt động sẽ phải chịu các hình phạt tỷ lệ thuận với số lượng trình xác thực khác ngoại tuyến cùng lúc, nhưng [không dẫn đến việc bị phạt cắt giảm](#faq). Băng thông cũng quan trọng, vì phần thưởng bị giảm đối với các chứng thực không được nhận kịp thời. Các yêu cầu sẽ khác nhau, nhưng [các đề xuất về phần cứng và băng thông (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) hiện tại đề xuất tốc độ tải xuống khoảng 50 Mbps và tải lên 25 Mbps.
</ExpandableCard>

<ExpandableCard title="Rủi ro phạt cắt giảm" eventCategory="SoloStaking" eventName="clicked slashing risk">
Khác với các hình phạt do không hoạt động vì ngoại tuyến, <em>phạt cắt giảm</em> là một hình phạt nghiêm trọng hơn nhiều dành cho các hành vi vi phạm ác ý. Bằng cách chạy một máy khách thiểu số với các khóa của bạn chỉ được tải trên một máy tại một thời điểm, rủi ro bị phạt cắt giảm của bạn sẽ được giảm thiểu. Mặc dù vậy, tất cả những người đặt cọc phải nhận thức được rủi ro của việc phạt cắt giảm.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Thêm về phạt cắt giảm và vòng đời trình xác thực</a>
</ExpandableCard>

## So sánh các tùy chọn đặt cọc {#comparison-of-staking-options}

<StakingComparison page="solo" />

## Cách thức hoạt động {#how-it-works}

<StakingHowSoloWorks />

Khi nút của bạn được đồng bộ hóa và các khóa của bạn được tạo, bạn gửi khoản đặt cọc của mình để kích hoạt trình xác thực. Một trình xác thực duy nhất yêu cầu tối thiểu 32 ETH và có thể chứa tối đa 2048 ETH. Mạng lưới nhận ra các khoản tiền gửi trong khoảng 13 phút, nhưng các trình xác thực mới phải đi qua hàng đợi kích hoạt trước khi chúng bắt đầu chứng thực; độ dài của hàng đợi này thay đổi tùy theo nhu cầu.

Trong khi hoạt động, bạn sẽ kiếm được phần thưởng ETH. Với thông tin xác thực rút tiền gộp (0x02), phần thưởng được tự động thêm vào khoản đặt cọc của bạn; với thông tin xác thực rút tiền thông thường (0x01), phần thưởng vượt quá 32 ETH ban đầu sẽ được định kỳ chuyển đến địa chỉ rút tiền của bạn.

Nếu muốn, bạn có thể thoát với tư cách là trình xác thực, điều này giúp loại bỏ yêu cầu phải trực tuyến và ngừng mọi phần thưởng tiếp theo. Số dư còn lại của bạn sau đó sẽ được rút về địa chỉ rút tiền mà bạn chỉ định trong quá trình thiết lập. Việc thoát có thể được bắt đầu bằng các khóa ký trình xác thực của bạn hoặc được kích hoạt trực tiếp từ địa chỉ rút tiền của bạn bằng một giao dịch lớp thực thi, do đó quyền kiểm soát tối thượng đối với tiền của bạn luôn thuộc về địa chỉ rút tiền của bạn.

### Gộp và mức tối đa 2048 ETH {#compounding}

Trình xác thực có một trong hai loại thông tin xác thực rút tiền:

- **Rút tiền thông thường (0x01)**: số dư hiệu dụng của trình xác thực được giới hạn ở mức 32 ETH và bất kỳ số dư nào vượt quá mức đó sẽ tự động được chuyển đến địa chỉ rút tiền của bạn vài ngày một lần.
- **Gộp (0x02)**: số dư hiệu dụng của trình xác thực có thể tăng lên tới 2048 ETH. Phần thưởng tự động gộp và bạn kiếm được phần thưởng trên mỗi ETH nguyên vượt quá mức tối thiểu 32 ETH, vì vậy bạn có thể đặt cọc số tiền linh hoạt như 40 ETH, không chỉ là bội số của 32. Chỉ số dư trên 2048 ETH mới được tự động chuyển đi; việc rút bất kỳ khoản nào khác có nghĩa là kích hoạt thủ công việc rút tiền một phần từ địa chỉ rút tiền của bạn, điều này sẽ tốn Gas.

Nếu bạn chạy nhiều trình xác thực, bạn có thể hợp nhất chúng thành một trình xác thực gộp duy nhất mà không cần thoát và tham gia lại mạng lưới, giúp giảm chi phí bảo trì của bạn. Việc hợp nhất được yêu cầu từ địa chỉ rút tiền của bạn và phải tuân theo các hàng đợi xử lý. Việc chuyển đổi trình xác thực từ thông tin xác thực 0x01 sang 0x02 sử dụng cùng cơ chế này và **không thể đảo ngược** nếu không thoát hoàn toàn và gửi tiền lại.

[Thêm về rút tiền đặt cọc](/staking/withdrawals/)

## Bắt đầu trên Staking Launchpad {#get-started-on-the-staking-launchpad}

Staking Launchpad là một ứng dụng mã nguồn mở sẽ giúp bạn trở thành người đặt cọc. Nó sẽ hướng dẫn bạn cách chọn máy khách, tạo khóa và gửi ETH của bạn vào hợp đồng tiền gửi đặt cọc. Một danh sách kiểm tra được cung cấp để đảm bảo bạn đã bao quát mọi thứ nhằm thiết lập trình xác thực của mình một cách an toàn.

<StakingLaunchpadWidget />

## Những điều cần cân nhắc với các công cụ thiết lập nút và máy khách {#node-tool-considerations}

Ngày càng có nhiều công cụ và dịch vụ giúp bạn đặt cọc ETH tại nhà, nhưng mỗi công cụ đều đi kèm với những rủi ro và lợi ích khác nhau.

Các chỉ báo thuộc tính được sử dụng bên dưới để báo hiệu những điểm mạnh hoặc điểm yếu đáng chú ý mà một công cụ đặt cọc được liệt kê có thể có. Hãy sử dụng phần này làm tài liệu tham khảo về cách chúng tôi xác định các thuộc tính này trong khi bạn đang chọn công cụ nào để hỗ trợ hành trình đặt cọc của mình.

<StakingConsiderations page="solo" />

## Khám phá các công cụ thiết lập nút và máy khách {#node-and-client-tools}

Có nhiều tùy chọn có sẵn để giúp bạn thiết lập. Sử dụng các chỉ báo ở trên để giúp hướng dẫn bạn qua các công cụ bên dưới.

<ProductDisclaimer />

### Công cụ nút {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Xin lưu ý tầm quan trọng của việc chọn một [máy khách thiểu số](/developers/docs/nodes-and-clients/client-diversity/) vì nó cải thiện tính bảo mật của mạng lưới và hạn chế rủi ro của bạn. Các công cụ cho phép bạn thiết lập máy khách thiểu số được biểu thị là <em style={{ textTransform: "uppercase" }}>"đa máy khách."</em>

### Trình tạo khóa {#key-generators}

Các công cụ này có thể được sử dụng như một giải pháp thay thế cho [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) để giúp tạo khóa.

<StakingProductsCardGrid category="keyGen" />

Bạn có đề xuất về một công cụ đặt cọc mà chúng tôi đã bỏ lỡ? Hãy xem [chính sách niêm yết sản phẩm](/contributing/adding-staking-products/) của chúng tôi để xem liệu nó có phù hợp hay không và gửi nó để xem xét.

## Khám phá các hướng dẫn đặt cọc tại nhà {#staking-guides}

<StakingGuides />

## Đặt cọc theo nhóm: đặt cọc tại nhà với khả năng chịu lỗi {#squad-staking}

**Công nghệ trình xác thực phân tán (DVT)** cho phép một trình xác thực duy nhất chạy trên một cụm máy thay vì chỉ một máy. Khóa trình xác thực được chia thành các phần bằng cách sử dụng tính năng tạo khóa phân tán và một ngưỡng của cụm (ví dụ: bất kỳ 3 trong số 4 nút nào) phải ký cùng nhau; toàn bộ khóa không bao giờ tồn tại trên bất kỳ máy đơn lẻ nào. Nếu một máy bị lỗi, ngoại tuyến hoặc bị định cấu hình sai, phần còn lại của cụm sẽ giữ cho trình xác thực tiếp tục chứng thực.

Đối với những người đặt cọc tại nhà, điều này cho phép "đặt cọc theo nhóm": hợp tác với bạn bè hoặc các thành viên khác trong cộng đồng để cùng nhau chạy các trình xác thực, loại bỏ các điểm lỗi duy nhất của thiết lập cá nhân và giảm rủi ro bị phạt cắt giảm từ một máy hoạt động sai duy nhất. Obol và SSV Network đều cung cấp các triển khai DVT sản xuất, được sử dụng ngày nay trên các nền tảng đặt cọc tại nhà, staking như một dịch vụ và các nhóm đặt cọc.

[Thêm về công nghệ trình xác thực phân tán (DVT)](/staking/dvt/)

## Chạy trình xác thực cho một giao thức đặt cọc {#run-validators-for-a-staking-protocol}

Nếu bạn có phần cứng và kỹ năng để chạy một nút nhưng có ít hơn 32 ETH, một số giao thức đặt cọc sẽ ghép nối trình xác thực của bạn với ETH từ những người đặt cọc chung của họ. Bạn gửi một khoản tiền bảo đảm nhỏ hơn làm tài sản thế chấp và chạy trình xác thực trên máy của riêng bạn; giao thức cung cấp phần còn lại của khoản đặt cọc và bạn kiếm được một phần phần thưởng.

Đây là một phương pháp kết hợp: bạn giữ các trách nhiệm (và sự hài lòng) khi vận hành phần cứng của riêng mình, nhưng trình xác thực của bạn hoạt động theo các hợp đồng thông minh, quản trị và các quy tắc hiệu suất của giao thức, đây là một hồ sơ tin cậy khác với việc trực tiếp đặt cọc ETH của riêng bạn.

Tìm hiểu thêm về cách các giao thức này hoạt động, bao gồm các giả định tin cậy và cơ chế token của chúng, trên [trang đặt cọc chung](/staking/pools/).

## Các cách khác để sử dụng nút của bạn {#more-ways-to-use-your-node}

Bạn hoàn toàn không cần phải đặt cọc để đưa các kỹ năng vận hành nút vào hoạt động. Bất kỳ ai cũng có thể [chạy một nút Ethereum](/run-a-node/) mà không cần gửi bất kỳ ETH nào. Bạn có được cái nhìn tự xác minh về chuỗi, điểm cuối riêng tư của riêng bạn để gửi các giao dịch và tương tác với các ứng dụng, đồng thời bạn đóng góp vào sức khỏe và khả năng phục hồi của mạng lưới. Chạy một nút cũng là một cách tốt để xây dựng kinh nghiệm trước khi kích hoạt một trình xác thực, mà không có rủi ro nào đối với ETH.

<StakingCommunityCallout className="my-16" />

## Các câu hỏi thường gặp {#faq}

Đây là một vài trong số những câu hỏi phổ biến nhất về việc đặt cọc mà bạn nên biết.

<ExpandableCard title="Trình xác thực là gì?">

Một <em>trình xác thực</em> là một thực thể ảo tồn tại trên Ethereum và tham gia vào sự đồng thuận của giao thức Ethereum. Các trình xác thực được đại diện bởi số dư, khóa công khai và các thuộc tính khác. Một <em>máy khách trình xác thực</em> là phần mềm hoạt động thay mặt cho trình xác thực bằng cách giữ và sử dụng khóa riêng tư của nó. Một máy khách trình xác thực duy nhất có thể giữ nhiều cặp khóa, kiểm soát nhiều trình xác thực.

</ExpandableCard>

<ExpandableCard title="Tôi có thể nạp nhiều hơn 32 ETH không?">
Có. Một trình xác thực có thông tin xác thực rút tiền _gộp_ (0x02) có thể giữ số dư hiệu dụng lên tới 2048 ETH, trong khi mức tối thiểu để kích hoạt vẫn là 32 ETH. Phần thưởng trên một trình xác thực gộp được tự động thêm vào khoản đặt cọc của nó và nó kiếm được phần thưởng trên mỗi ETH nguyên vượt quá mức tối thiểu 32 ETH, vì vậy bạn có thể đặt cọc số tiền không phải là bội số của 32. Xem [Gộp và mức tối đa 2048 ETH](#compounding).

Các trình xác thực có thông tin xác thực _rút tiền thông thường_ (0x01) vẫn bị giới hạn ở số dư hiệu dụng là 32 ETH, với bất kỳ số dư nào vượt quá mức đó sẽ tự động được chuyển đến địa chỉ rút tiền vài ngày một lần.

Đối với một trình xác thực gộp, chỉ số dư vượt quá mức tối đa 2048 ETH mới được tự động chuyển đi. Để rút bất kỳ khoản nào dưới mức đó, bạn kích hoạt việc rút tiền một phần từ địa chỉ rút tiền của mình (một giao dịch tốn Gas), điều này có thể rút bớt bất kỳ số dư nào vượt quá mức tối thiểu 32 ETH. Nếu bạn chạy nhiều trình xác thực, bạn cũng có thể hợp nhất chúng thành một trình xác thực gộp duy nhất mà không cần thoát khỏi mạng lưới.

[Thêm về rút tiền đặt cọc](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="Tôi có bị phạt cắt giảm nếu ngoại tuyến không? (tóm lại: Không.)">
Việc ngoại tuyến khi mạng lưới đang chung cuộc đúng cách sẽ KHÔNG dẫn đến việc bị phạt cắt giảm. Các <em>hình phạt do không hoạt động</em> nhỏ sẽ phát sinh nếu trình xác thực của bạn không có sẵn để chứng thực cho một kỷ nguyên nhất định (mỗi kỷ nguyên dài 6,4 phút), nhưng điều này rất khác với <em>phạt cắt giảm</em>. Những hình phạt này thấp hơn một chút so với phần thưởng mà bạn sẽ kiếm được nếu trình xác thực có sẵn để chứng thực và những tổn thất có thể được kiếm lại với khoảng thời gian trực tuyến trở lại tương đương.

Lưu ý rằng các hình phạt do không hoạt động tỷ lệ thuận với số lượng trình xác thực ngoại tuyến cùng lúc. Trong trường hợp một phần lớn mạng lưới đều ngoại tuyến cùng một lúc, các hình phạt đối với mỗi trình xác thực này sẽ lớn hơn so với khi một trình xác thực duy nhất không có sẵn.

Trong những trường hợp cực đoan nếu mạng lưới ngừng chung cuộc do hơn một phần ba số trình xác thực ngoại tuyến, những người dùng này sẽ phải chịu cái được gọi là <em>rò rỉ do không hoạt động bậc hai</em>, đây là sự cạn kiệt ETH theo cấp số nhân từ các tài khoản trình xác thực ngoại tuyến. Điều này cho phép mạng lưới cuối cùng tự phục hồi bằng cách đốt ETH của các trình xác thực không hoạt động cho đến khi số dư của chúng đạt 16 ETH, tại thời điểm đó chúng sẽ tự động bị đẩy ra khỏi nhóm trình xác thực. Các trình xác thực trực tuyến còn lại cuối cùng sẽ lại chiếm hơn 2/3 mạng lưới, thỏa mãn đa số tuyệt đối cần thiết để một lần nữa chung cuộc chuỗi.
</ExpandableCard>

<ExpandableCard title="Làm thế nào để đảm bảo tôi không bị phạt cắt giảm?">
Tóm lại, điều này không bao giờ có thể được đảm bảo hoàn toàn, nhưng nếu bạn hành động thiện chí, chạy một máy khách thiểu số và chỉ giữ các khóa ký của bạn trên một máy tại một thời điểm, thì rủi ro bị phạt cắt giảm gần như bằng không.

Chỉ có một vài cách cụ thể có thể dẫn đến việc một trình xác thực bị phạt cắt giảm và bị đẩy ra khỏi mạng lưới. Tại thời điểm viết bài, các vụ phạt cắt giảm đã xảy ra hoàn toàn là sản phẩm của các thiết lập phần cứng dự phòng trong đó các khóa ký được lưu trữ trên hai máy riêng biệt cùng một lúc. Điều này có thể vô tình dẫn đến một <em>bỏ phiếu kép</em> từ các khóa của bạn, đây là một hành vi vi phạm có thể bị phạt cắt giảm.

Việc chạy một máy khách đa số tuyệt đối (bất kỳ máy khách nào được sử dụng bởi hơn 2/3 mạng lưới) cũng tiềm ẩn rủi ro bị phạt cắt giảm trong trường hợp máy khách này có lỗi dẫn đến phân nhánh chuỗi. Điều này có thể dẫn đến một phân nhánh bị lỗi được chung cuộc. Để sửa lại thành chuỗi dự kiến sẽ yêu cầu gửi một <em>bỏ phiếu bao quanh</em> bằng cách cố gắng hoàn tác một khối đã chung cuộc. Đây cũng là một hành vi vi phạm có thể bị phạt cắt giảm và có thể tránh được một cách đơn giản bằng cách chạy một máy khách thiểu số thay thế.

Các lỗi tương đương trong một <em>máy khách thiểu số sẽ không bao giờ chung cuộc</em> và do đó sẽ không bao giờ dẫn đến một bỏ phiếu bao quanh, và sẽ chỉ dẫn đến các hình phạt do không hoạt động, <em>không phải phạt cắt giảm</em>.

<ul>
  <li><a href="https://clientdiversity.org/">Tìm hiểu thêm về tầm quan trọng của việc chạy một máy khách thiểu số.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">Tìm hiểu thêm về phần thưởng, hình phạt và phạt cắt giảm</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Máy khách nào là tốt nhất?">
Các máy khách riêng lẻ có thể khác nhau một chút về hiệu suất và giao diện người dùng, vì mỗi máy khách được phát triển bởi các nhóm khác nhau sử dụng nhiều ngôn ngữ lập trình. Mặc dù vậy, không có máy khách nào là "tốt nhất". Tất cả các máy khách sản xuất đều là những phần mềm tuyệt vời, tất cả đều thực hiện các chức năng cốt lõi giống nhau để đồng bộ hóa và tương tác với chuỗi khối.

Vì tất cả các máy khách sản xuất đều cung cấp chức năng cơ bản giống nhau, nên điều rất quan trọng là bạn phải chọn một <strong>máy khách thiểu số</strong>, nghĩa là bất kỳ máy khách nào KHÔNG được đa số các trình xác thực trên mạng lưới sử dụng hiện tại. Điều này nghe có vẻ phản trực giác, nhưng việc chạy một máy khách đa số hoặc đa số tuyệt đối khiến bạn có nguy cơ bị phạt cắt giảm cao hơn trong trường hợp có lỗi trong máy khách đó. Việc chạy một máy khách thiểu số sẽ hạn chế đáng kể những rủi ro này.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Tìm hiểu thêm về lý do tại sao sự đa dạng máy khách lại rất quan trọng</a>
</ExpandableCard>

<ExpandableCard title="Tôi có thể chỉ sử dụng VPS (máy chủ riêng ảo) không?">
Mặc dù máy chủ riêng ảo (VPS) có thể được sử dụng để thay thế cho phần cứng tại nhà, nhưng quyền truy cập vật lý và vị trí của máy khách trình xác thực của bạn <em>thực sự quan trọng</em>. Các giải pháp đám mây tập trung như Amazon Web Services hoặc Digital Ocean mang lại sự tiện lợi khi không phải mua và vận hành phần cứng, nhưng phải trả giá bằng việc tập trung hóa mạng lưới.

Càng nhiều máy khách trình xác thực chạy trên một giải pháp lưu trữ đám mây tập trung duy nhất, thì nó càng trở nên nguy hiểm hơn đối với những người dùng này. Bất kỳ sự kiện nào khiến các nhà cung cấp này ngoại tuyến, cho dù là do một cuộc tấn công, yêu cầu pháp lý hay chỉ là mất điện/internet, sẽ dẫn đến việc mọi máy khách trình xác thực dựa vào máy chủ này đều ngoại tuyến cùng một lúc.

Các hình phạt ngoại tuyến tỷ lệ thuận với số lượng người khác ngoại tuyến cùng lúc. Việc sử dụng VPS làm tăng đáng kể rủi ro rằng các hình phạt ngoại tuyến sẽ nghiêm trọng hơn và làm tăng rủi ro rò rỉ bậc hai hoặc phạt cắt giảm trong trường hợp sự cố ngừng hoạt động đủ lớn. Để giảm thiểu rủi ro của chính bạn và rủi ro cho mạng lưới, người dùng được đặc biệt khuyến khích mua và vận hành phần cứng của riêng họ.
</ExpandableCard>

<ExpandableCard title="Làm thế nào để mở khóa phần thưởng hoặc lấy lại ETH của tôi?">

Mỗi lần rút tiền đều yêu cầu trình xác thực của bạn phải có một địa chỉ rút tiền được thiết lập. Những người đặt cọc mới thiết lập điều này tại thời điểm tạo khóa và gửi tiền. Những người đặt cọc từ những ngày đầu của mạng lưới chưa thiết lập địa chỉ rút tiền sẽ cần cập nhật thông tin xác thực rút tiền của họ trước khi rút tiền.

Đối với các trình xác thực có thông tin xác thực rút tiền thông thường (0x01), các khoản thanh toán phần thưởng (ETH tích lũy vượt quá 32 ban đầu) được định kỳ phân phối tự động đến địa chỉ rút tiền. Đối với các trình xác thực gộp (0x02), phần thưởng vẫn được đặt cọc và tự động gộp. Bạn có thể rút bất kỳ số dư nào vượt quá 32 ETH bằng cách kích hoạt việc rút tiền một phần từ địa chỉ rút tiền của mình.

Để mở khóa và nhận lại toàn bộ số dư của mình, bạn phải thoát khỏi trình xác thực của mình. Bạn có thể làm điều này bằng cách sử dụng các khóa ký trình xác thực của mình hoặc kích hoạt nó trực tiếp từ địa chỉ rút tiền của bạn bằng một giao dịch lớp thực thi, nghĩa là tiền của bạn vẫn có thể phục hồi ngay cả khi các khóa ký của bạn bị mất.

<ButtonLink href="/staking/withdrawals/">Thêm về rút tiền đặt cọc</ButtonLink>
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Thống kê sự đa dạng máy khách và hướng dẫn di chuyển](https://clientdiversity.org/)
- [Giúp đỡ sự đa dạng máy khách](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Sự đa dạng máy khách trên lớp đồng thuận của Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Cách thức: Mua sắm phần cứng trình xác thực Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870: Các đề xuất về phần cứng và băng thông](https://eips.ethereum.org/EIPS/eip-7870)
- [Bản nâng cấp Pectra: số dư hiệu dụng tối đa và hơn thế nữa](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />