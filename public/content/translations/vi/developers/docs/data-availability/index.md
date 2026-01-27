---
title: Tính khả dụng dữ liệu
description: Tổng quan về các vấn đề và giải pháp liên quan đến tính sẵn sàng của dữ liệu trong Ethereum
lang: vi
---

"Đừng tin tưởng, hãy xác minh" là một câu châm ngôn phổ biến trong Ethereum. Ý tưởng là nút của bạn có thể xác minh một cách độc lập rằng thông tin nó nhận được là chính xác bằng cách thực hiện tất cả các giao dịch trong các khối mà nó nhận được từ các máy ngang hàng để đảm bảo rằng các thay đổi được đề xuất khớp chính xác với các thay đổi được tính toán độc lập bởi nút. Điều này có nghĩa là các nút không cần phải tin rằng những người gửi khối là trung thực. Điều này là không thể nếu dữ liệu bị thiếu.

**Tính sẵn sàng của dữ liệu** đề cập đến sự tự tin mà người dùng có thể có rằng dữ liệu cần thiết để xác minh một khối thực sự có sẵn cho tất cả những người tham gia mạng. Đối với các nút đầy đủ trên Lớp 1 của Ethereum, điều này tương đối đơn giản; nút đầy đủ tải xuống một bản sao của tất cả dữ liệu trong mỗi khối - dữ liệu _phải_ có sẵn để có thể tải xuống. Một khối có dữ liệu bị thiếu sẽ bị loại bỏ thay vì được thêm vào chuỗi khối. Đây là "tính sẵn sàng của dữ liệu trên chuỗi" và là một tính năng của các chuỗi khối nguyên khối. Các nút đầy đủ không thể bị lừa để chấp nhận các giao dịch không hợp lệ vì chúng tự tải xuống và thực hiện mọi giao dịch. Tuy nhiên, đối với các chuỗi khối mô-đun, các rollup Lớp 2 và các ứng dụng khách nhẹ, bối cảnh về tính sẵn sàng của dữ liệu phức tạp hơn, đòi hỏi một số quy trình xác minh phức tạp hơn.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên có kiến thức tốt về [các nguyên tắc cơ bản của chuỗi khối](/developers/docs/intro-to-ethereum/), đặc biệt là [các cơ chế đồng thuận](/developers/docs/consensus-mechanisms/). Trang này cũng giả định rằng người đọc đã quen thuộc với [khối](/developers/docs/blocks/), [giao dịch](/developers/docs/transactions/), [nút](/developers/docs/nodes-and-clients/), [các giải pháp mở rộng](/developers/docs/scaling/) và các chủ đề liên quan khác.

## Vấn đề về tính sẵn sàng của dữ liệu {#the-data-availability-problem}

Vấn đề về tính sẵn sàng của dữ liệu là nhu cầu chứng minh cho toàn bộ mạng rằng dạng tóm tắt của một số dữ liệu giao dịch đang được thêm vào chuỗi khối thực sự đại diện cho một tập hợp các giao dịch hợp lệ, nhưng làm như vậy mà không yêu cầu tất cả các nút phải tải xuống tất cả dữ liệu. Dữ liệu giao dịch đầy đủ là cần thiết để xác minh các khối một cách độc lập, nhưng việc yêu cầu tất cả các nút tải xuống tất cả dữ liệu giao dịch là một rào cản đối với việc mở rộng. Các giải pháp cho vấn đề về tính sẵn sàng của dữ liệu nhằm cung cấp đủ sự đảm bảo rằng dữ liệu giao dịch đầy đủ đã được cung cấp để xác minh cho những người tham gia mạng không tự tải xuống và lưu trữ dữ liệu.

[Các nút nhẹ](/developers/docs/nodes-and-clients/light-clients) và [các rollup Lớp 2](/developers/docs/scaling) là những ví dụ quan trọng về những người tham gia mạng yêu cầu sự đảm bảo mạnh mẽ về tính sẵn sàng của dữ liệu nhưng không thể tự tải xuống và xử lý dữ liệu giao dịch. Việc tránh tải xuống dữ liệu giao dịch là điều làm cho các nút nhẹ trở nên nhẹ và cho phép các rollup trở thành giải pháp mở rộng hiệu quả.

