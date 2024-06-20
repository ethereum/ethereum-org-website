---
title: Công nghệ xác thực phân tán
description: Công nghệ xác thực phân tán cho phép nhiều bên tham gia hoạt động phân tán một nút xác thực Ethereum.
lang: vi
---

# Công nghệ xác thực phân tán {#distributed-validator-technology}

Công nghệ xác thực phân tán (DVT) là một phương pháp bảo mật nút xác thực, phân trách nhiệm quản lý khóa và ký cho nhiều bên tham gia, nhằm giảm thiểu các điểm lỗi đơn và tăng khả năng chịu lỗi của nút xác thực.

Điều này được thực hiện bằng cách **chia nhỏ khóa riêng tư** được sử dụng để bảo vệ một nút xác thực **trên nhiều máy tính** được tổ chức thành một. Lợi ích của điều này là khiến kẻ tấn công rất khó truy cập vào khóa bởi vì nó không được lưu trữ hoàn toàn trên bất kỳ thiết bị đơn lẻ nào. Nó cũng cho phép một số nút tạm thời ngưng hoạt động, vì một nhóm nhỏ các máy trong mỗi cụm có thể thực hiện quá trình ký. Điều này giúp giảm điểm lỗi đơn từ mạng và làm cho toàn bộ tập hợp nút xác thực trở nên mạnh mẽ hơn.

![Biểu đồ minh họa cách phân tách khóa nút xác thực thành các phần khóa và phân tán chúng cho các nút khác nhau có thành phần đa dạng.](./dvt-cluster.png)

## Tại sao chúng ta lại cần DVT? {#why-do-we-need-dvt}

### Bảo mật {#security}

Các nút xác thực tạo ra hai cặp khóa là khóa chung và khóa riêng: khóa của nút xác thực để tham gia vào quá trình đồng thuận và khóa rút tiền để truy cập vào tài khoản tiền. Mặc dù người kiểm duyệt có thể bảo mật các khóa rút tiền trong lưu trữ lạnh, nhưng khóa riêng của người kiểm duyệt phải hoạt động trực tuyến 24/7. Nếu một khóa riêng của người kiểm duyệt bị xâm phạm, một kẻ tấn công có thể kiểm soát người kiểm duyệt, có khả năng dẫn đến người góp cổ phần bị cắt giảm hoặc mất ETH. DVT có thể trợ giúp giảm thiểu rủi ro này. Cách hoạt động:

Bằng cách sử dụng DVT, người góp cổ phần có thể tham gia vào quá trình góp cổ phần trong khi giữ nguyên khóa riêng của nút xác thực trong kho lưu trữ lạnh. Có thể thực hiện điều này bằng cách mã hóa khóa nút xác thực đầy đủ ban đầu và sau đó chia thành các phần khóa. Các phần khóa kết nối trực tuyến và được phân tán tới nhiều nút khác nhau, tạo điều kiện cho hoạt động phân tán của nút xác thực. Có thể thực hiện điều này bởi vì các nút xác thực Ethereum sử dụng chữ ký BLS có tính cộng dần, có nghĩa là khóa gốc có thể được tái tạo bằng cách tổng hợp các phần. Điều này cho phép người đặt cọc giữ nguyên khóa 'chính' của nút xác thực ban đầu một cách an toàn ngoại tuyến.

### Không có điểm lỗi đơn {#no-single-point-of-failure}

Khi chia một nút xác thực cho nhiều nhà điều hành và nhiều máy, nó có thể chịu được sự cố về phần cứng và phần mềm của từng máy và không bị ngừng hoạt động. Cũng có thể giảm thiểu nguy cơ xảy ra sự cố bằng cách sử dụng các cấu hình phần cứng và phần mềm đa dạng trên các nút trong một cụm. Khả năng chịu đựng này không có sẵn trong cấu hình kiểm duyệt một nút duy nhất - nó đến từ lớp DVT.

Nếu một trong các thành phần của một máy trong một cụm gặp sự cố (ví dụ: nếu có bốn nhà điều hành trong một cụm kiểm duyệt và một trong số họ sử dụng một máy khách cụ thể có lỗi), các thành phần còn lại đảm bảo rằng nút xác thực vẫn tiếp tục hoạt động.

### Phi tập trung {#decentralization}

