---
title: "Ví tuyệt vời tiếp theo sẽ là ví riêng tư"
description: "Ví của bạn nhìn thấy mọi địa chỉ bạn nắm giữ, mọi ứng dụng phi tập trung (dapp) bạn kết nối và mọi yêu cầu bạn thực hiện. Chính vị trí đó cũng cho phép nó bảo vệ tất cả những điều này. Một cái nhìn thực tế về các công cụ quyền riêng tư, các thiết lập mặc định và những ý tưởng chưa được phát hành sẽ định hình thế hệ ví Ethereum tiếp theo."
author: "Elliott Alexander"
team: ""
tags:
  - "quyền riêng tư"
  - "ví"
  - "bằng chứng không kiến thức"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Ví tuyệt vời tiếp theo"
lang: vi
---

Hãy chụp lại khoảnh khắc hai phút bạn dành cho ví của mình. Bạn mở ứng dụng, lướt qua số dư, kết nối với một ứng dụng phi tập trung (dapp) mà bạn đang định thử, chấp thuận giao dịch mà nó đưa ra trước mắt bạn và gửi cho một người bạn số ETH bạn nợ họ từ bữa trưa.

Không có gì trong đó mang lại cảm giác bị theo dõi. Không ai hỏi tên bạn. Bạn đóng ứng dụng và tiếp tục ngày mới của mình.

Bây giờ hãy đếm xem những gì thực sự đã bị rò rỉ. Khi khởi chạy, trước khi bạn làm bất cứ điều gì, một loạt các dịch vụ phân tích đã biết địa chỉ IP của bạn và việc bạn sử dụng ví này. Máy chủ mà ví của bạn dùng để đọc chuỗi đã nhìn thấy mọi địa chỉ bạn nắm giữ, được truy vấn từ một IP—toàn bộ danh mục đầu tư của bạn, được nhóm lại gọn gàng cho bất kỳ ai lưu giữ nhật ký. Dapp đã lấy được địa chỉ đang hoạt động của bạn, đó là tất cả những gì bất kỳ ai cần để tra cứu toàn bộ lịch sử của nó. Và khoản thanh toán cho bạn bè của bạn là một hồ sơ công khai vĩnh viễn liên kết ví của bạn với ví của họ.

Mỗi một rò rỉ đó đều đi qua cùng một phần mềm. Ví đã tải các phân tích, chọn máy chủ đó, giao nộp địa chỉ, xây dựng giao dịch. Nhưng cùng một vị trí đó lại có tính hai mặt: lớp nhìn thấy mọi thứ cũng chính là lớp có thể bảo vệ mọi thứ.

Nhiều ví có mô hình kinh doanh dựa trên việc thu thập thông tin này, nhưng có những cách để thực hiện điều này mà không gây rủi ro cho người dùng. Một số công cụ cần thiết đang nằm trên kệ, hoạt động tốt nhưng bị phớt lờ. Một số khác thì chưa ai tìm ra. Cả hai nửa này đều là cơ hội, và bất cứ ai đảm nhận chúng đều đang xây dựng ví tuyệt vời tiếp theo.

## Những gì ví của bạn tiết lộ trên chuỗi {#what-your-wallet-gives-away-onchain}

Bắt đầu trên chuỗi, với những gì công khai bất kể bạn sử dụng ví nào. Một địa chỉ không mang tên, và chỉ riêng sự thật đó đã mang lại nhiều sự an tâm. Nhưng mọi khoản thanh toán bạn đã nhận, mọi hợp đồng bạn đã chạm vào, quy mô số dư của bạn tại thời điểm này và danh sách đầy đủ những người bạn từng giao dịch đều nằm ở chế độ mở, miễn phí cho bất kỳ ai truy vấn. Tính ẩn danh một phần (pseudonymity) chỉ có nghĩa là nó được lưu trữ dưới một trình giữ chỗ thay vì tên của bạn.

Cách phòng thủ tiêu chuẩn là phân tán hoạt động của bạn trên nhiều địa chỉ và hầu hết những người dùng có kinh nghiệm đều làm như vậy. Nó giúp ích ít hơn bạn tưởng. Cấp vốn cho hai địa chỉ từ cùng một nguồn, hoặc để chúng thanh toán cho nhau một lần, và đối với bất kỳ ai chạy phân tích cụm, chúng sẽ gộp lại thành một thực thể duy nhất.

