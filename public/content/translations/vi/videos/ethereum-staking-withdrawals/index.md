---
title: "Việc rút tiền trên Ethereum hoạt động như thế nào?"
description: "Cách thức hoạt động của việc rút tiền đặt cọc trên Ethereum sau bản nâng cấp Thượng Hải/Capella, bao gồm quy trình kỹ thuật, hàng đợi rút tiền và những điều người đặt cọc cần biết về việc truy cập ETH đã đặt cọc của họ."
lang: vi
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "cách ethereum hoạt động"
  - "đặt cọc"
  - "rút tiền"
format: explainer
author: Finematics
breadcrumb: "Rút tiền đặt cọc"
---

Một video giải thích của **Finematics** bao gồm cách thức hoạt động của việc rút tiền đặt cọc trên Ethereum sau bản nâng cấp Thượng Hải/Capella, bao gồm cơ chế rút tiền một phần và toàn bộ, những hiểu lầm phổ biến và ý nghĩa đối với hệ sinh thái đặt cọc.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=RwwU3P9n3uo) được xuất bản bởi Finematics. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Chuỗi Beacon (0:31) {#the-beacon-chain-031}

Với bản nâng cấp Thượng Hải/Capella đang đến gần, có rất nhiều cuộc thảo luận về việc rút tiền đặt cọc trên Ethereum và ý nghĩa của điều này đối với toàn bộ hệ sinh thái Ethereum.

Hãy bắt đầu bằng việc tìm hiểu làm thế nào chúng ta đạt được điều này và tại sao việc rút tiền đặt cọc không được kích hoạt khi Ethereum chuyển từ Bằng chứng công việc (PoW) sang Bằng chứng cổ phần (PoS).

Quá trình chuyển đổi sang Bằng chứng cổ phần (PoS) đã diễn ra qua nhiều bước để giảm thiểu số lượng các thay đổi lớn xảy ra cùng một lúc. Cách tiếp cận này là cần thiết, đặc biệt đối với một mạng lưới đã được thiết lập, thanh toán hàng nghìn tỷ đô la giá trị mỗi năm. Các bước quan trọng nhất là: sự ra mắt của Chuỗi Beacon và The Merge.

Sự ra mắt của Chuỗi Beacon vào năm 2020 đã tạo nền tảng cho quá trình chuyển đổi bằng cách tạo ra một lớp đồng thuận Bằng chứng cổ phần (PoS) riêng biệt, chạy song song với Chuỗi Bằng chứng công việc (PoW) của Ethereum. Việc ra mắt Chuỗi Beacon sớm hơn cho phép tích lũy đủ ETH để bảo mật mạng lưới trước khi thanh toán các giao dịch có giá trị thực. Nó cũng cho phép thử nghiệm mô hình đồng thuận Bằng chứng cổ phần (PoS) mới trong một thời gian dài với các khoản tiền thực tế được đặt cọc.

Những người tham gia mạng lưới ban đầu đã cam kết hàng triệu ETH để bảo mật mạng lưới Bằng chứng cổ phần (PoS) của Ethereum mặc dù biết rằng họ sẽ không thể rút ETH của mình cho đến tận sau này.

Bước tiến lớn tiếp theo, The Merge, đã hợp nhất lớp đồng thuận Bằng chứng cổ phần (PoS) với lớp thực thi. Điều này cho phép cuối cùng từ bỏ Bằng chứng công việc (PoW) và chỉ duy trì một Chuỗi chính thức duy nhất — Ethereum — hiện được bảo mật bởi hàng triệu ETH đã đặt cọc. The Merge cho đến nay là thay đổi lớn nhất từng có đối với Ethereum. Do bản chất của bản nâng cấp, nó phải diễn ra mà không có bất kỳ thời gian ngừng hoạt động nào.

Để giảm thiểu rủi ro, phạm vi của The Merge đã được thu hẹp và không có tính năng nào khác — ngoài việc chuyển đổi từ Bằng chứng công việc (PoW) sang Bằng chứng cổ phần (PoS) — được đưa vào như một phần của bản nâng cấp. Sự "cắt giảm" lớn nhất phải thực hiện đã ảnh hưởng đến việc rút tiền, điều này đã trở thành trọng tâm của bản nâng cấp Thượng Hải/Capella sắp tới.

#### Rút tiền (2:09) {#withdrawals-209}

Việc rút tiền đặt cọc, đúng như tên gọi, sẽ cho phép những người đặt cọc rút số ETH đã bị khóa của họ. Có hai loại rút tiền: "một phần" và "toàn bộ".

Việc **rút tiền một phần** xảy ra khi trình xác thực rút các phần thưởng tích lũy của họ — số dư bổ sung vượt quá số dư hiệu quả tối đa là 32 ETH. Việc rút tiền một phần cũng có thể được gọi là "thanh toán phần thưởng" hoặc "thanh toán số dư vượt mức".

Việc **rút tiền toàn bộ** xảy ra khi trình xác thực đã hoàn tất quá trình thoát và toàn bộ số dư được rút. Điều này chỉ xảy ra khi trình xác thực thoát khỏi hệ thống một cách tự nguyện hoặc bị buộc phải loại bỏ trong một quá trình gọi là "phạt cắt giảm".

Sau khi được kích hoạt, việc rút tiền đặt cọc sẽ được tự động phân phối vài ngày một lần. Ngoài ra, quá trình rút tiền bắt đầu trên lớp đồng thuận, vì vậy không yêu cầu phí giao dịch ở bất kỳ bước nào.

Để bắt đầu rút phần thưởng đặt cọc của mình, một trình xác thực sẽ chỉ phải cung cấp địa chỉ rút tiền của họ một lần duy nhất. Do việc rút tiền ảnh hưởng đến cả lớp đồng thuận và lớp thực thi của Ethereum, cả hai phần của mạng lưới đều phải được cập nhật. "Thượng Hải" là tên của bản nâng cấp lớp thực thi chứa tính năng rút tiền, được chỉ định trong EIP-4895. "Capella" là tên của bản nâng cấp lớp đồng thuận tương ứng, được kích hoạt cùng lúc. Hai bản nâng cấp này đôi khi cũng được gọi chung là "Shapella".

#### Cơ chế (3:40) {#mechanics-340}

Trong hệ sinh thái Ethereum, mỗi trình xác thực có một số chỉ số tương ứng. Ngoài ra, họ cũng có hai loại thông tin xác thực rút tiền, được xác định là `0x00` hoặc `0x01`.

`0x00` chỉ ra rằng một trình xác thực cụ thể không có địa chỉ rút tiền liên kết. Các thông tin xác thực này được bắt nguồn từ mã băm của khóa công khai BLS với byte đầu tiên của nó được hoán đổi bằng một byte 0 — do đó có tên gọi này.

`0x01` có nghĩa là một trình xác thực đã cung cấp địa chỉ rút tiền của họ. Các thông tin xác thực rút tiền này được biểu diễn dưới dạng `0x01` theo sau là 11 byte 0, sau đó là một địa chỉ Ethereum đã chọn.

Để kích hoạt việc rút tiền, các trình xác thực có thông tin xác thực `0x00` sẽ cần ký một thông điệp "BLSToExecutionChange". Điều này sẽ có thể thực hiện được sau bản nâng cấp Capella.

Sau khi việc rút tiền được kích hoạt, một trình xác thực đề xuất một khối sẽ quét tuyến tính qua các chỉ số trình xác thực để tìm 16 trình xác thực đầu tiên có thông tin xác thực `0x01` mà:

- Có số dư vượt quá 32 ETH (phần thưởng trình xác thực đã tích lũy)
- Có thể "rút được" (đã hoàn toàn thoát khỏi tập hợp trình xác thực)

Quá trình tìm kiếm tuyến tính dừng lại sau khi tìm thấy 16 trình xác thực khớp với các tiêu chí này hoặc sau 16.384 lần lặp. Thuật toán ghi nhớ chỉ số mà tại đó quá trình tìm kiếm dừng lại, để trình xác thực tiếp theo đề xuất một khối có thể tiếp tục từ chỉ số đó. Sau khi đi đến chỉ số cuối cùng, thuật toán bắt đầu lại từ đầu — chỉ số 0.

Một sự so sánh tương đồng tốt sẽ là một chiếc đồng hồ kim nơi kim chỉ giờ, tiến lên theo một hướng, không bỏ qua bất kỳ giờ nào và cuối cùng quay vòng lại từ đầu sau khi đạt đến số cuối cùng.

Sau khi quá trình quét hoàn tất, trình xác thực tạo một danh sách các khoản rút tiền để đưa vào tải trọng thực thi của họ. Mỗi mục trong danh sách chứa:

- **WithdrawalIndex** — một chỉ số tăng đơn điệu, bắt đầu từ 0, tăng thêm 1 cho mỗi lần rút tiền để nhận dạng duy nhất từng khoản rút tiền
- **ValidatorIndex** — chỉ số của trình xác thực có số dư đang được rút
- **ExecutionAddress** — địa chỉ ETH trên lớp thực thi nơi khoản rút tiền sẽ được gửi đến
- **Amount** — số tiền, tính bằng Gwei, sẽ được gửi đến địa chỉ thực thi

Khi xây dựng hoặc xử lý một khối, các máy khách lớp thực thi áp dụng các khoản rút tiền này ở cuối một khối. Việc xử lý rút tiền không cạnh tranh không gian khối với các giao dịch của người dùng. Với tối đa 16 khoản rút tiền được xử lý mỗi khối, sẽ có tối đa 115.200 khoản rút tiền được xử lý mỗi ngày, giả sử không có slot nào bị bỏ lỡ.

Thiết kế của việc rút tiền rất đơn giản nhưng cực kỳ mạnh mẽ.

#### Những hiểu lầm (6:30) {#misconceptions-630}

Hiểu lầm đầu tiên cho rằng khi xử lý rút tiền, có sự khác biệt giữa rút tiền "toàn bộ" và "một phần" về mức độ ưu tiên hoặc thứ tự. Cả việc rút tiền toàn bộ và một phần đều xảy ra khi quá trình quét tuyến tính qua tập hợp trình xác thực đạt đến chỉ số của một trình xác thực. Điểm khác biệt duy nhất là trong trường hợp rút tiền toàn bộ, một trình xác thực phải rời khỏi hàng đợi thoát và đạt đến "Kỷ nguyên có thể rút" trước khi quá trình quét tuyến tính có thể chọn nó.

Một hiểu lầm khác là người dùng sẽ mất phần thưởng nếu họ không cung cấp địa chỉ rút tiền. Điều này không đúng — trong trường hợp một trình xác thực quên cung cấp địa chỉ rút tiền, phần thưởng ETH của họ sẽ không bị gửi vào hư vô sau khi việc rút tiền được kích hoạt. Thay vào đó, quá trình quét sẽ bỏ qua các trình xác thực chưa cung cấp địa chỉ rút tiền của họ.

Điều quan trọng cần nhớ là địa chỉ rút tiền không thể thay đổi và chỉ được thiết lập một lần. Những người đặt cọc phải cực kỳ cẩn thận khi thiết lập địa chỉ rút tiền, đảm bảo họ có toàn quyền sở hữu đối với địa chỉ được cung cấp.

Cũng có suy đoán rằng những người đặt cọc sẽ rút rất nhiều ETH khỏi hệ sinh thái Ethereum sau khi việc rút tiền được kích hoạt, với phiên bản mạnh mẽ hơn của lập luận này cho rằng nó sẽ làm mất ổn định cơ chế đồng thuận Bằng chứng cổ phần (PoS). Mặc dù chúng ta không thể dự đoán đầy đủ lượng ETH sẽ được rút theo thời gian, nhưng có một vài phản biện quan trọng:

Thứ nhất, hầu hết những người đặt cọc là những người chấp nhận Ethereum từ sớm, những người đã đủ dũng cảm để đặt cọc khi vẫn chưa chắc chắn khi nào việc rút tiền sẽ được kích hoạt. Nhiều người đặt cọc đã bày tỏ mong muốn tiếp tục đặt cọc để hỗ trợ mạng lưới và tiếp tục kiếm phần thưởng bằng ETH.

Thứ hai, để đảm bảo rằng cơ chế đồng thuận Bằng chứng cổ phần (PoS) và tập hợp các trình xác thực đang hoạt động vẫn ổn định, Ethereum đã triển khai một hàng đợi rút tiền cho tất cả các trình xác thực muốn thoát. Hàng đợi này giới hạn số lượng trình xác thực có thể rời khỏi hệ sinh thái cùng một lúc.

Lần quét rút tiền đầu tiên sẽ rút rất nhiều phần thưởng đã tích lũy — về cơ bản là kể từ khi Chuỗi Beacon ra đời. Tuy nhiên, những lần quét tiếp theo sẽ xử lý một lượng ETH nhỏ hơn nhiều.

#### Ý nghĩa (8:39) {#implications-839}

Việc kích hoạt rút tiền sẽ tạo ra một luồng đặt cọc hai chiều, cởi mở. Hiện tại, luồng đặt cọc chỉ có một chiều — ETH chỉ có thể chảy vào mạng lưới và không bao giờ thoát ra. Thú vị là, việc kích hoạt rút tiền có thể khuyến khích nhiều người hơn nữa tham gia đặt cọc, vì họ sẽ biết rằng họ luôn có thể rút ETH của mình nếu cần cho việc khác.

Những người đặt cọc không tự chạy trình xác thực của riêng mình và đặt cọc thông qua một nhà cung cấp dịch vụ đặt cọc tập trung sẽ có thể đổi sang một nhà cung cấp khác. Họ có thể rút tiền từ một nhà cung cấp đưa ra tỷ lệ đặt cọc thấp hơn sang một nhà cung cấp đưa ra tỷ lệ tốt hơn, chuyển từ một nhà cung cấp tập trung sang một nhà cung cấp phi tập trung, hoặc thậm chí tự chạy trình xác thực của riêng mình.

Việc rút tiền cũng sẽ tác động đến các công cụ phái sinh đặt cọc thanh khoản như Lido, Rocket Pool và những công cụ khác. Các token staking thanh khoản (LST) như stETH hoặc rETH đã từng có tiền sử tạm thời mất neo giá so với giá của ETH trong thời kỳ thị trường biến động. Tuy nhiên, với luồng đặt cọc hai chiều, bất kỳ sự chênh lệch đáng kể nào trong việc neo giá của chúng sẽ nhanh chóng bị loại bỏ thông qua kinh doanh chênh lệch giá (arbitrage).

Những người tiên phong trong lĩnh vực đặt cọc thanh khoản và đặt cọc tập trung đã chiếm được phần lớn thị trường vì họ không có nhiều sự cạnh tranh. Tuy nhiên, thị phần của những người chơi hiện tại này có thể chứng kiến một sự thay đổi lớn sau khi việc rút tiền được kích hoạt, đặc biệt nếu họ không đưa ra một tỷ lệ cạnh tranh. Khả năng chuyển đổi tự do giữa các nhà cung cấp dịch vụ đặt cọc sẽ mang lại lợi ích cho thị trường đặt cọc ETH.

#### Tóm tắt (10:01) {#summary-1001}

Việc kích hoạt rút tiền đặt cọc là một trong những bản nâng cấp được mong đợi nhất đối với Ethereum. Sẽ cực kỳ quan trọng để đảm bảo sự thay đổi này được thực hiện một cách suôn sẻ. Để hỗ trợ việc thử nghiệm, các trình xác thực sẽ có sẵn một số devnet và testnet để chạy qua quy trình và giải quyết bất kỳ vấn đề tiềm ẩn nào trước khi chính thức hoạt động trên Mạng chính.

Việc rút tiền là một cải tiến khác đưa Ethereum tiến thêm một bước nữa tới việc xây dựng một tương lai bền vững, an toàn và phi tập trung. Bản nâng cấp Shapella dự kiến sẽ diễn ra vào nửa đầu năm 2023.

Tại thời điểm của video này, Chuỗi Beacon đã tích lũy được hơn 17 triệu ETH trên hơn 530.000 trình xác thực. Số dư trung bình cho một trình xác thực chỉ ở mức trên 34 ETH, điều đó có nghĩa là có hơn 1 triệu ETH trong các phần thưởng đã tích lũy. Sẽ rất thú vị để xem việc rút tiền sẽ ảnh hưởng như thế nào đến những con số này.