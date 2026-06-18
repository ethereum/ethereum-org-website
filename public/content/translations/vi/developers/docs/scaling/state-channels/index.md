---
title: "Kênh trạng thái"
description: "Giới thiệu về kênh trạng thái và kênh thanh toán như một giải pháp mở rộng quy mô hiện đang được cộng đồng Ethereum sử dụng."
lang: vi
sidebarDepth: 3
---

Kênh trạng thái cho phép những người tham gia giao dịch an toàn ngoài chuỗi trong khi giữ tương tác với Mạng chính [Ethereum](/) ở mức tối thiểu. Các nút ngang hàng của kênh có thể thực hiện một số lượng tùy ý các giao dịch ngoài chuỗi trong khi chỉ gửi hai giao dịch trên chuỗi để mở và đóng kênh. Điều này cho phép thông lượng giao dịch cực kỳ cao và mang lại chi phí thấp hơn cho người dùng.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên đọc và hiểu các trang của chúng tôi về [mở rộng quy mô Ethereum](/developers/docs/scaling/) và [lớp 2 (l2)](/layer-2/).

## Kênh là gì? {#what-are-channels}

Các Chuỗi khối công khai, chẳng hạn như Ethereum, phải đối mặt với những thách thức về khả năng mở rộng do kiến trúc phân tán của chúng: các giao dịch trên chuỗi phải được thực thi bởi tất cả các nút. Các nút phải có khả năng xử lý khối lượng giao dịch trong một khối bằng phần cứng khiêm tốn, áp đặt giới hạn đối với thông lượng giao dịch để giữ cho mạng lưới phi tập trung. Các kênh Chuỗi khối giải quyết vấn đề này bằng cách cho phép người dùng tương tác ngoài chuỗi trong khi vẫn dựa vào tính bảo mật của chuỗi chính để quyết toán cuối cùng.

