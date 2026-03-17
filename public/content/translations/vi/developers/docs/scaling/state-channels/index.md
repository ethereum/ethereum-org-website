---
title: "Các Kênh Trạng Thái"
description: "Giới thiệu về các kênh trạng thái và kênh thanh toán như một giải pháp mở rộng hiện đang được cộng đồng Ethereum sử dụng."
lang: vi
sidebarDepth: 3
---

Các kênh trạng thái cho phép người tham gia giao dịch ngoài chuỗi một cách an toàn trong khi giữ tương tác với Ethereum Mainnet ở mức tối thiểu. Các bên ngang hàng trong kênh có thể tiến hành một số lượng giao dịch ngoài chuỗi tùy ý trong khi chỉ cần gửi hai giao dịch trên chuỗi để mở và đóng kênh. Điều này cho phép thông lượng giao dịch cực cao và giúp người dùng giảm chi phí.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên đọc và hiểu các trang của chúng tôi về [mở rộng Ethereum](/developers/docs/scaling/) và [lớp 2](/layer-2/).

## Kênh là gì? {#what-are-channels}

Các blockchain công khai, chẳng hạn như Ethereum, đối mặt với những thách thức về khả năng mở rộng do kiến trúc phân tán của chúng: các giao dịch trên chuỗi phải được thực thi bởi tất cả các nút. Các nút phải có khả năng xử lý khối lượng giao dịch trong một khối bằng phần cứng khiêm tốn, đặt ra giới hạn về thông lượng giao dịch để giữ cho mạng lưới được phi tập trung. Các kênh blockchain giải quyết vấn đề này bằng cách cho phép người dùng tương tác ngoài chuỗi trong khi vẫn dựa vào sự bảo mật của chuỗi chính để thanh toán cuối cùng.