Trở lại năm 2020, [một nghiên cứu](https://fc20.ifca.ai/preproceedings/31.pdf) về bốn năm đầu tiên của Ethereum đã có thể phân cụm 17,9% tất cả các tài khoản thuộc sở hữu bên ngoài đang hoạt động, làm nổi bật hơn 340.000 thực thể kiểm soát nhiều địa chỉ. Đó là sáu năm và một đợt bùng nổ AI trước đây. Sự tách biệt cẩn thận của bạn chỉ cách vài bước nữa là bị phá vỡ.

Không sớm thì muộn, cụm này sẽ bị gắn với một người thật. Đăng ký một tên ENS lặp lại tên người dùng mạng xã hội của bạn, rút tiền một lần từ một sàn giao dịch lưu giữ bản quét hộ chiếu của bạn, hoặc được trả tiền bởi một người lưu giữ các địa chỉ được gắn nhãn trong một bảng tính, và cụm này không còn mang tính trừu tượng nữa.

Các vụ vi phạm dữ liệu cũng góp phần—một email bị rò rỉ cùng với địa chỉ nhà, khớp với một tên ENS trông giống như email đó. Không có điều nào trong số này cần đến trát đòi hầu tòa hay một chuyên gia nữa. AI đã biến việc sàng lọc hàng triệu hồ sơ để tìm ra một kết quả khớp tốt thành một công việc chạy qua đêm và chi phí đang giảm dần.

## Những gì ví của bạn tiết lộ trước khi bạn giao dịch {#what-your-wallet-gives-away-before-you-transact}

Dấu vết trên chuỗi ít nhất yêu cầu bạn phải giao dịch. Dấu vết ngoài chuỗi bắt đầu sớm hơn. Vào đầu năm 2026, một nhà nghiên cứu đã [đưa mười ba ví phổ biến qua một trình phân tích gói tin](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) trên một thiết bị sạch và ghi lại những gì mỗi ví đã làm trong lần khởi chạy đầu tiên, trước khi bất kỳ tài khoản nào tồn tại. Ví trung bình đã liên hệ với khoảng mười bốn miền. Ví tệ nhất đã liên hệ với 26 miền trên 41 địa chỉ IP, bao gồm các lệnh gọi cơ sở hạ tầng số dư tới ba nhà cung cấp riêng biệt, đối với một người dùng chưa tạo ví. Một ví khác trong thử nghiệm đã tích hợp dịch vụ lấy dấu vân tay thiết bị cùng với tám miền phụ phân bổ tiếp thị.

Tất cả những điều đó là những yếu tố chính của ứng dụng tiêu dùng thông thường—phân tích, báo cáo sự cố, phân bổ tiếp thị—nhưng đây không phải là Candy Crush, đây là một ứng dụng có mục tiêu là quyền tự chủ. Cùng một thử nghiệm đó đã tìm thấy [một ví](https://cakewallet.com/) không gửi bất cứ thứ gì trong lần khởi chạy đầu tiên: không có gói tin nào, không có yêu cầu DNS nào. Không có gì về một ví yêu cầu sự trao đổi dữ liệu ồn ào này.

Sau đó là rò rỉ không bao giờ đóng lại. Ví của bạn không giữ một bản sao của chuỗi; bất cứ khi nào nó đọc số dư hoặc gửi một giao dịch, nó sẽ hỏi một máy chủ được gọi là nhà cung cấp RPC (Remote Procedure Call). Trừ khi bạn chạy nút của riêng mình, mọi yêu cầu đều đi qua một trong số này và nhà cung cấp mặc định sẽ nhìn thấy danh sách địa chỉ đầy đủ của bạn, IP của bạn và thời gian của mọi thứ bạn làm. Việc khớp IP đó với tên thuê bao là một yêu cầu hồ sơ thông thường đối với chính phủ.

Khi nhà cung cấp mặc định của MetaMask [thừa nhận vào năm 2022](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash) rằng họ đã ghi lại IP cùng với địa chỉ ví, phản ứng dữ dội đã buộc họ phải [cắt giảm thời gian lưu giữ xuống còn bảy ngày](https://consensys.io/blog/consensys-data-retention-update). Đáng khen ngợi, nhưng biện pháp khắc phục đó là một chính sách và kiến trúc bên dưới không thay đổi: một máy chủ vẫn nhận mọi yêu cầu bạn thực hiện. Và một nhật ký như vậy không cần phải được yêu cầu mới gây ra thiệt hại; nó chỉ cần tồn tại. Cơ sở dữ liệu bị vi phạm, bị bán và âm thầm hợp nhất với những cơ sở dữ liệu khác, và một nhật ký vốn không có ý nghĩa gì khi đứng một mình có thể được kết nối với bạn nhiều năm sau khi nó được viết ra.

Điều cần lưu ý về toàn bộ lớp này là người dùng không bao giờ nhìn thấy bất kỳ phần nào của nó. Việc gửi tiền ít nhất cũng đặt một màn hình xác nhận trước mặt bạn; siêu dữ liệu không có màn hình. Không ai chấp thuận danh sách địa chỉ của họ đi cùng với IP của họ và không có lời nhắc việc ký nào bao gồm các phân tích.

Những thiết lập mặc định này xuất phát từ cẩm nang ứng dụng tiêu dùng tiêu chuẩn—cơ sở hạ tầng vững chắc, báo cáo sự cố hữu ích, số liệu tăng trưởng—được áp dụng mà không suy nghĩ nhiều cho một ứng dụng nắm giữ tiền của mọi người. Đó cũng là phần đáng khích lệ: mọi rò rỉ được đề cập trong phần này đều bắt nguồn từ một quyết định mà trình xây dựng ví có quyền đưa ra.

## Ai đang theo dõi {#whos-looking}

Bắt đầu với những kẻ theo dõi mà bạn ít mong muốn nhất. Tội phạm đã nhận ra rằng một sổ cái công khai cũng đóng vai trò như một danh mục những người có tiền tiết kiệm có thể bị chiếm đoạt bằng vũ lực. Các cuộc tấn công bằng cờ lê (wrench attacks)—những vụ cướp trong đó khóa được trích xuất thông qua bạo lực hoặc đe dọa bạo lực—[đã tăng 75% vào năm 2025](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026) và các nạn nhân đã mất khoảng [101 triệu đô la chỉ trong bốn tháng đầu năm 2026](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report). Và mô hình đã chuyển sang cái mà các nhà điều tra gọi là nhắm mục tiêu dựa trên dữ liệu, trong đó những kẻ tấn công lập hồ sơ tài sản nắm giữ của nạn nhân trên chuỗi trước khi chúng gõ cửa. Trong hơn một nửa số vụ việc gần đây, chúng đã tiếp cận vợ/chồng, con cái hoặc cha mẹ như một đòn bẩy. Một số dư ví có thể truy xuất ngược về tận cửa nhà bạn là một lời mời gọi thường trực đối với tội phạm.

Sau đó là những người theo dõi có huy hiệu. Một sổ cái minh bạch là một hệ thống giám sát mà không chính phủ nào phải xây dựng: một hồ sơ hoàn chỉnh về việc ai đã trả tiền cho ai, khi nào và bao nhiêu, nằm ở chế độ công khai, chỉ cách một truy vấn không cần trát đòi hầu tòa. Điều đó đáng lo ngại đến mức nào phụ thuộc vào việc ai cai trị bạn, và đối với hàng triệu người, câu trả lời là một chính phủ trừng phạt một khoản quyên góp cho đảng đối lập, một đăng ký VPN hoặc tiền tiết kiệm được giữ bằng một loại tiền tệ mà nhà nước không thể in.

Đối với những người dùng đó, sự phơi bày tài chính là mô hình mối đe dọa và các thiết lập mặc định của ví quyết định mức độ phơi bày của họ.

Cả hai loại người theo dõi đều đang nhận được cùng một bản nâng cấp. AI đang làm cho việc theo dõi trở nên rẻ hơn mỗi năm và mọi thứ từng được ghi vào chuỗi đều được lưu lại, có sẵn cho bất kỳ kỹ thuật phân tích mới nào xuất hiện tiếp theo. Không có điều nào trong số này là một lời buộc tội đối với sổ cái công khai; tính minh bạch là thứ cho phép bất kỳ ai xác minh chuỗi. Sự phơi bày nằm ở dấu vết kết nối hồ sơ với bạn—các mô hình cấp vốn, các địa chỉ được sử dụng lại, các nhật ký máy chủ.

Cho đến nay, các ví đã để lại dấu vết đó vì việc để lại nó là con đường ít gặp trở ngại nhất, đối với phần mềm cũng như đối với người dùng. Đó cũng chính xác là thứ mà một ví được định vị để xóa bỏ.

## Tại sao ví là nơi quyền riêng tư được khắc phục {#why-the-wallet-is-where-privacy-gets-fixed}

Thật công bằng khi hỏi tại sao bất kỳ điều nào trong số này lại là công việc của ví. Có những [khám phá tích cực hướng tới quyền riêng tư](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) ở lớp cơ sở của Ethereum và giao thức cuối cùng có thể gánh vác một phần trọng trách này. Nhưng chuỗi nâng cấp thông qua các đợt phân nhánh cứng, tốt nhất là hai lần một năm và các thay đổi liên quan đến quyền riêng tư sẽ trải rộng qua một vài đợt trong số đó. Đó là một mốc thời gian được đo bằng năm và được quyết định bởi một quá trình không nên vội vã.

Trong khi đó, các cá nhân đang quyết định ngay lúc này xem liệu có an toàn khi được trả tiền trên chuỗi, quyên góp, giữ tiền tiết kiệm ở đó hay không. Họ cần quyền riêng tư đến nhanh hơn những gì quá trình đồng thuận xã hội và lịch trình phân nhánh của Ethereum có thể cung cấp.

Lớp ứng dụng không phù hợp với vấn đề này. Ngay cả khi mọi dapp đều phát hành tính năng quyền riêng tư của riêng mình, mỗi dapp chỉ có thể bảo vệ hoạt động bên trong các bức tường của chính nó, theo cách riêng của nó, với những đặc thù và bí mật riêng để người dùng quản lý. Điều làm bạn bị phơi bày là các kết nối chạy qua tất cả chúng—các địa chỉ được chia sẻ, các dấu vết cấp vốn, các liên kết quay lại bạn—và những kết nối đó tồn tại trong không gian giữa các ứng dụng. Giải quyết quyền riêng tư theo từng ứng dụng có nghĩa là giải quyết nó ở mọi nơi ngoại trừ nơi vấn đề thực sự tồn tại. Dapp không phải là nơi giải pháp thực sự có thể tồn tại.

Điều đó để lại ví. Nó là phần mềm duy nhất nhìn thấy mọi dapp bạn kết nối, mọi địa chỉ bạn kiểm soát và mọi yêu cầu bạn thực hiện. Cùng một khả năng hiển thị khiến một ví rò rỉ trở nên tốn kém lại là thứ cho phép một ví cẩn thận điều phối quyền riêng tư trên mọi thứ bạn làm: chọn địa chỉ nào đối mặt với ứng dụng nào, định tuyến các lần đọc để không một máy chủ nào có được toàn bộ bức tranh, thực hiện việc ghi chép sổ sách mà các giao thức quyền riêng tư yêu cầu.

Và các giao thức đó đã tiến xa hơn hầu hết các trình xây dựng giả định. [Railgun](https://railgun.org/) đã xử lý hơn [5 tỷ đô la khối lượng tích lũy](https://dune.com/railgun_project/railgun) và nắm giữ khoảng [80 triệu đô la ngày nay](https://defillama.com/protocol/railgun), công cụ địa chỉ ẩn danh (stealth-address) như [Umbra](https://www.techflowpost.com/en-US/article/30477) đã tạo ra hàng chục nghìn địa chỉ dùng một lần và theo [một thống kê](https://wublock.substack.com/p/ethereum-privacys-https-moment-from), hơn 35 nhóm đang theo đuổi hơn một chục cách tiếp cận riêng biệt đối với các giao dịch chuyển tiền riêng tư.

Chưa có điều nào trong số này là xu hướng chủ đạo và các mảnh ghép thực sự đang bị thiếu. Nhưng các giao thức hoạt động, tiền thật di chuyển qua chúng và những gì chúng thiếu là một vị trí trong luồng chính của người dùng. Đó là nơi một ví có tư duy tiến bộ bước vào.

## Một ví bảo vệ quyền riêng tư thực sự làm gì {#what-a-privacy-preserving-wallet-actually-does}

Bỏ qua các thuật ngữ chuyên môn và hầu hết công việc về quyền riêng tư là ghi chép sổ sách. Sử dụng một địa chỉ mới ở đây, định tuyến khoản tiền gửi qua đó, bảo vệ ghi chú này, chờ đợi trước khi rút tiền, không bao giờ để hai tài khoản đó chạm nhau. Đó là một kỷ luật mà con người làm rất tệ và phần mềm được xây dựng để làm, và ngày nay nó gần như hoàn toàn đè nặng lên người dùng.

Một ví bảo vệ quyền riêng tư là ví tự thực hiện việc ghi chép sổ sách thay vì đặt nó lên người dùng. Người dùng quyết định phải làm gì; ví đảm bảo việc thực hiện điều đó không để lại dấu vết nào quay lại họ.

Bắt đầu với những gì đang hoạt động. Các nhóm được che chắn (shielded pools) hoạt động ngày nay: Railgun giữ một số dư riêng tư bên cạnh số dư công khai của bạn và một khi tiền ở bên trong, một khoản thanh toán ra ngoài không tiết lộ bất cứ điều gì về các tài sản nắm giữ khác của bạn. Các chi phí là có thật—phí cao hơn so với một giao dịch chuyển thông thường, việc tạo bằng chứng được đo bằng giây, một số sự phụ thuộc vào các trình chuyển tiếp (relayers)—nhưng giao thức đã mang theo hàng tỷ khối lượng ngay cả với những sự đánh đổi đó.

Kết hợp điều đó với một thói quen không cần giao thức nào: một địa chỉ mới cho mỗi đối tác. Khi người dùng kết nối với một dapp mới, ví có thể cung cấp một địa chỉ dành riêng cho nó, được cấp vốn từ số dư được che chắn, vì vậy ứng dụng nhìn thấy một tài khoản không có lịch sử và không có tài khoản anh em. Các địa chỉ ẩn danh ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) mở rộng cùng một động thái đó cho việc nhận thanh toán. Các bộ trộn (mixers) như [Tornado Cash](https://tornadocash.eth.limo/) và [Privacy Pools](https://privacypools.com/) làm một công việc đơn giản hơn, hẹp hơn: tiền vào từ một địa chỉ và ra ở một địa chỉ khác, với liên kết giữa hai địa chỉ bị cắt đứt. Đó là công cụ để cấp vốn cho một địa chỉ mới mà không ai có thể truy tìm lại bạn—và mảnh ghép còn thiếu là ví tạo ra một địa chỉ như vậy theo yêu cầu thay vì để lại nghi thức đó cho người dùng. Không có điều nào trong số này chờ đợi một đợt phân nhánh cứng hay một khoản tài trợ nghiên cứu. Nó chờ đợi một ví sẵn sàng thực hiện việc ghi chép sổ sách thay mặt cho người dùng.

Phía mạng lưới chủ yếu là các quyết định. Việc phát hành với không có phân tích của bên thứ ba là một sự lựa chọn và ít nhất một ví trên thị trường đã thực hiện điều đó. Về sự phơi bày RPC, hầu hết các ví đã cho phép bạn hoán đổi nhà cung cấp, vì vậy tính tùy chọn tồn tại, được giấu trong một trang cài đặt mà những người dùng thành thạo truy cập và những người khác không bao giờ tìm thấy.

Động thái chưa được phát hành là sự tách biệt: chỉ định các nhà cung cấp khác nhau cho các địa chỉ khác nhau để không một máy chủ nào nhìn thấy danh sách đầy đủ và đặt một proxy giữa ví và nhà cung cấp để IP và các địa chỉ không bao giờ đi cùng nhau. Một máy khách nhẹ như [Helios](https://github.com/a16z/helios) hoặc [Colibri](https://github.com/corpus-core/colibri-stateless) cho phép ví xác minh các câu trả lời mà nó nhận được thay vì tin tưởng một cách mù quáng. Mỗi điều này đều tốn kém một chút về cơ sở hạ tầng, độ trễ hoặc thời gian kỹ thuật, nhưng không điều nào trong số chúng yêu cầu mật mã học mới.

Sau đó là Biên giới. Việc đọc số dư của bạn ngày nay có nghĩa là tiết lộ tập hợp địa chỉ của bạn cho bất kỳ ai phục vụ truy vấn và công việc để khắc phục điều đó đang diễn ra ngay bây giờ: Môi trường thực thi tin cậy (Trusted Execution Environments) kết hợp với RAM không nhận biết (Oblivious RAM), truy xuất thông tin riêng tư và các máy khách nhẹ hướng tới các lần đọc hoàn toàn riêng tư. Chưa có điều nào trong số đó đủ ổn định để sao chép từ một triển khai tham chiếu, đó chính xác là điều khiến nó trở thành vùng đất đáng để khai phá.

Phía ghi (write side) cũng có hình dạng tương tự: phát sóng ngang hàng và các mạng trộn (mixnets) sẽ giữ cho một giao dịch không mang IP của bạn đến một máy chủ. Những ví đạt được các mảnh ghép này đầu tiên sẽ là những ví mà phần còn lại của lĩnh vực này sẽ được đo lường theo.

Đây là tiêu chuẩn, và lưu ý rằng đó là tiêu chuẩn về trải nghiệm người dùng chứ không phải là một tiêu chuẩn về mật mã học mới lạ. Lấy phần mà bài viết này đã mở đầu—khởi chạy, kết nối, chấp thuận, thanh toán—và giữ cho nó có thể nhận ra được là phiên đó. Sẽ có những sự đánh đổi; một bằng chứng mất vài giây để tạo, một giao dịch chuyển được che chắn tốn nhiều chi phí hơn và một hoặc hai khái niệm mới có thể cần một cái tên trong giao diện.

Cảm giác những khác biệt đó nhỏ đến mức nào là nghệ thuật của sự tích hợp và nó sẽ phân biệt những ví làm đúng điều này với những ví cung cấp nó về mặt kỹ thuật nhưng theo những cách gây khó khăn cho người dùng. Những gì phải thay đổi hoàn toàn: không có phân tích nào kích hoạt khi khởi chạy, mỗi dapp mới gặp một địa chỉ không có lịch sử và khoản thanh toán cho một người bạn không tiết lộ bất cứ điều gì về các tài khoản đằng sau nó.

Quyền riêng tư yêu cầu người dùng trở thành một người khác không bao giờ lan truyền. Khi nó xuất hiện bên trong một trải nghiệm mà người dùng đã hiểu, nó chỉ đơn giản là một ví tốt hơn.

## Những ý tưởng đáng để đánh cắp {#ideas-worth-stealing}

Vượt qua các nguyên tắc cơ bản là một lớp các tính năng mà theo như tôi có thể thấy, chưa ai phát hành. Chỉ là một vài ý tưởng nhưng mỗi ý tưởng đều là thứ có thể khiến một ví trở thành sự lựa chọn hiển nhiên.

Bắt đầu với thời gian. Các tập hợp ẩn danh cần thời gian để phát triển giữa các bước và dấu thời gian của bạn âm thầm tiết lộ nhiều hơn bạn nghĩ—khi nào bạn thức, bạn giữ múi giờ nào, những ngày nào bạn giao dịch. Một ví có thể xếp hàng đợi bất cứ thứ gì không khẩn cấp và kích hoạt nó vào những giờ lẻ: khoản tiền gửi che chắn được giải quyết qua đêm, tiền đã sẵn sàng vào buổi sáng và không có nhịp điệu cuộc sống nào của bạn từng hình thành trên chuỗi.

Sau đó là nút dễ dàng. Một người dùng xuất hiện ngày hôm nay hoàn toàn bị phơi bày—một cụm từ hạt giống được sử dụng nhiều, nhiều năm lịch sử đằng sau nó. Hãy để họ nhập nó và ví sẽ phác thảo một kế hoạch di chuyển để họ chấp thuận—chừng này vào Railgun, chừng này vào Privacy Pools, điều chỉnh tỷ lệ chia theo ý muốn. Sau đó, bất cứ khi nào cần tiền ở chế độ mở, chúng sẽ xuất hiện sẵn sàng và không bị phơi bày: một địa chỉ mới, một giờ lẻ, một số tiền không lặp lại những gì đã đưa vào. Và thường thì không cần lối thoát nào. Bên trong hệ sinh thái của Railgun, người dùng có thể chuyển và giao dịch mà không bao giờ lộ diện, ngoài ra còn tiết kiệm được phí thoát. Một người dùng từng là một cuốn sách mở vào thứ Hai sẽ không thể đọc được vào thứ Sáu, và tất cả những gì họ làm là chấp thuận một kế hoạch.

Một ví cũng có thể kiểm tra lỗi (lint) về quyền riêng tư. Các phương pháp phỏng đoán phân cụm trong nửa đầu của bài viết này là công khai, vì vậy hãy hướng chúng vào giao dịch đang chờ xử lý của chính người dùng và cảnh báo trước chữ ký: khoản thanh toán này sẽ liên kết hai tài khoản này, khoản rút tiền này khớp với khoản tiền gửi của bạn đến từng xu. Các ví đã mô phỏng các giao dịch để bắt các khoản tiền bị rút cạn. Mô phỏng những gì một người theo dõi tìm hiểu được là cùng một động thái nhằm vào một rủi ro khác.

Và cho mọi người thấy những gì người theo dõi đã nhìn thấy. Một bảng điều khiển chạy phân tích cụm trên các tài khoản của chính người dùng biến một mối đe dọa trừu tượng thành thứ mà người dùng cảm thấy cần phải hành động: năm địa chỉ này là một thực thể đối với một người quan sát, tài khoản này sạch, tên ENS này kết nối cả hai. Nó cũng cung cấp cho tính năng nút dễ dàng được đề cập ở trên trạng thái trước và sau của nó.

## Các bước hành động {#action-steps}

### Dành cho các trình xây dựng {#for-builders}

Mỗi phần của bài viết này đều kết thúc ở cùng một nơi: một sự lựa chọn mà ví có quyền đưa ra.

Cách để đưa ra những lựa chọn đó là các thiết lập mặc định hợp lý mà người dùng có thể ghi đè, từng thiết lập một. Mặc định theo con đường riêng tư, bởi vì mặc định là những gì hầu hết người dùng sẽ sống chung. Nhưng hãy để ngỏ cho tính tùy chọn do người dùng dẫn dắt, bởi vì một người dùng không thể trỏ ví của họ vào một máy chủ RPC khác, hoặc nút của riêng họ, thì chưa thực sự được trao quyền tự chủ.

Bạn không cần phải bắt đầu từ con số không. [Kohaku SDK](https://github.com/ethereum/kohaku) đóng gói một số nguyên thủy trong bài viết này—số dư được che chắn, bộ trộn, máy khách nhẹ—vì vậy một ví có thể áp dụng chúng mà không cần xây dựng lại từng giao thức từ đầu. Các mảnh ghép đã có sẵn trên kệ. Một số thứ quan trọng từ rất lâu trước khi bất kỳ ai yêu cầu chúng. Cũng không ai thấy quần chúng kiến nghị về mã hóa đầu cuối; nó được phát hành như một mặc định, hàng tỷ người đã nhận được nó mà không nhận ra hoặc quan tâm, và bây giờ một ứng dụng nhắn tin không có nó mang lại cảm giác bị hỏng và vi phạm.

Tiền không thể được sử dụng để tìm bạn, lập hồ sơ bạn hoặc nhắm mục tiêu bạn thuộc cùng một danh mục. Ví xử lý nó theo cách đó sẽ là ví tuyệt vời tiếp theo.

### Dành cho người dùng {#for-users}

Ví bạn sử dụng là ví bạn đang thúc đẩy như một tiêu chuẩn. Hãy chọn những ví coi trọng quyền riêng tư và sự an toàn của bạn. Điều này có thể có nghĩa là hy sinh giao diện mượt mà nhất để đổi lấy giao diện an toàn nhất và riêng tư nhất. Ngay lúc này, điều này có lẽ có nghĩa là cập nhật những thông tin mới nhất tại [Walletbeat](https://www.walletbeat.fyi/), xem ví nào đang chuyển hướng sang việc kích hoạt quyền riêng tư của người dùng và dành thời gian để dùng thử chúng.

## Để khám phá thêm {#for-further-exploration}

- [Thẻ điểm quyền riêng tư của ví](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) - Sự phơi bày mạng lưới trong lần khởi chạy đầu tiên của 13 ví
- [ERC-5564: Địa chỉ ẩn danh](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/) và [Tornado Cash](https://tornadocash.eth.limo/)
- Máy khách nhẹ [Helios](https://github.com/a16z/helios) và [Colibri](https://github.com/corpus-core/colibri-stateless)
- [Kohaku](https://github.com/ethereum/kohaku) - SDK quyền riêng tư dành cho các trình xây dựng ví
- [Walletbeat](https://www.walletbeat.fyi/) - Cách các ví hiện tại được đánh giá