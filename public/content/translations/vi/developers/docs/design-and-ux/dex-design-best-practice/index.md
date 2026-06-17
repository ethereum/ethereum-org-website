---
title: Các phương pháp thiết kế sàn giao dịch phi tập trung (DEX) tốt nhất
description: Hướng dẫn giải thích các quyết định UX/UI cho việc hoán đổi token.
lang: vi
---

Kể từ khi Uniswap ra mắt vào năm 2018, đã có hàng trăm sàn giao dịch phi tập trung được triển khai trên hàng chục chuỗi khác nhau.
Nhiều sàn trong số này đã giới thiệu các yếu tố mới hoặc thêm thắt những nét riêng, nhưng nhìn chung giao diện vẫn giữ nguyên.

Một lý do cho điều này là [Định luật Jakob](https://lawsofux.com/jakobs-law/):

> Người dùng dành phần lớn thời gian của họ trên các trang web khác. Điều này có nghĩa là người dùng thích trang web của bạn hoạt động theo cùng một cách với tất cả các trang web khác mà họ đã biết.

Nhờ những người tiên phong như Uniswap, Pancakeswap và Sushiswap, người dùng tài chính phi tập trung (DeFi) đã có một hình dung chung về giao diện của một DEX.
Vì lý do này, một thứ giống như “phương pháp tốt nhất” hiện đang xuất hiện. Chúng ta thấy ngày càng có nhiều quyết định thiết kế được tiêu chuẩn hóa trên các trang web. Bạn có thể xem sự phát triển của các DEX như một ví dụ khổng lồ về việc thử nghiệm trong thực tế. Những gì hiệu quả được giữ lại, những gì không hiệu quả bị loại bỏ. Vẫn còn không gian cho cá tính riêng, nhưng có những tiêu chuẩn nhất định mà một DEX nên tuân theo.

Bài viết này là bản tóm tắt về:
- những gì cần đưa vào
- cách làm cho nó dễ sử dụng nhất có thể
- các cách chính để tùy chỉnh thiết kế

Tất cả các wireframe ví dụ đều được tạo riêng cho bài viết này, mặc dù chúng đều dựa trên các dự án thực tế.

Bộ công cụ Figma cũng được đính kèm ở cuối bài - hãy thoải mái sử dụng nó và tăng tốc độ tạo wireframe của riêng bạn!

## Cấu trúc cơ bản của một DEX {#basic-anatomy-of-a-dex}

Giao diện người dùng (UI) thường bao gồm ba yếu tố:
1. Biểu mẫu chính
2. Nút bấm
3. Bảng chi tiết

![Generic DEX UI, showing the three main elements](./1.png)


## Các biến thể {#variations}

Đây sẽ là một chủ đề xuyên suốt trong bài viết này, nhưng có nhiều cách khác nhau để tổ chức các yếu tố này. “Bảng chi tiết” có thể nằm:
- Phía trên nút bấm
- Phía dưới nút bấm
- Ẩn trong một bảng accordion (bảng thu gọn)
- Và/hoặc trên một modal “xem trước”
  
Lưu ý: Modal “xem trước” là tùy chọn, nhưng nếu bạn hiển thị rất ít chi tiết trên UI chính, nó sẽ trở nên cần thiết.

## Cấu trúc của biểu mẫu chính {#structure-of-the-main-form}

Đây là hộp nơi bạn thực sự chọn token mà bạn muốn hoán đổi. Thành phần này bao gồm một trường nhập liệu và một nút nhỏ trên cùng một hàng.

Các DEX thường hiển thị thêm chi tiết ở một hàng phía trên và một hàng phía dưới, mặc dù điều này có thể được cấu hình khác đi.

![Input row, with a details row above and below](./2.png)

## Các biến thể {#variations2}

Hai biến thể UI được hiển thị ở đây; một biến thể không có bất kỳ đường viền nào, tạo ra một thiết kế rất mở, và một biến thể nơi hàng nhập liệu có đường viền, tạo sự tập trung vào yếu tố đó.

![Two UI variations of the main form](./3.png)

Cấu trúc cơ bản này cho phép hiển thị **bốn thông tin chính** trong thiết kế: mỗi thông tin ở một góc. Nếu chỉ có một hàng trên/dưới, thì chỉ có hai vị trí.

Trong quá trình phát triển của tài chính phi tập trung (DeFi), rất nhiều thứ khác nhau đã được đưa vào đây.

## Thông tin chính cần đưa vào {#key-info-to-include}

- Số dư trong ví
- Nút Tối đa (Max)
- Giá trị tương đương bằng tiền pháp định (fiat)
- Tác động giá lên số lượng “nhận được”

Trong những ngày đầu của DeFi, giá trị tương đương bằng tiền pháp định thường bị thiếu. Nếu bạn đang xây dựng bất kỳ loại dự án Web3 nào, việc hiển thị giá trị tương đương bằng tiền pháp định là điều cần thiết. Người dùng vẫn suy nghĩ theo các loại tiền tệ địa phương, vì vậy để phù hợp với mô hình tư duy trong thế giới thực, điều này nên được đưa vào.

Trên trường thứ hai (nơi bạn chọn token mà bạn đang hoán đổi sang), bạn cũng có thể bao gồm tác động giá bên cạnh số tiền pháp định, bằng cách tính toán sự chênh lệch giữa số lượng đầu vào và số lượng đầu ra ước tính. Đây là một chi tiết khá hữu ích cần đưa vào.

Các nút phần trăm (ví dụ: 25%, 50%, 75%) có thể là một tính năng hữu ích, nhưng chúng chiếm nhiều không gian hơn, thêm nhiều lời kêu gọi hành động hơn và làm tăng thêm tải trọng nhận thức. Tương tự với các thanh trượt phần trăm. Một số quyết định UI này sẽ phụ thuộc vào thương hiệu và loại người dùng của bạn.

Các chi tiết bổ sung có thể được hiển thị bên dưới biểu mẫu chính. Vì loại thông tin này chủ yếu dành cho người dùng chuyên nghiệp, nên hợp lý nhất là:
- giữ nó ở mức tối giản nhất có thể, hoặc;
- ẩn nó trong một bảng accordion

![Details shown in the corners of that main form](./4.png)

## Thông tin bổ sung cần đưa vào {#extra-info-to-include}

- Giá token
- Trượt giá
- Số lượng nhận tối thiểu
- Đầu ra dự kiến
- Tác động giá
- Ước tính chi phí Gas
- Các khoản phí khác
- Định tuyến lệnh

Có thể cho rằng, một số chi tiết này có thể là tùy chọn.

Định tuyến lệnh khá thú vị, nhưng không tạo ra nhiều khác biệt đối với hầu hết người dùng.

Một số chi tiết khác chỉ đơn giản là trình bày lại cùng một thứ theo những cách khác nhau. Ví dụ: “số lượng nhận tối thiểu” và “trượt giá” là hai mặt của cùng một vấn đề. Nếu bạn đặt trượt giá ở mức 1%, thì mức tối thiểu bạn có thể mong đợi nhận được = đầu ra dự kiến - 1%. Một số UI sẽ hiển thị số lượng dự kiến, số lượng tối thiểu và trượt giá… Điều này hữu ích nhưng có thể là quá mức cần thiết. 

Dù sao thì hầu hết người dùng sẽ để mức trượt giá mặc định.

“Tác động giá” thường được hiển thị trong ngoặc đơn bên cạnh giá trị tương đương bằng tiền pháp định trong trường “đến” (to). Đây là một chi tiết UX tuyệt vời để thêm vào, nhưng nếu nó được hiển thị ở đây, liệu nó có thực sự cần được hiển thị lại ở bên dưới không? Và sau đó lại hiển thị trên màn hình xem trước?

Nhiều người dùng (đặc biệt là những người hoán đổi số lượng nhỏ) sẽ không quan tâm đến những chi tiết này; họ sẽ chỉ cần nhập một con số và nhấn hoán đổi.

![Some details show the same thing](./5.png)

Chính xác những chi tiết nào được hiển thị sẽ phụ thuộc vào đối tượng của bạn và cảm giác mà bạn muốn ứng dụng mang lại.

Nếu bạn đưa dung sai trượt giá vào bảng chi tiết, bạn cũng nên cho phép chỉnh sửa trực tiếp từ đây. Đây là một ví dụ điển hình về “phím tắt” (accelerator); một thủ thuật UX gọn gàng có thể tăng tốc luồng thao tác của những người dùng có kinh nghiệm, mà không ảnh hưởng đến khả năng sử dụng chung của ứng dụng.

![Slippage can be controlled from the details panel](./6.png)

Bạn nên suy nghĩ cẩn thận không chỉ về một thông tin cụ thể trên một màn hình, mà về toàn bộ luồng thao tác:
Nhập số vào Biểu mẫu chính → Quét qua các Chi tiết → Nhấp vào Màn hình xem trước (nếu bạn có màn hình xem trước). 
Bảng chi tiết có nên luôn hiển thị hay người dùng cần nhấp vào nó để mở rộng?
Bạn có nên tạo ra sự cản trở bằng cách thêm một màn hình xem trước không? Điều này buộc người dùng phải chậm lại và xem xét giao dịch của họ, điều này có thể hữu ích. Nhưng họ có muốn xem lại tất cả các thông tin tương tự không? Điều gì là hữu ích nhất đối với họ tại thời điểm này?

## Các tùy chọn thiết kế {#design-options}

Như đã đề cập, phần lớn điều này phụ thuộc vào phong cách cá nhân của bạn
Người dùng của bạn là ai?
Thương hiệu của bạn là gì?
Bạn muốn một giao diện “chuyên nghiệp” hiển thị mọi chi tiết, hay bạn muốn theo phong cách tối giản?
Ngay cả khi bạn đang nhắm đến những người dùng chuyên nghiệp muốn có mọi thông tin có thể, bạn vẫn nên nhớ những lời khôn ngoan của Alan Cooper:

> Bất kể giao diện của bạn đẹp đến đâu, tuyệt vời đến đâu, sẽ tốt hơn nếu nó có ít chi tiết hơn.

### Cấu trúc {#structure}

- token ở bên trái, hoặc token ở bên phải
- 2 hàng hoặc 3 hàng
- chi tiết ở trên hoặc dưới nút bấm
- chi tiết được mở rộng, thu nhỏ hoặc không hiển thị

### Kiểu thành phần {#component-style}

- trống
- có viền
- được tô màu

Từ quan điểm UX thuần túy, kiểu dáng UI ít quan trọng hơn bạn nghĩ. Các xu hướng hình ảnh đến và đi theo chu kỳ, và rất nhiều sở thích mang tính chủ quan.

Cách dễ nhất để cảm nhận điều này - và suy nghĩ về các cấu hình khác nhau - là xem qua một số ví dụ và sau đó tự mình thử nghiệm.

Bộ công cụ Figma đi kèm chứa các thành phần trống, có viền và được tô màu.

Hãy xem các ví dụ dưới đây để thấy những cách khác nhau mà bạn có thể kết hợp tất cả lại với nhau:

![3 rows in a filled style](./7.png)

![3 rows in a outlined style](./8.png)

![2 rows in an empty style](./9.png)

![3 rows in an outlined style, with a details panel](./10.png)

![3 rows with the input row in an outlined style](./11.png)

![2 rows in a filled style](./12.png)

## Nhưng token nên nằm ở bên nào? {#but-which-side-should-the-token-go-on}

Điểm mấu chốt là nó có lẽ không tạo ra sự khác biệt lớn đối với khả năng sử dụng. Tuy nhiên, có một vài điều cần lưu ý, có thể khiến bạn nghiêng về hướng này hay hướng khác.

Khá thú vị khi thấy xu hướng thay đổi theo thời gian. Uniswap ban đầu để token ở bên trái, nhưng sau đó đã chuyển nó sang bên phải. Sushiswap cũng đã thực hiện thay đổi này trong một lần nâng cấp thiết kế. Hầu hết, nhưng không phải tất cả, các giao thức đều làm theo.

Quy ước tài chính theo truyền thống đặt ký hiệu tiền tệ trước con số, ví dụ: $50, €50, £50, nhưng chúng ta *nói* 50 đô la, 50 Euro, 50 bảng Anh.

Đối với người dùng thông thường - đặc biệt là những người đọc từ trái sang phải, từ trên xuống dưới - token ở bên phải có lẽ mang lại cảm giác tự nhiên hơn.

![A UI with tokens on the left](./13.png)

Việc đặt token ở bên trái và tất cả các con số ở bên phải trông đối xứng một cách dễ chịu, đó là một điểm cộng, nhưng có một nhược điểm khác đối với bố cục này.

Định luật về sự gần gũi (law of proximity) phát biểu rằng các mục ở gần nhau được nhận thức là có liên quan. Theo đó, chúng ta muốn đặt các mục liên quan cạnh nhau. Số dư token liên quan trực tiếp đến chính token đó và sẽ thay đổi bất cứ khi nào một token mới được chọn. Do đó, sẽ hợp lý hơn một chút nếu số dư token nằm cạnh nút chọn token. Nó có thể được di chuyển xuống dưới token, nhưng điều đó phá vỡ tính đối xứng của bố cục.

Cuối cùng, có những điểm cộng và điểm trừ cho cả hai tùy chọn, nhưng điều thú vị là xu hướng dường như đang nghiêng về việc đặt token ở bên phải.

## Hành vi của nút bấm {#button-behavior}

Đừng có một nút riêng cho Chấp thuận. Cũng đừng yêu cầu một lần nhấp riêng cho Chấp thuận. Người dùng muốn Hoán đổi, vì vậy chỉ cần ghi “hoán đổi” trên nút và bắt đầu việc chấp thuận như bước đầu tiên. Một modal có thể hiển thị tiến trình bằng một thanh bước (stepper), hoặc một thông báo đơn giản “giao dịch 1/2 - đang chấp thuận”.

![A UI with separate buttons for approve and swap](./14.png)

![A UI with one button that says approve](./15.png)

### Nút bấm như một trợ giúp theo ngữ cảnh {#button-as-contextual-help}

Nút bấm có thể thực hiện nhiệm vụ kép như một cảnh báo!

Đây thực sự là một mẫu thiết kế khá bất thường bên ngoài Web3, nhưng đã trở thành tiêu chuẩn bên trong nó. Đây là một sự đổi mới tốt vì nó tiết kiệm không gian và giữ sự tập trung.

Nếu hành động chính - HOÁN ĐỔI - không khả dụng do lỗi, lý do có thể được giải thích bằng nút bấm, ví dụ:

- chuyển đổi mạng lưới
- kết nối ví
- các lỗi khác nhau

Nút bấm cũng có thể được **gắn với hành động** cần thực hiện. Ví dụ: nếu người dùng không thể hoán đổi vì họ đang ở sai mạng lưới, nút bấm nên ghi “chuyển sang Ethereum” và khi người dùng nhấp vào nút, nó sẽ chuyển mạng lưới sang Ethereum. Điều này tăng tốc đáng kể luồng thao tác của người dùng.

![Key actions being initiated from the main CTA](./16.png)

![Error message shown within the main CTA](./17.png)

## Tự xây dựng với tệp Figma này {#build-your-own-with-this-figma-file}

Nhờ sự nỗ lực của nhiều giao thức, thiết kế DEX đã được cải thiện rất nhiều. Chúng ta biết người dùng cần thông tin gì, chúng ta nên hiển thị nó như thế nào và làm thế nào để luồng thao tác mượt mà nhất có thể.
Hy vọng bài viết này cung cấp một cái nhìn tổng quan vững chắc về các nguyên tắc UX. 

Nếu bạn muốn thử nghiệm, hãy thoải mái sử dụng bộ công cụ wireframe Figma. Nó được giữ ở mức đơn giản nhất có thể, nhưng có đủ sự linh hoạt để xây dựng cấu trúc cơ bản theo nhiều cách khác nhau.

[Bộ công cụ wireframe Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

Tài chính phi tập trung (DeFi) sẽ tiếp tục phát triển và luôn có không gian để cải thiện. 

Chúc may mắn!