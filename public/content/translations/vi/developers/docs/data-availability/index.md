---
title: Tính khả dụng của dữ liệu
description: Tổng quan về các vấn đề và giải pháp liên quan đến tính khả dụng của dữ liệu trên Ethereum
lang: vi
---

"Đừng tin tưởng, hãy xác minh" là một châm ngôn phổ biến trên Ethereum. Ý tưởng là nút của bạn có thể xác minh độc lập rằng thông tin nó nhận được là chính xác bằng cách thực thi tất cả các giao dịch trong các khối mà chúng nhận được từ các nút ngang hàng để đảm bảo rằng các thay đổi được đề xuất khớp chính xác với những thay đổi được tính toán độc lập bởi nút. Điều này có nghĩa là các nút không cần phải tin tưởng rằng người gửi khối là trung thực. Điều này là không thể nếu dữ liệu bị thiếu.

**Tính khả dụng của dữ liệu** đề cập đến sự tự tin mà người dùng có thể có rằng dữ liệu cần thiết để xác minh một khối thực sự có sẵn cho tất cả những người tham gia mạng lưới. Đối với các nút đầy đủ trên lớp 1 (l1) của [Ethereum](/), điều này tương đối đơn giản; nút đầy đủ tải xuống một bản sao của tất cả dữ liệu trong mỗi khối - dữ liệu _phải_ có sẵn để có thể tải xuống. Một khối bị thiếu dữ liệu sẽ bị loại bỏ thay vì được thêm vào Chuỗi khối. Đây là "tính khả dụng của dữ liệu trên chuỗi" và nó là một tính năng của các Chuỗi khối nguyên khối. Các nút đầy đủ không thể bị lừa chấp nhận các giao dịch không hợp lệ vì chúng tự tải xuống và thực thi mọi giao dịch. Tuy nhiên, đối với các Chuỗi khối mô-đun, các bản cuộn lớp 2 (l2) và máy khách nhẹ, bối cảnh tính khả dụng của dữ liệu phức tạp hơn, yêu cầu một số quy trình xác minh tinh vi hơn.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên có hiểu biết tốt về [các nguyên tắc cơ bản của Chuỗi khối](/developers/docs/intro-to-ethereum/), đặc biệt là [các cơ chế đồng thuận](/developers/docs/consensus-mechanisms/). Trang này cũng giả định rằng người đọc đã quen thuộc với [các khối](/developers/docs/blocks/), [các giao dịch](/developers/docs/transactions/), [các nút](/developers/docs/nodes-and-clients/), [các giải pháp mở rộng quy mô](/developers/docs/scaling/) và các chủ đề liên quan khác.

## Vấn đề về tính khả dụng của dữ liệu {#the-data-availability-problem}

Vấn đề về tính khả dụng của dữ liệu là nhu cầu chứng minh cho toàn bộ mạng lưới rằng dạng tóm tắt của một số dữ liệu giao dịch đang được thêm vào Chuỗi khối thực sự đại diện cho một tập hợp các giao dịch hợp lệ, nhưng làm như vậy mà không yêu cầu tất cả các nút phải tải xuống toàn bộ dữ liệu. Dữ liệu giao dịch đầy đủ là cần thiết để xác minh độc lập các khối, nhưng việc yêu cầu tất cả các nút tải xuống toàn bộ dữ liệu giao dịch là một rào cản đối với việc mở rộng quy mô. Các giải pháp cho vấn đề tính khả dụng của dữ liệu nhằm mục đích cung cấp đủ sự đảm bảo rằng dữ liệu giao dịch đầy đủ đã được cung cấp để xác minh cho những người tham gia mạng lưới không tự tải xuống và lưu trữ dữ liệu.

[Các nút nhẹ](/developers/docs/nodes-and-clients/light-clients) và [các bản cuộn lớp 2 (l2)](/developers/docs/scaling) là những ví dụ quan trọng về những người tham gia mạng lưới yêu cầu sự đảm bảo mạnh mẽ về tính khả dụng của dữ liệu nhưng không thể tự tải xuống và xử lý dữ liệu giao dịch. Việc tránh tải xuống dữ liệu giao dịch là điều làm cho các nút nhẹ trở nên nhẹ và cho phép các bản cuộn trở thành các giải pháp mở rộng quy mô hiệu quả.

