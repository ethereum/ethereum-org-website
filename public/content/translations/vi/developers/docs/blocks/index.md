---
title: "Khối"
description: "Tổng quan về khối trong chuỗi khối Ethereum – cấu trúc dữ liệu của chúng, lý do chúng cần thiết và cách chúng được tạo ra."
lang: vi
---

Các khối là tập hợp các giao dịch kèm theo một hàm băm (Hash) của khối trước đó trong chuỗi. Điều này liên kết các khối lại với nhau (thành một chuỗi) vì các hàm băm được tạo ra bằng phương pháp mật mã học (Cryptography) từ dữ liệu của khối. Điều này ngăn chặn gian lận, bởi vì chỉ một thay đổi trong bất kỳ khối nào trong lịch sử cũng sẽ làm vô hiệu tất cả các khối tiếp theo, do toàn bộ các hàm băm sau đó sẽ thay đổi và mọi người đang vận hành chuỗi khối sẽ phát hiện ra.

## Điều kiện tiên quyết {#prerequisites}

Khối là một chủ đề rất dễ với người mới. Để giúp bạn hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc [Tài khoản](/developers/docs/accounts/), [Giao dịch](/developers/docs/transactions/) và [giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/) của chúng tôi.

## Tại sao lại là khối? {#why-blocks}

Để đảm bảo tất cả những người tham gia mạng Ethereum duy trì trạng thái đồng bộ và thống nhất về lịch sử giao dịch chính xác, chúng ta gom các giao dịch lại thành các khối. Điều này có nghĩa là hàng chục (hoặc hàng trăm) giao dịch được ghi nhận, thống nhất và đồng bộ cùng một lúc.

