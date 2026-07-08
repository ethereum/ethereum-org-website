---
title: "Sự đa dạng máy khách"
description: "Giải thích tổng quan về tầm quan trọng của sự đa dạng máy khách Ethereum."
lang: vi
sidebarDepth: 2
---

Hành vi của một nút [Ethereum](/) được kiểm soát bởi phần mềm máy khách mà nó chạy. Có một số máy khách Ethereum cấp độ sản xuất, mỗi máy khách được phát triển và duy trì bằng các ngôn ngữ khác nhau bởi các nhóm riêng biệt. Các máy khách được xây dựng theo một thông số kỹ thuật chung để đảm bảo chúng giao tiếp liền mạch với nhau, có cùng chức năng và cung cấp trải nghiệm người dùng tương đương. Tuy nhiên, hiện tại sự phân bổ của các máy khách trên các nút chưa đủ đồng đều để nhận ra tiềm năng củng cố mạng lưới này một cách tối đa. Lý tưởng nhất là người dùng phân chia tương đối đồng đều trên các máy khách khác nhau để mang lại sự đa dạng máy khách lớn nhất có thể cho mạng lưới.

## Điều kiện tiên quyết {#prerequisites}

Nếu bạn chưa hiểu nút và máy khách là gì, hãy xem [nút và máy khách](/developers/docs/nodes-and-clients/). Lớp [thực thi](/glossary/#execution-layer) và lớp [đồng thuận](/glossary/#consensus-layer) được định nghĩa trong thuật ngữ.

## Tại sao lại có nhiều máy khách? {#why-multiple-clients}

Nhiều máy khách được phát triển và duy trì độc lập tồn tại vì sự đa dạng máy khách làm cho mạng lưới có khả năng chống chịu tốt hơn trước các cuộc tấn công và lỗi. Nhiều máy khách là một thế mạnh độc nhất của Ethereum - các blockchain khác dựa vào sự không thể sai lầm của một máy khách duy nhất. Tuy nhiên, chỉ có sẵn nhiều máy khách là chưa đủ, chúng phải được cộng đồng áp dụng và tổng số nút hoạt động phải được phân bổ tương đối đồng đều giữa chúng.

## Tại sao sự đa dạng máy khách lại quan trọng? {#client-diversity-importance}

Việc có nhiều máy khách được phát triển và duy trì độc lập là rất quan trọng đối với sức khỏe của một mạng lưới phi tập trung. Hãy cùng khám phá những lý do tại sao.

### Lỗi {#bugs}

Một lỗi trong một máy khách riêng lẻ sẽ ít gây rủi ro hơn cho mạng lưới khi nó đại diện cho một thiểu số các nút Ethereum. Với sự phân bổ tương đối đồng đều của các nút trên nhiều máy khách, khả năng hầu hết các máy khách gặp phải một vấn đề chung là rất nhỏ, và kết quả là mạng lưới trở nên mạnh mẽ hơn.

### Khả năng chống chịu các cuộc tấn công {#resilience}

Sự đa dạng máy khách cũng mang lại khả năng chống chịu các cuộc tấn công. Ví dụ, một cuộc tấn công [đánh lừa một máy khách cụ thể](https://twitter.com/vdWijden/status/1437712249926393858) vào một nhánh cụ thể của chuỗi khó có khả năng thành công vì các máy khách khác khó có thể bị khai thác theo cùng một cách và chuỗi chính tắc vẫn không bị hỏng. Sự đa dạng máy khách thấp làm tăng rủi ro liên quan đến một vụ hack trên máy khách thống trị. Sự đa dạng máy khách đã được chứng minh là một hàng phòng thủ quan trọng chống lại các cuộc tấn công độc hại trên mạng lưới, ví dụ như cuộc tấn công từ chối dịch vụ Thượng Hải vào năm 2016 có thể xảy ra vì những kẻ tấn công đã có thể lừa máy khách thống trị (Geth) thực hiện một thao tác i/o đĩa chậm hàng chục nghìn lần mỗi khối. Bởi vì các máy khách thay thế không có chung lỗ hổng cũng đang trực tuyến, Ethereum đã có thể chống lại cuộc tấn công và tiếp tục hoạt động trong khi lỗ hổng trong Geth được khắc phục.

### Tính chung cuộc của Bằng chứng cổ phần (PoS) {#finality}

Một lỗi trong một ứng dụng khách đồng thuận chiếm hơn 33% số nút Ethereum có thể ngăn lớp đồng thuận đạt được tính chung cuộc, nghĩa là người dùng không thể tin tưởng rằng các giao dịch sẽ không bị hoàn tác hoặc thay đổi vào một thời điểm nào đó. Điều này sẽ rất rắc rối đối với nhiều ứng dụng được xây dựng trên Ethereum, đặc biệt là tài chính phi tập trung (DeFi).

<Emoji text="🚨" className="me-4" /> Tệ hơn nữa, một lỗi nghiêm trọng trong một máy khách chiếm đa số hai phần ba có thể khiến chuỗi <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">bị chia tách và đạt tính chung cuộc một cách không chính xác</a>, dẫn đến một tập hợp lớn các trình xác thực bị mắc kẹt trên một chuỗi không hợp lệ. Nếu muốn tham gia lại chuỗi chính xác, các trình xác thực này phải đối mặt với việc bị phạt cắt giảm hoặc một quá trình rút tiền tự nguyện và kích hoạt lại chậm chạp và tốn kém. Mức độ của một khoản phạt cắt giảm tỷ lệ thuận với số lượng các nút có lỗi, với đa số hai phần ba bị phạt cắt giảm tối đa (32 ETH).

Mặc dù đây là những kịch bản khó xảy ra, hệ sinh thái Ethereum có thể giảm thiểu rủi ro của chúng bằng cách san bằng sự phân bổ của các máy khách trên các nút hoạt động. Lý tưởng nhất là không có ứng dụng khách đồng thuận nào đạt tới 33% thị phần của tổng số nút.

### Trách nhiệm chung {#responsibility}

Cũng có một cái giá phải trả về mặt con người khi có các máy khách chiếm đa số. Nó đặt áp lực và trách nhiệm quá mức lên một nhóm phát triển nhỏ. Sự đa dạng máy khách càng ít, gánh nặng trách nhiệm đối với các nhà phát triển duy trì máy khách chiếm đa số càng lớn. Việc phân bổ trách nhiệm này cho nhiều nhóm là tốt cho cả sức khỏe của mạng lưới các nút của Ethereum và mạng lưới con người của nó.

## Sự đa dạng máy khách hiện tại {#current-client-diversity}

### Máy khách thực thi {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Ứng dụng khách đồng thuận {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Other", value: 0.07 }
]}
/>

