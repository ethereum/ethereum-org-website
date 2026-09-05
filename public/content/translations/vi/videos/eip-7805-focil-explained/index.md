---
title: "EIP-7805: Danh sách bao gồm được thực thi bằng lựa chọn phân nhánh (FOCIL)"
description: "Các nhà nghiên cứu Ethereum Thomas Thiery và Julian Ma trình bày chi tiết về EIP-7805 (FOCIL), sử dụng các danh sách bao gồm cục bộ được tổng hợp để đảm bảo rằng các giao dịch hợp lệ không thể bị kiểm duyệt bởi các trình tạo block."
lang: vi
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Tập 141 của **PEEPanEIP** do Ethereum Cat Herders thực hiện. Người dẫn chương trình Pooja Ranjan cùng với **Thomas Thiery** và **Julian Ma**, các nhà nghiên cứu thuộc Nhóm Khuyến khích Mạnh mẽ (Robust Incentives Group) tại Tổ chức Ethereum và là đồng tác giả của [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805), để giải thích về Danh sách bao gồm được thực thi bằng lựa chọn phân nhánh (FOCIL): lý do tại sao Ethereum cần khả năng chống kiểm duyệt ở cấp độ giao thức, cơ chế hoạt động của nó và tình hình triển khai hiện tại.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=cUGyLx-mf6I) được xuất bản bởi Ethereum Cat Herders. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

### Giới thiệu (0:35) {#introduction-035}

**Pooja Ranjan:** Xin chào và chào mừng đến với PEEPanEIP, chương trình duy nhất nơi chúng ta tìm hiểu sâu về các Đề xuất Cải tiến Ethereum và khám phá tác động của chúng đối với hệ sinh thái. Đây là tập 141, được mang đến cho bạn bởi Ethereum Cat Herders. Tôi là người dẫn chương trình của bạn, Pooja Ranjan, và hôm nay chúng ta sẽ nói về EIP-7805, Danh sách Bao gồm được thực thi bằng Lựa chọn phân nhánh.

Được ghi nhận vào tháng 11 năm 2024, EIP-7805 là một đề xuất cốt lõi theo lộ trình tiêu chuẩn hiện đang ở trạng thái bản nháp. Đề xuất này nhằm mục đích cho phép một ủy ban các trình xác thực bắt buộc bao gồm một tập hợp các giao dịch trong mỗi khối. Được đồng tác giả bởi Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann và Jihoon Song, đề xuất này đang được thảo luận tích cực cho một bản nâng cấp trong tương lai.

Trong tập này, chúng ta sẽ khám phá các chi tiết của EIP-7805, những ý nghĩa của nó và tác động tiềm năng của nó đối với hệ sinh thái Ethereum. Để nói thêm về đề xuất này, chúng ta có sự tham gia của Thomas Thiery và Julian Ma. Chào mừng đến với PEEPanEIP.

**Thomas Thiery:** Cảm ơn vì đã mời chúng tôi.

**Julian Ma:** Vâng, cảm ơn rất nhiều vì đã mời chúng tôi.

**Pooja Ranjan:** Chúng tôi rất hào hứng muốn tìm hiểu về tổng quan của đề xuất, vị trí hiện tại của nó và bao lâu nữa chúng ta có thể thấy nó trên Mạng chính Ethereum. Nhưng trước khi bắt đầu, cộng đồng của chúng tôi rất thích làm quen với các nhà nghiên cứu và nhà phát triển đứng sau công việc này. Các bạn có thể chia sẻ một chút về bản thân, dự án mà các bạn hiện đang tham gia và hành trình của các bạn trong hệ sinh thái Ethereum không?

### Giới thiệu khách mời (2:14) {#guest-introductions-214}

**Julian Ma:** Chắc chắn rồi, tôi có thể bắt đầu trước. Tôi là Julian, một nhà nghiên cứu tại Robust Incentives Group, giống như Thomas, tại Tổ chức Ethereum. Robust Incentives Group quan tâm đến khía cạnh kinh tế của giao thức một cách rất rộng rãi. Một số người trong chúng tôi đã và đang xem xét các cơ chế phí giao dịch, như EIP-1559, và những người khác thì đang xem xét các cuộc tấn công lớp đồng thuận, chủ yếu là những cuộc tấn công được thúc đẩy bởi các động lực kinh tế.

Về phần mình, tôi bắt đầu với một kỳ thực tập nghiên cứu về các công cụ phái sinh phí cơ sở, và sau đó tôi tham gia làm việc toàn thời gian. Tôi chủ yếu làm việc về tách biệt người đề xuất và người xây dựng (PBS) và các chủ đề liên quan đến MEV, và hiện tại tôi đang tập trung vào các danh sách đưa vào (inclusion lists) thông qua FOCIL với EIP này, và mong chờ sự tách biệt giữa người chứng thực và người đề xuất (attester-proposer separation). Tôi có thể nói rằng tôi hào hứng nhất với việc đưa nghiên cứu vào thực tiễn thông qua quy trình này, bắt đầu với công việc mang tính lý thuyết hơn và đưa nó hướng tới một EIP mà hy vọng có thể được đề xuất và triển khai trong Ethereum.

**Thomas Thiery:** Tôi là Thomas. Tôi cũng làm công việc nghiên cứu tại Tổ chức Ethereum trong Robust Incentives Group. Nền tảng của tôi thực ra là Tiến sĩ về khoa học thần kinh, một lĩnh vực rất khác biệt. Nhưng tôi trở nên tò mò về chuỗi khối và các hệ thống phân tán, muốn thử một điều gì đó hơi khác một chút, và đã gia nhập một công ty dữ liệu tiền mã hóa tên là Dune. Tôi đã ở đó một thời gian, nhưng sau đó tôi nhớ công việc nghiên cứu, và tôi đã đủ may mắn để có thể gia nhập EF và Robust Incentives Group, mọi thứ cho đến nay vẫn rất tuyệt vời.

Tôi đã làm việc về các chủ đề tương tự. MEV khá phổ biến khi tôi mới tham gia. Thú vị là, những bài đăng nghiên cứu đầu tiên của tôi rất nhỏ, nhưng chúng nói về sự chậm trễ trong việc đưa vào (inclusion delays) và khả năng chống kiểm duyệt. Tôi đã không thực sự đi sâu vào nó cho đến gần đây. Trong sáu tháng đến một năm qua, tôi đã hoạt động tích cực hơn về khía cạnh chống kiểm duyệt và đưa vào (inclusion). Thật sự rất tuyệt khi có thể bắt đầu với các ý tưởng nghiên cứu, cải thiện những ý tưởng trước đây vốn rất thú vị nhưng chưa bao gồm một số chi tiết mà chúng ta sắp nói đến, đưa ra một đề xuất, và bây giờ đã có các bản triển khai và mạng phát triển mà hầu hết những người tôi từng trò chuyện đều nghĩ sẽ là một sự bổ sung tốt cho Ethereum.

**Pooja Ranjan:** Cảm ơn bạn đã chia sẻ. Luôn luôn truyền cảm hứng khi tìm hiểu về nền tảng của các nhà phát triển. Thật thú vị khi thấy rằng họ đến từ các lĩnh vực khác nhau và cuối cùng lại đóng góp cho hệ sinh thái Ethereum. Tôi hiểu rằng chúng ta có một bài thuyết trình ở đây hôm nay. Vì vậy, không chần chừ thêm nữa, hãy cùng xem qua.

### Bài thuyết trình: mục tiêu của FOCIL (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Tuyệt vời, cảm ơn bạn rất nhiều. Tôi muốn bắt đầu bằng một bài thuyết trình nhỏ về cách thức hoạt động của EIP-7805, hay FOCIL, và chính xác lý do tại sao chúng tôi muốn thực hiện nó. Mục đích là để khơi mào câu chuyện, vì vậy nó sẽ không quá chuyên sâu, nhằm dành không gian cho phần thảo luận sau đó.

Mục tiêu chính của FOCIL là tăng cường tính trung lập đáng tin cậy của Ethereum. FOCIL thực hiện điều này bằng cách loại bỏ sự độc quyền đưa vào mà hiện tại một người đề xuất hoặc trình tạo block duy nhất nắm giữ trong một khe. Thay vào đó, FOCIL cho phép nhiều trình xác thực đóng góp vào việc xây dựng một khối bằng cách đưa các giao dịch vào mỗi khối.

Mục tiêu ở cấp độ cao hơn là theo đuổi một thuộc tính mà chúng tôi gọi là tính trung lập của chuỗi, có nghĩa là bất kỳ giao dịch trả phí nào đang chờ xử lý đều phải được đưa vào nếu nó khả dụng và nếu có chỗ để đưa nó lên trên chuỗi. Chúng tôi tin rằng nếu thuộc tính này được đáp ứng đầy đủ, thì chúng ta sẽ gia tăng được tính trung lập đáng tin cậy của Ethereum.

### Tại sao chúng ta cần FOCIL, và tại sao lại là lúc này? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** Tại sao chúng ta cần một thứ như thế này? Hiện tại, hầu hết tất cả các trình xác thực đều thuê ngoài việc xây dựng khối cho MEV-Boost, đây là một thị trường ngoài giao thức nơi các trình xây dựng đấu giá quyền xây dựng khối. Trong thị trường này, chỉ có hai thực thể thực sự thống trị, và điều này có nghĩa là 90% các khối được xây dựng bởi chỉ hai thực thể.

Chúng ta thấy ở đây rằng Ethereum không thể lấy được tính trung lập đáng tin cậy từ việc xây dựng khối cục bộ nữa. Nó đã từng làm được như vậy. Nó bắt đầu bằng việc có các người đề xuất nằm rải rác trên toàn thế giới, mỗi người tự xây dựng các khối của họ một cách cục bộ, nghĩa là tất cả các giao dịch đều được đưa vào. Nhưng giờ đây khi việc xây dựng khối được thuê ngoài cho các thực thể tinh vi này, điều đó không còn đủ nữa. Vì vậy, cần phải triển khai các biện pháp chống kiểm duyệt mạnh mẽ hơn, và FOCIL là cách tốt nhất được biết đến để làm điều đó.