Tính sẵn sàng của dữ liệu cũng là một mối quan tâm quan trọng đối với các ứng dụng khách Ethereum ["không trạng thái"](/roadmap/statelessness) trong tương lai không cần tải xuống và lưu trữ dữ liệu trạng thái để xác minh các khối. Các ứng dụng khách không trạng thái vẫn cần chắc chắn rằng dữ liệu có sẵn ở _đâu đó_ và đã được xử lý chính xác.

## Các giải pháp về tính sẵn sàng của dữ liệu {#data-availability-solutions}

### Lấy mẫu tính sẵn sàng của dữ liệu (DAS) {#data-availability-sampling}

Lấy mẫu tính sẵn sàng của dữ liệu (DAS) là một cách để mạng kiểm tra xem dữ liệu có sẵn hay không mà không gây quá nhiều áp lực cho bất kỳ nút riêng lẻ nào. Mỗi nút (bao gồm cả các nút không tham gia staking) tải xuống một tập hợp con nhỏ, được chọn ngẫu nhiên của tổng dữ liệu. Việc tải xuống thành công các mẫu xác nhận với độ tin cậy cao rằng tất cả dữ liệu đều có sẵn. Điều này dựa trên mã hóa xóa dữ liệu, giúp mở rộng một bộ dữ liệu nhất định với thông tin dự phòng (cách thực hiện điều này là điều chỉnh một hàm được gọi là _đa thức_ trên dữ liệu và đánh giá đa thức đó tại các điểm bổ sung). Điều này cho phép khôi phục dữ liệu gốc từ dữ liệu dự phòng khi cần thiết. Hệ quả của việc tạo dữ liệu này là nếu _bất kỳ_ dữ liệu gốc nào không có sẵn, _một nửa_ dữ liệu mở rộng sẽ bị thiếu! Lượng mẫu dữ liệu được mỗi nút tải xuống có thể được điều chỉnh để _cực kỳ_ có khả năng ít nhất một trong các mảnh dữ liệu được mỗi ứng dụng khách lấy mẫu sẽ bị thiếu _nếu_ thực sự có ít hơn một nửa dữ liệu.

