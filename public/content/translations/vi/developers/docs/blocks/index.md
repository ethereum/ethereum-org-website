---
title: Khối
description: Tổng quan về các khối trong Chuỗi khối Ethereum – cấu trúc dữ liệu của chúng, lý do tại sao chúng cần thiết và cách chúng được tạo ra.
lang: vi
---

Các khối là các lô giao dịch với một mã băm của khối trước đó trong Chuỗi. Điều này liên kết các khối lại với nhau (thành một Chuỗi) vì các mã băm được tạo ra bằng mật mã học từ dữ liệu khối. Điều này ngăn chặn gian lận, bởi vì một thay đổi trong bất kỳ khối nào trong lịch sử sẽ làm mất hiệu lực tất cả các khối tiếp theo do tất cả các mã băm sau đó sẽ thay đổi và mọi người đang chạy Chuỗi khối sẽ nhận ra.

## Điều kiện tiên quyết {#prerequisites}

Khối là một chủ đề rất thân thiện với người mới bắt đầu. Nhưng để giúp bạn hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [Tài khoản](/developers/docs/accounts/), [Giao dịch](/developers/docs/transactions/) và [giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/) của chúng tôi.

## Tại sao lại cần các khối? {#why-blocks}

Để đảm bảo rằng tất cả những người tham gia trên mạng lưới [Ethereum](/) duy trì một trạng thái đồng bộ và đồng thuận về lịch sử chính xác của các giao dịch, chúng tôi gộp các giao dịch thành các khối. Điều này có nghĩa là hàng chục (hoặc hàng trăm) giao dịch được cam kết, đồng thuận và đồng bộ hóa cùng một lúc.

