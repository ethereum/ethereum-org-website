---
title: Định nghĩa lưu trữ bí mật Web3
description: Định nghĩa chính thức cho lưu trữ bí mật web3
lang: vi
sidebarDepth: 2
---

Để làm cho ứng dụng của bạn hoạt động trên Ethereum, bạn có thể sử dụng đối tượng web3 được cung cấp bởi thư viện web3.js. Về cơ bản, nó giao tiếp với một nút cục bộ thông qua các lệnh gọi RPC. [web3](https://github.com/ethereum/web3.js/) hoạt động với bất kỳ nút Ethereum nào hiển thị một lớp RPC.

`web3` chứa đối tượng `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** kết quả
 *               [ 'web3', 3 ] tệp khóa web3 (v3)
 *  [ 'ethersale', undefined ] tệp khóa Ethersale
 *                        null tệp khóa không hợp lệ
 */
```

Tài liệu này ghi lại **phiên bản 3** của Định nghĩa Lưu trữ Bí mật Web3.

## Định nghĩa {#definition}

Việc mã hóa và giải mã thực tế của tệp phần lớn không thay đổi so với phiên bản 1, ngoại trừ việc thuật toán mã hóa không còn được cố định là AES-128-CBC (AES-128-CTR hiện là yêu cầu tối thiểu). Hầu hết các ý nghĩa/thuật toán đều tương tự như phiên bản 1, ngoại trừ `mac`, được cho là SHA3 (keccak-256) của các chuỗi nối của 16 byte thứ hai từ bên trái của khóa dẫn xuất cùng với toàn bộ `ciphertext`.

Các tệp khóa bí mật được lưu trữ trực tiếp trong `~/.web3/keystore` (cho các hệ thống tương tự Unix) và `~/AppData/Web3/keystore` (cho Windows). Chúng có thể được đặt tên bất cứ thứ gì, nhưng một quy ước tốt là `<uuid>.json`, trong đó `<uuid>` là UUID 128-bit được gán cho khóa bí mật (một proxy bảo vệ quyền riêng tư cho địa chỉ của khóa bí mật).

Tất cả các tệp như vậy đều có một mật khẩu liên quan. Để lấy được khóa bí mật của một tệp `.json` nhất định, đầu tiên hãy lấy khóa mã hóa của tệp; điều này được thực hiện bằng cách lấy mật khẩu của tệp và chuyển nó qua một hàm dẫn xuất khóa như được mô tả bởi khóa `kdf`. Các tham số tĩnh và động phụ thuộc vào KDF cho hàm KDF được mô tả trong khóa `kdfparams`.

PBKDF2 phải được hỗ trợ bởi tất cả các triển khai tuân thủ tối thiểu, được biểu thị qua:

- `kdf`: `pbkdf2`

Đối với PBKDF2, kdfparams bao gồm:

- `prf`: Phải là `hmac-sha256` (có thể được mở rộng trong tương lai);
- `c`: số lần lặp;
- `salt`: salt được chuyển đến PBKDF;
- `dklen`: độ dài cho khóa dẫn xuất. Phải >= 32.

Sau khi khóa của tệp đã được dẫn xuất, nó sẽ được xác minh thông qua việc dẫn xuất MAC. MAC sẽ được tính toán bằng hàm băm SHA3 (keccak-256) của mảng byte được hình thành dưới dạng các chuỗi nối của 16 byte thứ hai từ bên trái của khóa dẫn xuất với nội dung của khóa `ciphertext`, tức là:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(trong đó `++` là toán tử nối chuỗi)

Giá trị này cần được so sánh với nội dung của khóa `mac`; nếu chúng khác nhau, cần yêu cầu một mật khẩu khác (hoặc hủy bỏ hoạt động).

Sau khi khóa của tệp đã được xác minh, văn bản mã hóa (khóa `ciphertext` trong tệp) có thể được giải mã bằng cách sử dụng thuật toán mã hóa đối xứng được chỉ định bởi khóa `cipher` và được tham số hóa thông qua khóa `cipherparams`. Nếu kích thước khóa dẫn xuất và kích thước khóa của thuật toán không khớp, các byte ngoài cùng bên phải được đệm số không của khóa dẫn xuất sẽ được sử dụng làm khóa cho thuật toán.

Tất cả các triển khai tuân thủ tối thiểu phải hỗ trợ thuật toán AES-128-CTR, được biểu thị qua:

- `cipher: aes-128-ctr`

Mật mã này có các tham số sau, được cung cấp dưới dạng các khóa cho khóa cipherparams:

- `iv`: vectơ khởi tạo 128 bit cho mật mã.

Khóa cho mật mã là 16 byte ngoài cùng bên trái của khóa dẫn xuất, tức là `DK[0..15]`

Việc tạo/mã hóa một khóa bí mật về cơ bản là ngược lại với các hướng dẫn này. Hãy đảm bảo rằng `uuid`, `salt` và `iv` thực sự ngẫu nhiên.

Ngoài trường `version`, vốn đóng vai trò như một định danh "cứng" của phiên bản, các triển khai cũng có thể sử dụng `minorversion` để theo dõi các thay đổi nhỏ hơn, không gây gián đoạn cho định dạng.

## Vectơ thử nghiệm {#test-vectors}

Chi tiết:

- `Địa chỉ`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Mật khẩu`: `testpassword`
- `Bí mật`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Vectơ thử nghiệm sử dụng `AES-128-CTR` và `PBKDF2-SHA-256`:

Nội dung tệp của `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "6087dab2f9fdbbfaddc31a909735c1e6"
    },
    "ciphertext": "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    "kdf": "pbkdf2",
    "kdfparams": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    },
    "mac": "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Các bước trung gian**:

`Khóa dẫn xuất`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`Phần thân MAC`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Khóa mật mã`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vectơ thử nghiệm sử dụng AES-128-CTR và Scrypt:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "740770fce12ce862af21264dab25f1da"
    },
    "ciphertext": "dd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "25710c2ccd7c610b24d068af83b959b7a0e5f40641f0c82daeb1345766191034"
    },
    "mac": "337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Các bước trung gian**:

`Khóa dẫn xuất`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`Phần thân MAC`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Khóa mật mã`: `7446f59ecc301d2d79bc3302650d8a5c`

## Những thay đổi so với Phiên bản 1 {#alterations-from-v2}

Phiên bản này sửa một số điểm không nhất quán với phiên bản 1 được xuất bản [tại đây](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Tóm lại, chúng là:

- Việc viết hoa không có cơ sở và không nhất quán (scrypt viết thường, Kdf viết hoa/thường, MAC viết hoa).
- Địa chỉ không cần thiết và làm ảnh hưởng đến quyền riêng tư.
- `Salt` về bản chất là một tham số của hàm dẫn xuất khóa và xứng đáng được liên kết với nó, chứ không phải với mã hóa nói chung.
- _SaltLen_ không cần thiết (chỉ cần lấy nó từ Salt).
- Hàm dẫn xuất khóa được đưa ra, tuy nhiên thuật toán mã hóa lại được chỉ định cứng.
- `Version` về bản chất là số nhưng lại là một chuỗi (có thể tạo phiên bản có cấu trúc bằng một chuỗi, nhưng có thể coi là nằm ngoài phạm vi đối với một định dạng tệp cấu hình hiếm khi thay đổi).
- `KDF` và `cipher` về mặt khái niệm là các khái niệm song song tuy nhiên lại được tổ chức khác nhau.
- `MAC` được tính toán thông qua một mẩu dữ liệu không phân biệt khoảng trắng(!)

Những thay đổi đã được thực hiện đối với định dạng để tạo ra tệp sau, tương đương về mặt chức năng với ví dụ được đưa ra trên trang được liên kết trước đó:

```json
{
  "crypto": {
    "cipher": "aes-128-cbc",
    "ciphertext": "07533e172414bfa50e99dba4a0ce603f654ebfa1ff46277c3e0c577fdc87f6bb4e4fe16c5a94ce6ce14cfa069821ef9b",
    "cipherparams": {
      "iv": "16d67ba0ce5a339ff2f07951253e6ba8"
    },
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "06870e5e6a24e183a5c807bd1c43afd86d573f7db303ff4853d135cd0fd3fe91"
    },
    "mac": "8ccded24da2e99a11d48cda146f9cc8213eb423e2ea0d8427f41c3be414424dd",
    "version": 1
  },
  "id": "0498f19a-59db-4d54-ac95-33901b4f1870",
  "version": 2
}
```

## Những thay đổi so với Phiên bản 2 {#alterations-from-v2}

Phiên bản 2 là một triển khai C++ ban đầu với một số lỗi. Tất cả các yếu tố thiết yếu vẫn không thay đổi so với nó.