Tại sao chúng ta nên triển khai FOCIL ngay bây giờ? Bạn có thể nghĩ rằng các trình xây dựng hiện không kiểm duyệt nhiều, nhưng họ có thể bắt đầu kiểm duyệt bất cứ lúc nào, cho dù vì lý do quy định hay lý do kinh tế. Và kiểm duyệt kinh tế chắc chắn là một điều không thể hiểu sai. Cũng rất tốt khi giới thiệu FOCIL khi có tương đối ít sự kiểm duyệt, bởi vì khi đó bạn giới thiệu nó như một đường cơ sở và như một mặc định. Tất cả các trình xác thực đều tạo danh sách đưa vào (inclusion lists) bất kể quyền tài phán hay động lực kinh tế của họ, và điều này gây ra rất ít sự bất ổn cho thị trường. Trong khi đó, nếu bạn giới thiệu FOCIL khi tất cả các trình xây dựng đều đang kiểm duyệt, có lẽ điều đó sẽ khó khăn hơn.

Sau đó, các bản cuộn based (based rollups) đang trở nên phổ biến hơn dạo gần đây, và chúng sẽ phụ thuộc vào việc xây dựng khối của Ethereum. Nếu chúng ta muốn cung cấp khả năng sắp xếp trình tự mà Ethereum có, thì cần phải có tính trung lập đáng tin cậy ở đây thông qua FOCIL.

Và có khả năng FOCIL có thể giúp mở rộng quy mô, tùy thuộc vào việc bạn hỏi ai. Ngày nay, Ethereum vẫn lấy khả năng chống kiểm duyệt từ việc xây dựng khối cục bộ. Nếu Ethereum có thể lấy khả năng chống kiểm duyệt từ nơi khác, ví dụ như thông qua FOCIL, thì có lẽ chúng ta có thể tăng kỳ vọng đối với các trình tạo block và cho phép, ví dụ, nhiều khối dữ liệu hơn. Nhưng có khả năng điều này cũng có thể được thực hiện mà không cần FOCIL. Do đó, FOCIL đã được đề xuất để triển khai trong Fusaka.

### Cách FOCIL hoạt động (8:10) {#how-focil-works-810}

**Julian Ma:** Bây giờ tôi sẽ hướng dẫn bạn cách FOCIL hoạt động. Chúng ta sẽ bắt đầu với những điều cơ bản và đi từng bước cho đến khi nắm được toàn bộ cơ chế, sau đó khám phá xem cơ chế hoàn chỉnh này đáp ứng các thuộc tính mà chúng ta mong muốn như thế nào.

Ý tưởng cơ bản của danh sách bao gồm (inclusion list), vốn cũng đã được Mike Neuder đề xuất trước đây, là có một danh sách các giao dịch ràng buộc khối theo một cách nào đó. Ví dụ, có một danh sách bao gồm chứa các giao dịch A và B, nó được ký bởi một người nào đó được giao thức công nhận, và sau đó các giao dịch này phải được đưa vào một khối nào đó. FOCIL không thay đổi điều này. Nó được xây dựng dựa trên điều đó, và chủ yếu tập trung vào việc ai tạo ra danh sách này và cách danh sách này được thực thi.

Vậy, ai tạo ra danh sách này? Đây là bước đầu tiên trong cách thức hoạt động của giao thức FOCIL. Mỗi khe, 16 trình xác thực được chọn làm thành viên ủy ban danh sách bao gồm. Mỗi thành viên ủy ban này quan sát mempool và xây dựng danh sách bao gồm của riêng họ. Một danh sách bao gồm nên có kích thước khoảng 8 kilobyte, hoặc khoảng 20 giao dịch trung bình, nghĩa là tổng cộng khoảng 320 giao dịch trung bình.

Bước thứ hai là phân phối các danh sách bao gồm này. Các thành viên ủy ban danh sách bao gồm phân phối danh sách của họ trên chủ đề toàn cầu (global topic), và bản thân họ không đưa chúng vào một khối. Họ phải làm như vậy trước giây thứ 9 của khe, tại thời điểm đó các trình chứng thực (attester) sẽ đóng băng góc nhìn của họ về các danh sách bao gồm cục bộ. Như chúng ta sẽ thấy ở bước tiếp theo, các trình chứng thực mới là những người thực sự thực thi các danh sách bao gồm này, đúng như tên gọi: danh sách bao gồm được thực thi bằng lựa chọn phân nhánh (fork-choice enforced inclusion lists). Họ đóng băng góc nhìn về việc họ sẽ thực thi những danh sách bao gồm nào ở giây thứ 9, và điều này ngăn chặn các cuộc tấn công chia rẽ góc nhìn (split-view attacks). Người sản xuất khối vẫn có thêm vài giây để quan sát các danh sách bao gồm và đảm bảo rằng nó không bị ảnh hưởng tiêu cực do bỏ sót bất kỳ danh sách bao gồm nào, vì vậy người sản xuất khối không gặp rủi ro trong bối cảnh này.

Sau đó, chúng ta chuyển sang bước cuối cùng, đó là thực thi. Như tôi đã nói, việc thực thi được thực hiện thông qua lựa chọn phân nhánh. Các trình chứng thực sẽ chỉ bỏ phiếu cho một khối nếu nó thỏa mãn điều kiện của danh sách bao gồm. Họ làm như vậy bằng cách quan sát các danh sách bao gồm đã được gửi trên chủ đề toàn cầu, tạo một danh sách tổng hợp các giao dịch mà họ đã thấy trong các danh sách bao gồm này, và sau đó kiểm tra xem tất cả các giao dịch này có nằm trong khối hay không. Nếu quá trình kiểm tra này thành công, họ sẽ bỏ phiếu cho khối. Cũng có thể xảy ra trường hợp không phải tất cả các giao dịch từ danh sách bao gồm đều có trong khối, nhưng khối đã đầy. Trong trường hợp đó, các trình chứng thực cũng bỏ phiếu cho khối. Vì vậy, trừ khi khối không chứa các giao dịch và chưa đầy, các trình chứng thực sẽ bỏ phiếu cho khối.

Tóm tắt lại toàn bộ cơ chế: trong mỗi khe, 16 thành viên ủy ban được chọn làm thành viên ủy ban danh sách bao gồm. Họ quan sát mempool và xây dựng các đối tượng danh sách bao gồm mà họ phân phối trên chủ đề toàn cầu trước một thời hạn, trong trường hợp này là giây thứ 9. Trình xây dựng quan sát các danh sách bao gồm này và đưa tất cả các giao dịch mà nó đã thấy vào khối của mình. Sau đó, các trình chứng thực kiểm tra xem tất cả các giao dịch mà họ đã thấy trước giây thứ 9 trong các danh sách bao gồm có thực sự nằm trong khối hay không. Nếu quá trình kiểm tra này thành công, họ sẽ bỏ phiếu cho khối, và chúng ta chuyển sang khe tiếp theo, nơi thiết lập tương tự lại diễn ra.

### IL Boost và tính không thể chen lấn (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** Một trong những lo ngại lớn về các danh sách bao gồm, được Mike lên tiếng cho EIP trước đó và trong quá trình phát triển sau đó, là "IL Boost," hay tính không thể chen lấn. Nó đề cập đến thực tế là những người đề xuất danh sách bao gồm có thể muốn bán quyền xây dựng danh sách bao gồm của họ. Đây là một mối quan ngại rất hợp lý, bởi vì chúng ta thấy điều này đang xảy ra với việc xây dựng khối: việc bán quyền này dẫn đến một thị trường tập trung của các trình xây dựng tinh vi.

Chúng tôi lập luận rằng FOCIL rất mạnh mẽ trước các thị trường kiểu MEV-Boost này, hay còn được gọi thông tục là IL Boost, nhờ vào các đặc tính sau. FOCIL không đảm bảo bất kỳ thứ tự giao dịch nào. Bất kể bạn đặt giao dịch của mình ở đâu trong danh sách bao gồm, nó sẽ được sắp xếp theo bất kỳ cách nào mà trình tạo block thấy phù hợp. Ví dụ, nếu bạn đưa một giao dịch chênh lệch giá vào danh sách, rất khó có khả năng trình xây dựng sẽ đặt giao dịch chênh lệch giá của bạn ở đầu khối để nó thực sự thực thi việc chênh lệch giá đó. Thay vào đó, trình xây dựng có thể sẽ tự mình làm điều đó.

Hơn nữa, luồng lệnh riêng tư là không thể xảy ra. Các danh sách bao gồm này được phân phối trên chủ đề toàn cầu, vì vậy các giao dịch của bạn sẽ được công khai trước khi trình xây dựng tạo khối. Không thể có luồng lệnh riêng tư đi vào khối thông qua một danh sách bao gồm.

Thứ ba, có nhiều người đề xuất danh sách bao gồm cho mỗi khe. Ngay cả khi có thứ gì đó có giá trị để bán, tất cả 16 thành viên ủy ban danh sách bao gồm đều có cùng khả năng xây dựng danh sách bao gồm này, vì vậy sự cạnh tranh giữa những người đề xuất danh sách bao gồm đó sẽ đẩy giá trị xuống bằng không.

Và cuối cùng, các danh sách bao gồm này được tạo ra 3 giây trước khi người sản xuất khối hành động. Có 3 giây thông tin bổ sung, thường cực kỳ quan trọng đối với các loại giao dịch MEV, đến sau khi danh sách bao gồm được cam kết và trước khi người sản xuất khối hành động, nghĩa là có rất ít lợi thế về mặt thông tin. Thực tế, có một sự bất lợi về mặt thông tin đối với những người cố gắng sử dụng danh sách bao gồm như một công cụ cho MEV.

Vì những lý do này, chúng tôi tin rằng không có cá nhân người đề xuất danh sách bao gồm nào có quyền đưa vào, sắp xếp hoặc loại trừ, vốn là định nghĩa cơ bản của MEV. Do đó, các danh sách bao gồm sẽ không bị ảnh hưởng bởi MEV.