![A diagram showing transaction in a block causing state changes](./tx-block.png)
_Sơ đồ được phỏng theo [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Bằng cách giãn cách các cam kết, chúng tôi cung cấp cho tất cả những người tham gia mạng lưới đủ thời gian để đạt được đồng thuận: mặc dù các yêu cầu giao dịch xảy ra hàng chục lần mỗi giây, các khối chỉ được tạo và cam kết trên Ethereum mười hai giây một lần.

## Cách các khối hoạt động {#how-blocks-work}

Để bảo tồn lịch sử giao dịch, các khối được sắp xếp theo thứ tự nghiêm ngặt (mỗi khối mới được tạo chứa một tham chiếu đến khối cha của nó) và các giao dịch trong các khối cũng được sắp xếp theo thứ tự nghiêm ngặt. Ngoại trừ những trường hợp hiếm hoi, tại bất kỳ thời điểm nào, tất cả những người tham gia trên mạng lưới đều đồng thuận về số lượng và lịch sử chính xác của các khối, và đang làm việc để gộp các yêu cầu giao dịch trực tiếp hiện tại vào khối tiếp theo.

Khi một khối được tập hợp lại bởi một trình xác thực được chọn ngẫu nhiên trên mạng lưới, nó sẽ được truyền bá đến phần còn lại của mạng lưới; tất cả các nút thêm khối này vào cuối Chuỗi khối của họ và một trình xác thực mới được chọn để tạo khối tiếp theo. Quá trình lắp ráp khối và quá trình cam kết/đồng thuận chính xác hiện được chỉ định bởi Giao thức “Bằng chứng cổ phần (PoS)” của Ethereum.

## Giao thức Bằng chứng cổ phần (PoS) {#proof-of-stake-protocol}

Bằng chứng cổ phần (PoS) có nghĩa là:

- Các nút xác thực phải đặt cọc 32 ETH vào một hợp đồng tiền gửi làm tài sản thế chấp chống lại hành vi xấu. Điều này giúp bảo vệ mạng lưới vì hoạt động không trung thực có thể chứng minh được sẽ dẫn đến việc một phần hoặc toàn bộ khoản đặt cọc đó bị tiêu hủy.
- Trong mỗi khe (cách nhau mười hai giây), một trình xác thực được chọn ngẫu nhiên để làm người đề xuất khối. Họ gộp các giao dịch lại với nhau, thực thi chúng và xác định một 'trạng thái' mới. Họ gói thông tin này vào một khối và chuyển nó cho các trình xác thực khác.
- Các trình xác thực khác khi nghe về khối mới sẽ thực thi lại các giao dịch để đảm bảo họ đồng ý với thay đổi được đề xuất đối với trạng thái toàn cục. Giả sử khối đó hợp lệ, họ sẽ thêm nó vào cơ sở dữ liệu của riêng mình.
- Nếu một trình xác thực nghe về hai khối xung đột cho cùng một khe, họ sẽ sử dụng thuật toán lựa chọn Phân nhánh của mình để chọn khối được hỗ trợ bởi nhiều ETH được đặt cọc nhất.

[Tìm hiểu thêm về Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos)

## Có gì trong một khối? {#block-anatomy}

Có rất nhiều thông tin được chứa trong một khối. Ở cấp độ cao nhất, một khối chứa các trường sau:

| Trường            | Mô tả                                           |
| :--------------- | :---------------------------------------------------- |
| `slot`           | khe mà khối thuộc về                         |
| `proposer_index` | ID của trình xác thực đề xuất khối           |
| `parent_root`    | mã băm của khối trước đó                       |
| `state_root`     | mã băm gốc của đối tượng trạng thái                     |
| `body`           | một đối tượng chứa một số trường, như được định nghĩa bên dưới |

Bản thân `body` của khối chứa một số trường:

| Trường                | Mô tả                                      |
| :------------------- | :----------------------------------------------- |
| `randao_reveal`      | một giá trị được sử dụng để chọn người đề xuất khối tiếp theo   |
| `eth1_data`          | thông tin về hợp đồng tiền gửi           |
| `graffiti`           | dữ liệu tùy ý được sử dụng để gắn thẻ các khối                |
| `proposer_slashings` | danh sách các trình xác thực sẽ bị phạt cắt giảm                 |
| `attester_slashings` | danh sách những người chứng thực sẽ bị phạt cắt giảm                  |
| `attestations`       | danh sách các chứng thực được thực hiện đối với các khe trước đó |
| `deposits`           | danh sách các khoản tiền gửi mới vào hợp đồng tiền gửi     |
| `voluntary_exits`    | danh sách các trình xác thực rời khỏi mạng lưới           |
| `sync_aggregate`     | tập hợp con các trình xác thực được sử dụng để phục vụ các máy khách nhẹ |
| `execution_payload`  | các giao dịch được chuyển từ máy khách thực thi    |

Trường `attestations` chứa danh sách tất cả các chứng thực trong khối. Các chứng thực có kiểu dữ liệu riêng chứa một số phần dữ liệu. Mỗi chứng thực chứa:

| Trường              | Mô tả                                                    |
| :----------------- | :------------------------------------------------------------- |
| `aggregation_bits` | danh sách các trình xác thực đã tham gia vào chứng thực này    |
| `data`             | một vùng chứa với nhiều trường con                            |
| `signature`        | chữ ký tổng hợp của một tập hợp các trình xác thực đối với phần `data` |

Trường `data` trong `attestation` chứa những thông tin sau:

| Trường               | Mô tả                                                     |
| :------------------ | :-------------------------------------------------------------- |
| `slot`              | khe mà chứng thực liên quan đến                             |
| `index`             | các chỉ số cho các trình xác thực đang chứng thực                                |
| `beacon_block_root` | mã băm gốc của khối beacon được xem là đầu của Chuỗi |
| `source`            | điểm kiểm tra đã được chứng minh hợp lệ cuối cùng                                   |
| `target`            | khối ranh giới Kỷ nguyên mới nhất                                 |

Việc thực thi các giao dịch trong `execution_payload` sẽ cập nhật trạng thái toàn cục. Tất cả các máy khách thực thi lại các giao dịch trong `execution_payload` để đảm bảo trạng thái mới khớp với trạng thái trong trường `state_root` của khối mới. Đây là cách các máy khách có thể biết rằng một khối mới là hợp lệ và an toàn để thêm vào Chuỗi khối của họ. Bản thân `execution payload` là một đối tượng có một số trường. Ngoài ra còn có một `execution_payload_header` chứa thông tin tóm tắt quan trọng về dữ liệu thực thi. Các cấu trúc dữ liệu này được tổ chức như sau:

`execution_payload_header` chứa các trường sau:

| Trường               | Mô tả                                                         |
| :------------------ | :------------------------------------------------------------------ |
| `parent_hash`       | mã băm của khối cha                                            |
| `fee_recipient`     | Địa chỉ Tài khoản để trả phí giao dịch                      |
| `state_root`        | mã băm gốc cho trạng thái toàn cục sau khi áp dụng các thay đổi trong khối này |
| `receipts_root`     | mã băm của trie biên lai giao dịch                               |
| `logs_bloom`        | cấu trúc dữ liệu chứa nhật ký sự kiện                                |
| `prev_randao`       | giá trị được sử dụng trong việc chọn ngẫu nhiên trình xác thực                            |
| `block_number`      | số của khối hiện tại                                     |
| `gas_limit`         | giới hạn gas tối đa được phép trong khối này                                   |
| `gas_used`          | lượng Gas thực tế được sử dụng trong khối này                         |
| `timestamp`         | thời gian tạo khối                                                      |
| `extra_data`        | dữ liệu bổ sung tùy ý dưới dạng byte thô                              |
| `base_fee_per_gas`  | giá trị phí cơ sở                                                  |
| `block_hash`        | Mã băm của khối thực thi                                             |
| `transactions_root` | mã băm gốc của các giao dịch trong payload                        |
| `withdrawal_root`   | mã băm gốc của các khoản rút tiền trong payload                         |

Bản thân `execution_payload` chứa những thông tin sau (lưu ý rằng điều này giống hệt với tiêu đề ngoại trừ việc thay vì mã băm gốc của các giao dịch, nó bao gồm danh sách thực tế của các giao dịch và thông tin rút tiền):

| Trường              | Mô tả                                                         |
| :----------------- | :------------------------------------------------------------------ |
| `parent_hash`      | mã băm của khối cha                                            |
| `fee_recipient`    | Địa chỉ Tài khoản để trả phí giao dịch                      |
| `state_root`       | mã băm gốc cho trạng thái toàn cục sau khi áp dụng các thay đổi trong khối này |
| `receipts_root`    | mã băm của trie biên lai giao dịch                               |
| `logs_bloom`       | cấu trúc dữ liệu chứa nhật ký sự kiện                                |
| `prev_randao`      | giá trị được sử dụng trong việc chọn ngẫu nhiên trình xác thực                            |
| `block_number`     | số của khối hiện tại                                     |
| `gas_limit`        | giới hạn gas tối đa được phép trong khối này                                   |
| `gas_used`         | lượng Gas thực tế được sử dụng trong khối này                         |
| `timestamp`        | thời gian tạo khối                                                      |
| `extra_data`       | dữ liệu bổ sung tùy ý dưới dạng byte thô                              |
| `base_fee_per_gas` | giá trị phí cơ sở                                                  |
| `block_hash`       | Mã băm của khối thực thi                                             |
| `transactions`     | danh sách các giao dịch sẽ được thực thi                                 |
| `withdrawals`      | danh sách các đối tượng rút tiền                                          |

Danh sách `withdrawals` chứa các đối tượng `withdrawal` được cấu trúc theo cách sau:

| Trường            | Mô tả                        |
| :--------------- | :--------------------------------- |
| `address`        | Địa chỉ Tài khoản đã rút tiền |
| `amount`         | số tiền rút                  |
| `index`          | giá trị chỉ số rút tiền             |
| `validatorIndex` | giá trị chỉ số trình xác thực              |

## Thời gian tạo khối {#block-time}

Thời gian tạo khối đề cập đến thời gian phân tách các khối. Trong Ethereum, thời gian được chia thành các đơn vị mười hai giây gọi là 'khe'. Trong mỗi khe, một trình xác thực duy nhất được chọn để đề xuất một khối. Giả sử tất cả các trình xác thực đều trực tuyến và hoạt động đầy đủ, sẽ có một khối trong mỗi khe, nghĩa là thời gian tạo khối là 12 giây. Tuy nhiên, đôi khi các trình xác thực có thể ngoại tuyến khi được gọi để đề xuất một khối, nghĩa là các khe đôi khi có thể bị trống.

Việc triển khai này khác với các hệ thống dựa trên Bằng chứng công việc (PoW), nơi thời gian tạo khối mang tính xác suất và được điều chỉnh bởi độ khó khai thác mục tiêu của Giao thức. [Thời gian tạo khối trung bình](https://etherscan.io/chart/blocktime) của Ethereum là một ví dụ hoàn hảo về điều này, qua đó quá trình chuyển đổi từ Bằng chứng công việc (PoW) sang Bằng chứng cổ phần (PoS) có thể được suy luận rõ ràng dựa trên tính nhất quán của thời gian tạo khối 12 giây mới.

## Kích thước khối {#block-size}

Một lưu ý quan trọng cuối cùng là bản thân các khối bị giới hạn về kích thước. Mỗi khối có kích thước mục tiêu là 30 triệu Gas nhưng kích thước của các khối sẽ tăng hoặc giảm theo nhu cầu của mạng lưới, cho đến giới hạn khối là 60 triệu Gas (gấp 2 lần kích thước khối mục tiêu). Giới hạn gas của khối có thể được điều chỉnh tăng hoặc giảm theo hệ số 1/1024 so với giới hạn gas của khối trước đó. Do đó, các trình xác thực có thể thay đổi giới hạn gas của khối thông qua đồng thuận. Tổng lượng Gas tiêu thụ bởi tất cả các giao dịch trong khối phải nhỏ hơn giới hạn gas của khối. Điều này rất quan trọng vì nó đảm bảo rằng các khối không thể lớn tùy ý. Nếu các khối có thể lớn tùy ý, thì các nút đầy đủ có hiệu suất kém hơn sẽ dần dần không thể theo kịp mạng lưới do các yêu cầu về không gian và tốc độ. Khối càng lớn, sức mạnh tính toán cần thiết để xử lý chúng kịp thời cho khe tiếp theo càng lớn. Đây là một lực lượng tập trung hóa, được chống lại bằng cách giới hạn kích thước khối.

## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Chủ đề liên quan {#related-topics}

- [Giao dịch](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
- [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos)