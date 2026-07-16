---
title: "Quyền riêng tư trên Ethereum"
description: "Các công cụ và kỹ thuật để bảo vệ quyền riêng tư của bạn trên Ethereum"
lang: vi
---

Quyền riêng tư không chỉ cần thiết cho sự an toàn cá nhân, nó còn là nền tảng của tự do và là một [yếu tố bảo đảm chính cho sự phi tập trung](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Quyền riêng tư mang lại cho mọi người khả năng tự do thể hiện bản thân, giao dịch với người khác và tổ chức các cộng đồng. Nhưng giống như tất cả các chuỗi khối, sổ cái công khai của Ethereum khiến quyền riêng tư trở thành một thách thức.

Ethereum được thiết kế để minh bạch. Mọi hành động trên chuỗi đều có thể được nhìn thấy bởi bất kỳ ai. Mặc dù Ethereum cung cấp tính ẩn danh giả bằng cách liên kết hoạt động của bạn với một [khóa công khai](/decentralized-identity/#public-key-cryptography) thay vì danh tính thực tế, các mô hình hoạt động có thể được phân tích để tiết lộ thông tin nhạy cảm và xác định người dùng.

Việc xây dựng các công cụ bảo vệ quyền riêng tư vào Ethereum có thể giúp mọi người, các tổ chức và cơ quan tương tác một cách an toàn trong khi hạn chế sự phơi bày không cần thiết. Điều này làm cho hệ sinh thái an toàn hơn và thiết thực hơn cho nhiều trường hợp sử dụng.

<VideoWatch slug="privacy-is-existential" />

## Quyền riêng tư cho việc ghi {#privacy-of-writes}

Theo mặc định, mọi giao dịch được ghi trên Ethereum đều công khai và vĩnh viễn. Điều này không chỉ bao gồm việc gửi ETH, mà còn cả việc đăng ký tên ENS, thu thập POAP hoặc giao dịch NFT. Các hành động hàng ngày như thanh toán, bỏ phiếu hoặc xác minh danh tính có thể tiết lộ thông tin của bạn cho những bên không mong muốn. Có một số công cụ và kỹ thuật có thể giúp làm cho những hành động này trở nên riêng tư hơn:

### Các giao thức trộn (hay "mixer") {#mixing-protocols}

Các mixer phá vỡ liên kết giữa người gửi và người nhận bằng cách đưa giao dịch của nhiều người dùng vào một "nhóm" chung và sau đó cho phép mọi người rút tiền sau đó về một địa chỉ mới. Vì các khoản tiền gửi và rút tiền được trộn lẫn với nhau, nên những người quan sát sẽ khó kết nối chúng hơn rất nhiều.

_Ví dụ: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Nhóm được bảo vệ (Shielded Pools) {#shielded-pools}

Các nhóm được bảo vệ tương tự như mixer nhưng chúng cho phép người dùng nắm giữ và chuyển tiền một cách riêng tư ngay bên trong nhóm đó. Thay vì chỉ che giấu liên kết giữa việc gửi và rút tiền, các nhóm được bảo vệ duy trì một trạng thái riêng tư liên tục, thường được bảo mật bằng các bằng chứng không kiến thức. Điều này giúp có thể xây dựng các giao dịch chuyển tiền riêng tư, số dư riêng tư và hơn thế nữa.

_Ví dụ: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Địa chỉ ẩn danh {#stealth-addresses}

Một [địa chỉ ẩn danh](https://vitalik.eth.limo/general/2023/01/20/stealth.html) giống như việc cung cấp cho mỗi người gửi một hộp thư P.O. độc nhất, dùng một lần mà chỉ bạn mới có thể mở. Mỗi khi ai đó gửi tiền mã hóa cho bạn, nó sẽ đi đến một địa chỉ mới, vì vậy không ai khác có thể thấy rằng tất cả các khoản thanh toán đó thuộc về bạn. Điều này giữ cho lịch sử thanh toán của bạn riêng tư và khó theo dõi hơn.

_Ví dụ: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Các trường hợp sử dụng khác {#other-use-cases}

Các dự án khác đang khám phá việc ghi riêng tư bao gồm [PlasmaFold](https://pse.dev/projects/plasma-fold) (thanh toán riêng tư) và các hệ thống như [MACI](https://pse.dev/projects/maci) và [Semaphore](https://pse.dev/projects/semaphore) (bỏ phiếu riêng tư).

Các công cụ này mở rộng các tùy chọn để ghi riêng tư trên Ethereum, nhưng mỗi công cụ đều đi kèm với sự đánh đổi. Một số phương pháp tiếp cận vẫn đang trong giai đoạn thử nghiệm, một số làm tăng chi phí hoặc độ phức tạp, và một số công cụ như mixer có thể phải đối mặt với sự giám sát pháp lý hoặc quy định tùy thuộc vào cách chúng được sử dụng.

## Quyền riêng tư cho việc đọc {#privacy-of-reads}

Việc đọc hoặc kiểm tra bất kỳ thông tin nào trên Ethereum (ví dụ: số dư ví của bạn) thường đi qua một dịch vụ như nhà cung cấp ví của bạn, nhà cung cấp nút hoặc một trình khám phá khối. Bởi vì bạn đang dựa vào họ để đọc chuỗi khối cho bạn, họ cũng có thể thấy các yêu cầu của bạn cùng với siêu dữ liệu như địa chỉ IP hoặc vị trí của bạn. Nếu bạn liên tục kiểm tra cùng một tài khoản, thông tin này có thể được ghép lại với nhau để liên kết danh tính của bạn với hoạt động của bạn.

Việc chạy nút Ethereum của riêng bạn sẽ ngăn chặn điều này, nhưng việc lưu trữ và đồng bộ hóa toàn bộ chuỗi khối vẫn tốn kém và không thực tế đối với hầu hết người dùng, đặc biệt là trên các thiết bị di động.

Một số dự án đang khám phá việc đọc riêng tư bao gồm [Truy xuất thông tin riêng tư](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, lấy dữ liệu mà không tiết lộ những gì bạn đang tra cứu), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (kiểm tra danh tính riêng tư bằng các bằng chứng không kiến thức), [vOPRF](https://pse.dev/projects/voprf) (sử dụng tài khoản Web2 một cách ẩn danh giả trong Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (tính toán trên dữ liệu được mã hóa), và [MachinaIO](https://pse.dev/projects/machina-io) (ẩn chi tiết chương trình trong khi vẫn giữ nguyên chức năng).

## Quyền riêng tư cho việc chứng minh {#privacy-of-proving}

Các bằng chứng bảo vệ quyền riêng tư là những công cụ bạn có thể sử dụng trên Ethereum để chứng minh rằng một điều gì đó là đúng mà không tiết lộ các chi tiết không cần thiết. Ví dụ, bạn có thể:

- Chứng minh bạn trên 18 tuổi mà không chia sẻ ngày sinh đầy đủ của mình
- Chứng minh quyền sở hữu một NFT hoặc token mà không tiết lộ toàn bộ ví của bạn
- Chứng minh đủ điều kiện cho một tư cách thành viên, phần thưởng hoặc bỏ phiếu mà không làm lộ dữ liệu cá nhân khác

Hầu hết các công cụ cho những việc này dựa vào các kỹ thuật mật mã học như bằng chứng không kiến thức, nhưng thách thức là làm cho chúng đủ hiệu quả để chạy trên các thiết bị hàng ngày, có thể mang sang bất kỳ nền tảng nào và an toàn.

Một số dự án đang khám phá quyền riêng tư cho việc chứng minh bao gồm [Chứng minh phía máy khách (Client Side Proving)](https://pse.dev/projects/client-side-proving) (hệ thống chứng minh ZK), [TLSNotary](https://tlsnotary.org/), (bằng chứng xác thực cho bất kỳ dữ liệu nào trên web), [Mopro](https://pse.dev/projects/mopro) (chứng minh phía máy khách trên thiết bị di động), [Sự ủy quyền chứng minh riêng tư (Private Proof Delegation)](https://pse.dev/projects/private-proof-delegation) (các khuôn khổ sự ủy quyền tránh các giả định tin cậy), và [Noir](https://noir-lang.org/) (ngôn ngữ cho tính toán riêng tư và có thể xác minh).

## Thuật ngữ về quyền riêng tư {#privacy-glossary}

**Ẩn danh (Anonymous)**: Tương tác với tất cả các định danh đã bị xóa vĩnh viễn khỏi dữ liệu của bạn, khiến việc truy xuất thông tin về một cá nhân là không thể

**Mã hóa (Encryption)**: Một quá trình xáo trộn dữ liệu để chỉ người có khóa chính xác mới có thể đọc được

**[Mã hóa đồng cấu hoàn toàn (Fully Homomorphic Encryption)](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Một cách để thực hiện các tính toán trực tiếp trên dữ liệu được mã hóa mà không bao giờ phải giải mã nó

**[Làm rối không thể phân biệt (Indistinguishable Obfuscation)](https://pse.dev/projects/machina-io) (iO)**: Các kỹ thuật quyền riêng tư làm cho các chương trình hoặc dữ liệu không thể hiểu được trong khi vẫn có thể sử dụng được

**[Tính toán đa bên (Multi-Party Computation)](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Các phương pháp cho phép nhiều bên cùng nhau tính toán một kết quả mà không làm lộ các đầu vào riêng tư của họ

**Mật mã học có thể lập trình (Programmable Cryptography)**: Mật mã học linh hoạt, dựa trên quy tắc có thể được tùy chỉnh trong phần mềm để kiểm soát cách thức và thời điểm dữ liệu được chia sẻ, xác minh hoặc tiết lộ

**Ẩn danh giả (Pseudonymous)**: Sử dụng các mã hoặc số duy nhất (như một địa chỉ Ethereum) thay cho các định danh cá nhân

**Tiết lộ có chọn lọc (Selective Disclosure)**: Khả năng chỉ chia sẻ những gì cần thiết (ví dụ: chứng minh bạn sở hữu một NFT mà không tiết lộ toàn bộ lịch sử ví của bạn)

**Không thể liên kết (Unlinkability)**: Đảm bảo các hành động riêng biệt trên chuỗi khối không thể bị ràng buộc lại với cùng một địa chỉ

**Khả năng xác minh (Verifiability)**: Đảm bảo người khác có thể xác nhận một yêu cầu nhận là đúng, chẳng hạn như xác thực một giao dịch hoặc bằng chứng trên Ethereum

**Sự ủy quyền có thể xác minh (Verifiable Delegation)**: Giao một nhiệm vụ—như tạo ra một bằng chứng—cho một bên khác (ví dụ: một ví di động sử dụng máy chủ cho mật mã học nặng) trong khi vẫn có thể xác minh rằng nó đã được thực hiện chính xác

**[Bằng chứng không kiến thức](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: Các giao thức mật mã học cho phép ai đó chứng minh thông tin là đúng mà không tiết lộ dữ liệu cơ bản

**ZK Rollup**: Một hệ thống mở rộng quy mô nhóm các giao dịch ngoài chuỗi và gửi một bằng chứng tính hợp lệ trên chuỗi—không riêng tư theo mặc định, nhưng chúng cho phép các hệ thống quyền riêng tư hiệu quả (như các nhóm được bảo vệ) bằng cách giảm chi phí

## Tài nguyên {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), một phòng thí nghiệm nghiên cứu và phát triển của Tổ chức Ethereum tập trung vào quyền riêng tư cho hệ sinh thái
- [Web3PrivacyNow](https://web3privacy.info/), một mạng lưới gồm những người, dự án và các tổ chức liên kết bảo vệ và thúc đẩy nhân quyền trực tuyến
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), một trang web đánh giá ví Ethereum nhằm cung cấp một danh sách toàn diện về các ví, chức năng, thực tiễn và sự hỗ trợ của chúng cho các tiêu chuẩn nhất định.
- [Zk-kit](https://zkkit.org/): Một tập hợp các thư viện (thuật toán, hàm tiện ích và cấu trúc dữ liệu) có thể được tái sử dụng trong các dự án và giao thức không tri thức khác nhau.
- [Ứng dụng quyền riêng tư](/apps/categories/privacy/) - Khám phá danh sách các ứng dụng Quyền riêng tư được tuyển chọn chạy trên Ethereum.