### Tóm tắt bài thuyết trình (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** Để tóm tắt bài thuyết trình ngắn này: FOCIL cho phép nhiều trình xác thực đóng góp vào việc xây dựng khối, ngăn chặn sự độc quyền đưa vào của một người đề xuất duy nhất và thúc đẩy tính trung lập đáng tin cậy của Ethereum. Chúng tôi tin rằng việc triển khai FOCIL ngay bây giờ là cần thiết bởi vì hiện tại chỉ có hai trình xây dựng thống trị có thể bắt đầu kiểm duyệt bất cứ lúc nào, và điều này có thể vì những lý do kinh tế mà họ có thể hưởng lợi. Việc xây dựng khối có thể phải gánh vác nhiều trọng trách hơn bởi vì các bản cuộn based (based rollups) sẽ muốn sử dụng các thuộc tính sắp xếp trình tự của Ethereum. FOCIL sẽ ra mắt suôn sẻ hơn nhiều khi có ít bên kiểm duyệt: thứ nhất, vì điều đó có nghĩa là việc các trình xác thực xây dựng danh sách đưa vào là mặc định, và thứ hai, vì điều đó có nghĩa là sẽ có ít sự bất ổn thị trường hơn giữa các trình xây dựng đang kiểm duyệt và các trình xây dựng không kiểm duyệt. Và cuối cùng, FOCIL có tiềm năng giúp ích cho việc mở rộng quy mô, đây có lẽ là một chủ đề mà chúng ta có thể đi sâu vào chi tiết hơn.

Cảm ơn vì đã dành thời gian cho bài thuyết trình nhỏ này. Tôi chỉ muốn hiển thị mã QR, dẫn đến EIP, cho những ai quan tâm.

**Pooja Ranjan:** Cảm ơn bạn rất nhiều vì bài thuyết trình ngắn này và phần tổng quan về đề xuất.

### Hỏi đáp: EIP-7805 khác với EIP-7547 như thế nào? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** Tôi muốn bắt đầu phần Hỏi đáp với câu hỏi đầu tiên, về đề xuất trước đó cũng đã được đề cập trong bài thuyết trình của bạn: đề xuất 7547, danh sách bao gồm (inclusion list), của Mike Neuder. Tôi muốn hiểu sự khác biệt cơ bản giữa đề xuất đó và FOCIL mà chúng ta có với 7805. Bạn đã đề cập một phần trong bài thuyết trình của mình về IL Boost và tính không thể chen chúc (uncrowdability). Bạn có muốn giải thích thêm một chút về điều đó không?

**Julian Ma:** Có lẽ Thomas là người phù hợp nhất để trả lời EIP-7805 khác với EIP-7547 như thế nào, nhưng tôi có thể nói một chút về nó. Trước hết, FOCIL dành cho cùng một khe, trong khi 7547 dành cho khe tiếp theo. Đặc tính cùng một khe làm cho một số thứ dễ dàng hơn, bởi vì nó có nghĩa là danh sách bao gồm không cần phải được lưu trữ trên chuỗi.

Về đặc tính không thể chen chúc, đây là một đặc tính rất thú vị và tinh tế. Trong 7547, một đề xuất tuyệt vời mà đề xuất của chúng tôi dựa vào để xây dựng, danh sách bao gồm được thêm vào vô điều kiện ở cuối khối và được tạo bởi một người. Điều này có một vài đặc tính khác với đề xuất của chúng tôi. Trước hết, các giao dịch được sắp xếp theo thứ tự. Có thể trong tương lai, việc kinh doanh chênh lệch giá ở cuối khối (bottom-of-block arbitrage) sẽ rất có giá trị, và thực tế một số nghiên cứu của Thomas đã nhấn mạnh rằng đây có thể là một vị trí có giá trị. Có quyền xây dựng danh sách bao gồm có nghĩa là bạn là người cuối cùng hành động trong khối, và trong một số trường hợp, điều này có thể có giá trị. Thứ hai, nó được tạo bởi một người duy nhất, vì vậy không có hiệu ứng cạnh tranh này giữa các thành viên ủy ban danh sách bao gồm. Một ủy ban gồm một người có toàn quyền đưa các giao dịch vào cuối khối, điều này cũng có thể làm cho nó có giá trị hơn. Thứ ba, có đặc tính vô điều kiện này, có nghĩa là bất kể người tạo khối làm gì, giao dịch của bạn vẫn sẽ được đưa lên trên chuỗi. Vì vậy, nó có một vài đảm bảo bổ sung, vượt ra ngoài mức tối thiểu cần thiết để được bao gồm, điều này có thể làm cho nó có giá trị ở một mức độ nào đó.

**Thomas Thiery:** Một sự khác biệt lớn nữa là số lượng người đề xuất danh sách bao gồm mà chúng ta có. Trong đề xuất trước đó, có một cơ chế mà theo đó người đề xuất của khe n tạo danh sách bao gồm mà người đề xuất của khe n+1 cần phải thực thi. Hai điều lớn ở đây: thứ nhất, có độ trễ một khe, vì vậy các giao dịch trong danh sách bao gồm chỉ phải được đưa vào khe tiếp theo bởi người đề xuất tiếp theo. Và chỉ có một người đề xuất thực sự tạo ra danh sách bao gồm. Với FOCIL, chúng ta có 16. Nó tạo ra một sự khác biệt rất lớn, bởi vì bây giờ chúng ta chỉ cần một trong số 16 thành viên ủy ban IL trung thực để toàn bộ cơ chế hoạt động như dự kiến. Nó nhân lên cơ hội của bạn để thực sự có một cơ chế chống kiểm duyệt tốt, trong khi trước đây bạn phải dựa vào một bên duy nhất.

Và sau đó là một số chi tiết kỹ thuật hơn: có một số điểm không tương thích với trừu tượng hóa tài khoản và rất khó để giải quyết việc xác nhận nước đôi IL, nghĩa là ai đó gửi hai danh sách bao gồm khác nhau. Xác nhận nước đôi khối là một điều đã biết và nó bị trừng phạt bởi Giao thức, nhưng vì mọi thứ đều diễn ra trên chuỗi trong đề xuất trước đó, bạn cũng phải giải quyết các trường hợp ngoại lệ kỳ lạ và không dễ dàng gì để đáp ứng chúng. Với FOCIL, các danh sách bao gồm không đi lên trên chuỗi. Chúng chỉ được phát sóng qua mạng lưới lớp đồng thuận P2P. Nó hơi mang tính kỹ thuật, nhưng nó tạo ra sự khác biệt lớn trong việc giải quyết các trường hợp ngoại lệ này do trừu tượng hóa tài khoản gây ra, hoặc các cuộc tấn công nơi bạn chia mạng lưới thành hai góc nhìn với xác nhận nước đôi IL.

**Pooja Ranjan:** Cảm ơn bạn rất nhiều. Đối với những người muốn tìm hiểu thêm về đề xuất 7547, chúng tôi có một tập đã được ghi hình với Mike Neuder, tập 130 của PEEPanEIP, cung cấp một cái nhìn tổng quan cấp cao. Tôi luôn thích nhìn thấy các đề xuất cạnh tranh, bởi vì tôi biết điều đó là vì sự tốt đẹp hơn của hệ sinh thái và Chuỗi. Tôi thấy trong khung chat có một vài câu hỏi. Có lẽ tôi muốn mời Kataya chia sẻ câu hỏi của cô ấy.

### Người đề xuất có phải đưa vào tất cả 16 danh sách không? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Xin chào, cảm ơn bạn. Câu hỏi của tôi là: người đề xuất khối có nhận được 16 danh sách đưa vào, mỗi danh sách từ một thành viên ủy ban, và họ có phải đưa tất cả các giao dịch từ những danh sách này vào không?

**Thomas Thiery:** Vâng, đúng vậy. Bạn gộp tất cả các giao dịch trên tất cả các danh sách, trong trường hợp của chúng tôi là 16 danh sách. Rõ ràng là có thể có sự trùng lặp, vì vậy bạn gộp lại và loại bỏ trùng lặp, nhưng đúng vậy, tất cả các giao dịch trong tất cả các danh sách cần phải được đưa vào khối để nó được những người chứng thực coi là hợp lệ.

**Pooja Ranjan:** Câu hỏi tiếp theo trong khung chat là của Justin. Justin, bạn có muốn đọc câu hỏi của mình cho các khách mời không?

### Các giao dịch mempool riêng tư trong danh sách đưa vào (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** Tôi đã hỏi rất nhiều câu hỏi. Tôi muốn hỏi điều gì ngăn cản việc đưa một giao dịch từ một mempool riêng tư vào một danh sách đưa vào, và tôi nghĩ câu hỏi đó đã được trả lời khá thỏa đáng. Có vẻ như điều đó hoàn toàn ổn, xét đến việc trình xây dựng về cơ bản sẽ sắp xếp chúng theo bất kỳ cách nào họ thấy phù hợp, và giao dịch của bạn cũng trở nên công khai khi nó xuất hiện trên IL. Vì vậy tôi nghĩ điều đó hợp lý. Cảm ơn bạn.

**Thomas Thiery:** Đó là một điểm cần cân nhắc, như Julian đã đề cập. Chúng tôi thực sự không muốn FOCIL và các danh sách đưa vào được sử dụng để đưa vào các giao dịch MEV, luồng lệnh riêng tư hoặc các xác nhận trước, bởi vì cuối cùng điều chúng tôi muốn là khả năng chống kiểm duyệt, và một cơ chế rất dễ trở thành công cụ để đưa vào các giao dịch có giá trị nếu bạn không cẩn thận. Thực tế là khi bạn đưa giao dịch của mình vào một danh sách đưa vào, nó sẽ tự động trở nên công khai, mọi người đều có thể nhìn thấy nó, nó không có gì đảm bảo về thứ tự và nó có thể được trình xây dựng đưa vào bất kỳ đâu trong khối, khiến nó không thực sự phù hợp với các giao dịch có giá trị.

Vì vậy, hoặc là bạn có một giao dịch công khai và bạn có thể chỉ cần gửi nó đến mempool công khai để nó được đưa vào một danh sách đưa vào, hoặc là bạn có các giao dịch riêng tư có giá trị, và khi đó bạn sẽ không thông qua FOCIL, vì có những cách tốt hơn để làm điều đó. Bạn sẽ liên hệ trực tiếp với trình xây dựng và gửi nó qua các kênh riêng tư.

**Pooja Ranjan:** Cảm ơn bạn đã chia sẻ. Tôi thấy câu hỏi tiếp theo là của Ladislaus.

