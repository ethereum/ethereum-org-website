---
title: Bằng chứng không kiến thức là gì?
metaTitle: Bằng chứng không kiến thức
description: Giới thiệu phi kỹ thuật về bằng chứng không kiến thức dành cho người mới bắt đầu.
lang: vi
---

Bằng chứng không kiến thức là một cách để chứng minh tính hợp lệ của một tuyên bố mà không tiết lộ chính tuyên bố đó. 'Trình chứng minh' là bên cố gắng chứng minh một khẳng định, trong khi 'trình xác minh' chịu trách nhiệm xác thực khẳng định đó.

Bằng chứng không kiến thức xuất hiện lần đầu trong một bài báo năm 1985, “[Độ phức tạp kiến thức của các hệ thống chứng minh tương tác](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)”, cung cấp một định nghĩa về bằng chứng không kiến thức được sử dụng rộng rãi ngày nay:

> Giao thức không tri thức là một phương pháp mà qua đó một bên (trình chứng minh) **có thể chứng minh** cho một bên khác (trình xác minh) **rằng một điều gì đó là đúng, mà không tiết lộ bất kỳ thông tin nào** ngoài việc tuyên bố cụ thể này là đúng.

Bằng chứng không kiến thức đã được cải thiện qua nhiều năm và hiện đang được sử dụng trong một số ứng dụng thực tế.

<VideoWatch slug="zero-knowledge-proofs-5-levels" />

## Tại sao chúng ta cần bằng chứng không kiến thức? {#why-zero-knowledge-proofs-are-important}

Bằng chứng không kiến thức đại diện cho một bước đột phá trong mật mã học ứng dụng, vì chúng hứa hẹn cải thiện bảo mật thông tin cho các cá nhân. Hãy xem xét cách bạn có thể chứng minh một khẳng định (ví dụ: "Tôi là công dân của quốc gia X") với một bên khác (ví dụ: nhà cung cấp dịch vụ). Bạn sẽ cần cung cấp "bằng chứng" để chứng minh cho khẳng định của mình, chẳng hạn như hộ chiếu quốc gia hoặc giấy phép lái xe.

Nhưng có những vấn đề với cách tiếp cận này, chủ yếu là thiếu quyền riêng tư. Thông tin nhận dạng cá nhân (PII) được chia sẻ với các dịch vụ của bên thứ ba được lưu trữ trong các cơ sở dữ liệu trung tâm, vốn dễ bị tấn công. Với việc đánh cắp danh tính trở thành một vấn đề nghiêm trọng, đã có những lời kêu gọi về các phương tiện bảo vệ quyền riêng tư hơn để chia sẻ thông tin nhạy cảm.

Bằng chứng không kiến thức giải quyết vấn đề này bằng cách **loại bỏ nhu cầu tiết lộ thông tin để chứng minh tính hợp lệ của các khẳng định**. Giao thức không tri thức sử dụng tuyên bố (được gọi là 'bằng chứng dữ liệu') làm đầu vào để tạo ra một bằng chứng ngắn gọn về tính hợp lệ của nó. Bằng chứng này cung cấp những đảm bảo mạnh mẽ rằng một tuyên bố là đúng mà không làm lộ thông tin được sử dụng để tạo ra nó.

Quay lại ví dụ trước của chúng ta, bằng chứng duy nhất bạn cần để chứng minh khẳng định quyền công dân của mình là một bằng chứng không kiến thức. Trình xác minh chỉ cần kiểm tra xem các thuộc tính nhất định của bằng chứng có đúng hay không để bị thuyết phục rằng tuyên bố cơ bản cũng đúng.

## Các trường hợp sử dụng cho bằng chứng không kiến thức {#use-cases-for-zero-knowledge-proofs}

### Thanh toán ẩn danh {#anonymous-payments}

Các khoản thanh toán bằng thẻ tín dụng thường hiển thị với nhiều bên, bao gồm nhà cung cấp dịch vụ thanh toán, ngân hàng và các bên quan tâm khác (ví dụ: cơ quan chính phủ). Mặc dù giám sát tài chính có lợi ích trong việc xác định hoạt động bất hợp pháp, nhưng nó cũng làm suy yếu quyền riêng tư của những công dân bình thường.

Tiền mã hóa được dự định cung cấp một phương tiện để người dùng thực hiện các giao dịch ngang hàng, riêng tư. Nhưng hầu hết các giao dịch tiền mã hóa đều hiển thị công khai trên các chuỗi khối công khai. Danh tính người dùng thường là ẩn danh và có thể được liên kết một cách có chủ ý với danh tính trong thế giới thực (ví dụ: bằng cách đưa địa chỉ ETH vào hồ sơ Twitter hoặc GitHub) hoặc có thể được liên kết với danh tính trong thế giới thực bằng cách sử dụng phân tích dữ liệu trên chuỗi và ngoài chuỗi cơ bản.

