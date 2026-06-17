---
title: Bằng chứng ủy quyền (PoA)
description: Giải thích về giao thức đồng thuận bằng chứng ủy quyền và vai trò của nó trong hệ sinh thái chuỗi khối.
lang: vi
---

**Bằng chứng ủy quyền (PoA)** là một thuật toán đồng thuận dựa trên danh tiếng, là một phiên bản sửa đổi của [Bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/). Nó chủ yếu được sử dụng bởi các chuỗi riêng tư, mạng thử nghiệm và mạng lưới phát triển cục bộ. PoA là một thuật toán đồng thuận dựa trên danh tiếng, yêu cầu sự tin tưởng vào một nhóm những người ký được ủy quyền để tạo ra các khối, thay vì cơ chế dựa trên việc đặt cọc trong PoS.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [giao dịch](/developers/docs/transactions/), [khối](/developers/docs/blocks/) và [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/).

## Bằng chứng ủy quyền (PoA) là gì? {#what-is-poa}

Bằng chứng ủy quyền là một phiên bản sửa đổi của **[Bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/) (PoS)**, là một thuật toán đồng thuận dựa trên danh tiếng thay vì cơ chế dựa trên việc đặt cọc trong PoS. Thuật ngữ này được Gavin Wood giới thiệu lần đầu tiên vào năm 2017, và thuật toán đồng thuận này chủ yếu được sử dụng bởi các chuỗi riêng tư, mạng thử nghiệm và mạng lưới phát triển cục bộ, vì nó khắc phục được nhu cầu về tài nguyên chất lượng cao như PoW, đồng thời khắc phục các vấn đề về khả năng mở rộng của PoS bằng cách có một nhóm nhỏ các nút lưu trữ chuỗi khối và tạo ra các khối.