### FOCIL và việc mở rộng quy mô (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Chào các bạn. Điều này liên quan đến điểm mà các bạn đã nêu ra về FOCIL và việc mở rộng quy mô. Gần đây tôi có thấy một số cuộc thảo luận, như tất cả chúng ta đều thấy, về việc mở rộng quy mô Ethereum, và như bạn đã đề cập rất đúng, có một nút thắt cổ chai từ một vài trình xây dựng ngoài kia. Cá nhân tôi thích nghĩ về FOCIL như một cách trao quyền lại cho việc xây dựng cục bộ, và tôi xem nó như một sự cần thiết phải được đưa vào giao thức trước khi chúng ta tăng các yêu cầu về băng thông, hoặc các yêu cầu về nút nói chung. Có lẽ bạn có thể nói rõ hơn về cách bạn nghĩ về điều này, và cả những cách tiềm năng khác để mở rộng quy mô, có thể là không cần FOCIL, như bạn đã đề cập.

**Julian Ma:** Cảm ơn bạn vì câu hỏi. Trước hết, về trường hợp mở rộng quy mô thông qua FOCIL. Hiện tại 90% các trình xác thực thuê ngoài việc xây dựng khối thông qua MEV-Boost, và những thực thể tinh vi này rõ ràng có nhiều băng thông hơn so với các yêu cầu phần cứng tối thiểu. Ví dụ, họ có thể đưa thêm nhiều khối dữ liệu vào các khối của mình mà không dẫn đến bất kỳ vấn đề nào. Tuy nhiên, một điều thú vị là Ethereum dựa vào việc xây dựng khối cục bộ để có được tính trung lập đáng tin cậy, hay khả năng chống kiểm duyệt, bởi vì hai thực thể tinh vi này không phải là những nền tảng mà khả năng chống kiểm duyệt của Ethereum có thể dựa vào.

Vì vậy, giao thức Ethereum vẫn phải được thiết kế sao cho có thể thực hiện việc xây dựng khối cục bộ, và trên thực tế, chúng tôi thiết kế nó sao cho nó không bị kém lợi nhuận hơn so với MEV-Boost. Điều này nằm trong thiết kế của Ethereum, nhưng trong thực tế, tất nhiên, MEV-Boost mang lại lợi nhuận cao hơn nhiều: thứ nhất là vì những trình tạo block tinh vi này có các thuật toán phức tạp hơn, và thứ hai là vì họ có nhiều luồng lệnh riêng tư (private order flow) hơn. Gần đây có một số nghiên cứu của Data Always cho thấy các khối MEV-Boost chứa nhiều giao dịch hơn hẳn. Chỉ riêng điều đó đã dẫn đến nhiều lợi nhuận hơn.

Tuy nhiên, giao thức được thiết kế sao cho không có áp lực nào từ bên trong các quy tắc của giao thức khiến một trình xác thực này ít lợi nhuận hơn một trình xác thực khác. Nếu chúng ta muốn giữ quy tắc đó, thì FOCIL là cần thiết, bởi vì khi đó các trình tạo block cục bộ có thể đóng góp vào các danh sách đưa vào (inclusion list) và qua đó duy trì khả năng chống kiểm duyệt. Tuy nhiên, chúng ta cũng có thể loại bỏ quy tắc này và về cơ bản nói rằng các trình tạo block cục bộ có thể bao gồm một số lượng khối dữ liệu nhất định, nhưng các trình tạo block tinh vi hơn có thể bao gồm nhiều khối dữ liệu hơn, đến mức mà các trình tạo block cục bộ sẽ không thể xử lý được khối lượng đó khi tự mình tạo ra một khối. Vì vậy, nếu chúng ta muốn giữ quy tắc rằng mức tối đa được đặt theo các yêu cầu phần cứng thấp nhất, thì chúng ta cần FOCIL. Nếu chúng ta ổn với việc nới lỏng quy tắc đó, thì có khả năng chúng ta không cần FOCIL để mở rộng quy mô.

**Thomas Thiery:** Tôi đoán là nó rất giống nhau, nhưng hiện tại trên Ethereum chúng ta đang ở một vị trí kỳ lạ, bởi vì chúng ta dựa vào các trình xây dựng tinh vi để xây dựng hầu hết các khối, nhưng những điều đó không tốt cho khả năng chống kiểm duyệt, bởi vì nó chỉ có hai bên. Nếu họ quyết định kiểm duyệt các giao dịch hoặc một số địa chỉ vì một lý do tùy ý nào đó, thì về cơ bản chúng ta không có khả năng chống kiểm duyệt hoặc tính không cần cấp phép (permissionlessness), điều này cũng rất quan trọng. Điều đó có nghĩa là họ có thể kiểm duyệt hoặc ngăn cản bất kỳ tác nhân nào họ muốn tham gia trên chuỗi, điều này rất tệ.

Và các đặc tính chống kiểm duyệt mà chúng ta giữ lại không quá tuyệt vời, đúng không? Vì hầu hết các khối được xây dựng bởi hai trình xây dựng này, về cơ bản bạn cần phải đợi cho đến khi một trình tạo block cục bộ được bầu chọn và đề xuất một khối bao gồm tất cả các giao dịch thường bị kiểm duyệt này, điều này mang lại cảm giác không tốt lắm. Điều đó có nghĩa là những người dùng này sẽ cần phải đợi 10, 12, tôi không biết nữa, rất nhiều khối cho đến khi các giao dịch của họ thực sự được đưa lên trên chuỗi.

Vì vậy, chúng ta thực sự muốn giữ lại những người đặt cọc tại nhà (home stakers) và các trình tạo block cục bộ, bởi vì họ là những người bảo vệ khả năng chống kiểm duyệt. Đồng thời, ngày nay, ngay cả việc sử dụng họ cũng không tuyệt vời, bởi vì bạn vẫn phải đợi rất nhiều thời gian để giao dịch của mình được đưa vào nếu nó bị kiểm duyệt bởi hai trình xây dựng đó. Với FOCIL, bạn chuyển sang một thế giới nơi những người tham gia đảm bảo khả năng chống kiểm duyệt, trong trường hợp của chúng ta là các thành viên ủy ban danh sách đưa vào, có thể khác với những người xây dựng các khối. Tôi nghĩ nó mở ra một bối cảnh rất thú vị, bởi vì bây giờ chúng ta không phải dựa vào cùng một người tham gia để vừa xây dựng các khối có giá trị vừa đóng góp vào khả năng chống kiểm duyệt. FOCIL cũng có thể được coi là bước đầu tiên theo hướng quan trọng đó, bởi vì bạn có hai nhiệm vụ rất khác nhau, và ngày nay chúng ta yêu cầu chính các nút trình xác thực đó làm cả hai, điều này rất căng thẳng.

**Pooja Ranjan:** Cảm ơn bạn rất nhiều. Tôi nghĩ câu hỏi tiếp theo là của Luis.

### Tiêu chí chọn giao dịch (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** Tôi tham gia trễ vài phút sau khi bắt đầu, nhưng theo tôi thấy thì điều này đang phi tập trung hóa việc lựa chọn giao dịch trên toàn bộ mạng lưới. Theo ý kiến của tôi thì điều đó rất tốt; nó chống lại MEV và sự kiểm duyệt. Và tôi chắc chắn thích phần để những người chứng thực (attester) làm công việc này, bởi vì trong tương lai họ sẽ có yêu cầu phần cứng thấp hơn so với các trình xây dựng, thậm chí còn thấp hơn nữa với tính phi trạng thái và các client phi trạng thái. Vì bạn sẽ có thể chạy quy trình này với phần cứng rất thấp, nó làm cho mọi thứ trở nên rất phi tập trung. Tôi đoán thách thức chính ở đây là xác định các tiêu chí cho việc lựa chọn giao dịch của các danh sách đưa vào (inclusion list) này, cho dù bạn chọn dựa trên phí ưu tiên hay số lượng khối dữ liệu; có quá nhiều biến số. Các bạn đã chốt được một bộ tiêu chí nào mà các bạn đang định áp dụng chưa?

**Thomas Thiery:** Đó là một câu hỏi rất hay. Có hai khía cạnh cho vấn đề này. Khía cạnh đầu tiên rất quan trọng, về việc cố gắng tách biệt những người chứng thực khỏi những người xây dựng hoặc đề xuất khối. Đó là toàn bộ hướng nghiên cứu về việc tách biệt người chứng thực và người đề xuất (APS); Julian đã làm việc khá nhiều về vấn đề này. Chúng tôi gọi đó là việc phân tách các vai trò, để chúng phù hợp chặt chẽ hơn với các nhiệm vụ của giao thức. Tôi đã viết một bài đăng, mà tôi vừa chia sẻ, về một sự tách biệt khả thi, điều này vẫn còn rất mở, và tôi rất muốn nhận thêm ý kiến đóng góp từ mọi người. Trong bài đăng này, tôi tạo ra sự phân biệt giữa những người chứng thực, những người đưa vào (includer) - hiện là các thành viên ủy ban IL, và những người đề xuất thực thi, hay các trình xây dựng. Tôi nghĩ đó là những nhiệm vụ khác nhau về cơ bản, và có lẽ chúng ta nên có những vai trò khác nhau cho họ.

Tiếp theo, đối với quy tắc đưa vào (inclusion rule), đó là một câu hỏi rất hay. Chúng tôi đã suy nghĩ khá nhiều về nó, và tôi nghĩ chúng tôi đã chốt lại ở hai điều. Điều đầu tiên là chúng tôi muốn có sự đa dạng về các quy tắc. Chúng tôi không muốn chỉ có một quy tắc duy nhất, ví dụ như sắp xếp theo phí ưu tiên giảm dần cho tất cả các client, bởi vì khi đó bạn thực sự có thể giở trò và cố gắng sắp xếp lại mempool sao cho chỉ các giao dịch của bạn mới được đưa vào các IL. Nhưng nếu bạn có một sự đa dạng về các quy tắc, bao gồm một quy tắc cũng tính đến thời gian một giao dịch đang chờ xử lý trong mempool, và các client khác nhau triển khai các quy tắc khác nhau, tất cả đều có cùng tính chất, chủ yếu xoay quanh phí ưu tiên và thời gian chờ trong mempool, thì sẽ rất, rất khó để thao túng, và nó làm cho giao thức trở nên mạnh mẽ hơn nữa. Tôi nghĩ đó cũng là một cách hay để tận dụng sự đa dạng của các client mà chúng ta có trên Ethereum hiện nay, và để cho các client đưa ra những lựa chọn theo quan điểm riêng. Chúng tôi đã có sẵn các quy tắc trong đầu, nhưng chúng tôi nghĩ các client cũng có thể chọn những quy tắc tốt nhất cho họ. Miễn là không phải ai cũng có cùng một quy tắc sắp xếp theo phí ưu tiên giống hệt nhau, thì chúng ta sẽ ổn.

