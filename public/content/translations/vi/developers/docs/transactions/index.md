---
title: "Giao dịch"
description: "Tổng quan về các giao dịch Ethereum – cách chúng hoạt động, cấu trúc dữ liệu của chúng và cách gửi chúng thông qua một ứng dụng."
lang: vi
---

Các giao dịch là những chỉ thị được ký bằng mật mã từ các tài khoản. Một tài khoản sẽ khởi tạo một giao dịch để cập nhật trạng thái của mạng lưới [Ethereum](/). Giao dịch đơn giản nhất là chuyển ETH từ tài khoản này sang tài khoản khác.

## Điều kiện tiên quyết {#prerequisites}

Để giúp bạn hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [Tài khoản](/developers/docs/accounts/) và [giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/) của chúng tôi.

## Giao dịch là gì? {#whats-a-transaction}

Một giao dịch Ethereum đề cập đến một hành động được khởi tạo bởi một tài khoản thuộc sở hữu bên ngoài, nói cách khác là một tài khoản do con người quản lý, không phải là một hợp đồng. Ví dụ, nếu Bob gửi cho Alice 1 ETH, tài khoản của Bob phải bị trừ tiền và tài khoản của Alice phải được cộng tiền. Hành động thay đổi trạng thái này diễn ra trong một giao dịch.