Các kênh là các Giao thức ngang hàng đơn giản cho phép hai bên thực hiện nhiều giao dịch với nhau và sau đó chỉ đăng kết quả cuối cùng lên Chuỗi khối. Kênh sử dụng mật mã học để chứng minh rằng dữ liệu tóm tắt mà họ tạo ra thực sự là kết quả của một tập hợp các giao dịch trung gian hợp lệ. Một hợp đồng thông minh ["đa chữ ký"](/developers/docs/smart-contracts/#multisig) đảm bảo các giao dịch được ký bởi đúng các bên.

Với các kênh, các thay đổi trạng thái được thực thi và xác thực bởi các bên liên quan, giảm thiểu tính toán trên lớp thực thi của Ethereum. Điều này làm giảm tắc nghẽn trên Ethereum và cũng tăng tốc độ xử lý giao dịch cho người dùng.

Mỗi kênh được quản lý bởi một [hợp đồng thông minh đa chữ ký](/developers/docs/smart-contracts/#multisig) chạy trên Ethereum. Để mở một kênh, những người tham gia triển khai hợp đồng kênh trên chuỗi và nạp tiền vào đó. Cả hai bên cùng ký một bản cập nhật trạng thái để khởi tạo trạng thái của kênh, sau đó họ có thể giao dịch nhanh chóng và tự do ngoài chuỗi.

Để đóng kênh, những người tham gia gửi trạng thái đã được thống nhất cuối cùng của kênh trên chuỗi. Sau đó, hợp đồng thông minh phân phối số tiền bị khóa theo số dư của mỗi người tham gia trong trạng thái cuối cùng của kênh.

Các kênh ngang hàng đặc biệt hữu ích cho các tình huống mà một số người tham gia được xác định trước muốn giao dịch với tần suất cao mà không phải chịu chi phí phát sinh rõ rệt. Các kênh Chuỗi khối được chia thành hai loại: **kênh thanh toán** và **kênh trạng thái**.

## Kênh thanh toán {#payment-channels}

Một kênh thanh toán được mô tả tốt nhất là một "sổ cái hai chiều" được duy trì chung bởi hai người dùng. Số dư ban đầu của sổ cái là tổng số tiền nạp bị khóa trong hợp đồng trên chuỗi trong giai đoạn mở kênh. Các giao dịch chuyển tiền qua kênh thanh toán có thể được thực hiện ngay lập tức và không cần sự tham gia của chính Chuỗi khối thực tế, ngoại trừ việc tạo trên chuỗi một lần ban đầu và việc đóng kênh cuối cùng.

Các bản cập nhật đối với số dư của sổ cái (tức là trạng thái của kênh thanh toán) yêu cầu sự chấp thuận của tất cả các bên trong kênh. Một bản cập nhật kênh, được ký bởi tất cả những người tham gia kênh, được coi là đã chung cuộc, giống như một giao dịch trên Ethereum.

Kênh thanh toán là một trong những giải pháp mở rộng quy mô sớm nhất được thiết kế để giảm thiểu hoạt động trên chuỗi đắt đỏ của các tương tác người dùng đơn giản (ví dụ: chuyển ETH, hoán đổi nguyên tử, thanh toán vi mô). Những người tham gia kênh có thể thực hiện số lượng không giới hạn các giao dịch tức thì, không tính phí với nhau miễn là tổng số tiền chuyển ròng của họ không vượt quá số token đã nạp.

## Kênh trạng thái {#state-channels}

Ngoài việc hỗ trợ thanh toán ngoài chuỗi, các kênh thanh toán chưa được chứng minh là hữu ích trong việc xử lý logic chuyển đổi trạng thái chung. Các kênh trạng thái được tạo ra để giải quyết vấn đề này và làm cho các kênh trở nên hữu ích trong việc mở rộng quy mô tính toán đa mục đích.

Các kênh trạng thái vẫn có nhiều điểm chung với các kênh thanh toán. Ví dụ: người dùng tương tác bằng cách trao đổi các tin nhắn được ký bằng mật mã học (giao dịch), mà những người tham gia kênh khác cũng phải ký. Nếu một bản cập nhật trạng thái được đề xuất không được ký bởi tất cả những người tham gia, nó được coi là không hợp lệ.

Tuy nhiên, ngoài việc giữ số dư của người dùng, kênh cũng theo dõi trạng thái hiện tại của bộ nhớ hợp đồng (tức là giá trị của các biến hợp đồng).

Điều này giúp có thể thực thi một hợp đồng thông minh ngoài chuỗi giữa hai người dùng. Trong kịch bản này, các bản cập nhật đối với trạng thái nội bộ của hợp đồng thông minh chỉ yêu cầu sự chấp thuận của các nút ngang hàng đã tạo ra kênh.

Mặc dù điều này giải quyết vấn đề về khả năng mở rộng được mô tả trước đó, nhưng nó có ý nghĩa đối với bảo mật. Trên Ethereum, tính hợp lệ của các chuyển đổi trạng thái được thực thi bởi Giao thức đồng thuận của mạng lưới. Điều này khiến việc đề xuất một bản cập nhật không hợp lệ đối với trạng thái của hợp đồng thông minh hoặc thay đổi việc thực thi hợp đồng thông minh là không thể.

Các kênh trạng thái không có các đảm bảo bảo mật tương tự. Ở một mức độ nào đó, một kênh trạng thái là một phiên bản thu nhỏ của Mạng chính. Với một nhóm người tham gia giới hạn thực thi các quy tắc, khả năng xảy ra hành vi độc hại (ví dụ: đề xuất các bản cập nhật trạng thái không hợp lệ) sẽ tăng lên. Các kênh trạng thái có được tính bảo mật từ một hệ thống phân xử tranh chấp dựa trên [bằng chứng gian lận](/glossary/#fraud-proof).

## Cách thức hoạt động của kênh trạng thái {#how-state-channels-work}

Về cơ bản, hoạt động trong một kênh trạng thái là một phiên tương tác liên quan đến người dùng và một hệ thống Chuỗi khối. Người dùng chủ yếu giao tiếp với nhau ngoài chuỗi và chỉ tương tác với Chuỗi khối cơ sở để mở kênh, đóng kênh hoặc quyết toán các tranh chấp tiềm ẩn giữa những người tham gia.

Phần sau đây phác thảo quy trình làm việc cơ bản của một kênh trạng thái:

### Mở kênh {#opening-the-channel}

Việc mở một kênh yêu cầu những người tham gia cam kết tiền vào một hợp đồng thông minh trên Mạng chính. Khoản tiền nạp cũng hoạt động như một hóa đơn ảo, vì vậy các tác nhân tham gia có thể giao dịch tự do mà không cần phải quyết toán thanh toán ngay lập tức. Chỉ khi kênh đã chung cuộc trên chuỗi, các bên mới quyết toán với nhau và rút những gì còn lại trong hóa đơn của họ.

Khoản tiền nạp này cũng đóng vai trò như một khoản tiền bảo đảm để đảm bảo hành vi trung thực từ mỗi người tham gia. Nếu những người nạp tiền bị kết tội có hành động độc hại trong giai đoạn giải quyết tranh chấp, hợp đồng sẽ cắt giảm khoản tiền nạp của họ.

Các nút ngang hàng của kênh phải ký một trạng thái ban đầu mà tất cả họ đều đồng ý. Điều này đóng vai trò là nguồn gốc của kênh trạng thái, sau đó người dùng có thể bắt đầu giao dịch.

### Sử dụng kênh {#using-the-channel}

Sau khi khởi tạo trạng thái của kênh, các nút ngang hàng tương tác bằng cách ký các giao dịch và gửi chúng cho nhau để phê duyệt. Những người tham gia bắt đầu các bản cập nhật trạng thái bằng các giao dịch này và ký các bản cập nhật trạng thái từ những người khác. Mỗi giao dịch bao gồm những điều sau:

- Một **nonce**, hoạt động như một ID duy nhất cho các giao dịch và ngăn chặn các cuộc tấn công phát lại. Nó cũng xác định thứ tự mà các bản cập nhật trạng thái đã xảy ra (điều này quan trọng đối với việc giải quyết tranh chấp)

- Trạng thái cũ của kênh

- Trạng thái mới của kênh

- Giao dịch kích hoạt chuyển đổi trạng thái (ví dụ: Alice gửi 5 ETH cho Bob)

Các bản cập nhật trạng thái trong kênh không được phát sóng trên chuỗi như trường hợp thông thường khi người dùng tương tác trên Mạng chính, điều này phù hợp với mục tiêu của các kênh trạng thái là giảm thiểu dấu chân trên chuỗi. Miễn là những người tham gia đồng ý về các bản cập nhật trạng thái, chúng sẽ có tính chung cuộc như một giao dịch Ethereum. Những người tham gia chỉ cần phụ thuộc vào sự đồng thuận của Mạng chính nếu có tranh chấp phát sinh.

### Đóng kênh {#closing-the-channel}

Việc đóng một kênh trạng thái yêu cầu gửi trạng thái cuối cùng, đã được thống nhất của kênh tới hợp đồng thông minh trên chuỗi. Các chi tiết được tham chiếu trong bản cập nhật trạng thái bao gồm số lượng các bước di chuyển của mỗi người tham gia và danh sách các giao dịch đã được phê duyệt.

Sau khi xác minh rằng bản cập nhật trạng thái là hợp lệ (tức là nó được ký bởi tất cả các bên), hợp đồng thông minh sẽ chốt kênh và phân phối số tiền bị khóa theo kết quả của kênh. Các khoản thanh toán được thực hiện ngoài chuỗi được áp dụng cho trạng thái của Ethereum và mỗi người tham gia nhận được phần còn lại của họ trong số tiền bị khóa.

Kịch bản được mô tả ở trên đại diện cho những gì xảy ra trong trường hợp suôn sẻ. Đôi khi, người dùng có thể không đạt được thỏa thuận và chốt kênh (trường hợp xấu). Bất kỳ điều nào sau đây đều có thể đúng với tình huống:

- Những người tham gia ngoại tuyến và không đề xuất được các chuyển đổi trạng thái

- Những người tham gia từ chối đồng ký các bản cập nhật trạng thái hợp lệ

- Những người tham gia cố gắng chốt kênh bằng cách đề xuất một bản cập nhật trạng thái cũ cho hợp đồng trên chuỗi

- Những người tham gia đề xuất các chuyển đổi trạng thái không hợp lệ để những người khác ký

Bất cứ khi nào sự đồng thuận bị phá vỡ giữa các tác nhân tham gia trong một kênh, lựa chọn cuối cùng là dựa vào sự đồng thuận của Mạng chính để thực thi trạng thái hợp lệ, cuối cùng của kênh. Trong trường hợp này, việc đóng kênh trạng thái yêu cầu quyết toán các tranh chấp trên chuỗi.

### Quyết toán tranh chấp {#settling-disputes}

Thông thường, các bên trong một kênh đồng ý đóng kênh trước và đồng ký chuyển đổi trạng thái cuối cùng, mà họ gửi cho hợp đồng thông minh. Khi bản cập nhật được phê duyệt trên chuỗi, việc thực thi hợp đồng thông minh ngoài chuỗi kết thúc và những người tham gia thoát khỏi kênh với tiền của họ.

Tuy nhiên, một bên có thể gửi yêu cầu trên chuỗi để kết thúc việc thực thi hợp đồng thông minh và chốt kênh—mà không cần chờ sự chấp thuận của đối tác. Nếu bất kỳ tình huống phá vỡ đồng thuận nào được mô tả trước đó xảy ra, một trong hai bên có thể kích hoạt hợp đồng trên chuỗi để đóng kênh và phân phối tiền. Điều này cung cấp **tính không cần niềm tin**, đảm bảo rằng các bên trung thực có thể thoát khoản tiền nạp của họ tại bất kỳ thời điểm nào, bất kể hành động của bên kia.

Để xử lý việc thoát kênh, người dùng phải gửi bản cập nhật trạng thái hợp lệ cuối cùng của ứng dụng cho hợp đồng trên chuỗi. Nếu điều này được kiểm chứng (tức là nó mang chữ ký của tất cả các bên), thì tiền sẽ được phân phối lại theo hướng có lợi cho họ.

Tuy nhiên, có một sự chậm trễ trong việc thực thi các yêu cầu thoát của một người dùng. Nếu yêu cầu kết thúc kênh được nhất trí thông qua, thì giao dịch thoát trên chuỗi sẽ được thực thi ngay lập tức.

Sự chậm trễ phát huy tác dụng trong các lần thoát của một người dùng do khả năng xảy ra các hành động gian lận. Ví dụ: một người tham gia kênh có thể cố gắng chốt kênh trên Ethereum bằng cách gửi một bản cập nhật trạng thái cũ hơn trên chuỗi.

Như một biện pháp đối phó, các kênh trạng thái cho phép người dùng trung thực thách thức các bản cập nhật trạng thái không hợp lệ bằng cách gửi trạng thái hợp lệ, mới nhất của kênh trên chuỗi. Các kênh trạng thái được thiết kế sao cho các bản cập nhật trạng thái mới hơn, đã được thống nhất sẽ lấn át các bản cập nhật trạng thái cũ hơn.

Khi một nút ngang hàng kích hoạt hệ thống giải quyết tranh chấp trên chuỗi, bên kia được yêu cầu phản hồi trong một giới hạn thời gian (được gọi là cửa sổ thách thức). Điều này cho phép người dùng thách thức giao dịch thoát, đặc biệt nếu bên kia đang áp dụng một bản cập nhật cũ.

Dù trường hợp nào xảy ra, người dùng kênh luôn có những đảm bảo tính chung cuộc mạnh mẽ: nếu chuyển đổi trạng thái mà họ sở hữu được ký bởi tất cả các thành viên và là bản cập nhật gần đây nhất, thì nó có tính chung cuộc ngang bằng với một giao dịch trên chuỗi thông thường. Họ vẫn phải thách thức bên kia trên chuỗi, nhưng kết quả duy nhất có thể xảy ra là chốt trạng thái hợp lệ cuối cùng mà họ nắm giữ.

### Các kênh trạng thái tương tác với Ethereum như thế nào? {#how-do-state-channels-interact-with-ethereum}

Mặc dù chúng tồn tại dưới dạng các Giao thức ngoài chuỗi, các kênh trạng thái có một thành phần trên chuỗi: hợp đồng thông minh được triển khai trên Ethereum khi mở kênh. Hợp đồng này kiểm soát các tài sản được nạp vào kênh, xác minh các bản cập nhật trạng thái và phân xử các tranh chấp giữa những người tham gia.

Các kênh trạng thái không xuất bản dữ liệu giao dịch hoặc cam kết trạng thái lên Mạng chính, không giống như các giải pháp mở rộng quy mô [lớp 2 (l2)](/layer-2/). Tuy nhiên, chúng được kết nối với Mạng chính nhiều hơn so với, ví dụ, [chuỗi phụ](/developers/docs/scaling/sidechains/), khiến chúng an toàn hơn phần nào.

Các kênh trạng thái dựa vào Giao thức Ethereum chính cho những điều sau:

#### 1. Tính hoạt động {#liveness}

Hợp đồng trên chuỗi được triển khai khi mở kênh chịu trách nhiệm về chức năng của kênh. Nếu hợp đồng đang chạy trên Ethereum, thì kênh luôn có sẵn để sử dụng. Ngược lại, một chuỗi phụ luôn có thể thất bại, ngay cả khi Mạng chính đang hoạt động, khiến tiền của người dùng gặp rủi ro.

#### 2. Bảo mật {#security}

Ở một mức độ nào đó, các kênh trạng thái dựa vào Ethereum để cung cấp bảo mật và bảo vệ người dùng khỏi các nút ngang hàng độc hại. Như đã thảo luận trong các phần sau, các kênh sử dụng cơ chế bằng chứng gian lận cho phép người dùng thách thức các nỗ lực chốt kênh bằng một bản cập nhật không hợp lệ hoặc cũ.

Trong trường hợp này, bên trung thực cung cấp trạng thái hợp lệ mới nhất của kênh dưới dạng bằng chứng gian lận cho hợp đồng trên chuỗi để xác minh. Bằng chứng gian lận cho phép các bên không tin tưởng lẫn nhau tiến hành các giao dịch ngoài chuỗi mà không gây rủi ro cho tiền của họ trong quá trình này.

#### 3. Tính chung cuộc {#finality}

Các bản cập nhật trạng thái được ký chung bởi người dùng kênh được coi là tốt như các giao dịch trên chuỗi. Tuy nhiên, tất cả hoạt động trong kênh chỉ đạt được tính chung cuộc thực sự khi kênh được đóng trên Ethereum.

Trong trường hợp lạc quan, cả hai bên có thể hợp tác và ký bản cập nhật trạng thái cuối cùng và gửi trên chuỗi để đóng kênh, sau đó tiền được phân phối theo trạng thái cuối cùng của kênh. Trong trường hợp bi quan, nơi ai đó cố gắng gian lận bằng cách đăng một bản cập nhật trạng thái không chính xác trên chuỗi, giao dịch của họ sẽ không được chung cuộc cho đến khi cửa sổ thách thức trôi qua.

## Kênh trạng thái ảo {#virtual-state-channels}

Việc triển khai ngây thơ của một kênh trạng thái sẽ là triển khai một hợp đồng mới khi hai người dùng muốn thực thi một ứng dụng ngoài chuỗi. Điều này không chỉ không khả thi mà còn phủ nhận tính hiệu quả về chi phí của các kênh trạng thái (chi phí giao dịch trên chuỗi có thể nhanh chóng tăng lên).

Để giải quyết vấn đề này, "kênh ảo" đã được tạo ra. Không giống như các kênh thông thường yêu cầu các giao dịch trên chuỗi để mở và chấm dứt, một kênh ảo có thể được mở, thực thi và chốt mà không cần tương tác với chuỗi chính. Thậm chí có thể quyết toán các tranh chấp ngoài chuỗi bằng phương pháp này.

Hệ thống này dựa trên sự tồn tại của cái gọi là "kênh sổ cái", đã được cấp vốn trên chuỗi. Các kênh ảo giữa hai bên có thể được xây dựng trên một kênh sổ cái hiện có, với (các) chủ sở hữu của kênh sổ cái đóng vai trò là người trung gian.

Người dùng trong mỗi kênh ảo tương tác thông qua một phiên bản hợp đồng mới, với kênh sổ cái có thể hỗ trợ nhiều phiên bản hợp đồng. Trạng thái của kênh sổ cái cũng chứa nhiều hơn một trạng thái bộ nhớ hợp đồng, cho phép thực thi song song các ứng dụng ngoài chuỗi giữa những người dùng khác nhau.

Giống như các kênh thông thường, người dùng trao đổi các bản cập nhật trạng thái để tiến hành cỗ máy trạng thái. Trừ khi có tranh chấp phát sinh, người trung gian chỉ phải được liên hệ khi mở hoặc chấm dứt kênh.

### Kênh thanh toán ảo {#virtual-payment-channels}

Các kênh thanh toán ảo hoạt động dựa trên cùng một ý tưởng như các kênh trạng thái ảo: những người tham gia được kết nối với cùng một mạng lưới có thể truyền tin nhắn mà không cần phải mở một kênh mới trên chuỗi. Trong các kênh thanh toán ảo, các giao dịch chuyển giá trị được định tuyến thông qua một hoặc nhiều người trung gian, với sự đảm bảo rằng chỉ người nhận dự kiến mới có thể nhận được số tiền đã chuyển.

## Ứng dụng của kênh trạng thái {#applications-of-state-channels}

### Thanh toán {#payments}

Các kênh Chuỗi khối ban đầu là các Giao thức đơn giản cho phép hai người tham gia tiến hành các giao dịch chuyển tiền nhanh chóng, phí thấp ngoài chuỗi mà không phải trả phí giao dịch cao trên Mạng chính. Ngày nay, các kênh thanh toán vẫn hữu ích cho các ứng dụng được thiết kế để trao đổi và nạp ether và token.

Thanh toán dựa trên kênh có những ưu điểm sau:

1. **Thông lượng**: Số lượng giao dịch ngoài chuỗi trên mỗi kênh không liên quan đến thông lượng của Ethereum, vốn bị ảnh hưởng bởi nhiều yếu tố khác nhau, đặc biệt là kích thước khối và thời gian tạo khối. Bằng cách thực thi các giao dịch ngoài chuỗi, các kênh Chuỗi khối có thể đạt được thông lượng cao hơn.

2. **Quyền riêng tư**: Vì các kênh tồn tại ngoài chuỗi, chi tiết về các tương tác giữa những người tham gia không được ghi lại trên Chuỗi khối công khai của Ethereum. Người dùng kênh chỉ phải tương tác trên chuỗi khi cấp vốn và đóng kênh hoặc quyết toán tranh chấp. Do đó, các kênh rất hữu ích cho những cá nhân mong muốn các giao dịch riêng tư hơn.

3. **Độ trễ**: Các giao dịch ngoài chuỗi được tiến hành giữa những người tham gia kênh có thể được quyết toán ngay lập tức, nếu cả hai bên hợp tác, giúp giảm sự chậm trễ. Ngược lại, việc gửi một giao dịch trên Mạng chính yêu cầu phải đợi các nút xử lý giao dịch, tạo ra một khối mới với giao dịch và đạt được sự đồng thuận. Người dùng cũng có thể cần đợi thêm các xác nhận khối trước khi coi một giao dịch là đã chung cuộc.

4. **Chi phí**: Các kênh trạng thái đặc biệt hữu ích trong các tình huống mà một nhóm người tham gia sẽ trao đổi nhiều bản cập nhật trạng thái trong một thời gian dài. Chi phí duy nhất phát sinh là việc mở và đóng hợp đồng thông minh kênh trạng thái; mọi thay đổi trạng thái giữa việc mở và đóng kênh sẽ rẻ hơn lần trước vì chi phí quyết toán được phân bổ tương ứng.

Việc triển khai các kênh trạng thái trên các giải pháp lớp 2 (l2), chẳng hạn như [bản cuộn](/developers/docs/scaling/#rollups), có thể khiến chúng trở nên hấp dẫn hơn đối với các khoản thanh toán. Mặc dù các kênh cung cấp các khoản thanh toán rẻ, nhưng chi phí thiết lập hợp đồng trên chuỗi trên Mạng chính trong giai đoạn mở có thể trở nên đắt đỏ—đặc biệt là khi phí Gas tăng đột biến. Các bản cuộn dựa trên Ethereum cung cấp [phí giao dịch thấp hơn](https://l2fees.info/) và có thể giảm chi phí phát sinh cho những người tham gia kênh bằng cách giảm phí thiết lập.

### Thanh toán vi mô {#microtransactions}

Thanh toán vi mô là các khoản thanh toán có giá trị thấp (ví dụ: thấp hơn một phần nhỏ của một đô la) mà các doanh nghiệp không thể xử lý mà không bị lỗ. Các thực thể này phải trả tiền cho các nhà cung cấp dịch vụ thanh toán, điều mà họ không thể làm nếu biên lợi nhuận trên các khoản thanh toán của khách hàng quá thấp để tạo ra lợi nhuận.

Các kênh thanh toán giải quyết vấn đề này bằng cách giảm chi phí phát sinh liên quan đến các khoản thanh toán vi mô. Ví dụ: Nhà cung cấp dịch vụ Internet (ISP) có thể mở một kênh thanh toán với khách hàng, cho phép họ truyền phát các khoản thanh toán nhỏ mỗi khi họ sử dụng dịch vụ.

Ngoài chi phí mở và đóng kênh, những người tham gia không phải chịu thêm chi phí cho các khoản thanh toán vi mô (không có phí Gas). Đây là một tình huống đôi bên cùng có lợi vì khách hàng linh hoạt hơn trong việc họ trả bao nhiêu cho các dịch vụ và doanh nghiệp không bỏ lỡ các khoản thanh toán vi mô có lợi nhuận.

### Ứng dụng phi tập trung {#decentralized-applications}

Giống như các kênh thanh toán, các kênh trạng thái có thể thực hiện các khoản thanh toán có điều kiện theo các trạng thái cuối cùng của cỗ máy trạng thái. Các kênh trạng thái cũng có thể hỗ trợ logic chuyển đổi trạng thái tùy ý, khiến chúng hữu ích cho việc thực thi các ứng dụng chung ngoài chuỗi.

Các kênh trạng thái thường bị giới hạn ở các ứng dụng theo lượt đơn giản, vì điều này giúp quản lý tiền cam kết với hợp đồng trên chuỗi dễ dàng hơn. Ngoài ra, với một số lượng hạn chế các bên cập nhật trạng thái của ứng dụng ngoài chuỗi theo từng khoảng thời gian, việc trừng phạt hành vi không trung thực tương đối đơn giản.

Hiệu quả của một ứng dụng kênh trạng thái cũng phụ thuộc vào thiết kế của nó. Ví dụ: một nhà phát triển có thể triển khai hợp đồng kênh ứng dụng trên chuỗi một lần và cho phép những người chơi khác sử dụng lại ứng dụng mà không cần phải lên chuỗi. Trong trường hợp này, kênh ứng dụng ban đầu đóng vai trò là một kênh sổ cái hỗ trợ nhiều kênh ảo, mỗi kênh chạy một phiên bản mới của hợp đồng thông minh của ứng dụng ngoài chuỗi.

Một trường hợp sử dụng tiềm năng cho các ứng dụng kênh trạng thái là các trò chơi hai người chơi đơn giản, trong đó tiền được phân phối dựa trên kết quả của trò chơi. Lợi ích ở đây là người chơi không phải tin tưởng lẫn nhau (tính không cần niềm tin) và hợp đồng trên chuỗi, chứ không phải người chơi, kiểm soát việc phân bổ tiền và quyết toán các tranh chấp (sự phi tập trung).

Các trường hợp sử dụng khả thi khác cho các ứng dụng kênh trạng thái bao gồm quyền sở hữu tên ENS, sổ cái NFT và nhiều trường hợp khác.

### Chuyển khoản nguyên tử {#atomic-transfers}

Các kênh thanh toán ban đầu bị hạn chế ở việc chuyển tiền giữa hai bên, làm hạn chế khả năng sử dụng của chúng. Tuy nhiên, sự ra đời của các kênh ảo cho phép các cá nhân định tuyến các khoản chuyển tiền thông qua các bên trung gian (tức là nhiều kênh p2p) mà không cần phải mở một kênh mới trên chuỗi.

Thường được mô tả là "chuyển khoản đa chặng", các khoản thanh toán được định tuyến có tính nguyên tử (tức là tất cả các phần của giao dịch đều thành công hoặc thất bại hoàn toàn). Các giao dịch chuyển khoản nguyên tử sử dụng [Hợp đồng khóa thời gian băm (HTLC)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) để đảm bảo khoản thanh toán chỉ được giải phóng nếu đáp ứng các điều kiện nhất định, do đó giảm rủi ro đối tác.

## Hạn chế của việc sử dụng kênh trạng thái {#drawbacks-of-state-channels}

### Giả định về tính hoạt động {#liveness-assumptions}

Để đảm bảo hiệu quả, các kênh trạng thái đặt ra giới hạn thời gian đối với khả năng phản hồi tranh chấp của những người tham gia kênh. Quy tắc này giả định rằng các nút ngang hàng sẽ luôn trực tuyến để theo dõi hoạt động của kênh và tranh luận các thách thức khi cần thiết.

Trên thực tế, người dùng có thể ngoại tuyến vì những lý do ngoài tầm kiểm soát của họ (ví dụ: kết nối internet kém, lỗi cơ học, v.v.). Nếu một người dùng trung thực ngoại tuyến, một nút ngang hàng độc hại có thể lợi dụng tình huống này bằng cách trình bày các trạng thái trung gian cũ cho hợp đồng phân xử và đánh cắp số tiền đã cam kết.

Một số kênh sử dụng "tháp canh" (watchtowers)—các thực thể chịu trách nhiệm theo dõi các sự kiện tranh chấp trên chuỗi thay mặt cho những người khác và thực hiện các hành động cần thiết, như cảnh báo các bên liên quan. Tuy nhiên, điều này có thể làm tăng thêm chi phí sử dụng kênh trạng thái.

### Dữ liệu không khả dụng {#data-unavailability}

Như đã giải thích trước đó, việc thách thức một tranh chấp không hợp lệ yêu cầu trình bày trạng thái hợp lệ, mới nhất của kênh trạng thái. Đây là một quy tắc khác dựa trên một giả định—rằng người dùng có quyền truy cập vào trạng thái mới nhất của kênh.

Mặc dù việc mong đợi người dùng kênh lưu trữ các bản sao trạng thái ứng dụng ngoài chuỗi là hợp lý, nhưng dữ liệu này có thể bị mất do lỗi hoặc hỏng hóc cơ học. Nếu người dùng không sao lưu dữ liệu, họ chỉ có thể hy vọng rằng bên kia không chốt một yêu cầu thoát không hợp lệ bằng cách sử dụng các chuyển đổi trạng thái cũ mà họ sở hữu.

Người dùng Ethereum không phải đối phó với vấn đề này vì mạng lưới thực thi các quy tắc về tính khả dụng của dữ liệu. Dữ liệu giao dịch được lưu trữ và truyền bá bởi tất cả các nút và có sẵn để người dùng tải xuống nếu và khi cần thiết.

### Vấn đề Thanh khoản {#liquidity-issues}

Để thiết lập một kênh Chuỗi khối, những người tham gia cần khóa tiền trong một hợp đồng thông minh trên chuỗi trong suốt vòng đời của kênh. Điều này làm giảm Thanh khoản của người dùng kênh và cũng giới hạn các kênh đối với những người có đủ khả năng giữ tiền bị khóa trên Mạng chính.

Tuy nhiên, các kênh sổ cái—được vận hành bởi một nhà cung cấp dịch vụ ngoài chuỗi (OSP)—có thể giảm bớt các vấn đề Thanh khoản cho người dùng. Hai nút ngang hàng được kết nối với một kênh sổ cái có thể tạo một kênh ảo, mà họ có thể mở và chốt hoàn toàn ngoài chuỗi, bất cứ lúc nào họ muốn.

Các nhà cung cấp dịch vụ ngoài chuỗi cũng có thể mở các kênh với nhiều nút ngang hàng, khiến chúng hữu ích cho việc định tuyến các khoản thanh toán. Tất nhiên, người dùng phải trả phí cho các OSP cho các dịch vụ của họ, điều này có thể không mong muốn đối với một số người.

### Tấn công quấy rối (Griefing attacks) {#griefing-attacks}

Các cuộc tấn công quấy rối là một tính năng phổ biến của các hệ thống dựa trên bằng chứng gian lận. Một cuộc tấn công quấy rối không mang lại lợi ích trực tiếp cho kẻ tấn công nhưng gây ra sự phiền toái (tức là tác hại) cho nạn nhân, do đó có tên gọi này.

Việc chứng minh gian lận dễ bị tấn công quấy rối vì bên trung thực phải phản hồi mọi tranh chấp, ngay cả những tranh chấp không hợp lệ, hoặc có nguy cơ mất tiền của họ. Một người tham gia độc hại có thể quyết định liên tục đăng các chuyển đổi trạng thái cũ trên chuỗi, buộc bên trung thực phải phản hồi bằng trạng thái hợp lệ. Chi phí của các giao dịch trên chuỗi đó có thể nhanh chóng tăng lên, khiến các bên trung thực bị thiệt hại trong quá trình này.

### Tập hợp người tham gia được xác định trước {#predefined-participant-sets}

Theo thiết kế, số lượng người tham gia cấu thành một kênh trạng thái vẫn cố định trong suốt vòng đời của nó. Điều này là do việc cập nhật tập hợp người tham gia sẽ làm phức tạp hoạt động của kênh, đặc biệt là khi cấp vốn cho kênh hoặc quyết toán các tranh chấp. Việc thêm hoặc bớt người tham gia cũng sẽ yêu cầu hoạt động bổ sung trên chuỗi, điều này làm tăng chi phí phát sinh cho người dùng.

Mặc dù điều này làm cho các kênh trạng thái dễ suy luận hơn, nhưng nó hạn chế tính hữu ích của các thiết kế kênh đối với các nhà phát triển ứng dụng. Điều này phần nào giải thích tại sao các kênh trạng thái đã bị loại bỏ để nhường chỗ cho các giải pháp mở rộng quy mô khác, chẳng hạn như bản cuộn.

### Xử lý giao dịch song song {#parallel-transaction-processing}

Những người tham gia trong kênh trạng thái gửi các bản cập nhật trạng thái theo lượt, đó là lý do tại sao chúng hoạt động tốt nhất cho "các ứng dụng theo lượt" (ví dụ: trò chơi cờ vua hai người chơi). Điều này loại bỏ nhu cầu xử lý các bản cập nhật trạng thái đồng thời và giảm bớt công việc mà hợp đồng trên chuỗi phải làm để trừng phạt những người đăng bản cập nhật cũ. Tuy nhiên, một tác dụng phụ của thiết kế này là các giao dịch phụ thuộc lẫn nhau, làm tăng độ trễ và làm giảm trải nghiệm tổng thể của người dùng.

Một số kênh trạng thái giải quyết vấn đề này bằng cách sử dụng thiết kế "song công toàn phần" (full-duplex) tách trạng thái ngoài chuỗi thành hai trạng thái "đơn công" (simplex) một chiều, cho phép cập nhật trạng thái đồng thời. Các thiết kế như vậy cải thiện thông lượng ngoài chuỗi và giảm độ trễ giao dịch.

## Sử dụng kênh trạng thái {#use-state-channels}

Nhiều dự án cung cấp các triển khai của kênh trạng thái mà bạn có thể tích hợp vào các ứng dụng phi tập trung (dapp) của mình:

- [Connext](https://connext.network/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Đọc thêm {#further-reading}

**Kênh trạng thái**

- [Hiểu về các giải pháp mở rộng quy mô lớp 2 (l2) của Ethereum: Kênh trạng thái, Plasma và Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 tháng 2 năm 2018_
- [Kênh trạng thái - một lời giải thích](https://www.jeffcoleman.ca/state-channels/) _6 tháng 11 năm 2015 - Jeff Coleman_
- [Cơ bản về Kênh trạng thái](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Kênh trạng thái Chuỗi khối: Một công nghệ tiên tiến](https://ieeexplore.ieee.org/document/9627997)

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_