**Luis Pinto:** Được rồi, vậy là các bạn cũng đang phân phối tiêu chí này, để những người xây dựng danh sách đưa vào có tiêu chí của riêng họ. Hay điều này sẽ là một phần của giao thức?

**Julian Ma:** Quy tắc đưa vào sẽ không phải là một phần của giao thức. Trước hết, nó rất khó để bắt buộc áp dụng, và thứ hai, thực ra tốt hơn là không bắt buộc bất cứ điều gì. Nếu chúng ta cho phép các thành viên ủy ban tự quyết định, hoặc để các nhóm phát triển client thay mặt họ hành động, về cách họ đưa các giao dịch vào, thì chúng ta sẽ tạo ra sự vững chắc nhất định trong mạng lưới. Những người có sở thích khác nhau sẽ đưa vào theo những cách khác nhau, điều đó có nghĩa là hệ thống sẽ khó bị tấn công hơn.

**Luis Pinto:** Được rồi, cảm ơn bạn.

### Khả năng tương thích với EIP-7702, ePBS và PeerDAS (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Cảm ơn bạn rất nhiều. Theo tôi hiểu, đề xuất này đã được đề xuất cho bản nâng cấp sau Pectra, Fusaka. Và do Fusaka có thể bao gồm hoặc không bao gồm một số EIP khác đang được tiến hành, tôi tự hỏi tình trạng tương thích của FOCIL đối với các đề xuất như 7702, dành cho trừu tượng hóa tài khoản, ePBS và PeerDAS là như thế nào.

**Thomas Thiery:** Câu hỏi rất hay. Chúng tôi có một chút lợi thế ở đây nhờ vào lịch sử của các danh sách đưa vào (inclusion list). Như chúng tôi đã đề cập, 7547 đã được xem xét để đưa vào và sau đó bị từ chối do không tương thích. Vì vậy, chúng tôi đã rất cẩn thận trong việc giải quyết những vấn đề đó trước khi đưa ra một đề xuất mới, bởi vì chúng tôi biết mọi người sẽ xem xét nó với những câu hỏi tương tự, điều này là hoàn toàn hợp lý.

Chúng tôi rất tự tin, vì chúng tôi cũng đã nói chuyện với các nhóm trừu tượng hóa tài khoản, và chúng tôi đã trao đổi rất nhiều với Potuz và Terence. Terence đã tích cực giúp đỡ chúng tôi, và anh ấy đã làm việc trên cả ePBS và FOCIL, vì vậy rất dễ dàng để chúng tôi kiểm tra xem liệu chúng có tương thích hay không. Tôi thực sự không nghĩ rằng có sự không tương thích với bất kỳ EIP nào khác. Với ePBS, bạn phải cẩn thận với thời gian của các quy trình, bởi vì bạn tách tải trọng thực thi khỏi khối đồng thuận, do đó toàn bộ thời gian của khe sẽ thay đổi, và bây giờ bạn cũng thêm việc tạo các IL cần được thực hiện trước khi tải trọng được đề xuất. Vì vậy, bạn cần phải cẩn thận về thời gian, nhưng nếu tôi nhớ không lầm, từ lần cuối cùng chúng tôi nói chuyện về vấn đề này với cả Potuz và Terence, hoàn toàn không có bất kỳ sự không tương thích nghiêm trọng nào. Tôi nghĩ chúng ta đang có kết quả rất khả quan khi nói đến khả năng tương thích.

**Pooja Ranjan:** Thật tốt khi biết điều đó. Tôi nhận thấy Jihoon cũng đã chia sẻ một liên kết HackMD, mà chúng tôi sẽ thêm vào phần tài nguyên, dành cho những ai muốn tìm hiểu thêm về khả năng tương thích với ePBS nói riêng. Và vâng, tôi nhớ từ cuộc trò chuyện trước với Mike, tôi đoán đề xuất đã không được đưa vào do sự không tương thích với trừu tượng hóa tài khoản. Vì vậy, thật tốt khi biết rằng vấn đề này đã được giải quyết.

### FOCIL và MEV đa khe (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** Tôi đã xem qua các tài liệu và thông tin chi tiết được thêm vào trang web của FOCIL, meetfocil.eth.limo, và biết được một thuật ngữ gọi là MEV đa khe (multi-slot MEV). Julian cũng đã đề cập rằng MEV-Boost nhìn chung là có lợi nhuận, bất chấp mong muốn và nỗ lực của các nhà phát triển nhằm giữ cho nó ở mức cân bằng. Tôi tự hỏi FOCIL sẽ ngăn chặn điều này như thế nào.

**Julian Ma:** Cảm ơn câu hỏi của bạn. Đầu tiên, hãy để tôi nói đôi điều về FOCIL và MEV, sau đó chúng ta có thể chuyển sang MEV đa khe. FOCIL không nhất thiết phải ngăn chặn MEV, và điều này chính xác là vì chúng tôi muốn tách biệt các phần MEV và các phần đưa vào (inclusion). Theo quan điểm của chúng tôi, việc làm như vậy là rất quan trọng, bởi vì nếu không, bạn sẽ thấy các loại thị trường như IL Boost xuất hiện. Theo lý luận đó, nếu danh sách đưa vào (inclusion list) có thể hạn chế lượng MEV có thể trích xuất, thì việc xây dựng danh sách đưa vào sẽ trở nên rất có giá trị và mọi người sẽ tạo ra các thị trường xung quanh nó. Thiết kế của chúng tôi thực sự ở đó để cung cấp sự đảm bảo đưa vào tối thiểu, nghĩa là việc trở thành thành viên ủy ban danh sách đưa vào không quá có giá trị, và có 16 thành viên như vậy, nghĩa là không có thị trường của các nhà sản xuất phức tạp.

Tiếp theo, chuyển sang MEV đa khe: FOCIL giảm nhẹ một số vấn đề, nhưng nó không giải quyết triệt để. Điều này một lần nữa là do sự không tương thích giữa việc vừa cung cấp khả năng chống kiểm duyệt vừa cung cấp giải pháp cho MEV. Những gì FOCIL làm là cho phép bất kỳ giao dịch nào được đưa vào miễn là nó trả phí, điều này giải quyết MEV đa khe ở một mức độ nào đó. MEV đa khe ở đây là khi một bên có thể trích xuất nhiều MEV hơn nếu họ kiểm soát hai khối liên tiếp.

FOCIL giảm nhẹ một số vấn đề vì nó cho phép bạn chèn giao dịch của mình. Ví dụ: nếu bạn cần chèn một giao dịch thanh lý nợ xấu ở một vị thế nào đó, bạn có thể làm như vậy ngay cả khi người đề xuất cố gắng kiểm duyệt bạn và sẽ trích xuất MEV từ bạn trong khối tiếp theo.

Lý do nó không giải quyết được tất cả các vấn đề là do lựa chọn đối nghịch (adverse selection), một đặc tính kinh tế nơi một người có nhiều thông tin hơn người kia. Một ví dụ về MEV đa khe sẽ là trích xuất chênh lệch giá (arbitrage) qua hai khối, trong đó trình tạo block không trích xuất chênh lệch giá ở khối đầu tiên mà thực hiện ở khối thứ hai. Có một số kết quả lý thuyết cho thấy điều này có thể mang lại nhiều lợi nhuận hơn cho trình tạo block so với việc trích xuất chênh lệch giá ở cả hai khe. Bạn có thể nghĩ rằng FOCIL giúp ích ở đây, bởi vì về nguyên tắc, những người kinh doanh chênh lệch giá có thể đưa giao dịch của họ vào danh sách đưa vào và do đó buộc một số hình thức chênh lệch giá phải xảy ra. Mặc dù đúng là như vậy, nhưng việc những người kinh doanh chênh lệch giá gửi giao dịch của họ cho FOCIL không tương thích về mặt khuyến khích (incentive-compatible), bởi vì vẫn có 3 giây giữa lúc giao dịch của họ được gửi và lúc trình tạo block có thể hành động. Nếu bạn đang cố gắng thực hiện chênh lệch giá và giá liên tục biến động trên một thị trường bên ngoài nào đó, bạn không muốn cam kết trước 3 giây, bởi vì bạn có ít thông tin hơn nhiều so với trình tạo block, người hành động sau bạn. Lựa chọn đối nghịch phát huy tác dụng vì trình tạo block có nhiều thông tin hơn: nó sẽ để bạn thắng nếu điều đó tồi tệ cho bạn, nếu giá trên thị trường bên ngoài đã đi ngược lại bạn trong ba giây thừa đó, và nó sẽ để bản thân nó thắng nếu việc nó thắng mang lại lợi ích tốt hơn cho chính nó.

Vì vậy, FOCIL giải quyết các phần của MEV đa khe nơi các giao dịch không phải chịu sự lựa chọn đối nghịch. Đối với các giao dịch có sự lựa chọn đối nghịch, nó phức tạp hơn một chút, nhưng nó giảm nhẹ vấn đề ở một mức độ nào đó. Về nguyên tắc, nó làm cho mọi thứ tốt hơn so với hiện tại, nhưng vẫn còn một chút việc phải làm.

**Pooja Ranjan:** Rất tốt, cảm ơn bạn rất nhiều vì đã chia sẻ điều đó. Tôi hiểu rằng có rất nhiều nghiên cứu đang diễn ra để giải quyết vấn đề MEV, vì vậy thật tốt khi biết rằng ít nhất về nguyên tắc, nó sẽ giúp ích nhiều hơn so với kịch bản hiện tại.