Biểu đồ này có thể đã lỗi thời — hãy truy cập [ethernodes.org](https://ethernodes.org) và [clientdiversity.org](https://clientdiversity.org) để biết thông tin cập nhật.

Hai biểu đồ tròn ở trên hiển thị ảnh chụp nhanh về sự đa dạng máy khách hiện tại cho lớp thực thi và lớp đồng thuận (tại thời điểm viết bài vào tháng 10 năm 2025). Sự đa dạng máy khách đã được cải thiện qua nhiều năm và lớp thực thi đã chứng kiến sự sụt giảm trong sự thống trị của [Geth](https://geth.ethereum.org/), với [Nethermind](https://www.nethermind.io/nethermind-client) bám sát ở vị trí thứ hai, [Besu](https://besu.hyperledger.org/) thứ ba và [Erigon](https://github.com/ledgerwatch/erigon) thứ tư, với các máy khách khác chiếm chưa đến 3% mạng lưới. Máy khách được sử dụng phổ biến nhất trên lớp đồng thuận—[Lighthouse](https://lighthouse.sigmaprime.io/)—khá sát với máy khách được sử dụng nhiều thứ hai. [Prysm](https://prysmaticlabs.com/#projects) và [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) lần lượt chiếm ~31% và ~14%, và các máy khách khác hiếm khi được sử dụng.

Dữ liệu lớp thực thi được lấy từ [supermajority.info](https://supermajority.info/) vào ngày 26 tháng 10 năm 2025. Dữ liệu cho các ứng dụng khách đồng thuận được lấy từ [Michael Sproul](https://github.com/sigp/blockprint). Dữ liệu ứng dụng khách đồng thuận khó thu thập hơn vì các máy khách lớp đồng thuận không phải lúc nào cũng có các dấu vết rõ ràng có thể được sử dụng để xác định chúng. Dữ liệu được tạo ra bằng cách sử dụng một thuật toán phân loại đôi khi nhầm lẫn một số máy khách thiểu số (xem thêm chi tiết [tại đây](https://twitter.com/sproulM_/status/1440512518242197516)). Trong biểu đồ trên, các phân loại mơ hồ này được xử lý bằng nhãn hoặc/hoặc (ví dụ: Nimbus/Teku). Tuy nhiên, rõ ràng là phần lớn mạng lưới đang chạy Prysm. Mặc dù chỉ là những ảnh chụp nhanh, các giá trị trong biểu đồ cung cấp một cái nhìn tổng quan tốt về trạng thái hiện tại của sự đa dạng máy khách.

Dữ liệu cập nhật về sự đa dạng máy khách cho lớp đồng thuận hiện có sẵn tại [clientdiversity.org](https://clientdiversity.org/).

## Lớp thực thi {#execution-layer}

Cho đến nay, cuộc trò chuyện xung quanh sự đa dạng máy khách chủ yếu tập trung vào lớp đồng thuận. Tuy nhiên, máy khách thực thi [Geth](https://geth.ethereum.org) hiện chiếm khoảng 85% tổng số nút. Tỷ lệ phần trăm này có vấn đề vì những lý do tương tự như đối với các ứng dụng khách đồng thuận. Ví dụ, một lỗi trong Geth ảnh hưởng đến việc xử lý giao dịch hoặc xây dựng các tải trọng thực thi có thể dẫn đến việc các ứng dụng khách đồng thuận đạt tính chung cuộc cho các giao dịch có vấn đề hoặc bị lỗi. Do đó, Ethereum sẽ khỏe mạnh hơn với sự phân bổ đồng đều hơn của các máy khách thực thi, lý tưởng nhất là không có máy khách nào chiếm hơn 33% mạng lưới.

## Sử dụng một máy khách thiểu số {#use-minority-client}

Việc giải quyết sự đa dạng máy khách đòi hỏi nhiều hơn là việc người dùng cá nhân chọn các máy khách thiểu số - nó cũng đòi hỏi các nhóm trình xác thực và các tổ chức như các ứng dụng phi tập trung (dapp) lớn và các sàn giao dịch phải chuyển đổi máy khách. Tuy nhiên, tất cả người dùng đều có thể đóng góp phần của mình trong việc khắc phục sự mất cân bằng hiện tại và bình thường hóa việc sử dụng tất cả các phần mềm Ethereum có sẵn. Sau The Merge, tất cả các nhà điều hành nút sẽ được yêu cầu chạy một máy khách thực thi và một ứng dụng khách đồng thuận. Việc chọn các kết hợp của các máy khách được đề xuất dưới đây sẽ giúp tăng cường sự đa dạng máy khách.

### Máy khách thực thi {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Ứng dụng khách đồng thuận {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Người dùng kỹ thuật có thể giúp đẩy nhanh quá trình này bằng cách viết thêm các hướng dẫn và tài liệu cho các máy khách thiểu số và khuyến khích các đồng nghiệp điều hành nút của họ chuyển khỏi các máy khách thống trị. Các hướng dẫn để chuyển sang một ứng dụng khách đồng thuận thiểu số có sẵn trên [clientdiversity.org](https://clientdiversity.org/).

## Bảng điều khiển sự đa dạng máy khách {#client-diversity-dashboards}

Một số bảng điều khiển cung cấp số liệu thống kê về sự đa dạng máy khách theo thời gian thực cho lớp thực thi và lớp đồng thuận.

**Lớp đồng thuận:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Lớp thực thi:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Đọc thêm {#further-reading}

- [Sự đa dạng máy khách trên lớp đồng thuận của Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [Ethereum Merge: Chạy máy khách chiếm đa số và tự chịu rủi ro!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, ngày 24 tháng 3 năm 2022_
- [Tầm quan trọng của sự đa dạng máy khách](https://our.status.im/the-importance-of-client-diversity/)
- [Danh sách các dịch vụ nút Ethereum](https://ethereumnodes.com/)
- ["Năm câu hỏi tại sao" của vấn đề đa dạng máy khách](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [Sự đa dạng của Ethereum và cách giải quyết (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Chủ đề liên quan {#related-topics}

- [Chạy một nút Ethereum](/run-a-node/)
- [Nút và máy khách](/developers/docs/nodes-and-clients/)
