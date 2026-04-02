---
title: "Bằng chứng không tiết lộ thông tin"
description: "Lời giới thiệu không mang tính kỹ thuật về phương thức chứng thực ẩn danh dành cho người mới bắt đầu."
lang: vi
---

# Chứng thực ẩn danh là gì? {#what-are-zk-proofs}

Chứng thực ẩn danh là phương thức cung cấp tính hợp lệ của một xác nhận mà không tiết lộ bản xác nhận đó. “Người chứng minh” là bên cố gắng chứng minh một tuyên bố, trong khi “người xác minh” có trách nhiệm xác thực tuyên bố đó.

Bằng chứng không kiến thức lần đầu tiên xuất hiện trong một bài báo năm 1985, “[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)” cung cấp một định nghĩa về bằng chứng không kiến thức được sử dụng rộng rãi ngày nay:

> Giao thức không kiến thức là một phương pháp mà theo đó một bên (người chứng minh) **có thể chứng minh** cho một bên khác (người xác minh) **rằng một điều gì đó là đúng mà không tiết lộ bất kỳ thông tin nào** ngoài thực tế là tuyên bố cụ thể này là đúng.

Chứng thực ẩn danh đã được cải thiện qua nhiều năm và hiện đang được sử dụng trong một số ứng dụng thực tế.

<YouTube id="fOGdb1CTu5c" />

## Tại sao chúng ta cần chứng thực ẩn danh? Tại sao bằng chứng không kiến thức lại quan trọng {#why-zero-knowledge-proofs-are-important}

Bằng chứng không cần thông tin đại diện cho một bước đột phá trong mật mã ứng dụng vì chúng hứa hẹn sẽ cải thiện tính bảo mật thông tin cho các cá nhân. Hãy xem xét cách bạn có thể chứng minh tuyên bố (ví dụ: “Tôi là công dân của quốc gia X”) cho một bên khác (ví dụ: nhà cung cấp dịch vụ). Bạn cần cung cấp “bằng chứng” để chứng minh tuyên bố của mình, chẳng hạn như hộ chiếu quốc gia hoặc bằng lái xe.

Nhưng cách tiếp cận này có vấn đề, chủ yếu là sự riêng tư. Thông tin nhận dạng cá nhân (PII) được chia sẻ với các dịch vụ bên thứ ba được lưu trữ trong cơ sở dữ liệu trung tâm, rất dễ bị tấn công. Với việc những hành vi trộm cắp danh tính đang trở thành một vấn đề nghiêm trọng, cần có nhiều phương tiện bảo vệ quyền riêng tư hơn để chia sẻ thông tin nhạy cảm.

Bằng chứng không kiến thức giải quyết vấn đề này bằng cách **loại bỏ nhu cầu tiết lộ thông tin để chứng minh tính hợp lệ của các tuyên bố**. Giao thức không cần thông tin sử dụng tuyên bố (được gọi là 'nhân chứng') làm đầu vào để tạo ra bằng chứng ngắn gọn về tính hợp lệ của tuyên bố đó. Bằng chứng này cung cấp sự đảm bảo chắc chắn rằng một tuyên bố là đúng mà không làm lộ thông tin được sử dụng để tạo ra tuyên bố đó.

Quay trở lại ví dụ trước đó, bằng chứng duy nhất bạn cần để chứng minh tuyên bố công dân của mình là bằng chứng không cần thông tin. Người xác minh chỉ phải kiểm tra xem một số thuộc tính nhất định của bằng chứng có đúng hay không để tin rằng tuyên bố cơ bản cũng đúng.

## Các trường hợp sử dụng bằng chứng không kiến thức {#use-cases-for-zero-knowledge-proofs}

### Thanh toán ẩn danh {#anonymous-payments}

Thanh toán bằng thẻ tín dụng thường được nhiều bên biết đến, bao gồm nhà cung cấp dịch vụ thanh toán, ngân hàng và các bên liên quan khác (ví dụ: cơ quan chính phủ). Mặc dù giám sát tài chính có lợi trong việc xác định hoạt động bất hợp pháp, nhưng nó cũng làm suy yếu quyền riêng tư của người dân bình thường.

Tiền điện tử được thiết kế để cung cấp cho người dùng phương tiện thực hiện các giao dịch ngang hàng một cách riêng tư. Nhưng hầu hết các giao dịch tiền điện tử đều được hiển thị công khai trên blockchain công khai. Danh tính người dùng thường là ẩn danh và được liên kết cố ý với danh tính ngoài đời thực (ví dụ: bằng cách đưa địa chỉ ETH vào hồ sơ Twitter hoặc GitHub) hoặc có thể được liên kết với danh tính ngoài đời thực bằng cách sử dụng phân tích dữ liệu cơ bản trên và ngoài chuỗi.

