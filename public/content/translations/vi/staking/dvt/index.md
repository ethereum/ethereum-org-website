---
title: Công nghệ trình xác thực phân tán
description: Công nghệ trình xác thực phân tán cho phép nhiều bên cùng vận hành phân tán một trình xác thực Ethereum.
lang: vi
---

Công nghệ trình xác thực phân tán (DVT) là một phương pháp bảo mật trình xác thực giúp phân tán việc quản lý khóa và trách nhiệm ký cho nhiều bên, nhằm giảm thiểu các điểm lỗi đơn lẻ và tăng cường khả năng phục hồi của trình xác thực.

Phương pháp này thực hiện điều đó bằng cách **chia nhỏ khóa riêng tư** được sử dụng để bảo mật một trình xác thực **trên nhiều máy tính** được tổ chức thành một "cụm". Lợi ích của việc này là làm cho những kẻ tấn công rất khó truy cập vào khóa, vì nó không được lưu trữ toàn bộ trên bất kỳ một máy tính đơn lẻ nào. Nó cũng cho phép một số nút ngoại tuyến, vì việc ký cần thiết có thể được thực hiện bởi một nhóm nhỏ các máy tính trong mỗi cụm. Điều này làm giảm các điểm lỗi đơn lẻ từ mạng lưới và làm cho toàn bộ tập hợp trình xác thực trở nên mạnh mẽ hơn.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

## Tại sao chúng ta cần DVT? {#why-do-we-need-dvt}

### Bảo mật {#security}

Các trình xác thực tạo ra hai cặp khóa công khai-riêng tư: khóa trình xác thực để tham gia vào đồng thuận và khóa rút tiền để truy cập vào tiền. Mặc dù các trình xác thực có thể bảo mật khóa rút tiền trong ví lạnh, nhưng các khóa riêng tư của trình xác thực phải luôn trực tuyến 24/7. Nếu một khóa riêng tư của trình xác thực bị xâm phạm, kẻ tấn công có thể kiểm soát trình xác thực, có khả năng dẫn đến việc bị phạt cắt giảm hoặc mất ETH của người đặt cọc. DVT có thể giúp giảm thiểu rủi ro này. Dưới đây là cách thức hoạt động:

Bằng cách sử dụng DVT, những người đặt cọc có thể tham gia vào việc đặt cọc trong khi vẫn giữ khóa riêng tư của trình xác thực trong ví lạnh. Điều này đạt được bằng cách mã hóa khóa trình xác thực gốc, hoàn chỉnh và sau đó chia nó thành các phần chia sẻ khóa. Các phần chia sẻ khóa này hoạt động trực tuyến và được phân phối đến nhiều nút, cho phép vận hành phân tán trình xác thực. Điều này có thể thực hiện được vì các trình xác thực [Ethereum](/) sử dụng chữ ký BLS có tính cộng, nghĩa là khóa hoàn chỉnh có thể được tái tạo bằng cách cộng các phần thành phần của chúng lại với nhau. Điều này cho phép người đặt cọc giữ khóa trình xác thực 'chính' gốc, hoàn chỉnh ngoại tuyến một cách an toàn.

### Không có điểm lỗi đơn lẻ {#no-single-point-of-failure}

Khi một trình xác thực được chia cho nhiều người vận hành và nhiều máy tính, nó có thể chịu đựng được các lỗi phần cứng và phần mềm riêng lẻ mà không bị ngoại tuyến. Rủi ro xảy ra lỗi cũng có thể được giảm thiểu bằng cách sử dụng các cấu hình phần cứng và phần mềm đa dạng trên các nút trong một cụm. Khả năng phục hồi này không có sẵn đối với các cấu hình trình xác thực đơn nút - nó đến từ lớp DVT.

Nếu một trong các thành phần của một máy tính trong cụm ngừng hoạt động (ví dụ: nếu có bốn người vận hành trong một cụm trình xác thực và một người sử dụng một máy khách cụ thể có lỗi), những người khác sẽ đảm bảo rằng trình xác thực vẫn tiếp tục hoạt động.

### Sự phi tập trung {#decentralization}

Kịch bản lý tưởng cho Ethereum là có càng nhiều trình xác thực được vận hành độc lập càng tốt. Tuy nhiên, một vài nhà cung cấp dịch vụ đặt cọc đã trở nên rất phổ biến và chiếm một phần đáng kể trong tổng số ETH được đặt cọc trên mạng lưới. DVT có thể cho phép các nhà vận hành này tồn tại trong khi vẫn duy trì sự phi tập trung của khoản đặt cọc. Điều này là do các khóa cho mỗi trình xác thực được phân phối trên nhiều máy tính và sẽ cần sự thông đồng lớn hơn nhiều để một trình xác thực trở nên độc hại.