### Những đánh đổi và thách thức (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** Tôi có một câu hỏi liên quan đến những gì Thomas đã đề cập trước đó về xác nhận nước đôi IL. Tôi nhận thấy rằng trong phần các cân nhắc về bảo mật của đề xuất, có khá nhiều điểm được đề cập, như tính liên tục của đồng thuận, xác nhận nước đôi IL và việc xây dựng tải trọng. Bạn nghĩ đâu là sự đánh đổi lớn nhất, hoặc điều gì đó có thể cần nghiên cứu thêm và có thể ngăn cản đề xuất này được đưa vào bản nâng cấp tiếp theo ở trạng thái hiện tại?

**Thomas Thiery:** Thành thật mà nói, tôi nghĩ phần các cân nhắc về bảo mật chủ yếu là một cách để cho thấy rằng chúng tôi đã suy nghĩ và giải quyết các mối lo ngại liên quan đến bảo mật. Nó mang ý nghĩa đó nhiều hơn là việc có những câu hỏi còn bỏ ngỏ về các vấn đề bảo mật mà chúng tôi chưa biết. Tôi không nghĩ có bất kỳ rào cản hay vấn đề lớn nào về mặt các cân nhắc bảo mật.

Về những sự đánh đổi: nếu bạn nhìn ở một góc độ rất hẹp, đúng là FOCIL thêm một số nhiệm vụ cho các trình xác thực, cả khi họ phải đề xuất một danh sách bao gồm, và đối với các trình chứng thực, khi họ phải kiểm tra thêm một điều kiện nữa để đảm bảo khối là hợp lệ theo các danh sách bao gồm. Nó cũng thêm một nhiệm vụ nhỏ cho người đề xuất, bởi vì bây giờ họ cần đảm bảo tải trọng của mình thực sự bao gồm các giao dịch trong các IL. Đối với tôi, đó là sự đánh đổi duy nhất, và những nhiệm vụ đó không hề nặng nề hay phức tạp. Một thành viên ủy ban IL chỉ cần theo dõi mempool công khai và đưa các giao dịch vào một danh sách mà họ gửi đi. Việc này không đòi hỏi bất kỳ kỹ năng hay sự phức tạp nào, điều mà tôi nghĩ là rất tuyệt. Mặt khác, như chúng tôi đã nói, nó có thể mở ra một số cải tiến lớn về khả năng mở rộng và sự phân tách tốt hơn giữa các bên tham gia và nhiệm vụ trong Giao thức.

Tôi có thể hơi thiên vị, nhưng tôi không thấy có những sự đánh đổi lớn. Tôi thực sự nghĩ rằng nó gần như thay đổi hoàn toàn cục diện khi nói đến khả năng chống kiểm duyệt. Bây giờ bạn về cơ bản chỉ cần 15% mạng lưới trung thực để tất cả các giao dịch, bao gồm cả những giao dịch có thể bị kiểm duyệt bởi các trình xây dựng, được đưa vào khối tiếp theo, đây là một cải tiến rất lớn. Thành thật mà nói, tôi không nghĩ bạn phải đánh đổi nhiều thứ ở đó.

**Pooja Ranjan:** Thật tốt khi biết điều đó. Trong hầu hết các đề xuất, chúng tôi thấy rằng phần các cân nhắc về bảo mật thường không có hoặc có rất ít thông tin, vì vậy thật tốt khi biết rằng nghiên cứu đã được thực hiện cho phần đó và chúng ta nhận thức được các cân nhắc bảo mật có thể xảy ra. Rất vui khi biết đó không phải là một rào cản hay thách thức tiềm tàng đối với việc triển khai và áp dụng trong tương lai.

### Cơ chế phí giao dịch cho các danh sách đưa vào (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** Tôi có một câu hỏi về một số vấn đề còn bỏ ngỏ mà tôi tìm thấy trên chính trang web, liên quan đến cơ chế phí giao dịch. Tôi tự hỏi liệu có bất kỳ cập nhật nào không, hoặc liệu bạn có muốn chia sẻ thêm về cách tốt nhất để tính phí và phân phối các khoản phí này cho việc đưa vào danh sách đưa vào (inclusion list) hay không.

**Thomas Thiery:** Chúng tôi có một khoản tài trợ đang diễn ra đặc biệt xem xét vấn đề này và các cơ chế khuyến khích để trao phần thưởng cho các thành viên ủy ban IL (danh sách đưa vào). Điều này không hề dễ dàng. Nó khá phức tạp, và cho dù bạn tiếp cận nó theo cách nào, đây cũng là những thay đổi rất lớn. Việc thay đổi phí trên Ethereum, cho dù bạn thay đổi một khoản phí, thêm một khoản phí, hay thêm đợt phát hành mới, tất cả đều là những thay đổi lớn cần được xem xét và cẩn trọng rất nhiều. Nhưng nó đang được khám phá, và các ý tưởng xoay quanh việc phân phối phí cho, ví dụ, các thành viên ủy ban đưa vào một giao dịch có vẻ là những ý tưởng khá ổn. Nó phần nào có những đặc tính mà chúng tôi muốn, bởi vì chúng tôi muốn trao phần thưởng cho những người đưa vào các giao dịch mà người khác có thể không muốn đưa vào. Vì vậy, chúng tôi đang suy nghĩ khá sâu sắc về điều này, và chúng tôi có một khoản tài trợ đang diễn ra.

Cũng có một câu hỏi là liệu chúng ta có bao giờ muốn trả phí cho các thành viên ủy ban IL hay không, bởi vì rõ ràng là rất khó để trao phần thưởng cho các thành viên tham gia nhỏ lẻ phân tán trên toàn thế giới. Bạn không muốn các cuộc tấn công Sybil, và bạn không muốn những người tham gia lớn với nhiều khoản đặt cọc chèn ép tập hợp ủy ban IL. Làm thế nào để bạn ngăn chặn điều đó? Điều đó rất khó. Vì vậy, bạn có rất nhiều cân nhắc về thiết kế cần phải tính đến.

Một trong những quan điểm mà tôi có gần đây là: điều gì sẽ xảy ra nếu chúng ta thêm một số tính năng thú vị vào FOCIL, như quyền riêng tư, để bạn không thể thực sự biết ai đã đề xuất một danh sách các giao dịch nhất định? Bạn biết đó là một người thực sự được chọn làm thành viên ủy ban IL, nhưng bạn không biết chính xác ai đã đề xuất danh sách nào, vì vậy bạn không thể liên kết các thành viên ủy ban IL với tập hợp các giao dịch trong IL của họ. Nếu chúng ta có thể làm được điều đó, và để vai trò ủy ban IL mang tính chất tự nguyện tham gia (opt-in), thì có lẽ chúng ta sẽ có những người tham gia trung thực trong giao thức, dựa vào hành vi vị tha, và có thể chúng ta sẽ không cần thiết lập một cơ chế phí nào cả. Đó là một quan điểm rất mới, mang tính cá nhân, và hiện đang được khám phá rất nhiều. Tất cả những điều này là các cuộc thảo luận về "tương lai của FOCIL"; chúng không được dự định đưa vào EIP hiện tại.

**Julian Ma:** Chỉ để bổ sung thêm vào điều đó, phần cuối cùng cũng rất quan trọng: EIP-7805 không bao gồm bất kỳ cơ chế phí giao dịch nào, nhằm giúp việc triển khai trở nên đơn giản hơn. Về cơ bản, đây là cách nhỏ nhất có thể để chúng tôi cung cấp các đặc tính chống kiểm duyệt, nhưng nó rất dễ mở rộng. Chúng tôi đang xem xét điều đó. Thomas đã thực hiện khá nhiều công việc nghiên cứu về các khoản phí giao dịch riêng biệt cho người đưa vào (includer) và cho người đề xuất. Sau đó, như Thomas đã đề cập, chúng tôi có một khoản tài trợ đang diễn ra với một nhà nghiên cứu tuyệt vời tại Nethermind, người đang xem xét việc tạo ra một cơ chế phí giao dịch cho FOCIL, và điều này rất hứa hẹn. Và cuối cùng, đã có nghiên cứu về cơ chế phí giao dịch cho một biến thể của FOCIL gọi là AUCIL, một thiết kế danh sách đưa vào dựa trên đấu giá được đề xuất bởi Sarisht Wadhwa, Fan Zhang và Kartik Nayak cùng với một số tác giả của FOCIL, nhằm tìm cách khuyến khích các thành viên ủy ban danh sách đưa vào.

Quay lại ý của Luis trước đó, việc khuyến khích liên quan rất nhiều đến cách các danh sách đưa vào được tạo ra. Điều đó có nghĩa là giao thức muốn đưa ra một quan điểm nhất định về cách các thành viên ủy ban danh sách đưa vào nên hành xử. Thông thường, điều này dẫn đến việc nó muốn những người tham gia nhất định làm những việc khác nhau. Ví dụ, nó có thể sắp xếp các thành viên ủy ban và chỉ định cho họ các giao dịch nhất định thông qua một trạng thái cân bằng tương quan (correlated equilibrium), để vẫn có một số hành vi khác nhau giữa các thành viên ủy ban. Vì vậy, nó không phải là một phần của đề xuất hiện tại, nhưng chúng tôi chắc chắn đang xem xét nó, và nó phù hợp với định hướng về khả năng mở rộng của FOCIL.

**Pooja Ranjan:** Ồ, thật thú vị. Vậy chúng ta nên mong đợi một số đề xuất bổ sung trong tương lai để nâng cao các tính năng hiện tại của FOCIL.

### Kích thước danh sách bao gồm (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** Tôi có một câu hỏi khác. Tôi không chắc liệu nó có nên là một phần của đề xuất hiện tại hay không, nhưng tôi tò mò muốn biết liệu có bất kỳ cập nhật nào về kích thước IL (danh sách bao gồm) không. Các danh sách bao gồm rất có thể phải được giới hạn kích thước để ngăn chặn việc sử dụng băng thông quá mức. Chúng ta có bất kỳ nghiên cứu hoặc cập nhật nào thêm về cách xác định kích thước tối ưu của danh sách bao gồm không?

