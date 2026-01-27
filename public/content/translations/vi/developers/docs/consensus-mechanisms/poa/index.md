---
title: Bằng chứng uỷ quyền (PoA)
description: Giải thích về giao thức đồng thuận bằng chứng uỷ quyền và vai trò của nó trong hệ sinh thái chuỗi khối.
lang: vi
---

**Bằng chứng uỷ quyền (PoA)** là một thuật toán đồng thuận dựa trên danh tiếng, là một phiên bản sửa đổi của [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/). Nó chủ yếu được sử dụng bởi các chuỗi riêng tư, mạng thử nghiệm và các mạng phát triển cục bộ. PoA là một thuật toán đồng thuận dựa trên danh tiếng yêu cầu sự tin tưởng vào một nhóm người ký được uỷ quyền để tạo ra các khối, thay vì một cơ chế dựa trên cổ phần trong PoS.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước về [các giao dịch](/developers/docs/transactions/), [các khối](/developers/docs/blocks/) và [các cơ chế đồng thuận](/developers/docs/consensus-mechanisms/).

## Bằng chứng uỷ quyền (PoA) là gì? {#what-is-poa}

Bằng chứng uỷ quyền là một phiên bản sửa đổi của **[bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/) (PoS)**, là một thuật toán đồng thuận dựa trên danh tiếng thay vì cơ chế dựa trên cổ phần trong PoS. Thuật ngữ này được Gavin Wood giới thiệu lần đầu tiên vào năm 2017, và thuật toán đồng thuận này chủ yếu được sử dụng bởi các chuỗi riêng tư, mạng thử nghiệm và các mạng phát triển cục bộ, vì nó khắc phục được nhu cầu về tài nguyên chất lượng cao như PoW, và khắc phục các vấn đề về khả năng mở rộng với PoS bằng cách có một tập hợp con nhỏ các nút lưu trữ chuỗi khối và tạo ra các khối.