Tính khả dụng của dữ liệu cũng là một mối quan tâm quan trọng đối với các máy khách Ethereum ["phi trạng thái"](/roadmap/statelessness) trong tương lai, những máy khách không cần tải xuống và lưu trữ dữ liệu trạng thái để xác minh các khối. Các máy khách phi trạng thái vẫn cần phải chắc chắn rằng dữ liệu có sẵn ở _đâu đó_ và nó đã được xử lý chính xác.

## Các giải pháp về tính khả dụng của dữ liệu {#data-availability-solutions}

### Lấy mẫu tính khả dụng của dữ liệu (DAS) {#data-availability-sampling}

Lấy mẫu tính khả dụng của dữ liệu (DAS) là một cách để mạng lưới kiểm tra xem dữ liệu có sẵn hay không mà không gây quá nhiều áp lực lên bất kỳ nút riêng lẻ nào. Mỗi nút (bao gồm cả các nút không đặt cọc) tải xuống một tập hợp con nhỏ, được chọn ngẫu nhiên của tổng dữ liệu. Việc tải xuống thành công các mẫu xác nhận với độ tin cậy cao rằng tất cả dữ liệu đều có sẵn. Điều này dựa trên mã hóa xóa dữ liệu, giúp mở rộng một tập dữ liệu nhất định với thông tin dư thừa (cách thực hiện điều này là khớp một hàm được gọi là _đa thức_ trên dữ liệu và đánh giá đa thức đó tại các điểm bổ sung). Điều này cho phép khôi phục dữ liệu gốc từ dữ liệu dư thừa khi cần thiết. Hệ quả của việc tạo dữ liệu này là nếu _bất kỳ_ dữ liệu gốc nào không có sẵn, _một nửa_ dữ liệu mở rộng sẽ bị thiếu! Lượng mẫu dữ liệu được tải xuống bởi mỗi nút có thể được điều chỉnh sao cho _cực kỳ_ có khả năng ít nhất một trong các đoạn dữ liệu được lấy mẫu bởi mỗi máy khách sẽ bị thiếu _nếu_ chưa đến một nửa dữ liệu thực sự có sẵn.

