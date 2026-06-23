---
title: "Gas và phí"
metaTitle: "Gas và phí trên Ethereum: tổng quan kỹ thuật"
description: "Tìm hiểu về phí gas trên Ethereum, cách tính phí và vai trò của chúng trong bảo mật mạng lưới và xử lý giao dịch."
lang: vi
---

Gas là yếu tố thiết yếu đối với mạng lưới [Ethereum](/). Nó là nhiên liệu cho phép mạng lưới hoạt động, giống như cách một chiếc ô tô cần xăng để chạy.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [giao dịch](/developers/docs/transactions/) và [EVM](/developers/docs/evm/).

## Gas là gì? {#what-is-gas}

Gas là đơn vị đo lường lượng nỗ lực tính toán cần thiết để thực thi các hoạt động cụ thể trên mạng lưới Ethereum.

Vì mỗi giao dịch Ethereum yêu cầu tài nguyên tính toán để thực thi, những tài nguyên đó phải được trả phí để đảm bảo Ethereum không dễ bị spam và không bị mắc kẹt trong các vòng lặp tính toán vô hạn. Việc thanh toán cho tính toán được thực hiện dưới dạng phí gas.

Phí gas là **lượng gas được sử dụng để thực hiện một số hoạt động, nhân với chi phí cho mỗi đơn vị gas**. Phí này được thanh toán bất kể giao dịch thành công hay thất bại.

