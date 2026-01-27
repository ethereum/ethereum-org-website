---
title: Các giao dịch
description: Tổng quan về giao dịch Ethereum - cách chúng hoạt động, cấu trúc dữ liệu của chúng và cách gửi chúng thông qua một ứng dụng.
lang: vi
---

Giao dịch là hướng dẫn được ký bằng mật mã từ các tài khoản. Một tài khoản sẽ thực thi một giao dịch để cập nhật tình trạng của mạng lưới Ethereum. Giao dịch đơn giản nhất là chuyển ETH từ tài khoản này sang tài khoản khác.

## Điều kiện tiên quyết {#prerequisites}

Để giúp bạn hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước trang [Tài khoản](/developers/docs/accounts/) và [giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/) của chúng tôi.

## Giao dịch là gì? {#whats-a-transaction}

Một giao dịch Ethereum ám chỉ một hành động được thực hiện bởi một tài khoản sở hữu ngoại biên, nói cách khác là một tài khoản được quản lý bởi con người, không phải là một hợp đồng. Ví dụ, nếu Bob gửi cho Alice 1 ETH, tài khoản của Bob bị trừ tiền và tài khoản của Alice được cộng tiền. Hành động thay đổi trạng thái này diễn ra trong một giao dịch.

![Sơ đồ thể hiện một giao dịch gây ra thay đổi trạng thái](./tx.png)
_Sơ đồ được điều chỉnh từ [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Các giao dịch, mà làm thay đổi trạng thái của Máy chủ ảo Ethereum, cần được phát sóng tới toàn bộ mạng lưới. Bất kỳ nút nào đều có thể phát đi một yêu cầu thực thi một giao dịch trên Máy chủ ảo Ethereum, sau khi điều này diễn ra, một trình xác thực sẽ thực thi giao dịch và truyền bá kết quả của sự thay đổi trạng thái đến phần còn lại của mạng lưới.

Các giao dịch yêu cầu một khoản phí và phải được bao gồm trong một khối đã được xác thực. Để làm cho phần tổng quan này đơn giản hơn, chúng tôi sẽ tài trợ phí gas và xác thực ở nơi khác.

Một giao dịch được gửi đi bao gồm các thông tin sau:

- `from` – địa chỉ của người gửi, người sẽ ký giao dịch. Đây sẽ là một tài khoản sở hữu ngoại biên vì tài khoản hợp đồng không thể gửi đi các giao dịch
- `to` – địa chỉ nhận (nếu là tài khoản do bên ngoài sở hữu, giao dịch sẽ chuyển giá trị. Nếu là tài khoản hợp đồng, giao dịch sẽ thực thi mã hợp đồng)
- `signature` – định danh của người gửi. Chữ ký này được tạo ra khi khóa riêng tư của người gửi ký giao dịch và xác nhận rằng người gửi đã ủy quyền cho giao dịch này
- `nonce` - một bộ đếm tăng dần cho biết số thứ tự giao dịch từ tài khoản
- `value` – lượng ETH cần chuyển từ người gửi đến người nhận (tính bằng WEI, trong đó 1ETH bằng 1e+18wei)
- `input data` – trường tùy chọn để chứa dữ liệu tùy ý
- `gasLimit` – số lượng đơn vị gas tối đa mà giao dịch có thể tiêu thụ. [Máy ảo Ethereum (EVM)](/developers/docs/evm/opcodes) quy định các đơn vị gas cần thiết cho mỗi bước tính toán
- `maxPriorityFeePerGas` - mức giá tối đa của gas đã tiêu thụ được tính vào như một khoản tiền boa cho trình xác thực
- `maxFeePerGas` - phí tối đa cho mỗi đơn vị gas sẵn sàng trả cho giao dịch (bao gồm `baseFeePerGas` và `maxPriorityFeePerGas`)

Gas là thuật ngữ chỉ việc tính toán cần thiết để xử lý giao dịch bởi một trình xác thực. Người dùng phải trả phí cho việc tính toán này. `gasLimit` và `maxPriorityFeePerGas` xác định phí giao dịch tối đa phải trả cho trình xác thực. [Thông tin thêm về Gas](/developers/docs/gas/).

Đối tượng giao dịch sẽ trông gần giống như thế này:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Nhưng một đối tượng giao dịch cần được ký bằng khóa riêng tư của người gửi. Điều này chứng tỏ rằng giao dịch chỉ có thể xuất phát từ người gửi và không được gửi một cách gian lận.

Một ứng dụng Ethereum như Geth sẽ xử lý phần ký này.

Ví dụ lệnh gọi [JSON-RPC](/developers/docs/apis/json-rpc):

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Ví dụ phản hồi:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` là giao dịch đã ký ở dạng mã hóa [Tiền tố độ dài đệ quy (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- `tx` là giao dịch đã ký dưới dạng JSON

Với băm chữ ký, giao dịch có thể được chứng minh bằng mật mã rằng nó đến từ người gửi và đã được gửi đến mạng.

### Trường dữ liệu {#the-data-field}

Phần lớn các giao dịch truy cập vào một hợp đồng từ một tài khoản sở hữu ngoại biên.
Hầu hết các hợp đồng được viết bằng Solidity và diễn giải trường dữ liệu của chúng theo [giao diện nhị phân ứng dụng (ABI)](/glossary/#abi).

Bốn byte đầu tiên chỉ rõ chức năng nào sẽ được gọi, bằng cách sử dụng băm của tên và tham số của chức năng.
Đôi khi bạn có thể xác định hàm từ bộ chọn bằng cách sử dụng [cơ sở dữ liệu này](https://www.4byte.directory/signatures/).

Phần còn lại của calldata là các đối số, [được mã hóa theo quy định trong thông số kỹ thuật ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Ví dụ, hãy xem [giao dịch này](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Sử dụng **Nhấn để xem thêm** để xem calldata.

Bộ chọn hàm là `0xa9059cbb`. Có một vài [hàm đã biết có chữ ký này](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
Trong trường hợp này, [mã nguồn hợp đồng](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) đã được tải lên Etherscan, vì vậy chúng ta biết hàm là `transfer(address,uint256)`.

Phần còn lại của dữ liệu là:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Theo thông số giao diện nhị phân ứng dụng, các giá trị số nguyên (như địa chỉ, là các số nguyên 20 byte) xuất hiện trong giao diện nhị phân ứng dụng dưới dạng các từ 32 byte, có thêm các số 0 ở phía trước.
Vì vậy, chúng ta biết rằng địa chỉ `to` là [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
`value` là 0x3b0559f4 = 990206452.

## Các loại giao dịch {#types-of-transactions}

Trên Ethereum, có một vài điểm khác biệt về các loại giao dịch:

- Các giao dịch thông thường, một giao dịch từ một tài khoản này sang một tài khoản khác.
- Giao dịch triển khai từ hợp đồng: một giao dịch không có địa chỉ 'đến', trong đó trường dữ liệu được sử dụng cho mã hợp đồng.
- Thực thi một hợp đồng: một giao dịch tương tác với một hợp đồng thông minh đã được triển khai. Trong trường hợp này, địa chỉ 'đến' là địa chỉ hợp đồng thông minh.

### Về gas {#on-gas}

Như đã đề cập, các giao dịch tốn [gas](/developers/docs/gas/) để thực thi. Các giao dịch chuyển khoản đơn giản yêu cầu 21000 đơn vị Gas.

Vì vậy, để Bob gửi cho Alice 1 ETH với `baseFeePerGas` là 190 gwei và `maxPriorityFeePerGas` là 10 gwei, Bob sẽ cần trả khoản phí sau:

```
(190 + 10) * 21000 = 4,200,000 gwei
--hoặc--
0.0042 ETH
```

Tài khoản của Bob sẽ bị trừ **-1,0042 ETH** (1 ETH cho Alice + 0,0042 ETH tiền phí gas)

Tài khoản của Alice sẽ được cộng **+1,0 ETH**

Phí cơ bản sẽ bị đốt **-0,00399 ETH**

Trình xác thực giữ tiền boa **+0,000210 ETH**

![Sơ đồ thể hiện cách gas không sử dụng được hoàn lại](./gas-tx.png)
_Sơ đồ được điều chỉnh từ [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Bất kỳ gas nào không được sử dụng trong giao dịch sẽ được hoàn lại cho tài khoản người dùng.

### Tương tác hợp đồng thông minh {#smart-contract-interactions}

Gas là bắt buộc cho bất kỳ giao dịch nào liên quan đến hợp đồng thông minh.

Các hợp đồng thông minh cũng có thể chứa các hàm được gọi là hàm [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) hoặc [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), chúng không làm thay đổi trạng thái của hợp đồng. Do đó, việc gọi các hàm này từ một tài khoản sở hữu ngoại biên sẽ không yêu cầu tiêu tốn bất kỳ gas nào. Lệnh gọi RPC cơ bản cho trường hợp này là [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Không giống như khi được truy cập bằng `eth_call`, các hàm `view` hoặc `pure` này cũng thường được gọi nội bộ (tức là, từ chính hợp đồng đó hoặc từ một hợp đồng khác) và điều này có tốn gas.

## Vòng đời giao dịch {#transaction-lifecycle}

Một khi giao dịch đã được gửi đi, những điều sau sẽ xảy ra:

1. Một hàm băm giao dịch được tạo bằng mật mã:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Giao dịch sau đó được phát đi đến mạng lưới và được thêm vào một bể giao dịch bao gồm tất cả các giao dịch đang chờ xử lý khác trong mạng lưới.
3. Một trình xác thực phải chọn giao dịch của bạn và đưa nó vào một khối để xác minh giao dịch và coi như giao dịch 'thành công'.
4. Theo thời gian, khối chứa giao dịch của bạn sẽ được nâng cấp thành "đã xác nhận" và sau đó thành "đã hoàn tất". Những nâng cấp này giúp chắc chắn hơn nhiều
   rằng giao dịch của bạn đã thành công và sẽ không bao giờ bị thay đổi. Khi một khối được "hoàn tất", nó chỉ có thể bị thay đổi
   bởi một cuộc tấn công cấp mạng lưới vốn sẽ tốn hàng tỷ đô la.

## Bản demo trực quan {#a-visual-demo}

Xem Austin hướng dẫn bạn về các giao dịch, gas và khai thác.

<YouTube id="er-0ihqFQB0" />

## Bao giao dịch được định kiểu {#typed-transaction-envelope}

Ethereum lúc đầu có một định dạng cho các giao dịch. Mỗi giao dịch đều có một nonce, giá gas, giới hạn gas, địa chỉ nhận, giá trị, dữ liệu, v, r, và s. Các trường này được [mã hóa RLP](/developers/docs/data-structures-and-encoding/rlp/), trông giống như sau:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum đã phát triển để hỗ trợ nhiều loại giao dịch để cho phép các tính năng mới như danh sách truy cập và [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) được triển khai mà không ảnh hưởng đến các định dạng giao dịch cũ.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) là thứ cho phép hành vi này. Các giao dịch được giải thích là:

`TransactionType || TransactionPayload`

Các trường được định nghĩa như sau:

- `TransactionType` - một số từ 0 đến 0x7f, cho tổng số 128 loại giao dịch khả thi.
- `TransactionPayload` - một mảng byte tùy ý được xác định bởi loại giao dịch.

Dựa trên giá trị `TransactionType`, một giao dịch có thể được phân loại như sau:

1. **Giao dịch loại 0 (Kế thừa):** Định dạng giao dịch ban đầu được sử dụng kể từ khi Ethereum ra mắt. Chúng không bao gồm các tính năng từ [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) như tính toán phí gas động hoặc danh sách truy cập cho các hợp đồng thông minh. Các giao dịch kế thừa thiếu một tiền tố cụ thể để chỉ định loại của chúng ở dạng tuần tự hóa, bắt đầu bằng byte `0xf8` khi sử dụng mã hóa [Tiền tố độ dài đệ quy (RLP)](/developers/docs/data-structures-and-encoding/rlp). Giá trị TransactionType cho các giao dịch này là `0x0`.

2. **Giao dịch loại 1:** Được giới thiệu trong [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) như một phần của [Nâng cấp Berlin](/ethereum-forks/#berlin) của Ethereum, các giao dịch này bao gồm một tham số `accessList`. Danh sách này chỉ định các địa chỉ và khóa lưu trữ mà giao dịch dự kiến sẽ truy cập, giúp có khả năng giảm chi phí [gas](/developers/docs/gas/) cho các giao dịch phức tạp liên quan đến hợp đồng thông minh. Các thay đổi về thị trường phí của đề xuất EIP-1559 không được bao gồm trong giao dịch loại 1. Giao dịch loại 1 cũng bao gồm một tham số `yParity`, có thể là `0x0` hoặc `0x1`, cho biết tính chẵn lẻ của giá trị y của chữ ký secp256k1. Chúng được xác định bằng cách bắt đầu với byte `0x01`, và giá trị TransactionType của chúng là `0x1`.

3. **Giao dịch loại 2**, thường được gọi là giao dịch EIP-1559, là các giao dịch được giới thiệu trong [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), trong [Nâng cấp London](/ethereum-forks/#london) của Ethereum. Chúng đã trở thành loại giao dịch tiêu chuẩn trên mạng lưới Ethereum. Các giao dịch này giới thiệu một cơ chế phí trị trường mới, giúp cải thiện khả năng dự đoán bằng cách tách phí giao dịch thành phí tối thiểu và phí ưu tiên. Chúng bắt đầu bằng byte `0x02` và bao gồm các trường như `maxPriorityFeePerGas` và `maxFeePerGas`. Các giao dịch loại 2 giờ đây đã trở thành mặc định vì tính linh hoạt và hiệu quả của chúng, đặc biệt được ưa chuộng trong những thời điểm nghẽn mạng, trợ giúp những người dùng quản lý các phí giao dịch một cách dễ dàng hơn. Giá trị TransactionType cho các giao dịch này là `0x2`.

4. **Giao dịch loại 3 (Blob)** đã được giới thiệu trong [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) như một phần của [Nâng cấp Dencun](/ethereum-forks/#dencun) của Ethereum. Những giao dịch này được thiết kế để xử lý dữ liệu "blob" (Đối tượng lớn nhị phân) một cách hiệu quả hơn, đặc biệt có lợi cho các lớp 2 rollup bằng cách cung cấp một phương thức đăng tải dữ liệu lên mạng Ethereum với chi phí thấp hơn. Giao dịch blob bao gồm các trường bổ sung như `blobVersionedHashes`, `maxFeePerBlobGas`, và `blobGasPrice`. Chúng bắt đầu bằng byte `0x03`, và giá trị TransactionType của chúng là `0x3`. Giao dịch Blob đại diện cho một sự cải thiện đáng kể trong khả năng khả dụng dữ liệu và khả năng mở rộng của Ethereum.

5. **Giao dịch loại 4** đã được giới thiệu trong [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) như một phần của [Nâng cấp Pectra](/roadmap/pectra/) của Ethereum. Các giao dịch này được thiết kế để tương thích về phía trước với trừu tượng hóa tài khoản. Chúng cho phép các EOA tạm thời hoạt động giống như các tài khoản hợp đồng thông minh mà không ảnh hưởng đến chức năng ban đầu của chúng. Chúng bao gồm một tham số `authorization_list`, chỉ định hợp đồng thông minh mà EOA ủy quyền. Sau giao dịch, trường mã của EOA sẽ có địa chỉ của hợp đồng thông minh được ủy quyền.

## Đọc thêm {#further-reading}

- [EIP-2718: Bao giao dịch được định kiểu](https://eips.ethereum.org/EIPS/eip-2718)

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Tài khoản](/developers/docs/accounts/)
- [Máy ảo Ethereum (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