Bằng chứng uỷ quyền yêu cầu sự tin tưởng vào một nhóm người ký được uỷ quyền đã được thiết lập trong [khối nguyên thủy](/glossary/#genesis-block). Trong hầu hết các triển khai hiện tại, tất cả những người ký được uỷ quyền đều có quyền lực và đặc quyền như nhau khi xác định sự đồng thuận của chuỗi. Ý tưởng đằng sau việc đặt cược danh tiếng là mọi người xác thực được uỷ quyền đều được mọi người biết đến rộng rãi thông qua những thứ như nhận biết khách hàng của bạn (KYC), hoặc bằng cách có một tổ chức nổi tiếng là người xác thực duy nhất — bằng cách này, nếu một người xác thực làm bất cứ điều gì sai trái, danh tính của họ sẽ được biết đến.

Có nhiều cách triển khai PoA, nhưng cách triển khai tiêu chuẩn của Ethereum là **clique**, triển khai [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique thân thiện với nhà phát triển và là một tiêu chuẩn dễ triển khai, hỗ trợ tất cả các loại đồng bộ hóa máy khách. Các triển khai khác bao gồm [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) và [Aura](https://openethereum.github.io/Chain-specification).

## Cách thức hoạt động {#how-it-works}

Trong PoA, một nhóm người ký được uỷ quyền được chọn để tạo ra các khối mới. Những người ký được chọn dựa trên danh tiếng của họ, và họ là những người duy nhất được phép tạo ra các khối mới. Những người ký được chọn theo kiểu xoay vòng, và mỗi người ký được phép tạo một khối trong một khung thời gian cụ thể. Thời gian tạo khối là cố định, và những người ký được yêu cầu tạo một khối trong khung thời gian đó.

Danh tiếng trong bối cảnh này không phải là một thứ có thể định lượng được mà là danh tiếng của các tập đoàn nổi tiếng như Microsoft và Google, do đó cách chọn những người ký đáng tin cậy không phải là thuật toán mà là hành động _tin tưởng_ bình thường của con người, trong đó một thực thể, ví dụ như Microsoft, tạo ra một mạng PoA riêng tư giữa hàng trăm hoặc hàng nghìn công ty khởi nghiệp và tự đóng vai trò là người ký đáng tin cậy duy nhất với khả năng thêm những người ký nổi tiếng khác như Google trong tương lai, các công ty khởi nghiệp chắc chắn sẽ tin tưởng Microsoft sẽ luôn hành động một cách trung thực và sử dụng mạng. Điều này giải quyết nhu cầu đặt cược vào các mạng nhỏ/riêng tư khác nhau được xây dựng cho các mục đích khác nhau để giữ cho chúng phi tập trung và hoạt động, cùng với nhu cầu về thợ đào, vốn tiêu tốn rất nhiều năng lượng và tài nguyên. Một số mạng riêng tư sử dụng tiêu chuẩn PoA như VeChain, và một số sửa đổi nó như Binance sử dụng [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) là phiên bản tùy chỉnh sửa đổi của PoA và PoS.

Quy trình bỏ phiếu được thực hiện bởi chính những người ký. Mỗi người ký bỏ phiếu cho việc thêm hoặc xóa một người ký trong khối của họ khi họ tạo một khối mới. Các phiếu bầu được các nút kiểm đếm, và những người ký được thêm vào hoặc xóa đi dựa trên các phiếu bầu đạt đến một ngưỡng nhất định `SIGNER_LIMIT`.

Có thể có trường hợp xảy ra các phân nhánh nhỏ, độ khó của một khối phụ thuộc vào việc khối đó được ký theo lượt hay không theo lượt. Các khối “theo lượt” có độ khó 2 và các khối “không theo lượt” có độ khó 1. Trong trường hợp các phân nhánh nhỏ, chuỗi có hầu hết những người ký niêm phong các khối “theo lượt” sẽ tích lũy được độ khó cao nhất và chiến thắng.

## Các vectơ tấn công {#attack-vectors}

### Những người ký độc hại {#malicious-signers}

Một người dùng độc hại có thể được thêm vào danh sách những người ký, hoặc một khóa/máy ký có thể bị xâm phạm. Trong kịch bản như vậy, giao thức cần có khả năng tự bảo vệ mình trước các cuộc tái tổ chức và gửi thư rác. Giải pháp được đề xuất là với một danh sách gồm N người ký được uỷ quyền, bất kỳ người ký nào cũng chỉ có thể đúc 1 khối trong mỗi K khối. Điều này đảm bảo rằng thiệt hại bị hạn chế, và phần còn lại của những người xác thực có thể bỏ phiếu loại bỏ người dùng độc hại.

### Kiểm duyệt {#censorship-attack}

Một vectơ tấn công thú vị khác là nếu một người ký (hoặc một nhóm người ký) cố gắng kiểm duyệt các khối bỏ phiếu loại bỏ họ khỏi danh sách uỷ quyền. Để giải quyết vấn đề này, tần suất đúc được phép của người ký bị giới hạn ở mức 1 trên N/2. Điều này đảm bảo rằng những người ký độc hại cần kiểm soát ít nhất 51% tài khoản ký, tại thời điểm đó họ sẽ thực sự trở thành nguồn sự thật mới cho chuỗi.

### Thư rác {#spam-attack}

Một vectơ tấn công nhỏ khác là những người ký độc hại chèn các đề xuất bỏ phiếu mới vào bên trong mọi khối mà họ đúc. Vì các nút cần kiểm đếm tất cả các phiếu bầu để tạo danh sách thực tế những người ký được uỷ quyền, chúng phải ghi lại tất cả các phiếu bầu theo thời gian. Nếu không đặt giới hạn cho cửa sổ bỏ phiếu, danh sách này có thể tăng chậm nhưng không có giới hạn. Giải pháp là đặt một cửa sổ _di động_ gồm W khối, sau đó các phiếu bầu được coi là đã cũ. _Một cửa sổ hợp lý có thể là 1-2 kỷ nguyên._

### Các khối đồng thời {#concurrent-blocks}

Trong mạng PoA, khi có N người ký được uỷ quyền, mỗi người ký được phép đúc 1 khối trong số K khối, điều đó có nghĩa là N-K+1 người xác thực được phép đúc tại bất kỳ thời điểm nào. Để ngăn những người xác thực này chạy đua tạo khối, mỗi người ký nên thêm một "độ lệch" ngẫu nhiên nhỏ vào thời điểm phát hành một khối mới. Mặc dù quá trình này đảm bảo rằng các phân nhánh nhỏ là rất hiếm, các phân nhánh không thường xuyên vẫn có thể xảy ra, giống như mạng chính. Nếu một người ký bị phát hiện lạm dụng quyền lực và gây ra sự hỗn loạn, những người ký khác có thể bỏ phiếu loại bỏ họ.

Ví dụ: nếu có 10 người ký được uỷ quyền và mỗi người ký được phép tạo 1 khối trong số 20, thì tại bất kỳ thời điểm nào, 11 người xác thực có thể tạo khối. Để ngăn họ chạy đua tạo khối, mỗi người ký thêm một "độ lệch" ngẫu nhiên nhỏ vào thời điểm họ phát hành một khối mới. Điều này làm giảm sự xuất hiện của các phân nhánh nhỏ nhưng vẫn cho phép các phân nhánh không thường xuyên, như đã thấy trên Mạng chính Ethereum. Nếu một người ký lạm dụng quyền hạn của họ và gây ra gián đoạn, họ có thể bị bỏ phiếu loại khỏi mạng.

## Ưu và nhược điểm {#pros-and-cons}

| Ưu điểm                                                                                                                                             | Nhược điểm                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Có khả năng mở rộng hơn các cơ chế phổ biến khác như PoS và PoW, vì nó dựa trên một số lượng giới hạn những người ký khối.          | Các mạng PoA thường có một số lượng tương đối nhỏ các nút xác thực. Điều này làm cho mạng PoA trở nên tập trung hơn.                              |
| Chuỗi khối PoA có chi phí vận hành và bảo trì cực kỳ rẻ.                                                                            | Việc trở thành một người ký được uỷ quyền thường nằm ngoài tầm với của một người bình thường, vì chuỗi khối yêu cầu các thực thể có danh tiếng đã được xác lập.   |
| Các giao dịch được xác nhận rất nhanh vì có thể đạt dưới 1 giây vì chỉ cần một số lượng người ký giới hạn để xác thực các khối mới. | Những người ký độc hại có thể tái tổ chức, chi tiêu gấp đôi, kiểm duyệt các giao dịch trong mạng, những cuộc tấn công đó được giảm thiểu nhưng vẫn có thể xảy ra. |

## Đọc thêm {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Tiêu chuẩn Clique_
- [Nghiên cứu về Bằng chứng uỷ quyền](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Bằng chứng uỷ quyền là gì](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Giải thích về Bằng chứng uỷ quyền](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA trong chuỗi khối](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Giải thích về Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA không dùng nữa, đặc tả Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, một triển khai PoA khác](https://besu.hyperledger.org/private-networks/concepts/poa)

### Tìm hiểu thêm từ video trực quan? Người học qua hình ảnh {#visual-learner}

Xem giải thích trực quan về bằng chứng uỷ quyền:

<YouTube id="Mj10HSEM5_8" />

## Các chủ đề liên quan {#related-topics}

- [Bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/)
- [Bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/)

