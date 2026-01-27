---
title: Bằng chứng Merkle cho tính toàn vẹn dữ liệu ngoại tuyến
description: Đảm bảo tính toàn vẹn dữ liệu trên chuỗi cho dữ liệu được lưu trữ, chủ yếu là ngoài chuỗi
author: Ori Pomerantz
tags: [ "lưu trữ" ]
skill: advanced
lang: vi
published: 2021-12-30
---

## Giới thiệu {#introduction}

Lý tưởng nhất là chúng ta muốn lưu trữ mọi thứ trong bộ nhớ lưu trữ của Ethereum, được lưu trữ trên hàng nghìn máy tính và có
tính khả dụng cực cao (dữ liệu không thể bị kiểm duyệt) và tính toàn vẹn (dữ liệu không thể bị sửa đổi một cách
trái phép), nhưng việc lưu trữ một từ 32 byte thường tốn 20.000 gas. Tại thời điểm tôi viết bài này, chi phí đó tương đương
6,60 USD. Với 21 xu cho mỗi byte, chi phí này là quá đắt cho nhiều mục đích sử dụng.

Để giải quyết vấn đề này, hệ sinh thái Ethereum đã phát triển [nhiều cách thay thế để lưu trữ dữ liệu theo cách phi tập trung](/developers/docs/storage/). Thông thường, chúng bao gồm sự đánh đổi giữa tính khả dụng
và giá cả. Tuy nhiên, tính toàn vẹn thường được đảm bảo.