Có những "đồng tiền riêng tư" cụ thể được thiết kế cho các giao dịch hoàn toàn ẩn danh. Các chuỗi khối tập trung vào quyền riêng tư, chẳng hạn như Zcash và Monero, che chắn các chi tiết giao dịch, bao gồm địa chỉ người gửi/người nhận, loại tài sản, số lượng và dòng thời gian giao dịch.

Bằng cách tích hợp công nghệ không tri thức vào giao thức, các mạng lưới [chuỗi khối](/glossary/#blockchain) tập trung vào quyền riêng tư cho phép các [nút](/glossary/#node) xác thực các giao dịch mà không cần truy cập dữ liệu giao dịch. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) là một ví dụ về thiết kế được đề xuất sẽ cho phép chuyển giao giá trị riêng tư gốc trên chuỗi khối [Ethereum](/). Tuy nhiên, những đề xuất như vậy rất khó thực hiện do sự pha trộn của các mối quan tâm về bảo mật, quy định và trải nghiệm người dùng (UX).  

**Bằng chứng không kiến thức cũng đang được áp dụng để ẩn danh các giao dịch trên các chuỗi khối công khai**. Một ví dụ là Tornado Cash, một dịch vụ phi tập trung, không lưu ký cho phép người dùng thực hiện các giao dịch riêng tư trên Ethereum. Tornado Cash sử dụng bằng chứng không kiến thức để làm xáo trộn các chi tiết giao dịch và đảm bảo quyền riêng tư tài chính. Thật không may, vì đây là các công cụ quyền riêng tư "tùy chọn tham gia" nên chúng thường bị liên kết với các hoạt động bất hợp pháp. Để khắc phục điều này, quyền riêng tư cuối cùng phải trở thành mặc định trên các chuỗi khối công khai. Tìm hiểu thêm về [quyền riêng tư trên Ethereum](/privacy/).

### Bảo vệ danh tính {#identity-protection}

Các hệ thống quản lý danh tính hiện tại đặt thông tin cá nhân vào rủi ro. Bằng chứng không kiến thức có thể giúp các cá nhân xác thực danh tính trong khi bảo vệ các chi tiết nhạy cảm.

Bằng chứng không kiến thức đặc biệt hữu ích trong bối cảnh [danh tính phi tập trung (DID)](/decentralized-identity/). Danh tính phi tập trung (còn được mô tả là 'danh tính tự chủ') cung cấp cho cá nhân khả năng kiểm soát quyền truy cập vào các định danh cá nhân. Chứng minh quyền công dân của bạn mà không tiết lộ mã số thuế hoặc chi tiết hộ chiếu là một ví dụ điển hình về cách công nghệ không tri thức kích hoạt danh tính phi tập trung.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Danh tính trong thực tế: ID Kỹ thuật số Quốc gia (NDI) của Bhutan trên Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Một ví dụ thực tế về việc sử dụng ZKP cho các hệ thống quản lý danh tính là hệ thống ID Kỹ thuật số Quốc gia (NDI) của Vương quốc Bhutan, được xây dựng trên Ethereum. NDI của Bhutan sử dụng ZKP để cho phép công dân chứng minh bằng mật mã học các sự thật về bản thân họ, như "Tôi là công dân" hoặc "Tôi trên 18 tuổi", mà không tiết lộ dữ liệu cá nhân nhạy cảm trên ID của họ.
      </p>
      <p>
        Tìm hiểu thêm về NDI của Bhutan trong <a href="/decentralized-identity/#national-and-government-id">nghiên cứu tình huống về Danh tính phi tập trung</a>.
      </p>
    </AlertDescription>
  </AlertContent>
</Alert>

### Bằng chứng nhân tính {#proof-of-humanity}

Một trong những ví dụ được sử dụng rộng rãi nhất về bằng chứng không kiến thức trong thực tế hiện nay là [giao thức World ID](https://world.org/blog/world/world-id-faqs), có thể được coi là "hộ chiếu kỹ thuật số toàn cầu cho thời đại AI". Nó cho phép mọi người chứng minh họ là những cá nhân duy nhất mà không tiết lộ thông tin cá nhân. Điều này đạt được thông qua một thiết bị gọi là Orb, quét mống mắt của một người và tạo ra một mã mống mắt. Mã mống mắt được kiểm tra và xác minh để xác nhận người đó là một con người duy nhất về mặt sinh học. Sau khi xác minh, một cam kết danh tính được tạo trên thiết bị của người dùng (và không được liên kết hoặc bắt nguồn từ dữ liệu sinh trắc học) được thêm vào một danh sách an toàn trên chuỗi khối. Sau đó, bất cứ khi nào người dùng muốn chứng minh họ là một con người đã được xác minh – cho dù là để đăng nhập, bỏ phiếu hay thực hiện các hành động khác – họ có thể tạo ra một bằng chứng không kiến thức xác nhận tư cách thành viên của họ trong danh sách. Vẻ đẹp của việc sử dụng bằng chứng không kiến thức là chỉ có một tuyên bố được tiết lộ: người này là duy nhất. Mọi thứ khác đều được giữ riêng tư.

World ID dựa trên [giao thức Semaphore](https://docs.semaphore.pse.dev/) được phát triển bởi [nhóm PSE](https://pse.dev/) tại Tổ chức Ethereum. Semaphore được thiết kế để trở thành một cách nhẹ nhàng nhưng mạnh mẽ để tạo và xác minh các bằng chứng không kiến thức. Nó cho phép người dùng chứng minh họ là một phần của một nhóm (trong trường hợp này là những con người đã được xác minh) mà không cho thấy họ là thành viên nào của nhóm. Semaphore cũng rất linh hoạt, cho phép tạo các nhóm dựa trên nhiều tiêu chí khác nhau như xác minh danh tính, tham gia vào các sự kiện hoặc quyền sở hữu thông tin xác thực.

### Xác thực {#authentication}

Việc sử dụng các dịch vụ trực tuyến yêu cầu chứng minh danh tính và quyền truy cập vào các nền tảng đó. Điều này thường yêu cầu cung cấp thông tin cá nhân, như tên, địa chỉ email, ngày sinh, v.v. Bạn cũng có thể cần ghi nhớ các mật khẩu dài hoặc có nguy cơ mất quyền truy cập.

Tuy nhiên, bằng chứng không kiến thức có thể đơn giản hóa việc xác thực cho cả nền tảng và người dùng. Khi một bằng chứng ZK đã được tạo bằng cách sử dụng các đầu vào công khai (ví dụ: dữ liệu chứng thực tư cách thành viên của người dùng trên nền tảng) và các đầu vào riêng tư (ví dụ: chi tiết của người dùng), người dùng có thể chỉ cần xuất trình nó để xác thực danh tính của họ khi họ cần truy cập dịch vụ. Điều này cải thiện trải nghiệm cho người dùng và giải phóng các tổ chức khỏi nhu cầu lưu trữ lượng lớn thông tin người dùng.

### Tính toán có thể xác minh {#verifiable-computation}

Tính toán có thể xác minh là một ứng dụng khác của công nghệ không tri thức để cải thiện các thiết kế chuỗi khối. Tính toán có thể xác minh cho phép chúng ta thuê ngoài việc tính toán cho một thực thể khác trong khi vẫn duy trì các kết quả có thể xác minh. Thực thể đó gửi kết quả cùng với một bằng chứng xác minh rằng chương trình đã được thực thi chính xác.

Tính toán có thể xác minh là **rất quan trọng để cải thiện tốc độ xử lý trên các chuỗi khối** mà không làm giảm tính bảo mật. Để hiểu điều này đòi hỏi phải biết sự khác biệt trong các giải pháp được đề xuất để mở rộng quy mô Ethereum.

[Các giải pháp mở rộng quy mô trên chuỗi](/developers/docs/scaling/#onchain-scaling), chẳng hạn như phân mảnh, yêu cầu sửa đổi sâu rộng lớp cơ sở của chuỗi khối. Tuy nhiên, cách tiếp cận này rất phức tạp và các lỗi trong quá trình triển khai có thể làm suy yếu mô hình bảo mật của Ethereum.

[Các giải pháp mở rộng quy mô ngoài chuỗi](/developers/docs/scaling/#offchain-scaling) không yêu cầu thiết kế lại giao thức Ethereum cốt lõi. Thay vào đó, chúng dựa vào mô hình tính toán thuê ngoài để cải thiện thông lượng trên lớp cơ sở của Ethereum.

Dưới đây là cách thức hoạt động trong thực tế:

- Thay vì xử lý mọi giao dịch, Ethereum chuyển giao việc thực thi sang một chuỗi riêng biệt.

- Sau khi xử lý các giao dịch, chuỗi kia trả về kết quả để áp dụng vào trạng thái của Ethereum.

Lợi ích ở đây là Ethereum không phải thực hiện bất kỳ quá trình thực thi nào và chỉ cần áp dụng các kết quả từ tính toán thuê ngoài vào trạng thái của nó. Điều này làm giảm tắc nghẽn mạng lưới và cũng cải thiện tốc độ giao dịch (các giao thức ngoài chuỗi tối ưu hóa để thực thi nhanh hơn).

Chuỗi cần một cách để xác thực các giao dịch ngoài chuỗi mà không cần thực thi lại chúng, nếu không giá trị của việc thực thi ngoài chuỗi sẽ bị mất.

Đây là lúc tính toán có thể xác minh phát huy tác dụng. Khi một nút thực thi một giao dịch bên ngoài Ethereum, nó sẽ gửi một bằng chứng không kiến thức để chứng minh tính chính xác của việc thực thi ngoài chuỗi. Bằng chứng này (được gọi là [bằng chứng tính hợp lệ](/glossary/#validity-proof)) đảm bảo rằng một giao dịch là hợp lệ, cho phép Ethereum áp dụng kết quả vào trạng thái của nó—mà không cần chờ bất kỳ ai tranh chấp.

[Bản cuộn không tri thức](/developers/docs/scaling/zk-rollups) và [validium](/developers/docs/scaling/validium/) là hai giải pháp mở rộng quy mô ngoài chuỗi sử dụng bằng chứng tính hợp lệ để cung cấp khả năng mở rộng an toàn. Các giao thức này thực thi hàng ngàn giao dịch ngoài chuỗi và gửi bằng chứng để xác minh trên Ethereum. Những kết quả đó có thể được áp dụng ngay lập tức sau khi bằng chứng được xác minh, cho phép Ethereum xử lý nhiều giao dịch hơn mà không làm tăng tính toán trên lớp cơ sở.

Vượt ra ngoài việc mở rộng quy mô lớp 2 (l2), bằng chứng không kiến thức cũng có thể tự xác minh việc thực thi khối Ethereum L1. [zkEVM cho xác minh L1](/roadmap/zkevm/) sẽ cho phép các trình xác thực xác minh các khối bằng cách kiểm tra một bằng chứng thay vì thực thi lại tất cả các giao dịch—cho phép giới hạn Gas cao hơn mà không làm tăng yêu cầu phần cứng của trình xác thực.

### Giảm thiểu hối lộ và thông đồng trong bỏ phiếu trên chuỗi {#secure-blockchain-voting}

Các kế hoạch bỏ phiếu trên chuỗi khối có nhiều đặc điểm thuận lợi: chúng hoàn toàn có thể kiểm toán, an toàn trước các cuộc tấn công, chống kiểm duyệt và không bị ràng buộc về mặt địa lý. Nhưng ngay cả các kế hoạch bỏ phiếu trên chuỗi cũng không tránh khỏi vấn đề **thông đồng**.

Được định nghĩa là "phối hợp để hạn chế cạnh tranh mở bằng cách lừa dối, gian lận và gây hiểu lầm cho người khác", sự thông đồng có thể diễn ra dưới hình thức một tác nhân độc hại gây ảnh hưởng đến việc bỏ phiếu bằng cách đưa hối lộ. Ví dụ: Alice có thể nhận hối lộ từ Bob để bỏ phiếu cho `option B` trên một lá phiếu ngay cả khi cô ấy thích `option A` hơn.

Hối lộ và thông đồng làm hạn chế hiệu quả của bất kỳ quy trình nào sử dụng bỏ phiếu như một cơ chế báo hiệu (đặc biệt là khi người dùng có thể chứng minh họ đã bỏ phiếu như thế nào). Điều này có thể gây ra những hậu quả đáng kể, đặc biệt là khi các phiếu bầu chịu trách nhiệm phân bổ các nguồn tài nguyên khan hiếm.

Ví dụ, [các cơ chế tài trợ bậc hai](https://www.radicalxchange.org/wiki/plural-funding/) dựa vào các khoản quyên góp để đo lường mức độ ưu tiên cho các tùy chọn nhất định giữa các dự án hàng hóa công cộng khác nhau. Mỗi khoản quyên góp được tính là một "phiếu bầu" cho một dự án cụ thể, với các dự án nhận được nhiều phiếu bầu hơn sẽ nhận được nhiều tiền hơn từ quỹ đối ứng.

Việc sử dụng bỏ phiếu trên chuỗi làm cho tài trợ bậc hai dễ bị thông đồng: các giao dịch chuỗi khối là công khai, vì vậy những người đưa hối lộ có thể kiểm tra hoạt động trên chuỗi của người nhận hối lộ để xem họ đã "bỏ phiếu" như thế nào. Bằng cách này, tài trợ bậc hai không còn là một phương tiện hiệu quả để phân bổ vốn dựa trên các ưu tiên tổng hợp của cộng đồng.

May mắn thay, các giải pháp mới hơn như MACI (Cơ sở hạ tầng chống thông đồng tối thiểu) đang sử dụng bằng chứng không kiến thức để làm cho việc bỏ phiếu trên chuỗi (ví dụ: các cơ chế tài trợ bậc hai) có khả năng chống lại hối lộ và thông đồng. MACI là một tập hợp các hợp đồng thông minh và tập lệnh cho phép một quản trị viên trung tâm (được gọi là "điều phối viên") tổng hợp các phiếu bầu và kiểm đếm kết quả _mà không_ tiết lộ chi tiết về cách mỗi cá nhân đã bỏ phiếu. Mặc dù vậy, vẫn có thể xác minh rằng các phiếu bầu đã được đếm đúng cách hoặc xác nhận rằng một cá nhân cụ thể đã tham gia vào vòng bỏ phiếu.

#### MACI hoạt động như thế nào với bằng chứng không kiến thức? {#how-maci-works-with-zk-proofs}

Ban đầu, điều phối viên triển khai hợp đồng MACI trên Ethereum, sau đó người dùng có thể đăng ký bỏ phiếu (bằng cách đăng ký khóa công khai của họ trong hợp đồng thông minh). Người dùng bỏ phiếu bằng cách gửi các thông điệp được mã hóa bằng khóa công khai của họ đến hợp đồng thông minh (một phiếu bầu hợp lệ phải được ký bằng khóa công khai gần đây nhất được liên kết với danh tính của người dùng, cùng với các tiêu chí khác). Sau đó, điều phối viên xử lý tất cả các thông điệp khi thời gian bỏ phiếu kết thúc, kiểm đếm các phiếu bầu và xác minh kết quả trên chuỗi.

Trong MACI, bằng chứng không kiến thức được sử dụng để đảm bảo tính chính xác của tính toán bằng cách khiến điều phối viên không thể xử lý sai các phiếu bầu và kiểm đếm kết quả. Điều này đạt được bằng cách yêu cầu điều phối viên tạo ra các bằng chứng ZK-SNARK xác minh rằng a) tất cả các thông điệp đã được xử lý chính xác b) kết quả cuối cùng tương ứng với tổng của tất cả các phiếu bầu _hợp lệ_.

Do đó, ngay cả khi không chia sẻ bảng phân tích phiếu bầu của từng người dùng (như thường lệ), MACI vẫn đảm bảo tính toàn vẹn của các kết quả được tính toán trong quá trình kiểm đếm. Tính năng này rất hữu ích trong việc giảm hiệu quả của các kế hoạch thông đồng cơ bản. Chúng ta có thể khám phá khả năng này bằng cách sử dụng ví dụ trước đó về việc Bob hối lộ Alice để bỏ phiếu cho một tùy chọn:

- Alice đăng ký bỏ phiếu bằng cách gửi khóa công khai của mình đến một hợp đồng thông minh.
- Alice đồng ý bỏ phiếu cho `option B` để đổi lấy khoản hối lộ từ Bob.
- Alice bỏ phiếu cho `option B`.
- Alice bí mật gửi một giao dịch được mã hóa để thay đổi khóa công khai được liên kết với danh tính của cô ấy.
- Alice gửi một thông điệp (được mã hóa) khác đến hợp đồng thông minh để bỏ phiếu cho `option A` bằng cách sử dụng khóa công khai mới.
- Alice cho Bob xem một giao dịch cho thấy cô ấy đã bỏ phiếu cho `option B` (điều này không hợp lệ vì khóa công khai không còn được liên kết với danh tính của Alice trong hệ thống)
- Trong khi xử lý các thông điệp, điều phối viên bỏ qua phiếu bầu của Alice cho `option B` và chỉ tính phiếu bầu cho `option A`. Do đó, nỗ lực của Bob nhằm thông đồng với Alice và thao túng cuộc bỏ phiếu trên chuỗi đã thất bại.

Việc sử dụng MACI _thực sự_ yêu cầu tin tưởng điều phối viên không thông đồng với những người đưa hối lộ hoặc tự mình cố gắng hối lộ cử tri. Điều phối viên có thể giải mã các thông điệp của người dùng (cần thiết để tạo bằng chứng), vì vậy họ có thể xác minh chính xác cách mỗi người đã bỏ phiếu.

Nhưng trong những trường hợp điều phối viên vẫn trung thực, MACI đại diện cho một công cụ mạnh mẽ để đảm bảo tính thiêng liêng của việc bỏ phiếu trên chuỗi. Điều này giải thích sự phổ biến của nó trong các ứng dụng tài trợ bậc hai (ví dụ: [clr.fund](https://clr.fund/#/about/maci)) vốn phụ thuộc nhiều vào tính toàn vẹn trong các lựa chọn bỏ phiếu của mỗi cá nhân.

[Tìm hiểu thêm về MACI](https://maci.pse.dev/).

## Bằng chứng không kiến thức hoạt động như thế nào? {#how-do-zero-knowledge-proofs-work}

Bằng chứng không kiến thức cho phép bạn chứng minh tính đúng đắn của một tuyên bố mà không chia sẻ nội dung của tuyên bố hoặc tiết lộ cách bạn khám phá ra sự thật. Để làm được điều này, các giao thức không tri thức dựa vào các thuật toán lấy một số dữ liệu làm đầu vào và trả về 'đúng' hoặc 'sai' làm đầu ra.

Một giao thức không tri thức phải thỏa mãn các tiêu chí sau:

1. **Tính trọn vẹn (Completeness)**: Nếu đầu vào hợp lệ, giao thức không tri thức luôn trả về 'đúng'. Do đó, nếu tuyên bố cơ bản là đúng, và trình chứng minh cùng trình xác minh hành động trung thực, bằng chứng có thể được chấp nhận.

2. **Tính vững chắc (Soundness)**: Nếu đầu vào không hợp lệ, về mặt lý thuyết là không thể đánh lừa giao thức không tri thức để trả về 'đúng'. Do đó, một trình chứng minh nói dối không thể lừa một trình xác minh trung thực tin rằng một tuyên bố không hợp lệ là hợp lệ (ngoại trừ một xác suất rất nhỏ).

3. **Không tri thức (Zero-knowledge)**: Trình xác minh không biết gì về một tuyên bố ngoài tính hợp lệ hoặc sai trái của nó (họ có "không tri thức" về tuyên bố đó). Yêu cầu này cũng ngăn trình xác minh suy ra đầu vào ban đầu (nội dung của tuyên bố) từ bằng chứng.

Ở dạng cơ bản, một bằng chứng không kiến thức được tạo thành từ ba yếu tố: **bằng chứng dữ liệu**, **thử thách** và **phản hồi**.

- **Bằng chứng dữ liệu (Witness)**: Với một bằng chứng không kiến thức, trình chứng minh muốn chứng minh kiến thức về một số thông tin ẩn. Thông tin bí mật là "bằng chứng dữ liệu" cho bằng chứng, và kiến thức được giả định của trình chứng minh về bằng chứng dữ liệu thiết lập một tập hợp các câu hỏi chỉ có thể được trả lời bởi một bên có kiến thức về thông tin đó. Do đó, trình chứng minh bắt đầu quá trình chứng minh bằng cách chọn ngẫu nhiên một câu hỏi, tính toán câu trả lời và gửi nó cho trình xác minh.

- **Thử thách (Challenge)**: Trình xác minh chọn ngẫu nhiên một câu hỏi khác từ tập hợp và yêu cầu trình chứng minh trả lời nó.

- **Phản hồi (Response)**: Trình chứng minh chấp nhận câu hỏi, tính toán câu trả lời và trả lại cho trình xác minh. Phản hồi của trình chứng minh cho phép trình xác minh kiểm tra xem người trước có thực sự có quyền truy cập vào bằng chứng dữ liệu hay không. Để đảm bảo trình chứng minh không đoán mò và nhận được câu trả lời đúng một cách tình cờ, trình xác minh chọn thêm các câu hỏi để hỏi. Bằng cách lặp lại tương tác này nhiều lần, khả năng trình chứng minh giả mạo kiến thức về bằng chứng dữ liệu giảm đáng kể cho đến khi trình xác minh hài lòng.

Phần trên mô tả cấu trúc của một 'bằng chứng không kiến thức tương tác'. Các giao thức không tri thức ban đầu sử dụng chứng minh tương tác, trong đó việc xác minh tính hợp lệ của một tuyên bố yêu cầu giao tiếp qua lại giữa các trình chứng minh và trình xác minh.

Một ví dụ điển hình minh họa cách thức hoạt động của các bằng chứng tương tác là [câu chuyện hang động Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) nổi tiếng của Jean-Jacques Quisquater. Trong câu chuyện, Peggy (trình chứng minh) muốn chứng minh cho Victor (trình xác minh) rằng cô ấy biết câu thần chú để mở một cánh cửa ma thuật mà không tiết lộ câu thần chú đó.

### Bằng chứng không kiến thức không tương tác {#non-interactive-zero-knowledge-proofs}

Mặc dù mang tính cách mạng, việc chứng minh tương tác có tính hữu dụng hạn chế vì nó yêu cầu hai bên phải có mặt và tương tác nhiều lần. Ngay cả khi một trình xác minh bị thuyết phục về sự trung thực của một trình chứng minh, bằng chứng đó sẽ không có sẵn để xác minh độc lập (việc tính toán một bằng chứng mới yêu cầu một tập hợp các thông điệp mới giữa trình chứng minh và trình xác minh).

Để giải quyết vấn đề này, Manuel Blum, Paul Feldman và Silvio Micali đã đề xuất các [bằng chứng không kiến thức không tương tác](https://dl.acm.org/doi/10.1145/62212.62222) đầu tiên, trong đó trình chứng minh và trình xác minh có một khóa chung. Điều này cho phép trình chứng minh thể hiện kiến thức của họ về một số thông tin (tức là bằng chứng dữ liệu) mà không cần cung cấp chính thông tin đó.

Không giống như các bằng chứng tương tác, các bằng chứng không tương tác chỉ yêu cầu một vòng giao tiếp giữa những người tham gia (trình chứng minh và trình xác minh). Trình chứng minh chuyển thông tin bí mật cho một thuật toán đặc biệt để tính toán một bằng chứng không kiến thức. Bằng chứng này được gửi đến trình xác minh, người sẽ kiểm tra xem trình chứng minh có biết thông tin bí mật hay không bằng cách sử dụng một thuật toán khác.

Việc chứng minh không tương tác làm giảm giao tiếp giữa trình chứng minh và trình xác minh, làm cho các bằng chứng ZK hiệu quả hơn. Hơn nữa, khi một bằng chứng được tạo ra, nó có sẵn cho bất kỳ ai khác (có quyền truy cập vào khóa chung và thuật toán xác minh) để xác minh.

Các bằng chứng không tương tác đại diện cho một bước đột phá đối với công nghệ không tri thức và thúc đẩy sự phát triển của các hệ thống chứng minh được sử dụng ngày nay. Chúng tôi thảo luận về các loại bằng chứng này dưới đây:

### Các loại bằng chứng không kiến thức {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK là từ viết tắt của **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge** (Lập luận kiến thức không tương tác ngắn gọn không tri thức). Giao thức ZK-SNARK có các phẩm chất sau:

- **Không tri thức (Zero-knowledge)**: Một trình xác minh có thể xác thực tính toàn vẹn của một tuyên bố mà không cần biết bất cứ điều gì khác về tuyên bố đó. Kiến thức duy nhất mà trình xác minh có về tuyên bố là liệu nó đúng hay sai.

- **Ngắn gọn (Succinct)**: Bằng chứng không kiến thức nhỏ hơn bằng chứng dữ liệu và có thể được xác minh nhanh chóng.

- **Không tương tác (Non-interactive)**: Bằng chứng là 'không tương tác' vì trình chứng minh và trình xác minh chỉ tương tác một lần, không giống như các bằng chứng tương tác yêu cầu nhiều vòng giao tiếp.

- **Lập luận (Argument)**: Bằng chứng thỏa mãn yêu cầu 'tính vững chắc', vì vậy việc gian lận là cực kỳ khó xảy ra.

- **(Của) Kiến thức (Of Knowledge)**: Bằng chứng không kiến thức không thể được xây dựng nếu không có quyền truy cập vào thông tin bí mật (bằng chứng dữ liệu). Rất khó, nếu không muốn nói là không thể, đối với một trình chứng minh không có bằng chứng dữ liệu để tính toán một bằng chứng không kiến thức hợp lệ.

'Khóa chung' được đề cập trước đó đề cập đến các tham số công khai mà trình chứng minh và trình xác minh đồng ý sử dụng trong việc tạo và xác minh các bằng chứng. Việc tạo các tham số công khai (được gọi chung là Chuỗi tham chiếu chung (CRS)) là một hoạt động nhạy cảm vì tầm quan trọng của nó đối với tính bảo mật của giao thức. Nếu entropy (tính ngẫu nhiên) được sử dụng trong việc tạo CRS rơi vào tay một trình chứng minh không trung thực, họ có thể tính toán các bằng chứng sai.

[Tính toán đa bên (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) là một cách để giảm thiểu rủi ro trong việc tạo các tham số công khai. Nhiều bên tham gia vào một [buổi lễ thiết lập tin cậy](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), trong đó mỗi người đóng góp một số giá trị ngẫu nhiên để tạo ra CRS. Miễn là có một bên trung thực tiêu hủy phần entropy của họ, giao thức ZK-SNARK vẫn giữ được tính vững chắc về mặt tính toán.

Các thiết lập tin cậy yêu cầu người dùng tin tưởng những người tham gia vào quá trình tạo tham số. Tuy nhiên, sự phát triển của ZK-STARKs đã cho phép các giao thức chứng minh hoạt động với một thiết lập không tin cậy.

#### ZK-STARKs {#zk-starks}

ZK-STARK là từ viết tắt của **Zero-Knowledge Scalable Transparent Argument of Knowledge** (Lập luận kiến thức minh bạch có thể mở rộng không tri thức). ZK-STARKs tương tự như ZK-SNARKs, ngoại trừ việc chúng:

- **Có thể mở rộng (Scalable)**: ZK-STARK nhanh hơn ZK-SNARK trong việc tạo và xác minh các bằng chứng khi kích thước của bằng chứng dữ liệu lớn hơn. Với các bằng chứng STARK, thời gian của trình chứng minh và xác minh chỉ tăng nhẹ khi bằng chứng dữ liệu tăng lên (thời gian của trình chứng minh và trình xác minh SNARK tăng tuyến tính với kích thước bằng chứng dữ liệu).

- **Minh bạch (Transparent)**: ZK-STARK dựa vào tính ngẫu nhiên có thể xác minh công khai để tạo các tham số công khai cho việc chứng minh và xác minh thay vì một thiết lập tin cậy. Do đó, chúng minh bạch hơn so với ZK-SNARKs.

ZK-STARKs tạo ra các bằng chứng lớn hơn ZK-SNARKs, nghĩa là chúng thường có chi phí xác minh cao hơn. Tuy nhiên, có những trường hợp (chẳng hạn như chứng minh các tập dữ liệu lớn) mà ZK-STARKs có thể tiết kiệm chi phí hơn ZK-SNARKs.

## Những hạn chế của việc sử dụng bằng chứng không kiến thức {#drawbacks-of-using-zero-knowledge-proofs}

### Chi phí phần cứng {#hardware-costs}

Việc tạo ra các bằng chứng không kiến thức liên quan đến các tính toán rất phức tạp được thực hiện tốt nhất trên các máy chuyên dụng. Vì những máy này rất đắt tiền, chúng thường nằm ngoài tầm với của các cá nhân thông thường. Ngoài ra, các ứng dụng muốn sử dụng công nghệ không tri thức phải tính đến chi phí phần cứng—điều này có thể làm tăng chi phí cho người dùng cuối.

### Chi phí xác minh bằng chứng {#proof-verification-costs}

Việc xác minh các bằng chứng cũng đòi hỏi tính toán phức tạp và làm tăng chi phí triển khai công nghệ không tri thức trong các ứng dụng. Chi phí này đặc biệt phù hợp trong bối cảnh chứng minh tính toán. Ví dụ: các bản cuộn ZK trả ~ 500.000 Gas để xác minh một bằng chứng ZK-SNARK duy nhất trên Ethereum, với ZK-STARKs yêu cầu mức phí thậm chí còn cao hơn.

### Giả định tin cậy {#trust-assumptions}

Trong ZK-SNARK, Chuỗi tham chiếu chung (các tham số công khai) được tạo một lần và có sẵn để tái sử dụng cho các bên muốn tham gia vào giao thức không tri thức. Các tham số công khai được tạo thông qua một buổi lễ thiết lập tin cậy, trong đó những người tham gia được giả định là trung thực.

Nhưng thực sự không có cách nào để người dùng đánh giá sự trung thực của những người tham gia và người dùng phải tin lời các nhà phát triển. ZK-STARKs không có các giả định tin cậy vì tính ngẫu nhiên được sử dụng trong việc tạo chuỗi có thể được xác minh công khai. Trong khi đó, các nhà nghiên cứu đang làm việc trên các thiết lập không tin cậy cho ZK-SNARKs để tăng cường tính bảo mật của các cơ chế chứng minh.

### Các mối đe dọa từ điện toán lượng tử {#quantum-computing-threats}

ZK-SNARK sử dụng mật mã học đường cong elliptic để mã hóa. Mặc dù bài toán logarit rời rạc đường cong elliptic hiện được cho là không thể giải quyết được, nhưng sự phát triển của máy tính lượng tử có thể phá vỡ mô hình bảo mật này trong tương lai.

ZK-STARK được coi là miễn nhiễm với mối đe dọa của điện toán lượng tử, vì nó chỉ dựa vào các hàm băm chống va chạm cho tính bảo mật của nó. Không giống như các cặp khóa công khai-khóa riêng tư được sử dụng trong mật mã học đường cong elliptic, quá trình băm chống va chạm khó bị các thuật toán điện toán lượng tử phá vỡ hơn.

## Đọc thêm {#further-reading}

- [Tổng quan về các trường hợp sử dụng cho bằng chứng không kiến thức](https://pse.dev/projects) — _Nhóm Privacy and Scaling Explorations_
- [SNARKs so với STARKS so với Recursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Bằng chứng không kiến thức: Cải thiện quyền riêng tư trên Chuỗi khối](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Một ví dụ thực tế về không tri thức và đi sâu vào chi tiết](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Tạo niềm tin có thể xác minh, ngay cả với Máy tính lượng tử](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Giới thiệu sơ lược về cách zk-SNARKs có thể thực hiện được](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Tại sao Bằng chứng không kiến thức (ZKP) là yếu tố thay đổi cuộc chơi đối với Danh tính tự chủ](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [Giải thích EIP-7503: Kích hoạt chuyển khoản riêng tư trên Ethereum với Bằng chứng ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Trò chơi thẻ bài ZK: trò chơi để tìm hiểu các nguyên tắc cơ bản của ZK và các trường hợp sử dụng trong đời thực](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