Có những “đồng tiền riêng tư” cụ thể được thiết kế cho các giao dịch hoàn toàn ẩn danh. Các blockchain tập trung vào quyền riêng tư, chẳng hạn như Zcash và Monero, bảo vệ thông tin chi tiết về giao dịch, bao gồm địa chỉ người gửi/người nhận, loại tài sản, số lượng và mốc thời gian giao dịch.

Bằng cách tích hợp công nghệ không kiến thức vào giao thức, các mạng [blockchain](/glossary/#blockchain) tập trung vào quyền riêng tư cho phép các [nút](/glossary/#node) xác thực giao dịch mà không cần truy cập dữ liệu giao dịch. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) là một ví dụ về một thiết kế được đề xuất sẽ cho phép chuyển giao giá trị riêng tư nguyên bản trên chuỗi khối Ethereum. Tuy nhiên, những đề xuất như vậy khó thực hiện do nhiều lo ngại về bảo mật, quy định và lo lắng về UX.

**Chứng thực ẩn danh cũng đang được áp dụng để ẩn danh các giao dịch trên blockchain công khai**. Một ví dụ là Tornado Cash, một dịch vụ phi tập trung, không lưu ký cho phép người dùng thực hiện các giao dịch riêng tư trên Ethereum. Tornado Cash sử dụng chứng thực ẩn danh để che giấu chi tiết giao dịch và đảm bảo quyền riêng tư về tài chính. Thật không may, vì đây là những công cụ bảo mật tự nguyên tham gia nên chúng có liên quan đến hoạt động bất hợp pháp. Để khắc phục điều này, quyền riêng tư cuối cùng phải trở thành mặc định trên các blockchain công khai. Tìm hiểu thêm về [quyền riêng tư trên Ethereum](/privacy/).

### Bảo vệ danh tính {#identity-protection}

Các hệ thống quản lý danh tính hiện tại có thể gây nguy hiểm cho thông tin cá nhân. Chứng thực ẩn danh có thể giúp cá nhân xác thực danh tính đồng thời bảo vệ các thông tin nhạy cảm.

Bằng chứng không kiến thức đặc biệt hữu ích trong bối cảnh [danh tính phi tập trung](/decentralized-identity/). Nhận dạng phi tập trung (còn được gọi là 'nhận dạng tự chủ') cung cấp cho cá nhân khả năng kiểm soát quyền truy cập vào thông tin nhận dạng cá nhân. Việc chứng minh quyền công dân của bạn mà không tiết lộ mã số thuế hoặc thông tin hộ chiếu là một ví dụ điển hình về cách công nghệ không thông tin cho phép xác định danh tính phi tập trung.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Danh tính trong thực tế: ID kỹ thuật số quốc gia (NDI) của Bhutan trên Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Một ví dụ trong thế giới thực về việc sử dụng ZKP cho các hệ thống quản lý danh tính là hệ thống ID kỹ thuật số quốc gia (NDI) của Vương quốc Bhutan, được xây dựng trên Ethereum. NDI của Bhutan sử dụng ZKP để cho phép công dân chứng minh một cách mã hóa các sự thật về bản thân họ, như "Tôi là một công dân" hoặc "Tôi trên 18 tuổi", mà không tiết lộ dữ liệu cá nhân nhạy cảm trên ID của họ.
      </p>
      <p>Tìm hiểu thêm về NDI của Bhutan trong <a href="/decentralized-identity/#national-and-government-id">nghiên cứu tình huống về Danh tính phi tập trung</a>.</p>
</AlertDescription>
</AlertContent>
</Alert>

### Bằng chứng về tư cách con người {#proof-of-humanity}

Một trong những ví dụ được sử dụng rộng rãi nhất về bằng chứng không kiến thức trong thực tế ngày nay là [giao thức World ID](https://world.org/blog/world/world-id-faqs), có thể được coi là “hộ chiếu kỹ thuật số toàn cầu cho thời đại AI.” Nó cho phép mọi người chứng minh họ là những cá nhân độc nhất mà không cần tiết lộ thông tin cá nhân. Điều này được thực hiện thông qua một thiết bị gọi là Orb, có chức năng quét mống mắt của một người và tạo ra mã mống mắt. Mã mống mắt được kiểm tra và xác minh để xác nhận người đó là một cá thể con người độc nhất. Sau khi xác minh, cam kết về danh tính được tạo trên thiết bị của người dùng (và không được liên kết hoặc lấy từ dữ liệu sinh trắc học) sẽ được thêm vào danh sách an toàn trên blockchain. Sau đó, bất cứ khi nào người dùng muốn chứng minh họ là người đã được xác minh - cho dù là đăng nhập, bỏ phiếu hay thực hiện các hành động khác - họ có thể tạo bằng chứng không cần kiến ​​thức để xác nhận tư cách thành viên của họ trong danh sách. Cái hay của việc sử dụng chứng thực ẩn danh là chỉ có một tuyên bố được tiết lộ: người này là duy nhất. Mọi thứ khác đều được giữ kín.

World ID dựa trên [giao thức Semaphore](https://docs.semaphore.pse.dev/) do [nhóm PSE](https://pse.dev/) tại Ethereum Foundation phát triển. Semaphore được thiết kế để trở thành một giải pháp nhẹ nhưng mạnh mẽ để tạo và xác minh chứng thực ẩn danh. Nó cho phép người dùng chứng minh họ là thành viên của một nhóm (trong trường hợp này là những người đã được xác minh) mà không cần tiết lộ họ là thành viên nào của nhóm. Semaphore cũng rất linh hoạt, cho phép tạo nhóm dựa trên nhiều tiêu chí khác nhau như xác minh danh tính, tham gia sự kiện hoặc quyền sở hữu thông tin xác thực.

### Xác thực {#authentication}

Để sử dụng các dịch vụ trực tuyến, bạn phải chứng minh danh tính và quyền truy cập vào các nền tảng đó. Điều này thường yêu cầu cung cấp thông tin cá nhân, như tên, địa chỉ email, ngày sinh, v.v. Bạn cũng có thể cần phải ghi nhớ mật khẩu dài hoặc có nguy cơ mất quyền truy cập.

Tuy nhiên, chứng thực ẩn danh có thể đơn giản hóa quá trình xác thực cho cả nền tảng và người dùng. Khi một chứng thực ZK đã được tạo ra bằng cách sử dụng các đầu vào công khai (ví dụ: dữ liệu chứng minh sự tham gia của người dùng vào nền tảng) và các đầu vào riêng tư (ví dụ: thông tin cá nhân của người dùng), người dùng có thể đơn giản trình bày nó để xác thực danh tính của mình khi cần truy cập vào dịch vụ. Điều này cải thiện trải nghiệm cho người dùng và giải phóng các tổ chức khỏi nhu cầu lưu trữ một lượng lớn thông tin của người dùng.

### Tính toán có thể xác minh {#verifiable-computation}

Tính toán có thể xác minh là một ứng dụng khác của công nghệ không có kiến thức nhằm cải thiện thiết kế blockchain. Tính toán có thể xác minh cho phép chúng ta chuyển giao việc tính toán cho một thực thể khác trong khi vẫn đảm bảo kết quả có thể xác minh. Thực thể gửi kết quả cùng với chứng minh xác nhận rằng chương trình đã được thực hiện đúng cách.

Tính toán có thể xác minh là **yếu tố quan trọng để cải thiện tốc độ xử lý trên các chuỗi khối** mà không làm giảm tính bảo mật. Để hiểu điều này, cần biết sự khác biệt trong các giải pháp được đề xuất nhằm mở rộng Ethereum.

[Các giải pháp mở rộng quy mô trên chuỗi](/developers/docs/scaling/#onchain-scaling), chẳng hạn như sharding, đòi hỏi phải sửa đổi sâu rộng lớp cơ sở của chuỗi khối. Tuy nhiên, phương pháp này có độ phức tạp cao và những sai sót trong việc triển khai có thể làm suy yếu mô hình an ninh của Ethereum.

[Các giải pháp mở rộng quy mô ngoài chuỗi](/developers/docs/scaling/#offchain-scaling) không yêu cầu thiết kế lại giao thức cốt lõi của Ethereum. Thay vào đó, họ dựa vào một mô hình tính toán được thuê ngoài để cải thiện thông lượng trên lớp cơ sở của Ethereum.

Đây là cách mà điều đó hoạt động trong thực tiễn:

- Thay vì xử lý từng giao dịch, Ethereum chuyển giao việc thực thi sang một chuỗi riêng biệt.

- Sau khi xử lý các giao dịch, chuỗi khác sẽ trả lại kết quả để được áp dụng vào trạng thái của Ethereum.

Lợi ích ở đây là Ethereum không cần phải thực hiện bất kỳ thao tác nào và chỉ cần áp dụng kết quả từ việc tính toán bên ngoài vào trạng thái của nó. Điều này giảm thiểu tình trạng tắc nghẽn mạng và cũng cải thiện tốc độ giao dịch (các giao thức ngoài chuỗi tối ưu hóa cho việc thực thi nhanh hơn).

Chuỗi cần một phương pháp để xác thực các giao dịch ngoài chuỗi mà không cần phải thực hiện lại chúng, nếu không thì giá trị của việc thực hiện ngoài chuỗi sẽ bị mất.

Đây là nơi tính toán có thể xác minh phát huy tác dụng. Khi một nút thực hiện giao dịch bên ngoài Ethereum, nó gửi một bằng chứng không biết để chứng minh tính chính xác của việc thực hiện ngoài chuỗi. Bằng chứng này (được gọi là [bằng chứng hợp lệ](/glossary/#validity-proof)) đảm bảo rằng một giao dịch là hợp lệ, cho phép Ethereum áp dụng kết quả vào trạng thái của nó—mà không cần đợi bất kỳ ai tranh chấp.

[Bản tổng hợp không kiến thức](/developers/docs/scaling/zk-rollups) và [validium](/developers/docs/scaling/validium/) là hai giải pháp mở rộng quy mô ngoài chuỗi sử dụng bằng chứng hợp lệ để cung cấp khả năng mở rộng an toàn. Các giao thức này thực hiện hàng ngàn giao dịch ngoài chuỗi và gửi chứng cứ để xác minh trên Ethereum. Những kết quả đó có thể được áp dụng ngay lập tức sau khi chứng minh được xác thực, cho phép Ethereum xử lý nhiều giao dịch hơn mà không cần tăng cường tính toán trên lớp cơ sở.

Ngoai viec mo rong lop 2, bang chung khong kien thuc cung co the tu xac minh viec thuc thi Khoi Ethereum L1. zkEVM cho viec xac minh L1 se cho phep trinh xac thuc xac minh cac Khoi bang cach kiem tra mot bang chung thay vi thuc thi lai tat ca cac giao dich -- cho phep gioi han gas cao hon ma khong lam tang yeu cau phan cung cua trinh xac thuc.

### Giảm thiểu hối lộ và thông đồng trong bỏ phiếu trên chuỗi {#secure-blockchain-voting}

Các hệ thống bỏ phiếu dựa trên blockchain có nhiều đặc điểm thuận lợi: chúng hoàn toàn có thể được kiểm toán, an toàn trước các cuộc tấn công, chống lại sự kiểm duyệt, và không bị ràng buộc về mặt địa lý. Nhưng ngay cả các cơ chế bỏ phiếu trên chuỗi cũng không miễn nhiễm với vấn đề **thông đồng**.

Được định nghĩa là "phối hợp để hạn chế cạnh tranh công khai bằng cách lừa dối, gian lận và đánh lừa người khác", sự thông đồng có thể thể hiện dưới hình thức một thực thể độc hại tác động đến việc bỏ phiếu bằng cách đưa ra hối lộ. Ví dụ, Alice có thể nhận hối lộ từ Bob để bỏ phiếu cho `lựa chọn B` trên một lá phiếu ngay cả khi cô ấy thích `lựa chọn A`.

Hối lộ và thông đồng hạn chế hiệu quả của bất kỳ quy trình nào sử dụng bỏ phiếu như một cơ chế tín hiệu (đặc biệt là khi người dùng có thể chứng minh cách họ đã bỏ phiếu). Điều này có thể có những hậu quả đáng kể, đặc biệt là khi các phiếu bầu có trách nhiệm phân bố tài nguyên khan hiếm.

Ví dụ, [các cơ chế cấp vốn bậc hai](https://www.radicalxchange.org/wiki/plural-funding/) dựa vào các khoản quyên góp để đo lường sự ưu tiên cho các lựa chọn nhất định giữa các dự án hàng hóa công cộng khác nhau. Mỗi khoản đóng góp được coi như một "phiếu bầu" cho một dự án cụ thể, với các dự án nhận được nhiều phiếu bầu hơn sẽ nhận được nhiều quỹ hơn từ nguồn tài trợ kèm theo.

Việc sử dụng bỏ phiếu trên chuỗi làm cho quỹ cấp bậc dễ bị sự thông đồng: giao dịch blockchain là công khai, vì vậy những kẻ hối lộ có thể kiểm tra hoạt động trên chuỗi của người nhận hối lộ để xem cách họ "bỏ phiếu". Theo cách này, quỹ hình chữ nhật không còn là một phương tiện hiệu quả để phân bố tài chính dựa trên những ưu tiên kết hợp của cộng đồng.

May mắn thay, các giải pháp mới hơn như MACI (Cơ sở hạ tầng chống thông đồng tối thiểu) đang sử dụng bằng chứng không kiến thức để làm cho việc bỏ phiếu trên chuỗi (ví dụ: cơ chế cấp vốn bậc hai) có khả năng chống hối lộ và thông đồng. MACI là một bộ các hợp đồng thông minh và tập lệnh cho phép quản trị viên trung tâm (được gọi là "người điều phối") tổng hợp các phiếu bầu và kiểm đếm kết quả _mà không_ tiết lộ chi tiết về cách mỗi cá nhân đã bỏ phiếu. Tuy nhiên, vẫn có thể xác minh rằng các phiếu bầu đã được tính đúng cách, hoặc xác nhận rằng một cá nhân cụ thể đã tham gia vào vòng bầu cử.

#### MACI hoạt động như thế nào với các chứng minh không biết? {#how-maci-works-with-zk-proofs}

Ngay từ đầu, điều phối viên triển khai hợp đồng MACI trên Ethereum, sau đó người dùng có thể đăng ký tham gia bỏ phiếu (bằng cách đăng ký khóa công khai của họ trong hợp đồng thông minh). Người dùng bỏ phiếu bằng cách gửi các tin nhắn được mã hóa bằng khóa công khai của họ tới hợp đồng thông minh (một lá phiếu hợp lệ phải được ký bằng khóa công khai mới nhất liên kết với danh tính của người dùng, cùng với một số tiêu chí khác). Sau đó, điều phối viên sẽ xử lý tất cả các tin nhắn sau khi thời gian bỏ phiếu kết thúc, tính toán số phiếu và xác minh kết quả trên chuỗi.

Trong MACI, các bằng chứng không có kiến thức được sử dụng để đảm bảo tính chính xác của việc tính toán bằng cách làm cho điều này không thể xảy ra: người điều phối không thể xử lý sai phiếu bầu và tổng hợp kết quả. Điều này đạt được bằng cách yêu cầu người điều phối tạo ra các bằng chứng ZK-SNARK xác minh rằng a) tất cả các tin nhắn đã được xử lý chính xác b) kết quả cuối cùng tương ứng với tổng của tất cả các phiếu bầu _hợp lệ_.

Vì vậy, ngay cả khi không công bố phân tích số phiếu theo từng người dùng (như thường lệ), MACI vẫn đảm bảo tính toàn vẹn của các kết quả đã được tính toán trong quá trình kiểm phiếu. Tính năng này hữu ích trong việc giảm hiệu quả của các sơ đồ cấu kết cơ bản. Chúng ta có thể khám phá khả năng này bằng cách sử dụng ví dụ trước đây về việc Bob hối lộ Alice để bầu cho một lựa chọn:

- Alice đăng ký bỏ phiếu bằng cách gửi khóa công khai của chúng đến hợp đồng thông minh.
- Alice đồng ý bỏ phiếu cho `lựa chọn B` để đổi lấy một khoản hối lộ từ Bob.
- Alice bỏ phiếu cho `lựa chọn B`.
- Alice bí mật gửi một giao dịch được mã hóa để thay đổi khóa công khai được liên kết với danh tính của mình trên hệ thống.
- Alice gửi một tin nhắn khác (được mã hóa) đến hợp đồng thông minh để bỏ phiếu cho `lựa chọn A` bằng khóa công khai mới.
- Alice cho Bob xem một giao dịch cho thấy cô ấy đã bỏ phiếu cho `lựa chọn B` (giao dịch này không hợp lệ vì khóa công khai không còn được liên kết với danh tính của Alice trong hệ thống)
- Trong khi xử lý tin nhắn, người điều phối sẽ bỏ qua phiếu bầu của Alice cho `lựa chọn B` và chỉ tính phiếu bầu cho `lựa chọn A`. Do đó, nỗ lực của Bob nhằm thông đồng với Alice và thao túng cuộc bỏ phiếu trên chuỗi gặp thất bại.

Việc sử dụng MACI _thực sự_ đòi hỏi phải tin tưởng người điều phối sẽ không thông đồng với những người hối lộ hoặc tự mình cố gắng hối lộ cử tri. Bởi vì bộ điều phối có thể giải mã tin nhắn của người dùng (cần thiết để tạo bằng chứng), do đó chúng có thể xác minh chính xác từng người đã bỏ phiếu như thế nào.

Tuy nhiên, trong những trường hợp mà người điều phối vẫn giữ được sự trung thực, MACI là một công cụ mạnh mẽ để đảm bảo tính thiêng liêng của việc bỏ phiếu trên chuỗi. Điều này giải thích sự phổ biến của nó trong các ứng dụng cấp vốn bậc hai (ví dụ: [clr.fund](https://clr.fund/#/about/maci)) vốn phụ thuộc nhiều vào tính toàn vẹn trong các lựa chọn bỏ phiếu của mỗi cá nhân.

[Tìm hiểu thêm về MACI](https://maci.pse.dev/).

## Chứng thực ẩn danh hoạt động ra sao? {#how-do-zero-knowledge-proofs-work}

Chứng thực ẩn danh cho phép bạn chứng minh sự thật của một tuyên bố mà không cần chia sẻ nội dung của tuyên bố đó hoặc tiết lộ cách bạn phát hiện ra sự thật. Để làm nó khả thi, giao thức ẩn danh dựa trên thuật toán lấy một số dữ liệu làm đầu vào và trả về 'đúng' hoặc 'sai' làm đầu ra.

Một giao thức ẩn danh phải đáp ứng các tiêu chí sau:

1. **Tính đầy đủ**: Nếu đầu vào hợp lệ, giao thức không kiến thức luôn trả về ‘true’. Do đó, nếu tuyên bố cơ bản là đúng và người chứng minh và người xác minh hành động trung thực thì bằng chứng có thể được chấp nhận.

2. **Tính đúng đắn**: Nếu đầu vào không hợp lệ, về mặt lý thuyết, không thể lừa giao thức không kiến thức trả về ‘true’. Do đó, một người chứng minh nói dối không thể lừa một người xác minh trung thực tin rằng một tuyên bố không hợp lệ là hợp lệ (trừ khi có một biên độ xác suất rất nhỏ).

3. **Không kiến thức**: Người xác minh không biết gì về một tuyên bố ngoài tính hợp lệ hay sai của nó (họ có “không kiến thức” về tuyên bố đó). Yêu cầu này cũng ngăn cản người xác minh lấy dữ liệu đầu vào ban đầu (nội dung của câu lệnh) từ bản chứng minh.

Ở dạng cơ bản, một bằng chứng không kiến thức bao gồm ba yếu tố: **dữ liệu chứng minh (witness)**, **thử thách (challenge)** và **phản hồi (response)**.

- **Dữ liệu chứng minh (Witness)**: Với bằng chứng không kiến thức, người chứng minh muốn chứng minh kiến thức về một số thông tin ẩn. Thông tin bí mật là “dữ liệu chứng minh” cho bằng chứng, và kiến ​​thức được cho là của người chứng minh về bằng chứng thiết lập nên một loạt câu hỏi mà chỉ có bên biết về thông tin mới có thể trả lời được. Vì vậy, người chứng minh bắt đầu quá trình chứng minh bằng cách chọn ngẫu nhiên một câu hỏi, tính toán câu trả lời và gửi cho người xác minh.

- **Thử thách (Challenge)**: Người xác minh chọn ngẫu nhiên một câu hỏi khác từ bộ câu hỏi và yêu cầu người chứng minh trả lời câu hỏi đó.

- **Phản hồi (Response)**: Người chứng minh chấp nhận câu hỏi, tính toán câu trả lời và gửi lại cho người xác minh. Phản hồi của người chứng minh cho phép người xác minh kiểm tra xem người chứng minh có thực sự được tiếp cận với dữ liệu đúng hay không. Để đảm bảo người chứng minh không đoán mò và nhận được câu trả lời đúng một cách tình cờ, người xác minh sẽ chọn thêm câu hỏi để hỏi. Bằng cách lặp lại tương tác này nhiều lần, khả năng người chứng minh giả mạo kiến ​​thức về nhân chứng sẽ giảm đáng kể cho đến khi người xác minh hài lòng.

Phần trên mô tả cấu trúc của một 'tương tác chứng thực ẩn danh'. Các giao thức ẩn danh sớm sử dụng việc chứng minh tương tác, trong đó việc xác minh tính hợp lệ của một tuyên bố yêu cầu có sự giao tiếp qua lại giữa người chứng minh và người xác minh.

Một ví dụ điển hình minh họa cách hoạt động của bằng chứng tương tác là câu chuyện nổi tiếng [về hang Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) của Jean-Jacques Quisquater. Trong câu chuyện, Peggy (người chứng minh) muốn chứng minh cho Victor (người xác minh) rằng cô biết câu thần chú để mở cánh cửa kỳ diệu mà không tiết lộ câu thần chú đó.

### Bằng chứng không kiến thức phi tương tác {#non-interactive-zero-knowledge-proofs}

Mặc dù có tính cách mạng, việc chứng minh tương tác đã có tác dụng hạn chế vì nó yêu cầu hai bên phải có mặt và tương tác nhiều lần. Ngay cả khi một bên xác thực tin tưởng vào sự trung thực của bên chứng minh, thì chứng cứ cũng sẽ không có sẵn để xác minh độc lập (việc tính toán một chứng cứ mới yêu cầu một tập hợp tin nhắn mới giữa bên chứng minh và bên xác thực).

Để giải quyết vấn đề này, Manuel Blum, Paul Feldman và Silvio Micali đã đề xuất [bằng chứng không kiến thức phi tương tác](https://dl.acm.org/doi/10.1145/62212.62222) đầu tiên, trong đó người chứng minh và người xác minh có một khóa chia sẻ. Điều này cho phép người chứng minh thể hiện kiến thức của họ về một số thông tin (tức là, nhân chứng) mà không cần cung cấp thông tin đó.

Khác với các chứng minh tương tác, các chứng minh không tương tác chỉ yêu cầu một vòng trao đổi thông tin giữa các bên tham gia (người chứng minh và người xác thực). Người chứng minh chuyển giao thông tin bí mật cho một thuật toán đặc biệt để tính toán một chứng minh không có kiến thức. Bằng chứng này được gửi đến người xác minh, người sẽ kiểm tra xem người chứng minh có biết thông tin bí mật hay không bằng cách sử dụng một thuật toán khác.

Chứng minh phi tương tác giảm thiểu sự giao tiếp giữa người chứng minh và người xác minh, làm cho các chứng minh ZK trở nên hiệu quả hơn. Hơn nữa, một khi một bằng chứng được tạo ra, nó sẽ có sẵn cho bất kỳ ai khác (có quyền truy cập vào khóa chia sẻ và thuật toán xác minh) để kiểm tra.

Các chứng minh không tương tác đã đại diện cho một bước đột phá trong công nghệ không tiết lộ và thúc đẩy sự phát triển của các hệ thống chứng minh được sử dụng hiện nay. Chúng tôi sẽ thảo luận về các loại chứng minh này dưới đây:

### Các loại bằng chứng không kiến thức {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK là từ viết tắt của **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Giao thức ZK-SNARK có những đặc tính sau:

- **Không kiến thức (Zero-knowledge)**: Người xác minh có thể xác thực tính toàn vẹn của một tuyên bố mà không cần biết bất kỳ điều gì khác về tuyên bố đó. Kiến thức duy nhất mà người xác nhận có về tuyên bố là liệu nó có đúng hay sai.

- **Ngắn gọn (Succinct)**: Bằng chứng không kiến thức nhỏ hơn dữ liệu chứng minh và có thể được xác minh nhanh chóng.

- **Phi tương tác (Non-interactive)**: Bằng chứng được coi là 'phi tương tác' vì người chứng minh và người xác minh chỉ tương tác một lần, không giống như các bằng chứng tương tác yêu cầu nhiều vòng giao tiếp.

- **Luận cứ (Argument)**: Bằng chứng thỏa mãn yêu cầu về ‘tính đúng đắn’, vì vậy việc gian lận là cực kỳ khó xảy ra.

- **(Of) Knowledge (Về tri thức)**: Bằng chứng không kiến thức không thể được tạo ra nếu không có quyền truy cập vào thông tin bí mật (dữ liệu chứng minh). Thật khó khăn, nếu không muốn nói là không thể, cho một người chứng minh không có nhân chứng để tính toán một chứng thực ẩn danh hợp lệ.

‘Khóa chia sẻ’ được đề cập trước đây chỉ các tham số công khai mà bên đưa ra chứng minh và bên xác minh đồng ý sử dụng để tạo ra và xác minh các chứng cứ. Việc tạo ra các tham số công khai (c collectively known as the Common Reference String (CRS)) là một hoạt động nhạy cảm do tầm quan trọng của nó trong việc bảo mật của giao thức. Nếu độ hỗn loạn (sự ngẫu nhiên) được sử dụng trong việc tạo ra CRS rơi vào tay một người chứng minh không trung thực, họ có thể tính toán ra các chứng minh sai.

[Tính toán đa bên (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) là một cách để giảm thiểu rủi ro trong việc tạo ra các tham số công khai. Nhiều bên tham gia vào một [buổi lễ thiết lập đáng tin cậy](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), nơi mỗi người đóng góp một số giá trị ngẫu nhiên để tạo CRS. Miễn là một bên trung thực tiêu hủy phần nhiễu loạn của họ, giao thức ZK-SNARK vẫn duy trì độ vững chắc tính toán.

Các thiết lập đáng tin cậy yêu cầu người dùng tin tưởng vào các bên tham gia trong việc sinh tham số. Tuy nhiên, sự phát triển của ZK-STARKs đã cho phép các giao thức chứng minh hoạt động với một cấu hình không đáng tin cậy.

#### ZK-STARKs {#zk-starks}

ZK-STARK là từ viết tắt của **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARKs tương tự như ZK-SNARKs, chỉ khác là chúng:

- **Khả năng mở rộng (Scalable)**: ZK-STARK nhanh hơn ZK-SNARK trong việc tạo và xác minh bằng chứng khi kích thước của dữ liệu chứng minh lớn hơn. Với các chứng minh STARK, thời gian chứng minh và kiểm tra chỉ tăng nhẹ khi kích thước chứng cứ tăng lên (thời gian chứng minh và kiểm tra SNARK tăng theo tỷ lệ tuyến tính với kích thước chứng cứ).

- **Minh bạch (Transparent)**: ZK-STARK dựa vào tính ngẫu nhiên có thể xác minh công khai để tạo các tham số công khai cho việc chứng minh và xác minh thay vì một thiết lập đáng tin cậy. Do đó, chúng minh bạch hơn so với ZK-SNARKs.

ZK-STARKs tạo ra các chứng cứ lớn hơn so với ZK-SNARKs, điều đó có nghĩa là chúng thường có chi phí xác minh cao hơn. Tuy nhiên, có những trường hợp (chẳng hạn như việc chứng minh các tập dữ liệu lớn) mà ZK-STARKs có thể hiệu quả về chi phí hơn so với ZK-SNARKs.

## Nhược điểm của việc sử dụng bằng chứng không kiến thức {#drawbacks-of-using-zero-knowledge-proofs}

### Chi phí phần cứng {#hardware-costs}

Quá trình tạo ra các bằng chứng zero-knowledge đòi hỏi thực hiện các phép tính phức tạp cần được thực hiện trên các cổ máy chuyên dụng. Những máy móc này thường rất đắt tiền, vượt quá khả năng chi trả của người dùng thông thường. Ngoài ra, các ứng dụng muốn sử dụng công nghệ ZK-Proof phải tính đến chi phí phần cứng và nó có thể vô tình làm tăng chi phí cho người dùng cuối.

### Chi phí xác minh bằng chứng {#proof-verification-costs}

Kiểm tra tính hợp lệ của các bằng chứng cũng đòi hỏi phải áp dụng tính toán phức tạp, dẫn đến việc tăng chi phí triển khai công nghệ zero-knowledge trong các ứng dụng. Chi phí này đặc biệt quan trọng trong ngữ cảnh chứng minh các phép tính. Ví dụ, ZK-rollup trên Ethereum phải trả khoảng 500.000 gas để xác minh một bằng chứng ZK-SNARK, trong khi ZK-STARK thậm chí còn đắt hơn.

### Các giả định về sự tin cậy {#trust-assumptions}

Trong ZK-SNARK, Chuỗi Tham Chiếu Chung (Common Reference String - thông số công khai) được tạo một lần và có thể được sử dụng lại cho những bên muốn tham gia giao thức zero-knowledge. Tuy nhiên, thông số công khai này được tạo ra thông qua một nghi thức thiết lập đáng tin cậy, nơi mà tất cả người tham gia được cho là trung thực.

Người dùng không có cách nào thực sự để đánh giá tính trung thực của những người tham gia và phải tin tưởng vào lời của nhà phát triển. ZK-STARK khắc phục nhược điểm này vì tính ngẫu nhiên được sử dụng để tạo chuỗi có thể được xác minh công khai. Trong khi đó, các nhà nghiên cứu đang nỗ lực tạo ra các thiết lập không cần tin cậy cho ZK-SNARK để tăng cường bảo mật cho các cơ chế chứng minh.

### Các mối đe dọa từ điện toán lượng tử {#quantum-computing-threats}

ZK-SNARK sử dụng mật mã đường cong ellip để mã hóa. Trong khi bài toán logarit rời rạc trên đường cong elip được cho là khó giải quyết vào thời điểm hiện tại, sự phát triển của máy tính lượng tử có thể phá vỡ mô hình bảo mật này trong tương lai.

ZK-STARK được coi là miễn nhiễm với mối đe dọa từ điện toán lượng tử, vì nó chỉ dựa vào các hàm băm chống va chạm để đảm bảo an ninh. Không giống như cơ chế ghép nối khóa công khai - khóa riêng tư được sử dụng trong mật mã đường cong elip, hàm băm kháng va chạm khó bị các thuật toán máy tính lượng tử bẻ khóa hơn.

## Đọc thêm {#further-reading}

- [Tổng quan về các trường hợp sử dụng bằng chứng không kiến thức](https://pse.dev/projects) — _Privacy and Scaling Explorations Team_
- [SNARKs vs. STARKS vs. Recursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Bằng chứng không kiến thức: Cải thiện quyền riêng tư trên một chuỗi khối](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Một ví dụ thực tế về không kiến thức và phân tích chuyên sâu](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Tạo ra sự tin cậy có thể xác minh, ngay cả khi đối đầu với máy tính lượng tử](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Giới thiệu sơ lược về cách zk-SNARKs có thể thực hiện được](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Tại sao Bằng chứng không kiến thức (ZKP) là yếu tố thay đổi cuộc chơi đối với danh tính tự chủ](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [Giải thích về EIP-7503: Cho phép chuyển tiền riêng tư trên Ethereum bằng bằng chứng ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Trò chơi thẻ bài ZK: trò chơi để tìm hiểu các nguyên tắc cơ bản của ZK và các trường hợp sử dụng trong đời thực](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