![Diagram showing a transaction cause state change](./tx.png)
_Sơ đồ được phỏng theo [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Các giao dịch, vốn làm thay đổi trạng thái của EVM, cần được phát sóng đến toàn bộ mạng lưới. Bất kỳ nút nào cũng có thể phát sóng một yêu cầu để một giao dịch được thực thi trên EVM; sau khi điều này xảy ra, một trình xác thực sẽ thực thi giao dịch và truyền bá sự thay đổi trạng thái kết quả đến phần còn lại của mạng lưới.

Các giao dịch yêu cầu một khoản phí và phải được đưa vào một khối đã được xác thực. Để làm cho phần tổng quan này đơn giản hơn, chúng tôi sẽ đề cập đến phí gas và việc xác thực ở phần khác.

Một giao dịch được gửi bao gồm các thông tin sau:

- `from` – địa chỉ của người gửi, người sẽ ký giao dịch. Đây sẽ là một tài khoản thuộc sở hữu bên ngoài vì các tài khoản hợp đồng không thể gửi giao dịch
- `to` – địa chỉ nhận (nếu là tài khoản thuộc sở hữu bên ngoài, giao dịch sẽ chuyển giá trị. Nếu là tài khoản hợp đồng, giao dịch sẽ thực thi mã hợp đồng)
- `signature` – định danh của người gửi. Điều này được tạo ra khi khóa riêng tư của người gửi ký giao dịch và xác nhận người gửi đã ủy quyền cho giao dịch này
- `nonce` - một bộ đếm tăng dần tuần tự cho biết số thứ tự giao dịch từ tài khoản
- `value` – số lượng ETH cần chuyển từ người gửi đến người nhận (được tính bằng Wei, trong đó 1 ETH bằng 1e+18 Wei)
- `input data` – trường tùy chọn để bao gồm dữ liệu tùy ý
- `gasLimit` – số lượng đơn vị Gas tối đa có thể được tiêu thụ bởi giao dịch. [EVM](/developers/docs/evm/opcodes) chỉ định các đơn vị Gas cần thiết cho mỗi bước tính toán
- `maxPriorityFeePerGas` - giá tối đa của Gas đã tiêu thụ được bao gồm như một khoản phí ưu tiên cho trình xác thực
- `maxFeePerGas` - mức phí tối đa trên mỗi đơn vị Gas sẵn sàng trả cho giao dịch (bao gồm cả `baseFeePerGas` và `maxPriorityFeePerGas`)

Gas là một tham chiếu đến tính toán cần thiết để xử lý giao dịch bởi một trình xác thực. Người dùng phải trả một khoản phí cho tính toán này. `gasLimit` và `maxPriorityFeePerGas` xác định phí giao dịch tối đa được trả cho trình xác thực. [Tìm hiểu thêm về Gas](/developers/docs/gas/).

Đối tượng giao dịch sẽ trông giống như thế này:

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

Nhưng một đối tượng giao dịch cần được ký bằng khóa riêng tư của người gửi. Điều này chứng minh rằng giao dịch chỉ có thể đến từ người gửi và không bị gửi một cách gian lận.

Một máy khách Ethereum như Geth sẽ xử lý quá trình ký này.

Ví dụ về lệnh gọi [JSON-RPC](/developers/docs/apis/json-rpc):

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

Ví dụ về phản hồi:

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

- `raw` là giao dịch đã ký ở dạng mã hóa [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp)
- `tx` là giao dịch đã ký ở dạng JSON

Với mã băm chữ ký, giao dịch có thể được chứng minh bằng mật mã rằng nó đến từ người gửi và được gửi đến mạng lưới.

### Trường dữ liệu {#the-data-field}

Đại đa số các giao dịch truy cập vào một hợp đồng từ một tài khoản thuộc sở hữu bên ngoài.
Hầu hết các hợp đồng được viết bằng Solidity và diễn giải trường dữ liệu của chúng theo [giao diện nhị phân ứng dụng (ABI)](/glossary/#abi).

Bốn byte đầu tiên chỉ định hàm nào sẽ được gọi, sử dụng mã băm của tên hàm và các đối số.
Đôi khi bạn có thể xác định hàm từ bộ chọn bằng cách sử dụng [cơ sở dữ liệu này](https://www.4byte.directory/signatures/).

Phần còn lại của dữ liệu lệnh gọi là các đối số, [được mã hóa như quy định trong thông số kỹ thuật ABI](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Ví dụ, hãy xem xét [giao dịch này](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1).
Sử dụng **Click to see More** để xem dữ liệu lệnh gọi.

Bộ chọn hàm là `0xa9059cbb`. Có một số [hàm đã biết với chữ ký này](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb).
Trong trường hợp này, [mã nguồn hợp đồng](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) đã được tải lên Etherscan, vì vậy chúng ta biết hàm đó là `transfer(address,uint256)`.

Phần còn lại của dữ liệu là:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Theo thông số kỹ thuật ABI, các giá trị số nguyên (chẳng hạn như địa chỉ, là các số nguyên 20 byte) xuất hiện trong ABI dưới dạng các từ 32 byte, được đệm bằng các số 0 ở phía trước.
Vì vậy, chúng ta biết rằng địa chỉ `to` là [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279).
`value` là 0x3b0559f4 = 990206452.

### Bộ mô tả giao dịch {#transaction-descriptors}

Bởi vì trường dữ liệu chứa các byte thập lục phân không rõ ràng, có thể cực kỳ khó khăn để xác minh hành động mà một giao dịch sẽ thực sự thực hiện. Lỗ hổng "ký mù" này được giải quyết bằng **[Ký rõ ràng (Clear Signing)](https://clearsigning.org/)** thông qua việc sử dụng [bộ mô tả giao dịch](https://eips.ethereum.org/EIPS/eip-7730) (được định nghĩa bởi ERC-7730).  

Đặc tả ERC-7730 sử dụng các bộ mô tả giao dịch (thường được cấu trúc dưới dạng tệp JSON) để làm phong phú thêm dữ liệu được tìm thấy trong ABI và các tin nhắn có cấu trúc, như dữ liệu lệnh gọi giao dịch EVM, tin nhắn EIP-712 và Hoạt động người dùng EIP-4337. Các nhà phát triển sử dụng các bộ mô tả này để ánh xạ các biến giao dịch cụ thể trực tiếp vào các mẫu định dạng, đảm bảo dữ liệu cơ bản vẫn có thể đọc được bằng máy đối với các ứng dụng.

Trên giao diện người dùng, các ví sử dụng ngữ cảnh định dạng này để dịch mã byte không rõ ràng thành thông tin rõ ràng, con người có thể đọc được. Bằng cách tự động phân giải các giá trị như địa chỉ token thành các mã giao dịch được công nhận, hoặc số lượng thành số thập phân, người dùng được trình bày một bản tóm tắt bằng ngôn ngữ thông thường về ý định chính xác của giao dịch (ví dụ: 'Hoán đổi 1000 USDC lấy ít nhất 0.25 Ether được bọc (WETH)') trước khi họ ký

## Các loại giao dịch {#types-of-transactions}

Trên Ethereum có một vài loại giao dịch khác nhau:

- Giao dịch thông thường: một giao dịch từ tài khoản này sang tài khoản khác.
- Giao dịch triển khai hợp đồng: một giao dịch không có địa chỉ 'to' (đến), trong đó trường dữ liệu được sử dụng cho mã hợp đồng.
- Thực thi một hợp đồng: một giao dịch tương tác với một hợp đồng thông minh đã được triển khai. Trong trường hợp này, địa chỉ 'to' là địa chỉ hợp đồng thông minh.

### Về Gas {#on-gas}

Như đã đề cập, các giao dịch tốn [Gas](/developers/docs/gas/) để thực thi. Các giao dịch chuyển đơn giản yêu cầu 21000 đơn vị Gas.

Vì vậy, để Bob gửi cho Alice 1 ETH với `baseFeePerGas` là 190 Gwei và `maxPriorityFeePerGas` là 10 Gwei, Bob sẽ cần phải trả mức phí sau:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Tài khoản của Bob sẽ bị trừ **-1.0042 ETH** (1 ETH cho Alice + 0.0042 ETH phí gas)

Tài khoản của Alice sẽ được cộng **+1.0 ETH**

Phí cơ sở sẽ bị đốt **-0.00399 ETH**

Trình xác thực giữ lại phí ưu tiên **+0.000210 ETH**


![Diagram showing how unused gas is refunded](./gas-tx.png)
_Sơ đồ được phỏng theo [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Bất kỳ lượng Gas nào không được sử dụng trong một giao dịch sẽ được hoàn trả vào tài khoản người dùng.

### Tương tác với hợp đồng thông minh {#smart-contract-interactions}

Gas là bắt buộc đối với bất kỳ giao dịch nào liên quan đến một hợp đồng thông minh.

Các hợp đồng thông minh cũng có thể chứa các hàm được gọi là hàm [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) hoặc [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions), vốn không làm thay đổi trạng thái của hợp đồng. Do đó, việc gọi các hàm này từ một EOA sẽ không yêu cầu bất kỳ lượng Gas nào. Lệnh gọi RPC cơ bản cho kịch bản này là [`eth_call`](/developers/docs/apis/json-rpc#eth_call).

Không giống như khi được truy cập bằng `eth_call`, các hàm `view` hoặc `pure` này cũng thường được gọi nội bộ (tức là từ chính hợp đồng đó hoặc từ một hợp đồng khác) và điều này có tốn Gas.

## Vòng đời giao dịch {#transaction-lifecycle}

Khi giao dịch đã được gửi, những điều sau sẽ xảy ra:

1. Một mã băm giao dịch được tạo ra bằng mật mã:
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Giao dịch sau đó được phát sóng lên mạng lưới và được thêm vào một bể giao dịch bao gồm tất cả các giao dịch mạng lưới đang chờ xử lý khác.
3. Một trình xác thực phải chọn giao dịch của bạn và đưa nó vào một khối để xác minh giao dịch và coi nó là "thành công".
4. Theo thời gian, khối chứa giao dịch của bạn sẽ được nâng cấp thành "đã được chứng minh hợp lệ" sau đó là "đã chung cuộc". Những nâng cấp này làm cho việc giao dịch của bạn thành công và sẽ không bao giờ bị thay đổi trở nên chắc chắn hơn nhiều. Khi một khối "đã chung cuộc", nó chỉ có thể bị thay đổi bởi một cuộc tấn công cấp độ mạng lưới tiêu tốn hàng tỷ đô la.

## Bản demo trực quan {#a-visual-demo}

Hãy xem Austin hướng dẫn bạn về các giao dịch, Gas và khai thác.

<VideoWatch slug="transactions-eth-build" />

## Phong bì giao dịch có kiểu {#typed-transaction-envelope}

Ethereum ban đầu có một định dạng cho các giao dịch. Mỗi giao dịch chứa một nonce, giá gas, giới hạn gas, địa chỉ nhận (to), giá trị, dữ liệu, v, r và s. Các trường này được [mã hóa RLP](/developers/docs/data-structures-and-encoding/rlp/), trông giống như thế này:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum đã phát triển để hỗ trợ nhiều loại giao dịch nhằm cho phép các tính năng mới như danh sách truy cập và [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) được triển khai mà không ảnh hưởng đến các định dạng giao dịch cũ.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) là thứ cho phép hành vi này. Các giao dịch được diễn giải như sau:

`TransactionType || TransactionPayload`

Trong đó các trường được định nghĩa là:

- `TransactionType` - một số từ 0 đến 0x7f, cho tổng cộng 128 loại giao dịch có thể có.
- `TransactionPayload` - một mảng byte tùy ý được xác định bởi loại giao dịch.

Dựa trên giá trị `TransactionType`, một giao dịch có thể được phân loại thành:

1. **Giao dịch Loại 0 (Cũ):** Định dạng giao dịch ban đầu được sử dụng kể từ khi Ethereum ra mắt. Chúng không bao gồm các tính năng từ [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) như tính toán phí gas động hoặc danh sách truy cập cho các hợp đồng thông minh. Các giao dịch cũ thiếu một tiền tố cụ thể cho biết loại của chúng ở dạng tuần tự hóa, bắt đầu bằng byte `0xf8` khi sử dụng mã hóa [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp). Giá trị TransactionType cho các giao dịch này là `0x0`.

2. **Giao dịch Loại 1:** Được giới thiệu trong [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) như một phần của [bản nâng cấp Berlin](/ethereum-forks/#berlin) của Ethereum, các giao dịch này bao gồm một tham số `accessList`. Danh sách này chỉ định các địa chỉ và khóa lưu trữ mà giao dịch dự kiến sẽ truy cập, giúp có khả năng giảm chi phí [Gas](/developers/docs/gas/) cho các giao dịch phức tạp liên quan đến hợp đồng thông minh. Các thay đổi về thị trường phí của EIP-1559 không được bao gồm trong giao dịch Loại 1. Giao dịch Loại 1 cũng bao gồm một tham số `yParity`, có thể là `0x0` hoặc `0x1`, cho biết tính chẵn lẻ của giá trị y của chữ ký secp256k1. Chúng được xác định bằng cách bắt đầu với byte `0x01` và giá trị TransactionType của chúng là `0x1`.

3. **Giao dịch Loại 2**, thường được gọi là giao dịch EIP-1559, là các giao dịch được giới thiệu trong [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), trong bản nâng cấp London của Ethereum. Chúng đã trở thành loại giao dịch tiêu chuẩn trên mạng lưới Ethereum. Các giao dịch này giới thiệu một cơ chế thị trường phí mới giúp cải thiện khả năng dự đoán bằng cách tách phí giao dịch thành phí cơ sở và phí ưu tiên. Chúng bắt đầu bằng byte `0x02` và bao gồm các trường như `maxPriorityFeePerGas` và `maxFeePerGas`. Giao dịch Loại 2 hiện là mặc định do tính linh hoạt và hiệu quả của chúng, đặc biệt được ưa chuộng trong các giai đoạn tắc nghẽn mạng lưới cao vì khả năng giúp người dùng quản lý phí giao dịch một cách dễ dự đoán hơn. Giá trị TransactionType cho các giao dịch này là `0x2`.

4. **Giao dịch Loại 3 (Khối dữ liệu)** được giới thiệu trong [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) như một phần của [bản nâng cấp Dencun](/ethereum-forks/#dencun) của Ethereum. Các giao dịch này được thiết kế để xử lý dữ liệu "khối dữ liệu" (Đối tượng nhị phân lớn) hiệu quả hơn, đặc biệt mang lại lợi ích cho các bản cuộn lớp 2 (l2) bằng cách cung cấp một cách để đăng dữ liệu lên mạng lưới Ethereum với chi phí thấp hơn. Các giao dịch khối dữ liệu bao gồm các trường bổ sung như `blobVersionedHashes`, `maxFeePerBlobGas` và `blobGasPrice`. Chúng bắt đầu bằng byte `0x03` và giá trị TransactionType của chúng là `0x3`. Các giao dịch khối dữ liệu đại diện cho một sự cải thiện đáng kể về tính khả dụng của dữ liệu và khả năng mở rộng của Ethereum.

5. **Giao dịch Loại 4** được giới thiệu trong [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) như một phần của bản nâng cấp Pectra của Ethereum. Các giao dịch này được thiết kế để tương thích chuyển tiếp với trừu tượng hóa tài khoản. Chúng cho phép các EOA tạm thời hoạt động giống như các tài khoản hợp đồng thông minh mà không làm tổn hại đến chức năng ban đầu của chúng. Chúng bao gồm một tham số `authorization_list`, chỉ định hợp đồng thông minh mà EOA ủy quyền. Sau giao dịch, trường mã của EOA sẽ có địa chỉ của hợp đồng thông minh được ủy quyền.

## Đọc thêm {#further-reading}

- [EIP-2718: Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Các chủ đề liên quan {#related-topics}

- [Tài khoản](/developers/docs/accounts/)
- [Máy ảo Ethereum (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)