---
title: Glamsterdam
description: "Tìm hiểu về bản nâng cấp giao thức Glamsterdam"
lang: vi
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam là bản nâng cấp Ethereum sắp tới được lên kế hoạch cho nửa đầu năm 2026
</AlertTitle>
<AlertDescription>
Bản nâng cấp Glamsterdam chỉ là một bước duy nhất trong các mục tiêu phát triển dài hạn của Ethereum. Tìm hiểu thêm về [lộ trình giao thức](/roadmap/) và [các bản nâng cấp trước đây](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

[Bản nâng cấp Glamsterdam sắp tới của Ethereum](/) được thiết kế để dọn đường cho thế hệ mở rộng tiếp theo. Glamsterdam được đặt tên từ sự kết hợp của "Amsterdam" (bản nâng cấp lớp thực thi, được đặt theo tên một địa điểm Devconnect trước đây) và "Gloas" (bản nâng cấp lớp đồng thuận, được đặt theo tên một ngôi sao).

Tiếp nối tiến trình đã đạt được trong bản nâng cấp [Fusaka](/roadmap/fusaka/), Glamsterdam tập trung vào việc mở rộng L1 bằng cách tổ chức lại cách mạng lưới xử lý các giao dịch và quản lý cơ sở dữ liệu ngày càng tăng của nó, cập nhật một cách cơ bản cách Ethereum tạo và xác minh các khối.

Trong khi Fusaka tập trung vào các cải tiến nền tảng, Glamsterdam thúc đẩy các mục tiêu "Mở rộng L1" và "Mở rộng Blob" bằng cách quy định sự tách biệt nhiệm vụ giữa những người tham gia mạng lưới khác nhau, và giới thiệu các cách xử lý dữ liệu hiệu quả hơn để chuẩn bị [trạng thái](/glossary/#state) cho việc song song hóa thông lượng cao.

Những cải tiến này đảm bảo Ethereum vẫn nhanh, giá cả phải chăng và phi tập trung khi xử lý nhiều hoạt động hơn, đồng thời giữ cho các yêu cầu phần cứng ở mức có thể quản lý được đối với những người chạy [các nút](/glossary/#node) tại nhà.

<YouTube id="GgKveVMLnoo" />

## Những cải tiến được xem xét cho Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Lưu ý: Bài viết này hiện đang nêu bật một số EIP được xem xét đưa vào Glamsterdam. Để biết các cập nhật trạng thái mới nhất, hãy xem [bản nâng cấp Glamsterdam trên Forkcast](https://forkcast.org/upgrade/glamsterdam).

Nếu bạn muốn thêm một EIP đang được xem xét cho Glamsterdam nhưng chưa được thêm vào trang này, hãy [tìm hiểu cách đóng góp cho ethereum.org tại đây](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Bản nâng cấp Glamsterdam tập trung vào ba mục tiêu chính:

- Tăng tốc độ xử lý (song song hóa): Tổ chức lại cách mạng lưới ghi lại sự phụ thuộc dữ liệu, để nó có thể xử lý an toàn nhiều giao dịch cùng một lúc thay vì theo trình tự chậm, từng cái một.
- Mở rộng dung lượng: Phân chia công việc nặng nhọc của việc tạo và xác minh các khối, giúp mạng lưới có nhiều thời gian hơn để truyền bá lượng dữ liệu lớn hơn mà không bị chậm lại.
- Ngăn chặn sự phình to của cơ sở dữ liệu (tính bền vững): Điều chỉnh phí mạng lưới để phản ánh chính xác chi phí phần cứng dài hạn của việc lưu trữ dữ liệu mới, mở đường cho việc tăng giới hạn ga trong tương lai đồng thời ngăn chặn sự suy giảm hiệu suất phần cứng.

Tóm lại, Glamsterdam sẽ giới thiệu những thay đổi cấu trúc để đảm bảo rằng khi mạng lưới tăng dung lượng, nó vẫn bền vững và hiệu suất vẫn cao.

## Mở rộng L1 & xử lý song song {#scale-l1}

Việc mở rộng L1 một cách có ý nghĩa đòi hỏi phải loại bỏ các giả định tin cậy ngoài giao thức và các ràng buộc thực thi tuần tự. Glamsterdam giải quyết vấn đề này bằng cách quy định việc tách biệt một số nhiệm vụ xây dựng khối và giới thiệu các cấu trúc dữ liệu mới cho phép mạng lưới chuẩn bị cho việc xử lý song song.

### Đề xuất nổi bật: Tách biệt Người đề xuất-Người xây dựng được quy định (ePBS) {#epbs}

- Loại bỏ các giả định tin cậy ngoài giao thức và sự phụ thuộc vào các relay của bên thứ ba
- Hỗ trợ mở rộng L1 bằng cách cho phép các tải trọng lớn hơn nhiều thông qua các cửa sổ truyền bá mở rộng
- Giới thiệu các khoản thanh toán cho người xây dựng không cần tin cậy trực tiếp vào giao thức

Hiện tại, quy trình đề xuất và xây dựng các khối bao gồm việc chuyển giao giữa những người đề xuất khối và những người xây dựng khối. Mối quan hệ giữa những người đề xuất và những người xây dựng không phải là một phần của giao thức cốt lõi của Ethereum, vì vậy nó phụ thuộc vào phần mềm trung gian của bên thứ ba được tin cậy, phần mềm (relay) và sự tin cậy ngoài giao thức giữa các thực thể.

Mối quan hệ ngoài giao thức giữa những người đề xuất và những người xây dựng cũng tạo ra một "lối đi nóng" trong quá trình xác thực khối, buộc [các trình xác thực](/glossary/#validator) phải gấp rút thực hiện việc phát sóng và thực thi giao dịch trong một cửa sổ 2 giây chặt chẽ, hạn chế lượng dữ liệu mà mạng lưới có thể xử lý.

**Tách biệt Người đề xuất-Người xây dựng được quy định (ePBS, hoặc EIP-7732)** chính thức tách biệt công việc của người đề xuất (người chọn khối đồng thuận) khỏi người xây dựng (người lắp ráp tải trọng thực thi), quy định việc chuyển giao này trực tiếp vào giao thức.

Việc xây dựng trao đổi không cần tin cậy của một tải trọng khối để thanh toán trực tiếp vào giao thức sẽ loại bỏ nhu cầu về phần mềm trung gian của bên thứ ba (như MEV-Boost). Tuy nhiên, những người xây dựng và đề xuất vẫn có thể chọn sử dụng các relay hoặc phần mềm trung gian ngoài giao thức cho các tính năng phức tạp chưa phải là một phần của giao thức cốt lõi.

Để giải quyết nút thắt cổ chai "lối đi nóng", ePBS cũng giới thiệu Ủy ban Kịp thời Tải trọng (PTC) và logic thời hạn kép, cho phép các trình xác thực chứng thực khối đồng thuận và tính kịp thời của tải trọng thực thi một cách riêng biệt để tối đa hóa thông lượng.

<YouTube id="u8XvkTrjITs" />

Việc tách biệt vai trò của người đề xuất và người xây dựng ở cấp độ giao thức sẽ mở rộng cửa sổ truyền bá (hoặc thời gian có sẵn để truyền dữ liệu trên mạng lưới) từ 2 giây lên khoảng 9 giây.

Bằng cách thay thế phần mềm trung gian và relay ngoài giao thức bằng các cơ chế trong giao thức, ePBS giảm sự phụ thuộc vào niềm tin và cho phép Ethereum xử lý an toàn lượng dữ liệu lớn hơn nhiều (như nhiều blob hơn cho [các lớp 2](/glossary/#layer-2)) mà không gây căng thẳng cho mạng lưới.

**Tài nguyên**: [Thông số kỹ thuật EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Đề xuất nổi bật: Danh sách Truy cập Cấp Khối (BALs) {#bals}

- Loại bỏ các nút thắt cổ chai xử lý tuần tự bằng cách cung cấp một bản đồ ban đầu về tất cả các phụ thuộc giao dịch, tạo tiền đề cho các trình xác thực xử lý nhiều giao dịch song song thay vì từng cái một
- Cho phép các nút cập nhật hồ sơ của họ bằng cách đọc kết quả cuối cùng mà không cần phải phát lại mọi giao dịch (đồng bộ hóa không cần thực thi), giúp việc đồng bộ hóa một nút với mạng lưới nhanh hơn nhiều
- Loại bỏ việc phỏng đoán, cho phép các trình xác thực tải trước tất cả dữ liệu cần thiết cùng một lúc thay vì khám phá từng bước, điều này giúp việc xác thực nhanh hơn nhiều

Ethereum ngày nay giống như một con đường một làn; bởi vì mạng lưới không biết dữ liệu nào một giao dịch sẽ cần hoặc thay đổi (chẳng hạn như tài khoản nào một giao dịch sẽ tác động đến) cho đến khi giao dịch được chạy, các trình xác thực phải xử lý các giao dịch lần lượt theo một hàng tuần tự nghiêm ngặt. Nếu họ cố gắng xử lý tất cả các giao dịch cùng một lúc mà không biết những phụ thuộc này, hai giao dịch có thể vô tình cố gắng thay đổi cùng một dữ liệu chính xác vào cùng một thời điểm, gây ra lỗi.

**Danh sách Truy cập Cấp Khối (BALs, hoặc EIP-7928)** giống như một bản đồ được bao gồm trong mỗi khối, cho mạng lưới biết phần nào của cơ sở dữ liệu sẽ được truy cập trước khi công việc bắt đầu. BALs yêu cầu mỗi khối phải bao gồm hàm băm của mọi thay đổi tài khoản mà các giao dịch sẽ tác động đến, cùng với kết quả cuối cùng của những thay đổi đó (bản ghi hàm băm của tất cả các lần truy cập trạng thái và các giá trị sau thực thi).

Bởi vì chúng cung cấp khả năng hiển thị ngay lập tức về các giao dịch không chồng chéo, BALs cho phép các nút thực hiện đọc đĩa song song, tìm nạp thông tin cho nhiều giao dịch đồng thời. Mạng lưới có thể nhóm các giao dịch không liên quan một cách an toàn và xử lý chúng song song.

Bởi vì BAL bao gồm kết quả cuối cùng của các giao dịch (các giá trị sau thực thi), khi các nút của mạng lưới cần đồng bộ hóa với trạng thái hiện tại của mạng lưới, chúng có thể sao chép những kết quả cuối cùng đó để cập nhật hồ sơ của mình. Các trình xác thực không còn phải phát lại tất cả các giao dịch phức tạp từ đầu để biết chuyện gì đã xảy ra, giúp các nút mới tham gia mạng lưới nhanh hơn và dễ dàng hơn.

Việc đọc đĩa song song được kích hoạt bởi BALs sẽ là một bước tiến đáng kể hướng tới một tương lai nơi Ethereum có thể xử lý nhiều giao dịch cùng một lúc, tăng đáng kể tốc độ của mạng lưới.

#### Trao đổi danh sách truy cập khối eth/71 {#bale}

Trao đổi Danh sách Truy cập Khối (eth/71 hoặc EIP-8159) là bạn đồng hành mạng lưới trực tiếp của danh sách truy cập cấp khối. Trong khi BALs mở khóa thực thi song song, eth/71 nâng cấp giao thức ngang hàng để cho phép các nút thực sự chia sẻ các danh sách này trên mạng lưới. Việc triển khai trao đổi danh sách truy cập khối sẽ cho phép đồng bộ hóa nhanh hơn và cho phép các nút thực hiện cập nhật trạng thái không cần thực thi.

**Tài nguyên**:

- [Thông số kỹ thuật EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Thông số kỹ thuật EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Tính bền vững của mạng lưới {#network-sustainability}

Khi mạng lưới Ethereum phát triển nhanh hơn, điều quan trọng là phải đảm bảo rằng chi phí sử dụng nó tương xứng với sự hao mòn của phần cứng chạy Ethereum. Mạng lưới cần tăng giới hạn dung lượng tổng thể để mở rộng an toàn và xử lý nhiều giao dịch hơn.

### Tăng chi phí ga tạo trạng thái {#state-creation-gas-cost-increase}

- Đảm bảo rằng các khoản phí để tạo tài khoản mới hoặc hợp đồng thông minh phản ánh chính xác gánh nặng dài hạn mà chúng đặt lên cơ sở dữ liệu của Ethereum
- Tự động điều chỉnh các khoản phí tạo dữ liệu này dựa trên dung lượng tổng thể của mạng lưới, nhắm đến tốc độ tăng trưởng an toàn và có thể dự đoán được để phần cứng vật lý tiêu chuẩn có thể tiếp tục chạy mạng lưới
- Tách biệt việc hạch toán các khoản phí cụ thể này vào một kho chứa mới, loại bỏ các giới hạn giao dịch cũ và cho phép các nhà phát triển triển khai các ứng dụng lớn hơn, phức tạp hơn

Việc thêm tài khoản, token và [hợp đồng thông minh](/glossary/#smart-contract) mới sẽ tạo ra dữ liệu vĩnh viễn (được gọi là "trạng thái") mà mọi máy tính chạy mạng lưới phải lưu trữ vô thời hạn. Các khoản phí hiện tại để thêm hoặc đọc dữ liệu này không nhất quán và không nhất thiết phản ánh gánh nặng lưu trữ thực tế, dài hạn mà chúng đặt lên phần cứng của mạng lưới.

Một số hành động tạo trạng thái trên Ethereum, như tạo tài khoản mới hoặc triển khai hợp đồng thông minh lớn, có chi phí tương đối thấp so với không gian lưu trữ vĩnh viễn mà chúng chiếm trên các nút của mạng lưới, ví dụ, việc triển khai hợp đồng rẻ hơn đáng kể trên mỗi byte so với việc tạo các khe lưu trữ.

Nếu không có sự điều chỉnh, trạng thái của Ethereum có thể tăng gần 200 GiB mỗi năm nếu mạng lưới mở rộng đến giới hạn ga 100 triệu, cuối cùng sẽ vượt qua phần cứng thông thường.

**Tăng chi phí ga tạo trạng thái (hoặc EIP-8037)** hài hòa hóa chi phí bằng cách gắn chúng với kích thước thực tế của dữ liệu được tạo ra, cập nhật các khoản phí để chúng tỷ lệ thuận với lượng dữ liệu vĩnh viễn mà một hoạt động tạo ra hoặc truy cập.

EIP-8037 cũng giới thiệu một mô hình kho chứa để quản lý các chi phí này một cách dễ dự đoán hơn; phí ga trạng thái được lấy từ `state_gas_reservoir` trước tiên, và mã vận hành `GAS` chỉ trả về `gas_left`, ngăn các khung thực thi tính toán sai lượng ga có sẵn.

Trước EIP-8037, cả công việc tính toán (xử lý tích cực) và lưu trữ dữ liệu vĩnh viễn (lưu hợp đồng thông minh vào cơ sở dữ liệu của mạng lưới) đều chia sẻ cùng một giới hạn ga. Mô hình kho chứa chia nhỏ việc hạch toán: giới hạn ga cho công việc tính toán thực tế của giao dịch (xử lý) và cho việc lưu trữ dữ liệu dài hạn (ga trạng thái). Việc tách biệt hai yếu tố này giúp ngăn chặn kích thước tuyệt đối của dữ liệu ứng dụng làm cạn kiệt giới hạn ga; miễn là các nhà phát triển cung cấp đủ tiền để lấp đầy kho chứa cho việc lưu trữ dữ liệu, họ có thể triển khai các hợp đồng thông minh lớn hơn và phức tạp hơn nhiều.

Việc định giá lưu trữ dữ liệu chính xác và dễ dự đoán hơn sẽ giúp Ethereum tăng tốc độ và dung lượng một cách an toàn mà không làm phình to cơ sở dữ liệu. Tính bền vững này sẽ cho phép các nhà khai thác nút tiếp tục sử dụng phần cứng (tương đối) giá cả phải chăng trong nhiều năm tới, giữ cho việc ký gửi tại nhà có thể tiếp cận được để duy trì tính phi tập trung của mạng lưới.

**Tài nguyên**: [Thông số kỹ thuật EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Cập nhật chi phí ga truy cập trạng thái {#state-access-gas-cost-update}

- Tăng chi phí ga khi các ứng dụng đọc hoặc cập nhật thông tin được lưu trữ vĩnh viễn trên Ethereum (mã vận hành truy cập trạng thái) để khớp chính xác với công việc tính toán mà các lệnh này yêu cầu
- Tăng cường khả năng phục hồi của mạng lưới bằng cách ngăn chặn các cuộc tấn công từ chối dịch vụ khai thác các hoạt động đọc dữ liệu rẻ một cách giả tạo

Khi trạng thái của Ethereum đã phát triển, hành động tìm kiếm và đọc dữ liệu cũ ("truy cập trạng thái") đã trở nên nặng nề và chậm hơn đối với các nút để xử lý. Phí cho các hành động này vẫn giữ nguyên mặc dù việc tra cứu thông tin hiện đã tốn kém hơn một chút (xét về sức mạnh tính toán).

Kết quả là, một số lệnh cụ thể hiện đang được định giá thấp so với công việc mà chúng buộc một nút phải thực hiện. `EXTCODESIZE` và `EXTCODECOPY` bị định giá thấp, ví dụ, vì chúng yêu cầu hai lần đọc cơ sở dữ liệu riêng biệt—một cho đối tượng tài khoản, và lần thứ hai cho kích thước mã thực tế hoặc mã byte.

**Cập nhật chi phí ga truy cập trạng thái (hoặc EIP-8038)** tăng hằng số ga cho các mã vận hành truy cập trạng thái, như tra cứu dữ liệu tài khoản và hợp đồng, để phù hợp với hiệu suất phần cứng hiện đại và kích thước trạng thái.

Việc điều chỉnh chi phí truy cập trạng thái cũng giúp Ethereum trở nên linh hoạt hơn. Bởi vì các hành động đọc dữ liệu nặng nề này rẻ một cách giả tạo, một kẻ tấn công độc hại có thể spam mạng lưới với hàng nghìn yêu cầu dữ liệu phức tạp trong một khối duy nhất trước khi đạt đến giới hạn phí của mạng lưới, có khả năng gây ra tình trạng mạng lưới bị đình trệ hoặc sập (một cuộc tấn công từ chối dịch vụ). Ngay cả khi không có ý định xấu, các nhà phát triển cũng không được khuyến khích về mặt kinh tế để xây dựng các ứng dụng hiệu quả nếu việc đọc dữ liệu mạng lưới quá rẻ.

Bằng cách định giá các hành động truy cập trạng thái một cách chính xác hơn, Ethereum có thể linh hoạt hơn trước các sự chậm trễ vô tình hoặc cố ý, trong khi việc điều chỉnh chi phí mạng lưới với tải trọng phần cứng chứng tỏ một nền tảng bền vững hơn cho việc tăng giới hạn ga trong tương lai.

**Tài nguyên**: [Thông số kỹ thuật EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Sự chống chịu của mạng lưới

Việc tinh chỉnh nhiệm vụ của trình xác thực và quy trình thoát đảm bảo sự ổn định của mạng lưới trong các sự kiện slashing hàng loạt và dân chủ hóa thanh khoản. Những cải tiến này giúp mạng lưới ổn định hơn và đảm bảo rằng tất cả những người tham gia, dù lớn hay nhỏ, đều được đối xử công bằng.

### Loại trừ các trình xác thực bị slashing khỏi việc đề xuất {#exclude-slashed-validators}

- Ngăn chặn các trình xác thực bị phạt (slashed) được chọn để đề xuất các khối trong tương lai, loại bỏ các khe bị bỏ lỡ được đảm bảo
- Giữ cho Ethereum hoạt động trơn tru và đáng tin cậy, ngăn chặn các tình trạng đình trệ nghiêm trọng trong trường hợp xảy ra sự kiện slashing hàng loạt

Hiện tại, ngay cả khi một trình xác thực bị slashing (bị phạt vì vi phạm quy tắc hoặc không hoạt động như mong đợi), hệ thống vẫn có thể chọn họ để dẫn dắt một khối trong tương lai gần khi nó tạo ra các dự đoán người đề xuất trong tương lai.

Bởi vì các khối từ những người đề xuất bị slashing sẽ tự động bị từ chối là không hợp lệ, điều này khiến mạng lưới bỏ lỡ các khe và làm chậm quá trình phục hồi mạng lưới trong các sự kiện slashing hàng loạt.

**Loại trừ các trình xác thực bị slashing khỏi việc đề xuất (hoặc EIP-8045)** chỉ đơn giản là lọc ra các trình xác thực bị slashing khỏi việc được chọn cho các nhiệm vụ trong tương lai. Điều này cải thiện khả năng phục hồi của chuỗi bằng cách đảm bảo chỉ những trình xác thực khỏe mạnh mới được chọn để đề xuất các khối, duy trì chất lượng dịch vụ trong thời gian gián đoạn mạng lưới.

**Tài nguyên**: [Thông số kỹ thuật EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Để các lối thoát sử dụng hàng đợi hợp nhất {#let-exits-use-the-consolidation-queue}

- Đóng một lỗ hổng cho phép các trình xác thực có số dư cao thoát khỏi mạng lưới nhanh hơn các trình xác thực nhỏ hơn thông qua hàng đợi hợp nhất
- Cho phép các lối thoát thông thường tràn vào hàng đợi thứ hai này khi nó có dung lượng trống, giảm thời gian rút tiền ký gửi trong các giai đoạn khối lượng lớn
- Duy trì an ninh nghiêm ngặt để tránh thay đổi các giới hạn an toàn cốt lõi của Ethereum hoặc làm suy yếu mạng lưới

Kể từ khi [bản nâng cấp Pectra](/roadmap/pectra) tăng số dư hiệu dụng tối đa cho các trình xác thực Ethereum từ 32 ETH lên 2.048 ETH, một lỗ hổng kỹ thuật cho phép các trình xác thực có số dư cao thoát khỏi mạng lưới nhanh hơn các trình xác thực nhỏ hơn thông qua hàng đợi hợp nhất.

**Để các lối thoát sử dụng hàng đợi hợp nhất (hoặc EIP-8080)** dân chủ hóa hàng đợi hợp nhất cho tất cả các lối thoát ký gửi, tạo ra một hàng đợi duy nhất, công bằng cho tất cả mọi người.

Để phân tích cách hoạt động của nó ngày hôm nay:

- Giới hạn biến động của Ethereum là một giới hạn an toàn về tốc độ mà các trình xác thực có thể tham gia, thoát hoặc hợp nhất (hợp nhất) ETH đã đặt cọc của họ, để đảm bảo an ninh của mạng lưới không bao giờ bị mất ổn định
- Bởi vì việc hợp nhất trình xác thực là một hành động nặng hơn với nhiều bộ phận chuyển động hơn so với một lối thoát trình xác thực tiêu chuẩn, nó chiếm một phần lớn hơn trong ngân sách an toàn này (giới hạn biến động)
- Cụ thể, giao thức quy định rằng chi phí an ninh chính xác của một lối thoát tiêu chuẩn là hai phần ba (2/3) chi phí của một lần hợp nhất

Hàng đợi thoát công bằng hơn sẽ cho phép các lối thoát tiêu chuẩn mượn không gian chưa sử dụng từ hàng đợi hợp nhất trong các giai đoạn có nhu cầu thoát cao, áp dụng tỷ giá trao đổi "3 đổi 2" (cứ 2 vị trí hợp nhất chưa sử dụng, mạng lưới có thể xử lý an toàn 3 lối thoát tiêu chuẩn). Hệ số biến động 3/2 này cân bằng nhu cầu giữa hàng đợi hợp nhất và hàng đợi thoát.

Việc dân chủ hóa quyền truy cập vào hàng đợi hợp nhất sẽ tăng tốc độ người dùng có thể thoát khỏi khoản đặt cọc của họ trong các giai đoạn có nhu cầu cao lên đến 2,5 lần, mà không ảnh hưởng đến an ninh mạng lưới.

**Tài nguyên**: [Thông số kỹ thuật EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Cải thiện trải nghiệm người dùng & nhà phát triển {#improve-user-developer-experience}

Bản nâng cấp Glamsterdam của Ethereum nhằm mục đích cải thiện trải nghiệm người dùng, tăng cường khả năng khám phá dữ liệu và xử lý kích thước thông điệp ngày càng tăng để ngăn chặn lỗi đồng bộ hóa. Điều này giúp việc theo dõi những gì đang xảy ra trên chuỗi dễ dàng hơn đồng thời ngăn chặn các sự cố kỹ thuật khi mạng lưới mở rộng.

### Giảm chi phí ga giao dịch nội tại {#reduce-intrinsic-transaction-gas-costs}

- Giảm phí cơ bản cho các giao dịch, giảm tổng chi phí của một thanh toán ETH gốc đơn giản
- Làm cho các khoản chuyển tiền nhỏ hơn có giá cả phải chăng hơn, tăng cường khả năng tồn tại của Ethereum như một phương tiện trao đổi thông thường

Tất cả các giao dịch Ethereum ngày nay đều có một khoản phí ga cơ bản cố định, bất kể việc xử lý nó đơn giản hay phức tạp. **Giảm ga giao dịch nội tại (hoặc EIP-2780)** đề xuất giảm phí cơ bản đó để làm cho một lần chuyển ETH tiêu chuẩn giữa các tài khoản hiện có rẻ hơn tới **71%**.

Giảm ga giao dịch nội tại hoạt động bằng cách chia nhỏ phí giao dịch để chỉ phản ánh công việc cơ bản, thiết yếu mà các máy tính chạy mạng lưới thực sự làm, như xác minh chữ ký số và cập nhật số dư. Bởi vì một thanh toán ETH cơ bản không thực thi mã phức tạp hoặc mang theo dữ liệu bổ sung, đề xuất này sẽ giảm phí của nó để phù hợp với dấu chân nhẹ của nó.

Đề xuất này đưa ra một ngoại lệ cho việc tạo các tài khoản hoàn toàn mới để giữ cho phí thấp hơn không làm quá tải trạng thái của mạng lưới. Nếu một lần chuyển tiền gửi ETH đến một địa chỉ trống, không tồn tại, mạng lưới phải tạo một bản ghi mới vĩnh viễn cho nó. Một khoản phụ phí ga được thêm vào cho việc tạo tài khoản đó để giúp trang trải gánh nặng lưu trữ dài hạn của nó.

Cùng nhau, EIP-2780 nhằm mục đích làm cho các giao dịch hàng ngày giữa các tài khoản hiện có trở nên hợp lý hơn đồng thời đảm bảo mạng lưới vẫn được bảo vệ khỏi sự phình to của cơ sở dữ liệu bằng cách định giá chính xác sự tăng trưởng trạng thái thực.

**Tài nguyên**: [Thông số kỹ thuật EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Triển khai trước nhà máy xác định {#deterministic-factory-predeploy}

- Cung cấp cho các nhà phát triển một cách tự nhiên để triển khai các ứng dụng và ví hợp đồng thông minh đến cùng một địa chỉ chính xác trên nhiều chuỗi
- Cho phép người dùng có cùng một địa chỉ ví thông minh trên nhiều mạng lưới lớp 2 (L2), giảm tải nhận thức, giảm nhầm lẫn và giảm nguy cơ mất tiền vô tình
- Thay thế các giải pháp tạm thời mà các nhà phát triển hiện đang sử dụng để đạt được sự tương đương này, giúp việc xây dựng ví và ứng dụng đa chuỗi trở nên dễ dàng và an toàn hơn

Nếu một người dùng có ví hợp đồng thông minh ngày nay với các tài khoản trên nhiều chuỗi tương thích với Máy ảo Ethereum (EVM), họ thường kết thúc với một địa chỉ hoàn toàn khác nhau trên các mạng lưới khác nhau. Điều này không chỉ gây nhầm lẫn mà còn có thể dẫn đến việc mất tiền vô tình.

**Triển khai trước nhà máy xác định (hoặc EIP-7997)** cung cấp cho các nhà phát triển một cách tự nhiên, tích hợp sẵn để triển khai các ứng dụng phi tập trung và ví hợp đồng thông minh của họ đến cùng một địa chỉ chính xác trên nhiều chuỗi EVM, bao gồm Mạng chính Ethereum, các mạng lưới lớp 2 (L2), và nhiều hơn nữa. Nếu được áp dụng, nó sẽ cho phép người dùng có cùng một địa chỉ chính xác trên mọi chuỗi tham gia, giảm đáng kể gánh nặng nhận thức và khả năng xảy ra lỗi người dùng.

Triển khai trước nhà máy xác định hoạt động bằng cách đặt vĩnh viễn một chương trình nhà máy tối thiểu, chuyên dụng tại một vị trí giống hệt nhau (cụ thể là địa chỉ 0x12) trên mọi chuỗi tương thích EVM tham gia. Mục tiêu của nó là cung cấp một hợp đồng nhà máy phổ quát, tiêu chuẩn có thể được áp dụng bởi bất kỳ mạng lưới nào tương thích với EVM; miễn là một chuỗi EVM tham gia và áp dụng tiêu chuẩn này, các nhà phát triển sẽ có thể sử dụng nó để triển khai các hợp đồng thông minh của họ đến cùng một địa chỉ chính xác trên mạng lưới đó.

Tiêu chuẩn hóa này đơn giản hóa việc xây dựng và quản lý các ứng dụng chuỗi chéo cho các nhà phát triển và hệ sinh thái rộng lớn hơn. Các nhà phát triển không còn phải xây dựng mã tùy chỉnh, dành riêng cho chuỗi để liên kết phần mềm của họ với nhau trên các mạng lưới khác nhau, thay vào đó sử dụng nhà máy phổ quát này để tạo ra cùng một địa chỉ chính xác cho ứng dụng của họ ở mọi nơi. Ngoài ra, các trình khám phá khối, dịch vụ theo dõi và ví có thể dễ dàng xác định và liên kết các ứng dụng và tài khoản này trên các chuỗi khác nhau, tạo ra một môi trường đa chuỗi thống nhất và liền mạch hơn cho tất cả những người tham gia dựa trên Ethereum.

**Tài nguyên**: [Thông số kỹ thuật EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Các giao dịch chuyển và đốt ETH phát ra một bản ghi {#eth-transfers-and-burns-emit-a-log}

- Tự động tạo một bản ghi vĩnh viễn (log) mỗi khi ETH được chuyển hoặc đốt
- Sửa một điểm mù lịch sử cho phép các ứng dụng, sàn giao dịch và cầu nối phát hiện tiền gửi của người dùng một cách đáng tin cậy mà không cần các công cụ theo dõi đặc biệt

Không giống như các token (ERC-20), các giao dịch chuyển ETH thông thường giữa các hợp đồng thông minh không phát ra một biên nhận rõ ràng (bản ghi tiêu chuẩn), khiến các sàn giao dịch và ứng dụng khó theo dõi.

Các giao dịch chuyển và đốt ETH phát ra một bản ghi (hoặc EIP-7708) bắt buộc mạng lưới phải phát ra một sự kiện ghi nhật ký tiêu chuẩn mỗi khi một lượng ETH khác không được di chuyển hoặc đốt.

Điều này sẽ giúp các nhà điều hành ví, sàn giao dịch và cầu nối theo dõi tiền gửi và các chuyển động một cách chính xác và đáng tin cậy hơn nhiều mà không cần các công cụ tùy chỉnh.

**Tài nguyên**: [Thông số kỹ thuật EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 danh sách biên nhận khối một phần {#eth-70-partial-block-receipt-lists}

Khi chúng ta tăng lượng công việc mà Ethereum có thể làm, danh sách các biên nhận cho những hành động đó (hồ sơ dữ liệu của các giao dịch này) đang trở nên quá lớn đến nỗi chúng có thể gây ra lỗi cho các nút của mạng lưới khi cố gắng đồng bộ hóa dữ liệu với nhau.

danh sách biên nhận khối một phần eth/70 (hoặc EIP-7975) giới thiệu một cách mới để các nút nói chuyện với nhau (eth/70) cho phép các danh sách lớn này được chia thành các phần nhỏ hơn, dễ quản lý hơn. eth/70 giới thiệu một hệ thống phân trang cho giao thức truyền thông của mạng lưới cho phép các nút chia nhỏ danh sách biên nhận khối và yêu cầu dữ liệu một cách an toàn theo các khối nhỏ hơn, dễ quản lý hơn.

Thay đổi này sẽ ngăn chặn lỗi đồng bộ hóa mạng lưới trong các giai đoạn hoạt động nặng. Cuối cùng, nó mở đường cho Ethereum tăng dung lượng khối của mình, và xử lý nhiều giao dịch hơn mỗi khối trong tương lai, mà không làm quá tải phần cứng vật lý đồng bộ hóa chuỗi.

**Tài nguyên**: [Thông số kỹ thuật EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Đọc thêm {#further-reading}

- [Lộ trình Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773)
- [Thông báo blog Cập nhật Ưu tiên Giao thức cho năm 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum hậu lượng tử, Glamsterdam sắp ra mắt](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## Câu hỏi thường gặp {#faq}

### Làm thế nào để chuyển đổi ETH sau phân nhánh cứng Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Không cần hành động nào cho ETH của bạn**: Không cần chuyển đổi hoặc nâng cấp ETH của bạn sau bản nâng cấp Glamsterdam. Số dư tài khoản của bạn sẽ không thay đổi, và ETH bạn đang nắm giữ sẽ vẫn có thể truy cập được ở dạng hiện tại sau phân nhánh cứng.
- **Hãy cẩn thận với lừa đảo!** <Emoji text="⚠️" /> **bất kỳ ai hướng dẫn bạn "nâng cấp" ETH của bạn đều đang cố gắng lừa đảo bạn.** Bạn không cần làm gì liên quan đến bản nâng cấp này. Tài sản của bạn sẽ hoàn toàn không bị ảnh hưởng. Hãy nhớ rằng, luôn cập nhật thông tin là cách phòng chống lừa đảo tốt nhất.

[Tìm hiểu thêm về cách nhận biết và tránh lừa đảo](/security/)

### Bản nâng cấp Glamsterdam có ảnh hưởng đến tất cả các nút và trình xác thực Ethereum không? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Có, bản nâng cấp Glamsterdam yêu cầu cập nhật cho cả [ứng dụng khách thực thi và ứng dụng khách đồng thuận](/developers/docs/nodes-and-clients/). Bởi vì bản nâng cấp này giới thiệu Tách biệt Người đề xuất-Người xây dựng được quy định (ePBS), các nhà khai thác nút sẽ cần đảm bảo các ứng dụng khách của họ được cập nhật để xử lý các cách mới mà các khối được xây dựng, xác thực và chứng thực bởi mạng lưới.

Tất cả các máy khách Ethereum chính sẽ phát hành các phiên bản hỗ trợ phân nhánh cứng được đánh dấu là ưu tiên cao. Bạn có thể theo dõi thời điểm các bản phát hành này có sẵn trong các kho GitHub của ứng dụng khách, [kênh Discord của họ](https://ethstaker.org/support), [Discord của EthStaker](https://dsc.gg/ethstaker), hoặc bằng cách đăng ký blog Ethereum để nhận các cập nhật giao thức.

Để duy trì đồng bộ hóa với mạng Ethereum sau nâng cấp, các nhà khai thác nút phải đảm bảo họ đang chạy phiên bản máy khách được hỗ trợ. Lưu ý rằng thông tin về các bản phát hành máy khách rất nhạy cảm về thời gian và người dùng nên tham khảo các bản cập nhật mới nhất để biết chi tiết hiện tại nhất.

### Là một người đặt cọc, tôi cần làm gì cho bản nâng cấp Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Như với mọi bản nâng cấp mạng lưới, hãy đảm bảo cập nhật các ứng dụng khách của bạn lên các phiên bản mới nhất được đánh dấu hỗ trợ Glamsterdam. Theo dõi các cập nhật trong danh sách gửi thư và [Thông báo giao thức trên Blog EF](https://blog.ethereum.org/category/protocol) để được thông báo về các bản phát hành.

Để xác thực thiết lập của bạn trước khi Glamsterdam được kích hoạt trên Mạng chính, bạn có thể chạy một trình xác thực trên các mạng thử nghiệm. Các bản fork trên mạng thử nghiệm cũng được thông báo trong danh sách gửi thư và blog.

### Glamsterdam sẽ bao gồm những cải tiến nào cho việc mở rộng L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Tính năng nổi bật là ePBS (EIP-7732), tách biệt nhiệm vụ nặng nề của việc xác thực các giao dịch mạng lưới khỏi nhiệm vụ đạt được sự đồng thuận. Điều này mở rộng cửa sổ truyền bá dữ liệu từ 2 giây lên khoảng 9 giây, mở đường cho khả năng của Ethereum để xử lý an toàn thông lượng giao dịch cao hơn nhiều và chứa nhiều blob dữ liệu hơn cho các mạng lưới lớp 2.

### Glamsterdam có làm giảm phí trên Ethereum (lớp 1) không? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Có, Glamsterdam rất có thể sẽ giảm phí cho người dùng hàng ngày! Giảm ga giao dịch nội tại (hoặc EIP-2780) giảm phí cơ bản khi gửi ETH, làm cho việc sử dụng ETH cho các thanh toán hàng ngày rẻ hơn nhiều.

Ngoài ra, để có tính bền vững lâu dài, Glamsterdam giới thiệu Danh sách Truy cập Cấp Khối (BALs). Điều này cho phép xử lý song song và chuẩn bị cho L1 xử lý an toàn các giới hạn ga tổng thể cao hơn trong tương lai, điều này có thể sẽ làm giảm chi phí ga trên mỗi giao dịch khi dung lượng tăng lên.

### Sẽ có bất kỳ thay đổi nào đối với các hợp đồng thông minh hiện có của tôi sau Glamsterdam không? {#will-my-smart-contracts-change}

Các hợp đồng hiện có sẽ tiếp tục hoạt động bình thường sau Glamsterdam. Các nhà phát triển có thể sẽ nhận được một số công cụ mới và nên xem xét lại việc sử dụng ga của họ:

- Tăng kích thước hợp đồng tối đa (hoặc EIP-7954) cho phép các nhà phát triển triển khai các ứng dụng lớn hơn, nâng giới hạn kích thước hợp đồng tối đa từ khoảng 24KiB lên 32KiB.
- Triển khai trước nhà máy xác định (hoặc EIP-7997) giới thiệu một hợp đồng nhà máy phổ quát, tích hợp sẵn. Nó cho phép các nhà phát triển triển khai các ứng dụng và ví hợp đồng thông minh của họ đến cùng một địa chỉ chính xác trên tất cả các chuỗi EVM tham gia.
- Nếu ứng dụng của bạn dựa vào việc theo dõi phức tạp để tìm các giao dịch chuyển ETH, việc các giao dịch chuyển và đốt ETH phát ra một bản ghi (hoặc EIP-7708) sẽ cho phép bạn chuyển sang sử dụng các bản ghi để hạch toán đơn giản và đáng tin cậy hơn.
- Tăng chi phí ga tạo trạng thái (hoặc EIP-8037) và cập nhật chi phí ga truy cập trạng thái (hoặc EIP-8038) giới thiệu các mô hình bền vững mới sẽ thay đổi một số chi phí triển khai hợp đồng, vì việc tạo tài khoản mới hoặc lưu trữ vĩnh viễn sẽ có một khoản phí điều chỉnh động.

### Glamsterdam sẽ ảnh hưởng đến yêu cầu lưu trữ và phần cứng của nút như thế nào? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Nhiều EIP đang được xem xét cho Glamsterdam giải quyết vấn đề vách đá hiệu suất của sự tăng trưởng trạng thái:

- Tăng chi phí ga tạo trạng thái (hoặc EIP-8037) giới thiệu một mô hình định giá động để nhắm đến tốc độ tăng trưởng cơ sở dữ liệu trạng thái là 100 GiB/năm, đảm bảo phần cứng vật lý tiêu chuẩn có thể tiếp tục chạy mạng lưới một cách hiệu quả.
- danh sách biên nhận khối một phần eth/70 (hoặc EIP-7975) cho phép các nút yêu cầu biên nhận khối được phân trang, điều này chia nhỏ các danh sách biên nhận khối nặng dữ liệu thành các khối nhỏ hơn để ngăn chặn sự cố và đồng bộ hóa khi Ethereum mở rộng.