![Sơ đồ hiển thị giao dịch trong một khối gây ra các thay đổi trạng thái](./tx-block.png)
_Sơ đồ được điều chỉnh từ [minh họa Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Bằng cách giãn cách thời gian ghi nhận, chúng ta cho tất cả những người tham gia mạng đủ thời gian để đạt được đồng thuận: mặc dù các yêu cầu giao dịch xảy ra hàng chục lần mỗi giây, nhưng các khối trên Ethereum chỉ được tạo và ghi nhận sau mỗi mười hai giây.

## Cách các khối hoạt động {#how-blocks-work}

Để lưu giữ lịch sử giao dịch, các khối được sắp xếp theo một thứ tự nghiêm ngặt (mỗi khối mới đều chứa một thông tin liên quan đến khối cha của nó), và giao dịch trong khối cũng được sắp xếp nghiêm ngặt theo cách tương tự. Trừ những trường hợp đặt biệt, bất kì lúc nào, tất cả những người tham gia mạng lưới thống nhất con số, lịch sử chính xác của khối và đang xử lí để gom các yêu cầu giao dịch đang diễn ra vào khối tiếp theo.

Khi một khối được nối với nhau bằng cách chọn ra nút xác thực ngẫu nhiên trên mạng lưới, nó sẽ được phân tán đến tất cả mạng lưới; tất cả nút thêm nó vào khối cuối của chuỗi khối và nút xác thực mới sẽ được chọn để tạo khối tiếp theo. Quy trình lắp khối chính xác và quy trình ghi nhận/ đồng thuận hiện được quy định bởi giao thức bằng chứng cổ phần (PoS) của Ethereum.

## Giao thức bằng chứng cổ phần {#proof-of-stake-protocol}

Bằng chứng cổ phần (Proof-of-Stake) có ý nghĩa như sau:

- Nút xác thực phải Stake (đặt cược) 32 ETH vào một hợp đồng ký quỹ như khoảng thế chấp phòng hành vi độc hại. Điều này giúp bảo vệ mạng lưới vì các hoạt động không trung thực dẫn đến một hoặc tất cả Stake bị hủy đi.
- Ở mỗi Slot (mỗi 12 giây) một nút xác thực ngẫu nhiên được chọn để làm người để xuất khối. Họ sẽ gộp các giao dịch lại, xử lí chúng và xác định 'trạng thái'. Họ gói các thông tin này vào một khối và phân tán nó với những nút xác thực khác.
- Những nút xác thực khác khi biết về khối mới sẽ xác thực lại những giao dịch để đảm bảo rằng họ đồng tình với đề xuất thay đổi trên trạng thái toàn mạng. Giả sử rằng khối hợp lệ, họ sẽ thêm nó vào dữ liệu của họ.
- Nếu một nút xác thực biết về hai khối trong cùng Slot họ sẽ sử dụng thuật toán chọn nhánh (Fork Choise Algorithm) để chọn ra một nhánh được ủng hộ bởi phần lớn ETH được Stake.

[Thông tin thêm về bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos)

## Khối có gì trong đó? {#block-anatomy}

Có rất nhiều thông tin nằm trong một khối. Ở cấp độ tổng quát nhất, một khối chứa các trường dữ liệu sau:

| Trường dữ liệu   | Mô tả                                                                 |
| :--------------- | :-------------------------------------------------------------------- |
| `slot`           | Slot mà khối đó thuộc về                                              |
| `proposer_index` | iD của trình xác thực đề xuất khối                                    |
| `parent_root`    | kết quả hàm băm của khối trước                                        |
| `state_root`     | hàm băm gốc của đối tượng trạng thái                                  |
| `phần body`      | một đối tượng chứa nhiều trường dữ liệu, như được định nghĩa dưới đây |

Phần `body` của khối chứa một số trường riêng:

| Trường dữ liệu       | Mô tả                                                                                                                           |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `randao_reveal`      | một giá trị được dùng để chọn người đề xuất khối tiếp theo                                                                      |
| `eth1_data`          | thông tin về hợp đồng ký quỹ (deposit contract)                                                              |
| `graffiti`           | dữ liệu tùy ý được dùng để gắn nhãn cho các khối                                                                                |
| `proposer_slashings` | danh sách các nút xác thực sẽ bị phạt cắt quỹ (Slashing)                                                     |
| `attester_slashings` | danh sách các nút xác thực chứng thực sẽ bị cắt quỹ (Slashing)                                               |
| `attestations`       | danh sách các chứng thực được thực hiện đối với các slot trước đó                                                               |
| `gửi tiền`           | danh sách các khoản ký quỹ mới vào hợp đồng ký quỹ                                                                              |
| `voluntary_exits`    | danh sách các nút xác thực tự nguyện rời khỏi mạng                                                                              |
| `sync_aggregate`     | tập con các nút xác thực được dùng để phục vụ Light Client (Client có dữ liệu thấp hơn so với Client đầy đủ) |
| `execution_payload`  | các giao dịch được chuyển từ Client thực thi                                                                                    |

Trường `attestations` chứa danh sách tất cả các chứng thực trong khối. Sự chứng thực (Attestations) có những loại dữ liệu riêng chứa những mảnh dữ liệu. Mỗi sự chứng thực chứa:

| Trường dữ liệu     | Mô tả                                                                    |
| :----------------- | :----------------------------------------------------------------------- |
| `aggregation_bits` | một tập hợp những nút xác thực tham gia quá trình chứng nhận này         |
| `dữ liệu`          | một hộp chưa những trường dữ liệu con                                    |
| `signature`        | chữ ký tổng hợp của một tập hợp những người xác thực đối với phần `data` |

Trường `data` trong `attestation` chứa những nội dung sau:

| Trường dữ liệu      | Mô tả                                                           |
| :------------------ | :-------------------------------------------------------------- |
| `slot`              | những Slot liên quann đến sự chứng thực                         |
| `index`             | các chỉ số nút xác thực                                         |
| `beacon_block_root` | hàm băm gốc của khối Beacon được xem là phần đầu của chuỗi      |
| `nguồn`             | cột mốc cuối cùng được xác nhận (Jusstified) |
| `target`            | khối ranh giới chu kỳ mới nhất                                  |

Việc thực thi các giao dịch trong `execution_payload` sẽ cập nhật trạng thái toàn cục. Tất cả các máy khách thực thi lại các giao dịch trong `execution_payload` để đảm bảo trạng thái mới khớp với trạng thái trong trường `state_root` của khối mới. Đây là cách một Client có thể biết được khối mới hợp lệ và an toàn để thêm vào chuỗi khối hay không. Bản thân `execution payload` là một đối tượng có một số trường. Ngoài ra còn có một `execution_payload_header` chứa thông tin tóm tắt quan trọng về dữ liệu thực thi. Những cấu trúc được sắp sếp như sau:

`execution_payload_header` chứa các trường sau:

| Trường dữ liệu      | Mô tả                                                                                 |
| :------------------ | :------------------------------------------------------------------------------------ |
| `parent_hash`       | kết quả băm của khối bố                                                               |
| `fee_recipient`     | địa chỉ tài khoản trả phí giao dịch đến                                               |
| `state_root`        | hàm băm gốc của trạng thái toàn mạng lưới sau khi áp dụng các thay đổi trong khối này |
| `receipts_root`     | hàm băm của tất cả biên lai giao dịch (dữ liệu dạng cây)           |
| `logs_bloom`        | cấu trúc trúc dữ liệu chứa các nhật kí sự kiện                                        |
| `prev_randao`       | dữ liệu dùng trong lựa chọn nút xác thực ngẫu nhiên                                   |
| `block_number`      | số của khối hiện tại                                                                  |
| `gas_limit`         | lượng Gas tối đa cho phép ở khối này                                                  |
| `gas_used`          | lượng Gas thực tế sử dụng trong khối                                                  |
| `timestamp`         | thời gian của khối                                                                    |
| `extra_data`        | dữ liệu bổ sung tùy ý dưới dạng Byte thô                                              |
| `base_fee_per_gas`  | phí giao dịch cơ bản                                                                  |
| `block_hash`        | Hàm băm của khối thực thi                                                             |
| `transactions_root` | hàm băm gốc của các giao dịch trong dữ liệu thực thi                                  |
| `withdrawal_root`   | hàm băm gốc của các lệnh rút trong dữ liệu thực thi                                   |

Bản thân `execution_payload` chứa những nội dung sau (lưu ý rằng nó giống hệt với phần header ngoại trừ việc thay vì chứa hàm băm gốc của các giao dịch, nó bao gồm danh sách thực tế các giao dịch và thông tin rút tiền):

| Trường dữ liệu     | Mô tả                                                                                 |
| :----------------- | :------------------------------------------------------------------------------------ |
| `parent_hash`      | kết quả băm của khối bố                                                               |
| `fee_recipient`    | địa chỉ tài khoản trả phí giao dịch đến                                               |
| `state_root`       | hàm băm gốc của trạng thái toàn mạng lưới sau khi áp dụng các thay đổi trong khối này |
| `receipts_root`    | hàm băm của tất cả biên lai giao dịch (dữ liệu dạng cây)           |
| `logs_bloom`       | cấu trúc trúc dữ liệu chứa các nhật kí sự kiện                                        |
| `prev_randao`      | dữ liệu dùng trong lựa chọn nút xác thực ngẫu nhiên                                   |
| `block_number`     | số của khối hiện tại                                                                  |
| `gas_limit`        | lượng Gas tối đa cho phép ở khối này                                                  |
| `gas_used`         | lượng Gas thực tế sử dụng trong khối                                                  |
| `timestamp`        | thời gian của khối                                                                    |
| `extra_data`       | dữ liệu bổ sung tùy ý dưới dạng Byte thô                                              |
| `base_fee_per_gas` | phí giao dịch cơ bản                                                                  |
| `block_hash`       | Hàm băm của khối thực thi                                                             |
| `các giao dịch`    | danh sách của những giao dịch sẽ được thực thi                                        |
| `rút tiền`         | danh sách đối tượng rút                                                               |

Danh sách `withdrawals` chứa các đối tượng `withdrawal` được cấu trúc theo cách sau:

| Trường dữ liệu   | Mô tả                      |
| :--------------- | :------------------------- |
| `địa chỉ`        | địa chỉ tài khoải rút tiền |
| `amount`         | khối lượng tiền rút        |
| `index`          | số thứ tự rút tiền         |
| `validatorIndex` | số thứ tự nút xác thực     |

## Thời gian khối {#block-time}

Thời gian khối dùng để mô tả thời gian tách khối. Trong Ethereum, thời gian chia thành mỗi đơn vị 12 giây gọi là 'Slot'. Với mỗi slot một nút xác thực đựa lựa chọn để đề xuất khối. Giả sử rằng tất cả nút xác thực đang trực tuyến và hoạt động bình thường thì mỗi Slot sẽ có một khối, nghĩa rằng thời gian khối là 12 giây. Tuy nhiên, đôi khi nút xác thực có thể ngoại tuyến khi được gọi đề xuất khối, nghĩa là Slot đôi khi bị trống.

Việc thực hiện sẽ khác nhau giữa hệ thống bằng chứng công việc nơi mà thời gian khối dựa theo xác suất và được điều chỉnh theo mục tiêu của giao thức độ khó đào. [Thời gian khối trung bình](https://etherscan.io/chart/blocktime) của Ethereum là một ví dụ hoàn hảo về điều này, qua đó quá trình chuyển đổi từ bằng chứng công việc sang bằng chứng cổ phần có thể được suy ra một cách rõ ràng dựa trên tính nhất quán của thời gian khối 12 giây mới.

## Kích thước khối {#block-size}

Một lưu ý quan trọng đó là bản thân khối cũng bị giới hạn về kích thước. Mỗi khối có kích thước mục tiêu là 30 triệu gas nhưng kích thước của các khối sẽ tăng hoặc giảm theo nhu cầu của mạng lưới, cho đến khi đạt giới hạn khối là 60 triệu gas (gấp 2 lần kích thước khối mục tiêu). Giới hạn Gas của khối có thể điều chỉnh lên hoặc xuống phụ thuộc vào tỉ lệ khoảng 1/1024 từ giới hạn Gas của khối trước. Và kết quả, nút xác thực có thể thay đổi giới hạn Gas của khối qua đồng thuận. Tổng lượng Gas được tiêu thụ bởi tất cả giao dịch trong khối phải nhỏ hơn mức giới hạn Gas mục tiêu của khối. Điều này rất quan trọng để đảm bảo rằng khối không thể có kích thước tùy ý. Nếu khối có thể có kích thước tùy ý, thì các nút xác thực bản đầy đủ (Full Node) sẽ không thể theo kịp mạng lưới do yêu cầu về dữ liệu trống và tốc độ (phần cứng không đủ mạnh mẽ). Khối càng lớn, càng cần nhiều sức mạnh tính toán để có thể xử lí chúng xong thời gian của Slot kế. Điều này là rủi ro tập trung hóa, và giải pháp là giới hạn kích thước khối.

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Giao dịch](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
- [Bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos)
