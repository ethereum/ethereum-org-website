---
title: Đa máy khách
description: Giải thích chuyên sâu về tầm quan trọng của đa máy khách trên Ethereum.
lang: vi
sidebarDepth: 2
---

Hành vi của một node Ethereum được kiểm soát bởi phần mềm máy khách mà nó chạy. Có một số máy khách Ethereum cấp độ sản xuất đang tồn tại, mỗi loại được phát triển và duy trì bằng những ngôn ngữ khác nhau bởi những đội ngũ riêng biệt. Máy khách được xây dựng đến một thông số kỹ thuật cụ thể để đảm bảo chúng tương tác liền mạch với nhau và có cùng chức năng cũng như cung cấp trải nghiệm người dùng cân xứng. Tuy nhiên, hiện nay, việc phân phối máy khách trên các node không đủ đồng đều để phát huy hết tiềm năng của việc củng cố mạng. Lí tưởng nhất, người dùng được phân chia đồng đều để sử dụng các máy khách khác nhau với mục đích làm đa dạng máy khách nhất có thể.

## Điều kiện tiên quyết {#prerequisites}

Nếu bạn chưa hiểu nút và máy khách là gì, hãy xem [nút và máy khách](/developers/docs/nodes-and-clients/). [Lớp thực thi](/glossary/#execution-layer) và [lớp đồng thuận](/glossary/#consensus-layer) được định nghĩa trong bảng thuật ngữ.

## Tại sao nên có nhiều loại máy khách? {#why-multiple-clients}

Nhiều máy khách được phát triển và duy trì độc lập tồn tại vì tính đa dạng của máy khách giúp mạng trở nên linh hoạt hơn trước lỗi hệ thống và các cuộc tấn công. Đa máy khách là thế mạnh độc nhất của Ethereum - các blockchain khác phải đánh cược rằng một máy khách duy nhất sẽ không sụp đổ. Tuy nhiên, việc có sẵn nhiều máy khách là chưa đủ, chúng phải được cộng đồng chấp nhận và tổng số nút đang hoạt động phải được phân bổ tương đối đồng đều giữa chúng.

## Tại sao đa máy khách quan trọng? {#client-diversity-importance}

Có nhiều loại máy khách được phát triển và duy trì độc lập là rất quan trọng đối với sức khỏe của mạng phi tập trung. Hãy cùng tìm hiểu lí do vì sao.

### Lỗi {#bugs}

Một lỗi trong một loại máy khách riêng lẻ sẽ gây ít rủi ro đến mạng lưới hơn khi chỉ đại diện một số ít nodes Ethereum. Với sự phân bố gần như đồng đều của các nodes trên nhiều loại máy khách, khả năng hầu hết các máy khách gặp phải sự cố chung là nhỏ và kết quả là mạng sẽ mạnh mẽ hơn.

### Khả năng chống lại các cuộc tấn công {#resilience}

Sự đa dạng của máy khách cũng giúp chống lại các cuộc tấn công. Ví dụ: một cuộc tấn công [lừa một máy khách cụ thể](https://twitter.com/vdWijden/status/1437712249926393858) vào một nhánh cụ thể của chuỗi khó có thể thành công vì các máy khách khác khó có thể bị khai thác theo cùng một cách và chuỗi chính tắc vẫn không bị tổn hại. Sự đa dạng máy khách thấp làm tăng rủi ro liên quan đến các vụ hack trên máy khách chiếm ưu thế. Tính đa dạng của máy khách đã được chứng minh là một biện pháp phòng thủ quan trọng chống lại các cuộc tấn công độc hại trên mạng. Ví dụ, cuộc tấn công từ chối dịch vụ Thượng Hải năm 2016 có thể xảy ra vì những kẻ tấn công đã có thể lừa máy khách chiếm ưu thế (Geth) thực hiện một thao tác I/O đĩa chậm hàng chục nghìn lần mỗi khối. Vì các máy khách thay thế đang trực tuyến không gặp phải lỗ hổng tương tự, Ethereum đã có thể chống lại cuộc tấn công và tiếp tục hoạt động trong khi lỗ hổng tại Geth đã được khắc phục.

### Tính hoàn tất của bằng chứng cổ phần {#finality}

Một lỗi trong phần mềm Client đồng thuận mà hơn 33% nút xác thực của Ethereum có thể ngăn chặn lớp đồng thuận chốt kết quả, nghĩa là người dùng có thể không tin tưởng rằng các giao dịch sẽ không thể bị đảo ngược thay thay đổi vào một thời điểm nào đó. Điều này sẽ rất rắc rối với nhiều ứng dụng được xây dựng trên Ethereum, đặc biệt là DeFi.

<Emoji text="🚨" className="me-4" /> Tệ hơn nữa, một lỗi nghiêm trọng trong một máy khách chiếm đa số hai phần ba có thể khiến chuỗi <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">bị phân tách và hoàn tất không chính xác</a>, dẫn đến một nhóm lớn các trình xác thực bị kẹt trên một chuỗi không hợp lệ. Nếu họ muốn quay trở lại chuỗi hợp lệ, những người xác thực này sẽ phải đối mặt với slashing hoặc việc rút tiền tự nguyện và khởi động lại chậm chạp tốn kém. Mức độ của một lần slashing tăng lên theo số lượng nodes mắc lỗi với 2/3 đa số bị cắt giảm tối đa (32 ETH).

Mặc dù đây là những tình huống khó xảy ra, nhưng hệ sinh thái Ethereum có thể giảm thiểu rủi ro bằng cách cân bằng việc phân phối máy khách trên các nodes đang hoạt động. Lý tưởng nhất là không có máy khách đồng thuận nào đạt được 33% thị phần trong tổng số nodes.

### Trách nhiệm chung {#responsibility}

Chi phí con người cũng xảy ra khi sở hữu đa số máy khách. Nó đặt quá nhiều căng thẳng và trách nhiệm lên một đội ngũ phát triển nhỏ. Sự đa dạng của máy khách càng ít thì gánh nặng trách nhiệm đối với các nhà phát triển duy trì đa số máy khách càng lớn. Phân bổ trách nhiệm này cho nhiều nhóm sẽ tốt cho cả sức khỏe của mạng lưới các nodes của Ethereum và cả mạng lưới con người.

## Tính đa dạng của máy khách hiện tại {#current-client-diversity}

### Các máy khách thực thi {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Các máy khách đồng thuận {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Khác", value: 0.07 }
]}
/>