DAS sẽ được sử dụng để đảm bảo các nhà điều hành Rollup cung cấp dữ liệu giao dịch của họ sau khi [danksharding toàn phần](/roadmap/danksharding/#what-is-danksharding) được triển khai. Các nút Ethereum sẽ lấy mẫu ngẫu nhiên dữ liệu giao dịch được cung cấp trong các khối dữ liệu bằng cách sử dụng sơ đồ dự phòng được giải thích ở trên để đảm bảo rằng tất cả dữ liệu đều tồn tại. Kỹ thuật tương tự cũng có thể được sử dụng để đảm bảo các nhà sản xuất khối đang cung cấp tất cả dữ liệu của họ để bảo mật cho các máy khách nhẹ. Tương tự, theo [tách biệt người đề xuất và người xây dựng (PBS)](/roadmap/pbs), chỉ trình tạo block mới được yêu cầu xử lý toàn bộ khối - các trình xác thực khác sẽ xác minh bằng cách sử dụng lấy mẫu tính khả dụng của dữ liệu.

### Các ủy ban tính khả dụng của dữ liệu {#data-availability-committees}

Các ủy ban tính khả dụng của dữ liệu (DAC) là các bên đáng tin cậy cung cấp hoặc chứng thực tính khả dụng của dữ liệu. DAC có thể được sử dụng thay thế cho, [hoặc kết hợp với](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. Các đảm bảo bảo mật đi kèm với các ủy ban phụ thuộc vào thiết lập cụ thể. Ví dụ, Ethereum sử dụng các tập hợp con trình xác thực được lấy mẫu ngẫu nhiên để chứng thực tính khả dụng của dữ liệu cho các nút nhẹ.

DAC cũng được sử dụng bởi một số validium. DAC là một tập hợp các nút đáng tin cậy lưu trữ các bản sao dữ liệu ngoại tuyến. DAC được yêu cầu cung cấp dữ liệu trong trường hợp có tranh chấp. Các thành viên của DAC cũng công bố các chứng thực trên chuỗi để chứng minh rằng dữ liệu nói trên thực sự có sẵn. Một số validium thay thế DAC bằng hệ thống trình xác thực Bằng chứng cổ phần (PoS). Ở đây, bất kỳ ai cũng có thể trở thành trình xác thực và lưu trữ dữ liệu ngoài chuỗi. Tuy nhiên, họ phải cung cấp một "khoản tiền gửi", được gửi vào một hợp đồng thông minh. Trong trường hợp có hành vi độc hại, chẳng hạn như trình xác thực giữ lại dữ liệu, khoản tiền gửi có thể bị phạt cắt giảm. Các ủy ban tính khả dụng của dữ liệu Bằng chứng cổ phần an toàn hơn đáng kể so với các DAC thông thường vì chúng trực tiếp khuyến khích hành vi trung thực.

## Tính khả dụng của dữ liệu và các nút nhẹ {#data-availability-and-light-nodes}

[Các nút nhẹ](/developers/docs/nodes-and-clients/light-clients) cần xác thực tính chính xác của các tiêu đề block mà chúng nhận được mà không cần tải xuống dữ liệu khối. Cái giá của sự nhẹ nhàng này là không thể xác minh độc lập các tiêu đề block bằng cách thực thi lại các giao dịch cục bộ theo cách mà các nút đầy đủ làm.

Các nút nhẹ Ethereum tin tưởng vào các tập hợp ngẫu nhiên gồm 512 trình xác thực đã được chỉ định vào một _ủy ban đồng bộ_. Ủy ban đồng bộ hoạt động như một DAC báo hiệu cho các máy khách nhẹ rằng dữ liệu trong tiêu đề là chính xác bằng cách sử dụng chữ ký mật mã. Mỗi ngày, ủy ban đồng bộ sẽ làm mới. Mỗi tiêu đề block cảnh báo các nút nhẹ về việc những trình xác thực nào dự kiến sẽ ký xác nhận khối _tiếp theo_, vì vậy chúng không thể bị lừa tin tưởng vào một nhóm độc hại giả vờ là ủy ban đồng bộ thực sự.

Tuy nhiên, điều gì sẽ xảy ra nếu một kẻ tấn công bằng cách nào đó _thực sự_ xoay sở để chuyển một tiêu đề block độc hại cho các máy khách nhẹ và thuyết phục chúng rằng nó đã được ký xác nhận bởi một ủy ban đồng bộ trung thực? Trong trường hợp đó, kẻ tấn công có thể bao gồm các giao dịch không hợp lệ và máy khách nhẹ sẽ mù quáng chấp nhận chúng, vì chúng không kiểm tra độc lập tất cả các thay đổi trạng thái được tóm tắt trong tiêu đề block. Để bảo vệ chống lại điều này, máy khách nhẹ có thể sử dụng bằng chứng gian lận.

Cách thức hoạt động của các bằng chứng gian lận này là một nút đầy đủ, khi thấy một quá trình chuyển đổi trạng thái không hợp lệ đang được lan truyền trên mạng lưới, có thể nhanh chóng tạo ra một phần dữ liệu nhỏ chứng minh rằng một quá trình chuyển đổi trạng thái được đề xuất không thể phát sinh từ một tập hợp các giao dịch nhất định và phát dữ liệu đó cho các nút ngang hàng. Các nút nhẹ có thể nhận các bằng chứng gian lận đó và sử dụng chúng để loại bỏ các tiêu đề block xấu, đảm bảo chúng ở trên cùng một Chuỗi trung thực như các nút đầy đủ.

Điều này dựa trên việc các nút đầy đủ có quyền truy cập vào dữ liệu giao dịch đầy đủ. Một kẻ tấn công phát một tiêu đề block xấu và cũng không cung cấp dữ liệu giao dịch sẽ có thể ngăn các nút đầy đủ tạo ra bằng chứng gian lận. Các nút đầy đủ có thể báo hiệu cảnh báo về một khối xấu, nhưng chúng không thể hỗ trợ cảnh báo của mình bằng bằng chứng, bởi vì dữ liệu không được cung cấp để tạo ra bằng chứng!

Giải pháp cho vấn đề tính khả dụng của dữ liệu này là DAS. Các nút nhẹ tải xuống các đoạn ngẫu nhiên rất nhỏ của dữ liệu trạng thái đầy đủ và sử dụng các mẫu để xác minh rằng toàn bộ tập dữ liệu có sẵn. Khả năng thực tế của việc giả định sai tính khả dụng của dữ liệu đầy đủ sau khi tải xuống N đoạn ngẫu nhiên có thể được tính toán ([đối với 100 đoạn, cơ hội là 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), tức là cực kỳ khó xảy ra).

Ngay cả trong kịch bản này, các cuộc tấn công giữ lại chỉ một vài byte có thể không bị chú ý bởi các máy khách thực hiện các yêu cầu dữ liệu ngẫu nhiên. Mã hóa xóa khắc phục điều này bằng cách tái tạo lại các phần dữ liệu nhỏ bị thiếu có thể được sử dụng để kiểm tra các thay đổi trạng thái được đề xuất. Sau đó, một bằng chứng gian lận có thể được xây dựng bằng cách sử dụng dữ liệu được tái tạo lại, ngăn các nút nhẹ chấp nhận các tiêu đề xấu.

**Lưu ý:** DAS và bằng chứng gian lận vẫn chưa được triển khai cho các máy khách nhẹ Ethereum Bằng chứng cổ phần (PoS), nhưng chúng nằm trong lộ trình, rất có thể dưới dạng các bằng chứng dựa trên ZK-SNARK. Các máy khách nhẹ ngày nay dựa vào một dạng DAC: chúng xác minh danh tính của ủy ban đồng bộ và sau đó tin tưởng vào các tiêu đề block đã ký mà chúng nhận được.

## Tính khả dụng của dữ liệu và các bản cuộn lớp 2 (l2) {#data-availability-and-layer-2-rollups}

[Các giải pháp mở rộng quy mô lớp 2 (l2)](/layer-2/), chẳng hạn như [các bản cuộn](/glossary/#rollups), giảm chi phí giao dịch và tăng thông lượng của Ethereum bằng cách xử lý các giao dịch ngoài chuỗi. Các giao dịch Rollup được nén và đăng trên Ethereum theo từng đợt. Các đợt đại diện cho hàng ngàn giao dịch ngoài chuỗi riêng lẻ trong một giao dịch duy nhất trên Ethereum. Điều này làm giảm tắc nghẽn trên lớp cơ sở và giảm phí cho người dùng.

Tuy nhiên, chỉ có thể tin tưởng vào các giao dịch 'tóm tắt' được đăng lên Ethereum nếu thay đổi trạng thái được đề xuất có thể được xác minh độc lập và được xác nhận là kết quả của việc áp dụng tất cả các giao dịch ngoài chuỗi riêng lẻ. Nếu các nhà điều hành Rollup không cung cấp dữ liệu giao dịch cho việc xác minh này, thì họ có thể gửi dữ liệu không chính xác đến Ethereum.

[Các bản cuộn Optimistic](/developers/docs/scaling/optimistic-rollups/) đăng dữ liệu giao dịch đã nén lên Ethereum và đợi một khoảng thời gian (thường là 7 ngày) để cho phép các trình xác minh độc lập kiểm tra dữ liệu. Nếu bất kỳ ai xác định được vấn đề, họ có thể tạo ra bằng chứng gian lận và sử dụng nó để thách thức bản cuộn. Điều này sẽ khiến Chuỗi quay ngược lại và bỏ qua khối không hợp lệ. Điều này chỉ có thể thực hiện được nếu dữ liệu có sẵn. Hiện tại, có hai cách mà các bản cuộn Optimistic đăng dữ liệu giao dịch lên lớp 1 (l1). Một số bản cuộn làm cho dữ liệu có sẵn vĩnh viễn dưới dạng `CALLDATA` tồn tại vĩnh viễn trên chuỗi. Với việc triển khai EIP-4844, một số bản cuộn thay vào đó đăng dữ liệu giao dịch của họ lên bộ lưu trữ khối dữ liệu rẻ hơn. Đây không phải là bộ lưu trữ vĩnh viễn. Các trình xác minh độc lập phải truy vấn các khối dữ liệu và đưa ra các thách thức của họ trong vòng ~18 ngày trước khi dữ liệu bị xóa khỏi lớp 1 (l1) của Ethereum. Tính khả dụng của dữ liệu chỉ được đảm bảo bởi Giao thức Ethereum trong khoảng thời gian cố định ngắn đó. Sau đó, nó trở thành trách nhiệm của các thực thể khác trong hệ sinh thái Ethereum. Bất kỳ nút nào cũng có thể xác minh tính khả dụng của dữ liệu bằng cách sử dụng DAS, tức là bằng cách tải xuống các mẫu nhỏ, ngẫu nhiên của dữ liệu khối dữ liệu.

[Các bản cuộn không tri thức (ZK)](/developers/docs/scaling/zk-rollups) không cần đăng dữ liệu giao dịch vì [các bằng chứng hợp lệ không tri thức](/glossary/#zk-proof) đảm bảo tính chính xác của các quá trình chuyển đổi trạng thái. Tuy nhiên, tính khả dụng của dữ liệu vẫn là một vấn đề vì chúng ta không thể đảm bảo chức năng của ZK-rollup (hoặc tương tác với nó) mà không có quyền truy cập vào dữ liệu trạng thái của nó. Ví dụ, người dùng không thể biết số dư của họ nếu một nhà điều hành giữ lại thông tin chi tiết về trạng thái của bản cuộn. Ngoài ra, họ không thể thực hiện cập nhật trạng thái bằng cách sử dụng thông tin có trong một khối mới được thêm vào.

## Tính khả dụng của dữ liệu so với khả năng truy xuất dữ liệu {#data-availability-vs-data-retrievability}

Tính khả dụng của dữ liệu khác với khả năng truy xuất dữ liệu. Tính khả dụng của dữ liệu là sự đảm bảo rằng các nút đầy đủ đã có thể truy cập và xác minh toàn bộ tập hợp các giao dịch được liên kết với một khối cụ thể. Điều đó không nhất thiết có nghĩa là dữ liệu có thể truy cập được mãi mãi.

Khả năng truy xuất dữ liệu là khả năng của các nút để truy xuất _thông tin lịch sử_ từ Chuỗi khối. Dữ liệu lịch sử này không cần thiết để xác minh các khối mới, nó chỉ được yêu cầu để đồng bộ hóa các nút đầy đủ từ khối nguyên thủy hoặc phục vụ các yêu cầu lịch sử cụ thể.

Giao thức Ethereum cốt lõi chủ yếu quan tâm đến tính khả dụng của dữ liệu, không phải khả năng truy xuất dữ liệu. Khả năng truy xuất dữ liệu có thể được cung cấp bởi một số lượng nhỏ các nút lưu trữ do các bên thứ ba chạy, hoặc nó có thể được phân phối trên toàn mạng lưới bằng cách sử dụng lưu trữ tệp phi tập trung chẳng hạn như [Portal Network](https://www.ethportal.net/).

## Đọc thêm {#further-reading}

- [Tính khả dụng của dữ liệu là gì?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [Tính khả dụng của dữ liệu là gì?](https://coinmarketcap.com/academy/article/what-is-data-availability)
- [Kiến thức cơ bản về kiểm tra tính khả dụng của dữ liệu](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Giải thích về đề xuất phân mảnh + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Lưu ý về tính khả dụng của dữ liệu và mã hóa xóa](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Các ủy ban tính khả dụng của dữ liệu.](https://medium.com/starkware/data-availability-e5564c416424)
- [Các ủy ban tính khả dụng của dữ liệu Bằng chứng cổ phần.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Các giải pháp cho vấn đề khả năng truy xuất dữ liệu](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
- [Tính khả dụng của dữ liệu hay: Cách các bản cuộn học cách ngừng lo lắng và yêu Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [EIP-7623: Tăng chi phí dữ liệu lệnh gọi](https://web.archive.org/web/20250515194659/https://research.2077.xyz/eip-7623-increase-calldata-cost)