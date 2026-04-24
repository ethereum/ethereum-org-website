---
title: "Mật mã học hậu lượng tử trên Ethereum"
description: "Cách Ethereum chuẩn bị cho kỷ nguyên hậu lượng tử, những gì dễ bị tổn thương và những gì đang được xây dựng để bảo vệ nó."
lang: vi
image: /images/roadmap/roadmap-future.png
alt: "Ethereum roadmap"
template: roadmap
summaryPoints:
  - Máy tính lượng tử cuối cùng sẽ đe dọa mật mã học mà Ethereum sử dụng ngày nay
  - Tổ chức Ethereum có một nhóm nghiên cứu hậu lượng tử chuyên trách và một lộ trình "Lean Ethereum" có cấu trúc nhắm mục tiêu đến năm 2029 để bảo vệ hậu lượng tử toàn diện
  - Tiền của bạn hiện tại vẫn an toàn và phần mềm ví sẽ hướng dẫn bạn qua quá trình di chuyển trong tương lai
---

Máy tính lượng tử cuối cùng sẽ có thể phá vỡ các phương pháp mật mã học bảo mật Ethereum và hầu hết các hệ thống kỹ thuật số khác hiện nay. Trang này giải thích điều đó có nghĩa là gì, cách mạng lưới đang chủ động phát triển các cải tiến để giảm thiểu rủi ro này và những gì bạn cần biết.

## Tại sao mật mã học hậu lượng tử lại quan trọng {#why-post-quantum-matters}

