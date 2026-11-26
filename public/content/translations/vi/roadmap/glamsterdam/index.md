---
title: Glamsterdam
description: "Glamsterdam là bản nâng cấp tiếp theo của Ethereum sau Fusaka. Tìm hiểu cách bản nâng cấp này dự kiến mở rộng quy mô lớp 1 (L1) với xử lý song song, ePBS và định giá trạng thái công bằng hơn."
lang: vi
template: upgrade
---

<Alert variant="update">
<AlertContent>
<AlertDescription>
Bản nâng cấp Glamsterdam chỉ là một bước duy nhất trong các mục tiêu phát triển dài hạn của Ethereum. Tìm hiểu thêm về [lộ trình giao thức](/roadmap/) và [các bản nâng cấp trước đó](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

Bản nâng cấp Glamsterdam sắp tới của [Ethereum](/) được thiết kế để dọn đường cho thế hệ mở rộng quy mô tiếp theo. Glamsterdam được đặt tên từ sự kết hợp giữa "Amsterdam" (bản nâng cấp lớp thực thi, được đặt theo tên một địa điểm tổ chức Devconnect trước đây) và "Gloas" (bản nâng cấp lớp đồng thuận, được đặt theo tên một ngôi sao).

Tiếp nối tiến bộ đạt được trong bản nâng cấp [Fusaka](/roadmap/fusaka/), Glamsterdam tập trung vào việc mở rộng quy mô lớp 1 (L1) bằng cách tổ chức lại cách mạng lưới xử lý các giao dịch và quản lý cơ sở dữ liệu đang phát triển của nó, cập nhật cơ bản cách Ethereum tạo và xác thực các khối.

Trong khi Fusaka tập trung vào các tinh chỉnh nền tảng, Glamsterdam thúc đẩy các mục tiêu "Mở rộng quy mô lớp 1 (L1)" và "Mở rộng quy mô Blob" bằng cách đưa vào giao thức sự phân chia nhiệm vụ giữa các thành viên tham gia mạng lưới khác nhau, và giới thiệu các cách hiệu quả hơn để xử lý dữ liệu nhằm chuẩn bị [trạng thái](/glossary/#state) cho việc song song hóa thông lượng cao.

Những cải tiến này đảm bảo Ethereum vẫn nhanh chóng, giá cả phải chăng và phi tập trung khi xử lý nhiều hoạt động hơn, đồng thời giữ cho các yêu cầu phần cứng ở mức có thể quản lý được đối với những người chạy [nút](/glossary/#node) tại nhà.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Các cải tiến trong Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Lưu ý: Bài viết này nêu bật một số Đề xuất Cải tiến Ethereum (EIP) được lên lịch đưa vào Glamsterdam. Các đề xuất bổ sung đã được lên lịch đang được thử nghiệm trên devnet bao gồm EIP-7688, EIP-7778, EIP-7843, EIP-7976, EIP-7981, EIP-8024, eth/72 (EIP-8070), EIP-8136, snap/2 (EIP-8189), EIP-8246 và EIP-8282. Phạm vi đã được chốt nhưng vẫn có thể thay đổi trước khi lên mạng chính, vì meta EIP vẫn đang ở dạng bản nháp. Để biết các cập nhật trạng thái mới nhất, hãy xem [bản nâng cấp Glamsterdam trên Forkcast](https://forkcast.org/upgrade/glamsterdam).

Nếu bạn muốn thêm một EIP đang được xem xét cho Glamsterdam nhưng chưa được thêm vào trang này, [hãy tìm hiểu cách đóng góp cho ethereum.org tại đây](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Bản nâng cấp Glamsterdam tập trung vào ba mục tiêu chính:

- Tăng tốc độ xử lý (song song hóa): Tổ chức lại cách mạng lưới ghi lại các phụ thuộc dữ liệu, để nó có thể xử lý an toàn nhiều giao dịch cùng một lúc thay vì theo một trình tự chậm chạp, từng cái một.
- Mở rộng dung lượng: Phân chia công việc nặng nhọc trong việc tạo và xác thực khối, giúp mạng lưới có thêm thời gian để truyền tải lượng dữ liệu lớn hơn mà không bị chậm lại.
- Ngăn chặn phình to cơ sở dữ liệu (tính bền vững): Điều chỉnh phí mạng lưới để phản ánh chính xác chi phí phần cứng dài hạn của việc lưu trữ dữ liệu mới, mở đường cho việc tăng giới hạn gas trong tương lai đồng thời ngăn chặn sự suy giảm hiệu suất phần cứng.

Tóm lại, Glamsterdam sẽ giới thiệu các thay đổi về cấu trúc để đảm bảo rằng khi mạng lưới tăng dung lượng, nó vẫn bền vững và hiệu suất vẫn ở mức cao.

## Mở rộng quy mô lớp 1 (L1) & xử lý song song {#scale-l1}

Việc mở rộng quy mô lớp 1 (L1) có ý nghĩa đòi hỏi phải tránh xa các giả định tin cậy ngoài giao thức và các hạn chế thực thi tuần tự. Glamsterdam giải quyết vấn đề này bằng cách đưa vào giao thức sự phân chia một số nhiệm vụ xây dựng khối nhất định và giới thiệu các cấu trúc dữ liệu mới cho phép mạng lưới chuẩn bị cho việc xử lý song song.

### Điểm nhấn: Tách biệt người đề xuất và người xây dựng được đưa vào giao thức (ePBS) {#epbs}

<EipTag upgrade="glamsterdam" id={7732} />

- Loại bỏ các giả định tin cậy ngoài giao thức và sự phụ thuộc vào các rơ-le (relay) của bên thứ ba
- Hỗ trợ mở rộng quy mô lớp 1 (L1) bằng cách cho phép các tải trọng thực thi lớn hơn nhiều thông qua các cửa sổ truyền tải được mở rộng
- Giới thiệu các khoản thanh toán cho trình xây dựng không cần tin cậy trực tiếp vào giao thức
- Yêu cầu cập nhật kiến trúc cho các nhóm đặt cọc để cho phép giám sát không cần tin cậy, mặc dù trải nghiệm người dùng đặt cọc tổng thể được cải thiện nhờ quy trình lựa chọn trình xây dựng được tinh chỉnh

Hiện tại, quá trình đề xuất và xây dựng khối bao gồm việc bàn giao giữa người đề xuất khối và trình xây dựng khối. Mối quan hệ giữa người đề xuất và trình xây dựng không phải là một phần của giao thức Ethereum cốt lõi, vì vậy nó dựa vào phần mềm trung gian của bên thứ ba đáng tin cậy, phần mềm (rơ-le) và sự tin cậy ngoài giao thức giữa các thực thể.

Mối quan hệ ngoài giao thức giữa người đề xuất và trình xây dựng cũng tạo ra một "đường dẫn nóng" trong quá trình xác thực khối, buộc các [trình xác thực](/glossary/#validator) phải vội vã phát sóng và thực thi giao dịch trong một khoảng thời gian hẹp 2 giây, hạn chế lượng dữ liệu mà mạng lưới có thể xử lý.

**Tách biệt người đề xuất và người xây dựng được đưa vào giao thức (ePBS, hoặc EIP-7732)** chính thức tách biệt công việc của người đề xuất (người chọn khối đồng thuận) khỏi trình xây dựng (người lắp ráp tải trọng thực thi), đưa việc bàn giao này trực tiếp vào giao thức.

Việc xây dựng sự trao đổi không cần tin cậy của một tải trọng khối để thanh toán trực tiếp vào giao thức giúp loại bỏ nhu cầu về phần mềm trung gian của bên thứ ba (như MEV-Boost). Tuy nhiên, các trình xây dựng và người đề xuất vẫn có thể chọn sử dụng các rơ-le hoặc phần mềm trung gian ngoài giao thức cho các tính năng phức tạp chưa phải là một phần của giao thức cốt lõi.

Để giải quyết nút thắt "đường dẫn nóng", ePBS cũng giới thiệu Ủy ban Kịp thời Tải trọng (PTC) và logic thời hạn kép, cho phép các trình xác thực chứng thực khối đồng thuận và tính kịp thời của tải trọng thực thi một cách riêng biệt để tối đa hóa thông lượng.

<VideoWatch slug="proposer-builder-separation" />

Việc tách biệt vai trò của người đề xuất và trình xây dựng ở cấp độ giao thức sẽ mở rộng cửa sổ truyền tải (hoặc thời gian có sẵn để lan truyền dữ liệu trên toàn mạng lưới) từ 2 giây lên khoảng 9 giây.

Bằng cách thay thế phần mềm trung gian và rơ-le ngoài giao thức bằng các cơ chế trong giao thức, ePBS giảm bớt sự phụ thuộc vào độ tin cậy và cho phép Ethereum xử lý an toàn lượng dữ liệu lớn hơn nhiều (như nhiều blob hơn cho các [lớp 2 (L2)](/glossary/#layer-2)) mà không gây áp lực lên mạng lưới.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Điểm nhấn: Danh sách truy cập cấp độ khối (BAL) {#bals}

<EipTag upgrade="glamsterdam" id={7928} />

- Loại bỏ các nút thắt xử lý tuần tự bằng cách cung cấp một bản đồ trả trước về tất cả các phụ thuộc giao dịch, tạo tiền đề cho các trình xác thực xử lý nhiều giao dịch song song thay vì từng cái một
- Cho phép các nút cập nhật hồ sơ của chúng bằng cách đọc kết quả cuối cùng mà không cần phải phát lại mọi giao dịch (đồng bộ hóa không cần thực thi), giúp việc đồng bộ hóa một nút với mạng lưới nhanh hơn nhiều
- Loại bỏ việc phỏng đoán, cho phép các trình xác thực tải trước tất cả dữ liệu cần thiết cùng một lúc thay vì khám phá từng bước, điều này giúp việc xác thực nhanh hơn nhiều

Ethereum ngày nay giống như một con đường một làn; vì mạng lưới không biết một giao dịch sẽ cần hoặc thay đổi dữ liệu gì (như giao dịch sẽ chạm vào những tài khoản nào) cho đến khi giao dịch được chạy, các trình xác thực phải xử lý các giao dịch từng cái một theo một hàng tuần tự nghiêm ngặt. Nếu họ cố gắng xử lý tất cả các giao dịch cùng một lúc mà không biết những phụ thuộc này, hai giao dịch có thể vô tình cố gắng thay đổi cùng một dữ liệu chính xác vào cùng một thời điểm, gây ra lỗi.

**Danh sách truy cập cấp độ khối (BAL, hoặc EIP-7928)** hoạt động giống như một bản đồ cho mạng lưới, nêu chi tiết những phần nào của cơ sở dữ liệu sẽ được truy cập trước khi công việc bắt đầu. Lớp thực thi lưu trữ toàn bộ Danh sách truy cập khối, bao gồm mọi thay đổi tài khoản mà các giao dịch sẽ chạm tới, cùng với kết quả cuối cùng của những thay đổi đó (tất cả các truy cập trạng thái và giá trị sau thực thi). Để giữ cho các khối nhẹ, tiêu đề block chứa một trường mới với dấu vân tay kỹ thuật số duy nhất (bản ghi mã băm) của danh sách này.

Vì chúng cung cấp khả năng hiển thị tức thì về những giao dịch nào không trùng lặp, BAL cho phép các nút thực hiện đọc đĩa song song, tìm nạp thông tin cho nhiều giao dịch đồng thời. Mạng lưới có thể nhóm các giao dịch không liên quan một cách an toàn và xử lý chúng song song.

Vì BAL bao gồm kết quả cuối cùng của các giao dịch (các giá trị sau thực thi), khi các nút của mạng lưới cần đồng bộ hóa với trạng thái hiện tại của mạng lưới, chúng có thể sao chép những kết quả cuối cùng đó để cập nhật hồ sơ của mình. Các trình xác thực không còn phải phát lại tất cả các giao dịch phức tạp từ đầu để biết chuyện gì đã xảy ra, giúp các nút mới tham gia mạng lưới nhanh hơn và dễ dàng hơn.

Việc đọc đĩa song song được kích hoạt bởi BAL sẽ là một bước tiến đáng kể hướng tới một tương lai nơi Ethereum có thể xử lý nhiều giao dịch cùng một lúc, làm tăng đáng kể tốc độ của mạng lưới.

#### Trao đổi danh sách truy cập khối eth/71 {#bale}

<EipTag upgrade="glamsterdam" id={8159} />

Trao đổi danh sách truy cập khối (eth/71 hoặc EIP-8159) là người bạn đồng hành mạng trực tiếp với danh sách truy cập cấp độ khối. Trong khi BAL mở khóa việc thực thi song song, eth/71 nâng cấp giao thức ngang hàng để cho phép các nút thực sự chia sẻ các danh sách này qua mạng lưới. Hiện được yêu cầu đối với tất cả các máy khách lớp thực thi, việc trao đổi danh sách truy cập khối sẽ cho phép đồng bộ hóa nhanh hơn và cho phép các nút thực hiện cập nhật trạng thái không cần thực thi.

**Tài nguyên**:

- [Đặc tả kỹ thuật EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Đặc tả kỹ thuật EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Tính bền vững của mạng lưới {#network-sustainability}

Khi mạng lưới Ethereum phát triển nhanh hơn, điều quan trọng là phải đảm bảo rằng chi phí sử dụng nó phù hợp với sự hao mòn trên phần cứng chạy Ethereum. Mạng lưới cần tăng giới hạn dung lượng tổng thể của nó để mở rộng quy mô an toàn và xử lý nhiều giao dịch hơn.

### Tăng chi phí gas tạo trạng thái {#state-creation-gas-cost-increase}

<EipTag upgrade="glamsterdam" id={8037} />

- Đảm bảo rằng phí để tạo tài khoản mới hoặc hợp đồng thông minh phản ánh chính xác gánh nặng dài hạn mà chúng đặt lên cơ sở dữ liệu của Ethereum
- Đặt một **chi phí cố định cho mỗi byte trạng thái (CPSB)** nhắm mục tiêu tốc độ tăng trưởng an toàn và có thể dự đoán được là 120 GiB/năm, đảm bảo phần cứng vật lý tiêu chuẩn có thể tiếp tục chạy mạng lưới
- Tách biệt việc hạch toán cho các khoản phí cụ thể này sang một kho chứa mới, loại bỏ các giới hạn giao dịch cũ và cho phép các nhà phát triển triển khai các ứng dụng lớn hơn, phức tạp hơn

Việc thêm tài khoản, token và [hợp đồng thông minh](/glossary/#smart-contract) mới tạo ra dữ liệu vĩnh viễn (được gọi là "trạng thái") mà mọi máy tính chạy mạng lưới phải lưu trữ vô thời hạn. Các khoản phí hiện tại để thêm hoặc đọc dữ liệu này không nhất quán và không nhất thiết phản ánh gánh nặng lưu trữ thực tế, dài hạn mà chúng đặt lên phần cứng của mạng lưới.

Một số hành động tạo trạng thái trên Ethereum, như tạo tài khoản mới hoặc triển khai các hợp đồng thông minh lớn, có chi phí tương đối thấp so với không gian lưu trữ vĩnh viễn mà chúng chiếm trên các nút của mạng lưới, ví dụ: việc triển khai hợp đồng rẻ hơn đáng kể trên mỗi byte so với việc tạo các khe lưu trữ.

Nếu không có sự điều chỉnh, sự tăng trưởng trạng thái của Ethereum sẽ trở nên không bền vững khi mạng lưới mở rộng quy mô hướng tới mức sàn giới hạn gas 200 triệu được kích hoạt bởi Glamsterdam (với các nhà phát triển hiện đang thử nghiệm ở giới hạn gas khối tham chiếu 150 triệu để đưa ra mức giá trạng thái chính xác).

**Tăng chi phí gas tạo trạng thái (hoặc EIP-8037)** hài hòa các chi phí bằng cách gắn chúng với kích thước thực tế của dữ liệu đang được tạo, cập nhật các khoản phí để chúng tỷ lệ thuận với lượng dữ liệu vĩnh viễn mà một hoạt động tạo ra hoặc truy cập.

EIP-8037 cũng giới thiệu một mô hình kho chứa để quản lý các chi phí này một cách dễ dự đoán hơn; các khoản phí gas trạng thái sẽ được rút từ `state_gas_reservoir` trước tiên, và mã lệnh `GAS` chỉ trả về `gas_left`, ngăn chặn các khung thực thi tính toán sai lượng gas có sẵn. Để hỗ trợ điều này, các tác vụ nền thiết yếu được cấp thêm một hạn mức nhiên liệu đi thẳng vào kho dự trữ chuyên dụng này, đảm bảo các hoạt động mạng lưới quan trọng sẽ không thất bại chỉ vì việc lưu trữ dữ liệu vĩnh viễn đòi hỏi nhiều tài nguyên hơn.

Trước EIP-8037, cả công việc tính toán (xử lý tích cực) và lưu trữ dữ liệu vĩnh viễn (lưu hợp đồng thông minh vào cơ sở dữ liệu của mạng lưới) đều chia sẻ cùng một giới hạn gas. Mô hình kho chứa phân chia việc hạch toán: giới hạn gas cho công việc tính toán thực tế của giao dịch (xử lý) và cho việc lưu trữ dữ liệu dài hạn (gas trạng thái). Việc tách biệt hai yếu tố này giúp ngăn chặn kích thước khổng lồ của dữ liệu ứng dụng làm cạn kiệt giới hạn gas; miễn là các nhà phát triển cung cấp đủ tiền để lấp đầy kho chứa cho việc lưu trữ dữ liệu, họ có thể triển khai các hợp đồng thông minh lớn hơn và phức tạp hơn nhiều.

Việc định giá lưu trữ dữ liệu chính xác và dễ dự đoán hơn sẽ giúp Ethereum tăng tốc độ và dung lượng một cách an toàn mà không làm phình to cơ sở dữ liệu. Tính bền vững này sẽ cho phép các nhà điều hành nút tiếp tục sử dụng phần cứng (tương đối) phải chăng trong nhiều năm tới, giữ cho việc đặt cọc tại nhà có thể tiếp cận được nhằm duy trì sự phi tập trung của mạng lưới.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Cập nhật chi phí gas truy cập trạng thái {#state-access-gas-cost-update}

<EipTag upgrade="glamsterdam" id={8038} />

- Tăng chi phí gas khi các ứng dụng đọc hoặc cập nhật thông tin được lưu trữ vĩnh viễn trên Ethereum (các mã lệnh truy cập trạng thái) để phù hợp chính xác với công việc tính toán mà các lệnh này yêu cầu
- Tăng cường khả năng phục hồi của mạng lưới bằng cách ngăn chặn các cuộc tấn công từ chối dịch vụ khai thác các hoạt động đọc dữ liệu rẻ một cách giả tạo

Khi trạng thái của Ethereum ngày càng lớn, hành động tìm kiếm và đọc dữ liệu cũ ("truy cập trạng thái") đã trở nên nặng nề và chậm chạp hơn đối với các nút để xử lý. Phí cho các hành động này vẫn giữ nguyên mặc dù hiện tại việc tra cứu thông tin đã đắt hơn một chút (về mặt sức mạnh tính toán).

Do đó, một số lệnh cụ thể hiện đang bị định giá thấp so với công việc mà chúng buộc một nút phải làm. Ví dụ, `EXTCODESIZE` và `EXTCODECOPY` bị định giá thấp vì chúng yêu cầu hai lần đọc cơ sở dữ liệu riêng biệt—một cho đối tượng tài khoản và lần thứ hai cho kích thước mã thực tế hoặc mã byte.

**Cập nhật chi phí gas truy cập trạng thái (hoặc EIP-8038)** tăng các hằng số gas cho các mã lệnh truy cập trạng thái, như tra cứu dữ liệu tài khoản và hợp đồng, để phù hợp với hiệu suất phần cứng hiện đại và kích thước trạng thái.

Việc điều chỉnh chi phí truy cập trạng thái cũng giúp Ethereum có khả năng phục hồi tốt hơn. Vì những hành động đọc dữ liệu nặng nề này rẻ một cách giả tạo, một kẻ tấn công độc hại có thể gửi thư rác (spam) mạng lưới với hàng ngàn yêu cầu dữ liệu phức tạp trong một khối duy nhất trước khi đạt đến giới hạn phí của mạng lưới, có khả năng khiến mạng lưới bị đình trệ hoặc sập (một cuộc tấn công từ chối dịch vụ). Ngay cả khi không có ý định xấu, các nhà phát triển cũng không được khuyến khích về mặt kinh tế để xây dựng các ứng dụng hiệu quả nếu việc đọc dữ liệu mạng lưới quá rẻ.

Bằng cách định giá các hành động truy cập trạng thái chính xác hơn, Ethereum có thể có khả năng phục hồi tốt hơn trước các sự cố chậm lại do vô tình hoặc cố ý, đồng thời việc điều chỉnh chi phí mạng lưới phù hợp với tải phần cứng chứng tỏ một nền tảng bền vững hơn cho việc tăng giới hạn gas trong tương lai.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Khả năng phục hồi của mạng lưới {#network-resilience}

Các tinh chỉnh đối với nhiệm vụ của trình xác thực và quy trình thoát đảm bảo sự ổn định của mạng lưới trong các sự kiện phạt cắt giảm hàng loạt và tăng tốc độ mà những người đặt cọc có thể di chuyển khoản đặt cọc của họ. Những cải tiến này làm cho mạng lưới ổn định hơn và đảm bảo rằng tất cả những người tham gia, dù lớn hay nhỏ, đều được đối xử công bằng.

### Loại trừ các trình xác thực bị phạt cắt giảm khỏi việc đề xuất {#exclude-slashed-validators}

<EipTag upgrade="glamsterdam" id={8045} />

- Ngăn chặn các trình xác thực bị phạt (bị phạt cắt giảm) được chọn để đề xuất các khối trong tương lai, loại bỏ các khe bị bỏ lỡ chắc chắn
- Giữ cho Ethereum hoạt động trơn tru và đáng tin cậy, ngăn chặn tình trạng đình trệ nghiêm trọng trong trường hợp xảy ra sự kiện phạt cắt giảm hàng loạt

Hiện tại, ngay cả khi một trình xác thực bị phạt cắt giảm (bị phạt vì vi phạm quy tắc hoặc không hoạt động như mong đợi), hệ thống vẫn có thể chọn họ để dẫn dắt một khối trong tương lai gần khi nó tạo ra các dự đoán người đề xuất trong tương lai.

Vì các khối từ những người đề xuất bị phạt cắt giảm sẽ tự động bị từ chối là không hợp lệ, điều này khiến mạng lưới bỏ lỡ các khe và làm chậm quá trình phục hồi mạng lưới trong các sự kiện phạt cắt giảm hàng loạt.

**Loại trừ các trình xác thực bị phạt cắt giảm khỏi việc đề xuất (hoặc EIP-8045)** đơn giản là lọc ra các trình xác thực bị phạt cắt giảm khỏi việc được chọn cho các nhiệm vụ trong tương lai. Điều này cải thiện khả năng phục hồi của chuỗi bằng cách đảm bảo chỉ những trình xác thực khỏe mạnh mới được chọn để đề xuất khối, duy trì chất lượng dịch vụ trong thời gian mạng lưới bị gián đoạn.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Tăng giới hạn ra vào cho việc thoát và hợp nhất {#increase-exit-and-consolidation-churn}

<EipTag upgrade="glamsterdam" id={8061} />

- Giảm đáng kể thời gian rút tiền đặt cọc bằng cách cho phép dung lượng thoát mở rộng theo tổng số lượng ETH được đặt cọc, thay vì bị giới hạn ở một tỷ lệ cố định
- Cung cấp cho việc hợp nhất trình xác thực dung lượng hàng đợi chuyên dụng của riêng chúng, đẩy nhanh quá trình chuyển đổi sang các trình xác thực lớn hơn, hiệu quả hơn
- Duy trì bảo mật mạng lưới thông qua các thông số an toàn được phân tích cẩn thận

Giới hạn ra vào của Ethereum là một giới hạn an toàn về tốc độ mà các trình xác thực có thể tham gia, thoát hoặc hợp nhất (củng cố) số ETH đã đặt cọc của họ, để đảm bảo an ninh của mạng lưới không bao giờ bị mất ổn định. Ngày nay, việc thoát và sự kích hoạt chia sẻ một giới hạn chung duy nhất, vì vậy trong những khoảng thời gian có nhu cầu cao, những người đặt cọc có thể phải đối mặt với thời gian chờ đợi lâu để rút ETH của họ. Việc hợp nhất, nơi các trình xác thực hợp nhất thành các trình xác thực lớn hơn với tối đa 2.048 ETH (được kích hoạt bởi [bản nâng cấp Pectra](/roadmap/pectra)), cũng cạnh tranh cho dung lượng hạn chế này, có nghĩa là việc hợp nhất toàn bộ tập hợp trình xác thực sẽ mất nhiều năm với tốc độ hiện tại.

**Tăng giới hạn ra vào cho việc thoát và hợp nhất (hoặc EIP-8061)** tổ chức lại các giới hạn này thành các làn đường riêng biệt:

- Sự kích hoạt trình xác thực giữ nguyên giới hạn hiện tại của chúng, không thay đổi
- Việc thoát không còn bị giới hạn và thay vào đó mở rộng theo tổng số lượng ETH được đặt cọc
- Việc hợp nhất có dung lượng chuyên dụng riêng, bằng khoảng một nửa kích thước của giới hạn kích hoạt-thoát kết hợp

Ở mức độ đặt cọc hiện tại, điều này làm tăng dung lượng thoát lên khoảng 4 lần và dung lượng hợp nhất lên khoảng 2 lần, có nghĩa là những người đặt cọc có thể rút ETH của họ nhanh hơn nhiều trong các giai đoạn có nhu cầu cao và mạng lưới chuyển đổi nhanh hơn sang một tập hợp trình xác thực nhỏ hơn, hiệu quả hơn.

Vì khoản đặt cọc có thể di chuyển vào và ra khỏi mạng lưới nhanh hơn, thay đổi này làm giảm khoảng một nửa thời gian một nút có thể duy trì ngoại tuyến trước khi nó cần một điểm kiểm tra đáng tin cậy gần đây để tham gia lại mạng lưới một cách an toàn (thời kỳ tính chủ quan yếu, từ khoảng 15,7 ngày xuống còn khoảng 7 ngày). Sự đánh đổi này đã được phân tích cẩn thận để đảm bảo an ninh mạng lưới được duy trì.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-8061](https://eips.ethereum.org/EIPS/eip-8061)

## Cải thiện trải nghiệm người dùng & nhà phát triển {#improve-user-developer-experience}

Bản nâng cấp Glamsterdam của Ethereum nhằm mục đích cải thiện trải nghiệm người dùng, tăng cường khả năng khám phá dữ liệu và xử lý kích thước thông điệp ngày càng tăng để ngăn chặn các lỗi đồng bộ hóa. Điều này giúp dễ dàng theo dõi những gì đang xảy ra trên chuỗi đồng thời ngăn chặn các trục trặc kỹ thuật khi mạng lưới mở rộng quy mô.

### Giảm chi phí gas giao dịch nội tại {#reduce-intrinsic-transaction-gas-costs}

<EipTag upgrade="glamsterdam" id={2780} />

- Giảm phí cơ sở cho các giao dịch, làm giảm chi phí tổng thể của một khoản thanh toán ETH gốc đơn giản
- Làm cho các khoản chuyển nhỏ hơn có giá cả phải chăng hơn, thúc đẩy khả năng tồn tại của Ethereum như một phương tiện trao đổi thường xuyên

Tất cả các giao dịch Ethereum ngày nay đều có một khoản phí gas cơ sở cố định, bất kể việc xử lý nó đơn giản hay phức tạp như thế nào. **Giảm gas giao dịch nội tại (hoặc EIP-2780)** đề xuất giảm phí cơ sở đó để làm cho một khoản chuyển ETH tiêu chuẩn giữa các tài khoản hiện có **rẻ hơn tới 71%**.

Việc giảm gas giao dịch nội tại hoạt động bằng cách chia nhỏ phí giao dịch để chỉ phản ánh công việc cơ bản, thiết yếu mà các máy tính chạy mạng lưới thực sự làm, như xác minh chữ ký số và cập nhật số dư. Vì một khoản thanh toán ETH cơ bản không thực thi mã phức tạp hoặc mang theo dữ liệu bổ sung, đề xuất này sẽ giảm phí của nó để phù hợp với dấu chân nhẹ nhàng của nó.

Đề xuất này giới thiệu một ngoại lệ cho việc tạo các tài khoản hoàn toàn mới để giữ cho mức phí thấp hơn không làm quá tải trạng thái của mạng lưới. Nếu một khoản chuyển gửi ETH đến một địa chỉ trống, không tồn tại, mạng lưới phải tạo một bản ghi mới vĩnh viễn cho nó. Một khoản phụ phí gas được thêm vào cho việc tạo tài khoản đó để giúp trang trải gánh nặng lưu trữ dài hạn của nó.

Cùng với nhau, EIP-2780 nhằm mục đích làm cho các khoản chuyển hàng ngày giữa các tài khoản hiện có trở nên phải chăng hơn đồng thời đảm bảo mạng lưới vẫn được bảo vệ khỏi sự phình to cơ sở dữ liệu bằng cách định giá chính xác sự tăng trưởng trạng thái thực sự.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Triển khai trước nhà máy xác định {#deterministic-factory-predeploy}

<EipTag upgrade="glamsterdam" id={7997} />

- Cung cấp cho các nhà phát triển một cách gốc để triển khai các ứng dụng và ví hợp đồng thông minh đến cùng một địa chỉ chính xác trên nhiều chuỗi
- Cho phép người dùng có cùng một địa chỉ ví thông minh trên nhiều mạng lưới lớp 2 (L2), giảm tải nhận thức, giảm sự nhầm lẫn và giảm nguy cơ vô tình mất tiền
- Thay thế các giải pháp thay thế mà các nhà phát triển hiện đang sử dụng để đạt được sự tương đương này, giúp việc xây dựng các ví và ứng dụng đa chuỗi trở nên dễ dàng và an toàn hơn

Nếu một người dùng có một ví hợp đồng thông minh ngày nay với các tài khoản trên nhiều chuỗi tương thích với Máy ảo Ethereum (EVM), họ thường kết thúc với một địa chỉ hoàn toàn khác nhau trên các mạng lưới khác nhau. Điều này không chỉ gây nhầm lẫn mà còn có thể dẫn đến việc vô tình mất tiền.

**Triển khai trước nhà máy xác định (hoặc EIP-7997)** cung cấp cho các nhà phát triển một cách gốc, được tích hợp sẵn để triển khai các ứng dụng phi tập trung và ví hợp đồng thông minh của họ đến cùng một địa chỉ chính xác trên nhiều chuỗi EVM, bao gồm Mạng chính Ethereum, các mạng lưới lớp 2 (L2) và hơn thế nữa. Nếu được áp dụng, nó sẽ cho phép người dùng có cùng một địa chỉ chính xác trên mọi chuỗi tham gia, giảm đáng kể tải nhận thức và khả năng xảy ra lỗi của người dùng.

Triển khai trước nhà máy xác định hoạt động bằng cách đặt vĩnh viễn một chương trình nhà máy chuyên dụng, tối giản tại một vị trí giống hệt nhau (cụ thể là địa chỉ 0x12) trên mọi chuỗi tương thích EVM tham gia. Mục tiêu của nó là cung cấp một hợp đồng nhà máy tiêu chuẩn, phổ quát có thể được áp dụng bởi bất kỳ mạng lưới tương thích EVM nào; miễn là một chuỗi EVM tham gia và áp dụng tiêu chuẩn này, các nhà phát triển sẽ có thể sử dụng nó để triển khai các hợp đồng thông minh của họ đến cùng một địa chỉ chính xác trên mạng lưới đó.

Sự tiêu chuẩn hóa này đơn giản hóa việc xây dựng và quản lý các ứng dụng chuỗi chéo cho các nhà phát triển và hệ sinh thái rộng lớn hơn. Các nhà phát triển không còn phải xây dựng mã tùy chỉnh, dành riêng cho chuỗi để liên kết phần mềm của họ với nhau trên các mạng lưới khác nhau, thay vào đó sử dụng nhà máy phổ quát này để tạo ra cùng một địa chỉ chính xác cho ứng dụng của họ ở mọi nơi. Ngoài ra, các trình khám phá khối, dịch vụ theo dõi và ví có thể dễ dàng xác định và liên kết các ứng dụng và tài khoản này trên nhiều chuỗi khác nhau, tạo ra một môi trường đa chuỗi thống nhất và liền mạch hơn cho tất cả những người tham gia dựa trên Ethereum.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Các khoản chuyển và đốt ETH phát ra một nhật ký {#eth-transfers-and-burns-emit-a-log}

<EipTag upgrade="glamsterdam" id={7708} />

- Tự động tạo một bản ghi vĩnh viễn (nhật ký) mỗi khi ETH được chuyển hoặc đốt
- Khắc phục một điểm mù lịch sử cho phép các ứng dụng, sàn giao dịch và cầu nối phát hiện một cách đáng tin cậy các khoản tiền gửi của người dùng mà không cần các công cụ theo dõi đặc biệt

Không giống như các token (ERC-20), các khoản chuyển ETH thông thường giữa các hợp đồng thông minh không phát ra một biên lai rõ ràng (nhật ký tiêu chuẩn), khiến chúng khó theo dõi đối với các sàn giao dịch và ứng dụng.

Các khoản chuyển và đốt ETH phát ra một nhật ký (hoặc EIP-7708) bắt buộc mạng lưới phải phát ra một sự kiện nhật ký tiêu chuẩn mỗi khi một lượng ETH khác không được di chuyển hoặc đốt.

Điều này sẽ giúp các ví, sàn giao dịch và nhà điều hành cầu nối dễ dàng và đáng tin cậy hơn nhiều trong việc theo dõi chính xác các khoản tiền gửi và chuyển động mà không cần công cụ tùy chỉnh.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### Danh sách biên lai khối một phần eth/70 {#eth-70-partial-block-receipt-lists}

<EipTag upgrade="glamsterdam" id={7975} />

Khi chúng ta tăng khối lượng công việc mà Ethereum có thể làm, danh sách các biên lai cho những hành động đó (các bản ghi dữ liệu của các giao dịch này) đang trở nên quá lớn đến mức chúng có khả năng khiến các nút của mạng lưới bị lỗi khi cố gắng đồng bộ hóa dữ liệu với nhau.

Hiện là một yêu cầu đối với tất cả các máy khách lớp thực thi, danh sách biên lai khối một phần eth/70 (hoặc EIP-7975) giới thiệu một cách mới để các nút giao tiếp với nhau (eth/70) cho phép chia các danh sách lớn này thành các phần nhỏ hơn, dễ quản lý hơn. eth/70 giới thiệu một hệ thống phân trang cho giao thức giao tiếp của mạng lưới cho phép các nút chia nhỏ danh sách biên lai khối và yêu cầu dữ liệu một cách an toàn theo các khối nhỏ hơn, dễ quản lý hơn.

Thay đổi này sẽ ngăn chặn các lỗi đồng bộ hóa mạng lưới trong những khoảng thời gian hoạt động dày đặc. Cuối cùng, nó mở đường cho Ethereum tăng dung lượng khối của mình và xử lý nhiều giao dịch hơn trên mỗi khối trong tương lai, mà không làm quá tải phần cứng vật lý đang đồng bộ hóa chuỗi.

**Tài nguyên**: [Đặc tả kỹ thuật EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Đọc thêm {#further-reading}

- [Lộ trình Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Meta EIP Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Thông báo trên blog về Cập nhật Ưu tiên Giao thức cho năm 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum hậu lượng tử, Glamsterdam đang đến](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## Câu hỏi thường gặp {#faq}

### Làm thế nào để chuyển đổi ETH sau phân nhánh cứng Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Không cần hành động đối với ETH của bạn**: Không cần phải chuyển đổi hoặc nâng cấp ETH của bạn sau bản nâng cấp Glamsterdam. Số dư tài khoản của bạn sẽ giữ nguyên và ETH bạn hiện đang nắm giữ sẽ vẫn có thể truy cập được ở dạng hiện tại sau phân nhánh cứng.
- **Cẩn thận với các trò lừa đảo!** <Emoji text="⚠️" /> **bất kỳ ai hướng dẫn bạn "nâng cấp" ETH của mình đều đang cố gắng lừa đảo bạn.** Bạn không cần phải làm gì liên quan đến bản nâng cấp này. Tài sản của bạn sẽ hoàn toàn không bị ảnh hưởng. Hãy nhớ rằng, luôn cập nhật thông tin là cách phòng vệ tốt nhất chống lại các trò lừa đảo.

[Tìm hiểu thêm về cách nhận biết và tránh các trò lừa đảo](/security/)

### Bản nâng cấp Glamsterdam có ảnh hưởng đến tất cả các nút và trình xác thực Ethereum không? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Có, bản nâng cấp Glamsterdam yêu cầu cập nhật cho cả [máy khách thực thi và máy khách đồng thuận](/developers/docs/nodes-and-clients/). Vì bản nâng cấp này giới thiệu Tách biệt người đề xuất và người xây dựng được đưa vào giao thức (ePBS), các nhà điều hành nút sẽ cần đảm bảo máy khách của họ được cập nhật để xử lý các cách thức mới mà các khối được xây dựng, xác thực và chứng thực bởi mạng lưới.

Tất cả các máy khách Ethereum chính sẽ phát hành các phiên bản hỗ trợ phân nhánh cứng được đánh dấu là ưu tiên cao. Bạn có thể theo dõi thời điểm các bản phát hành này sẽ có sẵn trong các kho lưu trữ GitHub của máy khách, [kênh Discord](https://ethstaker.org/support) của họ, [Discord EthStaker](https://dsc.gg/ethstaker), hoặc bằng cách đăng ký blog Ethereum để nhận các bản cập nhật giao thức.

Để duy trì đồng bộ hóa với mạng lưới Ethereum sau nâng cấp, các nhà điều hành nút phải đảm bảo họ đang chạy một phiên bản máy khách được hỗ trợ. Lưu ý rằng thông tin về các bản phát hành máy khách có tính nhạy cảm về thời gian và người dùng nên tham khảo các bản cập nhật mới nhất để biết các chi tiết hiện tại nhất.

### Là một người đặt cọc, tôi cần làm gì cho bản nâng cấp Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Như với mọi bản nâng cấp mạng lưới, hãy đảm bảo cập nhật máy khách của bạn lên các phiên bản mới nhất được đánh dấu có hỗ trợ Glamsterdam. Theo dõi các bản cập nhật trong danh sách gửi thư và [Thông báo Giao thức trên Blog EF](https://blog.ethereum.org/category/protocol) để được thông báo về các bản phát hành.

Để xác thực thiết lập của bạn trước khi Glamsterdam được kích hoạt trên Mạng chính, bạn có thể chạy một trình xác thực trên các mạng thử nghiệm. Các phân nhánh mạng thử nghiệm cũng được thông báo trong danh sách gửi thư và blog.

### Glamsterdam sẽ bao gồm những cải tiến nào cho việc mở rộng quy mô lớp 1 (L1)? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Tính năng nổi bật là ePBS (EIP-7732), giúp tách biệt nhiệm vụ nặng nề là xác thực các giao dịch mạng lưới khỏi nhiệm vụ đạt được sự đồng thuận. Điều này mở rộng cửa sổ truyền tải dữ liệu từ 2 giây lên khoảng 9 giây, mở đường cho khả năng của Ethereum trong việc xử lý an toàn thông lượng giao dịch cao hơn nhiều và chứa nhiều blob dữ liệu hơn cho các mạng lưới lớp 2 (L2).

### Glamsterdam có làm giảm phí trên Ethereum (lớp 1 (L1)) không? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Có, Glamsterdam rất có thể sẽ giảm phí cho người dùng hàng ngày! Giảm gas giao dịch nội tại (hoặc EIP-2780) làm giảm phí cơ sở cho việc gửi ETH, làm cho ETH rẻ hơn nhiều để sử dụng cho các khoản thanh toán hàng ngày.

Ngoài ra, vì tính bền vững lâu dài, Glamsterdam giới thiệu Danh sách truy cập cấp độ khối (BAL). Điều này cho phép xử lý song song và chuẩn bị cho lớp 1 (L1) xử lý an toàn các giới hạn gas tổng thể cao hơn trong tương lai, điều này có khả năng sẽ làm giảm chi phí gas cho mỗi giao dịch khi dung lượng tăng lên.

### Sẽ có bất kỳ thay đổi nào đối với các hợp đồng thông minh hiện tại của tôi sau Glamsterdam không? {#will-my-smart-contracts-change}

Các hợp đồng hiện tại sẽ tiếp tục hoạt động bình thường sau Glamsterdam. Các nhà phát triển có thể sẽ nhận được một số công cụ mới và nên xem xét việc sử dụng gas của họ:

- Tăng kích thước hợp đồng tối đa (hoặc EIP-7954) cho phép các nhà phát triển triển khai các ứng dụng lớn hơn, nâng giới hạn kích thước hợp đồng tối đa từ khoảng 24KiB lên 64KiB.
- Triển khai trước nhà máy xác định (hoặc EIP-7997) giới thiệu một hợp đồng nhà máy phổ quát, được tích hợp sẵn. Nó cho phép các nhà phát triển triển khai các ứng dụng và ví hợp đồng thông minh của họ đến cùng một địa chỉ chính xác trên tất cả các chuỗi EVM tham gia.
- Nếu ứng dụng của bạn dựa vào việc theo dõi phức tạp để tìm các khoản chuyển ETH, Các khoản chuyển và đốt ETH phát ra một nhật ký (hoặc EIP-7708) sẽ cho phép bạn chuyển sang sử dụng nhật ký để hạch toán đơn giản và đáng tin cậy hơn.
- Tăng chi phí gas tạo trạng thái (hoặc EIP-8037) và cập nhật chi phí gas truy cập trạng thái (hoặc EIP-8038) giới thiệu các mô hình bền vững mới sẽ thay đổi một số chi phí triển khai hợp đồng nhất định, vì việc tạo tài khoản mới hoặc lưu trữ vĩnh viễn sẽ có một khoản phí cố định được tiêu chuẩn hóa mới dựa trên kích thước của dữ liệu được tạo.

### Glamsterdam sẽ ảnh hưởng như thế nào đến yêu cầu lưu trữ và phần cứng của nút? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Nhiều EIP đang được xem xét cho Glamsterdam giải quyết vấn đề suy giảm hiệu suất của sự tăng trưởng trạng thái:

- Tăng chi phí gas tạo trạng thái (hoặc EIP-8037) giới thiệu một khuôn khổ chi phí cố định (CPSB) để nhắm mục tiêu tốc độ tăng trưởng cơ sở dữ liệu trạng thái là 120 GiB/năm, đảm bảo phần cứng vật lý tiêu chuẩn có thể tiếp tục chạy mạng lưới một cách hiệu quả.
- Danh sách biên lai khối một phần eth/70 (hoặc EIP-7975) cho phép các nút yêu cầu các biên lai khối được phân trang, giúp chia nhỏ các danh sách biên lai khối chứa nhiều dữ liệu thành các phần nhỏ hơn để ngăn chặn sự cố và đồng bộ hóa khi Ethereum mở rộng quy mô.
