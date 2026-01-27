---
title: Thực hành tốt nhất về thiết kế sàn giao dịch phi tập trung (DEX)
description: Hướng dẫn giải thích các quyết định về UX/UI để hoán đổi token.
lang: vi
---

Kể từ khi Uniswap ra mắt vào năm 2018, đã có hàng trăm sàn giao dịch phi tập trung được ra mắt trên hàng chục chuỗi khác nhau.
Nhiều sàn trong số này đã giới thiệu các yếu tố mới hoặc thêm vào những điểm nhấn riêng, nhưng giao diện nhìn chung vẫn giữ nguyên.

Một lý do cho điều này là [Định luật Jakob](https://lawsofux.com/jakobs-law/):

> Người dùng dành phần lớn thời gian của họ trên các trang web khác. Điều này có nghĩa là người dùng thích trang web của bạn hoạt động theo cách tương tự như tất cả các trang web khác mà họ đã biết.

Nhờ những nhà đổi mới ban đầu như Uniswap, Pancakeswap và Sushiswap, người dùng DeFi có một ý tưởng chung về giao diện của một DEX.
Vì lý do này, một cái gì đó giống như “thực hành tốt nhất” hiện đang xuất hiện. Chúng ta thấy ngày càng có nhiều quyết định thiết kế được tiêu chuẩn hóa trên các trang web. Bạn có thể thấy sự phát triển của các DEX như một ví dụ khổng lồ về việc thử nghiệm trực tiếp. Những thứ hoạt động hiệu quả thì được giữ lại, những thứ không hiệu quả thì bị loại bỏ. Vẫn có không gian cho cá tính, nhưng có những tiêu chuẩn nhất định mà một DEX nên tuân thủ.

Bài viết này là bản tóm tắt về:

- những gì cần bao gồm
- làm thế nào để nó dễ sử dụng nhất có thể
- các cách chính để tùy chỉnh thiết kế

Tất cả các wireframe ví dụ đều được tạo riêng cho bài viết này, mặc dù tất cả chúng đều dựa trên các dự án thực tế.

Bộ công cụ Figma cũng được bao gồm ở phía dưới - hãy thoải mái sử dụng nó và tăng tốc các wireframe của riêng bạn!

## Cấu trúc cơ bản của một DEX {#basic-anatomy-of-a-dex}

Giao diện người dùng thường chứa ba thành phần:

1. Biểu mẫu chính
2. Nút
3. Bảng chi tiết

![Giao diện người dùng DEX chung, hiển thị ba thành phần chính](./1.png)

## Các biến thể {#variations}

Đây sẽ là một chủ đề chung trong bài viết này, nhưng có nhiều cách khác nhau để các thành phần này có thể được sắp xếp. “Bảng chi tiết” có thể là:

- Phía trên nút
- Phía dưới nút
- Ẩn trong một bảng accordion
- Và/hoặc trên cửa sổ “xem trước”

Lưu ý: Cửa sổ “xem trước” là tùy chọn, nhưng nếu bạn hiển thị rất ít chi tiết trên giao diện người dùng chính, nó sẽ trở nên cần thiết.

## Cấu trúc của biểu mẫu chính {#structure-of-the-main-form}

Đây là hộp nơi bạn thực sự chọn loại token bạn muốn hoán đổi. Thành phần bao gồm một trường nhập liệu và một nút nhỏ trong một hàng.

Các DEX thường hiển thị các chi tiết bổ sung ở một hàng phía trên và một hàng phía dưới, mặc dù điều này có thể được định cấu hình khác nhau.

![Hàng nhập liệu, với một hàng chi tiết ở trên và dưới](./2.png)

## Các biến thể {#variations2}

Hai biến thể giao diện người dùng được hiển thị ở đây; một biến thể không có đường viền, tạo ra một thiết kế rất mở và một biến thể trong đó hàng nhập liệu có đường viền, tạo sự tập trung vào thành phần đó.

![Hai biến thể UI của biểu mẫu chính](./3.png)

Cấu trúc cơ bản này cho phép **bốn thông tin quan trọng** được hiển thị trong thiết kế: một ở mỗi góc. Nếu chỉ có một hàng trên/dưới, thì chỉ có hai vị trí.

Trong quá trình phát triển của DeFi, rất nhiều thứ khác nhau đã được đưa vào đây.

## Thông tin chính cần bao gồm {#key-info-to-include}

- Số dư trong ví
- Nút Tối đa
- Giá trị tương đương bằng tiền pháp định
- Tác động giá đối với số tiền “nhận được”

Trong những ngày đầu của DeFi, giá trị tương đương bằng tiền pháp định thường bị thiếu. Nếu bạn đang xây dựng bất kỳ loại dự án Web3 nào, điều cần thiết là phải hiển thị giá trị tương đương bằng tiền pháp định. Người dùng vẫn suy nghĩ theo đơn vị tiền tệ địa phương, vì vậy để phù hợp với các mô hình tư duy trong thế giới thực, điều này nên được bao gồm.

Trên trường thứ hai (nơi bạn chọn token mà bạn đang hoán đổi sang), bạn cũng có thể bao gồm tác động giá bên cạnh số tiền pháp định, bằng cách tính toán sự khác biệt giữa số tiền nhập vào và số tiền đầu ra ước tính. Đây là một chi tiết khá hữu ích để bao gồm.

Các nút phần trăm (ví dụ: 25%, 50%, 75%) có thể là một tính năng hữu ích, nhưng chúng chiếm nhiều không gian hơn, thêm nhiều lời kêu gọi hành động hơn và tăng thêm gánh nặng tinh thần. Tương tự với thanh trượt phần trăm. Một số quyết định về giao diện người dùng này sẽ phụ thuộc vào thương hiệu và loại người dùng của bạn.

Các chi tiết bổ sung có thể được hiển thị bên dưới biểu mẫu chính. Vì loại thông tin này chủ yếu dành cho người dùng chuyên nghiệp, nên có thể:

- giữ nó ở mức tối thiểu nhất có thể, hoặc;
- ẩn nó trong một bảng accordion

![Chi tiết được hiển thị ở các góc của biểu mẫu chính đó](./4.png)

## Thông tin bổ sung cần bao gồm {#extra-info-to-include}

- Giá Token
- Trượt giá
- Số tiền tối thiểu nhận được
- Đầu ra dự kiến
- Tác động giá
- Ước tính chi phí gas
- Các khoản phí khác
- Định tuyến lệnh

Có thể cho rằng, một số chi tiết này có thể là tùy chọn.

Định tuyến lệnh rất thú vị, nhưng không tạo ra nhiều khác biệt cho hầu hết người dùng.

Một số chi tiết khác chỉ đơn giản là trình bày lại cùng một thứ theo những cách khác nhau. Ví dụ, “số tiền tối thiểu nhận được” và “trượt giá” là hai mặt của cùng một vấn đề. Nếu bạn đặt mức trượt giá là 1%, thì số tiền tối thiểu bạn có thể nhận được = đầu ra dự kiến-1%. Một số giao diện người dùng sẽ hiển thị số tiền dự kiến, số tiền tối thiểu và độ trượt giá… Điều này hữu ích nhưng có thể là thừa thãi.

Hầu hết người dùng dù sao cũng sẽ để mặc định độ trượt giá.

“Tác động giá” thường được hiển thị trong ngoặc đơn bên cạnh giá trị tương đương bằng tiền pháp định trong trường “đến”. Đây là một chi tiết ux tuyệt vời để thêm vào, nhưng nếu nó đã được hiển thị ở đây, liệu có thực sự cần phải hiển thị lại ở bên dưới không? Và sau đó lại một lần nữa trên màn hình xem trước?

Nhiều người dùng (đặc biệt là những người hoán đổi số lượng nhỏ) sẽ không quan tâm đến những chi tiết này; họ sẽ chỉ cần nhập một số và nhấn hoán đổi.

![Một số chi tiết hiển thị cùng một thứ](./5.png)

Chính xác những chi tiết nào được hiển thị sẽ phụ thuộc vào đối tượng của bạn và cảm giác bạn muốn ứng dụng mang lại.

Nếu bạn bao gồm mức chịu trượt giá trong bảng chi tiết, bạn cũng nên làm cho nó có thể chỉnh sửa trực tiếp từ đây. Đây là một ví dụ điển hình về một “trình tăng tốc”; một mẹo UX gọn gàng có thể tăng tốc quy trình của người dùng có kinh nghiệm mà không ảnh hưởng đến khả năng sử dụng chung của ứng dụng.

![Độ trượt giá có thể được kiểm soát từ bảng chi tiết](./6.png)

Bạn nên suy nghĩ cẩn thận không chỉ về một thông tin cụ thể trên một màn hình, mà về toàn bộ luồng:
Nhập số trong Biểu mẫu chính → Quét chi tiết → Nhấp vào Màn hình xem trước (nếu bạn có màn hình xem trước).
Bảng chi tiết có nên hiển thị mọi lúc không, hay người dùng cần nhấp vào để mở rộng?
Bạn có nên tạo ra sự cản trở bằng cách thêm màn hình xem trước không? Điều này buộc người dùng phải chậm lại và cân nhắc giao dịch của họ, điều này có thể hữu ích. Nhưng liệu họ có muốn xem lại tất cả các thông tin giống nhau không? Điều gì là hữu ích nhất cho họ tại thời điểm này?

## Tùy chọn thiết kế {#design-options}

Như đã đề cập, phần lớn điều này phụ thuộc vào phong cách cá nhân của bạn
Người dùng của bạn là ai?
Thương hiệu của bạn là gì?
Bạn muốn một giao diện “chuyên nghiệp” hiển thị mọi chi tiết, hay bạn muốn tối giản?
Ngay cả khi bạn đang nhắm đến những người dùng chuyên nghiệp muốn có tất cả thông tin có thể, bạn vẫn nên nhớ những lời khôn ngoan của Alan Cooper:

> Dù giao diện của bạn đẹp đến đâu, dù tuyệt vời đến đâu, sẽ tốt hơn nếu nó ít hơn.

### Cấu trúc {#structure}

- token ở bên trái, hoặc token ở bên phải
- 2 hàng hoặc 3
- chi tiết ở trên hoặc dưới nút
- chi tiết được mở rộng, thu nhỏ hoặc không hiển thị

### Kiểu thành phần {#component-style}

- trống
- có đường viền
- được điền

Từ quan điểm UX thuần túy, kiểu giao diện người dùng ít quan trọng hơn bạn nghĩ. Các xu hướng hình ảnh đến và đi theo chu kỳ, và rất nhiều sở thích là chủ quan.

Cách dễ nhất để cảm nhận điều này - và suy nghĩ về các cấu hình khác nhau - là xem một số ví dụ và sau đó tự mình thử nghiệm.

Bộ công cụ Figma đi kèm chứa các thành phần trống, có đường viền và được điền.

Hãy xem các ví dụ dưới đây để thấy các cách khác nhau mà bạn có thể kết hợp tất cả chúng lại với nhau:

![3 hàng theo kiểu được điền](./7.png)

![3 hàng theo kiểu có đường viền](./8.png)

![2 hàng theo kiểu trống](./9.png)

![3 hàng theo kiểu có đường viền, với một bảng chi tiết](./10.png)

![3 hàng với hàng nhập liệu theo kiểu có đường viền](./11.png)

![2 hàng theo kiểu được điền](./12.png)

## Nhưng token nên ở bên nào? {#but-which-side-should-the-token-go-on}

Điểm mấu chốt là nó có lẽ không tạo ra sự khác biệt lớn đối với khả năng sử dụng. Tuy nhiên, có một vài điều cần lưu ý, có thể khiến bạn nghiêng về một bên hoặc bên kia.

Thật thú vị khi thấy xu hướng thay đổi theo thời gian. Uniswap ban đầu đặt token ở bên trái, nhưng sau đó đã chuyển nó sang bên phải. Sushiswap cũng đã thực hiện thay đổi này trong một lần nâng cấp thiết kế. Hầu hết, nhưng không phải tất cả, các giao thức đã làm theo.

Quy ước tài chính truyền thống đặt ký hiệu tiền tệ trước con số, ví dụ: $50, €50, £50, nhưng chúng ta _nói_ 50 đô la, 50 Euro, 50 bảng Anh.

Đối với người dùng phổ thông - đặc biệt là người đọc từ trái sang phải, từ trên xuống dưới - việc đặt token ở bên phải có lẽ sẽ cảm thấy tự nhiên hơn.

![Một giao diện người dùng với các token ở bên trái](./13.png)

Đặt token ở bên trái và tất cả các con số ở bên phải trông đối xứng một cách dễ chịu, đó là một điểm cộng, nhưng có một nhược điểm khác đối với bố cục này.

Quy luật về sự gần gũi nói rằng các mục ở gần nhau được coi là có liên quan. Theo đó, chúng ta muốn đặt các mục liên quan cạnh nhau. Số dư token liên quan trực tiếp đến chính token đó và sẽ thay đổi bất cứ khi nào một token mới được chọn. Do đó, việc số dư token nằm cạnh nút chọn token sẽ hợp lý hơn một chút. Nó có thể được di chuyển xuống dưới token, nhưng điều đó phá vỡ tính đối xứng của bố cục.

Cuối cùng, có những ưu và nhược điểm cho cả hai lựa chọn, nhưng điều thú vị là xu hướng dường như đang hướng về việc đặt token ở bên phải.

## Hành vi của nút {#button-behavior}

Đừng tạo một nút riêng cho Phê duyệt. Cũng đừng có một cú nhấp riêng cho Phê duyệt. Người dùng muốn Hoán đổi, vì vậy chỉ cần ghi “hoán đổi” trên nút và bắt đầu quá trình phê duyệt như bước đầu tiên. Một cửa sổ có thể hiển thị tiến trình bằng một trình theo bước, hoặc một thông báo đơn giản “tx 1 của 2 - đang phê duyệt”.

![Một giao diện người dùng với các nút riêng biệt cho phê duyệt và hoán đổi](./14.png)

![Một giao diện người dùng với một nút ghi là phê duyệt](./15.png)

### Nút như trợ giúp theo ngữ cảnh {#button-as-contextual-help}

Nút có thể thực hiện nhiệm vụ kép như một cảnh báo!

Đây thực sự là một mẫu thiết kế khá bất thường bên ngoài Web3, nhưng đã trở thành tiêu chuẩn bên trong nó. Đây là một sự đổi mới tốt vì nó tiết kiệm không gian và giữ sự chú ý tập trung.

Nếu hành động chính - HOÁN ĐỔI - không khả dụng do lỗi, lý do có thể được giải thích bằng nút, ví dụ:

- chuyển mạng
- kết nối ví
- các lỗi khác nhau

Nút cũng có thể được **ánh xạ tới hành động** cần được thực hiện. Ví dụ: nếu người dùng không thể hoán đổi vì họ đang ở sai mạng, nút sẽ hiển thị “chuyển sang Ethereum” và khi người dùng nhấp vào nút, nó sẽ chuyển mạng sang Ethereum. Điều này tăng tốc đáng kể luồng người dùng.

![Các hành động chính được bắt đầu từ CTA chính](./16.png)

![Thông báo lỗi được hiển thị trong CTA chính](./17.png)

## Tự xây dựng với tệp figma này {#build-your-own-with-this-figma-file}

Nhờ sự làm việc chăm chỉ của nhiều giao thức, thiết kế DEX đã được cải thiện rất nhiều. Chúng tôi biết người dùng cần thông tin gì, cách chúng tôi nên hiển thị nó và cách làm cho luồng trở nên mượt mà nhất có thể.
Hy vọng bài viết này cung cấp một cái nhìn tổng quan vững chắc về các nguyên tắc UX.

Nếu bạn muốn thử nghiệm, vui lòng sử dụng bộ wireframe Figma. Nó được giữ đơn giản nhất có thể, nhưng có đủ tính linh hoạt để xây dựng cấu trúc cơ bản theo nhiều cách khác nhau.

[Bộ wireframe Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi sẽ tiếp tục phát triển và luôn có chỗ để cải thiện.

Chúc may mắn!
