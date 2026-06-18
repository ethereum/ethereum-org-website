---
title: "Các chiến lược lưu trữ dữ liệu chuỗi khối"
description: "Có một số cách để lưu trữ dữ liệu bằng chuỗi khối. Bài viết này sẽ so sánh các chiến lược khác nhau, chi phí và sự đánh đổi của chúng, cũng như các yêu cầu để sử dụng chúng một cách an toàn."
lang: vi
---

Có nhiều cách để lưu trữ thông tin trực tiếp trên chuỗi khối hoặc theo cách được bảo mật bởi chuỗi khối:

- Các blob EIP-4844
- Dữ liệu lệnh gọi
- Ngoài chuỗi với các cơ chế L1
- "Mã" hợp đồng
- Các sự kiện
- Lưu trữ EVM

Việc lựa chọn phương pháp nào để sử dụng dựa trên một số tiêu chí:

- Nguồn thông tin. Thông tin trong dữ liệu lệnh gọi không thể đến trực tiếp từ chính chuỗi khối.
- Đích đến của thông tin. Dữ liệu lệnh gọi chỉ khả dụng trong giao dịch bao gồm nó. Các sự kiện hoàn toàn không thể truy cập được trên chuỗi.
- Mức độ phức tạp có thể chấp nhận được là bao nhiêu? Các máy tính chạy một nút đầy đủ có thể thực hiện nhiều xử lý hơn so với một máy khách nhẹ trong một ứng dụng chạy trên trình duyệt.
- Có cần thiết phải tạo điều kiện truy cập thông tin dễ dàng từ mọi nút không?
- Các yêu cầu về bảo mật.

## Các yêu cầu về bảo mật {#security-requirements}

Nhìn chung, bảo mật thông tin bao gồm ba thuộc tính:

- _Tính bảo mật_ (Confidentiality), các thực thể không được ủy quyền không được phép đọc thông tin. Điều này quan trọng trong nhiều trường hợp, nhưng không phải ở đây. _Không có bí mật nào trên chuỗi khối_. Các chuỗi khối hoạt động vì bất kỳ ai cũng có thể xác minh các quá trình chuyển đổi trạng thái, do đó không thể sử dụng chúng để lưu trữ bí mật một cách trực tiếp. Có những cách để lưu trữ thông tin mật trên chuỗi khối, nhưng tất cả chúng đều dựa vào một số thành phần ngoài chuỗi để lưu trữ ít nhất một khóa.

- _Tính toàn vẹn_ (Integrity), thông tin là chính xác, nó không thể bị thay đổi bởi các thực thể không được ủy quyền hoặc theo những cách không được ủy quyền (ví dụ: chuyển [token ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) mà không có sự kiện `Transfer`). Trên chuỗi khối, mọi nút đều xác minh mọi thay đổi trạng thái, điều này đảm bảo tính toàn vẹn.

