---
title: "Gas và phí"
metaTitle: "Gas và phí Ethereum: tổng quan kỹ thuật"
description: "Tìm hiểu về phí gas của Ethereum, cách chúng được tính toán và vai trò của chúng trong bảo mật mạng lưới cũng như xử lý giao dịch."
lang: vi
---

Gas rất quan trong cho mạng lưới Ethereum. Nó là nhiên liệu để cho mạng lưới hoạt động, nó tương tự như một chiếc xe hơi cần xăng để chạy.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước về [các giao dịch](/developers/docs/transactions/) và [EVM](/developers/docs/evm/).

## Gas là gì? {#what-is-gas}

Gas đề cập đến đơn vị mà nó đo lường số lượng hiệu quả tính toán cần thiết để thực hiện các hoạt động cụ thể trên mạng lưới Ethereum.

Vì mỗi giao dịch Ethereum cần tài nguyên tính toán để thực hiện, cần thanh toán cho những tài nguyên đó để bảo đảm Ethereum không bị ảnh hưởng bởi spam và không bị kẹt trong các vòng lặp tính toán. Tài nguyên tính toán được trả với dạng phí gas.

Phí gas là **lượng gas được dùng để thực hiện một tác vụ nào đó, nhân với giá của mỗi đơn vị gas**. Phí được thanh toán dù giao dịch thành công hay thất bại.

