---
title: Lưu trữ phi tập trung
description: Tổng quan về lưu trữ phi tập trung là gì và các công cụ có sẵn để tích hợp nó vào một ứng dụng phi tập trung (dapp).
lang: vi
authors: ["Patrick Collins"]
---

Khác với một máy chủ tập trung được vận hành bởi một công ty hoặc tổ chức duy nhất, các hệ thống lưu trữ phi tập trung bao gồm một mạng lưới ngang hàng của những người dùng-vận hành nắm giữ một phần của toàn bộ dữ liệu, tạo ra một hệ thống chia sẻ lưu trữ tệp có khả năng phục hồi. Chúng có thể nằm trong một ứng dụng dựa trên chuỗi khối hoặc bất kỳ mạng lưới dựa trên ngang hàng nào.

Bản thân Ethereum có thể được sử dụng như một hệ thống lưu trữ phi tập trung, và nó thực sự là như vậy khi nói đến việc lưu trữ mã trong tất cả các hợp đồng thông minh. Tuy nhiên, khi nói đến lượng dữ liệu lớn, đó không phải là mục đích mà Ethereum được thiết kế. Chuỗi đang phát triển đều đặn, nhưng tại thời điểm viết bài, chuỗi Ethereum có dung lượng khoảng 500GB - 1TB ([tùy thuộc vào máy khách](https://etherscan.io/chartsync/chaindefault)), và mọi nút trên mạng lưới cần phải có khả năng lưu trữ tất cả dữ liệu. Nếu chuỗi mở rộng đến lượng dữ liệu lớn (ví dụ 5TB), sẽ không khả thi để tất cả các nút tiếp tục chạy. Ngoài ra, chi phí triển khai lượng dữ liệu lớn như vậy lên Mạng chính sẽ cực kỳ đắt đỏ do phí [Gas](/developers/docs/gas).

Do những hạn chế này, chúng ta cần một chuỗi hoặc phương pháp luận khác để lưu trữ lượng lớn dữ liệu theo cách phi tập trung.

Khi xem xét các tùy chọn lưu trữ phi tập trung (dStorage), có một vài điều người dùng phải ghi nhớ.

- Cơ chế lưu trữ lâu dài / cấu trúc khuyến khích
- Thực thi việc lưu giữ dữ liệu
- Tính phi tập trung
- Đồng thuận

## Cơ chế lưu trữ lâu dài / cấu trúc khuyến khích {#persistence-mechanism}

### Dựa trên chuỗi khối {#blockchain-based}

Để một phần dữ liệu tồn tại mãi mãi, chúng ta cần sử dụng một cơ chế lưu trữ lâu dài. Ví dụ, trên Ethereum, cơ chế lưu trữ lâu dài là toàn bộ chuỗi cần được tính đến khi chạy một nút. Các phần dữ liệu mới được gắn vào cuối chuỗi và nó tiếp tục phát triển - yêu cầu mọi nút phải sao chép tất cả dữ liệu được nhúng.

Điều này được gọi là lưu trữ lâu dài **dựa trên chuỗi khối**.

Vấn đề với lưu trữ lâu dài dựa trên chuỗi khối là chuỗi có thể trở nên quá lớn để duy trì và lưu trữ tất cả dữ liệu một cách khả thi (ví dụ: [nhiều nguồn](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) ước tính Internet yêu cầu dung lượng lưu trữ hơn 40 Zettabyte).

Chuỗi khối cũng phải có một số loại cấu trúc khuyến khích. Đối với lưu trữ lâu dài dựa trên chuỗi khối, có một khoản thanh toán được thực hiện cho trình xác thực. Khi dữ liệu được thêm vào chuỗi, các trình xác thực được trả tiền để thêm dữ liệu đó vào.

Các nền tảng có lưu trữ lâu dài dựa trên chuỗi khối:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Dựa trên hợp đồng {#contract-based}

Lưu trữ lâu dài **dựa trên hợp đồng** có trực giác rằng dữ liệu không thể được sao chép bởi mọi nút và lưu trữ mãi mãi, mà thay vào đó phải được duy trì bằng các thỏa thuận hợp đồng. Đây là những thỏa thuận được thực hiện với nhiều nút đã hứa sẽ giữ một phần dữ liệu trong một khoảng thời gian. Chúng phải được hoàn tiền hoặc gia hạn bất cứ khi nào hết hạn để giữ cho dữ liệu được lưu trữ lâu dài.

Trong hầu hết các trường hợp, thay vì lưu trữ tất cả dữ liệu trên chuỗi, Mã băm của vị trí dữ liệu trên chuỗi sẽ được lưu trữ. Bằng cách này, toàn bộ chuỗi không cần phải mở rộng quy mô để giữ tất cả dữ liệu.

Các nền tảng có lưu trữ lâu dài dựa trên hợp đồng:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Mạng lưới Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Các cân nhắc bổ sung {#additional-consideration}

IPFS là một hệ thống phân tán để lưu trữ và truy cập các tệp, trang web, ứng dụng và dữ liệu. Nó không có sẵn một kế hoạch khuyến khích tích hợp, nhưng thay vào đó có thể được sử dụng với bất kỳ giải pháp khuyến khích dựa trên hợp đồng nào ở trên để lưu trữ lâu dài hơn. Một cách khác để lưu trữ dữ liệu lâu dài trên IPFS là làm việc với một dịch vụ ghim (pinning service), dịch vụ này sẽ "ghim" dữ liệu cho bạn. Bạn thậm chí có thể chạy nút IPFS của riêng mình và đóng góp vào mạng lưới để lưu trữ dữ liệu của bạn và/hoặc của người khác miễn phí!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(Dịch vụ ghim IPFS)_
- [web3.storage](https://web3.storage/) _(Dịch vụ ghim IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(Dịch vụ ghim IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(Trình khám phá ghim IPFS)_
- [4EVERLAND](https://www.4everland.org/)_(Dịch vụ ghim IPFS)_
- [Filebase](https://filebase.com) _(Dịch vụ ghim IPFS)_
- [Spheron Network](https://spheron.network/) _(Dịch vụ ghim IPFS/Filecoin)_

Mạng lưới Swarm là một công nghệ phân phối và lưu trữ dữ liệu phi tập trung với hệ thống khuyến khích lưu trữ và nguồn cấp dữ liệu giá thuê lưu trữ.

## Lưu giữ dữ liệu {#data-retention}

Để lưu giữ dữ liệu, các hệ thống phải có một số loại cơ chế để đảm bảo dữ liệu được lưu giữ.

### Cơ chế thử thách {#challenge-mechanism}

Một trong những cách phổ biến nhất để đảm bảo dữ liệu được lưu giữ là sử dụng một số loại thử thách mật mã học được phát hành cho các nút để đảm bảo chúng vẫn có dữ liệu. Một ví dụ đơn giản là xem xét bằng chứng truy cập (proof-of-access) của Arweave. Họ đưa ra một thử thách cho các nút để xem liệu chúng có dữ liệu ở cả khối gần đây nhất và một khối ngẫu nhiên trong quá khứ hay không. Nếu nút không thể đưa ra câu trả lời, chúng sẽ bị phạt.

Các loại dStorage có cơ chế thử thách:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Tính phi tập trung {#decentrality}

Không có công cụ tuyệt vời nào để đo lường mức độ của sự phi tập trung của các nền tảng, nhưng nhìn chung, bạn sẽ muốn sử dụng các công cụ không có một số hình thức KYC để cung cấp bằng chứng rằng chúng không bị tập trung hóa.

Các công cụ phi tập trung không có KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Đồng thuận {#consensus}

Hầu hết các công cụ này đều có phiên bản [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/) của riêng chúng nhưng nhìn chung chúng dựa trên [**Bằng chứng công việc (PoW)**](/developers/docs/consensus-mechanisms/pow/) hoặc [**Bằng chứng cổ phần (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Dựa trên Bằng chứng công việc:

- Skynet
- Arweave

Dựa trên Bằng chứng cổ phần:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Các công cụ liên quan {#related-tools}

**IPFS - _InterPlanetary File System là một hệ thống tham chiếu tệp và lưu trữ phi tập trung cho Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Tài liệu](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Lưu trữ đối tượng đám mây phi tập trung an toàn, riêng tư và tương thích với S3 dành cho các nhà phát triển._**

- [Storj.io](https://storj.io/)
- [Tài liệu](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Khai thác mật mã học để tạo ra một thị trường lưu trữ đám mây không cần tin cậy, cho phép người mua và người bán giao dịch trực tiếp._**

- [Skynet.net](https://sia.tech/)
- [Tài liệu](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin được tạo ra từ cùng một nhóm đứng sau IPFS. Nó là một lớp khuyến khích nằm trên các lý tưởng của IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Tài liệu](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave là một nền tảng dStorage để lưu trữ dữ liệu._**

- [Arweave.org](https://www.arweave.org/)
- [Tài liệu](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs là một nền tảng dStorage Bằng chứng cổ phần với phân mảnh và blobber._**

- [zus.network](https://zus.network/)
- [Tài liệu](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust là một nền tảng dStorage nằm trên IPFS._**

- [Crust.network](https://crust.network)
- [Tài liệu](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Mạng lưới Swarm - _Một nền tảng lưu trữ phân tán và dịch vụ phân phối nội dung cho ngăn xếp Web3 của Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Tài liệu](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Một cơ sở dữ liệu ngang hàng phi tập trung nằm trên IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Tài liệu](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Dự án đám mây phi tập trung (cơ sở dữ liệu, lưu trữ tệp, điện toán và danh tính phi tập trung (DID)). Một sự kết hợp độc đáo của công nghệ ngang hàng ngoài chuỗi và trên chuỗi. Khả năng tương thích với IPFS và đa chuỗi._**

- [Aleph.im](https://aleph.cloud/)
- [Tài liệu](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Lưu trữ cơ sở dữ liệu IPFS do người dùng kiểm soát cho các ứng dụng phong phú dữ liệu và hấp dẫn._**

- [Ceramic.network](https://ceramic.network/)
- [Tài liệu](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _Lưu trữ phi tập trung tương thích với S3 và dịch vụ ghim IPFS dự phòng theo địa lý. Tất cả các tệp được tải lên IPFS thông qua Filebase sẽ tự động được ghim vào cơ sở hạ tầng Filebase với 3 lần sao chép trên toàn cầu._**

- [Filebase.com](https://filebase.com/)
- [Tài liệu](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Một nền tảng điện toán đám mây Web 3.0 tích hợp các khả năng cốt lõi về lưu trữ, điện toán và mạng lưới, tương thích với S3 và cung cấp lưu trữ dữ liệu đồng bộ trên các mạng lưới lưu trữ phi tập trung như IPFS và Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Tài liệu](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Một nền tảng chuỗi khối như một dịch vụ (blockchain-as-a-service) với các nút IPFS chỉ bằng một cú nhấp chuột_**

- [Kaleido](https://kaleido.io/)
- [Tài liệu](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron là một nền tảng như một dịch vụ (PaaS) được thiết kế cho các ứng dụng phi tập trung (dapp) muốn khởi chạy ứng dụng của họ trên cơ sở hạ tầng phi tập trung với hiệu suất tốt nhất. Nó cung cấp điện toán, lưu trữ phi tập trung, CDN & lưu trữ web theo mặc định._**

- [spheron.network](https://spheron.network/)
- [Tài liệu](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 - _Trình phân giải cho các trang web phi tập trung, tương tự như eth.limo, hỗ trợ tất cả các loại và không giới hạn ở ENS và IPFS._**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass - _Công cụ tìm kiếm cho các trang web phi tập trung được hỗ trợ bởi IPFS + ENS._**

- [web3compass.net](https://www.web3compass.net/)
- [Tài liệu](https://www.web3compass.net/statistics)

## Đọc thêm {#further-reading}

- [Lưu trữ phi tập trung là gì?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Phá vỡ năm lầm tưởng phổ biến về lưu trữ phi tập trung](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Các chủ đề liên quan {#related-topics}

- [Các framework phát triển](/developers/docs/frameworks/)