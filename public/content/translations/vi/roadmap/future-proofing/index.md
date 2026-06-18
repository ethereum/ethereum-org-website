---
title: "Bảo vệ Ethereum trong tương lai và bảo mật lượng tử mật mã"
description: "Những bản nâng cấp này củng cố Ethereum như một lớp cơ sở phi tập trung, kiên cường cho tương lai, bất kể điều gì có thể xảy ra."
lang: vi
image: /images/roadmap/roadmap-future.png
alt: "Lộ trình Ethereum"
template: roadmap
summaryPoints:
  - Mật mã học hậu lượng tử đảm bảo Ethereum có thể tồn tại trước các mối đe dọa phần cứng tiên tiến khi điện toán lượng tử phát triển
  - Việc đơn giản hóa giao thức giúp Ethereum dễ dàng bảo trì, kiểm toán và bảo mật hơn
  - Các bản nâng cấp gần đây đã mang lại những cải thiện hiệu quả đáng kể
---

Một số phần của lộ trình không nhằm mục đích mở rộng quy mô hay bảo mật Ethereum ngay lúc này. Chúng nhằm mục đích làm cho Ethereum **ổn định và đáng tin cậy trong tương lai xa**. Điều này có nghĩa là chuẩn bị cho các loại mối đe dọa mới và loại bỏ sự phức tạp không cần thiết khỏi giao thức.

## Kháng lượng tử {#quantum-resistance}

Ethereum sử dụng [mật mã học](/glossary/#cryptography) để giữ cho mạng lưới an toàn và bảo vệ tiền của người dùng. Cuối cùng, một số phương pháp mật mã này sẽ **dễ bị tấn công bởi các máy tính lượng tử**, vốn có thể giải quyết các vấn đề toán học cụ thể nhanh hơn theo cấp số nhân so với các máy tính cổ điển.

**Hiện nay không có máy tính lượng tử nào có thể phá vỡ mật mã học của Ethereum.** Phần cứng cần thiết vẫn chưa tồn tại ở quy mô lớn. Nhưng nghiên cứu gần đây cho thấy khoảng cách này đang thu hẹp nhanh hơn dự kiến trước đây. Vào tháng 3 năm 2026, Google Quantum AI đã công bố một bài báo ước tính rằng việc phá vỡ mật mã học đường cong elliptic 256-bit (loại mà Ethereum sử dụng cho chữ ký tài khoản) có thể cần khoảng 1.200 qubit logic, ít hơn khoảng 20 lần so với các ước tính trước đó. Google đã đặt ra thời hạn nội bộ là năm 2029 để di chuyển các hệ thống của riêng mình sang mật mã học an toàn lượng tử.

Các quá trình chuyển đổi mật mã học mất nhiều năm để lập kế hoạch và thực hiện một cách an toàn. Bởi vì mô hình bảo mật của Ethereum được thiết kế để tồn tại trong nhiều thập kỷ, việc chuẩn bị hậu lượng tử đã nằm trong lộ trình của Ethereum trước khi nó trở thành tiêu đề trên các phương tiện truyền thông chính thống. Việc chuẩn bị mạng lưới đang diễn ra ngay bây giờ để đảm bảo quá trình chuyển đổi liền mạch, chứ không phải là phản ứng trước một trường hợp khẩn cấp.

### Những gì đang gặp rủi ro? {#what-is-at-risk}

Bốn lĩnh vực chính trong mật mã học của Ethereum đã được xác định là cần nâng cấp hậu lượng tử:

1. **Chữ ký đồng thuận (BLS)**: Các [trình xác thực](/glossary/#validator) sử dụng chữ ký BLS để bỏ phiếu cho các [khối](/glossary/#block) hợp lệ. Một máy tính lượng tử có thể giả mạo những chữ ký này.
2. **Tính khả dụng của dữ liệu (cam kết KZG)**: Các [lược đồ cam kết](/roadmap/danksharding/#what-is-kzg) giúp Ethereum mở rộng quy mô dựa trên toán học (cụ thể là ghép cặp đường cong elliptic) vốn dễ bị tấn công lượng tử.
3. **Chữ ký tài khoản (ECDSA)**: Lược đồ chữ ký bảo vệ các tài khoản Ethereum cá nhân. Khi một tài khoản gửi một giao dịch, khóa công khai của nó sẽ bị lộ trên chuỗi. Một máy tính lượng tử có thể suy ra khóa riêng tư từ khóa công khai bị lộ này, có khả năng cho phép đánh cắp tiền.
4. **Bằng chứng ZK ở lớp ứng dụng**: Các hệ thống bằng chứng không kiến thức được sử dụng bởi các bản cuộn và các ứng dụng khác dựa trên các giả định mật mã học mà máy tính lượng tử có thể phá hoại.

<ExpandableCard title="Máy tính lượng tử có thể đánh cắp ETH của tôi hôm nay không?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

Không. Hiện nay không có máy tính lượng tử nào có thể phá vỡ mật mã học của Ethereum. Công việc được mô tả trên trang này là sự chuẩn bị cho tương lai, không phải là phản ứng trước một mối đe dọa hiện hữu. Khi các ví hậu lượng tử ra mắt, phần mềm ví sẽ hướng dẫn bạn thực hiện quá trình di chuyển. Hiện tại, bạn không cần phải làm gì cả.

</ExpandableCard>

### Những gì đang được thực hiện? {#what-is-being-done}

Ethereum hiện là bên phòng thủ chủ động nhất trước các mối đe dọa lượng tử trong hệ sinh thái chuỗi khối. Tổ chức Ethereum đã thành lập một **nhóm Bảo mật Hậu lượng tử** chuyên trách vào tháng 1 năm 2026, và công việc tích cực đang diễn ra trên nhiều nhóm máy khách và nhóm nghiên cứu. Công việc của nhóm Hậu lượng tử thuộc Tổ chức Ethereum (EF) được theo dõi công khai tại [pq.ethereum.org](https://pq.ethereum.org).

Các công việc đang diễn ra bao gồm:

- **Chữ ký dựa trên mã băm (leanXMSS)**: Một sự thay thế an toàn lượng tử cho chữ ký của trình xác thực, được xây dựng trên các hàm băm mà máy tính lượng tử không thể phá vỡ một cách hiệu quả.
- **zkVM tối giản (leanVM)**: Bởi vì các chữ ký an toàn lượng tử lớn hơn các chữ ký hiện đang được sử dụng, leanXMSS được ghép nối với một zkVM tối giản (leanVM). Công cụ này tổng hợp các chữ ký an toàn lượng tử một cách hiệu quả, nén dữ liệu gấp 250 lần, để mạng lưới vẫn duy trì tốc độ nhanh sau quá trình chuyển đổi.
- **Thử nghiệm khả năng tương tác hàng tuần**: Hơn 10 nhóm máy khách tham gia vào các mạng thử nghiệm (devnet) hậu lượng tử thường xuyên.
- **Tính khả dụng của dữ liệu:** Việc nâng cấp mật mã học cơ bản được sử dụng để xử lý lượng lớn dữ liệu mạng lưới sẽ đảm bảo Ethereum luôn nhanh chóng và có chi phí sử dụng phải chăng mà không gặp rủi ro về các lỗ hổng lượng tử trong tương lai.
- **Giải thưởng Poseidon**: Một giải thưởng nghiên cứu trị giá 1 triệu đô la nhằm mục tiêu cải thiện các nguyên thủy mật mã học dựa trên mã băm.
- **Tiêu chuẩn NIST**: Viện Tiêu chuẩn và Công nghệ Quốc gia Hoa Kỳ đã hoàn thiện ba tiêu chuẩn mật mã học hậu lượng tử vào tháng 8 năm 2024 (ML-KEM, ML-DSA, SLH-DSA). Công việc của Ethereum được xây dựng dựa trên những nền tảng này.

Một phần quan trọng của chiến lược chuyển đổi là **EIP-8141**, giới thiệu tính năng [trừu tượng hóa tài khoản](/roadmap/account-abstraction/) gốc. Điều này cho phép các tài khoản cá nhân chọn xác minh chữ ký của riêng họ, nghĩa là người dùng có thể chuyển sang các chữ ký an toàn lượng tử **mà không cần chờ đợi một đợt di chuyển duy nhất trên toàn giao thức**. EIP-8141 đang được xem xét cho đợt phân nhánh cứng Hegotá (dự kiến vào nửa cuối năm 2026).

Tổ chức Ethereum đã vạch ra các cột mốc phân nhánh có cấu trúc nhằm mục tiêu hoàn thành cơ sở hạ tầng hậu lượng tử cốt lõi vào khoảng năm 2029. Đây là các mục tiêu lập kế hoạch, không phải là những cam kết được đảm bảo.

[Đọc hướng dẫn chi tiết của chúng tôi về mật mã học hậu lượng tử trên Ethereum](/roadmap/future-proofing/quantum-resistance/)

## Ethereum đơn giản và hiệu quả hơn {#simpler-more-efficient-ethereum}

Sự phức tạp tạo ra cơ hội cho các lỗi và lỗ hổng. Một phần của lộ trình tập trung vào việc **đơn giản hóa Ethereum và loại bỏ nợ kỹ thuật** để giao thức dễ dàng bảo trì, kiểm toán và suy luận hơn.

### Những gì đã được bàn giao {#what-has-been-delivered}

Một số bản nâng cấp gần đây đã làm cho Ethereum đơn giản và hiệu quả hơn:

- **[Pectra (Tháng 5 năm 2025)](/roadmap/pectra/)**: Đã giới thiệu EIP-7702, cho phép các tài khoản thuộc sở hữu bên ngoài tạm thời ủy quyền cho mã hợp đồng thông minh, một bước đệm hướng tới [trừu tượng hóa tài khoản](/roadmap/account-abstraction/) hoàn toàn. Đồng thời bổ sung hợp đồng tiền biên dịch BLS12-381 (EIP-2537), xử lý tiền gửi trên chuỗi (EIP-6110), truy cập mã băm khối lịch sử trong EVM (EIP-2935), và tăng số dư hiệu dụng tối đa cho các trình xác thực (EIP-7251).
- **[Fusaka (Tháng 12 năm 2025)](/roadmap/fusaka/)**: Đã triển khai PeerDAS (EIP-7594), một hệ thống lấy mẫu tính khả dụng của dữ liệu ngang hàng giúp phân phối khối lượng công việc về tính khả dụng của dữ liệu trên toàn mạng lưới. Đồng thời tăng các tham số khối dữ liệu, mở rộng thông lượng dữ liệu cho các [bản cuộn](/glossary/#rollups).
- **[Dencun (Tháng 3 năm 2024)](/roadmap/dencun/)**: Đã giới thiệu các giao dịch khối dữ liệu (EIP-4844) để có dữ liệu Rollup rẻ hơn và hạn chế `SELFDESTRUCT` (EIP-6780) nhằm loại bỏ một nguồn gây phức tạp tồn tại từ lâu.
- **[London (Tháng 8 năm 2021)](/ethereum-forks/#london)**: Đã đại tu việc định giá [Gas](/glossary/#gas) với EIP-1559, giới thiệu phí cơ sở và cơ chế đốt để có chi phí giao dịch dễ dự đoán hơn.

### Những gì đang được tiến hành {#what-is-in-progress}

- **[Glamsterdam (dự kiến nửa đầu năm 2026)](/roadmap/glamsterdam/)**: Đang được xem xét để đưa vào: tách biệt người đề xuất và người xây dựng (PBS) được tích hợp sẵn (EIP-7732), danh sách truy cập cấp độ khối (EIP-7928), và định giá lại Gas để điều chỉnh chi phí phù hợp hơn với mức sử dụng tài nguyên thực tế.
- **Hegotá (dự kiến nửa cuối năm 2026)**: Đang được xem xét để đưa vào: [cây Verkle](/roadmap/verkle-trees/), thay thế cấu trúc dữ liệu hiện tại bằng một cấu trúc hiệu quả hơn cho phép các máy khách phi trạng thái. Đồng thời cũng nhắm mục tiêu cho EIP-8141 (trừu tượng hóa tài khoản gốc).
- **Đang diễn ra**: Các nỗ lực nhằm đơn giản hóa [EVM](/developers/docs/evm/), hài hòa hóa các triển khai máy khách và loại bỏ dần các tính năng không còn được dùng nữa vẫn tiếp tục diễn ra trong toàn bộ cộng đồng phát triển Ethereum.

## Tiến độ hiện tại {#current-progress}

Tính đến đầu năm 2026:

**Đơn giản hóa và hiệu quả**: Pectra và Fusaka đã mang lại những cải thiện thực sự về tính linh hoạt của tài khoản, tính khả dụng của dữ liệu và hoạt động của trình xác thực. Glamsterdam và Hegotá đang được tích cực phát triển với các mục tiêu rõ ràng nhằm làm cho mạng lưới kiên cường và hiệu quả hơn, đồng thời loại bỏ các phụ thuộc bên ngoài.

**Mật mã học hậu lượng tử**: Nghiên cứu tích cực và triển khai ban đầu đang được tiến hành. Hệ sinh thái đã tài trợ cho các giải thưởng nghiên cứu và chạy các mạng thử nghiệm (devnet) tương tác hàng tuần trên nhiều máy khách, bên cạnh nghiên cứu do nhóm Hậu lượng tử chuyên trách của Tổ chức Ethereum thực hiện. Mặc dù các cột mốc phân nhánh có cấu trúc nhắm mục tiêu hoàn thành vào khoảng năm 2029, nhưng nghiên cứu ban đầu đang tạo ra những bằng chứng hữu hình chứng minh rằng việc thực thi hậu lượng tử là khả thi ngay hôm nay.

**Trừu tượng hóa tài khoản và tính linh hoạt của chữ ký**: EIP-7702 đã được phát hành trong Pectra. EIP-8141, đang được xem xét cho Hegotá, sẽ cho phép các tài khoản sử dụng bất kỳ lược đồ chữ ký nào, mang đến cho người dùng một lộ trình để áp dụng các chữ ký an toàn lượng tử trước khi quá trình chuyển đổi toàn bộ giao thức hoàn tất.

Không có phần nào của công việc này đã hoàn tất. Các mốc thời gian là mục tiêu, không phải là sự đảm bảo. Nhưng phạm vi và tốc độ phát triển tích cực thể hiện một cam kết rõ ràng trong việc giữ cho Ethereum an toàn và hiệu quả về lâu dài.

**Đọc thêm**

- [Mật mã học hậu lượng tử trên Ethereum](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) - _Kiến trúc EF_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Cấu trúc dữ liệu](/developers/docs/data-structures-and-encoding/)