![Sơ đồ cho thấy vị trí cần gas trong các hoạt động EVM](./gas.png)
_Sơ đồ được phỏng theo [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Phí gas phải được thanh toán bằng đồng tiền bản địa của Ethereum, ether (ETH). Giá gas thường được niêm yết bằng gwei, một đơn vị nhỏ hơn của ETH. Mỗi gwei bằng một phần một tỉ của mỗi ETH. (0,000000001 ETH hay 10<sup>-9</sup> ETH).

Ví dụ: thay vì nói rằng giá gas của bạn là 0,000000001 ether, bạn có thể nói rằng giá gas của mình là 1 gwei.

Từ ‘gwei’ là dạng rút gọn của ‘giga-wei’, có nghĩa là ‘một tỷ wei’. Một gwei bằng một tỉ wei. Bản thân Wei (được đặt theo tên của [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), người tạo ra [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) là đơn vị nhỏ nhất của ETH.

## Phí gas được tính như thế nào? {#how-are-gas-fees-calculated}

Bạn có thể cài đặt lượng gas bạn muốn trả khi bạn gửi một giao dịch. Bằng cách trả giá một lượng gas nhất định, bạn đang đấu giá để giao dịch của mình được đưa vào khối tiếp theo. Nếu như bạn đề nghị quá ít, các nút xác thực sẽ ít khi chọn giao dịch của bạn để thêm vào, nghĩa là giao dịch của bạn sẽ được sử lý sau hoặc không được xử lí. Nếu bạn trả giá có cao, bạn có thể sẽ phí ETH. Vậy thì, làm cách nào để biết nên trả bao nhiêu?

Tổng số gas bạn phải trả được chia thành hai thành phần: `phí cơ bản` và `phí ưu tiên` (tiền boa).

`phí cơ bản` được giao thức quy định—bạn phải trả ít nhất số tiền này để giao dịch của bạn được coi là hợp lệ. `phí ưu tiên` là một khoản tiền boa mà bạn thêm vào phí cơ bản để làm cho giao dịch của bạn hấp dẫn đối với những người xác thực để họ chọn đưa nó vào khối tiếp theo.

Một giao dịch chỉ trả `phí cơ bản` về mặt kỹ thuật là hợp lệ nhưng hiếm khi được đưa vào vì nó không mang lại động lực cho người xác thực chọn nó thay vì bất kỳ giao dịch nào khác. Phí `ưu tiên` 'vừa đủ' được quyết định bởi độ bận rộn của mạng lưới tại thời điểm bạn gửi giao dịch—nếu có nhiều nhu cầu thì bạn có thể phải đặt phí `ưu tiên` cao hơn, nhưng khi có ít nhu cầu hơn, bạn có thể trả ít hơn.

Lấy ví dụ, giả sử Jordan muốn thanh toán 1 ETH cho Taylor. Một giao dịch ETH cần phải có 21,000 đơn vị Gas, và phí cơ bản là 10 Gwei. Jordan thêm hoa hồng 2 Gwei.

Tổng phí bây giờ sẽ bằng:

`lượng Gas sử dụng * (phí cơ bản + phí ưu tiên)`

trong đó `phí cơ bản` là giá trị do giao thức đặt ra và `phí ưu tiên` là giá trị do người dùng đặt ra như một khoản tiền boa cho người xác thực.

ví dụ: `21.000 * (10 + 2) = 252.000 gwei` (0,000252 ETH).

Khi mà Jordan gửi tiền, 1,000252 ETH sẽ được lấy từ tài khoản của Jordan. Taylor sẽ nhận được 1,00000 ETH. Nút xác thực sẽ nhận phí ưu tiên 0,000042 ETH. `phí cơ bản` 0,00021 ETH sẽ bị đốt.

### Phí cơ bản {#base-fee}

Mọi khối đều có phí cơ bản đóng vai trò là giá khởi điểm. Để đủ điều kiện đưa vào một khối, giá đề xuất cho mỗi loại gas ít nhất phải bằng mức phí cơ bản. Phí cơ bản được tính toán độc lập với khối hiện tại và thay vào đó được xác định bởi các khối trước đó, giúp cho phí giao dịch trở nên dễ đoán hơn cho người dùng. Khi khối được tạo, **phí cơ bản này sẽ bị "đốt"**, loại bỏ nó khỏi lưu thông.

Phí cơ bản được tính bằng một công thức so sánh kích thước của khối trước đó (lượng gas được sử dụng cho tất cả các giao dịch) với kích thước mục tiêu (một nửa giới hạn gas). Phí cơ bản sẽ tăng hoặc giảm tối đa 12,5% cho mỗi khối nếu kích thước khối mục tiêu lần lượt cao hơn hoặc thấp hơn mục tiêu. Sự tăng trưởng theo cấp số nhân này khiến việc duy trì kích thước khối ở mức cao vô thời hạn trở nên không khả thi về mặt kinh tế.

| Khối số | Bao gồm Gas | Tăng phí | Phí cơ bản hiện tại |
| ------- | ----------: | -------: | ------------------: |
| 1       |    18 triệu |       0% |            100 gwei |
| 2       |    36 triệu |       0% |            100 gwei |
| 3       |    36 triệu |    12,5% |          112,5 Gwei |
| 4       |    36 triệu |    12,5% |          126,6 Gwei |
| 5       |    36 triệu |    12,5% |          142,4 Gwei |
| 6       |    36 triệu |    12,5% |          160,2 Gwei |
| 7       |    36 triệu |    12,5% |          180,2 Gwei |
| 8       |    36 triệu |    12,5% |          202,7 Gwei |

Trong bảng trên, một ví dụ được minh họa bằng cách sử dụng 36 triệu làm giới hạn gas. Theo ví dụ này, để tạo một giao dịch trên khối số 9, một ví sẽ cho người dùng biết chắc chắn rằng **phí cơ bản tối đa** được thêm vào khối tiếp theo là `phí cơ bản hiện tại * 112,5%` hoặc `202,7 gwei * 112,5% = 228,1 gwei`.

Đây là một lưu ý quan trọng vì rất ít khi chúng ta thấy các đợt tăng giá kéo dài của những khối đầy, bởi vì tốc độ tăng của phí cơ sở trước một khối đầy diễn ra rất nhanh.

| Khối số                                             |                                         Bao gồm Gas | Tăng phí |                                 Phí cơ bản hiện tại |
| --------------------------------------------------- | --------------------------------------------------: | -------: | --------------------------------------------------: |
| 30                                                  |                                            36 triệu |    12,5% |                                         2705,6 Gwei |
| ... | ... |    12,5% | ... |
| 50                                                  |                                            36 triệu |    12,5% |                                        28531,3 Gwei |
| ... | ... |    12,5% | ... |
| 100                                                 |                                            36 triệu |    12,5% |                                     10302608,6 Gwei |

### Phí ưu tiên (tiền boa) {#priority-fee}

Phí ưu tiên (tiền boa) khuyến khích những người xác thực tối đa hóa số lượng giao dịch trong một khối, chỉ bị giới hạn bởi giới hạn gas của khối. Nếu không có tiền boa, một người xác thực hợp lý có thể bao gồm ít giao dịch hơn—hoặc thậm chí không có giao dịch nào—mà không bị phạt trực tiếp từ lớp thực thi hay lớp đồng thuận, vì phần thưởng staking không phụ thuộc vào số lượng giao dịch trong một khối. Ngoài ra, tiền boa cho phép người dùng trả giá cao hơn những người khác để được ưu tiên trong cùng một khối, báo hiệu một cách hiệu quả về tính cấp thiết.

### Phí tối đa {#maxfee}

Để thực hiện một giao dịch trên mạng lưới, người dùng có thể chỉ định giới hạn tối đa mà họ sẵn sàng trả để giao dịch của họ được thực hiện. Tham số tùy chọn này được gọi là `maxFeePerGas`. Để một giao dich được thực hiện, phí tối đã phải lớn hơn tổng của ( phí cơ bản + tiền thưởng). Người dùng sẽ được hoàn lại khoản chênh lệch giữa phí tối đa và tổng chi phí cơ bản + tiền thưởng.

### Kích thước khối {#block-size}

Mỗi khối có kích thước mục tiêu bằng một nửa giới hạn gas hiện tại, nhưng kích thước của các khối sẽ tăng hoặc giảm theo nhu cầu của mạng, cho đến khi đạt đến giới hạn khối (gấp 2 lần kích thước khối mục tiêu). Giao thức đạt được kích thước khối trung bình cân bằng ở mức mục tiêu thông qua quá trình _tâtonnement_ (thăm dò giá). Điều này có nghĩa là nếu kích thước khối lớn hơn kích thước mục tiêu, giao thức sẽ tăng phí cơ sở cho khối tiếp theo. Tương tự, giao thức sẽ giảm phí cơ sở nếu kích thước khối nhỏ hơn kích thước mục tiêu.

Mức điều chỉnh của phí cơ sở tỷ lệ thuận với độ chênh lệch giữa kích thước khối hiện tại và kích thước mục tiêu. Đây là một phép tính tuyến tính từ -12,5% cho một khối trống, 0% tại kích thước mục tiêu, cho đến +12,5% cho một khối đạt đến giới hạn gas. Giới hạn gas có thể dao động theo thời gian dựa trên tín hiệu của người xác thực, cũng như thông qua các bản nâng cấp mạng. Bạn có thể [xem các thay đổi về giới hạn gas theo thời gian tại đây](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Tìm hiểu thêm về các khối](/developers/docs/blocks/)

### Tính toán phí gas trong thực tế {#calculating-fees-in-practice}

Bạn có thể nêu rõ số tiền mà mình sẵn sàng trả để giao dịch được thực hiện. Tuy nhiên, hầu hết các nhà cung cấp ví sẽ tự động đặt một mức phí giao dịch khuyến nghị (phí cơ sở + phí ưu tiên được đề xuất) để giảm bớt sự phức tạp cho người dùng.

## Tại sao phí Gas tồn tại? {#why-do-gas-fees-exist}

Tóm lại, phí Gas giúp giữ cho mạng lưới Ethereum an toàn. Bằng cách yêu cầu trả phí cho mỗi phép tính hoàn tất trên mạng, chúng ta ngăn chặn những kẻ xấu Spam mạng lưới. Để tránh các vòng lặp vô hạn (dù là vô tình hay ác ý) hoặc các sự lãng phí tính toán khác trong mã nguồn, mỗi giao dịch đều phải đặt ra một giới hạn về số bước tính toán có thể sử dụng khi thực thi mã nguồn. Đơn vị cơ bản của tính toán là “Gas”.

Mặc dù một giao dịch có bao gồm một giới hạn, nhưng bất kỳ lượng gas nào không được sử dụng trong giao dịch sẽ được trả lại cho người dùng (ví dụ: `phí tối đa - (phí cơ bản + tiền boa)` sẽ được trả lại).

![Sơ đồ cho thấy cách gas không sử dụng được hoàn lại](../transactions/gas-tx.png)
_Sơ đồ được phỏng theo [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Giới hạn gas là gì? {#what-is-gas-limit}

Giới hạn gas là lượng gas tối đa bạn sẵn sàng trả cho một giao dịch. Các giao dịch phức tạp hơn liên quan đến [hợp đồng thông minh](/developers/docs/smart-contracts/) đòi hỏi nhiều công việc tính toán hơn, vì vậy chúng yêu cầu giới hạn gas cao hơn so với một thanh toán đơn giản. Một giao dịch chuyển ETH tiêu chuẩn yêu cầu giới hạn là 21.000 đơn vị gas.

Ví dụ, nếu bạn đặt giới hạn Gas là 50.000 cho một giao dịch chuyển ETH đơn giản, EVM sẽ tiêu thụ 21.000 và bạn sẽ nhận lại 29.000 còn dư. Tuy nhiên, nếu bạn đặt quá ít gas, chẳng hạn giới hạn Gas là 20.000 cho một giao dịch chuyển ETH đơn giản, thì giao dịch sẽ thất bại trong giai đoạn xác thực. Nó sẽ bị từ chối trước khi được ghi vào một khối, và gas sẽ không bị tiêu thụ. Ngoài ra, nếu một giao dịch hết Gas trong quá trình thực thi (ví dụ: một hợp đồng thông minh sử dụng hết toàn bộ Gas khi mới chạy được nửa chừng), máy chủ ảo Ethereum sẽ hoàn tác tất cả các thay đổi, nhưng toàn bộ lượng Gas đã cung cấp vẫn sẽ bị tiêu thụ cho phần công việc đã thực hiện.

## Tại sao phí gas có thể lên cao đến vậy? {#why-can-gas-fees-get-so-high}

Phí gas cao là do sự phổ biến của Ethereum. Nếu nhu cầu quá cao, người dùng phải đưa ra mức phí ưu tiên lớn hơn để cố gắng trả giá cao hơn các giao dịch của những người dùng khác. Lượng tip cao hơn sẽ tăng cơ hội giao dịch của bạn được ghi vào khối tiếp theo. Đồng thồi, các ứng dụng hợp đồng thông minh phức tạp cần xử lý nhiều tác vụ hơn để thực hiện chức năng của chúng, nên có thể tiêu thụ rất nhiều gas.

## Các sáng kiến để giảm chi phí gas {#initiatives-to-reduce-gas-costs}

Các [bản nâng cấp khả năng mở rộng](/roadmap/) của Ethereum cuối cùng sẽ giải quyết một số vấn đề về phí gas, điều này sẽ cho phép nền tảng xử lý hàng nghìn giao dịch mỗi giây và mở rộng quy mô trên toàn cầu.

Layer 2 là là sáng kiến chính để cải thiện về mặt chi phí gas, trải nghiệm người dùng và khả năng mở rộng quy mô.

[Tìm hiểu thêm về mở rộng quy mô lớp 2](/developers/docs/scaling/#layer-2-scaling)

## Giám sát phí gas {#monitoring-gas-fees}

Nếu bạn muốn theo dõi phí gas để có thể tiêu ít ETH hơn, bạn có thể tận dụng nhiều công cụ khác nhau như:

- [Etherscan](https://etherscan.io/gastracker) _Công cụ ước tính giá gas giao dịch_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Công cụ ước tính giá gas giao dịch mã nguồn mở_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Giám sát và theo dõi giá gas của Ethereum và L2 để giảm phí giao dịch và tiết kiệm tiền_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Tiện ích mở rộng trên Chrome ước tính gas hỗ trợ cả giao dịch cũ Loại 0 và giao dịch EIP-1559 Loại 2._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Tính phí gas bằng tiền tệ địa phương của bạn cho các loại giao dịch khác nhau trên Mainnet, Arbitrum và Polygon._

## Các công cụ liên quan {#related-tools}

- [Nền tảng Gas của Blocknative](https://www.blocknative.com/gas) _API ước tính gas được cung cấp bởi nền tảng dữ liệu mempool toàn cầu của Blocknative_
- [Gas Network](https://gas.network) Các Oracle Gas trên chuỗi. Hỗ trợ hơn 35 chuỗi.

## Đọc thêm {#further-reading}

- [Giải thích về Gas trên Ethereum](https://defiprime.com/gas)
- [Giảm mức tiêu thụ gas của Hợp đồng thông minh của bạn](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Các chiến lược tối ưu hóa gas cho nhà phát triển](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Tài liệu về EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Các tài nguyên về EIP-1559 của Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Tách biệt Cơ chế khỏi Meme](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