**Thomas Thiery:** Hiện tại chúng tôi đã có một kích thước cố định trong đặc tả kỹ thuật và nó đã được duy trì một thời gian: 8 kilobyte. Chúng tôi đặt nó ở mức kilobyte vì những gì FOCIL và các IL thực sự tiêu thụ là băng thông, và về cơ bản chỉ có vậy. Nếu bạn lấy kích thước giao dịch trung bình, chúng ta có khoảng 40 giao dịch cho mỗi IL và nếu tất cả các giao dịch đều là duy nhất, thì đó là khoảng 640 giao dịch có thể được kết hợp cùng nhau trên tất cả 16 thành viên ủy ban.

Tôi không biết liệu có cần thực hiện quá nhiều nghiên cứu về kích thước tối ưu chính xác hay không. Những gì chúng tôi đã chọn: 16 nhân với 8 kilobyte về cơ bản là kích thước của một khối dữ liệu, vì vậy tổng cộng đó không phải là một lượng băng thông khổng lồ. Và vì sự kết hợp của các giao dịch trên các IL lớn hơn một khối, tôi không nghĩ chúng ta sẽ gặp vấn đề ở đó.

Trong tương lai, bạn có thể tăng kích thước IL, nhưng bạn cũng có thể xem xét việc tăng số lượng thành viên ủy ban IL. Điều đó cho phép bạn có nhiều cơ hội hơn để có được một thành viên ủy ban IL trung thực nếu phần lớn mạng lưới quyết định bắt đầu kiểm duyệt. Vì vậy, đó cũng là điều chúng ta có thể làm. Hiện tại, có vẻ như 16 sẽ là hoàn toàn ổn và đủ, nhưng bạn chắc chắn có thể điều chỉnh các thông số này trong tương lai nếu tình trạng kiểm duyệt trở nên quá nghiêm trọng, hoặc nếu chúng ta cần hành động nhiều hơn.

### Các số liệu để theo dõi mức độ áp dụng (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Chỉ là một câu hỏi tiếp nối ở đây: bạn có nghĩ đến bất kỳ số liệu nào mà chúng ta có thể theo dõi để hiểu được mức độ áp dụng hoặc sự thành công của đề xuất này không?

**Julian Ma:** Đó là một câu hỏi rất hay. Hãy để tôi trả lời nhanh và sau đó nhường lời lại cho Thomas. Một số số liệu đơn giản chỉ là có bao nhiêu danh sách đưa vào (inclusion list) được đề xuất mà không trống. Và bạn có thể nghĩ đến các bảng điều khiển, giống như loạt ".pics" của Toni Wahrstätter, nơi có thể có thêm nhiều sắc thái hơn, gán một số thước đo chất lượng cho các danh sách đưa vào này. Tuy nhiên, về nguyên tắc, chỉ cần một người mỗi khe tạo ra một danh sách đưa vào phù hợp để cung cấp khả năng chống kiểm duyệt.

Tôi nghĩ đây là một điểm quan trọng đến mức việc triển khai FOCIL sớm là rất quan trọng, bởi vì hiện tại chúng ta đang ở trong một trạng thái lý tưởng nơi các trình tạo block không kiểm duyệt quá nhiều và các trình xác thực cũng không kiểm duyệt quá nhiều. Tôi muốn nói rằng điều này rất mong manh. Cho đến nay, các trình tạo block đã kiểm duyệt trong một thời gian dài, và nếu chúng ta giới thiệu FOCIL ngay bây giờ, chúng ta có khả năng biến nó thành mặc định để tất cả các trình xác thực này áp dụng nó và tạo ra các danh sách đưa vào có ý nghĩa. Bởi vì các trình tạo block không kiểm duyệt, nên không có sự bất ổn thị trường nào được tạo ra ở đây. Nếu chúng ta đợi cho đến khi có sự kiểm duyệt giữa các trình tạo block, thì việc giới thiệu FOCIL sẽ khó khăn hơn nhiều, và tôi có thể tưởng tượng tất cả các số liệu được sử dụng để đo lường mức độ áp dụng sẽ tồi tệ hơn nhiều.

**Thomas Thiery:** Một số liệu chính khác cần xem xét chính là độ trễ đưa vào đối với các giao dịch trong mempool công khai. Bạn lấy tất cả các giao dịch đang chờ xử lý trong mempool công khai và xem chúng được đưa vào nhanh như thế nào. Nếu FOCIL hoạt động, tất cả chúng sẽ được đưa vào khối tiếp theo. Nếu không, điều đó có nghĩa là một tỷ lệ lớn các trình xác thực đang kiểm duyệt. Vì vậy, số liệu khác mà chúng ta có thể xem xét là ai đang kiểm duyệt, và tỷ lệ mạng lưới đang kiểm duyệt là bao nhiêu. Chúng ta sẽ có các bảng điều khiển và các số liệu rất minh bạch để theo dõi điều này, bởi vì về cơ bản đó là những gì FOCIL phải làm. Nếu các giao dịch công khai không được đưa vào khối tiếp theo, điều đó có nghĩa là một phần rất lớn của mạng lưới thực sự đang kiểm duyệt các giao dịch này.

**Pooja Ranjan:** Rất thú vị. Vì vậy, có lẽ đây là điều dành cho các nhà nghiên cứu: một danh sách mong muốn khả thi cho các bản nâng cấp, rằng các bảng điều khiển và công cụ theo dõi số liệu nên được các nhà phát triển chia sẻ cho một đề xuất bất cứ khi nào nó được đưa vào một bản nâng cấp mạng lưới.

### Trạng thái triển khai máy khách (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** Như Julian đã đề cập, đề xuất này có thể cần được triển khai càng sớm càng tốt. Tôi tò mò muốn biết chúng ta đang ở đâu trong việc triển khai máy khách, vì tôi nhớ trong cuộc gọi mạng thử nghiệm (testnet) lần trước, Paritosh đã đề cập đến việc thêm một số hỗ trợ với các mạng phát triển. Vậy chúng ta đang ở giai đoạn nào rồi?

**Thomas Thiery:** Chúng tôi đang làm khá tốt. Trước hết, thật tuyệt vời khi thấy cách mọi người đảm nhận phần triển khai của FOCIL, bởi vì tôi không phải là một nhà phát triển (dev), tôi là một nhà nghiên cứu. Tôi đã làm việc với các nhà phát triển ngay từ đầu, nhưng tôi không phải là người triển khai mọi thứ trong các máy khách.

Những người tiên phong trong việc này, gồm ba người: chúng ta có Terence từ Prysm, và Jihoon, người đã giúp đỡ Terence rất nhiều trên Prysm nhưng cũng đã làm việc trên Geth. Vì vậy, hiện tại chúng ta đã có một mạng phát triển hoạt động cho Prysm và Geth, điều này thật tuyệt vời và đang có rất nhiều thử nghiệm diễn ra. Chúng tôi hiện cũng đang cố gắng để FOCIL được hiển thị và có thể nhìn thấy trên trình khám phá Dora. Sau đó, bạn có Jacob, người đã làm việc trên Lighthouse và Reth, và tôi biết một số nỗ lực vẫn đang được tiếp tục ở đó. Lodestar dạo này rất tích cực; tôi nghĩ họ đã tiến rất gần đến việc có một mạng phát triển hoạt động. Hôm nay chúng tôi nhận được một số tin tức từ Nethermind rằng họ đã có một nguyên mẫu, điều này cực kỳ tuyệt vời. Tôi cảm thấy như mình đang quên mất một vài người... Nimbus cũng đang tham gia, Jihoon nói vậy. Điều đó thực sự rất tuyệt.

Nhìn chung, chúng ta đang có ngày càng nhiều các mạng phát triển sẵn sàng và đi vào hoạt động, các mạng phát triển cục bộ, và ngày càng nhiều sự kết hợp giữa các máy khách lớp thực thi và lớp đồng thuận. Đã có một số tiến triển thực sự tốt, và thật vui khi thấy điều đó, bởi vì tất cả chúng ta đều biết các nhà phát triển hiện đang khá bận rộn với việc Pectra sắp ra mắt, và đã đang làm việc trên PeerDAS cùng những thứ khác. Thật sự rất tuyệt khi thấy mọi người trên Ethereum nói chung quan tâm khá nhiều đến khả năng chống kiểm duyệt. Hầu hết các nhóm mà tôi chưa liên hệ trực tiếp đều đã tự tham gia vào nỗ lực này và hiện đang hướng tới các mạng phát triển và thử nghiệm.

**Pooja Ranjan:** Cảm ơn bạn đã chia sẻ điều đó. Tôi rất mong được theo dõi các bản cập nhật trên các mạng phát triển. Tôi không chắc sẽ có bao nhiêu vòng lặp của mạng phát triển này, nhưng tôi rất hào hứng khi thấy nó sắp ra mắt. Tôi thấy Justin có một câu hỏi ở đây. Justin, xin mời bạn.

### FOCIL trong Fusaka hay Glamsterdam? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Được rồi, hãy chuẩn bị tinh thần cho câu hỏi này nhé. Bạn đã đưa ra một quan điểm rất hay rằng thời điểm tốt nhất để giải quyết vấn đề kiểm duyệt là trước khi sự kiểm duyệt xảy ra, đúng không? Vậy: FOCIL trong Fusaka, hay nó có thể đợi đến Glamsterdam? Và với tư cách là một nhà phát triển, tôi nên ủng hộ phương án nào?

**Thomas Thiery:** Chúng tôi đã mở PR và nó đã được hợp nhất, với việc FOCIL được đề xuất cho Fusaka. Chúng tôi nghĩ rằng nó nên được đưa vào Fusaka. Một phần lý do là một số client đã bắt đầu làm việc với nó và họ không gặp quá nhiều trở ngại. Nó không giống như các đề xuất khác khó triển khai hơn nhiều và đòi hỏi nhiều công sức hơn. Và nó cũng không gây nhiều tranh cãi. Tôi không nghĩ có ai lại phản đối khả năng chống kiểm duyệt, và mọi người đều đồng ý rằng nó cần được đưa vào càng sớm càng tốt. Vì vậy, tôi sẽ chọn Fusaka.