- _Tính khả dụng_ (Availability), thông tin có sẵn cho bất kỳ thực thể nào được ủy quyền. Trên chuỗi khối, điều này thường đạt được bằng cách cung cấp thông tin trên mọi [nút đầy đủ](https://ethereum.org/developers/docs/nodes-and-clients/#full-node).

Các giải pháp khác nhau ở đây đều có tính toàn vẹn tuyệt vời, vì các mã băm được đăng trên lớp 1 (L1). Tuy nhiên, chúng có các đảm bảo về tính khả dụng khác nhau.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên có hiểu biết tốt về [các nguyên tắc cơ bản của chuỗi khối](/developers/docs/intro-to-ethereum/). Trang này cũng giả định rằng người đọc đã quen thuộc với [các khối](/developers/docs/blocks/), [các giao dịch](/developers/docs/transactions/) và các chủ đề liên quan khác.

## Các blob EIP-4844 {#eip-4844-blobs}

Bắt đầu từ [đợt hardfork Dencun](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md), chuỗi khối Ethereum bao gồm [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), bổ sung vào Ethereum các blob dữ liệu có thời gian tồn tại giới hạn (ban đầu khoảng [18 ngày](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)). Các blob này được định giá riêng biệt với [Gas thực thi](/developers/docs/gas), mặc dù sử dụng một cơ chế tương tự. Chúng là một cách rẻ tiền để đăng dữ liệu tạm thời.

Trường hợp sử dụng chính cho các blob EIP-4844 là để các bản cuộn xuất bản các giao dịch của chúng. [Các Rollup lạc quan](/developers/docs/scaling/optimistic-rollups) cần xuất bản các giao dịch trên các chuỗi khối của chúng. Những giao dịch đó phải có sẵn cho bất kỳ ai trong [thời gian thử thách](https://docs.optimism.io/connect/resources/glossary#challenge-period) để cho phép [các trình xác thực](https://docs.optimism.io/connect/resources/glossary#validator) sửa lỗi nếu [bộ sắp xếp](https://docs.optimism.io/connect/resources/glossary#sequencer) của Rollup đăng một gốc trạng thái không chính xác.

Tuy nhiên, một khi thời gian thử thách đã trôi qua và gốc trạng thái đã chung cuộc, mục đích còn lại của việc biết các giao dịch này là để sao chép trạng thái hiện tại của chuỗi. Trạng thái này cũng có sẵn từ các nút chuỗi, với yêu cầu xử lý ít hơn nhiều. Vì vậy, thông tin giao dịch vẫn nên được bảo tồn ở một vài nơi, chẳng hạn như [các trình khám phá khối](/developers/docs/data-and-analytics/block-explorers), nhưng không cần phải trả tiền cho mức độ chống kiểm duyệt mà Ethereum cung cấp.

[Các bản cuộn không tri thức](/developers/docs/scaling/zk-rollups/#data-availability) cũng đăng dữ liệu giao dịch của chúng để cho phép các nút khác sao chép trạng thái hiện tại và xác minh các bằng chứng hợp lệ, nhưng một lần nữa đó là một yêu cầu ngắn hạn.

Tại thời điểm viết bài, việc đăng trên EIP-4844 tốn một Wei (10<sup>-18</sup> ETH) mỗi byte, mức này không đáng kể so với [21.000 Gas thực thi mà bất kỳ giao dịch nào, bao gồm cả giao dịch đăng các blob, phải trả](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Bạn có thể xem giá EIP-4844 hiện tại trên [blobscan.com](https://blobscan.com/blocks).

Dưới đây là các địa chỉ để xem các blob được đăng bởi một số bản cuộn nổi tiếng.

| Rollup                               | Địa chỉ hộp thư                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Dữ liệu lệnh gọi {#calldata}

Dữ liệu lệnh gọi đề cập đến các byte được gửi như một phần của giao dịch. Nó được lưu trữ như một phần của hồ sơ vĩnh viễn của chuỗi khối trong khối bao gồm giao dịch đó.

Đây là phương pháp rẻ nhất để đưa dữ liệu vĩnh viễn vào chuỗi khối. Chi phí cho mỗi byte là 4 Gas thực thi (nếu byte là 0) hoặc 16 Gas (bất kỳ giá trị nào khác). Nếu dữ liệu được nén, đây là một thực tiễn tiêu chuẩn, thì mọi giá trị byte đều có khả năng xảy ra như nhau, do đó chi phí trung bình xấp xỉ 15,95 Gas mỗi byte.

Tại thời điểm viết bài, giá là 12 Gwei/Gas và 2300 $/ETH, có nghĩa là chi phí xấp xỉ 45 xu mỗi kilobyte. Bởi vì đây là phương pháp rẻ nhất trước EIP-4844, đây là phương pháp mà các bản cuộn đã sử dụng để lưu trữ thông tin giao dịch, vốn cần phải có sẵn cho [các thử thách lỗi](https://docs.optimism.io/stack/protocol/overview#fault-proofs), nhưng không cần phải có thể truy cập trực tiếp trên chuỗi.

Dưới đây là các địa chỉ để xem các giao dịch được đăng bởi một số bản cuộn nổi tiếng.

| Rollup                               | Địa chỉ hộp thư                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Ngoài chuỗi với các cơ chế L1 {#offchain-with-l1-mechs}

Tùy thuộc vào sự đánh đổi bảo mật của bạn, có thể chấp nhận được việc đặt thông tin ở nơi khác và sử dụng một cơ chế đảm bảo dữ liệu có sẵn khi cần. Có hai yêu cầu để điều này hoạt động:

1. Đăng một [mã băm](https://en.wikipedia.org/wiki/Cryptographic_hash_function) của dữ liệu trên chuỗi khối, được gọi là một _cam kết đầu vào_. Đây có thể là một từ 32 byte duy nhất, vì vậy nó không đắt. Miễn là cam kết đầu vào có sẵn, tính toàn vẹn được đảm bảo vì không khả thi để tìm thấy bất kỳ dữ liệu nào khác sẽ băm ra cùng một giá trị. Vì vậy, nếu dữ liệu không chính xác được cung cấp, nó có thể bị phát hiện.

2. Có một cơ chế đảm bảo tính khả dụng. Ví dụ, trong [Redstone](https://redstone.xyz/docs/what-is-redstone), bất kỳ nút nào cũng có thể gửi một thử thách tính khả dụng. Nếu bộ sắp xếp không phản hồi trên chuỗi trước thời hạn, cam kết đầu vào sẽ bị loại bỏ, do đó thông tin được coi là chưa bao giờ được đăng.

Điều này có thể chấp nhận được đối với một Rollup lạc quan vì chúng ta đã dựa vào việc có ít nhất một trình xác minh trung thực cho gốc trạng thái. Một trình xác minh trung thực như vậy cũng sẽ đảm bảo rằng nó có dữ liệu để xử lý các khối và đưa ra một thử thách tính khả dụng nếu thông tin không có sẵn ngoài chuỗi. Loại Rollup lạc quan này được gọi là [Plasma](/developers/docs/scaling/plasma/).

## Mã hợp đồng {#contract-code}

Thông tin chỉ cần được viết một lần, không bao giờ bị ghi đè và cần phải có sẵn trên chuỗi có thể được lưu trữ dưới dạng mã hợp đồng. Điều này có nghĩa là chúng ta tạo ra một "hợp đồng thông minh" với dữ liệu và sau đó sử dụng [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) để đọc thông tin. Ưu điểm là việc sao chép mã tương đối rẻ.

Ngoài chi phí mở rộng bộ nhớ, `EXTCODECOPY` tốn 2600 Gas cho lần truy cập đầu tiên vào một hợp đồng (khi nó "lạnh") và 100 Gas cho các bản sao tiếp theo từ cùng một hợp đồng cộng với 3 Gas cho mỗi từ 32 byte. So với dữ liệu lệnh gọi, có giá 15,95 mỗi byte, cách này rẻ hơn bắt đầu từ khoảng 200 byte. Dựa trên [công thức tính chi phí mở rộng bộ nhớ](https://www.evm.codes/about#memoryexpansion), miễn là bạn không cần nhiều hơn 4MB bộ nhớ, chi phí mở rộng bộ nhớ sẽ nhỏ hơn chi phí thêm dữ liệu lệnh gọi.

Tất nhiên, đây chỉ là chi phí để _đọc_ dữ liệu. Để tạo hợp đồng tốn khoảng 32.000 Gas + 200 Gas/byte. Phương pháp này chỉ tiết kiệm khi cùng một thông tin cần được đọc nhiều lần trong các giao dịch khác nhau.

Mã hợp đồng có thể vô nghĩa, miễn là nó không bắt đầu bằng `0xEF`. Các hợp đồng bắt đầu bằng `0xEF` được diễn giải là [định dạng đối tượng Ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), vốn có các yêu cầu nghiêm ngặt hơn nhiều.

## Các sự kiện {#events}

[Các sự kiện](https://docs.alchemy.com/docs/solidity-events) được phát ra bởi các hợp đồng thông minh và được đọc bởi phần mềm ngoài chuỗi.
Ưu điểm của chúng là mã ngoài chuỗi có thể lắng nghe các sự kiện. Chi phí là [Gas](https://www.evm.codes/#a0?fork=cancun), 375 cộng với 8 Gas cho mỗi byte dữ liệu. Ở mức 12 Gwei/Gas và 2300 $/ETH, điều này tương đương với một xu cộng với 22 xu mỗi kilobyte.

## Lưu trữ {#storage}

Các hợp đồng thông minh có quyền truy cập vào [lưu trữ liên tục](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Tuy nhiên, nó rất đắt. Việc ghi một từ 32 byte vào một khe lưu trữ trống trước đó có thể [tốn 22.100 Gas](https://www.evm.codes/#55?fork=cancun). Ở mức 12 Gwei/Gas và 2300 $/ETH, chi phí này là khoảng 61 xu cho mỗi thao tác ghi, hoặc 19,5 đô la mỗi kilobyte.

Đây là hình thức lưu trữ đắt nhất trong Ethereum.

## Tóm tắt {#summary}

Bảng này tóm tắt các tùy chọn khác nhau, ưu điểm và nhược điểm của chúng.

| Loại lưu trữ                | Nguồn dữ liệu       | Đảm bảo tính khả dụng                                                                                                              | Tính khả dụng trên chuỗi                                         | Các giới hạn bổ sung                                                    |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Các blob EIP-4844              | Ngoài chuỗi            | Ethereum đảm bảo trong [\~18 ngày](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | Chỉ có mã băm                                           |                                                                         |
| Dữ liệu lệnh gọi                    | Ngoài chuỗi            | Ethereum đảm bảo vĩnh viễn (một phần của chuỗi khối)                                                                                | Chỉ khả dụng nếu được ghi vào một hợp đồng và tại giao dịch đó |
| Ngoài chuỗi với các cơ chế L1 | Ngoài chuỗi            | Đảm bảo "một trình xác minh trung thực" trong thời gian thử thách                                                                        | Chỉ mã băm                                                        | Được đảm bảo bởi cơ chế thử thách, chỉ trong thời gian thử thách |
| Mã hợp đồng               | Trên chuỗi hoặc ngoài chuỗi | Ethereum đảm bảo vĩnh viễn (một phần của chuỗi khối)                                                                                | Có                                                              | Được ghi vào một địa chỉ "ngẫu nhiên", không thể bắt đầu bằng `0xEF`                 |
| Các sự kiện                      | Trên chuỗi             | Ethereum đảm bảo vĩnh viễn (một phần của chuỗi khối)                                                                                | Không                                                               |
| Lưu trữ                     | Trên chuỗi             | Ethereum đảm bảo vĩnh viễn (một phần của chuỗi khối và trạng thái hiện tại cho đến khi bị ghi đè)                                        | Có                                                              |