Ethereum dựa vào một số dạng [mật mã học](/glossary/#cryptography) để giữ cho mạng lưới an toàn và bảo vệ tiền của người dùng. Quan trọng nhất là:

- **Thuật toán chữ ký số đường cong elliptic (ECDSA)**: Mật mã học được sử dụng để ký các giao dịch. Bảo mật tài khoản Ethereum của bạn phụ thuộc vào điều này.
- **Chữ ký BLS**: Được sử dụng bởi các [trình xác thực](/glossary/#validator) để đạt được [đồng thuận](/glossary/#consensus) về trạng thái của mạng lưới.
- **Cam kết đa thức KZG**: Được sử dụng cho [tính khả dụng của dữ liệu](/glossary/#data-availability) trong lộ trình mở rộng quy mô của Ethereum.
- **Hệ thống bằng chứng ZK**: Được sử dụng bởi các bản cuộn và các ứng dụng khác để xác minh các tính toán ngoài chuỗi.

Tất cả những điều này dựa trên các cấu trúc toán học, chẳng hạn như các nhóm Abelian, rất khó đối với máy tính cổ điển nhưng có thể được giải quyết hiệu quả bằng máy tính lượng tử sử dụng [thuật toán Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

### Khi nào máy tính lượng tử sẽ đe dọa Ethereum? {#when-will-quantum-computers-threaten-ethereum}

Vào tháng 3 năm 2026, Google Quantum AI đã công bố nghiên cứu ước tính rằng việc phá vỡ mật mã học đường cong elliptic 256-bit (loại mà Ethereum sử dụng cho chữ ký tài khoản) có thể yêu cầu khoảng 1.200 qubit logic. Các ước tính trước đây đưa ra con số này cao hơn nhiều. Google đã đặt ra thời hạn nội bộ là năm 2029 để di chuyển các hệ thống của riêng mình sang mật mã học hậu lượng tử.

Phần cứng lượng tử hiện tại còn lâu mới đạt được quy mô này, hoạt động với vài nghìn qubit vật lý nhiễu. Các qubit logic (sửa lỗi và thực hiện tính toán đáng tin cậy) yêu cầu nhiều qubit vật lý cho mỗi qubit logic. **Khoảng cách giữa phần cứng hiện tại và những gì cần thiết để phá vỡ mật mã học của Ethereum vẫn còn đáng kể, nhưng nó đang thu hẹp nhanh hơn nhiều người mong đợi.** Đáng chú ý, Viện Tiêu chuẩn và Công nghệ Quốc gia Hoa Kỳ (NIST) dự đoán sẽ ngừng sử dụng ECDSA vào năm 2030 và không cho phép sử dụng vào năm 2035.

Đây không phải là một mối đe dọa sắp xảy ra. Nhưng quá trình chuyển đổi mật mã học mất nhiều năm và mô hình bảo mật của Ethereum được thiết kế để tồn tại hàng thế kỷ. Phản ứng của Ethereum là lộ trình **Lean Ethereum**, một sứ mệnh có chủ ý, kéo dài nhiều năm nhằm xây dựng lại Ethereum xung quanh các nguyên thủy sẽ tồn tại trước bất kỳ mối đe dọa mật mã học nào.

## Bốn lĩnh vực dễ bị tấn công lượng tử {#four-vulnerable-areas}

Vào tháng 2 năm 2026, Vitalik Buterin đã [công bố một lộ trình](https://x.com/VitalikButerin/status/2027075026378543132) xác định bốn lĩnh vực riêng biệt trong mật mã học của Ethereum cần nâng cấp hậu lượng tử. Mỗi lĩnh vực có những thách thức khác nhau và các con đường giải pháp khác nhau.

### 1. Chữ ký BLS ở lớp đồng thuận {#consensus-bls}

**Chức năng**: Giao thức [bằng chứng cổ phần (PoS)](/glossary/#pos) của Ethereum sử dụng chữ ký BLS để tổng hợp các phiếu bầu từ hàng trăm nghìn trình xác thực. BLS cho phép kết hợp nhiều chữ ký thành một, giữ cho mạng lưới hoạt động hiệu quả.

**Tại sao nó dễ bị tổn thương**: Chữ ký BLS dựa trên các cặp đường cong elliptic, mà một máy tính lượng tử có thể phá vỡ.

**Cách tiếp cận**: Lộ trình Lean Consensus bao gồm việc phát triển hai công cụ bổ sung cho nhau:
- **leanXMSS**: Ethereum sẽ thay thế chữ ký BLS bằng leanXMSS, một sơ đồ chữ ký dựa trên mã băm cho các trình xác thực. Chữ ký dựa trên mã băm được coi là an toàn lượng tử vì chúng chỉ dựa vào tính bảo mật của các hàm băm, thứ mà máy tính lượng tử làm suy yếu nhưng không phá vỡ được.
- **leanVM**: Một zkVM (máy ảo không tri thức) tối giản để tổng hợp chữ ký dựa trên SNARK. Bởi vì chữ ký dựa trên mã băm lớn hơn đáng kể (khoảng 3.000 byte so với 96 byte của BLS), việc chuyển sang leanXMSS sẽ tạo ra nhiều dữ liệu hơn đáng kể cho mỗi khe. Để giải quyết vấn đề này, leanVM hoạt động như một công cụ tổng hợp, nén dữ liệu gấp 250 lần. Điều này bảo tồn các lợi ích về hiệu quả của việc kết hợp nhiều chữ ký thành một, ngay cả sau khi chuyển sang các sơ đồ an toàn lượng tử.

<ExpandableCard title="Why can't Ethereum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

Thuộc tính tổng hợp làm cho BLS hiệu quả (kết hợp hàng trăm nghìn chữ ký thành một) không có một giải pháp tương đương an toàn lượng tử rõ ràng. Chữ ký hậu lượng tử cũng lớn hơn nhiều so với chữ ký BLS. Việc chỉ đơn giản là hoán đổi cái này cho cái kia sẽ làm cho lớp đồng thuận của Ethereum chậm hơn và đắt đỏ hơn đáng kể. Đó là lý do tại sao nhóm đang xây dựng leanVM, một công cụ sử dụng bằng chứng không kiến thức để tổng hợp các chữ ký an toàn lượng tử một cách hiệu quả.

</ExpandableCard>

### 2. Tính khả dụng của dữ liệu: Cam kết KZG {#data-availability-kzg}

**Chức năng**: Cam kết đa thức KZG đảm bảo rằng dữ liệu (đặc biệt là dữ liệu [khối dữ liệu](/glossary/#blob) từ các bản cuộn) có sẵn trên mạng lưới mà không yêu cầu mọi nút phải tải xuống toàn bộ.

**Tại sao nó dễ bị tổn thương**: Cam kết KZG dựa trên các cặp đường cong elliptic, cùng một cấu trúc toán học mà máy tính lượng tử có thể tấn công.

**Biện pháp giảm thiểu hiện tại**: Cam kết KZG sử dụng một "thiết lập tin cậy" nơi nhiều người tham gia đã đóng góp tính ngẫu nhiên. Miễn là có ít nhất một người tham gia trung thực và đã loại bỏ bí mật của họ, thiết lập này sẽ an toàn, ngay cả trước các máy tính lượng tử cố gắng dịch ngược nó sau đó.

**Giải pháp dài hạn**: Thay thế KZG bằng một sơ đồ cam kết an toàn lượng tử. Hai ứng cử viên hàng đầu là:
- **Cam kết dựa trên STARK**: Dựa vào các hàm băm thay vì đường cong elliptic. Đã được sử dụng trong một số ZK-rollup.
- **Cam kết dựa trên mạng tinh thể (Lattice-based)**: Dựa vào độ khó của các bài toán mạng tinh thể, được cho là có khả năng kháng lượng tử.

Cả hai cách tiếp cận vẫn đang được nghiên cứu về tính hiệu quả và tính thực tế ở quy mô của Ethereum.

### 3. Chữ ký tài khoản: ECDSA {#eoa-signatures}

**Chức năng**: Mọi tài khoản Ethereum tiêu chuẩn (tài khoản thuộc sở hữu bên ngoài, hay [EOA](/glossary/#eoa)) đều sử dụng ECDSA trên đường cong secp256k1 để ký các giao dịch. Đây là thứ bảo vệ tiền của bạn.

**Tại sao nó dễ bị tổn thương**: Đối với bất kỳ tài khoản nào đã gửi giao dịch, khóa công khai sẽ bị lộ trên chuỗi. Một máy tính lượng tử có thể lấy ra khóa riêng tư từ dữ liệu khóa công khai bị lộ này.

**Sắc thái quan trọng**: Các tài khoản chỉ nhận ether và chưa bao giờ gửi giao dịch thì chưa làm lộ khóa công khai của họ. Chỉ có địa chỉ (một mã băm của khóa công khai) là có thể nhìn thấy, điều này cung cấp thêm một số lớp bảo vệ.

**Cách tiếp cận**: Thay vì một đợt di chuyển duy nhất trên toàn giao thức, Ethereum có kế hoạch sử dụng [trừu tượng hóa tài khoản](/roadmap/account-abstraction/) (cụ thể là EIP-8141, đang được xem xét cho Hegotá vào nửa cuối năm 2026) để cung cấp cho người dùng **sự linh hoạt về chữ ký**. Các tài khoản cá nhân có thể chuyển sang sơ đồ chữ ký hậu lượng tử mà không cần đợi toàn bộ giao thức thay đổi.

Đây là một cách tiếp cận thực dụng. Người dùng và ví muốn có sự bảo vệ hậu lượng tử sớm có thể tự nguyện áp dụng nó, trong khi quá trình di chuyển rộng lớn hơn sẽ diễn ra theo thời gian.

### 4. Bằng chứng ZK ở lớp ứng dụng {#zk-proofs}

**Chức năng**: Các hệ thống bằng chứng không kiến thức được sử dụng bởi các bản cuộn lớp 2 (L2) và các ứng dụng khác để xác minh các tính toán mà không tiết lộ dữ liệu cơ bản.

**Tại sao nó dễ bị tổn thương**: Nhiều hệ thống bằng chứng ZK phổ biến (SNARK sử dụng các cặp đường cong elliptic) dựa trên các giả định dễ bị tổn thương bởi lượng tử.

**Cách tiếp cận**: STARK, dựa vào các hàm băm thay vì đường cong elliptic, đã có khả năng kháng lượng tử và được sử dụng bởi một số bản cuộn. Việc hệ sinh thái áp dụng tự nhiên các hệ thống dựa trên STARK đã và đang cung cấp bảo mật hậu lượng tử ở lớp ứng dụng.

## Tiêu chuẩn NIST {#nist-standards}

Vào tháng 8 năm 2024, Viện Tiêu chuẩn và Công nghệ Quốc gia Hoa Kỳ (NIST) đã [hoàn thiện ba tiêu chuẩn mật mã học hậu lượng tử](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Những điều này rất quan trọng vì chúng cung cấp cho toàn bộ ngành công nghệ, bao gồm cả Ethereum, một bộ thuật toán đã được kiểm duyệt chung để xây dựng dựa trên đó thay vì mỗi dự án tự phát minh ra thuật toán của riêng mình.

| Tiêu chuẩn | Tên | Loại | Trường hợp sử dụng |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Dựa trên mạng tinh thể | Đóng gói khóa (trao đổi khóa) |
| FIPS 204 | ML-DSA (Dilithium) | Dựa trên mạng tinh thể | Chữ ký số |
| FIPS 205 | SLH-DSA (SPHINCS+) | Dựa trên mã băm | Chữ ký số |

Các tiêu chuẩn này cung cấp nền tảng cho quá trình chuyển đổi hậu lượng tử của toàn ngành. Công việc của Ethereum xây dựng và mở rộng dựa trên những điều này, với trọng tâm đặc biệt vào những thách thức độc đáo của một mạng lưới phi tập trung nơi tính hiệu quả và sự tổng hợp là quan trọng.

## Cách tiếp cận của Tổ chức Ethereum {#ef-approach}

Tổ chức Ethereum đã thành lập một nhóm Bảo mật Hậu lượng tử chuyên trách vào tháng 1 năm 2026, do Thomas Coratger dẫn dắt. Công việc của nhóm được theo dõi công khai tại [pq.ethereum.org](https://pq.ethereum.org).

### Hoạt động hiện tại (tính đến tháng 4 năm 2026) {#current-activity}

- **Devnet tương tác hàng tuần**: Hơn 10 nhóm máy khách tham gia vào thử nghiệm khả năng tương tác hậu lượng tử thường xuyên, bao gồm Lighthouse, Grandine, Zeam, Ream Labs và PierTwo.
- **Giải thưởng Poseidon**: Một giải thưởng nghiên cứu trị giá 1 triệu đô la nhắm vào các cải tiến trong các nguyên thủy mật mã học dựa trên mã băm.
- **Triển khai mã nguồn mở**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust) và leanMultisig đều có sẵn trong [tổ chức GitHub leanEthereum](https://github.com/leanEthereum).
- **Hội nghị Nghiên cứu PQ Thường niên lần thứ 2**: Dự kiến diễn ra từ ngày 9 tháng 10 năm 2026 đến ngày 12 tháng 10 năm 2026 tại Cambridge, Vương quốc Anh.
- **Sự liên kết với NIST**: Công việc của Ethereum xây dựng dựa trên các tiêu chuẩn mật mã học hậu lượng tử được NIST hoàn thiện vào tháng 8 năm 2024 (chẳng hạn như ML-KEM, ML-DSA và SLH-DSA).

### Các cột mốc di chuyển {#migration-milestones}

Nhóm đã phác thảo một loạt các bản nâng cấp giao thức để từng bước đưa mật mã học hậu lượng tử vào Ethereum. Đây là các cột mốc lập kế hoạch, không phải là các cam kết được đảm bảo. Tên và thứ tự có thể thay đổi.

| Cột mốc | Những gì nó giới thiệu |
|-----------|--------------------|
| I* | Sổ đăng ký khóa PQ. Các trình xác thực có thể đăng ký khóa công khai hậu lượng tử cùng với các khóa BLS hiện có. |
| J* | Các biên dịch trước (precompile) xác minh chữ ký PQ. Hợp đồng thông minh và ví có thể xác minh chữ ký PQ một cách tự nhiên. |
| L* | Các chứng thực PQ và bằng chứng lớp đồng thuận theo thời gian thực thông qua leanVM. Các trình xác thực bắt đầu sử dụng chữ ký PQ cho sự đồng thuận. |
| M* | Tổng hợp chữ ký PQ đầy đủ và các cam kết khối dữ liệu an toàn PQ. |

**Mục tiêu**: Các cột mốc phân nhánh có cấu trúc nhắm mục tiêu hoàn thành cơ sở hạ tầng hậu lượng tử cốt lõi vào khoảng năm 2029. Việc di chuyển toàn bộ lớp thực thi và hệ sinh thái sẽ kéo dài hơn thế.

## Người dùng cần làm gì? {#what-users-need-to-do}

**Ngay bây giờ: không cần làm gì cả.** Tiền của bạn vẫn an toàn. Không có máy tính lượng tử nào hiện nay có thể đe dọa mật mã học của Ethereum.

**Trong tương lai**: Khi các sơ đồ chữ ký hậu lượng tử được hỗ trợ rộng rãi trên Ethereum (dự kiến sau đợt phân nhánh cứng Hegotá và việc triển khai EIP-8141), bạn sẽ muốn di chuyển tài khoản của mình sang các chữ ký an toàn lượng tử. Phần mềm ví sẽ hướng dẫn bạn qua quá trình chuyển đổi này.

Nếu tài khoản của bạn chưa bao giờ gửi giao dịch (nghĩa là khóa công khai của bạn chưa bị lộ trên chuỗi), nó có thêm một lớp bảo vệ. Nhưng tất cả các tài khoản cuối cùng đều nên di chuyển.

Câu hỏi về cách xử lý các ví không hoạt động (các tài khoản mà chủ sở hữu có thể không nhận thức được sự cần thiết phải di chuyển) là một chủ đề quản trị mở. Cộng đồng Ethereum vẫn chưa đạt được đồng thuận về vấn đề này.

## Các câu hỏi thường gặp {#faq}

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**Không.** Không có máy tính lượng tử nào hiện nay có thể phá vỡ mật mã học của Ethereum. Phần cứng lượng tử hiện tại còn lâu mới đạt được quy mô cần thiết. Công việc được mô tả trên trang này là sự chuẩn bị cho tương lai, không phải là phản ứng trước một mối đe dọa đang hiện hữu.

</ExpandableCard>

<ExpandableCard title="When could quantum computers become a threat?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Các ước tính rất khác nhau. Nghiên cứu vào tháng 3 năm 2026 của Google cho thấy phần cứng cần thiết để phá vỡ mật mã học đường cong elliptic 256-bit có thể xuất hiện sớm nhất vào khoảng cuối thập kỷ này, nhưng vẫn còn những thách thức kỹ thuật đáng kể. Hầu hết các nhà nghiên cứu coi một mối đe dọa thực tế sẽ còn cách ít nhất vài năm nữa. Câu trả lời trung thực là không ai biết chính xác mốc thời gian, đó chính xác là lý do tại sao việc chuẩn bị ngay từ bây giờ là rất quan trọng.

</ExpandableCard>

<ExpandableCard title="Will I need to do anything to protect my wallet?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

Cuối cùng thì có. Khi các sơ đồ chữ ký hậu lượng tử có sẵn trên Ethereum, người dùng sẽ muốn di chuyển tài khoản của họ. Phần mềm ví có thể sẽ xử lý quá trình chuyển đổi này cho bạn. Hiện tại, bạn không cần phải làm gì cả. Khi cần hành động, cộng đồng Ethereum và các nhà phát triển ví sẽ cung cấp hướng dẫn và công cụ rõ ràng.

</ExpandableCard>

<ExpandableCard title="What about my tokens, NFTs, and DeFi positions?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Tài sản trên Ethereum được kiểm soát bởi chữ ký tài khoản. Khi tài khoản của bạn được di chuyển sang một sơ đồ chữ ký an toàn lượng tử, mọi thứ trong tài khoản đó đều được bảo vệ. Bạn không cần phải di chuyển từng tài sản riêng lẻ. Các hợp đồng thông minh nắm giữ tiền (như các giao thức DeFi) có thể cần các bản nâng cấp riêng tùy thuộc vào các nguyên thủy mật mã học mà chúng sử dụng nội bộ.

</ExpandableCard>

<ExpandableCard title="Is Ethereum behind other blockchains on this?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

Không. Ethereum có một trong những chương trình hậu lượng tử có cấu trúc nhất so với bất kỳ chuỗi khối nào: một nhóm chuyên trách, nghiên cứu được tài trợ, devnet hàng tuần và một lộ trình di chuyển được công bố, coi điện toán lượng tử là một ràng buộc thiết kế hạng nhất. Chưa có chuỗi khối nào hoàn thành quá trình chuyển đổi hậu lượng tử toàn diện. Theo ước tính của Tổ chức Ethereum, mức độ rủi ro của các quỹ không hoạt động dễ bị tổn thương bởi lượng tử của Ethereum là khoảng 0,1%, thấp hơn đáng kể so với các mạng lưới chuỗi khối lớn khác.

</ExpandableCard>

<ExpandableCard title="What is 'harvest now, decrypt later'?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

"Thu thập bây giờ, giải mã sau" là một cuộc tấn công trong đó ai đó ghi lại dữ liệu được mã hóa hoặc các khóa công khai bị lộ ngày hôm nay, sau đó phá vỡ mã hóa sau này khi có một máy tính lượng tử đủ mạnh. Đối với Ethereum, điều này phù hợp nhất với các tài khoản có khóa công khai đã bị lộ trên chuỗi (bất kỳ tài khoản nào đã gửi giao dịch). Đây là một lý do khiến cộng đồng coi việc di chuyển hậu lượng tử là nhạy cảm về thời gian mặc dù mối đe dọa lượng tử chưa phải là ngay lập tức.

</ExpandableCard>

## Đọc thêm {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _Tổ chức Ethereum_
- [Dự án Mật mã học Hậu lượng tử](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [Các tiêu chuẩn Mật mã học Hậu lượng tử của NIST](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Bảo vệ tiền mã hóa bằng cách tiết lộ các lỗ hổng lượng tử một cách có trách nhiệm](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [Biên giới lượng tử có thể gần hơn so với vẻ bề ngoài](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG và các thiết lập tin cậy](/roadmap/danksharding/#what-is-kzg)
- [Tài nguyên hội thảo leanVM + PQ tại Lean Week Cambridge (2025)](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Ethereum_
- [Các cuộc gọi đột phá ACD về Chữ ký Giao dịch PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Tổ chức Ethereum_
- [Các cuộc gọi đột phá ACD về Khả năng tương tác PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Tổ chức Ethereum_
- [Danh sách phát YouTube về Lean Ethereum & Bảo mật Hậu lượng tử](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Tổ chức Ethereum_
- [Phỏng vấn hội đồng về khả năng kháng hậu lượng tử](https://youtu.be/5DRDjeMmOPw) - _Bankless Podcast_
- [Trừu tượng hóa tài khoản trên Ethereum](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _Kiến trúc EF_
- [Superpositioned: Phân tích Ngành Công nghiệp Điện toán Lượng tử](https://www.superpositioned.co/) - _Saneel Sreeni_