Các kênh là các giao thức ngang hàng đơn giản cho phép hai bên thực hiện nhiều giao dịch với nhau và sau đó chỉ đăng kết quả cuối cùng lên blockchain. Kênh sử dụng mật mã học để chứng minh rằng dữ liệu tóm tắt mà họ tạo ra thực sự là kết quả của một tập hợp các giao dịch trung gian hợp lệ. Một hợp đồng thông minh ["đa chữ ký"](/developers/docs/smart-contracts/#multisig) đảm bảo các giao dịch được ký bởi các bên chính xác.

Với các kênh, các thay đổi trạng thái được thực thi và xác thực bởi các bên quan tâm, giảm thiểu tính toán trên lớp thực thi của Ethereum. Điều này làm giảm tắc nghẽn trên Ethereum và cũng tăng tốc độ xử lý giao dịch cho người dùng.

Mỗi kênh được quản lý bởi một [hợp đồng thông minh đa chữ ký](/developers/docs/smart-contracts/#multisig) chạy trên Ethereum. Để mở một kênh, những người tham gia triển khai hợp đồng kênh trên chuỗi và gửi tiền vào đó. Cả hai bên cùng ký một bản cập nhật trạng thái để khởi tạo trạng thái của kênh, sau đó họ có thể giao dịch nhanh chóng và tự do ngoài chuỗi.

Để đóng kênh, người tham gia gửi trạng thái cuối cùng đã được đồng thuận của kênh lên trên chuỗi. Sau đó, hợp đồng thông minh phân phối số tiền đã khóa theo số dư của mỗi người tham gia trong trạng thái cuối cùng của kênh.

Các kênh ngang hàng đặc biệt hữu ích trong các tình huống mà một số người tham gia được xác định trước muốn giao dịch với tần suất cao mà không phải chịu chi phí phát sinh rõ ràng. Các kênh blockchain được chia thành hai loại: **kênh thanh toán** và **kênh trạng thái**.

## Kênh thanh toán {#payment-channels}

Một kênh thanh toán được mô tả tốt nhất là một "sổ cái hai chiều" được duy trì chung bởi hai người dùng. Số dư ban đầu của sổ cái là tổng số tiền gửi được khóa trong hợp đồng trên chuỗi trong giai đoạn mở kênh. Việc chuyển tiền qua kênh thanh toán có thể được thực hiện ngay lập tức và không cần sự tham gia của chính blockchain, ngoại trừ việc tạo kênh trên chuỗi một lần ban đầu và việc đóng kênh cuối cùng.

Các bản cập nhật số dư của sổ cái (tức là trạng thái của kênh thanh toán) yêu cầu sự chấp thuận của tất cả các bên trong kênh. Một bản cập nhật kênh, được ký bởi tất cả những người tham gia kênh, được coi là cuối cùng, giống như một giao dịch trên Ethereum.

Các kênh thanh toán là một trong những giải pháp mở rộng sớm nhất được thiết kế để giảm thiểu hoạt động tốn kém trên chuỗi của các tương tác người dùng đơn giản (ví dụ: chuyển ETH, hoán đổi nguyên tử, thanh toán vi mô). Những người tham gia kênh có thể thực hiện số lượng giao dịch tức thì, không mất phí không giới hạn với nhau miễn là tổng số tiền chuyển của họ không vượt quá số token đã gửi.

## Kênh trạng thái {#state-channels}

Ngoài việc hỗ trợ thanh toán ngoài chuỗi, các kênh thanh toán đã không chứng tỏ được sự hữu ích trong việc xử lý logic chuyển đổi trạng thái chung. Các kênh trạng thái được tạo ra để giải quyết vấn đề này và làm cho các kênh trở nên hữu ích cho việc mở rộng quy mô tính toán đa dụng.

Các kênh trạng thái vẫn có nhiều điểm chung với các kênh thanh toán. Ví dụ, người dùng tương tác bằng cách trao đổi các thông điệp được ký bằng mật mã (giao dịch), mà những người tham gia kênh khác cũng phải ký. Nếu một bản cập nhật trạng thái được đề xuất không được tất cả những người tham gia ký, nó sẽ bị coi là không hợp lệ.

Tuy nhiên, ngoài việc giữ số dư của người dùng, kênh còn theo dõi trạng thái hiện tại của bộ lưu trữ của hợp đồng (tức là giá trị của các biến hợp đồng).

Điều này giúp có thể thực thi một hợp đồng thông minh ngoài chuỗi giữa hai người dùng. Trong kịch bản này, các bản cập nhật trạng thái nội bộ của hợp đồng thông minh chỉ yêu cầu sự chấp thuận của các bên ngang hàng đã tạo ra kênh.

Mặc dù điều này giải quyết vấn đề về khả năng mở rộng đã được mô tả trước đó, nó có những hàm ý về bảo mật. Trên Ethereum, tính hợp lệ của các chuyển đổi trạng thái được thực thi bởi giao thức đồng thuận của mạng. Điều này làm cho việc đề xuất một bản cập nhật không hợp lệ cho trạng thái của hợp đồng thông minh hoặc thay đổi việc thực thi hợp đồng thông minh là không thể.

Các kênh trạng thái không có các đảm bảo bảo mật tương tự. Ở một mức độ nào đó, một kênh trạng thái là một phiên bản thu nhỏ của Mainnet. Với một tập hợp người tham gia hạn chế thực thi các quy tắc, khả năng xảy ra hành vi độc hại (ví dụ: đề xuất các bản cập nhật trạng thái không hợp lệ) tăng lên. Các kênh trạng thái có được sự bảo mật từ một hệ thống phân xử tranh chấp dựa trên [bằng chứng gian lận](/glossary/#fraud-proof).

## Cách hoạt động của các kênh trạng thái {#how-state-channels-work}

Về cơ bản, hoạt động trong một kênh trạng thái là một phiên tương tác liên quan đến người dùng và một hệ thống blockchain. Người dùng chủ yếu giao tiếp với nhau ngoài chuỗi và chỉ tương tác với blockchain cơ sở để mở kênh, đóng kênh hoặc giải quyết các tranh chấp tiềm tàng giữa những người tham gia.

Phần sau đây trình bày quy trình làm việc cơ bản của một kênh trạng thái:

### Mở kênh {#opening-the-channel}

Việc mở một kênh yêu cầu người tham gia cam kết tiền vào một hợp đồng thông minh trên Mainnet. Khoản tiền gửi cũng có chức năng như một tab ảo, vì vậy các bên tham gia có thể giao dịch tự do mà không cần phải thanh toán ngay lập tức. Chỉ khi kênh được hoàn tất trên chuỗi, các bên mới thanh toán cho nhau và rút lại những gì còn lại trong tab của họ.

Khoản tiền gửi này cũng đóng vai trò như một khoản thế chấp để đảm bảo hành vi trung thực từ mỗi người tham gia. Nếu người gửi tiền bị phát hiện có hành vi độc hại trong giai đoạn giải quyết tranh chấp, hợp đồng sẽ cắt giảm (slash) tiền gửi của họ.

Các bên ngang hàng trong kênh phải ký một trạng thái ban đầu mà tất cả họ đều đồng ý. Điều này đóng vai trò là khối khởi nguồn của kênh trạng thái, sau đó người dùng có thể bắt đầu giao dịch.

### Sử dụng kênh {#using-the-channel}

Sau khi khởi tạo trạng thái của kênh, các bên ngang hàng tương tác bằng cách ký các giao dịch và gửi cho nhau để phê duyệt. Những người tham gia bắt đầu cập nhật trạng thái bằng các giao dịch này và ký các bản cập nhật trạng thái từ những người khác. Mỗi giao dịch bao gồm những điều sau:

- Một **nonce**, hoạt động như một ID duy nhất cho các giao dịch và ngăn chặn các cuộc tấn công phát lại. Nó cũng xác định thứ tự mà các bản cập nhật trạng thái đã xảy ra (điều này rất quan trọng để giải quyết tranh chấp)

- Trạng thái cũ của kênh

- Trạng thái mới của kênh

- Giao dịch kích hoạt quá trình chuyển đổi trạng thái (ví dụ: Alice gửi 5 ETH cho Bob)

Các bản cập nhật trạng thái trong kênh không được phát trên chuỗi như trường hợp thông thường khi người dùng tương tác trên Mainnet, điều này phù hợp với mục tiêu của các kênh trạng thái là giảm thiểu dấu chân trên chuỗi. Miễn là những người tham gia đồng ý về các bản cập nhật trạng thái, chúng có tính cuối cùng như một giao dịch Ethereum. Những người tham gia chỉ cần phụ thuộc vào sự đồng thuận của Mainnet nếu có tranh chấp phát sinh.

### Đóng kênh {#closing-the-channel}

Việc đóng một kênh trạng thái yêu cầu gửi trạng thái cuối cùng, đã được đồng thuận của kênh đến hợp đồng thông minh trên chuỗi. Các chi tiết được tham chiếu trong bản cập nhật trạng thái bao gồm số lần di chuyển của mỗi người tham gia và danh sách các giao dịch đã được phê duyệt.

Sau khi xác minh rằng bản cập nhật trạng thái là hợp lệ (tức là nó được ký bởi tất cả các bên), hợp đồng thông minh sẽ hoàn tất kênh và phân phối số tiền đã khóa theo kết quả của kênh. Các khoản thanh toán được thực hiện ngoài chuỗi được áp dụng cho trạng thái của Ethereum và mỗi người tham gia nhận được phần còn lại của số tiền đã khóa.

Kịch bản được mô tả ở trên đại diện cho những gì xảy ra trong trường hợp thuận lợi. Đôi khi, người dùng có thể không đạt được thỏa thuận và hoàn tất kênh (trường hợp không thuận lợi). Bất kỳ điều nào sau đây có thể đúng với tình huống này:

- Những người tham gia ngoại tuyến và không đề xuất được các chuyển đổi trạng thái

- Những người tham gia từ chối đồng ký các bản cập nhật trạng thái hợp lệ

- Những người tham gia cố gắng hoàn tất kênh bằng cách đề xuất một bản cập nhật trạng thái cũ cho hợp đồng trên chuỗi

- Những người tham gia đề xuất các chuyển đổi trạng thái không hợp lệ để người khác ký

Bất cứ khi nào sự đồng thuận giữa các bên tham gia trong một kênh bị phá vỡ, lựa chọn cuối cùng là dựa vào sự đồng thuận của Mainnet để thực thi trạng thái cuối cùng, hợp lệ của kênh. Trong trường hợp này, việc đóng kênh trạng thái đòi hỏi phải giải quyết các tranh chấp trên chuỗi.

### Giải quyết tranh chấp {#settling-disputes}

Thông thường, các bên trong một kênh đồng ý về việc đóng kênh trước và đồng ký vào quá trình chuyển đổi trạng thái cuối cùng, mà họ gửi đến hợp đồng thông minh. Khi bản cập nhật được phê duyệt trên chuỗi, việc thực thi hợp đồng thông minh ngoài chuỗi kết thúc và những người tham gia thoát khỏi kênh với tiền của họ.

Tuy nhiên, một bên có thể gửi một yêu cầu trên chuỗi để kết thúc việc thực thi của hợp đồng thông minh và hoàn tất kênh—mà không cần chờ sự chấp thuận của đối tác. Nếu bất kỳ tình huống phá vỡ sự đồng thuận nào được mô tả trước đó xảy ra, một trong hai bên có thể kích hoạt hợp đồng trên chuỗi để đóng kênh và phân phối tiền. Điều này cung cấp **tính không cần tin cậy**, đảm bảo rằng các bên trung thực có thể rút tiền gửi của họ bất kỳ lúc nào, bất kể hành động của bên kia.

Để xử lý việc thoát kênh, người dùng phải gửi bản cập nhật trạng thái hợp lệ cuối cùng của ứng dụng đến hợp đồng trên chuỗi. Nếu điều này được xác nhận (tức là nó có chữ ký của tất cả các bên), thì tiền sẽ được phân phối lại theo hướng có lợi cho họ.

Tuy nhiên, có một sự chậm trễ trong việc thực hiện các yêu cầu thoát của một người dùng. Nếu yêu cầu kết thúc kênh được nhất trí phê duyệt, thì giao dịch thoát trên chuỗi sẽ được thực hiện ngay lập tức.

Sự chậm trễ xảy ra trong các lần thoát của một người dùng do khả năng có các hành động gian lận. Ví dụ, một người tham gia kênh có thể cố gắng hoàn tất kênh trên Ethereum bằng cách gửi một bản cập nhật trạng thái cũ hơn trên chuỗi.

Để đối phó, các kênh trạng thái cho phép người dùng trung thực thách thức các bản cập nhật trạng thái không hợp lệ bằng cách gửi trạng thái mới nhất, hợp lệ của kênh lên trên chuỗi. Các kênh trạng thái được thiết kế sao cho các bản cập nhật trạng thái mới hơn, được đồng thuận sẽ ghi đè lên các bản cập nhật trạng thái cũ hơn.

Khi một bên ngang hàng kích hoạt hệ thống giải quyết tranh chấp trên chuỗi, bên còn lại được yêu cầu phải phản hồi trong một giới hạn thời gian (được gọi là cửa sổ thách thức). Điều này cho phép người dùng thách thức giao dịch thoát, đặc biệt nếu bên kia đang áp dụng một bản cập nhật cũ.

Dù trong trường hợp nào, người dùng kênh luôn có đảm bảo về tính cuối cùng mạnh mẽ: nếu quá trình chuyển đổi trạng thái mà họ sở hữu được tất cả các thành viên ký và là bản cập nhật gần đây nhất, thì nó có tính cuối cùng tương đương với một giao dịch trên chuỗi thông thường. Họ vẫn phải thách thức bên kia trên chuỗi, nhưng kết quả duy nhất có thể xảy ra là hoàn tất trạng thái hợp lệ cuối cùng mà họ nắm giữ.

### Các kênh trạng thái tương tác với Ethereum như thế nào? {#how-do-state-channels-interact-with-ethereum}

Mặc dù tồn tại dưới dạng các giao thức ngoài chuỗi, các kênh trạng thái có một thành phần trên chuỗi: hợp đồng thông minh được triển khai trên Ethereum khi mở kênh. Hợp đồng này kiểm soát các tài sản được gửi vào kênh, xác minh các bản cập nhật trạng thái và phân xử các tranh chấp giữa những người tham gia.

Các kênh trạng thái không công bố dữ liệu giao dịch hoặc cam kết trạng thái lên Mainnet, không giống như các giải pháp mở rộng [lớp 2](/layer-2/). Tuy nhiên, chúng được kết nối với Mainnet nhiều hơn, chẳng hạn như [các chuỗi bên](/developers/docs/scaling/sidechains/), khiến chúng an toàn hơn phần nào.

Các kênh trạng thái dựa vào giao thức Ethereum chính cho những điều sau:

#### 1. Tính khả dụng {#liveness}

Hợp đồng trên chuỗi được triển khai khi mở kênh chịu trách nhiệm về chức năng của kênh. Nếu hợp đồng đang chạy trên Ethereum, thì kênh luôn có sẵn để sử dụng. Ngược lại, một chuỗi bên luôn có thể thất bại, ngay cả khi Mainnet đang hoạt động, khiến tiền của người dùng gặp rủi ro.

#### 2. Bảo mật {#security}

Ở một mức độ nào đó, các kênh trạng thái dựa vào Ethereum để cung cấp bảo mật và bảo vệ người dùng khỏi các bên ngang hàng độc hại. Như đã thảo luận trong các phần sau, các kênh sử dụng cơ chế bằng chứng gian lận cho phép người dùng thách thức các nỗ lực hoàn tất kênh bằng một bản cập nhật không hợp lệ hoặc đã cũ.

Trong trường hợp này, bên trung thực cung cấp trạng thái hợp lệ mới nhất của kênh như một bằng chứng gian lận cho hợp đồng trên chuỗi để xác minh. Bằng chứng gian lận cho phép các bên không tin tưởng lẫn nhau thực hiện các giao dịch ngoài chuỗi mà không gây rủi ro cho tiền của họ trong quá trình này.

#### 3. Tính kết luận cuối cùng {#finality}

Các bản cập nhật trạng thái được người dùng kênh ký chung được coi là tốt như các giao dịch trên chuỗi. Tuy nhiên, tất cả hoạt động trong kênh chỉ đạt được tính cuối cùng thực sự khi kênh được đóng trên Ethereum.

Trong trường hợp lạc quan, cả hai bên có thể hợp tác và ký vào bản cập nhật trạng thái cuối cùng và gửi lên chuỗi để đóng kênh, sau đó tiền sẽ được phân phối theo trạng thái cuối cùng của kênh. Trong trường hợp bi quan, khi ai đó cố gắng gian lận bằng cách đăng một bản cập nhật trạng thái không chính xác trên chuỗi, giao dịch của họ sẽ không được hoàn tất cho đến khi cửa sổ thách thức kết thúc.

## Các kênh trạng thái ảo {#virtual-state-channels}

Việc triển khai một kênh trạng thái một cách đơn giản sẽ là triển khai một hợp đồng mới khi hai người dùng muốn thực thi một ứng dụng ngoài chuỗi. Điều này không chỉ không khả thi mà còn phủ nhận hiệu quả chi phí của các kênh trạng thái (chi phí giao dịch trên chuỗi có thể tăng lên nhanh chóng).

Để giải quyết vấn đề này, "các kênh ảo" đã được tạo ra. Không giống như các kênh thông thường yêu cầu các giao dịch trên chuỗi để mở và kết thúc, một kênh ảo có thể được mở, thực thi và hoàn tất mà không cần tương tác với chuỗi chính. Thậm chí có thể giải quyết các tranh chấp ngoài chuỗi bằng phương pháp này.

Hệ thống này dựa trên sự tồn tại của cái gọi là "các kênh sổ cái", đã được cấp vốn trên chuỗi. Các kênh ảo giữa hai bên có thể được xây dựng trên một kênh sổ cái hiện có, với (các) chủ sở hữu của kênh sổ cái đóng vai trò trung gian.

Người dùng trong mỗi kênh ảo tương tác thông qua một phiên bản hợp đồng mới, với kênh sổ cái có thể hỗ trợ nhiều phiên bản hợp đồng. Trạng thái của kênh sổ cái cũng chứa nhiều hơn một trạng thái lưu trữ hợp đồng, cho phép thực thi song song các ứng dụng ngoài chuỗi giữa những người dùng khác nhau.

Giống như các kênh thông thường, người dùng trao đổi các bản cập nhật trạng thái để tiến triển máy trạng thái. Trừ khi có tranh chấp phát sinh, bên trung gian chỉ cần được liên hệ khi mở hoặc kết thúc kênh.

### Các kênh thanh toán ảo {#virtual-payment-channels}

Các kênh thanh toán ảo hoạt động dựa trên cùng một ý tưởng với các kênh trạng thái ảo: những người tham gia được kết nối với cùng một mạng có thể chuyển các thông điệp mà không cần phải mở một kênh mới trên chuỗi. Trong các kênh thanh toán ảo, việc chuyển giá trị được định tuyến thông qua một hoặc nhiều bên trung gian, với sự đảm bảo rằng chỉ người nhận dự định mới có thể nhận được tiền đã chuyển.

## Các ứng dụng của kênh trạng thái {#applications-of-state-channels}

### Thanh toán {#payments}

Các kênh blockchain ban đầu là các giao thức đơn giản cho phép hai người tham gia thực hiện các giao dịch chuyển tiền ngoài chuỗi nhanh chóng, phí thấp mà không phải trả phí giao dịch cao trên Mainnet. Ngày nay, các kênh thanh toán vẫn hữu ích cho các ứng dụng được thiết kế để trao đổi và gửi ether và token.

Thanh toán dựa trên kênh có những ưu điểm sau:

1. **Thông lượng**: Số lượng giao dịch ngoài chuỗi trên mỗi kênh không liên quan đến thông lượng của Ethereum, vốn bị ảnh hưởng bởi nhiều yếu tố khác nhau, đặc biệt là kích thước khối và thời gian khối. Bằng cách thực thi các giao dịch ngoài chuỗi, các kênh blockchain có thể đạt được thông lượng cao hơn.

2. **Quyền riêng tư**: Vì các kênh tồn tại ngoài chuỗi, chi tiết về các tương tác giữa những người tham gia không được ghi lại trên blockchain công khai của Ethereum. Người dùng kênh chỉ phải tương tác trên chuỗi khi cấp vốn và đóng kênh hoặc giải quyết tranh chấp. Do đó, các kênh rất hữu ích cho những cá nhân muốn có các giao dịch riêng tư hơn.

3. **Độ trễ**: Các giao dịch ngoài chuỗi được thực hiện giữa những người tham gia kênh có thể được giải quyết ngay lập tức, nếu cả hai bên hợp tác, giúp giảm sự chậm trễ. Ngược lại, việc gửi một giao dịch trên Mainnet đòi hỏi phải đợi các nút xử lý giao dịch, tạo một khối mới với giao dịch và đạt được sự đồng thuận. Người dùng cũng có thể cần đợi thêm các xác nhận khối trước khi coi một giao dịch là đã hoàn tất.

4. **Chi phí**: Các kênh trạng thái đặc biệt hữu ích trong các tình huống mà một nhóm người tham gia sẽ trao đổi nhiều bản cập nhật trạng thái trong một thời gian dài. Chi phí duy nhất phát sinh là việc mở và đóng hợp đồng thông minh của kênh trạng thái; mọi thay đổi trạng thái giữa việc mở và đóng kênh sẽ rẻ hơn so với lần trước vì chi phí thanh toán được phân bổ tương ứng.

Việc triển khai các kênh trạng thái trên các giải pháp lớp 2, chẳng hạn như [rollup](/developers/docs/scaling/#rollups), có thể khiến chúng trở nên hấp dẫn hơn nữa cho các khoản thanh toán. Mặc dù các kênh cung cấp các khoản thanh toán rẻ, chi phí thiết lập hợp đồng trên chuỗi trên Mainnet trong giai đoạn mở có thể trở nên đắt đỏ—đặc biệt là khi phí gas tăng đột biến. Các rollup dựa trên Ethereum cung cấp [phí giao dịch thấp hơn](https://l2fees.info/) và có thể giảm chi phí phát sinh cho người tham gia kênh bằng cách giảm phí thiết lập.

### Thanh toán vi mô {#microtransactions}

Thanh toán vi mô là các khoản thanh toán có giá trị thấp (ví dụ: thấp hơn một phần nhỏ của đô la) mà các doanh nghiệp không thể xử lý mà không bị thua lỗ. Các thực thể này phải trả tiền cho các nhà cung cấp dịch vụ thanh toán, điều mà họ không thể làm nếu lợi nhuận trên các khoản thanh toán của khách hàng quá thấp để có thể kiếm lời.

Các kênh thanh toán giải quyết vấn đề này bằng cách giảm chi phí phát sinh liên quan đến các giao dịch vi mô. Ví dụ, một Nhà cung cấp Dịch vụ Internet (ISP) có thể mở một kênh thanh toán với một khách hàng, cho phép họ truyền các khoản thanh toán nhỏ mỗi khi họ sử dụng dịch vụ.

Ngoài chi phí mở và đóng kênh, người tham gia không phải chịu thêm chi phí nào cho các giao dịch vi mô (không có phí gas). Đây là một tình huống đôi bên cùng có lợi vì khách hàng có sự linh hoạt hơn trong việc trả bao nhiêu cho các dịch vụ và các doanh nghiệp không bị mất đi các giao dịch vi mô có lợi nhuận.

### Các ứng dụng phi tập trung {#decentralized-applications}

Giống như các kênh thanh toán, các kênh trạng thái có thể thực hiện các khoản thanh toán có điều kiện theo các trạng thái cuối cùng của máy trạng thái. Các kênh trạng thái cũng có thể hỗ trợ logic chuyển đổi trạng thái tùy ý, giúp chúng hữu ích cho việc thực thi các ứng dụng chung ngoài chuỗi.

Các kênh trạng thái thường bị giới hạn trong các ứng dụng theo lượt đơn giản, vì điều này giúp quản lý dễ dàng hơn các khoản tiền đã cam kết cho hợp đồng trên chuỗi. Ngoài ra, với một số lượng hạn chế các bên cập nhật trạng thái của ứng dụng ngoài chuỗi theo từng khoảng thời gian, việc trừng phạt hành vi không trung thực là tương đối đơn giản.

Hiệu quả của một ứng dụng kênh trạng thái cũng phụ thuộc vào thiết kế của nó. Ví dụ, một nhà phát triển có thể triển khai hợp đồng kênh ứng dụng trên chuỗi một lần và cho phép những người chơi khác sử dụng lại ứng dụng mà không cần phải lên chuỗi. Trong trường hợp này, kênh ứng dụng ban đầu đóng vai trò như một kênh sổ cái hỗ trợ nhiều kênh ảo, mỗi kênh chạy một phiên bản mới của hợp đồng thông minh của ứng dụng ngoài chuỗi.

Một trường hợp sử dụng tiềm năng cho các ứng dụng kênh trạng thái là các trò chơi hai người chơi đơn giản, trong đó tiền được phân phối dựa trên kết quả của trò chơi. Lợi ích ở đây là người chơi không cần phải tin tưởng nhau (tính không cần tin cậy) và hợp đồng trên chuỗi, chứ không phải người chơi, kiểm soát việc phân bổ tiền và giải quyết tranh chấp (tính phi tập trung).

Các trường hợp sử dụng khả thi khác cho các ứng dụng kênh trạng thái bao gồm quyền sở hữu tên ENS, sổ cái NFT, và nhiều hơn nữa.

### Chuyển khoản nguyên tử {#atomic-transfers}

Các kênh thanh toán ban đầu bị giới hạn trong việc chuyển tiền giữa hai bên, hạn chế khả năng sử dụng của chúng. Tuy nhiên, sự ra đời của các kênh ảo đã cho phép các cá nhân định tuyến các giao dịch chuyển tiền qua các bên trung gian (tức là nhiều kênh p2p) mà không cần phải mở một kênh mới trên chuỗi.

Thường được mô tả là "chuyển tiền đa chặng", các khoản thanh toán được định tuyến là nguyên tử (tức là tất cả các phần của giao dịch đều thành công hoặc nó hoàn toàn thất bại). Chuyển khoản nguyên tử sử dụng [Hợp đồng Khóa thời gian Băm (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) để đảm bảo thanh toán chỉ được giải phóng nếu các điều kiện nhất định được đáp ứng, do đó giảm rủi ro đối tác.

## Nhược điểm của việc sử dụng các kênh trạng thái {#drawbacks-of-state-channels}

### Các giả định về tính khả dụng {#liveness-assumptions}

Để đảm bảo hiệu quả, các kênh trạng thái đặt ra giới hạn thời gian về khả năng của những người tham gia kênh để phản hồi các tranh chấp. Quy tắc này giả định rằng các bên ngang hàng sẽ luôn trực tuyến để giám sát hoạt động của kênh và tranh luận các thách thức khi cần thiết.

Trong thực tế, người dùng có thể ngoại tuyến vì những lý do ngoài tầm kiểm soát của họ (ví dụ: kết nối internet kém, lỗi cơ học, v.v.). Nếu một người dùng trung thực ngoại tuyến, một bên ngang hàng độc hại có thể khai thác tình hình bằng cách trình bày các trạng thái trung gian cũ cho hợp đồng phân xử và đánh cắp số tiền đã cam kết.

Một số kênh sử dụng "watchtowers" (tháp canh)—các thực thể chịu trách nhiệm theo dõi các sự kiện tranh chấp trên chuỗi thay cho những người khác và thực hiện các hành động cần thiết, như cảnh báo các bên liên quan. Tuy nhiên, điều này có thể làm tăng chi phí sử dụng một kênh trạng thái.

### Tính không sẵn có của dữ liệu {#data-unavailability}

Như đã giải thích trước đó, việc thách thức một tranh chấp không hợp lệ đòi hỏi phải trình bày trạng thái mới nhất, hợp lệ của kênh trạng thái. Đây là một quy tắc khác dựa trên một giả định—rằng người dùng có quyền truy cập vào trạng thái mới nhất của kênh.

Mặc dù việc mong đợi người dùng kênh lưu trữ các bản sao của trạng thái ứng dụng ngoài chuỗi là hợp lý, dữ liệu này có thể bị mất do lỗi hoặc hỏng hóc cơ học. Nếu người dùng không sao lưu dữ liệu, họ chỉ có thể hy vọng rằng bên kia không hoàn tất một yêu cầu thoát không hợp lệ bằng cách sử dụng các chuyển đổi trạng thái cũ mà họ sở hữu.

Người dùng Ethereum không phải đối mặt với vấn đề này vì mạng lưới thực thi các quy tắc về tính khả dụng của dữ liệu. Dữ liệu giao dịch được lưu trữ và lan truyền bởi tất cả các nút và có sẵn để người dùng tải xuống nếu và khi cần thiết.

### Các vấn đề về thanh khoản {#liquidity-issues}

Để thiết lập một kênh blockchain, những người tham gia cần phải khóa tiền trong một hợp đồng thông minh trên chuỗi trong suốt vòng đời của kênh. Điều này làm giảm tính thanh khoản của người dùng kênh và cũng giới hạn các kênh cho những người có đủ khả năng để giữ tiền bị khóa trên Mainnet.

Tuy nhiên, các kênh sổ cái—do một nhà cung cấp dịch vụ ngoài chuỗi (OSP) vận hành—có thể giảm bớt các vấn đề về thanh khoản cho người dùng. Hai bên ngang hàng được kết nối với một kênh sổ cái có thể tạo ra một kênh ảo, mà họ có thể mở và hoàn tất hoàn toàn ngoài chuỗi, bất cứ lúc nào họ muốn.

Các nhà cung cấp dịch vụ ngoài chuỗi cũng có thể mở các kênh với nhiều bên ngang hàng, làm cho chúng hữu ích cho việc định tuyến thanh toán. Tất nhiên, người dùng phải trả phí cho các OSP cho dịch vụ của họ, điều này có thể không mong muốn đối với một số người.

### Tấn công gây rối {#griefing-attacks}

Các cuộc tấn công gây rối là một đặc điểm phổ biến của các hệ thống dựa trên bằng chứng gian lận. Một cuộc tấn công gây rối không trực tiếp mang lại lợi ích cho kẻ tấn công nhưng gây ra sự phiền toái (tức là, tổn hại) cho nạn nhân, do đó có tên gọi này.

Việc chứng minh gian lận dễ bị tấn công gây rối vì bên trung thực phải phản hồi mọi tranh chấp, ngay cả những tranh chấp không hợp lệ, nếu không sẽ có nguy cơ mất tiền. Một người tham gia độc hại có thể quyết định liên tục đăng các chuyển đổi trạng thái cũ trên chuỗi, buộc bên trung thực phải phản hồi bằng trạng thái hợp lệ. Chi phí của các giao dịch trên chuỗi đó có thể tăng lên nhanh chóng, khiến các bên trung thực bị thiệt hại trong quá trình này.

### Tập hợp người tham gia được xác định trước {#predefined-participant-sets}

Theo thiết kế, số lượng người tham gia tạo nên một kênh trạng thái vẫn cố định trong suốt vòng đời của nó. Điều này là do việc cập nhật tập hợp người tham gia sẽ làm phức tạp hoạt động của kênh, đặc biệt là khi cấp vốn cho kênh hoặc giải quyết tranh chấp. Việc thêm hoặc bớt người tham gia cũng sẽ yêu cầu hoạt động trên chuỗi bổ sung, làm tăng chi phí phát sinh cho người dùng.

Mặc dù điều này làm cho các kênh trạng thái dễ hiểu hơn, nó lại hạn chế tính hữu dụng của các thiết kế kênh đối với các nhà phát triển ứng dụng. Điều này một phần giải thích tại sao các kênh trạng thái đã bị loại bỏ để chuyển sang các giải pháp mở rộng khác, chẳng hạn như rollup.

### Xử lý giao dịch song song {#parallel-transaction-processing}

Những người tham gia trong kênh trạng thái gửi các bản cập nhật trạng thái theo lượt, đó là lý do tại sao chúng hoạt động tốt nhất cho "các ứng dụng theo lượt" (ví dụ: một ván cờ vua hai người chơi). Điều này loại bỏ nhu cầu xử lý các bản cập nhật trạng thái đồng thời và giảm bớt công việc mà hợp đồng trên chuỗi phải làm để trừng phạt những người đăng bản cập nhật cũ. Tuy nhiên, một tác dụng phụ của thiết kế này là các giao dịch phụ thuộc lẫn nhau, làm tăng độ trễ và làm giảm trải nghiệm người dùng tổng thể.

Một số kênh trạng thái giải quyết vấn đề này bằng cách sử dụng thiết kế "song công toàn phần" (full-duplex) tách trạng thái ngoài chuỗi thành hai trạng thái "đơn công" (simplex) một chiều, cho phép cập nhật trạng thái đồng thời. Các thiết kế như vậy cải thiện thông lượng ngoài chuỗi và giảm sự chậm trễ của giao dịch.

## Sử dụng các kênh trạng thái {#use-state-channels}

Nhiều dự án cung cấp các triển khai của các kênh trạng thái mà bạn có thể tích hợp vào các ứng dụng phi tập trung của mình:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Đọc thêm {#further-reading}

**Các kênh trạng thái**

- [Tìm hiểu về các giải pháp mở rộng lớp 2 của Ethereum: Kênh trạng thái, Plasma và Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 tháng 2 năm 2018_
- [Các kênh trạng thái - một lời giải thích](https://www.jeffcoleman.ca/state-channels/) _Ngày 6 tháng 11 năm 2015 - Jeff Coleman_
- [Những điều cơ bản về các kênh trạng thái](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Các kênh trạng thái Blockchain: Tình hình hiện tại](https://ieeexplore.ieee.org/document/9627997)

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
