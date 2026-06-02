---
title: "Tự Stake ETH"
description: "Đây là khái quát về việc làm sao để bắt đầu Stake ETH tại nhà"
lang: vi
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: "Tê giác Leslie trên chip máy tính riêng."
sidebarDepth: 2
summaryPoints:
  - Tận hưởng phần thưởng tối đa trực tiếp từ giao thức khi bạn duy trì nút xác thực hoạt động đúng cách và trực tuyến
  - Việc chạy phần cứng tại nhà và tự mình sẽ gia tăng tính bảo mật và phân quyền của mạng Ethereum
  - Không phải dựa vào ủy thác và không hề phải từ bỏ quyền kiểm soát chìa khóa đối với tiền của bạn
---

## Đặt cược tại nhà là gì? {#what-is-solo-staking}

Đặt cược tại nhà là hành động [chạy một nút Ethereum](/run-a-node/) được kết nối với internet và ký gửi 32 ETH để kích hoạt một [trình xác thực](#faq), cho phép bạn có khả năng tham gia trực tiếp vào sự đồng thuận của mạng lưới.

**Đặt cược tại nhà làm tăng tính phi tập trung của mạng lưới Ethereum**, giúp Ethereum chống kiểm duyệt tốt hơn và vững chắc hơn trước các cuộc tấn công. Các phương pháp đặt cược khác có thể không giúp ích cho mạng lưới theo những cách tương tự. Đặt cược tại nhà là lựa chọn đặt cược tốt nhất để bảo mật Ethereum.

Một nút Ethereum bao gồm cả máy khách lớp thực thi (EL) và máy khách lớp đồng thuận (CL). Các máy khách này là phần mềm hoạt động cùng nhau, cùng với một bộ khóa ký hợp lệ, để xác minh các giao dịch và khối, chứng thực đầu chuỗi chính xác, tổng hợp các chứng thực và đề xuất các khối.

Những người đặt cược tại nhà chịu trách nhiệm vận hành phần cứng cần thiết để chạy các máy khách này. Chúng tôi thực sự khuyên bạn nên sử dụng một máy chuyên dụng cho việc này mà bạn vận hành tại nhà–điều này cực kỳ có lợi cho sức khỏe của mạng lưới.

Một người stake tại nhà sẽ nhận phần thưởng trực tiếp từ giao thức để giúp nút xác thực của họ hoạt động tốt và trực tuyến.

## Tại sao nên đặt cược tại nhà? {#why-stake-solo}

Stake tại nhà kèm theo trách nhiệm nhưng cung cấp sự kiểm soát tối đa quỹ của bạn và thiết lập Staking.

<Grid>
  <Card title="Kiếm ETH mới" emoji="💸" description="Nhận phần thưởng bằng ETH trực tiếp từ giao thức khi trình xác thực của bạn trực tuyến, không có bên trung gian nào cắt phế." />
  <Card title="Toàn quyền kiểm soát" emoji="🎛️" description="Tự giữ khóa của bạn. Chọn kết hợp máy khách và phần cứng để giảm thiểu rủi ro và góp phần bảo mật mạng lưới. Các dịch vụ đặt cược của bên thứ ba quyết định thay bạn, và họ không phải lúc nào cũng chọn phương án an toàn nhất." />
  <Card title="Bảo mật mạng lưới" emoji="🔐" description="Đặt cược tại nhà là cách đặt cược có tác động lớn nhất. Bằng cách chạy một trình xác thực trên phần cứng của riêng bạn tại nhà, bạn sẽ củng cố sự vững chắc, tính phi tập trung và bảo mật của giao thức Ethereum." />
</Grid>

## Những điều cần cân nhắc trước khi đặt cược tại nhà {#considerations-before-staking-solo}

Dù chúng tôi rất mong muốn việc đặt cược tại nhà có thể dễ tiếp cận và không có rủi ro cho mọi người, nhưng thực tế lại không phải như vậy. Có một số cân nhắc thực tế và nghiêm túc cần ghi nhớ trước khi chọn đặt cược ETH tại nhà.

<InfoGrid>
<ExpandableCard title="Tài liệu cần đọc" eventCategory="SoloStaking" eventName="clicked required reading">
Khi vận hành nút của riêng mình, bạn nên dành thời gian để tìm hiểu cách sử dụng phần mềm mình đã chọn. Điều này bao gồm việc đọc các tài liệu liên quan và theo dõi các kênh liên lạc của các nhóm phát triển đó.

Bạn càng hiểu rõ về phần mềm mình đang chạy và cách thức hoạt động của bằng chứng cổ phần, thì rủi ro với tư cách là người đặt cược sẽ càng thấp, và việc khắc phục bất kỳ sự cố nào có thể phát sinh trong quá trình vận hành nút sẽ càng dễ dàng hơn.
</ExpandableCard>

<ExpandableCard title="Sử dụng máy tính thành thạo" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Việc thiết lập nút đòi hỏi một mức độ thoải mái hợp lý khi làm việc với máy tính, mặc dù các công cụ mới đang giúp việc này trở nên dễ dàng hơn theo thời gian. Hiểu biết về giao diện dòng lệnh là một lợi thế, nhưng không còn là yêu cầu bắt buộc.

Nó cũng đòi hỏi thiết lập phần cứng rất cơ bản và một số hiểu biết về các thông số kỹ thuật tối thiểu được đề xuất.
</ExpandableCard>

<ExpandableCard title="Quản lý khóa an toàn" eventCategory="SoloStaking" eventName="clicked secure key management">
Cũng giống như cách khóa riêng tư bảo mật địa chỉ Ethereum của bạn, bạn sẽ cần tạo các khóa dành riêng cho trình xác thực của mình. Bạn phải hiểu cách giữ an toàn và bảo mật mọi cụm từ hạt giống hoặc khóa riêng tư.{' '}

[Bảo mật Ethereum và phòng chống lừa đảo](/security/)
</ExpandableCard>

<ExpandableCard title="Bảo trì" eventCategory="SoloStaking" eventName="clicked maintenance">
Phần cứng đôi khi bị lỗi, kết nối mạng bị ngắt và phần mềm máy khách đôi khi cần nâng cấp. Việc bảo trì nút là không thể tránh khỏi và đôi khi sẽ cần đến sự chú ý của bạn. Bạn sẽ muốn đảm bảo rằng mình nhận biết được mọi bản nâng cấp mạng dự kiến hoặc các bản nâng cấp máy khách quan trọng khác.
</ExpandableCard>

<ExpandableCard title="Thời gian hoạt động đáng tin cậy" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Phần thưởng của bạn tỷ lệ thuận với thời gian trình xác thực của bạn trực tuyến và chứng thực đúng cách. Thời gian ngừng hoạt động sẽ bị phạt tương ứng với số lượng trình xác thực khác ngoại tuyến cùng lúc, nhưng <a href="#faq">không dẫn đến việc bị cắt giảm</a>. Băng thông cũng quan trọng, vì phần thưởng sẽ bị giảm đối với các chứng thực không được nhận kịp thời. Yêu cầu sẽ khác nhau, nhưng khuyến nghị tốc độ tải lên và tải xuống tối thiểu là 10 Mb/giây.
</ExpandableCard>

<ExpandableCard title="Rủi ro bị cắt giảm" eventCategory="SoloStaking" eventName="clicked slashing risk">
Khác với các hình phạt do không hoạt động khi ngoại tuyến, <em>cắt giảm</em> là một hình phạt nghiêm trọng hơn nhiều dành cho các hành vi độc hại. Bằng cách chạy một máy khách thiểu số với các khóa của bạn được tải trên một máy duy nhất tại một thời điểm, rủi ro bị cắt giảm của bạn sẽ được giảm thiểu. Điều đó nói lên rằng, tất cả những người đặt cược phải nhận thức được những rủi ro của việc bị cắt giảm.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">Thông tin thêm về việc cắt giảm và vòng đời của trình xác thực</a>
</ExpandableCard>

</InfoGrid>

<StakingComparison page="solo" />

## Cách thức hoạt động {#how-it-works}

<StakingHowSoloWorks />

Trong thời gian hoạt động, nút xác thực của bạn sẽ tự động tích lũy phần thưởng ETH, được chuyển định kỳ đến địa chỉ rút tiền.

Nếu muốn, bạn có thể thoát vai trò trình xác thực, điều này giúp loại bỏ yêu cầu phải trực tuyến và ngừng nhận bất kỳ phần thưởng nào nữa. Số dư còn lại của bạn sau đó sẽ được rút về địa chỉ rút tiền mà bạn chỉ định trong quá trình thiết lập.

[Thông tin thêm về việc rút tiền đặt cược](/staking/withdrawals/)

## Bắt đầu trên Staking Launchpad {#get-started-on-the-staking-launchpad}

Staking Launchpad là một ứng dụng mã nguồn mở sẽ giúp bạn trở thành người đặt cược. Nó sẽ hướng dẫn bạn chọn máy khách, tạo khóa và ký gửi ETH vào hợp đồng ký gửi đặt cược. Một danh sách kiểm tra được cung cấp để đảm bảo bạn đã hoàn thành mọi thứ để thiết lập trình xác thực của mình một cách an toàn.

<StakingLaunchpadWidget />

## Những điều cần cân nhắc với các công cụ thiết lập nút và máy khách {#node-tool-considerations}

Ngày càng có nhiều công cụ và dịch vụ giúp bạn tự Staking ETH tại nhà, nhưng mỗi cái đều đi kèm những rủi ro và lợi ích khác nhau.

Các chỉ báo thuộc tính được sử dụng bên dưới để báo hiệu những điểm mạnh hoặc điểm yếu đáng chú ý mà một công cụ đặt cược được liệt kê có thể có. Sử dụng phần này làm tài liệu tham khảo về cách chúng tôi xác định các thuộc tính này trong khi bạn chọn công cụ nào để trợ giúp cho hành trình đặt cược của mình.

<StakingConsiderations page="solo" />

## Khám phá các công cụ thiết lập nút và máy khách {#node-and-client-tools}

Có nhiều tùy chọn có sẵn để giúp bạn thiết lập. Sử dụng các chỉ báo bên trên làm hướng dẫn về các công cụ bên dưới.

<ProductDisclaimer />

### Bộ công cụ nút

<StakingProductsCardGrid category="nodeTools" />

Xin lưu ý tầm quan trọng của việc chọn [máy khách thiểu số](/developers/docs/nodes-and-clients/client-diversity/) vì nó cải thiện tính bảo mật của mạng lưới và hạn chế rủi ro cho bạn. Các công cụ cho phép bạn thiết lập máy khách thiểu số được ký hiệu là <em style={{ textTransform: "uppercase" }}>"đa máy khách."</em>

### Trình tạo khóa

Các công cụ này có thể được sử dụng để thay thế cho [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) để hỗ trợ việc tạo khóa.

<StakingProductsCardGrid category="keyGen" />

Bạn có đề xuất về một công cụ đặt cọc mà chúng tôi còn thiếu không? Hãy xem [chính sách niêm yết sản phẩm](/contributing/adding-staking-products/) của chúng tôi để xem liệu nó có phù hợp hay không và gửi nó để được xem xét.

## Khám phá hướng dẫn đặt cược tại nhà {#staking-guides}

<StakingGuides />

## Những câu hỏi thường gặp {#faq}

Đây là một vài trong số các câu hỏi phổ biến nhất về đặt cọc.

<ExpandableCard title="Trình xác thực là gì?">

Một <em>trình xác thực</em> là một thực thể ảo tồn tại trên Ethereum và tham gia vào sự đồng thuận của giao thức Ethereum. Các trình xác thực được đại diện bởi một số dư, khóa công khai và các thuộc tính khác. Một <em>máy khách trình xác thực</em> là phần mềm hoạt động thay mặt cho trình xác thực bằng cách giữ và sử dụng khóa riêng tư của nó. Một máy khách trình xác thực duy nhất có thể giữ nhiều cặp khóa, kiểm soát nhiều trình xác thực.
</ExpandableCard>

<ExpandableCard title="Tôi có thể nạp hơn 32 ETH không?">
Có, các tài khoản trình xác thực hiện đại có khả năng giữ tới 2048 ETH. Lượng ETH bổ sung trên 32 sẽ được gộp theo từng bước, tăng theo từng số nguyên khi số dư thực của bạn tăng lên. Điều này được gọi là <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">số dư hiệu dụng</a> của bạn.

Để tăng số dư hiệu dụng của một tài khoản, và do đó tăng phần thưởng, cần phải vượt qua một khoảng đệm 0,25 ETH trên bất kỳ ngưỡng ETH nguyên nào. Ví dụ, một tài khoản có số dư thực là 32,9 và số dư hiệu dụng là 32 sẽ cần kiếm thêm 0,35 ETH để đưa số dư thực của nó lên trên 33,25 trước khi kích hoạt việc tăng số dư hiệu dụng.

Mức đệm này cũng ngăn không cho số dư hiệu quả bị giảm xuống cho đến khi số dư thực tế thấp hơn 0,25 ETH so với số dư hiệu quả hiện tại.

Mỗi cặp khóa được liên kết với một trình xác thực yêu cầu ít nhất 32 ETH để được kích hoạt. Bất kỳ số dư nào trên mức này đều có thể được rút về địa chỉ rút tiền được liên kết bất kỳ lúc nào thông qua một giao dịch được ký bởi địa chỉ này. Bất kỳ khoản tiền nào vượt quá số dư hiệu dụng tối đa sẽ tự động được rút theo định kỳ.

Nếu việc đặt cược tại nhà có vẻ quá đòi hỏi đối với bạn, hãy cân nhắc sử dụng nhà cung cấp [đặt cược dưới dạng dịch vụ](/staking/saas/), hoặc nếu bạn đang làm việc với ít hơn 32 ETH, hãy xem các [bể đặt cược](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Tôi có bị cắt giảm nếu ngoại tuyến không? (tóm lại: Không.)">
Việc ngoại tuyến khi mạng lưới đang hoàn tất đúng cách sẽ KHÔNG dẫn đến việc bị cắt giảm. Các <em>hình phạt nhỏ do không hoạt động</em> sẽ được áp dụng nếu trình xác thực của bạn không có mặt để chứng thực cho một kỷ nguyên nhất định (mỗi kỷ nguyên dài 6,4 phút), nhưng điều này rất khác với <em>cắt giảm</em>. Các hình phạt này ít hơn một chút so với phần thưởng bạn có thể kiếm được nếu trình xác thực có mặt để chứng thực, và các khoản lỗ có thể được bù lại với khoảng thời gian trực tuyến trở lại tương đương.

Lưu ý rằng hình phạt vì không hoạt động sẽ phụ thuộc vào số lượng trình xác thực ngoại tuyến cùng lúc. Trong trường hợp phần lớn mạng lưới ngoại tuyến cùng một lúc, hình phạt cho mỗi trình xác thực sẽ nặng hơn so với trường hợp chỉ có một trình xác thực không hoạt động.

Trong các trường hợp cực đoan, nếu mạng lưới ngừng hoàn tất do có hơn một phần ba số trình xác thực ngoại tuyến, những người dùng này sẽ phải chịu cái được gọi là <em>rò rỉ do không hoạt động theo cấp số nhân</em>, đây là một sự hao hụt ETH theo cấp số nhân từ các tài khoản trình xác thực ngoại tuyến. Điều này cho phép mạng lưới tự phục hồi bằng cách đốt ETH của các trình xác thực không hoạt động cho đến khi số dư của chúng đạt 16 ETH, lúc đó chúng sẽ tự động bị loại khỏi nhóm trình xác thực. Cuối cùng, các trình xác thực trực tuyến còn lại sẽ chiếm hơn 2/3 mạng lưới một lần nữa, đáp ứng được số phiếu siêu đa số cần thiết để một lần nữa hoàn tất chuỗi.
</ExpandableCard>

<ExpandableCard title="Làm cách nào để đảm bảo tôi không bị cắt giảm?">
Tóm lại, điều này không bao giờ có thể được đảm bảo hoàn toàn, nhưng nếu bạn hành động một cách thiện chí, chạy một máy khách thiểu số và chỉ giữ các khóa ký của mình trên một máy tại một thời điểm, nguy cơ bị cắt giảm là gần như bằng không.

Chỉ có một vài trường hợp cụ thể có thể khiến một trình xác thực bị cắt giảm và bị loại khỏi mạng lưới. Tại thời điểm viết bài, các trường hợp cắt giảm đã xảy ra hoàn toàn là sản phẩm của các thiết lập phần cứng dự phòng, nơi các khóa ký được lưu trữ trên hai máy riêng biệt cùng một lúc. Điều này có thể vô tình dẫn đến một <em>phiếu bầu kép</em> từ các khóa của bạn, đây là một hành vi có thể bị cắt giảm.

Việc chạy một máy khách siêu đa số (bất kỳ máy khách nào được sử dụng bởi hơn 2/3 mạng lưới) cũng có nguy cơ bị cắt giảm tiềm tàng trong trường hợp máy khách này có lỗi dẫn đến phân nhánh chuỗi. Điều này có thể dẫn đến một phân nhánh bị lỗi được hoàn tất. Để sửa lại về chuỗi dự định sẽ yêu cầu gửi một <em>phiếu bầu bao quanh</em> bằng cách cố gắng hoàn tác một khối đã được hoàn tất. Đây cũng là một hành vi có thể bị cắt giảm và có thể tránh được bằng cách chạy một máy khách thiểu số.

Các lỗi tương đương trong <em>máy khách thiểu số sẽ không bao giờ được hoàn tất</em> và do đó sẽ không bao giờ dẫn đến phiếu bao quanh, mà chỉ dẫn đến hình phạt vì không hoạt động chứ <em>không phải hình phạt bị cắt giảm</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Tìm hiểu thêm về tầm quan trọng của việc chạy máy khách thiểu số.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Tìm hiểu thêm về phòng chống cắt giảm</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Máy khách nào là tốt nhất?">
Các máy khách riêng lẻ có thể khác nhau một chút về hiệu suất và giao diện người dùng, vì mỗi máy khách được phát triển bởi các nhóm khác nhau sử dụng nhiều ngôn ngữ lập trình khác nhau. Điều đó nói lên rằng, không có cái nào là "tốt nhất". Tất cả các máy khách sản xuất đều là những phần mềm tuyệt vời, tất cả đều thực hiện các chức năng cốt lõi giống nhau để đồng bộ hóa và tương tác với chuỗi khối.

Vì tất cả các máy khách sản xuất đều cung cấp chức năng cơ bản giống nhau, điều thực sự quan trọng là bạn phải chọn một <strong>máy khách thiểu số</strong>, nghĩa là bất kỳ máy khách nào KHÔNG được đa số các trình xác thực trên mạng lưới sử dụng. Điều này nghe có vẻ phản trực giác, nhưng việc chạy một máy khách đa số hoặc siêu đa số sẽ khiến bạn có nguy cơ bị cắt giảm cao hơn trong trường hợp có lỗi trong máy khách đó. Chạy một máy khách thiểu số giúp giảm đáng kể những rủi ro này.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Tìm hiểu thêm về lý do tại sao sự đa dạng của máy khách lại quan trọng</a>
</ExpandableCard>

<ExpandableCard title="Tôi có thể chỉ cần dùng VPS (máy chủ riêng ảo) không?">
Mặc dù một máy chủ riêng ảo (VPS) có thể được sử dụng để thay thế cho phần cứng tại nhà, nhưng quyền truy cập vật lý và vị trí của máy khách trình xác thực của bạn <em>thực sự quan trọng</em>. Các giải pháp đám mây tập trung như Amazon Web Services hoặc Digital Ocean cho phép sự tiện lợi của việc không phải mua và vận hành phần cứng, với cái giá là tập trung hóa mạng lưới.

Càng nhiều máy khách trình xác thực chạy trên một giải pháp lưu trữ đám mây tập trung duy nhất, thì càng trở nên nguy hiểm hơn cho những người dùng này. Bất kỳ sự kiện nào khiến các nhà cung cấp này ngoại tuyến, cho dù là do một cuộc tấn công, yêu cầu pháp lý, hoặc chỉ là mất điện/internet, sẽ dẫn đến việc mọi máy khách trình xác thực phụ thuộc vào máy chủ này đều ngoại tuyến cùng một lúc.

Hình phạt vì ngoại tuyến phụ thuộc vào số lượng nút xác thực khác đang ngoại tuyến cùng một lúc. Sử dụng VPS làm tăng đáng kể nguy cơ làm cho hình phạt vì ngoại tuyến trở nên nghiêm trọng hơn, đồng thời tăng nguy cơ rò rỉ theo cấp số nhân hoặc cắt giảm nếu sự cố ngừng chạy đủ lớn. Để giảm thiểu rủi ro cho chính bạn và cho cả mạng lưới, người dùng được khuyến khích mạnh mẽ để mua và vận hành phần cứng của riêng mình.
</ExpandableCard>

<ExpandableCard title="Làm cách nào để mở khóa phần thưởng hoặc lấy lại ETH của tôi?">

Bất kỳ hình thức rút tiền nào từ Beacon Chain cũng yêu cầu thiết lập thông tin xác thực rút tiền.

Những người đặt cược mới sẽ thiết lập điều này tại thời điểm tạo khóa và ký gửi. Những người đặt cược hiện tại chưa thực hiện thiết lập có thể nâng cấp khóa để hỗ trợ chức năng này.

Sau khi thiết lập thông tin xác thực rút tiền, các khoản thanh toán phần thưởng (ETH tích lũy vượt quá 32 ban đầu) sẽ được phân phối định kỳ tự động đến địa chỉ rút tiền.

Để mở khóa và nhận lại toàn bộ số tiền của bạn, bạn cũng phải hoàn tất quá trình thoát nút xác thực.

<ButtonLink href="/staking/withdrawals/">Tìm hiểu thêm về rút tiền đặt cọc</ButtonLink>
</ExpandableCard>

## Đọc thêm {#further-reading}

- [Thư mục Đặt cọc Ethereum](https://www.staking.directory/) - _Eridian and Spacesider_
- [Vấn đề về sự đa dạng máy khách của Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Hỗ trợ sự đa dạng máy khách](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Sự đa dạng máy khách trên lớp đồng thuận của Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Hướng dẫn: Mua sắm phần cứng cho trình xác thực Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Mẹo phòng chống cắt giảm trên Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