Bằng chứng ủy quyền yêu cầu sự tin tưởng vào một nhóm những người ký được ủy quyền đã được thiết lập trong [khối nguyên thủy](/glossary/#genesis-block). Trong hầu hết các triển khai hiện tại, tất cả những người ký được ủy quyền đều giữ quyền lực và đặc quyền ngang nhau khi xác định sự đồng thuận của chuỗi. Ý tưởng đằng sau việc đặt cọc danh tiếng là mọi trình xác thực được ủy quyền đều được mọi người biết đến thông qua các quy trình như thấu hiểu khách hàng (KYC), hoặc bằng cách để một tổ chức nổi tiếng làm trình xác thực duy nhất—bằng cách này, nếu một trình xác thực làm bất cứ điều gì sai trái, danh tính của họ sẽ bị lộ.

Có nhiều triển khai của PoA, nhưng triển khai tiêu chuẩn của Ethereum là **clique**, triển khai [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique thân thiện với nhà phát triển và là một tiêu chuẩn dễ triển khai, hỗ trợ tất cả các loại đồng bộ hóa của máy khách. Các triển khai khác bao gồm [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) và [Aura](https://openethereum.github.io/Chain-specification).

## Cách thức hoạt động {#how-it-works}

Trong PoA, một nhóm những người ký được ủy quyền được chọn để tạo ra các khối mới. Những người ký được chọn dựa trên danh tiếng của họ và họ là những người duy nhất được phép tạo ra các khối mới. Những người ký được chọn theo kiểu vòng tròn (round-robin) và mỗi người ký được phép tạo một khối trong một khung thời gian cụ thể. Thời gian tạo khối là cố định và những người ký được yêu cầu tạo một khối trong khung thời gian đó.

Danh tiếng trong bối cảnh này không phải là một thứ có thể định lượng được mà đúng hơn là danh tiếng của các tập đoàn nổi tiếng như Microsoft và Google, do đó cách chọn những người ký đáng tin cậy không mang tính thuật toán mà là hành động _tin tưởng_ thông thường của con người, trong đó một thực thể, ví dụ như Microsoft, tạo ra một mạng lưới riêng tư PoA giữa hàng trăm hoặc hàng nghìn công ty khởi nghiệp và tự đóng vai trò là người ký đáng tin cậy duy nhất với khả năng bổ sung thêm những người ký nổi tiếng khác như Google trong tương lai, các công ty khởi nghiệp chắc chắn sẽ tin tưởng Microsoft luôn hành động một cách trung thực và sử dụng mạng lưới. Điều này giải quyết nhu cầu đặt cọc trong các mạng lưới nhỏ/riêng tư khác nhau được xây dựng cho các mục đích khác nhau để giữ cho chúng phi tập trung và hoạt động, cùng với nhu cầu về các thợ đào, vốn tiêu tốn rất nhiều năng lượng và tài nguyên. Một số mạng lưới riêng tư sử dụng tiêu chuẩn PoA nguyên bản như VeChain, và một số sửa đổi nó như Binance sử dụng [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), là một phiên bản sửa đổi tùy chỉnh của PoA và PoS.

Quá trình bỏ phiếu được thực hiện bởi chính những người ký. Mỗi người ký bỏ phiếu cho việc thêm hoặc xóa một người ký trong khối của họ khi họ tạo một khối mới. Các phiếu bầu được kiểm đếm bởi các nút và những người ký được thêm hoặc xóa dựa trên số phiếu bầu đạt đến một ngưỡng nhất định `SIGNER_LIMIT`.

Có thể xảy ra tình huống xuất hiện các đợt phân nhánh nhỏ, độ khó của một khối phụ thuộc vào việc khối đó được ký theo lượt hay không theo lượt. Các khối "theo lượt" có độ khó là 2 và các khối "không theo lượt" có độ khó là 1. Trong trường hợp có các đợt phân nhánh nhỏ, chuỗi có nhiều người ký niêm phong các khối "theo lượt" nhất sẽ tích lũy được nhiều độ khó nhất và giành chiến thắng.

## Các hướng tấn công {#attack-vectors}

### Những người ký độc hại {#malicious-signers}

Một người dùng độc hại có thể được thêm vào danh sách những người ký, hoặc một khóa/máy tính dùng cho việc ký có thể bị xâm phạm. Trong kịch bản như vậy, Giao thức cần có khả năng tự bảo vệ khỏi việc tổ chức lại chuỗi và thư rác. Giải pháp được đề xuất là với một danh sách gồm N người ký được ủy quyền, bất kỳ người ký nào cũng chỉ có thể đúc 1 khối trong mỗi K khối. Điều này đảm bảo rằng thiệt hại được hạn chế và phần còn lại của các trình xác thực có thể bỏ phiếu loại bỏ người dùng độc hại.

### Kiểm duyệt {#censorship-attack}

Một hướng tấn công thú vị khác là nếu một người ký (hoặc một nhóm người ký) cố gắng kiểm duyệt các khối bỏ phiếu về việc loại bỏ họ khỏi danh sách ủy quyền. Để giải quyết vấn đề này, tần suất đúc được phép của những người ký bị giới hạn ở mức 1 trong số N/2. Điều này đảm bảo rằng những người ký độc hại cần kiểm soát ít nhất 51% tài khoản ký, tại thời điểm đó họ sẽ thực sự trở thành nguồn sự thật mới cho chuỗi.

### Thư rác {#spam-attack}

Một hướng tấn công nhỏ khác là những người ký độc hại chèn các đề xuất bỏ phiếu mới vào bên trong mỗi khối mà họ đúc. Vì các nút cần kiểm đếm tất cả các phiếu bầu để tạo danh sách thực tế của những người ký được ủy quyền, chúng phải ghi lại tất cả các phiếu bầu theo thời gian. Nếu không đặt giới hạn cho khoảng thời gian bỏ phiếu, điều này có thể phát triển chậm nhưng không có giới hạn. Giải pháp là đặt một khoảng thời gian _di chuyển_ gồm W khối, sau đó các phiếu bầu được coi là cũ. _Một khoảng thời gian hợp lý có thể là 1-2 kỷ nguyên (epoch)._

### Các khối đồng thời {#concurrent-blocks}

Trong một mạng lưới PoA, khi có N người ký được ủy quyền, mỗi người ký được phép đúc 1 khối trong số K khối, điều đó có nghĩa là N-K+1 trình xác thực được phép đúc tại bất kỳ thời điểm nào. Để ngăn các trình xác thực này chạy đua giành các khối, mỗi người ký nên thêm một "độ trễ" ngẫu nhiên nhỏ vào thời gian họ phát hành một khối mới. Mặc dù quá trình này đảm bảo rằng các đợt phân nhánh nhỏ hiếm khi xảy ra, nhưng đôi khi các đợt phân nhánh vẫn có thể xảy ra, giống như trên Mạng chính. Nếu một người ký bị phát hiện lạm dụng quyền lực của mình và gây ra sự hỗn loạn, những người ký khác có thể bỏ phiếu loại bỏ họ.

Ví dụ, nếu có 10 người ký được ủy quyền và mỗi người ký được phép tạo 1 khối trong số 6 khối, thì tại bất kỳ thời điểm nào, 5 trình xác thực có thể tạo khối. Để ngăn họ chạy đua tạo khối, mỗi người ký thêm một "độ trễ" ngẫu nhiên nhỏ vào thời gian họ phát hành một khối mới. Điều này làm giảm sự xuất hiện của các đợt phân nhánh nhỏ nhưng vẫn cho phép các đợt phân nhánh thỉnh thoảng xảy ra, như đã thấy trên Mạng chính Ethereum. Nếu một người ký lạm dụng quyền hạn của họ và gây ra sự gián đoạn, họ có thể bị bỏ phiếu loại khỏi mạng lưới.

## Ưu và nhược điểm {#pros-and-cons}

| Ưu điểm                                                                                                                                                      | Nhược điểm                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Có khả năng mở rộng hơn các cơ chế phổ biến khác như PoS và PoW, vì nó dựa trên một số lượng hạn chế những người ký khối                                          | Các mạng lưới PoA thường có số lượng nút xác thực tương đối nhỏ. Điều này làm cho mạng lưới PoA trở nên tập trung hơn.                                 |
| Các Chuỗi khối PoA cực kỳ rẻ để vận hành và bảo trì                                                                                                  | Việc trở thành một người ký được ủy quyền thường nằm ngoài tầm với của một người bình thường, bởi vì Chuỗi khối yêu cầu các thực thể có danh tiếng đã được thiết lập. |
| Các giao dịch được xác nhận rất nhanh vì nó có thể đạt dưới 1 giây do chỉ cần một số lượng hạn chế những người ký để xác thực các khối mới | Những người ký độc hại có thể tổ chức lại chuỗi, chi tiêu kép, kiểm duyệt các giao dịch trong mạng lưới, những cuộc tấn công này đã được giảm thiểu nhưng vẫn có thể xảy ra                       |

## Đọc thêm {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Tiêu chuẩn Clique_
- [Nghiên cứu về Bằng chứng ủy quyền](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Bằng chứng ủy quyền là gì](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Giải thích về Bằng chứng ủy quyền](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA trong chuỗi khối](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Giải thích về Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [Đặc tả Aura, PoA đã ngừng sử dụng](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, một triển khai PoA khác](https://besu.hyperledger.org/private-networks/concepts/poa)

### Bạn thích học qua hình ảnh hơn? {#visual-learner}

Xem giải thích trực quan về bằng chứng ủy quyền:

<VideoWatch slug="proof-of-authority-explained" />

## Chủ đề liên quan {#related-topics}

- [Bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/)
- [Bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/)