Sơ đồ này có thể đã lỗi thời — truy cập [ethernodes.org](https://ethernodes.org) và [clientdiversity.org](https://clientdiversity.org) để có thông tin mới nhất.

Hai biểu đồ hình tròn ở trên hiển thị ảnh chụp nhanh về tính đa dạng của máy khách hiện tại cho lớp thực thi và lớp đồng thuận (tại thời điểm viết vào tháng 10 năm 2025). Tính đa dạng của máy khách đã được cải thiện trong những năm qua, và lớp thực thi đã chứng kiến sự sụt giảm trong sự thống trị của [Geth](https://geth.ethereum.org/), theo sau là [Nethermind](https://www.nethermind.io/nethermind-client) ở vị trí thứ hai, [Besu](https://besu.hyperledger.org/) thứ ba và [Erigon](https://github.com/ledgerwatch/erigon) thứ tư, trong khi các máy khách khác chiếm dưới 3% mạng lưới. Máy khách được sử dụng phổ biến nhất trên lớp đồng thuận—[Lighthouse](https://lighthouse.sigmaprime.io/)—có thị phần khá gần với máy khách phổ biến thứ hai. [Prysm](https://prysmaticlabs.com/#projects) và [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) chiếm lần lượt khoảng 31% và 14%, và các máy khách khác hiếm khi được sử dụng.

Dữ liệu lớp thực thi được lấy từ [supermajority.info](https://supermajority.info/) vào ngày 26 tháng 10 năm 2025. Dữ liệu cho các máy khách đồng thuận được lấy từ [Michael Sproul](https://github.com/sigp/blockprint). Dữ liệu Client đồng thuận khó thu thập hơn, vì các Client đồng thuận không phải lúc nào cũng để lại dấu vết rõ ràng để dùng nhận diện chúng. Dữ liệu được tạo bằng một thuật toán phân loại mà đôi khi nhầm lẫn một số máy khách thiểu số (xem [tại đây](https://twitter.com/sproulM_/status/1440512518242197516) để biết thêm chi tiết). Trong sơ đồ trên, những phân loại không rõ ràng này được gán nhãn dạng hoặc/hoặc (ví dụ: Nimbus/Teku). Tuy nhiên, rõ ràng là phần lớn mạng đang vận hành Prysm. Mặc dù chỉ là snapshot, nhưng các giá trị từ sơ đồ cung cấp ý một cái nhìn chung về trạng thái đa dạng của máy khách hiện nay.

Dữ liệu mới nhất về tính đa dạng của máy khách cho lớp đồng thuận hiện có tại [clientdiversity.org](https://clientdiversity.org/).

## Lớp thực thi {#execution-layer}

Cho đến nay, cuộc trò chuyện xung quanh sự đa dạng máy khách chủ yếu tập trung vào lớp đồng thuận. Tuy nhiên, máy khách thực thi [Geth](https://geth.ethereum.org) hiện chiếm khoảng 85% tổng số nút. Tỷ lệ này có vấn đề vì những lý do tương tự như đối máy khách đồng thuận. Ví dụ: một lỗi trong Geth ảnh hưởng đến việc xử lý giao dịch hoặc xây dựng tải trọng thực thi có thể dẫn đến việc máy khách đồng thuận hoàn thiện các giao dịch có vấn đề hoặc bị lỗi. Do đó, Ethereum sẽ lành mạnh hơn với sự phân phối máy khách thực thi đồng đều, lý tưởng nhất là không có máy khách nào chiếm hơn 33% mạng.

## Sử dụng máy khách thiểu số {#use-minority-client}

Giải quyết vấn đề đa dạng Client không chỉ đòi hỏi người dùng cá nhận chọn Client ít phổ biến - mà còn cần nhóm nút xác thực hoặc tổ chức như dApp lớn cùng sàn giao dịch cũng đa dạng các Client. Tuy nhiên, tất cả người dùng có thể góp phần khắc phục sự mất cân bằng hiện tại và bình thường hóa việc sử dụng tất cả các phần mềm Ethereum có sẵn. Sau sự kiện hợp nhất, tất cả người vận hành node sẽ được yêu cầu chạy máy khách thực thi và máy khách đồng thuận. Chọn tổ hợp các máy khách được gợi ý bên dưới sẽ giúp gia tăng sự đa dạng máy khách.

### Các ứng dụng thực thi {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Các ứng dụng đồng thuận {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Người dùng am hiểu kĩ thuật có thể giúp đẩy nhanh quá trình này bằng cách viết các hướng dẫn và tài liệu dành cho các máy khách thiểu số và khuyến khích các đồng nghiệp vận hành nút của họ di chuyển khỏi các máy khách chiếm ưu thế. Hướng dẫn chuyển sang một máy khách đồng thuận thiểu số có sẵn trên [clientdiversity.org](https://clientdiversity.org/).

## Bảng điều khiển tính đa dạng của máy khách {#client-diversity-dashboards}

Một số bảng thông tin cung cấp số liệu thống kê về tính đa dạng của máy khách theo thời gian thực cho lớp thực thi và đồng thuận.

**Lớp đồng thuận:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Lớp thực thi:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Đọc thêm {#further-reading}

- [Tính đa dạng của máy khách trên lớp đồng thuận của Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Bản nâng cấp The Merge của Ethereum: Tự chịu rủi ro khi chạy máy khách đa số!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, ngày 24 tháng 3 năm 2022_
- [Tầm quan trọng của tính đa dạng của máy khách](https://our.status.im/the-importance-of-client-diversity/)
- [Danh sách các dịch vụ nút Ethereum](https://ethereumnodes.com/)
- ["Five Whys" về vấn đề đa dạng máy khách](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Tính đa dạng của Ethereum và cách giải quyết (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Các chủ đề liên quan {#related-topics}

- [Chạy một nút Ethereum](/run-a-node/)
- [Các nút và client](/developers/docs/nodes-and-clients/)
