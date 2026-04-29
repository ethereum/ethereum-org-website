---
title: "EigenLayer: bổ sung tính năng không cần cấp phép vào Ethereum"
description: "Sreeram Kannan trình bày cách tiếp cận của EigenLayer đối với việc bổ sung tính năng không cần cấp phép trên Ethereum."
lang: vi
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "đặt cọc lại"
  - "eigenlayer"
  - "bảo mật"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

Một buổi nói chuyện nghiên cứu của **Sreeram Kannan** (Đại học Washington / EigenLayer) tại một sự kiện nghiên cứu tiền mã hóa của a16z, giải thích cách EigenLayer hướng tới việc cho phép đổi mới không cần cấp phép trên Ethereum bằng cách cho phép những người đặt cọc cam kết cùng một số vốn đã đặt cọc vào các điều kiện phạt cắt giảm bổ sung để đổi lấy việc cung cấp các dịch vụ mới như nguồn cấp dữ liệu, cầu nối, lớp tính khả dụng của dữ liệu và các môi trường thực thi thay thế.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=-V-fG4J1N_M) được xuất bản bởi a16z crypto. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:00) {#introduction-000}

Hôm nay tôi sẽ nói về một trong những sản phẩm mà chúng tôi đang xây dựng, đó cũng là một ý tưởng có tên là EigenLayer. Chúng tôi gọi EigenLayer là tập thể đặt cọc lại, nhưng những gì nó làm là cho phép bất kỳ ai thêm các tính năng mới vào Ethereum.

Như Tim đã giới thiệu, tôi là phó giáo sư tại Đại học Washington ở Seattle, nơi chúng tôi đã làm việc về Chuỗi khối, đồng thuận và các lĩnh vực khác trong bốn năm rưỡi qua. Trong năm qua, tôi đã thành lập công ty khởi nghiệp EigenLayer Labs. Chúng tôi đã thực hiện rất nhiều công việc về các Giao thức đồng thuận — chúng tôi có một bài báo mang tên "Everything is a Race" phân tích các điều kiện mà theo đó các Giao thức loại Chuỗi dài nhất của Bằng chứng công việc (PoW), Bằng chứng cổ phần (PoS) và bằng chứng không gian được bảo mật. Chúng tôi đã xây dựng dựa trên một số hiểu biết đó — ví dụ, một bài báo có tên Prism, là một Giao thức Bằng chứng công việc (PoW) với độ trễ rất thấp. Chúng tôi cũng đã thực hiện một công trình có tên PoSAT về cách tạo ra một Giao thức Bằng chứng cổ phần (PoS) có tính khả dụng động, nơi Giao thức của bạn tiếp tục hoạt động dưới sự tham gia biến đổi.

#### Khi nào các Chuỗi khối có thể giải trình (1:31) {#when-are-blockchains-accountable-131}

Chúng tôi cũng đã khám phá khi nào các Chuỗi khối có thể giải trình. Một phương pháp suy nghiệm là khi bạn có các nhóm đại biểu và chữ ký, nếu một nhóm người đặt cọc ký đúp vào một khối, các Chuỗi khối đó có thể giải trình. Nhưng có những điểm tinh tế — ví dụ, một Giao thức như Algorand, cũng sử dụng các nhóm đại biểu, không thể giải trình vì nó dựa trên các giả định về thời gian, nơi bạn có thể tạo ra các vi phạm an toàn bằng cách không nói bất cứ điều gì.

#### Đồng thuận đa tài nguyên (2:11) {#multi-resource-consensus-211}

Hai công trình gần đây nhất là về đồng thuận đa tài nguyên — giả sử bạn muốn xây dựng một Giao thức sử dụng Bằng chứng cổ phần (PoS), bằng chứng không gian và Bằng chứng công việc (PoW) tất cả kết hợp thành một Giao thức. Bạn muốn nó hoạt động ngay cả khi phần lớn những người khai thác Bằng chứng công việc (PoW) là độc hại, miễn là một phần rất nhỏ những người khai thác Bằng chứng cổ phần (PoS) là trung thực. Chúng tôi đã mô tả các vùng đánh đổi trên nhiều tài nguyên.

Chúng tôi cũng đã làm việc về thiết kế cấu trúc liên kết mạng ngang hàng — làm thế nào để bạn đảm bảo rằng trong mạng lưới ngang hàng của một Chuỗi khối, Giao thức đồng thuận tôn trọng thứ tự của các tin nhắn? Một trong những điều đang xảy ra tràn lan trong các Chuỗi khối là chạy trước. Để ngăn chặn việc chạy trước không có mục tiêu — nơi bạn chỉ muốn đi trước mọi người khác vì bạn có lợi thế về giá — chúng tôi có một bài báo tên là Themis cung cấp cho Chuỗi khối một thuộc tính vào trước ra trước nguyên bản.

Trên nền tảng của đồng thuận, có các giải pháp mở rộng quy mô như phân mảnh. Chúng tôi đã có một vài bài báo — Coded Merkle Tree và Free2Shard — về vấn đề đó.

Một điều chúng tôi nhận thấy là một trở ngại lớn trong Chuỗi khối là tốc độ đổi mới ở các lớp cốt lõi — ở đồng thuận, phân mảnh hoặc mạng ngang hàng — thấp hơn nhiều so với tốc độ đổi mới ở lớp ứng dụng. Các ứng dụng có thể được triển khai không cần cấp phép — bất kỳ ai cũng có thể triển khai một ứng dụng trên một Chuỗi khối hiện có như Ethereum. Trong khi đó, các bản nâng cấp Giao thức cốt lõi lại có cấp phép theo một nghĩa rất sâu sắc. Điều này đã làm đình trệ không gian của chúng ta khá nhiều.

#### Tách biệt niềm tin và sự đổi mới (8:30) {#decoupling-trust-and-innovation-830}

Đưa câu chuyện trở lại năm 2008–2009: Bitcoin đã tiên phong trong niềm tin phi tập trung thông qua việc khai thác Bằng chứng công việc (PoW). Trên nền tảng của việc khai thác, có một Giao thức đồng thuận — Chuỗi dài nhất hoặc Chuỗi nặng nhất — quyết định Chuỗi hợp lệ. Trên nền tảng đó, Bitcoin Script thiết lập ngữ nghĩa thực thi. Vì vậy, chúng ta có một lớp niềm tin ở cơ sở, một lớp đồng thuận ở trên và một lớp thực thi ở trên cùng.

Nhưng Bitcoin cũng là một Chuỗi khối dành riêng cho ứng dụng — được thiết kế cho một ứng dụng: việc trao đổi Bitcoin giữa các máy khách. Quay trở lại năm 2011, bất kỳ ứng dụng mới nào cần được xây dựng trên một Chuỗi khối đều cần mạng lưới niềm tin của riêng nó. Ví dụ, ai đó muốn xây dựng một hệ thống tên miền phi tập trung có tên là Namecoin. Lớp kịch bản của Bitcoin không cung cấp cho bạn đủ khả năng lập trình, vì vậy bạn phải tạo ra một lớp kịch bản mới và một mạng lưới niềm tin mới. Không có cách nào để chia sẻ niềm tin giữa Namecoin và Bitcoin.

Ý tưởng cốt lõi được xây dựng bởi Ethereum là sự tách biệt giữa niềm tin và sự đổi mới. Họ đã lấy lớp kịch bản của Bitcoin và thay thế nó bằng một lớp lập trình Turing-complete đa mục đích — Máy ảo Ethereum. Đây là một bản nâng cấp kỹ thuật nhỏ theo nghĩa cơ bản, nhưng những gì nó tạo ra là tính mô-đun của niềm tin. Giờ đây, bất kỳ ai cũng có thể đến và xây dựng các ứng dụng phi tập trung (dapp) trên hệ thống. Người đã xây dựng ENS không liên quan gì đến mạng lưới niềm tin. Niềm tin của mạng lưới Ethereum đã trở thành một mô-đun có thể được cung cấp cho bất kỳ ứng dụng phân tán nào.

#### Đổi mới mở (10:23) {#open-innovation-1023}

Điều này đã dẫn đến sự tăng tốc mạnh mẽ của nền kinh tế ẩn danh. Bất kỳ ai tạo ra các ứng dụng này — bản thân họ không được tin tưởng, họ chỉ đang mang lại sự đổi mới. Bạn nảy ra một ý tưởng, bạn có thể là một người vô danh, bạn không cần phải được tin tưởng, bạn chỉ cần viết mã của mình, đưa nó lên Ethereum và mọi người đều tin tưởng rằng Ethereum sẽ tiếp tục thực thi các điều kiện như đã nêu.

Một cách để mô hình hóa điều này: các lớp cơ sở — mạng lưới niềm tin, đồng thuận và máy ảo — được gộp lại thành một mạng lưới niềm tin tạo ra niềm tin. Chuỗi khối Ethereum là một nhà sản xuất niềm tin. Các ứng dụng phân tán là những người tiêu thụ niềm tin. Sự trao đổi giá trị là: các dapp nhận được niềm tin từ Ethereum và đổi lại trả phí. Giống như vốn đầu tư mạo hiểm là sự tách biệt giữa vốn và sự đổi mới, Ethereum đã tách biệt niềm tin và sự đổi mới.

Nhưng những rào cản đối với đổi mới mở vẫn tiếp tục tồn tại. Nếu tôi có một ý tưởng về cách nâng cấp Giao thức đồng thuận Ethereum — giả sử đó là năm 2019 và tôi đã nghĩ ra Giao thức đồng thuận Avalanche — không có cách nào để triển khai nó lên Ethereum. Vậy tôi phải làm gì? Tôi đi và tạo ra toàn bộ thế giới của riêng mình. Đây là kỷ nguyên của các Chuỗi khối lớp 1 (l1) thay thế — mỗi Chuỗi có các Giao thức đồng thuận khác nhau, các máy ảo khác nhau, nhưng mỗi Chuỗi đều phải xây dựng mạng lưới niềm tin của riêng mình.

Bức tranh này trông giống hệt như bức tranh năm 2011 của Bitcoin và Namecoin. Những đổi mới ở cấp độ dapp có thể đơn giản được xây dựng trên Ethereum, nhưng những đổi mới đi sâu hơn và chạm đến cốt lõi của ngăn xếp công nghệ phải tạo ra các hệ sinh thái niềm tin bị phân mảnh.

Hơn nữa, Ethereum chỉ cung cấp niềm tin cho các dapp trong việc tạo khối — sắp xếp giao dịch và thực thi giao dịch. Chỉ có vậy thôi. Nếu các dapp muốn có niềm tin vào bất kỳ điều gì khác — đọc dữ liệu từ internet, đọc dữ liệu từ một Chuỗi khối khác, chạy một công cụ thực thi khác, chạy một công cụ trò chơi, chạy một hệ thống xác thực — họ phải tạo ra mạng lưới niềm tin của riêng mình. Chainlink là một ví dụ tuyệt vời: nó là một Giao thức nguồn cấp dữ liệu giúp lấy dữ liệu từ internet vào Chuỗi khối, nhưng Chainlink có mạng lưới niềm tin của riêng nó. Niềm tin của nó không được vay mượn từ những người đặt cọc Ethereum.

#### Vấn đề kinh tế vi mô (16:28) {#microeconomic-problem-1628}

Vấn đề kinh tế vi mô: nếu bạn đang chạy một phần mềm trung gian — giả sử, một hệ thống lưu trữ dữ liệu — bạn phải tạo ra cơ chế đặt cọc của riêng mình. Bạn cần bảo mật kinh tế cao, điều đó có nghĩa là rất nhiều vốn được đặt cọc, và sau đó bạn có chi phí cơ hội của vốn. Ví dụ, bạn muốn 10 tỷ đô la được đặt cọc trong lớp lưu trữ dữ liệu của mình. Bạn phải trả lãi suất hàng năm 5% hoặc 10% trên số vốn đó trong một thế giới phi đầu cơ. Chi phí chủ yếu không phải là chi phí hoạt động của việc lưu trữ dữ liệu — mà là chi phí để nuôi dưỡng một cơ sở vốn kinh tế khổng lồ.

Bạn nhìn vào bất kỳ hệ sinh thái Bằng chứng cổ phần (PoS) nào: 94% phần thưởng thuộc về người nắm giữ vốn và chỉ 6% thuộc về người thực sự thực hiện các hoạt động. Vì vậy, ngay cả khi bạn nảy ra một ý tưởng đột phá để giảm chi phí hoạt động đi 10 lần, thì 94% đó vẫn không thay đổi. Cấu trúc chi phí của bạn bị giới hạn bởi chi phí vốn.

Nếu bạn là một dapp, vấn đề kinh tế vi mô là bạn đang trả một khoản phí rất cao cho một mạng lưới niềm tin lớn như Ethereum, nhưng bạn bị giới hạn bởi niềm tin yếu nhất mà bạn đang phụ thuộc vào. Nếu bạn có một nguồn cấp dữ liệu hoặc một cầu nối không đáng tin cậy bằng, bạn có thể bị khai thác ở đó. Bảo mật của bạn luôn là mẫu số chung nhỏ nhất.

#### Vấn đề kinh tế (19:52) {#economic-problem-1952}

Đối với Chuỗi khối cốt lõi, nếu đề xuất giá trị cốt lõi là cung cấp niềm tin phi tập trung và tạo ra doanh thu từ nó, Ethereum chỉ có thể cung cấp niềm tin phi tập trung trong việc tạo khối — không phải trên tất cả những thứ khác cần thiết để chạy một dịch vụ phi tập trung. Các hòn đảo niềm tin phi tập trung đang được tạo ra bởi các phần mềm trung gian khác, và thay vì doanh thu được liên kết và tạo ra một mạng lưới niềm tin khổng lồ, doanh thu lại bị phân mảnh thành các hòn đảo nhỏ hơn.

#### EigenLayer (20:44) {#eigenlayer-2044}

Đó thực sự là một ý tưởng đơn giản đến mức nực cười nhưng lại giải quyết tất cả những vấn đề này cùng một lúc.

EigenLayer là một cơ chế để tận dụng một mạng lưới niềm tin hiện có để làm những việc khác mà nó không được dự định làm. Ethereum cung cấp niềm tin về việc sắp xếp và thực thi. EigenLayer là một loạt các hợp đồng thông minh trên Ethereum, và từ khóa hoạt động cốt lõi là đặt cọc lại.

Đặt cọc lại là gì? Trong Ethereum Bằng chứng cổ phần (PoS), vài chục tỷ đô la đã được đặt cọc trong Chuỗi Beacon. EigenLayer là một cơ chế mà qua đó những người đặt cọc thực hiện việc đặt cọc lại — họ đặt cùng một số vốn vào rủi ro bổ sung. Họ khóa khoản đặt cọc của mình trong Ethereum, và cùng khoản đặt cọc đó được cam kết vào các điều kiện phạt cắt giảm bổ sung. Phạt cắt giảm là một cơ chế mà qua đó khoản đặt cọc của bạn có thể bị tước đi, nhưng bây giờ bạn thêm các lý do bổ sung mà bạn có thể bị phạt, trên nền tảng của các hợp đồng thông minh EigenLayer.

Thuộc tính mà chúng tôi muốn: cùng một khoản đặt cọc chịu thêm rủi ro. Rủi ro bổ sung về cái gì? Về việc cung cấp bất kỳ dịch vụ mới nào đã được xây dựng trên EigenLayer — ai đó muốn xây dựng một nguồn cấp dữ liệu, một cầu nối, một lớp tính khả dụng của dữ liệu, một Giao thức đồng thuận mới. Bất kỳ dịch vụ nào trong số này đều có thể được xây dựng trên EigenLayer. Nếu bạn là một người đặt cọc chọn tham gia, bạn cũng chỉ định tập hợp con các dịch vụ nào bạn đang chọn tham gia — và qua đó thu được doanh thu trong khi cũng chịu thêm rủi ro phạt cắt giảm.

#### Cách EigenLayer liên kết hệ sinh thái (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

Đối với phần mềm trung gian: nếu một người đặt cọc đã đặt cọc trong Ethereum chọn tham gia để cũng cung cấp các dịch vụ trên một nguồn cấp dữ liệu, họ không có thêm chi phí vốn. Họ đã đặt cọc trên Ethereum và đang kiếm được APR. Bằng cách chọn tham gia EigenLayer, chi phí vốn cận biên là rất nhỏ hoặc về mặt lý thuyết là bằng không. Nếu bạn biết rằng với tư cách là một nút trung thực, bạn sẽ không bao giờ bị phạt cắt giảm, rủi ro sẽ được giảm thiểu. Phương trình trở thành: chi phí hoạt động có hợp lý so với doanh thu không? Cấu trúc chi phí của phần mềm trung gian đột nhiên chuyển từ bị giới hạn bởi vốn sang bị giới hạn bởi chi phí hoạt động.

Đối với các dapp: đặc biệt là các dịch vụ phổ biến mà nhiều người đặt cọc chọn tham gia cung cấp cùng một niềm tin như chính Ethereum. Nếu tất cả những người đặt cọc có khả năng chọn tham gia, bạn có thể nhận được niềm tin cốt lõi của Ethereum trên các dịch vụ không được xây dựng nguyên bản vào Ethereum.

Nó cũng phù hợp về mặt giá trị với hệ sinh thái cốt lõi. Những người đặt cọc đã đặt cọc trên Ethereum nhận được phần thưởng khối và phí giao dịch, nhưng họ cũng có thể nhận được phí nguồn cấp dữ liệu, phí Tính khả dụng của dữ liệu, phí sắp xếp — tất cả những thứ mà trước đây không có sẵn. Việc có thêm các nguồn doanh thu cho việc đặt cọc ETH làm tăng giá trị của chính token đó.

EigenLayer là một thị trường hai mặt. Một mặt là những người đặt cọc chọn tham gia. Mặt khác là các phần mềm trung gian và dịch vụ được xây dựng trên EigenLayer chọn tham gia để sử dụng những người đặt cọc này.

#### Đòn bẩy quá mức và quản lý rủi ro (33:00) {#over-leveraging-and-risk-management-3300}

**Câu hỏi từ khán giả:** Điều gì xảy ra nếu khoản đặt cọc đang bị sử dụng đòn bẩy quá mức?

Giả sử có mười dapp khác nhau chạy các Chuỗi riêng của chúng, mỗi dapp có giá trị 1 triệu đô la dựa vào cùng một nhóm đại biểu người đặt cọc trị giá 2 triệu đô la — khoản đặt cọc đó trở nên bị sử dụng đòn bẩy quá mức. EigenLayer cũng là lớp quản lý rủi ro. Chúng tôi mô hình hóa điều này như một bài toán đồ thị: mỗi người đặt cọc là một nút, mỗi dịch vụ phụ thuộc vào một nhóm người đặt cọc và có một khoản lợi nhuận từ việc trục lợi cho mỗi dịch vụ. Sau đó, bạn tính toán các lát cắt trên đồ thị này để đảm bảo hệ thống không bao giờ bị sử dụng đòn bẩy quá mức.

Nếu hệ thống bị sử dụng đòn bẩy quá mức, phí sẽ tăng lên, nhiều người chọn tham gia hơn và hệ thống lại trở nên ít đòn bẩy hơn. Khi có nhiều dịch vụ bắt đầu hơn, cơ hội lợi suất tăng lên và nhiều vốn hơn bị khóa lại — thay vì 5% ETH được đặt cọc, bạn có thể có 50%.

#### Kinh tế học không gian khối (43:58) {#block-space-economics-4358}

Không gian khối được xác định bởi giới hạn khối — kích thước tối đa mà một khối có thể chứa. Tất cả các hệ thống Chuỗi khối đều có tính kinh tế tự điều chỉnh, trong đó khi kích thước khối của bạn tiến gần đến giới hạn khối, giá cả bắt đầu bùng nổ.

Giới hạn khối được thiết lập bởi cơ sở hạ tầng của nút yếu nhất. Triết lý của Ethereum là chấp nhận một trình xác thực tại nhà ở Venezuela — có thể là 1 megabyte mỗi giây. Vì vậy, đó là cách giới hạn khối được thiết lập. Nhưng tất cả những người đặt cọc chạy trên Amazon Web Services đều có kết nối 10 gigabit — chênh lệch 10.000 lần so với nút yếu nhất.

EigenLayer tự động giải quyết vấn đề này bằng cách tạo ra một thị trường tự do nơi những người đặt cọc này có thể cho thuê không gian khối bổ sung của họ cho các dịch vụ khác. Ai đó có thể xây dựng một Chuỗi khác với 15 giga-gas mỗi khối thay vì 15 triệu Gas. Bạn nhận được khoảng 60% bảo mật của Ethereum — và điều đó đã là đủ tốt rồi.

#### Sự không đồng nhất của người đặt cọc (48:57) {#staker-heterogeneity-4857}

Sự không đồng nhất của người đặt cọc vượt ra ngoài khả năng tính toán. Những người đặt cọc rất không đồng nhất trong sở thích rủi ro và phần thưởng của họ. Bạn và tôi có thể đồng ý rằng chúng ta sẽ bị phạt cắt giảm nếu chúng ta khác với đầu ra API của Coinbase, nhưng đối với người khác, điều đó hoàn toàn không thể chấp nhận được. Điều này không bao giờ có thể được bình thường hóa vào một Giao thức cốt lõi nhưng có thể được ngoại hóa thành một lớp chọn tham gia.

Những người đặt cọc cũng không đồng nhất trong sở thích phần thưởng. Trong Ethereum, không gian khối là một đại lượng không màu — tất cả các giao dịch đều bình đẳng và tín hiệu duy nhất để phân biệt chúng là giá cả. Rất khó để xây dựng một mạng xã hội trên Ethereum vì mọi giao dịch mạng xã hội đều cạnh tranh với một giao dịch tài chính phi tập trung (DeFi) mang lại lợi nhuận cao hơn nhiều trên cơ sở từng giao dịch. Giải pháp của chúng tôi: những người đặt cọc chọn tham gia vào các chuỗi phụ khác nhau, trong đó họ có các sở thích phần thưởng khác nhau.

#### Đổi mới dân chủ và linh hoạt (51:01) {#democratic-and-agile-innovation-5101}

EigenLayer giải quyết vấn đề làm thế nào để thiết kế một Chuỗi khối vừa dân chủ vừa linh hoạt trong đổi mới. Ethereum được Quản trị rất dân chủ nhưng cũng phản hồi rất chậm. Tất cả các Giao thức ngày nay đều phải đánh đổi giữa sự linh hoạt và Quản trị dân chủ. Ethereum cộng với EigenLayer có được những điều tốt nhất của cả hai thế giới: một lớp cơ sở dân chủ và được cập nhật từ từ, trên nền tảng đó EigenLayer cho phép mọi người xây dựng các đổi mới phản hồi nhanh chóng với nhu cầu thị trường theo một cách hoàn toàn không cần cấp phép.

#### EigenDA và lời kết (52:56) {#eigenda-and-closing-5256}

Chúng tôi đang khám phá việc xây dựng các cầu nối, tự động hóa theo sự kiện, các dịch vụ sắp xếp công bằng, các chuỗi phụ và tích hợp MEV — tất cả đều trên EigenLayer. EigenLayer đã hoạt động trên các mạng thử nghiệm nội bộ. Chúng tôi đã xây dựng trường hợp sử dụng đầu tiên: một lớp tính khả dụng của dữ liệu siêu quy mô cho Ethereum có tên là EigenDA. Nó là một lớp tính khả dụng của dữ liệu kết hợp các ý tưởng tốt nhất trong mã hóa xóa và các cam kết đa thức. Trên mạng thử nghiệm của chúng tôi, tốc độ mà bạn có thể ghi dữ liệu là 12,4 megabyte mỗi giây — lớn hơn 10 lần so với những gì Ethereum 2.0 dự kiến sẽ phát hành.

Hiểu biết sâu sắc then chốt là với mã hóa xóa, tổng chi phí lưu trữ một tệp không phụ thuộc vào số lượng nút đã chọn tham gia. Nhưng mức giá bạn có thể tính phụ thuộc vào số lượng nút vì bạn đang cung cấp nhiều bảo mật kinh tế hơn. Có một nền kinh tế tự mở rộng quy mô, nơi ngày càng có nhiều nút sẽ chọn tham gia vì họ có thể tính một khoản phần bù bảo mật mà không làm tăng chi phí hoạt động. Mã hóa xóa phá vỡ sự đánh đổi giữa khả năng mở rộng và sự phi tập trung — bạn có được sự phi tập trung hoàn toàn và khả năng mở rộng hoàn toàn cùng một lúc.

#### Điểm nổi bật của phần Hỏi & Đáp (58:00) {#qa-highlights-5800}

**Về kiểm toán phần mềm trung gian:** Giống như có một hệ sinh thái kiểm toán hợp đồng thông minh, chúng ta cần các hệ sinh thái kiểm toán phần mềm trung gian. Kiểm toán hợp đồng thông minh phục vụ những người dùng được cho là không biết gì. Kiểm toán phần mềm trung gian phục vụ những người đặt cọc được cho là biết một số thứ. Nếu chúng ta không thể làm cho các kiểm toán phần mềm trung gian hoạt động, chúng ta cũng không thực sự nên tin tưởng vào các kiểm toán hợp đồng thông minh.

**Về rủi ro:** Ví dụ cực đoan — tất cả khoản đặt cọc đã chọn tham gia vào một hệ thống EigenLayer nơi bạn có thể bị phạt cắt giảm ngay cả khi không làm bất cứ điều gì xấu, và sau đó bạn bị phạt cắt giảm và toàn bộ Giao thức gặp rủi ro. Điều đó là có thể. Nhưng những người đặt cọc là những người mất tiền của họ, vì vậy họ nên cẩn thận hơn trong việc chọn tham gia. Làm cho họ dễ dàng cẩn thận hơn là những gì chúng tôi đang tập trung vào.

**Về không gian khối lớp 1 (l1) so với các chuỗi phụ:** Bạn có thể chạy một hệ thống rất khác — như Solana VM — trên mạng lưới niềm tin của Ethereum. Điều kiện phạt cắt giảm rất đơn giản: nếu bạn ký đúp vào một khối ở cùng độ sâu, đó là một điều kiện có thể xác minh trên chuỗi và bạn bị phạt cắt giảm. Cấu trúc chi phí hoạt động vì những người đặt cọc lại không có thêm chi phí vốn, và sự khác biệt giữa một chuỗi phụ EigenLayer và việc có Chuỗi của riêng bạn là bạn không cần một token giá trị mới và bạn không cần phải trả tiền để duy trì chi phí vốn của token đó.