![A diagram showing where gas is needed in EVM operations](./gas.png)
_Sơ đồ được phỏng theo [Minh họa EVM của Ethereum](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Phí gas phải được thanh toán bằng tiền tệ gốc của Ethereum, ether (ETH). Giá gas thường được báo giá bằng Gwei, là một mệnh giá của ETH. Mỗi Gwei bằng một phần tỷ của một ETH (0.000000001 ETH hoặc 10<sup>-9</sup> ETH).

Ví dụ, thay vì nói rằng gas của bạn có giá 0.000000001 ether, bạn có thể nói gas của bạn có giá 1 Gwei.

Từ 'Gwei' là viết tắt của 'giga-wei', có nghĩa là 'tỷ Wei'. Một Gwei bằng một tỷ Wei. Bản thân Wei (được đặt theo tên của [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), người tạo ra [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) là đơn vị nhỏ nhất của ETH.

## Phí gas được tính như thế nào? {#how-are-gas-fees-calculated}

Bạn có thể thiết lập lượng gas mà bạn sẵn sàng trả khi gửi một giao dịch. Bằng cách đưa ra một lượng gas nhất định, bạn đang đấu giá để giao dịch của mình được đưa vào khối tiếp theo. Nếu bạn đưa ra quá ít, các trình xác thực sẽ ít có khả năng chọn giao dịch của bạn để đưa vào, nghĩa là giao dịch của bạn có thể được thực thi muộn hoặc không bao giờ được thực thi. Nếu bạn đưa ra quá nhiều, bạn có thể lãng phí một số ETH. Vậy, làm thế nào bạn có thể biết nên trả bao nhiêu?

Tổng số gas bạn trả được chia thành hai thành phần: `base fee` (phí cơ sở) và `priority fee` (phí ưu tiên).

`base fee` được thiết lập bởi giao thức—bạn phải trả ít nhất số tiền này để giao dịch của bạn được coi là hợp lệ. `priority fee` là một khoản phí ưu tiên mà bạn thêm vào phí cơ sở để làm cho giao dịch của bạn hấp dẫn đối với các trình xác thực để họ chọn nó đưa vào khối tiếp theo.

Một giao dịch chỉ trả `base fee` về mặt kỹ thuật là hợp lệ nhưng khó có khả năng được đưa vào vì nó không mang lại động lực nào cho các trình xác thực để chọn nó thay vì bất kỳ giao dịch nào khác. Khoản phí `priority` 'chính xác' được xác định bởi mức độ sử dụng mạng lưới tại thời điểm bạn gửi giao dịch—nếu có nhiều nhu cầu thì bạn có thể phải đặt phí `priority` của mình cao hơn, nhưng khi có ít nhu cầu hơn, bạn có thể trả ít hơn.

Ví dụ, giả sử Jordan phải trả cho Taylor 1 ETH. Việc chuyển ETH yêu cầu 21.000 đơn vị gas và phí cơ sở là 10 Gwei. Jordan bao gồm một khoản phí ưu tiên là 2 Gwei.

Tổng phí bây giờ sẽ bằng:

`units of gas used * (base fee + priority fee)`

trong đó `base fee` là một giá trị được thiết lập bởi giao thức và `priority fee` là một giá trị được thiết lập bởi người dùng như một khoản phí ưu tiên cho trình xác thực.

ví dụ: `21,000 * (10 + 2) = 252,000 gwei` (0.000252 ETH).

Khi Jordan gửi tiền, 1.000252 ETH sẽ bị trừ khỏi tài khoản của Jordan. Taylor sẽ được cộng 1.0000 ETH. Trình xác thực nhận được khoản phí ưu tiên là 0.000042 ETH. `base fee` là 0.00021 ETH sẽ bị đốt.

### Phí cơ sở {#base-fee}

Mỗi khối có một phí cơ sở hoạt động như một mức giá khởi điểm. Để đủ điều kiện được đưa vào một khối, giá được đưa ra cho mỗi gas ít nhất phải bằng phí cơ sở. Phí cơ sở được tính toán độc lập với khối hiện tại và thay vào đó được xác định bởi các khối trước nó, làm cho phí giao dịch trở nên dễ dự đoán hơn đối với người dùng. Khi khối được tạo, **phí cơ sở này bị "đốt"**, loại bỏ nó khỏi lưu thông.

Phí cơ sở được tính bằng một công thức so sánh kích thước của khối trước đó (lượng gas được sử dụng cho tất cả các giao dịch) với kích thước mục tiêu (một nửa giới hạn gas). Phí cơ sở sẽ tăng hoặc giảm tối đa 12,5% mỗi khối nếu kích thước khối mục tiêu cao hơn hoặc thấp hơn mục tiêu tương ứng. Sự tăng trưởng theo cấp số nhân này làm cho việc duy trì kích thước khối ở mức cao vô thời hạn trở nên không khả thi về mặt kinh tế.

| Số khối | Gas được đưa vào | Mức tăng phí | Phí cơ sở hiện tại |
| ------------ | -----------: | -----------: | ---------------: |
| 1            |          18M |           0% |         100 Gwei |
| 2            |          36M |           0% |         100 Gwei |
| 3            |          36M |        12.5% |       112.5 Gwei |
| 4            |          36M |        12.5% |       126.6 Gwei |
| 5            |          36M |        12.5% |       142.4 Gwei |
| 6            |          36M |        12.5% |       160.2 Gwei |
| 7            |          36M |        12.5% |       180.2 Gwei |
| 8            |          36M |        12.5% |       202.7 Gwei |

Trong bảng trên, một ví dụ được minh họa sử dụng 36 triệu làm giới hạn gas. Theo ví dụ này, để tạo một giao dịch trên khối số 9, một ví sẽ cho người dùng biết chắc chắn rằng **phí cơ sở tối đa** được thêm vào khối tiếp theo là `current base fee * 112.5%` hoặc `202.7 gwei * 112.5% = 228.1 gwei`.

Cũng cần lưu ý rằng chúng ta khó có thể thấy các đợt tăng đột biến kéo dài của các khối đầy do tốc độ tăng phí cơ sở trước một khối đầy.

| Số khối | Gas được đưa vào | Mức tăng phí | Phí cơ sở hiện tại |
| ------------ | -----------: | -----------: | ---------------: |
| 30           |          36M |        12.5% |      2705.6 Gwei |
| ...          |          ... |        12.5% |              ... |
| 50           |          36M |        12.5% |     28531.3 Gwei |
| ...          |          ... |        12.5% |              ... |
| 100          |          36M |        12.5% |  10302608.6 Gwei |

### Phí ưu tiên {#priority-fee}

Phí ưu tiên khuyến khích các trình xác thực tối đa hóa số lượng giao dịch trong một khối, chỉ bị giới hạn bởi giới hạn gas của khối. Nếu không có phí ưu tiên, một trình xác thực hợp lý có thể đưa vào ít giao dịch hơn—hoặc thậm chí không có giao dịch nào—mà không phải chịu bất kỳ hình phạt trực tiếp nào từ lớp thực thi hoặc lớp đồng thuận, vì phần thưởng đặt cọc độc lập với số lượng giao dịch trong một khối. Ngoài ra, phí ưu tiên cho phép người dùng trả giá cao hơn những người khác để được ưu tiên trong cùng một khối, báo hiệu mức độ khẩn cấp một cách hiệu quả. 

### Phí tối đa {#maxfee}

Để thực thi một giao dịch trên mạng lưới, người dùng có thể chỉ định giới hạn tối đa mà họ sẵn sàng trả để giao dịch của họ được thực thi. Tham số tùy chọn này được gọi là `maxFeePerGas`. Để một giao dịch được thực thi, phí tối đa phải vượt quá tổng của phí cơ sở và phí ưu tiên. Người gửi giao dịch được hoàn lại khoản chênh lệch giữa phí tối đa và tổng của phí cơ sở và phí ưu tiên.

### Kích thước khối {#block-size}

Mỗi khối có kích thước mục tiêu bằng một nửa giới hạn gas hiện tại, nhưng kích thước của các khối sẽ tăng hoặc giảm theo nhu cầu của mạng lưới, cho đến khi đạt đến giới hạn khối (gấp 2 lần kích thước khối mục tiêu). Giao thức đạt được kích thước khối trung bình cân bằng ở mức mục tiêu thông qua quá trình _tâtonnement_. Điều này có nghĩa là nếu kích thước khối lớn hơn kích thước khối mục tiêu, giao thức sẽ tăng phí cơ sở cho khối tiếp theo. Tương tự, giao thức sẽ giảm phí cơ sở nếu kích thước khối nhỏ hơn kích thước khối mục tiêu.

Mức độ điều chỉnh phí cơ sở tỷ lệ thuận với khoảng cách giữa kích thước khối hiện tại và mục tiêu. Đây là một phép tính tuyến tính từ -12,5% đối với một khối trống, 0% ở kích thước mục tiêu, lên đến +12,5% đối với một khối đạt đến giới hạn gas. Giới hạn gas có thể dao động theo thời gian dựa trên tín hiệu của trình xác thực, cũng như thông qua các bản nâng cấp mạng lưới. Bạn có thể [xem những thay đổi về giới hạn gas theo thời gian tại đây](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Tìm hiểu thêm về khối](/developers/docs/blocks/)

### Tính toán phí gas trong thực tế {#calculating-fees-in-practice}

Bạn có thể nêu rõ số tiền bạn sẵn sàng trả để giao dịch của mình được thực thi. Tuy nhiên, hầu hết các nhà cung cấp ví sẽ tự động thiết lập một khoản phí giao dịch được đề xuất (phí cơ sở + phí ưu tiên được đề xuất) để giảm bớt sự phức tạp đè nặng lên người dùng của họ.

## Tại sao phí gas lại tồn tại? {#why-do-gas-fees-exist}

Tóm lại, phí gas giúp giữ cho mạng lưới Ethereum an toàn. Bằng cách yêu cầu một khoản phí cho mỗi tính toán được thực thi trên mạng lưới, chúng tôi ngăn chặn những kẻ xấu spam mạng lưới. Để tránh các vòng lặp vô hạn do vô tình hoặc cố ý hoặc các sự lãng phí tính toán khác trong mã, mỗi giao dịch được yêu cầu thiết lập một giới hạn về số lượng bước tính toán của việc thực thi mã mà nó có thể sử dụng. Đơn vị tính toán cơ bản là "Gas".

Mặc dù một giao dịch bao gồm một giới hạn, bất kỳ lượng gas nào không được sử dụng trong một giao dịch đều được trả lại cho người dùng (ví dụ: `max fee - (base fee + tip)` được trả lại).

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Sơ đồ được phỏng theo [Minh họa EVM của Ethereum](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Giới hạn gas là gì? {#what-is-gas-limit}

Giới hạn gas đề cập đến lượng gas tối đa mà bạn sẵn sàng tiêu thụ cho một giao dịch. Các giao dịch phức tạp hơn liên quan đến [hợp đồng thông minh](/developers/docs/smart-contracts/) yêu cầu nhiều công việc tính toán hơn, vì vậy chúng yêu cầu giới hạn gas cao hơn so với một khoản thanh toán đơn giản. Việc chuyển ETH tiêu chuẩn yêu cầu giới hạn gas là 21.000 đơn vị gas.

Ví dụ, nếu bạn đặt giới hạn gas là 50.000 cho một giao dịch chuyển ETH đơn giản, EVM sẽ tiêu thụ 21.000 và bạn sẽ nhận lại 29.000 còn lại. Tuy nhiên, nếu bạn chỉ định quá ít gas, ví dụ: giới hạn gas là 20.000 cho một giao dịch chuyển ETH đơn giản, giao dịch sẽ thất bại trong giai đoạn xác thực. Nó sẽ bị từ chối trước khi được đưa vào một khối và không có gas nào bị tiêu thụ. Mặt khác, nếu một giao dịch hết gas trong quá trình thực thi (ví dụ: một hợp đồng thông minh sử dụng hết tất cả gas giữa chừng), EVM sẽ hoàn nguyên mọi thay đổi, nhưng tất cả lượng gas được cung cấp vẫn sẽ bị tiêu thụ cho công việc đã thực hiện.

## Tại sao phí gas có thể trở nên quá cao? {#why-can-gas-fees-get-so-high}

Phí gas cao là do sự phổ biến của Ethereum. Nếu có quá nhiều nhu cầu, người dùng phải đưa ra số tiền phí ưu tiên cao hơn để cố gắng trả giá cao hơn các giao dịch của người dùng khác. Phí ưu tiên cao hơn có thể làm cho giao dịch của bạn có nhiều khả năng được đưa vào khối tiếp theo hơn. Ngoài ra, các ứng dụng hợp đồng thông minh phức tạp hơn có thể đang thực hiện nhiều hoạt động để hỗ trợ các chức năng của chúng, khiến chúng tiêu thụ nhiều gas.

## Các sáng kiến để giảm chi phí gas {#initiatives-to-reduce-gas-costs}

Các [bản nâng cấp khả năng mở rộng](/roadmap/) của Ethereum cuối cùng sẽ giải quyết một số vấn đề về phí gas, từ đó sẽ cho phép nền tảng xử lý hàng nghìn giao dịch mỗi giây và mở rộng quy mô trên toàn cầu.

Mở rộng quy mô lớp 2 (l2) là một sáng kiến chính để cải thiện đáng kể chi phí gas, trải nghiệm người dùng và khả năng mở rộng.

[Tìm hiểu thêm về mở rộng quy mô lớp 2 (l2)](/developers/docs/scaling/#layer-2-scaling)

## Theo dõi phí gas {#monitoring-gas-fees}

Nếu bạn muốn theo dõi giá gas để có thể gửi ETH của mình với chi phí thấp hơn, bạn có thể sử dụng nhiều công cụ khác nhau như:

- [Etherscan](https://etherscan.io/gastracker) _Công cụ ước tính giá gas giao dịch_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Công cụ ước tính giá gas giao dịch mã nguồn mở_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Theo dõi giá gas Ethereum và L2 để giảm phí giao dịch và tiết kiệm tiền_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Tiện ích mở rộng Chrome ước tính gas hỗ trợ cả giao dịch cũ Loại 0 và giao dịch Loại 2 EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Tính toán phí gas bằng nội tệ của bạn cho các loại giao dịch khác nhau trên Mạng chính, Arbitrum và Polygon._

## Các công cụ liên quan {#related-tools}

- [Nền tảng Gas của Blocknative](https://www.blocknative.com/gas) _API ước tính gas được cung cấp bởi nền tảng dữ liệu mempool toàn cầu của Blocknative_
- [Gas Network](https://gas.network) Oracle Gas trên chuỗi. Hỗ trợ hơn 35 chuỗi. 

## Đọc thêm {#further-reading}

- [Giải thích về Gas trên Ethereum](https://defiprime.com/gas)
- [Giảm mức tiêu thụ gas cho Hợp đồng thông minh của bạn](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Các chiến lược tối ưu hóa gas cho nhà phát triển](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Tài liệu EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Tài nguyên EIP-1559 của Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Tách biệt cơ chế khỏi meme](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)