Nếu không có DVT, các nhà cung cấp dịch vụ đặt cọc sẽ dễ dàng hơn trong việc chỉ hỗ trợ một hoặc hai cấu hình máy khách cho tất cả các trình xác thực của họ, làm tăng tác động của một lỗi máy khách. DVT có thể được sử dụng để phân tán rủi ro trên nhiều cấu hình máy khách và phần cứng khác nhau, tạo ra khả năng phục hồi thông qua sự đa dạng.

**DVT mang lại những lợi ích sau cho Ethereum:**

1. **Sự phi tập trung** của đồng thuận Bằng chứng cổ phần (PoS) trên Ethereum
2. Đảm bảo **tính hoạt động** của mạng lưới
3. Tạo ra **khả năng chịu lỗi** cho trình xác thực
4. Vận hành trình xác thực **giảm thiểu sự tin cậy**
5. **Giảm thiểu rủi ro phạt cắt giảm** và thời gian ngừng hoạt động
6. **Cải thiện sự đa dạng** (máy khách, trung tâm dữ liệu, vị trí, quy định, v.v.)
7. **Tăng cường bảo mật** trong việc quản lý khóa của trình xác thực

## DVT hoạt động như thế nào? {#how-does-dvt-work}

Một giải pháp DVT bao gồm các thành phần sau:

- **[Chia sẻ bí mật của Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Các trình xác thực sử dụng [khóa BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Các "phần chia sẻ khóa" BLS riêng lẻ có thể được kết hợp thành một khóa (chữ ký) tổng hợp duy nhất. Trong DVT, khóa riêng tư cho một trình xác thực là chữ ký BLS kết hợp của mỗi người vận hành trong cụm.
- **[Lược đồ chữ ký ngưỡng](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Xác định số lượng các phần chia sẻ khóa riêng lẻ cần thiết cho các nhiệm vụ ký, ví dụ: 3 trên 4.
- **[Tạo khóa phân tán (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Quá trình mật mã học tạo ra các phần chia sẻ khóa và được sử dụng để phân phối các phần chia sẻ của một khóa trình xác thực hiện có hoặc mới cho các nút trong một cụm.
- **[Tính toán nhiều bên (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Khóa trình xác thực hoàn chỉnh được tạo ra một cách bí mật bằng cách sử dụng tính toán nhiều bên. Khóa hoàn chỉnh không bao giờ được biết đến bởi bất kỳ người vận hành riêng lẻ nào—họ chỉ biết phần của riêng họ (tức là "phần chia sẻ" của họ).
- **Giao thức đồng thuận** - Giao thức đồng thuận chọn một nút làm người đề xuất khối. Họ chia sẻ khối với các nút khác trong cụm, những nút này sẽ thêm các phần chia sẻ khóa của họ vào chữ ký tổng hợp. Khi đủ số lượng phần chia sẻ khóa được tổng hợp, khối sẽ được đề xuất trên Ethereum.

Các trình xác thực phân tán có khả năng chịu lỗi tích hợp và có thể tiếp tục hoạt động ngay cả khi một số nút riêng lẻ bị ngoại tuyến. Điều này có nghĩa là cụm có khả năng phục hồi ngay cả khi một số nút bên trong nó trở nên độc hại hoặc lười biếng.

## Các trường hợp sử dụng DVT {#dvt-use-cases}

DVT có những tác động đáng kể đối với ngành công nghiệp đặt cọc nói chung:

### Người đặt cọc độc lập {#solo-stakers}

DVT cũng cho phép đặt cọc không lưu ký bằng cách cho phép bạn phân phối khóa trình xác thực của mình trên các nút từ xa trong khi vẫn giữ khóa hoàn chỉnh hoàn toàn ngoại tuyến. Điều này có nghĩa là những người đặt cọc tại nhà không nhất thiết phải chi tiền cho phần cứng, trong khi việc phân phối các phần chia sẻ khóa có thể giúp củng cố chúng trước các vụ hack tiềm ẩn.

### Staking như một dịch vụ (SaaS) {#saas}

Các nhà vận hành (chẳng hạn như các nhóm đặt cọc và những người đặt cọc tổ chức) quản lý nhiều trình xác thực có thể sử dụng DVT để giảm thiểu rủi ro của họ. Bằng cách phân phối cơ sở hạ tầng của mình, họ có thể thêm tính dự phòng vào các hoạt động của mình và đa dạng hóa các loại phần cứng mà họ sử dụng.

DVT chia sẻ trách nhiệm quản lý khóa trên nhiều nút, nghĩa là một số chi phí vận hành cũng có thể được chia sẻ. DVT cũng có thể giảm rủi ro vận hành và chi phí bảo hiểm cho các nhà cung cấp dịch vụ đặt cọc.

### Nhóm đặt cọc {#staking-pools}

Do các thiết lập trình xác thực tiêu chuẩn, các nhóm đặt cọc và các nhà cung cấp dịch vụ đặt cọc thanh khoản buộc phải có các mức độ tin cậy khác nhau đối với một người vận hành duy nhất vì lợi nhuận và thua lỗ được xã hội hóa trong toàn bộ nhóm. Họ cũng phụ thuộc vào các nhà vận hành để bảo vệ các khóa ký vì cho đến nay, không có lựa chọn nào khác cho họ.

Mặc dù theo truyền thống, các nỗ lực được thực hiện để phân tán rủi ro bằng cách phân phối các khoản đặt cọc cho nhiều người vận hành, mỗi người vận hành vẫn quản lý một khoản đặt cọc đáng kể một cách độc lập. Việc dựa vào một người vận hành duy nhất gây ra những rủi ro to lớn nếu họ hoạt động kém hiệu quả, gặp phải thời gian ngừng hoạt động, bị xâm phạm hoặc hành động độc hại.

Bằng cách tận dụng DVT, sự tin cậy cần thiết từ các nhà vận hành được giảm thiểu đáng kể. **Các nhóm có thể cho phép các nhà vận hành nắm giữ các khoản đặt cọc mà không cần lưu ký các khóa trình xác thực** (vì chỉ các phần chia sẻ khóa được sử dụng). Nó cũng cho phép các khoản đặt cọc được quản lý được phân phối giữa nhiều người vận hành hơn (ví dụ: thay vì có một người vận hành duy nhất quản lý 1000 trình xác thực, DVT cho phép các trình xác thực đó được vận hành chung bởi nhiều người vận hành). Các cấu hình người vận hành đa dạng sẽ đảm bảo rằng nếu một người vận hành ngừng hoạt động, những người khác vẫn có thể chứng thực. Điều này dẫn đến sự dự phòng và đa dạng hóa, mang lại hiệu suất và khả năng phục hồi tốt hơn, đồng thời tối đa hóa phần thưởng.

Một lợi ích khác của việc giảm thiểu sự tin cậy vào một người vận hành duy nhất là các nhóm đặt cọc có thể cho phép sự tham gia của người vận hành cởi mở hơn và không cần cấp phép. Bằng cách làm điều này, các dịch vụ có thể giảm thiểu rủi ro của họ và hỗ trợ sự phi tập trung của Ethereum bằng cách sử dụng cả các tập hợp người vận hành được tuyển chọn và không cần cấp phép, ví dụ: bằng cách ghép nối những người đặt cọc tại nhà hoặc nhỏ hơn với những người lớn hơn.

## Những hạn chế tiềm ẩn khi sử dụng DVT {#potential-drawbacks-of-using-dvt}

- **Thành phần bổ sung** - việc giới thiệu một nút DVT thêm vào một phần khác có thể bị lỗi hoặc dễ bị tổn thương. Một cách để giảm thiểu điều này là cố gắng có nhiều triển khai của một nút DVT, nghĩa là có nhiều máy khách DVT (tương tự như có nhiều máy khách cho các lớp đồng thuận và thực thi).
- **Chi phí vận hành** - vì DVT phân phối trình xác thực giữa nhiều bên, nên cần nhiều nút hơn để vận hành thay vì chỉ một nút duy nhất, điều này làm tăng chi phí vận hành.
- **Khả năng tăng độ trễ** - vì DVT sử dụng một giao thức đồng thuận để đạt được sự đồng thuận giữa nhiều nút vận hành một trình xác thực, nó có khả năng làm tăng độ trễ.

## Đọc thêm {#further-reading}

- [Thông số kỹ thuật trình xác thực phân tán Ethereum (cấp cao)](https://github.com/ethereum/distributed-validator-specs)
- [Thông số kỹ thuật chi tiết trình xác thực phân tán Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Ứng dụng demo chia sẻ bí mật của Shamir](https://iancoleman.io/shamir/)