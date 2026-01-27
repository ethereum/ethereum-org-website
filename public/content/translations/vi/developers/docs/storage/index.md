---
title: "Lưu trữ phi tập trung"
description: "Tổng quan về lưu trữ phi tập trung và các công cụ có sẵn để tích hợp vào dapp."
lang: vi
---

Khác với một máy chủ tập trung do một công ty hay tổ chức duy nhất điều hành, các hệ thống lưu trữ phi tập trung bao gồm một mạng lưới ngang hàng của những người dùng-điều hành, mỗi người giữ một phần dữ liệu tổng thể, tạo nên một hệ thống chia sẻ lưu trữ file bền bỉ. Những điều này có thể tồn tại trong một ứng dụng dựa trên blockchain hoặc bất kỳ mạng lưới ngang hàng nào.

Ethereum có thể được sử dụng như một hệ thống lưu trữ phi tập trung, và điều này đặc biệt đúng khi nói đến việc lưu trữ mã trong tất cả các hợp đồng thông minh. Tuy nhiên, khi nói đến lượng lớn dữ liệu, đó không phải là điều mà Ethereum được thiết kế cho. Chuỗi đang phát triển ổn định, nhưng tại thời điểm viết bài, chuỗi Ethereum có dung lượng khoảng 500GB - 1TB ([tùy thuộc vào client](https://etherscan.io/chartsync/chaindefault)), và mọi nút trên mạng cần có khả năng lưu trữ tất cả dữ liệu. Nếu chuỗi mở rộng đến một lượng dữ liệu lớn (chẳng hạn như 5TB) thì sẽ không khả thi cho tất cả các nút tiếp tục hoạt động. Ngoài ra, chi phí triển khai lượng dữ liệu lớn như vậy lên Mạng chính sẽ cực kỳ tốn kém do phí [gas](/developers/docs/gas).

Do những hạn chế này, chúng ta cần một chuỗi hoặc phương pháp khác để lưu trữ một lượng lớn dữ liệu theo cách phi tập trung.

Khi xem xét các tùy chọn lưu trữ phi tập trung (dStorage), có một vài điều mà người dùng cần lưu ý.

- Cơ chế kiên trì / cấu trúc khuyến khích
- Thực thi lưu giữ dữ liệu
- Sự phi tập trung
- Sự đồng thuận

## Cơ chế bền vững / cấu trúc khuyến khích {#persistence-mechanism}

### Dựa trên blockchain {#blockchain-based}

Để một mẩu dữ liệu có thể tồn tại mãi mãi, chúng ta cần sử dụng một cơ chế lưu trữ. Ví dụ, trên Ethereum, cơ chế duy trì tính toàn vẹn là toàn bộ chuỗi cần được ghi nhận khi vận hành một nút. Những mảnh dữ liệu mới được gắn vào cuối chuỗi, và nó tiếp tục phát triển - yêu cầu mỗi nút phải sao chép toàn bộ dữ liệu được nhúng.

Điều này được gọi là tính bền vững **dựa trên blockchain**.

Vấn đề với tính bền vững dựa trên blockchain là chuỗi có thể trở nên quá lớn để có thể duy trì và lưu trữ tất cả dữ liệu một cách khả thi (ví dụ: [nhiều nguồn](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) ước tính rằng Internet cần hơn 40 Zetabyte dung lượng lưu trữ).

Blockchain cũng cần có một loại cấu trúc khuyến khích nào đó. Để duy trì trên blockchain, có một khoản thanh toán được gửi cho người xác thực. Khi dữ liệu được thêm vào chuỗi, các validator được trả tiền để thêm dữ liệu vào.

Các nền tảng có tính bền vững dựa trên blockchain:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Dựa trên hợp đồng {#contract-based}

Tính bền vững **dựa trên hợp đồng** có nguyên tắc là dữ liệu không thể được sao chép bởi mọi nút và được lưu trữ mãi mãi, mà thay vào đó phải được duy trì bằng các thỏa thuận hợp đồng. Đây là các thỏa thuận được thiết lập với nhiều nút đã hứa sẽ lưu giữ một phần dữ liệu trong một khoảng thời gian. Chúng phải được hoàn tiền hoặc gia hạn mỗi khi hết hạn để dữ liệu được giữ lại.

Trong hầu hết các trường hợp, thay vì lưu trữ toàn bộ dữ liệu trên chuỗi, thì chỉ có hàm băm của chỗ dữ liệu nằm trên chuỗi được lưu lại. Theo cách này, toàn bộ chuỗi không cần phải mở rộng để giữ tất cả dữ liệu.

Các nền tảng có tính năng lưu trữ dựa trên hợp đồng:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Những cân nhắc bổ sung {#additional-consideration}

IPFS là một hệ thống phân tán để lưu trữ và truy cập các tập tin, trang web, ứng dụng và dữ liệu. Nó không có cơ chế khuyến khích tích hợp sẵn, nhưng có thể được sử dụng cùng với bất kỳ giải pháp khuyến khích dựa trên hợp đồng nào đã nêu ở trên để đảm bảo lưu trữ lâu dài. Một cách khác để dữ liệu tồn tại lâu trên IPFS là sử dụng dịch vụ ghim, dịch vụ này sẽ “ghim” dữ liệu của bạn lại. Bạn thậm chí có thể chạy nút IPFS của riêng mình và đóng góp vào mạng lưới để lưu trữ dữ liệu của bạn và/hoặc của người khác hoàn toàn miễn phí!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(dịch vụ ghim IPFS)_
- [web3.storage](https://web3.storage/) _(dịch vụ ghim IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(dịch vụ ghim IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(trình khám phá ghim IPFS)_
- [4EVERLAND](https://www.4everland.org/)_(dịch vụ ghim IPFS)_
- [Filebase](https://filebase.com) _(Dịch vụ ghim IPFS)_
- [Spheron Network](https://spheron.network/) _(dịch vụ ghim IPFS/Filecoin)_

SWARM là một công nghệ lưu trữ và phân phối dữ liệu phi tập trung, có hệ thống khuyến khích lưu trữ và một cơ sở dữ liệu xác định giá thuê lưu trữ.

## Lưu giữ dữ liệu {#data-retention}

Để lưu trữ dữ liệu, các hệ thống phải có một cơ chế nào đó để đảm bảo dữ liệu được giữ lại.

### Cơ chế thách thức {#challenge-mechanism}

Một trong những cách phổ biến nhất để đảm bảo dữ liệu được giữ lại, là sử dụng một loại thử thách mã hóa nào đó được gửi đến các nút để đảm bảo chúng vẫn còn dữ liệu. Một cách đơn giản là nhìn vào minh chứng truy cập Arweave. Họ đưa ra một thử thách cho các nút để xem liệu họ có dữ liệu ở cả khối gần nhất và một khối ngẫu nhiên trong quá khứ không. Nếu nút không đưa ra được câu trả lời, họ sẽ bị phạt.

Các loại lưu trữ phân tán với cơ chế thách thức:

- Züs
- Skynet
- Arweave
- Filecoin
- Mạng Crust
- 4EVERLAND

### Tính phi tập trung {#decentrality}

Không có nhiều công cụ tốt để đo lường mức độ phi tập trung của các nền tảng, nhưng nhìn chung, bạn sẽ muốn sử dụng những công cụ không có hình thức KYC nào để chứng minh rằng chúng không phải là trung tâm.

Công cụ phi tập trung không cần KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Mạng Crust
- 4EVERLAND

### Cơ chế đồng thuận {#consensus}

Hầu hết các công cụ này có phiên bản [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/) của riêng chúng nhưng nhìn chung, chúng dựa trên [**bằng chứng công việc (PoW)**](/developers/docs/consensus-mechanisms/pow/) hoặc [**bằng chứng cổ phần (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Dựa trên proof-of-work:

- Skynet
- Arweave

Dựa trên proof-of-stake:

- Ethereum
- Filecoin
- Züs
- Mạng Crust

## Các công cụ liên quan {#related-tools}

**IPFS - _Hệ thống Tệp Liên hành tinh là một hệ thống tham chiếu tệp và lưu trữ phi tập trung cho Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Tài liệu](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Lưu trữ đối tượng đám mây phi tập trung, an toàn, riêng tư và tương thích với S3 dành cho nhà phát triển._**

- [Storj.io](https://storj.io/)
- [Tài liệu](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Khai thác mật mã học để tạo ra một thị trường lưu trữ đám mây phi tín nhiệm, cho phép người mua và người bán giao dịch trực tiếp._**

- [Skynet.net](https://sia.tech/)
- [Tài liệu](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin được tạo ra bởi cùng một đội ngũ đứng sau IPFS. Đó là một lớp khuyến khích trên những ý tưởng của IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Tài liệu](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave là một nền tảng lưu trữ phi tập trung (dStorage) để lưu trữ dữ liệu._**

- [Arweave.org](https://www.arweave.org/)
- [Tài liệu](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs là một nền tảng lưu trữ phi tập trung (dStorage) bằng chứng cổ phần với tính năng phân mảnh và các blobber._**

- [zus.network](https://zus.network/)
- [Tài liệu](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust là một nền tảng lưu trữ phi tập trung (dStorage) xây dựng trên IPFS._**

- [Crust.network](https://crust.network)
- [Tài liệu](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Một nền tảng lưu trữ phân tán và dịch vụ phân phối nội dung cho ngăn xếp web3 của Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Tài liệu](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Một cơ sở dữ liệu ngang hàng phi tập trung được xây dựng trên IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Tài liệu](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Dự án đám mây phi tập trung (cơ sở dữ liệu, lưu trữ tệp, tính toán và DID). Một sự kết hợp độc đáo giữa công nghệ ngang hàng offchain và onchain. Khả năng tương thích với IPFS và đa chuỗi._**

- [Aleph.im](https://aleph.cloud/)
- [Tài liệu](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Lưu trữ cơ sở dữ liệu IPFS do người dùng kiểm soát dành cho các ứng dụng hấp dẫn và giàu dữ liệu._**

- [Ceramic.network](https://ceramic.network/)
- [Tài liệu](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _Lưu trữ phi tập trung tương thích với S3 và dịch vụ ghim IPFS có sao lưu dự phòng theo địa lý. Tất cả các tệp được tải lên IPFS thông qua Filebase sẽ được tự động ghim vào cơ sở hạ tầng Filebase với 3 bản sao trên toàn cầu._**

- [Filebase.com](https://filebase.com/)
- [Tài liệu](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Một nền tảng điện toán đám mây Web 3.0 tích hợp các khả năng cốt lõi về lưu trữ, tính toán và kết nối mạng, tương thích với S3 và cung cấp khả năng lưu trữ dữ liệu đồng bộ trên các mạng lưu trữ phi tập trung như IPFS và Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Tài liệu](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Một nền tảng blockchain dưới dạng dịch vụ với các Nút IPFS có thể triển khai chỉ bằng một cú nhấp chuột_**

- [Kaleido](https://kaleido.io/)
- [Tài liệu](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron là một nền tảng dưới dạng dịch vụ (PaaS) được thiết kế cho các ứng dụng phi tập trung (dApp) muốn khởi chạy ứng dụng của họ trên cơ sở hạ tầng phi tập trung với hiệu suất tốt nhất. Nền tảng này cung cấp sẵn các dịch vụ tính toán, lưu trữ phi tập trung, CDN và lưu trữ web._**

- [spheron.network](https://spheron.network/)
- [Tài liệu](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Đọc thêm {#further-reading}

- [Lưu trữ phi tập trung là gì?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Phá bỏ năm lầm tưởng phổ biến về lưu trữ phi tập trung](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Các khung phát triển](/developers/docs/frameworks/)