DAS sẽ được sử dụng để đảm bảo các nhà khai thác rollup cung cấp dữ liệu giao dịch của họ sau khi [Full Danksharding](/roadmap/danksharding/#what-is-danksharding) được triển khai. Các nút Ethereum sẽ lấy mẫu ngẫu nhiên dữ liệu giao dịch được cung cấp trong các blob bằng cách sử dụng lược đồ dự phòng đã giải thích ở trên để đảm bảo rằng tất cả dữ liệu đều tồn tại. Kỹ thuật tương tự cũng có thể được sử dụng để đảm bảo các nhà sản xuất khối cung cấp tất cả dữ liệu của họ cho các ứng dụng khách nhẹ bảo mật. Tương tự, trong [tách biệt người đề xuất-người xây dựng](/roadmap/pbs), chỉ người xây dựng khối mới được yêu cầu xử lý toàn bộ khối - các trình xác thực khác sẽ xác minh bằng cách lấy mẫu tính sẵn sàng của dữ liệu.

### Các ủy ban về tính sẵn sàng của dữ liệu {#data-availability-committees}

Các Ủy ban về tính sẵn sàng của dữ liệu (DAC) là các bên đáng tin cậy cung cấp hoặc chứng thực tính sẵn sàng của dữ liệu. Các DAC có thể được sử dụng thay cho, [hoặc kết hợp với](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. Các đảm bảo bảo mật đi kèm với các ủy ban phụ thuộc vào thiết lập cụ thể. Ví dụ: Ethereum sử dụng các tập hợp con được lấy mẫu ngẫu nhiên của các trình xác thực để chứng thực tính sẵn sàng của dữ liệu cho các nút nhẹ.

DAC cũng được một số validium sử dụng. DAC là một tập hợp các nút đáng tin cậy lưu trữ các bản sao dữ liệu ngoài chuỗi. DAC được yêu cầu cung cấp dữ liệu trong trường hợp có tranh chấp. Các thành viên của DAC cũng công bố các chứng thực trên chuỗi để chứng minh rằng dữ liệu đã nói thực sự có sẵn. Một số validium thay thế DAC bằng hệ thống trình xác thực bằng chứng cổ phần (PoS). Ở đây, bất kỳ ai cũng có thể trở thành trình xác thực và lưu trữ dữ liệu ngoài chuỗi. Tuy nhiên, họ phải cung cấp một “khoản ký quỹ”, được gửi vào một hợp đồng thông minh. Trong trường hợp có hành vi độc hại, chẳng hạn như trình xác thực giữ lại dữ liệu, khoản ký quỹ có thể bị phạt. Các ủy ban về tính sẵn sàng của dữ liệu bằng chứng cổ phần an toàn hơn đáng kể so với các DAC thông thường vì chúng trực tiếp khuyến khích hành vi trung thực.

## Tính sẵn sàng của dữ liệu và các nút nhẹ {#data-availability-and-light-nodes}

[Các nút nhẹ](/developers/docs/nodes-and-clients/light-clients) cần xác thực tính chính xác của các tiêu đề khối mà chúng nhận được mà không cần tải xuống dữ liệu khối. Cái giá của sự nhẹ nhàng này là không có khả năng xác minh độc lập các tiêu đề khối bằng cách thực hiện lại các giao dịch cục bộ theo cách mà các nút đầy đủ thực hiện.

Các nút nhẹ của Ethereum tin tưởng các bộ ngẫu nhiên gồm 512 trình xác thực đã được chỉ định cho một _ủy ban đồng bộ hóa_. Ủy ban đồng bộ hóa hoạt động như một DAC báo hiệu cho các ứng dụng khách nhẹ rằng dữ liệu trong tiêu đề là chính xác bằng cách sử dụng chữ ký mật mã. Hàng ngày, ủy ban đồng bộ hóa sẽ làm mới. Mỗi tiêu đề khối cảnh báo các nút nhẹ về việc trình xác thực nào sẽ ký vào khối _tiếp theo_, vì vậy chúng không thể bị lừa để tin tưởng một nhóm độc hại giả vờ là ủy ban đồng bộ hóa thực sự.

Tuy nhiên, điều gì sẽ xảy ra nếu một kẻ tấn công bằng cách nào đó _thực sự_ quản lý để chuyển một tiêu đề khối độc hại cho các ứng dụng khách nhẹ và thuyết phục họ rằng nó đã được ký bởi một ủy ban đồng bộ hóa trung thực? Trong trường hợp đó, kẻ tấn công có thể bao gồm các giao dịch không hợp lệ và ứng dụng khách nhẹ sẽ chấp nhận chúng một cách mù quáng, vì chúng không kiểm tra độc lập tất cả các thay đổi trạng thái được tóm tắt trong tiêu đề khối. Để bảo vệ chống lại điều này, ứng dụng khách nhẹ có thể sử dụng các bằng chứng gian lận.

Cách các bằng chứng gian lận này hoạt động là một nút đầy đủ, khi thấy một quá trình chuyển đổi trạng thái không hợp lệ được lan truyền trên mạng, có thể nhanh chóng tạo ra một mẩu dữ liệu nhỏ chứng minh rằng một quá trình chuyển đổi trạng thái được đề xuất không thể phát sinh từ một tập hợp giao dịch nhất định và phát sóng dữ liệu đó cho các máy ngang hàng. Các nút nhẹ có thể nhận các bằng chứng gian lận đó và sử dụng chúng để loại bỏ các tiêu đề khối xấu, đảm bảo chúng ở trên cùng một chuỗi trung thực với các nút đầy đủ.

Điều này dựa vào việc các nút đầy đủ có quyền truy cập vào dữ liệu giao dịch đầy đủ. Một kẻ tấn công phát sóng một tiêu đề khối xấu và cũng không cung cấp dữ liệu giao dịch sẽ có thể ngăn các nút đầy đủ tạo ra các bằng chứng gian lận. Các nút đầy đủ có thể có thể báo hiệu một cảnh báo về một khối xấu, nhưng chúng không thể sao lưu cảnh báo của mình bằng bằng chứng, vì dữ liệu không được cung cấp để tạo ra bằng chứng từ đó!

Giải pháp cho vấn đề về tính sẵn sàng của dữ liệu này là DAS. Các nút nhẹ tải xuống các phần ngẫu nhiên rất nhỏ của dữ liệu trạng thái đầy đủ và sử dụng các mẫu để xác minh rằng bộ dữ liệu đầy đủ có sẵn. Xác suất thực tế của việc giả định sai về tính sẵn sàng của dữ liệu đầy đủ sau khi tải xuống N phần ngẫu nhiên có thể được tính toán ([đối với 100 phần, xác suất là 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), tức là cực kỳ khó xảy ra).

Ngay cả trong kịch bản này, các cuộc tấn công chỉ giữ lại một vài byte cũng có thể không bị các ứng dụng khách đưa ra yêu cầu dữ liệu ngẫu nhiên phát hiện. Mã hóa xóa khắc phục điều này bằng cách tái tạo lại các mẩu dữ liệu bị thiếu nhỏ có thể được sử dụng để kiểm tra các thay đổi trạng thái được đề xuất. Sau đó, một bằng chứng gian lận có thể được xây dựng bằng cách sử dụng dữ liệu được tái tạo, ngăn chặn các nút nhẹ chấp nhận các tiêu đề xấu.

**Lưu ý:** DAS và bằng chứng gian lận vẫn chưa được triển khai cho các ứng dụng khách nhẹ Ethereum bằng chứng cổ phần, nhưng chúng có trong lộ trình, rất có thể sẽ ở dạng bằng chứng dựa trên ZK-SNARK. Các ứng dụng khách nhẹ ngày nay dựa vào một dạng DAC: chúng xác minh danh tính của ủy ban đồng bộ hóa và sau đó tin tưởng vào các tiêu đề khối đã ký mà chúng nhận được.

## Tính sẵn sàng của dữ liệu và các rollup Lớp 2 {#data-availability-and-layer-2-rollups}

[Các giải pháp mở rộng Lớp 2](/layer-2/), chẳng hạn như [rollup](/glossary/#rollups), giảm chi phí giao dịch và tăng thông lượng của Ethereum bằng cách xử lý các giao dịch ngoài chuỗi. Các giao dịch rollup được nén và đăng lên Ethereum theo lô. Các lô đại diện cho hàng nghìn giao dịch ngoài chuỗi riêng lẻ trong một giao dịch duy nhất trên Ethereum. Điều này làm giảm tắc nghẽn trên lớp cơ sở và giảm phí cho người dùng.

Tuy nhiên, chỉ có thể tin tưởng các giao dịch 'tóm tắt' được đăng lên Ethereum nếu sự thay đổi trạng thái được đề xuất có thể được xác minh và xác nhận một cách độc lập là kết quả của việc áp dụng tất cả các giao dịch ngoài chuỗi riêng lẻ. Nếu các nhà khai thác rollup không cung cấp dữ liệu giao dịch để xác minh này, thì họ có thể gửi dữ liệu không chính xác đến Ethereum.

[Gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups/) đăng dữ liệu giao dịch nén lên Ethereum và đợi một khoảng thời gian (thường là 7 ngày) để cho phép các trình xác minh độc lập kiểm tra dữ liệu. Nếu bất kỳ ai xác định được vấn đề, họ có thể tạo ra một bằng chứng gian lận và sử dụng nó để thách thức rollup. Điều này sẽ khiến chuỗi quay trở lại và bỏ qua khối không hợp lệ. Điều này chỉ có thể thực hiện được nếu dữ liệu có sẵn. Hiện tại, có hai cách mà các gộp giao dịch lạc quan đăng dữ liệu giao dịch lên L1. Một số rollup cung cấp dữ liệu vĩnh viễn dưới dạng `CALLDATA`, tồn tại vĩnh viễn trên chuỗi. Với việc triển khai EIP-4844, một số rollup thay vào đó đăng dữ liệu giao dịch của họ vào bộ lưu trữ blob rẻ hơn. Đây không phải là bộ lưu trữ vĩnh viễn. Các trình xác minh độc lập phải truy vấn các blob và đưa ra các thách thức của họ trong vòng ~18 ngày trước khi dữ liệu bị xóa khỏi lớp 1 của Ethereum. Tính sẵn sàng của dữ liệu chỉ được đảm bảo bởi giao thức Ethereum trong khoảng thời gian cố định ngắn đó. Sau đó, nó trở thành trách nhiệm của các thực thể khác trong hệ sinh thái Ethereum. Bất kỳ nút nào cũng có thể xác minh tính sẵn sàng của dữ liệu bằng cách sử dụng DAS, tức là bằng cách tải xuống các mẫu dữ liệu blob nhỏ, ngẫu nhiên.

[Các rollup không kiến thức (ZK)](/developers/docs/scaling/zk-rollups) không cần đăng dữ liệu giao dịch vì [các bằng chứng hợp lệ không kiến thức](/glossary/#zk-proof) đảm bảo tính chính xác của các quá trình chuyển đổi trạng thái. Tuy nhiên, tính sẵn sàng của dữ liệu vẫn là một vấn đề vì chúng ta không thể đảm bảo chức năng của ZK-rollup (hoặc tương tác với nó) mà không có quyền truy cập vào dữ liệu trạng thái của nó. Ví dụ: người dùng không thể biết số dư của mình nếu một nhà khai thác giữ lại thông tin chi tiết về trạng thái của rollup. Ngoài ra, họ không thể thực hiện cập nhật trạng thái bằng cách sử dụng thông tin có trong một khối mới được thêm vào.

## Tính sẵn sàng của dữ liệu so với khả năng truy xuất dữ liệu {#data-availability-vs-data-retrievability}

Tính sẵn sàng của dữ liệu khác với khả năng truy xuất dữ liệu. Tính sẵn sàng của dữ liệu là sự đảm bảo rằng các nút đầy đủ đã có thể truy cập và xác minh toàn bộ tập hợp các giao dịch liên quan đến một khối cụ thể. Điều đó không nhất thiết có nghĩa là dữ liệu có thể truy cập được mãi mãi.

Khả năng truy xuất dữ liệu là khả năng các nút truy xuất _thông tin lịch sử_ từ chuỗi khối. Dữ liệu lịch sử này không cần thiết để xác minh các khối mới, nó chỉ được yêu cầu để đồng bộ hóa các nút đầy đủ từ khối khởi nguyên hoặc phục vụ các yêu cầu lịch sử cụ thể.

Giao thức cốt lõi của Ethereum chủ yếu quan tâm đến tính sẵn sàng của dữ liệu, không phải khả năng truy xuất dữ liệu. Khả năng truy xuất dữ liệu có thể được cung cấp bởi một số lượng nhỏ các nút lưu trữ do bên thứ ba điều hành, hoặc nó có thể được phân phối trên toàn mạng bằng cách sử dụng lưu trữ tệp phi tập trung như [Mạng Portal](https://www.ethportal.net/).

## Đọc thêm {#further-reading}

- [Tính sẵn sàng của dữ liệu là cái quái gì?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Tính sẵn sàng của dữ liệu là gì?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [Giới thiệu cơ bản về kiểm tra tính sẵn sàng của dữ liệu](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Giải thích về đề xuất phân mảnh + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Lưu ý về tính sẵn sàng của dữ liệu và mã hóa xóa](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Các ủy ban về tính sẵn sàng của dữ liệu.](https://medium.com/starkware/data-availability-e5564c416424)
- [Các ủy ban về tính sẵn sàng của dữ liệu bằng chứng cổ phần.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Các giải pháp cho vấn đề truy xuất dữ liệu](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Tính sẵn sàng của dữ liệu hoặc: Các rollup đã học cách ngừng lo lắng và yêu Ethereum như thế nào](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Tăng chi phí Calldata](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)
