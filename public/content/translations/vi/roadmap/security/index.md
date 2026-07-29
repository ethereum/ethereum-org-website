---
title: Một Ethereum bảo mật hơn
description: Lộ trình của Ethereum củng cố việc sản xuất khối và khả năng chống kiểm duyệt ngay hôm nay, đồng thời chuẩn bị giao thức cho kỷ nguyên lượng tử và hàng thập kỷ hoạt động đáng tin cậy.
lang: vi
image: /images/roadmap/roadmap-security.png
alt: "Ethereum roadmap"
template: roadmap
summaryPoints:
  - Các bản nâng cấp củng cố trong thời gian tới như tách biệt người đề xuất và người xây dựng (PBS) được tích hợp sẵn và danh sách bao gồm đang được tích cực phát triển
  - Việc chuẩn bị hậu lượng tử đang được tiến hành nhiều năm trước khi có bất kỳ mối đe dọa lượng tử đáng kể nào
  - Việc đơn giản hóa giao thức giúp loại bỏ sự phức tạp và thu hẹp bề mặt tấn công của Ethereum
---

Ethereum vốn đã là một nền tảng [hợp đồng thông minh](/glossary/#smart-contract) phi tập trung và rất bảo mật. Lộ trình nhằm mục đích duy trì điều đó trong nhiều thập kỷ bằng cách **củng cố mạng lưới ngay hôm nay đồng thời chuẩn bị cho những mối đe dọa có thể chỉ xuất hiện trong nhiều năm tới**. Các bản nâng cấp trong thời gian tới được theo dõi tại [forkcast.org](https://forkcast.org) và bản dự thảo lộ trình dài hạn hơn được xuất bản tại [strawmap.org](https://strawmap.org).

<ExpandableCard title="Ethereum hiện nay có an toàn không?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Đúng vậy. Ethereum đã chạy liên tục kể từ năm 2015 mà không có thời gian chết. Những cải tiến trên trang này làm cho một mạng lưới vốn đã bảo mật trở nên khó bị tấn công, kiểm duyệt hoặc phá vỡ hơn.

</ExpandableCard>

## Xây dựng khối không cần tin cậy {#trustless-block-building}

Hầu hết các khối Ethereum ngày nay được lắp ráp thông qua sự phân công lao động: các trình tạo block chuyên biệt xây dựng khối có giá trị nhất mà họ có thể, và [trình xác thực](/glossary/#validator) đến lượt sẽ đề xuất ưu đãi tốt nhất. Điều này giúp việc xây dựng khối chuyên nghiệp không tập trung [đặt cọc](/glossary/#staking) vào các nhà điều hành lớn nhất, nhưng kể từ năm 2022, nó đã dựa vào phần mềm ngoài giao thức mà mạng lưới không thể xác minh.

**Tách biệt người đề xuất và người xây dựng (PBS) được tích hợp sẵn (ePBS, hoặc EIP-7732)** đưa sự phân chia này vào giao thức, loại bỏ nhu cầu tin cậy các rơ-le (relay), những người trung gian bên thứ ba hiện đang chuyển các khối giữa các trình tạo block và trình xác thực. ePBS là điểm nhấn của bản nâng cấp [Glamsterdam](/roadmap/glamsterdam/) sắp tới, dự kiến vào năm 2026. Chưa có ngày cụ thể cho Mạng chính; các nhóm máy khách đang thử nghiệm nó trên các devnet (mạng thử nghiệm tạm thời).

<ButtonLink variant="outline" href="/roadmap/pbs/">Tìm hiểu thêm về tách biệt người đề xuất và người xây dựng</ButtonLink>

## Khả năng chống kiểm duyệt {#censorship-resistance}

Một mạng lưới chống kiểm duyệt có nghĩa là không ai có thể ngăn cản một giao dịch hợp lệ tiếp cận chuỗi. **Danh sách bao gồm được thực thi theo lựa chọn phân nhánh (FOCIL, hoặc EIP-7805)** mang lại cho nhiều trình xác thực tiếng nói về những gì một khối phải bao gồm: họ xuất bản danh sách các giao dịch đang chờ xử lý mà trình tạo block được yêu cầu phải đưa vào. Không một tác nhân đơn lẻ nào có thể âm thầm loại bỏ giao dịch của bạn.

FOCIL là điểm nhấn ở lớp đồng thuận của Hegotá, bản nâng cấp tiếp nối Glamsterdam và dự kiến vào năm 2027. Nó được cố tình lên lịch sau Glamsterdam để ePBS và FOCIL không bao giờ được phát hành dưới dạng một sự kết hợp chưa được thử nghiệm. Nghiên cứu về các mempool được mã hóa, giúp ẩn nội dung của các giao dịch đang chờ cho đến khi chúng được đưa vào một khối một cách an toàn, vẫn đang tiếp tục.

## Tính chung cuộc nhanh hơn {#faster-finality}

Đối với người dùng, [tính chung cuộc](/glossary/#finality) là thời điểm một giao dịch trở nên vĩnh viễn, khi việc đảo ngược nó sẽ khiến kẻ tấn công tiêu tốn một lượng lớn ETH đã đặt cọc. Ngày nay, tính chung cuộc mất khoảng 15 phút và **các nhà nghiên cứu muốn thu hẹp thời gian đó một cách đáng kể**. Công việc bắt đầu với tính chung cuộc một khe (single-slot finality), phát triển thành tính chung cuộc ba khe (three-slot finality), và hiện tiếp tục với Minimmit, một giao thức đồng thuận một vòng trong chương trình Lean Ethereum được giới thiệu vào tháng 7 năm 2025. Tính chung cuộc tính bằng giây là mục tiêu định hướng dài hạn trên dự thảo lộ trình, nhắm tới khoảng năm 2029. Đây vẫn là một nghiên cứu đang hoạt động và chưa có bản nâng cấp tính chung cuộc nào được chỉ định cho một đợt phân nhánh.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">Tìm hiểu thêm về nghiên cứu tính chung cuộc nhanh hơn</ButtonLink>

## Trình xác thực kiên cường {#resilient-validators}

Một trình xác thực thường là một máy tính giữ một khóa ký. **Công nghệ trình xác thực phân tán (DVT)** thay thế cỗ máy đơn lẻ đó bằng một ủy ban các máy tính chia sẻ khóa và cùng nhau ký, do đó một máy tính bị hỏng hoặc một khóa bị đánh cắp sẽ không làm trình xác thực ngừng hoạt động. DVT đang hoạt động trong thực tế và được các nhà điều hành đặt cọc sử dụng ở quy mô lớn. Vào tháng 1 năm 2026, Vitalik Buterin đã đề xuất một biến thể cấp độ giao thức đơn giản hóa có tên là DVT-lite; đây là một đề xuất ban đầu và chưa có lịch trình phân nhánh.

Mạng lưới cũng tự bảo vệ thông qua [sự đa dạng máy khách](/developers/docs/nodes-and-clients/client-diversity/): Ethereum chạy trên một số triển khai phần mềm được xây dựng độc lập, vì vậy một lỗi trong một máy khách vẫn giúp phần còn lại của mạng lưới hoạt động bình thường.

Hai ý tưởng nghiên cứu trước đây, view-merge và bầu chọn người dẫn đầu bí mật, không còn là các hạng mục lộ trình đang hoạt động.

<ButtonLink variant="outline" href="/staking/dvt/">Tìm hiểu thêm về công nghệ trình xác thực phân tán</ButtonLink>

## Khả năng kháng lượng tử {#quantum-resistance}

Ethereum sử dụng [mật mã học](/glossary/#cryptography) để giữ cho mạng lưới an toàn và bảo vệ tiền của người dùng. Cuối cùng, một số phương pháp mật mã này sẽ **dễ bị tổn thương trước các máy tính lượng tử**, vốn có thể giải quyết các vấn đề toán học cụ thể nhanh hơn theo cấp số nhân so với các máy tính cổ điển.

**Ngày nay không có máy tính lượng tử nào có thể phá vỡ mật mã học của Ethereum.** Phần cứng cần thiết vẫn chưa tồn tại ở quy mô lớn. Nhưng nghiên cứu gần đây cho thấy khoảng cách này đang thu hẹp nhanh hơn dự kiến trước đây. Vào tháng 3 năm 2026, Google Quantum AI đã công bố một bài báo ước tính rằng việc phá vỡ mật mã học đường cong elliptic 256-bit (loại mà Ethereum sử dụng cho chữ ký tài khoản) có thể cần khoảng 1.200 qubit logic, ít hơn khoảng 20 lần so với các ước tính trước đó.

Các quá trình chuyển đổi mật mã mất nhiều năm để lập kế hoạch và thực hiện một cách an toàn, vì vậy việc chuẩn bị đang diễn ra ngay bây giờ, rất lâu trước khi phần cứng tồn tại. Bốn lĩnh vực đã được xác định là cần nâng cấp hậu lượng tử: chữ ký đồng thuận của trình xác thực (BLS), các lược đồ cam kết được sử dụng cho tính khả dụng của dữ liệu (KZG), chữ ký tài khoản (ECDSA) và các hệ thống Bằng chứng không kiến thức (ZK-proof) được sử dụng bởi các [bản cuộn](/glossary/#rollups).

Tổ chức Ethereum đã thành lập một **nhóm Bảo mật Hậu lượng tử** chuyên trách vào tháng 1 năm 2026 và công việc của nhóm được theo dõi công khai tại [pq.ethereum.org](https://pq.ethereum.org). Công việc đang hoạt động bao gồm chữ ký trình xác thực dựa trên mã băm (leanXMSS) kết hợp với một zkVM tối giản (leanVM) giúp tổng hợp các chữ ký an toàn lượng tử lớn hơn một cách hiệu quả, và các devnet tương tác hàng tuần với hơn 10 nhóm máy khách.

Một phần quan trọng của chiến lược chuyển đổi là **EIP-8141**, giới thiệu [trừu tượng hóa tài khoản](/roadmap/account-abstraction/) gốc. Điều này cho phép các tài khoản cá nhân chọn xác minh chữ ký của riêng họ, nghĩa là người dùng có thể chuyển sang các chữ ký an toàn lượng tử mà không cần chờ đợi một đợt di chuyển toàn giao thức duy nhất. EIP-8141 đang được xem xét cho bản nâng cấp Hegotá. Các cột mốc cơ sở hạ tầng hậu lượng tử cốt lõi nhắm mục tiêu hoàn thành vào khoảng năm 2029. Đây là các mục tiêu lập kế hoạch và có thể thay đổi.

<ExpandableCard title="Máy tính lượng tử hiện nay có thể đánh cắp ETH của tôi không?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

Không. Ngày nay không có máy tính lượng tử nào có thể phá vỡ mật mã học của Ethereum. Công việc được mô tả trên trang này là sự chuẩn bị sớm cho một mối đe dọa vẫn còn cách xa nhiều năm. Khi các ví hậu lượng tử khả dụng, phần mềm ví sẽ hướng dẫn bạn thực hiện quá trình di chuyển. Hiện tại, bạn không cần phải làm gì cả.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Tìm hiểu thêm về khả năng kháng lượng tử</ButtonLink>

## Giao thức đơn giản và hiệu quả hơn {#simpler-and-more-efficient-protocol}

Sự phức tạp tạo ra cơ hội cho các lỗi và lỗ hổng. Một phần của lộ trình tập trung vào việc **đơn giản hóa Ethereum và loại bỏ nợ kỹ thuật** để giao thức dễ bảo trì, kiểm toán và suy luận hơn. Một giao thức đơn giản hơn cũng khiến những kẻ tấn công có ít bề mặt để thăm dò hơn.

Đã được phân phối cho đến nay:

- **[Pectra (Tháng 5 năm 2025)](/roadmap/pectra/)**: Đã giới thiệu EIP-7702, cho phép các tài khoản thuộc sở hữu bên ngoài tạm thời ủy quyền cho mã hợp đồng thông minh, một bước đệm hướng tới trừu tượng hóa tài khoản hoàn toàn.
- **[Fusaka (Tháng 12 năm 2025)](/roadmap/fusaka/)**: Đã triển khai PeerDAS (EIP-7594), giúp phân phối khối lượng công việc về tính khả dụng của dữ liệu trên toàn mạng lưới. Đồng thời tăng các tham số khối dữ liệu, mở rộng thông lượng dữ liệu cho các bản cuộn.
- **[Dencun (Tháng 3 năm 2024)](/roadmap/dencun/)**: Đã giới thiệu các giao dịch khối dữ liệu (EIP-4844) để có dữ liệu Rollup rẻ hơn và hạn chế `SELFDESTRUCT` (EIP-6780) nhằm loại bỏ một nguồn gây phức tạp tồn tại từ lâu.
- **[Shapella (Tháng 4 năm 2023)](/staking/withdrawals/)**: Đã cho phép các trình xác thực rút ETH đã đặt cọc (EIP-4895), loại bỏ một hạn chế ban đầu của việc đặt cọc [Bằng chứng cổ phần (PoS)](/glossary/#pos).
- **London (Tháng 8 năm 2021)**: Đã đại tu việc định giá Gas với EIP-1559, giới thiệu một phí cơ sở và cơ chế đốt để có chi phí giao dịch dễ dự đoán hơn.

Đang tiến hành:

- **Glamsterdam (dự kiến vào năm 2026)**: Các điểm nhấn là ePBS (EIP-7732) và danh sách truy cập cấp độ khối (EIP-7928), với việc định giá lại Gas cũng đang được xem xét.
- **Hegotá (dự kiến vào năm 2027)**: FOCIL (EIP-7805) là điểm nhấn ở lớp đồng thuận. Đang được xem xét để đưa vào: EIP-8141 (trừu tượng hóa tài khoản gốc).
- **Đang diễn ra**: Những nỗ lực nhằm đơn giản hóa [EVM](/developers/docs/evm/), hài hòa các triển khai máy khách và loại bỏ dần các tính năng không còn được dùng nữa vẫn tiếp tục trên các nhóm máy khách. Công việc về tính phi trạng thái (cho phép những người tham gia xác minh chuỗi mà không cần lưu trữ tất cả dữ liệu của nó) đang được thiết kế lại xoay quanh các cây mã băm nhị phân an toàn lượng tử, với phương pháp cuối cùng vẫn chưa được xác nhận.

## Tiến độ hiện tại {#current-progress}

Tính đến giữa năm 2026:

- **Xây dựng khối và khả năng chống kiểm duyệt**: ePBS và danh sách truy cập cấp độ khối đang chạy trên các devnet của Glamsterdam. FOCIL được lên kế hoạch cho Hegotá, dự kiến vào năm 2027.
- **Tính chung cuộc**: Minimmit và công việc đồng thuận Lean Ethereum rộng lớn hơn vẫn đang được tích cực nghiên cứu và chưa được chỉ định phân nhánh.
- **Khả năng kháng lượng tử**: Các devnet tương tác hậu lượng tử hàng tuần đang chạy và các cột mốc cơ sở hạ tầng cốt lõi nhắm mục tiêu vào khoảng năm 2029.
- **Đơn giản hóa**: Pectra và Fusaka đã được phát hành; Glamsterdam và Hegotá sẽ mang đến đợt dọn dẹp tiếp theo.

Chưa có phần nào của công việc này hoàn tất và tất cả các mốc thời gian đều là ước tính có thể thay đổi.

## Đọc thêm {#further-reading}

- [Forkcast: Trình theo dõi nâng cấp mạng lưới Ethereum](https://forkcast.org)
- [Strawmap: bản dự thảo lộ trình lớp 1 (l1) của Ethereum](https://strawmap.org) - _EF Architecture_
- [Ethereum Hậu lượng tử](https://pq.ethereum.org) - _Tổ chức Ethereum_
- [Trình theo dõi lộ trình Lean Ethereum](https://leanroadmap.org) - _ReamLabs_
- [Bằng chứng cổ phần (PoS) và tính chung cuộc](/developers/docs/consensus-mechanisms/pos/#finality)
- [EVM](/developers/docs/evm/)