Tình huống lý tưởng cho Ethereum là có càng nhiều nút xác thực được điều hành độc lập càng tốt. Tuy nhiên, một số nhà cung cấp dịch vụ đặt cọc đã trở nên rất phổ biến và chiếm một phần đáng kể của tổng lượng ETH được đặt cọc trên mạng. DVT có thể cho phép những nhà điều hành này tồn tại mài vẫn duy trì tính phi tập trung của cổ phần. Điều này là do khóa của từng nút xác thực được phân tán trên nhiều máy khác nhau. Do đó, cần phải có sự thông đồng với quy mô lớn hơn rất nhiều để một nút xác thực có thể trở nên độc hại.

Nếu không có DVT, các nhà cung cấp dịch vụ góp cổ phần có thể dễ dàng hỗ trợ chỉ một hoặc hai cấu hình máy khách cho tất cả các nút xác thực, từ đó làm gia tăng tác động của lỗi máy khách. Có thể dùng DVT để phân tán rủi ro trên nhiều cấu hình máy khách và phần cứng khác nhau, tạo ra khả năng phục hồi thông qua tính đa dạng.

**DVT mang lại các lợi ích sau cho Ethereum:**

1. **Phân cấp** đồng thuận bằng chứng cổ phần của Ethereum
2. Đảm bảo **trạng thái tốt** cho mạng lưới
3. Tạo **khả năng chịu lỗi** cho nút xác thực
4. Giảm thiểu **niềm tin cần thiết** khi vận hành nút xác thực
5. **Giảm thiểu các rủi ro bị cắt giảm** và ngừng hoạt động
6. **Cải thiện tính đa dạng** (máy khách, trung tâm dữ liệu, địa điểm, quy định v.v.)
7. **Nâng cao bảo mật** trong quản lý khóa nút xác thực

## DVT hoạt động ra sao? {#how-does-dvt-work}

Giải pháp DVT bao gồm các thành phần chính sau:

- **[Ứng dụng Chia sẻ bí mật của Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Các nút xác thực sử dụng [khóa BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Có thể kết hợp các "phần khóa" BLS riêng lẻ ("phần khóa") thành một khóa tổng hợp (chữ ký). Trong DVT, khóa riêng của nút xác thực là chữ ký BLS kết hợp của từng nhà điều hành trong cụm.
- **[Lược đồ chữ ký ngưỡng](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Xác định số lượng phần khóa riêng lẻ cần thiết cho các tác vụ ký, ví dụ: 3 trong 4.
- **[Tạo khóa phân tán (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Quy trình mã hóa tạo ra các phần khóa và được sử dụng để phân phối các phần khóa nút xác thực hiện có hoặc mới cho các nút trong cụm.
- **[Tính toán nhiều bên (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Khóa nút xác thực đầy đủ được tạo ra một cách bí mật bằng tính toán nhiều bên. Không nhà điều hành riêng lẻ nào biết được khóa đầy đủ vì họ chỉ biết phần của mình ("phần khóa" của họ).
- **Giao thức đồng thuận** - Giao thức đồng thuận chọn một nút làm trình đề xuất khối. Chúng chia sẻ khối với các nút khác trong cụm, những nút này sẽ thêm phần khóa của mình vào chữ ký tổng hợp. Khi phần khóa được tổng hợp đủ, khối sẽ được đề xuất trên Ethereum.

Các nút xác thực phân tán có khả năng chịu lỗi tích hợp và có thể tiếp tục chạy ngay cả khi một số nút riêng lẻ ngoại tuyến. Điều này cho thấy cụm có khả năng phục hồi ngay cả khi một số nút trong cụm trở nên độc hại hoặc ít hoạt động.

## Các trường hợp sử dụng DVT {#dvt-use-cases}

DVT có những tác động quan trọng đến ngành đặt cọc nói chung:

### Người đặt cọc một mình {#solo-stakers}

DVT cho phép đặt cọc tự nắm giữ khóa bằng cách phân tán khóa nút xác thực của bạn trên các nút từ xa trong khi vẫn giữ cho toàn bộ khóa hoàn toàn ngoại tuyến. Nghĩa là những người tự đặt cọc không nhất thiết phải chi tiền mua phần cứng, trong khi cơ chế phân phối các phần khóa có thể giúp tăng cường bảo mật chống lại các vụ xâm nhập tiềm ẩn.

### Staking as a service (SaaS) {#saas}

Các nhà điều hành (chẳng hạn như nhóm đặt cọc và đặt cọc theo tổ chức) nào quản lý nhiều nút xác thực có thể sử dụng DVT để giảm thiểu rủi ro. Bằng cách phân tán cơ sở hạ tầng, họ có thể tăng khả năng dự phòng cho các hoạt động và đa dạng hóa các loại phần cứng họ sử dụng.

DVT có trách nhiệm quản lý khóa trên nhiều nút, nghĩa là có thể chia sẻ một số chi phí vận hành. Bên cạnh đó, DVT còn có thể giúp giảm thiểu rủi ro vận hành và chi phí bảo hiểm cho các nhà cung cấp dịch vụ đặt cọc.

### Staking pools {#staking-pools}

Do các thiết lập nút xác thực tiêu chuẩn, các nhóm góp cổ phần và nhà cung cấp dịch vụ góp cổ phần thanh khoản buộc phải có nhiều mức độ tin tưởng khác nhau đối với từng nhà điều hành vì lợi nhuận và thua lỗ được chia sẻ trong toàn bộ nhóm. Họ cũng phụ thuộc vào nhà điều hành để bảo vệ khóa ký vì cho đến nay, vẫn chưa có tùy chọn nào thay thế.

Mặc dù đã thực hiện nỗ lực để phân tán rủi ro bằng cách phân bổ cổ phần cho nhiều nhà điều hành, nhưng mỗi nhà điều hành vẫn quản lý một lượng cổ phần đáng kể một cách độc lập. Phụ thuộc vào một nhà điều hành duy nhất sẽ tiềm ẩn những rủi ro lớn nếu họ hoạt động kém hiệu quả, bị ngừng hoạt động, bị tấn công hoặc có hành động độc hại.

Nhờ DVT, không cần phải đặt quá nhiều niềm tin vào các nhà điều hành như trước. **Các nhóm có thể cho phép các nhà điều hành nắm giữ cổ phần mà không cần nắm giữ khóa nút xác thực** (vì chỉ sử dụng các phần khóa). Nó cũng cho phép phân bổ các cổ phần được quản lý cho nhiều nhà điều hành hơn (ví dụ: thay vì để một nhà điều hành duy nhất quản lý 1000 nút xác thực, DVT cho phép nhiều nhà điều hành quản lý các nút xác thực đó). Các thiết lập nhà điều hành đa dạng sẽ đảm bảo rằng dù có một nhà điều hành ngừng hoạt động, những nhà điều hành khác vẫn có thể chứng thực. Điều này giúp dự phòng và đa dạng hóa, làm cho hiệu suất và khả năng phục hồi tốt hơn, đồng thời tối đa hóa phần thưởng.

Một lợi ích khác khi giảm mức độ tin tưởng vào một nhà điều hành duy nhất chính là các nhóm đặt cọc có thể cho phép nhiều nhà điều hành tham gia hơn và không cần cấp phép. Theo đó, các dịch vụ có thể giảm thiểu rủi ro và hỗ trợ phi tập trung hóa Ethereum bằng cách tận dụng cả những nhà điều hành được lựa chọn cẩn thận và những nhà điều hành không cần cấp phép, ví dụ như ghép nối các người đặt cọc cá nhân hoặc người đặt cọc nhỏ hơn với người đặt cọc lớn hơn.

## Những hạn chế tiềm ẩn khi sử dụng DVT {#potential-drawbacks-of-using-dvt}

- **Thành phần bổ sung** - thêm một nút DVT đồng nghĩa với việc thêm một thành phần khác có khả năng bị lỗi hoặc bị tấn công. Một cách để giảm thiểu rủi ro này đó là cố gắng triển khai nhiều lần một nút DVT, nghĩa là nhiều máy khách DVT khác nhau (tương tự như tình huống có nhiều máy khách cho các lớp đồng thuận và thực thi).
- **Chi phí vận hành** - vì DVT phân tán nút xác thực giữa nhiều bên nên cần phải có nhiều nút hơn để hoạt động thay vì chỉ một nút duy nhất, dẫn đến gia tăng chi phí vận hành.
- **Độ trễ khả dĩ** - vì DVT áp dụng giao thức đồng thuận để đạt được đồng thuận giữa các nút khác nhau điều hành nút xác thực, nên công nghệ này có thể làm tăng độ trễ.

## Đọc thêm {#further-reading}

- [Thông số kỹ thuật nút xác thực phân tán Ethereum (cấp cao)](https://github.com/ethereum/distributed-validator-specs)
- [Thông số kỹ thuật nút xác thực phân tán Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Ứng dụng demo chia sẻ bí mật của Shamir](https://iancoleman.io/shamir/)