Tôi không biết liệu nó có thể đợi được hay không. Các đề xuất và bản nâng cấp luôn có thể đợi. Tôi chỉ muốn tránh một viễn cảnh mà ở đó việc triển khai những thay đổi này không còn dễ dàng nữa. Mọi thứ có thể đảo chiều rất nhanh. Như chúng ta đã thấy, mọi chuyện đã diễn ra theo chiều hướng ngược lại: vài tháng trước, một trong những trình xây dựng chính bất ngờ ngừng kiểm duyệt. Chúng tôi hỏi tại sao, và câu trả lời kiểu như, "ừ, chúng tôi chỉ quyết định không làm thế nữa." Trong trường hợp đó thì tốt, vì nó theo hướng tích cực, nhưng nó hoàn toàn có thể đảo ngược lại, và rồi chúng ta có thể có hai trình xây dựng kiểm duyệt một số giao dịch, và chúng ta sẽ quay lại một tình thế rất tồi tệ.

Một điều khác tôi muốn đề cập, vì tôi thực sự nghĩ nó quan trọng: nếu chúng ta hướng tới một số điều mà chúng ta đã nói đến, như APS, nơi bạn thực sự có thể tách biệt người chứng thực (attester) và người đề xuất với một số thiết kế mà chúng tôi đã thực hiện, chúng ta cần phải có FOCIL trước đó, và chúng ta cần biết FOCIL đang hoạt động tốt. Chúng ta cần FOCIL trên Mạng chính trong sáu tháng, một năm, để thực sự chắc chắn rằng nó đang hoàn thành mục đích của mình, đó là duy trì và cải thiện các đặc tính chống kiểm duyệt của Ethereum. Vì vậy, một sự cấp bách khác, ít nhất là đối với tôi, là nếu chúng ta muốn bảo vệ những người chứng thực khỏi các trò chơi thao túng thời gian (timing games) và một số mối lo ngại khác mà chúng ta muốn giải quyết với APS, chúng ta cần đưa FOCIL vào càng sớm càng tốt.

**Pooja Ranjan:** Đôi khi thật buồn khi thấy các đề xuất không được chọn cho bản nâng cấp tiếp theo hoặc gần nhất, nhưng chỉ có một số lượng đề xuất nhất định mới có thể được đưa vào một bản nâng cấp. Tôi thực sự đánh giá cao tất cả những nỗ lực đằng sau việc đưa ra đề xuất, sự sẵn sàng của đề xuất, cũng như quá trình thử nghiệm đi kèm với nó. Vì vậy, cảm ơn bạn rất nhiều vì tất cả những công việc bạn đang làm cho hệ sinh thái Ethereum.

### Hỏi đáp nhanh (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Trước khi kết thúc, chúng ta có một vòng hỏi đáp nhanh. Điều kiện duy nhất là câu trả lời chỉ nên gồm một từ hoặc một câu, và chúng ta sẽ cố gắng thực hiện với đồng hồ bấm giờ, có thể là 30 giây cho mỗi câu. Nếu bạn đã sẵn sàng, hãy bắt đầu với Julian. Vấn đề khó nhất trong nghiên cứu Chuỗi khối hiện nay là gì?

**Julian Ma:** Tôi sẽ không đùa cợt kiểu meme đâu, nên tôi sẽ trả lời một cách nghiêm túc. Tôi cho rằng vấn đề khó nhất là tương lai của việc đặt cọc: tương lai của việc đặt cọc có ý nghĩa gì, các nhà cung cấp dịch vụ đóng vai trò gì, họ được đền bù như thế nào cho việc đó và họ liên quan đến nhau ra sao.

**Pooja Ranjan:** Đâu là một trường hợp sử dụng Chuỗi khối chưa được khám phá đủ?

**Julian Ma:** Tôi sẽ nói là FOCIL.

**Pooja Ranjan:** Rủi ro bảo mật lớn nhất đối với Ethereum hiện nay là gì?

**Julian Ma:** Thành thật mà nói, tôi cho rằng khả năng chống kiểm duyệt là rất quan trọng ở đây, bởi vì những thứ như MEV đa khối có thể gây ra rủi ro bảo mật khổng lồ, ví dụ như đối với các l2.

**Pooja Ranjan:** MEV nên được giảm thiểu, được đón nhận, hay nằm ở khoảng giữa?

**Julian Ma:** Tôi phần lớn đồng ý với quan điểm của Flashbots ở đây, rằng nó nên được dân chủ hóa, nghĩa là nó nên được tối đa hóa ở những nơi cần thiết và được giảm thiểu ở lớp ứng dụng.

**Pooja Ranjan:** Sự phi tập trung có luôn đáng để đánh đổi không?

**Julian Ma:** Nó thường đáng để đánh đổi.

**Pooja Ranjan:** Đổi mới lớn nhất mà Ethereum đã mang lại cho thế giới là gì?

**Julian Ma:** Ở đây tôi muốn trích dẫn bài phát biểu của Mike Neuder từ Devcon về quyền tài sản kỹ thuật số. Tôi sẽ nói rằng quyền tài sản kỹ thuật số có khả năng chống kiểm duyệt thực sự đang thay đổi thế giới.

**Pooja Ranjan:** Cảm ơn bạn rất nhiều, câu trả lời rất hay. Loạt câu hỏi tiếp theo của tôi dành cho Thomas. Vậy, nếu Ethereum không tồn tại, bạn sẽ làm việc trên Chuỗi khối nào?

**Thomas Thiery:** Tôi nghĩ tôi sẽ rất thích đùa kiểu meme, và Julian đã lật kèo tôi một chút vì tôi tưởng anh ấy cũng sẽ làm như vậy. Chuỗi khối đó sẽ là FOCIL.

**Pooja Ranjan:** Trường hợp sử dụng Chuỗi khối nào bị thổi phồng quá mức nhất?

**Thomas Thiery:** Không có trường hợp sử dụng nào đáng để thổi phồng nếu không có FOCIL.

**Pooja Ranjan:** Đâu là một điều Ethereum cần cải thiện càng sớm càng tốt?

**Thomas Thiery:** Khả năng chống kiểm duyệt, với FOCIL.

**Pooja Ranjan:** Một từ để mô tả sự phi tập trung?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** Bạn có nghĩ Ethereum sẽ giải quyết hoàn toàn khả năng mở rộng không?

**Thomas Thiery:** Ethereum với FOCIL, có.

**Pooja Ranjan:** Mở rộng lớp 1 hay mở rộng lớp 2, cái nào chiến thắng?

**Thomas Thiery:** Vô số lớp, tất cả đều với FOCIL.

**Pooja Ranjan:** Rất tuyệt vời, cảm ơn bạn rất nhiều, Thomas. Cảm ơn bạn đã trả lời tất cả những câu hỏi này. Khi chúng ta chuẩn bị kết thúc, tôi muốn dành cơ hội này cho bạn: nếu bạn có bất kỳ thông điệp nào cho cộng đồng về đề xuất này, hoặc cho cộng đồng Ethereum nói chung.

### Thông điệp gửi đến cộng đồng (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** Thực ra, đó là một điều rất quan trọng, bởi vì chúng tôi luôn có những cuộc thảo luận sôi nổi và tất cả đều công khai trên Discord. Ngay từ đầu đã có một sự thúc đẩy để công khai mọi thứ, và mọi người thực sự đang làm như vậy, nên tôi rất vui. Bạn có thể theo dõi các cuộc thảo luận và tiến độ trên Discord Eth R&D công khai, tại kênh inclusion-list. Đó cơ bản là nơi mọi thứ đang diễn ra ngay lúc này. Sau đó, bạn có thể liên hệ với chúng tôi trên Twitter, Telegram, hay bất cứ đâu. Đừng ngần ngại.

Càng nói chuyện và thu hút được nhiều người tham gia, thiết kế và việc triển khai sẽ càng tốt hơn. Vì vậy, nếu bạn có thể giúp đỡ bằng bất kỳ cách nào, hãy liên hệ và chúng tôi sẽ rất sẵn lòng hỗ trợ về mọi mặt, kể cả về mặt nghiên cứu. Tôi đoán là sẽ càng phù hợp hơn khi chúng tôi làm việc với những người muốn đóng góp cho tương lai của FOCIL. Chúng tôi đã đề cập đến quyền riêng tư, chúng tôi đã đề cập đến các cơ chế phí giao dịch, và chúng tôi cũng sẽ tập trung nhiều vào FOCIL cho các khối dữ liệu. Tất cả những điều này đều cần con người và nỗ lực nghiên cứu. Nếu bạn quan tâm, hãy liên hệ. Cảm ơn rất nhiều vì đã mời chúng tôi, và cũng cảm ơn vì tất cả những công việc bạn làm cho Ethereum.

**Julian Ma:** Chỉ xin nói thêm một chút, tôi hy vọng chúng tôi đã làm cho một số người cảm thấy hào hứng với FOCIL. Nếu bạn thấy hào hứng, xin hãy cho chúng tôi biết. Và nếu bạn vẫn còn một số câu hỏi, chúng tôi rất sẵn lòng giải đáp, và hy vọng chúng tôi có thể thuyết phục bạn rằng FOCIL thực sự là hướng đi đúng đắn. Cảm ơn bạn rất nhiều. Thật sự là một niềm vinh hạnh khi được ở đây, và cảm ơn bạn đã tổ chức buổi trò chuyện này. Và tất nhiên, cũng xin cảm ơn tất cả mọi người đã tham dự.

### Lời kết (59:52) {#closing-words-5952}

**Pooja Ranjan:** Cảm ơn các bạn. Chương trình đến đây là kết thúc. Gửi lời cảm ơn sâu sắc tới Thomas và Julian vì đã tham gia cùng chúng tôi hôm nay và chia sẻ những hiểu biết của họ về EIP-7805. Cảm ơn tất cả những người tham gia; các câu hỏi của các bạn rất đáng khích lệ và cung cấp nhiều thông tin. Cảm ơn các bạn đã theo dõi. Nếu bạn thích cuộc trò chuyện này, hãy nhớ nhấn thích, đăng ký và chia sẻ tập này với những người đam mê Ethereum khác. Chúng tôi sẽ mang đến cho bạn nhiều EIP hơn và tiến độ nghiên cứu trên PEEPanEIP. Hẹn gặp lại lần sau, hãy tiếp tục trau dồi kiến thức và khám phá Ethereum cùng Ethereum Cat Herders. Chúc các bạn một ngày tốt lành.