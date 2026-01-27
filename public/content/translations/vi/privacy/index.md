---
title: Quyền riêng tư trên Ethereum
description: Công cụ và các kỹ thuật để bảo vệ quyền riêng tư của bạn trên Ethereum
lang: vi
---

# Quyền riêng tư trên Ethereum {#introduction}

Quyền riêng tư không chỉ cần thiết cho sự an toàn cá nhân mà còn là nền tảng của tự do và là một [yếu tố đảm bảo quan trọng cho sự phi tập trung](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Quyền riêng tư cho phép mọi người thể hiện bản thân, giao dịch với người khác và tự do tổ chức các cộng đồng. Nhưng giống như tất cả các chuỗi khối, sổ cái công khai của Ethereum khiến việc bảo vệ quyền riêng tư trở nên khó khăn.

Ethereum được thiết kế minh bạch. Mọi hành động trên chuỗi đều hiển thị cho bất kỳ ai xem. Mặc dù Ethereum cung cấp tính ẩn danh bằng cách liên kết hoạt động của bạn với một [khóa công khai](/decentralized-identity/#public-key-cryptography) thay vì danh tính trong thế giới thực, các mẫu hoạt động có thể được phân tích để tiết lộ thông tin nhạy cảm và xác định người dùng.

Việc xây dựng các công cụ bảo vệ quyền riêng tư vào Ethereum có thể giúp mọi người, các tổ chức và các cơ quan tương tác một cách an toàn đồng thời hạn chế việc bị lộ thông tin không cần thiết. Điều này làm cho hệ sinh thái an toàn hơn và thiết thực hơn cho nhiều trường hợp sử dụng hơn.

## Quyền riêng tư cho các bản ghi {#privacy-of-writes}

Theo mặc định, mọi giao dịch được ghi trên Ethereum đều công khai và vĩnh viễn. Điều này không chỉ bao gồm việc gửi ETH mà còn cả việc đăng ký tên ENS, thu thập POAP hoặc giao dịch NFT. Các hành động hàng ngày như thanh toán, bỏ phiếu hoặc xác minh danh tính có thể tiết lộ thông tin của bạn cho các bên không mong muốn. Có một số công cụ và kỹ thuật có thể giúp làm cho chúng riêng tư hơn:

### Giao thức trộn (hay \"máy trộn\") {#mixing-protocols}

Máy trộn phá vỡ liên kết giữa người gửi và người nhận bằng cách đưa các giao dịch của nhiều người dùng vào một \"nhóm\" chung và sau đó cho phép mọi người rút tiền sau đó đến một địa chỉ mới. Vì các khoản tiền gửi và rút tiền bị trộn lẫn với nhau, nên người quan sát sẽ khó kết nối chúng hơn nhiều.

_Ví dụ: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Nhóm được che chắn {#shielded-pools}

Các nhóm được che chắn tương tự như máy trộn nhưng chúng cho phép người dùng giữ và chuyển tiền một cách riêng tư ngay bên trong chính nhóm đó. Thay vì chỉ làm xáo trộn liên kết giữa việc gửi và rút tiền, các nhóm được che chắn duy trì một trạng thái riêng tư liên tục, thường được bảo mật bằng bằng chứng không kiến thức. Điều này giúp có thể xây dựng các giao dịch chuyển tiền riêng tư, số dư riêng tư và nhiều hơn nữa.

_Ví dụ: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Địa chỉ ẩn {#stealth-addresses}

Một [địa chỉ ẩn](https://vitalik.eth.limo/general/2023/01/20/stealth.html) giống như việc cung cấp cho mỗi người gửi một P.O. dùng một lần và duy nhất. hộp thư mà chỉ bạn có thể mở. Mỗi khi có người gửi tiền mã hóa cho bạn, nó sẽ được gửi đến một địa chỉ mới, vì vậy không ai khác có thể thấy rằng tất cả các khoản thanh toán đó đều thuộc về bạn. Điều này giữ cho lịch sử thanh toán của bạn ở chế độ riêng tư và khó theo dõi hơn.

_Ví dụ: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Các trường hợp sử dụng khác {#other-use-cases}

Các dự án khác khám phá các bản ghi riêng tư bao gồm [PlasmaFold](https://pse.dev/projects/plasma-fold) (thanh toán riêng tư) và các hệ thống như [MACI](https://pse.dev/projects/maci) và [Semaphore](https://pse.dev/projects/semaphore) (bỏ phiếu riêng tư).

Những công cụ này mở rộng các tùy chọn để ghi dữ liệu một cách riêng tư trên Ethereum, nhưng mỗi công cụ đều có những đánh đổi riêng. Một số phương pháp vẫn đang trong giai đoạn thử nghiệm, một số làm tăng chi phí hoặc độ phức tạp và một số công cụ như máy trộn có thể phải đối mặt với sự giám sát pháp lý hoặc quy định tùy thuộc vào cách chúng được sử dụng.

## Quyền riêng tư cho các lượt đọc {#privacy-of-reads}

Việc đọc hoặc kiểm tra bất kỳ thông tin nào trên Ethereum (ví dụ: số dư ví của bạn) thường thông qua một dịch vụ như nhà cung cấp ví của bạn, nhà cung cấp nút hoặc một trình duyệt khối. Bởi vì bạn đang dựa vào họ để đọc chuỗi khối cho bạn, họ cũng có thể thấy các yêu cầu của bạn cùng với siêu dữ liệu như địa chỉ IP hoặc vị trí của bạn. Nếu bạn tiếp tục kiểm tra cùng một tài khoản, thông tin này có thể được ghép lại với nhau để liên kết danh tính của bạn với hoạt động của bạn.

Việc chạy nút Ethereum của riêng bạn sẽ ngăn chặn điều này, nhưng việc lưu trữ và đồng bộ hóa toàn bộ chuỗi khối vẫn tốn kém và không thực tế đối với hầu hết người dùng, đặc biệt là trên các thiết bị di động.

Một số dự án khám phá lượt đọc riêng tư bao gồm [Truy xuất thông tin riêng tư](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, tìm nạp dữ liệu mà không tiết lộ nội dung bạn đang tìm kiếm), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (kiểm tra danh tính riêng tư bằng bằng chứng không kiến thức), [vOPRF](https://pse.dev/projects/voprf) (sử dụng tài khoản Web2 một cách ẩn danh trong Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (tính toán trên dữ liệu được mã hóa) và [MachinaIO](https://pse.dev/projects/machina-io) (ẩn chi tiết chương trình trong khi vẫn giữ chức năng).

## Quyền riêng tư để chứng minh {#privacy-of-proving}

Bằng chứng bảo vệ quyền riêng tư là những công cụ bạn có thể sử dụng trên Ethereum để chứng minh một điều gì đó là đúng mà không tiết lộ những chi tiết không cần thiết. Ví dụ: bạn có thể:

- Chứng minh bạn trên 18 tuổi mà không cần chia sẻ ngày sinh đầy đủ của bạn
- Chứng minh quyền sở hữu NFT hoặc token mà không tiết lộ toàn bộ ví của bạn
- Chứng minh đủ điều kiện cho một tư cách thành viên, phần thưởng hoặc một cuộc bỏ phiếu mà không để lộ dữ liệu cá nhân khác

Hầu hết các công cụ cho việc này đều dựa vào các kỹ thuật mã hóa như bằng chứng không kiến thức, nhưng thách thức là làm cho chúng đủ hiệu quả để chạy trên các thiết bị hàng ngày, có thể di động trên mọi nền tảng và bảo mật.

Một số dự án khám phá quyền riêng tư để chứng minh bao gồm [Client Side Proving](https://pse.dev/projects/client-side-proving) (hệ thống chứng minh ZK), [TLSNotary](https://tlsnotary.org/), (bằng chứng xác thực cho bất kỳ dữ liệu nào trên web), [Mopro](https://pse.dev/projects/mopro) (chứng minh phía ứng dụng di động), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (khuôn khổ ủy quyền tránh các giả định về sự tin cậy) và [Noir](https://noir-lang.org/) (ngôn ngữ cho tính toán riêng tư và có thể xác minh).

## Bảng chú giải thuật ngữ về quyền riêng tư {#privacy-glossary}

**Ẩn danh**: Tương tác với tất cả các định danh đã được xóa vĩnh viễn khỏi dữ liệu của bạn, khiến cho việc truy vết thông tin trở lại một cá nhân là không thể

**Mã hóa**: Một quá trình xáo trộn dữ liệu để chỉ người có khóa chính xác mới có thể đọc được

**[Mã hóa đồng cấu hoàn toàn](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Một cách để thực hiện các phép tính trực tiếp trên dữ liệu đã được mã hóa, mà không cần giải mã

**[Làm rối mã nguồn không thể phân biệt](https://pse.dev/projects/machina-io) (iO)**: Các kỹ thuật bảo mật làm cho các chương trình hoặc dữ liệu không thể hiểu được trong khi vẫn có thể sử dụng được

**[Tính toán đa bên](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Các phương pháp cho phép nhiều bên cùng tính toán một kết quả mà không để lộ đầu vào riêng tư của họ

**Mật mã học có thể lập trình**: Mật mã học linh hoạt, dựa trên quy tắc có thể được tùy chỉnh trong phần mềm để kiểm soát cách thức và thời điểm dữ liệu được chia sẻ, xác minh hoặc tiết lộ

**Giả danh**: Sử dụng các mã hoặc số duy nhất (như một địa chỉ Ethereum) thay cho các định danh cá nhân

**Tiết lộ có chọn lọc**: Khả năng chỉ chia sẻ những gì cần thiết (ví dụ: chứng minh bạn sở hữu một NFT mà không tiết lộ toàn bộ lịch sử ví của bạn)

**Không thể liên kết**: Đảm bảo các hành động riêng biệt trên chuỗi khối không thể được liên kết trở lại cùng một địa chỉ

**Khả năng xác minh**: Đảm bảo những người khác có thể xác nhận một tuyên bố là đúng, chẳng hạn như xác thực một giao dịch hoặc bằng chứng trên Ethereum

**Ủy quyền có thể xác minh**: Giao một nhiệm vụ—chẳng hạn như tạo một bằng chứng—cho một bên khác (ví dụ: một ví di động sử dụng một máy chủ cho mật mã học nặng) trong khi vẫn có thể xác minh rằng nó đã được thực hiện chính xác

**[Bằng chứng không kiến thức](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: Các giao thức mật mã cho phép ai đó chứng minh thông tin là đúng mà không tiết lộ dữ liệu cơ bản

**ZK Rollup**: Một hệ thống khả năng mở rộng gộp các giao dịch ngoài chuỗi và gửi bằng chứng hợp lệ trên chuỗi—không phải là riêng tư theo mặc định, nhưng chúng cho phép các hệ thống quyền riêng tư hiệu quả (như các nhóm được che chắn) bằng cách giảm chi phí

## Tài nguyên {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), một phòng thí nghiệm nghiên cứu và phát triển của Ethereum Foundation tập trung vào quyền riêng tư cho hệ sinh thái
- [Web3PrivacyNow](https://web3privacy.info/), một mạng lưới gồm những người, dự án và các tổ chức liên kết bảo vệ và thúc đẩy quyền con người trực tuyến
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), một trang web xếp hạng ví Ethereum nhằm mục đích cung cấp một danh sách toàn diện các ví, chức năng, thực tiễn và hỗ trợ cho các tiêu chuẩn nhất định của chúng.
- [Zk-kit](https://zkkit.pse.dev/): Một bộ các thư viện (các thuật toán, các hàm tiện ích và các cấu trúc dữ liệu) có thể được tái sử dụng trong các dự án khác nhau và các giao thức không kiến thức.
- [Ứng dụng về Quyền riêng tư](/apps/categories/privacy/) - Khám phá danh sách các ứng dụng Quyền riêng tư được tuyển chọn chạy trên Ethereum.