Trong bài viết này, bạn sẽ học **cách** đảm bảo tính toàn vẹn của dữ liệu mà không cần lưu trữ dữ liệu trên chuỗi khối, bằng cách sử dụng
[bằng chứng Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Nó hoạt động như thế nào? {#how-does-it-work}

Về lý thuyết, chúng ta có thể chỉ cần lưu trữ hàm băm của dữ liệu trên chuỗi và gửi tất cả dữ liệu trong các giao dịch yêu cầu nó. Tuy nhiên, cách này vẫn quá tốn kém. Một byte dữ liệu cho một giao dịch tốn khoảng 16 gas, hiện tại khoảng nửa xu, hoặc khoảng 5 USD cho mỗi kilobyte. Với 5000 USD cho mỗi megabyte, chi phí này vẫn quá đắt cho nhiều mục đích sử dụng, ngay cả khi không tính thêm chi phí băm dữ liệu.

Giải pháp là băm liên tục các tập hợp con khác nhau của dữ liệu, vì vậy đối với dữ liệu bạn không cần gửi, bạn có thể chỉ cần gửi một hàm băm. Bạn làm điều này bằng cách sử dụng cây Merkle, một cấu trúc dữ liệu cây trong đó mỗi nút là một hàm băm của các nút bên dưới nó:

![Cây Merkle](tree.png)

Hàm băm gốc là phần duy nhất cần được lưu trữ trên chuỗi. Để chứng minh một giá trị nhất định, bạn cung cấp tất cả các hàm băm cần được kết hợp với nó để có được gốc. Ví dụ: để chứng minh `C`, bạn cung cấp `D`, `H(A-B)`, và `H(E-H)`.

![Bằng chứng về giá trị của C](proof-c.png)

## Triển khai {#implementation}

[Mã mẫu được cung cấp tại đây](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Mã ngoài chuỗi {#offchain-code}

Trong bài viết này, chúng tôi sử dụng JavaScript cho các tính toán ngoài chuỗi. Hầu hết các ứng dụng phi tập trung có thành phần ngoài chuỗi bằng JavaScript.

#### Tạo gốc Merkle {#creating-the-merkle-root}

Đầu tiên, chúng ta cần cung cấp gốc Merkle cho chuỗi.

```javascript
const ethers = require("ethers")
```

[Chúng tôi sử dụng hàm băm từ gói ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Dữ liệu thô mà chúng ta phải xác minh tính toàn vẹn. Hai byte đầu tiên
// là mã định danh người dùng và hai byte cuối cùng là số lượng token mà
// người dùng sở hữu tại thời điểm hiện tại.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Việc mã hóa mỗi mục nhập thành một số nguyên 256-bit duy nhất sẽ tạo ra mã khó đọc hơn so với việc sử dụng JSON, ví dụ vậy. Tuy nhiên, điều này có nghĩa là xử lý ít hơn đáng kể để truy xuất dữ liệu trong hợp đồng, do đó chi phí gas thấp hơn nhiều. [Bạn có thể đọc JSON trên chuỗi](https://github.com/chrisdotn/jsmnSol), nhưng đó là một ý tưởng tồi nếu có thể tránh được.

```javascript
// Mảng các giá trị hàm băm, dưới dạng BigInts
const hashArray = dataArray
```

Trong trường hợp này, dữ liệu của chúng ta ban đầu là các giá trị 256-bit, do đó không cần xử lý. Nếu chúng ta sử dụng một cấu trúc dữ liệu phức tạp hơn, chẳng hạn như chuỗi, chúng ta cần đảm bảo rằng chúng ta băm dữ liệu trước để có được một mảng các hàm băm. Lưu ý rằng điều này cũng là do chúng tôi không quan tâm liệu người dùng có biết thông tin của những người dùng khác hay không. Nếu không, chúng ta sẽ phải băm để người dùng 1 không biết giá trị của người dùng 0, người dùng 2 không biết giá trị của người dùng 3, v.v.

```javascript
// Chuyển đổi giữa chuỗi mà hàm băm mong đợi và
// BigInt mà chúng ta sử dụng ở mọi nơi khác.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Hàm băm ethers mong đợi nhận được một chuỗi JavaScript với một số thập lục phân, chẳng hạn như `0x60A7`, và trả về một chuỗi khác có cùng cấu trúc. Tuy nhiên, đối với phần còn lại của mã, việc sử dụng `BigInt` sẽ dễ dàng hơn, vì vậy chúng ta chuyển đổi sang chuỗi thập lục phân và ngược lại.

```javascript
// Băm đối xứng của một cặp để chúng ta không quan tâm nếu thứ tự bị đảo ngược.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Hàm này là đối xứng (hàm băm của a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Điều này có nghĩa là khi chúng ta kiểm tra bằng chứng Merkle, chúng ta không cần lo lắng về việc đặt giá trị từ bằng chứng trước hay sau giá trị được tính toán. Việc kiểm tra bằng chứng Merkle được thực hiện trên chuỗi, vì vậy chúng ta càng cần làm ít việc ở đó càng tốt.

Cảnh báo:
Mật mã học khó hơn vẻ ngoài của nó.
Phiên bản ban đầu của bài viết này có hàm băm `hash(a^b)`.
Đó là một ý tưởng **tồi** vì nó có nghĩa là nếu bạn biết các giá trị hợp pháp của `a` và `b`, bạn có thể sử dụng `b' = a^b^a'` để chứng minh bất kỳ giá trị `a'` mong muốn nào.
Với hàm này, bạn sẽ phải tính toán `b'` sao cho `hash(a') ^ hash(b')` bằng một giá trị đã biết (nhánh tiếp theo trên đường đến gốc), điều này khó hơn rất nhiều.

```javascript
// Giá trị để biểu thị rằng một nhánh nào đó trống, không
// có giá trị
const empty = 0n
```

Khi số lượng giá trị không phải là lũy thừa nguyên của hai, chúng ta cần xử lý các nhánh trống. Cách chương trình này thực hiện là đặt số không làm trình giữ chỗ.

![Cây Merkle bị thiếu nhánh](merkle-empty-hash.png)

```javascript
// Tính toán một cấp trên cây của một mảng băm bằng cách lấy hàm băm của
// mỗi cặp theo trình tự
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Để tránh ghi đè lên đầu vào // Thêm một giá trị trống nếu cần (chúng ta cần tất cả các lá phải được // ghép cặp)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Hàm này "leo" lên một cấp trong cây Merkle bằng cách băm các cặp giá trị ở lớp hiện tại. Lưu ý rằng đây không phải là cách triển khai hiệu quả nhất, chúng ta có thể đã tránh sao chép đầu vào và chỉ cần thêm `hashEmpty` khi thích hợp trong vòng lặp, nhưng mã này được tối ưu hóa để dễ đọc.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Leo lên cây cho đến khi chỉ còn một giá trị, đó là // gốc. // // Nếu một lớp có số lượng mục nhập lẻ, // mã trong oneLevelUp sẽ thêm một giá trị trống, vì vậy nếu chúng ta có, ví dụ, // 10 lá, chúng ta sẽ có 5 nhánh ở lớp thứ hai, 3 // nhánh ở lớp thứ ba, 2 ở lớp thứ tư và gốc là lớp thứ năm

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Để có được gốc, hãy leo lên cho đến khi chỉ còn lại một giá trị.

#### Tạo bằng chứng Merkle {#creating-a-merkle-proof}

Bằng chứng Merkle là các giá trị cần băm cùng với giá trị đang được chứng minh để lấy lại gốc Merkle. Giá trị cần chứng minh thường có sẵn từ dữ liệu khác, vì vậy tôi thích cung cấp nó một cách riêng biệt thay vì là một phần của mã.

```javascript
// Bằng chứng Merkle bao gồm giá trị của danh sách các mục nhập để
// băm cùng. Bởi vì chúng ta sử dụng một hàm băm đối xứng, chúng ta không
// cần vị trí của mục để xác minh bằng chứng, chỉ cần để tạo ra nó
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Cho đến khi chúng ta lên đến đỉnh
    while (currentLayer.length > 1) {
        // Không có lớp nào có độ dài lẻ
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Nếu currentN là số lẻ, hãy thêm giá trị trước nó vào bằng chứng
            ? currentLayer[currentN-1]
               // Nếu nó là số chẵn, hãy thêm giá trị sau nó
            : currentLayer[currentN+1])

```

Chúng ta băm `(v[0],v[1])`, `(v[2],v[3])`, v.v. Vì vậy, đối với các giá trị chẵn, chúng ta cần giá trị tiếp theo, đối với các giá trị lẻ, chúng ta cần giá trị trước đó.

```javascript
        // Di chuyển lên lớp tiếp theo
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Mã trên chuỗi {#onchain-code}

Cuối cùng, chúng ta có mã kiểm tra bằng chứng. Mã trên chuỗi được viết bằng [Solidity](https://docs.soliditylang.org/en/v0.8.11/). Tối ưu hóa quan trọng hơn nhiều ở đây vì gas tương đối đắt.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Tôi đã viết mã này bằng cách sử dụng [môi trường phát triển Hardhat](https://hardhat.org/), cho phép chúng tôi có [đầu ra bảng điều khiển từ Solidity](https://hardhat.org/docs/cookbook/debug-logs) trong khi phát triển.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Cực kỳ không an toàn, trong mã sản xuất, quyền truy cập vào
    // hàm này PHẢI được giới hạn nghiêm ngặt, có thể là đối với một
    // chủ sở hữu
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Các hàm Set và get cho gốc Merkle. Việc cho phép mọi người cập nhật gốc Merkle là một _ý tưởng cực kỳ tồi_ trong một hệ thống sản xuất. Tôi làm điều đó ở đây vì sự đơn giản cho mã mẫu. **Đừng làm điều đó trên một hệ thống mà tính toàn vẹn của dữ liệu thực sự quan trọng**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Hàm này tạo ra một hàm băm cặp. Nó chỉ là bản dịch Solidity của mã JavaScript cho `hash` và `pairHash`.

**Lưu ý:** Đây là một trường hợp khác của việc tối ưu hóa để dễ đọc. Dựa trên [định nghĩa hàm](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), có thể lưu trữ dữ liệu dưới dạng giá trị [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) và tránh các chuyển đổi.

```solidity
    // Xác minh bằng chứng Merkle
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MerkleProof
```

Trong ký hiệu toán học, việc xác minh bằng chứng Merkle trông như thế này: `H(proof_n, H(proof_n-1, H(proof_n-2, ...` H(proof_1, H(proof_0, value))...)))\`. Mã này thực hiện nó.

## Bằng chứng Merkle và các rollup không kết hợp được với nhau {#merkle-proofs-and-rollups}

Bằng chứng Merkle không hoạt động tốt với [các rollup](/developers/docs/scaling/#rollups). Lý do là các rollup ghi tất cả dữ liệu giao dịch trên L1, nhưng xử lý trên L2. Chi phí để gửi một bằng chứng Merkle với một giao dịch trung bình là 638 gas cho mỗi lớp (hiện tại một byte trong dữ liệu cuộc gọi tốn 16 gas nếu nó không phải là số không, và 4 nếu nó là số không). Nếu chúng ta có 1024 từ dữ liệu, một bằng chứng Merkle yêu cầu mười lớp, hoặc tổng cộng 6380 gas.

Ví dụ, khi xem xét [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), chi phí gas ghi L1 khoảng 100 gwei và chi phí gas L2 là 0,001 gwei (đó là giá thông thường, nó có thể tăng lên khi có tắc nghẽn). Vì vậy, với chi phí của một gas L1, chúng ta có thể chi tiêu một trăm nghìn gas cho việc xử lý L2. Giả sử chúng ta không ghi đè lên bộ nhớ, điều này có nghĩa là chúng ta có thể ghi khoảng năm từ vào bộ nhớ trên L2 với giá của một gas L1. Đối với một bằng chứng Merkle duy nhất, chúng ta có thể ghi toàn bộ 1024 từ vào bộ nhớ (giả sử chúng có thể được tính toán trên chuỗi ngay từ đầu, thay vì được cung cấp trong một giao dịch) và vẫn còn thừa hầu hết gas.

## Kết luận {#conclusion}

Trong thực tế, bạn có thể không bao giờ tự mình triển khai cây Merkle. Có những thư viện nổi tiếng và đã được kiểm toán mà bạn có thể sử dụng và nói chung, tốt nhất là không nên tự mình triển khai các nguyên hàm mật mã. Nhưng tôi hy vọng rằng bây giờ bạn đã hiểu rõ hơn về bằng chứng Merkle và có thể quyết định khi nào chúng đáng được sử dụng.

Lưu ý rằng trong khi bằng chứng Merkle bảo toàn _tính toàn vẹn_, chúng không bảo toàn _tính khả dụng_. Việc biết rằng không ai khác có thể lấy tài sản của bạn chỉ là sự an ủi nhỏ nhoi nếu bộ nhớ dữ liệu quyết định không cho phép truy cập và bạn cũng không thể xây dựng một cây Merkle để truy cập chúng. Vì vậy, cây Merkle được sử dụng tốt nhất với một số loại lưu trữ phi tập trung, chẳng hạn như IPFS.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).
